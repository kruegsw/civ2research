# Game Loop Call Graph Trees

Generated from `reverse_engineering/call_graphs/graph_data.json`.

Entry points: `game_loop_singleplayer`, `game_loop_mp_client`, `game_loop_mp_server`, `human_turn_main_loop`

## Stats

| Metric | Count |
|--------|-------|
| Total unique reachable functions | 1553 |
| State-mutating functions | 314 |
| Category GL | 360 |
| Category AI | 38 |
| Category MIXED | 35 |
| Category UI | 685 |
| Category FW | 362 |
| Category ?? | 73 |

### Filtering Rules
- FW (framework/utility) functions hidden at depth > 2 to keep trees focused on game logic
- Max tree depth: 6 levels; deeper nodes show "N more functions reachable"
- Recursive calls marked and not re-expanded
- 1-line summaries shown for functions at depth <= 3
- Categories: GL=Game Logic, AI=AI, MIXED=Mixed UI+Logic, UI=User Interface, FW=Framework/Utility

---

## Tree: game_loop_singleplayer (0x0048B340) — SP

Reachable: **1551** functions (**312** state-mutating) | GL=358, AI=38, MIXED=35, UI=685, FW=362, ??=73

```
game_loop_singleplayer [GL] (3048B) *** STATE MUTATION ***
  Summary: Main game loop for singleplayer and hot-seat modes. Iterates through all civs each turn, processes AI and human turns...
├── calc_demographic_extremes [GL] (247B) *** STATE MUTATION ***
│     > Calculates max and min demographic values across all alive civs for 4 categories. Stores extremes in DAT_00673afc (ma...
├── do_full_civ_turn [GL] (679B) *** STATE MUTATION ***
│     > Executes a complete civilization turn: city processing, unit healing, per-civ turn logic, AI decisions, population mi...
│   ├── has_spaceship_built [GL] (47B)
│   │     > Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   ├── heal_units [GL] (1438B) *** STATE MUTATION ***
│   │     > Heals all units belonging to the specified civ. Calculates healing amount based on unit location (city, fortress, fie...
│   │   ├── find_nearest_city [GL] (400B)
│   │   │     > Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status. Retu...
│   │   │   ├── calc_movement_cost [GL]
│   │   │   │   ├── diagonal_movement_cost [GL]
│   │   │   │   └── distance_x_wrapped [GL]
│   │   │   ├── get_tile_continent_if_land [GL]
│   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   └── get_tile_ptr [GL]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   └── is_tile_ocean [GL]
│   │   │   │       └── get_tile_terrain_raw [GL]
│   │   │   ├── has_building [GL]
│   │   │   │   └── bit_index_to_byte_mask [GL]
│   │   │   └── is_tile_valid [GL]
│   │   ├── get_fortress_owner_at [GL] (77B)
│   │   │     > Returns the fortress-owning civ at a tile, or -1. Checks if (byte1 & 0x42) == 0x42 (fortress).
│   │   │   ├── get_tile_improvements [GL]
│   │   │   │   └── get_tile_ptr [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   └── get_tile_owner [GL]
│   │   │       ├── get_tile_ptr [GL]
│   │   │       │     (recursive — already shown above)
│   │   │       └── is_tile_valid [GL]
│   │   │             (recursive — already shown above)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     > Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_improvements [GL] (39B)
│   │   │     > Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_max_hp [GL] (45B)
│   │   │     > Returns the maximum hit points for a unit based on its type.
│   │   ├── has_building [GL] (122B)
│   │   │     > Checks if a city has a specific building. Returns 1 if building bit is set, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     > Returns true if terrain type == 10 (ocean).
│   │   │     (recursive — already shown above)
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     > Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`. This is the Civ2 "ti...
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     > Updates a single tile for all active players.
│   │   │   └── update_map_tile [UI]
│   │   │       └── update_map_area [UI] *** STATE MUTATION ***
│   │   │           ├── invalidate_tile_area [UI]
│   │   │           │     (23 more functions reachable)
│   │   │           ├── is_tile_visible [UI]
│   │   │           │     (2 more functions reachable)
│   │   │           ├── redraw_tile_area [UI]
│   │   │           │     (211 more functions reachable)
│   │   │           ├── reset_sprite_scale [UI]
│   │   │           │     (3 more functions reachable)
│   │   │           ├── set_current_zoom_scale [UI]
│   │   │           │     (4 more functions reachable)
│   │   │           ├── tile_to_screen [UI]
│   │   │           │     (1 more functions reachable)
│   │   │           └── unknown (sprite blit wrapper 1) [UI]
│   │   │                 (12 more functions reachable)
│   │   └── [1 FW helper functions hidden]
│   ├── load_civ_power_values [GL] (90B) *** STATE MUTATION ***
│   │     > Loads 6 power values from a civ's data (at offset 0x594*param_1 into per-civ data) into global array DAT_006a5b10.
│   ├── process_civ_turn [GL] (3830B) *** STATE MUTATION ***
│   │     > Processes a complete civ turn: unit orders, city production, tax/science/happiness calculations, AI attitude adjustme...
│   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │   └── get_wonder_city [GL]
│   │   │       └── is_wonder_obsolete [GL]
│   │   │           └── civ_has_tech [GL]
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │   │     (recursive — already shown above)
│   │   ├── has_spaceship_built [GL] (47B)
│   │   │     > Returns whether civ param_1 has started building a spaceship (bit 0 of status byte).
│   │   │     (recursive — already shown above)
│   │   ├── has_spaceship_launched [GL] (47B)
│   │   │     > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   ├── process_city_turn [GL] (1903B) *** STATE MUTATION ***
│   │   │     > Main city turn processing function. Handles food storage, production, pollution, building upkeep, city expansion, and...
│   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_capital_distance_and_corruption [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── check_trade_route_path [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (261 more functions reachable)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── is_tile_worked [GL]
│   │   │   │   ├── calc_shields_per_row [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_food_box_size [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── check_unit_support [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── evaluate_city_tiles [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (99 more functions reachable)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (97 more functions reachable)
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   └── recalc_city_all [GL] *** STATE MUTATION ***
│   │   │   │       ├── assign_worker_tiles [GL] *** STATE MUTATION ***
│   │   │   │       │     (102 more functions reachable)
│   │   │   │       ├── calc_city_production [GL] *** STATE MUTATION ***
│   │   │   │       │     (3 more functions reachable)
│   │   │   │       ├── calc_happiness [GL] *** STATE MUTATION ***
│   │   │   │       │     (11 more functions reachable)
│   │   │   │       ├── calc_trade_route_income [GL] *** STATE MUTATION ***
│   │   │   │       └── sync_worker_tile_status [GL] *** STATE MUTATION ***
│   │   │   │             (2 more functions reachable)
│   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_wonder_city [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── handle_city_disorder_004ef578 [GL] *** STATE MUTATION ***
│   │   │   │   ├── ai_revolution_notification [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── get_civ_leader_title [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_government_type [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (397 more functions reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (84 more functions reachable)
│   │   │   │   │   ├── revolution_dialog [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (371 more functions reachable)
│   │   │   │   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   └── show_message [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── check_auto_improvement [GL]
│   │   │   │   │   └── has_building [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_civ_leader_title [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_food_box_with_difficulty [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_choose_city_production [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (142 more functions reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── popup_add_button [UI]
│   │   │   │   │   │     (16 more functions reachable)
│   │   │   │   │   ├── popup_dialog_close [UI]
│   │   │   │   │   │     (56 more functions reachable)
│   │   │   │   │   ├── popup_dialog_create [UI]
│   │   │   │   │   │     (25 more functions reachable)
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (294 more functions reachable)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── show_message [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │   └── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │   │         (258 more functions reachable)
│   │   │   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── play_music_track [UI]
│   │   │   │   │   ├── unknown (stop music) [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   └── [4 FW helper functions hidden]
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   │     (52 more functions reachable)
│   │   │   │   │   └── [10 FW helper functions hidden]
│   │   │   │   ├── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_city_event_dialog_v2 [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │   │     (51 more functions reachable)
│   │   │   │   │   ├── palette_init [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── pedia_window_ctor [UI]
│   │   │   │   │   │     (11 more functions reachable)
│   │   │   │   │   ├── popup_add_button [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_add_radio_option [UI]
│   │   │   │   │   │     (15 more functions reachable)
│   │   │   │   │   ├── popup_set_default_selection [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │   │     (33 more functions reachable)
│   │   │   │   │   └── [4 FW helper functions hidden]
│   │   │   │   └── update_map_area_all_players [UI]
│   │   │   │       └── update_map_area [UI] *** STATE MUTATION ***
│   │   │   │             (recursive — already shown above)
│   │   │   ├── handle_city_expansion [GL] *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_city_expansion_site [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── check_tile_trespass [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_path [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (216 more functions reachable)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent_if_land [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── ai_add_goal_a [AI] *** STATE MUTATION ***
│   │   │   │       ├── calc_movement_cost [GL]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── get_tile_continent [GL]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── get_unit_moves_remaining [GL]
│   │   │   │       │     (2 more functions reachable)
│   │   │   │       ├── is_unit_active [GL]
│   │   │   │       └── ai_shift_goals_down_a [AI] *** STATE MUTATION ***
│   │   │   ├── has_building [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │   │   ├── pay_building_upkeep [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_building_upkeep_cost [GL]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── civ_has_tech [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   │   └── bit_index_to_byte_mask [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   └── set_improvement_name_string [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── process_city_food [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_food_box_size [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_auto_improvement [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_unit_safely [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (97 more functions reachable)
│   │   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (91 more functions reachable)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (86 more functions reachable)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── load_unit_onto_ship [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (94 more functions reachable)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (83 more functions reachable)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── remove_trade_route [GL] *** STATE MUTATION ***
│   │   │   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_citizens_row [UI]
│   │   │   │   │   ├── citywin_draw_citizen_icons [UI]
│   │   │   │   │   │     (21 more functions reachable)
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │     (18 more functions reachable)
│   │   │   │   │   ├── close_dialog [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (12 more functions reachable)
│   │   │   │   │   ├── invalidate_rect_region [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (17 more functions reachable)
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   │     (4 more functions reachable)
│   │   │   │   │   └── text_begin [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── draw_food_storage [UI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── blit_sprite_8param [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── calc_icon_spacing [UI]
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_3d_frame [UI]
│   │   │   │   │   │     (15 more functions reachable)
│   │   │   │   │   ├── draw_line [UI]
│   │   │   │   │   │     (13 more functions reachable)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   ├── reset_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_sprite_scale [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── widget_inflate_rect [UI]
│   │   │   │   │   ├── widget_inflate_rect_neg [UI]
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_map_area_all_players [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── process_city_pollution_and_meltdown [GL] *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── generate_terrain_around [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_city_at [GL]
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reveal_tile [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (13 more functions reachable)
│   │   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (11 more functions reachable)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── update_tile_all_players [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── reveal_tile [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── animate_nuke_explosion [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── blit_with_clip [UI]
│   │   │   │   │   │     (11 more functions reachable)
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── init_game_display [UI]
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_alloc_rect [UI]
│   │   │   │   │   │     (21 more functions reachable)
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_at_current_zoom [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (147 more functions reachable)
│   │   │   │   │   ├── set_current_zoom_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_to_screen [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_map_scroll_position [UI]
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── redraw_entire_map [UI] *** STATE MUTATION ***
│   │   │   │   │         (144 more functions reachable)
│   │   │   │   └── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │         (recursive — already shown above)
│   │   │   ├── process_city_production [GL] *** STATE MUTATION ***
│   │   │   │   ├── acquire_wonder [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── assign_caravan_commodity [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── can_build_unit_type [GL]
│   │   │   │   │   └── civ_has_tech [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── check_auto_improvement [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── create_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (594 more functions reachable)
│   │   │   │   │   ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (21 more functions reachable)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (tutorial_show_advice) [UI]
│   │   │   │   │   │     (48 more functions reachable)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   └── calc_movement_cost [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── get_tile_owner [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── handle_espionage_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │   └── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │         (3 more functions reachable)
│   │   │   │   ├── handle_space_race_victory [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_civ_tile_data [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (10 more functions reachable)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── redraw_map_all_players [UI]
│   │   │   │   │   └── unknown (dialog show single param) [UI]
│   │   │   │   │         (4 more functions reachable)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_spaceship_built [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_building [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── spaceship_check_complete_section [GL]
│   │   │   │   ├── spaceship_human_build [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_spaceship_built [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (261 more functions reachable)
│   │   │   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (dialog show single param) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── upgrade_units_for_tech [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_game_popup_3arg [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   └── update_tile_all_players [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── spaceship_ai_evaluate [AI]
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── spaceship_can_build_category [GL]
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── spaceship_get_category_count [GL]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── spaceship_get_clamped_category [GL]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── spaceship_get_raw_count [GL]
│   │   │   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (spaceship section complete check) [GL]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── spaceship_is_enabled [GL]
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── change_city_production [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── complete_research [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (358 more functions reachable)
│   │   │   │   │   ├── handle_tech_government_effects [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── reassign_all_city_production [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (choose research wrapper) [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (358 more functions reachable)
│   │   │   │   │   ├── we_love_the_king_day [GL]
│   │   │   │   │   │     (4 more functions reachable)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── mp_set_string_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── pedia_select_entry [UI]
│   │   │   │   │   │     (134 more functions reachable)
│   │   │   │   │   ├── popup_add_button [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_dialog_create [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_number [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── text_newline [UI]
│   │   │   │   │         (2 more functions reachable)
│   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_improvements_list [UI]
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── close_dialog [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_text_at [UI]
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_rect_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scrollbar_set_position [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── scrollbar_set_range [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_scrollbar [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── set_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── draw_production_box [UI]
│   │   │   │   │   ├── init_unit_move_data [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── blit_sprite_8param [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_icon_spacing [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── close_dialog [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_3d_frame [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_unit [UI]
│   │   │   │   │   │     (60 more functions reachable)
│   │   │   │   │   ├── invalidate_rect_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── widget_inflate_rect [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── widget_inflate_rect_neg [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   └── get_civ_adjective_name [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_city_event_dialog_v2 [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── trade_supply_demand_show [UI]
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wonder_view_init [UI]
│   │   │   │   │   ├── load_civ2_art_004bbb3f [UI]
│   │   │   │   │   │     (110 more functions reachable)
│   │   │   │   │   ├── pedia_navigate_to_item [UI]
│   │   │   │   │   │     (137 more functions reachable)
│   │   │   │   │   ├── resume_music [UI]
│   │   │   │   │   │     (10 more functions reachable)
│   │   │   │   │   ├── unknown (stop music) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wonder_view_construct [UI]
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── wonder_view_play_video [UI]
│   │   │   │   │   │     (169 more functions reachable)
│   │   │   │   │   └── [4 FW helper functions hidden]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── process_city_science [GL] *** STATE MUTATION ***
│   │   │   │   ├── add_research_beakers [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_tech_cost [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── unknown (choose research wrapper) [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── complete_research [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (tutorial_show_city_screen) [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── calc_food_box_size [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── spaceship_ai_should_start [AI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── process_unit_support_deficit [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_unit_support [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── delete_unit_safely [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── find_city_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_message_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_units_supported [UI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_icon_spacing [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── citywin_prepare_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── close_dialog [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_unit [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_rect_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_sprite [UI]
│   │   │   │   │   ├── scale_universal [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── FUN_00008ADC [??]
│   │   │   ├── handle_city_disorder_00509590 [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── init_city_production_globals [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── process_messages [UI]
│   │   │   │   │   └── FUN_0000BA4F [??]
│   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │   ├── call_refresh_callback [UI]
│   │   │   │   │   └── end_paint [UI]
│   │   │   │   ├── show_help_topic [UI]
│   │   │   │   │   └── show_help_topic_ext [UI]
│   │   │   │   │         (2 more functions reachable)
│   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │   └── show_window_inner [UI]
│   │   │   │   │         (3 more functions reachable)
│   │   │   │   ├── unknown — manage window [UI]
│   │   │   │   │   └── FUN_0000C692 [??]
│   │   │   │   ├── FUN_0000CA8D [??]
│   │   │   │   └── FUN_0000CCB3 [??]
│   │   │   ├── show_city_event_dialog [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── FUN_00009429 [??]
│   │   │   └── [1 FW helper functions hidden]
│   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │     > Returns whether the spaceship victory condition is enabled. Disabled if scenario flag 0x80 is set, or if no space tec...
│   │   │     (recursive — already shown above)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   │     (recursive — already shown above)
│   │   ├── FUN_00009429 [??]
│   │   │     (recursive — already shown above)
│   │   ├── FUN_0000DADA [??]
│   │   ├── FUN_0000DB36 [??]
│   │   └── [1 FW helper functions hidden]
│   ├── ai_diplomacy_turn_processing [AI] (3345B) *** STATE MUTATION ***
│   │     > AI turn-start diplomacy processing. For each AI civ: handles revolution timing, randomizes AI behavior, processes AI-...
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   │     (recursive — already shown above)
│   │   ├── ai_military_aid [GL] (2222B) *** STATE MUTATION ***
│   │   │     > AI military aid — transfers military units from one civ to an allied civ's enemy. Finds the best military unit to tra...
│   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION ***
│   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wrap_x [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_city_at [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_city_owner_at [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_continent [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_home_city_name [GL]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── get_unit_max_hp [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── should_declare_war [GL]
│   │   │   │   └── get_attitude_raw [GL]
│   │   │   ├── sum_stack_property [GL]
│   │   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │   │   └── validate_unit_stack [GL] *** STATE MUTATION ***
│   │   │   │   │         (13 more functions reachable)
│   │   │   │   └── get_next_unit_in_stack [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_improvement_name_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_game_popup_2arg [UI]
│   │   │   │   └── show_unit_type_picker [UI]
│   │   │   │       ├── popup_add_button [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── popup_dialog_create [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── select_list_item [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── sprite_init_empty [UI]
│   │   │   │       │     (42 more functions reachable)
│   │   │   │       └── [3 FW helper functions hidden]
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_tile_all_players [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── FUN_0000C679 [??]
│   │   ├── ai_propose_alliance_or_crusade [GL] (2292B) *** STATE MUTATION ***
│   │   │     > AI proposes alliances or crusades against a common enemy. Checks if conditions are right (shared enemy, power dispari...
│   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── civ_has_tech [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_activate_alliance_wars [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── show_message [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── break_alliance [MIXED] *** STATE MUTATION ***
│   │   │   │       ├── civ_has_active_wonder [GL]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │       ├── get_civ_people_name [GL]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── recall_units_from_territory [GL] *** STATE MUTATION ***
│   │   │   │       │     (7 more functions reachable)
│   │   │   │       ├── get_civ_name [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── redraw_map_all_players [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── show_dialog_message [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── show_message [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── text_add_string [UI]
│   │   │   │       │     (1 more functions reachable)
│   │   │   │       └── text_begin [UI]
│   │   │   │             (recursive — already shown above)
│   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │   └── intel_close_advisor [UI]
│   │   │   │       ├── intel_delete_object [UI]
│   │   │   │       │     (43 more functions reachable)
│   │   │   │       ├── intel_teardown_display [UI]
│   │   │   │       │     (17 more functions reachable)
│   │   │   │       ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── resume_music [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── wait_for_animation [UI]
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_calc_tech_value [AI]
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_wonder_city [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tech_is_descendant_of [GL]
│   │   │   │   │   └── tech_is_descendant_of [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── get_civ_leader_title [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_attitude [GL]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_choose_government [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── diplo_show_greeting [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── get_civ_leader_title [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   ├── get_screen_rect [UI]
│   │   │   │   │   ├── intel_open_advisor [UI]
│   │   │   │   │   │     (54 more functions reachable)
│   │   │   │   │   ├── open_list_dialog [UI]
│   │   │   │   │   │     (104 more functions reachable)
│   │   │   │   │   ├── popup_dialog_create [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_set_position_fields [UI]
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_number [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (set popup position) [UI]
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   └── intel_play_video_frame [UI]
│   │   │   │   │         (32 more functions reachable)
│   │   │   │   ├── open_intelligence_dialog [UI]
│   │   │   │   │   ├── create_text_button [UI]
│   │   │   │   │   │     (6 more functions reachable)
│   │   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   │   ├── set_button_handler [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_button_owner [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [3 FW helper functions hidden]
│   │   │   │   ├── popup_add_radio_option [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_dialog_create [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── select_list_item [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── refresh_status_panel [UI]
│   │   │   │   ├── calc_status_panel_layout [UI] *** STATE MUTATION ***
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── draw_status_panel_units [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── check_tile_goody_hut [GL]
│   │   │   │   │   ├── check_tile_resource [GL]
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_vis_ptr [GL]
│   │   │   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_home_city_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_coordinate_text [UI]
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── draw_status_panel_header [UI]
│   │   │   │   │   │     (42 more functions reachable)
│   │   │   │   │   ├── draw_status_turn_info [UI]
│   │   │   │   │   │     (19 more functions reachable)
│   │   │   │   │   ├── draw_text_centered [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_unit [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── format_unit_orders_text [UI]
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_font_height [UI]
│   │   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── port_set_rect [UI]
│   │   │   │   │   ├── port_set_rect_from_self [UI]
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_sprite [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── select_display_unit [UI]
│   │   │   │   │   ├── set_status_bar_text [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── set_text_draw_source [UI]
│   │   │   │   │   ├── set_text_style [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_label_id [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── text_begin [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── prepare_surface [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── tile_bitmap [UI]
│   │   │   │       └── blit_rect_to_rect [UI]
│   │   │   │             (10 more functions reachable)
│   │   │   ├── set_improvement_name_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_dialog_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── ai_revolution_notification [GL] (1336B) *** STATE MUTATION ***
│   │   │     > Handles AI revolution/government change notifications. If human civ, opens revolution dialog. If AI civ, shows "overt...
│   │   │     (recursive — already shown above)
│   │   ├── ai_tech_exchange [GL] (1182B) *** STATE MUTATION ***
│   │   │     > Handles AI technology exchange between two civs during diplomacy. Finds the best tech each side can offer, and if bot...
│   │   │   ├── civ_has_tech [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   └── ai_calc_tech_value [AI]
│   │   │         (recursive — already shown above)
│   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── clear_treaty_flags [GL] (213B) *** STATE MUTATION ***
│   │   │     > Clears specified treaty flag bits between two civilizations. Handles cascading flag dependencies: clearing peace (4) ...
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │   │     (recursive — already shown above)
│   │   ├── process_diplomatic_contact [GL] (7326B) *** STATE MUTATION ***
│   │   │     > Master diplomatic contact processing function. Handles all phases of civ-to-civ contact: initial meeting, treaty nego...
│   │   │   ├── ai_diplomacy_negotiate [GL] *** STATE MUTATION ***
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_attitude [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_gold_to_attitude [GL]
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── calc_patience_threshold [GL]
│   │   │   │   │   └── civ_has_active_wonder [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── calc_war_readiness [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── check_can_declare_war [GL]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_form_alliance [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── show_message [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_sign_ceasefire [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_attitude_raw [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_attitude_value [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── event_check_negotiation [GL] *** STATE MUTATION ***
│   │   │   │   │   └── event_dispatch_actions [GL] *** STATE MUTATION ***
│   │   │   │   │         (132 more functions reachable)
│   │   │   │   ├── get_attitude_raw [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_spaceship_launched [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_attitude_value [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (set trade route value) [GL] *** STATE MUTATION ***
│   │   │   │   ├── ai_calc_tech_value [AI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_ai_negotiate [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_attitude [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_gold_to_attitude [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_form_alliance [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_sign_peace_treaty [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── handle_tech_discovery [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_calc_tech_value [AI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── break_alliance [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_number [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── diplo_favor_menu [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_patience_threshold [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_vis_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_civ_tile_data [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── redraw_map_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── diplo_check_war_weariness [UI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (dialog show single param) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_show_main_menu [UI]
│   │   │   │   │   ├── dialog_set_title [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_add_radio_option [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_dialog_create [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── select_list_item [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [3 FW helper functions hidden]
│   │   │   │   ├── intel_play_animation [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── open_intelligence_dialog [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_game_popup_3arg [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_help_topic [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_add_number [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── ai_tech_exchange [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_join_war [GL] *** STATE MUTATION ***
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── show_message [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── clear_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── event_check_negotiation [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── has_spaceship_launched [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── should_declare_war [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_should_declare_war [AI]
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── should_declare_war [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_declare_war [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── break_alliance [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── parleywin_start_session [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── chatwin_get_text_length [UI]
│   │   │   │   │   └── FUN_00002F47 [??]
│   │   │   │   ├── get_active_control [UI]
│   │   │   │   ├── parley_set_negotiation_state [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── parley_add_dialog_panel [UI]
│   │   │   │   │   │     (180 more functions reachable)
│   │   │   │   │   ├── pedia_clear_selection [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── pedia_set_selection [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   └── set_active_control [UI]
│   │   │   │   ├── parleywin_build_title [UI]
│   │   │   │   │   ├── calc_attitude [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── display_improvement [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin_italic [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_end_italic [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_newline [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_active_control [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── widget_get_text_length [UI]
│   │   │   │   │   └── unknown (get_text_end_pos) [UI]
│   │   │   │   │         (3 more functions reachable)
│   │   │   │   └── widget_set_cursor_pos [UI]
│   │   │   │       └── FUN_00002F0D [??]
│   │   │   ├── mp_show_wait_dialog [UI]
│   │   │   │   └── FUN_0051D564 [??]
│   │   │   ├── show_dialog_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [1 FW helper functions hidden]
│   │   ├── ai_evaluate_diplomacy [AI] (4728B) *** STATE MUTATION ***
│   │   │     > Core AI diplomacy evaluation function. Calculates an "attitude score" for AI civ param_1 toward human civ param_2 bas...
│   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_revolution_notification [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── calc_war_readiness [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── city_set_specialist_slot [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_reset_state [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_nearest_city [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_people_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── pick_up_unit_005b319e [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── put_down_unit [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_dialog_message [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── should_declare_war [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── spaceship_is_enabled [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_evaluate_diplomacy [AI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_should_declare_war [AI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_ai_emissary [MIXED] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_demand_ally_help [MIXED] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_show_attitude_header [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_name [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── redraw_map_all_players [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_dialog_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── update_tile_all_players [UI]
│   │   │         (recursive — already shown above)
│   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │   │     (recursive — already shown above)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   │     (recursive — already shown above)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── ai_process_civ_turn [AI] (14665B) *** STATE MUTATION ***
│   │     > The main AI turn processing function. Evaluates all units and cities for a civ, calculates per-continent military bal...
│   │   ├── calc_movement_cost [GL] (94B)
│   │   │     > Computes movement cost between two map coordinates, combining wrapped X distance with Y distance, then applying diago...
│   │   │     (recursive — already shown above)
│   │   ├── calc_shields_per_row [GL] (1497B) *** STATE MUTATION ***
│   │   │     > Calculates shield production rows and unit support costs for a city. Iterates all units, determines which need suppor...
│   │   │     (recursive — already shown above)
│   │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │   │     > Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   │     (recursive — already shown above)
│   │   ├── check_adjacent_enemy_simple [GL] (253B) *** STATE MUTATION ***
│   │   │     > Simple check for adjacent enemy units — no ocean/continent checks. Returns true if any adjacent tile has units from a...
│   │   │   ├── get_unit_owner_at [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   └── wrap_x [GL]
│   │   │         (recursive — already shown above)
│   │   ├── check_tile_goody_hut [GL] (229B)
│   │   │     > Checks if a tile has a goody hut (village). Similar hash-based formula to resource placement, but different constants...
│   │   │     (recursive — already shown above)
│   │   ├── civ_has_active_wonder [GL] (142B)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │   │     (recursive — already shown above)
│   │   ├── count_units_by_role [GL] (120B)
│   │   │     > Counts units in a stack that have a specific role.
│   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   └── get_next_unit_in_stack [GL]
│   │   │         (recursive — already shown above)
│   │   ├── delete_unit_visible [GL] (456B) *** STATE MUTATION ***
│   │   │     > Deletes a unit and refreshes the map display at its former position. Sends MP tile-refresh notification.
│   │   │     (recursive — already shown above)
│   │   ├── find_nearest_city [GL] (400B)
│   │   │     > Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status. Retu...
│   │   │     (recursive — already shown above)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     > Finds the first unit of any civ at map position (param_1, param_2). If DAT_00636058 is set, requires a unit to be vis...
│   │   │     (recursive — already shown above)
│   │   ├── get_city_owner_at [GL] (111B)
│   │   │     > Returns the city-owning civ at a tile, or -1. Checks tile improvement bits: if (byte1 & 0x42) == 0x02, it's a city ti...
│   │   │     (recursive — already shown above)
│   │   ├── get_next_unit_in_stack [GL] (65B)
│   │   │     > Returns the next unit in the stack linked list, or -1 if at end. Validates stack first.
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     > Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_continent_if_land [GL] (72B)
│   │   │     > Returns continent ID only if tile is not ocean, otherwise -1.
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_improvements [GL] (39B)
│   │   │     > Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_terrain_raw [GL] (41B)
│   │   │     > Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_hp_remaining [GL] (98B) *** STATE MUTATION ***
│   │   │     > Returns the remaining HP of a unit (max_hp - damage). If hitpoint combat is disabled (flag 0x10 not set), resets dama...
│   │   │   └── get_unit_max_hp [GL]
│   │   │         (recursive — already shown above)
│   │   ├── get_unit_max_hp [GL] (45B)
│   │   │     > Returns the maximum hit points for a unit based on its type.
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     > Returns remaining movement points (total - spent). Minimum 0.
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     > Returns the civ with units at a tile, or -1. Checks if byte1 bit 0 is set (unit present).
│   │   │     (recursive — already shown above)
│   │   ├── has_building [GL] (122B)
│   │   │     > Checks if a city has a specific building. Returns 1 if building bit is set, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     > Returns true if terrain type == 10 (ocean).
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── reassign_all_city_production [GL] (254B) *** STATE MUTATION ***
│   │   │     > Reassigns production for all cities belonging to a specific civ (param_1). Optionally filters by continent (param_2)....
│   │   │     (recursive — already shown above)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │   └── calc_unit_movement_points [GL]
│   │   │         (recursive — already shown above)
│   │   ├── relocate_unit [GL] (388B) *** STATE MUTATION ***
│   │   │     > Moves a unit from its current position to a new position by picking it up and putting it down. Handles MP synchroniza...
│   │   │     (recursive — already shown above)
│   │   ├── relocate_unit_in_place [GL] (60B) *** STATE MUTATION ***
│   │   │     > Relocates a unit to its own current position (used to refresh stack linkage).
│   │   │   └── relocate_unit [GL] *** STATE MUTATION ***
│   │   │         (recursive — already shown above)
│   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │     > Sets a unit's order to "goto" (3). If the unit wasn't already on goto, resets the goto target.
│   │   ├── should_declare_war [GL] (191B)
│   │   │     > Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │   │     (recursive — already shown above)
│   │   ├── sum_stack_property [GL] (724B)
│   │   │     > Sums a property across all units in a stack. param_2 selects which property: 0=shield cost, 1=defense, 2/11=count, 3=...
│   │   │     (recursive — already shown above)
│   │   ├── tile_distance_xy [GL] (157B)
│   │   │     > Computes the tile distance between two (x,y) tile coordinates: `(abs_dx_wrapped + abs_dy) >> 1`. This is the Civ2 "ti...
│   │   │     (recursive — already shown above)
│   │   ├── ai_add_goal_a [AI] (958B) *** STATE MUTATION ***
│   │   │     > Adds a goal to AI goal list A. If duplicate exists with higher priority, skips. If list full, inserts by shifting low...
│   │   │     (recursive — already shown above)
│   │   ├── ai_add_goal_b [AI] (518B) *** STATE MUTATION ***
│   │   │     > Adds a goal to AI goal list B (16 entries). Same insertion logic as ai_add_goal_a but for the smaller B list.
│   │   │   └── ai_shift_goals_down_b [AI] *** STATE MUTATION ***
│   │   ├── ai_choose_government [AI] (558B) *** STATE MUTATION ***
│   │   │     > AI government selection logic. Evaluates available governments using preference scores (DAT_0064ca74 array) and selec...
│   │   │     (recursive — already shown above)
│   │   ├── ai_decay_and_merge_goals [AI] (365B) *** STATE MUTATION ***
│   │   │     > Decays AI goal priorities (negates negative ones = removes expired goals) and merges goal list B into goal list A.
│   │   │   ├── ai_add_goal_a [AI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   └── ai_negate_goal_priority [AI] *** STATE MUTATION ***
│   │   ├── ai_remove_goals_near [AI] (259B) *** STATE MUTATION ***
│   │   │     > Removes AI goal_b entries near a specified location. Scans 16 goal_b slots, if the goal type matches param_2 and dist...
│   │   │   └── calc_movement_cost [GL]
│   │   │         (recursive — already shown above)
│   │   ├── ai_set_goto_order [AI] (76B) *** STATE MUTATION ***
│   │   │     > Sets a goto order on a unit. Assigns order code 0x0b (goto), sets the reason code, and target coordinates.
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── check_population_milestone [MIXED] (705B) *** STATE MUTATION ***
│   │     > Checks if a civilization has reached a population milestone (every 10k up to 100k, every 100k after). Shows "FERTILE"...
│   │   ├── civ_calc_total_population [GL] (193B)
│   │   │     > Sums population points across all cities of a given civ. Clamps result to [1, 32000].
│   │   │   └── city_calc_population_points [GL]
│   │   ├── show_tax_rate_dialog [MIXED] (226B) *** STATE MUTATION ***
│   │   │     > Shows the tax rate dialog for a civ. First checks if the civ is active (bit set in DAT_00655b0b). In single-player or...
│   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── open_tax_rate_dialog [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── balance_tax_rates [GL]
│   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_max_tax_rate [GL]
│   │   │   │   ├── save_civ2_dat [GL]
│   │   │   │   ├── taxrate_recalc_totals [MIXED] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_building_upkeep_cost [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── distribute_trade [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   └── has_building [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── citywin_refresh_top_panels [UI]
│   │   │   │   │   ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_citizens_row [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_resource_rows [UI]
│   │   │   │   │   │     (65 more functions reachable)
│   │   │   │   │   └── FUN_00008ADC [??]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── create_checkbox [UI]
│   │   │   │   │   ├── control_detach_window [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── control_init_fields [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── FUN_0000BF40 [??]
│   │   │   │   │   └── FUN_0000C0F0 [??]
│   │   │   │   ├── create_scrollbar [UI]
│   │   │   │   │   ├── control_detach_window [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── control_init_fields [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scrollbar_set_range [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   └── FUN_0000CF17 [??]
│   │   │   │   ├── create_text_button [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── dialog_create [UI]
│   │   │   │   │   ├── create_offscreen_surface_b [UI]
│   │   │   │   │   │     (17 more functions reachable)
│   │   │   │   │   ├── dialog_create_buttons [UI]
│   │   │   │   │   │     (19 more functions reachable)
│   │   │   │   │   ├── unknown (set dialog video source) [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── unknown (set_font_size) [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── unknown (set_msg_handler_a) [UI]
│   │   │   │   │   ├── unknown (set_msg_handler_b) [UI]
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── dialog_repaint_check [UI]
│   │   │   │   │   └── set_active_surface [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_font_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── palette_init [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── process_messages [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scrollbar_set_callback [UI]
│   │   │   │   ├── scrollbar_set_position [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scrollbar_set_range [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_active_surface [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_button_handler [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_button_owner [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_checkbox_callback [UI]
│   │   │   │   ├── set_checkbox_value [UI]
│   │   │   │   ├── set_dialog_enabled [UI]
│   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [5 FW helper functions hidden]
│   │   │   ├── FUN_00009429 [??]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── get_civ_name [UI] (28B)
│   │   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (recursive — already shown above)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── auto_save_game [UI] (270B)
│   │     > Performs auto-save. Generates save filename from civ name, deletes old backup, renames current auto-save to backup, s...
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │   │     (recursive — already shown above)
│   │   ├── write_save_file [GL] (4499B) *** STATE MUTATION ***
│   │   │     > Writes the complete save file. Handles both normal saves and scenario exports. Writes magic header "CIVILIZE", versio...
│   │   │   ├── civ_has_tech [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pack_viewport_state [GL] *** STATE MUTATION ***
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── save_map_data [GL]
│   │   │   └── [8 FW helper functions hidden]
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     > Appends a localized label (by ID) to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_string [UI] (33B)
│   │   │     > Appends a string to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   └── [4 FW helper functions hidden]
│   ├── credits_close [UI] (84B)
│   │     > Closes the credits display window. Stops animations and destroys the window.
│   │   ├── dialog_cleanup [UI] (38B)
│   │   │     > Cleans up a dialog — destroys buttons then destroys the window.
│   │   │   ├── dialog_destroy_buttons [UI]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   └── save_and_flush [UI]
│   │   │       ├── flush_at_origin [UI]
│   │   │       │   └── port_alloc_rect [UI]
│   │   │       │         (recursive — already shown above)
│   │   │       └── swap_dc [UI]
│   │   │           └── FUN_0000C0AB [??]
│   │   ├── flush_at_origin [UI] (34B)
│   │   │     > Flushes the display at coordinates (0, 0).
│   │   │     (recursive — already shown above)
│   │   └── surface_list_clear [UI] (75B)
│   │         > Iterates the surface list and removes each node.
│   ├── show_between_turns_advance [UI] (225B)
│   │     > Shows the between-turns advance animation. Only proceeds if param_1 matches DAT_006d1da0 (current player) and no wind...
│   │   ├── show_advance_between_turns [UI] (877B) *** STATE MUTATION ***
│   │   │     > Shows the advance animation between turns. Similar to show_advance_animation but specifically for the between-turns d...
│   │   │   ├── load_civ_power_values [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── animate_screen_reveal [UI]
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── rect_get_width [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── build_advance_scene [UI]
│   │   │   │   ├── spaceship_get_clamped_count [GL]
│   │   │   │   │   ├── spaceship_get_max_component [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_set_color [UI]
│   │   │   │   │   └── port_fill_rect [UI]
│   │   │   │   │         (6 more functions reachable)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wonder_win_draw_title [UI]
│   │   │   │   │   ├── get_civ_noun_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_people_name [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── text_add_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_newline [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (set/get draw color) [UI]
│   │   │   │   └── [3 FW helper functions hidden]
│   │   │   ├── init_palette_system [UI]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── manage_window_show [UI]
│   │   │   │   └── FUN_0000C40A [??]
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── play_wonder_video [UI]
│   │   │   │   ├── end_paint [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_set_color [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── resume_music [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_callback_paint [UI]
│   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── start_cursor_blink [UI]
│   │   │   │   │   ├── capture_mouse [UI]
│   │   │   │   │   └── get_view_window_handle [UI]
│   │   │   │   ├── stop_cursor_blink [UI]
│   │   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── release_mouse_capture [UI]
│   │   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │   │   └── FUN_0000C763 [??]
│   │   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │   │   └── FUN_0000C44D [??]
│   │   │   │   ├── unknown (stop music) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [10 FW helper functions hidden]
│   │   │   ├── show_advance_animation [UI] *** STATE MUTATION ***
│   │   │   │   ├── load_civ_power_values [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── spaceship_launch (internal — called after all checks pass) [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── build_advance_scene [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── manage_window_show [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── play_wonder_video [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── start_cursor_blink [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── stop_cursor_blink [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │   │   └── unknown (update pedia display surface) [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wonder_win_draw_button_left [UI]
│   │   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── wonder_win_draw_button_right [UI]
│   │   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── wonder_win_draw_initial_buttons [UI]
│   │   │   │   │   ├── port_fill_rect [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wonder_win_draw_button_left [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wonder_win_draw_button_right [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── wonder_win_draw_title [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wonder_win_setup_hotspots [UI]
│   │   │   │   │   └── create_button_hotspot [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── wonder_win_show_starfield [UI]
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── advance_year_display [UI]
│   │   │   │   │   │     (6 more functions reachable)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_draw_text_at [UI]
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── port_fill_rect [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wonder_win_draw_next_char [UI]
│   │   │   │   │   │     (24 more functions reachable)
│   │   │   │   │   └── [6 FW helper functions hidden]
│   │   │   │   └── [4 FW helper functions hidden]
│   │   │   ├── start_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wonder_win_draw_button_left [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wonder_win_draw_button_right [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wonder_win_draw_initial_buttons [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wonder_win_setup_hotspots [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── wonder_win_create [UI] (524B)
│   │   │     > Creates the wonder window — loads the DLL resource, builds the info text, determines display mode (0=normal, 1=has vi...
│   │   │   ├── has_spaceship_launched [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── build_wonder_info_text [UI]
│   │   │   │   ├── spaceship_get_max_component [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [10 FW helper functions hidden]
│   │   │   ├── pedia_set_resource [UI]
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── set_window_style_flags [UI]
│   │   │   │   └── load_and_store_cursor [UI]
│   │   │   ├── wonder_win_create_dialog [UI]
│   │   │   │   ├── create_offscreen_surface_b [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── surface_init_8 [UI]
│   │   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_child_wndproc [UI]
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_palette [UI]
│   │   │   │   │   └── FUN_0000C280 [??]
│   │   │   │   └── [3 FW helper functions hidden]
│   │   │   ├── wonder_win_draw_buttons [UI]
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_measure_text [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_004D56FD [??]
│   │   │   │   └── [3 FW helper functions hidden]
│   │   │   ├── wonder_win_setup_hotspots [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [4 FW helper functions hidden]
│   │   ├── wonder_win_init [UI] (677B) *** STATE MUTATION ***
│   │   │     > Constructor/initializer for the wonder window object. Initializes multiple sub-objects (bitmaps, strings, controls), ...
│   │   │   ├── init_render_surface [UI]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── init_sprite_surface_mgr [UI]
│   │   │   │   ├── init_sprite_cache [UI]
│   │   │   │   │   └── init_render_surface [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── palette_init [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_alloc_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_color [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   └── [4 FW helper functions hidden]
│   │   └── [3 FW helper functions hidden]
│   └── spaceship_dialog [UI] (1567B) *** STATE MUTATION ***
│         > Displays the spaceship status dialog for a civ. Shows all component counts, ratios (fuel, energy, life support), mass...
│       ├── get_civ_noun_name [GL] (145B)
│       │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│       │     (recursive — already shown above)
│       ├── get_civ_people_name [GL] (145B)
│       │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│       │     (recursive — already shown above)
│       ├── has_spaceship_launched [GL] (47B)
│       │     > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│       │     (recursive — already shown above)
│       ├── spaceship_get_max_component [GL] (264B)
│       │     > Gets the maximum allowed count for a spaceship component type (param_2: 0=structural, 1-2=component, 3-5=module). The...
│       │     (recursive — already shown above)
│       ├── spaceship_launch (internal — called after all checks pass) [GL] (815B) *** STATE MUTATION ***
│       │     > Launches a civ's spaceship. Sets the launch flag, records the launch turn, displays "LAUNCHED" message, shows spacesh...
│       │     (recursive — already shown above)
│       ├── spaceship_recalc_stats [GL] (1297B) *** STATE MUTATION ***
│       │     > Recalculates all spaceship statistics for a civ: mass, fuel ratio, energy ratio, life support ratio, flight time, suc...
│       │     (recursive — already shown above)
│       ├── dialog_set_title [UI] (41B)
│       │     > Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│       │     (recursive — already shown above)
│       ├── display_improvement [UI] (33B)
│       │     > Adds an improvement/government icon to the text buffer.
│       │     (recursive — already shown above)
│       ├── get_civ_name [UI] (28B)
│       │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│       │     (recursive — already shown above)
│       ├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│       │     > Sets a numeric control value in the multiplayer dialog number table.
│       │     (recursive — already shown above)
│       ├── popup_add_action_button_label [UI] (119B)
│       │     > Adds an action button label string to the popup dialog. Supports up to 6 labels (this+0x294 array, index tracked at t...
│       │   └── [2 FW helper functions hidden]
│       ├── popup_add_radio_option [UI] (566B)
│       │     > Adds a radio button option to the popup dialog. Allocates a 0x18-byte doubly-linked node. If flag 0x80 is set, insert...
│       │     (recursive — already shown above)
│       ├── popup_dialog_close [UI] (47B)
│       │     > Closes a popup dialog by destroying it and clearing its list control.
│       │     (recursive — already shown above)
│       ├── popup_dialog_create [UI] (93B)
│       │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│       │     (recursive — already shown above)
│       ├── select_list_item [UI] (38B)
│       │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│       │     (recursive — already shown above)
│       ├── show_message [UI] (46B)
│       │     > Stores a message string in the message buffer at the specified slot index.
│       │     (recursive — already shown above)
│       ├── text_add_label_id [UI] (33B)
│       │     > Appends a localized label (by ID) to the global text buffer.
│       │     (recursive — already shown above)
│       ├── text_add_number [UI] (33B)
│       │     > Adds a number to the global text buffer.
│       │     (recursive — already shown above)
│       ├── text_add_string [UI] (33B)
│       │     > Appends a string to the global text buffer.
│       │     (recursive — already shown above)
│       ├── text_begin [UI] (29B)
│       │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│       │     (recursive — already shown above)
│       ├── text_begin_bold [UI] (29B)
│       │     > Begins bold text mode in the global text buffer.
│       │   └── [1 FW helper functions hidden]
│       ├── text_begin_italic [UI] (29B)
│       │     > Begins italic text mode in the global text buffer.
│       │     (recursive — already shown above)
│       ├── text_end_bold [UI] (29B)
│       │     > Ends bold text mode in the global text buffer.
│       │   └── [1 FW helper functions hidden]
│       ├── text_end_italic [UI] (29B)
│       │     > Ends italic text mode in the global text buffer.
│       │     (recursive — already shown above)
│       ├── text_newline [UI] (29B)
│       │     > Adds a newline to the global text buffer.
│       │     (recursive — already shown above)
│       ├── unknown (dialog show single param) [UI] (33B)
│       │     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       │     (recursive — already shown above)
│       └── [1 FW helper functions hidden]
├── event_check_interval_trigger [GL] (147B) *** STATE MUTATION ***
│     > Checks all events for TURNINTERVAL triggers. Fires events where type == 8 and (interval == 0 or turn % interval == 0).
│   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│         > Dispatches all actions for a triggered event. Checks action flags in the event node and calls appropriate action hand...
│         (recursive — already shown above)
├── event_check_random_trigger [GL] (174B) *** STATE MUTATION ***
│     > Checks all events for RANDOMTURN triggers. Fires events where type == 0x40 and random roll matches denominator.
│   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│         > Dispatches all actions for a triggered event. Checks action flags in the event node and calls appropriate action hand...
│         (recursive — already shown above)
├── event_check_tech_trigger [GL] (334B) *** STATE MUTATION ***
│     > Checks all events for RECEIVEDTECHNOLOGY triggers. Fires when a civ acquires the specified technology.
│   ├── civ_has_tech [GL] (181B)
│   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │     (recursive — already shown above)
│   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│         > Dispatches all actions for a triggered event. Checks action flags in the event node and calls appropriate action hand...
│         (recursive — already shown above)
├── event_check_turn_trigger [GL] (144B) *** STATE MUTATION ***
│     > Checks all events for TURN triggers. Fires events where type == 4 and (turn == -1 for EVERY turn, or turn == param_1).
│   └── event_dispatch_actions [GL] (360B) *** STATE MUTATION ***
│         > Dispatches all actions for a triggered event. Checks action flags in the event node and calls appropriate action hand...
│         (recursive — already shown above)
├── get_civ_noun_name [GL] (145B)
│     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│     (recursive — already shown above)
├── get_civ_people_name [GL] (145B)
│     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│     (recursive — already shown above)
├── human_turn_main_loop [GL] (1303B) *** STATE MUTATION ***
│     > Main loop for the human player's turn. Manages unit selection, order processing, waiting for input, and end-of-turn c...
│   ├── ai_diplomacy_negotiate [GL] (16263B) *** STATE MUTATION ***
│   │     > The main AI diplomacy negotiation function. Handles all phases of AI-to-AI and AI-to-human diplomatic encounters: gre...
│   │     (recursive — already shown above)
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │     (recursive — already shown above)
│   ├── is_unit_ready_to_move [GL] (271B)
│   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │   ├── get_unit_moves_remaining [GL] (69B)
│   │   │     > Returns remaining movement points (total - spent). Minimum 0.
│   │   │     (recursive — already shown above)
│   │   └── is_tile_valid [GL] (80B)
│   │         > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │         (recursive — already shown above)
│   ├── process_human_unit_orders [GL] (880B) *** STATE MUTATION ***
│   │     > Processes orders for the currently selected human unit. Handles tutorial prompts for damaged units, executes automate...
│   │   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │   │     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (recursive — already shown above)
│   │   ├── execute_unit_order [GL] (158B) *** STATE MUTATION ***
│   │   │     > Dispatches unit order execution based on the order type byte (DAT_006560ff). Returns 1 if order was processed, 0 if u...
│   │   │   ├── execute_worker_order [GL] *** STATE MUTATION ***
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_tile_terrain [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── queue_map_update [GL] *** STATE MUTATION ***
│   │   │   │   │         (8 more functions reachable)
│   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_map_area_all_players [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── FUN_0000C6EF [??]
│   │   │   ├── unit_order_fortify [GL] *** STATE MUTATION ***
│   │   │   │   ├── find_city_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_0000C494 [??]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── FUN_0000C679 [??]
│   │   │   │         (recursive — already shown above)
│   │   │   └── unit_order_goto [GL] *** STATE MUTATION ***
│   │   │       ├── calc_unit_goto_direction [GL] *** STATE MUTATION ***
│   │   │       │   ├── calc_unit_movement_points [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***
│   │   │       │   ├── direction_from_delta [GL]
│   │   │       │   ├── distance_x_wrapped [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── find_path [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── find_road_path [GL] *** STATE MUTATION ***
│   │   │       │   │     (8 more functions reachable)
│   │   │       │   ├── get_city_owner_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_fortress_owner_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_improvements [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_ptr [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_terrain_raw [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_unit_owner_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── is_tile_valid [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── tile_distance_xy [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   └── wrap_x [GL]
│   │   │       │         (recursive — already shown above)
│   │   │       ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***
│   │   │       │     (recursive — already shown above)
│   │   │       ├── move_unit [GL] *** STATE MUTATION ***
│   │   │       │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── calc_unit_movement_points [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── check_tile_goody_hut [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── check_zoc_violation [GL] *** STATE MUTATION ***
│   │   │       │   ├── claim_adjacent_ocean_tiles [GL] *** STATE MUTATION ***
│   │   │       │   │     (3 more functions reachable)
│   │   │       │   ├── clear_stack_visibility [GL] *** STATE MUTATION ***
│   │   │       │   │     (1 more functions reachable)
│   │   │       │   ├── count_units_by_role [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── delete_unit_safely [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── diplomacy_check_attack_allowed [GL]
│   │   │       │   ├── end_map_batch [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── find_city_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── find_unit_stack_at_xy [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_city_owner_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_civ_people_name [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_first_unit_in_stack [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_fortress_owner_at [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_next_unit_in_stack [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_continent [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_controller [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_explored [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_ptr [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_tile_terrain_raw [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_unit_max_hp [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── get_unit_moves_remaining [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── handle_city_capture [GL] *** STATE MUTATION ***
│   │   │       │   │     (123 more functions reachable)
│   │   │       │   ├── handle_nuke_attack [GL] *** STATE MUTATION ***
│   │   │       │   │     (2 more functions reachable)
│   │   │       │   ├── is_tile_valid [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── load_unit_onto_ship [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── move_unit_to_bottom [GL] *** STATE MUTATION ***
│   │   │       │   │     (4 more functions reachable)
│   │   │       │   ├── mp_lock_map [GL] *** STATE MUTATION ***
│   │   │       │   │     (2 more functions reachable)
│   │   │       │   ├── mp_unlock_map [GL] *** STATE MUTATION ***
│   │   │       │   │     (2 more functions reachable)
│   │   │       │   ├── net_msg_init_header [GL]
│   │   │       │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── process_goody_hut [GL] *** STATE MUTATION ***
│   │   │       │   │     (7 more functions reachable)
│   │   │       │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── relocate_all_units [GL] *** STATE MUTATION ***
│   │   │       │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── resolve_combat [GL] *** STATE MUTATION ***
│   │   │       │   │     (42 more functions reachable)
│   │   │       │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── set_stack_seen_by [GL] *** STATE MUTATION ***
│   │   │       │   │     (1 more functions reachable)
│   │   │       │   ├── set_stack_visibility_mask [GL] *** STATE MUTATION ***
│   │   │       │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── set_tile_visibility_bits [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │       │   ├── spy_sabotage_unit [GL] *** STATE MUTATION ***
│   │   │       │   │     (10 more functions reachable)
│   │   │       │   ├── stack_unit [GL] *** STATE MUTATION ***
│   │   │       │   │     (3 more functions reachable)
│   │   │       │   ├── sum_stack_property [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── tile_distance_xy [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── wrap_x [GL]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── spaceship_ai_should_start [AI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── handle_caravan_arrival [MIXED] *** STATE MUTATION ***
│   │   │       │   │     (25 more functions reachable)
│   │   │       │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── spy_enters_city [MIXED] *** STATE MUTATION ***
│   │   │       │   │     (5 more functions reachable)
│   │   │       │   ├── animate_unit_movement [UI] *** STATE MUTATION ***
│   │   │       │   │     (12 more functions reachable)
│   │   │       │   ├── flush_display [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── set_improvement_name_string [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── show_dialog_message [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── show_game_popup_2arg [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── show_message [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── update_tile_all_players [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── wait_for_animation [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── FUN_0000C494 [??]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   └── [1 FW helper functions hidden]
│   │   │       └── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │             (recursive — already shown above)
│   │   ├── get_unit_max_hp [GL] (45B)
│   │   │     > Returns the maximum hit points for a unit based on its type.
│   │   │     (recursive — already shown above)
│   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │   │     (recursive — already shown above)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (recursive — already shown above)
│   │   ├── ai_try_settle_unit [AI] (322B)
│   │   │     > Attempts to settle a unit (found city or auto-process) for the AI. Checks that the unit is valid, has settler-like or...
│   │   │   ├── check_zoc_violation [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── execute_unit_order [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_unit_turn_master [AI] *** STATE MUTATION ***
│   │   │   │   ├── (check_tech_bit) [GL]
│   │   │   │   │   └── bit_index_to_byte_mask [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL]
│   │   │   │   │   ├── get_tile_city_radius_owner [GL]
│   │   │   │   │   └── get_tile_fertility [GL]
│   │   │   │   ├── adjust_attitude [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_shields_per_row [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_stack_best_defender [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_unit_defense_strength [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── find_city_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── has_building [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_adjacent_enemy_continent [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_adjacent_enemy_simple [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_tile_goody_hut [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_tile_resource [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_unit_can_improve [GL]
│   │   │   │   │   ├── check_adjacent_water [GL]
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── get_tile_terrain_raw [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── cities_share_coast [GL]
│   │   │   │   │   ├── city_adjacent_to_continent [GL]
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── city_adjacent_to_continent [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_connected_to_continent [GL]
│   │   │   │   │   ├── (check_tech_bit) [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── count_units_by_role [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── execute_paradrop [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── clear_stack_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diplomacy_check_attack_allowed [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_city_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_owner [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── handle_city_capture [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── relocate_all_units [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_paradrop_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── stack_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── animate_unit_movement [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── refresh_status_panel [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── FUN_0000C494 [??]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_attitude_raw [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_first_unit_in_stack [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_fortress_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_city_radius_owner [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent_if_land [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_fertility [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── pick_up_unit_004c9528 [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_city_revolt_distance [GL]
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_tile_owner [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── set_unit_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_status_panel_header [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wait_for_animation [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── relocate_unit_in_place [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── resolve_combat [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_unit_goto_order [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unit_order_found_city [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── delete_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_map_area_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── unit_pillage [GL] *** STATE MUTATION ***
│   │   │   │   │   ├── diplomacy_check_attack_allowed [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_add_goal_a [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── update_map_area_all_players [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_add_goal_a [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_add_goal_b [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_barbarian_unit_turn [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── (check_tech_bit) [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_city_value_for_capture [GL]
│   │   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_unit_goto_direction [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── check_zoc_if_no_city [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── count_units_by_role [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── delete_all_units_in_stack [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── delete_unit_visible [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_stack_seen_by [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unit_pillage [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_cancel_goto_on_domain [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── ai_set_goto_order [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_set_goto_via_coast [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── mp_set_number_control [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_game_popup_2arg [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_message [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── update_tile_all_players [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── ai_calc_continent_city_weight [AI]
│   │   │   │   ├── ai_cancel_goto_on_domain [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_find_best_settle_dir [AI]
│   │   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_find_max_goal_priority [AI]
│   │   │   │   ├── ai_find_nearest_city_or_transport [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_fortress_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── tile_distance_xy [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_find_nuke_target [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_treaty_flags [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_get_unit_role [AI]
│   │   │   │   ├── ai_naval_and_ranged_move [AI] *** STATE MUTATION ***
│   │   │   │   │   ├── (check_tech_bit) [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── calc_unit_movement_points [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── cities_share_coast [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── city_adjacent_to_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── city_connected_to_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_nearest_city [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── find_unit_stack_at_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_fortress_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_next_unit_in_stack [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_controller [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_explored [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_hp_remaining [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_max_hp [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_owner_at [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── relocate_unit [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── should_declare_war [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── sum_stack_property [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── tile_distance_xy [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wrap_x [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── ai_find_nearest_city_or_transport [AI] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── ai_set_goto_order [AI] *** STATE MUTATION ***
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_remove_goals_near [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_set_goto_order [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_set_goto_via_coast [AI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── spaceship_ai_should_start [AI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_map_area_all_players [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_0000C679 [??]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   └── init_game_display [UI]
│   │   │         (recursive — already shown above)
│   │   ├── check_tutorial_advice [MIXED] (1058B) *** STATE MUTATION ***
│   │   │     > Checks tutorial advice conditions for the currently selected unit. Suggests building cities, mining, irrigating, or b...
│   │   │   ├── (get_tile_fertility_or_city_radius) [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_adjacent_water [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_tile_resource [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_nearest_city [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_improvements [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_ptr [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (scroll_if_needed) [UI]
│   │   │   │   └── set_map_scroll_position [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   └── unknown (tutorial_show_advice) [UI]
│   │   │         (recursive — already shown above)
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   │     (recursive — already shown above)
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │   └── center_map_on_cursor [UI]
│   │   │       └── update_map_area [UI] *** STATE MUTATION ***
│   │   │             (recursive — already shown above)
│   │   ├── process_messages [UI] (21B)
│   │   │     > Processes pending Windows messages (message pump). Called in modal dialog loops.
│   │   │     (recursive — already shown above)
│   │   ├── resume_music [UI] (85B)
│   │   │     > Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│   │   │     (recursive — already shown above)
│   │   └── unknown (tutorial_show_advice) [UI] (38B)
│   │         > Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │         (recursive — already shown above)
│   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │     (recursive — already shown above)
│   ├── activate_current_unit [MIXED] (398B) *** STATE MUTATION ***
│   │     > Activates the current unit for player input. Handles transition from "no unit selected" to active unit state.
│   │   ├── is_unit_ready_to_move [GL] (271B)
│   │   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │   │     (recursive — already shown above)
│   │   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │   │     > Selects the next unit needing orders. Calls the unit finder, scrolls the map to the unit, activates it for input.
│   │   │   ├── find_next_unit_needing_orders [GL] *** STATE MUTATION ***
│   │   │   │   ├── calc_movement_cost [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── is_unit_ready_to_move [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── is_unit_ready_to_move [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── process_unit_move_visibility [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_menu_state [MIXED]
│   │   │   │   ├── can_build_unit_type [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_city_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_fortress_owner_at [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_wonder_city [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_building [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_worked [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── menu_populate [UI]
│   │   │   │   │   ├── menu_create_header [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── menu_delete_item [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── menu_insert_item [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── menu_set_host_window [UI]
│   │   │   │   │   │     (8 more functions reachable)
│   │   │   │   │   ├── menu_toggle_item_checked [UI]
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── menu_toggle_item_grayed [UI]
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── menu_update_host [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── menu_set_all_subitems_checked [UI]
│   │   │   │   │   ├── menu_find_item_by_id [UI]
│   │   │   │   │   └── menu_set_subitem_checked [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── menu_set_subitem_checked [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── menu_set_subitem_hidden [UI]
│   │   │   │   │   └── menu_find_subitem_by_id [UI]
│   │   │   │   ├── set_improvement_name_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── update_menu_item_label [UI]
│   │   │   │       ├── menu_set_subitem_checked [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── menu_update_subitem_text [UI]
│   │   │   │       │     (6 more functions reachable)
│   │   │   │       ├── mp_format_template_string [UI]
│   │   │   │       │     (1 more functions reachable)
│   │   │   │       ├── text_add_label_id [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── text_begin [UI]
│   │   │   │             (recursive — already shown above)
│   │   │   ├── refresh_status_panel [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── scroll_all_views_if_needed [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── start_human_turn [UI]
│   │   │   │   ├── update_menu_state [MIXED]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── center_all_map_views [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── refresh_status_panel [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   └── [1 FW helper functions hidden]
│   │   ├── update_menu_state [MIXED] (3761B)
│   │   │     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│   │   │     (recursive — already shown above)
│   │   ├── center_all_map_views [UI] (116B)
│   │   │     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   │     (recursive — already shown above)
│   │   ├── refresh_status_panel [UI] (297B)
│   │   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │     (recursive — already shown above)
│   │   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │   │     > Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/clears a rendering lo...
│   │   │     (recursive — already shown above)
│   │   └── start_human_turn [UI] (95B)
│   │         > Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│   │         (recursive — already shown above)
│   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │     (recursive — already shown above)
│   ├── resume_turn_timer [MIXED] (181B) *** STATE MUTATION ***
│   │     > Resumes the turn timer if time remains and game is active.
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │   │     (recursive — already shown above)
│   │   ├── credits_invalidate [UI] (27B)
│   │   │     > Invalidates the credits display to trigger repaint.
│   │   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │   │     > Forces invalidation of the Civilopedia display cache.
│   │   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │   │     > Idle handler for throne room. If context exists and in phase 0, invalidates the display for animation.
│   │   ├── FUN_0000994F [??]
│   │   └── [3 FW helper functions hidden]
│   ├── select_next_unit [MIXED] (436B) *** STATE MUTATION ***
│   │     > Selects the next unit needing orders. Calls the unit finder, scrolls the map to the unit, activates it for input.
│   │     (recursive — already shown above)
│   ├── update_menu_state [MIXED] (3761B)
│   │     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│   │     (recursive — already shown above)
│   ├── center_all_map_views [UI] (116B)
│   │     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │     (recursive — already shown above)
│   ├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│   │     > Plays a sound effect by ID. Looks up sound filename from table, checks for custom sound directory, and plays via Wind...
│   │     (recursive — already shown above)
│   ├── refresh_status_panel [UI] (297B)
│   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │     (recursive — already shown above)
│   ├── scroll_all_views_if_needed [UI] (261B) *** STATE MUTATION ***
│   │     > Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/clears a rendering lo...
│   │     (recursive — already shown above)
│   ├── start_human_turn [UI] (95B)
│   │     > Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│   │     (recursive — already shown above)
│   ├── wait_for_player_input [UI] (162B)
│   │     > Waits for player input when no unit is active. Loops processing messages until the player takes an action.
│   │   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │   │     (recursive — already shown above)
│   │   ├── process_messages [UI] (21B)
│   │   │     > Processes pending Windows messages (message pump). Called in modal dialog loops.
│   │   │     (recursive — already shown above)
│   │   └── resume_music [UI] (85B)
│   │         > Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│   │         (recursive — already shown above)
│   ├── unknown (FW thunk) [FW] (21B)
│   │     > Thunk redirecting to FUN_005bb9c0.
│   │   └── [1 FW helper functions hidden]
│   └── FUN_0000994F [??]
│         (recursive — already shown above)
├── process_end_of_turn [GL] (1744B) *** STATE MUTATION ***
│     > Master end-of-turn processing. Spawns barbarians, updates pollution, calculates power rankings, checks tech advance, ...
│   ├── begin_turn_unit_reset [GL] (615B) *** STATE MUTATION ***
│   │     > Resets unit movement/status for a new turn. Calls refresh_map_visibility, optionally calls thunk_FUN_005b6787 on all ...
│   │   ├── refresh_map_visibility [GL] (259B) *** STATE MUTATION ***
│   │   │     > Refreshes map visibility for all tiles and unit positions. Sets DAT_006ad699=0 during refresh, 1 after.
│   │   │   ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   └── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │         (recursive — already shown above)
│   │   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (recursive — already shown above)
│   │   ├── set_tile_improvement_bits [GL] (330B) *** STATE MUTATION ***
│   │   │     > Sets or clears improvement bits on a tile. If the value actually changed and in multiplayer, queues or sends a map up...
│   │   │     (recursive — already shown above)
│   │   └── spy_diplomat_action [GL] (1271B) *** STATE MUTATION ***
│   │         > Executes a spy/diplomat's action in an enemy city — handles the chance of being caught (based on veteran status and w...
│   │       ├── delete_unit_visible [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── diff_engine_scan_and_send [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── find_nearest_city [GL]
│   │       │     (recursive — already shown above)
│   │       ├── net_send_message [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── refresh_unit_movement [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── relocate_unit [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── spy_diplomat_action [GL] *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── enqueue_mp_event [MIXED]
│   │       │     (recursive — already shown above)
│   │       ├── show_dialog_message [UI]
│   │       │     (recursive — already shown above)
│   │       └── update_tile_all_players [UI]
│   │             (recursive — already shown above)
│   ├── calc_power_graph_rankings [GL] (2094B) *** STATE MUTATION ***
│   │     > Calculates power rankings for all civilizations, updates the power graph history, determines the leading civilization...
│   │   ├── adjust_attitude [GL] (107B) *** STATE MUTATION ***
│   │   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   │     (recursive — already shown above)
│   │   ├── city_count_content_citizens [GL] (125B)
│   │   │     > Counts content citizens for a city, including We Love the King bonus and wonder bonuses.
│   │   ├── has_spaceship_launched [GL] (47B)
│   │   │     > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │   │     (recursive — already shown above)
│   │   ├── spaceship_is_enabled [GL] (90B)
│   │   │     > Returns whether the spaceship victory condition is enabled. Disabled if scenario flag 0x80 is set, or if no space tec...
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── calc_year_from_turn [GL] (540B)
│   │     > Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   │   └── [1 FW helper functions hidden]
│   ├── check_tech_advance [GL] (403B) *** STATE MUTATION ***
│   │     > Checks if a civilization has accumulated enough research to advance to the next tech. If so, increments DAT_0064ca9e ...
│   │   ├── calc_civ_score [GL] (1542B) *** STATE MUTATION ***
│   │   │     > Calculates civilization score for param_1. Sums population, wonders, future techs, pollution penalty, map exploration...
│   │   │   ├── city_count_content_citizens [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── spaceship_recalc_stats [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   └── [2 FW helper functions hidden]
│   │   ├── calc_tech_paradigm_cost [GL] (90B)
│   │   │     > Calculates the research cost for a given tech level. Uses triangular number formula: sum of (7-difficulty)*i for i=0....
│   │   ├── has_building [GL] (122B)
│   │   │     > Checks if a city has a specific building. Returns 1 if building bit is set, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   └── show_throne_room [MIXED] (247B) *** STATE MUTATION ***
│   │         > Shows the throne room improvement screen. Checks if any throne room categories still have available upgrades; if so, ...
│   │       ├── throne_room_add_improvement [MIXED] *** STATE MUTATION ***
│   │       │   ├── animate_screen_reveal [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── draw_throne_title [UI]
│   │       │   │   ├── port_measure_text [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_string [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_begin [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (set/get draw color) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── end_paint [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── flush_display [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── init_palette_system [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── load_throne_dll [UI]
│   │       │   │   ├── create_offscreen_surface_b [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── pedia_set_resource [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_callback_paint [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── surface_init_8 [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_palette [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [3 FW helper functions hidden]
│   │       │   ├── manage_window_show [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── modal_dialog_run [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── port_alloc_rect [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── port_blit_stretch [UI]
│   │       │   │   ├── check_topdown [UI]
│   │       │   │   ├── copy_rect_8bit [UI]
│   │       │   │   ├── get_surface_buffer_handle [UI]
│   │       │   │   ├── port_lock [UI]
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── port_unlock [UI]
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── surface_is_locked [UI]
│   │       │   │   └── unknown (get surface base) [UI]
│   │       │   ├── port_get_font [UI]
│   │       │   │   └── FUN_00003FEB [??]
│   │       │   ├── render_throne_room [UI]
│   │       │   │   ├── flush_display [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── load_gif_resource [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── port_destructor [UI]
│   │       │   │   │     (4 more functions reachable)
│   │       │   │   ├── sprite_free_data [UI]
│   │       │   │   │     (2 more functions reachable)
│   │       │   │   ├── sprite_replace_color [UI]
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── show_window_wrapper [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── start_cursor_blink [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── stop_cursor_blink [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── throne_room_select_piece [UI]
│   │       │   │   ├── add_click_region [UI]
│   │       │   │   ├── flush_display [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── load_gif_resource [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── port_destructor [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── sprite_free_data [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── sprite_replace_color [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── unknown (manage pedia window) [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── unknown (pedia set and display resource) [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── unknown (set/get draw color) [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   └── [8 FW helper functions hidden]
│   │       ├── destroy_throne_context [UI]
│   │       │   ├── pedia_free_resource [UI]
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   └── [2 FW helper functions hidden]
│   │       ├── init_throne_context [UI]
│   │       │   ├── get_screen_rect [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── init_render_surface [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── init_sprite_surface_mgr [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── palette_init [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── popup_dialog_create [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   ├── unknown (pedia object initializer) [UI]
│   │       │   │     (recursive — already shown above)
│   │       │   └── [4 FW helper functions hidden]
│   │       └── [3 FW helper functions hidden]
│   ├── civ_has_active_wonder [GL] (142B)
│   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │     (recursive — already shown above)
│   ├── has_spaceship_launched [GL] (47B)
│   │     > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │     (recursive — already shown above)
│   ├── is_spaceship_arriving [GL] (88B)
│   │     > Returns 1 if civ param_1's spaceship has launched AND the arrival turn has not yet been reached.
│   │   └── has_spaceship_launched [GL] (47B)
│   │         > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │         (recursive — already shown above)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │     (recursive — already shown above)
│   ├── spawn_barbarians [GL] (3297B) *** STATE MUTATION ***
│   │     > Main barbarian spawning logic. Spawns barbarian units in wilderness and near cities based on difficulty, turn number,...
│   │   ├── calc_city_value_for_capture [GL] (277B)
│   │   │     > Calculates the strategic value of a city (param_1 = city index) for capture/transfer purposes. Formula: (city_size * ...
│   │   │     (recursive — already shown above)
│   │   ├── check_adjacent_enemy_continent [GL] (297B) *** STATE MUTATION ***
│   │   │     > Like check_adjacent_enemy_simple but also checks that the enemy is on the same landmass (ocean type match).
│   │   │     (recursive — already shown above)
│   │   ├── create_unit [GL] (1675B) *** STATE MUTATION ***
│   │   │     > Creates a new unit of the specified type for a given civilization at a map position. Finds a free unit slot, initiali...
│   │   │     (recursive — already shown above)
│   │   ├── delete_all_units_in_stack [GL] (144B) *** STATE MUTATION ***
│   │   │     > Deletes every unit in a stack by iterating from first to last.
│   │   │     (recursive — already shown above)
│   │   ├── find_nearest_city [GL] (400B)
│   │   │     > Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status. Retu...
│   │   │     (recursive — already shown above)
│   │   ├── find_unit_stack_at_xy [GL] (231B)
│   │   │     > Finds the first unit of any civ at map position (param_1, param_2). If DAT_00636058 is set, requires a unit to be vis...
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_continent [GL] (39B)
│   │   │     > Returns byte 3 of tile data (continent/landmass ID).
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_explored [GL] (71B)
│   │   │     > Returns whether a tile has been explored by a specific civ (checks bit in byte 4 corresponding to civ index).
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_ptr [GL] (90B)
│   │   │     > Returns pointer to 6-byte tile data for map position (param_1, param_2). Returns pointer to dummy tile if coordinates...
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_owner_at [GL] (66B)
│   │   │     > Returns the civ with units at a tile, or -1. Checks if byte1 bit 0 is set (unit present).
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_ocean [GL] (57B)
│   │   │     > Returns true if terrain type == 10 (ocean).
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_valid [GL] (80B)
│   │   │     > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │   │     (recursive — already shown above)
│   │   ├── relocate_unit_in_place [GL] (60B) *** STATE MUTATION ***
│   │   │     > Relocates a unit to its own current position (used to refresh stack linkage).
│   │   │     (recursive — already shown above)
│   │   ├── set_unit_goto_order [GL] (66B) *** STATE MUTATION ***
│   │   │     > Sets a unit's order to "goto" (3). If the unit wasn't already on goto, resets the goto target.
│   │   │     (recursive — already shown above)
│   │   ├── wrap_x [GL] (94B)
│   │   │     > Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   │     (recursive — already shown above)
│   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │   │     (recursive — already shown above)
│   │   ├── show_game_popup_2arg [UI] (39B)
│   │   │     > Shows a game popup dialog with 2 arguments using the global dialog context.
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── update_tile_all_players [UI] (124B)
│   │   │     > Updates a single tile for all active players.
│   │   │     (recursive — already shown above)
│   │   └── [2 FW helper functions hidden]
│   ├── update_pollution_counter [GL] (487B) *** STATE MUTATION ***
│   │     > Updates the global pollution counter. Calculates pollution level from shield production minus recycling, adjusts DAT_...
│   │   ├── apply_global_warming [GL] (819B) *** STATE MUTATION ***
│   │   │     > Applies global warming effects to the map. Iterates all tiles, for tiles meeting criteria (terrain type < 4, adjacent...
│   │   │   ├── begin_map_batch [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── end_map_batch [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_vis_ptr [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_explored [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_owner [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_terrain_raw [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_ocean [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_tile_improvement_bits [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_tile_owner [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_tile_terrain [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_civ_visibility [GL] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wrap_x [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── enqueue_mp_event [MIXED]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_dialog_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── update_tile_all_players [UI]
│   │   │         (recursive — already shown above)
│   │   ├── has_building [GL] (122B)
│   │   │     > Checks if a city has a specific building. Returns 1 if building bit is set, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── enqueue_mp_event [MIXED] (398B)
│   │   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │   │     (recursive — already shown above)
│   │   ├── show_dialog_message [UI] (43B)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── enqueue_mp_event [MIXED] (398B)
│   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │     (recursive — already shown above)
│   ├── get_civ_name [UI] (28B)
│   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │     (recursive — already shown above)
│   ├── show_dialog_message [UI] (43B)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   ├── show_historians_report [UI] (1501B)
│   │     > Shows the Historian's report. Reads the HISTORIANS section from game text, randomly selects a ranking category (wealt...
│   │   ├── civ_has_tech [GL] (181B)
│   │   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── rng_range [GL] (113B) *** STATE MUTATION ***
│   │   │     > Returns a random integer in the range [param_1, param_2]. If param_1 == param_2, just advances the RNG and returns pa...
│   │   │     (recursive — already shown above)
│   │   ├── open_list_dialog [UI] (47B)
│   │   │     > Opens a list dialog with the given title and flags.
│   │   │     (recursive — already shown above)
│   │   ├── popup_add_edit_field [UI] (412B)
│   │   │     > Adds a text edit field to a popup dialog. Allocates a 0x20-byte node, sets field ID, label, default text, and dimensi...
│   │   │   └── [2 FW helper functions hidden]
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│   │   │     (recursive — already shown above)
│   │   ├── select_list_item [UI] (38B)
│   │   │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_label_id [UI] (33B)
│   │   │     > Appends a localized label (by ID) to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_number [UI] (33B)
│   │   │     > Adds a number to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_string [UI] (33B)
│   │   │     > Appends a string to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin_bold [UI] (29B)
│   │   │     > Begins bold text mode in the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_newline [UI] (29B)
│   │   │     > Adds a newline to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   └── [7 FW helper functions hidden]
│   ├── show_message [UI] (46B)
│   │     > Stores a message string in the message buffer at the specified slot index.
│   │     (recursive — already shown above)
│   ├── show_window_wrapper [UI] (33B)
│   │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (recursive — already shown above)
│   ├── unknown (manage pedia window) [UI] (37B)
│   │     > Calls manage_window_C44D with the window handle at this+8.
│   │     (recursive — already shown above)
│   ├── clamp [FW] (57B)
│   │     > Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
│   └── FUN_0000994F [??]
│         (recursive — already shown above)
├── ai_process_unit_automation [AI] (801B) *** STATE MUTATION ***
│     > Main AI unit automation loop. Iterates all units belonging to the current AI civ, processes each unit's automated act...
│   ├── check_zoc_violation [GL] (407B) *** STATE MUTATION ***
│   │     > Checks if a unit at (param_1, param_2) moving for civ param_3 would violate zone-of-control rules. Examines 8 adjacen...
│   │     (recursive — already shown above)
│   ├── diff_engine_scan_and_send [GL] (1883B) *** STATE MUTATION ***
│   │     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │     (recursive — already shown above)
│   ├── get_unit_moves_remaining [GL] (69B)
│   │     > Returns remaining movement points (total - spent). Minimum 0.
│   │     (recursive — already shown above)
│   ├── is_tile_ocean [GL] (57B)
│   │     > Returns true if terrain type == 10 (ocean).
│   │     (recursive — already shown above)
│   ├── is_unit_active [GL] (176B)
│   │     > Returns 1 if a unit is "active" — alive, has valid position, not on goto, and has remaining movement.
│   │     (recursive — already shown above)
│   ├── refresh_unit_movement [GL] (40B) *** STATE MUTATION ***
│   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │     (recursive — already shown above)
│   ├── sum_stack_property [GL] (724B)
│   │     > Sums a property across all units in a stack. param_2 selects which property: 0=shield cost, 1=defense, 2/11=count, 3=...
│   │     (recursive — already shown above)
│   ├── ai_try_settle_unit [AI] (322B)
│   │     > Attempts to settle a unit (found city or auto-process) for the AI. Checks that the unit is valid, has settler-like or...
│   │     (recursive — already shown above)
│   ├── network_poll [MIXED] (14034B) *** STATE MUTATION ***
│   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │     (recursive — already shown above)
│   └── center_all_map_views [UI] (116B)
│         > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│         (recursive — already shown above)
├── check_turn_advisors [MIXED] (1208B) *** STATE MUTATION ***
│     > Checks various turn-based advisor triggers: council meeting every 50 turns, tutorial messages for first turns, "one c...
│   ├── find_nearest_city [GL] (400B)
│   │     > Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status. Retu...
│   │     (recursive — already shown above)
│   ├── get_civ_people_name [GL] (145B)
│   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │     (recursive — already shown above)
│   ├── has_building [GL] (122B)
│   │     > Checks if a city has a specific building. Returns 1 if building bit is set, 0 otherwise.
│   │     (recursive — already shown above)
│   ├── set_map_scroll_position [UI] (98B)
│   │     > Sets the map scroll position to (param_1, param_2) on the current map view, temporarily disabling a rendering flag.
│   │     (recursive — already shown above)
│   ├── show_dialog_message [UI] (43B)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   ├── show_govt_council [UI] (134B)
│   │     > Shows the government council (full advisor council with video). Sets DAT_00631ad0=1, constructs the council, initiali...
│   │   ├── council_video_init [UI] (1672B)
│   │   │     > Initializes the government council video system. Creates the dialog surface, gets advisor recommendations, loads advi...
│   │   │   ├── get_advisor_recommendation [GL]
│   │   │   │   ├── ai_assess_city_defense [AI]
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── ai_assess_diplomacy [AI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── civ_has_tech [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_assess_economy [AI]
│   │   │   │   │   ├── calc_building_upkeep_cost [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── distribute_trade [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── has_building [GL]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_assess_military_posture [AI]
│   │   │   │   │   ├── civ_has_active_wonder [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── civ_has_tech [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── has_building [GL]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   └── ai_assess_tax_rate [AI] *** STATE MUTATION ***
│   │   │   │       ├── calc_city_production (entry point) [GL] *** STATE MUTATION ***
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── has_building [GL]
│   │   │   │             (recursive — already shown above)
│   │   │   ├── get_civ_era_level [GL]
│   │   │   │   └── civ_has_tech [GL]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── council_create_buttons [UI]
│   │   │   │   ├── intel_create_button [UI]
│   │   │   │   │   └── create_text_button [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── set_button_click_callback [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── council_draw_panels [UI]
│   │   │   │   ├── draw_3d_border [UI]
│   │   │   │   │   ├── draw_hline [UI]
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   └── draw_vline [UI]
│   │   │   │   │         (3 more functions reachable)
│   │   │   │   ├── get_civ_name [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_fill_rect [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_fill_rect_pattern [UI]
│   │   │   │   │   ├── draw_string_palette [UI]
│   │   │   │   │   │     (4 more functions reachable)
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── FUN_0000847F [??]
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_newline [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_bitmap [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── council_load_all_videos [UI]
│   │   │   │   └── [10 FW helper functions hidden]
│   │   │   ├── council_parse_advisor_script [UI]
│   │   │   │   ├── rng_range [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [7 FW helper functions hidden]
│   │   │   ├── create_offscreen_surface_b [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_clear_selection [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── popup_dialog_open [UI]
│   │   │   │   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── unknown (get drawing context) [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── widget_dropdown_dtor [UI]
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── widget_scrollbar_dtor [UI]
│   │   │   │   │   │     (8 more functions reachable)
│   │   │   │   │   └── [4 FW helper functions hidden]
│   │   │   │   ├── popup_dialog_reset [UI]
│   │   │   │   ├── popup_set_bitmap [UI]
│   │   │   │   │   └── popup_calc_max_text_height [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── popup_set_field_10 [UI]
│   │   │   │   ├── popup_set_scaled_width [UI]
│   │   │   │   ├── rect_get_height [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (popup list init) [UI]
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── set_active_surface [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_input_dialog_int [UI]
│   │   │   │   └── FUN_0051D75D [??]
│   │   │   ├── text_add_number [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set_font_size) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [8 FW helper functions hidden]
│   │   ├── council_video_run [UI] (388B)
│   │   │     > Runs the government council video playback loop. Flips surfaces, suspends music, initializes display, shows all panel...
│   │   │   ├── control_invalidate [UI]
│   │   │   │   ├── FUN_00008B00 [??]
│   │   │   │   └── FUN_00008B2D [??]
│   │   │   ├── council_draw_panels [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── fade_in_palette [UI]
│   │   │   │   ├── palette_crossfade_step [UI]
│   │   │   │   │   ├── unknown (palette_set_entry_raw) [UI]
│   │   │   │   │   ├── FUN_0000EA62 [??]
│   │   │   │   │   └── [3 FW helper functions hidden]
│   │   │   │   ├── palette_restore_from_crossfade [UI]
│   │   │   │   │   ├── palette_set_entries [UI]
│   │   │   │   │   │     (4 more functions reachable)
│   │   │   │   │   └── [3 FW helper functions hidden]
│   │   │   │   ├── palette_setup_crossfade [UI]
│   │   │   │   │   ├── unknown (palette apply with range) [UI]
│   │   │   │   │   │     (4 more functions reachable)
│   │   │   │   │   └── [5 FW helper functions hidden]
│   │   │   │   ├── restore_palette_entries [UI]
│   │   │   │   │   ├── palette_apply [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── unknown (realize all palettes) [UI]
│   │   │   │   │   ├── end_paint [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── init_palette_system [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── unknown (realize palettes) [UI]
│   │   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── set_active_surface [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   └── wait_for_animation [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── fade_out_palette [UI]
│   │   │   │   ├── apply_palette_to_surfaces [UI]
│   │   │   │   │   ├── port_load_tga_file [UI]
│   │   │   │   │   ├── unknown (realize all palettes) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── palette_crossfade_step [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── palette_restore_from_crossfade [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── palette_setup_crossfade [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── restore_palette_entries [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (realize all palettes) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wait_for_animation [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── select_list_item [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set popup parent A) [UI]
│   │   │   ├── video_set_position [UI]
│   │   │   │   └── move_window_to [UI]
│   │   │   │       ├── rect_get_height [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── rect_get_width [UI]
│   │   │   │             (recursive — already shown above)
│   │   │   └── [2 FW helper functions hidden]
│   │   ├── govt_council_construct [UI] (293B)
│   │   │     > Constructs the government council dialog. Initializes base class, creates popup surface, dialog, 6 sub-windows. Sets ...
│   │   │   ├── init_sprite_surface_mgr [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── popup_dialog_create [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [2 FW helper functions hidden]
│   │   ├── resume_music [UI] (85B)
│   │   │     > Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (stop music) [UI] (31B)
│   │   │     > Stops music playback and sets paused flag.
│   │   │     (recursive — already shown above)
│   │   └── [3 FW helper functions hidden]
│   ├── show_message [UI] (46B)
│   │     > Stores a message string in the message buffer at the specified slot index.
│   │     (recursive — already shown above)
│   ├── text_add_label_id [UI] (33B)
│   │     > Appends a localized label (by ID) to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_add_string [UI] (33B)
│   │     > Appends a string to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_begin [UI] (29B)
│   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │     (recursive — already shown above)
│   ├── unknown (string pool set) [UI] (33B)
│   │     > Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   └── advance_year_display [UI] (479B)
│   │         > Advances the year display in the UI, showing appropriate year strings. Handles both standard (AD/BC) and scenario cal...
│   │         (recursive — already shown above)
│   ├── unknown (tutorial_show_city_screen) [UI] (42B)
│   │     > Wrapper that calls thunk_FUN_0051d564(param_1, param_2, 0, param_3, param_4). Displays a tutorial dialog on a city sc...
│   │     (recursive — already shown above)
│   └── unknown (tutorial_show_unit) [UI] (38B)
│         > Wrapper calling thunk_FUN_004a6cc5(param_1, param_2, 0, param_3).
│       └── show_city_style_picker [UI] (260B)
│             > Shows a city style picker dialog for the Civilopedia.
│           ├── popup_add_button [UI]
│           │     (recursive — already shown above)
│           ├── popup_dialog_create [UI]
│           │     (recursive — already shown above)
│           ├── select_list_item [UI]
│           │     (recursive — already shown above)
│           ├── sprite_init_empty [UI]
│           │     (recursive — already shown above)
│           └── [3 FW helper functions hidden]
├── mp_handle_player_turn [MIXED] (192B) *** STATE MUTATION ***
│     > Handles player turn authentication in multiplayer. If no password set and mode is email: prompts to set one. If passw...
│   ├── mp_check_password_or_set [GL] (90B) *** STATE MUTATION ***
│   │     > Checks if a player has a password set. If not, calls mp_set_password to create one.
│   │   ├── mp_set_password [MIXED] (614B) *** STATE MUTATION ***
│   │   │     > Implements the password set/change dialog for multiplayer. If password exists, verifies old password first, then prom...
│   │   │   ├── mp_update_password_flags [GL] *** STATE MUTATION ***
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── resume_turn_timer [MIXED] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_turn_timer [MIXED] *** STATE MUTATION ***
│   │   │   │   ├── net_send_message [GL] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── credits_invalidate [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_minimap_overlay [UI] *** STATE MUTATION ***
│   │   │   │   │   ├── blit_rect_to_rect [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── fill_surface_from_rect [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── flush_display [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_alloc [UI]
│   │   │   │   │   │     (14 more functions reachable)
│   │   │   │   │   ├── port_set_rect [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_set_rect_from_self [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── unknown (pedia_invalidate_cache) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (throne room timer/idle handler) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_0000994F [??]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── mp_prepare_password_dialog [UI]
│   │   │   │   └── [3 FW helper functions hidden]
│   │   │   ├── popup_dialog_create [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── popup_parse_text_file [UI]
│   │   │   │   ├── mp_format_template_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_add_action_button_label [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_add_edit_field [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_add_radio_checked [UI]
│   │   │   │   │   └── popup_add_radio_option [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── popup_add_radio_option [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_add_text_input [UI]
│   │   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   ├── popup_dialog_open [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_set_field_38 [UI]
│   │   │   │   ├── popup_set_page_layout [UI]
│   │   │   │   │   └── popup_set_radio_column_count [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── popup_set_radio_selected [UI]
│   │   │   │   │   └── popup_find_radio_option_by_id [UI]
│   │   │   │   ├── popup_set_scaled_width [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_set_title [UI]
│   │   │   │   │   └── [2 FW helper functions hidden]
│   │   │   │   └── [4 FW helper functions hidden]
│   │   │   ├── popup_show_modal [UI]
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_edit_text [UI]
│   │   │   │   │   └── FUN_00002D4D [??]
│   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── init_palette_system [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── modal_dialog_run [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_dialog_destroy [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── popup_paint [UI]
│   │   │   │   │   ├── control_invalidate [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_3d_border [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_border_rect [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── end_paint [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── init_editor_scrollbar [UI]
│   │   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── popup_create_window [UI]
│   │   │   │   │   │     (13 more functions reachable)
│   │   │   │   │   ├── popup_draw_background [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── popup_get_padded_height [UI]
│   │   │   │   │   ├── popup_init_controls [UI]
│   │   │   │   │   │     (58 more functions reachable)
│   │   │   │   │   ├── popup_layout_dialog [UI]
│   │   │   │   │   │     (15 more functions reachable)
│   │   │   │   │   ├── popup_layout_text [UI]
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── popup_redraw_visible_items [UI]
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── popup_render_label [UI]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── port_draw_text_styled [UI]
│   │   │   │   │   ├── port_fill_rect_pattern [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── scale_sprite [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_rect_abs [UI]
│   │   │   │   │   ├── set_rect_wh [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── set_sprite_scale [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── show_window_wrapper [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (invalidate_all_children) [UI]
│   │   │   │   │   ├── unknown (popup_draw_icon) [UI]
│   │   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── widget_get_height [UI]
│   │   │   │   │   └── widget_inflate_rect_neg [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── process_messages [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (popup_get_edit_text) [UI]
│   │   │   │   │   └── FUN_00003D62 [??]
│   │   │   │   ├── unknown (popup_get_item_text) [UI]
│   │   │   │   │   └── FUN_00003CFF [??]
│   │   │   │   ├── unknown — manage window [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [5 FW helper functions hidden]
│   │   ├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│   │   │     > Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│   │   │     (recursive — already shown above)
│   │   └── [3 FW helper functions hidden]
│   └── mp_verify_password [UI] (341B)
│         > Verifies a player's password. Shows password prompt, compares with stored (decrypted) password. Shows error on mismatch.
│       ├── mp_prepare_password_dialog [UI] (137B)
│       │     > Prepares the password dialog by setting the title string from the civ name and a string resource ID.
│       │     (recursive — already shown above)
│       ├── popup_dialog_create [UI] (93B)
│       │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│       │     (recursive — already shown above)
│       ├── popup_parse_text_file [UI] (2287B)
│       │     > Parses a game text file section to configure and populate a popup dialog. Handles @-directives (OPTIONS, PROMPT, TITL...
│       │     (recursive — already shown above)
│       ├── popup_show_modal [UI] (999B)
│       │     > Shows the popup as a modal dialog and runs the message loop until the user makes a selection or cancels. Returns the ...
│       │     (recursive — already shown above)
│       ├── unknown (dialog show single param) [UI] (33B)
│       │     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│       │     (recursive — already shown above)
│       └── [4 FW helper functions hidden]
├── show_victory_screen [MIXED] (450B) *** STATE MUTATION ***
│     > Shows the victory/defeat screen based on DAT_0064b1ac type (1=space race win, 2=space race other, 3=conquest, 4=domin...
│   ├── submit_hall_of_fame_entry [MIXED] (601B) *** STATE MUTATION ***
│   │     > Constructs a new Hall of Fame entry from current game state, inserts it into the sorted list, saves to file, and show...
│   │   ├── civ_calc_total_population [GL] (193B)
│   │   │     > Sums population points across all cities of a given civ. Clamps result to [1, 32000].
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── show_hall_of_fame_dialog [UI] (544B)
│   │   │     > Opens the Hall of Fame dialog. If param_1 < 0, uses simple layout; otherwise creates two navigation buttons.
│   │   │   ├── advisor_create_close_button [UI]
│   │   │   ├── create_text_button [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── rect_get_height [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_active_surface [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_button_click_callback [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_button_handler [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_button_owner [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_rect_wh [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [4 FW helper functions hidden]
│   │   └── [4 FW helper functions hidden]
│   ├── play_loser_video [UI] (221B)
│   │     > Allocates a cutscene object (~0x137c bytes), loads loser art, shows loser text, then cleans up. Entry point for the g...
│   │   ├── load_civ2_art_004705d7 [UI] (772B)
│   │   │     > Loads "loser.avi" and "civ2art.dll" art resources for the defeat cutscene. Sets up video display surface, font, and r...
│   │   │   ├── get_screen_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_free_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_set_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_alloc_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_color [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── surface_init_8 [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_palette [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [7 FW helper functions hidden]
│   │   ├── show_loser_text [UI] (817B)
│   │   │     > Displays the 3-page loser/defeat text sequence. Reads text from ARCHAEOLOGISTS section in game text file, renders wit...
│   │   │   ├── civ_has_tech [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── animate_screen_reveal [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── manage_window_show [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── mp_format_template_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── play_music_track [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_blit_stretch [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_get_font [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── start_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_number [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wait_for_animation [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [7 FW helper functions hidden]
│   │   └── [2 FW helper functions hidden]
│   ├── play_winner_video [UI] (606B) *** STATE MUTATION ***
│   │     > Plays the winner/victory cutscene. If param_1 < 0, shows the Centauri beaten version. Otherwise, loads winner video, ...
│   │   ├── get_civ_noun_name [GL] (145B)
│   │   │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │   │     (recursive — already shown above)
│   │   ├── dialog_set_title [UI] (41B)
│   │   │     > Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_name [UI] (28B)
│   │   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (recursive — already shown above)
│   │   ├── load_civ2_art_00471565 [UI] (753B)
│   │   │     > Loads winner video art: checks for "winwin.avi" and "civ2art.dll" using CD-ROM lookup. Sets up video playback surface...
│   │   │   ├── get_screen_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_free_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_set_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_alloc_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_color [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── surface_init_8 [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (dialog show single param) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_palette [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [10 FW helper functions hidden]
│   │   ├── load_civ2_art_00471dd8 [UI] (1467B)
│   │   │     > Loads art for the "Centauri beaten" (player lost Alpha Centauri race) cutscene. Creates a standalone display with sta...
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── animate_screen_reveal [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── create_offscreen_surface [UI]
│   │   │   │   ├── get_view_window_handle [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_alloc_rect [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_draw_text_rect [UI]
│   │   │   │   │   └── write_full_colortable [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── set_window_data_and_wndproc [UI]
│   │   │   │   └── surface_create_7param [UI]
│   │   │   │       ├── get_view_window_handle [UI]
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── set_dialog_wndproc [UI]
│   │   │   │       └── surface_init_7 [UI]
│   │   │   │             (4 more functions reachable)
│   │   │   ├── get_civ_name [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_screen_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_render_surface [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_sprite_surface_mgr [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── manage_window_show [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── mp_format_template_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── palette_init [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_free_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_set_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_alloc_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_blit_stretch [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_draw_text_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_get_font [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── start_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── surface_init_8 [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_number [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (string pool set) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_palette [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wait_for_animation [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [11 FW helper functions hidden]
│   │   ├── popup_add_button [UI] (360B)
│   │   │     > Adds a button to the popup dialog. Allocates a 0x14-byte node from the popup memory pool, links it to the tail of the...
│   │   │     (recursive — already shown above)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│   │   │     (recursive — already shown above)
│   │   ├── select_list_item [UI] (38B)
│   │   │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── show_winner_text [UI] (936B)
│   │   │     > Displays the 3-page winner text from "CENTAURI" section. Formats civ stats and renders with shadow (color 0xf1 instea...
│   │   │   ├── get_civ_noun_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── animate_screen_reveal [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_name [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── manage_window_show [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── mp_format_template_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_blit_stretch [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_get_font [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── start_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_number [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_string [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (string pool set) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wait_for_animation [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [6 FW helper functions hidden]
│   │   ├── text_add_number [UI] (33B)
│   │   │     > Adds a number to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_string [UI] (33B)
│   │   │     > Appends a string to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (stop music) [UI] (31B)
│   │   │     > Stops music playback and sets paused flag.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (string pool set) [UI] (33B)
│   │   │     > Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   │     (recursive — already shown above)
│   │   └── [4 FW helper functions hidden]
│   ├── render_power_graph [UI] (2183B)
│   │     > Renders the Power Graph report. Creates an offscreen bitmap, draws axes with turn labels, then plots power graph line...
│   │   ├── calc_year_from_turn [GL] (540B)
│   │   │     > Calculates the in-game year from a given turn number using the turn-to-year calendar tables (epoch table at DAT_0062c...
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── blit_rect_to_rect [UI] (95B)
│   │   │     > Blits a rectangle from one position to another, both specified by (x, y, w, h).
│   │   │     (recursive — already shown above)
│   │   ├── dialog_create [UI] (588B)
│   │   │     > Creates and initializes a dialog window with title, flags, position, and size. Configures borders, scrollbar, buttons...
│   │   │     (recursive — already shown above)
│   │   ├── dialog_create_buttons [UI] (675B)
│   │   │     > Creates and positions dialog buttons — destroys old buttons, recalculates inner content rectangle, then creates new b...
│   │   │     (recursive — already shown above)
│   │   ├── dialog_ctor [UI] (146B)
│   │   │     > Constructor for dialog class — calls base class constructor, sets vtable, initializes 6 button handle slots to 0.
│   │   │   └── init_sprite_surface_mgr [UI]
│   │   │         (recursive — already shown above)
│   │   ├── draw_border_rect [UI] (61B)
│   │   │     > Draws a bordered rectangle using surface draw function.
│   │   │     (recursive — already shown above)
│   │   ├── draw_colored_rect [UI] (52B)
│   │   │     > Draws a colored rectangle. Sets the draw color then fills the rect.
│   │   │   ├── port_alloc [UI]
│   │   │   │   ├── check_topdown [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── fill_column_8bit [UI]
│   │   │   │   ├── fill_scanline_8bit [UI]
│   │   │   │   ├── get_surface_buffer_handle [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (get surface base) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── FUN_000040FB [??]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   └── unknown (set/get draw color) [UI]
│   │   │         (recursive — already shown above)
│   │   ├── draw_text_at [UI] (42B)
│   │   │     > Draws text at position (param_2, param_3) using the global drawing surface.
│   │   │     (recursive — already shown above)
│   │   ├── fill_surface_from_rect [UI] (71B)
│   │   │     > Fills a rectangular region on a surface with a solid color, reading dimensions from a rect structure.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_background_color [UI] (92B)
│   │   │     > Returns the background color for a civilization based on its leader index.
│   │   ├── load_gif_resource [UI] (847B)
│   │   │     > Loads a GIF image from a resource. Same GIF parsing and LZW decompression as load_gif_file but reads from resource data.
│   │   │     (recursive — already shown above)
│   │   ├── palette_init [UI] (145B)
│   │   │     > Initializes the palette object. Creates palette handle at this+0x404. Zeros fade buffers at this+0x424-0x430.
│   │   │     (recursive — already shown above)
│   │   ├── popup_dialog_create [UI] (93B)
│   │   │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│   │   │     (recursive — already shown above)
│   │   ├── popup_dialog_open [UI] (306B)
│   │   │     > Opens a popup dialog with specified parameters (title, position, dimensions, flags). Initializes or resets the dialog...
│   │   │     (recursive — already shown above)
│   │   ├── port_set_rect [UI] (91B)
│   │   │     > Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │   │     (recursive — already shown above)
│   │   ├── select_list_item [UI] (38B)
│   │   │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (recursive — already shown above)
│   │   ├── set_rect_wh [UI] (48B)
│   │   │     > Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   │     (recursive — already shown above)
│   │   ├── set_text_draw_source [UI] (24B)
│   │   │     > Sets the source font surface for text drawing.
│   │   │     (recursive — already shown above)
│   │   ├── set_text_draw_target [UI] (24B)
│   │   │     > Sets the target surface for text drawing.
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │   │     > Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name. Handles multiplayer tim...
│   │   │   ├── get_civ_adjective_name [GL]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_font_height [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── measure_text_height [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_fill_rect_pattern [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_rect_from_self [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── rect_get_height [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── rect_get_width [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── reset_sprite_scale [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── scale_table_build_primary [UI]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── set_rect_wh [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── tile_bitmap [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── widget_inflate_rect_neg [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── unknown (string pool set) [UI] (33B)
│   │   │     > Calls thunk_FUN_00485208 with DAT_00679640 (global text buffer) and param_1.
│   │   │     (recursive — already shown above)
│   │   └── [12 FW helper functions hidden]
│   ├── show_attitude_dialog [UI] (175B)
│   │     > Opens the Attitude Advisor dialog.
│   │   ├── advisor_create_close_button [UI] (223B)
│   │   │     (recursive — already shown above)
│   │   ├── modal_dialog_run [UI] (283B)
│   │   │     > Runs a modal dialog loop. Pushes current dialog onto a stack (max 16 deep), enters message pump, exits when this+0x8C...
│   │   │     (recursive — already shown above)
│   │   ├── set_active_surface [UI] (74B)
│   │   │     > Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │     (recursive — already shown above)
│   │   ├── show_window_wrapper [UI] (33B)
│   │   │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── show_council_dialog [UI] (119B)
│   │     > Shows the advisor council dialog. Constructs the council window, initializes it with the given government type, and i...
│   │   ├── council_construct [UI] (295B)
│   │   │     > Constructs the council advisor dialog object. Initializes base classes, sub-objects (CStrings at +0x64c and +0x688), ...
│   │   │   ├── init_render_surface [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_sprite_surface_mgr [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── palette_init [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia object initializer) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── council_init [UI] (802B)
│   │   │     > Initializes the advisor council window. Loads the DLL resource, creates the dialog surface, sets up video panels, fin...
│   │   │   ├── council_draw_label [UI]
│   │   │   │   ├── calc_year_from_turn [GL]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_blit_stretch [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_get_font [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_add_string [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_begin [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_begin_bold [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_newline [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (set/get draw color) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (string pool set) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── council_scroll_panel [UI]
│   │   │   │   ├── invalidate_region [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_blit_stretch [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── unknown (sprite blit wrapper 1) [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── create_offscreen_surface_b [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_screen_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pedia_set_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_alloc_rect [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_blit_stretch [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── surface_init_8 [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (GDI operation on pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_palette [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [3 FW helper functions hidden]
│   │   ├── council_play_video [UI] (1122B)
│   │   │     > Plays the full advisor council video sequence. For each of 12 advisors matching the current government, loads backgro...
│   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── animate_screen_reveal [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── council_draw_label [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── council_load_advisor_bg [UI]
│   │   │   │   ├── load_gif_resource [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── palette_init [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── palette_set_entries [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_blit_stretch [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_draw_text_rect [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (palette read entries) [UI]
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── unknown (sprite blit wrapper 1) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unknown (sprite extract with transp + rect params) [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [4 FW helper functions hidden]
│   │   │   ├── council_scroll_down_anim [UI]
│   │   │   │   ├── network_poll [MIXED] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── council_scroll_panel [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── flush_display [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_blit_stretch [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── council_scroll_up_anim [UI]
│   │   │   │   ├── council_scroll_panel [UI]
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── flush_display [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── draw_text_centered [UI]
│   │   │   │   ├── draw_text_with_shadow [UI]
│   │   │   │   │   ├── measure_text_height [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── port_fill_rect_pattern [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (set/get draw color) [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   └── measure_text_height [UI]
│   │   │   │         (recursive — already shown above)
│   │   │   ├── flush_display [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── init_palette_system [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── load_gif_resource [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── manage_window_show [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── modal_dialog_run [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── play_sound_effect [UI] *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── port_set_color [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_text_draw_source [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_text_style [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_window_wrapper [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── start_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── stop_cursor_blink [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (manage pedia window) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unknown (pedia set and display resource) [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   ├── wait_for_animation [UI]
│   │   │   │     (recursive — already shown above)
│   │   │   └── [6 FW helper functions hidden]
│   │   └── [2 FW helper functions hidden]
│   ├── show_dialog_message [UI] (43B)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   └── show_score_dialog [UI] (187B)
│         > Opens the civilisation score dialog with music.
│       ├── advisor_create_close_button [UI] (223B)
│       │     (recursive — already shown above)
│       ├── modal_dialog_run [UI] (283B)
│       │     > Runs a modal dialog loop. Pushes current dialog onto a stack (max 16 deep), enters message pump, exits when this+0x8C...
│       │     (recursive — already shown above)
│       ├── play_music_track [UI] (312B)
│       │     > Plays a specific music track (param_1) with optional restart (param_2). Handles CD audio mode.
│       │     (recursive — already shown above)
│       ├── set_active_surface [UI] (74B)
│       │     > Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│       │     (recursive — already shown above)
│       ├── show_window_wrapper [UI] (33B)
│       │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│       │     (recursive — already shown above)
│       └── [1 FW helper functions hidden]
├── start_turn_timer [MIXED] (280B) *** STATE MUTATION ***
│     > Starts the turn timer — closes open windows, calculates remaining time, creates a 500ms repeating timer, sends MP not...
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │     (recursive — already shown above)
│   ├── credits_invalidate [UI] (27B)
│   │     > Invalidates the credits display to trigger repaint.
│   │     (recursive — already shown above)
│   ├── invalidate_region [UI] (180B)
│   │     > Invalidates a screen region. If param_1 is 0, uses the object's own rect (this+0x24 with clip to this+0x48); otherwis...
│   │     (recursive — already shown above)
│   ├── unknown (dialog_render_title_bar) [UI] (3401B)
│   │     > Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name. Handles multiplayer tim...
│   │     (recursive — already shown above)
│   ├── unknown (pedia_invalidate_cache) [UI] (27B)
│   │     > Forces invalidation of the Civilopedia display cache.
│   │     (recursive — already shown above)
│   ├── unknown (throne room timer/idle handler) [UI] (64B)
│   │     > Idle handler for throne room. If context exists and in phase 0, invalidates the display for animation.
│   │     (recursive — already shown above)
│   ├── get_tick_count_wrapper [FW] (21B)
│   │     > Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   │   └── [1 FW helper functions hidden]
│   ├── timer_start [FW] (157B)
│   │     > Starts a timer. Lazily initializes the timer manager singleton (DAT_00637ef4) if needed, then adds a timer slot.
│   │   └── [2 FW helper functions hidden]
│   ├── timer_stop [FW] (62B)
│   │     > Stops a timer by slot index. If timer manager not initialized, logs error.
│   │   └── [1 FW helper functions hidden]
│   └── FUN_0000994F [??]
│         (recursive — already shown above)
├── stop_turn_timer [MIXED] (174B) *** STATE MUTATION ***
│     > Stops the turn timer — kills timer, updates minimap overlay, sends MP notification if applicable.
│     (recursive — already shown above)
├── unknown (check_retirement_scenario_end) [MIXED] (649B) *** STATE MUTATION ***
│     > Checks for game-ending conditions: retirement at year 2000/2020, scenario end year. Sets DAT_00655af0 |= 2 and DAT_00...
│   ├── get_civ_leader_title [GL] (210B)
│   │     > Returns the leader title for a civilization based on civ type and government. Uses custom title if set.
│   │     (recursive — already shown above)
│   ├── get_civ_noun_name [GL] (145B)
│   │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │     (recursive — already shown above)
│   ├── net_send_message [GL] (6649B) *** STATE MUTATION ***
│   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │     (recursive — already shown above)
│   ├── enqueue_mp_event [MIXED] (398B)
│   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │     (recursive — already shown above)
│   ├── show_dialog_message [UI] (43B)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   └── show_message [UI] (46B)
│         > Stores a message string in the message buffer at the specified slot index.
│         (recursive — already shown above)
├── update_menu_state [MIXED] (3761B)
│     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│     (recursive — already shown above)
├── credits_close [UI] (84B)
│     > Closes the credits display window. Stops animations and destroys the window.
│     (recursive — already shown above)
├── dialog_set_title_impl [UI] (42B)
│     > Implements title setting via CSocket::Create (misidentified by Ghidra — actually a string copy/display operation).
├── draw_status_advisor_icon [UI] (189B)
│     > Draws an advisor icon in the status panel (if unlocked and panel visible).
│   ├── fill_surface_from_rect [UI] (71B)
│   │     > Fills a rectangular region on a surface with a solid color, reading dimensions from a rect structure.
│   │     (recursive — already shown above)
│   ├── flush_display [UI] (21B)
│   │     > Flushes the display buffer by calling FUN_005bbbce.
│   │     (recursive — already shown above)
│   ├── get_civ_background_color [UI] (92B)
│   │     > Returns the background color for a civilization based on its leader index.
│   │     (recursive — already shown above)
│   ├── invalidate_region [UI] (180B)
│   │     > Invalidates a screen region. If param_1 is 0, uses the object's own rect (this+0x24 with clip to this+0x48); otherwis...
│   │     (recursive — already shown above)
│   ├── port_set_rect [UI] (91B)
│   │     > Sets the port's clip rect from param_1 (4 ints), then clips it against the port's bounds rect.
│   │     (recursive — already shown above)
│   └── port_set_rect_from_self [UI] (63B)
│         > Sets the port's clip rect (this+0x14) from its own bounds rect (this+0x24..0x30).
│         (recursive — already shown above)
├── draw_status_panel_header [UI] (1182B)
│     > Draws the status panel header section: civ name, year, treasury, tax/science/luxury rates with graphical bars and res...
│     (recursive — already shown above)
├── mp_set_number_control [UI] (29B) *** STATE MUTATION ***
│     > Sets a numeric control value in the multiplayer dialog number table.
│     (recursive — already shown above)
├── play_sound_effect [UI] (601B) *** STATE MUTATION ***
│     > Plays a sound effect by ID. Looks up sound filename from table, checks for custom sound directory, and plays via Wind...
│     (recursive — already shown above)
├── popup_add_button [UI] (360B)
│     > Adds a button to the popup dialog. Allocates a 0x14-byte node from the popup memory pool, links it to the tail of the...
│     (recursive — already shown above)
├── popup_dialog_create [UI] (93B)
│     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│     (recursive — already shown above)
├── popup_dialog_destroy [UI] (1061B) *** STATE MUTATION ***
│     > Destroys a popup dialog, freeing all associated GDI resources (bitmaps, fonts, etc.) and popping it from the popup st...
│     (recursive — already shown above)
├── popup_dialog_reset [UI] (1299B)
│     > Resets all fields of a popup dialog structure to default values. Initializes counters, positions, colors, margins, bu...
│     (recursive — already shown above)
├── redraw_map_all_players [UI] (124B)
│     > Redraws entire map for all active players.
│     (recursive — already shown above)
├── select_list_item [UI] (38B)
│     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│     (recursive — already shown above)
├── setup_map_status_bar [UI] (304B)
│     > Sets up the map window status bar content: player name, language indicator, and map view filter options.
│   ├── get_civ_name [UI] (28B)
│   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │     (recursive — already shown above)
│   ├── set_status_bar_text [UI] (33B)
│   │     > Sets the status bar text to param_1 using the global string buffer.
│   │     (recursive — already shown above)
│   ├── text_add_label_id [UI] (33B)
│   │     > Appends a localized label (by ID) to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_add_string [UI] (33B)
│   │     > Appends a string to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_begin [UI] (29B)
│   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │     (recursive — already shown above)
│   ├── text_begin_bold [UI] (29B)
│   │     > Begins bold text mode in the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_newline [UI] (29B)
│   │     > Adds a newline to the global text buffer.
│   │     (recursive — already shown above)
│   └── unknown (dialog_set_title_and_redraw) [UI] (139B)
│         > Sets the dialog title string (at offset 0x134, max 0x83 chars) then redraws the title bar and invalidates the rect.
│       ├── invalidate_region [UI] (180B)
│       │     > Invalidates a screen region. If param_1 is 0, uses the object's own rect (this+0x24 with clip to this+0x48); otherwis...
│       │     (recursive — already shown above)
│       └── unknown (dialog_render_title_bar) [UI] (3401B)
│             > Renders a complex dialog title bar with borders, buttons, timer display, and player/civ name. Handles multiplayer tim...
│             (recursive — already shown above)
├── show_dialog_message [UI] (43B)
│     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│     (recursive — already shown above)
├── show_message [UI] (46B)
│     > Stores a message string in the message buffer at the specified slot index.
│     (recursive — already shown above)
├── show_military_advisor_dialog [UI] (333B)
│     > Opens the military advisor dialog. If not already open (DAT_0063e948 < 0), creates it with navigation button; otherwi...
│   ├── create_text_button [UI] (133B)
│   │     > Creates a text button control. Detaches any existing window, sets the button style, creates the button window, and st...
│   │     (recursive — already shown above)
│   ├── rect_get_height [UI] (28B)
│   │     > Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │     (recursive — already shown above)
│   ├── set_active_surface [UI] (74B)
│   │     > Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │     (recursive — already shown above)
│   ├── set_button_click_callback [UI] (33B)
│   │     > Sets the click callback function pointer for a button control.
│   │     (recursive — already shown above)
│   ├── set_button_handler [UI] (45B)
│   │     > Sets a handler callback on the button's window object at offset +0xc0.
│   │     (recursive — already shown above)
│   ├── set_button_owner [UI] (45B)
│   │     > Sets the button's owner/parent reference. Gets the window object via thunk_FUN_0040f810, then stores in_ECX at offset...
│   │     (recursive — already shown above)
│   ├── set_rect_wh [UI] (48B)
│   │     > Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │     (recursive — already shown above)
│   ├── show_window_wrapper [UI] (33B)
│   │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│   │     (recursive — already shown above)
│   ├── get_improvement_name [FW] (92B)
│   │     > Returns a pointer to the Nth string in the string pool. Walks through null-terminated strings in DAT_0063e4c8, skippi...
│   └── rect_offset [FW] (34B)
│         > Wraps Win32 OffsetRect(param_1, param_2, param_3).
├── show_tech_summary_dialog [UI] (339B) *** STATE MUTATION ***
│     > Shows a dialog listing the player's recent tech discoveries (up to 12 most recent techs). Sets multiplayer callback i...
│   ├── civ_has_tech [GL] (181B)
│   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │     (recursive — already shown above)
│   ├── get_civ_noun_name [GL] (145B)
│   │     > Returns the noun name for a civilization (e.g., "Romans"). Uses custom name if set (negative index in name table), ot...
│   │     (recursive — already shown above)
│   ├── get_civ_people_name [GL] (145B)
│   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │     (recursive — already shown above)
│   ├── display_improvement [UI] (33B)
│   │     > Adds an improvement/government icon to the text buffer.
│   │     (recursive — already shown above)
│   ├── show_dialog_message [UI] (43B)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   ├── show_message [UI] (46B)
│   │     > Stores a message string in the message buffer at the specified slot index.
│   │     (recursive — already shown above)
│   ├── text_begin [UI] (29B)
│   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │     (recursive — already shown above)
│   ├── text_newline [UI] (29B)
│   │     > Adds a newline to the global text buffer.
│   │     (recursive — already shown above)
│   └── unknown (string pool append separator) [UI] (29B)
│         > Appends a separator to the string buffer at DAT_00679640 using thunk_FUN_004aef96.
│       └── [1 FW helper functions hidden]
├── unknown (dialog show single param) [UI] (33B)
│     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│     (recursive — already shown above)
└── popcount_byte [FW] (76B)
      > Counts the number of set bits in the low 8 bits of param_1 (population count).
```

---

## Tree: game_loop_mp_client (0x0048BFEC) — MP_C

Reachable: **1** functions (**1** state-mutating) | GL=1

```
game_loop_mp_client [GL] (2530B) *** STATE MUTATION ***
  Summary: Main game loop for MP client mode. Waits for server signals, processes local turns when notified, handles server tran...
```

---

## Tree: game_loop_mp_server (0x0048C9F3) — MP_S

Reachable: **1** functions (**1** state-mutating) | GL=1

```
game_loop_mp_server [GL] (3990B) *** STATE MUTATION ***
  Summary: Main game loop for MP server mode. Orchestrates all player turns, sends turn signals to clients, processes AI civs lo...
```

---

## Tree: human_turn_main_loop (0x0048A416) — HUMAN

Reachable: **1212** functions (**238** state-mutating) | GL=307, AI=26, MIXED=22, UI=546, FW=244, ??=67

```
human_turn_main_loop [GL] (1303B) (also in: SP) *** STATE MUTATION ***
  Summary: Main loop for the human player's turn. Manages unit selection, order processing, waiting for input, and end-of-turn c...
├── ai_diplomacy_negotiate [GL] (16263B) (also in: SP) *** STATE MUTATION ***
│     > The main AI diplomacy negotiation function. Handles all phases of AI-to-AI and AI-to-human diplomatic encounters: gre...
│   ├── adjust_attitude [GL] (107B) (also in: SP) *** STATE MUTATION ***
│   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   ├── get_attitude_raw [GL] (47B) (also in: SP)
│   │   │     > Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   └── set_attitude_value [GL] (120B) (also in: SP) *** STATE MUTATION ***
│   │         > Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100. Skips if multiplayer human player unless...
│   │       └── [1 FW helper functions hidden]
│   ├── calc_attitude [GL] (178B) (also in: SP)
│   │     > Converts a raw attitude value (0-100) into an attitude category (0-8). Pure function with no side effects.
│   ├── calc_gold_to_attitude [GL] (104B) (also in: SP)
│   │     > Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
│   │   └── [1 FW helper functions hidden]
│   ├── calc_patience_threshold [GL] (211B) (also in: SP)
│   │     > Calculates the patience threshold for diplomacy. Returns a value that determines how many diplomatic requests a civ w...
│   │   └── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │         > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │       └── get_wonder_city [GL] (also in: SP)
│   │           └── is_wonder_obsolete [GL] (also in: SP)
│   │               └── civ_has_tech [GL] (also in: SP)
│   │                     (1 more functions reachable)
│   ├── calc_war_readiness [GL] (820B) (also in: SP) *** STATE MUTATION ***
│   │     > Calculates war readiness score for a civ pair. Counts enemy military units near the border, assigns threat levels bas...
│   │   ├── find_unit_stack_at_xy [GL] (231B) (also in: SP)
│   │   │     > Finds the first unit of any civ at map position (param_1, param_2). If DAT_00636058 is set, requires a unit to be vis...
│   │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │   │   │   └── validate_unit_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │       ├── pick_up_unit_005b319e [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │       │     (103 more functions reachable)
│   │   │   │       ├── put_down_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │       │     (104 more functions reachable)
│   │   │   │       ├── sum_stack_property [GL] (also in: SP)
│   │   │   │       │     (1 more functions reachable)
│   │   │   │       └── [2 FW helper functions hidden]
│   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │   └── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   └── get_tile_owner [GL] (also in: SP)
│   │   │   │       ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── is_tile_valid [GL] (also in: SP)
│   │   │   └── validate_unit_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │   │         (recursive — already shown above)
│   │   ├── get_city_owner_at [GL] (111B) (also in: SP)
│   │   │     > Returns the city-owning civ at a tile, or -1. Checks tile improvement bits: if (byte1 & 0x42) == 0x02, it's a city ti...
│   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_owner [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── is_tile_valid [GL] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   ├── get_next_unit_in_stack [GL] (65B) (also in: SP)
│   │   │     > Returns the next unit in the stack linked list, or -1 if at end. Validates stack first.
│   │   │   └── validate_unit_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │   │         (recursive — already shown above)
│   │   ├── get_tile_improvements [GL] (39B) (also in: SP)
│   │   │     > Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_owner_at [GL] (66B) (also in: SP)
│   │   │     > Returns the civ with units at a tile, or -1. Checks if byte1 bit 0 is set (unit present).
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_ocean [GL] (57B) (also in: SP)
│   │   │     > Returns true if terrain type == 10 (ocean).
│   │   │   └── get_tile_terrain_raw [GL] (also in: SP)
│   │   │       └── get_tile_ptr [GL] (also in: SP)
│   │   │             (recursive — already shown above)
│   │   ├── is_tile_valid [GL] (80B) (also in: SP)
│   │   │     > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   └── wrap_x [GL] (94B) (also in: SP)
│   │         > Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   ├── check_can_declare_war [GL] (365B) (also in: SP)
│   │     > Checks if a civ can declare war. Returns 0 if government too low (< Democracy), if scenario prevents it, if random be...
│   │   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │     (recursive — already shown above)
│   ├── civ_has_tech [GL] (181B) (also in: SP)
│   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │     (recursive — already shown above)
│   ├── clear_treaty_flags [GL] (213B) (also in: SP) *** STATE MUTATION ***
│   │     > Clears specified treaty flag bits between two civilizations. Handles cascading flag dependencies: clearing peace (4) ...
│   │   └── clear_treaty_flags [GL] (213B) (also in: SP) *** STATE MUTATION ***
│   │         > Clears specified treaty flag bits between two civilizations. Handles cascading flag dependencies: clearing peace (4) ...
│   │         (recursive — already shown above)
│   ├── diplo_declare_war [GL] (1125B) (also in: SP) *** STATE MUTATION ***
│   │     > Declares war from param_1 against param_2. Handles three cases: already at war (alliance), at peace (break peace), or...
│   │   ├── adjust_attitude [GL] (107B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   │     (recursive — already shown above)
│   │   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── diplo_activate_alliance_wars [GL] (910B) (also in: SP) *** STATE MUTATION ***
│   │   │     > When an alliance is activated, makes all allies of the aggressor declare war on the target. Adjusts attitudes and set...
│   │   │   ├── adjust_attitude [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_people_name [GL] (also in: SP)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── clear_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │         (recursive — already shown above)
│   │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │   │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   ├── diff_engine_serialize_changed_only [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (13 more functions reachable)
│   │   │   │   │   ├── diff_engine_serialize_full_compressed [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (12 more functions reachable)
│   │   │   │   │   ├── diff_engine_serialize_game [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (12 more functions reachable)
│   │   │   │   │   ├── diff_engine_serialize_partial [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (12 more functions reachable)
│   │   │   │   │   ├── net_broadcast [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (5 more functions reachable)
│   │   │   │   │   ├── net_msg_init_header [GL] (also in: SP)
│   │   │   │   │   ├── net_msg_init_with_name [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── net_msg_init_with_version [GL]
│   │   │   │   │   ├── net_send_to_player [GL] *** STATE MUTATION ***
│   │   │   │   │   │     (14 more functions reachable)
│   │   │   │   │   ├── netmgr_build_packet [GL]
│   │   │   │   │   ├── unknown (init chat/popup message) [GL]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── unknown (init type-0x13 message) [GL]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── unknown (init type-0x69 message) [GL]
│   │   │   │   │   ├── unknown (init type-4 message) [GL]
│   │   │   │   │   ├── unknown (init type-6 message) [GL]
│   │   │   │   │   ├── unknown (init version message) [GL]
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── invalidate_region [UI] (also in: SP)
│   │   │   │   │   │     (17 more functions reachable)
│   │   │   │   │   ├── unknown (dialog_render_title_bar) [UI] (also in: SP)
│   │   │   │   │   │     (46 more functions reachable)
│   │   │   │   │   └── [3 FW helper functions hidden]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── show_dialog_message [UI] (also in: SP)
│   │   │   │   └── FUN_0051D564 [??] (also in: SP)
│   │   │   └── show_message [UI] (also in: SP)
│   │   │       └── [1 FW helper functions hidden]
│   │   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │   │     (recursive — already shown above)
│   │   └── break_alliance [MIXED] (632B) (also in: SP) *** STATE MUTATION ***
│   │         > Breaks an alliance between two civs. Clears alliance flag, recalls units from each other's territory, shows notificat...
│   │       ├── civ_has_active_wonder [GL] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       ├── clear_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── get_civ_people_name [GL] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       ├── recall_units_from_territory [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   ├── calc_movement_cost [GL] (also in: SP)
│   │       │   │   ├── diagonal_movement_cost [GL] (also in: SP)
│   │       │   │   └── distance_x_wrapped [GL] (also in: SP)
│   │       │   ├── city_adjacent_to_continent [GL] (also in: SP)
│   │       │   │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── wrap_x [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── find_nearest_city [GL] (also in: SP)
│   │       │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_continent_if_land [GL] (also in: SP)
│   │       │   │   ├── has_building [GL] (also in: SP)
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   └── is_tile_valid [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── relocate_all_units [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (13 more functions reachable)
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │         (4 more functions reachable)
│   │       │   └── stack_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── load_unit_onto_ship [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (14 more functions reachable)
│   │       │       ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │       ├── show_dialog_message [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       └── [2 FW helper functions hidden]
│   │       ├── get_civ_name [UI] (also in: SP)
│   │       │   └── get_civ_adjective_name [GL] (also in: SP)
│   │       │       └── [1 FW helper functions hidden]
│   │       ├── redraw_map_all_players [UI] (also in: SP)
│   │       │   └── redraw_entire_map [UI] (also in: SP) *** STATE MUTATION ***
│   │       │       ├── begin_end_paint_cycle [UI]
│   │       │       │     (35 more functions reachable)
│   │       │       ├── dialog_create_buttons [UI] (also in: SP)
│   │       │       │     (47 more functions reachable)
│   │       │       ├── minimap_full_redraw [UI]
│   │       │       │     (64 more functions reachable)
│   │       │       ├── recalc_viewport_geometry [UI]
│   │       │       │     (47 more functions reachable)
│   │       │       ├── redraw_full_viewport [UI]
│   │       │       │     (137 more functions reachable)
│   │       │       ├── unknown (dialog_render_title_bar) [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       └── [1 FW helper functions hidden]
│   │       ├── show_dialog_message [UI] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       ├── show_message [UI] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       ├── text_add_string [UI] (also in: SP)
│   │       │   └── [1 FW helper functions hidden]
│   │       └── text_begin [UI] (also in: SP)
│   │           └── [1 FW helper functions hidden]
│   ├── diplo_form_alliance [GL] (374B) (also in: SP) *** STATE MUTATION ***
│   │     > Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), resets patience counter,...
│   │   ├── adjust_attitude [GL] (107B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   │     (recursive — already shown above)
│   │   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │   │     (recursive — already shown above)
│   │   ├── ai_evaluate_diplomacy [AI] (6616B) (also in: SP) *** STATE MUTATION ***
│   │   │     > The core AI diplomacy evaluation function. Computes all diplomacy decision variables: military threat, demand amount,...
│   │   │   ├── calc_attitude [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── civ_has_active_wonder [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── clear_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_nearest_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── calc_movement_cost [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── has_spaceship_launched [GL] (also in: SP)
│   │   │   ├── should_declare_war [GL] (also in: SP)
│   │   │   │   └── get_attitude_raw [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── ai_choose_government [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── ai_revolution_notification [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   ├── civ_has_active_wonder [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_adjective_name [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_civ_leader_title [GL] (also in: SP)
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── get_civ_noun_name [GL] (also in: SP)
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_government_type [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   │     (384 more functions reachable)
│   │   │   │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── revolution_dialog [MIXED] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   │     (334 more functions reachable)
│   │   │   │   │   ├── mp_set_string_control [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── show_dialog_message [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── show_message [UI] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   └── check_govt_available [GL]
│   │   │   │       ├── civ_has_active_wonder [GL] (also in: SP)
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── civ_has_tech [GL] (also in: SP)
│   │   │   │             (recursive — already shown above)
│   │   │   ├── spaceship_ai_should_start [AI] (also in: SP)
│   │   │   │   ├── civ_has_tech [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_spaceship_launched [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── spaceship_is_enabled [GL] (also in: SP)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   └── [1 FW helper functions hidden]
│   │   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   │   ├── calc_attitude [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── display_improvement [UI] (also in: SP)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── get_civ_name [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_add_string [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── text_begin [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── text_newline [UI] (also in: SP)
│   │   │       └── [1 FW helper functions hidden]
│   │   ├── get_civ_name [UI] (28B) (also in: SP)
│   │   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (recursive — already shown above)
│   │   ├── intel_play_animation [UI] (181B) (also in: SP)
│   │   │     > Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │   │   └── intel_play_video_frame [UI] (also in: SP)
│   │   │       ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │   │       │   ├── rng_range [GL] (also in: SP) *** STATE MUTATION ***
│   │   │       │   │     (1 more functions reachable)
│   │   │       │   ├── flush_display [UI] (also in: SP)
│   │   │       │   │     (34 more functions reachable)
│   │   │       │   └── [10 FW helper functions hidden]
│   │   │       └── [2 FW helper functions hidden]
│   │   ├── show_dialog_message [UI] (43B) (also in: SP)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   └── show_message [UI] (46B) (also in: SP)
│   │         > Stores a message string in the message buffer at the specified slot index.
│   │         (recursive — already shown above)
│   ├── diplo_reset_state [GL] (61B) (also in: SP) *** STATE MUTATION ***
│   │     > Resets all diplomacy session state variables to their default values and closes the intelligence advisor.
│   │   └── intel_close_advisor [UI] (166B) (also in: SP)
│   │         > Closes the intelligence advisor. Tears down display, frees object, stops music.
│   │       ├── intel_delete_object [UI] (also in: SP)
│   │       │   └── intel_destroy_object [UI]
│   │       │       └── [7 FW helper functions hidden]
│   │       ├── intel_teardown_display [UI] (also in: SP)
│   │       │   ├── init_palette_system [UI] (also in: SP)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── pedia_free_resource [UI] (also in: SP)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── save_and_flush [UI] (also in: SP)
│   │       │   │   ├── flush_at_origin [UI] (also in: SP)
│   │       │   │   │     (24 more functions reachable)
│   │       │   │   └── swap_dc [UI] (also in: SP)
│   │       │   │         (1 more functions reachable)
│   │       │   ├── swap_dc [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── unknown (manage pedia window) [UI] (also in: SP)
│   │       │   │   └── FUN_0000C44D [??] (also in: SP)
│   │       │   ├── unknown (pedia set and display resource) [UI] (also in: SP)
│   │       │   │   └── unknown (update pedia display surface) [UI] (also in: SP)
│   │       │   │         (1 more functions reachable)
│   │       │   ├── unknown (set popup parent A) [UI] (also in: SP)
│   │       │   ├── unknown (set popup parent B) [UI]
│   │       │   └── unknown (set popup position) [UI] (also in: SP)
│   │       ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── resume_music [UI] (also in: SP)
│   │       │   ├── select_random_music_track [UI]
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   └── unknown (stop music) [UI] (also in: SP)
│   │       │       └── [1 FW helper functions hidden]
│   │       └── wait_for_animation [UI] (also in: SP)
│   │           ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │           │     (recursive — already shown above)
│   │           └── flush_display [UI] (also in: SP)
│   │                 (recursive — already shown above)
│   ├── diplo_sign_ceasefire [GL] (315B) (also in: SP) *** STATE MUTATION ***
│   │     > Signs a ceasefire — sets treaty flags 0x4002, clears mobilization flag 0x40000, clamps attitude, records turn, clears...
│   │   ├── clear_treaty_flags [GL] (213B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Clears specified treaty flag bits between two civilizations. Handles cascading flag dependencies: clearing peace (4) ...
│   │   │     (recursive — already shown above)
│   │   ├── get_attitude_raw [GL] (47B) (also in: SP)
│   │   │     > Returns the raw attitude value of civ param_1 toward civ param_2.
│   │   │     (recursive — already shown above)
│   │   ├── set_attitude_value [GL] (120B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100. Skips if multiplayer human player unless...
│   │   │     (recursive — already shown above)
│   │   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │   │     (recursive — already shown above)
│   │   ├── ai_evaluate_diplomacy [AI] (6616B) (also in: SP) *** STATE MUTATION ***
│   │   │     > The core AI diplomacy evaluation function. Computes all diplomacy decision variables: military threat, demand amount,...
│   │   │     (recursive — already shown above)
│   │   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_name [UI] (28B) (also in: SP)
│   │   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (recursive — already shown above)
│   │   ├── intel_play_animation [UI] (181B) (also in: SP)
│   │   │     > Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │   │     (recursive — already shown above)
│   │   ├── show_dialog_message [UI] (43B) (also in: SP)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B) (also in: SP)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── event_check_negotiation [GL] (900B) (also in: SP) *** STATE MUTATION ***
│   │     > Checks all events for NEGOTIATION triggers. Complex matching of talker/listener by civ and human/computer type. In mu...
│   │   └── event_dispatch_actions [GL] (360B) (also in: SP) *** STATE MUTATION ***
│   │         > Dispatches all actions for a triggered event. Checks action flags in the event node and calls appropriate action hand...
│   │       ├── event_action_change_money [GL] *** STATE MUTATION ***
│   │       ├── event_action_change_terrain [GL] *** STATE MUTATION ***
│   │       │   ├── city_update_tile_workers [GL] *** STATE MUTATION ***
│   │       │   │   ├── begin_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── end_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── get_tile_fertility [GL] (also in: SP)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***
│   │       │   │   │     (9 more functions reachable)
│   │       │   │   ├── set_tile_fertility [GL] *** STATE MUTATION ***
│   │       │   │   │     (9 more functions reachable)
│   │       │   │   └── wrap_x [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── delete_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── pick_up_unit_005b319e [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── FUN_0000C494 [??] (also in: SP)
│   │       │   │   ├── FUN_0000C679 [??] (also in: SP)
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   ├── find_city_at [GL] (also in: SP)
│   │       │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── is_tile_valid [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── kill_or_retire_civ [GL] *** STATE MUTATION ***
│   │       │   │   ├── begin_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_unit_safely [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (4 more functions reachable)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── end_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_city_radius_owner [GL] (also in: SP)
│   │       │   │   ├── get_tile_controller [GL] (also in: SP)
│   │       │   │   ├── get_tile_fertility [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── remove_trade_route [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── reset_spaceship [GL] *** STATE MUTATION ***
│   │       │   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_tile_fertility [GL] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (9 more functions reachable)
│   │       │   │   ├── set_tile_visibility_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (9 more functions reachable)
│   │       │   │   ├── spy_diplomat_action [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (110 more functions reachable)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── redraw_map_all_players [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (stop music) [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   ├── update_civ_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── set_civ_tile_data [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │         (10 more functions reachable)
│   │       │   ├── redraw_map_all_players [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   └── update_tile_all_players [UI] (also in: SP)
│   │       │       └── update_map_tile [UI] (also in: SP)
│   │       │             (105 more functions reachable)
│   │       ├── event_action_create_unit [GL] *** STATE MUTATION ***
│   │       │   ├── create_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │       │   │   │     (2 more functions reachable)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_nearest_city [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── process_unit_move_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (586 more functions reachable)
│   │       │   │   ├── put_down_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (tutorial_show_advice) [UI] (also in: SP)
│   │       │   │   │     (288 more functions reachable)
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   ├── find_city_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   └── is_tile_valid [GL] (also in: SP)
│   │       │         (recursive — already shown above)
│   │       ├── event_action_destroy_civ [GL] *** STATE MUTATION ***
│   │       │   └── kill_or_retire_civ [GL] *** STATE MUTATION ***
│   │       │         (recursive — already shown above)
│   │       ├── event_action_flag_no_schism [GL] *** STATE MUTATION ***
│   │       ├── event_action_give_tech [GL] *** STATE MUTATION ***
│   │       │   └── handle_tech_discovery [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       ├── bit_index_to_byte_mask [GL] (also in: SP)
│   │       │       ├── civ_has_tech [GL] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── diplo_reset_state [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── get_civ_people_name [GL] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── get_wonder_owner [GL]
│   │       │       ├── handle_tech_discovery [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── handle_tech_government_effects [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (1 more functions reachable)
│   │       │       ├── has_building [GL] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── rng_range [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── set_building [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       ├── upgrade_units_for_tech [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (2 more functions reachable)
│   │       │       ├── we_love_the_king_day [GL] (also in: SP)
│   │       │       │     (2 more functions reachable)
│   │       │       ├── diplo_ai_emissary [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (355 more functions reachable)
│   │       │       ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── dialog_set_title [UI] (also in: SP)
│   │       │       │     (1 more functions reachable)
│   │       │       ├── display_improvement [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── draw_status_panel_header [UI] (also in: SP)
│   │       │       │     (70 more functions reachable)
│   │       │       ├── format_enabled_item [UI]
│   │       │       │     (15 more functions reachable)
│   │       │       ├── pedia_select_entry [UI] (also in: SP)
│   │       │       │     (142 more functions reachable)
│   │       │       ├── popup_add_button [UI] (also in: SP)
│   │       │       │     (16 more functions reachable)
│   │       │       ├── popup_add_edit_field [UI] (also in: SP)
│   │       │       │     (12 more functions reachable)
│   │       │       ├── popup_dialog_close [UI] (also in: SP)
│   │       │       │     (56 more functions reachable)
│   │       │       ├── popup_dialog_create [UI] (also in: SP)
│   │       │       │     (25 more functions reachable)
│   │       │       ├── popup_set_scaled_width [UI] (also in: SP)
│   │       │       ├── select_list_item [UI] (also in: SP)
│   │       │       │     (253 more functions reachable)
│   │       │       ├── set_improvement_name_string [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── text_add_label_id [UI] (also in: SP)
│   │       │       │     (4 more functions reachable)
│   │       │       ├── text_add_string [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── text_begin [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── text_end_italic [UI] (also in: SP)
│   │       │       │     (2 more functions reachable)
│   │       │       ├── text_newline [UI] (also in: SP)
│   │       │       │     (recursive — already shown above)
│   │       │       ├── unknown (dialog show single param) [UI] (also in: SP)
│   │       │       │     (4 more functions reachable)
│   │       │       ├── unknown (show tech help) [UI]
│   │       │       │     (1 more functions reachable)
│   │       │       └── [1 FW helper functions hidden]
│   │       ├── event_action_make_aggression [GL] *** STATE MUTATION ***
│   │       │   └── diplomacy_check_treaty_violation [GL] *** STATE MUTATION ***
│   │       │       ├── clear_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── diplo_declare_war [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       ├── set_attitude_value [GL] (also in: SP) *** STATE MUTATION ***
│   │       │       │     (recursive — already shown above)
│   │       │       └── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │             (recursive — already shown above)
│   │       ├── event_action_move_unit [GL] *** STATE MUTATION ***
│   │       │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   └── is_tile_valid [GL] (also in: SP)
│   │       │         (recursive — already shown above)
│   │       ├── event_action_play_cd [UI]
│   │       │   ├── play_music_track [UI] (also in: SP)
│   │       │   │   ├── unknown (stop music) [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [4 FW helper functions hidden]
│   │       │   └── [2 FW helper functions hidden]
│   │       ├── event_action_play_sound [UI]
│   │       │   └── [4 FW helper functions hidden]
│   │       └── event_action_show_text [UI] *** STATE MUTATION ***
│   │           ├── enqueue_mp_event [MIXED] (also in: SP)
│   │           │     (recursive — already shown above)
│   │           ├── popup_add_edit_field [UI] (also in: SP)
│   │           │     (recursive — already shown above)
│   │           ├── select_list_item [UI] (also in: SP)
│   │           │     (recursive — already shown above)
│   │           └── [2 FW helper functions hidden]
│   ├── get_attitude_raw [GL] (47B) (also in: SP)
│   │     > Returns the raw attitude value of civ param_1 toward civ param_2.
│   │     (recursive — already shown above)
│   ├── get_civ_people_name [GL] (145B) (also in: SP)
│   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │     (recursive — already shown above)
│   ├── handle_tech_discovery [GL] (3391B) (also in: SP) *** STATE MUTATION ***
│   │     > Master handler for when a civilization discovers a new technology. This is one of the most important game logic funct...
│   │     (recursive — already shown above)
│   ├── has_spaceship_launched [GL] (47B) (also in: SP)
│   │     > Returns whether civ param_1's spaceship has launched (bit 1 of status byte).
│   │     (recursive — already shown above)
│   ├── rng_range [GL] (113B) (also in: SP) *** STATE MUTATION ***
│   │     > Returns a random integer in the range [param_1, param_2]. If param_1 == param_2, just advances the RNG and returns pa...
│   │     (recursive — already shown above)
│   ├── set_attitude_value [GL] (120B) (also in: SP) *** STATE MUTATION ***
│   │     > Sets the attitude value of civ param_1 toward civ param_2, clamped to 0-100. Skips if multiplayer human player unless...
│   │     (recursive — already shown above)
│   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │     (recursive — already shown above)
│   ├── should_declare_war [GL] (191B) (also in: SP)
│   │     > Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │     (recursive — already shown above)
│   ├── unknown (set trade route value) [GL] (29B) (also in: SP) *** STATE MUTATION ***
│   │     > Stores a value into the trade route table at index param_1.
│   ├── ai_calc_tech_value [AI] (2869B) (also in: SP)
│   │     > Calculates the AI's perceived value of researching a specific technology. Considers: tech epoch, exclusivity (whether...
│   │   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── civ_has_tech [GL] (181B) (also in: SP)
│   │   │     > Checks if a civilization (param_1) has a specific technology (param_2). Returns 1 if yes, 0 if no. Handles special ca...
│   │   │     (recursive — already shown above)
│   │   ├── get_wonder_city [GL] (57B) (also in: SP)
│   │   │     > Returns the city index that owns a wonder, or -1 if the wonder is obsolete.
│   │   │     (recursive — already shown above)
│   │   ├── tech_is_descendant_of [GL] (135B) (also in: SP)
│   │   │     > Recursively checks if technology param_1 is a descendant of technology param_2 in the tech tree. Returns 1 if param_1...
│   │   │   └── tech_is_descendant_of [GL] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── ai_evaluate_diplomacy [AI] (6616B) (also in: SP) *** STATE MUTATION ***
│   │     > The core AI diplomacy evaluation function. Computes all diplomacy decision variables: military threat, demand amount,...
│   │     (recursive — already shown above)
│   ├── diplo_ai_emissary [MIXED] (880B) (also in: SP) *** STATE MUTATION ***
│   │     > Handles the AI emissary arrival event — shows greeting, handles nuclear threats, and manages the diplomacy dialog flo...
│   │     (recursive — already shown above)
│   ├── diplo_ai_negotiate [MIXED] (10271B) (also in: SP) *** STATE MUTATION ***
│   │     > The enormous (10KB) AI negotiation engine. Handles cases 1 (alliance request), 2 (peace request), 3-5 (tribute/ceasef...
│   │   ├── adjust_attitude [GL] (107B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Adjusts the attitude value between two civs by a delta. Also updates the active diplomacy session's attitude if appli...
│   │   │     (recursive — already shown above)
│   │   ├── calc_attitude [GL] (178B) (also in: SP)
│   │   │     > Converts a raw attitude value (0-100) into an attitude category (0-8). Pure function with no side effects.
│   │   │     (recursive — already shown above)
│   │   ├── calc_gold_to_attitude [GL] (104B) (also in: SP)
│   │   │     > Converts a gold amount to an attitude adjustment value using a diminishing returns formula.
│   │   │     (recursive — already shown above)
│   │   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── diplo_declare_war [GL] (1125B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Declares war from param_1 against param_2. Handles three cases: already at war (alliance), at peace (break peace), or...
│   │   │     (recursive — already shown above)
│   │   ├── diplo_form_alliance [GL] (374B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Forms an alliance between two civs — adjusts attitude by -25, sets treaty flag 8 (alliance), resets patience counter,...
│   │   │     (recursive — already shown above)
│   │   ├── diplo_sign_peace_treaty [GL] (253B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Signs a peace treaty — sets treaty flags 0x4004 (peace + contact), clamps attitude to 0-50 range, resets patience.
│   │   │   ├── get_attitude_raw [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_attitude_value [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_evaluate_diplomacy [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── diplo_show_attitude_header [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_civ_name [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── intel_play_animation [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_dialog_message [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── show_message [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── [1 FW helper functions hidden]
│   │   ├── handle_tech_discovery [GL] (3391B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Master handler for when a civilization discovers a new technology. This is one of the most important game logic funct...
│   │   │     (recursive — already shown above)
│   │   ├── rng_range [GL] (113B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Returns a random integer in the range [param_1, param_2]. If param_1 == param_2, just advances the RNG and returns pa...
│   │   │     (recursive — already shown above)
│   │   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │   │     (recursive — already shown above)
│   │   ├── should_declare_war [GL] (191B) (also in: SP)
│   │   │     > Determines whether civ param_1 should declare war on civ param_2, based on treaty state and attitude.
│   │   │     (recursive — already shown above)
│   │   ├── ai_calc_tech_value [AI] (2869B) (also in: SP)
│   │   │     > Calculates the AI's perceived value of researching a specific technology. Considers: tech epoch, exclusivity (whether...
│   │   │     (recursive — already shown above)
│   │   ├── break_alliance [MIXED] (632B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Breaks an alliance between two civs. Clears alliance flag, recalls units from each other's territory, shows notificat...
│   │   │     (recursive — already shown above)
│   │   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_name [UI] (28B) (also in: SP)
│   │   │     > Thunk wrapper that calls FUN_00493d13 with param_1 to retrieve a civilization name string.
│   │   │     (recursive — already shown above)
│   │   ├── intel_play_animation [UI] (181B) (also in: SP)
│   │   │     > Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │   │     (recursive — already shown above)
│   │   ├── mp_set_number_control [UI] (29B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets a numeric control value in the multiplayer dialog number table.
│   │   ├── refresh_status_panel [UI] (297B) (also in: SP)
│   │   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │   ├── calc_status_panel_layout [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── draw_status_panel_units [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_tile_goody_hut [GL] (also in: SP)
│   │   │   │   │   ├── get_tile_owner [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── is_tile_valid [GL] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── check_tile_resource [GL] (also in: SP)
│   │   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── is_tile_valid [GL] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_vis_ptr [GL] (also in: SP)
│   │   │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_home_city_name [GL] (also in: SP)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── sum_stack_property [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_coordinate_text [UI] (also in: SP)
│   │   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── draw_text_at [UI] (also in: SP)
│   │   │   │   │   │     (11 more functions reachable)
│   │   │   │   │   ├── text_add_label_id [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_number [UI] (also in: SP)
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_begin [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin_bold [UI] (also in: SP)
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_begin_italic [UI] (also in: SP)
│   │   │   │   │   │     (2 more functions reachable)
│   │   │   │   │   ├── text_end_italic [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_newline [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (string pool append separator) [UI] (also in: SP)
│   │   │   │   │         (2 more functions reachable)
│   │   │   │   ├── draw_status_panel_header [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── draw_status_turn_info [UI] (also in: SP)
│   │   │   │   │   ├── draw_text_at [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── flush_display [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_font_height [UI] (also in: SP)
│   │   │   │   │   ├── invalidate_region [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── measure_text_height [UI] (also in: SP)
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── port_set_rect [UI] (also in: SP)
│   │   │   │   │   ├── port_set_rect_from_self [UI] (also in: SP)
│   │   │   │   │   ├── rect_get_height [UI] (also in: SP)
│   │   │   │   │   ├── rect_get_width [UI] (also in: SP)
│   │   │   │   │   ├── set_text_draw_source [UI] (also in: SP)
│   │   │   │   │   ├── set_text_draw_target [UI] (also in: SP)
│   │   │   │   │   ├── set_text_style [UI] (also in: SP)
│   │   │   │   │   ├── text_add_label_id [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── tile_bitmap [UI] (also in: SP)
│   │   │   │   │         (12 more functions reachable)
│   │   │   │   ├── draw_text_centered [UI] (also in: SP)
│   │   │   │   │   └── draw_text_centered [UI] (also in: SP)
│   │   │   │   │         (8 more functions reachable)
│   │   │   │   ├── draw_unit [UI] (also in: SP)
│   │   │   │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_max_hp [GL] (also in: SP)
│   │   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── fill_surface_from_rect [UI] (also in: SP)
│   │   │   │   │   │     (9 more functions reachable)
│   │   │   │   │   ├── get_civ_background_color [UI] (also in: SP)
│   │   │   │   │   ├── get_civ_dark_color [UI]
│   │   │   │   │   ├── port_copy_rect [UI]
│   │   │   │   │   │     (8 more functions reachable)
│   │   │   │   │   ├── port_fill_rect_pattern [UI] (also in: SP)
│   │   │   │   │   │     (6 more functions reachable)
│   │   │   │   │   ├── rect_get_height [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── rect_get_width [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── reset_sprite_scale [UI] (also in: SP)
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── scale_sprite [UI] (also in: SP)
│   │   │   │   │   ├── select_display_unit [UI] (also in: SP)
│   │   │   │   │   ├── set_rect_wh [UI] (also in: SP)
│   │   │   │   │   ├── set_sprite_scale [UI] (also in: SP)
│   │   │   │   │   │     (3 more functions reachable)
│   │   │   │   │   ├── set_unit_font_for_zoom [UI] *** STATE MUTATION ***
│   │   │   │   │   │     (7 more functions reachable)
│   │   │   │   │   ├── unknown (set/get draw color) [UI] (also in: SP)
│   │   │   │   │   ├── unknown (sprite blit wrapper 1) [UI] (also in: SP)
│   │   │   │   │   │     (10 more functions reachable)
│   │   │   │   │   ├── unknown (sprite blit wrapper 10) [UI]
│   │   │   │   │   │     (10 more functions reachable)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── format_unit_orders_text [UI] (also in: SP)
│   │   │   │   │   ├── find_city_at [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── display_improvement [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_label_id [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_number [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_add_string [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_begin_italic [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_end_italic [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── text_newline [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── unknown (string pool append separator) [UI] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── get_civ_name [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_font_height [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── measure_text_height [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_set_rect [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── port_set_rect_from_self [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rect_get_width [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scale_sprite [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── select_display_unit [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_status_bar_text [UI] (also in: SP)
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── set_text_draw_source [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_text_style [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── text_add_label_id [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── text_begin [UI] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── invalidate_region [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── prepare_surface [UI] (also in: SP)
│   │   │   ├── rect_get_height [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── rect_get_width [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── tile_bitmap [UI] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   ├── set_improvement_name_string [UI] (41B) (also in: SP)
│   │   │     > Sets a dialog string control to an improvement/building name. Looks up the name from the string pool by param_2 index...
│   │   │     (recursive — already shown above)
│   │   ├── show_dialog_message [UI] (43B) (also in: SP)
│   │   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B) (also in: SP)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_number [UI] (33B) (also in: SP)
│   │   │     > Adds a number to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_add_string [UI] (33B) (also in: SP)
│   │   │     > Appends a string to the global text buffer.
│   │   │     (recursive — already shown above)
│   │   ├── text_begin [UI] (29B) (also in: SP)
│   │   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (dialog show single param) [UI] (33B) (also in: SP)
│   │   │     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── diplo_favor_menu [MIXED] (4878B) (also in: SP) *** STATE MUTATION ***
│   │     > Handles the "favor menu" in diplomacy — options include tech exchange, declaring war on a third party, and sharing ma...
│   │   ├── begin_map_batch [GL] (86B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Begins a batched map update session for multiplayer. Disables immediate sending and enables queuing.
│   │   │     (recursive — already shown above)
│   │   ├── calc_patience_threshold [GL] (211B) (also in: SP)
│   │   │     > Calculates the patience threshold for diplomacy. Returns a value that determines how many diplomatic requests a civ w...
│   │   │     (recursive — already shown above)
│   │   ├── city_set_specialist_slot [GL] (126B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets a specialist slot in a city record: sets the bit in the specialist bitfield and records the city size at that slot.
│   │   ├── diff_engine_scan_and_send [GL] (1883B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │   │     (recursive — already shown above)
│   │   ├── end_map_batch [GL] (194B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Ends a batched map update. If queued updates exist (DAT_006365f4 > 1), sends them as a batch packet (0x59) and flushe...
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B) (also in: SP)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_vis_ptr [GL] (48B) (also in: SP)
│   │   │     > Returns pointer to a civ's visibility byte for a tile. Formula: civ_vis_base[civ] + (width/2) * y + x/2.
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_ptr [GL] (90B) (also in: SP)
│   │   │     > Returns pointer to 6-byte tile data for map position (param_1, param_2). Returns pointer to dummy tile if coordinates...
│   │   │     (recursive — already shown above)
│   │   ├── net_send_message [GL] (6649B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │   │     (recursive — already shown above)
│   │   ├── set_civ_tile_data [GL] (325B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets a civ's tile visibility byte. Can either overwrite or OR with existing value. MP notification 0x97.
│   │   │     (recursive — already shown above)
│   │   ├── set_tile_visibility_bits [GL] (330B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets or clears visibility bits (byte 4) on a tile. Sends MP notification (0x92) if changed.
│   │   │     (recursive — already shown above)
│   │   ├── set_treaty_flags [GL] (223B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets specified treaty flag bits between two civilizations. Handles cascading: setting alliance (8) also sets peace (4...
│   │   │     (recursive — already shown above)
│   │   ├── enqueue_mp_event [MIXED] (398B) (also in: SP)
│   │   │     > Enqueues a multiplayer event message. If MP mode (DAT_00655b02 > 2), serializes string list and integer list into a b...
│   │   │     (recursive — already shown above)
│   │   ├── dialog_set_title [UI] (41B) (also in: SP)
│   │   │     > Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │     (recursive — already shown above)
│   │   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   │     (recursive — already shown above)
│   │   ├── intel_play_animation [UI] (181B) (also in: SP)
│   │   │     > Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │   │     (recursive — already shown above)
│   │   ├── mp_set_number_control [UI] (29B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Sets a numeric control value in the multiplayer dialog number table.
│   │   │     (recursive — already shown above)
│   │   ├── redraw_map_all_players [UI] (124B) (also in: SP)
│   │   │     > Redraws entire map for all active players.
│   │   │     (recursive — already shown above)
│   │   ├── select_list_item [UI] (38B) (also in: SP)
│   │   │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (recursive — already shown above)
│   │   ├── set_improvement_name_string [UI] (41B) (also in: SP)
│   │   │     > Sets a dialog string control to an improvement/building name. Looks up the name from the string pool by param_2 index...
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B) (also in: SP)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   ├── unknown (dialog show single param) [UI] (33B) (also in: SP)
│   │   │     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │   │     (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── diplo_check_war_weariness [UI] (178B) (also in: SP)
│   │     > Shows a "hawks want to continue the war" or "UN urges peace" dialog if conditions are met. Pure UI display.
│   │   ├── civ_has_active_wonder [GL] (142B) (also in: SP)
│   │   │     > Checks whether a specific civ (param_1) has an active (non-obsolete) wonder (param_2). Returns 1 if yes, 0 if no.
│   │   │     (recursive — already shown above)
│   │   ├── get_civ_people_name [GL] (145B) (also in: SP)
│   │   │     > Returns the people name for a civilization (e.g., "Roman"). Uses custom name if set.
│   │   │     (recursive — already shown above)
│   │   ├── show_message [UI] (46B) (also in: SP)
│   │   │     > Stores a message string in the message buffer at the specified slot index.
│   │   │     (recursive — already shown above)
│   │   └── unknown (dialog show single param) [UI] (33B) (also in: SP)
│   │         > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │         (recursive — already shown above)
│   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │     (recursive — already shown above)
│   ├── diplo_show_main_menu [UI] (747B) (also in: SP)
│   │     > Shows the main diplomacy menu with options like exchange, peace, ceasefire, alliance, withdraw troops, cancel allianc...
│   │   ├── dialog_set_title [UI] (41B) (also in: SP)
│   │   │     > Sets dialog title by calling thunk_FUN_0043ca10 with DAT_006359d4 and param_1.
│   │   │     (recursive — already shown above)
│   │   ├── diplo_show_attitude_header [UI] (118B) (also in: SP)
│   │   │     > Displays the diplomacy header showing the AI's attitude and the civ name.
│   │   │     (recursive — already shown above)
│   │   ├── popup_add_radio_option [UI] (566B) (also in: SP)
│   │   │     > Adds a radio button option to the popup dialog. Allocates a 0x18-byte doubly-linked node. If flag 0x80 is set, insert...
│   │   │   ├── measure_text_height [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── popup_get_button_width [UI]
│   │   │   └── [2 FW helper functions hidden]
│   │   ├── popup_dialog_create [UI] (93B) (also in: SP)
│   │   │     > Creates a new popup dialog object. Initializes base class, resets all fields, and sets up the list control with param...
│   │   │     (recursive — already shown above)
│   │   ├── select_list_item [UI] (38B) (also in: SP)
│   │   │     > Selects a list item in the current dialog, with index 0 and param_1 as a flag.
│   │   │     (recursive — already shown above)
│   │   └── [3 FW helper functions hidden]
│   ├── intel_play_animation [UI] (181B) (also in: SP)
│   │     > Plays an animation frame in the intel advisor (for param types 2, 3, 4). Validates frame range before playing.
│   │     (recursive — already shown above)
│   ├── mp_set_number_control [UI] (29B) (also in: SP) *** STATE MUTATION ***
│   │     > Sets a numeric control value in the multiplayer dialog number table.
│   │     (recursive — already shown above)
│   ├── open_intelligence_dialog [UI] (535B) (also in: SP)
│   │     > Opens the intelligence report dialog for a foreign civ. Sets up a scrollable dialog with credits bar and renders it i...
│   │   ├── create_text_button [UI] (133B) (also in: SP)
│   │   │     > Creates a text button control. Detaches any existing window, sets the button style, creates the button window, and st...
│   │   │   ├── control_detach_window [UI] (also in: SP)
│   │   │   │   ├── surface_list_remove [UI]
│   │   │   │   └── FUN_0000944B [??]
│   │   │   ├── control_init_fields [UI] (also in: SP)
│   │   │   │   └── surface_list_append [UI]
│   │   │   └── FUN_00009740 [??]
│   │   ├── modal_dialog_run [UI] (283B) (also in: SP)
│   │   │     > Runs a modal dialog loop. Pushes current dialog onto a stack (max 16 deep), enters message pump, exits when this+0x8C...
│   │   │   ├── disable_parent_window [UI]
│   │   │   ├── enable_parent_window [UI]
│   │   │   ├── get_view_window_handle [UI] (also in: SP)
│   │   │   └── process_messages [UI] (also in: SP)
│   │   │       └── FUN_0000BA4F [??] (also in: SP)
│   │   ├── rect_get_height [UI] (28B) (also in: SP)
│   │   │     > Returns the height of a RECT structure: bottom - top (*(param_1+0xc) - *(param_1+4)).
│   │   │     (recursive — already shown above)
│   │   ├── set_active_surface [UI] (74B) (also in: SP)
│   │   │     > Sets the active rendering surface (from the object's member at ECX+0x48) and triggers a refresh callback.
│   │   │   ├── call_refresh_callback [UI] (also in: SP)
│   │   │   └── end_paint [UI] (also in: SP)
│   │   │       └── invalidate_region [UI] (also in: SP)
│   │   │             (recursive — already shown above)
│   │   ├── set_button_click_callback [UI] (33B) (also in: SP)
│   │   │     > Sets the click callback function pointer for a button control.
│   │   ├── set_button_handler [UI] (45B) (also in: SP)
│   │   │     > Sets a handler callback on the button's window object at offset +0xc0.
│   │   │   └── get_window_object [UI]
│   │   ├── set_button_owner [UI] (45B) (also in: SP)
│   │   │     > Sets the button's owner/parent reference. Gets the window object via thunk_FUN_0040f810, then stores in_ECX at offset...
│   │   │   └── get_window_object [UI]
│   │   │         (recursive — already shown above)
│   │   ├── set_rect_wh [UI] (48B) (also in: SP)
│   │   │     > Wrapper for Win32 SetRect that takes x, y, width, height and converts to absolute right/bottom: SetRect(rect, x, y, x...
│   │   │     (recursive — already shown above)
│   │   ├── show_window_wrapper [UI] (33B) (also in: SP)
│   │   │     > Wrapper that calls thunk_FUN_00408620 to show the window.
│   │   │   └── show_window_inner [UI] (also in: SP)
│   │   │       ├── manage_window_show [UI] (also in: SP)
│   │   │       │   └── FUN_0000C40A [??] (also in: SP)
│   │   │       └── surface_list_find_dirty [UI]
│   │   └── [3 FW helper functions hidden]
│   ├── refresh_status_panel [UI] (297B) (also in: SP)
│   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │     (recursive — already shown above)
│   ├── set_improvement_name_string [UI] (41B) (also in: SP)
│   │     > Sets a dialog string control to an improvement/building name. Looks up the name from the string pool by param_2 index...
│   │     (recursive — already shown above)
│   ├── show_dialog_message [UI] (43B) (also in: SP)
│   │     > Wrapper that calls thunk_FUN_0051d564 with a dialog system pointer (DAT_006359d4), passing through param_1, hardcoded...
│   │     (recursive — already shown above)
│   ├── show_game_popup_3arg [UI] (43B) (also in: SP)
│   │     > Shows a game popup dialog with 3 arguments using the global dialog context.
│   │   └── show_terrain_help [UI] (58B)
│   │         > Shows help text for a terrain type.
│   │       └── FUN_0051D564 [??] (also in: SP)
│   │             (recursive — already shown above)
│   ├── show_help_topic [UI] (34B) (also in: SP)
│   │     > Opens a help topic with default parameters.
│   │   └── show_help_topic_ext [UI] (38B) (also in: SP)
│   │         > Extended help topic opener with additional parameter.
│   │       └── show_help_dialog [UI]
│   │           └── FUN_0051D3E0 [??]
│   ├── show_message [UI] (46B) (also in: SP)
│   │     > Stores a message string in the message buffer at the specified slot index.
│   │     (recursive — already shown above)
│   ├── text_add_number [UI] (33B) (also in: SP)
│   │     > Adds a number to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_add_string [UI] (33B) (also in: SP)
│   │     > Appends a string to the global text buffer.
│   │     (recursive — already shown above)
│   ├── text_begin [UI] (29B) (also in: SP)
│   │     > Begins a new text composition operation on the global text buffer at DAT_00679640.
│   │     (recursive — already shown above)
│   ├── unknown (dialog show single param) [UI] (33B) (also in: SP)
│   │     > Shows a dialog element by calling thunk_FUN_004190d0 with DAT_006359d4 and param_1.
│   │     (recursive — already shown above)
│   └── clamp [FW] (57B) (also in: SP)
│         > Clamps a value to [min, max] range. Identical logic to FUN_005a1a44 (clamp_value).
├── diff_engine_scan_and_send [GL] (1883B) (also in: SP) *** STATE MUTATION ***
│     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│     (recursive — already shown above)
├── is_unit_ready_to_move [GL] (271B) (also in: SP)
│     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   ├── get_unit_moves_remaining [GL] (69B) (also in: SP)
│   │     > Returns remaining movement points (total - spent). Minimum 0.
│   │   └── calc_unit_movement_points [GL] (516B) (also in: SP)
│   │         > Calculates total movement points for a unit, including bonuses from techs (Nuclear Power +1 for sea, Lighthouse +2 fo...
│   │         (recursive — already shown above)
│   └── is_tile_valid [GL] (80B) (also in: SP)
│         > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│         (recursive — already shown above)
├── process_human_unit_orders [GL] (880B) (also in: SP) *** STATE MUTATION ***
│     > Processes orders for the currently selected human unit. Handles tutorial prompts for damaged units, executes automate...
│   ├── diff_engine_scan_and_send [GL] (1883B) (also in: SP) *** STATE MUTATION ***
│   │     > Core multiplayer diff engine: scans game state sections against mirror, finds changed regions, RLE-compresses diffs, ...
│   │     (recursive — already shown above)
│   ├── execute_unit_order [GL] (158B) (also in: SP) *** STATE MUTATION ***
│   │     > Dispatches unit order execution based on the order type byte (DAT_006560ff). Returns 1 if order was processed, 0 if u...
│   │   ├── execute_worker_order [GL] (2035B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Executes a settler/engineer work order (irrigate, mine, road, railroad, fortress, clean pollution, plant forest, etc....
│   │   │   ├── civ_has_tech [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_tile_terrain [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── queue_map_update [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │       ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── [1 FW helper functions hidden]
│   │   │   ├── update_civ_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── refresh_status_panel [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_map_area_all_players [UI] (also in: SP)
│   │   │   │   └── update_map_area [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │       ├── invalidate_tile_area [UI] (also in: SP)
│   │   │   │       │     (3 more functions reachable)
│   │   │   │       ├── is_tile_visible [UI] (also in: SP)
│   │   │   │       │     (2 more functions reachable)
│   │   │   │       ├── redraw_tile_area [UI] (also in: SP)
│   │   │   │       │     (32 more functions reachable)
│   │   │   │       ├── reset_sprite_scale [UI] (also in: SP)
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       ├── set_current_zoom_scale [UI] (also in: SP)
│   │   │   │       ├── tile_to_screen [UI] (also in: SP)
│   │   │   │       └── unknown (sprite blit wrapper 1) [UI] (also in: SP)
│   │   │   │             (recursive — already shown above)
│   │   │   ├── FUN_0000C494 [??] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── FUN_0000C6EF [??] (also in: SP)
│   │   ├── unit_order_fortify [GL] (580B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Executes the fortify order — assigns the unit to a city if in one (with size > 2), or just fortifies in the field. Up...
│   │   │   ├── find_city_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_nearest_city [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_tile_all_players [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── FUN_0000C494 [??] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── FUN_0000C679 [??] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   └── unit_order_goto [GL] (611B) (also in: SP) *** STATE MUTATION ***
│   │         > Executes the goto/move order for a unit. Computes direction via calc_unit_goto_direction and moves one step. When des...
│   │       ├── calc_unit_goto_direction [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── check_zoc_if_no_city [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── check_adjacent_enemy_continent [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   └── get_city_owner_at [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── direction_from_delta [GL] (also in: SP)
│   │       │   ├── distance_x_wrapped [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── find_path [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── check_adjacent_enemy_simple [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── check_tile_trespass [GL] (also in: SP)
│   │       │   │   ├── count_units_by_role [GL] (also in: SP)
│   │       │   │   ├── distance_x_wrapped [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_path_cost [GL]
│   │       │   │   ├── get_tile_controller [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_path_cost [GL] *** STATE MUTATION ***
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── debug_show_message [UI]
│   │       │   │   ├── draw_number_on_map [UI]
│   │       │   │   │     (4 more functions reachable)
│   │       │   │   ├── redraw_entire_map [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── set_map_scroll_position [UI] (also in: SP)
│   │       │   ├── find_road_path [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── calc_path_distance [GL] *** STATE MUTATION ***
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── find_adjacent_terrain_type [GL]
│   │       │   │   ├── find_nearest_road_tile [GL] *** STATE MUTATION ***
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── get_bfs_visited [GL]
│   │       │   │   ├── get_land_connectivity [GL]
│   │       │   │   ├── get_sea_connectivity [GL]
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── wrap_y [GL]
│   │       │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_improvements [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── tile_distance_xy [GL] (also in: SP)
│   │       │   └── wrap_x [GL] (also in: SP)
│   │       │         (recursive — already shown above)
│   │       ├── check_adjacent_enemy_simple [GL] (also in: SP) *** STATE MUTATION ***
│   │       │     (recursive — already shown above)
│   │       ├── move_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   ├── adjust_attitude [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── begin_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── check_tile_goody_hut [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── check_zoc_if_no_city [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── check_zoc_violation [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── wrap_x [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── claim_adjacent_ocean_tiles [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── begin_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── end_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── reveal_tile_for_civ [GL] *** STATE MUTATION ***
│   │       │   │   │     (2 more functions reachable)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── update_map_area_all_players [UI] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── clear_stack_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── clear_unit_visibility [GL] *** STATE MUTATION ***
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── count_units_by_role [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── delete_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── delete_unit_safely [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── diplomacy_check_attack_allowed [GL] (also in: SP)
│   │       │   │   ├── check_can_declare_war [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── civ_has_active_wonder [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_civ_people_name [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_civ_name [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── show_message [UI] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── end_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── find_city_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_civ_people_name [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_controller [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_explored [GL] (also in: SP)
│   │       │   │   └── get_tile_ptr [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_unit_hp_remaining [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   └── get_unit_max_hp [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── get_unit_max_hp [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── handle_city_capture [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── begin_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── calc_city_value_for_capture [GL] (also in: SP)
│   │       │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── can_build_improvement [GL]
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── can_build_unit_type [GL] (also in: SP)
│   │       │   │   ├── city_set_specialist_slot [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── civ_has_active_wonder [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── civ_has_tech [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── count_units_by_role [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── create_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_all_units_in_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplomacy_check_treaty_violation [GL] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplomacy_steal_tech [GL] *** STATE MUTATION ***
│   │       │   │   │     (233 more functions reachable)
│   │       │   │   ├── end_map_batch [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── event_check_city_taken [GL] *** STATE MUTATION ***
│   │       │   │   ├── find_most_central_city [GL]
│   │       │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_civ_people_name [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_wonder_city [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_civil_war [GL] *** STATE MUTATION ***
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── handle_espionage_discovery [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── has_building [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── has_spaceship_built [GL] (also in: SP)
│   │       │   │   ├── has_spaceship_launched [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_building [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_tile_city_radius_owner [GL] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_tile_owner [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── set_tile_visibility_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_unit_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── sum_stack_property [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── upgrade_units_for_tech [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── ai_remove_goals_near [AI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── change_city_production [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (54 more functions reachable)
│   │       │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_city_disorder_00509590 [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (5 more functions reachable)
│   │       │   │   ├── dialog_set_title [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── draw_status_panel_header [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_add_button [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_dialog_close [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_dialog_create [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── redraw_map_all_players [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── select_list_item [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_city_event_dialog_v2 [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (85 more functions reachable)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │       │   │   │     (52 more functions reachable)
│   │       │   │   ├── show_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_label_id [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_number [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_begin [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_newline [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_tile_all_players [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── FUN_0000DADA [??] (also in: SP)
│   │       │   │   ├── FUN_0000DB36 [??] (also in: SP)
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   ├── handle_nuke_attack [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── adjust_attitude [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_all_units_in_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── generate_terrain_around [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── get_civ_people_name [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_controller [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── has_building [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── animate_nuke_explosion [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (37 more functions reachable)
│   │       │   │   ├── show_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── unknown (show improvement help) [UI]
│   │       │   │         (1 more functions reachable)
│   │       │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── load_unit_onto_ship [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── move_unit_to_bottom [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_last_unit_in_stack [GL]
│   │       │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── pick_up_unit_005b319e [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [2 FW helper functions hidden]
│   │       │   ├── mp_lock_map [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── mp_unlock_map [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── net_msg_init_header [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── process_goody_hut [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── (get_tile_fertility_or_city_radius) [GL] (also in: SP)
│   │       │   │   ├── can_research_tech [GL]
│   │       │   │   ├── civ_has_tech [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── create_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_nearest_city [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_tech_discovery [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_valid [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_building [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_city_disorder_00509590 [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── draw_status_panel_header [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_radius1_all_players [UI]
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   └── [1 FW helper functions hidden]
│   │       │   ├── process_unit_move_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── relocate_all_units [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── resolve_combat [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_stack_best_defender [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── calc_unit_defense_strength [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_unit_hit_points [GL]
│   │       │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── city_set_specialist_slot [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── civ_has_active_wonder [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplo_activate_alliance_wars [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplomacy_check_attack_allowed [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplomacy_check_treaty_violation [GL] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── execute_airlift [GL] *** STATE MUTATION ***
│   │       │   │   ├── find_nearest_city [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_civ_people_name [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_continent [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_hp_remaining [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_max_hp [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_nuke_attack [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_stack_wipe [GL] *** STATE MUTATION ***
│   │       │   │   │     (4 more functions reachable)
│   │       │   │   ├── handle_unit_kill [GL] *** STATE MUTATION ***
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── handle_unit_promotion [GL] *** STATE MUTATION ***
│   │       │   │   ├── has_building [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── process_unit_move_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── reassign_all_city_production [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── relocate_all_units [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── scramble_defenders_to_tile [GL] *** STATE MUTATION ***
│   │       │   │   │     (38 more functions reachable)
│   │       │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_unit_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── stack_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_civ_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── wrap_x [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── ai_alert_nearby_units [AI] *** STATE MUTATION ***
│   │       │   │   ├── ai_choose_government [AI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diplo_demand_ally_help [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── animate_combat_movement [UI] *** STATE MUTATION ***
│   │       │   │   │     (31 more functions reachable)
│   │       │   │   ├── animate_unit_movement [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (33 more functions reachable)
│   │       │   │   ├── dialog_repaint_check [UI] (also in: SP)
│   │       │   │   ├── draw_status_panel_header [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── draw_unit_at_position [UI]
│   │       │   │   ├── get_civ_name [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── invalidate_single_tile [UI]
│   │       │   │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── refresh_combat_tiles [UI]
│   │       │   │   ├── scroll_all_views_if_needed [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (1 more functions reachable)
│   │       │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (dialog show single param) [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (show improvement help) [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_radius1_all_players [UI]
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── update_tile_all_players [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── wait_for_animation [UI] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── set_paradrop_range [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   ├── set_stack_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── set_unit_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │         (recursive — already shown above)
│   │       │   ├── set_stack_visibility_mask [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── get_next_unit_in_stack [GL] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── set_tile_visibility_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── set_unit_goto_order [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   ├── set_unit_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── spy_sabotage_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_unit_hp_remaining [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── pick_up_unit_004c9528 [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── spy_diplomat_action [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── sum_stack_property [GL] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── animate_combat_movement [UI] *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── get_civ_name [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (show unit help) [UI]
│   │       │   │   │     (52 more functions reachable)
│   │       │   │   └── update_tile_all_players [UI] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── stack_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── sum_stack_property [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── tile_distance_xy [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── wrap_x [GL] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── spaceship_ai_should_start [AI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── handle_caravan_arrival [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── delete_unit_visible [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (3 more functions reachable)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── process_caravan_arrival [GL] *** STATE MUTATION ***
│   │       │   │   │     (36 more functions reachable)
│   │       │   │   ├── dialog_set_title [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── display_improvement [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_add_button [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_add_edit_field [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_add_radio_option [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── popup_dialog_create [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── select_list_item [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_label_id [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_add_string [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_begin [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── text_newline [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── unknown (dialog show single param) [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── [4 FW helper functions hidden]
│   │       │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── spy_enters_city [MIXED] (also in: SP) *** STATE MUTATION ***
│   │       │   │   ├── calc_city_revolt_distance [GL] (also in: SP)
│   │       │   │   ├── check_incident_permission [GL]
│   │       │   │   ├── city_set_specialist_slot [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── delete_unit_visible [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── execute_civil_war [GL] *** STATE MUTATION ***
│   │       │   │   ├── handle_nuke_attack [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── handle_tech_discovery [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_building [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── spy_caught_check [GL] *** STATE MUTATION ***
│   │       │   │   ├── spy_diplomat_action [GL] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── draw_status_panel_header [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── open_intelligence_dialog [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │   │     (recursive — already shown above)
│   │       │   │   └── unknown (dialog show single param) [UI] (also in: SP)
│   │       │   │         (recursive — already shown above)
│   │       │   ├── animate_unit_movement [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── flush_display [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── play_sound_effect [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── scroll_all_views_if_needed [UI] (also in: SP) *** STATE MUTATION ***
│   │       │   │     (recursive — already shown above)
│   │       │   ├── set_improvement_name_string [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── show_dialog_message [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── show_message [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── update_tile_all_players [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── wait_for_animation [UI] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   ├── FUN_0000C494 [??] (also in: SP)
│   │       │   │     (recursive — already shown above)
│   │       │   └── [1 FW helper functions hidden]
│   │       └── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │             (recursive — already shown above)
│   ├── get_unit_max_hp [GL] (45B) (also in: SP)
│   │     > Returns the maximum hit points for a unit based on its type.
│   │     (recursive — already shown above)
│   ├── is_unit_ready_to_move [GL] (271B) (also in: SP)
│   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │     (recursive — already shown above)
│   ├── refresh_unit_movement [GL] (40B) (also in: SP) *** STATE MUTATION ***
│   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │     (recursive — already shown above)
│   ├── ai_try_settle_unit [AI] (322B) (also in: SP)
│   │     > Attempts to settle a unit (found city or auto-process) for the AI. Checks that the unit is valid, has settler-like or...
│   │   ├── check_zoc_violation [GL] (407B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Checks if a unit at (param_1, param_2) moving for civ param_3 would violate zone-of-control rules. Examines 8 adjacen...
│   │   │     (recursive — already shown above)
│   │   ├── execute_unit_order [GL] (158B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Dispatches unit order execution based on the order type byte (DAT_006560ff). Returns 1 if order was processed, 0 if u...
│   │   │     (recursive — already shown above)
│   │   ├── get_unit_moves_remaining [GL] (69B) (also in: SP)
│   │   │     > Returns remaining movement points (total - spent). Minimum 0.
│   │   │     (recursive — already shown above)
│   │   ├── refresh_unit_movement [GL] (40B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│   │   │     (recursive — already shown above)
│   │   ├── ai_unit_turn_master [AI] (44777B) (also in: SP) *** STATE MUTATION ***
│   │   │     > The master AI unit turn function — the single largest function in the entire binary at 44,777 bytes. Handles ALL AI u...
│   │   │   ├── (check_tech_bit) [GL] (also in: SP)
│   │   │   │   └── bit_index_to_byte_mask [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── (get_tile_fertility_or_city_radius) [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── adjust_attitude [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── calc_shields_per_row [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── calc_food_box_size [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   └── [1 FW helper functions hidden]
│   │   │   │   ├── check_unit_support [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── calc_stack_best_defender [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_adjacent_enemy_continent [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_adjacent_enemy_simple [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_tile_goody_hut [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_tile_resource [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── check_unit_can_improve [GL] (also in: SP)
│   │   │   │   ├── check_adjacent_water [GL] (also in: SP)
│   │   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── wrap_x [GL] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── civ_has_tech [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── check_zoc_if_no_city [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── cities_share_coast [GL] (also in: SP)
│   │   │   │   ├── city_adjacent_to_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wrap_x [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── city_adjacent_to_continent [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── city_connected_to_continent [GL] (also in: SP)
│   │   │   │   ├── (check_tech_bit) [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wrap_x [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── civ_has_tech [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── count_units_by_role [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── delete_unit_visible [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── execute_paradrop [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── clear_stack_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diff_engine_scan_and_send [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── diplomacy_check_attack_allowed [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_city_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_controller [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_explored [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_owner [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── handle_city_capture [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── net_send_message [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── process_unit_move_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── relocate_all_units [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_paradrop_range [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── stack_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── animate_unit_movement [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_civ_name [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_status_panel [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_tile_all_players [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── FUN_0000C494 [??] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── find_nearest_city [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_attitude_raw [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_city_radius_owner [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_continent_if_land [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_fertility [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_hp_remaining [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_max_hp [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── has_building [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── pick_up_unit_004c9528 [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── relocate_unit_in_place [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │         (recursive — already shown above)
│   │   │   ├── resolve_combat [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── rng_range [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── set_unit_goto_order [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── should_declare_war [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── sum_stack_property [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── unit_order_found_city [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── delete_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_civ_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_map_area_all_players [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── unit_pillage [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── diplomacy_check_attack_allowed [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_city [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_civ_visibility [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_add_goal_a [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_unit_active [GL] (also in: SP)
│   │   │   │   │   └── ai_shift_goals_down_a [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── update_map_area_all_players [UI] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_add_goal_a [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_add_goal_b [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   └── ai_shift_goals_down_b [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   ├── ai_barbarian_unit_turn [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── (check_tech_bit) [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_city_value_for_capture [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_unit_goto_direction [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── check_zoc_if_no_city [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── count_units_by_role [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_all_units_in_stack [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── delete_unit_visible [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_city [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_controller [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_explored [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── rng_range [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_stack_seen_by [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── sum_stack_property [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── unit_pillage [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_cancel_goto_on_domain [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   ├── get_first_unit_in_stack [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── ai_set_goto_order [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── ai_set_goto_via_coast [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── ai_set_goto_order [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── enqueue_mp_event [MIXED] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── mp_set_number_control [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── scroll_all_views_if_needed [UI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_game_popup_2arg [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── show_message [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── update_tile_all_players [UI] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── [2 FW helper functions hidden]
│   │   │   ├── ai_calc_continent_city_weight [AI] (also in: SP)
│   │   │   ├── ai_cancel_goto_on_domain [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_find_best_settle_dir [AI] (also in: SP)
│   │   │   │   ├── (get_tile_fertility_or_city_radius) [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── should_declare_war [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wrap_x [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── ai_find_max_goal_priority [AI] (also in: SP)
│   │   │   ├── ai_find_nearest_city_or_transport [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── refresh_unit_movement [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── tile_distance_xy [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── ai_find_nuke_target [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── has_building [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_tile_improvement_bits [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── set_treaty_flags [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── sum_stack_property [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── wrap_x [GL] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── ai_get_unit_role [AI] (also in: SP)
│   │   │   ├── ai_naval_and_ranged_move [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   ├── (check_tech_bit) [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── calc_unit_movement_points [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── cities_share_coast [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_adjacent_to_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── city_connected_to_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_nearest_city [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── find_unit_stack_at_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_next_unit_in_stack [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_continent [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_controller [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_explored [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_ptr [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_hp_remaining [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_max_hp [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_moves_remaining [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── get_unit_owner_at [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── relocate_unit [GL] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── should_declare_war [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── sum_stack_property [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── tile_distance_xy [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   ├── ai_find_nearest_city_or_transport [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │   │     (recursive — already shown above)
│   │   │   │   └── ai_set_goto_order [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │         (recursive — already shown above)
│   │   │   ├── ai_remove_goals_near [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_set_goto_order [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── ai_set_goto_via_coast [AI] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── spaceship_ai_should_start [AI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── network_poll [MIXED] (also in: SP) *** STATE MUTATION ***
│   │   │   │     (recursive — already shown above)
│   │   │   ├── update_map_area_all_players [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── FUN_0000C679 [??] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── [1 FW helper functions hidden]
│   │   └── init_game_display [UI] (51B) (also in: SP)
│   │         > Initializes the game display. If DAT_006ad684 == 0, calls FUN_00421bd0 first. Then calls display update functions.
│   │       ├── flush_display [UI] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       ├── init_palette_system [UI] (also in: SP)
│   │       │     (recursive — already shown above)
│   │       └── [1 FW helper functions hidden]
│   ├── check_tutorial_advice [MIXED] (1058B) (also in: SP) *** STATE MUTATION ***
│   │     > Checks tutorial advice conditions for the currently selected unit. Suggests building cities, mining, irrigating, or b...
│   │   ├── (get_tile_fertility_or_city_radius) [GL] (100B) (also in: SP)
│   │   │     > Returns city_radius_owner if nonzero; otherwise returns fertility (clamped: if 0 < fertility < 9, returns 8).
│   │   │     (recursive — already shown above)
│   │   ├── check_adjacent_water [GL] (242B) (also in: SP)
│   │   │     > Checks if any of the 5 adjacent cardinal tiles has water or irrigation-relevant features. Returns 1 if water/ocean/ri...
│   │   │     (recursive — already shown above)
│   │   ├── check_tile_resource [GL] (281B) (also in: SP)
│   │   │     > Checks if a tile has a special resource. Uses a deterministic hash of tile coordinates and map seed to determine reso...
│   │   │     (recursive — already shown above)
│   │   ├── find_nearest_city [GL] (400B) (also in: SP)
│   │   │     > Finds the nearest city to (param_1, param_2) matching optional filters for continent, owner, and capital status. Retu...
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_improvements [GL] (39B) (also in: SP)
│   │   │     > Returns byte 1 of tile data (improvement flags: bit 0=unit present, bit 1=city, bit 2=irrigation, bit 3=mining, bit 4...
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_ptr [GL] (90B) (also in: SP)
│   │   │     > Returns pointer to 6-byte tile data for map position (param_1, param_2). Returns pointer to dummy tile if coordinates...
│   │   │     (recursive — already shown above)
│   │   ├── get_tile_terrain_raw [GL] (41B) (also in: SP)
│   │   │     > Returns the raw terrain byte (byte 0 of tile data, masked to lower 4 bits = terrain type without special resource bit).
│   │   │     (recursive — already shown above)
│   │   ├── is_tile_valid [GL] (80B) (also in: SP)
│   │   │     > Returns 1 if the tile coordinates (param_1=x, param_2=y) are within map bounds, 0 otherwise.
│   │   │     (recursive — already shown above)
│   │   ├── wrap_x [GL] (94B) (also in: SP)
│   │   │     > Wraps an X coordinate for a cylindrical (non-flat) map. If flat earth flag (0x8000) is set, returns unchanged. Otherw...
│   │   │     (recursive — already shown above)
│   │   ├── unknown (scroll_if_needed) [UI] (71B) (also in: SP)
│   │   │     > Scrolls map to (param_1, param_2) if not already centered there.
│   │   │   └── set_map_scroll_position [UI] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   └── unknown (tutorial_show_advice) [UI] (38B) (also in: SP)
│   │         > Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│   │         (recursive — already shown above)
│   ├── network_poll [MIXED] (14034B) (also in: SP) *** STATE MUTATION ***
│   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │     (recursive — already shown above)
│   ├── center_all_map_views [UI] (116B) (also in: SP)
│   │     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │   └── center_map_on_cursor [UI] (56B) (also in: SP)
│   │         > Centers the map view on the current cursor position (DAT_0064b1b4, DAT_0064b1b0) for the current player (DAT_006d1da0).
│   │       └── update_map_area [UI] (also in: SP) *** STATE MUTATION ***
│   │             (recursive — already shown above)
│   ├── process_messages [UI] (21B) (also in: SP)
│   │     > Processes pending Windows messages (message pump). Called in modal dialog loops.
│   │     (recursive — already shown above)
│   ├── resume_music [UI] (85B) (also in: SP)
│   │     > Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│   │     (recursive — already shown above)
│   └── unknown (tutorial_show_advice) [UI] (38B) (also in: SP)
│         > Wrapper calling thunk_FUN_004a6e39(param_1, param_2, 0, param_3).
│         (recursive — already shown above)
├── refresh_unit_movement [GL] (40B) (also in: SP) *** STATE MUTATION ***
│     > Refreshes a unit's movement by setting movement_spent to total_movement (i.e., the unit has already spent all its mov...
│     (recursive — already shown above)
├── activate_current_unit [MIXED] (398B) (also in: SP) *** STATE MUTATION ***
│     > Activates the current unit for player input. Handles transition from "no unit selected" to active unit state.
│   ├── is_unit_ready_to_move [GL] (271B) (also in: SP)
│   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │     (recursive — already shown above)
│   ├── select_next_unit [MIXED] (436B) (also in: SP) *** STATE MUTATION ***
│   │     > Selects the next unit needing orders. Calls the unit finder, scrolls the map to the unit, activates it for input.
│   │   ├── find_next_unit_needing_orders [GL] (629B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Finds the next unit needing orders, prioritizing by distance from the current cursor position. Nearest ready units co...
│   │   │   ├── calc_movement_cost [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── is_unit_ready_to_move [GL] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   ├── is_unit_ready_to_move [GL] (271B) (also in: SP)
│   │   │     > Returns 1 if a unit is ready to receive movement orders: must be alive, on valid map tile, owned by current active ci...
│   │   │     (recursive — already shown above)
│   │   ├── process_unit_move_visibility [GL] (4250B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Major game logic function that processes visibility updates after a unit moves. Updates fog of war for the moving uni...
│   │   │     (recursive — already shown above)
│   │   ├── update_menu_state [MIXED] (3761B) (also in: SP)
│   │   │     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│   │   │   ├── can_build_unit_type [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── civ_has_tech [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── find_city_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_city_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_fortress_owner_at [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_improvements [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_tile_terrain_raw [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── get_wonder_city [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── has_building [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_ocean [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_valid [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── is_tile_worked [GL] (also in: SP)
│   │   │   ├── wrap_x [GL] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── menu_populate [UI] (also in: SP)
│   │   │   │   ├── menu_create_header [UI] (also in: SP)
│   │   │   │   │   └── build_menu_from_string [UI]
│   │   │   │   │         (1 more functions reachable)
│   │   │   │   ├── menu_delete_item [UI] (also in: SP)
│   │   │   │   │   └── delete_menu_item [UI]
│   │   │   │   ├── menu_insert_item [UI] (also in: SP)
│   │   │   │   │   └── FUN_0000128C [??]
│   │   │   │   ├── menu_set_host_window [UI] (also in: SP)
│   │   │   │   │   └── menu_setup_parent [UI]
│   │   │   │   │         (7 more functions reachable)
│   │   │   │   ├── menu_toggle_item_checked [UI] (also in: SP)
│   │   │   │   │   ├── menu_check_item [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── menu_find_subitem_by_id [UI] (also in: SP)
│   │   │   │   │   ├── menu_get_subitem_visible_index [UI]
│   │   │   │   │   └── menu_get_visible_index [UI]
│   │   │   │   ├── menu_toggle_item_grayed [UI] (also in: SP)
│   │   │   │   │   ├── menu_enable_item [UI]
│   │   │   │   │   │     (1 more functions reachable)
│   │   │   │   │   ├── menu_find_subitem_by_id [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   ├── menu_get_subitem_visible_index [UI]
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── menu_get_visible_index [UI]
│   │   │   │   │         (recursive — already shown above)
│   │   │   │   ├── menu_update_host [UI] (also in: SP)
│   │   │   │   │   ├── get_view_window_handle [UI] (also in: SP)
│   │   │   │   │   │     (recursive — already shown above)
│   │   │   │   │   └── redraw_menubar [UI]
│   │   │   │   └── [1 FW helper functions hidden]
│   │   │   ├── menu_set_all_subitems_checked [UI] (also in: SP)
│   │   │   │   ├── menu_find_item_by_id [UI] (also in: SP)
│   │   │   │   └── menu_set_subitem_checked [UI] (also in: SP)
│   │   │   │       ├── menu_find_subitem_by_id [UI] (also in: SP)
│   │   │   │       │     (recursive — already shown above)
│   │   │   │       └── menu_toggle_item_checked [UI] (also in: SP)
│   │   │   │             (recursive — already shown above)
│   │   │   ├── menu_set_subitem_checked [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── menu_set_subitem_hidden [UI] (also in: SP)
│   │   │   │   └── menu_find_subitem_by_id [UI] (also in: SP)
│   │   │   │         (recursive — already shown above)
│   │   │   ├── set_improvement_name_string [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── update_menu_item_label [UI] (also in: SP)
│   │   │       ├── menu_set_subitem_checked [UI] (also in: SP)
│   │   │       │     (recursive — already shown above)
│   │   │       ├── menu_update_subitem_text [UI] (also in: SP)
│   │   │       │   ├── menu_change_item_text [UI]
│   │   │       │   │     (1 more functions reachable)
│   │   │       │   ├── menu_find_subitem_by_id [UI] (also in: SP)
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── menu_get_subitem_visible_index [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── menu_get_visible_index [UI]
│   │   │       │   │     (recursive — already shown above)
│   │   │       │   ├── unknown (pipe-to-tab converter) [UI]
│   │   │       │   └── [1 FW helper functions hidden]
│   │   │       ├── mp_format_template_string [UI] (also in: SP)
│   │   │       │   └── [1 FW helper functions hidden]
│   │   │       ├── text_add_label_id [UI] (also in: SP)
│   │   │       │     (recursive — already shown above)
│   │   │       └── text_begin [UI] (also in: SP)
│   │   │             (recursive — already shown above)
│   │   ├── refresh_status_panel [UI] (297B) (also in: SP)
│   │   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │   │     (recursive — already shown above)
│   │   ├── scroll_all_views_if_needed [UI] (261B) (also in: SP) *** STATE MUTATION ***
│   │   │     > Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/clears a rendering lo...
│   │   │     (recursive — already shown above)
│   │   ├── start_human_turn [UI] (95B) (also in: SP)
│   │   │     > Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│   │   │   ├── update_menu_state [MIXED] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   ├── center_all_map_views [UI] (also in: SP)
│   │   │   │     (recursive — already shown above)
│   │   │   └── refresh_status_panel [UI] (also in: SP)
│   │   │         (recursive — already shown above)
│   │   └── [1 FW helper functions hidden]
│   ├── update_menu_state [MIXED] (3761B) (also in: SP)
│   │     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│   │     (recursive — already shown above)
│   ├── center_all_map_views [UI] (116B) (also in: SP)
│   │     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│   │     (recursive — already shown above)
│   ├── refresh_status_panel [UI] (297B) (also in: SP)
│   │     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│   │     (recursive — already shown above)
│   ├── scroll_all_views_if_needed [UI] (261B) (also in: SP) *** STATE MUTATION ***
│   │     > Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/clears a rendering lo...
│   │     (recursive — already shown above)
│   └── start_human_turn [UI] (95B) (also in: SP)
│         > Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│         (recursive — already shown above)
├── network_poll [MIXED] (14034B) (also in: SP) *** STATE MUTATION ***
│     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│     (recursive — already shown above)
├── resume_turn_timer [MIXED] (181B) (also in: SP) *** STATE MUTATION ***
│     > Resumes the turn timer if time remains and game is active.
│   ├── net_send_message [GL] (6649B) (also in: SP) *** STATE MUTATION ***
│   │     > Central network message dispatcher. Handles 100+ message types (0x01 through 0xA8). For each type, constructs the app...
│   │     (recursive — already shown above)
│   ├── credits_invalidate [UI] (27B) (also in: SP)
│   │     > Invalidates the credits display to trigger repaint.
│   ├── unknown (pedia_invalidate_cache) [UI] (27B) (also in: SP)
│   │     > Forces invalidation of the Civilopedia display cache.
│   ├── unknown (throne room timer/idle handler) [UI] (64B) (also in: SP)
│   │     > Idle handler for throne room. If context exists and in phase 0, invalidates the display for animation.
│   ├── get_tick_count_wrapper [FW] (21B) (also in: SP)
│   │     > Wrapper that calls FUN_005d41e0, likely GetTickCount() or equivalent time query.
│   │   └── [1 FW helper functions hidden]
│   ├── timer_start [FW] (157B) (also in: SP)
│   │     > Starts a timer. Lazily initializes the timer manager singleton (DAT_00637ef4) if needed, then adds a timer slot.
│   │   └── [2 FW helper functions hidden]
│   ├── timer_stop [FW] (62B) (also in: SP)
│   │     > Stops a timer by slot index. If timer manager not initialized, logs error.
│   │   └── [1 FW helper functions hidden]
│   └── FUN_0000994F [??] (also in: SP)
├── select_next_unit [MIXED] (436B) (also in: SP) *** STATE MUTATION ***
│     > Selects the next unit needing orders. Calls the unit finder, scrolls the map to the unit, activates it for input.
│     (recursive — already shown above)
├── update_menu_state [MIXED] (3761B) (also in: SP)
│     > Updates all menu item enabled/disabled states based on current game state. Handles unit orders visibility, cheat menu...
│     (recursive — already shown above)
├── center_all_map_views [UI] (116B) (also in: SP)
│     > Iterates over all 8 map views and calls center_map_on_cursor for each active view.
│     (recursive — already shown above)
├── play_sound_effect [UI] (601B) (also in: SP) *** STATE MUTATION ***
│     > Plays a sound effect by ID. Looks up sound filename from table, checks for custom sound directory, and plays via Wind...
│     (recursive — already shown above)
├── refresh_status_panel [UI] (297B) (also in: SP)
│     > Refreshes the status panel — clears background, recalculates layout, redraws header and units, invalidates screen rects.
│     (recursive — already shown above)
├── scroll_all_views_if_needed [UI] (261B) (also in: SP) *** STATE MUTATION ***
│     > Iterates all 8 map views and scrolls each active view if the given position is near edges. Sets/clears a rendering lo...
│     (recursive — already shown above)
├── start_human_turn [UI] (95B) (also in: SP)
│     > Starts human turn if not already active or if param forces it. Sets UI state flags and triggers display updates.
│     (recursive — already shown above)
├── wait_for_player_input [UI] (162B) (also in: SP)
│     > Waits for player input when no unit is active. Loops processing messages until the player takes an action.
│   ├── network_poll [MIXED] (14034B) (also in: SP) *** STATE MUTATION ***
│   │     > The main network polling function. Processes all incoming multiplayer messages: game state synchronization, unit/city...
│   │     (recursive — already shown above)
│   ├── process_messages [UI] (21B) (also in: SP)
│   │     > Processes pending Windows messages (message pump). Called in modal dialog loops.
│   │     (recursive — already shown above)
│   └── resume_music [UI] (85B) (also in: SP)
│         > Resumes music if enabled. If paused, selects new random track. If disabled, stops.
│         (recursive — already shown above)
├── unknown (FW thunk) [FW] (21B) (also in: SP)
│     > Thunk redirecting to FUN_005bb9c0.
│   └── flush_mouse_keyboard_msgs [FW] (93B)
│         > Drains all pending mouse messages (0x200-0x209) and keyboard messages (0x100-0x108) from the message queue.
└── FUN_0000994F [??] (also in: SP)
      (recursive — already shown above)
```

---

## All State-Mutating Functions (Flat List)

**314** functions that mutate game state, reachable from the game loop entry points.

| Address | Name | Cat | Size | Trees | Mutation |
|---------|------|-----|------|-------|----------|
| `004E7270` | acquire_wonder | GL | 488B | SP | DAT_006ad8e8 (busy flag), DAT_00655be6 (wonder ownership), DAT_0064f344 (city... |
| `00489A0D` | activate_current_unit | MIXED | 398B | HUMAN, SP | DAT_0064b1b4/b0 (0x0064 — viewport), DAT_00673b04 (0x0067 — flag) |
| `004C2B73` | add_research_beakers | GL | 458B | SP | **DAT_0064c6a8** + param_1*0x594 (research beakers incremented by param_2) |
| `00456F20` | adjust_attitude | GL | 107B | HUMAN, SP | **DAT_0064b114** (diplomacy attitude, 0x0064XXXX range — per-civ data) |
| `004EA031` | adjust_happy_unhappy | GL | 453B | HUMAN, SP | DAT_006a659c, DAT_006a65a8, DAT_006a6550, DAT_006a6620-006a6628 (0x006A range... |
| `0049301B` | ai_add_goal_a | AI | 958B | HUMAN, SP | DAT_0064cab4-9 (0x0064 — AI goal A), DAT_006560ff/00656102/104 (0x0065 — unit... |
| `004933F2` | ai_add_goal_b | AI | 518B | HUMAN, SP | DAT_0064cbd4-9 (0x0064 — AI goal B) |
| `005369F3` | ai_alert_nearby_units | AI | 470B | HUMAN, SP | Writes DAT_006560ff, DAT_00656102, DAT_00656104 (unit orders/goto targets, 0x... |
| `004BD2A3` | ai_assess_tax_rate | AI | 770B | SP | DAT_00655aee (bit 2 cleared — game flag at 0x0065xxxx). However this is only ... |
| `005351AA` | ai_barbarian_unit_turn | AI | 6102B | HUMAN, SP | Writes to unit orders, city data (shields from city conquest), and civ gold (... |
| `00531567` | ai_cancel_goto_on_domain | AI | 160B | HUMAN, SP | Writes DAT_006560ff (unit orders, 0x0065xxxx — game state) |
| `00498E8B` | ai_choose_city_production | AI | 29400B | HUMAN, SP | DAT_0064f344 (0x0064 — city flags, bit 0x10000 for settlers), DAT_006560ff/65... |
| `0055F5A3` | ai_choose_government | AI | 558B | HUMAN, SP | DAT_0064ca7e/80 (AI preference overrides) — game state |
| `00493602` | ai_decay_and_merge_goals | AI | 365B | SP | DAT_0064cab8/9 (0x0064 — AI goals) |
| `00460129` | ai_diplomacy_negotiate | GL | 16263B | HUMAN, SP | Extensive game state writes:
- DAT_0064c6c0 (treaty flags, 0x0064 range) — se... |
| `00560084` | ai_diplomacy_turn_processing | AI | 3345B | SP | Extensive treaty, contact date, and civ flag mutations across 0x0064/0x0065 r... |
| `0045705E` | ai_evaluate_diplomacy | AI | 6616B | HUMAN, SP | Writes to many DAT_0064b0XX diplomacy evaluation globals AND DAT_0064c6c0 (pe... |
| `00560D95` | ai_evaluate_diplomacy | AI | 4728B | SP | Treaty attitude adjustments via thunk_FUN_00456f20, unit withdrawal/war decla... |
| `004C54DA` | ai_find_nearest_city_or_transport | AI | 1297B | HUMAN, SP | **DAT_006560ff**, **DAT_00656102**, **DAT_00656104**, **DAT_0063f660** |
| `00536C4C` | ai_find_nuke_target | AI | 1760B | HUMAN, SP | Writes DAT_006560f9 (unit vision, 0x0065xxxx), DAT_0064c6c0 (treaty flags — d... |
| `0055F7D1` | ai_military_aid | GL | 2222B | SP | Unit ownership/position/home city data in 0x0065/0x0064 ranges. |
| `00537331` | ai_naval_and_ranged_move | AI | 5855B | HUMAN, SP | Writes unit orders and targets in 0x0065xxxx range. |
| `00492B60` | ai_negate_goal_priority | AI | 181B | SP | DAT_0064cab9 (0x0064 — AI goal priority, per-civ data) |
| `0053184D` | ai_process_civ_turn | AI | 14665B | SP | MASSIVE writes across 0x0064-0x0065 range — per-civ statistics, unit orders, ... |
| `00543CD6` | ai_process_unit_automation | AI | 801B | SP | DAT_00655afe (current unit index, 0x0065 range — game state) |
| `00562021` | ai_propose_alliance_or_crusade | GL | 2292B | SP | Treaty flags, contact dates, treasury values — all game state at 0x0064/0x006... |
| `00492C15` | ai_remove_goals_near | AI | 259B | HUMAN, SP | DAT_0064cbd8, DAT_0064cbd9 (0x0064 — AI goal B table per civ) |
| `0055C69D` | ai_revolution_notification | GL | 1336B | HUMAN, SP | DAT_0064c6a0, DAT_0064c6b4 — game state |
| `00531607` | ai_set_goto_order | AI | 76B | HUMAN, SP | Writes to unit data at 0x0065xxxx:
- DAT_006560ff[param_1 * 0x20] = 0x0b (got... |
| `00531653` | ai_set_goto_via_coast | AI | 501B | HUMAN, SP | Writes unit order data via ai_set_goto_order. |
| `00492D18` | ai_shift_goals_down_a | AI | 184B | HUMAN, SP | DAT_0064cab4/8 (0x0064 — AI goal A table) |
| `00492DD0` | ai_shift_goals_down_b | AI | 144B | HUMAN, SP | DAT_0064cbd4/8 (0x0064 — AI goal B table) |
| `0055D1E2` | ai_tech_exchange | GL | 1182B | HUMAN, SP | Tech data via thunk_FUN_004bf05b, treaty flags (0x40000 tech exchange marker)... |
| `00538A29` | ai_unit_turn_master | AI | 44777B | HUMAN, SP | Writes extensively to unit data (0x0065xxxx), city data (0x0064xxxx), diploma... |
| `0057ED3F` | animate_combat_movement | UI | 2281B | HUMAN, SP | DAT_006ad908 written (0x006A, animation-in-progress flag). DAT_006c926c writt... |
| `0057F657` | animate_nuke_explosion | UI | 885B | HUMAN, SP | DAT_006ad908 written (animation flag, 0x006A range). |
| `0056C705` | animate_unit_movement | UI | 2902B | HUMAN, SP | DAT_006ad908 (animation lock), DAT_006ad6a4/a8 (animation state), DAT_00633e54 |
| `004868FB` | apply_global_warming | GL | 819B | SP | Map tile data (0x006A range via thunk calls) |
| `004EC1C6` | assign_caravan_commodity | GL | 327B | SP | DAT_006560fd (0x0065 range — unit commodity), DAT_0064f344 (0x0064 range — ci... |
| `004E8F42` | assign_worker_tiles | GL | 2002B | HUMAN, SP | DAT_006a65dc, DAT_006a654c (specialist counts), DAT_006a65c8 (accumulated yie... |
| `005B9EC6` | begin_map_batch | GL | 86B | HUMAN, SP | DAT_006d1190 batch buffer (0x006DXXXX), DAT_006365f4, DAT_006ad699, DAT_006ad69a |
| `0048710A` | begin_turn_unit_reset | GL | 615B | SP | DAT_006560f4, DAT_006560f8, DAT_006560fe (0x0065 range — unit data), DAT_0064... |
| `00467EF2` | break_alliance | MIXED | 632B | HUMAN, SP | DAT_0064c6c0 (treaty flags, 0x0064 range — via thunk_FUN_00467750) |
| `004E7967` | calc_capital_distance_and_corruption | GL | 1048B | HUMAN, SP | DAT_006a6588, DAT_006a6600, DAT_006a6574, DAT_006a6530 (0x006A range — city c... |
| `004E9C14` | calc_city_production | GL | 1053B | HUMAN, SP | Multiple DAT_006a6xxx globals (0x006A range — production calculation state) |
| `004EB4ED` | calc_city_production (entry point) | GL | 132B | HUMAN, SP | DAT_0062ee08 (stores city index), plus all sub-function mutations |
| `0043D400` | calc_city_trade_desirability | GL | 8227B | HUMAN, SP | DAT_0064f37b-DAT_0064f37f[param_1 * 0x58 + ...] — city trade commodity assign... |
| `004A28B0` | calc_civ_score | GL | 1542B | SP | All DAT_00673fXX addresses are in 0x0067 range — score tracking globals (not ... |
| `0047A747` | calc_coast_quadrants | UI | 386B | HUMAN, SP | Writes DAT_0066c720 (0x0066xxxx — rendering scratch data, 4 quadrant flags) |
| `004E989A` | calc_corruption | GL | 890B | HUMAN, SP | DAT_0064ca74-0064ca7a (0x0064 range — per-civ corruption statistics, only whe... |
| `0048A92D` | calc_demographic_extremes | GL | 247B | SP | DAT_00673afc, DAT_00673af8 (0x0067 — score/ranking data) |
| `004E7EB1` | calc_food_box_size | GL | 512B | HUMAN, SP | DAT_006a6608, DAT_006a6560 (0x006A range — food box globals) |
| `004EA8E4` | calc_happiness | GL | 2627B | HUMAN, SP | Multiple DAT_006a6xxx globals and DAT_0064f35e, DAT_0064f38a-0064f393 (city r... |
| `004AD0D1` | calc_path_distance | GL | 318B | HUMAN, SP | DAT_0062d03c, DAT_0062d044, DAT_00673fa0/a4 (pathfinding setup state, 0x0062/... |
| `004853E7` | calc_power_graph_rankings | GL | 2094B | SP | DAT_00655c38, DAT_00655c22, DAT_00655c2a, DAT_00655c20, DAT_00655c21, DAT_006... |
| `004E80B1` | calc_shields_per_row | GL | 1497B | HUMAN, SP | Multiple DAT_006a6xxx globals (0x006A range — production calculation state), ... |
| `0057E6E2` | calc_stack_best_defender | GL | 786B | HUMAN, SP | Writes to DAT_006acb30, DAT_006acb08 (combat scratch — 0x006A range). |
| `00568CA2` | calc_status_panel_layout | UI | 484B | HUMAN, SP | UI layout globals (0x006A/0x0063 ranges — not game state) |
| `004E8E4D` | calc_tile_all_resources | GL | 130B | HUMAN, SP | DAT_0062edf4, DAT_006a65b8 (per-tile yields), DAT_006a65c8 (accumulated total... |
| `004E868F` | calc_tile_resource | GL | 1528B | HUMAN, SP | DAT_006a65d4, DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 (auto-improvement trig... |
| `004EB327` | calc_trade_route_income | GL | 378B | HUMAN, SP | DAT_006a65b0, DAT_006a6558, DAT_006a6570, DAT_006a65c8 (0x006A range) |
| `0057E33A` | calc_unit_defense_strength | GL | 931B | HUMAN, SP | YES — writes to DAT_006acb30 (terrain type cache), DAT_006acb08 (city index c... |
| `004ADAFC` | calc_unit_goto_direction | GL | 2516B | HUMAN, SP | DAT_006560ff (unit order byte, 0x0065 range — cleared when unit is stuck), DA... |
| `0055BBC0` | calc_war_readiness | GL | 820B | HUMAN, SP | DAT_006ab5e4/e0/e8/ec (war readiness counters), DAT_006560f4 (unit fortificat... |
| `004273E6` | cancel_goto_for_stack | GL | 192B | HUMAN, SP | Writes to unit order bytes at 0x0065XXXX:
- (&DAT_006560ff)[param_1 * 0x20] =... |
| `0042738C` | cancel_goto_if_blocked | GL | 90B | HUMAN, SP | Writes to DAT_006560ff at 0x0065XXXX (unit data):
- (&DAT_006560ff)[param_1 *... |
| `00441B11` | change_city_production | MIXED | 2572B | HUMAN, SP | Writes DAT_0064c7f4 (per-civ building production counts, 0x0064XXXX), DAT_006... |
| `005B4C63` | check_adjacent_enemy_continent | GL | 297B | HUMAN, SP | DAT_006ced4c (0x006CXXXX) |
| `005B4B66` | check_adjacent_enemy_simple | GL | 253B | HUMAN, SP | DAT_006ced4c (0x006CXXXX) |
| `004E8C8C` | check_auto_irrigation_trigger | GL | 297B | HUMAN, SP | DAT_006a65d4 (counter), DAT_0062ee0c (flag), DAT_006a65e0, DAT_006a65e8 (targ... |
| `0055D685` | check_join_war | GL | 595B | HUMAN, SP | DAT_0064ca82 (last contact dates), treaty flags via thunk_FUN_00467825 (0x200... |
| `00489292` | check_population_milestone | MIXED | 705B | SP | DAT_0064c712 (0x0064 — population milestone tracker) |
| `004E8DB5` | check_road_trade_trigger | GL | 152B | HUMAN, SP | DAT_0062ee0c, DAT_006a65e0, DAT_006a65e8 — auto-improvement trigger flags |
| `00486E6F` | check_tech_advance | GL | 403B | SP | DAT_0064ca9e (0x0064 range — per-civ tech paradigm level) |
| `00488A45` | check_trade_route_path | GL | 682B | HUMAN, SP | DAT_0063f660 (0x0063 — trade route distance), DAT_0062d040-0062d048 (pathfind... |
| `0048AA24` | check_turn_advisors | MIXED | 1208B | SP | DAT_0064c6ae (0x0064 — expansion timer per civ, via tutorial messages) |
| `00489BE2` | check_tutorial_advice | MIXED | 1058B | HUMAN, SP | DAT_0062c5c0 (flag — 0x0062 UI state), DAT_0064c6ae (0x0064 — last expansion ... |
| `004E7D7F` | check_unit_support | GL | 281B | HUMAN, SP | DAT_006a660c (unit counter), DAT_006a6568 (support cost counter) — 0x006A range |
| `005B4D8C` | check_zoc_if_no_city | GL | 86B | HUMAN, SP | DAT_006ced4c (0x006CXXXX) |
| `005B49CF` | check_zoc_violation | GL | 407B | HUMAN, SP | DAT_006ced4c (0x006CXXXX — pathfinding scratch) |
| `004C195E` | choose_research_tech | MIXED | 2078B | SP | **DAT_0064c6aa** + param_1*0x594 (sets the chosen research tech as a short) |
| `0043CC00` | city_set_specialist_slot | GL | 126B | HUMAN, SP | DAT_0064f34c[param_1 * 0x58] \|= (1 << param_2) — city specialist bitfield (0x... |
| `0043F7A7` | city_update_tile_workers | GL | 265B | HUMAN, SP | Map tile data via thunk_FUN_005b98b7 and thunk_FUN_005b9c49 (map tile data, 0... |
| `0058FDA9` | claim_adjacent_ocean_tiles | GL | 306B | HUMAN, SP | Via thunk_FUN_004272d0 — modifies tile owner data (0x006AXXXX map data) |
| `004E8ECF` | clear_and_check_worked_tiles | GL | 115B | HUMAN, SP | DAT_0064f370 (via set_tile_worked) — 0x0064 range |
| `005B48B1` | clear_stack_visibility | GL | 88B | HUMAN, SP | DAT_006560f9 for each unit (0x0065XXXX) |
| `00467750` | clear_treaty_flags | GL | 213B | HUMAN, SP | DAT_0064c6c0 + civ offsets (0x0064 range — per-civ treaty data) |
| `005B488A` | clear_unit_visibility | GL | 39B | HUMAN, SP | DAT_006560f9 (0x0065XXXX) |
| `004C21D5` | complete_research | MIXED | 1422B | SP | **DAT_0064c6a8** (research beakers reset), **DAT_0064c6aa** (research target ... |
| `005B3D06` | create_unit | GL | 1675B | HUMAN, SP | - DAT_00655b16: incremented if new slot needed (0x0065XXXX)
- DAT_0064c706[ci... |
| `005B47FA` | delete_all_units_in_stack | GL | 144B | HUMAN, SP | Via delete_unit for each |
| `005B4391` | delete_unit | GL | 1129B | HUMAN, SP | - DAT_0065610a[unit]: set to 0 (0x0065XXXX)
- DAT_00655b16: decremented (0x00... |
| `005B5D93` | delete_unit_safely | GL | 677B | HUMAN, SP | Via delete_unit, delete_all_units_in_stack, load_unit_onto_ship |
| `005B6042` | delete_unit_visible | GL | 456B | HUMAN, SP | Via delete_unit_safely |
| `004B0A41` | diff_engine_copy_sections | GL | 143B | HUMAN, SP | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine scan pointers in 0x006... |
| `004B0AD0` | diff_engine_invert_mirror | GL | 131B | HUMAN, SP | DAT_00679fe8, DAT_0067a404, DAT_00679fec — diff engine state in 0x0067 range. |
| `004B0B53` | diff_engine_scan_and_send | GL | 1883B | HUMAN, SP | Writes to DAT_0067a series (diff engine metadata, 0x0067xxxx range) and DAT_0... |
| `004B1C11` | diff_engine_serialize_changed_only | GL | 466B | HUMAN, SP | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B1A15` | diff_engine_serialize_full_compressed | GL | 508B | HUMAN, SP | DAT_0067a41c[i*0x18] — per-section checksums in 0x0067 range. |
| `004B153C` | diff_engine_serialize_game | GL | 835B | HUMAN, SP | Writes checksum values in DAT_0067a434/4c4/464/44c/4f4/524/644 (all 0x0067 ra... |
| `004B18E1` | diff_engine_serialize_partial | GL | 308B | HUMAN, SP | DAT_0067a434, DAT_0067a53c — checksum values in 0x0067 range. |
| `0045A8E3` | diplo_activate_alliance_wars | GL | 910B | HUMAN, SP | **DAT_0064c6c0** (sets flags 0x80800 = war+mobilization for allies), **DAT_00... |
| `00458DF9` | diplo_ai_emissary | MIXED | 880B | HUMAN, SP | **DAT_00626a30** (diplomacy session active flag), **DAT_00626a34** (diplomacy... |
| `0045B4DA` | diplo_ai_negotiate | MIXED | 10271B | HUMAN, SP | Extensive writes to per-civ data (DAT_0064c6XX range): gold transfers, treaty... |
| `0045AC71` | diplo_declare_war | GL | 1125B | HUMAN, SP | Multiple writes to **DAT_0064c6XX** per-civ data: treaty flags, betrayal coun... |
| `0045B0D6` | diplo_demand_ally_help | MIXED | 919B | HUMAN, SP | **DAT_0064c6a2** (gold transferred between civs) |
| `0045DD7F` | diplo_favor_menu | MIXED | 4878B | HUMAN, SP | Multiple game state writes: treaty flags, gold, map visibility, unit visibili... |
| `0045A535` | diplo_form_alliance | GL | 374B | HUMAN, SP | **DAT_0064c6a0** (status flag 0x100), **DAT_0064c6bf** (patience reset), **DA... |
| `0045918E` | diplo_reset_state | GL | 61B | HUMAN, SP | Writes to DAT_00626aXX which are diplomacy UI state — borderline but treated ... |
| `00458AB1` | diplo_show_greeting | MIXED | 804B | HUMAN, SP | **DAT_0064c6c0** write: `*(DAT_0064c6c0 + param_2*4 + param_1*0x594) \|= 0x100... |
| `0045A7A8` | diplo_sign_ceasefire | GL | 315B | HUMAN, SP | **DAT_0064c6c0** (per-civ treaty flags: flag 0x800 cleared for all civs again... |
| `0045A6AB` | diplo_sign_peace_treaty | GL | 253B | HUMAN, SP | **DAT_0064c6bf**, **DAT_0064ca82**, and attitude clamped via thunk_FUN_00467933 |
| `00579C40` | diplomacy_check_treaty_violation | GL | 379B | HUMAN, SP | YES — writes to DAT_0064c6c0 + offsets (0x0064 range, per-civ treaty flags). ... |
| `0057A27A` | diplomacy_steal_tech | GL | 999B | HUMAN, SP | YES — calls thunk_FUN_004bf05b which transfers technology (writes to tech arr... |
| `004EA1F6` | distribute_trade | GL | 1769B | HUMAN, SP | DAT_006a65fc (luxury), DAT_006a6578 (tax), DAT_006a6554 (science), DAT_006a66... |
| `00489553` | do_full_civ_turn | GL | 679B | SP | DAT_0062c5b8 (flag), DAT_0064c6a2 (treasury — 0x0064 range) |
| `0056AC67` | draw_minimap_overlay | UI | 646B | SP | UI surface state (0x006A/0x0063 ranges — not game state) |
| `00569801` | draw_status_panel_units | UI | 3672B | HUMAN, SP | DAT_006abc38, DAT_006abc18-24, DAT_00633dfc (UI layout state, not game state) |
| `005B3B78` | eject_air_units | GL | 343B | HUMAN, SP | Via relocate_unit |
| `005B9F1C` | end_map_batch | GL | 194B | HUMAN, SP | DAT_006d1190 batch buffer cleared (0x006DXXXX) |
| `00440453` | establish_trade_route | GL | 765B | HUMAN, SP | Modifies city trade route arrays at 0x0064XXXX via set_trade_route |
| `004E7641` | evaluate_city_tiles | GL | 653B | HUMAN, SP | DAT_006a6530 (0x006A range — tile evaluation array), DAT_00655b10 (incremente... |
| `004FA944` | event_action_change_money | GL | 364B | HUMAN, SP | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX) |
| `004FB5B2` | event_action_change_terrain | GL | 1114B | HUMAN, SP | Extensive writes to map tile data (0x006AXXXX), city data (0x0064XXXX), unit ... |
| `004FAED4` | event_action_create_unit | GL | 941B | HUMAN, SP | Writes DAT_006560f4, DAT_00656100 (unit data, 0x0065XXXX) |
| `004FAD02` | event_action_destroy_civ | GL | 249B | HUMAN, SP | Writes DAT_0064b1ac (game end flag, 0x0064XXXX) |
| `004FA82D` | event_action_flag_no_schism | GL | 39B | HUMAN, SP | DAT_006a9110 (0x006AXXXX game state) |
| `004FADFB` | event_action_give_tech | GL | 217B | HUMAN, SP | Indirect via thunk_FUN_004bf05b which writes to tech tables (0x0065XXXX) |
| `004FABA6` | event_action_make_aggression | GL | 348B | HUMAN, SP | Indirect via thunk_FUN_00579c40 which modifies treaty/diplomacy state |
| `004FB29F` | event_action_move_unit | GL | 787B | HUMAN, SP | Writes DAT_006560ff, DAT_006560fc, DAT_00656102, DAT_00656104 (unit data, 0x0... |
| `004FAAB0` | event_action_show_text | UI | 246B | HUMAN, SP | Writes DAT_0063cc48 (0x0063XXXX, trade/text data area) |
| `004FC2BB` | event_check_city_taken | GL | 243B | HUMAN, SP | Indirect via dispatch_actions |
| `004FBA9C` | event_check_interval_trigger | GL | 147B | SP | Indirect via dispatch_actions |
| `004FBE84` | event_check_negotiation | GL | 900B | HUMAN, SP | Indirect via dispatch_actions |
| `004FC20D` | event_check_no_schism | GL | 169B | HUMAN, SP | Indirect via dispatch_actions |
| `004FBB2F` | event_check_random_trigger | GL | 174B | SP | Indirect via dispatch_actions |
| `004FBBDD` | event_check_tech_trigger | GL | 334B | SP | Indirect via dispatch_actions |
| `004FBA0C` | event_check_turn_trigger | GL | 144B | SP | Indirect via dispatch_actions |
| `004FBD9D` | event_check_unit_killed | GL | 231B | HUMAN, SP | Indirect via dispatch_actions |
| `004FC3AE` | event_dispatch_actions | GL | 360B | HUMAN, SP | Indirect via all called action functions |
| `004CA1CD` | execute_airlift | GL | 460B | HUMAN, SP | **DAT_0064f344** (city flags OR'd with 0x10000 = airlift used), unit position... |
| `004C66BA` | execute_civil_war | GL | 1339B | HUMAN, SP | Map visibility modified, units transferred between civs (DAT_006560f7 changed... |
| `004CA39E` | execute_paradrop | GL | 2572B | HUMAN, SP | Unit position changed, flags modified, possible combat triggered (via thunk_F... |
| `004C5408` | execute_unit_order | GL | 158B | HUMAN, SP | Delegates to sub-functions |
| `004C42A0` | execute_worker_order | GL | 2035B | HUMAN, SP | **DAT_006560fd** (unit work counter), **DAT_006560ff** (order byte), **DAT_00... |
| `004F03B7` | find_city_expansion_site | GL | 1095B | SP | Writes DAT_006a65e0, DAT_006a65e8 (map coordinates, 0x006AXXXX range) |
| `004AD822` | find_nearest_road_tile | GL | 730B | HUMAN, SP | DAT_00673fa0/a4 (output coordinates, 0x0067 range) |
| `005B67AF` | find_nearest_unit | GL | 233B | HUMAN, SP | DAT_006ced50 (0x006CXXXX — pathfinding scratch) |
| `005B6512` | find_next_unit_needing_orders | GL | 629B | HUMAN, SP | DAT_006560f4: bit 0x4000 (wait flag) cleared during rescan passes (0x0065XXXX) |
| `004ABFE5` | find_path | GL | 4118B | HUMAN, SP | - DAT_006ced60 (0x006C range — BFS scratch buffer, 0x2400 bytes)
- DAT_00673f... |
| `004AD20F` | find_road_path | GL | 1392B | HUMAN, SP | DAT_006365e8 area (BFS visited map, 0x0063 range), DAT_00673f globals, DAT_00... |
| `0048BFEC` | game_loop_mp_client | GL | 2530B | MP_C | Extensive across all game state ranges |
| `0048C9F3` | game_loop_mp_server | GL | 3990B | MP_S | Extensive across all game state ranges |
| `0048B340` | game_loop_singleplayer | GL | 3048B | SP | Extensive across all game state ranges (0x0063-0x0067) |
| `005B9179` | generate_terrain_around | GL | 696B | HUMAN, SP | - Tile bytes 1 (improvements): fortress cleared, roads/irrigation/mining rand... |
| `005B29D7` | get_unit_hp_remaining | GL | 98B | HUMAN, SP | DAT_006560fa[param_1 * 0x20] = 0 when hitpoint flag not set (0x0065XXXX) |
| `0058FEDB` | handle_caravan_arrival | MIXED | 1831B | HUMAN, SP | - DAT_0064f35c[city * 0x58]: production shields increased by unit_cost * cosm... |
| `0057B5DF` | handle_city_capture | GL | 11451B | HUMAN, SP | YES — extensive writes across 0x0064 and 0x0065 ranges including: city owner,... |
| `004EF578` | handle_city_disorder_004ef578 | GL | 1614B | SP | DAT_0064f344 (city flags: disorder 0x1, 0x2000, 0x4000, 0x4001, 0x100000), DA... |
| `00509590` | handle_city_disorder_00509590 | MIXED | 933B | HUMAN, SP | Writes DAT_00655aee (game flags, 0x0065XXXX), DAT_00655af4 (tutorial flags, 0... |
| `004F080D` | handle_city_expansion | GL | 650B | SP | Writes DAT_0064f344 + city * 0x58 (city flags, 0x0064XXXX), DAT_006a65d4 (exp... |
| `0057A904` | handle_civil_war | GL | 3291B | HUMAN, SP | YES — massive state mutations across 0x0064-0x0065 range: creates new civ, sp... |
| `004EC312` | handle_espionage_discovery | GL | 236B | HUMAN, SP | DAT_0064c6a0 (civ flags), DAT_0064c6be (defense rating), DAT_0064c6c0 (diplom... |
| `0057F9E3` | handle_nuke_attack | GL | 1236B | HUMAN, SP | YES — writes DAT_0064c6c0 (treaty flags in 0x0064 range): sets 0x110 (nuclear... |
| `004F1220` | handle_space_race_victory | GL | 641B | SP | Writes DAT_0064f34c, DAT_0064f34d (city visibility data, 0x0064XXXX), DAT_006... |
| `0057EB94` | handle_stack_wipe | GL | 105B | HUMAN, SP | YES — DAT_006acb0c zeroed, then multiple units destroyed via handle_unit_kill. |
| `004BF05B` | handle_tech_discovery | GL | 3391B | HUMAN, SP | Extensive writes to game state in 0x0064-0x0065 range:
- DAT_0064c6f8[civ*0x5... |
| `004BEA84` | handle_tech_government_effects | GL | 973B | HUMAN, SP | Indirectly triggers thunk_FUN_0055c066 (revolution) which modifies DAT_0064c6... |
| `0057E9F9` | handle_unit_kill | GL | 411B | HUMAN, SP | YES — DAT_0064c7b6 (0x0064 range, per-civ kill counters) incremented. DAT_006... |
| `0057EBFD` | handle_unit_promotion | GL | 322B | HUMAN, SP | YES — writes DAT_006560f4 + param_1 * 0x20 (0x0065 range, unit flags). Sets b... |
| `00488CEF` | heal_units | GL | 1438B | SP | DAT_006560f4, DAT_006560fa, DAT_006560ff (0x0065 — unit data: flags, HP, orders) |
| `0048A416` | human_turn_main_loop | GL | 1303B | HUMAN, SP | DAT_00655afe, DAT_0064b9bc, DAT_00655aee (0x0065 — game state flags) |
| `004E7492` | init_city_production_globals | GL | 77B | HUMAN, SP | DAT_006a65a4, DAT_006a6528 (0x006A range — production calculation globals) |
| `00472D20` | init_unit_move_data | GL | 253B | SP | Writes to DAT_006660f0-DAT_00666108 (0x0066xxxx range — unit type tables area... |
| `004E1763` | kill_or_retire_civ | GL | 2918B | HUMAN, SP | Extensive writes across 0x0064 (per-civ data), 0x0065 (unit/city data, game f... |
| `004D01AE` | load_civ_power_values | GL | 90B | SP | DAT_006a5b10 (0x006A range — map/game state area) — writes 6 int values from ... |
| `005B542E` | load_unit_onto_ship | GL | 1912B | HUMAN, SP | - DAT_006560f4: flag bits 0x1000 set/cleared (0x0065XXXX)
- DAT_006560ff: ord... |
| `00406B4C` | minimap_calc_viewport | UI | 620B | HUMAN, SP | Writes to DAT_0063c8XX and DAT_0066caXX ranges.
- DAT_0063c804: minimap tile ... |
| `0059062C` | move_unit | GL | 17963B | HUMAN, SP | YES — massive state mutations across 0x0063-0x006C range. Key writes include:... |
| `005B389F` | move_unit_to_bottom | GL | 577B | HUMAN, SP | DAT_00656106/00656108 linked list reordering (0x0065XXXX) |
| `00498310` | mp_check_password_or_set | GL | 90B | SP | Indirect via thunk_FUN_0049836a |
| `00498943` | mp_decrypt_passwords | FW | 144B | HUMAN, SP | DAT_00654b74 (0x0065 — password buffer) |
| `004988B8` | mp_encrypt_passwords | FW | 139B | HUMAN, SP | DAT_00654b74 (0x0065 — password buffer, but this is encryption, not game stat... |
| `00498A5C` | mp_handle_player_turn | MIXED | 192B | SP | DAT_00628044 (game active flag), DAT_00673d18 (0x0067 — password flags) |
| `00594D42` | mp_lock_map | GL | 971B | HUMAN, SP | YES — writes to DAT_0064ba48-5c (0x0064 range, per-player lock data), DAT_006... |
| `00421DA0` | mp_set_number_control | UI | 29B | HUMAN, SP | Writes to DAT_0063cc30 range (0x0063XXXX — trade route/supply tables) |
| `0049836A` | mp_set_password | MIXED | 614B | SP | DAT_00654b74 (0x0065 — password data), DAT_00673d18 (0x0067 — password flags) |
| `00421D60` | mp_set_string_control | UI | 46B | HUMAN, SP | Writes to DAT_0063cc48 range (0x0063XXXX — trade route/supply tables) |
| `0059511C` | mp_unlock_map | GL | 324B | HUMAN, SP | YES — writes to DAT_006ad8d0 (0x006A, unlock state), DAT_0064ba48 (0x0064, lo... |
| `0049882B` | mp_update_password_flags | GL | 141B | SP | DAT_00673d18, DAT_00673d38 (0x0067 — password flags) |
| `0046B0A1` | net_broadcast | GL | 124B | HUMAN, SP | DAT_00628468 (network sequence) |
| `0046B14D` | net_send_message | GL | 6649B | HUMAN, SP | - DAT_006c9088, DAT_006c9078, DAT_006c907c (0x006C range — network counters)
... |
| `0046AF70` | net_send_to_player | GL | 305B | HUMAN, SP | DAT_00628468 (sequence counter in 0x0062 range — not game state but network s... |
| `0047E94E` | network_poll | MIXED | 14034B | HUMAN, SP | MASSIVE — writes to virtually every game state address across 0x0063-0x006C. ... |
| `0040CD64` | open_tax_rate_dialog | MIXED | 4140B | HUMAN, SP | - DAT_0063cbb4: dialog state pointer (0x0063 range)
- DAT_0063cbb0: dialog ac... |
| `00472F7B` | pack_viewport_state | GL | 233B | SP | Writes DAT_0066c600-DAT_0066c662 (0x0066xxxx — unit type tables range, but th... |
| `004DBEE6` | parley_build_description | UI | 2892B | HUMAN, SP | DAT_006a5b58 (0x006A range — text buffer) |
| `004DB690` | parley_build_packet | GL | 990B | HUMAN, SP | DAT_0068abd0, DAT_0068abd4 (0x0068 range — diplomacy scratch data) |
| `004DD016` | parley_describe_attitude | UI | 347B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004DCEA5` | parley_describe_cities | UI | 369B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004DCC0C` | parley_describe_gold | UI | 119B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004DD176` | parley_describe_maps | UI | 271B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004DCAFA` | parley_describe_techs | UI | 274B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004DEF54` | parley_describe_treaty | UI | 417B | HUMAN, SP | DAT_006a5b58 (0x006A range — text buffer) |
| `004DCC83` | parley_describe_units | UI | 546B | HUMAN, SP | DAT_006a5b58 (0x006A range) |
| `004B8676` | parley_set_negotiation_state | UI | 536B | HUMAN, SP | DAT_0067a994/998/99c/9a0/9a4 — negotiation state at 0x0067xxxx. |
| `004B7EB6` | parleywin_start_session | MIXED | 807B | HUMAN, SP | DAT_006ad6a0, DAT_006ad69c (chat message counters at 0x006Axxxx), DAT_0067a9b... |
| `004F0221` | pay_building_upkeep | GL | 406B | SP | Writes DAT_0064c6a2 + civ * 0x594 (civ treasury, 0x0064XXXX range) |
| `0059A15D` | pedia_load_description | UI | 388B | HUMAN, SP | DAT_00679640 written (0x0067 range — text buffer, not game state per se but i... |
| `004C9528` | pick_up_unit_004c9528 | GL | 2453B | HUMAN, SP | **DAT_0064c6a2** (gold deducted), **DAT_0064c778** (unit counts per civ), **D... |
| `005B319E` | pick_up_unit_005b319e | GL | 705B | HUMAN, SP | - DAT_006560f0/f2: unit position set to negative offscreen coords (0x0065XXXX... |
| `0046E020` | play_sound_effect | UI | 601B | HUMAN, SP | DAT_0066bfc4, DAT_0066bfc0 (last played sound tracking, 0x0066 range — not ga... |
| `004710D0` | play_winner_video | UI | 606B | SP | Reads DAT_0064caa4/caa6/caa2 (per-civ data at stride 0x594 — civ population/y... |
| `0059DB65` | popup_dialog_destroy | UI | 1061B | HUMAN, SP | Writes to DAT_00635a9c, DAT_006ad678, DAT_006cec84 (popup stack state, 0x0063... |
| `00440750` | process_caravan_arrival | GL | 3144B | HUMAN, SP | Writes DAT_0064c6a2 (civ treasury, 0x0064XXXX), DAT_0064c6a8 (civ trade incom... |
| `004EBBDE` | process_city_food | GL | 1512B | SP | DAT_0064f349 (city size), DAT_0064f35a (food surplus), DAT_0062ee04 — 0x0064 ... |
| `004EFD44` | process_city_pollution_and_meltdown | GL | 940B | SP | Map tile data (pollution flag via thunk_FUN_005b90df) — 0x006A range; city im... |
| `004EC3FE` | process_city_production | GL | 10931B | SP | Extensive writes across all game state ranges (0x0064, 0x0065, 0x006A) |
| `004EFBC6` | process_city_science | GL | 382B | SP | DAT_006a6578 (doubled under conditions) — triggers thunk_FUN_004c2b73 which m... |
| `004F0A9C` | process_city_turn | GL | 1903B | SP | Extensive writes to 0x0064XXXX (city/civ data), 0x006AXXXX (game state) |
| `00487A41` | process_civ_turn | GL | 3830B | SP | Extensive across 0x0063-0x0065 ranges — per-civ attitude (DAT_0064c6b3/b4), t... |
| `0055D8D8` | process_diplomatic_contact | GL | 7326B | HUMAN, SP | Extensive treaty/diplomacy state writes across 0x0064/0x0065/0x0063/0x0067 ra... |
| `00487371` | process_end_of_turn | GL | 1744B | SP | DAT_00655af8 (turn counter), DAT_00655afa (year), DAT_00655b14, DAT_00655aee,... |
| `0058F040` | process_goody_hut | GL | 3404B | HUMAN, SP | - DAT_0064c6a2[civ * 0x594]: gold increased (case 2) (0x0064XXXX)
- DAT_00656... |
| `0048A004` | process_human_unit_orders | GL | 880B | HUMAN, SP | DAT_00655af4 (0x0065 — tutorial flags), DAT_00655afe (0x0065 — current unit) |
| `004274A6` | process_unit_move_visibility | GL | 4250B | HUMAN, SP | Extensive writes to game state:
- DAT_006560f9 (unit visibility bits at 0x006... |
| `004EEF23` | process_unit_support_deficit | GL | 1621B | SP | DAT_0064f344 (city flags), DAT_0064ca7e, DAT_0064ca80 (per-civ stats), plus d... |
| `005B345F` | put_down_unit | GL | 640B | HUMAN, SP | - DAT_006560f0/f2: position set (0x0065XXXX)
- DAT_00656106/00656108: linked ... |
| `005B9FDE` | queue_map_update | GL | 515B | HUMAN, SP | DAT_006d1190 batch buffer (0x006DXXXX) |
| `00442541` | reassign_all_city_production | GL | 254B | HUMAN, SP | Indirect via change_city_production calls |
| `004EB4A1` | recalc_city_all | GL | 76B | HUMAN, SP | All sub-function mutations (see above) |
| `00467BAF` | recall_units_from_territory | GL | 835B | HUMAN, SP | DAT_0064b1b4, DAT_0064b1b0 (viewport position, 0x0064 range), DAT_006560ff (u... |
| `0059C575` | record_combat_kill | GL | 762B | HUMAN, SP | YES — writes to DAT_006af2a0 (combat log, 0x006A range), DAT_006af280/260/220... |
| `0047CD51` | redraw_entire_map | UI | 205B | HUMAN, SP | Writes DAT_006ad908 (rendering lock flag) |
| `00487007` | refresh_map_visibility | GL | 259B | SP | Map visibility data (0x006A range via thunk_FUN_005b94fc) |
| `005B6787` | refresh_unit_movement | GL | 40B | HUMAN, SP | DAT_006560f8 (0x0065XXXX) |
| `005B3AE0` | relocate_all_units | GL | 152B | HUMAN, SP | Via relocate_unit for each unit (0x0065XXXX, 0x006AXXXX) |
| `005B36DF` | relocate_unit | GL | 388B | HUMAN, SP | Via pick_up_unit + put_down_unit (0x0065XXXX, 0x006AXXXX) |
| `005B3863` | relocate_unit_in_place | GL | 60B | HUMAN, SP | Via relocate_unit |
| `00440325` | remove_trade_route | GL | 199B | HUMAN, SP | Writes to DAT_0064f37a (city trade route count, 0x0064XXXX), DAT_0064f384 (tr... |
| `004A74BC` | reset_spaceship | GL | 187B | HUMAN, SP | DAT_0064caa0-DAT_0064cab4 + param_1*0x594 (0x0064 range — per-civ spaceship d... |
| `00580341` | resolve_combat | GL | 15052B | HUMAN, SP | - DAT_006560fa[attacker/defender * 0x20]: damage accumulation during combat r... |
| `0055B046` | resume_turn_timer | MIXED | 181B | HUMAN, SP | DAT_00633a74 (timer handle) |
| `005B90DF` | reveal_tile | GL | 154B | HUMAN, SP | - Tile byte 1: bit 0x80 set (pollution) (0x006AXXXX)
- DAT_00655b12: incremen... |
| `004272D0` | reveal_tile_for_civ | GL | 188B | HUMAN, SP | Modifies map tile visibility data (0x006AXXXX range via called functions):
- ... |
| `0055C3D3` | revolution_dialog | MIXED | 678B | HUMAN, SP | Via thunk_FUN_0055c066 (government change). DAT_00655af4 \|= 0x20 (tutorial fl... |
| `0059A733` | rng_next_float | GL | 94B | HUMAN, SP | YES — writes DAT_00635094 (RNG state, 0x0063 range). |
| `0059A791` | rng_range | GL | 113B | HUMAN, SP | YES — indirectly via rng_next_float modifying DAT_00635094. |
| `0057FEBC` | scramble_defenders_to_tile | GL | 1084B | HUMAN, SP | YES — writes to DAT_006560ff (unit orders, 0x0065), DAT_00656102/04 (goto des... |
| `004105F8` | scroll_all_views_if_needed | UI | 261B | HUMAN, SP | DAT_006ad908 written (0x006A range — map/BFS scratch area) |
| `00489859` | select_next_unit | MIXED | 436B | HUMAN, SP | DAT_00655afe (0x0065 — current unit index), DAT_0064b1b4/b0 (0x0064 — viewpor... |
| `00467933` | set_attitude_value | GL | 120B | HUMAN, SP | DAT_0064c6e0 + civ offsets (0x0064 range — attitude table) |
| `0043D289` | set_building | GL | 186B | HUMAN, SP | DAT_0064f374[param_1 * 0x58 + offset] — city building data (0x0064 range) |
| `005B9D81` | set_civ_tile_data | GL | 325B | HUMAN, SP | Civ visibility data (0x006365c0 array, points into allocated map memory) |
| `005520FA` | set_dialog_background | UI | 24B | SP | DAT_0063357c = param_1 (UI state, not game state) |
| `0055C066` | set_government_type | GL | 529B | HUMAN, SP | DAT_0064c6b5, DAT_0064c6c0 (embassy flags), DAT_00655aee, DAT_0064f379 — all ... |
| `004C4210` | set_paradrop_range | GL | 31B | HUMAN, SP | **DAT_0063cc30** + param_1*4 = (uint)param_2 |
| `004AD076` | set_path_cost | GL | 91B | HUMAN, SP | BFS grid in 0x006C range (pathfinding scratch buffer) |
| `00473D5E` | set_save_extension | FW | 247B | SP | Writes DAT_0066c4e8 (0x0066xxxx — extension string, UI config not persistent ... |
| `005B496E` | set_stack_seen_by | GL | 92B | HUMAN, SP | DAT_006560f9 for each unit (0x0065XXXX) |
| `005B4EE2` | set_stack_visibility_mask | GL | 90B | HUMAN, SP | DAT_006560f9 (0x0065XXXX) |
| `005B9C49` | set_tile_city_radius_owner | GL | 312B | HUMAN, SP | Tile byte 2 (0x006AXXXX) |
| `005B98B7` | set_tile_fertility | GL | 305B | HUMAN, SP | Tile byte 5 lower nibble (0x006AXXXX) |
| `005B94FC` | set_tile_improvement_bits | GL | 330B | HUMAN, SP | Tile byte 1 (0x006AXXXX via tile pointer) |
| `005B99E8` | set_tile_owner | GL | 333B | HUMAN, SP | Tile byte 5 upper nibble (0x006AXXXX) |
| `005B9646` | set_tile_terrain | GL | 295B | HUMAN, SP | Tile byte 0 (0x006AXXXX) |
| `005B976D` | set_tile_visibility_bits | GL | 330B | HUMAN, SP | Tile byte 4 (0x006AXXXX) |
| `004E790C` | set_tile_worked | GL | 91B | HUMAN, SP | DAT_0064f370 + param_1 * 0x58 (0x0064 range — city worked tiles) |
| `004403EC` | set_trade_route | GL | 103B | HUMAN, SP | Writes to DAT_0064f384 (trade partner ID, 0x0064XXXX), DAT_0064f381 (commodit... |
| `00467825` | set_treaty_flags | GL | 223B | HUMAN, SP | DAT_0064c6c0 + civ offsets (0x0064 range) |
| `0056B90B` | set_unit_font_for_zoom | UI | 99B | HUMAN, SP | DAT_00633e3c (cached font size — UI state) |
| `005B2F50` | set_unit_goto_order | GL | 66B | HUMAN, SP | DAT_006560ff, DAT_00656102 (0x0065XXXX) |
| `005B490E` | set_unit_seen_by | GL | 96B | HUMAN, SP | DAT_006560f9 (0x0065XXXX) |
| `004E7549` | set_worker_tile_status | GL | 93B | HUMAN, SP | DAT_0064f356 + param_1 * 0x58 (0x0064 range — city data) |
| `004D0EA6` | show_advance_animation | UI | 1232B | SP | DAT_006a5b08 — stores current time (0x006A range, map data area) |
| `004D13B8` | show_advance_between_turns | UI | 877B | SP | DAT_006a5b08 (0x006A range) |
| `004EB571` | show_city_event_dialog | UI | 628B | SP | DAT_006a65a0 (0x006A range — dialog state) |
| `004EB80A` | show_city_event_dialog_v2 | UI | 915B | HUMAN, SP | DAT_006a65a0 (0x006A range) |
| `0040DDC6` | show_tax_rate_dialog | MIXED | 226B | HUMAN, SP | Via sub-call to open_tax_rate_dialog (see FUN_0040cd64). |
| `0041B8FF` | show_tech_summary_dialog | UI | 339B | SP | DAT_00635a3c written (0x0063 range — dialog callback) |
| `0044CC80` | show_throne_room | MIXED | 247B | SP | Via FUN_0044d296: writes to DAT_0064ca93 (throne room piece levels, 0x0064XXX... |
| `0048B165` | show_victory_screen | MIXED | 450B | SP | DAT_00655af0 \|= 0x20, DAT_0064b1ac = 0 (0x0065/0x0064 — game state) |
| `0059772C` | spaceship_dialog | UI | 1567B | SP | Writes to DAT_0063cc48-49 (name formatting, 0x0063 range — UI scratch, not ga... |
| `00598197` | spaceship_human_build | GL | 2111B | SP | YES — writes to DAT_0064caa8 (component count incremented, 0x0064), DAT_0064c... |
| `005973FD` | spaceship_launch (internal — called after all checks pass) | GL | 815B | SP | YES — writes to DAT_0064caa0 (0x0064, spaceship flags), DAT_00655afc (0x0065,... |
| `00596EEC` | spaceship_recalc_stats | GL | 1297B | HUMAN, SP | YES — writes to DAT_0064caa0 (spaceship flags, 0x0064), DAT_0064caa2/a4/a6 (a... |
| `00485C15` | spawn_barbarians | GL | 3297B | SP | DAT_006560f4, DAT_006560f9 (0x0065 range — unit data), plus indirect mutation... |
| `004C64AA` | spy_caught_check | GL | 163B | HUMAN, SP | Delegates to FUN_004c5fae |
| `004C5FAE` | spy_diplomat_action | GL | 1271B | HUMAN, SP | **DAT_006560f8** (movement used), **DAT_006560f4** (flags), unit potentially ... |
| `004C6BF5` | spy_enters_city | MIXED | 10469B | HUMAN, SP | Extremely extensive — modifies treaty flags, gold, city improvements, city si... |
| `004C9EBD` | spy_sabotage_unit | GL | 784B | HUMAN, SP | **DAT_006560fa** (unit damage), unit potentially destroyed via thunk_FUN_0057... |
| `005B5BAB` | stack_unit | GL | 488B | HUMAN, SP | Via load_unit_onto_ship and relocate_unit |
| `0055AF2E` | start_turn_timer | MIXED | 280B | SP | DAT_00633a78 (remaining time), DAT_00633a74 (timer handle), DAT_006ab5ac, _DA... |
| `0055AE80` | stop_turn_timer | MIXED | 174B | SP | DAT_00633a74 (timer handle, 0x0063 range) |
| `00436F5A` | submit_hall_of_fame_entry | MIXED | 601B | SP | DAT_0063f0c8 area (hall of fame records shifted to make room for new entry — ... |
| `004E97AE` | sync_worker_tile_status | GL | 155B | HUMAN, SP | DAT_0064f356 (0x0064 range — worker tile status) |
| `0040C480` | taxrate_recalc_totals | MIXED | 848B | HUMAN, SP | - DAT_0064c6b3[civ * 0x594] and DAT_0064c6b4[civ * 0x594]: temporarily modifi... |
| `0044D296` | throne_room_add_improvement | MIXED | 1799B | SP | Writes DAT_0064ca93[civId*0x594 + category] (throne room piece level, 0x0064X... |
| `0057A7E9` | transfer_city_ownership | GL | 283B | HUMAN, SP | YES — writes to DAT_0064c708, DAT_0064c70c, DAT_0064f348 (all in 0x0064 range... |
| `004C4ADA` | unit_order_fortify | GL | 580B | HUMAN, SP | **DAT_006560ff** (order set to 2/fortified), **DAT_00656100** (home city), **... |
| `004C4D1E` | unit_order_found_city | GL | 335B | HUMAN, SP | Creates a new city (thunk_create_city), modifies map tile data (clears improv... |
| `004C4E6D` | unit_order_goto | GL | 611B | HUMAN, SP | **DAT_006560ff** (order byte), **DAT_006560f4** (unit flags), **DAT_006560fd*... |
| `004C50D0` | unit_pillage | GL | 824B | HUMAN, SP | Map tile improvements cleared, possible war declaration (DAT_0064c6c0 flag 0x... |
| `0048AEDC` | unknown (check_retirement_scenario_end) | MIXED | 649B | SP | DAT_00655af0 (0x0065 — game end flag), DAT_0064b1ac (0x0064 — victory type) |
| `004C21AD` | unknown (choose research wrapper) | GL | 40B | SP | Delegates to FUN_004c195e which writes DAT_0064c6aa. |
| `00467580` | unknown (set trade route value) | GL | 29B | HUMAN, SP | DAT_0063cc30 + param_1*4 (0x0063 range — trade route data) |
| `005B8B1A` | update_civ_visibility | GL | 75B | HUMAN, SP | Civ visibility data at 0x006365c0[civ] (via set_civ_tile_data) |
| `0047CBB4` | update_map_area | UI | 313B | HUMAN, SP | Writes DAT_006ad908 (0x006Axxxx — map tile data range, but this is a renderin... |
| `00486C2E` | update_pollution_counter | GL | 487B | SP | DAT_00655b0e, DAT_00655b0f, DAT_00655b10 (0x0065 range — global game state) |
| `004BE6BA` | upgrade_units_for_tech | GL | 970B | HUMAN, SP | DAT_006560f6[unit_index * 0x20] (unit type ID at 0x0065xxxx), DAT_006560f4[un... |
| `005B2590` | validate_unit_stack | GL | 1050B | HUMAN, SP | - DAT_00656106/00656108 (unit prev/next pointers): may be set to 0xffff to fi... |
| `004D08B0` | wonder_win_destructor | UI | 422B | SP | DAT_0062e2d0 = 0 (UI state) |
| `004D0517` | wonder_win_init | UI | 677B | SP | DAT_0062e2d0 — sets global wonder window pointer (UI state, not game state) |
| `004741BE` | write_save_file | GL | 4499B | SP | Writes to DAT_00655b04, DAT_00655af0, DAT_00655b82, DAT_00655b1e, DAT_0064c6a... |
