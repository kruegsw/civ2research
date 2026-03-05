# Civ2 MGE City Data Structure

## Array Location

| Property | Value |
|---|---|
| Array base address | `0x0064F340` |
| Struct stride | `0x58` (88 bytes) |
| Max entries | 256 (indices 0-255, loop bound `0x100`) |
| Active count variable | `DAT_00655b18` (tracks highest used index + 1) |
| Max usable index | 254 (`0xFE`); if `DAT_00655b18 > 0xFE`, "TOOMANYCITIES" message |
| Validity check | `*(int*)(&DAT_0064f394 + idx * 0x58) != 0` (field at offset 0x54) |

## File I/O

- **Save format version >= 0x2A**: Reads/writes entire block: `fread(&DAT_0064f340, DAT_00655b18 * 0x58, 1, file)` -- all 0x58 bytes per city, contiguous.
- **Save format version 0x29**: Same as above.
- **Save format version < 0x29**: Reads only 0x54 bytes per city (older format, no city_id field in file); the last 4 bytes (offset 0x54-0x57) are assigned in-memory from a running counter.
- After loading, the `city_id` field (offset 0x54) is reassigned from `DAT_00627fdc` (a monotonically incrementing unique ID counter).

## Complete Field Map

All offsets relative to struct base (`&DAT_0064f340 + idx * 0x58`).

### Core Identity (offsets 0x00 - 0x0B)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x00` | 2 | `short` | `DAT_0064f340` | **x** | Map X coordinate. Used in all distance calculations, movement, and map rendering. |
| `0x02` | 2 | `short` | `DAT_0064f342` | **y** | Map Y coordinate. Always paired with X for tile lookups. |
| `0x04` | 4 | `uint32` | `DAT_0064f344` | **flags** | City status bitfield. See "City Flags" section below. Accessed as both a 32-bit word and individual bytes (0x345, 0x346, 0x347). |
| `0x08` | 1 | `byte` | `DAT_0064f348` | **owner** | Owning civilization index (0-7). Compared against `DAT_006d1da0` (current player). Used to index into civ data at stride `0x594`. |
| `0x09` | 1 | `byte` (signed) | `DAT_0064f349` | **size** | City population size (1-based). Used for food box calculation (`(size+1) * food_factor`), display, happiness math. Capital founded late in game can get initial size > 1. |
| `0x0A` | 1 | `byte` | `DAT_0064f34a` | **original_owner** | Original founding civilization. Used to detect conquered cities (`owner != original_owner`), affects revolt checks and AI diplomacy. |
| `0x0B` | 1 | `byte` | `DAT_0064f34b` | **turn_founded_mod64** | Turn counter related to founding. Set to `DAT_00655af8` (current turn) on creation. Checked with `((byte - 1) ^ (turn & 0x3F)) & 0x3F == 0` -- appears to be `turn_founded mod 64`. |

### Visibility and Per-Civ Data (offsets 0x0C - 0x14)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x0C` | 1 | `byte` | `DAT_0064f34c` | **civ_visibility_bitmask** | Bitfield: bit N set means civ N can see this city. Checked with `(1 << (civ & 0x1f)) & visibility`. Set to `0xFF` (all visible) or `0x00` on creation depending on `DAT_00655c18`. |
| `0x0D` | 8 | `byte[8]` | `DAT_0064f34d` | **civ_pop_knowledge[8]** | Per-civilization "last known size" of this city. Index = civ number (0-7). Set to the city's current `size` when that civ's visibility updates. Used in diplomacy and AI evaluation. Compared against `size` field (0x09). |

### Padding (offset 0x15)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x15` | 1 | `byte` | `DAT_0064f355` | **unused** | Never directly referenced in decompiled code. Padding byte between per-civ array and worker tiles. |

### Worker Tile Assignment (offset 0x16 - 0x19)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x16` | 4 | `uint32` | `DAT_0064f356` | **worker_tiles** | 2-bit field per tile slot (16 slots, 32 bits total). Each 2-bit value encodes what the citizen on that tile produces. Accessed via `(value >> (slot * 2)) & 3`. Set via `value = (value & ~(3 << shift)) | (new << shift)`. Initialized to 0 on city creation. |

### Food and Production Stockpile (offsets 0x1A - 0x1F)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x1A` | 2 | `short` | `DAT_0064f35a` | **food_box** | Accumulated food toward next population growth. Grows each turn by food surplus. When it reaches `(size+1) * food_per_row`, city grows. Can go negative (famine). Reset to 0 on growth. |
| `0x1C` | 2 | `short` | `DAT_0064f35c` | **shield_box** | Accumulated shields toward current production. Compared against unit/building cost. Reset on completion. Halved when production changes in some cases. Key field for rush-buy calculations. |
| `0x1E` | 2 | `short` | `DAT_0064f35e` | **trade_revenue** | Net trade output. Computed as `total_trade - corruption`. Used in trade route value calculations and to determine science/tax/luxury split. |

### City Name (offsets 0x20 - 0x2F)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x20` | 16 | `char[16]` | `DAT_0064f360` | **name** | Null-terminated city name string (max 15 chars + null). Cleared with `_memset(name, 0, 0x10)` then set with `_strncpy(name, source, 0xf)`. Passed to `thunk_FUN_0040bbe0` (draw city name), `thunk_FUN_0040ff60` (message display), `thunk_FUN_0043c8d0` (string format). |

### City Improvements Bitfield (offsets 0x30 - 0x33)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x30` | 4 | `uint32` | `DAT_0064f370` | **improvements_lo** | Bitfield for improvements/wonders. Bit N set = improvement N is built. Checked with `(value & (1 << (id & 0x1f))) != 0`. Upper 6 bits (`>> 0x1a`) used as a separate counter/field (possibly completed wonder display count or science beaker accumulation counter). Initialized to 0 on creation. |

### Tile Improvement Bitfield (offsets 0x34 - 0x38)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x34` | 5 | `byte[5]` | `DAT_0064f374` | **tile_improvements** | Per-tile improvement bits for the city radius (up to ~40 bits for 20 tiles). Cleared with `_memset(ptr, 0, 5)`. Individual bits set/cleared with mask operations. Copied between cities during conquest. |

### Current Production (offset 0x39)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x39` | 1 | `byte` (signed) | `DAT_0064f379` | **current_production** | What the city is currently building. **Positive values (0-61)**: improvement/wonder ID. Checked `< 0x3E` (62). **Negative values**: unit type, encoded as `-(unit_id + 0x27)` or similar negation. When negative, `~value + 1` gives the unit cost index. Special values: `0` = nothing, `-1` = capitalization, `-0x26` (= -38) = threshold for unit vs improvement. Updated by `thunk_FUN_004eb4ed`. Indexed into `DAT_0064c7f4` (civ's building count array, stride 0x594). |

### Trade Route Count (offset 0x3A)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x3A` | 1 | `byte` (signed) | `DAT_0064f37a` | **num_trade_routes** | Number of active trade routes (0-3 max). Used as loop bound for iterating trade route arrays. Decremented when a route is removed, incremented when added (capped at 3). |

### City Supply/Demand and Trade Route Data (offsets 0x3B - 0x49)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x3B` | 3 | `byte[3]` | `DAT_0064f37b` | **supply_commodities[3]** | City's 3 supply commodity IDs (signed byte). Populated from commodity tables during city setup. Values > 13 indicate special commodities. Matched against other cities' demand for trade route value. |
| `0x3E` | 3 | `byte[3]` | `DAT_0064f37e` | **demand_commodities[3]** | City's 3 demand commodity IDs (signed byte). Populated from commodity tables during city setup. Values > 13 indicate special commodities. A trade route matches when one city supplies what the other demands. |
| `0x41` | 3 | `byte[3]` | `DAT_0064f381` | **trade_route_type[3]** | Trade route connection type/status (signed byte). Negative values indicate foreign-owned partner. Used in trade revenue calculations. Accessed alongside partner arrays. Cleared with `_memset(ptr, 0, 3)`. |
| `0x44` | 6 | `short[3]` | `DAT_0064f384` | **trade_route_partner[3]** | City index of the trade partner for each route. `short` values (2 bytes each, 3 routes). Used to look up the partner city's coordinates, owner, and stats for revenue calculation. Cleared with `_memset(ptr, 0, 3)` (partial clear of first 3 bytes). |

### Cached Resource Output (offsets 0x4A - 0x53)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x4A` | 2 | `short` | `DAT_0064f38a` | **food_output** | Total food production (after improvements, terrain, government). Cached from `DAT_006a6578` during city processing. Summed across all cities for civ totals. |
| `0x4C` | 2 | `short` | `DAT_0064f38c` | **shield_output** | Total shield production. Cached from `DAT_006a6554`. Used for rush-buy cost calculations and production speed display. |
| `0x4E` | 2 | `short` | `DAT_0064f38e` | **trade_output** | Total trade arrows. Cached from the trade calculation. Used in revenue split (science/tax/luxury) and trade route displays. Passed to `thunk_FUN_004ea1f6` for processing. |
| `0x50` | 1 | `byte` | `DAT_0064f390` | **total_food_surplus** | Net food surplus/deficit after population consumption. Cached from `DAT_006a65c8`. Displayed in city screen. |
| `0x51` | 1 | `byte` | `DAT_0064f391` | **total_shield_surplus** | Net shield surplus after unit support. Cached from `DAT_006a65cc`. Used in AI to compare city productivity. Compared between cities for governor decisions. |
| `0x52` | 1 | `byte` (signed) | `DAT_0064f392` | **happy_citizens** | Number of happy citizens. Cached from `DAT_006a6550`. Compared with `unhappy_citizens` for civil disorder/WeLoveDay checks. `size - happy - unhappy = content`. |
| `0x53` | 1 | `byte` (signed) | `DAT_0064f393` | **unhappy_citizens** | Number of unhappy citizens. Cached from `DAT_006a65a8`. When `unhappy > happy`, city is in civil disorder. When `unhappy == 0 && happy > 0`, We Love the King Day. |

### City Unique ID (offsets 0x54 - 0x57)

| Offset | Size | Type | DAT Address | Field Name | Description |
|--------|------|------|-------------|------------|-------------|
| `0x54` | 4 | `int32` | `DAT_0064f394` | **city_id** | Unique city identifier. Non-zero = city slot is in use (this is THE validity check). Assigned from `DAT_00627fdc` (monotonically incrementing counter) on creation. Set to 0 when city is destroyed. Reassigned on save game load. In older save formats (< 0x29), this field is not saved to disk. |

---

## City Flags (offset 0x04, `uint32`)

The 4-byte flags field is a dense bitfield. The decompiler accesses it both as a full 32-bit word (`*(uint *)(&DAT_0064f344 + ...)`) and as individual bytes (`(&DAT_0064f345)[...] & mask`, `(&DAT_0064f346)[...] & mask`, `(&DAT_0064f347)[...] & mask`).

### Byte 0 (offset 0x04, `DAT_0064f344`) -- bits 0-7

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| 0 | `0x01` | **We Love the King Day / Celebrating** -- Checked in population display and trade bonuses. Set during city capture (`0x4001`). | `block_004E0000.c:5838`, `block_00500000.c:4320` |
| 1 | `0x02` | **Civil Disorder** -- City is in disorder. Set when unhappy > happy. | `block_004E0000.c:5908`, `block_004B0000.c:5923` |
| 2 | `0x04` | **Has paid production tax this turn** -- Set after gold/buy processing. | `block_00500000.c:2659` |
| 3 | `0x08` | **City was just conquered / auto-production** -- Checked during production selection. | `block_004C0000.c:2217`, `block_004C0000.c:2380` |
| 4 | `0x10` | **Build order queued/changed** -- Set when production queue updated. | `block_00500000.c:5068`, `block_004E0000.c:5103` |
| 5 | `0x20` | **City has been modified this turn** -- Needs recalculation. Set on trade route changes, capture events. | `block_00440000.c:529`, `block_00580000.c:1001`, `block_00570000.c:5020` |
| 6 | `0x40` | **AI has processed this city** -- Used in AI city management. | `block_00530000.c:589`, `block_00490000.c:4203` |
| 7 | `0x80` | **Coastal city** -- Has ocean/water in city radius. Set on creation if water tile found. | `block_00430000.c:5721`, `block_00450000.c:2720` |

### Byte 1 (offset 0x05, `DAT_0064f345`) -- bits 8-15

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| 8 | `0x100` | **Has produced something / production complete** | `block_004E0000.c:2476`, `block_004E0000.c:4924` |
| 9 | `0x200` | **Part of 0x600: AI shield/military flag** | `block_00530000.c:3510` |
| 10 | `0x400` | **Part of 0x600: AI shield/military flag** | `block_00530000.c:3510` |
| 11 | `0x800` | **Has special terrain in radius** | `block_00430000.c:5726` |
| 12 | `0x1000` | **Production-related flag** | `block_004E0000.c:4733` |
| 13 | `0x2000` | **Has auto-settler or automation** | `block_004E0000.c:5854` |
| 14 | `0x4000` | **Auto-production unit type flag** | `block_004E0000.c:5871` |
| 15 | `0x8000` | **Food processing/granary flag** | `block_004E0000.c:3365`, `block_004E0000.c:3461` |

### Byte 1 (offset 0x05, `DAT_0064f345`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x100` overall | **See above** | `block_00490000.c:5487` |
| bit 1 (0x02) | `0x200` overall | **City has been traded/diplomatic** | `block_00530000.c:2790`, `block_00580000.c:5363` |
| bit 2 (0x04) | `0x400` overall | **AI production priority** | `block_00530000.c:1255` |
| bit 3 (0x08) | `0x800` overall | **Special terrain** | `block_004C0000.c:76` (check for unit 0x14) |
| bit 4 (0x10) | `0x1000` overall | **Production overflow** | `block_00490000.c:5653` |
| bit 5 (0x20) | `0x2000` overall | **Has auto-settler** | `block_004E0000.c:5849`, `block_00490000.c:6076` |
| bit 6 (0x40) | `0x4000` overall | **Granary/food flag** | `block_004E0000.c:3360` |

### Byte 2 (offset 0x06, `DAT_0064f346`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x10000` | **City has caravan en route / trade flag** | `block_00490000.c:4560`, `block_00530000.c:2369`, `block_00580000.c:4779` |
| bit 1 (0x02) | `0x20000` | **Needs redraw / dirty flag** | `block_00430000.c:4803` |
| bit 4 (0x10) | `0x100000` | **AI notification flag** | `block_00500000.c:4321` |
| bit 5 (0x20) | `0x200000` | **River in radius** | `block_004C0000.c:53`, `block_004B0000.c:7034` |
| bit 6 (0x40) | `0x400000` | **Revealed to all / spy visibility** | `block_00410000.c:717`, `block_004C0000.c:2323` |

### Byte 3 (offset 0x07, `DAT_0064f347`) -- accessed directly

| Bit | Hex | Description | References |
|-----|-----|-------------|------------|
| bit 0 (0x01) | `0x1000000` | **AI build preference 1** | `block_00490000.c:6096`, `block_00500000.c:5072` |
| bit 1 (0x02) | `0x2000000` | **AI build preference 2** | `block_00490000.c:6097`, `block_00500000.c:5077` |
| bit 2 (0x04) | `0x4000000` | **Display toggle (wonder movie?)** -- Toggled with XOR. | `block_00550000.c:2724`, `block_00430000.c:4572` |
| bit 3 (0x08) | `0x8000000` | **AI mobilization / war footing** | `block_00580000.c:158`, `block_00530000.c:3952` |

### Combined flag patterns used in code

| Pattern | Hex | Meaning |
|---------|-----|---------|
| `0x4001` | WLtKD + celebration set together | `block_004E0000.c:5838` |
| `0x600` | AI shield priority flags | `block_00530000.c:3510` |
| `0x10000` | City has outbound caravan | Many AI files |
| `0x20000` | Set on any modification | Trade route add/remove |
| `0x80000` | Food surplus flag | `block_004F0000.c:208` |
| `0x80040` | Coastal + AI flag combo check | `block_00490000.c:4383` |
| `0xFFBFFFFF` | Clear bit 22 (0x400000) | `block_005A0000.c:3477` |
| `0xFFFEFFFF` | Clear bit 16 (0x10000) | `block_00480000.c:1975` |
| `0xFFFFFFFC` | Clear bits 0-1 (disorder+WLtKD) | `block_00550000.c:2689` |
| `0xFFFFFFC4` | Clear multiple low bits | `block_00570000.c:4789` |

---

## Current Production Encoding (offset 0x39)

The `current_production` field uses signed byte encoding:

| Value Range | Meaning |
|-------------|---------|
| `0` | Nothing / Capitalization |
| `1` to `61` (0x3D) | Improvement or Wonder ID (indexes into improvement table at `DAT_0064C488`, stride 0x08) |
| `-1` (0xFF) | Capitalization (gold conversion) |
| `-2` to `-38` (-0x26) | Near-zero unit range (rare units or placeholder) |
| `< -38` (< -0x26) | Unit production. Unit type = `-(value + 0x27)` approximately. These index into `DAT_0064c488` (unit table, stride 8). |

The value `-0x26` (-38) is a critical threshold: values less than -38 are unit production, values -38 through -1 are special wonders/improvements.

When a city changes production, the improvement count array `(&DAT_0064c7f4)[civ * 0x594 + prod_id]` is updated (decremented for old, incremented for new).

---

## Key Functions

| Function | Address | Purpose |
|----------|---------|---------|
| `create_city` | `0x0043F8B0` | Creates a new city. Initializes all fields to defaults. |
| Delete city | `~0x00440000 area` | Sets `city_id` to 0, decrements `DAT_00655b18` if last entry. Removes trade routes. |
| City turn processing | `0x004EA8E4` | Calculates all resource output for a city. Updates cached food/shield/trade/happy/unhappy. |
| Trade route calculation | `0x004EA031+` | Computes trade revenue including route bonuses. |
| Worker tile assignment | `0x004E7540` | Sets 2-bit worker tile assignment. |
| Worker tile query | `0x004E75A6` | Gets 2-bit worker tile assignment for a slot. |
| Has improvement check | `0x004E78CE` | Tests if improvement bit is set in `improvements_lo`. |
| Set improvement | `0x004E790C` | Sets or clears an improvement bit. |
| Change production | `0x004440xx area` | Updates `current_production` field and related civ counts. |
| City name assignment | `0x0043F493` | Reads city names from data files, assigns to city name field. |
| Load cities from file | `0x00471xxx` | Reads city array from save file (size depends on version). |
| Save cities to file | `0x00475xxx` | Writes `DAT_00655b18 * 0x58` bytes to save file. |
| City display / paint | `0x00500xxx` | City screen rendering. Reads nearly every field. |
| AI city evaluation | `0x00490xxx` | AI decision-making: what to build, where to settle. |
| Capture/conquer city | `0x00570xxx` | Transfers city between civs. Updates owner, flags, trade routes. |

---

## Key Global Variables

| Address | Name | Description |
|---------|------|-------------|
| `DAT_00655b18` | `num_cities` | Current number of city slots in use (loop bound) |
| `DAT_00627fdc` | `next_city_id` | Monotonically incrementing unique city ID counter |
| `DAT_006d1da0` | `current_player` | Currently active player civ index |
| `DAT_00655af8` | `current_turn` | Current game turn number |
| `DAT_00655b0b` | `human_players_bitmask` | Bitmask of human-controlled civs |
| `DAT_00655b02` | `game_mode` | Game mode (0=single, 3+=multiplayer) |
| `DAT_006a6578` | `calc_food` | Temporary: total food during city processing |
| `DAT_006a6554` | `calc_shields` | Temporary: total shields during city processing |
| `DAT_006a65d0` | `calc_trade_gross` | Temporary: gross trade during city processing |
| `DAT_006a6580` | `calc_corruption` | Temporary: corruption during city processing |
| `DAT_006a65c8` | `calc_food_surplus` | Temporary: food surplus during processing |
| `DAT_006a65cc` | `calc_shield_surplus` | Temporary: shield surplus during processing |
| `DAT_006a6550` | `calc_happy` | Temporary: happy citizens during processing |
| `DAT_006a65a8` | `calc_unhappy` | Temporary: unhappy citizens during processing |
| `DAT_006a6560` | `food_per_citizen` | Food consumed per citizen per turn |
| `DAT_0064bcca` | `food_per_row` | Food needed per food box row |
| `DAT_0064bccc` | `shields_per_row` | Shields per production row |

---

## C Struct Reconstruction

```c
#define MAX_CITIES 256
#define MAX_TRADE_ROUTES 3
#define MAX_CIVS 8
#define CITY_NAME_LEN 16
#define TILE_IMPROVEMENT_BYTES 5

typedef struct {
    /* 0x00 */ short x;                          // Map X coordinate
    /* 0x02 */ short y;                          // Map Y coordinate
    /* 0x04 */ unsigned int flags;               // City status bitfield (see flags table)
    /* 0x08 */ unsigned char owner;              // Owning civilization (0-7)
    /* 0x09 */ char size;                        // Population size (1+)
    /* 0x0A */ unsigned char original_owner;     // Founding civilization
    /* 0x0B */ unsigned char turn_founded_mod64; // Turn founded modulo 64
    /* 0x0C */ unsigned char civ_visibility;     // Bitfield: which civs can see this city
    /* 0x0D */ char civ_pop_knowledge[8];        // Per-civ last-known population
    /* 0x15 */ unsigned char _padding;           // Unused byte
    /* 0x16 */ unsigned int worker_tiles;        // 2-bit per tile: citizen work assignment
    /* 0x1A */ short food_box;                   // Accumulated food toward growth
    /* 0x1C */ short shield_box;                 // Accumulated shields toward production
    /* 0x1E */ short trade_revenue;              // Net trade after corruption
    /* 0x20 */ char name[16];                    // City name (null-terminated, 15 chars max)
    /* 0x30 */ unsigned int improvements;        // Improvement/wonder bitfield (bits 0-25)
                                                 // Bits 26-31: counter/accumulator
    /* 0x34 */ unsigned char tile_improvements[5]; // Per-tile improvement bits for radius
    /* 0x39 */ char current_production;          // What is being built (signed encoding)
    /* 0x3A */ char num_trade_routes;            // Active trade routes (0-3)
    /* 0x3B */ char supply_commodities[3];       // City's 3 supply commodity IDs
    /* 0x3E */ char demand_commodities[3];       // City's 3 demand commodity IDs
    /* 0x41 */ char trade_route_type[3];         // Trade route connection type per route
    /* 0x44 */ short trade_route_partner[3];     // Partner city index per route
    /* 0x4A */ short food_output;                // Cached total food production
    /* 0x4C */ short shield_output;              // Cached total shield production
    /* 0x4E */ short trade_output;               // Cached total trade arrows
    /* 0x50 */ char food_surplus;                // Cached net food surplus
    /* 0x51 */ unsigned char shield_surplus;     // Cached net shield surplus
    /* 0x52 */ char happy_citizens;              // Cached happy citizen count
    /* 0x53 */ char unhappy_citizens;            // Cached unhappy citizen count
    /* 0x54 */ int city_id;                      // Unique ID (non-zero = valid)
} City;  // Total: 0x58 = 88 bytes

// City array: City cities[256] at address 0x0064F340
```

---

## Validation Pattern

Every function that iterates cities uses this pattern:

```c
for (i = 0; i < DAT_00655b18; i++) {
    if (*(int *)(&DAT_0064f394 + i * 0x58) != 0) {  // city_id != 0
        if ((char)(&DAT_0064f348)[i * 0x58] == civ) { // owner == target civ
            // ... process city ...
        }
    }
}
```

The `city_id` field (offset 0x54) being non-zero is the universal "city slot is occupied" check. When a city is destroyed, only this field is set to zero.
