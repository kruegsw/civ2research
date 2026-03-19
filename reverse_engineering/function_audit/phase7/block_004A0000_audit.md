# Block 004A0000 Audit — 117 Functions (5,522 lines)

**PHASE 6 SUSPICIOUS FLAG**: Heavy state writes in civ init/kill, pathfinding, scoring.

## Classification Key
- **FW** = Framework / MFC / C runtime / SEH glue
- **UI** = User interface / dialog / rendering
- **GL** = Game Logic (rules, state mutations, formulas)
- **AI** = AI-specific logic

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| FW       | 51    | File I/O, string concat/format (23), SEH epilogues, CSocket/CString wrappers |
| UI       | 37    | Dialogs, listboxes, RULES.TXT editor, title screen, tribe selection, diplomacy UI |
| GL       | 28    | Civ scoring, civ init/kill, spaceship, pathfinding, game init, territory |
| AI       | 1     | Unit goto direction calculation |

**Total: 117 functions** (verified)

---

## GL Discrepancies Found

### D1: `FUN_004a28b0` (calc_civ_score) — JS `calcCivScore` in `spaceship.js`

**Binary formula (lines 329-464):**
1. **Population** (`DAT_00673f78`): Sum of `(city.size + city_byte_74 - city_byte_75)` for each city owned by civ, where byte 74/75 in the city record appear to be cached economic output or happiness bytes (parser maps offset 74-75 as scienceOutput low/high bytes, but the binary reads them as separate signed chars). JS uses only `city.size` — **missing the secondary terms in the population component**.
2. **Wonders** (`DAT_00673f5c`): Count of *active* wonders owned × 20 (0x14). JS uses `× 5`. **DISCREPANCY: binary uses ×20, JS uses ×5.**
3. **Spaceship** (`DAT_00673f84`): `spaceshipParts * multiplier`. Binary checks civ flag bit 0x10 to split between two spaceship score paths. This split is missing in JS.
4. **Pollution penalty** (`DAT_00673f58`): `(numPollutedTiles - numCleanedTiles) * -10`. JS uses `globalPollutionCount * 10 / numAliveCivs` — **different formula** (binary does not divide by alive civ count).
5. **Late-game science bonus** (`DAT_00673f8c`): Only applied after turn 200: `clamp(numAdvances * 3, 0, 100)`. JS **completely missing** this component.
6. **Difficulty modifier** (`DAT_00673f74`): Binary uses `DAT_00655b09 * 25 - 50` (0x19=25, -0x32=-50). JS matches this correctly.
7. **Alpha Centauri / space race scoring** (lines 376-389, `DAT_00673f7c`): Binary applies two separate modifiers for Standard and Fundamentalist victory types (flags `& 4` → ×5/4 modifier, `& 8` → ×4/5 modifier). JS is missing these victory type modifiers.
8. **AI score** (lines 390-461): When scenario flag 0x80 is set AND `flags & 2`, uses an entirely different scoring system with relative military power comparison and 5-tier thresholds (0, 250, 500, 750, 1000 base scores). JS has **none of this AI scoring path**.

### D2: `new_civ` @ 0x004A7CE9 — JS `createNewCiv` in `init.js`

**Binary behaviors missing/different in JS:**
1. **Attitude initialization**: Binary uses `clamp(difficulty*5 + rand()%80 + 10, 10, 75)` for human targets and plain `rand()%80 + 10` for non-human. JS only uses `rand()%80 + 10` — **missing difficulty-scaled human attitudes**.
2. **Tech transfer on civ entry**: Binary iterates over all techs and conditionally grants techs to new civ based on difficulty and number of civs that already know each tech (threshold = 2 at higher difficulties). JS uses a static pool of no-prereq techs — **completely different tech granting algorithm**.
3. **Starting position selection**: Binary has complex land-quality scoring with pollution avoidance, continent ID matching, minimum distance constraints (0x10 - turnNum>>4), goody hut clearing, and retry loops (up to 2001 attempts). JS placement is simpler.
4. **Settler placement on start**: Binary creates settler at chosen position with `thunk_FUN_005b3d06(0, param_1, x, y)` and may create a second settler if Engineer tech is known and 40+ turns have passed. JS grants extra settlers to compensate for poor starts instead.
5. **Government/Economy init**: Binary sets `scienceRate=4, taxRate=4, luxRate=1` (out of 9). JS uses `5/5/0` (out of 10). Percentages are roughly equivalent but not identical.
6. **Reputation array** (`DAT_0064ca93`): Binary initializes specific personality flags [1,1,0,1,0,0,1,0,0,0]. JS sets `reputation: 100` — completely different structure.
7. **Embassy/treaty** init: Binary clears all treaty flags per-civ and initializes visibility mask. JS relies on `initNewGame` to set treaties.

### D3: `kill_civ` @ 0x004AA378 — JS `killCiv` in `diplomacy.js`

**Binary behaviors missing in JS:**
1. **Unit handling on kill**: Binary iterates all units; if unit belongs to killed civ, it calls `thunk_FUN_005b4391(unitIdx, 1)` (kill unit properly with map updates). If unit was captured (bribe flag `& 2` set, `returnToCiv == param_1`), it clears the bribe flag and repatriates the unit via `thunk_FUN_004c5fae`. JS simply sets coordinates to -1 — **missing captured/bribed unit repatriation**.
2. **Kill history**: Binary writes `destroyedCivRulesIds[slot] = civ.rulesCivNumber` (from `DAT_0064ca92`). JS writes `destroyedCivRulesIds[slot] = civSlot` — **wrong value** (slot index vs. rules civ number).
3. **Respawn after kill**: Binary calls `thunk_new_civ(param_1)` immediately after kill (reuses the slot for a new AI civ). JS has a separate `attemptCivRespawn` function that only triggers after 50+ turns — **different respawn timing/trigger**.
4. **Alive count check**: Binary checks if only 1 civ remains, if so it sets `DAT_0064b1ac = 3` (winner flag) and `DAT_00655af0 |= 2` (game over flag). JS checks `aliveCount <= 1` — logic is equivalent but uses different flags.
5. **Multiplayer sync**: Binary has an entire multiplayer code path (lines 3491-3510) that sends network messages for kill_civ. JS handles this through the reducer/WebSocket layer differently — not a fidelity issue per se.

### D4: `FUN_004abfe5` (A* pathfinder) — JS `findPath` in `pathfinding.js`

**Binary behaviors different in JS:**
1. **Cost model**: Binary uses a BFS-based flood fill with costs stored in a 48×48 grid (`DAT_006ced60`). JS uses A* with a MinHeap priority queue. The A* approach is more efficient but the cost calculations differ in edge cases.
2. **Terrain cost multiplier**: Binary uses `DAT_0064bcc8 * 4` as the base movement cost multiplier. This is the COSMIC movement multiplier. JS uses `MOVEMENT_MULTIPLIER = 3` — **could differ if COSMIC value is non-standard**.
3. **Railroad check**: Binary checks `flagsA & 0x20` for railroad bonus and `flagsB & 0x10` for road bonus separately. JS handles roads/railroads through `moveCost()`.
4. **ZOC exception for sea units**: Binary checks `(&DAT_0064b1bd)[unitType * 0x14] & 2` (IGZOC flag). JS uses `UNIT_IGNORE_ZOC` set — same logic but static lookup.
5. **Transport boarding cost**: Binary adds `DAT_0064bcc8 * 4` when crossing ZOC with transport. JS may not accurately model this penalty.
6. **Iteration limit**: Binary uses a circular buffer of 2304 nodes (0x900). JS uses a standard A* with 4096 node expansion limit — **different search space limits**.

### D5: `FUN_004adafc` (calc_unit_goto_direction) — JS `calcGotoDirection` in `pathfinding.js`

**Binary three-tier approach partially replicated in JS:**
1. **Tier 1** (distance < 2): Binary computes direction via `FUN_004abea0(dx, dy)`. JS uses `getDirection()`.
2. **Tier 2** (distance 2-22): Binary calls A* pathfinder directly. JS does the same.
3. **Tier 3** (distance > 22): Binary uses a coarse-grid road pathfinder (`FUN_004ad20f`), then refines with A*. JS has a simplified version.
4. **Backtrack detection**: Binary checks if the chosen direction is the reverse of the last direction AND the unit has `fuel > 0` — if so, cancels goto and wakes unit. JS may not have this backtrack detection.

### D6: `FUN_004aa9c0` (init_new_game) — JS `initNewGame` in `init.js`

**Binary init steps missing/different:**
1. **Turn 0 year**: Binary sets `DAT_00655af8 = 0` (turnsPassed=0) and `DAT_00655afa = 0xF060` (year = -4000 in some encoding). JS does not set the year encoding.
2. **Scenario flags**: Binary initializes `DAT_00655aea` (game flags) from `DAT_0064bc1e` (setup options) with various bitmask operations depending on difficulty. JS doesn't replicate these flag initializations.
3. **Post-init positioning** (`FUN_004a7754` call): Binary calls the distance-maximization placement after all 8 civs are initialized. JS calls it after civ creation but the algorithm differs (see D2 above).
4. **Science/tax rate clamping**: Binary checks `6 + 4 > 10` limit and corrects. JS doesn't need this because it uses a different rate scale.
5. **Chieftain treasury**: Binary sets treasury to 50 (0x32) only when 1 human player detected. JS does the same check — matches.

### D7: `FUN_004a74bc` (reset_spaceship) — JS `resetSpaceship` in `spaceship.js`

Binary clears spaceship fields: `flags=0, launchTurn=0, arrivalTurn=0, techGoal=0, plus 6 part count fields to 0`. JS `resetSpaceship()` creates a fresh empty spaceship object. **Functionally equivalent.**

### D8: `FUN_004a7577` / `FUN_004a75a6` / `FUN_004a75d5` (spaceship checks)

- `FUN_004a7577`: Returns `civFlags & 2` — spaceship launched check. JS uses `ss.launched`.
- `FUN_004a75a6`: Returns `civFlags & 1` — spaceship in progress check. JS uses `ss.structurals > 0`.
- `FUN_004a75d5`: Returns launched AND `arrivalTurn <= currentTurn`. JS uses `ss.arrivalTurn <= turnNum`. **Equivalent.**

### D9: `FUN_004a93b3` (expand_city_territory) — Not directly ported to JS

This function expands a city's territorial border by claiming adjacent unowned tiles. The binary:
- Takes `(cityIdx, numTilesToClaim)` parameters
- Uses a priority system: ocean(1) < tundra(2) < forest/jungle(3) < plains/grassland(4) < hills/mountains(5)
- Inner ring (tiles 0-7) gets +1 bonus priority
- Special resources (`& 0x80`) get +3 bonus
- After claiming tiles, reveals fog for same-continent tiles in 45-tile radius

**JS has no territory expansion system at all.** Territory is only set from .sav file data. This is a significant missing mechanic.

### D10: `FUN_004a9785` (scenario_startup_civs) — Not ported to JS

Scenario-specific initialization that creates cities, units, buildings, and roads for a pre-set scenario start (e.g., WWII scenarios). Grants specific techs, creates multiple cities per civ with buildings/defenders. **Not applicable to standard game — scenario support only.**

---

## Per-Function Audit

### FW Functions (25)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 1 | 0x004A2020 | FUN_004a2020 | 53 | FW | Close RULES.TXT file handle |
| 2 | 0x004A2055 | FUN_004a2055 | 789 | FW | Open & search RULES.TXT section by label |
| 3 | 0x004A2379 | FUN_004a2379 | 131 | FW | Wrapper: retry RULES.TXT open with fallback path |
| 4 | 0x004A23FC | FUN_004a23fc | 171 | FW | Read next line from RULES.TXT |
| 5 | 0x004A24B1 | FUN_004a24b1 | 131 | FW | Parse next comma-delimited field from RULES.TXT line |
| 6 | 0x004A2534 | FUN_004a2534 | 30 | FW | Parse field + convert to int (atoi wrapper) |
| 7 | 0x004A2552 | FUN_004a2552 | 40 | FW | Skip to end of current RULES.TXT line |
| 8 | 0x004A257A | FUN_004a257a | 48 | FW | Read line + convert to int |
| 9 | 0x004A25AA | FUN_004a25aa | 43 | FW | Parse field + convert to int |
| 10 | 0x004A25D5 | FUN_004a25d5 | 112 | FW | Parse binary string field (e.g., "01101011") |
| 11 | 0x004A2645 | FUN_004a2645 | 117 | FW | Open RULES.TXT section + skip N lines |
| 12 | 0x004A26BF | FUN_004a26bf | 47 | FW | Parse field + lookup resource string |
| 13 | 0x004A44A2 | FUN_004a44a2 | 12 | FW | Dialog destructor (thunk to CSocket cleanup) |
| 14 | 0x004A44B8 | FUN_004a44b8 | 14 | FW | SEH epilogue |
| 15 | 0x004A4667 | FUN_004a4667 | 12 | FW | Dialog destructor |
| 16 | 0x004A467D | FUN_004a467d | 14 | FW | SEH epilogue |
| 17 | 0x004A4948 | FUN_004a4948 | 12 | FW | Dialog destructor |
| 18 | 0x004A495E | FUN_004a495e | 14 | FW | SEH epilogue |
| 19 | 0x004A5D6E | FUN_004a5d6e | 12 | FW | Cleanup wrapper |
| 20 | 0x004A5D84 | FUN_004a5d84 | 14 | FW | SEH epilogue |
| 21 | 0x004A5DEB | FUN_004a5deb | 12 | FW | Cleanup wrapper |
| 22 | 0x004A5E01 | FUN_004a5e01 | 14 | FW | SEH epilogue |
| 23 | 0x004A6DC9 | FUN_004a6dc9 | 9 | FW | Cleanup wrapper |
| 24 | 0x004A6DD2 | FUN_004a6dd2 | 12 | FW | Dialog destructor |
| 25 | 0x004A6DE8 | FUN_004a6de8 | 15 | FW | SEH epilogue |

### UI Functions (37)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 26 | 0x004A3060 | FUN_004a3060 | 966 | UI | Load civ names/leaders from RULES.TXT into editor arrays |
| 27 | 0x004A3426 | FUN_004a3426 | 538 | UI | Save edited civ names back to RULES.TXT data structures |
| 28 | 0x004A3640 | FUN_004a3640 | 269 | UI | Update leader title display controls |
| 29 | 0x004A3757 | FUN_004a3757 | 296 | UI | Read leader title from edit controls |
| 30 | 0x004A3889 | FUN_004a3889 | 27 | UI | Wrapper: redraw scenario editor panel |
| 31 | 0x004A38A4 | FUN_004a38a4 | 381 | UI | Write government names to scenario file (fprintf) |
| 32 | 0x004A3A21 | FUN_004a3a21 | 1975 | UI | Write all civ definitions to scenario file (large fprintf loop) |
| 33 | 0x004A41D8 | FUN_004a41d8 | 113 | UI | Write commodity names to scenario file |
| 34 | 0x004A4249 | show_messagebox_4249 | 187 | UI | RULES.TXT editor "Apply" button handler + MessageBox |
| 35 | 0x004A4304 | FUN_004a4304 | 414 | UI | Commodity name editor dialog (CSocket-based listbox) |
| 36 | 0x004A44C6 | FUN_004a44c6 | 417 | UI | Government name editor dialog |
| 37 | 0x004A468B | show_title_screen | 701 | UI | Leader title editor dialog (male/female titles) |
| 38 | 0x004A496C | FUN_004a496c | 95 | UI | "Tribes" tab handler in scenario editor |
| 39 | 0x004A49CB | FUN_004a49cb | 40 | UI | Invalidate editor cache + force repaint |
| 40 | 0x004A49F3 | FUN_004a49f3 | 101 | UI | Editor control event handler (0xC9=listbox, 0xCA=button) |
| 41 | 0x004A4A58 | FUN_004a4a58 | 1084 | UI | Create scenario editor dropdown/list controls |
| 42 | 0x004A4EB2 | FUN_004a4eb2 | 215 | UI | Create scenario editor text input control |
| 43 | 0x004A4F89 | FUN_004a4f89 | 1360 | UI | Draw scenario editor panel (sprites, text, borders) |
| 44 | 0x004A54D9 | FUN_004a54d9 | 2171 | UI | Scenario editor main initialization (create window, buttons, controls) |
| 45 | 0x004A5D92 | FUN_004a5d92 | 89 | UI | Wrapper: open scenario editor with font setup |
| 46 | 0x004A6980 | FUN_004a6980 | 34 | UI | Get text height from device context |
| 47 | 0x004A69B0 | FUN_004a69b0 | 365 | UI | Tech tree browser: init display from tech data |
| 48 | 0x004A6B80 | FUN_004a6b80 | 92 | UI | Draw tech icon at position (from tech sprite sheet) |
| 49 | 0x004A6BDC | FUN_004a6bdc | 111 | UI | Draw improvement/wonder icon (building < 0x27 vs wonder) |
| 50 | 0x004A6C4B | FUN_004a6c4b | 58 | UI | Draw unit icon at position |
| 51 | 0x004A6C85 | FUN_004a6c85 | 64 | UI | Draw checkbox/radio button |
| 52 | 0x004A6CC5 | FUN_004a6cc5 | 260 | UI | Generic listbox dialog (with checkbox support) |
| 53 | 0x004A6DF7 | FUN_004a6df7 | 66 | UI | Draw button/control with optional icon |
| 54 | 0x004A6E39 | FUN_004a6e39 | 260 | UI | Generic listbox dialog variant (different event handler) |
| 55 | 0x004A6F3D | FUN_004a6f3d | 9 | FW | Cleanup wrapper (listbox dialog) |
| 56 | 0x004A6F46 | FUN_004a6f46 | 12 | FW | Dialog destructor |
| 57 | 0x004A6F5C | FUN_004a6f5c | 15 | FW | SEH epilogue |
| 58 | 0x004A7070 | FUN_004a7070 | 43 | UI | ASCII lowercase-to-uppercase converter |
| 59 | 0x004AF3E0 | FUN_004af3e0 | 1123 | UI | Diplomacy civ selection listbox (treaty screen init) |
| 60 | 0x004AF867 | FUN_004af867 | 30 | UI | Wrapper: select civ in listbox 0 |
| 61 | 0x004AF885 | FUN_004af885 | 30 | UI | Wrapper: select civ in listbox 1 |
| 62 | 0x004AF8A3 | FUN_004af8a3 | 97 | UI | Common civ listbox selection handler |

Note: Items 55-57 (0x004A6F3D, 0x004A6F46, 0x004A6F5C) are FW glue (cleanup/SEH epilogue) but listed here for sequential numbering. They are counted as FW in the summary.

### GL Functions (46)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 63 | 0x004A28B0 | FUN_004a28b0 | 1542 | GL | **calc_civ_score** — See D1 above |
| 64 | 0x004A70B0 | FUN_004a70b0 | 267 | GL | Init game setup options (map size, difficulty, AI flags) |
| 65 | 0x004A71BB | FUN_004a71bb | 386 | GL | Init player preferences (HOF stats, game history arrays) |
| 66 | 0x004A733D | FUN_004a733d | 156 | GL | Load CIV2.DAT (saved game options + HOF) |
| 67 | 0x004A73D9 | FUN_004a73d9 | 212 | GL | Save CIV2.DAT |
| 68 | 0x004A74BC | FUN_004a74bc | 187 | GL | **reset_spaceship** for civ — See D7 |
| 69 | 0x004A7577 | FUN_004a7577 | 47 | GL | Spaceship launched check (flags & 2) — See D8 |
| 70 | 0x004A75A6 | FUN_004a75a6 | 47 | GL | Spaceship in-progress check (flags & 1) — See D8 |
| 71 | 0x004A75D5 | FUN_004a75d5 | 88 | GL | Spaceship arrived check — See D8 |
| 72 | 0x004A762D | FUN_004a762d | 200 | GL | Destroy spaceship (show event, play sound, reset) |
| 73 | 0x004A76F5 | FUN_004a76f5 | 95 | GL | Init kill history arrays (12 slots) |
| 74 | 0x004A7754 | FUN_004a7754 | 1408 | GL | **assign_initial_settler_positions** — See D2 |
| 75 | 0x004A7CE9 | new_civ | 5834 | GL | **Create new civilization** — See D2 |
| 76 | 0x004A93B3 | FUN_004a93b3 | 953 | GL | **expand_city_territory** — See D9 |
| 77 | 0x004A9785 | FUN_004a9785 | 3059 | GL | **scenario_startup_civs** — See D10 |
| 78 | 0x004AA378 | kill_civ | 1608 | GL | **Kill/destroy civilization** — See D3 |
| 79 | 0x004AA9C0 | FUN_004aa9c0 | 1345 | GL | **init_new_game** — See D6 |
| 80 | 0x004ABEA0 | FUN_004abea0 | 325 | GL | Convert dx,dy to direction index (0-7) for adjacent tiles |
| 81 | 0x004ABFE5 | FUN_004abfe5 | 4118 | GL | **A* pathfinder** — See D4 |
| 82 | 0x004AD01E | FUN_004ad01e | 88 | GL | Read pathfinder cost from 48×48 grid |
| 83 | 0x004AD076 | FUN_004ad076 | 91 | GL | Write pathfinder cost to 48×48 grid |
| 84 | 0x004AD0D1 | FUN_004ad0d1 | 318 | GL | Path distance check with road/sea flag |
| 85 | 0x004AD20F | FUN_004ad20f | 1392 | GL | **Road network pathfinder** (coarse grid BFS) |
| 86 | 0x004AD784 | FUN_004ad784 | 158 | GL | Find nearest land/sea tile from coarse grid position |
| 87 | 0x004AD822 | FUN_004ad822 | 730 | GL | Find nearest road-connected tile (road network entry point) |
| 88 | 0x004AEE90 | FUN_004aee90 | 36 | GL | Get land road map pointer (grid[y][x]) |
| 89 | 0x004AEEC0 | FUN_004aeec0 | 36 | GL | Get sea road map pointer (grid[y][x]) |
| 90 | 0x004AEEF0 | FUN_004aeef0 | 36 | GL | Get BFS visited map pointer (grid[y][x]) |

### AI Functions (9)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 91 | 0x004ADAFC | FUN_004adafc | 2516 | AI | **calc_unit_goto_direction** — See D5 |

(Note: FUN_004adafc is the primary AI goto logic. The remaining pathfinding functions above also serve AI but are classified GL since they're used by both human and AI paths.)

### String Formatting Functions (28)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 92 | 0x004AEF20 | FUN_004aef20 | 22 | FW | Clear string buffer (`*param = 0`) |
| 93 | 0x004AEF36 | FUN_004aef36 | 33 | FW | Append comma (",") to string |
| 94 | 0x004AEF57 | FUN_004aef57 | 63 | FW | Append N commas to string |
| 95 | 0x004AEF96 | FUN_004aef96 | 33 | FW | Append string literal (DAT_0062d068) |
| 96 | 0x004AEFB7 | FUN_004aefb7 | 33 | FW | Append string literal (DAT_0062d06c) |
| 97 | 0x004AEFD8 | FUN_004aefd8 | 33 | FW | Append string literal (DAT_0062d070) |
| 98 | 0x004AEFF9 | FUN_004aeff9 | 33 | FW | Append string literal (DAT_0062d074) |
| 99 | 0x004AF01A | FUN_004af01a | 33 | FW | Append string literal (DAT_0062d078) |
| 100 | 0x004AF03B | FUN_004af03b | 33 | FW | Append string literal (DAT_0062d07c) |
| 101 | 0x004AF05C | FUN_004af05c | 33 | FW | Append string literal (DAT_0062d080) |
| 102 | 0x004AF07D | FUN_004af07d | 33 | FW | Append string literal (DAT_0062d084) |
| 103 | 0x004AF09E | FUN_004af09e | 33 | FW | Append string literal (DAT_0062d088) |
| 104 | 0x004AF0BF | FUN_004af0bf | 33 | FW | Append string literal (DAT_0062d08c) |
| 105 | 0x004AF0E0 | FUN_004af0e0 | 33 | FW | Append string literal (DAT_0062d090) |
| 106 | 0x004AF101 | FUN_004af101 | 33 | FW | Append string literal (DAT_0062d094) |
| 107 | 0x004AF122 | FUN_004af122 | 41 | FW | Append resource string by ID |
| 108 | 0x004AF14B | FUN_004af14b | 41 | FW | Append app resource string by index |
| 109 | 0x004AF174 | FUN_004af174 | 32 | FW | Append raw string (passthrough) |
| 110 | 0x004AF194 | FUN_004af194 | 65 | FW | Append formatted resource string with brackets |
| 111 | 0x004AF1D5 | FUN_004af1d5 | 53 | FW | Append integer (itoa base 10) |
| 112 | 0x004AF20A | FUN_004af20a | 122 | FW | Append binary string (itoa base 2, zero-padded to 8 chars) |
| 113 | 0x004AF284 | FUN_004af284 | 53 | FW | Append long integer (ltoa base 10) |
| 114 | 0x004AF2B9 | FUN_004af2b9 | 50 | FW | Append long integer + append "gold" suffix string |

### UI Functions (continued)

| # | Address | Name | Size | Classification | Notes |
|---|---------|------|------|----------------|-------|
| 115 | 0x004AF904 | FUN_004af904 | 627 | UI | Diplomacy listbox click handler (single/shift/ctrl select) |
| 116 | 0x004AFB77 | FUN_004afb77 | 274 | UI | Hit-test: translate click coordinates to listbox item index |
| 117 | 0x004AFC89 | FUN_004afc89 | 1230 | UI | Redraw diplomacy civ selection listbox (icons + names) |

---

## Critical Discrepancy Summary

| ID | Severity | Function | Issue |
|----|----------|----------|-------|
| D1 | **HIGH** | calc_civ_score | Wonder multiplier ×20 vs ×5; missing late-game science bonus; missing trade revenue in pop score; wrong pollution formula; missing AI scenario scoring path |
| D2 | **MEDIUM** | new_civ | Different tech granting algorithm; missing difficulty-scaled attitudes for human targets |
| D3 | **MEDIUM** | kill_civ | Wrong destroyedCivRulesIds value (slot index vs rules civ number); missing bribed unit repatriation |
| D4 | **LOW** | A* pathfinder | Different algorithm (BFS vs A*) but functionally equivalent for most cases |
| D5 | **LOW** | calc_goto_dir | Missing backtrack detection |
| D6 | **LOW** | init_new_game | Minor flag differences, mostly cosmetic |
| D9 | **HIGH** | expand_territory | **Completely missing** — no territory expansion in JS engine |

---

## Verification

- Function index entries for 0x004A: **117** (confirmed)
- Functions audited: **117** (92-114 are string formatters, 63-90 are GL, 91 is AI, remainder is FW/UI)
- Source file: 5,522 lines (confirmed)
