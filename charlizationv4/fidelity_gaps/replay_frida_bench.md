# --replay-frida benchmark results

## Fresh session w/ slice 6 city production: `game_20260424_212542`

Run with `--no-v4-bridge` (v4 binary engine bridge had hang on civ 6
mid-late game; bypass for fast iteration). Each benchmark ~1s.

| N | bare | `--replay-frida` | Δ mismatches |
|---|------|-------------------|---|
| 2 | 336/376 (89.4%) | **364/376 (96.8%)** | −28 |
| 5 | 249/402 (62.0%) | 256/376 (68.1%) | −33 |
| 10 | 330/519 (63.6%) | **405/454 (89.2%)** | −141 |
| 15 | 335/571 (58.7%) | **422/506 (83.4%)** | −152 |
| 20 | 333/681 (48.9%) | 402/616 (65.3%) | −134 |
| 25 | 327/754 (43.4%) | 392/676 (58.0%) | −143 |
| 50 | 412/1041 (39.6%) | 421/1262 (33.4%) | +212 |

**Slice 6 (city production injection) extends the effective range
substantially**:
- Prior session N=15 (no city-prod injection): 45.9%
- Fresh session N=15 (with slice 6): **83.4%** — +37.5pp gain

**N=50 backfires (frida 33.4% vs bare 39.6%)**: at very long ranges
without unit AI injection, new units accumulate that v3 doesn't know
how to move. Drift compounds.

Sweet spot for `--replay-frida` is N=2-25 (96.8% to 58%). Beyond
N=25, port additional AI slices (unit movement next).

---

## Original session: `game_20260424_142140` (80x50 Deity)

| N (range) | bare v3 | `--replay-frida` | abs. mismatch delta |
|-----------|---------|-------------------|---------------------|
| N=2 (10→12) | 260/316 (82.3%) | 284/316 (**89.9%**) | **−24** |
| N=5 (10→15) | 242/381 (63.5%) | 216/329 (65.7%) | **−26** |
| N=10 (10→20) | 259/498 (52.0%) | 333/381 (**87.4%**) | **−192** |
| N=15 (10→25) | 247/605 (40.8%) | 206/449 (45.9%) | **−115** |

Capture coverage verified: trace data covers turns 0-79, so N=15 has
full injection data available. The collapse is intrinsic, not a
data-availability issue.

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

The mismatch deltas (−24, −26, **−192**, −115) tell a clear story:
`--replay-frida` is the highest-leverage fidelity tool we have, but
its effective range is **~10 turns post-start**. After that, AI
decisions we DON'T inject accumulate enough drift to drag fidelity
back down toward bare-v3 levels.

**Currently injected via --replay-frida:**
- Tech research target (ai_research_pick)
- Research cost globals (fun_research_cost)
- Government switches (choose_government)

**NOT injected — drift sources at N>10:**
1. **City production** (what each city builds) — biggest gap, drives
   unit count divergence and shield economy
2. **Unit movement** (which tile each unit moves to) — drives FoW,
   trade routes, combat resolution
3. **Rate changes** (sci/tax/lux balancing per turn) — drives
   treasury/research drift
4. **Treaty actions** (war declarations, peace, alliance)
5. **Caravan / wonder rushing** — affects production timing

**Path forward:**
- Port additional AI slices in priority order: city production →
  unit AI → rate balancer → treaties
- Each new slice extends `--replay-frida`'s effective range, pushing
  the N=10 ceiling out further before drift sets in
- N=10 already at 87.4% proves the mechanics code is mostly correct;
  the AI is what's diverging
