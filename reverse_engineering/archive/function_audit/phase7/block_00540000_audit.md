# Block 00540000 -- Phase 7 Audit

**Functions in this block: 37**
**System: AI unit order continuation (tail of FUN_00538a29 from block 0x0053), Scenario Event Editor UI, Scenario Event file I/O**

---

## AI -- AI Master Unit Order Assignment, continued (2 functions)

FUN_00543b80 | 322B | N/A (ai_execute_single_unit_order -- processes a single AI unit's pending goto order (0x0B): checks if unit is alive, order is goto, not an air unit on wrong terrain, not a sea unit blocked by land; calls the master AI function FUN_00538a29 to get next move; if FUN_00538a29 returns 0 and unit still has moves, clears the unit's orders via thunk_FUN_005b6787; acts as the "step one tile" executor for AI goto)
FUN_00543cd6 | 801B | N/A (ai_process_all_units_for_player -- iterates all units for the current AI player (DAT_00655b05) in reverse order, calling FUN_00543b80 for each unit with remaining movement points: two-pass loop (pass 0 = settlers only if barbarian diplomacy scenario active, pass 1 = all units); handles multiplayer message pumping between units; includes infinite-loop protection (counter > 20 forces unit idle); re-checks settler units that may have become settlers after combat; calls thunk_FUN_0041033a after each unit completes)

**Comparison with JS engine**: The JS `ai/` directory has basic AI unit iteration but lacks the two-pass priority system, infinite-loop safeguard, and multiplayer message pump interleaving found here.

---

## UI -- User Interface: Scenario Event Editor (31 functions)

### Layout/Spacing Utility (2 functions)

FUN_00548b70 | 264B | N/A (ui_calc_item_spacing -- calculates evenly-spaced item layout: given item count, item height, and total available height, returns per-item spacing; handles remainder distribution for non-even division; clamps minimum spacing to 1)
FUN_00548c78 | 246B | N/A (ui_draw_spaced_items -- draws a series of items with calculated spacing using FUN_00548b70; calls FUN_005cef31 per item; handles remainder pixel distribution across items)

### Focus/Refresh (1 function)

FUN_00548df0 | 51B | N/A (ui_set_focus_and_refresh -- gets main window handle via thunk_FUN_00418770, calls Win32 SetFocus(), then calls thunk_FUN_0054f16b to refresh the event editor display)

### Event File I/O (3 functions)

FUN_00548e23 | 3045B | N/A (event_write_actions_to_file -- writes the THEN clause of a scenario event to a FILE*: iterates bit flags in event struct field+4, writes appropriate action keyword for each set bit: TEXT (1), MOVEUNIT (2), CREATEUNIT (4), CHANGEMONEY (8), PLAYWAVEFILE (0x10), MAKEAGGRESSION (0x20), JUSTONCE (0x40), PLAYCDTRACK (0x80), DONTPLAYWONDERS (0x100), CHANGETERRAIN (0x200), DESTROYACIVILIZATION (0x400), GIVETECHNOLOGY (0x800), HASTRIGGERED (0x2000); writes associated parameters like receiver, amount, unit type, owner, map rect, locations, veteran status, home city)
FUN_00549aee | 2113B | N/A (event_write_all_events_to_file -- writes all scenario events to a FILE* by traversing the linked list at DAT_0064b99c: for each event, writes @IF trigger keyword (UNITKILLED/CITYTAKEN/TURN/TURNINTERVAL/NEGOTIATION/SCENARIOLOADED/RANDOMTURN/NOSCHISM/RECEIVEDTECHNOLOGY) with parameters, then calls FUN_00548e23 for actions, then writes @ENDIF)
FUN_0054a4c4 | 894B | N/A (event_save_events_file -- saves scenario events to EVENTS.TXT: backs up existing file to EVENTS.BAK, opens new file for writing, copies non-event content from backup, calls FUN_00549aee to write events between @BEGINEVENTS/@ENDEVENTS markers, copies remaining content after @ENDEVENTS)

### Event Editor Helper Utilities (4 functions)

FUN_0054a874 | 95B | N/A (event_get_nth_set_bit -- given a bitmask param_2, returns the bit value of the param_1-th set bit; iterates through set bits counting down param_1 until reaching the target)
FUN_0054a8d3 | 63B | N/A (event_count_bits_below -- counts how many bits below param_1's position are set in param_2; used to compute list index from a bitmask position)
FUN_0054ada1 | 12B | N/A (SEH destructor thunk -- calls thunk_FUN_0059df8a for CRT frame cleanup)
FUN_0054adb7 | 15B | N/A (SEH epilog -- restores FS:[0] exception chain from saved frame)

### Event Editor: Dropdown/Selection Dialogs (2 functions)

FUN_0054a912 | 1125B | N/A (event_show_selection_dialog -- creates a modal selection listbox dialog: param_3 selects data type: 0=civilizations (1-7), 1=unit types (62 entries), 2=technologies (100 entries), 3=unit types with ANYUNIT option, 4=civs with ANYBODY, 5=civs with TRIGGERATTACKER/TRIGGERDEFENDER, 6=civs with TRIGGERRECEIVER, 7=terrain types (11 entries); populates list, selects param_1, shows dialog, returns selection)
FUN_0054adc6 | 205B | N/A (event_select_civ_with_trigger -- wrapper around FUN_0054a912 for selecting a civilization: if param_3==0x100, uses mode 6 (TRIGGERRECEIVER); otherwise uses mode 5 (TRIGGERATTACKER/TRIGGERDEFENDER); sets output param_4 to selected name string)

### Event Editor: UI Button/Help Handlers (5 functions)

FUN_0054ae93 | 602B | N/A (event_update_button_states -- updates event editor UI button enable/disable states based on current selection: checks if selected event exists, examines trigger type and action bit flags, enables/disables Add/Delete/Edit buttons accordingly; uses FUN_0054a874 to check specific action bit categories)
show_messagebox_B0ED | 232B | N/A (event_on_ok_button -- handles OK button in event editor: if not in network debug mode, calls event_save_events_file, shows error MessageBox on failure, invalidates cache and refreshes; in debug mode shows NOTICE popup)
FUN_0054b1d5 | 238B | N/A (event_show_trigger_help -- maps trigger type index (0-8) to help topic string (HELPUNITKILLED, HELPCITYTAKEN, HELPTURN, etc.) and displays it via thunk_FUN_004190d0 popup)
FUN_0054b2ec | 274B | N/A (event_show_action_help -- maps action type index (0-11) to help topic string (HELPTEXT, HELPMOVEUNIT, HELPCREATEUNIT, HELPCHANGEMONEY, etc.) and displays it via thunk_FUN_004190d0 popup)
FUN_0054b433 | 440B | N/A (event_on_help_button -- help button handler: determines if clicked on trigger list or action list, traverses event linked list to find selected event, extracts trigger/action type from bit position, calls FUN_0054b1d5 or FUN_0054b2ec accordingly)

### Event Editor: List Display (3 functions)

FUN_0054b5eb | 74B | N/A (event_reset_editor -- allocates 50000-byte event buffer, copies from DAT_0064b690 to DAT_00632578, resets editor state flags)
FUN_0054b635 | 1239B | N/A (event_populate_trigger_list -- populates the trigger listbox: traverses event linked list, formats each event as "{index}. {TRIGGERTYPE} [params]" string (e.g., "1. UNITKILLED: Warriors attacker:Romans defender:Greeks"), adds to listbox; then calls FUN_0054ae93 to update button states)
FUN_0054bc1a | 1866B | N/A (event_populate_action_list -- populates the action listbox for the currently selected event: iterates through 15 possible action bit flags, formats each set action as descriptive string (e.g., "TEXT: First line...", "MOVEUNIT: Warriors owner:Romans", "CREATEUNIT: Phalanx owner:Greeks veteran:yes homecity:Athens"), adds to listbox; then calls FUN_0054ae93)

### Event Editor: Event CRUD Operations (5 functions)

FUN_0054c36e | 307B | N/A (event_delete_event -- confirms deletion via DELETEITEM dialog, traverses linked list to find selected event, unlinks node from doubly-linked list (adjusts prev->next and next->prev pointers), refreshes trigger and action lists)
FUN_0054c4a1 | 3867B | N/A (event_edit_trigger -- edits trigger parameters for selected event: switch on trigger type (1=UNITKILLED edits unit/attacker/defender civs, 2=CITYTAKEN edits city name/attacker/defender, 4=TURN edits turn number, 8=TURNINTERVAL edits interval, 0x10=NEGOTIATION edits talker/listener/types, 0x20=SCENARIOLOADED no params, 0x40=RANDOMTURN edits denominator, 0x80=NOSCHISM edits defender, 0x100=RECEIVEDTECHNOLOGY edits receiver/tech); allocates string memory via thunk_show_messagebox_CA35; returns 1 on success)
FUN_0054d4ca | 28B | N/A (event_edit_trigger_wrapper -- thin wrapper calling FUN_0054c4a1 with param_1)
show_messagebox_D4E6 | 500B | N/A (event_add_new_trigger -- shows TRIGGERS selection dialog to pick trigger type, allocates new event node via thunk_FUN_004fa617 (if DAT_0064b994 < 0x1C4 = max 452 events), initializes with selected trigger bit, refreshes lists, calls FUN_0054c4a1 to edit parameters; removes event if editing was cancelled)
FUN_0054d6da | 277B | N/A (event_delete_action -- confirms deletion via DELETEITEM dialog, finds selected action's bit flag via FUN_0054a874, clears that bit from event's action mask, clears TEXT pointer if TEXT action removed, refreshes action list)

### Event Editor: Action Editing (3 functions)

FUN_0054d7ef | 5782B | N/A (event_edit_action -- edits action parameters for selected event's selected action: massive switch on action type -- TEXT shows multi-line text editor, MOVEUNIT edits unit type/owner/map rect/destination/count, CREATEUNIT edits unit/owner/veteran/homecity/locations (up to 10), CHANGEMONEY edits receiver/amount, PLAYWAVEFILE edits filename (appends .WAV extension), MAKEAGGRESSION edits aggressor/victim civs, PLAYCDTRACK edits track number (2-24), CHANGETERRAIN edits terrain type/map rect, DESTROYACIVILIZATION edits target civ with trigger options, GIVETECHNOLOGY edits receiver/technology; uses SEH frame for cleanup)
FUN_0054eeb4 | 28B | N/A (event_edit_action_wrapper -- thin wrapper calling FUN_0054d7ef with param_1)
show_messagebox_EED0 | 667B | N/A (event_add_new_action -- shows ACTIONS selection dialog for adding a new action to selected event: if event already has 13+ actions, shows capacity error MessageBox; otherwise sets the action bit in event's action mask, refreshes action list, calls FUN_0054d7ef to edit parameters; removes action bit if editing was cancelled)

### Event Editor: SEH Cleanup (4 functions)

FUN_0054ee8f | 12B | N/A (SEH destructor thunk -- calls thunk_FUN_00418870 for CWnd cleanup)
FUN_0054eea5 | 15B | N/A (SEH epilog -- restores FS:[0] exception chain)
FUN_0054ffa4 | 12B | N/A (SEH destructor thunk -- calls FUN_005c656b for cleanup)
FUN_0054ffba | 14B | N/A (SEH epilog -- restores FS:[0] exception chain)

### Event Editor: Window Construction and Main Loop (3 functions)

FUN_0054f16b | 590B | N/A (event_editor_draw -- draws the event editor window: sets up 0x29 x 0x12 grid, renders title strings from GAME.TXT string table entries 0x8D4/0x8D8, draws progress bar showing DAT_0064b994/DAT_0064b992 event capacity with colored segments (0x2A filled / 0x6A empty), draws border frames)
FUN_0054f3b9 | 3035B | N/A (event_editor_init -- initializes the full scenario event editor window: allocates 50000-byte buffer, creates CPropertySheet with 6 buttons (arranged in 2 rows of 3), creates 2 listboxes (triggers at top, actions at bottom), sets up button callbacks for Add/Delete/Edit triggers and actions, populates both lists, enters message loop until DAT_006a1d7c becomes 0; uses SEH frame)
FUN_0054ffc8 | 79B | N/A (event_editor_launch -- entry point to open the event editor: calls thunk_FUN_00417fa0 to set up parent window context, then calls FUN_0054f3b9 for full editor initialization; SEH wrapped)

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| AI (AI Logic) | 2 | AI unit order execution loop + per-player unit iteration |
| UI (User Interface) | 31 | Scenario Event Editor: file I/O, trigger/action CRUD, help system, list display, selection dialogs, button handlers, window construction |
| FW (Framework) | 4 | SEH destructor thunks and epilogs |
| **Total** | **37** | |

### Key Findings

1. **Block 0x0054 is dominated by the Scenario Event Editor** (31 of 37 functions). This is the built-in tool for creating/editing scenario events (EVENTS.TXT) in Civ2 MGE. The editor supports 9 trigger types and 13 action types with a doubly-linked list data structure.

2. **The 2 AI functions** (FUN_00543b80 and FUN_00543cd6) are the execution layer that sits between the AI decision-making in block 0x0053 and the game engine. FUN_00543cd6 is the per-player unit iteration loop that drives all AI unit processing.

3. **No GL functions requiring JS comparison exist in this block.** The scenario event editor is entirely UI/tool functionality that has no equivalent in the JS engine (the JS engine does not support scenario event editing). The AI iteration functions have no direct JS counterpart beyond basic AI turn processing.

4. **The event file format** is fully documented by FUN_00548e23 and FUN_00549aee: events are stored as @IF...@ENDIF blocks within @BEGINEVENTS...@ENDEVENTS markers in EVENTS.TXT, with trigger types as keywords and action types as sub-keywords with typed parameters.

5. **Event capacity limit**: DAT_0064b994 tracks current event count, DAT_0064b992 is max capacity, and the editor enforces a maximum of 13 actions per event and ~452 events total (0x1C4).
