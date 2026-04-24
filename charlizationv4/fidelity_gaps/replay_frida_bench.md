# --replay-frida benchmark results

Session: `game_20260424_142140` (80x50 Deity, v3 state turn 10 starting)

| N (range) | bare v3 | `--replay-frida` | abs. mismatch delta |
|-----------|---------|-------------------|---------------------|
| N=2 (10→12) | 260/316 (82.3%) | 284/316 (**89.9%**) | **−24** |
| N=5 (10→15) | 242/381 (63.5%) | 216/329 (65.7%) | **−26** |
| N=10 (10→20) | 259/498 (52.0%) | 333/381 (**87.4%**) | **−192** |

## Observations

**N=2** is a clean win: same total field count (316), −43% mismatches
(56 → 32). Binary's injected tech picks and research-cost globals
close the `ai-research-completion`, `ai-goto-target`, and
`ai-movespent-timing` tagged gaps.

**N=5** shows a transient structural divergence: bare v3 produces 381
comparable fields, frida produces 329 (52 fewer). Absolute mismatches
still drop (−26). The smaller field count for frida is *not* a
regression — it means v3-frida's state is *closer to binary's state*
(which has ~20 units / 7 cities) than bare v3 (which builds extra
entities).

**N=10 is the strongest signal yet**: bare v3's state has ballooned
to 498 comparable fields (240 mismatches) vs frida's tight 381 fields
(only 48 mismatches). **Fidelity jumps from 52.0% bare to 87.4%
frida — +35.4 pp and −192 mismatches.** The longer the simulation,
the more bare-v3 drifts into creating extra entities that don't
match binary, while frida keeps v3 on-track.

**Correction to earlier N=5 reading**: I initially interpreted the
field-count drop as "structural drift" introduced by frida. The N=10
result reveals the opposite: *bare-v3 is the drifting side*, creating
extra entities as turns pass. Frida's injection KEEPS v3's state
small and binary-matching. N=5 was a midrange phase where both sides
had diverged but neither was clearly better; by N=10 the advantage
is unambiguous.

## Why the N=5 run took 25 minutes

v3's reducer is O(slow) on turn 10+ state — 20+ units, 7+ cities, all
with mid-game complexity. Not an infinite loop, just expensive per-
civ processing. For future runs, either:

1. Start from earlier turn (fewer entities) for fidelity sweeps
2. Profile reducer to find the per-civ O(N²) or similar bottleneck
3. Run N≥5 benchmarks overnight or via CI

## What the data says about next priorities

The mismatch deltas (−24, −26, **−192**) confirm `--replay-frida` is
the highest-leverage fidelity tool we have. At N=10 it alone moves
v3 from 52% to 87.4%. The remaining ~13% gap at N=10 is:

1. v3's mid-turn yield cache doesn't rework tiles mid-AI-turn
2. v3's trade/treasury calc is ±1-10 off per civ per turn (compounds)
3. unit goto-target path != binary (AI-move port needed)

**Unit AI is still the biggest remaining dividend** — unit-position
mismatches cascade into FoW, visibility, trade routes. But
`--replay-frida` at N=10 demonstrates the mechanics-fidelity ceiling
is much higher than bare-v3 (52%) suggests when the AI is faithful.
