# Phase 1 Analysis: block_00460000 (0x00460000 - 0x0046FFFF)

## Function Table

### Cluster: CRT Init Thunks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00460104 | stub | FUN_00460104 | crt_init_thunk_0 | void | void | Thunk to FUN_0059df8a (CRT initialization) | LOW |
| 0x0046011A | stub | FUN_0046011a | crt_seh_epilog | void | void | SEH frame epilog - restores FS:[0] from EBP-0xC | LOW |

---

### Cluster: AI Diplomacy Engine (Master Negotiation)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00460129 | xlarge | FUN_00460129 | ai_diplomacy_negotiate | (int civ_a, int civ_b, u4 param3, u4 param4, int is_ai_initiated) | void | **Master AI diplomacy function** (~16KB). Handles the full AI-to-AI or AI-to-human diplomatic encounter. Accesses civ treaty flags at DAT_0064c6c0[civ*0x594], civ gold at DAT_0064c6a2, patience at DAT_0064c6bf, attitude at DAT_0064c6e8. Uses string keys: "OUTAHERE", "TRIBUTE", "TAKECIV", "OVERABARREL", "BEGONE0/1", "PROVOKE", "REJECT0", "PROPOSEALLIANCE", "PERHAPSSOLIDARITY", "PROPOSECEASE", "GRANTCEASE", "CONTINUEWAR", "PROPOSEPEACE", "CASHFORPEACE", "NOPEACE", "HOWDY/HOWDYPEACE/HOWDYALLY", "WELCOME/WELCOMEPEACE/WELCOMEALLY", "ATTITUDE/ATTITUDEPEACE/ATTITUDEALLY", "PATIENCE/PATIENCEALLY", "NOTORIOUS", "PLEASECITY", "ALLYPLEA/ALLYBRAG", "SENATEPEACE/SENATECEASE", "SCHISM", "CEASEEXPIRE", "AMBASSADORS", "CANCELTREATY". Calls handle_exchange_gift, show_gift_menu, calc_attitude, various treaty set/clear functions. Implements: tribute demands, tech demands, alliance proposals, ceasefire negotiations, peace proposals, senate overrides, war declarations, patience tracking, civ schism (tutorial). | HIGH |

---

### Cluster: Diplomacy Helper Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00467580 | stub | FUN_00467580 | set_tribute_display_amount | (int slot, u4 amount) | void | Stores amount into DAT_0063cc30[slot*4]. Used in tribute display during diplomacy. | LOW |
| 0x00467750 | medium | FUN_00467750 | clear_treaty_flags | (int civ_a, int civ_b, uint flags) | void | Clears treaty flags (bitwise AND ~flags) symmetrically in both directions: civ[a].treaty[b] and civ[b].treaty[a]. Recursively clears dependent flags (e.g., clearing bit 4 also clears bit 8; clearing bit 0x2000 also clears 0x1800). DAT_0064c6c0 = treaty flags array. | MEDIUM |
| 0x00467825 | medium | FUN_00467825 | set_treaty_flags | (int civ_a, int civ_b, uint flags) | void | Sets treaty flags (bitwise OR) symmetrically. When setting alliance (bit 8), also sets peace (bit 4). When setting war-related flags (bits 0xE), clears incompatible flags (0x2a60). When setting bit 0x2000, clears bits 0xE and adds 0x200000. | MEDIUM |
| 0x00467904 | stub | FUN_00467904 | get_attitude_raw | (int civ_from, int civ_toward) | byte | Returns raw attitude value from DAT_0064c6e0[civ_from*0x594 + civ_toward]. Range 0-100. | MEDIUM |
| 0x00467933 | small | FUN_00467933 | set_attitude_value | (int civ_from, int civ_toward, int value) | void | Sets attitude value, clamped 0-100 via clamp(). Respects scenario lock: skips if save_format==1 and scenario bit set for this civ (unless current player). | MEDIUM |
| 0x004679AB | medium | FUN_004679ab | calc_attitude | (int raw_attitude) | int | Already documented. Converts raw attitude (0-100) to category 0-8. Thresholds: <0=>0, <11=>1, <26=>2, <39=>3, <62=>4, <75=>5, <90=>6, <100=>7, >=100=>8. | HIGH |
| 0x00467A5D | stub | FUN_00467a5d | get_attitude_category | (int civ_from, int civ_toward) | int | Combines get_attitude_raw + calc_attitude. Returns attitude category 0-8 for civ pair. | MEDIUM |
| 0x00467A86 | stub | FUN_00467a86 | is_attitude_hostile | (int civ_from, int civ_toward) | bool | Returns true if attitude category < 4 (hostile/uncooperative). | MEDIUM |
| 0x00467ABB | stub | FUN_00467abb | is_attitude_friendly | (int civ_from, int civ_toward) | bool | Returns true if attitude category > 4 (enthusiastic/worshipful). | MEDIUM |
| 0x00467AF0 | medium | FUN_00467af0 | should_declare_war | (int civ_a, int civ_b) | bool | Decision function: returns true if civ_a should go to war with civ_b. True if: at war (bit 0x20 of treaty byte+1), or if contact-only (treaty & 5 == 1) and attitude > 49 (0x31). Returns false if allied (bit 8). | MEDIUM |

---

### Cluster: War Declaration & Unit Recall

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00467BAF | large | FUN_00467baf | recall_units_from_territory | (int owner_civ, int enemy_civ) | void | Iterates all unit slots. For each alive unit owned by owner_civ located in enemy_civ territory (via city lookup at same tile), sends unit home to nearest friendly city. Uses DAT_006560f0 (unit array), DAT_0064f340 (city array). Checks continent body ID and distance. Sets orders to sentry (0xFF). If active unit, updates screen target. | MEDIUM |
| 0x00467EF2 | large | FUN_00467ef2 | break_alliance | (int civ_a, int civ_b) | void | Breaks alliance between two civs. Clears alliance treaty flag (bit 8), recalls units from each other's territory (calls recall_units_from_territory both ways), updates current player map. Shows "CANCELALLIANCE" dialog. If current player involved, shows notification. Otherwise checks embassy/intelligence visibility. String evidence: "CANCELALLIANCE". | HIGH |

---

### Cluster: Unit List Box UI (Diplomacy/Trade Dialog)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004683F0 | large | FUN_004683f0 | init_unit_listbox | (int* rect, int panel_id, u4 param3) | void | Initializes a scrollable unit list panel for diplomacy dialog. Uses `this` via in_ECX. Stores rect at +0x3c0, creates scrollbar if items exceed visible area. Calls GetSystemMetrics(2) for scrollbar width. Uses operator_new(0x40) for CScrollBar. Panel data stored at ECX+0x3f0 (unit indices), ECX+0x43f8 (unit alive IDs), ECX+0x8400 (selection state). | MEDIUM |
| 0x00468797 | stub | FUN_00468797 | scroll_left_panel | (u4 value) | void | Wrapper: calls set_listbox_scroll(0, value). Sets scroll offset for left panel. | LOW |
| 0x004687B5 | stub | FUN_004687b5 | scroll_right_panel | (u4 value) | void | Wrapper: calls set_listbox_scroll(1, value). Sets scroll offset for right panel. | LOW |
| 0x004687D3 | small | FUN_004687d3 | set_listbox_scroll | (int panel_id, u4 value) | void | Sets scroll offset (ECX+0x10410+panel*4) and repaints via paint_unit_listbox. Gets `this` from FUN_005c62ee()-0x48. | LOW |
| 0x00468834 | large | FUN_00468834 | handle_listbox_click | (int msg_id) | void | Handles mouse click on unit list. Derives panel_id = msg_id - 0x3fc. Supports shift-click (range select), ctrl-click (toggle), normal click (exclusive select). Selection state stored at ECX+0x8400. Calls paint_unit_listbox to refresh. | MEDIUM |
| 0x00468AA7 | medium | FUN_00468aa7 | hit_test_listbox | (int mouse_x, int mouse_y, int panel_id) | int | Hit-tests mouse coordinates against listbox panel rect. Returns item index, or negative codes: -1=above, -2=below, -3=left, -4=right. Uses panel rect at +0x3c0, item height from get_rect_height/visible_count. | MEDIUM |
| 0x00468BB9 | xlarge | FUN_00468bb9 | paint_unit_listbox | (int panel_id) | void | Renders unit list panel. Gets DC, fills background, loops through visible items. For each unit: draws sprite via blit_normal (FUN_005cef31), draws unit type name (DAT_0064b1b8), draws unit name via FUN_005b6898. Highlights selected items. Handles "no items" case with empty label. References DAT_0066be90 (unit_sprite_ptrs), DAT_006560f6 (unit type_id field). DAT_0067a994 checked for dialog type (9=standard, 0xE/0xF=special). | MEDIUM |
| 0x004692EA | medium | FUN_004692ea | handle_listbox_sort_left_fwd | void | void | Sorts left listbox forward by some criteria, repaints panel 0. Sets flag +0x3bd=1. Calls FUN_0046b14d with msg 0xa7. | LOW |
| 0x004693C5 | medium | FUN_004693c5 | handle_listbox_sort_left_rev | void | void | Sorts left listbox reverse, repaints panel 0. Sets flag +0x3bd=0. Calls FUN_0046b14d with msg 0xa8. Uses sort_listbox_by_name for ordering. | LOW |
| 0x004694B7 | medium | FUN_004694b7 | handle_listbox_rename_unit | void | void | Shows rename dialog for selected unit (calls FUN_00511880 with param 100). Uses current player and dialog context. | LOW |
| 0x00469547 | stub | FUN_00469547 | handle_select_all_left | void | void | Calls select_all_items(0). | LOW |
| 0x00469561 | stub | FUN_00469561 | handle_select_all_right | void | void | Calls select_all_items(1). | LOW |
| 0x0046957B | small | FUN_0046957b | select_all_items | (int panel_id) | void | Selects all items in panel: calls sort_listbox_by_type for full range, repaints. | LOW |
| 0x004695E9 | stub | FUN_004695e9 | handle_sort_left_by_name | void | void | Calls sort_panel_by_name(0). | LOW |
| 0x00469603 | stub | FUN_00469603 | handle_sort_right_by_name | void | void | Calls sort_panel_by_name(1). | LOW |
| 0x0046961D | small | FUN_0046961d | sort_panel_by_name | (int panel_id) | void | Sorts panel items by name, repaints. Calls sort_listbox_by_name(0, count-1, panel_id). | LOW |
| 0x0046968B | large | FUN_0046968b | sort_listbox_by_type | (int start, int end, int panel_id) | void | Bubble-sorts unit list by unit type name (using strcmp on DAT_0066be90 sprite name pointers). Swaps entries in 3 parallel arrays: +0x3f0 (unit indices), +0x43f8 (alive IDs), +0x8400 (selection). Sets DAT_0066be78=0 (sort-by-type mode). | MEDIUM |
| 0x0046990A | large | FUN_0046990a | sort_listbox_by_name | (int start, int end, int panel_id) | void | Bubble-sorts unit list by individual unit name (via FUN_005b6898 = get_unit_name). Swaps same 3 parallel arrays. Sets DAT_0066be78=1 (sort-by-name mode). Skips dead units (orders == -1). | MEDIUM |
| 0x00469BDC | xlarge | FUN_00469bdc | populate_unit_listbox | (int panel_id, int preserve_selection) | void | Populates unit listbox for given panel. Iterates all unit slots (DAT_00655b16). For panel 0 (left): includes units owned by dialog civ; for panel 1 (right): includes units owned by another civ visible to current player. Checks unit adjacency to enemy territory (8-directional scan using DAT_00628350/DAT_00628360 deltas). Preserves previous selection state when preserve_selection=1. Calls sort function at end based on DAT_0066be78 flag. | MEDIUM |

---

### Cluster: Labels/Text Resources

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046A740 | small | FUN_0046a740 | free_labels | void | void | Frees label memory: unlocks (FUN_0046ab00) and frees (FUN_0046aaa0) DAT_0062841c, clears DAT_00628424. | MEDIUM |
| 0x0046A78D | large | load_labels_txt | load_labels_txt | void | int | Already named. Loads LABELS.TXT text resource file. Allocates 0xDE0 bytes for label pointers, reads up to 0x378 (888) entries. Falls back to secondary labels file. Fills missing entries with error string. Returns count or -1 on failure. String evidence: "LABELS". | HIGH |
| 0x0046AAA0 | stub | FUN_0046aaa0 | mem_free | (u4 handle) | void | Wrapper for FUN_005dce96 (memory free). | LOW |
| 0x0046AAD0 | stub | FUN_0046aad0 | mem_lock | (u4 handle) | ptr | Wrapper for FUN_005dcdf9 (memory lock/dereference). | LOW |
| 0x0046AB00 | stub | FUN_0046ab00 | mem_unlock | (u4 handle) | void | Wrapper for FUN_005dce29 (memory unlock). | LOW |

---

### Cluster: Click Region Manager (Dialog Hotspots)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046AB30 | stub | FUN_0046ab30 | get_this_ptr | void | u4 | Returns ECX (this pointer). MFC thiscall accessor. | LOW |
| 0x0046AB49 | stub | FUN_0046ab49 | noop_stub | void | void | Empty function, returns immediately. | LOW |
| 0x0046AB5F | stub | InvalidateObjectCache | invalidate_click_regions | (this) | void | MFC library match: CRichEditDoc::InvalidateObjectCache. Sets this+0x12c0=0 (region count). Ghidra FID misidentification - actually resets click region array count. | MEDIUM |
| 0x0046AB82 | small | FUN_0046ab82 | remove_click_region | (int index) | void | Removes click region at index by shifting subsequent entries down. Each entry = 0x18 (24) bytes. Decrements count at this+0x12c0. | MEDIUM |
| 0x0046ABED | medium | FUN_0046abed | remove_click_region_by_id | (int id1, int id2) | void | Searches click regions for matching (id2, id1) at offsets +0x10 and +0x14, removes if found. | LOW |
| 0x0046AC89 | small | FUN_0046ac89 | close_dialog | (int dialog_id) | void | Already documented as close_dialog. Removes all click regions with matching dialog_id at +0x10. Iterates backwards to handle shifting. | MEDIUM |
| 0x0046ACE7 | medium | FUN_0046ace7 | add_click_region | (u4 p1, u4 p2, u4 x, u4 y, u4 w, u4 h) | int | Adds new click region if count < 200. Stores rect via FUN_004086c0, sets id fields at +0x14 and +0x10. Returns new index or -1 if full. | MEDIUM |
| 0x0046AD85 | medium | FUN_0046ad85 | find_click_region | (int x, int y, u4* out_id1, u4* out_id2) | int | Hit-tests point (x,y) against all click regions. Returns index of matching region (last match wins), writes IDs to output params. Returns -1 if no match. Region rect stored at +0x00 through +0x0C. | MEDIUM |

---

### Cluster: Network Multiplayer Message System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046AF70 | medium | FUN_0046af70 | net_send_to_player | (int player_id, void* msg) | bool | Sends network message to specific player via XD_SendSecureData. Validates player_id 0-7 or 0xFF. Debug path: "D:\\Ss\\Franklinton\\NetMgr\\Send.cp". Logs failure. Checks for popup type 0x6a. | HIGH |
| 0x0046B0A1 | small | FUN_0046b0a1 | net_broadcast | (void* msg) | bool | Broadcasts network message to all players via XD_SendBroadcastData. Returns false on failure. Debug: "SendToEveryone FAILED". | HIGH |
| 0x0046B11D | stub | FUN_0046b11d | net_send_simple | (u4 msg_type, u4 extra) | void | Wrapper: sends simple message via net_send_message(type, 0, 0, 0, 0, 0, 0, 0, extra, 0). | LOW |
| 0x0046B14D | xlarge | FUN_0046b14d | net_send_message | (int type, u4 dest, int p3..p8, char* p9, int p10) | int | **Master network message dispatcher** (~6.6KB). Giant switch on message type (1-0xA8, ~100+ cases). Serializes game data into messages: type 0x17=COSMIC rules, 0x18=tech_table, 0x19=improvements, 0x1A=wonder_obsolete, 0x1B=unit_types, 0x1C=terrain, 0x1D=govt_names, 0x20=all civ data (0x7524 bytes!), 0x38=unit data, 0x3A=city data. Uses FUN_0059c0e1 to package payloads. Sends via net_send_to_player or net_broadcast. Handles live player tracking (DAT_00654fb0 bitmask). Debug source: "D:\\Ss\\Franklinton\\NetMgr\\Send.cp". | HIGH |

---

### Cluster: Network Message Packet Constructors

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046D5A0 | small | FUN_0046d5a0 | net_msg_init_header | (u4 msg_type) | u4* | Initializes network message header: magic=0x66606660, type=msg_type, size=0x10. Returns this pointer. | MEDIUM |
| 0x0046D5F0 | medium | FUN_0046d5f0 | net_msg_init_with_name | (u4 type, char* name) | int | Initializes message with player name (32 bytes at +0x30) and version string (32 bytes at +0x50). Size = 0x74. | MEDIUM |
| 0x0046D6A0 | small | FUN_0046d6a0 | net_msg_init_with_version | (u4 type) | int | Initializes message with version string at +0x10 (32 bytes). Size = 0x30. | MEDIUM |
| 0x0046D720 | small | FUN_0046d720 | net_msg_build_type2 | void | int | Builds type-2 message (chat/status). Copies DAT_006ad640 and calls FUN_0059c31f. Size = 0x198. | LOW |
| 0x0046D780 | medium | FUN_0046d780 | net_msg_build_type2f | (u4 param) | int | Builds type-0x2F message. Stores param at +0x10, copies DAT_00666570 (player name), initializes fields. Size = 100. | LOW |
| 0x0046D860 | stub | FUN_0046d860 | net_msg_build_type4 | void | int | Builds type-4 message. Size = 0x280 (640 bytes). | LOW |
| 0x0046D8A0 | stub | FUN_0046d8a0 | net_msg_build_type6 | void | int | Builds type-6 message. Size = 0x21C (540 bytes). | LOW |
| 0x0046D8E0 | small | FUN_0046d8e0 | net_msg_build_type13 | void | int | Builds type-0x13 message. Calls FUN_0059c31f at +0x10. Size = 0x134. | LOW |
| 0x0046D930 | small | FUN_0046d930 | net_msg_build_type69 | (u4 param) | int | Builds type-0x69 message (screen sync). Stores param at +0x10. Size = 0x14. | LOW |
| 0x0046D980 | medium | FUN_0046d980 | net_show_popup | (u4 param1, int label_index) | void | Shows network popup message. Creates window with label text from DAT_00628420[label_index*4], title from DAT_00628420[2]. | MEDIUM |

---

### Cluster: Opening Video / Art Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046DA40 | xlarge | load_civ2_art_0046da40 | play_opening_video | void | void | Already partially named. Attempts to load "civ2\\civ2art.dll", then "civ2\\video\\opening.avi". If video found: creates playback window (0x800 wide), sets up timer callback (FUN_0046dea1), key callback (FUN_0046de25), frame callback. Handles VFW registration error ("VFWNOTREGISTERED"). On success: plays video, waits for completion. Includes SEH frame for cleanup. | HIGH |
| 0x0046DD98 | stub | FUN_0046dd98 | cleanup_video_timevec | void | void | SEH cleanup: calls _Timevec destructor on stack local. | LOW |
| 0x0046DDA4 | stub | FUN_0046dda4 | cleanup_video_surface | void | void | SEH cleanup: calls FUN_005c656b. | LOW |
| 0x0046DDB0 | stub | FUN_0046ddb0 | cleanup_video_module | void | void | SEH cleanup: calls FUN_0044ca60. | LOW |
| 0x0046DDBC | stub | FUN_0046ddbc | cleanup_video_player | void | void | SEH cleanup: calls FUN_005dd1a0. | LOW |
| 0x0046DDD2 | stub | FUN_0046ddd2 | cleanup_video_seh | void | void | SEH epilog: restores FS:[0]. | LOW |
| 0x0046DDE0 | small | FUN_0046dde0 | on_video_timer | void | void | Video timer callback: invalidates frame cache, triggers sound event 0x6b. Checks DAT_0062af14 (video player ptr). | MEDIUM |
| 0x0046DE25 | small | FUN_0046de25 | on_video_key | (int key) | void | Video keyboard callback: responds to keys 0xD0-0xD2 with sound event 0x6b and invalidation. | LOW |
| 0x0046DEA1 | stub | FUN_0046dea1 | on_video_frame | void | void | Video frame callback: invalidates frame cache. | LOW |

---

### Cluster: CRT Static Init Blocks

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004675B0 | stub | FUN_004675b0 | crt_init_midi | void | void | FRAMEWORK. Calls FUN_004675ca (init) + FUN_004675e9 (atexit). | LOW |
| 0x004675CA | stub | FUN_004675ca | init_midi_system | void | void | FRAMEWORK. Calls FUN_004fa4be(50000). Likely MIDI init with buffer size. | LOW |
| 0x004675E9 | stub | FUN_004675e9 | register_midi_cleanup | void | void | FRAMEWORK. Registers FUN_00467606 via _atexit. | LOW |
| 0x00467606 | stub | FUN_00467606 | cleanup_midi_system | void | void | FRAMEWORK. Calls FUN_004fa569. MIDI cleanup. | LOW |
| 0x00467620 | stub | FID_conflict___E31 (1) | crt_init_static_1 | void | void | FRAMEWORK. VS1998 static init block. Calls FUN_0046763a + FUN_00467654. | LOW |
| 0x0046763A | stub | FUN_0046763a | init_static_module_1 | void | void | FRAMEWORK. Calls FUN_0044c730. | LOW |
| 0x00467654 | stub | FUN_00467654 | register_cleanup_1 | void | void | FRAMEWORK. Registers FUN_00467671 via _atexit. | LOW |
| 0x00467671 | stub | FUN_00467671 | cleanup_static_1 | void | void | FRAMEWORK. Calls FUN_0044ca60. | LOW |
| 0x0046768B | stub | FID_conflict___E31 (2) | crt_init_static_2 | void | void | FRAMEWORK. VS1998 static init block. Calls FUN_004676a5 + FUN_004676bf. | LOW |
| 0x004676A5 | stub | FUN_004676a5 | init_static_module_2 | void | void | FRAMEWORK. Calls FUN_005dcc10. | LOW |
| 0x004676BF | stub | FUN_004676bf | register_cleanup_2 | void | void | FRAMEWORK. Registers FUN_004676dc via _atexit. | LOW |
| 0x004676DC | stub | FUN_004676dc | cleanup_timevec_global | void | void | FRAMEWORK. _Timevec destructor on DAT_00654fd4. | LOW |
| 0x0046E9D0 | stub | FID_conflict___E31 (3) | crt_init_static_3 | void | void | FRAMEWORK. VS1998 static init block for palette system. | LOW |
| 0x0046E9EA | stub | FUN_0046e9ea | init_palette_surface | void | void | FRAMEWORK. Calls FUN_005c64da. | LOW |
| 0x0046EA04 | stub | FUN_0046ea04 | register_palette_cleanup | void | void | FRAMEWORK. Registers FUN_0046ea21 via _atexit. | LOW |
| 0x0046EA21 | stub | FUN_0046ea21 | cleanup_palette_surface | void | void | FRAMEWORK. Calls FUN_005c656b. | LOW |

---

### Cluster: MFC Library Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046DFF0 | stub | EnableStackedTabs | mfc_enable_stacked_tabs | (this, int param) | void | FRAMEWORK. CPropertySheet::EnableStackedTabs. Stores param at this+0x114. | HIGH |

---

### Cluster: Sound / Music System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046E020 | large | FUN_0046e020 | play_sound_effect | (uint sound_id, int channel, int loop, u4 param4) | void | Plays sound effect by ID. Loads WAV file from "CIV2\\SOUND\\" or scenario "\\SOUND\\" directory. Maps sound_id to filename via s_AIRCOMBT array (9-char entries, up to 0x85). Special handling for "CHEERS" (random variant). Uses sndPlaySoundA for channel 99, otherwise FUN_005d6038. Checks DAT_00655aea bit 4 (sound enabled). | HIGH |
| 0x0046E287 | small | FUN_0046e287 | wait_for_animation | (int frames) | void | Waits for animation delay: loops calling timeGetTime() until elapsed >= frames * 50/3 ms (~16.7ms per frame). Processes messages (FUN_00407ff0). For multiplayer (save_format > 2), also processes network. | MEDIUM |
| 0x0046E2F4 | stub | FUN_0046e2f4 | trigger_music_change | void | void | Sets DAT_0062b420=1 (music state flag). If DAT_0062b42c (music loaded), calls resume_music. | LOW |
| 0x0046E320 | medium | FUN_0046e320 | select_random_music_track | void | void | Selects random music track. Queries CD drive (FUN_005ddeff) for track count. Distinguishes major tracks (4+random) from minor (2+random). Avoids repeating same track. Starts playback via FUN_005ddbc7. | MEDIUM |
| 0x0046E4A9 | medium | FUN_0046e4a9 | init_cd_music | void | void | Initializes CD music system. Queries CD for track count. Sets DAT_0062b42c=1 (loaded), DAT_0062b420=1, DAT_0062b424 (major/minor). | MEDIUM |
| 0x0046E571 | medium | FUN_0046e571 | play_music_track | (int track_id, int force) | void | Plays specific music track if CD audio enabled (DAT_00655aea bit 3). Stops current, starts requested track. Avoids replaying same track unless forced. | MEDIUM |
| 0x0046E6A9 | stub | FUN_0046e6a9 | stop_music | void | void | Stops CD music playback via FUN_005dde9d. Sets DAT_0062b420=1. | LOW |
| 0x0046E6C8 | small | FUN_0046e6c8 | resume_music | void | void | Resumes music: if CD audio enabled (bit 3) and music was playing, calls select_random_music_track. Otherwise stops if not playing. | MEDIUM |

---

### Cluster: Palette / Color Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046EA3B | xlarge | handle_palette | handle_palette | void | void | Already named. Builds 256-color palette for game rendering. Allocates 0x2C4 byte color tables, creates 32-entry LOGPALETTE, uses GetNearestPaletteIndex for mapping. Maps indices 10-0xEB to game palette. Debug source: "D:\\Ss\\Franklinton\\Grey.cpp". | HIGH |
| 0x0046EE1E | stub | FUN_0046ee1e | free_palette_data | void | void | Frees DAT_0066c408 palette memory if allocated. | LOW |
| 0x0046EE4E | medium | FUN_0046ee4e | apply_palette_to_surfaces | void | void | Applies palette mapping (from DAT_0066c408) to all 8 civ surfaces plus 3 extra surfaces. Calls FUN_005c1a62(data, 10, 0xEC) for each. Then calls restore_palette_entries. | MEDIUM |
| 0x0046EF3F | medium | FUN_0046ef3f | invalidate_all_surfaces | void | void | Invalidates all 8 civ surfaces + 3 extra via FUN_005bb574. Calls FUN_00419b80 at end. Loop checks DAT_0066ca84+civ*0x3F0 for active civs. | LOW |
| 0x0046EFD6 | medium | FUN_0046efd6 | fade_out_palette | void | void | Palette fade-out animation. Stores current palette, then decrements fade level 10 to 0 with animation delay between steps. Restores palette after. Only runs if DAT_00638b48 != 0. | MEDIUM |
| 0x0046F06F | medium | FUN_0046f06f | fade_in_palette | void | void | Palette fade-in animation. Opposite of fade_out: increments from 0 to 10 with delays. | MEDIUM |
| 0x0046F108 | medium | FUN_0046f108 | restore_palette_entries | void | void | Restores palette entries. Gets palette handle, sets flags to PC_NOCOLLAPSE (0x04) for all 256 entries, then animates palette range 10-0xEC. | MEDIUM |
| 0x0046F18F | medium | FUN_0046f18f | end_paint_all_surfaces | void | void | Calls end_paint (FUN_00408460) for all 8 civ surfaces + 3 extra. Same loop pattern as invalidate_all_surfaces. | LOW |
| 0x0046F440 | stub | FUN_0046f440 | get_palette_handle | void | u4 | Returns ECX (palette object this pointer). | LOW |

---

### Cluster: Hex String Parser

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046E8F0 | medium | FUN_0046e8f0 | parse_hex_string | (char* str) | int | Parses hexadecimal string to integer. Handles 0-9 and A-F (case insensitive via toupper). Stops on invalid character. Standard hex parser. | MEDIUM |

---

### Cluster: Bitmap I/O

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0046F460 | xlarge | load_bitmap | load_bitmap | (u4 p1, char* filename, int pal_start, int pal_count, int load_palette) | int | Already named. Loads 640x480x256-color BMP file. Supports uncompressed (mode 0) and RLE8 (mode 1). Validates header (magic 0x4D42, dimensions 640x480, 8-bit). Applies palette offset. Returns 1 on success. Error strings: "Error reading file header", "Invalid bitmap file", "Image not 640 x 480 x 256 color", "Incompatable compression mode". | HIGH |
| 0x0046FBF3 | xlarge | write_bitmap_data | write_bitmap_data | (u4 p1, char* filename, int pal_start, int pal_count, int save_palette) | int | Already named. Writes 640x480x256-color BMP file. Creates standard BMP header (0x4B436 bytes total, 0x28 info header). Initializes default palette with special entries at 0xEC-0xF9 (white), 0xFA-0xFF (game-specific colors including magenta 0x870087). Writes scanlines bottom-up. | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 73**

| Category | Count | Notes |
|----------|-------|-------|
| AI Diplomacy | 12 | Master negotiation engine + helpers |
| Treaty/Attitude | 9 | Flag manipulation, attitude queries |
| Unit Listbox UI | 16 | Diplomacy dialog unit exchange panels |
| Network Multiplayer | 14 | Message dispatch, serialization, send/broadcast |
| Labels/Text | 4 | LABELS.TXT loading |
| Click Region Manager | 7 | Dialog hotspot hit-testing |
| Sound/Music | 8 | CD music, WAV effects |
| Palette/Color | 9 | Palette creation, fade, surface application |
| Video/Art | 8 | Opening video playback |
| Bitmap I/O | 2 | BMP load/save (already named) |
| CRT/MFC Framework | 16 | Static init, atexit, SEH, MFC thunks |
| Utility | 2 | Hex parser, CRT thunk |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00460129 (ai_diplomacy_negotiate)** - The complete AI diplomacy negotiation engine at ~16KB. Handles tribute, tech demands, alliance proposals, ceasefire, peace, war declarations, senate overrides, patience system. Critical for understanding Civ2 AI diplomacy behavior.

2. **FUN_0046b14d (net_send_message)** - Master network message dispatcher (~6.6KB) with ~100+ message types. Serializes and transmits all game state including COSMIC rules, tech tables, improvements, unit types, full civ data (0x7524 bytes), unit/city records. Essential for understanding multiplayer protocol.

3. **FUN_00467ef2 (break_alliance)** - Alliance-breaking logic including mutual unit recall from territory. Important for understanding diplomatic transitions.

4. **FUN_00467750 / FUN_00467825 (clear_treaty_flags / set_treaty_flags)** - Symmetric treaty flag manipulation with cascading dependencies. Key to understanding treaty state machine.

5. **FUN_0046e020 (play_sound_effect)** - Sound system: maps IDs to WAV files, handles scenario override paths, random variants. Documents the sound file naming convention.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Proposed Name | Evidence |
|--------|--------------|----------|
| DAT_0064c6c0 | civ_treaty_flags[8][8] | Accessed as [civ_a*0x594 + civ_b*4], symmetric read/write in treaty functions. Bit 1=contact, 2=ceasefire, 4=peace, 8=alliance, 0x10=embassy, 0x20=war, 0x80=ambassador, 0x2000=provoked. At civ base+0x20. |
| DAT_0064c6bf | civ_patience[8] | Accessed as [civ*0x594]. Incremented/decremented during negotiations. Compared against max patience from FUN_00456f8b. At civ base+0x1F. |
| DAT_0064c6e0 | civ_attitude_raw[8][8] | Accessed as [civ_from*0x594 + civ_toward]. Values 0-100. Read by get_attitude_raw, written by set_attitude_value. At civ base+0x40. |
| DAT_0064c6e8 | civ_treaty_violations[8][8] | Accessed as [civ*0x594 + target]. Incremented during alliance rejection, compared for war decisions. At civ base+0x48. |
| DAT_0064c6a2 | civ_gold[8] | Accessed as int at [civ*0x594]. Modified in tribute and cash exchanges. At civ base+0x02. |
| DAT_0064c6be | civ_some_counter[8] | Accessed as byte at [civ*0x594]. Used in attitude difference calculations. At civ base+0x1E. |
| DAT_0064c70e | civ_military_power[8] | Accessed as ushort at [civ*0x594]. Compared between civs for power assessment in diplomacy. At civ base+0x6E. |
| DAT_00626a28 | diplomacy_in_progress | Set to 1 at start of ai_diplomacy_negotiate, 0 at end. Prevents reentrance. |
| DAT_0064b118 | tribute_demand_amount | Set during tribute negotiations. Value 999 = "no tribute demanded". Reset to 0 or specific gold amounts. |
| DAT_0064b124 | tech_demand_id | Tech ID demanded during negotiations. -1 = none. |
| DAT_0064b104 | third_party_civ | Civ ID for alliance proposals or third-party war demands. -1 = none. |
| DAT_0064b0e8 | should_declare_war | Flag set to 1 when AI decides to declare war at end of negotiations. |
| DAT_0064b0f8 | wants_something | Flag: AI has demands to make (tribute/tech/etc). |
| DAT_0064b138 | ceasefire_expired | Flag indicating ceasefire has expired between negotiating civs. |
| DAT_0062b420 | music_stopped | Flag: 0=playing, 1=stopped. Controls CD music state machine. |
| DAT_0062b424 | music_track_type | 0=major track, 1=minor track. |
| DAT_0062b428 | current_music_track | Currently playing CD track number. -1=none. |
| DAT_0062b42c | music_loaded | Flag: CD music system initialized. |
| DAT_0066be78 | unit_list_sort_mode | 0=sort by type name, 1=sort by unit name. Controls listbox sort in diplomacy dialog. |
| DAT_0062841c | labels_mem_handle | Memory handle for LABELS.TXT data. |
| DAT_00628420 | labels_ptr_array | Pointer to array of label string pointers (up to 888 entries). Already referenced in phase0. |
| DAT_00628424 | labels_count | Number of labels loaded from LABELS.TXT. |
| DAT_00628468 | net_message_sequence | Monotonically increasing sequence number for network messages. |
| DAT_0066c408 | palette_mapping_handle | Memory handle for palette index mapping table. |
