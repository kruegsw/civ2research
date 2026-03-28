# Next Sniffing Session — Data Needed

Updated after sessions 1 and 2. Items marked ✓ are resolved.

---

## Resolved (sessions 1 & 2)

- ✓ **Difficulty byte encoding** — confirmed at `0x00655B04` (0=Chieftain..5=Deity)
- ✓ **All DAT_ addresses** — confirmed matching real process memory
- ✓ **Tile format (6 bytes, shared pairs)** — confirmed
- ✓ **Unit/city/civ struct strides** — confirmed
- ✓ **Civ struct base +0xA0** — consistent with our code
- ✓ **Warriors cost = 10 shields** — RULES.TXT cost=1 × 10 rows = 10
- ✓ **Beakers sentinel = 0xFFFF** — confirmed
- ✓ **Unit transit (-1200,-1200)** — documented
- ✓ **Shield overflow carries forward** — confirmed
- ✓ **AI food box = 13 - difficulty** — confirmed, DAT_00655b08

---

## Priority 1: Unit Cost Field (BLOCKING)

### Where does the game store unit shield cost?
**Status:** Our rules-loader puts cost at offset 0x0C from DAT_0064b1bc, but this
maps to the MOVES field. Cost coincidentally equals moves for many units but
they are different fields.

The C source reads production cost from `DAT_0064c48c[local_24 * 8]` — the
BUILDING cost table (stride 8). For UNIT production, the mechanism is unclear.

**Session 2 confirmed:** Warriors cost = 10 shields (1 × 10 rows). The threshold
was reached when city shields hit 10. But WHERE in memory is the "1" stored?

**Actions (try any):**
1. Search process memory for byte sequence `04 01 02 03 04` (costs of units 0-4:
   Settlers=4, Warriors=1, Phalanx=2, Archers=3, Legion=4)
2. Watch a city building Warriors — when shields hit 10 and reset, what address
   was read to determine the threshold?
3. Check if the building cost table at `DAT_0064c48c` (stride 8) also contains
   unit costs at higher indices

---

## Priority 2: AI Movement (why units don't move in our engine)

### 2A. Capture AI Turn Unit-by-Unit
During an AI turn in a REAL game, observe at max frequency:
- Which unit index is active (`DAT_00655afe`)
- Each unit's order assignment and position change
- The sequence and timing

**Key question:** When the AI moves a warrior to explore, what order does it assign?
(order=11 goto? order=27 goto_ai? something else?) And what is the goto destination?

### 2B. AI Production Selection
After an AI city is founded:
- What production item appears in city byte 0x39?
- How quickly does the AI assign production?
- Does it change production mid-build?

### 2C. Exploration Map Format
Read the pointer at `DAT_006365C4` (civ 1 exploration map). Then read 100 bytes
from that address. What encoding? 0=unexplored? 1=explored? Or per-tile bitmask?

Also: does `DAT_006365EC` point to the same array or something different?

---

## Priority 3: Full Struct Verification

### 3A. Unit Instance Full 32 Bytes
Dump all 32 bytes for:
- A settler with no orders
- A warrior with a goto order
- A warrior that just moved

Compare against our Ghidra layout byte-by-byte.

### 3B. City Full 88 Bytes
Dump all 88 bytes for a city at size 1 producing Warriors.
Document unknown fields at offsets 0x0A-0x19, 0x34-0x38, 0x3A-0x53.

### 3C. Building/Improvement Cost Table
Read `DAT_0064c48c` with stride 8 for the first 40 entries.
Does this table contain UNIT costs too (at higher indices)?
Or is unit cost stored elsewhere?

---

## Notes for the Sniffing AI

- Run `sniff-game.py --log game.log` for continuous monitoring
- The `read-snapshot.py` tool parses binary snapshot files
- All addresses are absolute virtual addresses (no base offset needed)
- For focused reads, add a `--dump` mode or use Python directly:
  ```python
  import ctypes
  # Read 20 bytes of unit type table for Warriors (unit 2)
  addr = 0x0064B1BC + 2 * 20
  buf = (ctypes.c_uint8 * 20)()
  kernel32.ReadProcessMemory(handle, addr, buf, 20, None)
  print(bytes(buf).hex())
  ```
