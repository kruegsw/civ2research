// trace_research_only.js — minimal Frida agent to capture fun_research_cost
// args + retval only. Use when trace_civ2.js is too invasive and crashes Civ2.
//
// Hooks JUST ONE function: FUN_004c2788 (research cost calc). Each call
// emits {civSlot, cost} + a couple of global state bytes. No backtrace,
// no memory reads beyond the critical globals. Absolute minimum overhead.
//
// Goal: capture (civSlot, techCount, cost) tuples during real gameplay
// to compare against v3's calcResearchCost for the delta documented in
// fact/v3_research_cost_delta.md.

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

// Key globals (as documented in fact_difficulty_byte_address.md):
//   0x00655B08 = diff_b08 — actual difficulty byte (5=Deity)
//   0x00655B0B = bonusMask — human civ bit mask
//   0x00655B1A = DAT_00655b1a — numDefinedTechs (drives the *67/N cost
//                scaling step in FUN_004c2788). Empirically 111 in one
//                session, 90 expected by v3 — session-dependent. Knowing
//                the session-specific value is the key to closing #54.
// Civ struct @ 0x0064C6A0 + civSlot * 0x594:
//   +0x10 = acqTechCount (drives cost multiplier)
//   +0x11 = futTechCount
const DAT_00655B08 = 0x00655B08;
const DAT_00655B0B = 0x00655B0B;
const DAT_00655B1A = 0x00655B1A;
const CIV_BASE     = 0x0064C6A0;
const CIV_STRIDE   = 0x594;

function readGlobals() {
  try {
    return {
      diff:      base.add(DAT_00655B08 - 0x00400000).readU8(),
      bonusMask: base.add(DAT_00655B0B - 0x00400000).readU8(),
      // DAT_00655b1a could be u8 or u16 — read both and let host decide.
      numDefinedTechs_u8:  base.add(DAT_00655B1A - 0x00400000).readU8(),
      numDefinedTechs_u16: base.add(DAT_00655B1A - 0x00400000).readU16(),
    };
  } catch (e) { return null; }
}

function readCivTechs(civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const p = base.add(CIV_BASE - 0x00400000 + civSlot * CIV_STRIDE);
    return {
      acq:  p.add(0x10).readU8(),
      fut:  p.add(0x11).readU8(),
    };
  } catch (e) { return null; }
}

if (base) {
  const addr = base.add(0x004C2788 - 0x00400000);
  Interceptor.attach(addr, {
    onEnter(args) {
      const civSlot = args[0].toInt32();
      this._civSlot = civSlot;
      this._t0 = Date.now();
    },
    onLeave(retval) {
      const cost = retval.toInt32();
      send({
        kind: 'research_cost',
        civSlot: this._civSlot,
        cost,
        techs: readCivTechs(this._civSlot),
        globals: readGlobals(),
        time_ms: this._t0,
      });
    }
  });
  send({ kind: 'ready', hooked: 1 });
}
