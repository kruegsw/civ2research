# Phase 1 Audit: block_00520000 (0x00520000 - 0x0052FFFF)

## Overview
This block contains **51 functions** spanning two major subsystems:
1. **Multiplayer game setup** (0x521807-0x5246D5): Hot-seat, network, and scenario loading dialogs
2. **Diplomacy/Parley window** (0x5261A0-0x52ED95): The full negotiation UI with all diplomatic options

---

### Cluster: Multiplayer Scenario Load (SEH wrappers + main logic)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x521807 | stub | FUN_00521807 | mp_scenario_load_dtor_thunk | 0 | void | SEH destructor thunk for mp_scenario_load; calls FUN_0059df8a (CRT frame cleanup) | FRAMEWORK |
| 0x52181D | stub | FUN_0052181d | mp_scenario_load_seh_epilog | 0 | void | SEH epilog: restores FS:[0] exception chain from EBP-0xC | FRAMEWORK |
| 0x52182C | small | FUN_0052182c | mp_build_label_string | 2 (obj, stringId) | void | Appends text resource (via thunk_FUN_004af14b) to obj+0x134 buffer. Uses strlen + alloc. Called to build MP dialog labels. | MEDIUM |
| 0x5218CB | xlarge | FUN_005218cb | mp_scenario_load_dialog | 1 (loadMode) | void | Master multiplayer scenario load flow. Calls load_verify_units, shows SCENARIOLOADED/DIFFICULTY/ADVANCEDMP dialogs, reads map dimensions from DAT_00666546-0066654e, sets difficulty (DAT_00655b08), handles network socket (CSocket::Create). String evidence: "SCENARIOLOADED", "DIFFICULTY", "ADVANCEDMP" | HIGH |
| 0x521FAF | stub | FUN_00521faf | mp_scenario_load_cleanup | 0 | void | SEH destructor thunk (calls FUN_005c656b) | FRAMEWORK |
| 0x521FBB | stub | FUN_00521fbb | mp_scenario_load_dtor2 | 0 | void | SEH destructor thunk (calls FUN_0059df8a) | FRAMEWORK |
| 0x521FD1 | stub | FUN_00521fd1 | mp_scenario_load_seh_epilog2 | 0 | void | SEH epilog: restores FS:[0] | FRAMEWORK |

### Cluster: Multiplayer Player Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x521FE0 | xlarge | FUN_00521fe0 | mp_choose_players_dialog | 1 (numPlayers) | void | Iterates numPlayers times, showing civ selection dialog for each human player. Lists active civs (DAT_00655b0a), sets DAT_00655b0b (human_civs_bitmask), DAT_00655b03 (active_civ), DAT_00655b05. Copies leader portrait data. Shows GENDER dialog. Reads leader_portrait_table (DAT_006554fc). String: "GENDER" | HIGH |
| 0x522617 | stub | FUN_00522617 | mp_choose_players_dtor | 0 | void | SEH destructor thunk | FRAMEWORK |
| 0x52262D | stub | FUN_0052262d | mp_choose_players_seh_epilog | 0 | void | SEH epilog: restores FS:[0] | FRAMEWORK |

### Cluster: Map View Rotation / Hot-Seat Config

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x52263C | small | FUN_0052263c | mp_set_animation_style | 2 (style, reset) | void | Cycles through animation states (5/6/7) stored in DAT_00631ef0. Calls thunk_FUN_0055a41d(2,6,style). If style==-1, cycles through a 3-state rotation. | MEDIUM |
| 0x5226FA | small | FUN_005226fa | mp_get_scroll_offset | 1 (init) | int | Returns scroll offsets for MP dialog positioning. Cycles through 4 states in DAT_00631eec, computing screen-relative offsets from DAT_006ab198 (screen_size_threshold). Returns -999 for no-scroll states. | MEDIUM |
| 0x5227E3 | medium | FUN_005227e3 | mp_hotseat_config_dialog | 0 | void | Hot-seat multiplayer configuration. Shows "HOTSEAT2" dialog, manages AI player count (DAT_00655b0d), enables/disables player slots (up to DAT_006c3164 max). Writes result to DAT_006665d8. String: "HOTSEAT2" | HIGH |
| 0x522B06 | stub | FUN_00522b06 | mp_hotseat_dtor | 0 | void | SEH destructor thunk | FRAMEWORK |
| 0x522B1C | stub | FUN_00522b1c | mp_hotseat_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |

### Cluster: Multiplayer Network Join

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x522B2B | medium | FUN_00522b2b | mp_join_game_handler | 0 | void | Manages joining a multiplayer game. Saves/restores DAT_006d1da0 (current_player), DAT_00655b0b, DAT_00655b03. Counts human vs AI players, shows JOINGAME0/1/3 messages. Calls mp_choose_additional_player (FUN_00523f02). String: "JOINGAME0", "JOINGAME1", "JOINGAME3" | HIGH |
| 0x522DD6 | stub | FUN_00522dd6 | mp_join_dtor | 0 | void | SEH destructor thunk | FRAMEWORK |
| 0x522DEC | stub | FUN_00522dec | mp_join_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |

### Cluster: Leader Data Processing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x522DFA | small | FUN_00522dfa | mp_negate_leader_ids | 0 | void | Iterates 0x15 (21) leader slots at DAT_00655502+n*0x30, negates any positive values to negative (sign flip). Processes leader/civ IDs and 7 sub-entries per leader. Used to mark leaders as "taken" in MP setup. | MEDIUM |

### Cluster: AI Opponent Setup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x522F8F | large | FUN_00522f8f | mp_assign_ai_opponents | 1 (numHuman) | void | Assigns AI civs for multiplayer. Sets DAT_00655b0a = DAT_00655b0b|1 (barbarians always active). Negates leader IDs for non-human civs. Randomly assigns remaining civ slots via rand()%8. If DAT_00631ee4 !=0, shows "OPPONENT" selection dialog per AI civ. String: "OPPONENT" | HIGH |
| 0x5233D8 | stub | FUN_005233d8 | mp_ai_opponents_dtor | 0 | void | SEH destructor thunk | FRAMEWORK |
| 0x5233EE | stub | FUN_005233ee | mp_ai_opponents_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |

### Cluster: Network Player Registration

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x5233FC | xlarge | FUN_005233fc | mp_register_network_player | 2 (packetPtr, socketId) | uint | Processes a network player join packet. Assert: DAT_006ad2f7==server flag (string: "gNetMgr.bServer"). Reads civ index (+0x10), leader graphic (+0x14), gender (+0x18), player name (+0x20), city names (+0x38/+0x50/+0x6c). Updates civ array (DAT_0064c6a0+civ*0x594), leader table (DAT_006554fc), human_civs bitmask. Finds matching network slot in DAT_006ad30c[7] (stride 0x54). Returns 1=success, 0=no slot. | HIGH |
| 0x523D8A | small | FUN_00523d8a | mp_send_network_state_all | 1 (param) | void | Sends 12 network messages (types 0x17-0x1E, 0x21-0x24) via thunk_FUN_0046b14d. Broadcasts full game state to network peers. | MEDIUM |

### Cluster: Additional Player Selection (Network)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x523F02 | xlarge | FUN_00523f02 | mp_choose_additional_player | 1 (baseIndex) | void | Dialog loop for selecting additional players in network MP. Lists active civs, allows selection with checkboxes. Verifies civ name (FUN_005a5f34), loads civ preferences (thunk_FUN_00498a5c), shows GENDER dialog. Updates human_civs_bitmask and leader data. | HIGH |
| 0x5246BF | stub | FUN_005246bf | mp_choose_add_dtor | 0 | void | SEH destructor thunk | FRAMEWORK |
| 0x5246D5 | stub | FUN_005246d5 | mp_choose_add_seh_epilog | 0 | void | SEH epilog | FRAMEWORK |

---

### Cluster: Civilopedia Improvement Detail

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x5261A0 | small | FUN_005261a0 | civpedia_init_list | 0 (this=ECX) | void | Initializes a scrollable list widget. Bounds-checks index (+0x120) against item count (+0xAB8), copies items from +0xB2C to +0x1B38, sets scroll position. Adjusts for groups of 9 (DAT_006a85a4 % 9). Calls several panel init functions. | MEDIUM |
| 0x52630D | xlarge | FUN_0052630d | civpedia_draw_detail | 0 (this=ECX) | void | Draws a Civilopedia detail page for an improvement/wonder. Reads item from +0xB2C[+0x120]. Shows: prerequisite tech (DAT_0064c48e[id*8] = imp prereq_tech via tech_table), cost (DAT_0064c48c[id*8]*10 with "%d" sprintf at DAT_00632428), obsolescence tech (DAT_0064ba01[id] = wonder_obsolete_tech), and description text (via FUN_0059a15d). Renders sprites via blit_normal (FUN_005cef31). | HIGH |
| 0x526913 | small | FUN_00526913 | civpedia_select_item | 1 (itemId) | void | Selects an item in the Civilopedia list by searching +0xB2C array for itemId, updates current index (+0x120), redraws detail pane. Checks DAT_006a677c (civilopedia open flag) and DAT_006ad908. | MEDIUM |

---

### Cluster: Parley (Diplomacy) Window — Master Layout

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x526CA0 | xlarge | FUN_00526ca0 | parley_add_dialog_panel | 2 (panelType, side:0=left/1=right) | void | **26152 bytes — the largest function in this block.** Master diplomacy window panel builder. `param_1` selects panel type (0-0x14), `param_2` selects left(0) or right(1) side. Asserts valid side (string: "leftright...LEFT..."). Panel types map to diplomatic actions: 0=empty, 1=main menu (map/science/gold buttons), 2=select a treaty, 3/4=propose/demand items, 5=peace/alliance treaty terms, 6=current status display, 7=tribute/gift amounts, 8=city trade list, 9=gold exchange (with numeric input via __itoa), 0xA=unit/tech exchange, 0xB=war/cease-fire, 0xC=demand items, 0xD=threat/ultimatum, 0xE=diplomatic actions (uses *(in_ECX+0x20C/0x214) sub-states), 0xF=propose full deal, 0x11=city gift list, 0x12=accept text display, 0x13=tech tree view (left pane), 0x14=tech tree view (right pane). Accesses treaty flags (DAT_0064c6c0, bits 2/4/8/0x20/0x80), DAT_00628420+offsets (GAME.TXT label indices), DAT_0062d858/0062d85c (dialog margins). Creates UI controls: CCheckListBox (for selectable lists), radio buttons, text edits. Source path string: "D:\Ss\Franklinton\parleywin\add_d..." | HIGH |

### Cluster: Parley Window — Button/Selection Handlers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x52D4D2 | small | FUN_0052d4d2 | parley_on_treaty_status_select | 2 (notifyCode, sel) | void | Gets parley window object via FUN_005c62ee()-0x48. Sets +0x218 (treaty status selection) = param_2. | MEDIUM |
| 0x52D523 | small | FUN_0052d523 | parley_on_demand_type_select | 2 (notifyCode, sel) | void | Sets +0x214 (demand type). Calls parley_add_dialog_panel for right side (side=1). | MEDIUM |
| 0x52D588 | small | FUN_0052d588 | parley_on_generic_select | 2 (ctrlId, sel) | void | Generic selection handler. Stores param_2 at computed offset based on param_1. | MEDIUM |
| 0x52D5DD | small | FUN_0052d5dd | parley_on_tribute_type_select | 2 (notifyCode, sel) | void | Sets +0x220 (tribute type) and maps to dialog panel state: 0->7(map), 1->8(city), 2->9(gold), 3->10(tech), 4->11(advance). Uses DAT_0062d7d4 lookup table for panel type mapping. Calls parley_add_dialog_panel. | MEDIUM |
| 0x52D6FF | small | FUN_0052d6ff | parley_on_war_peace_select | 2 (notifyCode, sel) | void | Sets +0x21C. Maps 0->0xC (war options), 1->0xD (peace options) as panel state. Calls parley_add_dialog_panel. | MEDIUM |
| 0x52D7DC | small | FUN_0052d7dc | parley_on_propose_item_toggle | 2 (ctrlId, itemIndex) | void | Handles checkbox toggle in propose/demand item lists (ctrl IDs 0x3F4/0x3F5). Manages mutual exclusion between treaty items (CCheckListBox::GetCheckStyle). Enables/disables related items. | MEDIUM |
| 0x52D9A1 | small | FUN_0052d9a1 | parley_on_timer_tick | 1 (timerId) | void | Timer handler for parley window. Checks if either panel's streambuf (via egptr()) is non-null, then calls parley_advance_negotiation. | LOW |
| 0x52DA23 | small | FUN_0052da23 | parley_reject_proposals | 0 | void | Rejects both current proposals. Clears +0x3BD and +0x3BE (acceptance flags). Sends network messages 0xA6 and 0xA8 (reject types) via thunk_FUN_0046b14d with socket info from DAT_006ad30c/DAT_006ad558. | HIGH |
| 0x52DB3D | small | FUN_0052db3d | parley_accept_proposals | 0 | void | Accepts both current proposals. Sets +0x3BD=1 and +0x3BE=1. Sends network messages 0xA5 and 0xA7 (accept types) via thunk_FUN_0046b14d. | HIGH |
| 0x52DC7E | small | FUN_0052dc7e | parley_show_intelligence | 0 | void | Shows intelligence report for the other civ. Checks if player has tech 0x18 (Espionage) or tech 9 (Writing), or has embassy (treaty bit 0x80), or god_mode. If none, shows "NOINTEL" message. Otherwise calls FUN_0043060b for intelligence display. String: "NOINTEL" | HIGH |

### Cluster: Parley Window — Negotiation State Machine

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x52DD73 | xlarge | FUN_0052dd73 | parley_advance_negotiation | 0 | void | **1425 bytes.** Main negotiation state machine. Reads current state from +0x1EC. State 3 (main menu): reads selection from CCheckListBox, transitions to sub-states (6=status, 0xC/0xD=war/peace proposals, 7-0xB=tribute types, 5=treaty, 0xF=full deal). State 5 (treaty): reads left/right selections, transitions to state 0xE (diplomatic actions). States 6-0xF: builds a diplomacy proposal object via FUN_004db690, checks treaty status for declare-war (bits 2/4/8 of treaty flags -> FUN_00467750), or transitions to state 1 (present deal). Updates both panels via parley_add_dialog_panel. Uses DAT_0062d7d0/D4 lookup tables for panel type mapping. | HIGH |
| 0x52E326 | small | FUN_0052e326 | parley_go_back | 0 | void | Back button handler. From states 5-0xF, returns to state 3 (main menu). From state 0xE, returns to state 5 (treaty). Reloads both panels. Uses DAT_0062d7E8/EC for main menu panel types. | HIGH |
| 0x52E4C9 | small | FUN_0052e4c9 | parley_on_accept_deal | 0 | void | Accept deal button. Sends network message 0x83 (accept). Shows "PARLEYACCEPT2" popup. Resets state to 3. Calls FUN_004b8676(1) to finalize. String: "PARLEYACCEPT2" | HIGH |
| 0x52E57C | small | FUN_0052e57c | parley_on_reject_deal | 0 | void | Reject deal button. Sends network message 0x84 (reject). Sets state to 2 (counter-proposal). Reloads both panels. | HIGH |
| 0x52E685 | small | FUN_0052e685 | parley_on_end_negotiations | 0 | void | End negotiations button. Sends network message 0x85 (end). Resets state to 3. Calls FUN_004b8676(1). | HIGH |
| 0x52E71A | small | FUN_0052e71a | parley_on_civ_button_click | 1 (ctrlId) | void | Handles clicking a civ flag button (ctrl IDs 0x429-0x42F). Reads checkbox state via ios::width (Ghidra FID misidentification). Updates DAT_0068af08 array. | MEDIUM |
| 0x52E7B7 | small | FUN_0052e7b7 | parley_on_checkbox_state_change | 1 (ctrlId) | void | Handles checkbox state changes for treaty/deal panels. Ctrl 0x415: map sharing (DAT_0068aedc). Ctrl 0x416: science exchange (DAT_0068aee4) — when enabled, auto-enables all civ entries. Ctrls 0x417-0x41D: per-civ entries (DAT_0068aee8). Ctrl 0x430: gold (DAT_0068aee0). | MEDIUM |

### Cluster: Parley Window — Button State Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x52E971 | medium | FUN_0052e971 | parley_update_button_states | 0 (this=ECX) | void | Updates enabled/disabled state of Accept/Back/Continue buttons based on current negotiation state (+0x1EC). State 1/2: enables/disables intelligence + back + continue. State 3/5: proposal mode buttons. State 6-0xF: item selection mode. State 0xE: requires both left and right panels populated (+0x1E4/+0x1E8). | MEDIUM |

---

### Cluster: Network Unit/City Lookup

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x52EC47 | small | FUN_0052ec47 | find_unit_by_alive_flag | 1 (aliveValue) | int | Searches unit array (DAT_006560f0, stride 0x20) backwards from DAT_00655b16 for a unit with alive_flag (+0x1A) matching param_1. If found, checks 8 adjacent tiles (DAT_00628350/60 = direction offsets) for passability via FUN_005ae052/FUN_004087c0/FUN_005b89e4. Returns unit index, -1 if not found, -2 if unit is surrounded. | HIGH |
| 0x52ED95 | small | FUN_0052ed95 | find_city_by_id | 1 (cityId) | int | Searches city array (DAT_0064f340, stride 0x58) backwards from DAT_00655b18 for a city with city_id (+0x54) matching param_1. Returns city index or -1. | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 51**

| Category | Count | Description |
|----------|-------|-------------|
| Multiplayer Setup | 17 | Scenario load, player selection, hot-seat config, network join |
| Diplomacy/Parley UI | 23 | Negotiation panels, button handlers, state machine |
| Civilopedia | 3 | Detail page rendering, item selection, list init |
| Unit/City Lookup | 2 | Utility search functions for unit/city arrays |
| SEH/Framework | 14 | Exception handling stubs, destructor thunks |
| (subtotal framework-free) | **37** | |

**Size breakdown:**
- stub (<=20 lines): 14
- small (21-50): 20
- medium (51-100): 3
- large (101-300): 1
- xlarge (>300): 5

Note: 8 functions have no code gap between them and the preceding function (SEH pairs), leaving **~29 logically distinct routines**.

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00526CA0 (`parley_add_dialog_panel`)** — 26,152 bytes. The diplomacy window's entire panel construction engine, handling all 21 diplomatic action types. This is the visual counterpart to the diplomacy AI logic. Critical for understanding how treaty proposals, demands, trades, and threats are presented to the player.

2. **FUN_0052DD73 (`parley_advance_negotiation`)** — 1,425 bytes. The diplomacy state machine that drives the entire negotiation flow. Maps user selections to diplomatic actions and transitions between proposal stages.

3. **FUN_005233FC (`mp_register_network_player`)** — 2,446 bytes. Network player registration logic, processing join packets and updating civ/leader data. Key for understanding the multiplayer protocol.

4. **FUN_0052630D (`civpedia_draw_detail`)** — 1,542 bytes. Civilopedia detail page renderer showing improvement/wonder prerequisite tech, cost, obsolescence tech, and description. Documents the improvement data structure layout.

5. **FUN_0052EC47 (`find_unit_by_alive_flag`)** — Utility function that searches for units by alive flag AND checks surrounding tile passability. Important for understanding AI unit movement validation.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence | Confidence |
|---------|--------------|----------|------------|
| DAT_006ad2f7 | net_is_server | Assert string "gNetMgr.bServer"; checked before server-only code paths | HIGH |
| DAT_006ad640 | net_game_mode | Compared <2 (solo), <3 (hot-seat vs network); controls human_civs vs net_civs bitmask | HIGH |
| DAT_006c3164 | max_player_slots | Compared against 4,5,6 for enabling additional player slots in hot-seat | HIGH |
| DAT_006c3160 | advanced_mp_enabled | Controls ADVANCEDMP features; if nonzero, extra player slot 6 enabled | MEDIUM |
| DAT_006c31a8 | net_civs_bitmask | Like human_civs_bitmask but for network-connected players (used when net_game_mode>=3) | HIGH |
| DAT_006c31a9 | saved_human_civs_bitmask | Saved/restored around join_game_handler; preserves human_civs state | MEDIUM |
| DAT_00631ef0 | animation_style_state | Cycled through values 5/6/7 in mp_set_animation_style | LOW |
| DAT_00631eec | scroll_state | 4-state cycle (1-4) for dialog scroll positioning | LOW |
| DAT_00631ee4 | allow_ai_opponent_pick | When nonzero, shows per-AI-civ opponent selection dialog | MEDIUM |
| DAT_006ad30c | net_socket_array | Array of 7 network socket/connection structs, stride 0x54 | HIGH |
| DAT_006ad558 | civ_to_socket_map | Maps civ index -> socket array index (int[8]) | HIGH |
| DAT_006ad358 | net_slot_host_flag | Per-socket flag, 1=host 0=client | MEDIUM |
| DAT_006ad359 | net_slot_active_flag | Per-socket flag, 1=occupied | MEDIUM |
| DAT_006ad35c | net_slot_civ_owner | Per-socket, which civ occupies this slot | MEDIUM |
| DAT_006a677c | civpedia_is_open | Checked as guard in civpedia_select_item | LOW |
| DAT_006ad908 | civpedia_locked | Prevents civpedia interaction when nonzero | LOW |
| DAT_0067a8bc | parley_ai_mode | When nonzero, skips animation setup in parley panel | LOW |
| DAT_0067a8c0 | parley_other_civ_id | The civ we are negotiating with (used in accept/reject/end handlers) | MEDIUM |
| DAT_0062d858 | dialog_margin_x | Horizontal margin for dialog panels (used throughout parley + civpedia) | HIGH |
| DAT_0062d85c | dialog_margin_y | Vertical margin for dialog panels | HIGH |
| DAT_00628420 | game_txt_string_table | Base pointer to GAME.TXT loaded string table; offsets like +0xB8C, +0xBA4, +0xC0C are string indices for diplomatic phrases | HIGH |
| DAT_0062d7D0 | parley_panel_left_types | Lookup table: parley state -> left panel type (indexed by state*2) | MEDIUM |
| DAT_0062d7D4 | parley_panel_right_types | Lookup table: parley state -> right panel type (indexed by state*2) | MEDIUM |
| DAT_0068aedc | parley_chk_map_sharing | Checkbox state for "share map" in treaty panel | MEDIUM |
| DAT_0068aee0 | parley_chk_gold | Checkbox state for "gold" in treaty panel | MEDIUM |
| DAT_0068aee4 | parley_chk_science | Checkbox state for "share science" in treaty panel | MEDIUM |
| DAT_0068aee8 | parley_chk_per_civ[8] | Per-civ checkbox states for treaty panel items | MEDIUM |
| DAT_0068af08 | parley_civ_flag_state[8] | Per-civ flag button states in parley main panel | MEDIUM |
| DAT_00655502 | leader_table_entry+2 | Part of 0x30-stride leader/civ setup table at DAT_006554FC area | MEDIUM |
| DAT_006665D8 | hotseat_ai_count_setting | Number of AI opponents selected in hot-seat config | MEDIUM |
