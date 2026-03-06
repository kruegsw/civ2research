# Block 005B0000 Analysis

Address range: 0x005B0000 - 0x005BFFFF
Source: `block_005B0000.c` (8195 lines)

## Function Table

### Cluster: Scenario Editor UI

These functions relate to the scenario/map editor interface ("EDITORSA_GIF"). They handle editor window initialization, painting, control layout, and combo box population.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B02A5 | stub | FUN_005b02a5 | editor_update_display_mode | 0 | void | Reads display mode via thunk 0x418d60, calls different pairs of thunk functions based on mode (0,1,2). Configures editor view toggle | LOW |
| 005B0373 | medium | FUN_005b0373 | editor_handle_command | 1 (int cmd_id) | void | Handles editor commands 0xC9 (toggle mode) and 0xCD (refresh). Uses DAT_006a4f88 (editor window ptr), calls SetFocus. References "DEBUG"/"NOTICE" strings | MEDIUM |
| 005B0473 | large | FUN_005b0473 | editor_populate_listbox | 1 (int list_type) | void | Populates editor combo/list boxes. Case 0: all 0x3E unit types from DAT_0064b1b8 (unit_type table). Cases 1-2: tech_table (DAT_00627684, 100 entries). Cases 3-4: additional label entries from DAT_00628420 offsets. Uses get_improvement_name (0x428b0c) | HIGH |
| 005B08E8 | medium | FUN_005b08e8 | editor_create_spinbox | 1 (int index) | void | Creates a numeric spin control at position from DAT_00635e20 table, using parent window (in_ECX+0x48). Range limited to in_ECX+0x2e8+6 | LOW |
| 005B09DC | xlarge | FUN_005b09dc | editor_paint | 0 | void | Main paint handler for editor window. Calls begin_paint (0x552112), blits background, draws leader portrait from DAT_00641848, draws 13 labeled buttons with text IDs 0x1E9-0x1E8. Uses set_text_style(0x29,0x12,1,1), DAT_00679640 (city name buffer) | MEDIUM |
| 005B1037 | xlarge | FUN_005b1037 | editor_init_window | 0 | void | Master editor initialization. Loads "EDITORSA_GIF", creates DIB surface (DAT_0062e018), sets window size 0x230x0x17C, creates buttons ("Close"/"Cancel"/"OK" etc from label table), creates list boxes. Sets COSMIC-derived value DAT_00635ef0. Runs main loop while DAT_006a1d7c != 0. Uses CPropertySheet | HIGH |
| 005B1A05 | stub | FUN_005b1a05 | editor_cleanup_a | 0 | void | Calls FUN_005c656b (resource cleanup) | LOW |
| 005B1A1B | stub | FUN_005b1a1b | editor_seh_epilog_a | 0 | void | SEH frame epilog (restores FS:[0]) | FRAMEWORK |
| 005B1A29 | small | FUN_005b1a29 | editor_launch | 0 | void | SEH wrapper: calls thunk 0x417fa0 (create parent), then editor_init_window, then cleanup | MEDIUM |
| 005B1A82 | stub | FUN_005b1a82 | editor_destroy_parent | 0 | void | Calls thunk 0x4183d0 (destroy parent window) | LOW |
| 005B1A98 | stub | FUN_005b1a98 | editor_seh_epilog_b | 0 | void | SEH frame epilog | FRAMEWORK |

### Cluster: Unit Stack Management

Core unit linked-list operations. Units at the same tile are linked via prev/next pointers (unit+0x16 = link_prev, unit+0x18 = link_next) at stride 0x20. All access DAT_006560f0 (unit array base). String evidence from `Unit.cpp`.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B2590 | xlarge | FUN_005b2590 | validate_unit_stack | 1 (int unit_id) | u4 (1=ok,0=error) | Validates unit linked list integrity. Checks: infinite loops (>0x7FF), dead units in stack (alive_flag==0), crossed locations (x/y mismatch). Fixes bad links by setting to -1. String: "Infinite unit stack", "Dead unit in unit stack", "Crossed locations in unit stack". Source: "D:\\Ss\\Franklinton\\Unit.cpp" line 0x11 | HIGH |
| 005B29AA | stub | FUN_005b29aa | get_unit_max_hp | 1 (int unit_id) | int | Returns unit_type[unit.type_id].hp (at utype+0x0E). DAT_0064b1c6 = utype base+0x0E offset | HIGH |
| 005B29D7 | small | FUN_005b29d7 | get_unit_hp_remaining | 1 (int unit_id) | int | Returns max_hp - damage. If DAT_00655ae8 bit 0x10 set, zeroes damage first. Clamps to min 0 | HIGH |
| 005B2A39 | large | FUN_005b2a39 | calc_unit_movement_points | 1 (int unit_id) | uint | Calculates unit movement points. Base from utype+0x0A (move_rate). For air units (domain==2): adds COSMIC[0] for tech 0x3B, 2x for wonder 0xC (Magellan's?), +COSMIC[0] for wonder 3 if no flag 0x20. Adjusts for damage if DAT_00655ae8 bit 0x10 set (proportional to HP). Min is COSMIC[0] for land, 2x for air | HIGH |
| 005B2C3D | small | FUN_005b2c3d | get_unit_moves_remaining | 1 (int unit_id) | int | Returns calc_movement_points - moves_spent (unit+0x08). Clamps to min 0 | HIGH |
| 005B2C82 | small | FUN_005b2c82 | get_next_unit_in_stack | 1 (int unit_id) | int | Validates stack, returns unit.link_next (unit+0x18) | HIGH |
| 005B2CC3 | small | FUN_005b2cc3 | get_last_unit_in_stack | 1 (int unit_id) | int | Traverses link_next chain to find last unit (where next==-1 or next==self) | MEDIUM |
| 005B2D39 | small | FUN_005b2d39 | get_first_unit_in_stack | 1 (int unit_id) | int | Traverses link_prev chain to find first unit (where prev==-1 or prev==self) | HIGH |
| 005B2DAF | medium | FUN_005b2daf | find_first_unit_at | 3 (int owner, int x, int y) | u4 (unit_id) | Searches unit array for alive unit at (x,y) owned by owner. Returns get_first_unit_in_stack of found unit | HIGH |
| 005B2E69 | medium | FUN_005b2e69 | find_unit_stack_at_xy | 2 (int x, int y) | u4 (unit_id or -1) | Finds any alive unit at (x,y). Validates stack, returns first in stack. Checks DAT_00636058 flag and tile validity via FUN_005b8d62 | MEDIUM |
| 005B2F50 | small | FUN_005b2f50 | set_unit_goto_order | 1 (int unit_id) | void | Sets unit orders byte (unit+0x0F) to 3 (goto). If not already goto, clears goto target (unit+0x12/0x14 = -1) | HIGH |
| 005B2F92 | small | FUN_005b2f92 | get_nth_unit_in_stack | 2 (int unit_id, int n) | int | Returns nth unit in stack traversal (0-indexed) | MEDIUM |
| 005B3007 | small | FUN_005b3007 | count_prev_units | 1 (int unit_id) | int | Counts units by traversing link_prev chain. Returns count-1 (position index) | MEDIUM |
| 005B3046 | medium | FUN_005b3046 | get_nth_unit_by_role | 3 (u4 stack, int n, char role) | int | Returns nth unit in stack whose type has matching role (utype+0x12) | MEDIUM |
| 005B30E9 | small | FUN_005b30e9 | count_units_in_stack | 1 (int unit_id) | int | Counts total units in stack from first to last | HIGH |
| 005B3136 | small | FUN_005b3136 | count_unit_type_in_stack | 2 (int unit_id, char type_id) | int | Counts units of specific type_id in stack | MEDIUM |

### Cluster: Unit Placement / Movement (Network-Aware)

These functions handle unit creation, deletion, movement operations. All have a network-aware pattern: check save_format_version (DAT_00655b02) >= 3 for multiplayer, then either execute locally (if server/host) or send network message and wait for response with timeout (0xe10 ticks). Source: "Unit.cpp".

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B319E | large | pick_up_unit_005b319e | pick_up_unit | 2 (int unit_id, int net_sync) | void | Removes unit from its tile stack. Unlinks prev/next pointers, clears tile unit bit, moves to limbo coords. String: "Pick Up Unit: Connection to serv..." Network msg 0x3F. Already named in rename_map | HIGH |
| 005B345F | large | FUN_005b345f | put_down_unit | 4 (int unit_id, u4 x, u4 y, int net_sync) | void | Places unit at (x,y). Links into existing stack. Sets tile unit bit and ownership nibble. String: "Put Down Unit: Connection to ser..." Network msg 0x41 | HIGH |
| 005B36DF | medium | FUN_005b36df | relocate_unit | 4 (u4 unit_id, u4 x, u4 y, int net_sync) | void | Pick up + put down in one operation. String: "Relocate Unit: Connection to ser..." Network msg 0x45 | HIGH |
| 005B3863 | small | FUN_005b3863 | relocate_unit_in_place | 2 (int unit_id, u4 net_sync) | void | Relocates unit to its current position (re-sorts stack) | MEDIUM |
| 005B389F | large | FUN_005b389f | move_unit_to_bottom | 2 (int unit_id, int net_sync) | void | Moves unit to bottom of stack at its tile. String: "Move To Bottom: Connection to se..." Network msg 0x43 | HIGH |
| 005B3AE0 | medium | FUN_005b3ae0 | relocate_all_units | 4 (u4 stack, u4 x, u4 y, int net_sync) | void | Relocates all units in a stack to new (x,y) | MEDIUM |
| 005B3B78 | medium | FUN_005b3b78 | eject_air_units | 2 (int unit_id, u4 net_sync) | void | Moves air units (domain==2) to limbo coordinates. Used before city/transport operations. Limbo = owner*4+4 * -0x4B | MEDIUM |
| 005B3CD4 | small | FUN_005b3cd4 | eject_air_and_return_first | 2 (u4 unit_id, u4 net_sync) | u4 | Ejects air units then returns first remaining unit in stack | LOW |
| 005B3D06 | xlarge | FUN_005b3d06 | create_unit | 4 (int type_id, uint owner, u4 x, u4 y) | int (slot_id) | Creates new unit. Finds free slot, increments counts (military at civ+0x706, per-type at civ+0x778, total at DAT_0064b9e8). Assigns unique ID (DAT_00627fd8++). Sets initial state: orders=0xFF(none), home_city, etc. Shows tutorial messages for first ship/air/caravan. Strings: "TOOMANYUNITS", "Create Unit: Connection to serve...", "SHIPS", "AIRUNIT", "CARAVAN", "FIRSTUNIT1/2". Network msg 0x3D | HIGH |
| 005B4391 | xlarge | FUN_005b4391 | delete_unit | 2 (int unit_id, int net_sync) | void | Deletes unit. Decrements civ counts (military, per-type, total). Picks up from tile. Clears goto references. Kills civ if no units/cities remain (role==5 settler check). String: "Delete Unit: Connection to serve..." Network msg 0x37 | HIGH |
| 005B47FA | medium | FUN_005b47fa | delete_all_units_in_stack | 2 (int unit_id, int net_sync) | void | Iterates through stack deleting each unit | MEDIUM |
| 005B488A | stub | FUN_005b488a | clear_unit_visibility | 1 (int unit_id) | void | Sets unit.visibility_mask (unit+0x09) to 0 | HIGH |
| 005B48B1 | small | FUN_005b48b1 | clear_stack_visibility | 1 (u4 unit_id) | void | Clears visibility mask for all units in stack | MEDIUM |
| 005B490E | small | FUN_005b490e | set_unit_seen_by | 2 (int unit_id, int civ_id) | void | Sets bit in unit.visibility_mask for civ_id (if unit owner != civ_id) | HIGH |
| 005B496E | small | FUN_005b496e | set_stack_seen_by | 2 (u4 unit_id, u4 civ_id) | void | Marks all units in stack as seen by civ_id | MEDIUM |

### Cluster: Zone of Control / Adjacency

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B49CF | large | FUN_005b49cf | check_zoc_violation | 3 (int x, int y, int civ_id) | bool | Checks 8 neighbors for enemy units violating zone of control. Considers terrain type (ocean check via 005b89e4), city ownership (005b8ca6), and war status (treaty bit 8 = alliance exempts). Sets DAT_006ced4c to detected enemy civ | HIGH |
| 005B4B66 | medium | FUN_005b4b66 | check_adjacent_enemy_simple | 3 (int x, int y, int civ_id) | bool | Simplified adjacency check: any non-allied enemy unit in 8 neighbors. Uses find_unit_owner (005b8d62), treaty bit 8 | MEDIUM |
| 005B4C63 | medium | FUN_005b4c63 | check_adjacent_enemy_continent | 3 (int x, int y, int civ_id) | bool | Like check_adjacent_enemy_simple but also requires same continent (005b89e4 terrain check). Treaty bit 8 for alliance | MEDIUM |
| 005B4D8C | small | FUN_005b4d8c | check_zoc_if_no_city | 3 (u4 x, u4 y, u4 civ_id) | u4 (bool) | Returns ZOC violation only if no city at (x,y). Checks city owner via 005b8ca6 | MEDIUM |
| 005B4DE2 | medium | FUN_005b4de2 | is_civ_adjacent | 3 (int x, int y, int civ_id) | bool | Checks if civ_id has any units (005b8d62) or cities (005b8ca6) in 8 neighbors of (x,y) | MEDIUM |
| 005B4EE2 | small | FUN_005b4ee2 | set_stack_visibility_mask | 2 (int unit_id, byte mask) | void | ORs visibility mask into all units in stack | MEDIUM |
| 005B4F3C | medium | FUN_005b4f3c | get_civs_near_tile | 2 (u4 x, u4 y) | uint (bitmask) | Returns bitmask of civs with presence near tile: bit for owner (005b8a1d), plus bits for adjacent civs (005b4de2) | MEDIUM |
| 005B4FCA | small | FUN_005b4fca | update_unit_visibility_neighbors | 1 (int unit_id) | void | For each neighboring civ found via is_civ_adjacent, marks this unit's stack as seen by that civ | MEDIUM |

### Cluster: Unit Stack Queries

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B503B | small | FUN_005b503b | stack_contains_type | 2 (int unit_id, uint type_id) | u4 (bool) | Returns 1 if stack contains unit of given type_id | MEDIUM |
| 005B50AD | xlarge | FUN_005b50ad | sum_stack_property | 2 (int unit_id, int property) | int | Multi-purpose stack accumulator. Property: 0=cost (utype+0x10), 1=defense (utype+0x0D), 2/11=count, 3=attack (utype+0x0C), 4=sea non-head count, 5=air count, 6=net transport capacity, 7=long-range air, 8=flag 0x10, 9=flag 0x80, 10=flag 0x08. Mode 0xB traverses via link_next (raw chain), others use normalized stack traversal | HIGH |
| 005B53B6 | small | FUN_005b53b6 | count_units_by_role | 2 (int unit_id, int role) | int | Counts units in stack with matching role (utype+0x12) | MEDIUM |

### Cluster: Transport/Ship Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B542E | xlarge | FUN_005b542e | load_unit_onto_ship | 3 (int unit_id, int mode, int net_sync) | int | Complex ship loading logic. Ejects air units if needed, finds compatible transport. Mode 0: mark for goto-boarding, Mode 1: immediate board. Checks domain match, capacity, war state. String: "Stack ship: Connection to server..." Network msg 0x49. Source: "Unit.cpp" line 0x61D | HIGH |
| 005B5BAB | medium | FUN_005b5bab | stack_unit | 2 (int unit_id, int net_sync) | void | Stacks a unit (loads onto ship if sea domain, otherwise relocates to limbo). String: "Stack unit: Connection to server..." Network msg 0x4B | MEDIUM |
| 005B5D93 | large | FUN_005b5d93 | delete_unit_safely | 2 (int unit_id, int net_sync) | void | Safe deletion: unloads ship cargo first, handles sea units on land. String: "Delete safely: Connection to ser..." Network msg 0x4D | MEDIUM |
| 005B6042 | medium | FUN_005b6042 | delete_unit_visible | 2 (int unit_id, int net_sync) | void | Delete with map refresh (calls 0x47cea6 to update tile display). String: "Delete visible: Connection to se..." Network msg 0x4F | MEDIUM |
| 005B620A | medium | FUN_005b620a | autoload_ships | 2 (u4 stack, int net_sync) | int | Auto-loads all sea units in stack. Returns max cargo loaded | MEDIUM |

### Cluster: Unit Orders & Status

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B62EE | small | FUN_005b62ee | set_stack_orders | 2 (int unit_id, byte orders) | void | Sets orders byte for all units in stack | MEDIUM |
| 005B633F | medium | FUN_005b633f | is_unit_ready_to_move | 1 (int unit_id) | u4 (bool) | Returns 1 if: unit is alive, on valid tile, owned by current player (DAT_00655b05), not goto/fortified/sentry, has moves remaining, no vet flag 0x02 | HIGH |
| 005B6458 | medium | FUN_005b6458 | is_unit_active | 1 (int unit_id) | u4 (bool) | Returns 1 if unit is alive, at valid coords (>=0), not on goto, and has moves remaining | MEDIUM |
| 005B6512 | large | FUN_005b6512 | find_next_unit_needing_orders | 2 (int unit_id, int mode) | int | Finds closest unit needing orders. Uses distance calculation (005ae31d). Mode 1: restrict to current player's civ (DAT_006d1da0). Prefers sea units slightly (distance*2+1 vs *2). Uses DAT_00655afe (current active unit). Up to 3 retry passes clearing "already visited" flags (bit 0x4000) | HIGH |
| 005B6787 | stub | FUN_005b6787 | refresh_unit_movement | 1 (int unit_id) | void | Recalculates and stores movement points (unit+0x08 = calc_movement_points result) | MEDIUM |

### Cluster: Unit Misc

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B67AF | medium | FUN_005b67af | find_nearest_unit | 4 (u4 x, u4 y, uint civ_or_neg1, int exclude_id) | int | Finds nearest alive unit to (x,y), optionally filtered by owner civ. DAT_006ced50 = nearest distance found | MEDIUM |
| 005B6898 | small | FUN_005b6898 | get_unit_home_city_name | 1 (int unit_id) | char* | If home_city==-1, returns "None" label (DAT_00628420+0x38). Otherwise returns city.name (DAT_0064f360 + city_id*0x58) | HIGH |
| 005B68F6 | medium | FUN_005b68f6 | check_unit_can_improve | 3 (int civ_id, u4 x, u4 y) | int | Checks if civ can build improvement at tile. Returns 0=no, 1=irrigation, 2=mining. Checks: no city at tile, not fortress/airbase, terrain resource table (DAT_00627cce), civ gov level (civ+0xB5). Needs tech 0x46 for fortress | HIGH |
| 005B6A58 | small | FUN_005b6a58 | clear_unit_orders | 1 (int unit_id) | u4 (0) | Sets unit orders to 0xFF (none), clears status bit 0x8000 | MEDIUM |
| 005B6AA0 | stub | FUN_005b6aa0 | return_true | 0 | u4 (1) | Always returns 1. Likely a vtable stub | LOW |
| 005B6AB5 | small | FUN_005b6ab5 | draw_unit_for_dialog | 6 | void | Calls draw_unit (0x56baff) with param_3=4 (full decorations), offset param_5+2. Uses DAT_0063605c for zoom | MEDIUM |
| 005B6AEA | large | FUN_005b6aea | show_unit_list_dialog | 3 (int unit_id, u4 title, int mode) | void | Shows scrollable unit list popup. Lists up to 9 units with civ flag colors, type names, home city, caravan commodity. Uses CString, CPropertySheet. Iterates stack with civ name (0x493d13), veteran star (bit 0x2000), display_improvement (0x40ff00) | HIGH |

### Cluster: Unit List Dialog Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B6D9F | stub | FUN_005b6d9f | dialog_cleanup_a | 0 | void | Calls thunk 0x59df8a (dialog destroy) | FRAMEWORK |
| 005B6DAB | stub | FUN_005b6dab | dialog_cleanup_b | 0 | void | Calls FUN_005cde4d (resource release) | FRAMEWORK |
| 005B6DBE | stub | FUN_005b6dbe | dialog_seh_epilog | 0 | void | SEH frame epilog | FRAMEWORK |

### Cluster: Map Data Allocation & I/O

These functions manage the 6-byte-per-tile map data arrays and per-civ visibility buffers. Map dimensions in DAT_006d1160 (width) / DAT_006d1162 (height). Total tiles = DAT_006d1164.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B7FE0 | xlarge | FUN_005b7fe0 | alloc_map_data | 0 | void | Allocates all map data buffers. DAT_006d116a = width/4 rounded, DAT_006d116c = height/4 rounded. DAT_006d1164 = (width/2)*height tiles. Main tile buffer (6 bytes each) at DAT_00636598/DAT_006d1170. 7 per-civ visibility buffers at DAT_006365a0[1..7]/DAT_006365c0[1..7]. 4 quarter-map buffers at DAT_006d1174-006d1180/DAT_006365e0-006365ec. Initializes all tiles to terrain=10 (ocean). Sets DAT_006365f0=1 (allocated flag) | HIGH |
| 005B8416 | large | FUN_005b8416 | free_map_data | 0 | void | Frees all map data buffers (reverse of alloc_map_data). Uses thunk_FUN_0046ab00 (unlock) and 0046aaa0 (free). Sets DAT_006365f0=0 | HIGH |
| 005B85FE | small | FUN_005b85fe | init_map_seed | 0 | void | Sets DAT_006d1168 (map seed) from timer, masked to 0x7FFF, minimum 1 | HIGH |
| 005B8635 | medium | FUN_005b8635 | save_map_data | 2 (FILE*, int mode) | u4 (0=ok,1=err) | Writes map data to file. Writes 14-byte header (DAT_006d1160), then per-civ visibility (mode 0) or scenario data (mode 1, 0x2A bytes from DAT_00627fe0/DAT_00628010), then 6*tiles of tile data | HIGH |
| 005B8783 | large | FUN_005b8783 | load_map_data | 2 (FILE*, int mode) | u4 (0=ok,1=err) | Reads map data from file. Reads header, reallocates via alloc_map_data, reads visibility/scenario blocks, then tile data | HIGH |

### Cluster: Map Tile Accessors

Low-level accessors for the 6-byte tile records. Tile pointer = DAT_00636598 + (width&~1)*y*3 + (x&~1)*3. Tile bytes: [0]=terrain/river/resource, [1]=improvements, [2]=city_radius_owner, [3]=continent_id, [4]=visibility, [5]=ownership/fertility.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B8931 | small | FUN_005b8931 | get_tile_ptr | 2 (uint x, int y) | byte* | Returns pointer to 6-byte tile record. If out of bounds (004087c0 returns 0), returns DAT_006d1188 (dummy tile) | HIGH |
| 005B898B | small | FUN_005b898b | get_civ_vis_ptr | 3 (int x, int y, int civ) | int | Returns pointer into per-civ visibility array: DAT_006365c0[civ] + (width/2)*y + x/2 | HIGH |
| 005B89BB | small | FUN_005b89bb | get_tile_terrain_raw | 2 (u4 x, u4 y) | uint | Returns tile byte[0] & 0x0F (terrain nibble) | HIGH |
| 005B89E4 | small | FUN_005b89e4 | is_tile_ocean | 2 (u4 x, u4 y) | bool | Returns true if terrain nibble == 10 (ocean) | HIGH |
| 005B8A1D | small | FUN_005b8a1d | get_tile_owner | 2 (u4 x, u4 y) | int | Returns tile byte[5] >> 4 (ownership high nibble). Returns -1 if value is 0xF or tile invalid | HIGH |
| 005B8A81 | stub | FUN_005b8a81 | get_tile_continent | 2 (u4 x, u4 y) | byte | Returns tile byte[3] (continent/body_ID) | HIGH |
| 005B8AA8 | small | FUN_005b8aa8 | get_tile_continent_if_land | 2 (u4 x, u4 y) | u4 | Returns continent ID if not ocean, else -1 | MEDIUM |
| 005B8AF0 | small | FUN_005b8af0 | get_tile_city_radius_owner | 2 (u4 x, u4 y) | int | Returns tile byte[2] >> 5 (bits 5-7 = city radius owner civ) | HIGH |
| 005B8B1A | small | FUN_005b8b1a | update_civ_visibility | 3 (u4 x, u4 y, int civ) | void | If civ>0, reads tile byte[1] and calls set_civ_tile_data (005b9d81) | MEDIUM |
| 005B8B65 | small | FUN_005b8b65 | get_tile_explored | 3 (u4 x, u4 y, int civ) | uint | Returns bit (1<<civ) of tile byte[4] (visibility byte). If civ<0, returns 1 (always explored) | HIGH |
| 005B8BAC | small | FUN_005b8bac | set_tile_explored | 4 (u4 x, u4 y, int civ, int value) | void | Sets or clears exploration bit for civ in tile byte[4] | HIGH |
| 005B8C18 | small | FUN_005b8c18 | get_tile_fertility | 2 (u4 x, u4 y) | byte | Returns tile byte[5] & 0x0F (fertility low nibble) | HIGH |
| 005B8C42 | small | FUN_005b8c42 | get_tile_effective_owner | 2 (u4 x, u4 y) | int | Returns city_radius_owner if set, else fertility-based owner (clamps 1-8 to 8) | LOW |
| 005B8CA6 | small | FUN_005b8ca6 | get_city_owner_at | 2 (u4 x, u4 y) | u4 (-1 or civ) | Returns tile owner if tile has city bit (improvement byte & 0x42 == 2, i.e. bit 1 = city). Returns -1 if no city | HIGH |
| 005B8D15 | small | FUN_005b8d15 | get_fortress_owner_at | 2 (u4 x, u4 y) | u4 (-1 or civ) | Returns tile owner if tile has fortress+city bits (0x42 == 0x42). Returns -1 otherwise | MEDIUM |
| 005B8D62 | small | FUN_005b8d62 | get_unit_owner_at | 2 (u4 x, u4 y) | u4 (-1 or civ) | Returns tile owner if tile has unit bit (improvement byte & 1). Returns -1 if no unit | HIGH |
| 005B8DA4 | small | FUN_005b8da4 | get_tile_controller | 2 (u4 x, u4 y) | int | Returns city owner if city exists, else unit owner. -1 if neither | MEDIUM |

### Cluster: Map Tile Complex Queries

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B8DEC | medium | FUN_005b8dec | check_tile_trespass | 3 (u4 x, u4 y, int civ_id) | int | Checks if civ_id is trespassing at (x,y). Returns civ of owner if at war (treaty bit 4) and not allied (treaty bit 8). Returns -1 for alliance. Checks city_radius_owner (byte[2]>>5) | MEDIUM |
| 005B8EE1 | medium | FUN_005b8ee1 | check_tile_resource | 2 (int x, int y) | u4 (0/1/2) | Checks if tile has a resource using map seed-based algorithm. No resource if: grassland (terrain 2), no_resource bit (byte[0] & 0x40). Uses hash of coordinates with DAT_006d1168 (map seed). Returns 1 for normal resource, 2 for special | HIGH |
| 005B8FFA | medium | FUN_005b8ffa | check_tile_goody_hut | 2 (int x, int y) | u4 (bool) | Checks if unowned tile has a goody hut via seed-based hash. Different hash formula from resources (adds 8, mask 0x1F vs 0xF) | HIGH |
| 005B90DF | medium | FUN_005b90df | reveal_tile | 2 (u4 x, u4 y) | void | Marks tile as revealed (sets improvement bit 0x80). Updates visibility for all 7 civs. Increments DAT_00655b12 (revealed tile count) | HIGH |
| 005B9179 | large | FUN_005b9179 | generate_terrain_around | 2 (int x, int y) | void | Generates terrain for 9 tiles (center + 8 neighbors) around a newly revealed tile. Randomly assigns improvements (road, irrigation, mining, etc.) using _rand(). Damages cities (size halved). 2/3 chance to reveal adjacent tiles | HIGH |

### Cluster: Per-Continent Data

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B9431 | small | FUN_005b9431 | is_tech_known_by_continent | 2 (int continent, u4 tech_id) | bool | Checks tech bitmask for continent in DAT_00666137 array (16 bytes per entry) | LOW |
| 005B947F | small | FUN_005b947f | count_known_techs_continent | 1 (u4 tech_id) | int | Counts how many continents (1-62) know a specific tech | LOW |

### Cluster: Map Tile Setters (Network-Aware)

All tile mutation functions follow a pattern: modify the tile byte, then if multiplayer (DAT_00655b02 > 2), send a network update. Two modes: batch mode (DAT_006ad69a, queues to buffer at DAT_006d1190) or immediate mode (DAT_006ad699, sends packet directly).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B94D5 | stub | FUN_005b94d5 | get_tile_improvements | 2 (u4 x, u4 y) | byte | Returns tile byte[1] (improvement flags) | HIGH |
| 005B94FC | medium | FUN_005b94fc | set_tile_improvement_bits | 5 (u4 x, u4 y, u4 bits, int set, int sync) | void | Sets or clears bits in tile byte[1]. Network msg 0x90. Source: "D:\\Ss\\Franklinton\\Map.cpp" | HIGH |
| 005B9646 | medium | FUN_005b9646 | set_tile_terrain | 4 (u4 x, u4 y, u4 terrain, int sync) | void | Sets terrain nibble in tile byte[0] (preserves high nibble). Network msg 0x91 | HIGH |
| 005B976D | medium | FUN_005b976d | set_tile_visibility_bits | 5 (u4 x, u4 y, u4 bits, int set, int sync) | void | Sets or clears bits in tile byte[4] (exploration). Network msg 0x92 | HIGH |
| 005B98B7 | medium | FUN_005b98b7 | set_tile_fertility | 4 (u4 x, u4 y, u4 value, int sync) | void | Sets low nibble of tile byte[5]. Network msg 0x93 | HIGH |
| 005B99E8 | medium | FUN_005b99e8 | set_tile_owner | 4 (u4 x, u4 y, int civ, int sync) | void | Sets high nibble of tile byte[5]. Clamps civ to 0xF if out of range 0-8. Network msg 0x94 | HIGH |
| 005B9B35 | medium | FUN_005b9b35 | set_tile_continent | 4 (u4 x, u4 y, u4 body_id, int sync) | void | Sets tile byte[3] (continent ID). Network msg 0x95 | HIGH |
| 005B9C49 | medium | FUN_005b9c49 | set_tile_city_radius_owner | 4 (u4 x, u4 y, uint civ, int sync) | void | Sets bits 5-7 of tile byte[2] (city radius owner). Network msg 0x96 | HIGH |
| 005B9D81 | medium | FUN_005b9d81 | set_civ_tile_data | 6 (u4 x, u4 y, byte val, u4 civ, int mode, int sync) | void | Sets per-civ visibility buffer entry. Mode 0: replace, Mode 1: OR. Uses get_civ_vis_ptr. Network msg 0x97 | HIGH |

### Cluster: Network Map Sync

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005B9EC6 | small | FUN_005b9ec6 | begin_map_batch | 0 | void | Starts batch mode for map updates. Sets DAT_006ad699=0, DAT_006ad69a=1, clears buffer DAT_006d1190 (0x400 bytes), DAT_006365f4=1. Source: "Map.cpp" | HIGH |
| 005B9F1C | medium | FUN_005b9f1c | end_map_batch | 0 | void | Ends batch mode. Sets DAT_006ad699=1, DAT_006ad69a=0. Flushes pending updates (msg 0x59) if >1 entry. Source: "Map.cpp" | HIGH |
| 005B9FDE | large | FUN_005b9fde | queue_map_update | 6 (int type, u4 x, u4 y, u4 p3, u4 p4, u4 p5) | void | Queues a map modification into batch buffer (DAT_006d1190). Types 0-7 correspond to the 8 tile setter functions. Flushes if buffer nearing capacity (0x100). Tracks entry count via DAT_006365f4. Source: "Map.cpp" line 0x3DE | HIGH |
| 005BA206 | large | FUN_005ba206 | apply_map_updates | 1 (int buffer_ptr) | void | Applies queued map updates received from network. Reads buffer, dispatches to appropriate setter by type (0-7). Server-only assertion. Source: "Map.cpp" line 0x416 | HIGH |

### Cluster: Text Rendering

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BAD40 | medium | FUN_005bad40 | parse_binary_string | 1 (char*) | int | Parses string of '0' and '1' characters as binary number. Non-0/1 chars cause skip to end | LOW |
| 005BADF0 | medium | FUN_005badf0 | build_file_path | 3 (char* out, u4 dir, u4 filename) | char* | Builds uppercase file path: dir + "\\" + filename. Uses string copy/concat (005f22d0/005f22e0) then _strupr | MEDIUM |
| 005BAEB0 | stub | FUN_005baeb0 | set_text_draw_target | 1 (u4 target) | void | Sets DAT_006366a8 (text rendering target surface) | HIGH |
| 005BAEC8 | stub | FUN_005baec8 | set_text_draw_source | 1 (u4 source) | void | Sets DAT_006366ac (text rendering source surface) | HIGH |
| 005BAEE0 | small | FUN_005baee0 | set_text_style | 4 (u4 color, u4 size, int shadow, int bold) | void | Sets text rendering params: DAT_006366b0=color, DAT_006366b4=size, DAT_006366b8=shadow (if >=0), DAT_006366bc=bold (if >=0). Already documented in reference as set_text_style | HIGH |
| 005BAF24 | small | FUN_005baf24 | set_text_outline | 1 (int enable) | void | Sets DAT_006366c0 to 0 or 1 (text outline/glow effect) | MEDIUM |
| 005BAF57 | medium | FUN_005baf57 | draw_text_with_shadow | 4 (u4 surface, u4 text, int x, int y) | int | Draws text with optional shadow and outline. Shadow at (x+shadow+outline, y+5) in shadow color (DAT_006366b4). Outline draws at (x+1,y). Returns x + text_width | HIGH |
| 005BB024 | medium | FUN_005bb024 | draw_text_centered | 5 (u4 sfc, u4 text, int x, int y, int width) | int | Centers text within width by calculating: x + (width/2 - total_text_width/2) | HIGH |
| 005BB0AF | medium | FUN_005bb0af | draw_text_right_aligned | 5 (u4 sfc, u4 text, int x, int y, int width) | int | Right-aligns text within width: x + (width - total_text_width) | HIGH |

### Cluster: Surface/Port Creation & Management

These functions create and manage drawing surfaces (bitmap ports). They wrap GDI DIB and off-screen bitmap operations. The Port struct has fields at offsets +4=width, +8=height, +0xC=stride, +0x10=stride_signed, +0x24=rect, +0x34=pixel_ptr, +0x40=dib_handle, +0x44=dirty_flag.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BB3F0 | small | FUN_005bb3f0 | create_offscreen_surface | 7 | void | Creates offscreen rendering surface with given dimensions. Calls 005c5760 (init), 005bd65c (alloc), 005c0cc5 (set palette), gets font via 00414d10, calls 005e1880 (select font) | MEDIUM |
| 005BB463 | small | FUN_005bb463 | create_offscreen_surface_ex | 8 | void | Like create_offscreen_surface + calls thunk 0x579b40 (additional surface setup) | MEDIUM |
| 005BB4AE | small | FUN_005bb4ae | create_offscreen_surface_b | 8 | void | Variant using FUN_005c57f9 (different init path) | MEDIUM |
| 005BB525 | small | FUN_005bb525 | create_offscreen_surface_b_ex | 9 | void | Like create_offscreen_surface_b + calls thunk 0x579b40 | MEDIUM |
| 005BB574 | small | FUN_005bb574 | set_active_surface | 0 | void | Sets DAT_00637ea4 to this->hwnd or NULL. Calls refresh callback (005bb990) and end_paint (00408460) | MEDIUM |
| 005BB5BE | small | FUN_005bb5be | handle_size_change | 1 (u4 msg) | bool | If FUN_005c0105 returns 1, gets window rect and resizes surface. Returns true if handled | LOW |
| 005BB621 | medium | FUN_005bb621 | resize_window | 2 (int w, int h) | void | Resizes window if dimensions changed. Uses CRichEditCntrItem::GetActiveView (Ghidra FID misidentification - actually surface accessor). Updates DAT_00637ea4 | MEDIUM |
| 005BB6C7 | medium | FUN_005bb6c7 | scroll_to_clamped | 2 (int x, int y) | void | Scrolls to (x,y), clamping to valid scroll range [min..max] from get_scroll_min/max | MEDIUM |
| 005BB760 | small | FUN_005bb760 | create_child_surface | 6 | void | Creates a child surface using 005c589a init, 005c1b0d allocation | MEDIUM |
| 005BB7C3 | small | FUN_005bb7c3 | create_child_surface_ex | 7 | void | Like create_child_surface + thunk 0x579b40 | MEDIUM |
| 005BB80A | small | FUN_005bb80a | create_child_surface_b | 7 | void | Variant child surface creation using 005c592b | MEDIUM |
| 005BB871 | small | FUN_005bb871 | create_child_surface_b_ex | 8 | void | Like create_child_surface_b + thunk 0x579b40 | MEDIUM |
| 005BB8C0 | stub | FUN_005bb8c0 | get_surface_handle | 0 | u4 | Returns this+4 (HWND or surface handle) | FRAMEWORK |
| 005BB8E0 | stub | FUN_005bb8e0 | set_surface_size | 2 (u4 w, u4 h) | void | Calls FUN_005bc505 on this+8 surface | MEDIUM |
| 005BB910 | stub | FUN_005bb910 | get_scroll_min | 2 (u4* x, u4* y) | void | Returns scroll minimums from this+0x7C and this+0x80 | LOW |
| 005BB950 | stub | FUN_005bb950 | get_scroll_max | 2 (u4* x, u4* y) | void | Returns scroll maximums from this+0x84 and this+0x88 | LOW |
| 005BB990 | stub | FUN_005bb990 | call_refresh_callback | 0 | void | Calls function pointer at this+0x110 if non-null (paint/refresh callback) | MEDIUM |

### Cluster: Message Pump / Input

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BB9C0 | small | FUN_005bb9c0 | flush_mouse_keyboard_msgs | 0 | void | Removes all WM_MOUSEFIRST..WM_MOUSELAST (0x200-0x209) and WM_KEYFIRST..WM_KEYLAST (0x100-0x108) from message queue | HIGH |
| 005BBA1D | small | FUN_005bba1d | flush_all_messages | 0 | void | Removes all messages from queue via PeekMessage(PM_REMOVE) | HIGH |
| 005BBA4F | small | gdi_BA4F | process_one_message | 0 | u4 (bool) | Peeks one message, translates+dispatches it. If no message, calls thunk 0x407ff0 (idle). Returns 1 if message processed | MEDIUM |
| 005BBAB8 | small | gdi_BAB8 | process_paint_message | 0 | bool | Peeks and processes WM_PAINT (0x0F) only | MEDIUM |
| 005BBB0A | small | FUN_005bbb0a | process_all_pending | 0 | void | Processes all pending messages then calls GdiFlush() | MEDIUM |
| 005BBB32 | small | FUN_005bbb32 | process_all_paints | 0 | void | Processes all pending WM_PAINT messages then calls GdiFlush() | MEDIUM |
| 005BBB5A | stub | FUN_005bbb5a | launch_program | 1 (LPCSTR cmdline) | void | Calls WinExec(cmdline, SW_SHOWNORMAL) | HIGH |
| 005BBB76 | small | gdi_BB76 | process_timer_message | 0 | bool | Peeks and processes WM_TIMER (0x3BD=957, actually 0x113=WM_TIMER. No, 0x3BD=WM_CHANGECBCHAIN?). Actually 0x3BD is an app-specific message | LOW |
| 005BBBCE | small | FUN_005bbbce | process_timer_and_idle | 0 | void | Processes timer messages, then calls idle handler (DAT_00637efc check + FUN_005e1c70) | LOW |

### Cluster: Window Management (GDI Framework)

Core window creation, management, and manipulation. These form the game's custom windowing abstraction layer.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BBC10 | xlarge | create_window_BC10 | create_game_window | 7 (LPCSTR title, uint flags, int x, int y, int w, int h, int parent) | u4* (window struct) | Creates Win32 window with class "MSWindowClass" (DAT_006366d0). Allocates 0x4C-byte window struct. Translates abstract flags to WS_* styles. Handles: borders, caption, resize, minimize/maximize, scrollbars, child windows. Stores HWND at [1], HDC at [2], cursor at [7], flags at [0x12] | HIGH |
| 005BBFEE | small | FUN_005bbfee | enable_window | 2 (int wnd, BOOL enable) | void | EnableWindow wrapper | FRAMEWORK |
| 005BC019 | stub | FUN_005bc019 | set_window_data | 2 (int wnd, u4 data) | void | Sets wnd+0x40 = data | FRAMEWORK |
| 005BC032 | small | FUN_005bc032 | is_window_visible | 1 (int wnd) | u4 (bool) | IsWindowVisible wrapper | FRAMEWORK |
| 005BC07E | small | send_msg_C07E | close_window | 1 (int wnd) | void | Sends WM_CLOSE (0x10) to window | FRAMEWORK |
| 005BC0AB | medium | manage_window_C0AB | destroy_game_window | 1 (u4* wnd) | u4 (0) | Destroys window: removes from stack, ShowWindow(SW_HIDE), SetMenu(NULL), DestroyWindow. Deletes brush at [5]. Frees struct memory | HIGH |
| 005BC173 | small | FUN_005bc173 | enumerate_windows | 0 | void | Iterates DAT_006366cc window count (empty loop body - likely debug/assertion only) | LOW |
| 005BC1B5 | stub | FUN_005bc1b5 | push_window_stack | 1 (u4 hwnd) | void | Adds HWND to window stack array (DAT_006d1db8), increments DAT_006366cc | MEDIUM |
| 005BC1DB | medium | FUN_005bc1db | pop_window_stack | 1 (int hwnd) | void | Removes HWND from window stack, shifts remaining entries down. String: "Error: MS window stack inaccurat..." | MEDIUM |
| 005BC280 | medium | update_palette_C280 | set_window_background | 2 (int wnd, byte palette_idx) | void | Creates solid brush from palette color. Handles both 8-bit palette (DAT_00638b48==1, PALETTEINDEX) and true-color modes. Invalidates window | HIGH |
| 005BC35E | small | invalidate_C35E | set_window_bg_rgb | 4 (int wnd, byte r, byte g, byte b) | void | Creates solid brush from RGB, invalidates window | MEDIUM |
| 005BC3BF | stub | FUN_005bc3bf | set_window_callback_a | 2 (int wnd, u4 callback) | void | Sets wnd+0x24 = callback | FRAMEWORK |
| 005BC3D8 | stub | FUN_005bc3d8 | set_window_callback_b | 2 (int wnd, u4 callback) | void | Sets wnd+0x28 = callback | FRAMEWORK |
| 005BC3F1 | stub | FUN_005bc3f1 | set_window_callback_c | 2 (int wnd, u4 callback) | void | Sets wnd+0x2C = callback | FRAMEWORK |
| 005BC40A | small | manage_window_C40A | show_window | 1 (int wnd) | void | ShowWindow(SW_SHOW). BringWindowToTop if flag byte+0x49 bit 2 | FRAMEWORK |
| 005BC44D | small | manage_window_C44D | hide_window | 1 (int wnd) | void | ShowWindow(SW_HIDE) | FRAMEWORK |
| 005BC476 | small | FUN_005bc476 | set_window_title | 2 (int wnd, LPCSTR title) | void | SetWindowTextA wrapper | FRAMEWORK |
| 005BC4A1 | small | FUN_005bc4a1 | move_window | 3 (int wnd, int x, int y) | void | Moves window preserving current size | FRAMEWORK |
| 005BC505 | medium | FUN_005bc505 | resize_window_client | 3 (int wnd, int w, int h) | void | Resizes window to fit given client area. Accounts for non-client chrome. Handles child windows with MapWindowPoints | MEDIUM |
| 005BC5DA | small | manage_window_C5DA | maximize_window | 1 (int wnd) | void | ShowWindow(SW_MAXIMIZE=3) | FRAMEWORK |
| 005BC603 | small | FUN_005bc603 | is_window_maximized | 1 (int wnd) | BOOL | IsZoomed wrapper | FRAMEWORK |
| 005BC636 | small | manage_window_C636 | minimize_window | 1 (int wnd) | void | ShowWindow(SW_MINIMIZE=6) | FRAMEWORK |
| 005BC65F | small | FUN_005bc65f | is_window_minimized | 1 (int wnd) | BOOL | IsIconic wrapper | FRAMEWORK |
| 005BC692 | small | manage_window_C692 | restore_window | 1 (int wnd) | void | ShowWindow(SW_RESTORE=9) | FRAMEWORK |
| 005BC6BB | small | FUN_005bc6bb | validate_window_rect | 2 (int wnd, RECT* r) | void | ValidateRect wrapper | FRAMEWORK |
| 005BC6E6 | small | invalidate_C6E6 | invalidate_window_rect | 2 (int wnd, RECT* r) | void | InvalidateRect wrapper (no erase) | FRAMEWORK |
| 005BC713 | small | FUN_005bc713 | move_window_to_rect | 2 (int wnd, int* rect) | void | MoveWindow using rect coordinates | FRAMEWORK |
| 005BC763 | large | gdi_C763 | center_window | 3 (int wnd, int dx, int dy) | void | Centers window relative to parent or screen. Handles: no parent (center on screen), normal parent (center + offset), child window (center in client area). Applies (dx,dy) offset | MEDIUM |
| 005BC933 | small | FUN_005bc933 | get_client_width | 1 (int wnd) | LONG | GetClientRect wrapper, returns right | FRAMEWORK |
| 005BC96B | small | FUN_005bc96b | get_client_height | 1 (int wnd) | LONG | GetClientRect wrapper, returns bottom | FRAMEWORK |
| 005BC9A3 | small | FUN_005bc9a3 | get_window_rect | 2 (int wnd, RECT*) | void | GetWindowRect wrapper | FRAMEWORK |
| 005BC9D3 | small | FUN_005bc9d3 | get_nonclient_width | 1 (int wnd) | int | Returns window width - client width (frame size) | FRAMEWORK |
| 005BCA3D | small | FUN_005bca3d | get_nonclient_height | 1 (int wnd) | int | Returns window height - client height (frame + caption) | FRAMEWORK |
| 005BCAA7 | small | FUN_005bcaa7 | get_screen_rect | 1 (RECT*) | void | Sets rect to (0,0,SM_CXSCREEN,SM_CYSCREEN) | FRAMEWORK |
| 005BCAD7 | small | FUN_005bcad7 | client_to_screen | 5 (int wnd, LONG x, LONG y, LONG* ox, LONG* oy) | void | ClientToScreen wrapper | FRAMEWORK |
| 005BCB26 | small | FUN_005bcb26 | client_to_parent | 5 (int wnd, LONG x, LONG y, LONG* ox, LONG* oy) | void | MapWindowPoints(wnd, parent, ...) | FRAMEWORK |
| 005BCB85 | medium | FUN_005bcb85 | get_window_rect_in_parent | 2 (int wnd, RECT*) | void | Gets window rect mapped to parent coordinates | FRAMEWORK |
| 005BCC11 | small | update_palette_CC11 | blit_to_screen | 8 (int src, int sx, int sy, int w, int h, int dst, int dx, int dy) | void | BitBlt(SRCCOPY) from src DC to dst screen DC. Handles palette realization | MEDIUM |
| 005BCC8D | small | blit_CC8D | blit_to_surface | 8 | void | BitBlt(SRCCOPY) between DIB DCs (no palette) | MEDIUM |
| 005BCCE2 | small | update_palette_CCE2 | stretch_blit_to_screen | 10 | void | StretchBlt(SRCCOPY) with palette realization | MEDIUM |
| 005BCD66 | small | stretch_blit_CD66 | stretch_blit_to_surface | 10 | void | StretchBlt(SRCCOPY) between DIB DCs | MEDIUM |
| 005BCDC3 | small | FUN_005bcdc3 | select_palette | 2 (int wnd, HPALETTE pal) | void | SelectPalette + sets wnd+0x18 pointer (if 8-bit mode DAT_00638b48==1) | MEDIUM |
| 005BCDFC | small | FUN_005bcdfc | set_window_menu | 2 (int wnd, HMENU menu) | void | SetMenu + resize window to account for menu bar height | MEDIUM |
| 005BCE5F | medium | invalidate_CE5F | set_window_icon | 2 (int wnd, uint icon_id) | void | LoadIcon + DestroyIcon old, InvalidateRect if minimized | FRAMEWORK |
| 005BCEEE | small | FUN_005bceee | load_cursor_resource | 1 (uint id) | HCURSOR | LoadCursorA from app instance (DAT_006e4ff0) | FRAMEWORK |
| 005BCF1C | stub | FUN_005bcf1c | destroy_cursor | 1 (HCURSOR) | void | DestroyCursor wrapper | FRAMEWORK |
| 005BCF40 | stub | FUN_005bcf40 | set_cursor | 1 (HCURSOR) | void | SetCursor wrapper | FRAMEWORK |
| 005BCF5A | small | FUN_005bcf5a | set_window_cursor | 3 (int wnd, HCURSOR cur, int apply) | void | Sets wnd+0x1C cursor, optionally applies via SetCursor | FRAMEWORK |
| 005BCFA0 | stub | FUN_005bcfa0 | show_cursor | 0 | void | ShowCursor(TRUE) | FRAMEWORK |
| 005BCFB8 | stub | FUN_005bcfb8 | hide_cursor | 0 | void | ShowCursor(FALSE) until count < 0 | FRAMEWORK |
| 005BCFDD | small | FUN_005bcfdd | set_cursor_by_id | 3 (int wnd, u4 id, int apply) | void | Loads cursor by ID and sets it | FRAMEWORK |
| 005BD023 | small | FUN_005bd023 | set_cursor_direct | 2 (int wnd, HCURSOR cur) | void | Sets cursor in struct and applies immediately | FRAMEWORK |
| 005BD05F | medium | FUN_005bd05f | load_and_store_cursor | 2 (int wnd, uint id) | void | Loads cursor: -1=arrow (IDC_ARROW), -2=crosshair (IDC_CROSS), >=0=app resource | MEDIUM |
| 005BD0E7 | small | FUN_005bd0e7 | focus_and_raise | 1 (int wnd) | void | SetFocus + BringWindowToTop | FRAMEWORK |
| 005BD120 | small | FUN_005bd120 | focus_window | 1 (int wnd) | void | SetFocus wrapper | FRAMEWORK |
| 005BD14C | small | FUN_005bd14c | disable_parent | 2 (int wnd, int modal_parent) | void | Disables parent window (for modal dialogs) | FRAMEWORK |
| 005BD1C5 | small | FUN_005bd1c5 | enable_parent | 2 (int wnd, int modal_parent) | void | Re-enables parent window (modal dialog closing) | FRAMEWORK |
| 005BD248 | stub | FUN_005bd248 | set_window_timer_a | 2 (int wnd, u4 val) | void | Sets wnd+0x38 | FRAMEWORK |
| 005BD270 | stub | FUN_005bd270 | set_window_timer_b | 2 (int wnd, u4 val) | void | Sets wnd+0x3C | FRAMEWORK |
| 005BD298 | medium | FUN_005bd298 | wait_for_mouse_release | 4 (int wnd, char left, char remove, char loop) | int | Waits for mouse button release. Peeks WM_MOUSE/WM_NCMOUSE. Returns 1 if button was released | MEDIUM |
| 005BD39E | medium | gdi_D39E | check_modifier_key | 1 (int mode) | int | Mode 0x200: checks Ctrl (GetKeyState VK_CONTROL). Mode 0x100: checks Shift. Mode 0x400: drains and checks for WM_SYSKEYDOWN/UP | MEDIUM |
| 005BD48F | small | FUN_005bd48f | get_cursor_pos_client | 3 (int wnd, LONG* x, LONG* y) | void | GetCursorPos + ScreenToClient | FRAMEWORK |
| 005BD4CD | small | FUN_005bd4cd | is_left_button_down | 0 | bool | GetAsyncKeyState(VK_LBUTTON) | FRAMEWORK |
| 005BD500 | small | FUN_005bd500 | is_right_button_down | 0 | bool | GetAsyncKeyState(VK_RBUTTON) | FRAMEWORK |
| 005BD533 | stub | FUN_005bd533 | capture_mouse | 1 (int wnd) | void | SetCapture wrapper | FRAMEWORK |
| 005BD550 | stub | FUN_005bd550 | release_mouse | 0 | void | ReleaseCapture wrapper | FRAMEWORK |
| 005BD566 | medium | FUN_005bd566 | set_topmost_child | 2 (int parent, int child) | void | Validates child is a child of parent, checks SWS_ATTACHED flag (0x200). String: "Window not SWS_ATTACHED...", "Window not a child..." | MEDIUM |
| 005BD610 | stub | FUN_005bd610 | get_window_flags | 0 | u4 | Returns *this (first field = flags/vtable) | FRAMEWORK |

### Cluster: Port/DIB Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BD630 | small | FUN_005bd630 | port_constructor | 0 | u4* (this) | Sets vtable to PTR_FUN_0061d70c, calls port_init(NULL) | MEDIUM |
| 005BD65C | small | FUN_005bd65c | port_alloc_rect | 2 (int w, int h) | void | Creates rect (0,0,w,h) and calls port_alloc | MEDIUM |
| 005BD696 | medium | FUN_005bd696 | port_alloc | 1 (int rect) | u4 | Allocates DIB for port. Cleans up old surface if dirty. Creates DIB via create_dib_35B0. Sets stride, pixel pointer. String: "ERR_PORTALLOCFAILED". Source: "D:\\Ss\\Smeds32\\Port.cpp" line 0x71 | HIGH |
| 005BD7DB | small | FUN_005bd7db | port_load_image | 4 (u4 res_id, u4 pal_start, u4 pal_count, u4 apply_pal) | void | Loads image resource into port. Calls thunk 0x4083f0 then FUN_005bf930 (CvPc format loader) | MEDIUM |
| 005BD813 | medium | FUN_005bd813 | port_init | 1 (int* rect) | void | Initializes port struct. Zeroes all fields (+0x34, +0x40, +0x3c, +0xc, +0x10). If rect provided, sets width=rect.right-left, height=rect.bottom-top and configures clip rects. Sets dirty flag (+0x44=1) | MEDIUM |
| 005BD915 | small | FUN_005bd915 | port_destructor | 0 | void | Destroys port: frees DIB, reinits, clears global ref (DAT_00637e58) | MEDIUM |

### Cluster: Image Format Loaders

These functions load various image formats (IFF/ILBM, TGA, PCX, GIF, BMP) from resources or files into port surfaces.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005BD987 | xlarge | FUN_005bd987 | load_lbm_resource | 4 (u4 id, int pal_start, int pal_count, int apply_pal) | u4 (bool) | Loads IFF/ILBM image from resource. Parses FORM header, BMHD/CMAP/BODY chunks. Supports RLE compression. Validates "FORM" magic, "ILBM" or "PBM " sub-type. String: "LBMS" resource type. Source: "Port.cpp" | HIGH |
| 005BDF7F | large | FUN_005bdf7f | decode_lbm_scanline | 5 (int dest, ushort* header, char* data, int size, int mode) | void | Decodes a single scanline from ILBM data. Mode 0: planar decode, Mode 1: chunky decode. Supports RLE compression (byte-run encoding) | MEDIUM |
| 005BE1B3 | medium | FUN_005be1b3 | decode_rle_row | 4 (int dest, int header, char* src, int count) | void | RLE decode helper: handles byte-run1 compression (run-length and literal spans) | MEDIUM |
| 005BE2C4 | large | FUN_005be2c4 | load_tga_resource | 4 (u4 id, uint pal_start, int pal_count, u4 apply_pal) | u4 (bool) | Loads Targa (.TGA) image from resource. Supports uncompressed 8-bit and 24-bit color table. String: "TARG" resource type, "Targa Compression Not Implemente..." | HIGH |
| 005BE595 | xlarge | FUN_005be595 | load_tga_file | 4 (u4 filename, uint pal_start, int pal_count, u4 apply_pal) | void | Loads Targa from external file. Same as load_tga_resource but uses file I/O | MEDIUM |
| 005BE940 | stub | FUN_005be940 | tga_file_cleanup | 0 | void | Calls FUN_005d7c6e (file close) | FRAMEWORK |
| 005BE956 | stub | FUN_005be956 | tga_file_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |
| 005BE967 | large | FUN_005be967 | load_pcx_resource | 4 (u4 id, int pal_start, int pal_count, u4 apply_pal) | u4 (bool) | Loads PCX image from resource. Validates header (byte 0 = 0x0A), supports 8-bit 256-color. Reads RLE-encoded pixel data. String: "PCXS" resource type | HIGH |
| 005BEC8C | xlarge | FUN_005bec8c | load_pcx_file | 4 (u4 filename, int pal_start, int pal_count, u4 apply_pal) | void | Loads PCX from external file. Same logic as resource version. Source: "Port.cpp" | MEDIUM |
| 005BF04A | stub | FUN_005bf04a | pcx_file_cleanup | 0 | void | Calls FUN_005d7c6e (file close) | FRAMEWORK |
| 005BF060 | stub | FUN_005bf060 | pcx_file_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |
| 005BF071 | xlarge | FUN_005bf071 | load_gif_file | 4 (u4 filename, int pal_start, uint pal_count, int apply_pal) | void | Loads GIF from external file. Validates "GIF" signature, reads global color table, finds Image Block (',' or '!'). Calls FUN_005e4d60 (LZW decode). String: "Error: GIF resource not found", "Error: GIF Image Block not found..." Source: "Port.cpp" | HIGH |
| 005BF5BA | stub | FUN_005bf5ba | gif_file_cleanup | 0 | void | Calls FUN_005d7c6e | FRAMEWORK |
| 005BF5D0 | stub | FUN_005bf5d0 | gif_file_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |
| 005BF5E1 | xlarge | FUN_005bf5e1 | load_gif_resource | 4 (u4 id, int pal_start, uint pal_count, int apply_pal) | u4 (bool) | Loads GIF from resource. Same as file version. String: "GIFS" resource type | HIGH |
| 005BF930 | large | FUN_005bf930 | load_cvpc_resource | 4 (u4 id, u4 pal_start, u4 pal_count, int apply_pal) | u4 (bool) | Loads CvPc format image. String: "CvPc" resource type. Reads width/height as big-endian shorts, calls FUN_005e4d60 for LZW decompression | MEDIUM |
| 005BFAD9 | large | FUN_005bfad9 | load_bmp_resource | 4 (u4 id, uint pal_start, int pal_count, int apply_pal) | u4 (bool) | Loads Windows BMP from resource. Only supports 8-bit uncompressed. Reads palette (4 bytes per entry at +0x28), pixel data at +0x428. String: "Bitmap resource not found", "Bitmap compression not suppo..." | HIGH |
| 005BFCFF | xlarge | FUN_005bfcff | load_bmp_file | 4 (u4 filename, uint pal_start, int pal_count, int apply_pal) | void | Loads BMP from external file. Same as resource version. Source: "Port.cpp" | MEDIUM |
| 005C000D | stub | FUN_005c000d | bmp_file_cleanup | 0 | void | Calls FUN_005d7c6e | FRAMEWORK |
| 005C0023 | stub | FUN_005c0023 | bmp_file_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |

---

## SUMMARY

### 1. Function Counts

**Total functions: 134**

| Category | Count | Description |
|----------|-------|-------------|
| Unit Stack Management | 15 | Linked-list traversal, counting, querying |
| Unit Placement/Network | 14 | Create, delete, move, relocate (all network-aware) |
| Unit Status/Orders | 9 | Movement points, orders, readiness checks |
| Zone of Control/Adjacency | 8 | ZOC, adjacent enemy detection, visibility |
| Transport/Ship Loading | 5 | Ship boarding, cargo management |
| Map Data Alloc/IO | 5 | Map buffer allocation, save/load |
| Map Tile Accessors | 17 | get/set for all 6 tile bytes |
| Map Tile Setters (Network) | 8 | Network-synchronized tile mutations |
| Network Map Sync | 4 | Batch/flush map update protocol |
| Map Complex Queries | 5 | Resources, goody huts, terrain generation |
| Per-Continent Data | 2 | Tech knowledge per continent |
| Scenario Editor UI | 11 | Editor window, controls, painting |
| Text Rendering | 8 | Text drawing with shadow/alignment |
| Surface/Port Management | 16 | Offscreen surfaces, scrolling, DIB |
| Window Management (GDI) | 48 | Window creation, manipulation, message pump |
| Image Format Loaders | 16 | LBM, TGA, PCX, GIF, BMP loaders |
| Framework/SEH stubs | ~18 | SEH epilogs, cleanup thunks |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_005b3d06 (`create_unit`)** - Complete unit creation logic: slot allocation, counter maintenance, initial state setup, tutorial triggers, network synchronization. Essential for understanding game mechanics.

2. **FUN_005b4391 (`delete_unit`)** - Complete unit deletion: counter decrements, stack unlinking, civ-death check, goto cleanup. Paired with create_unit.

3. **FUN_005b2a39 (`calc_unit_movement_points`)** - Movement point calculation with tech bonuses, wonder effects, and damage proportional reduction. Critical for movement mechanics.

4. **FUN_005b542e (`load_unit_onto_ship`)** - Transport loading logic with capacity checks, domain filtering, and multi-pass loading for cargo vs escort. Complex game mechanic.

5. **FUN_005b7fe0 (`alloc_map_data`)** - Complete map memory layout: tile data (6 bytes per tile), 7 per-civ visibility arrays, 4 quarter-map buffers. Foundation for all map operations.

### 3. New DAT_ Globals Identified (High Confidence)

| Address | Proposed Name | Evidence |
|---------|--------------|---------|
| DAT_006d1160 | map_width (short) | Used as map dimension in alloc/save/load, tile offset math |
| DAT_006d1162 | map_height (short) | Paired with map_width |
| DAT_006d1164 | map_tile_count (int) | = (width/2)*height, used for buffer sizes |
| DAT_006d1168 | map_seed (ushort) | Resource/goody-hut hash seed, initialized from timer |
| DAT_006d116a | map_quarter_width (short) | = (width+3)/4, for quarter-map buffers |
| DAT_006d116c | map_quarter_height (short) | = (height+3)/4 |
| DAT_006d1170 | map_tile_handle | Memory handle for 6*tile_count byte main buffer |
| DAT_00636598 | map_tile_data_ptr | Locked pointer to tile data |
| DAT_006365a0 | civ_vis_handles[8] | Per-civ visibility buffer handles (index 1-7) |
| DAT_006365c0 | civ_vis_ptrs[8] | Per-civ visibility locked pointers |
| DAT_006365e0-ec | quarter_map_ptrs[4] | Four quarter-map buffer pointers |
| DAT_006d1174-80 | quarter_map_handles[4] | Four quarter-map buffer handles |
| DAT_006365f0 | map_allocated_flag (byte) | 1 when map buffers allocated |
| DAT_006365f4 | map_batch_count | Count of entries in network batch buffer |
| DAT_006365f8 | map_batch_sizes[8] | Size (in dwords) of each batch update type |
| DAT_006d1188 | dummy_tile[6] | 6-byte dummy tile returned for out-of-bounds |
| DAT_006d1190 | map_batch_buffer[0x100] | Network batch update buffer (0x400 bytes) |
| DAT_006ad699 | net_map_immediate_mode (byte) | 1 = send tile updates immediately |
| DAT_006ad69a | net_map_batch_mode (byte) | 1 = queue tile updates into batch buffer |
| DAT_006ced4c | zoc_detected_civ | Civ ID detected in zone of control check |
| DAT_006ced50 | nearest_unit_distance | Distance to nearest unit (from find_nearest_unit) |
| DAT_006a4f88 | editor_window_ptr | Pointer to scenario editor CPropertySheet |
| DAT_006a1d7c | editor_active_flag | 1 while editor loop is running |
| DAT_006a1d80 | editor_control_id_counter | Incrementing ID for editor controls |
| DAT_006366cc | window_stack_count | Count of managed windows in stack |
| DAT_006d1db8 | window_stack[N] | Array of HWNDs in window stack |
| DAT_006366a8 | text_draw_target | Target surface for text rendering |
| DAT_006366ac | text_draw_source | Source surface for text rendering |
| DAT_006366c0 | text_outline_flag (uint) | Text outline/glow enable (0 or 1) |
| DAT_00638b48 | palette_mode_flag | 1 = 8-bit paletted mode, 0 = true color |
| DAT_006e4ff0 | app_hinstance | Application HINSTANCE (for LoadIcon/LoadCursor) |
| DAT_006366d0 | window_class_name | "MSWindowClass" - registered window class name |
| DAT_00655afe | current_active_unit (short) | Currently selected/active unit slot ID |
| DAT_00655b05 | current_player_byte (byte) | Current player civ ID (byte version) |
| DAT_00655b12 | revealed_tile_count | Count of revealed tiles on map |
| DAT_00627fd8 | next_unit_sequence_id | Monotonically incrementing unit unique ID |
| DAT_006ad8bc-DAT_006ad904 | net_operation_flags | Per-operation reentrancy guards for network unit ops |
| DAT_006c90c0-DAT_006c9120 | net_operation_results | Per-operation result codes from network responses |
