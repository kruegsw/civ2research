# Game Initialization Call Chain

Traced from decompiled C source. This documents every function called between
"Start a New Game" and Turn 1.

Source of truth: `reverse_engineering/decompiled/block_*.c`

---

## Master Function: FUN_00419170 (block_00410000.c:4616)

This is the top-level "new game" entry point. Size: 1955 bytes.

### Pre-game setup (lines 4638-4660)
```
FUN_0059db08(0x4000)           — SEH setup
FUN_005c64da()                 — ???
Zero DAT_00654b60 array (8 entries × 2 bytes)
DAT_00655b02 = 1               — difficulty default
FUN_005bf5e1(...)              — palette/display init?
FUN_00419be0(&DAT_0063cbd0)    — ???
FUN_00419ba0(0x9e)             — ???
FUN_00419b80()                 — GDI flush (drain paint messages)
FUN_0052263c(-1, 0)            — ???
FUN_0040ffa0("HOTSEAT1", 1)   — main menu dialog display
FUN_0059ea99(DAT_0066653c)     — ???
FUN_0040bc80(0)                — get menu selection
FUN_0046e020(0x6a,0,0,0)      — ???
FUN_0055a567()                 — ???
```

### Menu switch (lines 4677-4768)
Based on menu selection:
- **case 0**: Start a New Game → `FUN_0041d417()` (map size dialog?) → `FUN_0051dd97(0, 1)`
- **case 1**: Premade World → `FUN_0041dd0e()` → `FUN_0051dd97(mapType, 1)`
- **case 2**: Customize World → `FUN_0041d417()` → `FUN_0041d7ea()` → `FUN_0051dd97(0, 1)`
- **case 3**: Begin Scenario → `FUN_005218cb(1)` → scenario load path
- **case 4**: Load a Game → separate path

---

## Dialog Sequence: FUN_0051dd97 (block_00510000.c:5501)

Size: 3152 bytes. Shows all setup dialogs and stores selections.

```
FUN_00419ed3()                 — ???
FUN_0052263c(3, 0)             — ???
FUN_0040ffa0("DIFFICULTY", 1)  — difficulty dialog
  → DAT_00655b08 = selection    — difficulty level stored
FUN_0052263c(4, 0)             — ???
FUN_0040ffa0("ENEMIES2", 1)   — competition dialog
  → DAT_0064bc24 = selection    — number of civs
... more dialogs for barbarians, rules, gender, tribe, name, city style ...
```

Each dialog: `FUN_0040ffa0(dialogName)` → `FUN_0040bc80(0)` reads result.

Returns with all game parameters set in globals.

---

## Post-dialog setup (FUN_00419170 lines 4769-4805)

After FUN_0051dd97 returns:

```
DAT_00655b0a = 0                          — ???
DAT_00655b0b = 0                          — human player bitmask (set later)
local_14 = FUN_005227e3()                 — get number of human players
FUN_00522dfa()                            — ???

loop: FUN_0051f19c(civIndex, 1, 0)        — assign civ slots to players
  ↓ (sets each civ's leader, color, etc.)

FUN_00522f8f(playerCount)                 — finalize player setup
FUN_004a73d9()                            — clear unit/city state?
FUN_0041a046(1)                           — LOAD RULES.TXT (@COSMIC, @GOVERNMENTS, etc.)
FUN_0041a5c4(1)                           — LOAD RULES.TXT (@UNITS section → unit type table)
FUN_0041a422(1)                           — LOAD RULES.TXT (@TERRAIN section → terrain table)
FUN_00419c8b()                            — LOAD other data files (CITY.TXT, etc.)

FUN_00408d33(mapType)                     — *** MAP GENERATION *** (see below)

FUN_004aa9c0()                            — *** CIV INITIALIZATION *** (see below)

if (DAT_00631ee8 != 0):
    FUN_004a9785(DAT_00631ee8 - 1)        — scenario bonus init (Path B)

DAT_00655b02 = 1                          — set some flag
FUN_0040bbb0()                            — ???
FUN_0040bc10(0x363)                       — ???
FUN_00578c12(1, 0x1f2, &DAT_00679640, 0) — "In the Beginning" dialog?
```

---

## Map Generation: FUN_00408d33 (block_00400000.c:1464)

Size: 6004 bytes. THE BIG ONE — creates the entire world map.

### Phase 1: Tile allocation (lines 1540-1554)
```
FUN_005b85fe()                            — ???
DAT_006d1166 = DAT_00655ae8 & 0x8000     — map shape (flat/round)
FUN_005b7fe0()                            — ALLOCATE TILE MEMORY
  ├── DAT_006d116a = (mapWidth + 3) >> 2    — qw
  ├── DAT_006d116c = (mapHeight + 3) >> 2   — qh (NOTE: findings say qh = mapHeight, C says /4)
  ├── DAT_006d1164 = (mapWidth/2) * mapHeight — ms (total tiles)
  ├── DAT_006d1170 = FUN_004bb870(ms * 6)   — GlobalAlloc (heap handle)
  ├── DAT_00636598 = FUN_0046aad0(handle)   — GlobalLock (get pointer)
  ├── Init all tiles: byte[0]=10 (ocean), bytes[1-5]=0
  └── Allocate per-civ visibility arrays at DAT_006365c0[1..7]
FUN_00408830(DAT_00636598, 10)            — fill terrain byte to ocean
FUN_00408830(DAT_00636598 + 1, 0)         — clear improvements
```

### Phase 2: Continent generation (lines ~1555-1800)
```
Large loops creating land masses:
- Random continent placement
- Terrain type assignment (desert, plains, grassland, forest, etc.)
- Mountain/hill placement
- River generation
- Resource/special placement
- Temperature/climate zones
Uses: _rand(), FUN_005b89bb (terrain read), FUN_005b8931 (tile pointer)
```

### Phase 3: Post-processing (lines ~1800-1950)
```
- Goody hut placement
- Body ID assignment (continent/ocean numbering)
- Fertility calculation
- Tile ownership initialization
```

### Dependencies
- Needs: DAT_006d1160 (mapWidth), DAT_006d1162 (mapHeight), DAT_006d1168 (seed)
- Needs: Working GlobalAlloc/GlobalLock → returns valid memory pointer
- Needs: _rand() / _srand() for terrain generation
- Produces: Complete tile array with terrain, rivers, resources, body IDs

---

## Civ Initialization: FUN_004aa9c0 (block_004A0000.c:3518)

Size: 1345 bytes. Initializes all civilization data.

```
FUN_00484cc0()                            — zero game flags
FUN_004a76f5()                            — zero trade routes
Zero: DAT_00655364 (8 × 0x10), DAT_006554fb (21 × 0x30), wonders, tech discovery bitmasks

DAT_00655af8 = 0                          — turn counter (NOTE: set to 0, not 1)
DAT_00655afa = 0xf060                     — year increment
DAT_00655afc = 0xffff                     — ???
DAT_00655aea = flags                      — game options
DAT_006d1da8 = 1                          — ???
DAT_00655b16 = 0                          — total units = 0
DAT_00655b18 = 0                          — total cities = 0

for each civ (0-7):
    FUN_004a74bc(civ)                     — clear civ slot
    Zero military/wonder/unit counts
    DAT_0064c6aa[civ] = 0xFFFF           — ??? sentinel

new_civ(civ) × 8                         — initialize each civ struct
    ├── Zero all 1428 bytes
    ├── Set gov = Despotism
    ├── Set sci = 4 (40%), tax = 4 (40%)
    ├── Set all 100 tech bytes to 0xFF
    ├── Random starting tech assignment (gated by DAT_00655af8 != 0)
    ├── AI sci/tax override from leader personality (DAT_006554fa)
    └── Settler creation at random valid positions

FUN_004a7754()                            — FIND STARTING POSITIONS
    ├── Uses map data to find valid land tiles
    ├── Places settlers for each active civ
    ├── Needs: complete map with terrain, body IDs
    └── Produces: units in unit array, DAT_00655b16 updated

Set human player sci/tax from defaults (DAT_0064bc1a, DAT_0064bc1c)
If Chieftain: give human 50 gold
```

---

## Turn Processing: FUN_00489553 (block_00480000.c)

After init completes, the game loop calls this per civ per turn:
```
FUN_00489553(civIndex)
  ├── City processing (food, shields, growth, production)
  ├── Unit support calculation
  ├── Tech/science advancement
  └── AI: FUN_00543cd6() — AI dispatch (unit orders, movement)
```

---

## Summary: What Must Work for Headless

| Step | Function | Needs | Status |
|------|----------|-------|--------|
| 1 | Rules loading | File I/O | ✓ Working (rules-loader.js) |
| 2 | Dialog selections | Stubbed globals | ✓ We set these manually |
| 3 | Player/civ slot assignment | FUN_0051f19c, FUN_005227e3 | ❌ Not called |
| 4 | Tile memory allocation | GlobalAlloc, GlobalLock | ❌ Stubs return 0 |
| 5 | Map generation (6KB) | Tile memory + _rand | ❌ Never runs |
| 6 | Civ init + settler placement | Complete map | ❌ Runs but no map → no settlers |
| 7 | Turn processing | Everything above | ⚠ Works for economics, not AI |

### Key blockers:
1. **GlobalAlloc/GlobalLock** — need to return real memory from our buffer
2. **Per-civ visibility arrays** — allocated inside FUN_005b7fe0
3. **Map gen** — 6KB of continent/terrain generation, depends on allocation
4. **Civ slot assignment** — FUN_0051f19c sets up which civs are active

### What we currently hack around:
- Manually allocate tile memory at _MEM end (TILE_DATA_BASE)
- Manually fill tiles with grassland
- Manually place cities and units
- Manually set civ fields (gov, sci, tax, beakers)
- Manually set exploration maps
- Skip steps 3-6 entirely

---

## Full Call Stack (top to bottom)

```
FUN_004c4280 (block_004C0000.c:1103) — MFC app entry wrapper (21 bytes)
│
└── FUN_0041f8d9 (block_00410000.c:7676) — WinMain equivalent (2326 bytes)
    │
    ├── PRE-GAME SETUP (lines 7775-7787):
    │   ├── FUN_00498784()              — advisor init?
    │   ├── FUN_004fa5d9(50000)         — timer/budget init?
    │   ├── _memset(DAT_0064ba48,-1,0xc0) — clear unit assignment table (192 bytes)
    │   ├── Zero unit array: 2048 × 32 bytes, set all unique_id=0, link fields=0xFFFF
    │   ├── DAT_00655b16 = 0            — total units = 0
    │   ├── Zero city array: 256 × 88 bytes, set all exists=0
    │   └── DAT_00655b18 = 0            — total cities = 0
    │
    ├── FUN_0041eeeb (block_00410000.c:7343) — TITLE SCREEN MENU LOOP (1891 bytes)
    │   │
    │   │   do {
    │   │     Show main menu → get selection
    │   │     switch (selection):
    │   │       case 0: "Start a New Game"
    │   │       case 1: "Premade World"
    │   │       case 2: "Customize World"
    │   │         └── FUN_0041ba52(mapType) — GAME SETUP + INIT (6555 bytes)
    │   │             │                       (see "Game Setup" section below)
    │   │             └── returns after init complete
    │   │       case 3: "Begin Scenario" → FUN_0041dfe1()
    │   │       case 4: "Load a Game" → load_verify_units() → FUN_0041e8fb()
    │   │       case 5: "Multiplayer" → FUN_0051d9a0()
    │   │       case 6: "Hall of Fame" → FUN_00436bb7()
    │   │       case 7: "Credits" → FUN_00421e70()
    │   │   } while (local_18 != 0);
    │   │
    │   └── Returns with game initialized
    │
    ├── POST-INIT SETUP (lines 7790-7831):
    │   ├── FUN_004079a6()              — window setup
    │   ├── FUN_0056aacb()              — ???
    │   ├── FUN_00413a90()              — ???
    │   ├── citywin_DCB6()              — city window class init
    │   ├── FUN_004f4b9f()              — ???
    │   ├── Palette/GDI setup
    │   ├── FUN_004e1314()              — recalculate all cities?
    │   └── DAT_00654fd8 = 1            — game ready flag?
    │
    └── FUN_0048b340 (block_00480000.c:3248) — *** SINGLE PLAYER GAME LOOP *** (3048 bytes)
        │   (called when DAT_00655b02 < 3, i.e. single player modes)
        │
        └── Contains the per-turn processing loop:
            ├── Per-civ turn processing via FUN_00489553(civIndex)
            ├── AI dispatch via FUN_00543cd6()
            ├── End-of-turn bookkeeping
            └── Loops until game over
```

## Game Setup: FUN_0041ba52 (block_00410000.c:5958)

Size: 6555 bytes. The REAL game launcher for single player.
Contains both the dialog sequence AND the init calls.

### Dialog Sequence (lines 6014-6400):
```
do {
  FUN_0040ffa0("DIFFICULTY")      → DAT_00655b08 = difficulty
  FUN_0040ffa0("ENEMIES")         → DAT_0064bc24 = civ count
  FUN_0040ffa0("BARBARITY")       → barbarian level
  FUN_0040ffa0("RULES")           → game rules
  FUN_0040ffa0("GENDER")          → leader gender
  FUN_005a632a("CUSTOMTRIBE")     → tribe selection
  FUN_0040ffa0("NAMEYOUR")        → player name
  FUN_0040ffa0("CITYSTYLE")       → city style
} while (user goes back / cancels);
```

### Civ Slot Assignment (lines 6400-6443):
```
Set DAT_00655b0a (active civs bitmask)
For each non-human AI civ:
  Assign leader via FUN_0051f19c(civIndex, 1, 0)
  Show opponent selection dialog (if applicable)
```

### Init Calls (lines 6445-6457):
```
FUN_004a73d9()              — clear game state
FUN_0041a046(1)             — load RULES.TXT
FUN_0041a5c4(1)             — load @UNITS section → unit type table at DAT_0064b1b8
FUN_0041a422(1)             — load @TERRAIN section → terrain table at DAT_00627cc0
FUN_00419c8b()              — load CITY.TXT, other data files
FUN_00408d33(mapType)       — *** MAP GENERATION ***
FUN_004aa9c0()              — *** CIV INITIALIZATION ***
FUN_004a9785(...)           — scenario bonus (only if DAT_00631ee8 != 0)
FUN_0041b8ff(humanCiv)      — "In the Beginning" dialog (shows starting techs)
```

## Resolved Questions

1. **FUN_005b85fe** — generates map seed: `DAT_006d1168 = rand() & 0x7FFF`
2. **FUN_0041ba52** — is the real game launcher (6555 bytes), NOT FUN_00419170
   (which is the multiplayer path). Contains dialogs + init + "In the Beginning."
3. **FUN_0048b340** — is the single player game loop (3048 bytes). Called from
   FUN_0041f8d9 (WinMain) AFTER FUN_0041eeeb returns with game initialized.
4. **DAT_00655b02** — checked for `< 3` to decide single player vs multiplayer
   game loop. Values: 0=singleplayer?, 1=hot-seat?, ≥3=network multiplayer.
   NOT the difficulty level (that's DAT_00655b08 / 0x00655B04).
5. **FUN_0041b8ff** — "In the Beginning" dialog. Shows starting techs. 339 bytes.
   Does NOT set DAT_00655af8 — that must happen in the game loop's first iteration.
6. **Pre-game zeroing** — FUN_0041f8d9 (WinMain) zeros the unit array (2048 slots)
   and city array (256 slots) BEFORE calling FUN_0041eeeb. This is the master reset.

## Remaining Questions (minor — don't block implementation)

1. **FUN_004a73d9** (212 bytes) — clears some state before rules loading. Probably
   zeros trade/diplomacy arrays. Not critical — FUN_004aa9c0 zeros everything anyway.
2. **FUN_0051f19c** — assigns civ slots per player. Sets leader_graphic_id which
   feeds into the sci/tax personality formula. Need to set this for AI civs.
3. **DAT_00655af8 = 0 → 1 transition** — init sets to 0, sniffing showed 1 at Turn 0.
   Likely incremented by the first iteration of FUN_0048b340 (game loop) before any
   turn processing happens. block_00480000.c:1816 does the per-turn increment.

## Dependencies for Headless (in execution order)

### Step 0: WinMain pre-init (FUN_0041f8d9 lines 7775-7787)
- Zero unit array (2048 × 32 bytes) — set unique_id=0, link fields=0xFFFF
- Zero city array (256 × 88 bytes) — set exists=0
- Set DAT_00655b16=0, DAT_00655b18=0
- `_memset(DAT_0064ba48, -1, 0xC0)` — clear 192-byte unit assignment table
- **Status:** We do SOME of this. FUN_004aa9c0 also zeros things. Need to verify.

### Step 1: Dialog parameter selection (FUN_0041ba52 dialogs)
- Set globals that dialogs would set:
  - `DAT_00655b08` = difficulty (0-5)
  - `DAT_0064bc24` = number of civs
  - `DAT_00655b0a` = active civs bitmask
  - `DAT_00655b0b` = human players bitmask
  - `DAT_00655b03` = human player's civ index
  - `DAT_006d1da0` = human player's civ index (runtime copy)
  - `DAT_00655ae8` = map shape flags
  - Map size → DAT_006d1160 (width), DAT_006d1162 (height)
  - Leader assignments per civ (feeds sci/tax personality)
- **Status:** We set some of these manually. Missing: leader assignments, civ count, active bitmask.
- **Approach:** Set these globals directly instead of running dialogs.

### Step 2: Rules loading (FUN_0041ba52 lines 6446-6449)
- `FUN_0041a046(1)` — load RULES.TXT (@COSMIC, @GOVERNMENTS, @LEADERS, etc.)
- `FUN_0041a5c4(1)` — load @UNITS → unit type table at DAT_0064b1b8 (stride 20)
- `FUN_0041a422(1)` — load @TERRAIN → terrain table at DAT_00627cc0 (stride 24)
- `FUN_00419c8b()` — load CITY.TXT, other data
- **Status:** We have rules-loader.js for @COSMIC, @UNITS, @TERRAIN. Missing: @GOVERNMENTS,
  @LEADERS, CITY.TXT. Need to check if FUN_0041a046/a5c4/a422 set anything our loader misses.
- **Approach:** Either call the transpiled C loaders OR expand rules-loader.js.

### Step 3: Map generation (FUN_00408d33, 6004 bytes)
- Needs: DAT_006d1160/1162 (map dims), working _rand/_srand
- Calls FUN_005b85fe() to generate seed
- Calls FUN_005b7fe0() to allocate tile memory:
  - `FUN_004bb870(size)` — GlobalAlloc → needs to return valid heap handle
  - `FUN_0046aad0(handle)` — GlobalLock → needs to return pointer into _MEM
  - Allocates 7 per-civ visibility arrays the same way
- Fills tiles: byte[0]=10 (ocean), then generates continents, terrain, rivers, resources
- 6000 bytes of generation code — uses _rand() extensively
- **Status:** NOT RUNNING. Our test manually fills tiles.
- **Approach:** Implement GlobalAlloc/GlobalLock to allocate from _MEM, then run
  FUN_00408d33. This is the BIGGEST blocker.

### Step 4: Civ initialization (FUN_004aa9c0, 1345 bytes)
- Zeros game state globals
- Calls new_civ(i) for each civ → zeros struct, sets gov/sci/tax, assigns starting techs
- Calls FUN_004a7754() → find valid land tiles, place settlers
- Sets DAT_00655af8 = 0 (turn counter)
- **Status:** We call this but it can't place settlers without a valid map.
- **Approach:** If Step 3 works, this should work automatically.

### Step 5: Post-init (FUN_0041b8ff + FUN_0041f8d9 post-init)
- "In the Beginning" dialog — show starting techs (can be stubbed)
- Palette/GDI/window setup (all stubbed for headless)
- FUN_004e1314() — recalculate all cities (may be important!)
- DAT_00654fd8 = 1 — "game ready" flag
- **Status:** Partially stubbed. FUN_004e1314 might be needed.

### Step 6: Game loop (FUN_0048b340, 3048 bytes)
- The single player turn loop
- Calls FUN_00489553(civIndex) per civ per turn
- Calls FUN_00543cd6() for AI dispatch
- Handles end-of-turn, game-over conditions
- **Status:** We call FUN_00489553/FUN_00543cd6 directly in test-fresh-game.js.
  Should ideally call FUN_0048b340 to get the full turn flow.

### Summary: What's actually blocking us

| Blocker | Impact | Fix |
|---------|--------|-----|
| GlobalAlloc/GlobalLock stubs | Map gen can't allocate tile memory | Implement allocator in _MEM |
| No map generation | No terrain, no valid positions | Run FUN_00408d33 |
| No civ slot assignment | No leader personality → wrong sci/tax | Set leader_graphic_id per civ |
| Missing dialog globals | Game parameters not set | Set directly in test harness |
| Not calling game loop | Missing per-turn bookkeeping | Call FUN_0048b340 or replicate its logic |
