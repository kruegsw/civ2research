// trace_movespent.js — probe moveSpent writes to understand sniffer-vs-binary
// timing divergence.
//
// The `ai-movespent-timing` tag (~37 mismatches per 16-pair sweep) says v3's
// per-unit moveSpent field mismatches the snapshot at the turn boundary.
// We've seen mixed-direction drift (some units 0 in real, non-zero in v3;
// other turns the opposite). Hypothesis: Civ2 writes moveSpent at END of each
// civ's turn (not start of next), and the sniffer snapshot time correlates
// weirdly with that.
//
// This probe captures EVERY write to unit struct offset +0x08 (moveSpent u8)
// via MemoryAccessMonitor on the unit array range + also hooks the
// civ_turn_driver (FUN_00489553) entry/exit to timeline the write relative
// to civ turns.
//
// Output: { kind: 'movespent_event', unitIdx, value, civTurn, time_ms }
//
// Approach:
//   Rather than MemoryAccessMonitor (Windows-flaky), hook specific functions
//   that write moveSpent:
//     - FUN_005b3d06 (new_unit) — initial moveSpent
//     - FUN_0058c295 (unit_disband) — zero? (probably not relevant)
//     - Some per-turn reset function TBD from decompiled grep for "+0x8"
//       writes
//
// Simpler alternative implemented here: hook civ_turn_driver entry + exit,
// snapshot each of the civ's units' moveSpent at those two moments.
// That's enough to see when the reset happens (at turn end? start?).

'use strict';

function safe(fn, fallback) {
  try { return fn(); } catch (e) { return fallback; }
}

const base = safe(() => Module.findBaseAddress('civ2.exe'), null)
  || safe(() => Process.enumerateModules().find(m => m.name.toLowerCase() === 'civ2.exe').base, null);

if (!base) {
  send({ kind: 'error', msg: 'civ2.exe base not found' });
} else {
  send({ kind: 'startup', base: base.toString(), pid: Process.id });
}

// Unit array: memory 0x006560F0, stride 0x20. Max 512 units.
const UNIT_BASE = 0x006560F0;
const UNIT_STRIDE = 0x20;

function snapshotUnits(forCiv) {
  // Scan up to totalUnits from global DAT_00627FD8 (unit counter).
  // For brevity: scan first 64 slots. Skip dead (uniqueId == 0 at +0x1A).
  if (!base) return [];
  const results = [];
  try {
    for (let i = 0; i < 64; i++) {
      const p = base.add(UNIT_BASE - 0x00400000 + i * UNIT_STRIDE);
      const uniqueId = p.add(0x1A).readU32();
      if (uniqueId === 0) continue;
      const owner = p.add(0x07).readU8();
      if (forCiv != null && owner !== forCiv) continue;
      const moveSpent = p.add(0x08).readU8();
      const type = p.add(0x04).readU8();
      const order = p.add(0x0B).readU8();
      results.push({ idx: i, uid: uniqueId, owner, type, order, moveSpent });
    }
  } catch (e) { /* swallow */ }
  return results;
}

if (base) {
  // civ_turn_driver @ 0x00489553: (civSlot) — runs all of civ's turn.
  Interceptor.attach(base.add(0x00489553 - 0x00400000), {
    onEnter(args) {
      this._civSlot = args[0].toInt32();
      this._t0 = Date.now();
      const snap = snapshotUnits(this._civSlot);
      send({
        kind: 'civturn_start',
        civ: this._civSlot,
        time_ms: this._t0,
        units: snap.map(u => ({ idx: u.idx, uid: u.uid, ms: u.moveSpent, order: u.order })),
      });
    },
    onLeave() {
      const snap = snapshotUnits(this._civSlot);
      send({
        kind: 'civturn_end',
        civ: this._civSlot,
        time_ms: Date.now(),
        units: snap.map(u => ({ idx: u.idx, uid: u.uid, ms: u.moveSpent, order: u.order })),
      });
    }
  });

  // Also hook FUN_0048AA24 (mgl_active_civ_on) — sometimes active-civ
  // switches do a moveSpent reset.
  Interceptor.attach(base.add(0x0048AA24 - 0x00400000), {
    onEnter() {
      const snap = snapshotUnits(null);
      send({
        kind: 'active_civ_on',
        time_ms: Date.now(),
        civs_with_nonzero_ms: snap.filter(u => u.moveSpent > 0).map(u => ({ idx: u.idx, owner: u.owner, ms: u.moveSpent })),
      });
    }
  });

  send({ kind: 'ready', hooked: 2 });
}
