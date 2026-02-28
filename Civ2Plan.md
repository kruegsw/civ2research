# Civ2 Browser Multiplayer — Transition Plan

## Current State

**What exists:** ~84KB vanilla JS application that parses Civ2 MGE save files (.SAV/.SCN/.NET) and renders pixel-perfect isometric maps on HTML5 Canvas. Three files: `parser.js` (binary reader), `renderer.js` (8-pass sprite compositor), `app.js` (UI glue). Zero game logic. Zero interactivity beyond tooltips. Zero networking.

**What's needed:** A fully playable, multiplayer Civ2 running in the browser over the internet.

---

## Target Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER CLIENT (JS)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Renderer │  │ Game UI  │  │ Input    │  │ Net Client │  │
│  │(existing)│  │(new)     │  │Handler   │  │(WebSocket) │  │
│  └────▲─────┘  └────▲─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │             │               │         │
│       └──────────────┴─────────────┘               │         │
│              Local View Model                      │         │
└────────────────────────────────────────────────────┼─────────┘
                                                     │ WebSocket
┌────────────────────────────────────────────────────┼─────────┐
│                    GAME SERVER (Node.js)            │         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────▼──────┐  │
│  │ Rules    │  │ Turn     │  │ Game     │  │ Net Server │  │
│  │ Engine   │  │ Manager  │  │ State    │  │(WebSocket) │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
│  ┌──────────┐  ┌──────────┐                                 │
│  │ RULES.TXT│  │ Lobby /  │                                 │
│  │ Parser   │  │ Matchmake│                                 │
│  └──────────┘  └──────────┘                                 │
└─────────────────────────────────────────────────────────────┘
```

The server is authoritative. Clients send actions ("move unit 47 to tile 12,8"), the server validates and resolves them, then broadcasts state deltas to all clients. This prevents cheating and keeps game state consistent.

---

## Phase 1: Game Rules Engine (Offline, Single-Player)

Turn the viewer into a playable single-player game with no networking. This is the hardest phase because it requires implementing all of Civ2's game mechanics.

### 1a. RULES.TXT Parser

- Parse a standard Civ2 RULES.TXT into structured data
- Sections: `@COSMIC`, `@UNITS`, `@IMPROVE`, `@TERRAIN`, `@GOVERNMENTS`, `@CIVILIZE` (tech tree), `@ENDWONDER`, `@CARAVAN`, `@ORDERS`, `@DIFFICULTY`, `@ATTITUDES`
- Replaces all hardcoded tables (`UNIT_MAX_HP`, `UNIT_NAMES`, `EPOCH_TECHS`, etc.) with data-driven lookups
- Output: a `Rules` object the entire engine references

### 1b. Mutable Game State Model

- Extract game state from the parser into a mutable model (currently read-only closures over a `Uint8Array`)
- `GameState` class: map tiles, cities, units, civs, diplomacy, turn counter, global flags
- Each entity gets proper mutation methods (move unit, add building, change production, etc.)
- Must be serializable (for save/load and network transmission)
- Backward compatible: can still initialize from a `.SAV` via the existing parser

### 1c. Core Game Mechanics

| System | Source for Rules | Complexity |
|--------|-----------------|------------|
| **Tile yields** (food/shields/trade per tile) | `@TERRAIN` + `@COSMIC` + improvements | Low |
| **Movement** (terrain costs, roads, ZOC, transport) | `@TERRAIN` move_cost + `@COSMIC` road multiplier + unit flags | Medium |
| **Combat** (attack/defense, veteran promotion) | `@UNITS` stats + terrain defense + fortification + firepower/HP | Medium |
| **City management** (growth, starvation, production, specialists) | `@COSMIC` food/shield thresholds + `@IMPROVE` costs | High |
| **Technology research** (cost, prerequisites, discovery) | `@CIVILIZE` prereqs + `@COSMIC` tech paradigm | Medium |
| **Government** (maintenance, corruption, happiness effects) | `@GOVERNMENTS` section | Medium |
| **Improvements & Wonders** (effects, upkeep, expiration) | `@IMPROVE` + `@ENDWONDER` | Medium |
| **Diplomacy** (treaties, attitudes, trade) | `@ATTITUDES` + treaty bitmask | High |
| **Victory conditions** (conquest, space race, score) | Game logic, not RULES.TXT | Medium |

**Primary references for game formulas:**
- Civ2-clone (C#, github.com/axx0/Civ2-clone) for any implemented logic
- The Civ2 manual and Civilopedia text
- CivFanatics community reverse-engineering (extensive forum threads on exact formulas)
- FreeCiv source code (similar but not identical rules)
- `Civ2_MGE_Binary_Analysis.md` in this repo (field locations and data structures)

### 1d. Turn Sequencer

- Turn loop: begin turn → per-civ phases → end turn
- Phase order: Start-of-turn maintenance (food, production, research, growth/starvation) → Unit activation (player issues orders) → Combat resolution → End-of-turn bookkeeping
- Must cleanly separate "collect actions" from "resolve actions" for multiplayer readiness

---

## Phase 2: Interactive Client (Single-Player Playable)

Make the game playable in the browser by one human against a static world (no AI yet).

### 2a. Viewport & Camera

- Scrollable viewport rendering only visible tiles (replace full-map render)
- Keyboard (arrow keys, WASD) and mouse-drag scrolling
- Minimap for navigation
- Performance target: re-render visible area in <16ms for 60fps scrolling

### 2b. Tile & Unit Selection

- Click tile to select, show info panel
- Click unit to select, highlight valid movement range
- Right-click or click destination to issue move orders
- Keyboard shortcuts: F=fortify, S=sentry, B=build city, etc.

### 2c. City Screen

- City management UI on click
- Show: population, food/shield/trade breakdown, buildings, production queue, specialists, happiness
- Allow: change production, buy, sell improvements, manage specialists

### 2d. Tech & Government UI

- Technology chooser dialog
- Government change dialog
- Civilopedia-style info panels

### 2e. Turn Controls

- "End Turn" button and "Next Unit" cycling
- Turn counter / year display
- Notifications: city growth, production complete, tech discovered, combat results

### 2f. Combat Visualization

- Animated unit combat (flash sprites, show damage, remove defeated)
- Combat results popup (attacker vs defender stats, outcome)

---

## Phase 3: Networking Layer (Multiplayer Foundation)

Two or more humans playing the same game over the internet.

### 3a. Server Infrastructure

- Node.js + `ws` library (lightweight WebSocket, not Socket.IO)
- Game lobby: create game, set options (map size, civs, rules), join game
- Room management: isolate each game session
- Persist game state to disk (save/load mid-game)

### 3b. Network Protocol

JSON over WebSocket (sufficient data rate for turn-based play):

- **Lobby:** `create_game`, `join_game`, `list_games`, `game_settings`, `start_game`
- **Actions:** `move_unit`, `attack`, `set_production`, `change_government`, `research_tech`, `diplomacy_offer`, `end_turn`
- **State:** `game_state_full` (initial sync), `state_delta` (incremental updates), `turn_start`, `turn_end`
- **Meta:** `chat`, `player_disconnect`, `player_reconnect`, `save_game`

### 3c. Turn Synchronization

- **Simultaneous turns** (like original Civ2 multiplayer): all humans issue orders concurrently, server resolves when all submit "end turn"
- Timer option: configurable turn time limit (e.g., 5 minutes)
- Disconnection handling: AI takes over or pause game

### 3d. Fog of War (Server-Side)

- Server only sends each client tiles they can see (prevents cheating)
- Existing FOW rendering (pass 7) handles display — just driven by server-provided visibility instead of save file bitmask

### 3e. Authentication & Sessions

- Start simple: username + game password (no accounts)
- Session tokens for reconnection after disconnect
- Optional account system later

---

## Phase 4: AI Opponents

Fill empty civ slots with computer opponents so 2 humans can play a 7-civ game.

### 4a. Basic AI

- Priority-based decision making (not ML)
- Core behaviors: explore, expand, build military, defend cities, attack weak neighbors
- Technology selection heuristic
- Production priorities based on game state

### 4b. Diplomacy AI

- Accept/reject treaties based on relative power
- Initiate wars when advantageous
- Trade technology

Lowest priority phase — games can start as human-only.

---

## Phase 5: Polish & Deployment

### 5a. Rendering Upgrades

- Animated unit movement (lerp between tiles)
- Tile highlight overlays (movement range, attack range, city radius)
- Production/research progress bars
- Sound effects (optional)

### 5b. Map Generation

- Currently requires loading a `.SAV` — need procedural map generation for new games
- Random terrain, starting positions, resource seeding
- Alternative: ship a set of pre-built maps

### 5c. Deployment

- Static hosting for client (Netlify, Vercel, GitHub Pages)
- Game server on VPS or cloud (fly.io, Railway, simple VPS)
- HTTPS + WSS for secure connections

### 5d. Quality of Life

- Game settings UI (difficulty, map size, civ selection)
- In-game chat
- Spectator mode
- Replay system (record all actions for playback)

---

## Rough Timeline (Solo, Part-Time)

```
Phase 1a  RULES.TXT parser               ~2 weeks
Phase 1b  Mutable game state model        ~2 weeks
Phase 1c  Core game mechanics             ~2-3 months
Phase 1d  Turn sequencer                  ~1 week
Phase 2   Interactive client              ~2 months
Phase 3   Networking                      ~1 month
Phase 4   AI opponents                    ~1-2 months
Phase 5   Polish & deployment             ~2 weeks
                                          ─────────
                                Total:    6-12 months
```

---

## Key Decisions (To Be Made Early)

### 1. TypeScript or Vanilla JS?

TypeScript would significantly help with a codebase this complex (game state types, action types, protocol types). **Recommendation: migrate to TypeScript.**

### 2. Monorepo Structure?

Suggested layout:
- `packages/shared` — game rules, state model, protocol types
- `packages/client` — renderer, UI
- `packages/server` — Node.js game server

### 3. How Faithful to Civ2 Rules?

Exact reproduction of every edge case vs. "spirit of Civ2" with simplifications. Exact reproduction requires extensive reverse-engineering; simplified version ships faster.

### 4. Simultaneous vs. Sequential Turns?

Simultaneous (original Civ2 MP) is better for internet play but harder (conflict resolution). Sequential is simpler but slower.

### 5. Map Generation vs. Pre-Built Maps Only?

Pre-built maps (from `.SAV` files) is fastest. Procedural generation is a significant sub-project but needed for replayability.

### 6. Canvas 2D vs. WebGL?

Current Canvas 2D works but will struggle with large maps + animation. WebGL (via PixiJS) gives better performance. Could be deferred to Phase 5.

---

## Reusability of Current Codebase

| Component | Reusability | Notes |
|-----------|------------|-------|
| `parser.js` | **High** | Reuse as-is for `.SAV` → initial game state |
| `renderer.js` sprite extraction | **High** | All chroma-key, variant selection, recoloring logic carries over |
| `renderer.js` multi-pass rendering | **Medium** | Needs viewport clipping, but pass structure is solid |
| `app.js` | **Low** | Complete rewrite as game UI; tooltip logic partially reusable |
| `index.html` | **Low** | Complete redesign for game UI |
| `Civ2_MGE_Binary_Analysis.md` | **Very High** | Essential reference for all game state fields |
| Sprite sheets (GIF assets) | **High** | Direct reuse — original Civ2 art |

---

## Game Rules: What's Documented vs. What's Missing

The binary analysis doc thoroughly covers **where data is stored** (byte offsets, bitmasks, record layouts) but does NOT contain **game formulas**. Summary:

| Area | Data Location Documented | Game Formula Documented |
|------|-------------------------|------------------------|
| Combat | Unit stats, HP, veteran flag | No (need attack/defense algorithm) |
| Movement | Terrain costs defined, movement points | No (need ZOC rules, transport rules) |
| Production | Shield costs, food/trade fields | No (need growth thresholds, corruption) |
| Tech tree | Prerequisites, tech bitmask | No (need beaker cost formula) |
| City management | Population, happiness, specialists | No (need happiness calculation) |
| Diplomacy | Treaty flags, attitude bytes | No (need thresholds, AI logic) |
| Government | 7 types identified | No (need effects on yields/happiness) |
| Wonders | City IDs, expiration techs | No (need gameplay effects) |
| Victory | Spaceship structure detected | No (need condition algorithms) |

All game formulas live in `RULES.TXT` (data tables) and `Civ2.exe` (algorithms). CivFanatics forums have extensive community reverse-engineering of these formulas.
