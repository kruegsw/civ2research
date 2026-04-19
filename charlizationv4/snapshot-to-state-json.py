#!/usr/bin/env python3
"""
snapshot-to-state-json.py — Convert a CIV2SNAP sniffer dump to JSON in
the same schema as dump-server-state.js output, for field-level diffing.

Usage: python snapshot-to-state-json.py <snapshot.bin>

Side A of the fidelity diff. Starting small: top-level scalars only
(turn, difficulty, activeCiv, counts) plus per-civ treasury/government/
research from the civs region. Per-unit and per-city records are
intentionally omitted until the scalar diff is clean.
"""

import json
import struct
import sys

# ── CIV2SNAP parser ──────────────────────────────────────────────────

def parse_snapshot(path):
    with open(path, 'rb') as f:
        data = f.read()
    if data[:8] != b'CIV2SNAP':
        raise ValueError(f"Not a CIV2SNAP file: {path}")
    region_count = struct.unpack_from('<I', data, 8)[0]
    regions = {}
    off = 12
    entries = []
    for _ in range(region_count):
        name = data[off:off+16].rstrip(b'\x00').decode('ascii')
        addr = struct.unpack_from('<I', data, off+16)[0]
        size = struct.unpack_from('<I', data, off+20)[0]
        entries.append((name, addr, size))
        off += 24
    for name, addr, size in entries:
        regions[name] = (addr, data[off:off+size])
        off += size
    return regions


# ── Field offsets ────────────────────────────────────────────────────
# 'globals' region starts at absolute 0x00655af0 and is 64 bytes long.
# Offsets below are RELATIVE to the region base (= abs_addr - GLOBALS_BASE).
GLOBALS_BASE = 0x00655af0
GLOBAL_FIELDS = {
    # logical_name: (offset_within_region, struct_fmt)
    # Memory addresses derived from save-file offsets using the verified
    # save→mem linear mapping (delta = 0x00655ADC). Earlier version of
    # this file used sniff-game.py's ADDR dict, which had several wrong
    # offsets (difficulty, globalWarming). The linear mapping is correct
    # for fields that have both save and memory representations.
    'turn':          (0x00655af8 - GLOBALS_BASE, '<H'),     # save +0x1C
    # currentYear is signed i16 — negative = BC (e.g. -3900 = 3900 BC at
    # turn 3). Earlier "yearIncrement" label was wrong; this is the year
    # itself, computed from turn by block_00480000.c:1817.
    'currentYear':   (0x00655afa - GLOBALS_BASE, '<h'),     # save +0x1E
    'activeUnit':    (0x00655afe - GLOBALS_BASE, '<h'),     # save +0x22 (selectedUnit)
    'activeCiv':     (0x00655b03 - GLOBALS_BASE, '<B'),     # save +0x27 (activeHumanPlayer)
    # NOTE: 0x00655b05 was labeled 'activeCiv' in sniff-game.py ADDR but
    # that's actually a different field (possibly currently-rotating civ).
    # The PLAYER's civ (parser's 'activeHumanPlayer') is at save +0x27 = mem +0xB03.
    'difficulty':    (0x00655b08 - GLOBALS_BASE, '<B'),     # save +0x2C
    'civsAlive':     (0x00655b0a - GLOBALS_BASE, '<B'),     # save +0x2E
    'humanPlayers':  (0x00655b0b - GLOBALS_BASE, '<B'),     # save +0x2F
    'globalWarming': (0x00655b0f - GLOBALS_BASE, '<B'),     # save +0x33
    'totalUnits':    (0x00655b16 - GLOBALS_BASE, '<H'),     # save +0x3A
    'totalCities':   (0x00655b18 - GLOBALS_BASE, '<H'),     # save +0x3C
}

# 'civs' region: 8 records × 0x594 bytes, abs base 0x0064c600.
# Offsets below are within each 1428-byte record.
CIV_STRIDE = 0x594
CIV_FIELDS = {
    'flags':            (0xA0, '<H'),
    'treasury':         (0xA2, '<i'),
    'researchProgress': (0xA8, '<H'),
    'researchingTech':  (0xAA, '<B'),
    # NOTE: 0xB3 = science, 0xB4 = tax (confirmed by byte_verification_plan.md
    # line 121-122 and fix_plan.md:54-55; parser.js also agrees). Earlier
    # versions of this file and compare-snapshots.js had them swapped.
    'scienceRate':      (0xB3, '<B'),
    'taxRate':          (0xB4, '<B'),
    'government':       (0xB5, '<B'),
    # reputation is at data-block offset 0x1E (CONFIRMED in
    # byte_verification_plan.md), which maps to memory +0xA0 + 0x1E = 0xBE.
    # Earlier version of this map had it at 0xB6 (which is auth unknown_16).
    'reputation':       (0xBE, '<B'),
    'patience':         (0xBF, '<B'),
}

# 'units' region: 512 records × 0x20 bytes. Offsets from authoritative
# byte_verification_plan.md (CONFIRMED layout). Earlier versions of this
# file had wrong offsets for veteran, gotoX, gotoY, homeCity — the labels
# matched compare-snapshots.js but compare-snapshots.js itself was wrong.
UNIT_STRIDE = 0x20
UNIT_FIELDS = {
    'x':           (0x00, '<H'),
    'y':           (0x02, '<H'),
    'statusFlags': (0x04, '<H'),   # bit 0x2000 = veteran (high byte bit 0x20)
    'type':        (0x06, '<B'),
    'owner':       (0x07, '<B'),
    # +0x08 is moves_SPENT this turn, not remaining. Verified live
    # 2026-04-18: a Settler at (67,13) moves_spent went 0 (pre-move,
    # fresh active unit) to 3 (post-move, used full 1-move allotment).
    # Earlier label "movesLeft" was the opposite of the actual meaning.
    'moveSpent':   (0x08, '<B'),
    'visibility':  (0x09, '<B'),   # visibility_mask
    'damageTaken': (0x0A, '<B'),   # 0 = full health, maxHp = dead
    'carrying':    (0x0B, '<B'),   # transport link (0xFF = not carried)
    'aiRole':      (0x0C, '<B'),
    # +0x0D is workTurns_or_cargo per live-game sniffer (sniff-game.py
    # UNIT_BYTE_MAP), NOT home_city. Earlier label was wrong.
    'workTurnsOrCargo': (0x0D, '<b'),  # signed: Settlers=work turns, etc.
    'fuel':        (0x0E, '<B'),   # air unit fuel / remaining turns
    'order':       (0x0F, '<B'),
    # home_city is the u16 at +0x10 (0xFFFF sentinel = none). Parser.js
    # reads this the same way; matches observed values in fresh games
    # where all starting Settlers have homeCity=0xFF.
    'homeCity':    (0x10, '<H'),
    'gotoX':       (0x12, '<h'),
    'gotoY':       (0x14, '<h'),
    'prevInStack': (0x16, '<H'),
    'nextInStack': (0x18, '<H'),
    'unitId':      (0x1A, '<I'),
}

# 'cities' region: 256 records × 0x58 bytes. Field offsets from compare-snapshots.js.
CITY_STRIDE = 0x58
CITY_FIELDS = {
    'x':            (0x00, '<H'),
    'y':            (0x02, '<H'),
    'owner':        (0x08, '<B'),
    'size':         (0x09, '<B'),
    'foodStored':   (0x1A, '<H'),
    'shieldStored': (0x1C, '<H'),
    'tradeTotal':   (0x1E, '<H'),
}


def read(buf, off, fmt):
    return struct.unpack_from(fmt, buf, off)[0]


def main():
    if len(sys.argv) < 2:
        print("Usage: snapshot-to-state-json.py <snapshot.bin>", file=sys.stderr)
        sys.exit(1)

    path = sys.argv[1]
    regions = parse_snapshot(path)

    missing = [r for r in ('globals', 'civs') if r not in regions]
    if missing:
        print(f"Snapshot missing required regions: {missing}", file=sys.stderr)
        sys.exit(1)

    _, globals_buf = regions['globals']
    _, civs_buf    = regions['civs']

    game_state = {}

    # Top-level scalars from 'globals' region
    for name, (off, fmt) in GLOBAL_FIELDS.items():
        game_state[name] = read(globals_buf, off, fmt)

    # Per-civ fields
    civs = []
    for i in range(8):
        base = i * CIV_STRIDE
        civ = {'slot': i}
        if base + CIV_STRIDE <= len(civs_buf):
            for name, (off, fmt) in CIV_FIELDS.items():
                civ[name] = read(civs_buf, base + off, fmt)
        civs.append(civ)
    game_state['civs'] = civs

    # Per-unit records: iterate only up to totalUnits (rest are unused slots).
    # Dead units are marked by unique_id (u32 at +0x1A) == 0 per
    # byte_verification_plan.md §1. Parser.js filters these out via an
    # out-of-bounds check (dead slots have x=0xFF38 / -200); we mirror
    # that by skipping unique_id == 0 so diff counts match.
    if 'units' in regions and game_state.get('totalUnits', 0) > 0:
        _, ubuf = regions['units']
        units = []
        for i in range(game_state['totalUnits']):
            base = i * UNIT_STRIDE
            if base + UNIT_STRIDE > len(ubuf):
                break
            unit = {'slot': i}
            for name, (off, fmt) in UNIT_FIELDS.items():
                unit[name] = read(ubuf, base + off, fmt)
            if unit.get('unitId', 0) == 0:
                continue  # skip dead slot
            unit['veteran'] = 1 if (unit.get('statusFlags', 0) & 0x2000) else 0
            units.append(unit)
        game_state['units'] = units

    # Per-city records
    if 'cities' in regions and game_state.get('totalCities', 0) > 0:
        _, cbuf = regions['cities']
        cities = []
        for i in range(game_state['totalCities']):
            base = i * CITY_STRIDE
            if base + CITY_STRIDE > len(cbuf):
                break
            city = {'slot': i}
            for name, (off, fmt) in CITY_FIELDS.items():
                city[name] = read(cbuf, base + off, fmt)
            # City name: null-terminated ASCII at offset 0x20, 16 bytes max
            name_bytes = cbuf[base + 0x20 : base + 0x30]
            nul = name_bytes.find(b'\x00')
            if nul >= 0:
                name_bytes = name_bytes[:nul]
            city['name'] = name_bytes.decode('ascii', errors='replace')
            cities.append(city)
        game_state['cities'] = cities

    # Wonders (28 × i16 city IDs, -1/0xFFFF = not built, 0xFFEF = destroyed)
    if 'wonders' in regions:
        _, wbuf = regions['wonders']
        game_state['wonders'] = [
            read(wbuf, i * 2, '<h') for i in range(28) if i * 2 + 2 <= len(wbuf)
        ]

    # nextUnitId — binary's monotonic unit-creation counter
    # (DAT_00627fd8). First 4 bytes of the `unit_counter` region.
    # Lets us verify v3's state.nextUnitId stays in sync with the
    # binary's counter (critical for uid-assignment fidelity).
    if 'unit_counter' in regions:
        _, ucbuf = regions['unit_counter']
        if len(ucbuf) >= 4:
            game_state['nextUnitId'] = read(ucbuf, 0, '<I')

    # snap_meta — sniffer-emitted capture metadata: u64 time_ms at
    # snapshot capture, u32 flags, u32 reserved. Lets the harness route
    # events precisely by timestamp instead of using a heuristic window.
    # Old snapshots (pre-2026-04-19 sniffer) don't have this region; the
    # harness falls back to the window heuristic in that case.
    if 'snap_meta' in regions:
        _, mbuf = regions['snap_meta']
        if len(mbuf) >= 8:
            game_state['snapTimeMs'] = read(mbuf, 0, '<Q')

    # Tile visibility per civ — byte 4 of each 6-byte tile record is the
    # civ-visibility bitmask (bit N = civ N has seen this tile). Emit
    # per-civ count of visible tiles so the diff can validate fog-reveal
    # without comparing ~12KB of raw bytes. Map dimensions come from the
    # snapshot's tiles region (ms = bytecount / 6).
    if 'tiles' in regions:
        _, tbuf = regions['tiles']
        ms = len(tbuf) // 6
        vis_counts = [0] * 8
        for i in range(ms):
            vis_byte = tbuf[i * 6 + 4]
            for civ in range(8):
                if vis_byte & (1 << civ): vis_counts[civ] += 1
        game_state['visibilityCounts'] = vis_counts

    out = {
        'source': 'real-civ2-sniffer',
        'snapshotPath': path,
        'N': 0,
        'gameState': game_state,
    }
    json.dump(out, sys.stdout, indent=2)
    sys.stdout.write('\n')


if __name__ == '__main__':
    main()
