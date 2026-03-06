# Phase 1 Analysis: block_00540000 (0x00543B80 - 0x0054FFC8)

## Overview
This block contains **37 functions** spanning two distinct subsystems:
1. **Unit AI movement** (2 functions at 0x543b80-0x543cd6) -- AI automation for settling and sea unit movement
2. **Scenario Events Editor** (35 functions at 0x548b70-0x54ffc8) -- the complete GUI for creating, editing, serializing, and managing scenario events (triggers + actions)

### Key Data Structures

**Event node** (linked list, stride ~0x1C4):
- `+0x00`: trigger type bitmask (1=UNITKILLED, 2=CITYTAKEN, 4=TURN, 8=TURNINTERVAL, 0x10=NEGOTIATION, 0x20=SCENARIOLOADED, 0x40=RANDOMTURN, 0x80=NOSCHISM, 0x100=RECEIVEDTECHNOLOGY)
- `+0x04`: action bitmask (1=TEXT, 2=MOVEUNIT, 4=CREATEUNIT, 8=CHANGEMONEY, 0x10=PLAYWAVEFILE, 0x20=MAKEAGGRESSION, 0x40=JUSTONCE, 0x80=PLAYCDTRACK, 0x100=DONTPLAYWONDERS, 0x200=CHANGETERRAIN, 0x400=DESTROYACIVILIZATION, 0x800=GIVETECHNOLOGY, 0x2000=HASTRIGGERED)
- `+0x38`: TEXT lines array (20 pointers)
- `+0x88-0xC0`: MOVEUNIT data (owner, unit, maprect, moveto, numbertomove)
- `+0xC4-0xD0`: MAKEAGGRESSION data (who, whom)
- `+0xD4-0x13C`: CREATEUNIT data (owner, unit, veteran, homecity, locations)
- `+0x174-0x17C`: CHANGEMONEY data (receiver, amount)
- `+0x184`: PLAYWAVEFILE filename ptr
- `+0x188`: PLAYCDTRACK track number
- `+0x18C-0x1B0`: CHANGETERRAIN/DESTROYACIVILIZATION data
- `+0x1B4-0x1B8`: GIVETECHNOLOGY data (technology, receiver)
- `+0x1BC`: next pointer (linked list)
- `+0x1C0`: prev pointer (doubly-linked)

**DAT_0064b99c** = events linked list head

---

### Cluster: Unit AI Movement

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x543B80 | small(30) | FUN_00543b80 | ai_try_settle_unit | 0 (reads DAT_00655afe) | void | For current unit (DAT_00655afe), checks if alive, orders==0x0B (settle), domain==0 (land), and range!=2 (not air); calls movement/pathfinding helpers; if conditions met, dispatches unit to settle via FUN_005b6787 | MEDIUM |
| 0x543CD6 | large(113) | FUN_00543cd6 | ai_process_unit_automation | 0 | void | Main AI unit automation loop. Two-pass scan over all unit slots: pass 0 handles land, pass 1 handles sea (domain==1). For each living unit owned by current civ (DAT_00655b05), repeatedly calls FUN_005b6458 (check if unit can act) then ai_try_settle_unit. Includes multiplayer sync (XD_FlushSendBuffer). Safety limit of 20 iterations per unit before forcing sleep (FUN_005b6787). Checks DAT_006ad698/DAT_006ad685 for MP abort flags | MEDIUM |

---

### Cluster: Scenario Events -- Layout Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x548B70 | medium(62) | FUN_00548b70 | calc_icon_spacing | 5: (count, icon_size, total_space, out_fitted_count, out_remainder) | int (adjusted icon_size) | Calculates evenly-spaced icon layout: given N items of size S in total_space, computes spacing. If items don't fit, shrinks icon_size. Returns effective icon size; outputs fitted count and fractional remainder for sub-pixel distribution. Already named in reference | HIGH |
| 0x548C78 | small(40) | FUN_00548c78 | draw_icon_row_spaced | 9: (sprite, surface, x, y, filled, total, icon_size, total_width, distribute) | void | Draws a row of icons with calculated spacing. Calls calc_icon_spacing to compute layout, then blits each icon via FUN_005cef31 (blit_normal), advancing x by computed spacing. Handles fractional pixel distribution for even spacing | MEDIUM |
| 0x548DF0 | stub(8) | FUN_00548df0 | events_editor_set_focus | 0 | void | Gets window handle via FUN_00418770, calls SetFocus(), then calls FUN_0054f16b (events_editor_paint). Restores focus to events editor window after dialog interactions | HIGH |

---

### Cluster: Scenario Events -- File Serialization

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x548E23 | xlarge(516) | FUN_00548e23 | write_event_actions | 2: (FILE*, event_node_ptr) | void | Writes the THEN-clause (actions) of a single event to file. Iterates action bitmask bits 1..0x4000, writing matching action keywords: TEXT, MOVEUNIT, CREATEUNIT, CHANGEMONEY, PLAYWAVEFILE, MAKEAGGRESSION, JUSTONCE, PLAYCDTRACK, DONTPLAYWONDERS, CHANGETERRAIN, DESTROYACIVILIZATION, GIVETECHNOLOGY, HASTRIGGERED. Uses fputs/sprintf for formatted output. String evidence: "THEN", "TEXT", "MOVEUNIT", "CREATEUNIT", "CHANGEMONEY", etc. | HIGH |
| 0x549AEE | xlarge(953) | FUN_00549aee | write_all_events | 1: (FILE*) | void | Writes all events in linked list to file. For each event node (traversing DAT_0064b99c via +0x1BC next pointer), writes "@IF\n", then trigger-specific keywords (UNITKILLED, CITYTAKEN, TURN, TURNINTERVAL, NEGOTIATION, SCENARIOLOADED, RANDOMTURN, NOSCHISM, RECEIVEDTECHNOLOGY), then calls write_event_actions for the THEN clause, then "@ENDIF\n". String evidence: "@IF", "UNITKILLED", "CITYTAKEN", "TURN", etc. | HIGH |
| 0x54A4C4 | large(136) | FUN_0054a4c4 | save_events_file | 0 | int (success) | Saves events to EVENTS.TXT file. Backs up existing file to EVENTS.BAK, opens both, copies content before @BEGINEVENTS from backup, calls write_all_events to write current events, copies content after @ENDEVENTS from backup, closes both files. Returns 1 on success, 0 on failure. String evidence: "EVENTS.", "EVENTS.BAK", "@BEGINEVENTS", "@ENDEVENTS" | HIGH |

---

### Cluster: Scenario Events -- Bitmask Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x54A874 | small(24) | FUN_0054a874 | get_nth_set_bit | 2: (n, bitmask) | uint (bit value) | Returns the bit value (power of 2) of the Nth set bit in the bitmask. Iterates through set bits, counting down param_1 until reaching the target. Used to map listbox selection index to action bitmask bit | MEDIUM |
| 0x54A8D3 | small(18) | FUN_0054a8d3 | count_lower_set_bits | 2: (bit, bitmask) | int (count) | Counts how many bits are set in bitmask below the given bit position. Right-shifts bit while checking bitmask. Used to convert an action bitmask bit back to a listbox index | MEDIUM |

---

### Cluster: Scenario Events -- Selection Dialogs

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x54A912 | large(185) | FUN_0054a912 | show_event_picker_dialog | 3: (current_value, title, picker_type) | int (selected index or -1) | Shows a list dialog for picking event-related items. picker_type selects content: 0=civs(1-7), 1=unit types(0-61), 2=technologies(0-99), 3=ANYUNIT+unit types, 4=ANYBODY+civs, 5=TRIGGERATTACKER/DEFENDER+civs, 6=TRIGGERRECEIVER+civs, 7=terrain types(0-10). Populates listbox via FUN_0059edf0, uses FUN_00493c7d for civ names, FUN_00428b0c for item names. String evidence: "ANYUNIT", "ANYBODY", "TRIGGERATTACKER", "TRIGGERDEFENDER", "TRIGGERRECEIVER" | HIGH |
| 0x54ADA1 | stub(4) | FUN_0054ada1 | picker_dialog_cleanup | 0 | void | Calls FUN_0059df8a (dialog cleanup/destructor). SEH cleanup helper for show_event_picker_dialog | LOW |
| 0x54ADB7 | stub(6) | FUN_0054adb7 | picker_dialog_seh_unwind | 0 | void | Restores FS:[0] SEH chain from stack frame. Compiler-generated structured exception handler epilog | LOW |
| 0x54ADC6 | small(32) | FUN_0054adc6 | pick_event_civ_receiver | 4: (current, title, trigger_type, out_name_ptr) | int (civ id or -1) | Wrapper around show_event_picker_dialog for selecting a civ receiver. If trigger_type==0x100 (RECEIVEDTECHNOLOGY), uses picker_type=6 (TRIGGERRECEIVER); otherwise uses picker_type=5 (TRIGGERATTACKER/DEFENDER). Resolves selected civ to name string. String evidence: "TRIGGERRECEIVER", "TRIGGERATTACKER", "TRIGGERDEFENDER" | HIGH |

---

### Cluster: Scenario Events -- Editor UI State Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x54AE93 | large(102) | FUN_0054ae93 | update_event_action_buttons | 0 | void | Updates enabled/disabled state of action editor buttons based on currently selected event. Calls FUN_00453c80 (enable) and FUN_00453c40 (disable) for 5+ toolbar buttons. Checks trigger type (0x20=SCENARIOLOADED has restrictions), action bitmask availability (0x3140 mask = restricted actions), and current selection validity | MEDIUM |
| 0x54B0ED | small(36) | show_messagebox_B0ED | handle_save_events | 0 | void | Handles "Save Events" button click. If DAT_0062e014==0 (not in debug notice mode): calls save_events_file, shows error MessageBox on failure ("Error updating EVENTS."), invalidates cache, recalculates events. If DAT_0062e014!=0: shows debug "NOTICE" dialog, resets flag, restores focus. String evidence: "Error updating EVENTS.", "File I/O Error", "NOTICE" | HIGH |
| 0x54B1D5 | small(50) | FUN_0054b1d5 | show_trigger_help | 1: (trigger_index) | void | Shows help text for a trigger type. Maps index 0-8 to help string key (HELPUNITKILLED, HELPCITYTAKEN, HELPTURN, HELPTURNINTERVAL, HELPNEGOTIATION, HELPSCENARIOLOADED, HELPRANDOMTURN, HELPNOSCHISM, HELPRECEIVEDTECHNOLOGY), then displays via FUN_004190d0. String evidence: "HELPUNITKILLED", "HELPCITYTAKEN", etc. | HIGH |
| 0x54B2EC | small(56) | FUN_0054b2ec | show_action_help | 1: (action_index) | void | Shows help text for an action type. Maps index 0-11 to help string key (HELPTEXT, HELPMOVEUNIT, HELPCREATEUNIT, HELPCHANGEMONEY, HELPPLAYWAVEFILE, HELPMAKEAGGRESSION, HELPJUSTONCE, HELPPLAYCDTRACK, HELPDONTPLAYWONDERS, HELPCHANGETERRAIN, HELPDESTROYACIVILIZATION, HELPGIVETECHNOLOGY). String evidence: "HELPTEXT", "HELPMOVEUNIT", etc. | HIGH |
| 0x54B433 | medium(62) | FUN_0054b433 | handle_help_button | 0 | void | Handles "Help" button in events editor. Gets current selection via FUN_00551d50. If top-level listbox selected (triggers), shows trigger help. If sub-item selected (actions), determines the Nth action via get_nth_set_bit, finds its bit index, and shows action help. Falls through to show generic "EVENTS" help if nothing selected. String evidence: "EVENTS" | MEDIUM |
| 0x54B5EB | stub(12) | FUN_0054b5eb | events_editor_reset | 0 | void | Resets events editor state. Calls FUN_004fa5d9(50000) to allocate, copies event data via FUN_004ce98e, clears DAT_006a1d7c flag, and invalidates object cache | MEDIUM |
| 0x54B635 | xlarge(large switch, 340+) | FUN_0054b635 | populate_trigger_listbox | 0 | void | Populates the trigger listbox in events editor. Iterates all events in linked list (DAT_0064b99c), formats each trigger as a summary string (e.g., "1. UNITKILLED - %s attacker=%s defender=%s"), and adds to listbox via FUN_00419020. Handles all 9 trigger types with appropriate field display. Calls update_event_action_buttons at end. String evidence: "%d. UNITKILLED", "%d. CITYTAKEN", "%d. TURN", "%d. NEGOTIATION", etc. | HIGH |
| 0x54BC1A | xlarge(large switch, 286+) | FUN_0054bc1a | populate_action_listbox | 0 | void | Populates the action listbox for the currently selected event. Gets selected trigger index via FUN_00551d50, traverses linked list to find event node, then iterates action bitmask bits 1..0x4000. For each set bit, formats action summary string and adds to listbox. Handles all 13 action types. Calls update_event_action_buttons at end. String evidence: "TEXT", "MOVEUNIT", "CREATEUNIT", "CHANGEMONEY", etc. | HIGH |

---

### Cluster: Scenario Events -- CRUD Operations

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x54C36E | medium(54) | FUN_0054c36e | delete_event | 0 | void | Deletes the currently selected event from the linked list. Prompts "DELETEITEM" confirmation, then unlinks the node (fixes prev/next pointers), updates DAT_0064b99c if deleting head. Refreshes both listboxes. String evidence: "DELETEITEM" | HIGH |
| 0x54C4A1 | xlarge(622+) | FUN_0054c4a1 | edit_event_trigger | 0 | int (1=modified, 0=cancelled) | Edits the trigger parameters of the currently selected event. Large switch on trigger type (1=UNITKILLED, 2=CITYTAKEN, 4=TURN, 8=TURNINTERVAL, 0x10=NEGOTIATION, 0x20=SCENARIOLOADED, 0x40=RANDOMTURN, 0x80=NOSCHISM, 0x100=RECEIVEDTECHNOLOGY). For each type, shows appropriate picker dialogs for unit/civ/tech/city selection, talker/listener type selection, turn counts, etc. Uses show_event_picker_dialog extensively. String evidence: "TURNINTERVAL", "TURNCOUNT", "CITYNAME", "TALKERTYPE", "RANDOMDENOM", etc. | HIGH |
| 0x54D4CA | stub(5) | FUN_0054d4ca | edit_event_trigger_wrapper | 1: (param_1) | void | Thin thunk wrapper that calls edit_event_trigger. Message handler indirection | LOW |
| 0x54D4E6 | medium(86) | show_messagebox_D4E6 | handle_add_trigger | 0 | void | Handles "Add Trigger" button. Shows trigger type picker via FUN_00551e20("TRIGGERS"), allocates a new event node via FUN_004fa617, sets trigger bitmask, appends to linked list, refreshes listboxes, then immediately opens the edit-trigger dialog. If user cancels editing, removes the newly added node. Shows error if max event limit (0x1C4=452) reached. String evidence: "TRIGGERS" | HIGH |
| 0x54D6DA | medium(52) | FUN_0054d6da | delete_event_action | 0 | void | Deletes a single action from the currently selected event. Prompts "DELETEITEM" confirmation, clears the action bit from the event's action bitmask (+0x04), and if TEXT action removed, clears text pointer at +0x38. Refreshes action listbox. String evidence: "DELETEITEM" | HIGH |
| 0x54D7EF | xlarge(470+) | FUN_0054d7ef | edit_event_action | 0 | void | Edits parameters of a specific action in the currently selected event. Gets event node and action type via get_nth_set_bit. Massive switch on action type (1=TEXT, 2=MOVEUNIT, 4=CREATEUNIT, 8=CHANGEMONEY, 0x10=PLAYWAVEFILE, 0x20=MAKEAGGRESSION, 0x80=PLAYCDTRACK, 0x200=CHANGETERRAIN, 0x400=DESTROYACIVILIZATION, 0x800=GIVETECHNOLOGY). For each, shows appropriate editing dialogs for unit/civ/tech/terrain selection, coordinate entry (MAPRECT, LOCATION), amount entry, WAV file selection, CD track number, veteran status, home city name, etc. String evidence: "AMOUNT", "MAPRECT", "LOCATION", "NUMUNITS", "VETERAN", "HOMECITYNAME", "WAVFILE", "CDTRACK", "LOCATIONNUM", etc. | HIGH |
| 0x54EE8F | stub(4) | FUN_0054ee8f | edit_action_cleanup | 0 | void | Calls FUN_00418870 (window cleanup/destructor). SEH cleanup helper for edit_event_action | LOW |
| 0x54EEA5 | stub(6) | FUN_0054eea5 | edit_action_seh_unwind | 0 | void | Restores FS:[0] SEH chain from stack frame. Compiler-generated SEH epilog | LOW |
| 0x54EEB4 | stub(5) | FUN_0054eeb4 | edit_event_action_wrapper | 1: (param_1) | void | Thin thunk wrapper that calls edit_event_action. Message handler indirection | LOW |
| 0x54EED0 | large(110) | show_messagebox_EED0 | handle_add_action | 0 | void | Handles "Add Action" button. Shows available action picker via FUN_004cdd3d("ACTIONS"), with mask 0xFFFFFE6F excluding already-set actions for SCENARIOLOADED triggers. Sets the action bit, refreshes listbox, immediately opens edit-action dialog. If user cancels editing, clears the bit back. Shows error MessageBox if max 13 actions reached. String evidence: "ACTIONS" | HIGH |

---

### Cluster: Scenario Events -- Editor Window

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x54F16B | large(107) | FUN_0054f16b | events_editor_paint | 0 | void | Paints the events editor window. Calls begin_paint, sets text style (font 0x29/0x12), draws two section titles (from DAT_00628420 labels), draws event count with progress bar showing current/total events ratio (DAT_0064b994/DAT_0064b992). Progress bar uses fill_rect with palette colors 0x2A and 0x6A. Calls end_paint. String evidence: "%d" (event count format) | MEDIUM |
| 0x54F3B9 | xlarge(340+) | FUN_0054f3b9 | events_editor_init | 0 | void | Initializes the complete events editor window. Allocates event storage (50000 bytes), sets up font/text style (0x29, 0x12), creates window layout (0x230 x 0x17C), creates 6 buttons in two rows (Triggers/Actions sections: each has Edit/Add/Delete), creates two listboxes for triggers and actions, sets button callbacks, populates both listboxes, creates 3 bottom buttons (OK/Save/Cancel), enters message loop until DAT_006a1d7c==0. String evidence: button labels from DAT_00628420 offsets | MEDIUM |
| 0x54FFA4 | stub(4) | FUN_0054ffa4 | events_editor_window_cleanup | 0 | void | Calls FUN_005c656b (window destructor). SEH cleanup helper for events_editor_init | LOW |
| 0x54FFBA | stub(5) | FUN_0054ffba | events_editor_seh_unwind | 0 | void | Restores FS:[0] SEH chain. Compiler-generated SEH epilog | LOW |
| 0x54FFC8 | stub(14) | FUN_0054ffc8 | open_events_editor | 0 | void | Entry point to open the scenario events editor. Sets up SEH frame, calls FUN_00417fa0 (window create helper), then events_editor_init, then cleans up. This is the top-level function called from menu/toolbar to launch the editor | MEDIUM |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 37**

| Category | Count | Functions |
|----------|-------|-----------|
| Unit AI Movement | 2 | ai_try_settle_unit, ai_process_unit_automation |
| Events File I/O | 3 | write_event_actions, write_all_events, save_events_file |
| Events Bitmask Utils | 2 | get_nth_set_bit, count_lower_set_bits |
| Events Selection Dialogs | 4 | show_event_picker_dialog, picker_dialog_cleanup, picker_dialog_seh_unwind, pick_event_civ_receiver |
| Events UI State | 8 | update_event_action_buttons, handle_save_events, show_trigger_help, show_action_help, handle_help_button, events_editor_reset, populate_trigger_listbox, populate_action_listbox |
| Events CRUD | 9 | delete_event, edit_event_trigger, edit_event_trigger_wrapper, handle_add_trigger, delete_event_action, edit_event_action, edit_action_cleanup, edit_action_seh_unwind, edit_event_action_wrapper |
| Events Add Action/Trigger | 2 | handle_add_action, handle_add_action (different) |
| Events Editor Window | 5 | events_editor_paint, events_editor_init, events_editor_window_cleanup, events_editor_seh_unwind, open_events_editor |
| Layout Utility | 2 | calc_icon_spacing (already named), draw_icon_row_spaced |
| FRAMEWORK (SEH/thunks) | 6 | Various SEH unwind and thin wrapper functions |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0054f3b9 (events_editor_init)** -- Complete initialization of the scenario events editor window, the only way to create/edit events in MGE. Documents the full UI layout.

2. **FUN_00549aee (write_all_events)** -- Serializes the entire event linked list to EVENTS.TXT format. Defines the authoritative file format for all 9 trigger types.

3. **FUN_00543cd6 (ai_process_unit_automation)** -- Main AI unit automation dispatcher. Two-pass architecture (land then sea) with multiplayer sync, the core AI movement loop.

4. **FUN_0054c4a1 (edit_event_trigger)** -- Comprehensive trigger editing for all 9 types. Documents every editable field in the event data structure.

5. **FUN_0054d7ef (edit_event_action)** -- Comprehensive action editing for all 13 action types. Documents the complete event action data layout with field offsets.

### 3. New DAT_ Globals Identified with High Confidence

| Global | Proposed Name | Evidence |
|--------|--------------|----------|
| DAT_0064b99c | event_list_head | Used as linked list head in every event function; traversed via +0x1BC/+0x1C0 next/prev pointers. 100% consistent across all 37 functions | HIGH |
| DAT_0064b994 | event_count | Compared against 0x1C4 (max), divided by DAT_0064b992 for progress bar, formatted as "%d" | HIGH |
| DAT_0064b992 | event_max_slots | Used as denominator in progress bar ratio calculation (DAT_0064b994/DAT_0064b992) | MEDIUM |
| DAT_006a4f88 | events_editor_window_ptr | Pointer to events editor CPropertySheet/window object; +0x48=child window, +0xAD0=scrollbar state. Set in events_editor_init, checked for null throughout | HIGH |
| DAT_006a1d7c | events_editor_active_flag | Set to 1 in init, cleared to 0 on close; message loop runs while !=0 | HIGH |
| DAT_006a1d80 | events_editor_control_id | Monotonically incremented counter for assigning control IDs to listboxes | MEDIUM |
| DAT_0062e014 | events_debug_notice_flag | When set, handle_save_events shows "NOTICE" instead of saving | MEDIUM |
| DAT_00632578 | events_editor_data_ptr | Allocated buffer (50000 bytes) for event data; freed on editor close | MEDIUM |
| DAT_00631edc | dialog_help_requested | Set to non-zero when help button pressed in sub-dialog; checked to show help text | LOW |
| DAT_006ad698 | mp_abort_flag_1 | Checked in ai_process_unit_automation; causes early return in multiplayer | LOW |
| DAT_006ad685 | mp_abort_flag_2 | Second multiplayer abort flag, same pattern | LOW |
| DAT_00655afe | current_unit_index | Unit slot index for current AI processing; read by ai_try_settle_unit | MEDIUM |
| DAT_00655b05 | current_civ_index | Civ index for current AI processing (0-7); read by ai_process_unit_automation | MEDIUM |
| DAT_00628420 | labels_txt_base | Base pointer for LABELS.TXT string table; accessed via offsets +0x73C, +0x8D4, +0x8DC, etc. for UI labels | HIGH |
