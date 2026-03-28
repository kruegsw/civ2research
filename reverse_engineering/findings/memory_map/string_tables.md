# String Tables & Static Data Addresses

Discovered 2026-03-27 via sniff-memscan.py + sniff-rules.py + sniff-game.py while Civ2 was at title screen.

## Unit Name String Table

- **Base address:** `0x04BD53D9`
- **Stride:** 15 bytes per entry (name padded to 14 chars + null terminator)
- **Formula:** `addr(unit N) = 0x04BD53D9 + N * 15`

| # | Address      | Name           |
|---|--------------|----------------|
| 0 | 0x04BD53D9   | Settlers       |
| 1 | 0x04BD53E8   | Engineers      |
| 2 | 0x04BD53F7   | Warriors       |
| 3 | 0x04BD5406   | Phalanx        |
| 4 | 0x04BD5415   | Archers        |
| 5 | 0x04BD5424   | Legion         |
| 6 | 0x04BD5433   | Pikemen        |
| 7 | 0x04BD5442   | Musketeers     |
| 8 | 0x04BD5451   | Fanatics       |
| 9 | 0x04BD5460   | Partisans      |
|10 | 0x04BD546F   | Alpine Troops  |
|11 | 0x04BD547E   | Riflemen       |
|12 | 0x04BD548D   | Marines        |
|13 | 0x04BD549C   | Paratroopers   |
|14 | 0x04BD54AB   | Mech. Inf.     |
|15 | 0x04BD54BA   | Horsemen       |
|16 | 0x04BD54C9   | Chariot        |
|17 | 0x04BD54D8   | Elephant       |
|18 | 0x04BD54E7   | Crusaders      |
|19 | 0x04BD54F6   | Knights        |
|20 | 0x04BD5505   | Dragoons       |
|21 | 0x04BD5514   | Cavalry        |
|22 | 0x04BD5523   | Armor          |
|23 | 0x04BD5532   | Catapult       |
|24 | 0x04BD5541   | Cannon         |
|25 | 0x04BD5550   | Artillery      |
|26 | 0x04BD555F   | Howitzer       |
|27 | 0x04BD556E   | Fighter        |
|28 | 0x04BD557D   | Bomber         |
|29 | 0x04BD558C   | Helicopter     |
|30 | 0x04BD559B   | Stlth Ftr.     |
|31 | 0x04BD55AA   | Stlth Bmbr.    |
|32 | 0x04BD55B9   | Trireme        |
|33 | 0x04BD55C8   | Caravel        |
|34 | 0x04BD55D7   | Galleon        |
|35 | 0x04BD55E6   | Frigate        |
|36 | 0x04BD55F5   | Ironclad       |
|37 | 0x04BD5604   | Destroyer      |
|38 | 0x04BD5613   | Cruiser        |
|39 | 0x04BD5622   | AEGIS Cruiser  |
|40 | 0x04BD5631   | Battleship     |
|41 | 0x04BD5640   | Submarine      |
|42 | 0x04BD564F   | Carrier        |
|43 | 0x04BD565E   | Transport      |
|44 | 0x04BD566D   | Cruise Msl.    |
|45 | 0x04BD567C   | Nuclear Msl.   |
|46 | 0x04BD568B   | Diplomat       |
|47 | 0x04BD569A   | Spy            |
|48 | 0x04BD56A9   | Caravan        |
|49 | 0x04BD56B8   | Freight        |
|50 | 0x04BD56C7   | Explorer       |
|51 | 0x04BD56D6   | Extra Land     |
|52 | 0x04BD56E5   | Extra Ship     |
|53 | 0x04BD56F4   | Extra Air      |
|54 | 0x04BD5703   | Test Unit 1    |
|55 | 0x04BD5712   | Test Unit 2    |
|56 | 0x04BD5721   | Test Unit 3    |
|57 | 0x04BD5730   | Test Unit 4    |
|58 | 0x04BD573F   | Test Unit 5    |
|59 | 0x04BD574E   | Test Unit 6    |

## Tech Name String Table (full names)

- **Region:** `0x04BD4600`–`0x04BD4C50`
- Variable-length null-terminated strings, stride ~20 bytes per entry
- All 80 techs (alphabetical order — matches @CIVILIZE in RULES.TXT):

| Address      | Name                  |
|--------------|-----------------------|
| 0x04BD460A   | Bridge Building       |
| 0x04BD461E   | Bronze Working        |
| 0x04BD4632   | Ceremonial Burial     |
| 0x04BD4646   | Chemistry             |
| 0x04BD465A   | Chivalry              |
| 0x04BD466E   | Code of Laws          |
| 0x04BD4682   | Combined Arms         |
| 0x04BD4696   | Combustion            |
| 0x04BD46AA   | Communism             |
| 0x04BD46BE   | Computers             |
| 0x04BD46D2   | Conscription          |
| 0x04BD46E6   | Construction          |
| 0x04BD46FA   | The Corporation       |
| 0x04BD470E   | Currency              |
| 0x04BD4722   | Democracy             |
| 0x04BD4736   | Economics             |
| 0x04BD474A   | Electricity           |
| 0x04BD475E   | Electronics           |
| 0x04BD4772   | Engineering           |
| 0x04BD4786   | Environmentalism      |
| 0x04BD479A   | Espionage             |
| 0x04BD47AE   | Explosives            |
| 0x04BD47C2   | Feudalism             |
| 0x04BD47D6   | Flight                |
| 0x04BD47EA   | Fundamentalism        |
| 0x04BD47FE   | Fusion Power          |
| 0x04BD4812   | Genetic Engineering   |
| 0x04BD4826   | Guerrilla Warfare     |
| 0x04BD483A   | Gunpowder             |
| 0x04BD484E   | Horseback Riding      |
| 0x04BD4862   | Industrialization     |
| 0x04BD4876   | Invention             |
| 0x04BD488A   | Iron Working          |
| 0x04BD489E   | Labor Union           |
| 0x04BD48B2   | The Laser             |
| 0x04BD48C6   | Leadership            |
| 0x04BD48DA   | Literacy              |
| 0x04BD48EE   | Machine Tools         |
| 0x04BD4902   | Magnetism             |
| 0x04BD4916   | Map Making            |
| 0x04BD492A   | Masonry               |
| 0x04BD493E   | Mass Production       |
| 0x04BD4952   | Mathematics           |
| 0x04BD4966   | Medicine              |
| 0x04BD497A   | Metallurgy            |
| 0x04BD498E   | Miniaturization       |
| 0x04BD49A2   | Mobile Warfare        |
| 0x04BD49B6   | Monarchy              |
| 0x04BD49CA   | Monotheism            |
| 0x04BD49DE   | Mysticism             |
| 0x04BD49F2   | Navigation            |
| 0x04BD4A06   | Nuclear Fission       |
| 0x04BD4A1A   | Nuclear Power         |
| 0x04BD4A2E   | Philosophy            |
| 0x04BD4A42   | Physics               |
| 0x04BD4A56   | Plastics              |
| 0x04BD4A6A   | Plumbing              |
| 0x04BD4A7E   | Polytheism            |
| 0x04BD4A92   | Pottery               |
| 0x04BD4AA6   | Radio                 |
| 0x04BD4ABA   | Railroad              |
| 0x04BD4ACE   | Recycling             |
| 0x04BD4AE2   | Refining              |
| 0x04BD4AF6   | Refrigeration         |
| 0x04BD4B0A   | The Republic          |
| 0x04BD4B1E   | Robotics              |
| 0x04BD4B32   | Rocketry              |
| 0x04BD4B46   | Sanitation            |
| 0x04BD4B5A   | Seafaring             |
| 0x04BD4B6E   | Space Flight          |
| 0x04BD4B82   | Stealth               |
| 0x04BD4B96   | Steam Engine          |
| 0x04BD4BAA   | Steel                 |
| 0x04BD4BBE   | Superconductor        |
| 0x04BD4BD2   | Tactics               |
| 0x04BD4BE6   | Theology              |
| 0x04BD4BFA   | Theory of Gravity     |
| 0x04BD4C0E   | Trade                 |
| 0x04BD4C22   | University            |
| 0x04BD4C36   | Warrior Code          |

Note: First tech in list ("Advanced Flight") not present — appears to start at Bridge Building.
Region `0x04BD4600`–`0x04BD460A` may contain "Advanced Flight" and "Alphabet" (gap before Bridge Building).

## Tech Tree Struct (abbreviated names)

- **Base:** `0x00627684`, stride 16 bytes/entry, 90 entries
- Bytes 12–14 of each entry = 3-char abbreviated tech name (null-terminated)
- Table is **sorted alphabetically**, NOT by tech index
- Bytes 0–1 = string resource ID (892–981), NOT a game tech index
- Bytes 6–9 appear to encode prerequisite tech indices (0xFE/0xFF = none/-2)

## Building Name String Table

- **Region:** `0x04BD4D80` area
- Variable-length null-terminated strings
- Found:
  - 0x04BD4D80  "Barracks"
  - 0x04BD4D99  "Granary"
  - 0x04BD4DE4  "Library"
  - 0x04BD4E2F  "Aqueduct"
  - 0x04BD4E48  "Bank"
  - 0x04BD4E61  "Cathedral"
  - 0x04BD4E7A  "University"
  - 0x04BD4EAC  "Colosseum"
  - 0x04BD4EC5  "Factory"
  - 0x04BD4F29  "Power Plant"

## Civilization & Leader Names

- **Region:** `0x04BD5A00`–`0x04BD5E00`
- Variable-length null-terminated strings
- Government title strings appear first (Comrade, High Priest, Consul, President, etc.)
- Then alternating male/female leader names, civ names (plural + adjective):

| Address      | String          | Type                |
|--------------|-----------------|---------------------|
| 0x04BD5A00   | Comrade         | govt title (Communism male) |
| 0x04BD5A0F   | Comrade         | govt title (Communism female) |
| 0x04BD5A1E   | Fundamentalism  | govt title          |
| 0x04BD5A2D   | High Priest     | govt title          |
| 0x04BD5A3C   | High Priestess  | govt title          |
| 0x04BD5A4B   | Republic        | govt title          |
| 0x04BD5A5A   | Consul          | govt title          |
| 0x04BD5A69   | Consul          | govt title          |
| 0x04BD5A78   | Democracy       | govt title          |
| 0x04BD5A87   | President       | govt title          |
| 0x04BD5A96   | President       | govt title          |
| 0x04BD5AA5   | Caesar          | leader (Romans male) |
| 0x04BD5ABD   | Livia           | leader (Romans female) |
| 0x04BD5AD5   | Romans          | civ name (plural)   |
| 0x04BD5AED   | Roman           | civ name (adjective)|
| 0x04BD5B05   | Dictator        | govt title          |
| 0x04BD5B0E   | Dictator        | govt title          |
| 0x04BD5B17   | Imperator       | govt title          |
| 0x04BD5B21   | Imperatrix      | govt title          |
| 0x04BD5B2C   | Hammurabi       | leader (Babylonians male) |
| 0x04BD5B44   | Ishtari         | leader (Babylonians female) |
| 0x04BD5B5C   | Babylonians     | civ name (plural)   |
| 0x04BD5B74   | Babylonian      | civ name (adjective)|
| 0x04BD5B8C   | Frederick       | leader (Germans male) |
| 0x04BD5BA4   | Maria Theresa   | leader (Germans female) |
| 0x04BD5BBC   | Germans         | civ name (plural)   |
| 0x04BD5BD4   | German          | civ name (adjective)|
| 0x04BD5C18   | Ramesses        | leader (Egyptians male) |
| 0x04BD5C30   | Cleopatra       | leader (Egyptians female) |
| 0x04BD5C48   | Egyptians       | civ name (plural)   |
| 0x04BD5C60   | Egyptian        | civ name (adjective)|
| 0x04BD5C78   | Pharaoh         | govt title          |
| 0x04BD5CA4   | Abe Lincoln     | leader (Americans male) |
| 0x04BD5CBC   | E. Roosevelt    | leader (Americans female) |
| 0x04BD5CD4   | Americans       | civ name (plural)   |
| 0x04BD5CEC   | American        | civ name (adjective)|
| 0x04BD5D26   | Alexander       | leader (Greeks male) |
| 0x04BD5D3E   | Hippolyta       | leader (Greeks female) |
| 0x04BD5D56   | Greeks          | civ name (plural)   |
| 0x04BD5D6E   | Greek           | civ name (adjective)|
| 0x04BD5DA4   | Mohandas Gandhi | leader (Indians male) |
| 0x04BD5DBC   | Indira Gandhi   | leader (Indians female) |
| 0x04BD5DD4   | Indians         | civ name (plural)   |
| 0x04BD5DEC   | Indian          | civ name (adjective)|

## Notes

- All game string/static data lives in the `0x04BD4000`–`0x04BD6000` region
- `0x757xxxxx` and `0x76xxxxxx` addresses are system DLLs — ignore those hits
- Pattern scan for `01 00 01 00 01 00` too generic — 230+ false positives in stack/DLL space
- Unit type stats table found at `0x0064B1C4`, stride 20 bytes — see `unit_type_stats.md`
