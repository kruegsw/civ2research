// Per-round combat trace for v3-vs-binary diff.
//
// Path B follow-up to the off-by-N investigation. After Path A landed
// atkMovesLeft threading (91/101 → 96/101), idx 80 remains a singleton
// residual with full Frida context: both v3 and binary should compute
// identical effAtk=16/effDef=54, yet draws differ (23 vs 27 → 11 vs 13
// rounds). The discrepancy must originate inside the round loop.
//
// This tool dumps v3's per-round trace for any combat in a session.
// Output format mirrors what a future Frida per-rand hook would emit,
// so a side-by-side diff lights up the exact round where binary and v3
// diverge.
//
// Usage: node trace-combat-rounds.mjs <session-dir> --idx=N
//        node trace-combat-rounds.mjs <session-dir> --idx=80 --eff=16,54
//          (override effective values to test hypotheses)

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { UNIT_HP, UNIT_ATK, UNIT_DEF, UNIT_FP, UNIT_MOVE_POINTS,
         MOVEMENT_MULTIPLIER, DIFFICULTY_KEYS } from '../charlizationv3/engine/defs.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node trace-combat-rounds.mjs <session-dir> --idx=N [--eff=A,D]');
  process.exit(1);
}
const idxArg = process.argv.find(s => s.startsWith('--idx='));
const idx = idxArg ? parseInt(idxArg.slice(6), 10) : 80;
const effArg = process.argv.find(s => s.startsWith('--eff='));
const effOverride = effArg
  ? effArg.slice(6).split(',').map(n => parseInt(n, 10))
  : null;

// ── LCG ────────────────────────────────────────────────────────────

const A = 0x343FD;
const C = 0x269EC3;
function makeLcg(seed) {
  let s = seed >>> 0;
  return {
    rand: () => { s = (Math.imul(s, A) + C) >>> 0; return (s >>> 16) & 0x7FFF; },
    state: () => s,
  };
}

// ── Trace parsing ──────────────────────────────────────────────────

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

const combatPairs = [];
let pendingCall = null;
for (const e of trace) {
  if (e.fn !== 'fun_combat_resolve') continue;
  if (e.kind === 'call') pendingCall = e;
  else if (e.kind === 'return' && pendingCall) {
    if (pendingCall.rand_enter !== e.rand_exit) {
      combatPairs.push({
        attackerSlot: pendingCall.args[0],
        direction: pendingCall.args[1],
        rand_enter: pendingCall.rand_enter,
        rand_exit: e.rand_exit,
        retval: e.retval,
        combatContext: pendingCall.combatContext || null,
        // captureRandSequence (post-2026-04-28): per-rand sequence +
        // calc_atk/def_strength returns captured during this combat.
        randSequence: e.randSequence || null,
        effSequence: e.effSequence || null,
      });
    }
    pendingCall = null;
  }
}

const combat = combatPairs[idx];
if (!combat) {
  console.error(`No resolved combat at idx ${idx} (max ${combatPairs.length - 1})`);
  process.exit(1);
}

// ── Extract attacker/defender from combatContext ────────────────────
// We don't repeat the full validator's fortify/walls/terrain inference
// here — the caller is expected to pass --eff=A,D when investigating.
// Without --eff, we use v3's resolveCombat baseline (run separately).

const cc = combat.combatContext;
if (!cc?.attacker) {
  console.error(`Combat ${idx} has no captureCombatContext (pre-Frida-hook session?)`);
  process.exit(1);
}
const att = cc.attacker;
const dirDeltas = [
  [ 1, -1], [ 2,  0], [ 1,  1], [ 0,  2],
  [-1,  1], [-2,  0], [-1, -1], [ 0, -2],
];
const delta = dirDeltas[combat.direction];
const tx = att.x + delta[0], ty = att.y + delta[1];
// Match v3's calcStackBestDefender scoring: pick highest (def × hp).
// Equal-score tiebreak: later-iterated unit wins (>= tiebreaker).
let def = null, bestScore = -1;
for (const n of (cc.neighbors || [])) {
  if (n.x !== tx || n.y !== ty || n.owner === att.owner) continue;
  const maxHp = (UNIT_HP[n.type] || 1) * 10;
  const hp = maxHp - n.hp;
  if (hp <= 0) continue;
  // Approximate scoring: def_base × hp (validator passes type, terrain,
  // fortify into calcUnitDefenseStrength but for tie-break direction
  // the relative ordering is the same as raw def × hp here).
  const score = (UNIT_DEF[n.type] || 1) * hp;
  if (score >= bestScore) { def = n; bestScore = score; }
}
if (!def) {
  console.error(`Combat ${idx} has no defender in combatContext at (${tx},${ty})`);
  process.exit(1);
}

const atkType = att.type, defType = def.type;
const atkMaxHp = (UNIT_HP[atkType] || 1) * 10;
const defMaxHp = (UNIT_HP[defType] || 1) * 10;
const atkFp = UNIT_FP[atkType] || 1;
const defFp = UNIT_FP[defType] || 1;
const atkHp0 = atkMaxHp - att.hp;  // hp field is damageTaken
const defHp0 = defMaxHp - def.hp;

console.log(`# combat idx=${idx}`);
console.log(`#   attacker: t${atkType} (atk=${UNIT_ATK[atkType]} fp=${atkFp} hp=${atkHp0}/${atkMaxHp}) at (${att.x},${att.y})`);
console.log(`#   defender: t${defType} (def=${UNIT_DEF[defType]} fp=${defFp} hp=${defHp0}/${defMaxHp}) at (${def.x},${def.y})`);
console.log(`#   rand_enter=0x${(combat.rand_enter >>> 0).toString(16).padStart(8, '0')}`);
console.log(`#   rand_exit (binary)=0x${(combat.rand_exit >>> 0).toString(16).padStart(8, '0')}`);
console.log('');

// ── Round-by-round simulation ──────────────────────────────────────

function runRounds(effAtk, effDef, label) {
  const lcg = makeLcg(combat.rand_enter);
  let atkHp = atkHp0, defHp = defHp0;
  let rounds = 0, draws = 0;
  console.log(`──── ${label}: effAtk=${effAtk} effDef=${effDef} ────`);
  console.log('rd | atkRoll/effAtk | defRoll/effDef | hit | atkHp defHp | state_after');
  while (atkHp > 0 && defHp > 0) {
    const atkRoll = effAtk > 1 ? lcg.rand() % effAtk : 0; draws++;
    const stateAfterAtk = lcg.state();
    const defRoll = effDef > 1 ? lcg.rand() % effDef : 0; draws++;
    const stateAfterDef = lcg.state();
    const atkHit = defRoll < atkRoll;
    if (atkHit) defHp -= atkFp; else atkHp -= defFp;
    rounds++;
    console.log(
      `${String(rounds).padStart(2)} | ${String(atkRoll).padStart(3)}/${String(effAtk).padEnd(3)}        | ` +
      `${String(defRoll).padStart(3)}/${String(effDef).padEnd(3)}        | ` +
      `${atkHit ? 'A' : 'D'}   | ${String(atkHp).padStart(5)} ${String(defHp).padStart(5)} | ` +
      `0x${stateAfterDef.toString(16).padStart(8, '0')}`
    );
  }
  // Promo roll
  const promoRoll = (effAtk + effDef > 0) ? lcg.rand() % (effAtk + effDef) : 0;
  draws++;
  console.log(`promo | roll=${promoRoll} (mod ${effAtk + effDef}) | final state=0x${lcg.state().toString(16).padStart(8, '0')}`);
  console.log(`# rounds=${rounds} draws=${draws} match=${lcg.state() === (combat.rand_exit >>> 0)}`);
  console.log('');
  return { rounds, draws, finalState: lcg.state() };
}

// ── Frida-captured sequences (post-2026-04-28 sessions) ────────────

if (combat.effSequence && combat.effSequence.length) {
  console.log('# binary FUN_0057e2c3/FUN_0057e33a calls during this combat:');
  for (const e of combat.effSequence) {
    if (e.fn === 'atk') {
      console.log(`#   calc_atk_strength(unit=${e.unitIdx}) → ${e.val}`);
    } else {
      console.log(`#   calc_def_strength(unit=${e.unitIdx}, flag=${e.flag}, atkIdx=${e.atkIdx}) → ${e.val}`);
    }
  }
  console.log('');
}

if (combat.randSequence && combat.randSequence.length) {
  console.log(`# binary _rand sequence (${combat.randSequence.length} calls):`);
  for (let i = 0; i < combat.randSequence.length; i++) {
    const r = combat.randSequence[i];
    console.log(`#   [${String(i).padStart(2)}] val=${String(r.val).padStart(5)}  state_after=0x${(r.state >>> 0).toString(16).padStart(8, '0')}`);
  }
  console.log('');
}

// Default: run with --eff=A,D if provided, else baseline 16/54 (idx 80
// canonical values; for other combats use validate-combat-rng.mjs's
// outEff to find the baseline).
if (effOverride) {
  runRounds(effOverride[0], effOverride[1], 'override');
} else {
  console.log('# No --eff override given; defaulting to v3 baseline 16/54 (idx 80).');
  console.log('# Run validate-combat-rng.mjs --verbose first to read v3\'s effAtk/effDef.');
  console.log('');
  runRounds(16, 54, 'v3 baseline');
}
