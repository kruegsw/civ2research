# Next Sniffing Session — Byte Verification Focus

Updated after session 3 (2026-03-28/29). Shifted from ad-hoc data capture to systematic byte-level verification.

See `byte_verification_plan.md` for the full 4-phase plan.

---

## Resolved (sessions 1-3)

- ✓ Difficulty byte at `0x00655B04` (0=Chieftain..5=Deity)
- ✓ All DAT_ addresses match real process memory
- ✓ Tile format (6 bytes, shared pairs)
- ✓ Unit/city/civ struct strides confirmed
- ✓ Civ struct base +0xA0 header confirmed
- ✓ Warriors cost = 10 shields (RULES.TXT cost=1 × 10 rows = 10)
- ✓ Beakers sentinel = 0xFFFF (no research target)
- ✓ Unit transit states (-1200, -600, -1400, -800) — multiple codes exist
- ✓ Shield overflow carries forward
- ✓ AI food box = 13 - difficulty (DAT_00655b08)
- ✓ Order byte mapping: 1=fortify, 2=fortified, 3=sleep, 5=road, 6=irrigate, 7=mine, 8=transform, 9=clean_pollution, 11=goto, 27=goto_ai
- ✓ Unit HP field (0x0A) = damage taken (0=full health, maxHp=dead)
- ✓ Unit type HP in memory already ×10 (no additional multiply)
- ✓ DAT_00655afe = active/attacking unit index
- ✓ Diplomacy: contact/ceasefire/peace/alliance/war bits confirmed
- ✓ Attitude values change on diplomatic events
- ✓ Building names mapped to RULES.TXT @IMPROVE indices
- ✓ Wonder completion deferred until city is viewed
- ✓ Civ names resolved via leader_graphic_id → RULES.TXT @LEADERS

---

## Priority 1: Complete Unit Instance (7 unknown bytes)

Offsets 0x11, 0x16-0x19, 0x1E-0x1F are unread/unknown.

**Method:** Search decompiled C for every reference to these offsets in the unit struct. Cross-reference with save file parser. Verify with sniffer by observing changes.

## Priority 2: Verify City Struct Fields

All 88 bytes have names from Ghidra but many are DERIVED (not sniffer-confirmed). Key unverified:
- flags byte individual bits (0x04-0x07)
- worker_tiles encoding (0x16-0x19)
- trade route data (0x3B-0x49)
- tile_improvements (0x34-0x38)

## Priority 3: Civ Struct Deep Dive

The 1428-byte civ struct has huge sections we've only mapped from decompiled C. Key areas:
- 0x58-0x65 tech/contact bitmask (12 bytes)
- 0x66-0x73 city/unit counts
- 0x74-0x104 tech list (93 bytes)
- Military power, ranking, spaceship fields

## Priority 4: Unit Cost Field (still unknown)

WHERE does the game store unit shield cost for production? The mechanism reading from `DAT_0064c48c` (building cost table) is clear for buildings, but unit production cost lookup is still unclear.

## Priority 5: Transit State Codes

Multiple transit coordinates observed: -1200, -600, -800, -1400. What determines which code is used? Domain (land/sea/air)? Movement type? Need systematic testing.

---

## Notes for sniffing sessions

- Run: `python charlizationv4/sniff-game.py --log charlizationv4/game.log --hooks`
- Sniffer now tracks: units, cities, civs, diplomacy, attitude, friction, dialogs, combat, building names, tech names, civ names, happiness, improvements, AI roles
- For focused byte reads, use Python directly against process memory
- All analysis docs are in `reverse_engineering/` — decompiled C files are READ-ONLY
- Field names go in `Data_Structures.md` and `findings/` docs, never in decompiled source
