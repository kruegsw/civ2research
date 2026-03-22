# Deep Dive: Batch 13-16 (16 Functions, ~72KB)

Comparison of decompiled Civ2 MGE binary functions against their JS engine equivalents.
Each function receives a branch-by-branch analysis with discrepancies listed.

---

## 1. `diplo_favor_menu` (FUN_0045dd7f, 4,878B) — block_00450000.md

**Binary**: UI menu for the "Ask a Favor" diplomacy option. Three choices: exchange tech, hire mercenary, exchange maps.

**JS equivalent**: No direct equivalent. `diplomacy.js` has `executeTransaction()` for asset transfer, and `transferTechs()`/`shareMaps()` for individual operations, but the favor-menu orchestration flow does not exist.

### Branch-by-branch comparison

| Branch | Binary | JS | Status |
|--------|--------|----|--------|
| Cancel (choice 0) | `civ[civB].patience--; return` | No patience-decrement-on-cancel logic | **MISSING** |
| Exchange tech (choice 1) | Calls `handle_exchange_gift(civA, civB, -1, -1, 0, 0)`, loops if patience remains | `transferTechs()` exists but no multi-round exchange loop | **PARTIAL** |
| Hire mercenary (choice 2) | Complex: list eligible targets, calculate mercenary price via reputation+treasury+military formula, check reputation threshold, present offer, transfer gold or tech, declare war, 50% betrayal chance | **Entirely absent** | **MISSING** |
| Exchange maps (choice 3) | Check conditions (alliance, attitudeScore, Alphabet/Writing tech), mutual map reveal, share unit/city visibility | `shareMaps()` exists but missing prerequisite checks (tech requirements, attitude gate, wonder checks for wonders 9 and 12) | **PARTIAL** |

### Discrepancies

1. **Mercenary hiring system** — The entire "hire a civ to attack another" flow is missing from JS. This includes the complex price formula (base price with reputation, treasury, military modifiers), reputation threshold check (6+ score blocks), betrayal mechanic (50% chance if friendly with target), and the gold/tech payment.
2. **Patience decrement on cancel** — Binary decrements `civ[civB].patience` when the player cancels the favor menu. JS has no equivalent.
3. **Tech exchange looping** — Binary allows multiple tech exchanges in a single favor session if patience allows (`civ[civB].patience++` on success, continue loop). JS `transferTechs()` is a one-shot operation.
4. **Map exchange prerequisites** — Binary checks: no alliance AND attitudeScore > 0 AND no wonder[9] (Great Library) AND no wonder[12] (UN), OR attitudeScore > 25 OR tech 0x2e (Writing) missing. JS `shareMaps()` has none of these gates.
5. **Map exchange: shared visibility** — Binary shares unit and city visibility bits in addition to tile exploration. JS `shareMaps()` only handles tile-level visibility.

**Severity**: Medium-high. The mercenary system is a major diplomatic feature. Map exchange prerequisites prevent exploit-level map sharing.

---

## 2. `ai_evaluate_diplomacy_toward_human` (FUN_00560d95, 4,728B) — block_00560000.md

**Binary**: Detailed AI attitude evaluation with ~15 factors: border intrusion, intruder events (NEARCITY/ADMIRECITY/VIOLATOR), ceasefire violation handling, senate scandal, and a comprehensive scoring algorithm (war count, tech rank, alliance strength, spaceship, wonders, personality, power differential, military comparison).

**JS equivalent**: `calcAttitudeScore()` in `diplomacy.js` (lines 2113-2238) handles Phase 4 (attitude scoring). `evaluateDiplomacyTowardAll()` in `ai/diplomai.js` (lines 2231-2385) handles per-turn attitude updates.

### Branch-by-branch comparison

#### Phase 1: Border information
| Binary | JS | Status |
|--------|----|--------|
| `get_border_info(aiCiv, humanCiv)` → sets nearestCity, borderScore, intruderCount | `detectBorderIntrusions()` + `calcBorderScore()` in diplomai.js | **PARTIAL** — JS has simplified version |

#### Phase 2: Diplomatic events (intruder handling)
| Branch | Binary | JS | Status |
|--------|--------|----|--------|
| No ceasefire: NEARCITY/ADMIRECITY events | Fire UI events based on border proximity | Not implemented | **MISSING** |
| Ceasefire + no intruders: demand tribute, INTRUDER event | `demand_tribute()` + event chain | Not implemented | **MISSING** |
| Ceasefire + intruders: VIOLATOR event → withdraw/violate choice | Unit withdrawal or senate scandal | Not implemented | **MISSING** |
| Senate scandal (Democracy→Anarchy on violation) | Forces government to anarchy on ceasefire violation in democracy | Not implemented | **MISSING** |
| Unit withdrawal mechanics | Move units to nearest friendly city | Not implemented | **MISSING** |

#### Phase 3: Clear ceasefire flags
| Binary | JS | Status |
|--------|----|--------|
| Clear bit 0x04 from all unit flags | No unit-level ceasefire flags | **MISSING** |

#### Phase 4: Attitude scoring algorithm
| Factor | Binary | JS `calcAttitudeScore()` | Status |
|--------|--------|----|--------|
| Tech rank count (how many civs have more tech) | `for c in 1..7: if c.techCount > target.techCount: techRankCount++` | Identical loop at line 2146 | **MATCH** |
| War count | `count_wars_between(aiCiv, otherCiv)` | `getTreaty(state, aiCiv, c) === 'war'` | **MATCH** |
| Alliance strength | `isAllied(otherCiv, humanCiv): allianceStrength++; if weaker: allianceStrength++` | Identical at lines 2148-2152 | **MATCH** |
| At-war modifiers (no other wars) | Gold, tech, military comparisons | Lines 2157-2168 check `isAllied` instead of `atWar` | **DISCREPANCY** — JS checks `isAllied` but binary checks `atWar(humanCiv, aiCiv)`. The entire war-modifier block is gated on being at WAR in the binary, but on being ALLIED in JS. This is an **inverted condition**. |
| At-war modifiers (multiple wars) | `expansionism < 1 OR warCount > 1: penalty = warCount - expansionism - 1` | Lines 2163-2167 | **MATCH** |
| Large tech gap at war | `aiCiv.techCount + 8 < humanCiv.techCount: score += 1` | Line 2168 | **MATCH** |
| Ceasefire penalty | `ceasefire: score -= 2` | Line 2172 | **MATCH** |
| No alliance penalty | `NOT isAllied: score -= 1` | Line 2173 | **MATCH** |
| Late-game spaceship penalty | `persona < 7 AND turn > 200: penalty = 7 - persona; if turn < 400: penalty >>= 1` | Lines 2176-2179 — missing `check_spaceship()` that reduces penalty to 1 | **PARTIAL** |
| Power ranking bonus (persona 7) | `persona == 7 AND cityCount > 3 AND turn > 200 AND difficulty > 0: bonus = difficulty/3 + 1` with tolerance/alliance strength gate and halving | Lines 2181-2184 — missing the tolerance-vs-alliance-strength gate and halving logic | **PARTIAL** |
| Spaceship active penalty | Double penalty if AI has no spaceship | Lines 2187-2189 | **MATCH** |
| Personality modifier | `expansionism * 3 + militarism * 2; floor at -2` | Lines 2193-2194 | **MATCH** |
| Power differential | `targetPowerRank - aiPowerRank; halve if negative or not at war` | Lines 2195-2198 — JS halves when NOT allied; binary halves when NOT at war | **DISCREPANCY** |
| Military comparison (stacking penalties) | `aiMil*4 < targetMil: -1; aiMil*2 < targetMil: -1; aiMil*3/2 < targetMil: -1` | Lines 2201-2203 — JS condition `aiMil * 3 < targetMil * 2` is the same as binary `aiMil * 3/2 < targetMil` | **MATCH** |
| Military comparison guard | Binary gates on `NOT (game.flags & 1) OR (tolerance - attitude <= allianceStrength AND NOT trespass)` | JS has no guard at all — always applies | **DISCREPANCY** |
| Peaceful strength bonus | `NOT atWar: targetMil < aiMil → +1; targetMil*2 < aiMil → +1` | Lines 2206-2209 — JS checks `!isAllied` but binary checks `NOT atWar` | **DISCREPANCY** |
| Wonder effects: Great Wall/Navigation | `has_tech(humanCiv, GREAT_WALL) OR has_tech(humanCiv, NAVIGATION)` — halve/reduce score | Lines 2215-2218 — JS checks `civHasWonder(targetCiv, 6) || civHasWonder(targetCiv, 24)` (Great Wall + UN) and adds `-10` penalty | **DISCREPANCY** — Binary checks tech ownership, JS checks wonder ownership. Also binary uses Navigation (not UN), and JS adds an extra `-10` not in binary. |
| Eiffel Tower (wonder 20) | `has_tech(aiCiv, DEMOCRACY_ADVANCE): score += 1` | Line 2219: `civHasWonder(state, aiCiv, 20)` | **DISCREPANCY** — Binary references DEMOCRACY tech, JS references Eiffel Tower wonder. These are different things. |
| Democracy wonder | `has_tech(humanCiv, DEMOCRACY_ADVANCE): if score > 0: score /= 2; score -= 1; if score >= 0: score -= 1` | Lines 2220-2222 — JS: `if (score > 0) score /= 2; score -= (score >= 1 ? 2 : 1)` | **PARTIAL** — JS combines the two decrements into one conditional but matches the logic. |
| Tech leader bonus | `techRankCount == 0: score += 1` | Line 2226 | **MATCH** |
| Tech vs tolerance | `aiTechCount < targetTechCount: score += (1 - tolerance)` | Line 2229 | **MATCH** |
| Alliance floor | `isAllied AND score < 1: score = 0` | Line 2232 | **MATCH** |
| No contact reset | `NOT haveContact: score = 0` | Line 2235 | **MATCH** |
| MP sync | `mp_sync(0xFF, 2, 0, 0, 0); XD_FlushSendBuffer(5000)` | Not applicable (WebSocket) | N/A |

### Key Discrepancies

1. **War vs Alliance condition inversion** — The entire "at-war modifiers" block (gold/tech/military comparison, +1/-1 adjustments) is gated on `atWar` in binary but `isAllied` in JS. This means in JS these modifiers fire when allied (friendly), while in binary they fire when at war (hostile). This is a significant logic inversion.
2. **Power differential halving** — Binary halves when `NOT atWar`, JS halves when `NOT isAllied`. Different conditions.
3. **Military comparison guard** — Binary has a complex gate involving game flags, tolerance, attitude, and alliance strength. JS applies the military penalties unconditionally.
4. **Peaceful strength bonus** — Binary gates on `NOT atWar`, JS gates on `NOT isAllied`.
5. **Wonder effects mismatch** — Binary references Great Wall + Navigation techs; JS references Great Wall + UN wonders. Binary's "democracy" effect references the Democracy tech; JS references Eiffel Tower (wonder 20).
6. **Extra -10 penalty** — JS adds a `-10` attitude penalty for Great Wall/UN that is not present in the binary.
7. **Entire Phase 2 missing** — Border intrusion events, ceasefire violation handling, unit withdrawal, senate scandal — all missing from JS attitude evaluation (though partially covered by `diplomai.js` `evaluateDiplomacyTowardAll()`).

**Severity**: HIGH. The war/alliance condition inversion means the scoring system behaves fundamentally differently for war-time and peace-time evaluations.

---

## 3. `city_button_change` (FUN_0050a473, 4,544B) — block_00500000.md

**Binary**: UI handler for the city production change dialog. Builds available items list (units 0-61, buildings 1-38, wonders 0-27), presents dialog, validates production change with shield penalty, manages auto-governor, worklists.

**JS equivalent**: `CHANGE_PRODUCTION` action in `reducer.js` (lines 136-191) and `CHANGE_PRODUCTION` validation in `rules.js`.

### Branch-by-branch comparison

| Branch | Binary | JS | Status |
|--------|--------|----|--------|
| Build available list: units 0..61 | `can_build_unit(civ_id, cityIdx, unit_type)` for each | `rules.js` has `canBuild*` checks in validation | **PARTIAL** — validation exists but list building is client-side |
| Build available list: buildings 1..38 | `can_build_building(civ_id, cityIdx, building)` | Same pattern | **PARTIAL** |
| Build available list: wonders 0..27 | `can_build_wonder(civ_id, wonder)` with `*` prefix for in-progress | Same pattern | **PARTIAL** |
| Auto-governor (flags 0x10) | Enable auto-governor via AUTOMODE dialog | Not implemented | **MISSING** |
| Worklist support | `DAT_00655aea bit 2` enables worklist buttons | Not implemented | **MISSING** |
| Shield penalty: same item | No penalty | `prevItem.type === item.type && prevItem.id === item.id` → no penalty | **MATCH** |
| Shield penalty: same category | Binary: `shields = min(shields, new_cost)` | JS: `Math.floor(oldShields / 2)` — 50% loss | **DISCREPANCY** |
| Shield penalty: cross-category | Binary implies full shields capped at new cost | JS: `newShields = 0` — 100% loss | **DISCREPANCY** |
| Confirm dialog for shield loss | `if new_cost < city.shield_box && !(flags & 0x200): confirm("PRODCHANGE")` | No confirmation (server-side, assumed client handles UI) | N/A (UI) |
| Decrement unit-ever-built for old production | `civ.unit_ever_built[old_prod]--` when switching FROM unit | Not tracked | **MISSING** |
| Increment unit-ever-built for new production | `civ.unit_ever_built[new_prod]++` when switching TO unit | Not tracked | **MISSING** |
| Clear auto-governor flags | `city.flags &= ~0x03000010` | Not implemented | **MISSING** |
| Recalculate city production after change | `calc_city_production(cityIdx, 1)` | Not explicitly called post-change | **MISSING** |

### Key Discrepancies

1. **Shield penalty formula** — Binary caps shields at `min(shields, new_cost)`, which preserves shields when switching to a more expensive item. JS uses 50% loss for same-category and 100% loss for cross-category. The binary approach is: if `new_cost < shields`, you lose the excess; if `new_cost >= shields`, you keep everything. This is fundamentally different from a flat percentage penalty.
2. **Unit-ever-built tracking** — Binary maintains a per-civ counter of units queued for production, decrementing when switching away from a unit and incrementing when switching to one. JS does not track this.
3. **Auto-governor and worklist** — Both absent from JS (acceptable for MVP).

**Severity**: Medium. The shield penalty formula difference affects gameplay strategy around production switching.

---

## 4. `write_save_file` (FUN_004741be, 4,499B) — block_00470000.md

**Binary**: Writes a complete .sav file to disk. Includes magic string, version, game state blocks, map data, visibility layers, random seeds, units, cities, wonders, viewports, tail data, MP data, scenario blocks, events section.

**JS equivalent**: The JS parser (`parser.js`) handles reading this format. There is no save-file writer in JS — the game state is kept in-memory on the server.

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Write "CIVILIZE" magic string | Yes | Read-only in parser.js | N/A (read-only) |
| Write version 0x2C | Yes | Parser reads and validates version | N/A |
| Scenario tech ownership bitmask | Build per-tech ownership bitmask, set firstDiscoverer | Parser reads but does not write | N/A |
| Write game state blocks | `fwrite(game_state, 0x14A)`, `fwrite(cosmic_rules, 0x790)`, etc. | Parser reads these exact sizes | N/A |
| Write map data + visibility layers | Two visibility layers written separately | Parser reads both layers | N/A |
| Write 21 wonder entries (3 bytes each) | `destroyed, cityId, obsolete` per wonder | Parser reads this structure | N/A |
| Write MP data (10 bytes × 8 players) | Per-player MP blocks | Parser reads MP data | N/A |
| Write events section (EVNT magic + linked list) | Full event record serialization | Parser skips events section | N/A |

### Discrepancies

This is a read-vs-write comparison. No game logic discrepancies since JS only reads the format. The save writer is not needed for the multiplayer engine architecture (state lives in server memory, not disk).

**Severity**: None — intentionally not ported.

---

## 5. `process_unit_move_visibility` (FUN_004274a6, 4,250B) — block_00420000.md

**Binary**: Master post-move handler called after every unit movement. Four phases: (1) reveal tiles in 25-tile city-spiral pattern, (2) detect cities/units on adjacent tiles with first-contact diplomacy and treaty violations, (3) extended-range encounters for attacker units, (4) multiplayer visibility notification.

**JS equivalent**: `updateVisibility()` in `visibility.js` (lines 132-167) handles Phase 1 (tile reveal). First contact is handled in `move-unit.js`. Treaty violations are partially in `diplomacy.js`.

### Branch-by-branch comparison

#### Phase 1: Tile revelation (25-tile spiral)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Reveal 25 tiles (city radius spiral) | `CITY_SPIRAL_X/Y[0..24]` offsets | `radiusOffsets()` computes similar offsets | **PARTIAL** — JS uses variable radius based on terrain, binary always uses 25-tile city spiral |
| Attacker units: extended range (tiles 8-24) | Only attackers reveal tiles 8-24 (excluding tile 20) | JS applies terrain-based radius (hills +1, mountains +2, fortress +1, cap 3) | **DISCREPANCY** — Different revelation model. Binary uses fixed city-spiral with attacker gate; JS uses terrain-boosted radius |
| Domain matching for extended range | `domain != NAVAL_ALL && !is_matching_domain(tx, ty, domain): continue` | JS does not domain-filter extended range | **MISSING** |
| Barbarian terrain discovery | `UNITS[unitIdx].visibility |= tilePtr.byte4` for barbarians | Not implemented | **MISSING** |
| Civ tile memory update | `update_civ_tile_memory(tx, ty, terrain, owner, 0, 1)` | Not tracked (no per-civ tile memory) | **MISSING** |
| Discovery flags tracking | Tracks adjacent vs extended discovery for UI notification | Not tracked | **MISSING** |

#### Phase 2: Adjacent tile encounters (8 directions)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| City discovery on adjacent tiles | Reveal city to civ, check ownership changes | Partial — move-unit.js handles some | **PARTIAL** |
| Mutual visibility (reveal our unit to city owner) | `reveal_unit_to_civ(unitIdx, cityOwner)` unless air unit | Not implemented (one-way visibility only) | **MISSING** |
| Treaty violation: land approach to enemy city | `trigger_diplomatic_incident(cityOwner, tx, ty, 0, 4)` | Not implemented | **MISSING** |
| Unit encounter: mutual visibility | Both sides reveal to each other | Partial — JS reveals the mover but not the encountered unit | **PARTIAL** |
| Cancel blocked goto orders | `cancel_goto_for_stack(adjUnitIdx)` when enemies meet | Not implemented | **MISSING** |
| First contact diplomacy | `first_contact_diplomacy(owner, adjUnitOwner, tx, ty)` | First contact is handled in move-unit.js as `firstContact` flag | **PARTIAL** |
| Treaty violation: land approach to enemy unit | Complex severity calculation based on unit flags and domain | Not implemented | **MISSING** |

#### Phase 3: Extended range encounters (tiles 8-24)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| City reveal at range for attackers | Same reveal/treaty checks as Phase 2 | Not implemented | **MISSING** |
| Cancel goto for extended-range sightings | `cancel_goto_for_units` | Not implemented | **MISSING** |

#### Phase 4: Multiplayer notification
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Send event 0xFF/0x72/0x75/0x76 | Network events for visibility updates | WebSocket broadcasts handle this differently | **DIFFERENT ARCH** |

### Key Discrepancies

1. **Revelation model** — Binary uses a fixed 25-tile city-spiral with an attacker gate for tiles 8-24. JS uses a variable-radius approach (1-3 tiles based on terrain: hills +1, mountains +2, fortress +1). These produce different visible tile sets.
2. **Mutual visibility** — Binary reveals units to both sides on encounter. JS only reveals the moving unit's perspective.
3. **Treaty violations** — Binary tracks trespass incidents with severity scores (0-4) for diplomatic consequences. JS has no equivalent.
4. **Goto cancellation** — Binary cancels blocked goto orders when enemy units are spotted. JS does not.
5. **Per-civ tile memory** — Binary maintains each civ's memory of terrain (fog-of-war recall). JS has no per-civ memory system.

**Severity**: HIGH. The tile revelation differences affect gameplay balance (scouting, fog of war). Missing treaty violations and goto cancellation affect diplomatic and AI behavior.

---

## 6. `main_menu_command_dispatch` (FUN_004e2803, 4,219B) — block_004E0000.md

**Binary**: Giant switch statement (~80 cases) mapping Win32 menu command IDs to handler functions: game options, load/save, retire, quit, revolution, tax rate, find city, score, spaceship, cheat commands, etc.

**JS equivalent**: No direct equivalent. The JS engine uses a WebSocket action dispatch system (`reducer.js`) instead of menu commands. Individual actions are mapped to reducer cases.

### Comparison

| Menu Command | Binary Handler | JS Equivalent | Status |
|--------------|---------------|---------------|--------|
| Game Options | `show_game_options_dialog()` | Client-side UI | N/A (UI) |
| Load/Save Game | `load_game_handler()` / `save_game_handler()` | Parser reads; no save | N/A |
| Revolution | `start_revolution()` | `REVOLUTION` action in reducer | **PORTED** |
| Tax Rate | `show_tax_rate_dialog()` | `CHANGE_RATES` action in reducer | **PORTED** |
| Find City | `show_find_city_dialog()` | Client-side UI | N/A (UI) |
| Spaceship | `show_spaceship_dialog()` | Spaceship actions in reducer | **PORTED** |
| Cheat commands | `handle_cheat_command(subtype)` | No cheat system | **MISSING** (intentional) |

### Discrepancies

None of game-logic significance. This is pure Win32 UI plumbing. The game logic that menu commands invoke (revolution, tax rates, etc.) is ported to the reducer/rules system.

**Severity**: None — UI dispatch, not game logic.

---

## 7. `open_tax_rate_dialog` (FUN_0040cd64, 4,140B) — block_00400000.md

**Binary**: Tax rate dialog lifecycle. Creates UI with 3 scrollbars and 3 lock checkboxes. Key game logic: clamps rates to government maximum, recalculates all cities when rates change, early-game AI rate suggestion.

**JS equivalent**: `CHANGE_RATES` action in `reducer.js` (lines 238-247) and validation in `rules.js` (lines 324-340).

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Get max rate for government | `get_max_tax_rate(civ_id)` | `GOVT_MAX_RATE[govt]` in rules.js validation | **MATCH** |
| Clamp tax to max | `while civ.tax_rate > max_rate: tax_rate -= 1; science_rate += 1` | Validation rejects rates > max_rate | **DIFFERENT** — Binary auto-clamps; JS rejects |
| Clamp science to max | `while civ.science_rate > max_rate: science_rate -= 1; tax_rate += 1` | Same rejection approach | **DIFFERENT** |
| Clamp luxury (derived) to max | `while (10 - sci - tax) > max_rate: ...` | `luxuryRate > maxRate` check | **DIFFERENT** |
| Rate exceeded flag | `dialog_ptr->rate_exceeded = 1` triggers notification | No notification for auto-adjustment | N/A (UI) |
| Recalculate all cities on change | `for each city owned by civ_id: recalc_city_production(city_idx, 1)` | Not explicitly triggered (deferred to next turn processing) | **DISCREPANCY** |
| Early-game AI suggestion | `if turn < 11 and govt < 2: AI_suggest_rates()` | Not implemented | **MISSING** |
| Lock checkboxes for individual rates | 3 locks for tax/luxury/science | Not implemented | **MISSING** (UI feature) |

### Key Discrepancies

1. **Auto-clamp vs rejection** — Binary auto-adjusts rates when government changes (e.g., after revolution) by iteratively reducing excess rates and redistributing. JS simply rejects invalid rate combinations. If a player's rates become invalid after a government change, JS may leave them in an invalid state until the player manually adjusts.
2. **Immediate city recalculation** — Binary recalculates all owned cities immediately when rates change. JS does not explicitly trigger recalculation, deferring to the next production cycle.
3. **Early-game AI rate suggestion** — Binary shows a suggested rate configuration in the first 11 turns under despotism. JS has no equivalent.

**Severity**: Medium. The auto-clamp vs rejection difference can cause invalid rate states after government changes if not handled by the revolution reducer.

---

## 8. `find_path` (FUN_004abfe5, 4,118B) — block_004A0000.md

**Binary**: BFS pathfinder using a circular buffer queue (size 2304). Cost grid is 48x48 tiles centered on destination. Searches FROM destination BACKWARD. Accounts for terrain, roads, railroads, rivers, ZoC, domain, and diplomatic unit exceptions.

**JS equivalent**: `findPath()` in `pathfinding.js` (lines 147-255). Uses A* with a min-heap priority queue, searching FORWARD from source to destination.

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Algorithm | BFS with circular queue, reverse (dest→src) | A* with min-heap, forward (src→dest) | **DIFFERENT** |
| Queue structure | Circular buffer, 2304 entries | Binary heap (unlimited) | **DIFFERENT** |
| Search space | 48x48 cost grid centered on destination | Hash map (gScore), unlimited | **DIFFERENT** |
| Iteration limit | Implicit (queue exhaustion within 48x48) | 4096 node expansions (configurable) | **SIMILAR** |
| Path caching | Caches cost grid; reuses if dest unchanged | No caching — recomputes each call | **MISSING** |
| Cost metric | `tileCost + terrain_cost * speed * 4` (integer costs × 4) | `moveCost()` from movement.js | **DIFFERENT SCALE** |
| Road movement | `road on both tiles (same row): cost += 4; railroad: cost += 0` | Uses `moveCost()` which handles road/railroad | **PARTIAL** |
| Railroad | Free movement (cost += 0) | `moveCost()` returns MOVEMENT_MULTIPLIER/3 for railroad | **DISCREPANCY** |
| River crossing | `river on dest: cost += speed * 4` unless unit ignores rivers | Handled by `moveCost()` | **PARTIAL** |
| ZoC enforcement | Checks for enemy city/fortress and enemy adjacent units | `isZOCBlocked()` from movement.js | **MATCH** |
| Diplomat/Caravan exception | No ZoC, fixed cost +1 per tile | `UNIT_IGNORE_ZOC` flag in pathfinding.js | **MATCH** |
| Domain restrictions | `(terrain == ocean) != isNaval: skip` with source/dest/loading exceptions | Domain checks at lines 204-221 | **PARTIAL** |
| Transport boarding | Naval loading exception (land→ocean with transport) | `hasFriendlyTransport()` check | **MATCH** |
| Best-step tiebreaking | Distance to destination as tiebreaker | A* heuristic naturally handles this | **EQUIVALENT** |
| Debug visualization | "MOVEDEBUG" key shows colored cost grid | Not implemented | N/A |
| Result | Returns direction index (0-7) for next step | Returns array of all direction strings | **DIFFERENT** |

### Key Discrepancies

1. **Algorithm direction** — Binary searches backward from destination (BFS), finding the cost field, then picks the best first step from source. JS searches forward from source (A*). Both should produce equivalent shortest paths, but edge cases may differ.
2. **Railroad cost** — Binary treats railroad as free (cost += 0). JS `moveCost()` assigns a non-zero cost for railroad. This means JS pathfinding prefers roads over railroads in some edge cases.
3. **Cost scaling** — Binary multiplies all costs by 4 for integer precision. JS uses the movement multiplier (typically 3). Different scaling can lead to different path choices when costs are close.
4. **Path caching** — Binary caches the 48x48 cost grid and reuses it if the destination hasn't changed. JS recomputes every time. This is a performance difference, not a correctness one.
5. **48-tile radius limit** — Binary's 48x48 grid limits pathfinding range. JS's A* has a configurable max cost but no spatial limit.

**Severity**: Medium. Railroad cost difference affects movement optimization. The algorithm difference is architectural but should produce similar results for most cases.

---

## 9. `handle_exchange_gift` (FUN_0045950b, 4,096B) — block_00450000.md

**Binary**: Tech exchange/gift function. Scans both civs' tech trees, finds best techs to give/receive, handles wonder prerequisite blocking, manages multi-step exchange dialog, has attitude adjustments, difficulty-based exploit prevention.

**JS equivalent**: `transferTechs()` in `diplomacy.js` (lines 1659-1687) handles tech transfer mechanics. `executeTransaction()` (lines 1468-1550) handles the overall transaction framework. No equivalent for the exchange negotiation logic.

### Branch-by-branch comparison

| Branch | Binary | JS | Status |
|--------|--------|----|--------|
| Scan tech trees for exchange candidates | Loop 0-99, score each tech for give/receive value | Not implemented — JS receives explicit tech IDs | **MISSING** |
| Wonder prerequisite blocking | `if wonderBlockingTech >= 0 AND difficulty > 3: refuse` | Not implemented | **MISSING** |
| Attitude gate for non-allies | Refuse if trespassing (0x10), border violations, hostile attitude | Not implemented | **MISSING** |
| Ceasefire hostility check | `treaty.byte1 & 0x02 OR hostile OR many techs → refuse` | Not implemented | **MISSING** |
| Tech sell attempt (fewer techs) | `diplo_sell_tech()` when civA has fewer techs | Not implemented | **MISSING** |
| Emperor exploit prevention | Block specific techs (0x22, etc.) when difficulty == 7, cities > 4, not allied | Not implemented | **MISSING** |
| Free gift (allied, at war, weaker) | `grant_tech()` with no exchange when conditions met | Not implemented | **MISSING** |
| Exchange dialog with second choice | Present two tech options; validate player's choice | Not implemented (handled at transaction level) | **MISSING** |
| Attitude adjustment | `adjust_attitude(civB, civA, -techValue * 2)` | Not implemented per-exchange | **MISSING** |
| Set diplomacy-occurred flag | `civ flags 0x80` | Not tracked | **MISSING** |
| Transfer shared visibility | `update_shared_visibility(civA, civB)` post-exchange | Not implemented | **MISSING** |
| scanOnly mode | Return without UI if scanOnly parameter set | Not applicable | N/A |

### Key Discrepancies

1. **No negotiation logic** — JS `transferTechs()` is a direct tech transfer function. The entire negotiation system (tech valuation, best-tech selection, attitude gates, wonder blocking, difficulty-based restrictions) is absent.
2. **Attitude adjustment on exchange** — Binary adjusts attitude by `-techValue * 2` after each exchange, making repeated exchanges less favorable. JS has no per-exchange attitude cost.
3. **Emperor exploit prevention** — Binary specifically blocks certain powerful tech exchanges at Emperor+ difficulty unless allied. JS has no difficulty-based exchange restrictions.
4. **Wonder prerequisite blocking** — Binary prevents AI from trading a tech that would enable building a wonder the AI wants. JS has no such check.

**Severity**: Medium-high. The missing negotiation logic and difficulty gates affect game balance significantly at higher difficulties.

---

## 10. `game_loop_mp_server` (FUN_0048c9f3, 3,990B) — block_00480000.md

**Binary**: Main multiplayer server game loop. Manages turn sequencing for server civ, AI civs, and remote human civs. Handles sync, end-of-turn, scenario events, casualties, tech advances, AI fast-forward, timer management, disconnections.

**JS equivalent**: `server.js` handles turn management via WebSocket message processing. The `END_TURN` action in the reducer transitions between civs. AI turn processing is in `server.js` lines ~920-1020.

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Civ loop (0..7) | Iterate all civs, skip dead | Same pattern in reducer END_TURN | **MATCH** |
| Server's own turn | Full turn processing with UI updates | Reducer handles all civs equally | **DIFFERENT ARCH** |
| AI civ turn | Disable display, recalc yields, do_full_civ_turn, AI_process | `processAiTurn()` in server.js | **PARTIAL** |
| Remote human turn | Send turn signal, wait for client response with timeout | WebSocket message-based turn control | **DIFFERENT ARCH** |
| Sync state | `sync_state(); flush(60s)` between operations | Not needed (server-authoritative) | N/A |
| End-of-turn processing | `process_end_of_turn(-3)` — full path recalc | Reducer END_TURN handles this | **PARTIAL** |
| Game end check | `check_game_end_conditions()` | Checked in reducer | **PARTIAL** |
| Scenario events | `process_all_events(turn)` | `events.js` processes events | **PARTIAL** |
| Casualties display | `show_casualty_or_turn_dialog(casualties)` | Client-side notification | **PARTIAL** |
| Tech advance check | `check_tech_advance()` at turn start | `research.js` handles during production | **PARTIAL** |
| AI fast-forward mode | Suppress human mask, process AI, check ESC to exit | Not implemented (AI turns are instant) | **MISSING** |
| Timer management | `set_timer()`, `enable_timer()`, `disable_timer()` | Not implemented | **MISSING** |
| New player joining mid-game | `new_player_flag[civ]` detection | Lobby handles joining | **DIFFERENT ARCH** |
| Kill units post-turn | `for unit in civ: kill_unit(unit_idx)` — cleanup dead units | Handled during actions | **PARTIAL** |
| Clear city processed flags | `city.flags &= ~0x400000` | Not tracked | **MISSING** |
| Starting civ (resume from save) | Skip-ahead to saved civ position | Not implemented (always fresh start or full load) | **MISSING** |

### Key Discrepancies

1. **Architecture** — Binary has separate codepaths for server-local, AI, and remote-human civs. JS uses a uniform reducer architecture where all civs are processed the same way (server-authoritative, WebSocket-based).
2. **Turn timer** — Binary has a per-turn timer that can be configured. JS has no turn timer.
3. **AI fast-forward** — Binary can enter an AI-only mode where human display is suppressed and ESC breaks out. JS processes AI turns instantly without a fast-forward concept.
4. **Starting civ resume** — Binary can resume a saved multiplayer game from a specific civ's turn. JS does not support mid-turn saves.

**Severity**: Low — architectural differences are intentional. Turn timer absence is a feature gap.

---

## 11. `startup_multiplayer` (FUN_00444310, 3,846B) — block_00440000.md

**Binary**: Multiplayer game setup. Handles network type selection (hotseat/LAN/internet/PBEM/scenario), save format version, protocol type, game setup dialog (map size, world settings), map generation, scenario loading, client join flow.

**JS equivalent**: Lobby system in `server.js` handles game creation via WebSocket. Map generation is in `mapgen.js`. Game initialization is in `init.js`.

### Comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Network type selection | 5 types: hotseat/LAN/internet/PBEM/scenario | WebSocket only | **DIFFERENT ARCH** |
| Save format version | 3-6 depending on network type | Not applicable | N/A |
| Protocol type | IPX vs TCP selection dialog | WebSocket only | N/A |
| Game setup dialog | Map size, world settings, difficulty | Lobby/room configuration | **PARTIAL** |
| Map generation | Earth/Random/Customize with terrain seeds | `mapgen.js` random generation | **PARTIAL** |
| Load scenario | `load_scenario_mp(3)` | SAV file loading via parser | **PARTIAL** |
| Client join flow | `connect_to_server()`, prompt name, create MP host/client | WebSocket connection, room joining | **DIFFERENT ARCH** |

### Discrepancies

This is an architectural comparison — the JS project uses a completely different networking model (WebSocket vs DirectPlay/IPX/TCP). The game setup features (map generation, scenario loading) are ported. Network protocol specifics are intentionally not ported.

**Severity**: None — intentionally different architecture.

---

## 12. `cheat_edit_civ` (FUN_00556f54, 3,764B) — block_00550000.md

**Binary**: Cheat menu for editing civilization data: treaties, contacts, attitude, betrayal count, patience, revolution trigger, research, leader name, tech copying, gender toggle.

**JS equivalent**: No cheat system in JS. Not intended for implementation.

### Comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Edit treaties | Toggle contact/ceasefire/peace/alliance/vendetta/embargo bits | Not implemented | N/A (cheat) |
| Edit last contact turn | Input per civ pair | Not implemented | N/A |
| Edit attitude | Input per civ pair | Not implemented | N/A |
| Edit betrayal count | Input value | Not implemented | N/A |
| Reset patience | Restore default | Not implemented | N/A |
| Trigger revolution | Set govt = anarchy | `REVOLUTION` action exists | **PARTIAL** |
| Set/clear research | Input progress value | `SET_RESEARCH` action exists | **PARTIAL** |
| Rename leader | Input name | `RENAME_CITY` exists but not leader | N/A |
| Copy tech bitmask | Pick source civ, copy all techs | Not implemented | N/A |
| Toggle gender | `civ.flags ^= 0x200` | Not tracked | N/A |

### Discrepancies

No game-logic discrepancies. Cheat features are intentionally not ported.

**Severity**: None — cheat system, not game logic.

---

## 13. `update_menu_state` (FUN_004e4ceb, 3,761B) — block_004E0000.md

**Binary**: ~9.5KB function that enables/disables/checks ~100+ Win32 menu items based on current game state. Called on every state change.

**JS equivalent**: No equivalent. The JS client handles UI state based on the game state object received via WebSocket.

### Comparison

This is pure Win32 menu manipulation — `EnableMenuItem()`, `CheckMenuItem()` calls. The game logic it reads (selected unit type, game started, cheat mode) exists in the JS state model, but the menu enable/disable pattern is a Win32 UI concept with no server-side equivalent.

**Severity**: None — UI plumbing only.

---

## 14. `process_goody_hut` (FUN_0058f040, 3,404B) — block_00580000.md

**Binary**: Goody hut resolution with 6 outcomes: tribe (found city), mercenaries, gold, barbarians, scrolls (tech), nomads (settler). Complex suppression rules based on era, territory, settler count. Late-game bonuses.

**JS equivalent**: `resolveGoodyHut()` in `reduce/move-unit.js` (lines 79-222).

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Domain check | Only land units (domain 0), non-barbarian | `resolveGoodyHut()` is only called when `civSlot > 0` in move-unit.js; domain check is implicit via movement rules | **PARTIAL** — no explicit domain check in resolveGoodyHut |
| Roll distribution | `rand() % 5` (5 equal outcomes) | Weighted random selection based on difficulty | **DIFFERENT** — JS uses difficulty-based weights |
| Forced tribe (continent control) | `if NOT human OR rand()%3: check continent_not_claimed AND no_enemy AND era_advanced` | Not implemented | **MISSING** |

#### Case 0: Tribe (found city)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Era gate | `if era < 4: redirect to mercs` | `if turnNum < 100: outcome = 1` (redirect to mercs) | **DIFFERENT** — binary uses era, JS uses turn number |
| Homeless settler check | `if no_cities AND turn < 50: count homeless settlers; if > 1: redirect` | `earlyNoCities` check exists | **PARTIAL** |
| Territory control check | `get_effective_tile_owner(x, y); if controller > 11: allow` | Not implemented — JS checks distance to all cities | **DIFFERENT** |
| Late-game city bonuses | `if turn > 1000: size = 1+rand()%4; add Temple, Marketplace (50%), Granary (33%), Courthouse (25%)` | `if turnNum > 150: add Temple`; always Granary; sometimes Palace | **DISCREPANCY** — different building sets, different thresholds |
| City size | Binary: `1 + rand()%4` (late game) | JS: `1 + rng.nextInt(2)` → size 1-2 | **DISCREPANCY** — binary gives up to size 4, JS caps at 2 |
| Disorder check | `handle_city_disorder(city_idx)` | Not called | **MISSING** |

#### Case 1: Mercenaries
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Unit selection | Complex tech-based progression: default Knights, check horseback riding/iron working/gunpowder/conscription/metallurgy, secondary catapult/magnetism/chemistry/invention | `getHutMercType(state)` | Need to verify `getHutMercType` implementation |
| 50% chance primary/secondary | `rand() % 2 == 0 ? base_unit : secondary` | Depends on `getHutMercType` implementation | **UNVERIFIED** |
| No home city | `unit.home_city = 0xFF` | Not explicitly set | **POTENTIAL MISSING** |

#### Case 2: Gold
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Base amount | 50 gold | Year-based: 25-50 (ancient), 25-75 (classical), 50-100 (modern) | **DIFFERENT** |
| Sub-roll | `rand()%3 == 0: sub_roll → 25 or 100` | Linear random ranges | **DIFFERENT** |
| Late-game doubling | `if turn > 1000: amount *= 2` | `if year >= 1500: amount *= 2` | **SIMILAR** — different threshold metrics |

#### Case 3: Barbarians
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Suppression | `if era < 4 OR (no_cities AND turn < 50): redirect to mercs` | `earlyNoCities` redirect but no era check | **PARTIAL** |
| Weak civ protection | `if NOT human AND ranking < best: if rand()%8 < difficulty: redirect to tribe` | Not implemented | **MISSING** |
| Spawn pattern | 8 directions, step based on city count `clamp(4 - city_count, 1, 4)` | All 8 directions shuffled, spawn `4 + rng.nextInt(5)` barbarians | **DISCREPANCY** — binary scales spawn rate by city count |
| Barbarian unit selection | Era-based type selection based on terrain move cost | `getBarbUnitType(state)` | **UNVERIFIED** |
| Barbarian visibility | `barb.visibility |= tile_visibility` | Not set | **MISSING** |
| Single-barbarian flag | `if barbarian_present: return` after first spawn | Not implemented | **MISSING** |

#### Case 4: Scrolls (tech)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Suppression | `if turn == 0 OR has_tech(UNIVERSITY): redirect to gold` | JS: `anyoneHasTech(state, 38)` → redirect to gold for case 3, not case 4 | **DISCREPANCY** — different suppression logic |
| Tech selection | Random roll, iterate to find researchable tech | `getAvailableResearch()` then random index | **SIMILAR** |
| Max attempts | 999 attempts to find valid tech | No iteration limit (array random) | **DIFFERENT** (not impactful) |
| Fallback | Redirect to tribe if no tech found | Redirect to gold | **DISCREPANCY** |

#### Case 5: Nomads (settler)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Suppression | `if has_wheel: redirect to gold; if settlers > cities/8: redirect to scrolls` | `anyoneHasTech(state, 28)` → redirect to gold (applied to case 5) | **PARTIAL** — JS suppresses differently |
| No home city | `unit.home_city = 0xFF` | Not explicitly set | **POTENTIAL MISSING** |

### Key Discrepancies

1. **Roll distribution** — Binary uses uniform `rand()%5`; JS uses difficulty-weighted probabilities. This fundamentally changes the likelihood of each outcome.
2. **Late-game city bonuses** — Binary gives cities up to size 4 with multiple buildings (Temple, Marketplace, Granary, Courthouse) after turn 1000. JS gives size 1-2 with Granary always, Temple after turn 150.
3. **Barbarian spawn scaling** — Binary scales barbarian count by city count (fewer cities = sparser spawns). JS spawns 4-8 regardless.
4. **Tech suppression** — Binary suppresses scrolls if civ has University tech; JS suppresses via `anyoneHasTech(38)` applied to a different outcome case.
5. **Forced tribe outcome** — Binary can force a city outcome when a continent is unclaimed and uncontested. JS has no continent-control check.

**Severity**: Medium-high. The weighted vs uniform distribution and city bonus differences significantly affect game pacing.

---

## 15. `handle_tech_discovery` (FUN_004bf05b, 3,391B) — block_004B0000.md

**Binary**: Full tech discovery handler: MP delegation, clear research target, update tech bitmask, first-discoverer tracking, notification, barracks obsolescence chain, wonder obsolescence, Leonardo's Workshop unit upgrades, AI auto-steal (wonder effect 4), MP sync.

**JS equivalent**: `grantAdvance()` in `research.js` (lines 157-167) handles the bitmask. `handleTechDiscovery()` in `research.js` (lines 204-298) handles side effects.

### Branch-by-branch comparison

| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| MP delegation | Send 0x9B message to delegate for remote human civs | N/A (WebSocket architecture) | N/A |
| Clear research target | `if currentResearch == techId: currentResearch = -1` | Not done in `grantAdvance()` — handled elsewhere | **DIFFERENT** (likely handled in caller) |
| Update tech bitmask | `techFlags[civ] |= techBit(techId)` | `state.civTechs[civSlot].add(advanceId)` (Set-based) | **MATCH** (different data structure, same effect) |
| Future tech handling | `if techId == 0x59 OR >= 100: futureTechCount++` | `if techId >= FUTURE_TECH_ID: futureTechCounts++` (FUTURE_TECH_ID = 89) | **MATCH** |
| First-discoverer tracking | `firstDiscovererBitmask[techId] |= (1 << civSlot)` | `state.techDiscoveredBitmask[techId] |= (1 << civSlot)` | **MATCH** |
| Tech source tracking | `techSource[civ][techId] = sourceCiv` | Not tracked | **MISSING** |
| Tech count increment | `techCount[civ]++` | `civTechCounts[civSlot] = civTechs[civSlot].size` | **MATCH** |
| Discovery notification | Complex visibility check (embassy, UN, alliance, god mode) | Events array returned (UI handles display) | **PARTIAL** |
| First discovery spy notification | `show "STEALTECH" notification` for non-human discoverer | Not implemented | **MISSING** |
| Barracks obsolescence | Walk obsolescence chain from Gunpowder; remove Barracks(2); refund maintenance | Only checks Gunpowder (35), removes Barracks(2), refunds | **PARTIAL** — missing the obsolescence chain walk (binary finds latest non-obsolete barracks tech) |
| Wonder obsolescence | For each wonder: if `wonderObsoleteTech == techId`, notify owner | `WONDER_OBSOLETE` array lookup, emit events | **MATCH** |
| Electronics special flag | `civFlags[civ] |= 0x20; triggerWeLoveTheKingDay(civ)` for Electronics | Not implemented | **MISSING** |
| Leonardo's Workshop upgrades | `upgradeUnitsForTech(civSlot)` | `upgradeUnitsForTech(state, civSlot, techId)` | **MATCH** |
| AI auto-steal (wonder effect 4) | `getWonderOwner(4); if count > 1: grant tech to wonderOwner` | `checkGreatLibraryCascade(state, techId)` | **MATCH** |
| Philosophy golden age | Not present in this function | `triggerGoldenAge()` when Philosophy first discovered | **EXTRA** in JS |
| Government revolution prompt | Not present in this function | `checkGovernmentRevolution()` | **EXTRA** in JS |
| MP sync | `diff_engine_scan_and_send(0xFF, 2, ...)` | N/A (WebSocket) | N/A |

### Key Discrepancies

1. **Barracks obsolescence chain** — Binary walks the obsolescence chain to find the latest non-obsolete barracks tech (Gunpowder → Automobile chain). JS only checks Gunpowder directly. If the game has modded obsolescence chains, JS would miss later chain steps.
2. **Electronics special effect** — Binary sets a civ flag (0x20) and triggers "We Love the King Day" on Electronics discovery. JS does not handle this.
3. **Tech source tracking** — Binary records which civ provided each tech (for score/history). JS does not track this.
4. **First discovery spy notification** — Binary shows a spy notification to the human player when an AI civ makes a first discovery. JS does not.
5. **Extra JS features** — JS adds Philosophy golden age bonus and government revolution prompt that are not in this binary function (they may exist elsewhere in binary).

**Severity**: Low-Medium. The barracks chain walk is minor for standard rules. Electronics effect and tech source are missing details.

---

## 16. `ai_diplomacy_turn_processing` (FUN_00560084, 3,345B) — block_00560000.md

**Binary**: Per-turn AI diplomacy orchestrator. Phases: (1) clear flags and manage government during anarchy, (2) roll AI random seed, toggle senate override, (3) decrement patience every 3rd turn, (4) main diplomacy loop with alliance violation detection, treaty flag management, periodic WARENDS events, (5) evaluate diplomacy toward all humans, (6) post-processing, (7) alliance proposal loop.

**JS equivalent**: `diplomacyTurnProcessing()` in `ai/diplomai.js` (lines 1999-2132) and `evaluateDiplomacyTowardAll()` (lines 2231-2385).

### Branch-by-branch comparison

#### Phase 1: Clear flags and manage government
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Clear bits 3 and 6 | `civ.flags &= 0xFFB7` | Not implemented | **MISSING** |
| Anarchy → auto-select government | Complex logic with senate flag and game.flags checks | `chooseBestGovernment()` with REVOLUTION action | **PARTIAL** — JS simplified |
| Senate flag handling | `civ.flags &= 0xFFFE` to clear senate bit | Not implemented | **MISSING** |
| Non-human restore government | `if NOT isHuman AND civ.flags & 1: set_government(civ.government)` | Not implemented | **MISSING** |

#### Phase 2: AI random seed and senate override
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| AI random seed | `civ.aiRandomSeed = rand() % 100` | Not implemented (uses JS Math.random) | **DIFFERENT** |
| Senate override toggle | `if rand()%3 == 0: civ.flags ^= 0x04` | Not implemented | **MISSING** |

#### Phase 3: Patience decrement
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Every 3rd turn: patience-- | `if turnNumber % 3 == 0 AND patience > 0: patience -= 1` | Lines 2028-2041: emits attitude adjustments toward war enemies | **DISCREPANCY** — binary decrements patience (a per-civ scalar); JS applies attitude penalties to specific enemies |

#### Phase 4: Main diplomacy loop (per other civ)
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Save/clear alliance violation memory | `tempAllianceViolation[otherCiv]` from flag 0x40 | Not implemented | **MISSING** |
| Clear transient treaty flags | `treaty &= 0xFF5FBFFF` (clear bits 14, 17, 23) | Not implemented | **MISSING** |
| Alliance violation detection | `if treaty & 0x20: toleranceRolls = clamp(3 - tolerance/4, 1, 3); if roll == 0: declare war OR set attitude 100` | Lines 2043-2065: checks ally attacking our peace partner, -3 attitude | **DISCREPANCY** — binary uses a randomized tolerance check on flag 0x20 to declare war; JS uses a deterministic ally-third-party check with a small penalty |
| AI-AI periodic diplomacy (16 turns) | `diplomacy_encounter()` / `tech_negotiation()` based on treaty status | Lines 2083-2111: proposes upgrading ceasefire to peace | **PARTIAL** — JS only handles ceasefire→peace upgrade |
| AI-AI periodic diplomacy (8 turns) | `tech_negotiation()` if at war | Lines 2114-2129: aggressive ceasefire expiration | **PARTIAL** |
| WARENDS event | Fire "WARENDS" when conditions met (embassy/Navigation/Writing visibility) | Not implemented | **MISSING** |
| MP notification (0x50 for WARENDS) | `send_mp_notification()` | N/A | N/A |
| 32-turn flag clearing | `treaty &= ~0x800; treaty &= ~0x80000` | Lines 2067-2081: attitude drift toward neutral | **DISCREPANCY** — binary clears specific treaty flags; JS drifts attitude toward 0 |
| Shared visibility check | `unknown_diplo_check(civId, otherCiv, 1)` | Not implemented | **MISSING** |
| Clear bit 10 | `treaty &= ~0x400` | Not implemented | **MISSING** |

#### Phase 5: AI-to-human evaluation
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| Local human: `evaluate_diplomacy_toward_human()` | Full evaluation function (FUN_00560d95) | `evaluateDiplomacyTowardAll()` calls `calcAttitudeScore()` | **PARTIAL** |
| Remote human: delegate via 0xA0 message | MP delegation | N/A | N/A |

#### Phase 6: Post-processing
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| `unknown_diplo_post(civId)` (FUN_0055f7d1) | Unknown post-processing | Not implemented | **MISSING** |

#### Phase 7: Alliance proposal
| Feature | Binary | JS | Status |
|---------|--------|----|--------|
| `propose_alliance_or_crusade()` (FUN_00562021) | Alliance/crusade proposals with tech gifts and war declarations | Separate function in diplomai.js | **PARTIAL** |

### Key Discrepancies

1. **Alliance violation → war** — Binary uses a randomized tolerance check on flag 0x20 that can trigger immediate war declaration. JS checks if an ally is attacking a peace partner and applies a -3 attitude penalty. The binary version is much more aggressive.
2. **Patience vs attitude** — Binary has a per-civ patience scalar that decrements every 3 turns. JS translates this to per-target attitude penalties toward war enemies. Different mechanics.
3. **Treaty flag management** — Binary carefully clears specific transient treaty flags (bits 14, 17, 23, 10, 0x800, 0x80000) on schedule. JS does not manage these flag bits.
4. **WARENDS event** — Binary fires a "WARENDS" event when visibility conditions are met (embassy, Navigation, or Writing tech). JS does not implement war-ending events.
5. **Senate override toggle** — Binary randomly toggles the senate override flag (allows bypassing senate approval for declarations of war). JS does not model senate mechanics.
6. **Government restoration for non-human** — Binary has specific logic for AI civs to restore their government after anarchy. JS uses a simplified `chooseBestGovernment()`.

**Severity**: HIGH. The alliance violation war declaration is a critical diplomatic mechanic. Missing treaty flag management and WARENDS events affect long-term game dynamics.

---

# Summary Table

| # | Function | Size | JS Match | Key Issues |
|---|----------|------|----------|------------|
| 1 | `diplo_favor_menu` | 4,878B | **PARTIAL** | Mercenary system missing, exchange prerequisite gates missing |
| 2 | `ai_evaluate_diplomacy_toward_human` | 4,728B | **PARTIAL** | War/alliance condition inversion, wonder effect mismatch, Phase 2 events missing |
| 3 | `city_button_change` | 4,544B | **PARTIAL** | Shield penalty formula differs (cap vs percentage), unit-ever-built missing |
| 4 | `write_save_file` | 4,499B | **N/A** | Read-only parser, save writer not needed |
| 5 | `process_unit_move_visibility` | 4,250B | **PARTIAL** | Different revelation model, no mutual visibility, no treaty violations |
| 6 | `main_menu_command_dispatch` | 4,219B | **N/A** | Win32 UI plumbing, game logic ported via reducer |
| 7 | `open_tax_rate_dialog` | 4,140B | **PARTIAL** | Auto-clamp vs rejection, no immediate city recalc |
| 8 | `find_path` | 4,118B | **SIMILAR** | Different algorithm (BFS vs A*), railroad cost difference |
| 9 | `handle_exchange_gift` | 4,096B | **MINIMAL** | No negotiation logic, no difficulty gates, no attitude cost |
| 10 | `game_loop_mp_server` | 3,990B | **DIFFERENT** | Intentionally different architecture (WebSocket vs DirectPlay) |
| 11 | `startup_multiplayer` | 3,846B | **DIFFERENT** | Intentionally different architecture |
| 12 | `cheat_edit_civ` | 3,764B | **N/A** | Cheat system, not intended for port |
| 13 | `update_menu_state` | 3,761B | **N/A** | Win32 UI plumbing |
| 14 | `process_goody_hut` | 3,404B | **PARTIAL** | Weighted vs uniform distribution, different city bonuses, barbarian scaling |
| 15 | `handle_tech_discovery` | 3,391B | **GOOD** | Barracks chain walk simplified, Electronics effect missing |
| 16 | `ai_diplomacy_turn_processing` | 3,345B | **PARTIAL** | Alliance violation → war missing, treaty flag management absent |

## Critical Discrepancies (Gameplay-Affecting)

1. **`ai_evaluate_diplomacy_toward_human` — War/Alliance condition inversion** (Function #2): The at-war modifier block fires for allies in JS instead of enemies. This inverts the scoring for war situations.
2. **`ai_diplomacy_turn_processing` — Alliance violation → war declaration** (Function #16): Binary can immediately declare war on tolerance-check failure; JS only applies small attitude penalty.
3. **`process_unit_move_visibility` — Revelation model** (Function #5): Binary's city-spiral + attacker gate produces different visible tiles than JS's terrain-boosted radius.
4. **`city_button_change` — Shield penalty formula** (Function #3): Binary caps shields at new item cost; JS uses flat percentages (50%/100%).
5. **`process_goody_hut` — Distribution model** (Function #14): Binary uses uniform `rand()%5`; JS uses difficulty-weighted probabilities.
6. **`handle_exchange_gift` — No negotiation logic** (Function #9): JS lacks the entire AI tech exchange evaluation system.
