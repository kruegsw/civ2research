# Civ2 Web — Implementation Roadmap

## The Premise

We have a complete, verified transpilation of civ2.exe into JavaScript. 5,149 functions, 182K lines, verified against both the C source and the Ghidra P-code. The transpiled code operates on a flat memory array (`_MEM`) using the same addresses as the original binary.

The game already runs headlessly — load a save file, call the turn pipeline, cities grow, research accumulates. What we don't have is a way for a human to play it in a browser.

This roadmap turns the headless engine into a playable web game. Each phase is self-contained and testable. No phase requires going back and rewriting game logic — the binary's logic is final.

---

## Phase 1: Headless Engine Stabilization

**What this is:** Make the headless engine produce correct results for an all-AI game. No browser, no rendering — just verify the numbers match real Civ2.

**Why it matters:** If the engine doesn't produce correct results headlessly, nothing built on top of it will work. This is the foundation.

**What "done" looks like:** Load a save file, run 50 turns all-AI, compare key metrics (city sizes, unit counts, treasury, techs) against the same save run in real Civ2. They match within tolerance.

### Work Items

| Item | Description | How to verify |
|------|-------------|---------------|
| Save file loading | Load .sav into flat memory at correct offsets | Round-trip: load → save → load, bytes identical |
| Turn pipeline | `FUN_00487371` (end-of-turn) + `FUN_00489553` (per-civ) called correctly | Compare turn counter, year, unit moves reset |
| Extern stubs | Win32/MFC functions return correct defaults | No crashes, no NaN propagation |
| All-AI mode | `DAT_00655b0b = 0` skips human turn | 50 turns complete without hanging |
| Snapshot comparison | Dump memory regions, compare against real Civ2 snapshot | First divergent byte identified and fixed |

### Key insight
The `run.js` headless runner currently hand-writes the turn loop. The other Claude session fixed 7 infrastructure bugs (thiscall ECX, pointer widths, etc.) and got 9/9 sniffing verification passing. The engine may already be closer to correct than what we tested in this session. Start by running the latest code and measuring.

---

## Phase 2: Server

**What this is:** Wrap the headless engine in a Node.js HTTP + WebSocket server. The server holds the game state (the `_MEM` array) and processes turns when clients send actions.

**Why it matters:** This is the bridge between the engine and the browser. It's thin — the server doesn't implement game logic, it just calls transpiled functions and sends results.

**What "done" looks like:** A client connects via WebSocket, sends "end turn," the server processes one turn and sends back the updated game state. Multiple clients can connect to the same game.

### Architecture

```
Browser ←—WebSocket—→ Server ←—function calls—→ v4 Blocks (transpiled binary)
                         ↕
                    _MEM array (game state)
```

### Work Items

| Item | Description | Notes |
|------|-------------|-------|
| HTTP server | Serve static files (HTML, JS, CSS, assets) | Copy pattern from v3's server.js |
| WebSocket | Handle connect/disconnect, send/receive JSON | Copy from v3 |
| Game room | One _MEM array per game, track connected players | v3 already has room/seat model |
| Action dispatch | Receive player action → call appropriate binary function → send delta | Actions: end_turn, move_unit, found_city, etc. |
| State serialization | Extract readable game state from _MEM for client | Read city/unit/civ arrays at known offsets |
| Save/Load | Server-side .sav read/write | Already working in v4 |

### Key insight
The server is NOT a game engine. It's a thin wrapper that translates WebSocket messages into function calls on the transpiled binary. All game logic lives in the v4 blocks. The server's job is: receive action, call function, send result.

---

## Phase 3: Map Rendering

**What this is:** The browser draws the game map using the same tile data the engine uses. You already have a working Canvas renderer in v3 that draws terrain, cities, units, fog of war.

**Why it matters:** This is what the player sees. Without it, the game is a terminal.

**What "done" looks like:** Browser shows the Civ2 map with correct terrain, cities, units, fog of war. Scrolling and zooming work. The map updates after each turn.

### What carries over from v3

| Component | v3 File | Changes needed |
|-----------|---------|----------------|
| Terrain rendering | `public/js/renderer.js` | Read tile data from server-sent state instead of parsed .sav |
| Sprite loading | `public/js/sprites.js` | None — same GIF assets |
| Minimap | `public/js/minimap.js` | Same approach, new data source |
| Fog of war | `public/js/renderer.js` | Read visibility from _MEM-based state |
| City names/sizes | `public/js/renderer.js` | Read from server state |
| Unit icons | `public/js/renderer.js` | Read from server state |

### Key insight
The v3 renderer already works and looks like Civ2. The only change is the data source: instead of reading from a parsed JavaScript object (`game.tiles[x][y].terrain`), it reads from the server-sent state which mirrors the flat memory layout. This is a data binding change, not a rendering rewrite.

---

## Phase 4: Player Input — Movement and Orders

**What this is:** The player clicks a unit, clicks a destination, the unit moves. The player gives orders (fortify, sentry, go-to). This is the core gameplay interaction.

**Why it matters:** Without input, the player can only watch. This makes it playable.

**What "done" looks like:** Click a unit to select it. Click a tile to move it. Press 'f' to fortify. Press 'g' and click to set a go-to destination. End turn button processes the turn and updates the map.

### Work Items

| Item | Binary Function | What it does |
|------|----------------|-------------|
| Unit selection | Read unit list from _MEM | Find units at clicked tile |
| Move unit | `FUN_0059061d` | Moves unit, handles combat, ZOC |
| Fortify | `FUN_004c4ada` | Set unit order to fortify |
| Sentry | `FUN_004c4ada` | Set unit order to sentry |
| Go-to | `FUN_004c9ebd` | Set destination, pathfind |
| End turn | `FUN_00487371` + `FUN_00489553` | Process all civs |
| Found city | `FUN_004c2b73` | Settler founds city |
| Build road/irrigate | `FUN_004c4ada` | Worker orders |

### Key insight
Each player action maps to exactly one binary function call. The browser sends "move unit 3 to tile (15, 22)" → the server calls `FUN_0059061d(3, 15, 22)` → the _MEM array updates → the server sends the changed state back → the browser redraws.

---

## Phase 5: City Screen

**What this is:** Click a city, see its production, population, buildings, food/shield/trade breakdown. Change what the city builds.

**Why it matters:** City management is half of Civ2's gameplay. Without it, you can't direct your civilization.

**What "done" looks like:** City detail screen shows all Civ2 data: size, food box, shield box, buildings, wonder, production queue. Player can change production. Citizen assignment (entertainers/scientists/taxmen) works.

### Work Items

| Item | Data Source | Binary Function |
|------|-----------|-----------------|
| City info display | Read city record at `DAT_0064f340 + idx * 0x58` | N/A (just reading) |
| Production change | Write to city production field | `FUN_004f3f60` |
| Rush buy | Write gold, complete production | `FUN_004eef23` chain |
| Sell building | Remove building bit from city | `FUN_004e790c` |
| Specialist assignment | Modify citizen tiles | `FUN_004e8f42` |
| Yield display | Read computed yields | `FUN_004eb4ed` |

### Key insight
The city screen is primarily a READ operation — display data from _MEM. The few WRITE operations (change production, buy, sell) are single function calls. The v3 client already has city screen UI elements that can be adapted.

---

## Phase 6: Diplomacy, Research, and Advisors

**What this is:** The remaining game screens: diplomacy with AI civs, research selection, advisor reports, tax/science/luxury rate adjustment.

**Why it matters:** These are needed for a complete game but not for basic playability.

**What "done" looks like:** Player can set research target, adjust tax rates, negotiate with AI, view advisor reports.

### Work Items

| Item | Binary Function |
|------|----------------|
| Set research target | `FUN_005a5f34` |
| Tax/science/luxury slider | Write to `DAT_0064c6b3/b4` + recalc |
| AI diplomacy dialog | `FUN_00560084` chain |
| Foreign advisor | Read civ relations from _MEM |
| Science advisor | Read tech tree from _MEM |
| Trade advisor | `FUN_004d0d64` |

---

## Phase 7: Multiplayer

**What this is:** Multiple human players in the same game. The v3 server already supports rooms, seats, and turn management via WebSocket.

**Why it matters:** This is what makes it a web game rather than a single-player port.

**What "done" looks like:** Two players connect to the same game. Each takes their turn. The other sees the results. Hot-seat and simultaneous modes both work.

### Key insight
The v3 server already has the multiplayer infrastructure (rooms, seats, lobby, session management). The binary supports multiplayer via `DAT_00655b02` (game mode) and `DAT_00655b0b` (human player bitmask). Setting these correctly makes the binary's turn pipeline handle multi-human games natively.

---

## What's NOT In This Roadmap

These are explicitly deferred. They can be added later without changing the architecture:

- **Map generation** — currently loads save files. New game generation uses `FUN_00408d33` which is transpiled but needs GlobalAlloc emulation.
- **Scenario support** — scenarios use special rules files. Straightforward once base game works.
- **Sound** — the binary calls `sndPlaySoundA`. Can be mapped to Web Audio API.
- **Throne room, palace, wonder movies** — cosmetic. Not gameplay.
- **Hall of Fame, demographics** — read-only reports from _MEM data.

---

## The Principle

At no point in this roadmap do we write game logic. The binary's transpiled functions ARE the game logic. Every phase is infrastructure: serving data, drawing pixels, handling clicks, sending messages. If a game formula is wrong, we fix the transpiler or the stubs — we never write our own version of the formula.

This is what makes the plan closed-ended. The number of infrastructure pieces is finite and enumerable. Each one is independently testable. There are no hidden game logic surprises because we don't write game logic.
