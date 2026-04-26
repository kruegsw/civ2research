#!/usr/bin/env python3
"""
snap-now.py — One-shot CIV2SNAP dump of civ2.exe's current memory state.

Attaches to civ2.exe, reads the same memory regions sniff-game.py dumps
on turn changes, writes a CIV2SNAP file, exits. Use this to inspect
state mid-turn (between end-turn clicks) without waiting for the
continuous sniffer to trigger.

Usage:
  python charlizationv4/snap-now.py               # default output dir
  python charlizationv4/snap-now.py -o out.bin    # specific file
  python charlizationv4/snap-now.py --label foo   # tag filename

Works whether or not sniff-game.py is also running — Windows
ReadProcessMemory is safe to call concurrently from multiple tools.
"""

import ctypes
import ctypes.wintypes as wt
import struct
import sys
import os
import time
from datetime import datetime

# ═══════════════════════════════════════════════════════════════════
# Win32 API (copied from sniff-game.py — keeps this tool standalone)
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

def ri16(h, a):
    d = read_mem(h, a, 2)
    return struct.unpack('<h', d)[0] if d else None

def ru8(h, a):
    d = read_mem(h, a, 1)
    return d[0] if d else None

# ═══════════════════════════════════════════════════════════════════
# Memory regions (identical to sniff-game.py SNAPSHOT_REGIONS)
# ═══════════════════════════════════════════════════════════════════

UNIT_BASE = 0x006560f0; UNIT_STRIDE = 0x20
CITY_BASE = 0x0064f340; CITY_STRIDE = 0x58
CIV_BASE  = 0x0064c600; CIV_STRIDE  = 0x594
WONDER_BASE = 0x00655be6
TILE_PTR_ADDR = 0x00636598

SNAPSHOT_REGIONS = [
    ('globals',  0x00655af0, 0x40),
    ('units',    UNIT_BASE,  512 * UNIT_STRIDE),
    ('cities',   CITY_BASE,  256 * CITY_STRIDE),
    ('civs',     CIV_BASE,   8 * CIV_STRIDE),
    ('wonders',  WONDER_BASE, 56),
    ('cosmic',   0x0064bcc8, 22),
    ('map_dims', 0x006d1160, 32),
    ('year_table', 0x0062c490, 0x1C0),  # 6 difficulties × 6 tiers × 3 i32
]

DIFF_NAMES = ['Chieftain','Warlord','Prince','King','Emperor','Deity']

# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

def parse_args():
    out_path, label, to_session = None, None, False
    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] in ('-o', '--out') and i + 1 < len(args):
            out_path = args[i + 1]; i += 2
        elif args[i] == '--label' and i + 1 < len(args):
            label = args[i + 1]; i += 2
        elif args[i] == '--to-session':
            to_session = True; i += 1
        elif args[i] in ('-h', '--help'):
            print(__doc__); sys.exit(0)
        else:
            sys.stderr.write(f"Unknown arg: {args[i]}\n"); sys.exit(2)
    return out_path, label, to_session


def newest_session(snapshot_root):
    games = sorted(
        [p for p in os.listdir(snapshot_root)
         if os.path.isdir(os.path.join(snapshot_root, p)) and p.startswith('game_')],
        key=lambda p: os.path.getmtime(os.path.join(snapshot_root, p)),
    )
    return os.path.join(snapshot_root, games[-1]) if games else None

def main():
    out_path, label, to_session = parse_args()

    pid = find_process('civ2.exe')
    if not pid:
        sys.stderr.write("civ2.exe not running\n"); sys.exit(1)
    handle = open_process(pid)

    # Read key headers so filename encodes current state
    turn = ri16(handle, 0x00655af8) or 0
    # 0x00655B04 is a different byte (observed always 0); real difficulty
    # lives at 0x00655B08 (verified in sav-from-mem.js + sniff-game.py).
    difficulty = ru8(handle, 0x00655b08) or 0
    # mapWidth at 0x006d1160 is the DOUBLED-X width (80 for "80x50 maps").
    # sniff-game.py uses this value directly in filenames; match that
    # convention so manual snapshots and sniffer snapshots use the same
    # turn_NNNN_<W>x<H>_<diff>.bin pattern.
    map_w = ri16(handle, 0x006d1160) or 0
    map_h = ri16(handle, 0x006d1162) or 0

    # --to-session: write into the active session dir using the same
    # naming convention the sniffer uses (turn_NNNN_<W>x<H>_<diff>.bin).
    # If a turn_NNNN file already exists, append a -manual suffix so
    # we don't clobber the sniffer's snapshot.
    session_dir = None
    if to_session:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        snap_root = os.path.join(script_dir, 'snapshots')
        session_dir = newest_session(snap_root)
        if not session_dir:
            sys.stderr.write("No active session under snapshots/.\n"); sys.exit(1)
        diff_str = DIFF_NAMES[difficulty].lower() if difficulty < 6 else f'd{difficulty}'
        base = f"turn_{turn:04d}_{map_w}x{map_h}_{diff_str}"
        candidate = os.path.join(session_dir, f"{base}.bin")
        if os.path.exists(candidate):
            ts = datetime.now().strftime('%H%M%S')
            candidate = os.path.join(session_dir, f"{base}-manual-{ts}.bin")
        out_path = candidate

    # Determine output path
    if not out_path:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        out_dir = os.path.join(script_dir, 'one-shot')
        os.makedirs(out_dir, exist_ok=True)
        ts = datetime.now().strftime('%Y%m%d_%H%M%S')
        diff_str = DIFF_NAMES[difficulty].lower() if difficulty < 6 else f'd{difficulty}'
        tag = f"_{label}" if label else ''
        fname = f"snapnow_{ts}_turn{turn:04d}_{map_w}x{map_h}_{diff_str}{tag}.bin"
        out_path = os.path.join(out_dir, fname)

    # Build CIV2SNAP (same format as sniffer's dump_snapshot)
    regions_data = []
    for name, addr, size in SNAPSHOT_REGIONS:
        data = read_mem(handle, addr, size)
        if data:
            regions_data.append((name, addr, data))

    # Tile array — variable heap address, read via pointer
    ptr_data = read_mem(handle, TILE_PTR_ADDR, 4)
    if ptr_data:
        tile_base = struct.unpack('<I', ptr_data)[0]
        if tile_base and map_w > 0 and map_h > 0:
            ms = map_w * map_h
            tile_data = read_mem(handle, tile_base, ms * 6)
            if tile_data:
                regions_data.append(('tiles', tile_base, tile_data))

    with open(out_path, 'wb') as f:
        f.write(b'CIV2SNAP')
        f.write(struct.pack('<I', len(regions_data)))
        # Table of contents
        for name, addr, data in regions_data:
            name_bytes = name.encode('ascii')[:16].ljust(16, b'\x00')
            f.write(name_bytes)
            f.write(struct.pack('<I', addr))
            f.write(struct.pack('<I', len(data)))
        # Region bytes
        for _, _, data in regions_data:
            f.write(data)

    kernel32.CloseHandle(handle)

    total_bytes = sum(len(d) for _, _, d in regions_data)
    diff_str = DIFF_NAMES[difficulty] if difficulty < 6 else f'd{difficulty}'
    print(f"Wrote {out_path}")
    print(f"  turn={turn}  map={map_w}x{map_h}  difficulty={diff_str}")
    print(f"  {len(regions_data)} regions, {total_bytes:,} bytes total")

    # When --to-session, also append a SNAPSHOT_DUMPED event so live-diff
    # detects the new file and runs the diff for it. Use wall-clock time
    # since we don't know the sniffer's t0; live-diff doesn't strictly
    # need session-relative timing.
    if to_session and session_dir:
        events_path = os.path.join(session_dir, 'events.jsonl')
        try:
            import json as _json
            ts_ms = round(time.time() * 1000, 1)
            with open(events_path, 'a', encoding='utf-8') as f:
                f.write(_json.dumps({
                    'time_ms': ts_ms,
                    'turn': turn,
                    'event': 'SNAPSHOT_DUMPED',
                    'fname': os.path.basename(out_path),
                    'manual': True,
                }, separators=(',', ':')) + '\n')
            print(f"  appended SNAPSHOT_DUMPED to events.jsonl")
        except Exception as e:
            print(f"  [warn] could not append event: {e}")

if __name__ == '__main__':
    main()
