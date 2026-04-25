# v4-bridge hang investigation — findings

## Symptom

`dump-server-state.js --turns N` (N≥3) hangs in `v4EndTurn(state, 6)`
on session `game_20260424_212542` starting from turn 12. Runs for
60+ seconds without completion. Workaround: `--no-v4-bridge`.

## What was tested (30-min time box)

1. **Isolated v4EndTurn for civ 6** at turn 12: completed in **963ms**.
   Not a per-civ-state hang.

2. **Sequential civs 1→6 v4EndTurn** with no v3 END_TURN between
   (just initial state from snapshot): completed, civ 6 in **2ms**.

3. **Sequential civs 1→6 with v3 END_TURN + zero-moveSpent +
   replayMode flag** (mimicking harness flow exactly): completed,
   civ 6 in **2ms**. Lower loop limit (10000) didn't trigger
   LOOP_GUARD throws.

## Conclusion

Hang is **not reproducible** in single-turn isolated tests. Triggers
only in the FULL multi-turn harness flow. Likely root cause: state
accumulation across multiple turns (something that doesn't manifest
in 1-cycle but compounds in 2+ cycles).

Candidate causes (untested, time-boxed):
1. `_MEM` corruption — state written during turn N never gets reset,
   compounds across turns
2. Loop-counter persistence — `loopReset()` is called per
   v4EndTurn but maybe not deep enough
3. Replay events feeding state v4 doesn't expect
4. Specific tile/unit/city state created during simulation that
   triggers a binary-engine pathological path

## Workaround

`--no-v4-bridge` flag bypasses the bridge entirely. Benchmarks run
in 1s instead of 25min. The bridge's purpose is binary-faithful
yield correction; without it fidelity is slightly lower (uniformly
on both sides of the bare-vs-frida comparison, so doesn't affect
the relative measurement).

`bench-replay-frida.sh` defaults to `--no-v4-bridge` (commit
`7742e15`).

## Recommended approach to fix later

1. Add per-turn-cycle `_MEM` snapshot/diff to identify what state
   accumulates wrongly.
2. Run with `--turns 3` and bisect by adding `loopGuard` at the
   v4EndTurn boundary (catch which iteration first hangs).
3. If state-mutation is the cause, audit `syncToMem`/`readFromMem`
   in v4-bridge.js for fields that aren't being properly cleared
   between civ turns.
