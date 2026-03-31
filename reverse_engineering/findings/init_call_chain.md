# Game Initialization Call Chain

Traced from decompiled C source. This documents every function called between
"Start a New Game" and the game loop, plus the complete game loop internals.

Source of truth: `reverse_engineering/decompiled/block_*.c`

NOTE: Two "new game" paths exist:
- **FUN_0041ba52** — single player path (the one we care about)
- **FUN_00419170** — multiplayer/hotseat path (different dialog flow, same init calls)

Both paths converge at the same init sequence: rules loading → map gen → civ init.

---

## Multiplayer Path: FUN_00419170 (block_00410000.c:4616)

Size: 1955 bytes. The MULTIPLAYER new game entry point (not single player).
Uses `FUN_0051dd97` for dialogs. Sets `DAT_00655b02 = 1` (hotseat mode).
NOT the path used for standard single player — see FUN_0041ba52 below.

Included here for completeness but **FUN_0041ba52 is the primary path**.

---

## Map Generation: FUN_00408d33 (block_00400000.c:1464)

Size: 6004 bytes. THE BIG ONE — creates the entire world map.

### Phase 1: Tile allocation (lines 1540-1554)
```
FUN_005b85fe()                            — generate map seed: DAT_006d1168 = rand() & 0x7FFF
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

DAT_00655af8 = 0                          — turn counter (incremented to 1 by first game loop)
DAT_00655afa = 0xf060                     — year value (overwritten by FUN_00484fec on first loop)
DAT_00655afc = 0xffff                     — scenario turn limit sentinel (-1 = no limit)
DAT_00655aea = flags                      — game options bitmask
DAT_006d1da8 = 1                          — "unit needs moving" flag (triggers unit selection in human turn)
DAT_00655b16 = 0                          — total units = 0
DAT_00655b18 = 0                          — total cities = 0

for each civ (0-7):
    FUN_004a74bc(civ)                     — clear civ scoring (military counts, unit counts)
    Zero military/wonder/unit counts
    DAT_0064c6aa[civ] = 0xFFFF           — beakers sentinel (0xFFFF = no research target)

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

## Game Loop: FUN_0048b340 (block_00480000.c:3248)

Size: 3048 bytes. The single player game loop. Called from WinMain when
DAT_00655b02 < 3 (single player or hotseat modes).

### Pre-loop setup (lines 3283-3290)
```
FUN_0059db08(0x4000)             — SEH setup
FUN_0042a768() × 2               — process pending Windows messages (called twice)
FUN_004e4ceb()                   — force full map redraw (no-op for headless)
if DAT_00655b02 == 1 (hotseat):
    DAT_006c31a9 = DAT_00655b0b  — save human bitmask
```

### Main loop (while true):

#### Step 1: Pre-turn setup
```
FUN_0048a92d()                   — compute min/max sci/tax rates across human civs (247 bytes)
  ├── Loops through civs 1-7, checks if human (DAT_00655b0b bit set)
  ├── Computes max and min of DAT_0064c6b7[civ*0x594 + offset] for 4 categories
  └── Stores in DAT_00673afc[0..3] (max) and DAT_00673af8[0..3] (min)
```

#### Step 2: End-of-previous-turn processing (if DAT_00628048 == 0)
```
FUN_00487371(-1)                 — END-OF-TURN (1744 bytes):
  if DAT_00655af8 != 0:          — skip on very first call (turn 0)
    FUN_00485c15()               — barbarian spawning (3297 bytes)
    FUN_00486c2e()               — civ elimination check (487 bytes)
    FUN_004853e7()               — RESEARCH PROCESSING for ALL civs (2094 bytes)
                                   (tech discovery, beaker accumulation)
    if DAT_00655b02 == 0:
      FUN_00486e6f()             — single-player-only processing (146 bytes)

  DAT_00655af8 = DAT_00655af8 + 1       — *** INCREMENT TURN COUNTER ***
  DAT_00655afa = FUN_00484fec(turn)      — *** CALCULATE YEAR ***
    (540 bytes — uses difficulty-based year tables at DAT_0062c490)
  if turn > 199: DAT_00655b14++          — late-game counter
  DAT_00655aee &= 0xfffe                — clear flag

  FUN_0048710a(-1)               — RESET ALL UNITS for new turn (615 bytes):
    FUN_00487007()               — clear supply/trade route refresh flags
    For each unit:
      - Reset moves_remaining (offset 0x08) = 0
      - Reset goto_turn_counter (offset 0x10) = 0
      - Clear flags (0x04): clear bits 0x10, 0x40
      - Handle spy/diplomat expiry (fuel countdown)

  Reputation decay (every (difficulty+1)*12 turns):
    For each civ:
      if reputation > 0: reputation -= 1
      Adjust attitude values using FUN_005adfa0 (clamp)

  Random events (FUN_00432611, etc.):
    DAT_00655c1e < DAT_00655af8 triggers random event check
    Next event = turn + rand()%40 + 20
```

#### Step 3: Game-over checks
```
FUN_0048aedc()                   — year/scenario end check (649 bytes):
  if year == 2000: show PLANRETIRE dialog
  if year == 2020: show DORETIRE, set game-over flag
  if scenario: check scenario end turn
  Returns nonzero if game should end

FUN_0048b165()                   — victory condition handler (450 bytes):
  switch(DAT_0064b1ac):
    case 1,2: FUN_004710d0 — space race victory screen
    case 3: FUN_00514e7b — domination victory
    case 4: FUN_004702e0 — diplomatic victory
    case 5: (year 2020 retirement)
  FUN_00431d22() — replay/demographics snapshot
  FUN_00435d15/4361cc/436f5a — hall of fame, rankings, score
  if single player: ask "Keep Playing?" (KEEPPLAYING dialog)
  Sets DAT_00655af0 |= 0x20 (post-victory flag)
```

#### Step 4: Per-civ processing loop
```
for civIdx = 0; civIdx < 8; civIdx++:
  skip if civIdx < DAT_00628048            — observer start civ (usually 0 in SP)
  skip if civ not in DAT_00655b0a          — skip inactive civs

  DAT_00655b05 = civIdx                    — set "currently processing" civ

  --- Hotseat UI (DAT_00655b02 == 1) ---
  [viewport save/restore, city window cleanup]

  --- HUMAN CIV PATH ---
  if civ IS human (DAT_00655b0b bit set):
    DAT_00655b03 = civIdx                  — human player index
    DAT_006d1da0 = civIdx                  — runtime active civ
    [hotseat: "In the Beginning" for first turn, viewport setup]
    [email mode: autosave + notification]

    // Casualty report (single player only)
    local_14 = DAT_006af220[civ] - DAT_006af240[civ]   — units killed this turn
    if local_14 > 0: show CASUALTY/CASUALTIES dialog

  --- PER-CIV TURN PROCESSING ---
  FUN_00489553(civIdx)                     — (679 bytes) MAIN PER-CIV PROCESSOR:
    DAT_0062c5b8 = 1                       — "processing" flag
    if human: count military units (DAT_0064caa8, 6 shorts)

    FUN_004d01ae(civ)                      — save old military counts to DAT_006a5b10 (90 bytes)
    FUN_0042a768()                         — process pending Windows messages

    // Gold cap enforcement
    if gold > 30000: gold = 30000
    if gold < -16384: gold = 30000         — overflow protection
    if gold < 0: gold = 0

    FUN_00488cef(civ)                      — UNIT PROCESSING (1438 bytes):
      For each unit owned by this civ:
        - Heal damaged units (restore HP based on terrain/city/fortress)
        - Fuel countdown for air units
        - Wake sleeping units if enemy nearby
        - Auto-unfortify if no longer on valid tile

    FUN_00487a41(civ)                      — *** CITY PROCESSING LOOP *** (3830 bytes):
      Zero civ scoring arrays (DAT_0064ca72, DAT_0064ca74[7], DAT_0063f580[28])

      For each city (REVERSED order, last → first):
        if city belongs to this civ:
          FUN_004f0a9c(cityIdx)            — *** PER-CITY TURN *** (1903 bytes):
            FUN_004ebbde(city)             — check if city disabled (returns nonzero → skip)
            FUN_004eb4ed(city, 1)          — YIELD CALC (food/shields/trade)

            food_box += food_produced - (city_size × unit_food_cost) - corruption
            [food shortage warning if food_box dropping fast]

            FUN_004ec3fe(city)             — GROWTH CHECK:
              if food_box >= threshold: grow city (size++)
              if food_box < 0: starve (size--, maybe lose pop)

            FUN_004eef23(city)             — PRODUCTION:
              shield_box += shields_produced
              if shield_box >= item_cost: complete item (unit/building/wonder)

            FUN_004eb4ed(city, 1)          — RE-CALC yields (post-growth)

            // Scoring: waste, happiness metrics → civ ranking arrays

            FUN_004ef578(city)             — DISORDER CHECK (civil disorder)
            FUN_004efbc6(city)             — disorder/celebration effects (We Love the King Day)
            if human: FUN_004efd44, FUN_004f0221 — notifications
            FUN_004f080d(city)             — end-of-city: update max shields, reset city window

      // AI sci/tax rate adjustment
      if AI civ:
        Compute new sci rate from leader personality (DAT_006554fa) + game state
        Enforce sci + tax + lux = 10

      // Military scoring for diplomacy/AI decisions

    FUN_00560084(civ)                      — DIPLOMACY & WONDERS (3345 bytes):
      Research completion check (FUN_0055c69d — tech discovery)
      AI attitude adjustments
      Border friction updates
      Reputation/patience per opposing civ
      Diplomatic status maintenance

    FUN_0053184d(civ)                      — AI MASTER BRAIN (14665 bytes):
      AI production decisions (what to build)
      AI city improvement priorities
      AI tech trading evaluation
      AI diplomatic strategy
      [Only meaningful for AI civs, but runs for all]

    FUN_00489292(civ, old_gold)            — END-OF-CIV (705 bytes):
      Detect gold change, show advisor if deficit
      Handle science advisor for human

    DAT_0062c5b8 = 0                       — clear "processing" flag

    // Autosave check
    if (DAT_00655aea bit 5) != 0:
      FUN_00488937(civ)                    — autosave (270 bytes)

  --- AI DISPATCH ---
  if civ is AI:
    FUN_00543cd6()                         — AI UNIT DISPATCH:
      Move all AI units, execute attacks, explore, etc.

  --- HUMAN TURN ---
  if civ is HUMAN:
    FUN_0048aa24()                         — POST-HUMAN SETUP (1208 bytes):
      Council dialog (every 50 turns)
      Tutorial prompts (turns 1, 20, 35, 40, 60, 80)

    FUN_0048a416()                         — *** HUMAN PLAYER TURN *** (1303 bytes):
      do {
        if DAT_006d1da8 == 1:              — there's an active unit to move
          Select unit, center viewport

        if no active unit:
          Set "end of turn" flag
          if first pass with no units: show "End of Turn" message
          Call FUN_004897fa(1) — trigger end-of-turn UI
        else:
          Process player input (FUN_0048a004 — movement, orders)

        if game over or end-turn: break
      } while (true);

      // After human turn: hide units for other human players (hotseat)
```

#### Step 5: Post-civ-loop cleanup
```
if no human civ acted this turn && single player (DAT_00655b02 == 0):
  DAT_00655b05 = DAT_006d1da0             — set human as active
  FUN_0048a416()                           — run human turn (shouldn't normally hit)

DAT_00655b0b = DAT_00655b0a & DAT_00655b0b — mask out eliminated humans

if DAT_00628044 == '\0':                    — game-over flag
  FUN_0055ae80(0)                          — cleanup
  return (exit game loop)
```

### Loop exit
```
If all humans dead (DAT_00655b0b == 0 in hotseat):
  Show HOTHUMANSDEAD dialog
  goto LAB_0048bf12 → exit

Normal exit:
  FUN_0048bf2d() → FUN_0059df8a()          — SEH cleanup
  FUN_0048bf43()                           — FS_OFFSET restore
  return
```

---

## Turn Counter Timing (RESOLVED)

The turn counter DAT_00655af8 follows this sequence:
1. **Init**: FUN_004aa9c0 sets DAT_00655af8 = 0
2. **First game loop iteration**: FUN_00487371 increments to 1, BUT
   the `if (DAT_00655af8 != 0)` guard means the sub-processing
   (barbarians, research, elimination) is SKIPPED on this first call
3. **Per-civ processing** then runs with DAT_00655af8 = 1
4. **Second iteration**: DAT_00655af8 = 1, sub-processing runs normally,
   then incremented to 2

This explains the sniffing observation: DAT_00655af8 = 1 at the first playable turn.

---

## Per-Civ Turn Processing: FUN_00489553 (block_00480000.c:2452)

Size: 679 bytes. Dispatcher that calls all per-civ sub-systems.

### Call chain:
```
FUN_00489553(civIndex)
  ├── FUN_004d01ae(civ)       — save military counts (90 bytes)
  ├── Gold cap enforcement    — inline (30000 max, overflow protection)
  ├── FUN_00488cef(civ)       — unit healing/fuel/wake (1438 bytes)
  ├── FUN_00487a41(civ)       — CITY PROCESSING LOOP (3830 bytes)
  │   └── FUN_004f0a9c(city)  — per-city turn (1903 bytes) — see below
  ├── FUN_00560084(civ)       — diplomacy & wonder processing (3345 bytes)
  ├── FUN_0053184d(civ)       — AI brain (14665 bytes)
  └── FUN_00489292(civ, gold) — gold change notification (705 bytes)
```

### Per-City Turn: FUN_004f0a9c (block_004F0000.c:257)

Size: 1903 bytes. The core city processing function.

```
FUN_004f0a9c(cityIdx)
  ├── FUN_004ebbde(city)      — siege/disability check (returns nonzero → skip city)
  ├── FUN_004eb4ed(city, 1)   — yield calculation (food, shields, trade from tiles)
  ├── Food box update         — food_box += (food - support)
  ├── FUN_004ec3fe(city)      — growth check (grow/starve based on food_box vs threshold)
  ├── FUN_004eef23(city)      — production (accumulate shields, complete items)
  ├── FUN_004eb4ed(city, 1)   — re-calc yields after growth/production changes
  ├── Scoring calculations    — waste, happiness → civ ranking arrays
  ├── FUN_004ef578(city)      — civil disorder check
  ├── FUN_004efbc6(city)      — disorder/celebration effects (We Love the King Day)
  ├── FUN_004efd44(city)      — human notification (if human civ)
  ├── FUN_004f0221(city)      — human notification (if human civ)
  └── FUN_004f080d(city)      — end-of-city: update max shields, reset city window
```

---

## End-of-Turn: FUN_00487371 (block_00480000.c:1792)

Size: 1744 bytes. Runs between turns for global processing.

```
FUN_00487371(param_1)                      — param_1 = -1 from game loop
  if DAT_00655af8 != 0:                    — skip on first call
    FUN_00485c15()                         — barbarian spawning (3297 bytes)
    FUN_00486c2e()                         — civ elimination (487 bytes)
    FUN_004853e7()                         — RESEARCH for all civs (2094 bytes)
    if single player: FUN_00486e6f()       — SP-only: check map reveal conditions (146 bytes)

  DAT_00655af8++                           — turn counter
  DAT_00655afa = FUN_00484fec(turn)        — year from turn (540 bytes)

  FUN_0048710a(param_1)                    — reset unit moves/flags (615 bytes)

  Reputation decay                          — every (difficulty+1)*12 turns
  Random events                             — rand()%40+20 turn interval
```

### Key insight for headless:
FUN_004853e7 handles **research for ALL civs** in a single pass at
end-of-turn, NOT inside per-civ processing. This means tech discovery
happens globally before any civ processes its turn.

---

## Summary: What Must Work for Headless

| Step | Function | Needs | Status |
|------|----------|-------|--------|
| 0 | WinMain pre-init | _memset | ✓ Zero arrays manually |
| 1 | Rules loading | File I/O | ✓ Working (rules-loader.js) |
| 2 | Dialog selections | Stubbed globals | ✓ Set globals directly |
| 3 | Civ slot assignment | leader_graphic_id per civ | ⚠ Need to set per civ |
| 4 | Tile memory allocation | GlobalAlloc, GlobalLock | ❌ Stubs return 0 |
| 5 | Map generation (6KB) | Tile memory + _rand | ❌ Never runs |
| 6 | Civ init + settler placement | Complete map | ❌ Runs but no map → no settlers |
| 7 | Game loop (FUN_0048b340) | Everything above | ❌ Calling sub-functions directly |

### Key blockers (in priority order):
1. **GlobalAlloc/GlobalLock** — need to return real _MEM offsets. These allocate:
   - Main tile array: `(mapWidth/2) * mapHeight * 6` bytes
   - 7 per-civ visibility arrays: same size each
   - Total: ~8 allocations × ~30KB each ≈ 240KB for standard map
2. **Map generation** — 6004 bytes of terrain generation. Needs allocator + _rand.
   Once allocator works, FUN_00408d33 should run as-is (it's transpiled).
3. **Civ initialization** — FUN_004aa9c0 needs complete map to place settlers.
   AI leaders assigned randomly inside new_civ(). Starting positions from
   DAT_00627fe0/00628010 per leader.
4. **Game loop** — FUN_0048b340 is the real turn loop. Currently we call
   FUN_00489553 + FUN_00543cd6 directly, missing:
   - FUN_00487371 (end-of-turn: turn counter, research, barbarians, unit reset)
   - FUN_0048aedc + FUN_0048b165 (game-over checks)
   - Proper civ iteration with DAT_00655b05 / DAT_006d1da0 management

### What we currently hack around:
- Manually allocate tile memory at _MEM end (TILE_DATA_BASE)
- Manually fill tiles with grassland
- Manually place cities and units
- Manually set civ fields (gov, sci, tax, beakers)
- Manually set exploration maps
- Skip steps 3-6 entirely
- Call sub-functions directly instead of game loop

### Implementation path:
1. Implement GlobalAlloc/GlobalLock as _MEM bump allocator
2. Run FUN_00408d33 (map gen) — get real terrain
3. Run FUN_004aa9c0 (civ init) — get real civs with settlers
4. Replace test harness turn loop with FUN_0048b340 call
   (stub UI functions: dialogs, viewport, city window)
5. For headless: stub FUN_0048a416 (human turn) to auto-end-turn

---

## Full Call Stack (top to bottom)

```
FUN_004c4280 (block_004C0000.c:1103) — MFC app entry wrapper (21 bytes)
│
└── FUN_0041f8d9 (block_00410000.c:7676) — WinMain equivalent (2326 bytes)
    │
    ├── PRE-GAME SETUP (lines 7775-7787):
    │   ├── FUN_00498784()              — advisor state init
    │   ├── FUN_004fa5d9(50000)         — timer init (50000ms = 50s budget)
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
    │   ├── FUN_004079a6()              — main window/viewport setup
    │   ├── FUN_0056aacb()              — wonder movies init
    │   ├── FUN_00413a90()              — sidebar/status bar init
    │   ├── citywin_DCB6()              — city window class init
    │   ├── FUN_004f4b9f()              — city production queue init
    │   ├── Palette/GDI setup           — (all no-ops for headless)
    │   ├── FUN_004e1314()              — unit cost adjustment for multiplayer (318 bytes)
    │   │                                (halves/doubles land unit costs based on DAT_00654fae)
    │   └── DAT_00654fd8 = 1            — game ready flag
    │
    └── FUN_0048b340 (block_00480000.c:3248) — *** SINGLE PLAYER GAME LOOP *** (3048 bytes)
        │   (called when DAT_00655b02 < 3, i.e. single player modes)
        │
        └── OUTER LOOP (each iteration = one game turn):
            │
            ├── FUN_0048a92d()                — pre-turn rates (247 bytes)
            │
            ├── FUN_00487371(-1)              — END-OF-TURN (1744 bytes)
            │   ├── FUN_00485c15()            — barbarian spawning (3297 bytes)
            │   ├── FUN_00486c2e()            — civ elimination (487 bytes)
            │   ├── FUN_004853e7()            — RESEARCH all civs (2094 bytes)
            │   ├── DAT_00655af8++            — increment turn counter
            │   ├── DAT_00655afa = year       — FUN_00484fec (540 bytes)
            │   └── FUN_0048710a(-1)          — reset unit moves (615 bytes)
            │
            ├── FUN_0048aedc()                — game-over check (649 bytes)
            │
            └── FOR EACH CIV (0-7):
                │
                ├── FUN_00489553(civ)          — PER-CIV TURN (679 bytes)
                │   ├── FUN_00488cef(civ)      — unit heal/fuel (1438 bytes)
                │   ├── FUN_00487a41(civ)      — CITY LOOP (3830 bytes)
                │   │   └── FUN_004f0a9c(city) — per-city (1903 bytes)
                │   │       ├── FUN_004eb4ed   — yield calc
                │   │       ├── FUN_004ec3fe   — growth
                │   │       ├── FUN_004eef23   — production
                │   │       └── FUN_004ef578   — disorder
                │   ├── FUN_00560084(civ)      — diplomacy (3345 bytes)
                │   ├── FUN_0053184d(civ)      — AI brain (14665 bytes)
                │   └── FUN_00489292(civ)      — gold notification (705 bytes)
                │
                ├── if AI: FUN_00543cd6()      — AI unit dispatch
                │
                └── if Human:
                    ├── FUN_0048aa24()         — council/tutorial (1208 bytes)
                    └── FUN_0048a416()         — player turn (1303 bytes)
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
FUN_004a73d9()              — save player defaults to CIV2.DAT (safe to stub)
FUN_0041a046(1)             — load RULES.TXT
FUN_0041a5c4(1)             — load @UNITS section → unit type table at DAT_0064b1b8
FUN_0041a422(1)             — load @TERRAIN section → terrain table at DAT_00627cc0
FUN_00419c8b()              — load CITY.TXT, other data files
FUN_00408d33(mapType)       — *** MAP GENERATION ***
FUN_004aa9c0()              — *** CIV INITIALIZATION ***
FUN_004a9785(...)           — scenario bonus (only if DAT_00631ee8 != 0)
FUN_0041b8ff(humanCiv)      — "In the Beginning" dialog (shows starting techs)
```

## All Questions Resolved

No unknowns block headless implementation.

## Resolved Questions (ALL)

1. ~~**FUN_004a73d9**~~ — **RESOLVED**: WRITES CIV2.DAT file (212 bytes). Saves
   DAT_0064bc10 (0x48 bytes) and DAT_00666538 (0x1BC bytes) to disk. This is
   player defaults persistence, NOT game state clearing. Safe to stub for headless.

2. ~~**FUN_0051f19c**~~ — **RESOLVED**: Human civ/tribe selection dialog (9815 bytes).
   Shows gender/tribe dialogs, sets:
   - `civ[humanCiv].leader_graphic_id = selectedLeader` (line 6419/6257)
   - `DAT_00655b0b |= (1 << humanCiv)` (human bitmask)
   - Leader name strings, gender byte
   For headless: set leader_graphic_id directly per civ.

3. ~~**AI leader assignment**~~ — **RESOLVED**: Handled inside new_civ()
   (block_004A0000.c:2798-2802). Randomly picks unused leader:
   ```
   local_24 = random available leader index
   civ[param_1].leader_graphic_id = local_24
   personality_table[local_24].used_count += 1
   ```
   Then at line 2928-2930, AI sci/tax set from this leader's personality:
   ```
   civ.sci = DAT_006554fa[leader * 0x30] + 3
   civ.tax = 9 - sci
   ```
   Starting position uses predefined coords: `DAT_00627fe0[leader * 2]` (x),
   `DAT_00628010[leader * 2]` (y).

4. ~~**DAT_00655af8 = 0 → 1 transition**~~ — **RESOLVED**: FUN_00487371 (line 1816)
   increments turn counter at START of each game loop iteration. First call:
   DAT_00655af8 = 0 → skips sub-processing → increments to 1 → per-civ runs with 1.
   The `if (DAT_00655af8 != 0)` guard ensures barbarians/research don't run on turn 1.

5. **FUN_005b85fe** — generates map seed: `DAT_006d1168 = rand() & 0x7FFF`

6. **FUN_0041ba52** — is the real game launcher (6555 bytes), NOT FUN_00419170
   (which is the multiplayer path). Contains dialogs + init + "In the Beginning."

7. **FUN_0048b340** — single player game loop (3048 bytes). Complete flow documented above.

8. **DAT_00655b02** — game mode: 0=singleplayer, 1=hot-seat, 2=email, ≥3=network.
   NOT the difficulty level (that's DAT_00655b08).

9. **FUN_0041b8ff** — "In the Beginning" dialog (339 bytes). Shows starting techs.
   Does NOT set DAT_00655af8.

10. **Pre-game zeroing** — FUN_0041f8d9 zeros unit array (2048 × 32 bytes) and
    city array (256 × 88 bytes) BEFORE calling FUN_0041eeeb.

11. **FUN_004e1314** — unit cost doubling for multiplayer (318 bytes).
    Adjusts costs based on DAT_00654fae. Not relevant for headless SP.

12. **Research processing** — FUN_004853e7 (2094 bytes) runs at END-OF-TURN for
    ALL civs simultaneously, NOT inside per-civ processing. This means all civs
    discover techs at the same time before any civ processes its turn.

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
- Calls FUN_005b85fe() to generate seed: `DAT_006d1168 = rand() & 0x7FFF`
- Calls FUN_005b7fe0() to allocate tile memory (8 allocations total):
  - Main tile array: `total_tiles * 6` bytes → stored at DAT_00636598
  - Per-civ visibility: 7 arrays of same size → stored at DAT_006365c0[1..7]
- Fills tiles: byte[0]=10 (ocean), then generates continents, terrain, rivers, resources
- 6000 bytes of generation code — uses _rand() extensively
- **Status:** NOT RUNNING. Our test manually fills tiles.
- **Approach:** Implement GlobalAlloc/GlobalLock to allocate from _MEM, then run
  FUN_00408d33. This is the BIGGEST blocker.

#### Allocator call chain (traced to extern-stubs.js):
```
FUN_005b7fe0 (block_005B0000.js:3110)
  calls FUN_004bb870(size)             — block_004B0000.js:5109
    stores size at DAT_00634818
    calls FUN_005dce4f(size)           — block_005D0000.js:9121
      calls GlobalAlloc(0x42, size)    — extern-stubs.js:162 (RETURNS HANDLE)
      flag 0x42 = GMEM_MOVEABLE | GMEM_ZEROINIT
    returns handle (or 0 on failure)
  stores DAT_006d1170 = handle

  calls FUN_0046aad0(handle)           — block_00460000.js:2901
    calls FUN_005dcdf9(handle)         — block_005D0000.js:9084
      if handle == 0: return 0
      calls GlobalLock(handle)         — extern-stubs.js:166 (RETURNS POINTER)
    returns pointer
  stores DAT_00636598 = pointer (tile data start)
```

**Current problem:** `extern-stubs.js` returns `undefined` from `stubCall()`.
FUN_0046aad0 returns void (undefined) instead of the pointer — the transpiled
code at block_00460000.js:2904 says `FUN_005dcdf9(param_1); return;` (missing
the return value). The C source shows it should `return FUN_005dcdf9(param_1)`.

#### _MEM layout:
```
Current buffer: 961,280 bytes (0xEAE00)
Base offset:    0x61c068 (all DAT_ addresses are offsets into this)
Highest known data: ~0x6D2000
Free space:     ~0x6E0000 to 0x706E68 (~160KB)

Needed for standard map (80×50):
  Total tiles = (80/2) × 50 = 2,000
  Tile array = 2000 × 6 = 12,000 bytes
  Vis arrays = 2000 × 7 = 14,000 bytes
  Total = ~26KB

Needed for large map (100×100):
  Total tiles = (100/2) × 100 = 5,000
  Total = ~65KB

→ Current buffer has room. But should expand to ~2MB for safety.
```

### Step 4: Civ initialization (FUN_004aa9c0, 1345 bytes)
- Zeros game state globals
- Calls new_civ(i) for each civ → zeros struct, sets gov/sci/tax, assigns starting techs
- Calls FUN_004a7754() → find valid land tiles, place settlers
- Sets DAT_00655af8 = 0 (turn counter)
- **Status:** We call this but it can't place settlers without a valid map.
- **Approach:** If Step 3 works, this should work automatically.

### Step 5: Post-init (FUN_0041b8ff + FUN_0041f8d9 post-init)
- "In the Beginning" dialog — show starting techs (stub for headless)
- Palette/GDI/window setup (all stubbed for headless)
- FUN_004e1314() — unit cost doubling for multiplayer (NOT city recalc). Skip for SP.
- DAT_00654fd8 = 1 — set "game ready" flag
- DAT_00628044 = '\x01' — set "game active" flag (checked by game loop exit condition)
- **Status:** Stub dialogs, set flags directly. Nothing critical here.

### Step 6: Game loop (FUN_0048b340, 3048 bytes)
- The single player turn loop — fully traced above
- For headless all-AI: stub FUN_0048a416 (human turn) to auto-end-turn
- Stub UI functions: FUN_0040ffa0 (dialogs), FUN_0042a768 (redraw),
  FUN_004e4ceb (repaint), FUN_0047cf9e (viewport), citywin_* (city window)
- The loop WILL call all the right functions in the right order
- **Status:** Should be called instead of manual turn loop in test harness

### Summary: What's actually blocking us

| Blocker | Impact | Fix | Difficulty |
|---------|--------|-----|------------|
| GlobalAlloc/GlobalLock stubs | Map gen can't allocate tile memory | _MEM bump allocator | Easy |
| No map generation | No terrain, no valid positions | Run FUN_00408d33 | Easy (if allocator works) |
| No civ slot assignment | No leader personality → wrong sci/tax | Set leader_graphic_id or let new_civ() do it | Easy |
| Missing dialog globals | Game parameters not set | Set directly in test harness | Easy |
| Not calling game loop | Missing turn counter, research, unit reset | Call FUN_0048b340 | Medium (stub UI) |
| UI stubs incomplete | Game loop calls many UI functions | Stub all to no-ops | Medium (many functions) |

### Known transpilation bugs that must be fixed

1. **FUN_0046aad0 missing return** — block_00460000.js:2904 says
   `FUN_005dcdf9(param_1); return;` but C source returns the value:
   `return FUN_005dcdf9(param_1)`. Without this fix, GlobalLock returns
   undefined and all tile pointers are 0. Fix: add `return` before the call.

2. **_MEM buffer too small** — globals.js allocates 961,280 bytes. Heap
   allocations for map data need additional space. Expand to ~2MB.

3. **extern-stubs.js GlobalAlloc/GlobalLock** — currently return undefined
   via `stubCall()`. Must be replaced with real _MEM bump allocator.

### Key globals reference

**Turn state:**
- `DAT_00655af8` — turn counter (short, 0-based, incremented at start of loop)
- `DAT_00655afa` — year (calculated from turn counter + difficulty)
- `DAT_00655b14` — late-game counter (incremented when turn > 199)
- `DAT_00628044` — game active flag ('\x01' = running, '\x00' = game over)
- `DAT_00628048` — observer/load start civ index (usually 0)
- `DAT_0064b1ac` — victory condition (0=none, 1-5=victory types)

**Civ identification:**
- `DAT_00655b05` — currently processing civ index (set in loop)
- `DAT_00655b03` — human player's civ index
- `DAT_006d1da0` — runtime active civ (viewport owner, diplomacy context)
- `DAT_00655b0a` — active civs bitmask (bit N = civ N exists)
- `DAT_00655b0b` — human players bitmask (bit N = civ N is human)
- `DAT_00655b02` — game mode (0=SP, 1=hotseat, 2=email, ≥3=network)

**Game parameters:**
- `DAT_00655b08` — difficulty (0=Chieftain, 5=Deity)
- `DAT_00655b09` — barbarian level
- `DAT_00655ae8` — game options bitmask (bit 15 = round map)
- `DAT_00655aea` — game rules bitmask (bit 5 = autosave, etc.)
- `DAT_00655af0` — game flags (bit 5 = post-victory, bit 2/3 = year speed)
- `DAT_0064bc24` — number of civs setting
- `DAT_0064bcb8` — scenario end turn (0 = no scenario)

**Map:**
- `DAT_006d1160` — map width
- `DAT_006d1162` — map height
- `DAT_006d1164` — total tiles (width/2 × height)
- `DAT_006d1168` — map seed
- `DAT_00636598` — pointer to tile data array (6 bytes per tile)
- `DAT_006365c0[0..7]` — per-civ visibility arrays

**Arrays:**
- Unit array: base `DAT_006560f0`, stride 0x20 (32 bytes), max 2048
- City array: base `DAT_0064f340`, stride 0x58 (88 bytes), max 256
- Civ array: base `DAT_0064c6a0`, stride 0x594 (1428 bytes), 8 civs
- Unit type table: base `DAT_0064b1b8`, stride 0x14 (20 bytes), 62 types
- Leader personality: base `DAT_006554fa`, stride 0x30 (48 bytes), 21 leaders
- Terrain table: base `DAT_00627cc0`, stride varies by section

---

## Detailed Function Traces

### FUN_005b7fe0 — Tile Memory Allocation (block_005B0000.c:2940)

**12 total allocations**, all via FUN_004bb870 (GlobalAlloc) → FUN_0046aad0 (GlobalLock):

1. **Main tile array**: `(mapWidth/2) * mapHeight * 6` bytes, 4-byte aligned
   - Handle → `DAT_006d1170`, pointer → `DAT_00636598`
   - Init: each tile = `[10, 0, 0, 0, 0, 0]` (terrain=10=ocean, rest zero)

2. **Per-civ visibility** (×7, civs 1-7): `totalTiles` bytes each, 4-byte aligned
   - Handles → `0x6365a0 + civ*4`, pointers → `DAT_006365c0 + civ*4`
   - Init: `_memset(ptr, 0, totalTiles)` — all tiles unexplored

3. **Visibility summary bitmaps** (×4): `alignedWidth * alignedHeight` bytes each
   - Handles → `DAT_006d1174/78/7c/80`, pointers → `DAT_006365e0/e4/e8/ec`
   - NOT initialized (left uninitialized, written later)

4. **Init flag**: `DAT_006365f0 = 1` — marks allocation complete

Computed globals:
- `DAT_006d116a = (mapWidth + 3) >> 2` — aligned width (ceil div 4)
- `DAT_006d116c = (mapHeight + 3) >> 2` — aligned height (ceil div 4)
- `DAT_006d1164 = (mapWidth / 2) * mapHeight` — total tile count

### FUN_00408d33 — Map Generation (block_00400000.c:1464, 6004 bytes)

**10-phase algorithm:**

1. **Display setup** — palette, viewport (all UI, stubbed for headless)
2. **New game init** (param_1 == 0):
   - Clear 21 starting position pairs at DAT_00627fe0/00628010 to 0xFFFF
   - `FUN_005b85fe()` — generate seed: `DAT_006d1168 = rand() & 0x7FFF`
   - `FUN_005b7fe0()` — allocate tile memory (see above)
   - Set wrapping: `DAT_006d1166 = DAT_00655ae8 & 0x8000`
   - Set continent bounds: `DAT_0063cb9c=3, DAT_0063cb98=width-3`
   - Random north/south bias: `rand() & 1` → concentrate continents top or bottom
3. **Continent generation**: Random walk algorithm
   - Target tiles = `(mapArea/800) * ((landmass*8+8+difficulty*8)*5 + 80) * 8 / 10`
   - `FUN_0040a572(0)` per continent — random position → grow via random walks
   - Walk sizes: 1-48 steps (large), 1-64 steps (small), branching at 25% per step
   - `FUN_0040a892(x,y)` marks 3 cells per step (spread pattern)
4. **Island placement**: Fill remaining continent slots (max 64) with small islands
   - `FUN_0040a572(1)` — 1-16 step walks, with 30%/20% chance of extra walks
5. **Water smoothing**: Diagonal checkerboard pass to remove single-tile peninsulas
6. **Terrain assignment**: Latitude-based gradient
   - Distance from equator → terrain type (desert near equator, forest/tundra near poles)
   - `local_4c = height/12` (or height/8 if wrapping) — terrain scale factor
   - Switch: 0=desert, 1-3=plains, 4=forest/plains 50/50, 5-6=forest, 7+=mountains
7. **Pole erosion**: Two backward sweeps transform terrain near poles
   - Desert→plains, plains→grassland, swamp→jungle, forest→jungle
8. **Resource placement** (2 passes):
   - **Density scatter**: `(DAT_00624ef8*5+10)*160` iterations, random walk with terrain upgrades
   - **Mineral clustering**: 8-neighbor voting system for terrain smoothing
9. **Edge hardening** (flat maps only): Mountain borders + snow at corners
10. **Island detection**: Mark isolated water bodies with 0x40 flag

Key data: `DAT_00624ee8` (landmass %), `DAT_00624eec` (difficulty), `DAT_00624ef8` (resource %)

Uses ~38 calls to `_rand()`.

### FUN_004aa9c0 + new_civ — Civ Initialization (block_004A0000.c:3518)

**FUN_004aa9c0** zeroes all game state then calls new_civ() for each civ 0-7:

Key zeroed arrays:
- `DAT_00655be6[0x1c]` (wonders) → all 0xFFFF (no owner)
- `DAT_00655b1e[100]` + `DAT_00655b82[100]` (tech discovery bitmasks) → all 0
- `DAT_00655c38[0x96*8]` (beaker history) → all 0
- Per-civ military/wonder/unit counts → all 0

**new_civ(civIndex)** — per-civ initialization:

1. **Zero & defaults**: gold=0, gov=Despotism(1), sci=4, tax=4, beakers sentinel=0xFFFF
2. **Diplomacy**: Self-relation=100. AI-to-AI: `rand()%80 + 10` (range 10-90).
   AI-to-human: `clamp(difficulty*5 + rand()%80 + 10, 10, 75)`
3. **Tech assignment** (only when `DAT_00655af8 != 0`):
   - For each of 99 techs: if eligible, `rand() % (difficulty + 1)`. Nonzero → grant.
   - Chieftain(0)=never, Deity(5)=83% per tech
   - Calls `FUN_004bf05b(civ, tech, civ, 0, 0)` to grant
4. **Leader selection** (AI civs only):
   - 3-pass search: find leaders where `DAT_006554fe[leader*0x30]` matches civ slot
   - First check unused leaders (`DAT_006554fb[leader*0x30] == 0`), then retry allowing reuse
   - Random pick from available: `rand() % count`
   - Override with preset if `DAT_0062ced0[civ] != 0xFF` (scenario preset)
   - Personality toggle: 1/3 chance to flip `DAT_006554fc[leader*0x30] ^= 1`
   - Sets `civ.leader_graphic_id`, marks leader as used
5. **AI sci/tax**: `sci = DAT_006554fa[leader*0x30] + 3`, `tax = 9 - sci`
6. **Settler placement** (max 2001 random attempts):
   - Random (x,y) with edge constraints (8 tiles from borders on large maps)
   - Validate: terrain desirability, min distance from existing units
   - Acceptance loosens with attempts: `terrain >= 12 - (attempts>>5)`, `distance >= 16 - (attempts>>7)`
   - If accepted: `FUN_005b3d06(0, civ, x, y)` creates settler
   - If `DAT_00655af8 > 0x14` (turn 20+): also place second unit (warrior?)
   - Explore 20 tiles around starting position for this civ
7. **Failure**: If no position found in 2001 tries, deactivate civ (`DAT_00655b0a &= ~bit`)

**FUN_004a7754** — Starting position scoring:
- For each civ: score = distance to others + nearby terrain quality
- 9-19 tiles from another civ: +1, 20+: +2
- 3+ forests nearby: +2, 4+ mountains: +4
- Worst-scoring civs get extra production to compensate

### FUN_004853e7 — Research Processing (block_00480000.c:984, 2094 bytes)

Runs at end-of-turn for ALL civs simultaneously.

**Beaker accumulation formula** (normal mode):
```
beakers[civ] = DAT_0064c6b0[civ*0x594] * 3
             + DAT_0064c70c[civ*0x594] * 8
             + (DAT_0064c6a2[civ*0x594] >> 5)
```
Plus building modifier: loop 62 buildings, each contributes based on type/count.

**Ranking**: Greedy sort assigns ranks 1-7 by beaker count.
- `DAT_00655c22[civ]` = 8 - rank (higher = better)
- `DAT_00655c2a[rank]` = civ at that rank (reverse lookup)
- `DAT_00655c20` = rank of best human civ (the "leader")

**Tech discovery trigger**: If human civ has science > 4 AND turn > 200 AND difficulty > 0.
Or if difficulty > 3 and FUN_004a7577 returns true.

**AI difficulty bonus**: When triggered, AI civs may receive bonus tech discovery.
Probability: `rand() % 32 <= difficulty`. Higher difficulty → more frequent bonuses.

**Beaker history**: Stored at `DAT_00655c38[slot*8 + civ]`, clamped to 0-255.
Slot = `(turn >> 2) % 150` (one entry per 4 turns, wraps every 600 turns).

### FUN_00486c2e — Pollution/Global Warming (block_00480000.c:1585, 487 bytes)

NOT civ elimination directly — tracks pollution level.

**Pollution formula**: `2*threshold - 4*pollution_counter - spaceship_count`
where threshold = average wealth across alive civs.
Pollution level (`DAT_00655b0e`) increments/decrements toward target, clamped 0-99.

**Global warming trigger**: When `DAT_00655b0e > 16` (0x10):
- `DAT_00655b0f++` (warming counter)
- `FUN_004868fb(old_counter)` — applies warming effects (terrain degradation)
- `DAT_00655b0e = 0` — reset pollution level

**Warning**: At pollution == 12, shows "FEARWARMING" dialog.

### FUN_004ec3fe — City Growth (block_004E0000.c:4782, ~10K bytes)

**Growth threshold**: `(city_size + 1) * DAT_006a6560`
- `DAT_006a6560` = food rows from RULES.TXT @COSMIC

**Growth triggers** when `food_box >= threshold`:
- `city_size += 1`
- Food box reset:
  - **Without granary**: `food_box = 0`
  - **With granary**: `food_box = (new_size+1) * (DAT_0064bccb >> 1)` (half threshold)
  - Granary check: `FUN_0043d20a(city, 3)` (building ID 3)

**Starvation** when `food_box < 0`:
- Try to disband a unit in the city first (`FUN_005b5d93`)
- If no unit: `city_size -= 1`
- If `city_size < 1`: `delete_city(city, 0)` then `kill_civ(owner, 0)`
- Food box reset to 0 after starvation

### FUN_004eef23 — City Production (block_004E0000.c:5693, 1621 bytes)

**Shield accumulation**: `shield_box += produced_shields` (clamped to not exceed cost)

**Completion** when `shield_box >= cost`:
- For **units**: Create unit at city tile via FUN_005b3d06
- For **wonders**: Check wonder race (other civ building same wonder). If won:
  - `DAT_00655be6[wonder*2] = city_index` (mark wonder as built)
  - `city_flags |= 0x100` (wonder-built flag)
- `shield_box -= cost` (leftover shields carry forward)

**AI production bonus** (difficulty-based):
- `extra_shields = (difficulty * base_shields) / 10 / (8 - leader_rank)`
- Wealthier AI civs get progressively less bonus (halved at 1000 gold, zero at 2000)

### FUN_00543cd6 — AI Unit Dispatch (block_00540000.c, 801 bytes)

**Two-pass loop** over all units (descending order):
- Pass 1: Process AI units only (skip human-owned)
- Pass 2: Process remaining units (allows human-owned units in some modes)

**Per unit**: Call `FUN_00543b80()` — the actual per-unit AI decision function.
- Max 20 actions per unit per turn (`local_14 > 0x14` → stop)
- After primary action, may call FUN_00543b80 again if unit can still move and has valid target

**Connection to FUN_0053184d**: The AI brain (14665 bytes) runs FIRST during per-civ processing
to make strategic decisions. FUN_00543cd6 then EXECUTES those decisions unit by unit.

### FUN_00485c15 — Barbarian Spawning (block_00480000.c:1168, 3297 bytes)

**Spawn gate** (earliest turn barbarians can appear):
- Formula: `((3 - barb_level) * 3 + 30) * (5 - difficulty)`
- Level 1: 36 turns × (5-difficulty). Level 3: 30 turns × (5-difficulty)
- Deity(5): barbs from turn 15-18

**Spawn frequency**: Every 15 turns (level 1) or 7 turns (level 2-3)
- Condition: `(frequency_mask & (turn + 1)) == 0`

**Tile selection** (max 1000 random attempts):
- Random (x, y) with y restricted to [3, height-3] (avoid poles)
- Must be: unoccupied, no adjacent hostile city, terrain desirability ≥ 16

**Unit count**: `clamp(turn / ((3-level)*-50+250) + 1, 1, 5) + 1`
- Level 3 adds +1 extra unit
- Examples: Turn 100 level 1 → 2 units. Turn 200 level 3 → 3 units.

**Unit types**: Base warriors, upgrades at higher difficulty/later turns.
Level 3 + turn > 149: chance for mounted/advanced units.

**City-based spawning** (separate path):
- Pick random city, check spawn probability via FUN_00579dbb
- Spawn within 13×13 box around city
- Unit type from city's available pool, scaled by difficulty

### FUN_004eb4ed — City Yield Calculation (block_004E0000.c, 132 bytes entry)

**5-stage pipeline** called twice per city per turn (before and after growth):

```
FUN_004eb4ed(cityIdx, 1)
  ├── FUN_004e7641(city)    — mark walkable tiles (653 bytes)
  │   Iterates 24 tiles in city radius using offset arrays:
  │   DAT_00628370[0..23] (X offsets), DAT_006283a0[0..23] (Y offsets)
  │   Sets DAT_006a6530[0..23] per-tile flags:
  │     0x01=off-map, 0x04=unit blocks, 0x08=enemy city, 0x10=border conflict, 0x20=river
  │
  ├── FUN_004e7967(city)    — culture distance & borders (1048 bytes)
  │   Scans all cities for proximity conflicts
  │   DAT_006a6588 = distance to nearest friendly city
  │   DAT_006a6600 = index of nearest friendly city
  │   DAT_006a6574 = conflict flag
  │
  ├── FUN_004e80b1(city)    — unit maintenance (1497 bytes)
  │   AI maintenance = 13 - difficulty (+ modifiers)
  │   Human maintenance = DAT_0064bccc (@COSMIC value)
  │   DAT_006a657c = computed maintenance rate
  │   DAT_006a6568 = supplied units count
  │
  └── FUN_004eb4a1(city)    — finalize (76 bytes)
      ├── FUN_004e8f42(city) — sum food/shield/trade across worked tiles
      ├── FUN_004eb327(city) — apply government happiness penalties
      ├── FUN_004e97ae(city) — compute population growth
      ├── FUN_004e9c14(city) — check starvation/celebration
      └── FUN_004ea8e4(city) — update city unit roster
```

**Core tile yield: FUN_004e868f(city, tileIdx, yieldType)** — 1528 bytes

The heart of the yield system. Called for each worked tile × 3 yield types.

**Base yield lookup**:
```
yield = DAT_00627cca[(resource_type * 11 + terrain_type) * 0x18 + yieldType]
```
- `terrain_type` from `FUN_005b89bb(x, y)` (0-10)
- `resource_type` from `FUN_005b8ee1(x, y)` (0-10)
- Table at `DAT_00627cca`: 11 resources × 11 terrains × 24 bytes = 2904 bytes

**Improvement modifiers** (from tile feature flags via `FUN_005b94d5`):
- **Irrigation** (bit 0x02): food += `DAT_00627cd0[terrain * 0x18]`
- **Mining** (bit 0x08): shields += `DAT_00627cd1[terrain * 0x18]`
- **Road** (bit 0x10): trade += 1
- **Railroad** (bit 0x20): yield *= 1.5 (shields and trade)
- **Special resource** (byte 0 bit 0x80): trade += 1

**Building/wonder bonuses**:
- Granary (building 3): affects growth threshold
- Agriculture tech: irrigation+mining gives ×1.5 food
- Banking tech (wonder 8): +1 shield per tile
- Colossus (wonder 0x43): trade bonus
- Communism tech: trade ×1.5

**Government penalty** (Despotism): If yield > 2 and city not exempt → yield -= 1

**City center** (tileIdx == 0x14): minimum 1 shield guaranteed

**Barbarian tile**: yield = (yield + 1) / 2 (halved, rounded up)

### FUN_00560084 — Diplomacy Per-Civ (block_00560000.c, 3345 bytes)

**Per-turn processing for one civ:**

1. **Clear flags**: `DAT_0064c6a0[civ*0x594] &= 0xFFB7` (clear research/wonder bits)
2. **Research check**: `FUN_0055c69d(civ, tech)` — checks if tech completed
   - Research completion triggers government overthrow check
   - Govt upset duration = `4 - (tech_index >> 1)` turns
3. **Random attitude**: `DAT_0064c6b6[civ*0x594] = rand() % 100`
4. **Peace toggle**: 33% chance to flip peace flag (bit 0x04)
5. **Border friction cooldown**: `DAT_0064c6bf[civ*0x594] -= 1` every 3 turns

**Per-other-civ diplomatic processing** (inner loop, civs 1-7):

**Diplomatic flags** at `DAT_0064c6c0[otherCiv*4 + civ*0x594]`:
- Bit 0x01: treaty exists
- Bit 0x08: rage mode (border friction active)
- Bit 0x20: at war
- Bit 0x40: contact/visibility established
- Bit 0x800: cleared every 32 turns
- Bit 0x40000: cleared every 32 turns
- Bit 0x400: cleared every 16 turns

**Border friction mechanism**:
- Trigger probability: `1 / random(anger_level, 1, 3)`
- `anger_level = 3 - (DAT_0064c6be[otherCiv*0x594] >> 2)` — range 0-3
- First trigger: enter "rage mode" (set flags 0x80840), record turn
- Second trigger: call `FUN_00456f20(civ, other, 100)` — actual friction event
- Turn tracking: `DAT_0064ca82[civ*2 + other*0x594]` = last conflict turn

**Post-loop**: `FUN_0055f7d1(civ)` — treaty evaluation; `FUN_00562021(civ, other)` — alliance events

### FUN_0053184d — AI Master Brain (block_00530000.c:401, 14665 bytes)

**Single-pass state machine**, not a loop. Runs once per AI civ per turn.

**8 sections:**
1. **Espionage/diplomat handling** (456-519): Move spy units toward enemy cities
2. **Government capacity init** (520-561): Count unit capacities, zero per-city arrays
   - `DAT_0064c6b7[civ*0x594 + 0..3]` = capacity per gov type
   - Zeros: `DAT_0064c832` (combat), `DAT_0064c972` (trade), `DAT_0064c9b2`, `DAT_0064c9f2` (threats)
3. **Building improvements sum** (562-595): Count settlers, link units to cities
   - Settlers tracked in `local_144`, per-city counts in stack arrays
4. **Unit state processing** (596-741): MASSIVE per-unit loop
   - For each unit owned by civ: get position, find city, set flags
   - Settler logic: production capacity based on gov type (4/3/2), defensive quotas
   - Sets unit flag 0x200 for special routing
5. **City defense/threat analysis** (816-942): Per-city threat assessment
   - Compares military strength via `DAT_0064c8b2` arrays
   - Sets `DAT_0064ca32[civ*0x594 + city]` = AI city state:
     - 0=under attack, 1=contested, 4=hold, 5=expand
6. **Research & civic goals** (947-1250): Reverse unit loop
   - Complex diplomacy-informed unit targeting
   - Calls `FUN_00531607(unit, order, x, y)` to set movement orders
   - City improvement targeting: iterate improvements, pick closest
7. **Unit cleanup** (1252-1262): Clear city flags 0x200 and 0x400
8. **Final cleanup** (1263): `FUN_00493602(param_1)` — per-civ end-of-turn

**Key helper functions:**
- `FUN_00531607(unit, order, x, y)` — set unit order:
  - `unit.status = 0x0B` ("executing order")
  - `unit.order = order_byte` (0x31=settle, 0x42=fortify, 0x58=attack, etc.)
  - `unit.goto_x = x`, `unit.goto_y = y`
- `FUN_00531287(unit)` — get unit action type:
  - Reads `DAT_0064b1ca[unit_type * 0x14]` (action lookup table)
  - Returns: 0=military, 1=settler, 2=engineer, 5=transport (0x15 if flagged)

### FUN_00538a29 — Per-Unit AI Decision Engine (block_00530000.c, 44777 bytes)

The **largest function in the entire codebase**. Called via FUN_00543b80 for each AI unit.

**Initial setup:**
- Reads current unit from `DAT_00655afe` (active unit index)
- If civ == 0 (barbarians): delegates to `FUN_005351aa()` (separate barbarian handler)
- If unit action > 3: skip
- Gets unit position, terrain, continent ID, threat level

**7 unit sub-action types** (determined by `FUN_00531287`):
- **Type 0** (military): Combat targeting, threat-based movement
- **Type 1** (settler): City founding, distance scoring
- **Type 2** (engineer): Improvement work orders
- **Type 3** (diplomat): City infiltration, incite scoring
- **Type 5** (transport): Naval routing
- **Type 6** (diplomat cached): Same as 3 with cached target
- **Type 7** (air unit): Landing site selection, attack targeting

**Movement target selection:**
- Scans 8 directions (land) or 20 directions (naval)
- Scores each by threat level at destination (`FUN_005b8c42`)
- Prefers tiles on same continent
- Attack decisions use distance + threat + alliance status

**Settler city founding:**
- Checks if position is valid for settling
- Starting position preference: `DAT_00627fe0/00628010[leader*2]`
- Turn 1 special case: rush to starting position

**Diplomat target scoring:**
```
score = 100 + power_modifier(my_civ, target_civ)
if target defended: score /= 2
if target has strong defense: score /= 2
if civil war: score = 1
```

### FUN_005351aa — Barbarian Unit Handler (block_00530000.c, 6102 bytes)

Separate from FUN_0053184d. Called when `civ == 0` (barbarian civ).
Handles barbarian-specific movement and attack logic.

### FUN_004ef578 — Civil Disorder (block_004E0000.c, 1614 bytes)

**State machine:**
- **Normal → Disorder**: When food surplus < 0
  - Sets city flags 0x4001 (disorder bits)
  - Shows "DISORDER" event
- **Disorder → Revolt**: If government == Democracy (type 6) and still in disorder
  - Shows revolt message
  - Triggers government change via `FUN_0055c69d(civ, 0)`
- **Disorder → Normal**: When food surplus ≥ 0
  - Clears flags 0x4001, shows "RESTORED" message
- **We Love the King Day**: When happiness_counter > 2 and half population is happy
  - Sets city flag 0x02
  - Shows "WELOVEKING" message
  - May increase city size if government > 4

### FUN_004868fb — Global Warming Terrain Effects (block_00480000.c, 819 bytes)

Iterates ALL tiles on map. For tiles with terrain type < 4 (low elevation):
- Count adjacent ocean tiles
- **Mild warming** (few adjacent ocean, position matches pollution pattern):
  - Terrain 0-1 → type 0 (grassland→desert)
  - Terrain 2-3 → type 1 (plains→desert)
- **Severe warming** (many adjacent ocean):
  - Terrain → type 8 or 9 (wasteland)
  - Set pollution marker
  - Kill all units on tile
- Position pattern: `(x*3 + y*-3) & 7 == pollution_level` — deterministic pseudo-random

### Tile Record Structure (6 bytes) — FULLY MAPPED

From tile utility function traces:

| Byte | Bits | Content |
|------|------|---------|
| 0 | 0-3 | Terrain type (0-15) |
| 0 | 4 | Unknown |
| 0 | 5 | Unknown |
| 0 | 6 | Resource flag (special resource present) |
| 0 | 7 | Special resource (0x80) |
| 1 | all | Feature flags: bit1=irrigation, bit3=mining, bit4=road, bit5=railroad, bits1+6=city |
| 2 | 0-4 | Body ID (continent/ocean number, 0-31) |
| 2 | 5-7 | Claiming civ (0-7) |
| 3 | all | Unknown (possibly river direction or fertility) |
| 4 | all | Visibility bitmask (bit N = civ N has explored this tile) |
| 5 | all | City-related (upper bits = city owner/id when city present) |

**Tile offset formula:**
```
offset = ((width & ~1) * y * 3) + ((x & ~1) * 3) + DAT_00636598
```
- Width masked to even. Coordinates masked to even. Each tile = 6 bytes but addressing uses *3 because even/odd column pairs share a 6-byte record.
- Invalid tile sentinel: `DAT_006d1188` (6 bytes of fallback data)

**Key tile utility functions:**
- `FUN_005b8931(x,y)` → tile data pointer (90 bytes)
- `FUN_005b89bb(x,y)` → terrain type = `*ptr & 0x0F` (41 bytes)
- `FUN_005b89e4(x,y)` → is ocean = `terrain == 10` (57 bytes)
- `FUN_005b94d5(x,y)` → feature flags = `ptr[1]` (simple)
- `FUN_005b8ca6(x,y)` → city at tile: if `ptr[1] & 0x42 == 2` then `FUN_005b8a1d` (moderate)
- `FUN_005b8b65(x,y,civ)` → can access = `ptr[4] & (1 << civ)` (simple)
- `FUN_005b8ee1(x,y)` → resource type: coordinate hash with `DAT_006d1168` seed (281 bytes)
- `FUN_005b976d(x,y,mask,set,broadcast)` → modify `ptr[4]` visibility bits
- `FUN_005b9c49(x,y,civ,broadcast)` → set `ptr[2]` upper 3 bits to civ ID
- `FUN_005ae052(x)` → wrap X: if `DAT_00655ae8 & 0x8000 == 0` then wrap (simple)
- `FUN_005ae31d(x1,y1,x2,y2)` → hexagonal distance with wrapping

### FUN_004bf05b — Grant Technology (block_004B0000.c, 3391 bytes)

Called as `FUN_004bf05b(receiving_civ, tech_id, giving_civ, 0, 0)` to grant techs.

**Data mutations when granting tech `param_2` to civ `param_1`:**

| Field | Address | Operation | Purpose |
|-------|---------|-----------|---------|
| Researching tech | `DAT_0064c6aa + civ*0x594` | `= 0xFFFF` if was researching this tech | Cancel current research |
| Tech bitmask | `DAT_0064c6f8 + civ*0x594 + byte_idx` | `\|= bit_mask` | Mark tech discovered (12 bytes = 96 bits) |
| Tech donor | `DAT_0064c714 + civ*0x594 + tech_id` | `= giving_civ` | Record who gave tech (100 bytes, 1 per tech) |
| Global discovery | `DAT_00655b82[tech_id]` | `\|= (1 << civ)` | Global bitmask: which civs know this tech |
| Tech counter | `DAT_0064c6b0 + civ*0x594` | `+= 1` | Only if `DAT_00655af8 != 0` AND tech < 89 |
| Future tech counter | `DAT_0064c6b1 + civ*0x594` | `+= 1` | Only if tech >= 89 (anomaly/future techs) |
| First discoverer | `DAT_00655b1e[tech_id]` | `\|= civ_idx` | Only on FIRST-ever discovery by any civ |
| Civ flags | `DAT_0064c6a0 + civ*0x594` | `\|= 0x20` | Only for tech 60 (Democracy) |

**Key insight**: `DAT_00655af8 != 0` gates the tech counter increment. During init
(when `DAT_00655af8 = 0`), tech counter does NOT increment — explaining why all civs
showed value=1 in fresh game (only incremented after first game loop turn).

### FUN_004e8f42 — Sum City Yields (block_004E0000.c, 2002 bytes)

Iterates 20 worked tiles (0x14), selects best tiles for city:
1. Get yields per tile via `FUN_004e868f(city, tile, yieldType)`
2. Tile selection priority: **food first**, then `shields*2 + trade` as tiebreaker
3. If food insufficient: un-work worst tiles, try alternatives
4. Store worked tile bitmask in `DAT_0064f370[city*0x58]` (bits 0-19 = which tiles worked)
5. Supply pool in bits 26-31 of same field

**Starvation flag**: If `food < (city_size * DAT_0064bccb) + (units * DAT_006a6608)`:
- `DAT_0064f35a[city*0x58] = -1` (negative = starving)

### FUN_004ea8e4 — Unit Supply/Maintenance (block_004E0000.c, 2627 bytes)

**Per-unit maintenance formula:**
```
cost = (shield_output + unit_supply + 4) >> 3
if unit from foreign city: cost *= 1.5
if unit from own city: cost /= 2
```

**Supply pool (human):** `(city_size - 1) - (DAT_0064bccf - 5)`
**Supply pool (AI):** Complex: `13 - difficulty` base, scaled by government, with building modifiers

**Building effects:**
- Library: -3 supply needed
- With Colossus: additional -1
- Military buildings: reduce by 1-4 depending on wonders

### FUN_004eb327 — Happiness Penalties (block_004E0000.c, 378 bytes)

- Each unhappy unit (negative happiness threshold) reduces food by 1
- Units from OTHER cities that are unhappy ADD +1 food (garrison mechanic)
- Tracks `DAT_006a65b0` (unhappy count) and `DAT_006a6570` (last unhappy unit)

### FUN_004ebbde — Starvation/Growth Consequences (block_004E0000.c, 1512 bytes)

**Starvation** (food_surplus < 0):
- Try disband settler unit first
- If no settler: `city_size -= 1`
- If `city_size < 1`: **DELETE CITY** → **KILL CIV** (if last city)
- Reset food_surplus to 0

**Growth** (food_surplus >= (city_size+1) * food_rows):
- `city_size += 1`
- With granary: retain `(new_size+1) * (food_rows/2)` food
- Without granary: food = 0
- Check aqueduct requirement (tech 9 needed for size > DAT_0064bccf)

### FUN_00493602 — Per-Civ Cleanup (block_00490000.c, 365 bytes)

Two loops:
1. **48 diplomatic targets** (`DAT_0064cab4`, stride 6 per entry): if priority < 0, mark as deleted (0xFF)
2. **16 AI targets** (`DAT_0064cbd4`, stride 6): process remaining orders via `FUN_0049301b`

### FUN_004e7eb1 — Supply Pool Init (block_004E0000.c, 512 bytes)

Sets `DAT_006a6608` (supply base) and `DAT_006a6560` (food rows):
- Human: `DAT_006a6560 = DAT_0064bccb` (from @COSMIC)
- AI: `DAT_006a6560 = 13 - difficulty` (+ modifiers, scaled by @COSMIC)
- If `DAT_0064bccb != 10`: scale by `(bccb * value) / 10`, round up
