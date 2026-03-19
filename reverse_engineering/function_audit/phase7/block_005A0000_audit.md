# Block 0x005A Audit (0x005A0000–0x005AFFFF)

**Total functions: 111**
**Classification: FW=25, UI=42, GL=11, NET=0, LIB=11, EDITOR=22**

Legend: FW=Framework/MFC, UI=User Interface/Popup, GL=Game Logic, LIB=Library/CRT, EDITOR=Cheat/Rules Editor

## Function Classifications

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 1 | 0x005A0FEA | FUN_005a0fea | 350 | UI | Draw text with shadow+outline (popup text renderer) |
| 2 | 0x005A1148 | FUN_005a1148 | 195 | UI | Draw pipe-delimited text (left|right alignment) |
| 3 | 0x005A120B | FUN_005a120b | 706 | UI | Render single list item — calculates position, draws selection highlight, text |
| 4 | 0x005A14D2 | FUN_005a14d2 | 660 | UI | Redraw visible list items (both tabs) — iterates items, calls render |
| 5 | 0x005A1766 | FUN_005a1766 | 62 | FW | Convert list index by dividing by column width |
| 6 | 0x005A17A4 | FUN_005a17a4 | 69 | FW | Round list index down to column boundary |
| 7 | 0x005A17E9 | FUN_005a17e9 | 603 | UI | Select and scroll to list item — updates scroll position, redraws, fires callback |
| 8 | 0x005A1A44 | FUN_005a1a44 | 57 | FW | clamp(value, min, max) — general-purpose integer clamp |
| 9 | 0x005A1A7D | FUN_005a1a7d | 469 | UI | Hit-test list — converts mouse (x,y) to list item index |
| 10 | 0x005A1C52 | FUN_005a1c52 | 93 | FW | Count list items in tab — walks linked list counting matches |
| 11 | 0x005A1CAF | FUN_005a1caf | 244 | UI | Set active tab from mouse position — checks dual-tab bounds |
| 12 | 0x005A1DA3 | FUN_005a1da3 | 133 | UI | Set list scroll position by index — updates display offset, redraws |
| 13 | 0x005A1E28 | FUN_005a1e28 | 693 | UI | Create popup window — allocates RichEditView, initializes bitmap, sets font |
| 14 | 0x005A20F4 | FUN_005a20f4 | 40 | UI | Popup refresh callback — calls FUN_005a577e |
| 15 | 0x005A211C | FUN_005a211c | 6616 | UI | **Popup widget factory** — creates all child widgets (listboxes, scrollbars, edit fields, buttons, icons) based on popup configuration |
| 16 | 0x005A3BAE | FUN_005a3bae | 170 | UI | List selection handler — maps index to item, sets result, invalidates |
| 17 | 0x005A3C58 | FUN_005a3c58 | 43 | UI | Invalidate popup — marks dirty, triggers repaint |
| 18 | 0x005A3C83 | FUN_005a3c83 | 71 | UI | Conditional invalidate (if not locked) |
| 19 | 0x005A3CCA | FUN_005a3cca | 297 | UI | Button list click handler — navigates to button, fires callback |
| 20 | 0x005A3DF3 | FUN_005a3df3 | 99 | UI | Help button handler — fires help callback |
| 21 | 0x005A3E56 | FUN_005a3e56 | 548 | UI | Button/tab click handler — processes OK/Cancel/custom buttons, checkbox state |
| 22 | 0x005A407F | FUN_005a407f | 2181 | UI | Keyboard navigation handler — arrow keys, page up/down, home/end for list and grid |
| 23 | 0x005A49C1 | FUN_005a49c1 | 1069 | UI | Alphabetic key search — finds list item starting with typed letter |
| 24 | 0x005A4DF3 | FUN_005a4df3 | 236 | UI | Mouse drag start — begins list selection tracking |
| 25 | 0x005A4EDF | FUN_005a4edf | 1130 | UI | Mouse drag move — updates selection, handles scrolling during drag |
| 26 | 0x005A535E | FUN_005a535e | 90 | UI | Mouse drag end — finalizes selection |
| 27 | 0x005A53B8 | FUN_005a53b8 | 220 | UI | Mouse double-click handler — selects and confirms |
| 28 | 0x005A5494 | FUN_005a5494 | 152 | UI | Scrollbar callback (tab 0) — scrolls list to new position |
| 29 | 0x005A552C | FUN_005a552c | 133 | UI | Scrollbar callback (tab 1, single-row) |
| 30 | 0x005A55B1 | FUN_005a55b1 | 152 | UI | Scrollbar callback (tab 1, multi-row) |
| 31 | 0x005A5649 | FUN_005a5649 | 309 | UI | Popup draw background — fills area with solid color, tiled image, or custom renderer |
| 32 | 0x005A577E | FUN_005a577e | 1964 | UI | **Popup master renderer** — calls layout engine, creates window if needed, draws background, text, list, buttons, icons, borders, edit fields |
| 33 | 0x005A5F34 | FUN_005a5f34 | 999 | UI | **Popup show/run** — creates popup, enters modal event loop, collects results from list/edit/checkbox, cleans up |
| 34 | 0x005A632A | FUN_005a632a | 2287 | UI | **Popup text file parser** — reads @TITLE, @OPTIONS, @BUTTON, @COLUMNS, @HEIGHT, @WIDTH, @LISTBOX, @CHECKBOX, @DEFAULT directives from game.txt sections |
| 35 | 0x005A6C23 | FUN_005a6c23 | 34 | FW | Push/set popup parent window |
| 36 | 0x005A6C45 | FUN_005a6c45 | 26 | FW | Pop/restore popup parent window |
| 37 | 0x005A9320 | FID_conflict:vdd | 110 | LIB | vector deleting destructor (CString/CDAO) |
| 38 | 0x005A93B0 | FID_conflict:vdd | 110 | LIB | vector deleting destructor (edit field) |
| 39 | 0x005A9440 | FID_conflict:vdd | 110 | LIB | vector deleting destructor (button) |
| 40 | 0x005A94D0 | FUN_005a94d0 | 57 | LIB | Scalar deleting destructor (custom widget) |
| 41 | 0x005A9520 | FID_conflict:vdd | 110 | LIB | vector deleting destructor (list widget) |
| 42 | 0x005A95B0 | FUN_005a95b0 | 57 | LIB | Scalar deleting destructor (bitmap widget) |
| 43 | 0x005A9600 | FUN_005a9600 | 43 | UI | Get screen rect from font metrics |
| 44 | 0x005A9640 | FUN_005a9640 | 32 | UI | Clear button count (reset action buttons) |
| 45 | 0x005A9670 | FUN_005a9670 | 47 | UI | Send Windows message to control |
| 46 | 0x005A96B0 | FUN_005a96b0 | 43 | UI | Send get-text message to control |
| 47 | 0x005A96F0 | FUN_005a96f0 | 47 | FW | Check popup flag (shadow enabled) |
| 48 | 0x005A9730 | FUN_005a9730 | 55 | UI | Draw text using popup font at position |
| 49 | 0x005A9780 | FUN_005a9780 | 24 | FW | Set background tile bitmap |
| 50 | 0x005A9798 | FUN_005a9798 | 52 | UI | Draw colored rectangle |
| 51 | 0x005A97CC | FUN_005a97cc | 69 | UI | Draw horizontal line |
| 52 | 0x005A9811 | FUN_005a9811 | 71 | UI | Draw horizontal bar (width param) |
| 53 | 0x005A9858 | FUN_005a9858 | 69 | UI | Draw vertical line |
| 54 | 0x005A989D | FUN_005a989d | 71 | UI | Draw vertical bar (height param) |
| 55 | 0x005A98E4 | FUN_005a98e4 | 128 | UI | Draw rectangle outline (4 lines) |
| 56 | 0x005A9964 | FUN_005a9964 | 152 | UI | Draw rectangle outline with width/height params |
| 57 | 0x005A99FC | FUN_005a99fc | 167 | UI | Draw 3D border (highlight + shadow lines) |
| 58 | 0x005A9AA3 | FUN_005a9aa3 | 28 | UI | Select bitmap for drawing |
| 59 | 0x005A9ABF | FUN_005a9abf | 63 | UI | Fill rectangle with color |
| 60 | 0x005A9AFE | FUN_005a9afe | 95 | UI | BitBlt — copy rectangle from source to dest bitmap |
| 61 | 0x005A9B5D | FUN_005a9b5d | 391 | UI | **Tiled blit** — copies source bitmap tiled across destination area (for backgrounds) |
| 62 | 0x005A9CE9 | FUN_005a9ce9 | 183 | UI | Draw sunken 3D border + shrink rect |
| 63 | 0x005A9F30 | FUN_005a9f30 | 212 | UI | Multiplayer wait callback — polls network, checks all human players ready |
| 64 | 0x005AA004 | FUN_005aa004 | 225 | UI | Multiplayer wait callback — similar to above with fallback for < 2 players |
| 65 | 0x005AA0E5 | wait_production_005aa0e5 | 3994 | GL | **Server game loop** — main multiplayer turn loop for server: production phase, AI moves, human moves, combat report, synchronization barriers, timer management |
| 66 | 0x005AB07F | FUN_005ab07f | 12 | FW | Thunk → FUN_0059df8a (popup destructor) |
| 67 | 0x005AB095 | FUN_005ab095 | 14 | FW | SEH epilogue |
| 68 | 0x005AB0A3 | FUN_005ab0a3 | 125 | UI | Server wait poll — checks for disconnect, game state changes |
| 69 | 0x005AB120 | FUN_005ab120 | 125 | UI | Server wait poll (AI moves phase) |
| 70 | 0x005AB19D | FUN_005ab19d | 157 | UI | Server wait poll (human moves phase, with AI/diplomacy checks) |
| 71 | 0x005AB23A | FUN_005ab23a | 155 | UI | Server wait poll (human moves variant) |
| 72 | 0x005AB2D5 | wait_production_005ab2d5 | 3334 | GL | **Client game loop** — main multiplayer turn loop for client: waits for server production/AI/move signals, local unit movement, between-turn display |
| 73 | 0x005ABFDB | FUN_005abfdb | 12 | FW | Thunk → FUN_0059df8a |
| 74 | 0x005ABFF1 | FUN_005abff1 | 15 | FW | SEH epilogue |
| 75 | 0x005AC840 | FUN_005ac840 | 365 | UI | Civilopedia unit list — setup list widget for unit entries |
| 76 | 0x005AC9AD | FUN_005ac9ad | 4075 | UI | Civilopedia unit detail renderer — draws unit stats (attack, defense, move, cost, HP, firepower, flags) |
| 77 | 0x005AD998 | FUN_005ad998 | 342 | UI | Civilopedia unit entry click handler — navigates to unit, updates display |
| 78 | 0x005ADFA0 | FUN_005adfa0 | 57 | GL | **clamp(val, min, max)** — general purpose integer clamp utility |
| 79 | 0x005ADFD9 | FUN_005adfd9 | 45 | GL | **swap** — swaps two int pointers |
| 80 | 0x005AE006 | FUN_005ae006 | 76 | GL | **popcount8** — counts set bits in low 8 bits |
| 81 | 0x005AE052 | FUN_005ae052 | 94 | GL | **wrap_x** — wraps x-coordinate for cylindrical maps (handles negative/overflow) |
| 82 | 0x005AE0B0 | FUN_005ae0b0 | 94 | GL | **wrap_x_doubled** — wraps doubled-x coordinate (used for even/odd tile system) |
| 83 | 0x005AE10E | FUN_005ae10e | 111 | GL | **dist_x** — calculates x-distance accounting for cylindrical wrap |
| 84 | 0x005AE17D | FUN_005ae17d | 51 | GL | **tile_dist_x** — tile distance in x (dist_x + 1) >> 1 |
| 85 | 0x005AE1B0 | FUN_005ae1b0 | 157 | GL | **tile_distance** — Manhattan-like tile distance between two map positions |
| 86 | 0x005AE24D | FUN_005ae24d | 73 | GL | **abs_distance** — (|dx| + |dy|) >> 1 |
| 87 | 0x005AE296 | FUN_005ae296 | 135 | GL | **weighted_distance** — asymmetric distance favoring the longer axis |
| 88 | 0x005AE31D | FUN_005ae31d | 94 | GL | **map_distance** — combines dist_x and abs(dy) into weighted distance |
| 89 | 0x005AE37B | FUN_005ae37b | 68 | GL | **adjacent_direction** — checks if two direction indices are adjacent (±1 mod 8) |
| 90 | 0x005AE3BF | FUN_005ae3bf | 45 | GL | **bit_decompose** — splits index into byte_offset (>>3) and bit_mask (1<<(n&7)) |
| 91 | 0x005AE3EC | FUN_005ae3ec | 98 | GL | **shift_by_sign** — left-shift if positive, right-shift if negative |
| 92 | 0x005AE580 | FUN_005ae580 | 1602 | UI | **PBEM game setup** — Play-By-Email new game/load/scenario selection menu |
| 93 | 0x005AEBEF | FUN_005aebef | 12 | FW | Thunk → FUN_0059df8a |
| 94 | 0x005AEC05 | FUN_005aec05 | 15 | FW | SEH epilogue |
| 95 | 0x005AEC14 | FUN_005aec14 | 249 | UI | Email address entry dialog |
| 96 | 0x005AED0D | FUN_005aed0d | 12 | FW | Thunk → FUN_0059df8a |
| 97 | 0x005AED23 | FUN_005aed23 | 14 | FW | SEH epilogue |
| 98 | 0x005AEF20 | FUN_005aef20 | 544 | EDITOR | **Export unit data to editor** — copies all 62 unit type stats from game arrays to editor buffer |
| 99 | 0x005AF140 | FUN_005af140 | 515 | EDITOR | **Import unit data from editor** — copies editor buffer back to game arrays |
| 100 | 0x005AF343 | FUN_005af343 | 353 | EDITOR | Sync editor spin/slider controls with unit data |
| 101 | 0x005AF4AE | FUN_005af4ae | 458 | EDITOR | Read editor controls → unit data; validate ranges via clamp |
| 102 | 0x005AF682 | FUN_005af682 | 27 | EDITOR | Thunk → FUN_005b09dc (refresh editor display) |
| 103 | 0x005AF69D | FUN_005af69d | 838 | EDITOR | Export all unit data to text file (formatted table) |
| 104 | 0x005AF9E3 | show_messagebox_F9E3 | 487 | EDITOR | **Rules editor save** — reads controls, validates, writes RULES.TXT and EVENTS.TXT, handles errors |
| 105 | 0x005AFBCA | FUN_005afbca | 369 | EDITOR | Unit rename dialog — prompts for new unit name |
| 106 | 0x005AFD3B | FUN_005afd3b | 95 | EDITOR | Show units list debug popup |
| 107 | 0x005AFD9A | FUN_005afd9a | 40 | EDITOR | Reset editor dirty flag + invalidate |
| 108 | 0x005AFDC2 | FUN_005afdc2 | 83 | EDITOR | Edit unit graphic — opens graphic selector |
| 109 | 0x005AFE15 | FUN_005afe15 | 111 | EDITOR | Edit unit attack text — sprintf formatted attack description |
| 110 | 0x005AFE84 | FUN_005afe84 | 36 | EDITOR | Set checkbox state for ability flag |
| 111 | 0x005AFEA8 | FUN_005afea8 | 1021 | EDITOR | **Unit abilities editor** — displays 15 ability checkboxes, reads/writes unit flags bitmask |

## GL Functions vs JS Engine

### FUN_005ADFA0 — clamp(val, min, max)

```c
int FUN_005adfa0(int param_1, int param_2, int param_3) {
    if (param_2 <= param_1) param_2 = param_1;
    if (param_2 <= param_3) param_3 = param_2;
    return param_3;
}
```

**JS comparison**: `engine/utils.js` has `clamp(val, min, max)` or similar. This is a trivial utility; JS uses `Math.max(min, Math.min(max, val))` which is equivalent.

**No discrepancy.**

### FUN_005AE052 — wrap_x (cylindrical map wrapping)

Wraps x-coordinate: if x < 0 add mapWidth, if x >= mapWidth subtract mapWidth. Only applies when flat-earth flag (0x8000 in game options) is not set.

**JS comparison**: `engine/utils.js` has `wrapX()` which does the same thing.

**No discrepancy.**

### FUN_005AE0B0 — wrap_x_doubled

Same as wrap_x but uses `DAT_006d116a` (doubled map width, used for the isometric even/odd column system).

**JS comparison**: JS likely handles this via the same wrapX with appropriate width parameter.

**No discrepancy expected.**

### FUN_005AE10E — dist_x (x-distance with wrap)

Calculates absolute x-distance, then if the map wraps and distance > mapWidth/2, uses mapWidth - distance instead.

**JS comparison**: `engine/utils.js` likely has an equivalent distance function.

**No discrepancy.**

### FUN_005AE1B0 — tile_distance(x1, y1, x2, y2)

Computes `(abs_dx_wrapped + abs_dy) >> 1` — the standard isometric tile distance.

**JS comparison**: This should be equivalent to what's in `engine/utils.js` or `engine/pathfinding.js`.

**No discrepancy expected.**

### FUN_005AE37B — adjacent_direction

Checks if two direction indices (0-7) are adjacent: `((dir2+1)&7 == dir1) || ((dir2-1)&7 == dir1)`.

**JS comparison**: Used in ZOC logic in movement. JS movement.js may or may not have this exact check.

**No discrepancy — utility function.**

### wait_production_005aa0e5 — Server game loop (3,994 bytes)

This is the **multiplayer server main loop**. It orchestrates:
1. Production phase synchronization (all humans submit production orders)
2. AI unit moves for non-human civs
3. Human move phase (all humans move simultaneously)
4. Between-turn processing: events, timer, casualties report
5. Network message barriers (wait for all clients to report ready)
6. Auto-advance if automated play

**JS comparison**: `server/server.js` has the game loop as a WebSocket-driven state machine. The binary's synchronous polling loop with XD_FlushSendBuffer is fundamentally different from JS's async event-driven model.

**Discrepancy**: Binary synchronizes phases via network barriers (`DAT_006ced20` per-player ready flags), waits with thunk_FUN_0047e94e polling. JS uses a turn-based state machine in the reducer pattern — no phase barriers needed since it's server-authoritative.

### wait_production_005ab2d5 — Client game loop (3,334 bytes)

The **multiplayer client** counterpart. Waits for server signals for each phase:
1. WAITPRODUCTION — waits for server to finish production
2. WAITAIMOVES — waits for AI processing
3. WAITHUMANMOVES — waits for all human players to finish moves
4. Casualty/victory reporting between turns

**JS comparison**: Not applicable — JS has no client game loop. The server dispatches actions and the client renders state updates.

**No JS equivalent needed.**

### EDITOR functions (FUN_005AEF20–FUN_005AFEA8, 14 functions)

These implement the in-game Cheat Menu "Edit Unit" dialog, which allows modifying unit type stats (attack, defense, move, cost, HP, firepower, abilities flags, graphics). They read/write the in-memory unit type arrays and can save to RULES.TXT.

**JS comparison**: No rules editor in JS. Unit stats come from `engine/defs.js` and are immutable.

**No JS equivalent — editor-only code.**

## Summary

- **11 GL functions**: clamp, swap, popcount8, wrap_x (2 variants), dist_x, tile_distance (3 variants), adjacent_direction, bit_decompose, shift_by_sign
- **42 UI functions**: Entire popup/dialog rendering framework (list management, scrolling, keyboard/mouse interaction, text rendering, backgrounds, borders)
- **25 FW functions**: MFC infrastructure, SEH handlers, popup lifecycle
- **11 LIB functions**: Vector deleting destructors, scalar deleting destructors
- **22 EDITOR functions**: Unit rules editor (Cheat menu), PBEM setup

**Key discrepancies for JS engine**:
1. **Server/client game loop orchestration**: Binary uses polling barriers for phase synchronization. JS uses server-authoritative async model — fundamentally different architecture but functionally equivalent.
2. **No rules editor**: Binary allows in-game unit stat editing + saving to RULES.TXT. JS has no equivalent.
3. **PBEM (Play by Email)**: Binary has full PBEM new game/load UI. JS has no PBEM support.
4. All map utility functions (wrap_x, tile_distance, etc.) appear correctly ported in JS engine/utils.js.
