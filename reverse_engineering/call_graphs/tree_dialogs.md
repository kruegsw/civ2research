# Dialog/UI Entry Points — Call Graph Trees

Call graph trees for major dialog and UI entry points in Civ2 MGE binary.
Source: `reverse_engineering/call_graphs/graph_data.json`

## Stats

- **Entry points**: 30
- **Unique functions reachable** (depth <= 5): 1140
- **Filter**: FW (framework) hidden at depth > 1; GL, AI, MIXED, UI always shown
- **Max depth**: 5
- **Summaries**: shown at depth <= 3

### Category Key

| Code | Meaning |
|------|---------|
| GL | Game Logic — pure game state computation |
| AI | AI decision-making |
| UI | User Interface — rendering, controls, dialogs |
| MIXED | UI + game state — the critical boundary |
| FW | Framework — MFC/CRT/Win32 plumbing (filtered at depth > 1) |

---

## Tax Rate & Government

### `0040CD64` open_tax_rate_dialog

> Creates and runs the tax rate adjustment dialog.

```
open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION ***
├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   └── show_window_inner [UI] (38B) — Shows the window by calling manage_window then a follow-up display function.
│       ├── manage_window_show [UI] (37B) — Calls manage_window_C40A with the window handle from this+8.
│       │   └── 0000C40A [?]
│       └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
├── get_max_tax_rate [GL] (156B) — Returns the maximum tax/luxury/science rate allowed for a civ based on its government type.
├── balance_tax_rates [GL] (293B) — Balances three tax rate sliders (tax, luxury, science) to sum to 10, respecting individual maximums and lock flags.
├── taxrate_recalc_totals [MIXED] (848B) *** STATE MUTATION *** — Recalculates tax/luxury/science income totals for the tax rate dialog.
│   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── distribute_trade [GL] (1769B) *** STATE MUTATION *** — Distributes a city's trade income into luxury, tax, and science based on the government's tax rate settings.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   ├── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   │   └── is_wonder_obsolete [GL] (120B)
│   │   │       └── civ_has_tech [GL] (181B)
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   │   └── get_wonder_city [GL] (57B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── count_worker_tiles_with_status [GL] (87B) — Counts how many tiles in a city have a specific worker status value.
│   │   │   └── get_worker_tile_status [GL] (68B)
│   │   └── (1 FW helpers hidden)
│   └── calc_building_upkeep_cost [GL] (305B) — Calculates the upkeep cost for a specific building type for a given civ.
│       ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│       └── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
├── taxdlg_cleanup_stack [FW] (12B) — Cleanup function for the tax dialog's dynamic allocation.
│   └── palette_destroy [UI] (142B) — Destroys palette object.
│       ├── unknown (palette_delete) [UI] (39B) — Deletes a GDI palette object if palette mode active.
│       └── (1 FW helpers hidden)
├── taxdlg_seh_epilog [FW] (16B) — SEH epilog for the tax rate dialog function.
├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│   └── 0000BA4F [?]
├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   └── 0000858E [?]
├── surface_destroy [FW] (57B) — Destroys a surface object.
│   └── port_destructor [UI] (114B) — Destroys a port object: unlocks the surface if locked, frees the DIB, resets all fields, and clears the singleton poi...
│       ├── port_init [UI] (258B) — Initializes all fields of a port object, either to zero (if param_1 is null) or from the dimensions of the provided R...
│       ├── port_unlock [UI] (83B) — Unlocks the port's surface, freeing the row pointer table.
│       ├── surface_is_locked [UI] (44B) — Returns true if the port's surface buffer (this+0x34) is non-null (i.e., locked).
│       └── destroy_dib_surface [UI] (155B) — Destroys a DIB surface and frees all associated GDI resources.
├── set_dialog_enabled [UI] (36B) — Sets an enabled/disabled flag on a dialog control at this+0xc4.
├── create_text_button [UI] (133B) — Creates a text button control.
│   ├── 00009740 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── 0000944B [?]
│   │   └── surface_list_remove [UI] (191B) — Removes a surface node from the linked list at this+0xB8 by matching param_1 to node IDs via thunk_FUN_00418740.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│       └── surface_list_append [UI] (99B) — Appends a surface node (param_1) to the linked list at this+0xB8.
├── set_button_owner [UI] (45B) — Sets the button's owner/parent reference.
│   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
├── set_button_handler [UI] (45B) — Sets a handler callback on the button's window object at offset +0xc0.
│   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
├── create_checkbox [UI] (167B) — Creates a checkbox control.
│   ├── 0000BF40 [?]
│   ├── 0000C0F0 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   ├── 0000CF17 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   └── scrollbar_set_range [UI] (54B) — Sets scrollbar range and initial position.
│       └── scrollbar_set_pos [UI] (39B) — Sets scrollbar position by sending WM_COMMAND with code 0x7F.
│           └── 0000D149 [?]
├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   └── scrollbar_set_pos [UI] (39B) — Sets scrollbar position by sending WM_COMMAND with code 0x7F.
├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   └── scrollbar_set_range [UI] (54B) — Sets scrollbar range and initial position.
├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
├── get_improvement_name [FW] (92B) — Returns a pointer to the Nth string in the string pool.
├── dialog_repaint_check [UI] (91B) — Conditionally triggers a repaint if the current dialog matches the expected one.
│   └── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│       ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│       │   └── invalidate_region [UI] (180B)
│       │       ├── blit_rect_to_screen [UI] (43B)
│       │       └── port_copy_to_screen_clipped [UI] (220B)
│       └── call_refresh_callback [UI] (47B) — Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
├── save_civ2_dat [GL] (212B) — Saves CIV2.DAT preferences file.
├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION *** — Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │       ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │       ├── sum_stack_property [GL] (724B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── get_tile_explored [GL] (71B) — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │       └── is_tile_valid [GL] (80B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION *** — Calculates distance to capital and corruption-related variables for a city.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION *** — Checks if a trade route path exists between two points.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── set_map_scroll_position [UI] (98B)
│   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   ├── draw_number_on_map [UI] (346B)
│   │   │   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   ├── set_path_cost [GL] (91B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│   │   ├── calc_movement_cost [GL] (94B) — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   └── get_tile_continent [GL] (39B) — Returns byte 3 of tile data (continent/landmass ID).
│   │       └── get_tile_ptr [GL] (90B)
│   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION *** — Calculates shield production rows and unit support costs for a city.
│   │   ├── check_unit_support [GL] (281B) *** STATE MUTATION *** — Checks if a unit requires shield support based on government type.
│   │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION *** — Calculates the food box size (rows to grow) for a city.
│   │   ├── tile_distance_xy [GL] (157B) — Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`.
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   └── (1 FW helpers hidden)
│   └── recalc_city_all [GL] (76B) *** STATE MUTATION *** — Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and d...
│       ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION *** — Assigns city workers to optimal tiles.
│       │   ├── is_tile_worked [GL] (62B)
│       │   ├── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── grassland_has_shield [GL] (72B)
│       │   │   ├── find_city_at [GL] (245B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── check_auto_irrigation_trigger [GL] (297B) *** STATE MUTATION ***
│       │   │   ├── check_road_trade_trigger [GL] (152B) *** STATE MUTATION ***
│       │   │   ├── check_adjacent_water [GL] (242B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_city_owner_at [GL] (111B)
│       │   │   ├── get_tile_controller [GL] (72B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│       │   │   └── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│       │   ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│       │   │   └── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   ├── clear_and_check_worked_tiles [GL] (115B) *** STATE MUTATION ***
│       │   │   ├── set_tile_worked [GL] (91B) *** STATE MUTATION ***
│       │   │   └── unknown (get_city_tile_flag) [GL] (29B)
│       │   ├── unknown (get_city_tile_flag) [GL] (29B)
│       │   └── (1 FW helpers hidden)
│       ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION *** — Synchronizes worker tile status flags with the current tile assignment state.
│       │   ├── set_worker_tile_status [GL] (93B) *** STATE MUTATION ***
│       │   └── get_worker_tile_status [GL] (68B)
│       ├── calc_city_production [GL] (1053B) *** STATE MUTATION *** — Calculates a city's production output including building bonuses, factory effects, and waste.
│       │   ├── has_building [GL] (122B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── calc_corruption_divisor [GL] (81B)
│       │   │   └── (1 FW helpers hidden)
│       │   └── (1 FW helpers hidden)
│       ├── calc_happiness [GL] (2627B) *** STATE MUTATION *** — Complete happiness calculation for a city.
│       │   ├── has_building [GL] (122B)
│       │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── bit_index_to_byte_mask [GL] (45B)
│       │   │   ├── shift_by_signed [GL] (98B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_tile_continent [GL] (39B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── get_wonder_city [GL] (57B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   ├── adjust_happy_unhappy [GL] (453B) *** STATE MUTATION ***
│       │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│       │   ├── calc_movement_cost [GL] (94B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   └── (1 FW helpers hidden)
│       └── calc_trade_route_income [GL] (378B) *** STATE MUTATION *** — Calculates trade route income.
├── citywin_refresh_top_panels [UI] (153B) — Refreshes the top panels of the city window (citizens, resources, map).
│   ├── 00008ADC [?]
│   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│   ├── draw_citizens_row [UI] (577B) — Draws the citizen row panel at the top of the city window: header labels (food/shields produced), citizen icons, and ...
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   │   └── draw_text_centered [UI] (139B)
│   │   │       ├── measure_text_height [UI] (42B)
│   │   │       └── draw_text_with_shadow [UI] (205B)
│   │   ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
│   │   │   └── remove_click_region [UI] (107B)
│   │   ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
│   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   └── set_text_draw_source [UI] (24B)
│   │   ├── citywin_draw_citizen_icons [UI] (1186B) — Draws all citizen icons for the city: happy citizens, content citizens, unhappy citizens, and specialists (entertaine...
│   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── get_worker_tile_status [GL] (68B)
│   │   │   ├── scale_universal [UI] (67B)
│   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │       └── dispatch_oleitem_dimmed [UI] (677B)
│   │   ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
│   │   │   └── add_click_region [UI] (153B)
│   │   │       └── set_rect_wh [UI] (48B)
│   │   ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
│   │   └── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   └── draw_resource_rows [UI] (9761B) — The largest function in this block (9.7KB).
│       ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│       ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│       ├── fill_rect_palette [UI] (50B) — Fills a rectangle on the minimap surface with specified position, size, and palette color.
│       │   └── fill_rect_xywh [UI] (63B)
│       │       ├── set_rect_wh [UI] (48B)
│       │       └── port_fill_rect [UI] (236B)
│       ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│       ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│       ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│       ├── text_begin_bold [UI] (29B) — Begins bold text mode in the global text buffer.
│       ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│       ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│       ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│       ├── draw_text_at [UI] (42B) — Draws text at position (param_2, param_3) using the global drawing surface.
│       │   └── draw_text_with_shadow [UI] (205B)
│       │       ├── measure_text_height [UI] (42B)
│       │       ├── port_fill_rect_pattern [UI] (201B)
│       │       └── unknown (set/get draw color) [UI] (38B)
│       ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│       ├── draw_text_right_aligned [UI] (46B) — Draws text right-aligned within a rect.
│       │   └── draw_text_right_aligned [UI] (131B)
│       │       ├── measure_text_height [UI] (42B)
│       │       └── draw_text_with_shadow [UI] (205B)
│       ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│       │   ├── is_tile_valid [GL] (80B)
│       │   └── get_city_owner_at [GL] (111B)
│       ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
│       ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│       ├── render_tile [UI] (4431B) — The main tile rendering function.
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── grassland_has_shield [GL] (72B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   └── get_tile_terrain_raw [GL] (41B)
│       │   ├── is_x_in_range [UI] (141B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── wrap_x [GL] (94B)
│       │   ├── diagonal_movement_cost [GL] (135B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   ├── get_tile_ptr [GL] (90B)
│       │   ├── get_civ_vis_ptr [GL] (48B)
│       │   ├── get_tile_owner [GL] (100B)
│       │   ├── get_tile_explored [GL] (71B)
│       │   ├── get_city_owner_at [GL] (111B)
│       │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   └── get_tile_ptr [GL] (90B)
│       │   ├── check_tile_goody_hut [GL] (229B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   └── get_tile_owner [GL] (100B)
│       │   ├── get_tile_improvements [GL] (39B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── port_lock [UI] (287B)
│       │   │   ├── port_unlock [UI] (83B)
│       │   │   ├── port_get_pixel_ptr [UI] (45B)
│       │   │   ├── surface_is_locked [UI] (44B)
│       │   │   └── pixel_ptr_next_row [UI] (33B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       ├── set_sprite_scale [UI] (33B) — Sets the global sprite rendering scale to (param_1 + 8) / 8.
│       ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│       ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│       ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION *** — Calculates all 3 resource types (food/shields/trade) for a tile and accumulates into city totals.
│       ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
│       ├── citywin_draw_citizen_icons_simple [UI] (540B) — Simplified version of citizen icon drawing for the happiness breakdown section.
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── get_worker_tile_status [GL] (68B)
│       │   ├── scale_universal [UI] (67B)
│       │   ├── calc_icon_spacing [UI] (264B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
│       ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
│       ├── calc_icon_spacing [UI] (264B) — Calculates spacing for drawing a row of icons evenly distributed across a width.
│       ├── draw_unit [UI] (2803B) — Draws a complete unit sprite at the given coordinates.
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── rect_get_height [UI] (28B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   └── fill_rect_xywh [UI] (63B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│       │   │   ├── set_editor_font [UI] (93B)
│       │   │   └── scale_sprite [UI] (35B)
│       │   ├── select_display_unit [UI] (396B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── get_next_unit_in_stack [GL] (65B)
│       │   │   ├── get_first_unit_in_stack [GL] (118B)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   └── get_fortress_owner_at [GL] (77B)
│       │   ├── get_civ_dark_color [UI] (92B)
│       │   ├── get_unit_max_hp [GL] (45B)
│       │   ├── get_fortress_owner_at [GL] (77B)
│       │   │   ├── get_tile_owner [GL] (100B)
│       │   │   └── get_tile_improvements [GL] (39B)
│       │   ├── get_tile_improvements [GL] (39B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   ├── unknown (sprite blit wrapper 10) [UI] (57B)
│       │   └── (1 FW helpers hidden)
│       ├── draw_city_sprite [UI] (1737B) — Draws a complete city sprite on the map.
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   ├── fill_surface_from_rect [UI] (71B)
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── draw_text_at [UI] (42B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── has_building [GL] (122B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│       │   ├── get_civ_dark_color [UI] (92B)
│       │   ├── prepare_surface [UI] (24B)
│       │   ├── get_unit_owner_at [GL] (66B)
│       │   ├── set_text_draw_target [UI] (24B)
│       │   ├── set_text_draw_source [UI] (24B)
│       │   ├── set_text_style [UI] (68B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   └── (3 FW helpers hidden)
│       ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│       ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│       ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│       ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
│       ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│       └── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
├── dialog_create [UI] (588B) — Creates and initializes a dialog window with title, flags, position, and size.
│   ├── unknown (set_font_size) [UI] (43B) — Sets font size via internal object.
│   │   └── set_callback_0x38 [UI] (40B) — Sets a callback function pointer at offset +0x38 of the window object.
│   ├── unknown (set dialog video source) [UI] (43B) — Sets the video source for a dialog.
│   │   └── set_callback_0x3c [UI] (40B) — Sets a callback function pointer at offset +0x3c of the window object.
│   ├── dialog_create_buttons [UI] (675B) — Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── save_and_flush [UI] (41B) — Saves the current rendering context and flushes display updates.
│   │   │   ├── flush_at_origin [UI] (34B)
│   │   │   │   └── port_alloc_rect [UI] (58B)
│   │   │   └── swap_dc [UI] (43B)
│   │   │       └── 0000C0AB [?]
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   │   ├── 00008BE1 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── dialog_destroy_buttons [UI] (162B) — Destroys all 6 button window objects in the dialog by calling their destructor and zeroing the handle pointers.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (set_msg_handler_a) [UI] (45B) — Sets message handler at offset 0x60, returns old handler.
│   ├── unknown (set_msg_handler_b) [UI] (45B) — Sets message handler at offset 0x64, returns old handler.
│   ├── create_offscreen_surface_b [UI] (119B) — Creates an offscreen surface variant with 8 parameters (includes parent window).
│   │   ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│   │   ├── port_alloc_rect [UI] (58B) — Allocates a port surface from width and height dimensions by creating a RECT and delegating to port_alloc.
│   │   │   └── port_alloc [UI] (325B)
│   │   │       ├── 000035B0 [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── port_init [UI] (258B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── surface_is_locked [UI] (44B)
│   │   │       ├── destroy_dib_surface [UI] (155B)
│   │   │       ├── get_surface_stride [UI] (48B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── (1 FW helpers hidden)
│   │   ├── port_draw_text_rect [UI] (77B) — Selects a palette on the port's surface if it differs from the current one.
│   │   │   └── write_full_colortable [UI] (39B)
│   │   │       └── 00003B4C [?]
│   │   ├── surface_create_8param [UI] (85B) — Creates an 8-parameter surface.
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── surface_init_8 [UI] (96B)
│   │   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   │   ├── set_child_wndproc [UI] (55B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   └── set_dialog_wndproc [UI] (55B)
│   │   └── set_window_data_and_wndproc [UI] (55B) — Stores param_1 at GWL offset 0xc of the window at *(param_2+4) and sets the window procedure to 0x5e18ff (avi_window_...
│   └── (1 FW helpers hidden)
├── refresh_status_panel [UI] (297B) — Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION *** — Calculates the status panel layout based on screen dimensions.
│   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION *** — Draws the complete status panel unit section.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│   │   ├── draw_status_turn_info [UI] (474B) — Draws the turn number and year info section of the status panel.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   ├── set_text_style [UI] (68B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   └── port_set_rect [UI] (91B)
│   │   ├── draw_coordinate_text [UI] (132B) — Draws coordinate text (x,y and continent ID) at a given position.
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   ├── format_unit_orders_text [UI] (450B) — Formats the unit orders text for the status panel display.
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   ├── draw_status_panel_header [UI] (1182B) — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   └── advance_year_display [UI] (479B)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   ├── scale_sprite [UI] (35B)
│   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── draw_hline [UI] (69B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── fill_surface_from_rect [UI] (71B)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   ├── set_text_style [UI] (68B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (4 FW helpers hidden)
│   │   ├── select_display_unit [UI] (396B) — Selects which unit to display from a tile's unit stack.
│   │   ├── draw_unit [UI] (2803B) — Draws a complete unit sprite at the given coordinates.
│   │   ├── calc_unit_movement_points [GL] (516B) — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │       └── get_unit_max_hp [GL] (45B)
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   ├── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   ├── get_unit_home_city_name [GL] (89B) — Returns the name string of a unit's home city, or a "NONE" string if homeless.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   ├── check_tile_resource [GL] (281B) — Checks if a tile has a special resource.
│   │   ├── check_tile_goody_hut [GL] (229B) — Checks if a tile has a goody hut (village).
│   │   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
│   │   ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   └── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   └── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
├── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
├── port_constructor [FW] (44B) — Constructs a port object by setting its vtable pointer and initializing fields via FUN_005bd813.
│   └── port_init [UI] (258B) — Initializes all fields of a port object, either to zero (if param_1 is null) or from the dimensions of the provided R...
├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   ├── port_init_buffer [UI] (36B) — Wrapper that calls FUN_005bd696 with param_1.
│   │   └── port_alloc [UI] (325B) — Full port allocation: frees any existing DIB, creates a new DIB section of the specified size, and initializes pixel ...
│   ├── port_draw_text_rect [UI] (77B) — Selects a palette on the port's surface if it differs from the current one.
│   ├── palette_set_entries [UI] (142B) — Sets multiple palette entries from an RGB byte array.
│   │   ├── palette_apply [UI] (90B) — Applies the current palette and regenerates the random palette ID.
│   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   └── palette_set_entry [UI] (316B) — Sets a palette entry with proper flag management.
│   ├── check_topdown [UI] (41B) — Returns true if the surface at param_1 has top-down orientation (offset 0x14 == 1).
│   ├── flip_surface_vertical [UI] (249B) — Vertically flips a surface's pixel data in place by swapping rows from top and bottom.
│   │   ├── get_pixel_buffer [UI] (39B) — Returns the pixel buffer pointer at offset 0x24 of the surface, or 0 if null.
│   │   └── (4 FW helpers hidden)
│   └── (8 FW helpers hidden)
├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│   ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│   ├── disable_parent_window [UI] (121B) — Disables the parent (or specified owner) window to create a modal-like effect.
│   └── enable_parent_window [UI] (126B) — Re-enables the parent (or specified owner) window, reversing the modal effect.
└── palette_init [UI] (145B) — Initializes the palette object.
    ├── 0000E780 [?]
    ├── palette_generate_random_id [UI] (75B) — Generates a random non-zero 15-bit ID and stores at this+0x408.
    └── unknown (palette_create) [UI] (60B) — Creates a GDI palette if palette mode active, returns NULL otherwise.
```

### `0040E3B1` handle_revolution

> Handles the player initiating a revolution.

```
handle_revolution [GL] (397B) *** STATE MUTATION ***
├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   └── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION *** — Sets a string control value in the multiplayer dialog string table.
│   └── (1 FW helpers hidden)
├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
│   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   │   └── rng_next_float [GL] (94B) *** STATE MUTATION *** — Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + 0x3C6EF35F.
│   └── (10 FW helpers hidden)
├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
├── update_menu_state [MIXED] (3761B) — Updates all menu item enabled/disabled states based on current game state.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   └── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │       ├── is_tile_valid [GL] (80B)
│   │       ├── get_tile_owner [GL] (100B)
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   └── get_tile_ptr [GL] (90B)
│   │       └── get_tile_improvements [GL] (39B)
│   │           └── get_tile_ptr [GL] (90B)
│   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   └── is_wonder_obsolete [GL] (120B) — Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│   │       └── civ_has_tech [GL] (181B)
│   │           └── bit_index_to_byte_mask [GL] (45B)
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   ├── can_build_unit_type [GL] (1095B) — Checks if a civilization can build a specific unit type.
│   │   └── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   ├── update_menu_item_label [UI] (89B) — Updates a menu item's label text and enabled state.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── mp_format_template_string [UI] (504B) — Template string formatter.
│   │   ├── menu_set_subitem_checked [UI] (194B) — Sets or clears the checked state of a sub-menu item (bit 0).
│   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   └── menu_toggle_item_checked [UI] (103B)
│   │   │       ├── menu_get_visible_index [UI] (105B)
│   │   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │       └── menu_check_item [UI] (50B)
│   │   └── menu_update_subitem_text [UI] (155B) — Updates the display text of a sub-menu item.
│   │       ├── menu_get_visible_index [UI] (105B)
│   │       ├── menu_find_subitem_by_id [UI] (136B)
│   │       ├── menu_get_subitem_visible_index [UI] (114B)
│   │       ├── unknown (pipe-to-tab converter) [UI] (73B)
│   │       ├── menu_change_item_text [UI] (50B)
│   │       │   └── modify_menu_item [UI] (130B)
│   │       └── (1 FW helpers hidden)
│   ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│   ├── menu_populate [UI] (686B) — Populates the native menu from the internal linked-list representation.
│   │   ├── menu_set_host_window [UI] (80B) — Sets the host window for the menu control.
│   │   │   └── menu_setup_parent [UI] (59B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── unknown (get menu handle) [UI] (27B)
│   │   │       └── set_window_menu [UI] (99B)
│   │   ├── menu_toggle_item_checked [UI] (103B) — Toggles the checked state of a menu sub-item.
│   │   ├── menu_toggle_item_grayed [UI] (101B) — Toggles the grayed/disabled state of a menu sub-item.
│   │   │   ├── menu_get_visible_index [UI] (105B)
│   │   │   ├── menu_find_subitem_by_id [UI] (136B)
│   │   │   ├── menu_get_subitem_visible_index [UI] (114B)
│   │   │   └── menu_enable_item [UI] (50B)
│   │   │       └── check_menu_item [UI] (104B)
│   │   ├── menu_create_header [UI] (41B) — Creates a native menu header from a pipe-delimited string.
│   │   │   └── build_menu_from_string [UI] (376B)
│   │   │       └── parse_menu_string_recursive [UI] (586B)
│   │   ├── menu_insert_item [UI] (50B) — Inserts a menu item into the native menu at the specified position.
│   │   │   └── 0000128C [?]
│   │   ├── menu_delete_item [UI] (46B) — Deletes a menu item from the native menu at the given position.
│   │   │   └── delete_menu_item [UI] (102B)
│   │   ├── menu_update_host [UI] (52B) — Updates the host window's menu bar if a parent window (this+0x78) is set.
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   └── redraw_menubar [UI] (29B)
│   │   └── (1 FW helpers hidden)
│   ├── menu_set_subitem_hidden [UI] (129B) — Shows or hides a sub-menu item by setting/clearing bit 1 in its flags.
│   │   └── menu_find_subitem_by_id [UI] (136B) — Searches all top-level menu items and their sub-item lists for a sub-item with matching ID (param_1).
│   ├── menu_set_subitem_checked [UI] (194B) — Sets or clears the checked state of a sub-menu item (bit 0).
│   ├── menu_set_all_subitems_checked [UI] (111B) — Sets or clears the checked state for all sub-items of a given top-level menu item.
│   │   ├── menu_find_item_by_id [UI] (98B) — Searches the linked list of menu items (starting at this+0x1C) for one whose ID (at node+4) matches param_1.
│   │   └── menu_set_subitem_checked [UI] (194B) — Sets or clears the checked state of a sub-menu item (bit 0).
│   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │       └── is_tile_valid [GL] (80B)
│   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   └── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   ├── get_fortress_owner_at [GL] (77B) — Returns the fortress-owning civ at a tile, or -1.
│   │   ├── get_tile_owner [GL] (100B) — Returns the owner civ index for a tile (upper nibble of byte 5, >> 4).
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
├── set_government_type [GL] (529B) *** STATE MUTATION *** — Sets a civ's government type.
│   ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION *** — Shows the tax rate dialog for a civ.
│   │   ├── 00009429 [?]
│   │   ├── open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION *** — Creates and runs the tax rate adjustment dialog.
│   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   └── show_window_inner [UI] (38B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── get_max_tax_rate [GL] (156B)
│   │   │   ├── balance_tax_rates [GL] (293B)
│   │   │   ├── taxrate_recalc_totals [MIXED] (848B) *** STATE MUTATION ***
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│   │   │   │   └── calc_building_upkeep_cost [GL] (305B)
│   │   │   ├── process_messages [UI] (21B)
│   │   │   │   └── 0000BA4F [?]
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   └── 0000858E [?]
│   │   │   ├── set_dialog_enabled [UI] (36B)
│   │   │   ├── create_text_button [UI] (133B)
│   │   │   │   ├── 00009740 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── set_button_owner [UI] (45B)
│   │   │   │   └── get_window_object [UI] (28B)
│   │   │   ├── set_button_handler [UI] (45B)
│   │   │   │   └── get_window_object [UI] (28B)
│   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   ├── create_checkbox [UI] (167B)
│   │   │   │   ├── 0000BF40 [?]
│   │   │   │   ├── 0000C0F0 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── set_checkbox_callback [UI] (33B)
│   │   │   ├── set_checkbox_value [UI] (33B)
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── 0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── dialog_repaint_check [UI] (91B)
│   │   │   │   └── set_active_surface [UI] (74B)
│   │   │   ├── save_civ2_dat [GL] (212B)
│   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│   │   │   │   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│   │   │   │   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │   │   └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│   │   │   ├── citywin_refresh_top_panels [UI] (153B)
│   │   │   │   ├── 00008ADC [?]
│   │   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │   ├── draw_citizens_row [UI] (577B)
│   │   │   │   └── draw_resource_rows [UI] (9761B)
│   │   │   ├── dialog_create [UI] (588B)
│   │   │   │   ├── unknown (set_font_size) [UI] (43B)
│   │   │   │   ├── unknown (set dialog video source) [UI] (43B)
│   │   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │   │   │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │   │   │   ├── create_offscreen_surface_b [UI] (119B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── refresh_status_panel [UI] (297B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│   │   │   │   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   └── call_refresh_callback [UI] (47B)
│   │   │   ├── load_gif_resource [UI] (847B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   ├── flip_surface_vertical [UI] (249B)
│   │   │   │   └── (8 FW helpers hidden)
│   │   │   ├── modal_dialog_run [UI] (283B)
│   │   │   │   ├── process_messages [UI] (21B)
│   │   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   │   ├── disable_parent_window [UI] (121B)
│   │   │   │   └── enable_parent_window [UI] (126B)
│   │   │   ├── palette_init [UI] (145B)
│   │   │   │   ├── 0000E780 [?]
│   │   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   │   └── unknown (palette_create) [UI] (60B)
│   │   │   └── (5 FW helpers hidden)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   └── (3 FW helpers hidden)
│   │   └── (3 FW helpers hidden)
│   └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
└── ai_revolution_notification [GL] (1336B) *** STATE MUTATION *** — Handles AI revolution/government change notifications.
    ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
    ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
    ├── mp_set_string_control [UI] (46B) *** STATE MUTATION *** — Sets a string control value in the multiplayer dialog string table.
    ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
    ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
    │   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
    ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
    ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
    ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
    ├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
    │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
    │   └── (1 FW helpers hidden)
    ├── set_government_type [GL] (529B) *** STATE MUTATION *** — Sets a civ's government type.
    └── revolution_dialog [MIXED] (678B) *** STATE MUTATION *** — Revolution/government change dialog.
        ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
        ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
        │   └── popup_show_modal [UI] (999B)
        │       ├── flush_display [UI] (21B)
        │       ├── process_messages [UI] (21B)
        │       ├── get_view_window_handle [UI] (28B)
        │       ├── get_edit_text [UI] (43B)
        │       ├── init_palette_system [UI] (21B)
        │       ├── unknown — manage window [UI] (37B)
        │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
        │       ├── popup_paint [UI] (1964B)
        │       ├── unknown (popup_get_item_text) [UI] (47B)
        │       ├── unknown (popup_get_edit_text) [UI] (43B)
        │       ├── modal_dialog_run [UI] (283B)
        │       └── (2 FW helpers hidden)
        ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
        ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
        ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
        ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
        ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
        │   └── dialog_set_title_impl [UI] (42B)
        ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
        ├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
        ├── unknown (tutorial_show_city_screen) [UI] (42B) — Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4).
        │   └── 0051D564 [?] (178B)
        ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
        ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
        ├── set_government_type [GL] (529B) *** STATE MUTATION *** — Sets a civ's government type.
        ├── check_govt_available [GL] (323B) — Checks if a specific government type is available for a civ.
        │   ├── civ_has_active_wonder [GL] (142B)
        │   └── civ_has_tech [GL] (181B)
        ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
        │   ├── unknown (popup list init) [UI] (64B)
        │   ├── popup_dialog_reset [UI] (1299B)
        │   └── (1 FW helpers hidden)
        └── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
            ├── measure_text_height [UI] (42B)
            ├── popup_get_button_width [UI] (32B)
            └── (2 FW helpers hidden)
```

## City Management

### `0043F8B0` create_city

> Creates a new city at (param_1, param_2) for civ param_3.

```
create_city [GL] (2677B) *** STATE MUTATION ***
├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── get_tick_count_wrapper [FW] (21B) — Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
├── unknown (get mp object byte) [FW] (31B) — Returns a single byte from offset 0x1ef within the current object (in_ECX).
├── set_building [GL] (186B) *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION *** — Massive function that computes trade desirability scores for all 16 commodity types for a given city, based on terrai...
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │       └── is_wonder_obsolete [GL] (120B)
│   │           └── civ_has_tech [GL] (181B)
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── shift_by_signed [GL] (98B) — Shifts param_1 by param_2 bits.
│   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   ├── get_tile_continent [GL] (39B) — Returns byte 3 of tile data (continent/landmass ID).
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   ├── check_tile_resource [GL] (281B) — Checks if a tile has a special resource.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   └── (2 FW helpers hidden)
├── assign_city_name [GL] (778B) *** STATE MUTATION *** — Assigns a city name from the civilization's city name list in game text files.
├── city_update_tile_workers [GL] (265B) *** STATE MUTATION *** — Updates the map tile worker assignments for a city.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── get_tile_fertility [GL] (42B) — Returns lower 4 bits of byte 5 (fertility value 0-15).
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   ├── set_tile_fertility [GL] (305B) *** STATE MUTATION *** — Sets the fertility value (lower 4 bits of byte 5).
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       └── (1 FW helpers hidden)
│   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION *** — Sets the city-radius owner for a tile (top 3 bits of byte 2).
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│           ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│           ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│           │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION ***
│           ├── rle_encode (unnamed) [GL] (588B)
│           └── (2 FW helpers hidden)
├── debug_show_message [UI] (33B) — Shows a debug message popup using the DEBUG template string.
│   └── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── 0051D3E0 [?] (351B)
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
├── can_build_unit_type [GL] (1095B) — Checks if a civilization can build a specific unit type.
│   └── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
├── clamp [FW] (57B) — Clamps a value to [min, max] range.
├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
├── create_unit [GL] (1675B) *** STATE MUTATION *** — Creates a new unit of the specified type for a given civilization at a map position.
│   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION *** — Major game logic function that processes visibility updates after a unit moves.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION *** — Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air).
│   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION *** — Cancels goto orders for all units in a stack at a given location.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── is_tile_ocean [GL] (57B)
│   │   │       └── get_tile_terrain_raw [GL] (41B)
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION *** — Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_city_owner_at [GL] (111B)
│   │   │       ├── is_tile_valid [GL] (80B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── update_map_area_all_players [UI] (136B) — Updates a map area for all active players (all viewports in MP).
│   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │       ├── tile_to_screen [UI] (151B)
│   │   │       ├── is_tile_visible [UI] (99B)
│   │   │       ├── redraw_tile_area [UI] (352B)
│   │   │       ├── invalidate_tile_area [UI] (60B)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       ├── set_current_zoom_scale [UI] (41B)
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   │   └── update_map_tile [UI] (50B)
│   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   ├── update_radius1_all_players [UI] (124B) — Updates radius-1 area around a tile for all active players.
│   │   │   └── update_map_radius1 [UI] (50B)
│   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION *** — Adds a goal to AI goal list A.
│   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   └── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION *** — Master diplomatic contact processing function.
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   └── 0051D564 [?] (178B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   ├── break_alliance [MIXED] (632B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_sign_ceasefire [GL] (315B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_favor_menu [MIXED] (4878B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   ├── unknown (set trade route value) [GL] (29B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   ├── calc_war_readiness [GL] (820B) *** STATE MUTATION ***
│   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   ├── refresh_status_panel [UI] (297B)
│   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   └── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   └── get_attitude_raw [GL] (47B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION ***
│   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── set_active_control [UI] (38B)
│   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── should_declare_war [GL] (191B)
│   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   ├── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   └── get_civ_people_name [GL] (145B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION *** — Sets visibility for all units in a stack to be seen by a specific civ.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   ├── get_tile_explored [GL] (71B) — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   ├── get_tile_controller [GL] (72B) — Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│   ├── find_nearest_city [GL] (400B) — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   ├── calc_movement_cost [GL] (94B) — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   └── get_tile_continent_if_land [GL] (72B) — Returns continent ID only if tile is not ocean, otherwise -1.
│   │       ├── is_tile_ocean [GL] (57B)
│   │       └── get_tile_continent [GL] (39B)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
│   ├── unknown (tutorial_show_advice) [UI] (38B) — Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │   └── show_unit_type_picker [UI] (260B) — Shows a unit type picker dialog for the Civilopedia.
│   │       ├── select_list_item [UI] (38B)
│   │       │   └── popup_show_modal [UI] (999B)
│   │       ├── popup_dialog_create [UI] (93B)
│   │       │   ├── unknown (popup list init) [UI] (64B)
│   │       │   ├── popup_dialog_reset [UI] (1299B)
│   │       │   └── (1 FW helpers hidden)
│   │       ├── popup_add_button [UI] (360B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   └── (2 FW helpers hidden)
│   │       ├── sprite_init_empty [UI] (140B)
│   │       │   ├── port_alloc_rect [UI] (58B)
│   │       │   ├── port_set_color [UI] (43B)
│   │       │   ├── unknown (sprite extract with rect params) [UI] (88B)
│   │       │   └── (3 FW helpers hidden)
│   │       └── (3 FW helpers hidden)
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── calc_unit_movement_points [GL] (516B) — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   ├── get_unit_max_hp [GL] (45B) — Returns the maximum hit points for a unit based on its type.
│   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION *** — Returns the remaining HP of a unit (max_hp - damage).
│   │       └── get_unit_max_hp [GL] (45B)
│   ├── put_down_unit [GL] (640B) *** STATE MUTATION *** — Places a unit on the map at a given position.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── find_first_unit_at [GL] (186B) — Finds the first unit at position (param_2, param_3) belonging to civ param_1.
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── (2 FW helpers hidden)
│   └── (2 FW helpers hidden)
├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
├── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
├── get_tile_continent [GL] (39B) — Returns byte 3 of tile data (continent/landmass ID).
├── update_civ_visibility [GL] (75B) *** STATE MUTATION *** — Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   └── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears improvement bits on a tile.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
└── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
```

### `004413D1` delete_city

> Deletes a city from the game.

```
delete_city [GL] (1704B) *** STATE MUTATION ***
├── 00009429 [?]
├── 0000C449 [?]
├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── unknown (get mp object byte) [FW] (31B) — Returns a single byte from offset 0x1ef within the current object (in_ECX).
├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   └── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│       ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│       ├── get_tile_owner [GL] (100B) — Returns the owner civ index for a tile (upper nibble of byte 5, >> 4).
│       │   ├── is_tile_valid [GL] (80B)
│       │   └── get_tile_ptr [GL] (90B)
│       │       └── is_tile_valid [GL] (80B)
│       └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│           └── get_tile_ptr [GL] (90B)
├── city_update_tile_workers [GL] (265B) *** STATE MUTATION *** — Updates the map tile worker assignments for a city.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── get_tile_fertility [GL] (42B) — Returns lower 4 bits of byte 5 (fertility value 0-15).
│   │   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   ├── set_tile_fertility [GL] (305B) *** STATE MUTATION *** — Sets the fertility value (lower 4 bits of byte 5).
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       └── (1 FW helpers hidden)
│   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION *** — Sets the city-radius owner for a tile (top 3 bits of byte 2).
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│           ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│           ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│           │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION ***
│           ├── rle_encode (unnamed) [GL] (588B)
│           └── (2 FW helpers hidden)
├── remove_trade_route [GL] (199B) *** STATE MUTATION *** — Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entries down and decremen...
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION *** — Validates the integrity of a unit's linked list stack.
│       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION *** — Removes a unit from its map tile stack.
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── show_dialog_message [UI] (43B)
│       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│       │   ├── get_tile_ptr [GL] (90B)
│       │   └── (2 FW helpers hidden)
│       ├── put_down_unit [GL] (640B) *** STATE MUTATION *** — Places a unit on the map at a given position.
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── show_dialog_message [UI] (43B)
│       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│       │   ├── find_first_unit_at [GL] (186B)
│       │   │   └── get_first_unit_in_stack [GL] (118B)
│       │   ├── get_tile_ptr [GL] (90B)
│       │   └── (2 FW helpers hidden)
│       ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   └── get_first_unit_in_stack [GL] (118B)
│       │       └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│       └── (2 FW helpers hidden)
├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION *** — Validates the integrity of a unit's linked list stack.
│   ├── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
│   └── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
│       ├── get_tile_owner [GL] (100B) — Returns the owner civ index for a tile (upper nibble of byte 5, >> 4).
│       └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
├── count_units_by_role [GL] (120B) — Counts units in a stack that have a specific role.
│   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   └── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
├── delete_unit_visible [GL] (456B) *** STATE MUTATION *** — Deletes a unit and refreshes the map display at its former position.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   └── update_map_tile [UI] (50B) — Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI] (151B)
│   │           ├── is_tile_visible [UI] (99B)
│   │           ├── redraw_tile_area [UI] (352B)
│   │           ├── invalidate_tile_area [UI] (60B)
│   │           ├── reset_sprite_scale [UI] (28B)
│   │           ├── set_current_zoom_scale [UI] (41B)
│   │           └── unknown (sprite blit wrapper 1) [UI] (53B)
│   ├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units.
│   │   ├── 0000C494 [?]
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION *** — Deletes a unit.
│   │   │   ├── 0000C494 [?]
│   │   │   ├── 0000C679 [?]
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   └── (2 FW helpers hidden)
│   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION *** — Deletes every unit in a stack by iterating from first to last.
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   └── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION *** — Loads ground/air units onto a transport ship.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── eject_air_units [GL] (343B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   └── (2 FW helpers hidden)
│   └── (2 FW helpers hidden)
├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
├── get_tile_city_radius_owner [GL] (42B) — Returns upper 3 bits of byte 2 (>> 5) = city radius owner.
│   └── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
├── get_tile_fertility [GL] (42B) — Returns lower 4 bits of byte 5 (fertility value 0-15).
├── get_tile_controller [GL] (72B) — Returns the controlling civ at a tile — city owner first, then unit owner.
│   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   └── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears improvement bits on a tile.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
├── set_tile_fertility [GL] (305B) *** STATE MUTATION *** — Sets the fertility value (lower 4 bits of byte 5).
├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION *** — Sets the city-radius owner for a tile (top 3 bits of byte 2).
├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
└── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
```

### `00501551` citywin_constructor

> Constructor for the city window object.

```
citywin_constructor [UI] (136B)
├── object_init_null [FW] (34B) — Sets *ECX = 0.
├── unknown (return this) [FW] (25B) — Returns ECX (this pointer).
├── citywin_init_members [UI] (127B) — Initializes city window member variables to defaults.
└── dialog_ctor [UI] (146B) — Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
    └── init_sprite_surface_mgr [UI] (133B) — Initializes the sprite surface manager object.
        ├── init_sprite_cache [UI] (132B) — Initializes sprite cache fields in the rendering surface object.
        │   └── init_render_surface [UI] (274B)
        └── (1 FW helpers hidden)
```

### `00501819` citywin_click_citizen

> Handles clicking on a citizen icon in the city window.

```
citywin_click_citizen [MIXED] (424B) *** STATE MUTATION ***
├── show_city_popup [UI] (39B) — Shows a city information popup using the dialog system.
│   └── show_city_style_picker [UI] (260B) — Shows a city style picker dialog for the Civilopedia.
│       ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │   └── popup_show_modal [UI] (999B)
│       │       ├── flush_display [UI] (21B)
│       │       ├── process_messages [UI] (21B)
│       │       ├── get_view_window_handle [UI] (28B)
│       │       ├── get_edit_text [UI] (43B)
│       │       ├── init_palette_system [UI] (21B)
│       │       ├── unknown — manage window [UI] (37B)
│       │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│       │       ├── popup_paint [UI] (1964B)
│       │       ├── unknown (popup_get_item_text) [UI] (47B)
│       │       ├── unknown (popup_get_edit_text) [UI] (43B)
│       │       ├── modal_dialog_run [UI] (283B)
│       │       └── (2 FW helpers hidden)
│       ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│       │   ├── unknown (popup list init) [UI] (64B)
│       │   ├── popup_dialog_reset [UI] (1299B)
│       │   └── (1 FW helpers hidden)
│       ├── popup_add_button [UI] (360B) — Adds a button to the popup dialog.
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   └── (2 FW helpers hidden)
│       ├── sprite_init_empty [UI] (140B) — Initializes a sprite with given dimensions and fill color.
│       │   ├── port_alloc_rect [UI] (58B)
│       │   │   └── port_alloc [UI] (325B)
│       │   ├── port_set_color [UI] (43B)
│       │   │   └── port_fill_rect [UI] (236B)
│       │   ├── unknown (sprite extract with rect params) [UI] (88B)
│       │   │   ├── sprite_lock_data [UI] (56B)
│       │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│       │   └── (3 FW helpers hidden)
│       └── (3 FW helpers hidden)
├── set_worker_tile_status [GL] (93B) *** STATE MUTATION *** — Sets a worker tile status (2-bit field) in a city's tile assignment bitmask.
├── get_worker_tile_status [GL] (68B) — Gets a worker tile status (2-bit field) from a city's tile assignment bitmask.
├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION *** — Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │       ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │       ├── sum_stack_property [GL] (724B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── get_tile_explored [GL] (71B) — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │       └── is_tile_valid [GL] (80B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION *** — Calculates distance to capital and corruption-related variables for a city.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION *** — Checks if a trade route path exists between two points.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── set_map_scroll_position [UI] (98B)
│   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   ├── draw_number_on_map [UI] (346B)
│   │   │   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   ├── set_path_cost [GL] (91B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│   │   ├── calc_movement_cost [GL] (94B) — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   └── get_tile_continent [GL] (39B) — Returns byte 3 of tile data (continent/landmass ID).
│   │       └── get_tile_ptr [GL] (90B)
│   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION *** — Calculates shield production rows and unit support costs for a city.
│   │   ├── check_unit_support [GL] (281B) *** STATE MUTATION *** — Checks if a unit requires shield support based on government type.
│   │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION *** — Calculates the food box size (rows to grow) for a city.
│   │   ├── tile_distance_xy [GL] (157B) — Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`.
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   └── (1 FW helpers hidden)
│   └── recalc_city_all [GL] (76B) *** STATE MUTATION *** — Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and d...
│       ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION *** — Assigns city workers to optimal tiles.
│       │   ├── is_tile_worked [GL] (62B)
│       │   ├── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── grassland_has_shield [GL] (72B)
│       │   │   ├── find_city_at [GL] (245B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── check_auto_irrigation_trigger [GL] (297B) *** STATE MUTATION ***
│       │   │   ├── check_road_trade_trigger [GL] (152B) *** STATE MUTATION ***
│       │   │   ├── check_adjacent_water [GL] (242B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_city_owner_at [GL] (111B)
│       │   │   ├── get_tile_controller [GL] (72B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│       │   │   └── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│       │   ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│       │   │   └── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   ├── clear_and_check_worked_tiles [GL] (115B) *** STATE MUTATION ***
│       │   │   ├── set_tile_worked [GL] (91B) *** STATE MUTATION ***
│       │   │   └── unknown (get_city_tile_flag) [GL] (29B)
│       │   ├── unknown (get_city_tile_flag) [GL] (29B)
│       │   └── (1 FW helpers hidden)
│       ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION *** — Synchronizes worker tile status flags with the current tile assignment state.
│       │   ├── set_worker_tile_status [GL] (93B) *** STATE MUTATION ***
│       │   └── get_worker_tile_status [GL] (68B)
│       ├── calc_city_production [GL] (1053B) *** STATE MUTATION *** — Calculates a city's production output including building bonuses, factory effects, and waste.
│       │   ├── has_building [GL] (122B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   └── get_wonder_city [GL] (57B)
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── calc_corruption_divisor [GL] (81B)
│       │   │   └── (1 FW helpers hidden)
│       │   └── (1 FW helpers hidden)
│       ├── calc_happiness [GL] (2627B) *** STATE MUTATION *** — Complete happiness calculation for a city.
│       │   ├── has_building [GL] (122B)
│       │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── bit_index_to_byte_mask [GL] (45B)
│       │   │   ├── shift_by_signed [GL] (98B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_tile_continent [GL] (39B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── get_wonder_city [GL] (57B)
│       │   │   └── is_wonder_obsolete [GL] (120B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   ├── adjust_happy_unhappy [GL] (453B) *** STATE MUTATION ***
│       │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── count_worker_tiles_with_status [GL] (87B)
│       │   │   └── (1 FW helpers hidden)
│       │   ├── calc_movement_cost [GL] (94B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   └── (1 FW helpers hidden)
│       └── calc_trade_route_income [GL] (378B) *** STATE MUTATION *** — Calculates trade route income.
└── citywin_refresh_top_panels [UI] (153B) — Refreshes the top panels of the city window (citizens, resources, map).
    ├── 00008ADC [?]
    ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
    ├── draw_citizens_row [UI] (577B) — Draws the citizen row panel at the top of the city window: header labels (food/shields produced), citizen icons, and ...
    │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
    │   │   ├── blit_rect_to_screen [UI] (43B)
    │   │   │   └── validate_window_rect [UI] (43B)
    │   │   └── port_copy_to_screen_clipped [UI] (220B)
    │   │       ├── 0000CC11 [?]
    │   │       ├── rect_get_width [UI] (27B)
    │   │       ├── rect_get_height [UI] (28B)
    │   │       ├── get_view_window_handle [UI] (28B)
    │   │       ├── get_surface_hwnd [UI] (28B)
    │   │       ├── port_lock [UI] (287B)
    │   │       ├── port_unlock [UI] (83B)
    │   │       ├── port_select_palette [UI] (87B)
    │   │       └── surface_is_locked [UI] (44B)
    │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
    │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
    │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
    │   ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
    │   │   └── draw_text_centered [UI] (139B)
    │   │       ├── measure_text_height [UI] (42B)
    │   │       └── draw_text_with_shadow [UI] (205B)
    │   ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
    │   │   └── remove_click_region [UI] (107B)
    │   ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
    │   │   ├── citywin_blit_panel [UI] (129B)
    │   │   │   ├── rect_get_width [UI] (27B)
    │   │   │   ├── rect_get_height [UI] (28B)
    │   │   │   └── blit_rect_to_rect [UI] (95B)
    │   │   ├── prepare_surface [UI] (24B)
    │   │   ├── set_text_draw_target [UI] (24B)
    │   │   └── set_text_draw_source [UI] (24B)
    │   ├── citywin_draw_citizen_icons [UI] (1186B) — Draws all citizen icons for the city: happy citizens, content citizens, unhappy citizens, and specialists (entertaine...
    │   │   ├── get_city_epoch [GL] (158B)
    │   │   │   └── civ_has_tech [GL] (181B)
    │   │   ├── set_sprite_scale [UI] (33B)
    │   │   │   └── scale_table_build_primary [UI] (657B)
    │   │   ├── reset_sprite_scale [UI] (28B)
    │   │   │   └── scale_table_build_primary [UI] (657B)
    │   │   ├── get_worker_tile_status [GL] (68B)
    │   │   ├── scale_universal [UI] (67B)
    │   │   ├── calc_icon_spacing [UI] (264B)
    │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
    │   │   │   └── dispatch_oleitem_normal [UI] (673B)
    │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
    │   │       └── dispatch_oleitem_dimmed [UI] (677B)
    │   ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
    │   │   └── add_click_region [UI] (153B)
    │   │       └── set_rect_wh [UI] (48B)
    │   ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
    │   └── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
    └── draw_resource_rows [UI] (9761B) — The largest function in this block (9.7KB).
        ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
        ├── invalidate_region [UI] (180B) — Invalidates a screen region.
        ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
        ├── fill_rect_palette [UI] (50B) — Fills a rectangle on the minimap surface with specified position, size, and palette color.
        │   └── fill_rect_xywh [UI] (63B)
        │       ├── set_rect_wh [UI] (48B)
        │       └── port_fill_rect [UI] (236B)
        ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
        ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
        ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
        ├── text_begin_bold [UI] (29B) — Begins bold text mode in the global text buffer.
        ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
        ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
        ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
        ├── draw_text_at [UI] (42B) — Draws text at position (param_2, param_3) using the global drawing surface.
        │   └── draw_text_with_shadow [UI] (205B)
        │       ├── measure_text_height [UI] (42B)
        │       ├── port_fill_rect_pattern [UI] (201B)
        │       └── unknown (set/get draw color) [UI] (38B)
        ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
        ├── draw_text_right_aligned [UI] (46B) — Draws text right-aligned within a rect.
        │   └── draw_text_right_aligned [UI] (131B)
        │       ├── measure_text_height [UI] (42B)
        │       └── draw_text_with_shadow [UI] (205B)
        ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
        │   ├── is_tile_valid [GL] (80B)
        │   └── get_city_owner_at [GL] (111B)
        ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
        ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
        ├── render_tile [UI] (4431B) — The main tile rendering function.
        │   ├── is_tile_valid [GL] (80B)
        │   ├── grassland_has_shield [GL] (72B)
        │   ├── get_civ_background_color [UI] (92B)
        │   ├── scale_sprite [UI] (35B)
        │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
        │   │   ├── is_tile_valid [GL] (80B)
        │   │   ├── wrap_x [GL] (94B)
        │   │   └── get_tile_terrain_raw [GL] (41B)
        │   ├── is_x_in_range [UI] (141B)
        │   ├── set_sprite_scale [UI] (33B)
        │   ├── reset_sprite_scale [UI] (28B)
        │   ├── wrap_x [GL] (94B)
        │   ├── diagonal_movement_cost [GL] (135B)
        │   ├── get_next_unit_in_stack [GL] (65B)
        │   ├── find_unit_stack_at_xy [GL] (231B)
        │   ├── get_tile_ptr [GL] (90B)
        │   ├── get_civ_vis_ptr [GL] (48B)
        │   ├── get_tile_owner [GL] (100B)
        │   ├── get_tile_explored [GL] (71B)
        │   ├── get_city_owner_at [GL] (111B)
        │   ├── check_tile_resource [GL] (281B)
        │   │   ├── is_tile_valid [GL] (80B)
        │   │   └── get_tile_ptr [GL] (90B)
        │   ├── check_tile_goody_hut [GL] (229B)
        │   │   ├── is_tile_valid [GL] (80B)
        │   │   ├── is_tile_ocean [GL] (57B)
        │   │   └── get_tile_owner [GL] (100B)
        │   ├── get_tile_improvements [GL] (39B)
        │   ├── port_copy_rect [UI] (282B)
        │   │   ├── rect_get_width [UI] (27B)
        │   │   ├── rect_get_height [UI] (28B)
        │   │   ├── port_lock [UI] (287B)
        │   │   ├── port_unlock [UI] (83B)
        │   │   ├── port_get_pixel_ptr [UI] (45B)
        │   │   ├── surface_is_locked [UI] (44B)
        │   │   └── pixel_ptr_next_row [UI] (33B)
        │   └── unknown (sprite blit wrapper 1) [UI] (53B)
        ├── set_sprite_scale [UI] (33B) — Sets the global sprite rendering scale to (param_1 + 8) / 8.
        ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
        ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
        ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION *** — Calculates all 3 resource types (food/shields/trade) for a tile and accumulates into city totals.
        ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
        ├── citywin_draw_citizen_icons_simple [UI] (540B) — Simplified version of citizen icon drawing for the happiness breakdown section.
        │   ├── set_sprite_scale [UI] (33B)
        │   ├── reset_sprite_scale [UI] (28B)
        │   ├── get_worker_tile_status [GL] (68B)
        │   ├── scale_universal [UI] (67B)
        │   ├── calc_icon_spacing [UI] (264B)
        │   └── unknown (sprite blit wrapper 1) [UI] (53B)
        ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
        ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
        ├── calc_icon_spacing [UI] (264B) — Calculates spacing for drawing a row of icons evenly distributed across a width.
        ├── draw_unit [UI] (2803B) — Draws a complete unit sprite at the given coordinates.
        │   ├── rect_get_width [UI] (27B)
        │   ├── rect_get_height [UI] (28B)
        │   ├── set_rect_wh [UI] (48B)
        │   ├── is_tile_valid [GL] (80B)
        │   ├── fill_surface_from_rect [UI] (71B)
        │   │   ├── rect_get_width [UI] (27B)
        │   │   ├── rect_get_height [UI] (28B)
        │   │   └── fill_rect_xywh [UI] (63B)
        │   ├── get_civ_background_color [UI] (92B)
        │   ├── scale_sprite [UI] (35B)
        │   ├── set_sprite_scale [UI] (33B)
        │   ├── reset_sprite_scale [UI] (28B)
        │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
        │   │   ├── set_editor_font [UI] (93B)
        │   │   └── scale_sprite [UI] (35B)
        │   ├── select_display_unit [UI] (396B)
        │   │   ├── is_tile_valid [GL] (80B)
        │   │   ├── get_next_unit_in_stack [GL] (65B)
        │   │   ├── get_first_unit_in_stack [GL] (118B)
        │   │   ├── is_tile_ocean [GL] (57B)
        │   │   └── get_fortress_owner_at [GL] (77B)
        │   ├── get_civ_dark_color [UI] (92B)
        │   ├── get_unit_max_hp [GL] (45B)
        │   ├── get_fortress_owner_at [GL] (77B)
        │   │   ├── get_tile_owner [GL] (100B)
        │   │   └── get_tile_improvements [GL] (39B)
        │   ├── get_tile_improvements [GL] (39B)
        │   ├── port_copy_rect [UI] (282B)
        │   ├── port_fill_rect_pattern [UI] (201B)
        │   │   ├── 0000847F [?]
        │   │   ├── unknown (set/get draw color) [UI] (38B)
        │   │   └── draw_string_palette [UI] (534B)
        │   ├── unknown (set/get draw color) [UI] (38B)
        │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
        │   ├── unknown (sprite blit wrapper 10) [UI] (57B)
        │   └── (1 FW helpers hidden)
        ├── draw_city_sprite [UI] (1737B) — Draws a complete city sprite on the map.
        │   ├── set_rect_wh [UI] (48B)
        │   ├── get_font_height [UI] (28B)
        │   ├── measure_text_height [UI] (42B)
        │   ├── fill_surface_from_rect [UI] (71B)
        │   ├── draw_border_rect [UI] (61B)
        │   │   └── draw_rect_outline [UI] (128B)
        │   ├── draw_text_at [UI] (42B)
        │   ├── get_civ_background_color [UI] (92B)
        │   ├── has_building [GL] (122B)
        │   ├── civ_has_active_wonder [GL] (142B)
        │   ├── scale_sprite [UI] (35B)
        │   ├── set_sprite_scale [UI] (33B)
        │   ├── reset_sprite_scale [UI] (28B)
        │   ├── widget_inflate_rect_neg [UI] (40B)
        │   │   └── widget_inflate_rect [UI] (34B)
        │   ├── civ_has_tech [GL] (181B)
        │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
        │   ├── get_civ_dark_color [UI] (92B)
        │   ├── prepare_surface [UI] (24B)
        │   ├── get_unit_owner_at [GL] (66B)
        │   ├── set_text_draw_target [UI] (24B)
        │   ├── set_text_draw_source [UI] (24B)
        │   ├── set_text_style [UI] (68B)
        │   ├── port_copy_rect [UI] (282B)
        │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
        │   └── (3 FW helpers hidden)
        ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
        ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
        ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
        ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
        ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
        └── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
```

### `005022C0` citywin_click_resource_map

> Handles clicking on the resource map in the city window.

```
citywin_click_resource_map [MIXED] (784B) *** STATE MUTATION ***
├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
├── set_tile_worked [GL] (91B) *** STATE MUTATION *** — Sets or clears a tile's worked status in a city's worked-tiles bitmask.
├── adjust_specialist_count [GL] (149B) *** STATE MUTATION *** — Adjusts the specialist count stored in the upper 6 bits of DAT_0064f370.
├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│   ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION *** — Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │       ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │       ├── sum_stack_property [GL] (724B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── get_tile_explored [GL] (71B) — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │       └── is_tile_valid [GL] (80B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION *** — Calculates distance to capital and corruption-related variables for a city.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION *** — Checks if a trade route path exists between two points.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── find_path [GL] (4118B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── set_map_scroll_position [UI] (98B)
│   │   │   │   ├── debug_show_message [UI] (33B)
│   │   │   │   ├── draw_number_on_map [UI] (346B)
│   │   │   │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │   │   ├── get_path_cost [GL] (88B)
│   │   │   │   ├── set_path_cost [GL] (91B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── check_tile_trespass [GL] (245B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│   │   ├── calc_movement_cost [GL] (94B) — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   └── get_tile_continent [GL] (39B) — Returns byte 3 of tile data (continent/landmass ID).
│   │       └── get_tile_ptr [GL] (90B)
│   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION *** — Calculates shield production rows and unit support costs for a city.
│   │   ├── check_unit_support [GL] (281B) *** STATE MUTATION *** — Checks if a unit requires shield support based on government type.
│   │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION *** — Calculates the food box size (rows to grow) for a city.
│   │   ├── tile_distance_xy [GL] (157B) — Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`.
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   └── (1 FW helpers hidden)
│   └── recalc_city_all [GL] (76B) *** STATE MUTATION *** — Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and d...
│       ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION *** — Assigns city workers to optimal tiles.
│       │   ├── is_tile_worked [GL] (62B)
│       │   ├── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── grassland_has_shield [GL] (72B)
│       │   │   ├── find_city_at [GL] (245B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── check_auto_irrigation_trigger [GL] (297B) *** STATE MUTATION ***
│       │   │   ├── check_road_trade_trigger [GL] (152B) *** STATE MUTATION ***
│       │   │   ├── check_adjacent_water [GL] (242B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_city_owner_at [GL] (111B)
│       │   │   ├── get_tile_controller [GL] (72B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│       │   │   └── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│       │   ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION ***
│       │   │   └── calc_tile_resource [GL] (1528B) *** STATE MUTATION ***
│       │   ├── clear_and_check_worked_tiles [GL] (115B) *** STATE MUTATION ***
│       │   │   ├── set_tile_worked [GL] (91B) *** STATE MUTATION ***
│       │   │   └── unknown (get_city_tile_flag) [GL] (29B)
│       │   ├── unknown (get_city_tile_flag) [GL] (29B)
│       │   └── (1 FW helpers hidden)
│       ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION *** — Synchronizes worker tile status flags with the current tile assignment state.
│       │   ├── set_worker_tile_status [GL] (93B) *** STATE MUTATION ***
│       │   └── get_worker_tile_status [GL] (68B)
│       ├── calc_city_production [GL] (1053B) *** STATE MUTATION *** — Calculates a city's production output including building bonuses, factory effects, and waste.
│       │   ├── has_building [GL] (122B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   └── get_wonder_city [GL] (57B)
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── calc_corruption_divisor [GL] (81B)
│       │   │   └── (1 FW helpers hidden)
│       │   └── (1 FW helpers hidden)
│       ├── calc_happiness [GL] (2627B) *** STATE MUTATION *** — Complete happiness calculation for a city.
│       │   ├── has_building [GL] (122B)
│       │   ├── calc_city_trade_desirability [GL] (8227B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   ├── bit_index_to_byte_mask [GL] (45B)
│       │   │   ├── shift_by_signed [GL] (98B)
│       │   │   ├── get_tile_ptr [GL] (90B)
│       │   │   ├── get_tile_terrain_raw [GL] (41B)
│       │   │   ├── get_tile_continent [GL] (39B)
│       │   │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── get_tile_improvements [GL] (39B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── get_wonder_city [GL] (57B)
│       │   │   └── is_wonder_obsolete [GL] (120B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── calc_corruption [GL] (890B) *** STATE MUTATION ***
│       │   ├── adjust_happy_unhappy [GL] (453B) *** STATE MUTATION ***
│       │   ├── distribute_trade [GL] (1769B) *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (122B)
│       │   │   ├── get_wonder_city [GL] (57B)
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── civ_has_tech [GL] (181B)
│       │   │   ├── count_worker_tiles_with_status [GL] (87B)
│       │   │   └── (1 FW helpers hidden)
│       │   ├── calc_movement_cost [GL] (94B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   └── (1 FW helpers hidden)
│       └── calc_trade_route_income [GL] (378B) *** STATE MUTATION *** — Calculates trade route income.
├── citywin_refresh_top_panels [UI] (153B) — Refreshes the top panels of the city window (citizens, resources, map).
│   ├── 00008ADC [?]
│   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│   ├── draw_citizens_row [UI] (577B) — Draws the citizen row panel at the top of the city window: header labels (food/shields produced), citizen icons, and ...
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── validate_window_rect [UI] (43B)
│   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │       ├── 0000CC11 [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── get_surface_hwnd [UI] (28B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── port_select_palette [UI] (87B)
│   │   │       └── surface_is_locked [UI] (44B)
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   │   └── draw_text_centered [UI] (139B)
│   │   │       ├── measure_text_height [UI] (42B)
│   │   │       └── draw_text_with_shadow [UI] (205B)
│   │   ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
│   │   │   └── remove_click_region [UI] (107B)
│   │   ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
│   │   │   ├── citywin_blit_panel [UI] (129B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   └── set_text_draw_source [UI] (24B)
│   │   ├── citywin_draw_citizen_icons [UI] (1186B) — Draws all citizen icons for the city: happy citizens, content citizens, unhappy citizens, and specialists (entertaine...
│   │   │   ├── get_city_epoch [GL] (158B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── get_worker_tile_status [GL] (68B)
│   │   │   ├── scale_universal [UI] (67B)
│   │   │   ├── calc_icon_spacing [UI] (264B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │   └── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │       └── dispatch_oleitem_dimmed [UI] (677B)
│   │   ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
│   │   │   └── add_click_region [UI] (153B)
│   │   │       └── set_rect_wh [UI] (48B)
│   │   ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
│   │   └── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   └── draw_resource_rows [UI] (9761B) — The largest function in this block (9.7KB).
│       ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│       ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│       ├── fill_rect_palette [UI] (50B) — Fills a rectangle on the minimap surface with specified position, size, and palette color.
│       │   └── fill_rect_xywh [UI] (63B)
│       │       ├── set_rect_wh [UI] (48B)
│       │       └── port_fill_rect [UI] (236B)
│       ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│       ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│       ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│       ├── text_begin_bold [UI] (29B) — Begins bold text mode in the global text buffer.
│       ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│       ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│       ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│       ├── draw_text_at [UI] (42B) — Draws text at position (param_2, param_3) using the global drawing surface.
│       │   └── draw_text_with_shadow [UI] (205B)
│       │       ├── measure_text_height [UI] (42B)
│       │       ├── port_fill_rect_pattern [UI] (201B)
│       │       └── unknown (set/get draw color) [UI] (38B)
│       ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│       ├── draw_text_right_aligned [UI] (46B) — Draws text right-aligned within a rect.
│       │   └── draw_text_right_aligned [UI] (131B)
│       │       ├── measure_text_height [UI] (42B)
│       │       └── draw_text_with_shadow [UI] (205B)
│       ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│       │   ├── is_tile_valid [GL] (80B)
│       │   └── get_city_owner_at [GL] (111B)
│       ├── close_dialog [UI] (94B) — Removes all click regions with a matching dialog ID (param_1).
│       ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│       ├── render_tile [UI] (4431B) — The main tile rendering function.
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── grassland_has_shield [GL] (72B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── calc_coast_quadrants [UI] (386B) *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── wrap_x [GL] (94B)
│       │   │   └── get_tile_terrain_raw [GL] (41B)
│       │   ├── is_x_in_range [UI] (141B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── wrap_x [GL] (94B)
│       │   ├── diagonal_movement_cost [GL] (135B)
│       │   ├── get_next_unit_in_stack [GL] (65B)
│       │   ├── find_unit_stack_at_xy [GL] (231B)
│       │   ├── get_tile_ptr [GL] (90B)
│       │   ├── get_civ_vis_ptr [GL] (48B)
│       │   ├── get_tile_owner [GL] (100B)
│       │   ├── get_tile_explored [GL] (71B)
│       │   ├── get_city_owner_at [GL] (111B)
│       │   ├── check_tile_resource [GL] (281B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   └── get_tile_ptr [GL] (90B)
│       │   ├── check_tile_goody_hut [GL] (229B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   └── get_tile_owner [GL] (100B)
│       │   ├── get_tile_improvements [GL] (39B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── port_lock [UI] (287B)
│       │   │   ├── port_unlock [UI] (83B)
│       │   │   ├── port_get_pixel_ptr [UI] (45B)
│       │   │   ├── surface_is_locked [UI] (44B)
│       │   │   └── pixel_ptr_next_row [UI] (33B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       ├── set_sprite_scale [UI] (33B) — Sets the global sprite rendering scale to (param_1 + 8) / 8.
│       ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│       ├── is_tile_worked [GL] (62B) — Returns whether a specific tile (param_2) is being worked by city param_1.
│       ├── calc_tile_all_resources [GL] (130B) *** STATE MUTATION *** — Calculates all 3 resource types (food/shields/trade) for a tile and accumulates into city totals.
│       ├── citywin_prepare_panel [UI] (77B) — Prepares a panel for drawing: clears surface, sets draw state, blits background.
│       ├── citywin_draw_citizen_icons_simple [UI] (540B) — Simplified version of citizen icon drawing for the happiness breakdown section.
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── get_worker_tile_status [GL] (68B)
│       │   ├── scale_universal [UI] (67B)
│       │   ├── calc_icon_spacing [UI] (264B)
│       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       ├── invalidate_rect_region [UI] (78B) — Invalidates a rectangular region by unpacking a RECT structure (param_3) and computing width/height deltas, then call...
│       ├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
│       ├── calc_icon_spacing [UI] (264B) — Calculates spacing for drawing a row of icons evenly distributed across a width.
│       ├── draw_unit [UI] (2803B) — Draws a complete unit sprite at the given coordinates.
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── rect_get_height [UI] (28B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   └── fill_rect_xywh [UI] (63B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│       │   │   ├── set_editor_font [UI] (93B)
│       │   │   └── scale_sprite [UI] (35B)
│       │   ├── select_display_unit [UI] (396B)
│       │   │   ├── is_tile_valid [GL] (80B)
│       │   │   ├── get_next_unit_in_stack [GL] (65B)
│       │   │   ├── get_first_unit_in_stack [GL] (118B)
│       │   │   ├── is_tile_ocean [GL] (57B)
│       │   │   └── get_fortress_owner_at [GL] (77B)
│       │   ├── get_civ_dark_color [UI] (92B)
│       │   ├── get_unit_max_hp [GL] (45B)
│       │   ├── get_fortress_owner_at [GL] (77B)
│       │   │   ├── get_tile_owner [GL] (100B)
│       │   │   └── get_tile_improvements [GL] (39B)
│       │   ├── get_tile_improvements [GL] (39B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   ├── unknown (sprite blit wrapper 10) [UI] (57B)
│       │   └── (1 FW helpers hidden)
│       ├── draw_city_sprite [UI] (1737B) — Draws a complete city sprite on the map.
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── fill_surface_from_rect [UI] (71B)
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── draw_text_at [UI] (42B)
│       │   ├── get_civ_background_color [UI] (92B)
│       │   ├── has_building [GL] (122B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── civ_has_tech [GL] (181B)
│       │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│       │   ├── get_civ_dark_color [UI] (92B)
│       │   ├── prepare_surface [UI] (24B)
│       │   ├── get_unit_owner_at [GL] (66B)
│       │   ├── set_text_draw_target [UI] (24B)
│       │   ├── set_text_draw_source [UI] (24B)
│       │   ├── set_text_style [UI] (68B)
│       │   ├── port_copy_rect [UI] (282B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   └── (3 FW helpers hidden)
│       ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│       ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│       ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│       ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
│       ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│       └── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
├── scale_universal [UI] (67B) — Scales a value based on the display scale factor at `this + 0x15d4`.
└── port_set_pixel [UI] (107B) — Gets a single pixel value at (param_1, param_2).
    ├── port_get_pixel_ptr [UI] (45B) — Returns a pointer to the pixel at (param_1, param_2) in the locked port buffer.
    ├── port_alloc_variant_b [UI] (93B) — Checks if (param_1, param_2) is within the port's clip rect.
    └── (1 FW helpers hidden)
```

## Research & Discovery

### `004BF05B` handle_tech_discovery

> Master handler for when a civilization discovers a new technology.

```
handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   └── popup_show_modal [UI] (999B) — Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│       ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│       ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│       │   └── 0000BA4F [?]
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│       │   └── 00002D4D [?]
│       ├── init_palette_system [UI] (21B) — Initializes the palette system.
│       ├── unknown — manage window [UI] (37B) — Calls manage_window_C692 with the window handle from the object's field at offset 8.
│       │   └── 0000C692 [?]
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   └── focus_and_raise_window [UI] (57B)
│       │   ├── widget_scrollbar_dtor [UI] (57B)
│       │   │   └── scrollbar_widget_dtor [UI] (112B)
│       │   ├── widget_dropdown_dtor [UI] (57B)
│       │   └── (4 FW helpers hidden)
│       ├── popup_paint [UI] (1964B) — Master paint function for the popup system.
│       │   ├── end_paint [UI] (32B)
│       │   │   └── invalidate_region [UI] (180B)
│       │   ├── show_window_wrapper [UI] (33B)
│       │   │   └── show_window_inner [UI] (38B)
│       │   ├── set_rect_abs [UI] (42B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── control_invalidate [UI] (65B)
│       │   │   ├── 00008B00 [?]
│       │   │   └── 00008B2D [?]
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   │   └── scale_table_build_primary [UI] (657B)
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   ├── widget_get_height [UI] (34B)
│       │   │   └── rect_get_height [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── popup_get_padded_height [UI] (42B)
│       │   ├── popup_render_label [UI] (226B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   └── port_fill_rect_pattern [UI] (201B)
│       │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_render_text_at_offset [UI] (61B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── popup_layout_dialog [UI] (4785B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_calc_max_text_height [UI] (132B)
│       │   │   ├── popup_get_line_height [UI] (78B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_calc_button_area_height [UI] (46B)
│       │   │   ├── popup_calc_text_width [UI] (51B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── popup_render_label [UI] (226B)
│       │   │   ├── popup_has_negative_line_count [UI] (83B)
│       │   │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_get_radio_page_number [UI] (56B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   ├── blit_rect_to_rect [UI] (95B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   └── unknown (set/get draw color) [UI] (38B)
│       │   ├── popup_redraw_visible_items [UI] (660B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── draw_border_rect [UI] (61B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_draw_item [UI] (706B)
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   └── port_set_rect [UI] (91B)
│       │   ├── popup_create_window [UI] (693B)
│       │   │   ├── set_callback_0x44 [UI] (45B)
│       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│       │   │   ├── unknown (set_font_size) [UI] (43B)
│       │   │   ├── create_offscreen_surface [UI] (115B)
│       │   │   └── create_offscreen_surface_b [UI] (119B)
│       │   ├── popup_init_controls [UI] (6616B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── create_checkbox [UI] (167B)
│       │   │   ├── set_checkbox_value [UI] (33B)
│       │   │   ├── create_scrollbar [UI] (124B)
│       │   │   ├── scrollbar_set_position [UI] (52B)
│       │   │   ├── scrollbar_set_range [UI] (47B)
│       │   │   ├── scrollbar_set_callback [UI] (33B)
│       │   │   ├── set_edit_max_chars [UI] (43B)
│       │   │   ├── create_listbox_control [UI] (121B)
│       │   │   ├── add_listbox_item [UI] (49B)
│       │   │   ├── disable_civ_slot [UI] (133B)
│       │   │   ├── unknown (set selected item) [UI] (33B)
│       │   │   ├── pedia_button_create [UI] (139B)
│       │   │   ├── unknown (set button callback) [UI] (33B)
│       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── widget_get_height [UI] (34B)
│       │   │   ├── scrollbar_init [UI] (93B)
│       │   │   ├── scrollbar_create_window [UI] (207B)
│       │   │   ├── scrollbar_set_position [UI] (33B)
│       │   │   ├── scrollbar_set_range [UI] (33B)
│       │   │   ├── unknown [UI] (43B)
│       │   │   ├── unknown [UI] (33B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_count_items_in_pane [UI] (93B)
│       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│       │   │   ├── set_scrollbar [UI] (64B)
│       │   │   └── (13 FW helpers hidden)
│       │   ├── popup_draw_background [UI] (309B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── unknown [UI] (56B)
│       │   │   └── tile_bitmap [UI] (391B)
│       │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── popup_render_label [UI] (226B)
│       │   ├── draw_3d_border [UI] (167B)
│       │   │   ├── draw_hline [UI] (69B)
│       │   │   └── draw_vline [UI] (69B)
│       │   ├── port_draw_text_styled [UI] (238B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   └── dispatch_oleitem_normal [UI] (673B)
│       │   └── unknown (invalidate_all_children) [UI] (115B)
│       │       ├── 00008B00 [?]
│       │       └── 00008B2D [?]
│       ├── unknown (popup_get_item_text) [UI] (47B) — Gets item text from a list control via a Windows message.
│       │   └── 00003CFF [?]
│       ├── unknown (popup_get_edit_text) [UI] (43B) — Gets text from an edit control via a Windows message.
│       │   └── 00003D62 [?]
│       ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│       │   ├── process_messages [UI] (21B)
│       │   ├── get_view_window_handle [UI] (28B)
│       │   ├── disable_parent_window [UI] (121B)
│       │   └── enable_parent_window [UI] (126B)
│       └── (2 FW helpers hidden)
├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
├── unknown (network init) [FW] (38B) — Calls thunk_FUN_0059dfb9 with 4 zero parameters.
│   └── popup_dialog_open [UI] (306B) — Opens a popup dialog with specified parameters (title, position, dimensions, flags).
│       ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│       ├── unknown (popup list init) [UI] (64B) — Resets and initializes a popup list control with 9 slots and param_1 items.
│       ├── popup_dialog_reset [UI] (1299B) — Resets all fields of a popup dialog structure to default values.
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       ├── popup_set_bitmap [UI] (50B) — Sets the popup dialog's bitmap pointer (this+8 = param_1) and recalculates the layout height (this+0xB4) from the bit...
│       │   └── popup_calc_max_text_height [UI] (132B)
│       │       └── popup_get_button_width [UI] (32B)
│       ├── popup_set_field_10 [UI] (33B) — Sets popup dialog field at this+0x10 to param_1.
│       ├── popup_set_scaled_width [UI] (99B) — Sets the popup dialog width (this+0x11C) with optional resolution scaling.
│       └── (1 FW helpers hidden)
├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── 0051D3E0 [?] (351B)
├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION *** — Sets a string control value in the multiplayer dialog string table.
│   └── (1 FW helpers hidden)
├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   └── dialog_set_title_impl [UI] (42B) — Implements title setting via CSocket::Create (misidentified by Ghidra — actually a string copy/display operation).
├── has_building [GL] (122B) — Checks if a city has a specific building.
│   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
├── set_building [GL] (186B) *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
├── get_wonder_owner [GL] (73B) — Returns the civ that owns a wonder, or -1 if no one does.
│   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│       └── is_wonder_obsolete [GL] (120B) — Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│           └── civ_has_tech [GL] (181B)
│               └── bit_index_to_byte_mask [GL] (45B)
├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION *** — Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION *** — Iterates all 8 map views and scrolls each active view if the given position is near edges.
│   │   └── scroll_map_if_needed [UI] (404B) — Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary.
│   │       ├── set_map_scroll_position [UI] (98B)
│   │       │   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │       │   └── wrap_x [GL] (94B)
│   │       └── (1 FW helpers hidden)
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── open_intelligence_dialog [UI] (535B) — Opens the intelligence report dialog for a foreign civ.
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   │   ├── 00009740 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── 0000944B [?]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_owner [UI] (45B) — Sets the button's owner/parent reference.
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_handler [UI] (45B) — Sets a handler callback on the button's window object at offset +0xc0.
│   │   │   └── get_window_object [UI] (28B)
│   │   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   │   ├── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │   ├── end_paint [UI] (32B)
│   │   │   └── call_refresh_callback [UI] (47B)
│   │   ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   │   └── (3 FW helpers hidden)
│   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   │   └── get_wonder_city [GL] (57B)
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   │   ├── should_declare_war [GL] (191B) — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │   │   └── get_attitude_raw [GL] (47B)
│   │   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION *** — AI government selection logic.
│   │   │   ├── check_govt_available [GL] (323B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│   │   │       ├── show_message [UI] (46B)
│   │   │       ├── show_dialog_message [UI] (43B)
│   │   │       ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   │       ├── set_improvement_name_string [UI] (41B)
│   │   │       ├── civ_has_active_wonder [GL] (142B)
│   │   │       ├── get_civ_noun_name [GL] (145B)
│   │   │       ├── get_civ_leader_title [GL] (210B)
│   │   │       ├── get_civ_adjective_name [GL] (145B)
│   │   │       ├── enqueue_mp_event [MIXED] (398B)
│   │   │       ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │   │       └── revolution_dialog [MIXED] (678B) *** STATE MUTATION ***
│   │   ├── spaceship_ai_should_start [AI] (583B) — Determines if an AI civ should start building spaceship parts.
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── find_nearest_unit [GL] (233B) *** STATE MUTATION *** — Finds the nearest unit to a position, optionally filtered by owner civ.
│   │   │   └── calc_movement_cost [GL] (94B)
│   │   │       ├── distance_x_wrapped [GL] (111B)
│   │   │       └── diagonal_movement_cost [GL] (135B)
│   │   ├── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   └── (1 FW helpers hidden)
│   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   └── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   ├── diplo_show_greeting [MIXED] (804B) *** STATE MUTATION *** — Shows the diplomacy greeting screen when two civs meet.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── open_list_dialog [UI] (47B) — Opens a list dialog with the given title and flags.
│   │   │   └── open_dialog_extended [UI] (56B)
│   │   │       └── popup_parse_text_file [UI] (2287B)
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   │   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   │   ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── intel_open_advisor [UI] (546B) — Opens the intelligence advisor for a foreign civ.
│   │   │   ├── unknown (stop music) [UI] (31B)
│   │   │   ├── intel_create_object [UI] (200B)
│   │   │   │   ├── init_sprite_surface_mgr [UI] (133B)
│   │   │   │   ├── init_render_surface [UI] (274B)
│   │   │   │   ├── unknown (pedia object initializer) [UI] (34B)
│   │   │   │   ├── get_screen_rect [UI] (48B)
│   │   │   │   ├── palette_init [UI] (145B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── intel_setup_display [UI] (236B)
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   ├── manage_window_show [UI] (37B)
│   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   ├── pedia_free_resource [UI] (57B)
│   │   │   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── intel_delete_object [UI] (57B)
│   │   │   │   └── intel_destroy_object [UI] (134B)
│   │   │   ├── unknown (set popup parent A) [UI] (24B)
│   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   │   │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   │   ├── unknown (set popup position) [UI] (32B) — Sets popup dialog position: DAT_006359cc = param_1, DAT_006359d0 = param_2.
│   │   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   │   │   ├── unknown (popup list init) [UI] (64B)
│   │   │   ├── popup_dialog_reset [UI] (1299B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── popup_set_position_fields [UI] (42B) — Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2.
│   │   ├── get_screen_rect [UI] (48B) — Fills a RECT with the full screen dimensions (0, 0, screen_width, screen_height).
│   │   └── (1 FW helpers hidden)
│   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   └── update_map_tile [UI] (50B) — Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI] (151B)
│   │           ├── is_tile_visible [UI] (99B)
│   │           ├── redraw_tile_area [UI] (352B)
│   │           ├── invalidate_tile_area [UI] (60B)
│   │           ├── reset_sprite_scale [UI] (28B)
│   │           ├── set_current_zoom_scale [UI] (41B)
│   │           └── unknown (sprite blit wrapper 1) [UI] (53B)
│   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
│   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   │   └── intel_play_video_frame [UI] (248B) — Plays one frame of the advisor video animation.
│   │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │       │   └── (10 FW helpers hidden)
│   │       └── (2 FW helpers hidden)
│   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   ├── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── popup_get_button_width [UI] (32B) — Returns the constant 0x20 (32), which is the standard button icon width for popup dialogs.
│   │   └── (2 FW helpers hidden)
│   └── (1 FW helpers hidden)
├── diplo_reset_state [GL] (61B) *** STATE MUTATION *** — Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   └── intel_close_advisor [UI] (166B) — Closes the intelligence advisor.
│       ├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
│       ├── wait_for_animation [UI] (109B) — Busy-waits for a duration based on param_1, processing messages.
│       │   ├── flush_display [UI] (21B)
│       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│       ├── resume_music [UI] (85B) — Resumes music if enabled.
│       │   ├── select_random_music_track [UI] (388B)
│       │   └── unknown (stop music) [UI] (31B)
│       ├── intel_teardown_display [UI] (158B) — Tears down the intel advisor display.
│       │   ├── save_and_flush [UI] (41B)
│       │   │   ├── flush_at_origin [UI] (34B)
│       │   │   └── swap_dc [UI] (43B)
│       │   ├── swap_dc [UI] (43B)
│       │   │   └── 0000C0AB [?]
│       │   ├── init_palette_system [UI] (21B)
│       │   ├── pedia_free_resource [UI] (57B)
│       │   ├── unknown (pedia set and display resource) [UI] (45B)
│       │   │   └── unknown (update pedia display surface) [UI] (49B)
│       │   ├── unknown (manage pedia window) [UI] (37B)
│       │   │   └── 0000C44D [?]
│       │   ├── unknown (set popup parent A) [UI] (24B)
│       │   ├── unknown (set popup parent B) [UI] (24B)
│       │   └── unknown (set popup position) [UI] (32B)
│       └── intel_delete_object [UI] (57B) — Destructor + delete for intel advisor object.
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION *** — Copies state into mirror then bitwise-inverts all mirror data.
│   │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION *** — Copies all 23 game state sections into the diff engine mirror buffer.
│   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   └── (2 FW helpers hidden)
├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION *** — When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── show_game_popup_3arg [UI] (43B) — Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   └── show_terrain_help [UI] (58B) — Shows help text for a terrain type.
│   │       └── 0051D564 [?] (178B)
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   └── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│       └── (1 FW helpers hidden)
├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION *** — Handles side effects when a civ discovers a tech that unlocks a new government form.
│   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   └── 0051D564 [?] (178B)
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── unknown (tutorial_show_city_screen) [UI] (42B) — Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4).
│   │   └── 0051D564 [?] (178B)
│   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   └── set_government_type [GL] (529B) *** STATE MUTATION *** — Sets a civ's government type.
│       ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION *** — Shows the tax rate dialog for a civ.
│       │   ├── 00009429 [?]
│       │   ├── open_tax_rate_dialog [MIXED] (4140B) *** STATE MUTATION ***
│       │   │   ├── show_window_wrapper [UI] (33B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── get_max_tax_rate [GL] (156B)
│       │   │   ├── balance_tax_rates [GL] (293B)
│       │   │   ├── taxrate_recalc_totals [MIXED] (848B) *** STATE MUTATION ***
│       │   │   ├── process_messages [UI] (21B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── set_dialog_enabled [UI] (36B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── create_checkbox [UI] (167B)
│       │   │   ├── set_checkbox_callback [UI] (33B)
│       │   │   ├── set_checkbox_value [UI] (33B)
│       │   │   ├── create_scrollbar [UI] (124B)
│       │   │   ├── scrollbar_set_position [UI] (52B)
│       │   │   ├── scrollbar_set_range [UI] (47B)
│       │   │   ├── scrollbar_set_callback [UI] (33B)
│       │   │   ├── dialog_repaint_check [UI] (91B)
│       │   │   ├── save_civ2_dat [GL] (212B)
│       │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│       │   │   ├── citywin_refresh_top_panels [UI] (153B)
│       │   │   ├── dialog_create [UI] (588B)
│       │   │   ├── refresh_status_panel [UI] (297B)
│       │   │   ├── set_active_surface [UI] (74B)
│       │   │   ├── load_gif_resource [UI] (847B)
│       │   │   ├── modal_dialog_run [UI] (283B)
│       │   │   ├── palette_init [UI] (145B)
│       │   │   └── (5 FW helpers hidden)
│       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │   └── (3 FW helpers hidden)
│       └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION *** — Entry point for full city production calculation.
│           ├── evaluate_city_tiles [GL] (653B) *** STATE MUTATION ***
│           │   ├── is_tile_valid [GL] (80B)
│           │   ├── wrap_x [GL] (94B)
│           │   ├── get_next_unit_in_stack [GL] (65B)
│           │   ├── find_unit_stack_at_xy [GL] (231B)
│           │   ├── is_tile_ocean [GL] (57B)
│           │   ├── get_tile_explored [GL] (71B)
│           │   ├── get_city_owner_at [GL] (111B)
│           │   └── get_tile_improvements [GL] (39B)
│           ├── calc_capital_distance_and_corruption [GL] (1048B) *** STATE MUTATION ***
│           │   ├── has_building [GL] (122B)
│           │   ├── check_trade_route_path [GL] (682B) *** STATE MUTATION ***
│           │   ├── civ_has_tech [GL] (181B)
│           │   ├── is_tile_worked [GL] (62B)
│           │   ├── calc_movement_cost [GL] (94B)
│           │   └── get_tile_continent [GL] (39B)
│           ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│           │   ├── check_unit_support [GL] (281B) *** STATE MUTATION ***
│           │   ├── calc_food_box_size [GL] (512B) *** STATE MUTATION ***
│           │   ├── tile_distance_xy [GL] (157B)
│           │   ├── get_city_owner_at [GL] (111B)
│           │   ├── get_tile_improvements [GL] (39B)
│           │   └── (1 FW helpers hidden)
│           └── recalc_city_all [GL] (76B) *** STATE MUTATION ***
│               ├── assign_worker_tiles [GL] (2002B) *** STATE MUTATION ***
│               ├── sync_worker_tile_status [GL] (155B) *** STATE MUTATION ***
│               ├── calc_city_production [GL] (1053B) *** STATE MUTATION ***
│               ├── calc_happiness [GL] (2627B) *** STATE MUTATION ***
│               └── calc_trade_route_income [GL] (378B) *** STATE MUTATION ***
├── we_love_the_king_day [GL] (379B) — Triggers "We Love the King Day" celebration for a civilization.
│   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   ├── unknown (show tech help) [UI] (43B) — Shows tech help text via the help display system.
│   │   └── show_tech_help [UI] (92B) — Shows help text for a technology.
│   │       └── 0051D564 [?] (178B)
│   └── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
├── format_enabled_item [UI] (138B) — Formats an enabled item (unit/improvement/wonder) for display in the tech discovery dialog.
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   └── popup_add_edit_field [UI] (412B) — Adds a text edit field to a popup dialog.
├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   ├── set_building [GL] (186B) *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   ├── get_wonder_owner [GL] (73B) — Returns the civ that owns a wonder, or -1 if no one does.
│   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION *** — Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow.
│   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION *** — Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION *** — When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION *** — Handles side effects when a civ discovers a tech that unlocks a new government form.
│   ├── we_love_the_king_day [GL] (379B) — Triggers "We Love the King Day" celebration for a civilization.
│   ├── format_enabled_item [UI] (138B) — Formats an enabled item (unit/improvement/wonder) for display in the tech discovery dialog.
│   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│   ├── unknown (show tech help) [UI] (43B) — Shows tech help text via the help display system.
│   ├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│   ├── pedia_select_entry [UI] (342B) — Selects and displays a Civilopedia entry.
│   │   ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│   │   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   ├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   │   │   ├── unknown (get drawing context) [UI] (37B)
│   │   │   └── surface_list_find_dirty [UI] (174B)
│   │   ├── pedia_init_tabs [UI] (1391B) — Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── set_edit_text [UI] (43B)
│   │   │   │   └── 00002D7F [?]
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── 00008BE1 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (clear hypertext links) [UI] (21B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── pedia_clear_item_list [UI] (118B) — Clears the linked list of Civilopedia display items.
│   │   │   └── init_palette_system [UI] (21B)
│   │   ├── pedia_draw_frame [UI] (800B) — Draws the decorative frame around the Civilopedia window including borders, title text with shadow effect, and backgr...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── draw_3d_border [UI] (167B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   ├── pedia_open_category [UI] (200B) — Opens a specific category in the Civilopedia.
│   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   ├── set_dialog_enabled [UI] (36B)
│   │   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   ├── pedia_set_title [UI] (229B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_push_history [UI] (523B)
│   │   │   └── set_active_surface [UI] (74B)
│   │   ├── pedia_get_entry_name [UI] (89B) — Gets the name string for a Civilopedia entry by index from a linked list.
│   │   ├── pedia_draw_tech_detail [UI] (5911B) — Draws the Civilopedia tech detail page.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   └── rect_get_width [UI] (27B)
│   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   └── rect_get_height [UI] (28B)
│   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   ├── pedia_show_description [UI] (593B)
│   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── pedia_add_hyperlink [UI] (1361B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── hypertext_widget_create [UI] (139B)
│   │   │   │   ├── pedia_link_node_ctor [UI] (86B)
│   │   │   │   ├── unknown (set link callback) [UI] (33B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── port_alloc [UI] (683B)
│   │   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   └── 00008B00 [?]
│   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   ├── widget_get_height [UI] (34B)
│   │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (7 FW helpers hidden)
│   │   ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   │   └── (1 FW helpers hidden)
│   ├── draw_status_panel_header [UI] (1182B) — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── unknown (string pool set) [UI] (33B) — Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   │   └── advance_year_display [UI] (479B)
│   │   │       ├── text_add_label_id [UI] (33B)
│   │   │       ├── text_newline [UI] (29B)
│   │   │       └── (3 FW helpers hidden)
│   │   ├── draw_text_at [UI] (42B) — Draws text at position (param_2, param_3) using the global drawing surface.
│   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │       ├── measure_text_height [UI] (42B)
│   │   │       ├── port_fill_rect_pattern [UI] (201B)
│   │   │       └── unknown (set/get draw color) [UI] (38B)
│   │   ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│   │   ├── set_sprite_scale [UI] (33B) — Sets the global sprite rendering scale to (param_1 + 8) / 8.
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   ├── draw_hline [UI] (69B) — Draws a horizontal line from (param_2, param_4) to (param_3+1, param_4+1) with the given color.
│   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   └── fill_surface_from_rect [UI] (71B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── fill_rect_xywh [UI] (63B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   ├── set_text_draw_target [UI] (24B) — Sets the target surface for text drawing.
│   │   ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
│   │   ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   └── (4 FW helpers hidden)
│   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   ├── popup_dialog_close [UI] (47B) — Closes a popup dialog by destroying it and clearing its list control.
│   │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│   │   └── (1 FW helpers hidden)
│   ├── popup_add_edit_field [UI] (412B) — Adds a text edit field to a popup dialog.
│   ├── popup_set_scaled_width [UI] (99B) — Sets the popup dialog width (this+0x11C) with optional resolution scaling.
│   ├── popup_add_button [UI] (360B) — Adds a button to the popup dialog.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── init_editor_scrollbar [UI] (34B) — Gets scrollbar width by calling FUN_00407f90.
│   │   └── (2 FW helpers hidden)
│   ├── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   └── (1 FW helpers hidden)
├── unknown (show tech help) [UI] (43B) — Shows tech help text via the help display system.
├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
├── pedia_select_entry [UI] (342B) — Selects and displays a Civilopedia entry.
├── draw_status_panel_header [UI] (1182B) — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
├── popup_dialog_close [UI] (47B) — Closes a popup dialog by destroying it and clearing its list control.
├── popup_add_edit_field [UI] (412B) — Adds a text edit field to a popup dialog.
├── popup_set_scaled_width [UI] (99B) — Sets the popup dialog width (this+0x11C) with optional resolution scaling.
├── popup_add_button [UI] (360B) — Adds a button to the popup dialog.
└── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
```

### `004D0208` show_wonder_or_advance

> Shows either a wonder movie (negative param) or advance animation (positive param).

```
show_wonder_or_advance [UI] (268B)
├── unknown — wonder_win_destructor_wrapper [FW] (12B) — Wrapper that calls wonder_win_destructor (thunk_FUN_004d08b0).
│   └── wonder_win_destructor [UI] (422B) *** STATE MUTATION *** — Destructor for the wonder window.
│       ├── pedia_free_resource [UI] (57B) — Frees a resource stored in the object and sets the pointer to zero.
│       └── (4 FW helpers hidden)
├── unknown — SEH epilog [FW] (15B) — SEH epilog — restores FS register from stack frame.
├── wonder_win_init [UI] (677B) *** STATE MUTATION *** — Constructor/initializer for the wonder window object.
│   ├── init_sprite_surface_mgr [UI] (133B) — Initializes the sprite surface manager object.
│   │   ├── init_sprite_cache [UI] (132B) — Initializes sprite cache fields in the rendering surface object.
│   │   │   └── init_render_surface [UI] (274B)
│   │   └── (1 FW helpers hidden)
│   ├── init_render_surface [UI] (274B) — Initializes a render surface object with default dimensions (0x4000 x 0x4000) and mode flags.
│   ├── unknown (pedia object initializer) [UI] (34B) — Zeroes out the first field of an object via ECX (this pointer).
│   ├── port_alloc_rect [UI] (58B) — Allocates a port surface from width and height dimensions by creating a RECT and delegating to port_alloc.
│   │   └── port_alloc [UI] (325B) — Full port allocation: frees any existing DIB, creates a new DIB section of the specified size, and initializes pixel ...
│   │       ├── 000035B0 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── port_init [UI] (258B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── surface_is_locked [UI] (44B)
│   │       ├── destroy_dib_surface [UI] (155B)
│   │       ├── get_surface_stride [UI] (48B)
│   │       ├── check_topdown [UI] (41B)
│   │       └── (1 FW helpers hidden)
│   ├── port_set_color [UI] (43B) — Fills the entire clip rect with a given color.
│   │   └── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       ├── surface_is_locked [UI] (44B)
│   │       ├── get_surface_buffer_handle [UI] (28B)
│   │       ├── check_topdown [UI] (41B)
│   │       └── fill_rect_8bit [UI] (152B)
│   ├── palette_init [UI] (145B) — Initializes the palette object.
│   │   ├── 0000E780 [?]
│   │   ├── palette_generate_random_id [UI] (75B) — Generates a random non-zero 15-bit ID and stores at this+0x408.
│   │   └── unknown (palette_create) [UI] (60B) — Creates a GDI palette if palette mode active, returns NULL otherwise.
│   └── (4 FW helpers hidden)
├── wonder_win_create [UI] (524B) — Creates the wonder window — loads the DLL resource, builds the info text, determines display mode (0=normal, 1=has vi...
│   ├── set_window_style_flags [UI] (43B) — Sets style flags on the window object.
│   │   └── load_and_store_cursor [UI] (136B) — Loads a cursor by ID or special value and stores it on the window object.
│   ├── pedia_set_resource [UI] (67B) — Loads a resource (via FUN_005db140) and stores it in the object's first member.
│   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   ├── wonder_win_create_dialog [UI] (322B) — Creates the actual dialog window for the wonder display, setting up the surface, loading a background image resource,...
│   │   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── update_palette [UI] (43B) — Updates the display palette for the given view.
│   │   │   └── 0000C280 [?]
│   │   ├── unknown (GDI operation on pedia window) [UI] (41B) — Calls a GDI function on the window at this+8 with coordinates (0,0).
│   │   │   └── 0000C763 [?]
│   │   ├── create_offscreen_surface_b [UI] (119B) — Creates an offscreen surface variant with 8 parameters (includes parent window).
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   │   └── write_full_colortable [UI] (39B)
│   │   │   ├── surface_create_8param [UI] (85B)
│   │   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   │   ├── surface_init_8 [UI] (96B)
│   │   │   │   └── set_dialog_wndproc [UI] (55B)
│   │   │   └── set_window_data_and_wndproc [UI] (55B)
│   │   ├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── port_init_buffer [UI] (36B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   ├── port_draw_text_rect [UI] (77B)
│   │   │   ├── palette_set_entries [UI] (142B)
│   │   │   │   ├── palette_apply [UI] (90B)
│   │   │   │   └── palette_set_entry [UI] (316B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   ├── flip_surface_vertical [UI] (249B)
│   │   │   │   ├── get_pixel_buffer [UI] (39B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   └── (8 FW helpers hidden)
│   │   ├── surface_init_8 [UI] (96B) — Initializes an 8-parameter surface.
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── set_child_wndproc [UI] (55B)
│   │   │   └── (2 FW helpers hidden)
│   │   └── (3 FW helpers hidden)
│   ├── build_wonder_info_text [UI] (1366B) — Builds the descriptive text shown in the wonder/advance window.
│   │   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── spaceship_get_max_component [GL] (264B) — Gets the maximum allowed count for a spaceship component type (param_2: 0=structural, 1-2=component, 3-5=module).
│   │   └── (10 FW helpers hidden)
│   ├── wonder_win_draw_buttons [UI] (826B) — Draws the button graphics for the wonder window.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── 004D56FD [?]
│   │   ├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   │   ├── port_measure_text [UI] (219B) — Draws text into a rect with a specific font and optional shadow.
│   │   │   ├── 00003ECA [?]
│   │   │   ├── 0000847F [?]
│   │   │   └── unknown (set/get draw color) [UI] (38B)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) — Extracts sprite with transparency and explicit x,y,w,h params.
│   │   │   ├── sprite_lock_data [UI] (56B)
│   │   │   └── sprite_extract_from_oleitem [UI] (1951B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── port_get_pixel_ptr [UI] (45B)
│   │   │       ├── surface_is_locked [UI] (44B)
│   │   │       ├── pixel_ptr_next_row [UI] (33B)
│   │   │       ├── pixel_ptr_prev_row [UI] (33B)
│   │   │       ├── sprite_unlock_data [UI] (56B)
│   │   │       └── (7 FW helpers hidden)
│   │   └── (3 FW helpers hidden)
│   ├── wonder_win_setup_hotspots [UI] (184B) — Sets up click hotspots for the wonder window buttons.
│   │   └── create_button_hotspot [UI] (54B) — Creates a button hotspot with given index, position, and size by calling thunk_FUN_0046ace7.
│   │       └── add_click_region [UI] (153B)
│   │           └── set_rect_wh [UI] (48B)
│   ├── spaceship_recalc_stats [GL] (1297B) *** STATE MUTATION *** — Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support ratio, flight time, suc...
│   │   ├── calc_year_from_turn [GL] (540B) — Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   │   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── spaceship_get_clamped_count [GL] (89B) — Returns the clamped count of a spaceship component — min of current count and max allowed.
│   │   │   ├── spaceship_get_max_component [GL] (264B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── spaceship_calc_population_capacity [GL] (90B) — Calculates population capacity from habitation module count.
│   │   └── (1 FW helpers hidden)
│   └── (4 FW helpers hidden)
├── show_advance_animation [UI] (1232B) *** STATE MUTATION *** — Main advance animation display function.
│   ├── manage_window_show [UI] (37B) — Calls manage_window_C40A with the window handle from this+8.
│   │   └── 0000C40A [?]
│   ├── start_cursor_blink [UI] (39B) — Starts the cursor blink animation by getting the window handle and calling the blink start function.
│   │   ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│   │   └── capture_mouse [UI] (29B) — Captures mouse input to the specified window.
│   ├── stop_cursor_blink [UI] (39B) — Stops the cursor blink animation.
│   │   ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│   │   └── release_mouse_capture [UI] (22B) — Releases the mouse capture.
│   ├── init_palette_system [UI] (21B) — Initializes the palette system.
│   ├── unknown (pedia set and display resource) [UI] (45B) — Stores param_1 at this+4 and calls FUN_00450440 to display it.
│   │   └── unknown (update pedia display surface) [UI] (49B) — Updates a display surface using the value at param_1+0x404 as source.
│   │       └── select_palette [UI] (57B)
│   ├── unknown (manage pedia window) [UI] (37B) — Calls manage_window_C44D with the window handle at this+8.
│   │   └── 0000C44D [?]
│   ├── load_civ_power_values [GL] (90B) *** STATE MUTATION *** — Loads 6 power values from a civ's data (at offset 0x594*param_1 into per-civ data) into global array DAT_006a5b10.
│   ├── wonder_win_draw_title [UI] (216B) — Draws the title text for the wonder/advance window, combining civ name, leader name, and title.
│   │   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── port_measure_text [UI] (219B) — Draws text into a rect with a specific font and optional shadow.
│   │   └── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   ├── build_advance_scene [UI] (12822B) — Massive function that builds the visual scene for an advance animation.
│   │   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   │   ├── wonder_win_draw_title [UI] (216B) — Draws the title text for the wonder/advance window, combining civ name, leader name, and title.
│   │   ├── spaceship_get_clamped_count [GL] (89B) — Returns the clamped count of a spaceship component — min of current count and max allowed.
│   │   ├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   │   ├── port_set_color [UI] (43B) — Fills the entire clip rect with a given color.
│   │   ├── unknown (sprite extract with transp + rect params) [UI] (92B) — Extracts sprite with transparency and explicit x,y,w,h params.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── wonder_win_show_starfield [UI] (1046B) — Initializes and displays the starfield animation for space race victories.
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── validate_window_rect [UI] (43B)
│   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │       ├── 0000CC11 [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── get_surface_hwnd [UI] (28B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── port_select_palette [UI] (87B)
│   │   │       └── surface_is_locked [UI] (44B)
│   │   ├── advance_year_display [UI] (479B) — Advances the year display in the UI, showing appropriate year strings.
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── wonder_win_draw_next_char [UI] (986B) — Draws the next character of the wonder info text with typewriter effect.
│   │   │   ├── 0000847F [?]
│   │   │   ├── 0000858E [?]
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── init_palette_system [UI] (21B)
│   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── 0000847F [?]
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   ├── port_measure_text [UI] (219B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── (4 FW helpers hidden)
│   │   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   ├── port_draw_text_at [UI] (104B) — Sets a single pixel value at (param_1, param_2) to param_3.
│   │   │   ├── port_get_pixel_ptr [UI] (45B)
│   │   │   ├── port_alloc_variant_b [UI] (93B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── port_measure_text [UI] (219B) — Draws text into a rect with a specific font and optional shadow.
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   └── (6 FW helpers hidden)
│   ├── play_wonder_video [UI] (769B) — Plays a wonder video (AVI) file.
│   │   ├── set_callback_paint [UI] (45B) — Sets the paint callback handler on the window object.
│   │   ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│   │   │   └── invalidate_region [UI] (180B)
│   │   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (38B)
│   │   │       ├── manage_window_show [UI] (37B)
│   │   │       └── surface_list_find_dirty [UI] (174B)
│   │   ├── start_cursor_blink [UI] (39B) — Starts the cursor blink animation by getting the window handle and calling the blink start function.
│   │   ├── stop_cursor_blink [UI] (39B) — Stops the cursor blink animation.
│   │   ├── init_palette_system [UI] (21B) — Initializes the palette system.
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │   └── show_help_topic [UI] (34B)
│   │   │       └── show_help_topic_ext [UI] (38B)
│   │   ├── unknown (manage pedia window) [UI] (37B) — Calls manage_window_C44D with the window handle at this+8.
│   │   ├── unknown (GDI operation on pedia window) [UI] (41B) — Calls a GDI function on the window at this+8 with coordinates (0,0).
│   │   ├── unknown (stop music) [UI] (31B) — Stops music playback and sets paused flag.
│   │   ├── resume_music [UI] (85B) — Resumes music if enabled.
│   │   │   ├── select_random_music_track [UI] (388B)
│   │   │   └── unknown (stop music) [UI] (31B)
│   │   ├── port_set_color [UI] (43B) — Fills the entire clip rect with a given color.
│   │   ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   │   │   ├── process_messages [UI] (21B)
│   │   │   │   └── 0000BA4F [?]
│   │   │   ├── get_view_window_handle [UI] (28B)
│   │   │   ├── disable_parent_window [UI] (121B)
│   │   │   └── enable_parent_window [UI] (126B)
│   │   └── (10 FW helpers hidden)
│   ├── wonder_win_setup_hotspots [UI] (184B) — Sets up click hotspots for the wonder window buttons.
│   ├── wonder_win_draw_initial_buttons [UI] (128B) — Draws the initial button states.
│   │   ├── wonder_win_draw_button_left [UI] (300B) — Draws the left button (close/ok) in one of three visual states: normal, hover, or pressed, based on params.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── init_palette_system [UI] (21B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   ├── wonder_win_draw_button_right [UI] (286B) — Draws the right button (play video) in one of three visual states.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── init_palette_system [UI] (21B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   └── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   ├── wonder_win_draw_button_left [UI] (300B) — Draws the left button (close/ok) in one of three visual states: normal, hover, or pressed, based on params.
│   ├── wonder_win_draw_button_right [UI] (286B) — Draws the right button (play video) in one of three visual states.
│   ├── spaceship_launch (internal — called after all checks pass) [GL] (815B) *** STATE MUTATION *** — Launches a civ's spaceship.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   ├── change_city_production [MIXED] (2572B) *** STATE MUTATION *** — Changes a city's production item.
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   │   └── popup_show_modal [UI] (999B)
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   │   └── dialog_set_title_impl [UI] (42B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── ai_choose_city_production [AI] (29400B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   ├── city_adjacent_to_continent [GL] (238B)
│   │   │   │   ├── find_best_coastal_continent [GL] (344B)
│   │   │   │   ├── is_wonder_obsolete [GL] (120B)
│   │   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── has_spaceship_built [GL] (47B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   ├── is_tile_worked [GL] (62B)
│   │   │   │   ├── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │   │   │   ├── spaceship_ai_evaluate [AI] (1064B)
│   │   │   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │   │   ├── spaceship_ai_should_start [AI] (583B)
│   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── count_units_by_role [GL] (120B)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │   │   ├── check_unit_can_improve [GL] (354B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   ├── (count_techs_discovered) [GL] (86B)
│   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── calc_food_box_with_difficulty [GL] (106B)
│   │   │   │   └── classify_production_type [GL] (58B)
│   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   ├── unknown (popup list init) [UI] (64B)
│   │   │   │   ├── popup_dialog_reset [UI] (1299B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── popup_dialog_close [UI] (47B)
│   │   │   │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   └── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── show_wonder_or_advance [UI] (268B) — Shows either a wonder movie (negative param) or advance animation (positive param).
│   │   │   ├── wonder_win_init [UI] (677B) *** STATE MUTATION ***
│   │   │   ├── wonder_win_create [UI] (524B)
│   │   │   ├── show_advance_animation [UI] (1232B) *** STATE MUTATION ***
│   │   │   ├── show_wonder_movie [UI] (154B)
│   │   │   │   ├── manage_window_show [UI] (37B)
│   │   │   │   ├── init_palette_system [UI] (21B)
│   │   │   │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │   │   │   ├── unknown (manage pedia window) [UI] (37B)
│   │   │   │   ├── show_advance_animation [UI] (1232B) *** STATE MUTATION ***
│   │   │   │   └── play_wonder_video [UI] (769B)
│   │   │   └── (3 FW helpers hidden)
│   │   └── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│   ├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   ├── unknown (sprite extract with transp + rect params) [UI] (92B) — Extracts sprite with transparency and explicit x,y,w,h params.
│   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   └── (4 FW helpers hidden)
├── show_wonder_movie [UI] (154B) — Shows a wonder movie by first refreshing the display, playing the video (via play_wonder_video), then showing the adv...
└── _strcpy_thunk / _chkstk [FW] (47B) — Stack probe function — touches stack pages in 4KB increments to trigger guard page allocation.
```

## Advisor Screens

### `0042B67D` advisor_science_open

```
advisor_science_open [UI] (423B)
  (no call graph data — MFC message-map stub or leaf function)
```

### `0042CD2F` advisor_trade_open

```
advisor_trade_open [UI] (423B)
  (no call graph data — MFC message-map stub or leaf function)
```

### `0042D71E` advisor_city_status_open

```
advisor_city_status_open [UI] (99B)
  (no call graph data — MFC message-map stub or leaf function)
```

### `0042E185` advisor_happiness_open

```
advisor_happiness_open [UI] (99B)
  (no call graph data — MFC message-map stub or leaf function)
```

### `004308AE` show_foreign_advisor

> Main foreign advisor dialog.

```
show_foreign_advisor [MIXED] (3218B) *** STATE MUTATION ***
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   └── popup_show_modal [UI] (999B) — Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│       ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│       ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│       │   └── 0000BA4F [?]
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│       │   └── 00002D4D [?]
│       ├── init_palette_system [UI] (21B) — Initializes the palette system.
│       ├── unknown — manage window [UI] (37B) — Calls manage_window_C692 with the window handle from the object's field at offset 8.
│       │   └── 0000C692 [?]
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   └── focus_and_raise_window [UI] (57B)
│       │   ├── widget_scrollbar_dtor [UI] (57B)
│       │   │   └── scrollbar_widget_dtor [UI] (112B)
│       │   ├── widget_dropdown_dtor [UI] (57B)
│       │   └── (4 FW helpers hidden)
│       ├── popup_paint [UI] (1964B) — Master paint function for the popup system.
│       │   ├── end_paint [UI] (32B)
│       │   │   └── invalidate_region [UI] (180B)
│       │   ├── show_window_wrapper [UI] (33B)
│       │   │   └── show_window_inner [UI] (38B)
│       │   ├── set_rect_abs [UI] (42B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── control_invalidate [UI] (65B)
│       │   │   ├── 00008B00 [?]
│       │   │   └── 00008B2D [?]
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   │   └── scale_table_build_primary [UI] (657B)
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   ├── widget_get_height [UI] (34B)
│       │   │   └── rect_get_height [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── popup_get_padded_height [UI] (42B)
│       │   ├── popup_render_label [UI] (226B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   └── port_fill_rect_pattern [UI] (201B)
│       │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_render_text_at_offset [UI] (61B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── popup_layout_dialog [UI] (4785B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_calc_max_text_height [UI] (132B)
│       │   │   ├── popup_get_line_height [UI] (78B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_calc_button_area_height [UI] (46B)
│       │   │   ├── popup_calc_text_width [UI] (51B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── popup_render_label [UI] (226B)
│       │   │   ├── popup_has_negative_line_count [UI] (83B)
│       │   │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_get_radio_page_number [UI] (56B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   ├── blit_rect_to_rect [UI] (95B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   └── unknown (set/get draw color) [UI] (38B)
│       │   ├── popup_redraw_visible_items [UI] (660B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── draw_border_rect [UI] (61B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_draw_item [UI] (706B)
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   └── port_set_rect [UI] (91B)
│       │   ├── popup_create_window [UI] (693B)
│       │   │   ├── set_callback_0x44 [UI] (45B)
│       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│       │   │   ├── unknown (set_font_size) [UI] (43B)
│       │   │   ├── create_offscreen_surface [UI] (115B)
│       │   │   └── create_offscreen_surface_b [UI] (119B)
│       │   ├── popup_init_controls [UI] (6616B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── create_checkbox [UI] (167B)
│       │   │   ├── set_checkbox_value [UI] (33B)
│       │   │   ├── create_scrollbar [UI] (124B)
│       │   │   ├── scrollbar_set_position [UI] (52B)
│       │   │   ├── scrollbar_set_range [UI] (47B)
│       │   │   ├── scrollbar_set_callback [UI] (33B)
│       │   │   ├── set_edit_max_chars [UI] (43B)
│       │   │   ├── create_listbox_control [UI] (121B)
│       │   │   ├── add_listbox_item [UI] (49B)
│       │   │   ├── disable_civ_slot [UI] (133B)
│       │   │   ├── unknown (set selected item) [UI] (33B)
│       │   │   ├── pedia_button_create [UI] (139B)
│       │   │   ├── unknown (set button callback) [UI] (33B)
│       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── widget_get_height [UI] (34B)
│       │   │   ├── scrollbar_init [UI] (93B)
│       │   │   ├── scrollbar_create_window [UI] (207B)
│       │   │   ├── scrollbar_set_position [UI] (33B)
│       │   │   ├── scrollbar_set_range [UI] (33B)
│       │   │   ├── unknown [UI] (43B)
│       │   │   ├── unknown [UI] (33B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_count_items_in_pane [UI] (93B)
│       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│       │   │   ├── set_scrollbar [UI] (64B)
│       │   │   └── (13 FW helpers hidden)
│       │   ├── popup_draw_background [UI] (309B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── unknown [UI] (56B)
│       │   │   └── tile_bitmap [UI] (391B)
│       │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── popup_render_label [UI] (226B)
│       │   ├── draw_3d_border [UI] (167B)
│       │   │   ├── draw_hline [UI] (69B)
│       │   │   └── draw_vline [UI] (69B)
│       │   ├── port_draw_text_styled [UI] (238B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   └── dispatch_oleitem_normal [UI] (673B)
│       │   └── unknown (invalidate_all_children) [UI] (115B)
│       │       ├── 00008B00 [?]
│       │       └── 00008B2D [?]
│       ├── unknown (popup_get_item_text) [UI] (47B) — Gets item text from a list control via a Windows message.
│       │   └── 00003CFF [?]
│       ├── unknown (popup_get_edit_text) [UI] (43B) — Gets text from an edit control via a Windows message.
│       │   └── 00003D62 [?]
│       ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│       │   ├── process_messages [UI] (21B)
│       │   ├── get_view_window_handle [UI] (28B)
│       │   ├── disable_parent_window [UI] (121B)
│       │   └── enable_parent_window [UI] (126B)
│       └── (2 FW helpers hidden)
├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
├── open_list_dialog [UI] (47B) — Opens a list dialog with the given title and flags.
│   └── open_dialog_extended [UI] (56B) — Opens a dialog with extended parameters, passing through to the dialog creation function.
│       └── popup_parse_text_file [UI] (2287B) — Parses a game text file section to configure and populate a popup dialog.
│           ├── mp_format_template_string [UI] (504B)
│           ├── popup_dialog_open [UI] (306B)
│           │   ├── rect_get_width [UI] (27B)
│           │   ├── rect_get_height [UI] (28B)
│           │   ├── unknown (popup list init) [UI] (64B)
│           │   ├── popup_dialog_reset [UI] (1299B)
│           │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│           │   ├── popup_set_bitmap [UI] (50B)
│           │   ├── popup_set_field_10 [UI] (33B)
│           │   ├── popup_set_scaled_width [UI] (99B)
│           │   └── (1 FW helpers hidden)
│           ├── popup_add_edit_field [UI] (412B)
│           ├── popup_set_field_38 [UI] (33B)
│           ├── popup_set_page_layout [UI] (91B)
│           │   └── popup_set_radio_column_count [UI] (126B)
│           ├── popup_set_title [UI] (86B)
│           ├── popup_set_scaled_width [UI] (99B)
│           ├── popup_set_radio_selected [UI] (76B)
│           │   └── popup_find_radio_option_by_id [UI] (101B)
│           ├── popup_add_radio_option [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   ├── popup_get_button_width [UI] (32B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_radio_checked [UI] (71B)
│           │   └── popup_add_radio_option [UI] (566B)
│           ├── popup_add_text_input [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_action_button_label [UI] (119B)
│           └── (4 FW helpers hidden)
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── unknown (string pool append separator) [UI] (29B) — Appends a separator to the string buffer at DAT_00679640 using thunk_FUN_004aef96.
├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── 0051D3E0 [?] (351B)
├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION *** — Sets a string control value in the multiplayer dialog string table.
│   └── (1 FW helpers hidden)
├── open_intelligence_dialog [UI] (535B) — Opens the intelligence report dialog for a foreign civ.
│   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   ├── 00009740 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   │   ├── 0000944B [?]
│   │   │   └── surface_list_remove [UI] (191B)
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │       └── surface_list_append [UI] (99B)
│   ├── set_button_owner [UI] (45B) — Sets the button's owner/parent reference.
│   │   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
│   ├── set_button_handler [UI] (45B) — Sets a handler callback on the button's window object at offset +0xc0.
│   │   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
│   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   ├── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│   │   └── call_refresh_callback [UI] (47B) — Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
│   ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│   └── (3 FW helpers hidden)
├── foreign_advisor_cleanup [FW] (12B) — SEH cleanup thunk for show_foreign_advisor.
│   └── popup_dialog_close [UI] (47B) — Closes a popup dialog by destroying it and clearing its list control.
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       └── (1 FW helpers hidden)
├── foreign_advisor_seh_restore [FW] (14B) — Restores SEH chain for show_foreign_advisor.
├── text_append_gold [FW] (33B) — Appends a gold/treasury value to the global text buffer.
├── dialog_set_icon [UI] (40B) — Sets *(ECX + 0x208 + param_2*4) = param_1.
├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│       └── is_wonder_obsolete [GL] (120B) — Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│           └── civ_has_tech [GL] (181B)
│               └── bit_index_to_byte_mask [GL] (45B)
├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   ├── should_declare_war [GL] (191B) — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │   └── get_attitude_raw [GL] (47B) — Returns the raw attitude value of civ param_1 toward civ param_2.
│   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   ├── ai_choose_government [AI] (558B) *** STATE MUTATION *** — AI government selection logic.
│   │   ├── check_govt_available [GL] (323B) — Checks if a specific government type is available for a civ.
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   └── civ_has_tech [GL] (181B)
│   │   └── ai_revolution_notification [GL] (1336B) *** STATE MUTATION *** — Handles AI revolution/government change notifications.
│   │       ├── show_message [UI] (46B)
│   │       ├── show_dialog_message [UI] (43B)
│   │       ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │       ├── set_improvement_name_string [UI] (41B)
│   │       ├── civ_has_active_wonder [GL] (142B)
│   │       ├── get_civ_noun_name [GL] (145B)
│   │       ├── get_civ_leader_title [GL] (210B)
│   │       ├── get_civ_adjective_name [GL] (145B)
│   │       ├── enqueue_mp_event [MIXED] (398B)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   └── (1 FW helpers hidden)
│   │       ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │       │   ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│   │       │   └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│   │       └── revolution_dialog [MIXED] (678B) *** STATE MUTATION ***
│   │           ├── text_begin [UI] (29B)
│   │           ├── select_list_item [UI] (38B)
│   │           ├── display_improvement [UI] (33B)
│   │           ├── show_dialog_message [UI] (43B)
│   │           ├── get_civ_name [UI] (28B)
│   │           ├── set_improvement_name_string [UI] (41B)
│   │           ├── dialog_set_title [UI] (41B)
│   │           ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │           ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │           ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │           ├── get_civ_noun_name [GL] (145B)
│   │           ├── get_civ_leader_title [GL] (210B)
│   │           ├── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │           ├── check_govt_available [GL] (323B)
│   │           ├── popup_dialog_create [UI] (93B)
│   │           └── popup_add_radio_option [UI] (566B)
│   ├── spaceship_ai_should_start [AI] (583B) — Determines if an AI civ should start building spaceship parts.
│   │   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   ├── spaceship_is_enabled [GL] (90B) — Returns whether the spaceship victory condition is enabled.
│   │   └── (1 FW helpers hidden)
│   ├── find_nearest_unit [GL] (233B) *** STATE MUTATION *** — Finds the nearest unit to a position, optionally filtered by owner civ.
│   │   └── calc_movement_cost [GL] (94B) — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │       ├── distance_x_wrapped [GL] (111B)
│   │       └── diagonal_movement_cost [GL] (135B)
│   ├── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
│   │   ├── get_tile_owner [GL] (100B) — Returns the owner civ index for a tile (upper nibble of byte 5, >> 4).
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   │       └── is_tile_valid [GL] (80B)
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │       └── get_tile_ptr [GL] (90B)
│   └── (1 FW helpers hidden)
├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION *** — The main AI diplomacy negotiation function.
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   ├── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
│   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   ├── open_intelligence_dialog [UI] (535B) — Opens the intelligence report dialog for a foreign civ.
│   ├── show_game_popup_3arg [UI] (43B) — Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   └── show_terrain_help [UI] (58B) — Shows help text for a terrain type.
│   │       └── 0051D564 [?] (178B)
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   ├── get_attitude_raw [GL] (47B) — Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION *** — Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
│   ├── calc_patience_threshold [GL] (211B) — Calculates the patience threshold for diplomacy.
│   │   └── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   └── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION *** — Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION *** — Iterates all 8 map views and scrolls each active view if the given position is near edges.
│   │   │   └── scroll_map_if_needed [UI] (404B)
│   │   │       ├── set_map_scroll_position [UI] (98B)
│   │   │       └── (1 FW helpers hidden)
│   │   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   │   ├── open_intelligence_dialog [UI] (535B) — Opens the intelligence report dialog for a foreign civ.
│   │   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │   └── dialog_set_title_impl [UI] (42B)
│   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── diplo_show_greeting [MIXED] (804B) *** STATE MUTATION *** — Shows the diplomacy greeting screen when two civs meet.
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── open_list_dialog [UI] (47B)
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_leader_title [GL] (210B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── intel_open_advisor [UI] (546B)
│   │   │   │   ├── unknown (stop music) [UI] (31B)
│   │   │   │   ├── intel_create_object [UI] (200B)
│   │   │   │   ├── intel_setup_display [UI] (236B)
│   │   │   │   ├── intel_delete_object [UI] (57B)
│   │   │   │   ├── unknown (set popup parent A) [UI] (24B)
│   │   │   │   └── unknown (set popup parent B) [UI] (24B)
│   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   │   │   ├── unknown (set popup position) [UI] (32B)
│   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   │   ├── unknown (popup list init) [UI] (64B)
│   │   │   │   ├── popup_dialog_reset [UI] (1299B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── popup_set_position_fields [UI] (42B)
│   │   │   ├── get_screen_rect [UI] (48B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   │   └── update_map_tile [UI] (50B)
│   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   │   ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   │   │   └── intel_play_video_frame [UI] (248B)
│   │   │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │       └── (2 FW helpers hidden)
│   │   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   │   ├── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
│   │   └── (1 FW helpers hidden)
│   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION *** — Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   │   └── intel_close_advisor [UI] (166B) — Closes the intelligence advisor.
│   │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │       │   └── (10 FW helpers hidden)
│   │       ├── wait_for_animation [UI] (109B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── resume_music [UI] (85B)
│   │       │   ├── select_random_music_track [UI] (388B)
│   │       │   └── unknown (stop music) [UI] (31B)
│   │       ├── intel_teardown_display [UI] (158B)
│   │       │   ├── save_and_flush [UI] (41B)
│   │       │   ├── swap_dc [UI] (43B)
│   │       │   ├── init_palette_system [UI] (21B)
│   │       │   ├── pedia_free_resource [UI] (57B)
│   │       │   ├── unknown (pedia set and display resource) [UI] (45B)
│   │       │   ├── unknown (manage pedia window) [UI] (37B)
│   │       │   ├── unknown (set popup parent A) [UI] (24B)
│   │       │   ├── unknown (set popup parent B) [UI] (24B)
│   │       │   └── unknown (set popup position) [UI] (32B)
│   │       └── intel_delete_object [UI] (57B)
│   │           └── intel_destroy_object [UI] (134B)
│   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION *** — Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), resets patience counter,...
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   └── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   └── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   ├── diplo_sign_ceasefire [GL] (315B) *** STATE MUTATION *** — Signs a ceasefire — sets treaty flags 0x4002, clears mobilization flag 0x40000, clamps attitude, records turn, clears...
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION *** — The core AI diplomacy evaluation function.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   ├── get_attitude_raw [GL] (47B) — Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION *** — Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
│   │   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   │   └── (1 FW helpers hidden)
│   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION *** — Declares war from param_1 against param_2.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   ├── diplo_activate_alliance_wars [GL] (910B) *** STATE MUTATION *** — When an alliance is activated, makes all allies of the aggressor declare war on the target.
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── enqueue_mp_event [MIXED] (398B)
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   └── break_alliance [MIXED] (632B) *** STATE MUTATION *** — Breaks an alliance between two civs.
│   │       ├── text_begin [UI] (29B)
│   │       ├── text_add_string [UI] (33B)
│   │       ├── show_message [UI] (46B)
│   │       ├── show_dialog_message [UI] (43B)
│   │       ├── get_civ_name [UI] (28B)
│   │       ├── civ_has_active_wonder [GL] (142B)
│   │       ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │       ├── recall_units_from_territory [GL] (835B) *** STATE MUTATION ***
│   │       │   ├── find_nearest_city [GL] (400B)
│   │       │   ├── city_adjacent_to_continent [GL] (238B)
│   │       │   ├── calc_movement_cost [GL] (94B)
│   │       │   ├── relocate_all_units [GL] (152B) *** STATE MUTATION ***
│   │       │   ├── stack_unit [GL] (488B) *** STATE MUTATION ***
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   └── get_tile_continent [GL] (39B)
│   │       ├── redraw_map_all_players [UI] (124B)
│   │       │   └── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │       └── get_civ_people_name [GL] (145B)
│   ├── calc_gold_to_attitude [GL] (104B) — Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
│   ├── diplo_ai_negotiate [MIXED] (10271B) *** STATE MUTATION *** — The enormous (10KB) AI negotiation engine.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION *** — Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), resets patience counter,...
│   │   ├── diplo_sign_peace_treaty [GL] (253B) *** STATE MUTATION *** — Signs a peace treaty — sets treaty flags 0x4004 (peace + contact), clamps attitude to 0-50 range, resets patience.
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION *** — Declares war from param_1 against param_2.
│   │   ├── calc_gold_to_attitude [GL] (104B) — Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   │   ├── should_declare_war [GL] (191B) — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │   ├── break_alliance [MIXED] (632B) *** STATE MUTATION *** — Breaks an alliance between two civs.
│   │   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   │   ├── ai_calc_tech_value [AI] (2869B) — Calculates the AI's perceived value of researching a specific technology.
│   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── tech_is_descendant_of [GL] (135B)
│   │   │   │   └── tech_is_descendant_of [GL] (135B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── select_list_item [UI] (38B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   ├── dialog_set_title [UI] (41B)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── get_wonder_owner [GL] (73B)
│   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION ***
│   │   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B)
│   │   │   ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │   │   ├── we_love_the_king_day [GL] (379B)
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   └── enqueue_mp_event [MIXED] (398B)
│   │   │   ├── format_enabled_item [UI] (138B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   └── popup_add_edit_field [UI] (412B)
│   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   ├── unknown (show tech help) [UI] (43B)
│   │   │   │   └── show_tech_help [UI] (92B)
│   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   ├── pedia_select_entry [UI] (342B)
│   │   │   │   ├── end_paint [UI] (32B)
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   ├── unknown (lock pedia surface) [UI] (38B)
│   │   │   │   ├── pedia_init_tabs [UI] (1391B)
│   │   │   │   ├── pedia_clear_item_list [UI] (118B)
│   │   │   │   ├── pedia_draw_frame [UI] (800B)
│   │   │   │   ├── pedia_open_category [UI] (200B)
│   │   │   │   ├── pedia_get_entry_name [UI] (89B)
│   │   │   │   ├── pedia_draw_tech_detail [UI] (5911B)
│   │   │   │   ├── modal_dialog_run [UI] (283B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── unknown (string pool set) [UI] (33B)
│   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   ├── draw_hline [UI] (69B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   │   ├── set_text_style [UI] (68B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   ├── popup_dialog_create [UI] (93B)
│   │   │   ├── popup_dialog_close [UI] (47B)
│   │   │   ├── popup_add_edit_field [UI] (412B)
│   │   │   ├── popup_set_scaled_width [UI] (99B)
│   │   │   ├── popup_add_button [UI] (360B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── init_editor_scrollbar [UI] (34B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── bit_index_to_byte_mask [GL] (45B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── refresh_status_panel [UI] (297B) — Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION ***
│   │   │   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION ***
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_status_turn_info [UI] (474B)
│   │   │   │   ├── draw_coordinate_text [UI] (132B)
│   │   │   │   ├── format_unit_orders_text [UI] (450B)
│   │   │   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   ├── draw_unit [UI] (2803B)
│   │   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   │   ├── set_text_style [UI] (68B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   │       └── blit_rect_to_rect [UI] (95B)
│   │   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   │   └── (1 FW helpers hidden)
│   ├── diplo_favor_menu [MIXED] (4878B) *** STATE MUTATION *** — Handles the "favor menu" in diplomacy — options include tech exchange, declaring war on a third party, and sharing maps.
│   │   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│   │   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION *** — Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── calc_patience_threshold [GL] (211B) — Calculates the patience threshold for diplomacy.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── redraw_map_all_players [UI] (124B) — Redraws entire map for all active players.
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       └── (1 FW helpers hidden)
│   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   │   ├── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   └── (1 FW helpers hidden)
│   ├── diplo_check_war_weariness [UI] (178B) — Shows a "hawks want to continue the war" or "UN urges peace" dialog if conditions are met.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   ├── diplo_show_main_menu [UI] (747B) — Shows the main diplomacy menu with options like exchange, peace, ceasefire, alliance, withdraw troops, cancel allianc...
│   │   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   ├── diplo_show_attitude_header [UI] (118B) — Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   │   ├── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
│   │   └── (3 FW helpers hidden)
│   ├── unknown (set trade route value) [GL] (29B) *** STATE MUTATION *** — Stores a value into the trade route table at index param_1.
│   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   ├── get_attitude_raw [GL] (47B) — Returns the raw attitude value of civ param_1 toward civ param_2.
│   ├── set_attitude_value [GL] (120B) *** STATE MUTATION *** — Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
│   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   ├── should_declare_war [GL] (191B) — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   ├── intel_play_animation [UI] (181B) — Plays an animation frame in the intel advisor (for param types 2, 3, 4).
│   ├── has_spaceship_launched [GL] (47B) — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   ├── ai_calc_tech_value [AI] (2869B) — Calculates the AI's perceived value of researching a specific technology.
│   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION *** — Checks all events for NEGOTIATION triggers.
│   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION *** — Dispatches all actions for a triggered event.
│   │       ├── event_action_play_sound [UI] (294B)
│   │       ├── event_action_flag_no_schism [GL] (39B) *** STATE MUTATION ***
│   │       ├── event_action_play_cd [UI] (235B)
│   │       │   ├── play_music_track [UI] (312B)
│   │       │   └── (2 FW helpers hidden)
│   │       ├── event_action_change_money [GL] (364B) *** STATE MUTATION ***
│   │       ├── event_action_show_text [UI] (246B) *** STATE MUTATION ***
│   │       │   ├── select_list_item [UI] (38B)
│   │       │   ├── enqueue_mp_event [MIXED] (398B)
│   │       │   ├── popup_add_edit_field [UI] (412B)
│   │       │   └── (2 FW helpers hidden)
│   │       ├── event_action_make_aggression [GL] (348B) *** STATE MUTATION ***
│   │       │   └── diplomacy_check_treaty_violation [GL] (379B) *** STATE MUTATION ***
│   │       ├── event_action_destroy_civ [GL] (249B) *** STATE MUTATION ***
│   │       │   └── kill_or_retire_civ [GL] (2918B) *** STATE MUTATION ***
│   │       ├── event_action_give_tech [GL] (217B) *** STATE MUTATION ***
│   │       │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │       ├── event_action_create_unit [GL] (941B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── find_city_at [GL] (245B)
│   │       │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │       │   ├── is_tile_ocean [GL] (57B)
│   │       │   ├── get_city_owner_at [GL] (111B)
│   │       │   └── get_unit_owner_at [GL] (66B)
│   │       ├── event_action_move_unit [GL] (787B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── get_next_unit_in_stack [GL] (65B)
│   │       │   └── find_unit_stack_at_xy [GL] (231B)
│   │       └── event_action_change_terrain [GL] (1114B) *** STATE MUTATION ***
│   │           ├── is_tile_valid [GL] (80B)
│   │           ├── find_city_at [GL] (245B)
│   │           ├── city_update_tile_workers [GL] (265B) *** STATE MUTATION ***
│   │           ├── update_tile_all_players [UI] (124B)
│   │           ├── redraw_map_all_players [UI] (124B)
│   │           ├── kill_or_retire_civ [GL] (2918B) *** STATE MUTATION ***
│   │           ├── get_next_unit_in_stack [GL] (65B)
│   │           ├── find_unit_stack_at_xy [GL] (231B)
│   │           ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │           ├── get_tile_ptr [GL] (90B)
│   │           └── update_civ_visibility [GL] (75B) *** STATE MUTATION ***
│   ├── calc_war_readiness [GL] (820B) *** STATE MUTATION *** — Calculates war readiness score for a civ pair.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │       ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │       ├── sum_stack_property [GL] (724B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   ├── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
│   │   └── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   ├── check_can_declare_war [GL] (365B) — Checks if a civ can declare war.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── (1 FW helpers hidden)
│   ├── refresh_status_panel [UI] (297B) — Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   └── (1 FW helpers hidden)
├── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION *** — Starts a diplomacy or chat session.
│   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
│   ├── chatwin_get_text_length [UI] (37B) — Gets text length from chat edit control via Windows message.
│   │   └── 00002F47 [?]
│   ├── parleywin_build_title [UI] (324B) — Builds the title string for the parley window.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   │   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   └── (2 FW helpers hidden)
│   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION *** — Sets the negotiation state based on the current offer type (DAT_0067a9b0).
│   │   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   │   └── 00008B00 [?]
│   │   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   │   └── 00008B00 [?]
│   │   ├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── surface_fill_rect_color [UI] (63B)
│   │   │   │   └── draw_rect_outline [UI] (128B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── create_text_button [UI] (133B)
│   │   │   ├── set_button_click_callback [UI] (33B)
│   │   │   ├── set_checkbox_callback [UI] (33B)
│   │   │   ├── set_checkbox_value [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   ├── create_edit_control [UI] (130B)
│   │   │   │   ├── 00002740 [?]
│   │   │   │   ├── 00002D7F [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── set_edit_max_chars [UI] (43B)
│   │   │   │   └── 00002DA1 [?]
│   │   │   ├── set_control_callback [UI] (33B)
│   │   │   ├── disable_civ_slot [UI] (133B)
│   │   │   │   └── 0000ABC7 [?]
│   │   │   ├── unknown (set selected item) [UI] (33B)
│   │   │   ├── pedia_setup_list_panel [UI] (1602B)
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_draw_list_panel [UI] (1333B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   ├── init_unit_listbox [UI] (899B)
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── paint_unit_listbox [UI] (1841B)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   ├── create_civ_listbox [UI] (1123B)
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── paint_civ_listbox [UI] (1230B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── parley_cleanup_side_controls [UI] (1486B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   ├── widget_dropdown_dtor [UI] (57B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── widget_focus_hwnd [UI] (50B)
│   │   │   │   └── unknown (set focus) [UI] (26B)
│   │   │   ├── widget_create_editbox [UI] (134B)
│   │   │   │   ├── 00002740 [?]
│   │   │   │   ├── 00002D7F [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── parley_serialize_offer [GL] (1024B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   │   └── (6 FW helpers hidden)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── listbox_create_window [UI] (167B)
│   │   │   │   ├── 0000C035 [?]
│   │   │   │   ├── 0000C0F0 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── listbox_mark_dirty [UI] (32B)
│   │   │   ├── scrollbar_init [UI] (93B)
│   │   │   ├── scrollbar_create_window [UI] (207B)
│   │   │   │   ├── 00008E3F [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── scrollbar_set_position [UI] (33B)
│   │   │   ├── scrollbar_set_range [UI] (33B)
│   │   │   ├── city_list_create_panel [UI] (849B)
│   │   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   │   ├── city_list_draw [UI] (1721B)
│   │   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   └── fill_rect_8bit [UI] (152B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── (12 FW helpers hidden)
│   │   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
│   ├── widget_set_cursor_pos [UI] (43B) — Sets the cursor position in an edit box by sending a message to its HWND.
│   │   └── 00002F0D [?]
│   ├── widget_get_text_length [UI] (37B) — Returns the text length of an edit box widget.
│   │   └── unknown (get_text_end_pos) [UI] (76B) — Gets position of last character: line count - 1, gets line index, adds line length.
│   │       ├── 00002E31 [?]
│   │       ├── 00002E9C [?]
│   │       └── 00002EC1 [?]
│   ├── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
├── event_check_negotiation [GL] (900B) *** STATE MUTATION *** — Checks all events for NEGOTIATION triggers.
├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
├── popup_set_field_38 [UI] (33B) — Sets popup dialog field at this+0x38 to param_1.
├── popup_set_default_selection [UI] (116B) — Sets the default selected item in the popup by ID.
│   ├── popup_find_radio_option_by_id [UI] (101B) — Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
│   └── popup_find_button_by_id [UI] (100B) — Searches the popup's button linked list (head at this+0x234) for a node whose first field (node[0]) matches param_1.
├── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
└── clamp [FW] (57B) — Clamps a value to [min, max] range.
```

### `0042F079` advisor_military_open

```
advisor_military_open [UI] (538B)
  (no call graph data — MFC message-map stub or leaf function)
```

### `0043856B` show_military_advisor_dialog

> Opens the military advisor dialog.

```
show_military_advisor_dialog [UI] (333B)
├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   └── show_window_inner [UI] (38B) — Shows the window by calling manage_window then a follow-up display function.
│       ├── manage_window_show [UI] (37B) — Calls manage_window_C40A with the window handle from this+8.
│       │   └── 0000C40A [?]
│       └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
├── create_text_button [UI] (133B) — Creates a text button control.
│   ├── 00009740 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── 0000944B [?]
│   │   └── surface_list_remove [UI] (191B) — Removes a surface node from the linked list at this+0xB8 by matching param_1 to node IDs via thunk_FUN_00418740.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│       └── surface_list_append [UI] (99B) — Appends a surface node (param_1) to the linked list at this+0xB8.
├── set_button_owner [UI] (45B) — Sets the button's owner/parent reference.
│   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
├── set_button_handler [UI] (45B) — Sets a handler callback on the button's window object at offset +0xc0.
│   └── get_window_object [UI] (28B) — Returns the window object pointer from this+8.
├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
├── get_improvement_name [FW] (92B) — Returns a pointer to the Nth string in the string pool.
├── rect_offset [FW] (34B) — Wraps Win32 OffsetRect(param_1, param_2, param_3).
└── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
    ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
    │   └── invalidate_region [UI] (180B) — Invalidates a screen region.
    │       ├── blit_rect_to_screen [UI] (43B)
    │       │   └── validate_window_rect [UI] (43B)
    │       └── port_copy_to_screen_clipped [UI] (220B)
    │           ├── 0000CC11 [?]
    │           ├── rect_get_width [UI] (27B)
    │           ├── rect_get_height [UI] (28B)
    │           ├── get_view_window_handle [UI] (28B)
    │           ├── get_surface_hwnd [UI] (28B)
    │           ├── port_lock [UI] (287B)
    │           ├── port_unlock [UI] (83B)
    │           ├── port_select_palette [UI] (87B)
    │           └── surface_is_locked [UI] (44B)
    └── call_refresh_callback [UI] (47B) — Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
```

## Diplomacy (Parley)

### `00526CA0` parley_add_dialog_panel

> Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.

```
parley_add_dialog_panel [UI] (26152B)
├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   └── validate_window_rect [UI] (43B) — Validates (marks as not needing repaint) a rectangle of the window.
│   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│       ├── 0000CC11 [?]
│       ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_surface_hwnd [UI] (28B) — Returns the HWND stored at offset +4 of the object (ECX).
│       ├── port_lock [UI] (287B) — Locks the port's surface buffer.
│       │   ├── check_topdown [UI] (41B)
│       │   └── get_pixel_buffer [UI] (39B)
│       ├── port_unlock [UI] (83B) — Unlocks the port's surface, freeing the row pointer table.
│       ├── port_select_palette [UI] (87B) — Same as FUN_005c0cc5 but with null check on param_1.
│       │   └── write_full_colortable [UI] (39B)
│       │       └── 00003B4C [?]
│       └── surface_is_locked [UI] (44B) — Returns true if the port's surface buffer (this+0x34) is non-null (i.e., locked).
├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   └── draw_rect_outline [UI] (128B) — Draws a rectangle outline (4 lines: top, bottom, left, right).
│       ├── draw_hline [UI] (69B) — Draws a horizontal line from (param_2, param_4) to (param_3+1, param_4+1) with the given color.
│       │   ├── set_rect_abs [UI] (42B)
│       │   └── fill_surface_from_rect [UI] (71B)
│       │       ├── rect_get_width [UI] (27B)
│       │       ├── rect_get_height [UI] (28B)
│       │       └── fill_rect_xywh [UI] (63B)
│       └── draw_vline [UI] (69B) — Draws a vertical line from (param_2, param_3) to (param_2+1, param_4+1).
│           ├── set_rect_abs [UI] (42B)
│           └── fill_surface_from_rect [UI] (71B)
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   └── 0000858E [?]
├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   ├── 00008B00 [?]
│   └── 00008B2D [?]
├── base_control_init [FW] (100B) — Initializes the base control structure.
├── create_text_button [UI] (133B) — Creates a text button control.
│   ├── 00009740 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── 0000944B [?]
│   │   └── surface_list_remove [UI] (191B) — Removes a surface node from the linked list at this+0xB8 by matching param_1 to node IDs via thunk_FUN_00418740.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│       └── surface_list_append [UI] (99B) — Appends a surface node (param_1) to the linked list at this+0xB8.
├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
├── control_element_constructor [FW] (83B) — Constructs a single element of the control vector.
├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
├── construct_list_item [FW] (137B) — Constructor for a list item control.
├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   ├── 00002740 [?]
│   ├── 00002D7F [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   └── 00002DA1 [?]
├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
├── get_improvement_name [FW] (92B) — Returns a pointer to the Nth string in the string pool.
├── dialog_manage_window [FW] (50B) — If *(ECX + 0x1c) != 0, calls manage_window_8B58.
│   └── 00008B58 [?]
├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   └── 0000ABC7 [?]
├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── 0000CF17 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │   └── scrollbar_set_range [UI] (54B) — Sets scrollbar range and initial position.
│   │       └── scrollbar_set_pos [UI] (39B)
│   │           └── 0000D149 [?]
│   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   └── scrollbar_set_pos [UI] (39B) — Sets scrollbar position by sending WM_COMMAND with code 0x7F.
│   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   └── scrollbar_set_range [UI] (54B) — Sets scrollbar range and initial position.
│   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   ├── pedia_draw_list_panel [UI] (1333B) — Renders the tech/item list panel in the Civilopedia, drawing text labels for each visible item with selection highlig...
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── unknown (get panel icon width) [UI] (37B) — Returns the width of the icon rectangle at this+0x10.
│   │   │   └── rect_get_width [UI] (27B)
│   │   ├── unknown (get panel icon height) [UI] (37B) — Returns the height of the icon rectangle at this+0x10.
│   │   │   └── rect_get_height [UI] (28B)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   └── 00008B00 [?]
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── 00008B00 [?]
│   │   │   └── (1 FW helpers hidden)
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_set_clip_rect [UI] (55B) — Copies the port's clip rect (this+0x14..0x20) into the output parameter.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── port_lock [UI] (287B)
│   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (1 FW helpers hidden)
│   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── 00008BE1 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │       └── is_wonder_obsolete [GL] (120B)
│   │           └── civ_has_tech [GL] (181B)
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── unknown (get_scroll_range) [UI] (47B) — Gets scroll range (min, max) for the control's window at ECX+0x1c.
│   │       └── scrollbar_get_range [UI] (36B)
│   └── (1 FW helpers hidden)
├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   ├── paint_unit_listbox [UI] (1841B) — Renders the contents of a unit listbox: background colors, unit names, selection highlights, and alternating row shad...
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── unknown (get panel icon width) [UI] (37B) — Returns the width of the icon rectangle at this+0x10.
│   │   ├── unknown (get panel icon height) [UI] (37B) — Returns the height of the icon rectangle at this+0x10.
│   │   ├── populate_unit_listbox [UI] (1102B) — Populates a unit listbox with qualifying units.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   └── get_active_control [UI] (21B)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   ├── find_unit_by_alive_flag [GL] (329B) — Finds a unit by its alive flag value (param_1).
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   └── is_tile_ocean [GL] (57B)
│   │   ├── get_unit_home_city_name [GL] (89B) — Returns the name string of a unit's home city, or a "NONE" string if homeless.
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_set_clip_rect [UI] (55B) — Copies the port's clip rect (this+0x14..0x20) into the output parameter.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   └── (1 FW helpers hidden)
│   ├── populate_unit_listbox [UI] (1102B) — Populates a unit listbox with qualifying units.
│   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   └── (1 FW helpers hidden)
├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
├── clear_string [FW] (22B) — Sets the first byte of a string to 0 (empty string).
├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── paint_civ_listbox [UI] (1230B) — Renders the civ listbox contents: civ flag sprite, civ name, leader name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   ├── draw_best_city_sprite [UI] (484B) — Finds the best city for a given player (param_1) by iterating all cities and scoring them based on size, capitol stat...
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── scale_sprite [UI] (35B)
│   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── draw_border_rect [UI] (61B)
│   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_dark_color [UI] (92B)
│   │   │   │   ├── prepare_surface [UI] (24B)
│   │   │   │   ├── get_unit_owner_at [GL] (66B)
│   │   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   │   ├── set_text_style [UI] (68B)
│   │   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   └── get_active_control [UI] (21B)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_set_clip_rect [UI] (55B) — Copies the port's clip rect (this+0x14..0x20) into the output parameter.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   └── (1 FW helpers hidden)
│   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   └── (1 FW helpers hidden)
├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── parleywin_paint_border_strip [UI] (226B) — Paints a horizontal border strip (top or bottom) of the parley window using either tiled background or flat fill.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── fill_surface_from_rect [UI] (71B) — Fills a rectangular region on a surface with a solid color, reading dimensions from a rect structure.
│   │   └── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │       └── blit_rect_to_rect [UI] (95B)
│   │           ├── set_rect_wh [UI] (48B)
│   │           └── port_blit_stretch [UI] (443B)
│   ├── widget_button_dtor [UI] (57B) — Destructor for a button widget.
│   ├── widget_listbox_dtor [UI] (57B) — Destructor for a listbox widget.
│   ├── widget_checkbox_dtor [UI] (57B) — Destructor for a checkbox widget.
│   ├── widget_scrollbar_dtor [UI] (57B) — Destructor for a scrollbar widget.
│   │   └── scrollbar_widget_dtor [UI] (112B) — Destructor for a scrollbar widget.
│   │       ├── 000099F4 [?]
│   │       └── (3 FW helpers hidden)
│   ├── widget_dropdown_dtor [UI] (57B) — Destructor for a dropdown widget.
│   └── (2 FW helpers hidden)
├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   └── unknown (set focus) [UI] (26B) — Calls SetFocus(param_1).
├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   ├── 00002740 [?]
│   ├── 00002D7F [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   └── widget_inflate_rect [UI] (34B) — Thin wrapper around Win32 InflateRect.
├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │       └── net_msg_init_header [GL] (55B)
│   │   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   └── (3 FW helpers hidden)
│   ├── parley_serialize_offer [GL] (1024B) — Serializes a diplomacy offer into a packet buffer.
│   │   └── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│   │       └── 00002D4D [?]
│   └── (1 FW helpers hidden)
├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION *** — Builds text description of tech items in a diplomacy offer.
│   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION *** — Builds text description of a gold amount in a diplomacy offer.
│   ├── parley_describe_units [UI] (546B) *** STATE MUTATION *** — Builds text description of unit items in a diplomacy offer.
│   │   ├── find_unit_by_alive_flag [GL] (329B) — Finds a unit by its alive flag value (param_1).
│   │   └── (5 FW helpers hidden)
│   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION *** — Builds text description of cities and their populations in a diplomacy offer.
│   │   ├── find_city_by_id [GL] (128B) — Finds a city by its alive flag value (param_1).
│   │   └── (5 FW helpers hidden)
│   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION *** — Builds text description of an attitude/relationship change request (war, peace, alliance).
│   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION *** — Builds text description of map sharing items in a diplomacy offer.
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   └── (4 FW helpers hidden)
│   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION *** — Builds text describing a treaty type (ceasefire, peace, alliance, withdrawal) for diplomacy descriptions.
│   └── (6 FW helpers hidden)
├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
├── streambuf_setegptr [FW] (33B) — Sets the end-of-get-area pointer on a streambuf-like UI object (this+0x2c = param_1).
├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   ├── 0000C035 [?]
│   ├── 0000C0F0 [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   ├── 00008E3F [?]
│   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   └── (1 FW helpers hidden)
├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   ├── city_list_draw [UI] (1721B) — Draws the city list panel for a given pane, rendering each visible city row with its sprite, name, status text, and s...
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── has_building [GL] (122B) — Checks if a city has a specific building.
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   ├── find_city_by_id [GL] (128B) — Finds a city by its alive flag value (param_1).
│   │   ├── city_list_draw_city_sprite [UI] (239B) — Draws a small city sprite icon in the city list at the specified position.
│   │   │   ├── scale_sprite [UI] (35B)
│   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   └── get_active_control [UI] (21B)
│   │   ├── city_list_populate [UI] (1138B) — Populates the city list arrays for a given pane.
│   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   └── has_building [GL] (122B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_set_clip_rect [UI] (55B) — Copies the port's clip rect (this+0x14..0x20) into the output parameter.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   └── (1 FW helpers hidden)
│   ├── city_list_populate [UI] (1138B) — Populates the city list arrays for a given pane.
│   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   └── (1 FW helpers hidden)
├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
├── unknown (set_ptr_e68) [FW] (24B) — Sets PTR_DAT_00637e68 = param_1 (function/data pointer).
├── unknown (set_ptr_e6c) [FW] (24B) — Sets PTR_DAT_00637e6c = param_1.
├── unknown (set_ptr_e64) [FW] (24B) — Sets PTR_DAT_00637e64 = param_1.
├── fatal_error [FW] (70B) — Reports a fatal error: records error number, formats error message with file/line info, shows message box.
│   ├── unknown (show_fatal_error_box) [UI] (41B) — Shows "SMEDS Application Error" message box.
│   │   └── 0000DD00 [?]
│   └── (2 FW helpers hidden)
└── _strcpy_thunk [FW] (7B) — CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
```

### `004B7EB6` parleywin_start_session

> Starts a diplomacy or chat session.

```
parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   └── show_window_inner [UI] (38B) — Shows the window by calling manage_window then a follow-up display function.
│       ├── manage_window_show [UI] (37B) — Calls manage_window_C40A with the window handle from this+8.
│       │   └── 0000C40A [?]
│       └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── 0051D3E0 [?] (351B)
├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│       └── is_wonder_obsolete [GL] (120B) — Checks if a wonder has been made obsolete by any civ researching its obsolescence tech.
│           └── civ_has_tech [GL] (181B)
│               └── bit_index_to_byte_mask [GL] (45B)
├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
│   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│   │   └── rng_next_float [GL] (94B) *** STATE MUTATION *** — Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + 0x3C6EF35F.
│   └── (10 FW helpers hidden)
├── chatwin_get_text_length [UI] (37B) — Gets text length from chat edit control via Windows message.
│   └── 00002F47 [?]
├── parleywin_build_title [UI] (324B) — Builds the title string for the parley window.
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│   ├── calc_attitude [GL] (178B) — Converts a raw attitude value (0-100) into an attitude category (0-8).
│   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   └── (2 FW helpers hidden)
├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION *** — Sets the negotiation state based on the current offer type (DAT_0067a9b0).
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── validate_window_rect [UI] (43B)
│   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │       ├── 0000CC11 [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── get_surface_hwnd [UI] (28B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── port_select_palette [UI] (87B)
│   │   │       └── surface_is_locked [UI] (44B)
│   │   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   │   └── draw_rect_outline [UI] (128B)
│   │   │       ├── draw_hline [UI] (69B)
│   │   │       └── draw_vline [UI] (69B)
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   │   ├── 00008B00 [?]
│   │   │   └── 00008B2D [?]
│   │   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   │   ├── 00009740 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── 0000944B [?]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   │   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   │   └── 00002DA1 [?]
│   │   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   │   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │   └── 0000ABC7 [?]
│   │   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   │   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── 0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_draw_list_panel [UI] (1333B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── 00008BE1 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── paint_unit_listbox [UI] (1841B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── paint_civ_listbox [UI] (1230B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │   ├── widget_dropdown_dtor [UI] (57B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   │   └── unknown (set focus) [UI] (26B)
│   │   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── parley_serialize_offer [GL] (1024B)
│   │   │   │   └── get_edit_text [UI] (43B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   └── (6 FW helpers hidden)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   │   ├── 0000C035 [?]
│   │   │   ├── 0000C0F0 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   │   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   │   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   │   ├── 00008E3F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   │   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   │   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── city_list_draw [UI] (1721B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── port_lock [UI] (287B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   └── get_pixel_buffer [UI] (39B)
│   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   └── (12 FW helpers hidden)
│   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
├── widget_set_cursor_pos [UI] (43B) — Sets the cursor position in an edit box by sending a message to its HWND.
│   └── 00002F0D [?]
├── widget_get_text_length [UI] (37B) — Returns the text length of an edit box widget.
│   └── unknown (get_text_end_pos) [UI] (76B) — Gets position of last character: line count - 1, gets line index, adds line length.
│       ├── 00002E31 [?]
│       ├── 00002E9C [?]
│       └── 00002EC1 [?]
├── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│   │   └── invalidate_region [UI] (180B) — Invalidates a screen region.
│   └── call_refresh_callback [UI] (47B) — Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
└── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
```

### `004B81DD` parley_handle_response

> Handles incoming diplomacy responses (accept, reject, counter-offer, war declaration).

```
parley_handle_response [MIXED] (1177B) *** STATE MUTATION ***
├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI] (46B)
│               └── 0051D3E0 [?] (351B)
├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION *** — Sets the negotiation state based on the current offer type (DAT_0067a9b0).
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   │   └── draw_rect_outline [UI] (128B)
│   │   │       ├── draw_hline [UI] (69B)
│   │   │       └── draw_vline [UI] (69B)
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   │   ├── 00008B00 [?]
│   │   │   └── 00008B2D [?]
│   │   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   │   ├── 00009740 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── 0000944B [?]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   │   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   │   └── 00002DA1 [?]
│   │   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   │   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │   └── 0000ABC7 [?]
│   │   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   │   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── 0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_draw_list_panel [UI] (1333B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── 00008BE1 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── paint_unit_listbox [UI] (1841B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── paint_civ_listbox [UI] (1230B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │   ├── widget_dropdown_dtor [UI] (57B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   │   └── unknown (set focus) [UI] (26B)
│   │   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── parley_serialize_offer [GL] (1024B)
│   │   │   │   └── get_edit_text [UI] (43B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   └── (6 FW helpers hidden)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   │   ├── 0000C035 [?]
│   │   │   ├── 0000C0F0 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   │   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   │   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   │   ├── 00008E3F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   │   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   │   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── city_list_draw [UI] (1721B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── port_lock [UI] (287B)
│   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   └── (12 FW helpers hidden)
│   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
├── parley_execute_transaction [GL] (1381B) *** STATE MUTATION *** — Executes a completed diplomacy transaction.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION *** — Copies state into mirror then bitwise-inverts all mirror data.
│   │   │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION ***
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (2 FW helpers hidden)
│   ├── parley_execute_share_maps [GL] (1521B) *** STATE MUTATION *** — Executes map sharing between two civs.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── redraw_map_all_players [UI] (124B) — Redraws entire map for all active players.
│   │   │   └── redraw_entire_map [UI] (205B) *** STATE MUTATION ***
│   │   │       ├── minimap_full_redraw [UI] (416B)
│   │   │       ├── recalc_viewport_geometry [UI] (1410B)
│   │   │       ├── redraw_full_viewport [UI] (278B)
│   │   │       ├── begin_end_paint_cycle [UI] (100B)
│   │   │       ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │       ├── dialog_create_buttons [UI] (675B)
│   │   │       └── (1 FW helpers hidden)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask).
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   │   └── is_tile_valid [GL] (80B)
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │       └── (1 FW helpers hidden)
│   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   ├── parley_execute_give_tech_list [GL] (102B) *** STATE MUTATION *** — Gives a list of technologies from one civ to another.
│   │   └── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   │       ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │       └── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   ├── parley_execute_give_gold [GL] (174B) *** STATE MUTATION *** — Transfers gold between two civs.
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   └── calc_gold_to_attitude [GL] (104B) — Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
│   ├── parley_execute_give_techs [GL] (151B) *** STATE MUTATION *** — Gives technologies from param_2 to param_1.
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│   │       ├── text_begin [UI] (29B)
│   │       ├── text_add_string [UI] (33B)
│   │       ├── text_add_label_id [UI] (33B)
│   │       ├── select_list_item [UI] (38B)
│   │       │   └── popup_show_modal [UI] (999B)
│   │       ├── text_newline [UI] (29B)
│   │       ├── text_end_italic [UI] (29B)
│   │       ├── display_improvement [UI] (33B)
│   │       ├── unknown (dialog show single param) [UI] (33B)
│   │       ├── set_improvement_name_string [UI] (41B)
│   │       │   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│   │       │   └── (1 FW helpers hidden)
│   │       ├── dialog_set_title [UI] (41B)
│   │       │   └── dialog_set_title_impl [UI] (42B)
│   │       ├── has_building [GL] (122B)
│   │       │   └── bit_index_to_byte_mask [GL] (45B)
│   │       ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │       │   └── bit_index_to_byte_mask [GL] (45B)
│   │       ├── get_wonder_owner [GL] (73B)
│   │       │   └── get_wonder_city [GL] (57B)
│   │       ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── select_list_item [UI] (38B)
│   │       │   ├── show_message [UI] (46B)
│   │       │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │       │   ├── set_improvement_name_string [UI] (41B)
│   │       │   ├── open_intelligence_dialog [UI] (535B)
│   │       │   ├── dialog_set_title [UI] (41B)
│   │       │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │       │   ├── diplo_show_attitude_header [UI] (118B)
│   │       │   ├── diplo_show_greeting [MIXED] (804B) *** STATE MUTATION ***
│   │       │   ├── update_tile_all_players [UI] (124B)
│   │       │   ├── get_civ_noun_name [GL] (145B)
│   │       │   ├── get_civ_leader_title [GL] (210B)
│   │       │   ├── get_civ_people_name [GL] (145B)
│   │       │   ├── intel_play_animation [UI] (181B)
│   │       │   ├── popup_dialog_create [UI] (93B)
│   │       │   ├── popup_add_radio_option [UI] (566B)
│   │       │   └── (1 FW helpers hidden)
│   │       ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │       │   └── intel_close_advisor [UI] (166B)
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       ├── get_civ_people_name [GL] (145B)
│   │       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       ├── civ_has_tech [GL] (181B)
│   │       ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │       │   ├── set_improvement_name_string [UI] (41B)
│   │       │   ├── show_game_popup_3arg [UI] (43B)
│   │       │   ├── civ_has_active_wonder [GL] (142B)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   ├── update_tile_all_players [UI] (124B)
│   │       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │       │   ├── civ_has_tech [GL] (181B)
│   │       │   └── enqueue_mp_event [MIXED] (398B)
│   │       ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION ***
│   │       │   ├── show_message [UI] (46B)
│   │       │   ├── show_dialog_message [UI] (43B)
│   │       │   ├── set_improvement_name_string [UI] (41B)
│   │       │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │       │   ├── get_civ_people_name [GL] (145B)
│   │       │   └── set_government_type [GL] (529B) *** STATE MUTATION ***
│   │       ├── we_love_the_king_day [GL] (379B)
│   │       │   ├── show_message [UI] (46B)
│   │       │   ├── get_civ_name [UI] (28B)
│   │       │   ├── has_building [GL] (122B)
│   │       │   ├── unknown (show tech help) [UI] (43B)
│   │       │   └── enqueue_mp_event [MIXED] (398B)
│   │       ├── format_enabled_item [UI] (138B)
│   │       │   ├── text_begin [UI] (29B)
│   │       │   ├── text_add_string [UI] (33B)
│   │       │   ├── text_begin_italic [UI] (29B)
│   │       │   ├── display_improvement [UI] (33B)
│   │       │   └── popup_add_edit_field [UI] (412B)
│   │       ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │       ├── unknown (show tech help) [UI] (43B)
│   │       │   └── show_tech_help [UI] (92B)
│   │       ├── enqueue_mp_event [MIXED] (398B)
│   │       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       │   └── (1 FW helpers hidden)
│   │       ├── pedia_select_entry [UI] (342B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   ├── show_window_wrapper [UI] (33B)
│   │       │   ├── unknown (lock pedia surface) [UI] (38B)
│   │       │   ├── pedia_init_tabs [UI] (1391B)
│   │       │   ├── pedia_clear_item_list [UI] (118B)
│   │       │   ├── pedia_draw_frame [UI] (800B)
│   │       │   ├── pedia_open_category [UI] (200B)
│   │       │   ├── pedia_get_entry_name [UI] (89B)
│   │       │   ├── pedia_draw_tech_detail [UI] (5911B)
│   │       │   ├── modal_dialog_run [UI] (283B)
│   │       │   └── (1 FW helpers hidden)
│   │       ├── draw_status_panel_header [UI] (1182B)
│   │       │   ├── rect_get_width [UI] (27B)
│   │       │   ├── rect_get_height [UI] (28B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── invalidate_region [UI] (180B)
│   │       │   ├── text_begin [UI] (29B)
│   │       │   ├── text_add_label_id [UI] (33B)
│   │       │   ├── get_font_height [UI] (28B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   ├── text_add_number [UI] (33B)
│   │       │   ├── unknown (string pool set) [UI] (33B)
│   │       │   ├── draw_text_at [UI] (42B)
│   │       │   ├── scale_sprite [UI] (35B)
│   │       │   ├── set_sprite_scale [UI] (33B)
│   │       │   ├── reset_sprite_scale [UI] (28B)
│   │       │   ├── prepare_surface [UI] (24B)
│   │       │   ├── draw_hline [UI] (69B)
│   │       │   ├── tile_bitmap [UI] (391B)
│   │       │   ├── set_text_draw_target [UI] (24B)
│   │       │   ├── set_text_draw_source [UI] (24B)
│   │       │   ├── set_text_style [UI] (68B)
│   │       │   ├── port_set_rect_from_self [UI] (63B)
│   │       │   ├── port_set_rect [UI] (91B)
│   │       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       │   └── (4 FW helpers hidden)
│   │       ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │       │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│   │       ├── popup_dialog_create [UI] (93B)
│   │       │   ├── unknown (popup list init) [UI] (64B)
│   │       │   ├── popup_dialog_reset [UI] (1299B)
│   │       │   └── (1 FW helpers hidden)
│   │       ├── popup_dialog_close [UI] (47B)
│   │       │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│   │       │   └── (1 FW helpers hidden)
│   │       ├── popup_add_edit_field [UI] (412B)
│   │       ├── popup_set_scaled_width [UI] (99B)
│   │       ├── popup_add_button [UI] (360B)
│   │       │   ├── measure_text_height [UI] (42B)
│   │       │   ├── init_editor_scrollbar [UI] (34B)
│   │       │   └── (2 FW helpers hidden)
│   │       ├── bit_index_to_byte_mask [GL] (45B)
│   │       └── (1 FW helpers hidden)
│   ├── parley_execute_give_units [GL] (153B) *** STATE MUTATION *** — Transfers units from their current owner to param_1.
│   │   ├── parley_transfer_city [GL] (2217B) *** STATE MUTATION *** — Transfers a city from one civ to another.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_nearest_city [GL] (400B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   └── get_tile_continent_if_land [GL] (72B)
│   │   │   ├── set_building [GL] (186B) *** STATE MUTATION ***
│   │   │   ├── get_wonder_city [GL] (57B)
│   │   │   │   └── is_wonder_obsolete [GL] (120B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   │   └── update_map_tile [UI] (50B)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   │   └── update_map_radius1 [UI] (50B)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION ***
│   │   │   ├── can_build_unit_type [GL] (1095B)
│   │   │   │   └── civ_has_tech [GL] (181B)
│   │   │   ├── can_build_improvement [GL] (1383B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── can_build_wonder [GL] (199B)
│   │   │   ├── event_check_city_taken [GL] (243B) *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION ***
│   │   │   │   ├── 0000C494 [?]
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   │   └── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   └── find_city_by_id [GL] (128B) — Finds a city by its alive flag value (param_1).
│   ├── parley_execute_transfer_units [GL] (887B) *** STATE MUTATION *** — Transfers ownership of specific units from one civ to another.
│   │   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION *** — Major game logic function that processes visibility updates after a unit moves.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION ***
│   │   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION ***
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_city_owner_at [GL] (111B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── update_map_area_all_players [UI] (136B)
│   │   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │   ├── update_tile_all_players [UI] (124B)
│   │   │   ├── update_radius1_all_players [UI] (124B)
│   │   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   ├── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── get_tile_owner [GL] (100B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   ├── get_tile_controller [GL] (72B)
│   │   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION ***
│   │   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION ***
│   │   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION ***
│   │   │   └── end_map_batch [GL] (194B) *** STATE MUTATION ***
│   │   ├── find_nearest_city [GL] (400B) — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   ├── find_unit_placement_tile [GL] (589B) — Finds a valid tile to place a transferred unit.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── find_unit_by_alive_flag [GL] (329B) — Finds a unit by its alive flag value (param_1).
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   └── is_tile_ocean [GL] (57B)
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │       ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │       ├── sum_stack_property [GL] (724B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
│   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION *** — Moves a unit from its current position to a new position by picking it up and putting it down.
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── find_first_unit_at [GL] (186B)
│   │   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask).
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   └── delete_unit_safely [GL] (677B) *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units.
│   ├── parley_execute_treaty [GL] (289B) *** STATE MUTATION *** — Executes a treaty agreement between two civs.
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   └── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│   ├── refresh_status_panel [UI] (297B) — Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION *** — Calculates the status panel layout based on screen dimensions.
│   │   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION *** — Draws the complete status panel unit section.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── get_civ_name [UI] (28B)
│   │   │   │   └── get_civ_adjective_name [GL] (145B)
│   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   ├── draw_text_centered [UI] (46B)
│   │   │   │   └── draw_text_centered [UI] (139B)
│   │   │   ├── scale_sprite [UI] (35B)
│   │   │   ├── draw_status_turn_info [UI] (474B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   │   ├── set_text_style [UI] (68B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   └── port_set_rect [UI] (91B)
│   │   │   ├── draw_coordinate_text [UI] (132B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   ├── draw_text_at [UI] (42B)
│   │   │   │   └── get_tile_continent [GL] (39B)
│   │   │   ├── format_unit_orders_text [UI] (450B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   └── get_tile_improvements [GL] (39B)
│   │   │   ├── draw_status_panel_header [UI] (1182B)
│   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_fortress_owner_at [GL] (77B)
│   │   │   ├── draw_unit [UI] (2803B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │   │   ├── select_display_unit [UI] (396B)
│   │   │   │   ├── get_civ_dark_color [UI] (92B)
│   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   ├── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── calc_unit_movement_points [GL] (516B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   ├── get_civ_vis_ptr [GL] (48B)
│   │   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   ├── check_tile_resource [GL] (281B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_owner [GL] (100B)
│   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   │   └── get_tile_ptr [GL] (90B)
│   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   ├── set_text_style [UI] (68B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   └── port_set_rect [UI] (91B)
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   └── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   └── (1 FW helpers hidden)
├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
└── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
```

### `004B968A` parley_handle_command

> Main command handler for the parley input box.

```
parley_handle_command [MIXED] (1304B)
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
├── set_edit_text [UI] (43B) — Sets the text content of an edit control.
│   └── 00002D7F [?]
├── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│   └── 00002D4D [?]
├── unknown (string pool set) [UI] (33B) — Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   └── advance_year_display [UI] (479B) — Advances the year display in the UI, showing appropriate year strings.
│       ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│       ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│       └── (3 FW helpers hidden)
├── get_improvement_name [FW] (92B) — Returns a pointer to the Nth string in the string pool.
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── chatwin_handle_command [UI] (849B) — Handles chat window commands: cycling through civ names (0x2B0), civ leader names (0x2B1), loading chat macros (0x2B2...
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   └── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │       └── is_wonder_obsolete [GL] (120B)
│   │           └── civ_has_tech [GL] (181B)
│   ├── chatwin_load_macro_file [UI] (270B) — Loads a chat macro from file.
│   ├── chatwin_get_text_length [UI] (37B) — Gets text length from chat edit control via Windows message.
│   │   └── 00002F47 [?]
│   ├── chatwin_set_text [UI] (43B) — Sets text in chat edit control via Windows message.
│   │   └── 00003035 [?]
│   ├── chatwin_set_selection [UI] (47B) — Sets selection range in chat edit control.
│   │   └── 00002DC6 [?]
│   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
│   └── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
├── parleywin_ok_clicked [UI] (74B) — OK button handler — calls close on the parley window.
│   ├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   │   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   │   └── focus_and_raise_window [UI] (57B)
│   │   └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
│   ├── parleywin_close [MIXED] (432B) *** STATE MUTATION *** — Closes the parley window.
│   │   ├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │   └── 0051D564 [?] (178B)
│   │   ├── unknown (manage pedia window) [UI] (37B) — Calls manage_window_C44D with the window handle at this+8.
│   │   │   └── 0000C44D [?]
│   │   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── init_game_display [UI] (51B) — Initializes the game display.
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── init_palette_system [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│   │   └── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   └── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
├── parley_append_chat_text [UI] (354B) — Appends a text string to the chat display buffer (DAT_0062d870), scrolling out oldest text if buffer is full.
│   ├── set_edit_text [UI] (43B) — Sets the text content of an edit control.
│   ├── widget_set_cursor_pos [UI] (43B) — Sets the cursor position in an edit box by sending a message to its HWND.
│   │   └── 00002F0D [?]
│   ├── widget_get_text_length [UI] (37B) — Returns the text length of an edit box widget.
│   │   └── unknown (get_text_end_pos) [UI] (76B) — Gets position of last character: line count - 1, gets line index, adds line length.
│   │       ├── 00002E31 [?]
│   │       ├── 00002E9C [?]
│   │       └── 00002EC1 [?]
│   └── (2 FW helpers hidden)
├── parley_format_civ_name [UI] (122B) — Formats a civilization's name for display in chat.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── get_civ_noun_name [GL] (145B) — Returns the noun name for a civilization (e.g., "Romans").
│   ├── get_civ_leader_title [GL] (210B) — Returns the leader title for a civilization based on civ type and government.
│   └── (2 FW helpers hidden)
├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   └── unknown (set focus) [UI] (26B) — Calls SetFocus(param_1).
├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
└── _strcat [FW] (224B) — CRT strcat — finds end of dest string then copies source.
```

### `0052DD73` parley_advance_negotiation

> Advances the diplomacy negotiation state machine.

```
parley_advance_negotiation [MIXED] (1425B) *** STATE MUTATION ***
├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   └── focus_and_raise_window [UI] (57B) — Gives keyboard focus to a window and brings it to the top of the Z-order.
│   └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── validate_window_rect [UI] (43B)
│   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │       ├── 0000CC11 [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── get_view_window_handle [UI] (28B)
│   │   │       ├── get_surface_hwnd [UI] (28B)
│   │   │       ├── port_lock [UI] (287B)
│   │   │       ├── port_unlock [UI] (83B)
│   │   │       ├── port_select_palette [UI] (87B)
│   │   │       └── surface_is_locked [UI] (44B)
│   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │       └── net_msg_init_header [GL] (55B)
│   │   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   └── 0000858E [?]
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   └── widget_inflate_rect [UI] (34B)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── 0000847F [?]
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   └── draw_string_palette [UI] (534B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │   └── (3 FW helpers hidden)
│   │   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   │   └── net_msg_init_header [GL] (55B)
│   │   └── (3 FW helpers hidden)
│   ├── parley_serialize_offer [GL] (1024B) — Serializes a diplomacy offer into a packet buffer.
│   │   └── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│   │       └── 00002D4D [?]
│   └── (1 FW helpers hidden)
├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   └── draw_rect_outline [UI] (128B) — Draws a rectangle outline (4 lines: top, bottom, left, right).
│   │       ├── draw_hline [UI] (69B)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   └── fill_surface_from_rect [UI] (71B)
│   │       └── draw_vline [UI] (69B)
│   │           ├── set_rect_abs [UI] (42B)
│   │           └── fill_surface_from_rect [UI] (71B)
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── 00008B00 [?]
│   │   └── 00008B2D [?]
│   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   ├── 00009740 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   │   ├── 0000944B [?]
│   │   │   └── surface_list_remove [UI] (191B)
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │       └── surface_list_append [UI] (99B)
│   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   ├── 00002740 [?]
│   │   ├── 00002D7F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   └── 00002DA1 [?]
│   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   └── 0000ABC7 [?]
│   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   │   ├── 0000CF17 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │       └── scrollbar_set_pos [UI] (39B)
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │       └── 0000D149 [?]
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_draw_list_panel [UI] (1333B) — Renders the tech/item list panel in the Civilopedia, drawing text labels for each visible item with selection highlig...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   └── rect_get_width [UI] (27B)
│   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   └── rect_get_height [UI] (28B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   └── fill_rect_8bit [UI] (152B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   │   ├── 00008BE1 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   │   └── get_wonder_city [GL] (57B)
│   │   │       └── is_wonder_obsolete [GL] (120B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │       └── scrollbar_get_range [UI] (36B)
│   │   └── (1 FW helpers hidden)
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── paint_unit_listbox [UI] (1841B) — Renders the contents of a unit listbox: background colors, unit names, selection highlights, and alternating row shad...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── populate_unit_listbox [UI] (1102B) — Populates a unit listbox with qualifying units.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── paint_civ_listbox [UI] (1230B) — Renders the civ listbox contents: civ flag sprite, civ name, leader name.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── parleywin_paint_border_strip [UI] (226B) — Paints a horizontal border strip (top or bottom) of the parley window using either tiled background or flat fill.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   ├── widget_button_dtor [UI] (57B) — Destructor for a button widget.
│   │   ├── widget_listbox_dtor [UI] (57B) — Destructor for a listbox widget.
│   │   ├── widget_checkbox_dtor [UI] (57B) — Destructor for a checkbox widget.
│   │   ├── widget_scrollbar_dtor [UI] (57B) — Destructor for a scrollbar widget.
│   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │       ├── 000099F4 [?]
│   │   │       └── (3 FW helpers hidden)
│   │   ├── widget_dropdown_dtor [UI] (57B) — Destructor for a dropdown widget.
│   │   └── (2 FW helpers hidden)
│   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   └── unknown (set focus) [UI] (26B) — Calls SetFocus(param_1).
│   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   ├── 00002740 [?]
│   │   ├── 00002D7F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION *** — Builds text description of tech items in a diplomacy offer.
│   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION *** — Builds text description of a gold amount in a diplomacy offer.
│   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION *** — Builds text description of unit items in a diplomacy offer.
│   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   └── (5 FW helpers hidden)
│   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION *** — Builds text description of cities and their populations in a diplomacy offer.
│   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   └── (5 FW helpers hidden)
│   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION *** — Builds text description of an attitude/relationship change request (war, peace, alliance).
│   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION *** — Builds text description of map sharing items in a diplomacy offer.
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── (4 FW helpers hidden)
│   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION *** — Builds text describing a treaty type (ceasefire, peace, alliance, withdrawal) for diplomacy descriptions.
│   │   └── (6 FW helpers hidden)
│   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   ├── 0000C035 [?]
│   │   ├── 0000C0F0 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   ├── 00008E3F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │   └── (1 FW helpers hidden)
│   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── city_list_draw [UI] (1721B) — Draws the city list panel for a given pane, rendering each visible city row with its sprite, name, status text, and s...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── city_list_populate [UI] (1138B) — Populates the city list arrays for a given pane.
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   └── (12 FW helpers hidden)
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `0052DA23` parley_reject_proposals

> Rejects all proposals in the diplomacy dialog.

```
parley_reject_proposals [MIXED] (282B) *** STATE MUTATION ***
├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   ├── 00008B00 [?]
│   └── 00008B2D [?]
├── dialog_manage_window [FW] (50B) — If *(ECX + 0x1c) != 0, calls manage_window_8B58.
│   └── 00008B58 [?]
├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `0052DB3D` parley_accept_proposals

> Accepts all proposals in the diplomacy dialog.

```
parley_accept_proposals [MIXED] (321B) *** STATE MUTATION ***
├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   ├── 00008B00 [?]
│   └── 00008B2D [?]
├── dialog_manage_window [FW] (50B) — If *(ECX + 0x1c) != 0, calls manage_window_8B58.
│   └── 00008B58 [?]
├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   └── 00008B00 [?]
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `0052E4C9` parley_on_accept_deal

> Handles acceptance of a diplomacy deal.

```
parley_on_accept_deal [MIXED] (179B) *** STATE MUTATION ***
├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   └── 0051D564 [?] (178B)
├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   └── focus_and_raise_window [UI] (57B) — Gives keyboard focus to a window and brings it to the top of the Z-order.
│   └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION *** — Sets the negotiation state based on the current offer type (DAT_0067a9b0).
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   │   └── draw_rect_outline [UI] (128B)
│   │   │       ├── draw_hline [UI] (69B)
│   │   │       └── draw_vline [UI] (69B)
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   │   ├── 00008B00 [?]
│   │   │   └── 00008B2D [?]
│   │   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   │   ├── 00009740 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── 0000944B [?]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   │   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   │   └── 00002DA1 [?]
│   │   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   │   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │   └── 0000ABC7 [?]
│   │   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   │   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── 0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_draw_list_panel [UI] (1333B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── 00008BE1 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── paint_unit_listbox [UI] (1841B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── paint_civ_listbox [UI] (1230B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │   ├── widget_dropdown_dtor [UI] (57B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   │   └── unknown (set focus) [UI] (26B)
│   │   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── parley_serialize_offer [GL] (1024B)
│   │   │   │   └── get_edit_text [UI] (43B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   └── (6 FW helpers hidden)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   │   ├── 0000C035 [?]
│   │   │   ├── 0000C0F0 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   │   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   │   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   │   ├── 00008E3F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   │   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   │   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── city_list_draw [UI] (1721B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── port_lock [UI] (287B)
│   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   └── (12 FW helpers hidden)
│   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `0052E57C` parley_on_reject_deal

> Handles rejection of a diplomacy deal.

```
parley_on_reject_deal [MIXED] (265B) *** STATE MUTATION ***
├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   └── focus_and_raise_window [UI] (57B) — Gives keyboard focus to a window and brings it to the top of the Z-order.
│   └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   └── draw_rect_outline [UI] (128B) — Draws a rectangle outline (4 lines: top, bottom, left, right).
│   │       ├── draw_hline [UI] (69B)
│   │       │   ├── set_rect_abs [UI] (42B)
│   │       │   └── fill_surface_from_rect [UI] (71B)
│   │       └── draw_vline [UI] (69B)
│   │           ├── set_rect_abs [UI] (42B)
│   │           └── fill_surface_from_rect [UI] (71B)
│   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── 00008B00 [?]
│   │   └── 00008B2D [?]
│   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   ├── 00009740 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   │   ├── 0000944B [?]
│   │   │   └── surface_list_remove [UI] (191B)
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │       └── surface_list_append [UI] (99B)
│   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   ├── 00002740 [?]
│   │   ├── 00002D7F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   └── 00002DA1 [?]
│   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   └── 0000ABC7 [?]
│   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   │   ├── 0000CF17 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │       └── scrollbar_set_pos [UI] (39B)
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │       └── 0000D149 [?]
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   │   └── scrollbar_set_range [UI] (54B)
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_draw_list_panel [UI] (1333B) — Renders the tech/item list panel in the Civilopedia, drawing text labels for each visible item with selection highlig...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   └── rect_get_width [UI] (27B)
│   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   └── rect_get_height [UI] (28B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   │   ├── check_topdown [UI] (41B)
│   │   │   │   └── fill_rect_8bit [UI] (152B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   │   ├── 00008BE1 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   │   └── get_wonder_city [GL] (57B)
│   │   │       └── is_wonder_obsolete [GL] (120B)
│   │   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │       └── scrollbar_get_range [UI] (36B)
│   │   └── (1 FW helpers hidden)
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── paint_unit_listbox [UI] (1841B) — Renders the contents of a unit listbox: background colors, unit names, selection highlights, and alternating row shad...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   └── is_tile_ocean [GL] (57B)
│   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── populate_unit_listbox [UI] (1102B) — Populates a unit listbox with qualifying units.
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── paint_civ_listbox [UI] (1230B) — Renders the civ listbox contents: civ flag sprite, civ name, leader name.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── parleywin_paint_border_strip [UI] (226B) — Paints a horizontal border strip (top or bottom) of the parley window using either tiled background or flat fill.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   └── tile_bitmap [UI] (391B)
│   │   ├── widget_button_dtor [UI] (57B) — Destructor for a button widget.
│   │   ├── widget_listbox_dtor [UI] (57B) — Destructor for a listbox widget.
│   │   ├── widget_checkbox_dtor [UI] (57B) — Destructor for a checkbox widget.
│   │   ├── widget_scrollbar_dtor [UI] (57B) — Destructor for a scrollbar widget.
│   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │       ├── 000099F4 [?]
│   │   │       └── (3 FW helpers hidden)
│   │   ├── widget_dropdown_dtor [UI] (57B) — Destructor for a dropdown widget.
│   │   └── (2 FW helpers hidden)
│   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   └── unknown (set focus) [UI] (26B) — Calls SetFocus(param_1).
│   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   ├── 00002740 [?]
│   │   ├── 00002D7F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── parley_serialize_offer [GL] (1024B) — Serializes a diplomacy offer into a packet buffer.
│   │   │   └── get_edit_text [UI] (43B)
│   │   │       └── 00002D4D [?]
│   │   └── (1 FW helpers hidden)
│   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION *** — Builds text description of tech items in a diplomacy offer.
│   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION *** — Builds text description of a gold amount in a diplomacy offer.
│   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION *** — Builds text description of unit items in a diplomacy offer.
│   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   └── (5 FW helpers hidden)
│   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION *** — Builds text description of cities and their populations in a diplomacy offer.
│   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   └── (5 FW helpers hidden)
│   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION *** — Builds text description of an attitude/relationship change request (war, peace, alliance).
│   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION *** — Builds text description of map sharing items in a diplomacy offer.
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   └── (4 FW helpers hidden)
│   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION *** — Builds text describing a treaty type (ceasefire, peace, alliance, withdrawal) for diplomacy descriptions.
│   │   └── (6 FW helpers hidden)
│   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   ├── 0000C035 [?]
│   │   ├── 0000C0F0 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   ├── 00008E3F [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │   └── (1 FW helpers hidden)
│   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   ├── create_scrollbar [UI] (124B) — Creates a scrollbar control.
│   │   ├── scrollbar_set_position [UI] (52B) — Sets the scrollbar position value and updates the scrollbar control.
│   │   ├── scrollbar_set_range [UI] (47B) — Sets the scrollbar min/max range.
│   │   ├── scrollbar_set_callback [UI] (33B) — Sets the scrollbar change callback.
│   │   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   │   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   │   ├── unknown (set scrollbar callback) [UI] (33B) — Sets a member at this+0x30 to param_1.
│   │   ├── city_list_draw [UI] (1721B) — Draws the city list panel for a given pane, rendering each visible city row with its sprite, name, status text, and s...
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── has_building [GL] (122B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── scale_sprite [UI] (35B)
│   │   │   │   ├── draw_city_sprite [UI] (1737B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── port_set_rect [UI] (91B)
│   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── city_list_populate [UI] (1138B) — Populates the city list arrays for a given pane.
│   │   ├── set_scrollbar [UI] (64B) — Sets scrollbar position if within valid range.
│   │   └── (1 FW helpers hidden)
│   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   └── (12 FW helpers hidden)
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `0052E685` parley_on_end_negotiations

> Ends negotiations.

```
parley_on_end_negotiations [MIXED] (149B) *** STATE MUTATION ***
├── unknown (lock pedia surface) [UI] (38B) — Locks the drawing surface for the pedia widget.
│   ├── unknown (get drawing context) [UI] (37B) — Retrieves the drawing context from this+8.
│   │   └── focus_and_raise_window [UI] (57B) — Gives keyboard focus to a window and brings it to the top of the Z-order.
│   └── surface_list_find_dirty [UI] (174B) — Walks the surface list looking for a dirty surface (via FUN_005c5ea0).
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION *** — Sets the negotiation state based on the current offer type (DAT_0067a9b0).
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── parley_add_dialog_panel [UI] (26152B) — Massive 26KB function that constructs the entire diplomacy dialog (parley window) panel.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── surface_fill_rect_color [UI] (63B) — Fills a rectangle on the minimap surface with a given palette color index.
│   │   │   └── draw_rect_outline [UI] (128B)
│   │   │       ├── draw_hline [UI] (69B)
│   │   │       └── draw_vline [UI] (69B)
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   │   ├── 00008B00 [?]
│   │   │   └── 00008B2D [?]
│   │   ├── create_text_button [UI] (133B) — Creates a text button control.
│   │   │   ├── 00009740 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── 0000944B [?]
│   │   │   │   └── surface_list_remove [UI] (191B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   │       └── surface_list_append [UI] (99B)
│   │   ├── set_button_click_callback [UI] (33B) — Sets the click callback function pointer for a button control.
│   │   ├── set_checkbox_callback [UI] (33B) — Sets the checkbox callback function pointer.
│   │   ├── set_checkbox_value [UI] (33B) — Sets the checkbox checked/unchecked value.
│   │   ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│   │   ├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
│   │   ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│   │   ├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── create_edit_control [UI] (130B) — Creates an edit text control for the editor dialog, registers the window class and sends initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── set_edit_max_chars [UI] (43B) — Sets the maximum character count for an edit control.
│   │   │   └── 00002DA1 [?]
│   │   ├── set_control_callback [UI] (33B) — Stores a callback function pointer at offset 0x34 of the control object.
│   │   ├── disable_civ_slot [UI] (133B) — Disables a civ slot in a multiplayer selection list by clearing its selection and invalidating the display.
│   │   │   └── 0000ABC7 [?]
│   │   ├── unknown (set selected item) [UI] (33B) — Sets the selected item index in a UI list object.
│   │   ├── pedia_setup_list_panel [UI] (1602B) — Sets up the Civilopedia list panel — populates tech lists for display, differentiating between known/unknown techs ba...
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   │   ├── 0000CF17 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   ├── control_init_fields [UI] (120B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   │   └── scrollbar_set_pos [UI] (39B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   │   └── scrollbar_set_range [UI] (54B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_draw_list_panel [UI] (1333B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── 00008BE1 [?]
│   │   │   │   ├── control_detach_window [UI] (88B)
│   │   │   │   └── control_init_fields [UI] (120B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── get_wonder_city [GL] (57B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   └── bit_index_to_byte_mask [GL] (45B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   │   └── unknown (get_scroll_range) [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   ├── civ_has_active_wonder [GL] (142B) — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2).
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   │   │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   ├── init_unit_listbox [UI] (899B) — Initializes a unit listbox control within a dialog.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── paint_unit_listbox [UI] (1841B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── display_improvement [UI] (33B)
│   │   │   │   ├── set_status_bar_text [UI] (33B)
│   │   │   │   ├── unknown (get panel icon width) [UI] (37B)
│   │   │   │   ├── unknown (get panel icon height) [UI] (37B)
│   │   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   ├── get_unit_home_city_name [GL] (89B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── populate_unit_listbox [UI] (1102B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── sort_listbox_by_type [UI] (639B)
│   │   │   │   ├── sort_listbox_by_name [UI] (722B)
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_active_control [UI] (21B)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── create_civ_listbox [UI] (1123B) — Creates a civ listbox (similar to unit listbox).
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── paint_civ_listbox [UI] (1230B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_end_italic [UI] (29B)
│   │   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── draw_best_city_sprite [UI] (484B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── get_active_control [UI] (21B)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_cleanup_side_controls [UI] (1486B) — Cleans up (destroys) all controls on one side (left=0, right=1) of the negotiation window.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── parleywin_paint_border_strip [UI] (226B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   └── tile_bitmap [UI] (391B)
│   │   │   ├── widget_button_dtor [UI] (57B)
│   │   │   ├── widget_listbox_dtor [UI] (57B)
│   │   │   ├── widget_checkbox_dtor [UI] (57B)
│   │   │   ├── widget_scrollbar_dtor [UI] (57B)
│   │   │   │   └── scrollbar_widget_dtor [UI] (112B)
│   │   │   ├── widget_dropdown_dtor [UI] (57B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── widget_focus_hwnd [UI] (50B) — Sets keyboard focus to the widget's window handle (at offset 0x1c).
│   │   │   └── unknown (set focus) [UI] (26B)
│   │   ├── widget_create_editbox [UI] (134B) — Creates an edit box widget: registers window class, creates the HWND, sets initial text.
│   │   │   ├── 00002740 [?]
│   │   │   ├── 00002D7F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   ├── parley_build_packet [GL] (990B) *** STATE MUTATION *** — Builds a diplomacy transaction packet.
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── parley_serialize_offer [GL] (1024B)
│   │   │   │   └── get_edit_text [UI] (43B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── parley_build_description [UI] (2892B) *** STATE MUTATION *** — Builds a human-readable description of a diplomacy transaction.
│   │   │   ├── parley_describe_techs [UI] (274B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_gold [UI] (119B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_units [UI] (546B) *** STATE MUTATION ***
│   │   │   │   ├── find_unit_by_alive_flag [GL] (329B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_cities [UI] (369B) *** STATE MUTATION ***
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   └── (5 FW helpers hidden)
│   │   │   ├── parley_describe_attitude [UI] (347B) *** STATE MUTATION ***
│   │   │   ├── parley_describe_maps [UI] (271B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (4 FW helpers hidden)
│   │   │   ├── parley_describe_treaty [UI] (417B) *** STATE MUTATION ***
│   │   │   └── (6 FW helpers hidden)
│   │   ├── parley_update_button_states [UI] (678B) — Updates the enabled/disabled states of all buttons in the diplomacy dialog based on the current negotiation state.
│   │   │   ├── control_invalidate [UI] (65B)
│   │   │   ├── pedia_clear_selection [UI] (47B)
│   │   │   ├── pedia_set_selection [UI] (47B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── listbox_create_window [UI] (167B) — Creates a listbox window control.
│   │   │   ├── 0000C035 [?]
│   │   │   ├── 0000C0F0 [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   └── control_init_fields [UI] (120B)
│   │   ├── listbox_mark_dirty [UI] (32B) — Marks a listbox as needing redraw by setting this+0x34 = 1.
│   │   ├── scrollbar_init [UI] (93B) — Initializes a scrollbar control object.
│   │   ├── scrollbar_create_window [UI] (207B) — Creates a scrollbar window control with specified range, position, and size.
│   │   │   ├── 00008E3F [?]
│   │   │   ├── control_detach_window [UI] (88B)
│   │   │   ├── control_init_fields [UI] (120B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── scrollbar_set_position [UI] (33B) — Sets scrollbar position: this+0x2c = param_1.
│   │   ├── scrollbar_set_range [UI] (33B) — Sets scrollbar range: this+0x30 = param_1.
│   │   ├── city_list_create_panel [UI] (849B) — Creates a city list panel with scrollbar and sort button.
│   │   │   ├── create_scrollbar [UI] (124B)
│   │   │   ├── scrollbar_set_position [UI] (52B)
│   │   │   ├── scrollbar_set_range [UI] (47B)
│   │   │   ├── scrollbar_set_callback [UI] (33B)
│   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│   │   │   ├── city_list_draw [UI] (1721B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── control_invalidate [UI] (65B)
│   │   │   │   ├── text_newline [UI] (29B)
│   │   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── has_building [GL] (122B)
│   │   │   │   ├── parley_update_button_states [UI] (678B)
│   │   │   │   ├── find_city_by_id [GL] (128B)
│   │   │   │   ├── city_list_draw_city_sprite [UI] (239B)
│   │   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_set_clip_rect [UI] (55B)
│   │   │   │   ├── port_fill_rect [UI] (236B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── city_list_populate [UI] (1138B)
│   │   │   │   ├── city_list_sort [UI] (847B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── set_scrollbar [UI] (64B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   │   ├── port_fill_rect [UI] (236B) — Fills a rectangle in the port with a given color index.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── port_lock [UI] (287B)
│   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   ├── get_surface_buffer_handle [UI] (28B)
│   │   │   ├── check_topdown [UI] (41B)
│   │   │   └── fill_rect_8bit [UI] (152B)
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   └── (12 FW helpers hidden)
│   └── set_active_control [UI] (38B) — Sets DAT_00637ea4 to param_1, returns old value.
└── get_active_control [UI] (21B) — Returns DAT_00637ea4 (the active control handle).
```

### `004DD285` parley_execute_transaction

> Executes a completed diplomacy transaction.

```
parley_execute_transaction [GL] (1381B) *** STATE MUTATION ***
├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   │   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   │   └── validate_window_rect [UI] (43B)
│   │   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│   │       ├── 0000CC11 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       ├── get_surface_hwnd [UI] (28B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── port_select_palette [UI] (87B)
│   │       │   └── write_full_colortable [UI] (39B)
│   │       └── surface_is_locked [UI] (44B)
│   ├── net_send_to_player [GL] (305B) *** STATE MUTATION *** — Sends a network message to a specific player.
│   ├── net_broadcast [GL] (124B) *** STATE MUTATION *** — Broadcasts a network message to all connected players.
│   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   │       └── net_msg_init_header [GL] (55B)
│   ├── net_msg_init_with_version [GL] (94B) — Initializes a network message header with version string at offset 0x10.
│   ├── unknown (init version message) [GL] (65B) — Creates a type-2 network message (version info) with session data appended.
│   │   ├── net_msg_init_with_name [GL] (141B) — Initializes a network message with type, player name, and game version strings.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init chat/popup message) [GL] (169B) — Creates a type-0x2F network message with additional fields for chat or popup.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── (1 FW helpers hidden)
│   ├── unknown (init type-4 message) [GL] (45B) — Creates a type-4 network message header with size 0x280.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-6 message) [GL] (45B) — Creates a type-6 network message header with size 0x21C.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── unknown (init type-0x13 message) [GL] (60B) — Creates a type-0x13 network message with session data.
│   │   ├── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   │   └── netmgr_fill_game_info [GL] (598B) — Fills a game info structure (0x124 bytes) with the current game settings for network advertisement.
│   ├── unknown (init type-0x69 message) [GL] (56B) — Creates a type-0x69 (combat sync) message.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION *** — Serializes 7 game state sections into a contiguous buffer with checksums.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION *** — Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION *** — Serializes all 24 game state sections with RLE compression.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   │   └── (1 FW helpers hidden)
│   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION *** — Serializes only game state sections whose checksums have changed since last serialization.
│   │   ├── diff_engine_checksum [GL] (270B) — Computes a simple additive checksum over a data buffer.
│   │   ├── diff_engine_calc_total_size [GL] (152B) — Calculates total serialized game state size across all 24 sections, with special handling for sections 5 (units) and ...
│   │   ├── diff_engine_append_data [GL] (98B) — Appends data to a serialization buffer, advancing the write cursor.
│   │   └── (2 FW helpers hidden)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   ├── set_rect_wh [UI] (48B) — Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   │   └── 0000858E [?]
│   │   ├── reset_sprite_scale [UI] (28B) — Resets sprite scale to 1:1 (1,1).
│   │   │   └── scale_table_build_primary [UI] (657B)
│   │   ├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
│   │   ├── widget_inflate_rect_neg [UI] (40B) — Inflates a rectangle by negative amounts (shrinks it).
│   │   │   └── widget_inflate_rect [UI] (34B)
│   │   ├── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│   │   │   └── blit_rect_to_rect [UI] (95B)
│   │   │       ├── set_rect_wh [UI] (48B)
│   │   │       └── port_blit_stretch [UI] (443B)
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   │   ├── 0000847F [?]
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   └── draw_string_palette [UI] (534B)
│   │   │       ├── 0000847F [?]
│   │   │       ├── 0000858E [?]
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       └── (2 FW helpers hidden)
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   ├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
│   │   ├── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
│   │   │   └── dispatch_oleitem_normal [UI] (673B)
│   │   │       ├── rect_get_width [UI] (27B)
│   │   │       ├── rect_get_height [UI] (28B)
│   │   │       ├── unknown (get panel icon width) [UI] (37B)
│   │   │       ├── unknown (get panel icon height) [UI] (37B)
│   │   │       ├── init_editor_scrollbar [UI] (34B)
│   │   │       ├── widget_get_height [UI] (34B)
│   │   │       ├── get_surface_buffer_handle [UI] (28B)
│   │   │       ├── unknown (get surface base) [UI] (28B)
│   │   │       ├── scale_coords [UI] (254B)
│   │   │       ├── check_topdown [UI] (41B)
│   │   │       └── pixel_copy [UI] (305B)
│   │   └── (3 FW helpers hidden)
│   ├── netmgr_build_packet [GL] (405B) — Builds a network packet by prepending a 0x2C-byte header to the payload data.
│   │   └── net_msg_init_header [GL] (55B) — Initializes a network message header with magic bytes, message type, and default size.
│   └── (3 FW helpers hidden)
├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── diff_engine_invert_mirror [GL] (131B) *** STATE MUTATION *** — Copies state into mirror then bitwise-inverts all mirror data.
│   │   └── diff_engine_copy_sections [GL] (143B) *** STATE MUTATION *** — Copies all 23 game state sections into the diff engine mirror buffer.
│   ├── rle_encode (unnamed) [GL] (588B) — RLE-encodes a data buffer.
│   └── (2 FW helpers hidden)
├── parley_execute_share_maps [GL] (1521B) *** STATE MUTATION *** — Executes map sharing between two civs.
│   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   ├── redraw_map_all_players [UI] (124B) — Redraws entire map for all active players.
│   │   └── redraw_entire_map [UI] (205B) *** STATE MUTATION *** — Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │       ├── minimap_full_redraw [UI] (416B)
│   │       │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │       │   ├── minimap_get_tile_color [UI] (425B)
│   │       │   ├── minimap_draw_goto_line [UI] (211B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   ├── surface_set_clear_color [UI] (34B)
│   │       │   ├── fill_rect_palette [UI] (50B)
│   │       │   ├── is_tile_valid [GL] (80B)
│   │       │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │       │   ├── dialog_create_buttons [UI] (675B)
│   │       │   ├── prepare_surface [UI] (24B)
│   │       │   └── wrap_x [GL] (94B)
│   │       ├── recalc_viewport_geometry [UI] (1410B)
│   │       │   ├── set_editor_font [UI] (93B)
│   │       │   ├── reset_sprite_scale [UI] (28B)
│   │       │   ├── scale_at_current_zoom [UI] (47B)
│   │       │   ├── set_current_zoom_scale [UI] (41B)
│   │       │   ├── wrap_x [GL] (94B)
│   │       │   ├── port_alloc_rect [UI] (58B)
│   │       │   ├── scale_table_build_primary [UI] (657B)
│   │       │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │       ├── redraw_full_viewport [UI] (278B)
│   │       │   ├── draw_complete_tile [UI] (495B)
│   │       │   ├── draw_city_labels [UI] (871B)
│   │       │   ├── unknown (clear_surface_region) [UI] (28B)
│   │       │   └── wrap_x [GL] (94B)
│   │       ├── begin_end_paint_cycle [UI] (100B)
│   │       │   ├── flush_display [UI] (21B)
│   │       │   ├── end_paint [UI] (32B)
│   │       │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │       ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │       ├── dialog_create_buttons [UI] (675B)
│   │       │   ├── rect_get_width [UI] (27B)
│   │       │   ├── rect_get_height [UI] (28B)
│   │       │   ├── save_and_flush [UI] (41B)
│   │       │   ├── set_rect_wh [UI] (48B)
│   │       │   ├── pedia_button_ctor [UI] (83B)
│   │       │   ├── pedia_button_create [UI] (139B)
│   │       │   ├── unknown (set button callback) [UI] (33B)
│   │       │   ├── dialog_destroy_buttons [UI] (162B)
│   │       │   └── (1 FW helpers hidden)
│   │       └── (1 FW helpers hidden)
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask).
│   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │       └── (1 FW helpers hidden)
│   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   └── queue_map_update [GL] (515B) *** STATE MUTATION *** — Queues a single map update operation into the batch buffer.
│   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│       └── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
├── parley_execute_give_tech_list [GL] (102B) *** STATE MUTATION *** — Gives a list of technologies from one civ to another.
│   └── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
│       ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│       │   └── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│       └── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
├── parley_execute_give_gold [GL] (174B) *** STATE MUTATION *** — Transfers gold between two civs.
│   ├── adjust_attitude [GL] (107B) *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta.
│   │   ├── get_attitude_raw [GL] (47B) — Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   └── set_attitude_value [GL] (120B) *** STATE MUTATION *** — Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100.
│   └── calc_gold_to_attitude [GL] (104B) — Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
├── parley_execute_give_techs [GL] (151B) *** STATE MUTATION *** — Gives technologies from param_2 to param_1.
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│       ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│       ├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
│       ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│       ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │   └── popup_show_modal [UI] (999B)
│       │       ├── flush_display [UI] (21B)
│       │       ├── process_messages [UI] (21B)
│       │       ├── get_view_window_handle [UI] (28B)
│       │       ├── get_edit_text [UI] (43B)
│       │       ├── init_palette_system [UI] (21B)
│       │       ├── unknown — manage window [UI] (37B)
│       │       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│       │       ├── popup_paint [UI] (1964B)
│       │       ├── unknown (popup_get_item_text) [UI] (47B)
│       │       ├── unknown (popup_get_edit_text) [UI] (43B)
│       │       ├── modal_dialog_run [UI] (283B)
│       │       └── (2 FW helpers hidden)
│       ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│       ├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
│       ├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
│       ├── unknown (dialog show single param) [UI] (33B) — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       │   └── show_help_topic [UI] (34B)
│       │       └── show_help_topic_ext [UI] (38B)
│       ├── set_improvement_name_string [UI] (41B) — Sets a dialog string control to an improvement/building name.
│       │   ├── mp_set_string_control [UI] (46B) *** STATE MUTATION ***
│       │   └── (1 FW helpers hidden)
│       ├── dialog_set_title [UI] (41B) — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│       │   └── dialog_set_title_impl [UI] (42B)
│       ├── has_building [GL] (122B) — Checks if a city has a specific building.
│       │   └── bit_index_to_byte_mask [GL] (45B)
│       ├── set_building [GL] (186B) *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│       │   └── bit_index_to_byte_mask [GL] (45B)
│       ├── get_wonder_owner [GL] (73B) — Returns the civ that owns a wonder, or -1 if no one does.
│       │   └── get_wonder_city [GL] (57B)
│       │       └── is_wonder_obsolete [GL] (120B)
│       ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION *** — Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flow.
│       │   ├── is_tile_valid [GL] (80B)
│       │   ├── select_list_item [UI] (38B)
│       │   ├── show_message [UI] (46B)
│       │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│       │   │   └── scroll_map_if_needed [UI] (404B)
│       │   ├── set_improvement_name_string [UI] (41B)
│       │   ├── open_intelligence_dialog [UI] (535B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── show_window_wrapper [UI] (33B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── set_active_surface [UI] (74B)
│       │   │   ├── modal_dialog_run [UI] (283B)
│       │   │   └── (3 FW helpers hidden)
│       │   ├── dialog_set_title [UI] (41B)
│       │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│       │   │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│       │   │   ├── calc_attitude [GL] (178B)
│       │   │   ├── should_declare_war [GL] (191B)
│       │   │   ├── has_spaceship_launched [GL] (47B)
│       │   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│       │   │   ├── spaceship_ai_should_start [AI] (583B)
│       │   │   ├── find_nearest_unit [GL] (233B) *** STATE MUTATION ***
│       │   │   ├── get_unit_owner_at [GL] (66B)
│       │   │   └── (1 FW helpers hidden)
│       │   ├── diplo_show_attitude_header [UI] (118B)
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_string [UI] (33B)
│       │   │   ├── text_newline [UI] (29B)
│       │   │   ├── display_improvement [UI] (33B)
│       │   │   ├── show_message [UI] (46B)
│       │   │   ├── get_civ_name [UI] (28B)
│       │   │   └── calc_attitude [GL] (178B)
│       │   ├── diplo_show_greeting [MIXED] (804B) *** STATE MUTATION ***
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_string [UI] (33B)
│       │   │   ├── select_list_item [UI] (38B)
│       │   │   ├── text_add_number [UI] (33B)
│       │   │   ├── show_message [UI] (46B)
│       │   │   ├── open_list_dialog [UI] (47B)
│       │   │   ├── unknown (dialog show single param) [UI] (33B)
│       │   │   ├── set_improvement_name_string [UI] (41B)
│       │   │   ├── dialog_set_title [UI] (41B)
│       │   │   ├── diplo_show_attitude_header [UI] (118B)
│       │   │   ├── get_civ_noun_name [GL] (145B)
│       │   │   ├── get_civ_leader_title [GL] (210B)
│       │   │   ├── get_civ_people_name [GL] (145B)
│       │   │   ├── intel_open_advisor [UI] (546B)
│       │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│       │   │   ├── unknown (set popup position) [UI] (32B)
│       │   │   ├── popup_dialog_create [UI] (93B)
│       │   │   ├── popup_set_position_fields [UI] (42B)
│       │   │   ├── get_screen_rect [UI] (48B)
│       │   │   └── (1 FW helpers hidden)
│       │   ├── update_tile_all_players [UI] (124B)
│       │   │   └── update_map_tile [UI] (50B)
│       │   ├── get_civ_noun_name [GL] (145B)
│       │   ├── get_civ_leader_title [GL] (210B)
│       │   ├── get_civ_people_name [GL] (145B)
│       │   ├── intel_play_animation [UI] (181B)
│       │   │   └── intel_play_video_frame [UI] (248B)
│       │   ├── popup_dialog_create [UI] (93B)
│       │   │   ├── unknown (popup list init) [UI] (64B)
│       │   │   ├── popup_dialog_reset [UI] (1299B)
│       │   │   └── (1 FW helpers hidden)
│       │   ├── popup_add_radio_option [UI] (566B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_get_button_width [UI] (32B)
│       │   │   └── (2 FW helpers hidden)
│       │   └── (1 FW helpers hidden)
│       ├── diplo_reset_state [GL] (61B) *** STATE MUTATION *** — Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│       │   └── intel_close_advisor [UI] (166B)
│       │       ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│       │       ├── wait_for_animation [UI] (109B)
│       │       ├── resume_music [UI] (85B)
│       │       ├── intel_teardown_display [UI] (158B)
│       │       └── intel_delete_object [UI] (57B)
│       ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│       ├── get_civ_people_name [GL] (145B) — Returns the people name for a civilization (e.g., "Roman").
│       ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│       ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│       ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION *** — When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│       │   ├── set_improvement_name_string [UI] (41B)
│       │   ├── show_game_popup_3arg [UI] (43B)
│       │   │   └── show_terrain_help [UI] (58B)
│       │   ├── civ_has_active_wonder [GL] (142B)
│       │   │   └── get_wonder_city [GL] (57B)
│       │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │   ├── update_tile_all_players [UI] (124B)
│       │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│       │   ├── civ_has_tech [GL] (181B)
│       │   └── enqueue_mp_event [MIXED] (398B)
│       │       ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│       │       └── (1 FW helpers hidden)
│       ├── handle_tech_government_effects [GL] (973B) *** STATE MUTATION *** — Handles side effects when a civ discovers a tech that unlocks a new government form.
│       │   ├── show_message [UI] (46B)
│       │   ├── show_dialog_message [UI] (43B)
│       │   │   └── 0051D564 [?] (178B)
│       │   ├── set_improvement_name_string [UI] (41B)
│       │   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│       │   │   └── 0051D564 [?] (178B)
│       │   ├── get_civ_people_name [GL] (145B)
│       │   └── set_government_type [GL] (529B) *** STATE MUTATION ***
│       │       ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│       │       └── calc_city_production (entry point) [GL] (132B) *** STATE MUTATION ***
│       ├── we_love_the_king_day [GL] (379B) — Triggers "We Love the King Day" celebration for a civilization.
│       │   ├── show_message [UI] (46B)
│       │   ├── get_civ_name [UI] (28B)
│       │   │   └── get_civ_adjective_name [GL] (145B)
│       │   ├── has_building [GL] (122B)
│       │   ├── unknown (show tech help) [UI] (43B)
│       │   │   └── show_tech_help [UI] (92B)
│       │   └── enqueue_mp_event [MIXED] (398B)
│       ├── format_enabled_item [UI] (138B) — Formats an enabled item (unit/improvement/wonder) for display in the tech discovery dialog.
│       │   ├── text_begin [UI] (29B)
│       │   ├── text_add_string [UI] (33B)
│       │   ├── text_begin_italic [UI] (29B)
│       │   ├── display_improvement [UI] (33B)
│       │   └── popup_add_edit_field [UI] (412B)
│       ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION *** — Master handler for when a civilization discovers a new technology.
│       ├── unknown (show tech help) [UI] (43B) — Shows tech help text via the help display system.
│       ├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│       ├── pedia_select_entry [UI] (342B) — Selects and displays a Civilopedia entry.
│       │   ├── end_paint [UI] (32B)
│       │   │   └── invalidate_region [UI] (180B)
│       │   ├── show_window_wrapper [UI] (33B)
│       │   │   └── show_window_inner [UI] (38B)
│       │   ├── unknown (lock pedia surface) [UI] (38B)
│       │   │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   └── surface_list_find_dirty [UI] (174B)
│       │   ├── pedia_init_tabs [UI] (1391B)
│       │   │   ├── control_invalidate [UI] (65B)
│       │   │   ├── set_edit_text [UI] (43B)
│       │   │   ├── pedia_button_ctor [UI] (83B)
│       │   │   ├── pedia_button_create [UI] (139B)
│       │   │   ├── unknown (set button callback) [UI] (33B)
│       │   │   ├── unknown (clear hypertext links) [UI] (21B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── pedia_clear_item_list [UI] (118B)
│       │   │   └── init_palette_system [UI] (21B)
│       │   ├── pedia_draw_frame [UI] (800B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│       │   │   ├── draw_3d_border [UI] (167B)
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   ├── port_set_rect [UI] (91B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   ├── scale_table_build_primary [UI] (657B)
│       │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   ├── pedia_open_category [UI] (200B)
│       │   │   ├── show_window_wrapper [UI] (33B)
│       │   │   ├── set_dialog_enabled [UI] (36B)
│       │   │   ├── unknown (lock pedia surface) [UI] (38B)
│       │   │   ├── pedia_init_tabs [UI] (1391B)
│       │   │   ├── pedia_set_title [UI] (229B)
│       │   │   ├── pedia_push_history [UI] (523B)
│       │   │   └── set_active_surface [UI] (74B)
│       │   ├── pedia_get_entry_name [UI] (89B)
│       │   ├── pedia_draw_tech_detail [UI] (5911B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   ├── text_begin [UI] (29B)
│       │   │   ├── text_add_label_id [UI] (33B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── text_begin_bold [UI] (29B)
│       │   │   ├── display_improvement [UI] (33B)
│       │   │   ├── unknown (string pool append separator) [UI] (29B)
│       │   │   ├── unknown (get panel icon width) [UI] (37B)
│       │   │   ├── unknown (get panel icon height) [UI] (37B)
│       │   │   ├── pedia_init_tabs [UI] (1391B)
│       │   │   ├── pedia_show_description [UI] (593B)
│       │   │   ├── pedia_add_hyperlink [UI] (1361B)
│       │   │   ├── pedia_clear_selection [UI] (47B)
│       │   │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   ├── widget_get_height [UI] (34B)
│       │   │   ├── unknown (pedia_draw_background_panel) [UI] (226B)
│       │   │   ├── port_set_rect [UI] (91B)
│       │   │   ├── port_set_clip_rect [UI] (55B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   └── (7 FW helpers hidden)
│       │   ├── modal_dialog_run [UI] (283B)
│       │   │   ├── process_messages [UI] (21B)
│       │   │   ├── get_view_window_handle [UI] (28B)
│       │   │   ├── disable_parent_window [UI] (121B)
│       │   │   └── enable_parent_window [UI] (126B)
│       │   └── (1 FW helpers hidden)
│       ├── draw_status_panel_header [UI] (1182B) — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│       │   ├── rect_get_width [UI] (27B)
│       │   ├── rect_get_height [UI] (28B)
│       │   ├── flush_display [UI] (21B)
│       │   ├── invalidate_region [UI] (180B)
│       │   ├── text_begin [UI] (29B)
│       │   ├── text_add_label_id [UI] (33B)
│       │   ├── get_font_height [UI] (28B)
│       │   ├── measure_text_height [UI] (42B)
│       │   ├── text_add_number [UI] (33B)
│       │   ├── unknown (string pool set) [UI] (33B)
│       │   │   └── advance_year_display [UI] (479B)
│       │   ├── draw_text_at [UI] (42B)
│       │   │   └── draw_text_with_shadow [UI] (205B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   │   └── scale_table_build_primary [UI] (657B)
│       │   ├── reset_sprite_scale [UI] (28B)
│       │   ├── prepare_surface [UI] (24B)
│       │   ├── draw_hline [UI] (69B)
│       │   │   ├── set_rect_abs [UI] (42B)
│       │   │   └── fill_surface_from_rect [UI] (71B)
│       │   ├── tile_bitmap [UI] (391B)
│       │   ├── set_text_draw_target [UI] (24B)
│       │   ├── set_text_draw_source [UI] (24B)
│       │   ├── set_text_style [UI] (68B)
│       │   ├── port_set_rect_from_self [UI] (63B)
│       │   ├── port_set_rect [UI] (91B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   └── (4 FW helpers hidden)
│       ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│       │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│       ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│       ├── popup_dialog_close [UI] (47B) — Closes a popup dialog by destroying it and clearing its list control.
│       │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│       │   │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   ├── widget_scrollbar_dtor [UI] (57B)
│       │   │   ├── widget_dropdown_dtor [UI] (57B)
│       │   │   └── (4 FW helpers hidden)
│       │   └── (1 FW helpers hidden)
│       ├── popup_add_edit_field [UI] (412B) — Adds a text edit field to a popup dialog.
│       ├── popup_set_scaled_width [UI] (99B) — Sets the popup dialog width (this+0x11C) with optional resolution scaling.
│       ├── popup_add_button [UI] (360B) — Adds a button to the popup dialog.
│       │   ├── measure_text_height [UI] (42B)
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   └── (2 FW helpers hidden)
│       ├── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│       └── (1 FW helpers hidden)
├── parley_execute_give_units [GL] (153B) *** STATE MUTATION *** — Transfers units from their current owner to param_1.
│   ├── parley_transfer_city [GL] (2217B) *** STATE MUTATION *** — Transfers a city from one civ to another.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION *** — Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_nearest_city [GL] (400B) — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── has_building [GL] (122B)
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── distance_x_wrapped [GL] (111B)
│   │   │   │   └── diagonal_movement_cost [GL] (135B)
│   │   │   └── get_tile_continent_if_land [GL] (72B)
│   │   │       ├── is_tile_ocean [GL] (57B)
│   │   │       └── get_tile_continent [GL] (39B)
│   │   ├── set_building [GL] (186B) *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   │   ├── get_wonder_city [GL] (57B) — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   ├── update_radius1_all_players [UI] (124B) — Updates radius-1 area around a tile for all active players.
│   │   │   └── update_map_radius1 [UI] (50B)
│   │   │       └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── upgrade_units_for_tech [GL] (970B) *** STATE MUTATION *** — When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type.
│   │   ├── can_build_unit_type [GL] (1095B) — Checks if a civilization can build a specific unit type.
│   │   │   └── civ_has_tech [GL] (181B)
│   │   ├── can_build_improvement [GL] (1383B) — Comprehensive check for whether a civ can build a specific city improvement or wonder.
│   │   │   ├── has_building [GL] (122B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   └── can_build_wonder [GL] (199B)
│   │   │       └── civ_has_tech [GL] (181B)
│   │   ├── event_check_city_taken [GL] (243B) *** STATE MUTATION *** — Checks all events for CITYTAKEN triggers.
│   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │       ├── event_action_play_sound [UI] (294B)
│   │   │       ├── event_action_flag_no_schism [GL] (39B) *** STATE MUTATION ***
│   │   │       ├── event_action_play_cd [UI] (235B)
│   │   │       ├── event_action_change_money [GL] (364B) *** STATE MUTATION ***
│   │   │       ├── event_action_show_text [UI] (246B) *** STATE MUTATION ***
│   │   │       ├── event_action_make_aggression [GL] (348B) *** STATE MUTATION ***
│   │   │       ├── event_action_destroy_civ [GL] (249B) *** STATE MUTATION ***
│   │   │       ├── event_action_give_tech [GL] (217B) *** STATE MUTATION ***
│   │   │       ├── event_action_create_unit [GL] (941B) *** STATE MUTATION ***
│   │   │       ├── event_action_move_unit [GL] (787B) *** STATE MUTATION ***
│   │   │       └── event_action_change_terrain [GL] (1114B) *** STATE MUTATION ***
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask).
│   │   ├── delete_unit_safely [GL] (677B) *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units.
│   │   │   ├── 0000C494 [?]
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   │   ├── 0000C494 [?]
│   │   │   │   ├── 0000C679 [?]
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── delete_unit [GL] (1129B) *** STATE MUTATION ***
│   │   │   ├── load_unit_onto_ship [GL] (1912B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │   │   ├── eject_air_units [GL] (343B) *** STATE MUTATION ***
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   ├── get_tile_continent [GL] (39B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_terrain_raw [GL] (41B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   ├── set_tile_owner [GL] (333B) *** STATE MUTATION *** — Sets the tile owner (upper nibble of byte 5).
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   ├── set_tile_city_radius_owner [GL] (312B) *** STATE MUTATION *** — Sets the city-radius owner for a tile (top 3 bits of byte 2).
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── queue_map_update [GL] (515B) *** STATE MUTATION ***
│   │   └── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   └── find_city_by_id [GL] (128B) — Finds a city by its alive flag value (param_1).
├── parley_execute_transfer_units [GL] (887B) *** STATE MUTATION *** — Transfers ownership of specific units from one civ to another.
│   ├── process_unit_move_visibility [GL] (4250B) *** STATE MUTATION *** — Major game logic function that processes visibility updates after a unit moves.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── cancel_goto_if_blocked [GL] (90B) *** STATE MUTATION *** — Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air).
│   │   ├── cancel_goto_for_stack [GL] (192B) *** STATE MUTATION *** — Cancels goto orders for all units in a stack at a given location.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   │   └── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   └── is_tile_ocean [GL] (57B)
│   │   ├── city_set_specialist_slot [GL] (126B) *** STATE MUTATION *** — Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_city_at [GL] (245B) — Finds a city at the given (x,y) coordinates.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_city_owner_at [GL] (111B)
│   │   │       ├── is_tile_valid [GL] (80B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── update_map_area_all_players [UI] (136B) — Updates a map area for all active players (all viewports in MP).
│   │   │   └── update_map_area [UI] (313B) *** STATE MUTATION ***
│   │   │       ├── tile_to_screen [UI] (151B)
│   │   │       ├── is_tile_visible [UI] (99B)
│   │   │       ├── redraw_tile_area [UI] (352B)
│   │   │       ├── invalidate_tile_area [UI] (60B)
│   │   │       ├── reset_sprite_scale [UI] (28B)
│   │   │       ├── set_current_zoom_scale [UI] (41B)
│   │   │       └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   ├── update_tile_all_players [UI] (124B) — Updates a single tile for all active players.
│   │   ├── update_radius1_all_players [UI] (124B) — Updates radius-1 area around a tile for all active players.
│   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION *** — Adds a goal to AI goal list A.
│   │   │   ├── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   │   └── ai_shift_goals_down_a [AI] (184B) *** STATE MUTATION ***
│   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │   │   └── calc_unit_movement_points [GL] (516B)
│   │   │   ├── is_unit_active [GL] (176B)
│   │   │   │   └── get_unit_moves_remaining [GL] (69B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION *** — Master diplomatic contact processing function.
│   │   │   ├── show_message [UI] (46B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── mp_show_wait_dialog [UI] (45B)
│   │   │   │   └── 0051D564 [?] (178B)
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── diplo_demand_ally_help [MIXED] (919B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   ├── break_alliance [MIXED] (632B) *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (29B)
│   │   │   │   ├── text_add_string [UI] (33B)
│   │   │   │   ├── text_add_number [UI] (33B)
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── show_help_topic [UI] (34B)
│   │   │   │   ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   ├── set_improvement_name_string [UI] (41B)
│   │   │   │   ├── open_intelligence_dialog [UI] (535B)
│   │   │   │   ├── show_game_popup_3arg [UI] (43B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │   │   ├── calc_patience_threshold [GL] (211B)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] (6616B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_show_attitude_header [UI] (118B)
│   │   │   │   ├── diplo_ai_emissary [MIXED] (880B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_reset_state [GL] (61B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_form_alliance [GL] (374B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_sign_ceasefire [GL] (315B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_declare_war [GL] (1125B) *** STATE MUTATION ***
│   │   │   │   ├── calc_gold_to_attitude [GL] (104B)
│   │   │   │   ├── diplo_ai_negotiate [MIXED] (10271B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_favor_menu [MIXED] (4878B) *** STATE MUTATION ***
│   │   │   │   ├── diplo_check_war_weariness [UI] (178B)
│   │   │   │   ├── diplo_show_main_menu [UI] (747B)
│   │   │   │   ├── unknown (set trade route value) [GL] (29B) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── get_attitude_raw [GL] (47B)
│   │   │   │   ├── set_attitude_value [GL] (120B) *** STATE MUTATION ***
│   │   │   │   ├── calc_attitude [GL] (178B)
│   │   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   │   ├── intel_play_animation [UI] (181B)
│   │   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   ├── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   ├── calc_war_readiness [GL] (820B) *** STATE MUTATION ***
│   │   │   │   ├── check_can_declare_war [GL] (365B)
│   │   │   │   ├── refresh_status_panel [UI] (297B)
│   │   │   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   ├── should_declare_war [GL] (191B)
│   │   │   │   └── get_attitude_raw [GL] (47B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── get_civ_noun_name [GL] (145B)
│   │   │   ├── get_civ_people_name [GL] (145B)
│   │   │   ├── has_spaceship_launched [GL] (47B)
│   │   │   ├── parleywin_start_session [MIXED] (807B) *** STATE MUTATION ***
│   │   │   │   ├── show_window_wrapper [UI] (33B)
│   │   │   │   ├── unknown (dialog show single param) [UI] (33B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │   │   │   ├── chatwin_get_text_length [UI] (37B)
│   │   │   │   ├── parleywin_build_title [UI] (324B)
│   │   │   │   ├── parley_set_negotiation_state [UI] (536B) *** STATE MUTATION ***
│   │   │   │   ├── widget_set_cursor_pos [UI] (43B)
│   │   │   │   ├── widget_get_text_length [UI] (37B)
│   │   │   │   ├── set_active_surface [UI] (74B)
│   │   │   │   ├── get_active_control [UI] (21B)
│   │   │   │   └── set_active_control [UI] (38B)
│   │   │   ├── event_check_negotiation [GL] (900B) *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│   │   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │   ├── ai_should_declare_war [AI] (1549B)
│   │   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   │   └── should_declare_war [GL] (191B)
│   │   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   │   ├── ai_calc_tech_value [AI] (2869B)
│   │   │   │   └── handle_tech_discovery [GL] (3391B) *** STATE MUTATION ***
│   │   │   ├── check_join_war [GL] (595B) *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (46B)
│   │   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   │   ├── set_treaty_flags [GL] (223B) *** STATE MUTATION ***
│   │   │   │   └── get_civ_people_name [GL] (145B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   │   ├── validate_unit_stack [GL] (1050B) *** STATE MUTATION ***
│   │   │   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION ***
│   │   │   │   ├── put_down_unit [GL] (640B) *** STATE MUTATION ***
│   │   │   │   ├── sum_stack_property [GL] (724B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── set_stack_seen_by [GL] (92B) *** STATE MUTATION *** — Sets visibility for all units in a stack to be seen by a specific civ.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   └── set_unit_seen_by [GL] (96B) *** STATE MUTATION ***
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   ├── get_tile_explored [GL] (71B) — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   ├── get_tile_controller [GL] (72B) — Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │   ├── get_city_owner_at [GL] (111B)
│   │   │   └── get_unit_owner_at [GL] (66B)
│   │   ├── set_tile_visibility_bits [GL] (330B) *** STATE MUTATION *** — Sets or clears visibility bits (byte 4) on a tile.
│   │   ├── set_civ_tile_data [GL] (325B) *** STATE MUTATION *** — Sets a civ's tile visibility byte.
│   │   ├── begin_map_batch [GL] (86B) *** STATE MUTATION *** — Begins a batched map update session for multiplayer.
│   │   └── end_map_batch [GL] (194B) *** STATE MUTATION *** — Ends a batched map update.
│   ├── find_nearest_city [GL] (400B) — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status.
│   ├── find_unit_placement_tile [GL] (589B) — Finds a valid tile to place a transferred unit.
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   ├── get_city_owner_at [GL] (111B) — Returns the city-owning civ at a tile, or -1.
│   │   └── get_unit_owner_at [GL] (66B) — Returns the civ with units at a tile, or -1.
│   ├── find_unit_by_alive_flag [GL] (329B) — Finds a unit by its alive flag value (param_1).
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   └── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   ├── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
│   ├── relocate_unit [GL] (388B) *** STATE MUTATION *** — Moves a unit from its current position to a new position by picking it up and putting it down.
│   │   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION *** — The main network polling function.
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   ├── pick_up_unit_005b319e [GL] (705B) *** STATE MUTATION *** — Removes a unit from its map tile stack.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── (2 FW helpers hidden)
│   │   ├── put_down_unit [GL] (640B) *** STATE MUTATION *** — Places a unit on the map at a given position.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── show_dialog_message [UI] (43B)
│   │   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │   ├── find_first_unit_at [GL] (186B)
│   │   │   │   └── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── get_tile_ptr [GL] (90B)
│   │   │   └── (2 FW helpers hidden)
│   │   └── (2 FW helpers hidden)
│   ├── set_unit_seen_by [GL] (96B) *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask).
│   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   └── delete_unit_safely [GL] (677B) *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units.
├── parley_execute_treaty [GL] (289B) *** STATE MUTATION *** — Executes a treaty agreement between two civs.
│   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations.
│   └── set_treaty_flags [GL] (223B) *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations.
├── refresh_status_panel [UI] (297B) — Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── calc_status_panel_layout [UI] (484B) *** STATE MUTATION *** — Calculates the status panel layout based on screen dimensions.
│   ├── draw_status_panel_units [UI] (3672B) *** STATE MUTATION *** — Draws the complete status panel unit section.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── is_tile_valid [GL] (80B) — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   ├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   │   ├── get_civ_name [UI] (28B) — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   ├── set_status_bar_text [UI] (33B) — Sets the status bar text to param_1 using the global string buffer.
│   │   ├── draw_text_centered [UI] (46B) — Draws text centered within a rect at (param_2, param_3) with width param_4.
│   │   │   └── draw_text_centered [UI] (139B)
│   │   │       ├── measure_text_height [UI] (42B)
│   │   │       └── draw_text_with_shadow [UI] (205B)
│   │   ├── scale_sprite [UI] (35B) — Scales a base sprite dimension by zoom factor: result = (param_1 * (param_2 + 8)) / 8, with rounding.
│   │   ├── draw_status_turn_info [UI] (474B) — Draws the turn number and year info section of the status panel.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── get_font_height [UI] (28B)
│   │   │   ├── measure_text_height [UI] (42B)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   ├── set_text_draw_target [UI] (24B)
│   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   ├── set_text_style [UI] (68B)
│   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   └── port_set_rect [UI] (91B)
│   │   ├── draw_coordinate_text [UI] (132B) — Draws coordinate text (x,y and continent ID) at a given position.
│   │   │   ├── text_begin [UI] (29B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_bold [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   ├── draw_text_at [UI] (42B)
│   │   │   └── get_tile_continent [GL] (39B)
│   │   ├── format_unit_orders_text [UI] (450B) — Formats the unit orders text for the status panel display.
│   │   │   ├── text_add_string [UI] (33B)
│   │   │   ├── text_add_label_id [UI] (33B)
│   │   │   ├── text_newline [UI] (29B)
│   │   │   ├── text_begin_italic [UI] (29B)
│   │   │   ├── text_end_italic [UI] (29B)
│   │   │   ├── display_improvement [UI] (33B)
│   │   │   ├── text_add_number [UI] (33B)
│   │   │   ├── unknown (string pool append separator) [UI] (29B)
│   │   │   ├── find_city_at [GL] (245B)
│   │   │   └── get_tile_improvements [GL] (39B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── draw_status_panel_header [UI] (1182B) — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   ├── select_display_unit [UI] (396B) — Selects which unit to display from a tile's unit stack.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │   ├── get_first_unit_in_stack [GL] (118B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   └── get_fortress_owner_at [GL] (77B)
│   │   │       ├── get_tile_owner [GL] (100B)
│   │   │       └── get_tile_improvements [GL] (39B)
│   │   ├── draw_unit [UI] (2803B) — Draws a complete unit sprite at the given coordinates.
│   │   │   ├── rect_get_width [UI] (27B)
│   │   │   ├── rect_get_height [UI] (28B)
│   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   ├── get_civ_background_color [UI] (92B)
│   │   │   ├── scale_sprite [UI] (35B)
│   │   │   ├── set_sprite_scale [UI] (33B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   ├── set_unit_font_for_zoom [UI] (99B) *** STATE MUTATION ***
│   │   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   ├── select_display_unit [UI] (396B)
│   │   │   ├── get_civ_dark_color [UI] (92B)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │   ├── get_tile_improvements [GL] (39B)
│   │   │   ├── port_copy_rect [UI] (282B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── port_lock [UI] (287B)
│   │   │   │   ├── port_unlock [UI] (83B)
│   │   │   │   ├── port_get_pixel_ptr [UI] (45B)
│   │   │   │   ├── surface_is_locked [UI] (44B)
│   │   │   │   └── pixel_ptr_next_row [UI] (33B)
│   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   ├── unknown (sprite blit wrapper 10) [UI] (57B)
│   │   │   │   └── dispatch_oleitem_dimmed [UI] (677B)
│   │   │   └── (1 FW helpers hidden)
│   │   ├── calc_unit_movement_points [GL] (516B) — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │   ├── civ_has_tech [GL] (181B)
│   │   │   ├── get_unit_max_hp [GL] (45B)
│   │   │   └── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │       └── get_unit_max_hp [GL] (45B)
│   │   ├── get_next_unit_in_stack [GL] (65B) — Returns the next unit in the stack linked list, or -1 if at end.
│   │   ├── get_first_unit_in_stack [GL] (118B) — Follows prev pointers to find the first unit in the stack.
│   │   ├── find_unit_stack_at_xy [GL] (231B) — Finds the first unit of any civ at map position (param_1, param_2).
│   │   ├── sum_stack_property [GL] (724B) — Sums a property across all units in a stack.
│   │   ├── get_unit_home_city_name [GL] (89B) — Returns the name string of a unit's home city, or a "NONE" string if homeless.
│   │   ├── get_tile_ptr [GL] (90B) — Returns pointer to 6-byte tile data for map position (param_1, param_2).
│   │   ├── get_civ_vis_ptr [GL] (48B) — Returns pointer to a civ's visibility byte for a tile.
│   │   ├── get_tile_terrain_raw [GL] (41B) — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   ├── is_tile_ocean [GL] (57B) — Returns true if terrain type == 10 (ocean).
│   │   ├── check_tile_resource [GL] (281B) — Checks if a tile has a special resource.
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   └── get_tile_ptr [GL] (90B)
│   │   ├── check_tile_goody_hut [GL] (229B) — Checks if a tile has a goody hut (village).
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   └── get_tile_owner [GL] (100B)
│   │   │       ├── is_tile_valid [GL] (80B)
│   │   │       └── get_tile_ptr [GL] (90B)
│   │   ├── get_tile_improvements [GL] (39B) — Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   ├── set_text_draw_source [UI] (24B) — Sets the source font surface for text drawing.
│   │   ├── set_text_style [UI] (68B) — Configures text rendering style: foreground color, shadow color, and optional shadow offsets.
│   │   ├── port_set_rect_from_self [UI] (63B) — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   └── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   ├── prepare_surface [UI] (24B) — Sets the global drawing surface to param_1.
│   └── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
└── unknown (debug_log_fmt1) [FW] (62B) — Debug log with 1-arg sprintf formatting.
```

## Find City & Civpedia

### `0040E017` show_find_city_dialog

> Displays the "Find City" dialog that lists all known cities.

```
show_find_city_dialog [UI] (886B)
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   └── popup_show_modal [UI] (999B) — Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│       ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│       ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│       │   └── 0000BA4F [?]
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│       │   └── 00002D4D [?]
│       ├── init_palette_system [UI] (21B) — Initializes the palette system.
│       ├── unknown — manage window [UI] (37B) — Calls manage_window_C692 with the window handle from the object's field at offset 8.
│       │   └── 0000C692 [?]
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   └── focus_and_raise_window [UI] (57B)
│       │   ├── widget_scrollbar_dtor [UI] (57B)
│       │   │   └── scrollbar_widget_dtor [UI] (112B)
│       │   ├── widget_dropdown_dtor [UI] (57B)
│       │   └── (4 FW helpers hidden)
│       ├── popup_paint [UI] (1964B) — Master paint function for the popup system.
│       │   ├── end_paint [UI] (32B)
│       │   │   └── invalidate_region [UI] (180B)
│       │   ├── show_window_wrapper [UI] (33B)
│       │   │   └── show_window_inner [UI] (38B)
│       │   ├── set_rect_abs [UI] (42B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── control_invalidate [UI] (65B)
│       │   │   ├── 00008B00 [?]
│       │   │   └── 00008B2D [?]
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   │   └── scale_table_build_primary [UI] (657B)
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   ├── widget_get_height [UI] (34B)
│       │   │   └── rect_get_height [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── popup_get_padded_height [UI] (42B)
│       │   ├── popup_render_label [UI] (226B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   └── port_fill_rect_pattern [UI] (201B)
│       │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_render_text_at_offset [UI] (61B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── popup_layout_dialog [UI] (4785B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_calc_max_text_height [UI] (132B)
│       │   │   ├── popup_get_line_height [UI] (78B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_calc_button_area_height [UI] (46B)
│       │   │   ├── popup_calc_text_width [UI] (51B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── popup_render_label [UI] (226B)
│       │   │   ├── popup_has_negative_line_count [UI] (83B)
│       │   │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_get_radio_page_number [UI] (56B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   ├── blit_rect_to_rect [UI] (95B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   └── unknown (set/get draw color) [UI] (38B)
│       │   ├── popup_redraw_visible_items [UI] (660B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── draw_border_rect [UI] (61B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_draw_item [UI] (706B)
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   └── port_set_rect [UI] (91B)
│       │   ├── popup_create_window [UI] (693B)
│       │   │   ├── set_callback_0x44 [UI] (45B)
│       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│       │   │   ├── unknown (set_font_size) [UI] (43B)
│       │   │   ├── create_offscreen_surface [UI] (115B)
│       │   │   └── create_offscreen_surface_b [UI] (119B)
│       │   ├── popup_init_controls [UI] (6616B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── create_checkbox [UI] (167B)
│       │   │   ├── set_checkbox_value [UI] (33B)
│       │   │   ├── create_scrollbar [UI] (124B)
│       │   │   ├── scrollbar_set_position [UI] (52B)
│       │   │   ├── scrollbar_set_range [UI] (47B)
│       │   │   ├── scrollbar_set_callback [UI] (33B)
│       │   │   ├── set_edit_max_chars [UI] (43B)
│       │   │   ├── create_listbox_control [UI] (121B)
│       │   │   ├── add_listbox_item [UI] (49B)
│       │   │   ├── disable_civ_slot [UI] (133B)
│       │   │   ├── unknown (set selected item) [UI] (33B)
│       │   │   ├── pedia_button_create [UI] (139B)
│       │   │   ├── unknown (set button callback) [UI] (33B)
│       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── widget_get_height [UI] (34B)
│       │   │   ├── scrollbar_init [UI] (93B)
│       │   │   ├── scrollbar_create_window [UI] (207B)
│       │   │   ├── scrollbar_set_position [UI] (33B)
│       │   │   ├── scrollbar_set_range [UI] (33B)
│       │   │   ├── unknown [UI] (43B)
│       │   │   ├── unknown [UI] (33B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_count_items_in_pane [UI] (93B)
│       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│       │   │   ├── set_scrollbar [UI] (64B)
│       │   │   └── (13 FW helpers hidden)
│       │   ├── popup_draw_background [UI] (309B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── unknown [UI] (56B)
│       │   │   └── tile_bitmap [UI] (391B)
│       │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── popup_render_label [UI] (226B)
│       │   ├── draw_3d_border [UI] (167B)
│       │   │   ├── draw_hline [UI] (69B)
│       │   │   └── draw_vline [UI] (69B)
│       │   ├── port_draw_text_styled [UI] (238B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   └── dispatch_oleitem_normal [UI] (673B)
│       │   └── unknown (invalidate_all_children) [UI] (115B)
│       │       ├── 00008B00 [?]
│       │       └── 00008B2D [?]
│       ├── unknown (popup_get_item_text) [UI] (47B) — Gets item text from a list control via a Windows message.
│       │   └── 00003CFF [?]
│       ├── unknown (popup_get_edit_text) [UI] (43B) — Gets text from an edit control via a Windows message.
│       │   └── 00003D62 [?]
│       ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│       │   ├── process_messages [UI] (21B)
│       │   ├── get_view_window_handle [UI] (28B)
│       │   ├── disable_parent_window [UI] (121B)
│       │   └── enable_parent_window [UI] (126B)
│       └── (2 FW helpers hidden)
├── findcity_cleanup_stack [FW] (12B) — Cleans up the dynamic stack allocation from the find city dialog.
│   └── popup_dialog_close [UI] (47B) — Closes a popup dialog by destroying it and clearing its list control.
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       └── (1 FW helpers hidden)
├── findcity_seh_epilog [FW] (14B) — SEH epilog for the find city dialog.
├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
├── text_begin_italic [UI] (29B) — Begins italic text mode in the global text buffer.
├── text_end_italic [UI] (29B) — Ends italic text mode in the global text buffer.
├── text_add_number [UI] (33B) — Adds a number to the global text buffer.
├── open_list_dialog [UI] (47B) — Opens a list dialog with the given title and flags.
│   └── open_dialog_extended [UI] (56B) — Opens a dialog with extended parameters, passing through to the dialog creation function.
│       └── popup_parse_text_file [UI] (2287B) — Parses a game text file section to configure and populate a popup dialog.
│           ├── mp_format_template_string [UI] (504B)
│           ├── popup_dialog_open [UI] (306B)
│           │   ├── rect_get_width [UI] (27B)
│           │   ├── rect_get_height [UI] (28B)
│           │   ├── unknown (popup list init) [UI] (64B)
│           │   ├── popup_dialog_reset [UI] (1299B)
│           │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│           │   ├── popup_set_bitmap [UI] (50B)
│           │   ├── popup_set_field_10 [UI] (33B)
│           │   ├── popup_set_scaled_width [UI] (99B)
│           │   └── (1 FW helpers hidden)
│           ├── popup_add_edit_field [UI] (412B)
│           ├── popup_set_field_38 [UI] (33B)
│           ├── popup_set_page_layout [UI] (91B)
│           │   └── popup_set_radio_column_count [UI] (126B)
│           ├── popup_set_title [UI] (86B)
│           ├── popup_set_scaled_width [UI] (99B)
│           ├── popup_set_radio_selected [UI] (76B)
│           │   └── popup_find_radio_option_by_id [UI] (101B)
│           ├── popup_add_radio_option [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   ├── popup_get_button_width [UI] (32B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_radio_checked [UI] (71B)
│           │   └── popup_add_radio_option [UI] (566B)
│           ├── popup_add_text_input [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_action_button_label [UI] (119B)
│           └── (4 FW helpers hidden)
├── set_map_scroll_position [UI] (98B) — Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   ├── redraw_entire_map [UI] (205B) *** STATE MUTATION *** — Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint buffers, and optionall...
│   │   ├── minimap_full_redraw [UI] (416B) — Performs a complete minimap redraw: recalculates viewport, iterates over all visible map tiles, draws each tile's col...
│   │   │   ├── minimap_calc_viewport [UI] (620B) *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (94B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── minimap_get_tile_color [UI] (425B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── find_city_at [GL] (245B)
│   │   │   │   ├── is_tile_ocean [GL] (57B)
│   │   │   │   └── get_tile_explored [GL] (71B)
│   │   │   ├── minimap_draw_goto_line [UI] (211B)
│   │   │   │   ├── minimap_tile_to_screen [UI] (169B)
│   │   │   │   ├── set_rect_abs [UI] (42B)
│   │   │   │   └── surface_fill_rect_color [UI] (63B)
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   ├── surface_set_clear_color [UI] (34B)
│   │   │   │   └── unknown (clear_surface_region) [UI] (28B)
│   │   │   ├── fill_rect_palette [UI] (50B)
│   │   │   │   └── fill_rect_xywh [UI] (63B)
│   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── dialog_create_buttons [UI] (675B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── save_and_flush [UI] (41B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── pedia_button_ctor [UI] (83B)
│   │   │   │   ├── pedia_button_create [UI] (139B)
│   │   │   │   ├── unknown (set button callback) [UI] (33B)
│   │   │   │   ├── dialog_destroy_buttons [UI] (162B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── prepare_surface [UI] (24B)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── recalc_viewport_geometry [UI] (1410B) — Recalculates all viewport geometry metrics: tile dimensions at current zoom, number of visible tiles, viewport origin...
│   │   │   ├── set_editor_font [UI] (93B)
│   │   │   │   ├── 00008200 [?]
│   │   │   │   ├── 0000847F [?]
│   │   │   │   └── delete_font [UI] (98B)
│   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   └── scale_table_build_primary [UI] (657B)
│   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   └── scale_sprite [UI] (35B)
│   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   └── set_sprite_scale [UI] (33B)
│   │   │   ├── wrap_x [GL] (94B)
│   │   │   ├── port_alloc_rect [UI] (58B)
│   │   │   │   └── port_alloc [UI] (325B)
│   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   ├── redraw_full_viewport [UI] (278B) — Redraws all visible tiles in the viewport.
│   │   │   ├── draw_complete_tile [UI] (495B)
│   │   │   │   ├── flush_display [UI] (21B)
│   │   │   │   ├── is_tile_valid [GL] (80B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   ├── render_tile [UI] (4431B)
│   │   │   │   ├── render_city_on_map [UI] (392B)
│   │   │   │   ├── draw_units_at_tile [UI] (662B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── set_current_zoom_scale [UI] (41B)
│   │   │   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL] (94B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── 0064F394 [?]
│   │   │   ├── draw_city_labels [UI] (871B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── get_civ_foreground_color [UI] (92B)
│   │   │   │   ├── tile_to_screen [UI] (151B)
│   │   │   │   ├── is_tile_visible [UI] (99B)
│   │   │   │   ├── scale_at_current_zoom [UI] (47B)
│   │   │   │   ├── tile_distance_xy [GL] (157B)
│   │   │   │   ├── get_tile_explored [GL] (71B)
│   │   │   │   ├── set_text_draw_source [UI] (24B)
│   │   │   │   ├── set_text_style [UI] (68B)
│   │   │   │   └── draw_text_with_shadow [UI] (205B)
│   │   │   ├── unknown (clear_surface_region) [UI] (28B)
│   │   │   │   └── port_set_color [UI] (43B)
│   │   │   └── wrap_x [GL] (94B)
│   │   ├── begin_end_paint_cycle [UI] (100B) — Performs a paint cycle: begin paint, poll network (if MP), end paint, begin paint again, poll again.
│   │   │   ├── flush_display [UI] (21B)
│   │   │   ├── end_paint [UI] (32B)
│   │   │   └── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B) — Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name.
│   │   ├── dialog_create_buttons [UI] (675B) — Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │   └── (1 FW helpers hidden)
│   └── wrap_x [GL] (94B) — Wraps an X coordinate for a cylindrical (non-flat) map.
├── city_count_content_citizens [GL] (125B) — Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
├── get_civ_adjective_name [GL] (145B) — Returns the adjective form of a civilization name.
├── handle_city_disorder_00509590 [MIXED] (933B) *** STATE MUTATION *** — Opens the city window for a specific city, handling disorder state.
│   ├── 0000CA8D [?]
│   ├── 0000CCB3 [?]
│   ├── show_window_wrapper [UI] (33B) — Wrapper that calls thunk_FUN_00408620 to show the window.
│   ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│   ├── show_help_topic [UI] (34B) — Opens a help topic with default parameters.
│   │   └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│   │       └── show_help_dialog [UI] (46B)
│   │           └── 0051D3E0 [?] (351B)
│   ├── unknown — manage window [UI] (37B) — Calls manage_window_C692 with the window handle from the object's field at offset 8.
│   ├── init_city_production_globals [GL] (77B) *** STATE MUTATION *** — Initializes two global production variables from a city's current production type and accumulated shields.
│   └── set_active_surface [UI] (74B) — Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│       ├── end_paint [UI] (32B) — Ends a paint operation by calling invalidate_region with a null rect (0 = invalidate all).
│       └── call_refresh_callback [UI] (47B) — Invokes the refresh callback function pointer stored at ECX+0x110, if non-null.
├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   ├── unknown (popup list init) [UI] (64B) — Resets and initializes a popup list control with 9 slots and param_1 items.
│   ├── popup_dialog_reset [UI] (1299B) — Resets all fields of a popup dialog structure to default values.
│   └── (1 FW helpers hidden)
└── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
```

### `0052630D` civpedia_draw_detail

> Renders the detail view for a Civilopedia entry.

```
civpedia_draw_detail [UI] (1542B)
├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
├── invalidate_region [UI] (180B) — Invalidates a screen region.
│   ├── blit_rect_to_screen [UI] (43B) — Blits a rect region to the screen window.
│   │   └── validate_window_rect [UI] (43B) — Validates (marks as not needing repaint) a rectangle of the window.
│   └── port_copy_to_screen_clipped [UI] (220B) — Copies from the port to the screen with palette selection and clipping.
│       ├── 0000CC11 [?]
│       ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│       ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_surface_hwnd [UI] (28B) — Returns the HWND stored at offset +4 of the object (ECX).
│       ├── port_lock [UI] (287B) — Locks the port's surface buffer.
│       │   ├── check_topdown [UI] (41B)
│       │   └── get_pixel_buffer [UI] (39B)
│       ├── port_unlock [UI] (83B) — Unlocks the port's surface, freeing the row pointer table.
│       ├── port_select_palette [UI] (87B) — Same as FUN_005c0cc5 but with null check on param_1.
│       │   └── write_full_colortable [UI] (39B)
│       │       └── 00003B4C [?]
│       └── surface_is_locked [UI] (44B) — Returns true if the port's surface buffer (this+0x34) is non-null (i.e., locked).
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_string [UI] (33B) — Appends a string to the global text buffer.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   └── 0000858E [?]
├── text_begin_bold [UI] (29B) — Begins bold text mode in the global text buffer.
├── display_improvement [UI] (33B) — Adds an improvement/government icon to the text buffer.
├── get_improvement_name [FW] (92B) — Returns a pointer to the Nth string in the string pool.
├── unknown (get panel icon width) [UI] (37B) — Returns the width of the icon rectangle at this+0x10.
│   └── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
├── unknown (get panel icon height) [UI] (37B) — Returns the height of the icon rectangle at this+0x10.
│   └── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
├── pedia_init_tabs [UI] (1391B) — Initializes the Civilopedia tab system — creates 17 property sheets (FUN_0043c5f0 calls), then based on mode (0/1/2) ...
│   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   │   ├── 00008B00 [?]
│   │   └── 00008B2D [?]
│   ├── set_edit_text [UI] (43B) — Sets the text content of an edit control.
│   │   └── 00002D7F [?]
│   ├── pedia_button_ctor [UI] (83B) — Constructor for pedia button widget, calls parent constructor via thunk_FUN_0040f480 within SEH frame.
│   ├── pedia_button_create [UI] (139B) — Creates a button window for the pedia, initializing member variables and calling create_window_8BE1.
│   │   ├── 00008BE1 [?]
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   │   ├── 0000944B [?]
│   │   │   └── surface_list_remove [UI] (191B)
│   │   └── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │       └── surface_list_append [UI] (99B)
│   ├── unknown (set button callback) [UI] (33B) — Sets a callback function pointer at this+0x34.
│   ├── unknown (clear hypertext links) [UI] (21B) — Clears/frees the hypertext link list.
│   └── (2 FW helpers hidden)
├── pedia_show_description [UI] (593B) — Shows a description for the selected Civilopedia entry, handling scenario-specific description files.
│   ├── pedia_clear_selection [UI] (47B) — Clears the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   ├── pedia_set_selection [UI] (47B) — Sets the hypertext selection state and invalidates the window.
│   │   └── 00008B00 [?]
│   └── (3 FW helpers hidden)
├── pedia_add_hyperlink [UI] (1361B) — Adds a clickable hyperlink text node to the Civilopedia display.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── get_font_height [UI] (28B) — Returns the font height from the font object at this+4.
│   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   ├── control_invalidate [UI] (65B) — Invalidates a UI control for repainting.
│   ├── hypertext_widget_create [UI] (139B) — Creates a hypertext widget within a given parent and rectangle.
│   │   ├── control_detach_window [UI] (88B) — Detaches and destroys a window from a control object.
│   │   ├── control_init_fields [UI] (120B) — Initializes UI control fields with the given parameters (ID, type, parent, rect).
│   │   └── unknown (create hypertext window) [UI] (167B) — Creates an MSHyperTextClass window as a child of the current dialog.
│   │       ├── 000029DF [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── get_window_object [UI] (28B)
│   │       ├── get_view_window_handle [UI] (28B)
│   │       └── control_alloc_instance [UI] (202B)
│   ├── pedia_link_node_ctor [UI] (86B) — Constructor for a pedia hypertext link node.
│   ├── unknown (set link callback) [UI] (33B) — Sets this+0x34 to param_1.
│   ├── civ_has_tech [GL] (181B) — Checks if a civilization (param_1) has a specific technology (param_2).
│   │   └── bit_index_to_byte_mask [GL] (45B) — Converts a bit index to byte offset and bit mask.
│   ├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
│   │   ├── 0000847F [?]
│   │   ├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
│   │   └── draw_string_palette [UI] (534B) — Draws a string on an 8-bit DIB surface using the current palette color (DAT_00637e78 as palette index) with alignment...
│   │       ├── 0000847F [?]
│   │       ├── 0000858E [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       └── (2 FW helpers hidden)
│   ├── port_alloc [UI] (683B) — Draws a line from (param_1,param_2) to (param_3,param_4).
│   │   ├── 000040FB [?]
│   │   ├── get_surface_buffer_handle [UI] (28B) — Returns this+0xC (the surface pitch/stride).
│   │   ├── unknown (get surface base) [UI] (28B) — Returns this+0x34 (the locked surface pointer).
│   │   ├── check_topdown [UI] (41B) — Returns true if the surface at param_1 has top-down orientation (offset 0x14 == 1).
│   │   ├── fill_scanline_8bit [UI] (126B) — Fills a single scanline of an 8-bit buffer with a byte value.
│   │   ├── fill_column_8bit [UI] (83B) — Fills a vertical column of pixels in an 8-bit buffer.
│   │   └── (1 FW helpers hidden)
│   └── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
├── widget_get_height [UI] (34B) — Returns the height of a widget by calling thunk_FUN_00407fc0.
│   └── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
├── unknown (pedia_draw_background_panel) [UI] (226B) — Draws a background panel for the Civilopedia.
│   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   ├── fill_surface_from_rect [UI] (71B) — Fills a rectangular region on a surface with a solid color, reading dimensions from a rect structure.
│   │   ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
│   │   ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   └── fill_rect_xywh [UI] (63B) — Fills a rectangle specified by (x, y, w, h) with a solid color.
│   │       ├── set_rect_wh [UI] (48B)
│   │       └── port_fill_rect [UI] (236B)
│   │           ├── rect_get_width [UI] (27B)
│   │           ├── rect_get_height [UI] (28B)
│   │           ├── port_lock [UI] (287B)
│   │           ├── surface_is_locked [UI] (44B)
│   │           ├── get_surface_buffer_handle [UI] (28B)
│   │           ├── check_topdown [UI] (41B)
│   │           └── fill_rect_8bit [UI] (152B)
│   └── tile_bitmap [UI] (391B) — Tiles a source bitmap to fill a destination rectangle.
│       └── blit_rect_to_rect [UI] (95B) — Blits a rectangle from one position to another, both specified by (x, y, w, h).
│           ├── set_rect_wh [UI] (48B)
│           └── port_blit_stretch [UI] (443B)
│               ├── port_lock [UI] (287B)
│               ├── port_unlock [UI] (83B)
│               ├── surface_is_locked [UI] (44B)
│               ├── get_surface_buffer_handle [UI] (28B)
│               ├── unknown (get surface base) [UI] (28B)
│               ├── check_topdown [UI] (41B)
│               └── copy_rect_8bit [UI] (187B)
├── pedia_load_description [UI] (388B) *** STATE MUTATION *** — Loads a Civilopedia description from the PEDIA section of the game text file.
├── port_set_rect [UI] (91B) — Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
├── port_set_clip_rect [UI] (55B) — Copies the port's clip rect (this+0x14..0x20) into the output parameter.
├── port_fill_rect_pattern [UI] (201B) — Draws text with a specific font (param_1 points to font handle).
├── port_get_font [UI] (75B) — Measures text with a specific font (handle from param_1[0]).
│   └── 00003FEB [?]
├── unknown (set/get draw color) [UI] (38B) — Sets the global draw color byte DAT_00637e78 to param_1, returns old value.
├── scale_table_build_primary [UI] (657B) — Builds a primary scale mapping table for pixel scaling.
└── unknown (sprite blit wrapper 1) [UI] (53B) — Calls FUN_005d056c with transparency=0xFF (no transparency).
    └── dispatch_oleitem_normal [UI] (673B) — Renders a sprite at normal scale.
        ├── rect_get_width [UI] (27B) — Returns the width of a RECT structure: right - left (param_1[2] - param_1[0]).
        ├── rect_get_height [UI] (28B) — Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
        ├── unknown (get panel icon width) [UI] (37B) — Returns the width of the icon rectangle at this+0x10.
        ├── unknown (get panel icon height) [UI] (37B) — Returns the height of the icon rectangle at this+0x10.
        ├── init_editor_scrollbar [UI] (34B) — Gets scrollbar width by calling FUN_00407f90.
        │   └── rect_get_width [UI] (27B)
        ├── widget_get_height [UI] (34B) — Returns the height of a widget by calling thunk_FUN_00407fc0.
        ├── get_surface_buffer_handle [UI] (28B) — Returns this+0xC (the surface pitch/stride).
        ├── unknown (get surface base) [UI] (28B) — Returns this+0x34 (the locked surface pointer).
        ├── scale_coords [UI] (254B) — Converts pixel coordinates to scaled coordinates using a lookup table at DAT_006e47c8.
        ├── check_topdown [UI] (41B) — Returns true if the surface at param_1 has top-down orientation (offset 0x14 == 1).
        └── pixel_copy [UI] (305B) — Copies pixels from an RLE-like sprite data structure to a destination buffer, with transparency (skips pixels matchin...
```

## Multiplayer Scenario

### `005218CB` mp_scenario_load_dialog

> Manages the multiplayer scenario load dialog flow.

```
mp_scenario_load_dialog [MIXED] (1764B) *** STATE MUTATION ***
├── text_begin [UI] (29B) — Begins a new text composition operation on the global text buffer at DAT_00679640.
├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   └── popup_show_modal [UI] (999B) — Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│       ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│       ├── process_messages [UI] (21B) — Processes pending Windows messages (message pump).
│       │   └── 0000BA4F [?]
│       ├── get_view_window_handle [UI] (28B) — Returns the window handle stored at offset 8 of the current object.
│       ├── get_edit_text [UI] (43B) — Gets the text content from an edit control into a buffer.
│       │   └── 00002D4D [?]
│       ├── init_palette_system [UI] (21B) — Initializes the palette system.
│       ├── unknown — manage window [UI] (37B) — Calls manage_window_C692 with the window handle from the object's field at offset 8.
│       │   └── 0000C692 [?]
│       ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION *** — Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│       │   ├── unknown (get drawing context) [UI] (37B)
│       │   │   └── focus_and_raise_window [UI] (57B)
│       │   ├── widget_scrollbar_dtor [UI] (57B)
│       │   │   └── scrollbar_widget_dtor [UI] (112B)
│       │   ├── widget_dropdown_dtor [UI] (57B)
│       │   └── (4 FW helpers hidden)
│       ├── popup_paint [UI] (1964B) — Master paint function for the popup system.
│       │   ├── end_paint [UI] (32B)
│       │   │   └── invalidate_region [UI] (180B)
│       │   ├── show_window_wrapper [UI] (33B)
│       │   │   └── show_window_inner [UI] (38B)
│       │   ├── set_rect_abs [UI] (42B)
│       │   ├── set_rect_wh [UI] (48B)
│       │   ├── measure_text_height [UI] (42B)
│       │   │   └── 0000858E [?]
│       │   ├── control_invalidate [UI] (65B)
│       │   │   ├── 00008B00 [?]
│       │   │   └── 00008B2D [?]
│       │   ├── draw_border_rect [UI] (61B)
│       │   │   └── draw_rect_outline [UI] (128B)
│       │   ├── scale_sprite [UI] (35B)
│       │   ├── set_sprite_scale [UI] (33B)
│       │   │   └── scale_table_build_primary [UI] (657B)
│       │   ├── init_editor_scrollbar [UI] (34B)
│       │   │   └── rect_get_width [UI] (27B)
│       │   ├── widget_get_height [UI] (34B)
│       │   │   └── rect_get_height [UI] (28B)
│       │   ├── widget_inflate_rect_neg [UI] (40B)
│       │   │   └── widget_inflate_rect [UI] (34B)
│       │   ├── popup_get_padded_height [UI] (42B)
│       │   ├── popup_render_label [UI] (226B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   └── port_fill_rect_pattern [UI] (201B)
│       │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_render_text_at_offset [UI] (61B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── (2 FW helpers hidden)
│       │   ├── popup_layout_dialog [UI] (4785B)
│       │   │   ├── get_font_height [UI] (28B)
│       │   │   ├── measure_text_height [UI] (42B)
│       │   │   ├── popup_calc_max_text_height [UI] (132B)
│       │   │   ├── popup_get_line_height [UI] (78B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_calc_button_area_height [UI] (46B)
│       │   │   ├── popup_calc_text_width [UI] (51B)
│       │   │   ├── popup_set_text_style [UI] (189B)
│       │   │   ├── popup_render_label [UI] (226B)
│       │   │   ├── popup_has_negative_line_count [UI] (83B)
│       │   │   ├── popup_layout_text [UI] (1326B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_get_radio_page_number [UI] (56B)
│       │   │   ├── unknown (popup_is_checkbox_mode) [UI] (47B)
│       │   │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   ├── blit_rect_to_rect [UI] (95B)
│       │   │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   └── unknown (set/get draw color) [UI] (38B)
│       │   ├── popup_redraw_visible_items [UI] (660B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── invalidate_region [UI] (180B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── draw_border_rect [UI] (61B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_get_radio_at_index [UI] (156B)
│       │   │   ├── popup_draw_item [UI] (706B)
│       │   │   ├── port_set_rect_from_self [UI] (63B)
│       │   │   └── port_set_rect [UI] (91B)
│       │   ├── popup_create_window [UI] (693B)
│       │   │   ├── set_callback_0x44 [UI] (45B)
│       │   │   ├── init_sprite_surface_mgr [UI] (133B)
│       │   │   ├── unknown (set_font_size) [UI] (43B)
│       │   │   ├── create_offscreen_surface [UI] (115B)
│       │   │   └── create_offscreen_surface_b [UI] (119B)
│       │   ├── popup_init_controls [UI] (6616B)
│       │   │   ├── set_rect_wh [UI] (48B)
│       │   │   ├── create_text_button [UI] (133B)
│       │   │   ├── set_button_owner [UI] (45B)
│       │   │   ├── set_button_handler [UI] (45B)
│       │   │   ├── set_button_click_callback [UI] (33B)
│       │   │   ├── create_checkbox [UI] (167B)
│       │   │   ├── set_checkbox_value [UI] (33B)
│       │   │   ├── create_scrollbar [UI] (124B)
│       │   │   ├── scrollbar_set_position [UI] (52B)
│       │   │   ├── scrollbar_set_range [UI] (47B)
│       │   │   ├── scrollbar_set_callback [UI] (33B)
│       │   │   ├── set_edit_max_chars [UI] (43B)
│       │   │   ├── create_listbox_control [UI] (121B)
│       │   │   ├── add_listbox_item [UI] (49B)
│       │   │   ├── disable_civ_slot [UI] (133B)
│       │   │   ├── unknown (set selected item) [UI] (33B)
│       │   │   ├── pedia_button_create [UI] (139B)
│       │   │   ├── unknown (set button callback) [UI] (33B)
│       │   │   ├── unknown (set scrollbar callback) [UI] (33B)
│       │   │   ├── scale_sprite [UI] (35B)
│       │   │   ├── widget_get_height [UI] (34B)
│       │   │   ├── scrollbar_init [UI] (93B)
│       │   │   ├── scrollbar_create_window [UI] (207B)
│       │   │   ├── scrollbar_set_position [UI] (33B)
│       │   │   ├── scrollbar_set_range [UI] (33B)
│       │   │   ├── unknown [UI] (43B)
│       │   │   ├── unknown [UI] (33B)
│       │   │   ├── popup_get_padded_height [UI] (42B)
│       │   │   ├── popup_get_radio_index_in_group [UI] (156B)
│       │   │   ├── popup_count_items_in_pane [UI] (93B)
│       │   │   ├── unknown (popup_clear_check) [UI] (32B)
│       │   │   ├── unknown (create_editbox_simple) [UI] (101B)
│       │   │   ├── set_scrollbar [UI] (64B)
│       │   │   └── (13 FW helpers hidden)
│       │   ├── popup_draw_background [UI] (309B)
│       │   │   ├── rect_get_width [UI] (27B)
│       │   │   ├── rect_get_height [UI] (28B)
│       │   │   ├── fill_surface_from_rect [UI] (71B)
│       │   │   ├── unknown [UI] (56B)
│       │   │   └── tile_bitmap [UI] (391B)
│       │   ├── unknown (popup_draw_icon) [UI] (55B)
│       │   │   └── popup_render_label [UI] (226B)
│       │   ├── draw_3d_border [UI] (167B)
│       │   │   ├── draw_hline [UI] (69B)
│       │   │   └── draw_vline [UI] (69B)
│       │   ├── port_draw_text_styled [UI] (238B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── port_fill_rect_pattern [UI] (201B)
│       │   │   ├── 0000847F [?]
│       │   │   ├── unknown (set/get draw color) [UI] (38B)
│       │   │   └── draw_string_palette [UI] (534B)
│       │   ├── unknown (set/get draw color) [UI] (38B)
│       │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│       │   │   └── dispatch_oleitem_normal [UI] (673B)
│       │   └── unknown (invalidate_all_children) [UI] (115B)
│       │       ├── 00008B00 [?]
│       │       └── 00008B2D [?]
│       ├── unknown (popup_get_item_text) [UI] (47B) — Gets item text from a list control via a Windows message.
│       │   └── 00003CFF [?]
│       ├── unknown (popup_get_edit_text) [UI] (43B) — Gets text from an edit control via a Windows message.
│       │   └── 00003D62 [?]
│       ├── modal_dialog_run [UI] (283B) — Runs a modal dialog loop.
│       │   ├── process_messages [UI] (21B)
│       │   ├── get_view_window_handle [UI] (28B)
│       │   ├── disable_parent_window [UI] (121B)
│       │   └── enable_parent_window [UI] (126B)
│       └── (2 FW helpers hidden)
├── show_message [UI] (46B) — Stores a message string in the message buffer at the specified slot index.
├── open_list_dialog [UI] (47B) — Opens a list dialog with the given title and flags.
│   └── open_dialog_extended [UI] (56B) — Opens a dialog with extended parameters, passing through to the dialog creation function.
│       └── popup_parse_text_file [UI] (2287B) — Parses a game text file section to configure and populate a popup dialog.
│           ├── mp_format_template_string [UI] (504B)
│           ├── popup_dialog_open [UI] (306B)
│           │   ├── rect_get_width [UI] (27B)
│           │   ├── rect_get_height [UI] (28B)
│           │   ├── unknown (popup list init) [UI] (64B)
│           │   ├── popup_dialog_reset [UI] (1299B)
│           │   ├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│           │   ├── popup_set_bitmap [UI] (50B)
│           │   ├── popup_set_field_10 [UI] (33B)
│           │   ├── popup_set_scaled_width [UI] (99B)
│           │   └── (1 FW helpers hidden)
│           ├── popup_add_edit_field [UI] (412B)
│           ├── popup_set_field_38 [UI] (33B)
│           ├── popup_set_page_layout [UI] (91B)
│           │   └── popup_set_radio_column_count [UI] (126B)
│           ├── popup_set_title [UI] (86B)
│           ├── popup_set_scaled_width [UI] (99B)
│           ├── popup_set_radio_selected [UI] (76B)
│           │   └── popup_find_radio_option_by_id [UI] (101B)
│           ├── popup_add_radio_option [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   ├── popup_get_button_width [UI] (32B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_radio_checked [UI] (71B)
│           │   └── popup_add_radio_option [UI] (566B)
│           ├── popup_add_text_input [UI] (566B)
│           │   ├── measure_text_height [UI] (42B)
│           │   └── (2 FW helpers hidden)
│           ├── popup_add_action_button_label [UI] (119B)
│           └── (4 FW helpers hidden)
├── init_palette_system [UI] (21B) — Initializes the palette system.
├── update_palette [UI] (43B) — Updates the display palette for the given view.
│   └── 0000C280 [?]
├── load_palette [UI] (43B) — Loads a palette from a data source.
│   └── set_callback_0x2c [UI] (25B) — Sets a callback function pointer at offset +0x2c of the window object.
├── play_game_start_sounds [UI] (48B) — Plays initialization sounds: stops current music (-107) and starts ambient (108).
│   └── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
│       ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│       ├── rng_range [GL] (113B) *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2].
│       │   └── rng_next_float [GL] (94B) *** STATE MUTATION ***
│       └── (10 FW helpers hidden)
├── mp_set_number_control [UI] (29B) *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
├── unknown (network init) [FW] (38B) — Calls thunk_FUN_0059dfb9 with 4 zero parameters.
│   └── popup_dialog_open [UI] (306B) — Opens a popup dialog with specified parameters (title, position, dimensions, flags).
├── unknown (dialog show with section) [UI] (37B) — Opens a dialog/section by calling thunk_FUN_00419100 with DAT_006359d4 and the two parameters.
│   └── show_help_topic_ext [UI] (38B) — Extended help topic opener with additional parameter.
│       └── show_help_dialog [UI] (46B) — Opens a help dialog using the game dialog system.
│           └── 0051D3E0 [?] (351B)
├── unknown (string pool set) [UI] (33B) — Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   └── advance_year_display [UI] (479B) — Advances the year display in the UI, showing appropriate year strings.
│       ├── text_add_label_id [UI] (33B) — Appends a localized label (by ID) to the global text buffer.
│       ├── text_newline [UI] (29B) — Adds a newline to the global text buffer.
│       └── (3 FW helpers hidden)
├── play_sound_effect [UI] (601B) *** STATE MUTATION *** — Plays a sound effect by ID.
├── unknown (stop music) [UI] (31B) — Stops music playback and sets paused flag.
├── replace_extension [FW] (125B) — Replaces the file extension in param_1.
├── calc_year_from_turn [GL] (540B) — Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
├── 0051D7BC [?] (26B)
├── 0051D7D6 [?] (65B)
├── game_timer_dialog [MIXED] (1579B) *** STATE MUTATION *** — Shows the game timer configuration dialog.
│   ├── select_list_item [UI] (38B) — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   ├── open_list_dialog [UI] (47B) — Opens a list dialog with the given title and flags.
│   ├── show_dialog_message [UI] (43B) — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   └── 0051D564 [?] (178B)
│   ├── mp_show_wait_dialog [UI] (45B) — Shows a waiting dialog by calling thunk_FUN_0051d564 with 4 parameters and DAT_006359d4.
│   │   └── 0051D564 [?] (178B)
│   ├── enqueue_mp_event [MIXED] (398B) — Enqueues a multiplayer event message.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION *** — Central network message dispatcher.
│   │   │   ├── invalidate_region [UI] (180B)
│   │   │   │   ├── blit_rect_to_screen [UI] (43B)
│   │   │   │   └── port_copy_to_screen_clipped [UI] (220B)
│   │   │   ├── net_send_to_player [GL] (305B) *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] (124B) *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── net_msg_init_with_version [GL] (94B)
│   │   │   ├── net_msg_init_with_version [GL] (94B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init version message) [GL] (65B)
│   │   │   │   ├── net_msg_init_with_name [GL] (141B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init chat/popup message) [GL] (169B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── unknown (init type-4 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-6 message) [GL] (45B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── unknown (init type-0x13 message) [GL] (60B)
│   │   │   │   ├── net_msg_init_header [GL] (55B)
│   │   │   │   └── netmgr_fill_game_info [GL] (598B)
│   │   │   ├── unknown (init type-0x69 message) [GL] (56B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   ├── diff_engine_serialize_game [GL] (835B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_partial [GL] (308B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] (508B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   ├── rle_encode (unnamed) [GL] (588B)
│   │   │   │   └── (1 FW helpers hidden)
│   │   │   ├── diff_engine_serialize_changed_only [GL] (466B) *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (270B)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (152B)
│   │   │   │   ├── diff_engine_append_data [GL] (98B)
│   │   │   │   └── (2 FW helpers hidden)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │   │   ├── rect_get_width [UI] (27B)
│   │   │   │   ├── rect_get_height [UI] (28B)
│   │   │   │   ├── set_rect_wh [UI] (48B)
│   │   │   │   ├── get_font_height [UI] (28B)
│   │   │   │   ├── measure_text_height [UI] (42B)
│   │   │   │   ├── reset_sprite_scale [UI] (28B)
│   │   │   │   ├── get_civ_adjective_name [GL] (145B)
│   │   │   │   ├── widget_inflate_rect_neg [UI] (40B)
│   │   │   │   ├── tile_bitmap [UI] (391B)
│   │   │   │   ├── port_set_rect_from_self [UI] (63B)
│   │   │   │   ├── port_set_rect [UI] (91B)
│   │   │   │   ├── port_fill_rect_pattern [UI] (201B)
│   │   │   │   ├── unknown (set/get draw color) [UI] (38B)
│   │   │   │   ├── scale_table_build_primary [UI] (657B)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (53B)
│   │   │   │   └── (3 FW helpers hidden)
│   │   │   ├── netmgr_build_packet [GL] (405B)
│   │   │   │   └── net_msg_init_header [GL] (55B)
│   │   │   └── (3 FW helpers hidden)
│   │   └── (1 FW helpers hidden)
│   ├── mp_set_animation_style [UI] (185B) — Sets the animation display style for multiplayer.
│   │   └── show_popup_window [UI] (330B) — Shows a popup window — computes dimensions and position, creates dialog, sets handlers, enables scrolling.
│   │       ├── set_callback_0x30 [UI] (45B)
│   │       ├── set_callback_0x38 [UI] (45B)
│   │       ├── show_window_wrapper [UI] (33B)
│   │       ├── dialog_create [UI] (588B)
│   │       │   ├── unknown (set_font_size) [UI] (43B)
│   │       │   ├── unknown (set dialog video source) [UI] (43B)
│   │       │   ├── dialog_create_buttons [UI] (675B)
│   │       │   ├── unknown (set_msg_handler_a) [UI] (45B)
│   │       │   ├── unknown (set_msg_handler_b) [UI] (45B)
│   │       │   ├── create_offscreen_surface_b [UI] (119B)
│   │       │   └── (1 FW helpers hidden)
│   │       ├── unknown [UI] (81B)
│   │       ├── calc_window_position [UI] (352B)
│   │       ├── get_popup_dimensions [UI] (186B)
│   │       └── set_active_surface [UI] (74B)
│   │           ├── end_paint [UI] (32B)
│   │           └── call_refresh_callback [UI] (47B)
│   ├── unknown [UI] (61B) — Conditional cleanup functions for popup windows — destroy window if video loaded.
│   ├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
│   │   ├── unknown (popup list init) [UI] (64B) — Resets and initializes a popup list control with 9 slots and param_1 items.
│   │   ├── popup_dialog_reset [UI] (1299B) — Resets all fields of a popup dialog structure to default values.
│   │   └── (1 FW helpers hidden)
│   ├── popup_set_position_fields [UI] (42B) — Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2.
│   ├── popup_set_default_selection [UI] (116B) — Sets the default selected item in the popup by ID.
│   │   ├── popup_find_radio_option_by_id [UI] (101B) — Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
│   │   └── popup_find_button_by_id [UI] (100B) — Searches the popup's button linked list (head at this+0x234) for a node whose first field (node[0]) matches param_1.
│   ├── popup_show_modal [UI] (999B) — Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels.
│   ├── popup_parse_text_file [UI] (2287B) — Parses a game text file section to configure and populate a popup dialog.
│   └── (3 FW helpers hidden)
├── popup_dialog_create [UI] (93B) — Creates a new popup dialog object.
├── popup_set_position_fields [UI] (42B) — Sets two popup dialog position fields: this+0x14 = param_1, this+0x18 = param_2.
├── popup_is_radio_grayed [UI] (90B) — Returns whether a radio option (identified by param_1) has the "grayed" flag (bit 2) set.
│   └── popup_find_radio_option_by_id [UI] (101B) — Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
├── popup_set_radio_grayed [UI] (76B) — Sets or clears the "grayed" flag (bit 2) on a radio option identified by param_1.
│   └── popup_find_radio_option_by_id [UI] (101B) — Searches the popup's radio option linked list (head at this+0x228) for a node whose ID field (node+4) matches param_1.
├── popup_set_default_selection [UI] (116B) — Sets the default selected item in the popup by ID.
├── popup_add_button [UI] (360B) — Adds a button to the popup dialog.
│   ├── measure_text_height [UI] (42B) — Measures the height of text rendered with a given font, by calling measure_text_858E.
│   ├── init_editor_scrollbar [UI] (34B) — Gets scrollbar width by calling FUN_00407f90.
│   └── (2 FW helpers hidden)
├── popup_add_radio_option [UI] (566B) — Adds a radio button option to the popup dialog.
├── popup_parse_text_file [UI] (2287B) — Parses a game text file section to configure and populate a popup dialog.
├── load_gif_resource [UI] (847B) — Loads a GIF image from a resource.
│   ├── flush_display [UI] (21B) — Flushes the display buffer by calling FUN_005bbbce.
│   ├── port_init_buffer [UI] (36B) — Wrapper that calls FUN_005bd696 with param_1.
│   │   └── port_alloc [UI] (325B) — Full port allocation: frees any existing DIB, creates a new DIB section of the specified size, and initializes pixel ...
│   │       ├── 000035B0 [?]
│   │       ├── rect_get_width [UI] (27B)
│   │       ├── rect_get_height [UI] (28B)
│   │       ├── port_init [UI] (258B)
│   │       ├── port_lock [UI] (287B)
│   │       │   ├── check_topdown [UI] (41B)
│   │       │   └── get_pixel_buffer [UI] (39B)
│   │       ├── port_unlock [UI] (83B)
│   │       ├── surface_is_locked [UI] (44B)
│   │       ├── destroy_dib_surface [UI] (155B)
│   │       ├── get_surface_stride [UI] (48B)
│   │       ├── check_topdown [UI] (41B)
│   │       └── (1 FW helpers hidden)
│   ├── port_draw_text_rect [UI] (77B) — Selects a palette on the port's surface if it differs from the current one.
│   │   └── write_full_colortable [UI] (39B) — Writes full 256-entry color table to a DIB.
│   │       └── 00003B4C [?]
│   ├── palette_set_entries [UI] (142B) — Sets multiple palette entries from an RGB byte array.
│   │   ├── palette_apply [UI] (90B) — Applies the current palette and regenerates the random palette ID.
│   │   │   ├── palette_generate_random_id [UI] (75B)
│   │   │   └── unknown (palette_update_entries) [UI] (60B)
│   │   └── palette_set_entry [UI] (316B) — Sets a palette entry with proper flag management.
│   ├── check_topdown [UI] (41B) — Returns true if the surface at param_1 has top-down orientation (offset 0x14 == 1).
│   ├── flip_surface_vertical [UI] (249B) — Vertically flips a surface's pixel data in place by swapping rows from top and bottom.
│   │   ├── get_pixel_buffer [UI] (39B) — Returns the pixel buffer pointer at offset 0x24 of the surface, or 0 if null.
│   │   └── (4 FW helpers hidden)
│   └── (8 FW helpers hidden)
└── palette_init [UI] (145B) — Initializes the palette object.
    ├── 0000E780 [?]
    ├── palette_generate_random_id [UI] (75B) — Generates a random non-zero 15-bit ID and stores at this+0x408.
    └── unknown (palette_create) [UI] (60B) — Creates a GDI palette if palette mode active, returns NULL otherwise.
```

---

## State-Mutating Functions Reachable from Dialog Entry Points

Functions where UI actions trigger game state changes. This is the critical
boundary between UI and game logic -- these are the GL/MIXED/AI functions
with real game state mutations reachable from dialog/UI entry points.

**Total: 162 state-mutating functions**

| Address | Name | Cat | Mutations |
|---------|------|-----|-----------|
| `0040C480` | taxrate_recalc_totals | MIXED | - DAT_0064c6b3[civ * 0x594] and DAT_0064c6b4[civ * 0x594]: temporarily modified during calculatio... |
| `0040CD64` | open_tax_rate_dialog | MIXED | - DAT_0063cbb4: dialog state pointer (0x0063 range) - DAT_0063cbb0: dialog active flag - DAT_0062... |
| `0040DDC6` | show_tax_rate_dialog | MIXED | Via sub-call to open_tax_rate_dialog (see FUN_0040cd64). |
| `0040E3B1` | handle_revolution | GL | Via sub-calls: - thunk_FUN_0046e020(0x3e, 1, 0, 0): triggers revolution event — GAME STATE - thun... |
| `0042738C` | cancel_goto_if_blocked | GL | Writes to DAT_006560ff at 0x0065XXXX (unit data): - (&DAT_006560ff)[param_1 * 0x20] = 0xff |
| `004273E6` | cancel_goto_for_stack | GL | Writes to unit order bytes at 0x0065XXXX: - (&DAT_006560ff)[param_1 * 0x20] = 0xff for matching u... |
| `004274A6` | process_unit_move_visibility | GL | Extensive writes to game state: - DAT_006560f9 (unit visibility bits at 0x0065XXXX) - DAT_006560f... |
| `004308AE` | show_foreign_advisor | MIXED | - DAT_0064c6e0[param_1 * 0x594 + local_18] = percentage value (per-civ treaty data, 0x0064 range)... |
| `0043CC00` | city_set_specialist_slot | GL | DAT_0064f34c[param_1 * 0x58] /= (1 << param_2) — city specialist bitfield (0x0064 range); DAT_006... |
| `0043D289` | set_building | GL | DAT_0064f374[param_1 * 0x58 + offset] — city building data (0x0064 range) |
| `0043D400` | calc_city_trade_desirability | GL | DAT_0064f37b-DAT_0064f37f[param_1 * 0x58 + ...] — city trade commodity assignments (0x0064 range,... |
| `0043F493` | assign_city_name | GL | DAT_006554fd[leader * 0x30] incremented (0x0065 range — per-leader city name counter), DAT_0064f3... |
| `0043F7A7` | city_update_tile_workers | GL | Map tile data via thunk_FUN_005b98b7 and thunk_FUN_005b9c49 (map tile data, 0x006A range via indi... |
| `0043F8B0` | create_city | GL | Extensive game state changes across 0x0064-0x0065 ranges: - DAT_00655b18 incremented (total city ... |
| `00440325` | remove_trade_route | GL | Writes to DAT_0064f37a (city trade route count, 0x0064XXXX), DAT_0064f384 (trade route partner ID... |
| `004413D1` | delete_city | GL | Writes to DAT_0064c708 (civ city count, 0x0064XXXX), DAT_0064f394 (city active flag), DAT_00655b1... |
| `00441B11` | change_city_production | MIXED | Writes DAT_0064c7f4 (per-civ building production counts, 0x0064XXXX), DAT_0064f379 (city producti... |
| `00456F20` | adjust_attitude | GL | **DAT_0064b114** (diplomacy attitude, 0x0064XXXX range — per-civ data) |
| `0045705E` | ai_evaluate_diplomacy | AI | Writes to many DAT_0064b0XX diplomacy evaluation globals AND DAT_0064c6c0 (per-civ treaty flags O... |
| `00458AB1` | diplo_show_greeting | MIXED | **DAT_0064c6c0** write: `*(DAT_0064c6c0 + param_2*4 + param_1*0x594) /= 0x100` (marks nuclear awa... |
| `00458DF9` | diplo_ai_emissary | MIXED | **DAT_00626a30** (diplomacy session active flag), **DAT_00626a34** (diplomacy result) |
| `0045918E` | diplo_reset_state | GL | Writes to DAT_00626aXX which are diplomacy UI state — borderline but treated as UI state since th... |
| `0045A535` | diplo_form_alliance | GL | **DAT_0064c6a0** (status flag 0x100), **DAT_0064c6bf** (patience reset), **DAT_0064ca82** (allian... |
| `0045A6AB` | diplo_sign_peace_treaty | GL | **DAT_0064c6bf**, **DAT_0064ca82**, and attitude clamped via thunk_FUN_00467933 |
| `0045A7A8` | diplo_sign_ceasefire | GL | **DAT_0064c6c0** (per-civ treaty flags: flag 0x800 cleared for all civs against param_1), **DAT_0... |
| `0045A8E3` | diplo_activate_alliance_wars | GL | **DAT_0064c6c0** (sets flags 0x80800 = war+mobilization for allies), **DAT_0064ca82** (war timest... |
| `0045AC71` | diplo_declare_war | GL | Multiple writes to **DAT_0064c6XX** per-civ data: treaty flags, betrayal counters, war counters, ... |
| `0045B0D6` | diplo_demand_ally_help | MIXED | **DAT_0064c6a2** (gold transferred between civs) |
| `0045B4DA` | diplo_ai_negotiate | MIXED | Extensive writes to per-civ data (DAT_0064c6XX range): gold transfers, treaty flags, patience cou... |
| `0045DD7F` | diplo_favor_menu | MIXED | Multiple game state writes: treaty flags, gold, map visibility, unit visibility flags. |
| `00460129` | ai_diplomacy_negotiate | GL | Extensive game state writes: - DAT_0064c6c0 (treaty flags, 0x0064 range) — sets/clears war, peace... |
| `00467580` | unknown (set trade route value) | GL | DAT_0063cc30 + param_1*4 (0x0063 range — trade route data) |
| `00467750` | clear_treaty_flags | GL | DAT_0064c6c0 + civ offsets (0x0064 range — per-civ treaty data) |
| `00467825` | set_treaty_flags | GL | DAT_0064c6c0 + civ offsets (0x0064 range) |
| `00467933` | set_attitude_value | GL | DAT_0064c6e0 + civ offsets (0x0064 range — attitude table) |
| `00467BAF` | recall_units_from_territory | GL | DAT_0064b1b4, DAT_0064b1b0 (viewport position, 0x0064 range), DAT_006560ff (unit order byte, 0x00... |
| `00467EF2` | break_alliance | MIXED | DAT_0064c6c0 (treaty flags, 0x0064 range — via thunk_FUN_00467750) |
| `0046AF70` | net_send_to_player | GL | DAT_00628468 (sequence counter in 0x0062 range — not game state but network state) |
| `0046B0A1` | net_broadcast | GL | DAT_00628468 (network sequence) |
| `0046B14D` | net_send_message | GL | - DAT_006c9088, DAT_006c9078, DAT_006c907c (0x006C range — network counters) - DAT_00654fb0 (0x00... |
| `0047E94E` | network_poll | MIXED | MASSIVE — writes to virtually every game state address across 0x0063-0x006C. Key writes include: ... |
| `00488A45` | check_trade_route_path | GL | DAT_0063f660 (0x0063 — trade route distance), DAT_0062d040-0062d048 (pathfinding scratch — 0x0062... |
| `00492D18` | ai_shift_goals_down_a | AI | DAT_0064cab4/8 (0x0064 — AI goal A table) |
| `0049301B` | ai_add_goal_a | AI | DAT_0064cab4-9 (0x0064 — AI goal A), DAT_006560ff/00656102/104 (0x0065 — unit orders/goto targets) |
| `00498E8B` | ai_choose_city_production | AI | DAT_0064f344 (0x0064 — city flags, bit 0x10000 for settlers), DAT_006560ff/656102/104 (0x0065 — u... |
| `004ABFE5` | find_path | GL | - DAT_006ced60 (0x006C range — BFS scratch buffer, 0x2400 bytes) - DAT_00673fc0-DAT_00673fbc (0x0... |
| `004AD076` | set_path_cost | GL | BFS grid in 0x006C range (pathfinding scratch buffer) |
| `004B0A41` | diff_engine_copy_sections | GL | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine scan pointers in 0x0067 range. |
| `004B0AD0` | diff_engine_invert_mirror | GL | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine state in 0x0067 range. |
| `004B0B53` | diff_engine_scan_and_send | GL | Writes to DAT_0067a series (diff engine metadata, 0x0067xxxx range) and DAT_00655afe/00655b00 etc... |
| `004B153C` | diff_engine_serialize_game | GL | Writes checksum values in DAT_0067a434/4c4/464/44c/4f4/524/644 (all 0x0067 range diff engine meta... |
| `004B18E1` | diff_engine_serialize_partial | GL | DAT_0067a434, DAT_0067a53c — checksum values in 0x0067 range. |
| `004B1A15` | diff_engine_serialize_full_compressed | GL | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B1C11` | diff_engine_serialize_changed_only | GL | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B76D5` | parleywin_close | MIXED | DAT_006c91e4 (set to 0, negotiation flag at 0x006Cxxxx), DAT_00626a2c (UI state). |
| `004B7EB6` | parleywin_start_session | MIXED | DAT_006ad6a0, DAT_006ad69c (chat message counters at 0x006Axxxx), DAT_0067a9b0, DAT_0067a994 (neg... |
| `004B81DD` | parley_handle_response | MIXED | DAT_006c91e8/ec/f0/f4 (negotiation response flags at 0x006Cxxxx), DAT_0067a994/998/99c/9a0/9a4/9d... |
| `004BE6BA` | upgrade_units_for_tech | GL | DAT_006560f6[unit_index * 0x20] (unit type ID at 0x0065xxxx), DAT_006560f4[unit_index * 0x20] (un... |
| `004BEA84` | handle_tech_government_effects | GL | Indirectly triggers thunk_FUN_0055c066 (revolution) which modifies DAT_0064c6b5 (government type ... |
| `004BF05B` | handle_tech_discovery | GL | Extensive writes to game state in 0x0064-0x0065 range: - DAT_0064c6f8[civ*0x594 + byte] /= bit (t... |
| `004D01AE` | load_civ_power_values | GL | DAT_006a5b10 (0x006A range — map/game state area) — writes 6 int values from per-civ data at DAT_... |
| `004DB690` | parley_build_packet | GL | DAT_0068abd0, DAT_0068abd4 (0x0068 range — diplomacy scratch data) |
| `004DD285` | parley_execute_transaction | GL | Delegates to state-mutating sub-functions (see below). Also reads/checks DAT_0064b9e8, DAT_0064c7... |
| `004DD8AD` | parley_execute_share_maps | GL | Extensive writes to 0x0064 and 0x0065 ranges (per-civ data, unit data, city data), 0x006A range (... |
| `004DDE9E` | parley_execute_give_tech_list | GL | Via thunk_FUN_00467825 — modifies tech known flags (0x0064 range) |
| `004DDF04` | parley_execute_give_gold | GL | DAT_0064c6a2 + param_1 * 0x594, DAT_0064c6a2 + param_2 * 0x594 (0x0064 range — per-civ treasury) |
| `004DDFB2` | parley_execute_give_techs | GL | Via thunk_FUN_004bf05b — modifies tech known flags (0x0064 range) |
| `004DE049` | parley_execute_give_units | GL | Via thunk_FUN_004de0e2 (see below) |
| `004DE0E2` | parley_transfer_city | GL | Extensive writes to 0x0064 and 0x0065 ranges — city owner, civ city count, unit counts, trade rou... |
| `004DE990` | parley_execute_transfer_units | GL | DAT_006560f7, DAT_0064c778, DAT_0064c706, DAT_0064b9e8 (0x0065 and 0x0064 ranges — unit and civ d... |
| `004DF10F` | parley_execute_treaty | GL | Via thunk_FUN_00467825/thunk_FUN_00467750 — modifies DAT_0064c6c0 (0x0064 range — diplomatic rela... |
| `004E1763` | kill_or_retire_civ | GL | Extensive writes across 0x0064 (per-civ data), 0x0065 (unit/city data, game flags), 0x0066 (playe... |
| `004E7492` | init_city_production_globals | GL | DAT_006a65a4, DAT_006a6528 (0x006A range — production calculation globals) |
| `004E7549` | set_worker_tile_status | GL | DAT_0064f356 + param_1 * 0x58 (0x0064 range — city data) |
| `004E7641` | evaluate_city_tiles | GL | DAT_006a6530 (0x006A range — tile evaluation array), DAT_00655b10 (incremented for pollution trac... |
| `004E790C` | set_tile_worked | GL | DAT_0064f370 + param_1 * 0x58 (0x0064 range — city worked tiles) |
| `004E7967` | calc_capital_distance_and_corruption | GL | DAT_006a6588, DAT_006a6600, DAT_006a6574, DAT_006a6530 (0x006A range — city calc globals) |
| `004E7D7F` | check_unit_support | GL | DAT_006a660c (unit counter), DAT_006a6568 (support cost counter) — 0x006A range |
| `004E7EB1` | calc_food_box_size | GL | DAT_006a6608, DAT_006a6560 (0x006A range — food box globals) |
| `004E80B1` | calc_shields_per_row | GL | Multiple DAT_006a6xxx globals (0x006A range — production calculation state), DAT_006560f4 (0x0065... |
| `004E868F` | calc_tile_resource | GL | DAT_006a65d4, DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 (auto-improvement triggers), DAT_0064ca76-... |
| `004E8C8C` | check_auto_irrigation_trigger | GL | DAT_006a65d4 (counter), DAT_0062ee0c (flag), DAT_006a65e0, DAT_006a65e8 (target tile coords) — 0x... |
| `004E8DB5` | check_road_trade_trigger | GL | DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 — auto-improvement trigger flags |
| `004E8E4D` | calc_tile_all_resources | GL | DAT_0062edf4, DAT_006a65b8 (per-tile yields), DAT_006a65c8 (accumulated totals) — 0x006A range |
| `004E8ECF` | clear_and_check_worked_tiles | GL | DAT_0064f370 (via set_tile_worked) — 0x0064 range |
| `004E8F42` | assign_worker_tiles | GL | DAT_006a65dc, DAT_006a654c (specialist counts), DAT_006a65c8 (accumulated yields), DAT_0064f344 (... |
| `004E9719` | adjust_specialist_count | GL | DAT_0064f370 + param_1 * 0x58 (0x0064 range) |
| `004E97AE` | sync_worker_tile_status | GL | DAT_0064f356 (0x0064 range — worker tile status) |
| `004E989A` | calc_corruption | GL | DAT_0064ca74-0064ca7a (0x0064 range — per-civ corruption statistics, only when DAT_0062edf8 flag ... |
| `004E9C14` | calc_city_production | GL | Multiple DAT_006a6xxx globals (0x006A range — production calculation state) |
| `004EA031` | adjust_happy_unhappy | GL | DAT_006a659c, DAT_006a65a8, DAT_006a6550, DAT_006a6620-006a6628 (0x006A range — happiness calcula... |
| `004EA1F6` | distribute_trade | GL | DAT_006a65fc (luxury), DAT_006a6578 (tax), DAT_006a6554 (science), DAT_006a6618 (trade route bonu... |
| `004EA8E4` | calc_happiness | GL | Multiple DAT_006a6xxx globals and DAT_0064f35e, DAT_0064f38a-0064f393 (city record fields) |
| `004EB327` | calc_trade_route_income | GL | DAT_006a65b0, DAT_006a6558, DAT_006a6570, DAT_006a65c8 (0x006A range) |
| `004EB4A1` | recalc_city_all | GL | All sub-function mutations (see above) |
| `004EB4ED` | calc_city_production (entry point) | GL | DAT_0062ee08 (stores city index), plus all sub-function mutations |
| `004FA82D` | event_action_flag_no_schism | GL | DAT_006a9110 (0x006AXXXX game state) |
| `004FA944` | event_action_change_money | GL | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX) |
| `004FABA6` | event_action_make_aggression | GL | Indirect via thunk_FUN_00579c40 which modifies treaty/diplomacy state |
| `004FAD02` | event_action_destroy_civ | GL | Writes DAT_0064b1ac (game end flag, 0x0064XXXX) |
| `004FADFB` | event_action_give_tech | GL | Indirect via thunk_FUN_004bf05b which writes to tech tables (0x0065XXXX) |
| `004FAED4` | event_action_create_unit | GL | Writes DAT_006560f4, DAT_00656100 (unit data, 0x0065XXXX) |
| `004FB29F` | event_action_move_unit | GL | Writes DAT_006560ff, DAT_006560fc, DAT_00656102, DAT_00656104 (unit data, 0x0065XXXX) |
| `004FB5B2` | event_action_change_terrain | GL | Extensive writes to map tile data (0x006AXXXX), city data (0x0064XXXX), unit data (0x0065XXXX), D... |
| `004FBE84` | event_check_negotiation | GL | Indirect via dispatch_actions |
| `004FC2BB` | event_check_city_taken | GL | Indirect via dispatch_actions |
| `004FC3AE` | event_dispatch_actions | GL | Indirect via all called action functions |
| `00501819` | citywin_click_citizen | MIXED | Indirect via thunk_FUN_004e7549 which writes to city specialist data (0x0064XXXX) |
| `005022C0` | citywin_click_resource_map | MIXED | Writes DAT_0064f370 + city * 0x58 (city tile workers, 0x0064XXXX) |
| `00509590` | handle_city_disorder_00509590 | MIXED | Writes DAT_00655aee (game flags, 0x0065XXXX), DAT_00655af4 (tutorial flags, 0x0065XXXX) |
| `0051EA8E` | game_timer_dialog | MIXED | - DAT_00654b70 (0x0065XXXX): Turn timer in milliseconds (0, 30000, 60000, 120000, 180000, 300000,... |
| `005218CB` | mp_scenario_load_dialog | MIXED | Extensive writes to game state: - DAT_00655aea (game flags at 0x0065XXXX) - DAT_00655af2 (game fl... |
| `0052DA23` | parley_reject_proposals | MIXED | Sends network messages that will cause game state changes on the receiving end: - Message 0xA6: r... |
| `0052DB3D` | parley_accept_proposals | MIXED | Sends network messages: - Message 0xA5: accept proposal - Message 0xA7: accept counter-proposal |
| `0052DD73` | parley_advance_negotiation | MIXED | - Calls thunk_FUN_00467750 which modifies diplomatic relations (DAT_0064c6c0 at 0x0064XXXX) - All... |
| `0052E4C9` | parley_on_accept_deal | MIXED | Sends network message 0x83 (deal acceptance) which will trigger game state changes. |
| `0052E57C` | parley_on_reject_deal | MIXED | Sends network message 0x84 (deal rejection). |
| `0052E685` | parley_on_end_negotiations | MIXED | Sends network message 0x85 (end negotiations). |
| `0055BBC0` | calc_war_readiness | GL | DAT_006ab5e4/e0/e8/ec (war readiness counters), DAT_006560f4 (unit fortification flag bit 0x20 se... |
| `0055C066` | set_government_type | GL | DAT_0064c6b5, DAT_0064c6c0 (embassy flags), DAT_00655aee, DAT_0064f379 — all game state |
| `0055C3D3` | revolution_dialog | MIXED | Via thunk_FUN_0055c066 (government change). DAT_00655af4 /= 0x20 (tutorial flag). |
| `0055C69D` | ai_revolution_notification | GL | DAT_0064c6a0, DAT_0064c6b4 — game state |
| `0055D1E2` | ai_tech_exchange | GL | Tech data via thunk_FUN_004bf05b, treaty flags (0x40000 tech exchange marker) via thunk_FUN_00467825 |
| `0055D685` | check_join_war | GL | DAT_0064ca82 (last contact dates), treaty flags via thunk_FUN_00467825 (0x2000 = war declaration) |
| `0055D8D8` | process_diplomatic_contact | GL | Extensive treaty/diplomacy state writes across 0x0064/0x0065/0x0063/0x0067 ranges. |
| `0055F5A3` | ai_choose_government | AI | DAT_0064ca7e/80 (AI preference overrides) — game state |
| `00579C40` | diplomacy_check_treaty_violation | GL | YES — writes to DAT_0064c6c0 + offsets (0x0064 range, per-civ treaty flags). Sets 0x2000 flag via... |
| `00596EEC` | spaceship_recalc_stats | GL | YES — writes to DAT_0064caa0 (spaceship flags, 0x0064), DAT_0064caa2/a4/a6 (arrival/support data)... |
| `005973FD` | spaceship_launch (internal — called after all checks pass) | GL | YES — writes to DAT_0064caa0 (0x0064, spaceship flags), DAT_00655afc (0x0065, launch turn), DAT_0... |
| `0059A733` | rng_next_float | GL | YES — writes DAT_00635094 (RNG state, 0x0063 range). |
| `0059A791` | rng_range | GL | YES — indirectly via rng_next_float modifying DAT_00635094. |
| `005B2590` | validate_unit_stack | GL | - DAT_00656106/00656108 (unit prev/next pointers): may be set to 0xffff to fix broken stacks (0x0... |
| `005B29D7` | get_unit_hp_remaining | GL | DAT_006560fa[param_1 * 0x20] = 0 when hitpoint flag not set (0x0065XXXX) |
| `005B2F50` | set_unit_goto_order | GL | DAT_006560ff, DAT_00656102 (0x0065XXXX) |
| `005B319E` | pick_up_unit_005b319e | GL | - DAT_006560f0/f2: unit position set to negative offscreen coords (0x0065XXXX) - DAT_00656106/006... |
| `005B345F` | put_down_unit | GL | - DAT_006560f0/f2: position set (0x0065XXXX) - DAT_00656106/00656108: linked to existing stack (0... |
| `005B36DF` | relocate_unit | GL | Via pick_up_unit + put_down_unit (0x0065XXXX, 0x006AXXXX) |
| `005B3AE0` | relocate_all_units | GL | Via relocate_unit for each unit (0x0065XXXX, 0x006AXXXX) |
| `005B3B78` | eject_air_units | GL | Via relocate_unit |
| `005B3D06` | create_unit | GL | - DAT_00655b16: incremented if new slot needed (0x0065XXXX) - DAT_0064c706[civ]: military unit co... |
| `005B4391` | delete_unit | GL | - DAT_0065610a[unit]: set to 0 (0x0065XXXX) - DAT_00655b16: decremented (0x0065XXXX) - DAT_0064c7... |
| `005B47FA` | delete_all_units_in_stack | GL | Via delete_unit for each |
| `005B490E` | set_unit_seen_by | GL | DAT_006560f9 (0x0065XXXX) |
| `005B496E` | set_stack_seen_by | GL | DAT_006560f9 for each unit (0x0065XXXX) |
| `005B4B66` | check_adjacent_enemy_simple | GL | DAT_006ced4c (0x006CXXXX) |
| `005B4C63` | check_adjacent_enemy_continent | GL | DAT_006ced4c (0x006CXXXX) |
| `005B542E` | load_unit_onto_ship | GL | - DAT_006560f4: flag bits 0x1000 set/cleared (0x0065XXXX) - DAT_006560ff: orders changed to goto ... |
| `005B5BAB` | stack_unit | GL | Via load_unit_onto_ship and relocate_unit |
| `005B5D93` | delete_unit_safely | GL | Via delete_unit, delete_all_units_in_stack, load_unit_onto_ship |
| `005B6042` | delete_unit_visible | GL | Via delete_unit_safely |
| `005B6787` | refresh_unit_movement | GL | DAT_006560f8 (0x0065XXXX) |
| `005B67AF` | find_nearest_unit | GL | DAT_006ced50 (0x006CXXXX — pathfinding scratch) |
| `005B8B1A` | update_civ_visibility | GL | Civ visibility data at 0x006365c0[civ] (via set_civ_tile_data) |
| `005B94FC` | set_tile_improvement_bits | GL | Tile byte 1 (0x006AXXXX via tile pointer) |
| `005B976D` | set_tile_visibility_bits | GL | Tile byte 4 (0x006AXXXX) |
| `005B98B7` | set_tile_fertility | GL | Tile byte 5 lower nibble (0x006AXXXX) |
| `005B99E8` | set_tile_owner | GL | Tile byte 5 upper nibble (0x006AXXXX) |
| `005B9C49` | set_tile_city_radius_owner | GL | Tile byte 2 (0x006AXXXX) |
| `005B9D81` | set_civ_tile_data | GL | Civ visibility data (0x006365c0 array, points into allocated map memory) |
| `005B9EC6` | begin_map_batch | GL | DAT_006d1190 batch buffer (0x006DXXXX), DAT_006365f4, DAT_006ad699, DAT_006ad69a |
| `005B9F1C` | end_map_batch | GL | DAT_006d1190 batch buffer cleared (0x006DXXXX) |
| `005B9FDE` | queue_map_update | GL | DAT_006d1190 batch buffer (0x006DXXXX) |
