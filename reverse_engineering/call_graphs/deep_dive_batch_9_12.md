# Deep Dive Batch 9-12: 8 Binary Functions vs JS Engine

Comparison of 8 large binary functions against their JS equivalents.
Each section lists: Binary behavior, JS implementation status, and Discrepancies.

---

## 1. calc_city_trade_desirability (FUN_0043d400, 8,227B)

**Binary source**: `block_00430000.md` line 2115
**JS equivalent**: `engine/production.js` → `calcSupplyDemand()` (line 665)

### Binary Behavior

Computes 16 supply and 16 demand commodity values per city, based on:
- Terrain type counts in 21-tile city radius (with river bonus +3 per type)
- City size tier `(size+2)/5`
- Science rate, leader index, continent ID, distance from map center
- Tech prerequisites, buildings, wonder effects
- Merges jungle(7) into grassland(6): `terrainCount[6] += terrainCount[7]; terrainCount[7] = 0`

Has a **recalc trigger**: only recalculates every 16 turns per city (using `(turnNumber + citySlot) & 0x0F == 0`) or when flagged. The JS version always recalculates.

After computing raw supply/demand, the binary:
1. Resolves conflicts (supply > demand → zero the smaller)
2. Sorts indices by value (ascending bubble sort)
3. Picks top 3 supply and top 3 demand commodities
4. Assigns 2 extra commodity slots via position-hash
5. Marks active trade routes by negating supply entries
6. Marks freight/caravan units by negating supply entries

### JS Implementation

`calcSupplyDemand()` (lines 665-999) faithfully ports all 16 supply and 16 demand formulas. Returns raw `{ supply, demand }` arrays but does **not** implement the post-computation phases (sort, select top 3, resolve conflicts, mark trade routes).

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Missing: recalc trigger** | Only recalcs when `(turn + slot) & 0xF == 0` or flag set | Always recalculates | Low (perf only, values identical when run) |
| 2 | **Missing: supply/demand resolution** | If supply[i] > demand[i] → zero the smaller | Not implemented — returns raw arrays | High — determines which commodities a city can actually offer |
| 3 | **Missing: top-3 selection + sorting** | Bubble-sorts and picks top 3 supply + top 3 demand commodities | Not done | High — needed for caravan/freight UI and trade route setup |
| 4 | **Missing: extra commodity slots (hash-based)** | Uses `(y*5+x*3)%14` and `(y*7+x*13)%14` to assign 2 extra demand/supply slots | Not implemented | Medium |
| 5 | **Missing: active trade route marking** | Negates supply entries for commodities in active trade routes | Not implemented | Medium — needed for trade route availability display |
| 6 | **Missing: freight unit marking** | Negates supply for commodities carried by freight units | Not implemented | Medium |
| 7 | **Supply[4] tech check** | Binary checks `has_tech(CONSTRUCTION=0x41)` (tech 65=Pottery?) | JS checks `hasTech(65)` — matches if Pottery=65 | Low — verify tech ID mapping |
| 8 | **Supply[8] gems formula** | Binary: `rawGems = riverCount*5 - terrainCount[2]`, with clamp logic between rawGems and rawForest (`rawForest = t[1]<<2`) | JS: `Math.max(rv5, t2v)` where `rv5=riverCount*5, t2v=t[2]` — simplified, different semantics | Medium — clamp vs max is not equivalent |
| 9 | **Supply[8] hemisphere check** | Binary: `if distY > 0: supply[8] >>= 1` (south of equator) | JS: `if city.gy > mapH/2` — different condition (checks absolute Y vs distance) | Low — both intend "southern hemisphere" |
| 10 | **Demand[5] Coal: Magnetism tech** | Binary checks Magnetism (0x17=23) twice — once for doubled, once for +50% | JS checks `hasTech(23)` (Electricity) once for doubled — missing second Magnetism +50% | Medium |
| 11 | **Demand[5] Navigation tech** | Binary: `if has_tech(NAVIGATION=0x10)`: `demand[5] = (demand[5] + 3) / 4` | JS: `if hasTech(16)` on demand[6] instead of demand[5] — appears in wrong demand slot | Medium — tech effect applied to wrong commodity |
| 12 | **Demand[6] formula** | Binary: `demand[6] = supply[3] + roadCount` (NOTE: roadCount potentially uninitialized — binary bug) | JS: `demand[6] = (riverCount + roadCount + 1) * sizeTier` — completely different formula | High — formula mismatch |
| 13 | **Demand[7] formula** | Binary: this IS the Spice demand with (x+y)%3 hash and slots 10/12/13 | JS: `demand[7] = supply[3] + roadCount` — swapped with demand[6] | High — demand slots 6 and 7 are swapped |
| 14 | **Demand[10] Ivory formula** | Binary: uses `terrain_food_yield[continent]` (not city pop) | JS: uses sum of city sizes on same continent as proxy | Medium — different data source |
| 15 | **Supply[11] continent pop check** | Binary: `if terrain_food_yield[continent] < 26: +50%, if > 300: halve` | JS: omits this check entirely | Medium |
| 16 | **Demand[14] building check** | Binary: `has_building(NUCLEAR_PLANT=15)` for the size penalty bypass | JS: `cityHasBuilding(city, 15)` for Factory +50% — different building ID interpretation | High — Nuclear Plant (binary 15) vs Factory (JS 15) |
| 17 | **Demand[15] building check** | Binary: `has_building(POWER_PLANT=21) or has_building(SAM_BATTERY=17)` | JS: `cityHasBuilding(city, 21) || cityHasBuilding(city, 17)` — same IDs but building 17 is SDI in JS comments | Low — verify building ID mapping |

---

## 2. load_full_game (FUN_00475666, 7,734B)

**Binary source**: `block_00470000.md` line 1247
**JS equivalent**: `engine/parser.js` → `parse()` method + `engine/init.js` → `initFromSav()`

### Binary Behavior

Master save file loader. Reads in order:
1. Magic "CIVILIZE" + version check (rejects v<0x26, v==0x29-0x2B, v>0x2C)
2. `load_game_file()` — core data (game state, civ records)
3. Detect scenario flags (0x40, 0x80); clear god/debug mode
4. Map data (terrain + 2 visibility layers)
5. Random seeds (0x400 bytes)
6. Units + cities
7. 21 wonders (3 bytes each: destroyed/cityId/obsolete)
8. Active unit position, current unit position
9. Per-player viewports
10. Tail data (0x4B0 bytes) + packed viewport state (0x6A bytes)
11. Per-player MP data (8 × 10 bytes)
12. Scenario block + engine constants (0x152 bytes)
13. MP timing block (for version >= 0x29)
14. Events section ("EVNT" magic)
15. **Post-load fixup: negate leader portrait indices for unknown civs**
16. **Post-load fixup: reconstruct per-civ unit_type_counts[8][62] from unit array**
17. **Post-load fixup: reconstruct building_counts[8][?] from city.building**
18. Invalidate caches, reload sounds, set viewport rebuild flag

### JS Implementation

`parser.js:parse()` (line 1141) loads: header, game state, civ name/data blocks, map data, units, cities, gap record, tail data, and events. `initFromSav()` (line 45) builds gameState from parsed data.

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Missing: version validation** | Rejects v<0x26, v==0x29-0x2B, v>0x2C | No version filtering — accepts anything with CIVILIZE magic | Low — JS only needs to handle standard MGE saves |
| 2 | **Missing: random seeds** | Reads 0x400 bytes of random seed data after visibility layers | Not parsed — random seeds skipped | Medium — affects reproducibility |
| 3 | **Missing: unit_type_counts reconstruction** | After load, iterates all alive units to rebuild `unit_type_counts[civ][unitType]` | Done at runtime in `engine/ai/data.js` line 127 — `buildAiData()` computes these on demand | None — different timing, same result |
| 4 | **Missing: building_counts reconstruction** | Iterates all cities to count `building_counts[civ][city.building]` for items in production | Not reconstructed explicitly | Low — JS tracks buildings via city.buildings Set |
| 5 | **Missing: leader portrait FOW negation** | Negates portrait indices for civs not yet contacted (sign convention) | Not needed — JS uses separate contact tracking | None — different representation |
| 6 | **Missing: viewport state unpacking** | Unpacks 0x6A bytes of packed viewport state | Not parsed — viewport is client-side in JS | None — UI concern only |
| 7 | **Missing: scenario flags** | Clears cheat mode, god mode, debug flags on scenario load | JS handles scenario flags differently via scenarioBlock parsing | Low |
| 8 | **Wonders: byte layout** | 3 bytes per wonder: destroyed byte, city ID (u16 LE), obsolete flag | JS parser reads wonders from game state section (different offsets) | Low — verify field mapping |
| 9 | **Missing: MP timing block** | For version >= 0x29, reads 0x494 bytes of MP timing data | Not parsed | Low — multiplayer save format detail |
| 10 | **Missing: cache invalidation** | Binary calls `invalidate_caches()` after load | JS has no equivalent cache layer | None |

---

## 3. ai_evaluate_diplomacy (FUN_0045705e, 6,616B)

**Binary source**: `block_00450000.md` line 326
**JS equivalent**: `engine/diplomacy.js` → `calcAttitudeScore()` (line 2113) + `engine/ai/diplomai.js`

### Binary Behavior

Master diplomacy evaluation function. Computes ~20 global output variables:
- `tributeAmount`: gold demand based on per-continent military strength comparison
- `techDemand`: technology leverage score
- `attitudeScore`: final attitude (0-100 scale, with thresholds at 26, 74)
- `wantsMore`: flag for aggressive demands
- `wantsNothing`: 0=friendly, 1=neutral, 2=aggressive
- `shouldDeclareWar`: boolean based on difficulty, cities, turn
- `thirdPartyCivForWar/Cancel/TechDemand`: third-party target selection
- `borderViolations`: unit proximity count

Key computation chain:
1. Nuclear capability check across all civs
2. Per-continent military strength comparison (63 continents)
3. Great Library bonus to techDemand (+25%)
4. Attitude score from base attitude + modifiers (alliance, vendetta, patience, treaty violations)
5. Government personality modifier divides tributeAmount
6. Attitude thresholds: <26 → halve techDemand; >74 → +50%
7. Great Wall / United Nations wonders block war declaration
8. Unit proximity border violations double techDemand
9. Final tribute = `((diff+1) * techDemand + 16) / 32 * 50`
10. War weariness and senate check

### JS Implementation

`calcAttitudeScore()` (diplomacy.js line 2113) is a **reimagined** attitude scoring function using a phase-based approach (15 phases). It computes a relative score (not 0-100 scale) based on: tech rank, alliance status, treaty status, power rankings, spaceship status, personality, military comparisons, and wonder effects.

`diplomai.js` contains the full negotiation state machine (O.1-O.5), including tribute evaluation and tech exchange logic.

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Different architecture** | Computes ~20 global variables in one function | Split across `calcAttitudeScore()` + multiple diplomai.js functions | Medium — different structure, may produce different aggregate results |
| 2 | **Missing: per-continent strength scan** | Iterates 63 continents comparing military strength for tribute/techDemand | JS uses aggregate `militaryPower` per civ, not per-continent | High — granular continental power balance missing |
| 3 | **Missing: tribute amount calculation** | `tributeAmount = Sigma(civA_strength * diff_factor / (civB_strength + 1))` per continent | JS diplomai.js has simplified tribute logic | Medium |
| 4 | **Attitude scale differs** | Binary: 0-100 scale with thresholds at 26, 50, 74, 99 | JS: relative score (can be negative) with no fixed scale | High — thresholds affect behavior differently |
| 5 | **Missing: patience divider** | Binary divides tributeAmount by `(patience-1)/2 + 1` | JS uses patience in a different way (calcPatienceThreshold) | Medium |
| 6 | **Missing: wantsNothing/wantsMore state machine** | Binary tracks 3-state output (0=friendly, 1=neutral, 2=aggressive demand mode) | JS tracks treaty status and uses boolean flags instead | Medium |
| 7 | **Missing: border violation scan** | Binary iterates all units checking proximity to civB territory, doubles techDemand per violation | Not implemented in JS | High — significantly affects demand severity |
| 8 | **Missing: consecutive demands reset** | If `consecutiveDemands > 9`, resets demands and wantsMore | Not tracked | Low |
| 9 | **Great Wall/UN wonder** | Binary: sets shouldDeclareWar=0, clears wantsMore, attitude-=10, clears treaty flags | JS: blocks war declaration via `shouldBlockWarDeclaration()` + score penalty | Medium — similar effect, different mechanism |
| 10 | **Missing: third-party target selection** | Binary scans all civs for alliance targets, weakest ally of opponent, best war target | JS has simplified alliance proposal in diplomai.js O.3 | Medium |
| 11 | **Missing: scenario special rules** | Binary has hardcoded civ pairs (6,7), (3,6), (3,1) for forced war/peace in scenario mode | Not implemented | Low — scenario-specific |
| 12 | **Missing: senate war check** | Binary calls `senate_war_check()` for republics/democracies | JS has simplified senate check in reducer | Medium |

---

## 4. generate_world_map (FUN_00408d33, 6,004B)

**Binary source**: `block_00400000.md` line 1387
**JS equivalent**: `engine/mapgen.js` → `generateMap()` (line 80)

### Binary Behavior

9-phase terrain generation pipeline:
1. Init: all tiles ocean, set bounds (yMin/yMax with 50% asymmetry, xMin=3, xMax=mw-3)
2. Continent placement: random walk with `placeLandLarge` or `placeLandSmall`, until totalLand >= target
3. Terrain assignment by latitude: zone = distance_from_equator / polar_zone, adjusted by temperature
4. Moisture pass: east-to-west and west-to-east, promoting terrain based on moisture accumulation
5. Elevation pass: `(age*5+10)*160` random promotions (desert→plains, plains→hills, etc.)
6. Smoothing pass: `(3-(age+2))*800` = `(1-age)*800` iterations of neighbor majority voting
7. River generation (separate function)
8. Polar caps: force glacier at rows 0 and mh-1, tundra scatter
9. Body ID assignment + fertility calculation

Key details:
- Wrapping maps double temperature and climate before use
- Bridge checker connects disconnected landmasses (flags==6 or flags==9)
- Smoothing uses `(3-(age+2))*800 = (1-age)*800` iterations (0 for normal age=1)
- After body IDs, marks isolated ocean tiles with 0x40 flag

### JS Implementation

`generateMap()` (mapgen.js, 1137 lines) faithfully reproduces all 9 phases using an MSVC-compatible LCG PRNG. Phase pipeline: init → continent placement → latitude terrain → moisture → elevation → smoothing → rivers → polar caps → body IDs → fertility.

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Wonder city IDs** | Binary clears all 21 wonder city IDs at start of map gen | JS does not (mapgen only produces map data, wonders initialized elsewhere) | None — correct separation |
| 2 | **Bridge checker** | Binary connects disconnected landmasses using flag patterns (6 or 9) | JS implements this (verify exact implementation) | Low — needs verification |
| 3 | **Terrain assignment temperature offset** | Binary: `offset = temperature * -3` (or `*-6` for wrapping, but wrapping already doubled temp) | JS needs verification of temperature scaling | Low |
| 4 | **Smoothing iteration count** | Binary: `(3 - (age + 2)) * 800 = (1 - age) * 800`. For age=0(young): 800, age=1(normal): 0, age=2(old): -800 (no smoothing) | JS needs verification — negative means no iterations | Low |
| 5 | **Missing: isolated ocean marking** | Binary marks ocean tiles with `tile.terrain |= 0x40` if no land in city radius (20 tiles) | JS does not set this flag | Low — only affects resource display for deep ocean |
| 6 | **Resource seed assignment** | Binary calls `assign_resource_seeds()` (FUN_0055a980) after body IDs | JS handles resource seeds via mapSeed parameter | Low |
| 7 | **Polar tundra scatter count** | Binary: `map_width/8` random tundra tiles near each pole | JS needs verification of scatter count | Low |
| 8 | **xMin/xMax bounds** | Binary: `xMin=3, xMax=map_width-3` | JS: `xMin=min(3, mw/4), xMax=max(xMin, mw-min(3, mw/4))` — adapts to small maps | Low — JS is more robust |
| 9 | **Phase ordering: body IDs** | Binary calls `assign_body_ids()` twice — once after continent placement, once after polar caps | JS calls once after polar caps via `assignContinentBodyIds()` | Low — second call overwrites first anyway |

Overall: **mapgen.js is the most faithful port** of any function in this batch. The 9-phase pipeline matches closely.

---

## 5. ai_naval_and_ranged_move (FUN_00537331, 5,855B)

**Binary source**: `block_00530000.md` line 638
**JS equivalent**: `engine/ai/unitai.js` → `aiNavalCombat()` (line 2408) + related sections

### Binary Behavior

Handles 4 distinct unit categories:
- **Section A**: Ranged single-shot units (range==1): fire nuke if low HP and in range
- **Section A2**: Multi-shot ranged: fire if half fuel used and in range of own city
- **Section B**: Bombardment units (flags & 0x10): find best enemy target by firepower+terrain, teleport adjacent and fire
- **Section C**: Naval attack role (role==3): complex target prioritization (naval>land, weak>strong, close>far), with human player weighting and coastal staging logic
- **Section D**: Ranged/bomber city attack (role==0, range>0): find enemy city to bombard, score by `size*10 - garrison_hp*25 + continent_bonus + adjacency_bonus`

Key mechanics:
- Fuel management: `fuelRemaining = range - (fuelUsed + 1)`
- Effective range: `(fuelRemaining * get_unit_range + get_hp) / moveSpeed`
- Cross-continent naval attack via coastal staging points
- Teleport mechanism for bombardment units (instant repositioning)

### JS Implementation

`aiNavalCombat()` (unitai.js line 2408) handles Role 2 (Naval superiority) with 8 priority levels:
1. Retreat when heavily damaged → find nearest port
2. Attack adjacent enemies with combat score evaluation
3. Escort friendly transports
4. Blockade enemy coastal cities
5. Hunt enemy ships
6. Patrol near own coastal cities
7. Explore uncharted ocean
8. Random sea movement

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Missing: ranged/nuke fire logic (Section A)** | Single-shot and multi-shot ranged units auto-fire (disband = launch) when conditions met | Not implemented — no ranged fire/nuke launch AI | High |
| 2 | **Missing: bombardment target selection (Section B)** | Iterates all enemy units, scores by firepower + terrain/city/veteran bonuses, teleports adjacent | Not implemented — no bombardment AI | High |
| 3 | **Missing: naval attack prioritization (Section C)** | Complex priority: `dist*2`, human player halves priority, ranged/low-hp bonuses, coastal staging | JS uses simpler distance-based target finding | Medium |
| 4 | **Missing: bomber city attack (Section D)** | Scores enemy cities: `size*10 - garrison*25 + continent+adjacency`, sets goto | Not implemented for air units | High |
| 5 | **Missing: fuel management** | Binary tracks `fuelUsed`, computes effective range from remaining fuel | JS does not model fuel for AI decisions | High |
| 6 | **Missing: teleport mechanism** | Binary uses `teleport_unit()` for instant repositioning of bombardment units | JS has no equivalent | High |
| 7 | **Missing: cross-continent staging** | Binary evaluates human coastal cities as staging points for naval attacks | JS has no cross-continent naval strategy | Medium |
| 8 | **Role mismatch** | Binary handles role==3 (naval attack) separately from bombardment | JS `aiNavalCombat` handles generic role 2 (naval superiority) | Medium |
| 9 | **Added: escort/blockade/patrol** | Binary does not have these as explicit behaviors | JS adds transport escort, coastal blockade, and patrol behaviors | Improvement |

---

## 6. new_civ (FUN_004a7ce9, 5,834B)

**Binary source**: `block_004A0000.md` line 1229
**JS equivalent**: `engine/init.js` → `createNewCiv()` (line 417) + `initNewGame()` (line 191)

### Binary Behavior

Master civ creation function handling both turn-0 initialization and mid-game respawn:
1. Check if civ already alive (if so, skip re-initialization)
2. Initialize fields: treasury=0, government=despotism, scienceRate=4, taxRate=4, luxRate=1
3. `researchTurns = max(10, turn)`
4. Randomize attitudes: AI targets `rand()%80+10`, human targets `clamp(diff*5+rand()%80+10, 10, 75)`
5. Setup tribe names and city style
6. Clear continent goals, embassy, espionage data
7. **Grant starting techs**: for each advance 0-98, if 2+ other civs have it, grant with `rand()%(diff+1) > 0` chance
8. Clear unit-ever-built arrays
9. **Select tribe**: 3-pass scan for available tribe matching rules slot
10. **Find starting location**: up to 2001 iterations with constraints:
    - City founding validity check
    - Inter-civ spacing (minimum distance)
    - Terrain quality (food score >= threshold)
    - Continent occupancy (after turn 200, avoid continents with existing civs)
    - No other unit/city present
    - Earth-map center bias if flag set
11. If predefined start position exists (turn==0), use it instead
12. Place settler + explorer, reveal 21-tile radius, remove nearby goody huts
13. Set science/tax rates from tribe defaults
14. Multiplayer client path: delegates to server

### JS Implementation

`createNewCiv()` (init.js line 417) handles initialization only (not starting position). `initNewGame()` (line 191) handles map-based placement via `assignInitialSettlerPositions()`.

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Starting tech algorithm** | Binary: for each of 99 advances, if 2+ civs have it → `rand()%(diff+1) > 0` grants it | JS: Fisher-Yates shuffle of no-prereq techs, count by difficulty (7/5/3/2/1/0) | High — fundamentally different algorithm. Binary grants techs that other civs already have; JS grants random no-prereq techs |
| 2 | **Science/tax rates** | Binary: scienceRate=4, taxRate=4, luxRate=1 (40%/40%/10%) | JS: scienceRate=5, taxRate=5, luxuryRate=0 (50%/50%/0%) | Medium — different starting rates |
| 3 | **researchTurns** | Binary: `max(10, turn)` | JS: not tracked as separate field | Low |
| 4 | **Missing: mid-game respawn** | Binary handles both turn-0 and respawn (inheriting techs from other civs) | JS only handles turn-0 creation | Medium — respawn path unused until civ elimination implemented |
| 5 | **Missing: tribe selection** | Binary: 3-pass scan of 21 tribes for unused ones matching rules slot | JS: assigns rulesCivNumber sequentially (civSlot-1) | Medium — less variety in civ assignment |
| 6 | **Starting position algorithm** | Binary: random search with 5+ constraints (spacing, food, continent, occupancy) | JS: `assignInitialSettlerPositions()` uses fertility scoring + distance maximization | Medium — different but both effective |
| 7 | **Missing: predefined start positions** | Binary uses DAT_00627fe0/628010 for scenario starts | JS does not check for predefined positions | Low — scenario feature |
| 8 | **Missing: explorer unit** | Binary places explorer if tech allows | JS only places Settlers + Warriors | Medium |
| 9 | **Missing: continent goals clearing** | Binary clears 48 per-continent AI goals for new civ | JS initializes AI goals separately | Low |
| 10 | **Attitude randomization** | Binary: AI→AI attitude is `rand()%80+10`, AI→human is `clamp(diff*5+rand()%80+10, 10, 75)` | JS: same formula but applies human check based on seat.ai flag instead of global human bitmask | Low — functionally equivalent for single-player |

---

## 7. ai_barbarian_unit_turn (FUN_005351aa, 6,102B)

**Binary source**: `block_00530000.md` line 1269
**JS equivalent**: `engine/ai/barbarian.js` → `barbarianUnitAI()` (line 170)

### Binary Behavior

Complete barbarian unit AI with distinct paths:
1. **Edge guard**: kill units at y<2 or y>=mh-2
2. **Naval barbarians** (domain!=0):
   - Scuttle weak ships (hp-stackSize < 2)
   - 30-turn timeout (fuelUsed counter)
   - Check 8 neighbors for: coastal landing + city founding (RANSOMCITY event), ship combat
   - Scan all cities for best target: `(cityValue + 50) / (dist + 1)`
   - Navigate via `ai_set_goto_via_coast()`
3. **Land barbarians**:
   - Difficulty 0 or on fortress: fortify
   - Direction bias toward nearest human city (with wrapping)
   - Skip bias if: target is own city, civ has <2 cities, civ treasury <100
   - Settler behavior: chase weak enemies, pillage improvements
   - 8-direction scored movement: +4 enemy territory, +6 road, +8 fortress, +rand(0-5), +6 preferred dir, +2 per component match, +99 enemy unit, -20 friendly stack
4. **Finalize**: set GOTO target or fortify, cancel stale goto at current position

### JS Implementation

`barbarianUnitAI()` (barbarian.js line 170) implements:
- Edge guard (y<2 or y>=mh-2 → disband)
- Non-combat settler AI (try BUILD_CITY or move to land tile, else disband)
- Combat AI: attack adjacent enemies → rush adjacent cities → target best city by `(size+50)/(dist+1)` → scored directional movement

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **Missing: naval barbarian logic** | Full naval path: scuttle weak, 30-turn timeout, coastal raiding, city founding with RANSOMCITY event | JS skips naval barbarians entirely (no domain check) | High |
| 2 | **Missing: barbarian city founding** | Binary can found barbarian cities with ransom dialog | JS non-combat barbarians try BUILD_CITY but no ransom mechanic | Medium |
| 3 | **Missing: direction bias toward human cities** | Binary computes directional preference toward nearest human city, with wrapping and treasury/city-count thresholds | JS always targets best city by score, no directional bias | Medium |
| 4 | **Missing: settler pillage behavior** | Binary barbarian settlers chase weak enemies, pillage improvements at high difficulty | JS settlers just try to found cities or disband | Medium |
| 5 | **Missing: difficulty-based fortify** | Binary: difficulty==0 or on-fortress → fortify instead of roam | JS: no difficulty-based behavior difference | Low |
| 6 | **City targeting score** | Binary: `(cityValue + 50) / (dist + 1)` where cityValue = `city_defense_value()` | JS: `(size + 50) / (dist + 1)` — uses city size instead of defense value | Medium |
| 7 | **Missing: stack-based combat eval** | Binary checks hp, stackSize, and unit counts before attack decisions | JS always attacks adjacent enemies regardless of odds | Low — barbarians are supposed to be reckless |
| 8 | **Scoring values differ** | Binary: +4 territory, +6 road, +8 fortress, +rand(0-5), +6 lastDir, +2 per component | JS: +4 territory, +6 road/improvements, +8 city, +rand(0-5), +6 prefDir, +2 per component | Low — close enough |
| 9 | **Missing: fortify at end** | Binary: if bestDir==8, set lastDir=0xFF, call unit_sleep, check for fortress fortify | JS: returns `UNIT_ORDER skip` | Low |
| 10 | **Missing: goto cancellation** | Binary: if goto target equals current position, cancel goto | Not implemented in JS | Low |
| 11 | **Missing: fuelUsed counter** | Binary: naval barbarians increment fuelUsed for timeout tracking | Not tracked | Medium — part of naval path |

---

## 8. new_game_setup_flow (FUN_0041ba52, 6,555B)

**Binary source**: `block_00410000.md` line 2295
**JS equivalent**: `engine/init.js` → `initNewGame()` (line 191), server lobby handles setup UI

### Binary Behavior

This is the **setup wizard UI function** — a sequential dialog flow:
1. **Difficulty**: radio dialog, 6 options
2. **Opponents**: radio dialog, number of AI (or random: `rand()%5+2`)
3. **Barbarian activity**: radio dialog with difficulty-scaled random
4. **Game rules**: standard vs advanced (checkboxes for flat earth, bloodlust, simplified combat, accelerated production)
5. **Gender**: radio dialog
6. **Civilization/tribe selection**: scrollable list of 21 civs
7. **City style**: radio dialog with art previews (4 styles)
8. **Randomize AI opponents**: for each AI slot, pick random unique civ
9. **Optional manual opponent selection** (if advanced checkbox)
10. **Finalize**: save prefs, load advances/units/improvements, init game, init advisors
11. If accelerated start: `set_start_techs(accel_choice - 1)`

Key: calls `init_game(gameType)` which itself calls `init_new_game()` (FUN_004aa9c0) which:
- Clears all state, sets turn=0, endOfGameTurn=0xF060
- Initializes all 8 civs via `new_civ()`
- Calls `assign_initial_settler_positions()`
- Sets Chieftain treasury=50
- Validates player counts (AI+human <= 10)

### JS Implementation

The JS equivalent splits this across:
- Server lobby (room/seat management in `server/server.js`)
- `initNewGame()` (init.js line 191): generates map, initializes civs, places settlers
- No UI wizard — all settings come from lobby UI in the web client

### Discrepancies

| # | Category | Binary | JS | Severity |
|---|----------|--------|-----|----------|
| 1 | **UI vs logic separation** | Binary mixes UI dialogs with game initialization | JS correctly separates: lobby handles UI, init.js handles game logic | None — architectural improvement |
| 2 | **Missing: accelerated start** | Binary grants era-appropriate techs via `setup_scenario_start(era)` | JS does not implement accelerated production starts | Medium — feature gap |
| 3 | **Missing: barbarian activity setting** | Binary has difficulty-scaled random barbarian level | JS uses a simple `barbarianActivity` string ('roaming') | Low — simplified |
| 4 | **Missing: game rules advanced options** | Binary: flat earth, bloodlust, simplified combat, accelerated production checkboxes | JS: game toggles come from save file or defaults; no advanced options UI | Medium |
| 5 | **Missing: opponent manual selection** | Binary allows manually choosing which civs opponents play | JS assigns civs sequentially | Low |
| 6 | **endOfGameTurn** | Binary: `endOfGameTurn = 0xF060` (61536) | JS: no explicit end-of-game turn limit | Low |
| 7 | **Player count validation** | Binary: clamps `aiPlayers + humanPlayers <= 10, each <= 6` | JS: no validation beyond seat count | Low |
| 8 | **Missing: game prefs save/load** | Binary persists preferences (last difficulty, map size, etc.) | JS: no persistent preferences | Low — web app concern |
| 9 | **Init pipeline** | Binary: setup wizard → init_game() → init_new_game() → new_civ() × 8 → assign_positions | JS: lobby settings → initNewGame() → createNewCiv() × N → assignInitialSettlerPositions() | None — equivalent pipeline |
| 10 | **Starting units** | Binary: places Settlers + Explorer (if tech allows) per civ | JS: places Settlers + Warriors per civ | Medium — missing Explorer, extra Warriors |

---

## Summary: Priority Discrepancies

### Critical (would affect gameplay if systems were active)
1. **calc_city_trade_desirability**: Missing supply/demand resolution, top-3 selection, demand slot swap (6↔7), formula mismatches
2. **ai_evaluate_diplomacy**: Per-continent military strength scan missing, different attitude scale, border violations missing
3. **ai_naval_and_ranged_move**: Missing ranged fire, bombardment, fuel management, cross-continent staging
4. **new_civ**: Fundamentally different starting tech algorithm (random pool vs inheriting from other civs)

### Medium (affect AI quality or edge cases)
5. **ai_barbarian_unit_turn**: Missing naval barbarian path, direction bias, city founding
6. **new_game_setup_flow**: Missing accelerated start, advanced game options
7. **load_full_game**: Missing random seeds, MP timing block

### Low (cosmetic, performance, or scenario-only)
8. **generate_world_map**: Most faithful port. Minor differences in bounds handling, isolated ocean marking
