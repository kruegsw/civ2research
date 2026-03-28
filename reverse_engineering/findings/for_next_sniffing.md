# Next Sniffing Session — Data Needed

These are specific things missing from the first session that would help validate
and fix our engine. Prioritized by impact.

---

## Priority 1: Verify Now (Quick Reads)

### 1A. Difficulty Byte Encoding
The snapshot filename said "chieftain" but Deity was selected. Read `0x00655B02` at
the title screen AND after starting games at different difficulty levels.

**Action:** Start 3 quick games (Chieftain, Prince, Deity), read `0x00655B02` each time.
Expected: 0=Chieftain, 1=Warlord, 2=Prince, 3=King, 4=Emperor, 5=Deity.
If it's different, document the actual encoding.

### 1B. Unit Type Cost Field
Our Ghidra data says cost is at offset 0x0C in the 20-byte unit type record.
But sniffing showed offset 12-15 = flags (e.g., `0x00000004` for Legion). The actual
shield cost might be at offset 18-19.

**Action:** Read the full 20 bytes for Warriors (unit 2) at `0x0064B1EC`.
Cross-check: Warriors cost = 1 row (10 shields). Is `bytes[12]` = 1? Or `bytes[18]` = 1?
Also check Settlers (unit 0) at `0x0064B1C4` — cost should be 4 rows.

The unit_type_stats.md already has the raw bytes. Looking at Warriors:
`01 01 0A 01 01 00 01 FF 26 04 00 00 00 00 00 00 1D 00 03 00`
- byte[12] = 0x00 (not cost)
- byte[18] = 0x03 (could be cost=3? but RULES.TXT says 1)

This needs verification against RULES.TXT cost values for several units.

### 1C. Civ Struct Base Offset
README.md says civ array at `0x0064C6A0` but our Ghidra says `0x0064C600`.
The difference (0xA0 = 160 bytes) could be civ 0 (barbarians) header.

**Action:** Read bytes at `0x0064C600` through `0x0064C6A0` to see if the first
160 bytes are a header or if they're civ 0 data. Check if gold for Civ 1
(first non-barbarian) is at `0x0064C600 + 0x594 + 0xA2` OR at `0x0064C600 + 0xA2`.

---

## Priority 2: Capture During Gameplay (Turn Processing)

### 2A. AI Turn Unit-by-Unit Processing
During an AI turn, capture at maximum frequency:
- DAT_00655afe (active unit index) changes
- Each unit's position change
- Each unit's order assignment
- Timing between each unit being processed

This tells us the exact order the AI processes units, what orders it assigns,
and whether units actually move. Focus on the FIRST AI turn of a new game.

### 2B. City Production Selection
After a city is founded, what production item does the AI assign?
- Read city struct byte 0x39 (production item) before and after the AI turn
- Does the AI change it? What does it pick first?

### 2C. Per-Civ Visibility/Exploration Arrays
Read the pointer array at `0x006365C0` (8 entries × 4 bytes = 32 bytes).
Then for the human player's civ, read the first 100 bytes of the pointed-to array.
What encoding? 0=unexplored, non-zero=explored? Or bitmask per tile?

Also read: `0x006365EC` — what pointer does this hold? Is it the same as one
of the `0x006365C0` entries or different?

---

## Priority 3: Full Struct Dumps (One-Time)

### 3A. Full Unit Instance Struct (32 bytes)
Dump the complete 32 bytes for a few units at different states:
- A settler at (x,y) with order=none
- A warrior with order=goto
- A warrior that just moved

Document every byte with what it appears to be. Compare against our Ghidra
unit struct (DAT_006560f0, stride 0x20):
```
+0x00: x (i16)       +0x02: y (i16)       +0x04: status (u16)
+0x06: type (u8)     +0x07: owner (u8)    +0x08: ???
+0x09: ???           +0x0A: moves (u8)    +0x0B: ???
+0x0C: ???           +0x0D: ???           +0x0E: ???
+0x0F: order (u8)    +0x10: home_city (u8)+0x11: ???
+0x12: goto_x (i16)  +0x14: goto_y (i16)  +0x16: prev_stack (i16)
+0x18: next_stack (i16) +0x1A: unit_id (i32) +0x1E: ???
```

### 3B. Full City Struct (88 bytes)
Same — dump all 88 bytes for a city at different sizes/production states.
Compare against our Ghidra city struct. Key unknowns:
- Offsets 0x0A through 0x19 (between size and food stored)
- Offset 0x34 through 0x38 (between tile bitmap and production item)
- Offset 0x3A through 0x53 (between production item and exists flag)

### 3C. Map Dimension Block
Read the full 14-byte block `0x006D1160..0x006D116D`:
```
+0: mapWidth (i16)    +2: mapHeight (i16)
+4: ms/totalTiles (i16 or i32?)   +6: mapShape (i16)
+8: mapSeed (i32)     +C: qw (i16)    +E: qh (i16)
```
Verify each field against the selected map size.

---

## Priority 4: Game Text Files (Already Captured ✓)

These are already in the findings folder:
- Game.txt (5230 lines — all dialog/popup text)
- Labels.txt (903 lines — UI labels)
- CITY.TXT (720 lines — city names by civ)
- RULES.TXT (637 lines — game rules)
- LEADERS.TXT (21 lines — leader names)

**No further action needed** unless they differ from the installed game files.

---

## Notes for the Sniffing AI

- Run `sniff-game.py --log game.log` for continuous monitoring
- For one-shot reads, consider adding a `--dump` mode that reads specific
  addresses and exits
- The `read-snapshot.py` tool can parse the binary snapshot files afterward
- All addresses are absolute virtual addresses — no base offset needed
