# Deep Dive: ai_choose_city_production (FUN_00498e8b) vs prodai.js

## Overview

| Property | Binary | JS |
|----------|--------|----|
| **Function** | `FUN_00498e8b` @ 0x00498E8B | `engine/ai/prodai.js` |
| **Size** | 29,400 bytes (~2,100 lines decompiled) | 3,043 lines (all functions) |
| **Signature** | `int FUN_00498e8b(int city_id, int* out_unit, int* out_wonder)` | `generateProductionActions(gameState, mapBase, civSlot, strategy)` |
| **Returns** | Single int: positive=unit, negative=building/wonder | Array of `CHANGE_PRODUCTION` action objects |
| **Score convention** | Lower = better (999 = skip) | Higher = better (-1 = skip); inverted at normalization |

The binary function is a single monolithic 29KB function. The JS decomposes it into `scoreUnit()`, `scoreBuilding()`, `scoreWonder()`, `_finalProductionDecision()`, and `generateProductionActions()`.

---

## 1. Context Gathering (Binary lines 4120-4280)

### Binary
1. Gets city owner (`bVar1`), continent (`local_fc`), continent posture (`local_f8`).
2. Computes `local_b0` ("coastal flag"): 1 if posture is 0 (peace) or 1 (defense), or if alliance flag and posture==4 (war).
3. Counts enemy cities on same continent owned by other civs (`local_114`). If enemies exceed government's tolerance+1, sets `local_b0=1`.
4. Computes `local_220` (food surplus metric): `totalFood - citySize*COSMIC - numSettlers*DAT_006a6608`.
5. Checks city happiness: `local_78 = 1` if currently building a wonder (production < -0x26) AND shields invested > 39.
6. Scans 28 wonders: counts wonders in this city (`local_8c`) and wonders owned by civ (`local_18`).
7. Computes `local_d8` (happiness pressure): 0=none, 1=some unhappy (food==totalPop), 2=civil disorder.
8. Calls `FUN_0043d07a` to compute food surplus (`local_ac = DAT_0063f660`).
9. Checks `local_24c` ("auto-improve tile"): 1 if food surplus==0 AND not human AND no specific flag AND numSettlers==0.
10. Scans 20 city-radius tiles for:
    - Ocean tiles (`local_60`)
    - Enemy units (`local_d4` = sum of enemy defense strength)
    - Farmland tiles (`local_24`)
    - Best irrigable tile (`local_5c`)

### JS (`buildCityContext()`, lines 2121-2256)
1. Gets continent from `mapBase.tileData[].bodyId`.
2. Computes coastal flag from `isCoastalCity()` — scans for terrain==10 in radius.
3. Calls `findNearbyEnemies()` with maxDist=8 for enemy detection.
4. Counts defenders via `countCityDefenders()`.
5. Checks frontier status via `isFrontierCity()` (enemy city within 12 tiles).
6. Counts sea tiles, trade routes, buildings, SDI defenses, per-unit-type counts on continent.

### Discrepancies

| Item | Binary | JS | Severity |
|------|--------|----|----------|
| **Continent posture** | Reads `civ.continentPosture[continent]` directly (0-5 enum) | Approximates from `strategy.militaryPostureScore` with coarse mapping | **Medium** — the mapping loses granularity |
| **Coastal flag** | Complex: posture-based + alliance check + enemy count threshold | Simplified: `(continentPosture === 0 or 1) ? 1 : 0` | **Medium** — misses the alliance-war override and enemy count override |
| **Food surplus** | Exact: `totalFood - citySize*COSMIC - settlers*DAT_006a6608` | Exact when full context: `calcFoodSurplus()`, fallback heuristic otherwise | **Low** — matches when full context available |
| **Tile scanning** | Direct 20-tile radius scan for ocean, enemies, farmland, irrigable | Separate functions: `countSeaTiles()`, `findNearbyEnemies()`, etc. | **Low** — functionally equivalent |
| **Auto-improve tile** | Sets tile improvements (irrigation/road) during production check | **Missing entirely** — no tile auto-improvement during production AI | **Medium** — binary modifies map state as side effect |
| **Contact intelligence** | `local_3c` = count of type-1 contact records on continent | Not implemented — uses direct unit scanning instead | **Low** — different mechanism, similar outcome |

---

## 2. Danger Assessment (Binary lines 4197-4261)

### Binary
1. Calls `FUN_0043d07a` to compute food surplus and populate globals.
2. Sets `local_ac = DAT_0063f660` (food surplus result).
3. Initializes `local_24c=1` (auto-improve) if: food==0, not human, no coastal defense flag, numSettlers==0.
4. For each of 20 tiles: checks for enemy units at `local_dc,local_ec`, computes enemy defense strength via `FUN_005b50ad(unit_stack, 2)`. Accumulates into `local_d4`.
5. Checks tile improvements (road+railroad = `local_24`).
6. If auto-improve mode: finds best irrigable tile, potentially sets tile improvement flags.

### JS
1. `findNearbyEnemies()` finds enemy units within 8 tiles, computing distance.
2. `countCityDefenders()` counts own defensive units at city.
3. `analyzeSurroundingTiles()` from production.js computes per-tile flags for enemy presence.
4. `surroundingEnemyMilCount` and `surroundingAtWarCount` derived from tile flags.

### Discrepancies

| Item | Binary | JS | Severity |
|------|--------|----|----------|
| **Enemy strength** | Sums actual defense values via `FUN_005b50ad` | Counts enemy units (no strength weighting) | **Medium** — a single Mech Inf counts same as a Warrior |
| **Tile auto-improve** | Modifies game state: sets irrigation/road on best tile | Not implemented | **Low** — side effect, not production-related |
| **Search radius** | Exactly 20 tiles (city radius) | 8 tiles for enemies, 20 for sea/trade | **Low** — close enough for practical purposes |

---

## 3. Barbarian Special Case (Binary lines 4429-4461)

### Binary
If `civ == 0` (barbarians):
- If city has no current production: return Howitzer (0x13) if advanced, else Militia (5).
- If city has current production: find same-role unit that matches production era requirements.
- Complex logic to find replacement unit from same nation in same role.

### JS
No barbarian-specific production logic. Barbarian cities would use the same scoring as any AI civ.

### Discrepancy: **Medium** — Barbarian production is entirely unhandled; they default to generic AI scoring.

---

## 4. Building Scoring (Binary lines 4651-5120, JS `scoreBuilding()`)

### Binary Structure
```
for buildingId = 1 to 0x26 (38):
    if NOT can_build(civ, city, buildingId): continue
    score = 999; coastalPref = 0
    switch(buildingId):
        case 1-35: // per-building scoring
    // Post-switch normalization:
    //   score = ((coastalMatch ? 10 : 20) * score * 3) / (expansionism + 3)
    //   if has_courthouse: score += score / (barracksCount/2 + 3)
    //   if wonder_city(13): score += score / 3
```

### Per-Building Comparison

| Bldg ID | Name | Binary | JS | Match |
|---------|------|--------|----|-------|
| 1 | Palace | Based on `local_234` (palace count), city size. Score=2, 1 if size>9, -1 if >14. Checks alive, posture. | Similar logic but uses `palaceCityCount` and `strategicPosture`. | **Good** |
| 2 | Barracks | `expansionism + threatLevel + 4 - militarism`. Double if difficulty>3, 1.5x if difficulty==3. | Same formula. Uses `civsAlive` for difficulty scaling. | **Good** |
| 3 | Granary | Skip if Pyramids. Score=8 if `shieldProd<3`, else 4. Bonus if `unhappy>=happy`. AI: bonus from `difficulty+4-citySize`. | Skip if Pyramids. Score=8 if `numCities<3`, else 4. Bonus if `totalPop<=foodSurplus`. | **Medium** — conditions differ: binary uses `shieldProd<3`, JS uses `numCities<3`; binary checks unhappy ratio, JS checks food surplus |
| 4 | Temple | If happyPressure==1: score=9. If ==2: score=-5. | Identical. | **Exact** |
| 5 | Marketplace | `clamp(10 - numCities/2, 1, 10)`. Pressure adjustments. | Identical formula. | **Exact** |
| 6 | Library | `clamp(10 - numCities/3, 1, 10)` | Identical formula. | **Exact** |
| 7 | Courthouse | `14 - (waste*2 + corruption)`. Democracy: -1 if pressure==2. Non-human: minus strongest civ power/2. | Same base formula. Democracy and non-human branches present. | **Good** — binary uses `DAT_006a656c` (waste) and `DAT_006a6580` (corruption) directly; JS estimates from `citySize/3` and `citySize/4` |
| 8 | City Walls | Skip if Great Wall. `10 - citySize/2`. Per-rival: -2 if hostile, -1 if on continent. Bonus for threats. Clamp [1,10]. Palace: -4. | Same structure. Checks `warTargets`, continent counts. | **Good** |
| 9 | Aqueduct | If `threshold - halfShields <= citySize`: `score = (threshold+4) - citySize - halfShields`. Clamp [1,20]. | Identical formula with `aqueductThreshold=8`. | **Exact** |
| 10 | Bank | `clamp(10 - numCities/3, 1, 10)`. Pressure tweaks. | Identical. | **Exact** |
| 11 | Cathedral | Skip if Michelangelo. If pressure==1: 8. If ==2: -3. | Identical. | **Exact** |
| 12 | University | Requires `sciRate>0`. `clamp(10 - numCities/4, 2, 10)`. | Identical logic. | **Exact** |
| 13 | Mass Transit | No scoring in binary. | No scoring. | **Exact** |
| 14 | Colosseum | If pressure==2: -2. | Identical. | **Exact** |
| 15 | Factory | `clamp(14 - shieldProd, 1, 14)` | Identical. | **Exact** |
| 17 | SDI Defense | Complex: `clamp(15-citySize, 1, 15)`. Manhattan/strongest checks. Palace: 0. | Same structure with Manhattan and strongest-civ checks. | **Good** |
| 19 | Power Plant | `clamp(12 - shieldProd/5, 2, 14)` | Identical. | **Exact** |
| 20 | Hydro Plant | Same as Factory (shared case in binary) | Same scoring as Factory. | **Exact** |
| 22 | Stock Exchange | Pressure/opponent checks. `clamp(11 - numCities/4, 2, 11)`. | Identical. | **Exact** |
| 23 | Sewer System | If `opponents<2`: `clamp((12+4)-citySize-halfShields, 1, 20)`. | Identical with `sewerThreshold=12`. | **Exact** |
| 24 | Supermarket | `14 - citySize/2 - tradeRoutes*2 + opponents*2 + halfShields`. Clamp [2,14]. | Identical formula. | **Exact** |
| 25 | Superhighways | `15 - citySize/2 + opponents*6`. Clamp [2,15]. | Identical. | **Exact** |
| 26 | Research Lab | Same conditions as University. `clamp(11 - numCities/4, 2, 10)`. | Identical. | **Exact** |
| 27 | SAM Battery | Complex air threat assessment per-civ. `12 - airThreat`. Clamp [1,12]. Factory penalty. | Similar structure with per-civ air threat sum. | **Good** — binary uses exact `diplomacy[civ*4+our].flags` bitfields; JS approximates from `aiData.milAtkSum` |
| 28 | Coastal Fortress | Requires `FUN_0044263f(city, 1)` (coastal check). Naval threat assessment. `12 - navalThreat`. | Requires `isCoastal`. Similar naval threat scoring. | **Good** |
| 30 | Harbour | If pressure<2: `clamp(16-numBuildings, 2, 16)`. Half if shields<1. | Identical. | **Exact** |
| 31 | Offshore Platform | If pressure<2: `clamp(16-numBuildings, 2, 16)`. Halve for Factory, halve for MfgPlant. Complex shield/support check. | Same halving logic. Support ratio check simplified. | **Good** |
| 32 | Airport | `(airportCount*4 + 4) - militarism`. Frontier/tech checks. | Same base formula. | **Good** |
| 33 | Police Station | Skip if Women's Suffrage. Pollution assessment. `10 - pollutionCount`. | Same structure. | **Good** — binary reads actual pollution globals; JS estimates from buildings |
| 34 | Port Facility | Coastal required. `11 - units/4 + sdi*-5 + military*2 - militarism + expansionism`. Clamp [2,15]. | Same formula. | **Good** |
| 35-37 | SS Parts | Complex spaceship AI via `FUN_00597d6f`. Phase-ordered (structural->component->module). Checks Apollo wonder. Per-component selection within each phase. | Dedicated `_scoreSpaceshipPart()`. Phase ordering implemented. Counts from city buildings. | **Medium** — JS simplified: uses fixed targets (10/4/3) instead of binary's per-category max from RULES.TXT. Binary's within-phase component selection (fuel vs propulsion, etc.) is collapsed to a single score per building ID |

### Post-Switch Normalization

| Step | Binary | JS | Match |
|------|--------|----|-------|
| **Personality scaling** | `((coastalMatch ? 10 : 20) * score * 3) / (expansionism + 3)` | `Math.floor(coastalMultiplier * score * 3 / (expansionism + 3))` | **Exact** |
| **Courthouse bonus** | `score += score / (barracksCount/2 + 3)` | `score += Math.floor(score / ((threatLevel >> 1) + 3))` | **Different** — binary uses `barracksCount` (buildings on continent with barracks), JS uses `threatLevel` (war targets count) |
| **Shakespeare bonus** | `if wonder_city(0xd) == city_id: score += score/3` | `if shakespeareWonder.cityIndex === cityIndex: score += score/3` | **Exact** |
| **Score inversion** | Not needed (lower=better throughout) | `return Math.max(0, 300 - Math.min(score, 300))` | N/A — architectural difference |

---

## 5. Wonder Scoring (Binary lines 5132-5525, JS `scoreWonder()`)

### Binary Structure
The binary gates wonder scoring with several conditions:
1. `local_78 != 0` (already building a wonder with progress), OR
2. Complex condition: continent zone not special, city size > 2, not civil disorder, AND either garrison adequate OR continent zone is certain type.

### Base Score
- Binary: `(wondersOwned + wondersInCity + 8) - treasury/200`. Minimum 1.
- JS: Same formula. Also adds penalty for small empires (1-2 cities).

### Per-Wonder Switch Comparison

| Wonder | Binary Case | JS Case | Match |
|--------|-------------|---------|-------|
| 0 Pyramids | `-= (expansionism*3 + 2)` | `-= (expansionism*3 + 2)` | **Exact** |
| 1 Hanging Gardens | `-= (numCities/3 + 1)` | `-= (Math.floor(numCities/3) + 1)` | **Exact** |
| 2 Colossus | Palace -1, Marketplace -1, `-= citySize/3` | Same | **Exact** |
| 3 Lighthouse | `-= (navalCount+seaAttack+2)/4` | `-= Math.floor((navalCount+2)/4)` | **Good** — JS omits seaAttack term |
| 4 Great Library | Per-civ tech comparison. Behind: -1 each. Human ahead: +1. Large gap: -3. | Same structure | **Good** |
| 5 Oracle | `-= (numCities/4 + 1)` | `-= (Math.floor(numCities/4) + 1)` | **Exact** |
| 6 Great Wall | `-= expansionism * -2` (i.e., += expansionism*2) | `+= expansionism * 2` | **Exact** |
| 7 Sun Tzu | `-= (militarism*3 + tolerance + expansionism*-2 + 1)` | Same | **Exact** |
| 8 King Richard | `-= clamp(aliveCivs*2/3, 0, 3)` | Same | **Exact** |
| 9 Marco Polo | Per-civ treaty checks, -1 per at-war civ | Same structure | **Good** |
| 10 Michelangelo | `-= numCities/4` | Same | **Exact** |
| 11 Copernicus | `-= citySize/5`, Palace -1 | Same | **Exact** |
| 12 Magellan | `-= (airCount+3)/4` | Same structure | **Good** |
| 13 Shakespeare | `-= citySize/6`, Palace -1 | Same | **Exact** |
| 14 Leonardo | `-= (numCities >> 4)` and coastalPref set | `-= 4` (static), coastalPref set | **Different** — binary divides numCities by 16; JS uses flat -4 |
| 15 J.S. Bach | `-= numCities/4`, Palace -1 | Same | **Exact** |
| 16 Newton | `-= citySize/6`, Palace -1 | Same | **Exact** |
| 17 Adam Smith | `-= numCities/4` | Same | **Exact** |
| 18 Darwin | `-= 3` | Same | **Exact** |
| 19 Statue of Liberty | Tech 43 check: -2 if has, -1 if not | Same | **Exact** |
| 20 Eiffel Tower | Human: -1, govt>3: -2. Strongest tech gap: -1. Power rank 6: -1. | Same structure | **Good** |
| 21 Women's Suffrage | -1 base. All personality positive: -1. Spaceship: -1. High govt: -1/-1. | Same | **Exact** |
| 22 Hoover Dam | `-= numCities/20` | Same | **Exact** |
| 23 Manhattan | +2 if not at war. +5 if no Rocketry tech. | Same | **Exact** |

### Post-Wonder Adjustments

| Adjustment | Binary | JS | Match |
|------------|--------|----|-------|
| **Obsolescence** | `score = score * 3 + difficulty * 50` | `rawScore = rawScore * 3 + aliveCivCount * 50` | **Good** — binary uses `DAT_00655b08` (difficulty), JS uses `aliveCivCount` as proxy |
| **Other builders** | `score += numWonderBuilders * 5` | `rawScore += otherWonderBuilders * 5` | **Exact** |
| **Currently building stickiness** | Complex: checks progress%, adjusts cost fraction. Formula: `((cost-progress) * score*3/4) / cost + score/4) / 3` | `rawScore = Math.floor(rawScore * (1 - shields/cost))` for invested shields. Also `Math.floor(rawScore / 2)` stickiness. | **Medium** — JS simplified the stickiness formula |
| **Enemy building same wonder** | Checks if rival's defense strength justifies abandonment. Considers distance to rival, moves unit to city if threatened. | `someoneElseBuilding` flag with progress comparison (rivalProgress vs ourProgress). | **Medium** — binary has elaborate unit-relocation logic; JS only adjusts score |
| **War/defense checks per wonder** | Complex: checks if own civ is building wonder on continent (`local_238`), applies `local_d4` (enemy threat), checks `local_a4` (rival building same item). 50+ lines of per-wonder adjustments. | `otherWonderBuilders` count, `someoneElseBuilding` rival check with progress percentage. | **Medium** — binary's per-wonder threat/continent adjustments are significantly more detailed |

---

## 6. Unit Scoring (Binary lines 5526-6050, JS `scoreUnit()`)

### Binary Structure
```
if tech_score < 0x200 (512):
  for unitType = 0 to 0x3D (61):
    role = unit_role[unitType]
    if role > 5: // diplomat (6), caravan (7)
      diplomat/caravan scoring
      continue
    // combat/settler unit scoring
```

### Settler Scoring (Binary role 5, JS role 6)

| Aspect | Binary | JS | Match |
|--------|--------|----|-------|
| **Size gate** | `citySize > 1` required | `city.size <= 1: return -1` | **Exact** |
| **Engineer preference** | Checks if Engineer available, skips Settler | `if unitId===0 && canBuildUnit(1): return -1` | **Exact** |
| **Food gate** | Complex: `DAT_006a6608 <= local_220` OR `numSettlers==0 AND few on continent AND size>1` | Implemented in `_finalProductionDecision()` lines 2382-2403 | **Good** — moved to post-scoring gate |
| **Base scoring** | `local_378` divisor (4 or 6 based on granary). Need threshold from govt. Population vs settler count. | `granaryDiv` (4 or 6). `settlerThreshold = (govtIdx+1)/2`. Expansion need by numCities. | **Good** — JS adds explicit `numCities<=2: +8` etc. that binary computes indirectly |
| **Settler counting** | Binary: `aiStack_364[unitType]` (on-continent count) vs `local_21c[unitType]` (same-continent-city producing) | JS: `cityCtx.unitTypeCountOnCont`, `sameTypeGlobal` | **Good** |
| **Early game bonus** | Binary: multiplies by 2 if `citySize < 2`. Halves if `aiStack_364==0 AND local_220==DAT_006a6608`. | JS: `if city.size===2 && settlerCount===0 && numCities<4: score += 25` | **Different** — JS uses a flat bonus; binary uses multiplicative |

### Diplomat/Spy Scoring (Binary role 6, JS role 7)

| Aspect | Binary | JS | Match |
|--------|--------|----|-------|
| **Target selection** | Iterates civs 1-7: checks war status, tech advantage. Best target = at-war or tech-ahead civ. Falls back to strongest. | Same iteration logic. Uses `warTargets` and `aiData.techCount`. | **Good** |
| **Base score** | 11 if target found and conditions met. Per-civ diplomacy adjustments. | `clamp(10 - (theirTechs - ourTechs), 2, 10)`. At-war bonus. | **Good** |
| **Duplicate check** | If `aiStack_364[unitType] != 0`: score=999 (skip). | `if sameTypeOnCont > 0: rawScore = 999` | **Exact** |
| **Government bonus** | Communism (govt 3): score -= 1 | `if govtIdx === 3: rawScore--` | **Exact** |

### Trade Unit Scoring (Binary role 7, JS role 8)

| Aspect | Binary | JS | Match |
|--------|--------|----|-------|
| **Coastal check** | If coastal AND tradeRoutes < 3: skip | `if cityCtx.isCoastal && city.size < 3: return -1` | **Different** — binary checks trade routes, JS checks city size |
| **Base score** | `10 - ((5-tolerance)*numOpponents)/10 + tradeRoutes*2 + contCities` | Same structure. | **Good** |

### Combat Unit Scoring (Binary roles 0-4)

| Aspect | Binary | JS | Match |
|--------|--------|----|-------|
| **Unit 42 skip** | `if unitType == 0x2a: continue` (Carrier skip) | `if unitId === 42: return -1` | **Exact** |
| **Phalanx (2) check** | `if unitType == 2 AND govt >= 2: skip` | `if unitId === 2 && govtIdx >= 2: return -1` | **Exact** |
| **ATK>=99 cap** | `if ATK >= 99 AND global >= 4 AND continent >= 2: skip` | `if atk >= 99 && sameTypeGlobal >= 4 && sameTypeOnCont >= 2: return -1` | **Exact** |
| **Base count** | `existingUnits[type]*2 + onContinent[type]`. Human: /2. Special units +2. | `sameTypeOnCont*2 + sameTypeGlobal`. Human: /2. Special units +2. | **Exact** |
| **Combat power** | `(ATK+DEF) * mobilityFactor`. Mobility from `DAT_00655ae8` bit 4 check. Factor clamped [2,4]. | `(atk+def) * speedFactor`. Speed from `movePoints/10 + fp`. Clamped [2,4]. | **Good** — binary's mobility check is bit-based; JS approximates from move points |
| **Cost efficiency** | `((moveCost/COSMIC + 1) * combatPower) / 2` | Same formula with `COSMIC_MOVE_MULTIPLIER=3`. | **Exact** |
| **Role multiplier** | If role != 1 and != 5: ×2. If also != posture: ×4. | Same logic. | **Exact** |
| **Naval domain** | Sea: ×2 with coastal/airport bonuses. Naval combat: ×4 or ×2 based on coastal flag. | Same multipliers. | **Exact** |
| **Defender garrison** | `score -= (local_3c + 1) >> 1` where local_3c = contact count | `rawScore += (totalDefenders + 1) / 2` (inverted convention) | **Good** — binary uses contact records; JS uses defender count |
| **Threat scoring** | `local_11c = (3-coastal)*(enemies+1)*score / shieldProd`. Role 5: /2. Non-war: ×2. | `threatBonus = (3-coastalFlag)*(nearbyEnemyMil+1)*rawScore / aliveCivCount`. Similar role check. | **Good** — binary divides by shieldProd; JS divides by aliveCivCount |
| **Emergency defender** | If `local_80 > 1`: HARD OVERRIDE forces defender regardless of other scores. | `if cityCtx.defenders === 0`: hard override in `_finalProductionDecision()`. | **Exact** — same hard override behavior |
| **Human defend skip** | If role==1 AND human AND aliveCivs>2: score=999 | `if role===1 && isHuman && aliveCivCount>2: rawScore=999` | **Exact** |

---

## 7. Difficulty-Level Modifiers

### Binary
- `DAT_00655b08` = difficulty level (0-5). Used extensively:
  - Barracks scoring case 2: `if human AND difficulty==3: score*=3/2. if >3: score*=2`
  - Granary case 3: `if human: score += (difficulty+4) - citySize`
  - Wonder obsolescence: `score += difficulty * 50`
  - Spaceship case 0x23: `if difficulty < 2: check for rival building same wonder`
  - Unit gating: `if difficulty < 2: for each city, check if rival is building this wonder; if so, score=999`

### JS
- No direct difficulty parameter. Uses `aliveCivCount` as a proxy in several places.
- Barracks: uses `civsAlive` flag for human check, `aliveCivCount` for scaling.
- Granary: uses `aliveCivCount + 4 - citySize` as bonus.
- Wonder: uses `aliveCivCount * 50` in obsolescence penalty.

### Discrepancy: **Medium** — JS conflates difficulty level with alive civ count, which are independent parameters in the binary.

---

## 8. City Size Considerations

Both binary and JS gate production decisions by city size:

| Check | Binary | JS | Match |
|-------|--------|----|-------|
| **Settler min size** | `citySize > 1` | `city.size <= 1: return -1` | **Exact** |
| **Wonder min size** | Gated by garrison requirements and continent type | `city.size < 3 && numCities > 1: return -1` | **Good** — JS adds explicit small-city gate |
| **Aqueduct urgency** | `(8 - halfShields) <= citySize` | `(8 - halfShields) <= citySize` | **Exact** |
| **Sewer urgency** | `(12 - halfShields) <= citySize` | `(12 - halfShields) <= citySize` | **Exact** |
| **SDI/City Walls** | `10 - citySize/2` | `10 - citySize/2` | **Exact** |
| **Large city bonuses** | Settler: if `citySize > 6: score += 3`. `> 14: score -= 1`. | Settler: `if city.size >= 6: score += 3; if >= 10: score += 2` | **Good** — thresholds slightly different |

---

## 9. Coastal vs Inland Differences

### Binary
The `local_b0` (coastal flag) and `local_90` (coastal preference) interact:
- `coastalMultiplier = (local_b0 == local_90) ? 10 : 20`
- Score doubled if coastal preference doesn't match city type.
- `local_90 = 1` for: Barracks, City Walls, SDI, SAM Battery, Airport, Port Facility.
- `local_90 = local_b0` for: Airport, Palace (conditional), Spaceship, some wonders.

### JS
Same system: `coastalPref` per building/wonder, then:
```js
const coastalMatch = (isCoastal === coastalPref) ? 1 : 0;
const coastalMultiplier = coastalMatch ? 10 : 20;
```

### Match: **Good** — the formula is identical. Individual `coastalPref` assignments per building mostly match, but some conditional coastal prefs in the binary are simplified.

---

## 10. War vs Peace Priorities

### Binary
- `local_f8` (continent posture): 0=peace, 1=defense, 4=war, 5=expand.
- War mode (`local_f8==4`): Temple=-5, Marketplace=-4, Colosseum=-2. Cathedral=-3 if Cathedral wonder active.
- Units: role multiplier ×4 if role doesn't match posture. Settlers penalized.
- Wonders: `score += numWonderBuilders * 5` (penalty for distraction during war).
- SDI transfer: moves units to other city with superforitress during war.

### JS
- `strategicPosture` derived from `strategy.militaryPostureScore`.
- War mode: same Temple/Marketplace/etc. penalties via `happyPressure`.
- Units: same role multiplier logic via `continentPosture`.
- Wonders: same `otherWonderBuilders * 5` penalty.

### Match: **Good** — war/peace branching is faithfully ported. The binary's SDI-transfer logic (moving units between cities) is not implemented.

---

## 11. Rush-Buy Decisions

### Binary
Rush-buy logic is NOT in FUN_00498e8b itself — it's in a separate function called during city processing. The production function only returns the build item.

### JS (`generateRushBuyActions()`)
Implemented as a separate exported function in prodai.js:
- Evaluates all cities for rush-buy eligibility.
- Priority system: emergency defense (8), aqueduct/sewer at growth cap (7), spaceship (7), palace (6), settlers (5), key buildings (4), defense (3).
- Treasury threshold: 25-40% of treasury based on threat level.
- Urgency divisors from binary tables.
- Double urgency if treasury > 2499.
- Wonder rush-buy only when rival is racing.

### Match: **N/A** — rush-buy is separate from production selection in both implementations.

---

## 12. CITYPREF.TXT Overrides

### Binary (lines 5121-5131)
```c
if ((1 << civBit & civsAlive) != 0) && (DAT_0062ccc0 != 0):
    for each entry in autobuild_list (DAT_00673d70):
        if NOT has_building(city, entry) AND can_build(civ, city, entry):
            bestBuildId = -entry
            goto WONDER_SECTION  // skip all further building scoring
```
This is a hard priority override for human players' autobuild preferences.

### JS
**Not implemented.** No CITYPREF.TXT loading, no autobuild list, no human city automation.

### Discrepancy: **Low** — only affects human players using "AI auto-manage my cities" feature, which the JS engine doesn't support.

---

## 13. Spaceship Part Priorities

### Binary (`FUN_00597d6f` called from case 0x23)
1. Checks `FUN_004a7577(civ)` — can build spaceship at all.
2. Checks scenario flag `DAT_00655af0 & 2`.
3. Calls `FUN_00597d6f(civ, 0)` — selects next component to build.
4. Component selection: iterates 6 SS categories (structural, fuel, propulsion, habitation, life support, solar). Picks category with most need.
5. Within category: picks specific component type (structural=35, component=36, module=37).
6. Scores: base=4 (or 2 if rival has spaceship). Adjusts by tech/power/difficulty.
7. Complex rival comparison: counts rival parts, compares progress.
8. Alpha Centauri ETA check: `if warTargets>0 AND aliveCivs>2: score -= 1-2`.

### JS (`_scoreSpaceshipPart()`)
1. Checks Apollo Program wonder effect.
2. Counts structural, components, modules from city buildings.
3. Fixed targets: structural=10, components=4, modules=3.
4. Strict build order: structural first (need 4 before components, need 6 before modules).
5. Rival comparison: counts rival parts, checks if rival ahead.
6. War penalty: `if warTargets.length > 1: score -= 2`.

### Discrepancies

| Item | Binary | JS | Severity |
|------|--------|----|----------|
| **Category selection** | 6-category (structural, fuel, propulsion, habitation, life support, solar) with per-category maximums from RULES.TXT | 3-category (structural, component, module) with fixed targets (10/4/3) | **Medium** — loses granularity of fuel vs propulsion vs habitation vs life support vs solar |
| **Within-category** | Selects specific sub-type based on which subcategory has fewest built | Single building ID per category | **Medium** — binary picks between fuel/propulsion within "component", and between hab/life/solar within "module" |
| **Rival assessment** | Iterates all alive civs, checks if each has spaceship (`FUN_004a7577`), compares per-category counts | Counts rival parts from city buildings | **Good** |
| **ETA calculation** | Uses `DAT_0064caa8` (per-category counts × SS_PART_COST) for progress scoring | Uses simple count comparison | **Low** |
| **Build order** | Phase 0→1→2 enforced by within-phase component selection returning -1 | Same phase ordering with explicit thresholds (structural<4→no components, etc.) | **Good** |

---

## 14. Final Decision Logic (Binary lines 6052-6109, JS `_finalProductionDecision()`)

### Binary
Three parallel "best" trackers during scoring:
- `local_30` / `local_58`: best score among buildings+wonders (with cross-type preference)
- `local_20` / `local_254`: best score overall (unit or building or wonder)
- `local_26c` / `local_240`: best unit score

Final selection:
```c
if NOT human OR (city.flags & 0x10) == 0:
    // Standard AI decision
    if NOT human AND city.production == CAPITALIZATION:
        return CAPITALIZATION
    if best_wonder < -0x26 AND no Aqueduct: return -4 (Aqueduct)
    if currently_building_wonder AND conditions: keep wonder
    return local_58  // best build item

if (city.flags2 & 1) == 0:  // human flag 1
    if (city.flags2 & 2) == 0:
        if bestBuildScore > 500: return 99 (capitalize)
    else:
        if bestOverall > 98 OR bestScore > 500: return 99
else:
    if bestUnit > 98 OR bestUnitScore > 500: return 99
```

### JS
1. Scores ALL items (units 0-51, buildings 1-38, wonders 0-27).
2. Picks best from each category.
3. Goal integration: boosts unit scores based on active ATTACK/DEFEND/NAVAL goals.
4. Continent military balance: boosts if outnumbered.
5. Settler food gate: blocks settlers when food insufficient.
6. Wonder stickiness: boosts current wonder if 25%+ invested.
7. Emergency defender override: hard override if 0 defenders.
8. Anti-oscillation: don't switch if new score < current * 1.1.
9. Production switch penalty: cross-type loses 50% shields.

### Discrepancies

| Item | Binary | JS | Severity |
|------|--------|----|----------|
| **Scoring integration** | Single loop with all items in one pass, shared `local_30` variable | Three separate scoring loops, compared afterward | **Architectural** — same result, different structure |
| **Human city flags** | Three-way flag check (flags2 bits 0, 1) for human autobuild preferences | Not implemented — all cities treated as AI-managed | **Low** — human cities not AI-managed in JS |
| **Capitalize fallback** | Returns 99 when `bestScore > 500` | Falls back to best defensive unit or Warriors | **Medium** — JS never capitalizes; always tries to find something to build |
| **Goal integration** | Not in binary production function | JS boosts scores by 6-20% based on goal system | **Enhancement** — JS-only feature |
| **Anti-oscillation** | Binary has implicit stickiness via `local_58` tracking current production | Explicit `bestScore < currentScore * 1.1` check | **Enhancement** — JS-only explicit check |
| **Aqueduct fallback** | `if best_wonder < -0x26 AND no Aqueduct: return -4` — forces Aqueduct when nothing good found | No explicit Aqueduct fallback | **Low** — Aqueduct scores well anyway when needed |

---

## 15. Sell Obsolete Buildings (Not in FUN_00498e8b)

### Binary
Lines 4533-4557 of FUN_00498e8b sell specific buildings when their wonder replacement exists:
- Barracks (3) if Pyramids wonder (0) active AND tech for free Granary
- City Walls (0x1a=26) if Sistine Chapel and conditions
- Police Station (0x21=33) if Women's Suffrage
- Cathedral (0xb=11) if Michelangelo's Chapel

Actually: the binary sells specific buildings when the civ gains a tech that makes them obsolete or when a wonder provides the effect for free. This is done INSIDE the production function before scoring.

### JS (`generateSellObsoleteActions()`)
Separate exported function with:
- Building replacement pairs: Power Plant → Hydro/Nuclear/Solar
- Tech obsolescence: Barracks → Mobile Warfare (tech 53)
- Wonder obsolescence: Granary → Pyramids, City Walls → Great Wall
- Zero-benefit: Coastal Fortress for landlocked cities

### Discrepancy: **Low** — both sell obsolete buildings; JS implements it as a separate function rather than inline.

---

## Summary of Discrepancies by Severity

### High (Functional differences affecting gameplay)
None identified at high severity.

### Medium (Logic differences that may affect AI behavior)

1. **Continent posture mapping**: JS approximates from `militaryPostureScore` instead of reading exact posture enum.
2. **Coastal flag computation**: JS misses alliance-war override and enemy count threshold.
3. **Granary conditions**: Binary uses `shieldProd<3`; JS uses `numCities<3`.
4. **Difficulty vs aliveCivCount**: JS conflates difficulty level with alive civ count.
5. **Spaceship categories**: JS collapses 6 SS categories to 3 building types.
6. **Wonder stickiness formula**: JS simplified from binary's progress-based formula.
7. **Wonder threat/continent adjustments**: Binary has 50+ lines of per-wonder adjustments not in JS.
8. **Capitalize fallback**: Binary returns 99 (capitalize); JS always tries to build something.
9. **Auto-improve tile**: Binary modifies map tiles during production check; JS does not.
10. **Barbarian production**: Binary has dedicated barbarian logic; JS uses generic AI scoring.

### Low (Minor differences or enhancement-tier)

1. **Contact intelligence** vs direct unit scanning.
2. **CITYPREF.TXT autobuild** not implemented (human auto-manage feature).
3. **Barracks/courthouse bonus**: Binary uses barracksCount; JS uses threatLevel.
4. **Human city flags**: Not relevant (JS doesn't auto-manage human cities).
5. **Aqueduct fallback**: Missing but not needed due to scoring.
6. **Sell obsolete**: Same behavior, different code organization.

### Enhancements (JS-only features)

1. **Goal system integration**: Production boosted by ATTACK/DEFEND/NAVAL goals.
2. **Anti-oscillation**: Explicit 10% threshold to prevent flip-flopping.
3. **Continent military balance**: Boosts unit scores when outnumbered on continent.
4. **Settler stickiness**: Refuses to switch away from settlers once shields invested.
5. **Wonder competition tracking**: Compares rival shield investment progress.

---

## Architectural Differences

| Aspect | Binary | JS |
|--------|--------|----|
| **Function count** | 1 monolithic function (29,400 bytes) | 15+ functions across prodai.js |
| **Score convention** | Lower = better (999 = skip, 0 = best) | Higher = better (-1 = skip, 300+ = best) |
| **Return value** | Single int (positive=unit, negative=building/wonder) | Array of CHANGE_PRODUCTION action objects |
| **State mutation** | Modifies map tiles, moves units, sells buildings — all inline | Pure scoring; mutations via separate action dispatch |
| **Globals** | Reads/writes ~50 global variables (DAT_006a65xx series) | Reads immutable gameState; writes nothing |
| **Unit type range** | 0-61 (62 types) | 0-51 (52 types, from UNIT_ATK.length) |
| **Building range** | 1-38 (38 types) | 1-38 (matches) |
| **Wonder range** | 0-27 stored as items 39-66 | 0-27 stored as items 39-66 (matches) |

---

## Overall Fidelity Assessment

The JS prodai.js is a **faithful high-level port** of the binary function. The core scoring formulas for buildings (23 of 35 cases) match exactly. The per-wonder scoring matches in 21 of 28 cases. Unit scoring follows the same structure with the same filters and multipliers.

The main areas of divergence are:
1. **Context gathering**: JS approximates several binary globals (continent posture, difficulty level, contact records) rather than computing them exactly.
2. **Side effects**: Binary modifies game state (tiles, units, buildings) inline; JS is purely functional.
3. **Spaceship AI**: JS collapses the 6-category component selection to 3 building types.
4. **Wonder competition**: Binary has elaborate unit-relocation and "we saw/we shot" alert logic for rival wonder builders; JS only adjusts scores.

**Estimated fidelity**: ~75-80% for building scoring, ~70% for wonder scoring, ~70% for unit scoring, ~60% for context gathering. Overall ~70% faithful to binary behavior.
