"""
Dump civ2.exe's runtime unit-type stats table to JSON.

Run while civ2.exe is running with the scenario/save loaded; the table at
0x0064B1B8 (60 entries × 20 bytes) reflects the active RULES.TXT
overrides. .scn files commonly tweak per-type flagsA / flagsB / domain,
which combat.js needs for scenario-correct walls / interceptor / missile
behaviour.

Usage:
    python dump-unit-types.py [output.json]

Default output: charlizationv4/unit_types.json (next to validate-combat-rng.mjs)

The validator auto-loads this file when a snapshot lacks the in-snapshot
`unit_types` region (older captures, including game_20260428_181426).
"""
import ctypes, ctypes.wintypes as wt
import json, struct, sys, os

kernel32 = ctypes.windll.kernel32
PROCESS_VM_READ = 0x0010
PROCESS_QUERY_INFORMATION = 0x0400
TH32CS_SNAPPROCESS = 0x00000002

UNIT_TYPE_BASE = 0x0064B1B8
UNIT_TYPE_STRIDE = 0x14
UNIT_TYPE_COUNT = 60

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wt.DWORD), ("cntUsage", wt.DWORD),
        ("th32ProcessID", wt.DWORD), ("th32DefaultHeapID", ctypes.POINTER(ctypes.c_ulong)),
        ("th32ModuleID", wt.DWORD), ("cntThreads", wt.DWORD),
        ("th32ParentProcessID", wt.DWORD), ("pcPriClassBase", ctypes.c_long),
        ("dwFlags", wt.DWORD), ("szExeFile", ctypes.c_char * 260),
    ]

def find_civ2():
    snap = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    entry = PROCESSENTRY32()
    entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
    pid = None
    if kernel32.Process32First(snap, ctypes.byref(entry)):
        while True:
            name = entry.szExeFile.decode('utf-8', errors='ignore').lower()
            if name == 'civ2.exe':
                pid = entry.th32ProcessID
                break
            if not kernel32.Process32Next(snap, ctypes.byref(entry)):
                break
    kernel32.CloseHandle(snap)
    return pid

def read_mem(handle, addr, size):
    buf = ctypes.create_string_buffer(size)
    n = ctypes.c_size_t()
    ok = kernel32.ReadProcessMemory(handle, ctypes.c_void_p(addr), buf, size, ctypes.byref(n))
    return buf.raw[:n.value] if ok and n.value == size else None

def main():
    pid = find_civ2()
    if not pid:
        print("civ2.exe not running. Launch the scenario first.", file=sys.stderr)
        sys.exit(1)
    handle = kernel32.OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, False, pid)
    if not handle:
        print(f"Cannot open civ2.exe (pid {pid}) — try running as Administrator.",
              file=sys.stderr)
        sys.exit(1)
    raw = read_mem(handle, UNIT_TYPE_BASE, UNIT_TYPE_COUNT * UNIT_TYPE_STRIDE)
    kernel32.CloseHandle(handle)
    if not raw:
        print(f"ReadProcessMemory failed at 0x{UNIT_TYPE_BASE:08x}", file=sys.stderr)
        sys.exit(1)

    # Real-record offsets verified against decompiled FUN_0057e33a:
    # DAT_0064b1bc = base+4 = flagsA
    # DAT_0064b1bd = base+5 = flagsB
    # DAT_0064b1c1 = base+9 = domain (0=ground, 1=air, 2=sea)
    types = []
    for i in range(UNIT_TYPE_COUNT):
        o = i * UNIT_TYPE_STRIDE
        types.append({
            "type": i,
            "flagsA": raw[o + 0x04],
            "flagsB": raw[o + 0x05],
            "domain": raw[o + 0x09],
            "atk":    raw[o + 0x0C],
            "def":    raw[o + 0x0D],
            "hp":     raw[o + 0x0E],
            "fp":     raw[o + 0x0F],
        })

    out_path = sys.argv[1] if len(sys.argv) > 1 else \
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "unit_types.json")
    with open(out_path, 'w') as f:
        json.dump({
            "source": f"civ2.exe pid {pid} addr 0x{UNIT_TYPE_BASE:08x}",
            "types": types,
        }, f, indent=2)
    print(f"Wrote {len(types)} unit types to {out_path}")
    # Quick scan: any type with the negate-walls flag (0x40)?
    nw = [t["type"] for t in types if t["flagsA"] & 0x40]
    intc = [t["type"] for t in types if t["flagsA"] & 0x10 and t["domain"] == 1]
    print(f"  negates-walls (flagsA & 0x40): {nw}")
    print(f"  air interceptors (air + flagsA & 0x10): {intc}")

if __name__ == '__main__':
    main()
