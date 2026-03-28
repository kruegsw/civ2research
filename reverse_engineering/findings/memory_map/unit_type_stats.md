# Unit Type Stats Table

Discovered 2026-03-27 via sniff-game.py + pattern scan (Nuclear Msl atk=99 anchor + Warriors/Armor cross-check).

## Table Location

- **Base address:** `0x0064B1C4`
- **Stride:** 20 bytes per entry
- **Count:** 60 entries (indices 0–59)
- **Formula:** `addr(unit N) = 0x0064B1C4 + N * 20`

## Struct Layout (20 bytes per entry)

| Offset | Size | Field      | Notes                                          |
|--------|------|------------|------------------------------------------------|
| 0      | 1    | attack     | Attack strength                                |
| 1      | 1    | defense    | Defense strength                               |
| 2      | 1    | HP         | Max hitpoints (= hp_factor × 10)              |
| 3      | 1    | FP         | Firepower                                      |
| 4      | 1    | moves      | Movement points                                |
| 5      | 1    | carry      | Cargo capacity (transports) or 0               |
| 6      | 1    | role       | AI role (0=attack, 1=defense, 2=sea, 3=intercept, 4=transport, 5=settler, 6=diplomat, 7=caravan) |
| 7      | 1    | prereq     | Prerequisite tech index (0xFF=none, 0xFE=no prereq/disabled) |
| 8–11   | 4    | sprite_id  | String/sprite resource ID (LE int32, sequential starting ~0x424) |
| 12–15  | 4    | flags      | Unit capability flags (LE int32, see below)    |
| 16     | 1    | obs_tech?  | Possibly obsolescence tech index (TBD)         |
| 17     | 1    | domain?    | Possibly domain — 0=land, 1=air, 2=sea (mostly consistent but some anomalies in extra/test units) |
| 18–19  | 2    | unknown    | Possibly cost-related (TBD)                    |

## Complete Unit Stats (all 60 entries)

```
 #  Name             Addr       Atk  Def   HP  FP  Mov  Car  Rol  Pre | Full 20 bytes
 0  Settlers         0x0064B1C4   0    1   20   1    4    0    5  nil | 00 01 14 01 04 00 05 FF 24 04 00 00 00 00 00 00 FF 00 06 00
 1  Engineers        0x0064B1D8   0    2   20   1    4    0    5   28 | 00 02 14 01 04 00 05 1C 25 04 00 00 00 00 00 00 1D 00 03 00
 2  Warriors         0x0064B1EC   1    1   10   1    1    0    1  nil | 01 01 0A 01 01 00 01 FF 26 04 00 00 00 00 00 00 1D 00 03 00
 3  Phalanx          0x0064B200   1    2   10   1    2    0    1    8 | 01 02 0A 01 02 00 01 08 27 04 00 00 00 00 00 00 23 00 03 00
 4  Archers          0x0064B214   3    2   10   1    3    0    1   86 | 03 02 0A 01 03 00 01 56 28 04 00 00 00 00 00 00 23 00 03 00
 5  Legion           0x0064B228   4    2   10   1    4    0    1   39 | 04 02 0A 01 04 00 01 27 29 04 00 00 00 04 00 00 23 00 03 00
 6  Pikemen          0x0064B23C   1    2   10   1    2    0    1   29 | 01 02 0A 01 02 00 01 1D 2A 04 00 00 00 00 00 00 11 00 03 00
 7  Musketeers       0x0064B250   3    3   20   1    3    0    1   35 | 03 03 14 01 03 00 01 23 2B 04 00 00 00 08 00 00 FF 00 03 00
 8  Fanatics         0x0064B264   4    4   20   1    2    0    1   31 | 04 04 14 01 02 00 01 1F 2C 04 00 00 02 02 00 00 FF 00 03 00
 9  Partisans        0x0064B278   4    4   20   1    5    0    1   34 | 04 04 14 01 05 00 01 22 2D 04 00 00 00 02 00 00 FF 00 03 00
10  Alpine Troops    0x0064B28C   5    5   20   1    5    0    1   81 | 05 05 14 01 05 00 01 51 2E 04 00 00 00 00 00 00 FF 00 03 00
11  Riflemen         0x0064B2A0   5    4   20   1    4    0    1   17 | 05 04 14 01 04 00 01 11 2F 04 00 00 04 00 00 00 FF 00 03 00
12  Marines          0x0064B2B4   8    5   20   1    6    0    0    2 | 08 05 14 01 06 00 00 02 30 04 00 00 00 01 00 00 FF 00 03 00
13  Paratroopers     0x0064B2C8   6    4   20   1    6    0    1   13 | 06 04 14 01 06 00 01 0D 31 04 00 00 00 00 00 00 FF 00 09 00
14  Mech. Inf.       0x0064B2DC   6    6   30   1    5    0    1   40 | 06 06 1E 01 05 00 01 28 32 04 00 00 00 00 00 00 0B 00 06 00
15  Horsemen         0x0064B2F0   2    1   10   1    2    0    0   36 | 02 01 0A 01 02 00 00 24 33 04 00 00 00 00 00 00 40 00 06 00
16  Chariot          0x0064B304   3    1   10   1    3    0    0   87 | 03 01 0A 01 03 00 00 57 34 04 00 00 00 00 00 00 37 00 06 00
17  Elephant         0x0064B318   4    1   10   1    4    0    0   64 | 04 01 0A 01 04 00 00 40 35 04 00 00 00 00 00 00 2A 00 06 00
18  Crusaders        0x0064B32C   5    1   10   1    4    0    0   55 | 05 01 0A 01 04 00 00 37 36 04 00 00 00 00 00 00 2A 00 06 00
19  Knights          0x0064B340   4    2   10   1    4    0    0   11 | 04 02 0A 01 04 00 00 0B 37 04 00 00 00 00 00 00 51 00 06 00
20  Dragoons         0x0064B354   5    2   20   1    5    0    0   42 | 05 02 14 01 05 00 00 2A 38 04 00 00 00 00 00 00 35 00 06 00
21  Cavalry          0x0064B368   8    3   20   1    6    0    0   81 | 08 03 14 01 06 00 00 51 39 04 00 00 00 00 00 00 FF 00 09 00
22  Armor            0x0064B37C  10    5   30   1    8    0    0   53 | 0A 05 1E 01 08 00 00 35 3A 04 00 00 00 00 00 00 33 00 03 00
23  Catapult         0x0064B390   6    1   10   1    4    0    0   49 | 06 01 0A 01 04 00 00 31 3B 04 00 00 00 00 00 00 2C 00 03 00
24  Cannon           0x0064B3A4   8    1   20   1    4    0    0   51 | 08 01 14 01 04 00 00 33 3C 04 00 00 00 00 00 00 48 00 03 00
25  Artillery        0x0064B3B8  10    1   20   2    5    0    0   44 | 0A 01 14 02 05 00 00 2C 3D 04 00 00 40 00 00 00 FF 00 06 00
26  Howitzer         0x0064B3CC  12    2   30   2    7    0    0   72 | 0C 02 1E 02 07 00 00 48 3E 04 00 00 11 00 00 00 4D 01 1E 01
27  Fighter          0x0064B3E0   4    3   20   2    6    0    3   30 | 04 03 14 02 06 00 03 1E 3F 04 00 00 01 00 00 00 4D 01 18 02
28  Bomber           0x0064B3F4  12    1   20   2   12    0    0    0 | 0C 01 14 02 0C 00 00 00 40 04 00 00 01 40 00 00 FF 01 12 00
29  Helicopter       0x0064B408  10    3   20   2   10    0    0   13 | 0A 03 14 02 0A 00 00 0D 41 04 00 00 11 00 00 00 FF 01 2A 01
30  Stlth Ftr.       0x0064B41C   8    4   20   2    8    0    3   77 | 08 04 14 02 08 00 03 4D 42 04 00 00 01 00 00 00 FF 01 24 02
31  Stlth Bmbr.      0x0064B430  14    5   20   2   16    0    0   77 | 0E 05 14 02 10 00 00 4D 43 04 00 00 20 00 00 00 39 02 09 00
32  Trireme          0x0064B444   1    1   10   1    4    2    4   46 | 01 01 0A 01 04 02 04 2E 44 04 00 00 00 00 00 00 2D 02 09 00
33  Caravel          0x0064B458   2    1   10   1    4    3    4   57 | 02 01 0A 01 04 03 04 39 45 04 00 00 00 00 00 00 25 02 0C 00
34  Galleon          0x0064B46C   0    2   20   1    4    4    4   45 | 00 02 14 01 04 04 04 2D 46 04 00 00 00 00 00 00 17 02 0C 00
35  Frigate          0x0064B480   4    2   20   1    5    2    2   45 | 04 02 14 01 05 02 02 2D 47 04 00 00 00 00 00 00 17 02 0C 00
36  Ironclad         0x0064B494   4    4   30   1    6    0    2   78 | 04 04 1E 01 06 00 02 4E 48 04 00 00 01 40 00 00 FF 02 12 00
37  Destroyer        0x0064B4A8   4    4   30   1    6    0    2   23 | 04 04 1E 01 06 00 02 17 49 04 00 00 01 40 00 00 49 02 0F 00
38  Cruiser          0x0064B4BC   6    6   30   2    8    0    2   79 | 06 06 1E 02 08 00 02 4F 4A 04 00 00 01 60 00 00 FF 02 0F 00
39  AEGIS Cruiser    0x0064B4D0   8    8   30   2   10    0    2   73 | 08 08 1E 02 0A 00 02 49 4B 04 00 00 01 00 00 00 FF 02 0C 00
40  Battleship       0x0064B4E4  12   12   40   2   16    0    2    5 | 0C 0C 28 02 10 00 02 05 4C 04 00 00 09 00 00 00 FF 02 09 00
41  Submarine        0x0064B4F8  10    2   30   2    6    0    2   14 | 0A 02 1E 02 06 00 02 0E 4D 04 00 00 81 00 00 00 FF 02 0F 00
42  Carrier          0x0064B50C   1    9   40   2   16    0    2    0 | 01 09 28 02 10 00 02 00 4E 04 00 00 00 00 00 00 FF 02 0F 00
43  Transport        0x0064B520   0    3   30   1    5    8    4   37 | 00 03 1E 01 05 08 04 25 4F 04 00 00 00 10 00 00 FF 01 24 01
44  Cruise Msl.      0x0064B534  18    0   10   3    6    0    0   73 | 12 00 0A 03 06 00 00 49 50 04 00 00 00 10 00 00 FF 01 30 01
45  Nuclear Msl.     0x0064B548  99    0   10   1   16    0    0   73 | 63 00 0A 01 10 00 00 49 51 04 00 00 02 00 00 00 1B 00 06 00
46  Diplomat         0x0064B55C   0    0   10   1    3    0    6   88 | 00 00 0A 01 03 00 06 58 52 04 00 00 03 00 00 00 FF 00 09 00
47  Spy              0x0064B570   0    0   10   1    3    0    6   27 | 00 00 0A 01 03 00 06 1B 53 04 00 00 02 00 00 00 13 00 03 00
48  Caravan          0x0064B584   0    1   10   1    5    0    7   84 | 00 01 0A 01 05 00 07 54 54 04 00 00 02 00 00 00 FF 00 06 00
49  Freight          0x0064B598   0    1   10   1    5    0    7   19 | 00 01 0A 01 05 00 07 13 55 04 00 00 02 02 00 00 22 00 03 00
50  Explorer         0x0064B5AC   0    1   10   1    3    0    0   75 | 00 01 0A 01 03 00 00 4B 56 04 00 00 00 00 00 00 FF 00 03 00
51  Extra Land       0x0064B5C0   1    1   10   1    5    0    0  254 | 01 01 0A 01 05 00 00 FE 57 04 00 00 00 00 00 00 FF 02 0C 00
52  Extra Ship       0x0064B5D4   4    2   20   1    5    1    2  254 | 04 02 14 01 05 01 02 FE 58 04 00 00 00 00 00 00 FF 01 18 04
53  Extra Air        0x0064B5E8   8    8   20   2   10    0    0  254 | 08 08 14 02 0A 00 00 FE 59 04 00 00 00 00 00 00 FF 01 18 04
54  Test Unit 1      0x0064B5FC   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5A 04 00 00 00 00 00 00 FF 00 03 00
55  Test Unit 2      0x0064B610   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5B 04 00 00 00 00 00 00 FF 00 03 00
56  Test Unit 3      0x0064B624   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5C 04 00 00 00 00 00 00 FF 00 03 00
57  Test Unit 4      0x0064B638   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5D 04 00 00 00 00 00 00 FF 00 03 00
58  Test Unit 5      0x0064B64C   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5E 04 00 00 00 00 00 00 FF 00 03 00
59  Test Unit 6      0x0064B660   0    1   20   1    4    0    5  254 | 00 01 14 01 04 00 05 FE 5F 04 00 00 00 00 00 00 FF 00 03 00
```

## Role Values (byte[6])

| Value | AI Role      | Examples                          |
|-------|--------------|-----------------------------------|
| 0     | Attack       | Armor, Cavalry, Bomber, ...       |
| 1     | Defense      | Phalanx, Warriors, Musketeers, ...|
| 2     | Sea Attack   | Frigate, Destroyer, Cruiser, ...  |
| 3     | Intercept    | Fighter, Stlth Ftr.               |
| 4     | Transport    | Trireme, Caravel, Galleon, Transport |
| 5     | Settler      | Settlers, Engineers               |
| 6     | Diplomat     | Diplomat, Spy                     |
| 7     | Caravan      | Caravan, Freight                  |

## Prerequisite Tech Index (byte[7])

Tech index corresponds to the alphabetical position in the @CIVILIZE tech list (0-indexed):
- 0xFF (255) = nil (no prerequisite, unit always available)
- 0xFE (254) = "no" (disabled — Extra/Test units only)
- Selected mappings confirmed: Bro(Bronze Working)=8, Feu(Feudalism)=29

## Sprite/Resource IDs (bytes 8–11)

Sequential LE int32 values starting at 0x0424 (1060):
- Settlers = 0x424, Engineers = 0x425, Warriors = 0x426, ..., Test Unit 6 = 0x45F

## Flags (bytes 12–15, LE int32)

Some confirmed flag values (partially decoded):
- 0x0001 = can make surprise attacks / special capability
- 0x0002 = ?
- 0x0004 = marine (can attack from sea)
- 0x0008 = ?
- 0x0011 = helicopter-specific flags
- 0x0020 = ?
- 0x0040 = ?
- 0x0081 = submarine flags
- 0x4001 = Destroyer-class (surprise attack + long-range)
- 0x6001 = Cruiser (surprise attack + extra capability)

Full correspondence to RULES.TXT 15-bit flag field is TBD.

## Notes

- Domain (land/air/sea) field: byte[17] appears to encode domain for most units
  (0=land, 1=air, 2=sea) but shows anomalies in Extra/Test units — TBD
- HP field: stored as hitpoint_factor × 10 (e.g., hp_factor=1 → 10 HP)
- Byte[16]: appears to be obsolescence tech index (TBD — 0xFF = never obsolete)
- Bytes[18-19]: possibly cost in shields (TBD)
