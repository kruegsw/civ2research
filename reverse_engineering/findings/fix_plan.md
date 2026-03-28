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

## Resolved from Analysis (no code change needed)

### 8. Civ struct base offset (+0xA0) — RESOLVED ✓
**Finding:** The +0xA0 offset is CONSISTENT with our code. Civ fields start at
+0xA0 within each 0x594-byte civ record. Government at +0xA0+0x15 = +0xB5 matches
our `DAT_0064c600 + civ*0x594 + 0xB5`. No fix needed.

### 9. Difficulty byte encoding — RESOLVED ✓
**Finding:** The "chieftain" label in the snapshot was a sniff-game.py display bug
(DIFF_NAMES array index issue). Our engine's difficulty encoding (0-5) is correct.
Prince=3 works for food box calculation. Fix sniff-game.py display, not engine.

### 10. Cosmic parameter discrepancies — LOW PRIORITY
**Finding:** Offsets 15 (Fundamentalism support) and 16 (Communism palace) differ
from RULES.TXT. These only affect Fundamentalism/Communism government mechanics
which we haven't reached yet. Will investigate when those systems are tested.

## Still Needs Next Sniffing Session

### 7. Unit type cost field offset — CONFIRMED WRONG
**Analysis:** Our rules-loader puts cost at offset 0x0C from DAT_0064b1bc. Cross-
referencing sniffing data shows offset 0x0C maps to the MOVES field (sniffing byte[4]).
Cost coincidentally equals moves for many units (Warriors: both 1, Archers: both 3)
but they are different fields.
**The actual cost location in the in-memory struct is unknown.** The C source at
block_004E0000.c line 4870 reads cost from `DAT_0064c48c[local_24 * 8]` which is
the BUILDING cost table, not the unit type table. For unit production, the cost
might come from a different mechanism.
**Next step:** In the next sniffing session, set a city to build Warriors and
observe which memory address the game reads for the shield cost. Or search for
the value 10 (Warriors cost × shield rows) near the unit/city structs.

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
