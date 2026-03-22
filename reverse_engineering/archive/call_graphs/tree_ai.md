# AI Entry Point Call Graph Trees

Generated from `graph_data.json` — Civ2 MGE binary (civ2.exe) function call graph.

## Header Stats

**Total unique functions reachable from AI entry points:** 1122

| Category | Count |
|----------|-------|
| AI | 28 |
| GL | 280 |
| MIXED | 15 |
| UI | 501 |
| FW | 298 |
| **Total** | **1122** |

**State-mutating functions reachable:** 212

### Per Entry Point

| Entry Point | Address | Size | Reachable | AI | GL | MIXED | UI | FW | Mutating |
|-------------|---------|------|-----------|----|----|-------|----|----|----------|
| ai_process_civ_turn | 0053184D | 14665B | 732 | 13 | 168 | 7 | 330 | 214 | 90 |
| ai_unit_turn_master | 00538A29 | 44777B | 1119 | 25 | 280 | 15 | 501 | 298 | 209 |
| ai_choose_city_production | 00498E8B | 29400B | 364 | 3 | 141 | 1 | 146 | 73 | 59 |
| ai_barbarian_unit_turn | 005351AA | 6102B | 569 | 6 | 118 | 2 | 275 | 168 | 59 |

## Legend

- **Categories**: AI = AI logic, GL = Game Logic, MIXED = UI+Logic, UI = User Interface, FW = Framework/CRT
- `*** STATE MUTATION ***` = function modifies game state (units, cities, map, diplomacy, etc.)
- FW functions filtered out at depth > 2
- Summaries shown at depth <= 3
- Max tree depth: 6
- `(see above)` = already expanded earlier in same tree

---

## ai_process_civ_turn (`0053184D`, 14665B)

Reachable: 732 functions (90 state-mutating)

```
ai_process_civ_turn [AI] (14665B) *** STATE MUTATION *** — The main AI turn processing function
├── is_tile_valid [GL] — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── find_nearest_city [GL] — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   ├── is_tile_valid [GL] (see above)
│   ├── has_building [GL] — Checks if a city has a specific building
│   │   └── bit_index_to_byte_mask [GL] — Converts a bit index to byte offset and bit mask
│   ├── calc_movement_cost [GL] — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   ├── distance_x_wrapped [GL] — Computes the minimum X distance between two points, accounting for map wrapping on cylindrical maps.
│   │   └── diagonal_movement_cost [GL] — Computes a diagonal movement cost from dx/dy
│   └── get_tile_continent_if_land [GL] — Returns continent ID only if tile is not ocean, otherwise -1.
│       ├── is_tile_ocean [GL] — Returns true if terrain type == 10 (ocean).
│       │   └── get_tile_terrain_raw [GL]
│       │       └── get_tile_ptr [GL]
│       │           └── is_tile_valid [GL] (see above)
│       └── get_tile_continent [GL] — Returns byte 3 of tile data (continent/landmass ID).
│           └── get_tile_ptr [GL] (see above)
├── has_building [GL] (see above)
├── reassign_all_city_production [GL] *** STATE MUTATION *** — Reassigns production for all cities belonging to a specific civ (param_1)
│   ├── change_city_production [MIXED] *** STATE MUTATION *** — Changes a city's production item
│   │   ├── select_list_item [UI] — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │   └── popup_show_modal [UI]
│   │   │       ├── flush_display [UI]
│   │   │       ├── process_messages [UI]
│   │   │       ├── get_view_window_handle [UI]
│   │   │       ├── get_edit_text [UI]
│   │   │       ├── init_palette_system [UI]
│   │   │       ├── unknown — manage window [UI]
│   │   │       ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │   │       │   ├── unknown (get drawing context) [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── widget_scrollbar_dtor [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   └── widget_dropdown_dtor [UI]
│   │   │       ├── popup_paint [UI]
│   │   │       │   ├── end_paint [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── show_window_wrapper [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── set_rect_abs [UI]
│   │   │       │   ├── set_rect_wh [UI]
│   │   │       │   ├── measure_text_height [UI]
│   │   │       │   ├── control_invalidate [UI]
│   │   │       │   ├── draw_border_rect [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── scale_sprite [UI]
│   │   │       │   ├── set_sprite_scale [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── init_editor_scrollbar [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── widget_get_height [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── widget_inflate_rect_neg [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   ├── popup_get_padded_height [UI]
│   │   │       │   ├── popup_render_label [UI]
│   │   │       │   │   └── ... (3 more)
│   │   │       │   ├── popup_layout_text [UI]
│   │   │       │   │   └── ... (2 more)
│   │   │       │   ├── popup_layout_dialog [UI]
│   │   │       │   │   └── ... (15 more)
│   │   │       │   ├── popup_redraw_visible_items [UI]
│   │   │       │   │   └── ... (8 more)
│   │   │       │   ├── popup_create_window [UI]
│   │   │       │   │   └── ... (5 more)
│   │   │       │   ├── popup_init_controls [UI]
│   │   │       │   │   └── ... (29 more)
│   │   │       │   ├── popup_draw_background [UI]
│   │   │       │   │   └── ... (5 more)
│   │   │       │   ├── unknown (popup_draw_icon) [UI]
│   │   │       │   ├── draw_3d_border [UI]
│   │   │       │   │   └── ... (2 more)
│   │   │       │   ├── port_draw_text_styled [UI]
│   │   │       │   │   └── ... (2 more)
│   │   │       │   ├── port_fill_rect_pattern [UI]
│   │   │       │   │   └── ... (2 more)
│   │   │       │   ├── unknown (set/get draw color) [UI]
│   │   │       │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   └── unknown (invalidate_all_children) [UI]
│   │   │       ├── unknown (popup_get_item_text) [UI]
│   │   │       ├── unknown (popup_get_edit_text) [UI]
│   │   │       └── modal_dialog_run [UI]
│   │   │           ├── process_messages [UI] (see above)
│   │   │           ├── get_view_window_handle [UI] (see above)
│   │   │           ├── disable_parent_window [UI]
│   │   │           └── enable_parent_window [UI]
│   │   ├── show_message [UI] — Stores a message string in the message buffer at the specified slot index.
│   │   ├── set_improvement_name_string [UI] — Sets a dialog string control to an improvement/building name
│   │   │   └── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   ├── dialog_set_title [UI] — Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │   └── dialog_set_title_impl [UI]
│   │   ├── civ_has_active_wonder [GL] — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   │   │   └── get_wonder_city [GL]
│   │   │       └── is_wonder_obsolete [GL]
│   │   │           └── civ_has_tech [GL]
│   │   ├── get_civ_people_name [GL] — Returns the people name for a civilization (e.g., "Roman")
│   │   ├── ai_choose_city_production [AI] *** STATE MUTATION *** — The massive AI city production decision function
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── show_message [UI] (see above)
│   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   └── show_help_topic [UI]
│   │   │   │       └── show_help_topic_ext [UI]
│   │   │   │           └── ... (1 more)
│   │   │   ├── has_building [GL] (see above)
│   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   └── bit_index_to_byte_mask [GL] (see above)
│   │   │   ├── city_adjacent_to_continent [GL]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   ├── find_best_coastal_continent [GL]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   ├── is_wonder_obsolete [GL] (see above)
│   │   │   ├── get_wonder_city [GL] (see above)
│   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   ├── has_spaceship_launched [GL]
│   │   │   ├── has_spaceship_built [GL]
│   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   ├── can_build_unit_type [GL]
│   │   │   │   └── civ_has_tech [GL] (see above)
│   │   │   ├── can_build_improvement [GL]
│   │   │   │   ├── has_building [GL] (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   └── can_build_wonder [GL]
│   │   │   │       └── civ_has_tech [GL] (see above)
│   │   │   ├── is_tile_worked [GL]
│   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   ├── evaluate_city_tiles [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   └── get_tile_improvements [GL]
│   │   │   │   ├── calc_capital_distance_and_corruption [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── has_building [GL] (see above)
│   │   │   │   │   ├── check_trade_route_path [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   ├── is_tile_worked [GL] (see above)
│   │   │   │   │   ├── calc_movement_cost [GL] (see above)
│   │   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   │   ├── calc_shields_per_row [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── check_unit_support [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_food_box_size [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   │   └── recalc_city_all [GL] *** STATE MUTATION ***
│   │   │   │       ├── assign_worker_tiles [GL] *** STATE MUTATION ***
│   │   │   │       │   └── ... (4 more)
│   │   │   │       ├── sync_worker_tile_status [GL] *** STATE MUTATION ***
│   │   │   │       │   └── ... (2 more)
│   │   │   │       ├── calc_city_production [GL] *** STATE MUTATION ***
│   │   │   │       │   └── ... (1 more)
│   │   │   │       ├── calc_happiness [GL] *** STATE MUTATION ***
│   │   │   │       │   └── ... (4 more)
│   │   │   │       └── calc_trade_route_income [GL] *** STATE MUTATION ***
│   │   │   ├── spaceship_ai_evaluate [AI]
│   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── spaceship_get_category_count [GL]
│   │   │   │   │   └── spaceship_get_max_component [GL]
│   │   │   │   ├── spaceship_get_raw_count [GL]
│   │   │   │   ├── spaceship_get_clamped_category [GL]
│   │   │   │   │   └── spaceship_get_clamped_count [GL]
│   │   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_year_from_turn [GL]
│   │   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   ├── spaceship_get_clamped_count [GL] (see above)
│   │   │   │   │   └── spaceship_calc_population_capacity [GL]
│   │   │   │   ├── unknown (spaceship section complete check) [GL]
│   │   │   │   │   ├── spaceship_get_max_category [GL]
│   │   │   │   │   └── spaceship_get_raw_count [GL] (see above)
│   │   │   │   └── spaceship_can_build_category [GL]
│   │   │   │       ├── civ_has_tech [GL] (see above)
│   │   │   │       ├── spaceship_get_raw_count [GL] (see above)
│   │   │   │       ├── unknown (spaceship section complete check) [GL] (see above)
│   │   │   │       └── unknown (spaceship category full check) [GL]
│   │   │   ├── spaceship_is_enabled [GL]
│   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   └── spaceship_is_enabled [GL] (see above)
│   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   └── rng_next_float [GL] *** STATE MUTATION ***
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   ├── tile_distance_xy [GL] (see above)
│   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   └── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │   │   │       └── get_unit_max_hp [GL] (see above)
│   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   └── calc_unit_movement_points [GL] (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   ├── net_send_to_player [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_broadcast [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_msg_init_header [GL]
│   │   │   │   │   ├── net_msg_init_with_name [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── net_msg_init_with_version [GL]
│   │   │   │   │   ├── unknown (init version message) [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── unknown (init chat/popup message) [GL]
│   │   │   │   │   ├── unknown (init type-4 message) [GL]
│   │   │   │   │   ├── unknown (init type-6 message) [GL]
│   │   │   │   │   ├── unknown (init type-0x13 message) [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── unknown (init type-0x69 message) [GL]
│   │   │   │   │   ├── diff_engine_serialize_game [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   ├── diff_engine_serialize_partial [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   ├── diff_engine_serialize_full_compressed [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (4 more)
│   │   │   │   │   ├── diff_engine_serialize_changed_only [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── unknown (dialog_render_title_bar) [UI]
│   │   │   │   │   │   └── ... (9 more)
│   │   │   │   │   └── netmgr_build_packet [GL]
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_invert_mirror [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   └── rle_encode (unnamed) [GL]
│   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   └── get_tile_ptr [GL] (see above)
│   │   │   │   └── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │       ├── is_tile_valid [GL] (see above)
│   │   │   │       ├── show_dialog_message [UI] (see above)
│   │   │   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │       ├── find_first_unit_at [GL]
│   │   │   │       │   └── ... (1 more)
│   │   │   │       └── get_tile_ptr [GL] (see above)
│   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │   └── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_unit_owner_at [GL]
│   │   │   │       ├── get_tile_owner [GL]
│   │   │   │       └── get_tile_improvements [GL] (see above)
│   │   │   ├── sum_stack_property [GL]
│   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   └── get_first_unit_in_stack [GL]
│   │   │   │       └── validate_unit_stack [GL] *** STATE MUTATION ***
│   │   │   ├── count_units_by_role [GL]
│   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   └── get_first_unit_in_stack [GL] (see above)
│   │   │   ├── is_unit_active [GL]
│   │   │   │   └── get_unit_moves_remaining [GL] (see above)
│   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   └── calc_unit_movement_points [GL] (see above)
│   │   │   ├── check_unit_can_improve [GL]
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── check_adjacent_water [GL]
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   ├── get_tile_continent [GL] (see above)
│   │   │   ├── get_unit_owner_at [GL] (see above)
│   │   │   ├── check_tile_resource [GL]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   └── get_tile_ptr [GL] (see above)
│   │   │   ├── (count_techs_discovered) [GL]
│   │   │   │   └── (check_tech_bit) [GL]
│   │   │   │       └── bit_index_to_byte_mask [GL] (see above)
│   │   │   ├── get_tile_improvements [GL] (see above)
│   │   │   └── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │       ├── get_tile_ptr [GL] (see above)
│   │   │       └── queue_map_update [GL] *** STATE MUTATION ***
│   │   │           └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── calc_food_box_with_difficulty [GL] — Calculates adjusted food box size based on difficulty
│   │   │   └── classify_production_type [GL]
│   │   ├── enqueue_mp_event [MIXED] — Enqueues a multiplayer event message
│   │   │   └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── popup_dialog_create [UI] — Creates a new popup dialog object
│   │   │   ├── unknown (popup list init) [UI]
│   │   │   └── popup_dialog_reset [UI]
│   │   ├── popup_dialog_close [UI] — Closes a popup dialog by destroying it and clearing its list control.
│   │   │   └── popup_dialog_destroy [UI] *** STATE MUTATION *** (see above)
│   │   ├── popup_add_button [UI] — Adds a button to the popup dialog
│   │   │   ├── measure_text_height [UI] (see above)
│   │   │   └── init_editor_scrollbar [UI] (see above)
│   │   └── get_tile_continent [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── civ_has_active_wonder [GL] (see above)
├── should_declare_war [GL] — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   └── get_attitude_raw [GL] — Returns the raw attitude value of civ param_1 toward civ param_2.
├── network_poll [MIXED] *** STATE MUTATION *** (see above)
├── ai_remove_goals_near [AI] *** STATE MUTATION *** — Removes AI goal_b entries near a specified location
│   └── calc_movement_cost [GL] (see above)
├── ai_add_goal_a [AI] *** STATE MUTATION *** — Adds a goal to AI goal list A
│   ├── ai_shift_goals_down_a [AI] *** STATE MUTATION *** — Recursively shifts AI goal_a entries down by one position starting from param_2
│   │   └── ai_shift_goals_down_a [AI] *** STATE MUTATION *** (see above)
│   ├── calc_movement_cost [GL] (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── is_unit_active [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── ai_add_goal_b [AI] *** STATE MUTATION *** — Adds a goal to AI goal list B (16 entries)
│   └── ai_shift_goals_down_b [AI] *** STATE MUTATION *** — Shifts AI goal_b entries down (iterative)
├── ai_decay_and_merge_goals [AI] *** STATE MUTATION *** — Decays AI goal priorities (negates negative ones = removes expired goals) and merges goal list B into goal list A.
│   ├── ai_negate_goal_priority [AI] *** STATE MUTATION *** — Negates the priority of an AI goal entry
│   └── ai_add_goal_a [AI] *** STATE MUTATION *** (see above)
├── civ_has_tech [GL] (see above)
├── calc_shields_per_row [GL] *** STATE MUTATION *** (see above)
├── ai_set_goto_order [AI] *** STATE MUTATION *** — Sets a goto order on a unit
├── ai_choose_government [AI] *** STATE MUTATION *** — AI government selection logic
│   ├── check_govt_available [GL] — Checks if a specific government type is available for a civ
│   │   ├── civ_has_active_wonder [GL] (see above)
│   │   └── civ_has_tech [GL] (see above)
│   └── ai_revolution_notification [GL] *** STATE MUTATION *** — Handles AI revolution/government change notifications
│       ├── show_message [UI] (see above)
│       ├── show_dialog_message [UI] (see above)
│       ├── mp_set_string_control [UI] *** STATE MUTATION *** (see above)
│       ├── set_improvement_name_string [UI] (see above)
│       ├── civ_has_active_wonder [GL] (see above)
│       ├── get_civ_noun_name [GL] — Returns the noun name for a civilization (e.g., "Romans")
│       ├── get_civ_leader_title [GL] — Returns the leader title for a civilization based on civ type and government
│       ├── get_civ_adjective_name [GL] — Returns the adjective form of a civilization name
│       ├── enqueue_mp_event [MIXED] (see above)
│       ├── set_government_type [GL] *** STATE MUTATION *** — Sets a civ's government type
│       │   ├── show_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│       │   │   ├── open_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│       │   │   │   ├── show_window_wrapper [UI] (see above)
│       │   │   │   ├── set_rect_wh [UI] (see above)
│       │   │   │   ├── get_max_tax_rate [GL]
│       │   │   │   ├── balance_tax_rates [GL]
│       │   │   │   ├── taxrate_recalc_totals [MIXED] *** STATE MUTATION ***
│       │   │   │   │   └── ... (2 more)
│       │   │   │   ├── process_messages [UI] (see above)
│       │   │   │   ├── get_font_height [UI]
│       │   │   │   ├── measure_text_height [UI] (see above)
│       │   │   │   ├── set_dialog_enabled [UI]
│       │   │   │   ├── create_text_button [UI]
│       │   │   │   │   └── ... (2 more)
│       │   │   │   ├── set_button_owner [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── set_button_handler [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── set_button_click_callback [UI]
│       │   │   │   ├── create_checkbox [UI]
│       │   │   │   │   └── ... (2 more)
│       │   │   │   ├── set_checkbox_callback [UI]
│       │   │   │   ├── set_checkbox_value [UI]
│       │   │   │   ├── create_scrollbar [UI]
│       │   │   │   │   └── ... (3 more)
│       │   │   │   ├── scrollbar_set_position [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── scrollbar_set_range [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── scrollbar_set_callback [UI]
│       │   │   │   ├── dialog_repaint_check [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── save_civ2_dat [GL]
│       │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION *** (see above)
│       │   │   │   ├── citywin_refresh_top_panels [UI]
│       │   │   │   │   └── ... (2 more)
│       │   │   │   ├── dialog_create [UI]
│       │   │   │   │   └── ... (6 more)
│       │   │   │   ├── refresh_status_panel [UI]
│       │   │   │   │   └── ... (6 more)
│       │   │   │   ├── set_active_surface [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── load_gif_resource [UI]
│       │   │   │   │   └── ... (5 more)
│       │   │   │   ├── modal_dialog_run [UI] (see above)
│       │   │   │   └── palette_init [UI]
│       │   │   │       └── ... (2 more)
│       │   │   └── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   └── calc_city_production (entry point) [GL] *** STATE MUTATION *** (see above)
│       └── revolution_dialog [MIXED] *** STATE MUTATION *** — Revolution/government change dialog
│           ├── text_begin [UI]
│           ├── select_list_item [UI] (see above)
│           ├── display_improvement [UI]
│           ├── show_dialog_message [UI] (see above)
│           ├── get_civ_name [UI]
│           │   └── get_civ_adjective_name [GL] (see above)
│           ├── set_improvement_name_string [UI] (see above)
│           ├── dialog_set_title [UI] (see above)
│           ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│           ├── play_sound_effect [UI] *** STATE MUTATION ***
│           │   ├── flush_display [UI] (see above)
│           │   └── rng_range [GL] *** STATE MUTATION *** (see above)
│           ├── unknown (tutorial_show_city_screen) [UI]
│           ├── get_civ_noun_name [GL] (see above)
│           ├── get_civ_leader_title [GL] (see above)
│           ├── set_government_type [GL] *** STATE MUTATION *** (see above)
│           ├── check_govt_available [GL] (see above)
│           ├── popup_dialog_create [UI] (see above)
│           └── popup_add_radio_option [UI]
│               ├── measure_text_height [UI] (see above)
│               └── popup_get_button_width [UI]
├── clamp [FW] — Clamps a value to [min, max] range
├── tile_distance_xy [GL] (see above)
├── calc_movement_cost [GL] (see above)
├── get_unit_max_hp [GL] (see above)
├── get_unit_hp_remaining [GL] *** STATE MUTATION *** (see above)
├── get_unit_moves_remaining [GL] (see above)
├── get_next_unit_in_stack [GL] (see above)
├── find_unit_stack_at_xy [GL] (see above)
├── set_unit_goto_order [GL] *** STATE MUTATION *** — Sets a unit's order to "goto" (3)
├── relocate_unit [GL] *** STATE MUTATION *** (see above)
├── relocate_unit_in_place [GL] *** STATE MUTATION *** — Relocates a unit to its own current position (used to refresh stack linkage).
│   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
├── check_adjacent_enemy_simple [GL] *** STATE MUTATION *** — Simple check for adjacent enemy units — no ocean/continent checks
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   └── get_unit_owner_at [GL] (see above)
├── check_adjacent_enemy_continent [GL] *** STATE MUTATION *** (see above)
├── sum_stack_property [GL] (see above)
├── count_units_by_role [GL] (see above)
├── delete_unit_visible [GL] *** STATE MUTATION *** — Deletes a unit and refreshes the map display at its former position
│   ├── is_tile_valid [GL] (see above)
│   ├── show_dialog_message [UI] (see above)
│   ├── get_tick_count_wrapper [FW] — Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── unknown (get mp object byte) [FW] — Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] — Updates a single tile for all active players.
│   │   └── update_map_tile [UI] — Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] *** STATE MUTATION ***
│   │           ├── tile_to_screen [UI]
│   │           │   └── wrap_x [GL] (see above)
│   │           ├── is_tile_visible [UI]
│   │           │   └── is_tile_in_viewport_rect [UI]
│   │           │       └── ... (1 more)
│   │           ├── redraw_tile_area [UI]
│   │           │   ├── draw_complete_tile [UI]
│   │           │   │   └── ... (5 more)
│   │           │   ├── is_tile_visible [UI] (see above)
│   │           │   ├── draw_city_labels [UI]
│   │           │   │   └── ... (5 more)
│   │           │   ├── calc_tile_group_rect [UI]
│   │           │   │   └── ... (1 more)
│   │           │   ├── wrap_x [GL] (see above)
│   │           │   └── port_set_rect [UI]
│   │           ├── invalidate_tile_area [UI]
│   │           │   ├── invalidate_region [UI] (see above)
│   │           │   └── calc_tile_group_rect [UI] (see above)
│   │           ├── reset_sprite_scale [UI]
│   │           │   └── scale_table_build_primary [UI]
│   │           ├── set_current_zoom_scale [UI]
│   │           │   └── set_sprite_scale [UI] (see above)
│   │           └── unknown (sprite blit wrapper 1) [UI] (see above)
│   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   └── delete_unit_safely [GL] *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units
│       ├── is_tile_valid [GL] (see above)
│       ├── show_dialog_message [UI] (see above)
│       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│       ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** — Deletes every unit in a stack by iterating from first to last.
│       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       │   ├── get_next_unit_in_stack [GL] (see above)
│       │   ├── get_first_unit_in_stack [GL] (see above)
│       │   └── delete_unit [GL] *** STATE MUTATION *** (see above)
│       ├── load_unit_onto_ship [GL] *** STATE MUTATION *** — Loads ground/air units onto a transport ship
│       │   ├── is_tile_valid [GL] (see above)
│       │   ├── show_dialog_message [UI] (see above)
│       │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       │   ├── get_next_unit_in_stack [GL] (see above)
│       │   ├── get_first_unit_in_stack [GL] (see above)
│       │   ├── set_unit_goto_order [GL] *** STATE MUTATION *** (see above)
│       │   ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│       │   ├── eject_air_units [GL] *** STATE MUTATION ***
│       │   │   ├── get_next_unit_in_stack [GL] (see above)
│       │   │   ├── get_first_unit_in_stack [GL] (see above)
│       │   │   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
│       │   ├── is_tile_ocean [GL] (see above)
│       │   └── get_tile_continent [GL] (see above)
│       └── is_tile_ocean [GL] (see above)
├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
├── get_tile_terrain_raw [GL] (see above)
├── is_tile_ocean [GL] (see above)
├── get_tile_continent [GL] (see above)
├── get_tile_continent_if_land [GL] (see above)
├── get_city_owner_at [GL] (see above)
├── get_unit_owner_at [GL] (see above)
├── check_tile_goody_hut [GL] — Checks if a tile has a goody hut (village)
│   ├── is_tile_valid [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   └── get_tile_owner [GL] (see above)
└── get_tile_improvements [GL] (see above)
```

## ai_unit_turn_master (`00538A29`, 44777B)

Reachable: 1119 functions (209 state-mutating)

```
ai_unit_turn_master [AI] (44777B) *** STATE MUTATION *** — The master AI unit turn function — the single largest function in the entire binary at 44,777 bytes
├── 0000C679 [?]
├── is_tile_valid [GL] — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── find_nearest_city [GL] — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   ├── is_tile_valid [GL] (see above)
│   ├── has_building [GL] — Checks if a city has a specific building
│   │   └── bit_index_to_byte_mask [GL] — Converts a bit index to byte offset and bit mask
│   ├── calc_movement_cost [GL] — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   ├── distance_x_wrapped [GL] — Computes the minimum X distance between two points, accounting for map wrapping on cylindrical maps.
│   │   └── diagonal_movement_cost [GL] — Computes a diagonal movement cost from dx/dy
│   └── get_tile_continent_if_land [GL] — Returns continent ID only if tile is not ocean, otherwise -1.
│       ├── is_tile_ocean [GL] — Returns true if terrain type == 10 (ocean).
│       │   └── get_tile_terrain_raw [GL]
│       │       └── get_tile_ptr [GL]
│       │           └── is_tile_valid [GL] (see above)
│       └── get_tile_continent [GL] — Returns byte 3 of tile data (continent/landmass ID).
│           └── get_tile_ptr [GL] (see above)
├── has_building [GL] (see above)
├── city_adjacent_to_continent [GL] — Checks if a city (param_1) is adjacent to a given continent (param_2)
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] — Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── is_tile_ocean [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── city_connected_to_continent [GL] — Checks if a city is connected to a specific continent via coastal adjacency or ocean connectivity
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   └── (check_tech_bit) [GL] — Checks if a specific technology has been discovered by a civ
│       └── bit_index_to_byte_mask [GL] (see above)
├── cities_share_coast [GL] — Checks if city param_1 and city param_2 share a coastal connection (both adjacent to the same ocean body)
│   ├── is_tile_valid [GL] (see above)
│   ├── city_adjacent_to_continent [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── adjust_attitude [GL] *** STATE MUTATION *** — Adjusts the attitude value between two civs by a delta
│   ├── get_attitude_raw [GL] — Returns the raw attitude value of civ param_1 toward civ param_2.
│   └── set_attitude_value [GL] *** STATE MUTATION *** — Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100
├── get_attitude_raw [GL] (see above)
├── should_declare_war [GL] — Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   └── get_attitude_raw [GL] (see above)
├── update_map_area_all_players [UI] — Updates a map area for all active players (all viewports in MP).
│   └── update_map_area [UI] *** STATE MUTATION *** — Redraws a map area and optionally invalidates it
│       ├── tile_to_screen [UI] — Converts map tile coordinates to screen pixel coordinates
│       │   └── wrap_x [GL] (see above)
│       ├── is_tile_visible [UI] — Checks if a tile is within the current viewport's visible area
│       │   └── is_tile_in_viewport_rect [UI]
│       │       └── is_x_in_range [UI]
│       ├── redraw_tile_area [UI] — Redraws all tiles in a diamond-shaped area centered on (param_1, param_2) with radius param_3
│       │   ├── draw_complete_tile [UI]
│       │   │   ├── flush_display [UI]
│       │   │   ├── is_tile_valid [GL] (see above)
│       │   │   ├── tile_to_screen [UI] (see above)
│       │   │   ├── render_tile [UI]
│       │   │   │   ├── is_tile_valid [GL] (see above)
│       │   │   │   ├── grassland_has_shield [GL]
│       │   │   │   ├── get_civ_background_color [UI]
│       │   │   │   ├── scale_sprite [UI]
│       │   │   │   ├── calc_coast_quadrants [UI] *** STATE MUTATION ***
│       │   │   │   ├── is_x_in_range [UI] (see above)
│       │   │   │   ├── set_sprite_scale [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── reset_sprite_scale [UI]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── wrap_x [GL] (see above)
│       │   │   │   ├── diagonal_movement_cost [GL] (see above)
│       │   │   │   ├── get_next_unit_in_stack [GL]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── find_unit_stack_at_xy [GL]
│       │   │   │   │   └── ... (3 more)
│       │   │   │   ├── get_tile_ptr [GL] (see above)
│       │   │   │   ├── get_civ_vis_ptr [GL]
│       │   │   │   ├── get_tile_owner [GL]
│       │   │   │   ├── get_tile_explored [GL]
│       │   │   │   ├── get_city_owner_at [GL]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── check_tile_resource [GL]
│       │   │   │   ├── check_tile_goody_hut [GL]
│       │   │   │   ├── get_tile_improvements [GL]
│       │   │   │   ├── port_copy_rect [UI]
│       │   │   │   │   └── ... (7 more)
│       │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│       │   │   │       └── ... (1 more)
│       │   │   ├── render_city_on_map [UI]
│       │   │   │   ├── is_tile_valid [GL] (see above)
│       │   │   │   ├── find_city_at [GL]
│       │   │   │   ├── draw_city_sprite [UI]
│       │   │   │   │   └── ... (16 more)
│       │   │   │   └── get_tile_explored [GL] (see above)
│       │   │   ├── draw_units_at_tile [UI]
│       │   │   │   ├── is_tile_valid [GL] (see above)
│       │   │   │   ├── draw_unit_with_stacking [UI]
│       │   │   │   │   └── ... (4 more)
│       │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│       │   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│       │   │   │   ├── is_unit_ready_to_move [GL]
│       │   │   │   │   └── ... (1 more)
│       │   │   │   ├── get_tile_explored [GL] (see above)
│       │   │   │   └── get_city_owner_at [GL] (see above)
│       │   │   ├── reset_sprite_scale [UI] (see above)
│       │   │   ├── set_current_zoom_scale [UI]
│       │   │   │   └── set_sprite_scale [UI] (see above)
│       │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│       │   │   ├── calc_movement_cost [GL] (see above)
│       │   │   └── unknown (sprite blit wrapper 1) [UI] (see above)
│       │   ├── is_tile_visible [UI] (see above)
│       │   ├── draw_city_labels [UI]
│       │   │   ├── measure_text_height [UI]
│       │   │   ├── get_civ_foreground_color [UI]
│       │   │   ├── tile_to_screen [UI] (see above)
│       │   │   ├── is_tile_visible [UI] (see above)
│       │   │   ├── scale_at_current_zoom [UI]
│       │   │   │   └── scale_sprite [UI] (see above)
│       │   │   ├── tile_distance_xy [GL]
│       │   │   ├── get_tile_explored [GL] (see above)
│       │   │   ├── set_text_draw_source [UI]
│       │   │   ├── set_text_style [UI]
│       │   │   └── draw_text_with_shadow [UI]
│       │   │       ├── measure_text_height [UI] (see above)
│       │   │       ├── port_fill_rect_pattern [UI]
│       │   │       │   └── ... (2 more)
│       │   │       └── unknown (set/get draw color) [UI]
│       │   ├── calc_tile_group_rect [UI]
│       │   │   ├── set_rect_wh [UI]
│       │   │   ├── tile_to_screen [UI] (see above)
│       │   │   └── intersect_rect_wrapper [UI]
│       │   ├── wrap_x [GL] (see above)
│       │   └── port_set_rect [UI]
│       ├── invalidate_tile_area [UI] — Calculates the screen rectangle for a tile group and invalidates it (marks for repaint).
│       │   ├── invalidate_region [UI]
│       │   │   ├── blit_rect_to_screen [UI]
│       │   │   │   └── validate_window_rect [UI]
│       │   │   └── port_copy_to_screen_clipped [UI]
│       │   │       ├── rect_get_width [UI]
│       │   │       ├── rect_get_height [UI]
│       │   │       ├── get_view_window_handle [UI]
│       │   │       ├── get_surface_hwnd [UI]
│       │   │       ├── port_lock [UI]
│       │   │       │   └── ... (2 more)
│       │   │       ├── port_unlock [UI]
│       │   │       ├── port_select_palette [UI]
│       │   │       │   └── ... (1 more)
│       │   │       └── surface_is_locked [UI]
│       │   └── calc_tile_group_rect [UI] (see above)
│       ├── reset_sprite_scale [UI] (see above)
│       ├── set_current_zoom_scale [UI] (see above)
│       └── unknown (sprite blit wrapper 1) [UI] (see above)
├── network_poll [MIXED] *** STATE MUTATION *** (see above)
├── ai_remove_goals_near [AI] *** STATE MUTATION *** — Removes AI goal_b entries near a specified location
│   └── calc_movement_cost [GL] (see above)
├── ai_find_max_goal_priority [AI] — Finds the maximum absolute priority among AI goal_a entries matching the given location and type
├── ai_add_goal_a [AI] *** STATE MUTATION *** — Adds a goal to AI goal list A
│   ├── ai_shift_goals_down_a [AI] *** STATE MUTATION *** — Recursively shifts AI goal_a entries down by one position starting from param_2
│   │   └── ai_shift_goals_down_a [AI] *** STATE MUTATION *** (see above)
│   ├── calc_movement_cost [GL] (see above)
│   ├── get_unit_moves_remaining [GL] — Returns remaining movement points (total - spent)
│   │   └── calc_unit_movement_points [GL] — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │       ├── civ_has_active_wonder [GL]
│   │       │   └── get_wonder_city [GL]
│   │       │       └── is_wonder_obsolete [GL]
│   │       │           └── ... (1 more)
│   │       ├── civ_has_tech [GL]
│   │       │   └── bit_index_to_byte_mask [GL] (see above)
│   │       ├── get_unit_max_hp [GL]
│   │       └── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │           └── get_unit_max_hp [GL] (see above)
│   ├── is_unit_active [GL] — Returns 1 if a unit is "active" — alive, has valid position, not on goto, and has remaining movement.
│   │   └── get_unit_moves_remaining [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── ai_add_goal_b [AI] *** STATE MUTATION *** — Adds a goal to AI goal list B (16 entries)
│   └── ai_shift_goals_down_b [AI] *** STATE MUTATION *** — Shifts AI goal_b entries down (iterative)
├── civ_has_tech [GL] (see above)
├── unit_order_found_city [GL] *** STATE MUTATION *** — Founds a new city at the unit's location
│   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** — Iterates all 8 map views and scrolls each active view if the given position is near edges
│   │   └── scroll_map_if_needed [UI] — Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary
│   │       └── set_map_scroll_position [UI]
│   │           ├── redraw_entire_map [UI] *** STATE MUTATION ***
│   │           │   ├── minimap_full_redraw [UI]
│   │           │   │   └── ... (9 more)
│   │           │   ├── recalc_viewport_geometry [UI]
│   │           │   │   └── ... (3 more)
│   │           │   ├── redraw_full_viewport [UI]
│   │           │   │   └── ... (1 more)
│   │           │   ├── begin_end_paint_cycle [UI]
│   │           │   │   └── ... (1 more)
│   │           │   ├── unknown (dialog_render_title_bar) [UI]
│   │           │   │   └── ... (6 more)
│   │           │   └── dialog_create_buttons [UI]
│   │           │       └── ... (5 more)
│   │           └── wrap_x [GL] (see above)
│   ├── update_map_area_all_players [UI] (see above)
│   ├── delete_unit [GL] *** STATE MUTATION *** — Deletes a unit
│   │   ├── show_dialog_message [UI] — Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   ├── net_send_message [GL] *** STATE MUTATION *** — Central network message dispatcher
│   │   │   ├── invalidate_region [UI] (see above)
│   │   │   ├── net_send_to_player [GL] *** STATE MUTATION ***
│   │   │   ├── net_broadcast [GL] *** STATE MUTATION ***
│   │   │   ├── net_msg_init_header [GL]
│   │   │   ├── net_msg_init_with_name [GL]
│   │   │   │   └── net_msg_init_with_version [GL]
│   │   │   │       └── net_msg_init_header [GL] (see above)
│   │   │   ├── net_msg_init_with_version [GL] (see above)
│   │   │   ├── unknown (init version message) [GL]
│   │   │   │   ├── net_msg_init_with_name [GL] (see above)
│   │   │   │   └── netmgr_fill_game_info [GL]
│   │   │   ├── unknown (init chat/popup message) [GL]
│   │   │   │   └── net_msg_init_header [GL] (see above)
│   │   │   ├── unknown (init type-4 message) [GL]
│   │   │   │   └── net_msg_init_header [GL] (see above)
│   │   │   ├── unknown (init type-6 message) [GL]
│   │   │   │   └── net_msg_init_header [GL] (see above)
│   │   │   ├── unknown (init type-0x13 message) [GL]
│   │   │   │   ├── net_msg_init_header [GL] (see above)
│   │   │   │   └── netmgr_fill_game_info [GL] (see above)
│   │   │   ├── unknown (init type-0x69 message) [GL]
│   │   │   │   └── net_msg_init_header [GL] (see above)
│   │   │   ├── diff_engine_serialize_game [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL]
│   │   │   │   └── diff_engine_append_data [GL]
│   │   │   ├── diff_engine_serialize_partial [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (see above)
│   │   │   │   └── diff_engine_append_data [GL] (see above)
│   │   │   ├── diff_engine_serialize_full_compressed [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (see above)
│   │   │   │   ├── diff_engine_calc_total_size [GL]
│   │   │   │   ├── diff_engine_append_data [GL] (see above)
│   │   │   │   └── rle_encode (unnamed) [GL]
│   │   │   ├── diff_engine_serialize_changed_only [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_checksum [GL] (see above)
│   │   │   │   ├── diff_engine_calc_total_size [GL] (see above)
│   │   │   │   └── diff_engine_append_data [GL] (see above)
│   │   │   ├── unknown (dialog_render_title_bar) [UI] (see above)
│   │   │   └── netmgr_build_packet [GL]
│   │   │       └── net_msg_init_header [GL] (see above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** — Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── diff_engine_invert_mirror [GL] *** STATE MUTATION ***
│   │   │   │   └── diff_engine_copy_sections [GL] *** STATE MUTATION ***
│   │   │   └── rle_encode (unnamed) [GL] (see above)
│   │   └── pick_up_unit_005b319e [GL] *** STATE MUTATION *** — Removes a unit from its map tile stack
│   │       ├── is_tile_valid [GL] (see above)
│   │       ├── show_dialog_message [UI] (see above)
│   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │       └── get_tile_ptr [GL] (see above)
│   ├── update_civ_visibility [GL] *** STATE MUTATION *** — Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   │   ├── get_tile_ptr [GL] (see above)
│   │   └── set_civ_tile_data [GL] *** STATE MUTATION *** — Sets a civ's tile visibility byte
│   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       ├── get_civ_vis_ptr [GL] (see above)
│   │       └── queue_map_update [GL] *** STATE MUTATION ***
│   │           └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── set_tile_improvement_bits [GL] *** STATE MUTATION *** — Sets or clears improvement bits on a tile
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   └── queue_map_update [GL] *** STATE MUTATION *** (see above)
│   └── _strcpy_thunk [FW] — CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── unit_pillage [GL] *** STATE MUTATION *** — Pillages improvements on a tile
│   ├── find_nearest_city [GL] (see above)
│   ├── set_treaty_flags [GL] *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations
│   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations
│   │   │   └── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   └── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   ├── update_map_area_all_players [UI] (see above)
│   ├── ai_add_goal_a [AI] *** STATE MUTATION *** (see above)
│   ├── diplomacy_check_attack_allowed [GL] — Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   ├── show_message [UI] — Stores a message string in the message buffer at the specified slot index.
│   │   ├── show_dialog_message [UI] (see above)
│   │   ├── get_civ_name [UI] — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL]
│   │   ├── civ_has_active_wonder [GL] (see above)
│   │   ├── get_civ_people_name [GL] — Returns the people name for a civilization (e.g., "Roman")
│   │   └── check_can_declare_war [GL] — Checks if a civ can declare war
│   │       └── civ_has_active_wonder [GL] (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** — Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   └── calc_unit_movement_points [GL] (see above)
│   ├── get_tile_ptr [GL] (see above)
│   ├── update_civ_visibility [GL] *** STATE MUTATION *** (see above)
│   ├── get_tile_improvements [GL] (see above)
│   └── set_tile_improvement_bits [GL] *** STATE MUTATION *** (see above)
├── ai_find_nearest_city_or_transport [AI] *** STATE MUTATION *** — For AI units, finds the nearest friendly city or transport ship to go to
│   ├── tile_distance_xy [GL] (see above)
│   ├── calc_unit_movement_points [GL] (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   ├── get_tile_continent [GL] (see above)
│   └── get_fortress_owner_at [GL] — Returns the fortress-owning civ at a tile, or -1
│       ├── get_tile_owner [GL] (see above)
│       └── get_tile_improvements [GL] (see above)
├── pick_up_unit_004c9528 [GL] *** STATE MUTATION *** — Handles bribing/picking up an enemy unit — the player pays gold to convert an enemy unit to their side
│   ├── get_civ_name [UI] (see above)
│   ├── get_tick_count_wrapper [FW] — Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── mp_set_number_control [UI] *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
│   ├── set_improvement_name_string [UI] — Sets a dialog string control to an improvement/building name
│   │   └── mp_set_string_control [UI] *** STATE MUTATION *** — Sets a string control value in the multiplayer dialog string table
│   ├── find_nearest_city [GL] (see above)
│   ├── show_game_popup_2arg [UI] — Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   └── show_unit_type_picker [UI] — Shows a unit type picker dialog for the Civilopedia.
│   │       ├── select_list_item [UI]
│   │       │   └── popup_show_modal [UI]
│   │       │       ├── flush_display [UI] (see above)
│   │       │       ├── process_messages [UI]
│   │       │       ├── get_view_window_handle [UI] (see above)
│   │       │       ├── get_edit_text [UI]
│   │       │       ├── init_palette_system [UI]
│   │       │       ├── unknown — manage window [UI]
│   │       │       ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │       │       │   └── ... (3 more)
│   │       │       ├── popup_paint [UI]
│   │       │       │   └── ... (20 more)
│   │       │       ├── unknown (popup_get_item_text) [UI]
│   │       │       ├── unknown (popup_get_edit_text) [UI]
│   │       │       └── modal_dialog_run [UI]
│   │       │           └── ... (2 more)
│   │       ├── popup_dialog_create [UI]
│   │       │   ├── unknown (popup list init) [UI]
│   │       │   └── popup_dialog_reset [UI]
│   │       ├── popup_add_button [UI]
│   │       │   ├── measure_text_height [UI] (see above)
│   │       │   └── init_editor_scrollbar [UI]
│   │       │       └── rect_get_width [UI] (see above)
│   │       └── sprite_init_empty [UI]
│   │           ├── port_alloc_rect [UI]
│   │           │   └── port_alloc [UI]
│   │           │       └── ... (4 more)
│   │           ├── port_set_color [UI]
│   │           │   └── port_fill_rect [UI]
│   │           │       └── ... (3 more)
│   │           └── unknown (sprite extract with rect params) [UI]
│   │               ├── sprite_lock_data [UI]
│   │               └── sprite_extract_from_oleitem [UI]
│   │                   └── ... (4 more)
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── play_sound_effect [UI] *** STATE MUTATION *** — Plays a sound effect by ID
│   │   ├── flush_display [UI] (see above)
│   │   └── rng_range [GL] *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2]
│   │       └── rng_next_float [GL] *** STATE MUTATION ***
│   ├── wait_for_animation [UI] — Busy-waits for a duration based on param_1, processing messages
│   │   ├── flush_display [UI] (see above)
│   │   └── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] — Updates a single tile for all active players.
│   │   └── update_map_tile [UI] — Updates a single map tile (radius 0, current player, with invalidate).
│   │       └── update_map_area [UI] *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   ├── civ_has_tech [GL] (see above)
│   ├── calc_city_revolt_distance [GL] — Calculates the "revolt distance" for a city — minimum distance to any friendly city with a courthouse
│   │   ├── has_building [GL] (see above)
│   │   └── calc_movement_cost [GL] (see above)
│   ├── enqueue_mp_event [MIXED] — Enqueues a multiplayer event message
│   │   └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── draw_status_panel_header [UI] — Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│   │   ├── rect_get_width [UI] (see above)
│   │   ├── rect_get_height [UI] (see above)
│   │   ├── flush_display [UI] (see above)
│   │   ├── invalidate_region [UI] (see above)
│   │   ├── text_begin [UI] — Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   ├── text_add_label_id [UI] — Appends a localized label (by ID) to the global text buffer.
│   │   ├── get_font_height [UI] — Returns the font height from the font object at this+4.
│   │   ├── measure_text_height [UI] (see above)
│   │   ├── text_add_number [UI] — Adds a number to the global text buffer.
│   │   ├── unknown (string pool set) [UI] — Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   │   └── advance_year_display [UI]
│   │   │       ├── text_add_label_id [UI] (see above)
│   │   │       └── text_newline [UI]
│   │   ├── draw_text_at [UI] — Draws text at position (param_2, param_3) using the global drawing surface.
│   │   │   └── draw_text_with_shadow [UI] (see above)
│   │   ├── scale_sprite [UI] (see above)
│   │   ├── set_sprite_scale [UI] (see above)
│   │   ├── reset_sprite_scale [UI] (see above)
│   │   ├── prepare_surface [UI] — Sets the global drawing surface to param_1.
│   │   ├── draw_hline [UI] — Draws a horizontal line from (param_2, param_4) to (param_3+1, param_4+1) with the given color.
│   │   │   ├── set_rect_abs [UI]
│   │   │   └── fill_surface_from_rect [UI]
│   │   │       ├── rect_get_width [UI] (see above)
│   │   │       ├── rect_get_height [UI] (see above)
│   │   │       └── fill_rect_xywh [UI]
│   │   │           ├── set_rect_wh [UI] (see above)
│   │   │           └── port_fill_rect [UI] (see above)
│   │   ├── tile_bitmap [UI] — Tiles a source bitmap to fill a destination rectangle
│   │   │   └── blit_rect_to_rect [UI]
│   │   │       ├── set_rect_wh [UI] (see above)
│   │   │       └── port_blit_stretch [UI]
│   │   │           ├── port_lock [UI] (see above)
│   │   │           ├── port_unlock [UI] (see above)
│   │   │           ├── surface_is_locked [UI] (see above)
│   │   │           ├── get_surface_buffer_handle [UI]
│   │   │           ├── unknown (get surface base) [UI]
│   │   │           ├── check_topdown [UI]
│   │   │           └── copy_rect_8bit [UI]
│   │   ├── set_text_draw_target [UI] — Sets the target surface for text drawing.
│   │   ├── set_text_draw_source [UI] (see above)
│   │   ├── set_text_style [UI] (see above)
│   │   ├── port_set_rect_from_self [UI] — Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│   │   ├── port_set_rect [UI] (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (see above)
│   ├── set_unit_seen_by [GL] *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask)
│   ├── sum_stack_property [GL] — Sums a property across all units in a stack
│   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   └── get_first_unit_in_stack [GL] — Follows prev pointers to find the first unit in the stack.
│   │       └── validate_unit_stack [GL] *** STATE MUTATION ***
│   │           ├── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
│   │           ├── put_down_unit [GL] *** STATE MUTATION ***
│   │           │   ├── is_tile_valid [GL] (see above)
│   │           │   ├── show_dialog_message [UI] (see above)
│   │           │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │           │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │           │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │           │   ├── find_first_unit_at [GL]
│   │           │   └── get_tile_ptr [GL] (see above)
│   │           └── sum_stack_property [GL] (see above)
│   └── set_tile_owner [GL] *** STATE MUTATION *** — Sets the tile owner (upper nibble of byte 5)
│       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       ├── get_tile_ptr [GL] (see above)
│       └── queue_map_update [GL] *** STATE MUTATION *** (see above)
├── execute_paradrop [GL] *** STATE MUTATION *** — Executes a paradrop operation
│   ├── 0000C494 [?]
│   ├── is_tile_valid [GL] (see above)
│   ├── show_message [UI] (see above)
│   ├── get_civ_name [UI] (see above)
│   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** (see above)
│   ├── set_improvement_name_string [UI] (see above)
│   ├── process_unit_move_visibility [GL] *** STATE MUTATION *** — Major game logic function that processes visibility updates after a unit moves
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── cancel_goto_if_blocked [GL] *** STATE MUTATION *** — Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air)
│   │   ├── cancel_goto_for_stack [GL] *** STATE MUTATION *** — Cancels goto orders for all units in a stack at a given location
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   └── is_tile_ocean [GL] (see above)
│   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION *** — Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── find_city_at [GL] (see above)
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── update_map_area_all_players [UI] (see above)
│   │   ├── update_tile_all_players [UI] (see above)
│   │   ├── update_radius1_all_players [UI] — Updates radius-1 area around a tile for all active players.
│   │   │   └── update_map_radius1 [UI]
│   │   │       └── update_map_area [UI] *** STATE MUTATION *** (see above)
│   │   ├── ai_add_goal_a [AI] *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   ├── process_diplomatic_contact [GL] *** STATE MUTATION *** — Master diplomatic contact processing function
│   │   │   ├── show_message [UI] (see above)
│   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   ├── mp_show_wait_dialog [UI]
│   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── select_list_item [UI] (see above)
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   │   │   ├── open_intelligence_dialog [UI]
│   │   │   │   │   │   └── ... (6 more)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (6 more)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── diplo_show_greeting [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (9 more)
│   │   │   │   │   ├── update_tile_all_players [UI] (see above)
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   ├── get_civ_leader_title [GL]
│   │   │   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── popup_dialog_create [UI] (see above)
│   │   │   │   │   └── popup_add_radio_option [UI]
│   │   │   │   │       └── ... (1 more)
│   │   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │   │   └── intel_close_advisor [UI]
│   │   │   │   │       └── ... (3 more)
│   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_activate_alliance_wars [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   └── break_alliance [MIXED] *** STATE MUTATION ***
│   │   │   │   │       └── ... (3 more)
│   │   │   │   ├── break_alliance [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   └── get_civ_people_name [GL] (see above)
│   │   │   ├── ai_diplomacy_negotiate [GL] *** STATE MUTATION ***
│   │   │   │   ├── text_begin [UI] (see above)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   ├── text_add_number [UI] (see above)
│   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   ├── show_help_topic [UI]
│   │   │   │   │   └── show_help_topic_ext [UI]
│   │   │   │   │       └── ... (1 more)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │   └── show_help_topic [UI] (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   │   ├── open_intelligence_dialog [UI] (see above)
│   │   │   │   ├── show_game_popup_3arg [UI]
│   │   │   │   │   └── show_terrain_help [UI]
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_patience_threshold [GL]
│   │   │   │   │   └── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_form_alliance [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── get_civ_name [UI] (see above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   └── intel_play_animation [UI] (see above)
│   │   │   │   ├── diplo_sign_ceasefire [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── get_civ_name [UI] (see above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── get_attitude_raw [GL] (see above)
│   │   │   │   │   ├── set_attitude_value [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   └── intel_play_animation [UI] (see above)
│   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_gold_to_attitude [GL]
│   │   │   │   ├── diplo_ai_negotiate [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── text_begin [UI] (see above)
│   │   │   │   │   ├── text_add_string [UI] (see above)
│   │   │   │   │   ├── text_add_number [UI] (see above)
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── get_civ_name [UI] (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   │   ├── diplo_form_alliance [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diplo_sign_peace_treaty [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_gold_to_attitude [GL] (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_attitude [GL]
│   │   │   │   │   ├── should_declare_war [GL] (see above)
│   │   │   │   │   ├── break_alliance [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (see above)
│   │   │   │   │   ├── ai_calc_tech_value [AI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (13 more)
│   │   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   └── rng_range [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── diplo_favor_menu [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── select_list_item [UI] (see above)
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── calc_patience_threshold [GL] (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── redraw_map_all_players [UI]
│   │   │   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   │   │   ├── intel_play_animation [UI] (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   │   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   │   │   ├── get_civ_vis_ptr [GL] (see above)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── set_civ_tile_data [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   └── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   ├── diplo_check_war_weariness [UI]
│   │   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   │   └── get_civ_people_name [GL] (see above)
│   │   │   │   ├── diplo_show_main_menu [UI]
│   │   │   │   │   ├── select_list_item [UI] (see above)
│   │   │   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI] (see above)
│   │   │   │   │   ├── popup_dialog_create [UI] (see above)
│   │   │   │   │   └── popup_add_radio_option [UI] (see above)
│   │   │   │   ├── unknown (set trade route value) [GL] *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_attitude_raw [GL] (see above)
│   │   │   │   ├── set_attitude_value [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── calc_attitude [GL] (see above)
│   │   │   │   ├── should_declare_war [GL] (see above)
│   │   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   │   ├── intel_play_animation [UI] (see above)
│   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── ai_calc_tech_value [AI] (see above)
│   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── event_check_negotiation [GL] *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] *** STATE MUTATION ***
│   │   │   │   │       └── ... (11 more)
│   │   │   │   ├── calc_war_readiness [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   │   ├── check_can_declare_war [GL] (see above)
│   │   │   │   ├── refresh_status_panel [UI] (see above)
│   │   │   │   └── rng_range [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── should_declare_war [GL] (see above)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── get_civ_noun_name [GL] (see above)
│   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   ├── parleywin_start_session [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │   └── show_window_inner [UI]
│   │   │   │   │       └── ... (2 more)
│   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │   │   │   ├── chatwin_get_text_length [UI]
│   │   │   │   ├── parleywin_build_title [UI]
│   │   │   │   │   ├── text_begin [UI] (see above)
│   │   │   │   │   ├── text_add_string [UI] (see above)
│   │   │   │   │   ├── text_newline [UI] (see above)
│   │   │   │   │   ├── text_begin_italic [UI]
│   │   │   │   │   ├── text_end_italic [UI]
│   │   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   ├── calc_attitude [GL] (see above)
│   │   │   │   │   └── get_civ_people_name [GL] (see above)
│   │   │   │   ├── parley_set_negotiation_state [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── pedia_clear_selection [UI]
│   │   │   │   │   ├── pedia_set_selection [UI]
│   │   │   │   │   ├── parley_add_dialog_panel [UI]
│   │   │   │   │   │   └── ... (29 more)
│   │   │   │   │   └── set_active_control [UI]
│   │   │   │   ├── widget_set_cursor_pos [UI]
│   │   │   │   ├── widget_get_text_length [UI]
│   │   │   │   │   └── unknown (get_text_end_pos) [UI]
│   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │   ├── end_paint [UI]
│   │   │   │   │   └── call_refresh_callback [UI]
│   │   │   │   ├── get_active_control [UI]
│   │   │   │   └── set_active_control [UI] (see above)
│   │   │   ├── event_check_negotiation [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   │   ├── ai_should_declare_war [AI]
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   └── should_declare_war [GL] (see above)
│   │   │   ├── ai_tech_exchange [GL] *** STATE MUTATION ***
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── ai_calc_tech_value [AI] (see above)
│   │   │   │   └── handle_tech_discovery [GL] *** STATE MUTATION *** (see above)
│   │   │   └── check_join_war [GL] *** STATE MUTATION ***
│   │   │       ├── show_message [UI] (see above)
│   │   │       ├── show_dialog_message [UI] (see above)
│   │   │       ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │       └── get_civ_people_name [GL] (see above)
│   │   ├── wrap_x [GL] (see above)
│   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   ├── set_stack_seen_by [GL] *** STATE MUTATION *** — Sets visibility for all units in a stack to be seen by a specific civ.
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   └── set_unit_seen_by [GL] *** STATE MUTATION *** (see above)
│   │   ├── sum_stack_property [GL] (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   ├── get_civ_vis_ptr [GL] (see above)
│   │   ├── is_tile_ocean [GL] (see above)
│   │   ├── get_tile_explored [GL] (see above)
│   │   ├── get_city_owner_at [GL] (see above)
│   │   ├── get_tile_controller [GL] — Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   └── get_unit_owner_at [GL] (see above)
│   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION *** (see above)
│   │   ├── set_civ_tile_data [GL] *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] *** STATE MUTATION *** (see above)
│   │   └── end_map_batch [GL] *** STATE MUTATION *** (see above)
│   ├── find_city_at [GL] (see above)
│   ├── show_game_popup_2arg [UI] (see above)
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   ├── set_paradrop_range [GL] *** STATE MUTATION *** — Sets the paradrop range for a unit type
│   ├── enqueue_mp_event [MIXED] (see above)
│   ├── refresh_status_panel [UI] (see above)
│   ├── animate_unit_movement [UI] *** STATE MUTATION *** — Animates unit movement between tiles
│   │   ├── rect_get_width [UI] (see above)
│   │   ├── rect_get_height [UI] (see above)
│   │   ├── flush_display [UI] (see above)
│   │   ├── invalidate_region [UI] (see above)
│   │   ├── set_rect_abs [UI] (see above)
│   │   ├── set_rect_wh [UI] (see above)
│   │   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │   ├── tile_to_screen [UI] (see above)
│   │   ├── is_tile_visible [UI] (see above)
│   │   ├── update_map_area_all_players [UI] (see above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   ├── draw_unit [UI] — Draws a complete unit sprite at the given coordinates
│   │   │   ├── rect_get_width [UI] (see above)
│   │   │   ├── rect_get_height [UI] (see above)
│   │   │   ├── set_rect_wh [UI] (see above)
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── fill_surface_from_rect [UI] (see above)
│   │   │   ├── get_civ_background_color [UI] (see above)
│   │   │   ├── scale_sprite [UI] (see above)
│   │   │   ├── set_sprite_scale [UI] (see above)
│   │   │   ├── reset_sprite_scale [UI] (see above)
│   │   │   ├── set_unit_font_for_zoom [UI] *** STATE MUTATION ***
│   │   │   │   ├── set_editor_font [UI]
│   │   │   │   │   └── delete_font [UI]
│   │   │   │   └── scale_sprite [UI] (see above)
│   │   │   ├── select_display_unit [UI]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_fortress_owner_at [GL] (see above)
│   │   │   ├── get_civ_dark_color [UI]
│   │   │   ├── get_unit_max_hp [GL] (see above)
│   │   │   ├── get_fortress_owner_at [GL] (see above)
│   │   │   ├── get_tile_improvements [GL] (see above)
│   │   │   ├── port_copy_rect [UI] (see above)
│   │   │   ├── port_fill_rect_pattern [UI] (see above)
│   │   │   ├── unknown (set/get draw color) [UI] (see above)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI] (see above)
│   │   │   └── unknown (sprite blit wrapper 10) [UI]
│   │   │       └── dispatch_oleitem_dimmed [UI]
│   │   │           ├── rect_get_width [UI] (see above)
│   │   │           ├── rect_get_height [UI] (see above)
│   │   │           ├── unknown (get panel icon width) [UI]
│   │   │           ├── unknown (get panel icon height) [UI]
│   │   │           ├── init_editor_scrollbar [UI] (see above)
│   │   │           ├── widget_get_height [UI]
│   │   │           ├── get_surface_buffer_handle [UI] (see above)
│   │   │           ├── unknown (get surface base) [UI] (see above)
│   │   │           ├── scale_coords [UI]
│   │   │           ├── check_topdown [UI] (see above)
│   │   │           └── pixel_fill [UI]
│   │   ├── blit_with_clip [UI] — Blits a source rect to dest rect with manual clipping
│   │   │   └── blit_rect_to_rect [UI] (see above)
│   │   ├── calc_movement_step_size [UI] — Calculates animation step size for unit movement based on current zoom level.
│   │   │   └── calc_scaled_step [UI]
│   │   ├── wrap_x [GL] (see above)
│   │   ├── port_alloc_rect [UI] (see above)
│   │   └── port_destructor [UI] — Destroys a port object: unlocks the surface if locked, frees the DIB, resets all fields, and clears the singleton poi...
│   │       ├── port_init [UI]
│   │       ├── port_unlock [UI] (see above)
│   │       ├── surface_is_locked [UI] (see above)
│   │       └── destroy_dib_surface [UI]
│   ├── diplomacy_check_attack_allowed [GL] (see above)
│   ├── handle_city_capture [GL] *** STATE MUTATION *** — The main city capture handler — one of the most complex functions in the binary
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── text_begin [UI] (see above)
│   │   ├── text_add_string [UI] (see above)
│   │   ├── text_add_label_id [UI] (see above)
│   │   ├── select_list_item [UI] (see above)
│   │   ├── text_newline [UI] (see above)
│   │   ├── text_add_number [UI] (see above)
│   │   ├── show_message [UI] (see above)
│   │   ├── show_dialog_message [UI] (see above)
│   │   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   │   ├── set_improvement_name_string [UI] (see above)
│   │   ├── dialog_set_title [UI] (see above)
│   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION *** (see above)
│   │   ├── has_building [GL] (see above)
│   │   ├── set_building [GL] *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   │   │   └── bit_index_to_byte_mask [GL] (see above)
│   │   ├── change_city_production [MIXED] *** STATE MUTATION *** — Changes a city's production item
│   │   │   ├── select_list_item [UI] (see above)
│   │   │   ├── show_message [UI] (see above)
│   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   ├── ai_choose_city_production [AI] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── show_message [UI] (see above)
│   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   ├── has_building [GL] (see above)
│   │   │   │   ├── set_building [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── city_adjacent_to_continent [GL] (see above)
│   │   │   │   ├── find_best_coastal_continent [GL]
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   │   ├── is_wonder_obsolete [GL] (see above)
│   │   │   │   ├── get_wonder_city [GL] (see above)
│   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   ├── has_spaceship_built [GL]
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── can_build_unit_type [GL]
│   │   │   │   │   └── civ_has_tech [GL] (see above)
│   │   │   │   ├── can_build_improvement [GL]
│   │   │   │   │   ├── has_building [GL] (see above)
│   │   │   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   └── can_build_wonder [GL]
│   │   │   │   ├── is_tile_worked [GL]
│   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── evaluate_city_tiles [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_capital_distance_and_corruption [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── calc_shields_per_row [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   └── recalc_city_all [GL] *** STATE MUTATION ***
│   │   │   │   │       └── ... (5 more)
│   │   │   │   ├── spaceship_ai_evaluate [AI]
│   │   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   ├── spaceship_get_category_count [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── spaceship_get_raw_count [GL]
│   │   │   │   │   ├── spaceship_get_clamped_category [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── unknown (spaceship section complete check) [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   └── spaceship_can_build_category [GL]
│   │   │   │   │       └── ... (1 more)
│   │   │   │   ├── spaceship_is_enabled [GL]
│   │   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   │   ├── has_spaceship_launched [GL] (see above)
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   └── spaceship_is_enabled [GL] (see above)
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   ├── tile_distance_xy [GL] (see above)
│   │   │   │   ├── calc_unit_movement_points [GL] (see above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (see above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   └── put_down_unit [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (see above)
│   │   │   │   ├── sum_stack_property [GL] (see above)
│   │   │   │   ├── count_units_by_role [GL]
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (see above)
│   │   │   │   ├── is_unit_active [GL] (see above)
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── check_unit_can_improve [GL]
│   │   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   │   ├── check_adjacent_water [GL]
│   │   │   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   │   ├── get_tile_continent [GL] (see above)
│   │   │   │   ├── get_unit_owner_at [GL] (see above)
│   │   │   │   ├── check_tile_resource [GL] (see above)
│   │   │   │   ├── (count_techs_discovered) [GL]
│   │   │   │   │   └── (check_tech_bit) [GL] (see above)
│   │   │   │   ├── get_tile_improvements [GL] (see above)
│   │   │   │   └── set_tile_improvement_bits [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── calc_food_box_with_difficulty [GL]
│   │   │   │   └── classify_production_type [GL]
│   │   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   │   ├── popup_dialog_create [UI] (see above)
│   │   │   ├── popup_dialog_close [UI]
│   │   │   │   └── popup_dialog_destroy [UI] *** STATE MUTATION *** (see above)
│   │   │   ├── popup_add_button [UI] (see above)
│   │   │   └── get_tile_continent [GL] (see above)
│   │   ├── show_game_popup_2arg [UI] (see above)
│   │   ├── get_wonder_city [GL] (see above)
│   │   ├── civ_has_active_wonder [GL] (see above)
│   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (see above)
│   │   ├── redraw_map_all_players [UI] (see above)
│   │   ├── ai_remove_goals_near [AI] *** STATE MUTATION *** (see above)
│   │   ├── get_civ_people_name [GL] (see above)
│   │   ├── has_spaceship_launched [GL] (see above)
│   │   ├── has_spaceship_built [GL] (see above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   ├── civ_has_tech [GL] (see above)
│   │   ├── upgrade_units_for_tech [GL] *** STATE MUTATION *** — When a tech is discovered that obsoletes units, upgrades all applicable units of that civilization to the newer type
│   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   ├── show_game_popup_3arg [UI] (see above)
│   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── update_tile_all_players [UI] (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   └── enqueue_mp_event [MIXED] (see above)
│   │   ├── can_build_unit_type [GL] (see above)
│   │   ├── can_build_improvement [GL] (see above)
│   │   ├── show_city_event_dialog_v2 [UI] *** STATE MUTATION *** — Enhanced version of city event dialog with a production item image
│   │   │   ├── select_list_item [UI] (see above)
│   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   ├── pedia_window_ctor [UI]
│   │   │   │   └── popup_dialog_create [UI] (see above)
│   │   │   ├── popup_set_default_selection [UI]
│   │   │   │   ├── popup_find_radio_option_by_id [UI]
│   │   │   │   └── popup_find_button_by_id [UI]
│   │   │   ├── popup_add_button [UI] (see above)
│   │   │   ├── popup_add_radio_option [UI] (see above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │   ├── flush_display [UI] (see above)
│   │   │   │   ├── port_init_buffer [UI]
│   │   │   │   │   └── port_alloc [UI] (see above)
│   │   │   │   ├── port_draw_text_rect [UI]
│   │   │   │   │   └── write_full_colortable [UI]
│   │   │   │   ├── palette_set_entries [UI]
│   │   │   │   │   ├── palette_apply [UI]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   └── palette_set_entry [UI]
│   │   │   │   ├── check_topdown [UI] (see above)
│   │   │   │   └── flip_surface_vertical [UI]
│   │   │   │       └── get_pixel_buffer [UI]
│   │   │   ├── palette_init [UI]
│   │   │   │   ├── palette_generate_random_id [UI]
│   │   │   │   └── unknown (palette_create) [UI]
│   │   │   └── unknown (sprite extract with transp + rect params) [UI]
│   │   │       ├── sprite_lock_data [UI] (see above)
│   │   │       └── sprite_extract_from_oleitem [UI] (see above)
│   │   ├── handle_espionage_discovery [GL] *** STATE MUTATION *** — Handles discovery of espionage (spy embassy established)
│   │   │   └── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   ├── event_check_city_taken [GL] *** STATE MUTATION *** — Checks all events for CITYTAKEN triggers
│   │   │   └── event_dispatch_actions [GL] *** STATE MUTATION *** (see above)
│   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION *** — Opens the city window for a specific city, handling disorder state
│   │   │   ├── show_window_wrapper [UI] (see above)
│   │   │   ├── process_messages [UI] (see above)
│   │   │   ├── show_help_topic [UI] (see above)
│   │   │   ├── unknown — manage window [UI] (see above)
│   │   │   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │   │   └── set_active_surface [UI] (see above)
│   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   ├── draw_status_panel_header [UI] (see above)
│   │   ├── diplomacy_check_treaty_violation [GL] *** STATE MUTATION *** — Checks if an attack between param_1 and param_2 violates existing treaties
│   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   │   └── set_attitude_value [GL] *** STATE MUTATION *** (see above)
│   │   ├── calc_city_value_for_capture [GL] — Calculates the strategic value of a city (param_1 = city index) for capture/transfer purposes
│   │   ├── diplomacy_steal_tech [GL] *** STATE MUTATION *** — Handles stealing a technology when a civ captures a city or defeats another civ
│   │   │   ├── select_list_item [UI] (see above)
│   │   │   ├── show_message [UI] (see above)
│   │   │   ├── get_civ_name [UI] (see above)
│   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   ├── reassign_all_city_production [GL] *** STATE MUTATION ***
│   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   ├── ai_calc_tech_value [AI] (see above)
│   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── show_research_goal_dialog [UI]
│   │   │   │   ├── text_begin [UI] (see above)
│   │   │   │   ├── text_add_label_id [UI] (see above)
│   │   │   │   ├── select_list_item [UI] (see above)
│   │   │   │   ├── text_newline [UI] (see above)
│   │   │   │   ├── display_improvement [UI] (see above)
│   │   │   │   ├── text_add_number [UI] (see above)
│   │   │   │   ├── open_list_dialog [UI]
│   │   │   │   │   └── open_dialog_extended [UI]
│   │   │   │   │       └── ... (1 more)
│   │   │   │   ├── unknown (string pool append separator) [UI]
│   │   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   │   ├── set_improvement_name_string [UI] (see above)
│   │   │   │   ├── dialog_set_icon [UI]
│   │   │   │   ├── dialog_set_title [UI] (see above)
│   │   │   │   ├── civ_has_tech [GL] (see above)
│   │   │   │   ├── tech_is_descendant_of [GL]
│   │   │   │   │   └── tech_is_descendant_of [GL] (see above)
│   │   │   │   ├── pedia_select_entry [UI]
│   │   │   │   │   ├── end_paint [UI] (see above)
│   │   │   │   │   ├── show_window_wrapper [UI] (see above)
│   │   │   │   │   ├── unknown (lock pedia surface) [UI]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   ├── pedia_init_tabs [UI]
│   │   │   │   │   │   └── ... (6 more)
│   │   │   │   │   ├── pedia_clear_item_list [UI]
│   │   │   │   │   ├── pedia_draw_frame [UI]
│   │   │   │   │   │   └── ... (4 more)
│   │   │   │   │   ├── pedia_open_category [UI]
│   │   │   │   │   │   └── ... (3 more)
│   │   │   │   │   ├── pedia_get_entry_name [UI]
│   │   │   │   │   ├── pedia_draw_tech_detail [UI]
│   │   │   │   │   │   └── ... (5 more)
│   │   │   │   │   └── modal_dialog_run [UI] (see above)
│   │   │   │   ├── pedia_navigate_to_item [UI]
│   │   │   │   │   ├── end_paint [UI] (see above)
│   │   │   │   │   ├── show_window_wrapper [UI] (see above)
│   │   │   │   │   ├── unknown (lock pedia surface) [UI] (see above)
│   │   │   │   │   ├── pedia_init_tabs [UI] (see above)
│   │   │   │   │   ├── pedia_clear_item_list [UI] (see above)
│   │   │   │   │   ├── pedia_draw_frame [UI] (see above)
│   │   │   │   │   ├── pedia_open_category [UI] (see above)
│   │   │   │   │   ├── pedia_get_entry_name [UI] (see above)
│   │   │   │   │   ├── civpedia_select_item [UI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── pedia_draw_item_detail [UI]
│   │   │   │   │   │   └── ... (8 more)
│   │   │   │   │   └── modal_dialog_run [UI] (see above)
│   │   │   │   ├── popup_dialog_create [UI] (see above)
│   │   │   │   ├── popup_add_edit_field [UI]
│   │   │   │   ├── popup_set_field_38 [UI]
│   │   │   │   ├── popup_add_radio_option [UI] (see above)
│   │   │   │   ├── popup_add_action_button_label [UI]
│   │   │   │   └── pedia_select_unit_type [UI]
│   │   │   │       ├── end_paint [UI] (see above)
│   │   │   │       ├── show_window_wrapper [UI] (see above)
│   │   │   │       ├── unknown (lock pedia surface) [UI] (see above)
│   │   │   │       ├── pedia_init_tabs [UI] (see above)
│   │   │   │       ├── pedia_clear_item_list [UI] (see above)
│   │   │   │       ├── pedia_draw_frame [UI] (see above)
│   │   │   │       ├── pedia_open_category [UI] (see above)
│   │   │   │       ├── pedia_get_entry_name [UI] (see above)
│   │   │   │       ├── pedia_unit_draw_details [UI]
│   │   │   │       │   └── ... (8 more)
│   │   │   │       └── modal_dialog_run [UI] (see above)
│   │   │   ├── unknown (show tech help) [UI]
│   │   │   │   └── show_tech_help [UI]
│   │   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   │   ├── popup_dialog_create [UI] (see above)
│   │   │   ├── popup_dialog_close [UI] (see above)
│   │   │   └── popup_add_radio_option [UI] (see above)
│   │   ├── find_most_central_city [GL] — Finds the most centrally-located city for a given civ (param_1)
│   │   │   └── calc_movement_cost [GL] (see above)
│   │   ├── handle_civil_war [GL] *** STATE MUTATION *** — Handles civil war when a civ's capital is captured
│   │   │   ├── show_message [UI] (see above)
│   │   │   ├── get_civ_name [UI] (see above)
│   │   │   ├── unknown (dialog show single param) [UI] (see above)
│   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── has_building [GL] (see above)
│   │   │   ├── set_building [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── redraw_map_all_players [UI] (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── event_check_no_schism [GL] *** STATE MUTATION ***
│   │   │   │   └── event_dispatch_actions [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   │   ├── find_most_central_city [GL] (see above)
│   │   │   ├── transfer_city_ownership [GL] *** STATE MUTATION ***
│   │   │   │   └── set_tile_owner [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── calc_movement_cost [GL] (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   ├── get_tile_continent [GL] (see above)
│   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── begin_map_batch [GL] *** STATE MUTATION *** (see above)
│   │   │   └── end_map_batch [GL] *** STATE MUTATION *** (see above)
│   │   ├── popup_dialog_create [UI] (see above)
│   │   ├── popup_dialog_close [UI] (see above)
│   │   ├── popup_add_button [UI] (see above)
│   │   ├── wrap_x [GL] (see above)
│   │   ├── calc_movement_cost [GL] (see above)
│   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   ├── create_unit [GL] *** STATE MUTATION *** — Creates a new unit of the specified type for a given civilization at a map position
│   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── find_nearest_city [GL] (see above)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   ├── unknown (tutorial_show_advice) [UI]
│   │   │   │   └── show_unit_type_picker [UI] (see above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── calc_unit_movement_points [GL] (see above)
│   │   │   └── put_down_unit [GL] *** STATE MUTATION *** (see above)
│   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** — Deletes every unit in a stack by iterating from first to last.
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   └── delete_unit [GL] *** STATE MUTATION *** (see above)
│   │   ├── set_unit_seen_by [GL] *** STATE MUTATION *** (see above)
│   │   ├── sum_stack_property [GL] (see above)
│   │   ├── count_units_by_role [GL] (see above)
│   │   ├── get_tile_continent [GL] (see above)
│   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION *** (see above)
│   │   ├── set_tile_owner [GL] *** STATE MUTATION *** (see above)
│   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION *** — Sets the city-radius owner for a tile (top 3 bits of byte 2)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   └── queue_map_update [GL] *** STATE MUTATION *** (see above)
│   │   ├── begin_map_batch [GL] *** STATE MUTATION *** (see above)
│   │   └── end_map_batch [GL] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── tile_distance_xy [GL] (see above)
│   ├── relocate_all_units [GL] *** STATE MUTATION *** — Relocates all units in a stack to a new position.
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   ├── clear_stack_visibility [GL] *** STATE MUTATION *** — Clears visibility for all units in a stack.
│   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   └── clear_unit_visibility [GL] *** STATE MUTATION *** — Clears a unit's visibility mask (which civs can see it).
│   ├── stack_unit [GL] *** STATE MUTATION *** — Stacks a unit (puts it into storage)
│   │   ├── show_dialog_message [UI] (see above)
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   │   └── load_unit_onto_ship [GL] *** STATE MUTATION *** — Loads ground/air units onto a transport ship
│   │       ├── is_tile_valid [GL] (see above)
│   │       ├── show_dialog_message [UI] (see above)
│   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │       ├── get_next_unit_in_stack [GL] (see above)
│   │       ├── get_first_unit_in_stack [GL] (see above)
│   │       ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│   │       ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   │       ├── eject_air_units [GL] *** STATE MUTATION ***
│   │       │   ├── get_next_unit_in_stack [GL] (see above)
│   │       │   ├── get_first_unit_in_stack [GL] (see above)
│   │       │   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   │       ├── is_tile_ocean [GL] (see above)
│   │       └── get_tile_continent [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_owner [GL] (see above)
│   ├── get_tile_explored [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   └── get_tile_controller [GL] (see above)
├── calc_shields_per_row [GL] *** STATE MUTATION *** (see above)
├── ai_get_unit_role [AI] — Returns the AI role code for a unit
├── ai_find_best_settle_dir [AI] — Finds the best direction for a settler/engineer to move to found a new city
│   ├── is_tile_valid [GL] (see above)
│   ├── should_declare_war [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── (get_tile_fertility_or_city_radius) [GL] — Returns city_radius_owner if nonzero; otherwise returns fertility (clamped: if 0 < fertility < 9, returns 8).
│   │   ├── get_tile_city_radius_owner [GL] — Returns upper 3 bits of byte 2 (>> 5) = city radius owner.
│   │   │   └── get_tile_ptr [GL] (see above)
│   │   └── get_tile_fertility [GL] — Returns lower 4 bits of byte 5 (fertility value 0-15).
│   │       └── get_tile_ptr [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   └── get_unit_owner_at [GL] (see above)
├── ai_cancel_goto_on_domain [AI] *** STATE MUTATION *** — Iterates through units stacked with param_1 and cancels goto orders for units of matching domain types (param_2 bitmask)
│   ├── get_next_unit_in_stack [GL] (see above)
│   └── get_first_unit_in_stack [GL] (see above)
├── ai_set_goto_order [AI] *** STATE MUTATION *** — Sets a goto order on a unit
├── ai_set_goto_via_coast [AI] *** STATE MUTATION *** — Sets a goto order for a naval unit, finding a coastal tile adjacent to the target that shares a water connection with...
│   ├── is_tile_valid [GL] (see above)
│   ├── ai_set_goto_order [AI] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   └── get_city_owner_at [GL] (see above)
├── ai_barbarian_unit_turn [AI] *** STATE MUTATION *** — AI turn logic for barbarian units (civ 0)
│   ├── is_tile_valid [GL] (see above)
│   ├── show_message [UI] (see above)
│   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** (see above)
│   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   ├── find_nearest_city [GL] (see above)
│   ├── show_game_popup_2arg [UI] (see above)
│   ├── update_tile_all_players [UI] (see above)
│   ├── open_text_file_section_fallback [FW] — Tries to open a text file section
│   ├── read_next_line [FW] — Reads the next line from the open text file into DAT_00679640 (255 char buffer)
│   ├── calc_unit_goto_direction [GL] *** STATE MUTATION *** — Calculates the next move direction for a unit executing a goto order
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── direction_from_delta [GL] — Converts an (x,y) delta into a direction index (0-7)
│   │   ├── find_path [GL] *** STATE MUTATION *** — BFS pathfinding algorithm
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── set_map_scroll_position [UI] (see above)
│   │   │   ├── debug_show_message [UI]
│   │   │   │   └── show_help_topic [UI] (see above)
│   │   │   ├── draw_number_on_map [UI]
│   │   │   │   ├── invalidate_region [UI] (see above)
│   │   │   │   ├── set_rect_wh [UI] (see above)
│   │   │   │   ├── scale_sprite [UI] (see above)
│   │   │   │   ├── tile_to_screen [UI] (see above)
│   │   │   │   ├── is_tile_visible [UI] (see above)
│   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │   └── unknown (set/get draw color) [UI] (see above)
│   │   │   │   └── unknown (set/get draw color) [UI] (see above)
│   │   │   ├── redraw_entire_map [UI] *** STATE MUTATION *** (see above)
│   │   │   ├── get_path_cost [GL]
│   │   │   ├── set_path_cost [GL] *** STATE MUTATION ***
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   ├── distance_x_wrapped [GL] (see above)
│   │   │   ├── calc_movement_cost [GL] (see above)
│   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   └── get_unit_owner_at [GL] (see above)
│   │   │   ├── count_units_by_role [GL] (see above)
│   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   ├── get_tile_controller [GL] (see above)
│   │   │   ├── check_tile_trespass [GL]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_tile_city_radius_owner [GL] (see above)
│   │   │   └── get_tile_improvements [GL] (see above)
│   │   ├── find_road_path [GL] *** STATE MUTATION *** — Finds a path using the road/rail network between two points
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── calc_path_distance [GL] *** STATE MUTATION ***
│   │   │   │   └── find_path [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── find_adjacent_terrain_type [GL]
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   └── is_tile_ocean [GL] (see above)
│   │   │   ├── find_nearest_road_tile [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── calc_path_distance [GL] *** STATE MUTATION *** (see above)
│   │   │   │   ├── find_adjacent_terrain_type [GL] (see above)
│   │   │   │   ├── get_land_connectivity [GL]
│   │   │   │   ├── get_sea_connectivity [GL]
│   │   │   │   ├── wrap_y [GL]
│   │   │   │   └── calc_movement_cost [GL] (see above)
│   │   │   ├── get_land_connectivity [GL] (see above)
│   │   │   ├── get_sea_connectivity [GL] (see above)
│   │   │   ├── get_bfs_visited [GL]
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   ├── wrap_y [GL] (see above)
│   │   │   └── calc_movement_cost [GL] (see above)
│   │   ├── wrap_x [GL] (see above)
│   │   ├── distance_x_wrapped [GL] (see above)
│   │   ├── tile_distance_xy [GL] (see above)
│   │   ├── calc_unit_movement_points [GL] (see above)
│   │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION *** — Checks ZOC only if there's no city at the location
│   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION *** (see above)
│   │   │   └── get_city_owner_at [GL] (see above)
│   │   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   ├── get_city_owner_at [GL] (see above)
│   │   ├── get_fortress_owner_at [GL] (see above)
│   │   ├── get_unit_owner_at [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   ├── unit_pillage [GL] *** STATE MUTATION *** (see above)
│   ├── enqueue_mp_event [MIXED] (see above)
│   ├── ai_cancel_goto_on_domain [AI] *** STATE MUTATION *** (see above)
│   ├── ai_set_goto_order [AI] *** STATE MUTATION *** (see above)
│   ├── ai_set_goto_via_coast [AI] *** STATE MUTATION *** (see above)
│   ├── calc_city_value_for_capture [GL] (see above)
│   ├── rng_range [GL] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── calc_movement_cost [GL] (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── find_unit_stack_at_xy [GL] (see above)
│   ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** (see above)
│   ├── set_stack_seen_by [GL] *** STATE MUTATION *** (see above)
│   ├── check_zoc_if_no_city [GL] *** STATE MUTATION *** (see above)
│   ├── sum_stack_property [GL] (see above)
│   ├── count_units_by_role [GL] (see above)
│   ├── delete_unit_visible [GL] *** STATE MUTATION *** — Deletes a unit and refreshes the map display at its former position
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── show_dialog_message [UI] (see above)
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── update_tile_all_players [UI] (see above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   └── delete_unit_safely [GL] *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units
│   │       ├── is_tile_valid [GL] (see above)
│   │       ├── show_dialog_message [UI] (see above)
│   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │       ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│   │       ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** (see above)
│   │       ├── load_unit_onto_ship [GL] *** STATE MUTATION *** (see above)
│   │       └── is_tile_ocean [GL] (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   ├── find_nearest_unit [GL] *** STATE MUTATION *** — Finds the nearest unit to a position, optionally filtered by owner civ
│   │   └── calc_movement_cost [GL] (see above)
│   ├── get_tile_ptr [GL] (see above)
│   ├── get_tile_terrain_raw [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   ├── get_tile_explored [GL] (see above)
│   ├── (get_tile_fertility_or_city_radius) [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   ├── get_tile_controller [GL] (see above)
│   ├── (check_tech_bit) [GL] (see above)
│   └── get_tile_improvements [GL] (see above)
├── ai_calc_continent_city_weight [AI] — Calculates a weighted city score for a continent
├── ai_find_nuke_target [AI] *** STATE MUTATION *** — Finds the best target city for a nuclear missile
│   ├── is_tile_valid [GL] (see above)
│   ├── has_building [GL] (see above)
│   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── tile_distance_xy [GL] (see above)
│   ├── calc_unit_movement_points [GL] (see above)
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── find_unit_stack_at_xy [GL] (see above)
│   ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   ├── sum_stack_property [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   └── set_tile_improvement_bits [GL] *** STATE MUTATION *** (see above)
├── ai_naval_and_ranged_move [AI] *** STATE MUTATION *** — Handles AI movement decisions for naval units and ranged/bombardment units
│   ├── is_tile_valid [GL] (see above)
│   ├── find_nearest_city [GL] (see above)
│   ├── city_adjacent_to_continent [GL] (see above)
│   ├── city_connected_to_continent [GL] (see above)
│   ├── cities_share_coast [GL] (see above)
│   ├── should_declare_war [GL] (see above)
│   ├── ai_find_nearest_city_or_transport [AI] *** STATE MUTATION *** (see above)
│   ├── ai_set_goto_order [AI] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── tile_distance_xy [GL] (see above)
│   ├── calc_movement_cost [GL] (see above)
│   ├── get_unit_max_hp [GL] (see above)
│   ├── get_unit_hp_remaining [GL] *** STATE MUTATION *** (see above)
│   ├── calc_unit_movement_points [GL] (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── find_unit_stack_at_xy [GL] (see above)
│   ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   ├── sum_stack_property [GL] (see above)
│   ├── get_tile_ptr [GL] (see above)
│   ├── get_tile_terrain_raw [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   ├── get_tile_explored [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   ├── get_fortress_owner_at [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   ├── get_tile_controller [GL] (see above)
│   ├── (check_tech_bit) [GL] (see above)
│   └── get_tile_improvements [GL] (see above)
├── calc_stack_best_defender [GL] *** STATE MUTATION *** — Finds the best defender in a stack of units at a given tile
│   ├── find_city_at [GL] (see above)
│   ├── has_building [GL] (see above)
│   ├── calc_unit_defense_strength [GL] *** STATE MUTATION *** — Calculates unit defense strength considering terrain, fortification, city walls, unit type bonuses, and special comba...
│   │   ├── find_city_at [GL] (see above)
│   │   ├── has_building [GL] (see above)
│   │   ├── civ_has_active_wonder [GL] (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   ├── get_unit_max_hp [GL] (see above)
│   ├── get_unit_hp_remaining [GL] *** STATE MUTATION *** (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── get_first_unit_in_stack [GL] (see above)
│   └── get_tile_terrain_raw [GL] (see above)
├── resolve_combat [GL] *** STATE MUTATION *** — The main combat resolution function
│   ├── show_message [UI] (see above)
│   ├── get_civ_name [UI] (see above)
│   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** (see above)
│   ├── mp_set_number_control [UI] *** STATE MUTATION *** (see above)
│   ├── unknown (dialog show single param) [UI] (see above)
│   ├── set_improvement_name_string [UI] (see above)
│   ├── process_unit_move_visibility [GL] *** STATE MUTATION *** (see above)
│   ├── dialog_repaint_check [UI] — Conditionally triggers a repaint if the current dialog matches the expected one.
│   │   └── set_active_surface [UI] (see above)
│   ├── city_set_specialist_slot [GL] *** STATE MUTATION *** (see above)
│   ├── find_nearest_city [GL] (see above)
│   ├── has_building [GL] (see above)
│   ├── reassign_all_city_production [GL] *** STATE MUTATION *** (see above)
│   ├── show_game_popup_2arg [UI] (see above)
│   ├── civ_has_active_wonder [GL] (see above)
│   ├── diplo_activate_alliance_wars [GL] *** STATE MUTATION *** (see above)
│   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION *** (see above)
│   ├── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   ├── wait_for_animation [UI] (see above)
│   ├── draw_unit_at_position [UI] — Draws a specific unit (by index) at its map position, converting tile coords to screen coords first.
│   │   ├── tile_to_screen [UI] (see above)
│   │   └── draw_unit [UI] (see above)
│   ├── invalidate_single_tile [UI] — Invalidates a single tile (radius 0) for repaint.
│   │   └── invalidate_tile_area [UI] (see above)
│   ├── update_tile_all_players [UI] (see above)
│   ├── update_radius1_all_players [UI] (see above)
│   ├── get_civ_people_name [GL] (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   ├── execute_airlift [GL] *** STATE MUTATION *** — Executes an airlift operation — moves a unit from one city to another
│   │   ├── show_message [UI] (see above)
│   │   ├── show_game_popup_3arg [UI] (see above)
│   │   ├── show_game_popup_2arg [UI] (see above)
│   │   ├── get_civ_people_name [GL] (see above)
│   │   ├── relocate_unit [GL] *** STATE MUTATION *** (see above)
│   │   ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│   │   └── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   ├── unknown (show improvement help) [UI] — Shows help text for an improvement via the help display system.
│   │   └── show_improvement_help [UI] — Shows help text for a building/wonder
│   ├── enqueue_mp_event [MIXED] (see above)
│   ├── ai_alert_nearby_units [AI] *** STATE MUTATION *** — When a city is threatened (param_1 = city index), alerts all AI naval units within movement range to redirect toward ...
│   │   ├── calc_movement_cost [GL] (see above)
│   │   ├── calc_unit_movement_points [GL] (see above)
│   │   ├── sum_stack_property [GL] (see above)
│   │   └── is_tile_ocean [GL] (see above)
│   ├── ai_choose_government [AI] *** STATE MUTATION *** — AI government selection logic
│   │   ├── check_govt_available [GL] — Checks if a specific government type is available for a civ
│   │   │   ├── civ_has_active_wonder [GL] (see above)
│   │   │   └── civ_has_tech [GL] (see above)
│   │   └── ai_revolution_notification [GL] *** STATE MUTATION *** — Handles AI revolution/government change notifications
│   │       ├── show_message [UI] (see above)
│   │       ├── show_dialog_message [UI] (see above)
│   │       ├── mp_set_string_control [UI] *** STATE MUTATION *** (see above)
│   │       ├── set_improvement_name_string [UI] (see above)
│   │       ├── civ_has_active_wonder [GL] (see above)
│   │       ├── get_civ_noun_name [GL] (see above)
│   │       ├── get_civ_leader_title [GL] (see above)
│   │       ├── get_civ_adjective_name [GL] (see above)
│   │       ├── enqueue_mp_event [MIXED] (see above)
│   │       ├── set_government_type [GL] *** STATE MUTATION ***
│   │       │   ├── show_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│   │       │   │   ├── open_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│   │       │   │   │   └── ... (18 more)
│   │       │   │   └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       │   └── calc_city_production (entry point) [GL] *** STATE MUTATION *** (see above)
│   │       └── revolution_dialog [MIXED] *** STATE MUTATION ***
│   │           ├── text_begin [UI] (see above)
│   │           ├── select_list_item [UI] (see above)
│   │           ├── display_improvement [UI] (see above)
│   │           ├── show_dialog_message [UI] (see above)
│   │           ├── get_civ_name [UI] (see above)
│   │           ├── set_improvement_name_string [UI] (see above)
│   │           ├── dialog_set_title [UI] (see above)
│   │           ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │           ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │           ├── unknown (tutorial_show_city_screen) [UI]
│   │           ├── get_civ_noun_name [GL] (see above)
│   │           ├── get_civ_leader_title [GL] (see above)
│   │           ├── set_government_type [GL] *** STATE MUTATION *** (see above)
│   │           ├── check_govt_available [GL] (see above)
│   │           ├── popup_dialog_create [UI] (see above)
│   │           └── popup_add_radio_option [UI] (see above)
│   ├── draw_status_panel_header [UI] (see above)
│   ├── animate_unit_movement [UI] *** STATE MUTATION *** (see above)
│   ├── diplomacy_check_treaty_violation [GL] *** STATE MUTATION *** (see above)
│   ├── diplomacy_check_attack_allowed [GL] (see above)
│   ├── calc_unit_hit_points [GL] — Calculates a unit's maximum hit points
│   ├── calc_unit_defense_strength [GL] *** STATE MUTATION *** (see above)
│   ├── calc_stack_best_defender [GL] *** STATE MUTATION *** (see above)
│   ├── handle_unit_kill [GL] *** STATE MUTATION *** — Handles a unit being killed in combat
│   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   ├── event_check_unit_killed [GL] *** STATE MUTATION *** — Checks all events for UNITKILLED triggers
│   │   │   └── event_dispatch_actions [GL] *** STATE MUTATION *** (see above)
│   │   ├── record_combat_kill [GL] *** STATE MUTATION *** — Records a combat kill event in the per-civ combat history ring buffer (300 entries per civ)
│   │   │   ├── get_civ_foreground_color [UI] (see above)
│   │   │   ├── get_civ_people_name [GL] (see above)
│   │   │   └── set_active_surface [UI] (see above)
│   │   └── delete_unit [GL] *** STATE MUTATION *** (see above)
│   ├── handle_stack_wipe [GL] *** STATE MUTATION *** — Wipes out an entire stack of units
│   │   ├── handle_unit_kill [GL] *** STATE MUTATION *** (see above)
│   │   └── get_first_unit_in_stack [GL] (see above)
│   ├── handle_unit_promotion [GL] *** STATE MUTATION *** — Promotes a unit to veteran status
│   │   ├── set_improvement_name_string [UI] (see above)
│   │   ├── show_game_popup_2arg [UI] (see above)
│   │   └── enqueue_mp_event [MIXED] (see above)
│   ├── animate_combat_movement [UI] *** STATE MUTATION *** — Animates combat movement for up to 8 animation channels
│   │   ├── flush_display [UI] (see above)
│   │   ├── invalidate_region [UI] (see above)
│   │   ├── set_rect_wh [UI] (see above)
│   │   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │   ├── wait_for_animation [UI] (see above)
│   │   ├── tile_to_screen [UI] (see above)
│   │   ├── is_tile_visible [UI] (see above)
│   │   ├── set_sprite_scale [UI] (see above)
│   │   ├── reset_sprite_scale [UI] (see above)
│   │   ├── scale_at_current_zoom [UI] (see above)
│   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   ├── blit_with_clip [UI] (see above)
│   │   ├── port_alloc_rect [UI] (see above)
│   │   └── unknown (sprite blit wrapper 1) [UI] (see above)
│   ├── handle_nuke_attack [GL] *** STATE MUTATION *** — Handles a nuclear attack on a tile
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── show_message [UI] (see above)
│   │   ├── has_building [GL] (see above)
│   │   ├── adjust_attitude [GL] *** STATE MUTATION *** (see above)
│   │   ├── get_civ_people_name [GL] (see above)
│   │   ├── unknown (show improvement help) [UI] (see above)
│   │   ├── enqueue_mp_event [MIXED] (see above)
│   │   ├── animate_nuke_explosion [UI] *** STATE MUTATION *** — Plays the nuclear explosion animation at a given map tile
│   │   │   ├── rect_get_width [UI] (see above)
│   │   │   ├── rect_get_height [UI] (see above)
│   │   │   ├── flush_display [UI] (see above)
│   │   │   ├── invalidate_region [UI] (see above)
│   │   │   ├── set_rect_wh [UI] (see above)
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** (see above)
│   │   │   ├── play_sound_effect [UI] *** STATE MUTATION *** (see above)
│   │   │   ├── tile_to_screen [UI] (see above)
│   │   │   ├── reset_sprite_scale [UI] (see above)
│   │   │   ├── scale_at_current_zoom [UI] (see above)
│   │   │   ├── set_current_zoom_scale [UI] (see above)
│   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   ├── init_game_display [UI]
│   │   │   │   ├── flush_display [UI] (see above)
│   │   │   │   └── init_palette_system [UI] (see above)
│   │   │   ├── blit_with_clip [UI] (see above)
│   │   │   ├── get_tile_explored [GL] (see above)
│   │   │   ├── port_alloc_rect [UI] (see above)
│   │   │   └── unknown (sprite blit wrapper 1) [UI] (see above)
│   │   ├── wrap_x [GL] (see above)
│   │   ├── tile_distance_xy [GL] (see above)
│   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   ├── get_tile_controller [GL] (see above)
│   │   └── generate_terrain_around [GL] *** STATE MUTATION *** — Generates/randomizes terrain around a nuclear detonation site
│   │       ├── is_tile_valid [GL] (see above)
│   │       ├── find_city_at [GL] (see above)
│   │       ├── update_tile_all_players [UI] (see above)
│   │       ├── wrap_x [GL] (see above)
│   │       ├── get_tile_ptr [GL] (see above)
│   │       ├── is_tile_ocean [GL] (see above)
│   │       ├── update_civ_visibility [GL] *** STATE MUTATION *** (see above)
│   │       ├── reveal_tile [GL] *** STATE MUTATION ***
│   │       │   ├── is_tile_valid [GL] (see above)
│   │       │   ├── update_civ_visibility [GL] *** STATE MUTATION *** (see above)
│   │       │   ├── get_tile_improvements [GL] (see above)
│   │       │   └── set_tile_improvement_bits [GL] *** STATE MUTATION *** (see above)
│   │       ├── get_tile_improvements [GL] (see above)
│   │       ├── set_tile_improvement_bits [GL] *** STATE MUTATION *** (see above)
│   │       ├── begin_map_batch [GL] *** STATE MUTATION *** (see above)
│   │       └── end_map_batch [GL] *** STATE MUTATION *** (see above)
│   ├── scramble_defenders_to_tile [GL] *** STATE MUTATION *** — Scrambles nearby defensive units to intercept an attack on a tile
│   │   ├── find_path [GL] *** STATE MUTATION *** (see above)
│   │   ├── execute_paradrop [GL] *** STATE MUTATION *** (see above)
│   │   ├── tile_distance_xy [GL] (see above)
│   │   ├── get_unit_moves_remaining [GL] (see above)
│   │   ├── sum_stack_property [GL] (see above)
│   │   ├── get_tile_owner [GL] (see above)
│   │   ├── get_tile_continent [GL] (see above)
│   │   └── get_city_owner_at [GL] (see above)
│   ├── refresh_combat_tiles [UI] — Refreshes display tiles for two map positions after combat
│   │   └── update_map_area_all_players [UI] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── get_unit_max_hp [GL] (see above)
│   ├── get_unit_hp_remaining [GL] *** STATE MUTATION *** (see above)
│   ├── calc_unit_movement_points [GL] (see above)
│   ├── get_unit_moves_remaining [GL] (see above)
│   ├── find_unit_stack_at_xy [GL] (see above)
│   ├── relocate_all_units [GL] *** STATE MUTATION *** (see above)
│   ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│   ├── set_unit_seen_by [GL] *** STATE MUTATION *** (see above)
│   ├── stack_unit [GL] *** STATE MUTATION *** (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   ├── update_civ_visibility [GL] *** STATE MUTATION *** (see above)
│   ├── get_fortress_owner_at [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   └── get_tile_improvements [GL] (see above)
├── spaceship_ai_should_start [AI] (see above)
├── rng_range [GL] *** STATE MUTATION *** (see above)
├── clamp [FW] — Clamps a value to [min, max] range
├── wrap_x [GL] (see above)
├── tile_distance_xy [GL] (see above)
├── calc_movement_cost [GL] (see above)
├── get_unit_max_hp [GL] (see above)
├── get_unit_hp_remaining [GL] *** STATE MUTATION *** (see above)
├── calc_unit_movement_points [GL] (see above)
├── get_unit_moves_remaining [GL] (see above)
├── get_next_unit_in_stack [GL] (see above)
├── get_first_unit_in_stack [GL] (see above)
├── find_unit_stack_at_xy [GL] (see above)
├── set_unit_goto_order [GL] *** STATE MUTATION *** (see above)
├── relocate_unit_in_place [GL] *** STATE MUTATION *** — Relocates a unit to its own current position (used to refresh stack linkage).
│   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
├── check_adjacent_enemy_simple [GL] *** STATE MUTATION *** (see above)
├── check_adjacent_enemy_continent [GL] *** STATE MUTATION *** (see above)
├── check_zoc_if_no_city [GL] *** STATE MUTATION *** (see above)
├── sum_stack_property [GL] (see above)
├── count_units_by_role [GL] (see above)
├── delete_unit_visible [GL] *** STATE MUTATION *** (see above)
├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
├── check_unit_can_improve [GL] (see above)
├── get_tile_ptr [GL] (see above)
├── get_tile_terrain_raw [GL] (see above)
├── is_tile_ocean [GL] (see above)
├── get_tile_continent [GL] (see above)
├── get_tile_continent_if_land [GL] (see above)
├── get_tile_city_radius_owner [GL] (see above)
├── get_tile_fertility [GL] (see above)
├── (get_tile_fertility_or_city_radius) [GL] (see above)
├── get_city_owner_at [GL] (see above)
├── get_fortress_owner_at [GL] (see above)
├── get_unit_owner_at [GL] (see above)
├── check_tile_resource [GL] (see above)
├── check_tile_goody_hut [GL] (see above)
├── (check_tech_bit) [GL] (see above)
└── get_tile_improvements [GL] (see above)
```

## ai_choose_city_production (`00498E8B`, 29400B)

Reachable: 364 functions (59 state-mutating)

```
ai_choose_city_production [AI] (29400B) *** STATE MUTATION *** — The massive AI city production decision function
├── is_tile_valid [GL] — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── show_message [UI] — Stores a message string in the message buffer at the specified slot index.
│   └── _strcpy_thunk [FW] — CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── unknown (dialog show single param) [UI] — Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   └── show_help_topic [UI] — Opens a help topic with default parameters.
│       └── show_help_topic_ext [UI] — Extended help topic opener with additional parameter.
│           └── show_help_dialog [UI]
├── has_building [GL] — Checks if a city has a specific building
│   └── bit_index_to_byte_mask [GL] — Converts a bit index to byte offset and bit mask
├── set_building [GL] *** STATE MUTATION *** — Sets or clears a building bit in a city's building bitfield.
│   └── bit_index_to_byte_mask [GL] (see above)
├── city_adjacent_to_continent [GL] — Checks if a city (param_1) is adjacent to a given continent (param_2)
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] — Wraps an X coordinate for a cylindrical (non-flat) map
│   ├── is_tile_ocean [GL] — Returns true if terrain type == 10 (ocean).
│   │   └── get_tile_terrain_raw [GL] — Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │       └── get_tile_ptr [GL]
│   │           └── is_tile_valid [GL] (see above)
│   └── get_tile_continent [GL] — Returns byte 3 of tile data (continent/landmass ID).
│       └── get_tile_ptr [GL] (see above)
├── find_best_coastal_continent [GL] — Finds the best (largest) coastal continent adjacent to a city
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   └── get_tile_continent [GL] (see above)
├── is_wonder_obsolete [GL] — Checks if a wonder has been made obsolete by any civ researching its obsolescence tech
│   └── civ_has_tech [GL] — Checks if a civilization (param_1) has a specific technology (param_2)
│       └── bit_index_to_byte_mask [GL] (see above)
├── get_wonder_city [GL] — Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   └── is_wonder_obsolete [GL] (see above)
├── civ_has_active_wonder [GL] — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   └── get_wonder_city [GL] (see above)
├── has_spaceship_launched [GL] — Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
├── has_spaceship_built [GL] — Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
├── civ_has_tech [GL] (see above)
├── can_build_unit_type [GL] — Checks if a civilization can build a specific unit type
│   └── civ_has_tech [GL] (see above)
├── can_build_improvement [GL] — Comprehensive check for whether a civ can build a specific city improvement or wonder
│   ├── has_building [GL] (see above)
│   ├── civ_has_active_wonder [GL] (see above)
│   ├── has_spaceship_launched [GL] (see above)
│   ├── civ_has_tech [GL] (see above)
│   └── can_build_wonder [GL] — Checks if a civ can build a specific wonder
│       └── civ_has_tech [GL] (see above)
├── is_tile_worked [GL] — Returns whether a specific tile (param_2) is being worked by city param_1
├── calc_city_production (entry point) [GL] *** STATE MUTATION *** — Entry point for full city production calculation
│   ├── evaluate_city_tiles [GL] *** STATE MUTATION *** — Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530 array
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── wrap_x [GL] (see above)
│   │   ├── get_next_unit_in_stack [GL] — Returns the next unit in the stack linked list, or -1 if at end
│   │   │   └── validate_unit_stack [GL] *** STATE MUTATION ***
│   │   │       ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (see above)
│   │   │       │   ├── show_dialog_message [UI]
│   │   │       │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │       │   │   └── ... (18 more)
│   │   │       │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │       │   │   └── ... (2 more)
│   │   │       │   └── get_tile_ptr [GL] (see above)
│   │   │       ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │       │   ├── is_tile_valid [GL] (see above)
│   │   │       │   ├── show_dialog_message [UI] (see above)
│   │   │       │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │       │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │       │   ├── find_first_unit_at [GL]
│   │   │       │   │   └── ... (1 more)
│   │   │       │   └── get_tile_ptr [GL] (see above)
│   │   │       └── sum_stack_property [GL]
│   │   │           ├── get_next_unit_in_stack [GL] (see above)
│   │   │           └── get_first_unit_in_stack [GL]
│   │   ├── find_unit_stack_at_xy [GL] — Finds the first unit of any civ at map position (param_1, param_2)
│   │   │   ├── validate_unit_stack [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   └── get_unit_owner_at [GL]
│   │   │       ├── get_tile_owner [GL]
│   │   │       │   ├── is_tile_valid [GL] (see above)
│   │   │       │   └── get_tile_ptr [GL] (see above)
│   │   │       └── get_tile_improvements [GL]
│   │   │           └── get_tile_ptr [GL] (see above)
│   │   ├── is_tile_ocean [GL] (see above)
│   │   ├── get_tile_explored [GL] — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │   └── get_tile_ptr [GL] (see above)
│   │   ├── get_city_owner_at [GL] — Returns the city-owning civ at a tile, or -1
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── get_tile_owner [GL] (see above)
│   │   │   └── get_tile_improvements [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   ├── calc_capital_distance_and_corruption [GL] *** STATE MUTATION *** — Calculates distance to capital and corruption-related variables for a city
│   │   ├── has_building [GL] (see above)
│   │   ├── check_trade_route_path [GL] *** STATE MUTATION *** — Checks if a trade route path exists between two points
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── find_path [GL] *** STATE MUTATION ***
│   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   ├── set_map_scroll_position [UI]
│   │   │   │   │   ├── redraw_entire_map [UI] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (6 more)
│   │   │   │   │   └── wrap_x [GL] (see above)
│   │   │   │   ├── debug_show_message [UI]
│   │   │   │   │   └── show_help_topic [UI] (see above)
│   │   │   │   ├── draw_number_on_map [UI]
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── scale_sprite [UI]
│   │   │   │   │   ├── tile_to_screen [UI]
│   │   │   │   │   ├── is_tile_visible [UI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   └── unknown (set/get draw color) [UI]
│   │   │   │   ├── redraw_entire_map [UI] *** STATE MUTATION *** (see above)
│   │   │   │   ├── get_path_cost [GL]
│   │   │   │   ├── set_path_cost [GL] *** STATE MUTATION ***
│   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   ├── distance_x_wrapped [GL]
│   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │   ├── distance_x_wrapped [GL] (see above)
│   │   │   │   │   └── diagonal_movement_cost [GL]
│   │   │   │   ├── find_unit_stack_at_xy [GL] (see above)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── wrap_x [GL] (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (see above)
│   │   │   │   ├── count_units_by_role [GL]
│   │   │   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   │   │   └── get_first_unit_in_stack [GL] (see above)
│   │   │   │   ├── get_tile_ptr [GL] (see above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   │   │   └── get_unit_owner_at [GL] (see above)
│   │   │   │   ├── check_tile_trespass [GL]
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   │   └── get_tile_city_radius_owner [GL]
│   │   │   │   └── get_tile_improvements [GL] (see above)
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   ├── tile_distance_xy [GL]
│   │   │   ├── get_tile_continent_if_land [GL]
│   │   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   │   └── get_tile_continent [GL] (see above)
│   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   ├── get_tile_controller [GL] (see above)
│   │   │   └── get_tile_improvements [GL] (see above)
│   │   ├── civ_has_tech [GL] (see above)
│   │   ├── is_tile_worked [GL] (see above)
│   │   ├── calc_movement_cost [GL] (see above)
│   │   └── get_tile_continent [GL] (see above)
│   ├── calc_shields_per_row [GL] *** STATE MUTATION *** — Calculates shield production rows and unit support costs for a city
│   │   ├── check_unit_support [GL] *** STATE MUTATION *** — Checks if a unit requires shield support based on government type
│   │   ├── calc_food_box_size [GL] *** STATE MUTATION *** — Calculates the food box size (rows to grow) for a city
│   │   ├── tile_distance_xy [GL] (see above)
│   │   ├── get_city_owner_at [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   └── recalc_city_all [GL] *** STATE MUTATION *** — Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, computes production, and d...
│       ├── assign_worker_tiles [GL] *** STATE MUTATION *** — Assigns city workers to optimal tiles
│       │   ├── is_tile_worked [GL] (see above)
│       │   ├── calc_tile_resource [GL] *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (see above)
│       │   │   ├── grassland_has_shield [GL]
│       │   │   ├── find_city_at [GL]
│       │   │   │   ├── is_tile_valid [GL] (see above)
│       │   │   │   └── get_city_owner_at [GL] (see above)
│       │   │   ├── has_building [GL] (see above)
│       │   │   ├── get_wonder_city [GL] (see above)
│       │   │   ├── civ_has_tech [GL] (see above)
│       │   │   ├── check_auto_irrigation_trigger [GL] *** STATE MUTATION ***
│       │   │   │   ├── check_adjacent_water [GL]
│       │   │   │   └── get_tile_terrain_raw [GL] (see above)
│       │   │   ├── check_road_trade_trigger [GL] *** STATE MUTATION ***
│       │   │   │   ├── civ_has_tech [GL] (see above)
│       │   │   │   └── get_tile_ptr [GL] (see above)
│       │   │   ├── check_adjacent_water [GL] (see above)
│       │   │   ├── wrap_x [GL] (see above)
│       │   │   ├── get_tile_ptr [GL] (see above)
│       │   │   ├── get_tile_terrain_raw [GL] (see above)
│       │   │   ├── get_city_owner_at [GL] (see above)
│       │   │   ├── get_tile_controller [GL] (see above)
│       │   │   ├── check_tile_resource [GL]
│       │   │   │   ├── is_tile_valid [GL] (see above)
│       │   │   │   └── get_tile_ptr [GL] (see above)
│       │   │   ├── get_tile_improvements [GL] (see above)
│       │   │   ├── set_tile_owner [GL] *** STATE MUTATION ***
│       │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   │   │   ├── get_tile_ptr [GL] (see above)
│       │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***
│       │   │   └── set_tile_city_radius_owner [GL] *** STATE MUTATION ***
│       │   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   │       ├── get_tile_ptr [GL] (see above)
│       │   │       └── queue_map_update [GL] *** STATE MUTATION *** (see above)
│       │   ├── calc_tile_all_resources [GL] *** STATE MUTATION ***
│       │   │   └── calc_tile_resource [GL] *** STATE MUTATION *** (see above)
│       │   ├── clear_and_check_worked_tiles [GL] *** STATE MUTATION ***
│       │   │   ├── set_tile_worked [GL] *** STATE MUTATION ***
│       │   │   └── unknown (get_city_tile_flag) [GL]
│       │   └── unknown (get_city_tile_flag) [GL] (see above)
│       ├── sync_worker_tile_status [GL] *** STATE MUTATION *** — Synchronizes worker tile status flags with the current tile assignment state
│       │   ├── set_worker_tile_status [GL] *** STATE MUTATION ***
│       │   └── get_worker_tile_status [GL]
│       ├── calc_city_production [GL] *** STATE MUTATION *** — Calculates a city's production output including building bonuses, factory effects, and waste
│       │   ├── has_building [GL] (see above)
│       │   ├── civ_has_active_wonder [GL] (see above)
│       │   ├── civ_has_tech [GL] (see above)
│       │   └── calc_corruption [GL] *** STATE MUTATION ***
│       │       ├── has_building [GL] (see above)
│       │       └── calc_corruption_divisor [GL]
│       ├── calc_happiness [GL] *** STATE MUTATION *** — Complete happiness calculation for a city
│       │   ├── has_building [GL] (see above)
│       │   ├── calc_city_trade_desirability [GL] *** STATE MUTATION ***
│       │   │   ├── is_tile_valid [GL] (see above)
│       │   │   ├── has_building [GL] (see above)
│       │   │   ├── civ_has_active_wonder [GL] (see above)
│       │   │   ├── civ_has_tech [GL] (see above)
│       │   │   ├── wrap_x [GL] (see above)
│       │   │   ├── bit_index_to_byte_mask [GL] (see above)
│       │   │   ├── shift_by_signed [GL]
│       │   │   ├── get_tile_ptr [GL] (see above)
│       │   │   ├── get_tile_terrain_raw [GL] (see above)
│       │   │   ├── get_tile_continent [GL] (see above)
│       │   │   ├── check_tile_resource [GL] (see above)
│       │   │   └── get_tile_improvements [GL] (see above)
│       │   ├── get_wonder_city [GL] (see above)
│       │   ├── civ_has_active_wonder [GL] (see above)
│       │   ├── check_trade_route_path [GL] *** STATE MUTATION *** (see above)
│       │   ├── civ_has_tech [GL] (see above)
│       │   ├── calc_corruption [GL] *** STATE MUTATION *** (see above)
│       │   ├── adjust_happy_unhappy [GL] *** STATE MUTATION ***
│       │   ├── distribute_trade [GL] *** STATE MUTATION ***
│       │   │   ├── has_building [GL] (see above)
│       │   │   ├── get_wonder_city [GL] (see above)
│       │   │   ├── civ_has_active_wonder [GL] (see above)
│       │   │   ├── civ_has_tech [GL] (see above)
│       │   │   └── count_worker_tiles_with_status [GL]
│       │   │       └── get_worker_tile_status [GL] (see above)
│       │   ├── calc_movement_cost [GL] (see above)
│       │   ├── get_next_unit_in_stack [GL] (see above)
│       │   └── find_unit_stack_at_xy [GL] (see above)
│       └── calc_trade_route_income [GL] *** STATE MUTATION *** — Calculates trade route income
├── spaceship_ai_evaluate [AI] — AI evaluation of which spaceship category to build next
│   ├── has_spaceship_launched [GL] (see above)
│   ├── civ_has_tech [GL] (see above)
│   ├── spaceship_get_category_count [GL] — Gets the total max allowed for a spaceship category: structural (type 0), components (types 1+2 summed), or modules (...
│   │   └── spaceship_get_max_component [GL] — Gets the maximum allowed count for a spaceship component type (param_2: 0=structural, 1-2=component, 3-5=module)
│   ├── spaceship_get_raw_count [GL] — Returns the raw (unclamped) total count of spaceship parts for a category
│   ├── spaceship_get_clamped_category [GL] — Returns the clamped total for a spaceship category (sum of clamped individual component counts).
│   │   └── spaceship_get_clamped_count [GL] — Returns the clamped count of a spaceship component — min of current count and max allowed.
│   │       └── spaceship_get_max_component [GL] (see above)
│   ├── spaceship_recalc_stats [GL] *** STATE MUTATION *** — Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support ratio, flight time, suc...
│   │   ├── calc_year_from_turn [GL] — Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   │   ├── has_spaceship_launched [GL] (see above)
│   │   ├── civ_has_tech [GL] (see above)
│   │   ├── spaceship_get_clamped_count [GL] (see above)
│   │   └── spaceship_calc_population_capacity [GL] — Calculates population capacity from habitation module count
│   ├── unknown (spaceship section complete check) [GL] — Returns true if a civ's raw component count for a category meets or exceeds the global maximum for that category.
│   │   ├── spaceship_get_max_category [GL] — Returns the absolute maximum for a spaceship category from the global limits table
│   │   └── spaceship_get_raw_count [GL] (see above)
│   └── spaceship_can_build_category [GL] — Checks if a civ can build in a spaceship category
│       ├── civ_has_tech [GL] (see above)
│       ├── spaceship_get_raw_count [GL] (see above)
│       ├── unknown (spaceship section complete check) [GL] (see above)
│       └── unknown (spaceship category full check) [GL] — Returns true if raw count >= max allowed for a spaceship category.
│           ├── spaceship_get_category_count [GL] (see above)
│           └── spaceship_get_raw_count [GL] (see above)
├── spaceship_is_enabled [GL] — Returns whether the spaceship victory condition is enabled
├── spaceship_ai_should_start [AI] — Determines if an AI civ should start building spaceship parts
│   ├── has_spaceship_launched [GL] (see above)
│   ├── civ_has_tech [GL] (see above)
│   ├── spaceship_is_enabled [GL] (see above)
│   └── clamp [FW] — Clamps a value to [min, max] range
├── rng_range [GL] *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2]
│   └── rng_next_float [GL] *** STATE MUTATION *** — Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + 0x3C6EF35F
├── clamp [FW] (see above)
├── wrap_x [GL] (see above)
├── tile_distance_xy [GL] (see above)
├── calc_unit_movement_points [GL] — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   ├── civ_has_active_wonder [GL] (see above)
│   ├── civ_has_tech [GL] (see above)
│   ├── get_unit_max_hp [GL] — Returns the maximum hit points for a unit based on its type.
│   └── get_unit_hp_remaining [GL] *** STATE MUTATION *** — Returns the remaining HP of a unit (max_hp - damage)
│       └── get_unit_max_hp [GL] (see above)
├── get_unit_moves_remaining [GL] — Returns remaining movement points (total - spent)
│   └── calc_unit_movement_points [GL] (see above)
├── get_next_unit_in_stack [GL] (see above)
├── find_unit_stack_at_xy [GL] (see above)
├── relocate_unit [GL] *** STATE MUTATION *** — Moves a unit from its current position to a new position by picking it up and putting it down
│   ├── show_dialog_message [UI] (see above)
│   ├── get_tick_count_wrapper [FW] — Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── unknown (get mp object byte) [FW] — Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
│   └── put_down_unit [GL] *** STATE MUTATION *** (see above)
├── delete_unit [GL] *** STATE MUTATION *** — Deletes a unit
│   ├── 0000C494 [?]
│   ├── 0000C679 [?]
│   ├── show_dialog_message [UI] (see above)
│   ├── get_tick_count_wrapper [FW] (see above)
│   ├── unknown (get mp object byte) [FW] (see above)
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   └── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
├── check_adjacent_enemy_continent [GL] *** STATE MUTATION *** — Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   ├── is_tile_valid [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   └── get_unit_owner_at [GL] (see above)
├── sum_stack_property [GL] (see above)
├── count_units_by_role [GL] (see above)
├── is_unit_active [GL] — Returns 1 if a unit is "active" — alive, has valid position, not on goto, and has remaining movement.
│   └── get_unit_moves_remaining [GL] (see above)
├── refresh_unit_movement [GL] *** STATE MUTATION *** — Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   └── calc_unit_movement_points [GL] (see above)
├── check_unit_can_improve [GL] — Checks if a settler/engineer unit can perform a specific terrain improvement at a location
│   ├── civ_has_tech [GL] (see above)
│   ├── check_adjacent_water [GL] (see above)
│   ├── get_tile_terrain_raw [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   └── get_tile_improvements [GL] (see above)
├── get_tile_ptr [GL] (see above)
├── get_tile_terrain_raw [GL] (see above)
├── get_tile_continent [GL] (see above)
├── get_unit_owner_at [GL] (see above)
├── check_tile_resource [GL] (see above)
├── (count_techs_discovered) [GL] — Counts total technologies discovered (1 through 62).
│   └── (check_tech_bit) [GL] — Checks if a specific technology has been discovered by a civ
│       └── bit_index_to_byte_mask [GL] (see above)
├── get_tile_improvements [GL] (see above)
└── set_tile_improvement_bits [GL] *** STATE MUTATION *** — Sets or clears improvement bits on a tile
    ├── net_send_message [GL] *** STATE MUTATION *** (see above)
    ├── get_tile_ptr [GL] (see above)
    └── queue_map_update [GL] *** STATE MUTATION *** (see above)
```

## ai_barbarian_unit_turn (`005351AA`, 6102B)

Reachable: 569 functions (59 state-mutating)

```
ai_barbarian_unit_turn [AI] (6102B) *** STATE MUTATION *** — AI turn logic for barbarian units (civ 0)
├── is_tile_valid [GL] — Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
├── show_message [UI] — Stores a message string in the message buffer at the specified slot index.
│   └── _strcpy_thunk [FW] — CRT strcpy — optimized DWORD-aligned string copy with null terminator detection.
├── scroll_all_views_if_needed [UI] *** STATE MUTATION *** — Iterates all 8 map views and scrolls each active view if the given position is near edges
│   └── scroll_map_if_needed [UI] — Checks if position (param_1, param_2) is near the edges of the visible map area and scrolls the map if necessary
│       └── set_map_scroll_position [UI] — Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│           ├── redraw_entire_map [UI] *** STATE MUTATION ***
│           │   ├── minimap_full_redraw [UI]
│           │   │   ├── minimap_calc_viewport [UI] *** STATE MUTATION ***
│           │   │   │   └── ... (1 more)
│           │   │   ├── minimap_get_tile_color [UI]
│           │   │   │   └── ... (3 more)
│           │   │   ├── minimap_draw_goto_line [UI]
│           │   │   │   └── ... (3 more)
│           │   │   ├── flush_display [UI]
│           │   │   ├── end_paint [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── surface_set_clear_color [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── fill_rect_palette [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── is_tile_valid [GL] (see above)
│           │   │   ├── unknown (dialog_render_title_bar) [UI]
│           │   │   │   └── ... (15 more)
│           │   │   ├── dialog_create_buttons [UI]
│           │   │   │   └── ... (8 more)
│           │   │   ├── prepare_surface [UI]
│           │   │   └── wrap_x [GL]
│           │   ├── recalc_viewport_geometry [UI]
│           │   │   ├── set_editor_font [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── reset_sprite_scale [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── scale_at_current_zoom [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── set_current_zoom_scale [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── wrap_x [GL] (see above)
│           │   │   ├── port_alloc_rect [UI]
│           │   │   │   └── ... (1 more)
│           │   │   ├── scale_table_build_primary [UI]
│           │   │   └── unknown (sprite blit wrapper 1) [UI]
│           │   │       └── ... (1 more)
│           │   ├── redraw_full_viewport [UI]
│           │   │   ├── draw_complete_tile [UI]
│           │   │   │   └── ... (6 more)
│           │   │   ├── draw_city_labels [UI]
│           │   │   │   └── ... (9 more)
│           │   │   ├── unknown (clear_surface_region) [UI]
│           │   │   │   └── ... (1 more)
│           │   │   └── wrap_x [GL] (see above)
│           │   ├── begin_end_paint_cycle [UI]
│           │   │   ├── flush_display [UI] (see above)
│           │   │   ├── end_paint [UI] (see above)
│           │   │   └── network_poll [MIXED] *** STATE MUTATION ***
│           │   ├── unknown (dialog_render_title_bar) [UI] (see above)
│           │   └── dialog_create_buttons [UI] (see above)
│           └── wrap_x [GL] (see above)
├── mp_set_number_control [UI] *** STATE MUTATION *** — Sets a numeric control value in the multiplayer dialog number table.
├── find_nearest_city [GL] — Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status
│   ├── is_tile_valid [GL] (see above)
│   ├── has_building [GL] — Checks if a city has a specific building
│   │   └── bit_index_to_byte_mask [GL] — Converts a bit index to byte offset and bit mask
│   ├── calc_movement_cost [GL] — Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   ├── distance_x_wrapped [GL] — Computes the minimum X distance between two points, accounting for map wrapping on cylindrical maps.
│   │   └── diagonal_movement_cost [GL] — Computes a diagonal movement cost from dx/dy
│   └── get_tile_continent_if_land [GL] — Returns continent ID only if tile is not ocean, otherwise -1.
│       ├── is_tile_ocean [GL] — Returns true if terrain type == 10 (ocean).
│       │   └── get_tile_terrain_raw [GL]
│       │       └── get_tile_ptr [GL]
│       │           └── is_tile_valid [GL] (see above)
│       └── get_tile_continent [GL] — Returns byte 3 of tile data (continent/landmass ID).
│           └── get_tile_ptr [GL] (see above)
├── show_game_popup_2arg [UI] — Shows a game popup dialog with 2 arguments using the global dialog context.
│   └── show_unit_type_picker [UI] — Shows a unit type picker dialog for the Civilopedia.
│       ├── select_list_item [UI] — Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │   └── popup_show_modal [UI]
│       │       ├── flush_display [UI] (see above)
│       │       ├── process_messages [UI]
│       │       ├── get_view_window_handle [UI]
│       │       ├── get_edit_text [UI]
│       │       ├── init_palette_system [UI]
│       │       ├── unknown — manage window [UI]
│       │       ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│       │       │   ├── unknown (get drawing context) [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── widget_scrollbar_dtor [UI]
│       │       │   │   └── ... (1 more)
│       │       │   └── widget_dropdown_dtor [UI]
│       │       ├── popup_paint [UI]
│       │       │   ├── end_paint [UI] (see above)
│       │       │   ├── show_window_wrapper [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── set_rect_abs [UI]
│       │       │   ├── set_rect_wh [UI]
│       │       │   ├── measure_text_height [UI]
│       │       │   ├── control_invalidate [UI]
│       │       │   ├── draw_border_rect [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── scale_sprite [UI]
│       │       │   ├── set_sprite_scale [UI]
│       │       │   ├── init_editor_scrollbar [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── widget_get_height [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── widget_inflate_rect_neg [UI]
│       │       │   │   └── ... (1 more)
│       │       │   ├── popup_get_padded_height [UI]
│       │       │   ├── popup_render_label [UI]
│       │       │   │   └── ... (3 more)
│       │       │   ├── popup_layout_text [UI]
│       │       │   │   └── ... (2 more)
│       │       │   ├── popup_layout_dialog [UI]
│       │       │   │   └── ... (15 more)
│       │       │   ├── popup_redraw_visible_items [UI]
│       │       │   │   └── ... (8 more)
│       │       │   ├── popup_create_window [UI]
│       │       │   │   └── ... (5 more)
│       │       │   ├── popup_init_controls [UI]
│       │       │   │   └── ... (29 more)
│       │       │   ├── popup_draw_background [UI]
│       │       │   │   └── ... (5 more)
│       │       │   ├── unknown (popup_draw_icon) [UI]
│       │       │   ├── draw_3d_border [UI]
│       │       │   │   └── ... (2 more)
│       │       │   ├── port_draw_text_styled [UI]
│       │       │   │   └── ... (2 more)
│       │       │   ├── port_fill_rect_pattern [UI]
│       │       │   │   └── ... (2 more)
│       │       │   ├── unknown (set/get draw color) [UI]
│       │       │   ├── unknown (sprite blit wrapper 1) [UI] (see above)
│       │       │   └── unknown (invalidate_all_children) [UI]
│       │       ├── unknown (popup_get_item_text) [UI]
│       │       ├── unknown (popup_get_edit_text) [UI]
│       │       └── modal_dialog_run [UI]
│       │           ├── process_messages [UI] (see above)
│       │           ├── get_view_window_handle [UI] (see above)
│       │           ├── disable_parent_window [UI]
│       │           └── enable_parent_window [UI]
│       ├── popup_dialog_create [UI] — Creates a new popup dialog object
│       │   ├── unknown (popup list init) [UI]
│       │   └── popup_dialog_reset [UI]
│       ├── popup_add_button [UI] — Adds a button to the popup dialog
│       │   ├── measure_text_height [UI] (see above)
│       │   └── init_editor_scrollbar [UI] (see above)
│       └── sprite_init_empty [UI] — Initializes a sprite with given dimensions and fill color
│           ├── port_alloc_rect [UI] (see above)
│           ├── port_set_color [UI]
│           │   └── port_fill_rect [UI]
│           │       ├── rect_get_width [UI]
│           │       ├── rect_get_height [UI]
│           │       ├── port_lock [UI]
│           │       │   └── ... (2 more)
│           │       ├── surface_is_locked [UI]
│           │       ├── get_surface_buffer_handle [UI]
│           │       ├── check_topdown [UI]
│           │       └── fill_rect_8bit [UI]
│           └── unknown (sprite extract with rect params) [UI]
│               ├── sprite_lock_data [UI]
│               └── sprite_extract_from_oleitem [UI]
│                   ├── rect_get_width [UI] (see above)
│                   ├── rect_get_height [UI] (see above)
│                   ├── port_lock [UI] (see above)
│                   ├── port_unlock [UI]
│                   ├── port_get_pixel_ptr [UI]
│                   ├── surface_is_locked [UI] (see above)
│                   ├── pixel_ptr_next_row [UI]
│                   ├── pixel_ptr_prev_row [UI]
│                   └── sprite_unlock_data [UI]
├── update_tile_all_players [UI] — Updates a single tile for all active players.
│   └── update_map_tile [UI] — Updates a single map tile (radius 0, current player, with invalidate).
│       └── update_map_area [UI] *** STATE MUTATION *** — Redraws a map area and optionally invalidates it
│           ├── tile_to_screen [UI]
│           │   └── wrap_x [GL] (see above)
│           ├── is_tile_visible [UI]
│           │   └── is_tile_in_viewport_rect [UI]
│           │       └── is_x_in_range [UI]
│           ├── redraw_tile_area [UI]
│           │   ├── draw_complete_tile [UI] (see above)
│           │   ├── is_tile_visible [UI] (see above)
│           │   ├── draw_city_labels [UI] (see above)
│           │   ├── calc_tile_group_rect [UI]
│           │   │   ├── set_rect_wh [UI] (see above)
│           │   │   ├── tile_to_screen [UI] (see above)
│           │   │   └── intersect_rect_wrapper [UI]
│           │   ├── wrap_x [GL] (see above)
│           │   └── port_set_rect [UI]
│           ├── invalidate_tile_area [UI]
│           │   ├── invalidate_region [UI]
│           │   │   ├── blit_rect_to_screen [UI]
│           │   │   │   └── ... (1 more)
│           │   │   └── port_copy_to_screen_clipped [UI]
│           │   │       └── ... (2 more)
│           │   └── calc_tile_group_rect [UI] (see above)
│           ├── reset_sprite_scale [UI] (see above)
│           ├── set_current_zoom_scale [UI] (see above)
│           └── unknown (sprite blit wrapper 1) [UI] (see above)
├── open_text_file_section_fallback [FW] — Tries to open a text file section
│   ├── open_text_file_section [FW] — Opens a text file and seeks to a named section (prefixed with @)
│   │   └── parley_find_entry [GL] — Searches the loaded index for a section name
│   └── _strcpy_thunk [FW] (see above)
├── read_next_line [FW] — Reads the next line from the open text file into DAT_00679640 (255 char buffer)
│   ├── close_text_file [FW] — Closes the currently open text file (DAT_0062cd20) if non-null, and sets it to null.
│   ├── unknown — string trim leading whitespace [FW] — Trims leading whitespace (spaces and tabs) from a string in-place
│   └── strip_trailing_newline [FW] — Strips the last newline (0x0a) from a string by replacing it with null.
├── calc_unit_goto_direction [GL] *** STATE MUTATION *** — Calculates the next move direction for a unit executing a goto order
│   ├── is_tile_valid [GL] (see above)
│   ├── direction_from_delta [GL] — Converts an (x,y) delta into a direction index (0-7)
│   ├── find_path [GL] *** STATE MUTATION *** — BFS pathfinding algorithm
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── set_map_scroll_position [UI] (see above)
│   │   ├── debug_show_message [UI] — Shows a debug message popup using the DEBUG template string.
│   │   │   └── show_help_topic [UI]
│   │   │       └── show_help_topic_ext [UI]
│   │   │           └── show_help_dialog [UI]
│   │   ├── draw_number_on_map [UI] — Draws a number label on the map at a given tile position
│   │   │   ├── invalidate_region [UI] (see above)
│   │   │   ├── set_rect_wh [UI] (see above)
│   │   │   ├── scale_sprite [UI] (see above)
│   │   │   ├── tile_to_screen [UI] (see above)
│   │   │   ├── is_tile_visible [UI] (see above)
│   │   │   ├── port_measure_text [UI]
│   │   │   │   └── unknown (set/get draw color) [UI] (see above)
│   │   │   └── unknown (set/get draw color) [UI] (see above)
│   │   ├── redraw_entire_map [UI] *** STATE MUTATION *** (see above)
│   │   ├── get_path_cost [GL] — Returns the BFS path cost at map position (param_1, param_2)
│   │   ├── set_path_cost [GL] *** STATE MUTATION *** — Stores a BFS path cost at map position (param_1, param_2).
│   │   ├── wrap_x [GL] (see above)
│   │   ├── distance_x_wrapped [GL] (see above)
│   │   ├── calc_movement_cost [GL] (see above)
│   │   ├── find_unit_stack_at_xy [GL] — Finds the first unit of any civ at map position (param_1, param_2)
│   │   │   ├── validate_unit_stack [GL] *** STATE MUTATION ***
│   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (16 more)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │   └── ... (2 more)
│   │   │   │   │   └── get_tile_ptr [GL] (see above)
│   │   │   │   ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   │   │   ├── show_dialog_message [UI] (see above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   │   │   │   │   ├── find_first_unit_at [GL]
│   │   │   │   │   │   └── ... (1 more)
│   │   │   │   │   └── get_tile_ptr [GL] (see above)
│   │   │   │   └── sum_stack_property [GL]
│   │   │   │       ├── get_next_unit_in_stack [GL]
│   │   │   │       └── get_first_unit_in_stack [GL]
│   │   │   ├── get_first_unit_in_stack [GL] (see above)
│   │   │   └── get_unit_owner_at [GL]
│   │   │       ├── get_tile_owner [GL]
│   │   │       │   ├── is_tile_valid [GL] (see above)
│   │   │       │   └── get_tile_ptr [GL] (see above)
│   │   │       └── get_tile_improvements [GL]
│   │   │           └── get_tile_ptr [GL] (see above)
│   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION *** — Simple check for adjacent enemy units — no ocean/continent checks
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   └── get_unit_owner_at [GL] (see above)
│   │   ├── count_units_by_role [GL] — Counts units in a stack that have a specific role.
│   │   │   ├── get_next_unit_in_stack [GL] (see above)
│   │   │   └── get_first_unit_in_stack [GL] (see above)
│   │   ├── get_tile_ptr [GL] (see above)
│   │   ├── get_tile_terrain_raw [GL] (see above)
│   │   ├── is_tile_ocean [GL] (see above)
│   │   ├── get_city_owner_at [GL] — Returns the city-owning civ at a tile, or -1
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── get_tile_owner [GL] (see above)
│   │   │   └── get_tile_improvements [GL] (see above)
│   │   ├── get_tile_controller [GL] — Returns the controlling civ at a tile — city owner first, then unit owner.
│   │   │   ├── get_city_owner_at [GL] (see above)
│   │   │   └── get_unit_owner_at [GL] (see above)
│   │   ├── check_tile_trespass [GL] — Checks if civ param_3 is trespassing at tile (param_1, param_2)
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   └── get_tile_city_radius_owner [GL]
│   │   │       └── get_tile_ptr [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   ├── find_road_path [GL] *** STATE MUTATION *** — Finds a path using the road/rail network between two points
│   │   ├── is_tile_valid [GL] (see above)
│   │   ├── calc_path_distance [GL] *** STATE MUTATION *** — Calculates path distance between two points using BFS pathfinding
│   │   │   └── find_path [GL] *** STATE MUTATION *** (see above)
│   │   ├── find_adjacent_terrain_type [GL] — Finds the first adjacent tile matching a given terrain type (land=0 or sea=nonzero)
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   └── is_tile_ocean [GL] (see above)
│   │   ├── find_nearest_road_tile [GL] *** STATE MUTATION *** — Finds the nearest tile connected to the road network
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── calc_path_distance [GL] *** STATE MUTATION *** (see above)
│   │   │   ├── find_adjacent_terrain_type [GL] (see above)
│   │   │   ├── get_land_connectivity [GL]
│   │   │   ├── get_sea_connectivity [GL]
│   │   │   ├── wrap_y [GL]
│   │   │   └── calc_movement_cost [GL] (see above)
│   │   ├── get_land_connectivity [GL] (see above)
│   │   ├── get_sea_connectivity [GL] (see above)
│   │   ├── get_bfs_visited [GL] — Returns pointer to BFS visited byte at (param_1, param_2).
│   │   ├── wrap_x [GL] (see above)
│   │   ├── wrap_y [GL] (see above)
│   │   └── calc_movement_cost [GL] (see above)
│   ├── wrap_x [GL] (see above)
│   ├── distance_x_wrapped [GL] (see above)
│   ├── tile_distance_xy [GL] — Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`
│   ├── calc_unit_movement_points [GL] — Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │   ├── civ_has_active_wonder [GL] — Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2)
│   │   │   └── get_wonder_city [GL]
│   │   │       └── is_wonder_obsolete [GL]
│   │   │           └── civ_has_tech [GL]
│   │   ├── civ_has_tech [GL] (see above)
│   │   ├── get_unit_max_hp [GL] — Returns the maximum hit points for a unit based on its type.
│   │   └── get_unit_hp_remaining [GL] *** STATE MUTATION *** — Returns the remaining HP of a unit (max_hp - damage)
│   │       └── get_unit_max_hp [GL] (see above)
│   ├── check_zoc_if_no_city [GL] *** STATE MUTATION *** — Checks ZOC only if there's no city at the location
│   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION *** — Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   │   ├── is_tile_valid [GL] (see above)
│   │   │   ├── wrap_x [GL] (see above)
│   │   │   ├── is_tile_ocean [GL] (see above)
│   │   │   └── get_unit_owner_at [GL] (see above)
│   │   └── get_city_owner_at [GL] (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** — Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   └── calc_unit_movement_points [GL] (see above)
│   ├── get_tile_ptr [GL] (see above)
│   ├── get_tile_terrain_raw [GL] (see above)
│   ├── get_city_owner_at [GL] (see above)
│   ├── get_fortress_owner_at [GL] — Returns the fortress-owning civ at a tile, or -1
│   │   ├── get_tile_owner [GL] (see above)
│   │   └── get_tile_improvements [GL] (see above)
│   ├── get_unit_owner_at [GL] (see above)
│   └── get_tile_improvements [GL] (see above)
├── unit_pillage [GL] *** STATE MUTATION *** — Pillages improvements on a tile
│   ├── find_nearest_city [GL] (see above)
│   ├── set_treaty_flags [GL] *** STATE MUTATION *** — Sets specified treaty flag bits between two civilizations
│   │   ├── clear_treaty_flags [GL] *** STATE MUTATION *** — Clears specified treaty flag bits between two civilizations
│   │   │   └── clear_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   │   └── set_treaty_flags [GL] *** STATE MUTATION *** (see above)
│   ├── update_map_area_all_players [UI] — Updates a map area for all active players (all viewports in MP).
│   │   └── update_map_area [UI] *** STATE MUTATION *** (see above)
│   ├── ai_add_goal_a [AI] *** STATE MUTATION *** — Adds a goal to AI goal list A
│   │   ├── ai_shift_goals_down_a [AI] *** STATE MUTATION *** — Recursively shifts AI goal_a entries down by one position starting from param_2
│   │   │   └── ai_shift_goals_down_a [AI] *** STATE MUTATION *** (see above)
│   │   ├── calc_movement_cost [GL] (see above)
│   │   ├── get_unit_moves_remaining [GL] — Returns remaining movement points (total - spent)
│   │   │   └── calc_unit_movement_points [GL] (see above)
│   │   ├── is_unit_active [GL] — Returns 1 if a unit is "active" — alive, has valid position, not on goto, and has remaining movement.
│   │   │   └── get_unit_moves_remaining [GL] (see above)
│   │   └── get_tile_continent [GL] (see above)
│   ├── diplomacy_check_attack_allowed [GL] — Checks whether civ param_1 is allowed to attack civ param_2 given current treaties
│   │   ├── show_message [UI] (see above)
│   │   ├── show_dialog_message [UI] (see above)
│   │   ├── get_civ_name [UI] — Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │   └── get_civ_adjective_name [GL]
│   │   ├── civ_has_active_wonder [GL] (see above)
│   │   ├── get_civ_people_name [GL] — Returns the people name for a civilization (e.g., "Roman")
│   │   └── check_can_declare_war [GL] — Checks if a civ can declare war
│   │       └── civ_has_active_wonder [GL] (see above)
│   ├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
│   ├── get_tile_ptr [GL] (see above)
│   ├── update_civ_visibility [GL] *** STATE MUTATION *** — Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility map.
│   │   ├── get_tile_ptr [GL] (see above)
│   │   └── set_civ_tile_data [GL] *** STATE MUTATION *** — Sets a civ's tile visibility byte
│   │       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   │       ├── get_civ_vis_ptr [GL]
│   │       └── queue_map_update [GL] *** STATE MUTATION ***
│   │           └── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── get_tile_improvements [GL] (see above)
│   └── set_tile_improvement_bits [GL] *** STATE MUTATION *** — Sets or clears improvement bits on a tile
│       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       ├── get_tile_ptr [GL] (see above)
│       └── queue_map_update [GL] *** STATE MUTATION *** (see above)
├── enqueue_mp_event [MIXED] — Enqueues a multiplayer event message
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   └── _strcpy_thunk [FW] (see above)
├── ai_cancel_goto_on_domain [AI] *** STATE MUTATION *** — Iterates through units stacked with param_1 and cancels goto orders for units of matching domain types (param_2 bitmask)
│   ├── get_next_unit_in_stack [GL] (see above)
│   └── get_first_unit_in_stack [GL] (see above)
├── ai_set_goto_order [AI] *** STATE MUTATION *** — Sets a goto order on a unit
├── ai_set_goto_via_coast [AI] *** STATE MUTATION *** — Sets a goto order for a naval unit, finding a coastal tile adjacent to the target that shares a water connection with...
│   ├── is_tile_valid [GL] (see above)
│   ├── ai_set_goto_order [AI] *** STATE MUTATION *** (see above)
│   ├── wrap_x [GL] (see above)
│   ├── is_tile_ocean [GL] (see above)
│   ├── get_tile_continent [GL] (see above)
│   └── get_city_owner_at [GL] (see above)
├── calc_city_value_for_capture [GL] — Calculates the strategic value of a city (param_1 = city index) for capture/transfer purposes
├── rng_range [GL] *** STATE MUTATION *** — Returns a random integer in the range [param_1, param_2]
│   └── rng_next_float [GL] *** STATE MUTATION *** — Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + 0x3C6EF35F
├── wrap_x [GL] (see above)
├── calc_movement_cost [GL] (see above)
├── get_unit_moves_remaining [GL] (see above)
├── get_next_unit_in_stack [GL] (see above)
├── find_unit_stack_at_xy [GL] (see above)
├── delete_all_units_in_stack [GL] *** STATE MUTATION *** — Deletes every unit in a stack by iterating from first to last.
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── get_first_unit_in_stack [GL] (see above)
│   └── delete_unit [GL] *** STATE MUTATION *** — Deletes a unit
│       ├── show_dialog_message [UI] (see above)
│       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       └── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
├── set_stack_seen_by [GL] *** STATE MUTATION *** — Sets visibility for all units in a stack to be seen by a specific civ.
│   ├── get_next_unit_in_stack [GL] (see above)
│   ├── get_first_unit_in_stack [GL] (see above)
│   └── set_unit_seen_by [GL] *** STATE MUTATION *** — Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask)
├── check_zoc_if_no_city [GL] *** STATE MUTATION *** (see above)
├── sum_stack_property [GL] (see above)
├── count_units_by_role [GL] (see above)
├── delete_unit_visible [GL] *** STATE MUTATION *** — Deletes a unit and refreshes the map display at its former position
│   ├── is_tile_valid [GL] (see above)
│   ├── show_dialog_message [UI] (see above)
│   ├── get_tick_count_wrapper [FW] — Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   ├── unknown (get mp object byte) [FW] — Returns a single byte from offset 0x1ef within the current object (in_ECX).
│   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│   ├── update_tile_all_players [UI] (see above)
│   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│   └── delete_unit_safely [GL] *** STATE MUTATION *** — Safely deletes a unit, handling the case where it's a ship carrying units
│       ├── is_tile_valid [GL] (see above)
│       ├── show_dialog_message [UI] (see above)
│       ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       ├── delete_unit [GL] *** STATE MUTATION *** (see above)
│       ├── delete_all_units_in_stack [GL] *** STATE MUTATION *** (see above)
│       ├── load_unit_onto_ship [GL] *** STATE MUTATION *** — Loads ground/air units onto a transport ship
│       │   ├── is_tile_valid [GL] (see above)
│       │   ├── show_dialog_message [UI] (see above)
│       │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       │   ├── get_next_unit_in_stack [GL] (see above)
│       │   ├── get_first_unit_in_stack [GL] (see above)
│       │   ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│       │   ├── relocate_unit [GL] *** STATE MUTATION ***
│       │   │   ├── show_dialog_message [UI] (see above)
│       │   │   ├── net_send_message [GL] *** STATE MUTATION *** (see above)
│       │   │   ├── network_poll [MIXED] *** STATE MUTATION *** (see above)
│       │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION *** (see above)
│       │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION *** (see above)
│       │   │   └── put_down_unit [GL] *** STATE MUTATION *** (see above)
│       │   ├── eject_air_units [GL] *** STATE MUTATION ***
│       │   │   ├── get_next_unit_in_stack [GL] (see above)
│       │   │   ├── get_first_unit_in_stack [GL] (see above)
│       │   │   └── relocate_unit [GL] *** STATE MUTATION *** (see above)
│       │   ├── is_tile_ocean [GL] (see above)
│       │   └── get_tile_continent [GL] (see above)
│       └── is_tile_ocean [GL] (see above)
├── refresh_unit_movement [GL] *** STATE MUTATION *** (see above)
├── find_nearest_unit [GL] *** STATE MUTATION *** — Finds the nearest unit to a position, optionally filtered by owner civ
│   └── calc_movement_cost [GL] (see above)
├── get_tile_ptr [GL] (see above)
├── get_tile_terrain_raw [GL] (see above)
├── is_tile_ocean [GL] (see above)
├── get_tile_continent [GL] (see above)
├── get_tile_explored [GL] — Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   └── get_tile_ptr [GL] (see above)
├── (get_tile_fertility_or_city_radius) [GL] — Returns city_radius_owner if nonzero; otherwise returns fertility (clamped: if 0 < fertility < 9, returns 8).
│   ├── get_tile_city_radius_owner [GL] (see above)
│   └── get_tile_fertility [GL] — Returns lower 4 bits of byte 5 (fertility value 0-15).
│       └── get_tile_ptr [GL] (see above)
├── get_city_owner_at [GL] (see above)
├── get_unit_owner_at [GL] (see above)
├── get_tile_controller [GL] (see above)
├── (check_tech_bit) [GL] — Checks if a specific technology has been discovered by a civ
│   └── bit_index_to_byte_mask [GL] (see above)
└── get_tile_improvements [GL] (see above)
```

---

## All Unique State-Mutating Functions Reachable from AI Entry Points

**Total: 212**

| Address | Name | Category | Summary |
|---------|------|----------|---------|
| 0049301B | ai_add_goal_a | AI | Adds a goal to AI goal list A |
| 004933F2 | ai_add_goal_b | AI | Adds a goal to AI goal list B (16 entries) |
| 005369F3 | ai_alert_nearby_units | AI | When a city is threatened (param_1 = city index), alerts all AI naval units within movement range... |
| 005351AA | ai_barbarian_unit_turn | AI | AI turn logic for barbarian units (civ 0) |
| 00531567 | ai_cancel_goto_on_domain | AI | Iterates through units stacked with param_1 and cancels goto orders for units of matching domain ... |
| 00498E8B | ai_choose_city_production | AI | The massive AI city production decision function |
| 0055F5A3 | ai_choose_government | AI | AI government selection logic |
| 00493602 | ai_decay_and_merge_goals | AI | Decays AI goal priorities (negates negative ones = removes expired goals) and merges goal list B ... |
| 0045705E | ai_evaluate_diplomacy | AI | The core AI diplomacy evaluation function |
| 004C54DA | ai_find_nearest_city_or_transport | AI | For AI units, finds the nearest friendly city or transport ship to go to |
| 00536C4C | ai_find_nuke_target | AI | Finds the best target city for a nuclear missile |
| 00537331 | ai_naval_and_ranged_move | AI | Handles AI movement decisions for naval units and ranged/bombardment units |
| 00492B60 | ai_negate_goal_priority | AI | Negates the priority of an AI goal entry |
| 0053184D | ai_process_civ_turn | AI | The main AI turn processing function |
| 00492C15 | ai_remove_goals_near | AI | Removes AI goal_b entries near a specified location |
| 00531607 | ai_set_goto_order | AI | Sets a goto order on a unit |
| 00531653 | ai_set_goto_via_coast | AI | Sets a goto order for a naval unit, finding a coastal tile adjacent to the target that shares a w... |
| 00492D18 | ai_shift_goals_down_a | AI | Recursively shifts AI goal_a entries down by one position starting from param_2 |
| 00492DD0 | ai_shift_goals_down_b | AI | Shifts AI goal_b entries down (iterative) |
| 00538A29 | ai_unit_turn_master | AI | The master AI unit turn function — the single largest function in the entire binary at 44,777 bytes |
| 00498943 | mp_decrypt_passwords | FW | Decrypts the password buffer |
| 004988B8 | mp_encrypt_passwords | FW | Encrypts the password buffer using a simple rotation + XOR cipher |
| 00456F20 | adjust_attitude | GL | Adjusts the attitude value between two civs by a delta |
| 004EA031 | adjust_happy_unhappy | GL | Adjusts happy/content/unhappy citizen counts to ensure they sum correctly |
| 00460129 | ai_diplomacy_negotiate | GL | The main AI diplomacy negotiation function |
| 0055C69D | ai_revolution_notification | GL | Handles AI revolution/government change notifications |
| 0055D1E2 | ai_tech_exchange | GL | Handles AI technology exchange between two civs during diplomacy |
| 004E8F42 | assign_worker_tiles | GL | Assigns city workers to optimal tiles |
| 005B9EC6 | begin_map_batch | GL | Begins a batched map update session for multiplayer |
| 004E7967 | calc_capital_distance_and_corruption | GL | Calculates distance to capital and corruption-related variables for a city |
| 004E9C14 | calc_city_production | GL | Calculates a city's production output including building bonuses, factory effects, and waste |
| 004EB4ED | calc_city_production (entry point) | GL | Entry point for full city production calculation |
| 0043D400 | calc_city_trade_desirability | GL | Massive function that computes trade desirability scores for all 16 commodity types for a given c... |
| 004E989A | calc_corruption | GL | Calculates trade corruption for a city based on distance to capital, government type, and difficulty |
| 004E7EB1 | calc_food_box_size | GL | Calculates the food box size (rows to grow) for a city |
| 004EA8E4 | calc_happiness | GL | Complete happiness calculation for a city |
| 004AD0D1 | calc_path_distance | GL | Calculates path distance between two points using BFS pathfinding |
| 004E80B1 | calc_shields_per_row | GL | Calculates shield production rows and unit support costs for a city |
| 0057E6E2 | calc_stack_best_defender | GL | Finds the best defender in a stack of units at a given tile |
| 004E8E4D | calc_tile_all_resources | GL | Calculates all 3 resource types (food/shields/trade) for a tile and accumulates into city totals. |
| 004E868F | calc_tile_resource | GL | Calculates the food/shield/trade yield for a single city tile |
| 004EB327 | calc_trade_route_income | GL | Calculates trade route income |
| 0057E33A | calc_unit_defense_strength | GL | Calculates unit defense strength considering terrain, fortification, city walls, unit type bonuse... |
| 004ADAFC | calc_unit_goto_direction | GL | Calculates the next move direction for a unit executing a goto order |
| 0055BBC0 | calc_war_readiness | GL | Calculates war readiness score for a civ pair |
| 004273E6 | cancel_goto_for_stack | GL | Cancels goto orders for all units in a stack at a given location |
| 0042738C | cancel_goto_if_blocked | GL | Cancels a unit's goto order if the unit has a goto order (0x0B) and its domain type is not 7 (air) |
| 005B4C63 | check_adjacent_enemy_continent | GL | Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean ty... |
| 005B4B66 | check_adjacent_enemy_simple | GL | Simple check for adjacent enemy units — no ocean/continent checks |
| 004E8C8C | check_auto_irrigation_trigger | GL | Checks if auto-irrigation/mining should be triggered for a tile based on terrain type and governm... |
| 0055D685 | check_join_war | GL | Checks if a 3rd party (param_2) should join a war between param_1 and param_3 |
| 004E8DB5 | check_road_trade_trigger | GL | Checks if a road should be auto-built on a tile for trade bonus |
| 00488A45 | check_trade_route_path | GL | Checks if a trade route path exists between two points |
| 004E7D7F | check_unit_support | GL | Checks if a unit requires shield support based on government type |
| 005B4D8C | check_zoc_if_no_city | GL | Checks ZOC only if there's no city at the location |
| 0043CC00 | city_set_specialist_slot | GL | Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the ... |
| 0043F7A7 | city_update_tile_workers | GL | Updates the map tile worker assignments for a city |
| 004E8ECF | clear_and_check_worked_tiles | GL | Clears all worked tile assignments for a city |
| 005B48B1 | clear_stack_visibility | GL | Clears visibility for all units in a stack. |
| 00467750 | clear_treaty_flags | GL | Clears specified treaty flag bits between two civilizations |
| 005B488A | clear_unit_visibility | GL | Clears a unit's visibility mask (which civs can see it). |
| 005B3D06 | create_unit | GL | Creates a new unit of the specified type for a given civilization at a map position |
| 005B47FA | delete_all_units_in_stack | GL | Deletes every unit in a stack by iterating from first to last. |
| 005B4391 | delete_unit | GL | Deletes a unit |
| 005B5D93 | delete_unit_safely | GL | Safely deletes a unit, handling the case where it's a ship carrying units |
| 005B6042 | delete_unit_visible | GL | Deletes a unit and refreshes the map display at its former position |
| 004B0A41 | diff_engine_copy_sections | GL | Copies all 23 game state sections into the diff engine mirror buffer. |
| 004B0AD0 | diff_engine_invert_mirror | GL | Copies state into mirror then bitwise-inverts all mirror data |
| 004B0B53 | diff_engine_scan_and_send | GL | Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RL... |
| 004B1C11 | diff_engine_serialize_changed_only | GL | Serializes only game state sections whose checksums have changed since last serialization |
| 004B1A15 | diff_engine_serialize_full_compressed | GL | Serializes all 24 game state sections with RLE compression |
| 004B153C | diff_engine_serialize_game | GL | Serializes 7 game state sections into a contiguous buffer with checksums |
| 004B18E1 | diff_engine_serialize_partial | GL | Serializes 2 specific game state sections (section 0 and one other) into a compressed buffer |
| 0045A8E3 | diplo_activate_alliance_wars | GL | When an alliance is activated, makes all allies of the aggressor declare war on the target |
| 0045AC71 | diplo_declare_war | GL | Declares war from param_1 against param_2 |
| 0045A535 | diplo_form_alliance | GL | Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), rese... |
| 0045918E | diplo_reset_state | GL | Resets all diplomacy session state variables to their default values and closes the intelligence ... |
| 0045A7A8 | diplo_sign_ceasefire | GL | Signs a ceasefire — sets treaty flags 0x4002, clears mobilization flag 0x40000, clamps attitude, ... |
| 0045A6AB | diplo_sign_peace_treaty | GL | Signs a peace treaty — sets treaty flags 0x4004 (peace + contact), clamps attitude to 0-50 range,... |
| 00579C40 | diplomacy_check_treaty_violation | GL | Checks if an attack between param_1 and param_2 violates existing treaties |
| 0057A27A | diplomacy_steal_tech | GL | Handles stealing a technology when a civ captures a city or defeats another civ |
| 004EA1F6 | distribute_trade | GL | Distributes a city's trade income into luxury, tax, and science based on the government's tax rat... |
| 005B3B78 | eject_air_units | GL | Ejects all sea-domain units from a stack to offscreen holding coordinates, then relocates them ba... |
| 005B9F1C | end_map_batch | GL | Ends a batched map update |
| 004E7641 | evaluate_city_tiles | GL | Evaluates all 25 tiles around a city (21 workable + center) and sets status flags in DAT_006a6530... |
| 004FA944 | event_action_change_money | GL | Event action: modifies a civilization's treasury |
| 004FB5B2 | event_action_change_terrain | GL | Event action: changes terrain in a rectangular area |
| 004FAED4 | event_action_create_unit | GL | Event action: creates a unit at one of up to 10 specified locations |
| 004FAD02 | event_action_destroy_civ | GL | Event action: destroys a civilization |
| 004FA82D | event_action_flag_no_schism | GL | Event action: sets the no-schism flag to prevent civil war. |
| 004FADFB | event_action_give_tech | GL | Event action: gives a technology to a civilization. |
| 004FABA6 | event_action_make_aggression | GL | Event action: forces aggression between two civs |
| 004FB29F | event_action_move_unit | GL | Event action: moves matching units to a new location |
| 004FC2BB | event_check_city_taken | GL | Checks all events for CITYTAKEN triggers |
| 004FBE84 | event_check_negotiation | GL | Checks all events for NEGOTIATION triggers |
| 004FC20D | event_check_no_schism | GL | Checks all events for NOSCHISM triggers |
| 004FBD9D | event_check_unit_killed | GL | Checks all events for UNITKILLED triggers |
| 004FC3AE | event_dispatch_actions | GL | Dispatches all actions for a triggered event |
| 004CA1CD | execute_airlift | GL | Executes an airlift operation — moves a unit from one city to another |
| 004CA39E | execute_paradrop | GL | Executes a paradrop operation |
| 004AD822 | find_nearest_road_tile | GL | Finds the nearest tile connected to the road network |
| 005B67AF | find_nearest_unit | GL | Finds the nearest unit to a position, optionally filtered by owner civ |
| 004ABFE5 | find_path | GL | BFS pathfinding algorithm |
| 004AD20F | find_road_path | GL | Finds a path using the road/rail network between two points |
| 005B9179 | generate_terrain_around | GL | Generates/randomizes terrain around a nuclear detonation site |
| 005B29D7 | get_unit_hp_remaining | GL | Returns the remaining HP of a unit (max_hp - damage) |
| 0057B5DF | handle_city_capture | GL | The main city capture handler — one of the most complex functions in the binary |
| 0057A904 | handle_civil_war | GL | Handles civil war when a civ's capital is captured |
| 004EC312 | handle_espionage_discovery | GL | Handles discovery of espionage (spy embassy established) |
| 0057F9E3 | handle_nuke_attack | GL | Handles a nuclear attack on a tile |
| 0057EB94 | handle_stack_wipe | GL | Wipes out an entire stack of units |
| 004BF05B | handle_tech_discovery | GL | Master handler for when a civilization discovers a new technology |
| 004BEA84 | handle_tech_government_effects | GL | Handles side effects when a civ discovers a tech that unlocks a new government form |
| 0057E9F9 | handle_unit_kill | GL | Handles a unit being killed in combat |
| 0057EBFD | handle_unit_promotion | GL | Promotes a unit to veteran status |
| 004E7492 | init_city_production_globals | GL | Initializes two global production variables from a city's current production type and accumulated... |
| 004E1763 | kill_or_retire_civ | GL | Removes a civilization from the game (kill or retire) |
| 005B542E | load_unit_onto_ship | GL | Loads ground/air units onto a transport ship |
| 0046B0A1 | net_broadcast | GL | Broadcasts a network message to all connected players |
| 0046B14D | net_send_message | GL | Central network message dispatcher |
| 0046AF70 | net_send_to_player | GL | Sends a network message to a specific player |
| 004DB690 | parley_build_packet | GL | Builds a diplomacy transaction packet |
| 004C9528 | pick_up_unit_004c9528 | GL | Handles bribing/picking up an enemy unit — the player pays gold to convert an enemy unit to their... |
| 005B319E | pick_up_unit_005b319e | GL | Removes a unit from its map tile stack |
| 0055D8D8 | process_diplomatic_contact | GL | Master diplomatic contact processing function |
| 004274A6 | process_unit_move_visibility | GL | Major game logic function that processes visibility updates after a unit moves |
| 005B345F | put_down_unit | GL | Places a unit on the map at a given position |
| 005B9FDE | queue_map_update | GL | Queues a single map update operation into the batch buffer |
| 00442541 | reassign_all_city_production | GL | Reassigns production for all cities belonging to a specific civ (param_1) |
| 004EB4A1 | recalc_city_all | GL | Complete city recalculation — assigns workers, calculates trade routes, syncs tile status, comput... |
| 00467BAF | recall_units_from_territory | GL | When an alliance breaks, recalls all units of civ param_1 that are in territory belonging to civ ... |
| 0059C575 | record_combat_kill | GL | Records a combat kill event in the per-civ combat history ring buffer (300 entries per civ) |
| 005B6787 | refresh_unit_movement | GL | Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has alrea... |
| 005B3AE0 | relocate_all_units | GL | Relocates all units in a stack to a new position. |
| 005B36DF | relocate_unit | GL | Moves a unit from its current position to a new position by picking it up and putting it down |
| 005B3863 | relocate_unit_in_place | GL | Relocates a unit to its own current position (used to refresh stack linkage). |
| 00440325 | remove_trade_route | GL | Removes a trade route at index param_2 from city param_1 by shifting subsequent trade route entri... |
| 004A74BC | reset_spaceship | GL | Resets spaceship data for civ param_1 to all zeros. |
| 00580341 | resolve_combat | GL | The main combat resolution function |
| 005B90DF | reveal_tile | GL | Reveals pollution on a tile by setting the pollution bit (0x80) in tile improvements |
| 0059A733 | rng_next_float | GL | Generates the next random number using a linear congruential generator: seed = seed * 0x19660D + ... |
| 0059A791 | rng_range | GL | Returns a random integer in the range [param_1, param_2] |
| 0057FEBC | scramble_defenders_to_tile | GL | Scrambles nearby defensive units to intercept an attack on a tile |
| 00467933 | set_attitude_value | GL | Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100 |
| 0043D289 | set_building | GL | Sets or clears a building bit in a city's building bitfield. |
| 005B9D81 | set_civ_tile_data | GL | Sets a civ's tile visibility byte |
| 0055C066 | set_government_type | GL | Sets a civ's government type |
| 004C4210 | set_paradrop_range | GL | Sets the paradrop range for a unit type |
| 004AD076 | set_path_cost | GL | Stores a BFS path cost at map position (param_1, param_2). |
| 005B496E | set_stack_seen_by | GL | Sets visibility for all units in a stack to be seen by a specific civ. |
| 005B9C49 | set_tile_city_radius_owner | GL | Sets the city-radius owner for a tile (top 3 bits of byte 2) |
| 005B98B7 | set_tile_fertility | GL | Sets the fertility value (lower 4 bits of byte 5) |
| 005B94FC | set_tile_improvement_bits | GL | Sets or clears improvement bits on a tile |
| 005B99E8 | set_tile_owner | GL | Sets the tile owner (upper nibble of byte 5) |
| 005B976D | set_tile_visibility_bits | GL | Sets or clears visibility bits (byte 4) on a tile |
| 004E790C | set_tile_worked | GL | Sets or clears a tile's worked status in a city's worked-tiles bitmask. |
| 00467825 | set_treaty_flags | GL | Sets specified treaty flag bits between two civilizations |
| 005B2F50 | set_unit_goto_order | GL | Sets a unit's order to "goto" (3) |
| 005B490E | set_unit_seen_by | GL | Marks a unit as seen by a specific civilization (sets the civ's bit in the visibility mask) |
| 004E7549 | set_worker_tile_status | GL | Sets a worker tile status (2-bit field) in a city's tile assignment bitmask |
| 00596EEC | spaceship_recalc_stats | GL | Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support rat... |
| 004C5FAE | spy_diplomat_action | GL | Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on ... |
| 005B5BAB | stack_unit | GL | Stacks a unit (puts it into storage) |
| 004E97AE | sync_worker_tile_status | GL | Synchronizes worker tile status flags with the current tile assignment state |
| 0057A7E9 | transfer_city_ownership | GL | Transfers ownership of a single city (param_1) from civ param_2 to civ param_3 |
| 004C4D1E | unit_order_found_city | GL | Founds a new city at the unit's location |
| 004C50D0 | unit_pillage | GL | Pillages improvements on a tile |
| 00467580 | unknown (set trade route value) | GL | Stores a value into the trade route table at index param_1. |
| 005B8B1A | update_civ_visibility | GL | Updates a civ's visibility data for a tile by copying byte 1 of tile data to the civ's visibility... |
| 004BE6BA | upgrade_units_for_tech | GL | When a tech is discovered that obsoletes units, upgrades all applicable units of that civilizatio... |
| 005B2590 | validate_unit_stack | GL | Validates the integrity of a unit's linked list stack |
| 00467EF2 | break_alliance | MIXED | Breaks an alliance between two civs |
| 00441B11 | change_city_production | MIXED | Changes a city's production item |
| 00458DF9 | diplo_ai_emissary | MIXED | Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the ... |
| 0045B4DA | diplo_ai_negotiate | MIXED | The enormous (10KB) AI negotiation engine |
| 0045B0D6 | diplo_demand_ally_help | MIXED | Handles the human player demanding help from an ally against a common enemy |
| 0045DD7F | diplo_favor_menu | MIXED | Handles the "favor menu" in diplomacy — options include tech exchange, declaring war on a third p... |
| 00458AB1 | diplo_show_greeting | MIXED | Shows the diplomacy greeting screen when two civs meet |
| 00509590 | handle_city_disorder_00509590 | MIXED | Opens the city window for a specific city, handling disorder state |
| 0047E94E | network_poll | MIXED | The main network polling function |
| 0040CD64 | open_tax_rate_dialog | MIXED | Creates and runs the tax rate adjustment dialog |
| 004B7EB6 | parleywin_start_session | MIXED | Starts a diplomacy or chat session |
| 0055C3D3 | revolution_dialog | MIXED | Revolution/government change dialog |
| 0040DDC6 | show_tax_rate_dialog | MIXED | Shows the tax rate dialog for a civ |
| 0040C480 | taxrate_recalc_totals | MIXED | Recalculates tax/luxury/science income totals for the tax rate dialog |
| 0057ED3F | animate_combat_movement | UI | Animates combat movement for up to 8 animation channels |
| 0057F657 | animate_nuke_explosion | UI | Plays the nuclear explosion animation at a given map tile |
| 0056C705 | animate_unit_movement | UI | Animates unit movement between tiles |
| 0047A747 | calc_coast_quadrants | UI | Calculates coast/shore quadrant data for a tile by examining all 8 neighbors |
| 00568CA2 | calc_status_panel_layout | UI | Calculates the status panel layout based on screen dimensions |
| 00569801 | draw_status_panel_units | UI | Draws the complete status panel unit section |
| 004FAAB0 | event_action_show_text | UI | Event action: displays text popup with up to 20 lines |
| 00406B4C | minimap_calc_viewport | UI | Calculates the minimap viewport dimensions and tile sizes based on the minimap surface dimensions... |
| 00421DA0 | mp_set_number_control | UI | Sets a numeric control value in the multiplayer dialog number table. |
| 00421D60 | mp_set_string_control | UI | Sets a string control value in the multiplayer dialog string table |
| 004DBEE6 | parley_build_description | UI | Builds a human-readable description of a diplomacy transaction |
| 004DD016 | parley_describe_attitude | UI | Builds text description of an attitude/relationship change request (war, peace, alliance) |
| 004DCEA5 | parley_describe_cities | UI | Builds text description of cities and their populations in a diplomacy offer. |
| 004DCC0C | parley_describe_gold | UI | Builds text description of a gold amount in a diplomacy offer. |
| 004DD176 | parley_describe_maps | UI | Builds text description of map sharing items in a diplomacy offer |
| 004DCAFA | parley_describe_techs | UI | Builds text description of tech items in a diplomacy offer |
| 004DEF54 | parley_describe_treaty | UI | Builds text describing a treaty type (ceasefire, peace, alliance, withdrawal) for diplomacy descr... |
| 004DCC83 | parley_describe_units | UI | Builds text description of unit items in a diplomacy offer |
| 004B8676 | parley_set_negotiation_state | UI | Sets the negotiation state based on the current offer type (DAT_0067a9b0) |
| 0059A15D | pedia_load_description | UI | Loads a Civilopedia description from the PEDIA section of the game text file |
| 0046E020 | play_sound_effect | UI | Plays a sound effect by ID |
| 0059DB65 | popup_dialog_destroy | UI | Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping ... |
| 0047CD51 | redraw_entire_map | UI | Performs a full map redraw: recalculates viewport geometry, redraws all tiles, refreshes paint bu... |
| 004105F8 | scroll_all_views_if_needed | UI | Iterates all 8 map views and scrolls each active view if the given position is near edges |
| 0056B90B | set_unit_font_for_zoom | UI | Sets the unit display font size based on zoom level |
| 004EB80A | show_city_event_dialog_v2 | UI | Enhanced version of city event dialog with a production item image |
| 0047CBB4 | update_map_area | UI | Redraws a map area and optionally invalidates it |
