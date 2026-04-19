#!/usr/bin/env python3
"""
sniff-game.py — Read Civ2 game state from process memory in real-time

Usage: python charlizationv4/sniff-game.py [--log game.log] [--hooks]

Continuously reads civ2.exe process memory at known DAT_ addresses.
Detects every state change with millisecond timestamps.

Tracks: units, cities, civs, wonders, active unit, globals.
Dumps binary snapshots on each turn change for offline analysis.

--hooks: Log keyboard and mouse input events to correlate with memory changes.
         Press F12 at any time to toggle hook logging on/off mid-session.

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
import threading
import subprocess

# ═══════════════════════════════════════════════════════════════════
# Win32 API
# ═══════════════════════════════════════════════════════════════════

kernel32 = ctypes.windll.kernel32
user32   = ctypes.windll.user32

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

ADDR = {
    'turn':         0x00655af8,  # i16
    # difficulty was at 0x00655b04 — that byte is observed always 0.
    # Real difficulty lives at 0x00655b08 (verified in sav-from-mem.js).
    'difficulty':   0x00655b08,  # u8 (0=Chieftain..5=Deity)
    # activeCiv was at 0x00655b05 — that byte is a different field (AI
    # rotating counter). The human player's slot ("activeHumanPlayer" in
    # parser terms) lives at 0x00655b03.
    'activeCiv':    0x00655b03,  # u8 (human player's civ slot)
    'activeUnit':   0x00655afe,  # i16 — which unit AI is processing
    'humanPlayers': 0x00655b0b,  # u8 bitmask
    'totalUnits':   0x00655b16,  # i16
    'totalCities':  0x00655b18,  # i16
    'mapWidth':     0x006d1160,  # i16
    'mapHeight':    0x006d1162,  # i16
    'mapSeed':      0x006d1168,  # i32
    # pollution was also claimed at 0x00655b04 (conflict with old
    # difficulty label). Real pollution counter is at 0x00655b0e.
    'pollution':    0x00655b0e,  # u8
    # globalWarming was at 0x00655b03 — that's activeHumanPlayer. The
    # warming counter lives at 0x00655b0f.
    'globalWarming':0x00655b0f,  # u8
    # currentYear is signed i16 — negative for BC. Earlier label
    # "yearIncrement" was misleading; decompiled block_00480000.c:1817
    # sets this from the turn, so it's the year itself.
    'currentYear':  0x00655afa,  # i16
    # nextUnitId (DAT_00627fd8) is captured in the `unit_counter`
    # snapshot region, not here — SNAPSHOT_REGIONS below dumps it.
}

UNIT_TYPE_BASE = 0x0064B1B8;  UNIT_TYPE_STRIDE = 0x14  # unit type stats table
UNIT_BASE  = 0x006560f0;  UNIT_STRIDE  = 0x20
CITY_BASE  = 0x0064f340;  CITY_STRIDE  = 0x58
CIV_BASE   = 0x0064c600;  CIV_STRIDE   = 0x594
WONDER_BASE = 0x00655be6   # 28 wonders × 2 bytes (city ID that built it, -1 = not built)
TILE_PTR_ADDR = 0x00636598  # pointer to heap-allocated tile array (ms * 6 bytes)

# Memory regions to dump in snapshots
SNAPSHOT_REGIONS = [
    # game_flags: save-header bytes 0x00-0x13 (magic + game-toggle
    # bitfields: cheatMenu, cheatPenalty, bloodlust, barbariansRaging,
    # scenarioFile, etc. — 60+ named flags parsed by parser.js). Mapped
    # to memory via save→mem delta 0x00655ADC, so mem 0x00655ADC is the
    # CIVILIZE magic-string start. Captures 0x14 bytes to cover all
    # gameplay-relevant flag bytes (0x0C, 0x0D, 0x0F, 0x10, 0x12, 0x13).
    ('game_flags', 0x00655adc, 0x14),
    ('globals',  0x00655af0, 0x40),               # key globals (turn, difficulty, etc.)
    ('units',    UNIT_BASE,  512 * UNIT_STRIDE),   # all units (16KB)
    ('cities',   CITY_BASE,  256 * CITY_STRIDE),   # all cities (22KB)
    ('civs',     CIV_BASE,   8 * CIV_STRIDE),      # all civs (11KB)
    ('wonders',  WONDER_BASE, 56),                  # wonders (28 × 2)
    ('cosmic',   0x0064bcc8, 22),                   # cosmic parameters
    ('map_dims', 0x006d1160, 32),                   # map dimensions + seed
    # Year-schedule table used by FUN_00484fec (calc_year_from_turn).
    # 6 difficulties × 6 tiers × 3 int32 (year_start, duration, step)
    # = 6 * 6 * 12 = 432 bytes. Plus trailing DAT_0062c4cc-0x4d8 entries
    # used for post-tier extrapolation. Grab 0x1C0 (448) to be safe.
    ('year_table', 0x0062c490, 0x1C0),
    # Unit-id counters. DAT_00627fd8 = next_unit_sequence_id, incremented
    # each time a unit is created (binary FUN_005b3d06:1458-1459). Without
    # this, v3's unit-creation reducer initializes its counter from
    # max(existing) + 1, which is wrong when intermediate unit creations
    # have been killed (leaves gaps in the id sequence).
    ('unit_counter', 0x00627fd8, 8),
    # MSVC CRT rand() seed (holdrand). Every AI decision that uses
    # rand() — research scoring, combat, AI unit dispatch — needs our
    # JS _randSeed to match civ2.exe's at the exact call point, or
    # decisions diverge. Capturing the 4-byte seed lets snapshot-load
    # sync our RNG to the binary's current state. Located via
    # block_005F0000.c:2494 (_rand reads/writes DAT_00639e50).
    ('rand_seed', 0x00639e50, 4),
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
BUILDING_NAMES = [
    'Nothing','Palace','Barracks','Granary','Temple','MarketPlace','Library',
    'Courthouse','City Walls','Aqueduct','Bank','Cathedral','University',
    'Mass Transit','Colosseum','Factory','Mfg Plant','SDI Defense',
    'Recycling Ctr','Power Plant','Hydro Plant','Nuclear Plant','Stock Exchange',
    'Sewer System','Supermarket','Superhighways','Research Lab','SAM Battery',
    'Coastal Fort','Solar Plant','Harbor','Offshore Platform','Airport',
    'Police Station','Port Facility','SS Structural','SS Component','SS Module',
    'Capitalization',
    'Pyramids','Hanging Gardens','Colossus','Lighthouse','Great Library',
    'Oracle','Great Wall','Sun Tzu','King Richard','Marco Polo',
    'Michelangelo','Copernicus','Magellan','Shakespeare','Da Vinci',
    'J.S. Bach','Isaac Newton','Adam Smith','Darwin','Statue of Liberty',
    'Eiffel Tower','Women Suffrage','Hoover Dam','Manhattan Project',
    'United Nations','Apollo Program','SETI Program','Cure for Cancer',
]
ORDER_NAMES = {
    # From decompiled source (block_00580000.c, block_004C0000.c, block_005B0000.c):
    # 1=FUN_0058cce6 (F key), 2=FUN_004c4ada (fortified state), 3=FUN_005b2f50 (S key)
    # 4-10=FUN_004c42a0 settler work, 11=goto, 27=goto_ai
    0:'o0', 1:'fortify', 2:'fortified', 3:'sleep',
    4:'build_fortress', 5:'road', 6:'irrigate', 7:'mine',
    8:'transform', 9:'clean_pollution', 10:'build_airbase',
    11:'goto', 12:'no_orders', 16:'assault', 27:'goto_ai', 255:'none'
}
GOV_NAMES = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy']
DIFF_NAMES = ['Chieftain','Warlord','Prince','King','Emperor','Deity']
LEADER_CIVS = [
    'Romans','Babylonians','Germans','Egyptians','Americans','Greeks','Indians',
    'Russians','Zulus','French','Aztecs','Chinese','English','Mongols',
    'Celts','Japanese','Vikings','Spanish','Persians','Carthaginians','Sioux',
    'Arabs','Incas',
]
TECH_NAMES = [
    'Advanced Flight','Alphabet','Amphibious War','Astronomy','Atomic Theory',
    'Automobile','Banking','Bridge Building','Bronze Working','Ceremonial Burial',
    'Chemistry','Chivalry','Code of Laws','Combined Arms','Combustion',
    'Communism','Computers','Conscription','Construction','The Corporation',
    'Currency','Democracy','Economics','Electricity','Electronics',
    'Engineering','Environmentalism','Espionage','Explosives','Feudalism',
    'Flight','Fundamentalism','Fusion Power','Genetic Engineering','Guerrilla War',
    'Gunpowder','Horseback Riding','Industrialization','Invention','Iron Working',
    'Labor Union','The Laser','Leadership','Literacy','Machine Tools',
    'Magnetism','Map Making','Masonry','Mass Production','Mathematics',
    'Medicine','Metallurgy','Miniaturization','Mobile Warfare','Monarchy',
    'Monotheism','Mysticism','Navigation','Nuclear Fission','Nuclear Power',
    'Philosophy','Physics','Plastics','Plumbing','Polytheism',
    'Pottery','Radio','Railroad','Recycling','Refining',
    'Refrigeration','The Republic','Robotics','Rocketry','Sanitation',
    'Seafaring','Space Flight','Stealth','Steam Engine','Steel',
    'Superconductor','Tactics','Theology','Theory of Gravity','Trade',
    'University','Warrior Code','The Wheel','Writing','Future Tech',
]
AI_ROLES = {
    0x21:'attack!', 0x32:'defend2', 0x33:'defend3', 0x41:'attack_A',
    0x44:'defend_D', 0x46:'fortify_F', 0x48:'home_H', 0x55:'unassigned_U',
    0x62:'build_b', 0x64:'diplomat_d', 0x68:'explore_h', 0x74:'transport_t',
    0x3F:'unknown_?', 0x37:'settler_7',
}
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
        if k in ('turn','totalUnits','totalCities','mapWidth','mapHeight','currentYear','activeUnit'):
            g[k] = ri16(h, a)
        elif k == 'mapSeed':
            g[k] = ri32(h, a)
        else:
            g[k] = ru8(h, a)
    # Game-toggle bytes (save offset 0x0C-0x14 → mem 0x00655AE8-AF0). The
    # parser decodes 60+ named bits here: bloodlust, cheatMenu/Penalty,
    # barbariansRaging, scenarioFile, etc. Read the whole word so a
    # single diff tick can spot any flag flip. Per-bit names resolve in
    # emit_action_events below.
    flag_bytes = read_mem(h, 0x00655AE8, 12)  # covers save 0x0C..0x17
    if flag_bytes and len(flag_bytes) == 12:
        g['gameFlags'] = {
            # Offsets below are RELATIVE to save 0x0C (flag_bytes[0]).
            'f0C': flag_bytes[0x00],
            'f0D': flag_bytes[0x01],
            'f0E': flag_bytes[0x02],
            'f0F': flag_bytes[0x03],
            'f10': flag_bytes[0x04],
            # Decoded flags — mirrors parser.js gameToggles. The diff
            # tooling compares these bit-by-bit to emit typed events.
            'bloodlust':             bool(flag_bytes[0x00] & 0x80),
            'simplifiedCombat':      bool(flag_bytes[0x00] & 0x10),
            'barbariansPeaceful':    bool(flag_bytes[0x00] & 0x04),
            'barbariansRaging':      bool(flag_bytes[0x00] & 0x08),
            'flatEarth':             bool(flag_bytes[0x01] & 0x80),
            'dontRestartEliminated': bool(flag_bytes[0x01] & 0x01),
            'cheatMenu':             bool(flag_bytes[0x03] & 0x80),
            'cheatPenalty':          bool(flag_bytes[0x08] & 0x10),  # save 0x14
            'scenarioFile':          bool(flag_bytes[0x08] & 0x40),
            'scenarioNoTechLimits':  bool(flag_bytes[0x08] & 0x80),
        }
    else:
        g['gameFlags'] = {}
    return g

# Unit byte map — for raw diff labeling
UNIT_BYTE_MAP = {
    0x00:'x_lo', 0x01:'x_hi', 0x02:'y_lo', 0x03:'y_hi',
    0x04:'status_lo', 0x05:'status_hi', 0x06:'type', 0x07:'owner',
    0x08:'moves', 0x09:'visMask', 0x0A:'damage', 0x0B:'carrying',
    0x0C:'aiRole', 0x0D:'workTurns_or_cargo', 0x0E:'fuel', 0x0F:'order',
    0x10:'gotoTurn', 0x11:'_pad11', 0x12:'gotoX_lo', 0x13:'gotoX_hi',
    0x14:'gotoY_lo', 0x15:'gotoY_hi', 0x16:'prevStack_lo', 0x17:'prevStack_hi',
    0x18:'nextStack_lo', 0x19:'nextStack_hi',
    0x1A:'uid_0', 0x1B:'uid_1', 0x1C:'uid_2', 0x1D:'uid_3',
    0x1E:'_pad1E', 0x1F:'_pad1F',
}

# Offsets explicitly diffed in unit change handler (skip in raw catch-all)
UNIT_DIFFED_OFFSETS = {0,1,2,3, 4,5, 8, 9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF, 0x10}

def read_unit(h, idx):
    base = UNIT_BASE + idx * UNIT_STRIDE
    d = read_mem(h, base, UNIT_STRIDE)
    if not d or len(d) < UNIT_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    status = struct.unpack_from('<H', d, 4)[0]
    utype, owner = d[6], d[7]
    moves = d[8]
    vis_mask = d[9]
    hp = d[0x0A]
    carrying = struct.unpack_from('<b', d, 0x0B)[0]
    ai_role = d[0x0C]
    # +0x0D is multi-purpose per parser: workTurns for Settlers/Engineers,
    # commodity for Caravans/Freight, fuel for Air units, cargo for transports.
    # Earlier mislabeled as "home" — that's at +0x10 (u16 with 0xFFFF sentinel).
    multipurpose_0D = struct.unpack_from('<b', d, 0x0D)[0]
    fuel = d[0x0E]
    order = d[0x0F]
    goto_turn = d[0x10]
    goto_x, goto_y = struct.unpack_from('<hh', d, 0x12)
    prev_stack = struct.unpack_from('<h', d, 0x16)[0]
    next_stack = struct.unpack_from('<h', d, 0x18)[0]
    uid = struct.unpack_from('<i', d, 0x1A)[0]
    name = UNIT_NAMES[utype] if utype < len(UNIT_NAMES) else f'T{utype}'
    return dict(idx=idx, raw=d, x=x, y=y, type=utype, name=name, owner=owner,
                moves=moves, moveSpent=moves, statusFlags=status,
                order=order, orderName=ORDER_NAMES.get(order, f'o{order}'),
                # multi-purpose byte — label depends on unit type
                workTurnsOrCargo=multipurpose_0D,
                alive=uid!=0, id=uid, gotoX=goto_x, gotoY=goto_y,
                # veteran is bit 13 of status u16 (bit 0x20 of high byte, = bit 0x2000 raw);
                # earlier version read bit 6 which is actually firstMoved.
                veteran=(status>>13)&1,
                firstMoved=(status>>6)&1,
                status=status, visMask=vis_mask,
                hp=hp, aiRole=ai_role, aiRoleName=AI_ROLES.get(ai_role, f'r{ai_role:02X}'),
                carrying=carrying, fuel=fuel, gotoTurn=goto_turn,
                prevStack=prev_stack, nextStack=next_stack)

# City byte map — for raw diff labeling
CITY_BYTE_MAP = {}
for _o, _n in [(0x00,'x'),(0x02,'y'),(0x04,'flags'),(0x08,'owner'),(0x09,'size'),
    (0x0A,'origOwner'),(0x0B,'turnFounded'),(0x0C,'civVis'),
    (0x16,'workerTiles'),(0x1A,'foodBox'),(0x1C,'shieldBox'),(0x1E,'tradeRev'),
    # Per parser: +0x30-0x33 are worker-tile-inner/outerA/outerB bitmasks +
    # specialistCount. +0x34..+0x38 are buildings (formerly mislabeled).
    (0x30,'workersInner'),(0x31,'workersOuterA'),(0x32,'workersOuterB'),
    (0x33,'specialistCount'),
    (0x39,'production'),(0x3A,'numRoutes'),
    (0x4A,'scienceOutput'),(0x4C,'taxOutput'),(0x4E,'totalTrade'),
    (0x50,'foodProduction'),(0x51,'shieldProduction'),(0x52,'happy'),(0x53,'unhappy'),(0x54,'cityId')]:
    CITY_BYTE_MAP[_o] = _n
for _i in range(8): CITY_BYTE_MAP[0x0D+_i] = f'popKnowledge_civ{_i}'
for _i in range(16): CITY_BYTE_MAP[0x20+_i] = f'name[{_i}]'
for _i in range(5): CITY_BYTE_MAP[0x34+_i] = f'buildings[{_i}]'  # was mislabeled 'tileImpr'
for _i in range(3): CITY_BYTE_MAP[0x3B+_i] = f'supply[{_i}]'
for _i in range(3): CITY_BYTE_MAP[0x3E+_i] = f'demand[{_i}]'
for _i in range(3): CITY_BYTE_MAP[0x41+_i] = f'routeType[{_i}]'
for _i in range(6): CITY_BYTE_MAP[0x44+_i] = f'routePartner[{_i//2}]_{_i%2}'

# Offsets explicitly diffed in city change handler
CITY_DIFFED_OFFSETS = set()
for _r in [(0x04,4),(0x09,1),(0x16,4),(0x1A,2),(0x1C,2),(0x1E,2),(0x30,4),(0x39,1),(0x3A,1),
           (0x4A,2),(0x4C,2),(0x4E,2),(0x50,1),(0x51,1),(0x52,1),(0x53,1)]:
    for _b in range(_r[0], _r[0]+_r[1]): CITY_DIFFED_OFFSETS.add(_b)

def read_city(h, idx):
    base = CITY_BASE + idx * CITY_STRIDE
    d = read_mem(h, base, CITY_STRIDE)
    if not d or len(d) < CITY_STRIDE: return None
    x, y = struct.unpack_from('<hh', d, 0)
    flags = struct.unpack_from('<I', d, 0x04)[0]
    owner, size = d[8], d[9]
    original_owner = d[0x0A]
    turn_founded = d[0x0B]
    civ_vis = d[0x0C]
    civ_pop_knowledge = list(d[0x0D:0x15])
    worker_tiles = struct.unpack_from('<I', d, 0x16)[0]
    food = struct.unpack_from('<h', d, 0x1A)[0]
    shields = struct.unpack_from('<h', d, 0x1C)[0]
    trade = struct.unpack_from('<h', d, 0x1E)[0]
    name = d[0x20:0x30].split(b'\x00')[0].decode('ascii', errors='replace')
    # Per parser: +0x30..0x33 are worker-tile bitmasks + specialistCount,
    # NOT improvements. The actual buildings bitmask is at +0x34..+0x38.
    # Keeping legacy var name `improvements` pointing at new correct spot to
    # minimize other refactoring — it's now the real buildings bitfield.
    # u32 at +0x34 covers bits 1-31 of building set; byte at +0x38 covers
    # extra bits 32-38 (wonders). Pack into u64 for convenient bit access.
    buildings_lo = struct.unpack_from('<I', d, 0x34)[0]
    buildings_hi = struct.unpack_from('<B', d, 0x38)[0]
    improvements = (buildings_hi << 32) | buildings_lo
    prod = struct.unpack_from('<b', d, 0x39)[0]
    num_trade_routes = struct.unpack_from('<b', d, 0x3A)[0]
    supply_commodities = [struct.unpack_from('<b', d, 0x3B+i)[0] for i in range(3)]
    demand_commodities = [struct.unpack_from('<b', d, 0x3E+i)[0] for i in range(3)]
    trade_route_type = [struct.unpack_from('<b', d, 0x41+i)[0] for i in range(3)]
    trade_route_partner = [struct.unpack_from('<h', d, 0x44+i*2)[0] for i in range(3)]
    # NOTE: bytes 0x34..0x38 are the BUILDINGS bitmask (not tile improvements).
    # Already decoded into `improvements` above as a u64. Keeping this raw
    # 5-byte slice for diagnostic purposes under a clearer name.
    buildings_raw = d[0x34:0x39]
    # Per parser.js (authoritative city-struct layout):
    # 0x4A = scienceOutput (was mislabeled food_out)
    # 0x4C = taxOutput     (was mislabeled shield_out)
    # 0x4E = totalTrade    (was mislabeled trade_out; close enough — renamed for clarity)
    # 0x50 = foodProduction (gross, before citizen consumption — was "food_surplus")
    # 0x51 = shieldProduction (gross, before unit upkeep — was "shield_surplus")
    science_output    = struct.unpack_from('<h', d, 0x4A)[0]
    tax_output        = struct.unpack_from('<h', d, 0x4C)[0]
    total_trade       = struct.unpack_from('<h', d, 0x4E)[0]
    food_production   = struct.unpack_from('<b', d, 0x50)[0]
    shield_production = struct.unpack_from('<B', d, 0x51)[0]
    happy = struct.unpack_from('<b', d, 0x52)[0]
    unhappy = struct.unpack_from('<b', d, 0x53)[0]
    exists = struct.unpack_from('<i', d, 0x54)[0]
    if 0 <= prod < len(UNIT_NAMES): pname = UNIT_NAMES[prod]
    elif prod < 0:
        bidx = -prod - 1
        pname = BUILDING_NAMES[bidx] if bidx < len(BUILDING_NAMES) else f'Bldg{bidx}'
    else: pname = f'Item{prod}'
    # Decode flags
    wltk = bool(flags & 0x01)
    disorder = bool(flags & 0x02)
    coastal = bool(flags & 0x80)
    return dict(idx=idx, raw=d, x=x, y=y, owner=owner, size=size, name=name,
                food=food, shields=shields, trade=trade, prodItem=prod,
                prodName=pname, exists=exists,
                flags=flags, originalOwner=original_owner, turnFounded=turn_founded,
                workerTiles=worker_tiles, improvements=improvements,
                numTradeRoutes=num_trade_routes,
                civPopKnowledge=civ_pop_knowledge, civVis=civ_vis,
                supplyCommodities=supply_commodities, demandCommodities=demand_commodities,
                tradeRouteType=trade_route_type, tradeRoutePartner=trade_route_partner,
                buildingsRaw=buildings_raw,
                scienceOutput=science_output, taxOutput=tax_output, totalTrade=total_trade,
                foodProduction=food_production, shieldProduction=shield_production,
                happy=happy, unhappy=unhappy,
                wltk=wltk, disorder=disorder, coastal=coastal)

TERRAIN_NAMES = [
    'Desert','Plains','Grassland','Forest','Hills','Mountains','Tundra',
    'Glacier','Swamp','Jungle','Ocean','River','(12)','(13)','(14)','(15)',
]

def get_unit_type_stats(h, utype):
    """Read attack, defense, hp, firepower, moves, cost from unit type table."""
    base = UNIT_TYPE_BASE + utype * UNIT_TYPE_STRIDE
    d = read_mem(h, base, UNIT_TYPE_STRIDE)
    if not d or len(d) < UNIT_TYPE_STRIDE: return None
    return dict(
        attack=d[0x0C],
        defense=d[0x0D],
        maxHp=d[0x0E],
        firepower=d[0x0F],
        moves=d[0x0A],
        cost=d[0x10],
    )

def get_terrain_at(h, x, y, map_w):
    """Read terrain type at (x,y) from tile array."""
    ptr_data = read_mem(h, TILE_PTR_ADDR, 4)
    if not ptr_data: return None
    tile_base = struct.unpack('<I', ptr_data)[0]
    if not tile_base: return None
    offset = (map_w * y + (x & ~1)) * 3
    d = read_mem(h, tile_base + offset, 6)
    if not d: return None
    terrain = d[0] & 0x0F
    return TERRAIN_NAMES[terrain] if terrain < len(TERRAIN_NAMES) else f'T{terrain}'

DIPLO_BITS = {0x01:'contact', 0x02:'ceasefire', 0x04:'peace', 0x08:'alliance'}
DIPLO_BITS_B1 = {0x20:'war'}

def decode_diplo(b0, b1):
    """Decode 2 bytes of diplomatic_status into a set of flag names."""
    flags = set()
    for bit, name in DIPLO_BITS.items():
        if (b0 or 0) & bit: flags.add(name)
    for bit, name in DIPLO_BITS_B1.items():
        if (b1 or 0) & bit: flags.add(name)
    return flags

def read_civ(h, idx):
    """Read entire civ struct as blob, parse all known fields."""
    base = CIV_BASE + idx * CIV_STRIDE
    raw = read_mem(h, base, CIV_STRIDE)
    if not raw or len(raw) < CIV_STRIDE:
        return dict(idx=idx, raw=b'\x00'*CIV_STRIDE, civName=f'Civ{idx}',
                    gold=0, gov=0, govName='?', beakers=0, researching=0,
                    numTechs=0, sciRate=0, taxRate=0, luxRate=0,
                    reputation=0, diplo={}, attitude={}, friction={},
                    lastContact={}, numCities=0, numUnits=0,
                    techList=bytes(93))
    d = raw
    # Core fields (offsets from CIV_BASE, which has 0xA0 header before civ[0] fields)
    H = 0xA0  # header offset
    # stateFlags at data-block +0 (mem civ_struct + 0xA0). Tracks
    # transient bits like senateOverride (bit 2), recoveredFromRevolution
    # (bit 3), and per-civ status flags (bit 9 = activeAI-processing).
    state_flags = struct.unpack_from('<H', d, H+0x00)[0]
    gold = struct.unpack_from('<H', d, H+0x02)[0]
    leader_gid = struct.unpack_from('<h', d, H+0x06)[0]
    civ_name = LEADER_CIVS[leader_gid] if 0 <= leader_gid < len(LEADER_CIVS) else f'Civ{idx}'
    # researchProgress at data-block 0x08 (mem 0xA8), researchingTech at
    # data-block 0x0A (mem 0xAA). Confirmed by Data_Structures.md:378,
    # findings/fix_plan.md:18 (w16 writes 0xFFFF sentinel at 0xAA), and
    # the authoritative snapshot schema in snapshot-to-state-json.py.
    beakers = struct.unpack_from('<H', d, H+0x08)[0]
    researching = d[H+0x0A]
    num_techs = d[H+0x10]
    sci_rate = d[H+0x13]
    tax_rate = d[H+0x14]
    gov = d[H+0x15]
    gov_name = GOV_NAMES[gov] if gov < len(GOV_NAMES) else f'gov{gov}'
    reputation = d[H+0x1E]
    patience = d[H+0x1F]
    # Diplomatic status: 4 bytes per opposing civ at offset 0x20
    diplo = {}
    for j in range(8):
        if j == idx: continue
        b0 = d[H+0x20 + j*4]
        b1 = d[H+0x20 + j*4 + 1]
        diplo[j] = decode_diplo(b0, b1)
    # Attitude: 1 byte per civ at offset 0x40
    attitude = {}
    for j in range(8):
        if j == idx: continue
        attitude[j] = struct.unpack_from('<b', d, H+0x40+j)[0]
    # Spy operations: 1 byte per civ at offset 0x48
    spy_ops = {}
    for j in range(8):
        if j == idx: continue
        spy_ops[j] = d[H+0x48+j]
    # Border friction: 1 byte per civ at offset 0x50
    friction = {}
    for j in range(8):
        if j == idx: continue
        friction[j] = d[H+0x50+j]
    # Tech/contact flags (offset 0x58, 12 bytes)
    tech_contact = d[H+0x58:H+0x64]
    # City/unit counts (offset 0x66, 14 bytes)
    # Per parser + auth docs: +0x66 = militaryUnitCount, +0x68 = cityCount.
    # Earlier labels ("numCities" at +0x66, "numUnits" at +0x68) were swapped.
    military_unit_count = struct.unpack_from('<h', d, H+0x66)[0]
    num_cities = struct.unpack_from('<h', d, H+0x68)[0]
    # Total units: counted separately from the units region (not a civ-struct field)
    # For now keep numUnits slot alive for backward compat at 0 (real info is ARMY log)
    num_units = 0
    # Tech list (offset 0x74, 93 bytes — 1 byte per tech)
    tech_list = d[H+0x74:H+0x74+93]
    # Unit counts by type (offset 0x0D8, 54 bytes)
    unit_type_counts = d[H+0xD8:H+0xD8+54]
    # Units in production (offset 0x154, 63 bytes per parser — 54 covers all
    # 51 unit types with margin). Was previously labeled "impr_counts" but
    # indexing is by unit type, not building type.
    units_in_production = d[H+0x154:H+0x154+54]
    # Last contact turn (offset 0x3E2, 16 bytes = short[8])
    last_contact = {}
    for j in range(8):
        if j == idx: continue
        last_contact[j] = struct.unpack_from('<h', d, H+0x3E2+j*2)[0]
    # Spy level (offset 0x3F3, 8 bytes)
    spy_level = {}
    for j in range(8):
        if j == idx: continue
        spy_level[j] = d[H+0x3F3+j]
    return dict(idx=idx, raw=raw, civName=civ_name,
                stateFlags=state_flags,
                gold=gold, gov=gov, govName=gov_name,
                beakers=beakers, researching=researching,
                numTechs=num_techs,
                sciRate=sci_rate*10, taxRate=tax_rate*10,
                luxRate=(10 - sci_rate - tax_rate)*10,
                reputation=reputation, patience=patience,
                diplo=diplo, attitude=attitude, spyOps=spy_ops,
                friction=friction, lastContact=last_contact,
                spyLevel=spy_level,
                numCities=num_cities, numUnits=num_units,
                militaryUnitCount=military_unit_count,
                techList=tech_list, unitTypeCounts=unit_type_counts,
                unitsInProduction=units_in_production,
                techContact=tech_contact)

def read_wonders(h):
    d = read_mem(h, WONDER_BASE, 56)
    if not d: return {}
    wonders = {}
    for i in range(28):
        city_id = struct.unpack_from('<h', d, i*2)[0]
        if city_id >= 0:
            wonders[i] = city_id
    return wonders

# ═══════════════════════════════════════════════════════════════════
# Window/dialog monitoring
# ═══════════════════════════════════════════════════════════════════

EnumWindowsProc = ctypes.WINFUNCTYPE(wt.BOOL, wt.HWND, wt.LPARAM)

def enum_civ2_windows(pid):
    """Enumerate all top-level windows owned by civ2.exe PID.
    Returns dict of {hwnd: (title, class_name, width, height)}."""
    results = {}
    _pid_buf = ctypes.c_ulong(0)

    def callback(hwnd, lparam):
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(_pid_buf))
        if _pid_buf.value != pid:
            return True
        if not user32.IsWindowVisible(hwnd):
            return True
        length = user32.GetWindowTextLengthW(hwnd) + 1
        title_buf = ctypes.create_unicode_buffer(length)
        user32.GetWindowTextW(hwnd, title_buf, length)
        class_buf = ctypes.create_unicode_buffer(256)
        user32.GetClassNameW(hwnd, class_buf, 256)
        rect = (wt.LONG * 4)()
        user32.GetWindowRect(hwnd, rect)
        w = rect[2] - rect[0]
        h = rect[3] - rect[1]
        results[hwnd] = (title_buf.value, class_buf.value, w, h)
        return True

    proc = EnumWindowsProc(callback)
    user32.EnumWindows(proc, 0)
    return results

EnumChildProc = ctypes.WINFUNCTYPE(wt.BOOL, wt.HWND, wt.LPARAM)

def read_dialog_text(hwnd):
    """Read all text from child controls of a dialog window. Returns list of strings."""
    texts = []
    def child_callback(child_hwnd, lparam):
        length = user32.GetWindowTextLengthW(child_hwnd) + 1
        if length > 1:
            buf = ctypes.create_unicode_buffer(length)
            user32.GetWindowTextW(child_hwnd, buf, length)
            text = buf.value.strip()
            if text:
                texts.append(text)
        return True
    proc = EnumChildProc(child_callback)
    user32.EnumChildWindows(hwnd, proc, 0)
    return texts

# Text buffer addresses used by Civ2 for dialog/message text
DIALOG_TEXT_BUFFERS = [
    0x00679640,  # Main text buffer (thunk_FUN_0040ff60 output)
    0x00673e10,  # Secondary text buffer (sprintf targets)
]

def read_dialog_text_from_memory(handle):
    """Read dialog text directly from Civ2's text buffers in process memory."""
    texts = []
    for addr in DIALOG_TEXT_BUFFERS:
        d = read_mem(handle, addr, 1024)
        if not d: continue
        # Extract null-terminated strings, skip very short fragments
        parts = d.split(b'\x00')
        for p in parts:
            if len(p) >= 4:
                try:
                    t = p.decode('ascii').strip()
                    # Filter out junk — must have letters and reasonable chars
                    if t and any(c.isalpha() for c in t) and all(32 <= ord(c) < 127 for c in t):
                        texts.append(t)
                except: pass
            if len(texts) >= 10: break  # cap to avoid noise
    return texts

def diff_windows(prev_wins, curr_wins, t0, handle=None):
    """Detect new/closed windows. Returns list of log lines."""
    lines = []
    ms = (time.perf_counter() - t0) * 1000
    for hwnd, (title, cls, w, h) in curr_wins.items():
        if hwnd not in prev_wins:
            lines.append(f"[{ms:10.1f}ms]  DIALOG OPEN: \"{title}\" class={cls} {w}x{h}")
    for hwnd, (title, cls, w, h) in prev_wins.items():
        if hwnd not in curr_wins:
            lines.append(f"[{ms:10.1f}ms]  DIALOG CLOSE: \"{title}\" class={cls}")
    # Also detect title changes on existing windows (dialog content changes)
    for hwnd in curr_wins:
        if hwnd in prev_wins:
            if curr_wins[hwnd][0] != prev_wins[hwnd][0]:
                old_title = prev_wins[hwnd][0]
                new_title = curr_wins[hwnd][0]
                lines.append(f"[{ms:10.1f}ms]  DIALOG CHANGE: \"{old_title}\" -> \"{new_title}\"")
    return lines

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

def dump_snapshot(h, snap_dir, turn, map_w, map_h, difficulty, t0=None):
    """Dump key memory regions to a binary file for offline analysis.

    Adds a synthetic 'snap_meta' region (always first after header) that
    holds the capture timestamp in milliseconds since sniff-game.py start.
    The harness uses this to match snapshot time against event time_ms
    precisely instead of using a heuristic late-event window. Old
    snapshots without this region still parse — the reader just falls
    back to the heuristic.
    """
    diff_str = DIFF_NAMES[difficulty].lower() if difficulty < 6 else f'd{difficulty}'
    fname = f"turn_{turn:04d}_{map_w}x{map_h}_{diff_str}.bin"
    path = os.path.join(snap_dir, fname)

    snap_ms = (time.perf_counter() - t0) * 1000 if t0 is not None else 0.0

    with open(path, 'wb') as f:
        regions_data = []

        # snap_meta: first region. 16 bytes — u64 time_ms (Q), u32 flags, u32 reserved.
        meta_bytes = struct.pack('<Q', int(round(snap_ms))) + struct.pack('<II', 0, 0)
        regions_data.append(('snap_meta', 0, meta_bytes))

        # Static regions
        for name, addr, size in SNAPSHOT_REGIONS:
            data = read_mem(h, addr, size)
            if data:
                regions_data.append((name, addr, data))

        # Tile array — heap-allocated, read via pointer at TILE_PTR_ADDR.
        # Size = ms * 6, where ms = (mapWidth / 2) * mapHeight.
        # The actual heap address is stored as the region's addr field so the
        # reader can display it, but the data is the raw tile bytes.
        ptr_data = read_mem(h, TILE_PTR_ADDR, 4)
        if ptr_data:
            tile_base = struct.unpack('<I', ptr_data)[0]
            ms = (map_w // 2) * map_h
            tile_data = read_mem(h, tile_base, ms * 6) if tile_base else None
            if tile_data:
                regions_data.append(('tiles', tile_base, tile_data))

        f.write(b'CIV2SNAP')
        f.write(struct.pack('<I', len(regions_data)))

        for name, addr, data in regions_data:
            name_bytes = name.encode('ascii')[:16].ljust(16, b'\x00')
            f.write(name_bytes)
            f.write(struct.pack('<I', addr))
            f.write(struct.pack('<I', len(data)))

        for name, addr, data in regions_data:
            f.write(data)

    return fname

# ═══════════════════════════════════════════════════════════════════
# Combat tracking
# ═══════════════════════════════════════════════════════════════════

# Tracks HP changes per unit id: {unit_id: {'info':..., 'rounds':[(hp_b, hp_a, ms), ...], 'activeUnit': idx}}
_combat_hp_log = {}
_combat_active_unit = None  # set each diff cycle from curr['activeUnit']

def _log_hp_change(unit_id, hp_before, hp_after, ms, unit_info=None):
    if unit_id not in _combat_hp_log:
        _combat_hp_log[unit_id] = {'rounds': [], 'info': unit_info, 'activeUnit': _combat_active_unit}
    _combat_hp_log[unit_id]['rounds'].append((hp_before, hp_after, ms))
    if unit_info:
        _combat_hp_log[unit_id]['info'] = unit_info

def _get_combat_rounds(unit_id):
    """Get and clear accumulated HP changes for a unit. Returns (rounds, info)."""
    entry = _combat_hp_log.pop(unit_id, None)
    if entry:
        return entry['rounds'], entry.get('info')
    return [], None

def _find_combat_opponent(dead_id, dead_owner):
    """Find the other unit involved in combat by looking for HP changes at similar timestamps."""
    dead_entry = _combat_hp_log.get(dead_id)
    if not dead_entry or not dead_entry['rounds']:
        return None
    dead_times = {r[2] for r in dead_entry['rounds']}
    # Look for another unit with HP changes within 2ms of the dead unit's changes
    best = None
    best_overlap = 0
    for uid, entry in _combat_hp_log.items():
        if uid == dead_id: continue
        info = entry.get('info')
        if info and info.get('owner') == dead_owner: continue  # same team
        overlap = sum(1 for _, _, t in entry['rounds'] if any(abs(t - dt) < 100 for dt in dead_times))
        if overlap > best_overlap:
            best_overlap = overlap
            best = uid
    return best

# ═══════════════════════════════════════════════════════════════════
# Diffing
# ═══════════════════════════════════════════════════════════════════

def diff_states(prev, curr, t0, handle=None):
    global _combat_active_unit
    lines = []
    ms = (time.perf_counter() - t0) * 1000
    _combat_active_unit = curr.get('activeUnit')

    # Helper to get civ name
    def cn(idx):
        if 0 <= idx < 8:
            return curr['civs'][idx].get('civName', f'Civ{idx}')
        return f'Civ{idx}'

    # Turn / active civ
    if prev['turn'] != curr['turn'] or prev['activeCiv'] != curr['activeCiv']:
        human = curr.get('humanPlayers', 0) or 0
        ac = curr['activeCiv'] or 0
        ctype = 'HUMAN' if human & (1 << ac) else 'AI'
        lines.append(f"\n{'═'*60}")
        lines.append(f"Turn {curr['turn']} | {cn(ac)} ({ctype})")
        lines.append('═' * 60)

    # Active unit change (AI processing)
    if prev.get('activeUnit') != curr.get('activeUnit') and curr.get('activeUnit',0) >= 0:
        au = curr['activeUnit']
        u = next((u for u in curr['units'] if u['idx'] == au), None)
        if u:
            lines.append(f"[{ms:10.1f}ms]  >> Processing: {u['name']} #{au} ({cn(u['owner'])}) at ({u['x']},{u['y']})")

    # Civ changes
    for i in range(8):
        p, c = prev['civs'][i], curr['civs'][i]
        ch = []
        if p['gold'] != c['gold']: ch.append(f"gold {p['gold']}→{c['gold']}")
        if p['gov'] != c['gov']: ch.append(f"gov {p['govName']}→{c['govName']}")
        if p['beakers'] != c['beakers']: ch.append(f"beakers {p['beakers']}→{c['beakers']}")
        if p['sciRate'] != c['sciRate']: ch.append(f"sci {p['sciRate']}%→{c['sciRate']}%")
        if p['taxRate'] != c['taxRate']: ch.append(f"tax {p['taxRate']}%→{c['taxRate']}%")
        if p['numTechs'] != c['numTechs']:
            # The tech they just discovered is what they WERE researching
            discovered = TECH_NAMES[p['researching']] if p['researching'] is not None and 0 <= p['researching'] < len(TECH_NAMES) else None
            if discovered and c['numTechs'] > p['numTechs']:
                ch.append(f"DISCOVERED {discovered} (techs {p['numTechs']}→{c['numTechs']})")
            else:
                ch.append(f"techs {p['numTechs']}→{c['numTechs']}")
        if p['reputation'] != c['reputation']: ch.append(f"rep {p['reputation']}→{c['reputation']}")
        if p.get('patience') != c.get('patience'): ch.append(f"patience {p.get('patience')}→{c.get('patience')}")
        if p['luxRate'] != c['luxRate']: ch.append(f"lux {p['luxRate']}%→{c['luxRate']}%")
        if p['researching'] != c['researching']:
            rname = TECH_NAMES[c['researching']] if c['researching'] is not None and 0 <= c['researching'] < len(TECH_NAMES) else f"#{c['researching']}"
            ch.append(f"researching→{rname}")
        if p.get('numCities',0) != c.get('numCities',0):
            ch.append(f"cities {p.get('numCities',0)}→{c.get('numCities',0)}")
        if p.get('militaryUnitCount',0) != c.get('militaryUnitCount',0):
            ch.append(f"military {p.get('militaryUnitCount',0)}→{c.get('militaryUnitCount',0)}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  {cn(i)}: {', '.join(ch)}")
        # Tech list changes — identify specific techs gained/lost
        pt = p.get('techList', bytes(93))
        ct = c.get('techList', bytes(93))
        if pt != ct:
            for ti in range(min(len(pt), len(ct), 93)):
                if pt[ti] != ct[ti]:
                    tname = TECH_NAMES[ti] if ti < len(TECH_NAMES) else f'Tech{ti}'
                    if ct[ti] > pt[ti]:
                        lines.append(f"[{ms:10.1f}ms]  TECH: {cn(i)} gained {tname}")
                    else:
                        lines.append(f"[{ms:10.1f}ms]  TECH: {cn(i)} lost {tname}")
        # Unit type count changes — army composition
        pu_counts = p.get('unitTypeCounts', bytes(54))
        cu_counts = c.get('unitTypeCounts', bytes(54))
        if pu_counts != cu_counts:
            for ui in range(min(len(pu_counts), len(cu_counts), 54)):
                if pu_counts[ui] != cu_counts[ui]:
                    uname = UNIT_NAMES[ui] if ui < len(UNIT_NAMES) else f'UnitType{ui}'
                    lines.append(f"[{ms:10.1f}ms]  ARMY: {cn(i)} {uname} count {pu_counts[ui]}→{cu_counts[ui]}")
        # Units-in-production changes (array indexed by unit type, at civ +0x154)
        pi_counts = p.get('unitsInProduction', bytes(54))
        ci_counts = c.get('unitsInProduction', bytes(54))
        if pi_counts != ci_counts:
            for ii in range(min(len(pi_counts), len(ci_counts), 54)):
                if pi_counts[ii] != ci_counts[ii]:
                    uname = UNIT_NAMES[ii] if ii < len(UNIT_NAMES) else f'UnitType{ii}'
                    lines.append(f"[{ms:10.1f}ms]  PRODUCTION: {cn(i)} {uname} in-production count {pi_counts[ii]}→{ci_counts[ii]}")
        # Diplomatic status changes
        for j in c.get('diplo', {}):
            pd = p.get('diplo', {}).get(j, set())
            cd = c['diplo'][j]
            if pd != cd:
                added = cd - pd
                removed = pd - cd
                parts = []
                if added: parts.append(f"+{','.join(sorted(added))}")
                if removed: parts.append(f"-{','.join(sorted(removed))}")
                lines.append(f"[{ms:10.1f}ms]  DIPLO: {cn(i)}→{cn(j)}: {' '.join(parts)} [{','.join(sorted(cd)) or 'none'}]")
        # Attitude changes
        for j in c.get('attitude', {}):
            pa = p.get('attitude', {}).get(j)
            ca = c['attitude'][j]
            if pa != ca and pa is not None:
                lines.append(f"[{ms:10.1f}ms]  ATTITUDE: {cn(i)}→{cn(j)}: {pa}→{ca}")
        # Spy operations changes
        for j in c.get('spyOps', {}):
            ps = p.get('spyOps', {}).get(j, 0)
            cs = c['spyOps'][j]
            if ps != cs and ps is not None:
                lines.append(f"[{ms:10.1f}ms]  SPY OPS: {cn(i)}→{cn(j)}: {ps}→{cs}")
        # Spy level changes
        for j in c.get('spyLevel', {}):
            ps = p.get('spyLevel', {}).get(j, 0)
            cs = c['spyLevel'][j]
            if ps != cs and ps is not None:
                lines.append(f"[{ms:10.1f}ms]  SPY LEVEL: {cn(i)}→{cn(j)}: {ps}→{cs}")
        # Border friction changes
        for j in c.get('friction', {}):
            pf = p.get('friction', {}).get(j)
            cf = c['friction'][j]
            if pf != cf and pf is not None:
                lines.append(f"[{ms:10.1f}ms]  FRICTION: {cn(i)}→{cn(j)}: {pf}→{cf}")
        # Raw byte diff — catch anything we haven't explicitly handled
        pr = p.get('raw', b'')
        cr = c.get('raw', b'')
        if pr and cr and len(pr) == len(cr) and pr != cr:
            # Only log changes in regions we don't already diff above
            # Known handled offsets (relative to CIV_BASE, including 0xA0 header):
            handled = set()
            H = 0xA0
            for off in [H+0x02, H+0x03, H+0x04, H+0x05,  # gold (4 bytes)
                        H+0x0A, H+0x0B,  # beakers
                        H+0x0C,  # researching
                        H+0x10,  # num_techs
                        H+0x13, H+0x14, H+0x15,  # sci, tax, gov
                        H+0x1E, H+0x1F,  # rep, patience
                        ]:
                handled.add(off)
            for off in range(H+0x20, H+0x58): handled.add(off)  # diplo+attitude+spy+friction
            for off in range(H+0x66, H+0x6A): handled.add(off)  # numCities, numUnits
            for off in range(H+0x74, H+0x74+93): handled.add(off)  # techList
            for off in range(H+0xD8, H+0xD8+54): handled.add(off)  # unitTypeCounts
            for off in range(H+0x154, H+0x154+54): handled.add(off)  # unitsInProduction
            for off in range(H+0x3E2, H+0x3F2): handled.add(off)  # lastContact
            for off in range(H+0x3F3, H+0x3FB): handled.add(off)  # spyLevel
            for off in range(len(pr)):
                if off not in handled and pr[off] != cr[off]:
                    if off < H:
                        lines.append(f"[{ms:10.1f}ms]  CIV RAW: {cn(i)} header byte 0x{off:03X}: {pr[off]}→{cr[off]}")
                    else:
                        lines.append(f"[{ms:10.1f}ms]  CIV RAW: {cn(i)} field 0x{off-H:03X} (abs 0x{off:03X}): {pr[off]}→{cr[off]}")

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
            lines.append(f"[{ms:10.1f}ms]  NEW CITY: {c['name']} ({cn(c['owner'])}) at ({c['x']},{c['y']})")
            continue
        ch = []
        if p['size'] != c['size']: ch.append(f"size {p['size']}→{c['size']}")
        if p['food'] != c['food']: ch.append(f"food {p['food']}→{c['food']}")
        if p['shields'] != c['shields']: ch.append(f"shld {p['shields']}→{c['shields']}")
        if p['trade'] != c['trade']: ch.append(f"trade {p['trade']}→{c['trade']}")
        if p['prodItem'] != c['prodItem']: ch.append(f"build {p['prodName']}→{c['prodName']}")
        if p['happy'] != c['happy']: ch.append(f"happy {p['happy']}→{c['happy']}")
        if p['unhappy'] != c['unhappy']: ch.append(f"unhappy {p['unhappy']}→{c['unhappy']}")
        if p['scienceOutput'] != c['scienceOutput']: ch.append(f"sci {p['scienceOutput']}→{c['scienceOutput']}")
        if p['taxOutput'] != c['taxOutput']: ch.append(f"tax {p['taxOutput']}→{c['taxOutput']}")
        if p['totalTrade'] != c['totalTrade']: ch.append(f"totalTrade {p['totalTrade']}→{c['totalTrade']}")
        if p['foodProduction'] != c['foodProduction']: ch.append(f"foodProd {p['foodProduction']}→{c['foodProduction']}")
        if p['shieldProduction'] != c['shieldProduction']: ch.append(f"shldProd {p['shieldProduction']}→{c['shieldProduction']}")
        if p['improvements'] != c['improvements']:
            # Buildings bitmask: bits 1-31 are standard improvements, 32-38 wonders
            # (matches parser.js: `for bit = 1; bit <= 31` + 5 bits at offset +0x38).
            # Bit 0 is reserved/unused ("Nothing" in BUILDING_NAMES).
            diff_bits = p['improvements'] ^ c['improvements']
            for bit in range(1, 40):
                if diff_bits & (1 << bit):
                    bname = BUILDING_NAMES[bit] if bit < len(BUILDING_NAMES) else f'Bldg{bit}'
                    action = '+' if c['improvements'] & (1 << bit) else '-'
                    ch.append(f"impr {action}{bname}")
        if p['wltk'] != c['wltk']: ch.append(f"WLTK {'ON' if c['wltk'] else 'OFF'}")
        if p['disorder'] != c['disorder']: ch.append(f"DISORDER {'ON' if c['disorder'] else 'OFF'}")
        if p['numTradeRoutes'] != c['numTradeRoutes']: ch.append(f"routes {p['numTradeRoutes']}→{c['numTradeRoutes']}")
        if p['workerTiles'] != c['workerTiles']: ch.append(f"workers 0x{p['workerTiles']:08X}→0x{c['workerTiles']:08X}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  {c['name']} ({cn(c['owner'])}): {', '.join(ch)}")
        # Raw byte catch-all for city
        pr = p.get('raw', b'')
        cr = c.get('raw', b'')
        if pr and cr and len(pr) == len(cr):
            for off in range(len(pr)):
                if off in CITY_DIFFED_OFFSETS: continue
                if pr[off] != cr[off]:
                    fname = CITY_BYTE_MAP.get(off, f'byte_0x{off:02X}')
                    lines.append(f"[{ms:10.1f}ms]  CITY RAW: {c['name']} ({cn(c['owner'])}) {fname}: {pr[off]}->{cr[off]}")
    for c in pc.values():
        lines.append(f"[{ms:10.1f}ms]  CITY DESTROYED: {c['name']} ({cn(c['owner'])})")

    # Unit changes
    pu = {u['id']: u for u in prev['units']}
    for u in curr['units']:
        p = pu.pop(u['id'], None)
        if not p:
            # The "workTurnsOrCargo" (byte +0x0D) is multi-purpose — for new
            # units it's usually 0. Earlier mislabeled as "home".
            lines.append(f"[{ms:10.1f}ms]  UNIT CREATED: {u['name']} ({cn(u['owner'])}) at ({u['x']},{u['y']}) hp={u['hp']} role={u['aiRoleName']}")
            continue
        ch = []
        if p['x'] != u['x'] or p['y'] != u['y']:
            goto = f" ->({u['gotoX']},{u['gotoY']})" if u['order'] in (11, 27) else ""
            ch.append(f"({p['x']},{p['y']})->({u['x']},{u['y']}) [{u['orderName']}{goto}]")
        elif p['order'] != u['order']:
            ch.append(f"order {p['orderName']}->{u['orderName']}")
        if p['moves'] != u['moves']:
            ch.append(f"mv {p['moves']}->{u['moves']}")
        if p['veteran'] != u['veteran']:
            ch.append('VETERAN!')
        if p['hp'] != u['hp']:
            ch.append(f"hp {p['hp']}->{u['hp']}")
            _log_hp_change(u['id'], p['hp'], u['hp'], ms, unit_info={'name': u['name'], 'owner': u['owner'], 'type': u['type'], 'veteran': u.get('veteran', 0)})
        if p['workTurnsOrCargo'] != u['workTurnsOrCargo']:
            # Label based on unit type:
            #   Settlers/Engineers (0,1) → workTurns
            #   Caravans/Freight (48,49) → cargo
            #   Air units (26-31, 44-45) → fuel
            utype = u['type']
            if utype in (0, 1):
                label = 'workTurns'
            elif utype in (48, 49):
                label = 'cargo'
            elif utype in (26, 27, 28, 29, 30, 31, 44, 45):
                label = 'fuel'
            else:
                label = 'byte0D'
            ch.append(f"{label} {p['workTurnsOrCargo']}->{u['workTurnsOrCargo']}")
        if p['aiRole'] != u['aiRole']:
            ch.append(f"role {p['aiRoleName']}->{u['aiRoleName']}")
        if p['carrying'] != u['carrying']:
            ch.append(f"carry {p['carrying']}->{u['carrying']}")
        if p['fuel'] != u['fuel']:
            ch.append(f"fuel {p['fuel']}->{u['fuel']}")
        if p['visMask'] != u['visMask']:
            ch.append(f"vis 0x{p['visMask']:02X}->0x{u['visMask']:02X}")
        if p['status'] != u['status']:
            ch.append(f"status 0x{p['status']:04X}->0x{u['status']:04X}")
        if ch:
            lines.append(f"[{ms:10.1f}ms]  {u['name']} ({cn(u['owner'])}): {', '.join(ch)}")
        # Raw byte catch-all for unit
        pr = p.get('raw', b'')
        ur = u.get('raw', b'')
        if pr and ur and len(pr) == len(ur):
            for off in range(len(pr)):
                if off in UNIT_DIFFED_OFFSETS: continue
                if pr[off] != ur[off]:
                    fname = UNIT_BYTE_MAP.get(off, f'byte_0x{off:02X}')
                    lines.append(f"[{ms:10.1f}ms]  UNIT RAW: {u['name']} ({cn(u['owner'])}) {fname}: {pr[off]}->{ur[off]}")
    # Build city lookup for combat context
    city_at = {}
    for c in curr['cities']:
        city_at[(c['x'], c['y'])] = c
    for c in prev['cities']:
        city_at.setdefault((c['x'], c['y']), c)

    for u in pu.values():
        lines.append(f"[{ms:10.1f}ms]  UNIT KILLED: {u['name']} ({cn(u['owner'])}) at ({u['x']},{u['y']}) hp={u['hp']}")
        if handle and u['x'] > -500:
            map_w = curr.get('mapWidth') or 80
            dead_terrain = get_terrain_at(handle, u['x'], u['y'], map_w)
            dead_stats = get_unit_type_stats(handle, u['type'])
            dead_city = city_at.get((u['x'], u['y']))

            # Detect non-combat deaths before looking for killer
            if dead_terrain == 'Ocean' and u['name'] in ('Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer','Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport'):
                # Check if any enemy is nearby — if not, this is a sinking/lost at sea event
                has_enemy_nearby = any(cu['owner'] != u['owner'] and abs(cu['x'] - u['x']) <= 2 and abs(cu['y'] - u['y']) <= 2 for cu in curr['units'])
                if not has_enemy_nearby:
                    lines.append(f"[{ms:10.1f}ms]  LOST AT SEA: {u['name']} sank at ({u['x']},{u['y']}) — {dead_terrain}")
                    _get_combat_rounds(u['id'])  # clear any hp log
                    continue
            # Settlers consumed by city founding
            if u['name'] in ('Settlers','Engineers') and (u['x'], u['y']) in city_at:
                new_city = city_at[(u['x'], u['y'])]
                if new_city.get('owner') == u['owner']:
                    lines.append(f"[{ms:10.1f}ms]  SETTLED: {u['name']} founded/joined city at ({u['x']},{u['y']})")
                    _get_combat_rounds(u['id'])
                    continue

            # Find opponent from combat HP log (most reliable — matched by timestamp)
            opp_id = _find_combat_opponent(u['id'], u['owner'])
            dead_rounds, _ = _get_combat_rounds(u['id'])
            opp_rounds, opp_info = _get_combat_rounds(opp_id) if opp_id else ([], None)

            # Build location string for dead unit
            dloc = dead_terrain or '?'
            if dead_city:
                dloc = f"{dead_city['name']} ({dead_terrain})"
                if dead_city.get('improvements', 0) & (1 << 8):
                    dloc += ' +CityWalls'
                else:
                    dloc += ' +city'

            if dead_stats and opp_info:
                opp_stats = get_unit_type_stats(handle, opp_info['type'])
                opp_unit = next((cu for cu in curr['units'] if cu['id'] == opp_id), None)

                # Determine attacker from DAT_00655afe (activeUnit) stored during combat
                dead_entry_au = None  # activeUnit at time of combat
                # Check which unit's combat log recorded the activeUnit
                # The activeUnit is the unit whose turn it is = the attacker
                dead_was_active = (u['idx'] == _combat_active_unit)
                opp_was_active = (opp_unit and opp_unit['idx'] == _combat_active_unit)

                if opp_was_active:
                    # Opponent was the active/attacking unit, dead unit was defender
                    atk_info, def_info = opp_info, {'name': u['name'], 'owner': u['owner'], 'type': u['type'], 'veteran': u.get('veteran', 0)}
                    atk_stats, def_stats = opp_stats, dead_stats
                    atk_rounds, def_rounds = opp_rounds, dead_rounds
                    atk_unit, def_unit = opp_unit, u
                else:
                    # Dead unit was the active/attacking unit (attacker died)
                    atk_info, def_info = {'name': u['name'], 'owner': u['owner'], 'type': u['type'], 'veteran': u.get('veteran', 0)}, opp_info
                    atk_stats, def_stats = dead_stats, opp_stats
                    atk_rounds, def_rounds = dead_rounds, opp_rounds
                    atk_unit, def_unit = u, opp_unit

                # Defender location (where combat takes place)
                def_x = def_unit['x'] if def_unit and def_unit.get('x', -999) > -500 else u['x']
                def_y = def_unit['y'] if def_unit and def_unit.get('y', -999) > -500 else u['y']
                def_terrain = get_terrain_at(handle, def_x, def_y, map_w)
                def_city = city_at.get((def_x, def_y))
                def_loc = def_terrain or '?'
                if def_city:
                    def_loc = f"{def_city['name']} ({def_terrain})"
                    if def_city.get('improvements', 0) & (1 << 8):
                        def_loc += ' +CityWalls'
                    else:
                        def_loc += ' +city'

                # Attacker location (where they came from)
                atk_x = atk_unit['x'] if atk_unit and atk_unit.get('x', -999) > -500 else 0
                atk_y = atk_unit['y'] if atk_unit and atk_unit.get('y', -999) > -500 else 0
                atk_terrain = get_terrain_at(handle, atk_x, atk_y, map_w)

                a_vet = atk_info.get('veteran', 0)
                d_vet = def_info.get('veteran', 0)

                # Starting HP from first round
                a_start_dmg = atk_rounds[0][0] if atk_rounds else 0
                d_start_dmg = def_rounds[0][0] if def_rounds else 0
                a_start_hp = atk_stats['maxHp'] - a_start_dmg
                d_start_hp = def_stats['maxHp'] - d_start_dmg

                lines.append(f"[{ms:10.1f}ms]  ---- COMBAT ----")
                lines.append(f"[{ms:10.1f}ms]  Attacker: {atk_info['name']} ({cn(atk_info['owner'])}) {a_start_hp}/{atk_stats['maxHp']} hp, atk={atk_stats['attack']} fp={atk_stats['firepower']}{' VETERAN' if a_vet else ''} from {atk_terrain or '?'}")
                lines.append(f"[{ms:10.1f}ms]  Defender: {def_info['name']} ({cn(def_info['owner'])}) {d_start_hp}/{def_stats['maxHp']} hp, def={def_stats['defense']} fp={def_stats['firepower']}{' VETERAN' if d_vet else ''} at {def_loc}")

                # Modifiers
                mods = []
                if a_vet: mods.append('attacker veteran (1.5x atk)')
                if d_vet: mods.append('defender veteran (1.5x def)')
                if def_city:
                    if def_city.get('improvements', 0) & (1 << 8):
                        mods.append('City Walls (3x def)')
                    else:
                        mods.append('city (1.5x def)')
                if mods:
                    lines.append(f"[{ms:10.1f}ms]  Modifiers: {', '.join(mods)}")

                # Interleave all rounds by timestamp
                all_rounds = []
                for hp_b, hp_a, t in def_rounds:
                    all_rounds.append((t, def_info['name'], def_stats['maxHp'], hp_b, hp_a))
                for hp_b, hp_a, t in atk_rounds:
                    all_rounds.append((t, atk_info['name'], atk_stats['maxHp'], hp_b, hp_a))
                all_rounds.sort(key=lambda r: r[0])

                if all_rounds:
                    lines.append(f"[{ms:10.1f}ms]  Rounds:")
                    for i, (t, name, maxhp, hp_b, hp_a) in enumerate(all_rounds):
                        dmg = hp_a - hp_b
                        remaining = maxhp - hp_a
                        lines.append(f"[{ms:10.1f}ms]    {i+1}. {name} takes {dmg} damage -> {remaining}/{maxhp} hp")

                # Result
                if opp_unit:
                    surv_hp = opp_stats['maxHp'] - opp_unit['hp']
                    lines.append(f"[{ms:10.1f}ms]  Result: {u['name']} KILLED. {opp_info['name']} survives {surv_hp}/{opp_stats['maxHp']} hp")
                else:
                    lines.append(f"[{ms:10.1f}ms]  Result: {u['name']} KILLED.")
                lines.append(f"[{ms:10.1f}ms]  ---- END COMBAT ----")
            elif dead_stats:
                lines.append(f"[{ms:10.1f}ms]  COMBAT: {u['name']} maxHp={dead_stats['maxHp']} at {dloc} -- no opponent data")
                if dead_rounds:
                    for i, (hp_b, hp_a, t) in enumerate(dead_rounds):
                        lines.append(f"[{ms:10.1f}ms]    {i+1}. takes {hp_a - hp_b} damage -> {dead_stats['maxHp'] - hp_a}/{dead_stats['maxHp']} hp")

    return lines


# ═══════════════════════════════════════════════════════════════════
# Action events — structured JSONL for harness replay
#
# The human-readable `diff_states` output is great for inspecting a game
# but hard to consume programmatically. `emit_action_events` detects the
# same deltas and writes structured events to `events.jsonl` in the
# session directory. The fidelity harness (`dump-server-state.js
# --replay`) reads these and feeds real Civ2's AI decisions into the
# v3 reducer, so we can validate deterministic mechanics (yields, tech
# progression, etc.) without also having to replicate Civ2's AI.
#
# Event types:
#   CITY_FOUNDED     {cityIdx, x, y, owner, name, producerUid?}
#   CITY_DESTROYED   {cityIdx, x, y, owner, name}
#   UNIT_CREATED     {slot, uid, x, y, type, owner, home}
#   UNIT_KILLED      {slot, uid, x, y, type, owner}
#   UNIT_MOVED       {slot, uid, from:[x,y], to:[x,y]}
#   UNIT_ORDER       {slot, uid, order} — fortify/sleep/build-road/etc.
#   RATE_CHANGED     {civ, tax, sci, lux}
#   GOV_CHANGED      {civ, from, to}
#   RESEARCH_PICKED  {civ, techId}
#   TECH_DISCOVERED  {civ, techId}
#   GOLD_CHANGED     {civ, from, to}
#   TURN_ADVANCED    {turn, currentYear}
# ═══════════════════════════════════════════════════════════════════

def emit_action_events(prev, curr, t0, events_path):
    """Compare prev/curr state, write structured action events to JSONL.

    Called after each diff_states batch. Only writes when there are
    events to emit. Each event is one JSON object per line.
    """
    import json
    events = []
    ms = (time.perf_counter() - t0) * 1000
    turn = curr.get('turn')
    ac = curr.get('activeCiv')

    # Turn advance — useful as a replay anchor. When a poll catches a
    # turn advance, any civ-level changes observed in the same poll
    # were caused by END_TURN processing of the OLD turn, so tag those
    # with prev.turn. The harness buckets events by turn:civ and looks
    # them up during its END_TURN-for-old-turn loop — mis-tagging with
    # the new turn causes those events to be silently skipped.
    #
    # BUT: Civ2 writes these civ-level fields AFTER the turn counter has
    # incremented, so a poll sampled shortly after TURN_ADVANCED sees
    # prev.turn == curr.turn == new_turn with flags suddenly changed.
    # Track the last-turn-advance timestamp and back-tag civ events
    # within 200ms of the advance to the old turn — this window covers
    # end-of-turn bookkeeping without touching real within-turn changes.
    turn_advanced = prev.get('turn') != curr.get('turn')
    if turn_advanced:
        emit_action_events.last_advance_ms = ms
        emit_action_events.last_turn_before_advance = prev.get('turn')
    recent_advance = (hasattr(emit_action_events, 'last_advance_ms')
                      and (ms - emit_action_events.last_advance_ms) < 200.0
                      and emit_action_events.last_turn_before_advance is not None)
    if turn_advanced:
        civ_turn = prev.get('turn')
    elif recent_advance:
        civ_turn = emit_action_events.last_turn_before_advance
    else:
        civ_turn = turn
    if turn_advanced:
        events.append({
            'time_ms': round(ms, 1), 'turn': turn, 'activeCiv': ac,
            'event': 'TURN_ADVANCED',
            'currentYear': curr.get('currentYear'),
        })

    # Game-flag bit changes (bloodlust, cheatMenu, cheatPenalty, etc.).
    # The parser decodes 60+ named flags from save 0x0C..0x17; we track
    # the gameplay-relevant subset here. Each flipped bit emits a typed
    # event so the replay harness and diff tooling can react (cheat mode
    # zeroes out trophies/score — the diff should ignore those columns).
    prev_flags = (prev or {}).get('gameFlags') or {}
    curr_flags = curr.get('gameFlags') or {}
    FLAG_NAMES = ('bloodlust', 'simplifiedCombat', 'barbariansPeaceful',
                  'barbariansRaging', 'flatEarth', 'dontRestartEliminated',
                  'cheatMenu', 'cheatPenalty', 'scenarioFile',
                  'scenarioNoTechLimits')
    for name in FLAG_NAMES:
        pv, cv = prev_flags.get(name), curr_flags.get(name)
        if pv is None and cv is None: continue
        if pv != cv:
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'GAME_FLAG_CHANGED', 'flag': name,
                           'from': pv, 'to': cv})

    # Per-civ: gold, government, rates, research target, techs discovered
    for i in range(8):
        p = prev['civs'][i] if i < len(prev.get('civs', [])) else None
        c = curr['civs'][i] if i < len(curr.get('civs', [])) else None
        if not p or not c: continue
        if p.get('gov') != c.get('gov'):
            events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                           'event': 'GOV_CHANGED', 'civ': i,
                           'from': p.get('gov'), 'to': c.get('gov')})
        if p.get('stateFlags') != c.get('stateFlags'):
            events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                           'event': 'FLAGS_CHANGED', 'civ': i,
                           'from': p.get('stateFlags'),
                           'to': c.get('stateFlags')})
        # Rate changes: sci + tax + lux as a set. Only emit if any changed.
        if (p.get('sciRate') != c.get('sciRate')
                or p.get('taxRate') != c.get('taxRate')
                or p.get('luxRate') != c.get('luxRate')):
            events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                           'event': 'RATE_CHANGED', 'civ': i,
                           'tax': c.get('taxRate'), 'sci': c.get('sciRate'),
                           'lux': c.get('luxRate')})
        if p.get('researching') != c.get('researching'):
            events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                           'event': 'RESEARCH_PICKED', 'civ': i,
                           'techId': c.get('researching')})
        # Tech discovered: numTechs went up — identify which.
        if p.get('numTechs', 0) < c.get('numTechs', 0):
            # The just-discovered tech is what they WERE researching.
            discovered = p.get('researching')
            if discovered is not None and 0 <= discovered < 93:
                events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                               'event': 'TECH_DISCOVERED', 'civ': i,
                               'techId': discovered})
        # Gold — can be skipped on every tick but useful for tracking.
        if p.get('gold') != c.get('gold'):
            events.append({'time_ms': round(ms, 1), 'turn': civ_turn,
                           'event': 'GOLD_CHANGED', 'civ': i,
                           'from': p.get('gold'), 'to': c.get('gold')})

    # Cities: founded (new at same slot), destroyed (was there, now gone),
    # or renamed/moved (same slot but different identity — rare).
    prev_cities = prev.get('cities', [])
    curr_cities = curr.get('cities', [])
    for idx in range(max(len(prev_cities), len(curr_cities))):
        p = prev_cities[idx] if idx < len(prev_cities) else None
        c = curr_cities[idx] if idx < len(curr_cities) else None
        p_alive = p and p.get('size', 0) > 0
        c_alive = c and c.get('size', 0) > 0
        if not p_alive and c_alive:
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'CITY_FOUNDED', 'cityIdx': idx,
                           'x': c.get('x'), 'y': c.get('y'),
                           'owner': c.get('owner'), 'name': c.get('name')})
        elif p_alive and not c_alive:
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'CITY_DESTROYED', 'cityIdx': idx,
                           'x': p.get('x'), 'y': p.get('y'),
                           'owner': p.get('owner'), 'name': p.get('name')})
        elif p_alive and c_alive:
            # CITY_YIELD diagnostic — emitted whenever a stored-box or
            # size value changes. NOT used to override v3's predicted
            # yields; instead used by the fidelity diff tooling to
            # attribute shield/food/trade mismatches to the right turn
            # and make v3's yield-calc bugs reproducible. Includes the
            # per-turn production rates (foodProduction, shieldProduction,
            # totalTrade) as captured by the binary so the diff can
            # show "v3 predicted shield=X, binary reports shield=Y".
            if (p.get('food') != c.get('food')
                    or p.get('shields') != c.get('shields')
                    or p.get('trade') != c.get('trade')
                    or p.get('size') != c.get('size')):
                events.append({'time_ms': round(ms, 1), 'turn': turn,
                               'event': 'CITY_YIELD', 'cityIdx': idx,
                               'owner': c.get('owner'),
                               'size': c.get('size'),
                               'sizeFrom': p.get('size'),
                               'foodBox': c.get('food'), 'foodBoxFrom': p.get('food'),
                               'shieldBox': c.get('shields'), 'shieldBoxFrom': p.get('shields'),
                               'tradeNet': c.get('trade'), 'tradeNetFrom': p.get('trade'),
                               'foodProd': c.get('foodProduction'),
                               'shieldProd': c.get('shieldProduction'),
                               'totalTrade': c.get('totalTrade'),
                               'sciOut': c.get('scienceOutput'),
                               'taxOut': c.get('taxOutput'),
                               'disorder': c.get('disorder'),
                               'wltk': c.get('wltk')})

    # Units: created (uid went 0→N), killed (N→0), moved (x/y changed),
    # order changed. Iterate by slot index.
    prev_units = {u.get('idx'): u for u in prev.get('units', []) if u}
    curr_units = {u.get('idx'): u for u in curr.get('units', []) if u}
    all_slots = set(prev_units.keys()) | set(curr_units.keys())
    for slot in sorted(all_slots):
        p = prev_units.get(slot)
        c = curr_units.get(slot)
        p_uid = p.get('id', 0) if p else 0
        c_uid = c.get('id', 0) if c else 0
        if p_uid == 0 and c_uid != 0 and c:
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_CREATED', 'slot': slot,
                           'uid': c_uid, 'x': c.get('x'), 'y': c.get('y'),
                           'type': c.get('type'), 'owner': c.get('owner'),
                           'order': c.get('order'),
                           'gotoX': c.get('gotoX'), 'gotoY': c.get('gotoY'),
                           'moveSpent': c.get('moveSpent'),
                           'statusFlags': c.get('statusFlags')})
            continue
        if p_uid != 0 and c_uid == 0 and p:
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_KILLED', 'slot': slot,
                           'uid': p_uid, 'x': p.get('x'), 'y': p.get('y'),
                           'type': p.get('type'), 'owner': p.get('owner')})
            continue
        if not p or not c: continue
        # Movement
        if (p.get('x'), p.get('y')) != (c.get('x'), c.get('y')):
            # Include gotoX/gotoY/moveSpent/statusFlags in the event —
            # when the poll interval misses an intermediate step (AI
            # multi-tile goto), replay can still land on the correct
            # final state using the captured fields. Without these,
            # the harness can only infer moveSpent from the final
            # tile's terrain cost, which undershoots for multi-tile
            # moves.
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_MOVED', 'slot': slot, 'uid': c_uid,
                           'owner': c.get('owner'), 'type': c.get('type'),
                           'from': [p.get('x'), p.get('y')],
                           'to': [c.get('x'), c.get('y')],
                           'gotoX': c.get('gotoX'), 'gotoY': c.get('gotoY'),
                           'moveSpent': c.get('moveSpent'),
                           'statusFlags': c.get('statusFlags')})
        # Order change (fortify, sleep, build-road, etc.)
        if p.get('order') != c.get('order'):
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_ORDER', 'slot': slot, 'uid': c_uid,
                           'owner': c.get('owner'),
                           'order': c.get('order'),
                           'orderName': c.get('orderName')})
        # Damage change (combat round, healing, pillage). Binary writes
        # the damage byte at unit+0x0A each round of combat. The harness
        # needs these because replay mode skips v3's combat resolution
        # (which would rely on v3's attack/defense matching binary, not
        # guaranteed). Emitting each delta lets the harness apply the
        # damage directly so damageTaken matches the snapshot.
        if p.get('hp') != c.get('hp'):
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_DAMAGE', 'slot': slot, 'uid': c_uid,
                           'owner': c.get('owner'),
                           'from': p.get('hp'), 'to': c.get('hp')})
        # Visibility mask change (civ+0x09 visMask byte — bitmask of
        # which civs have spotted this unit). Changes when another civ's
        # unit comes into sight range. Replay needs this because v3
        # doesn't recompute per-unit visibility masks.
        if p.get('visMask') != c.get('visMask'):
            events.append({'time_ms': round(ms, 1), 'turn': turn,
                           'event': 'UNIT_VIS_CHANGED', 'slot': slot, 'uid': c_uid,
                           'owner': c.get('owner'),
                           'from': p.get('visMask'), 'to': c.get('visMask')})

    if events:
        try:
            with open(events_path, 'a', encoding='utf-8') as f:
                for ev in events:
                    f.write(json.dumps(ev, separators=(',', ':')) + '\n')
        except Exception:
            pass

    return events


# ═══════════════════════════════════════════════════════════════════
# Input hooks (--hooks, toggle with F12)
# ═══════════════════════════════════════════════════════════════════

WH_KEYBOARD_LL = 13
WH_MOUSE_LL    = 14
WM_KEYDOWN     = 0x0100
WM_SYSKEYDOWN  = 0x0104
WM_LBUTTONDOWN = 0x0201
WM_LBUTTONUP   = 0x0202
WM_RBUTTONDOWN = 0x0204
WM_RBUTTONUP   = 0x0205
WM_MBUTTONDOWN = 0x0207
WM_MOUSEWHEEL  = 0x020A
VK_F12         = 0x7B

VKEY_NAMES = {
    0x08:'Backspace', 0x09:'Tab', 0x0D:'Enter', 0x10:'Shift', 0x11:'Ctrl',
    0x12:'Alt', 0x1B:'Esc', 0x20:'Space', 0x21:'PgUp', 0x22:'PgDn',
    0x23:'End', 0x24:'Home', 0x25:'Left', 0x26:'Up', 0x27:'Right', 0x28:'Down',
    0x2D:'Insert', 0x2E:'Delete',
    0x60:'Num0', 0x61:'Num1', 0x62:'Num2', 0x63:'Num3', 0x64:'Num4',
    0x65:'Num5', 0x66:'Num6', 0x67:'Num7', 0x68:'Num8', 0x69:'Num9',
    0x70:'F1', 0x71:'F2', 0x72:'F3', 0x73:'F4', 0x74:'F5',
    0x75:'F6', 0x76:'F7', 0x77:'F8', 0x78:'F9', 0x79:'F10',
    0x7A:'F11', 0x7B:'F12',
    0x90:'NumLock', 0x91:'ScrollLock',
}

MOUSE_NAMES = {
    WM_LBUTTONDOWN: 'LCLICK',
    WM_LBUTTONUP:   'LRELEASE',
    WM_RBUTTONDOWN: 'RCLICK',
    WM_RBUTTONUP:   'RRELEASE',
    WM_MBUTTONDOWN: 'MCLICK',
    WM_MOUSEWHEEL:  'WHEEL',
}

class KBDLLHOOKSTRUCT(ctypes.Structure):
    _fields_ = [
        ('vkCode',      wt.DWORD),
        ('scanCode',    wt.DWORD),
        ('flags',       wt.DWORD),
        ('time',        wt.DWORD),
        ('dwExtraInfo', ctypes.POINTER(ctypes.c_ulong)),
    ]

class MSLLHOOKSTRUCT(ctypes.Structure):
    _fields_ = [
        ('pt_x',        ctypes.c_long),
        ('pt_y',        ctypes.c_long),
        ('mouseData',   wt.DWORD),
        ('flags',       wt.DWORD),
        ('time',        wt.DWORD),
        ('dwExtraInfo', ctypes.POINTER(ctypes.c_ulong)),
    ]

HOOKPROC = ctypes.WINFUNCTYPE(ctypes.c_long, ctypes.c_int, ctypes.c_uint, ctypes.POINTER(ctypes.c_long))

def vkey_name(vk):
    if vk in VKEY_NAMES:
        return VKEY_NAMES[vk]
    if 0x30 <= vk <= 0x39: return chr(vk)       # 0–9
    if 0x41 <= vk <= 0x5A: return chr(vk)       # A–Z
    return f'VK{vk:02X}'

VK_CAPTURE = 0x13  # Pause/Break key — triggers window capture

def start_hook_thread(log_fn, t0, hooks_active, target_pid=None, capture_flag=None):
    """
    Install low-level keyboard and mouse hooks in a dedicated thread.
    hooks_active is a single-element list [bool] shared with the main thread.
    F12 toggles hooks_active[0] on/off. F11 triggers a window capture.
    All other keys/clicks are logged only when hooks_active[0] is True
    AND the Civ2 window is in the foreground.
    If target_pid is None, logs all events (old behavior).
    capture_flag is a single-element list [bool] — set True on F11, main loop reads it.
    """
    _GetForegroundWindow = user32.GetForegroundWindow
    _GetForegroundWindow.restype = ctypes.c_void_p
    _GetWindowThreadProcessId = user32.GetWindowThreadProcessId
    _pid_buf = ctypes.c_ulong(0)

    def is_target_foreground():
        if target_pid is None:
            return True
        hwnd = _GetForegroundWindow()
        if not hwnd:
            return False
        _GetWindowThreadProcessId(hwnd, ctypes.byref(_pid_buf))
        return _pid_buf.value == target_pid

    def kb_callback(nCode, wParam, lParam):
        if nCode >= 0 and wParam in (WM_KEYDOWN, WM_SYSKEYDOWN):
            kb = ctypes.cast(lParam, ctypes.POINTER(KBDLLHOOKSTRUCT)).contents
            vk = kb.vkCode
            if vk == VK_F12:
                hooks_active[0] = not hooks_active[0]
                state = 'on' if hooks_active[0] else 'off'
                log_fn(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  HOOKS: {state} (F12)")
            elif vk == VK_CAPTURE and capture_flag is not None:
                capture_flag[0] = True
                log_fn(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  CAPTURE: F11 pressed — capturing windows...")
            elif hooks_active[0] and is_target_foreground():
                log_fn(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  KEY: {vkey_name(vk)}")
        return user32.CallNextHookEx(None, nCode, wParam, lParam)

    def mouse_callback(nCode, wParam, lParam):
        if nCode >= 0 and hooks_active[0] and wParam in MOUSE_NAMES and is_target_foreground():
            ms = ctypes.cast(lParam, ctypes.POINTER(MSLLHOOKSTRUCT)).contents
            label = MOUSE_NAMES[wParam]
            log_fn(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  MOUSE: {label} ({ms.pt_x},{ms.pt_y})")
        return user32.CallNextHookEx(None, nCode, wParam, lParam)

    # Keep references alive for the duration of the thread
    kb_fn = HOOKPROC(kb_callback)
    ms_fn = HOOKPROC(mouse_callback)

    def run():
        kb_hook = user32.SetWindowsHookExW(WH_KEYBOARD_LL, kb_fn, None, 0)
        ms_hook = user32.SetWindowsHookExW(WH_MOUSE_LL,    ms_fn, None, 0)
        if not kb_hook or not ms_hook:
            log_fn("WARNING: Failed to install input hooks (try running as Administrator)")
            return
        # Message loop — required for low-level hooks to fire
        msg = wt.MSG()
        while user32.GetMessageW(ctypes.byref(msg), None, 0, 0) != 0:
            user32.TranslateMessage(ctypes.byref(msg))
            user32.DispatchMessageW(ctypes.byref(msg))
        user32.UnhookWindowsHookEx(kb_hook)
        user32.UnhookWindowsHookEx(ms_hook)

    t = threading.Thread(target=run, daemon=True)
    t.start()
    return t

# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

def main():
    args = sys.argv[1:]
    log_file = None
    if '--log' in args:
        i = args.index('--log')
        log_file = args[i + 1]
    use_hooks = '--hooks' in args

    # Create snapshot directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    session_id = time.strftime('%Y%m%d_%H%M%S')
    snap_dir = os.path.join(script_dir, 'snapshots', f'game_{session_id}')
    os.makedirs(snap_dir, exist_ok=True)

    log_lock = threading.Lock()
    log_buf = []

    def log(text):
        print(text)
        if log_file:
            with log_lock:
                log_buf.append(text)

    def flush():
        if log_file:
            with log_lock:
                if log_buf:
                    with open(log_file, 'a', encoding='utf-8') as f:
                        f.write('\n'.join(log_buf) + '\n')
                    log_buf.clear()

    log("Civ2 Memory Sniffer (continuous + snapshots)")
    log(f"Snapshots → {snap_dir}")
    if log_file:
        with open(log_file, 'w', encoding='utf-8') as f:
            f.write(f"Civ2 Sniffer — {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Snapshots: {snap_dir}\n\n")
        log(f"Log → {log_file}")
    if use_hooks:
        log("Hooks: ENABLED (F12 to toggle)")

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

    # Start hook thread after t0 is established
    capture_flag = [False]
    if use_hooks:
        hooks_active = [True]
        start_hook_thread(log, t0, hooks_active, target_pid=pid, capture_flag=capture_flag)

    diff_name = DIFF_NAMES[prev['difficulty']] if prev['difficulty'] is not None and prev['difficulty'] < 6 else '?'
    log(f"\nTurn {prev['turn']} | {diff_name} | Map {prev['mapWidth']}x{prev['mapHeight']} | Seed {prev['mapSeed']}")
    log(f"Cities: {len(prev['cities'])} | Units: {len(prev['units'])}")
    for i, cv in enumerate(prev['civs']):
        if cv['gold'] is not None and (cv['gold'] > 0 or cv['numTechs']):
            rname = TECH_NAMES[cv['researching']] if cv['researching'] is not None and 0 <= cv['researching'] < len(TECH_NAMES) else f"#{cv['researching']}"
            nc = cv.get('numCities', '?')
            nu = cv.get('numUnits', '?')
            log(f"  {cv['civName']}: gold={cv['gold']} {cv['govName']} sci={cv['sciRate']}% tax={cv['taxRate']}% lux={cv['luxRate']}% techs={cv['numTechs']} cities={nc} units={nu} researching={rname}")
    for c in prev['cities'][:8]:
        log(f"  {c['name']} (civ {c['owner']}) sz={c['size']} food={c['food']} shld={c['shields']} build={c['prodName']} happy={c['happy']} unhappy={c['unhappy']}{' DISORDER' if c['disorder'] else ''}{' WLTK' if c['wltk'] else ''}")
    if len(prev['cities']) > 8:
        log(f"  ... +{len(prev['cities'])-8} more")
    wonders = prev['wonders']
    if wonders:
        wlist = [WONDER_NAMES[w] if w < len(WONDER_NAMES) else f'W{w}' for w in wonders]
        log(f"  Wonders: {', '.join(wlist)}")

    # Initial baseline dump only if a game is actually loaded. When the
    # sniffer attaches during Civ2's title/menu screen, mapWidth/Height
    # are 0 and a dump would just be noise.
    if (prev.get('mapWidth') or 0) and (prev.get('mapHeight') or 0):
        fname = dump_snapshot(handle, snap_dir, prev['turn'] or 0,
                              prev['mapWidth'] or 0, prev['mapHeight'] or 0,
                              prev['difficulty'] or 0, t0=t0)
        log(f"  Snapshot: {fname}")
    else:
        log("  (No game loaded yet — waiting for GAME_STARTED.)")
    flush()

    log(f"\nMonitoring... (Ctrl+C to stop)\n")
    polls = 0
    changes = 0
    last_status = time.perf_counter()
    last_turn = prev['turn']
    prev_windows = enum_civ2_windows(pid)
    last_win_poll = time.perf_counter()

    # Deferred dump logic — dump snapshot only when game has been "quiet"
    # (no state changes) for N consecutive polls after a turn increment.
    # This captures the moment when the game has paused waiting for human
    # input, so ALL per-civ turn processing for the new turn is finished
    # and state is stable. Earlier design dumped immediately at turn change,
    # which caught a mid-round state (activeCiv still rotating through AI
    # civs) and made fidelity diffs noisy.
    pending_dump = False
    quiet_polls = 0
    QUIET_THRESHOLD = 150  # ~50ms at 2700 Hz — well after AI processing settles

    snap_log = os.path.join(snap_dir, 'game.log')

    # Game lifecycle state machine
    #   - 'loaded'  : game fully initialized — map dims nonzero AND
    #                 mapSeed nonzero. Civ2 allocates the map buffer
    #                 before writing difficulty/seed, so requiring
    #                 mapSeed != 0 waits for init to finish (~4 seconds
    #                 empirically). Otherwise GAME_STARTED fires mid-
    #                 init and the first dump captures stale zero bytes
    #                 for difficulty, humanPlayers, civsAlive, etc.
    #   - 'unloaded': pre-init, title screen, menu, or just-closed game
    #                 (memory freed but process alive).
    #   - 'no_process': civ2.exe died; sniffer reattaches on new PID
    #
    # Transitions emit typed events:
    #   loaded → unloaded   : GAME_CLOSED
    #   unloaded → loaded   : GAME_STARTED (also rotates session dir)
    #   * → no_process      : PROCESS_DIED  → PROCESS_ATTACHED on reattach
    def game_state(s):
        mw = s.get('mapWidth') or 0
        mh = s.get('mapHeight') or 0
        seed = s.get('mapSeed') or 0
        # Civ2 writes map dims and mapSeed earlier in init than the civ
        # data / starting units. Also require totalUnits > 0 so the
        # first turn-0 snapshot doesn't fire before settlers are placed
        # — otherwise the dump captures all-zero civ governments/rates
        # and a diff against turn 1 explodes with 90+ mismatches that
        # aren't v3 bugs, they're "sniffer captured too early."
        nu = s.get('totalUnits') or 0
        return 'loaded' if (mw > 0 and mh > 0 and seed != 0 and nu > 0) else 'unloaded'

    current_game_state = game_state(prev)
    events_path = os.path.join(snap_dir, 'events.jsonl')

    def _emit_lifecycle(ev_type, **extra):
        import json as _json
        ms = (time.perf_counter() - t0) * 1000
        payload = {'time_ms': round(ms, 1), 'event': ev_type}
        payload.update(extra)
        try:
            with open(events_path, 'a', encoding='utf-8') as ef:
                ef.write(_json.dumps(payload, separators=(',', ':')) + '\n')
        except Exception:
            pass
        log(f"[{ms:10.1f}ms]  {ev_type}: {extra}")
        flush()

    def _rotate_session(reason):
        """Start a fresh snapshots/game_<ts>/ directory. Used when a new
        game is detected so snapshots and events for each distinct game
        live in their own dir. time_ms stays relative to sniffer start."""
        nonlocal snap_dir, events_path, snap_log
        new_id = time.strftime('%Y%m%d_%H%M%S')
        new_dir = os.path.join(script_dir, 'snapshots', f'game_{new_id}')
        os.makedirs(new_dir, exist_ok=True)
        snap_dir = new_dir
        events_path = os.path.join(snap_dir, 'events.jsonl')
        snap_log = os.path.join(snap_dir, 'game.log')
        log(f"  [session rotated -> {snap_dir}] ({reason})")

    try:
        while True:
            try:
                curr = read_state(handle)
            except Exception:
                flush()
                _emit_lifecycle('PROCESS_DIED')
                log("\nProcess closed. Looking for new civ2.exe...")
                # Reset lifecycle so the next GAME_STARTED fires correctly.
                current_game_state = 'unloaded'
                new_handle = None
                new_pid = None
                while not new_handle:
                    new_pid = find_process('civ2.exe')
                    if new_pid and new_pid != pid:
                        new_handle = open_process(new_pid)
                        if new_handle:
                            pid = new_pid
                            handle = new_handle
                            _emit_lifecycle('PROCESS_ATTACHED', pid=pid)
                            log(f"Reattached to PID {pid}.")
                            prev = read_state(handle)
                            prev_windows = enum_civ2_windows(pid)
                            break
                    time.sleep(2)
                continue

            polls += 1

            # Lifecycle transitions — check BEFORE the None-turn skip below
            # because a just-freed game memory can have turn=None while map
            # dims are still nonzero briefly. Using mapWidth/mapHeight as
            # the canonical "is a game loaded" indicator.
            new_game_state = game_state(curr)
            if new_game_state != current_game_state:
                if current_game_state == 'loaded' and new_game_state == 'unloaded':
                    _emit_lifecycle('GAME_CLOSED', turn=prev.get('turn'),
                                    lastCities=len([c for c in prev.get('cities', []) if c.get('size', 0) > 0]))
                elif current_game_state == 'unloaded' and new_game_state == 'loaded':
                    _rotate_session(reason='new game detected')
                    _emit_lifecycle('GAME_STARTED',
                                    mapWidth=curr.get('mapWidth'),
                                    mapHeight=curr.get('mapHeight'),
                                    difficulty=curr.get('difficulty'),
                                    mapSeed=curr.get('mapSeed'))
                    # Reset turn tracking so the first real dump fires.
                    last_turn = curr.get('turn')
                    pending_dump = True
                current_game_state = new_game_state

            if curr['turn'] is None:
                time.sleep(0.1)
                continue

            lines = diff_states(prev, curr, t0, handle=handle)
            if lines:
                # Emit structured action events in parallel with the readable
                # log. Replay harness consumes `events.jsonl`.
                try:
                    emit_action_events(prev, curr, t0, events_path)
                except Exception:
                    pass
                for line in lines: log(line)
                prev = curr
                changes += 1
                quiet_polls = 0  # reset quiet counter on any change

                if curr['turn'] != last_turn:
                    # Don't dump yet — mark as pending. The actual dump fires
                    # once the game settles (below).
                    pending_dump = True
                    last_turn = curr['turn']
                    log(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  Turn {last_turn} — waiting for quiet period before dump...")

                flush()
                if log_file:
                    try:
                        with open(snap_log, 'a', encoding='utf-8') as f:
                            f.write('\n'.join(lines) + '\n')
                    except: pass
            else:
                # No state changes this poll — accumulate quiet counter
                quiet_polls += 1
                if pending_dump and quiet_polls >= QUIET_THRESHOLD:
                    # Game has settled since last change. All per-civ
                    # processing for this turn should be complete.
                    # Skip bogus captures from the title/menu screen —
                    # if mapWidth == 0 the game isn't actually loaded
                    # (memory is uninitialized or freed). The resulting
                    # snapshot would be rejected by the harness (zero
                    # map dims) and just clutter the session dir.
                    if not (curr.get('mapWidth') or 0) or not (curr.get('mapHeight') or 0):
                        pending_dump = False
                        continue
                    snap_ms = (time.perf_counter() - t0) * 1000
                    fname = dump_snapshot(handle, snap_dir, curr['turn'] or 0,
                                          curr['mapWidth'] or 0, curr['mapHeight'] or 0,
                                          curr['difficulty'] or 0, t0=t0)
                    log(f"[{snap_ms:10.1f}ms]  Snapshot (quiet, activeCiv={curr.get('activeCiv','?')}): {fname}")
                    # Emit SNAPSHOT_DUMPED event so the replay harness can
                    # route events by the snapshot's exact capture time
                    # instead of using a heuristic post-TURN_ADVANCED window.
                    # Events with time_ms < snapshot.time_ms belong in the
                    # current prediction; later events belong in the next.
                    try:
                        import json as _json
                        with open(events_path, 'a', encoding='utf-8') as ef:
                            ef.write(_json.dumps({
                                'time_ms': round(snap_ms, 1),
                                'turn': curr['turn'] or 0,
                                'event': 'SNAPSHOT_DUMPED',
                                'fname': fname,
                                'activeCiv': curr.get('activeCiv'),
                            }, separators=(',', ':')) + '\n')
                    except Exception:
                        pass
                    flush()
                    pending_dump = False

            # Window/dialog polling (every 0.5s to avoid overhead)
            now_wp = time.perf_counter()
            if now_wp - last_win_poll > 0.5:
                try:
                    curr_windows = enum_civ2_windows(pid)
                    win_lines = diff_windows(prev_windows, curr_windows, t0, handle=handle)
                    if win_lines:
                        for line in win_lines: log(line)
                        flush()
                        if log_file:
                            try:
                                with open(snap_log, 'a', encoding='utf-8') as f:
                                    f.write('\n'.join(win_lines) + '\n')
                            except: pass
                    prev_windows = curr_windows
                except: pass
                last_win_poll = now_wp

            # F11 window capture
            if capture_flag[0]:
                capture_flag[0] = False
                try:
                    script_dir = os.path.dirname(os.path.abspath(__file__))
                    sniff_win = os.path.join(script_dir, 'sniff-windows.py')
                    result = subprocess.run(
                        [sys.executable, sniff_win],
                        capture_output=True, text=True, timeout=10
                    )
                    # Find screenshot dir from output
                    for line in result.stdout.splitlines():
                        if 'Screenshots' in line and '->' in line:
                            cap_dir = line.split('->')[-1].strip()
                            log(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  CAPTURE: saved to {cap_dir}")
                            break
                    # Save full output to snap_dir
                    cap_file = os.path.join(snap_dir, f'windows_{time.strftime("%H%M%S")}.txt')
                    with open(cap_file, 'w', encoding='utf-8') as f:
                        f.write(result.stdout)
                    log(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  CAPTURE: window dump → {os.path.basename(cap_file)}")
                    flush()
                except Exception as e:
                    log(f"[{(time.perf_counter()-t0)*1000:10.1f}ms]  CAPTURE: error — {e}")
                    flush()

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
