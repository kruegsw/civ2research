# Block 00430000 — Phase 7 Audit
**Functions in this block: 114**
**System: Advisor dialogs (Foreign/Wonders/Top5/Demographics/Attitude/Score/HoF/Credits/Military), City data accessors, Trade commodity supply/demand, City founding**

## FW — Framework (12 functions)

| Addr | Name | Verdict |
|------|------|---------|
| 0x0043C110 | ~CDaoFieldInfo | N/A — MFC CDaoFieldInfo destructor (library match) |
| 0x0043C19C | FUN_0043c19c | N/A — CDaoFieldInfo sub-destructor step 6 |
| 0x0043C1AB | FUN_0043c1ab | N/A — CDaoFieldInfo sub-destructor step 5 |
| 0x0043C1BA | FUN_0043c1ba | N/A — CDaoFieldInfo sub-destructor step 4 |
| 0x0043C1C9 | FUN_0043c1c9 | N/A — CDaoFieldInfo sub-destructor step 3 |
| 0x0043C1D8 | FUN_0043c1d8 | N/A — CDaoFieldInfo sub-destructor step 2 |
| 0x0043C1E7 | FUN_0043c1e7 | N/A — CDaoFieldInfo sub-destructor step 1 |
| 0x0043C1F6 | FUN_0043c1f6 | N/A — CDaoFieldInfo destructor step 0 |
| 0x0043C209 | FUN_0043c209 | N/A — CDaoFieldInfo SEH epilog |
| 0x0043C430 | ~_Timevec | N/A — CRT _Timevec destructor (actually get_text_height, FID misidentification) |
| 0x0043C560 | GetActiveView (at 0x560) | N/A — COleClientItem::GetActiveView (returns *(this+8)) |
| 0x0043C590 | GetActiveView (at 0x590) | N/A — COleClientItem::GetActiveView (returns *(this+4)) |

## UI — User Interface (88 functions)

### Advisor Dialog Wrappers & Event Loops
| Addr | Name | Verdict |
|------|------|---------|
| 0x00430267 | FUN_00430267 | N/A — Intel scroll offset setter |
| 0x0043028A | FUN_0043028a | N/A — Intel city list click handler |
| 0x0043039D | FUN_0043039d | N/A — Intelligence city list renderer (INTELLCITY) |
| 0x004305E7 | FUN_004305e7 | N/A — SEH cleanup stub |
| 0x004305FD | FUN_004305fd | N/A — SEH epilog stub |
| 0x0043060B | FUN_0043060b | N/A — Open intelligence dialog |
| 0x00430822 | FUN_00430822 | N/A — Diplomacy timeout checker |
| 0x004308AE | FUN_004308ae | N/A — Foreign Advisor main dialog (REPORTFOREIGN/PARLEY*) |
| 0x0043154F | FUN_0043154f | N/A — Foreign advisor SEH cleanup |
| 0x00431565 | FUN_00431565 | N/A — Foreign advisor SEH epilog |
| 0x00431573 | FUN_00431573 | N/A — Wonders of the World report renderer |
| 0x00431C56 | FUN_00431c56 | N/A — Wonders scroll setter |
| 0x00431C73 | FUN_00431c73 | N/A — Top 5 Cities dialog wrapper |
| 0x00431D22 | FUN_00431d22 | N/A — Power Graph renderer (demographics chart) |
| 0x004325C9 | FUN_004325c9 | N/A — Power graph SEH cleanup 1 |
| 0x004325D5 | FUN_004325d5 | N/A — Power graph font cleanup 2 |
| 0x004325E1 | FUN_004325e1 | N/A — Power graph font cleanup 3 |
| 0x004325ED | FUN_004325ed | N/A — Power graph object destructor |
| 0x00432603 | FUN_00432603 | N/A — Power graph SEH epilog |
| 0x00432611 | FUN_00432611 | N/A — Historians report renderer (HISTORIANS/HISTORIES) |
| 0x00432BF8 | FUN_00432bf8 | N/A — Historians SEH cleanup |
| 0x00432C0E | FUN_00432c0e | N/A — Historians SEH epilog |
| 0x00432C1C | FUN_00432c1c | N/A — Top 5 Cities renderer |
| 0x00433122 | FUN_00433122 | N/A — Top 5 Cities dialog wrapper v2 |
| 0x004331D1 | FUN_004331d1 | N/A — Demographics row renderer (rank display) |
| 0x00433434 | FUN_00433434 | N/A — Demographics main renderer (11 stats) |
| 0x00434D8A | FUN_00434d8a | N/A — Demographics dialog wrapper |
| 0x00434E39 | FUN_00434e39 | N/A — Attitude Advisor renderer |
| 0x00435D15 | FUN_00435d15 | N/A — Attitude Advisor dialog wrapper |
| 0x00435DC4 | FUN_00435dc4 | N/A — Retirement/Score screen renderer |
| 0x004361CC | FUN_004361cc | N/A — Score dialog wrapper |
| 0x00436287 | FUN_00436287 | N/A — Panel redraw trigger |
| 0x004362E2 | FUN_004362e2 | N/A — Hall of Fame renderer |
| 0x00436B92 | FUN_00436b92 | N/A — HoF display invalidator |
| 0x00436BB7 | FUN_00436bb7 | N/A — Hall of Fame dialog wrapper |
| 0x00436DD7 | FUN_00436dd7 | N/A — HoF records initializer |
| 0x00436E28 | FUN_00436e28 | N/A — Load Hall of Fame (HALLFAME.DAT) |
| 0x00436ED2 | FUN_00436ed2 | N/A — Save Hall of Fame (HALLFAME.DAT) |
| 0x00436F5A | FUN_00436f5a | N/A — Submit HoF entry |
| 0x004371B3 | FUN_004371b3 | N/A — Credits wrapper |
| 0x004371C8 | FUN_004371c8 | N/A — Credits init |
| 0x004371E2 | FUN_004371e2 | N/A — Credits text pool init |
| 0x0043720F | FUN_0043720f | N/A — Credits text pool free |
| 0x0043722C | FUN_0043722c | N/A — Credits add string |
| 0x00437284 | FUN_00437284 | N/A — Credits get string by index |
| 0x004372CD | FUN_004372cd | N/A — Credits load section (CREDITS/MPCREDITS/etc.) |
| 0x0043742F | FUN_0043742f | N/A — Credits scroll renderer |
| 0x00437A10 | FUN_00437a10 | N/A — Credits full redraw |
| 0x00437A2A | FUN_00437a2a | N/A — Credits scroll next |
| 0x00437A4A | FUN_00437a4a | N/A — Credits dialog main |
| 0x00437C6F | FUN_00437c6f | N/A — Credits invalidate display |
| 0x00437C8A | FUN_00437c8a | N/A — Credits timer tick |
| 0x00437CCD | FUN_00437ccd | N/A — Military log scroll setter |
| 0x00437CEA | FUN_00437cea | N/A — Military/combat log renderer |
| 0x0043856B | FUN_0043856b | N/A — Military Advisor dialog setup |
| 0x004386B8 | FUN_004386b8 | N/A — Military log click handler |

### UI Helper / Font / Drawing Utilities
| Addr | Name | Verdict |
|------|------|---------|
| 0x0043C260 | FUN_0043c260 | N/A — UI dialog object initializer |
| 0x0043C3F0 | FUN_0043c3f0 | N/A — GDI palette/color setter |
| 0x0043C460 | FUN_0043c460 | N/A — Font create (2 params) |
| 0x0043C4C0 | FUN_0043c4c0 | N/A — Font create (3 params) |
| 0x0043C520 | FUN_0043c520 | N/A — Font destroy |
| 0x0043C5C0 | FUN_0043c5c0 | N/A — Surface release |
| 0x0043C5F0 | FUN_0043c5f0 | N/A — Window manage |
| 0x0043C630 | FUN_0043c630 | N/A — List disable sort |
| 0x0043C660 | FUN_0043c660 | N/A — List enable sort |
| 0x0043C690 | FUN_0043c690 | N/A — Object field initializer (*ECX=0) |
| 0x0043C6C0 | FUN_0043c6c0 | N/A — Font recreate |
| 0x0043C740 | FUN_0043c740 | N/A — Dialog destructor |
| 0x0043C790 | FUN_0043c790 | N/A — Win32 OffsetRect wrapper |
| 0x0043C7C0 | FUN_0043c7c0 | N/A — Draw border rectangle |
| 0x0043C810 | FUN_0043c810 | N/A — Text append ordinal suffix |
| 0x0043C840 | FUN_0043c840 | N/A — String concatenation |
| 0x0043C870 | FUN_0043c870 | N/A — Text append integer |
| 0x0043C8A0 | FUN_0043c8a0 | N/A — Text append gold amount |
| 0x0043C8D0 | FUN_0043c8d0 | N/A — Draw text at (x,y) |
| 0x0043C910 | FUN_0043c910 | N/A — Draw text centered |
| 0x0043C950 | FUN_0043c950 | N/A — Draw text right-aligned |
| 0x0043C990 | FUN_0043c990 | N/A — Dialog set slot value |
| 0x0043C9D0 | FUN_0043c9d0 | N/A — Dialog set title |
| 0x0043CA10 | FUN_0043ca10 | N/A — Dialog create section |
| 0x0043CA50 | FUN_0043ca50 | N/A — Text append population |
| 0x0043CA80 | FUN_0043ca80 | N/A — Text append city name |
| 0x0043CAB0 | FUN_0043cab0 | N/A — Get civ background color (UI palette lookup) |
| 0x0043CB30 | FUN_0043cb30 | N/A — Get civ foreground color (UI palette lookup) |
| 0x0043CBB0 | FUN_0043cbb0 | N/A — Surface/bitmap destructor |
| 0x0043CDA6 | FUN_0043cda6 | N/A — Format population string ("X,000") |
| 0x0043CE5A | FUN_0043ce5a | N/A — Format city population string ("X,000") |
| 0x0043F444 | FUN_0043f444 | N/A — Format city name or "None" |

## GL — Game Logic: City Data Accessors & Utilities (16 functions)

### FUN_0043cc00 — city_set_civ_knowledge (126 bytes)
**Binary**: Sets bit in city visibility bitmask (`city[+0x0C] |= (1 << civId)`) and stores current city size in per-civ knowledge field (`city[+0x0D+civId] = city.size`).
**JS**: Not directly ported as a standalone function. City visibility in JS uses `city.visibleTo` Set or similar mechanism. The binary's bit-packed visibility bitmask and per-civ size caching is a binary-specific optimization not needed in JS.
**Verdict**: NOT PORTED (binary-specific optimization for intel reports; no gameplay impact)

### FUN_0043cc7e — city_calc_population_points (103 bytes)
**Binary**: Calculates triangular number: `sum(1..size)`. Returns `max(result, 1)`. This yields size 1→1, 2→3, 3→6, etc.
**JS**: Referenced in `engine/reference/advisor-formulas.js` line 50: `populationPointsFormula: 'size * (size + 1) / 2'` with min of 1. The JS uses the closed-form `n*(n+1)/2` which is mathematically equivalent to the binary's iterative sum. Used in demographics display only; not in core game logic.
**Verdict**: YES (match — documented in reference, equivalent formula)

### FUN_0043cce5 — civ_calc_total_population (193 bytes)
**Binary**: Sums `city_calc_population_points` for all cities owned by `civId`. Clamps to `[1, 32000]`.
**JS**: Referenced in `engine/reference/advisor-formulas.js` line 52: `populationPointsCap: 32000`.
**Verdict**: YES (match — documented in reference)

### FUN_0043cef9 — city_count_content_citizens (125 bytes)
**Binary**: Starts with `(city.flags[+0x07] & 4) != 0` (1 if has courthouse/content flag). If `DAT_0064bc60 & 4` (Crusade effect active), adds 1 for each wonder in the city from `DAT_00655be6[28]` wonder-city mapping.
**JS**: Not ported as standalone. Content citizen logic is in `happiness.js` which implements content counting differently (uses government table + difficulty).
**Verdict**: NOT PORTED (demographics display helper; content count in JS uses different approach)

### FUN_0043cf76 — find_city_at (245 bytes)
**Binary**: Finds city at coordinates (x,y). Validates tile exists and continent >= 0. Iterates city slots matching x,y coordinates. Returns city index or -1.
**JS**: No direct equivalent function name. The JS codebase uses `state.cities.findIndex()` or inline loops throughout. The `findCityById` in `utils.js` searches by ID not coordinates. Various places do coordinate lookup inline.
**Verdict**: YES (functionally equivalent — logic is simple coordinate matching, done inline in JS)

### FUN_0043d07a — find_nearest_city (400 bytes)
**Binary**: Finds nearest city matching filters: owner (param_3 by continent if >= 0, param_3 == -2 checks building 0x22 = Port Facility for coastal), distance via `FUN_005ae31d`. Returns city index or -1, stores distance in `DAT_0063f660`.
**JS**: Used in AI code (various places). The parameterized owner/continent/coastal filter is split across different call sites.
**Verdict**: NOT PORTED (AI utility; similar inline logic exists in JS AI code)

### FUN_0043d20a — has_building (122 bytes)
**Binary**: Checks if city has building. Converts building_id (1-34) to byte/bit offset, tests bit in city improvement bitmask at `city[+0x34]` (5 bytes). Returns 0 or 1.
**JS**: `cityHasBuilding(city, id)` in `engine/utils.js:12` — uses `city.buildings.has(id)` (Set-based). Functionally identical.
**Verdict**: YES (match)

### FUN_0043d289 — set_building (186 bytes)
**Binary**: Sets or clears building bit in city improvement bitmask. param_3=0 clears, param_3!=0 sets. Same byte/bit conversion as has_building.
**JS**: In JS, buildings are managed via `city.buildings.add(id)` / `city.buildings.delete(id)` (Set-based). Used in production.js, cityturn.js, reducer.js.
**Verdict**: YES (match — different data structure, identical semantics)

### FUN_0043d348 — city_has_supply_commodity (92 bytes)
**Binary**: Checks if city supplies commodity. Scans `supply_commodities[3]` at `city[+0x3B]`. Returns 1 if found, 0 otherwise.
**JS**: Not directly ported. Trade route commodities are handled through `calcSupplyDemand` results, not stored as city fields.
**Verdict**: NOT PORTED (trade route commodity check; not needed since JS recomputes supply/demand)

### FUN_0043d3a4 — city_has_demand_commodity (92 bytes)
**Binary**: Checks if city demands commodity. Scans `demand_commodities[3]` at `city[+0x3E]`. Returns 1 if found, 0 otherwise.
**JS**: Not directly ported. Same reasoning as supply commodity above.
**Verdict**: NOT PORTED (trade route commodity check; JS recomputes)

### FUN_0043d400 — calc_city_trade_desirability (8227 bytes)
**Binary**: Massive function computing 16 supply and 16 demand desirability scores for trade commodities. Examines 21-tile city radius terrain, applies tech/building/government/continent/era modifiers. Sorts and assigns top 3 supply to `city[+0x3B]` and top 3 demand to `city[+0x3E]`.
**JS**: Ported as `calcSupplyDemand()` in `engine/production.js:665`. Comprehensive port covering all 16 supply and 16 demand formulas.

**Discrepancies found**:

1. **Supply[14] (Oil) — nuclear flag check**: Binary uses `DAT_00655b90 == '\0'` (global game flag: has ANY civ discovered nuclear fission) to divide by 8. JS uses `!hasTech(58)` which is per-civ (checks if THIS city's owner has Nuclear Fission). The binary's global flag means oil supply is boosted for ALL civs once anyone discovers nuclear fission.

2. **Supply[14] (Oil) — missing continent modifiers**: Binary has `if (continent == 0x11) supply[14] *= 3` and `if (continent > 1 && (continent-1) & 7 == 0) supply[14] += supply[14] >> 1`. These continent-based modifiers are absent from the JS implementation.

3. **Supply[14] (Oil) — clampedTier formula**: Binary uses `clamp(sizeTier/2 - 2, 1, 2)` via `thunk_FUN_005adfa0`. JS uses `Math.max(1, Math.min(2, Math.trunc(sizeTier / 2) - 2))` then wraps it in `Math.max(1, clampedTier2)`. The double-clamping with `Math.max(1,...)` is redundant since `Math.max(1, ...)` is already enforced by `Math.min(2, ...)` when the inner value is already at least 1. Functionally equivalent.

4. **Demand[4] (Salt) — loop count**: Binary iterates with `local_18 = 8; while (local_18 != 0 && local_88 > 0)` where `local_88 = city.size` and `local_9c = clamp(local_88, 0, 5)`. JS uses `for (let step = 0; step < 5 && weight > 0; step++)` with same halving logic. The binary's loop can iterate more than 5 times if size > 25 (weight halves 4 times: 8→4→2→1→0, so max 4 iterations with weight>0, but the loop continues while weight != 0 not weight > 0... actually `local_18 != 0` stops when weight reaches 0, and 8>>1>>1>>1 = 1, 1/2 = 0 in integer). Both stop after at most 4 productive iterations (weight 8,4,2,1). JS limits to 5 steps which is sufficient. **Match**.

**Verdict**: PARTIAL (fully ported but 2 discrepancies in supply[14]: global vs per-civ nuclear check, missing continent modifiers)

### FUN_0043f493 — assign_city_name (778 bytes)
**Binary**: Assigns a name to a new city from civ-specific name list. Reads from CITY.TXT files, handles name counter increment and @EXTRA overflow sections. Copies max 15 chars.
**JS**: City naming is handled via `getCityName()` in reducer/actions. The mechanism differs (JS uses a predefined array) but the intent is identical.
**Verdict**: YES (match — different mechanism, same outcome)

### FUN_0043f7a7 — update_tile_ownership (265 bytes)
**Binary**: Sets tile ownership radius (0x2D = 45 tiles extended) around a city. Updates tile byte5 upper nibble to owning civ. Called on city founding.
**JS**: Not directly ported as standalone. Tile ownership in JS is managed differently (no per-tile civ ownership byte). City radius is computed dynamically.
**Verdict**: NOT PORTED (tile ownership stored differently in JS; computed on demand)

### create_city @ 0x0043F8B0 (2677 bytes)
**Binary**: Full city founding function. Key steps:
1. Find empty city slot (max 255 cities)
2. Increment civ city count
3. Set city coords, owner, unique ID
4. Initialize size to 1, foundedBy to owner
5. Set initial building: if `DAT_00655c18 < 0` → no buildings; else all civs discovered + set improvements
6. Auto-assign initial production (best building by shield cost / benefit ratio)
7. If first city: add Palace (building 1), set capital coords, reveal surrounding tiles for AI
8. If not human + turn > 40: bonus population based on `(turn - 20) / 20` clamped 2-10, add Granary(4)/Temple(5)/Market(6)
9. Initialize trade route slots, call `assign_city_name`, `update_tile_ownership`, `calc_city_trade_desirability`
10. Multiplayer sync via network packet

**JS**: City founding is split across `reduce/move-unit.js` (goody hut Advanced Tribe), AI code (`ai/cityai.js:foundCity`), and the reducer `BUILD_CITY` action. The core city creation uses a city object literal with `buildings: new Set()`.

Key differences from binary:
- Binary awards bonus population for AI cities founded after turn 40; JS does not implement this
- Binary scans for optimal initial building production; JS defaults to a unit
- Binary's `DAT_00655c18` discovery-by-contact visibility logic is not ported
- Binary initializes trade route commodity slots; JS does not

**Verdict**: PARTIAL (core founding logic matches, but AI bonus population and initial production selection not ported)

## Summary
| Verdict | Count |
|---------|-------|
| N/A (FW/UI/design) | 85 |
| YES (match) | 7 |
| PARTIAL (functional) | 2 |
| NO → FIXED | 0 |
| NOT PORTED | 6 |
| **Total** | **114** |

Breakdown: FW=12, UI=88 (56 advisor dialog/render + 17 UI helpers + 15 format/display), GL=14

## Discrepancies Found: 2

### Discrepancy 1: Supply[14] (Oil) — Global vs Per-Civ Nuclear Flag
**File**: `charlizationv3/engine/production.js:825`
**Binary** (FUN_0043d400, line 5028): `if (DAT_00655b90 == '\0') supply[14] >>= 3;`
DAT_00655b90 is a **global** game flag indicating whether ANY civilization has discovered nuclear fission.
**JS**: `if (!hasTech(58)) supply[14] = Math.trunc(supply[14] / 8);`
`hasTech(58)` checks whether the **city's owner** specifically has Nuclear Fission (tech 58).
**Impact**: In the binary, once any civ discovers Nuclear Fission, ALL civs get full oil supply values. In JS, only the discovering civ gets the boost. This could affect trade route commodity assignments for less-advanced civs.

### Discrepancy 2: Supply[14] (Oil) — Missing Continent Modifiers
**File**: `charlizationv3/engine/production.js:826-830`
**Binary** (FUN_0043d400, lines 5035-5042):
```c
if (local_a4 == 0x11) {            // continent == 17
    DAT_0063f6a0 = DAT_0063f6a0 * 3;
} else if ((1 < local_a4) && ((local_a4 - 1 & 7) == 0)) {  // continent > 1 && (cont-1)%8==0
    DAT_0063f6a0 = DAT_0063f6a0 + (DAT_0063f6a0 >> 1);     // +50%
}
```
**JS**: These continent-based multipliers for oil supply are completely absent. The JS goes directly from the `/8` check to the sizeTier clamp.
**Impact**: Cities on continent 17 should get 3× oil supply; cities on continents 9, 17, 25... should get +50%. Missing these modifiers reduces oil supply values for those cities.

## Functions audited: 114
