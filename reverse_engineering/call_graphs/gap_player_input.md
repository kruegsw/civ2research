# Player Input Gap Analysis — Binary vs JS Engine

Generated: 2026-03-20

Binary entry points analyzed at depth 0-2 (GL/AI/MIXED only; FW skipped):
- `00410F77` map_window_click
- `004125C6` map_key
- `00411F91` map_ascii
- `004E2803` main_menu_command_dispatch

Legend: **✓** IMPLEMENTED | **~** PARTIAL | **✗** MISSING

---

## 1. Map Window Click (`00410F77`)

The binary click handler routes to: city open, unit selection, directional movement,
goto execution, paradrop, sentry toggling, and city disorder display.

| Status | Binary Function | JS Equivalent | Notes |
|--------|----------------|---------------|-------|
| ✓ | `find_city_at` | `findCityAt()` in app.js + engine/utils.js | |
| ✓ | `is_tile_valid` | `inBounds()` checks throughout engine | |
| ✓ | `civ_has_tech` | `hasTech()` in utils.js, buildcheck.js, research.js | |
| ✓ | `move_unit` | `MOVE_UNIT` action → reducer.js, reduce/move-unit.js | Full implementation: combat, transport loading, goody huts |
| ✓ | `unit_order_goto` | `GOTO` action → reducer.js + pathfinding.js | Client has goto mode with click-to-set-destination |
| ✓ | `unit_order_sentry` | `UNIT_ORDER order:'sentry'` → reducer.js | |
| ✓ | `execute_paradrop` | `PARADROP` action → reducer.js + movement.js | validateParadrop + resolveParadropScatter |
| ✓ | `find_unit_stack_at_xy` | Inline unit filtering in app.js handleMapClick | |
| ✓ | `get_tile_explored` | visibility.js `computeLOS()` + `filterStateForCiv()` | |
| ~ | `handle_city_disorder_00509590` | City dialog opens but no dedicated disorder UI | Binary shows disorder-specific city window |

### Depth 2 GL functions under map_window_click

| Status | Binary Function | JS Equivalent | Notes |
|--------|----------------|---------------|-------|
| ✓ | `calc_unit_goto_direction` | pathfinding.js | A* pathfinder replaces binary's simpler approach |
| ✓ | `resolve_combat` | combat.js `resolveCombat()` | Round-by-round with all modifiers |
| ✓ | `process_unit_move_visibility` | visibility.js `updateVisibility()` | |
| ✓ | `handle_city_capture` | citycapture.js `handleCityCapture()` | Full implementation including civil war |
| ✓ | `diplomacy_check_attack_allowed` | reduce/helpers.js `checkSenateVeto()` | |
| ✓ | `handle_nuke_attack` | nuclear.js `handleNuclearAttack()` | SDI defense, fallout, unit destruction |
| ✓ | `process_goody_hut` | reduce/move-unit.js `resolveGoodyHut()` | |
| ✓ | `handle_caravan_arrival` | `ESTABLISH_TRADE` / `CARAVAN_HELP_WONDER` actions | |
| ✓ | `spy_enters_city` | espionage.js (8+ spy operations) | |
| ✓ | `check_zoc_violation` | movement.js `isZOCBlocked()` | |
| ✓ | `tile_distance_xy` | defs.js `tileDist()` used throughout | |
| ✓ | `calc_movement_cost` | movement.js `moveCost()` | |
| ✓ | `delete_unit` / `delete_unit_safely` | reduce/helpers.js `killUnit()` | |
| ✓ | `create_unit` | reduce/helpers.js `makeUnit()` | |
| ✓ | `load_unit_onto_ship` | movement.js `loadUnitsOntoShip()` | |
| ✓ | `calc_unit_movement_points` | movement.js `calcEffectiveMovementPoints()` | |
| ✓ | `wrap_x` | utils.js `wrapGx()` | |
| ✓ | `is_tile_ocean` | Inline terrain checks `terrain === 10` | |
| ✓ | `claim_adjacent_ocean_tiles` | production.js `expandCityTerritory()` | Different approach: territory expansion system vs explicit ocean claim |
| ✓ | `set_paradrop_range` | defs.js `UNIT_PARADROP_RANGE` constant table | Static data vs binary's runtime writes |
| ~ | `spy_sabotage_unit` | `BRIBE_UNIT` action exists, but no "blow up" option | Binary has sabotage (blow up) as distinct from bribe |
| ✗ | `mp_lock_map` / `mp_unlock_map` | N/A | Binary's native MP sync; JS uses WebSocket state |

---

## 2. Map Key Handler (`004125C6`)

Binary virtual key handler: F1-F10 = advisors, Ctrl+S = save, Ctrl+L = load,
End = end turn, numpad = movement, various unit orders, cheat keys.

### Advisor Screens (F-keys)

| Status | Binary Function | JS Key | Notes |
|--------|----------------|--------|-------|
| ✓ | F1 = Civilopedia | F1 | advisors.js `showCivilopedia()` |
| ✓ | F2 = Military Advisor | F2 | advisors.js `showMilitaryAdvisor()` |
| ✓ | F3 = Trade Advisor | F3 | advisors.js `showTradeAdvisor()` |
| ✓ | F4 = City Status | F4 | advisors.js `showCityList()` |
| ✓ | F5 = Science Advisor | F5 | advisors.js `showScienceAdvisor()` |
| ✓ | F6 = Tech Tree | F6 | advisors.js `showTechTree()` |
| ✓ | F7 = Spaceship | F7 | dialogs.js `showSpaceshipDialog()` |
| ✓ | F8 = Score | F8 | dialogs.js `showScoreScreen()` |
| ✓ | F11 = Demographics | F11 | advisors.js `showDemographics()` |
| ~ | F9 = Attitude Advisor | — | Binary has attitude advisor; JS has diplomacy panel |
| ~ | F10 = Top 5 Cities | — | Not bound to F10 |

### Unit Orders (keyboard shortcuts)

| Status | Binary Function | JS Key | Notes |
|--------|----------------|--------|-------|
| ✓ | `unit_order_fortify` | F | `UNIT_ORDER order:'fortify'` |
| ✓ | `unit_order_sentry` | S | `UNIT_ORDER order:'sentry'` |
| ✓ | `(unit_order_wait)` | W | Skip to next unit, come back later |
| ✓ | Space = skip turn | Space | `UNIT_ORDER order:'skip'` |
| ✓ | `unit_order_build_city` | B | `BUILD_CITY` action with name dialog |
| ✓ | `unit_order_build_improvement` (irrigate) | I | `WORKER_ORDER order:'irrigation'` |
| ✓ | `unit_order_build_improvement` (mine) | M | `WORKER_ORDER order:'mine'` |
| ✓ | `unit_order_build_improvement` (road) | R | `WORKER_ORDER order:'road'` |
| ✓ | `unit_order_build_improvement` (fortress) | O | `WORKER_ORDER order:'fortress'` |
| ✓ | `unit_order_build_improvement` (airbase) | E | `WORKER_ORDER order:'airbase'` |
| ✓ | `unit_order_build_improvement` (pollution) | Shift+P | `WORKER_ORDER order:'pollution'` |
| ✓ | `unit_order_disband` | Shift+D | `UNIT_ORDER order:'disband'` with confirm |
| ✓ | `unit_order_pillage` | P | `PILLAGE` action |
| ✓ | `unit_order_goto` (enter goto mode) | G | Click destination on map |
| ✓ | `move_unit` (numpad) | Numpad 1-9 | `MOVE_UNIT` with direction |
| ✓ | `handle_revolution` | Shift+R | Revolution dialog |
| ✓ | Tab = next unit | Tab | `findNextMovableUnit()` |
| ✓ | Enter = end turn | Enter | `END_TURN` when no movable units |
| ✓ | `unit_order_airlift` | via unit context menu | `AIRLIFT` action |
| ✓ | `end_turn_prompt` | Enter | Sends END_TURN action |
| ✓ | `show_tax_rate_dialog` | Shift+T / status bar click | dialogs.js `showRateSliders()` |
| ~ | `unit_order_goto_city` | G + click | Binary has a city-list picker; JS uses map-click goto |
| ~ | `unit_order_home_city` | via unit context menu | `UNIT_ORDER` — reducer handles rehoming partially |
| ~ | `(unit_order_automate_settler)` | — | No settler automation in JS |
| ~ | `unit_order_unload` | via unit context menu | Transport unloading partially implemented |
| ~ | `(unit_order_unload_transport)` | via unit context menu | Partial — wakes carried units |
| ✗ | `unit_order_wake_all_own` | — | Binary wakes ALL own units; JS only wakes individual |
| ✗ | `unit_order_activate` | — | Binary activates unit in place (move with dir=-1) |

### Save/Load & Game Management

| Status | Binary Function | JS Key | Notes |
|--------|----------------|--------|-------|
| ✗ | `save_game` (Ctrl+S) | — | Server-authoritative; no client save |
| ✗ | `load_game_handler` (Ctrl+L) | — | Games are loaded via lobby/server |
| ✗ | `save_civ2_dat` | — | No local preferences file |
| ✗ | `clear_game_active_flag` | — | N/A for WebSocket architecture |
| ~ | `handle_quit_or_retire` | Back button in hamburger menu | No retirement scoring, no Hall of Fame |

### Diplomacy

| Status | Binary Function | JS Equivalent | Notes |
|--------|----------------|---------------|-------|
| ✓ | `show_foreign_advisor` | diplomacy-ui.js `showDiplomacyPanel()` | Diplomacy overview panel |
| ✓ | `parleywin_start_session` | diplomacy-ui.js `openDiplomacyDialog()` | Negotiation with tech/gold/treaty offers |
| ✓ | `set_treaty_flags` | diplomacy.js `setTreatyFlags()` / `addTreatyFlag()` | Full cascading flag logic |
| ✓ | `calc_attitude` | diplomacy.js `getAttitudeLevel()` | |
| ✓ | `ai_diplomacy_negotiate` | ai/diplomai.js | Full AI negotiation logic |
| ✓ | `ai_evaluate_diplomacy` | ai/diplomai.js | |

### Cheat Functions

| Status | Binary Function | Notes |
|--------|----------------|-------|
| ✗ | `toggle_cheat_mode` | No cheat mode in JS |
| ✗ | `cheat_reveal_map` | |
| ✗ | `cheat_edit_tech` | |
| ✗ | `cheat_change_govt` | |
| ✗ | `cheat_edit_terrain` | |
| ✗ | `cheat_place_unit` | |
| ✗ | `cheat_change_player` | |
| ✗ | `cheat_change_human_civ` | |
| ✗ | `cheat_set_game_year` | |
| ✗ | `cheat_destroy_civ` | |
| ✗ | `cheat_set_money` | |
| ✗ | `cheat_edit_unit` | |
| ✗ | `cheat_edit_civ` | |
| ✗ | `cheat_edit_scenario` | |
| ✗ | `set_city_shields` (city editor) | |
| ✗ | `toggle_cheat_multiplayer` | |

---

## 3. Map ASCII Handler (`00411F91`)

Routes ASCII characters when in map view. Overlaps significantly with map_key.
Additional unique bindings:

| Status | Binary Function | JS Key | Notes |
|--------|----------------|--------|-------|
| ✓ | `show_tax_rate_dialog` | Shift+T | dialogs.js `showRateSliders()` |
| ✓ | `handle_revolution` | Shift+R | Revolution dialog |
| ✓ | `handle_unit_keypress` | B/F/G/I/M/R/S/etc. | All unit order keys implemented |
| ✓ | `unit_order_disband` | Shift+D | With confirmation dialog |
| ✓ | `city_button_buy` | In city dialog UI | `RUSH_BUY` action |
| ✓ | `city_button_change` | In city dialog UI | `CHANGE_PRODUCTION` action |
| ~ | `city_button_rename` | In city dialog UI | `RENAME_CITY` action |
| ~ | `city_button_view` | In city dialog | City detail view exists but simplified |
| ~ | `unit_order_home_city` | H key via unit menu | Reducer handles it; some edge cases missing |
| ✓ | `save_game` (Ctrl+S shortcut) | — | See note: server handles saves |
| ✓ | `activate_current_unit` | Tab cycles, click selects | |
| ~ | `select_next_unit` | Tab key | Similar but not identical algorithm |

### City Dialog Shortcuts (A/C for change production, etc.)

| Status | Binary ASCII Key | JS Equivalent | Notes |
|--------|-----------------|---------------|-------|
| ✓ | A/C/a/c = change production | city-ui.js production picker | |
| ✓ | B/b = rush buy | city-ui.js buy button | |
| ~ | V/v = view improvements | City dialog shows improvements | No separate view mode |
| ~ | N/n = rename city | Rename in city dialog | |

---

## 4. Main Menu Command Dispatch (`004E2803`)

Routes ~98 menu command IDs (0x101-0x9f0) to handlers. Below groups
the GL/AI/MIXED targets by category with JS implementation status.

### Game Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ~ | `load_game_handler` | Game → Load | Server-side load via lobby |
| ✗ | `save_game` | Game → Save | No client-side save |
| ✗ | `save_civ2_dat` | — | N/A |
| ✗ | `show_game_options_dialog` | Game → Options | No game options dialog |
| ✗ | `show_graphic_options_dialog` | Game → Graphic Options | N/A (web renderer) |
| ✗ | `show_message_options_dialog` | Game → Message Options | No message filtering |
| ✗ | `show_multiplayer_options_dialog` | Game → MP Options | No dedicated MP options dialog |
| ✗ | `mp_set_password` | Game → Set Password | Auth handled by lobby/server |
| ~ | `handle_quit_or_retire` | Game → Retire/Quit | Back button exists, no retirement scoring |
| ✗ | `init_city_windows_layout` | — | N/A (HTML layout) |

### Kingdom Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ✓ | `show_tax_rate_dialog` | Kingdom → Tax Rate | dialogs.js `showRateSliders()` |
| ✓ | `handle_revolution` | Kingdom → Revolution | advisors.js `showRevolutionDialog()` |

### View Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ✓ | Civilopedia | View → Civilopedia | advisors.js `showCivilopedia()` |
| ✓ | Score | View → Score | dialogs.js `showScoreScreen()` |
| ✓ | Demographics | View → Demographics | advisors.js `showDemographics()` |
| ✓ | Spaceship | View → Spaceship | dialogs.js `showSpaceshipDialog()` |

### Advisor Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ✓ | City Status | Advisors → City Status | advisors.js `showCityList()` |
| ✓ | Military Advisor | Advisors → Military | advisors.js `showMilitaryAdvisor()` |
| ✓ | Science Advisor | Advisors → Science | advisors.js `showScienceAdvisor()` |
| ✓ | Trade Advisor | Advisors → Trade | advisors.js `showTradeAdvisor()` |
| ✓ | Foreign Advisor / Diplomacy | Advisors → Foreign | diplomacy-ui.js `showDiplomacyPanel()` |
| ~ | Attitude Advisor | Advisors → Attitude | Diplomacy panel shows attitudes, no dedicated dialog |
| ~ | Top 5 Cities | Advisors → Top 5 | Not implemented as separate screen |
| ~ | Power Graph | — | Not implemented |
| ~ | Government Council | Advisors → Council | advisors.js `showGovernmentCouncilDialog()` |

### Unit Order Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ✓ | `unit_order_build_city` | Orders → Build City | B key / context menu |
| ✓ | `unit_order_build_improvement` | Orders → Road/Irrigate/etc. | R/I/M/O/E keys |
| ✓ | `unit_order_fortify` | Orders → Fortify | F key |
| ✓ | `unit_order_sentry` | Orders → Sentry | S key |
| ✓ | `(unit_order_wait)` | Orders → Wait | W key |
| ✓ | `unit_order_pillage` | Orders → Pillage | P key |
| ✓ | `unit_order_disband` | Orders → Disband | Shift+D |
| ✓ | `unit_order_goto` | Orders → Go To | G key + click |
| ✓ | `unit_order_airlift` | Orders → Airlift | Context menu / AIRLIFT action |
| ✓ | `end_turn_prompt` | Orders → End Turn | Enter key |
| ✓ | `activate_current_unit` | Orders → Activate | Tab/click |
| ✓ | `unit_order_build_improvement` (all variants) | Orders → various | road/railroad/irrigate/mine/fortress/airbase/pollution |
| ~ | `unit_order_goto_city` | Orders → Go To City | JS uses map-click goto, no city-list picker |
| ~ | `unit_order_home_city` | Orders → Home City | Partial in reducer; missing some edge cases |
| ~ | `unit_order_unload` | Orders → Unload | Partial transport unloading |
| ~ | `(unit_order_unload_transport)` | Orders → Unload Transport | Partial |
| ~ | `(unit_order_automate_settler)` | Orders → Automate | No settler automation |
| ✗ | `unit_order_wake_all_own` | Orders → Wake All | Not implemented |
| ✗ | `unit_order_activate` | Orders → Activate (in place) | Binary's "activate in place" not exposed |

### Multiplayer Menu Commands

| Status | Binary Handler | Menu Item | JS Equivalent |
|--------|---------------|-----------|---------------|
| ~ | `mp_join_game_handler` | MP → Join | Lobby handles joining |
| ✗ | `mp_set_password` | MP → Set Password | Server auth |

### Cheat Menu Commands (all ✗ MISSING)

| Binary Handler | Menu Item |
|----------------|-----------|
| `toggle_cheat_mode` | Cheat → Enable |
| `cheat_reveal_map` | Cheat → Reveal Map |
| `cheat_edit_tech` | Cheat → Edit Tech |
| `cheat_change_govt` | Cheat → Change Government |
| `cheat_edit_terrain` | Cheat → Edit Terrain |
| `cheat_place_unit` | Cheat → Place Unit |
| `cheat_change_player` | Cheat → Change Player |
| `cheat_change_human_civ` | Cheat → Change Human |
| `cheat_set_game_year` | Cheat → Set Year |
| `cheat_destroy_civ` | Cheat → Destroy Civ |
| `cheat_set_money` | Cheat → Set Money |
| `cheat_edit_unit` | Cheat → Edit Unit |
| `cheat_edit_civ` | Cheat → Edit Civ |
| `cheat_edit_scenario` | Cheat → Scenario Editor |
| `set_city_shields` | Cheat → City Editor |
| `toggle_cheat_multiplayer` | Cheat → MP Cheat |

---

## 5. Shared Depth-2 GL/AI Engine Functions

These are the core game logic functions called by the player input handlers.
Most are well-implemented in the JS engine.

### Fully Implemented (✓)

| Binary Function | JS File(s) |
|-----------------|------------|
| `resolve_combat` | engine/combat.js |
| `handle_city_capture` | engine/citycapture.js |
| `handle_nuke_attack` | engine/nuclear.js |
| `process_goody_hut` | engine/reduce/move-unit.js |
| `handle_caravan_arrival` | engine/reducer.js (ESTABLISH_TRADE, CARAVAN_HELP_WONDER) |
| `spy_enters_city` (8 operations) | engine/espionage.js |
| `process_unit_move_visibility` | engine/visibility.js |
| `calc_unit_movement_points` | engine/movement.js |
| `check_zoc_violation` / `check_zoc_if_no_city` | engine/movement.js |
| `calc_movement_cost` | engine/movement.js `moveCost()` |
| `tile_distance_xy` / `distance_x_wrapped` | engine/defs.js `tileDist()` |
| `wrap_x` | engine/utils.js `wrapGx()` |
| `civ_has_tech` | engine/utils.js + throughout |
| `handle_tech_discovery` | engine/research.js `handleTechDiscovery()` |
| `calc_tech_cost` | engine/research.js `calcResearchCost()` |
| `civ_has_active_wonder` | engine/utils.js `hasWonderEffect()` |
| `is_wonder_obsolete` | engine/utils.js `wonderObsolete()` |
| `has_building` | engine/utils.js `cityHasBuilding()` |
| `can_build_unit_type` | engine/buildcheck.js |
| `can_build_improvement` | engine/buildcheck.js |
| `can_build_wonder` | engine/buildcheck.js |
| `calc_city_production` | engine/production.js (full yield pipeline) |
| `calc_food_box_with_difficulty` | engine/production.js `foodToGrow()` |
| `create_city` | engine/reducer.js (BUILD_CITY handler) |
| `delete_city` | engine/reducer.js (DESTROY_CITY handler) |
| `create_unit` | engine/reduce/helpers.js `makeUnit()` |
| `delete_unit` / `delete_unit_safely` | engine/reduce/helpers.js `killUnit()` |
| `set_government_type` | engine/diplomacy.js `applyGovernmentChangeEffects()` |
| `set_treaty_flags` / `clear_treaty_flags` | engine/diplomacy.js |
| `adjust_attitude` / `calc_attitude` | engine/diplomacy.js |
| `diplo_declare_war` | engine/diplomacy.js `declareWar()` |
| `diplomacy_check_attack_allowed` | engine/reduce/helpers.js `checkSenateVeto()` |
| `kill_civ` | engine/diplomacy.js `killCiv()` |
| `execute_airlift` | engine/reducer.js (AIRLIFT handler) + movement.js |
| `execute_worker_order` | engine/reduce/helpers.js `completeWorkerOrder()` + end-turn.js |
| `unit_pillage` | engine/reducer.js (PILLAGE handler) |
| `spaceship_human_build` | engine/spaceship.js |
| `calc_year_from_turn` | engine/year.js `getGameYear()` |
| `load_unit_onto_ship` | engine/movement.js `loadUnitsOntoShip()` |
| `unit_order_found_city` | engine/reducer.js (BUILD_CITY handler) |
| `check_adjacent_water` | engine/rules.js (irrigation validation) |
| `find_nearest_city` | Used inline in various engine files |
| `ai_choose_city_production` | engine/ai/prodai.js |
| `ai_evaluate_diplomacy` | engine/ai/diplomai.js |
| `ai_diplomacy_negotiate` | engine/ai/diplomai.js |
| `event_check_negotiation` | engine/events.js |
| `check_tile_goody_hut` | engine/reduce/move-unit.js |
| `change_city_production` | engine/reducer.js `CHANGE_PRODUCTION` case |
| `choose_research_tech` | client: advisors.js `showResearchPicker()`, AI: ai/econai.js |
| `revolution_dialog` | advisors.js `showRevolutionDialog()` |
| `open_tax_rate_dialog` | dialogs.js `showRateSliders()` |

### Partially Implemented (~)

| Binary Function | Gap Description |
|-----------------|-----------------|
| `spy_sabotage_unit` | `BRIBE_UNIT` implemented, but binary also has "blow up with explosives" option for spies |
| `handle_city_disorder_00509590` | City dialog opens but no dedicated disorder-specific flow |
| `select_next_unit` | Tab cycles through units; algorithm differs from binary's priority |
| `unit_order_home_city` | Basic rehoming works; caravan/freight edge cases may differ |
| `complete_research` | `handleTechDiscovery()` covers this, but binary's UI flow (choose-next dialog) differs |
| `claim_adjacent_ocean_tiles` | Territory expansion exists but uses score-based approach vs binary's explicit adjacent ocean claim |
| `load_city_preferences` | No CITYPREF.TXT support; AI has its own priority system |
| `activate_current_unit` | Unit activation works but binary's exact state machine transitions differ |
| `update_menu_state` | N/A — JS uses different UI paradigm (no Win32 menus) |

### Missing (✗)

| Binary Function | Description |
|-----------------|-------------|
| `kill_or_retire_civ` | No retirement/kill flow |
| `submit_hall_of_fame_entry` | No Hall of Fame |
| `write_save_file` | Server-authoritative; no client save format |
| `load_verify_units` | Server handles loading |
| `scenario_player_selection` | No scenario system |
| `spaceship_ai_should_start` | AI spaceship decision logic not fully ported |
| `mp_lock_map` / `mp_unlock_map` | Binary's native MP tile locking; JS uses WebSocket |
| `net_send_message` / `diff_engine_scan_and_send` | Binary's native network; JS uses WebSocket |
| `toggle_unit_movement_doubling` | MP movement doubling not implemented |
| `mp_update_password_flags` | Different auth model |
| `mp_handle_player_turn` | Different turn management model |
| `game_timer_dialog` | No turn timer UI |
| `start_turn_timer` / `stop_turn_timer` / `resume_turn_timer` | No turn timer |
| `enqueue_mp_event` | Different event model |
| `init_city_production_globals` | N/A — no globals in JS architecture |
| `set_paradrop_range` | Static in defs.js |
| `validate_unit_stack` | JS uses arrays, not linked lists |
| All `cheat_*` functions (16) | No cheat mode |

---

## 6. Summary Statistics

| Category | Count |
|----------|-------|
| **✓ Fully Implemented** | ~95 unique functions |
| **~ Partially Implemented** | ~15 unique functions |
| **✗ Missing** | ~30 unique functions |
| **Skipped (FW/UI/Net)** | ~70 functions |

### Coverage by Entry Point

| Entry Point | GL/AI/MIXED D1 | ✓ | ~ | ✗ |
|-------------|----------------|---|---|---|
| map_window_click | 10 | 8 | 1 | 1 |
| map_key | 32 | 17 | 5 | 10 |
| map_ascii | 11 | 8 | 2 | 1 |
| menu_command_dispatch | 49 | 18 | 5 | 26 |

### Key Gaps for Gameplay Completeness

**High priority (affects core gameplay):**
1. **Settler Automation** (`unit_order_automate_settler`) — AI-managed settlers, common player action
2. **Wake All Units** (`unit_order_wake_all_own`) — Convenience command, easy to add
3. **Go-To City Dialog** (`unit_order_goto_city`) — City-list picker instead of map-click-only
4. **Transport Unload** (`unit_order_unload` / `unit_order_unload_transport`) — Partial; needs completion
5. **Home City reassignment edge cases** — Caravan/freight special rules

**Medium priority (quality-of-life):**
6. **Turn Timer** — For competitive multiplayer
7. **Retirement/Score** — End-game scoring flow
8. **Attitude Advisor** — Dedicated dialog vs embedded in diplomacy panel
9. **Top 5 Cities / Power Graph** — Info screens
10. **Game/Graphic/Message Options dialogs** — Settings management

**Low priority (not needed for core game):**
11. All 16 cheat functions — Debug/scenario editing tools
12. Hall of Fame — Persistence feature
13. Binary-native MP features (tile locking, diff engine) — Replaced by WebSocket architecture
14. Save/Load from client — Server-authoritative design handles this differently
