# Block 0x0059 Audit (0x00590000–0x0059FFFF)

**Total functions: 157**
**Classification: FW=21, UI=46, GL=18, NET=19, LIB=53**

Legend: FW=Framework/MFC, UI=User Interface/Dialog, GL=Game Logic, NET=Network, LIB=Library/CRT stub

## Function Classifications

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 1 | 0x00590607 | FUN_00590607 | 12 | FW | Thunk → FUN_0059df8a (popup destructor) |
| 2 | 0x0059061D | FUN_0059061d | 15 | FW | SEH epilogue (FS restore) |
| 3 | 0x0059062C | FUN_0059062c | 17963 | GL | **move_unit** — master unit movement handler: terrain cost, ZOC, combat initiation, diplomacy checks, air/sea/land transport, MP realtime sync. Calls combat, expel, diplomacy, visibility. |
| 4 | 0x00594D42 | FUN_00594d42 | 971 | NET | LockMap — multiplayer map tile locking for simultaneous moves |
| 5 | 0x0059511C | FUN_0059511c | 324 | NET | UnlockMap — release map tile lock |
| 6 | 0x00596B00 | FUN_00596b00 | 264 | GL | **spaceship_max_parts** — max allowed spaceship parts by type for a civ, considers SS_FLAG_NUCLEAR |
| 7 | 0x00596C08 | FUN_00596c08 | 89 | GL | spaceship clamp — clamp actual parts to max |
| 8 | 0x00596C61 | FUN_00596c61 | 140 | GL | spaceship sum by category — structural/component/module max totals |
| 9 | 0x00596CED | FUN_00596ced | 79 | GL | spaceship global max — sum of part limits (from DAT tables) |
| 10 | 0x00596D3C | FUN_00596d3c | 202 | GL | spaceship actual count by category — reads actual part counts per civ |
| 11 | 0x00596E06 | FUN_00596e06 | 140 | GL | spaceship effective count by category — clamped actual vs max |
| 12 | 0x00596E92 | FUN_00596e92 | 90 | GL | **spaceship_mass_calc** — progressive mass calculation for parts |
| 13 | 0x00596EEC | FUN_00596eec | 1297 | GL | **recalc_spaceship_stats** — computes success probability, flight time, mass, arrival; stores in civ spaceship data |
| 14 | 0x005973FD | FUN_005973fd | 815 | GL | **launch_spaceship** — marks spaceship launched, triggers diplomacy effects (war/peace/sabotage), sets civ score timer |
| 15 | 0x0059772C | FUN_0059772c | 1567 | UI | Spaceship display dialog — shows stats, parts, probability, buttons |
| 16 | 0x00597D4B | FUN_00597d4b | 12 | FW | Thunk → FUN_0059df8a (popup destructor) |
| 17 | 0x00597D61 | FUN_00597d61 | 14 | FW | SEH epilogue |
| 18 | 0x00597D6F | FUN_00597d6f | 1064 | GL | **ai_spaceship_decide_part** — AI decides which spaceship part type to build next |
| 19 | 0x00598197 | FUN_00598197 | 2111 | GL | **spaceship_build_part** — handles building a new part; increments count, may auto-launch AI ships. Human gets UI choice. |
| 20 | 0x00598A05 | FUN_00598a05 | 324 | GL | **spaceship_check_part_complete** — checks if structural/component/module quota met |
| 21 | 0x00598B4E | FUN_00598b4e | 377 | UI | Spaceships overview dialog — lists all civs with spaceships |
| 22 | 0x00598CC7 | FUN_00598cc7 | 12 | FW | Thunk → FUN_0059df8a (popup destructor) |
| 23 | 0x00598CDD | FUN_00598cdd | 14 | FW | SEH epilogue |
| 24 | 0x00598CEB | FUN_00598ceb | 90 | GL | **can_build_spaceship** — checks if spaceship race enabled (game options check) |
| 25 | 0x00598D45 | FUN_00598d45 | 583 | GL | **ai_should_build_spaceship** — AI evaluates whether to start spaceship production; compares part scores vs rivals |
| 26 | 0x005998B0 | FUN_005998b0 | 66 | GL | spaceship has enough parts — compares actual vs max |
| 27 | 0x00599910 | FUN_00599910 | 132 | GL | spaceship can build category — checks tech prerequisite + availability |
| 28 | 0x005999C0 | FUN_005999c0 | 70 | GL | spaceship category complete — actual >= max |
| 29 | 0x00599A20 | FUN_00599a20 | 365 | UI | Civilopedia tech list — manages list widget for tech items |
| 30 | 0x00599B8D | FUN_00599b8d | 1488 | UI | Civilopedia tech detail renderer — draws tech entry with icon, attributes, description |
| 31 | 0x0059A15D | FUN_0059a15d | 388 | UI | Civilopedia text parser — reads PEDIA section from game.txt, formats description |
| 32 | 0x0059A2E6 | FUN_0059a2e6 | 369 | UI | Civilopedia entry click handler — navigates to entry, updates display |
| 33 | 0x0059A6F0 | FUN_0059a6f0 | 62 | GL | Get/set custom RNG seed |
| 34 | 0x0059A733 | FUN_0059a733 | 94 | GL | **custom_random** — LCG RNG: seed = seed * 0x19660d + 0x3c6ef35f, returns float |
| 35 | 0x0059A791 | FUN_0059a791 | 113 | GL | **custom_random_range** — returns random int in [min,max) using custom RNG |
| 36 | 0x0059A850 | FID_conflict:_$E31 | 26 | LIB | Static initializer (CRT) |
| 37 | 0x0059A86A | FUN_0059a86a | 26 | LIB | CRT init helper |
| 38 | 0x0059A884 | FUN_0059a884 | 29 | LIB | _atexit registration |
| 39 | 0x0059A8A1 | FUN_0059a8a1 | 26 | LIB | atexit callback → FUN_0059ad40 |
| 40 | 0x0059A8BB | FUN_0059a8bb | 196 | NET | NetMgr constructor — sets up XDaemon callbacks (broadcast, secure, connection) |
| 41 | 0x0059A998 | FUN_0059a998 | 936 | NET | NetMgr state reset — zeroes all network session variables, player slots, timers |
| 42 | 0x0059AD40 | FUN_0059ad40 | 136 | NET | NetMgr destructor — frees buffer, disconnects |
| 43 | 0x0059ADC8 | FUN_0059adc8 | 15 | NET | Thunk → FUN_00514254 (net cleanup) |
| 44 | 0x0059ADE1 | FUN_0059ade1 | 14 | FW | SEH epilogue |
| 45 | 0x0059ADEF | FUN_0059adef | 1167 | NET | ConnectToNet — initializes TCP/IPX/Modem/Serial socket connections, sets timeouts from INI |
| 46 | 0x0059B293 | FUN_0059b293 | 691 | NET | DisconnectFromNet — flushes buffer, closes connection, shuts down sockets |
| 47 | 0x0059B55B | FUN_0059b55b | 22 | NET | Empty stub (placeholder for override) |
| 48 | 0x0059B571 | FUN_0059b571 | 651 | NET | Player list manager — manages sorted linked list of connected players |
| 49 | 0x0059B7FC | FUN_0059b7fc | 366 | NET | AddClient — adds new client to player slot |
| 50 | 0x0059B96A | FUN_0059b96a | 390 | NET | RemoveClient — removes client from slot, clears human mask |
| 51 | 0x0059BAF0 | FUN_0059baf0 | 100 | NET | Free player list — walks linked list and deletes all nodes |
| 52 | 0x0059BB54 | FUN_0059bb54 | 237 | NET | BroadcastReceiveFunc — validates broadcast packets (magic 0x66606660) |
| 53 | 0x0059BC41 | FUN_0059bc41 | 884 | NET | SecureReceiveFunc — validates secure packets, logs errors, hex dumps bad packets |
| 54 | 0x0059BFB5 | FUN_0059bfb5 | 38 | NET | NewClientReceiveFunc callback — logs new client connection |
| 55 | 0x0059BFDB | FUN_0059bfdb | 112 | NET | ConnectedToServerFunc callback — stores server connection, sends join msg |
| 56 | 0x0059C04B | FUN_0059c04b | 89 | NET | LostConnectionFunc callback — increments disconnect counter |
| 57 | 0x0059C0A4 | FUN_0059c0a4 | 61 | NET | OversizedMessageCB — logs oversized XDaemon message |
| 58 | 0x0059C0E1 | FUN_0059c0e1 | 405 | NET | Build network message — constructs header + payload buffer for XDaemon |
| 59 | 0x0059C276 | FUN_0059c276 | 66 | NET | Reset message counters (169 slots) |
| 60 | 0x0059C2B8 | FUN_0059c2b8 | 73 | NET | Reset connection lost counters (7 slots) |
| 61 | 0x0059C301 | FUN_0059c301 | 30 | FW | Poll network (thunk → 0047e94e) |
| 62 | 0x0059C31F | FUN_0059c31f | 598 | NET | Build game info packet — fills struct with game version, settings, player names, map size |
| 63 | 0x0059C575 | FUN_0059c575 | 762 | GL | **record_combat_log** — records combat event (unit type, attacker, defender, civ names) into circular log buffer per player |
| 64 | 0x0059D080 | FUN_0059d080 | 209 | FW | Popup message struct constructor — zeroes fields, sets size=0x118 |
| 65 | 0x0059D190 | FUN_0059d190 | 26 | LIB | Static initializer pair |
| 66 | 0x0059D1AA | FUN_0059d1aa | 32 | LIB | CRT init — thunk_FUN_0043c4c0(0,0x10,1) |
| 67 | 0x0059D1CA | FUN_0059d1ca | 29 | LIB | _atexit registration |
| 68 | 0x0059D1E7 | FUN_0059d1e7 | 26 | LIB | atexit callback → FUN_0043c520 |
| 69 | 0x0059D201 | FID_conflict:_$E51 | 26 | LIB | Static initializer pair |
| 70 | 0x0059D21B | FUN_0059d21b | 30 | LIB | CRT init — thunk_FUN_0043c460(0,0x10) |
| 71 | 0x0059D239 | FUN_0059d239 | 29 | LIB | _atexit registration |
| 72 | 0x0059D256 | FUN_0059d256 | 26 | LIB | atexit callback → FUN_0043c520 |
| 73 | 0x0059D270 | FID_conflict:_$E51 | 26 | LIB | Static initializer pair |
| 74 | 0x0059D28A | FUN_0059d28a | 30 | LIB | CRT init — thunk_FUN_0043c460(1,0xe) |
| 75 | 0x0059D2A8 | FUN_0059d2a8 | 29 | LIB | _atexit registration |
| 76 | 0x0059D2C5 | FUN_0059d2c5 | 26 | LIB | atexit callback → FUN_0043c520 |
| 77 | 0x0059D2DF | FID_conflict:_$E51 | 26 | LIB | Static initializer pair |
| 78 | 0x0059D2F9 | FUN_0059d2f9 | 30 | LIB | CRT init — thunk_FUN_0043c460(0,0x10) |
| 79 | 0x0059D317 | FUN_0059d317 | 29 | LIB | _atexit registration |
| 80 | 0x0059D334 | FUN_0059d334 | 26 | LIB | atexit callback → FUN_0043c520 |
| 81 | 0x0059D34E | FUN_0059d34e | 21 | FW | Thunk → FUN_0059d363 |
| 82 | 0x0059D363 | FUN_0059d363 | 26 | FW | Restore popup stack pointer (DAT_006cec84 = DAT_00635a58) |
| 83 | 0x0059D37D | FUN_0059d37d | 26 | FW | Set popup timestamp |
| 84 | 0x0059D397 | FUN_0059d397 | 26 | FW | Set popup timestamp (duplicate) |
| 85 | 0x0059D3B1 | FUN_0059d3b1 | 24 | FW | Set popup background graphic source |
| 86 | 0x0059D3C9 | FUN_0059d3c9 | 24 | FW | Set popup parent window |
| 87 | 0x0059D3E1 | FUN_0059d3e1 | 32 | FW | Set popup position (x,y) |
| 88 | 0x0059D401 | FUN_0059d401 | 129 | FW | Load popup labels from PEDIA text |
| 89 | 0x0059D487 | FUN_0059d487 | 88 | FW | Set popup color scheme (9 color params) |
| 90 | 0x0059D4DF | FUN_0059d4df | 72 | FW | Set popup drawing colors (7 brush/pen params) |
| 91 | 0x0059D527 | FUN_0059d527 | 24 | FW | Set popup font pointer |
| 92 | 0x0059D53F | FUN_0059d53f | 24 | FW | Set popup font pointer 2 |
| 93 | 0x0059D557 | FUN_0059d557 | 24 | FW | Set popup font pointer 3 |
| 94 | 0x0059D56F | FUN_0059d56f | 46 | FW | Set popup font defaults |
| 95 | 0x0059D59D | FUN_0059d59d | 24 | FW | Set popup tile/bg image |
| 96 | 0x0059D5B5 | FUN_0059d5b5 | 64 | FW | Init popup memory pool (reset + alloc 9 items) |
| 97 | 0x0059D5F5 | FUN_0059d5f5 | 1299 | FW | Popup init — initializes all popup widget fields, sizes, margins, columns, list data |
| 98 | 0x0059DB08 | FUN_0059db08 | 93 | FW | Popup create — calls init, sets flags |
| 99 | 0x0059DB65 | FUN_0059db65 | 1061 | FW | Popup destroy — frees all child widgets (scrollbars, listboxes, edit fields, images) |
| 100 | 0x0059DF8A | FUN_0059df8a | 47 | FW | Popup teardown — calls destroy + frees memory pool |
| 101 | 0x0059DFB9 | FUN_0059dfb9 | 306 | FW | Popup setup — configures from parameters, sets widget sizes and scaling |
| 102 | 0x0059E0EB | FUN_0059e0eb | 160 | FW | Popup set item text by ID |
| 103 | 0x0059E18B | FUN_0059e18b | 412 | FW | Popup add text line — allocates, parses ^/^^ prefix, links in list |
| 104 | 0x0059E327 | FUN_0059e327 | 47 | FW | Popup check flag 0x80 |
| 105 | 0x0059E356 | FUN_0059e356 | 32 | FW | Return constant 0x20 (icon size) |
| 106 | 0x0059E376 | FUN_0059e376 | 132 | FW | Calculate list item height |
| 107 | 0x0059E3FA | FUN_0059e3fa | 78 | FW | Get effective row height |
| 108 | 0x0059E448 | FUN_0059e448 | 42 | FW | Get edit field height (text + 10) |
| 109 | 0x0059E472 | FUN_0059e472 | 50 | FW | Set popup font and recalc line height |
| 110 | 0x0059E4A4 | SetObjectSchema | 33 | LIB | CArchive::SetObjectSchema (MFC) |
| 111 | 0x0059E4C5 | FUN_0059e4c5 | 33 | FW | Set popup field at offset 0x10 |
| 112 | 0x0059E4E6 | FUN_0059e4e6 | 33 | FW | Set popup field at offset 0x38 (column count) |
| 113 | 0x0059E507 | FUN_0059e507 | 126 | FW | Set popup column width + calculate item width |
| 114 | 0x0059E585 | FUN_0059e585 | 68 | FW | Set active tab (0 or 1) |
| 115 | 0x0059E5C9 | FUN_0059e5c9 | 91 | FW | Set popup list mode (columns, listbox param) |
| 116 | 0x0059E624 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs (MFC) |
| 117 | 0x0059E648 | FUN_0059e648 | 46 | FW | Get button area height |
| 118 | 0x0059E676 | FUN_0059e676 | 51 | FW | Get button width for text |
| 119 | 0x0059E6A9 | FUN_0059e6a9 | 86 | FW | Set popup title string |
| 120 | 0x0059E6FF | FUN_0059e6ff | 99 | FW | Set popup max width (scaling) |
| 121 | 0x0059E762 | delbuf | 33 | LIB | ios::delbuf (MFC/iostream) |
| 122 | 0x0059E783 | FUN_0059e783 | 42 | FW | Set popup x,y offsets |
| 123 | 0x0059E7AD | FUN_0059e7ad | 101 | FW | Find list item by ID |
| 124 | 0x0059E812 | FUN_0059e812 | 101 | FW | Find edit field by index |
| 125 | 0x0059E877 | FUN_0059e877 | 100 | FW | Find button by command ID |
| 126 | 0x0059E8DB | FUN_0059e8db | 76 | FW | Set/clear item bit 0x01 (enable) |
| 127 | 0x0059E927 | FUN_0059e927 | 76 | FW | Set/clear item bit 0x02 (visible) |
| 128 | 0x0059E973 | FUN_0059e973 | 64 | FW | Clear all items bit 0x01 |
| 129 | 0x0059E9B3 | FUN_0059e9b3 | 64 | FW | Clear all items bit 0x02 |
| 130 | 0x0059E9F3 | FUN_0059e9f3 | 90 | FW | Check item bit 0x04 (selected) |
| 131 | 0x0059EA4D | FUN_0059ea4d | 76 | FW | Set/clear item bit 0x04 |
| 132 | 0x0059EA99 | FUN_0059ea99 | 116 | FW | Set current selection by ID |
| 133 | 0x0059EB0D | FUN_0059eb0d | 53 | FW | Popup helper — calls 0x00418a70 (set result string) |
| 134 | 0x0059EB42 | FUN_0059eb42 | 38 | FW | Popup set result (wrapper) |
| 135 | 0x0059EB68 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 136 | 0x0059EB8C | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 137 | 0x0059EBB0 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 138 | 0x0059EBD4 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 139 | 0x0059EBF8 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 140 | 0x0059EC1C | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 141 | 0x0059EC40 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 142 | 0x0059EC64 | EnableStackedTabs | 36 | LIB | CPropertySheet::EnableStackedTabs |
| 143 | 0x0059EC88 | FUN_0059ec88 | 360 | FW | Popup add button — allocates, links, measures, updates max width |
| 144 | 0x0059EDF0 | FUN_0059edf0 | 566 | FW | Popup add list item — inserts into sorted/unsorted linked list |
| 145 | 0x0059F026 | FUN_0059f026 | 71 | FW | Popup add checkbox item (list + check flag) |
| 146 | 0x0059F06D | FUN_0059f06d | 566 | FW | Popup add edit field — allocates, measures, copies default text |
| 147 | 0x0059F2A3 | FUN_0059f2a3 | 119 | FW | Popup add action button string (max 6) |
| 148 | 0x0059F31A | FUN_0059f31a | 189 | UI | Popup set text color — selects color by shadow/highlight/active state |
| 149 | 0x0059F3D7 | FUN_0059f3d7 | 226 | UI | Popup render text with shadow — replaces '_' with spaces, draws shadow+main |
| 150 | 0x0059F5BA | FUN_0059f5ba | 61 | UI | Popup draw text at Y offset |
| 151 | 0x0059F5F7 | FUN_0059f5f7 | 83 | FW | Check if any text item has negative param (needs word-wrap) |
| 152 | 0x0059F64A | FUN_0059f64a | 1326 | UI | Popup word-wrap renderer — breaks text lines to fit width, handles centering |
| 153 | 0x0059FB78 | FUN_0059fb78 | 156 | FW | Get list item index within same-tab items |
| 154 | 0x0059FC19 | FUN_0059fc19 | 156 | FW | Get list item by index within active tab |
| 155 | 0x0059FCBA | FUN_0059fcba | 56 | FW | Get row from item (index / columns) |
| 156 | 0x0059FCF2 | FUN_0059fcf2 | 56 | FW | Set list to row (row * columns) |
| 157 | 0x0059FD2A | FUN_0059fd2a | 4785 | UI | **Popup layout engine** — computes all widget positions, sizes, scrollbars, buttons, columns, list areas, centers on screen |

## GL Functions vs JS Engine

### FUN_0059062c — move_unit (17,963 bytes)

This is the master unit movement function. It handles:
- Movement point cost calculation (terrain-based, road/rail, river crossing)
- ZOC (zone of control) checking via FUN_00594d42 (LockMap in MP)
- Combat initiation (land, sea, air, city attack)
- Diplomat/spy actions (expel, bribe, sabotage)
- Carrier/transport loading/unloading
- Allied territory repair
- Paradrop landing detection
- Trireme sinking chance
- Air unit range/fuel exhaustion and death
- Visibility updates, fog-of-war tile reveals
- Multiplayer synchronization (realtime move locking, broadcast to all players)

**JS comparison**: `engine/movement.js` handles movement cost and basic rules. `engine/combat.js` handles combat. `engine/reducer.js` dispatches MOVE_UNIT actions. The binary's single monolithic function is split across multiple JS modules.

**Discrepancies found**:
1. **Allied repair**: Binary deducts movement points when moving into allied territory with healing (HP/10, doubled by airport). JS does not implement allied territory repair during movement.
2. **Paradrop landing dialog**: Binary shows a LANDFALL confirmation dialog when a carrier approaches enemy coast. JS has no equivalent.
3. **Trireme sinking**: Binary checks `DAT_0064bcc8` (COSMIC param) and has Nuclear flag halving the survival chance. JS `spaceship.js` uses a different constant; movement.js does not handle trireme sinking at all.
4. **Spy auto-bribe on enter**: Binary automatically triggers diplomacy when a spy/diplomat enters an enemy city tile. JS dispatches a separate DIPLOMACY action.
5. **Multiplayer tile locking**: Binary has LockMap/UnlockMap (FUN_00594d42/FUN_0059511c) for simultaneous move support. JS uses server-authoritative model without tile locking.

### FUN_00596B00–FUN_00599910 — Spaceship system (11 functions)

These form the complete spaceship logic: part limits, stat calculation, launch, AI decision-making.

**JS comparison**: `engine/spaceship.js` ports FUN_00596eec and FUN_005973fd directly. The comment in spaceship.js explicitly references these functions.

**Discrepancies found**:
1. **SS_FLAG_NUCLEAR modifier**: Binary (FUN_00596eec) reduces success probability by 3/4 when nuclear flag is set (`bVar1 & 8` → `local_c = (int)(local_c * 3) >> 2`). JS spaceship.js mentions NUCLEAR flag but the implementation may differ in detail.
2. **AI spaceship decision (FUN_00597d6f, FUN_00598197)**: Complex AI logic for choosing which category to build, when to launch, comparing arrival times vs rivals. JS has no AI spaceship logic (AI is separate).
3. **FUN_00598d45 (ai_should_build_spaceship)**: Evaluates space race viability by comparing part scores with weighted multipliers. Not in JS.

### FUN_0059A733/FUN_0059A791 — Custom RNG

Binary uses an LCG with multiplier 0x19660d and addend 0x3c6ef35f, returning float10 / 0xffffffff.

**JS comparison**: `engine/rng.js` implements the game's RNG. The constants should match — this is worth verifying but the RNG in JS was ported from a different function (the standard _rand).

### FUN_0059C575 — record_combat_log

Records combat events into a per-player circular buffer (300 entries, 0x22 bytes each). Stores unit type, coordinates, defender civ name. JS does not maintain a persistent combat log.

**No JS equivalent found.**

## Summary

- **18 GL functions** identified: movement, spaceship (11 functions), combat log, custom RNG (2 functions), x-wrap utility
- **19 NET functions**: All relate to XDaemon multiplayer networking (TCP/IPX/modem/serial). Not applicable to JS WebSocket architecture.
- **46 UI functions**: Popup dialog framework (Franklinton Popup system), Civilopedia display, spaceship dialog
- **21 FW functions**: MFC framework, SEH handlers, popup infrastructure
- **53 LIB functions**: CRT stubs, _atexit, EnableStackedTabs, static initializers

**Key discrepancies for JS engine**:
1. Allied territory repair during movement (not implemented in JS)
2. Trireme sinking during movement (not in JS movement.js)
3. Combat log recording (no JS equivalent)
4. AI spaceship decision logic (3 functions, not in JS)
5. Custom RNG (FUN_0059a733) uses different constants than standard _rand — verify JS rng.js matches
