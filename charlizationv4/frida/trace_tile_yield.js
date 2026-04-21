// trace_tile_yield.js — minimal agent to capture FUN_004e868f tile yields
// Records (cityIdx, tileOffsetInRadius, yieldType, returnValue) for each call.
// No backtrace, no extra memory reads — matches the proven-safe pattern of
// trace_research_only.js to keep Civ2 stable.
//
// Goal: compare against v3's getTileYields() for #57 tile yield debugging.
// FUN_004e868f signature: int FUN_004e868f(int cityIdx, int radiusOffset, int yieldType)
//   yieldType: 0=food, 1=shields, 2=trade
//   radiusOffset: 0..20, index into CITY_RADIUS_DOUBLED table

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

if (base) {
  // FUN_004e868f @ 0x004E868F — tile yield per (city, offset, type).
  Interceptor.attach(base.add(0x004E868F - 0x00400000), {
    onEnter(args) {
      this._cityIdx = args[0].toInt32();
      this._offset  = args[1].toInt32();
      this._yieldType = args[2].toInt32();
    },
    onLeave(retval) {
      send({
        kind: 'tile_yield',
        cityIdx: this._cityIdx,
        offset: this._offset,
        yieldType: this._yieldType, // 0=food, 1=shields, 2=trade
        value: retval.toInt32(),
      });
    }
  });
  send({ kind: 'ready', hooked: 1 });
}
