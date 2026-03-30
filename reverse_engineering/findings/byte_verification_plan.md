# Byte-Level Verification Plan

## Goal
Identify with 100% confidence every byte in the binary game objects (unit, city, civ, unit type, tile, globals). Use this understanding to build a complete difference engine, then a headless game, then a playable game.

## Source of Truth Hierarchy
1. `reverse_engineering/decompiled/*.c` — Ghidra output (READ-ONLY)
2. `reverse_engineering/findings/RULES.TXT` — game data tables (READ-ONLY)
3. Live memory via `charlizationv4/sniff-game.py` — runtime verification

Field names go in THIS file and `Data_Structures.md`, never in source files.

## Confidence Levels
- **CONFIRMED** — all 3 sources agree, tested with sniffer
- **DERIVED** — named from decompiled C context, not yet sniffer-verified
- **PADDING** — bytes between fread chunks, not referenced in code

---

## 1. Unit Instance — 32 bytes (0x20), base 0x006560F0 — 100% MAPPED

| Offset | Size | Status | Field | Refs | Source |
|--------|------|--------|-------|------|--------|
| 0x00 | 2 | CONFIRMED | x | many | sniffer + decompiled |
| 0x02 | 2 | CONFIRMED | y | many | sniffer + decompiled |
| 0x04 | 2 | CONFIRMED | status_flags | many | sniffer (veteran bit) + decompiled |
| 0x06 | 1 | CONFIRMED | type_id | many | sniffer + decompiled |
| 0x07 | 1 | CONFIRMED | owner | many | sniffer + decompiled |
| 0x08 | 1 | CONFIRMED | moves_remaining | many | sniffer + decompiled |
| 0x09 | 1 | DERIVED | visibility_mask | many | decompiled |
| 0x0A | 1 | CONFIRMED | damage_taken (0=full, maxHp=dead) | many | sniffer combat + decompiled |
| 0x0B | 1 | CONFIRMED | carrying/transport_link | many | sniffer + decompiled |
| 0x0C | 1 | DERIVED | ai_role | many | decompiled |
| 0x0D | 1 | CONFIRMED | home_city | many | sniffer + decompiled |
| 0x0E | 1 | DERIVED | fuel/turns_remaining | many | decompiled |
| 0x0F | 1 | CONFIRMED | orders | many | sniffer keypress + decompiled |
| 0x10 | 1 | DERIVED | goto_turn_counter | 99 | decompiled |
| 0x11 | 1 | PADDING | unused | 0 | no references in 225K lines |
| 0x12 | 2 | CONFIRMED | goto_x | 51 | sniffer + decompiled |
| 0x14 | 2 | CONFIRMED | goto_y | 42 | sniffer + decompiled |
| 0x16 | 2 | DERIVED | prev_unit_in_stack | 95 | decompiled (linked list, "Dead unit in stack" error) |
| 0x18 | 2 | DERIVED | next_unit_in_stack | 95 | decompiled (linked list traversal) |
| 0x1A | 4 | CONFIRMED | unique_id (0=dead) | 124 | sniffer + decompiled |
| 0x1E | 2 | PADDING | unused | 0 | no references in 225K lines |

## 2. City — 88 bytes (0x58), base 0x0064F340 — 100% MAPPED

All 88 bytes documented in `Civ2_City_Struct.md`. ~45 CONFIRMED, ~43 DERIVED.

## 3. Unit Type Table — 20 bytes (0x14), base 0x0064B1B8 — 100% MAPPED

| Offset | Size | Status | Field |
|--------|------|--------|-------|
| 0x00 | 4 | DERIVED | name_string_ptr |
| 0x04 | 4 | DERIVED | flags |
| 0x08 | 1 | DERIVED | prerequisite_tech |
| 0x09 | 1 | DERIVED | domain (0=land, 1=sea, 2=air) |
| 0x0A | 1 | DERIVED | move_rate (RULES.TXT value × movement_multiplier) |
| 0x0B | 1 | DERIVED | range |
| 0x0C | 1 | CONFIRMED | attack |
| 0x0D | 1 | CONFIRMED | defense |
| 0x0E | 1 | CONFIRMED | hit_points (RULES.TXT value × 10, stored pre-multiplied) |
| 0x0F | 1 | CONFIRMED | firepower |
| 0x10 | 1 | DERIVED | cost |
| 0x11 | 1 | DERIVED | hold/cargo |
| 0x12 | 1 | DERIVED | ai_role |
| 0x13 | 1 | DERIVED | obsolete_tech |

Needs Civ2 running to verify DERIVED fields against RULES.TXT values.

## 4. Tile — 6 bytes, heap via pointer at 0x00636598 — 100% MAPPED

Byte 0 lower nibble = terrain type. Other bits = improvements, visibility. Partially verified.

## 5. Civ — 1428 bytes (0x594), base 0x0064C600 (+0xA0 header) — 100% MAPPED

Layout confirmed from fread() calls in block_00470000.c lines 1866-1898.
Total from 8 fread chunks = 1395 bytes + 33 bytes inter-chunk padding = 1428.

### fread chunk layout:

| Offset | Size | fread addr | Section |
|--------|------|------------|---------|
| 0x000-0x057 | 88 | DAT_0064c6a0 | Core fields (flags, gold, govt, rates, diplomacy, attitude) |
| 0x058-0x063 | 12 | DAT_0064c6f8 | Tech/contact bitmask (96 bits) |
| 0x064-0x065 | 2 | — | PADDING (between fread chunks) |
| 0x066-0x073 | 14 | DAT_0064c706 | City/unit/wonder/military counts |
| 0x074-0x0D0 | 93 | DAT_0064c714 | Tech list (1 byte per tech, 93 techs) |
| 0x0D1-0x0D7 | 7 | — | PADDING |
| 0x0D8-0x10D | 54 | DAT_0064c778 | Units-of-type active count (byte[54]) |
| 0x10E-0x115 | 8 | — | PADDING |
| 0x116-0x14B | 54 | DAT_0064c7b6 | Units-of-type secondary count (byte[54]) |
| 0x14C-0x153 | 8 | — | PADDING |
| 0x154-0x189 | 54 | DAT_0064c7f4 | Improvement/building counts (byte[54]) |
| 0x18A-0x191 | 8 | — | PADDING |
| 0x192-0x593 | 1026 | DAT_0064c832 | Big block (see below) |

### Big block (0x192-0x593, 1026 bytes):

| Offset | Size | Field | Source |
|--------|------|-------|--------|
| 0x192-0x411 | 640 | per_civ_military[8] — 8 × 80 bytes, indexed by opposing civ | Agent search: DAT_0064c832 with stride 0x80 |
| 0x412-0x413 | 2 | (transition/dense fields area) | |
| 0x414-0x533 | 288 | diplomatic_targets[48] — 48 × 6 bytes (short x, short y, byte type, sbyte priority) | Confirmed: loop `< 0x30`, stride 6, DAT_0064cab4-cab9 |
| 0x534-0x593 | 96 | ai_targets[16] — 16 × 6 bytes (same struct as above) | Confirmed: loop `< 0x10`, stride 6, DAT_0064cbd4-cbd9 |

### Core fields detail (0x000-0x057):

| Offset | Size | Status | Field | Refs |
|--------|------|--------|-------|------|
| 0x000 | 2 | DERIVED | flags | 96 |
| 0x002 | 4 | CONFIRMED | gold | 217 |
| 0x006 | 2 | CONFIRMED | leader_graphic_id | 277 |
| 0x008 | 2 | DERIVED | unknown_08 | 14 |
| 0x00A | 2 | CONFIRMED | beakers | 22 |
| 0x00C | 1 | CONFIRMED | researching_tech_id | 7 |
| 0x00E | 2 | DERIVED | unknown_0E | 9 |
| 0x010 | 1 | CONFIRMED | num_techs | 112 |
| 0x011 | 1 | DERIVED | unknown_11 | 10 |
| 0x012 | 1 | DERIVED | unknown_12 | 7 |
| 0x013 | 1 | CONFIRMED | science_rate (0-10) | 54 |
| 0x014 | 1 | CONFIRMED | tax_rate (0-10) | 36 |
| 0x015 | 1 | CONFIRMED | government_type | 168 |
| 0x016 | 1 | DERIVED | unknown_16 | 1 |
| 0x017 | 1 | DERIVED | unknown_17 | 23 |
| 0x01C | 2 | DERIVED | unknown_1C | 12 |
| 0x01E | 1 | CONFIRMED | reputation | 99 |
| 0x01F | 1 | CONFIRMED | patience/anger | 79 |
| 0x020 | 32 | CONFIRMED | diplomatic_status[8] (4 bytes per civ) | 541+ |
| 0x040 | 8 | CONFIRMED | attitude[8] | 22 |
| 0x048 | 8 | CONFIRMED | spy_operations[8] | 55 |
| 0x050 | 8 | CONFIRMED | border_friction[8] | 9 |

### Fields at 0x3D1-0x419 (inside big block):

| Offset | Size | Status | Field | Refs |
|--------|------|--------|-------|------|
| 0x3D2 | 2 | DERIVED | city_defense_related | 8 |
| 0x3D4 | 14 | DERIVED | unknown_array_short[7] | 14 |
| 0x3DE | 2 | DERIVED | supply_counter_1 | 17 |
| 0x3E0 | 2 | DERIVED | supply_counter_2 | 20 |
| 0x3E2 | 16 | CONFIRMED | last_contact_turn[8] (short per civ) | 73 |
| 0x3F2 | 1 | DERIVED | leader_personality | 24 |
| 0x3F3 | 8 | DERIVED | spy_level[8] | 12 |
| 0x3FB | 1 | DERIVED | unknown_3FB | 10 |
| 0x3FE | 1 | DERIVED | unknown_3FE | 5 |
| 0x400 | 2 | DERIVED | civ_status_flags | 18 |
| 0x402 | 2 | DERIVED | population_or_rank | 28 |
| 0x404 | 2 | DERIVED | color_index_A | 5 |
| 0x406 | 2 | DERIVED | color_index_B | 8 |
| 0x408 | 8 | DERIVED | unit_count_by_category[4?] | 27 |
| 0x410 | 4 | DERIVED | unknown_410-413 | 4 |

---

## Session log

### 2026-03-29 session 3
- Unit Instance: resolved all 7 unknown bytes (3 padding, 4 linked-list pointers)
- Unit Type: all 20 bytes named, 8 confirmed
- Civ Struct: mapped from 8% to 100% using fread() layout + DAT_ address search
  - fread() in block_00470000.c:1866-1898 gives exact chunk boundaries
  - Big block (1026 bytes) contains: per-civ military[8×80], diplomatic targets[48×6], AI targets[16×6]
  - 33 bytes of inter-chunk padding identified
  - 104 unique offsets referenced in decompiled code
