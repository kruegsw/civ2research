# Phase 1 Audit: block_00440000.c (0x00440000 - 0x0044FFFF)

## Overview
- **Address range**: 0x00440325 - 0x0044F799
- **Total functions**: 355
- **File size**: 8782 lines of decompiled C

This block contains **four major functional clusters**:
1. **Trade route / caravan logic** (0x440325 - 0x440750)
2. **City production / wonder management** (0x441A79 - 0x442885)
3. **Multiplayer / LAN networking** (0x444310 - 0x446810)
4. **Sprite sheet loading / art initialization** (0x449030 - 0x44B50C)
5. **Throne room** (0x44CC80 - 0x44F799)

The block is ~65% CString static initializer boilerplate (0x447320 - 0x448F78).

---

### Cluster: Trade Routes

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x440325 | small | FUN_00440325 | remove_trade_route | (int cityIdx, int slotIdx) | void | Shifts trade route slots down to remove route at slotIdx. Decrements city+0x3A (num_trade_routes), sets city flag 0x20000. Accesses DAT_0064f37a=city[].num_trade_routes, DAT_0064f384=city[].trade_partner[], DAT_0064f381=city[].trade_route_type[] | MEDIUM |
| 0x4403EC | small | FUN_004403ec | set_trade_route | (int cityIdx, int slot, short partner, int type) | void | Sets trade partner and route type (clamped 0-15 via clamp()), sets city flag 0x20000. Calls thunk_FUN_005adfa0=clamp | MEDIUM |
| 0x440453 | large | FUN_00440453 | establish_trade_route | (int city1, int city2, int commodity) | void | Checks if trade route already exists. If city has <3 routes, adds directly; otherwise replaces lowest-value route. Computes route value based on distance (FUN_00488a45), same-owner bonus, airport check (has_building 0x20=airport). Calls set_trade_route, FUN_0043d400 (recalc city) | MEDIUM |
| 0x440750 | xlarge | FUN_00440750 | process_caravan_arrival | (int unitIdx, int destCityIdx) | void | Major trade function. Computes trade revenue from distance, city trade values, difficulty flags (raging_hordes/flattening), continent check. Handles CARAVAN vs FOODCARAVAN events. Commodity type from unit+0x0D. Bonuses: airports(0x19), tech checks (0x43=Economics?, 0x1E=Trade?), wonder checks. Gold goes to civ+0x02(gold), civ+0x08(research_accum). Food caravans add food. Calls establish_trade_route for demand matching. String refs: "CARAVAN", "FOODCARAVAN", "CARAVANOTHER" | HIGH |

### Cluster: City Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x4413D1 | xlarge | delete_city | delete_city | (uint cityIdx, char silent) | void | Already named. Removes city: zeroes city_id, updates unit home cities (diplomat type 0x09 gets home=-1, sea units try reassign), clears trade routes referencing this city, clears wonder city links (DAT_00655be6), recalcs city radius tiles, notifies nearby civs. MP: sends network packets 0x89/0x8A, waits for server confirmation with timeout. String: "Delete City: Connection to serve..." | HIGH |
| 0x441A79 | small | FUN_00441a79 | check_auto_improvement | (int cityIdx) | int | Returns improvement ID for auto-build. Checks city size >= COSMIC threshold (DAT_0064bcd1/bcd2) and building not present. Returns 9 (aqueduct) or 0x17=23 (sewer system), or 0. | MEDIUM |
| 0x441B11 | xlarge | FUN_00441b11 | change_city_production | (int cityIdx, int newProd) | void | Changes city production. Updates building counts (civ+0x7F4). If switching to/from wonder (production < -0x26): shows STARTWONDER/SWITCHWONDER/ABANDONWONDER messages, handles wonder being started by another civ, gives tech steal bonus on first wonder completion per era. Uses CPropertySheet for dialogs. Computes free shields from difficulty. Network message 0x12-0x14 for wonder events. | HIGH |
| 0x44251D | stub | FUN_0044251d | cleanup_stack_alloc | () | void | Calls thunk_FUN_0059df8a (stack dealloc). SEH epilog helper for change_city_production | LOW |
| 0x442533 | stub | FUN_00442533 | seh_epilog_441b11 | () | void | SEH frame epilog (restores FS:[0]) | LOW |
| 0x442541 | small | FUN_00442541 | reassign_all_city_production | (byte civId, int continent) | void | Iterates all cities owned by civId. If continent >= 0, filters to matching continent via FUN_005b8a81. Calls change_city_production(cityIdx, 99) for each — the 99 triggers auto-select (param_2 > 0x62). | MEDIUM |
| 0x44263F | small | FUN_0044263f | city_adjacent_to_continent | (int cityIdx, int continentId) | bool | Checks 8 neighbors of city tile for matching continent ID. Uses DAT_00628350/00628360 (8-direction dx/dy tables). Returns 1 if any adjacent tile has specified body_id. | MEDIUM |
| 0x44272D | medium | FUN_0044272d | find_best_coastal_continent | (int cityIdx, int *outSize, uint *outDir) | int | Scans 8 directions from city, finding adjacent ocean/continent tiles. Returns continent with largest size (from DAT_00666134=continent_size_table). Skips alternate directions for efficiency. | MEDIUM |
| 0x442885 | small | FUN_00442885 | city_connected_to_continent | (int cityIdx, int continentId) | bool | Checks if city is on or adjacent to specified continent, with path connectivity check (FUN_005b9431). Returns 1 if reachable. | MEDIUM |
| 0x4429AF | small | FUN_004429af | cities_share_coast | (int city1, int city2) | bool | Checks if two cities share a coastal connection — city1's adjacent continents overlap with city2's adjacency. Used for naval trade route validation. | MEDIUM |

### Cluster: Debug / Message Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x444270 | stub | FUN_00444270 | debug_show_message | (int msgId) | void | Calls FUN_004190d0 with "DEBUG" string prefix. Debug-only message display. | HIGH |
| 0x4442A0 | stub | FUN_004442a0 | show_game_popup_3arg | (str key, int p2, int p3) | void | Wrapper: calls FUN_004a6c4b with DAT_006359d4 dialog context. Used for CARAVANOTHER messages. | MEDIUM |
| 0x4442E0 | stub | FUN_004442e0 | show_game_popup_2arg | (str key, int unitIdx) | void | Wrapper: calls FUN_004a6e39 with dialog context. Used for CARAVAN/FOODCARAVAN popups. | MEDIUM |

### Cluster: Multiplayer / LAN Startup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x444310 | xlarge | FUN_00444310 | startup_multiplayer | (int networkType) | void | Master multiplayer startup. networkType: 0=hotseat, 1=LAN, 2=internet, 3=PBEM, 4=scenario. Sets DAT_00655b02 (save_format_version: 3=LAN, 4=hotseat, 5=internet, 6=PBEM). Shows NETWORKTYPE dialog. Initializes map generation params (random seeds for terrain). Loads scenarios. Handles IP address entry, game name, connection. Strings: "NETWORKTYPE", "LANNOT", "LANCONNECTFAIL", "IPVERIFY". XD_ network API calls. | HIGH |
| 0x44525D | stub | FUN_0044525d | cleanup_mp_surface | () | void | SEH cleanup, calls FUN_005c656b | LOW |
| 0x445269 | stub | FUN_00445269 | cleanup_mp_stack | () | void | Calls thunk_FUN_0059df8a (stack dealloc) | LOW |
| 0x44527F | stub | FUN_0044527f | seh_epilog_444310 | () | void | SEH frame epilog | LOW |
| 0x44528E | medium | FUN_0044528e | prompt_ip_address | () | void | Prompts for IP address. Checks DAT_006ad228 config. Uses XD_GetCurrentProtoAddr for auto-detect, otherwise shows IPADDRESS dialog. Stores result in DAT_006665b0. | HIGH |
| 0x445407 | stub | FUN_00445407 | cleanup_ip_stack | () | void | SEH cleanup | LOW |
| 0x44541D | stub | FUN_0044541d | seh_epilog_44528e | () | void | SEH frame epilog | LOW |
| 0x44542C | medium | FUN_0044542c | prompt_net_name | () | void | Prompts for player name via NETNAME dialog. Stores in DAT_00666570. | HIGH |
| 0x44556D | stub | FUN_0044556d | cleanup_netname_stack | () | void | SEH cleanup | LOW |
| 0x445583 | stub | FUN_00445583 | seh_epilog_44542c | () | void | SEH frame epilog | LOW |
| 0x445592 | medium | FUN_00445592 | prompt_game_name | () | void | Prompts for game name via GAMENAME dialog. Stores in DAT_00666550 and DAT_006ad59c. | HIGH |
| 0x4456ED | stub | FUN_004456ed | cleanup_gamename_stack | () | void | SEH cleanup | LOW |
| 0x445703 | stub | FUN_00445703 | seh_epilog_445592 | () | void | SEH frame epilog | LOW |
| 0x445712 | xlarge | FUN_00445712 | load_scenario_mp | () | void | Multiplayer scenario loader. Loads and verifies save file via load_verify_units. Shows SCENARIOLOADED, DIFFICULTY, ADVANCEDMP dialogs. Sets difficulty (DAT_00655b08). Configures advanced MP options (DAT_00654c74-DAT_00654c7c). CSocket::Create for network. Initializes game state. | HIGH |
| 0x445E15 | stub | FUN_00445e15 | cleanup_scen_surface | () | void | SEH cleanup | LOW |
| 0x445E21 | stub | FUN_00445e21 | cleanup_scen_stack | () | void | SEH cleanup | LOW |
| 0x445E37 | stub | FUN_00445e37 | seh_epilog_445712 | () | void | SEH frame epilog | LOW |
| 0x445E46 | xlarge | FUN_00445e46 | join_mp_game | (int networkType) | void | Client-side multiplayer join. Lists active civs, lets player choose one. Sends network message 0x30 (join request). Waits for server response (DAT_006c9078/906c). Handles JOINEDMAX, GAMECANCELED, SERVERCONNECTFAIL, ALREADYCHOSEN errors. Shows GENDER dialog for leader portrait. Sets player civ via DAT_006d1da0, DAT_00655b03, DAT_00655b0b. | HIGH |
| 0x4467FA | stub | FUN_004467fa | cleanup_join_stack | () | void | SEH cleanup | LOW |
| 0x446810 | stub | FUN_00446810 | seh_epilog_445e46 | () | void | SEH frame epilog | LOW |
| 0x447170 | stub | FUN_00447170 | delete_mp_host_obj | (byte flags) | void* | Destructor wrapper: calls FUN_00421fad, conditionally deletes. MP host object cleanup. | LOW |
| 0x4471C0 | stub | FUN_004471c0 | delete_mp_client_obj | (byte flags) | void* | Destructor wrapper: calls FUN_0056e2c9, conditionally deletes. MP client object cleanup. | LOW |
| 0x447210 | small | FUN_00447210 | disable_civ_slot | (int slotIdx) | void | Disables a civ selection slot in MP lobby UI. Clears slot data at offset +0x18, invalidates display. | MEDIUM |
| 0x4472C0 | stub | GetCheckStyle | GetCheckStyle | () | uint | FRAMEWORK. MFC CCheckListBox::GetCheckStyle. Returns value at this+0x40. | HIGH |
| 0x4472F0 | stub | FUN_004472f0 | set_selected_slot | (int slotIdx) | void | Sets selected slot index at offset +0x40 in MP lobby list control. | LOW |

### Cluster: CString Static Initializers (FRAMEWORK)

All functions in address range **0x447320 - 0x448F78** are CString static initialization boilerplate: constructor/destructor iterator pairs with `_atexit` registration. 260+ functions total. Each triplet follows the pattern:
1. Call `_eh_vector_constructor_iterator_` or `CString::CString` on a global data address
2. Register destructor via `_atexit`
3. Destructor calls `_eh_vector_destructor_iterator_` or `FUN_005cde4d`

These initialize global CString arrays used throughout the game for label text, city names, wonder names, etc.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x447320 | stub | FUN_00447320 | init_terrain_labels | () | void | FRAMEWORK. Init 11 CStrings at DAT_00647c40 (terrain type names, stride 0x3C) | HIGH |
| 0x44733A-0x44737F | stub | FUN_0044733a..7f | init_terrain_labels_impl | () | void | FRAMEWORK. Constructor/atexit/destructor for terrain labels | LOW |
| 0x4473A2 | stub | FUN_004473a2 | init_dither_sprites | () | void | FRAMEWORK. Init 52 CStrings at DAT_00640bd8 (dither blend sprites) | LOW |
| 0x447424 | stub | FUN_00447424 | init_coast_sprites | () | void | FRAMEWORK. Init 16 CStrings at DAT_0063f858 (coast quadrant sprites) | LOW |
| 0x4474A6 | stub | FUN_004474a6 | init_coast_sprites2 | () | void | FRAMEWORK. Init 16 CStrings at DAT_006461d8 | LOW |
| 0x447528 | stub | FUN_00447528 | init_coast_sprites3 | () | void | FRAMEWORK. Init 16 CStrings at DAT_00647388 | LOW |
| 0x4475AA | stub | FUN_004475aa | init_coast_sprites4 | () | void | FRAMEWORK. Init 16 CStrings at DAT_006447b0 | LOW |
| 0x44762C | stub | FID_conflict:_$E31 | init_single_cstring_1 | () | void | FRAMEWORK. Init CString at DAT_00646158 | LOW |
| 0x447697 | stub | FUN_00447697 | init_resource_sprites | () | void | FRAMEWORK. Init 2 CStrings at DAT_00644e88 | LOW |
| 0x447719 | stub | FID_conflict:_$E31 | init_single_cstring_2 | () | void | FRAMEWORK. Init CString at DAT_0063fcd8 | LOW |
| 0x447784 | stub | FID_conflict:_$E31 | init_single_cstring_3 | () | void | FRAMEWORK. Init CString at DAT_00647ed8 | LOW |
| 0x4477EF | stub | FID_conflict:_$E31 | init_single_cstring_4 | () | void | FRAMEWORK. Init CString at DAT_00646118 | LOW |
| 0x44785A | stub | FUN_0044785a | init_river_sprites | () | void | FRAMEWORK. Init 32 CStrings at DAT_00643b38 | LOW |
| 0x4478DC | stub | FUN_004478dc | init_misc_sprites_4 | () | void | FRAMEWORK. Init 4 CStrings at DAT_0063fd18 | LOW |
| 0x44795E | stub | FUN_0044795e | init_overlay_sprites | () | void | FRAMEWORK. Init 18 CStrings at DAT_00642710 | LOW |
| 0x4479E0 | stub | FUN_004479e0 | init_improvement_sprites | () | void | FRAMEWORK. Init 3 CStrings at DAT_006446b8 | LOW |
| 0x447A62 | stub | FID_conflict:_$E31 | init_single_cstring_5 | () | void | FRAMEWORK. Init CString at DAT_00641808 | LOW |
| 0x447ACD | stub | FID_conflict:_$E31 | init_single_cstring_6 | () | void | FRAMEWORK. Init CString at DAT_0063fc18 | LOW |
| 0x447B38 | stub | FUN_00447b38 | init_city_flag_sprites | () | void | FRAMEWORK. Init 22 CStrings at DAT_006482f8 | LOW |
| 0x447BBA | stub | FUN_00447bba | init_airbase_sprites | () | void | FRAMEWORK. Init 2 CStrings at DAT_00647fa0 | LOW |
| 0x447C3C | stub | FID_conflict:_$E31 | init_single_cstring_7 | () | void | FRAMEWORK. Init CString at DAT_00645120 | LOW |
| 0x447CA7 | stub | FID_conflict:_$E31 | init_single_cstring_8 | () | void | FRAMEWORK. Init CString at DAT_00648820 | LOW |
| 0x447D12 | stub | FID_conflict:_$E31 | init_single_cstring_9 | () | void | FRAMEWORK. Init CString at DAT_00647788 | LOW |
| 0x447D7D | stub | FID_conflict:_$E31 | init_single_cstring_10 | () | void | FRAMEWORK. Init CString at DAT_00647348 | LOW |
| 0x447DE8 | stub | FID_conflict:_$E31 | init_single_cstring_11 | () | void | FRAMEWORK. Init CString at DAT_00644770 | LOW |
| 0x447E53 | stub | FID_conflict:_$E31 | init_single_cstring_12 | () | void | FRAMEWORK. Init CString at DAT_006480d8 | LOW |
| 0x447EBE | stub | FUN_00447ebe | init_people_sprites | () | void | FRAMEWORK. Init 11 CStrings at DAT_00644b70 | LOW |
| 0x447F40 | stub | FUN_00447f40 | init_editor_sprites | () | void | FRAMEWORK. Init 15 CStrings at DAT_006477c8 | LOW |
| 0x447FC2 | stub | FID_conflict:_$E31 | init_single_cstring_13 | () | void | FRAMEWORK. Init CString at DAT_00644e08 | LOW |
| 0x448047-0x44807E | stub(x3) | FUN_00448047..807E | init_single_cstring_14 | () | void | FRAMEWORK. Init CString at DAT_00644de8 | LOW |
| 0x448098 | stub | FID_conflict:_$E31 | init_single_cstring_15 | () | void | FRAMEWORK. Init CString at DAT_00646088 | LOW |
| 0x448103 | stub | FID_conflict:_$E31 | init_single_cstring_16 | () | void | FRAMEWORK. Init CString at DAT_00648878 | LOW |

*Note: ~150 additional stub functions in 0x44816E-0x448F78 follow the identical CString init pattern. Omitted for brevity — all are FRAMEWORK/LOW confidence.*

### Cluster: City Epoch / Tech Era Determination

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x448F92 | small | FUN_00448f92 | get_city_epoch | (int civId) | int | Returns 0-3 epoch for city sprite selection. Checks tech ownership via FUN_004bd9f0: tech 0x18(24)=Invention + tech 0x05(5)=Philosophy → epoch 3 (Modern?). Tech 0x25(37)=Industrialization → epoch 2. Tech 0x26(38)+tech 0x3C(60) → epoch 1. Else epoch 0. | HIGH |

### Cluster: Sprite Sheet Loading — TERRAIN

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x449030 | xlarge | FUN_00449030 | load_terrain_sprites | () | void | Loads TERRAIN1.BMP/GIF and TERRAIN2.BMP/GIF sprite sheets. Extracts terrain tiles (64x32), dither blend half-tiles, coast quadrants, river overlays, forest/mountain/hill overlays, improvement sprites. Uses grid coordinates with 0x41 (65px) column stride, 0x21 (33px) row stride. Creates render contexts via FUN_005cedad=create_render_ctx. | HIGH |
| 0x44996F | stub | FUN_0044996f | cleanup_terrain_cstring | () | void | SEH cleanup, calls FUN_005cde4d | LOW |
| 0x44997B | stub | FUN_0044997b | cleanup_terrain_cstring2 | () | void | SEH cleanup | LOW |
| 0x44998E | stub | FUN_0044998e | seh_epilog_449030 | () | void | SEH frame epilog | LOW |
| 0x44999C | small | FUN_0044999c | extract_tile_sprite | (ptr dest, int x, int y) | void | Extracts a 64x32 (0x40 x 0x20) sprite from DAT_0063fe08 (loaded sprite sheet) at (x,y). Calls create_render_ctx + FUN_005cf467 (copy to dest surface). | MEDIUM |
| 0x4499D3 | small | FUN_004499d3 | extract_rect_sprite | (ptr dest, int x, int y, int w, int h) | void | Extracts an arbitrary w x h rectangle sprite from loaded sheet. Variable-size version of extract_tile_sprite. | MEDIUM |

### Cluster: Sprite Sheet Loading — ICONS, PEOPLE, EDITORPT

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x449A0E | xlarge | FUN_00449a0e | load_icon_sprites | () | void | Loads ICONS.BMP/GIF. Extracts terrain type thumbnails (11 types at DAT_00644b70), resource icons, trade/science/gold icons, food/shield/trade small icons, citizen sprites (happy/content/unhappy/specialist × 4 moods at DAT_00642d48), improvement miniatures (38 improvements + 28 wonders from grid), unit type icons, government icons, pollution/nuclear markers. Also loads PEOPLE.GIF (citizen graphics) and EDITORPT.GIF (map editor sprites). String refs: ICONS.BMP/GIF, EDITORPT.GIF, PEOPLE.BMP/GIF | HIGH |
| 0x44AB4E | stub | FUN_0044ab4e | cleanup_icons_surface | () | void | SEH cleanup | LOW |
| 0x44AB64 | stub | FUN_0044ab64 | seh_epilog_449a0e | () | void | SEH frame epilog | LOW |
| 0x44AB72 | small | FUN_0044ab72 | extract_32x32_sprite | (ptr dest, int x, int y) | void | Extracts 32x32 sprite. Wrapper for create_render_ctx(64x32→32x32). Used for small icon extracts. | MEDIUM |
| 0x44ABA9 | stub | FUN_0044aba9 | extract_square_sprite | (ptr dest, int x, int y, int size) | void | Extracts size×size sprite. Thin wrapper calling extract_rect_sprite(dest, x, y, size, size). | MEDIUM |
| 0x44ABD5 | stub | FUN_0044abd5 | extract_city_style_sprite | (int styleIdx, int x, int y) | void | Extracts 64x48 city sprite from DAT_006465d8 array (city style sprites). | MEDIUM |
| 0x44AC07 | small | FUN_0044ac07 | extract_48px_sprite | (ptr dest, int x, int y) | void | Extracts 64x48 (0x40 x 0x30) sprite. Used for city and unit sprites which are taller than terrain tiles. | MEDIUM |

### Cluster: Sprite Sheet Loading — CITIES

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x44AC3E | small | FUN_0044ac3e | find_city_blue_marker | (int style, int wallType, int era, int x, int y) | void | Scans city sprite for blue marker pixel (palette index 4) to determine flag/shield anchor position. Stores x-offset in DAT_00640a18 and y-offset in DAT_00640ad8. | MEDIUM |
| 0x44AD47 | small | FUN_0044ad47 | find_city_name_anchor | (int style, int wallType, int era, int x, int y) | void | Similar to blue marker search but looks for palette index 3 (name label anchor). Stores in DAT_00643978/DAT_00643a38. | MEDIUM |
| 0x44AE4C | large | FUN_0044ae4c | load_city_sprites | () | void | Loads CITIES.BMP/GIF. Extracts 6 eras × 4 styles × 2 wall states = 48 city sprites (64x48 each). Also extracts 8 city flag sprites (14x22), fortress/airbase sprites. Calls find_city_blue_marker and find_city_name_anchor for each. Reads palette colors for civ-color data. String refs: CITIES.BMP/GIF | HIGH |
| 0x44B239 | small | FUN_0044b239 | find_unit_blue_marker | (int unitTypeIdx, int x, int y) | void | Scans unit sprite for blue marker pixel (palette 4) to determine shield position. Stores offsets in DAT_00642c48/DAT_00642b48. | MEDIUM |

### Cluster: Sprite Sheet Loading — UNITS

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x44B30E | medium | FUN_0044b30e | load_unit_sprites | () | void | Loads UNITS.BMP/GIF. Extracts 63 (0x3F) unit type sprites (64x48) in 9-column grid (stride 0x41=65px cols, 0x31=49px rows). Also extracts shield template at (0x24A,1) = (586,1) 12x20. Calls find_unit_blue_marker for each. String refs: UNITS.BMP/GIF | HIGH |
| 0x44B49E | small | FUN_0044b49e | load_all_art_sprites | () | void | Master art loader. Calls in order: FUN_0044c5a0 (init surface manager), load_city_sprites, load_icon_sprites, load_terrain_sprites, load_unit_sprites. | HIGH |
| 0x44B4F6 | stub | FUN_0044b4f6 | cleanup_art_surface | () | void | SEH cleanup | LOW |
| 0x44B50C | stub | FUN_0044b50c | seh_epilog_44b49e | () | void | SEH frame epilog | LOW |

### Cluster: Surface/Render Context Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x44C5A0 | small | FUN_0044c5a0 | init_sprite_surface_mgr | () | ptr | Initializes sprite surface manager object. Sets vtable PTR_FUN_0061c060. Clears surface slots at offsets +0x100, +0x110. | MEDIUM |
| 0x44C670 | small | FUN_0044c670 | init_sprite_cache | () | ptr | Initializes sprite cache subsystem. Sets fields at +0xB8-0xC4 (cache parameters). | MEDIUM |
| 0x44C730 | small | FUN_0044c730 | init_render_surface | () | ptr | Initializes render surface. Calls FUN_005db610. Sets default dimensions (0x4000 × 0x4000), clear state. CString for surface name. | MEDIUM |
| 0x44C8B0 | stub | CString::CString | CString_ctor | () | CString* | FRAMEWORK. MFC CString default constructor. | HIGH |
| 0x44C8E0 | small | FUN_0044c8e0 | clear_surface_26dwords | () | void | Zeroes 26 dwords (104 bytes) of surface state. Called by CString constructor internally (misidentified by Ghidra — actually initializes a larger render struct). | LOW |
| 0x44CA40 | stub | FUN_0044ca40 | noop_surface | () | void | Empty function (return only). Placeholder/virtual stub. | LOW |
| 0x44CA60-0x44CAE6 | stub(x4) | FUN_0044ca60..cae6 | destroy_render_surface | () | void | Destructor chain for render surface. SEH protected cleanup. | LOW |
| 0x44CB20-0x44CB71 | stub(x3) | FUN_0044cb20..cb71 | destroy_surface_inner | () | void | Inner destructor for surface subsystem. | LOW |
| 0x44CBA0 | small | FUN_0044cba0 | destroy_sprite_surface_mgr | () | void | Destroys sprite surface manager. Resets vtable, clears slot 0x44. Chains to inner destructors. | LOW |
| 0x44CC01-0x44CC3C | stub(x3) | FUN_0044cc01..cc3c | destroy_cache_chain | () | void | Destructor chain for sprite cache. | LOW |

### Cluster: Throne Room

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x44CC80 | small | FUN_0044cc80 | show_throne_room | (int civIdx) | void | Shows throne room improvement screen. Checks civ+0x430 (throne room state: 7 room slots, each 0-3 level). If any slot < 4, calls throne_room_add_improvement. Also checks throne room flags byte (civ+0x438). Uses DAT_00626810 as throne room UI context pointer. | MEDIUM |
| 0x44CD77 | stub | FUN_0044cd77 | cleanup_throne_ctx | () | void | Calls destroy_throne_context (FUN_0044d027) | LOW |
| 0x44CD8D | stub | FUN_0044cd8d | seh_epilog_44cc80 | () | void | SEH frame epilog | LOW |
| 0x44CD9B | small | FUN_0044cd9b | view_throne_room | (int civIdx) | void | View-only throne room (no adding improvements). Calls init_throne_context + show existing throne. | MEDIUM |
| 0x44CDF2 | stub | FUN_0044cdf2 | cleanup_throne_ctx2 | () | void | SEH cleanup | LOW |
| 0x44CE08 | stub | FUN_0044ce08 | seh_epilog_44cd9b | () | void | SEH frame epilog | LOW |
| 0x44CE16 | medium | FUN_0044ce16 | init_throne_context | (int civIdx) | ptr | Allocates and initializes throne room rendering context. Creates multiple surfaces and sub-objects. Stores civIdx at +0x500. Sets rect (0,0x1C2,0x280,0x1E0) = (0,450,640,480). DAT_00626810 = global throne room pointer. | MEDIUM |
| 0x44D027 | small | FUN_0044d027 | destroy_throne_context | () | void | Destroys throne room context. Clears DAT_00626810. Chains through 7 sub-destructors for surfaces, caches, strings. | MEDIUM |
| 0x44D0D8-0x44D154 | stub(x8) | FUN_0044d0d8..d154 | destroy_throne_sub_N | () | void | Individual sub-destructors in throne context teardown chain. | LOW |
| 0x44D162 | medium | FUN_0044d162 | load_throne_dll | () | bool | Loads "pv.dll" (Palace View DLL). Sets up throne room rendering surface at (640x480). Calls FUN_005c5fc4 for DLL surface init, FUN_005bb4ae for rendering. String: "pv_dll" | HIGH |
| 0x44D296 | xlarge | FUN_0044d296 | throne_room_add_improvement | () | void | Main throne room interaction loop. Loads throne background, displays THRONE text from game text file. Handles user selecting room improvements. Two phases: view current state, then add new piece. Updates civ throne data (civ+0x430 slots or civ+0x438 flags). Sends MP network sync. Strings: "THRONE", "ADDTOTHRONE" | HIGH |
| 0x44D99D | stub | FUN_0044d99d | cleanup_throne_font | () | void | SEH cleanup | LOW |
| 0x44D9B3 | stub | FUN_0044d9b3 | seh_epilog_44d296 | () | void | SEH frame epilog | LOW |
| 0x44D9C1 | small | FUN_0044d9c1 | view_throne_display | () | void | View-only display of current throne room state. Calls load_throne_dll and render, but no user interaction for adding. | MEDIUM |
| 0x44DAB5 | small | FUN_0044dab5 | draw_throne_title | () | void | Draws throne room title text. Shows improvement name from DAT_00628420. Uses shadow text (offset -1,-1 black, then +0,+0 white via FUN_005c19ad/FUN_005c1020). | MEDIUM |
| 0x44DB92 | xlarge | FUN_0044db92 | render_throne_room | () | bool | Renders complete throne room scene. Loads multiple GIF resources (throne room tiles: floors, walls, columns, etc.) using resource IDs computed from throne room state. Composites pieces using create_render_ctx + blit. Structure: 7 room slots (0-6) with level 0-3 each, plus flag bits for extras. Uses DAT_0061c068 table for piece coordinates. Returns 0 on any load failure. | MEDIUM |
| 0x44E762 | stub | FUN_0044e762 | cleanup_throne_cstring | () | void | SEH cleanup | LOW |
| 0x44E76B | stub | FUN_0044e76b | cleanup_throne_surface | () | void | SEH cleanup | LOW |
| 0x44E781 | stub | FUN_0044e781 | seh_epilog_44db92 | () | void | SEH frame epilog | LOW |
| 0x44E790 | xlarge | FUN_0044e790 | throne_room_select_piece | () | int | Interactive throne room piece selection. Shows available improvement options organized by category (floors, walls, extras). Renders preview overlays. Handles click-to-select via FUN_0046ad85. Returns selected piece index or 0 on cancel. | MEDIUM |
| 0x44F498 | stub | FUN_0044f498 | cleanup_select_cstring | () | void | SEH cleanup | LOW |
| 0x44F4A4 | stub | FUN_0044f4a4 | cleanup_select_surface | () | void | SEH cleanup | LOW |
| 0x44F4BA | stub | FUN_0044f4ba | seh_epilog_44e790 | () | void | SEH frame epilog | LOW |
| 0x44F4C9 | medium | FUN_0044f4c9 | throne_room_click | (int clickX, int clickY) | void | Handles mouse click on throne room. In "view" mode (phase 0): invalidates display. In "add" mode (phase 1): maps click to room slot via FUN_0046ad85, validates slot is available. Room slot constraints: slots 4/5 are paired (columns?), checks bitmask for already-built pieces. Plays sound 0x5E. | MEDIUM |
| 0x44F717 | small | FUN_0044f717 | throne_room_keypress | (int keyCode) | void | Handles keyboard input during throne room. Only responds to keys 0xD0-0xD2 in view mode (phase 0). Otherwise plays error sound 0x5E. | MEDIUM |
| 0x44F799 | stub | FUN_0044f799 | throne_room_invalidate | () | void | Invalidates throne room display if active (DAT_00626810 != 0) and in view mode. | LOW |

---

## SUMMARY

### 1. Function Breakdown

| Category | Count | Percentage |
|----------|-------|------------|
| Trade route / caravan logic | 7 | 2% |
| City management (production/wonders/continent) | 10 | 3% |
| Multiplayer / LAN networking | 22 | 6% |
| Debug / message helpers | 3 | 1% |
| Sprite sheet loading / art init | 22 | 6% |
| Throne room | 22 | 6% |
| CString static initializers (FRAMEWORK) | ~230 | 65% |
| Surface/render management | 14 | 4% |
| SEH epilog stubs | ~25 | 7% |
| **Total** | **355** | **100%** |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00440750 (process_caravan_arrival)** — 3144 bytes. Complete trade revenue calculation including distance, tech bonuses, continent connectivity, commodity matching, food caravan special handling. Core economic gameplay mechanic.

2. **FUN_00441B11 (change_city_production)** — 2572 bytes. Wonder production management including STARTWONDER/SWITCHWONDER/ABANDONWONDER events, tech steal on era-first completion, wonder reassignment when city switches away.

3. **FUN_00444310 (startup_multiplayer)** — 3846 bytes. Master MP session initialization covering all network types (hotseat, LAN, internet, PBEM, scenario). Sets save_format_version (3-6), handles map generation, network connection.

4. **FUN_00449030 (load_terrain_sprites)** — 2367 bytes. TERRAIN1/TERRAIN2 sprite extraction with exact grid coordinates. Documents the complete terrain sprite layout.

5. **FUN_00448F92 (get_city_epoch)** — 158 bytes. Maps tech ownership to city sprite era (0-3). Key evidence: Invention(24)+Philosophy(5)=epoch3, Industrialization(37)=epoch2, tech38+tech60=epoch1. Confirms epoch-to-tech mapping.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_006ad2f0 | network_type | Set from param_1 in startup_multiplayer (0=hotseat, 1=LAN, 2=internet, 3=PBEM) |
| DAT_006ad2f8 | network_protocol | Protocol selector (0=direct, 1=IPX, 2=TCP, 3=modem) |
| DAT_006ad63c | game_description_str | Allocated string for game description. Used in MP lobby. |
| DAT_00666544 | network_subtype | Short. Network type sub-option (LAN/internet IPX vs TCP) |
| DAT_006665b0 | ip_address_str | 32-byte buffer for IP address string |
| DAT_00666570 | net_player_name | 32-byte buffer for player network name |
| DAT_00666550 | game_name_str | 32-byte buffer for multiplayer game name |
| DAT_00626810 | throne_room_context | Pointer to active throne room UI context object |
| DAT_0064bcd1 | aqueduct_threshold | COSMIC-adjacent. City size threshold requiring Aqueduct |
| DAT_0064bcd2 | sewer_threshold | COSMIC-adjacent. City size threshold requiring Sewer System |
| DAT_006ad8c8 | city_delete_in_progress | Flag set during delete_city, cleared on completion |
| DAT_00640a18 | city_blue_marker_x | Array [6][4][2] — city sprite flag anchor X offsets |
| DAT_00640ad8 | city_blue_marker_y | Array [6][4][2] — city sprite flag anchor Y offsets |
| DAT_00643978 | city_name_anchor_x | Array [style][wall][era] — city name label X anchors |
| DAT_00643a38 | city_name_anchor_y | Array [style][wall][era] — city name label Y anchors |
| DAT_00642c48 | unit_shield_anchor_x | Array [63] — unit sprite shield X offsets |
| DAT_00642b48 | unit_shield_anchor_y | Array [63] — unit sprite shield Y offsets |
| DAT_0063fe08 | temp_sprite_sheet | Temporary surface for loading sprite sheet GIF/BMP before extraction |
| DAT_0064ca93 | throne_room_slots | Civ struct offset +0x430. Array of 7 bytes: room improvement level (0-3) per slot |
| DAT_0064ca9b | throne_room_flags | Civ struct offset +0x438. Bitmask for throne room extras |
| DAT_006c90c8 | mp_server_response | MP response code from server during delete_city |
| DAT_0061c068 | throne_piece_coords | Table of throne room piece rectangles (x, y, w, h) × pieces × slots |
