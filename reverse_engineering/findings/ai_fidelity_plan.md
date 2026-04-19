# AI Fidelity Plan — making v3's AI match real Civ2's AI

Status: **planning phase**, no code written yet. Start date: 2026-04-18.

## Why this exists

The fidelity harness (`charlizationv4/dump-server-state.js --replay`) currently
reaches **179/179 fields matching** per turn — but that's **mechanics**
fidelity, not **AI** fidelity.

What 179/179 actually proves: *given* the correct inputs (every AI decision
replayed from `events.jsonl`), v3's reducer produces the exact state real
Civ2 does. It says **nothing** about whether v3 would *originate* the same
decisions.

To get the JS game playing identically to real Civ2 without needing a live
sniffer to feed it decisions, v3 has to make the same AI choices the binary
does: same build targets, same research picks, same unit moves, same rate
rebalances, same diplomatic choices.

## Current state (as of 2026-04-18)

- `charlizationv3/engine/ai/` — hand-rolled AI heuristics (prodai.js,
  unitai.js, cityai.js, diplomai.js, etc.). Tries to be "a decent Civ2
  AI" but wasn't derived from the decompile. Used only when the harness
  runs *without* `--replay`.
- `reverse_engineering/transpiler/output/` — 37 JS files auto-generated
  from the decompiled C via the 1:1 line transpiler. FUN_0053184D (the
  AI brain) lives in `block_00530000.js`. Most AI decision functions
  are already transpiled; none are currently called by v3.
- `charlizationv3/engine/v4-bridge.js` — existing hook for calling
  transpiled C from v3. Currently used for yields (when
  `--no-v4-bridge` isn't passed). Pattern to extend.
- `charlizationv4/sniff-game.py::emit_action_events` — captures every
  AI decision's output as structured events. Already provides
  ground truth for the whole plan.

## Approach (refined 2026-04-18)

**Primary driver: the per-turn fidelity diff is the work queue.**

Rather than rigidly "finish slice 1, then slice 2, ...", we run the
existing fidelity harness (`charlizationv4/dump-server-state.js
--replay`) every turn the user plays and fix whatever diverges. The
"slice" is just a label for whichever decision type is currently
causing the diff to fail.

When a slice becomes irrelevant — because its events don't fire in
the current game state — we watch for the next category that breaks
and move to it. When the slice becomes relevant again (e.g., an AI
discovers a tech and needs a new target), we're already positioned
to fix it because the adapter + transpiled call site is in place.

**Two paths, run in order:**

### Path 1 — wire transpiled AI into v3 per slice

Leave `engine/ai/` completely untouched. Add a new adapter file
`charlizationv3/engine/binary-ai.js` that wraps calls into the
transpiled functions. Reducer dispatches to `binary-ai.*` for the
slices that have been wired, falls back to `ai/*` for everything else.

**Why not modify `engine/ai/`:** it's thousands of lines of hand-rolled
heuristics. Partial rewrites break it midway. Keeping the old code as
a live fallback lets us A/B compare slice by slice and revert any
slice instantly by flipping one dispatch call back.

**Architecture:**

```
charlizationv3/engine/
├── ai/                    ← existing heuristics, KEEP untouched
├── binary-ai.js           ← NEW adapter; calls transpiled C via _MEM
└── reduce/end-turn.js     ← dispatches to binary-ai for wired slices
```

**`binary-ai.js` shape** (pattern-matched on `v4-bridge.js`):

```js
// Each wired slice gets one function here.
export function pickResearch(state, civSlot) {
  syncToMem(state, civSlot);              // v3 state → _MEM
  const techId = FUN_004BF2D5(civSlot);   // transpiled call
  return techId;                          // caller applies via SET_RESEARCH
}

export function runAiCivTurn(state, civSlot) {
  syncToMem(state);
  FUN_0053184D(civSlot);                   // the AI brain for this civ
  return syncFromMem(state);               // pull resulting decisions
}
```

### Path 2 — decision-level fidelity harness (verification layer)

After path 1 has wired each slice, add a test that runs v3's AI
*without* `--replay` and diffs its emitted events against real
Civ2's captured events. This confirms that what v3 *originates*
matches what the binary would originate.

Hook points: the same `eventToActions` boundary in
`dump-server-state.js` — instead of synthesizing actions from a
recorded event, check that v3's AI emits the same event.

## Per-slice workflow

For each AI decision type:

1. **Pick** the slice (e.g., research target selection).
2. **Identify** the transpiled function (e.g., `FUN_004BF2D5` in
   `reverse_engineering/transpiler/output/block_004B0000.js`).
3. **Implement** one function in `binary-ai.js` wrapping the transpiled
   call with `syncToMem` / `syncFromMem` as needed.
4. **Redirect** the reducer (or wherever the decision fires) to call
   `binaryAi.pickResearch` instead of `aiDiplo.pickResearch` (or
   whichever existing path).
5. **Validate** by running the fidelity harness *without* `--replay`
   for that event type. If v3 now emits the same `RESEARCH_PICKED`
   events real Civ2 does, slice is validated.
6. **Diagnose** divergences at the transpiled-file level. Each C
   source line maps 1:1 to a JS line, so divergences are mechanical
   to locate. Either fix the transpiler rule or patch the generated
   output.
7. **Commit** per slice with a summary of what got wired and what
   the diff looks like before/after.

## Recommended slice order

Starting small and bounded, then widening:

1. **Research target selection** (`FUN_004BF2D5` / `FUN_004C195E`) —
   one event type (`RESEARCH_PICKED`), few inputs (tech tree, prereqs,
   personality). Clean on/off switch. Already transpiled. Proves the
   pattern.
2. **Rate rebalance** (AI post-event that sets tax/sci/lux) — another
   single-event slice.
3. **City production target** (`FUN_004EEE90` area) — decides what each
   city builds. Larger scope, touches city state.
4. **Unit movement / orders** (`FUN_00543B80`, `FUN_00543CD6`) — the
   big one. Huge function (14K bytes). Likely reveals the most
   transpiler bugs.
5. **Diplomacy decisions** (peace/war/gift logic).
6. **Government changes** (revolution triggers).

## End state

- Every AI decision routes through `binary-ai.js`.
- `engine/ai/` is dead code. Deleted in one commit once no other
  slice depends on it.
- `--replay` becomes optional — used only for cross-checks, not
  required for fidelity.
- v3 runs Civ2's AI natively.

## Files to be created / modified

New:
- `charlizationv3/engine/binary-ai.js` — adapter
- `reverse_engineering/findings/ai_fidelity_slice_log.md` — per-slice
  notes (divergences found, transpiler fixes, wired status)

Modified (per slice):
- `charlizationv3/engine/reduce/end-turn.js` — dispatch
- `charlizationv3/engine/reducer.js` — dispatch for action-time calls

Untouched during path 1:
- `charlizationv3/engine/ai/*` — live fallback
- `reverse_engineering/transpiler/output/*.js` — regenerated by the
  transpiler; if transpiler bugs are found, fix them in
  `reverse_engineering/transpiler/` and re-run, not by hand-editing
  output

## Tests to run per slice

```bash
# 1. Existing mechanics fidelity must still pass.
node charlizationv4/dump-server-state.js <turn_N.bin> --turns 1 \
  --no-v4-bridge --replay <events.jsonl> | diff against actual → 179/179

# 2. AI fidelity for the wired slice — skip replay of THIS event type.
node charlizationv4/dump-server-state.js <turn_N.bin> --turns 1 \
  --no-v4-bridge --replay <events.jsonl> --skip-replay-event RESEARCH_PICKED
# (new flag needed — add to dump-server-state.js)

# 3. Compare emitted events to actual events.jsonl.
# Look for mismatches in the slice's event type.
```

## How a future Claude continues this work

If user says "continue the AI fidelity work":

1. Read this doc end-to-end.
2. Read `ai_fidelity_slice_log.md` (if exists) to see what's been wired.
3. Check `binary-ai.js` exists and what functions it exports.
4. Pick the next slice from the recommended order (if no log, start
   with research target).
5. Follow the per-slice workflow above.
6. At end of the session, append a slice entry to
   `ai_fidelity_slice_log.md` with: slice name, transpiled function(s)
   called, pre/post fidelity numbers, any transpiler bugs found.
