# Fix Plan — Based on Sniffing Session 1

## Recommendation: Fix confirmed items NOW, wait on uncertain items

The sniffing confirmed our addresses are correct. The issues are initialization
gaps and a few field offset questions. Fix the confirmed ones now to unblock
AI movement testing. Wait on uncertain ones until the next sniffing session
verifies them.

---

## Fix Now (confirmed by sniffing)

### 1. Beakers init to 0xFFFF
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** All civs get beakers=65535 (0xFFFF) at world gen. This is a sentinel
meaning "no research target selected." Our test initializes to 0.
**Fix:** After placing civs, set `w16(DAT_0064c600 + civ * 0x594 + 0xAA, 0, 0xFFFF)` for each civ.

### 2. Tile byte 2 — cityRadiusOwner
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** Byte 2 bits [7:5] = which civ's city radius covers this tile.
We set byte 2 = 0 for all tiles. For tiles in a city's fat cross, this should
be set to `(owner << 5)`.
**Fix:** In `placeCity()`, after stamping byte 1 (city flag), also set byte 2
for all 21 fat-cross tiles: `_MEM[tileOff + 2] = (_MEM[tileOff + 2] & 0x1F) | (owner << 5)`.

### 3. Tile byte 5 — fertility
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** Byte 5 lower nibble = fertility score. We set it to 0. In a real
game this is computed during world gen. For our test, a non-zero value (e.g., 4
for grassland) would be more realistic.
**Fix:** Set `_MEM[tileOff + 5] = (_MEM[tileOff + 5] & 0xF0) | 4` for grassland tiles.

### 4. Map dimension variables
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** The sniffing confirmed `DAT_006d1164` = ms = totalTiles, `DAT_006d116a` = qw,
`DAT_006d116c` = qh. We set some of these but not all.
**Fix:** Ensure all are set:
```js
w16(DAT_006d1164, 0, (mw2 / 2) * MH);  // ms = total tiles
w16(DAT_006d1166, 0, 0);                 // mapShape (0 = cylindrical)
w16(DAT_006d116a, 0, (mw2 + 3) >> 2);   // qw
w16(DAT_006d116c, 0, MH);               // qh (observed: same as map height)
```

### 5. AI sci/tax rates at game start
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** AI civs start with varied sci/tax rates (not all 0/0):
- Typical: sci=40%, tax=40% (stored as 4/4, ×10=%)
- Some get different ratios (30/60, 20/70)
**Fix:** Set initial rates for each civ:
```js
_MEM[DAT_0064c600 + civ * 0x594 + 0xB3] = 4;  // sci 40%
_MEM[DAT_0064c600 + civ * 0x594 + 0xB4] = 4;  // tax 40%
```

### 6. Veteran status for AI units at high difficulty
**File:** `charlizationv4/test-fresh-game.js`
**Finding:** At Deity, all starting Settlers are veteran. Unit status word
bit 6 = veteran flag.
**Fix:** For difficulty >= 4 (Emperor/Deity), set veteran bit on AI starting units:
`w16(u, 4, s16(u, 4) | 0x40)`.

---

## Wait for Next Sniffing (needs verification)

### 7. Unit type cost field offset
**Current:** Our rules-loader puts cost at struct offset 0x0C.
**Question:** Sniffing shows 0x0C-0x0F = flags (4 bytes). Cost might be at 0x12-0x13 (bytes 18-19).
**Why wait:** The raw bytes for Warriors show byte[18]=0x03 but RULES.TXT says cost=1.
Need to cross-check more units to determine if this is cost × something or a different field.
**Impact:** Affects city production timing. Currently works because we manually set production.

### 8. Civ struct base offset (+0xA0)
**Current:** We use DAT_0064c600 as the civ array base with stride 0x594.
**Question:** Sniffing README says "0x0064C6A0" for civ array. Is +0xA0 a per-civ
offset or a header?
**Why wait:** Our existing civ field accesses (government at +0xB5, etc.) work in
the engine, suggesting our layout is correct. But the gold/beakers offsets might
need adjustment.
**Impact:** Gold and beaker tracking. Low urgency since our test doesn't use these.

### 9. Difficulty byte encoding
**Current:** We assume 0=Chieftain through 5=Deity.
**Question:** Snapshot said "chieftain" for a Deity game.
**Why wait:** Might be a sniff-game.py display bug (wrong array index) rather than
a data encoding issue. Easy to verify in next session.
**Impact:** AI food box row calculation uses difficulty. Currently works for Prince (3).

### 10. Cosmic parameter discrepancies (offsets 15, 16)
**Current:** We load from RULES.TXT (values 10, 0).
**Question:** Memory shows 8, 1. Runtime modification?
**Why wait:** These affect Fundamentalism and Communism mechanics which we
haven't tested yet. Low priority.

---

## Future (after AI movement works)

### 11. Production item encoding
Need to verify: positive=unit, negative=building (from Civ2-clone).
Test by observing what the AI sets in byte 0x39 of city structs.

### 12. Exploration map encoding
What does each byte in the per-civ visibility array mean?
0=unexplored? 1=explored? Bitmask?

### 13. Full unit/city struct documentation
Match every byte of the 32-byte unit and 88-byte city structs against
observed values from a real game.
