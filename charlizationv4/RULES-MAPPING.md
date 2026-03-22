# RULES.TXT → Binary Memory Mapping

All offsets verified against decompiled C in `reverse_engineering/decompiled/block_00410000.c`.

## @COSMIC → DAT_0064bcc8..DAT_0064bcdd
Source: FUN_00419d23 (line 5060). 22 sequential bytes.

| Idx | DAT Address  | Default | Description                          |
|-----|-------------|---------|--------------------------------------|
| 0   | 0064bcc8    | 3       | Road movement multiplier             |
| 1   | 0064bcc9    | 2       | Trireme loss chance (1 in x)         |
| 2   | 0064bcca    | 2       | Food per citizen per turn            |
| 3   | 0064bccb    | 10      | Food box rows (forced even)          |
| 4   | 0064bccc    | 10      | Shield box rows                      |
| 5   | 0064bccd    | 1       | Settlers eat (govt ≤ Monarchy)       |
| 6   | 0064bcce    | 2       | Settlers eat (govt ≥ Communism)      |
| 7   | 0064bccf    | 7       | First unhappy city size (Chieftain)  |
| 8   | 0064bcd0    | 14      | Riot factor (higher = less effect)   |
| 9   | 0064bcd1    | 8       | Aqueduct needed above this size      |
| 10  | 0064bcd2    | 12      | Sewer System needed above this size  |
| 11  | 0064bcd3    | 10      | Tech paradigm (higher = slower)      |
| 12  | 0064bcd4    | 20      | Engineer transform time (×2)         |
| 13  | 0064bcd5    | 3       | Monarchy free unit support           |
| 14  | 0064bcd6    | 3       | Communism free unit support          |
| 15  | 0064bcd7    | 10      | Fundamentalism free unit support     |
| 16  | 0064bcd8    | 0       | Communism equiv palace distance      |
| 17  | 0064bcd9    | 50      | Fundamentalism science penalty %     |
| 18  | 0064bcda    | 50      | Production change shield penalty %   |
| 19  | 0064bcdb    | 10      | Max paradrop range                   |
| 20  | 0064bcdc    | 75      | Mass/Thrust paradigm                 |
| 21  | 0064bcdd    | 5       | Max fundamentalism science (×10%)    |

## @CIVILIZE → DAT_00627680 (stride 0x10, 100 techs)
Source: FUN_0041a046 (line 5137).

| Offset | DAT Alias  | Field              | Notes                          |
|--------|------------|--------------------|--------------------------------|
| +0x04  | 00627684   | name ref           | uint32, string pointer         |
| +0x09  | 00627689   | enabled            | 0=disabled, 1=enabled          |
| +0x0A  | 0062768a   | AI value           | 1-8                            |
| +0x0B  | 0062768b   | civilized modifier | signed byte                    |
| +0x0C  | 0062768c   | category           | 0=mil,1=eco,2=soc,3=acad,4=app|
| +0x0D  | 0062768d   | epoch              | 0=anc,1=ren,2=ind,3=mod        |
| +0x0E  | 0062768e   | prereq 1           | tech index, 0xFE=none          |
| +0x0F  | 0062768f   | prereq 2           | tech index, 0xFE=none          |

## @UNITS → DAT_0064b1bc (stride 0x14, 62 units)
Source: FUN_0041a5c4 (line 5294).

| Offset | DAT Alias  | Field              | Notes                          |
|--------|------------|--------------------|--------------------------------|
| +0x00  | 0064b1bc   | flags              | uint16 LE (15-bit flag string) |
| +0x02  |            | (zeroed)           | upper bytes of flags write     |
| +0x04  | 0064b1c0   | obsolete tech      | byte, 0xFE=none                |
| +0x05  | 0064b1c1   | domain             | 0=land, 1=air, 2=sea          |
| +0x06  | 0064b1c2   | move rate          | **× cosmic movement mult (3)** |
| +0x07  | 0064b1c3   | range              | fuel/vision                    |
| +0x08  | 0064b1c4   | attack             |                                |
| +0x09  | 0064b1c5   | defense            |                                |
| +0x0A  | 0064b1c6   | hit points         | **× 10**                       |
| +0x0B  | 0064b1c7   | firepower          |                                |
| +0x0C  | 0064b1c8   | cost               | in shield rows (×10 for total) |
| +0x0D  | 0064b1c9   | hold/carry         | ship carry capacity            |
| +0x0E  | 0064b1ca   | role               | 0-7                            |
| +0x0F  | 0064b1cb   | prereq tech        | byte, 0xFE=none                |

## @TERRAIN → DAT_00627cc0 (stride 0x18, 33 entries)
Source: FUN_0041a95f (line 5386). First 11 = base terrains, next 22 = specials.

| Offset | DAT Alias  | Field              | Notes                          |
|--------|------------|--------------------|--------------------------------|
| +0x04  | 00627cc4   | name ref           | uint32, string pointer         |
| +0x08  | 00627cc8   | movement cost      |                                |
| +0x09  | 00627cc9   | defense bonus      |                                |
| +0x0A  | 00627cca   | food yield         | (3 bytes: food, shields, trade)|
| +0x0B  |            | shields yield      |                                |
| +0x0C  |            | trade yield        |                                |
| +0x0D  | 00627ccd   | transform-to       | terrain index (base terrains only) |
| +0x0E  | 00627cce   | irrigate transform | terrain idx or 0xFF/0xFE       |
| +0x0F  |            | mine transform     | terrain idx or 0xFF/0xFE       |
| +0x10  | 00627cd0   | irrigate bonus     |                                |
| +0x11  |            | mine bonus         |                                |
| +0x12  | 00627cd2   | irrigate turns     |                                |
| +0x13  |            | mine turns         |                                |
| +0x14  | 00627cd4   | irrigate AI level  | min govt level for AI          |
| +0x15  | 00627cd5   | mine AI level      |                                |

## @IMPROVE → DAT_0064c480 (stride 8, 67 entries)
Source: FUN_0041a422 (line 5242).

| Offset | DAT Alias  | Field              | Notes                          |
|--------|------------|--------------------|--------------------------------|
| +0x08  | 0064c488   | name ref           | uint32, string pointer         |
| +0x0C  | 0064c48c   | cost               | ×10 for total shields          |
| +0x0D  | 0064c48d   | upkeep             | gold per turn                  |
| +0x0E  | 0064c48e   | prereq tech        | tech index, 0xFE=none          |

## @ENDWONDER → DAT_0064ba28 (28 bytes)
Source: FUN_0041a422 (line 5274).
Each byte = tech index that obsoletes the wonder (0xFE = never).

## @GOVERNMENTS → DAT_0064b9a0 (stride 4, 7 entries)
Source: FUN_0041ab18 (line 5454). Name refs only (display data).

## @LEADERS → DAT_006554f8 (stride 0x30, 21 entries)
Source: FUN_0041ab18 (line 5464). AI personality, city style, combat tendencies.

## @CARAVAN → DAT_0064b168 (stride 4, 16 entries)
Source: FUN_0041b00e (line 5583). Commodity name refs only.

## @ORDERS → DAT_00655490 (stride 8, 12 entries)
Source: FUN_0041b00e (line 5589). Order name refs + key chars.

## @DIFFICULTY → DAT_0064ba10 (stride 4, 6 entries)
Source: FUN_0041b00e (line 5597). Difficulty level name refs only.

## @ATTITUDES → DAT_0064b9c0 (stride 4, 9 entries)
Source: FUN_0041b00e (line 5602). Attitude name refs only.

---

# Complete Game Data File Inventory

## Files with Game Logic Data (PARSED)

| File | Size | Parser | What it populates |
|------|------|--------|-------------------|
| **RULES.TXT** | 26KB | `loadRules()` | All 12 sections → flat memory arrays |
| **CITY.TXT** | 6KB | `loadCityNames()` | 625+ city names across 25 civilizations |
| **.sav files** | varies | `loadSav()` | Units, cities, civs, tiles, map, game state |
| **CIV2.DAT** | 516B | `loadCiv2Dat()` | Multiplayer config (player names, IP) |
| **civ2.exe** | 2.5MB | Ghidra decompiled | 5,149 functions → 34 block JS files |

## Save File Formats (DOCUMENTED)

| Extension | Unit size | City size | Map header offset | Differences from .sav |
|-----------|----------|-----------|-------------------|----------------------|
| **.sav** | 32 bytes | 88 bytes | 13702 (0x3586) | Standard format |
| **.scn** | 26 bytes | 84 bytes | 13432 (0x3488) | No unit ID/padding, scenario events section |
| **.net** | 32 bytes | 88 bytes | 13702 (0x3586) | Same as .sav but with extended tail (2979 bytes vs 1807) |

## Premade Map Format (.MP)

Raw map data, no save game state. Header = map dimensions (14 bytes) + tile data (ms × 6 bytes) + continent data.

| File | Dimensions | Size |
|------|-----------|------|
| WORLD.MP | 75×120 | 54KB |
| EUROPE.MP | 75×120 | 54KB |
| PACIFIC.MP | 75×120 | 54KB |
| MEDITERR.MP | 50×80 | 24KB |
| GREECE.MP | 50×80 | 24KB |
| WORLD_M.MP | 50×80 | 24KB |
| WORLD_S.MP | 40×50 | 12KB |

## UI/Display Text Files (NO GAME LOGIC)

| File | Size | Content |
|------|------|---------|
| Game.txt | 103KB | Dialog/popup text, menu strings, all game messages |
| Describe.txt | 212KB | Civilopedia entries (full text) |
| HELP.TXT | 24KB | Help system text |
| MISC.TXT | 21KB | Miscellaneous UI strings |
| PEDIA.TXT | 16KB | Civilopedia index/categories |
| TUTORIAL.TXT | 12KB | Tutorial step messages |
| Labels.txt | 12KB | UI labels, button text, string heap (50000 bytes) |
| COUNCIL0.TXT | 11KB | Advisor dialog text — Ancient era |
| COUNCIL1.TXT | 11KB | Advisor dialog text — Middle era |
| COUNCIL2.TXT | 11KB | Advisor dialog text — Modern era |
| PATCH.TXT | 9KB | Patch notes (documents CITYPREF.TXT autobuild feature) |
| DEBUG.TXT | 8KB | Debug/cheat popup strings |
| ADVICE.TXT | 5KB | Advisor recommendation text |
| LEADERS.TXT | 2.4KB | **Duplicate of @LEADERS in RULES.TXT** (standalone backup) |
| Menu.txt | 2KB | Menu bar definitions |
| SC.TXT | 2KB | Credits text |
| HERALD.TXT | 444B | Herald warning messages |
| MAPMENU.TXT | 675B | Map editor menu strings |
| ALEXANDR.TXT | 775B | Alexander scenario description |
| ROME.TXT | 1.2KB | Rome scenario description |
| WWII.TXT | 552B | WWII scenario description |
| CIV2FANW.TXT | 8.6KB | Fan website list |
| CIV2FAQ.TXT | 9.8KB | FAQ document |
| README.TXT | 12KB | Game readme |
| Readmev13.txt | 6.6KB | v1.3 patch readme |
| CREDITS.TXT | 2.6KB | Game credits |
| fcredits.txt | 1.9KB | Fantastic Worlds credits |
| mpcredits.txt | 1.2KB | Multiplayer credits |
| SCREDITS.TXT | 1.3KB | Scenario credits |

## Graphics Files (NO GAME LOGIC)

**GIF sprite sheets:**
TERRAIN1.GIF (46KB), TERRAIN2.GIF (56KB), UNITS.GIF (54KB), CITIES.GIF (46KB),
CITY.GIF (66KB), ICONS.GIF (54KB), PEOPLE.GIF (21KB), SCREDITS.GIF (139KB),
EDITOR*.GIF (4 files, ~35KB each)

**DLLs with embedded GIF resources (243 total sprites):**
cv.dll (5.0MB), mk.dll (3.2MB), pv.dll (2.0MB), ss.dll (1.5MB),
Tiles.dll (1.4MB), Intro.dll (1.2MB), Civ2Art.dll (257KB), Wonder.dll (186KB)

**Runtime DLLs (code only):**
timerdll.dll (131KB), XDaemon.dll (96KB — network daemon)

## Other Files

| File | Size | Content |
|------|------|---------|
| Civ2Map.exe | 2.5MB | Map editor executable (separate program) |
| civ2.TMMbak | 2.5MB | Pre-mod backup of civ2.exe (23 bytes different) |
| HALLFAME.DAT | 432B | Hall of fame score records |
| LOSER.AVI | 1.9MB | Defeat video |
| ROME.SCN | 77KB | Rome scenario (SCN format) |
| WWII.SCN | 155KB | WWII scenario (SCN format) |
| chatlog.txt | 0B | Empty multiplayer chat log |
| smeds.log | 845B | UI framework debug log |
| XDaemon.log | 1.2KB | Network daemon log |
| Uninst.isu | 272KB | Uninstaller data |
| Vfwfix.reg | 978B | Video for Windows registry fix |
