#!/usr/bin/env python3
"""
sniff-game.py — Read Civ2 game state from process memory in real-time

Usage: python charlizationv4/sniff-game.py [--log game.log]

Continuously reads civ2.exe process memory at known DAT_ addresses.
Detects every state change with millisecond timestamps.

Tracks: units, cities, civs, wonders, active unit, globals.
Dumps binary snapshots on each turn change for offline analysis.

Snapshots go to: charlizationv4/snapshots/<session>/
Each file: turn_NNN_<map>_<difficulty>.bin

Requires: Windows + Python 3.6+. No pip dependencies.
"""

import ctypes
import ctypes.wintypes as wt
import struct
import sys
import time
import os

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

# ═══════════════════════════════════════════════════════════════════
# Civ2 addresses (absolute virtual addresses from Ghidra)
# ═══════════════════════════════════════════════════════════════════

ADDR = {
    'turn':         0x00655af8,  # i16
    'difficulty':   0x00655b02,  # u8
    'activeCiv':    0x00655b05,  # u8
    'activeUnit':   0x00655afe,  # i16 — which unit AI is processing
    'humanPlayers': 0x00655b0b,  # u8 bitmask
    'totalUnits':   0x00655b16,  # i16
    'totalCities':  0x00655b18,  # i16
    'mapWidth':     0x006d1160,  # i16
    'mapHeight':    0x006d1162,  # i16
    'mapSeed':      0x006d1168,  # i32
    'pollution':    0x00655b04,  # u8
    'globalWarming':0x00655b03,  # u8
    'yearIncrement':0x00655afa,  # i16
}

UNIT_BASE  = 0x006560f0;  UNIT_STRIDE  = 0x20
CITY_BASE  = 0x0064f340;  CITY_STRIDE  = 0x58
CIV_BASE   = 0x0064c600;  CIV_STRIDE   = 0x594
WONDER_BASE = 0x00655be6   # 28 wonders × 2 bytes (city ID that built it, -1 = not built)

# Memory regions to dump in snapshots
SNAPSHOT_REGIONS = [
    ('globals',  0x00655af0, 0x40),               # key globals (turn, difficulty, etc.)
    ('units',    UNIT_BASE,  512 * UNIT_STRIDE),   # all units (16KB)
    ('cities',   CITY_BASE,  256 * CITY_STRIDE),   # all cities (22KB)
    ('civs',     CIV_BASE,   8 * CIV_STRIDE),      # all civs (11KB)
    ('wonders',  WONDER_BASE, 56),                  # wonders (28 × 2)
    ('cosmic',   0x0064bcc8, 22),                   # cosmic parameters
    ('map_dims', 0x006d1160, 32),                   # map dimensions + seed
]

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
WONDER_NAMES = [
    'Pyramids','Hanging Gardens','Colossus','Lighthouse','Great Library',
    'Oracle','Great Wall','Sun Tzu','King Richard','Marco Polo',
    'Michelangelo','Copernicus','Magellan','Shakespeare','Da Vinci',
    'J.S. Bach','Adam Smith','Darwin','Statue of Liberty','Eiffel Tower',
    'Women Suffrage','Hoover Dam','Manhattan Project','United Nations',
    'Apollo Program','SETI Program','Cure for Cancer','Great Wonder 28'
]

# ═══════════════════════════════════════════════════════════════════
# State reading
# ═══════════════════════════════════════════════════════════════════

def read_globals(h):
    g = {}
    for k, a in ADDR.items():
        if k in ('turn','totalUnits','totalCities','mapWidth','mapHeight','yearIncrement','activeUnit'):
            g[k] = ri16(h, a)
        elif k == 'mapSeed':
            g[k] = ri32(h, a)
        else:
            g[k] = ru8(h, a)
    return g

def read_unit(h, idx):
    base = UNIT_BASE + idx * UNIT_STRIDE
    d = read_mem(h, base, UNIT_STRIDE)
    if not d or len(d) < UNIT_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    status = struct.unpack_from('<H', d, 4)[0]
    utype, owner = d[6], d[7]
    moves, order, home = d[10], d[15], d[16]
    goto_x, goto_y = struct.unpack_from('<hh', d, 0x12)
    uid = struct.unpack_from('<i', d, 0x1A)[0]
    name = UNIT_NAMES[utype] if utype < len(UNIT_NAMES) else f'T{utype}'
    return dict(idx=idx, x=x, y=y, type=utype, name=name, owner=owner,
                moves=moves, order=order, orderName=ORDER_NAMES.get(order, f'o{order}'),
                home=home, alive=uid!=0, id=uid, gotoX=goto_x, gotoY=goto_y,
                veteran=(status>>6)&1, status=status)

def read_city(h, idx):
    base = CITY_BASE + idx * CITY_STRIDE
    d = read_mem(h, base, CITY_STRIDE)
    if not d or len(d) < CITY_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    owner, size = d[8], d[9]
    food = struct.unpack_from('<h', d, 0x1A)[0]
    shields = struct.unpack_from('<h', d, 0x1C)[0]
    trade = struct.unpack_from('<h', d, 0x1E)[0]
    name = d[0x20:0x30].split(b'\x00')[0].decode('ascii', errors='replace')
    prod = struct.unpack_from('<b', d, 0x39)[0]
    exists = struct.unpack_from('<i', d, 0x54)[0]
    if 0 <= prod < len(UNIT_NAMES): pname = UNIT_NAMES[prod]
    elif prod < 0: pname = f'Bldg{-prod-1}'
    else: pname = f'Item{prod}'
    return dict(idx=idx, x=x, y=y, owner=owner, size=size, name=name,
                food=food, shields=shields, trade=trade, prodItem=prod,
                prodName=pname, exists=exists)

def read_civ(h, idx):
    base = CIV_BASE + idx * CIV_STRIDE
    gold = ru16(h, base + 0xA2)
    beakers = ru16(h, base + 0xAA)
    researching = ru8(h, base + 0xAC)
    num_techs = ru8(h, base + 0xB0)
    sci_rate = ru8(h, base + 0xB3)
    tax_rate = ru8(h, base + 0xB4)
    gov = ru8(h, base + 0xB5)
    gov_name = GOV_NAMES[gov] if gov is not None and gov < len(GOV_NAMES) else f'gov{gov}'
    return dict(idx=idx, gold=gold, beakers=beakers, researching=researching,
                numTechs=num_techs, sciRate=(sci_rate or 0)*10,
                taxRate=(tax_rate or 0)*10, gov=gov, govName=gov_name)

def read_wonders(h):
    d = read_mem(h, WONDER_BASE, 56)
    if not d: return {}
    wonders = {}
    for i in range(28):
        city_id = struct.unpack_from('<h', d, i*2)[0]
        if city_id >= 0:
            wonders[i] = city_id
    return wonders

def read_state(h):
    g = read_globals(h)
    nu = min(g.get('totalUnits') or 0, 512)
    nc = min(g.get('totalCities') or 0, 256)
    units = [u for i in range(nu) if (u := read_unit(h, i)) and u['alive']]
    cities = [c for i in range(nc) if (c := read_city(h, i)) and c['exists']]
    civs = [read_civ(h, i) for i in range(8)]
    wonders = read_wonders(h)
    return dict(**g, units=units, cities=cities, civs=civs, wonders=wonders)

# ═══════════════════════════════════════════════════════════════════
# Snapshots
# ═══════════════════════════════════════════════════════════════════

def dump_snapshot(h, snap_dir, turn, map_w, map_h, difficulty):
    """Dump key memory regions to a binary file for offline analysis."""
    diff_str = DIFF_NAMES[difficulty].lower() if difficulty < 6 else f'd{difficulty}'
    fname = f"turn_{turn:04d}_{map_w}x{map_h}_{diff_str}.bin"
    path = os.path.join(snap_dir, fname)

    with open(path, 'wb') as f:
        # Header: region count + region table
        regions_data = []
        for name, addr, size in SNAPSHOT_REGIONS:
            data = read_mem(h, addr, size)
            if data:
                regions_data.append((name, addr, data))

        # Write header
        f.write(b'CIV2SNAP')  # magic
        f.write(struct.pack('<I', len(regions_data)))  # region count

        # Write region table
        for name, addr, data in regions_data:
            name_bytes = name.encode('ascii')[:16].ljust(16, b'\x00')
            f.write(name_bytes)                    # 16 bytes: region name
            f.write(struct.pack('<I', addr))        # 4 bytes: address
            f.write(struct.pack('<I', len(data)))   # 4 bytes: size

        # Write region data
        for name, addr, data in regions_data:
            f.write(data)

    return fname

# ═══════════════════════════════════════════════════════════════════
# Diffing
# ═══════════════════════════════════════════════════════════════════

def diff_states(prev, curr, t0):
    lines = []
    ms = (time.perf_counter() - t0) * 1000

    # Turn / active civ
    if prev['turn'] != curr['turn'] or prev['activeCiv'] != curr['activeCiv']:
        human = curr.get('humanPlayers', 0) or 0
        ctype = 'HUMAN' if human & (1 << (curr['activeCiv'] or 0)) else 'AI'
        lines.append(f"\n{'═'*60}")
        lines.append(f"Turn {curr['turn']} | Civ {curr['activeCiv']} ({ctype})")
        lines.append('═' * 60)

    # Active unit change (AI processing)
    if prev.get('activeUnit') != curr.get('activeUnit') and curr.get('activeUnit',0) >= 0:
        au = curr['activeUnit']
        # Find this unit in current state
        u = next((u for u in curr['units'] if u['idx'] == au), None)
        if u:
            lines.append(f"[{ms:10.1f}ms]  >> Processing: {u['name']} #{au} (civ {u['owner']}) at ({u['x']},{u['y']})")

    # Civ changes
    for i in range(8):
        p, c = prev['civs'][i], curr['civs'][i]
        ch = []
        if p['gold'] != c['gold']: ch.append(f"gold {p['gold']}→{c['gold']}")
        if p['gov'] != c['gov']: ch.append(f"gov {p['govName']}→{c['govName']}")
        if p['beakers'] != c['beakers']: ch.append(f"beakers {p['beakers']}→{c['beakers']}")
        if p['researching'] != c['researching']: ch.append(f"research {p['researching']}→{c['researching']}")
        if p['sciRate'] != c['sciRate']: ch.append(f"sci {p['sciRate']}%→{c['sciRate']}%")
        if p['taxRate'] != c['taxRate']: ch.append(f"tax {p['taxRate']}%→{c['taxRate']}%")
        if p['numTechs'] != c['numTechs']: ch.append(f"techs {p['numTechs']}→{c['numTechs']}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  Civ {i}: {', '.join(ch)}")

    # Wonder changes
    for wid in set(list(prev['wonders'].keys()) + list(curr['wonders'].keys())):
        po = prev['wonders'].get(wid)
        co = curr['wonders'].get(wid)
        if po != co and co is not None:
            wname = WONDER_NAMES[wid] if wid < len(WONDER_NAMES) else f'Wonder{wid}'
            city = next((c for c in curr['cities'] if c['idx'] == co), None)
            cname = city['name'] if city else f'city#{co}'
            lines.append(f"[{ms:10.1f}ms]  WONDER BUILT: {wname} in {cname}")

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
        elif p['order'] != u['order']:
            ch.append(f"order {p['orderName']}→{u['orderName']}")
        if p['moves'] != u['moves']:
            ch.append(f"mv {p['moves']}→{u['moves']}")
        if p['veteran'] != u['veteran']:
            ch.append('VETERAN!')
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

    # Create snapshot directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    session_id = time.strftime('%Y%m%d_%H%M%S')
    snap_dir = os.path.join(script_dir, 'snapshots', f'game_{session_id}')
    os.makedirs(snap_dir, exist_ok=True)

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

    log("Civ2 Memory Sniffer (continuous + snapshots)")
    log(f"Snapshots → {snap_dir}")
    if log_file:
        with open(log_file, 'w', encoding='utf-8') as f:
            f.write(f"Civ2 Sniffer — {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Snapshots: {snap_dir}\n\n")
        log(f"Log → {log_file}")

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
    log(f"\nTurn {prev['turn']} | {diff_name} | Map {prev['mapWidth']}x{prev['mapHeight']} | Seed {prev['mapSeed']}")
    log(f"Cities: {len(prev['cities'])} | Units: {len(prev['units'])}")
    for i, cv in enumerate(prev['civs']):
        if cv['gold'] is not None and (cv['gold'] > 0 or cv['numTechs']):
            log(f"  Civ {i}: gold={cv['gold']} {cv['govName']} sci={cv['sciRate']}% tax={cv['taxRate']}% techs={cv['numTechs']}")
    for c in prev['cities'][:8]:
        log(f"  {c['name']} (civ {c['owner']}) sz={c['size']} food={c['food']} shld={c['shields']} build={c['prodName']}")
    if len(prev['cities']) > 8:
        log(f"  ... +{len(prev['cities'])-8} more")
    wonders = prev['wonders']
    if wonders:
        wlist = [WONDER_NAMES[w] if w < len(WONDER_NAMES) else f'W{w}' for w in wonders]
        log(f"  Wonders: {', '.join(wlist)}")

    # Initial snapshot
    fname = dump_snapshot(handle, snap_dir, prev['turn'] or 0,
                          prev['mapWidth'] or 0, prev['mapHeight'] or 0,
                          prev['difficulty'] or 0)
    log(f"  Snapshot: {fname}")
    flush()

    log(f"\nMonitoring... (Ctrl+C to stop)\n")
    polls = 0
    changes = 0
    last_status = time.perf_counter()
    last_turn = prev['turn']

    # Also copy the log into the snapshot dir for easy pairing
    snap_log = os.path.join(snap_dir, 'game.log')

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

                # Snapshot on turn change
                if curr['turn'] != last_turn:
                    fname = dump_snapshot(handle, snap_dir, curr['turn'] or 0,
                                          curr['mapWidth'] or 0, curr['mapHeight'] or 0,
                                          curr['difficulty'] or 0)
                    log(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  Snapshot: {fname}")
                    last_turn = curr['turn']

                flush()
                # Also mirror to snapshot dir log
                if log_file:
                    try:
                        with open(snap_log, 'a', encoding='utf-8') as f:
                            f.write('\n'.join(lines) + '\n')
                    except: pass

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
        elapsed = time.perf_counter() - t0
        log(f"\nStopped. {changes} changes in {elapsed:.1f}s")
        log(f"Snapshots in: {snap_dir}")

    kernel32.CloseHandle(handle)

if __name__ == '__main__':
    main()
