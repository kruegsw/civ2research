# AI System Architecture — Complete Reference

Traced from decompiled C source. Documents the complete AI processing pipeline.

Source of truth: `reverse_engineering/decompiled/block_00530000.c`, `block_00540000.c`

---

## AI Processing Pipeline (per turn)

The AI runs in two phases during per-civ turn processing:

```
Phase 1: FUN_0053184d(civ)    — Strategic decisions (called from FUN_00489553)
Phase 2: FUN_00543cd6()       — Unit execution (called from game loop FUN_0048b340)
```

These are separated by other per-civ processing (city yields, diplomacy, etc.).

---

## Phase 1: FUN_0053184d — AI Master Brain (14,665 bytes)

Single-pass state machine. Runs once per AI civ per turn.

### Section 1: Espionage/Diplomat Handling (lines 456-519)
- Loops through enemy units in range
- Moves spy units toward enemy cities/units
- Calls FUN_005b36df() to execute movement

### Section 2: Government Capacity Init (lines 520-561)
- Zeros capacity arrays: `DAT_0064c6b7[civ*0x594 + 0..3]`
- Counts capacities via FUN_00453e51 for buildings 0x00-0x1C
- Zeros per-city arrays: combat values (DAT_0064c832), trade (DAT_0064c972),
  threats (DAT_0064c9f2), production queues (stack arrays)

### Section 3: Unit Census (lines 562-595)
- Counts settlers (local_144)
- Links units to cities via FUN_005b8a81
- Clears unit flags (mask 0xFC7F on DAT_006560f4)

### Section 4: Unit State Processing (lines 596-741)
Per-unit loop. For each unit owned by this civ:
- Get position, find associated city
- **Settler routing**: production capacity based on government (4/3/2)
  - Calculates defensive quotas per city
  - Sets flag 0x200 for special routing
- **Military routing**: based on city threat assessment from Section 5

### Section 5: City Defense/Threat Analysis (lines 816-942)
Per-city loop (63 cities max). For each city owned by this civ:
- Counts allied vs enemy military strength nearby
- Compares via DAT_0064c8b2 (military strength arrays)
- Sets city AI state at `DAT_0064ca32[civ*0x594 + cityIdx]`:
  - **0** = under attack
  - **1** = contested
  - **4** = hold/defend
  - **5** = expand/build

### Section 6: Research & Unit Targeting (lines 947-1250)
Reverse unit loop. For each unit:
- Complex diplomacy-informed targeting
- City improvement targeting: iterate all 0x30 improvements, pick closest
- Calls FUN_00531607(unit, order, x, y) to set movement orders

### Section 7: City Flag Cleanup (lines 1252-1262)
Clear temporary city flags 0x200 and 0x400 for all owned cities.

### Section 8: Final Cleanup (line 1263)
Call FUN_00493602(civ) — clear diplomatic target arrays, process worker orders.

---

## Phase 2: FUN_00543cd6 — AI Unit Dispatch (801 bytes)

**Two-pass loop** over all units (descending order):

```c
for (pass = 0; pass <= 1; pass++) {
    for (unitIdx = unitCount - 1; unitIdx >= 0; unitIdx--) {
        if (unit.owner != currentCiv) continue;
        if (pass == 0 && unit.isHumanControlled) continue;

        // Get next action for unit
        while (FUN_005b6458(unitIdx) != 0 && actionCount < 20) {
            FUN_00543b80();  // Execute per-unit AI
            actionCount++;
        }
    }
}
```

- Pass 1: AI units only (skip human-controlled)
- Pass 2: Remaining units
- Max 20 actions per unit per turn
- After primary action, may call FUN_00543b80 again if unit can still move

---

## FUN_00543b80 — Per-Unit AI Dispatcher (322 bytes)

Pre-filter that delegates to the actual decision engine:

1. Call FUN_00484d52() — clear game state
2. Read current unit from DAT_00655afe
3. Check unit state (exists, order == 0x0B, civ flags)
4. Delegate to **FUN_00538a29()** — the real decision engine
5. If FUN_00538a29 returns 0 and unit can still move: call FUN_004c5408
6. If that also fails: call FUN_005b6787 (force unit to skip)

---

## FUN_00538a29 — Per-Unit AI Decision Engine (44,777 bytes)

**The largest function in the entire codebase.** Called for each AI unit each turn.

### Initial Setup
- If civ == 0 (barbarians): delegate to FUN_005351aa (separate handler)
- If unit action > 3: skip
- Read unit position, terrain type, continent ID
- Compute threat level via FUN_005b4d8c(x, y, civ)
- Find nearby enemy via FUN_0043d07a(x, y, -1, -1, -1)

### Movement Availability
```
local_d8 = 0 (no moves), 1 (some), 2 (half+), 3 (full)
Based on: unit.moves_remaining vs unit_type.move_rate / 4 and / 2
```

### 7 Unit Sub-Action Types (from FUN_00531287)

| Type | Unit Class | Key Logic |
|------|-----------|-----------|
| 0 | Military | Combat targeting, threat-based movement direction |
| 1 | Settler | City founding: score positions by distance, terrain quality |
| 2 | Engineer | Improvement work orders (road, irrigate, mine) |
| 3 | Diplomat | City infiltration: score = 100 + power_mod, halved if defended |
| 5 | Transport | Naval routing between continents |
| 6 | Diplomat (cached) | Same as 3 with cached target |
| 7 | Air unit | Landing site selection, attack targeting |

### Movement Target Selection
For land units with movement remaining:
- Scan 8 adjacent tiles (20 for naval)
- Score each by threat level (FUN_005b8c42)
- Must be on same continent (FUN_005b8a81)
- Prefer tiles with higher threat (move toward danger)

### Settler City Founding
- Turn 1 special: rush to starting position (DAT_00627fe0/00628010)
- Later: score positions by distance to other cities + terrain quality
- Call FUN_004c4d1e to found city

### Diplomat Target Scoring
```
base_score = 100
+ power_modifier(my_civ, target_civ)    (from FUN_00467904)
if target city defended: score /= 2
if strong defense (my_def + 6 < enemy_def): score /= 2
if civil war active: score = 1
final_score = base_score + 100 - distance
```

### Air Unit Landing
- Check 8 adjacent tiles for valid land
- Score by nearby military strength per civ
- Own civ defense: +strength/2
- Enemy civ: +threat*2
- Pick highest-scoring tile

---

## FUN_00538a29 — Complete Per-Unit AI Structure (44,777 bytes, 3088 lines)

**Fully traced.** Organized around goto labels as a state machine:

| Label | Line | Phase | Purpose |
|-------|------|-------|---------|
| ENTRY | 2590 | Init | Read unit state, compute threat/movement |
| LAB_005392a6 | 2710 | Decision | Main branch: movement/action selection |
| LAB_005397e7 | 2783 | Special | Unit-type-specific handling |
| LAB_0053b8f0 | 3257 | Settle | City founding / garrison decision |
| LAB_0053be12 | 3349 | Transport | Stack management, embark/disembark |
| LAB_0053cdd1 | 3843 | Waypoint | Mid-move interpolation |
| LAB_0053fc8d | 4428 | Worker | Settler improvement orders |
| LAB_005414d7 | 4798 | Movement | 8-direction scoring loop (CORE) |
| LAB_005435ca | 5414 | Execute | Apply chosen direction |
| LAB_005436c1 | 5434 | Exit | Final cleanup, auto-fortify |

**Movement scoring (LAB_005414d7):** For each of 8 adjacent tiles:
- Base = random(0, 2-4) via FUN_0059a791
- Military: penalty for slow terrain, bonus for enemy attack strength
- Settler: bonus for fertile terrain
- Diplomat: bonus for trade potential
- Distance-to-goto modifier if unit has active order
- Own-unit avoidance (reduce stacking)

**Order byte table:**

| Byte | Hex | Order | Context |
|------|-----|-------|---------|
| 0x1B | 27 | goto_ai | Single hop movement |
| 0x30 | 48 | patrol | Idle military |
| 0x32 | 50 | settle_dir | Settler moving to found |
| 0x33 | 51 | defend_city | Transport to ally |
| 0x34 | 52 | cross_sea | Foreign continent attack |
| 0x39 | 57 | explore | Default movement |
| 0x41 | 65 | reinforce | To allied city |
| 0x42 | 66 | disband | Settler absorbed |
| 0x46 | 70 | fortify | Settler/transport |
| 0x49 | 73 | raid | Enemy city attack |
| 0x4D | 77 | mine | Settler mine |
| 0x53 | 83 | diplomat | Spy mission |
| 0x55 | 85 | goody_hut | Adjacent hut |
| 0x58 | 88 | fortress | Sea fortress |
| 0x70 | 112 | clean | Pollution |
| 0x72 | 114 | road | Build road |
| 0x74 | 116 | air_land | Air landing direction |
| 0x64 | 100 | idle | Default idle |

**Settler city founding:** Turn 1 special case — if at starting position
(from DAT_00627fe0/00628010) and fertility > 7, found city immediately.

**Diplomat scoring:**
```
score = 100 + power_modifier(my_civ, target_civ)
/= 2 if defended
/= 2 if strong defense (my_power + 6 < enemy_power)
= 1 if civil war
+= 100 base
/= (distance + 1)
```

**Function exit (LAB_005436c1):**
- Idle military units auto-fortify (order 1 or 2)
- Sea units consume 1 movement point
- Units at goto target: clear orders, set flag 0x80
- Returns 0 (no action) or 1 (action taken)

---

## FUN_005351aa — Barbarian Unit Handler (6,102 bytes)

Separate from main AI. Called when civ == 0 (barbarian civ index).
Handles barbarian-specific movement patterns and attack targeting.
Barbarians don't use the strategic city defense analysis from FUN_0053184d.

---

## Helper Functions

### FUN_00531607 — Set Unit Order (line 334, simple)
```c
void FUN_00531607(int unit, byte order, short target_x, short target_y) {
    unit.status = 0x0B;            // "executing order"
    unit.order = order;             // order byte
    unit.goto_x = target_x;
    unit.goto_y = target_y;
}
```

Order bytes observed:
- 0x31 = settle city
- 0x42 = fortify
- 0x53 = diplomat move to target
- 0x58 = attack
- 0x61 = explore
- 0x74 = air unit landing direction
- 0x99 = long-distance goto
- 0xB0 = naval transport

### FUN_00531287 — Get Unit Action Type (line 230, simple)
```c
int FUN_00531287(int unit) {
    int type = DAT_0064b1ca[unit.type * 0x14];   // action lookup table
    if (type == 5 && unit.flags & 0x200)
        return 0x15;                               // flagged transport
    return type;
}
```

Returns: 0=military, 1=settler, 2=engineer, 3=diplomat, 5=transport, 0x15=flagged

---

## AI City State Values (DAT_0064ca32)

Set by FUN_0053184d Section 5 (threat analysis):

| Value | Meaning | AI Response |
|-------|---------|-------------|
| 0 | Under attack | Maximum defense, call reinforcements |
| 1 | Contested | Defensive posture, build military |
| 4 | Hold | Maintain garrison, normal production |
| 5 | Expand | Build settlers/improvements, explore |

---

## Key AI Globals

| Address | Name | Purpose |
|---------|------|---------|
| `DAT_00655afe` | Active unit index | Currently processing unit |
| `DAT_00655b05` | Processing civ | Which civ's turn is being processed |
| `DAT_006d1da0` | Runtime active civ | Viewport/diplomacy context |
| `DAT_0064ca32[civ*0x594+city]` | City AI state | 0/1/4/5 defense/expand state |
| `DAT_0064c8b2[civ*0x594+n*2]` | Military strength | Per-city combat value |
| `DAT_0064c832[civ*0x594+n*2]` | Combat values | Per-unit combat assessment |
| `DAT_0064c972[civ*0x594+n]` | Trade values | Per-city trade assessment |
| `DAT_0064c9f2[civ*0x594+n]` | Threat flags | Per-city threat assessment |
| `DAT_0064b1ca[type*0x14]` | Unit action table | Maps unit type → AI action class |
| `DAT_0064b1c9[type*0x14]` | Unit capability | Settler/military/diplomat flags |
