# Block 00520000 -- Phase 7 Audit

**Functions in this block: 51**
**System: Multiplayer setup dialogs, Civilopedia detail rendering, Diplomacy/Parley window UI, unit/city lookup**

---

## FW -- Framework (15 functions)

FUN_00521807 | 12B | N/A (SEH destructor thunk -- calls CRT frame cleanup FUN_0059df8a)
FUN_0052181d | 15B | N/A (SEH epilog -- restores FS:[0] exception chain)
FUN_00521faf | 12B | N/A (SEH destructor thunk -- calls FUN_005c656b cleanup)
FUN_00521fbb | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00521fd1 | 15B | N/A (SEH epilog -- restores FS:[0])
FUN_00522617 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_0052262d | 15B | N/A (SEH epilog -- restores FS:[0])
FUN_00522b06 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00522b1c | 15B | N/A (SEH epilog -- restores FS:[0])
FUN_00522dd6 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_00522dec | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_005233d8 | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_005233ee | 14B | N/A (SEH epilog -- restores FS:[0])
FUN_005246bf | 12B | N/A (SEH destructor thunk -- calls FUN_0059df8a)
FUN_005246d5 | 15B | N/A (SEH epilog -- restores FS:[0])

---

## UI -- User Interface: Multiplayer Setup (12 functions)

FUN_0052182c | 159B | N/A (mp_build_label_string -- builds UI label text for MP dialogs; string concat + alloc)
FUN_005218cb | 1764B | N/A (mp_scenario_load_dialog -- master MP scenario load flow; shows SCENARIOLOADED/DIFFICULTY/ADVANCEDMP dialogs, CSocket::Create for network, reads map dimensions, sets difficulty level)
FUN_00521fe0 | 1591B | N/A (mp_choose_players_dialog -- iterates human player count, shows civ selection per player, sets human_civs bitmask DAT_00655b0b, shows GENDER dialog, copies leader portrait data)
FUN_0052263c | 185B | N/A (mp_set_animation_style -- cycles through animation states 5/6/7 in DAT_00631ef0; calls FUN_0055a41d for display update)
FUN_005226fa | 192B | N/A (mp_get_scroll_offset -- returns scroll offsets for MP dialog positioning; 4-state cycle computing screen-relative offsets)
FUN_005227e3 | 773B | N/A (mp_hotseat_config_dialog -- hot-seat MP config; shows HOTSEAT2 dialog, manages AI player count DAT_00655b0d, enables/disables player slots)
FUN_00522b2b | 683B | N/A (mp_join_game_handler -- manages joining MP game; saves/restores global state, counts human vs AI players, shows JOINGAME0/1/3 messages)
FUN_00522dfa | 405B | N/A (mp_negate_leader_ids -- iterates 21 leader slots, negates positive values to mark leaders as "taken" in MP setup)
FUN_00522f8f | 1097B | N/A (mp_assign_ai_opponents -- assigns AI civs for MP; sets DAT_00655b0a, negates leader IDs for non-human civs, randomly assigns remaining slots, optionally shows OPPONENT selection dialog)
FUN_005233fc | 2446B | N/A (mp_register_network_player -- processes network player join packet; reads civ index, leader graphic, gender, player/city names from packet; updates civ array, leader table, human_civs bitmask; finds matching network socket slot; returns 1=success/0=no slot)
FUN_00523d8a | 376B | N/A (mp_send_network_state_all -- sends 12 network messages types 0x17-0x1E + 0x21-0x24 via thunk_FUN_0046b14d; broadcasts full game state)
FUN_00523f02 | 1976B | N/A (mp_choose_additional_player -- dialog loop for selecting additional players in network MP; lists active civs, allows selection, verifies name, loads preferences, shows GENDER dialog)

---

## UI -- User Interface: Civilopedia (3 functions)

FUN_005261a0 | 365B | N/A (civpedia_init_list -- initializes scrollable list widget; bounds-checks index against item count, copies items, sets scroll position, adjusts for groups of 9)
FUN_0052630d | 1542B | N/A (civpedia_draw_detail -- draws Civilopedia detail page for improvement/wonder; shows prereq tech, cost formatted as "%d" with *10 multiplier, obsolescence tech, description text, renders sprites)
FUN_00526913 | 334B | N/A (civpedia_select_item -- selects item in Civilopedia list by searching item array, updates current index, redraws detail pane; guards on civpedia_is_open flag)

---

## UI -- User Interface: Diplomacy/Parley Window (14 functions)

FUN_00526ca0 | 26152B | N/A (parley_add_dialog_panel -- 26KB master diplomacy window panel builder; param_1 selects panel type 0-0x14, param_2 selects left/right side; panel types: 0=empty, 1=main menu with map/science/gold buttons, 2=select treaty, 3/4=propose/demand items, 5=peace/alliance terms, 6=current status display, 7=tribute/gift amounts, 8=city trade list, 9=gold exchange with numeric input, 0xA=unit/tech exchange, 0xB=war/cease-fire, 0xC=demand items, 0xD=threat/ultimatum, 0xE=diplomatic actions sub-states, 0xF=propose full deal, 0x11=city gift list, 0x12=accept text display, 0x13/0x14=tech tree views; creates CCheckListBox, radio buttons, text edits; accesses treaty flags bits 2/4/8/0x20/0x80 and GAME.TXT string table)
FUN_0052d4d2 | 81B | N/A (parley_on_treaty_status_select -- sets treaty status selection +0x218 on parley window object)
FUN_0052d523 | 101B | N/A (parley_on_demand_type_select -- sets demand type +0x214, calls parley_add_dialog_panel for right side)
FUN_0052d588 | 85B | N/A (parley_on_generic_select -- generic selection handler, stores selection at computed offset)
FUN_0052d5dd | 265B | N/A (parley_on_tribute_type_select -- sets tribute type +0x220, maps selection to panel state 7-11, calls parley_add_dialog_panel)
FUN_0052d6ff | 216B | N/A (parley_on_war_peace_select -- sets +0x21C, maps 0->0xC war options / 1->0xD peace options, calls parley_add_dialog_panel)
FUN_0052d7dc | 425B | N/A (parley_on_propose_item_toggle -- handles checkbox toggle in propose/demand item lists; manages mutual exclusion between treaty items via CCheckListBox::GetCheckStyle)
FUN_0052d9a1 | 130B | N/A (parley_on_timer_tick -- timer handler; checks streambuf egptr() for panel readiness, then calls parley_advance_negotiation)
FUN_0052da23 | 282B | N/A (parley_reject_proposals -- clears acceptance flags +0x3BD/+0x3BE, sends network messages 0xA6 and 0xA8 reject types)
FUN_0052db3d | 321B | N/A (parley_accept_proposals -- sets acceptance flags +0x3BD/+0x3BE=1, sends network messages 0xA5 and 0xA7 accept types)
FUN_0052dc7e | 245B | N/A (parley_show_intelligence -- checks for Espionage tech 0x18 or Writing tech 9 or embassy bit 0x80 or god_mode; shows NOINTEL message if none, else calls intelligence display)
FUN_0052dd73 | 1425B | N/A (parley_advance_negotiation -- main negotiation state machine; state 3=main menu reads CCheckListBox selection and transitions to sub-states; state 5=treaty reads left/right selections; states 6-0xF build diplomacy proposal via FUN_004db690, check treaty flags for declare-war via FUN_00467750; updates both panels)
FUN_0052e326 | 381B | N/A (parley_go_back -- back button; from states 5-0xF returns to state 3 main menu, from state 0xE returns to state 5 treaty; reloads both panels)
FUN_0052e4c9 | 179B | N/A (parley_on_accept_deal -- sends network message 0x83 accept, shows PARLEYACCEPT2 popup, resets state to 3, calls FUN_004b8676 to finalize)

---

## UI -- User Interface: Parley Button/Checkbox Handlers (4 functions)

FUN_0052e57c | 265B | N/A (parley_on_reject_deal -- sends network message 0x84 reject, sets state to 2 counter-proposal, reloads both panels)
FUN_0052e685 | 149B | N/A (parley_on_end_negotiations -- sends network message 0x85 end, resets state to 3, calls FUN_004b8676)
FUN_0052e71a | 152B | N/A (parley_on_civ_button_click -- handles civ flag button clicks ctrl IDs 0x429-0x42F, updates DAT_0068af08 array)
FUN_0052e7b7 | 389B | N/A (parley_on_checkbox_state_change -- handles checkbox state for treaty/deal panels; ctrl 0x415=map sharing, 0x416=science exchange auto-enables all civ entries, 0x417-0x41D=per-civ entries, 0x430=gold)

---

## UI -- User Interface: Parley Button State Management (1 function)

FUN_0052e971 | 678B | N/A (parley_update_button_states -- updates Accept/Back/Continue button enabled/disabled based on negotiation state +0x1EC; different logic for states 1/2, 3/5, 6-0xF, 0xE)

---

## GL -- Game Logic: Unit/City Lookup (2 functions)

FUN_0052ec47 | 329B | find_unit_by_alive_flag
  Binary: Searches unit array backwards from DAT_00655b16 for a unit with alive_flag at offset +0x1A matching param_1. After finding the unit, checks 8 adjacent tiles (direction offsets DAT_00628350/00628360) for passability via tile_wrap (FUN_005ae052), tile_valid (FUN_004087c0), and unit_can_enter (FUN_005b89e4). Returns unit index if found with passable adjacent tile, -1 if not found, -2 if unit is surrounded (no passable adjacent tile and movement check via FUN_005b50ad also fails).
  JS: engine/utils.js findUnitByIndex(state, ownerCiv) -- searches backwards for first unit with gx >= 0 belonging to ownerCiv. Returns index or -1.
  **DISCREPANCY: Different semantics.** The binary searches by alive_flag (a handle/ID field at offset +0x1A in the unit struct), not by owner. The binary also performs an 8-direction adjacency passability check and returns -2 when the unit is surrounded with no valid moves. The JS version searches by owner civ and does not check surrounding tiles. These serve different purposes: the binary function is used by the diplomacy/network system to resolve a unit handle to an index and verify it can be moved, while the JS function finds any unit belonging to a civ.

FUN_0052ed95 | 128B | find_city_by_id
  Binary: Searches city array backwards from DAT_00655b18 for a city with population field at offset +0x54 matching param_1 (nonzero = alive check) AND the same offset value equaling param_1. Returns city index or -1.
  JS: engine/utils.js findCityById(state, cityId) -- searches backwards for city with size > 0 and id === cityId. Returns index or -1.
  Match: **YES** -- semantically equivalent. Both search backwards through the city array, check for alive/active status (binary: population != 0, JS: size > 0), and match on the city ID field. The binary uses a single field at offset +0x54 that serves as both alive check and ID match, while JS uses separate size and id fields, but the logic is the same.

---

## Summary

| Category | Count |
|----------|-------|
| FW (Framework -- SEH stubs, destructors) | 15 |
| UI (Multiplayer setup dialogs) | 12 |
| UI (Civilopedia detail rendering) | 3 |
| UI (Diplomacy/Parley window) | 19 |
| GL (Game Logic -- unit/city lookup) | 2 |
| **Total** | **51** |

### GL Discrepancy Summary

| Function | Binary Name | JS Location | Status |
|----------|------------|-------------|--------|
| FUN_0052ec47 | find_unit_by_alive_flag | engine/utils.js findUnitByIndex | **DISCREPANCY** -- different search key (alive_flag/handle vs owner), binary also checks 8-direction adjacency passability and returns -2 for surrounded units |
| FUN_0052ed95 | find_city_by_id | engine/utils.js findCityById | Match -- semantically equivalent backward search by city ID with alive check |

### Notes

1. This block is overwhelmingly UI code (34/51 functions = 67%). The multiplayer setup cluster (0x521807-0x5246D5) handles scenario loading, player selection, hot-seat configuration, network join, and AI opponent assignment -- all Win32 dialog code with no portable game logic.

2. The diplomacy/parley cluster (0x526CA0-0x52E971) is the largest UI system in this block, anchored by the 26KB FUN_00526ca0 which builds all 21 diplomatic panel types. This is the visual front-end for the diplomacy engine already ported in engine/diplomacy.js. The state machine (FUN_0052dd73) and button handlers drive the negotiation flow but contain no game logic mutations -- they construct UI proposals that are executed by the transaction system in block 004D.

3. The Civilopedia cluster (3 functions) renders improvement/wonder detail pages. The cost display formula (byte_value * 10) and prerequisite/obsolescence tech lookups confirm data already in engine/defs.js.

4. Only 2 functions contain game logic. FUN_0052ed95 (find_city_by_id) matches the JS implementation well. FUN_0052ec47 (find_unit_by_alive_flag) has a significant semantic difference from the JS findUnitByIndex -- the binary function resolves a unit handle/ID rather than searching by owner, and includes an adjacency passability check that the JS lacks. However, FUN_0052ec47 is only called from the diplomacy/network system (parley unit transfer), and the JS WebSocket architecture handles unit references differently (by array index directly), so this difference is by design rather than a bug.
