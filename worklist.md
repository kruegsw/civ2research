# Worklist — Full .SAV Parser Plan

## Goal

Parse 100% of the Civ2 MGE .SAV file into structured data. Every documented byte accounted for. The parser should produce a complete JSON-serializable object representing the entire save file state.

## Status: All Batches Complete ✅

| Batch | Phases | Description | Status |
|-------|--------|-------------|--------|
| A | (refactor) | Refactor parser into sub-methods | ✅ |
| B | 1–2 | File header, game state, toggles, tech, wonders | ✅ |
| C | 3–4 | Per-civ name blocks + data blocks | ✅ |
| D | 7–9 | Tile byte accessors, Block 3, padding | ✅ |
| E | 10 | Full unit record parsing (32 bytes, dead units) | ✅ |
| F | 11 | Full city record parsing (88 bytes) | ✅ |
| G | 12–14 | Gap record, tail data, events, validation | ✅ |

**All phases complete.** Phase 15 has 11 of 12 cross-validation checks implemented (forward-chain offset check skipped as redundant with tail size validation). 0 regression diffs across both test files.

---

## Phase 1: File Header (0x0000–0x000D, 14 bytes) ✅ Batch B

### 1.1 Magic Signature & Format Detection
- [x] Read 8 bytes at 0x0000, validate = `"CIVILIZE"` (ASCII). Reject if mismatch.
- [x] Read null separator at 0x0008, confirm = `0x00`
- [x] Read format marker at 0x0009, confirm = `0x1A` (ASCII SUB)

### 1.2 Version / Map Width (dual purpose)
- [x] Read uint16 LE at 0x000A — version/width indicator
  - `0x0027` (39) = CiC or lower
  - `0x0028` (40) = FW
  - `0x002C` (44) = MGE patch 1.3
  - `0x0031` (49) = ToT 1.0
  - `0x0032` (50) = ToT 1.1
  - Store as `headerVersion`

### 1.3 Map Height (single byte)
- [x] Read 1 byte at 0x000C — map height from header perspective
  - Standard = 63, large = 191
  - Store as `headerMapHeight`
  - **Do NOT use for tile calculations** (use map data header at 13702 instead)

### 1.4 Flags
- [x] Read 1 byte at 0x000D — bitmask:
  - bit 0 = scenario flag (game loaded from .SCN)
  - bit 7 = large map flag
  - Observed: `0x00` = standard, `0x81` = scenario + large map
  - Store as `headerFlags`, extract `isScenarioSave` and `isLargeMap`

---

## Phase 2: Game State Preamble (0x000E–0x0155, 330 bytes SAV / 316 bytes SCN) ✅ Batch B

### 2.1 Game Toggle Flags (0x000C–0x0017)

**NOTE**: 0x000C–0x000D overlap with header bytes (dual purpose).

- [x] 0x000C bit 7: Bloodlust on/off
- [x] 0x000C bit 4: Simplified combat
- [x] 0x000D bit 7: Flat earth (0=round/wrapping, 1=flat)
- [x] 0x000D bit 0: Don't restart eliminated
- [x] 0x000E bit 7: Move units without mouse
- [x] 0x000E bit 6: Enter closes city screen
- [x] 0x000E bit 5: Show map grid
- [x] 0x000E bit 4: Sound effects
- [x] 0x000E bit 3: Music
- [x] 0x000F bit 7: Cheat menu enabled
- [x] 0x000F bit 6: Always wait at end of turn
- [x] 0x000F bit 5: Autosave each turn
- [x] 0x000F bit 4: Show enemy moves
- [x] 0x000F bit 3: No pause after enemy moves
- [x] 0x000F bit 2: Fast piece slide
- [x] 0x000F bit 1: Instant advice
- [x] 0x000F bit 0: Tutorial help
- [x] 0x0010 bit 5: Animated heralds
- [x] 0x0010 bit 4: High Council
- [x] 0x0010 bit 3: Civilopedia for advances
- [x] 0x0010 bit 2: Throne room graphics
- [x] 0x0010 bit 1: Diplomacy screen graphics
- [x] 0x0010 bit 0: Wonder movies
- [x] 0x0014 bit 7: Scenario flag / don't limit researchable techs
- [x] 0x0014 bit 6: Scenario file (no real effect)
- [x] 0x0014 bit 4: Cheat penalty/warning
- [x] 0x0016 bit 7: Announce "We Love the King Day"
- [x] 0x0016 bit 6: Warn when food dangerously low
- [x] 0x0016 bit 5: Announce cities in disorder
- [x] 0x0016 bit 4: Announce order restored in city
- [x] 0x0016 bit 3: Show non-combat units built
- [x] 0x0016 bit 2: Show invalid build instructions
- [x] 0x0016 bit 1: Warn when city growth halted
- [x] 0x0016 bit 0: Show city improvements built
- [x] 0x0017 bit 2: Zoom to city not default action
- [x] 0x0017 bit 1: Warn when new pollution occurs
- [x] 0x0017 bit 0: Warn when changing production will cost shields

**Store as `gameToggles` object with named boolean properties.**

### 2.2 Unknown Toggle Bytes
- [x] 0x0011–0x0013: 3 bytes — read and store as `unknownToggles_0x0011` (raw)
- [x] 0x0015: 1 byte — read and store as `unknownToggle_0x0015` (raw)

### 2.3 Core Game State Fields
- [x] 0x001C: uint16 LE — **turns passed** (`turnsPassed`)
- [x] 0x001E: uint16 LE — **turns for year calculation** (`turnsForYear`)
- [x] 0x0020: 2 bytes — unknown, store raw (`unknown_0x0020`)
- [x] 0x0022: uint16 LE — **selected unit ID** (`selectedUnit`, 0xFFFF = none)
- [x] 0x0024–0x0026: 3 bytes — unknown, store raw (`unknown_0x0024`)
- [x] 0x0027: 1 byte — **active human player** (`activeHumanPlayer`)
- [x] 0x0028: 1 byte — **player's map** (`playerMap`)
- [x] 0x0029: 1 byte — **player's civ number** (`playerCiv`) — ALREADY PARSED
- [x] 0x002A: 1 byte — **map-related byte** (`mapRelatedByte`, sometimes 0xFF)
- [x] 0x002B: 1 byte — **map revealed** (`mapRevealed`) — ALREADY PARSED
- [x] 0x002C: 1 byte — **difficulty level** (`difficulty`, 0=Chieftain...5=Deity)
- [x] 0x002D: 1 byte — **barbarian activity** (`barbarianActivity`, 0=villages...3=raging)
- [x] 0x002E: 1 byte — **civs alive bitmask** (`civsAlive`) — ALREADY PARSED
- [x] 0x002F: 1 byte — **human players bitmask** (`humanPlayers`)
- [x] 0x0030–0x0031: 2 bytes — unknown, store raw (`unknown_0x0030`)
- [x] 0x0032: 1 byte — **current pollution** (`currentPollution`, 0x7F=max→warming)
- [x] 0x0033: 1 byte — **global warming count** (`globalWarmingCount`)
- [x] 0x0034–0x0037: 4 bytes — unknown, store raw (`unknown_0x0034`)
- [x] 0x0038: 1 byte — **turns of peace** (`turnsOfPeace`, only after turn 200)
- [x] 0x0039: 1 byte — unknown, store raw (`unknown_0x0039`)
- [x] 0x003A: uint16 LE — **total unit count** (`totalUnits`) — ALREADY PARSED
- [x] 0x003C: uint16 LE — **total city count** (`totalCities`) — ALREADY PARSED
- [x] 0x003E: uint16 LE — **technology count** (`techCount`, always 89 for standard)
- [x] 0x0040–0x0041: 2 bytes — unknown, store raw (`unknown_0x0040`)

### 2.4 First Discoverer Per Advance
- [x] 0x0042: 100 bytes — one byte per advance (0–99)
  - Value = civ number (1–7) that first discovered it, 0 = not yet discovered
  - Store as `firstDiscoverer[100]`
  - Note: only first 89 entries meaningful for standard RULES.TXT

### 2.5 Tech Discovery Bitmask Per Advance
- [x] 0x00A6: 100 bytes — one byte per advance — ALREADY PARSED (as `civTechCounts` / `civTechs`)
  - Each byte: bit per civ that has discovered the tech
  - Keep existing logic, but also store raw array `techDiscoveryBitmask[100]`

### 2.6 Wonder City IDs
- [x] 0x010A: 56 bytes — 28 × uint16 LE
  - Per wonder: 0xFFFF = not built, 0xFFEF = destroyed, else = city sequence ID (0-based)
  - Store as `wonderCityIds[28]`
  - Cross-reference: wonder indices match RULES.TXT `@IMPROVE` IDs 32–59

### 2.7 Unknown Gap Before Name Blocks
- [x] 0x014A–0x0155 (SAV) / 0x014A–0x0147 (SCN): ~12-14 bytes
  - Unknown purpose, store raw as `unknown_preNameBlocks`
  - **DOC DISCREPANCY**: SCN vs SAV table says name blocks start at 0x014A/0x0158, but the rest of the doc consistently says 0x0148/0x0156. Parser uses 0x0148/0x0156. Confirm empirically.

---

## Phase 3: Per-Civ Name Blocks (8 × 242 = 1,936 bytes) ✅ Batch C

Starts at 0x0156 (SAV) / 0x0148 (SCN). Parser currently uses these offsets.

### 3.1 For each of 8 civ slots (0=barbarians, 1–7):
- [x] +0: 1 byte — **city style** (0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern) — PARTIALLY PARSED (style byte only)
- [x] +1: 1 byte — unknown/padding, store raw
- [x] +2–24: 23 bytes — **leader name** (null-terminated)
- [x] +26–48: 23 bytes — **tribe name** plural (e.g., "Romans")
- [x] +50–72: 23 bytes — **tribe adjective** singular (e.g., "Roman")
- [x] +74–96: 23 bytes — **title: Anarchy**
- [x] +98–120: 23 bytes — **title: Despotism**
- [x] +122–144: 23 bytes — **title: Monarchy**
- [x] +146–168: 23 bytes — **title: Communism**
- [x] +170–192: 23 bytes — **title: Fundamentalism**
- [x] +194–216: 23 bytes — **title: Republic**
- [x] +218–240: 23 bytes — **title: Democracy**
- [x] +241: 1 byte — padding (always 0x00)

**Store as `civNameBlocks[8]`, each with named fields. Empty blocks (AI civs) will have all-zero strings.**

---

## Phase 4: Per-Civ Data Blocks (8 × 1,428 = 11,424 bytes SAV; 8 × 1,396 SCN) ✅ Batch C

Starts at 0x08E6 (SAV) / 0x08D8 (SCN). **Last block is truncated by 2 bytes.**

### 4.1 For each of 8 civ slots, parse the full 1,428-byte block (1,396 for SCN):

**All offsets below are 0-indexed within each block.**

#### Known Fields
- [x] +0: 1 byte — **state flags** bitmask
- [x] +1: 1 byte — **gender** (0x00=male, 0x02=female)
- [x] +2–5: int32 LE — **treasury** (gold reserves)
- [x] +6: 1 byte — **RULES.TXT civ number**
- [x] +7: 1 byte — **civ variant**
- [x] +8–9: uint16 LE — **research progress**
- [x] +10: 1 byte — **tech being researched**
- [x] +11: 1 byte — **tech research helper**
- [x] +12–13: uint16 LE — **starting position**
- [x] +14–15: 2 bytes — **unknown**
- [x] +16: 1 byte — **acquired tech count + 1**
- [x] +17: 1 byte — **future tech count + 1**
- [x] +18–19: 2 bytes — **unknown**
- [x] +20: 1 byte — **tax/science/luxury rates** (encoded)
- [x] +21: 1 byte — **government type**
- [x] +22–29: 8 bytes — **unknown**
- [x] +30: 1 byte — **diplomatic reputation**
- [x] +31–62: 32 bytes — **treaties** (4 bytes × 8 civs)
- [x] +63–64: 2 bytes — **unknown**
- [x] +65–71: 7 bytes — **attitudes**
- [x] +72–87: 16 bytes — **unknown**
- [x] +88–99: 12 bytes — **technology bitmask**
- [x] +100–101: 2 bytes — **unknown**
- [x] +102–103: uint16 LE — **military power**
- [x] +104–105: uint16 LE — **city count**
- [x] +106–107: 2 bytes — **unknown**
- [x] +108–109: uint16 LE — **sum of city sizes**
- [x] +110–113: 4 bytes — **unknown**
- [x] +114–213: 100 bytes — **first discoverer flags**
- [x] +214–276: 63 bytes — **active unit counts**
- [x] +277–339: 63 bytes — **unit casualty counts**
- [x] +340–402: 63 bytes — **units in production**
- [x] +403–995: 593 bytes — **large unknown region** (stored raw)
- [x] +996–1009: 14 bytes — **last contact turns** (7 × uint16 LE)
- [x] +1010–1427: 418 bytes — **tail of per-civ block** (stored raw)

#### Treaty Byte Layout — all parsed
- [x] Contact, cease fire, peace, alliance, vendetta, embassy, war, unknowns

**Stored as `civData[8]` array of objects with all named fields + raw bytes for unknowns.**

---

## Phase 5: Map Header (14 bytes at fixed offset)

Offset: 13702 (SAV) / 13432 (SCN). **ALREADY FULLY PARSED.**

- [x] +0: uint16 LE — `map_width2` (doubled width)
- [x] +2: uint16 LE — `map_height`
- [x] +4: uint16 LE — `map_size` (total tiles)
- [x] +6: uint16 LE — `map_shape` (0=round, 1=flat)
- [x] +8: uint16 LE — `map_seed`
- [x] +10: uint16 LE — `quarter_width`
- [x] +12: uint16 LE — `quarter_height`
- [x] Validation: `map_size == (map_width2/2) * map_height`

---

## Phase 6: Block 1 — Per-Civ Known Improvements (map_size × 7 bytes)

Offset: map_header + 14. **ALREADY FULLY PARSED.**

- [x] 7 sections of `map_size` bytes (civs 1–7)
- [x] Each byte: bit 0=unit, 1=city, 2=irrigation, 3=mining, 4=road, 5=railroad, 6=fortress, 7=pollution
- [x] Accessor: `getKnownImprovements(gx, gy, civSlot)`

---

## Phase 7: Block 2 — Terrain Data (map_size × 6 bytes) ✅ Batch D

**All 6 bytes per tile parsed with accessors.**

### 7.1 Byte 0: Terrain Type + Flags
- [x] Low nibble (& 0x0F): terrain ID (0–10)
- [x] Bit 7 (0x80): river present
- [x] Bit 4 (0x10): goody hut
- [x] Bit 6 (0x40): "no resource" flag (used in getResource)
- [x] Bit 5 (0x20): terrain resource animation (ToT only, unused in MGE) — documented as unused

### 7.2 Byte 1: Tile Improvements
- [x] Full byte returned by `getImprovements()`
- [x] All bits parsed (unit, city, irrigation, mining, road, railroad, fortress, pollution)
- [x] Derived: farmland = irrigation + mining; airbase = fortress + city present

### 7.3 Byte 2: City Radius Owner
- [x] `getCityRadiusOwner(gx, gy)`: `(byte >> 5) & 7`

### 7.4 Byte 3: Continent/Body ID
- [x] `getBodyId(gx, gy)`: contiguous land/water body number

### 7.5 Byte 4: Visibility Bitmask
- [x] `getVisibility(gx, gy)` returns raw byte

### 7.6 Byte 5: Ownership + Fertility
- [x] `getTileOwnership(gx, gy)`: high nibble
- [x] `getTileFertility(gx, gy)`: low nibble

---

## Phase 8: Block 3 — Quarter-Resolution Data (qw × qh × 2 bytes) ✅ Batch D

- [x] Read `quarter_width * quarter_height * 2` bytes at block2 end
- [x] Store raw as `block3Data`
- [x] Purpose unclear per Höfelt: "entirely pointless"

---

## Phase 9: 1024-Byte Padding ✅ Batch D

- [x] Read 1024 bytes between Block 3 and unit section
- [x] Store raw as `paddingBlock`
- [x] Non-zero bytes logged (40-46 non-zero bytes observed in test files)

---

## Phase 10: Unit Records (totalUnits × 32 bytes SAV / 26 bytes SCN) ✅ Batch E

### 10.1–10.3 All 32 bytes parsed
- [x] All previously parsed fields preserved (x, y, type, owner, vis, hpLost, alive, orders, stack links)
- [x] +4: movementFlags, +5: statusFlags (veteran!), +8: movePointsLeft
- [x] +11: lastDirection, +12: aiTaskRole, +13: cargoWorkFuel
- [x] +16: homeCityId, +18/+20: gotoX/Y, +26: sequenceId, +28: padding confirmed
- [x] Dead units stored in `allUnits` array with full data

---

## Phase 11: City Records (totalCities × 88 bytes SAV / 84 bytes SCN) ✅ Batch F

### 11.1–11.2 All 88 bytes parsed
- [x] All previously parsed fields preserved (x, y, owner, size, name, hasWalls, etc.)
- [x] +4–7: attributes 1-4 (coastal, auto-build, disorder, WLTKD, etc.)
- [x] +13: padding byte (non-zero in scenario files — likely has meaning, stored as raw)
- [x] +22–25: specialist details (16 × 2-bit entries)
- [x] +26–31: food/shields/trade accumulators
- [x] +48–50: worker tile assignments (inner, outerA, outerB bitmasks)
- [x] +51: specialist count (÷4)
- [x] +52–56: full building decode (all 33+ bits, named building list)
- [x] +57: item in production (unit vs building/wonder dispatch)
- [x] +58–73: trade routes, commodities, partner city IDs
- [x] +74–83: economic output (science, tax, trade, food, shields, happy, unhappy)
- [x] +84–87: city sequence ID + padding

---

## Phase 12: Gap Record (32 bytes between cities and tail) ✅ Batch G

- [x] Read 32 bytes at `city_block_end`
- [x] Store raw + parsed sub-fields (coordX, coordY, stateFlags, values)

---

## Phase 13: Tail Data (1,807 / 1,907 / 2,979 bytes) ✅ Batch G

### 13.1 Determine Tail Size
- [x] Standard SAV: 1,807 bytes
- [x] Scenario SAV / SCN: 1,907 bytes
- [x] NET: 2,979 bytes

### 13.2 City Name Counters (first 63 bytes)
- [x] 21 entries × 3 bytes each, stored as `cityNameCounters[21]`

### 13.3 Cursor Position
- [x] +63/+65: cursor X/Y as uint16 LE. Values are game-internal coordinates (not map grid coords).

### 13.4–13.5 Historical Power Graph + Zero Padding
- [x] Raw region +67..+1287 stored as `historyAndPadding`

### 13.6 Passwords
- [x] 7 × 32 bytes at +720, stored as raw blocks

### 13.7 Civilization Kill History (338 bytes)
- [x] At +1469 (standard) or +1569 (scenario, after 100-byte scenario block)
- [x] Count, kill turns, killer civ IDs, unknown bytes, destroyed civ names — all parsed
- [x] Verified: stubear has 1 kill (Aztecs turn 119 by civ 5), scenario has 0 kills

### 13.8 Game Engine Constants (+1288, 97 bytes)
- [x] Stored raw. Includes 0x0780 (1920) at +1289, 0x0438 (1080) at +1291, trailing 0x00 at +1384.

### 13.9 Fixed Constants (+1385, 7 bytes)
- [x] Always `0xAB 0x05 0x46 0x03 0x01 0x00 0x03`
- [x] Validated as integrity check (both test files pass)
- [x] **Note**: Doc said +1384 but empirically confirmed at +1385

### 13.10 Scenario Block & Name (scenario only, +1469)
- [x] 100-byte block inserted at +1469 for scenario saves
- [x] Scenario name at +1471 (e.g., "The Rise Of Rome")
- [x] Shifts kill history to +1569

### 13.11 Post-Fixed-Constants Region (+1392, 77 bytes)
- [x] Per-civ summary values, stored as `postFixedData`

### 13.12 Network-Specific Data (NET only)
- [x] Extra 1,172 bytes at +1807, stored raw as `networkData`

---

## Phase 14: Events Section (Scenario Files Only) ✅ Batch G

- [x] Search for "EVNT" magic near end of file
- [x] Parse event header (magic + count)
- [x] Parse event records (298 bytes each): trigger bitmask, action bitmask, raw parameters
- [x] Parse string table (null-terminated strings after event records)
- [x] Neither test file has events (no EVNT magic found)

---

## Phase 15: Cross-Validation Checks ✅ Batch G + follow-up

After parsing everything, run these integrity checks:

- [x] Terrain distribution logged (ocean %, per-terrain counts)
- [x] All alive cities have `getTerrain(gx, gy) != 10` (not ocean) — `citiesOnOcean`
- [x] Total unit count from header = number of unit records — `unitCountMatch`
- [x] Total city count from header = number of city records — `cityCountMatch`
- [x] Tail fixed constants = `0xAB 0x05 0x46 0x03 0x01 0x00 0x03` — `fixedConstantsValid`
- [x] City cx/cy parity match (isometric constraint) — `parityErrors`
- [x] Exactly one Palace per alive civ — `palaceErrors`
- [x] Wonder city IDs reference valid city array indices — `wonderIdErrors`
- [x] Unit home city IDs reference valid city array indices — `homeCityErrors` (0xFFFF and 0x00FF both treated as "no home city")
- [x] Worker counts + specialists = city_size — `workerSizeErrors` (scenario files may have mismatches from editor)
- [x] `science + tax ≈ trade` (±1) for cities without trade routes — `tradeErrors` (cities WITH routes expected to have sci+tax > trade due to route bonuses)
- [ ] Forward-chain city offset == backward-chain city offset (from file end) — skipped, redundant with tail size validation

---

## Phase 16: Output Structure ✅ Implemented

The parse result is a backward-compatible object. Top-level scalars and accessor functions are preserved from the original parser; new structured namespaces are additive.

```
{
  // ── Backward-compatible top-level fields ──
  mw, mh, mw2, ms, mapSeed, qw, qh, mapShape, isScn,
  tileData, cities, units, civStyles,
  playerCiv, mapRevealed, civsAlive, civTechCounts, civTechs,
  terrainCounts, oceanPct, citiesOnOcean,

  // ── Accessor functions (closures over map data) ──
  getTerrain, isLand, hasRiver, getImprovements, getVisibility,
  getResource, getNeighbors, wrap, hasGoodyHut, hasShield,
  getCityRadiusOwner, getBodyId, getTileOwnership, getTileFertility,
  getKnownImprovements,

  // ── Structured namespaces (Batches B–G) ──
  header: { magic, nullSep, formatMarker, headerVersion, headerMapHeight,
            headerFlags, isScenarioSave, isLargeMap },
  gameState: { toggles, turnsPassed, turnsForYear, selectedUnit,
               activeHumanPlayer, playerMap, playerCiv, difficulty, barbarianActivity,
               civsAlive, humanPlayers, currentPollution, globalWarmingCount, turnsOfPeace,
               totalUnits, totalCities, techCount,
               firstDiscoverer[100], techDiscoveryBitmask[100], wonderCityIds[28],
               unknowns },
  civNameBlocks: [8 × { style, leaderName, tribeName, tribeAdjective, titles[7] }],
  civData: [8 × { stateFlags, gender, treasury, rulesCivNumber, government,
                   treaties[8], attitudes[7], techBitmask, unitCounts, lastContactTurns,
                   unknowns }],
  map: { block3Data, paddingBlock, ... },
  allUnits: [totalUnits × { ...full 32-byte decode including dead units }],
  gapRecord: { raw, coordX, coordY, stateFlags, values },
  tail: { tailSize, tailOff, cityNameCounters[21], cursorPosition,
          historyAndPadding, engineConstants, postFixedData,
          fixedConstants, fixedConstantsValid,
          passwords[7], scenarioBlock, scenarioName,
          killHistory: { count, killTurns, killerCivIds, killUnknown, destroyedCivNames },
          networkData, rawTail },
  events: { count, records[], stringTable } | null,
  validation: { terrainCounts, oceanPct, citiesOnOcean,
                unitCountMatch, cityCountMatch, fixedConstantsValid }
}
```

---

## Implementation Notes

- **Preserve existing renderer compatibility**: The current `parse()` return object and all accessor functions (`getTerrain`, `getImprovements`, `getVisibility`, `getResource`, `getNeighbors`, `wrap`, `hasRiver`, `hasGoodyHut`, `hasShield`, `getKnownImprovements`) must continue to work. New fields are additive.
- **Raw bytes for unknowns**: Every undecoded byte range gets stored as a raw Uint8Array so nothing is lost. Future analysis can decode these without re-parsing.
- **Dead units and destroyed cities**: Store all records including dead/destroyed entries. Add `alive` / `destroyed` flags. The current renderer can continue filtering on `alive === 0`.
- **File type dispatch**: Consolidate the SAV/SCN/NET detection into a single `fileType` field used throughout: `{type: 'sav'|'scn'|'net', isScenario, recordSizes: {...}, offsets: {...}}`.
