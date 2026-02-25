# Civilization II Multiplayer Gold Edition — Binary Analysis

A comprehensive record of everything discovered through reverse engineering Civilization II save files, executables, and data files during this project. All findings are from **Civ2 Multiplayer Gold Edition (MGE)**, version 5.4.0f, patch 3, dated 26-March-99.

---

## Files Analyzed

### Game Installation Files

| File | Size | Description |
|------|------|-------------|
| `civ2.exe` | 2,489,344 bytes | Main executable. PE32 Intel 80386. Built from `D:\Ss\Franklinton\` (debug path preserved in strings). |
| `XDaemon.dll` | 95,744 bytes | Network/multiplayer library. XDaemon Communications Library v3.5.0, dated 10-Nov-1998. Exports 48 functions for IGZ multiplayer support. |
| `Civ2Art.dll` | 256,512 bytes | Credits/UI art container — 5 embedded GIFs (credits text, starfields, Mesoamerican relief, gray UI panel). Resource-only DLL, debug CRT. Built 1997-04-21. |
| `Tiles.dll` | 1,416,704 bytes | Tile & UI art container — 24 embedded GIFs (civilization backgrounds, historical illustrations, nuke sprite sheet, govt/diplomacy icons, Civ2 seal). Built 1997-04-21. |
| `cv.dll` | 4,980,224 bytes | City View art container — 16 embedded GIFs (building sprites, wonder sprites, vegetation growth, 12 landscape panoramas in 3 terrain × 4 era variants). Built 1997-04-21. |
| `mk.dll` | 3,165,696 bytes | Diplomacy & leader art container — 42 leader portraits (21 civs × 2), 7 throne room backgrounds, military advisor backdrop, 21 CTAB color palettes. Built 1997-04-21. |
| `pv.dll` | 1,999,360 bytes | Palace View art container — 55 embedded GIFs: base palace room + compositable upgrade sprites (walls, floors, columns, thrones, decorations) in 4-tier progression. 2 chroma-key colors. Built 1997-04-21. |
| `ss.dll` | 1,455,616 bytes | Spaceship art container — 46 embedded GIFs: 24 assembly progression views, component sprite sheets (solar panels, beams, pods), Earth/Alpha Centauri scenes, thruster animation. Orange chroma-key. Built 1997-04-21. |
| `Intro.dll` | 1,151,488 bytes | Intro slideshow art container — 13 embedded GIFs: historical engravings, photographs, and a satellite view, all with gold picture-frame borders. Displayed once at game launch. Built 1997-04-21. |
| `Wonder.dll` | 185,856 bytes | Wonder indicator art container — 28 embedded GIFs (74×74 each): one color-tinted panel per wonder for the wonder tracking UI. Smallest resource-only DLL. Built 1997-04-21. |
| `timerdll.dll` | 131,072 bytes | SMEDS engine timer callback DLL (internal name: CALLBACK.dll). Pure code, no resources. 6 exports for multimedia timer→PostMessage bridge. 16 timer slots. Debug build from `D:\SS\Smeds32\timer\`. Built 1997-03-17. |
| `Civ2Map.exe` | — | Map editor executable. |

### Data Files

| File | Size | Description |
|------|------|-------------|
| `LEADERS.TXT` | 2,426 bytes | Defines all 21 civilizations: leader names (male/female), tribe name, adjective, AI personality values, government title overrides. |
| `RULES.TXT` | 26,906 bytes | Core game rules — units, buildings, techs, terrain modifiers. |
| `Game.txt` | 108,656 bytes | UI strings, game text, dialog messages. |
| `CITY.TXT` | — | City name lists per civilization. |
| `PEDIA.TXT` | — | Civilopedia text entries. |
| `HERALD.TXT` | — | Herald/announcement text. |
| `HELP.TXT` | — | In-game help text. |
| `DEBUG.TXT` | — | Debug message templates (reveals internal state variable names). |

### Graphics Files

| File | Description |
|------|-------------|
| `TERRAIN1.GIF`, `TERRAIN2.GIF` | Terrain tile sprites (isometric). |
| `UNITS.GIF` | Unit sprites. |
| `PEOPLE.GIF` | People/citizen sprites. |
| `CITIES.GIF`, `CITY.GIF` | City graphics. |
| `ICONS.GIF` | UI icons. |
| `EDITORS*.GIF` | Map editor graphics. |

### Scenario Files

| File | Description |
|------|-------------|
| `ROME.SCN`, `WWII.SCN` | Pre-built scenarios. |
| `EUROPE.MP`, `GREECE.MP`, `MEDITERR.MP`, `PACIFIC.MP`, `WORLD.MP`, `WORLD_M.MP`, `WORLD_S.MP` | Map templates at various sizes. |

### Save Files Analyzed

Multiple `.SAV` files from different game stages have been analyzed to map the binary format. All share the same structural layout described below.

### Network/Runtime Files

| File | Size | Description |
|------|------|-------------|
| `CIV2.DAT` | 516 bytes | Runtime game configuration. Contains player name, local IP address, game parameters. |
| `Na_Auto.NET` | 71,111 bytes | Network autosave. Same `CIVILIZE` header as `.SAV` files. |
| `Na_Auto2.NET` | 71,023 bytes | Second network autosave. |
| `smeds.log` | — | Game engine log. Records version, network events, data fix-ups. |
| `XDaemon.log` | — | Network library log. Records connection events, timestamps. |
| `HALLFAME.DAT` | — | Hall of Fame records. |

---

## Save File Format (.SAV) — Deep Dive

All `.SAV` files (including `.NET`, `.HOT`, `.EML` network/multiplayer variants) share the same binary structure. The layout consists of seven sequential sections. Section offsets are **not fixed** — they shift depending on the number of civilizations, units, and cities in the game. The structure must be navigated using the header fields and known record sizes.

### Overall File Layout

```
┌─────────────────────────────────────────────────┐
│ 1. Header (14 bytes, fixed)                     │  0x0000
├─────────────────────────────────────────────────┤
│ 2. Game State (variable, ~60 bytes + per-civ)   │  0x000E
├─────────────────────────────────────────────────┤
│ 3. Civilization Data (variable, large)          │  varies
│    - Per-civ blocks: techs, diplomacy, etc.     │
│    - Player name embedded here                  │
├─────────────────────────────────────────────────┤
│ 4. Map Tile Data (fixed: num_tiles × 6 bytes)   │  varies
├─────────────────────────────────────────────────┤
│ 5. Unit Records (variable)                      │  varies
├─────────────────────────────────────────────────┤
│ 6. City Records (num_cities × 88 bytes)         │  varies
├─────────────────────────────────────────────────┤
│ 7. Tail Data (fixed: 1,807 bytes)               │  EOF - 1807
└─────────────────────────────────────────────────┘
```

Across all saves analyzed, the **tail section is always exactly 1,807 bytes**, providing a reliable anchor from the end of the file. The city count at header offset `0x3C` and the 88-byte city record size allow computing the city block boundaries, and from there the rest of the structure can be derived.

### Section 1: Header (Bytes 0x0000–0x000D, 14 bytes, fixed)

| Offset | Size | Field | Values Observed |
|--------|------|-------|-----------------|
| 0x0000 | 8 bytes | Magic signature | `CIVILIZE` (ASCII) |
| 0x0008 | 1 byte | Null separator | Always `0x00` |
| 0x0009 | 1 byte | Format marker | Always `0x1A` (ASCII SUB character) |
| 0x000A | 2 bytes | Map width (uint16 LE) | `44` in all saves analyzed |
| 0x000C | 2 bytes | Map height (uint16 LE) | `63` in all saves analyzed |

Notes:
- **Previous documentation error corrected**: Bytes 0x08 and 0x09 were previously described as "separator 0x1A" and "version 0x2C". In reality, 0x08 is a null byte (`0x00`) and 0x09 is `0x1A`. The value `0x2C` (44) at offset 0x0A is the map width, not a version number.
- `.NET` files (network saves) share the same `CIVILIZE` header format.
- Map width and height define the isometric coordinate space, not pixel dimensions.
- Total tiles = `(width × height) / 2` = 1,386 for a 44×63 map.

### Section 2: Game State (Bytes 0x000E–variable)

This section contains global game parameters. It extends from the end of the header to the start of the civilization data blocks. Its **total size varies** between saves depending on the number of active civilizations (observed range: 814–2,024 bytes across 5 saves).

#### Known Fields (confirmed across 5 saves)

| Offset | Size | Field | Values Observed | Notes |
|--------|------|-------|-----------------|-------|
| 0x000E | 2 bytes | Unknown constant | Always `30272` (0x7640) | Possibly format sub-version or flags |
| 0x0010 | 2 bytes | Unknown constant | Always `13` | |
| 0x0012 | 2 bytes | **Enemy civs alive** (uint16 LE) | 0, 4, 5, 6 | Number of AI civilizations still in the game |
| 0x0014 | 2 bytes | **Total civ slots** (uint16 LE) | 4, 8 | Maximum civilization slots (includes player) |
| 0x0016 | 2 bytes | Reserved | Always `0` | |
| 0x0018 | 2 bytes | Unknown | `0` or `4` | |
| 0x001A | 2 bytes | Reserved | Always `0` | |
| 0x001C | 2 bytes | **Turn number** (int16 LE) | 60–135 | Current game turn |
| 0x001E | 2 bytes | **Treasury** (int16 LE) | -2820 to 680 | Player's gold. Can be negative. |
| 0x0020 | 2 bytes | Unknown constant | Always `0xFFFF` (-1) | Possibly sentinel value |
| 0x0022 | 2 bytes | Unknown counter | 2–101, or `0xFFFF` | |
| 0x0027 | 1 byte | **Player's civ slot** | 2, 3, 5, 7 | Index into the internal civ array. Repeated identically at 0x28 and 0x29. |
| 0x002A | 1 byte | Unknown constant | Always `0xFF` (255) | |
| 0x002C | 1 byte | **Difficulty level** | 1, 5 | 0=Chieftain, 1=Warlord, 2=Prince, 3=King, 4=Emperor, 5=Deity |
| 0x003A | 2 bytes | **Total unit count** (uint16 LE) | 51–136 | Number of unit records in Section 5 |
| 0x003C | 2 bytes | **Total city count** (uint16 LE) | 16–43 | Number of city records in Section 6. **Confirmed** by cross-reference with parsed city blocks in all 5 saves. |

#### Player's Civ Slot vs. LEADERS.TXT Index

The value at offset 0x0027 is the player's **civ slot** — their position in the game's internal civilization array (0–7). This is **not** the same as the civilization's index in `LEADERS.TXT` (0–20). The civ slot is assigned at game start based on the number of players and their selection order.

### Section 3: Civilization Data (variable size, large)

This is the largest variable-size section, ranging from ~25 KB (7-civ games) to ~120 KB (observed in one save). It contains per-civilization data blocks including technology trees, diplomacy states, government types, and other per-civ state.

#### Player Name

The player's name is embedded within this section as a **null-terminated ASCII string in a 24-byte fixed field**, preceded by a 2-byte value. Its offset is **not fixed** — it varies between saves depending on the game configuration:

| Save | Player Name Offset | Preceding uint16 |
|------|--------------------|-------------------|
| Save A (enemies=6) | `0x033C` | `2` |
| Save B (enemies=5) | `0x042E` | `3` |
| Save C (enemies=4) | `0x033C` | `2` |
| Save D (enemies=0) | `0x0612` | `1` |
| Save E (enemies=4) | `0x07F6` | `3` |

The 2-byte prefix before the name may indicate the player's position in the civ array or a related index. Residual bytes from previously longer names may follow the null terminator (e.g., `"oln"` from overwriting `"Lincoln"` with `"Stubear"`).

To find the player name: search for the expected leader name from `LEADERS.TXT` for the player's civilization, or search for known player name strings.

#### Autosave Filename

The autosave produced when "Autosave each turn" is enabled is named `St_Auto.SAV`, saved to the game's installation directory.

### Section 4: Map Tile Data (fixed size: `num_tiles × 6` bytes)

Tile data consists of **6-byte records**, one per tile. The total number of tiles is `(map_width / 2) × map_height`. Tiles are stored row by row, with `map_width / 2` tiles per row (22 tiles per row for a 44-wide map).

**Finding the tile data offset**: The tile data offset varies between saves. Two approaches:

1. **From the end**: Calculate `EOF - 1807 - (num_cities × 88)` to find the end of the unit section. The tile data ends some distance before that.
2. **By scanning**: Search for a contiguous block of exactly `num_tiles × 6` bytes where `byte[0] & 0x0F` is always ≤ 10 (valid terrain) and the terrain distribution is realistic (ocean at 40–60%, at least 7 terrain types, no single land type exceeding ~25%). **Caution**: Blocks of zero bytes elsewhere in the file will appear as valid "Desert" (terrain ID 0) and produce false positives with high desert percentages (>50%). Reject candidates where any single terrain type exceeds 30% of tiles.

#### Tile Record Structure (6 bytes)

| Byte | Field | Encoding |
|------|-------|----------|
| 0 | Terrain type | Lower nibble (`& 0x0F`): terrain ID. Upper nibble: flags (river, special resource, etc.) |
| 1 | Improvements A | Roads, irrigation, mining, fortress, etc. |
| 2 | Improvements B | Additional improvement flags. |
| 3 | **Visibility / Territory bitmask** | **Each bit represents one civ slot. Bit N set = civ in slot N has explored this tile.** This is what the minimap uses to color territory. |
| 4 | City working / misc | Bit 5 (`0x20`) is a flag (possibly "being worked by a city"). Lower bits relate to which city is working the tile. |
| 5 | Continent / region | Encodes continent ID or territory region. Common values: `0xF0` (ocean), `0x50`, `0x30`, `0x20`, `0x24`, `0x52` (various land regions). |

These per-tile fields are confirmed by the network message types: `NM_TERRAIN_SET`, `NM_SEEN_SET`, `NM_OWNER_SET`, `NM_CITY_USING_SET`, `NM_REGION_SET`, `NM_FEATURE_SET`.

#### Terrain Type IDs

| ID | Terrain |
|----|---------|
| 0 | Desert |
| 1 | Plains |
| 2 | Grassland |
| 3 | Forest |
| 4 | Hills |
| 5 | Mountains |
| 6 | Tundra |
| 7 | Glacier |
| 8 | Swamp |
| 9 | Jungle |
| 10 | Ocean |

#### Territory / Visibility (Byte 3) — Key Finding

**This is the most important byte for territory visualization.** It is a bitmask where each bit represents one civilization slot:

```
Bit 0 = Civ slot 0 has explored/controls this tile
Bit 1 = Civ slot 1
Bit 2 = Civ slot 2
...
Bit 5 = Civ slot 5
```

The minimap colors each tile by the **highest bit set** — i.e., the last civ to explore it. For example, in a late-game save where one civ dominates:
- Most land tiles have only bit 0 set → the dominant civ (slot 0) controls nearly everything
- A handful of tiles have bit 2 or bit 3 set → minor surviving civs

For ocean tiles, multiple bits are commonly set (e.g., `0b00111111` = 63, meaning all 6 civs have sailed there).

**Civ slot ≠ owner ID in city records.** The slot is the position in the game's internal civ array (0–6 for 7 civs). The "owner" byte in city records uses a different numbering. Mapping between them requires cross-referencing city positions against tile visibility data.

### Isometric Coordinate System

Civ2 uses an **isometric diamond grid**:

- Map dimensions (e.g., 44×63) define the coordinate space.
- **Even rows** (0, 2, 4, ...) have tiles at even X positions: 0, 2, 4, ..., `width×2 − 2`
- **Odd rows** (1, 3, 5, ...) have tiles at odd X positions: 1, 3, 5, ..., `width×2 − 1`
- Each row stores `width / 2` tiles sequentially.
- Tile index in the data: `index = row × (width / 2) + col_within_row`
- City X coordinates range from 0 to `width × 2 − 1` (0–87 for a 44-wide map).
- City Y coordinates range from 0 to `height − 1` (0–62 for a 63-tall map).
- **The map wraps horizontally.** Column `(x // 2) % (width // 2)` gives the visual position.

For rendering, each tile is a **diamond** shape. Odd rows are offset horizontally by half a tile width.

### Section 5: Unit Records (variable size)

Located between the tile data and city records. The total number of units is stored at header offset `0x003A`. The exact **unit record size has not yet been determined** — it does not appear to be a simple fixed size. The section size varies across saves from ~4,700 to ~10,900 bytes. Further analysis (likely requiring comparison of saves before and after unit creation/deletion) is needed to establish the record format.

Community documentation (Catfish's Cave, for Test of Time) suggests unit records may be 26 or 32 bytes depending on game version, but this has not been confirmed for MGE.

### Section 6: City Records (`num_cities × 88` bytes)

City records are **88 bytes each**, stored contiguously. The total count is given by the uint16 at header offset `0x003C`. The city block can be located by:

1. **From the end**: `city_block_start = EOF - 1807 - (num_cities × 88)`
2. **By searching**: Scan for known capital city names (`Washington`, `Rome`, `London`, `Delhi`, `Kyoto`, `Moscow`, `Beijing`, `Zimbabwe`, etc.) which appear at the start of each 88-byte record.

#### City Record Structure (88 bytes)

| Offset | Size | Field |
|--------|------|-------|
| +0 | 16 bytes | City name, null-terminated ASCII. |
| +16 | 2 bytes | Unknown (possibly production/state flags). |
| +18 | 2 bytes | Unknown. |
| +20 | 1 byte | **City size** (population level). `0` = city destroyed/disbanded. |
| +21 | 1 byte | Unknown. |
| +52 | 1 byte | City ID (sequential, 1-based). |
| +56 | 1 byte | **X coordinate** (isometric, range 0 to `width × 2 − 1`). |
| +58 | 1 byte | **Y coordinate** (isometric, range 0 to `height − 1`). |
| +86 | 1 byte | **Current owner ID.** Identifies which civ currently controls this city. |

Notes:
- Cities with `size = 0` are destroyed or disbanded. They remain in the save as historical records. The city count at header offset `0x003C` includes these dead cities.
- Destroyed cities retain their `owner` byte, which reflects the **last known owner**, not necessarily the founding civilization.
- Cities at coordinates `(0, 0)` with nonsensical names (e.g., single character `"H"`) are likely dummy/invalid records.
- City records for destroyed cities can span the entire map — they are **not** reliable for computing current territorial control. Use the tile visibility bitmask instead.
- A city's "owner" ID is **not** the same as the civ slot number used in tile byte[3]. The relationship between owner IDs and slot numbers must be determined per-save.

### Section 7: Tail Data (1,807 bytes, fixed)

The final 1,807 bytes of every `.SAV` file contain post-city data. This section has been confirmed as **exactly 1,807 bytes** in all 5 saves analyzed (ranging from 16-city early-game to 43-city late-game saves of different sizes).

Contents include:
- Game completion/scoring data
- Tribe name strings (e.g., `"Aztecs"`, `"Mongols"`, `"Carthaginians"`, `"Sioux"`) — these appear to be the names of **eliminated civilizations**
- Possible wonder ownership data, spaceship status, or other endgame state
- A structured block with what appears to be technology cost progression tables

The tribe names found in the tail section provide a way to identify which civilizations were destroyed during the game.

### Tribe / Civilization Name

Tribe names appear in two places:
1. **In the tail section** (Section 7): Names of eliminated civilizations appear as null-terminated strings near the end of the file.
2. **In the civilization data** (Section 3): The player's tribe name may be stored near the player name field.

AI tribe names may be computed from `LEADERS.TXT` at runtime rather than stored explicitly in the save.

---

## CIV2.DAT — Runtime Configuration

Size: 516 bytes. Contains game session parameters.

| Offset | Content | Example |
|--------|---------|---------|
| 0x0004 | Difficulty or game parameter | `5` |
| 0x000A | Number of enemy civs | `6` (= 7 total with player) |
| 0x0060 | Player name (ASCII) | `"AmArA"` |
| 0x0080 | Second player slot? | `"cb"` |
| 0x00C0 | Local IP address (ASCII) | `"192.168.1.67"` |

---

## LEADERS.TXT — Civilization Definitions

Defines all 21 civilizations available in the game. Each line contains:

```
LeaderName, FemaleLeader, [3 AI values], TribeName, Adjective, [3 personality values], [optional government titles]
```

The 21 civilizations in order (0-indexed):

| Index | Tribe | Leader | Notable Cities |
|-------|-------|--------|----------------|
| 0 | Romans | Caesar / Livia | Rome, Veii, Cumae, Naples |
| 1 | Babylonians | Hammurabi / Ishtari | Babylon, Ur |
| 2 | Germans | Frederick / Maria Theresa | Berlin, Hamburg |
| 3 | Egyptians | Ramesses / Cleopatra | Thebes, Memphis |
| 4 | Americans | Abe Lincoln / E. Roosevelt | Washington, New York, Boston, Philadelphia, Atlanta, Chicago, etc. |
| 5 | Greeks | Alexander / Hippolyta | Athens, Sparta, Delphi |
| 6 | Indians | Mohandas Gandhi / Indira Gandhi | Delhi, Bombay, Madras, Bangalore, Calcutta, Lahore |
| 7 | Russians | Lenin / Catherine the Great | Moscow, St. Petersburg |
| 8 | Zulus | Shaka / Shakala | Zimbabwe, Ulundi, Isandhlwana, Bapedi, Intombe, Hlobane, Ngome, Mpondo |
| 9 | French | Louis XIV / Joan of Arc | Paris, Orleans, Lyons, Tours, Rheims |
| 10 | Aztecs | Montezuma / Nazca | Tenochtitlan |
| 11 | Chinese | Mao Tse Tung / Wu Zhao | Beijing |
| 12 | English | Henry VIII / Elizabeth I | London, York, Nottingham, Hastings, Canterbury, Coventry, Warwick, Newcastle |
| 13 | Mongols | Genghis Khan / Bortei | — |
| 14 | Celts | Cunobelin / Boadicea | Armagh, Cardiff, Carmarthen, Kells |
| 15 | Japanese | Tokugawa / Amaterasu | Kyoto, Osaka, Satsuma, Kagoshima, Edo |
| 16 | Vikings | Canute / Gunnhild | Kaupang, Trondheim, Uppsala, Hladir, Aarhus |
| 17 | Spanish | Philip II / Isabella | Madrid, Seville |
| 18 | Persians | Xerxes / Scheherezade | Persepolis |
| 19 | Carthaginians | Hannibal / Dido | — |
| 20 | Sioux | Sitting Bull / Sacajawea | — |

---

## Executable Analysis (civ2.exe)

### PE Header & Build Information

| Property | Value |
|----------|-------|
| Size | 2,489,344 bytes |
| Format | PE32 (GUI), Intel 80386 |
| Compiler | Microsoft Visual C++ (MSVC runtime linked) |
| Build timestamp | April 8, 1999 18:33:52 UTC |
| Entry point | `0x001f6e90` |
| Image base | `0x00400000` |
| Image size | 3,194,880 bytes (virtual) |
| Build path | `D:\Ss\Franklinton\` |
| Engine path | `D:\Ss\Smeds32\` |
| Product name | `Civilization II Multiplayer Gold Edition` |
| Publisher | `MicroProse Software` |
| Version string | `5.4.0f Multiplayer 26-March-99, Patch 3` |

### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Flags | Purpose |
|---------|-------------|-------------|----------|-------|---------|
| `.text` | `0x00001000` | 2,199,122 | 2,199,552 | CODE, EXEC, READ | Main game code |
| `ASMGRAF` | `0x0021a000` | 6,979 | 7,168 | CODE, EXEC, READ | Hand-written assembly graphics routines |
| `.rdata` | `0x0021c000` | 32,448 | 32,768 | INIT_DATA, READ | Read-only data (MSVC runtime strings) |
| `.data` | `0x00224000` | 797,548 | 100,352 | INIT_DATA, READ, WRITE | Game data (697 KB BSS/uninitialized) |
| `.idata` | `0x002e7000` | 11,253 | 11,264 | INIT_DATA, READ, WRITE | Import tables |
| `.rsrc` | `0x002ea000` | 20,328 | 20,480 | INIT_DATA, READ | Resources (icons, cursors, bitmaps) |
| `.reloc` | `0x002ef000` | 115,157 | 115,200 | INIT_DATA, READ | Relocation table |

### ASMGRAF Section — Hand-Written Assembly Graphics

The `ASMGRAF` section (6,979 bytes) contains **hand-written x86 assembly** routines for performance-critical graphics operations. Key characteristics:

- Uses 16/32-bit **mixed-mode** instructions (frequent `0x66` operand-size and `0x67` address-size prefixes), suggesting code ported from or compatible with 16-bit real-mode origins.
- Uses `ENTER` (`0xC8`) for stack frame setup instead of the standard `push ebp; mov ebp, esp` prologue — confirming hand-written rather than compiler-generated code.
- Approximately **66.9% padding** with `0xCC` (INT 3 / debug breakpoint) between functions, typical of debug-build assembly alignment.
- Contains roughly 13 functions (identified by RET instructions).
- Likely implements pixel blitting, scanline copying, and color manipulation operations where the C compiler's output was too slow for real-time rendering.

### Embedded Resources

| Type | Count | Details |
|------|-------|---------|
| Cursors | 19 | Custom mouse cursors (IDs 6–24), 308 bytes each |
| Cursor Groups | 19 | Grouped cursor definitions (IDs 500–530) |
| Icons | 5 | Application icons (IDs 1–5), 744 bytes each |
| Icon Groups | 5 | Grouped icon definitions |
| Bitmaps | 6 | Small UI bitmaps (IDs 301–306), ~616–630 bytes each |

All resources use language ID 1033 (English US).

### Imported DLLs & System Dependencies

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 106 | Core OS (file I/O, memory, threads, `GetPrivateProfileIntA` for INI files, `CreateMutexA` for single-instance enforcement) |
| `USER32.dll` | 100 | Windows GUI (windows, messages, cursors, menus, `SetWindowsHookExA` for input hooks) |
| `GDI32.dll` | 40 | Graphics (DIB sections, palettes, font rendering, `CreateDIBSection` for software rendering, `AnimatePalette` for color cycling) |
| `WINMM.dll` | 26 | Multimedia (wave audio, MIDI, CD audio via MCI, `sndPlaySoundA`, timer events) |
| `AVIFIL32.dll` | 14 | AVI video playback for wonder movies and cutscenes |
| `MSVFW32.dll` | 4 | Video for Windows (codec decompression via `ICLocate`/`ICClose`, `MCIWndCreateA`) |
| `DDRAW.dll` | 1 | DirectDraw (`DirectDrawCreate` — single entry point, rest via COM interfaces) |
| `ADVAPI32.dll` | 5 | Windows Registry (`RegCreateKeyExA`, `RegQueryValueExA`, etc.) |
| `comdlg32.dll` | 3 | Common dialogs (Open/Save file dialogs) |
| `COMCTL32.dll` | 1 | Common controls (ordinal #17 = `InitCommonControls`) |
| `XDaemon.dll` | 27 | Multiplayer networking (C++ mangled names, TCP/IP, IPX/SPX, modem, serial) |

### XDaemon.dll — Network Library (Deep Dive)

The XDaemon Communications Library is a standalone multiplayer networking middleware DLL developed by MicroProse Software, authored by **John C. O'Neill**. It abstracts multiple transport protocols behind a unified API for game networking.

#### Version & Build Information

| Property | Value |
|----------|-------|
| File version | 2.2.0.0 |
| Product version | 2.2.0.0 |
| Build timestamp | November 10, 1998, 16:29:15 UTC |
| Product name | XDAEMON Communications Module DLL |
| Internal name | XDAEMON |
| Copyright | Copyright © 1998 MicroProse Software |
| Author | John C. O'Neill |
| Self-reported version | v3.5.0 (in log output string `"10-Nov-1998"`) |
| Image base | `0x10000000` |
| Code size | 62,976 bytes |
| BSS size | ~46 KB (connection tables, socket buffers, state arrays) |

Note: The DLL reports itself as "v3.5.0" in log output (`XDaemon Communications Library v%d.%d.%d Online`), but the PE version resource says 2.2.0.0. The version returned by `XD_GetXDaemonVersion()` likely returns 3.5.0 via three separate `int*` parameters (major, minor, patch).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 62,950 | 62,976 | Executable code |
| `.rdata` | `0x00011000` | 6,147 | 6,656 | Read-only data, export table |
| `.data` | `0x00013000` | 60,700 | 14,336 | Global data (46 KB BSS) |
| `.idata` | `0x00022000` | 3,016 | 3,072 | Import tables |
| `.rsrc` | `0x00023000` | 928 | 1,024 | Version info resource |
| `.reloc` | `0x00024000` | 6,400 | 6,656 | Relocation table |

#### Complete Export Table (48 functions)

**Initialization & Shutdown:**

| # | Function | Signature |
|---|----------|-----------|
| 17 | `XD_InitializeModem` | `int (int modemIndex)` |
| 18 | `XD_InitializeSerial` | `int (int portIndex)` |
| 19 | `XD_InitializeSocketsIPXSPX` | `int (int, int, int, int, unsigned int, callback)` |
| 20 | `XD_InitializeSocketsTCP` | `int (int, int, int, int, unsigned int, callback)` |
| 27 | `XD_ResetLibrary` | `int ()` |
| 44 | `XD_ShutdownModem` | `void ()` |
| 45 | `XD_ShutdownSerial` | `void ()` |
| 46 | `XD_ShutdownSockets` | `void ()` |
| 47 | `XD_ShutdownTEN` | `void ()` |

**Connection Management:**

| # | Function | Signature |
|---|----------|-----------|
| 1 | `XD_ActivateServer` | `int ()` |
| 2 | `XD_CloseConnection` | `int ()` |
| 26 | `XD_OpenConnection` | `int (void* address, unsigned long timeout)` |
| 34 | `XD_ServerCloseConnection` | `int (unsigned short clientId)` |
| 48 | `XD_StopConnections` | `int ()` |

**Data Transfer:**

| # | Function | Signature |
|---|----------|-----------|
| 5 | `XD_FlushSendBuffer` | `int (unsigned long timeout)` |
| 16 | `XD_InFlushSendBuffer` | `int ()` — returns whether flush is in progress |
| 29 | `XD_SendBroadcastData` | `int (void* data, unsigned long size, long flags)` |
| 30 | `XD_SendDirectBroadcastData` | `int (void* dest, void* data, unsigned long size)` |
| 31 | `XD_SendPingRequest` | `int (unsigned short target, unsigned long data, callback)` |
| 32 | `XD_SendSecureData` | `int (unsigned short destId, void* data, unsigned long size, short priority)` |
| 33 | `XD_SendUDPBroadcastData` | `int (void* data, unsigned long size, long flags, const char* addr, int port)` |

**Callbacks (Event Registration):**

| # | Function | Signature |
|---|----------|-----------|
| 35 | `XD_SetBroadcastReceive` | `void (callback(void*, unsigned short, long))` |
| 37 | `XD_SetNewClientConnection` | `void (callback(unsigned short, unsigned short))` |
| 38 | `XD_SetOnClientConnectionToServer` | `void (callback(short))` |
| 39 | `XD_SetOnConnectionLost` | `void (callback(unsigned short))` |
| 40 | `XD_SetOnInvalidSendToSelf` | `void (callback(short))` |
| 41 | `XD_SetOversizedMessageCB` | `int (unsigned long maxSize, callback(unsigned long))` |
| 43 | `XD_SetSecureReceive` | `void (callback(unsigned short, void*, unsigned long, short))` |

**Query & Info:**

| # | Function | Signature |
|---|----------|-----------|
| 7 | `XD_GetConnectedSocketAddr` | `char* ()` |
| 8 | `XD_GetCurrentProtoAddr` | `char* (unsigned int adapterIndex, int protocol)` |
| 9 | `XD_GetCurrentProtocol` | `int ()` |
| 10 | `XD_GetLastError` | `const char* (int* errorCode)` |
| 11 | `XD_GetLoggedAddress` | `const char* (int index)` |
| 12 | `XD_GetModemName` | `const char* (int index)` |
| 13 | `XD_GetNumEnumeratedAdapters` | `int (int protocol)` |
| 14 | `XD_GetNumModems` | `int ()` |
| 15 | `XD_GetXDaemonVersion` | `int (int* major, int* minor, int* patch)` |
| 25 | `XD_LookupErrorCode` | `const char* (int code)` |
| 28 | `XD_SelectModem` | `int (int index)` |

**IGZ Lobby Integration:**

| # | Function | Signature |
|---|----------|-----------|
| 21 | `XD_LaunchZone` | `int (char* url)` — opens IGZ in browser via `ShellExecuteA` |
| 22 | `XD_LaunchedByLobby` | `int (void* hInstance, LobbyLaunchInfo* info)` |
| 23 | `XD_LobbyClose` | `void ()` |
| 24 | `XD_LobbySendMessage` | `int (unsigned long messageType)` |

**Debug/Testing (not used by game in normal operation):**

| # | Function | Signature |
|---|----------|-----------|
| 3 | `XD_EnableDebugFunctions` | `int (int enable)` |
| 4 | `XD_EnableServerLocator` | `int (int enable, unsigned int port)` |
| 6 | `XD_GeneratePortNoise` | `int (int port, short rate, short delta)` — generate noise for testing |
| 36 | `XD_SetDebugPacketDropRate` | `int (int dropRate, int seed)` — simulate packet loss |
| 42 | `XD_SetPacketDelay` | `int (int delay, int variance)` — simulate latency |

#### Imported DLLs

| DLL | Functions | Purpose |
|-----|-----------|---------|
| `KERNEL32.dll` | 77 | Core OS: threads (`CreateThread`, `ExitThread`), synchronization (`WaitForMultipleObjects`, `CreateEventA`, `CriticalSection`), memory, file I/O, TLS |
| `USER32.dll` | 15 | Hidden message windows for async socket events (`CreateWindowExA`, `PeekMessageA`, `SetTimer`, `KillTimer`) |
| `WSOCK32.dll` | 23 | Winsock 1.1 networking (see below) |
| `DPLAYX.dll` | 3 | DirectPlay for modem/serial (`DirectPlayCreate`, `DirectPlayEnumerateA`, `DirectPlayLobbyCreateA`) |
| `ole32.dll` | 3 | COM initialization for DirectPlay (`CoInitialize`, `CoUninitialize`, `CoCreateInstance`) |
| `SHELL32.dll` | 1 | `ShellExecuteA` — launches IGZ lobby URL in browser |
| `ADVAPI32.dll` | 5 | Windows Registry for storing network settings |

#### Winsock Functions Used (WSOCK32.dll)

| Ordinal | Function | Purpose |
|---------|----------|---------|
| #1 | `accept` | Accept incoming TCP connections |
| #2 | `bind` | Bind socket to local address/port |
| #3 | `closesocket` | Close a socket |
| #4 | `connect` | Initiate TCP connection to server |
| #5 | `getpeername` | Get address of connected peer |
| #6 | `getsockname` | Get local socket address |
| #7 | `getsockopt` | Query socket options |
| #9 | `listen` | Listen for incoming connections |
| #10 | `ntohl` | Network-to-host byte order (32-bit) |
| #11 | `ntohs` | Network-to-host byte order (16-bit) |
| #13 | `recv` | Receive data from connected socket |
| #16 | `sendto` | Send data to specific address (UDP) |
| #17 | `setsockopt` | Set socket options (broadcast enable, address reuse) |
| #19 | `socket` | Create a new socket |
| #20 | `gethostbyaddr` | Reverse DNS lookup |
| #21 | `gethostbyname` | DNS hostname resolution |
| #22 | `gethostname` | Get local hostname |
| #23 | `WSAGetLastError` | Get last Winsock error code |
| #52 | `WSAStartup` | Initialize Winsock library |
| #57 | `WSACleanup` | Shutdown Winsock library |
| #101 | `WSAAsyncSelect` | Register async socket event notifications (FD_CONNECT, FD_CLOSE, etc.) |
| #111 | `WSARecvEx` | Extended receive with partial message detection |

#### Internal Architecture

**"QuickSocket" Abstraction Layer**: XDaemon wraps Winsock with an internal "QuickSocket" system that provides:
- Numbered socket instances (`ReallyQuickSocket-%d` windows)
- Automatic async event handling via hidden Windows message windows
- Per-socket receive buffers with size tracking
- Socket reinitialization support (`[Reinit]` operations)
- Oversize message detection with configurable callback

**Dual Transport Model**:
- **TCP/IP and IPX/SPX**: Handled natively via Winsock with QuickSocket abstraction
- **Modem and Serial**: Delegated to DirectPlay (`DPLAYX.dll`) which provides the transport, with XDaemon wrapping the DirectPlay session in its own API

**Connection Architecture**:
- Server-client model with connection IDs (server always ID 0)
- Broadcast channel for discovery (`XD_SendBroadcastData`)
- Secure (reliable) channel for game data (`XD_SendSecureData` with priority levels)
- UDP broadcast for LAN server discovery (`XD_SendUDPBroadcastData`)
- Ping protocol using `"XDPING"` magic string for latency measurement

**Threading**: Uses `CreateThread` and `WaitForMultipleObjects` for asynchronous operations, with `CriticalSection` for thread safety. Events (`CreateEventA`, `SetEvent`) coordinate async socket operations.

**Message Processing**: Uses Windows message pumping (`PeekMessageA`, `TranslateMessage`, `DispatchMessageA`) on hidden windows to receive Winsock async notifications (`FD_CONNECT`, `FD_CLOSE`, etc.). Timer-based polling (`SetTimer`, `KillTimer`) drives periodic operations.

#### IGZ (Internet Gaming Zone) Lobby Protocol

The library integrates with Microsoft's Internet Gaming Zone (IGZ) lobby system:
- `XD_LaunchedByLobby` checks if the game was launched from the IGZ lobby, fills a `LobbyLaunchInfo` structure
- `XD_LobbySendMessage` sends status messages back to the lobby (`DPLSYS_CONNECTIONSETTINGSREAD`, `DPLSYS_DPLAYCONNECTSUCCEEDED`, `DPLSYS_DPLAYCONNECTFAILED`)
- `XD_LaunchZone` opens the IGZ website in the default browser via `ShellExecuteA`
- DirectPlay Lobby interface (`DirectPlayLobbyCreateA`) provides the connection bridge

**LobbyLaunchInfo Structure** (from civ2.exe string analysis):
```
struct LobbyLaunchInfo {
    char IPAddr[32];        // IP address of server
    char LongName[64];      // Full game description
    char ShortName[32];     // Short game name
    char SessionName[64];   // Session identifier
    int  bHost;             // 1 = this instance is hosting
};
```

#### Error Code Table

| Code | Name | Meaning |
|------|------|---------|
| 0 | `XD_SUCCESS` | Operation completed successfully |
| — | `XDERR_NOTINITIALIZE` | Library has not been initialized |
| — | `XDERR_NULLSOCKET` | Socket reference is null |
| — | `XDERR_CANTREINITIALIZE` | Cannot reinitialize while active |
| — | `XDERR_FAILEDINIT` | Initialization procedure failed |
| — | `XDERR_SERVERFUNCTIONONLY` | Function requires server role |
| — | `XDERR_CLIENTFUNCTIONONLY` | Function requires client role |
| — | `XDERR_NOSERVERFOUND` | Server discovery found nothing |
| — | `XDERR_BADPARAMETERS` | Invalid parameters passed |
| — | `XDERR_CANNOTCONNECT` | Connection could not be established |
| — | `XDERR_TOOMANYUSERS` | Maximum player count reached |
| — | `XDERR_DISABLEDFEATURE` | Requested feature is disabled |
| — | `XDERR_FAILEDSEND` | Data transmission failed |
| — | `XDERR_WRONGMODE` | Operation invalid for current transport mode |
| — | `XDERR_NOCONNECTCB` | No connection callback has been registered |
| — | `XDERR_NOTSUPPORTED` | Feature not supported on this platform |
| — | `XDERR_UNKNOWNERROR` | Unclassified error |

Lobby-specific errors: `XLOBBYERR_NOTLOBBIED` (not launched from lobby), `XLOBBYERR_UNKNOWN` (unknown lobby error).

#### DirectPlay (Modem/Serial) Integration

For modem and serial connections, XDaemon delegates to Microsoft DirectPlay:

- Enumerates modems via `DirectPlayEnumerateA`
- Creates a DirectPlay interface via `DirectPlayCreate`
- Initializes COM (`CoInitialize`) for DirectPlay object creation
- Handles modem-specific errors: `DPERR_SENDTOOBIG`, `DPERR_NOTLOGGEDIN`, `DPERR_INVALIDPLAYER`, `DPERR_INVALIDPARAMS`, `DPERR_BUSY`
- Connection flow: `XDaemonModemClass` window → modem enumeration → session search → join or host → player ID exchange

The serial path is similar but bypasses modem enumeration, connecting directly through the COM port.

#### Registry Usage

XDaemon modifies Windows Internet settings to facilitate network games:

| Registry Path | Key | Purpose |
|---------------|-----|---------|
| `Software\MicroProse Software\XDaemonNet` | `ModifiedNet` | Flag: whether Internet settings were modified |
| `Software\MicroProse Software\XDaemonNet` | `OldSetting` | Backup of original `EnableAutodial` value |
| `...\Windows\CurrentVersion\Internet Settings` | `EnableAutodial` | Disables auto-dial during LAN games to prevent unwanted modem connections |

The library saves the original `EnableAutodial` setting before modifying it and stores the backup in its own registry key for restoration on shutdown.

#### Internal Window Classes

| Window Class | Purpose |
|-------------|---------|
| `QSocketWndClass` | Winsock async event receiver window |
| `StreamWindowClass` | Stream data handling for reliable transport |
| `ReallyQuickSocket-%d` | Per-socket instance message windows (numbered) |
| `XDSControlWindow-%d` | Control/management windows (numbered) |
| `XDaemonModemClass` | Modem connection management window |
| `XDSModemControlWindow` | Modem control interface window |
| `LikeSearchOrSomething` | Server search window (quirky developer name) |
| `ServerSearchWindow` | Server locator/broadcast listener window |

#### Logging System

XDaemon logs to `XDaemon.log` with timestamped entries:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
 Log file created and opened, HH:MM:SS on D-M-YYYY
(tick_count) log_message
```

Each log entry is prefixed with a tick count (milliseconds). The library logs all connection events, errors, socket operations, and protocol state changes. Log entries prefixed with `[Reinit]`, `[Modem]`, `[Serial]`, or `DPlay>` indicate subsystem-specific operations.

#### IPX Address Format

For IPX/SPX networking, addresses are displayed as: `NNNNNNNN:MMMMMMMMMMMM` where `N` = 4-byte network number and `M` = 6-byte node (MAC) address, both in hexadecimal. Adapter enumeration logs each network adapter with its full IPX address.

### Civ2Art.dll — Embedded Art Resource Container (Deep Dive)

Civ2Art.dll is a resource-only DLL that serves as a container for embedded GIF artwork used in the game's credits sequence and UI. Despite having 99 KB of code, it contains no meaningful game logic — the entire code section is statically linked MSVC **debug** C runtime.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:14 UTC |
| File version | None (no VERSION_INFO resource) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (~97 KB, virtually all CRT) |
| Resource size | 126,537 bytes (~124 KB) |
| Total file size | 256,512 bytes (250 KB) |
| Compiler | MSVC 5.0 or 6.0 (debug build) |

**Build date significance**: This DLL was built April 21, 1997 — almost two years before the MGE executable (April 8, 1999) and over a year before XDaemon.dll (November 10, 1998). It was carried forward unchanged from the original Civilization II or Fantastic Worlds expansion into the Multiplayer Gold Edition.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (statically linked debug CRT) |
| `.rdata` | `0x0001a000` | 7,640 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data (5.6 KB BSS) |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 126,537 | 126,976 | **GIF image resources** |
| `.reloc` | `0x00041000` | 5,096 | 5,120 | Relocation table |

#### Exports

The DLL exports exactly **one function**:

```
#1: _DllMain@12  (stdcall, 3 parameters)
```

Disassembly of `_DllMain@12`:
```asm
push ebp          ; standard prologue
mov  ebp, esp
push ebx / esi / edi
mov  eax, 1       ; return TRUE (always succeeds)
pop  edi / esi / ebx
leave
ret  12           ; stdcall cleanup (hinstDLL, fdwReason, lpvReserved)
```

This is a trivial DllMain that always returns `TRUE`. The DLL exists **purely as a resource container** — it has no functional code beyond the C runtime startup wrapper.

#### Imports

Only **KERNEL32.dll** (70 functions) — all standard MSVC C runtime dependencies. No graphics, UI, or game-related imports whatsoever.

Notable: The DLL was compiled with the **debug** C runtime statically linked, evidenced by:
- `"Detected memory leaks!"` string
- `"Dumping objects ->"` / `"Object dump complete."` 
- `"Bad memory block found at 0x%08X"` 
- `"DAMAGED"` diagnostic marker
- Full debug heap validation, assertion checking, and allocation tracking
- `"IsTNT"` Citrix check (MSVC 5.0/6.0 CRT signature)

This debug CRT accounts for ~95 KB of the 97 KB code section. The shipping product includes debug instrumentation — likely an oversight where the release build was not recompiled with the release CRT before final packaging.

#### Embedded GIF Resources

All resources use a custom resource type string `"GIFS"` (not a standard Windows resource type). All images are GIF87a format with 256-color palettes. Language ID: 1033 (English US).

| Resource ID | Dimensions | Size | Content |
|-------------|-----------|------|---------|
| **999** | 74×74 | 1,607 bytes | Gray UI panel — 8 shades of gray (palette indices 22–30, 110). Light gray rounded square used as a dialog/panel background element. **23 cross-references** in civ2.exe — the most heavily used resource. |
| **1000** | 640×240 | 10,658 bytes | Credits text overlay — golden text on transparent black: "Producer: Jeffery L. Briggs", "Game Design: Brian Reynolds", "Art Director: Michael Haire", "Original Civilization Design: Sid Meier with Bruce Shelley". 73 unique colors, 92.4% background. |
| **2000** | 640×240 | 3,665 bytes | Sparse starfield — nearly all black with a few scattered white dots. Base layer for scrolling credits. Only 3 unique colors. **5 cross-references** in civ2.exe. |
| **4000** | 640×240 | 84,018 bytes | **Main credits artwork** — Mesoamerican stone relief scene: a Mayan/Aztec warrior figure carved in stone alongside a map/codex element. Warm earth tones (browns, golds, tans). 255 unique colors. The largest resource at 82 KB. |
| **30000** | 640×240 | 4,770 bytes | Dense starfield — black background with many white star dots. Alternative/supplementary starfield layer, possibly for space victory or layered credits parallax. 18 unique colors. |

Total embedded art: **104,718 bytes** (~102 KB) across 5 GIF images.

#### How civ2.exe Loads Resources

The game dynamically loads Civ2Art.dll at runtime (it is **not** in the PE import table):

1. **Path construction**: Builds `"civ2\\civ2art.dll"` relative path (stored at VA `0x0062AF18` in .data)
2. **Dynamic loading**: `LoadLibraryA("civ2\\civ2art.dll")` → returns `HMODULE`
3. **Resource extraction**: `FindResourceA(hModule, MAKEINTRESOURCE(id), "GIFS")` → `HRSRC`
4. **Memory mapping**: `LoadResource(hModule, hRsrc)` → `HGLOBAL`, then `LockResource(hGlobal)` → pointer to raw GIF bytes
5. **Cleanup**: `FreeResource(hGlobal)` after use

The game imports `FindResourceA`, `LoadResource`, `LockResource`, and `FreeResource` from KERNEL32.dll for this purpose.

#### Cross-Reference Counts (from civ2.exe)

| Resource ID | Push Count | Likely Usage |
|-------------|-----------|-------------|
| 999 | 23 | Dialog backgrounds, UI panels (used throughout game) |
| 1000 | 2 | Credits screen text overlay |
| 2000 | 5 | Starfield layer (credits, possibly space screens) |
| 4000 | 2 | Credits artwork display |
| 30000 | 3 | Dense starfield layer |

Resource #999 (the gray panel) is referenced 23 times, suggesting it serves as a standard background element for multiple dialog windows and UI panels throughout the game.

#### Why a DLL for Art?

Packaging art in a DLL rather than loose files serves several purposes:
- **Single-file distribution**: Credits artwork travels as one file rather than 5 separate GIFs
- **Resource protection**: Slightly harder for users to casually modify credits/attribution
- **Clean directory**: Keeps the game directory uncluttered with internal art files
- **Windows resource API**: Leverages the standard `FindResource`/`LoadResource` API for efficient memory-mapped access

### Tiles.dll — Embedded Tile & UI Art Container (Deep Dive)

Tiles.dll is the largest DLL in the game at 1.38 MB, serving as a resource container for 24 GIF images used as tile backgrounds, sprite sheets, UI artwork, and historical illustrations. It is an **identical twin** of Civ2Art.dll in code — the `.text` and `.data` sections match byte-for-byte (100%).

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:13:31 UTC |
| File size | 1,416,704 bytes (1,383 KB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (identical to Civ2Art.dll) |
| Resource size | 1,283,136 bytes (~1.22 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build date**: Built 43 seconds before Civ2Art.dll (18:13:31 vs 18:13:14 UTC), confirming they were compiled in the same build session from the same source project — likely a template resource DLL project where only the `.rsrc` section content differs.

**Code identity**: `.text` section is 100.0% byte-identical to Civ2Art.dll. `.data` section is 100.0% identical. `.rdata` differs by only 34 bytes (0.4%) — solely the DLL name string `"Tiles.dll"` vs `"Civ2Art.dll"` in the export directory. Same trivial `_DllMain@12` (return TRUE), same debug CRT, same imports (KERNEL32.dll only, 70 functions).

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll) |
| `.rdata` | `0x0001a000` | 7,638 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 1,283,136 | 1,283,584 | **GIF image resources (1.22 MB)** |
| `.reloc` | `0x0015c000` | 8,209 | 8,704 | Relocation table |

#### Embedded GIF Resources (24 total)

All resources use the custom `"GIFS"` resource type. All are GIF87a format, language ID 1033 (English US).

**Full-Screen Backgrounds (640×480) — Civilization Tile Art (#50–#66)**

These images use a distinctive red (RGB ~255,0,0) region as a transparency/chroma-key area, indicating the portions of each background that should be masked out when composited in-game. The visible artwork area varies per image.

| ID | Size | Content Description |
|----|------|-------------------|
| **50** | 80,447 | Church of the Holy Sepulchre, Jerusalem — domed religious architecture, stone buildings. Warm gray tones. |
| **51** | 56,941 | Conquistadors on horseback — world map background with mounted warriors in period armor. Gray/engraving style. |
| **52** | 51,675 | Byzantine/Medieval emperor — robed standing figure on world map background. Similar style to #51. |
| **53** | 52,730 | World map with historical figure — same base map, different overlaid character illustration. |
| **54** | 55,416 | World map with historical figure — continuation of the map/figure series. |
| **55** | 53,202 | World map with historical figure — continuation of the map/figure series. |
| **56** | 30,694 | Stonehenge — ancient stone monument photograph. Gray-scale. Smallest of the 640×480 backgrounds. |
| **57** | 47,584 | City fireworks celebration — modern cityscape at night with fireworks over waterfront. |
| **58** | 76,492 | Egyptian wall painting — ancient workers/artisans in traditional Egyptian art style. |
| **59** | 47,139 | Classical Greek/Roman column capital — Ionic column detail against mountain landscape. |
| **65** | 23,724 | Royal crown on world map — imperial/monarchy themed, smaller visible area (most area is red chroma key). |
| **66** | 45,681 | World map with royal crown — similar to #65, larger visible map area with crown in top-right. |

**Historical Illustrations (#70–#77) — Civilopedia/Event Art**

These are smaller, irregularly-sized images used in the Civilopedia encyclopedia entries and game event popups.

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **70** | 270×189 | 32,190 | Roman soldiers marching — engraving of armored troops before classical temple/forum. |
| **71** | 145×257 | 17,519 | Military parade formation — massed soldiers in ranks receding into distance. WWII era. |
| **72** | 261×194 | 27,653 | Storming of the Bastille — French Revolution engraving showing fortress under siege. |
| **73** | 230×198 | 23,147 | Solidarity protest — "Solidarność" banner visible, 1980s Polish labor movement. |
| **74** | 277×148 | 30,384 | Medieval Islamic art — illuminated manuscript style, mounted warrior with golden sun. |
| **75** | 178×262 | 35,058 | Ticker-tape parade — aerial view of American flags and crowds filling city street. |
| **76** | 290×176 | 18,175 | Pioneer wagon train — covered wagons with oxen crossing frontier landscape. |
| **77** | 197×294 | 19,010 | Construction crane — modern yellow tower crane against blue sky. |

**Sprite Sheets & UI Art (#85–#95)**

| ID | Dimensions | Size | Content Description |
|----|-----------|------|-------------------|
| **85** | 640×480 | 21,611 | **Nuclear explosion sprite sheet** — 12-frame animation sequence (6×2 grid) showing mushroom cloud from initial flash through expanding fireball to dissipation. Magenta borders separate frames. Used for nuclear attack animation. |
| **86** | 640×480 | 41,213 | **Government & diplomacy icon sheet** — Sprite atlas containing: government type icons (Anarchy Ω, Despotism ★, Monarchy ∞, Communism ☭, Republic, Democracy ψ) in both 3D rendered and flat styles; treaty state icons (Cease Fire, Peace, War, Old Alliance, Modern Alliance) with a bronze/silver coin; and diplomatic relation icons. Cyan background = chroma key. Labels: "GOVT ICONS", "TUTORIAL ICON HERE", "DIPLO BACK TILE HERE". |
| **90** | 530×480 | 80,029 | **Civilization II seal** — "IN OMNIA PARATUS" motto with classical allegorical figure (Athena/Minerva) holding staff, seated with shield, scroll, and bust of a philosopher. Ornamental circular border. Sepia tones. Used for title screen and Hall of Fame. |
| **95** | 640×480 | 99,889 | Medieval cavalry procession — detailed engraving of armored knights on horseback with banners and plumed helmets. Gray/sepia tones. Background art for high score or victory screen. |

#### Resource Loading

The game loads `TILES.DLL` by name (stored at exe offset `0x224ED4`), positioned near other art file references (`EDITORSQ.GIF`, `scredits.gif`). Like Civ2Art.dll, it is loaded dynamically via `LoadLibraryA` and resources are extracted via `FindResourceA`/`LoadResource`/`LockResource` using the `"GIFS"` type string and integer resource IDs.

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 24 |
| Total image data | 1,067,603 bytes (1,042 KB) |
| Full-screen backgrounds (640×480) | 14 images |
| Historical illustrations (mixed sizes) | 8 images |
| Sprite sheets / UI art | 2 images |
| Seal/title art | 1 image (530×480) |
| Large background art | 1 image (640×480) |
| Resource overhead (directory, CRT, PE) | ~349 KB (25% of file) |

### cv.dll — City View Art Container (Deep Dive)

cv.dll is the largest DLL in the game at 4.75 MB, containing all isometric 3D-rendered artwork for the City View screen — the detailed city display that shows buildings, wonders, and landscape. The name "cv" stands for **City View**. Like its sibling DLLs, it is a resource-only container with identical code to Civ2Art.dll and Tiles.dll.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:14:02 UTC |
| File size | 4,980,224 bytes (4.75 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 4,837,384 bytes (4.61 MB) |
| Compiler | MSVC 5.0/6.0 (debug build, statically linked CRT) |

**Build timing**: Built 31 seconds after Tiles.dll and 12 seconds before Civ2Art.dll in the same April 21, 1997 build session. All three DLLs share byte-identical `.text` and `.data` sections.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to Civ2Art.dll/Tiles.dll) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 4,837,384 | 4,837,888 | **GIF image resources (4.61 MB)** |
| `.reloc` | `0x004c0000` | 17,757 | 17,920 | Relocation table |

#### Embedded GIF Resources (16 total, 3.84 MB image data)

All resources use the custom `"GIFS"` resource type. All are GIF87a format. The game loads `cv.dll` by name (stored at exe offset `0x225A08`, near diplomacy-related strings like `"GREETINGS"`, `"NUCLEARWEAPONS"`, `"YOURNUKES"`).

**City Improvement Building Sprites (#300)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **300** | 740×710 | 150,543 | **Building sprite sheet** — ~45 isometric 3D-rendered city improvement sprites in a 5×9 grid (cells ~124×83px). Includes: aqueduct, barracks, cathedral, colosseum, factory, marketplace, library, university, nuclear plant, airport, stock exchange, harbor, offshore platform, city walls, SDI defense, submarine pens, and more. Green/magenta borders mark sprite boundaries and chroma-key regions. |

**Wonder & Landmark Sprites (#305)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **305** | 640×1130 | 220,281 | **Wonder of the World sprite sheet** — ~30+ isometric wonder sprites in a variable grid. Includes: Apollo Program (rocket), Great Wall (panoramic, 2-cell wide), Pyramids, Hoover Dam, Eiffel Tower, Statue of Liberty (multiple angles/sizes), lighthouse, Shakespeare's Theatre, Darwin's Voyage statue, Women's Suffrage, United Nations, SETI dish, and more. Bottom section has extra-large sprites for Great Wall panorama and oversized wonders. |

**City Growth Vegetation (#310)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **310** | 640×680 | 148,196 | **Vegetation/population sprite sheet** — ~30 tree/forest cluster sprites in a 6×5 grid. Shows progressive city growth: from sparse trees (small population) to dense canopy with village buildings emerging underneath, then larger medieval/modern buildings visible through foliage. Each row appears to represent a different population density level. Green/magenta chroma key borders. |

**City View Landscape Panoramas (#340–#353)**

The core of cv.dll: 12 wide-format landscape backgrounds for the City View screen. Organized as **3 terrain types × 4 era variants**:

| Series | Terrain Type | Dimensions | Water Coverage | Avg Size |
|--------|-------------|-----------|----------------|----------|
| **#340–343** | **Coastal** (ocean shoreline) | 1280×480 | ~4.2% | 284 KB |
| **#345–348** | **Bay/Inlet** (sheltered water) | 1280×480 | ~1.4% | 294 KB |
| **#350–353** | **Inland** (all land, no water) | 1280×480 | 0.0% | 300 KB |

Within each terrain type, the 4 variants show subtle differences (3–8% pixel change between first and last):
- **Greenness decreases progressively** across variants: 53.7 → 51.7 → 50.8 → 49.0 (coastal series)
- **Brightness shifts slightly** between variants
- Changes are distributed uniformly across the image (not concentrated in any region)
- These likely represent **4 civilization eras** (Ancient → Classical → Industrial → Modern), matching the City View's era-dependent appearance

The base ID (#340) has 138 `mov` register references in civ2.exe, confirming it's the computed base value with offsets +0, +1, +2, +3 for era selection.

| ID | Size | Variant |
|----|------|---------|
| 340 | 283,683 | Coastal — Era 1 (most green/natural) |
| 341 | 288,322 | Coastal — Era 2 |
| 342 | 282,218 | Coastal — Era 3 |
| 343 | 281,379 | Coastal — Era 4 (least green) |
| 345 | 293,736 | Bay — Era 1 |
| 346 | 298,874 | Bay — Era 2 |
| 347 | 291,578 | Bay — Era 3 |
| 348 | 291,760 | Bay — Era 4 |
| 350 | 298,250 | Inland — Era 1 |
| 351 | 305,241 | Inland — Era 2 |
| 352 | 295,893 | Inland — Era 3 |
| 353 | 299,006 | Inland — Era 4 |

**Test Resource (#399)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **399** | 32×32 | 914 | Developer test image — gray square with the word "TEST" and a cursor icon. Placeholder/debug resource left in the shipping build. |

#### Summary Statistics

| Metric | Value |
|--------|-------|
| Total GIF resources | 16 |
| Total image data | 4,029,874 bytes (3.84 MB) |
| Landscape panoramas | 12 images (3.41 MB, 85% of data) |
| Sprite sheets | 3 images (519 KB) |
| Test/debug | 1 image (914 bytes) |
| Panorama width | 1280px (2× game resolution for scrolling) |
| Chroma key colors | Magenta (255,0,255), Green (0,255,0) |

#### The Resource-Only DLL Family

All eight art DLLs share identical code (.text section) and were built within 98 seconds of each other on April 21, 1997:

| Property | mk | Wonder | Tiles | ss | pv | cv | Civ2Art | Intro |
|----------|-----|--------|-------|-----|-----|-----|---------|-------|
| Build time | 12:44 | 13:13 | 13:31 | 13:40 | 13:51 | 14:02 | 14:14 | 14:22 |
| Resource types | GIFS+CTAB | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS | GIFS |
| Image count | 56+21 | 28 | 24 | 46 | 55 | 16 | 5 | 13 |
| Image data | 2.52 MB | 44 KB | 1.04 MB | 1.05 MB | 1.48 MB | 3.84 MB | 102 KB | 828 KB |
| **Total file** | **3.02 MB** | **182 KB** | **1.38 MB** | **1.39 MB** | **1.91 MB** | **4.75 MB** | **250 KB** | **1.10 MB** |

### mk.dll — Diplomacy & Leader Art Container (Deep Dive)

mk.dll is the diplomacy and leader portrait art container at 3.02 MB. The name likely stands for **"Make King"** or **"Monarch"**, reflecting its primary content: civilization leader portraits for the diplomacy screen. Unlike the other resource DLLs, mk.dll contains **two** custom resource types: `"GIFS"` for images and `"CTAB"` for color palettes.

#### Version & Build Information

| Property | Value |
|----------|-------|
| Build timestamp | April 21, 1997, 18:12:44 UTC |
| File size | 3,165,696 bytes (3.02 MB) |
| Image base | `0x10000000` |
| Code size | 99,328 bytes (100% identical to Civ2Art.dll) |
| Resource size | 3,027,947 bytes (2.89 MB) |

**Build timing**: The earliest of the four resource DLLs (47 seconds before Tiles.dll). Same byte-identical `.text`/`.data` sections, same debug CRT, same trivial `_DllMain@12`.

#### PE Sections

| Section | Virtual Addr | Virtual Size | Raw Size | Purpose |
|---------|-------------|-------------|----------|---------|
| `.text` | `0x00001000` | 98,823 | 99,328 | Code (identical to siblings) |
| `.rdata` | `0x0001a000` | 7,634 | 7,680 | Read-only data |
| `.data` | `0x0001c000` | 18,536 | 12,800 | Global data |
| `.idata` | `0x00021000` | 2,461 | 2,560 | Import table |
| `.rsrc` | `0x00022000` | 3,027,947 | 3,027,968 | **GIFS + CTAB resources (2.89 MB)** |
| `.reloc` | `0x00306000` | 12,895 | 13,312 | Relocation table |

#### Resource Type: CTAB — Color Palettes (21 resources)

A custom resource type unique to mk.dll. Each CTAB is exactly **773 bytes**: a 5-byte header followed by a 256-entry RGB color palette.

**CTAB Format:**
```
Offset 0-3:  00 00 00 00  (4-byte zero header)
Offset 4:    FF           (0xFF = 255, palette entry count marker)
Offset 5-772: 256 × RGB triplets (3 bytes each = 768 bytes)
```

| Resource IDs | Count | Purpose |
|-------------|-------|---------|
| #1000–#1020 | 21 | One custom color palette per civilization |

Each CTAB represents a **civilization-specific color palette** used to re-colorize the diplomacy screen elements (throne room, UI borders, leader portrait frame) to match the civilization's national colors. Palettes differ by ~38–54% of entries from each other, with the largest differences occurring at transitions between civilization art style groups. CTABs #1016 and #1017 are identical (likely two civs sharing the same palette).

**Palette structure** (from CTAB #1000):
- Indices 0–10: Standard Windows system colors (black, dark primaries, grays)
- Indices 11–40: Grayscale ramp (30 shades from near-black to white)
- Indices 41: Pure white
- Indices 42–106: Bright green `(4,255,4)` — chroma key / unused slots
- Indices 107–245: Civilization-specific colors (warm earth tones, skin tones, fabric colors, architectural hues)
- Indices 246–255: Standard Windows system colors (red, green, yellow, blue, magenta, cyan)

#### Resource Type: GIFS — Images (56 resources)

**Throne Room Backgrounds (#200–#206)**

Seven 640×480 full-screen backgrounds for the throne room screen. Each shows a stone wall interior with ornate window frames bearing the omega (Ω) symbol (representing the default/Anarchy government type). Different backgrounds correspond to different government types, providing the base layer upon which throne room decorations are composited.

| ID | Size | Content |
|----|------|---------|
| **200** | 127,061 | Throne room base — stone walls, two Ω-frame windows, magenta status bar area |
| **201** | 127,061 | Throne room variant (identical size to #200) |
| **202** | 122,882 | Throne room variant |
| **203** | 122,882 | Throne room variant (identical size to #202) |
| **204** | 129,316 | Throne room variant |
| **205** | 128,514 | Throne room variant |
| **206** | 124,705 | Throne room variant |

**Throne Room Decoration Sprites (#210–#211)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **210** | 638×334 | 68,875 | Throne room furniture/decoration sprite sheet — multiple decoration items arranged in a grid with magenta separators. Shows seated figure variations and ornamental objects. |
| **211** | 638×334 | 68,962 | Additional throne room decoration sprites — continuation of the decoration set. |

**Military Unit Buttons (#215)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **215** | 640×480 | 29,312 | Military unit type icon buttons — small button sprites in 4 color variants (gray/default, gold/active, blue/selected, silver/disabled). Each button shows a unit type symbol. Used in the military advisor and unit selection UI. Mostly magenta (chroma key) background. |

**Civilization Leader Portraits (#220–#261)**

The crown jewels of mk.dll: **42 leader portraits** at 227×277 pixels each, one for each civilization's two leaders (typically a male and female variant). Each portrait is a detailed artistic rendering in the visual style of the civilization it represents.

All portraits use cyan `(0,255,255)` as the chroma-key background color.

| ID Range | Count | Content |
|----------|-------|---------|
| **220–261** | 42 | 21 civilizations × 2 leader portraits each |

The portraits are rendered in diverse historical art styles — Roman mosaic medallions, Egyptian tomb paintings, medieval illuminated manuscripts, Aztec codex illustrations, Chinese ink paintings, photographic sepia portraits, and more. Each pair of portraits for a civilization uses a consistent artistic style matching that culture's visual tradition.

Total portrait data: ~1.25 MB (49% of all image data in the DLL).

**Small Icon Sheet (#299)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **299** | 64×64 | 2,188 | Dark embossed icon sheet — small symbols/glyphs on dark background. UI element icons. |

**Score & Advisor Screens (#10000–#10002)**

| ID | Dimensions | Size | Content |
|----|-----------|------|---------|
| **10000** | 640×480 | 39,343 | Hall of Fame / score background — dark theatrical stage with red curtains, spotlight effect, and a silver name plate at the bottom. Decorative skull/mask motifs in corners. |
| **10001** | 297×173 | 16,212 | Decorative stone frieze — ornamental border with skull reliefs and carved stone columns. Used as a UI frame element. |
| **10002** | 640×480 | 149,388 | Military advisor backdrop — elaborate still-life scene of historical weapons, armor, cannon, helmets, shields, swords, and flags arranged on a checkered floor, framed by red curtains. This is the background art for the military advisor screen. |

#### Resource Loading

The game references `mk.dll` at two locations in civ2.exe:
- `"civ2\\mk.dll"` at exe offset `0x22BAB9` (near civilization abbreviation strings: MON, CEL, JAP, VIK, SPA, PER, CAR, SIO)
- `"mk.dll"` at exe offset `0x22BBD8` (near `"VFWNOTREGISTERED"`)
- `"civ2\\mk.dll"` at exe offset `0x230AA5` (near `"SLAM"`)

#### Summary Statistics

| Metric | Value |
|--------|-------|
| CTAB palette resources | 21 (16 KB total) |
| GIF image resources | 56 (2.52 MB total) |
| Leader portraits (227×277) | 42 images (1.25 MB) |
| Throne room backgrounds (640×480) | 7 images (883 KB) |
| Sprite sheets | 3 images (167 KB) |
| Score/advisor screens | 3 images (205 KB) |
| Icon sheet (64×64) | 1 image (2 KB) |

### pv.dll — Palace View Art Container (Deep Dive)

pv.dll is the **Palace View** art container at 1.91 MB. The name stands for **"Palace View"**, confirmed by its single exe cross-reference at `0x225814` which appears immediately before the strings `THRONE` and `ADDTOTHRONE` — the palace-building minigame where players upgrade their palace after completing city improvements.

**PE Structure**: Identical to the other resource-only DLL siblings (100% code-identical .text section of 99,328 bytes containing debug CRT). Built **1997-04-21 18:13:51 UTC** — third of five siblings, 20 seconds after Tiles.dll and 11 seconds before cv.dll.

**Resources**: 55 embedded GIF images totaling 1.48 MB, all using the custom `"GIFS"` resource type. One base background at 640×480, all 54 sprites at 642×482 (the extra 2px border on each side likely aids compositing alignment).

#### Resource #100 — Palace Base Room (640×480, 134 KB)

The empty palace interior: a symmetrical stone hall with columns, pedestals, and a central plinth. This is the base canvas onto which all component sprites are composited. Unlike the sprites, it has **0% chroma-key** — it fills the entire frame. The sepia/brown palette establishes the stone architectural feel.

#### Palace Component System

The game's palace is built from **compositable sprite layers**, each with cyan chroma-key (`#04C5C5` or `#5AFFFE`) transparency. Components are organized into functional groups, with each group containing **4 variants** representing upgrade tiers (primitive → ornate). The `ADDTOTHRONE` string in the exe confirms the incremental upgrade mechanic.

**Structural Components** (groups of 4 tiers):

| ID Range | Component | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|----------|-----------|--------|--------|--------|--------|
| #105–108 | Wall (upper) | Cave rock | Cave rock (duplicate of #105) | Dark stone/spotlight | Woven brick |
| #110–113 | Floor | Dark cave earth | Rough stone | Polished tile (light) | Smooth sandstone |
| #115–118 | Wall overlays | Animal hide shapes | Dirt path runner | Dark mesh curtain | Patterned tile runner |
| #120–123 | Doorways | Rough cave opening | Rough stone arch | Smooth stone + light | Masonry + light |
| #125–128 | Corner decorations | Crossed-stick torch | Fan palm plant | Mesh curtain/drape | Pillar strips |
| #130–133 | Columns | Wood scaffolding/ladders | Simple post-and-lintel | Round arches on pillars | Ornate classical columns |
| #135–138 | Throne/Seat | Sleeping animal (rock) | Simple wooden stool | Stepped dais with throne | Dark ornate cabinet |
| #140–143 | Window arches | Pointed hide tent frame | Tall narrow posts | Gothic pointed arches | Round classical arches |

Note: #105 and #106 are **byte-identical** (74,478 bytes each) — a duplicate left in the shipping build, similar to the `#399 TEST` image in cv.dll.

**Decorative Accessories** (#160–166, 7 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #160 | Small vases/pots pair | 97.0% |
| #161 | Classical paintings triptych (religious/allegorical) | 79.1% |
| #162 | Grass/hedge strip segments | 93.1% |
| #163 | Grass/hedge border (shorter) | 97.6% |
| #164 | Small hedge border | 97.7% |
| #165 | Topiary trees pair | 96.4% |
| #166 | Boulder/rock decorations with floor tile | 85.2% |

**Furnishings & Architectural Details** (#170–184, 15 items):

| ID | Description | Chroma% |
|----|-------------|---------|
| #170 | Golden doorway/gate frame | 85.8% |
| #171 | Dark wooden doors pair with curtain headers | 80.7% |
| #172 | Small dark cabinet/screen | 91.5% |
| #173 | Trapezoid pedestal/base | 83.0% |
| #174 | Ornate gilded columns with entablature | 90.7% |
| #175 | Open sky/clouds visible through colonnade | 82.0% |
| #176 | Tiny square tile/block | 99.2% |
| #177 | Floor tile samples (3 variants) | 90.8% |
| #178 | Small decorative strip | 97.3% |
| #179 | Decorative furniture items row | 94.9% |
| #180–181 | Shelf/rail strips (2 variants) | 98–99% |
| #182–184 | Small shelf/rail details | 97–99% |

#### Compositing System

The palace view works by layering sprites onto the #100 base room:

1. **Base room** (#100, 640×480) — the empty stone hall canvas
2. **Wall textures** (#105–108) — fill the upper wall areas
3. **Floor textures** (#110–113) — replace the base floor
4. **Structural elements** (doorways, columns, windows, overlays) — composited with chroma-key
5. **Throne** (#135–138) — placed at center
6. **Decorative accessories** (#160–184) — scattered throughout

All sprites use **642×482** dimensions (1px larger border on each side than the 640×480 base), suggesting the compositing engine uses the extra pixels for alignment or anti-aliasing bleed.

#### Chroma-Key Colors

Two distinct cyan values are used across the sprite set:
- **#04C5C5** (R:4, G:197, B:197) — used in lower-tier sprites (#105–143)
- **#5AFFFE** (R:90, G:255, B:254) — used in higher-tier and decorative sprites (#170–184)

This dual-palette split may reflect two different artists or two production passes during development.

#### Exe Cross-References

Single reference at `0x225814`: `pv.dll` appears alongside `THRONE`, `ADDTOTHRONE`, and Civilopedia section keys (`@ADVANCE_INDEX`, `@IMPROVEMENT_INDEX`, etc.), placing it in the game's content loading and Civilopedia subsystem.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Base room background | 1 image (640×480) | 134 KB |
| Structural components (4-tier groups) | 32 images (642×482) | 905 KB |
| Decorative accessories | 7 images (642×482) | 108 KB |
| Furnishings & details | 15 images (642×482) | 82 KB |
| **Total** | **55 images** | **1.48 MB** |

### ss.dll — Spaceship Art Container (Deep Dive)

ss.dll is the **Spaceship** art container at 1.39 MB. The name stands for **"Space Ship"** — this is the art for the spaceship construction screen, one of the game's victory conditions where players build a spacecraft to reach Alpha Centauri. Confirmed by its exe cross-reference at `0x22D2E4` which appears alongside `"civ2\\video\\launch.avi"` and localized launch button text (`"Starten"` = German, `"Lancer"` = French).

**PE Structure**: Identical code sibling — 100% .text match with the other four resource-only DLLs. Built **1997-04-21 18:13:40 UTC** — second of five siblings (9 seconds after mk.dll, 11 seconds before pv.dll).

**Resources**: 46 embedded GIF images totaling 1.05 MB, all using the custom `"GIFS"` resource type.

**Chroma-key color**: **Orange #E36F1F** (R:227, G:111, B:31) — uniquely different from the cyan chroma used in pv.dll, mk.dll, and cv.dll. Some images also use **magenta #FF00FF** as a secondary transparency color.

#### Assembled Spaceship Views (#400–440, 24 images, 640×480)

These are pre-rendered views of the spaceship at progressive stages of assembly, displayed to the player in the spaceship construction screen. File sizes increase monotonically from 19 KB (#400) to 45 KB (#440), reflecting the growing visual complexity as more components are added:

- **#400–404** (5 images): Initial assembly — minimal structure, ~5% content (rest is chroma-key)
- **#406–418** (7 images, even IDs): Structural spine additions, growing from ~6% to ~8% content
- **#421–430** (8 images): Module and component additions, ~9–13% content
- **#433–440** (4 images, step-3 IDs): Final assembly stages, reaching ~17% content

The spaceship appears as a metallic blue-grey structure oriented diagonally (upper-left to lower-right) against the orange chroma-key background, with progressively more pods, panels, and structural members attached.

#### Component Sprite Sheets (#441–491, 11 images in 5 paired sets + 1 solo)

Individual spaceship components rendered as sprite strips with numbered left/right variants (labeled "1L, 1r, 2L, 2r..." etc. in magenta text overlays). Each pair consists of an **A variant** (detailed/3D rendered) and a **B variant** (simplified/placeholder rendering of the same shapes).

| IDs | Dimensions | Component Type | Sprites per sheet |
|-----|-----------|---------------|-------------------|
| #441/#442 | 695×110 | Solar panel arrays — triangular/wedge shapes with green panel faces | ~16 (8 L/R pairs) |
| #455/#456 | 905×104 | Structural beams — elongated metallic/wooden beam segments | ~16 (8 L/R pairs) |
| #470/#471 | 290×85 | Habitation modules — round pod/capsule shapes | ~4 |
| #480/#481 | 411×78 | Component segments — cylindrical tube pieces | ~8 (4 L/R pairs) |
| #489/#490 | 550×120 | Brackets/connectors — curved mounting hardware | ~8 (4 A/B pairs) |
| #491 | 750×101 | Structural details — small antennas, struts, solar cells, framework | ~30+ sprites |

#### UI & Scene Art (#497–499, 3 images)

| ID | Dimensions | Description |
|----|-----------|-------------|
| #497 | 640×480 | **Status indicator lights** — 6 small LED-style buttons (2×3 grid) in green/red/amber states, positioned at top-left corner with rest as chroma-key. Used to show component readiness status. |
| #498 | 640×240 | **Alpha Centauri arrival scene** — half-height deep space background with a reddish-brown planet (Alpha Centauri destination) against starfield. Shown upon successful spaceship arrival. |
| #499 | 640×480 | **Earth from orbit** — full-screen view of Earth showing continents, ocean, cloud formations and a cyclone. Shown as the launch departure scene. |

#### Thruster Animation (#20000–20007, 8 frames, 640×480)

An 8-frame animation sequence of rocket thruster exhaust, used during the spaceship launch cinematic. Content grows from 0.6% (#20000, tiny spark) to 3.6% (#20007, full thruster plume), showing cyan-green flame sprites against orange chroma-key. The small sprites grow larger across the sequence, creating the ignition → full-thrust animation.

#### Exe Cross-References

Single reference at `0x22D2E4`: the string `"ss.dll"` appears near:
- `"S.S. "` — spaceship label prefix (as in "S.S. Enterprise")
- `"civ2\\video\\launch.avi"` — the launch cinematic video file
- `"Starten"` / `"Lancer"` — German/French localized "Launch" button text
- `"0,000"` — numeric display format (likely for travel time/distance)

This places ss.dll firmly in the spaceship construction and launch subsystem, with `launch.avi` being the FMV that plays when the player launches their completed spaceship.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Assembled spaceship views (640×480) | 24 images | 678 KB |
| Component sprite sheets (various) | 11 images | 185 KB |
| UI status lights | 1 image | 12 KB |
| Space scene backgrounds | 2 images | 118 KB |
| Thruster animation frames | 8 images | 90 KB |
| **Total** | **46 images** | **1.05 MB** |

### Intro.dll — Intro Sequence Art Container (Deep Dive)

Intro.dll is the **intro slideshow** art container at 1.10 MB. It holds the historical images displayed during the game's opening sequence — a slideshow of civilization-themed photographs and engravings shown once when the game first launches. Confirmed by its exe cross-reference at `0x232A2C` (`"civ2\\intro.dll"`) which appears immediately before the window class name `"Civilization II Once Only"`, indicating a one-time display window.

**PE Structure**: The seventh and **final** code-identical sibling DLL. Built **1997-04-21 18:14:22 UTC** — 8 seconds after Civ2Art.dll, completing the 98-second build run that started with mk.dll at 18:12:44. 100% .text match (99,328 bytes of debug CRT).

**Resources**: 13 embedded GIF images totaling 828 KB, all using the custom `"GIFS"` resource type.

#### Visual Style

All images except #901 are framed with a **painted gold picture frame** border (~3–5px wide, gradient from R:211,G:123,B:47 to R:239,G:163,B:7), giving each image the appearance of a museum painting or gallery exhibit. This fits the intro's theme of presenting human civilization as a curated exhibit of historical moments.

#### Image Catalog

**#901 — Satellite View (376×227, 40 KB)**

Aerial/satellite view of the Nile Delta, Red Sea, and Arabian Peninsula — the "Cradle of Civilization" region. The only image without a gold frame, and the only one at its particular dimensions. Likely serves as the opening or transitional image in the slideshow.

**#902–905 — Historical Engravings, Wide Format (583×257, ~89 KB avg)**

| ID | Description |
|----|-------------|
| #902 | Colonial-era city map/plan showing a port settlement with street grid and waterway |
| #903 | Monumental stone guardian statue (East Asian, likely Chinese Ming Dynasty tomb figure) — largest file at 119 KB |
| #904 | 19th-century engraving of diverse ancient peoples in an encounter scene |
| #905 | Horsemen and explorers near pyramids — Napoleonic-era Egyptian expedition style |

Note: #902 and #904 share the same file size (89,348 bytes) but are **not** byte-identical — they contain completely different images that happen to compress to the same GIF size.

**#906–909 — Historical Engravings & Architecture (584×258, ~66 KB avg)**

| ID | Description |
|----|-------------|
| #906 | Middle Eastern/Ottoman peoples in traditional dress (ethnographic engraving) |
| #907 | Diverse Asian and African peoples in traditional costume (ethnographic engraving) |
| #908 | Photograph of Chinese palace building — the Palace Museum (故宫博物院) at the Forbidden City |
| #909 | Naval battle with burning/sinking ships (19th-century warfare engraving) |

Note: Dimensions are 584×258 — exactly 1px wider and 1px taller than the #902–905 group, suggesting these two sets were prepared in slightly different production passes.

**#910–913 — Natural Landscapes (406×258, ~41 KB avg)**

| ID | Description |
|----|-------------|
| #910 | Grand Canyon — layered red rock formations |
| #911 | Monument Valley — desert butte with distant mesa |
| #912 | Aerial view of an island (tropical atoll or volcanic island) |
| #913 | Alpine mountain lake with snow, pine forest, and reflected peaks |

These narrower landscape photographs likely appear in a different panel position during the slideshow, or are composited alongside the wider historical images.

#### Thematic Progression

The images trace civilization's arc across three visual themes:

1. **Geography & Origin** (#901, #910–913): The physical world — satellite views, canyons, mountains, islands, lakes
2. **Peoples & Culture** (#902–907): Human societies — city planning, monumental art, diverse peoples in traditional dress, exploration
3. **Power & Conflict** (#908–909): Architecture of power (Forbidden City) and warfare (naval battle)

#### Exe Cross-References

Single reference at `0x232A2C`: `"civ2\\intro.dll"` appears near:
- `"Civilization II Once Only"` — the window class name for the one-time intro display
- `"MSWindowClass"` — base Windows class for the intro window
- `"ENTER WINDOW DRAG"` / `"EXIT WINDOW DRAG"` — window interaction events
- Government-related strings (`PICKGOVT`, `NEWGOVT`, `DEMOCRATS`, `OVERTHROWN`) — suggesting the intro code shares a module with the government transition system

A separate exe reference at `0x229F2C` shows `"civ2\\video\\opening.avi"` — the FMV intro video that plays before or after this slideshow sequence.

#### Build Family Position

Intro.dll completes the resource-only DLL build session:

| Order | DLL | Time | Content |
|-------|-----|------|---------|
| 1st | mk.dll | 18:12:44 | Diplomacy & leaders |
| 2nd | Tiles.dll | 18:13:31 | Tile & UI art |
| 3rd | ss.dll | 18:13:40 | Spaceship |
| 4th | pv.dll | 18:13:51 | Palace view |
| 5th | cv.dll | 18:14:02 | City view |
| 6th | Civ2Art.dll | 18:14:14 | Credits art |
| **7th** | **Intro.dll** | **18:14:22** | **Intro slideshow** |

Total build time: **98 seconds** for all 7 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Satellite/aerial view (376×227) | 1 image | 40 KB |
| Historical engravings, wide (583×257) | 4 images | 388 KB |
| Historical/architectural (584×258) | 4 images | 263 KB |
| Natural landscapes (406×258) | 4 images | 166 KB |
| **Total** | **13 images** | **828 KB** |

### Wonder.dll — Wonder Indicator Art Container (Deep Dive)

Wonder.dll is the **smallest** of the resource-only DLL family at just 182 KB. It contains 28 small indicator panels used in the wonder tracking UI — one panel for each of the game's 28 buildable Wonders of the World.

**PE Structure**: The second sibling built in the family. Built **1997-04-21 18:13:13 UTC** — 29 seconds after mk.dll, 18 seconds before Tiles.dll. 100% .text match (99,328 bytes of debug CRT) with all other siblings.

**Resources**: 28 embedded GIF images (#20000–#20027) totaling 44 KB, all using the custom `"GIFS"` resource type. Every image is exactly **74×74 pixels** and exactly **1,607 bytes** — remarkably uniform.

#### The 28 Wonder Panels

Each image is a small gray stone-textured panel (interior avg RGB: 224,224,224) with a subtly tinted **colored border frame** (~2px wide). The panels serve as wonder status indicators in the game's wonder tracking interface, likely displayed in a grid showing which wonders have been built and by whom.

Despite all being 1,607 bytes and 74×74 pixels, all 28 images are **unique** — they differ by approximately 610 bytes each, with the differences concentrated in the border pixels. The border colors form a spectrum:

| Hue Family | Wonder IDs | Border RGB Example | Count |
|------------|-----------|-------------------|-------|
| Blue/Purple | #20000, 03, 05–08, 10–12, 14–17, 20–21, 25–27 | (163,152,179) | 18 |
| Pink/Red | #20001, 04, 09, 13, 18–19, 22–23 | (179,163,171) | 8 |
| Neutral Gray | #20002, 24 | Pure gray | 2 |

The color tinting likely encodes a default or thematic color for each wonder, with the game engine further recoloring these panels at runtime to match the civilization that built each wonder.

These panels are visually identical to the **#999 panel** in Civ2Art.dll (also 74×74 gray), which has 23 cross-references in the exe and serves as the generic/empty version. Wonder.dll provides the 28 wonder-specific variants.

#### Relationship to Wonder Videos

The exe cross-reference at `0x22CA84` shows the loading path:
- `"civ2\\wonder.dll"` — this DLL (indicator panels)
- `"civ2\\video\\wonder"` + `".avi"` — individual wonder construction videos

The wonder video subsystem constructs paths like `civ2\video\wonder001.avi` through `wonder028.avi`, each being a short FMV that plays when a wonder is completed. The nearby string `"VFWNOTREGISTERED"` (Video for Windows) handles the case where the video codec isn't installed.

Also nearby: `"Failed to load civ2art.gif"` — a fallback error message confirming Wonder.dll is loaded as part of the art resource chain.

#### Wonder-Related Game Events

The exe contains extensive wonder event strings, revealing the full wonder lifecycle:

| Event | String | Description |
|-------|--------|-------------|
| Start building | `STARTWONDER` | Player begins wonder construction |
| Switch production | `SWITCHWONDER` | Change which wonder is being built |
| Abandon | `ABANDONWONDER` | Cancel wonder construction |
| Complete | `ENDWONDER` | Wonder finished — triggers video |
| Almost done | `ALMOSTWONDER` | Near completion warning |
| Still building | `STILLWONDER1`, `STILLWONDER2` | Progress updates |
| Captured | `CAPTUREWONDER` | City with wonder captured |
| Lost | `LOSTWONDER` | Wonder lost to enemy |
| Acquired | `NM_ACQUIRE_WONDER` | Network message: wonder acquired |
| No exchange | `NOEXCHANGEWONDER` | Can't trade wonder in diplomacy |
| Don't play videos | `DONTPLAYWONDERS` | Config flag to skip wonder videos |

#### Build Family Position (Corrected)

Wonder.dll slots in as the **second** sibling, correcting the previous 7-sibling count to **8 siblings**:

| Order | DLL | Time | Δ |
|-------|-----|------|---|
| 1st | mk.dll | 18:12:44 | — |
| **2nd** | **Wonder.dll** | **18:13:13** | **+29s** |
| 3rd | Tiles.dll | 18:13:31 | +18s |
| 4th | ss.dll | 18:13:40 | +9s |
| 5th | pv.dll | 18:13:51 | +11s |
| 6th | cv.dll | 18:14:02 | +11s |
| 7th | Civ2Art.dll | 18:14:14 | +12s |
| 8th | Intro.dll | 18:14:22 | +8s |

Total build session: **98 seconds** for all 8 siblings.

#### Summary

| Category | Count | Size |
|----------|-------|------|
| Wonder indicator panels (74×74) | 28 images | 44 KB |
| **Total** | **28 images** | **44 KB** |

### timerdll.dll — SMEDS Engine Timer Callback DLL (Deep Dive)

timerdll.dll is the game's **high-resolution timer** DLL — and it is fundamentally different from every other DLL in the Civ2 distribution. While the 8 resource-only siblings are art containers with trivial code, timerdll.dll is the opposite: a **pure code DLL** with no resources, providing the SMEDS engine's multimedia timer infrastructure.

**PE Structure**: No .rsrc section. Internal export name is **`CALLBACK.dll`** (its original name before being renamed for shipping). Built **1997-03-17 21:39:57 UTC** — a full **35 days before** the resource DLL family (April 21, 1997), confirming it was developed independently as part of the SMEDS32 engine.

| Property | Value |
|----------|-------|
| File size | 131,072 bytes (128 KB) |
| Build date | March 17, 1997, 21:39:57 UTC |
| Internal name | `CALLBACK.dll` |
| Build config | **Debug** (shipped with debug CRT, assertions enabled) |
| Source path | `D:\SS\Smeds32\timer\Debug\timer.pdb` |
| Build output | `timer\Debug/timer.dll` (note mixed path separators) |
| .text size | 99,840 bytes |
| Actual timer code | **~464 bytes** (0.5% of .text) |
| Debug CRT overhead | ~99 KB (99.5% of .text) |
| Sibling code match | **26.8%** (different CRT build, NOT a sibling) |

#### Exports (6 functions)

| Export | Purpose |
|--------|---------|
| `TimerCallBack` | Main callback invoked by multimedia timer — looks up timer slot, checks notification flag, calls `timeGetTime`, posts message to game window |
| `SetTimerID` | Stores a timer handle into slot N of the 16-slot ID array |
| `GetTimerID` | Retrieves the timer handle from slot N |
| `GetTimerIndex` | Searches all 16 slots for a matching timer handle, returns the index |
| `ResetTimerNotified` | Clears the notification flag for a given timer slot |
| `WEP` | Windows Exit Procedure — Win16 compatibility stub, returns 1 |

#### Imports (3 DLLs, 72 functions)

| DLL | Function | Purpose |
|-----|----------|---------|
| `WINMM.dll` | `timeGetTime` | High-resolution multimedia timer (millisecond precision) |
| `USER32.dll` | `PostMessageA` | Sends asynchronous window messages |
| `KERNEL32.dll` | 70 functions | Standard C runtime (debug build) |

#### Timer Architecture

The DLL implements a **callback-to-message bridge**: Windows multimedia timers fire callbacks in a separate thread context, but Civ2's game logic runs on the main UI thread. This DLL solves the threading problem by converting timer callbacks into Windows messages posted to a hidden window.

**Data structures** (in .data section):
- `TimerID[16]` — array of 16 DWORD timer handles (at RVA 0x1F380)
- `NotifiedFlag[16]` — array of 16 DWORD notification flags (at RVA 0x1F3F0)
- Maximum of **16 concurrent timers**

**TimerCallBack flow**:
1. Called by WINMM when a multimedia timer fires
2. `GetTimerIndex(timerID)` — linear search through 16 slots to find matching handle
3. Check `NotifiedFlag[slot]` — skip if already notified (prevents message flooding)
4. `timeGetTime()` — get current millisecond timestamp
5. `PostMessageA(hWnd, 0x052C, slotIndex, currentTime)` — post to game window
   - Message **0x052C** = `WM_USER + 300` (custom timer notification)
   - wParam = timer slot index (0–15)
   - lParam = current time in milliseconds
6. Set `NotifiedFlag[slot] = 1` — mark as notified until game resets it

**Cleanup function**: Iterates all 16 slots, zeroing both `TimerID` and `NotifiedFlag` arrays.

#### Exe-Side Client (Pctimer.cpp)

The exe contains the consumer code in `D:\Ss\Smeds32\Pctimer.cpp`, which:
- Dynamically loads `timerdll.dll` via `LoadLibraryA` / `GetProcAddress` for all 5 callback functions
- Creates a hidden window with class **`MSMrTimerClass`** and title **`MrTimer`** to receive timer messages
- Handles three error conditions:
  - `ERR_DYNAMICLINKFAILED` — timerdll.dll couldn't be loaded or exports not found
  - `ERR_CANTCREATEWINDOW` — hidden timer window creation failed
  - `ERR_TIMERSETFAILED` — multimedia timer couldn't be started

#### Three Names, One DLL

This DLL has accumulated three different names through its development:
1. **CALLBACK.dll** — the original internal export name (earliest development name)
2. **timer.dll** — the build output name (`timer\Debug/timer.dll`)
3. **timerdll.dll** — the shipping name (renamed to avoid conflicts with system DLLs)

#### Build Date Significance

At March 17, 1997, timerdll.dll is the **oldest DLL** in the Civ2 MGE distribution:

| DLL | Build Date | Age vs. timerdll |
|-----|-----------|-----------------|
| **timerdll.dll** | **1997-03-17** | **baseline** |
| Resource DLLs (×8) | 1997-04-21 | +35 days |
| XDaemon.dll | 1998-11-10 | +603 days |

This is consistent with timerdll.dll being a **reusable SMEDS engine component** built once and never recompiled, while the resource DLLs were rebuilt fresh for the April 1997 release and XDaemon.dll was added later for MGE multiplayer.

### Source Code Structure

Debug strings preserve the original source tree:

**Game code** (`D:\Ss\Franklinton\`):

| Source File | Purpose |
|-------------|---------|
| `Difference Engine.cpp` | Multiplayer state synchronization — RLL-compressed delta encoding of game state |
| `Grey.cpp` | Grayscale palette and color management for BMP loading |
| `Map.cpp` | Map operations with server/client authority checking |
| `NetMgr.cpp` | Network manager core — protocol init, connection lifecycle |
| `NetMgr Poll.cpp` | Network receive polling loop, message dispatch, client transfer on host migration |
| `NetMgr Send.cpp` | Outbound message sending with socket validation |
| `NetMessageQueue.cpp` | Dual message queue (Alpha priority queue [0,400) + Primary queue [400,MAX)) |
| `Popup_1.cpp` | Dialog/popup system (stack depth limit: 16) |
| `Unit.cpp` | Unit lifecycle — creation, deletion, stacking, movement, with infinite-stack repair |
| `parleywin.cpp` | Diplomacy window UI |
| `parleywin add dialog.cpp` | Diplomacy dialog construction (LEFT/RIGHT panel layout) |
| `parleywin transaction.cpp` | Diplomacy transaction protocol (max 2048 char descriptions) |
| `startup LAN.cpp` | LAN game initialization with network type validation |
| `startup joinbox.cpp` | Game join dialog |
| `startup multiplayer.cpp` | Multiplayer setup flow |
| `startup playerbox.cpp` | Player selection with IGZ lobby integration |

**SMEDS Engine** (`D:\Ss\Smeds32\`):

| Source File | Purpose |
|-------------|---------|
| `Port.cpp` | Graphics surface abstraction — loads BMP, GIF, PCX, TGA, and LBM/IFF (Amiga) formats |
| `dd.cpp` | DirectDraw wrapper — surface creation, palette management, hardware capability detection |
| `ddcntrl.cpp` | DirectDraw UI control widgets |
| `Pcmem.cpp` | Memory management |
| `Pctimer.cpp` | Timer system via external `timerdll.dll` (exports: `TimerCallBack`, `SetTimerID`, `GetTimerID`, `GetTimerIndex`, `ResetTimerNotified`) |

The engine name "SMEDS" likely stands for **Sid Meier's Entertainment/Development System** — it's a reusable game framework with its own windowing system (`MSWindowClass`, `MSControlClass`, `MSScrollBarClass`, etc.), sprite engine, and multimedia playback. The log system writes to `smeds.log`.

### Difference Engine — Multiplayer State Sync

The "Difference Engine" (`Difference Engine.cpp`) is the multiplayer state synchronization system. It works by maintaining a mirror of the full game state and transmitting compressed deltas:

- **State blocks**: `btGame` (full game state) and `btMapStruct` (map structure)
- **Compression**: RLL (Run Length Limited) encoding via `RLLEncode` / `RLLBufferDecode`
- **Constraints**: `mirrorLength % sizeof(long) == 0` (state must be DWORD-aligned), diffs capped at `DIFF_ENGINE_MESSAGE_LENGTH`
- **Network messages**: `NM_FULL_GAMESTATE`, `NM_DIFF_GAMESTATE`, `NM_JOIN_GAMESTATE`, `NM_DIFFERENCE_ENGINE`, `NM_ALPHA_DIFFERENCE_ENGINE`

This confirms the in-memory game state is a flat, serializable structure — the same layout that gets written to `.SAV` files.

### Network Protocol Messages (155 total)

The game defines approximately 155 network message types for multiplayer synchronization. They reveal the complete internal game architecture:

**Map & Tile State (17 messages):**
`NM_TERRAIN_SET`, `NM_SEEN_SET`, `NM_OWNER_SET`, `NM_REGION_SET`, `NM_CITY_USING_SET`, `NM_FEATURE_SET`, `NM_FEAT_LOC_SET`, `NM_SITE_SET`, `NM_MAP_STRUCT`, `NM_MAP_PACKETS`, `NM_DO_APOLLO`, `NM_LOCK_MAP`, `NM_UNLOCK_MAP`, `NM_LOCK_MAP_ACK`, `NM_UNLOCK_MAP_ACK`, `NM_LOCK_MAP_SYNC`, `NM_DRAW_MAP_REGION`

These confirm the per-tile data fields we identified in the save format:
- **TERRAIN** → Byte 0 (terrain type + features)
- **SEEN** → Byte 3 (visibility/exploration bitmask)
- **OWNER** → Territory control
- **CITY_USING** → Byte 4 (which city is working this tile)
- **REGION** → Byte 5 (continent/region ID)
- **FEATURE** / **FEAT_LOC** → Byte 1–2 (improvements + locations)
- **SITE** → Special site markers

**Unit Operations (27 messages):**
Full unit lifecycle: `CREATE_UNIT` / `UNIT_CREATED`, `DELETE_UNIT` / `UNIT_DELETED`, `PICK_UP_UNIT` / `UNIT_PICKED_UP`, `PUT_DOWN_UNIT` / `UNIT_PUT_DOWN`, `RELOCATE_UNIT`, `MOVE_TO_BOTTOM`, `STACK_SHIP` / `STACK_UNIT`, `BRIBED_UNIT`, `DEATH_STACK`, `DELETE_SAFELY` / `DELETE_VISIBLY`, `AI_MOVEMENT`, `HUMAN_MOVEMENT` / `HUMAN_MOVE_COMPLETE`, `SLIDE_PIECE`, `REALTIME_STACKER`

**City Operations (17 messages):**
`CREATE_CITY` / `CITY_CREATED`, `DELETE_CITY` / `CITY_DELETED`, `ACQUIRE_WONDER` / `WONDER_ACQUIRED`, `PRODUCTION_BEGIN` / `PRODUCTION_COMPLETE`, `CITYWIN_CHECK_UNIT`, `CITYWIN_CHECK_CITY`, `CITYWIN_DELETED`, `CITYWIN_REDRAW`, `REVEAL_CITY_INFO` / `HIDE_CITY_INFO`, `REVEAL_CITY_ORIGIN` / `HIDE_CITY_ORIGIN`

**Diplomacy (26 messages):**
Full diplomacy protocol: `SET_ATTITUDE`, `SET_CIV`, `NEW_CIV` / `KILL_CIV` (with ACKs), `KINGDOM_RATES`, `TAX_CHECK`, `PICK_GOVT`, `POLITICAL_VIOLATIONS`, `POLITICAL_ATTITUDE`, `PARLEYREQUEST_REPLY` / `PARLEYREQUEST_CANCEL`, `PARLEY_TRANSACTION`, `PARLEY_ACCEPT_OFFER`, `PARLEY_NO_THANKS`, `PARLEY_COUNTER_OFFER`, `PARLEY_EXECUTE`, `DO_AIPARLEY`, `PRETEXT`, `CIVILIZATION_PING`

**Game Event Popups (~70 NM_POP_* messages):**
Every in-game event that triggers a popup notification has its own message type, including: `RETIREDIE`, `BARBARIANS`, `GLOBALWARMING`, `EAGLEHASLANDED`, `SPACELAUNCHED`, `SPACERETURNS`, `SPACEDESTROYED`, `DESTROYED`, `CARAVAN`, `STARTWONDER`, `CAPTUREWONDER`, `CITYCAPTURE`, `PARTISANS`, `PROMOTED`, `BOND007`, `PEARLHARBOR`, `CIVILWAR`, `MANHATTAN`, `GOLDENAGE`, `SPY_ESTABLISHEMBASSY`, `SPY_STOLENCIV`, `SPY_SABOTAGE1`, `SPY_PLANTNUKE`, etc.

### Anti-Piracy / Encryption Block

The `.data` section at VA `0x00227458` contains a 384-byte block with the plaintext marker:

```
PLAINTEXT TARGET
BYTE REPLACEMENT OF THIS BLOCK WITH PUBLIC-KEY CYPHERTEXT
```

This is a placeholder for a public-key encryption check — likely a copy protection mechanism where the block would be encrypted in retail copies and decrypted at runtime to verify authenticity. The block in this installation contains the unencrypted placeholder text.

### CIV.INI Configuration Settings

The game reads/writes settings from `CIV.INI` under the section `[Civilization Gold]`:

| Setting | Default | Purpose |
|---------|---------|---------|
| `Language Preference` | English | UI language (English, Francais, Deutsch) |
| `Simultaneous` | — | Simultaneous turns mode toggle |
| `MaxPlayers` | — | Maximum players in multiplayer |
| `Herald Warning Shown` | 0/1 | Whether the herald warning has been displayed |
| `ChatShowSize` | 8192 (or 57344) | Chat log display buffer size |
| `Window Name` | — | Application window title |
| `Adapter` | 0 | Network adapter index |
| `NetTimeOut` | 30 | General network timeout (seconds) |
| `INTERNET Timeout` | 60 | Internet game timeout (seconds) |
| `TCPIP Timeout` | 15 | LAN TCP/IP timeout (seconds) |
| `IPXSPX Timeout` | 15 | IPX/SPX timeout (seconds) |
| `MODEM Timeout` | 30 | Modem game timeout (seconds) |
| `DIRECT Timeout` | 30 | Direct serial connection timeout (seconds) |

Registry path: `Software\MicroProse Software\Civilization II Multiplayer Gold Edition` (constructed from `Software\%s\%s`).

### Network Protocol Support

| Protocol | Transport | Timeout | Init Function |
|----------|-----------|---------|---------------|
| Internet | TCP/IP | 60s | `XD_InitializeSocketsTCP` |
| LAN | TCP/IP | 15s | `XD_InitializeSocketsTCP` |
| IPX/SPX | IPX | 15s | `XD_InitializeSocketsIPXSPX` |
| Modem | Dial-up | 30s | `XD_InitializeModem` |
| Serial | Direct cable | 30s | `XD_InitializeSerial` |
| IGZ Lobby | Internet Gaming Zone | — | `XD_LaunchedByLobby` |

Host migration is supported: if the server disconnects, a client can `ClientTransferServer` to become the new host.

### Internationalization

Three languages are supported: **English** (default), **French** (`Francais`), **German** (`Deutsch`). Language-specific files use suffixes (e.g., `RULES.FRE`, `RULES.GER`, `CITY.FRE`, `EVENTS.GER`). Language data is stored in `INTER.DAT`. Some German strings appear inline in the executable (`erhalten`, `von den`, `Lancer`, `Starten`).

### Scenario Event Scripting Language

The executable contains a full parser for scenario event scripts (`EVENTS.TXT`), wrapped in `@BEGINEVENTS` / `@ENDEVENTS` blocks:

**IF Triggers** (conditions that fire events):

| Trigger | Parameters |
|---------|------------|
| `@IF UNITKILLED` | `unit=`, `attacker=`, `defender=` |
| `@IF CITYTAKEN` | `city=`, `attacker=`, `defender=` |
| `@IF TURN` | `turn=` (supports `EVERY` keyword) |
| `@IF TURNINTERVAL` | `interval=` |
| `@IF RANDOMTURN` | `denominator=` |
| `@IF SCENARIOLOADED` | (no parameters) |
| `@IF NEGOTIATION` | `talker=`, `talkertype=`, `listener=`, `listenertype=` (HUMAN/COMPUTER/HUMANORCOMPUTER) |
| `@IF NOSCHISM` | `defender=` |
| `@IF RECEIVEDTECHNOLOGY` | `technology=`, `receiver=` |

**THEN Actions** (effects when triggered):

| Action | Parameters |
|--------|------------|
| `@THEN TEXT` | Free text until `ENDTEXT` |
| `@THEN CREATEUNIT` | `unit=`, `owner=`, `veteran=`, `homecity=`, `locations`/`endlocations` |
| `@THEN MOVEUNIT` | `unit=`, `owner=`, `maprect`, `moveto`, `numbertomove=` |
| `@THEN CHANGEMONEY` | `receiver=`, `amount=` |
| `@THEN CHANGETERRAIN` | `terraintype=`, `maprect` |
| `@THEN MAKEAGGRESSION` | `who=`, `whom=` |
| `@THEN DESTROYACIVILIZATION` | `whom=` |
| `@THEN GIVETECHNOLOGY` | `receiver=`, `technology=` |
| `@THEN PLAYCDTRACK` | track number |
| `@THEN PLAYWAVEFILE` | filename |
| `@THEN JUSTONCE` | (fires only once, tracked via `HASTRIGGERED`) |
| `@THEN DONTPLAYWONDERS` | (suppresses wonder movies) |

Special entity references: `ANYBODY`, `ANYUNIT`, `TRIGGERATTACKER`, `TRIGGERDEFENDER`, `TRIGGERRECEIVER`.

### Cheat / Debug Menu

The cheat menu (activated in-game) provides extensive debugging capabilities:

| Command | Function |
|---------|----------|
| `PICKPLAYER` | Switch to control a different civilization |
| `REVEALMAP` | Reveal entire map |
| `MONEY` | Add gold |
| `CREATEUNIT` | Place a unit on the map |
| `KILLCIV` | Eliminate a civilization |
| `SETHUMAN` | Set a civ as human-controlled |
| `GAMEYEAR` | Change the current game year |
| `GAVETECH` / `TOOKTECH` / `EDITTECH` | Technology manipulation |
| `UNITEDIT` / `UNITHITPOINTS` / `EDITHOMECITY` | Unit property editing |
| `CITYEDIT` / `SETCITYSIZE` / `SETCITYSHIELDS` / `COPYCITY` | City property editing |
| `EDITKING` / `EDITKINGNAME` / `EDITTREATIES` | Civilization & diplomacy editing |
| `EDITATTITUDE` / `EDITBETRAY` / `EDITPROGRESS` | AI personality editing |
| `EDITRULES` / `EDITCOSMIC` | Rules & cosmic parameters editing |
| `EDITSCEN` / `EDITPARADIGM` / `EDITINCREMENT` / `EDITSTARTYEAR` / `EDITMAXTURNS` / `SCENNAME` | Scenario editing |
| `HIDDENTERRAIN` | Show hidden terrain types |
| `SUPPLYSEARCH` | Debug supply chain visualization |
| `LASTCONTACT` | Show last diplomatic contact info |
| `EDITVICTORY` / `EDITVICTORYOBJ` | Victory condition editing |

### Diplomacy AI System

The diplomacy system uses a rich set of dialog keys that reveal the AI's decision-making categories:

**Treaty States**: `ATWAR`, `CEASEFIRE`, `TREATY` (Peace), `ALLIANCE`

**AI Greeting Selection** (based on relationship): `HOWDY` / `HOWDYPEACE` / `HOWDYALLY`, `WELCOME` / `WELCOMEPEACE` / `WELCOMEALLY`, `DOODY` / `DOODYALLY` (hostile)

**Alliance Rejection Reasons** (AI evaluates these conditions): `ALLIANCENOBETRAY` (won't betray current ally), `ALLIANCENOWINNING` (player is winning), `ALLIANCENODISLIKE` (dislikes player), `ALLIANCENOSMALL` (player too small), `ALLIANCENOPATIENCE` (out of patience), `ALLIANCENOTHANKS` (general refusal)

**Senate/Government Override**: The game models democratic constraints with `SENATEPEACE`, `SENATECEASE`, `WALLFORCE` (Great Wall forces), `UNFORCE` (UN forces), `OVERRULE` (hawks override senate), `ALLOWUN`, `ALLOWAGGRESSOR`, `ALLOWHAWKS`

**Mercenary System**: AI can hire mercenaries (`CYBERCOP`, `MERCENARY`) and betray allies using them (`MERCBETRAYALLY`, `MERCBETRAY`, `MERCDECLARE`)

**Attitude Modifiers**: `ANNOY` / `ANNOYPEACE` / `ANNOYALLIED` / `ANNOYVASSAL` / `ANNOYCEASE`, `NOTORIOUS`, `SMALL`, `SYMPATHY`, `PATIENCE` / `PATIENCEALLY`, `FEEBLE` / `FEEBLEALLY`, `TAUNTALLY`

### Espionage System

Complete spy/diplomat action set: `ENEMYEMBASSY` (establish embassy), `ENEMYINVESTIGATE` (investigate city), `STEAL` / `STEALHARD` / `STEALSPECIFIC` (technology theft), `SABOTAGE` / `SABOTAGEHARD` / `SABOTAGESPECIFIC` / `SABOTAGEONE` / `SABOTAGETWO` (building/production sabotage), `WATERSUPPLY` (poison water), `PLANTEDNUKE` (plant nuclear device), `DISSIDENTS` / `DISSIDENTOPTIONS` / `NOREVOLT` (incite revolt), `CIVILWAR` (trigger civil war), `DESERT` / `DESERTED` (unit desertion via bribe), `BOND007` / `BONDGLORY` / `NAILED` (spy survival outcomes), `INCORRUPTIBLE` (target immune to bribery)

### Sound Effects (95 total)

Sound effects are loaded from `CIV2\SOUND\` (or `\SOUND\` relative to game dir) as `.WAV` files:

**Combat**: `AIRCOMBT`, `SWORDFGT`, `SWRDHORS`, `RIFLE`, `INFANTRY`, `MCHNGUNS`, `CAVALRY`, `CATAPULT`, `BIGGUN`, `MEDGUN`, `TANKMOTR`, `NAVBTTLE`, `SUBMRINE`, `TORPEDOS`, `BOATSINK`, `HELICPTR`, `HELISHOT`, `DIVEBOMB`, `DIVCRASH`, `JETCOMBT`, `JETPLANE`, `JETBOMB`, `JETCRASH`, `JETSPUTR`, `AIRPLANE`, `MISSILE`

**Explosions**: `SMALLEXP`, `MEDEXPL`, `LARGEXPL`, `NUKEXPLO`

**City/Building**: `BLDCITY`, `AQUEDUCT`, `BARRACKS`, `CATHEDRL`, `MRKTPLCE`, `NEWBANK`, `STKMARKT`, `NEWONDER`, `BLDSPCSH`

**Government/Events**: `NEWGOVT`, `REVOLT`, `CIVDISOR`, `CHEERS`, `CRWDBUGL`, `GUILLOTN`, `SPYSOUND`

**UI**: `MOVPIECE`, `ENDOTURN`, `MENUOK`, `MENULOOP`, `MENUEND`, `LETTER`

**Music Fanfares**: `FANFARE1`–`FANFARE8` (civilization-specific), `FEEDBK01`–`FEEDBK08` (feedback sounds)

**Engine/Misc**: `DIESEL`, `ENGNSPUT`, `FIRE---`, `ELEPHANT`

**Drum Rolls** (3 sets × 4 variants): `DRUMAL`/`DRUMAY`/`DRUMA0`/`DRUMAN`, `DRUMBL`/`DRUMBY`/`DRUMB0`/`DRUMBN`, `DRUMCL`/`DRUMCY`/`DRUMC0`/`DRUMCN`

**Custom/Extra**: `CUSTOM1`–`CUSTOM3`, `EXTRA1`–`EXTRA8`

### Supported File Formats

**Save/Load formats**:

| Extension | Type |
|-----------|------|
| `.sav` | Standard save game |
| `.scn` | Scenario file |
| `.hot` | Hotseat (local multiplayer) save |
| `.eml` | Play-by-Email save |
| `.net` | Network multiplayer save |
| `.ALT` | Alternative/backup save |

**Graphics** (game tries BMP first, falls back to GIF):
`TERRAIN1`, `TERRAIN2`, `UNITS`, `CITIES`, `ICONS`, `PEOPLE` (as `.BMP` or `.GIF`), `TITLE.GIF`, `EDITORPT.GIF`, `EDITORAS.GIF`, `EDITORSQ.GIF`, `EDITORSA.GIF`, `SCREDITS.GIF`

**Video** (AVI): `civ2\video\opening.avi`, `civ2\video\winwin.avi`, `civ2\video\launch.avi`, `civ2\video\wonder\*.avi`, `\loser.avi`

**Data files**: `RULES.TXT` (backed up as `RULES.BAK`), `CITY.TXT` (via `CITY.TMP`/`CITY.BAK`), `EVENTS.TXT` (backed up as `EVENTS.BAK`), `CITYPREF.TXT` (city build preferences), `INTER.DAT` (internationalization), `HALLFAME.DAT`, `CIV2.DAT`, `CIV.INI`, `chatlog.txt`, `chatmac1.txt`–`chatmac3.txt` (chat macros)

### SMEDS Engine — Graphics Port System

The SMEDS engine (`Port.cpp`) supports loading images from multiple formats, tried in this priority order:

1. **BMP** — Windows bitmap (uncompressed only, rejects `BI_RLE4`)
2. **GIF** — GIF87/89a (requires global color map, skips local color tables)
3. **PCX** — ZSoft PCX (256-color or 1-plane only)
4. **TGA** — Targa (uncompressed only — `"Targa Compression Not Implemented Yet."`)
5. **LBM/IFF** — Amiga ILBM/PBM format (FORM-based, for legacy compatibility)

Image validation enforces 640×480 at 256 colors for full-screen graphics.

### DirectDraw Integration

The game uses DirectDraw for hardware-accelerated rendering when available. Capabilities checked at startup:

- Hardware blitting support
- Color key (transparency) support
- Hardware color fills
- Bank switching detection (for VRAM-limited cards)
- 16-bit pixel format identification
- Monitor refresh frequency
- Surface locking for direct pixel access

The game creates primary + back buffer surfaces and an offscreen surface for compositing. The engine has a fallback software renderer for systems without DirectDraw.

### Game Constants (from assertion strings)

| Constant | Context | Notes |
|----------|---------|-------|
| `MAX_UNITS` | `id >= 0 && id < MAX_UNITS + 2` | Maximum units in game (+ 2 sentinel entries) |
| `MAX_NET_PLAYERS` | Socket bounds checking, queue indices | Maximum multiplayer players |
| `MAX_STACKED_DRAWS` | `gNetMgr.firstStackedDraw >= 0` | Draw operation stack depth |
| `MAX_MSGS_IN_QUEUE` | `head >= 400 && head < MAX_MSGS_IN_QUEUE` | Message queue capacity |
| `DIFF_ENGINE_MESSAGE_LENGTH` | `diffLength <= DIFF_ENGINE_MESSAGE_LENGTH` | Max state-diff payload size |
| Popup stack | `popupStackIndex > 0 && popupStackIndex < 17` | Max 16 nested popups |
| Parley description | `strlen(parleyDescription) < 2048` | Max diplomacy text length |

### Internal Terrain Names

| ID | Game Name | Internal Name |
|----|-----------|---------------|
| 0 | Desert | `DESERT` |
| 1 | Plains | `PLAINS` |
| 2 | Grassland | `GRASSLAND` |
| 3 | Forest | `FOREST` |
| 4 | Hills | `HILLS` |
| 5 | Mountains | `MOUNTAINS` |
| 6 | Tundra | `TUNDRA` |
| 7 | Glacier | **`ARCTIC`** (not "Glacier") |
| 8 | Swamp | `SWAMP` |
| 9 | Jungle | `JUNGLE` |
| 10 | Ocean | `OCEAN` |

### Goody Hut Outcomes

When a unit enters a minor tribe village (goody hut), the game selects from: `SURPRISETRIBE` (friendly tribe), `SURPRISENOMADS` (nomads join), `SURPRISESCROLLS` (ancient scrolls = tech), `SURPRISEMETALS` (precious metals = gold), `SURPRISENOTHING` (empty), `SURPRISEBARB` (barbarian ambush), `SURPRISEMERCS` (mercenary unit joins)

---

## Log Files

### smeds.log

Engine log. Key entries:

```
(    0) 5.4.0f Multiplayer 26-March-99       ← Game version
(    0) Patch 3                                ← Patch level
(    0) Bottom-up orientation recommended.     ← Graphics rendering hint
(    0) Not an IGZ Game!!  event = -3          ← Not a lobby-hosted game
(    5) load_gpk: Fixing up: game.enemies(6) inconsistent with game.active(247).
```

The last line reveals: `game.enemies = 6` (plus player = 7 total civs) and `game.active = 247` (possibly active units or game elements).

### XDaemon.log

Network library log:
```
XDaemon Communications Library v3.5.0 Online - 10-Nov-1998
XD_LaunchedByLobby - retVal = XLOBBYERR_NOTLOBBIED
```

Confirms the game was launched standalone (not from the IGZ lobby).

---

## Key Findings & Gotchas

### 1. Territory = Visibility Bitmask, NOT City Proximity

The minimap territory display uses **byte[3] of the tile record** — a per-bit visibility mask indicating which civs have explored each tile. This is fundamentally different from a Voronoi/nearest-city approach. The highest set bit determines the tile's color on the minimap.

### 2. Civ Slot ≠ Owner ID

City records use an "owner" byte (offset +86) that does **not** correspond to the civ slot number in the tile visibility bitmask. The owner ID is a separate numbering system. Mapping between them requires cross-referencing city positions with the tile data.

### 3. Destroyed Cities Are Misleading

Cities with size = 0 remain in the save file at their original coordinates. Their "owner" byte reflects the last known controller, but these cities do **not** represent current territorial control. Some dummy records appear at position (0, 0) with garbage names.

### 4. The Map Wraps Horizontally

City X coordinates can exceed the map width. Apply modular arithmetic: `visual_column = (x // 2) % (map_width // 2)`. Wrapping must also be handled in distance calculations for any proximity-based analysis.

### 5. Tile Data Offset Varies

The tile data block does not sit at a fixed offset in the save file. It must be located by scanning for a contiguous run of 6-byte records where the terrain nibble is valid (0–10) and the terrain distribution is realistic (includes ocean, multiple terrain types).

### 6. Isometric Rendering Matters

Civ2 uses a diamond isometric grid. Rendering tiles as rectangles loses half the visual information and misrepresents the map geometry. Tiles must be rendered as diamonds with odd-row horizontal offsets to match the actual game display.

### 7. Autosave Naming

The autosave file is named `St_Auto.SAV` (not `AUTO.SAV` as some community docs suggest). It is written to the game installation directory each turn when "Autosave each turn" is enabled in game options.

---

## Community References

- **Catfish's Cave** (ToT format guide): https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm — Partial documentation of the save format for Test of Time, which shares heritage with MGE.
- **Apolyton Forums** and **CivFanatics** — Community hex editing threads provided clues for city record structure and map data locations.
- Note: Community documentation is often for original Civ2 or Test of Time, and offsets/structures differ slightly in MGE.
