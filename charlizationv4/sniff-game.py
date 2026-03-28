#!/usr/bin/env python3
"""
sniff-game.py — Read Civ2 game state directly from process memory in real-time

Usage: python charlizationv4/sniff-game.py [--log game.log]

Continuously reads civ2.exe process memory at known DAT_ addresses.
Detects every state change with millisecond timestamps.

Tracks: units, cities, civs (gold/gov/research/rates), global state.
Requires: Windows + Python 3.6+. No pip dependencies.
"""

import ctypes
import ctypes.wintypes as wt
import struct
import sys
import time

# ═══════════════════════════════════════════════════════════════════
# Win32 API
# ═══════════════════════════════════════════════════════════════════

kernel32 = ctypes.windll.kernel32
PROCESS_VM_READ = 0x0010
PROCESS_QUERY_INFORMATION = 0x0400
TH32CS_SNAPPROCESS = 0x00000002

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wt.DWORD), ("cntUsage", wt.DWORD),
        ("th32ProcessID", wt.DWORD), ("th32DefaultHeapID", ctypes.POINTER(ctypes.c_ulong)),
        ("th32ModuleID", wt.DWORD), ("cntThreads", wt.DWORD),
        ("th32ParentProcessID", wt.DWORD), ("pcPriClassBase", ctypes.c_long),
        ("dwFlags", wt.DWORD), ("szExeFile", ctypes.c_char * 260),
    ]

def find_process(name):
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
    handle = kernel32.OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, False, pid)
    if not handle:
        raise RuntimeError(f"Cannot open process {pid} (try running as Administrator)")
    return handle

def read_mem(handle, address, size):
    buf = ctypes.create_string_buffer(size)
    n = ctypes.c_size_t()
    ok = kernel32.ReadProcessMemory(handle, ctypes.c_void_p(address), buf, size, ctypes.byref(n))
    return buf.raw[:n.value] if ok and n.value == size else None

def ri32(h, a):
    d = read_mem(h, a, 4); return struct.unpack('<i', d)[0] if d else None
def ri16(h, a):
    d = read_mem(h, a, 2); return struct.unpack('<h', d)[0] if d else None
def ru16(h, a):
    d = read_mem(h, a, 2); return struct.unpack('<H', d)[0] if d else None
def ru8(h, a):
    d = read_mem(h, a, 1); return d[0] if d else None
def ri8(h, a):
    d = read_mem(h, a, 1); return struct.unpack('<b', d)[0] if d else None

# ═══════════════════════════════════════════════════════════════════
# Civ2 addresses (absolute virtual addresses from Ghidra)
# ═══════════════════════════════════════════════════════════════════

# Global state
ADDR = {
    'turn':         0x00655af8,  # i16 — turns passed
    'difficulty':   0x00655b02,  # u8  — difficulty (0-5)
    'activeCiv':    0x00655b05,  # u8  — whose turn
    'humanPlayers': 0x00655b0b,  # u8  — bitmask
    'totalUnits':   0x00655b16,  # i16
    'totalCities':  0x00655b18,  # i16
    'mapWidth':     0x006d1160,  # i16 — doubled-X
    'mapHeight':    0x006d1162,  # i16
    'mapSeed':      0x006d1168,  # i32
    'pollution':    0x00655b04,  # u8  — global pollution count
    'yearIncrement':0x00655afa,  # i16 — turns per year increment
}

# Arrays
UNIT_BASE  = 0x006560f0;  UNIT_STRIDE  = 0x20   # 32 bytes per unit
CITY_BASE  = 0x0064f340;  CITY_STRIDE  = 0x58   # 88 bytes per city
CIV_BASE   = 0x0064c600;  CIV_STRIDE   = 0x594  # 1428 bytes per civ

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
    0:'fortify', 1:'sentry', 2:'fortress', 3:'road', 4:'irrigate',
    5:'mine', 6:'transform', 7:'clean', 8:'fortress2', 9:'airbase',
    10:'load', 11:'goto', 12:'no_orders', 27:'goto_ai', 255:'none'
}
GOV_NAMES = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy']
DIFF_NAMES = ['Chieftain','Warlord','Prince','King','Emperor','Deity']

# ═══════════════════════════════════════════════════════════════════
# State reading
# ═══════════════════════════════════════════════════════════════════

def read_globals(h):
    return {k: (ri16(h,a) if k in ('turn','totalUnits','totalCities','mapWidth','mapHeight','yearIncrement')
                else ri32(h,a) if k == 'mapSeed'
                else ru8(h,a))
            for k,a in ADDR.items()}

def read_unit(h, idx):
    base = UNIT_BASE + idx * UNIT_STRIDE
    d = read_mem(h, base, UNIT_STRIDE)
    if not d or len(d) < UNIT_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    status = struct.unpack_from('<H', d, 4)[0]
    utype, owner = d[6], d[7]
    moves, order = d[10], d[15]
    home = d[16]
    goto_x, goto_y = struct.unpack_from('<hh', d, 0x12)
    uid = struct.unpack_from('<i', d, 0x1A)[0]
    veteran = (status >> 6) & 1
    name = UNIT_NAMES[utype] if utype < len(UNIT_NAMES) else f'T{utype}'
    return dict(idx=idx, x=x, y=y, type=utype, name=name, owner=owner,
                moves=moves, order=order, orderName=ORDER_NAMES.get(order, f'o{order}'),
                home=home, alive=uid!=0, id=uid, gotoX=goto_x, gotoY=goto_y,
                veteran=veteran, status=status)

def read_city(h, idx):
    base = CITY_BASE + idx * CITY_STRIDE
    d = read_mem(h, base, CITY_STRIDE)
    if not d or len(d) < CITY_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    flags = struct.unpack_from('<I', d, 4)[0]
    owner, size = d[8], d[9]
    food = struct.unpack_from('<h', d, 0x1A)[0]
    shields = struct.unpack_from('<h', d, 0x1C)[0]
    trade = struct.unpack_from('<h', d, 0x1E)[0]
    name = d[0x20:0x30].split(b'\x00')[0].decode('ascii', errors='replace')
    tile_bitmap = struct.unpack_from('<I', d, 0x30)[0]
    prod_item = struct.unpack_from('<b', d, 0x39)[0]
    exists = struct.unpack_from('<i', d, 0x54)[0]
    # Decode production item
    if prod_item >= 0 and prod_item < len(UNIT_NAMES):
        prod_name = UNIT_NAMES[prod_item]
    elif prod_item < 0:
        prod_name = f'Bldg{-prod_item-1}'
    else:
        prod_name = f'Item{prod_item}'
    return dict(idx=idx, x=x, y=y, owner=owner, size=size, name=name,
                food=food, shields=shields, trade=trade, prodItem=prod_item,
                prodName=prod_name, exists=exists, flags=flags,
                tileBitmap=tile_bitmap)

def read_civ(h, idx):
    base = CIV_BASE + idx * CIV_STRIDE
    # Read key fields
    gold = ru16(h, base + 0xA2)
    beakers = ru16(h, base + 0xAA)
    researching = ru8(h, base + 0xAC)
    num_techs = ru8(h, base + 0xB0)
    sci_rate = ru8(h, base + 0xB3)
    tax_rate = ru8(h, base + 0xB4)
    gov = ru8(h, base + 0xB5)
    reputation = ru8(h, base + 0xBE)
    gov_name = GOV_NAMES[gov] if gov is not None and gov < len(GOV_NAMES) else f'gov{gov}'
    # Read civ name (at offset 0xA0, 2 bytes before gold)
    name_data = read_mem(h, base + 0x00, 24)
    # Actually the name might be elsewhere in the struct — use a fallback
    return dict(idx=idx, gold=gold, beakers=beakers, researching=researching,
                numTechs=num_techs, sciRate=(sci_rate or 0)*10,
                taxRate=(tax_rate or 0)*10, gov=gov, govName=gov_name,
                reputation=reputation)

def read_state(h):
    g = read_globals(h)
    nu = min(g.get('totalUnits') or 0, 512)
    nc = min(g.get('totalCities') or 0, 256)
    units = [u for i in range(nu) if (u := read_unit(h, i)) and u['alive']]
    cities = [c for i in range(nc) if (c := read_city(h, i)) and c['exists']]
    civs = [read_civ(h, i) for i in range(8)]
    return dict(**g, units=units, cities=cities, civs=civs)

# ═══════════════════════════════════════════════════════════════════
# Diffing
# ═══════════════════════════════════════════════════════════════════

def diff_states(prev, curr, t0):
    lines = []
    ms = (time.perf_counter() - t0) * 1000

    # Turn / active civ change
    if prev['turn'] != curr['turn'] or prev['activeCiv'] != curr['activeCiv']:
        civ_type = 'human' if curr.get('humanPlayers',0) & (1 << (curr['activeCiv'] or 0)) else 'AI'
        lines.append(f"\n{'═'*60}")
        lines.append(f"Turn {curr['turn']} | Civ {curr['activeCiv']} ({civ_type}) active")
        lines.append('═' * 60)

    # Civ changes (gold, gov, research, rates)
    for i in range(8):
        p, c = prev['civs'][i], curr['civs'][i]
        ch = []
        if p['gold'] != c['gold']: ch.append(f"gold {p['gold']}→{c['gold']}")
        if p['gov'] != c['gov']: ch.append(f"gov {p['govName']}→{c['govName']}")
        if p['beakers'] != c['beakers']: ch.append(f"beakers {p['beakers']}→{c['beakers']}")
        if p['researching'] != c['researching']: ch.append(f"researching {p['researching']}→{c['researching']}")
        if p['sciRate'] != c['sciRate']: ch.append(f"sci {p['sciRate']}%→{c['sciRate']}%")
        if p['taxRate'] != c['taxRate']: ch.append(f"tax {p['taxRate']}%→{c['taxRate']}%")
        if p['numTechs'] != c['numTechs']: ch.append(f"techs {p['numTechs']}→{c['numTechs']}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  Civ {i}: {', '.join(ch)}")

    # City changes
    pc = {c['idx']: c for c in prev['cities']}
    for c in curr['cities']:
        p = pc.pop(c['idx'], None)
        if not p:
            lines.append(f"[{ms:10.1f}ms]  NEW CITY: {c['name']} (civ {c['owner']}) at ({c['x']},{c['y']})")
            continue
        ch = []
        if p['size'] != c['size']: ch.append(f"size {p['size']}→{c['size']}")
        if p['food'] != c['food']: ch.append(f"food {p['food']}→{c['food']}")
        if p['shields'] != c['shields']: ch.append(f"shld {p['shields']}→{c['shields']}")
        if p['trade'] != c['trade']: ch.append(f"trade {p['trade']}→{c['trade']}")
        if p['prodItem'] != c['prodItem']: ch.append(f"build {p['prodName']}→{c['prodName']}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  {c['name']} (civ {c['owner']}): {', '.join(ch)}")
    for c in pc.values():
        lines.append(f"[{ms:10.1f}ms]  CITY DESTROYED: {c['name']} (civ {c['owner']})")

    # Unit changes
    pu = {u['id']: u for u in prev['units']}
    for u in curr['units']:
        p = pu.pop(u['id'], None)
        if not p:
            lines.append(f"[{ms:10.1f}ms]  UNIT CREATED: {u['name']} (civ {u['owner']}) at ({u['x']},{u['y']}) home={u['home']}")
            continue
        ch = []
        if p['x'] != u['x'] or p['y'] != u['y']:
            goto = f" →({u['gotoX']},{u['gotoY']})" if u['order'] in (11, 27) else ""
            ch.append(f"({p['x']},{p['y']})→({u['x']},{u['y']}) [{u['orderName']}{goto}]")
        if p['order'] != u['order'] and not ch:
            ch.append(f"order {p['orderName']}→{u['orderName']}")
        if p['moves'] != u['moves'] and not ch:
            ch.append(f"moves {p['moves']}→{u['moves']}")
        if p['veteran'] != u['veteran']:
            ch.append(f"VETERAN!")
        if p['home'] != u['home']:
            ch.append(f"home {p['home']}→{u['home']}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  {u['name']} (civ {u['owner']}): {', '.join(ch)}")
    for u in pu.values():
        lines.append(f"[{ms:10.1f}ms]  UNIT KILLED: {u['name']} (civ {u['owner']}) at ({u['x']},{u['y']})")

    return lines

# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

def main():
    log_file = None
    args = sys.argv[1:]
    if '--log' in args:
        i = args.index('--log')
        log_file = args[i + 1]

    log_buf = []
    def log(text):
        print(text)
        if log_file: log_buf.append(text)
    def flush():
        nonlocal log_buf
        if log_buf and log_file:
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write('\n'.join(log_buf) + '\n')
            log_buf = []

    log("Civ2 Memory Sniffer (continuous)")
    if log_file:
        with open(log_file, 'w', encoding='utf-8') as f:
            f.write(f"Civ2 Sniffer — {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        log(f"Logging to: {log_file}")

    log("\nLooking for civ2.exe...")
    handle = None
    while not handle:
        pid = find_process('civ2.exe')
        if pid:
            log(f"Found civ2.exe (PID {pid})")
            handle = open_process(pid)
            log("Attached.")
        else:
            sys.stdout.write('.')
            sys.stdout.flush()
            time.sleep(2)

    prev = read_state(handle)
    t0 = time.perf_counter()

    diff_name = DIFF_NAMES[prev['difficulty']] if prev['difficulty'] is not None and prev['difficulty'] < 6 else '?'
    log(f"\nTurn {prev['turn']} | {diff_name} | Map {prev['mapWidth']}x{prev['mapHeight']}")
    log(f"Cities: {len(prev['cities'])} | Units: {len(prev['units'])}")
    for i, cv in enumerate(prev['civs']):
        if cv['gold'] is not None and cv['gold'] > 0:
            log(f"  Civ {i}: gold={cv['gold']} {cv['govName']} sci={cv['sciRate']}% tax={cv['taxRate']}% techs={cv['numTechs']}")
    for c in prev['cities'][:8]:
        log(f"  {c['name']} (civ {c['owner']}) sz={c['size']} food={c['food']} shld={c['shields']} build={c['prodName']}")
    if len(prev['cities']) > 8:
        log(f"  ... +{len(prev['cities'])-8} more")
    flush()

    log(f"\nMonitoring... (Ctrl+C to stop)\n")
    polls = 0
    changes = 0
    last_status = time.perf_counter()

    try:
        while True:
            try:
                curr = read_state(handle)
            except Exception:
                flush()
                log("\nProcess closed.")
                break

            polls += 1
            if curr['turn'] is None:
                time.sleep(0.1)
                continue

            lines = diff_states(prev, curr, t0)
            if lines:
                for line in lines: log(line)
                prev = curr
                changes += 1
                flush()

            # Status every 10 seconds
            now = time.perf_counter()
            if now - last_status > 10.0:
                rate = polls / (now - last_status)
                log(f"[{(now-t0)*1000:10.1f}ms]  -- {rate:.0f} Hz, {changes} changes --")
                flush()
                polls = 0
                last_status = now

    except KeyboardInterrupt:
        flush()
        log(f"\nStopped. {changes} changes in {time.perf_counter()-t0:.1f}s")

    kernel32.CloseHandle(handle)

if __name__ == '__main__':
    main()
