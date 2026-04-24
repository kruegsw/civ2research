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

// ═══════════════════════════════════════════════════════════════════
// OPEN QUESTION (unresolved as of 2026-04-20):
//   Human civ gets 2 starting Settlers on Deity. First one spawns
//   INSIDE new_civ(5). Second one spawns AFTER all new_civ(0-7)
//   complete AND after fun_tech_cycle_rule() fires for AI civs 1,4.
//   The function that calls new_unit a second time for the human
//   hasn't been identified yet. Likely an "apply difficulty bonuses"
//   step in the init path. Add a hook once found.
// ═══════════════════════════════════════════════════════════════════
// OBSERVED INIT SEQUENCE (from game_20260420_094910 first 7ms):
//
//   new_civ(0)                       ← barbarians
//   new_civ(1)
//   new_unit(type=0, owner=1, x,y)   ← AI 1 starting Settler
//   new_civ(2) new_civ(3)            ← dormant civs (no unit spawn)
//   new_civ(4)
//   new_unit(type=0, owner=4, x,y)   ← AI 2 starting Settler
//   new_civ(5)
//   new_unit(type=0, owner=5, x,y)   ← HUMAN starting Settler #1
//   new_civ(6) new_civ(7)            ← dormant civs
//   new_unit(type=0, owner=5, x,y)   ← HUMAN Settler #2 (Deity bonus)
//
// Then ~940ms later:
//   main_game_loop                   ← turn 1 starts
//   civ_turn_driver(0) for alive civs only (0, 1, 4, 5), strict order
//   Each civ_turn_driver invokes fun_per_civ_tick internally
//
// Sub-function sizes (bigger = more logic = higher-value to decode):
//   FUN_004d01ae    90 bytes   → dispatch/flag update
//   FUN_00488cef  1438 bytes   → pre-tick state update (treasury etc)
//   FUN_00487a41  3830 bytes   → CITY LOOP — iterates DAT_00655b18
//                                 cities, calls fun_city_turn_sync
//                                 per city of the current civ
//   FUN_00560084   part of v3's port — stateFlags clear, senate toggle
//   FUN_0053184d 14665 bytes   → BIG — gated on AI-only + tech check,
//                                 iterates cities looking at enemy
//                                 threats, iterates units via
//                                 FUN_005B2E69/FUN_005B2C82. This is
//                                 AI UNIT DECISIONS per civ.
//   FUN_00489292   705 bytes   → post-tick (treasury delta logging)
//
// ═══════════════════════════════════════════════════════════════════

const TARGETS = [
  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Turn skeleton — WHEN things happen
  // ═══════════════════════════════════════════════════════════════
  { va: 0x0048B340, name: 'main_game_loop',      args: 0 },
  { va: 0x00489553, name: 'civ_turn_driver',     args: 1, argNames: ['civSlot'] },

  // Sub-functions called inside civ_turn_driver IN ORDER. Labelled
  // by likely purpose based on size + callees. Confirmed to fire
  // once per civ_turn_driver call (= 4× on a 4-civ turn).
  { va: 0x004A75A6, name: 'civdrv_alive_check',  args: 1, argNames: ['civSlot'], readRet: true },
  { va: 0x004D01AE, name: 'civdrv_step1_dispatch',args: 1, argNames: ['civSlot'] },
  { va: 0x00488CEF, name: 'civdrv_step2_economy', args: 1, argNames: ['civSlot'] },
  { va: 0x00487A41, name: 'civdrv_step3_city_loop',args: 1, argNames: ['civSlot'] },
  { va: 0x0053184D, name: 'civdrv_step5_ai_decide',args: 1, argNames: ['civSlot'] },
  { va: 0x00489292, name: 'civdrv_step6_finalize',args: 2, argNames: ['civSlot','savedTreasury'] },
  { va: 0x004D0339, name: 'civdrv_tech_delta_check', args: 1, argNames: ['civSlot'], readRet: true },
  { va: 0x0059772C, name: 'civdrv_tech_tally',   args: 2, argNames: ['civSlot','isHuman'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Civ lifecycle — confirmed firing in strict slot order
  // during init. 8 calls total (civ 0-7). civs 2/3/6/7 "dormant" in
  // observed game — no starting unit, no civ_turn_driver follows.
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004A7CE9, name: 'new_civ',   args: 1, argNames: ['civSlot'],
    backtrace: true, readCivAtSlot: true, readGlobals: true },
  // kill_civ fires during teardown like delete_city. Dropping backtrace
  // to avoid unstable-stack dereferences during game-over / civ-wipe.
  { va: 0x004AA378, name: 'kill_civ',  args: 2, argNames: ['civSlot','by'],
    readCivAtSlot: true },
  // Deity bonus-Settler logic: runs AFTER all 8 new_civ calls; creates
  // 2nd Settlers per conditions A/B/C (see block_004A0000.c:2568-2589).
  // Reading globals at entry captures bonusMask/bonusFlag which drive
  // which civs get a bonus.
  { va: 0x004A7754, name: 'balance_bonus_fn', args: 0, argNames: [],
    backtrace: true, readGlobals: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: City lifecycle (create_city retval = cityIdx, confirmed)
  // ═══════════════════════════════════════════════════════════════
  { va: 0x0043F8B0, name: 'create_city', args: 3, argNames: ['x','y','owner'],
    readRet: true, backtrace: true },
  // delete_city fires DURING TEARDOWN (game over, all cities wiped) with
  // the stack in a non-standard state. Backtracer.ACCURATE can deref
  // invalid frames → Civ2 crash. Drop backtrace; delete_city's caller
  // is almost always the city-destruction handler in block_00440000
  // anyway, so the backtrace rarely added info.
  { va: 0x004413D1, name: 'delete_city', args: 2, argNames: ['cityIdx','reason'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Units — every creation goes through new_unit regardless
  // of source (init placement, AI production, hut mercenary, barb
  // spawn, upgrade). retval = new unit's slot index.
  // Observed: civ 5 (human) gets 2 new_unit calls with identical
  // coords on Deity — confirms the starting-Settler bonus.
  // ═══════════════════════════════════════════════════════════════
  // new_unit fires ~5×/game at init + once per production. Low frequency,
  // so enable backtrace to identify WHICH caller made each call. This
  // lets us resolve questions like "why does civ 2 get 2 Settlers on
  // Deity?" by looking at the call-chain in Ghidra.
  // Also add readCivSnapshot so we can see civ state at spawn moment
  // (leader personality, difficulty gates, etc).
  { va: 0x005B3D06, name: 'new_unit',    args: 4, argNames: ['type','owner','x','y'],
    readRet: true, backtrace: true, readCivAtOwner: true },
  { va: 0x0058C295, name: 'fun_unit_disband', args: 1, argNames: ['unitIdx'] },
  { va: 0x00580341, name: 'fun_unit_kill',    args: 2, argNames: ['unitIdx','killerIdx'] },

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
  { va: 0x005F2280, name: 'crt_rand',          args: 0, readRet: true, hot: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: Government + state
  // ═══════════════════════════════════════════════════════════════
  { va: 0x0055C69D, name: 'fun_gov_assign',    args: 2, argNames: ['civSlot','newGov'] },
  { va: 0x00556230, name: 'fun_civ_state_setter', args: 2, argNames: ['civSlot','value'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: Research
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004C2788, name: 'fun_research_cost',   args: 1, argNames: ['civSlot'], readRet: true },
  // FUN_004c09b0 — AI research-target picker. captureRand records
  // holdrand at entry/exit + return value so the v3 port can be
  // validated pick-for-pick (seed v3's SeededRNG with rand_enter,
  // run port, expect identical pick AND ending holdrand = rand_exit).
  { va: 0x004C09B0, name: 'ai_research_pick', args: 1, argNames: ['civSlot'],
    readRet: true, captureRand: true },
  // FUN_004bdb2c — calcTechValue, called ~7× per ai_research_pick at
  // game start (once per can-research candidate) and then periodically
  // after tech completions. ~20-50 calls per captured session, low
  // overhead. captureRand isn't needed (the function doesn't use rand),
  // but readRet gives us the authoritative techValue per (civ, tech)
  // that the v3 port must reproduce. Args: civSlot, techId.
  { va: 0x004BDB2C, name: 'ai_calc_tech_value', args: 2,
    argNames: ['civSlot', 'techId'], readRet: true },
  { va: 0x0049A48E, name: 'fun_research_accum',  args: 1, argNames: ['civSlot'] },
  { va: 0x004C195E, name: 'fun_tech_cycle_rule', args: 2, argNames: ['civSlot','techId'], readRet: true },
  // HOT: fires ~170×/turn per civ inside fun_per_civ_tick iterating
  // over all tech slots. Dropped readRet (we only need args to see
  // which (civ, techId) pairs are queried).
  { va: 0x00453E51, name: 'fun_city_owner_by_tech',args: 2, argNames: ['civSlot','techId'], hot: true },

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
  // TIER 2: Main game loop internal phases
  // FUN_0048B340 has setup → infinite while loop with these calls.
  // Hooking them exposes turn structure and per-turn global steps.
  // ═══════════════════════════════════════════════════════════════
  // Outer setup (fires once at main loop entry):
  { va: 0x0059DB08, name: 'mgl_setup_59db08',   args: 1, argNames: ['mode'] },
  { va: 0x0042A768, name: 'mgl_pause_or_yield', args: 0 },
  { va: 0x004E4CEB, name: 'mgl_init_finalize',  args: 0 },

  // Per-iteration (fires every pass through the while loop — each
  // "turn" cycle):
  { va: 0x0048A92D, name: 'mgl_iter_top',       args: 0 },
  { va: 0x00487371, name: 'mgl_iter_check1',    args: 1, argNames: ['flag'] },
  { va: 0x0048AEDC, name: 'mgl_iter_check2',    args: 0, readRet: true },
  { va: 0x005AE006, name: 'mgl_human_mask',     args: 1, argNames: ['humanMask'], readRet: true },
  { va: 0x0048B165, name: 'mgl_input_check',    args: 0, readRet: true },

  // Four per-turn GLOBAL processing steps (called with turn number
  // DAT_00655af8). Likely global warming, plague, pollution, or other
  // world-wide per-turn effects.
  { va: 0x004FBA0C, name: 'mgl_turn_global_1',  args: 1, argNames: ['turn'] },
  { va: 0x004FBA9C, name: 'mgl_turn_global_2',  args: 1, argNames: ['turn'] },
  { va: 0x004FBB2F, name: 'mgl_turn_global_3',  args: 1, argNames: ['turn'] },
  { va: 0x004FBBDD, name: 'mgl_turn_global_4',  args: 0 },

  // Per-civ active-civ state
  { va: 0x0048AA24, name: 'mgl_active_civ_on',  args: 0 },
  { va: 0x0048A416, name: 'mgl_active_civ_off', args: 0 },

  // FUN_0048710a — observed to fire ONCE per turn cycle with
  // civSlot=-1 BEFORE the per-civ loop begins. So it's not strictly
  // "per civ" — it's a pre-civ-loop turn-begin setup. v3 may need
  // to mirror this as a "before all civs process" hook.
  { va: 0x0048710A, name: 'pre_civ_loop_tick', args: 1, argNames: ['civSlot'] },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: AI decision sub-functions (inside civdrv_step5_ai_decide)
  // These fire ONLY for AI civs (not human). Decoding them will tell
  // us how Civ2's AI decides things.
  // ═══════════════════════════════════════════════════════════════
  // FUN_004BD9F0 — "civ has tech/wonder id X" check. Heavy usage
  // throughout AI decisions. Hot (expect many calls per AI tick).
  { va: 0x004BD9F0, name: 'ai_civ_has',          args: 2, argNames: ['civSlot','techOrWonderId'], readRet: true, hot: true },
  // FUN_0055F5A3 — government evaluator (per earlier RE notes).
  { va: 0x0055F5A3, name: 'ai_gov_evaluator',    args: 1, argNames: ['civSlot'], readRet: true },
  // FUN_004D007E — very hot (~8700 calls/2 turns). Observed args look
  // like pointers (huge values like 0x679000+), not cityIdx. Rename
  // to reflect unknown semantics. Disabled arg naming; log raw arg.
  { va: 0x004D007E, name: 'fun_d007e_hot',       args: 1, hot: true },
  // FUN_00531287 / FUN_00531607 — near ai_decide (FUN_0053184d).
  // Likely "evaluate threat" / "evaluate build-order" helpers.
  { va: 0x00531287, name: 'ai_decide_helper_1',  args: 1, argNames: ['civSlot'] },
  { va: 0x00531607, name: 'ai_decide_helper_2',  args: 2 },
  // FUN_00493602 — named "ai_research_helper" but OBSERVED firing
  // during init for ALL 8 civs (including barbarians and dormant
  // civs) immediately after each new_civ, AND again per-AI-civ
  // during civdrv_step5_ai_decide. So it's a per-civ init/tick
  // helper, not specifically "research." Rename.
  { va: 0x00493602, name: 'per_civ_helper_93602',args: 1, argNames: ['civSlot'] },

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

// ── Memory / arg helpers ─────────────────────────────────────────────

function readArg(p) {
  if (!p) return null;
  try { return p.toInt32(); }
  catch (_) {
    try { return p.toString(); }
    catch (__) { return null; }
  }
}

// ── Known memory-layout constants (from reverse_engineering/findings) ──
const CIV_STRUCT_BASE   = 0x0064C6A0;  // civ 0 data start (0xA0 past the header)
const CIV_STRUCT_STRIDE = 0x594;
// MSVC CRT rand() state (holdrand). Read at AI-function entry/exit to
// capture the RNG state consumed by that function — the AI-port
// validator seeds v3's SeededRNG with entry state to reproduce the
// binary's rand() sequence for that function.
const RAND_HOLDRAND_ADDR = 0x00639E50;

function readHoldrand(base) {
  try { return base.add(RAND_HOLDRAND_ADDR - 0x00400000).readU32(); }
  catch (_) { return null; }
}
const LEADER_PERSONALITY_BASE   = 0x006554FA;  // stride 0x30 per civ
const LEADER_PERSONALITY_STRIDE = 0x30;
const DIFFICULTY_BYTE   = 0x00655B04;  // 0=Chieftain, 5=Deity
const HUMAN_PLAYERS_MASK = 0x00655B0B;
// Globals used by FUN_004a7754 (Deity bonus Settler logic) — see block_004A0000.c line 2568-2589
const DAT_00655B08 = 0x00655B08;  // difficulty-byte per decompiled src (may alias DIFFICULTY_BYTE)
const DAT_00655B0B = 0x00655B0B;  // bitmask: civ bit set + Deity → +1 Settler
const DAT_00655B02 = 0x00655B02;  // flag: if non-zero + Deity → +1 Settler for ALL civs
const DAT_00655B0A = 0x00655B0A;  // active-civs bitmask (updated as new_civ succeeds/fails)
const DAT_00655AE8 = 0x00655AE8;  // game state flags
const DAT_00655AF8 = 0x00655AF8;  // tech counter (0 at init, gates starting tech)

// Symbolize a return address to "Ghidra function name (rel offset)".
// Civ2 image base is 0x00400000. RVA = va - 0x00400000.
// Without a full symbol table in Frida, all we can do is return the
// RVA in hex — downstream analysis cross-references it with Ghidra's
// FUN_xxx list.
function symbolize(p) {
  if (!p) return null;
  const va = p.toInt32() >>> 0;  // unsigned
  const rva = va - 0x00400000;
  if (rva < 0 || rva > 0x00300000) return '0x' + va.toString(16);
  return '0x' + va.toString(16);  // Frida-side we emit the VA; host-side
                                   // we resolve to Ghidra names.
}

// Read civ_struct snapshot for a given slot.
// Exposes just the fields that are most informative for init-rule
// questions (difficulty, treasury, tech counts, government, position,
// personality). All within the stride 0x594 block.
function readCivSnapshot(base, civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const civBase = base.add(CIV_STRUCT_BASE - 0x00400000 + civSlot * CIV_STRUCT_STRIDE);
    return {
      stateFlags:  civBase.add(0x00).readU16(),
      treasury:    civBase.add(0x02).readS32(),
      styleLeader: civBase.add(0x06).readS16(),
      acqTechCount:civBase.add(0x10).readU8(),
      futTechCount:civBase.add(0x11).readU8(),
      government:  civBase.add(0x15).readU8(),
      sci:         civBase.add(0x13).readU8(),
      tax:         civBase.add(0x14).readU8(),
      reputation:  civBase.add(0x1E).readU8(),
    };
  } catch (e) {
    return { err: String(e) };
  }
}

// Read leader personality byte row (0x30 bytes) for a civ.
function readLeaderPersonality(base, civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const lpBase = base.add(LEADER_PERSONALITY_BASE - 0x00400000 + civSlot * LEADER_PERSONALITY_STRIDE);
    const bytes = lpBase.readByteArray(LEADER_PERSONALITY_STRIDE);
    return Array.from(new Uint8Array(bytes));
  } catch (e) {
    return { err: String(e) };
  }
}

function readGlobals(base) {
  try {
    return {
      difficulty:   base.add(DIFFICULTY_BYTE - 0x00400000).readU8(),
      humanPlayers: base.add(HUMAN_PLAYERS_MASK - 0x00400000).readU8(),
      // Bonus-Settler logic globals (see block_004A0000.c FUN_004a7754):
      diff_b08:     base.add(DAT_00655B08 - 0x00400000).readU8(),
      bonusMask:    base.add(DAT_00655B0B - 0x00400000).readU8(),
      bonusFlag:    base.add(DAT_00655B02 - 0x00400000).readU8(),
      activeMask:   base.add(DAT_00655B0A - 0x00400000).readU8(),
      gameFlags16:  base.add(DAT_00655AE8 - 0x00400000).readU16(),
      techCounter:  base.add(DAT_00655AF8 - 0x00400000).readU16(),
    };
  } catch (e) { return { err: String(e) }; }
}

// ── Attach hooks ─────────────────────────────────────────────────────

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
        // WHO called us? (symbolized as VA — host resolves to Ghidra name)
        if (entry.backtrace) {
          try {
            const bt = Thread.backtrace(this.context, Backtracer.ACCURATE).slice(0, 6);
            msg.stack = bt.map(p => symbolize(p));
          } catch (_) {
            try {
              const bt = Thread.backtrace(this.context, Backtracer.FUZZY).slice(0, 6);
              msg.stack = bt.map(p => symbolize(p));
              msg.stack_fuzzy = true;
            } catch (__) { /* swallow */ }
          }
        }
        // Snapshot state that explains WHY this fired.
        if (entry.readCivAtOwner && msg.named && msg.named.owner != null) {
          msg.civSnapshot = readCivSnapshot(base, msg.named.owner);
          msg.leaderPersonality = readLeaderPersonality(base, msg.named.owner);
          msg.globals = readGlobals(base);
        }
        if (entry.readCivAtSlot && msg.named && msg.named.civSlot != null) {
          msg.civSnapshot = readCivSnapshot(base, msg.named.civSlot);
          msg.globals = readGlobals(base);
        }
        // Standalone globals read (for hooks like balance_bonus_fn that
        // take no args but still want state snapshot).
        if (entry.readGlobals && !msg.globals) {
          msg.globals = readGlobals(base);
        }
        // Capture MSVC rand state at entry for AI-port validation.
        // Lets the v3 port seed its SeededRNG with the same holdrand
        // value the binary had at function entry — so v3's ported
        // logic consumes rand() calls in lock-step and produces
        // identical outputs.
        if (entry.captureRand) {
          msg.rand_enter = readHoldrand(base);
        }
        // Save state for onLeave
        this._traceEntry = entry;
        this._enter_ms = msg.time_ms;
        send(msg);
      },
      onLeave(retval) {
        if (!this._traceEntry) return;
        const needRet = this._traceEntry.readRet;
        const needRand = this._traceEntry.captureRand;
        if (!needRet && !needRand) return;
        const out = {
          kind: 'return',
          fn: this._traceEntry.name,
          dur_ms: Date.now() - this._enter_ms,
          time_ms: Date.now(),
        };
        if (needRet) out.retval = readArg(retval);
        if (needRand) out.rand_exit = readHoldrand(base);
        send(out);
      },
    });
    return true;
  } catch (e) {
    send({ kind: 'hook_failed', fn: entry.name, va: '0x' + entry.va.toString(16),
           err: String(e), stack: (e && e.stack) ? e.stack.toString() : null });
    return false;
  }
}

// Hooks flagged `hot: true` fire thousands of times per turn and the
// Frida interceptor overhead causes Civ2 to hang its Windows message
// loop → OS kills the process. Disabled by default. Set
// ENABLE_HOT_HOOKS=1 in the frida_host shell env to re-enable for
// narrow, RNG-sequence-style investigations.
const enableHot = (function() {
  try { return typeof ENABLE_HOT_HOOKS !== 'undefined' && !!ENABLE_HOT_HOOKS; }
  catch (_) { return false; }
})();

let attachedCount = 0;
let skippedHot = 0;
let failedHooks = [];
if (base) {
  const all = TARGETS.concat(CRT);
  for (const t of all) {
    if (t.hot && !enableHot) { skippedHot++; continue; }
    if (attachHook(t)) attachedCount++;
    else failedHooks.push(t.name);
  }
}

send({ kind: 'ready', hooked: attachedCount, total: TARGETS.length + CRT.length,
       skipped_hot: skippedHot, enableHot, failed: failedHooks });

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
