#!/usr/bin/env python3
"""
read-snapshot.py — Parse and diff CIV2SNAP binary snapshots

Usage:
  python charlizationv4/read-snapshot.py <snapshot.bin>          # dump all regions
  python charlizationv4/read-snapshot.py <a.bin> <b.bin>         # diff two snapshots
  python charlizationv4/read-snapshot.py <a.bin> <b.bin> --tiles # include tile diff
  python charlizationv4/read-snapshot.py <a.bin> --region tiles  # dump one region

Output is human-readable hex + decoded fields where known.
All offsets are relative to each region's base address.

No pip dependencies.
"""

import struct
import sys
import os

# ═══════════════════════════════════════════════════════════════════
# CIV2SNAP parser
# ═══════════════════════════════════════════════════════════════════

def parse_snapshot(path):
    """Parse a CIV2SNAP file. Returns dict of {region_name: (addr, bytes)}."""
    with open(path, 'rb') as f:
        data = f.read()

    if data[:8] != b'CIV2SNAP':
        raise ValueError(f"Not a CIV2SNAP file: {path}")

    region_count = struct.unpack_from('<I', data, 8)[0]
    table_offset = 12

    regions = {}
    offsets = []
    for i in range(region_count):
        off = table_offset + i * 24
        name   = data[off:off+16].rstrip(b'\x00').decode('ascii')
        addr   = struct.unpack_from('<I', data, off+16)[0]
        size   = struct.unpack_from('<I', data, off+20)[0]
        regions[name] = (addr, size)
        offsets.append((name, addr, size))

    data_offset = table_offset + region_count * 24
    result = {}
    for name, addr, size in offsets:
        result[name] = (addr, data[data_offset:data_offset+size])
        data_offset += size

    return result

# ═══════════════════════════════════════════════════════════════════
# Hex dump utility
# ═══════════════════════════════════════════════════════════════════

def hexdump(data, base_addr=0, width=16, max_rows=None):
    lines = []
    for i in range(0, len(data), width):
        if max_rows and i // width >= max_rows:
            lines.append(f"  ... ({len(data) - i} more bytes)")
            break
        chunk = data[i:i+width]
        hex_part  = ' '.join(f'{b:02x}' for b in chunk)
        ascii_part = ''.join(chr(b) if 32 <= b < 127 else '.' for b in chunk)
        lines.append(f"  {base_addr+i:08x}:  {hex_part:<{width*3}}  {ascii_part}")
    return '\n'.join(lines)

# ═══════════════════════════════════════════════════════════════════
# Region dumpers
# ═══════════════════════════════════════════════════════════════════

DIFF_NAMES = ['Chieftain','Warlord','Prince','King','Emperor','Deity']
GOV_NAMES  = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy']
UNIT_NAMES = [
    'Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen',
    'Musketeers','Fanatics','Partisans','Alpine','Riflemen','Marines',
    'Paratroopers','Mech Inf','Horsemen','Chariot','Elephant','Crusaders',
    'Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery',
    'Howitzer','Fighter','Bomber','Helicopter','Stealth F','Stealth B',
    'Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer',
    'Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport',
    'Cruise Msl','Nuclear Msl','Diplomat','Spy','Caravan','Freight','Explorer'
]
TERRAIN_NAMES = ['Desert','Plains','Grassland','Forest','Hills','Mountains',
                 'Tundra','Arctic','Swamp','Jungle','Ocean','?']
ORDER_NAMES = {
    0:'fortify', 1:'sentry', 2:'fortress', 3:'road', 4:'irrigate',
    5:'mine', 6:'transform', 7:'clean', 8:'fortress2', 9:'airbase',
    10:'load', 11:'goto', 12:'no_orders', 27:'goto_ai', 255:'none'
}

def dump_globals(addr, data):
    print(f"  [globals @ 0x{addr:08x}, {len(data)} bytes]")
    if len(data) >= 0x18:
        turn         = struct.unpack_from('<h', data, 0x08)[0]
        year_inc     = struct.unpack_from('<h', data, 0x0a)[0]
        active_unit  = struct.unpack_from('<h', data, 0x0e)[0]
        diff         = data[0x12]
        gw           = data[0x13]
        poll         = data[0x14]
        active_civ   = data[0x15]
        human_mask   = data[0x1b] if len(data) > 0x1b else '?'
        diff_name    = DIFF_NAMES[diff] if diff < len(DIFF_NAMES) else f'?{diff}'
        print(f"  turn={turn}  year_inc={year_inc}  active_unit={active_unit}")
        print(f"  difficulty={diff} ({diff_name})  pollution={poll}  global_warming={gw}")
        print(f"  active_civ={active_civ}  human_mask=0x{human_mask:02x}")
    print(hexdump(data, addr, max_rows=8))

def dump_map_dims(addr, data):
    print(f"  [map_dims @ 0x{addr:08x}, {len(data)} bytes]")
    if len(data) >= 14:
        mw2      = struct.unpack_from('<H', data, 0)[0]
        mh       = struct.unpack_from('<H', data, 2)[0]
        ms       = struct.unpack_from('<H', data, 4)[0]
        shape    = struct.unpack_from('<H', data, 6)[0]
        seed     = struct.unpack_from('<I', data, 8)[0]
        qw       = struct.unpack_from('<H', data, 12)[0] if len(data) >= 14 else '?'
        wrap     = 'cylindrical' if shape == 0 else f'shape={shape}'
        print(f"  mw2={mw2} mh={mh} ms={ms} seed=0x{seed:08x} wrap={wrap} qw={qw}")
    print(hexdump(data, addr, max_rows=4))

def dump_civs(addr, data):
    CIV_STRIDE = 0x594
    print(f"  [civs @ 0x{addr:08x}, {len(data)} bytes — {len(data)//CIV_STRIDE} civs]")
    for i in range(min(8, len(data) // CIV_STRIDE)):
        off  = i * CIV_STRIDE
        gov  = data[off + 0xB5]
        sci  = data[off + 0xB3]
        tax  = data[off + 0xB4]
        ntechs = data[off + 0xB0]
        gold = struct.unpack_from('<H', data, off + 0xA2)[0]
        beakers = struct.unpack_from('<H', data, off + 0xAA)[0]
        research = data[off + 0xAC]
        gov_name = GOV_NAMES[gov] if gov < len(GOV_NAMES) else f'gov{gov}'
        print(f"  Civ {i}: {gov_name:12s} sci={sci*10}% tax={tax*10}%  gold={gold}  beakers={beakers}  research={research}  techs={ntechs}")

def dump_units(addr, data):
    UNIT_STRIDE = 0x20
    total = len(data) // UNIT_STRIDE
    alive = []
    for i in range(total):
        off = i * UNIT_STRIDE
        uid = struct.unpack_from('<i', data, off + 0x1a)[0]
        if uid == 0: continue
        x, y    = struct.unpack_from('<hh', data, off)
        utype   = data[off + 6]
        owner   = data[off + 7]
        order   = data[off + 15]
        status  = struct.unpack_from('<H', data, off + 4)[0]
        veteran = (status >> 6) & 1
        name    = UNIT_NAMES[utype] if utype < len(UNIT_NAMES) else f'T{utype}'
        oname   = ORDER_NAMES.get(order, f'o{order}')
        vet_str = ' VET' if veteran else ''
        alive.append(f"  #{i:3d} {name:12s} civ={owner} ({x:4d},{y:4d}) {oname}{vet_str}")
    print(f"  [units @ 0x{addr:08x} — {len(alive)} alive]")
    for line in alive:
        print(line)

def dump_cities(addr, data):
    CITY_STRIDE = 0x58
    total = len(data) // CITY_STRIDE
    cities = []
    for i in range(total):
        off = i * CITY_STRIDE
        exists = struct.unpack_from('<i', data, off + 0x54)[0]
        if not exists: continue
        x, y  = struct.unpack_from('<hh', data, off)
        owner = data[off + 8]
        size  = data[off + 9]
        name  = data[off+0x20:off+0x30].split(b'\x00')[0].decode('ascii', errors='replace')
        food  = struct.unpack_from('<h', data, off + 0x1a)[0]
        shld  = struct.unpack_from('<h', data, off + 0x1c)[0]
        cities.append(f"  #{i:3d} {name:16s} civ={owner} ({x},{y}) sz={size} food={food} shld={shld}")
    print(f"  [cities @ 0x{addr:08x} — {len(cities)} cities]")
    for line in cities:
        print(line)

def dump_tiles(addr, data):
    ms = len(data) // 6
    print(f"  [tiles @ 0x{addr:08x}, {len(data)} bytes — {ms} tile records]")
    # Terrain frequency
    terrain_count = [0] * 12
    for i in range(ms):
        b0 = data[i * 6]
        ter = b0 & 0x0F
        terrain_count[min(ter, 11)] += 1
    print("  Terrain distribution:")
    for t, count in enumerate(terrain_count):
        if count:
            name = TERRAIN_NAMES[t] if t < len(TERRAIN_NAMES) else f'T{t}'
            pct = count * 100 // ms
            bar = '█' * (count * 30 // ms)
            print(f"    {name:10s} {count:5d} ({pct:2d}%) {bar}")
    print(f"  First 6 records (raw hex):")
    print(hexdump(data[:36], addr, width=6, max_rows=6))

def dump_wonders(addr, data):
    WONDER_NAMES = [
        'Pyramids','Hanging Gardens','Colossus','Lighthouse','Great Library',
        'Oracle','Great Wall','Sun Tzu','King Richard','Marco Polo',
        'Michelangelo','Copernicus','Magellan','Shakespeare','Da Vinci',
        'J.S. Bach','Adam Smith','Darwin','Statue of Liberty','Eiffel Tower',
        'Women Suffrage','Hoover Dam','Manhattan Project','United Nations',
        'Apollo Program','SETI Program','Cure for Cancer','Great Wonder 28'
    ]
    built = []
    for i in range(min(28, len(data) // 2)):
        city_id = struct.unpack_from('<h', data, i*2)[0]
        if city_id >= 0:
            wname = WONDER_NAMES[i] if i < len(WONDER_NAMES) else f'W{i}'
            built.append(f"{wname} (city #{city_id})")
    print(f"  [wonders @ 0x{addr:08x}]")
    if built:
        for w in built: print(f"    {w}")
    else:
        print("    (none built)")

def dump_region(name, addr, data):
    print(f"\n{'─'*60}")
    print(f"  {name.upper()}")
    print(f"{'─'*60}")
    if   name == 'globals':  dump_globals(addr, data)
    elif name == 'map_dims': dump_map_dims(addr, data)
    elif name == 'civs':     dump_civs(addr, data)
    elif name == 'units':    dump_units(addr, data)
    elif name == 'cities':   dump_cities(addr, data)
    elif name == 'tiles':    dump_tiles(addr, data)
    elif name == 'wonders':  dump_wonders(addr, data)
    else:
        print(f"  [{name} @ 0x{addr:08x}, {len(data)} bytes]")
        print(hexdump(data, addr, max_rows=16))

# ═══════════════════════════════════════════════════════════════════
# Diff
# ═══════════════════════════════════════════════════════════════════

def diff_snapshots(snap_a, snap_b, include_tiles=False):
    """Show byte-level differences between two snapshots, region by region."""
    all_names = sorted(set(snap_a) | set(snap_b))

    for name in all_names:
        if name == 'tiles' and not include_tiles:
            continue
        if name not in snap_a:
            print(f"\n  {name}: ADDED in B")
            continue
        if name not in snap_b:
            print(f"\n  {name}: REMOVED in B")
            continue

        addr_a, data_a = snap_a[name]
        addr_b, data_b = snap_b[name]

        if data_a == data_b:
            print(f"  {name}: unchanged")
            continue

        # Find changed byte ranges
        changed = []
        i = 0
        minlen = min(len(data_a), len(data_b))
        while i < minlen:
            if data_a[i] != data_b[i]:
                j = i
                while j < minlen and data_a[j] != data_b[j]:
                    j += 1
                changed.append((i, j))
                i = j
            else:
                i += 1

        print(f"\n{'─'*60}")
        print(f"  {name.upper()} — {len(changed)} changed range(s)")
        print(f"{'─'*60}")

        for start, end in changed[:32]:  # cap at 32 ranges
            size = end - start
            print(f"  +0x{start:05x} (abs 0x{addr_a+start:08x})  [{size} byte{'s' if size>1 else ''}]")
            a_hex = ' '.join(f'{b:02x}' for b in data_a[start:end])
            b_hex = ' '.join(f'{b:02x}' for b in data_b[start:end])
            print(f"    A: {a_hex}")
            print(f"    B: {b_hex}")

        if len(data_a) != len(data_b):
            print(f"  (size changed: {len(data_a)} → {len(data_b)} bytes)")

        if len(changed) > 32:
            print(f"  ... {len(changed)-32} more changed ranges omitted")

# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(0)

    include_tiles = '--tiles' in args
    args = [a for a in args if not a.startswith('--')]

    only_region = None
    if '--region' in sys.argv:
        i = sys.argv.index('--region')
        only_region = sys.argv[i+1]

    files = [a for a in args if not a.startswith('--')]

    if len(files) == 1:
        # Dump mode
        snap = parse_snapshot(files[0])
        print(f"CIV2SNAP: {os.path.basename(files[0])}")
        print(f"Regions: {', '.join(snap.keys())}")
        for name, (addr, data) in snap.items():
            if only_region and name != only_region:
                continue
            if name == 'tiles' and not include_tiles and not only_region:
                print(f"\n  tiles: {len(data)} bytes ({len(data)//6} records) — use --tiles to dump")
                continue
            dump_region(name, addr, data)

    elif len(files) == 2:
        # Diff mode
        snap_a = parse_snapshot(files[0])
        snap_b = parse_snapshot(files[1])
        print(f"DIFF: {os.path.basename(files[0])}  →  {os.path.basename(files[1])}")
        print(f"A regions: {', '.join(snap_a.keys())}")
        print(f"B regions: {', '.join(snap_b.keys())}")
        diff_snapshots(snap_a, snap_b, include_tiles=include_tiles)

    else:
        print("Usage: read-snapshot.py <file.bin> [file2.bin] [--tiles] [--region <name>]")
        sys.exit(1)

if __name__ == '__main__':
    main()
