# Difficulty Byte — `0x00655B02`

## Encoding

| Value | Difficulty |
|-------|-----------|
| 0 | Chieftain |
| 1 | Warlord |
| 2 | Prince |
| 3 | King |
| 4 | Emperor |
| 5 | Deity |

## Confirmed Values

| Difficulty | Observed | Source |
|-----------|----------|--------|
| Chieftain | **0** | Snapshot `turn_0000_0x0_chieftain.bin` (all zeros pre-game) |
| Deity | **5** | Snapshot `turn_0000_80x50_chieftain.bin` (session 2, 2026-03-28) |

## Address Bug Fix (session 2)

Session 1 and initial session 2 used **wrong address** `0x00655B02` (offset `0x12`).
Cross-referencing Chieftain vs Deity snapshots byte-by-byte revealed:
- Offset `0x12` = 0 in both games (NOT difficulty)
- Offset `0x14` = 0 (Chieftain) vs 5 (Deity) — **this is the real difficulty byte**

Fixed in both `sniff-game.py` and `read-snapshot.py` (2026-03-28).

## Address Details

- **Absolute address:** `0x00655B04` = globals base `0x00655AF0` + offset `0x14`
- **Type:** u8
- **Region:** globals (64 bytes starting at `0x00655AF0`)
- **Previous wrong address:** `0x00655B02` (offset `0x12`) — this byte is always 0

## Nearby Bytes (globals +0x10..+0x17)

```
offset: 0x12  0x13  0x14  0x15
values: 00    05    DD    CC
```
Where DD=difficulty, CC=active_civ. Offset `0x13` = 05 in all tested games
(Chieftain/5civ, Deity/5civ, Deity/3civ) — NOT civ count, purpose unknown.

## Chieftain vs Deity Differences Observed

| Feature | Chieftain | Deity |
|---------|-----------|-------|
| Starting gold (human) | 50 | 0 |
| Starting Settlers (human) | 1 | 2 |
| AI units veteran | No | Yes |
| Civ Tutorial popup | Yes | No |
| Number of active civs | 4 (civs 1,4,5,6) | 5 (civs 1,2,4,5,7) |

## Game Teardown Behavior

When quitting a game and starting a new one:
1. All units instantly cleared from unit array ("UNIT KILLED" for each)
2. Changes/poll drops from 6 (in-game) to 7 (title screen)
3. Civ struct fields are **NOT zeroed** between games
4. New world gen **overwrites** old values (e.g. gold 50→0, techs 1→0)
5. ~25 seconds of dialog clicking, then world gen fires in one burst (~5ms)
