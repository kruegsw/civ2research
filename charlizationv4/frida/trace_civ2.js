// ═══════════════════════════════════════════════════════════════════
// trace_civ2.js — Frida agent that runs inside civ2.exe
//
// Hooks key game functions and emits structured events via `send()`.
// The Python host (frida_host.py) receives them and writes to
// civ2_trace.log.
//
// Addresses come from Ghidra decompilation:
//   - Renamed functions: reverse_engineering/decompiled/*.c
//   - Raw FUN_xxx addresses: same source
//
// To add a new hook:
//   1. Find the function's VA in Ghidra (or in the decompiled .c files).
//   2. Add an entry to TARGETS below with the name, offset, arg reader.
//   3. Reload the agent (Ctrl-C the host, rerun it).
//
// Address notes:
//   - Addresses are RVAs from civ2.exe image base. Frida adds the
//     runtime base automatically via Module.findBaseAddress.
//   - Civ2 is 32-bit, cdecl/stdcall calling conventions. Stack args
//     are at args[0], args[1], ... via NativeCallback pointer math.
// ═══════════════════════════════════════════════════════════════════

// Defensive startup — wrap every call so a TypeError surfaces with
// enough context to diagnose. Frida's error messages otherwise collapse
// to "TypeError: not a function" with no location info.

function safe(name, fn) {
  try { return fn(); }
  catch (e) {
    send({ kind: 'error', where: name, msg: String(e),
           stack: (e && e.stack) ? e.stack.toString() : null });
    return null;
  }
}

const MODULE_NAME = 'civ2.exe';

// Module enumeration is more forgiving than findBaseAddress on some
// Frida versions — try both.
let base = safe('Module.findBaseAddress', () => Module.findBaseAddress(MODULE_NAME));
if (!base) {
  const mods = safe('Process.enumerateModules', () => Process.enumerateModules()) || [];
  const mod = mods.find(m => (m.name || '').toLowerCase() === MODULE_NAME.toLowerCase());
  if (mod) base = mod.base;
  send({ kind: 'debug', msg: 'module enumerate fallback',
         modules: mods.slice(0, 5).map(m => ({ name: m.name, base: m.base.toString() })) });
}

if (!base) {
  send({ kind: 'error', msg: 'civ2.exe module not found — is Civ2 running?' });
} else {
  const pidVal = safe('Process.id', () => Process.id);
  send({ kind: 'startup', base: base.toString(), pid: pidVal });
}

// ── Address → function metadata ─────────────────────────────────────
//
// Each entry: VA (from Ghidra), name, numArgs (for stack reader),
// optional 'argNames' for readable logs, optional 'readRet' to include
// return value on leave.
//
// Wide net, Tier 1: renamed functions we know are meaningful.

const TARGETS = [
  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Main game loop + per-civ turn driver (skeleton of every
  // turn's processing — hooking these shows WHEN things happen).
  // ═══════════════════════════════════════════════════════════════
  // FUN_0048b340 — outer game loop (no args, runs forever, iterates
  // civs each pass). This is the "while(true) process_all_civs()"
  // loop. One call happens at game start, one "pass" per turn cycle.
  { va: 0x0048B340, name: 'main_game_loop',    args: 0 },
  // Three places that call FUN_00489553 (per-civ dispatch) are the
  // three sub-phases of the turn cycle. We hook the per-civ dispatch
  // itself — one hook, fires per-civ-per-turn.
  { va: 0x00489553, name: 'civ_turn_driver',   args: 1, argNames: ['civSlot'] },

  // Sub-functions called inside civ_turn_driver (in the order they
  // fire). Labelled anonymously until we decode what each does —
  // seeing their relative timing + args on a live trace will tell us.
  { va: 0x004A75A6, name: 'civdrv_alive_check',    args: 1, argNames: ['civSlot'], readRet: true },
  { va: 0x004D01AE, name: 'civdrv_sub_d01ae',      args: 1, argNames: ['civSlot'] },
  { va: 0x00488CEF, name: 'civdrv_sub_88cef',      args: 1, argNames: ['civSlot'] },
  { va: 0x00487A41, name: 'civdrv_sub_87a41',      args: 1, argNames: ['civSlot'] },
  { va: 0x0053184D, name: 'civdrv_sub_53184d',     args: 1, argNames: ['civSlot'] },
  { va: 0x00489292, name: 'civdrv_sub_89292',      args: 2, argNames: ['civSlot','savedTreasury'] },
  { va: 0x004D0339, name: 'civdrv_tech_delta_check', args: 1, argNames: ['civSlot'], readRet: true },
  { va: 0x0059772C, name: 'civdrv_tech_tally',     args: 2, argNames: ['civSlot','isHuman'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Civ lifecycle
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004A7CE9, name: 'new_civ',           args: 1, argNames: ['civSlot'] },
  { va: 0x004AA378, name: 'kill_civ',          args: 2, argNames: ['civSlot', 'by'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: City lifecycle
  // ═══════════════════════════════════════════════════════════════
  // create_city return value is the new cityIdx — confirmed in live trace.
  { va: 0x0043F8B0, name: 'create_city',       args: 3, argNames: ['x','y','owner'], readRet: true },
  { va: 0x004413D1, name: 'delete_city',       args: 2, argNames: ['cityIdx','reason'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Units
  // ═══════════════════════════════════════════════════════════════
  // FUN_005B3D06 = new_unit. Takes (type, owner, x, y), returns new
  // unit's slot index. This is what spawns every starting Settler,
  // every AI-produced unit, every hut-mercenary, and every barbarian.
  { va: 0x005B3D06, name: 'new_unit',          args: 4, argNames: ['type','owner','x','y'], readRet: true },
  // FUN_0058c295 — unit disband (50% shield refund)
  { va: 0x0058C295, name: 'fun_unit_disband',  args: 1, argNames: ['unitIdx'] },
  // FUN_00580341 — unit kill (barb-ransom logic path)
  { va: 0x00580341, name: 'fun_unit_kill',     args: 2, argNames: ['unitIdx','killerIdx'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Per-civ turn tick (FUN_00560084 — the function v3 has
  // been trying to faithfully reproduce)
  // ═══════════════════════════════════════════════════════════════
  { va: 0x00560084, name: 'fun_per_civ_tick',  args: 1, argNames: ['civSlot'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: RNG — critical for task #49
  // ═══════════════════════════════════════════════════════════════
  // _rand() takes no args, returns int 0..0x7FFF. MSVC LCG with state
  // at DAT_00639E50. Every hooked call tells us (a) call count and
  // (b) which higher-level function made the call (via backtrace).
  // WARNING: this is hot. Civ2 CRASHED during init with backtrace
  // enabled — mapgen calls rand thousands of times per second and
  // Backtracer.FUZZY appears to dereference unstable stack memory
  // during some of those windows. Disabled backtrace; keep the
  // counting hook.
  //
  // To re-enable for a narrower phase, set backtrace:true but only
  // run during steady-state gameplay (not mapgen/init).
  { va: 0x005F2280, name: 'crt_rand',          args: 0, readRet: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: Government + state
  // ═══════════════════════════════════════════════════════════════
  { va: 0x0055C69D, name: 'fun_gov_assign',    args: 2, argNames: ['civSlot','newGov'] },
  { va: 0x00556230, name: 'fun_civ_state_setter', args: 2, argNames: ['civSlot','value'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: Research
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004C2788, name: 'fun_research_cost',     args: 1, argNames: ['civSlot'], readRet: true },
  { va: 0x0049A48E, name: 'fun_research_accum',    args: 1, argNames: ['civSlot'] },
  { va: 0x004C195E, name: 'fun_tech_cycle_rule',   args: 2, argNames: ['civSlot','techId'], readRet: true },
  { va: 0x00453E51, name: 'fun_city_owner_by_tech',args: 2, argNames: ['civSlot','techId'], readRet: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: City per-turn processing
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004EBBDE, name: 'fun_city_food_tick',  args: 1, argNames: ['cityIdx'], readRet: true },
  { va: 0x004EC3FE, name: 'fun_city_prod_tick',  args: 1, argNames: ['cityIdx'] },
  { va: 0x004EA8E4, name: 'fun_city_happiness',  args: 1, argNames: ['cityIdx'], readRet: true },
  { va: 0x004E7EB1, name: 'fun_city_food_helper',args: 2, argNames: ['cityIdx','unitCount'] },
  { va: 0x004F0221, name: 'fun_building_upkeep', args: 1, argNames: ['cityIdx'] },
  { va: 0x004EC1C6, name: 'fun_assign_commodity',args: 2, argNames: ['cityIdx','unitType'] },
  { va: 0x004F0A9C, name: 'fun_city_turn_sync',  args: 1, argNames: ['cityIdx'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 3: Diplomacy / UI / persistence
  // ═══════════════════════════════════════════════════════════════
  { va: 0x0045950B, name: 'handle_exchange_gift',   args: 3, argNames: ['fromCiv','toCiv','item'] },
  { va: 0x004C59F0, name: 'handle_incident_terror', args: 2, argNames: ['civSlot','targetCiv'] },

  // Player input (useful for aligning human actions with AI ticks)
  { va: 0x00410F77, name: 'map_window_click',  args: 3 },
  { va: 0x00411705, name: 'map_double_click',  args: 3 },
  { va: 0x00411F91, name: 'map_ascii',         args: 1 },
  { va: 0x004125C6, name: 'map_key',           args: 1 },

  { va: 0x00509B48, name: 'city_button_buy',    args: 0 },
  { va: 0x0050A473, name: 'city_button_change', args: 0 },
  { va: 0x0050B74E, name: 'city_button_rename', args: 0 },
  { va: 0x0050BACD, name: 'city_button_view',   args: 0 },

  { va: 0x0047758C, name: 'save_game',         args: 1 },
  { va: 0x00473660, name: 'load_game_file',    args: 1 },
  { va: 0x004B2010, name: 'parse_save_block',  args: 2 },
  { va: 0x00477D8C, name: 'load_verify_units', args: 0 },

  { va: 0x004944BB, name: 'init_tile',         args: 3, argNames: ['gx','gy','terrain'] },

  // Known non-hut-but-still-logged render thunk (kept for timing info)
  { va: 0x0040BC80, name: 'thunk_0040bc80_render', args: 1, argNames: ['mode'], readRet: true },
];

// (CRT functions now rolled into TARGETS above — _rand @ 0x005F2280.)
const CRT = [];

// ── Attach hooks ─────────────────────────────────────────────────────

// Frida's NativePointer has `.toInt32()`, but only when the pointer
// fits in i32. For pointers >0x80000000 (rare in civ2 user-space),
// `.toUInt32()` is safer. Also guard against args[i] being undefined.
function readArg(p) {
  if (!p) return null;
  try {
    // Works for small values and pointer addresses in civ2's 32-bit space
    return p.toInt32();
  } catch (_) {
    try { return p.toString(); }
    catch (__) { return null; }
  }
}

function attachHook(entry) {
  if (!base) return false;
  const addr = base.add(entry.va - 0x00400000);  // civ2.exe image base is 0x00400000
  try {
    Interceptor.attach(addr, {
      onEnter(args) {
        const msg = {
          kind: 'call',
          fn: entry.name,
          va: '0x' + entry.va.toString(16),
          time_ms: Date.now(),
        };
        if (entry.args > 0) {
          const argArr = [];
          for (let i = 0; i < entry.args; i++) {
            argArr.push(readArg(args[i]));
          }
          msg.args = argArr;
          if (entry.argNames) {
            msg.named = {};
            for (let i = 0; i < entry.argNames.length && i < argArr.length; i++) {
              msg.named[entry.argNames[i]] = argArr[i];
            }
          }
        }
        // For hot functions we want to know WHO called them.
        // `backtrace: true` in entry opts in. Limit to 4 frames —
        // each frame is just the return address, rendered as hex.
        if (entry.backtrace) {
          try {
            const bt = Thread.backtrace(this.context, Backtracer.FUZZY).slice(0, 4);
            msg.stack = bt.map(p => p.toString());
          } catch (_) { /* swallow */ }
        }
        // Save state for onLeave
        this._traceEntry = entry;
        this._enter_ms = msg.time_ms;
        send(msg);
      },
      onLeave(retval) {
        if (!this._traceEntry || !this._traceEntry.readRet) return;
        send({
          kind: 'return',
          fn: this._traceEntry.name,
          retval: readArg(retval),
          dur_ms: Date.now() - this._enter_ms,
          time_ms: Date.now(),
        });
      },
    });
    return true;
  } catch (e) {
    send({ kind: 'hook_failed', fn: entry.name, va: '0x' + entry.va.toString(16),
           err: String(e), stack: (e && e.stack) ? e.stack.toString() : null });
    return false;
  }
}

let attachedCount = 0;
let failedHooks = [];
if (base) {
  for (const t of TARGETS) {
    if (attachHook(t)) attachedCount++;
    else failedHooks.push(t.name);
  }
  for (const t of CRT) {
    if (attachHook(t)) attachedCount++;
    else failedHooks.push(t.name);
  }
}

send({ kind: 'ready', hooked: attachedCount, total: TARGETS.length + CRT.length,
       failed: failedHooks });

// ── Memory watchpoints (phase 2, optional) ───────────────────────────
// Frida supports MemoryAccessMonitor for watching writes to specific
// addresses without needing function hooks. Useful for catching state
// changes that don't pass through a named function.
//
// Example targets to enable later:
//   - DAT_00627fd8 — unit uid counter (every new unit bumps this)
//   - DAT_00655b16 — totalUnits high water mark
//   - DAT_00639e50 — RNG seed state
//
// MemoryAccessMonitor.enable([
//   { base: ptr(0x00627fd8), size: 4 },
// ], { onAccess(details) { send({ kind: 'memwrite', addr: details.address.toString() }); } });
