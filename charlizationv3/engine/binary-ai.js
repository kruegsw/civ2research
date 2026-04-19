// ═══════════════════════════════════════════════════════════════════
// binary-ai.js — Adapter: route v3's AI decisions through the
// transpiled binary (charlizationv4/transpiler/output/).
//
// WHY THIS EXISTS
// ───────────────
// After 179/179 mechanics fidelity (2026-04-18), the next phase is AI
// fidelity: make v3 originate the same decisions real Civ2's AI would,
// not just replay them from events.jsonl. See
// `reverse_engineering/findings/ai_fidelity_plan.md` for the full plan.
//
// This file is the per-slice hook point. Each slice that gets wired
// up adds one function here that:
//   (a) ensures _MEM (the v4 binary-engine flat memory) reflects the
//       current v3 game state,
//   (b) calls the transpiled C function,
//   (c) returns the decision as a plain value (or writes it back via
//       a v3 action) so the reducer can record the result.
//
// `engine/ai/` is LEFT UNTOUCHED — it remains as a live fallback for
// any slice that hasn't been wired through here yet. Dispatchers at
// call sites decide which path to use per slice.
//
// KNOWN LIMITATION — RNG DIVERGENCE
// ──────────────────────────────────
// Many binary AI decisions call rand() for scoring (see FUN_004c09b0
// line 137/143 for research). MSVC's LCG with the game's seed
// produces a different sequence than Math.random(). Per-decision
// fidelity will fail until the RNG is synced — documented as a
// known issue to fix later in the plan doc.
//
// WIRED SLICES
// ────────────
//   pickResearch(state, civSlot) → techId
//     Target: FUN_004c09b0 (block_004C0000.js)
//     Emits:  RESEARCH_PICKED on match against sniffer events.
//     Status: scaffolding, not yet called by reducer.
//
// ═══════════════════════════════════════════════════════════════════

import '../../charlizationv4/globals-init.js';
import { _MEM, w16 } from '../../charlizationv4/mem.js';
// `charlizationv4/blocks/` is the runnable copy of the transpiled
// output (imports + crt stubs wired up). The `reverse_engineering/
// transpiler/output/` copy is the source-of-truth for diff-against-C
// auditing but doesn't have the runtime imports.
import { FUN_004c09b0 } from '../../charlizationv4/blocks/block_004C0000.js';

// CIV_BASE at 0x0064C600, stride 0x594. researchingTech field at
// data-block offset 0x0A → absolute 0xAA within the civ record.
// Confirmed in decompiled/findings/byte_verification_plan.md.
const CIV_BASE = 0x0064C600;
const CIV_STRIDE = 0x594;
const CIV_RESEARCHING_TECH_OFFSET = 0xAA;

/**
 * Ask the binary's AI which tech a civ should research next.
 *
 * ASSUMPTION: _MEM is already populated with the current game state.
 * The harness flow (`dump-server-state.js`) populates it via
 * `loadSnapshotIntoMem` / `loadSav` on startup, so slice callers
 * inside that flow don't need to sync. If called from the live v3
 * server, sync via `v4-bridge.syncStateToMem(state)` first.
 *
 * @param {object} state - v3 game state (used only to derive civSlot
 *                         when the caller doesn't already know it).
 * @param {number} civSlot - 0-7, civ whose AI is deciding.
 * @returns {number} - Tech ID (0-88), or 0xFF (255) if no valid
 *                     target exists for this civ.
 */
export function pickResearch(state, civSlot) {
  // Binary returns -1 when no valid target. v3's 'researchingTech'
  // sentinel is 0xFF (u8 view of the u16 0xFFFF). Normalize.
  const techId = FUN_004c09b0(civSlot);
  if (techId === -1 || techId == null) return 0xFF;
  return techId & 0xFF;
}

/**
 * Write the chosen research target to _MEM. Separate from pickResearch
 * so callers can intercept / log / A/B-compare before committing.
 */
export function writeResearchToMem(civSlot, techId) {
  // 2-byte u16 at civ+0xAA. 0xFFFF = no target sentinel.
  const memTech = techId === 0xFF ? 0xFFFF : techId;
  w16(CIV_BASE + civSlot * CIV_STRIDE, CIV_RESEARCHING_TECH_OFFSET, memTech);
}
