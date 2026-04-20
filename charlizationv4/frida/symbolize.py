#!/usr/bin/env python3
"""
symbolize.py — Resolve VAs in a civ2_trace.log to Ghidra function names.

Scans reverse_engineering/decompiled/*.c for `// Function: NAME @ 0xVA`
banners, builds a sorted list, and resolves any address to the nearest
function prolog (VA <= target, largest such).

Usage:
  python symbolize.py <civ2_trace.log> [> resolved.log]

Adds a `stack_sym` field alongside each event's `stack` array, replacing
hex VAs with "fn_name+0xNN".
"""

import json
import os
import re
import sys
from pathlib import Path
from bisect import bisect_right

DECOMP_DIR = Path(__file__).resolve().parents[2] / 'reverse_engineering' / 'decompiled'


def build_symbol_table():
    pattern = re.compile(r'^//\s*Function:\s+(\S+)\s+@\s+0x([0-9A-Fa-f]+)')
    syms = []  # (va, name)
    for p in sorted(DECOMP_DIR.glob('*.c')):
        try:
            with open(p, 'r', encoding='utf-8', errors='replace') as f:
                for line in f:
                    m = pattern.match(line)
                    if m:
                        syms.append((int(m.group(2), 16), m.group(1)))
        except FileNotFoundError:
            continue
    syms.sort(key=lambda t: t[0])
    return syms


def resolver(syms):
    vas = [s[0] for s in syms]
    names = [s[1] for s in syms]
    def resolve(va):
        if va is None:
            return None
        if isinstance(va, str):
            if va.startswith('0x'): va = int(va, 16)
            else:
                try: va = int(va)
                except ValueError: return va
        idx = bisect_right(vas, va) - 1
        if idx < 0:
            return '0x' + format(va, 'x')
        fn_va = vas[idx]
        fn_name = names[idx]
        offset = va - fn_va
        if offset > 0x10000:
            return '0x' + format(va, 'x')  # too far — not inside this fn
        return f"{fn_name}+0x{offset:x}"
    return resolve


def main():
    if len(sys.argv) < 2:
        print("usage: symbolize.py <civ2_trace.log>", file=sys.stderr)
        sys.exit(2)
    syms = build_symbol_table()
    print(f"[sym] loaded {len(syms)} function symbols", file=sys.stderr)
    resolve = resolver(syms)

    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        for line in f:
            line = line.rstrip('\n')
            try:
                o = json.loads(line)
            except json.JSONDecodeError:
                print(line); continue
            st = o.get('stack')
            if isinstance(st, list):
                o['stack_sym'] = [resolve(x) for x in st]
            print(json.dumps(o, separators=(',', ':')))


if __name__ == '__main__':
    main()
