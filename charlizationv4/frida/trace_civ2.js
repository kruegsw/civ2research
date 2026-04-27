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
  // civ_turn_driver fires once per civ per turn. captureUnitRoster
  // dumps the full slot list of alive units owned by civSlot at the
  // END of this civ's turn (after AI moves complete). --replay-frida
  // uses this to delete v3-only "phantom" units that binary doesn't
  // have (preventing the N≥13 structural drift).
  { va: 0x00489553, name: 'civ_turn_driver', args: 1, argNames: ['civSlot'],
    captureUnitRoster: true },

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
  // FUN_00580341 (15052 bytes) — combat resolver. Despite the legacy
  // name `fun_unit_kill`, this is the binary's combat resolution
  // function: takes attacker/defender unit indices, draws ~22 _rand()
  // values across rounds + veteran promotion, kills the loser. v3's
  // `combat.resolveCombat` already accepts opts.rngEnter (commit
  // 4f4bd01) — the captured rand_enter here is what the v3 port must
  // be seeded with for byte-parity outcomes.
  { va: 0x00580341, name: 'fun_combat_resolve',    args: 2,
    argNames: ['unitIdx','killerIdx'],
    readRet: true, captureRand: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1: Per-civ turn tick (FUN_00560084 — the function v3 has
  // been trying to faithfully reproduce)
  // ═══════════════════════════════════════════════════════════════
  // captureRand: per-civ-tick draws 6 rand values per AI civ — the
  // first two at lines 43/45 set aiRandomSeed and senateOverride,
  // the rest gate intruder/diplomatic timer flags. v3's
  // per-civ-tick.js currently SKIPS these draws (note at line ~199);
  // the captured rand_enter lets the port restore them and validate
  // the ending holdrand matches.
  { va: 0x00560084, name: 'fun_per_civ_tick',  args: 1, argNames: ['civSlot'],
    captureRand: true },

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
  // FUN_004c2788 — calcResearchCost (1003 bytes). Pure function: returns
  // the beaker cost for civ to research its next tech. Inputs are civ's
  // acqTechCount+futureTechCount, difficulty, leader civ stats, and a
  // handful of cosmic/scenario globals.
  { va: 0x004C2788, name: 'fun_research_cost', args: 1, argNames: ['civSlot'],
    readRet: true, captureResearchCostGlobals: true },
  // FUN_004bd2a3 — food/city-stability classifier (770 bytes). Returns
  // 1-6 enum from per-civ city food balance + civ govt/rates. Has one
  // side effect (calls FUN_004eb4ed per-city when DAT_00655aee bit 2
  // was set + govt > 4), but port mirrors only the return value.
  { va: 0x004BD2A3, name: 'fun_food_strategy', args: 1, argNames: ['civSlot'],
    readRet: true, captureFoodStrategyGlobals: true },
  // FUN_004c09b0 — AI research-target picker. captureRand records
  // holdrand at entry/exit + return value so the v3 port can be
  // validated pick-for-pick (seed v3's SeededRNG with rand_enter,
  // run port, expect identical pick AND ending holdrand = rand_exit).
  { va: 0x004C09B0, name: 'ai_research_pick', args: 1, argNames: ['civSlot'],
    readRet: true, captureRand: true, captureResearchPickGlobals: true },
  // FUN_00498e8b — AI city production picker (29400 bytes, too large to
  // port directly). Captures the AI's chosen production item per city
  // call so --replay-frida can inject into v3.cities[cityIdx].production.
  // Return value encoding (matches city+0x39 byte):
  //   0..0x3F  → unit type ID
  //   0x40..0xFF → building/wonder (computed as 256 - retval)
  //   99 (0x63) → "no change" sentinel
  // param_2/param_3 are output ptrs the binary writes recommended unit
  // and building indices into; for v3 we just need the int return.
  { va: 0x00498E8B, name: 'ai_city_production_pick', args: 3,
    argNames: ['cityIdx', 'unitOutPtr', 'buildingOutPtr'],
    readRet: true, captureProductionPickGlobals: true },
  // FUN_00538a29 — AI unit move/action master (44777 bytes). Per-unit:
  // operates on DAT_00655afe (active unit index). Return value = 0 if
  // unit didn't act, non-zero if it did. We hook at exit to capture
  // the unit's final state after AI processing — position, orders,
  // moveSpent, hp, statusFlags. --replay-frida injects these into
  // v3 cities[civ]'s units after END_TURN.
  { va: 0x00538A29, name: 'ai_unit_action', args: 0, argNames: [],
    readRet: true, captureUnitActionGlobals: true },
  // FUN_004bdb2c — calcTechValue, called ~7× per ai_research_pick at
  // game start (once per can-research candidate) and then periodically
  // after tech completions. ~20-50 calls per captured session, low
  // overhead. captureRand isn't needed (the function doesn't use rand),
  // but readRet gives us the authoritative techValue per (civ, tech)
  // that the v3 port must reproduce. Args: civSlot, techId.
  { va: 0x004BDB2C, name: 'ai_calc_tech_value', args: 2,
    argNames: ['civSlot', 'techId'], readRet: true,
    captureTechValGlobals: true },
  // FUN_0055c277 — canUseGovernment (323 bytes). Pure check: does civ
  // satisfy prereq tech (or Statue of Liberty) for govt index 2-6?
  // Cases 0-1 (anarchy/despotism) always return 1. Case 4
  // (Fundamentalism) additionally requires DAT_00627879 != 0 (tech 31
  // byte +5 in tech table — the "enabled" flag). Pure function; no
  // rand consumption.
  { va: 0x0055C277, name: 'can_use_government', args: 2,
    argNames: ['civSlot', 'govtIndex'], readRet: true,
    captureCanUseGovtGlobals: true },
  // FUN_0055f5a3 — chooseGovernment (558 bytes). Picks new govt after
  // revolution ends or when AI considers switching. Void return; the
  // decision is the param_2 passed to switchGovernment (FUN_0055c69d)
  // just before returning. captureChooseGovtGlobals reads the full
  // context (pref table, attitude byte, game/scenario flags, leader
  // civ's tech count, and civ+0x15 at entry+exit to detect what was
  // chosen).
  { va: 0x0055F5A3, name: 'choose_government', args: 2,
    argNames: ['civSlot', 'reactiveFlag'],
    captureChooseGovtGlobals: true, captureRand: true },
  { va: 0x0049A48E, name: 'fun_research_accum',  args: 1, argNames: ['civSlot'] },
  { va: 0x004C195E, name: 'fun_tech_cycle_rule', args: 2, argNames: ['civSlot','techId'], readRet: true },
  // HOT: fires ~170×/turn per civ inside fun_per_civ_tick iterating
  // over all tech slots. Dropped readRet (we only need args to see
  // which (civ, techId) pairs are queried).
  { va: 0x00453E51, name: 'fun_city_owner_by_tech',args: 2, argNames: ['civSlot','techId'], hot: true },

  // ═══════════════════════════════════════════════════════════════
  // TIER 2: City per-turn processing
  // ═══════════════════════════════════════════════════════════════
  { va: 0x004EBBDE, name: 'fun_city_food_tick',  args: 1, argNames: ['cityIdx'], readRet: true, captureCityState: true },
  { va: 0x004EC3FE, name: 'fun_city_prod_tick',  args: 1, argNames: ['cityIdx'], captureCityState: true },
  { va: 0x004EA8E4, name: 'fun_city_happiness',  args: 1, argNames: ['cityIdx'], readRet: true, captureCityState: true },
  { va: 0x004E7EB1, name: 'fun_city_food_helper',args: 2, argNames: ['cityIdx','unitCount'] },
  { va: 0x004F0221, name: 'fun_building_upkeep', args: 1, argNames: ['cityIdx'], captureCityState: true },
  { va: 0x004EC1C6, name: 'fun_assign_commodity',args: 2, argNames: ['cityIdx','unitType'] },
  { va: 0x004F0A9C, name: 'fun_city_turn_sync',  args: 1, argNames: ['cityIdx'], captureCityState: true },

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

// Globals read by FUN_004bdb2c (calcTechValue). Capturing these at
// each call lets the v3 port reproduce its logic exactly.
const DAT_0064B3FB = 0x0064B3FB;  // strategic goal tech (signed byte)
const DAT_0064C59E = 0x0064C59E;  // current research goal (free tech)
const DAT_00655AF0 = 0x00655AF0;  // scenario flags (bit 2 = bloodlust)
const DAT_00655BCE = 0x00655BCE;  // tech-adoption mask (NOT alive — misnamed below)
const DAT_00655B82 = 0x00655B82;  // per-tech "who knows it" bitmask (byte per tech)
const DAT_0064C4D6 = 0x0064C4D6;  // aqueduct tech id (byte)
const DAT_0064C546 = 0x0064C546;  // sewer tech id (byte)
const DAT_0064BCD1 = 0x0064BCD1;  // aqueduct city-size threshold (byte)
const DAT_0064BCD2 = 0x0064BCD2;  // sewer city-size threshold (byte)
const DAT_00655B18 = 0x00655B18;  // city count (iterated in aqueduct/sewer block)
const LEADER_PERS_BASE = 0x006554FA;  // per-leader personality byte (expand),
                                       // indexed by styleLeader * 0x30
const CIV_CONTINENT_BASE = 0x0064C932;  // per-(civ, continent) byte,
                                         // offset from civ base = +0x2AE

function readTechValueGlobals(base) {
  try {
    return {
      strategicGoal: base.add(DAT_0064B3FB - 0x00400000).readS8(),
      freeTechGoal: base.add(DAT_0064C59E - 0x00400000).readS16(),
      scenarioFlags: base.add(DAT_00655AF0 - 0x00400000).readU8(),
      // `aliveMask` name kept for trace-backward-compat but this is
      // actually the DAT_00655BCE tech-adoption mask (confirmed via
      // reads showing 0 at init when all civs are alive).
      aliveMask: base.add(DAT_00655BCE - 0x00400000).readU8(),
      aqueductTech: base.add(DAT_0064C4D6 - 0x00400000).readS8(),
      sewerTech: base.add(DAT_0064C546 - 0x00400000).readS8(),
      aqueductThreshold: base.add(DAT_0064BCD1 - 0x00400000).readU8(),
      sewerThreshold: base.add(DAT_0064BCD2 - 0x00400000).readU8(),
      cityCountGlobal: base.add(DAT_00655B18 - 0x00400000).readU8(),
    };
  } catch (_) { return null; }
}

// Read the per-tech "who-knows" byte from DAT_00655B82 + techId. If byte
// == 0, NO civ knows this tech → binary adds the +1 noOneHas bonus at
// FUN_004bdb2c:6421. v3 currently scans civTechs; capturing the real
// byte lets us cross-check whether our civTechs state matches binary.
function readKnowsTechByte(base, techId) {
  if (techId < 0 || techId >= 100) return null;
  try {
    return base.add(DAT_00655B82 - 0x00400000 + techId).readU8();
  } catch (_) { return null; }
}

// Read all 100 bytes of DAT_00655B82 — the global "civs-who-know-tech"
// bitmask array. Needed at ai_research_pick entry so the v3 port can
// answer per-tech noOneHas and prereq-penalty queries byte-exact for
// every candidate inside the internal calcTechValue loop.
function readAllKnowsTechBytes(base) {
  try {
    const out = new Array(100);
    for (let t = 0; t < 100; t++) {
      out[t] = base.add(DAT_00655B82 - 0x00400000 + t).readU8();
    }
    return out;
  } catch (_) { return null; }
}

// Capture globals FUN_0055c277 (canUseGovernment) depends on:
// - DAT_00627879: tech 31 (Fundamentalism) byte+5 — "enabled" flag.
//   When 0, Fundamentalism is disabled regardless of tech ownership.
// - Statue of Liberty wonder ownership for this civ: FUN_00453e51
//   returns non-zero iff civ owns Statue. We can't call Frida's hooked
//   function, but we can approximate by reading the wonder-owner
//   table directly. Statue of Liberty = wonder 19 (0x13). Wonder owner
//   table at DAT_0064f33c (per memory), stride 0x88 per wonder? Not
//   confirmed — capture the per-tech bitmask byte for relevant govt
//   prereqs instead, and let the validator derive ownership from v3.
// Simpler: capture the FULL knows-tech bitmask array (already done
// by readAllKnowsTechBytes) and civ's ownership check happens via
// existing wonder tracking in state.
function readCanUseGovtGlobals(base) {
  try {
    return {
      // Fundamentalism-enabled flag (tech 31 byte+5, aka DAT_00627879).
      fundamentalismEnabled: base.add(0x00627879 - 0x00400000).readU8(),
    };
  } catch (_) { return null; }
}

// Capture globals FUN_0055f5a3 (chooseGovernment) reads:
// - DAT_00655af0: scenario flags (bits 0x80 and 0x1 gate behavior)
// - DAT_0064bc60: game flags (bit 0x10 gates whether body runs)
// - DAT_00655b03: "leader civ" index (tech-parity comparator)
// - DAT_00655c22[civSlot]: attitude byte (gates tech-gap override)
// - civ+0x15: current govt_type (used as gate + reread at exit)
// - civ+0x10: acqTechCount (used in tech-gap check)
// - civ+0x3D4..0x3E2: 14-byte govt preference table (7 govts × i16)
// - Also for tech-gap override target, leaderCiv's acqTechCount
function readChooseGovtGlobals(base, civSlot) {
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const DAT_00655AF0 = 0x00655AF0;
    const DAT_0064BC60 = 0x0064BC60;
    const DAT_00655B03 = 0x00655B03;
    const DAT_00655C22 = 0x00655C22;
    const civBase = base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE);
    const leaderCiv = base.add(DAT_00655B03 - 0x00400000).readU8();
    const leaderBase = base.add(CIV_BASE - 0x00400000 + leaderCiv * STRIDE);
    // 7 signed-int16 preferences (indices 0..6, one per govt)
    const govtPrefs = new Array(7);
    for (let g = 0; g < 7; g++) {
      govtPrefs[g] = civBase.add(0x3D4 + g * 2).readS16();
    }
    return {
      scenarioFlags: base.add(DAT_00655AF0 - 0x00400000).readU8(),
      gameFlag0064bc60: base.add(DAT_0064BC60 - 0x00400000).readU8(),
      leaderCivIdx: leaderCiv,
      attitudeByte: base.add(DAT_00655C22 - 0x00400000 + civSlot).readU8(),
      civGovt: civBase.add(0x15).readU8(),
      civAcqTechCount: civBase.add(0x10).readU8(),
      leaderAcqTechCount: leaderBase.add(0x10).readU8(),
      govtPrefs,
    };
  } catch (_) { return null; }
}

// Capture globals FUN_004bd2a3 (food strategy classifier).
// Reads civ+0x13 (sci), +0x14 (tax), +0x15 (govt), DAT_00655aee (pre-
// clear), DAT_00655b18 (city count), and per-city bytes:
//   city+0x0: flags (bit 1 = disorder-ish, bit 2 = flag2)
//   city+0x4e: food supply
//   city+0x4f: food demand
function readFoodStrategyGlobals(base, civSlot) {
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const civBase = base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE);
    const CITY_BASE = 0x0064F340;  // per memory: city array base
    const CITY_STRIDE = 0x58;
    const cityCount = base.add(0x00655B18 - 0x00400000).readU16();
    // Gather per-civ cities' relevant bytes
    const cities = [];
    for (let i = 0; i < cityCount; i++) {
      const cBase = base.add(CITY_BASE - 0x00400000 + i * CITY_STRIDE);
      const cityFlags = cBase.readU32();        // city+0x0 (4-byte flags)
      if (cityFlags === 0) continue;             // city slot empty
      const owner = cBase.add(0x08).readS8();    // city+0x8 = owner per memory
      if (owner !== civSlot) continue;
      cities.push({
        idx: i,
        flags: cityFlags,
        foodSupply: cBase.add(0x4e).readS8(),
        foodDemand: cBase.add(0x4f).readS8(),
      });
    }
    return {
      civSci:  civBase.add(0x13).readU8(),
      civTax:  civBase.add(0x14).readU8(),
      civGovt: civBase.add(0x15).readU8(),
      dat655aee: base.add(0x00655AEE - 0x00400000).readU16(),  // pre-clear
      cities,
    };
  } catch (_) { return null; }
}

// Capture globals FUN_004c2788 (calcResearchCost) reads.
// Per-civ: acqTechCount (+0x10) + futureTechCount (+0x12) for civSlot
// AND for the leader civ (DAT_00655c20). Plus ~10 globals.
function readResearchCostGlobals(base, civSlot) {
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const civBase = base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE);
    const leaderSlot = base.add(0x00655C20 - 0x00400000).readU8();
    const leaderBase = base.add(CIV_BASE - 0x00400000 + leaderSlot * STRIDE);
    return {
      // Globals used by FUN_004c2788
      difficulty: base.add(0x00655B08 - 0x00400000).readU8(),
      humanPlayers: base.add(0x00655B0B - 0x00400000).readU8(),
      scenarioFlags: base.add(0x00655AF0 - 0x00400000).readU8(),
      scenarioFlagBcb4: base.add(0x0064BCB4 - 0x00400000).readU8(),
      scenarioTechParadigm: base.add(0x0064BCB2 - 0x00400000).readU8(),
      cosmicTechParadigm: base.add(0x0064BCD3 - 0x00400000).readU8(),
      leaderSlot,
      // DAT_00655AF8 is a 16-bit turn counter (incremented per cycle in
      // FUN_00487371:1816). Reading as S32 picks up adjacent bytes
      // (DAT_00655AFA = year-related field) and produces garbage.
      // Cast to int in the binary code at FUN_004c2788 sign-extends
      // from short, so readS16 here matches.
      techCounter: base.add(0x00655AF8 - 0x00400000).readS16(),
      numDefinedTechs: base.add(0x00655B1A - 0x00400000).readS32(),  // DAT_00655B1A
      // Per-civ
      civAcqTechCount: civBase.add(0x10).readU8(),
      civFutureTechCount: civBase.add(0x12).readU8(),
      leaderAcqTechCount: leaderBase.add(0x10).readU8(),
      leaderFutureTechCount: leaderBase.add(0x12).readU8(),
    };
  } catch (_) { return null; }
}

// Read all alive unit slots owned by civSlot. Used by civ_turn_driver
// onLeave to provide an authoritative roster for slot-level cleanup
// in --replay-frida (deletes v3-only phantoms).
// Unit array bound: DAT_00655B16 holds count, DAT_006560F0 base, 0x20
// stride. alive = nonzero i32 at +0x1A.
function readCivUnitRoster(base, civSlot) {
  try {
    const UNIT_BASE = 0x006560F0;
    const UNIT_STRIDE = 0x20;
    const DAT_00655B16 = 0x00655B16;
    const count = base.add(DAT_00655B16 - 0x00400000).readU16();
    const slots = [];
    for (let i = 0; i < count; i++) {
      const u = base.add(UNIT_BASE - 0x00400000 + i * UNIT_STRIDE);
      const alive = u.add(0x1A).readS32();
      if (alive === 0) continue;
      const owner = u.add(0x07).readS8();
      if (owner !== civSlot) continue;
      slots.push(i);
    }
    return slots;
  } catch (_) { return null; }
}

// Capture FUN_00538a29 (ai unit action) context. The active unit
// index is at DAT_00655afe (read at entry). At exit, read the unit's
// state from memory: position, orders, moveSpent, hp, statusFlags.
// Per Data_Structures.md unit struct (base 0x006560F0, stride 0x20):
//   +0x00 x i16, +0x02 y i16, +0x04 statusFlags u16, +0x06 type u8,
//   +0x07 owner i8, +0x08 movesRem u8, +0x0A hp u8, +0x0F orders u8,
//   +0x12 gotoX i16, +0x14 gotoY i16, +0x1A aliveFlag i32
function readActiveUnitIdx(base) {
  try {
    return base.add(0x00655AFE - 0x00400000).readU8();
  } catch (_) { return null; }
}
function readUnitState(base, unitIdx) {
  if (unitIdx < 0 || unitIdx > 0xFF) return null;
  try {
    const UNIT_BASE = 0x006560F0;
    const UNIT_STRIDE = 0x20;
    const u = base.add(UNIT_BASE - 0x00400000 + unitIdx * UNIT_STRIDE);
    return {
      x: u.readS16(),
      y: u.add(0x02).readS16(),
      statusFlags: u.add(0x04).readU16(),
      type: u.add(0x06).readU8(),
      owner: u.add(0x07).readS8(),
      movesRem: u.add(0x08).readU8(),
      hp: u.add(0x0A).readU8(),
      orders: u.add(0x0F).readU8(),
      gotoX: u.add(0x12).readS16(),
      gotoY: u.add(0x14).readS16(),
      alive: u.add(0x1A).readS32(),
    };
  } catch (_) { return null; }
}

// Capture context for FUN_00498e8b (AI city production pick). The
// city's owner is at city+0x8 — needed so --replay-frida can route
// the picked production to the right civ's end-turn injection. Also
// capture the city's current production byte (city+0x39) at entry
// for diagnostic purposes (helps identify "no change" vs "swap").
function readProductionPickGlobals(base, cityIdx) {
  if (cityIdx < 0 || cityIdx > 0xFF) return null;
  try {
    const CITY_BASE = 0x0064F340;
    const CITY_STRIDE = 0x58;
    const cBase = base.add(CITY_BASE - 0x00400000 + cityIdx * CITY_STRIDE);
    return {
      cityOwner: cBase.add(0x08).readS8(),
      currentProduction: cBase.add(0x39).readS8(),  // signed byte
      cityX: cBase.add(0x00).readS16(),  // for sanity-checking
      cityY: cBase.add(0x02).readS16(),
    };
  } catch (_) { return null; }
}

// Read FULL city struct (88 bytes) for a given cityIdx as a hex string.
// Used by per-function step-diff: capture city state at entry to a
// city-tick function and at exit. v3 then runs its equivalent function
// on the captured input and diffs the captured output. Pinpoints
// per-function divergence (yield calc, support, happiness, growth)
// instead of seeing only the cumulative end-of-turn delta.
function readCityState(base, cityIdx) {
  if (cityIdx < 0 || cityIdx > 0xFF) return null;
  try {
    const CITY_BASE = 0x0064F340;
    const CITY_STRIDE = 0x58;
    const cBase = base.add(CITY_BASE - 0x00400000 + cityIdx * CITY_STRIDE);
    const bytes = cBase.readByteArray(CITY_STRIDE);
    // Hex-encode for compactness (compresses well in the trace log).
    const arr = new Uint8Array(bytes);
    let hex = '';
    for (let i = 0; i < arr.length; i++) {
      hex += arr[i].toString(16).padStart(2, '0');
    }
    return hex;
  } catch (_) { return null; }
}

// Read all live cities at once (for hooks that take a civSlot, not
// a cityIdx — e.g. fun_per_civ_tick which iterates all of civ's cities).
// Returns { idx: hex, ... } only for cities with size > 0.
function readAllCityStates(base) {
  try {
    const CITY_BASE = 0x0064F340;
    const CITY_STRIDE = 0x58;
    const out = {};
    for (let i = 0; i < 256; i++) {
      const cBase = base.add(CITY_BASE - 0x00400000 + i * CITY_STRIDE);
      const size = cBase.add(0x09).readU8();
      if (size === 0) continue;
      const bytes = cBase.readByteArray(CITY_STRIDE);
      const arr = new Uint8Array(bytes);
      let hex = '';
      for (let k = 0; k < arr.length; k++) {
        hex += arr[k].toString(16).padStart(2, '0');
      }
      out[i] = hex;
    }
    return out;
  } catch (_) { return null; }
}

// Read civ+0x15 (govt_type) for a specific civ. Used at choose_government
// onLeave to detect what FUN_0055c69d switched to.
function readCivGovt(base, civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    return base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE + 0x15).readU8();
  } catch (_) { return null; }
}

// Read treaty-byte-1 for each (civ, other) pair at civ+0x21+i*4.
// This is DAT_0064c6c1 in the decompile (0x0064c6c1 - civ_base(0x0064c6a0)
// = 0x21, NOT 0xC1). The `& 0x20` bit at this offset is the "war"
// treaty flag — FUN_004bdb2c:6075 tests it to gate hostility-damping
// of leaderPers. Byte layout of each 4-byte treaty slot:
//   +0: contact/ceaseFire/peace/alliance/vendetta/hatred/embassy
//   +1: nukeTalk/attacked/**war(0x20)**/recentPeace
//   +2: cityCapture
function readDiploBytes(base, civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const civBase = base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE);
    const out = {};
    for (let i = 1; i < 8; i++) {
      out[i] = civBase.add(0x21 + i * 4).readU8();
    }
    return out;
  } catch (_) { return null; }
}

// Read per-civ acquired-tech-count (civ_base + 0x10). Binary's
// hostility-damping (line 6076) compares param_1's acqTechCount to
// local_14's — decrements leaderPers only when param_1 has FEWER
// techs. Capturing per-call lets the port replay this gate.
function readAllTechCounts(base) {
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const out = [];
    for (let c = 0; c < 8; c++) {
      out.push(base.add(CIV_BASE - 0x00400000 + c * STRIDE + 0x10).readU8());
    }
    return out;
  } catch (_) { return null; }
}

// Read the per-leader expansion byte from DAT_006554FA. This is the
// authoritative "leaderPers" value used by binary's FUN_004bdb2c line
// 6071: local_38 = (char)DAT_006554fa[styleLeader * 0x30].
// v3 uses LEADER_PERSONALITY[rulesCivNumber][0] which may or may not
// match depending on table origin.
function readLeaderPersonalityByte(base, styleLeader) {
  if (styleLeader < 0 || styleLeader > 20) return null;
  try {
    return base.add(LEADER_PERS_BASE - 0x00400000 + styleLeader * 0x30).readS8();
  } catch (_) { return null; }
}

// Read per-civ continent-presence bitmap. For each of civs 0..7, reads
// 0x40 bytes at civ_base + 0x2AE (the range binary's continent loop
// iterates 1..0x3F). Returns array of 8 byte-arrays, each 0x40 long.
// Used to reproduce the continent-check naval/hostility logic exactly.
function readContinentPresence(base) {
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    const out = [];
    for (let c = 0; c < 8; c++) {
      const addr = base.add(CIV_BASE - 0x00400000 + c * STRIDE + 0x292);
      // Read as hex string to keep payload small (128 chars vs an 80-el array)
      const bytes = addr.readByteArray(0x40);
      const u8 = new Uint8Array(bytes);
      let hex = '';
      for (let i = 0; i < u8.length; i++) hex += u8[i].toString(16).padStart(2, '0');
      out.push(hex);
    }
    return out;
  } catch (_) { return null; }
}

// Read per-civ styleLeader byte (+0x6 in civ struct).
function readStyleLeader(base, civSlot) {
  if (civSlot < 0 || civSlot > 7) return null;
  try {
    const CIV_BASE = 0x0064C6A0;
    const STRIDE = 0x594;
    return base.add(CIV_BASE - 0x00400000 + civSlot * STRIDE + 0x06).readS16();
  } catch (_) { return null; }
}

// Read per-tech bytes from the tech table at DAT_00627684, stride 0x10.
// The full 100-entry table is too large for Frida's send() to carry
// reliably as a nested object, so we read the SPECIFIC techId's row on
// each call — small payload, perfect correlation with the call.
function readTechBytes(base, techId) {
  if (techId < 0 || techId >= 100) return null;
  try {
    // Tech table entry layout (stride 0x10) per Ghidra decompilation:
    //   +0x0..3: name pointer (string addr)
    //   +0x4..5: ? (maybe i16 or reserved)
    //   +0x6: byte_A — additive in base formula (DAT_0062768a)
    //   +0x7: byte_B — multiplier with leaderPers (DAT_0062768b)
    //   +0x8..9: ? (maybe costBase / icon index)
    //   +0xA: prereq1 (DAT_0062768e per ADVANCE_PREREQS[tech][0])
    //   +0xB: prereq2 (DAT_0062768f per ADVANCE_PREREQS[tech][1])
    //   +0xC..F: ? (possibly category / enabled byte DAT_00627689)
    // Previous offsets 0xA/0xB were MISREAD — they're prereqs, not
    // base-formula inputs.
    const row = base.add(0x00627684 - 0x00400000).add(techId * 0x10);
    return {
      b6: row.add(0x06).readS8(),   // byte_A (additive)
      b7: row.add(0x07).readS8(),   // byte_B (multiplier with leaderPers)
      b8: row.add(0x08).readS8(),
      b9: row.add(0x09).readS8(),
      bA: row.add(0x0A).readS8(),   // prereq1 (verify)
      bB: row.add(0x0B).readS8(),   // prereq2 (verify)
      bC: row.add(0x0C).readS8(),
      bD: row.add(0x0D).readS8(),
      bE: row.add(0x0E).readS8(),
      bF: row.add(0x0F).readS8(),
    };
  } catch (_) { return null; }
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
        // Read globals FUN_004bdb2c depends on (strategic goal,
        // free-tech goal, scenario flags, alive mask). Without these
        // the v3 port can't reproduce binary's scoring.
        if (entry.captureTechValGlobals) {
          msg.tvGlobals = readTechValueGlobals(base);
          // Per-call tech-row bytes and leader personality. Also
          // continent-presence bitmap for all 8 civs (small hex-encoded
          // payload). Lets the v3 validator reproduce binary's
          // continent-iteration logic exactly.
          if (msg.named && msg.named.techId != null) {
            msg.techBytes = readTechBytes(base, msg.named.techId);
            // Byte at DAT_00655B82[techId] — if 0, nobody knows this
            // tech → binary's +1 noOneHas bonus fires.
            msg.knowsTechByte = readKnowsTechByte(base, msg.named.techId);
          }
          // Full 100-byte DAT_00655B82 so the prereq-penalty block
          // (line 6424-6430) can check each CHILD tech's bitmask
          // byte-exact, not just the tech being scored.
          msg.knowsTechBytes = readAllKnowsTechBytes(base);
          if (msg.named && msg.named.civSlot != null) {
            const styleLeader = readStyleLeader(base, msg.named.civSlot);
            msg.styleLeader = styleLeader;
            if (styleLeader != null) {
              msg.leaderPersByte = readLeaderPersonalityByte(base, styleLeader);
            }
            // Diplomatic bytes controlling hostility-damping at 6072-6088.
            msg.diploBytes = readDiploBytes(base, msg.named.civSlot);
          }
          msg.continents = readContinentPresence(base);
          msg.acqTechCounts = readAllTechCounts(base);
        }
        // FUN_0055c277 globals: Fundamentalism-enabled flag + per-civ
        // known-tech bitmask (for the 5 govt prereq techs).
        if (entry.captureCanUseGovtGlobals) {
          msg.govtGlobals = readCanUseGovtGlobals(base);
          msg.knowsTechBytes = readAllKnowsTechBytes(base);
        }
        // FUN_004c2788 globals: per-civ acqTechCount + futureTechCount
        // for both civ and leader, plus difficulty/cosmic/scenario bits.
        if (entry.captureResearchCostGlobals && msg.named && msg.named.civSlot != null) {
          msg.researchCostGlobals = readResearchCostGlobals(base, msg.named.civSlot);
        }
        // FUN_00498e8b — AI city production pick. Capture city owner +
        // current production for routing.
        if (entry.captureProductionPickGlobals && msg.named && msg.named.cityIdx != null) {
          msg.productionPickGlobals = readProductionPickGlobals(base, msg.named.cityIdx);
        }
        // FUN_00538a29 — AI unit action. Read active unit index at
        // entry; will read full unit state at exit (in onLeave).
        if (entry.captureUnitActionGlobals) {
          this._unitActionIdx = readActiveUnitIdx(base);
          msg.activeUnitIdx = this._unitActionIdx;
        }
        // civ_turn_driver entry: stash civSlot for the onLeave handler
        // (we need it after the binary call to read its unit roster).
        if (entry.captureUnitRoster && msg.named?.civSlot != null) {
          this._unitRosterCiv = msg.named.civSlot;
        }
        // FUN_004bd2a3 globals: civ rates + per-city food/flags.
        if (entry.captureFoodStrategyGlobals && msg.named && msg.named.civSlot != null) {
          msg.foodStrategyGlobals = readFoodStrategyGlobals(base, msg.named.civSlot);
        }
        // FUN_0055f5a3 globals: full context for the decision. Also
        // save civSlot for the onLeave handler so it can read the
        // post-call civ+0x15 and report which govt was chosen.
        if (entry.captureChooseGovtGlobals && msg.named && msg.named.civSlot != null) {
          msg.chooseGovtGlobals = readChooseGovtGlobals(base, msg.named.civSlot);
          msg.knowsTechBytes = readAllKnowsTechBytes(base);  // for canUseGovt internal check
          msg.govtGlobals = readCanUseGovtGlobals(base);     // Fundamentalism flag
          this._civSlotForGovtExit = msg.named.civSlot;
          this._govtEntryVal = msg.chooseGovtGlobals?.civGovt;
        }
        // captureCityState: per-function step-diff. At entry, snapshot
        // the city struct (88 bytes hex) for the cityIdx arg. At exit,
        // snapshot it again. v3's per-city-tick equivalent runs on the
        // captured input; we compare byte-by-byte to the captured output.
        // Pinpoints which city function diverges (food vs shield vs
        // happiness vs upkeep) instead of seeing only the cumulative
        // end-of-turn delta.
        if (entry.captureCityState && msg.named && msg.named.cityIdx != null) {
          msg.state_in = readCityState(base, msg.named.cityIdx);
          this._cityIdxForExit = msg.named.cityIdx;
        }
        // ai_research_pick: capture the full per-tech "who-knows"
        // array plus per-civ scoring globals so the port's internal
        // calcTechValue loop has byte-exact inputs for every
        // candidate tech (not just the one being scored).
        if (entry.captureResearchPickGlobals) {
          msg.tvGlobals = readTechValueGlobals(base);
          msg.knowsTechBytes = readAllKnowsTechBytes(base);
          msg.continents = readContinentPresence(base);
          msg.acqTechCounts = readAllTechCounts(base);
          if (msg.named && msg.named.civSlot != null) {
            const styleLeader = readStyleLeader(base, msg.named.civSlot);
            msg.styleLeader = styleLeader;
            if (styleLeader != null) {
              msg.leaderPersByte = readLeaderPersonalityByte(base, styleLeader);
            }
            msg.diploBytes = readDiploBytes(base, msg.named.civSlot);
          }
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
        const needGovtExit = this._traceEntry.captureChooseGovtGlobals;
        const needRoster = this._traceEntry.captureUnitRoster;
        const needUnitAction = this._traceEntry.captureUnitActionGlobals;
        const needCityState = this._traceEntry.captureCityState;
        if (!needRet && !needRand && !needGovtExit && !needRoster && !needUnitAction && !needCityState) return;
        const out = {
          kind: 'return',
          fn: this._traceEntry.name,
          dur_ms: Date.now() - this._enter_ms,
          time_ms: Date.now(),
        };
        if (needRet) out.retval = readArg(retval);
        if (needRand) out.rand_exit = readHoldrand(base);
        if (needGovtExit && this._civSlotForGovtExit != null) {
          const afterGovt = readCivGovt(base, this._civSlotForGovtExit);
          // Binary signal: if govt changed during the call, that's the
          // chosen index. If unchanged, the function's gate condition
          // failed and no switch happened (treat as retval=-1).
          out.govtChosen = (afterGovt !== this._govtEntryVal) ? afterGovt : -1;
          out.govtEntryVal = this._govtEntryVal;
        }
        // FUN_00538a29 unit-action exit: read the unit's final state
        // so --replay-frida can apply it to v3.
        if (this._traceEntry.captureUnitActionGlobals && this._unitActionIdx != null) {
          out.unitIdx = this._unitActionIdx;
          out.unitState = readUnitState(base, this._unitActionIdx);
        }
        // captureCityState exit: snapshot city struct after function ran.
        // Pair with state_in to get input/output for v3 step-diff.
        if (this._traceEntry.captureCityState && this._cityIdxForExit != null) {
          out.cityIdx = this._cityIdxForExit;
          out.state_out = readCityState(base, this._cityIdxForExit);
        }
        // civ_turn_driver exit: capture authoritative roster of slots
        // owned by this civ. --replay-frida uses this set to delete
        // v3-only phantoms (slots v3 owns that binary doesn't).
        if (this._traceEntry.captureUnitRoster && this._traceEntry.argNames?.[0] === 'civSlot') {
          // The civSlot was passed as arg0 — store it from onEnter
          out.civSlot = this._unitRosterCiv;
          out.unitRoster = readCivUnitRoster(base, this._unitRosterCiv);
        }
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

// SLIM_HOOKS mode: only attach the AI-port-validation hooks
// (ai_research_pick, ai_calc_tech_value). All other hooks — even
// non-hot ones — are skipped to minimize Frida's impact on Civ2's
// message pump, reducing crash risk. Set SLIM_HOOKS=1 when only
// running AI-port validation sessions.
const slimHooks = (function() {
  try { return typeof SLIM_HOOKS !== 'undefined' && !!SLIM_HOOKS; }
  catch (_) { return false; }
})();
const stepDiffHooks = (function() {
  try { return typeof STEP_DIFF_HOOKS !== 'undefined' && !!STEP_DIFF_HOOKS; }
  catch (_) { return false; }
})();

const SLIM_HOOK_NAMES = new Set([
  'ai_research_pick',
  'ai_calc_tech_value',
  'can_use_government',
  'choose_government',
  'fun_research_cost',
  'fun_food_strategy',
  'ai_city_production_pick',
  'ai_unit_action',
  // Plus bare minimum for session context (turn boundaries):
  'civ_turn_driver',
  'mgl_active_civ_on',
]);

// STEP_DIFF mode = SLIM + city-tick hooks with state_in/state_out
// capture. Used for per-function v3-vs-binary validation.
const STEP_DIFF_HOOK_NAMES = new Set([
  ...SLIM_HOOK_NAMES,
  'fun_city_food_tick',
  'fun_city_prod_tick',
  'fun_city_happiness',
  'fun_building_upkeep',
  'fun_city_turn_sync',
]);

let attachedCount = 0;
let skippedHot = 0;
let skippedSlim = 0;
let failedHooks = [];
if (base) {
  const all = TARGETS.concat(CRT);
  for (const t of all) {
    if (t.hot && !enableHot) { skippedHot++; continue; }
    // Filter precedence: step-diff superset includes slim. If neither
    // flag set, attach all (legacy "full" behavior).
    if (stepDiffHooks && !STEP_DIFF_HOOK_NAMES.has(t.name)) { skippedSlim++; continue; }
    else if (slimHooks && !stepDiffHooks && !SLIM_HOOK_NAMES.has(t.name)) { skippedSlim++; continue; }
    if (attachHook(t)) attachedCount++;
    else failedHooks.push(t.name);
  }
}

send({ kind: 'ready', hooked: attachedCount, total: TARGETS.length + CRT.length,
       skipped_hot: skippedHot, skipped_slim: skippedSlim,
       enableHot, slimHooks, stepDiffHooks, failed: failedHooks });

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
