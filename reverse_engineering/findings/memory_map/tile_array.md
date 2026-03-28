# Tile Array — In-Memory Format

Derived from decompiled source `reverse_engineering/decompiled/block_005B0000.c`
and `block_00400000.c`. Confirmed by fread/fwrite cross-reference with save file format.

---

## Key Addresses

| Address | Type | Description |
|---------|------|-------------|
| `0x00636598` | `undefined1 *` | **Pointer variable** — holds the heap address of the tile array |
| `0x006D1160` | `i16` | `mapWidth` (full isometric width, e.g. 80 for a "small" map) |
| `0x006D1162` | `i16` | `mapHeight` (e.g. 50 for a "small" map) |
| `0x006D1164` | `i16` | `ms` = tile count = (mapWidth / 2) × mapHeight (e.g. 2000) |
| `0x006D1166` | `i16` | `mapShape` — wrap flag (0 = cylindrical) |
| `0x006D1168` | `i32` | `mapSeed` |
| `0x006D116A` | `i16` | `qw` — quarter-resolution width |
| `0x006D116C` | `i16` | `qh` — quarter-resolution height |

The entire 14-byte block `0x006D1160..0x006D116D` mirrors the save file MAP section header.

`0x006D1170` holds the Windows `GlobalHandle` (allocation handle) for the tile array buffer.

---

## Tile Array Layout

```
tileArrayBase = *(undefined1 **) 0x00636598   // read this pointer first
tileArraySize = ms * 6 bytes                   // e.g. 2000 × 6 = 12,000 bytes
```

### Record Size: 6 bytes per tile pair

Each **6-byte record covers two adjacent isometric positions** `(x, y)` and `(x+1, y)`.
Bit 0 of the x coordinate selects which "side" of the record you're reading.
The pointer to the 6-byte record for tile `(x, y)` is:

```c
// FUN_005b8931 @ 0x005B8931 (block_005B0000.c line 3218)
tilePtr = tileArrayBase
        + (mapWidth & ~1) * y * 3
        + (x & ~1) * 3
```

With mapWidth=80: `tilePtr = base + (80 * y + (x & ~1)) * 3`

For our session (Turn 1, mapWidth=80):
- Tile (39, 9): x & ~1 = 38, offset = (80*9 + 38)*3 = 758*3 = **2274**
  → tile bytes at `base + 2274`

### Tile Record Format (6 bytes, matches save file exactly)

| Byte | Bits | Field | Notes |
|------|------|-------|-------|
| 0 | `[3:0]` | `terrain` | 0=Desert 1=Plains 2=Grassland 3=Forest 4=Hills 5=Mountains 6=Tundra 7=Arctic 8=Swamp 9=Jungle 10=Ocean |
| 0 | `[4]` | `goodyHut` | 1 = bonus village present |
| 0 | `[5]` | ??? | |
| 0 | `[6]` | `resourceSuppressed` | 1 = resource hidden |
| 0 | `[7]` | `river` | 1 = river present |
| 1 | all | `improvements` | road/irrigation/mine flags (see parser.js `improvementFromByte`) |
| 2 | `[7:5]` | `cityRadiusOwner` | owning civ index for city-radius tiles |
| 3 | all | `bodyId` | ocean body / continent ID |
| 4 | all | `visibility` | bitmask: which civs have seen this tile |
| 5 | `[7:4]` | `tileOwnership` | owning civ index |
| 5 | `[3:0]` | `fertility` | city productivity potential |

Byte layout is identical to the `.sav` file block2 tile data (confirmed by
`_fread(DAT_00636598, DAT_006d1164 * 6, 1, fp)` / `_fwrite(...)` in block_005B0000.c).

---

## Flat Index Formula

For per-civ visibility arrays and other ms-length arrays at `0x006365C0..`:

```c
// FUN_005b898b @ 0x005B898B
flatIndex = (mapWidth >> 1) * y + (x >> 1)
          = mw2 * y + (x / 2)
```

This gives a flat index 0..(ms-1). Used for the 7 per-civ visibility arrays stored at:
- `*(undefined1 **)(0x006365C4 + civIndex * 4)` — civ 1..7 (civIndex 1-based)

---

## Initialization (new game)

```c
// block_005B0000.c line 2945 (new game world gen)
DAT_006d1164 = (DAT_006d1160 / 2) * DAT_006d1162;  // ms = mw2 * mh
// allocates DAT_006d1164 * 6 bytes, stores handle in DAT_006d1170
// allocates buffer with thunk_FUN_0046aad0, stores base in DAT_00636598
// initializes all tiles: byte[0]=10 (ocean), bytes[1-5]=0
```

---

## Source References

| Function | Address | File | Role |
|----------|---------|------|------|
| `FUN_005b8931` | 0x005B8931 | block_005B0000.c:3207 | Tile pointer from (x,y) — primary accessor |
| `FUN_005b898b` | 0x005B898B | block_005B0000.c:3232 | Flat index from (x,y,civIdx) |
| `FUN_005b89bb` | 0x005B89BB | block_005B0000.c:3246 | Returns terrain byte masked |
| `FUN_00408830` | 0x00408830 | block_00400000.c:1276 | Fill one byte field across all tiles |
| `FUN_00408873` | 0x00408873 | block_00400000.c:1295 | Fill byte field in rectangular region |
| `FUN_00408903` | 0x00408903 | block_00400000.c:1322 | Copy one field between two tile arrays |

---

## Reading Tile Data in Python

```python
import ctypes, ctypes.wintypes

def read_tile(h, x, y, map_width=80):
    # Step 1: read tile array base pointer
    base_ptr_addr = 0x00636598
    base = ctypes.c_uint32(0)
    ctypes.windll.kernel32.ReadProcessMemory(h, base_ptr_addr, ctypes.byref(base), 4, None)
    tile_base = base.value

    # Step 2: compute byte offset
    offset = (map_width * y + (x & ~1)) * 3
    tile_addr = tile_base + offset

    # Step 3: read 6 bytes
    buf = (ctypes.c_uint8 * 6)()
    ctypes.windll.kernel32.ReadProcessMemory(h, tile_addr, buf, 6, None)
    return bytes(buf)
```

---

## Open Questions

- **FUN_00408873 `& 0xffffU` mask**: Why does the index formula mask to 16 bits?
  Possibly a Ghidra decompilation artifact for 16-bit register arithmetic. No practical
  impact for maps ≤ 65535 bytes of tile data.
- **`DAT_006D1188`**: Used as the "invalid tile" sentinel (6 bytes at 0x6D1188)
  when `FUN_004087c0` returns 0 (out-of-bounds check).
- **Dual-entry records**: Confirmed that two isometric positions share one 6-byte record
  (bits of x select sub-entry). The byte 0 terrain field applies to BOTH. The exact
  meaning of the odd-x sub-position within the record may need further investigation
  (river, improvement, and body-id flags may differ per sub-entry).
