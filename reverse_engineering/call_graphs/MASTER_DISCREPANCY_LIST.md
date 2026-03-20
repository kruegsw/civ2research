# Master Discrepancy List

Consolidated from all 15 deep-dive files in `reverse_engineering/call_graphs/deep_dive_*.md`.

## Summary

Total: 196 discrepancies (17 critical, 52 high, 78 medium, 49 low)

---

## CRITICAL — Game-breaking or major balance issues

### Combat
1. **Difficulty scaling missing for non-barbarian combat** — Binary halves AI attack on Chieftain/Warlord vs human defenders and doubles human attack on Chieftain. JS only applies difficulty scaling to barbarian combat. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D11)

2. **Pikeman +50% defense bonus is invented** — JS adds +50% defense for pikeman-type defenders vs ground attackers in `resolveCombat()`. Binary only uses +1 tiebreaker in defender *selection*, not a combat multiplier. Pikemen are overpowered in JS. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D3)

3. **Great Wall double-roll trigger missing** — Binary triggers the combat double-roll mechanic for Great Wall wonder, Palace, and small cities (<8). JS only triggers for Palace and small cities. Great Wall wonder is significantly weaker in JS. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D14)

### City Capture
4. **Gold plunder formula denominator wrong** — Binary uses `city.size * treasury / (numCities + 1)`. JS uses `city.size * treasury / (totalPop + 1)`. A civ with 10 cities averaging size 8: binary gives ~909 gold, JS gives ~123 gold (~8x less). File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#4)

5. **Tech theft is always guaranteed in binary, 33% random in JS** — Binary ALWAYS steals one tech on city capture (no probability check). JS only has 33% chance. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#5a)

6. **Elimination ordering reversed for partisans** — Binary checks civ elimination FIRST, then spawns partisans only if civ survives. JS spawns partisans FIRST, then checks elimination. A civ losing its last city could survive in JS via partisans but would be eliminated in binary. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#11)

### Movement
7. **Damage-based movement point reduction has three bugs** — (a) Binary rounds up to nearest COSMIC (3) multiple; JS uses Math.ceil to nearest integer. (b) Binary uses 2x COSMIC (6) minimum for air units; JS uses 1x (3) for all. (c) Binary exempts sea units from damage reduction entirely; JS applies it to all domains. Files: `engine/movement.js`. Source: deep_dive_move_unit.md (#17)

8. **Air fuel checked per-turn instead of per-move** — Binary checks fuel after EVERY air unit move. JS checks once per turn in end-turn. An air unit with fuel=1 that takes off immediately crashes in binary but survives until end of turn in JS. File: `engine/reduce/move-unit.js`, `engine/movement.js`. Source: deep_dive_move_unit.md (#21)

9. **Trireme sinking formula completely different** — Binary uses COSMIC[1] (default 2) with Navigation (2x) and Magnetism (2x) tech multipliers. JS uses fixed 50% with Astronomy tech and Lighthouse/Magellan wonders. Different techs, different formula, different timing (per-move vs per-turn). Files: `engine/movement.js`. Source: deep_dive_move_unit.md (#22)

### Production
10. **Capitalization (shields-to-gold conversion) not implemented** — Binary item 38 converts excess shields to treasury gold without accumulating in shield box. JS has no Capitalization concept; shields accumulate wastefully. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#2)

### Turn Pipeline
11. **Global warming runs per-civ instead of once per turn cycle** — Binary runs pollution counter update ONCE at start of each full turn cycle. JS runs it during every civ's turn processing, potentially triggering multiple times (7x) per turn cycle. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.4)

12. **AI pollution exemption missing** — Binary only runs `process_city_pollution_and_meltdown` and `pay_building_upkeep` for human player cities. JS runs pollution processing for ALL civs. AI cities generating pollution significantly changes the global warming counter. File: `engine/cityturn.js`. Source: deep_dive_turn_pipeline.md (6.7)

### Global Warming
13. **Global warming terrain degradation entirely missing** — Binary has a complete terrain degradation system (FUN_004868fb) with severity-scaled tile degradation, deterministic hash selection, road/railroad destruction. JS does not implement global warming effects at all. File: needs new implementation. Source: deep_dive_batch_25_28.md (#28)

### Barbarians
14. **Barbarian spawn timing, count, leader type, and city-proximity phase all wrong** — (a) Timing mask formula differs significantly. (b) Spawn count uses `1+rng.nextInt(3)*multiplier` vs binary's `clamp(turn/(barbLevel*-50+250)+1,1,5)`. (c) Leader unit is Warriors with invented gold mechanic vs binary's Diplomat type. (d) Entire city-proximity spawn phase is missing. File: `engine/reduce/barbarians.js`. Source: deep_dive_batch_17_20.md (#1)

### Diplomacy (AI)
15. **War/alliance condition inversion in attitude scoring** — The at-war modifier block (gold/tech/military comparison) fires for ALLIES in JS but for ENEMIES in binary. This inverts the scoring for war situations, making the AI evaluate diplomacy fundamentally differently. File: `engine/diplomacy.js` (`calcAttitudeScore`). Source: deep_dive_batch_13_16.md (#2)

### Trade
16. **Trade route revenue calculation entirely missing** — Binary has a complete trade revenue system (distance formula, continent bonus, freight bonus, supply/demand matching, era modifiers, tech modifiers). JS has `calcTradeRouteIncome()` but no caravan arrival handler, no route establishment, and no wonder contribution mechanic. Files: `engine/production.js`, needs new implementation. Source: deep_dive_batch_17_20.md (#6)

### Worker Orders
17. **Worker order work-turns use hardcoded values instead of per-terrain scaling** — Binary calculates exact work turns from terrain type tables (roadTime, irrigateTime, mineTime). JS uses hardcoded `WORKER_TURNS` from defs.js. Also missing: settler cooperation (multiple settlers pooling work), engineer double-speed, and river penalty for railroad. File: `engine/reduce/helpers.js`, `engine/defs.js`. Source: deep_dive_batch_21_24.md (#5), deep_dive_batch_25_28.md (#18)

---

## HIGH — Significant gameplay differences

### Combat
18. **Barbarian attack halving vs AI missing** — Binary halves barbarian attack against non-human defenders. JS doesn't distinguish, making barbarians equally strong vs AI and human. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D7)

19. **Barbarian difficulty formula uses discrete values instead of continuous** — Binary uses `(difficulty+1)*attack/4` as a continuous formula. JS uses per-difficulty discrete values that miss Prince (3/4) and King (no scaling). File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D8)

20. **Fortress retreat behavior differs** — Binary kills the entire stack at an unprotected tile when attacker wins. JS retreats the defender to an adjacent tile. Very different fortress behavior. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D25)

21. **Barbarian ransom awarded for ALL kills instead of just leaders** — Binary checks `unit.role > 4` for ransom eligibility. JS awards ransom for any barbarian kill. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D26)

### City Capture
22. **Civil war missing age rank gate** — Binary requires `age[capturer] < age[old_owner]` for civil war to trigger. JS has no such check. Civil wars trigger far more often than in original Civ2. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#2)

23. **Capital escape scoring has multiple formula errors** — (a) +3 coastal bonus is invented (not in binary). (b) +2 same-continent bonus is invented. (c) Building 17 (SDI Defense) confused with Wonder 17 (Adam Smith). (d) 1000 science point deduction missing. (e) Complex escape decision tree replaced with unconditional relocation. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#3a-3e)

24. **Partisan government check wrong** — Binary checks old owner's GOVERNMENT type (Communism=3 or Democracy=6). JS only checks TECH (Communism or Democracy). A civ can have the tech without being in that government. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#10)

25. **Civil war missing diplomacy flags between old and new civ** — Binary sets precise treaty flags: `0x2001` (war+contact) and `0x82801`. JS does not set diplomacy relations between the old and new civ at all. File: `engine/citycapture.js`. Source: deep_dive_batch_17_20.md (#2, item 4)

### Movement
26. **Marines (amphibious flag) cannot attack from sea** — Binary allows units with amphibious flag (Marines, type 12) to bypass ZOC and attack from ocean. JS blocks ALL land units from attacking from sea, including Marines. Files: `engine/rules.js`, `engine/movement.js`. Source: deep_dive_move_unit.md (#5, #10)

27. **Alpine Troops all-terrain flag only partially ported** — Binary gives cost=1 on ALL terrain types for units with all-terrain flag. JS only reduces cost for hills/mountains. Alpine Troops crossing forest costs 1 in binary but 2 (6 thirds) in JS. File: `engine/movement.js`. Source: deep_dive_move_unit.md (#12)

28. **Submarine movement onto land not blocked** — Binary prevents submarine-flagged units from entering non-ocean tiles. JS has no submarine-specific movement restriction. File: `engine/rules.js`. Source: deep_dive_move_unit.md (#10)

29. **Fighter ground-attack block missing** — Binary prevents fighters from attacking ground units without a city or airbase at the target. JS allows fighters to attack ground units in open terrain. File: `engine/rules.js`. Source: deep_dive_move_unit.md (#10)

### Production
30. **Space race Apollo Program prerequisite missing** — Binary verifies the civ has built Apollo Program before allowing SS part construction. JS has no such check; any civ can complete SS parts without Apollo. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#5)

31. **Settler from size-1 city guardrails missing** — Binary blocks settlers at size 1 on Chieftain, shows GHOSTTOWN dialog for last-city scenarios, and handles city destruction from building settlers at size 1. JS only handles shrink for `city.size > 1`. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#17)

32. **Shield overflow on wonder race loss incorrectly zeroed** — When another city completes the same wonder, binary preserves accumulated shields. JS sets `shieldsInBox: 0`. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#14)

33. **AI rush-buy system entirely missing** — Binary has a massive AI treasury-spend system for accelerating production (uses bit shifts >>3 through >>8 based on priority, wonders, disorder, treasury). JS AI cannot spend gold to rush-buy. File: `engine/cityturn.js`, `engine/ai/prodai.js`. Source: deep_dive_process_city_production.md (#24)

### Turn Pipeline
34. **Healing runs AFTER cities instead of BEFORE** — Binary order is heal_units → process_cities → AI. JS order is cities → healing → AI. Affects city defense calculations if they depend on garrison HP. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.1)

35. **Unit reset scope: per-civ instead of all-civs-at-once** — Binary resets ALL units for ALL civs simultaneously at turn start. JS resets per-civ when that civ's turn begins. A civ's units get movement at different times in each model. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.2)

### Diplomacy / Espionage
36. **Plant Nuclear Device spy mission not implemented** — Binary has full implementation: 3-4 detection checks, nuclear explosion, blame mechanic, all-civ attitude penalty. JS has no equivalent. File: `engine/espionage.js`. Source: deep_dive_diplomacy_espionage.md (#5)

37. **Sabotage only resets shields, doesn't destroy buildings** — Binary picks a random building (or specific building for spies) and destroys it. JS only resets shields to 0. File: `engine/espionage.js`. Source: deep_dive_diplomacy_espionage.md (#5)

38. **Counter-espionage is boolean instead of graduated** — Binary calculates numeric strength (base + difficulty + veteran + random) that affects detection odds. JS sets a boolean flag and consumes the spy. Binary keeps the spy alive for ongoing protection. File: `engine/espionage.js`. Source: deep_dive_diplomacy_espionage.md (#15)

39. **Alliance war cascade attitude penalty wrong** — Binary applies +100 attitude (max hatred) when allies are pulled into war. JS applies only -50. File: `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#8)

40. **Alliance third-party attitude penalty wrong** — Binary applies -25 to third party on alliance break. JS applies -15. File: `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#2)

41. **Alliance violation can trigger immediate war in binary** — Binary uses randomized tolerance check on flag 0x20 that can trigger immediate war declaration. JS only applies -3 attitude penalty. File: `engine/ai/diplomai.js`. Source: deep_dive_batch_13_16.md (#16)

### AI
42. **Barbarian AI entirely missing** — The 6,102-byte `ai_barbarian_unit_turn` function (naval raiders, city capture/ransom, movement scoring, barbarian text ransom dialog) is completely absent. File: needs new `engine/ai/barbarian.js` extension. Source: deep_dive_ai_unit_turn_master.md (#1)

43. **AI tech cycling restriction missing** — Binary forces AI civs to only pick every 3rd available tech `(techIndex - civRulesId) % 3 != 0` to diversify research paths. JS AI picks techs by priority without this modulo restriction, causing all AIs to research the same techs. File: `engine/ai/econai.js` or `engine/research.js`. Source: deep_dive_batch_21_24.md (#3)

44. **Per-continent military strength scan missing from diplomacy** — Binary iterates 63 continents comparing military strength for tribute/techDemand calculations. JS uses aggregate `militaryPower` per civ. File: `engine/diplomacy.js`, `engine/ai/diplomai.js`. Source: deep_dive_batch_9_12.md (#3, item 2)

45. **Starting tech algorithm fundamentally different** — Binary grants techs that other civs already have (`rand()%(diff+1) > 0` chance each). JS grants random no-prereq techs by count (7/5/3/2/1/0 by difficulty). File: `engine/init.js`. Source: deep_dive_batch_9_12.md (#6)

### Visibility
46. **Tile revelation model differs** — Binary uses fixed 25-tile city-spiral with attacker gate for tiles 8-24. JS uses terrain-boosted variable radius (hills +1, mountains +2, fortress +1). Different visible tile sets. File: `engine/visibility.js`. Source: deep_dive_batch_13_16.md (#5)

### Production/City
47. **Shield penalty on production switch uses wrong formula** — Binary caps shields at `min(shields, new_cost)` (preserves shields when switching to more expensive item). JS uses 50% loss for same-category and 100% for cross-category. File: `engine/reducer.js`. Source: deep_dive_batch_13_16.md (#3)

48. **Goody hut distribution uses weighted probabilities instead of uniform** — Binary uses uniform `rand()%5` (5 equal outcomes). JS uses difficulty-weighted probabilities. Also: late-game city bonuses give size 1-4 with multiple buildings in binary vs size 1-2 with Granary/Temple in JS. File: `engine/reduce/move-unit.js`. Source: deep_dive_batch_13_16.md (#14)

49. **AI food box scaling missing** — Binary gives AI a different food-per-row value (13-difficulty with bonuses) so AI cities grow at different rates. JS uses the same formula for AI and human. File: `engine/cityturn.js`. Source: deep_dive_batch_25_28.md (#3)

### Diplomacy Features
50. **Mercenary hiring system missing** — Binary has a "hire a civ to attack another" feature with complex price formula, reputation threshold, 50% betrayal chance, gold/tech payment. Entirely absent from JS. File: `engine/diplomacy.js`. Source: deep_dive_batch_13_16.md (#1)

51. **Tech gift and military gift mechanics missing** — Binary adjusts attitude by `techValue * 4` for tech gifts and has a 50% chance of AI tech breakthrough for military gifts. Not implemented. File: `engine/diplomacy.js`. Source: deep_dive_batch_17_20.md (#4)

52. **Tech exchange negotiation logic missing** — Binary has full AI tech exchange evaluation (tech valuation, best-tech selection, attitude gates, wonder blocking, difficulty-based restrictions). JS `transferTechs()` is a direct transfer function with none of these gates. File: `engine/diplomacy.js`. Source: deep_dive_batch_13_16.md (#9)

---

## MEDIUM — Minor gameplay differences

### Combat
53. **Naval in-city defense quadruple multiplier missing** — Binary has special logic for sea-domain defenders in a city with Coastal Fortress. JS only applies generic Coastal Fortress x2. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D1)

54. **City reputation blocking barbarian attack missing** — Binary zeros barbarian attack against cities with low reputation (<2). JS doesn't implement. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D9)

55. **Barbarian Diplomat/Spy half defense missing** — Binary halves defense of barbarian diplomat/spy types. JS doesn't implement. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D10)

### City Capture
56. **Food box incorrectly zeroed on capture** — Binary preserves food_in_box on city capture (only zeroes shields). JS zeroes both food and shields. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#12a)

57. **Size-1 city destruction on capture missing** — Binary can destroy size-1 cities on capture under certain conditions (barbarian captures). JS always clamps to min size 1. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#7)

58. **Trade route cleanup on capture incomplete** — JS clears `tradeRoutes: []` on captured city but does NOT clean up trade routes pointing TO this city from other cities (only handles the city-destroyed path). File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#9b)

59. **Unhomeable units should be deleted, not left homeless** — Binary deletes units that can't be rehomed after city capture. JS always reassigns to nearest city or sets no-home. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#9a)

60. **Capital escape science cost missing** — Binary deducts 1000 science points for successful capital escape. JS does not. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#3d)

61. **Capital escape decision logic missing** — Binary has complex dialog/AI decision tree with conditions (science > 999, city count > 11). JS always relocates unconditionally. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#3e)

62. **Treaty flags (0x400000, 0x10, 0x800) not set on city capture** — Binary sets revenge, occupied, and war-reason flags. JS does not set these. File: `engine/citycapture.js`, `engine/diplomacy.js`. Source: deep_dive_handle_city_capture.md (#1)

63. **Nuclear capture diplomatic flags not set** — Binary sets 0x110 + 0x20000 + attitude 100 on nuclear city capture. JS does not implement nuclear capture diplomacy. File: `engine/citycapture.js`. Source: deep_dive_diplomacy_espionage.md (#6)

### Movement
64. **Allied repair mechanic not implemented** — Binary heals units when entering allied city (HP proportional to repair, airport doubles). JS has no allied territory repair. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#8)

65. **Diplomat expulsion mechanic not implemented** — Binary has a complex treaty-based system for expelling enemy diplomats from territory with 3-stage escalation. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#10)

66. **Goody hut missing domain check** — Binary only processes goody huts for land units (domain 0). JS doesn't check domain, allowing air units to trigger goody huts. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#23)

67. **Submarine visibility/stealth not implemented** — Binary has specific submarine stealth mechanics and reveal logic. JS doesn't distinguish submarine stealth. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#28)

### Production
68. **Eiffel Tower wonder effect is wrong** — Binary does espionage flag + defense halving + diplomacy penalty. JS recalculates attitude scores. Different behavior. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#13)

69. **United Nations wonder diplomatic victory effect missing** — Wonder index 25 should trigger UN election/diplomatic victory check. JS has no such effect. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#12)

70. **Caravan commodity selection missing player choice** — Binary shows dialog listing city's 3 trade commodities for human players. JS auto-selects. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#21)

71. **Building upkeep per-city instead of per-civ** — Binary sells buildings immediately in the city being processed when treasury goes negative. JS sums upkeep across all cities and sells by iterating 0→N. Different buildings get sold. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.8)

72. **Wonder/attitude checks missing from city turn** — Binary checks Women's Suffrage, Colosseum effects and calculates corruption/attitude modifiers during city processing. JS does not. File: `engine/cityturn.js`. Source: deep_dive_turn_pipeline.md (section 4, step 7)

73. **Second yield calculation pass missing** — Binary runs `calc_city_production` twice per city turn (before and after production). JS only calculates once. File: `engine/cityturn.js`. Source: deep_dive_turn_pipeline.md (section 5, step 6)

### Turn Pipeline
74. **Happiness calculated before food instead of after** — Binary runs food first, then yield recalc including happiness. JS calculates happiness FIRST, before food/production changes. File: `engine/cityturn.js`. Source: deep_dive_turn_pipeline.md (6.10)

75. **City processing direction reversed (forward vs backward)** — Binary processes cities backwards (highest to 0). JS processes forwards (0 to highest). Affects wonder race resolution, building sale priority, settler disbanding. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.6)

76. **Barbarian spawn timing wrong** — Binary spawns barbarians BEFORE any civ processes. JS has `spawnBarbarians()` running AFTER the active civ's processing. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.3)

77. **Power rankings timing wrong** — Binary calculates once at cycle start using end-of-previous-turn state. JS evaluates after each civ's processing. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.5)

78. **Population milestone check missing** — Binary calls `check_population_milestone` after each civ's turn. JS does not implement. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 3, step 10)

### Diplomacy / Espionage
79. **Capture vendetta flag (0x1000) not set on city capture** — Binary sets CAPTURE_VENDETTA on defender toward capturer. JS does not. File: `engine/citycapture.js`, `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#6)

80. **"Already stolen" flag per city not tracked** — Binary marks cities after first tech theft, making subsequent steals harder. JS does not track this. File: `engine/espionage.js`. Source: deep_dive_diplomacy_espionage.md (#5)

81. **Specific steal/sabotage targeting not implemented** — Binary lets spies choose specific tech to steal or specific building to sabotage. JS always picks randomly. File: `engine/espionage.js`. Source: deep_dive_diplomacy_espionage.md (#5)

82. **Auto-alliance with common enemy missing** — Binary proactively seeks common enemies for alliance formation. JS doesn't. File: `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#1)

83. **Auto-alliance break on strained relations missing** — Binary breaks alliances automatically when mutual enemy count exceeds patience. JS doesn't auto-trigger. File: `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#1)

84. **Witness penalty too broad** — Binary only penalizes the third-party on war declaration. JS penalizes ALL contacted civs (-10). JS is more punitive to aggressors. File: `engine/diplomacy.js`. Source: deep_dive_diplomacy_espionage.md (#2)

85. **Ceasefire flag clearing scope differs** — Binary clears 0x800 from ALL civs' flags toward civA. JS clears WAR_STARTED only for third parties at war with BOTH civA and civB. File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#13)

86. **Peace treaty over-clamps attitude bidirectionally** — JS clamps attitude BOTH directions on peace signing. Binary only clamps the accepting civ's attitude. File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#14)

87. **Alliance war cascade missing cooldown/attitude gates** — Binary has specific join-war function with 6-turn cooldown, attitude check, and 2/3 random gate. JS's alliance cascade is automatic without these gates. File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#22)

88. **Demand ally help not implemented** — Binary has player-to-AI interaction for demanding military assistance from allies. File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#15)

89. **Unit transfer in diplomacy not implemented** — Binary supports transferring units between civs during negotiations (case 8). File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#9)

90. **Contact sharing not implemented** — Binary supports sharing knowledge of a third civ (case 9). File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#9)

### AI General
91. **6-level continent threat system missing** — Binary has 0=uncontested through 5=safe, with fortress readiness, landmass capacity, and government modifier. JS uses simplified 3-level approximation. File: `engine/ai/index.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (P5)

92. **AI unit-to-goal scoring heavily simplified** — Binary uses complex per-goal-type scoring with distance/priority weighting. JS uses simple `priority / (distance + 1)`. File: `engine/ai/index.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (P7)

93. **AI unit obsolescence/upgrade during goal matching missing** — Binary checks tech prerequisites, finds upgrade paths, disbands obsolete units and credits shield cost to nearby city. File: `engine/ai/unitai.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (P7)

94. **AI stack management missing** — Binary has full unit stack coordination (wake stacked units, cancel goto by domain, coordinate leaders). JS processes each unit independently. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#18)

95. **AI explorer missing fuel tracking, pillage, and diplomat capture** — Binary explorers track time-without-enemy, scan for enemy improvements to pillage, and hunt diplomats/settlers within 4 tiles. JS explorer just moves toward unexplored tiles. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#17)

96. **AI naval ranged/bombardment targeting missing** — Binary has complex ranged fire logic for single-shot and multi-shot ranged units, bombardment target selection with teleport, and fuel management. File: `engine/ai/unitai.js`. Source: deep_dive_batch_9_12.md (#5)

97. **Naval barbarian AI missing** — Binary has full naval barbarian path: scuttle weak ships, 30-turn timeout, coastal raiding, city founding with ransom. JS skips naval barbarians entirely. File: `engine/ai/barbarian.js`. Source: deep_dive_batch_9_12.md (#7)

98. **AI city production: difficulty conflated with alive civ count** — JS uses `aliveCivCount` as proxy for difficulty in several production scoring formulas. These are independent parameters in binary. File: `engine/ai/prodai.js`. Source: deep_dive_ai_choose_city_production.md (#7)

99. **AI spaceship categories collapsed from 6 to 3** — Binary tracks 6 individual part types (structural, propulsion, fuel, habitation, life-support, solar). JS only tracks 3 aggregate counts (structurals, components, modules). File: `engine/ai/prodai.js`, `engine/spaceship.js`. Source: deep_dive_ai_choose_city_production.md (#13), deep_dive_batch_21_24.md (#1)

100. **Granary half-fill formula differs on blocked growth** — Binary sets `food_in_box = (size+1) * (food_box_multiplier/2)`. JS sets `newFood = growthThreshold - 1`. File: `engine/cityturn.js`. Source: deep_dive_batch_25_28.md (#1)

101. **WLTKD trade bonus overproduction** — JS gives +1 trade on every producing tile during WLTKD. Binary does NOT have this; WLTKD only affects government penalty check. File: `engine/production.js`. Source: deep_dive_batch_25_28.md (#4)

102. **Same-continent vs cross-continent corruption distance differs** — Binary uses road-network distance when capital and city are on the same continent, raw isometric distance otherwise. JS always uses raw isometric distance. File: `engine/production.js`. Source: deep_dive_batch_25_28.md (#6)

103. **Supply/demand resolution, top-3 selection, and demand slots 6/7 swapped** — Binary resolves supply>demand conflicts, sorts and picks top 3 commodities, and has specific demand formulas per slot. JS returns raw arrays without resolution and has slots 6 and 7 swapped. File: `engine/production.js`. Source: deep_dive_batch_9_12.md (#1)

104. **Bribe cost may use movesRemain instead of hpLost for damage discount** — Binary uses `cost * (maxHP - hpLost) / maxHP`. JS appears to use `movesRemain` instead of HP lost, which is a different field. File: `engine/espionage.js`. Source: deep_dive_batch_25_28.md (#17)

105. **Auto-disband on unit support deficit missing** — Binary automatically disbands the farthest unit from city when support deficit occurs, with shield refund. JS may just show a deficit. File: `engine/cityturn.js`. Source: deep_dive_batch_21_24.md (#28)

106. **Dynamic territory expansion missing** — Binary has terrain-scored tile claiming when cities grow or wonders complete, with auto-road placement. File: needs implementation. Source: deep_dive_batch_21_24.md (#30)

107. **AI late-game bonus for first city missing** — Binary gives AI first city after turn 40 bonus size (up to +10) plus free buildings (Granary, Marketplace, Barracks). File: `engine/init.js`. Source: deep_dive_batch_17_20.md (#11)

108. **AI diplomatic encounter auto-attack missing** — Binary triggers diplomacy and can auto-attack adjacent undefended enemy cities. JS only handles auto-capture of non-combat units. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#4)

109. **Attitude scale 0-100 vs -100 to +100** — Binary attitude is 0-100 (never negative). JS is -100 to +100. Affects all threshold comparisons in diplomacy. File: `engine/diplomacy.js`, `engine/ai/diplomai.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (3.2)

110. **Wonder-based corruption counters simplified** — Binary tracks specific wonder-based corruption count (Adam Smith, Factory, Democracy, Communism, Women's Suffrage). JS uses simpler government-factor formula. File: `engine/production.js`. Source: deep_dive_batch_25_28.md (#5)

111. **Post-trade corruption double-calculation** — Binary recalculates corruption after adding trade route income. JS applies corruption once. File: `engine/happiness.js`. Source: deep_dive_batch_17_20.md (#12)

112. **AI GROVEL mechanic missing** — Binary has complete capitulation (surrender all gold + all unknown techs) when very weak. File: `engine/ai/diplomai.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (1.4)

113. **AI "over a barrel" bonus tech demand missing** — After accepted tech demand, binary sometimes demands a second tech. File: `engine/ai/diplomai.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (1.3.2)

114. **Map exchange prerequisites missing** — Binary checks alliance status, attitudeScore, and Alphabet/Writing tech before allowing map exchange. JS `shareMaps()` has none of these gates. File: `engine/diplomacy.js`. Source: deep_dive_batch_13_16.md (#1)

115. **Worker assignment algorithm simplified** — Binary uses multi-phase algorithm (honor existing, rotate, food-priority first, then surplus optimization). JS uses single greedy pass with `food*3 + shields*2 + trade`. File: `engine/reduce/helpers.js`. Source: deep_dive_batch_21_24.md (#7)

116. **Paradrop missing peace treaty check** — Binary prompts war declaration if paratroop lands near allied city. JS may not check treaties on paradrop. File: `engine/reduce/move-unit.js`. Source: deep_dive_batch_17_20.md (#14)

117. **City transfer disbands distant units instead of rehoming** — Binary disbands units homed to city but NOT at city tile. JS rehomes to nearest city instead. File: `engine/diplomacy.js`. Source: deep_dive_batch_17_20.md (#23)

118. **City transfer visibility range differs** — Binary reveals 21-tile radius + 8-tile adjacent scan. JS calls `updateVisibility` with range 2. File: `engine/diplomacy.js`. Source: deep_dive_batch_17_20.md (#23)

119. **Pathfinding railroad cost differs** — Binary treats railroad as free (cost=0). JS `moveCost()` assigns non-zero cost, so pathfinding may prefer roads over railroads in edge cases. File: `engine/pathfinding.js`. Source: deep_dive_batch_13_16.md (#8)

120. **Tax rate auto-clamp vs rejection on government change** — Binary auto-adjusts rates when government changes. JS rejects invalid rate combinations, potentially leaving rates in an invalid state. File: `engine/reducer.js`. Source: deep_dive_batch_13_16.md (#7)

121. **Transport loading priority system missing** — Binary has 2-pass loading (goto-targeted units first, then non-sentried ground units). JS likely loads without priority ordering. File: `engine/movement.js`. Source: deep_dive_batch_21_24.md (#10)

122. **Airlift per-city limit and interception risk missing** — Binary enforces one-airlift-per-turn-per-city and warns about enemy fighter interception. File: `engine/reducer.js`. Source: deep_dive_batch_21_24.md (#26)

123. **Per-city science accumulation vs per-civ** — Binary accumulates science per-city (can double per-city). JS doubles the total at civ level. Edge cases with rounding may differ. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (6.9)

124. **AI government-specific tech preferences missing** — Binary has 8 government types each with specific tech value bonuses/penalties (e.g., Romans favor Republic, Greeks favor Democracy). File: `engine/ai/econai.js`. Source: deep_dive_batch_17_20.md (#10)

125. **AI Nuke targeting missing military comparison and SDI check** — Binary checks 2/3 strength ratio, population minimum (>4), and SDI Defense building. JS targeting is simplified. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#12)

126. **AI wounded retreat missing siege detection and auto-attack reset** — Binary has complex retreat logic including siege detection (enemy adjacent to own city) and autoAttack damage level reset. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#6)

127. **Barracks obsolescence chain walk simplified** — Binary walks the full obsolescence chain from Gunpowder to find latest non-obsolete barracks tech. JS only checks Gunpowder directly. File: `engine/research.js`. Source: deep_dive_batch_13_16.md (#15)

128. **Electronics discovery missing special effect** — Binary sets a civ flag (0x20) and triggers "We Love the King Day" on Electronics discovery. JS does not. File: `engine/research.js`. Source: deep_dive_batch_13_16.md (#15)

129. **Civ elimination tile reassignment missing** — Binary scans 45-tile radius per city and reassigns tile ownership to nearest alive civ. JS clears visibility but doesn't reassign tiles. File: `engine/diplomacy.js`. Source: deep_dive_batch_17_20.md (#9)

130. **Wonder switching notification and epoch penalty missing** — Binary notifies "wonder abandoned/started" with diplomacy events and applies epoch-based shield penalty. File: `engine/reducer.js`. Source: deep_dive_batch_17_20.md (#13)

---

## LOW — Cosmetic or edge-case only

### Combat
131. **Single-round combat option (scenario flag) missing** — Binary supports single-round combat when game option flag is cleared. JS always loops until one unit dies. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D15)

132. **Submarine retreat in combat loop is JS-only addition** — Binary submarine retreat is elsewhere; JS adds it inside the combat loop. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D16)

133. **Kill counter not tracked** — Binary tracks per-civ kill counters. JS doesn't. Stats only. File: `engine/combat.js`. Source: deep_dive_resolve_combat.md (D21)

134. **Post-combat fuel/wake/scramble missing** — Binary handles air fuel tracking and defender scramble after combat. File: `engine/reduce/move-unit.js`. Source: deep_dive_resolve_combat.md (D29)

### City Capture
135. **Production item forced to Warriors on capture** — Binary preserves production item (with zeroed shields). JS forces Warriors. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#12b)

136. **Marco Polo's Embassy recalculation on capture missing** — Binary recalculates embassy contacts when a city with Marco Polo is captured. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#6b)

137. **In-progress wonder handling on capture missing** — Binary handles wonders under construction with abandon/continue notifications. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#6a)

138. **Eiffel Tower reputation recalculation on capture missing** — Binary recalculates capturer's reputation when city with Eiffel Tower is captured. File: `engine/citycapture.js`. Source: deep_dive_handle_city_capture.md (#15)

### Movement
139. **LONGMOVE counter missing** — Binary prevents infinite goto loops after 47 moves. JS has no such protection. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#25)

140. **Fatigue dialog missing** — Binary allows one-more-move with player confirmation at low MP. JS rejects any move with `movesLeft <= 0`. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#11)

141. **Order clearing on failed goto missing** — Binary clears goto to idle on failed moves. JS doesn't modify orders on rejected moves. File: `engine/reduce/move-unit.js`. Source: deep_dive_move_unit.md (#26)

### Production
142. **Coast guard barbarian check missing** — Binary prevents barbarian cities on heavily improved coastal tiles from building. Minor barbarian AI edge case. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#3)

143. **Diplomat initial target byte encoding missing** — Binary encodes home city into spy unit record. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#22)

144. **Firepower-based intel reset missing** — Binary resets enemy intelligence on high-firepower units. AI awareness feature. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#23)

### Turn Pipeline
145. **Future tech counter after turn 199 missing** — Binary increments future tech counter. Low-priority feature. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 2, step 7)

146. **Random ozone/event timer missing** — Binary has random barbarian event timers. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 2, step 11)

147. **Per-civ score accumulators missing** — Binary accumulates per-civ score data during city processing. JS computes scores every 10 turns. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 4)

148. **City processing flag clearing missing** — Binary clears 0x10000 "already processed" flag per city. Minor flag management. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 4, step 6a)

### Diplomacy
149. **TRIBUTE_DEMANDED flag not set during ceasefire signing** — Binary sets flag 0x40000 via FUN_00467750. File: `engine/diplomacy.js`. Source: deep_dive_batch_25_28.md (#13)

150. **Patience decrement vs attitude penalty difference** — Binary decrements patience per-civ scalar every 3 turns. JS applies attitude penalties to specific enemies. File: `engine/ai/diplomai.js`. Source: deep_dive_batch_13_16.md (#16)

151. **Treaty flag management missing** — Binary clears specific transient treaty flags (bits 14, 17, 23, 10, 0x800, 0x80000) on schedule. JS does not manage these bits. File: `engine/ai/diplomai.js`. Source: deep_dive_batch_13_16.md (#16)

152. **WARENDS event missing** — Binary fires WARENDS when embassy/Navigation/Writing visibility conditions met. File: `engine/ai/diplomai.js`. Source: deep_dive_batch_13_16.md (#16)

153. **Senate override toggle missing** — Binary randomly toggles senate override flag (1/3 chance per turn). File: `engine/ai/diplomai.js`. Source: deep_dive_batch_13_16.md (#16)

### AI
154. **AI auto-settler at size 2 missing** — Binary creates a free settler for AI when city reaches size 2. File: `engine/cityturn.js`. Source: deep_dive_batch_25_28.md (#1)

155. **AI rate calculation for tax/luxury/science missing** — Binary calculates AI rates after city processing based on disorder, treasury, and government. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 4, step 9)

156. **AI evaluation and diplomacy per-civ-turn missing** — Binary calls FUN_00560084 (AI evaluation) and FUN_0053184d (AI diplomacy) during each civ's turn. Currently these are separate AI modules. File: `engine/reduce/end-turn.js`. Source: deep_dive_turn_pipeline.md (section 3, steps 8-9)

157. **AI direction momentum tracking missing** — Binary stores last direction for the momentum penalty in next turn's evaluator. JS doesn't persist this. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#19)

158. **AI finalize phase naval cargo increment missing** — Binary increments cargo counter to track turns at sea. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#19)

159. **AI production goal creation from unit AI missing** — Binary's 48-slot goal system requests production across cities. JS has basic 4-type goals. File: `engine/ai/unitai.js`. Source: deep_dive_ai_unit_turn_master.md (#20)

### Events/Scenario
160. **NEGOTIATION auto-TRANSPORT flag missing** — Binary automatically sets TRANSPORT flag on NEGOTIATION events. JS requires explicit action. File: `engine/events.js`. Source: deep_dive_network_events.md (#7)

161. **Scenario-specific hardcoded overrides missing** — Binary has forced behavior for civ pairs (3,6), (3,1), (6,7). File: `engine/ai/diplomai.js`. Source: deep_dive_ai_diplomacy_civ_turn.md (1.4)

### Parser/Init
162. **Starting science/tax rates differ** — Binary: 40%/40%/10%. JS: 50%/50%/0%. File: `engine/init.js`. Source: deep_dive_batch_9_12.md (#6)

163. **Missing explorer starting unit** — Binary places explorer if tech allows. JS only places Settlers + Warriors. File: `engine/init.js`. Source: deep_dive_batch_9_12.md (#6)

164. **Accelerated start not implemented** — Binary grants era-appropriate techs for advanced starts. File: `engine/init.js`. Source: deep_dive_batch_9_12.md (#8)

### Misc
165. **Veteran status Gunpowder tech check missing for production** — Binary checks Gunpowder tech for additional veteran conditions. File: `engine/cityturn.js`. Source: deep_dive_process_city_production.md (#19)

166. **City deletion trade route cleanup missing** — Binary clears trade route references from all other cities. File: `engine/reduce/helpers.js`. Source: deep_dive_batch_21_24.md (#21)

167. **City creation coastal/river flags missing** — Binary scans adjacent tiles to set coastal, river, mountain flags in city flags bitfield at creation time. File: `engine/reducer.js`. Source: deep_dive_batch_17_20.md (#11)

168. **Unit auto-upgrade attack-power requirement is JS-only addition** — Binary matches by obsoleteTech and domain only. JS adds `UNIT_ATK[candidate] >= UNIT_ATK[old]` check. File: `engine/research.js`. Source: deep_dive_process_city_production.md (#16)

169. **Tech source tracking missing** — Binary records which civ provided each tech for score/history. File: `engine/research.js`. Source: deep_dive_batch_13_16.md (#15)

170. **Patience decrement on cancel in favor menu** — Binary decrements patience when player cancels the favor menu. File: `engine/diplomacy.js`. Source: deep_dive_batch_13_16.md (#1)

171. **AI city production coastal flag computation simplified** — Binary has alliance-war override and enemy count threshold. JS simplified. File: `engine/ai/prodai.js`. Source: deep_dive_ai_choose_city_production.md (#1)

172. **AI production stickiness formula simplified for wonders** — Binary uses progress-based formula. JS simplified. File: `engine/ai/prodai.js`. Source: deep_dive_ai_choose_city_production.md (#5)

173. **AI Capitalize fallback missing** — Binary returns 99 (capitalize) when bestScore > 500. JS always tries to build something. File: `engine/ai/prodai.js`. Source: deep_dive_ai_choose_city_production.md (#14)

174. **Power graph and war trigger from power rankings not implemented** — Binary calculates power rankings with automatic war-declaration from power disparity. File: needs implementation. Source: deep_dive_batch_21_24.md (#2)

175. **Civ slot recycling after elimination missing** — Binary calls `new_civ()` to recycle eliminated civ slots for new barbarian civs. JS doesn't recycle. File: `engine/diplomacy.js`. Source: deep_dive_batch_21_24.md (#27)

176. **Max unit limit enforcement missing** — Binary enforces 2047 hard cap and 1948 AI soft cap. JS has no unit count limit. File: `engine/reducer.js`. Source: deep_dive_batch_21_24.md (#22)

177. **AI wonder competition unit-relocation logic missing** — Binary moves units between cities when rival builds same wonder. JS only adjusts scores. File: `engine/ai/prodai.js`. Source: deep_dive_ai_choose_city_production.md (#5)

178. **AI military aid (gifting units to allies) not implemented** — Binary finds strongest land unit and transfers to unguarded ally city. File: `engine/ai/diplomai.js`. Source: deep_dive_batch_17_20.md (#22)

179. **Spaceship AI launch decision logic missing** — Binary has complex heuristics for when AI should launch early (comparing progress vs others). JS AI has no logic for deciding when to launch. File: `engine/ai/prodai.js`, `engine/spaceship.js`. Source: deep_dive_batch_21_24.md (#1)

---

## N/A — Architectural differences (not bugs)

180. **WebSocket vs DirectPlay networking** — Binary uses DirectPlay with 170 binary message types. JS uses WebSocket with JSON messages. Not comparable. Source: deep_dive_network_events.md

181. **Server-authoritative model eliminates need for tile locking** — Binary uses map locks for multiplayer. JS reducer is synchronous. Source: deep_dive_move_unit.md (#4)

182. **PRNG implementation differs by design** — Binary uses global C `rand()`. JS uses deterministic per-combat seeded PRNG for reproducibility. Source: deep_dive_resolve_combat.md (D30)

183. **Odds preview function not needed** — Binary has dual-purpose function (preview/execute). JS always executes. Source: deep_dive_resolve_combat.md (D12)

184. **Per-civ visibility during movement** — Binary tracks 7 civs' visibility. JS server computes per-client on send. Source: deep_dive_move_unit.md (#18)

185. **Diplomat/spy and caravan auto-trigger on move vs separate actions** — Binary auto-triggers espionage/trade on movement. JS requires explicit actions. Source: deep_dive_move_unit.md (#6, #7)

186. **Nuclear attack architecture differs** — Binary integrates nukes into resolve_combat. JS has separate `handleNuclearAttack()`. Source: deep_dive_resolve_combat.md (D17)

187. **Save file writer not needed** — JS state lives in server memory. Source: deep_dive_batch_13_16.md (#4)

188. **Cheat/debug system not ported** — Intentional. Source: deep_dive_batch_13_16.md (#12)

189. **UI dialog functions (menus, city screens, advisors)** — Handled by client-side JS. Source: multiple

190. **Hot-seat mode not needed** — WebSocket multiplayer replaces it. Source: deep_dive_batch_17_20.md (#8)

191. **Host migration not needed** — JS server is permanent. Source: deep_dive_network_events.md

192. **Unit stack linked lists vs arrays** — JS uses array-based unit management. Source: deep_dive_batch_25_28.md (#16)

193. **AI interactive negotiation loop** — Binary uses blocking dialog with multiple rounds. JS uses non-blocking one-shot decision. Source: deep_dive_ai_diplomacy_civ_turn.md (1.2)

194. **Reputation system is JS enhancement** — JS has a full reputation system with decay not present in binary (which uses patience only). Source: deep_dive_diplomacy_espionage.md

195. **Recursive alliance war cascade is JS enhancement** — Binary uses single pass. JS does recursive cascade with guard set. Source: deep_dive_diplomacy_espionage.md (#8)

196. **JS-original AI features** — Air intercept/scramble, coordinated transport assault, threat radius check, smart espionage selection, wonder-building bonuses for diplomat targeting, crusade proposals, shared enemy attitude bonus. Source: deep_dive_ai_unit_turn_master.md
