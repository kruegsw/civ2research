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
FUN_004c4280 (block_004C0000.c) — MFC app entry wrapper
  └── FUN_0041f8d9 (block_00410000.c:7676) — WinMain equivalent (2326 bytes)
      └── FUN_0041eeeb (block_00410000.c:7343) — game session loop
          └── FUN_0051d9a0 (block_00510000.c:5340) — title screen / menu dispatch
              └── FUN_00419170 (block_00410000.c:4616) — "Start New Game" (1955 bytes)
                  ├── FUN_0051dd97 — setup dialogs (difficulty, civs, etc.)
                  ├── FUN_0051f19c — civ slot assignment loop
                  ├── FUN_0041a046 — load RULES.TXT
                  ├── FUN_0041a5c4 — load @UNITS
                  ├── FUN_0041a422 — load @TERRAIN
                  ├── FUN_00419c8b — load other data files
                  ├── FUN_00408d33 — MAP GENERATION (6004 bytes)
                  │   ├── FUN_005b85fe — generate map seed
                  │   ├── FUN_005b7fe0 — allocate tile memory
                  │   │   ├── FUN_004bb870 — GlobalAlloc
                  │   │   ├── FUN_0046aad0 — GlobalLock
                  │   │   └── Allocate 7 per-civ visibility arrays
                  │   ├── FUN_00408830 — fill tile fields
                  │   └── [5000 lines of terrain/continent generation]
                  ├── FUN_004aa9c0 — CIV INITIALIZATION (1345 bytes)
                  │   ├── FUN_00484cc0 — zero game flags
                  │   ├── FUN_004a76f5 — zero trade routes
                  │   ├── new_civ() × 8 — per-civ struct init
                  │   │   ├── Zero 1428-byte struct
                  │   │   ├── Set gov=Despotism, sci/tax rates
                  │   │   ├── Set all tech bytes to 0xFF
                  │   │   └── Starting tech assignment
                  │   └── FUN_004a7754 — find starting positions, place settlers
                  ├── FUN_004a9785 — scenario init (conditional)
                  ├── FUN_00578c12 — "In the Beginning" dialog
                  └── Return → game loop begins
```

## Resolved Questions

1. **FUN_005b85fe** — generates map seed: `DAT_006d1168 = rand() & 0x7FFF`
2. **DAT_00655af8** — set to 0 by FUN_004aa9c0. Must be incremented to 1
   before Turn 1 processing for tech gates to work. Likely by the turn
   increment at block_00480000.c:1816, or by FUN_00578c12 ("In the Beginning").

## Open Questions

1. **FUN_004a73d9** — called just before rules loading. What does it clear?
2. **FUN_005227e3** (773 bytes) — returns player count. Reads from dialogs or globals?
3. **FUN_0051f19c** — assigns civ slots per player. Sets leader, color, personality?
4. **FUN_00522f8f** — finalizes player setup.
5. **FUN_00578c12** — "In the Beginning" dialog. Does it increment DAT_00655af8?
   Does it do other game setup between init and Turn 1?

## Dependencies for Headless

To run the game from source, we need this chain to work:

1. **Memory allocation** — GlobalAlloc/GlobalLock must return valid _MEM regions
2. **Map generation** — FUN_00408d33 must run (6KB of terrain code, uses _rand)
3. **Civ init** — FUN_004aa9c0 must run (needs complete map for settler placement)
4. **Dialog stubs** — FUN_0040ffa0 (show dialog) and FUN_0040bc80 (get result)
   must return sensible defaults for difficulty, civ count, map size, etc.
5. **File I/O** — RULES.TXT loading works, but CITY.TXT and other files
   loaded by FUN_00419c8b may need working file stubs

The current approach of manually initializing state skips steps 2-4 entirely,
which leaves hundreds of globals unset and the AI non-functional.
