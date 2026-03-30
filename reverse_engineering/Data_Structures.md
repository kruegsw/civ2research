# Civ2 MGE Data Structure Map

**THIS IS A DATED ANALYSIS DOCUMENT** — written during early RE phases (sessions 1-2). Many fields have since been corrected or expanded.

For the current, comprehensive byte-level mapping of all structs, see:
**`findings/byte_verification_plan.md`** — complete byte map with verification status for every byte in every struct (unit, city, civ, unit type, tile).

Source of truth hierarchy:
1. `reverse_engineering/decompiled/*.c` — Ghidra output (read-only, never modify)
2. `reverse_engineering/findings/RULES.TXT` — game data tables (read-only, never modify)
3. Live memory verification via `charlizationv4/sniff-game.py`

All offsets are relative to each struct's base address (field offset within a single instance).
"DAT_" labels show the absolute address of **civ[0]**, **unit_type[0]**, **unit[0]**, or **building[0]**.

---

## 1. Civilization Struct

- **Base address:** `0x0064C6A0` (start of civ[0])
- **Stride:** `0x594` (1428 bytes)
- **Count:** 8 (player indices 0-7)
- **Total block size:** `0x2CA0` (8 * 0x594 = 11424 bytes)
- **Save file:** loaded/saved as a single `0x2CA0` block (older format), or in chunked sub-reads (newer format)

### File I/O Layout (Chunked Read Order)

The save file writes the Civilization struct in segments per-player (block_00470000.c lines 1865-1901):

| Segment Start (abs)  | Offset in Struct | Size   | Description |
|-----------------------|------------------|--------|-------------|
| `DAT_0064c6a0`       | `0x000`          | `0x58` | Core fields: flags, gold, leader name, civ name, government, rates, etc. |
| `DAT_0064c6f8`       | `0x058`          | `0x0C` | Tech flags / contact bitmask (12 bytes, likely 96 bits of tech) |
| `DAT_0064c706`       | `0x066`          | `0x0E` | Num cities, num units, counters, science progress |
| `DAT_0064c714`       | `0x074`          | `0x5D` | Future tech researching, tech list (93 entries = 93 techs, 1 byte each) |
| `DAT_0064c778`       | `0x0D8`          | `0x36` | Unit counts per civ (54 bytes, indexed by civ id) |
| `DAT_0064c7b6`       | `0x116`          | `0x36` | Unknown array per civ (54 bytes) |
| `DAT_0064c7f4`       | `0x154`          | `0x36` | City counts per civ (54 bytes, indexed by civ id) |
| *(1 byte padding)*    | ---              | `0x01` | Read but discarded |
| `DAT_0064c832`       | `0x192`          | `0x402`| Military unit counts + science unit counts (2 arrays of 0x201 shorts each, indexed by unit type * 2) |

### Individual Field Map

All offsets relative to start of a single Civilization instance (`0x0064C6A0` for civ[0]).

#### Core Fields (offset 0x000 - 0x057, size 0x58)

| Offset | Abs Addr (civ[0]) | Size | Type    | Name / Description |
|--------|-------------------|------|---------|--------------------|
| 0x000  | `0064c6a0`        | 2    | ushort  | **flags** -- bitfield. Bit 0x008 = unknown flag; Bit 0x200 = related to leader/contact status (toggled with XOR 0x200) |
| 0x002  | `0064c6a2`        | 4    | int     | **gold** -- treasury. Clamped to [0, 30000]. Divided by 0x32 (50) for AI calculations. Negative gold reset to 0 or 30000. |
| 0x006  | `0064c6a6`        | 2    | short   | **leader_graphic_id** -- indexes into leader portrait table (DAT_006554fc, stride 0x30) |
| 0x008  | `0064c6a8`        | 2    | short   | **research_progress** -- beakers accumulated toward current tech |
| 0x00A  | `0064c6aa`        | 2    | short   | **researching_tech** -- tech ID currently being researched (-1 = none; indexes into tech table at DAT_00627684, stride 0x10) |
| 0x00E  | `0064c6ae`        |      |         | *(gap / more core fields)* |
| 0x010  | `0064c6b0`        | 1    | byte    | **rank / power_rating** -- compared between civs for diplomacy. Incremented on various events (wonders, techs). Used as a "strength" metric. |
| 0x011  | `0064c6b1`        | 1    | byte    | **unknown_counter_b1** -- incremented in some game logic |
| 0x013  | `0064c6b3`        | 1    | byte    | **science_rate** -- 0-10 scale. `science + tax + luxury = 10` (luxury implicit). Used directly to compute science output in FUN_004ea1f6. Capped by COSMIC #21 under Fundamentalism. |
| 0x014  | `0064c6b4`        | 1    | byte    | **tax_rate** -- 0-10 scale. Combined with science_rate to derive luxury_rate = 10 - science - tax. |
| 0x015  | `0064c6b5`        | 1    | byte    | **government_type** -- 0=Anarchy, 1=Despotism, 2=Monarchy, 3=Communism, 4=Fundamentalism, 5=Republic, 6=Democracy. Checked `< 2` for primitive govts, `== 4` for Fundie, etc. Indexes into government name table (DAT_0064b9a0, stride 4). |
| 0x016  | `0064c6b6`        |      |         | *(within core block)* |
| 0x01E  | `0064c6be`        | 1    | byte    | **reputation** -- diplomatic reputation value, shifted right by 1 in some contexts. Incremented when treaties formed/broken. |
| 0x01F  | `0064c6bf`        | 1    | byte    | **patience / anger_counter** -- incremented/decremented during diplomatic negotiations. Added +1 for accepted deals, -1 for broken deals. |

#### Contact / Attitude Arrays (within core 0x58 block)

| Offset | Abs Addr (civ[0]) | Size  | Type    | Name / Description |
|--------|-------------------|-------|---------|--------------------|
| 0x020  | `0064c6c0`        | 4*8=32| byte[8] | **diplomatic_status[8]** -- per-civ diplomatic state bitfield (4 bytes per opposing civ, indexed as `[other_civ * 4]`). Bits: 0x01=contact/met, 0x02=ceasefire, 0x04=peace, 0x08=alliance, 0x20=at_war (in byte+1), 0x80=unknown. |
| 0x040  | `0064c6e0`        | 8     | byte[8] | **attitude[8]** -- attitude/regard for each other civ (indexed by civ id). Determined by function FUN_004679ab. |
| 0x048  | `0064c6e8`        | 8     | byte[8] | **spy_operations[8]** -- per-civ espionage counter, incremented for spy missions |
| 0x050  | `0064c6f0`        | 8     | byte[8] | **border_friction[8]** -- border/proximity tensions. Incremented on unit movement near borders, reset on various events. Capped at 9. |

#### Tech Flags (offset 0x058, size 0x0C)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x058  | `0064c6f8`        | 12   | byte[12] | **tech_contact_flags** -- 96-bit bitmask. Encodes which techs/contacts this civ has. Copied during civ-splitting events. |

#### City/Unit Counts (offset 0x066, size 0x0E)

| Offset | Abs Addr (civ[0]) | Size | Type   | Name / Description |
|--------|-------------------|------|--------|--------------------|
| 0x066  | `0064c706`        | 2    | short  | **total_population** -- total food/population score. Used as `(pop * 10) / divisor` for rankings. |
| 0x068  | `0064c708`        | 2    | short  | **num_cities** -- number of cities. Incremented when city founded, decremented on loss. Checked `> 4` for AI decision making; `== 1` for special handling. |
| 0x06A  | `0064c70a`        | 2    | short  | **num_units** -- number of active units. Divided by 4 for some calculations. |
| 0x06C  | `0064c70c`        | 2    | short  | *(unknown counter)* |
| 0x06E  | `0064c70e`        | 2    | ushort | **military_power** -- aggregate military strength rating. Compared between civs to determine relative power. Used in AI diplomacy: `power_A * 2 < power_B` triggers various behaviors. |
| 0x070  | `0064c710`        | 2    | short  | **science_beakers_per_turn** -- science output per turn. Reset to 0 on initialization. |
| 0x072  | `0064c712`        | 2    | short  | **beaker_cost_current_tech** -- cost in beakers of current research. Updated: `if (cost * 10 < beakers) { cost = beakers / 10 }`. |

#### Tech Research Array (offset 0x074, size 0x5D = 93)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x074  | `0064c714`        | 93   | byte[93] | **tech_status[93]** -- one byte per tech (93 techs in rules). 0xFF = not discovered / not available. Set to specific values when tech acquired. |

#### Per-Civ Counter Arrays (3 x 0x36 = 54 bytes each)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x0D8  | `0064c778`        | 54   | byte[54] | **unit_count_by_type[54]** -- number of units owned of each unit type. Indexed by unit type id. Incremented/decremented on unit creation/destruction. |
| 0x116  | `0064c7b6`        | 54   | byte[54] | **unit_count_array2[54]** -- second per-type counter (possibly units under construction or total ever built) |
| 0x154  | `0064c7f4`        | 54   | byte[54] | **city_count_by_civ[54]** -- indexed by city owner? Or by type. Incremented when cities added. |

#### Wonders / Extra Fields (offset 0x105-0x191)

| Offset | Abs Addr (civ[0]) | Size | Type     | Name / Description |
|--------|-------------------|------|----------|--------------------|
| 0x105  | `0064c7a5`        | 1    | byte     | **has_space_ship** -- 0 = no spaceship, nonzero = has spaceship components. Used in AI treaty evaluation to adjust gold valuations. |
| 0x0F4  | `0064c794`        | 1    | byte     | **spaceship_structural** |
| 0x0F5  | `0064c795`        | 1    | byte     | **spaceship_component_1** |
| 0x0F7  | `0064c797`        | 1    | byte     | **spaceship_component_2** |
| 0x0F8  | `0064c798`        | 1    | byte     | **spaceship_part_a** |
| 0x0F9  | `0064c799`        | 1    | byte     | **spaceship_part_b** |
| 0x0FC  | `0064c79c`        | 1    | byte     | **spaceship_fuel_1** |
| 0x0FD  | `0064c79d`        | 1    | byte     | **spaceship_fuel_2** |
| 0x0FE  | `0064c79e`        | 1    | byte     | **spaceship_propulsion_1** |
| 0x0FF  | `0064c79f`        | 1    | byte     | **spaceship_propulsion_2** |
| 0x100  | `0064c7a0`        | 1    | byte     | **spaceship_habitation** |
| 0x104  | `0064c7a4`        | 1    | byte     | **spaceship_extra** |
| 0x16F  | `0064c80f`        | 1    | byte     | *(used in military calculation)* |
| 0x172  | `0064c812`        | 1    | byte     | *(used in military calculation)* |

#### Military Production Arrays (offset 0x192, size 0x402 = 1026)

| Offset | Abs Addr (civ[0]) | Size  | Type        | Name / Description |
|--------|-------------------|-------|-------------|--------------------|
| 0x192  | `0064c832`        | 0x201 | short[~256] | **units_produced_by_type** -- number of each unit type ever produced. Indexed `[unit_type * 2]`. Reset to 0 on initialization. Compared in AI diplomacy for military threat assessment. |
| 0x393  | `0064c8b2` (approx)| 0x201| short[~256] | **units_active_by_type** -- current active units by type. Similar indexing. |

#### Civ Footer Fields (around offset 0x3E0 - 0x593)

| Offset | Abs Addr (civ[0]) | Size  | Type     | Name / Description |
|--------|-------------------|-------|----------|--------------------|
| 0x3E2  | `0064ca82`        | 16    | short[8] | **last_contact_turn[8]** -- turn number when last had diplomatic contact with each civ. Set to `DAT_00655af8` (current turn). |
| 0x3F2  | `0064ca92`        | 1     | byte     | **leader_personality** -- copied from leader_graphic_id; modified +0x15 under certain conditions |
| 0x3F3  | `0064ca93`        | 8     | byte[8]  | **spy_level[8]** -- per-civ espionage infrastructure. Values 0-3 = no spy presence; >= 4 = active spies. Incremented on spy missions. |
| 0x3F6  | `0064ca96`        | 1     | byte     | **embassy_count_a** -- nonzero means embassy established in some context |
| 0x3F7  | `0064ca97`        | 1     | byte     | **embassy_count_b** |
| 0x3FA  | `0064ca9a`        | 1     | byte     | **embassy_count_c** |
| 0x3FB  | `0064ca9b`        | 1     | byte     | **wonder_flags** -- 7-bit bitmask tracking wonder-related states. Bit 0x01=has specific wonder, bits ORed when wonder built. `~val & 0x7f` checks for missing wonders. |
| 0x3FE  | `0064ca9e`        | 2     | short    | **current_research_slot** -- incremented as tech advances. Compared < 0x26 (38). |
| 0x400  | `0064caa0`        | 1     | byte     | **civ_state_flags** -- bitfield: bit 0x01=alive, bit 0x02=unknown, bit 0x04=has_started, bit 0x10=has_spaceship_launched |
| 0x402  | `0064caa2`        | 2     | short    | **civilization_score** -- displayed score/ranking value |
| 0x404  | `0064caa4`        | 2     | short    | **happy_citizens_total** -- total happy citizens across all cities |
| 0x406  | `0064caa6`        | 2     | short    | **pollution_total** -- total pollution. Multiplied by DAT_006ad0ec for global effects. |
| 0x408  | `0064caa8`        | var   | short[]  | **resource_counts[]** -- per-resource counters, indexed by resource type * 2 |

### Key Functions Referencing Civilization Struct

- **FUN_00473666** (block_00470000.c:1806) -- Save/load civilization data
- **FUN_004762b6** (block_00470000.c:2880) -- Recalculate unit/city counts
- **FUN_00450000+** (block_00450000.c:3580-6400) -- Diplomacy/AI treaty evaluation (heavy use of gold, rank, num_cities, military_power)
- **FUN_00460000+** (block_00460000.c:100-1200) -- War/peace decisions (diplomatic_status, gold, rank)
- **FUN_00400000+** (block_00400000.c:2720-3565) -- Tax/luxury/science rate management (tax_rate, luxury_rate, government_type)
- **FUN_00480000+** (block_00480000.c:2000-2500) -- Research progress (gold, research rank thresholds: 100, 2000, 8000)
- **FUN_004A0000+** (block_004A0000.c:2300-2700) -- Civ initialization/reset
- **FUN_00530000+** (block_00530000.c:530-830) -- Military production counting
- **FUN_00550000+** (block_00550000.c:1300-3030) -- Tech trading / civ splitting

---

## 2. Unit Type Table (Improvement Definitions from RULES.TXT)

- **Base address:** `0x0064C488`
- **Stride:** `0x08` (8 bytes)
- **Count:** 67 (`0x43` entries, iterated in IMPROVE section)
- **Loaded from:** RULES.TXT `[IMPROVE]` section (wonder/improvement definitions)
- **Name:** Despite the variable name suggesting "unit", this is the **Improvements/Wonders** type table (IMPROVE section of RULES.TXT)

### Field Map

| Offset | Abs Addr (entry[0]) | Size | Type  | Name / Description |
|--------|----------------------|------|-------|--------------------|
| 0x00   | `0064c488`           | 4    | ptr   | **name_string_ptr** -- pointer to improvement name string (allocated via thunk_FUN_004a26bf with max length 0x19=25 chars). Passed to thunk_FUN_00428b0c for display and thunk_FUN_0040ff00 for rendering. |
| 0x04   | `0064c48c`           | 1    | byte  | **cost** -- production cost (shields). Read from RULES.TXT. |
| 0x05   | `0064c48d`           | 1    | byte  | **maintenance** -- gold per turn maintenance cost. Read from RULES.TXT. |
| 0x06   | `0064c48e`           | 1    | sbyte | **prerequisite_tech** -- tech ID required to build (-3 = error/invalid, -1 = always available). Resolved through tech chain: while tech is valid and not yet researched, follows prerequisite chain via `DAT_0062768e[tech * 0x10]`. |
| 0x07   | `0064c48f`           | 1    |       | *(padding / unused)* |

### Notes

- The loop runs `local_8 < 0x43` (67 iterations), covering all improvements + wonders
- After the IMPROVE section, a second loop reads `ENDWONDER` section (28 entries, `0x1C`) into `DAT_0064ba28` -- this is the wonder-obsolete-tech table
- Improvement names passed to `thunk_FUN_004271e8` with different modes (0=buy, 1=build, 2=special display)
- Cross-referenced from unit instance via `(&DAT_006560f6)[unit * 0x20]` to look up what a unit can build in a city
- Cross-referenced from city struct via `(&DAT_006560f6)[city * 0x20]` for building availability

### Key Functions

- **FUN_0041a422** (block_00410000.c:5242) -- Loads IMPROVE section from RULES.TXT
- **thunk_FUN_00428b0c** -- Get improvement name string with formatting
- **thunk_FUN_0040ff00** -- Display improvement name
- **thunk_FUN_004271e8** -- Show improvement in UI (mode 0=buy context, 1=build context, 2=info)

---

## 3. Unit Type Table (Unit Definitions from RULES.TXT)

- **Base address:** `0x0064B1B8`
- **Stride:** `0x14` (20 bytes)
- **Count:** 62 (`0x3E` entries, looped as `local_8 < 0x3e`)
- **Loaded from:** RULES.TXT `[UNITS]` section

### Field Map

| Offset | Abs Addr (entry[0]) | Size | Type   | Name / Description |
|--------|----------------------|------|--------|--------------------|
| 0x00   | `0064b1b8`           | 4    | ptr    | **name_string_ptr** -- pointer to unit name string (allocated via thunk_FUN_004a26bf, max 0xF=15 chars). Used for display. |
| 0x04   | `0064b1bc`           | 4    | uint   | **flags** -- 16-bit flags masked to `& 0xFFFF`. Bit meanings: 0x01=land_unit, 0x02=sea_unit, 0x04=submarine, 0x08=can_carry_air, 0x10=unknown, 0x20=settlers_type, 0x40=can_carry_land, 0x80=ignore_zones_of_control. High byte (0064b1bd): 0x01=foot_unit, 0x02=two_space, 0x04=pikeman_bonus, 0x08=unknown, 0x20=alpine, 0x40=cruise_missile_type. |
| 0x08   | `0064b1c0`           | 1    | sbyte  | **prerequisite_tech** -- tech ID required (-3=error, 0xFE=never available). Resolved through tech chain. |
| 0x09   | `0064b1c1`           | 1    | byte   | **domain** -- 0=land, 1=sea, 2=air. Checked extensively in combat: sea units can't attack land, etc. |
| 0x0A   | `0064b1c2`           | 1    | byte   | **move_rate** -- movement points. Parsed value multiplied by `DAT_0064bcc8` (movement multiplier, likely 3 for road movement). Default 0. |
| 0x0B   | `0064b1c3`           | 1    | byte   | **range** -- operational range (for air units). Default 0. |
| 0x0C   | `0064b1c4`           | 1    | byte   | **attack** -- attack strength. Default 1. Value 0 = non-combat unit. |
| 0x0D   | `0064b1c5`           | 1    | byte   | **defense** -- defense strength. Default 0. Used in `(defense << 3) / firepower` calculation for AI. |
| 0x0E   | `0064b1c6`           | 1    | byte   | **hit_points** -- hit points. Parsed value multiplied by 10 (`cVar2 * '\n'`). Default 0. |
| 0x0F   | `0064b1c7`           | 1    | byte   | **firepower** -- firepower rating. Default 0. |
| 0x10   | `0064b1c8`           | 1    | byte   | **cost** -- production cost (shields). Computed via FUN_00419cf4(1, 200). Default 1. |
| 0x11   | `0064b1c9`           | 1    | byte   | **hold** -- cargo/hold capacity. Default 0. |
| 0x12   | `0064b1ca`           | 1    | byte   | **role** -- AI role/category: 0=attack, 1=defense, 5=settler, 6=diplomat, 7=trade/caravan. Extensively used in AI logic. |
| 0x13   | `0064b1cb`           | 1    | sbyte  | **obsolete_tech** -- tech ID that makes this unit obsolete (0xFE = never obsolete, -3 = error). Default 0xFE. |

### Notes

- Unused slots (beyond the RULES.TXT entries) are initialized with name "Unit %d", attack=0, defense=0, move=0, cost=1, role=0xFE
- The unit type is cross-referenced from unit instances via `(&DAT_006560f6)[unit * 0x20]` which stores the type ID
- `DAT_0066be90 + local_8 * 4` stores associated graphic/sprite pointers
- The `domain` field is critical: `1` = sea triggers isWater checks, `0` = land, air units have special zone rules

### Key Functions

- **FUN_0041a5c4** (block_00410000.c:5294) -- Loads UNITS section from RULES.TXT
- Combat resolution functions in block_00420000.c (lines 2440-2770) -- heavy use of attack, defense, domain, flags
- AI unit valuation in block_00430000.c (lines 5640-5660) -- uses defense, firepower, role
- Movement in block_00440000.c -- uses move_rate, domain, flags

---

## 4. Unit Instance Struct

- **Base address:** `0x006560F0`
- **Stride:** `0x20` (32 bytes)
- **Count:** variable, stored in `DAT_00655b16`
- **Save file:** `0x1E` bytes read per unit (30 bytes) in newer save format (version >= 0x29); `0x1A` bytes (26 bytes) in older format
- **Note:** Fields at `0x00656100+` are at offset +0x10 from the struct base, confirming the struct base is `0x006560F0`

### Field Map

| Offset | Abs Addr (unit[0]) | Size | Type   | Name / Description |
|--------|--------------------|------|--------|--------------------|
| 0x00   | `006560f0`         | 2    | short  | **x** -- map X coordinate. Used in movement, combat, and pathfinding. |
| 0x02   | `006560f2`         | 2    | short  | **y** -- map Y coordinate. |
| 0x04   | `006560f4`         | 2    | ushort | **status_flags** -- bitfield controlling unit state. Bit 0x0002=veteran, 0x0004=has_order, 0x0020=fortified, 0x2000=paradropped_this_turn, 0x4000=unknown, 0x8000=damage_flag. Cleared with `& 0xBFFF` (clear bit 14), `& 0x7FFF` (clear damage), `& 0xFFDF` (clear fortify), `& 0xFFFD` (clear veteran). |
| 0x06   | `006560f6`         | 1    | byte   | **type_id** -- unit type index into the Unit Type Table (0x0064b1b8). Value 0x09 checked for diplomat. Value 0x31 (49) is a specific unit type. Cross-references: `(&DAT_0064b1b8 + type_id * 0x14)` for stats, `(&DAT_0064b1c1)[type_id * 0x14]` for domain. |
| 0x07   | `006560f7`         | 1    | sbyte  | **owner** -- owning civilization index (0-7). Compared with `DAT_006d1da0` (current human player) and `DAT_0064bcba`. Used to index into civ array. |
| 0x08   | `006560f8`         | 1    | byte   | **moves_remaining** -- movement points left this turn. Set to 0 when exhausted. Incremented by `DAT_0064bcc8` (movement multiplier) when traversing roads. Checked `!= 0` to determine if unit can still move. |
| 0x09   | `006560f9`         | 1    | byte   | **visibility_mask** -- bitmask of which civs can see this unit. Bit N = visible to civ N. ORed with `1 << civ_id` when spotted; ANDed to check if visible. |
| 0x0A   | `006560fa`         | 1    | byte   | **hit_points_remaining** -- current HP. Decremented in combat, healed over time. Loaded/saved with "UNITHITPOINTS" string label. Compared with unit type's max HP. Value 0 = unit destroyed. `> 4` checked for some AI decisions. Healed: `hp + damage/10`. |
| 0x0B   | `006560fb`         | 1    | sbyte  | **carrying_unit / transport_link** -- index of transport unit or carried unit. 0xFF = not carried / no transport. XORed with 4 to check transport compatibility. Set to 0xFF on unload. -1 (signed) = no link. |
| 0x0C   | `006560fc`         | 1    | byte   | **ai_role / activity** -- AI-assigned role/activity code. Set to various ASCII-like values: 0x37='7', 0x3F='?', 0x21='!', 0x55='U', 0x48='H', 0x68='h', 0x44='D', 0x74='t', 0x46='F', 0x62='b', 0x41='A', 0x33='3', 0x32='2', 100='d'. These appear to be AI activity codes for different behaviors. |
| 0x0D   | `006560fd`         | 1    | sbyte  | **home_city** -- index of home city (-1 = no home). Used to check caravan destination. Cross-referenced with city struct `(&DAT_0064f37b)[city * 0x58 + offset]`. |
| 0x0E   | `006560fe`         | 1    | byte   | **fuel / turns_remaining** -- fuel counter for air units, or turns of settler activity remaining. Decremented each turn; when reaches 0, unit returns/crashes. Set to 5 or 10 based on unit type. Modified by difficulty level. Capped at 0x2F (47). |
| 0x0F   | `006560ff`         | 1    | byte   | **orders** -- current order/state: 0x02=fortified, 0x03=goto (if domain allows), 0x0B=build_city, 0xFF=no_orders/sentry. Bottom nibble `& 0xF` checked for states. Set to 0xFF to cancel orders. |
| 0x10   | `00656100`         | 1    | byte   | **goto_turn_counter / task_target** -- 0xFF = empty/unused. Set to specific values during transport operations. Compared as `!= -1` for valid state. For AI: tracks current task assignment. |
| 0x12   | `00656102`         | 2    | short  | **goto_x** -- destination X for goto orders |
| 0x14   | `00656104`         | 2    | short  | **goto_y** -- destination Y for goto orders |
| 0x16   | `00656106`         | 2    | short  | **link_prev** -- linked list previous pointer (0xFFFF = none). Set to -1 on unit death. |
| 0x18   | `00656108`         | 2    | short  | **link_next** -- linked list next pointer (0xFFFF = none). Set to -1 on unit death. |
| 0x1A   | `0065610a`         | 4    | int    | **alive_flag** -- 0 = dead/empty slot, nonzero = alive. This is the primary "is unit valid" check used everywhere (`*(int *)(&DAT_0065610a + idx * 0x20) != 0`). May also encode some state bits. |

### Notes

- Units are stored in a flat array; iteration checks `alive_flag != 0` to skip dead/empty slots
- The save format grew from 0x1A to 0x1E bytes between versions, adding the goto fields
- The linked list (link_prev/link_next) chains units on the same tile
- `DAT_00655b16` stores the total number of unit slots allocated
- Unit creation: find empty slot where alive_flag==0, fill in fields
- Unit death: set alive_flag=0, link_prev=-1, link_next=-1, counter=0xFF

### Key Functions

- **FUN_00473666** (block_00470000.c:1720) -- Save/load unit data
- **FUN_0042xxxx** (block_00420000.c:2440-2770) -- Combat processing (type_id -> lookup attack/defense)
- **FUN_00440xxx** (block_00440000.c:140-530) -- Unit movement and orders
- **FUN_00460xxx** (block_00460000.c:1650-1700) -- AI unit management
- **FUN_004107xx** (block_00410000.c:7770) -- Unit death/cleanup

---

## 5. City Instance Struct (Bonus Discovery)

- **Base address:** `0x0064F340`
- **Stride:** `0x58` (88 bytes)
- **Count:** variable, stored in `DAT_00655b18`
- **Save file:** `DAT_00655b18 * 0x58` bytes as a single block

### Field Map

| Offset | Abs Addr (city[0]) | Size | Type   | Name / Description |
|--------|--------------------|------|--------|--------------------|
| 0x00   | `0064f340`         | 2    | short  | **x** -- city map X coordinate |
| 0x02   | `0064f342`         | 2    | short  | **y** -- city map Y coordinate |
| 0x04   | `0064f344`         | 4    | uint   | **flags** -- city state bitfield. Bit 0x20000 toggled for WeLoveDay, etc. |
| 0x07   | `0064f347`         | 1    | byte   | **city_flags2** -- bit 0x04 = some special city status |
| 0x08   | `0064f348`         | 1    | sbyte  | **owner** -- owning civilization index (0-7). Cross-ref: `(&DAT_0064c6b0)[owner * 0x594]` for civ rank. |
| 0x09   | `0064f349`         | 1    | sbyte  | **size** -- city population size (1+). Used extensively: `size < 3` for small city, `size > 7` for large. Controls number of workers, resource calculations. `size << 3` = food storage capacity. |
| 0x0C   | `0064f34c`         | 1    | byte   | **specialist_mask** -- bitmask of which citizens are specialists. Bit set = specialist on that slot. |
| 0x0D   | `0064f34d`         | var  | byte[] | **specialist_types[]** -- per-citizen specialist assignment (indexed by citizen slot) |
| 0x20   | `0064f360`         | var  |        | **city_name_ptr / display_data** -- passed to thunk_FUN_0040bbe0 for display |
| 0x39   | `0064f379`         | 1    | sbyte  | **building_what** -- what the city is currently producing (negative = unit, positive = improvement). Cross-refs to unit type table: `(char)(&DAT_0064f379)[city * 0x58] * -8` indexes DAT_0064c488. |
| 0x3B   | `0064f37b`         | var  | byte[] | **building_slots[]** -- buildings present in city, indexed by building id |
| 0x52   | `0064f392`         | 1    | sbyte  | **food_surplus** -- excess food per turn (food - consumption) |
| 0x53   | `0064f393`         | 1    | sbyte  | **food_consumed** -- food consumed per turn |
| 0x54   | `0064f394`         | 4    | int    | **alive_flag** -- 0 = empty slot, nonzero = active city |

### Key Functions

- **FUN_00473666** -- Save/load city data
- **FUN_00430000+** (block_00430000.c) -- City management, production, resources (extensively uses all fields)
- **FUN_0043xxxx** -- City display and specialist management

---

## 6. Global Variables of Interest

| Address       | Type    | Name / Description |
|---------------|---------|--------------------|
| `DAT_006d1da0`| int     | **current_player** -- index (0-7) of the currently active player |
| `DAT_00655af8`| short   | **current_turn** -- current game turn number |
| `DAT_00655b03`| byte    | **active_civ** -- currently processing civilization |
| `DAT_00655b04`| byte    | **human_player_id** -- which player index is human |
| `DAT_00655b07`| byte    | **god_mode** -- cheat/debug flag |
| `DAT_00655b0a`| byte    | **active_civs_bitmask** -- bitmask of which player slots are active |
| `DAT_00655b0b`| byte    | **human_civs_bitmask** -- bitmask of which slots are human-controlled |
| `DAT_00655b0d`| byte    | **num_ai_players** -- number of AI players |
| `DAT_00655b16`| short   | **num_unit_slots** -- total number of unit instance slots |
| `DAT_00655b18`| short   | **num_city_slots** -- total number of city instance slots |
| `DAT_00655c20`| byte    | **ai_current** -- AI player being processed |
| `DAT_0064bcba`| byte    | **some_civ_reference** -- secondary civ index used in display |
| `DAT_0064bcc8`| byte    | **movement_multiplier** -- multiplier for base movement (likely 3 for road bonus) |
| `DAT_0064b118`| int     | **treaty_cost** -- gold cost of current diplomatic treaty being negotiated |
| `DAT_0064b0ec`| int     | **ai_target** -- target for AI operations |
| `DAT_0064b0fc`| int     | **ai_ally** |
| `DAT_0064b100`| int     | **ai_enemy** |
| `DAT_0064b11c`| int     | **scenario_flag** |
| `DAT_00655b02`| byte    | **save_format_version** -- determines how data is read from save files |

---

## 7. Wonder Obsolescence Table

- **Base address:** `0x0064BA28`
- **Count:** 28 (`0x1C`)
- **Entry size:** 1 byte
- **Loaded from:** RULES.TXT `[ENDWONDER]` section

Each byte is the tech ID that makes the corresponding wonder obsolete (-3 = error).

---

## 8. Government Names Table

- **Base address:** `0x0064B9A0`
- **Stride:** 4 bytes (pointer to string)
- **Indexed by:** government_type field from Civilization struct (offset 0x15)

---

## Cross-Reference: How Structs Link Together

1. **Unit -> Unit Type:** `unit.type_id` (offset 0x06) indexes into Unit Type Table at `0x0064B1B8 + type_id * 0x14`
2. **Unit -> Owner Civ:** `unit.owner` (offset 0x07) indexes into Civilization array at `0x0064C6A0 + owner * 0x594`
3. **City -> Owner Civ:** `city.owner` (offset 0x08) indexes into Civilization array
4. **City -> Building Type:** `city.building_what` (offset 0x39) negative values index into Improvement table at `0x0064C488 + (-type) * 8`; positive values into Unit Type table
5. **Civ -> Leader Portrait:** `civ.leader_graphic_id` (offset 0x06) indexes into `DAT_006554FC + id * 0x30`
6. **Civ -> Research Tech:** `civ.researching_tech` (offset 0x0A) indexes into tech table at `DAT_00627684 + tech * 0x10`
7. **Improvement -> Obsolescence:** Improvement's prerequisite_tech chains through `DAT_0062768e[tech * 0x10]`
