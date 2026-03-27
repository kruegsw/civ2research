#!/usr/bin/env python3
"""
sniff-game.py — Read Civ2 game state directly from process memory

Usage: python charlizationv4/sniff-game.py [--log game.log] [--interval 2]

Reads civ2.exe process memory at known DAT_ addresses (from Ghidra
decompilation). Polls every N seconds, diffs state, logs changes.

Requires: Windows (uses ReadProcessMemory API)
No dependencies beyond Python standard library.
"""

import ctypes
import ctypes.wintypes as wt
import struct
import sys
import time
import os

# ═══════════════════════════════════════════════════════════════════
# Win32 API setup
# ═══════════════════════════════════════════════════════════════════

kernel32 = ctypes.windll.kernel32
PROCESS_VM_READ = 0x0010
PROCESS_QUERY_INFORMATION = 0x0400
TH32CS_SNAPPROCESS = 0x00000002

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wt.DWORD),
        ("cntUsage", wt.DWORD),
        ("th32ProcessID", wt.DWORD),
        ("th32DefaultHeapID", ctypes.POINTER(ctypes.c_ulong)),
        ("th32ModuleID", wt.DWORD),
        ("cntThreads", wt.DWORD),
        ("th32ParentProcessID", wt.DWORD),
        ("pcPriClassBase", ctypes.c_long),
        ("dwFlags", wt.DWORD),
        ("szExeFile", ctypes.c_char * 260),
    ]

def find_process(name):
    """Find a process by executable name, return PID or None."""
    snap = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    entry = PROCESSENTRY32()
    entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
    if kernel32.Process32First(snap, ctypes.byref(entry)):
        while True:
            if entry.szExeFile.decode('utf-8', errors='ignore').lower() == name.lower():
                pid = entry.th32ProcessID
                kernel32.CloseHandle(snap)
                return pid
            if not kernel32.Process32Next(snap, ctypes.byref(entry)):
                break
    kernel32.CloseHandle(snap)
    return None

def open_process(pid):
    """Open process for memory reading."""
    handle = kernel32.OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, False, pid)
    if not handle:
        raise RuntimeError(f"Cannot open process {pid} (try running as Administrator)")
    return handle

def read_mem(handle, address, size):
    """Read bytes from process memory."""
    buf = ctypes.create_string_buffer(size)
    bytes_read = ctypes.c_size_t()
    ok = kernel32.ReadProcessMemory(handle, ctypes.c_void_p(address), buf, size, ctypes.byref(bytes_read))
    if not ok:
        return None
    return buf.raw[:bytes_read.value]

def read_i32(handle, addr):
    data = read_mem(handle, addr, 4)
    return struct.unpack('<i', data)[0] if data and len(data) == 4 else None

def read_i16(handle, addr):
    data = read_mem(handle, addr, 2)
    return struct.unpack('<h', data)[0] if data and len(data) == 2 else None

def read_u8(handle, addr):
    data = read_mem(handle, addr, 1)
    return data[0] if data and len(data) == 1 else None

def read_bytes(handle, addr, n):
    return read_mem(handle, addr, n)

# ═══════════════════════════════════════════════════════════════════
# Civ2 memory addresses (from Ghidra decompilation)
# These are absolute virtual addresses in the civ2.exe process
# ═══════════════════════════════════════════════════════════════════

# Game state globals
ADDR_TURN_COUNT    = 0x00655af8  # DAT_00655af8 — turns passed
ADDR_DIFFICULTY    = 0x00655b02  # DAT_00655b02 — difficulty level
ADDR_ACTIVE_CIV    = 0x00655b05  # DAT_00655b05 — current active civ
ADDR_HUMAN_PLAYERS = 0x00655b0b  # DAT_00655b0b — human player bitmask
ADDR_TOTAL_UNITS   = 0x00655b16  # DAT_00655b16 — total unit count
ADDR_TOTAL_CITIES  = 0x00655b18  # DAT_00655b18 — total city count
ADDR_MAP_WIDTH     = 0x006d1160  # DAT_006d1160 — map width (doubled-X)
ADDR_MAP_HEIGHT    = 0x006d1162  # DAT_006d1162 — map height
ADDR_MAP_SEED      = 0x006d1168  # DAT_006d1168 — map seed

# Array bases
ADDR_CITY_ARRAY    = 0x0064f340  # DAT_0064f340 — city array (stride 0x58)
ADDR_UNIT_ARRAY    = 0x006560f0  # DAT_006560f0 — unit array (stride 0x20)
ADDR_CIV_ARRAY     = 0x0064c600  # DAT_0064c600 — civ array (stride 0x594)

CITY_STRIDE = 0x58
UNIT_STRIDE = 0x20
CIV_STRIDE  = 0x594

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

ORDER_NAMES = {
    0: 'fortify', 1: 'sentry', 2: 'fortress', 3: 'road', 4: 'irrigate',
    5: 'mine', 6: 'transform', 7: 'clean', 8: 'fortress2', 9: 'airbase',
    10: 'load', 11: 'goto', 12: 'no_orders', 27: 'goto_ai', 255: 'none'
}

DIFF_KEYS = ['prince', 'king', 'emperor', 'deity']

# ═══════════════════════════════════════════════════════════════════
# State reading
# ═══════════════════════════════════════════════════════════════════

def read_unit(handle, idx):
    base = ADDR_UNIT_ARRAY + idx * UNIT_STRIDE
    data = read_bytes(handle, base, UNIT_STRIDE)
    if not data or len(data) < UNIT_STRIDE:
        return None
    x = struct.unpack_from('<h', data, 0)[0]
    y = struct.unpack_from('<h', data, 2)[0]
    unit_type = data[6]
    owner = data[7]
    moves = data[10]
    order = data[15]
    home_city = data[16]
    unit_id = struct.unpack_from('<i', data, 0x1A)[0]
    goto_x = struct.unpack_from('<h', data, 0x12)[0]
    goto_y = struct.unpack_from('<h', data, 0x14)[0]
    alive = unit_id != 0
    name = UNIT_NAMES[unit_type] if unit_type < len(UNIT_NAMES) else f'Type{unit_type}'
    order_name = ORDER_NAMES.get(order, f'ord_{order}')
    return dict(idx=idx, x=x, y=y, type=unit_type, name=name, owner=owner,
                moves=moves, order=order, orderName=order_name,
                homeCity=home_city, alive=alive, id=unit_id,
                gotoX=goto_x, gotoY=goto_y)

def read_city(handle, idx):
    base = ADDR_CITY_ARRAY + idx * CITY_STRIDE
    data = read_bytes(handle, base, CITY_STRIDE)
    if not data or len(data) < CITY_STRIDE:
        return None
    x = struct.unpack_from('<h', data, 0)[0]
    y = struct.unpack_from('<h', data, 2)[0]
    owner = data[8]
    size = data[9]
    food = struct.unpack_from('<h', data, 0x1a)[0]
    shields = struct.unpack_from('<h', data, 0x1c)[0]
    prod_item = struct.unpack_from('<b', data, 0x39)[0]
    exists = struct.unpack_from('<i', data, 0x54)[0]
    name_bytes = data[0x20:0x30]
    name = name_bytes.split(b'\x00')[0].decode('ascii', errors='replace')
    return dict(idx=idx, x=x, y=y, owner=owner, size=size, name=name,
                food=food, shields=shields, prodItem=prod_item, exists=exists)

def read_state(handle):
    turn = read_i16(handle, ADDR_TURN_COUNT)
    difficulty = read_u8(handle, ADDR_DIFFICULTY)
    active_civ = read_u8(handle, ADDR_ACTIVE_CIV)
    total_units = read_i16(handle, ADDR_TOTAL_UNITS)
    total_cities = read_i16(handle, ADDR_TOTAL_CITIES)
    map_w = read_i16(handle, ADDR_MAP_WIDTH)
    map_h = read_i16(handle, ADDR_MAP_HEIGHT)

    units = []
    for i in range(min(total_units or 0, 512)):
        u = read_unit(handle, i)
        if u and u['alive']:
            units.append(u)

    cities = []
    for i in range(min(total_cities or 0, 256)):
        c = read_city(handle, i)
        if c and c['exists'] != 0:
            cities.append(c)

    return dict(turn=turn, difficulty=difficulty, activeCiv=active_civ,
                totalUnits=total_units, totalCities=total_cities,
                mapW=map_w, mapH=map_h, units=units, cities=cities)

# ═══════════════════════════════════════════════════════════════════
# Diffing
# ═══════════════════════════════════════════════════════════════════

def diff_states(prev, curr):
    lines = []
    if prev['turn'] != curr['turn']:
        lines.append(f"\n{'═'*60}")
        lines.append(f"Turn {curr['turn']} | Active civ: {curr['activeCiv']}")
        lines.append('═'*60)

    # City changes
    pc = {c['idx']: c for c in prev['cities']}
    for c in curr['cities']:
        p = pc.get(c['idx'])
        if not p:
            lines.append(f"  NEW CITY: {c['name']} (civ {c['owner']}) at ({c['x']},{c['y']})")
            continue
        ch = []
        if p['size'] != c['size']: ch.append(f"size {p['size']}→{c['size']}")
        if p['food'] != c['food']: ch.append(f"food {p['food']}→{c['food']}")
        if p['shields'] != c['shields']: ch.append(f"shld {p['shields']}→{c['shields']}")
        if p['prodItem'] != c['prodItem']: ch.append(f"prod {p['prodItem']}→{c['prodItem']}")
        if ch:
            lines.append(f"  {c['name']} (civ {c['owner']}): {', '.join(ch)}")

    # Unit changes
    pu = {u['id']: u for u in prev['units']}
    moved, created, died = [], [], []
    for u in curr['units']:
        p = pu.pop(u['id'], None)
        if not p:
            created.append(u)
        elif p['x'] != u['x'] or p['y'] != u['y']:
            moved.append((p, u))
    for u in pu.values():
        died.append(u)

    if moved:
        lines.append(f"  Moved ({len(moved)}):")
        for p, u in moved[:15]:
            goto = f" →({u['gotoX']},{u['gotoY']})" if u['order'] in (11, 27) else ""
            lines.append(f"    {u['name']} (civ {u['owner']}) ({p['x']},{p['y']})→({u['x']},{u['y']}) [{u['orderName']}{goto}]")
        if len(moved) > 15:
            lines.append(f"    ... +{len(moved)-15} more")
    if created:
        lines.append(f"  Created ({len(created)}):")
        for u in created[:5]:
            lines.append(f"    {u['name']} (civ {u['owner']}) at ({u['x']},{u['y']}) home={u['homeCity']}")
    if died:
        lines.append(f"  Died ({len(died)}):")
        for u in died[:5]:
            lines.append(f"    {u['name']} (civ {u['owner']}) at ({u['x']},{u['y']})")

    return lines

# ═══════════════════════════════════════════════════════════════════
# Main loop
# ═══════════════════════════════════════════════════════════════════

def main():
    log_file = None
    interval = 1.0

    args = sys.argv[1:]
    if '--log' in args:
        idx = args.index('--log')
        log_file = args[idx + 1]
        args = args[:idx] + args[idx+2:]
    if '--interval' in args:
        idx = args.index('--interval')
        interval = float(args[idx + 1])
        args = args[:idx] + args[idx+2:]

    def log(text):
        print(text)
        if log_file:
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write(text + '\n')

    log("Civ2 Memory Sniffer")
    log(f"Polling every {interval}s")
    if log_file:
        log(f"Logging to: {log_file}")

    # Find Civ2 process
    log("\nLooking for civ2.exe...")
    handle = None
    while handle is None:
        pid = find_process('civ2.exe')
        if pid:
            log(f"Found civ2.exe (PID {pid})")
            try:
                handle = open_process(pid)
                log("Process opened for reading")
            except RuntimeError as e:
                log(f"Error: {e}")
                sys.exit(1)
        else:
            sys.stdout.write('.')
            sys.stdout.flush()
            time.sleep(2)

    # Read initial state
    prev = read_state(handle)
    log(f"\nInitial state: Turn {prev['turn']} | Map {prev['mapW']}x{prev['mapH']}")
    log(f"Cities: {len(prev['cities'])} | Units: {len(prev['units'])}")
    for c in prev['cities'][:5]:
        log(f"  {c['name']} (civ {c['owner']}) size={c['size']} food={c['food']} shld={c['shields']} prod={c['prodItem']}")
    if len(prev['cities']) > 5:
        log(f"  ... +{len(prev['cities'])-5} more")

    log(f"\nWatching for changes (Ctrl+C to stop)...")

    try:
        while True:
            time.sleep(interval)
            try:
                curr = read_state(handle)
            except Exception:
                log("\nProcess closed or inaccessible")
                break

            if curr['turn'] is None:
                continue  # process might be loading

            lines = diff_states(prev, curr)
            if lines:
                for line in lines:
                    log(line)
                prev = curr
    except KeyboardInterrupt:
        log("\nStopped.")

    kernel32.CloseHandle(handle)

if __name__ == '__main__':
    main()
