# --replay-frida benchmark results

Session: `game_20260424_142140` (80x50 Deity, v3 state turn 10 starting)

| N (range) | bare v3 | `--replay-frida` | abs. mismatch delta |
|-----------|---------|-------------------|---------------------|
| N=2 (10→12) | 260/316 (82.3%) | 284/316 (**89.9%**) | **−24** |
| N=5 (10→15) | 242/381 (63.5%) | 216/329 (65.7%) | **−26** |

## Observations

**N=2** is a clean win: same total field count (316), −43% mismatches
(56 → 32). Binary's injected tech picks and research-cost globals
close the `ai-research-completion`, `ai-goto-target`, and
`ai-movespent-timing` tagged gaps.

**N=5** shows structural drift: bare v3 produces 381 comparable
fields, frida produces 329 (52 fewer). This is expected — binary's
tech picks trigger different production paths, so v3 builds different
units/cities than bare-v3 would have. The resulting state diverges
structurally from the binary snapshot too, but in a *different* way.

Absolute mismatches are down (−26) but percentage fidelity is flat
(65.7% frida vs 63.5% bare) because both the matched AND the missing
counts shift.

## Why the N=5 run took 25 minutes

v3's reducer is O(slow) on turn 10+ state — 20+ units, 7+ cities, all
with mid-game complexity. Not an infinite loop, just expensive per-
civ processing. For future runs, either:

1. Start from earlier turn (fewer entities) for fidelity sweeps
2. Profile reducer to find the per-civ O(N²) or similar bottleneck
3. Run N≥5 benchmarks overnight or via CI

## What the data says about next priorities

The absolute mismatch drop at both N values (−24, −26) confirms
`--replay-frida` IS injecting correctly — the remaining gaps are
deeper. At N=5, fidelity plateaus because:

1. v3's mid-turn yield cache doesn't rework tiles mid-AI-turn
   (14/32 mismatches at N=2 are this)
2. v3's trade/treasury calc is ±1-10 off per civ per turn (compounds)
3. unit goto-target path != binary (AI-move port needed)

Priority path: port the **unit AI** slice. Every unit-position
mismatch cascades into FoW, visibility, trade routes. Biggest fidelity
dividend remaining.
