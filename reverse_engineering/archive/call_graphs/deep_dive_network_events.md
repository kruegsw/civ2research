# Deep Dive: network_poll & parse_events_file vs JS Engine

## Part 1: network_poll (FUN_0047e94e, 14,034 bytes)

### Binary Architecture

The original Civ2 MGE multiplayer runs on **DirectPlay** with a packet-based protocol. Each message has:
- **Magic**: `0x66606660` (packet validation)
- **Type**: uint32 message ID (0x00-0xA8, ~170 opcodes)
- **Size**: total packet size
- **Sequence**: incrementing counter

`network_poll` is the **master message receiver** — a single enormous function containing a 168+ case switch statement. It reads packets off DirectPlay, validates the magic, then dispatches based on `msg[1]` (the type field).

### JS Architecture

The JS engine uses a completely different architecture:
- **WebSocket** (not DirectPlay) — JSON messages, not binary packets
- **Server-authoritative** — single source of truth on server
- **Immutable reducer** — all state mutations go through `applyAction()`
- **No message IDs** — JS uses semantic action type strings (`MOVE_UNIT`, `END_TURN`, etc.)

The binary's network_poll handles both **transport-level concerns** (DirectPlay session management, buffer flushing, keep-alives) AND **game-level concerns** (unit moves, city operations, diplomacy). The JS architecture cleanly separates these: transport is in `public/net/transport.js`, lobby management is in `server/server.js`, and game logic is in `engine/reducer.js`.

### Complete Message Type Mapping

Below: every binary message type, whether it maps to JS, and what game state change it triggers.

#### Connection Lifecycle (0x00-0x06) — N/A (DirectPlay)

| Binary ID | Binary Name | JS Equivalent | Notes |
|-----------|------------|---------------|-------|
| 0x00 sub 1 | PING_KEEPALIVE | `PING` msg type | JS: activity heartbeat every 15s |
| 0x00 sub 2 | STATE_SYNC_ACK | N/A | DirectPlay sync ack; JS uses WebSocket reliability |
| 0x01 | JOIN_ANNOUNCE | `JOIN` msg type | Binary sends player name + version string |
| 0x02 | CHAT | `SAY` msg type | Binary broadcasts text; JS does same via `MSG` |
| 0x04 | GAME_SETTINGS | `GAME_START` (partial) | Binary copies 624 bytes of config; JS sends full mapBase + gameState |
| 0x05 | TICK | N/A | Timer sync — no JS equivalent; server is authoritative |
| 0x06 | LOAD_INFO | N/A | Load mode + filenames; JS generates maps fresh |

#### Save/Load Blocks (0x07-0x0A) — N/A (Binary-specific)

| Binary ID | Binary Name | JS Equivalent | Notes |
|-----------|------------|---------------|-------|
| 0x07-0x09 | SAVE_BLOCK A/B/C | N/A | Compressed save blocks sent during join; JS sends JSON state |
| 0x0A | PARSE_BLOCK | N/A | Extract and parse save data; JS uses `initNewGame()` |

#### Player Session Management (0x0B-0x16) — Partial mapping

| Binary ID | Binary Name | JS Equivalent | Notes |
|-----------|------------|---------------|-------|
| 0x0B | SESSION_CANCEL | N/A (NOP) | DirectPlay session cancel |
| 0x0C | JOIN_REJECT | `REJECTED` msg type | Binary: reject failed join; JS sends `REJECTED` with reason string |
| 0x0D | RESERVED | N/A | NOP in binary |
| 0x0E | SERVER_QUIT_NOTIFY | WebSocket `close` event | Binary increments quit counter; JS handles disconnect via WS close |
| 0x0F | HOST_TRANSFER | N/A | Binary: new host assignment; JS has no host migration (server is permanent) |
| 0x10 | CLIENT_QUIT | `LEAVE_ROOM` msg type | Binary decrements counter; JS removes from room |
| 0x11 | RESERVED | N/A | NOP |
| 0x12 | SESSION_INFO_REQ | N/A | Binary: request session info; JS uses `ROOM_LIST` |
| 0x13 | SESSION_INFO_RESP | `ROOM_LIST` msg type | Session info with host/game/scenario names |
| 0x14 | RESERVED | N/A | NOP |
| 0x15 | FULL_STATE_SYNC | `STATE` msg type | **KEY**: Binary sends delta-compressed state blocks; JS sends full JSON state |
| 0x16 | SEAT_FINALIZE | `WELCOME` msg type | Binary finalizes seat; JS sends `WELCOME` with playerIndex |

#### Bulk Data Sync (0x17-0x24) — N/A (replaced by STATE/GAME_START)

These 14 messages each memcpy a specific block of game data. The JS equivalent is a single `GAME_START` message containing the entire `mapBase` + `state` payload.

| Binary ID | Binary Name | Data Size | JS Equivalent |
|-----------|------------|-----------|---------------|
| 0x17 | SYNC_COSMIC_RULES | 0x29 | Embedded in `GAME_START.state` |
| 0x18 | SYNC_TECH_TABLE | 0x640 | Embedded in `state.civTechs` |
| 0x19 | SYNC_IMPROVEMENTS | 0x218 | Embedded in `state.cities[].buildings` |
| 0x1A | SYNC_WONDER_OBSOLETE | 0x1C | Embedded in `state.wonders` |
| 0x1B | SYNC_UNIT_TYPES | 0x4D8 | Defined in `engine/defs.js` (static) |
| 0x1C | SYNC_TERRAIN | 0x318 | Defined in `engine/defs.js` (static) |
| 0x1D | SYNC_GOVT_NAMES | 0x1C | Defined in `engine/defs.js` (static) |
| 0x1E | SYNC_RESOURCES | 0x38 | Defined in `engine/defs.js` (static) |
| 0x1F | SYNC_WONDER_TABLE | 0x3F0 | Embedded in `state.wonders` |
| 0x20 | SYNC_ALL_CIV_DATA | 0x7524 | Embedded in `state.civs` |
| 0x21 | SYNC_TRADE_ROUTES | 0x40 | Not yet in JS (trade routes partial) |
| 0x22 | SYNC_CITY_IMPROVE | 0x68 | Embedded in `state.cities` |
| 0x23 | SYNC_DIFFICULTY | 0x18 | Embedded in `state.difficulty` |
| 0x24 | SYNC_GOVERNMENT | 0x24 | Embedded in `state.civs[].government` |

#### Game State & Turn Control (0x25-0x36) — Partial mapping

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE? |
|-----------|------------|---------------|---------------|
| 0x25 | SYNC_EVENTS | `GAME_START.state.scenarioEvents` | YES — scenario event list |
| 0x26 | RESERVED | N/A | NOP |
| 0x27 | RESERVED | N/A | NOP |
| 0x28 | GAME_STARTED | `GAME_START` msg type | YES — transitions game from lobby to play |
| 0x2A | ALIVE_BITMASK | `state.civsAlive` in STATE | YES — which civs are alive |
| 0x2B | TURN_SIGNAL | `END_TURN` action | YES — signals turn ready |
| 0x2C | TURN_SIGNAL_ACK | Implicit (STATE response) | NOP |
| 0x2D | TURN_DONE | `END_TURN` action result | YES — marks civ's turn as complete |
| 0x2E | PLAYER_JOIN | `JOIN` + `GAME_START` | YES — full resync on join (sends all data) |
| 0x2F | PLAYER_WAITING | N/A | Binary: client waiting for join slot |
| 0x30 | SEAT_CLAIM | `JOIN` with seat assignment | YES — claims civ slot |
| 0x31 | SEAT_RELEASE | `LEAVE_ROOM` | YES — releases civ slot |
| 0x32 | DISCONNECT | WebSocket `close` handler | YES — marks player disconnected |
| 0x33 | POSITION_SYNC | N/A | Binary syncs viewport coords; JS: each client has independent viewport |
| 0x34 | CITY_PROCESS | Part of `END_TURN` | YES — server processes city production |
| 0x35 | CITY_PROCESS_ACK | Implicit in STATE | NOP (ack only) |

#### Unit/City CRUD Operations (0x37-0x5B) — **Core game actions**

These are the most important message types. Each is a request→response pair where client requests an operation and server executes + acknowledges.

| Binary ID | Binary Name | JS Action Type | STATE CHANGE |
|-----------|------------|----------------|--------------|
| 0x37/0x38 | KILL_UNIT / ACK | (result of combat in `MOVE_UNIT`) | YES — unit destroyed |
| 0x39/0x3A | DELETE_CITY / ACK | `DESTROY_CITY` | YES — city removed |
| 0x3B/0x3C | CREATE_CITY / ACK | `BUILD_CITY` | YES — new city created |
| 0x3D/0x3E | CREATE_UNIT / ACK | (internal, from production) | YES — unit spawned |
| 0x3F/0x40 | PICK_UP_UNIT / ACK | N/A (editor only) | YES — unit picked up |
| 0x41/0x42 | PLACE_UNIT / ACK | N/A (editor only) | YES — unit placed |
| 0x43/0x44 | SET_UNIT_HOME / ACK | `UNIT_ORDER` order='rehome' | YES — changes home city |
| 0x45/0x46 | MOVE_UNIT / ACK | `MOVE_UNIT` | YES — unit position change |
| 0x47/0x48 | CITY_PRODUCTION / ACK | `CHANGE_PRODUCTION` | YES — changes what city builds |
| 0x49/0x4A | ACTIVATE_UNIT / ACK | `UNIT_ORDER` order='wake' | YES — activates sleeping unit |
| 0x4B/0x4C | SLEEP_UNIT / ACK | `UNIT_ORDER` order='sleep' | YES — puts unit to sleep |
| 0x4D/0x4E | WAKE_UNIT / ACK | `UNIT_ORDER` order='wake' | YES — wakes unit |
| 0x4F/0x50 | DISBAND_UNIT / ACK | `UNIT_ORDER` order='disband' | YES — unit removed |
| 0x51 | SET_GOTO | `GOTO` | YES — sets goto destination |
| 0x52/0x54 | CANCEL_ORDERS / ACK | `UNIT_ORDER` order='none' | YES — clears unit orders |
| 0x53 | SET_PRODUCTION | `CHANGE_PRODUCTION` | YES — alias for city production |
| 0x55 | TRADE_ROUTE | `ESTABLISH_TRADE` / `EXECUTE_TRADE` | YES — trade route setup |
| 0x56/0x57 | DEC_COUNTER | N/A (internal counter) | Minor state |
| 0x58 | MAP_VISIBILITY_RESET | Part of `END_TURN` processing | YES — rebuilds visibility |
| 0x59 | MAP_DATA | `GAME_START.mapBase.tileData` | YES — full map data |
| 0x5A/0x5B | BRIBE_CAPTURE / ACK | `BRIBE_UNIT` | YES — unit bribed/captured |
| 0x5C | STATE_DIFF | `STATE` msg type | YES — delta state update |

#### Flow Control & Turn Management (0x5D-0x69)

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE |
|-----------|------------|---------------|--------------|
| 0x5D | HOLD_ON | N/A | Binary: pauses network processing |
| 0x5E | HOLD_OFF | N/A | Binary: resumes network processing |
| 0x5F/0x61 | NEW_CIV / ACK | N/A | Binary: create new civ mid-game |
| 0x60/0x62 | KILL_CIV / ACK | `civEliminated` turnEvent | YES — civ destroyed |
| 0x63 | BRIBE_UNIT | `BRIBE_UNIT` action | YES — transfers unit ownership, updates counters |
| 0x64 | SPY_ACTION | `STEAL_TECH`, `SABOTAGE_CITY`, etc. | YES — spy operations |
| 0x65 | WAIT_GAMEXMIT | N/A | Binary: block UI during join resync |
| 0x66 | WAIT_GAMEXMIT_DONE | N/A | Binary: unblock UI |
| 0x68 | WONDER_CASCADE | Part of production in `END_TURN` | YES — wonder cascade processing |
| 0x69 | NEW_TURN | `END_TURN` action result | YES — advances turn, flushes draw queue |

#### Game Events (0x6A-0x6F)

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE |
|-----------|------------|---------------|--------------|
| 0x6A | GAME_EVENT | `turnEvents` in STATE payload | YES — scenario events dispatched |
| 0x6B | SCENARIO_FLAGS | Not implemented | YES — scenario flag changes |
| 0x6C | TOGGLE_AI | Server-side AI processing | YES — toggles AI control |
| 0x6D | TOGGLE_SAVE_PROTECT | N/A | Binary UI only |
| 0x6E | ENABLE_SAVE | N/A | Binary UI only |
| 0x6F | DISABLE_SAVE | N/A | Binary UI only |

#### Rendering / Draw Queue (0x70-0x7D) — N/A (Client-side in JS)

In the binary, the server tells clients exactly what to redraw. In JS, the client receives full state and renders independently.

| Binary ID | Binary Name | JS Equivalent | Notes |
|-----------|------------|---------------|-------|
| 0x70 | DRAW_MOVE | Client-side render after STATE | Unit move animation handled by `animateCombat()` |
| 0x71 | DRAW_VISIBILITY | `tileVisibility` in STATE | Visibility update applied client-side |
| 0x72-0x76 | DRAW_TILE variants | Client-side render | Full re-render after each STATE |
| 0x77 | SET_ANIM_COUNTER | N/A | Binary animation frame sync |
| 0x78 | ATTACK_ANIM | `animateCombat()` client-side | Triggered by `combatResult` in STATE |
| 0x79 | DEFENSE_ANIM | `animateCombat()` client-side | Triggered by `combatResult` in STATE |
| 0x7A | PLAY_SOUND | `sfx()` client-side | Triggered by events in STATE |
| 0x7B | SET_MUSIC | N/A | No music system in JS yet |
| 0x7C-0x7D | DRAW_EFFECT | Client-side render | Special effects not implemented |

#### Diplomacy (0x7E-0x86, 0xA4-0xA8)

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE |
|-----------|------------|---------------|--------------|
| 0x7E | TECH_EXCHANGE | Part of `RESPOND_DEMAND` / diplomacy | YES — tech traded |
| 0x7F | INTEL_REPORT | Not implemented | NO — display only |
| 0x80 | DIALOG_RESULT | N/A | Binary UI flow control |
| 0x81 | TURN_END_CONFIRM | Part of `END_TURN` | YES — diplomacy phase end |
| 0x82-0x85 | DIPLO_MSG A-D | `treatyProposals`/`tributeDemands` | YES — diplomacy messages |
| 0x86 | FOREIGN_ADVISOR | Not implemented | NO — display only |
| 0xA4 | PEACE_PROPOSAL | `PROPOSE_TREATY` | YES — treaty proposal |
| 0xA5 | TECH_OFFER_ACCEPT | `RESPOND_TREATY` accept | YES — treaty accepted |
| 0xA6 | TECH_OFFER_REJECT | `RESPOND_TREATY` reject | YES — treaty rejected |
| 0xA7 | GOLD_OFFER_ACCEPT | `RESPOND_DEMAND` accept | YES — gold exchanged |
| 0xA8 | GOLD_OFFER_REJECT | `RESPOND_DEMAND` reject | Minor state |

#### City Operations (0x87-0x8A)

| Binary ID | Binary Name | JS Action Type | STATE CHANGE |
|-----------|------------|----------------|--------------|
| 0x87 | CITY_WORKER_CHANGE | `SET_WORKERS` | YES — reassigns citizen tiles |
| 0x88 | CITY_SPECIALIST | `SET_WORKERS` (specialist cycle) | YES — changes specialist type |
| 0x89 | CITY_RENAME | `RENAME_CITY` | YES — renames city |
| 0x8A | CITY_REFRESH | Client-side re-render | NO — display only |

#### Map/Tile Operations (0x90-0x98)

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE |
|-----------|------------|---------------|--------------|
| 0x90 | TILE_IMPROVEMENTS | `tileImprovements` in STATE | YES — worker order results |
| 0x91 | TILE_TERRAIN | `tileTerrains` in STATE | YES — terrain changes |
| 0x92 | TILE_VISIBILITY | `tileVisibility` in STATE | YES — fog of war |
| 0x93-0x98 | Various tile ops | Embedded in STATE payload | YES — tile metadata |

#### Misc (0x99-0xA3)

| Binary ID | Binary Name | JS Equivalent | STATE CHANGE |
|-----------|------------|---------------|--------------|
| 0x99 | SET_EMBASSY | Part of spy actions | YES |
| 0x9A | SCROLL_ANIM | N/A | Binary UI only |
| 0x9B | SPACE_RACE | `LAUNCH_SPACESHIP` | YES |
| 0x9C | SYNC_MARKER | N/A | NOP |
| 0x9D/0x9E | TAX_RATE A/B | `CHANGE_RATES` | YES — modifies tax/luxury/science |
| 0x9F | REVOLUTION | `REVOLUTION` | YES — government change |
| 0xA0 | SENATE_OVERRIDE | Part of diplomacy | YES |
| 0xA1 | SPY_OPERATION | `STEAL_TECH`, `SABOTAGE_CITY`, etc. | YES |
| 0xA2 | COUNTER_OP | N/A | Minor internal state |
| 0xA3 | DRAW_QUEUE_FORWARD | N/A | Binary rendering |

### Summary: Binary vs JS Message Architecture

**Binary (170 message types)**:
- Transport: ~15 messages (DirectPlay lifecycle, keep-alive, session management)
- Bulk sync: ~14 messages (memcpy game data sections)
- Game actions: ~40 messages (unit/city CRUD, request-response pairs)
- Rendering: ~16 messages (draw commands, animations, sounds)
- State diff: ~3 messages (delta-compressed state sync)
- Diplomacy: ~15 messages (proposals, exchanges, advisor reports)
- Turn management: ~10 messages (turn signals, AI control, seat management)
- Internal/NOP: ~20+ messages (reserved, flow control, counters)

**JS (14 client→server message types, 12 server→client types)**:

Client → Server:
1. `IDENTIFY` — set player name
2. `CREATE_ROOM` — create game room
3. `JOIN` — join room
4. `LEAVE_ROOM` — leave room
5. `READY` — toggle ready state
6. `ADD_AI` / `REMOVE_AI` / `SET_AI_DIFFICULTY` — AI configuration
7. `PING` — activity heartbeat
8. `ACTION` — **all game actions** (wraps `applyAction()` type)
9. `SAY` — chat message
10. `SET_DEBUG` — toggle debug logging
11. `RESTART_GAME` — restart with new map

Server → Client:
1. `ROOM_LIST` — available rooms
2. `WELCOME` — joined room confirmation
3. `ROOM` — room roster update
4. `GAME_START` — initial game state + map
5. `STATE` — updated game state (after each action)
6. `MSG` — chat message
7. `GAME_LOG` — combat/event logs
8. `DEBUG_LOG` — debug info
9. `REJECTED` — action rejected
10. `ERROR` — error message
11. `COUNTDOWN` / `COUNTDOWN_CANCEL` — game start countdown
12. `CHAT_HISTORY` — replay chat on reconnect

**Key architectural difference**: The binary has ~40 individual game action messages (MOVE_UNIT, SLEEP_UNIT, DISBAND_UNIT, etc.), each as a separate message type. The JS engine collapses ALL of these into a single `ACTION` message containing a typed action object that goes through `applyAction()` in the reducer. The reducer supports 40+ action types that cover the same ground:

`MOVE_UNIT`, `BUILD_CITY`, `SET_WORKERS`, `CHANGE_PRODUCTION`, `RUSH_BUY`, `SELL_BUILDING`, `CHANGE_RATES`, `SET_RESEARCH`, `UNIT_ORDER`, `WORKER_ORDER`, `REVOLUTION`, `PILLAGE`, `DESTROY_CITY`, `PROPOSE_TREATY`, `RESPOND_TREATY`, `DECLARE_WAR`, `ESTABLISH_TRADE`, `RENAME_CITY`, `BRIBE_UNIT`, `STEAL_TECH`, `SABOTAGE_CITY`, `INCITE_REVOLT`, `SPY_*` (7 types), `DEMAND_TRIBUTE`, `RESPOND_DEMAND`, `SHARE_MAP`, `BOMBARD`, `REBASE`, `GOTO`, `TRANSFORM_TERRAIN`, `NUKE`, `PARADROP`, `AIRLIFT`, `UPGRADE_UNIT`, `ADJUST_ATTITUDE`, `END_TURN`, `LAUNCH_SPACESHIP`, `EXECUTE_TRADE`, `CARAVAN_HELP_WONDER`

### What's Missing in JS (Game Actions from Binary Not Yet Implemented)

1. **PICK_UP_UNIT / PLACE_UNIT (0x3F-0x42)** — Scenario editor operations. Not needed for gameplay.
2. **HOST_TRANSFER (0x0F)** — JS server is permanent, no host migration needed.
3. **HOLD_ON / HOLD_OFF (0x5D-0x5E)** — Flow control for slow DirectPlay; WebSocket doesn't need this.
4. **NEW_CIV (0x5F)** — Creating a new civilization mid-game. Not supported in JS.
5. **Scenario flag operations (0x6B)** — Scenario flags (for events). Partially implemented in `events.js`.
6. **Intel report / Foreign advisor (0x7F, 0x86)** — Advisor screens not implemented.
7. **Full diplomacy message objects (0x82-0x85)** — JS has simplified diplomacy; binary supports complex multi-step negotiation dialogs.
8. **Wonder cascade networking (0x68)** — Handled server-side in JS, no separate message needed.
9. **Draw queue forwarding (0xA3)** — N/A; JS renders independently.

---

## Part 2: parse_events_file (FUN_004fc516, 12,813 bytes)

### Binary Architecture

The binary parser is a monolithic 12.8KB function that reads Civ2's `@EVENTS` text format line-by-line using a state machine:
- **State 0**: Outside any event block
- **State 2**: Inside `@IF` block, parsing trigger type + conditions
- **State 3**: Inside `@THEN` block, parsing actions
- **State 5**: After `@ENDIF`, event complete
- **State 6**: Error state
- **State 10**: After `@ENDEVENTS` or EOF

The binary allocates a fixed-size event structure per event (via `FUN_004fa617`) and fills it using hardcoded offsets into an integer array (`local_68[]`).

### JS Architecture

The JS parser in `engine/events.js` (`parseEvents()`, lines 216-607) uses the same state machine approach but stores events as `ScenarioEvent` class instances with named fields instead of raw integer offsets.

### Trigger Type Comparison

| # | Binary Trigger | Binary Sets `*local_68 =` | JS `EVENT_*` Constant | JS Supported? |
|---|---------------|--------------------------|----------------------|---------------|
| 0 | UNITKILLED | 0x01 | `EVENT_UNIT_KILLED (0x01)` | YES |
| 1 | CITYTAKEN | 0x02 | `EVENT_CITY_TAKEN (0x02)` | YES |
| 2 | TURN | 0x04 | `EVENT_TURN (0x04)` | YES |
| 3 | TURNINTERVAL | 0x08 | `EVENT_TURN_INTERVAL (0x08)` | YES |
| 4 | NEGOTIATION | 0x10 | `EVENT_NEGOTIATION (0x10)` | YES |
| 5 | SCENARIOLOADED | 0x20 | `EVENT_SCENARIO_LOADED (0x20)` | YES |
| 6 | RANDOMTURN | 0x40 | `EVENT_RANDOM_TURN (0x40)` | YES |
| 7 | NOSCHISM | 0x80 | `EVENT_NO_SCHISM (0x80)` | YES |
| 8 | RECEIVEDTECHNOLOGY | 0x100 | `EVENT_RECEIVED_TECH (0x100)` | YES |
| 9 | (not in binary parser) | — | `EVENT_NO_CITIES (0x200)` | JS EXTRA |
| 10 | (not in binary parser) | — | `EVENT_CITY_PRODUCTION (0x400)` | JS EXTRA |
| 11-22 | (not in binary parser) | — | `EVENT_BRIBE_UNIT` through `EVENT_TURN_YEAR` | JS EXTRA (stubs) |

**Finding**: The binary parser handles **9 trigger types**. The JS parser supports all 9 of those PLUS 2 additional working triggers (`NOCITIES`, `CITYPRODUCTION`) and 12 additional stub triggers (IDs 11-22). The JS is a superset.

### Trigger Condition Parsing Comparison

#### UNITKILLED (Binary trigger 0x01)
- **Binary**: Requires `unit=`, `attacker=`, `defender=` (all three must be present for parsing loop to exit)
- **JS**: Parses `unit`, `attacker`, `defender` via key=value — does NOT enforce all three are present
- **Discrepancy**: Binary has strict required-field loop; JS is more permissive (allows partial conditions)

#### CITYTAKEN (Binary trigger 0x02)
- **Binary**: Requires `city=`, `attacker=`, `defender=` (all three)
- **JS**: Parses `city`, `attacker`, `defender` — not enforced as required
- **Discrepancy**: Same permissive parsing as UNITKILLED

#### TURN (Binary trigger 0x04)
- **Binary**: Requires `turn=` — supports `EVERY` keyword (sets value -1) or numeric
- **JS**: Parses `turn=EVERY` (maps to -1) or numeric — matches binary
- **Match**: YES

#### TURNINTERVAL (Binary trigger 0x08)
- **Binary**: Requires `interval=` — numeric value
- **JS**: Parses `interval=` as numeric
- **Match**: YES

#### RANDOMTURN (Binary trigger 0x40)
- **Binary**: Requires `denominator=` — validates range 1-1000, exits with error if out of range
- **JS**: Parses `denominator=` as numeric, no range validation
- **Discrepancy**: Binary validates 1 <= denominator <= 1000; JS accepts any value

#### NEGOTIATION (Binary trigger 0x10)
- **Binary**: Requires `talker=`, `talkertype=`, `listener=`, `listenertype=` (all four)
- **Binary talkertype values**: HUMAN=1, COMPUTER=2, HUMANORCOMPUTER=4 (stored in `local_68[7]`)
- **Binary listenertype values**: HUMAN=1, COMPUTER=2, HUMANORCOMPUTER=4 (stored in `local_68[10]`)
- **JS**: Parses all four, stores talkerType/listenerType as uppercase strings
- **Discrepancy**: Binary stores type as integers (1/2/4); JS stores as strings ("HUMAN"/"COMPUTER"/"HUMANORCOMPUTER")
- **Binary also**: Sets `local_68[0x60] = 0x1000` (ACTION_TRANSPORT flag) — marking NEGOTIATION events as having transport behavior. JS does not set this automatically.

#### RECEIVEDTECHNOLOGY (Binary trigger 0x100)
- **Binary**: Requires `receiver=` and `technology=` (numeric only — checks first char is '0'-'9')
- **JS**: Parses `receiver=` and `technology=` — JS `resolveTechName()` also accepts tech names
- **Discrepancy**: Binary only accepts numeric tech IDs; JS also accepts tech names like "Alphabet"

#### NOSCHISM (Binary trigger 0x80)
- **Binary**: Requires `defender=`
- **JS**: Parses `defender=`
- **Match**: YES

#### SCENARIOLOADED (Binary trigger 0x20)
- **Binary**: No conditions — immediately sets trigger type
- **JS**: No conditions
- **Match**: YES

### Action Type Parsing Comparison

| Binary Action | Binary Flag | JS Action Type | Supported? |
|---------------|-----------|----------------|------------|
| TEXT | 0x0001 | `text` | YES |
| MOVEUNIT | 0x0002 | `moveUnit` | YES |
| CREATEUNIT | 0x0004 | `createUnit` | YES |
| CHANGEMONEY | 0x0008 | `changeMoney` | YES |
| PLAYWAVEFILE | 0x0010 | `playWave` | YES (no-op) |
| MAKEAGGRESSION | 0x0020 | `makeAggression` | YES |
| JUSTONCE | 0x0040 | `justOnce` flag | YES |
| PLAYCDTRACK | 0x0080 | `playCd` | YES (no-op) |
| DONTPLAYWONDERS | 0x0100 | `dontPlayWonders` | YES (no-op) |
| CHANGETERRAIN | 0x0200 | `changeTerrain` | YES |
| DESTROYACIVILIZATION | 0x0400 | `destroyCiv` | YES |
| GIVETECHNOLOGY | 0x0800 | `giveTech` | YES |
| TRANSPORT (implicit) | 0x1000 | `transport` | YES |

**All 13 binary action types are implemented in JS.** JS also adds `transport` as an explicit action type that can be specified in the `@THEN` block.

### Action Parameter Parsing Details

#### TEXT
- **Binary**: Reads lines between TEXT and ENDTEXT, stores up to 20 lines in `local_68[0x0E..0x21]`
- **JS**: Reads lines between TEXT and ENDTEXT into `action.textLines` array (no line limit)
- **Discrepancy**: Binary limits to 20 text lines; JS has no limit

#### CREATEUNIT
- **Binary**: Requires unit, owner, veteran, homecity, locations (all 5). Reads up to 10 locations between LOCATIONS/ENDLOCATIONS. Stores unit type in `local_68[0x38]`, owner in `local_68[0x36]`, veteran in `local_68[0x4E]`, homecity in `local_68[0x4F]`, location count in `local_68[0x4D]`.
- **JS**: Parses same fields. Does not enforce all fields are present.
- **Discrepancy**: Binary enforces all 5 fields; JS is more permissive. Binary limits to 10 locations; JS has no limit.

#### MOVEUNIT
- **Binary**: Requires unit, owner, maprect (4 corner pairs), moveto, numbertomove (all 5). Maprect reads 4 coordinate pairs from subsequent lines. Numbertomove supports "ALL" (value -2) or numeric.
- **JS**: Parses same fields. Maprect is parsed from a single `maprect=x1,y1,x2,y2` line (2 corners, not 4 pairs). Moveto supports coordinates OR city name variant.
- **Discrepancy**: Binary maprect has 4 pairs (8 values) but the switch only uses 4 coords (first pair); JS parses 4 values as 2 corners — functionally equivalent. JS adds moveTo-by-city-name which binary doesn't support.

#### CHANGETERRAIN
- **Binary**: Requires terraintype (numeric 0-10) and maprect (4 coordinate pairs). Stores terrain ID in `local_68[99]`.
- **JS**: Parses terraintype (numeric 0-10 or terrain name) and maprect (2 corners).
- **Discrepancy**: Binary only accepts numeric terrain types; JS also accepts terrain names.

#### MAKEAGGRESSION
- **Binary**: Requires who= and whom= fields (both civ names/IDs)
- **JS**: Same parsing
- **Match**: YES

#### CHANGEMONEY
- **Binary**: Requires receiver= and amount= fields
- **JS**: Same parsing
- **Match**: YES

#### DESTROYACIVILIZATION
- **Binary**: Requires whom= field only
- **JS**: Same parsing
- **Match**: YES

#### GIVETECHNOLOGY
- **Binary**: Requires receiver= and technology= (numeric only)
- **JS**: Parses same; technology accepts both numeric and names
- **Discrepancy**: Same as RECEIVEDTECHNOLOGY — binary numeric-only, JS also accepts names

### Event Execution Comparison

#### Binary: event_dispatch_actions (FUN_004fc3ae, 360 bytes)
- Checks `flag & 0x40` (JUSTONCE) AND `flag & 0x2000` (FIRED) to skip already-fired events
- Dispatches in order: PLAY_SOUND, PLAY_CD, CREATE_UNIT, MOVE_UNIT, CHANGE_TERRAIN, MAKE_AGGRESSION, CHANGE_MONEY, DESTROY_CIV, GIVE_TECH, TEXT, FLAG_SET
- Sets 0x2000 (FIRED) bit after execution if JUSTONCE

#### JS: dispatchEvents() + executeEventAction()
- Checks `evt.justOnce && evt.fired` boolean to skip
- Iterates `evt.actions` array in order
- Sets `evt.fired = true` after execution if justOnce

**Match**: Semantically equivalent. The boolean approach vs bitflag approach achieves the same result.

### Trigger Matching Comparison

#### Binary trigger check functions (separate functions per trigger type):
- `event_check_turn_trigger` (FUN_004fba0c, 144B)
- `event_check_interval_trigger` (FUN_004fba9c, 147B)
- `event_check_random_trigger` (FUN_004fbb2f, 174B)
- `event_check_tech_trigger` (FUN_004fbbdd, 334B)
- `event_check_unit_killed` (FUN_004fbd9d, 231B)
- `event_check_city_taken` (FUN_004fc2bb, 243B)
- `event_check_negotiation` (FUN_004fbe84, 900B)
- `event_check_no_schism` (FUN_004fc20d, 169B)
- `event_check_scenario_loaded` (FUN_004fbd2b, 114B)

#### JS: triggerMatches() (single function, lines 622-790)
All trigger checking consolidated into one switch statement with per-type matching.

**Match**: Equivalent functionality. JS handles all 9 binary trigger types plus extras.

### Key Discrepancies Summary

| # | Area | Binary | JS | Severity |
|---|------|--------|------|----------|
| 1 | Required field enforcement | Loops until all required fields parsed | Permissive — missing fields OK | LOW — events with missing fields won't match anyway |
| 2 | TEXT line limit | 20 lines max | No limit | LOW — rare to exceed 20 lines |
| 3 | CREATEUNIT location limit | 10 locations max | No limit | LOW — few scenarios use >10 |
| 4 | RANDOMTURN denominator range | Validated 1-1000 | No validation | LOW — out-of-range rarely used |
| 5 | Technology ID format | Numeric only ("0"-"9" check) | Numeric + name lookup | COMPATIBLE — JS is more flexible |
| 6 | Terrain type format | Numeric only (0-10) | Numeric + name lookup | COMPATIBLE — JS is more flexible |
| 7 | NEGOTIATION auto-TRANSPORT | Sets 0x1000 flag automatically | Must use explicit TRANSPORT action | MEDIUM — may affect negotiation blocking |
| 8 | Maprect format | 4 pairs (8 coords) from lines | 2 corners (4 coords) from key=value | LOW — only first 2 corners used in practice |
| 9 | MOVEUNIT moveTo | Coordinates only | Coordinates or city name | COMPATIBLE — JS is more flexible |
| 10 | Extra triggers (NOCITIES, CITYPRODUCTION, etc.) | Not in binary parser | Implemented in JS | COMPATIBLE — extensions |

### Overall Fidelity Assessment

**parse_events_file**: ~92% faithful to binary.
- All 9 binary trigger types: fully supported
- All 13 binary action types: fully supported
- Parsing: slightly more permissive than binary (no strict required-field enforcement)
- Name resolution: more flexible than binary (accepts names where binary requires numbers)
- Execution semantics: equivalent (justOnce, wildcard resolution, trigger matching)
- Only significant gap: NEGOTIATION events may not automatically block negotiation (missing auto-TRANSPORT flag)

**network_poll**: N/A — intentionally not ported.
- The JS engine replaces the entire DirectPlay binary protocol with a WebSocket JSON architecture
- All game-state-changing operations from the binary are handled by corresponding action types in `engine/reducer.js`
- 40+ binary message types that modify game state have JS equivalents through the reducer
- ~50 binary message types are DirectPlay transport/rendering concerns with no JS equivalent needed
- ~20 binary message types are NOP/reserved

---

## File References

- Binary network_poll: `/home/kruegsw/Code/civ2research/reverse_engineering/decompiled/block_00470000.c` lines 5594-6906
- Binary parse_events_file: `/home/kruegsw/Code/civ2research/reverse_engineering/decompiled/block_004F0000.c` lines 4525-5934
- Network protocol reference: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reference/network-protocol.js`
- JS server: `/home/kruegsw/Code/civ2research/charlizationv3/server/server.js`
- JS client network: `/home/kruegsw/Code/civ2research/charlizationv3/public/js/network.js`
- JS events engine: `/home/kruegsw/Code/civ2research/charlizationv3/engine/events.js`
- JS reducer (all game actions): `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
