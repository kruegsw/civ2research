# Block 00560000 -- Phase 7 Audit

**Functions in this block: 131**
**System: AI diplomacy turn processing, CD-ROM detection, Civilopedia tech tree UI, art resource loading, minimap/status bar rendering, unit info display, tile painting, static initializers**

---

## GL -- Game Logic: AI Diplomacy Turn Processing (3 functions)

FUN_00560084 | 3345B | diplomacy.js — AI diplomacy per-civ turn processing. Iterates all 7 civ pairs, handles revolution triggers, treaty expiration decay (every 32/16/8 turns), ceasefire violations, war termination (WARENDS dialog), and calls FUN_0055c69d for government change, FUN_0055d8d8/FUN_0055d1e2 for diplomatic events. **DISCREPANCY**: The turn-based treaty decay logic (bits cleared at turn multiples 0x1f, 0xf, 0x7) is implemented in JS diplomacy.js `processDiplomacyTurn` but the exact bit-clearing pattern (0xfffff7ff at turn%32==0, 0xfffbffff at turn%32==0, 0xfff7ffff) may differ in detail. The random attitude adjustment (rand()%100, rand()%3 XOR bit 4) for AI civs is not ported — JS has no equivalent random attitude drift. Also: the war-ending cascade that checks for UN wonder (tech 0x18) or Espionage (tech 9) before showing WARENDS to observers is not in JS.
FUN_00560d95 | 4728B | diplomacy.js — AI diplomacy attitude scoring for one civ pair (param_1=subject civ, param_2=target civ). Computes a complex attitude score from: (1) neighbor military assessment via FUN_00458df9, (2) relative power rank, (3) tech era differential, (4) leader personality traits (aggression, expansionism), (5) shared enemy bonuses, (6) military strength ratios (4x/2x/1.5x thresholds), (7) democracy/republic modifiers via tech 6/0x18 checks, (8) UN wonder (tech 0x14) modifier, and (9) alliance status floor. Final score passed to FUN_00456f20 (set_attitude). **DISCREPANCY**: The JS `calcAttitudeScore` in diplomacy.js implements a simpler subset — it has power rank comparison and era differential but is missing: the 3-tier military strength ratio check (4x→-1, 2x→-1, 1.5x→-1), the neighbor city assessment (FUN_00458df9 checks for neighbor military presence), leader personality multiplier from LEADER_PERSONALITY data, the alliance-at-war synergy bonus, and the Statue of Liberty (tech 0x14) bonus/penalty. The binary version is ~4x more complex than the JS implementation.
FUN_00562021 | 2292B | diplomacy.js — AI diplomacy: third-party alliance solicitation. Triggered periodically (turn%32 == param_1*4), checks if a civ is losing diplomatically (fewer than 6 friends), then iterates other civs to find potential allies. Offers technology trades (scans all 100 techs), military alliance proposals with gold payments (HELPME/CRUSADE/JIHAD dialogs), and territory exchange treaties. **NOT PORTED**: This complex AI diplomatic initiative system (proactive alliance-seeking, tech-for-alliance trading, religious crusade proposals) has no equivalent in JS. The JS diplomacy.js handles treaty state changes but not AI-initiated multi-party negotiations.

---

## FW -- Framework: File I/O, CD-ROM Detection (7 functions)

FUN_00564470 | 212B | N/A (cd_rom_find_game — searches CD-ROM drives for game files; calls GetModuleFileNameA, loops FUN_0056459f twice, shows CDROMNOTFOUND2 dialog on failure)
FUN_00564549 | 43B | N/A (cd_rom_not_found — returns TRUE when DAT_006ab680 is empty/null, indicating no CD-ROM was found)
FUN_00564574 | 43B | N/A (cd_rom_get_path — returns pointer to CD-ROM drive path string or NULL)
FUN_0056459f | 354B | N/A (cd_rom_search_drives — scans all 26 logical drives via GetLogicalDrives/GetDriveTypeA for type 3 (fixed disk), tries OpenFile on each; stores found drive letter in DAT_006ab680)
FUN_00564713 | 831B | N/A (find_file_on_any_drive — searches for a file across module path, CD-ROM path, and alternative paths; uses lstrlenA, OpenFile with OF_EXIST flag; rewrites param_1 path string on success)
FUN_00564bf0 | 216B | N/A (parse_number_with_prefix — parses string with 0x/0b/0d prefix for hex/binary/decimal; returns integer value via _atoi or thunk_FUN_0046e8f0)
FUN_00564d00 | 365B | N/A (civilopedia_list_init — initializes Civilopedia scrollable list; bounds-checks index, copies item array, adjusts for groups of 9, calls multiple FUN_0040fcf0/FUN_0040fd40 for scroll setup)

---

## UI -- User Interface: Civilopedia Tech Tree (3 functions)

FUN_00564e6d | 5911B | N/A (civilopedia_draw_tech_detail — renders Civilopedia detail page for a tech; shows prerequisite techs with clickable rectangles, lists enabled improvements/wonders/units, displays PEDIA text descriptions from describe_*.txt files, renders tech-specific civilization facts from PEDIACIVFACTS section)
FUN_00566584 | 342B | N/A (civilopedia_navigate_to_tech — navigates Civilopedia to a specific tech entry; searches item list, updates current index, redraws detail pane and list selection)
FUN_005666da | 3551B | N/A (civilopedia_draw_tech_tree — draws the multi-level tech prerequisite tree visualization; computes 3 levels of parent/grandparent/great-grandparent techs from prerequisite data, renders connecting lines and clickable tech name rectangles with SetRect/thunk_FUN_00452c14)

---

## UI -- User Interface: Tech Tree Drawing Helpers (2 functions)

FUN_005674b9 | 254B | N/A (draw_tech_tree_connector — draws 3-pixel-wide connecting lines between tech tree nodes; uses color 10 for shadow and 0x7a for main line; draws vertical then optional horizontal segments)
FUN_005675b7 | 138B | N/A (draw_tech_tree_branch — draws horizontal branch lines from a node to the left edge of the tech tree pane; uses same 10/0x7a color scheme)

---

## FW -- Framework: Static Initializers (28 functions)

FID_conflict:_$E31@0x005680A0 | 26B | N/A (static init pair — calls FUN_005680ba + FUN_005680d4; VS98 CRT static constructor)
FUN_005680ba | 26B | N/A (static init — calls FUN_005c64da; CPropertySheet/dialog class constructor)
FUN_005680d4 | 29B | N/A (static init — registers atexit handler FUN_005680f1)
FUN_005680f1 | 26B | N/A (atexit handler — calls FUN_005c656b; CPropertySheet destructor)
FID_conflict:_$E31@0x0056810B | 26B | N/A (static init pair — calls FUN_00568125 + FUN_0056813f)
FUN_00568125 | 26B | N/A (static init — calls FUN_005bd630; bitmap/GDI init)
FUN_0056813f | 29B | N/A (static init — registers atexit handler FUN_0056815c)
FUN_0056815c | 26B | N/A (atexit handler — calls FUN_005bd915; bitmap/GDI cleanup)
FUN_00568176 | 24B | N/A (stub — returns 1; possibly OnCmdMsg placeholder)
FID_conflict:_$E31@0x00568B00 | 26B | N/A (static init pair — calls FUN_00568b1a + FUN_00568b34)
FUN_00568b1a | 26B | N/A (static init — calls thunk_FUN_0055339f; initializes a frame window)
FUN_00568b34 | 29B | N/A (static init — registers atexit handler FUN_00568b51)
FUN_00568b51 | 26B | N/A (atexit handler — calls COleCntrFrameWnd destructor)
FID_conflict:_$E31@0x00568B6B | 26B | N/A (static init pair — calls FUN_00568b85 + FUN_00568b9f)
FUN_00568b85 | 26B | N/A (static init — calls thunk_FUN_0043c690; CFont constructor)
FUN_00568b9f | 29B | N/A (static init — registers atexit handler FUN_00568bbc)
FUN_00568bbc | 26B | N/A (atexit handler — calls thunk_FUN_0043c520; CFont destructor)
FID_conflict:_$E31@0x00568BD6 | 26B | N/A (static init pair — calls FUN_00568bf0 + FUN_00568c0a)
FUN_00568bf0 | 26B | N/A (static init — calls thunk_FUN_0043c690; CFont constructor)
FUN_00568c0a | 29B | N/A (static init — registers atexit handler FUN_00568c27)
FUN_00568c27 | 26B | N/A (atexit handler — calls thunk_FUN_0043c520; CFont destructor)

---

## UI -- User Interface: Art Resource Loading (5 functions)

load_civ2_art_005681c9 | 383B | N/A (load_civ2_art — loads CIV2ART.DLL/GIF resource; calls handle_palette, creates bitmap surface, loads 999-resource GIF, calls MessageBoxA on failure with "Failed to load civ2art.gif")
FUN_00568348 | 12B | N/A (SEH cleanup — destructor thunk for _Timevec bitmap)
FUN_00568354 | 9B | N/A (cleanup — calls FUN_005cde4d; releases bitmap surface)
FUN_0056835d | 12B | N/A (cleanup — calls FUN_005bd915; bitmap destructor)
FUN_00568373 | 14B | N/A (SEH epilog — restores FS:[0] exception chain)

---

## UI -- User Interface: Screen Transition Effects (3 functions)

FUN_00568381 | 36B | N/A (refresh_and_transition — calls FUN_004083f0 + FUN_0046ee1e + FUN_005683b5; refreshes graphics and triggers transition)
FUN_005683a5 | 16B | N/A (nop — empty virtual function; returns without action)
FUN_005683b5 | 16B | N/A (nop — empty virtual function; returns without action)
FUN_005683c5 | 1155B | N/A (screen_transition_reveal — animated screen reveal effect; allocates tile grid, supports 5 patterns (top-down, left-right, top-left diagonal, bottom-right diagonal, random), reveals tiles progressively via SetRect/thunk_FUN_00408490; uses GlobalAlloc/GlobalLock for tile array)

---

## GL -- Game Logic: Tech Era Lookup (1 function)

FUN_00568861 | 136B | N/A — Determines tech era level for a civ. Checks tech 5+0x18 (Electricity+Future Tech) → returns 2 (modern), tech 0x3c+0x26 (Automobile+Chemistry) → returns 1 (industrial), else 0 (ancient). **NOT PORTED**: No direct JS equivalent for this era classification. The binary uses it for AI assessment purposes in FUN_00560d95 attitude scoring.

---

## UI -- User Interface: Minimap & Status Bar (15 functions)

FUN_00568c41 | 23B | N/A (minimap_begin_update — sets DAT_00633e00=1 to signal minimap redraw is starting)
FUN_00568c58 | 38B | N/A (minimap_end_update — calls citywin_9545, clears DAT_00633e00, calls FUN_0056a787 to finalize)
FUN_00568c7e | 36B | N/A (minimap_on_paint — sets DAT_00633e00=1, calls FUN_00408090 for WM_PAINT handling, returns 0)
FUN_00568ca2 | 484B | N/A (minimap_layout_calc — computes minimap layout dimensions based on screen resolution; scales between 2x/3x/4x tile sizes, adjusts vertical panel height)
FUN_00568e86 | 189B | N/A (minimap_draw_indicator — draws current view indicator on minimap; computes position from DAT_006abf2c/30, renders via thunk_FUN_0043cab0)
FUN_00568f43 | 474B | N/A (status_bar_draw — draws status bar with turn info, year, treasury display; renders civ icon, format strings from DAT_00633e10/14)
FUN_0056911d | 132B | N/A (status_bar_draw_coordinates — draws coordinate display (x,y) with terrain owner label)
FUN_005691a1 | 450B | N/A (unit_orders_label — generates unit orders text label; handles goto (order 0xb) with city name lookup, other orders from DAT_00655490 string table; shows destination coordinates when city not visible)
FUN_00569363 | 1182B | N/A (info_panel_draw — draws main game info panel with year, treasury, tax rates, research progress bar; uses multiple string formatting calls, renders science/tax/luxury sliders)
FUN_00569801 | 3672B | N/A (tile_info_draw — draws detailed tile information panel; shows unit info (movement, HP, orders, veteran status), terrain info (type, river, improvements), city owner, resource yields; renders unit sprite via FUN_0056baff)
FUN_0056a65e | 297B | N/A (auto_save_check — checks if auto-save should trigger; handles yearly auto-save flag)
FUN_0056a787 | 516B | N/A (minimap_full_redraw — redraws entire minimap; iterates all map tiles, calls FUN_005b8931 for terrain, renders colored pixels by owner)
FUN_0056a98b | 105B | N/A (minimap_center_on_click — centers main map on minimap click position; converts minimap coordinates to map coordinates)
FUN_0056a9f4 | 139B | N/A (minimap_on_click — handles minimap mouse click; computes target tile from click position, calls center function)
FUN_0056aa7f | 38B | N/A (minimap_highlight_toggle — toggles minimap city/unit highlight mode)

---

## UI -- User Interface: Unit Rendering & Tile Painting (14 functions)

FUN_0056aaa5 | 38B | N/A (minimap_on_resize — handles minimap resize event; recalculates layout)
FUN_0056aacb | 379B | N/A (unit_sprite_info_build — builds unit sprite rendering info including owner color, veteran star, HP bar parameters)
FUN_0056ac46 | 33B | N/A (get_unit_sprite_offset — returns sprite sheet offset for unit type)
FUN_0056ac67 | 646B | N/A (unit_sprite_render — renders a unit sprite with all decorations; draws HP bar, veteran star, fortification icon, goes-to arrow)
FUN_0056aeed | 26B | N/A (unit_sprite_cleanup — cleanup after unit sprite render)
FUN_0056b810 | 55B | N/A (tile_get_base_terrain — returns base terrain type for a tile, handling special terrain)
FUN_0056b847 | 54B | N/A (tile_get_terrain_variant — returns terrain variant/overlay index for a tile)

---

## FW -- Framework: More Static Initializers (14 functions)

FID_conflict:_$E31@0x0056B8A0 | 26B | N/A (static init pair)
FUN_0056b8ba | 26B | N/A (static init — bitmap init)
FUN_0056b8d4 | 29B | N/A (static init — registers atexit)
FUN_0056b8f1 | 26B | N/A (atexit handler — bitmap cleanup)
FUN_0056b90b | 99B | N/A (tile_paint_init — initializes tile painting subsystem; sets up terrain sprite pointers)
FUN_0056b96e | 396B | N/A (tile_paint_setup — configures tile painting parameters for current zoom level; computes sprite dimensions and offsets)

---

## UI -- User Interface: Tile/Map Painting (8 functions)

FUN_0056baff | 2803B | N/A (draw_unit_on_tile — master unit-on-tile renderer; handles all unit types, draws owner flag, HP bar, terrain under unit, fog of war overlay, stacking indicator)
FUN_0056c5fc | 265B | N/A (swap_sprite_buffers — swaps front/back sprite rendering buffers for animation; copies bitmap regions between two surfaces)
FUN_0056c705 | 2902B | N/A (combat_animation_render — renders combat animation sequence; draws attacker/defender sprites, flash effects, damage indicators; handles multi-frame animation with timing via timeGetTime)
FUN_0056d25b | 22B | N/A (SEH destructor thunk — _eh_vector_destructor cleanup)
FUN_0056d27b | 14B | N/A (SEH epilog — restores FS:[0])
FUN_0056d289 | 1737B | N/A (draw_city_on_tile — draws city sprite on map tile; renders city size number, walls indicator, owner color, production progress bar, name label)
FUN_0056e180 | 47B | N/A (get_terrain_sprite_coords — returns sprite sheet x,y for a terrain type at given position)
FUN_0056e1c0 | 38B | N/A (get_terrain_overlay_coords — returns overlay sprite coordinates for a terrain feature)

---

## UI -- User Interface: Terrain Rendering (12 functions)

FUN_0056e1f0 | 92B | N/A (draw_terrain_base — draws base terrain sprite for a tile; handles ocean/land transitions)
FUN_0056e270 | 89B | N/A (draw_terrain_overlay — draws terrain overlay (forest, hills, mountains) on top of base)
FUN_0056e2c9 | 32B | N/A (draw_terrain_river — draws river overlay on a tile)
FUN_0056e2e9 | 2450B | N/A (draw_tile_complete — master tile renderer; draws base terrain + all overlays (river, road, railroad, irrigation, mine, fortress, pollution) + resource specials + fog of war; handles all 8 neighbor edge transitions)
FUN_0056ec92 | 208B | N/A (draw_tile_improvements — draws improvement icons (irrigation, mine, railroad) on a tile)
FUN_0056ed62 | 30B | N/A (draw_resource_special — draws special resource icon on a tile)
FUN_0056ed80 | 83B | N/A (draw_goody_hut — draws goody hut sprite on unexplored tile)
FUN_0056edd3 | 89B | N/A (draw_pollution — draws pollution overlay on a tile)
FUN_0056ee2c | 171B | N/A (draw_fog_edge — draws fog of war edge transition for one direction)
FUN_0056eed7 | 188B | N/A (draw_fog_full — draws full fog of war overlay on an unseen tile)
FUN_0056ef93 | 384B | N/A (draw_road_connections — draws road segment connecting to adjacent tiles; checks 8 neighbors for road connectivity)
FUN_0056f113 | 494B | N/A (draw_railroad_connections — draws railroad segment connecting to adjacent tiles; similar to road but uses railroad sprites)

---

## UI -- User Interface: More Terrain/Tile Drawing (4 functions)

FUN_0056f301 | 113B | N/A (draw_irrigation — draws irrigation improvement sprite on tile)
FUN_0056f372 | 110B | N/A (draw_mine — draws mine improvement sprite on tile)
FUN_0056f3e0 | 75B | N/A (draw_fortress — draws fortress improvement sprite on tile)
FUN_0056f42b | 89B | N/A (draw_airbase — draws airbase improvement sprite on tile)

---

## FW -- Framework: More Static Initializers (21 functions)

FID_conflict:_$E31@0x0056F910 | 26B | N/A (static init pair)
FUN_0056f92a | 26B | N/A (static init)
FUN_0056f944 | 29B | N/A (static init — registers atexit)
FUN_0056f961 | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056F97B | 26B | N/A (static init pair)
FUN_0056f995 | 26B | N/A (static init)
FUN_0056f9af | 29B | N/A (static init — registers atexit)
FUN_0056f9cc | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056F9E6 | 26B | N/A (static init pair)
FUN_0056fa00 | 26B | N/A (static init)
FUN_0056fa1a | 29B | N/A (static init — registers atexit)
FUN_0056fa37 | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056FA51 | 26B | N/A (static init pair)
FUN_0056fa6b | 26B | N/A (static init)
FUN_0056fa85 | 29B | N/A (static init — registers atexit)
FUN_0056faa2 | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056FABC | 26B | N/A (static init pair)
FUN_0056fad6 | 26B | N/A (static init)
FUN_0056faf0 | 29B | N/A (static init — registers atexit)
FUN_0056fb0d | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056FB27 | 26B | N/A (static init pair)

---

## FW -- Framework: Final Static Initializers (9 functions)

FUN_0056fb41 | 26B | N/A (static init)
FUN_0056fb5b | 29B | N/A (static init — registers atexit)
FUN_0056fb78 | 26B | N/A (atexit handler)
FID_conflict:_$E31@0x0056FB92 | 26B | N/A (static init pair)
FUN_0056fbac | 26B | N/A (static init)
FUN_0056fbc6 | 29B | N/A (static init — registers atexit)
FUN_0056fbe3 | 26B | N/A (atexit handler)
FUN_0056fbfd | 231B | N/A (terrain_sprite_cache_init — initializes terrain sprite coordinate lookup table; pre-computes sprite offsets for all terrain types)
FUN_0056fce4 | 722B | N/A (terrain_render_setup — configures terrain rendering pipeline; sets up sprite source rectangles, transparency masks, and blitting parameters for current zoom level)

---

## FW -- Framework: SEH/Cleanup (3 functions)

FUN_0056ffb6 | 12B | N/A (SEH destructor thunk)
FUN_0056ffcc | 14B | N/A (SEH epilog — restores FS:[0])
FUN_0056ffda | 1922B | N/A (terrain_sprite_master_init — master terrain sprite initialization; loads all terrain sprite sheets, configures 11+ terrain types with base/overlay/transition sprites, handles TERRAIN1/TERRAIN2 bitmap loading fallbacks)

---

## Summary

| Category | Count |
|----------|-------|
| GL (Game Logic) | 4 |
| AI (AI Diplomacy) | 0 (included in GL) |
| UI (User Interface) | 62 |
| FW (Framework) | 65 |
| **Total** | **131** |

### Key GL Discrepancies Found

1. **FUN_00560084 (AI diplomacy turn)**: Treaty decay bit-clearing at turn multiples (32/16/8) — JS diplomacy.js `processDiplomacyTurn` exists but may not clear the exact same flag bits. The war-ending cascade logic checking for UN/Espionage wonders before notifying observers is not in JS.

2. **FUN_00560d95 (AI attitude scoring)**: JS `calcAttitudeScore` is a much simpler version missing: 3-tier military ratio checks (4x/2x/1.5x), neighbor city military assessment (FUN_00458df9), leader personality multipliers, alliance-at-war synergy, and Statue of Liberty bonus. The binary function is ~4x more complex.

3. **FUN_00562021 (AI alliance solicitation)**: Entirely missing from JS — no AI-initiated multi-party diplomacy (tech-for-alliance trades, crusade/jihad proposals, gold-for-friendship).

4. **FUN_00568861 (tech era classification)**: Simple 3-tier era lookup (ancient/industrial/modern) based on specific tech pairs. Not ported to JS but used only for AI attitude scoring.
