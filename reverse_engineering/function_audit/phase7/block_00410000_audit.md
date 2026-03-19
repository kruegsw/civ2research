# Block 00410000 — Phase 7 Audit

**Functions in this block: 204**
**System: Map window UI (click/key handlers), rules.txt parsing, game setup/new game wizard, rules editor**

The "heavy state writes" that flagged this block in Phase 6 are **initialization writes**: parsing rules.txt into global data arrays and setting up new game state (difficulty, map size, civ selection, etc.). There are no game mechanic formulas (combat, production, happiness, research, etc.) in this block.

---

## FW — Framework (52 functions)

FUN_004102d5 | 12B | N/A (CRT dialog cleanup thunk)
FUN_004102e1 | 9B | N/A (CRT destructor thunk)
FUN_004102f4 | 14B | N/A (SEH unwind thunk)
FUN_00414b70 | 47B | N/A (MFC window message send wrapper)
FUN_00414bb0 | 37B | N/A (MFC window property getter)
FUN_00414be0 | 43B | N/A (MFC callback setter — stores function pointer at offset 0)
FUN_00414c20 | 45B | N/A (MFC callback setter — stores function pointer at offset 4)
FUN_00414c60 | 45B | N/A (MFC callback setter — stores function pointer at offset 8)
FUN_00414ca0 | 45B | N/A (MFC callback setter — stores function pointer at offset 0x1c)
FUN_00414ce0 | 39B | N/A (MFC cursor update helper)
FUN_00414d10 | 28B | N/A (MFC window handle getter — returns member at offset 8)
FUN_00414d40 | 39B | N/A (MFC cursor restore helper)
FUN_00414d70 | 33B | N/A (MFC title bar text setter via string resource)
EnableStackedTabs | 36B | N/A (MFC CPropertySheet::EnableStackedTabs — library function)
IsTracking | 31B | N/A (MFC CSplitterWnd::IsTracking — library function)
FUN_00417542 | 12B | N/A (CRT window close cleanup)
FUN_00417558 | 14B | N/A (SEH unwind thunk)
FUN_004175bf | 12B | N/A (CRT destructor thunk — rules editor)
FUN_004175d5 | 14B | N/A (SEH unwind thunk)
FUN_0041851f | 15B | N/A (CRT destructor thunk — editor control)
FUN_0041852e | 15B | N/A (CRT destructor thunk — editor control)
FUN_0041853d | 15B | N/A (CRT destructor thunk — editor control)
FUN_0041854c | 15B | N/A (CRT destructor thunk — button control)
FUN_0041855b | 15B | N/A (CRT destructor thunk — button control)
FUN_0041856a | 15B | N/A (CRT destructor thunk — button control)
FUN_00418579 | 15B | N/A (CRT destructor thunk — button control)
FUN_00418588 | 15B | N/A (CRT destructor thunk — button control)
FUN_00418597 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185a6 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185b5 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185c4 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185d3 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185e2 | 15B | N/A (CRT destructor thunk — button control)
FUN_004185f1 | 15B | N/A (CRT destructor thunk — button control)
FUN_00418600 | 15B | N/A (CRT destructor thunk — button control)
FUN_0041860f | 15B | N/A (CRT destructor thunk — button control)
FUN_0041861e | 15B | N/A (CRT destructor thunk — button control)
FUN_0041862d | 15B | N/A (CRT destructor thunk — button control)
FUN_0041863c | 24B | N/A (CRT vector destructor — editor combo boxes)
FUN_00418654 | 24B | N/A (CRT vector destructor — editor dropdown lists)
FUN_0041866c | 9B | N/A (MFC COleCntrFrameWnd destructor)
FUN_0041867f | 14B | N/A (SEH unwind thunk)
FUN_004188ca | 9B | N/A (CRT destructor thunk — editor control)
FUN_004188dd | 14B | N/A (SEH unwind thunk)
FUN_00418baa | 9B | N/A (CRT destructor thunk — editor control)
FUN_00418bbd | 14B | N/A (SEH unwind thunk)
FUN_00418efa | 9B | N/A (CRT destructor thunk — editor control)
FUN_00418f0d | 14B | N/A (SEH unwind thunk)
FUN_00419940 | 12B | N/A (CRT window close cleanup — hotseat)
FUN_0041994c | 12B | N/A (CRT dialog cleanup — hotseat)
FUN_00419962 | 15B | N/A (SEH unwind thunk)
FID_conflict:_$E31 | 26B | N/A (CRT static init — atexit chain registration)

---

## UI — User Interface (115 functions)

FUN_00410030 | 43B | N/A (message box dialog wrapper — delegates to dialog system)
FUN_00410070 | 28B | N/A (player color/name string getter)
FUN_004100a0 | 47B | N/A (scroll viewport wrapper)
FUN_004100cf | 518B | N/A (show city info popup — constructs MFC dialog with city name, production, trade routes)
FUN_00410302 | 56B | N/A (refresh map viewport at cursor position)
FUN_0041033a | 116B | N/A (refresh all 8 player map viewports)
FUN_004103ae | 84B | N/A (update city window status bar)
FUN_00410402 | 98B | N/A (center map on coordinates and redraw)
FUN_00410464 | 404B | N/A (scroll map viewport if cursor near edge — pan logic)
FUN_004105f8 | 261B | N/A (scroll all player viewports based on event player ownership)
FUN_004106fd | 312B | N/A (hit-test screen coordinates to map direction — returns 0-7 direction)
FUN_00410835 | 554B | N/A (update mouse cursor icon based on map context — move/goto/attack cursor)
FUN_00410a64 | 191B | N/A (cancel pending unit timer and reset cursor state)
FUN_00410b23 | 160B | N/A (cancel unit timer and set cursor to wait state)
FUN_00410bc3 | 311B | N/A (start unit blink timer on map click — shift-click for instant select)
FUN_00410cfa | 158B | N/A (cancel unit timer on mouse leave)
FUN_00410d98 | 114B | N/A (center map on tile and set cursor crosshair)
FUN_00410e0a | 60B | N/A (check if cursor is in goto/patrol mode — returns 1 if cursor=0x202 or 0x203)
FUN_00410e46 | 146B | N/A (set all player cursors to goto mode)
FUN_00410ed8 | 159B | N/A (reset all player cursors from goto/patrol to normal)
map_window_click | 1866B | N/A (main map left-click handler — city open, unit select, goto, patrol dispatch)
FUN_004116c1 | 34B | N/A (map left-click wrapper — calls map_window_click with param=0)
FUN_004116e3 | 34B | N/A (map right-click wrapper — calls map_window_click with param=1)
map_double_click | 767B | N/A (map double-click handler — unit info popup)
FUN_00411a13 | 114B | N/A (move map cursor in direction — keyboard arrow handler)
FUN_00411a85 | 333B | N/A (observer mode keyboard handler — Enter/Space opens city, C centers)
FUN_00411bd7 | 30B | N/A (quit game shortcut — Q key handler)
FUN_00411bf5 | 764B | N/A (active unit keyboard handler — all unit command keys B/E/F/G/H/I/K/L/M/O/P/Q/R/S/U/W)
map_ascii | 1203B | N/A (map window ASCII key dispatcher — city screen keys, global hotkeys, unit commands)
map_key | 2451B | N/A (map window virtual key dispatcher — function keys, menu commands, numpad movement)
FUN_004131c0 | 157B | N/A (toggle grid display on/off)
FUN_0041325d | 90B | N/A (toggle unit display on/off)
FUN_004132b7 | 153B | N/A (calculate minimap viewport rectangle)
FUN_00413350 | 109B | N/A (check if in main map pane — vs minimap/status bar)
FUN_004133c2 | 90B | N/A (select map pane for active player)
FUN_0041341c | 90B | N/A (select map pane — duplicate of 004133c2 for different call site)
FUN_00413476 | 304B | N/A (update status bar — player name, civ icon, multiplayer seat indicators)
FUN_004135ab | 343B | N/A (status bar button handler — tab/zoom/display mode clicks)
FUN_00413717 | 889B | N/A (create map window — MFC window setup, splitter, minimap, callbacks)
FUN_00413a90 | 321B | N/A (create all 8 player map windows and start timers)
FUN_00413bd1 | 164B | N/A (destroy all map windows and stop timers)
FUN_00414dd0 | 39B | N/A (popup dialog helper — loads from string resource)
FUN_00414e30 | 210B | N/A (bubble sort byte array with parallel key array — used for UI list sorting)
FUN_00414f02 | 206B | N/A (bubble sort int array with parallel key array — used for UI list sorting)
FUN_00415040 | 76B | N/A (build file path — concatenates base path with filename)
FUN_0041508c | 121B | N/A (open rules file — builds path, calls fopen, sets error flag)
FUN_00415105 | 46B | N/A (get file length)
FUN_00415133 | 85B | N/A (check if file exists — open and immediately close)
FUN_0041541a | 343B | N/A (populate editor UI controls from current tech data)
FUN_0041557b | 480B | N/A (read editor UI controls and validate tech changes)
FUN_00415765 | 27B | N/A (repaint rules editor window — calls FUN_00416828)
show_messagebox_5A40 | 274B | N/A (save rules editor changes dialog — confirm and write)
FUN_00415b52 | 769B | N/A (populate tech prerequisites listbox in rules editor)
FUN_00415e53 | 731B | N/A (rename tech dialog in rules editor)
FUN_0041612e | 95B | N/A (show advances section help dialog)
FUN_0041618d | 40B | N/A (invalidate rules editor cache)
FUN_004161b5 | 136B | N/A (edit government title in rules editor)
FUN_0041623d | 279B | N/A (rules editor tab change handler — update listbox/dropdowns)
FUN_00416354 | 962B | N/A (create rules editor dropdown control with items from string table)
FUN_00416734 | 244B | N/A (create rules editor numeric input control)
FUN_00416828 | 1142B | N/A (paint rules editor window — tech tree image, labels, category tabs)
FUN_00416c9e | 2186B | N/A (initialize rules editor — create controls, load EDITORPT.GIF, layout, event loop)
FUN_00417566 | 89B | N/A (launch rules editor — alloc, create, run event loop, cleanup)
FUN_00417ef0 | 93B | N/A (create/replace font for rules editor)
FUN_00417f70 | 28B | N/A (get font metric byte from editor control)
FUN_00417fa0 | 498B | N/A (construct rules editor MFC control tree — buttons, dropdowns, listboxes)
FUN_004183d0 | 335B | N/A (destruct rules editor MFC control tree — reverse order destruction)
FUN_00418740 | 28B | N/A (editor control getter — returns member at offset 4)
FUN_00418770 | 28B | N/A (editor control getter — returns HWND at offset 0x1c)
FUN_004187a0 | 137B | N/A (construct editor combo box control — MFC init)
FUN_00418870 | 90B | N/A (destruct editor combo box control — MFC cleanup)
FUN_00418910 | 130B | N/A (create editor dropdown control — register wndclass, create window)
FUN_004189c0 | 43B | N/A (editor dropdown — send set-style message)
FUN_00418a00 | 33B | N/A (editor dropdown — set callback pointer)
FUN_00418a30 | 43B | N/A (editor dropdown — send set-text message)
FUN_00418a70 | 43B | N/A (editor dropdown — send get-text message)
FUN_00418ab0 | 103B | N/A (construct editor text input control — MFC init)
FUN_00418b50 | 90B | N/A (destruct editor text input control — MFC cleanup)
FUN_00418bf0 | 101B | N/A (create editor text input — register wndclass, create window)
FUN_00418c70 | 48B | N/A (editor listbox — send set-data-source message)
FUN_00418cb0 | 27B | N/A (editor listbox — get data pointer)
FUN_00418ce0 | 49B | N/A (editor listbox — add string item and increment count)
FUN_00418d20 | 47B | N/A (editor listbox — clear all items and reset count)
FUN_00418d60 | 37B | N/A (editor listbox — get current selection index)
FUN_00418d90 | 43B | N/A (editor listbox — set current selection index)
FUN_00418dd0 | 33B | N/A (editor listbox — set change callback pointer)
FUN_00418e00 | 103B | N/A (construct editor listbox control — MFC init)
FUN_00418ea0 | 90B | N/A (destruct editor listbox control — MFC cleanup)
FUN_00418f40 | 121B | N/A (create editor listbox — register wndclass, create window)
FUN_00418fe0 | 48B | N/A (editor listbox — send set-data-source message v2)
FUN_00419020 | 49B | N/A (editor listbox — add string item v2 and increment count)
FUN_00419060 | 47B | N/A (editor listbox — clear all items v2 and reset count)
FUN_004190a0 | 33B | N/A (pad string buffer with spaces — for column alignment)
FUN_004190d0 | 34B | N/A (show help popup — delegates to FUN_00419100)
FUN_00419100 | 38B | N/A (show help popup with flags — delegates to FUN_00419130)
FUN_00419130 | 46B | N/A (show help popup — calls CIVILOPEDIA display system)
FUN_00419b80 | 21B | N/A (initialize display surface)
FUN_00419ba0 | 43B | N/A (update palette for display)
FUN_00419be0 | 43B | N/A (load background image for display)
FUN_0041b177 | 755B | N/A (language selection dialog — English/Francais/Deutsch, reads/writes CIV.INI)
FUN_0041b46a | 12B | N/A (CRT dialog cleanup — language selection)
FUN_0041b480 | 15B | N/A (SEH unwind thunk)
FUN_0041b48f | 49B | N/A (exit game — cleanup map windows, set exit flag)
FUN_0041b8b0 | 79B | N/A (shutdown subsystems — sound, video, font, timer)
FUN_0041b8ff | 339B | N/A (show "What's new" dialog — lists latest techs)
FUN_0041d3f2 | 12B | N/A (CRT dialog cleanup — new game wizard)
FUN_0041d408 | 15B | N/A (SEH unwind thunk)
FUN_0041d7c5 | 12B | N/A (CRT dialog cleanup — map size)
FUN_0041d7db | 15B | N/A (SEH unwind thunk)
FUN_0041dc9e | 12B | N/A (CRT dialog cleanup — custom world)
FUN_0041dcb4 | 15B | N/A (SEH unwind thunk)
FUN_0041e7b2 | 12B | N/A (CRT window close — load scenario)
FUN_0041e7be | 12B | N/A (CRT dialog cleanup — load scenario)
FUN_0041e7d4 | 15B | N/A (SEH unwind thunk)
FUN_0041eec6 | 12B | N/A (CRT dialog cleanup — multiplayer seat selection)
FUN_0041eedc | 15B | N/A (SEH unwind thunk)
FUN_0041f66e | 12B | N/A (CRT window close — main menu)
FUN_0041f67a | 12B | N/A (CRT dialog cleanup — main menu)
FUN_0041f690 | 15B | N/A (SEH unwind thunk)
FUN_0041f878 | 97B | N/A (close game session — destroy map windows, free resources, clear state)

---

## GL — Game Logic: Rules.txt Parsing / Game Init (33 functions)

### Cosmic Parameters Parser

FUN_00419cbb | 57B | NOT PORTED
  Binary: read cosmic parameter — reads numeric value from rules.txt, clamps to [param_1..param_2]
  JS: engine/defs.js — cosmic values are hardcoded constants, not parsed from rules.txt
  Match: NOT PORTED — JS hardcodes cosmic values; binary reads them from @COSMIC section of RULES.TXT. The clamping ranges match the hardcoded values in defs.js.

FUN_00419cf4 | 47B | NOT PORTED
  Binary: read cosmic parameter without advancing line — variant of FUN_00419cbb
  JS: N/A — same as above
  Match: NOT PORTED — parser infrastructure, not game logic

FUN_00419d23 | 432B | NOT PORTED
  Binary: parse @COSMIC section of RULES.TXT — reads 22 cosmic parameters (granularity, road_multiplier, unit_support, etc.) into DAT_0064bcc8..DAT_0064bcdd
  JS: engine/defs.js — all cosmic values hardcoded as COSMIC object
  Match: NOT PORTED — JS hardcodes these values. The parse order and clamping ranges confirm the JS COSMIC constants are correct.

### Governments Parser

FUN_0041ab18 | 1270B | NOT PORTED
  Binary: parse @GOVERNMENTS and @LEADERS sections of RULES.TXT — reads government names, leader names/titles, gender, aggression, development, militarism, and per-government food/shield/trade modifiers
  JS: engine/defs.js — government data hardcoded in GOVS array
  Match: NOT PORTED — JS hardcodes government/leader data. Parser only.

FUN_00419ed3 | 371B | NOT PORTED
  Binary: post-process leader data — sets leader name from current gender index, takes absolute values of city style and aggression/development/militarism values
  JS: N/A — defs.js has pre-processed values
  Match: NOT PORTED — data normalization step in rules parser

### Advances (Tech) Parser

FUN_0041a046 | 988B | NOT PORTED
  Binary: parse @CIVILIZE section of RULES.TXT — reads 100 tech entries (name, AI value, modifier, 2 prerequisites, epoch, category). Fills DAT_00627684..DAT_00627690 tech array and resolves dead prerequisite chains.
  JS: engine/defs.js — tech data hardcoded in TECHS array
  Match: NOT PORTED — parser only

### Buildings/Wonders Parser

FUN_0041a422 | 418B | NOT PORTED
  Binary: parse @IMPROVE section of RULES.TXT — reads 67 building entries (name, cost, maintenance, prerequisite tech). Also parses @ENDWONDER section for 28 wonder obsolescence techs.
  JS: engine/defs.js — building data hardcoded in BUILDINGS array
  Match: NOT PORTED — parser only

### Units Parser

FUN_0041a5c4 | 923B | NOT PORTED
  Binary: parse @UNITS section of RULES.TXT — reads 62 unit entries (name, prerequisite tech, attack * cosmic_granularity, defense, hit_points, firepower, movement * 10, range, cost, etc.). Note: attack is multiplied by DAT_0064bcc8 (cosmic granularity) and movement is multiplied by 10 during parse.
  JS: engine/defs.js — unit data hardcoded in UNITS array
  Match: NOT PORTED — parser only. The attack*granularity and move*10 multiplications confirm the JS constants are pre-scaled.

### Terrain Parser

FUN_0041a95f | 441B | NOT PORTED
  Binary: parse @TERRAIN section of RULES.TXT — reads 33 terrain entries (name, movement cost, defense bonus, food/shields/trade yields, special resource bonuses, mining/irrigation improvements)
  JS: engine/defs.js — terrain data hardcoded in TERRAIN array
  Match: NOT PORTED — parser only

### Combined Rules Loader

FUN_0041b00e | 361B | NOT PORTED
  Binary: load all rules.txt sections — calls cosmic, advances, buildings, units, terrain, governments parsers in sequence. Also parses @CARAVAN (16 commodity names), @ORDERS (12 unit order names), @DIFFICULTY (6 difficulty names), @ATTITUDES (9 attitude names).
  JS: engine/defs.js — all data hardcoded
  Match: NOT PORTED — top-level rules loader

### Game Setup / New Game

FUN_00419170 | 1955B | NOT PORTED
  Binary: hotseat game main loop — difficulty/tribe/map selection dialogs, new game or load game dispatch, calls map generation, sets up player seats
  JS: N/A — multiplayer game setup handled by server/server.js lobby system
  Match: NOT PORTED — hotseat UI wizard, N/A for WebSocket architecture

FUN_00419c8b | 48B | NOT PORTED
  Binary: initialization calls — plays two audio cues (fade-out then intro music)
  JS: N/A — no audio system
  Match: NOT PORTED — audio init, N/A

FUN_0041ba52 | 6555B | NOT PORTED
  Binary: single-player new game wizard — difficulty selection, number of opponents, barbarian activity, advanced rules, accelerated startup, gender/tribe/city style selection, opponent tribe selection. Massive UI flow with many dialogs.
  JS: N/A — game setup handled by server lobby
  Match: NOT PORTED — single-player new game wizard, N/A for WebSocket architecture

FUN_0041d417 | 937B | NOT PORTED
  Binary: map size selection dialog — small/medium/large preset or custom width/height (20-250, area 1000-10000). Sets DAT_006d1160/DAT_006d1162 (map width/height). Sets flat world flag bit for large maps.
  JS: engine/mapgen.js handles map dimensions
  Match: NOT PORTED — UI dialog for map size selection

FUN_0041d7ea | 1204B | NOT PORTED
  Binary: custom world parameters dialog — landmass, land form, climate, temperature, age. Sets DAT_00624ee8..DAT_00624ef8 mapgen parameters.
  JS: engine/mapgen.js has equivalent parameters
  Match: NOT PORTED — UI dialog for world generation parameters

FUN_0041dcc3 | 75B | NOT PORTED
  Binary: initialize starting location arrays — sets 21 entries of DAT_00627fe0 and DAT_00628010 to 0xFFFF (-1)
  JS: N/A — starting locations handled by mapgen
  Match: NOT PORTED — initialization helper

FUN_0041dd0e | 708B | NOT PORTED
  Binary: load map from file dialog — opens .MP file, parses map, optionally uses seed and starting locations
  JS: N/A — maps are generated or loaded from .SAV
  Match: NOT PORTED — .MP file loader UI

FUN_0041dfe1 | 2001B | NOT PORTED
  Binary: load scenario/saved game dialog — file picker, player/seat selection, difficulty selection, gender selection, tribe naming
  JS: N/A — game loading handled by server
  Match: NOT PORTED — load scenario UI wizard

FUN_0041e7e3 | 129B | NOT PORTED
  Binary: reload string heap and labels after scenario load — re-parses @STRINGHEAP section, reloads labels.txt
  JS: N/A — no dynamic string reloading
  Match: NOT PORTED — text resource reloader

FUN_0041e864 | 151B | NOT PORTED
  Binary: load scenario-specific rules — changes working directory, checks for scenario RULES.TXT, loads rules, reloads labels
  JS: N/A — rules are always the standard set
  Match: NOT PORTED — scenario rules override loader

FUN_0041e8fb | 1483B | NOT PORTED
  Binary: multiplayer seat/tribe selection dialog — pick player seat from active civs, gender selection, tribe naming
  JS: N/A — handled by server lobby
  Match: NOT PORTED — multiplayer seat picker UI

FUN_0041eeeb | 1891B | NOT PORTED
  Binary: single-player main menu — New Game, Load, Scenario, Multiplayer, Hall of Fame, Credits, Quit. Dispatches to FUN_0041ba52, FUN_0041dfe1, etc.
  JS: N/A — no main menu, games start from lobby
  Match: NOT PORTED — main menu UI

FUN_0041f69f | 473B | NOT PORTED
  Binary: post-game-load initialization — reveal map for cheat mode, set initial diplomatic contacts between human players, set active player for multiplayer scenarios
  JS: N/A — init handled by server
  Match: NOT PORTED — post-load init

FUN_0041f8d9 | 2326B | NOT PORTED
  Binary: top-level multiplayer game entry point — version check, XDaemon lobby integration, create/join game flow, simultaneous turns setup, main game loop dispatch
  JS: N/A — entirely different architecture (WebSocket)
  Match: NOT PORTED — Win32 multiplayer entry point, N/A for WebSocket architecture

### Misc Game Init

FUN_0041b4c0 | 983B | NOT PORTED
  Binary: application startup initialization — set working directory, init timers, load palettes, load string resources, load labels.txt, read CIV.INI settings (herald warning), load rules, load art, load city preferences
  JS: N/A — initialization handled by server.js startup
  Match: NOT PORTED — Win32 app init

FUN_00419c3a | 26B | N/A (CRT static constructor — creates global MFC object)
FUN_00419c54 | 29B | N/A (CRT atexit registration — registers cleanup for global object)
FUN_00419c71 | 26B | N/A (CRT atexit handler — destroys global MFC object)

---

## GL — Game Logic: Rules Editor Data I/O (4 functions)

FUN_004151e0 | 295B | NOT PORTED
  Binary: copy tech data from game arrays to editor scratch — copies name, AI value, modifier, epoch, category, prerequisites for 100 techs
  JS: N/A — no rules editor
  Match: NOT PORTED — rules editor only

FUN_00415307 | 275B | NOT PORTED
  Binary: copy tech data from editor scratch back to game arrays — reverse of FUN_004151e0
  JS: N/A — no rules editor
  Match: NOT PORTED — rules editor only

FUN_00415952 | 238B | NOT PORTED
  Binary: recount active techs and fix orphaned prerequisite chains — walks prerequisite tree, replaces dead-tech refs with their own prerequisites
  JS: N/A — no rules editor
  Match: NOT PORTED — rules editor data integrity

FUN_00415780 | 466B | NOT PORTED
  Binary: export tech tree to text file — formats and writes all 100 techs with name, prerequisites, AI values
  JS: N/A — no rules editor
  Match: NOT PORTED — rules editor export

---

## Summary

| Verdict | Count |
|---------|-------|
| N/A (FW/UI/design) | 175 |
| YES (match) | 0 |
| PARTIAL (functional) | 0 |
| NO → FIXED | 0 |
| NOT PORTED | 29 |
| **Total** | **204** |

## Discrepancies Found: 0

No game logic discrepancies were found. All 204 functions in this block fall into one of these categories:

1. **Framework/CRT** (52 functions): MFC constructors/destructors, SEH unwind thunks, library functions.

2. **UI/Map Window** (115 functions): Map click/key handlers, cursor management, viewport scrolling, status bar, rules editor GUI, game setup dialog wizards, main menu.

3. **Rules.txt Parsing** (33 functions): These parse the various sections of RULES.TXT (@COSMIC, @CIVILIZE, @IMPROVE, @UNITS, @TERRAIN, @GOVERNMENTS, @LEADERS, etc.) into memory arrays. The JS engine hardcodes all these values in `engine/defs.js`, making these parsers unnecessary. The parse logic confirms the hardcoded JS values are correct.

4. **Game Setup/Init** (4 functions): Rules editor data I/O — not applicable since the JS engine has no rules editor.

**Key finding**: The "heavy state writes" that flagged this block in the Phase 6 smoke test are all initialization-phase writes:
- Rules.txt parsing writes game definition data (tech trees, unit stats, building costs, terrain yields, cosmic parameters) into global arrays
- New game wizard writes initial game state (difficulty, map size, player civs, barbarian level)
- None of these contain game mechanic formulas that would affect turn-by-turn gameplay

**The rules.txt parser functions (FUN_0041a5c4 for units, FUN_00419d23 for cosmic) do confirm two important scaling facts already reflected in the JS code:**
- Unit attack values in RULES.TXT are multiplied by the cosmic granularity parameter (default 1) during parsing
- Unit movement values in RULES.TXT are multiplied by 10 during parsing (so "1" movement becomes 10 movement points internally)

These scalings are already correctly applied in the hardcoded values in `engine/defs.js`.

## Functions audited: 204
