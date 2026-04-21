// trace_treasury.js — probe civ treasury changes per turn.
// Hooks civ_turn_driver (FUN_00489553) entry + exit. Reads each civ's
// treasury at both moments + yields to compute per-civ per-turn delta.
// Optional: hook civdrv_step2_economy to separate tax-income vs support.
//
// Matches the proven minimal-agent pattern (1-2 hooks, no backtrace,
// minimal reads) — should not crash Civ2.
//
// Output format (per civ per turn):
//   { kind: 'turn_start', civ, treasury, sciRate, taxRate, cities[N] }
//   { kind: 'turn_end',   civ, treasury, delta, ... }

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

// Civ struct @ 0x0064C6A0 + slot * 0x594:
//   +0x00 stateFlags u16
//   +0x02 treasury   s32
//   +0x08 cityCount  s16  (approximate, may be different offset)
//   +0x13 scienceRate u8
//   +0x14 taxRate     u8
//   +0x15 government  u8
// Globals:
//   0x00655B08 diff_b08
const CIV_BASE   = 0x0064C6A0;
const CIV_STRIDE = 0x594;

function readCiv(slot) {
  if (slot < 0 || slot > 7) return null;
  try {
    const p = base.add(CIV_BASE - 0x00400000 + slot * CIV_STRIDE);
    return {
      flags:    p.add(0x00).readU16(),
      treasury: p.add(0x02).readS32(),
      sciRate:  p.add(0x13).readU8(),
      taxRate:  p.add(0x14).readU8(),
      gov:      p.add(0x15).readU8(),
    };
  } catch (e) { return null; }
}

if (base) {
  // civ_turn_driver @ 0x00489553: (civSlot) — runs all of civ's turn.
  Interceptor.attach(base.add(0x00489553 - 0x00400000), {
    onEnter(args) {
      this._civSlot = args[0].toInt32();
      const before = readCiv(this._civSlot);
      this._before = before;
      send({
        kind: 'turn_start',
        civ: this._civSlot,
        treasury: before ? before.treasury : null,
        sciRate: before?.sciRate, taxRate: before?.taxRate, gov: before?.gov,
        time_ms: Date.now(),
      });
    },
    onLeave() {
      const after = readCiv(this._civSlot);
      const before = this._before;
      send({
        kind: 'turn_end',
        civ: this._civSlot,
        treasury: after ? after.treasury : null,
        delta: (before && after) ? (after.treasury - before.treasury) : null,
        govChanged: before && after ? (before.gov !== after.gov) : null,
        time_ms: Date.now(),
      });
    }
  });

  // civdrv_step2_economy @ 0x00488CEF: (civSlot) — the economic phase
  // that accrues tax income and pays support. Hooking it lets us split
  // the per-turn delta into "economy-driven" vs "other" (rush-buy, huts,
  // trade routes, diplomacy, etc.).
  Interceptor.attach(base.add(0x00488CEF - 0x00400000), {
    onEnter(args) {
      this._civSlot = args[0].toInt32();
      const before = readCiv(this._civSlot);
      this._ecoBefore = before ? before.treasury : null;
    },
    onLeave() {
      const after = readCiv(this._civSlot);
      send({
        kind: 'economy_step',
        civ: this._civSlot,
        treasuryAfter: after ? after.treasury : null,
        delta: (this._ecoBefore != null && after) ? (after.treasury - this._ecoBefore) : null,
        time_ms: Date.now(),
      });
    }
  });

  send({ kind: 'ready', hooked: 2 });
}
