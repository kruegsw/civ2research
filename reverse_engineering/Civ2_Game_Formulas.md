# Civ2 MGE Game Formulas - Extracted from Decompiled Code

This document contains key game formulas reverse-engineered from the Civ2 MGE executable
using Ghidra decompilation. Each section includes the decompiled pseudocode, a plain-English
explanation, and JavaScript implementation.

---

## Key Data Structures and Constants

### Global Variable Map

From `FUN_00419d23` (COSMIC rules loading at `block_00410000.c`):

| Variable | COSMIC Index | Default | Range | Meaning |
|----------|-------------|---------|-------|---------|
| `DAT_0064bcc8` | 0 | 1 | 1-10 | Road movement multiplier |
| `DAT_0064bcc9` | 1 | 1 | 1-100 | (unused/trade route related) |
| `DAT_0064bcca` | 2 | 0 | 0-10 | Riot factor (citizens per city for WLTKD) |
| `DAT_0064bccb` | 3 | 4 | 4-20 | **Food box size factor** (forced even) |
| `DAT_0064bccc` | 4 | 4 | 4-20 | **Shield box size factor** |
| `DAT_0064bccd` | 5 | 0 | 0-10 | Tech transfer rate (same continent) |
| `DAT_0064bcce` | 6 | 0 | 0-10 | Tech transfer rate (different continent) |
| `DAT_0064bccf` | 7 | 4 | 4-12 | **Content citizens base** |
| `DAT_0064bcd0` | 8 | 10 | 10-100 | **Unhappiness offset** |
| `DAT_0064bcd1` | 9 | 4 | 4-50 | (related to city radius) |
| `DAT_0064bcd2` | 10 | 4 | 4-50 | (related to city radius) |
| `DAT_0064bcd3` | 11 | 3 | 3-10 | **Tech cost multiplier** (tenths) |
| `DAT_0064bcd4` | 12 | 5 | 5-100 | (future tech cost?) |
| `DAT_0064bcd5` | 13 | 0 | 0-8 | **Free support: Republic/Democracy** |
| `DAT_0064bcd6` | 14 | 0 | 0-8 | **Free support: Monarchy/Communism** |
| `DAT_0064bcd7` | 15 | 0 | 0-8 | **Free support: Fundamentalism** |
| `DAT_0064bcd8` | 16 | 1 | 1-20 | **Communism corruption equiv. distance** |
| `DAT_0064bcd9` | 17 | 0 | 0-100 | **Communism shield waste percent** |
| `DAT_0064bcda` | 18 | 0 | 0-100 | (related to combat) |
| `DAT_0064bcdb` | 19 | 4 | 4-100 | (city related) |
| `DAT_0064bcdc` | 20 | 25 | 25-200 | (movement related) |
| `DAT_0064bcdd` | 21 | 0 | 0-10 | **Max luxury rate under Communism** |

### City Struct Layout (stride = 0x58 = 88 bytes, base = `DAT_0064f340`)

| Offset | Variable | Type | Meaning |
|--------|----------|------|---------|
| +0x00 | `DAT_0064f340` | short | City X coordinate |
| +0x02 | `DAT_0064f342` | short | City Y coordinate |
| +0x04 | `DAT_0064f344` | uint32 | City flags bitfield |
| +0x08 | `DAT_0064f348` | byte | Owner civ index |
| +0x09 | `DAT_0064f349` | byte | **City population (size)** |
| +0x1A | `DAT_0064f35a` | short | **Food stored** |
| +0x1C | `DAT_0064f35c` | short | **Shields stored** |
| +0x1E | `DAT_0064f35e` | short | Trade (gross) |
| +0x20 | `DAT_0064f360` | char[] | City name string |
| +0x34 | `DAT_0064f374` | byte[5] | **Building flags** (bitfield) |
| +0x39 | `DAT_0064f379` | byte | **Currently building** (neg=unit) |
| +0x3A | `DAT_0064f37a` | byte | Trade route count |
| +0x4A | `DAT_0064f38a` | short | Luxury output |
| +0x4C | `DAT_0064f38c` | short | Science output |
| +0x4E | `DAT_0064f38e` | short | Gold (tax) output |
| +0x50 | `DAT_0064f390` | byte | Food surplus |
| +0x51 | `DAT_0064f391` | byte | Shield surplus |
| +0x52 | `DAT_0064f392` | byte | **Happy citizens** |
| +0x53 | `DAT_0064f393` | byte | **Unhappy citizens** |
| +0x54 | `DAT_0064f394` | int | (city exists flag) |

### Civ Struct Layout (stride = 0x594 = 1428 bytes, base = `DAT_0064c6a0`)

| Offset | Variable | Type | Meaning |
|--------|----------|------|---------|
| +0x00 | `DAT_0064c6a0` | ushort | Civ flags |
| +0x02 | `DAT_0064c6a2` | int | **Gold treasury** |
| +0x08 | `DAT_0064c6a8` | short | **Research accumulated** |
| +0x0A | `DAT_0064c6aa` | short | **Current research target** (-1=none) |
| +0x10 | `DAT_0064c6b0` | byte | **Techs known (count A)** |
| +0x12 | `DAT_0064c6b2` | byte | **Techs known (count B)** |
| +0x13 | `DAT_0064c6b3` | byte | **Luxury rate** (tenths) |
| +0x14 | `DAT_0064c6b4` | byte | **Science rate** (tenths) |
| +0x15 | `DAT_0064c6b5` | byte | **Government type** |

### Government Type Values

| Value | Government |
|-------|-----------|
| 0 | Anarchy |
| 1 | Despotism |
| 2 | Monarchy |
| 3 | Communism |
| 4 | Fundamentalism |
| 5 | Republic |
| 6 | Democracy |

### Other Globals

| Variable | Meaning |
|----------|---------|
| `DAT_00655b08` | **Difficulty level** (0=Chieftain, 5=Deity) |
| `DAT_00655b0b` | **Human player bitmask** |
| `DAT_00655b18` | Max number of cities |
| `DAT_00655b16` | Max number of units |
| `DAT_006d1da0` | **Current player civ index** |
| `DAT_00655af8` | **Current turn number** |

### Building Improvement IDs (param_2 to `FUN_0043d20a`)

| ID | Building |
|----|----------|
| 0x01 (1) | Palace |
| 0x04 (4) | Temple |
| 0x05 (5) | Marketplace |
| 0x06 (6) | Library |
| 0x07 (7) | Courthouse |
| 0x0A (10) | Bank |
| 0x0B (11) | Cathedral |
| 0x0C (12) | University |
| 0x0D (13) | City Walls |
| 0x0E (14) | Colosseum |
| 0x0F (15) | Factory |
| 0x10 (16) | Manufacturing Plant |
| 0x12 (18) | SDI Defense |
| 0x13 (19) | Recycling Center |
| 0x14 (20) | Power Plant |
| 0x15 (21) | Hydro Plant |
| 0x16 (22) | Nuclear Plant |
| 0x18 (24) | Supermarket |
| 0x19 (25) | Superhighways |
| 0x1A (26) | Research Lab |
| 0x1D (29) | SS Component? / Police Station |
| 0x1E (30) | Offshore Platform (food+1 ocean) |
| 0x1F (31) | (shield bonus ocean?) |
| 0x20 (32) | Airport |
| 0x21 (33) | Port Facility |
| 0x22 (34) | Capitalization |

---

## 1. Production Rush-Buy Cost

**Function:** `city_button_buy` at `0x00509B48` in `block_00500000.c`

### Decompiled Pseudocode (cleaned up)

```c
// city_button_buy @ 0x509B48
void city_button_buy(int param_1) {
    int city_idx = get_current_city();
    int civ_idx = city[city_idx].owner;
    int building_id = city[city_idx].currently_building;  // DAT_0064f379

    int total_cost;
    int remaining_shields;
    int shields_stored = city[city_idx].shields_stored;    // DAT_0064f35c

    if (building_id < 0) {
        // UNIT production (building_id is negative, negate to get unit type)
        int unit_type = -building_id;
        int unit_shield_cost = unit_table[unit_type].shield_cost;  // DAT_0064c48c[type*8]
        remaining_shields = clamp(
            shield_box_factor * unit_shield_cost - shields_stored,
            0, 999
        );
        total_cost = remaining_shields * 2;

        // WONDER multiplier: if unit_type > 0x22 (wonders)
        if (unit_type > 0x22) {
            total_cost = remaining_shields * 4;  // 4x for wonders
        }
    }
    else {
        // BUILDING/IMPROVEMENT production
        int bldg_shield_cost = building_table[building_id].shield_cost;  // DAT_0064b1c8[id*0x14]
        remaining_shields = clamp(
            shield_box_factor * bldg_shield_cost - shields_stored,
            0, 999
        );
        // Quadratic formula for buildings
        total_cost = (remaining_shields * remaining_shields) / 20 + remaining_shields * 2;
    }

    // If no shields invested yet, DOUBLE the cost
    if (shields_stored == 0) {
        total_cost = total_cost * 2;
    }

    // Check if player can afford it
    if (total_cost <= civ[civ_idx].gold) {
        // Buy it: deduct gold, complete production
        civ[civ_idx].gold -= total_cost;
        city[city_idx].shields_stored = shield_box_factor * shield_cost;
    }
}
```

### Key Lines from Decompiled Code

```c
// Unit formula (line 4568):
local_35c = iVar5 * 2;        // cost = remaining * 2
if (0x22 < -iVar4) {           // if wonder
    local_35c = iVar5 << 2;   // cost = remaining * 4
}

// Building formula (line 4582):
local_35c = (iVar5 * iVar5) / 0x14 + iVar5 * 2;  // cost = remaining^2/20 + remaining*2

// Double if nothing invested (line 4587):
if (shields_stored == 0) {
    local_35c = local_35c << 1;  // cost *= 2
}
```

### Plain English

- **Units:** Cost = 2 gold per remaining shield
- **Buildings/Improvements:** Cost = (remaining^2 / 20) + (2 * remaining) -- a quadratic formula
- **Wonders:** Cost = 4 gold per remaining shield
- **No investment penalty:** If zero shields have been accumulated, the total cost is doubled
- `shield_box_factor` (`DAT_0064bccc`, default 10) multiplied by the item's base cost gives total shields needed

### JavaScript Implementation

```javascript
function calculateBuyCost(item, shieldsStored, shieldBoxFactor = 10) {
    const totalShieldsNeeded = shieldBoxFactor * item.shieldCost;
    const remaining = Math.max(0, Math.min(999, totalShieldsNeeded - shieldsStored));

    let cost;
    if (item.type === 'unit') {
        cost = remaining * 2;
    } else if (item.type === 'wonder') {
        cost = remaining * 4;
    } else {
        // Building: quadratic formula
        cost = Math.floor(remaining * remaining / 20) + remaining * 2;
    }

    // Double cost if no shields invested
    if (shieldsStored === 0) {
        cost *= 2;
    }

    return cost;
}
```

---

## 2. Food Storage / City Growth

**Function:** `FUN_004e7eb1` at `0x004E7EB1` (food box calculation)
**Function:** turn processing in `block_004E0000.c` line 4656 (growth check)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e7eb1 @ 0x4E7EB1 - Calculate food box size
void calculate_food_box(int city_idx, int civ_idx) {
    int food_box_factor = COSMIC_food_box;  // DAT_0064bccb, default 10

    if (is_human_player(civ_idx)) {
        // Human player: use rules.txt value directly
        food_box_size = food_box_factor;
    } else {
        // AI: adjusted by difficulty
        food_box_size = 13 - difficulty_level;  // DAT_00655b08
        if (difficulty_level < 3) {
            food_box_size = 14 - difficulty_level;
        }
        if (difficulty_level == 0) {
            food_box_size += 1;  // Chieftain bonus
        }

        // Late-game adjustment for AI (turn > 200, difficulty > 1)
        // Reduces food box based on diplomatic situation
        if (turn > 200 && difficulty > 1 && human_is_alive) {
            int adjust = clamp(diplomatic_factor, 0, 2);
            food_box_size -= adjust;
        }

        // Scale to rules.txt factor (if not default 10)
        if (food_box_factor != 10) {
            food_box_size = (food_box_factor * food_box_size) / 10;
            if (food_box_size & 1) food_box_size++;  // Force even
        }
    }
}

// Growth check (line 4656):
int food_needed = (city_population + 1) * food_box_size;
if (food_stored >= food_needed) {
    // City grows!
    city_population++;

    // Granary check (FUN_0043d20a with param 3 = granary):
    if (has_building(city_idx, GRANARY) || has_wonder_effect(civ_idx, PYRAMIDS)) {
        // Granary: store half the food box for new size
        food_stored = (city_population + 1) * (food_box_factor / 2);
    } else {
        food_stored = 0;
    }
}
```

### Key Lines from Decompiled Code

```c
// Food box needed to grow (line 4656):
iVar3 = ((char)(&DAT_0064f349)[param_1 * 0x58] + 1) * DAT_006a6560;

// Granary effect (line 4669-4670):
*(short *)(&DAT_0064f35a + param_1 * 0x58) =
    ((char)(&DAT_0064f349)[param_1 * 0x58] + 1) * (short)((int)(uint)DAT_0064bccb >> 1);
// That is: food_stored = (new_pop + 1) * (food_box_factor / 2)
```

### Plain English

- **Food box to grow:** `(population + 1) * food_box_size`
  - Default food_box_size = 10 for humans
  - AI gets difficulty-adjusted values (easier AI = bigger food box = slower growth)
- **Granary effect:** After growth, food stored = `(new_population + 1) * (food_box_factor / 2)`
  - With default factor of 10, that means granary stores `(pop+1) * 5` food
  - Effectively starts you at 50% of the next food box
- **Starvation:** If food surplus is negative, city shrinks (pop-1), and if pop reaches 0, city is destroyed

### JavaScript Implementation

```javascript
function calculateFoodBox(population, foodBoxFactor = 10) {
    return (population + 1) * foodBoxFactor;
}

function processFood(city, foodBoxFactor = 10) {
    const foodNeeded = calculateFoodBox(city.population, foodBoxFactor);

    if (city.foodStored >= foodNeeded) {
        // City grows
        city.population++;

        if (city.hasBuilding(GRANARY) || city.hasWonderEffect(PYRAMIDS)) {
            // Granary: keep half the food box
            city.foodStored = (city.population + 1) * Math.floor(foodBoxFactor / 2);
        } else {
            city.foodStored = 0;
        }
    } else if (city.foodSurplus < 0 && city.foodStored < 0) {
        // Starvation
        city.population--;
        city.foodStored = 0;
        if (city.population <= 0) {
            destroyCity(city);
        }
    }
}

// AI food box calculation
function calculateAIFoodBox(difficultyLevel, foodBoxFactor = 10) {
    let size = 13 - difficultyLevel;
    if (difficultyLevel < 3) size = 14 - difficultyLevel;
    if (difficultyLevel === 0) size += 1;

    if (foodBoxFactor !== 10) {
        size = Math.floor(foodBoxFactor * size / 10);
        if (size % 2 !== 0) size++;
    }
    return size;
}
```

---

## 3. Resource Calculation per Tile

**Function:** `FUN_004e868f` at `0x004E868F` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e868f @ 0x4E868F - Calculate resource output for a tile
// param_1 = city index, param_2 = tile offset (0-20), param_3 = resource type (0=food, 1=shields, 2=trade)
int get_tile_resource(int city_idx, int tile_offset, int resource_type) {
    int civ_idx = city[city_idx].owner;

    // Calculate actual tile coordinates
    int tile_x = city[city_idx].x + city_offset_x[tile_offset];  // DAT_00628370
    int tile_y = city[city_idx].y + city_offset_y[tile_offset];  // DAT_006283a0

    int terrain_type = get_terrain_type(tile_x, tile_y);  // 0-10 (ocean=2, etc.)
    int special = get_special_resource(tile_x, tile_y);   // 0 or 1-10 (special resource)
    byte improvements = get_tile_improvements(tile_x, tile_y);

    // Base value from terrain table: terrain_table[(special * 11 + terrain_type) * 24 + resource_type]
    int output = terrain_table[(special * 11 + terrain_type) * 0x18 + resource_type];
    // DAT_00627cca is the terrain resource table base

    // Global doubling (DAT_00655b02 -- likely cheat/scenario flag)
    if (global_double_flag && scenario_flag) {
        output *= 2;
    }

    // ---- FOOD (resource_type == 0) ----
    if (resource_type == 0) {
        if (terrain_type == 10) {  // Ocean
            if (has_building(city_idx, 0x1E)) {  // Offshore Platform
                output += 1;
            }
        } else {
            if (improvements & IRRIGATED) {  // bits 0x02 | 0x04
                output += irrigation_bonus[terrain_type];  // DAT_00627cd0[type*0x18]
                if (has_building(city_idx, 0x18)) {  // Supermarket
                    if (improvements & FARMLAND) {  // bit 0x08 | 0x02
                        output += output / 2;  // +50% (Supermarket with farmland)
                    }
                }
            }
        }
    }

    // ---- SHIELDS (resource_type == 1) ----
    else if (resource_type == 1) {
        if ((improvements & MINED) || (irrigated_and_no_mining_bonus)) {
            output += mining_bonus[terrain_type];  // DAT_00627cd1[type*0x18]
        }
        if (terrain_type == 2 && !has_ocean_shields(tile_x, tile_y)) {
            output = 0;  // Ocean with no platform
        }
        if (tile_offset == 20 && output == 0) {
            output = 1;  // City center always produces at least 1 shield
        }
    }

    // ---- TRADE (resource_type == 2) ----
    else if (resource_type == 2) {
        if (has_river(tile_x, tile_y)) {
            output += 1;  // River bonus
        }
        if (improvements & ROAD_OR_RAILROAD) {
            if (terrain_type < 3 || output > 0) {
                output += 1;  // Road/railroad trade bonus
            }
        }
        if (output > 0 && has_wonder_effect(city_idx, COLOSSUS)) {
            output += 1;  // Colossus
        }
    }

    // Railroad bonus for shields (resource_type == 1)
    if (resource_type == 1 && has_wonder_effect(city_idx, KING_RICHARDS)) {
        output += 1;
    }
    if (resource_type == 1) {
        if (improvements & RAILROAD) {
            output += output / 2;  // Railroad: +50% shields
        }
    }

    // Despotism penalty: any output > 2 gets -1 under Despotism/Anarchy
    if (output > 2 && !city_has_WLTKD(city_idx)) {
        if (government_type < 2) {  // Anarchy or Despotism
            output -= 1;
        }
    }

    // Trade government bonus
    if (output > 0 && resource_type == 2) {
        // Republic/Democracy: +1 trade per tile that produces trade
        if (government_type >= appropriate_threshold) {
            output += 1;
        }
    }

    // Superhighways (trade): +50%
    if (resource_type == 2 && (improvements & ROAD_OR_RAILROAD) &&
        has_building(city_idx, 0x19)) {
        output += output / 2;
    }

    // Pollution halves output
    if (improvements & POLLUTED) {
        output = (output + 1) >> 1;
    }

    if (output < 0) output = 0;
    return output;
}
```

### Key Lines from Decompiled Code

```c
// Base terrain lookup (line 3102):
local_10 = (int)(char)(&DAT_00627cca)[(iVar5 * 0xb + uVar7) * 0x18 + param_3];

// Irrigation food bonus (line 3123):
local_10 = local_10 + (char)(&DAT_00627cd0)[uVar7 * 0x18];

// Supermarket +50% (line 3130):
local_10 = local_10 + (local_10 >> 1);

// Mining shield bonus (line 3137):
local_10 = local_10 + (char)(&DAT_00627cd1)[uVar7 * 0x18];

// Railroad +50% shields (line 3178):
local_10 = local_10 + (local_10 >> 1);

// Despotism penalty (line 3185-3186):
if ((byte)government_type < 2) {
    local_10 = local_10 + -1;  // -1 for tiles producing 3+
}

// Republic/Democracy trade bonus (line 3196):
if (government_type >= threshold) {  // Republic(5) or Democracy(6)
    local_10 = local_10 + 1;
}

// Superhighways trade +50% (line 3201):
local_10 = local_10 + local_10 / 2;

// Pollution halves output (line 3204):
local_10 = local_10 + 1 >> 1;  // (output+1)/2 rounds up
```

### Plain English

1. Look up base food/shields/trade from the terrain table (11 terrain types x special resources)
2. Apply improvement bonuses (irrigation adds food, mining adds shields, roads add trade)
3. Apply building bonuses (Supermarket +50% food with farmland, Superhighways +50% trade)
4. Apply government effects (Despotism -1 penalty on tiles producing 3+, Republic/Democracy +1 trade)
5. Apply wonder effects (Colossus +1 trade, King Richard's +1 shield, etc.)
6. Railroad gives +50% to shield production
7. Pollution halves all output (rounded up)

### JavaScript Implementation

```javascript
const TERRAIN_TABLE_SIZE = 0x18; // 24 bytes per entry

function getTileResource(city, tileOffset, resourceType, gameState) {
    const tileX = city.x + CITY_OFFSET_X[tileOffset];
    const tileY = city.y + CITY_OFFSET_Y[tileOffset];

    const terrainType = getTerrainType(tileX, tileY);
    const special = getSpecialResource(tileX, tileY);
    const improvements = getTileImprovements(tileX, tileY);
    const govType = gameState.civs[city.owner].government;

    // Base value from terrain table
    let output = TERRAIN_TABLE[(special * 11 + terrainType) * 24 + resourceType];

    // --- FOOD ---
    if (resourceType === 0) {
        if (terrainType === 10) { // Ocean
            if (cityHasBuilding(city, OFFSHORE_PLATFORM)) output += 1;
        } else if (improvements & IRRIGATED) {
            output += IRRIGATION_BONUS[terrainType];
            if (cityHasBuilding(city, SUPERMARKET) && (improvements & FARMLAND)) {
                output += Math.floor(output / 2); // +50%
            }
        }
    }

    // --- SHIELDS ---
    if (resourceType === 1) {
        if (improvements & MINED) {
            output += MINING_BONUS[terrainType];
        }
        if (terrainType === 2 && !hasOceanShields(tileX, tileY)) {
            output = 0;
        }
        if (tileOffset === 20 && output === 0) {
            output = 1; // City center minimum
        }
    }

    // --- TRADE ---
    if (resourceType === 2) {
        if (hasRiver(tileX, tileY)) output += 1;
        if (improvements & ROAD) {
            if (terrainType < 3 || output > 0) output += 1;
        }
        if (output > 0 && hasWonderEffect(city, COLOSSUS)) output += 1;
    }

    // King Richard's Crusade: +1 shield
    if (resourceType === 1 && hasWonderEffect(city, KING_RICHARDS)) output += 1;

    // Railroad: +50% shields
    if (resourceType === 1 && (improvements & RAILROAD)) {
        output += Math.floor(output / 2);
    }

    // Despotism/Anarchy penalty
    if (output > 2 && !city.weLoveTheKing && govType < 2) {
        output -= 1;
    }

    // Republic/Democracy trade bonus
    if (output > 0 && resourceType === 2 && govType >= 4) {
        output += 1;
    }

    // Superhighways: +50% trade
    if (resourceType === 2 && (improvements & ROAD) && cityHasBuilding(city, SUPERHIGHWAYS)) {
        output += Math.floor(output / 2);
    }

    // Pollution halves output
    if (improvements & POLLUTED) {
        output = (output + 1) >> 1;
    }

    return Math.max(0, output);
}
```

---

## 4. Happiness Calculation

**Function:** `FUN_004ea8e4` at `0x004EA8E4` in `block_004E0000.c` (2627 bytes -- the big happiness function)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004ea8e4 @ 0x4EA8E4 - Master happiness calculation
int calculate_happiness(int city_idx) {
    int civ_idx = city[city_idx].owner;
    int gov_type = civ[civ_idx].government;
    int population = city[city_idx].population;
    int difficulty = DAT_00655b08;

    // ============================================
    // STEP 1: Calculate initial unhappy citizens
    // ============================================
    int unhappy;
    int content_base;

    if (!is_human(civ_idx)) {
        // AI: simpler calculation
        unhappy = (population - 1) - (COSMIC_content_base - 5);
        // DAT_0064bccf default 7 => content_base-5 = 2
    } else {
        // Human player
        int base_content = COSMIC_content_base - difficulty;  // e.g. 7-5=2 on Deity

        // Raging hordes option adds 2
        if (raging_hordes_flag) {
            base_content += 2;
        }

        // Special case: Palace bonus for peaceful civs
        if (base_content < 3 && has_building(city_idx, PALACE) &&
            no_military_outside && no_garrisons) {
            base_content = 2;
        }

        unhappy = (population - 1) - (base_content - 2);

        // Government-type difficulty scaling
        if (gov_type != COMMUNISM) {
            int spread = COSMIC_unhappy_offset + difficulty * -2;
            if (raging_hordes) spread += 2;
            int divisor = ((gov_type >> 1) + 2) * spread / 2;
            if (divisor < 2) divisor = 1;
            unhappy += (civ[civ_idx].city_count - divisor + city_idx % divisor) / divisor;
        }
    }

    // Number of unhappy that must be made content
    int surplus_unhappy = 0;
    if (population < unhappy) {
        surplus_unhappy = unhappy - population;
        unhappy = population;
    }

    // ============================================
    // STEP 2: Luxury effect (each 2 luxury = 1 content -> happy)
    // ============================================
    happy = luxury_output / 2;
    // FUN_004ea031 adjusts happy/unhappy balance

    // ============================================
    // STEP 3: Temple effect (makes unhappy -> content)
    // ============================================
    if (has_building(city_idx, COLOSSEUM)) {
        unhappy -= 3;
        if (has_tech(civ_idx, ELECTRONICS)) {  // 0x18
            unhappy -= 1;  // Colosseum + Electronics = 4 unhappy -> content
        }
    }

    // ============================================
    // STEP 4: Cathedral effect
    // ============================================
    if (has_tech(civ_idx, THEOLOGY) &&
        (has_building(city_idx, CATHEDRAL) || has_wonder_effect(civ_idx, MICHELANGELOS))) {
        // Cathedral: makes 3-4 unhappy content
        int effect = (has_tech(civ_idx, COMMUNISM_TECH) ? 0 : 1) + (3 - (has_tech(civ_idx, ?) ? 0 : 1));
        unhappy -= effect;
    }

    // ============================================
    // STEP 5: Temple effect
    // ============================================
    if (has_building(city_idx, TEMPLE)) {
        int temple_effect = 1;
        if (has_tech(civ_idx, MYSTICISM)) temple_effect++;
        if (has_wonder_effect(civ_idx, ORACLE)) temple_effect *= 2;
        unhappy -= temple_effect;
    }

    // ============================================
    // STEP 6: Courthouse + Police Station martial law
    // ============================================
    // Under Despotism/Monarchy/Communism: military units in city make citizens content
    if (gov_type < 5) {  // Not Republic/Democracy
        int garrison = count_military_in_city(city_idx);
        int max_martial = 3;
        if (gov_type == COMMUNISM) max_martial = 6;
        garrison = Math.min(garrison, max_martial);
        unhappy -= garrison;
    }
    // Under Republic/Democracy: military units OUTSIDE city make citizens unhappy
    else {
        int abroad = military_units_abroad;
        if (!has_wonder(STATUE_OF_LIBERTY) && !has_building(city_idx, POLICE_STATION)) {
            abroad_penalty = 1;
        } else {
            abroad_penalty = 0;
        }
        if (gov_type == DEMOCRACY) abroad_penalty++;
        unhappy += abroad_penalty * abroad;
    }

    // ============================================
    // STEP 7: Wonder effects
    // ============================================
    if (has_wonder_effect(civ_idx, SHAKESPEARES)) {  // Wonder 1
        happy += 1;
        if (wonder_city == city_idx) happy += 2;  // +3 total in wonder city
    }
    if (has_wonder_effect(civ_idx, JS_BACHS)) {  // Wonder 0x1b
        happy += 1;
    }
    if (wonder_city(CURE_FOR_CANCER) == city_idx) {
        unhappy = 0;  // Cure for Cancer: no unhappy in that city
    }
    if (has_wonder_effect(civ_idx, HANGING_GARDENS)) {
        unhappy -= 2;
    }

    // Store results
    city[city_idx].happy_citizens = happy;
    city[city_idx].unhappy_citizens = unhappy;

    return happy - unhappy;  // Positive = content/happy city, negative = disorder
}
```

### Key Lines from Decompiled Code

```c
// Initial unhappy for AI (line 4077):
DAT_006a65a8 = ((char)(&DAT_0064f349)[param_1 * 0x58] + -1) - (DAT_0064bccf - 5);

// Initial unhappy for human (line 4093):
DAT_006a65a8 = (population - 1) - (content_base - 2);

// Government spread (line 4084):
iVar5 = (int)((((int)(uint)(byte)government_type >> 1) + 2) * local_1c) / 2;

// Colosseum effect (line 4110):
DAT_006a65a8 = DAT_006a65a8 + -3;  // -3 unhappy
if (has_ELECTRONICS) DAT_006a65a8 -= 1;  // extra -1

// Temple effect (lines 4124-4136):
temple_happy = has_MYSTICISM + has_THEOLOGY + has_ORACLE_doubles;

// Martial law under despotism (lines 4158-4163):
local_1c = 3;  // max 3 content from garrison
if (gov == COMMUNISM) local_1c = 6;  // Communism allows 6

// Military unhappiness under Rep/Demo (lines 4176-4184):
if (gov >= REPUBLIC) {
    unhappy += abroad_modifier * military_units_abroad;
}

// Shakespeare's Theater (lines 4190-4194):
DAT_006a6550 += 1;  // +1 happy
if (wonder_city == city_idx) DAT_006a6550 += 2;  // +3 total

// Cure for Cancer (line 4202):
if (CURE_FOR_CANCER_city == city_idx) unhappy = 0;

// Hanging Gardens (line 4206):
unhappy -= 2;
```

### We Love The King Day Conditions

From `handle_city_disorder_004ef578` at `0x4EF578` (line 5894):

```c
// WLTKD check:
if (unhappy_count == 0 &&               // No unhappy citizens
    population > 2 &&                    // Size 3+
    (population + 1) / 2 <= happy &&     // Half+ citizens are happy
    civ_alive) {                         // Civ exists
    // Trigger "We Love The King Day"
    city_flags |= 0x02;
}

// WLTKD growth under Democracy/Republic (line 5910-5914):
if (gov_type > 4 &&  // Republic or Democracy
    population * riot_factor + food_factor * settlers < city_food_threshold &&
    no_aqueduct_problem) {
    city_population++;  // Free growth during WLTKD!
}
```

### JavaScript Implementation

```javascript
function calculateHappiness(city, gameState) {
    const civ = gameState.civs[city.owner];
    const gov = civ.government;
    const pop = city.population;
    const diff = gameState.difficulty;
    const isHuman = gameState.humanBitmask & (1 << city.owner);

    let happy = 0;
    let unhappy = 0;

    // Step 1: Base unhappy count
    if (!isHuman) {
        unhappy = (pop - 1) - (COSMIC.contentBase - 5);
    } else {
        const contentBase = COSMIC.contentBase - diff;
        unhappy = (pop - 1) - (contentBase - 2);
        // Government spread penalty (more cities = more unhappy)
        if (gov !== GOV.COMMUNISM) {
            const spread = COSMIC.unhappyOffset + diff * -2;
            const divisor = Math.max(1, Math.floor(((gov >> 1) + 2) * spread / 2));
            unhappy += Math.floor((civ.cityCount - divisor + city.index % divisor) / divisor);
        }
    }

    // Step 2: Luxury
    happy = Math.floor(city.luxuryOutput / 2);

    // Step 3: Colosseum
    if (cityHasBuilding(city, COLOSSEUM)) {
        unhappy -= 3;
        if (civHasTech(civ, ELECTRONICS)) unhappy -= 1;
    }

    // Step 4: Cathedral
    if (civHasTech(civ, THEOLOGY) &&
        (cityHasBuilding(city, CATHEDRAL) || hasWonderEffect(civ, MICHELANGELOS))) {
        let effect = 3;
        if (!civHasTech(civ, COMMUNISM_TECH)) effect += 1;
        unhappy -= effect;
    }

    // Step 5: Temple
    if (cityHasBuilding(city, TEMPLE)) {
        let effect = 1;
        if (civHasTech(civ, MYSTICISM)) effect++;
        if (hasWonderEffect(civ, ORACLE)) effect *= 2;
        unhappy -= effect;
    }

    // Step 6: Martial law / Military unhappiness
    if (gov < GOV.REPUBLIC) {
        const maxGarrison = (gov === GOV.COMMUNISM) ? 6 : 3;
        const garrison = Math.min(countMilitaryInCity(city), maxGarrison);
        unhappy -= garrison;
    } else {
        let penalty = 1;
        if (hasWonderEffect(civ, STATUE_OF_LIBERTY) ||
            cityHasBuilding(city, POLICE_STATION)) penalty = 0;
        if (gov === GOV.DEMOCRACY) penalty++;
        unhappy += penalty * city.militaryAbroad;
    }

    // Step 7: Wonders
    if (hasWonderEffect(civ, SHAKESPEARES_THEATRE)) {
        happy += 1;
        if (getWonderCity(SHAKESPEARES_THEATRE) === city.index) happy += 2;
    }
    if (hasWonderEffect(civ, JS_BACHS_CATHEDRAL)) happy += 1;
    if (getWonderCity(CURE_FOR_CANCER) === city.index) unhappy = 0;
    if (hasWonderEffect(civ, HANGING_GARDENS)) unhappy -= 2;

    // Clamp
    happy = clamp(happy, 0, pop);
    unhappy = clamp(unhappy, 0, pop);

    return { happy, unhappy, content: pop - happy - unhappy };
}
```

---

## 5. Corruption and Waste

**Function:** `FUN_004e989a` at `0x004E989A` (corruption calc)
**Function:** `FUN_004e9849` at `0x004E9849` (distance-to-government-factor)

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e9849 @ 0x4E9849 - Government corruption divisor
int get_corruption_divisor(int city_idx, int gov_type) {
    int divisor = 4;                      // base
    if (gov_type > 0) divisor = 5;       // Despotism+
    if (gov_type > 1) divisor = 6;       // Monarchy+
    if (gov_type > 2) divisor = 7;       // Communism+
    if (gov_type > 4) divisor = 8;       // Republic+
    return divisor;
}

// FUN_004e989a @ 0x4E989A - Calculate corruption/waste
int calculate_corruption(int city_idx, int gross_trade, int is_shield_waste, int update_stats) {
    if (gross_trade < 1) return 0;

    int civ_idx = city[city_idx].owner;
    int gov_type = civ[civ_idx].government;

    // During "We Love The King Day", government counts as one level higher
    if (city_has_WLTKD(city_idx)) {
        gov_type++;
    }

    int corruption;

    // Communism uses flat rate based on COSMIC distance constant
    if (gov_type == COMMUNISM) {
        int distance = COSMIC_communism_equiv_distance;  // DAT_0064bcd8, default 10
        int divisor = get_corruption_divisor(city_idx, gov_type);
        corruption = (distance * gross_trade * 3) / (divisor * 20);
    }

    // Other governments: distance from capital matters
    if (gov_type != COMMUNISM) {
        int capital_distance = DAT_006a6588;
        // Capital distance capped at 16 for waste calculation
        if (is_shield_waste && capital_distance > 16) {
            capital_distance = 16;
        }

        int effective_distance = capital_distance;
        // Difficulty penalty for human under Despotism/Anarchy
        if (gov_type < 2 && effective_distance != 0 && is_human(civ_idx)) {
            effective_distance = clamp(difficulty + capital_distance, 0, 32);
        }

        int divisor = get_corruption_divisor(city_idx, gov_type);
        corruption = (effective_distance * gross_trade * 3) / (divisor * 20);
    }

    // Clamp corruption to not exceed gross_trade
    corruption = clamp(corruption, 0, gross_trade);

    // Courthouse or Palace halves corruption
    if (has_building(city_idx, COURTHOUSE) || has_building(city_idx, PALACE)) {
        corruption = corruption / 2;
    }

    return corruption;
}
```

### Key Lines from Decompiled Code

```c
// Corruption formula (line 3633):
local_10 = (local_1c * param_2 * 3) / (iVar3 * 0x14);
// That is: corruption = (distance * trade * 3) / (divisor * 20)

// Communism flat rate (line 3638):
local_24 = (int)(uVar4 * param_2 * 3) / (iVar3 * 0x14);
// uVar4 = DAT_0064bcd8 (communism equivalent distance)

// Courthouse halves corruption (line 3648-3649):
if (has_courthouse || has_palace) {
    corruption = corruption >> 1;  // halved
}

// Government divisor (FUN_004e9849):
// gov 0 (anarchy):      4
// gov 1 (despotism):     5
// gov 2 (monarchy):      6
// gov 3 (communism):     7
// gov 4 (fundamentalism):7
// gov 5+ (republic/demo):8
```

### Communism Shield Waste

From `FUN_004ea1f6` (line 3900):
```c
// Fundamentalism shield waste:
if (gov_type == FUNDAMENTALISM) {
    shield_output -= (COSMIC_communism_waste_pct * shield_output) / 100;
    // DAT_0064bcd9, default 0 (but modifiable in rules.txt)
}
```

### Plain English

**Corruption formula:** `corruption = (distance * trade * 3) / (divisor * 20)`

Where:
- `distance` = distance to capital (or fixed COSMIC value for Communism)
- `trade` = gross trade output of the city
- `divisor` = government-dependent (Anarchy=4, Despotism=5, Monarchy=6, Communism=7, Republic/Democracy=8)

**Modifiers:**
- Courthouse or Palace: halves corruption
- Communism: uses a flat "equivalent distance" instead of real distance
- Difficulty penalty: human players under Despotism get extra corruption (distance + difficulty_level)
- We Love The King Day: government treated as one level higher (better corruption rate)

### JavaScript Implementation

```javascript
function getCorruptionDivisor(govType) {
    if (govType <= 0) return 4;   // Anarchy
    if (govType <= 1) return 5;   // Despotism
    if (govType <= 2) return 6;   // Monarchy
    if (govType <= 4) return 7;   // Communism, Fundamentalism
    return 8;                      // Republic, Democracy
}

function calculateCorruption(city, grossTrade, isShieldWaste, gameState) {
    if (grossTrade < 1) return 0;

    const civ = gameState.civs[city.owner];
    let govType = civ.government;

    // WLTKD bonus
    if (city.flags & WLTKD_FLAG) govType++;

    const divisor = getCorruptionDivisor(govType);
    let distance;

    if (govType === GOV.COMMUNISM) {
        distance = COSMIC.communismEquivDistance; // default 10
    } else {
        distance = city.distanceToCapital;
        if (isShieldWaste && distance > 16) distance = 16;

        // Human difficulty penalty under Despotism/Anarchy
        if (govType < 2 && distance > 0 && isHuman(city.owner)) {
            distance = clamp(gameState.difficulty + distance, 0, 32);
        }
    }

    let corruption = Math.floor((distance * grossTrade * 3) / (divisor * 20));
    corruption = clamp(corruption, 0, grossTrade);

    // Courthouse or Palace halves corruption
    if (cityHasBuilding(city, COURTHOUSE) || cityHasBuilding(city, PALACE)) {
        corruption = Math.floor(corruption / 2);
    }

    return corruption;
}
```

---

## 6. Technology Cost

**Function:** `FUN_004c2788` at `0x004C2788` in `block_004C0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004c2788 @ 0x4C2788 - Calculate tech cost in beakers
int calculate_tech_cost(int civ_idx) {
    int total_techs = civ[civ_idx].techs_known_A + civ[civ_idx].techs_known_B;
    if (total_techs < 2) total_techs = 1;

    int difficulty = DAT_00655b08;
    int base_cost;

    if (!is_human(civ_idx)) {
        // AI: lower cost that scales inversely with difficulty
        base_cost = 14 - clamp(difficulty, 0, 4);
    } else {
        // Human: higher cost that scales with difficulty
        base_cost = difficulty * 2 + 6;
    }

    // Catch-up mechanic: compare to most advanced civ
    int leader_techs = civs[most_advanced_civ].techs_A + civs[most_advanced_civ].techs_B;

    if (!(scenario_flags & 0x80) || !custom_tech_rate) {
        if (total_techs < leader_techs) {
            // Behind: reduce cost
            if (difficulty != 0) base_cost--;
            if (difficulty == 5 && total_techs + 4 < leader_techs && turn > 150) {
                base_cost--;  // Extra Deity catchup
            }
        } else {
            // Ahead: increase cost based on lead
            base_cost += (total_techs - leader_techs) / 3;
        }

        // Late-game scaling: penalize if > 19 techs
        int late_penalty = 0;
        if (total_techs > 19) {
            late_penalty = clamp(total_techs - (turn / 8), 0, 6);
        }
        base_cost += late_penalty;
    }

    // Apply COSMIC tech rate multiplier (default 3 = 30%, so *3/10)
    if (!(scenario_flags & 0x80)) {
        if (COSMIC_tech_multiplier != 10) {
            base_cost = (COSMIC_tech_multiplier * base_cost) / 10;
        }
    } else {
        if (custom_tech_rate != 10) {
            base_cost = (custom_tech_rate * base_cost) / 10;
        }
    }

    // Apply modifier: add 75% of base
    int modifier = (base_cost * 3) >> 2;  // 75% of base
    if (total_techs < 20) {
        modifier = (total_techs * modifier) / 20;  // Scale down for early game
    }
    base_cost += modifier;

    // Cap adjustment for max tech count
    if (max_tech_id > 67) {
        base_cost = (base_cost * 67) / max_tech_id;
    }

    // Raging hordes adjustment
    if (raging_hordes_flag) {
        base_cost = (base_cost * 5 + 3) / 4;  // +25%
    }
    // Simplified flag
    if (simplified_flag) {
        base_cost = (base_cost * 4) / 5;  // -20%
    }

    // Minimum cost for human player
    if (is_human(civ_idx) && base_cost < (11 - total_techs)) {
        base_cost = 11 - total_techs;
    }

    // Final cost = base * number of techs known
    int final_cost = base_cost * total_techs;

    if (final_cost < 1 || final_cost > 32000) {
        final_cost = 32000;
    }

    return final_cost;
}
```

### Key Lines from Decompiled Code

```c
// Tech count (line 959):
uVar1 = techs_A + techs_B;
if (uVar1 < 2) uVar1 = 1;

// AI base cost (line 966):
local_14 = 0xe - local_14;  // 14 - difficulty

// Human base cost (line 969):
local_14 = local_14 * 2 + 6;  // difficulty*2 + 6

// COSMIC multiplier (line 998):
local_14 = (COSMIC_tech_multiplier * local_14) / 10;

// 75% modifier (line 1004):
local_1c = local_14 * 3 >> 2;

// Early game scaling (line 1007):
local_1c = (total_techs * local_1c) / 20;

// Final cost (line 1024):
local_18 = local_14 * uVar1;  // base_rate * total_techs
```

### Plain English

The tech cost formula has several layers:

1. **Base rate** depends on difficulty: Human gets `difficulty * 2 + 6`, AI gets `14 - difficulty`
2. **Catch-up mechanic:** If behind the tech leader, cost decreases; if ahead, it increases
3. **COSMIC multiplier:** Rules.txt tech rate (default 3 means 30%, applied as `/10`)
4. **Progressive scaling:** A 75% adder that scales with number of techs known (smaller early game)
5. **Final cost = base_rate * total_techs_known**
6. Capped at 32000 beakers

### JavaScript Implementation

```javascript
function calculateTechCost(civIndex, gameState) {
    const civ = gameState.civs[civIndex];
    let totalTechs = civ.techsA + civ.techsB;
    if (totalTechs < 2) totalTechs = 1;

    const diff = gameState.difficulty;
    const isHuman = gameState.humanBitmask & (1 << civIndex);

    let baseCost;
    if (!isHuman) {
        baseCost = 14 - clamp(diff, 0, 4);
    } else {
        baseCost = diff * 2 + 6;
    }

    // Catch-up mechanic
    const leaderTechs = gameState.civs[gameState.mostAdvancedCiv].techsA +
                        gameState.civs[gameState.mostAdvancedCiv].techsB;

    if (totalTechs < leaderTechs) {
        if (diff !== 0) baseCost--;
        if (diff === 5 && totalTechs + 4 < leaderTechs && gameState.turn > 150) {
            baseCost--;
        }
    } else {
        baseCost += Math.floor((totalTechs - leaderTechs) / 3);
    }

    // Late-game penalty
    if (totalTechs > 19) {
        baseCost += clamp(totalTechs - Math.floor(gameState.turn / 8), 0, 6);
    }

    // COSMIC tech rate (default 3 = 30%)
    if (COSMIC.techMultiplier !== 10) {
        baseCost = Math.floor(COSMIC.techMultiplier * baseCost / 10);
    }

    // Progressive modifier (75% base, scaled by early game)
    let modifier = (baseCost * 3) >> 2;
    if (totalTechs < 20) {
        modifier = Math.floor(totalTechs * modifier / 20);
    }
    baseCost += modifier;

    // Minimum for human
    if (isHuman && baseCost < 11 - totalTechs) {
        baseCost = 11 - totalTechs;
    }

    // Final cost
    let finalCost = baseCost * totalTechs;
    if (finalCost < 1 || finalCost > 32000) finalCost = 32000;

    return finalCost;
}
```

---

## 7. Unit Support

**Function:** `FUN_004e7d7f` at `0x004E7D7F` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004e7d7f @ 0x4E7D7F - Check if unit requires support from city
// Returns: 1 if unit costs a shield, 0 if free
int check_unit_support(int city_idx, int unit_idx, int gov_type) {
    static int unit_counter;  // DAT_006a660c - counts units processed
    unit_counter++;

    switch (gov_type) {
        case 0:  // Anarchy
        case 1:  // Despotism
            // Free support = city_population units
            if (city_population < unit_counter) {
                shield_cost++;  // DAT_006a6568
                return shield_cost;
            }
            break;

        case 2:  // Republic
            // Free support = COSMIC_republic_free (DAT_0064bcd5, default 0)
            if (COSMIC_republic_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        case 3:  // Monarchy / Communism
            // Free support = COSMIC_monarchy_free (DAT_0064bcd6, default 0)
            if (COSMIC_monarchy_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        case 4:  // Fundamentalism
            // Free if unit has "free_under_fundamentalism" flag (bit 0x08)
            if (!(unit_type_flags & 0x08) && COSMIC_fundamentalism_free < unit_counter) {
                shield_cost++;
                return shield_cost;
            }
            break;

        default:  // Democracy (5+)
            // Every unit costs a shield
            shield_cost++;
            return shield_cost;
    }
    return 0;  // Unit is free
}
```

### Key Lines from Decompiled Code

```c
// Anarchy/Despotism: free = city population (line 2848):
case 0:
case 1:
    if ((char)(&DAT_0064f349)[param_1 * 0x58] < DAT_006a660c) {
        DAT_006a6568 = DAT_006a6568 + 1;

// Republic: COSMIC value (line 2854):
case 2:
    if ((int)(uint)DAT_0064bcd5 < DAT_006a660c) {

// Monarchy/Communism: COSMIC value (line 2860):
case 3:
    if ((int)(uint)DAT_0064bcd6 < DAT_006a660c) {

// Fundamentalism: COSMIC value + flag check (line 2866):
case 4:
    if (!(unit_flags & 8) && DAT_0064bcd7 < unit_counter) {

// Democracy: all cost (line 2873):
default:
    DAT_006a6568 = DAT_006a6568 + 1;
```

### Plain English

| Government | Free Unit Support |
|-----------|-------------------|
| Anarchy / Despotism | City population (size) units are free |
| Republic | COSMIC value (default 0) units are free |
| Monarchy / Communism | COSMIC value (default 0) units are free |
| Fundamentalism | COSMIC value (default 0); fanatic-type units always free |
| Democracy | Every unit costs 1 shield |

Each unit beyond the free limit costs 1 shield per turn from the city.

### JavaScript Implementation

```javascript
function calculateUnitSupport(city, gameState) {
    const civ = gameState.civs[city.owner];
    const gov = civ.government;

    let freeUnits;
    switch (gov) {
        case GOV.ANARCHY:
        case GOV.DESPOTISM:
            freeUnits = city.population;
            break;
        case GOV.REPUBLIC:
            freeUnits = COSMIC.republicFreeSupport; // default 0
            break;
        case GOV.MONARCHY:
        case GOV.COMMUNISM:
            freeUnits = COSMIC.monarchyFreeSupport; // default 0
            break;
        case GOV.FUNDAMENTALISM:
            freeUnits = COSMIC.fundamentalismFreeSupport; // default 0
            // Note: fanatic units are always free under fundamentalism
            break;
        case GOV.DEMOCRACY:
        default:
            freeUnits = 0; // Every unit costs
            break;
    }

    let supportCost = 0;
    let unitCount = 0;

    for (const unit of city.supportedUnits) {
        unitCount++;
        if (gov === GOV.FUNDAMENTALISM && (unit.typeFlags & 0x08)) {
            continue; // Fanatics are free
        }
        if (unitCount > freeUnits) {
            supportCost++; // 1 shield per unsupported unit
        }
    }

    return supportCost;
}
```

---

## 8. Trade Distribution (Luxury / Science / Gold Split)

**Function:** `FUN_004ea1f6` at `0x004EA1F6` in `block_004E0000.c`

### Decompiled Pseudocode (cleaned up)

```c
// FUN_004ea1f6 @ 0x4EA1F6 - Distribute trade to luxury/science/gold
void distribute_trade(int city_idx, int net_trade, int mode, int extra) {
    int civ_idx = city[city_idx].owner;
    int luxury_rate = civ[civ_idx].luxury_rate;      // DAT_0064c6b3, tenths
    int science_rate = civ[civ_idx].science_rate;     // DAT_0064c6b4, tenths
    // tax_rate = 10 - luxury_rate - science_rate (implicit)

    // Under Fundamentalism, cap luxury rate
    if (gov_type == FUNDAMENTALISM && COSMIC_max_luxury_fund < luxury_rate) {
        luxury_rate = COSMIC_max_luxury_fund;
    }

    // Calculate raw splits (tenths)
    luxury_output = clamp((net_trade * (10 - luxury_rate - science_rate) + 4) / 10, 0, net_trade);
    science_output = clamp((net_trade * luxury_rate + 4) / 10, 0, net_trade - luxury_output);
    gold_output = net_trade - (science_output + luxury_output);

    // Specialist bonuses (Entertainers: +2 luxury, Scientists: +3 science, Taxmen: +3 gold)
    int entertainers = count_specialists(city_idx, ENTERTAINER);
    luxury_output += entertainers * 2;
    int scientists = count_specialists(city_idx, SCIENTIST);
    science_output += scientists * 3;
    int taxmen = count_specialists(city_idx, TAXMAN);
    gold_output += taxmen * 3;

    // Fundamentalism: tithe (gold bonus) from happiness buildings
    if (gov_type == FUNDAMENTALISM) {
        gold_output += tithe_bonus;  // DAT_006a6618
    }

    // Building multipliers for science
    int science_mult = 0;
    if (has_building(city_idx, LIBRARY)) science_mult++;      // 0x06
    if (has_building(city_idx, UNIVERSITY)) science_mult++;    // 0x0C
    if (has_building(city_idx, RESEARCH_LAB)) science_mult++;  // 0x1A or wonder
    science_output += (science_output * science_mult) / 2;     // Each adds +50%

    // Building multipliers for gold
    int gold_mult = 0;
    if (has_building(city_idx, MARKETPLACE)) gold_mult++;   // 0x05
    if (has_building(city_idx, BANK)) gold_mult++;          // 0x0A
    // Wall Street wonder
    int wall_street_bonus = gold_output * gold_mult;
    if (wonder_city(WALL_STREET) != city_idx) {
        wall_street_bonus = wall_street_bonus / 2;
    }
    gold_output += wall_street_bonus;

    // Colossus doubles gold in wonder city
    if (wonder_city(COLOSSUS) == city_idx) {
        gold_output *= 2;
    }

    // Store results
    city.luxury = luxury_output;
    city.science = science_output;
    city.gold = gold_output;
}
```

### JavaScript Implementation

```javascript
function distributeTrade(city, netTrade, gameState) {
    const civ = gameState.civs[city.owner];
    let luxRate = civ.luxuryRate;
    const sciRate = civ.scienceRate;
    const taxRate = 10 - luxRate - sciRate;

    // Fundamentalism luxury cap
    if (civ.government === GOV.FUNDAMENTALISM) {
        luxRate = Math.min(luxRate, COSMIC.maxLuxuryFund);
    }

    // Base distribution
    let luxury = clamp(Math.floor((netTrade * taxRate + 4) / 10), 0, netTrade);
    let science = clamp(Math.floor((netTrade * luxRate + 4) / 10), 0, netTrade - luxury);
    let gold = netTrade - (science + luxury);

    // Specialists
    luxury += city.entertainers * 2;
    science += city.scientists * 3;
    gold += city.taxmen * 3;

    // Science multipliers (+50% each)
    let sciMult = 0;
    if (cityHasBuilding(city, LIBRARY)) sciMult++;
    if (cityHasBuilding(city, UNIVERSITY)) sciMult++;
    if (cityHasBuilding(city, RESEARCH_LAB)) sciMult++;
    science += Math.floor(science * sciMult / 2);

    // Gold multipliers (+50% each)
    let goldMult = 0;
    if (cityHasBuilding(city, MARKETPLACE)) goldMult++;
    if (cityHasBuilding(city, BANK)) goldMult++;
    let goldBonus = gold * goldMult;
    if (getWonderCity(WALL_STREET) !== city.index) goldBonus = Math.floor(goldBonus / 2);
    gold += goldBonus;

    return { luxury, science, gold };
}
```

---

## Utility Function: clamp

Used extensively throughout (`FUN_005adfa0` at `0x5ADFA0`):

```c
// Clamp value between min and max
int clamp(int value, int min, int max) {
    if (min > value) value = min;  // Note: parameter order is (value, min, max)
    if (value > max) value = max;
    return value;
}
```

```javascript
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
```

---

## Source Files Reference

| Formula | Function | Address | File |
|---------|----------|---------|------|
| Rush-buy cost | `city_button_buy` | `0x509B48` | `block_00500000.c:4479` |
| Food box size | `FUN_004e7eb1` | `0x4E7EB1` | `block_004E0000.c:2882` |
| City growth | (inline in turn proc) | `0x4EBE01` | `block_004E0000.c:4656` |
| Tile resources | `FUN_004e868f` | `0x4E868F` | `block_004E0000.c:3067` |
| Unit support | `FUN_004e7d7f` | `0x4E7D7F` | `block_004E0000.c:2837` |
| Corruption | `FUN_004e989a` | `0x4E989A` | `block_004E0000.c:3591` |
| Corruption divisor | `FUN_004e9849` | `0x4E9849` | `block_004E0000.c:3563` |
| Tech cost | `FUN_004c2788` | `0x4C2788` | `block_004C0000.c:946` |
| Happiness | `FUN_004ea8e4` | `0x4EA8E4` | `block_004E0000.c:4004` |
| Trade split | `FUN_004ea1f6` | `0x4EA1F6` | `block_004E0000.c:3847` |
| WLTKD/Disorder | `handle_city_disorder_004ef578` | `0x4EF578` | `block_004E0000.c:5815` |
| COSMIC loading | `FUN_00419d23` | `0x419D23` | `block_00410000.c:5060` |
| Clamp utility | `FUN_005adfa0` | `0x5ADFA0` | `block_005A0000.c:4391` |
| Has building | `FUN_0043d20a` | `0x43D20A` | `block_00430000.c:4652` |
