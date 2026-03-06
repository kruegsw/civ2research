# Phase 1 Analysis: block_00530000 (0x00530000–0x0053FFFF)

## Function Table

### Cluster: C++ Stream/Window Framework

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00530E80 | stub | streambuf::egptr | FRAMEWORK | 0 (thiscall) | char* | Standard C++ streambuf::egptr — returns end-of-get-area pointer at this+0x2c | HIGH |
| 0x00530EB0 | stub | FUN_00530eb0 | streambuf_setegptr | 1 (thiscall) | void | Setter for this+0x2c (complementary to egptr); sets end-of-get-area pointer | HIGH |
| 0x00530EE0 | small | FUN_00530ee0 | listbox_create_window | 6 (thiscall) | void | Creates a list-type child window: sets PTR_DAT_00637e68, calls gdi_C035, thunk_FUN_0040f730(style=2), create_window_C0F0. Initializes this+0x2c/0x30/0x34 | MEDIUM |
| 0x00530FB0 | stub | FUN_00530fb0 | listbox_set_flag | 0 (thiscall) | void | Sets this+0x34=1 — likely a "needs refresh" or "dirty" flag | LOW |
| 0x00530FE0 | stub | ios::width | FRAMEWORK | 0 (thiscall) | int | Standard C++ ios::width — returns field width from this+0x30 | HIGH |
| 0x00531010 | small | FUN_00531010 | scrollbar_init | 0 (thiscall) | int | SEH-protected initialization: calls thunk_FUN_0040f480, sets this+0x44=0. Returns this. | MEDIUM |
| 0x005310A0 | small | FUN_005310a0 | scrollbar_create_window | 6 (thiscall) | void | Creates a scrollbar-type child window: sets PTR_DAT_00637e64, calls thunk_FUN_0040f730(style=3), create_window_8E3F. Stores child hwnd at this+0x44, calls FUN_005dcdf9 for this+0x48 | MEDIUM |
| 0x005311B0 | stub | FUN_005311b0 | scrollbar_set_field_2c | 1 (thiscall) | void | Setter for this+0x2c | LOW |
| 0x005311E0 | stub | FUN_005311e0 | scrollbar_set_field_30 | 1 (thiscall) | void | Setter for this+0x30 | LOW |

### Cluster: AI Civ/Unit Management Core

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00531210 | small | FUN_00531210 | ai_set_active_civ | 1 (int civId) | void | Sets _DAT_0062803c=civId and PTR_DAT_00628040=&civ[civId] (DAT_0064c6a0+civId*0x594). Bounds-checked: 0..8 | HIGH |
| 0x00531263 | stub | FUN_00531263 | map_coord_to_linear | 2 (int x, int y) | int | Returns DAT_006d116a*y + x + DAT_006365ec. Computes linear map tile index from (x,y) coordinates. DAT_006d116a is map width, DAT_006365ec is tile array base | HIGH |
| 0x00531287 | small | FUN_00531287 | ai_get_unit_role | 1 (int unitIdx) | int | Reads unit_type[unit[unitIdx].type_id].role (utype+0x12, stride 0x14). If role==5 and unit status has bit 0x200, returns 0x15 (special settler role). Role values map to AI behavior categories | HIGH |
| 0x005312E4 | large | FUN_005312e4 | ai_find_best_settle_dir | 1 (int unitIdx) | int | Evaluates 9 candidate tiles (8 neighbors + center) for city founding. For each candidate, checks 8 surrounding neighbors for empty land, enemy-owned territory, and allied contacts. Scores candidates (bonus +12 for enemy territory). Returns best direction index (0-8) or -1. Uses DAT_00628350/60 (8-dir dx/dy), calls map validation, continent checks, city owner checks | HIGH |
| 0x00531567 | small | FUN_00531567 | ai_cancel_goto_on_domain | 3 (int unitIdx, uint domainMask, int execute) | void | Iterates linked units at tile, cancels GOTO orders (0x03) if unit's domain matches the bitmask. Sets orders=0xFF (no orders). If execute==0, doesn't actually cancel. Uses unit link traversal (thunk_FUN_005b2d39/5b2c82) | MEDIUM |
| 0x00531607 | small | FUN_00531607 | ai_set_goto_order | 4 (int unitIdx, byte aiRole, short gotoX, short gotoY) | void | Sets unit orders=0x0B (goto variant), aiRole byte at +0x0C, goto target at +0x12/+0x14. This is the "set goto target" for AI movement | HIGH |
| 0x00531653 | medium | FUN_00531653 | ai_set_goto_via_coast | 4 (int unitIdx, undefined4 role, int targetX, int targetY) | void | Finds a coastal tile on the same continent as the unit that has adjacent ocean tiles sharing the target's continent. Then calls ai_set_goto_order to route the unit there. Used for sea-crossing movement planning | MEDIUM |

### Cluster: AI Turn Processing — Master Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0053184D | xlarge | FUN_0053184d | ai_process_civ_turn | 1 (uint civId) | void | **14665 bytes — the AI per-civ turn processor.** Enormous function handling: (1) hatred-triggered settler redirection to enemy cities, (2) per-continent military/city/population statistics (DAT_0064c832..DAT_0064c9f2), (3) unit status flag maintenance (fortify bits 0x100/0x200, veteran 0x0200), (4) diplomat/explorer settler assignment to continents, (5) per-continent threat assessment (DAT_0064ca32), (6) AI goal evaluation (DAT_0064cab4..cab9 = AI continent goals at civ+0x1044), (7) unit obsolescence/upgrade, (8) city flag maintenance, (9) kill_civ when no cities/units remain. References strings "BARBARIANSLAND". Calls thunk_kill_civ, thunk_FUN_00442541 (ai_continent_status_change), thunk_FUN_005b36df (move_unit), thunk_FUN_0049301b (ai_request_unit). Key DATs: DAT_0064bcdb (COSMIC radius), DAT_0064c6c0 (treaty flags), DAT_0064ca32 (per-continent status), DAT_0064cab4 (AI goals) | HIGH |

### Cluster: Barbarian AI

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005351AA | xlarge | FUN_005351aa | ai_barbarian_unit_turn | 0 | undefined4 | **6102 bytes — barbarian unit AI.** Reads DAT_00655afe (current unit being processed). Handles: (1) air unit bombing/landing targeting, (2) naval raider behavior including city ransom (string "RANSOMCITY", "BARBARIANS"), (3) land unit pillaging and city capture, (4) settler city-founding logic, (5) unit direction scoring with terrain/road preferences. Calls barbarian-specific events (thunk_FUN_004442e0 with "BARBARIANSLAND"), uses __chdir/FUN_004a2379 for barbarian event file loading. Returns 0 on success, 1 on unit killed/disbanded | HIGH |

### Cluster: AI City Defense & Military Assessment

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005369F3 | small | FUN_005369f3 | ai_alert_nearby_units | 1 (int cityIdx) | void | When a city is threatened, iterates all alive AI units. If a unit is on a different civ, not at war, has range (air unit), strength > 1, and is within range of the city, sets that unit's orders to GOTO toward the city. Defensive scramble | MEDIUM |
| 0x00536BC9 | small | FUN_00536bc9 | ai_calc_continent_city_weight | 2 (int civId, int continentId) | int | Computes a weighted score from city count on a continent. Uses a descending weight (3,2,1) for batches of up to 5 cities: first 5 cities worth 3 each, next 5 worth 2, rest worth 1. Reads DAT_0064c932 (city count per continent) | MEDIUM |
| 0x00536C4C | large | FUN_00536c4c | ai_find_nuke_target | 1 (int unitIdx) | uint | **1760 bytes.** Finds a city to nuke. Evaluates enemy cities: checks SDI defense (building 0x11), city size >4, military strength comparison (atk+def sum at civ+0x70e). Avoids nuking allies. Once a target is found, moves unit adjacent and detonates. Sets treaty flags (0x20000=weNukedThem, clears 0x10). Returns direction or 8 (no target) | HIGH |

### Cluster: AI Combat/Movement Decision Engine

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00537331 | xlarge | FUN_00537331 | ai_naval_and_ranged_move | 9 (int unitIdx, int utypeIdx, int* px, int* py, int role, int* pFlag, int dist, int continent, int hasContact) | uint | **5855 bytes.** Handles AI decision-making for naval/air/ranged units. Includes: (1) nuclear missile launch decision (calls ai_set_goto_order with role 0x41), (2) bombardment targeting with air units (role 0x10), (3) transport loading/unloading with proximity to friendly cities, (4) city capture priority for sea units near coastal cities, (5) retreat to friendly port when damaged. Returns direction (0-7), 8 (stay), 0xFFFFFFFF (handled via goto), 0xFFFFFFFE (deferred), 0xFFFFFF9D (fallthrough) | HIGH |

### Cluster: AI Master Unit Decision Function

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00538A29 | xlarge | FUN_00538a29 | ai_unit_turn_master | 0 | undefined4 | **44777 bytes (!!!) — the master AI unit decision function.** The single largest function in the game. Reads DAT_00655afe (current unit idx). Dispatches to ai_barbarian_unit_turn for civ 0. For all other civs, this enormous state machine handles every possible AI unit behavior: (1) combat evaluation — attack scoring based on attack/defense ratios, terrain, fortification, veteran status; (2) settler actions — city founding (role 5), road/irrigation/mining/fortress building (orders 4-9), terraform decisions based on terrain type and improvement bonuses; (3) diplomat actions — role 6 espionage targeting, city infiltration; (4) caravan/freight — role 7 trade route evaluation using trade revenue formula; (5) explorer behavior — exploring unexplored continents; (6) unit upgrade — obsolete tech check and auto-upgrade; (7) fortify/sentry decisions — based on continent threat level (DAT_0064ca32); (8) naval transport — embarking/disembarking logic; (9) nuclear strike decisions — calls ai_find_nuke_target; (10) continental threat response — repositioning based on ai_calc_continent_city_weight and treaty status; (11) road-building to connect cities; (12) air unit rebase decisions; (13) pillage enemy improvements; (14) settler "add to city" (grow city population). Uses virtually every game data structure. Calls nearly every AI helper function in this block. Returns 0 on normal completion, 1 on unit consumed/disbanded | HIGH |

## SUMMARY

### 1. Total Functions: 17

| Category | Count | Functions |
|----------|-------|-----------|
| **FRAMEWORK** (C++ CRT/MFC) | 2 | streambuf::egptr, ios::width |
| **GUI Boilerplate** (window/scrollbar) | 5 | FUN_00530eb0, FUN_00530ee0, FUN_00530fb0, FUN_00531010, FUN_005310a0, FUN_005311b0, FUN_005311e0 |
| **AI Core Logic** | 10 | FUN_00531210, FUN_00531263, FUN_00531287, FUN_005312e4, FUN_00531567, FUN_00531607, FUN_00531653, FUN_0053184d, FUN_005351aa, FUN_005369f3, FUN_00536bc9, FUN_00536c4c, FUN_00537331, FUN_00538a29 |

**Breakdown by size:**
- stub (<=20 lines): 7
- small (21-50): 5
- medium (51-100): 1
- large (101-300): 2
- xlarge (>300): 4

**This block is dominated by the AI engine** — specifically, the unit-level decision-making system. The four xlarge functions alone account for ~72,000 bytes of decompiled code.

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00538a29 (`ai_unit_turn_master`)** — At 44,777 bytes, this is the single largest function in the entire game binary. It is the master dispatcher for all AI unit decisions: combat, settling, diplomacy, trading, terraforming, naval operations, nuclear strikes, and exploration. Understanding this function is equivalent to understanding the AI's brain.

2. **FUN_0053184d (`ai_process_civ_turn`)** — The per-civ turn processor (14,665 bytes). Maintains all per-continent statistics arrays (military strength, city counts, population), handles unit order validation/cleanup, continental threat assessment, AI goal management, and civ death detection. This is the "bookkeeping" layer that feeds data to the unit decision function.

3. **FUN_005351aa (`ai_barbarian_unit_turn`)** — The complete barbarian AI (6,102 bytes). Barbarians use a separate, simpler decision tree. Includes unique behaviors: city ransom events (reading text files), naval raiding, and goody-hut settler spawning. References game event strings "BARBARIANSLAND", "RANSOMCITY", "BARBARIANS".

4. **FUN_00537331 (`ai_naval_and_ranged_move`)** — Naval/air/ranged unit decision engine (5,855 bytes). Handles the notoriously poor Civ2 naval AI: transport loading, coastal assault planning, air strikes, and nuclear launch decisions. The complexity of this function explains many known AI naval behavior quirks.

5. **FUN_005312e4 (`ai_find_best_settle_dir`)** — The settler city-placement algorithm (643 bytes). Scores candidate tiles based on neighboring empty land, enemy territory proximity, and allied contacts. This is the function that determines where the AI founds new cities.

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence | Confidence |
|---------|--------------|----------|------------|
| DAT_0062803c | `ai_active_civ_id` | Set by FUN_00531210 with bounds check 0-8, used as index into civ array | HIGH |
| PTR_DAT_00628040 | `ai_active_civ_ptr` | Set to &DAT_0064c6a0 + civId*0x594 in FUN_00531210 — pointer to current AI civ struct | HIGH |
| DAT_006d116a | `map_width` | Used in FUN_00531263: linear_index = width*y + x + base. Standard map linearization | HIGH |
| DAT_006365ec | `tile_array_base` | Used in FUN_00531263: offset added after width*y+x. Base address of tile data array | HIGH |
| DAT_00655afe | `current_unit_idx` | Read by FUN_005351aa and FUN_00538a29 as the unit index being processed this turn | HIGH |
| DAT_0063f660 | `ai_city_distance_cache` | Used extensively in AI functions; set during city-finding calls (thunk_FUN_0043d07a), compared against thresholds. Caches distance-to-nearest-city result | MEDIUM |
| DAT_006ced4c | `ai_last_contact_civ` | Checked in FUN_00538a29 when entering foreign territory; triggers diplomatic events. Set to city owner on first contact | MEDIUM |
| DAT_006ced50 | `ai_combat_eval_depth` | Checked < 4 in barbarian AI before pursuing targets. Limits recursive combat evaluation | LOW |
| DAT_00655afa | `current_turn_progress` | Compared > 200 in barbarian AI for late-game behavior changes. Likely cumulative turn*difficulty or similar | MEDIUM |
| DAT_00654fa8 | `mp_game_active` | Checked == 0 before showing single-player events (ransom dialog, barbarian messages). Multiplayer suppression flag | MEDIUM |
| DAT_0064b2cf | `ai_tech_threshold` | Passed to thunk_FUN_004bd9f0 (has_tech) at start of ai_process_civ_turn. Likely a tech ID that gates AI behavior | LOW |
| DAT_0064bcdb | `cosmic_city_radius_max` | Used as distance threshold in ai_process_civ_turn for settler-to-city proximity checks. Likely COSMIC[9] or [10] | MEDIUM |
| DAT_00666130 | `continent_land_area` | Indexed by continent*0x10. Compared against military counts for continent viability assessment. Stride 0x10 = 16-byte continent info records | MEDIUM |
| DAT_00666132 | `continent_coastal_area` | At continent*0x10+2. Used for naval assessment and settler colonization decisions | MEDIUM |
| DAT_0064b3f4 | `ai_naval_cost_threshold` | Compared against unit cost in FUN_0053184d; gates naval unit assignment to continents | LOW |
| DAT_00655c31 | `strongest_civ_id` | Checked against human_civs_bitmask; if strongest civ is human and has >4 cities after turn 150, AI threat assessment uses stricter threshold (7 instead of 6) | MEDIUM |
| PTR_DAT_00637e64 | `scrollbar_wndclass_ptr` | Window class pointer for scrollbar controls | MEDIUM |
| PTR_DAT_00637e68 | `listbox_wndclass_ptr` | Window class pointer for listbox controls | MEDIUM |

### Key Structural Observations

1. **The AI engine is concentrated in this single 64KB block.** Functions 0x0053184D through 0x00538A29+44777 span approximately 60KB of the 64KB address range. This is essentially "the AI module."

2. **Per-continent statistics drive all strategic decisions.** The arrays at civ+0x192 through civ+0x3F2 (military counts, city counts, population, threat flags) documented in the project memory are the primary inputs to the AI decision engine. FUN_0053184d maintains them; FUN_00538a29 consumes them.

3. **The AI goal system (civ+0x1044, 64x6 bytes)** documented in project memory is actively consumed here. Goal types 0 (explore), 1 (attack), 5 (city site), 7 (naval), 0x15 (settler terraform) are all referenced in ai_unit_turn_master.

4. **Unit orders byte semantics confirmed:**
   - 0x01 = fortifying, 0x02 = fortified, 0x03 = goto, 0x04-0x09 = terraform orders
   - 0x0B = AI goto (set by ai_set_goto_order), 0x10 = AI wait/hold
   - 0x1B = AI move-to-adjacent, 0xFF = no orders (idle)

5. **AI role byte (unit+0x0C) semantics partially decoded from goto role arguments:**
   - 0x21 = high-cost unit default, 0x30 = AI wait, 0x31 = AI explore/goto
   - 0x32 = found city near good site, 0x33 = reinforce own city
   - 0x34 = attack enemy city, 0x35 = relocate to own threatened city
   - 0x36 = explore random, 0x39 = general move, 0x3F = max range
   - 0x41 = attack/naval assault, 0x42 = settle near enemy
   - 0x44 = damaged retreat, 0x46 = garrison/fortify
   - 0x48 = disband (nuclear), 0x49 = irrigate, 0x4D = mine
   - 0x50 = intercept air unit, 0x53 = diplomat goto city
   - 0x54 = caravan trade route, 0x55 = found city on spot
   - 0x56 = explore new continent, 0x58 = build fortress
   - 0x61 = naval transport to city, 0x62 = settler relocate
   - 0x68 = retreat to home, 0x69 = irrigate remote, 0x6D = mine remote
   - 0x70 = spy sabotage, 0x72 = build road, 0x73 = build road adjacent
   - 0x74 = naval explore, 0x75 = settler expand to new continent

6. **Continent info records** at DAT_00666130 have stride 0x10 (16 bytes). Offset +0 = land area, +2 = coastal/total area. These were previously undocumented.
