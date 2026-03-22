# Deep Dive: Turn Pipeline — Binary vs JS

Comparison of the EXACT order of operations for end-of-turn, per-civ, and per-city
processing between the Civ2 binary and the JS engine implementation.

**Binary sources**: `block_00480000.c` (FUN_00487371, FUN_00489553, FUN_00487a41),
`block_004F0000.c` (FUN_004f0a9c)

**JS sources**: `engine/reduce/end-turn.js` (handleEndTurn), `engine/cityturn.js`
(processCityTurn and sub-functions)

---

## 1. Architecture Difference: Binary vs JS

The binary has a **three-level hierarchy**:

```
FUN_0048b340 (main_game_loop)         ← outer game loop, per-turn
  └─ FUN_00487371 (process_end_of_turn)  ← once per FULL turn cycle
  └─ for each civ 0..7:
       └─ FUN_00489553 (do_full_civ_turn)  ← once per CIV per turn
            ├─ FUN_004d01ae (load_civ_power_values)
            ├─ FUN_0042a768 (map_refresh)
            ├─ treasury clamp
            ├─ FUN_00488cef (heal_units)
            ├─ FUN_00487a41 (process_civ_turn)  ← processes ALL cities + AI rates
            │    └─ for each city (backwards):
            │         └─ FUN_004f0a9c (process_city_turn)
            ├─ FUN_00560084 (AI_evaluation)
            ├─ FUN_0053184d (AI_diplomacy)
            ├─ FUN_00489292 (check_population_milestone)
            └─ FUN_00488937 (auto_save_game)
```

The JS **flattens** this into a single `handleEndTurn()` function that processes
one civ at a time (called once per civ transition), doing both per-turn-cycle
and per-civ work in the same function.

---

## 2. Binary: process_end_of_turn (FUN_00487371) — Order of Operations

This runs **once per full turn cycle**, BEFORE any civ gets its per-civ processing.

| Step | Binary Operation | Function |
|------|-----------------|----------|
| 1 | If not turn 0: **Spawn barbarians** | FUN_00485c15 |
| 2 | **Update pollution counter** (global warming check) | FUN_00486c2e |
| 3 | **Calculate power graph rankings** (war declarations) | FUN_004853e7 |
| 4 | If singleplayer: **Check tech advance** | FUN_00486e6f |
| 5 | **Increment turn counter** (DAT_00655af8++) | inline |
| 6 | **Calculate year** from turn number | FUN_00484fec |
| 7 | If turn > 199: increment future tech counter | inline |
| 8 | Clear bit in game flags (DAT_00655aee) | inline |
| 9 | **Reset all units** (movement, fortify, spy timers) | FUN_0048710a |
| 9a | └─ Refresh map visibility | FUN_00487007 |
| 10 | **Decay reputation** (periodic, difficulty-based interval) | inline |
| 10a | └─ Eiffel Tower doubles the decay interval | inline |
| 11 | **Random ozone/event timer** (barbarian random events) | inline |
| 12 | **Space race victory check** | inline |

### JS Mapping for process_end_of_turn

| Binary Step | JS Location | Status |
|-------------|-------------|--------|
| 1: Spawn barbarians | `spawnBarbarians()` at line 767 | **WRONG ORDER** — runs at end, after civ processing |
| 2: Pollution counter | Global warming block at lines 200-304 | **WRONG ORDER** — runs mid-civ, not once per cycle |
| 3: Power rankings | Power ranking block at lines 854-901 | **WRONG ORDER** — runs at end, should be pre-turn |
| 4: Check tech advance | N/A — JS handles per-civ at line 416-441 | Different approach (per-civ) |
| 5-6: Turn/year increment | `turnNumber++` at line 46 | OK — implicit in civ cycling |
| 7: Future tech counter | Not implemented | **MISSING** |
| 8: Clear game flags | Not implemented | **MISSING** (minor) |
| 9: Reset units | Movement reset at lines 69-84 | **WRONG SCOPE** — binary resets ALL units at once, JS resets per-civ |
| 9a: Map visibility refresh | Not done as a bulk operation | **MISSING** as bulk; done per-move instead |
| 10: Reputation decay | Attitude decay at lines 830-852 | OK — implemented |
| 11: Random events | Not implemented | **MISSING** |
| 12: Space race victory | `checkGameEndConditions()` at line 915 | OK |

---

## 3. Binary: do_full_civ_turn (FUN_00489553) — Order of Operations

This runs **once per civ** that is alive and active.

| Step | Binary Operation | Function |
|------|-----------------|----------|
| 1 | Set processing flag (DAT_0062c5b8 = 1) | inline |
| 2 | Record starting science output | inline |
| 3 | **Load civ power values** | FUN_004d01ae |
| 4 | **Map refresh** | FUN_0042a768 |
| 5 | **Clamp treasury** to [-16384, 30000]; if < 0 set to 0 | inline |
| 6 | **Heal all units** for this civ | FUN_00488cef |
| 7 | **Process civ turn** (all cities + AI rates) | FUN_00487a41 |
| 8 | **AI evaluation** (military posture) | FUN_00560084 |
| 9 | **AI diplomacy** (tribute, demands) | FUN_0053184d |
| 10 | **Check population milestone** | FUN_00489292 |
| 11 | If science changed: update tech advisor | FUN_004d0339 / FUN_0059772c |
| 12 | Clear processing flag (DAT_0062c5b8 = 0) | inline |
| 13 | If auto-save enabled: **auto save** | FUN_00488937 |

### JS Mapping for do_full_civ_turn

| Binary Step | JS Location | Status |
|-------------|-------------|--------|
| 1-2: Flags + science snapshot | Not implemented | N/A (UI-related) |
| 3: Load power values | Not implemented | **MISSING** (feeds AI) |
| 4: Map refresh | Not needed (client-side rendering) | N/A |
| 5: Treasury clamp | `Math.max(0, Math.min(30000, ...))` at line 381 | OK — but done AFTER cities, not before |
| 6: Heal units | HP recovery at lines 522-609 | **WRONG ORDER** — runs after cities, should be before |
| 7: Process civ turn | City loop at lines 174-188 + treasury at 318-443 | OK — see section 4 |
| 8: AI evaluation | Not implemented (server-side AI stub) | **MISSING** |
| 9: AI diplomacy | Not implemented (server-side AI stub) | **MISSING** |
| 10: Population milestone | Not implemented | **MISSING** |
| 11: Science change notify | Not applicable (client handles) | N/A |
| 13: Auto save | Not applicable (web app) | N/A |

---

## 4. Binary: process_civ_turn (FUN_00487a41) — Order of Operations

This runs inside `do_full_civ_turn`, after healing and before AI.

| Step | Binary Operation | Detail |
|------|-----------------|--------|
| 1 | Clear happiness counters (DAT_0064ca72) | Zero out per-civ happiness accumulators |
| 2 | Clear power category arrays (7 entries) | Zero out DAT_0064ca74[0..6] |
| 3 | Clear unit counting array (28 entries) | Zero out DAT_0063f580[0..27] |
| 4 | Clear game flag bit 2 (DAT_00655aee) | inline |
| 5 | Call citywin_DADA (UI reset) | UI only |
| 6 | **For each city (BACKWARDS from max to 0):** | |
| 6a | └─ Clear "already processed" flag on city | Clear bit 0x10000 |
| 6b | └─ **process_city_turn(cityIndex)** | FUN_004f0a9c |
| 6c | └─ If city not destroyed and size > 5: set flag | local_1c |= 1 |
| 6d | └─ If city has disorder flag: set flag | local_1c |= 2 |
| 6e | └─ Update other civs' known city size | DAT_0064f34d |
| 6f | └─ Update city window if active | UI only |
| 7 | Call citywin_DB36 (UI cleanup) | UI only |
| 8 | **Update civ score**: DAT_0064ca74[0] += DAT_0064ca76 * 2 | inline |
| 9 | **If AI civ (not human):** | |
| 9a | └─ Calculate tax/luxury/science rates | Complex formula |
| 9b | └─ Adjust based on disorder, treasury, government | inline |
| 9c | └─ Clamp rates by government type limits | inline |
| 9d | └─ Check Alpha Centauri tech requirements | inline |
| 10 | **Calculate tribute/threat metrics** | DAT_0064ca80, DAT_0064ca7e |
| 10a | └─ Consider space race position | inline |
| 10b | └─ Consider government aggression level | inline |
| 10c | └─ Apply barbarian/small-map penalties | inline |
| 10d | └─ Apply bloodlust mode zeroing | inline |
| 11 | Clear unit counting array again | Zero out DAT_0063f580 |

### JS Mapping for process_civ_turn

| Binary Step | JS Location | Status |
|-------------|-------------|--------|
| 1-4: Clear accumulators | Not implemented | **MISSING** — no per-civ score accumulators |
| 5: UI reset | N/A | N/A |
| 6: City loop | Lines 174-188 in end-turn.js | **FORWARD order** vs binary's BACKWARDS |
| 6a: Clear processing flag | Not implemented | **MISSING** (minor) |
| 6b: process_city_turn | `processCityTurn()` call at line 178 | OK — see section 5 |
| 6c-6d: Accumulate flags | Not implemented | **MISSING** (feeds AI rate calc) |
| 6e: Update known city size | Not implemented | **MISSING** (MP visibility) |
| 7: UI cleanup | N/A | N/A |
| 8: Score update | Not implemented per-civ-turn | **MISSING** — score done every 10 turns |
| 9: AI rate calculation | Not implemented | **MISSING** (critical for AI) |
| 10: Tribute/threat | Power ranking war trigger at lines 854-901 | Partial — different formula |
| 11: Clear unit array | Not implemented | N/A |

### KEY FINDING: City Processing Order

**Binary**: iterates cities **backwards** (from max city index to 0).
**JS**: iterates cities **forwards** (from 0 to max).

This can produce different outcomes when city processing has cross-city side effects
(e.g., settler disbanding during famine, wonder race resolution, building sale order
for treasury deficit).

---

## 5. Binary: process_city_turn (FUN_004f0a9c) — Order of Operations

This is called per-city within the civ turn loop.

| Step | Binary Operation | Function/Detail |
|------|-----------------|-----------------|
| 0 | Set city processing flag (DAT_006aa760 = 1) | |
| 0a | **Adoption check**: every 64 turns, city.foundedBy = owner | Formula: `((turnAge-1) ^ (turn & 0x3F)) & 0x3F == 0` |
| 0b | Determine human/AI mode for this city | DAT_006a65ac |
| 0c | Clear city flags (AND 0xffbfffbb) | Clears bits 6,18,22 |
| 1 | **process_city_food** (food processing, growth, famine) | FUN_004ebbde |
| 1a | └─ If city destroyed by famine → return -999 | |
| 2 | **calc_city_production** (first pass — yields) | FUN_004eb4ed(cityIdx, 1) |
| 2a | └─ If yields decreased: show DECREASE warning | UI only |
| 3 | **Calculate food storage delta** | inline: treasury calc feeds city food storage |
| 3a | └─ Food shortage 3-turn lookahead warning | UI notification |
| 4 | **process_city_production** (shields, build items) | FUN_004ec3fe |
| 5 | **process_unit_support_deficit** | FUN_004eef23 |
| 6 | **calc_city_production** (second pass — recalc after changes) | FUN_004eb4ed(cityIdx, 1) |
| 6a | └─ Update civ score accumulators | DAT_0064ca74 adjustments |
| 6b | └─ Category pools for unit support surplus | Switch on thresholds |
| 7 | **Wonder/attitude checks** | Women's Suffrage (0x15), Colosseum (0x21) |
| 7a | └─ Calculate corruption modifier from government | Based on gov type |
| 7b | └─ Calculate attitude penalty per city | Complex formula |
| 7c | └─ Special handling if city NOT capital (wonder 0xD check) | |
| 8 | **handle_city_disorder** | FUN_004ef578 |
| 9 | **process_city_science** (accumulate research) | FUN_004efbc6 |
| 10 | **If human player only:** | `(1 << owner & humanMask) != 0` |
| 10a | └─ **process_city_pollution_and_meltdown** | FUN_004efd44 |
| 10b | └─ **pay_building_upkeep** | FUN_004f0221 |
| 11 | **handle_city_expansion** (AI settler dispatch) | FUN_004f080d |
| 12 | Update civ max-city-value tracker (DAT_0064ca72) | inline |
| 13 | Clear city processing flag (DAT_006aa760 = 0) | |
| 14 | Refresh city window if open | UI only |
| 15 | If dialog pending: show city dialog | UI only |
| 16 | Return city_value (food*2 - shields) | |

### JS Mapping for process_city_turn (cityturn.js processCityTurn)

| Binary Step | JS Location | Status |
|-------------|-------------|--------|
| 0: Processing flag | Not needed | N/A |
| 0a: Adoption check | Lines 1102-1112 | OK |
| 0b-0c: Mode + flag clear | Not implemented | Minor (UI/flags) |
| 1: Food processing | `processCityFood()` at line 1129 | OK |
| 2: First yield calc | `calcHappiness()` at line 1115 (Step 1) | **DIFFERENT** — JS does happiness first, binary does food first |
| 3: Food storage delta | Handled inside processCityFood | OK |
| 3a: Food shortage warning | Lines 1138-1151 | OK |
| 4: Production | `processCityProduction()` at line 1154 | OK |
| 5: Unit support | `processUnitSupportDeficit()` at line 1206 | OK |
| 6: Second yield calc | Not implemented as separate pass | **MISSING** — no recalculation |
| 6a-6b: Score + category pools | Lines 1167-1182 (partial) | Partial |
| 7: Wonder/attitude checks | Not implemented in city turn | **MISSING** — this feeds AI |
| 8: Disorder | `handleCityDisorder()` at line 1233 | OK |
| 9: Science accumulation | Done at civ level in end-turn.js (lines 318-339) | **DIFFERENT LOCATION** — binary does per-city, JS does per-civ |
| 10: Pollution (human only) | `processCityPollution()` at line 1217 | **RUNS FOR ALL CIVS** — binary only runs for human |
| 10b: Building upkeep | Done at civ level in end-turn.js (lines 345-378) | **DIFFERENT LOCATION** — binary does per-city |
| 11: City expansion | Not implemented | **MISSING** (AI feature) |
| 12: Max city value | Not implemented | **MISSING** (minor) |

---

## 6. Critical Order-of-Operations Discrepancies

### 6.1. Healing BEFORE vs AFTER Cities (MAJOR)

**Binary**: `heal_units` → `process_civ_turn` (cities) → AI
**JS**: cities → healing → AI-equivalent

Units heal BEFORE city processing in the binary. This means a unit at 1 HP in
a city with barracks gets healed to full HP before the city processes production.
In the JS, the unit would still be damaged during city processing.

**Impact**: Minor for most cases, but affects city defense calculations during
city processing if any depend on garrison HP.

### 6.2. Unit Reset Scope (MAJOR)

**Binary**: `begin_turn_unit_reset` (FUN_0048710a) runs ONCE per full turn cycle
and resets ALL units for ALL civs simultaneously, including movement points, fortify
status, and spy timers.

**JS**: Movement reset happens per-civ at lines 69-84, only resetting the active
civ's units.

**Impact**: In the binary, a civ's units get their movement reset at the START
of the full turn, not when that civ's turn begins. This means if Civ 1 attacks
Civ 3's unit, Civ 3's unit already has its full movement for the upcoming turn.
In JS, Civ 3's units only get movement when Civ 3's turn starts.

### 6.3. Barbarian Spawning Timing (MODERATE)

**Binary**: Barbarians spawn BEFORE any civ processes (step 1 of process_end_of_turn).
**JS**: Barbarians spawn in two places:
  - `processBarbarianAI()` at line 51 (before civ processing) — OK
  - `spawnBarbarians()` at line 767 (AFTER all civ processing) — **WRONG**

The binary spawns barbarians BEFORE incrementing the turn counter and before any
civ gets processed. The JS spawns new barbarians AFTER the active civ's full
processing (cities, treasury, research, etc.).

**Impact**: New barbarian units appear before any civ acts in the binary. In JS,
barbarians spawn after the last civ of the previous cycle has finished. This
changes which units are present when the first civ of the new cycle starts.

### 6.4. Global Warming Timing (MODERATE)

**Binary**: Pollution counter update runs ONCE at the start of each full turn
cycle (step 2 of process_end_of_turn), before any civ processes.

**JS**: Global warming check runs during every civ's turn processing (lines 200-304).

**Impact**: In the binary, global warming can only trigger once per full turn.
In the JS, it runs every civ transition, potentially triggering multiple times
per turn cycle. The JS counter drift (line 238-239) happens 7x per turn cycle
instead of 1x.

### 6.5. Power Rankings Timing (MODERATE)

**Binary**: Power rankings calculated ONCE at start of turn cycle (step 3 of
process_end_of_turn), using the state from the END of the previous turn.

**JS**: Power ranking war trigger runs after each civ's processing (lines 854-901).

**Impact**: Binary uses a snapshot of all civs' states. JS evaluates after each
civ, meaning early civs see stale data and late civs see updated data.

### 6.6. City Processing Direction (MINOR-MODERATE)

**Binary**: Cities processed **backwards** (highest index to 0).
**JS**: Cities processed **forwards** (0 to highest index).

**Impact**: Affects order of:
- Wonder race resolution (first city to complete wins)
- Building sale priority during treasury deficit
- Settler disbanding during famine (cross-city effects)
- Shield overflow accumulation

### 6.7. Pollution: Human-Only vs All Civs (MINOR)

**Binary**: `process_city_pollution_and_meltdown` (FUN_004efd44) and
`pay_building_upkeep` (FUN_004f0221) only run for **human player** cities
(line 388: `(1 << owner & humanMask) != 0`).

**JS**: `processCityPollution()` runs for ALL civs' cities.

**Impact**: AI cities never generate pollution or have nuclear meltdowns in the
binary. In JS, AI cities can pollute and melt down. This could significantly
change the global warming counter since AI cities contribute pollution.

### 6.8. Building Upkeep: Per-City vs Per-Civ (MINOR)

**Binary**: Building upkeep (`pay_building_upkeep`, FUN_004f0221) runs inside
`process_city_turn` for each city. If treasury goes negative during a city's
processing, a building is sold immediately in THAT city.

**JS**: Building upkeep is summed across all cities and deducted at the civ level
(end-turn.js lines 345-378). If treasury goes negative, buildings are sold by
iterating cities 0→N and buildings 1→38 within each city.

**Impact**: Different buildings get sold when treasury is insufficient. Binary
sells from the city being processed (backwards order). JS sells from the first
city with the first sellable building (forward order, building ID order).

### 6.9. Science Processing Location (MINOR)

**Binary**: Science is accumulated per-city inside `process_city_turn` via
`process_city_science` (FUN_004efbc6), which doubles science under certain
conditions (first discoverer, AI space race).

**JS**: Science is summed at the civ level in end-turn.js (lines 318-339),
with doubling applied at the civ level (lines 394-409).

**Impact**: The binary's per-city doubling means individual city science output
is doubled before summing. The JS doubles the total. For most cases the result
is identical, but edge cases with rounding could differ.

### 6.10. Happiness Calculation Order (MODERATE)

**Binary**: Food processing (FUN_004ebbde) runs FIRST, then a full yield
recalculation (FUN_004eb4ed), then production, then disorder check.

**JS**: Happiness is calculated FIRST (Step 1 in processCityTurn, line 1115),
then food, then production, then disorder.

**Impact**: In the binary, the happiness state used for disorder checking
(step 8) reflects the city AFTER food and production changes (including
population growth/shrinkage). In JS, happiness is computed on the city state
from the START of the turn.

---

## 7. Missing Features in JS

| Feature | Binary Location | Priority |
|---------|----------------|----------|
| Future tech counter (turn > 199) | FUN_00487371 line 1819 | Low |
| Bulk map visibility refresh | FUN_00487007 | Low (done per-move) |
| Random ozone/event timer | FUN_00487371 lines 1842-1869 | Low |
| Load civ power values | FUN_004d01ae | Low (feeds AI) |
| AI evaluation | FUN_00560084 | High (no AI) |
| AI diplomacy | FUN_0053184d | High (no AI) |
| Population milestone check | FUN_00489292 | Medium |
| Per-city second yield recalc | FUN_004eb4ed (2nd call) | Low |
| Wonder/attitude checks in city | FUN_004f0a9c lines 352-385 | Medium (feeds AI) |
| City expansion (AI settler) | FUN_004f080d | High (no AI) |
| Per-city science accumulation | FUN_004efbc6 | Low (done at civ level) |

---

## 8. Summary of Action Items

### Must Fix (correctness impact)
1. **Move healing BEFORE city processing** — binary order is heal → cities
2. **Limit global warming check to once per turn cycle** — currently runs per-civ
3. **AI pollution exemption** — binary only pollutes human cities; JS pollutes all
4. **Happiness timing** — should compute after food, not before

### Should Fix (fidelity impact)
5. **Barbarian spawn timing** — move `spawnBarbarians()` to before civ processing
6. **Power rankings timing** — compute once at cycle start, not per-civ
7. **City processing direction** — reverse to match binary (highest to 0)
8. **Unit reset scope** — consider resetting all units at cycle start

### Nice to Have (completeness)
9. Building upkeep per-city instead of per-civ
10. Per-city science doubling
11. City expansion AI
12. Population milestone notifications
