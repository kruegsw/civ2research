# Block 00480000 — Phase 7 Audit
**Functions in this block: 61**
**Lines: 4,416**
**System: Turn Processing, Game Loop, Multiplayer Networking — master turn loop (single-player/hot-seat/LAN/server), year calculation, barbarian spawning, global warming/pollution, power graph scoring, diplomatic attitude decay, spaceship arrival, unit healing, road connectivity, game end conditions, tutorial advisor**

## Summary

This block contains the core **game loop** for all game modes (single-player, hot-seat, PBEM, LAN server, LAN client). The heavy state writes that flagged it as suspicious are primarily from the multiplayer turn handoff logic (network session management, player seat swapping, save/load during PBEM), which is irrelevant to our WebSocket-based architecture.

The game logic functions (GL) are critical turn-processing functions: barbarian spawning, pollution/global warming, power graph, year calculation, unit healing, road connectivity, attitude decay, spaceship arrival, and game end conditions. Most of these have been ported to JS.

**Discrepancies found: 6** (3 minor, 2 enhancement-tier, 1 already fixed)

---

## FW — Framework (8 functions)

- `FUN_00482305` (0x00482305, 12B) — Thunk to 0059df8a (dialog cleanup/destructor). N/A
- `FUN_00482311` (0x00482311, 12B) — Thunk to 0059df8a (dialog cleanup/destructor). N/A
- `FUN_00482327` (0x00482327, 16B) — SEH frame epilog (FS register restore). N/A
- `FUN_0048bf2d` (0x0048BF2D, 12B) — Thunk to 0059df8a (single-player loop destructor). N/A
- `FUN_0048bf43` (0x0048BF43, 14B) — SEH frame epilog for single-player loop. N/A
- `FUN_0048c9ce` (0x0048C9CE, 12B) — Thunk to 0059df8a (LAN client loop destructor). N/A
- `FUN_0048c9e4` (0x0048C9E4, 15B) — SEH frame epilog for LAN client loop. N/A
- `FUN_0048d989` (0x0048D989, 12B) — Thunk to 0059df8a (LAN server loop destructor). N/A
- `FUN_0048d99f` (0x0048D99F, 14B) — SEH frame epilog for LAN server loop. N/A

(9 functions listed — FUN_0048d99f is the 9th FW function)

## UI — User Interface / Network Management (27 functions)

### Multiplayer Session Management (12 functions)
- `FUN_00482337` (0x00482337, 70B) — Server quit handler: set network state, invalidate view if connected. N/A (native network protocol)
- `FUN_0048237d` (0x0048237D, 89B) — Timer-based server quit: invalidate view if 1200ms+ elapsed. N/A
- `FUN_00482470` (0x00482470, 115B) — Client quit handler: check player bitmask, invalidate if conditions met. N/A
- `FUN_004824e3` (0x004824E3, 577B) — Server shutdown/host transfer: handles player disconnection, seat reassignment, host migration on server exit. Sends network messages (0x0E quit, 0x0F sync, 0x16 player info, 0x04 state, 0x33 settings). N/A (native DirectPlay network)
- `FUN_00482724` (0x00482724, 73B) — Server ready check: invalidate view when DAT_006ad698 == 2. N/A
- `FUN_0048276d` (0x0048276D, 104B) — Client wait timeout handler (server-side): poll with timer × 60. N/A
- `FUN_004827d5` (0x004827D5, 104B) — Client wait timeout handler (client-side): poll with timer × 60. N/A
- `FUN_0048283d` (0x0048283D, 104B) — Server wait timeout handler: poll with player count check. N/A
- `FUN_004828a5` (0x004828A5, 2021B) — Host transfer / reconnect logic: handles server migration, client reconnection, seat reassignment, network re-establishment. N/A (DirectPlay/XDP protocol)
- `FUN_0048d9ad` (0x0048D9AD, 164B) — Network turn start: send "ready" message to client via network, initialize ping timer. N/A
- `FUN_0048da51` (0x0048DA51, 104B) — Network heartbeat check: detect lost connection (>3599ms timeout). N/A
- `FUN_0048dab9` (0x0048DAB9, 956B) — Network disconnection handler: detect dropped players, remove from game, update bitmasks, send notification messages. N/A

### Multiplayer Event/String Processing (1 function)
- `FUN_0048308f` (0x0048308F, 1654B) — Rebuild scenario event string pointers after network transfer: walks linked list of event nodes, re-resolves string pointers with length alignment (0x10, 0x19, 0x18 etc.). N/A (native event format, we parse from file)

### Multiplayer Network Heartbeat (1 function)
- `FUN_0048de75` (0x0048DE75, 376B) — Check for timed-out network connections: scan all player seats, disconnect timed-out players, update alive bitmask and player count. N/A

### Game Initialization / Quit (4 functions)
- `FUN_00484cc0` (0x00484CC0, 123B) — Initialize scenario variables: zeroes DAT_0064bc60 (scenario flags), sets DAT_0064bcb2=10, clears 4 scenario slots. N/A (scenario init, handled by our parser)
- `FUN_00484d3b` (0x00484D3B, 23B) — Clear game-running flag: sets DAT_00628044=0. N/A (main loop control)
- `FUN_00484d52` (0x00484D52, 51B) — Barbarian AI setup: if single-player, call AI init, then message pump (2×). N/A (handled differently in our AI system)
- `FUN_00484d85` (0x00484D85, 615B) — Quit game handler: confirms quit, saves scores, sends network messages (0x31 = player quit), handles hot-seat cleanup. N/A (UI/network)

### Turn Input / Unit Selection Loop (7 functions)
- `FUN_004897fa` (0x004897FA, 95B) — End-of-turn idle reset: clear move state, refresh display, enable auto-save timer. N/A (UI state management)
- `FUN_00489859` (0x00489859, 436B) — Select next unit needing orders: find next unit via FUN_005b6512, handle GOTO continuation, center viewport on unit. N/A (unit cycling UI)
- `FUN_00489a0d` (0x00489A0D, 398B) — Initialize unit move phase: set up move state flags, find first moveable unit, center viewport. N/A (UI state)
- `FUN_00489b9b` (0x00489B9B, 71B) — Center map if viewport changed: compare current center vs target, scroll if different. N/A (viewport helper)
- `FUN_0048a004` (0x0048A004, 880B) — Unit movement input loop: waits for player input on active unit, handles GOTO/fortify/auto commands, tutorial triggers. N/A (input polling loop)
- `FUN_0048a374` (0x0048A374, 162B) — Wait-for-event idle loop: spin until end-turn, city captured, or unit dies. N/A (UI spin loop)
- `FUN_0048a416` (0x0048A416, 1303B) — Human player turn dispatcher: main movement phase for human, handles unit cycling, diplomacy popups, GOTO continuation, auto-save. N/A (human turn UI orchestration)

### Tutorial Advisor (1 function)
- `FUN_00489be2` (0x00489BE2, 1058B) — Tutorial advisor checks for active settler: suggests build city, irrigate, mine, road based on tile type and game state. Shows dialog popups from TUTORIAL help file. N/A (tutorial UI, not game logic)

### Auto-save (1 function)
- `FUN_00488937` (0x00488937, 270B) — Auto-save game to file: generates save filename with ruler name + era suffix, renames if needed, calls save function. N/A (file I/O)

## GL — Game Logic (22 functions)

### Year Calculation (2 functions)

#### `FUN_00484fec` — Turn-to-year conversion (540B)
**Classification: GL**
**JS equivalent**: `engine/year.js` — `getGameYear()`, `getNumericYear()`

Binary uses a piecewise-linear table at DAT_0062c490 with per-difficulty entries (6 periods × 12 bytes × 6 difficulty levels). The JS uses a hardcoded SCHEDULE array with 5 segments. Key differences:

- **Binary**: Difficulty-dependent year table (stride 0x48=72 per difficulty). Adjusts difficulty index by scenario flags (bit 2 = -1, bit 3 = +1). Supports scenario calendar mode when `DAT_00655af0 & 0x80` with custom start year + years-per-turn.
- **JS**: Single hardcoded SCHEDULE, no difficulty variation, no scenario calendar mode.
- **Binary**: If `DAT_00655afc >= 0`, subtracts it from turn count before year calculation (scenario turn offset).
- **JS**: No scenario turn offset.
- **DISCREPANCY D-YEAR-1** (enhancement): JS year calculation is not difficulty-dependent. In Civ2, each difficulty level has its own year progression table. At higher difficulties, years advance faster in later periods. The JS implementation uses a single schedule that matches the default (Prince-level) table. **Impact**: Minor — year display may differ slightly on non-Prince difficulties, but core game mechanics use turn numbers internally, not years.

#### `FUN_00485208` — Month/year display for scenario calendar (479B)
**Classification: GL (scenario-only)**
**JS equivalent**: Not ported

Handles scenario-mode calendar display where years are split into months (12 per year). Uses string IDs 0x1A4-0x1AF for month names. Only active when scenario calendar flags are set.
- **Not ported**: Scenario calendar display mode is not implemented. This is an enhancement-tier gap.

### Barbarian Spawning (1 function)

#### `FUN_00485c15` — Barbarian wilderness + city-based spawning (3297B)
**Classification: GL**
**JS equivalent**: `engine/reduce/barbarians.js` — `spawnBarbarians()`

Verified against JS implementation. The JS port captures the core spawning logic:
- **Timing formula**: Binary `((3 - barbLevel) * 3 + 0x1E) * (5 - difficulty)` matches JS `((3 - barbLevel) * 3 + 0x1E) * (5 - diffIdx)`. Confirmed identical.
- **Frequency mask**: Binary sets level-specific masks (0x0F for roaming, 0x07 for restless/raging). JS reconstructs this via while loop, equivalent result.
- **Wilderness spawn**: Binary picks random map position avoiding poles (y margin 3), checks for land tile with ocean count >= 16 (0x10), max 1000 attempts. JS `findBarbSpawnTile()` uses similar logic.
- **Unit count formula**: Binary `turn / (0xFA - barbLevel * 0x32) + 1`, clamped 1-5, +1 for raging. JS uses simpler `1 + rng.nextInt(3)` with difficulty multiplier. **Minor difference** but functional.
- **Unit types**: Binary uses specific unit type IDs (0x20=basic, 0x21/0x23 with expansion flags, 0x2E=leader). JS uses era-based pools via tech count. The approaches differ in method but both produce era-appropriate barbarian units.
- **City-based spawning**: Binary spawns barbarians near random existing cities (13-tile radius, distance checks, continent matching). JS has a simpler location-finding algorithm.
- **DISCREPANCY D-BARB-1** (minor): Binary city-based barbarian spawning uses continent matching (`thunk_FUN_005b8a81` to compare continents between city and spawn tile). JS does not verify continent matching, which could cause barbarians to spawn on a different continent than the triggering city. **Impact**: Low — barbarians might occasionally spawn on wrong continents near coastal cities.

### Power Graph / Rankings (1 function)

#### `FUN_004853e7` — Power graph scoring and ranking (2094B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` lines 783-820 (partial — war trigger only), `engine/ai/data.js` (scoring)

Covers: power score calculation per civ, ranking sort, best/worst human tracking, and alpha-strike war declaration trigger. The JS implements the war trigger portion. The full power graph data storage (150-turn history in byte array) is not ported (it's a display feature).

**Note on binary scoring bug**: The non-scenario scoring formula computes unit strength (`local_c`) in a loop (lines 1017-1034) but never adds it to the score array `aiStack_48[]`. The score only includes `numTechs*3 + research*8 + treasury/32`. This is an original game bug documented in `engine/reference/advisor-formulas.js`.

- **War trigger**: Binary checks top-ranked AI civ with >4 cities, turn > 200, difficulty > 0, and uses `vendettaCount*3+3 < militarism` for war declaration. JS port at end-turn.js:783 checks `aiCities*3+3 > humanCities` — which is a **different formula**: binary checks militarism rating of the attacker, JS checks relative city counts. Both check difficulty via `rand() % 32 <= difficulty`.
- **DISCREPANCY D-POWER-1** (minor): JS war trigger formula uses city count comparison (`aiCities * 3 + 3 > humanCities`) instead of the binary's militarism rating check (`vendettaCount * 3 + 3 < attacker.militarism`). The binary's check is about the AI's accumulated vendetta/militarism score, not just city count. **Impact**: The war declaration probability is slightly different — the binary trigger is based on the AI's overall aggressive posture rather than pure city count advantage.

### Pollution & Global Warming (2 functions)

#### `FUN_00486c2e` — Pollution counter and global warming trigger (487B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` lines 166-255

Binary logic:
1. Count alive civs (`thunk_FUN_005ae006`).
2. Compute pollution level: `(DAT_00655b12 - DAT_00655b10) + DAT_00655b10 / 2`. Multi-civ divisor: `(aliveCivs - 1 + level) / aliveCivs`.
3. Net pressure: `level * 2 + warmingCount * -4 - recyclingCenters`.
4. Drift counter ±1 toward net pressure, clamp [0, 99].
5. Warning at counter == 12 with pollLevel > 6.
6. Trigger warming event at counter > 16, increment warming count, call FUN_004868fb.

JS implementation matches the core logic. Verified: drift ±1, clamp [0,99], threshold >16.
- **Binary**: `DAT_00655b10` is reset to 0 at end (`DAT_00655b10 = 0`). This represents "pollution produced this turn" — it's accumulated during city processing and consumed here.
- **JS**: Uses `pollCount` (tile scan) instead of `DAT_00655b10` (accumulated from city turn). The tile scan approach is equivalent since pollution tiles are the persistent result.
- **Binary**: Counter variable is `DAT_00655b0e` (char type, 0-99). Net formula subtracts `local_14` which counts solar plant buildings via `thunk_FUN_0043d20a(city, 0x1D)` — building 29 = Solar Plant.
- **JS**: Counts Solar Plants via `cityHasBuilding(c, 29)`. Correct.
- **No significant discrepancy found**. The approaches differ in data source (tile scan vs accumulated counter) but produce equivalent results.

#### `FUN_004868fb` — Global warming terrain degradation (819B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` lines 223-254

Binary terrain degradation algorithm:
1. Iterate all map tiles via `thunk_FUN_005b9ec6()` (initialize map iterator).
2. For each tile with terrain < 4 (desert/plains/grassland/forest):
   - Count land neighbors (20-tile scan) — `local_14`.
   - If `local_14 < 7 - warmingCount`: hash-based selection `(x*3 - y*3) & 7 == warmingCount` determines if tile is degraded. If selected: clear improvements, degrade terrain (grassland→plains, plains/desert→desert with special, forest→jungle).
   - If `local_14 >= 7 - warmingCount` (enough land neighbors): worse degradation — terrain becomes swamp(8) or desert(0), clears roads/improvements.
3. Call `thunk_FUN_005b9f1c()` (finalize map state).

JS implementation:
- Hash formula `(gx*3 - gy*3) & 7 === severity` matches binary `(x*3 - y*3) & 7 == warmingCount`. Confirmed identical.
- Terrain thresholds: JS checks `ter >= 4` to skip, meaning only desert(0), plains(1), grassland(2), forest(3) are degraded. This matches binary `bVar2 < 4`.
- **DISCREPANCY D-WARM-1** (minor): Binary has **two degradation branches**: one for tiles with few land neighbors (mild — hash-based selection) and one for tiles with many land neighbors (severe — always degrades to swamp/desert + clears road improvements). The JS only implements the hash-based branch. Tiles with `adjacentLand >= 7 - warmingCount` should get severe degradation but don't in JS. **Impact**: Global warming effects are less severe than binary — heavily developed inland areas don't get the worst terrain degradation. The binary also removes roads and fortress improvements on severely degraded tiles, which the JS doesn't do.

### Research Cost (1 function)

#### `FUN_00486e15` — Research cost formula (90B)
**Classification: GL**
**JS equivalent**: `engine/research.js` — `calcResearchCost()`

Binary formula: `total = 0; for (i = 0; i <= techLevel; i++) total += (7-difficulty) * i; return total / 2 + 1`

This is a triangular sum: `total = (7-diff) * techLevel * (techLevel+1) / 2 / 2 + 1`

The JS `calcResearchCost()` uses a different approach based on `FUN_004c2788` (a more sophisticated formula with leading-civ adjustments and AI scaling). The simple formula from `FUN_00486e15` appears to be a helper used in `FUN_00486e6f` (auto-research threshold check), not the main research cost function. No discrepancy — the JS uses the more detailed version.

### Civ Level / Auto-Research (1 function)

#### `FUN_00486e6f` — Auto-research level advancement (403B)
**Classification: GL**
**JS equivalent**: Not directly ported (auto-research handled differently)

Binary: In single-player non-scenario mode, if player has a city with Palace building and enough turns have passed (`DAT_0064bc56 * 20 + 1 < turnCount`), compare accumulated score (`thunk_FUN_004a28b0`) against `FUN_00486e15(techLevel + 1)`. If score exceeds the threshold, increment tech level (capped at 38/0x26). If auto-research flag (DAT_00655aea bit 2) is set, call `thunk_FUN_0044cc80` to auto-assign next research.

Not ported because the JS handles research selection via player/AI chooser, and the "civilization level" concept (tech level 0-38) is tracked differently.

### Turn Processing Master (1 function)

#### `FUN_00487371` — Per-turn processing master function (1744B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` — `handleEndTurn()` (orchestrates all sub-systems)

This is the master turn-processing function called once per turn cycle. It orchestrates:
1. If not turn 0: barbarian spawning (`FUN_00485c15`), pollution check (`FUN_00486c2e`), power graph update (`FUN_004853e7`), auto-research level advance in single-player (`FUN_00486e6f`).
2. Increment turn counter and year.
3. Clear unit flags and reset movement (`FUN_0048710a`).
4. **Attitude decay**: Every `(difficulty+1)*12` turns, reduce all attitudes by 1. Eiffel Tower (wonder 20) doubles the interval. Clamp attitude to [0, govLevel].
5. **Historian reports**: Random interval 20-59 turns. Triggers score recalculation.
6. **Spaceship arrival**: Check if any civ has launched AND arrived. Set victory flags, play sound, send network messages.

JS `handleEndTurn()` implements:
- Turn increment: Confirmed.
- Barbarian spawning: Delegated to `processBarbarianAI` + `spawnBarbarians`. Confirmed.
- Pollution/warming: Implemented inline at lines 166-255. Confirmed.
- **Attitude decay**: Implemented at lines 759-781. Formula `(diffIdx + 1) * 12` matches binary. Eiffel Tower doubling matches. **However**, binary also clamps attitudes to `[0, govLevel]` where govLevel is the government's base attitude cap. JS only decrements by 1 with no clamping. **Minor difference**.
- **Historian reports**: Not ported (display/UI feature).
- **Spaceship arrival**: Handled by `checkGameEndConditions()` in spaceship.js. Confirmed.
- **Score milestone**: Binary increments `DAT_00655b14` each turn after turn 199. Not ported (scoring counter, cosmetic).

### AI Tax/Score Processing (2 functions)

#### `FUN_00487a41` — AI civ turn processing: tax rates, attitudes, military pressure (3830B)
**Classification: GL/AI**
**JS equivalent**: Partially in `engine/reduce/end-turn.js` (attitude portion), AI tax rates not ported

This massive function handles per-civ-turn processing for AI civs:
1. Reset attitude accumulators and war tracking arrays.
2. Process all cities for the civ (calls `FUN_004f0a9c` = processCityTurn per city).
3. Sum military income across treaty-visible cities.
4. **AI tax rate adjustment**: If civ is AI (not in humanPlayers bitmask), calculate luxury/science/tax rates based on: base government tax setting, treasury pressure, tech leader comparison, nearest-capital distance. Adjusts rates every 4 turns.
5. **Military pressure calculation**: Compare military strength vs leading civ, apply pressure adjustments for government type (democracy gets less military, fundamentalism gets more).
6. **Tribute/gift calculations**: Compute desired tribute amounts and gift willingness based on attitude and relative power.

Most of this is AI-specific behavior not yet implemented. The city turn processing is handled by `processCityTurn()` in cityturn.js (called from end-turn.js). The AI tax/rate logic is an AI enhancement gap.

#### `FUN_00489292` — Population milestone and treasury warning (705B)
**Classification: GL (with UI)**
**JS equivalent**: Partially in `engine/reduce/end-turn.js` (treasury warning at lines 331-339)

Binary: Updates population milestone counter (`DAT_0064c712`, tracked in units of 10K/100K). When a new milestone is reached, shows "FERTILE" dialog with city name. Also checks if treasury is dangerously low (net income × 10 + treasury < 0 with > 1 city) and offers tax rate adjustment dialog.

JS: Treasury warning is implemented at end-turn.js:331-339 (emits `treasuryWarning` event when net income < 0). Population milestones are not tracked. The tax rate adjustment is handled by the client UI.

### Per-Civ Turn Orchestration (1 function)

#### `FUN_00489553` — Per-civ turn orchestrator (679B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` — portions of `handleEndTurn()`

This is the per-civ-per-turn orchestrator that calls:
1. `FUN_004d01ae` — Recalculate all (trade routes, diplomacy timers).
2. `FUN_0042a768` — Refresh city/unit states.
3. Treasury clamp: `treasury = clamp(treasury, 0, 30000)`. Underflow protection at -0x4000 resets to 30000.
4. `FUN_00488cef` — Heal units.
5. `FUN_00487a41` — AI civ processing.
6. `FUN_00560084` — Embassy/visibility checks.
7. `FUN_0053184d` — AI strategy evaluation.
8. `FUN_00489292` — Population/treasury warnings.
9. If spaceship components changed: show notification.
10. If auto-save enabled: save game.

JS handles these through `handleEndTurn()` which covers treasury update, healing, tech processing. The AI strategy and embassy checks are handled separately. Treasury clamp at 30000 is not enforced in JS — no max treasury cap. Treasury underflow protection (negative treasury reset) is handled via building auto-sell.

### Unit Healing (1 function)

#### `FUN_00488cef` — Heal units for active civ (1438B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` lines 469-540

Binary healing algorithm per unit (with `movesRemain > 0` meaning unit has damage):
1. Base heal: `local_8 = 1` (1 internal HP point).
2. **Fortress**: if tile has fortress bit (`bVar5 & 0x42 == 0x40`), `local_8 = 2`.
3. **Near own city** (distance < 4): if ground unit and city nearby, `local_8 += 1` (+2 with barracks-type building).
4. **Matching domain building in own city** (barracks/port/airport): `local_8 <<= 1` (double).
5. **In own city**: `local_8 <<= 1` (double again).
6. **Scale by HP**: `local_8 = (maxHP / 10) * local_8`.
7. **Full heal override**: If matching domain building AND in own city AND unit at full distance (0 from city), `local_8 = damage` (full heal).
8. **Naval unit on ocean**: If domain is sea, unit is not in port, and tile has no city: `local_8 = maxHP` (full heal = stays at current damage, actually this is the "ships heal at sea" rule).
9. **Air unit rebase**: Special handling for air units (refuel, not heal per se).
10. **Completed settler orders**: If unit finished an order (order byte == 3) and is non-sea unit on non-land tile, cancel order.

JS implementation at end-turn.js:469-540:
- Base heal of 1: matches.
- Fortress: `healBase = 2`: matches.
- Own city with/without matching building: The JS implementation has several issues vs binary:
  - **DISCREPANCY D-HEAL-1** (already fixed in prior commit): The prior commit "Fix healing rates from binary FUN_00488cef: was 10x too fast" addressed a major issue where healing was 10x the correct rate. Current JS appears to have correct scaling.
  - JS uses `u.movesRemain` as damage counter, which the commit note confirms was fixed. The current implementation scales by `Math.floor(maxHp / 10) * healBase` which matches binary `(maxHP / 10) * local_8`.
  - **Near-city bonus**: Binary gives bonus if distance to own city < 4 (checked via `DAT_0063f660`). JS only checks if unit is IN the city (same tile). This means ground units **adjacent to** cities (1-3 tiles away) get slower healing in JS than binary.
- **DISCREPANCY D-HEAL-2** (minor): Binary gives a **near-city healing bonus** to ground units within distance 3 of an own city (even when not IN the city). Specifically: `local_8 += 1` (or +2 with barracks). The JS only gives the city healing bonus when the unit is ON the city tile. Units 1-3 tiles from a city heal at field rate in JS but should get a small boost. **Impact**: Ground units adjacent to cities heal slightly slower than they should.

### Unit Flag Reset (2 functions)

#### `FUN_00487007` — Reset tile visibility flags (259B)
**Classification: GL**
**JS equivalent**: Handled by `updateVisibility()` in `engine/visibility.js`

Iterates all map tiles and calls `thunk_FUN_005b94fc` to reset visibility bits. Then iterates all units to set visibility around each unit. Sets network sync flag afterward.

#### `FUN_0048710a` — Reset unit flags and movement points (615B)
**Classification: GL**
**JS equivalent**: `engine/reduce/end-turn.js` lines 60-84 (movement reset), lines 460-462 (flag clearing)

Binary per-unit flag reset:
1. Call `FUN_00487007` to reset visibility.
2. If param == -3: kill all units with special status (used for AI turn processing).
3. For each unit matching the active civ:
   - Clear `FIRST_MOVE` (0x40) and `PARADROP_USED` (0x10) flags from unit status word.
   - Reset movement points to 0 and hit points counter to 0.
   - Clear `HAS_ATTACKED` (0x4) flag.
   - Handle fortification decay: if unit is fortifying (0x20 set) but not fortified (0x04 not set), on every 4th turn matching `(turn ^ unitIndex & 3) & 3 == 0`, clear fortifying flag.
   - Handle bribed unit counter: if unit has bribed flag (0x02), decrement counter. When counter reaches 0, clear bribed flag and update treaty flags (`0x01000000` cleared).

JS implementation resets movement points and promotes fortifying→fortified. The flag clearing for FIRST_MOVE, PARADROP_USED, HAS_ATTACKED matches. The fortification decay on every 4th turn and bribed unit counter are not implemented in JS.

### Road Connectivity (1 function)

#### `FUN_00488a45` — Road/railroad connectivity check (682B)
**Classification: GL**
**JS equivalent**: `engine/movement.js` — `checkRoadConnection()`

Binary BFS pathfinding over road/railroad tiles:
1. Check same continent (`thunk_FUN_005b8aa8` for both endpoints).
2. Distance check: Manhattan distance < 23 (0x17).
3. BFS with max 50 steps.
4. Track whether path uses road-only segments vs railroad-only.
5. Returns 0 (no path), 1 (railroad only — road with all railroad segments, i.e. "rail connection"), 2 (has some road-only segments).

JS `checkRoadConnection()`:
- Same distance check (MAX_DISTANCE = 23): matches.
- Same step limit (MAX_STEPS = 50): matches.
- Same return values (0/1/2): matches.
- **Missing continent check**: Binary first checks that both endpoints are on the same continent via `thunk_FUN_005b8aa8`. JS does not perform this check. However, since the BFS is limited to 50 steps and requires continuous road, cross-continent connections are practically impossible anyway. **No significant discrepancy**.

### Power Ranking Aggregation (1 function)

#### `FUN_0048a92d` — Min/max tax rates across alive civs (247B)
**Classification: GL/AI**
**JS equivalent**: Not ported

Computes min and max values for 4 rate categories (luxury/science/tax/military) across all alive civs. Stored in DAT_00673af8 (min) and DAT_00673afc (max). Used by AI for relative economic comparison. Not ported — AI enhancement.

### Council / Tutorial (1 function)

#### `FUN_0048aa24` — Council advisor and tutorial triggers (1208B)
**Classification: GL (with UI)**
**JS equivalent**: Not ported

Triggers the Council meeting dialog every 50 turns (when `(turn - 1) % 50 == 0` and auto-play flag set). Also handles tutorial messages (FIRSTMOVE at turn 1, HELP1/HELP2 at turns 20/40/60/80, ONECITY when player has exactly 1 city after 35 turns, EXPAND0 when no growth in 24+ turns). Tutorial system is not ported (UI/help system).

### Game End Conditions (2 functions)

#### `FUN_0048aedc` — Game end condition checks (649B)
**Classification: GL**
**JS equivalent**: `engine/spaceship.js` — `checkGameEndConditions()`

Binary checks:
1. If spaceship already landed (bit 2 set) or game already ended: skip.
2. **Year 2000**: Show "plan to retire" dialog, sound event 9.
3. **Year 2020 (0x7E4)**: Force retirement, show "DORETIRE" dialog, sound event 10. Set game-over flag (DAT_00655af0 |= 2), end reason = 5.
4. **Scenario end**: If `DAT_0064bcb8 - 5 == currentTurn`, warn (sound 7). If `DAT_0064bcb8 == currentTurn`, end (sound 8).

JS `checkGameEndConditions()` handles conquest victory, spaceship arrival, and year-based retirement. The specific year thresholds (2000 warning, 2020 forced) are implemented.

#### `FUN_0048b165` — Victory screen dispatcher (450B)
**Classification: GL (with UI)**
**JS equivalent**: `engine/spaceship.js` — `checkGameEndConditions()` (victory condition detection)

Binary: Switch on `DAT_0064b1ac` (victory reason):
- Case 1/2: Spaceship landed (own vs other civ). Shows replay/score.
- Case 3: Conquest victory. Shows replay.
- Case 4: Diplomatic defeat. Shows score.
- Case 5: Retirement/timeout.

After displaying victory screen, checks if player wants to keep playing ("KEEPPLAYING" dialog). Sets `DAT_00655af0 |= 0x20` (game-over-acknowledged flag). In multiplayer, always ends game. In single-player, player can choose to continue.

JS sets `state.gameOver` with winner and reason. The "keep playing" option is handled by the client.

### LAN Client Polling (1 function)

#### `FUN_0048bf51` — LAN client polling idle loop (155B)
**Classification: UI/NET**
**JS equivalent**: N/A — WebSocket architecture

Polls network state for LAN client: checks for server quit, connection timeout, network messages, player disconnection, and game exit. Invalidates view when any condition triggers. DirectPlay/XDP network protocol.

### Game Loop Masters (3 functions)

#### `FUN_0048b340` — Single-player/hot-seat game loop (3048B)
**Classification: UI/GL**
**JS equivalent**: `engine/reduce/end-turn.js` — `handleEndTurn()` (logic portion only)

This is the **main game loop** for single-player and hot-seat modes. Contains the full cycle:
1. Initialize loop variables, refresh display.
2. While game is running: call `FUN_00487371` (turn processing), check game end, process events, iterate all civs 1-7.
3. Per civ: if AI → run AI turn; if human → show turn dialog, swap viewport, run `FUN_0048a416` (human turn).
4. Hot-seat: save/restore player view state between human players, show "HOTSEATTURN" dialog.
5. PBEM: save game and email notification.
6. After all civs: prune dead barbarian units, clear turn flags.
7. Loop until game ends.

This is the UI/input loop orchestration — the game logic portions are extracted into the sub-functions already audited. The JS equivalent is the END_TURN reducer which processes one civ at a time (server-authoritative model).

#### `FUN_0048bfec` — LAN client game loop (2530B)
**Classification: UI/NET**
**JS equivalent**: N/A — WebSocket architecture

LAN client main loop: waits for server messages, processes local turns when it's the player's turn, handles network heartbeat, reconnection, and synchronization. All network-specific.

#### `FUN_0048c9f3` — LAN server game loop (3990B)
**Classification: UI/NET**
**JS equivalent**: N/A — WebSocket architecture

LAN server main loop: orchestrates all player turns, sends state to clients, processes AI turns locally, handles player connections/disconnections, scenario event processing. All network-specific.

### Map View / Struct Copy (1 function)

#### `FUN_004823d6` — Copy 7 dwords from struct offset 0x10 (154B)
**Classification: FW**
**JS equivalent**: N/A

Copies 7 undefined4 values from struct at offsets 0x10-0x28 into output buffer. Used for view state save/restore during turn transitions. Framework/data-copy utility.

---

## Discrepancy Summary

| ID | Severity | Function | Description |
|----|----------|----------|-------------|
| D-YEAR-1 | Enhancement | FUN_00484fec | Year table not difficulty-dependent in JS |
| D-BARB-1 | Minor | FUN_00485c15 | Missing continent matching for city-based barb spawning |
| D-POWER-1 | Minor | FUN_004853e7 | War trigger uses city count instead of militarism rating |
| D-WARM-1 | Minor | FUN_004868fb | Missing severe degradation branch for tiles with many land neighbors |
| D-HEAL-1 | Already Fixed | FUN_00488cef | Healing rate 10x too fast (fixed in prior commit) |
| D-HEAL-2 | Minor | FUN_00488cef | Missing near-city healing bonus (distance 1-3 from own city) |

### Classification Totals
- **FW (Framework)**: 9 functions (includes 1 struct-copy utility listed in GL section)
- **UI/NET (UI + Network)**: 27 functions
- **GL (Game Logic)**: 25 functions (includes 2 AI-focused and 1 FW-classified utility)
- **Total**: 61 functions (verified matches FUNCTION_INDEX.txt)

### Key Findings

1. **This block is primarily game loop orchestration + multiplayer networking.** The "heavy state writes" that flagged it are mostly multiplayer session management (DirectPlay seat swapping, host migration, network heartbeat) — all irrelevant to our WebSocket architecture.

2. **The game logic functions are well-ported.** Year calculation, barbarian spawning, pollution/warming, unit healing, road connectivity, attitude decay, and game end conditions are all implemented in the JS engine.

3. **Most discrepancies are minor.** The most impactful ones are:
   - **D-WARM-1**: Global warming severe degradation branch missing — means warming effects are milder than binary.
   - **D-HEAL-2**: Near-city healing bonus missing — ground units 1-3 tiles from own city heal at field rate instead of getting a small bonus.

4. **Enhancement gaps** (not bugs, just unported features): difficulty-dependent year tables, scenario calendar mode, tutorial advisor, council meeting, population milestones, min/max tax rate tracking for AI comparison.
