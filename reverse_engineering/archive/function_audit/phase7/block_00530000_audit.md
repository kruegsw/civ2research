# Block 00530000 -- Phase 7 Audit

**Functions in this block: 23**
**System: C++ iostream stubs, AI unit strategy (barbarians + settler/worker/diplomat/caravan/spy/military), AI per-turn civ processing, AI city defense scoring**

---

## FW -- Framework / C++ Library (5 functions)

egptr | 28B | N/A (C++ streambuf::egptr() -- returns buffer end pointer at this+0x2C; Visual Studio 1998 Debug library match)
FUN_00530eb0 | 33B | N/A (streambuf setter -- stores param_1 at ECX+0x2C; likely streambuf::setegptr or similar)
FUN_00530fb0 | 32B | N/A (setter -- stores 1 at ECX+0x34; likely a "dirty" or "ready" flag on a stream/window object)
width | 28B | N/A (C++ ios::width() -- returns field width at this+0x30; Visual Studio 1998 Debug library match)
FUN_00531010 | 93B | N/A (constructor/init -- SEH frame setup, calls thunk_FUN_0040f480, zeros ECX+0x44; likely initializes a window or dialog object)

---

## UI -- User Interface (2 functions)

FUN_00530ee0 | 167B | N/A (dialog_create_popup -- sets up GDI rect via gdi_C035, calls create_window_C0F0 with style params; initializes dialog control fields at ECX+0x2C/0x30/0x34)
FUN_005310a0 | 207B | N/A (dialog_create_child -- creates child window via create_window_8E3F with 6 params, stores window handle at ECX+0x44 and DC at ECX+0x48; initializes fields 0x2C-0x40 to zero or passed values)
FUN_005311b0 | 33B | N/A (setter -- stores param_1 at ECX+0x2C; simple field setter on a window/dialog object, identical pattern to FUN_00530eb0)
FUN_005311e0 | 33B | N/A (setter -- stores param_1 at ECX+0x30; simple field setter, likely sets "width" or "position" field on a dialog object)

---

## GL -- Game Logic: AI Helper Utilities (6 functions)

FUN_00531210 | 83B | N/A (ai_set_current_player -- validates param_1 in range [0,8], sets global current player index DAT_0062803c and player data pointer PTR_DAT_00628040 = base + player * 0x594)
FUN_00531263 | 36B | N/A (ai_map_offset -- returns linear map tile offset: DAT_006d116a * param_2 + param_1 + DAT_006365ec; pure coordinate-to-address calculation)
FUN_00531287 | 93B | N/A (ai_get_unit_role -- looks up unit type's domain from unit definition table; if domain==5 (diplomat) and unit has flag 0x200, returns 0x15 (spy role); otherwise returns domain value)
FUN_005312e4 | 643B | N/A (ai_find_best_adjacent_tile -- scores all 9 tiles (8 neighbors + center) around a unit: for each valid land tile with no city and no enemy zone of control, counts adjacent unoccupied tiles and adds bonus (+12) if adjacent to enemy civ with war status and tile is center; returns direction index of highest-scoring tile, or -1 if none found; used for settler city-site micro-evaluation)
FUN_00531567 | 160B | N/A (ai_wake_goto_units -- iterates unit stack at tile via thunk_FUN_005b2d39/005b2c82; for units with order==3 (goto) whose domain matches param_2 bitmask, clears order to 0xFF (idle); if param_3==0, skips the clear)
FUN_00531607 | 76B | N/A (ai_set_unit_goto -- sets unit order to 0x0B (goto), stores destination type param_2 at unit+0x0C, target x/y at unit+0x12/0x14)

---

## GL -- Game Logic: AI Settler/Worker/Caravan Target Selection (1 function)

FUN_00531653 | 501B | N/A (ai_find_goto_near_city -- for a unit with goto order to a city at param_3/param_4, searches 20-tile radius for a same-continent tile adjacent to the target continent with no city owner; adjusts destination to the found tile and calls ai_set_unit_goto)

---

## AI -- AI Per-Turn Master Processing (1 function)

FUN_0053184d | 14665B | N/A (ai_begin_turn_for_civ -- **massive** per-turn AI function for a civilization. Key operations:
- Checks embassy visibility and moves military units toward enemy cities within sight range
- Zeros and recalculates per-continent unit counts (DAT_0064c832), military power (DAT_0064c8b2), city counts (DAT_0064c932), threat assessment (DAT_0064c9f2)
- Iterates all units: clears stale orders, handles diplomat/spy flag 0x200 (unhoming), updates unit counts per continent, tracks support costs
- Computes per-continent threat level (DAT_0064ca32): 0=uncontested, 1=contested, 4=needs_fortress, 5=safe
- Handles barbarian-specific AI: special goto targets at hardcoded coordinates (0x2B,0x35), (0x4C,0x22), (0x3E,0x48), (0x43,0x5B) with random direction assignment
- Iterates all units for worker orders: assigns settlers to work sites from DAT_0064cab4 table, checks distance-to-work and travel time, handles unit obsolescence/upgrade
- Kills civs with 0 settlers+cities; calls thunk_FUN_00493602 for diplomacy updates
- Clears city auto-build flags at end of turn)

**Comparison with JS engine**: The JS engine's `cityturn.js` handles city-level processing but does NOT contain this civ-level AI processing. The JS `ai/` directory would be the relevant comparison. Key discrepancy areas:
- **Worker order assignment logic** (DAT_0064cab4 work site table, priority scoring by distance/improvement type/continent threat) is highly complex in binary but likely simplified or absent in JS AI
- **Per-continent threat assessment** (the 6-level DAT_0064ca32 scoring with fortress check, allied unit comparison) has no direct JS equivalent observed
- **Barbarian hardcoded coordinates** for special movement targets are binary-specific scenario logic

---

## AI -- Barbarian Unit AI (1 function)

FUN_005351aa | 6102B | N/A (ai_barbarian_unit_turn -- handles barbarian (player 0) unit orders each turn:
- For settler-type units (domain >= 5): increments move counter, checks for city founding adjacent to own-continent cities within 3 tiles of enemy player cities; handles city naming, ransom, and pillaging via BARBARIANSLAND/RANSOMCITY event lookup
- For land/sea units: evaluates 8 adjacent tiles, scores by terrain defense value + random noise, biases toward enemy city direction if known, avoids own-territory tiles
- Special logic for Diplomats (unit type 9): can pillage improvements if near barbarian city
- Returns 0 if unit got an order, 1 if unit was disbanded/killed)

**Comparison with JS engine**: No barbarian AI exists in the JS engine. The JS `ai/` files handle generic AI player logic, not barbarian-specific behavior. This entire function is **missing from JS**.

---

## AI -- AI City Attack Evaluation (1 function)

FUN_005369f3 | 470B | N/A (ai_rally_units_to_city -- when a city is captured/threatened (param_1 = city index), iterates all units: for non-barbarian enemy units that are settlers (domain check), have stack size > 1, are on ocean, and are within movement range of the city, sets their goto order to the city's coordinates)

---

## AI -- AI Continent Defense Scoring (1 function)

FUN_00536bc9 | 131B | N/A (ai_calc_garrison_strength -- computes weighted garrison strength for a civ on a continent: takes city count from DAT_0064c932, processes in groups of 5 (capped), multiplied by decreasing weight 3/2/1; returns total score)

---

## AI -- AI Military Unit Decision: Pirate/Privateer Attacks (1 function)

FUN_00536c4c | 1760B | N/A (ai_decide_pirate_attack -- decides if a sea unit should attack an undefended/weak enemy city:
- Iterates all cities, finds ones owned by other civs with large populations, checks military power ratio (2:3 attacker:defender or has 0x10 flag), and verifies no peace treaty (flag 0x104 == 0x100, meaning contact but no peace)
- Scores targets by adjacent tile friendliness, city size, and distance reachability
- If attack decided: teleports unit adjacent to target city, sets diplomacy flags (0x20000 for surprise war, removes 0x10 flag), or adjusts reputation if ally is being attacked
- Returns direction^4 on attack, 8 on no action)

---

## AI -- AI Master Movement Decision (1 function)

FUN_00537331 | 5855B | N/A (ai_decide_unit_movement -- comprehensive AI movement/attack decision for combat units:
- param_5 determines behavior mode: 0=settler escort, 3=military assault
- For settlers (param_5==0): searches for undefended enemy units within movement range, attacks weakest; if unit has multi-turn capability, may settle near enemy cities
- For military (param_5==3): finds closest visible enemy unit, evaluates combat odds comparing attack/defense/hp stats, factors in veteran status and terrain defense; assigns goto toward target or nearest friendly city if retreating
- Considers allied barbarian cities as intermediate waypoints
- Returns direction on attack, 0xFFFFFFFF on goto assigned, 0xFFFFFFFE on settler action, 0xFFFFFF9D on no action, 8 on idle)

**Comparison with JS engine**: The JS AI in `ai/` has much simpler movement logic. The binary's detailed combat odds evaluation, multi-city waypoint routing, and settler escort coordination are far more sophisticated than the JS implementation.

---

## AI -- AI Master Unit Order Assignment (1 function)

FUN_00538a29 | 44777B | N/A (ai_assign_unit_orders -- **the largest function in these blocks** at ~45KB. This is the master AI decision function called for each non-barbarian AI unit each turn. High-level flow:

1. **Retreat/Heal check**: If unit is damaged, may retreat to nearest city (goto order 0x64)
2. **Combat engagement**: If enemy unit on same tile as own city, engages immediately
3. **Diplomat/Spy AI** (role==6): Scores all cities by distance, continent, hostility; sends diplomat to highest-value target; role==7 handles trade route establishment
4. **Settler AI** (role==5): Evaluates city founding sites within 20-tile radius by continent food/production score; checks if city would overlap existing cities; builds roads/irrigation at current location if high-value; handles fortress construction at strategic chokepoints
5. **Military AI** (role < 5): Calls FUN_00537331 for movement/attack decisions; evaluates garrison needs vs offensive opportunities; handles fortification, sentry orders
6. **Worker AI** (role==4, settlers with multi-turn orders): Complex work-site selection from DAT_0064cab4 table; prioritizes road building toward threatened continents, fortress placement at borders, irrigation/mining at city tiles
7. **Explorer/Diplomat special**: Seeks barbarian camps for diplomats, evaluates bribery targets
8. **Naval AI**: Seeks coastal bombardment positions, transport loading points
9. **Final fallback**: If no order assigned, sets unit to sentry or fortify

Key state tracked: continent ownership, per-continent threat levels, city garrison strength via FUN_00536bc9, distance to nearest own city, diplomatic stance with all civs)

**Comparison with JS engine**: This function represents the core of Civ2's AI and is by far the most complex logic in the binary. The JS `ai/` implementation covers only basic unit ordering. Major discrepancies:
- **City founding site evaluation** (20-tile radius, continent scoring, overlap checking) is absent from JS
- **Fortress/road construction priorities** based on continent threat levels are not in JS
- **Diplomat/spy target scoring** with hostility/distance/value weighting is not in JS
- **Naval bombardment and transport coordination** is not in JS
- **The entire worker work-site priority system** (DAT_0064cab4, 48-slot work queue with priority/distance scoring) is not in JS

---

## Summary

| Category | Count | Notes |
|----------|-------|-------|
| FW (Framework/Library) | 5 | C++ iostream stubs, SEH/constructor |
| UI (User Interface) | 4 | Dialog creation helpers, field setters |
| GL (Game Logic helpers) | 6 | AI utility: player select, map offset, unit role, best tile finder, wake units, set goto |
| AI (AI Logic) | 8 | The entire AI brain: per-turn processing, barbarian AI, military/settler/worker/diplomat decisions, combat evaluation, city attack rallying, garrison scoring |
| **Total** | **23** | |

### Key Findings

1. **Block 0x0053 is the AI brain of Civilization II.** It contains the master AI decision loop (FUN_00538a29 at 45KB), per-turn civ processing (FUN_0053184d at 15KB), barbarian AI (FUN_005351aa at 6KB), and military movement logic (FUN_00537331 at 6KB).

2. **No GL functions match existing JS engine code** -- all game-logic functions in this block are AI-specific and the JS engine does not implement equivalent AI logic at this fidelity level.

3. **The barbarian AI (FUN_005351aa) contains hardcoded map coordinates** for special barbarian movement targets, which are scenario-specific and not present in any JS code.

4. **The continent threat assessment system** (DAT_0064ca32 with 6 threat levels) drives all AI military decisions but has no JS counterpart.
