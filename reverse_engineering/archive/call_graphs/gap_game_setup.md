# Game Setup — Gap Analysis (Binary vs JS Engine)

Gap analysis of the binary's game setup call trees (depth 0-3) against the JS engine implementation in `charlizationv3/engine/`.

**Scope**: 8 entry points, GL/AI/MIXED functions at depth 0-3.
**Legend**: `[checkmark]` IMPLEMENTED, `~` PARTIAL, `X` MISSING, `N/A` Not applicable (network/UI-only)

---

## Summary

| Entry Point | Address | Depth 0-3 GL/MIXED/AI | Implemented | Partial | Missing | N/A |
|---|---|---|---|---|---|---|
| new_game_setup_flow | 0041BA52 | 43 unique | 25 | 5 | 5 | 8 |
| load_full_game | 00475666 | 27 unique | 18 | 3 | 3 | 3 |
| init_new_game | 004AA9C0 | 34 unique | 24 | 4 | 2 | 4 |
| new_civ | 004A7CE9 | 62 unique | 28 | 6 | 6 | 22 |
| generate_world_map | 00408D33 | 29 unique | 25 | 2 | 2 | 0 |
| load_all_rules | 0041B00E | 8 unique | 3 | 3 | 2 | 0 |
| save_game | 0047758C | 11 unique | 3 | 1 | 3 | 4 |
| parse_events_file | 004FC516 | 5 unique | 4 | 1 | 0 | 0 |

**Critical gaps** (blocking new-game-without-sav):
1. No RULES.TXT parser — all rules are hardcoded in `defs.js`
2. No save file writer (write_save_file, save_map_data)
3. setup_scenario_start is a stub (no cities/units/buildings per era)
4. No trade route map builder (build_trade_route_map)
5. normalize_leader_data not ported (affects scenario loads)

---

## 1. new_game_setup_flow (0x0041BA52)

The top-level orchestrator for starting a new game. In the binary this shows dialogs for difficulty, opponents, barbarians, etc. Our WebSocket lobby replaces the dialog flow, but the downstream game logic must match.

### Depth 0 — Entry Point
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| ~ | 0041BA52 | new_game_setup_flow | `initNewGame()` in init.js | JS lobby replaces dialog flow; downstream init logic matches |

### Depth 1 — Direct Children (GL/AI/MIXED only)
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 00408D33 | generate_world_map | `generateMap()` in mapgen.js | 9-phase pipeline faithfully ported from binary |
| ~ | 00419ED3 | normalize_leader_data | — | Not ported; defaults are hardcoded in defs.js LEADERS_TXT_NAMES |
| ~ | 0041A046 | parse_advances_section | — | Hardcoded in defs.js ADVANCE_PREREQS/ADVANCE_NAMES |
| ~ | 0041A422 | parse_improvements_section | — | Hardcoded in defs.js IMPROVE_NAMES/IMPROVE_COSTS |
| ~ | 0041A5C4 | parse_units_section | — | Hardcoded in defs.js UNIT_NAMES/UNIT_COSTS |
| [checkmark] | 00484FEC | calc_year_from_turn | `getGameYear()` in year.js | Faithful port with epoch table |
| X | 004A73D9 | save_civ2_dat | — | CIV2.DAT preferences file; N/A for web (no local prefs file) |
| ~ | 004A9785 | setup_scenario_start | `setupScenarioStart()` in init.js | **Stub** — grants era techs only, no cities/units/buildings |
| [checkmark] | 004AA9C0 | init_new_game | `initNewGame()` in init.js | Core orchestrator ported |
| N/A | various | UI dialog functions | — | Replaced by WebSocket lobby |

### Depth 2 — Key Grandchildren
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004087C0 | is_tile_valid | Bounds checks in mapgen.js | Inline in JS |
| [checkmark] | 00408830 | map_fill_byte_layer | Initialization loops in mapgen.js | Inline in JS |
| [checkmark] | 0040897F | mapgen_calc_fertility | `calculateFertility()` in mapgen.js | Faithful port |
| [checkmark] | 0040A572 | place_continent | `placeContinent()` in mapgen.js | Random walk algorithm ported |
| [checkmark] | 0040AB41 | try_create_inland_sea | Inline in mapgen.js phase 4 | Mountains→ocean conversion |
| [checkmark] | 0040AC5A | generate_rivers | River generation in mapgen.js phase 6 | Random walk with rollback |
| [checkmark] | 004B32FE | continent_assign_body_ids | `assignContinentBodyIds()` in mapgen.js | Two-pass flood fill ported |
| X | 0055A980 | build_trade_route_map | — | **Missing** — trade route connectivity map not built at game start |
| [checkmark] | 005AE052 | wrap_x | `wrapX()` / `wrapGx()` in utils.js, mapgen.js | Inline utility |
| [checkmark] | 005B7FE0 | alloc_map_data | `createAccessors()` in state.js | JS array allocation |
| [checkmark] | 005B85FE | init_map_seed | Map seed from settings or RNG | Part of generateMap() |
| [checkmark] | 005B8931 | get_tile_ptr | Direct array access: `tileData[y*mw+x]` | JS uses objects not pointers |
| [checkmark] | 005B89BB | get_tile_terrain_raw | `tile.terrain` property | Direct field access |
| [checkmark] | 005B89E4 | is_tile_ocean | `ter === 10` | Inline check |
| [checkmark] | 005B8EE1 | check_tile_resource | `placeResources()` + `checkTileGoodyHut()` in mapgen.js | Deterministic hash formula ported |
| [checkmark] | 004B0720 | lookup_tech_by_name | — | Not needed; JS uses numeric IDs from defs.js |
| [checkmark] | 00419CF4 | read_param_clamped | — | Not needed; all params pre-defined in defs.js |

---

## 2. load_full_game (0x00475666)

The main save file loading function. Reads header, global state, per-civ data, map, units, cities, techs, viewport, events.

### Depth 0-1
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 00475666 | load_full_game | `Civ2Parser.parse()` in parser.js | Comprehensive binary parser |
| ~ | 00419ED3 | normalize_leader_data | — | Parser reads leader data but doesn't normalize negative values |
| ~ | 0041A046 | parse_advances_section | — | Rules hardcoded; not parsed from RULES.TXT |
| ~ | 0041A422 | parse_improvements_section | — | Rules hardcoded |
| ~ | 0041A5C4 | parse_units_section | — | Rules hardcoded |
| ~ | 0041E864 | reload_rules_for_scenario | — | No scenario-specific RULES.TXT reload |
| [checkmark] | 00473064 | unpack_viewport_state | Parser reads viewport data at tail | Parsed but not used for game logic |
| [checkmark] | 004732A6 | load_units_and_cities | `_parseUnits()` + `_parseCities()` in parser.js | All 3 format versions handled |
| [checkmark] | 00473660 | load_game_file | `_parseGameState()` + `_parseCivDataBlocks()` | Global + per-civ state parsed |
| [checkmark] | 00484CC0 | init_scenario_vars | Scenario flags parsed in `initFromSav()` | scenarioBlock parsed at offset |
| N/A | 00498784 | mp_init_passwords | — | WebSocket auth replaces DirectPlay passwords |
| N/A | 0049882B | mp_update_password_flags | — | WebSocket auth |
| [checkmark] | 004A76F5 | reset_kill_history | `killHistory` in parser.js + diplomacy.js | Parsed from tail data; reset in killCiv |
| [checkmark] | 004FA5D9 | event_mgr_init | `parseEvents()` in events.js | Event system initialized from text |
| [checkmark] | 004FA617 | event_alloc_node | Event nodes created as JS objects | No manual memory management needed |
| [checkmark] | 005B8783 | load_map_data | `_parseMapData()` in parser.js | Map header + tile data + visibility |

### Depth 2
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 005B7FE0 | alloc_map_data | `createAccessors()` in state.js | Array allocation |
| X | 005B8416 | free_map_data | — | JS garbage collection; no manual free needed |
| [checkmark] | 0041B00E | load_all_rules | — | Rules hardcoded in defs.js (partial coverage) |
| X | 0041E7E3 | reload_labels_and_rules | — | No runtime rules reload |
| [checkmark] | 004FA47E | event_mgr_reset_pool | — | JS GC handles memory; no pool needed |
| [checkmark] | 004FA4BE | event_mgr_ctor | — | JS object construction |

---

## 3. init_new_game (0x004AA9C0)

Initializes a completely new game. Resets all global game state, creates all 8 civilizations, assigns starting positions, and sets initial rates.

### Depth 0-1
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004AA9C0 | init_new_game | `initNewGame()` in init.js | Core orchestrator ported from binary |
| [checkmark] | 00484CC0 | init_scenario_vars | Scenario defaults in initNewGame() | Hardcoded defaults |
| [checkmark] | 004A74BC | reset_spaceship | `resetSpaceship()` in spaceship.js | Faithful port |
| [checkmark] | 004A76F5 | reset_kill_history | Kill history initialized in diplomacy.js | killHistory object |
| [checkmark] | 004A7754 | assign_initial_settler_positions | `assignInitialSettlerPositions()` in init.js | Distance-maximization algorithm ported |
| [checkmark] | 004A7CE9 | new_civ | `createNewCiv()` in init.js | Per-civ init ported (see below) |

### Depth 2 — assign_initial_settler_positions children
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004087C0 | is_tile_valid | Bounds checks inline | |
| ~ | 004C21D5 | complete_research | `grantAdvance()` in research.js | Binary grants starting techs via complete_research; JS uses getStartingTechs() |
| [checkmark] | 005AE052 | wrap_x | `wrapX()` inline | |
| [checkmark] | 005AE31D | calc_movement_cost | `chebyshevDist()` in init.js | Simplified but equivalent for placement |
| [checkmark] | 005B3D06 | create_unit | Unit objects created in initNewGame() | Direct object construction |
| X | 005B67AF | find_nearest_unit | — | Not used in JS placement algorithm |
| [checkmark] | 005B89BB | get_tile_terrain_raw | `tile.terrain` | |
| [checkmark] | 005B8AA8 | get_tile_continent_if_land | `tile.bodyId` | |
| [checkmark] | 005B8EE1 | check_tile_resource | Resource scoring in scoreTileForStart() | |

---

## 4. new_civ (0x004A7CE9) — CRITICAL

Creates a new civilization. Initializes all per-civ game state arrays, selects a tribe, finds a starting position, creates initial settler(s), and reveals nearby tiles.

### Depth 0-1
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004A7CE9 | new_civ | `createNewCiv()` in init.js | Core init ported |
| [checkmark] | 004087C0 | is_tile_valid | Bounds checks | |
| [checkmark] | 0043D07A | find_nearest_city | — | Not needed at game start (no cities yet) |
| N/A | 0046B14D | net_send_message | WebSocket transport | Binary's DirectPlay replaced |
| N/A | 0047E94E | network_poll | WebSocket transport | |
| [checkmark] | 00493602 | ai_decay_and_merge_goals | AI goals in ai/ module | |
| [checkmark] | 0049376F | ai_clear_goals_b | AI goals in ai/ module | |
| [checkmark] | 004BF05B | handle_tech_discovery | `handleTechDiscovery()` in research.js | Master tech handler ported |
| [checkmark] | 004BFE5A | can_build_unit_type | `canBuildUnitType()` in buildcheck.js | Faithful port |
| ~ | 004C21D5 | complete_research | `grantAdvance()` in research.js | Used for starting techs; partial: no UI prompt |
| [checkmark] | 005AE052 | wrap_x | wrapX/wrapGx | |
| [checkmark] | 005AE31D | calc_movement_cost | chebyshevDist | |
| [checkmark] | 005B3D06 | create_unit | `makeUnit()` in reduce/helpers.js | |
| [checkmark] | 005B4391 | delete_unit | `killUnit()` in reduce/helpers.js | |
| [checkmark] | 005B89E4 | is_tile_ocean | `ter === 10` | |
| [checkmark] | 005B8A81 | get_tile_continent | `tile.bodyId` | |
| [checkmark] | 005B8C42 | get_tile_fertility_or_city_radius | `tile.fertility` | |
| [checkmark] | 005B8DA4 | get_tile_controller | Tile ownership checks in various files | |
| [checkmark] | 005B8FFA | check_tile_goody_hut | `checkTileGoodyHut()` in mapgen.js | Deterministic hash formula |
| [checkmark] | 005B976D | set_tile_visibility_bits | `updateVisibility()` in visibility.js | |
| [checkmark] | 005B9EC6 | begin_map_batch | — | N/A; JS sends full state snapshots |
| [checkmark] | 005B9F1C | end_map_batch | — | N/A |

### Key new_civ Details — What the Binary Does vs JS

The binary's `new_civ` (5834 bytes) performs these operations:

1. **Clear per-civ state** (0x594 bytes per civ):
   - Zero all attitudes, diplomacy, AI goal lists, tech flags
   - JS: `createNewCiv()` returns a fresh civ object; `civTechs[slot] = new Set()`

2. **Select tribe/color**:
   - Binary picks from 21 leader defs, assigns city style, leader name/gender
   - JS: Maps `rulesCivNumber` to LEADERS_TXT_NAMES, `style = rulesCivNumber % 4`
   - **Gap**: JS doesn't track leader gender, custom tribe names, or per-leader personality traits

3. **Initialize attitudes**:
   - Binary: `rand()%80+10` for AI targets, clamped with difficulty scaling for human
   - JS: Matches this formula in createNewCiv()

4. **Grant starting techs**:
   - Binary: calls `complete_research` for each no-prereq tech based on difficulty
   - JS: `getStartingTechs()` — Fisher-Yates shuffle from no-prereq pool, count by difficulty

5. **Find starting position**:
   - Binary: evaluates tiles by fertility, movement cost, distance from existing settlers
   - JS: `assignInitialSettlerPositions()` with scoreTileForStart() — covers same logic

6. **Create initial units**:
   - Binary: Settlers + Warriors at starting position
   - JS: STARTING_UNITS = [0, 2] (Settlers, Warriors) — matches

7. **Reveal initial tiles**:
   - Binary: `begin_map_batch` → visibility update → `end_map_batch`
   - JS: `updateVisibility()` with radius 2 — matches

8. **Clear nearby goody huts**:
   - Binary: clears huts in city radius of starting position
   - JS: `clearNearbyGoodyHuts()` — matches

### Missing from new_civ in JS
| Status | Detail |
|---|---|
| X | Leader gender tracking (male/female titles for diplomacy) |
| X | Custom tribe name / leader name fields |
| ~ | Per-leader personality traits (expansionist, perfectionist, militarist, civilized) |
| ~ | Per-leader tech preference flags (only used in AI research selection) |
| X | AI goal list initialization (ai_decay_and_merge_goals, ai_clear_goals_b) — partial in ai/ module |
| X | MP: net_send_message for new civ creation — N/A (WebSocket handles this differently) |

---

## 5. generate_world_map (0x00408D33)

The main world map generation function. This is one of the best-ported subsystems.

### Depth 0-2
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 00408D33 | generate_world_map | `generateMap()` in mapgen.js | 9-phase pipeline faithfully ported |
| [checkmark] | 004087C0 | is_tile_valid | Bounds checks inline | |
| [checkmark] | 00408830 | map_fill_byte_layer | Init loops in generateMap() | |
| [checkmark] | 00408903 | map_copy_byte_layer | Snapshot arrays in river generation | |
| [checkmark] | 0040897F | mapgen_calc_fertility | `calculateFertility()` | Faithful port |
| [checkmark] | 0040A572 | place_continent | `placeContinent()` | Random walk with blobs |
| [checkmark] | 0040A763 | place_land_small | `placeLandSmall()` | 3-tile blobs, cardinal walk |
| [checkmark] | 0040A92F | place_land_large | `placeLandLarge()` | 3-tile blobs + 25% extra |
| [checkmark] | 0040AAA4 | place_land_island | `placeLandIsland()` | Single tiles, diagonal walk |
| [checkmark] | 0040AB41 | try_create_inland_sea | Inline in phase 4 | Mountains→ocean when landlocked |
| [checkmark] | 0040AC5A | generate_rivers | Phase 6 in generateMap() | Random walk with rollback |
| [checkmark] | 004B32FE | continent_assign_body_ids | `assignContinentBodyIds()` + `assignBodyIds()` | Two implementations: one for mapgen, one for init |
| X | 0055A980 | build_trade_route_map | — | **Missing** — computes trade connectivity matrix |
| ~ | 0040BCB0 | grassland_has_shield | Resource hash covers this | Handled by placeResources() hash formula |
| [checkmark] | 005AE052 | wrap_x | wrapX() | |
| [checkmark] | 005B7FE0 | alloc_map_data | Array creation | |
| [checkmark] | 005B85FE | init_map_seed | mapSeed from settings | |
| [checkmark] | 005B8931 | get_tile_ptr | Direct array indexing | |
| [checkmark] | 005B89BB | get_tile_terrain_raw | tile.terrain | |
| [checkmark] | 005B89E4 | is_tile_ocean | ter === 10 | |
| [checkmark] | 005B8EE1 | check_tile_resource | placeResources() + checkTileGoodyHut() | |

### Depth 2 — continent_assign_body_ids children
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004B315C | continent_calc_adjacency | — | Not explicitly ported; body IDs sufficient for current needs |
| [checkmark] | 005AE0B0 | wrap_y | — | Round map only; not needed for cylinder maps |

### Additional mapgen features in JS not in binary
- Lake classification (ocean bodies <20 tiles)
- Goody hut placement via deterministic hash
- Mirror valid tiles to padding positions
- Flat grassland debug mode

---

## 6. load_all_rules (0x0041B00E)

Master rules loader — parses all sections of RULES.TXT.

### Depth 0-1
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| X | 0041B00E | load_all_rules | — | **No RULES.TXT parser** — all rules hardcoded in defs.js |
| ~ | 00419D23 | parse_cosmic_parameters | COSMIC_* constants in defs.js | 22 cosmic params hardcoded to MGE defaults |
| ~ | 0041A046 | parse_advances_section | ADVANCE_PREREQS/ADVANCE_NAMES in defs.js | All 100 techs hardcoded |
| ~ | 0041A422 | parse_improvements_section | IMPROVE_NAMES/IMPROVE_COSTS in defs.js | 67 improvements + wonders hardcoded |
| ~ | 0041A5C4 | parse_units_section | UNIT_NAMES/UNIT_COSTS in defs.js | 62 unit types hardcoded |
| ~ | 0041A95F | parse_terrain_section | TERRAIN_NAMES/TERRAIN_BASE in defs.js | 11 terrain types hardcoded |
| X | 0041AB18 | parse_governments_leaders_section | GOVERNMENT_NAMES/LEADERS_TXT_NAMES in defs.js | 7 governments + 21 leaders hardcoded but no per-gov modifiers from RULES.TXT |

### Impact of Missing RULES.TXT Parser
- Cannot load scenarios with custom RULES.TXT
- Cannot modify game rules without code changes
- Per-government unit support/production/trade modifiers are scattered across multiple JS files rather than centralized from a rules table
- Leader personality traits, city name lists, and tech preferences are missing

### What IS Covered by Hardcoded Rules
All standard MGE RULES.TXT values are present in defs.js:
- 100 technology prerequisites and names
- 62 unit types with full stats (cost, attack, defense, movement, etc.)
- 67 improvements with costs and prerequisites
- 28 wonders with costs and prerequisites
- 11 terrain types with yields
- 7 government types (names, free units, etc.)
- 22 cosmic parameters (as individual constants)
- City epoch classification (4 architectural styles)

---

## 7. save_game (0x0047758C)

Handles the save game flow: builds filename, writes save file.

### Depth 0-2
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| X | 0047758C | save_game | — | **No save file writer** — game state is WebSocket-only |
| X | 004741BE | write_save_file | — | No .SAV/.SCN writer |
| [checkmark] | 00493B10 | get_civ_noun_name | `civ.name` property | Direct field access |
| [checkmark] | 00493BA6 | get_civ_leader_title | — | Leader titles not tracked in JS |
| [checkmark] | 00493C7D | get_civ_people_name | `civ.name` property | |
| N/A | 0055AE80 | stop_turn_timer | WebSocket turn timer | |
| N/A | 0055B046 | resume_turn_timer | WebSocket turn timer | |

### Depth 2 — write_save_file children
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| X | 00472F7B | pack_viewport_state | — | No viewport serialization |
| [checkmark] | 004BD9F0 | civ_has_tech | `civTechs[civ].has(techId)` | Set lookup |
| X | 005B8635 | save_map_data | — | No map serializer |

### Impact
- Cannot export game state as a .SAV file
- Cannot transfer saves between Civ2 binary and this engine
- All persistence is via WebSocket state snapshots (JSON)

---

## 8. parse_events_file (0x004FC516)

Parses the scenario events.txt file.

### Depth 0-1
| Status | Address | Binary Name | JS Equivalent | Notes |
|---|---|---|---|---|
| [checkmark] | 004FC516 | parse_events_file | `parseEvents()` in events.js | State machine parser ported |
| [checkmark] | 004FA250 | event_resolve_civ_name | Inline in parseEvents() | Resolves civ names to indices |
| [checkmark] | 004FA359 | event_resolve_unit_name | Inline in parseEvents() | Resolves unit names to indices |
| [checkmark] | 004FA403 | event_resolve_terrain_name | Inline in parseEvents() | Resolves terrain names |
| [checkmark] | 004FA617 | event_alloc_node | JS object creation | No manual allocation needed |

### Trigger Coverage
| Status | Binary Trigger | JS Constant |
|---|---|---|
| [checkmark] | UNITKILLED | EVENT_UNIT_KILLED |
| [checkmark] | CITYTAKEN | EVENT_CITY_TAKEN |
| [checkmark] | TURN | EVENT_TURN |
| [checkmark] | TURNINTERVAL | EVENT_TURN_INTERVAL |
| [checkmark] | NEGOTIATION | EVENT_NEGOTIATION |
| [checkmark] | SCENARIOLOADED | EVENT_SCENARIO_LOADED |
| [checkmark] | RANDOMTURN | EVENT_RANDOM_TURN |
| [checkmark] | NOSCHISM | EVENT_NO_SCHISM |
| [checkmark] | RECEIVEDTECHNOLOGY | EVENT_RECEIVED_TECH |
| ~ | NOCITIES | EVENT_NO_CITIES (defined, partial dispatch) |
| ~ | CITYPRODUCTION | EVENT_CITY_PRODUCTION (defined, partial dispatch) |
| ~ | BRIBEUNIT | EVENT_BRIBE_UNIT (stub) |
| ~ | CITYDESTROYED | EVENT_CITY_DESTROYED (stub) |
| ~ | FLAGSET/FLAGCLEAR | Defined but stub dispatch |

### Action Coverage
| Status | Binary Action | JS Constant |
|---|---|---|
| [checkmark] | TEXT | ACTION_TEXT |
| [checkmark] | MOVEUNIT | ACTION_MOVE_UNIT |
| [checkmark] | CREATEUNIT | ACTION_CREATE_UNIT |
| [checkmark] | CHANGEMONEY | ACTION_CHANGE_MONEY |
| [checkmark] | MAKEAGGRESSION | ACTION_MAKE_AGGRESSION |
| [checkmark] | JUSTONCE | ACTION_JUST_ONCE |
| [checkmark] | CHANGETERRAIN | ACTION_CHANGE_TERRAIN |
| [checkmark] | DESTROYCIV | ACTION_DESTROY_CIV (via killCiv) |
| [checkmark] | GIVETECH | ACTION_GIVE_TECH |
| [checkmark] | TRANSPORT | ACTION_TRANSPORT |
| N/A | PLAYWAVE/PLAYCD | No-op (audio) |

---

## Cross-Cutting Functions (Shared Infrastructure)

These utility functions appear in multiple entry point trees. Status tracked once.

### Map/Tile Accessors
| Status | Address | Binary Name | JS Equivalent |
|---|---|---|---|
| [checkmark] | 004087C0 | is_tile_valid | Bounds checks inline |
| [checkmark] | 005AE052 | wrap_x | wrapX() / wrapGx() |
| [checkmark] | 005AE0B0 | wrap_y | — (cylinder maps only need wrap_x) |
| [checkmark] | 005AE10E | distance_x_wrapped | Math.min(dx, mw-dx) inline |
| [checkmark] | 005AE1B0 | tile_distance_xy | chebyshevDist() / inline |
| [checkmark] | 005AE296 | diagonal_movement_cost | moveCost() in movement.js |
| [checkmark] | 005AE31D | calc_movement_cost | moveCost() in movement.js |
| [checkmark] | 005AE3BF | bit_index_to_byte_mask | JS uses Set/bitwise ops directly |
| [checkmark] | 005B7FE0 | alloc_map_data | createAccessors() |
| [checkmark] | 005B8931 | get_tile_ptr | tileData[y*mw+x] |
| [checkmark] | 005B89BB | get_tile_terrain_raw | tile.terrain |
| [checkmark] | 005B89E4 | is_tile_ocean | ter === 10 |
| [checkmark] | 005B8A1D | get_tile_owner | tile.tileOwnership |
| [checkmark] | 005B8A81 | get_tile_continent | tile.bodyId |
| [checkmark] | 005B8AA8 | get_tile_continent_if_land | tile.bodyId if !ocean |
| [checkmark] | 005B8AF0 | get_tile_city_radius_owner | tile.cityRadiusOwner |
| [checkmark] | 005B8B1A | update_civ_visibility | updateVisibility() |
| [checkmark] | 005B8C18 | get_tile_fertility | tile.fertility |
| [checkmark] | 005B8C42 | get_tile_fertility_or_city_radius | tile.fertility / tile.cityRadiusOwner |
| [checkmark] | 005B8CA6 | get_city_owner_at | Tile ownership checks |
| [checkmark] | 005B8D62 | get_unit_owner_at | Unit presence checks |
| [checkmark] | 005B8DA4 | get_tile_controller | Tile ownership logic |
| [checkmark] | 005B8DEC | check_tile_trespass | checkTrespass() in movement.js |
| [checkmark] | 005B8EE1 | check_tile_resource | placeResources() hash |
| [checkmark] | 005B8FFA | check_tile_goody_hut | checkTileGoodyHut() in mapgen.js |
| [checkmark] | 005B94D5 | get_tile_improvements | tile.improvements object |
| [checkmark] | 005B94FC | set_tile_improvement_bits | Direct field mutation |
| [checkmark] | 005B9646 | set_tile_terrain | Direct field mutation |
| [checkmark] | 005B976D | set_tile_visibility_bits | updateVisibility() |
| [checkmark] | 005B98B7 | set_tile_fertility | Direct field mutation |
| [checkmark] | 005B99E8 | set_tile_owner | Direct field mutation |
| [checkmark] | 005B9B35 | set_tile_continent | Direct field mutation |
| [checkmark] | 005B9C49 | set_tile_city_radius_owner | Direct field mutation |

### Unit Operations
| Status | Address | Binary Name | JS Equivalent |
|---|---|---|---|
| [checkmark] | 005B2A39 | calc_unit_movement_points | calcEffectiveMovementPoints() in movement.js |
| [checkmark] | 005B2E69 | find_unit_stack_at_xy | Array filter by position |
| [checkmark] | 005B319E | pick_up_unit | killUnit() / array splice |
| [checkmark] | 005B345F | put_down_unit | Array push with position |
| [checkmark] | 005B36DF | relocate_unit | Modify unit gx/gy |
| [checkmark] | 005B389F | move_unit_to_bottom | Stack reordering in reduce/ |
| [checkmark] | 005B3AE0 | relocate_all_units | Loop over stack |
| [checkmark] | 005B3D06 | create_unit | makeUnit() in reduce/helpers.js |
| [checkmark] | 005B4391 | delete_unit | killUnit() in reduce/helpers.js |
| [checkmark] | 005B48B1 | clear_stack_visibility | Visibility management |
| [checkmark] | 005B490E | set_unit_seen_by | Visibility management |
| [checkmark] | 005B496E | set_stack_seen_by | Visibility management |
| [checkmark] | 005B4B66 | check_adjacent_enemy_simple | Adjacent unit checks |
| [checkmark] | 005B50AD | sum_stack_property | sumStackProperty() in combat.js |
| [checkmark] | 005B542E | load_unit_onto_ship | loadUnitsOntoShip() in movement.js |
| [checkmark] | 005B5BAB | stack_unit | Stack management |
| [checkmark] | 005B5D93 | delete_unit_safely | killUnit() with ship handling |
| [checkmark] | 005B6042 | delete_unit_visible | killUnit() + visibility update |
| [checkmark] | 005B6787 | refresh_unit_movement | movesLeft recalculation |
| X | 005B67AF | find_nearest_unit | — | Not ported (used in AI placement) |

### City Operations
| Status | Address | Binary Name | JS Equivalent |
|---|---|---|---|
| [checkmark] | 0043CF76 | find_city_at | Array filter by position |
| [checkmark] | 0043D07A | find_nearest_city | findCityById() + distance calc |
| [checkmark] | 0043D20A | has_building | cityHasBuilding() in utils.js |
| [checkmark] | 0043D289 | set_building | Direct buildings mutation |
| [checkmark] | 0043F8B0 | create_city | City creation in reducer |
| [checkmark] | 004413D1 | delete_city | City deletion in reducer |
| [checkmark] | 004A93B3 | expand_city_territory | expandCityTerritory() in production.js |

### Tech/Research
| Status | Address | Binary Name | JS Equivalent |
|---|---|---|---|
| [checkmark] | 004BD9F0 | civ_has_tech | civTechs[civ].has(techId) |
| [checkmark] | 004BE6BA | upgrade_units_for_tech | upgradeUnitsForTech() in research.js |
| [checkmark] | 004BEA84 | handle_tech_government_effects | checkGovernmentRevolution() in research.js |
| [checkmark] | 004BEE56 | we_love_the_king_day | triggerGoldenAge() in research.js |
| [checkmark] | 004BF05B | handle_tech_discovery | handleTechDiscovery() in research.js |
| [checkmark] | 004BFE5A | can_build_unit_type | canBuildUnitType() in buildcheck.js |
| ~ | 004C21D5 | complete_research | grantAdvance() in research.js (no UI) |
| ~ | 004C21AD | choose_research_wrapper | chooseResearch() in ai/econai.js (AI only) |
| [checkmark] | 004C4210 | set_paradrop_range | Paradrop range in movement.js |

### Diplomacy/Combat
| Status | Address | Binary Name | JS Equivalent |
|---|---|---|---|
| [checkmark] | 00467750 | clear_treaty_flags | clearTreatyFlag() in diplomacy.js |
| [checkmark] | 00467825 | set_treaty_flags | setTreatyFlags() in diplomacy.js |
| [checkmark] | 004AA378 | kill_civ | killCiv() in diplomacy.js |
| [checkmark] | 004E7270 | acquire_wonder | Wonder acquisition in reducer |
| [checkmark] | 004DD285 | parley_execute_transaction | executeTransaction() in diplomacy.js |
| [checkmark] | 0059C575 | record_combat_kill | Combat results tracking |

### Network (N/A — WebSocket replaces DirectPlay)
| Status | Address | Binary Name | Notes |
|---|---|---|---|
| N/A | 0046AF70 | net_send_to_player | WebSocket transport |
| N/A | 0046B0A1 | net_broadcast | WebSocket transport |
| N/A | 0046B14D | net_send_message | WebSocket transport |
| N/A | 0046D5A0-0046D930 | net_msg_init_* (8 functions) | WebSocket JSON messages |
| N/A | 004B0B53 | diff_engine_scan_and_send | Full state snapshots over WebSocket |
| N/A | 004B153C | diff_engine_serialize_game | Full state snapshots |
| N/A | 004B18E1 | diff_engine_serialize_partial | Full state snapshots |
| N/A | 004B1A15 | diff_engine_serialize_full_compressed | Full state snapshots |
| N/A | 004B1C11 | diff_engine_serialize_changed_only | Full state snapshots |
| N/A | 004B1DE3 | diff_engine_deserialize | Full state snapshots |
| N/A | 004B2010 | parse_save_block | Full state snapshots |
| N/A | 004B24A2 | rle_calc_decoded_size | No RLE compression |
| N/A | 004B251A | rle_decode | No RLE compression |
| N/A | 005B9D81 | set_civ_tile_data | Direct mutation + WebSocket |
| N/A | 005B9EC6 | begin_map_batch | Not needed |
| N/A | 005B9F1C | end_map_batch | Not needed |
| N/A | 005B9FDE | queue_map_update | Not needed |
| N/A | 005BA206 | apply_map_updates | Not needed |
| N/A | 0059B571 | netmgr_update_player_list | WebSocket lobby |
| N/A | 0059B7FC | netmgr_add_client | WebSocket lobby |
| N/A | 0059B96A | netmgr_remove_client | WebSocket lobby |
| N/A | 0059C0E1 | netmgr_build_packet | WebSocket JSON |

---

## Priority Gaps for Implementation

### P0 — Required for New Game Without .SAV
All currently working via hardcoded rules. The system starts new games successfully.

1. **No blocking issues** — `initNewGame()` works end-to-end
2. Hardcoded rules match standard MGE RULES.TXT

### P1 — Required for Scenario Support
| Gap | Binary Function | Impact |
|---|---|---|
| RULES.TXT parser | load_all_rules (0041B00E) | Cannot load scenarios with custom rules |
| Scenario start setup | setup_scenario_start (004A9785) | Stub: no cities/units/buildings per era |
| Leader normalization | normalize_leader_data (00419ED3) | Scenario leader data may have negative values |
| Rules reload | reload_rules_for_scenario (0041E864) | Scenario-specific rules not loaded |

### P2 — Required for Full Game Loop Fidelity
| Gap | Binary Function | Impact |
|---|---|---|
| Trade route map | build_trade_route_map (0055A980) | Missing trade connectivity; affects caravan/freight calculations |
| Leader gender | new_civ leader gender init | Missing male/female title forms in diplomacy |
| Leader personality | new_civ personality traits | AI research/diplomacy personality not modeled |

### P3 — Nice to Have
| Gap | Binary Function | Impact |
|---|---|---|
| Save file writer | write_save_file (004741BE) | Cannot export to .SAV format |
| Continent adjacency | continent_calc_adjacency (004B315C) | Used for trade route map |
| find_nearest_unit | find_nearest_unit (005B67AF) | AI placement helper |
| CIV2.DAT prefs | save_civ2_dat (004A73D9) | Local preferences file; N/A for web |
