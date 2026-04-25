# Fresh-session N=2 fidelity diagnostic

Session: `game_20260424_212542` (80x50 Deity, 70 turns sniffed)

## Validator results — all 5 AI slices 100%

| slice | matches |
|-------|---------|
| calcTechValue | 384/384 |
| pickResearchGoal | 51/51 |
| canUseGovernment | 306/306 |
| chooseGovernment | 51/51 |
| calcResearchCost | 937/937 |

**1,729 byte-exact AI decisions.** Slice 6 (city production) fired 520
times — first session with this hook live.

## N=2 benchmark (turn 10→12)

| | Matched | Mismatches |
|---|---------|------------|
| bare | 314/389 (80.7%) | 76 |
| `--replay-frida` | 343/389 (88.2%) | 47 |

## Mismatch breakdown — known gap tags (33 of 47)

- `mid-turn-yield-cache: 15` — biggest, no fix without unit AI port
- `unit-homecity: 3` — units shifted home cities
- `research-rounding: 2` — small progress deltas
- `ai-research-completion: 2` (analyzed below)
- `treasury-rounding: 2`
- `ai-goto-target: 2`
- `growth-vs-settler: 2`
- 7 various 1-counts

## Novel mismatches (14 of 47) — categorized

### Phantom unit cluster (12 fields)
v3 has units[16] (type=2 Phalanx, owner=6, x=9 y=41) that doesn't
exist in binary. v3 also has units[13] at SAME tile with same type
& owner but homeCity=3 vs binary's 6.

**Diagnosis**: v3's city 6 GREW from size 1→2 between turn 10-12
when binary's city 6 stayed at size 1. The growth caused v3 to
produce a Phalanx (food + shields permitted), creating the phantom.
Cascade: 1 unit + 8 unit-field mismatches + 4 city/top-level fields.

### Food growth timing (cities[5] and cities[6])
- v3:    cities[5/6].size=2  foodStored=4
- binary: cities[5/6].size=1  foodStored=20/16

v3 grew the city ONE TURN EARLIER than binary. The size delta
cascades into: shieldStored/tradeTotal recompute (different working
tile set), city happiness, production support cost.

**Likely root cause**: v3's per-turn food surplus is +1 higher than
binary's at this state. The growth-check ordering fix (cityturn.js
line 103-106) prevented one variant of the bug, but a different
±1-food drift is still present.

### currentYear off-by-one (1 field)
v3 reports year -3780 at v3's turn 12, binary reports -3450.
Off-by-one related to turn counter increment timing (already
analyzed earlier; not a year-calc bug).

## Why `ai-research-completion: 2` persisted despite injection

Concrete case: civs[1].researchingTech: 255 vs 36 at turn 12.

**Trace**: no `ai_research_pick` capture for civ 1 between turns 9-13
(only civ 5 at t9, civ 6/4 at t12, civ 1 at t13). Binary's civ 1 has
researchingTech=36 starting from before turn 10 (no pick = was
already researching).

**v3 behavior**: v3 completed tech 36 between turn 10-12 (one turn
earlier than binary), which reset techBeingResearched to 0xFF.
Without a pick capture in that window, my injection had nothing to
restore it with.

**Root cause is NOT the cost** — calcResearchCostExact matches
binary 100%. It's that v3's per-turn SCIENCE OUTPUT is +1 over binary,
so progress hits the cost threshold one turn early.

This is a `cityturn.js` per-city science calc gap, not an AI port
issue. Probably the same kind of small per-turn drift that drives
treasury/research/yield rounding tags.

## What to fix next (priority order)

1. **City growth/food drift** (cascades into phantom units, multiple
   tag categories). Closing this might collapse 10+ mismatches.
2. **Per-turn science accumulation** (closes residual research-rounding
   and ai-research-completion).
3. **Unit movement / fortify** capture (closes unit-position drift,
   ai-goto-target tag, units[].order=255 vs 1/2).

The 5 AI slices already at 100% prove the AI-decision boundary is
clean. Remaining work is v3 mechanics fine-grained calc.
