# Tile Data Structure — Complete Byte-Level Reference

Traced from decompiled C source (block_005B0000.c utility functions).

Source of truth: `reverse_engineering/decompiled/block_005B0000.c`

---

## Memory Layout

**Base pointer**: `DAT_00636598` (set by FUN_005b7fe0 via GlobalAlloc/GlobalLock)

**Total tiles**: `DAT_006d1164 = (mapWidth / 2) * mapHeight`

**Tile offset formula** (FUN_005b8931):
```
offset = ((width & ~1) * y * 3) + ((x & ~1) * 3) + DAT_00636598
```

Notes:
- Width masked to even (`& 0xFFFFFFFE`). Coordinates masked to even.
- Each tile record is 6 bytes, but the formula uses `*3` because even/odd
  column pairs share a 6-byte record (staggered isometric grid).
- Invalid tile sentinel: `DAT_006d1188` (6 bytes of fallback data returned
  when coordinates are out of bounds).

---

## 6-Byte Tile Record

| Byte | Bits | Field | Source Function | Notes |
|------|------|-------|-----------------|-------|
| 0 | 0-3 | Terrain type | FUN_005b89bb: `*ptr & 0x0F` | 0=desert, 1=plains, 2=grassland, 3=forest, 4=hills, 5=mountains, 6=tundra, 7=glacier, 8=swamp, 9=jungle, 10=ocean |
| 0 | 4-5 | Unknown | | Possibly river direction or sub-terrain |
| 0 | 6 | Resource flag | FUN_005b8ee1: `*ptr & 0x40` | Set during map gen for special resources |
| 0 | 7 | Special resource | FUN_004e868f: `*ptr & 0x80` | +1 trade when set |
| 1 | 0 | Unknown | | |
| 1 | 1 | Irrigation | FUN_005b94d5: `ptr[1] & 0x02` | Irrigated tile |
| 1 | 2 | Unknown | | |
| 1 | 3 | Mining | Feature check: `ptr[1] & 0x08` | Mined tile |
| 1 | 4 | Road | Feature check: `ptr[1] & 0x10` | Road built |
| 1 | 5 | Railroad | Feature check: `ptr[1] & 0x20` | Railroad built |
| 1 | 6 | City indicator | FUN_005b8ca6: `ptr[1] & 0x42 == 0x02` | City present (with bit 1) |
| 1 | 7 | Unknown | | Possibly pollution or goody hut |
| 2 | 0-4 | Body ID | | Continent/ocean number (0-31) |
| 2 | 5-7 | Claiming civ | FUN_005b9c49: upper 3 bits | Which civ claims this tile (0-7). Also read by FUN_005b8af0 as `ptr[2] >> 5` for threat. |
| 3 | all | Unknown | | Possibly river bitmask or improvements sub-field |
| 4 | 0-7 | Visibility bitmask | FUN_005b8b65, FUN_005b976d | Bit N = civ N has explored this tile |
| 5 | 0-3 | Fertility | FUN_005b8c18: `ptr[5] & 0x0F` | Fertility value (0-15), used by AI for settler placement |
| 5 | 4-7 | City owner | FUN_005b8a1d: `ptr[5] >> 4` | City owner (0-14), 0xF = no city |

---

## Key Tile Utility Functions

### FUN_005b8931 — Get tile data pointer (90 bytes)
```
Input:  x (uint), y (int)
Output: pointer to 6-byte tile record (or sentinel DAT_006d1188 if invalid)
Calls:  FUN_004087c0(x, y) for bounds check
```

### FUN_005b89bb — Get terrain type (41 bytes)
```
Input:  x, y
Output: terrain type (0-15, lower 4 bits of byte 0)
Formula: FUN_005b8931(x, y)[0] & 0x0F
```

### FUN_005b89e4 — Is ocean tile (57 bytes)
```
Input:  x, y
Output: true if terrain type == 10
Formula: FUN_005b89bb(x, y) == 10
```

### FUN_005b94d5 — Get feature flags (simple)
```
Input:  x, y
Output: byte 1 of tile record (irrigation, mining, road, etc.)
Formula: FUN_005b8931(x, y)[1]
```

### FUN_005b8ca6 — Get city at tile (moderate)
```
Input:  x, y
Output: city index (0-255) or -1 (0xFFFFFFFF) if no city
Logic:  if ptr[1] & 0x42 == 0x02 then FUN_005b8a1d(x, y) else -1
```

### FUN_005b8b65 — Can civ access tile (simple)
```
Input:  x, y, civ_index
Output: nonzero if civ has visibility at this tile
Formula: ptr[4] & (1 << civ_index)
Special: if civ_index < 0, always returns 1
```

### FUN_005b8ee1 — Get resource type (281 bytes)
```
Input:  x, y
Output: 0 (none), 1 (type A), 2 (type B)
Logic:  Complex coordinate hash using map seed DAT_006d1168
        if ptr[0] & 0x40: return 0 (resource flag overrides)
        if terrain == 2: return 0
        Hash: (y + x>>1) & 3 combined with (x - (y+x>>1)) & 3
        Compared against: ((y+x>>3)*11 + ((x-(y+x>>1))>>2)*13 + seed) & 0xF
        Additional seed-based check for type 2 vs type 1
```

### FUN_005b976d — Set tile visibility (60+ bytes)
```
Input:  x, y, bitmask, set_or_clear (0=clear, 1=set), broadcast
Effect: ptr[4] |= bitmask (set) or ptr[4] &= ~bitmask (clear)
        If broadcast && changed && multiplayer: send network message
```

### FUN_005b9c49 — Set tile as claimed (60+ bytes)
```
Input:  x, y, civ_index (0-7), broadcast
Effect: ptr[2] = (ptr[2] & 0x1F) | ((civ_index & 7) << 5)
        Upper 3 bits of byte 2 = claiming civ
```

### FUN_005ae052 — Wrap X coordinate (simple)
```
Input:  x
Output: x wrapped to [0, mapWidth)
Logic:  if wrapping enabled (DAT_00655ae8 & 0x8000 == 0):
          if x < 0: return x + mapWidth
          if x >= mapWidth: return x - mapWidth
        else: return x unchanged
Note:   Wrapping bit is INVERTED — 0x8000 CLEAR means wrapping IS enabled
```

### FUN_005ae31d — Hexagonal distance (via FUN_005ae296)
```
Input:  x1, y1, x2, y2
Output: hex-grid distance
Logic:  dx = |x1 - x2| (with wrapping if enabled)
        dy = |y1 - y2|
        distance = max(dx, dy) - floor((min(dx,dy) + 1) / 2)
        Wrapping: if dx > mapWidth/2, use mapWidth - dx
```

---

## Per-Civ Visibility Arrays

Allocated in FUN_005b7fe0. Each civ (1-7) gets its own array:

| Storage | Size | Content |
|---------|------|---------|
| Handle: `0x6365a0 + civ*4` | 4 bytes | GlobalAlloc handle |
| Pointer: `DAT_006365c0 + civ*4` | 4 bytes | Pointer into _MEM |
| Data: `totalTiles` bytes | varies | One byte per tile, initialized to 0 |

Plus 4 visibility summary bitmaps:

| Handle | Pointer | Size |
|--------|---------|------|
| `DAT_006d1174` | `DAT_006365e0` | `alignedWidth * alignedHeight` |
| `DAT_006d1178` | `DAT_006365e4` | same |
| `DAT_006d117c` | `DAT_006365e8` | same |
| `DAT_006d1180` | `DAT_006365ec` | same |

Where `alignedWidth = (mapWidth + 3) >> 2`, `alignedHeight = (mapHeight + 3) >> 2`.

Summary bitmaps are NOT initialized (left uninitialized, written during gameplay).

Init complete flag: `DAT_006365f0 = 1`

---

## Terrain Yield Table

Located at `DAT_00627cca`. Lookup formula (FUN_004e868f):
```
base_yield = DAT_00627cca[(resource_type * 11 + terrain_type) * 0x18 + yield_type]
```
- `terrain_type`: 0-10 (from FUN_005b89bb)
- `resource_type`: 0-10 (from FUN_005b8ee1)
- `yield_type`: 0=food, 1=shields, 2=trade
- Table size: 11 × 11 × 24 = 2,904 bytes

Improvement bonuses per terrain:
- `DAT_00627cd0[terrain * 0x18]` = irrigation food bonus
- `DAT_00627cd1[terrain * 0x18]` = mining shield bonus

---

## Map Globals

| Address | Size | Name | Set By |
|---------|------|------|--------|
| `DAT_006d1160` | 2 | Map width | Dialog / .sav loader |
| `DAT_006d1162` | 2 | Map height | Dialog / .sav loader |
| `DAT_006d1164` | 4 | Total tiles = (width/2)*height | FUN_005b7fe0 |
| `DAT_006d1166` | 2 | Wrapping flag = DAT_00655ae8 & 0x8000 | FUN_00408d33 |
| `DAT_006d1168` | 2 | Map seed = rand() & 0x7FFF | FUN_005b85fe |
| `DAT_006d116a` | 2 | Aligned width = (width+3)>>2 | FUN_005b7fe0 |
| `DAT_006d116c` | 2 | Aligned height = (height+3)>>2 | FUN_005b7fe0 |
| `DAT_006d1170` | 4 | Tile data handle (GlobalAlloc) | FUN_005b7fe0 |
| `DAT_00636598` | 4 | Tile data pointer (GlobalLock) | FUN_005b7fe0 |
| `DAT_006365f0` | 4 | Allocation complete flag (1) | FUN_005b7fe0 |
| `DAT_006d1188` | 6 | Invalid tile sentinel data | Copied from tile[0,0] |
| `DAT_00655ae8` | 2 | Map options (bit 15 = wrapping) | Dialog |

---

## Unit Stack Functions (linked list on tile)

Units at the same tile form a **doubly-linked list** via offsets +0x16 (prev) and +0x18 (next).

### FUN_005b2e69(x, y) — Get first unit on tile (231 bytes)
Linear scan of all units for matching (x,y), then follows prev pointers to list head.

### FUN_005b2c82(unit) — Get next unit in stack (65 bytes)
Returns `*(short *)(unit_base + unit*0x20 + 0x18)` — the next pointer.

### FUN_005b6458(unit) — Can unit move? (176 bytes)
Returns 1 if unit is alive, has valid position, not killed (flag != 3), and has movement remaining.

### FUN_005b6787(unit) — Skip unit's turn (40 bytes)
Sets `moves_used = base_movement` — consumes all movement without moving.

### FUN_005b2f50(unit) — Mark unit killed (66 bytes)
Sets `orders = 3` (killed flag), clears transport pointer to 0xFFFF.

### FUN_005b5d93(unit, sync) — Disband unit safely (677 bytes)
If ship on water: relocate first, then delete. Otherwise direct delete via FUN_005b4391.
In multiplayer: sends network message and waits for confirmation.

### FUN_005b50ad(unit, countType) — Aggregate units on tile (724 bytes)
Iterates stack, accumulates by type:
0=attack, 1=defense, 2=count, 3=firepower, 4=air+cargo, 5=transport, 6=ships,
7=bombers, 8=ranged, 9=naval, 10=fortified, 0xB=transport contents.

### FUN_005b4d8c(x, y, civ) — Threat level at tile (86 bytes)
If no city at tile: compute threat via FUN_005b4c63. Otherwise returns 0.

### FUN_005b8c42(x, y) — Fertility at tile (100 bytes)
Returns 0-8 fertility value. Used by AI for settler placement scoring.
