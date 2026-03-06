# Function Audit: block_004A0000.c (0x004A0000 - 0x004AFFFF)

Source: `civ2.exe` (Civilization II Multiplayer Gold Edition)
Decompiled by Ghidra 12.0.3

---

### Cluster: Text/Label File I/O (GAME.TXT / LABELS.TXT Parser)

These functions implement the game's text file parser for reading labeled sections from `.TXT` data files (GAME.TXT, LABELS.TXT, etc.). They use `DAT_0062cd20` (FILE*), `DAT_00679640` (256-byte line buffer), and `DAT_00673f14` (current parse position pointer). The `@SECTION` convention and comma-delimited token parsing is characteristic of Civ2's text file format.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a2020 | small | FUN_004a2020 | close_text_file | void | void | Closes DAT_0062cd20 (FILE*) and sets it to NULL | HIGH |
| 004a2055 | large | FUN_004a2055 | open_text_file_section | int filename, int section_name | int (0=success, 1=fail) | Opens a text file, optionally seeks to `@SECTION` header. Tries game dir then cwd. Uses fgets+strcmpi to match section labels. | HIGH |
| 004a2379 | small | FUN_004a2379 | open_text_file_section_fallback | u4 filename, u4 section | int | Wrapper: tries open_text_file_section, on failure swaps DAT_0064bb08/DAT_00655020 dirs and retries | MEDIUM |
| 004a23fc | small | FUN_004a23fc | read_next_line | int strip_mode | char* (NULL=EOF) | Reads next line from open text file via fgets into DAT_00679640. If strip_mode=1, trims whitespace. Sets DAT_00673f14 parse pointer. Returns NULL and closes file on EOF. | HIGH |
| 004a24b1 | small | FUN_004a24b1 | parse_next_token | void | char* | Extracts next comma-delimited token from DAT_00673f14 into DAT_00673e10 buffer. Advances pointer past delimiter. Trims whitespace. | HIGH |
| 004a2534 | stub | FUN_004a2534 | parse_and_discard_token | void | void | Calls parse_next_token then discards result (calls FUN_00564bf0, probably skip/consume) | MEDIUM |
| 004a2552 | stub | FUN_004a2552 | skip_to_end_of_line | void | void | Sets DAT_00673f14 to end of DAT_00679640 string (skips remaining tokens on line) | HIGH |
| 004a257a | stub | FUN_004a257a | read_line_as_int | void | int | Reads next line, converts entire line to integer via FUN_00428a95 (atoi-like) | MEDIUM |
| 004a25aa | stub | FUN_004a25aa | parse_token_as_int | void | int | Parses next token, converts to integer via FUN_00428a95 | MEDIUM |
| 004a25d5 | small | FUN_004a25d5 | parse_token_as_binary | void | short | Parses next token as binary string ("01101...") into a short value | HIGH |
| 004a2645 | small | FUN_004a2645 | open_file_skip_lines | u4 file, u4 section, int skip_count | int | Opens text file section, skips `skip_count` lines, then closes file. Returns 0=success. | MEDIUM |
| 004a26bf | small | FUN_004a26bf | parse_token_and_alloc_string | u4 param_1 | u4 (string ptr) | Parses next token, allocates string copy via FUN_00428b68 (alloc_string) | MEDIUM |

---

### Cluster: Civilization Score Calculation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a28b0 | xlarge | FUN_004a28b0 | calc_civ_score | int civ_id | int (score) | Calculates civilization score. Components: population from cities (DAT_00673f78), wonders owned (DAT_00673f5c, +20 each), pollution (DAT_00673f84), map exploration (DAT_00673f60), spaceship bonus (DAT_00673f58), global warming (DAT_00673f8c, after turn 199), future tech bonus (DAT_00673f6c, 5 per future tech), difficulty modifier (DAT_00673f74). For solo victory (only civ alive), adds time-based bonus (DAT_00673f7c). Alpha Centauri scenario mode uses city-count relative ranking with tiered bonuses (0/250/500/750/1000). Population uses city size + happy - unhappy. | HIGH |

---

### Cluster: Rules Editor / Customization Dialog

These functions manage the rules/scenario editor dialog. They read/write leader data, government names, commodity names, and civ attributes between game structures and editor buffers. DAT_006a1d88 stores editor string arrays, DAT_006a2d28 stores editor numeric arrays (stride 0x58).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a3060 | large | FUN_004a3060 | load_rules_to_editor | void | void | Copies leader names (FUN_00493c7d/FUN_00493d13), government names (DAT_0064b9a0), commodity names (DAT_0064b168) from game structs into editor buffers (DAT_006a1d88, DAT_006a1b98, DAT_006a1cd8). Iterates 21 leader slots, 7 govts, 16 commodities. | HIGH |
| 004a3426 | large | FUN_004a3426 | save_editor_to_rules | void | void | Reverse of load_rules_to_editor: copies editor buffers back into game rule structures (govt names, commodity names, leader portrait data). | HIGH |
| 004a3640 | small | FUN_004a3640 | update_editor_controls_from_game | void | void | Updates editor dialog controls (type 9=text, type 12=numeric) from current game state. References DAT_006a4f88 (editor dialog ptr). | MEDIUM |
| 004a3757 | small | FUN_004a3757 | update_game_from_editor_controls | void | void | Reads editor dialog controls back into game data. Reverse of update_editor_controls_from_game. | MEDIUM |
| 004a3889 | stub | FUN_004a3889 | refresh_editor_display | void | void | Wrapper: calls FUN_004a4f89 (paint_editor_screen) | MEDIUM |
| 004a38a4 | medium | FUN_004a38a4 | write_govt_rules_to_file | FILE* file | int (1) | Writes 7 government entries to file with formatted columns (name, male title, female title). Uses FUN_00428b0c (get_improvement_name) for string lookups. | HIGH |
| 004a3a21 | xlarge | FUN_004a3a21 | write_leader_rules_to_file | FILE* file, u4 text_stream | int (1) | Writes all 21 leader entries to file with extensive formatting (city style, leader name, color, aggression, expansion, etc). Very large due to repeated abs() patterns for signed short fields. | HIGH |
| 004a41d8 | small | FUN_004a41d8 | write_commodity_rules_to_file | FILE* file | int (1) | Writes 16 commodity names to file, one per line | HIGH |
| 004a4249 | medium | show_messagebox_4249 | save_rules_and_notify | void | void | Saves editor changes: updates game from controls, writes rules sections (GOVERNMENTS, LEADERS, CARAVAN), shows error messagebox on failure ("Error updating RULES"), invalidates object cache. | HIGH |

---

### Cluster: Commodity / Government / Title Name Editor Dialogs

These are MFC dialog wrappers for editing commodity names, government names, and leader titles. They use CSocket::Create for dialog creation and FUN_0051d63b for network-aware string editing.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a4304 | large | FUN_004a4304 | edit_commodity_names_dialog | void | void | MFC dialog for editing 16 commodity names (DAT_006a1cd8, stride 10). String "COMMONAME". SEH frame. | HIGH |
| 004a44a2 | stub | FUN_004a44a2 | destroy_commodity_dialog | void | void | SEH cleanup: calls FUN_0059df8a (dialog destructor) | MEDIUM |
| 004a44b8 | stub | FUN_004a44b8 | seh_unwind_commodity | void | void | SEH unwind handler (restores FS register) | MEDIUM |
| 004a44c6 | large | FUN_004a44c6 | edit_govt_names_dialog | void | void | MFC dialog for editing 7 government names (DAT_006a1b98, stride 0xf). String "GOVTNAME". | HIGH |
| 004a4667 | stub | FUN_004a4667 | destroy_govt_dialog | void | void | SEH cleanup for govt name dialog | MEDIUM |
| 004a467d | stub | FUN_004a467d | seh_unwind_govt | void | void | SEH unwind handler | MEDIUM |
| 004a468b | large | show_title_screen | edit_title_names_dialog | void | void | MFC dialog for editing 14 title names (male/female pairs for 7 govts). String "TITLENAME". Uses odd/even indexing for male/female. Already named show_title_screen but this is actually a title editor. | HIGH |
| 004a4948 | stub | FUN_004a4948 | destroy_title_dialog | void | void | SEH cleanup for title name dialog | MEDIUM |
| 004a495e | stub | FUN_004a495e | seh_unwind_title | void | void | SEH unwind handler | MEDIUM |
| 004a496c | small | FUN_004a496c | edit_tribes_dialog | void | void | Opens tribe/civ customization dialog. String "TRIBES". Uses FUN_004190d0. | HIGH |

---

### Cluster: Editor Event Handlers & Painting

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a49cb | stub | FUN_004a49cb | invalidate_editor | void | void | Clears DAT_006a1d7c flag, invalidates object cache via CRichEditDoc method. | MEDIUM |
| 004a49f3 | small | FUN_004a49f3 | handle_editor_button | int button_id | void | Handles editor dialog button clicks (0xC9=select leader portrait+refresh, 0xCA=just refresh). | MEDIUM |
| 004a4a58 | xlarge | FUN_004a4a58 | create_editor_dropdown | int dropdown_type | void | Creates dropdown/listbox controls in editor dialog. Type 0=leader list (21 entries), 1-4=attribute selection lists (colors, styles, personalities, etc). Uses in_ECX as dialog struct, references DAT_00628420 string table. | MEDIUM |
| 004a4eb2 | small | FUN_004a4eb2 | create_editor_textfield | int field_index | void | Creates a text input field in the editor dialog at computed position. | MEDIUM |
| 004a4f89 | xlarge | FUN_004a4f89 | paint_editor_screen | void | void | Paints the rules/scenario editor screen. Draws background, leader portrait (64x64), government flag sprite, civ title text, section labels (string IDs 0x25d, 0x219, 0x249, 0x1e5, 0x24a, 0x24b), bordered panels. Uses set_text_style(10,10,0,0). | HIGH |

---

### Cluster: Scenario Editor Main Dialog

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a54d9 | xlarge | FUN_004a54d9 | open_scenario_editor | void (CPropertySheet* this) | void | Main scenario editor initialization. Creates editor window (560x380), loads EDITORSA.GIF, creates 6 buttons (OK, Cancel, Help at top; 3 more at bottom), sets up dropdowns and text fields, enters modal event loop (while DAT_006a1d7c!=0). On exit, cleans up bitmap. | HIGH |
| 004a5d6e | stub | FUN_004a5d6e | destroy_scenario_editor | void | void | Cleanup wrapper for scenario editor (calls FUN_005c656b) | MEDIUM |
| 004a5d84 | stub | FUN_004a5d84 | seh_unwind_scenario_editor | void | void | SEH unwind handler | MEDIUM |
| 004a5d92 | small | FUN_004a5d92 | show_scenario_editor | void | void | SEH wrapper: calls open_scenario_editor with bitmap setup/teardown | MEDIUM |
| 004a5deb | stub | FUN_004a5deb | destroy_bitmap_wrapper | void | void | Calls FUN_004183d0 (bitmap destructor) | MEDIUM |
| 004a5e01 | stub | FUN_004a5e01 | seh_unwind_bitmap | void | void | SEH unwind handler | MEDIUM |

---

### Cluster: Cheat/Debug Text Measure + Editor Scrollbar

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a6980 | stub | FUN_004a6980 | get_text_width | void | int | Wrapper calling FUN_00407f90 (text width measurement) | LOW |
| 004a69b0 | medium | FUN_004a69b0 | init_editor_scrollbar | void (in_ECX=this) | void | Initializes unit/production scrollbar in editor. Sets up scroll range by groups of 9 (DAT_006a85a4 % 9). Calls FUN_00451bf0, FUN_004923c0, FUN_004518d0, FUN_004f6646. | MEDIUM |

---

### Cluster: Civilopedia/Help Display Functions

These functions render civilopedia entries, displaying tech prereqs, improvement descriptions, and terrain info using the game's embedded string tables and sprite drawing.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a6b80 | small | FUN_004a6b80 | show_tech_help | u4 surf, u4 x, u4 y, int tech_id, u4 flags | void | Displays tech help entry. Computes offset into tech table (DAT_00627684+tech_id*0x10) using category+era fields (bytes at +0x08, +0x09), indexes into DAT_00646cb8 string array. | HIGH |
| 004a6bdc | small | FUN_004a6bdc | show_improvement_help | u4 surf, u4 x, u4 y, int imp_id, u4 flags | void | Displays improvement/wonder help. For imp<39, uses DAT_00645160 (stride 0x3c). For imp>=39 (wonders), uses DAT_00645a84 with adjusted index. | HIGH |
| 004a6c4b | stub | FUN_004a6c4b | show_terrain_help | u4 surf, u4 x, u4 y, int terrain_id, u4 flags | void | Displays terrain help entry from DAT_00641848 (stride 0x3c). | HIGH |
| 004a6c85 | stub | FUN_004a6c85 | draw_city_sprite_in_help | u4 surf, u4 x, u4 y, u4 unused, int style, u4 flags | void | Draws a city sprite (FUN_0056d289) with screen-size adjustment (DAT_00633584). | MEDIUM |
| 004a6cc5 | medium | FUN_004a6cc5 | show_city_style_picker | uint id, int parent, char* template, u4 title | void | Creates a city style selection dialog. Uses CSocket::Create, FUN_005cdea1 for sizing. Stores result in DAT_00631edc. | MEDIUM |
| 004a6dc9 | stub | FUN_004a6dc9 | destroy_city_picker | void | void | Cleanup: calls FUN_005cde4d | MEDIUM |
| 004a6dd2 | stub | FUN_004a6dd2 | destroy_city_picker_2 | void | void | SEH cleanup (FUN_0059df8a) | MEDIUM |
| 004a6de8 | stub | FUN_004a6de8 | seh_unwind_city_picker | void | void | SEH unwind handler | MEDIUM |
| 004a6df7 | stub | FUN_004a6df7 | draw_unit_sprite_in_help | u4 surf, u4 x, u4 y, u4 unused, int unit_type, u4 flags | void | Draws a unit sprite via FUN_0056baff (draw_unit) with param_3=4 (full decorations). Screen-size adjusted. | HIGH |
| 004a6e39 | medium | FUN_004a6e39 | show_unit_type_picker | uint id, int parent, char* template, u4 title | void | Creates a unit type selection dialog. Nearly identical to show_city_style_picker but with unit draw callback. | MEDIUM |
| 004a6f3d | stub | FUN_004a6f3d | destroy_unit_picker | void | void | Cleanup: calls FUN_005cde4d | MEDIUM |
| 004a6f46 | stub | FUN_004a6f46 | destroy_unit_picker_2 | void | void | SEH cleanup | MEDIUM |
| 004a6f5c | stub | FUN_004a6f5c | seh_unwind_unit_picker | void | void | SEH unwind handler | MEDIUM |

---

### Cluster: Character Utility + Game Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a7070 | stub | FUN_004a7070 | toupper_ascii | int char_code | int | Converts lowercase a-z (0x61-0x7a) to uppercase by subtracting 0x20. Custom single-char toupper. | HIGH |
| 004a70b0 | medium | FUN_004a70b0 | init_game_options | void | void | Initializes game options/preferences struct at DAT_0064bc10. Sets defaults: map flags=0x3F, AI level, colors, etc. Checks 10M memory threshold (FUN_00568176) to enable/disable features. References DAT_006ab198 (screen_size_threshold). | MEDIUM |
| 004a71bb | medium | FUN_004a71bb | init_multiplayer_state | void | void | Initializes multiplayer state block at DAT_00666538. Zeros out extensive state arrays including per-player×24 arrays (7×24), chat buffer, diplomatic state flags. | MEDIUM |
| 004a733d | small | FUN_004a733d | load_civ2_dat | void | void | Loads CIV2.DAT preferences file. Reads 0x48 bytes into DAT_0064bc10 (game options) and 0x1BC bytes into DAT_00666538 (multiplayer state). Falls back to init defaults on failure. | HIGH |
| 004a73d9 | small | FUN_004a73d9 | save_civ2_dat | void | int (0=success, 1=fail) | Writes game options + multiplayer state to CIV2.DAT. Deletes file on write failure. | HIGH |

---

### Cluster: Spaceship Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a74bc | small | FUN_004a74bc | reset_spaceship | int civ_id | void | Zeros spaceship data for civ: flags, structural/propulsion/fuel counts at civ[civ_id]+0x594 offsets (+0x00 flags, +0x06 pollution_total, +0x04 research_accum, +0x02 gold, +0x08 to +0x13 component counts). | HIGH |
| 004a7577 | stub | FUN_004a7577 | has_spaceship_launched | int civ_id | byte (0 or 2) | Returns bit 1 of civ flags (launched flag). Checks (&DAT_0064caa0)[civ_id*0x594] & 2. | HIGH |
| 004a75a6 | stub | FUN_004a75a6 | has_spaceship_built | int civ_id | byte (0 or 1) | Returns bit 0 of civ flags (built flag). Checks (&DAT_0064caa0)[civ_id*0x594] & 1. | HIGH |
| 004a75d5 | small | FUN_004a75d5 | is_spaceship_arriving | int civ_id | int (0 or 1) | Returns 1 if spaceship is launched AND arrival turn (civ+0x02) <= current max turn (DAT_00655afa). | HIGH |
| 004a762d | medium | FUN_004a762d | destroy_spaceship | u4 civ_id | void | Handles spaceship destruction/return event. Shows civ name, plays sound (0x0c=returns, 0x0d=destroyed), displays event text ("SPACERETURNS" or "SPACEDESTROYED"), then resets spaceship data. | HIGH |

---

### Cluster: Kill History + Initial Civ Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a76f5 | small | FUN_004a76f5 | reset_kill_history | void | void | Zeros the kill/destroyed-civ history table. DAT_00655128=count, arrays at DAT_0065512a (turn), DAT_00655142 (killer), DAT_0065515a (name, stride 0x18). Max 12 entries. | HIGH |
| 004a7754 | xlarge | FUN_004a7754 | assign_initial_settler_positions | void | void | Assigns starting settler positions for all 7 AI civs at game start. Evaluates each settler's placement using continent bodyId analysis, distance to nearest same-continent settler, nearby terrain quality (river=+bonus, ocean/grassland checks), continent size scoring. Grants bonus techs to equalize scores (FUN_004c21d5). Uses DAT_006d1160/006d1162 (map width/height). | HIGH |

---

### Cluster: Core Civ Lifecycle (new_civ / kill_civ)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004a7ce9 | xlarge | new_civ | new_civ | int civ_id | int (1=success, 0=failed, -1=too few civs) | Creates/initializes a new civilization. Single-player path: selects tribe from 21 leader slots (DAT_006554fe), randomizes attitudes (10-75 range + difficulty bonus), sets science/tax rates (4/4 or personality-based), initializes tech flags, clears diplomacy, grants free techs based on difficulty, finds valid starting location with extensive terrain quality checks (rivers, continent size, distance from others), places initial settler + explorer units, reveals surrounding tiles. Multiplayer path: sends NM_NEW_CIV network message and waits for ACK. | HIGH |
| 004a93b3 | large | FUN_004a93b3 | expand_city_territory | int city_idx, int tile_count | void | Expands a city's worked/owned territory by claiming `tile_count` nearby tiles. Evaluates unclaimed tiles in city radius (0-20) by terrain quality (ocean=1, forest=4, grassland=3/5, desert=2), preferring inner ring and river tiles (+3). Then reveals all tiles within extended radius (0-45) on same continent. | HIGH |
| 004a9785 | xlarge | FUN_004a9785 | setup_scenario_start | int era | void | Sets up scenario start state for all 8 civs. For each alive civ: grants free techs (Alphabet, Construction, Horseback Riding, Bronze Working), creates initial city (size 3 or 5 depending on era), places defensive + settler units with fortify orders, builds granary, adds improvements based on era (Barracks, Marketplace, etc.), expands territory, finds and settles second city site with road-building between cities. Sets initial turn based on era. | HIGH |

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004aa378 | xlarge | kill_civ | kill_civ | int civ_id, int killer_id | int (0=has cities, 1=killed) | Destroys a civilization. Checks all cities still exist (returns 0 if any remain). If killer_id != -1: shows destruction event, plays sound 0x0E, records kill in history table (turn, killer, victim tribe). Destroys spaceship, kills all units (including unhoming vassals), clears map visibility, removes from active bitmask, sends MP notification, calls new_civ to recycle the slot. For human civs: triggers game-over (DAT_0064b1ac=4). | HIGH |

---

### Cluster: Game Start / New Game Initialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004aa9c0 | xlarge | FUN_004aa9c0 | init_new_game | void | void | Master new-game initialization. Resets kill history, leader usage counts, turn counter, all game state flags (DAT_00655af8=0 turn, DAT_00655b16=0 units, DAT_00655b18=0 cities), initializes 8 civ slots (spaceship, diplomacy, continent data, tech flags), sets wonder cities to -1, initializes random seed, calls new_civ for all 8 civs, calls assign_initial_settler_positions, enforces science/tax rate limits, sets initial gold for difficulty 0. | HIGH |

---

### Cluster: Pathfinding System

Core pathfinding/movement calculation. Uses BFS with a circular buffer (DAT_00673fc8/DAT_006763c8, size 0x900). Cost grid stored in DAT_006ced60. Movement context stored in DAT_0062d03c (unit type), DAT_0062d044 (target civ), DAT_0062d040 (road-only flag), DAT_00673fa0/fa4 (destination x/y).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004abea0 | medium | FUN_004abea0 | direction_from_delta | int dx, int dy | int (0-7, 8=none) | Converts movement delta (dx,dy) to directional index (0-7) by normalizing to sign (-1,0,+1) and matching against DAT_00628350/DAT_00628360 direction tables. Returns 8 if no match. | HIGH |
| 004abfe5 | xlarge | FUN_004abfe5 | find_path | int from_x, int from_y, int max_cost | int (direction 0-7, -1=no path) | Main pathfinding BFS. Builds cost grid from destination (DAT_00673fa0/fa4) outward. Handles map wrapping, terrain costs (ocean for sea units, road/railroad bonuses), ZoC (zone of control), city entry costs, fog of war. Returns best next-step direction from (from_x, from_y) toward destination. Contains debug visualization mode (string "MOVEDEBUG"). | HIGH |
| 004ad01e | small | FUN_004ad01e | get_path_cost | int x, int y | int (cost, 0=unvisited) | Reads movement cost from BFS grid at isometric coordinates, relative to origin DAT_00673fb0/fb4. Grid stored at 0x6cffc0 with 0xC0 stride. | HIGH |
| 004ad076 | small | FUN_004ad076 | set_path_cost | int x, int y, u4 cost | void | Writes movement cost to BFS grid at isometric coordinates. | HIGH |
| 004ad0d1 | medium | FUN_004ad0d1 | calc_path_distance | int x1, int y1, int x2, int y2, int is_sea, u4 max_cost | int (path cost, -1=unreachable) | Calculates pathing distance between two points. First checks Manhattan distance < 23 tiles, then runs find_path with appropriate unit type (type 2 for land, type 0x21 for sea). Handles map wrapping. | HIGH |
| 004ad20f | xlarge | FUN_004ad20f | find_road_path | u4 from_x, u4 from_y, int to_x, int to_y | int (0=no path, 1=found) | Finds path via road/railroad network between two points. Uses separate land/sea connectivity maps (DAT_006365e0/e4/e8). BFS on 4x-scaled grid (DAT_006d116a/c). Updates DAT_00673fa0/fa4 with next waypoint. | MEDIUM |
| 004ad784 | small | FUN_004ad784 | find_adjacent_terrain_type | int x, int y, u4* out_x, int* out_y, int terrain_type | int (0/1) | Searches adjacent tiles (offset 0-1) for matching terrain type (land/ocean). Returns coordinates of found tile. | MEDIUM |
| 004ad822 | large | FUN_004ad822 | find_nearest_road_tile | int x, int y, int is_ocean | bool | Finds nearest road-connected tile from position (x/2, y/2) on the connectivity map. Tries same-tile first, then adjacent 8 directions. Updates DAT_00673fa0/fa4 with result. | MEDIUM |

---

### Cluster: Unit Goto/Movement AI

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004adafc | xlarge | FUN_004adafc | calc_unit_goto_direction | int unit_idx | uint (direction 0-7, -1=stuck, 8=nowhere) | Calculates next movement direction for a unit with goto orders. Reads goto destination from unit+0x12/0x14. For adjacent destinations, uses direction_from_delta. For distant ones, first tries find_path, then find_road_path as fallback. Evaluates all 8 neighbor tiles for best move considering: terrain movement cost, domain compatibility (land/sea/air), ZoC, railroad bonus, hostile territory, transport availability. Cancels goto (sets orders=0xFF) if stuck or would reverse direction. | HIGH |

---

### Cluster: Connectivity Map Access

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004aee90 | stub | FUN_004aee90 | get_land_connectivity | int x, int y | int (ptr to byte) | Returns pointer into land connectivity map: DAT_006365e0 + y*DAT_006d116a + x | HIGH |
| 004aeec0 | stub | FUN_004aeec0 | get_sea_connectivity | int x, int y | int (ptr to byte) | Returns pointer into sea connectivity map: DAT_006365e4 + y*DAT_006d116a + x | HIGH |
| 004aeef0 | stub | FUN_004aeef0 | get_bfs_visited | int x, int y | int (ptr to byte) | Returns pointer into BFS visited map: DAT_006365e8 + y*DAT_006d116a + x | HIGH |

---

### Cluster: String Formatting / Text Builder Utilities

These are small string-building helper functions used throughout the codebase for constructing display text. Each appends a specific separator or formatted value to a string buffer. They all call FUN_005f22e0 (strcat-like).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004aef20 | stub | FUN_004aef20 | clear_string | u1* str | void | Sets first byte of string to 0 (empty string initializer) | HIGH |
| 004aef36 | stub | FUN_004aef36 | append_separator_1 | u4 buf | void | Appends string at DAT_0062d064 (likely "," or " ") to buffer | MEDIUM |
| 004aef57 | stub | FUN_004aef57 | append_separators | u4 buf, int count | void | Calls append_separator_1 `count` times (padding) | MEDIUM |
| 004aef96 | stub | FUN_004aef96 | append_separator_2 | u4 buf | void | Appends DAT_0062d068 | MEDIUM |
| 004aefb7 | stub | FUN_004aefb7 | append_separator_3 | u4 buf | void | Appends DAT_0062d06c | MEDIUM |
| 004aefd8 | stub | FUN_004aefd8 | append_separator_4 | u4 buf | void | Appends DAT_0062d070 | MEDIUM |
| 004aeff9 | stub | FUN_004aeff9 | append_separator_5 | u4 buf | void | Appends DAT_0062d074 | MEDIUM |
| 004af01a | stub | FUN_004af01a | append_separator_6 | u4 buf | void | Appends DAT_0062d078 | MEDIUM |
| 004af03b | stub | FUN_004af03b | append_separator_7 | u4 buf | void | Appends DAT_0062d07c | MEDIUM |
| 004af05c | stub | FUN_004af05c | append_separator_8 | u4 buf | void | Appends DAT_0062d080 | MEDIUM |
| 004af07d | stub | FUN_004af07d | append_separator_9 | u4 buf | void | Appends DAT_0062d084 | MEDIUM |
| 004af09e | stub | FUN_004af09e | append_separator_10 | u4 buf | void | Appends DAT_0062d088 | MEDIUM |
| 004af0bf | stub | FUN_004af0bf | append_separator_11 | u4 buf | void | Appends DAT_0062d08c | MEDIUM |
| 004af0e0 | stub | FUN_004af0e0 | append_separator_12 | u4 buf | void | Appends DAT_0062d090 | MEDIUM |
| 004af101 | stub | FUN_004af101 | append_separator_13 | u4 buf | void | Appends DAT_0062d094 | MEDIUM |
| 004af122 | stub | FUN_004af122 | append_string_by_id | u4 buf, u4 string_id | void | Looks up string by ID (FUN_00428b0c), appends to buffer | MEDIUM |
| 004af14b | stub | FUN_004af14b | append_label_string | u4 buf, int label_idx | void | Looks up string from DAT_00628420 label table by index, appends | MEDIUM |
| 004af174 | stub | FUN_004af174 | append_raw_string | u4 buf, u4 str | void | Directly appends str to buf (thin wrapper around FUN_005f22e0) | HIGH |
| 004af194 | stub | FUN_004af194 | append_highlighted_string | u4 buf, u4 string_id | void | Appends separator_8, then string by ID, then separator_9 (highlight markers) | MEDIUM |
| 004af1d5 | stub | FUN_004af1d5 | append_int | u4 buf, int value | void | Converts int to decimal string via _itoa, appends to buffer | HIGH |
| 004af20a | small | FUN_004af20a | append_binary_byte | u4 buf, int value | void | Converts int to 8-digit binary string (zero-padded), appends to buffer | HIGH |
| 004af284 | stub | FUN_004af284 | append_long | u4 buf, long value | void | Converts long to decimal string via _ltoa, appends to buffer | HIGH |
| 004af2b9 | stub | FUN_004af2b9 | append_gold_amount | u4 buf, u4 amount | void | Appends amount as decimal, then gold icon text (string ID 0x143) | MEDIUM |

---

### Cluster: Diplomacy/Trade Partner Selection Dialog

These functions implement the civ selection listbox used in diplomacy, trade, and intelligence screens. The dialog manages a scrollable list of civilizations with selection state (single, multi, range-select with shift/ctrl).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004af3e0 | xlarge | FUN_004af3e0 | create_civ_listbox | int* rect, int list_index | void | Creates a scrollable civilization list control. Populates with valid trade/diplomacy partners (excludes self, excludes current target, filters by contact unless god mode). Uses MFC CDialog, GetSystemMetrics for scrollbar width. Sets up scroll range and initial selection. | MEDIUM |
| 004af867 | stub | FUN_004af867 | scroll_listbox_up | u4 param | void | Scrolls civ list 0 (first listbox) by calling FUN_004af8a3(0, param) | MEDIUM |
| 004af885 | stub | FUN_004af885 | scroll_listbox_down | u4 param | void | Scrolls civ list 1 (second listbox) by calling FUN_004af8a3(1, param) | MEDIUM |
| 004af8a3 | small | FUN_004af8a3 | scroll_civ_listbox | int list_idx, u4 position | void | Sets scroll position for civ listbox and redraws. Gets dialog parent via FUN_005c62ee. | MEDIUM |
| 004af904 | large | FUN_004af904 | handle_listbox_click | int control_id | void | Handles mouse click on civ listbox item. Supports three selection modes: normal click (deselect all, toggle one), ctrl-click (toggle one, keep others), shift-click (range select from anchor to clicked). Control_id - 0x40F = list_index. | MEDIUM |
| 004afb77 | medium | FUN_004afb77 | hit_test_listbox | int mouse_x, int mouse_y, int list_index | int (item index, or negative) | Hit-tests a point against listbox bounds. Returns item index (accounting for scroll offset) or negative values for out-of-bounds regions (-1=above, -2=below, -3=left, -4=right). | MEDIUM |
| 004afc89 | xlarge | FUN_004afc89 | paint_civ_listbox | int list_index | void | Paints a civ selection listbox. For each visible row: draws background (selected=highlight color, unselected=normal), draws civ flag sprite (FUN_004b0157), renders civ name + adjective text with shadow. Uses DAT_00635a1c/20/24/28/2c for selection colors. If list is empty, shows "none" label (string 0xb84). | MEDIUM |

---

## SUMMARY

### 1. Total Functions: 80

### 2. Breakdown by Category

| Category | Count | Notes |
|----------|-------|-------|
| Game Logic | 25 | Core civ lifecycle (new_civ, kill_civ), scoring, spaceship, initialization |
| AI / Pathfinding | 10 | BFS pathfinder, unit goto, connectivity maps, territory expansion |
| UI / Rendering | 22 | Editor dialogs, listboxes, civilopedia display, text painting |
| File I/O | 14 | Text file parser, RULES.TXT writer, CIV2.DAT persistence |
| String Utilities | 18 | Text builder helpers (append_int, append_string, separators) |
| Framework (SEH/MFC) | 11 | SEH unwind handlers, dialog destructors, MFC wrappers |

*(Some functions counted in multiple categories; totals reflect primary classification.)*

### 3. Top 5 Most Important Undocumented Functions

1. **FUN_004a28b0 (calc_civ_score)** -- 1542 bytes. Complete Civ2 score formula with all components: population, wonders (20 pts each), future techs (5 each), difficulty scaling, spaceship bonus, Alpha Centauri scenario relative-power ranking. Critical for understanding game mechanics.

2. **FUN_004abfe5 (find_path)** -- 4118 bytes. The core BFS pathfinder used by all unit movement. Handles terrain costs, ZoC, domain checks, road/railroad bonuses, wrapping maps. Has an embedded debug visualization mode ("MOVEDEBUG").

3. **FUN_004adafc (calc_unit_goto_direction)** -- 2516 bytes. Unit goto movement director that chains find_path and find_road_path to determine next step. Handles land/sea/air domain transitions, stuck detection, and goto cancellation.

4. **FUN_004a9785 (setup_scenario_start)** -- 3059 bytes. Scenario initialization that creates starting cities, units, improvements, and roads for all civs based on selected era. Documents which techs and buildings each era starts with.

5. **FUN_004aa9c0 (init_new_game)** -- 1345 bytes. Master new-game initialization function that resets all game state and spawns all 8 civilizations. Documents the complete set of game state variables and their initial values.

### 4. New DAT_ Globals Identified (High Confidence)

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_0062cd20 | text_file_handle (FILE*) | Used with fopen/fgets/fclose throughout text parser cluster |
| DAT_00679640 | text_line_buffer (char[256]) | fgets destination, 0xFF max length, used as parse source |
| DAT_00673f14 | text_parse_position (char*) | Pointer within line buffer, advanced by parse_next_token |
| DAT_00673e10 | text_token_buffer (char[]) | Destination for parsed comma-delimited tokens |
| DAT_0062cd24 | rules_filename (char[]) | Used in "Error updating RULES" sprintf |
| DAT_0064bb08 | game_directory (char[]) | Working directory for file I/O, swapped with DAT_00655020 |
| DAT_00655020 | alternate_directory (char[]) | Secondary search path for text files |
| DAT_006a1d7c | editor_active_flag | Set to 1 when editor opens, 0 to exit modal loop |
| DAT_006a4f88 | editor_dialog_ptr (CPropertySheet*) | Main scenario editor dialog pointer |
| DAT_006a1d80 | editor_control_id_counter | Monotonically incrementing control ID (starts at 0xC9) |
| DAT_006ad8f0 | new_civ_in_progress | Set to 1 during new_civ, 0 on exit (reentrance guard) |
| DAT_006ad8f4 | kill_civ_in_progress | Set to 1 during kill_civ, 0 on exit (reentrance guard) |
| DAT_0062e018 | editor_background_bitmap | Bitmap handle for editor background (EDITORSA.GIF) |
| DAT_0064bc10 | game_options_struct (0x48 bytes) | Persisted to CIV2.DAT, loaded by load_civ2_dat |
| DAT_00666538 | multiplayer_state_struct (0x1BC bytes) | Persisted to CIV2.DAT alongside game options |
| DAT_006365e0 | land_connectivity_map | Byte array indexed by (y*width+x) for land pathfinding |
| DAT_006365e4 | sea_connectivity_map | Same structure for sea domain |
| DAT_006365e8 | bfs_visited_map | BFS traversal state for find_road_path |
| DAT_006d116a | connectivity_map_width | Width of land/sea/bfs connectivity maps |
| DAT_006d116c | connectivity_map_height | Height of connectivity maps |
| DAT_00673f78 | score_population_component | Running population total in calc_civ_score |
| DAT_00673f5c | score_wonder_component | Wonder count * 20 in calc_civ_score |
| DAT_00673f84 | score_pollution_penalty | Pollution penalty in calc_civ_score |
| DAT_00673f88 | score_total | Final computed score in calc_civ_score |
| DAT_00673f7c | score_spaceship_bonus | Time-based solo victory bonus |
| DAT_0062d03c | pathfind_unit_type | Unit type ID used for pathfinding cost calculations |
| DAT_0062d044 | pathfind_target_civ | Target civ for pathfinding (ZoC/entry checks) |
| DAT_0062d040 | pathfind_road_only | When nonzero, pathfinder only costs 1 per step (road mode) |
| DAT_00673fa0 | pathfind_dest_x | Pathfinding destination X coordinate |
| DAT_00673fa4 | pathfind_dest_y | Pathfinding destination Y coordinate |
| DAT_00673fc4 | bfs_queue_head | BFS circular buffer read index |
| DAT_00673fbc | bfs_queue_tail | BFS circular buffer write index |
| DAT_00673fc8 | bfs_queue_x (array) | BFS circular buffer X coordinates (size 0x900) |
| DAT_006763c8 | bfs_queue_y (array) | BFS circular buffer Y coordinates (size 0x900) |
| DAT_00673fc0 | pathfind_max_cost_reached | Maximum cost reached during BFS expansion |
| DAT_006ced60 | pathfind_cost_grid | BFS cost grid, 48x48 isometric, 0xC0 stride |
| DAT_0063f660 | min_unit_distance | Minimum distance from new city to existing units |
| DAT_00655afa | max_turn_number | Maximum turn / spaceship arrival deadline |
