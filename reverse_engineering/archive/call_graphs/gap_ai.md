# AI Gap Analysis: Binary Call Tree vs JS Implementation

Generated 2026-03-20 from `graph_data.json` AI entry points cross-referenced
against `charlizationv3/engine/ai/*.js` (17,620 lines across 10 files).

## Methodology

Binary AI entry points analyzed to depth 3, filtering GL/AI/MIXED functions.
For each AI-category function, the JS codebase was searched for matching logic.
GL-category utility functions (tile queries, unit queries, distance calculations)
are assumed implemented via the engine layer and not individually tracked.

Classification:
- **IMPL** = Implemented (matching logic exists in JS)
- **PARTIAL** = Partial implementation (some branches present, key logic missing)
- **MISSING** = Not implemented

---

## Summary

| Category | Binary (bytes) | Binary (funcs) | IMPL | PARTIAL | MISSING |
|----------|---------------|----------------|------|---------|---------|
| Turn coordination | 14,665 | 1 | 1 | 0 | 0 |
| Goal system | 3,802 | 9 | 9 | 0 | 0 |
| Unit AI master | 44,777 | 1 | 0 | 1 | 0 |
| Unit AI helpers | 10,585 | 8 | 5 | 2 | 1 |
| Barbarian AI | 6,102 | 1 | 1 | 0 | 0 |
| City production | 29,400 | 1 | 0 | 1 | 0 |
| Spaceship AI | 1,647 | 2 | 1 | 1 | 0 |
| Strategy assessment | 4,384 | 5 | 5 | 0 | 0 |
| Tech value / research | 3,286 | 2 | 2 | 0 | 0 |
| Diplomacy AI | 15,089 | 3 | 2 | 1 | 0 |
| Government choice | 558 | 1 | 1 | 0 | 0 |
| War declaration | 1,549 | 1 | 1 | 0 | 0 |
| Unit automation | 1,123 | 2 | 0 | 0 | 2 |
| Misc AI utilities | 83 | 1 | 0 | 0 | 1 |
| **TOTAL** | **136,416** | **40** | **28** | **6** | **4** |

**Coverage: 28 of 40 AI functions fully implemented, 6 partial, 4 missing.**
**By code volume: ~108KB of 136KB implemented or partially implemented (~79%).**

---

## 1. ai_process_civ_turn (0053184D) — 14,665 bytes

**JS: `ai/index.js` — `runAiTurn()`**

**Status: IMPL**

The JS faithfully replicates all 8 binary phases (P0-P8):

| Phase | Binary function | JS function | Status |
|-------|----------------|-------------|--------|
| P0 | Anti-nuke SDI check | `phaseAntiNukeDefense()` | IMPL |
| P1 | Era quarter tech tracking | `phaseEraQuarterCounting()` | IMPL |
| P2 | Terraform goal counting | `phaseTerraformGoalCounting()` | IMPL |
| P3 | Unit classification + stale GOTO | `phaseUnitClassification()` | IMPL |
| P4 | City defense/attack goals | `phaseCityProcessing()` | IMPL |
| P5 | 5-level continent threat | `phaseContinentThreatAssessment()` | IMPL |
| P6 | Unit redistribution safe→threatened | `phaseUnitRedistribution()` | IMPL |
| P7 | Unit-to-goal matching (priority/dist) | `phaseUnitToGoalMatching()` | IMPL |
| P8 | City cleanup + production hints | `phaseCityCleanup()` | IMPL |
| Post | Action generation dispatch | Multiple `generate*Actions()` calls | IMPL |

The overall coordination architecture matches the binary's structure.

---

## 2. Goal System (0049xxxx) — 3,802 bytes total

**JS: `ai/goals.js` — `GoalList` class**

All 9 binary goal functions are implemented in the JS `GoalList`:

| Addr | Binary | JS equivalent | Status |
|------|--------|---------------|--------|
| 0049301B | `ai_add_goal_a` (958B) | `GoalList.addTacticalGoal()` | IMPL |
| 004933F2 | `ai_add_goal_b` (518B) | `GoalList.addStrategicGoal()` | IMPL |
| 00492B60 | `ai_negate_goal_priority` (181B) | `GoalList.decayGoals()` | IMPL |
| 00492C15 | `ai_remove_goals_near` (259B) | `GoalList.cleanupCapturedCities()` | IMPL |
| 00492D18 | `ai_shift_goals_down_a` (184B) | `GoalList._addGoal()` internal | IMPL |
| 00492DD0 | `ai_shift_goals_down_b` (144B) | `GoalList._addGoal()` internal | IMPL |
| 00492E60 | `ai_find_max_goal_priority` (443B) | `GoalList.findMaxGoalPriority()` | IMPL |
| 00493602 | `ai_decay_and_merge_goals` (365B) | `GoalList.decayGoals()` | IMPL |
| 0049376F | `ai_clear_goals_b` (115B) | `GoalList` constructor / cleanup | IMPL |

Goal types match binary IDs: ATTACK_CITY(1), DEFEND_CITY(2), EXPLORE(3),
BUILD_ROAD(4), ESCORT(5), TRANSPORT(6), NAVAL_ASSAULT(7), AIR_STRIKE(8), REINFORCE(9).

---

## 3. ai_unit_turn_master (00538A29) — 44,777 bytes

**JS: `ai/unitai.js` — `generateMilitaryActions()`**

**Status: PARTIAL** — The JS implements the same role-based dispatch architecture
and most decision branches, but some binary-specific subtleties differ.

### 3a. Role dispatch (top-level branching)

| Role | Binary branch | JS function | Status |
|------|--------------|-------------|--------|
| 0 Attack | Ground combat, city assault | `aiAttacker()` (648-829) | IMPL |
| 1 Defend | City garrison, reinforce | `aiDefender()` (1820-2400) | IMPL |
| 2 Naval | Sea combat, patrol | `aiNavalCombat()` (2408-2570) | IMPL |
| 3 Air attack | Bomber operations | `aiAirAttack()` (2809-2945) | IMPL |
| 4 Air defense | Fighter patrols | `aiAirDefense()` (3185-3460) | IMPL |
| 5 Transport | Sea transport AI | `aiTransport()` (3460-3810) | IMPL |
| 6 Settle | Settler/engineer | `ai/cityai.js` (separate file) | IMPL |
| 7 Diplomat | Spy/diplomat ops | `aiDiplomat()` (4007-4260) | IMPL |
| 8 Trade | Caravan/freight | `aiTrader()` (4260-4500) | IMPL |
| N/A Explorer | Explorer unit | `aiExplorer()` (4593-4650) | IMPL |
| N/A Nuclear | Nuclear missile | `aiNuclearMissile()` (2947-3017) | IMPL |

### 3b. ai_unit_turn_master sub-functions

| Addr | Binary | JS equivalent | Status |
|------|--------|---------------|--------|
| 00531287 | `ai_get_unit_role` (93B) | `UNIT_ROLE[]` in defs.js | IMPL |
| 005312E4 | `ai_find_best_settle_dir` (643B) | `findBestCitySite()` in cityai.js | IMPL |
| 00531567 | `ai_cancel_goto_on_domain` (160B) | Implicit in order cancellation | IMPL |
| 00531607 | `ai_set_goto_order` (76B) | MOVE_UNIT actions toward target | IMPL |
| 00531653 | `ai_set_goto_via_coast` (501B) | `_findCoastalGotoTile()` in unitai.js | PARTIAL |
| 004C54DA | `ai_find_nearest_city_or_transport` (1297B) | `_findNearestOwnCity()` + `_findNearestFriendlyTransport()` | PARTIAL |
| 005369F3 | `ai_alert_nearby_units` (470B) | Not implemented | MISSING |
| 00536BC9 | `ai_calc_continent_city_weight` (131B) | Inline in strategy assessment | IMPL |
| 00536C4C | `ai_find_nuke_target` (1760B) | `aiNuclearMissile()` target scoring | IMPL |
| 00537331 | `ai_naval_and_ranged_move` (5855B) | Split across `aiNavalCombat()` + `aiAirAttack()` | PARTIAL |

### 3c. Key decision tree branches within ai_unit_turn_master

The binary's 44KB function contains many inline decision branches. Analysis of
which major branches are covered:

| Decision Branch | Binary approx offset | JS coverage | Status |
|----------------|---------------------|-------------|--------|
| Initial unit filtering (alive, moves) | 0x0000-0x0100 | `generateMilitaryActions()` loop | IMPL |
| Barbarian delegation (civ==0) | 0x0100-0x0120 | `runAiTurn()` civ===0 check | IMPL |
| Role classification | 0x0120-0x0200 | `UNIT_ROLE[]` + role override | IMPL |
| Damage assessment (4-level) | 0x0200-0x0300 | `getDamageLevel()` (4-level) | IMPL |
| Adjacent enemy scan | 0x0300-0x0600 | `findAdjacentEnemies()` | IMPL |
| Combat evaluation (ATK vs DEF*terrain) | 0x0600-0x0900 | `_computeCombatScore()` | IMPL |
| City assault evaluation | 0x0900-0x0C00 | `_evaluateCityAssault()` | IMPL |
| 8-direction evaluation (core loop) | 0x0C00-0x3000 | `_evaluateDirections()` (720 lines) | IMPL |
| — Distance-toward-target scoring | nested | Score based on `tileDist` delta | IMPL |
| — Exploration lookahead (3-tile BFS) | nested | `isExplored()` checks per dir | IMPL |
| — Terrain cost scaling | nested | `TERRAIN_MOVE_COST[]` weighting | IMPL |
| — ZOC avoidance | nested | `isZOCBlocked()` penalty | IMPL |
| — Goody hut bonus | nested | `findNearestGoodyHut()` | IMPL |
| — Road/river movement bonus | nested | Road/RR bonus in scoring | IMPL |
| — Enemy tile engagement scoring | nested | Combat score integration | IMPL |
| — Own-territory preference | nested | Owner-based scoring | IMPL |
| Settler city-founding | 0x3000-0x3500 | `ai/cityai.js` full system | IMPL |
| Settler improvements (roads/irrig/mine) | 0x3500-0x4000 | `getWorkerOrder()` in cityai.js | IMPL |
| Naval transport loading/unloading | 0x4000-0x5000 | `aiTransport()` | IMPL |
| Naval combat patrol/attack | 0x5000-0x5800 | `aiNavalCombat()` | IMPL |
| Air operations (rebase/attack/return) | 0x5800-0x6800 | `aiAirAttack()` + `aiAirDefense()` | IMPL |
| Diplomat spy missions | 0x6800-0x7500 | `aiDiplomat()` | IMPL |
| Trade route establishment | 0x7500-0x8000 | `aiTrader()` | IMPL |
| Nuclear targeting | 0x8000-0x8800 | `aiNuclearMissile()` | IMPL |
| Paradrop logic | 0x8800-0x9000 | Not implemented | MISSING* |
| Ranged bombardment (non-nuclear) | 0x9000-0x9500 | Partial in BOMBARD action | PARTIAL |
| Pillage decision | 0x9500-0x9800 | Not explicitly scored | MISSING* |
| Transport coastal pathfinding | 0x9800-0xA000 | `_findCoastalGotoTile()` | PARTIAL |

*Paradrop and pillage are rare edge cases in practice. The binary's paradrop AI
requires Paratroopers (unit 37) and specific conditions. Pillage decisions are
inline in the main loop.

### 3d. Notable differences

1. **Binary uses GOTO orders; JS uses immediate MOVE_UNIT actions.**
   The binary's `ai_set_goto_order()` sets multi-turn GOTO with pathfinding.
   JS emits single-step MOVE_UNIT actions each turn. Functionally equivalent
   but the binary's units "remember" their destination between turns while
   JS units are re-evaluated from scratch every turn.

2. **Binary's 8-direction evaluation is one giant inline block (~24KB).**
   JS ports this as `_evaluateDirections()` (720 lines). The scoring formula
   covers the same factors but weights may differ in edge cases.

3. **Binary stacks multiple units for coordinated attacks.**
   The `ai_alert_nearby_units()` function (MISSING) rallies naval units when
   a city is threatened. JS has no equivalent reactive coordination.

---

## 4. ai_barbarian_unit_turn (005351AA) — 6,102 bytes

**JS: `ai/barbarian.js` — `generateBarbarianActions()`**

**Status: IMPL**

| Branch | Binary | JS | Status |
|--------|--------|-----|--------|
| Non-combat settler logic | City founding + timeout | `barbarianNonCombatAI()` | IMPL |
| Adjacent city rush attack | Priority undefended | `tryRushAdjacentCity()` | IMPL |
| Adjacent enemy attack | Simple aggression | `tryAttackAdjacent()` | IMPL |
| Target city selection | (size+50)/(dist+1) | `tryTargetBestCity()` | IMPL |
| Scored directional movement | 8-dir scoring | `scoredMovement()` | IMPL |
| Naval barbarian raiders | Sea unit AI | Not explicit in barbarian.js | PARTIAL* |
| Cancel stale goto | `ai_cancel_goto_on_domain` | Implicit in per-turn re-eval | IMPL |

*Naval barbarian raiders are a minor branch. The binary has explicit naval
pirate logic; JS barbarians primarily handle land units.

---

## 5. ai_choose_city_production (00498E8B) — 29,400 bytes

**JS: `ai/prodai.js` — `generateProductionActions()` (3,043 lines)**

**Status: PARTIAL** — Comprehensive scoring system is implemented but some
binary-specific scoring factors differ.

### 5a. Production scoring branches

| Category | Binary branch | JS function | Status |
|----------|--------------|-------------|--------|
| Unit scoring (all 52 types) | Role-based eval, threat context | `scoreUnit()` (567-1030) | IMPL |
| Building scoring (39 types) | Happiness/economy/defense eval | `scoreBuilding()` (1030-1688) | IMPL |
| Wonder scoring (28 types) | Race detection, era weighting | `scoreWonder()` (1688-2100) | IMPL |
| Spaceship parts | SS_STRUCT/COMP/MODULE | `_scoreSpaceshipPart()` (438-565) | IMPL |
| Production switch penalty | Cross-type shield loss | `shouldKeepCurrentProduction()` | IMPL |
| Final decision with hysteresis | Keep-current vs switch | `_finalProductionDecision()` | IMPL |
| Obsolete unit auto-upgrade | Delete obsolete + rebuild | Not in prodai (in GL layer) | N/A |
| Rush-buy decisions | Gold/shield cost analysis | `generateRushBuyActions()` | IMPL |
| Sell obsolete buildings | Maintenance optimization | `generateSellObsoleteActions()` | IMPL |

### 5b. Scoring factor coverage

| Factor | Binary | JS | Status |
|--------|--------|-----|--------|
| Threat level (continent) | Per-continent military balance | Strategy + continentThreats | IMPL |
| City needs (food/shields/trade) | Detailed resource analysis | `buildCityContext()` | IMPL |
| Happiness optimization | Martial law, temples, etc. | Building-specific happiness scoring | IMPL |
| Military unit balance | Attacker/defender ratio | Role counting + need assessment | IMPL |
| Wonder race detection | Check if other civ building | `isWonderBeingBuilt()` | IMPL |
| Coastal city naval builds | Adjacent-to-continent check | `isCoastalCity()` + domain checks | IMPL |
| SDI Defense priority | Enemy nuclear threat | `strategy.needsSDI` | IMPL |
| Fanatic government bonus | Fundamentalism unit scoring | Government-aware scoring | IMPL |
| Difficulty-based adjustments | AI bonus scaling | Limited (no explicit difficulty modifier on unit scores) | PARTIAL |
| Trade route caravan builds | Trade potential evaluation | Basic scoring only | PARTIAL |
| Diplomat/spy production | Espionage value assessment | Basic scoring only | PARTIAL |

### 5c. Sub-functions

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 00597D6F | `spaceship_ai_evaluate` (1064B) | `_scoreSpaceshipPart()` | IMPL |
| 00598D45 | `spaceship_ai_should_start` (583B) | Inline in spaceship scoring | PARTIAL |

The spaceship "should start" check in the binary considers whether a human civ
has launched or if the AI has enough tech. The JS checks space parts availability
but doesn't have the explicit launch-detection trigger.

---

## 6. Strategy Assessment (004BCxxx) — 4,384 bytes

**JS: `ai/strategyai.js`**

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 004BC480 | `ai_assess_military_posture` (1066B) | `assessMilitaryPosture()` | IMPL |
| 004BC8AA | `ai_assess_city_defense` (753B) | `assessCityDefense()` | IMPL |
| 004BCB9B | `ai_assess_economy` (1071B) | `assessEconomy()` | IMPL |
| 004BCFCF | `ai_assess_diplomacy` (724B) | `assessDiplomacy()` | IMPL |
| 004BD2A3 | `ai_assess_tax_rate` (770B) | `assessTaxRate()` | IMPL |

All five strategy assessment functions are implemented in `strategyai.js`.

---

## 7. Research & Economy (004BDxxx, 004C0xxx) — 3,286 bytes

**JS: `ai/econai.js`**

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 004BDB2C | `ai_calc_tech_value` (2869B) | `calcTechValue()` (369-660) | IMPL |
| 004C09B0 | `ai_pick_research_goal` (417B) | `pickResearchGoal()` + `chooseResearch()` | IMPL |

Tech value calculation considers: epoch, exclusivity, government unlocks,
military unit unlocks, wonder prereqs, building prereqs. JS implementation
covers all these factors across 290 lines.

---

## 8. Diplomacy AI (0045xxxx, 0055xxxx, 00560xxx) — 15,089 bytes

**JS: `ai/diplomai.js` (3,185 lines)**

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 0045705E | `ai_evaluate_diplomacy` (6616B) | `evaluateDiplomacyTowardAll()` + helpers | IMPL |
| 00560D95 | `ai_evaluate_diplomacy` (4728B) | `evaluateMilitaryBalance()` + attitude calc | IMPL |
| 00560084 | `ai_diplomacy_turn_processing` (3345B) | `diplomacyTurnProcessing()` | PARTIAL |
| 0055CBD5 | `ai_should_declare_war` (1549B) | `shouldDeclareWar()` + `shouldDeclareWarFull()` | IMPL |
| 0055F5A3 | `ai_choose_government` (558B) | `chooseBestGovernment()` in diplomai.js + `considerRevolution()` in econai.js | IMPL |

### 8a. Diplomacy decision branches

| Decision | Binary | JS | Status |
|----------|--------|-----|--------|
| War declaration | Military ratio + alliance check | `shouldDeclareWar()` | IMPL |
| Peace proposals | War-weariness + strength calc | `shouldProposePeace()` | IMPL |
| Tribute demands | Military advantage check | `shouldDemandTribute()` | IMPL |
| Alliance formation | Shared enemy + attitude | `generateAllianceProposals()` | IMPL |
| Alliance breaking | Attitude decay + betrayal | `shouldBreakAlliance()` | IMPL |
| Tech exchange | Value comparison + willingness | `generateAiTechExchange()` | IMPL |
| First contact processing | Initial diplomacy setup | `processFirstContact()` | IMPL |
| Treaty proposal response | Accept/reject/counter | `respondToTreatyProposals()` | IMPL |
| AI-vs-AI diplomacy | Simplified interaction | `processAiVsAiDiplomacy()` | IMPL |
| Border intrusion detection | Territory violation scoring | `detectBorderIntrusions()` + `calcBorderScore()` | IMPL |
| Military aid requests | Alliance obligation | `considerMilitaryAid()` | IMPL |
| Revolution timing | Government change scheduling | `ai_diplomacy_turn_processing` inner logic | PARTIAL |

The binary's `ai_diplomacy_turn_processing` (3,345B) handles revolution timing
with specific AI behavior randomization per turn. JS covers most of this but
the revolution scheduling (anarchy duration tracking, optimal timing) has
simplified logic.

---

## 9. Government Choice (0055F5A3) — 558 bytes

**JS: `ai/econai.js` — `considerRevolution()` + `ai/diplomai.js` — `chooseBestGovernment()`**

**Status: IMPL**

Binary uses `DAT_0064ca74` preference score array. JS uses an equivalent
government evaluation system considering: trade bonuses, unit support costs,
martial law, corruption, senate restrictions, and civ personality preferences.

---

## 10. Unit Automation (00543xxx) — 1,123 bytes

**JS: Not implemented**

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 00543B80 | `ai_try_settle_unit` (322B) | Not needed (JS uses action dispatch) | MISSING |
| 00543CD6 | `ai_process_unit_automation` (801B) | Not needed (JS re-evaluates each turn) | MISSING |

These binary functions manage the unit automation loop (iterating units and
processing their AI orders). The JS architecture doesn't need this because
`generateMilitaryActions()` iterates all units and generates fresh actions
each turn. The automation state is implicit in the action generation.

**Impact: None.** The JS architecture achieves the same result differently.

---

## 11. Misc Utilities

| Addr | Binary | JS | Status |
|------|--------|-----|--------|
| 00531210 | `ai_set_active_civ` (83B) | Not needed (JS passes civSlot param) | MISSING |

Binary uses a global "active AI civ" pointer. JS passes `civSlot` as a
parameter to all functions. Architectural difference, no functional gap.

---

## Critical Gaps (Ranked by Impact)

### HIGH impact

1. **ai_naval_and_ranged_move (00537331) — PARTIAL, 5,855 bytes**
   The binary has a dedicated function for naval movement + ranged bombardment
   decisions that considers: transport loading proximity, coastal patrol routes,
   bombardment target selection, naval combat avoidance, and fleet coordination.
   JS splits this across `aiNavalCombat()` and `aiAirAttack()` but lacks:
   - Coordinated fleet movement (multiple ships toward same target)
   - Bombardment target prioritization (the binary scores enemy stacks,
     improvements, and cities separately for bombardment vs direct attack)
   - Transport rendezvous logic (binary finds optimal pickup points)

2. **ai_choose_city_production difficulty modifiers — PARTIAL**
   The binary applies difficulty-level scaling to AI production decisions
   (AI gets bonus shields/gold on higher difficulties). JS scoring doesn't
   incorporate difficulty-based adjustments to unit/building scores.

3. **ai_diplomacy_turn_processing revolution timing — PARTIAL**
   Binary tracks anarchy duration and optimizes government switch timing
   (e.g., switch to Republic early, save Democracy for later). JS has
   `considerRevolution()` but simplified timing logic.

### MEDIUM impact

4. **ai_alert_nearby_units (005369F3) — MISSING, 470 bytes**
   Reactive rally system: when a city is threatened, nearby naval units
   redirect to defend. No JS equivalent. Would improve naval defense
   responsiveness.

5. **Paradrop AI logic — MISSING (inline in ai_unit_turn_master)**
   Paratroop drops are never attempted by the AI. Low-frequency unit
   type but completely absent.

6. **Pillage decision scoring — MISSING (inline)**
   The binary evaluates whether to pillage enemy improvements vs. move
   through. JS units never pillage strategically.

7. **ai_set_goto_via_coast (00531653) — PARTIAL, 501 bytes**
   Binary finds optimal coastal tiles for naval goto orders, checking
   water body connectivity. JS has `_findCoastalGotoTile()` but with
   simplified water-body checks.

### LOW impact

8. **ai_find_nearest_city_or_transport (004C54DA) — PARTIAL, 1,297 bytes**
   Binary function handles both city and transport finding in one pass
   with unified distance comparison. JS splits into two separate searches.
   Functionally equivalent but may miss optimal transport-vs-city choices
   in edge cases.

9. **Spaceship start trigger (00598D45) — PARTIAL, 583 bytes**
   Binary checks if human civ has launched to trigger AI spaceship building.
   JS scores spaceship parts but lacks the explicit "opponent launched" urgency.

---

## Architecture Comparison

| Aspect | Binary (136KB) | JS (17.6K lines) |
|--------|---------------|-------------------|
| Turn coordination | Single 14KB function | 8 phases + 6 action generators |
| Unit AI | Single 44KB function | 11 role-specific functions |
| Production AI | Single 29KB function | Score/context/decide pipeline |
| Goal system | Flat arrays (48+16 slots) | GoalList class (same sizes) |
| Diplomacy | 3 functions, 15KB | 40+ functions, 3,185 lines |
| State management | Global variables | Strategy object passed through |
| Movement | GOTO orders (persistent) | MOVE_UNIT actions (per-turn) |
| Difficulty scaling | Inline bonus multipliers | Limited integration |

The JS implementation is architecturally more modular (40+ functions vs 4 giant
binary functions) but covers the same decision space. The main fidelity gaps are
in naval coordination, difficulty scaling, and edge-case unit types (paratroop,
pillage, bombardment targeting).
