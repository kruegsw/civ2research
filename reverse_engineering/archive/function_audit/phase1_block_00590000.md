# Phase 1 Audit: block_00590000 (0x00590000 - 0x0059FFFF)

## Function Analysis

### Cluster: Unit Movement & Combat Engine

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00590607 | stub | FUN_00590607 | popup_dtor_thunk_1 | void | void | Thunk to FUN_0059df8a (popup destructor). FRAMEWORK | HIGH |
| 0x0059061D | stub | FUN_0059061d | seh_epilog_1 | void | void | SEH exception frame epilog — restores FS:[0]. FRAMEWORK | HIGH |
| 0x0059062C | xlarge | FUN_0059062c | move_unit | int unit_idx, uint direction, byte flags | uint (success) | **Master unit movement function** (~18KB). Takes unit index, movement direction, and control flags. Handles: terrain movement costs via DAT_0064bcc8 (COSMIC[0] movement_mult), combat initiation, land/sea transitions ("LANDFALL","NOLANDFALL","AMPHIB"), diplomat/spy actions ("EXPEL","UPMINE","UPYOURS"), transport boarding, air unit landing, allied repair, trireme sinking, fatigue checks ("FATIGUE","LONGMOVE"), multiplayer lock/sync via XD_FlushSendBuffer. Uses unit fields (type, owner, moves, orders, status) and unit type fields (domain, attack, defense, flags). Accesses DAT_006560f0 (unit array), DAT_0064b1b8 (unit_type array), DAT_0064c6c0 (treaty flags), DAT_00655b0b (human_civs_bitmask). Calls FUN_00580341, FUN_0057f9e3, FUN_0057b5df (combat). Contains multiplayer synchronization with battle resolution callbacks. | HIGH |
| 0x00594D42 | large | FUN_00594d42 | mp_lock_map | int civ, int from_x, int from_y, int to_x, int to_y, int wait | u4 (success) | Multiplayer map locking: sends lock request (msg 0x51) to server via XD, waits up to ~57 seconds for response. In hotseat mode (DAT_006ad2f7), checks collision with other players' locked tiles at DAT_0064ba48 (stride 0x18). Debug string: "LockMap: Connection to server timed out". | HIGH |
| 0x0059511C | medium | FUN_0059511c | mp_unlock_map | int civ, int wait_flag | void | Multiplayer map unlocking: sends unlock request (msg 0x52). In hotseat mode, memsets lock record to -1. Debug string: "UnlockMap: Connection to server timed out". | HIGH |

### Cluster: Spaceship System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00596B00 | large | FUN_00596b00 | spaceship_get_max_component | int civ, int component_type | int | Returns maximum allowed count for a spaceship component type (0-5). Type 0=structural, types 1-2=propulsion/fuel (halved), types 3-5=habitation/life/solar (divided by 8). AI civs clamped to minimum 1. Uses DAT_00634f64 (max array) and civ field +0x0AA8 (spaceship component counts, stride 0x594). | MEDIUM |
| 0x00596C08 | small | FUN_00596c08 | spaceship_get_clamped_count | int civ, int component_type | void | Returns civ's component count clamped to its max (via spaceship_get_max_component). Reads civ+0xAA8 array of shorts. | MEDIUM |
| 0x00596C61 | medium | FUN_00596c61 | spaceship_get_category_count | u4 civ, int category | int | Returns sum of clamped component counts by category: 0=structural(idx 0), 1=propulsion(idx 1+2), 2=modules(idx 3+4+5). | MEDIUM |
| 0x00596CED | small | FUN_00596ced | spaceship_get_max_category | int category | int | Returns max total for a category from DAT_00634f64/DAT_00634f70/etc. arrays. Category 0=structural max, 1=fuel+propulsion max, 2=hab+life+solar max. | MEDIUM |
| 0x00596D3C | medium | FUN_00596d3c | spaceship_get_raw_count | int civ, int category | int | Returns raw (unclamped) component count sum by category from civ+0xAA8 spaceship data. | MEDIUM |
| 0x00596E06 | medium | FUN_00596e06 | spaceship_get_clamped_category | u4 civ, int category | int | Like spaceship_get_category_count but calls spaceship_get_clamped_count per component. | MEDIUM |
| 0x00596E92 | small | FUN_00596e92 | spaceship_calc_population_capacity | int count | int | Calculates population capacity from habitation/life/solar counts. Non-linear: +1/component for first 4, +2/component for 5-6, +3/component beyond 6. | MEDIUM |
| 0x00596EEC | xlarge | FUN_00596eec | spaceship_recalc_stats | int civ, int apply_penalties | void | Recalculates all spaceship statistics for a civ: mass (DAT_006ad0e4), fuel ratio (DAT_006ad0f0), energy ratio (DAT_006ad0e8), flight time (DAT_006ad0f4), population ratio (DAT_006ad0dc), and success probability (DAT_006ad0ec). Checks Apollo tech flag (0x20). Uses COSMIC[20] (movement constant) for flight time. Writes arrival turn estimate to civ+0xAA2. | MEDIUM |
| 0x005973FD | large | FUN_005973fd | spaceship_launch | int civ | void | Launches a spaceship for civ. Sets launched flag (civ+0xAA0 |= 2). Records launch turn (DAT_00655afc). For AI civs: sets all cities to production item 99 (capitalization?). For human civs: checks other civs' spaceships and sets treaty flags (hatred 0x20, war 0x40) if losing race. Sends MP notification (msg 0x0B). | HIGH |
| 0x0059772C | xlarge | FUN_0059772c | spaceship_dialog | int civ, int can_interact | void | Displays the spaceship status dialog. Shows component counts, mass, fuel/energy percentages, flight time, success probability. String refs: "SPACESHIP", "LAUNCHED", "LAUNCH", "0.000". If can_interact and success > 0, shows launch button. Uses dialog system (FUN_0059db08 for dialog init). | HIGH |
| 0x00597D4B | stub | FUN_00597d4b | popup_dtor_thunk_2 | void | void | Thunk to FUN_0059df8a. FRAMEWORK | HIGH |
| 0x00597D61 | stub | FUN_00597d61 | seh_epilog_2 | void | void | SEH epilog. FRAMEWORK | HIGH |
| 0x00597D6F | xlarge | FUN_00597d6f | spaceship_ai_evaluate | int civ, int preferred_category | int (category_to_build) | AI spaceship building strategy. Calls spaceship_recalc_stats, then decides which component category to build next. Considers: rival launch ETAs, whether rivals have launched, tech availability (checks DAT_0064c5ae for Space Flight tech). Returns category (0/1/2) or -1 (complete) or -2 (can't build). | MEDIUM |
| 0x00598197 | xlarge | FUN_00598197 | spaceship_human_build | int civ, int category | int (slot_built) | Human player spaceship construction handler. Compares current counts vs maximums. For AI: picks cheapest. For human: shows dialog ("COMPONENT","MODULE","NOFURTHER"). After building, may auto-launch if conditions met (all structural done, success > 39%). Calls spaceship_launch. | HIGH |
| 0x00598A05 | medium | FUN_00598a05 | spaceship_check_complete_section | int civ, int section_id | u4 (bool) | Checks if a spaceship section (0x23=structural, 0x24=components, 0x25=modules) is fully built. Returns 1 if all components in that section reach their maximum. | MEDIUM |
| 0x00598B4E | medium | FUN_00598b4e | spaceship_view_menu | void | void | Top-level "View Spaceships" menu handler. Lists all civs with active spaceships ("SPACESHIPS"). If none, shows "NOSPACESHIPS". Lets player select a civ and calls spaceship_dialog. | HIGH |
| 0x00598CC7 | stub | FUN_00598cc7 | popup_dtor_thunk_3 | void | void | Thunk to FUN_0059df8a. FRAMEWORK | HIGH |
| 0x00598CDD | stub | FUN_00598cdd | seh_epilog_3 | void | void | SEH epilog. FRAMEWORK | HIGH |
| 0x00598CEB | small | FUN_00598ceb | spaceship_is_enabled | void | u4 (bool) | Returns whether spaceship building is enabled: requires no scenario lockout (bit 0x80 of DAT_00655ae8) and either initial_vis_flag != -1 or human_civs_bitmask intersects DAT_00655bce. | MEDIUM |
| 0x00598D45 | large | FUN_00598d45 | spaceship_ai_should_start | int civ | u4 (bool) | AI decision: should this civ start building a spaceship? Checks: spaceship enabled, civ hasn't launched, no nuclear war (bit 2), difficulty > 0, civ is AI. If any human has launched, returns 1. Otherwise computes weighted component scores and compares against human rivals who have Space Flight tech (0x4C). | MEDIUM |

### Cluster: Spaceship Helper Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005998B0 | small | FUN_005998b0 | spaceship_has_enough_raw | u4 civ, u4 category | bool | Returns true if civ's raw component count >= max for category. | LOW |
| 0x00599910 | medium | FUN_00599910 | spaceship_can_build_category | u4 civ, int category | u4 (bool) | Returns 1 if civ can build in this category: has room, has enough raw components or resources, and has prerequisite tech (from DAT_0064c5a6 tech table). | MEDIUM |
| 0x005999C0 | small | FUN_005999c0 | spaceship_category_maxed | u4 civ, u4 category | bool | Returns true if civ's clamped count >= max count for the category. | LOW |

### Cluster: Civilopedia / Improvement Display

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00599A20 | medium | FUN_00599a20 | pedia_init_list | void | void | Initializes civilopedia/advisor list view via `this` (in_ECX). Sets scroll positions, copies item array from +0xA1C to +0x1B38. Calls FUN_004518d0, FUN_004f6646. Uses DAT_006a85a4 % 9 alignment. | MEDIUM |
| 0x00599B8D | xlarge | FUN_00599b8d | pedia_draw_item_detail | void | void | Draws a civilopedia/advisor item detail panel. Reads improvement data (DAT_0064c48c cost, DAT_0064c48e prereq_tech) and renders: name, cost with shield icon, maintenance with coin icon, description text from PEDIA file. Uses blit_normal (FUN_005cef31), text rendering, SetRect for layout. Calls FUN_0059a15d for description text. | MEDIUM |
| 0x0059A15D | medium | FUN_0059a15d | pedia_load_description | void | void | Loads civilopedia description text for an item. Opens "PEDIA" section, reads lines from text file, skipping ';' comments and '@' terminators. Strips '^' and '*' formatting chars. Concatenates into DAT_00679640 string buffer. | HIGH |
| 0x0059A2E6 | medium | FUN_0059a2e6 | pedia_navigate_to_item | int item_id | void | Navigates the civilopedia to show a specific item. For items < 0x27 (improvements/wonders): finds item in list, updates scroll, redraws. For items >= 0x27: calls FUN_00526913. Guards against DAT_006a677c (pedia window open) and DAT_006ad908. | MEDIUM |

### Cluster: Random Number Generator

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059A6F0 | small | FUN_0059a6f0 | rng_set_seed | int seed | int (prev_seed) | Sets or gets the RNG seed at DAT_00635094. If seed==0, returns 0. Otherwise stores seed and returns previous value. | MEDIUM |
| 0x0059A733 | small | FUN_0059a733 | rng_next_float | void | float10 | Linear congruential generator: seed = seed * 0x19660d + 0x3c6ef35f. Returns seed / 0xFFFFFFFF as float [0,1). Classic Knuth LCG constants. | HIGH |
| 0x0059A791 | medium | FUN_0059a791 | rng_range | int min, int max | int | Returns random int in [min, max). If min==max returns min. Calls rng_next_float, scales to range. | MEDIUM |

### Cluster: CRT/MFC Static Initializers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059A850 | stub | FID_conflict___E31 | crt_static_init_1 | void | void | CRT static initializer: calls init + registers atexit. FRAMEWORK | HIGH |
| 0x0059A86A | stub | FUN_0059a86a | crt_init_netmgr_wrapper | void | void | Calls FUN_0059a8bb (netmgr_init). FRAMEWORK | HIGH |
| 0x0059A884 | stub | FUN_0059a884 | crt_atexit_netmgr | void | void | Registers FUN_0059a8a1 as atexit handler. FRAMEWORK | HIGH |
| 0x0059A8A1 | stub | FUN_0059a8a1 | crt_cleanup_netmgr | void | void | Calls FUN_0059ad40 (netmgr_dtor). FRAMEWORK | HIGH |

### Cluster: Network Manager (NetMgr)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059A8BB | medium | FUN_0059a8bb | netmgr_init | void | int (this) | NetMgr constructor. Calls FUN_0059d080. Sets up XDaemon callbacks: XD_SetBroadcastReceive, XD_SetSecureReceive (→FUN_0059bc41), XD_SetOnClientConnectionToServer (→FUN_0059bfdb), XD_SetNewClientConnection, XD_SetOnConnectionLost (→FUN_0059c04b), XD_SetOversizedMessageCB (limit 50000). | HIGH |
| 0x0059A998 | xlarge | FUN_0059a998 | netmgr_reset_state | void | void | Resets all NetMgr state variables to zero/defaults via `this` pointer (in_ECX). Clears connection slots, counters, buffers. Calls FUN_0059b293 (disconnect) and FUN_0059c2b8 (clear_connection_lost_counters). | MEDIUM |
| 0x0059AD40 | medium | FUN_0059ad40 | netmgr_dtor | void | void | NetMgr destructor. Frees buffer at +0x534 if allocated. Calls disconnect + clear counters. SEH-wrapped. | MEDIUM |
| 0x0059ADC8 | stub | FUN_0059adc8 | netmgr_dtor_base | void | void | Thunk to FUN_00514254. FRAMEWORK | LOW |
| 0x0059ADE1 | stub | FUN_0059ade1 | seh_epilog_4 | void | void | SEH epilog. FRAMEWORK | HIGH |
| 0x0059ADEF | xlarge | FUN_0059adef | netmgr_connect | u4 protocol, char is_server | u4 (success) | Main network connection setup. Switch on protocol: 0=TCP/IP (XD_InitializeSocketsTCP, ports 0x1381/0x1382), 1=IPX/SPX (XD_InitializeSocketsIPXSPX), 2=Modem (XD_InitializeModem), 3=Serial (XD_InitializeSerial). Reads timeout from CIV.INI ("INTERNET_Timeout","TCPIP_Timeout","IPXSPX_Timeout","MODEM_Timeout","DIRECT_Timeout"). Sets DAT_00655b02 (save_format_version: 3 for network, 5 for modem, 6 for serial). Source path: "D:\Ss\Franklinton\NetMgr.cpp". | HIGH |
| 0x0059B293 | large | FUN_0059b293 | netmgr_disconnect | int delay_flag | void | Full network disconnection sequence. Flushes send buffer, closes connection, shuts down protocol-specific sockets/modem/TEN. Logs extensive debug info: max queue loads, poll depths. Debug strings: "Disconnecting from network","XD_ResetLibrary","XD_CloseConnection","Disconnection delay: 2 seconds". | HIGH |
| 0x0059B55B | stub | FUN_0059b55b | netmgr_on_disconnect_noop | void | void | Empty function (22 bytes including frame). No-op callback placeholder. FRAMEWORK | LOW |
| 0x0059B571 | large | FUN_0059b571 | netmgr_update_player_list | int player_data | void | Updates the multiplayer player list. Maintains a sorted linked list at +0x160CC. Compares player names, removes existing entry, re-inserts alphabetically. Allocates 0x124-byte nodes. Source path: "D:\Ss\Franklinton\NetMgr.cpp" line 0x1CF. | HIGH |
| 0x0059B7FC | medium | FUN_0059b7fc | netmgr_add_client | int client_data | void | Adds a new client to a multiplayer game. Finds first empty slot (up to 7 clients, stride 0x54). Copies connection ID, player name, machine name from client_data. Increments connected count (+0x200) and decrements available slots (+0x55C). | MEDIUM |
| 0x0059B96A | medium | FUN_0059b96a | netmgr_remove_client | int connection_id | void | Removes a client by connection ID. Clears slot, removes from human_civs_bitmask (DAT_00655b0b), resets assigned civ. Decrements connected count. | MEDIUM |
| 0x0059BAF0 | small | FUN_0059baf0 | netmgr_free_player_list | void | void | Frees all nodes in the player linked list at +0x160CC. Walks list, calling operator_delete on each. | MEDIUM |
| 0x0059BB54 | medium | FUN_0059bb54 | netmgr_broadcast_receive | int* msg, ushort size | void | Broadcast message receive callback. Validates size >= 16, checks magic header 0x66606660. Filters messages by game name. Debug: "BroadcastReceiveFunc: Killed Message". | HIGH |
| 0x0059BC41 | xlarge | FUN_0059bc41 | netmgr_secure_receive | u2 sender, int* msg, uint size | void | Secure message receive callback. Validates magic 0x66606660. On invalid: extensive hex dump diagnostic logging with sequence numbers and offset search. Debug strings: "SecureReceiveFunc: Killed Message", "Last Callback Size", "Potential Offset Message Found". | HIGH |
| 0x0059BFB5 | stub | FUN_0059bfb5 | netmgr_on_new_client | u4 unused, u2 client_id | void | Logs new client connection. Debug: "NewClientReceiveFunc: New client". | HIGH |
| 0x0059BFDB | medium | FUN_0059bfdb | netmgr_on_connected_to_server | short player_id | void | Handles successful connection to server. Sets DAT_006ad300 = player_id, DAT_006ad2f5 = 1, sends msg 0x2F. Debug: "ConnectedToServerFunc: New server". | HIGH |
| 0x0059C04B | small | FUN_0059c04b | netmgr_on_connection_lost | ushort client_id | void | Handles lost connection. Increments total lost counter (DAT_006c8fb4) and per-client counter at DAT_006c8fc0. Debug: "LostConnectionFunc: Connection to...". | HIGH |
| 0x0059C0A4 | small | FUN_0059c0a4 | netmgr_on_oversized_msg | u4 size | void | Logs oversized XDaemon message. Debug: "Oversized XDaemon message: %ul". | HIGH |
| 0x0059C0E1 | medium | FUN_0059c0e1 | netmgr_build_packet | u4 type, void* data | void* (packet) | Builds a network packet with 0x2C-byte header. Copies header fields and payload data. If data is null, allocates fresh; otherwise expands existing buffer. | MEDIUM |
| 0x0059C276 | small | FUN_0059c276 | netmgr_clear_msg_stats | void | void | Clears 0xA9 message statistics counters at DAT_006c8fe0. | LOW |
| 0x0059C2B8 | small | FUN_0059c2b8 | netmgr_clear_connection_lost | void | void | Clears total and per-client connection-lost counters (DAT_006c8fb4, DAT_006c8fc0). | LOW |
| 0x0059C301 | stub | FUN_0059c301 | netmgr_pump_messages | void | void | Pumps network messages: calls FUN_0047e94e(1,0). | LOW |
| 0x0059C31F | large | FUN_0059c31f | netmgr_fill_game_info | char* buf | void | Fills a game info broadcast packet. Writes: game name (DAT_006665b0), scenario name (DAT_006ad59c), player name (DAT_00666570), map dimensions (DAT_00654c74), difficulty (DAT_00655b08), barbarians, active civs bitmask, turn (DAT_00655af8), version string "5.4.0f Multiplayer 26 March 99". | HIGH |
| 0x0059C575 | large | FUN_0059c575 | record_combat_kill | int attacker_unit, int defender_unit, u2 att_x, u2 att_y, u2 def_pos | void | Records a combat kill in per-civ kill history ring buffer (DAT_006af2a0, stride 0x27D8, 300 entries per civ). Stores: unit type, coordinates, target civ name (0x18 chars). Write index at DAT_006af280, read index at DAT_006af260. Overflow counter at DAT_006af220. | MEDIUM |

### Cluster: Dialog / Popup System (Popup_1)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059D080 | medium | FUN_0059d080 | popup_msg_init | void | int (this) | Initializes a network message struct. Clears fields, sets size at +8 to 0x118. Part of the network message building infrastructure. | MEDIUM |
| 0x0059D190 | stub | FUN_0059d190 | crt_static_init_2 | void | void | CRT static init: calls FUN_0059d1aa + FUN_0059d1ca. FRAMEWORK | HIGH |
| 0x0059D1AA | stub | FUN_0059d1aa | crt_init_dialog_table_1 | void | void | Initializes dialog table entry (0, 0x10, 1). FRAMEWORK | LOW |
| 0x0059D1CA | stub | FUN_0059d1ca | crt_atexit_dialog_1 | void | void | Registers FUN_0059d1e7 as atexit cleanup. FRAMEWORK | HIGH |
| 0x0059D1E7 | stub | FUN_0059d1e7 | crt_cleanup_dialog_1 | void | void | Dialog table cleanup at exit. FRAMEWORK | LOW |
| 0x0059D201 | stub | FID_conflict___E51 | crt_static_init_3 | void | void | CRT static init pair. FRAMEWORK | HIGH |
| 0x0059D21B | stub | FUN_0059d21b | crt_init_dialog_table_2 | void | void | Initializes dialog table entry (0, 0x10). FRAMEWORK | LOW |
| 0x0059D239 | stub | FUN_0059d239 | crt_atexit_dialog_2 | void | void | Registers atexit cleanup. FRAMEWORK | HIGH |
| 0x0059D256 | stub | FUN_0059d256 | crt_cleanup_dialog_2 | void | void | Dialog table cleanup. FRAMEWORK | LOW |
| 0x0059D270 | stub | FID_conflict___E51 | crt_static_init_4 | void | void | CRT static init pair. FRAMEWORK | HIGH |
| 0x0059D28A | stub | FUN_0059d28a | crt_init_dialog_table_3 | void | void | Initializes dialog table entry (1, 0x0E). FRAMEWORK | LOW |
| 0x0059D2A8 | stub | FUN_0059d2a8 | crt_atexit_dialog_3 | void | void | Registers atexit cleanup. FRAMEWORK | HIGH |
| 0x0059D2C5 | stub | FUN_0059d2c5 | crt_cleanup_dialog_3 | void | void | Dialog table cleanup. FRAMEWORK | LOW |
| 0x0059D2DF | stub | FID_conflict___E51 | crt_static_init_5 | void | void | CRT static init pair. FRAMEWORK | HIGH |
| 0x0059D2F9 | stub | FUN_0059d2f9 | crt_init_dialog_table_4 | void | void | Initializes dialog table entry (0, 0x10). FRAMEWORK | LOW |
| 0x0059D317 | stub | FUN_0059d317 | crt_atexit_dialog_4 | void | void | Registers atexit cleanup. FRAMEWORK | HIGH |
| 0x0059D334 | stub | FUN_0059d334 | crt_cleanup_dialog_4 | void | void | Dialog table cleanup. FRAMEWORK | LOW |
| 0x0059D34E | stub | FUN_0059d34e | popup_static_init_wrapper | void | void | Calls FUN_0059d363. FRAMEWORK | LOW |
| 0x0059D363 | stub | FUN_0059d363 | popup_set_default_stack | void | void | Sets DAT_006cec84 = DAT_00635a58 (popup stack pointer). | LOW |
| 0x0059D37D | stub | FUN_0059d37d | popup_record_timestamp_1 | void | void | Sets _DAT_006cec80 = current time (FUN_00421bb0). | LOW |
| 0x0059D397 | stub | FUN_0059d397 | popup_record_timestamp_2 | void | void | Same as above — records timestamp. | LOW |

### Cluster: Popup Configuration

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059D3B1 | stub | FUN_0059d3b1 | popup_set_config_a | u4 val | void | Sets DAT_006359c0 = val. Popup system configuration setter. | LOW |
| 0x0059D3C9 | stub | FUN_0059d3c9 | popup_set_config_b | u4 val | void | Sets DAT_006359c4 = val. | LOW |
| 0x0059D3E1 | stub | FUN_0059d3e1 | popup_set_position | u4 x, u4 y | void | Sets DAT_006359cc = x, DAT_006359d0 = y. Popup dialog position. | LOW |
| 0x0059D401 | medium | FUN_0059d401 | popup_load_labels | void | void | Loads popup button labels from LABELS.TXT "POPUPS" section. Reads 3 entries into DAT_006cec98 array, resolves names via get_improvement_name into PTR_DAT_00635a48. | HIGH |
| 0x0059D487 | small | FUN_0059d487 | popup_set_colors | u1×9 | void | Sets 9 popup color parameters: DAT_006359fc, DAT_006359f8, DAT_006359f4, DAT_00635a00, DAT_00635a04, DAT_00635a08, DAT_00635a0c, DAT_00635a10, DAT_00635a14. | LOW |
| 0x0059D4DF | small | FUN_0059d4df | popup_set_surfaces | u4×7 | void | Sets 7 surface/sprite pointers: DAT_00635a18 through DAT_00635a30. | LOW |
| 0x0059D527 | stub | FUN_0059d527 | popup_set_font_ptr_1 | u1* ptr | void | Sets PTR_DAT_006359e4 = ptr. Font/resource pointer for popup. | LOW |
| 0x0059D53F | stub | FUN_0059d53f | popup_set_font_ptr_2 | u1* ptr | void | Sets PTR_DAT_006359e8 = ptr. | LOW |
| 0x0059D557 | stub | FUN_0059d557 | popup_set_font_ptr_3 | u1* ptr | void | Sets PTR_DAT_006359ec = ptr. | LOW |
| 0x0059D56F | small | FUN_0059d56f | popup_set_default_fonts | void | void | Sets the 3 font pointers to default globals: DAT_006ceca8, DAT_006cec78, DAT_006cec88. | LOW |
| 0x0059D59D | stub | FUN_0059d59d | popup_set_config_c | u4 val | void | Sets DAT_00635aa0 = val. | LOW |
| 0x0059D5B5 | small | FUN_0059d5b5 | popup_init_font_resource | u4 font_id | void | Initializes popup font by calling memory pool reset + FUN_00497ea0 with font_id=9. | LOW |

### Cluster: Popup Dialog Object

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059D5F5 | xlarge | FUN_0059d5f5 | popup_dialog_reset | void | void | Resets all fields of a popup dialog object (via `this` in_ECX). Initializes margins, padding, button configurations, layout parameters from the global popup config values (DAT_00635a*). Sets default margin values (2,2,4,4,8,2). About 130 fields. | MEDIUM |
| 0x0059DB08 | small | FUN_0059db08 | popup_dialog_create | u2 flags | int (this) | Creates and initializes a popup dialog. Calls parent constructor (FUN_00428cb0), resets state, sets flags. Entry point for dialog creation (called from spaceship_dialog, etc.). | MEDIUM |
| 0x0059DB65 | xlarge | FUN_0059db65 | popup_dialog_destroy | void | void | Destroys a popup dialog. Cleans up all sub-objects: sprites, fonts, surfaces (via vector_deleting_destructor). Manages popup stack (DAT_00635a9c, DAT_006cec84). Source path: "D:\Ss\Franklinton\Popup_1.cpp" line 0x19C. | HIGH |
| 0x0059DF8A | small | FUN_0059df8a | popup_dialog_close | void | void | Closes popup dialog: calls popup_dialog_destroy, then resets memory pool. | MEDIUM |
| 0x0059DFB9 | large | FUN_0059dfb9 | popup_dialog_open | int sprite, u4 param2, u4* rect, u4 flags | void | Opens/configures a popup dialog for display. Sets sprite, rectangle, flags. Initializes font resources. If rect is non-null, copies dimensions and scales. Sets flag 0x10 if sprite is non-zero. | MEDIUM |

### Cluster: Popup Dialog Widgets & Layout

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0059E0EB | medium | FUN_0059e0eb | popup_set_edit_text | int id, char* text | u4 (success) | Finds an edit field by ID in the dialog's edit list (+0x230) and sets its text value. Validates text length <= max. | MEDIUM |
| 0x0059E18B | medium | FUN_0059e18b | popup_add_edit_field | char* label, int x, int y, int max_len, int type | int* (field) | Adds a text edit field to the popup dialog. Supports ^/^^ prefix for alignment (centered/right). Allocates field node in memory pool, links to list at +0x230. | MEDIUM |
| 0x0059E327 | stub | FUN_0059e327 | popup_is_centered | void | bool | Returns true if popup flag 0x80 is set (centered mode). | LOW |
| 0x0059E356 | stub | FUN_0059e356 | popup_get_radio_width | void | u4 | Always returns 0x20 (32 pixels) — width of a radio button/checkbox. | LOW |
| 0x0059E376 | medium | FUN_0059e376 | popup_calc_row_height | void | int | Calculates pixel height of a popup row. Takes 5/4 of font height, clamped to actual font height. Uses _Timevec::~_Timevec for font metric access (Ghidra FID misidentification). | LOW |
| 0x0059E3FA | small | FUN_0059e3fa | popup_get_item_height | void | int | Returns height of a list item. If custom height at +0x200[page*4] is set, uses that; else font height + 1. | LOW |
| 0x0059E448 | stub | FUN_0059e448 | popup_get_button_height | void | int | Returns font height + 10 pixels for button height. | LOW |
| 0x0059E472 | small | FUN_0059e472 | popup_set_sprite | u4 sprite_ptr | void | Sets dialog sprite at +8, recalculates row height at +0xB4. | LOW |
| 0x0059E4A4 | stub | CArchive::SetObjectSchema | popup_set_icon | CArchive* this, uint icon | void | MFC misidentification. Actually sets popup icon at +0x0C. FRAMEWORK | MEDIUM |
| 0x0059E4C5 | stub | FUN_0059e4c5 | popup_set_field_10 | u4 val | void | Sets `this+0x10` = val. Widget configuration. | LOW |
| 0x0059E4E6 | stub | FUN_0059e4e6 | popup_set_field_38 | u4 val | void | Sets `this+0x38` = val. Widget configuration. | LOW |
| 0x0059E507 | medium | FUN_0059e507 | popup_set_num_rows | int num_rows | void | Sets number of visible rows for a list. Calculates pixel height: item_height * num_rows + 2. Stores at +0x5C[page*4]. Sets flag 0x1000. | LOW |
| 0x0059E585 | small | FUN_0059e585 | popup_set_active_page | int page | void | Sets active page (0 or 1) for multi-page popup. Other values default to 0. | LOW |
| 0x0059E5C9 | small | FUN_0059e5c9 | popup_configure_list | int num_rows, u4 list_ptr, u4 param3 | void | Configures a list widget within the popup. Sets list pointer at +0x4C[page*4], param3 at +0x1E0[page*4]. If num_rows > 0, calls popup_set_num_rows. | LOW |
| 0x0059E624 | stub | EnableStackedTabs | popup_set_field_c8 | CPropertySheet* this, int val | void | MFC misidentification. Sets `this+0xC8` (200). FRAMEWORK | LOW |
| 0x0059E648 | small | FUN_0059e648 | popup_get_button_bar_height | void | int | Returns font height + 4 + button_count * 2. For button bar at bottom of popup. | LOW |
| 0x0059E676 | small | FUN_0059e676 | popup_measure_button_width | u4 text | int | Measures a button's width: text width + 4 + column_spacing * 4. | LOW |
| 0x0059E6A9 | small | FUN_0059e6a9 | popup_set_title | char* title | void | Allocates and copies title string into memory pool, stores at +0x134. | MEDIUM |
| 0x0059E6FF | small | FUN_0059e6ff | popup_set_width | int width | void | Sets popup width at +0x11C. If horizontal/vertical scales differ and no override flag, scales proportionally. | LOW |
| 0x0059E762 | stub | ios::delbuf | popup_set_field_1c | ios* this, int val | void | MFC misidentification. Sets `this+0x1C`. FRAMEWORK | LOW |
| 0x0059E783 | stub | FUN_0059e783 | popup_set_margins | u4 left, u4 right | void | Sets left (+0x14) and right (+0x18) margins. | LOW |
| 0x0059E7AD | small | FUN_0059e7ad | popup_find_radio_by_id | int id | int (node) | Walks radio button linked list at +0x228, returns node where +4 matches id. | LOW |
| 0x0059E812 | small | FUN_0059e812 | popup_find_edit_by_id | int id | int (node) | Walks edit field linked list at +0x238, returns node where +0xC matches id. | LOW |
| 0x0059E877 | small | FUN_0059e877 | popup_find_button_by_id | int id | int* (node) | Walks button linked list at +0x234, returns node where *node matches id. | LOW |
| 0x0059E8DB | small | FUN_0059e8db | popup_radio_set_enabled | u4 id, int enabled | void | Sets/clears bit 0 (enabled) on a radio button found by ID. | LOW |
| 0x0059E927 | small | FUN_0059e927 | popup_radio_set_visible | u4 id, int visible | void | Sets/clears bit 1 (visible) on a radio button found by ID. | LOW |
| 0x0059E973 | small | FUN_0059e973 | popup_radio_clear_all_enabled | void | void | Clears enabled bit on all radio buttons in list. | LOW |
| 0x0059E9B3 | small | FUN_0059e9b3 | popup_radio_clear_all_visible | void | void | Clears visible bit on all radio buttons in list. | LOW |
| 0x0059E9F3 | small | FUN_0059e9f3 | popup_radio_get_checked | u4 id | u4 (bool) | Returns whether radio button's "checked" bit (bit 2) is set. | LOW |
| 0x0059EA4D | small | FUN_0059ea4d | popup_radio_set_checked | u4 id, int checked | void | Sets/clears bit 2 (checked) on a radio button by ID. | LOW |
| 0x0059EA99 | medium | FUN_0059ea99 | popup_set_focus | u4 id | void | Sets focus to either a button (+0x224) or radio (+0x220) widget by ID, depending on dialog mode (+0x28). | LOW |
| 0x0059EB0D | small | FUN_0059eb0d | popup_handle_help | u4 unused, u4 help_id | void | Dispatches help request to FUN_00418a70. | LOW |
| 0x0059EB42 | stub | FUN_0059eb42 | popup_help_wrapper | u4 help_id | void | Wrapper: calls popup_handle_help(0, help_id). | LOW |
| 0x0059EB68-0x0059EC64 | stub×8 | EnableStackedTabs (×8) | popup_set_field_XXX | this, int val | void | Eight MFC-misidentified single-field setters at offsets 0xD8, 0x23C, 0x240, 0x244, 0x248, 0x24C, 0x250, 0x130. FRAMEWORK | LOW |
| 0x0059EC88 | medium | FUN_0059ec88 | popup_add_button | u4 result_code, u4 id, char* label | u4* (node) | Adds a button to the popup. Allocates 0x14-byte node, links to list at +0x234. Stores label text, measures max button width, increments button count (+0x2C). | MEDIUM |
| 0x0059EDF0 | large | FUN_0059edf0 | popup_add_radio_option | char* text, uint param2, uint param3 | uint* (node) | Adds a radio button option to the popup. Allocates 0x18-byte node in doubly-linked list at +0x228/+0x22C. Measures text width, tracks max width at +0x118. Empty text = separator (flag 1). | MEDIUM |
| 0x0059F026 | small | FUN_0059f026 | popup_add_radio_checked | u4 text, u4 param2, int checked | uint* (node) | Adds a radio option with checked state (bit 4). Sets flag 0x05 on popup. | LOW |
| 0x0059F06D | large | FUN_0059f06d | popup_add_text_input | char* label, char* default_val, size_t max_len | u4* (node) | Adds a text input field to the popup. Allocates 0x1C-byte node linked at +0x238. Limits input to 255 chars. Measures label width, calculates input field width. Allocates 0x100-byte edit buffer. | MEDIUM |
| 0x0059F2A3 | medium | FUN_0059f2a3 | popup_add_extra_button | char* label | void | Adds an extra button (up to 6) to array at +0x294. Used for additional action buttons in dialogs. | LOW |
| 0x0059F31A | medium | FUN_0059f31a | popup_set_text_style | int bold, int shadow, int highlight | void | Selects text rendering style from 4 presets stored at +0x64/+0x68/+0x6C/+0x70 based on bold/shadow/highlight combination. Calls FUN_005c19ad to apply font. | MEDIUM |
| 0x0059F3D7 | medium | FUN_0059f3d7 | popup_render_label | u4 surface, char* text, int x, int y, uint flags | int (x_end) | Renders a text label with optional shadow. Replaces underscores with spaces. If shadow enabled, draws text offset (1,1) in shadow color first, then normal. Returns new x position. | MEDIUM |
| 0x0059F5BA | small | FUN_0059f5ba | popup_draw_text_line | u4 surface, int y_offset, u4 param3 | void | Draws a line of text at y offset + base position (from +0xF8). | LOW |
| 0x0059F5F7 | small | FUN_0059f5f7 | popup_has_text_content | void | u4 (bool) | Returns 1 if any text content node in list (+0x230) has negative value at +0x10 (indicating renderable text). | LOW |
| 0x0059F64A | xlarge | FUN_0059f64a | popup_layout_text | int draw | int (total_height) | Lays out and optionally renders all text content in a popup. Handles word-wrapping, centered text (^^ prefix), line breaks. If draw=1, renders text; if draw=0, just calculates height. Returns total pixel height consumed. | MEDIUM |
| 0x0059FB78 | medium | FUN_0059fb78 | popup_get_item_index | int node | int (index) | Returns the index of a radio option node within its group (filtered by +0xC field matching). | LOW |
| 0x0059FC19 | medium | FUN_0059fc19 | popup_get_item_by_index | int index | int (node) | Returns the radio option node at given index within the current page's group. | LOW |
| 0x0059FCBA | small | FUN_0059fcba | popup_get_item_page | u4 node | int (page) | Returns which page a radio option is on, dividing index by items-per-page (+0x5C[page*4]). | LOW |
| 0x0059FCF2 | small | FUN_0059fcf2 | popup_scroll_to_page | int page | void | Scrolls radio list to show items starting at page * items-per-page. | LOW |
| 0x0059FD2A | xlarge | FUN_0059fd2a | popup_layout_dialog | void | u4 (needs_relayout) | **Master popup layout calculation** (~4.8KB). Computes dimensions and positions for all dialog elements: title bar, text content, radio buttons, edit fields, buttons bar. Handles: multi-column radio lists, scrollbars (GetSystemMetrics for scrollbar widths), text wrapping, icon placement, centering. Manages the popup stack (DAT_00635a9c). Returns 0 when layout is complete, 1 if relayout needed. | MEDIUM |

---

## SUMMARY

### 1. Total Functions and Breakdown

**Total functions: 103**

| Category | Count | Notes |
|----------|-------|-------|
| Unit Movement/Combat | 3 | FUN_0059062c (master move_unit), mp_lock/unlock |
| Spaceship System | 16 | Full spaceship lifecycle: stats, AI, dialog, launch |
| Network Manager | 20 | XDaemon-based multiplayer: TCP/IPX/modem/serial |
| Popup Dialog System | 45 | Complete popup/dialog widget framework |
| Civilopedia | 4 | Item navigation and description rendering |
| Random Number Generator | 3 | LCG-based RNG with seed management |
| CRT/MFC Framework | 12 | Static initializers, SEH epilogs, atexit handlers |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0059062c (move_unit)** — The master unit movement handler at ~18KB. Controls all unit movement including combat initiation, transport boarding, diplomat actions, air landings, trireme sinking, and multiplayer synchronization. This is one of the largest and most critical functions in the entire game.

2. **FUN_00596eec (spaceship_recalc_stats)** — Calculates all spaceship statistics including success probability, flight time, fuel/energy ratios. Essential for understanding the spaceship victory condition calculations.

3. **FUN_0059adef (netmgr_connect)** — The main network initialization function. Reveals the multiplayer architecture: TCP ports 0x1381/0x1382, protocol-specific initialization, CIV.INI timeout configuration, and the DAT_00655b02 save_format_version mapping (3=network, 5=modem, 6=serial).

4. **FUN_0059fd2a (popup_layout_dialog)** — The master layout engine for the game's popup dialog system. Understanding this unlocks how all game dialogs are sized, positioned, and rendered.

5. **FUN_00598197 (spaceship_human_build)** — The main spaceship construction handler for both human and AI players. Contains the AI auto-launch logic and the victory condition check.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence | Confidence |
|---------|--------------|----------|------------|
| DAT_00634ca0 | move_unit_reentrancy_guard | Set to 1 at entry, 0 at exit of move_unit; checked at top to prevent reentrant calls | HIGH |
| DAT_006ad0cc | move_flags_byte | Set from param_3 of move_unit, checked with bitmask (& 1, & 2) | HIGH |
| DAT_006ad0d0 | is_current_player_moving | Set to (DAT_00654fa8 == 0 && DAT_006d1da0 == owner) | HIGH |
| DAT_006ad8cc | mp_map_lock_active | Set to 1 during lock, cleared after. Used by mp_lock_map | HIGH |
| DAT_006ad8d0 | mp_map_unlock_active | Same pattern for unlock | HIGH |
| DAT_0064ba48 | mp_lock_records_base | Array of 8 lock records, stride 0x18, per-civ map locks | HIGH |
| DAT_00634f64 | spaceship_max_structural | First element of spaceship max-components array (stride 0x0C, 6 entries) | HIGH |
| DAT_006ad0e4 | spaceship_mass | Computed by spaceship_recalc_stats | HIGH |
| DAT_006ad0ec | spaceship_success_pct | Success probability 0-100 | HIGH |
| DAT_006ad0f0 | spaceship_fuel_ratio_pct | Fuel efficiency percentage | MEDIUM |
| DAT_006ad0e8 | spaceship_energy_ratio_pct | Energy ratio percentage | MEDIUM |
| DAT_006ad0f4 | spaceship_flight_time | Flight time in turns×10 | MEDIUM |
| DAT_006ad0dc | spaceship_population_ratio | Population capacity ratio | MEDIUM |
| DAT_006ad0e0 | spaceship_arrival_turn_est | Estimated arrival turn | MEDIUM |
| DAT_00635094 | lcg_rng_seed | RNG state variable. LCG constants: a=0x19660d, c=0x3c6ef35f | HIGH |
| DAT_006c8fb4 | net_total_connections_lost | Total connection-lost counter | HIGH |
| DAT_006c8fc0 | net_per_client_lost_array | Per-client (7 slots) connection-lost counters | HIGH |
| DAT_006c8fe0 | net_msg_stats_array | 0xA9 (169) message type statistics counters | MEDIUM |
| DAT_006af2a0 | kill_history_ring_base | Per-civ kill history, stride 0x27D8, 300 entries × 0x22 bytes | HIGH |
| DAT_006af280 | kill_history_write_idx | Per-civ write index (8 × int) | HIGH |
| DAT_006af260 | kill_history_read_idx | Per-civ read index (8 × int) | HIGH |
| DAT_006af220 | kill_history_overflow_count | Per-civ overflow counter (8 × int) | MEDIUM |
| DAT_00635a9c | popup_stack_depth | Current popup stack depth (max 16) | HIGH |
| DAT_006cec84 | popup_stack_current | Pointer to current active popup | HIGH |
| DAT_006ad678 | popup_stack_prev | Pointer to previous popup in stack | MEDIUM |
| DAT_006c914c | mp_battle_sync_state | Set to -2 before battle, checked for ==1 after sync | MEDIUM |
| DAT_006ad2f7 | is_hotseat_mode | Non-zero = hotseat (local MP), zero = networked | HIGH |
| DAT_006ad2f8 | net_previous_protocol | Saved before connection attempt, restored on failure | MEDIUM |
| DAT_006665b0 | game_name_string | Game/session name for multiplayer (32 bytes) | HIGH |
| DAT_00666570 | player_name_string | Player name for multiplayer (32 bytes) | HIGH |
