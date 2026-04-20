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

# Known-gap tags. Each function takes a mismatch dict and returns
# a short tag string if it matches a known-cause pattern, else None.
# The tag lets the summary separate "novel mismatches worth fixing"
# from "expected gaps tied to a tracked task".
def classify_gap(m):
    label = m.get('label', '')
    a, b = m.get('a'), m.get('b')

    # activeUnit: v3 selection heuristic differs from Civ2's AI unit-
    # cycle pointer. Not a data bug — cosmetic.
    if label == 'activeUnit':
        return 'active-unit-heuristic'

    # civs[N].flags — known-gap bits the harness can't close without
    # task #48/#49 or full AI port:
    #   0x01 popup-pending, 0x08 new-gov transient,
    #   0x80 aiExpansionMode, 0x100 techMilestone, 0x200 init-set-unknown.
    # Bit 0x04 senate-override is already replayed.
    if label.startswith('civs[') and label.endswith('.flags'):
        try:
            xor = (int(a) ^ int(b))
            ai_only_bits = 0x01 | 0x08 | 0x80 | 0x100 | 0x200
            if xor and (xor & ~ai_only_bits) == 0:
                return 'ai-state-flags'
        except (TypeError, ValueError):
            pass

    # civs[N].treasury: hut gold (+25/50/75/100) vs per-turn income
    # rounding (1-10 delta). Both are "v3 can't predict the exact
    # gold that changes hands mid-AI-turn" — tag accordingly.
    if label.startswith('civs[') and label.endswith('.treasury'):
        try:
            d = abs(int(a) - int(b))
            if d in (25, 50, 75, 100):
                return 'hut-gold'
            if d <= 10:
                return 'treasury-rounding'
        except (TypeError, ValueError):
            pass

    # units[N].damageTaken: unsimulated AI-vs-AI combat damage.
    if label.startswith('units[') and label.endswith('.damageTaken'):
        return 'ai-combat-damage'

    # units[N].visibility (per-unit seen-by bitmask): v3 doesn't track.
    if label.startswith('units[') and label.endswith('.visibility'):
        return 'per-unit-fow'

    # units[N].gotoX/gotoY: AI movement destinations v3 can't predict.
    if label.startswith('units[') and (label.endswith('.gotoX') or label.endswith('.gotoY')):
        return 'ai-goto-target'

    # units[N].moveSpent: AI-phase vs snapshot-timing.
    if label.startswith('units[') and label.endswith('.moveSpent'):
        return 'ai-movespent-timing'

    # units[N].homeCity: hut-spawned units have homeCity=0xFF even for
    # types <16. Old events.jsonl lacked homeCity capture.
    if label.startswith('units[') and label.endswith('.homeCity'):
        return 'unit-homecity'

    # units[N].order byte 27↔11 transitions: goto_ai (0x1b) ↔ goto/railroad
    # (0x0b). AI's internal multi-turn-goto tracking that v3 doesn't model
    # without the full AI port. Covers cases like pred=27 vs actual=11 or
    # pred=255 vs actual=5/11 when the AI sets a worker order mid-turn.
    if label.startswith('units[') and label.endswith('.order'):
        try:
            ai_orders = {27, 11, 5, 6, 7, 255}
            if int(a) in ai_orders and int(b) in ai_orders:
                return 'ai-order-byte'
        except (TypeError, ValueError):
            pass

    # units[N].veteran: AI-vs-AI combat promotes attacker but sniffer may
    # not catch the status flag transition before the snapshot. Replay of
    # UNIT_STATUS_CHANGED closes this when sniffer captures it.
    if label.startswith('units[') and label.endswith('.veteran'):
        return 'ai-combat-veteran'

    # visibilityCounts[civN]: FOW update ordering differs; off by 1-5.
    if label.startswith('visibilityCounts'):
        return 'fow-count'

    # cities[N].{shieldStored,foodStored,tradeTotal} with tiny delta:
    # mid-turn cached yield captured before AI's re-work of tiles.
    # Large shieldStored delta (>10) = production completion v3 missed —
    # AI's auto-switch of production item mid-turn, happens when v3's
    # civilDisorder calc on post-growth size blocks production.
    if label.startswith('cities[') and any(label.endswith('.' + f)
        for f in ('shieldStored', 'foodStored', 'tradeTotal')):
        try:
            d = abs(int(a) - int(b))
            if label.endswith('.shieldStored') and d > 10:
                return 'ai-production-completion'
            if d <= 10:
                return 'mid-turn-yield-cache'
        except (TypeError, ValueError):
            pass

    # cities[N].size off by 1: growth-vs-settler-pop consumption order.
    # In real Civ2 a Settler-producing city grows and immediately loses
    # 1 pop to Settler, net 0. v3 grows but disorder blocks Settler,
    # leaving size +1.
    if label.startswith('cities[') and label.endswith('.size'):
        try:
            if abs(int(a) - int(b)) == 1:
                return 'growth-vs-settler'
        except (TypeError, ValueError):
            pass

    # civs[N].researchProgress: small delta = rounding; large delta where
    # one side went to 0 = tech completion v3 missed (AI research cost or
    # paradigm divergence). Both are tracked gaps.
    if label.startswith('civs[') and label.endswith('.researchProgress'):
        try:
            d = abs(int(a) - int(b))
            if d <= 10:
                return 'research-rounding'
            # Large delta + one side at 0 = completion mismatch.
            if int(a) == 0 or int(b) == 0:
                return 'ai-research-completion'
        except (TypeError, ValueError):
            pass

    # civs[N].reputation changes: v3 misses some diplomatic-act reputation
    # adjustments (bribes, treaty violations, etc.) — AI interaction that
    # v3 doesn't fully simulate.
    if label.startswith('civs[') and label.endswith('.reputation'):
        return 'ai-reputation'

    # cities[N].name mismatch: v3's city-name pick from the RULES.TXT list
    # may diverge from Civ2's when founding order/RNG differs. Cosmetic.
    if label.startswith('cities[') and label.endswith('.name'):
        return 'city-name-ordering'

    # civs[N].researchingTech 255 vs actual tech (or vice versa) = tech
    # completion mismatch. v3 didn't complete a tech Civ2 did.
    if label.startswith('civs[') and label.endswith('.researchingTech'):
        try:
            if int(a) == 255 or int(b) == 255:
                return 'ai-research-completion'
        except (TypeError, ValueError):
            pass

    return None  # novel — no known-gap tag

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
        'globalWarming', 'pollution', 'nextUnitId',
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

    # Classify each mismatch by known-gap tag.
    novel = []
    by_tag = {}
    for m in mismatches:
        tag = classify_gap(m)
        m['tag'] = tag
        if tag is None:
            novel.append(m)
        else:
            by_tag.setdefault(tag, []).append(m)

    # Known-gap summary: groups mismatches tied to a tracked task so
    # they don't drown out novel bugs.
    if by_tag:
        print("\nKnown gaps (tracked issues — not novel bugs):")
        for tag in sorted(by_tag.keys(), key=lambda t: -len(by_tag[t])):
            ms = by_tag[tag]
            print(f"  [{tag:25s}] {len(ms):4d} mismatch{'es' if len(ms)!=1 else ''}")

    # Per-category breakdown of NOVEL mismatches only
    by_cat = {}
    for m in novel:
        by_cat.setdefault(m['category'], []).append(m)
    cats_sorted = sorted(by_cat.keys(), key=lambda c: CATEGORY_SEVERITY.get(c, 99))

    if by_cat:
        print("\nNovel mismatches (no known-gap tag — candidates for v3 fix):")
        for cat in cats_sorted:
            ms = by_cat[cat]
            print(f"  [{cat:11s}] {len(ms):4d} mismatch{'es' if len(ms)!=1 else ''}")
            for m in ms[:5]:
                if m['a'] is None and m['b'] is None:
                    print(f"                    {m['label']}")
                else:
                    print(f"                    {m['label']}: {m['a']!r} vs {m['b']!r}")
            if len(ms) > 5:
                print(f"                    ... and {len(ms) - 5} more")
    elif by_tag:
        print("\nNo novel mismatches — all gaps are known.")

    sys.exit(0 if not mismatches else 1)


if __name__ == '__main__':
    main()
