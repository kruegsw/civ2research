# Civ2 Web — Implementation Roadmap

## The Premise

We have a complete, verified transpilation of civ2.exe into JavaScript. 5,149 functions, 182K lines, verified against both the C source and the Ghidra P-code. The transpiled code operates on a flat memory array (`_MEM`) using the same addresses as the original binary.

The game already runs headlessly — load a save file, call the turn pipeline, cities grow, research accumulates. What we don't have is a way for a human to play it in a browser.

This roadmap turns the headless engine into a playable web game. Each phase is self-contained and testable. No phase requires going back and rewriting game logic — the binary's logic is final.

---

## Phase 1: Headless Engine Stabilization

**What this is:** Make the headless engine produce correct results for an all-AI game. No browser, no rendering — just verify the numbers are right.

**Why it matters:** If the engine doesn't produce correct results headlessly, nothing built on top of it will work. This is the foundation.

**What "done" looks like:** Load a save file, run 50 turns all-AI. Cities grow at realistic rates. Units are built. Treasury changes. Techs are discovered. No crashes.

### Work Items

| Item | Description | How to verify |
|------|-------------|---------------|
| Save file loading | Load .sav into flat memory at correct offsets | Round-trip: load → save → load, bytes identical |
| Turn pipeline | `FUN_00487371` (end-of-turn) + `FUN_00489553` (per-civ) called correctly | Turn counter increments, year advances correctly |
| Extern stubs | Win32/MFC functions return correct defaults per `findings/mfc_methods.md` | No crashes, no NaN propagation |
| All-AI mode | `DAT_00655b0b = 0` skips human turn | 50 turns complete without hanging |
| TODO_FIXME cleanup | Fix remaining 190 TODO_FIXME deviations as they're encountered | `grep -r TODO_FIXME` count decreases |

### The verification problem

We need to know whether our engine produces correct numbers. There are three sources of truth, each with trade-offs:

| Source | What it gives us | Limitation |
|--------|-----------------|------------|
| **C source** | The exact formula for every calculation | Tells us HOW to compute, not WHAT the answer should be for a specific save file |
| **P-code** | Verified that our transpilation matches the binary's types and operations | Already at 0 divergences — can't find more bugs this way |
| **Real Civ2 snapshots** | The exact correct answer for a specific save file after N turns | Requires running real Civ2 (one-time capture, then reusable forever) |

**Recommended approach:** Capture a small set of reference snapshots (3-5 save files, 1 turn each) from real Civ2. This is a one-time task. Once captured, all future verification is automated — run the JS engine on the same save, diff against the snapshot, fix divergences. No ongoing human involvement.

**Fallback if no snapshots available:** Trace the C source manually for a specific save file. For a size-1 city on grassland in Despotism, the food yield formula is deterministic from the C source. Calculate the expected food box value by hand, assert it in a test. This is slower but requires no external tools.

### Key insight
The other Claude session fixed 7 infrastructure bugs (thiscall ECX, pointer widths, etc.) and got 9/9 verification passing with units being created and treasury accumulating. The engine may already be closer to correct than early tests suggested. Start by running the latest code and measuring.

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

### The blocking loop problem

The binary's human turn handler (`FUN_0048a416`) is a `while(true)` loop that waits for Win32 mouse/keyboard events. A web game is event-driven — the browser sends an action whenever the player clicks, and the server processes it immediately. These are fundamentally different control flows.

**We cannot use the binary's human turn loop.** It blocks waiting for input that never comes in a web environment.

**The solution:** Bypass the binary's turn loop for human players. Instead, the server exposes individual action functions that the client calls directly:

| Player action | What the server does | Binary function |
|--------------|---------------------|-----------------|
| Click tile to move unit | Validate move, update unit position | `FUN_0059061d` |
| Press 'f' to fortify | Set unit order byte | `FUN_004c4ada` |
| Click "End Turn" | Run AI turns + end-of-turn processing | `FUN_00487371` + `FUN_00489553` for AI civs |
| Found city | Place city, assign tiles | `FUN_004c2b73` |
| Change production | Update city production field | `FUN_004f3f60` |

This is NOT writing game logic — every action calls a real binary function. We're just calling them individually instead of from within the binary's blocking loop. The binary's loop does the same thing: wait for input, call the appropriate function, repeat. We're doing the same thing with WebSocket events instead of Win32 messages.

**Why this works:** The binary's turn loop (`FUN_0048a416`) is pure orchestration — it reads input, dispatches to a handler function, and loops. The handler functions are the same regardless of whether they're called from the binary's loop or from our server's WebSocket handler. The game state in `_MEM` doesn't care who called the function.

### What we DON'T bypass

The AI turn processing is NOT bypassed. When the human clicks "End Turn," the server calls the binary's AI processing chain (`FUN_00489553` for each AI civ, `FUN_00543cd6` for AI unit dispatch). This runs exactly as the binary intended — no approximation.

---

## Phase 5: City Screen

**What this is:** Click a city, see its production, population, buildings, food/shield/trade breakdown. Change what the city builds.

**Why it matters:** City management is half of Civ2's gameplay. Without it, you can't direct your civilization.

**What "done" looks like:** City detail screen shows all Civ2 data: size, food box, shield box, buildings, wonder, production queue. Player can change production. Citizen assignment (entertainers/scientists/taxmen) works.

### Work Items

| Item | Data Source | Binary Function |
|------|-----------|-----------------|
| City info display | Read city record at `DAT_0064f340 + idx * 0x58` | N/A (just reading _MEM) |
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
The v3 server already has the multiplayer infrastructure (rooms, seats, lobby, session management). The binary supports multiplayer via `DAT_00655b02` (game mode) and `DAT_00655b0b` (human player bitmask). Setting these correctly makes the binary's turn pipeline handle multi-human games natively. The blocking loop problem (Phase 4) is already solved by that point — each human player's actions come in via WebSocket and are dispatched to binary functions individually.

---

## What's NOT In This Roadmap

These are explicitly deferred. They can be added later without changing the architecture:

- **Map generation** — currently loads save files. New game generation uses `FUN_00408d33` which is transpiled but needs GlobalAlloc emulation.
- **Scenario support** — scenarios use special rules files. Straightforward once base game works.
- **Sound** — the binary calls `sndPlaySoundA`. Can be mapped to Web Audio API.
- **Throne room, palace, wonder movies** — cosmetic. Not gameplay.
- **Hall of Fame, demographics** — read-only reports from _MEM data.

---

## Known Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Phase 1 verification without real Civ2 snapshots | Can't confirm exact numerical correctness | Capture 3-5 reference snapshots once, reuse forever. Fallback: manual C formula calculation. |
| 190 TODO_FIXME deviations | Code paths outside turn pipeline may break when reached | Fix as encountered. None are in the core turn pipeline. |
| Extern stub return values | Wrong default could change a code path | Each stub documented in `findings/mfc_methods.md` with correct return value. |
| State serialization performance | Full _MEM is 1.3MB — too large to send every action | Send deltas: track which _MEM regions changed, send only those. |
| Browser memory | _MEM array on client side | Client doesn't need full _MEM — only the extracted game state (cities, units, tiles, civs). Server extracts and sends structured data. |

---

## The Principle

At no point in this roadmap do we write game logic. The binary's transpiled functions ARE the game logic. Every phase is infrastructure: serving data, drawing pixels, handling clicks, sending messages. If a game formula is wrong, we fix the transpiler or the stubs — we never write our own version of the formula.

The one exception is Phase 4's human turn handling, where we bypass the binary's blocking input loop and call action functions directly. This is orchestration, not logic — the functions themselves are the binary's, we just call them from a different event source.

This is what makes the plan closed-ended. The number of infrastructure pieces is finite and enumerable. Each one is independently testable. There are no hidden game logic surprises because we don't write game logic.
