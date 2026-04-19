#!/usr/bin/env python3
"""
state-diff.py — Field-level diff between two state JSONs produced by
dump-server-state.js (v4 side) and snapshot-to-state-json.py (sniffer
side). Both sides emit the same schema, so the diff is mechanical.

Usage: python state-diff.py <a.json> <b.json>

Output: for each scalar field, prints MATCH or MISMATCH with both
values. Per-civ arrays are walked element-by-element. Exit code 0
if fully matched, 1 if any field differs.
"""

import json
import sys

def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def diff_scalar(label, a, b, mismatches, category='other'):
    if a == b:
        print(f"  OK{label:20s} {a}")
    else:
        print(f"  !{label:20s} {a!r}  vs  {b!r}")
        mismatches.append({'label': label, 'a': a, 'b': b, 'category': category})


# Category severity: lower number = more important. These weights let
# the summary sort the gaps by roughly how much they matter.
CATEGORY_SEVERITY = {
    'structural':  0,  # shape mismatches — arrays missing, lengths differ
    'top-level':   1,  # turn, difficulty, civsAlive, counts
    'per-civ':     2,  # per-civ treasury, government, research
    'per-city':    3,  # per-city size, stored resources
    'per-unit':    4,  # per-unit position, HP, orders
    'wonders':     5,  # wonder ownership
    'visibility':  6,  # per-civ fog-of-war tile counts
    'other':       9,
}

def main():
    if len(sys.argv) < 3:
        print("Usage: state-diff.py <a.json> <b.json>", file=sys.stderr)
        print("  a = v4-server dump (dump-server-state.js)", file=sys.stderr)
        print("  b = sniffer dump (snapshot-to-state-json.py)", file=sys.stderr)
        sys.exit(2)

    a = load(sys.argv[1])
    b = load(sys.argv[2])
    ga, gb = a.get('gameState', {}), b.get('gameState', {})

    print(f"A (side A): {a.get('source', '?')} — {a.get('savPath') or a.get('snapshotPath', '?')}")
    print(f"B (side B): {b.get('source', '?')} — {b.get('savPath') or b.get('snapshotPath', '?')}")
    print()

    mismatches = []

    # -- Top-level scalars ----------------------------------------─
    print("-- Top-level game state --")
    scalar_fields = [
        'turn', 'currentYear', 'activeCiv', 'activeUnit',
        'difficulty', 'civsAlive', 'humanPlayers',
        'totalUnits', 'totalCities',
        'globalWarming', 'pollution',
    ]
    for f in scalar_fields:
        if f in ga or f in gb:
            diff_scalar(f, ga.get(f), gb.get(f), mismatches, 'top-level')

    # -- Per-civ scalars ------------------------------------------─
    print("\n-- Per-civ scalars --")
    civs_a = ga.get('civs', [])
    civs_b = gb.get('civs', [])
    n = max(len(civs_a), len(civs_b))
    civ_fields = [
        'flags', 'treasury', 'researchProgress', 'researchingTech',
        'taxRate', 'scienceRate', 'government', 'reputation',
    ]
    for i in range(n):
        ca = civs_a[i] if i < len(civs_a) else {}
        cb = civs_b[i] if i < len(civs_b) else {}
        for f in civ_fields:
            if f in ca or f in cb:
                diff_scalar(f"civs[{i}].{f}", ca.get(f), cb.get(f), mismatches, 'per-civ')

    # -- Per-unit (alive units) ----------------------------------─
    print("\n-- Per-unit (alive units) --")
    units_a = ga.get('units', [])
    units_b = gb.get('units', [])
    nu = max(len(units_a), len(units_b))
    unit_fields = ['x', 'y', 'type', 'owner', 'moveSpent', 'damageTaken',
                   'visibility', 'veteran', 'order', 'homeCity',
                   'gotoX', 'gotoY', 'unitId']
    if nu == 0:
        print("  (neither side has unit records)")
    else:
        for i in range(nu):
            ua = units_a[i] if i < len(units_a) else {}
            ub = units_b[i] if i < len(units_b) else {}
            for f in unit_fields:
                if f in ua or f in ub:
                    diff_scalar(f"units[{i}].{f}", ua.get(f), ub.get(f), mismatches, 'per-unit')

    # -- Per-city ------------------------------------------------─
    print("\n-- Per-city --")
    cities_a = ga.get('cities', [])
    cities_b = gb.get('cities', [])
    nc = max(len(cities_a), len(cities_b))
    city_fields = ['x', 'y', 'owner', 'size', 'foodStored',
                   'shieldStored', 'tradeTotal', 'name']
    if nc == 0:
        print("  (neither side has city records)")
    else:
        for i in range(nc):
            ca = cities_a[i] if i < len(cities_a) else {}
            cb = cities_b[i] if i < len(cities_b) else {}
            for f in city_fields:
                if f in ca or f in cb:
                    diff_scalar(f"cities[{i}].{f}", ca.get(f), cb.get(f), mismatches, 'per-city')

    # -- Wonders --------------------------------------------------─
    print("\n-- Wonders (city IDs) --")
    wa = ga.get('wonders', [])
    wb = gb.get('wonders', [])
    nw = max(len(wa), len(wb))
    for i in range(nw):
        va = wa[i] if i < len(wa) else None
        vb = wb[i] if i < len(wb) else None
        if va == vb:
            continue  # skip matching wonders to reduce noise
        diff_scalar(f"wonders[{i}]", va, vb, mismatches, 'wonders')
    if len(wa) == len(wb) and all(a == b for a, b in zip(wa, wb)):
        print(f"  OKall {len(wa)} wonders match")

    # -- Tile visibility (fog-of-war) per civ --------------------─
    print("\n-- Tile visibility per civ --")
    va = ga.get('visibilityCounts', [])
    vb = gb.get('visibilityCounts', [])
    if not va and not vb:
        print("  (neither side exposes visibilityCounts)")
    else:
        nvc = max(len(va), len(vb))
        for i in range(nvc):
            ai = va[i] if i < len(va) else None
            bi = vb[i] if i < len(vb) else None
            if ai == bi and ai not in (None, 0):
                print(f"  OK visibilityCounts[civ{i}] {ai}")
            elif ai != bi:
                diff_scalar(f"visibilityCounts[civ{i}]", ai, bi, mismatches, 'visibility')

    # -- Structural checks ---------------------------------------─
    # Flag shape-level issues BEFORE value-level mismatches: if array
    # lengths differ, per-element diffs will flood output, but the real
    # problem is the count mismatch.
    structural = []
    if len(civs_a) != len(civs_b):
        structural.append(f"civs[] length: {len(civs_a)} vs {len(civs_b)}")
    if len(units_a) != len(units_b):
        structural.append(f"units[] length: {len(units_a)} vs {len(units_b)}")
    if len(cities_a) != len(cities_b):
        structural.append(f"cities[] length: {len(cities_a)} vs {len(cities_b)}")
    if len(wa) != len(wb):
        structural.append(f"wonders[] length: {len(wa)} vs {len(wb)}")
    for s in structural:
        mismatches.append({'label': s, 'a': None, 'b': None,
                           'category': 'structural'})

    # -- Summary by category -------------------------------------─
    print()
    print("=" * 60)
    total_fields = (len(scalar_fields) + n * len(civ_fields) +
                    nu * len(unit_fields) + nc * len(city_fields) + nw)
    matched = total_fields - (len(mismatches) - len(structural))
    print(f"Matched: {matched}/{total_fields} fields  "
          f"({len(mismatches)} mismatches)")
    print("=" * 60)

    # Per-category breakdown, ordered by severity
    by_cat = {}
    for m in mismatches:
        by_cat.setdefault(m['category'], []).append(m)
    cats_sorted = sorted(by_cat.keys(), key=lambda c: CATEGORY_SEVERITY.get(c, 99))

    if by_cat:
        print("\nMismatches by category (most important first):")
        for cat in cats_sorted:
            ms = by_cat[cat]
            print(f"  [{cat:11s}] {len(ms):4d} mismatch{'es' if len(ms)!=1 else ''}")
            # Show up to 3 example labels per category
            for m in ms[:3]:
                if m['a'] is None and m['b'] is None:
                    print(f"                    {m['label']}")
                else:
                    print(f"                    {m['label']}: {m['a']!r} vs {m['b']!r}")
            if len(ms) > 3:
                print(f"                    ... and {len(ms) - 3} more")

    sys.exit(0 if not mismatches else 1)


if __name__ == '__main__':
    main()
