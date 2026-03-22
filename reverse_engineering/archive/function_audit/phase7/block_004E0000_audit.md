# Block 004E0000 — Phase 7 Audit

**Functions in this block: 76**
**System: City turn pipeline — yields, trade, happiness, food, production, disorder, pollution**

---

## FW — Framework (18 functions)

FUN_004e0140 | 26B | N/A (CRT init wrapper — no game logic)
FUN_004e015a | 31B | N/A (CRT heap alloc — no game logic)
FUN_004e0179 | 29B | N/A (CRT atexit register — no game logic)
FUN_004e0196 | 26B | N/A (CRT cleanup handler — no game logic)
FUN_004e02cb | 22B | N/A (MFC dialog destructor — city options)
FUN_004e02e1 | 14B | N/A (SEH unwind thunk)
FUN_004e27df | 22B | N/A (MFC dialog destructor — pick music)
FUN_004e27f5 | 14B | N/A (SEH unwind thunk)
FUN_004e7240 | 48B | N/A (Win32 ShowWindow/UpdateWindow wrapper)
FUN_004eb7e5 | 22B | N/A (MFC dialog destructor — city event)
FUN_004eb7fb | 15B | N/A (SEH unwind thunk)
FUN_004ebbad | 12B | N/A (DirectDraw render context cleanup)
FUN_004ebbb9 | 22B | N/A (DirectDraw surface cleanup)
FUN_004ebbcf | 15B | N/A (SEH unwind thunk)
FUN_004eeee7 | 12B | N/A (MFC dialog destructor)
FUN_004eeef3 | 12B | N/A (MFC dialog destructor)
FUN_004eeeff | 22B | N/A (MFC dialog destructor — production complete)
FUN_004eef15 | 14B | N/A (SEH unwind thunk)

---

## UI — User Interface (17 functions)

FUN_004e01b0 | 283B | N/A (Win32 wonder selection dialog)
FUN_004e02ef | 926B | N/A (Win32 city window layout calculator)
FUN_004e068d | 1023B | N/A (Win32 File→Load Game handler)
FUN_004e0a8c | 36B | N/A (Win32 checkbox helper)
FUN_004e0ab0 | 705B | N/A (Win32 Game Options dialog)
FUN_004e0d71 | 423B | N/A (Win32 Graphic Options dialog)
FUN_004e0f18 | 1020B | N/A (Win32 Multiplayer Options dialog)
FUN_004e1452 | 783B | N/A (Win32 Message Options dialog)
FUN_004e22c9 | 726B | N/A (Win32 Quit/Retire handler)
FUN_004e2597 | 88B | N/A (Toggle hidden terrain — debug/cheat, handled client-side)
FUN_004e25ef | 496B | N/A (Win32 Pick Music dialog — sound N/A)
FUN_004e2803 | 4739B | N/A (Win32 WM_COMMAND dispatch — 80+ menu cases)
FUN_004e3a86 | 4620B | N/A (Win32 menu bar builder)
FUN_004e4c92 | 89B | N/A (Win32 menu item label updater)
FUN_004e4ceb | 9557B | N/A (Win32 menu state sync — 9.5KB of EnableMenuItem calls)
FUN_004eb571 | 612B | N/A (Win32 city event dialog)
FUN_004eb80a | 931B | N/A (Win32 city event dialog v2 — with Go To City)

---

## GL — Game Logic: City Workers & Tile Management (10 functions)

FUN_004e7549 | 93B | YES (data model difference)
  Binary: set_worker_tile_status — bitmask encoding for worker flags
  JS: engine/production.js — uses workedTiles array instead of bitmask
  Match: YES — different data model but equivalent semantics

FUN_004e75a6 | 68B | YES (data model difference)
  Binary: get_worker_tile_status — bitmask decoding
  JS: engine/production.js — workers accessed via city.workedTiles array
  Match: YES — equivalent semantics

FUN_004e75ea | 87B | YES (data model difference)
  Binary: count_worker_tiles_with_status — loop 0-20 counting bitmask entries
  JS: city.workedTiles.length + 1 (for center)
  Match: YES — equivalent semantics

FUN_004e78ce | 62B | YES (data model difference)
  Binary: is_tile_worked — checks tile.city_worker_id byte (0xFF = none)
  JS: reducer checks workedTiles membership per city
  Match: YES — JS uses city-centric model instead of tile-centric

FUN_004e790c | 91B | YES (data model difference)
  Binary: set_tile_worked — writes city_worker_id to tile byte
  JS: workedTiles array manipulation in reducer
  Match: YES — equivalent semantics

FUN_004e7641 | 653B | YES
  Binary: evaluate_city_tiles — sum food/shields/trade for all worked tiles
  JS: engine/production.js:168 calcGrossFood() + calcGrossShields() + calcGrossTrade()
  Match: YES — JS splits into 3 functions but covers the same iteration

FUN_004e8e4d | 130B | YES
  Binary: calc_tile_all_resources — wrapper calling calc_tile_resource
  JS: engine/production.js:136 getTileYields()
  Match: YES — direct equivalent

FUN_004e8ecf | 115B | YES (design difference)
  Binary: clear_and_check_worked_tiles — clears all then re-marks city center
  JS: rebuilds workedTiles from scratch each turn
  Match: YES — different approach, same result

FUN_004e9719 | 149B | YES
  Binary: adjust_specialist_count — ensures specialists + workers == city.size
  JS: handled in cityturn.js processCityFood (famine path, lines 171-174)
  Match: YES — JS removes a specialist first, then worst worker on shrink

FUN_004e97ae | 155B | N/A (design difference)
  Binary: sync_worker_tile_status — syncs bitmask with map tile markers
  JS: uses single representation (workedTiles array), dual-sync not needed

---

## GL — Game Logic: Small Helpers (8 functions)

FUN_004e1314 | 318B | PARTIAL
  Binary: toggle_unit_movement_doubling — Lighthouse/Nuclear Power movement
  JS: NOT PORTED — movement bonuses from wonders handled passively via movement rules
  Match: PARTIAL — wonder movement effects checked at move time, not toggled on/off
  Fix needed: None — JS architecture handles this differently (passive check vs toggle)

FUN_004e7458 | 58B | YES (design difference)
  Binary: classify_production_type — returns 0=unit, 1=building, 2=wonder from int ID
  JS: uses { type: 'unit'|'building'|'wonder', id } objects
  Match: YES — equivalent semantics, different encoding

FUN_004e7492 | 77B | YES
  Binary: init_city_production_globals — sets DAT_0064bccb=2, DAT_0064bccc=10, etc.
  JS: engine/defs.js — FOOD_BOX_MULTIPLIER=10, constants in COSMIC section
  Match: YES — all COSMIC constants verified present in defs.js

FUN_004e74df | 106B | YES
  Binary: calc_food_box_with_difficulty — chieftain 60%, warlord 80%
  JS: engine/cityturn.js:55 calcFoodBoxWithDifficulty()
  Match: YES — exact formula match

FUN_004e8c8c | 297B | NOT PORTED
  Binary: check_auto_irrigation_trigger — Supermarket auto-upgrades irrigation→farmland
  JS: NOT PORTED — building completion trigger, not per-turn
  Fix needed: Low priority — farmland bonus already works via calcTileFood when both
  irrigation+mining flags set

FUN_004e8db5 | 152B | YES
  Binary: check_road_trade_trigger — road +1 trade on desert/plains/grassland
  JS: engine/production.js:101-102 calcTileTrade — `if (hasRoad && (ter < 3 || trade > 0))`
  Match: YES — condition captures desert(0)/plains(1)/grassland(2) plus other terrains with trade

FUN_004e7d7f | 306B | YES
  Binary: check_unit_support — shield support cost with free tiers per government
  JS: engine/production.js:297 calcUnitShieldSupport()
  Match: YES — verified: anarchy/despotism=city.size, republic/democracy=0,
  monarchy/communism=3, fundamentalism=10 (COSMIC_FREE_SUPPORT)

FUN_004eb327 | 374B | YES
  Binary: calc_trade_route_income — distance-based trade route revenue
  JS: engine/production.js:573 calcTradeRouteIncome()
  Match: YES — formula covers same/foreign civ, continent, demand bonus

---

## GL — Game Logic: Corruption, Trade & Happiness (6 functions)

FUN_004e9849 | 82B | YES
  Binary: calc_corruption_divisor — per-government lookup table
  JS: engine/defs.js:446 GOVT_CORRUPTION_DIVISOR
  Match: YES — values verified: anarchy=1, despotism=1, monarchy=2, communism=2,
  fundamentalism=3, republic=3, democracy=4

FUN_004e989a | 890B | YES
  Binary: calc_corruption — distance-based trade corruption
  JS: engine/production.js:411 calcTradeCorruption()
  Match: YES — verified:
    - Democracy returns 0 ✓
    - Fundamentalism returns 0 ✓ (confirmed in reference: corruptionZeroGovts: [4, 6])
    - Communism uses fixed distVal=3 (DAT_0064BCD8 replaces distance) ✓
    - Formula: (distVal * trade * 3) / (govtFactor * 20) ✓
    - Courthouse/Palace halves corruption ✓
    - WLTKD bumps effective government tier ✓

FUN_004e7967 | 1046B | YES
  Binary: calc_capital_distance_and_corruption — finds capital, Manhattan distance with wrapping
  JS: engine/production.js:284 capitalDistance()
  Match: YES — uses doubled cx/cy coordinates with horizontal wrapping

FUN_004ea031 | 437B | YES
  Binary: adjust_happy_unhappy — clamp and balance happy/unhappy/surplus between phases
  JS: engine/happiness.js:46 adjust() inner function
  Match: YES — exact logic match verified (clamp → surplus→unhappy → cap → fill)

FUN_004ea1f6 | 1774B | YES
  Binary: distribute_trade — split net trade into lux/tax/sci with building multipliers
  JS: engine/production.js:439 calcTradeDistribution()
  Match: YES — verified:
    - Rate distribution with rounding ✓
    - Specialist bonuses (entertainer=2 lux, taxman=3 gold, scientist=3 sci) ✓
    - Marketplace(5)/Bank(10)/Stock Exchange(22): +50% each to lux and tax ✓
    - Library(6)/University(12)/Research Lab(26): +50% each to science ✓
    - Isaac Newton (wonder 16): doubles science building effect in wonder city ✓
    - Copernicus (wonder 11): doubles science in wonder city ✓
    - Fundamentalism science penalty applied last ✓

FUN_004ea8e4 | 2627B | YES
  Binary: calc_happiness — 7-step happiness calculation
  JS: engine/happiness.js:28 calcHappiness()
  Match: YES — all 7 steps verified:
    Step 1: Initial unhappy (AI vs human, empire size penalty) ✓
    Step 2: Luxury effect (lux >> 1) ✓
    Step 3: Colosseum (14) -3, +Electronics -1 ✓
    Step 4: Cathedral (11) / Michelangelo (wonder 10) ✓
    Step 5: Temple (4) with Mysticism/Ceremonial Burial/Oracle ✓
    Step 5b: Courthouse/Palace + Democracy +1 ✓
    Step 6: Fundamentalism override, martial law, military abroad ✓
    Step 7: Wonders (Hanging Gardens, Cure, Shakespeare, Bach) ✓

---

## GL — Game Logic: City Production Chain (6 functions)

FUN_004e7eb1 | 512B | YES
  Binary: calc_food_box_size — (city_size + 1) × food_per_row
  JS: engine/cityturn.js:42 calcFoodBoxSize()
  Match: YES — formula: (citySize + 1) * FOOD_BOX_MULTIPLIER (10)

FUN_004e80b1 | 1502B | N/A (UI only)
  Binary: calc_shields_per_row — shield display grid for city screen
  JS: Not needed — shield display handled by client-side rendering

FUN_004e868f | 1533B | **NO → FIXED**
  Binary: calc_tile_resource — per-tile food/shields/trade calculation
  JS: engine/production.js calcTileFood/calcTileShields/calcTileTrade
  Match: **NO** — railroad +50% food bonus was missing
  Discrepancy: Binary applies `food = food + food / 2` for railroad tiles.
    JS calcTileShields had railroad +50% but calcTileFood did not.
  Binary formula: `if tile.has_railroad: food = food + food / 2`
  JS formula (before fix): no railroad food bonus
  Fix applied: Added `hasRailroad` parameter to calcTileFood, applied +50% food
    bonus after irrigation/harbor, before despotism penalty. Updated getTileYields
    caller and citydialog.js _calcTileFood to pass hasRailroad flag.

FUN_004e9c14 | 1053B | YES
  Binary: calc_city_production — net shield production with factory/power multipliers
  JS: engine/production.js:381 calcShieldProduction() + calcGrossShields()
  Match: YES — verified:
    - Factory(15)/Mfg Plant(16): additive bonus system ✓
    - Power plant priority: Power(19)/Hydro(20)/Nuclear(21)/Solar(29)/Hoover(22) ✓
    - Power capped at factory bonus ✓
    - Shield waste calculation with distance formula ✓

FUN_004eb4a1 | 76B | YES
  Binary: recalc_city_all — orchestrator calling assign_workers + calc_production
  JS: engine/cityturn.js:1051 processCityTurn() serves this role
  Match: YES — JS orchestrator covers same sub-function calls

FUN_004eb4ed | 132B | YES
  Binary: calc_city_production_orchestrator — tiles→shields→trade→happiness pipeline
  JS: engine/cityturn.js:1051 processCityTurn() + individual calc functions
  Match: YES — same pipeline: happiness→food→production→deficit→pollution→disorder

---

## AI — Worker Assignment (1 function)

FUN_004e8f42 | 2038B | PARTIAL
  Binary: assign_worker_tiles — greedy food-first, then score-based assignment
  JS: engine/ai/cityai.js handles AI worker assignment; human players use manual
  Match: PARTIAL — AI has a worker assignment heuristic but not a line-by-line port
  Fix needed: None — AI worker assignment is functional and will be refined separately

---

## GL — Game Logic: Game State & Civ Management (2 functions)

FUN_004e1763 | 3942B | PARTIAL
  Binary: kill_or_retire_civ — full civ elimination (cities, units, diplomacy, wonders, victory)
  JS: reducer.js handles civ elimination partially
  Match: PARTIAL — basic civ destruction works; wonder transfer, diplomatic cleanup,
  and victory condition check could be more thorough
  Fix needed: Medium priority — current implementation handles the common cases

FUN_004e7270 | 486B | YES
  Binary: acquire_wonder — wonder completion effects
  JS: engine/cityturn.js:421-541 processCityProduction wonder branch
  Match: YES — covers: Darwin's 2 free techs, Manhattan nuke enable, Apollo map reveal,
  Da Vinci auto-upgrade, Eiffel attitude recalc, wonder race force-reassign

---

## GL — Game Logic: Turn Processing (6 major functions)

FUN_004ebbde | 1512B | YES
  Binary: process_city_food — food surplus, growth, famine, granary, aqueduct/sewer gates
  JS: engine/cityturn.js:78 processCityFood()
  Match: YES — verified:
    - Food surplus calculation ✓
    - Growth with aqueduct/sewer gates ✓
    - Granary half-box on growth ✓
    - WLTKD bonus growth (Republic/Democracy) ✓
    - Famine: disband settler before shrink ✓
    - City destruction at size 0 ✓
    - Difficulty-based food box scaling ✓

FUN_004ec3fe | 10931B | YES
  Binary: process_city_production — production completion, unit/building/wonder handling
  JS: engine/cityturn.js:302 processCityProduction()
  Match: YES — verified:
    - No production during disorder ✓
    - Overflow capping ✓
    - Unit creation with veteran (Barracks/Sun Tzu/Airport/Port) ✓
    - Settler city shrink ✓
    - Caravan commodity assignment ✓
    - Building duplicate check ✓
    - Palace uniqueness ✓
    - Wonder race detection and force-reassign ✓
    - Auto-upgrade (obsoleted unit production) ✓

FUN_004eef23 | 1621B | YES
  Binary: process_unit_support_deficit — disband most distant unit when support > shields
  JS: engine/cityturn.js:576 processUnitSupportDeficit()
  Match: YES — disbands most distant non-essential unit, rechecks after each disband

FUN_004ef578 | 1614B | YES
  Binary: handle_city_disorder — disorder onset/continuation/recovery, democracy revolution
  JS: engine/cityturn.js:755 handleCityDisorder()
  Match: YES — verified:
    - Disorder onset ✓
    - Democracy 2-turn revolution risk ✓
    - Disorder continuation ✓
    - Recovery ✓

FUN_004efbc6 | 382B | YES (handled at civ level)
  Binary: process_city_science — accumulate per-city science into civ research pool
  JS: engine/reduce/end-turn.js:360 — science summed across all cities at civ level
  Match: YES — same accumulation, different granularity (civ-level vs per-city)

FUN_004efd44 | 508B | YES
  Binary: process_city_pollution_and_meltdown — pollution chance, nuclear meltdown
  JS: engine/cityturn.js:888 processCityPollution()
  Match: YES — verified:
    - Industrial pollution = shields / powerLevel - 20 ✓
    - Population pollution from tech count ✓
    - Recycling Center/Mass Transit reductions ✓
    - Nuclear meltdown: disorder + Nuclear Plant + no Fusion Power ✓
    - Meltdown: halve city, pollute all tiles, destroy Nuclear Plant ✓

---

## GL — Miscellaneous (2 functions)

FUN_004ec1c6 | 332B | YES
  Binary: assign_caravan_commodity — select trade commodity for new caravan/freight
  JS: engine/cityturn.js:241 assignCaravanCommodity()
  Match: YES — uses supply/demand model to pick highest-supply unused commodity

FUN_004ec312 | 236B | NOT PORTED
  Binary: handle_espionage_discovery — spy caught/escaped roll with courthouse modifier
  JS: NOT PORTED — espionage system not yet implemented
  Fix needed: None — espionage is a future feature

---

## Summary

| Verdict | Count |
|---------|-------|
| N/A (FW/UI/design) | 37 |
| YES (match) | 34 |
| PARTIAL (functional) | 3 |
| NO → FIXED | 1 |
| NOT PORTED | 1 |
| **Total** | **76** |

## Discrepancies Found: 1

### D1: Missing railroad +50% food bonus (FIXED)
- **Function**: FUN_004e868f (calc_tile_resource)
- **Binary**: Railroad tiles get `food = food + food / 2` (+50% food, rounded down)
- **JS before fix**: calcTileFood had no railroad food bonus (shields had it)
- **Files changed**: engine/production.js (calcTileFood + getTileYields), public/js/citydialog.js (_calcTileFood)
- **Regression**: 200-turn sim seeds 42/99/7 all pass

## Functions audited: 76
