# Deep Dive: ai_diplomacy_negotiate + ai_process_civ_turn

Binary-to-JS comparison of two major AI functions.

---

## 1. ai_diplomacy_negotiate (FUN_00460129, 16,263 bytes)

**Binary**: `reverse_engineering/decompiled/block_00460000.c` lines 43-1223
**JS**: `charlizationv3/engine/ai/diplomai.js` (3,185 lines)
**Phase 7 audit**: `reverse_engineering/function_audit/phase7/block_00460000_audit.md`

### 1.1 Architecture Difference

The binary function is a **monolithic interactive dialog handler** that orchestrates the entire diplomatic meeting between two civs. It interleaves game logic decisions (tribute amounts, tech demands, treaty evaluation) with Win32 UI operations (dialog boxes, message strings like "OUTAHERE", "TRIBUTE", "TAKECIV", "PROPOSEALLIANCE", etc.). The function manages a single meeting from start to finish, including an interactive loop where the human player picks menu options.

The JS reimplementation takes a fundamentally different approach: it is a **server-authoritative action generator** that runs each AI turn and emits an array of actions (DECLARE_WAR, PROPOSE_TREATY, DEMAND_TRIBUTE, ADJUST_ATTITUDE, etc.). There is no interactive dialog; the JS AI evaluates all civs and makes decisions autonomously. The JS `generateDiplomacyActions()` is the entry point, calling ~15 sub-functions that each handle one aspect of diplomacy.

**Key structural divergence**: The binary handles AI-vs-human diplomacy as a single blocking dialog call. The JS handles AI-vs-AI and AI-vs-human identically as non-blocking action generation. This means the entire negotiation state machine (greeting, demand, counter-offer, acceptance loop) from the binary is replaced by a one-shot decision system.

### 1.2 Negotiation State Machine

#### Binary Flow (FUN_00460129 pseudocode from phase 2)

The binary follows this strict sequential flow:

1. **Guard & Setup** — Check visibility, store negotiating civs, reset state
2. **Pre-negotiation Evaluation** — Call FUN_0045705e to compute tribute, attitude, tech desire
3. **AI Kick-Out Checks** — If AI-initiated: check hatred flag (0x200000), patience exhaustion, ambassador recall
4. **Set Meeting Flags** — Set 0x800000 (meeting in progress), check gift history
5. **Tutorial/Scenario Override** — Hardcoded civ pairs (3,6) and (3,1) get forced results
6. **Gift Exchange Phase** — Call handle_exchange_gift
7. **Cancel Treaty Proposal** — Propose cancelling treaty with third party
8. **Alliance Break Check** — Check attitude divergence, tech demand while allied
9. **Tech Map Check** — Check tech prerequisites for map exchange eligibility
10. **Tribute Demand** — Show TRIBUTE dialog with 4-option response (refuse/accept/war/map)
11. **Tech Demand** — Show TAKECIV dialog, handle "over a barrel" bonus demand
12. **Alliance Break Execution** — Break alliance with BEGONE0/BEGONE1 dialogs
13. **Provocation** — Show PROVOKE dialog, set provoked flag, set attitude >= 75
14. **Rejection** — Show REJECT0 or rejection dialog
15. **Accursed Notification** — ACCURSEDUN/ACCURSEDWALL if Great Wall
16. **Alliance Proposal** — Multi-condition check, PROPOSEALLIANCE dialog, PERHAPSSOLIDARITY (join war)
17. **Ceasefire Negotiation** — GRANTCEASE/PROPOSECEASE/WALLCEASE with senate override
18. **Peace Treaty Negotiation** — Military power comparison for tone, PROPOSEPEACE with gold demand
19. **Greeting / Attitude Display** — WELCOME/HOWDY/DOODY/ATTITUDE variants
20. **Interactive Loop** — do/while on patience counter, menu choices (trade/gift/negotiate)
21. **Cleanup** — Update treaty flags, patience counter, ceasefire expiration

#### JS Flow (generateDiplomacyActions)

The JS follows a different priority order, executing all phases non-interactively:

1. **Per-turn housekeeping** (O.4) — Anarchy government choice, patience decrement, alliance violation detection, periodic attitude drift, ceasefire expiration
2. **Multi-factor attitude evaluation** (O.5) — Border intrusion, personality, military threat, alliance bonus, wonder effects, spaceship race, espionage, shared enemies
3. **Provocation conditions** — Immediate war on INTRUDER/HOSTILITY flag
4. **Respond to incoming proposals** (O.1) — Treaty proposals, tribute demands with counter-offers
5. **War declarations** — shouldDeclareWar per-continent analysis, shouldDeclareWarFull formula
6. **Spontaneous war** — checkSpontaneousWar for attitude-driven peace breaks
7. **Peace proposals** — shouldProposePeace with military balance
8. **Tribute demands** — shouldDemandTribute with cooldown and era scaling
9. **Alliance breaks** — shouldBreakAlliance conflict counting, checkAllianceBreak threshold
10. **AI tech exchange** (O.2) — AI-to-AI tech trading with superior-civ blocking
11. **Alliance/crusade proposals** (O.3) — HELPME pattern, crusade against dominant civ
12. **Military aid** — Gift units to weaker allies
13. **AI-vs-AI diplomacy** — Treaty progression/regression (ceasefire -> peace -> alliance)

### 1.3 Detailed Comparison by Subsystem

#### 1.3.1 Tribute Assessment

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Computation source | FUN_0045705e computes DAT_0064b118 (gold demand) and DAT_0064b0ec (tech desire) into global state | `shouldDemandTribute()` computes amount locally per call | Different approach |
| Amount formula | `(difficulty + 1) * tech_desire / 32`, clamped, with patience divisor | `treasury * 0.1 * (difficulty + 1) / patienceDivisor`, with era scaling (x1/x2/x3) | **DIVERGENT** |
| Alliance tribute | `min(civA.treasury / 2, max(100, tributeAmount))` | Not separately handled; alliances use different thresholds | **MISSING** |
| Gold cap for alliance | Binary caps tribute against half of target's treasury | JS caps at 1000 regardless | **DIVERGENT** |
| Cooldown | Last contact turn stored in `DAT_0064ca82[target][us]`, 6-turn minimum | Explicit 8-turn cooldown timer + 16-turn half-demand period | **DIVERGENT** (JS has more complex cooldown) |
| Great Wall/UN suppression | Checks via FUN_00453e51 for building 6 and 0x18 | `civHasWonder(state, targetCiv, 6/24)` | MATCH (concept) |

#### 1.3.2 Tech Valuation

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Function | FUN_004bdb2c (calcTechValue) | `valueTech()` | Approximate |
| Formula | `baseCost * (1 + prereqDepth/4) * utilityMultiplier` | `(5 + depth * 2) * multipliers` | **DIVERGENT** — different base formula |
| Utility checks | Military unit (ATK >= 3): x2; building/wonder: x1.5; government: x2 | Military unit: x2; building: x1.3; government: x2; AI interest: x1.5; modern era: x1.25 | **PARTIALLY MATCH** — JS adds AI interest and era bonus, has lower building multiplier |
| "Over a barrel" bonus tech | Binary demands a second tech if conditions met (DAT_0064b10c) | Not implemented | **MISSING** |

#### 1.3.3 War Declaration Evaluation

| Aspect | Binary (FUN_0055cbd5) | JS (shouldDeclareWar + shouldDeclareWarFull) | Match? |
|--------|--------|-----|--------|
| Per-continent analysis | Iterates continent data blocks at civ+404, compares attack_strength per continent | `evaluateMilitaryBalance()` using union-find city clustering | **APPROXIMATION** — JS clusters by city proximity instead of real continent IDs |
| War front limit | Complex: uses patience tables, difficulty-derived thresholds | Simple: max 2-3 fronts depending on militarism | **SIMPLIFIED** |
| Third-party alliance check | Checks all third-party alliances, considers relative strength | Similar check but simpler threshold | PARTIAL MATCH |
| Attacked-flag fast-path | WAR_STARTED flag triggers immediate war | Same via `shouldDeclareWarFull` | MATCH |
| Final formula | `(ourStrength << 2) / (theirStrength + theirDefense) < (allyScore - patience + 4)` | Same formula in `shouldDeclareWarFull` | **MATCH** |
| Random factor | `_rand()` scattered throughout | Single probabilistic gate (0.2 + 0.1 * militarism + difficulty * 0.05) | **SIMPLIFIED** |

#### 1.3.4 Alliance Proposal

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Conditions | 9+ simultaneous checks: both civs < difficulty 6, turn > 200, 0 existing alliances, attitude < 25 (or < 50 with third party), various reputation/attitude thresholds | 7 conditions: alive, contact, not allied, attitude gate (tolerance - attitude < 6), not at war, not barbarian, reputation check | **SIMPLIFIED** — JS has fewer but similar conditions |
| Third-party solidarity | PERHAPSSOLIDARITY — join war against third party on alliance acceptance | Not implemented as a combined alliance+war offer | **MISSING** |
| Timing | Part of interactive dialog flow | Every 32 turns, staggered per civ | **DIFFERENT** |
| Formation | FUN_0045a535 (form_alliance) | `formAlliance()` from diplomacy.js | MATCH (action type) |

#### 1.3.5 Ceasefire/Peace Negotiation

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Senate override | FUN_0055bef9 checks senate, Great Wall (6), United Nations (0x18); shows OVERRULECEASE/OVERRULEPEACE dialogs | `shouldBetrayTreaty()` from diplomacy.js for spontaneous war; treaty proposals check reputation | PARTIAL MATCH |
| Random demand chance | `rand() % demandChance == 0` where demandChance = personalityScore - violations + 1, doubled for embassy | Not implemented — JS doesn't add random demands during peace negotiation | **MISSING** |
| GROVEL mechanic | Complete capitulation: surrender all gold + all unknown techs | Not implemented | **MISSING** |
| Gold demand for peace | `clamp(attitudeScore*2-4, 0, civB.gold/50) * 50`; halved for Great Wall/UN | Not implemented as separate mechanic | **MISSING** |
| Military tone | 5-level tone based on power comparison (each threshold adjusts local_10 by +/-1) | `getGreetingTone()` maps to 5 levels but based on attitude, not military comparison | **DIVERGENT** |

#### 1.3.6 Patience System

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Storage | `DAT_0064c6bf[civB * 0x594]` — per-civ patience counter | Not stored as explicit counter; approximated through periodic attitude decrements | **DIFFERENT** |
| Increment | `patience++` on each failed demand or rejected proposal | Attitude decrements every 3 turns toward war enemies | **APPROXIMATION** |
| Max patience check | FUN_00456f8b computes max patience from difficulty + leader personality | `calcPatienceThreshold()` from diplomacy.js | PARTIAL MATCH |
| Interactive loop | `do { ... } while (patience < maxPatience)` — controls how many proposals per meeting | No interactive loop; one-shot decision | **FUNDAMENTALLY DIFFERENT** |

### 1.4 Features Present in Binary but Missing from JS

1. **Interactive negotiation loop** — The binary supports multiple rounds of proposals within a single meeting, gated by patience counter. JS is one-shot.
2. **GROVEL mechanic** — Complete capitulation: surrender all gold + all techs when very weak.
3. **"Over a barrel" bonus tech demand** — After tech demand accepted, sometimes demands a second tech.
4. **Third-party solidarity on alliance** — PERHAPSSOLIDARITY: alliance + war against shared enemy in one offer.
5. **Senate/wonder override for ceasefire** — SENATEPEACE/SENATECEASE forced peace via Great Wall or UN.
6. **Random gold/tech demands during peace negotiation** — Binary adds random demands as conditions of accepting ceasefire/peace.
7. **Scenario-specific hardcoded overrides** — Civ pairs (3,6), (3,1), (6,7) get special treatment.
8. **Ally plea/brag** — ALLYPLEA (mutual defense continent comparison) and ALLYBRAG.
9. **Contested cities dialog** — PLEASECITY/PLEASECITIES for cities near borders.
10. **War provocation threshold** — FUN_00467af0: attitude > 49 with contact-only status triggers provocation consideration.

### 1.5 Features Present in JS but Not in Binary

1. **AI tech exchange** (O.2) — AI-to-AI tech trading with superior-civ blocking. Binary has FUN_0055d1e2 for this but it is a separate function, not part of FUN_00460129.
2. **Crusade proposals** — Rally multiple weak civs against dominant civ.
3. **Military aid** — Gift units to weaker allies.
4. **Border score integration** — Detailed per-tile border scoring with improvement bonuses.
5. **Intrusion escalation system** — Timing-gated escalation with tolerance roll.
6. **Spaceship race detection** — Hostility increase when rival builds spaceship.
7. **Shared enemy attitude bonus** — +2 attitude for civs fighting the same enemy.

### 1.6 Previously Identified Discrepancies (Phase 7 Audit)

From `block_00460000_audit.md`:

| ID | Issue | Impact |
|----|-------|--------|
| D-0046-1 | addTreatyFlag cascade clears wrong bits on peace (JS misses INTRUDER 0x20 and bit9 0x200) | Minor |
| D-0046-2 | Attitude clamped to [-100, 100] instead of binary's [0, 100] | Moderate |
| D-0046-3 | Alliance break does not relocate units from former ally's cities | Moderate |
| D-0046-4 | Provocation threshold function (FUN_00467af0) not implemented | Low |

---

## 2. ai_process_civ_turn (FUN_0053184d, 14,665 bytes)

**Binary**: `reverse_engineering/decompiled/block_00530000.c` lines 405-1265
**JS**: `charlizationv3/engine/ai/index.js` (1,162 lines)
**Phase 7 audit**: `reverse_engineering/function_audit/phase7/block_00530000_audit.md`

### 2.1 Architecture Comparison

The binary FUN_0053184d is a **monolithic per-turn AI function** called once per AI civ per turn. It performs all strategic bookkeeping: unit counting, continent assessment, threat levels, goal assignment, and unit-to-goal matching. It writes results directly into global data arrays at fixed offsets within the civ's 0x594-byte record.

The JS `runAiTurn()` in `ai/index.js` follows the same phase structure (P0-P8) explicitly labeled as a port of FUN_0053184d, then delegates to action-generating modules. The JS is split into ~9 phase functions plus ~7 action-generating module calls.

### 2.2 Phase-by-Phase Comparison

#### P0: Anti-Nuke Defense

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| SDI check | Checks tech for DAT_0064b2cf (current research), embassy visibility, and enemy Nuclear Missile (type 45). Redirects military units toward enemy cities with nukes. | `phaseAntiNukeDefense()`: checks for enemy Nuclear Missile units (type 45), counts cities without SDI Defense (building 17), checks The Laser tech (tech 41) | **SIMPLIFIED** — JS only sets flags for prodai; binary physically redirects units |
| Unit redirection | Binary iterates all enemy units of type matching current research tech prereq, finds own cities within missile range, and sends military units as escorts | JS only sets `strategy.needsSDI` and `strategy.canBuildSDI` flags | **MISSING** — no actual unit redirection in JS |

#### P1: Era Quarter Counting

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Storage | `DAT_0064c6b7[param_1 * 0x594 + quarter]` — 4 bytes per civ, one per era quarter (0-3) | `strategy.eraQuarters` — array of 4 counts from aiData | MATCH (concept) |
| Computation | Loop over 28 techs (0x1C), tech_id / 7 gives quarter index | Reads pre-computed `aiData.eraQuarters[civSlot]` from data.js | MATCH |
| Effective era thresholds | Not explicit in binary — used downstream by build priority tables | JS: quarters[3] >= 3 -> modern, quarters[2] >= 5 -> industrial, quarters[1] >= 5 -> renaissance | **JS-SPECIFIC** thresholds |
| Tech lead comparison | Not in this function (done elsewhere) | JS compares totalTechs +/- 3 against other civs to set techLeadStatus | **JS-SPECIFIC** |

#### P2: Terraform Goal Counting / Continental Data Init

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Binary operation | Zeros and initializes per-continent arrays: unit counts (DAT_0064c832), military power (DAT_0064c8b2), city counts (DAT_0064c932), threat flags (DAT_0064c9f2), plus 0x3E-entry arrays (DAT_0064c778, DAT_0064c7f4) | `phaseTerraformGoalCounting()`: scans each continent where AI has cities, checks surrounding tiles for missing roads/irrigation, adds GOAL_BUILD_ROAD goals | **FUNDAMENTALLY DIFFERENT** |
| Array initialization | Binary zeros 6 arrays x 64 entries = 384 values per civ | JS has no equivalent global array init — uses strategy objects | **DIFFERENT** |
| Terraform scoring | Binary's terraform handling is in the later unit assignment phase (DAT_0064cab4 work site table with 48 slots, priority/distance scoring) | JS checks unimproved tiles in city radius, adds goals with priority 30-120 | **SIMPLIFIED** |

#### P3: Unit Classification

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Iteration | All units, per-civ. Clears stale order bits (0xFC7F mask), checks diplomat spy flag (0x200), handles unhoming | `phaseUnitClassification()`: classifies by role/domain, tracks settlers, detects stale GOTOs, ZOC stuck detection | **PARTIAL MATCH** |
| Spy flag handling | Binary checks `DAT_0064b1ca[unitType * 0x14] == 5` (diplomat role) and clears order to 0xFF if unhomed, with special barbarian skip flag (0x200) | JS skips air units from goal matching but doesn't handle spy/diplomat unhoming | **MISSING** — diplomat/spy order clearing |
| GOTO cancellation | Binary: if order is GOTO (3) and domain matches bitmask, clear to 0xFF. Also handles "goto completed" by checking if at target and city has defense flag (0x40) | JS: checks if at GOTO target or domain mismatch (land unit -> ocean target) | **SIMPLIFIED** |
| ZOC wait | Binary has no explicit ZOC wait in this phase — it's in FUN_005351aa and FUN_00538a29 | JS counts adjacent enemies and sets zocWaitCount if >= 3 | **JS-SPECIFIC** |
| Per-continent counting | Binary increments unit counts, attack strength, city counts per continent ID from tile lookup (FUN_005b8aa8) | JS classifies by role/domain Maps but not per-continent in this phase | **DIVERGENT** — JS defers continent analysis to strategy assessment |
| Settler counting | Binary checks `DAT_0064b1ca[unitType * 0x14] == 5` (settler role) | JS checks `SETTLER_TYPES.has(u.type)` | MATCH (concept) |

#### P4: City Processing

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Binary operation | Per-city iteration counting: population per continent, per-civ city counts, wonder tracking, military strength comparison. Creates attack/defend goals via FUN_0049301b. Computes per-continent threat flags (0x01=enemy cities, 0x02=enemy military, 0x04=at-peace cities) | `phaseCityProcessing()`: defense goals at own cities (priority 40 + size*3 + threat bonuses), attack goals at enemy cities, reinforce goals, naval assault goals, explore goals | **PARTIAL MATCH** |
| Defense priority | Binary uses FUN_0049301b(param_1, x, y, type, priority) to add goals to the 48-slot work table (DAT_0064cab4) | JS: priority = 40 + city.size * 3 + wonder bonus (30) + threat ratio * 30 + capital bonus (20), capped at 255 | **DIFFERENT FORMULA** but similar concept |
| Attack priority | Binary checks for enemy cities on same continent, evaluates city walls (building 8), creates attack goals | JS: priority = 50 + advantage ratio * 25 + city.size * 4 + no-walls bonus (25) + no-defenders bonus (30) | **DIFFERENT FORMULA** but similar factors |
| Per-continent enemy counting | Binary iterates all 8 civs per continent, sums military + city counts for enemies, allies, and neutrals separately | JS separates enemy military/cities from non-enemy on same continent | PARTIAL MATCH |
| Naval assault | Binary checks same-continent vs other-continent for coastal cities | JS creates NAVAL_ASSAULT goals for enemy coastal cities on different continents | MATCH (concept) |
| Explore goals | Binary adds explore goals for continents with units but no cities | JS same | MATCH |

#### P5: Continent Threat Assessment — 5-Level System

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Threat levels | Binary uses DAT_0064ca32: 0=uncontested, 1=contested, 4=needs_fortress, 5=safe (confusing naming — 5 is actually "safe" and 0 is "hostile") | JS: THREAT_SAFE=1, THREAT_EXPANSION=2, THREAT_FRONTIER=3, THREAT_CONTESTED=4, THREAT_HOSTILE=5 | **INVERTED SCALE** — binary 0=hostile/5=safe vs JS 1=safe/5=hostile |
| Computation | Complex multi-factor: compares per-continent unit counts, attack strength ratios, allied unit presence, fortress check (FUN_004bd9f0 for tech 0x2E), barbarian flag check, government patience modifier | JS: simple flag-based (0x01=enemy cities, 0x02=enemy military, 0x04=peace cities, 0x10=strong threat) | **HEAVILY SIMPLIFIED** |
| Fortress readiness | Binary checks if civ has Explosives tech (0x2E) to determine if defense level should be 4 vs 5 | JS: no fortress readiness check | **MISSING** |
| Government modifier | Binary adds government patience factor to threshold: `(char)(DAT_006554f9[government * 0x30]) + 6 + 1` or just `6` depending on flags | JS: no government modifier on threat thresholds | **MISSING** |
| City count threshold | Binary: `(DAT_00666132[continent * 0x10]) < (our_city_count + enemy_count) * threshold + 2` checks landmass capacity | JS: no landmass capacity check | **MISSING** |

#### P6: Unit Redistribution

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Binary operation | Not a separate phase in FUN_0053184d — redistribution is handled by the unit-to-goal matching and the transport/naval assault goals from P4 | `phaseUnitRedistribution()`: finds most threatened continent, creates TRANSPORT goals at coastal cities on safe continents | **JS-SPECIFIC PHASE** — binary handles this differently |
| Excess calculation | Binary: implicit from goal matching — units on safe continents with no goals get assigned to threatened continent goals | JS: explicit `excessUnits = ourMil - ourCities`, only redistributes if excess > 0 | **DIFFERENT APPROACH** |

#### P7: Unit-to-Goal Matching

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Iteration order | Binary: reverse iterate all units (last unit first), confirmed by `local_354 = DAT_00655b16; LAB_00533de4: local_354 = local_354 - 1` loop | JS: `for (let i = units.length - 1; i >= 0; i--)` | **MATCH** |
| Scoring | Binary: complex per-goal-type scoring with `aiStack_33c[goal] / (goalType == 0 ? 2 : 1) * distance / (priority + 1)`. Different formulas for different goal types (attack, defend, explore). | JS: `score = priority / (distance + 1)` for all goal types | **HEAVILY SIMPLIFIED** |
| Goal table | Binary: 48-slot work table (DAT_0064cab4) with 6 bytes per entry: x(2), y(2), type(1), priority(1) | JS: GoalList with separate tactical[] and strategic[] arrays | **DIFFERENT STRUCTURE** but functionally similar |
| Fortified threshold | Binary: complex check involving current goal, order status, and `(order == 1 || order == 2)` for fortify/sentry, with ratio-based threshold | JS: `bestScore <= currentScore * 1.5` for fortified units, minimum priority 80 for unassigned fortified | PARTIAL MATCH |
| Air unit handling | Binary: sets `DAT_006560fc[unit * 0x20] = 0x21` for air units (domain check via `DAT_0064b1c4[unitType * 0x14] >= 'c'`) | JS: `if (domain === 1) continue` — skips air units entirely | **SIMPLIFIED** — binary gives air units a fixed order, JS ignores them |
| Unit obsolescence/upgrade | Binary: checks tech prerequisites for unit upgrade, disbands obsolete units via FUN_005b6042, awards half shield cost to nearby city | JS: not handled in goal matching phase | **MISSING** |
| Barbarian-specific logic | Binary: hardcoded coordinates (0x2B,0x35), (0x4C,0x22), (0x3E,0x48), (0x43,0x5B) with random direction assignment for barbarian civs | JS: barbarian AI is a completely separate path (`generateBarbarianActions`) | **DIFFERENT APPROACH** |

#### P8: City Cleanup

| Aspect | Binary | JS | Match? |
|--------|--------|-----|--------|
| Binary operation | Clears peace flags (bit 0x200 on city flags), clears auto-build flag (bit 0x400), calls FUN_00493602 for diplomacy state updates | `phaseCityCleanup()`: computes per-city production hints (needsDefender, needsAttacker, needsSDI, needsWalls) based on goals and continent threats | **FUNDAMENTALLY DIFFERENT** |
| Flag operations | Binary: `city.flags &= 0xFFFFFDFF` (clear 0x200), `city.flags &= 0xFFFFFBFF` (clear 0x400) for all own cities | JS: no flag clearing — creates hint objects for prodai.js consumption | **DIFFERENT APPROACH** |
| Diplomacy update | Binary: calls FUN_00493602(param_1) which processes diplomacy state changes accumulated during the turn | JS: diplomacy handled separately by diplomai.js | **DIFFERENT ORCHESTRATION** |
| Civ death check | Binary: if no settlers and no cities, calls thunk_kill_civ(param_1, 0) | JS: not in this phase — handled elsewhere | **MISSING** from this function |

### 2.3 Post-Phase Action Generation (JS-specific)

After phases P0-P8, the JS calls action-generating modules in this order:

1. `generateEconActions()` — research & economy (tax rates, tech selection)
2. `generateDiplomacyActions()` — diplomacy (see section 1 above)
3. `generateProductionActions()` + `generateRushBuyActions()` + `generateSellObsoleteActions()` — city production
4. `generateSettlerActions()` — settler/worker AI
5. `generateMilitaryActions()` — military unit AI
6. `generateCleanupActions()` — skip/fortify all remaining units

The binary handles these in separate function calls from the turn loop caller, not inside FUN_0053184d itself. FUN_0053184d is purely the strategic bookkeeping phase; the action execution happens in FUN_00538a29 (the 45KB master unit order assignment function) and other callers.

### 2.4 Major Missing Systems

These binary systems have no JS equivalent:

1. **48-slot work site table** (DAT_0064cab4) — The binary maintains a prioritized queue of 48 work sites per civ with coordinates, type, and priority. Units are matched to work sites by distance/type scoring. JS uses a simpler GoalList.

2. **Unit obsolescence/upgrade** — Binary checks tech prerequisites, finds upgrade paths, disbands obsolete units and credits shield cost to nearby city.

3. **Diplomat/spy AI in unit classification** — Binary has special handling for spy flag (0x200), unhoming logic, and embassy-based visibility checks for military redirection.

4. **Fortress tech readiness** — Binary checks Explosives tech (0x2E) to determine continent defense level (4=needs_fortress vs 5=safe).

5. **Landmass capacity check** — Binary compares city+unit density against landmass size to determine overpopulation.

6. **Barbarian hardcoded coordinates** — Specific map positions for barbarian unit targeting in scenario mode.

7. **Government patience modifier** — Government type affects continent threat thresholds.

---

## 3. Cross-Cutting Discrepancies

### 3.1 Data Model

| Aspect | Binary | JS |
|--------|--------|-----|
| Civ record | Fixed 0x594 (1428) byte record with fields at fixed offsets | JSON objects with named properties |
| Treaty flags | 32-bit bitmask at `DAT_0064c6c0[civA * 4 + civB * 0x594]` | String treaty types + separate flags via `getTreatyFlags()` |
| Attitude | Integer 0-100, clamped at [0, 100] | Integer -100 to +100, clamped at [-100, 100] |
| Continent ID | Integer from tile lookup (FUN_005b8aa8/FUN_005b8a81), stored in map data | bodyId from map tile data, or union-find clustering by city proximity |
| Goal storage | 48-slot fixed array (DAT_0064cab4), 6 bytes per entry | GoalList class with dynamic tactical[] and strategic[] arrays |
| Unit order | Byte at unit+0x0F (0xFF=idle, 0x01=fortify, 0x02=sentry, 0x03=goto, 0x0B=goto+type, 0x10=work, 0x1B=move) | String orders ('goto', 'fortified', 'fortify', 'sentry', 'skip') |

### 3.2 Attitude Scale

The most impactful cross-cutting discrepancy: binary attitude is 0-100 (never negative), JS is -100 to +100. This affects:
- All threshold comparisons in diplomacy (tribute acceptance, war declaration, alliance proposals)
- The getAttitudeLevel() function (both return 0-8 levels, but binary level 0 = attitude 0, JS level 0 = attitude < 0)
- Attitude adjustment deltas (binary +5 means "slightly improve from 0-100 scale", JS +5 from -100 to +100 scale)

### 3.3 Randomness

| Binary | JS |
|--------|-----|
| `_rand()` calls scattered inline, results used immediately | `Math.random()` or `gameState.rng.random()`, often as single probabilistic gates |
| Multiple random checks compose (e.g., rand() % demandChance == 0 AND rand() & 1) | Single probability threshold (e.g., warChance = 0.2 + modifiers) |
| Deterministic replay via shared seed | RNG object allows deterministic replay |

---

## 4. Fidelity Assessment

### ai_diplomacy_negotiate

| Category | Fidelity | Notes |
|----------|----------|-------|
| Treaty flag operations | ~80% | Cascade logic mostly matches; minor bit differences (D-0046-1) |
| Attitude system | ~70% | Scale difference (0-100 vs -100 to +100) affects all thresholds |
| War declaration | ~75% | Per-continent formula matches; random factors simplified |
| Peace/ceasefire | ~50% | Missing senate override, GROVEL, random gold/tech demands |
| Alliance formation | ~60% | Missing third-party solidarity, fewer conditions |
| Tribute demands | ~55% | Different formula, different cooldown, missing alliance-specific caps |
| Tech valuation | ~65% | Different base formula, missing "over a barrel" bonus |
| Interactive negotiation | ~10% | Fundamentally different: one-shot vs interactive loop |
| Overall | **~55%** | The JS captures the spirit of binary diplomacy but uses significantly different formulas and is missing several negotiation mechanics |

### ai_process_civ_turn

| Category | Fidelity | Notes |
|----------|----------|-------|
| Phase ordering (P0-P8) | ~85% | JS labels and orders phases correctly |
| Anti-nuke (P0) | ~40% | Flag-only; no actual unit redirection |
| Era counting (P1) | ~70% | Core concept matches; JS adds its own thresholds |
| Data init / terraform (P2) | ~30% | Fundamentally different: binary inits arrays, JS counts terraform goals |
| Unit classification (P3) | ~50% | Role/domain classification matches; missing spy handling, per-continent counting deferred |
| City processing (P4) | ~60% | Goal types match; formulas and thresholds differ |
| Threat assessment (P5) | ~40% | Inverted scale, missing fortress readiness, landmass capacity, government modifier |
| Unit redistribution (P6) | ~35% | JS-specific phase; binary handles differently via goal matching |
| Goal matching (P7) | ~55% | Reverse iteration matches; scoring formula heavily simplified |
| City cleanup (P8) | ~25% | Fundamentally different purpose (flag clearing vs production hints) |
| Overall | **~50%** | The phase structure is faithfully ported, but the internal logic of each phase is significantly simplified or reimplemented |
