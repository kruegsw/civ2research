# Phase 6: 100% Binary Fidelity — Close Every Gap

## Context

Phase 5 ported the structural framework for all game systems (Phases A-J). However, an exhaustive audit reveals:

- **14 exported functions** written but never wired into the game loop
- **46 uses of `Math.random()`** where seeded PRNG is required for multiplayer determinism
- **The firepower system** is completely absent (binary has per-unit attack/defense FP)
- **~150KB of pseudocode** in PA (partially ported) functions with unfilled branches
- **~95 medium-priority functions** and **~65 low-priority functions** never touched
- **Duplicate implementations** causing drift risk (defense calc, bribe cost, year schedule)
- **Every AI file** has significant approximations vs the binary

This plan closes **every gap**, no matter how small. The target is exact behavioral match with Civ2 MGE.

**Key reference files**:
- `reverse_engineering/function_audit/phase2/pseudocode/block_*.md` — per-function pseudocode
- `reverse_engineering/function_audit/phase2/GAP_ANALYSIS.md` — gap inventory
- `reverse_engineering/function_audit/phase2/PORTING_STATUS.md` — per-function status

---

## Guiding Principles

1. **Binary-faithful, not "close enough."** Every formula, threshold, constant, and branch from the pseudocode must be present. No approximations, no "simplified" comments left behind.
2. **Seeded PRNG everywhere.** Every random decision must use the game's seeded PRNG for multiplayer determinism. Zero `Math.random()` calls in engine code.
3. **Eliminate duplicates.** One function for each calculation. No parallel implementations that can drift.
4. **Wire everything.** Every exported function must be imported and called by the game loop. Dead exports are bugs.
5. **Test after every wave.** Three seeds, three player counts. Investigate any behavioral change.

---

## ══════ PHASE A: Foundation — Wire Dead Code, Seeded PRNG, Dedup ══════

### A.1: Wire All Dead Exports

14 exported functions exist but are never called. Wire each one:

| Function | File | Wire Into |
|----------|------|-----------|
| `payBuildingUpkeep()` | cityturn.js | `processCityTurn()` orchestrator — call after production, before disorder check |
| `recalcSpaceshipStats()` | spaceship.js | reducer.js — call when SS part built (building 35/36/37 completed in `processCityProduction`) |
| `launchSpaceship()` | spaceship.js | reducer.js — add `LAUNCH_SPACESHIP` action case; AI calls it from prodai.js when ready |
| `calcCivScore()` | spaceship.js | `checkGameEndConditions()` — use for retirement winner selection; also export to client for score display |
| `executeTransaction()` | diplomacy.js | reducer.js — add `EXECUTE_TRADE` action case for diplomatic trades |
| `parseEvents()` | events.js | init.js — call during scenario loading when events text is present in .sav |
| `isSchismBlocked()` | events.js | citycapture.js `handleCivilWar()` — check before triggering civil war |
| `calcGotoDirection()` | pathfinding.js | reducer.js END_TURN GOTO processing — replace inline `findPath` + first-step extraction |
| `findRoadPath()` | pathfinding.js | reducer.js ESTABLISH_TRADE — validate trade route connectivity |
| `calcSpySuccessChance()` | espionage.js | reducer.js spy action cases — use for success roll instead of ad-hoc checks |
| `getAvailableProduction()` | buildcheck.js | public/js/city-ui.js — use for client production picker |
| `GOAL_BUILD_ROAD` | ai/goals.js | ai/cityai.js — use for road-building goal assignment |
| `GOAL_ESCORT`, `GOAL_TRANSPORT`, `GOAL_AIR_STRIKE` | ai/goals.js | ai/unitai.js — use for escort, transport, air targeting |

Also fix `processCityFood()` in cityturn.js — it is exported but `processCityTurn()` has duplicated inline logic. Refactor `processCityTurn()` to call `processCityFood()` instead of reimplementing.

### A.2: Replace All `Math.random()` with Seeded PRNG

**Pseudocode reference**: The binary uses a single global LCG PRNG (seed stored in save file).

Create `engine/rng.js`:
```js
export class SeededRNG {
  constructor(seed) { this.state = seed >>> 0; }
  next() { /* LCG matching binary: state = state * 214013 + 2531011 */ }
  nextInt(max) { /* return next() % max */ }
  nextFloat() { /* return next() / 2^32 */ }
}
```

Store RNG instance in `gameState.rng`. Replace every `Math.random()` call:

| File | Count | Locations |
|------|-------|-----------|
| reducer.js | ~28 | goodyHut, workerOrder, pollution, globalWarming, anarchy duration, barbarian spawning, combat trigger, nuke building destruction |
| espionage.js | ~4 | checkSpySurvival, spyCaughtCheck |
| events.js | ~2 | random trigger |
| init.js | ~3 | attitudes, starting techs |
| mapgen.js | ~1 | goody hut placement |
| citycapture.js | ~4 | gold plunder, tech theft, building destruction, partisan count |
| diplomacy.js | ~2 | reputation rolls |
| cityturn.js | ~2 | disorder, production |

Note: `combat.js` already uses a seeded PRNG — verify it uses the same game-state RNG, not a separate one.

### A.3: Eliminate Duplicate Implementations

| Duplicate | Keep | Remove/Redirect |
|-----------|------|-----------------|
| `calcBribeCost()` in rules.js AND `calcBribeCostEnhanced()` in espionage.js | espionage.js version (more complete) | rules.js: import from espionage.js |
| `calcInciteCost()` in rules.js AND `calcInciteCostEnhanced()` in espionage.js | espionage.js version | rules.js: import from espionage.js |
| Defense calculation inline in `resolveCombat()` AND `calcUnitDefenseStrength()` | `calcUnitDefenseStrength()` | `resolveCombat()`: call `calcUnitDefenseStrength()` instead of inline calc |
| `YEAR_SCHEDULE` in spaceship.js AND `getGameYear()` in year.js | year.js | spaceship.js: import from year.js |
| River bonus: multiplicative in `calcUnitDefenseStrength` vs additive in `resolveCombat` | Match binary (check pseudocode) | Unify to single formula |

### A.4: Add Missing `UNIT_HP` Usage

**Pseudocode**: FUN_0057e2c3 `calc_unit_hit_points` — per-unit HP from RULES.TXT.

Currently nearly all code assumes HP=10. Fix:
- `resolveCombat()` in combat.js: use `UNIT_HP[attacker.type]` and `UNIT_HP[defender.type]`
- `calcStackBestDefender()`: weight by actual HP
- Espionage cost formulas: use actual HP for damage scaling
- Reducer unit creation: set `unit.hp = UNIT_HP[type]`
- Healing in END_TURN: heal toward `UNIT_HP[type]`, not hardcoded 10

Verify `UNIT_HP` table in defs.js is complete and correct vs RULES.TXT.

---

## ══════ PHASE B: Firepower System ══════

### B.1: Add Firepower to Combat

**Pseudocode**: FUN_00580341 `resolve_combat` — the binary's combat loop uses separate `attackerFP` and `defenderFP` values.

**What firepower does**: Each combat round, the loser takes `enemyFP` HP of damage (not always 1). This dramatically changes certain unit matchups.

Add to `engine/defs.js`:
- `UNIT_ATTACK_FP[typeId]` — attack firepower per unit type (most are 1; Artillery/Howitzer are higher)
- `UNIT_DEFENSE_FP[typeId]` — defense firepower per unit type

Modify `resolveCombat()` in combat.js:
- Replace `hp -= 1` with `hp -= enemyFP`
- City Walls: defender firepower = 1 (reduces damage taken)
- Amphibious attack: defender firepower doubled
- Air vs Land: attacker FP capped at 2 (FUN_00580341 lines ~200-210)
- Catapult/Cannon/Artillery: always FP=1 when defending
- Helicopter vs fighter: defender FP * 2

### B.2: Firepower in Defense Strength

Modify `calcUnitDefenseStrength()` to also return effective FP, so `calcStackBestDefender()` can factor it into defender selection.

---

## ══════ PHASE C: Movement System ══════

### C.1: Damage-Based Movement Reduction

**Pseudocode**: FUN_005b2f90 `calc_unit_movement_points` (block_005B0000)

- Base MP = `UNIT_MOVE_POINTS[type]`
- If damaged: `effectiveMP = baseMP * currentHP / maxHP`, rounded up to minimum 1
- COSMIC rounding rules (check pseudocode for exact formula)
- Minimum movement floor: every unit gets at least 1 MP even if badly damaged

Add `calcEffectiveMovementPoints(unit)` to `engine/movement.js`. Use it everywhere MP is checked:
- reducer.js MOVE_UNIT
- pathfinding.js cost calculations
- AI unit evaluation

### C.2: Trireme Sinking

**Pseudocode**: FUN_0059062c `move_unit` — trireme END_TURN check

- At end of turn, if Trireme (type 32) is NOT adjacent to land AND civ does NOT have Astronomy tech AND NOT Lighthouse wonder: 50% chance of sinking
- Magellan's Expedition wonder: Triremes never sink
- If sinking: destroy unit, emit event

Add `checkTriremeSinking(unit, state, mapBase, rng)` to movement.js. Call from reducer.js END_TURN after unit processing.

### C.3: Air Unit Fuel System

**Pseudocode**: FUN_0059062c — air unit fuel tracking

- Air units (domain 2) have a fuel counter = `UNIT_MOVE_POINTS[type] / 2` turns of flight
- Each turn in flight: decrement fuel
- If fuel reaches 0 and unit is NOT in a city or on a carrier: unit crashes (destroyed)
- Landing in a city or on a carrier: reset fuel
- Airport building: allows refueling

Add `unit.fuel` field. Track in reducer.js END_TURN. Add `checkAirFuel(unit, state)` to movement.js.

### C.4: Transport Boarding/Disembarkation

**Pseudocode**: FUN_0059062c — transport boarding

- Land unit on coast tile with friendly transport on adjacent ocean tile: can board (costs 1 MP)
- Disembarkation from transport to land tile: costs all remaining MP
- Embarked units stored as `unit.transportedBy = transportUnitIndex`

Modify reducer.js MOVE_UNIT to handle:
- Land unit moving to ocean tile with transport → board
- Land unit on transport moving to land tile → disembark
- Update transport cargo tracking

### C.5: Full Movement Cost Table

**Pseudocode**: FUN_005b2f90 and movement cost tables in block_005B0000

Verify/fix `moveCost()` in movement.js:
- Road: 1/3 MP (movement multiplier / 3)
- Railroad: 0 MP
- River crossing: +1 MP (unless bridge from Engineering tech)
- Alpine Troops: ignore terrain costs in hills/mountains
- Domain-specific: sea units can enter coastal city tiles

---

## ══════ PHASE D: City Turn Completeness ══════

### D.1: Pollution and Nuclear Meltdown

**Pseudocode**: FUN_004efd44 `process_city_pollution_and_meltdown` (block_004E0000)

Add `processCityPollution(city, cityIndex, state, mapBase, rng)` to cityturn.js:
- Pollution chance = `(population + factories/powerplants) / 2` (check exact formula)
- If pollution triggered: add pollution to a random tile in city radius
- **Nuclear meltdown**: if city has Nuclear Plant (building 21) and no Solar Plant: small chance of meltdown
  - Meltdown: city size halved, pollution on 9 tiles (like mini-nuke), Nuclear Plant destroyed
- Recycling Center (building 18): halves pollution chance
- Mass Transit (building 13): eliminates population component

Call from `processCityTurn()` after production.

### D.2: WLTKD Production Bonus

**Pseudocode**: FUN_004f0a9c — WLTKD (We Love the King Day) effects

During WLTKD:
- Republic/Democracy: city grows each turn (even without food surplus)
- All governments: +1 trade per worked tile
- Trade bonus from WLTKD is currently **missing** — add to `calcCityYields()` in production.js

### D.3: Disorder Production Freeze

**Pseudocode**: FUN_004ef578 — civil disorder effects

During disorder:
- Shields produced = 0 (no production)
- Food surplus can still cause famine
- Trade still collected (but no luxuries → disorder continues)

Fix `processCityProduction()` in cityturn.js: skip shield accumulation during disorder.

### D.4: Wire `payBuildingUpkeep()` Properly

Move from per-civ upkeep in reducer.js to per-city in `processCityTurn()`:
- Call `payBuildingUpkeep(cityIndex, state)` inside the orchestrator
- Adam Smith's Trading Co (wonder 17): improvements with maintenance ≤1 are free
- Anarchy: no maintenance (already handled)
- Bankruptcy auto-sell: sell cheapest building in this city (not global cheapest)

### D.5: Trade Route Ongoing Income

**Pseudocode**: FUN_004eb327 `calc_trade_route_income` (block_004E0000)

Trade routes generate ongoing gold per turn (not just one-time bonus). Add to `calcCityYields()` in production.js:
- Each trade route contributes: `(cityA.tradeBase + cityB.tradeBase + distance) / 8`
- Demand bonus if commodity matches demand
- Railroad connection: +50%
- Same continent: halved
- Foreign civ: +50%

Store active trade routes in `city.tradeRoutes[]` with partner city and commodity.

### D.6: Caravan Commodity Matching

**Pseudocode**: FUN_00440750 `process_caravan_arrival` (block_00440000)

Replace simplified ESTABLISH_TRADE income in reducer.js with full formula:
- One-time bonus: `(supply + demand) * distanceFactor * eraFactor`
- Supply: commodity is in city's supply list (based on terrain)
- Demand: commodity is in target city's demand list
- Era factor: pre-Industrial = ×2, Industrial = ×1.5, Modern = ×1
- Tech discounts: Economics tech = −33%, Trade tech = −33%
- Food caravan: delivers food to city instead of gold (if city has Harbour/Granary)
- Establish ongoing trade route (D.5)

### D.7: Production Change Penalty

**Pseudocode**: FUN_00441b11 `change_city_production` (block_00440000)

When switching production:
- Unit → different unit: lose 50% of accumulated shields
- Building → different building: lose 50%
- Unit ↔ building: lose 100% (all shields)
- Same category: no penalty
- Wonder switching events: STARTWONDER, SWITCHWONDER, ABANDONWONDER

Fix CHANGE_PRODUCTION in reducer.js.

### D.8: Caravans Help Wonder Production

**Pseudocode**: FUN_004ec3fe — caravan/freight in city with wonder in production

When a Caravan/Freight unit is in a city that's building a wonder:
- Player can choose to add the caravan's shield value (50 shields) to the wonder
- This is a separate action (CARAVAN_HELP_WONDER or integrate into ESTABLISH_TRADE)

---

## ══════ PHASE E: Yields, Corruption, and Multipliers ══════

### E.1: Railroad Shield Bonus

**Pseudocode**: FUN_004e868f — tile yield with improvements

Tiles with railroad get +50% shields (after all other bonuses). Fix in production.js `calcTileShields()`.

### E.2: Farmland

**Pseudocode**: FUN_004e868f — farmland = irrigation + supermarket

Tile with both irrigation AND Supermarket building: +50% food. This is "farmland". Fix in production.js `calcTileFood()`.

### E.3: Factory/Mfg Plant/Power Plant Multipliers

**Pseudocode**: FUN_004e9c14 — city production with building multipliers

Verify production.js applies these correctly:
- Factory (15): +50% shields
- Mfg Plant (16): +50% shields (stacks with Factory = +100%)
- Power Plant (19) / Hydro (20) / Nuclear (21) / Solar (29): +50% shields (requires Factory)
- Total with Factory + MfgPlant + PowerPlant: +150% shields

### E.4: Full Corruption and Waste Formula

**Pseudocode**: FUN_004e7967 `calc_capital_distance_and_corruption` (block_004E0000)

Replace simplified corruption in production.js:
- Distance to capital (in tiles)
- Courthouse (building 7): −50% corruption
- Democracy: low corruption
- Communism: flat corruption (distance doesn't matter, capped at ~30%)
- Anarchy: maximum corruption
- Trade route income: also subject to corruption

### E.5: Despotism/Tribal Penalty

**Pseudocode**: FUN_004e868f — government yield penalties

Under Despotism/Tribal Government:
- Any tile producing ≥3 of food/shields/trade: −1 to that yield
- This penalty is per resource type, per tile
- Verify production.js applies this correctly for all three yield types

### E.6: Colosseum Luxury Bonus

**Pseudocode**: FUN_004ea8e4 — happiness, Colosseum effect

Colosseum (building 14): makes 3 unhappy citizens content (not just 1 as may be currently implemented). Verify in happiness.js.

---

## ══════ PHASE F: Happiness and Wonder Effects ══════

### F.1: Missing Wonder Effects

Audit every wonder in `WONDER_EFFECTS` (defs.js) against the pseudocode. Fix missing effects:

| Wonder | ID | Missing Effect |
|--------|-----|----------------|
| Hanging Gardens | 1 | +1 content citizen per city (all cities) |
| Women's Suffrage | 21 | Reduce unhappiness from military units away from home by 1 per unit |
| Shakespeare's Theatre | 13 | All unhappy citizens in THAT CITY become content |
| Cure for Cancer | 27 | +1 happy citizen per city (all cities) |
| Michelangelo's Chapel | 10 | Cathedral effect in every city (3→4 unhappy made content) |
| J.S. Bach's Cathedral | 15 | −2 unhappy citizens per city on same continent |

Verify each in happiness.js `calcHappiness()` and fix any missing or incorrect effects.

### F.2: Senate War Veto

**Pseudocode**: FUN_00579ed0 `diplomacy_check_attack_allowed` (block_00570000)

Under Republic/Democracy:
- Senate can refuse war declarations
- Player must be at war with another civ already, or enemy units must be on your territory
- Statue of Liberty wonder: overrides senate
- UN wonder: may force peace

Add senate check to reducer.js DECLARE_WAR and MOVE_UNIT (attacking neutral units).

### F.3: WLTKD Trigger and Cancellation

**Pseudocode**: FUN_004bee56 — WLTKD conditions

WLTKD activates when: `happy citizens > unhappy citizens + content citizens / 2` (check exact threshold in pseudocode). Cancels when condition no longer met. Triggers on specific tech (Electronics). Verify in happiness.js.

---

## ══════ PHASE G: Diplomacy Completeness ══════

### G.1: Treaty Expiration Timers

**Pseudocode**: FUN_00560084 — periodic flag clearing

- Ceasefire expires after 16 turns → reverts to no-treaty
- Peace treaty: permanent until broken
- Alliance: permanent until broken
- Track `treatyTurn` in diplomacy state. Check in END_TURN.

### G.2: Military Withdrawal Clause

**Pseudocode**: FUN_0045a6ab — peace treaty condition

When signing peace: units in enemy territory must withdraw within 2 turns or treaty auto-breaks. Track with withdrawal timer.

### G.3: Alliance Shared Visibility

**Pseudocode**: FUN_0045a535 — form_alliance

On alliance formation:
- Share full map visibility
- Auto-establish embassy both ways
- Update each turn (allied civs see what each other sees)

### G.4: Full `executeTransaction()` Implementation

Current version is missing:
- Tech transfer (add techs to receiver's set via `grantAdvance`)
- Unit transfer (change `unit.owner`)
- "Demand withdraw troops" transaction type
- Validation (can't give tech you don't have, etc.)

### G.5: Reputation System

**Pseudocode**: FUN_0045ac71 — reputation tracking

Track per-civ reputation:
- Breaking ceasefire: −20 reputation
- Breaking peace: −40 reputation
- Breaking alliance: −60 reputation
- Sneak attack: −80 reputation
- Reputation decays +1 per 16 turns
- Low reputation makes other civs refuse treaties

Store `state.players[civSlot].reputation` (0-100, starts at 100).

---

## ══════ PHASE H: Visibility, Map, and Territory ══════

### H.1: Terrain-Based Line of Sight

**Pseudocode**: FUN_004274a6 — visibility with terrain elevation

- Hills: +1 visibility range (see 2 tiles)
- Mountains: +2 visibility range (see 3 tiles)
- Watchtower/Fortress: +1 visibility range
- Currently `computeLOS()` uses flat radius — fix to use terrain elevation

### H.2: Remembered Terrain (Fog of War)

**Pseudocode**: Binary stores "last seen" tile state per civ

- When a tile leaves LOS: client should show the last-known state (terrain, improvements, city)
- When tile re-enters LOS: update to current state
- Currently `filterStateForCiv()` sends full current data for explored tiles — should send stale snapshot for explored-but-not-visible tiles

### H.3: Submarine Detection

**Pseudocode**: FUN_005b8dec area — submarine visibility

Fix `isSubDetected()` in visibility.js:
- Adjacent destroyer-class ships: always detect
- Adjacent city: always detect
- Adjacent other naval units: do NOT detect (only destroyers)
- Sonar tech: all naval units detect adjacent subs

### H.4: Territory Claim on City Founding

**Pseudocode**: FUN_0043f8b0 `create_city` — BUILD_CITY territory

When founding a city:
- Claim ownership of all tiles within city radius (21 tiles)
- Ocean tiles adjacent to city: also claimed
- Update `tile.owner` for each claimed tile

Fix BUILD_CITY in reducer.js.

### H.5: Sentry Wake on Enemy Movement

**Pseudocode**: FUN_004274a6 — visibility during movement

When a unit moves: check all adjacent tiles for enemy sentried units. Wake any sentried unit that can now see the moving unit.

---

## ══════ PHASE I: Barbarians and Goody Huts ══════

### I.1: Era-Based Barbarian Types

**Pseudocode**: FUN_00485c15 `spawn_barbarians` (block_00480000)

- Before 1000 BC: only Warriors/Horsemen
- 1000 BC – 1 AD: add Archers, Chariots
- 1 AD – 1500 AD: add Legion, Pikemen, Knights
- After 1500 AD: add Musketeers, Dragoons, Cannon
- Barbarian leader units: carry gold ransom (already partially done)
- Camp spawn frequency: every 32 turns on higher difficulties (not 64)
- Territory suppression: no barbarian camps in tiles owned by civs

### I.2: Naval Barbarians

**Pseudocode**: FUN_005351AA — barbarian naval AI

- Scuttle weak ships (HP − stackSize < 2)
- 30-turn fuel timeout: barbarian ships destroyed after 30 turns at sea
- Coastal city founding with human-proximity check
- Unit loading/unloading from ships

### I.3: Full Goody Hut Outcomes

**Pseudocode**: FUN_0058f040 `process_goody_hut` (block_00580000)

Replace simplified `resolveGoodyHut()` in reducer.js with full outcome table:
- Outcome 0: Advanced Tribe (found city with some buildings)
- Outcome 1: Mercenary unit (friendly unit joins)
- Outcome 2: Gold (25–100g scaled by era)
- Outcome 3: Technology (random no-prereq tech the civ doesn't have)
- Outcome 4: Map reveal (reveal area around hut)
- Outcome 5: Settler (free settler unit)
- Outcome 6: Barbarian uprising (spawn 4–8 hostile barbarians)
- Difficulty-based probability weights (Chieftain: more gold/tech, Deity: more barbarians)
- Late-game: barbarian buildings in tribe cities
- Territory check: if hut is in civ's territory, no barbarian uprising

---

## ══════ PHASE J: Espionage Completion ══════

### J.1: Spy Success/Detection Unification

**Pseudocode**: FUN_004c6e6d `spy_enters_city` (block_004C0000)

The binary has a unified entry point for all spy operations:
1. Roll for detection (based on `calcSpySuccessChance`)
2. If detected → spy killed, diplomatic incident
3. If not detected → execute operation
4. Courthouse halves success chance
5. Police Station halves again
6. Counterspy (defending spy in city): bonus detection chance

Wire `calcSpySuccessChance()` from espionage.js into every spy action in reducer.js. Currently spy actions have ad-hoc survival checks.

### J.2: Targeted Tech Theft

**Pseudocode**: FUN_0057a27a — spy steal tech (type 47 only)

Spies (type 47, not diplomats type 46) can choose WHICH tech to steal. Diplomats get a random tech. Fix STEAL_TECH in reducer.js:
- Diplomat: random tech from those the target has and attacker doesn't
- Spy: let player choose (add tech selection to action payload)

### J.3: Subvert City vs Incite Revolt

**Pseudocode**: FUN_004c6bf5 — two separate operations

- Incite Revolt: pay gold to flip city (current INCITE_REVOLT)
- Subvert City: spy-only operation, costs more but also gives buildings and units intact
- Add `SPY_SUBVERT_CITY` action

### J.4: Events System Trigger Completeness

Fix trigger matching in events.js:
- `EVENT_NO_CITIES`: check if specific civ has 0 cities (currently always returns true)
- `EVENT_CITY_PRODUCTION`: check if city is producing specific item
- `EVENT_NEGOTIATION`: match during diplomacy with specific civs
- `HAS_TECH` condition: check if civ has specific tech
- `%STRING` substitution in TEXT actions

### J.5: Events Action Completeness

Fix missing event actions:
- `TRANSPORT`: block negotiation with specific civs
- `DONTPLAYWONDERS`: disable wonder movies (no-op for us, but parse it)
- `MOVEUNIT` with city-name variant: teleport unit to named city

---

## ══════ PHASE K: Spaceship and Victory ══════

### K.1: Spaceship Mass/Stats Tables

**Pseudocode**: FUN_00596eec — detailed stats

Replace simplified mass calculation with binary's 6-entry weight table per part type:
- Structural: 800 tons each
- Component (propulsion): 400 tons each
- Component (fuel): 600 tons each
- Module (habitation): 1000 tons each
- Module (life support): 800 tons each
- Module (solar panel): 800 tons each

Fix success probability multi-factor calculation (fuel ratio, energy ratio, flight penalty).

### K.2: Spaceship Launch Wiring

Add `LAUNCH_SPACESHIP` action to actions.js, rules.js validation, and reducer.js case:
- Validation: at least 1 structural + 1 component + 1 module
- Call `launchSpaceship()` from spaceship.js
- Emit events
- AI: call from prodai.js when SS complete

### K.3: Score Formula Fix

**Pseudocode**: FUN_004a28b0 — exact score calculation

Fix `calcCivScore()`:
- Population: sum of all city populations using Civ2 population formula (`citySize * 10000 * (citySize + 1)`)
- Wonders: 20 points each (owned, not obsolete)
- Future techs: 5 points per level
- Peace bonus: 3 points per consecutive turn of peace
- Technology: 2 points per tech discovered
- Map exploration: `(exploredTiles / totalTiles) * 300`
- Spaceship: year-factor-based calculation

### K.4: Game End Year 2000 Warning

**Pseudocode**: FUN_0048aedc — year 2000 and 2020

- Year 2000 AD: warning event (game continues)
- Year 2020 AD: forced retirement, highest score wins

---

## ══════ PHASE L: AI Data Infrastructure ══════

### L.1: Per-Continent Attack Strength

**Pseudocode**: DAT_0064c8b2 — ai_process_civ_turn Phase 4

Add to `computeAiData()` in data.js:
- `continentAttackStrength[civ][continent]` — sum of `UNIT_ATK[type]` for all units, not just unit count
- `continentCityPop[civ][continent]` — sum of city sizes per continent
- `continentFlags[civ][continent]` — bitfield: enemy_cities(1), enemy_military(2), at_peace_cities(4), at_peace_military(8), strong_threat(0x10)

### L.2: Additional Data Fields

Add to `computeAiData()`:
- `unitTypeCounts[civ][type]` — count of each unit type per civ (0-61)
- `continentSettlerCount[civ][continent]` — settler/engineer counts per continent
- `navalUnitCount[civ]` — dedicated naval counter
- `totalPopulation[civ]` — sum of all city sizes
- `eraQuarters[civ][0-3]` — tech count per era quarter (28 base techs, 7 per quarter)
- `city.tradeSurplus` — compute actual trade surplus instead of using city.size as proxy
- `city.netFoodSurplus` — compute actual net food surplus

### L.3: Goal List Completeness

**Pseudocode**: FUN_00493602 `ai_decay_and_merge_goals`

Fix GoalList in goals.js:
- `decayGoals()` must MERGE List B goals into List A during decay (not just age/remove)
- Add `negateGoalPriority(type, gx, gy)` — negate priority for cancel-without-remove
- Add `removeGoalsNear(gx, gy, distance)` — remove all goals within radius
- Add `findMaxGoalPriority(criteria)` — find highest priority matching goal
- Add `clearStrategicGoals()` — clear all List B for a civ

### L.4: Embassy and Flag Tracking

Replace wonder-based approximations in strategyai.js:
- Track `state.players[civA].embassy[civB]` (boolean per pair)
- Track `state.players[civA].provocation[civB]` — nuke talk, border intrusion flags
- Use these in diplomacy evaluation instead of guessing from wonders

---

## ══════ PHASE M: AI Unit Master ══════

### M.1: Damage Assessment and Retreat

**Pseudocode**: FUN_00538A29 — damage level branches

Add to unitai.js:
- Damage levels: 0=healthy (>75%), 1=scratched (50-75%), 2=wounded (25-50%), 3=critical (<25%)
- Per-role retreat thresholds: attackers retreat at level 2, defenders hold until level 3
- Wounded units: return to nearest city for healing
- Critical units near city: disband for shield recovery

### M.2: Diplomatic Encounter

**Pseudocode**: FUN_00538A29 — diplomatic encounter trigger

When AI unit moves to tile with enemy unit:
- If at peace/ceasefire: trigger diplomacy (PROPOSE_TREATY or demand tribute)
- If enemy is diplomat/spy: auto-capture (no combat)
- If enemy settler/caravan: auto-capture (no combat for barbarians)

### M.3: Settler Decision Tree

**Pseudocode**: FUN_0053184D Phase 3 — settler terraform-vs-found classification

Full settler AI:
- `maxSettlersPerCity` based on difficulty: Chieftain=4, Warlord=3, Prince=3, King=2, Emperor=2, Deity=2
- `desiredSettlers = (maxPerCity/2 - expansionism - 1 + cityCount) / maxPerCity`
- If more settlers than desired: terraform (irrigate/mine/road)
- If fewer: found new city
- Engineer bonus: +1 to terraform side
- Home city expand flag (attribs & 0x40): settler is specifically for founding
- City-join: if continent overpopulated (`continentSize/8 < cityCounts`), join small city (<10 pop)

### M.4: Full Terraform Decision

**Pseudocode**: FUN_00538A29 — settler terraform evaluation

Replace simplified `getWorkerOrder()` in cityai.js:
- Irrigation priority based on terrain food yield (desert/plains first)
- Road priority based on trade potential and city connectivity
- Mine only on hills/mountains with existing road
- Fortress at narrow passages (scan for NS/EW ocean adjacency chokepoints)
- Airbase near enemy territory for air unit projection
- Railroad: only on tiles already roaded, after Engineering tech

### M.5: Transport Coordination

**Pseudocode**: FUN_00531653 `ai_set_goto_via_coast`

Full transport AI:
- `aiSetGotoViaCoast()`: find coastal tile on same continent with ocean access to target continent
- Stack-based loading: load multiple units onto transport
- Coordinated assault: transport waits until full before departing
- Unloading priority: near enemy city, prefer defensible tile

### M.6: Air Unit AI Completion

**Pseudocode**: FUN_00536C4C and FUN_005369F3

- Nuclear targeting: evaluate cities by `(size + buildings + wonders) / (1 + hasSDI * 10)`, penalize SDI-protected cities
- Air intercept / scramble: `ai_alert_nearby_units()` — redirect fighters to threatened cities within half-range
- Carrier operations: air units return to carrier when fuel low
- Rebase to forward cities as front line moves

---

## ══════ PHASE N: AI Production ══════

### N.1: Per-City Computed Fields

Replace all `city.size` proxies in prodai.js with actual values:
- Compute `city.tradeSurplus` from `calcCityYields()`
- Compute `city.netFoodSurplus` from `calcGrossFood() - city.size * 2`
- Compute `city.shieldProduction` from `calcGrossShields()`
- Store these in AI data for scoring access

### N.2: CITYPREF.TXT Overrides

**Pseudocode**: FUN_00498d40 `load_city_preferences`

Load CITYPREF.TXT (or embedded default) for AI city build overrides:
- AUTOBUILD list: any listed building that can be built is chosen immediately
- NODEFEND flag: skip defensive buildings
- This is a simple text file with per-building flags

### N.3: Wonder Competition

**Pseudocode**: FUN_00498e8b — wonder race detection

Track what wonder each rival civ is building (`DAT_0064b1e2`):
- If rival has more shields invested: lower wonder score (concede)
- If we're ahead: boost wonder score (race to finish)
- If rival completes it: auto-switch (already done in cityturn.js)

### N.4: Exact Spaceship Component Ratios

**Pseudocode**: SS requires 10 structural, 4 component, 3 module

Fix spaceship production scoring:
- `structurals needed = 10 - built`
- `components needed = 4 - built`
- `modules needed = 3 - built`
- Build in order: structural first, then components, then modules
- Check exact maximums from `spaceship_get_max_component`

### N.5: Obsolete Building Auto-Sell

Expand `generateSellObsoleteActions()` in prodai.js:
- Sell Barracks when civ has Mobile Warfare (Port Facility replaces it for sea units)
- Sell City Walls when Great Wall is active
- Sell Granary when Pyramids is active (only if Pyramids not obsoleted)
- Sell any building whose benefit is zero (e.g., Temple in city with all-happy citizens)

---

## ══════ PHASE O: AI Diplomacy ══════

### O.1: Full Negotiation State Machine

**Pseudocode**: FUN_00460129 `ai_diplomacy_negotiate` (16,263B) + FUN_0045b4da `diplo_ai_negotiate` (10,271B)

This is the largest AI gap. Implement the full negotiation protocol:
- Greeting evaluation (hostile/guarded/neutral/friendly based on attitude)
- Demand evaluation: accept if attitude > threshold (tech, gold, map)
- Counter-offer logic: if reject, propose alternative
- Tech valuation: techs valued by prereq chain depth × military/economic utility
- City valuation: city.size × improvements × strategic position
- Gold valuation: scaled by treasury ratio
- Treaty evaluation: alliance if attitude > 74, peace if > 50, ceasefire if > 26

### O.2: AI Tech Exchange

**Pseudocode**: FUN_0055d1e2 `ai_tech_exchange` (1,182B)

AI-to-AI tech trading:
- Evaluate mutual benefit
- "Superior civ" blocking: if strongest human has power rank ≥5 and more techs, block AI-AI trading
- Alliance-based tech tribute: allies share techs freely
- One tech per exchange

### O.3: Alliance/Crusade Proposals

**Pseudocode**: FUN_00562021 `ai_propose_alliance_or_crusade` (2,292B)

"HELPME" alliance formation:
- AI offers gold + techs for alliance against mutual enemy
- Crusade: multiple civs allied against dominant civ
- Evaluate: strength of target vs combined alliance strength

### O.4: Full `ai_diplomacy_turn_processing`

**Pseudocode**: FUN_00560084 (3,345B) — the per-turn orchestrator

Currently missing:
- Government management during anarchy (set_government calls)
- AI random seed roll (`rand() % 100` per turn for stochastic decisions)
- Patience decrement (every 3rd turn)
- Alliance violation detection (flag 0x20) and war declaration
- WARENDS event with visibility checks
- 32-turn / 16-turn / 8-turn periodic flag clearing
- MP-specific distinction

### O.5: Full `ai_evaluate_diplomacy_toward_human`

**Pseudocode**: FUN_00560d95 (4,728B) — attitude scoring

The detailed multi-factor attitude evaluation:
- Border intrusion detection (NEARCITY, INTRUDER, VIOLATOR events)
- Unit withdrawal mechanics
- Senate scandal for espionage
- Spaceship status checks (racing → hostile)
- Alliance strength calculation
- Wonder effects on attitude
- Personality modifiers (militarism, expansionism)

---

## ══════ PHASE P: AI Orchestrator ══════

### P.1: Full `ai_process_civ_turn` Port

**Pseudocode**: FUN_0053184D (14,665B) — the master AI function

Port all 8 phases faithfully:
- Phase 0: Anti-nuke defense (teleport nuclear units to cover enemy cities)
- Phase 1: Era quarter counting (tech progression tracking)
- Phase 2: Terraform goal counting per continent
- Phase 3: Unit classification (settler terraform-vs-found, attrib flags, stale GOTO cancel, ZOC AI_WAIT)
- Phase 4: City processing (per-continent pop, wonder counting, defense goals, attack goals with wall detection)
- Phase 5: Continent threat assessment (5-level system: hostile/contested/frontier/expansion/safe)
- Phase 6: Unit redistribution (move units from safe to threatened continents)
- Phase 7: Unit-to-goal matching (reverse-iterate with distance weighting, priority scaling)
- Phase 8: City cleanup (peace flag clearing, production goal computation)

### P.2: Unit-to-Goal Matching Algorithm

**Pseudocode**: Phase 7 of FUN_0053184D

The core matching:
- Reverse-iterate all units (last unit first)
- For each unit: find best matching goal by `priority / (distance + 1)`
- Assign unit to goal
- If unit already has GOTO to goal location: skip
- Fortified unit threshold: only reassign if new goal priority > current * 1.5

---

## ══════ PHASE Q: Research and Init ══════

### Q.1: AI Research Cost Catch-Up

**Pseudocode**: FUN_004c2788 — AI cost formula

Binary gives AI different research costs:
- `aiCost = baseCost * (14 - difficultyLevel) / 10`
- Chieftain AI: ×1.4 cost (slower)
- Deity AI: ×0.8 cost (faster)
- Also: number-of-civs modifier, world size factor

Fix `calcResearchCost()` in research.js.

### Q.2: Tech Leak / Great Library

**Pseudocode**: FUN_004bf05b — free tech acquisition

- If 2+ other civs already know a tech: civ gets it for free next turn (even without Great Library)
- Great Library: get tech immediately when any 2 other civs have it
- Track `state.techDiscoveredBitmask[techId]` — count of civs who know it

### Q.3: Starting Tech Randomization

**Pseudocode**: FUN_004a7ce9 — new_civ starting techs

Fix `createNewCiv()` in init.js:
- Don't use a fixed list per difficulty
- Randomly select from no-prereq tech pool using seeded PRNG
- Higher difficulty = fewer starting techs
- Ensure all civs get the same number of techs per difficulty level

### Q.4: Scenario Initialization

**Pseudocode**: FUN_004a9785 `setup_scenario_start` (3,059B)

When loading a scenario:
- Parse custom rules (RULES.TXT overrides)
- Parse events (@EVENTS section) — call `parseEvents()` from events.js
- Apply scenario-specific tech restrictions
- Apply custom map settings

---

## New Files to Create

| File | Phase | Purpose | Est. Lines |
|------|-------|---------|------------|
| `engine/rng.js` | A.2 | Seeded PRNG matching binary's LCG | ~50 |

## Existing Files to Modify

| File | Phases | Key Changes |
|------|--------|-------------|
| `engine/reducer.js` | A.1, A.2, C.2-C.4, D.6-D.8, F.2, G.1, H.4-H.5, I.3, J.1-J.3, K.2 | Wire dead exports, seeded PRNG, movement rules, trade/production, senate veto, territory, goody huts, spy unification, spaceship launch |
| `engine/combat.js` | A.3-A.4, B.1-B.2 | FP system, per-unit HP, dedup defense calc |
| `engine/cityturn.js` | A.1, D.1-D.4 | Wire payBuildingUpkeep, pollution/meltdown, disorder freeze, WLTKD |
| `engine/production.js` | D.2, D.5, E.1-E.5 | WLTKD trade bonus, trade route income, railroad, farmland, corruption, multipliers |
| `engine/happiness.js` | E.6, F.1, F.3 | Missing wonder effects, Colosseum, WLTKD |
| `engine/movement.js` | C.1, C.5 | Damage-based MP, railroad 0-cost, full cost table |
| `engine/pathfinding.js` | C.3 | Air fuel range limits |
| `engine/diplomacy.js` | G.1-G.5 | Treaty timers, withdrawal, shared visibility, reputation |
| `engine/espionage.js` | A.2, J.1-J.3 | Seeded PRNG, unified detection, subvert city |
| `engine/events.js` | J.4-J.5 | Trigger completeness, action completeness |
| `engine/spaceship.js` | K.1, K.3-K.4 | Mass tables, score formula, year warnings |
| `engine/research.js` | Q.1-Q.2 | AI catch-up, tech leak |
| `engine/visibility.js` | H.1-H.3, H.5 | Terrain LOS, remembered terrain, sub detection, sentry wake |
| `engine/init.js` | Q.3-Q.4 | Starting tech randomization, scenario init |
| `engine/rules.js` | A.3, F.2 | Dedup bribe/incite, senate veto, BOMBARD range |
| `engine/defs.js` | B.1 | UNIT_ATTACK_FP, UNIT_DEFENSE_FP tables |
| `engine/year.js` | K.4 | Scenario custom year schedules |
| `engine/ai/data.js` | L.1-L.2, L.4 | Per-continent stats, unit counts, embassy tracking |
| `engine/ai/goals.js` | L.3 | Goal merge, negate, removeNear, findMax |
| `engine/ai/index.js` | P.1-P.2 | Full 8-phase orchestrator, unit-to-goal matching |
| `engine/ai/unitai.js` | M.1-M.6 | Damage/retreat, diplomatic encounter, settler, transport, air |
| `engine/ai/prodai.js` | N.1-N.5 | Per-city fields, CITYPREF, wonder competition, SS ratios, obsolete sell |
| `engine/ai/diplomai.js` | O.1-O.5 | Negotiation state machine, tech exchange, alliance proposals |
| `engine/ai/cityai.js` | M.3-M.4 | Settler decision tree, terraform decisions |
| `engine/ai/strategyai.js` | L.4 | Replace wonder-based approximations with flags |
| `engine/ai/econai.js` | Q.1 | AI research cost integration |
| `engine/ai/barbarian.js` | I.1-I.2 | Era types, naval barbarians |

---

## Execution Schedule

### Wave 1: Foundation (3 agents in parallel)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | Seeded PRNG + wire dead exports | A.1, A.2, A.3 |
| 2 | Firepower system + per-unit HP | A.4, B.1, B.2 |
| 3 | Movement system: damage MP, trireme, air fuel, transport, cost table | C.1, C.2, C.3, C.4, C.5 |

### Wave 2: City Turn + Yields (2 agents)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | City turn: pollution, WLTKD, disorder, upkeep, trade routes, caravan matching | D.1-D.8 |
| 2 | Yields: railroad, farmland, multipliers, corruption, despotism, Colosseum | E.1-E.6 |

### Wave 3: Happiness + Diplomacy + Visibility (3 agents)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | Wonder effects, senate veto, WLTKD trigger | F.1-F.3 |
| 2 | Diplomacy: timers, withdrawal, visibility, transactions, reputation | G.1-G.5 |
| 3 | Visibility + territory + barbarians + goody huts | H.1-H.5, I.1-I.3 |

### Wave 4: Espionage + Spaceship + Research (2 agents)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | Espionage completion + events completion | J.1-J.5 |
| 2 | Spaceship + victory + research + init | K.1-K.4, Q.1-Q.4 |

### Wave 5: AI Data + Goals + Unit AI (3 agents)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | AI data infrastructure + goals + strategy | L.1-L.4 |
| 2 | AI unit master: damage, retreat, settler, terraform, transport | M.1-M.5 |
| 3 | AI air + AI production: nuclear, intercept, per-city fields, CITYPREF, wonders | M.6, N.1-N.5 |

### Wave 6: AI Diplomacy + Orchestrator (2 agents)

| Agent | Scope | Phases |
|-------|-------|--------|
| 1 | AI diplomacy: negotiation, tech exchange, alliance, turn processing | O.1-O.5 |
| 2 | AI orchestrator: full 8-phase process_civ_turn, unit-to-goal matching | P.1-P.2 |

**Total: 15 agents across 6 waves**

---

## Verification

### After Each Wave
```bash
node tools/simulate.js --turns 100 --players 4 --seed 42 --verbose
node tools/simulate.js --turns 200 --players 4 --seed 99 --verbose
node tools/simulate.js --turns 50 --players 7 --seed 7 --verbose
```

### Key Fidelity Metrics to Track

| Metric | Current | Target |
|--------|---------|--------|
| Cities per civ at turn 100 | 1 | 3-5 |
| Cities per civ at turn 200 | 1-2 | 5-10 |
| Techs at turn 100 | 5-15 | 15-25 |
| Techs at turn 200 | 15-22 | 35-50 |
| Worker orders per 100 turns | 0-1 | 50-200 |
| Government transitions | 0-1 | 2-3 per civ |
| City captures at turn 200 | 0 | 2-10 |
| AI idle turns (%) | 50-80% | <10% |
| Non-deterministic (different results same seed) | Yes | No |

### Per-Phase Verification

| Phase | What to verify |
|-------|---------------|
| A | Same seed → identical results. No `Math.random()` in engine/. All exports imported somewhere. |
| B | Pikeman ×2 FP vs mounted, AEGIS ×5 FP vs missiles, Artillery FP=2 attack |
| C | Trireme sinks in open ocean, air units crash without fuel, damaged units move slower |
| D | Nuclear meltdown events, WLTKD cities grow, trade routes generate ongoing gold |
| E | Railroad +50% shields, farmland +50% food, Despotism −1 penalty on 3+ tiles |
| F | Hanging Gardens +1 content, Women's Suffrage reduces mil unhappiness, senate blocks war |
| G | Ceasefire expires after 16 turns, alliance shares vision, reputation tracks treaty breaks |
| H | Hills see 2 tiles, fog shows stale data, sentry wakes on enemy adjacent |
| I | Late-game barbarians have Musketeers, goody hut gives tech, naval barbarians spawn |
| J | Spy success uses unified formula, targeted tech theft works, events trigger correctly |
| K | Spaceship buildable and launchable, score matches formula, year 2020 ends game |
| L | AI data has per-continent attack strength, goal merge works, embassy flags tracked |
| M | Wounded AI units retreat, settlers found vs terraform correctly, transports coordinate |
| N | AI uses actual city yields (not size proxy), wonders not built if losing race |
| O | AI negotiates treaties with counter-offers, exchanges techs with allies |
| P | AI runs all 8 phases, matches units to goals, redistributes between continents |
| Q | Deity AI researches faster, tech leak gives free techs, scenarios load events |

---

## Gap Count Summary

| Category | Count | Estimated Work |
|----------|-------|----------------|
| Dead export wiring | 14 | Small |
| Seeded PRNG replacement | 46 call sites | Medium |
| Duplicate elimination | 5 pairs | Small |
| Firepower system | 1 new system | Medium |
| Movement gaps | 5 features | Medium |
| City turn gaps | 8 features | Large |
| Yield/corruption gaps | 6 formulas | Medium |
| Happiness/wonder gaps | 8 effects | Medium |
| Diplomacy gaps | 5 features | Medium |
| Visibility gaps | 5 features | Medium |
| Barbarian/goody hut gaps | 6 features | Medium |
| Espionage gaps | 5 features | Medium |
| Spaceship/victory gaps | 4 fixes | Small |
| AI data infrastructure | 4 expansions | Medium |
| AI unit master gaps | 6 systems | Large |
| AI production gaps | 5 features | Medium |
| AI diplomacy gaps | 5 systems | Large |
| AI orchestrator | 2 major ports | Large |
| Research/init gaps | 4 features | Medium |
| **Total** | **~120 discrete gaps** | **~15 agents, 6 waves** |
