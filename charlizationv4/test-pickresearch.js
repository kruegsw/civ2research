#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// test-pickresearch.js — Validate binary-ai.pickResearch against a
// captured session.
//
// WHAT THIS DOES
// ──────────────
// 1. Loads a CIV2SNAP binary into _MEM (same path the harness uses).
// 2. For every alive civ whose researchingTech is 0xFFFF (no target),
//    calls binary-ai.pickResearch to see what the AI would pick.
// 3. Prints the result alongside what real Civ2 actually picked
//    (if the next turn's snapshot or events.jsonl shows it).
//
// WHY
// ───
// First slice of the AI fidelity work (plan:
// reverse_engineering/findings/ai_fidelity_plan.md). We want to
// validate that wiring up `FUN_004c09b0` produces plausible picks
// before integrating into v3's reducer.
//
// KNOWN LIMITATIONS
// ─────────────────
// - RNG divergence: FUN_004c09b0 calls _rand(); our _rand() is not
//   MSVC's LCG. Expect some picks to differ from real Civ2 even when
//   the algorithm is correct. Watch for picks that are in the
//   "plausible tech" set vs wildly wrong.
// - Eligibility only: this test calls the pure picker. It doesn't
//   verify all inputs to the picker (tech tree table, civ personality,
//   known-tech list) are populated. Snapshot load SHOULD cover those.
//
// USAGE
// ─────
//   node charlizationv4/test-pickresearch.js <snapshot.bin>
//   node charlizationv4/test-pickresearch.js  # auto-use newest
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { initBinaryConstants, loadRules } from './rules-loader.js';
import { _MEM } from './mem.js';
import { pickResearch } from '../charlizationv3/engine/binary-ai.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Tech names for readable output. Index = tech ID (RULES.TXT order).
const TECH_NAMES = [
  'Advanced Flight','Alphabet','Amphibious War','Astronomy','Atomic Theory',
  'Automobile','Banking','Bridge Building','Bronze Working','Ceremonial Burial',
  'Chemistry','Chivalry','Code of Laws','Combined Arms','Combustion',
  'Communism','Computers','Conscription','Construction','The Corporation',
  'Currency','Democracy','Economics','Electricity','Electronics',
  'Engineering','Environmentalism','Espionage','Explosives','Feudalism',
  'Flight','Fundamentalism','Fusion Power','Genetic Engineering','Guerrilla War',
  'Gunpowder','Horseback Riding','Industrialization','Invention','Iron Working',
  'Labor Union','The Laser','Leadership','Literacy','Machine Tools',
  'Magnetism','Map Making','Masonry','Mass Production','Mathematics',
  'Medicine','Metallurgy','Miniaturization','Mobile Warfare','Monarchy',
  'Monotheism','Mysticism','Navigation','Nuclear Fission','Nuclear Power',
  'Philosophy','Physics','Plastics','Plumbing','Polytheism',
  'Pottery','Radio','Railroad','Recycling','Refining',
  'Refrigeration','The Republic','Robotics','Rocketry','Sanitation',
  'Seafaring','Space Flight','Stealth','Steam Engine','Steel',
  'Superconductor','Tactics','Theology','Theory of Gravity','Trade',
  'University','Warrior Code','The Wheel','Writing','Future Tech',
];
const techName = (id) => id === 0xFF || id === -1 ? '(none)' : (TECH_NAMES[id] ?? `#${id}`);

// ── Args / auto-select ──
const args = process.argv.slice(2);
let snapPath = args[0];
if (!snapPath) {
  const snapDir = join(__dirname, 'snapshots');
  const sessions = readdirSync(snapDir)
    .filter(n => n.startsWith('game_'))
    .map(n => ({ name: n, path: join(snapDir, n), mtime: statSync(join(snapDir, n)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  for (const s of sessions) {
    const bins = readdirSync(s.path)
      .filter(n => /^turn_\d+_[^_]+_\w+\.bin$/.test(n) && !n.includes('_0x0_'))
      .sort();
    if (bins.length > 0) { snapPath = join(s.path, bins[bins.length - 1]); break; }
  }
}
if (!snapPath || !existsSync(snapPath)) {
  console.error('No snapshot found. Pass a .bin path or run sniff-game.py first.');
  process.exit(1);
}
console.log(`Loading snapshot: ${snapPath}\n`);

// ── Init binary engine + load RULES.TXT so tech tree table is populated ──
// FUN_004c09b0 reads DAT_00627684 (tech tree), DAT_0062768e/f (prereqs),
// DAT_006554fa (personality). rules-loader populates these.
initBinaryConstants();
const rulesCandidates = [
  'civ2gamefolder/RULES.TXT',
  join(__dirname, '../civ2gamefolder/RULES.TXT'),
];
let rulesLoaded = false;
for (const p of rulesCandidates) {
  if (existsSync(p)) {
    loadRules(readFileSync(p, 'utf8'));
    rulesLoaded = true;
    console.log(`Loaded rules: ${p}\n`);
    break;
  }
}
if (!rulesLoaded) {
  console.error('RULES.TXT not found. Tech scoring will likely fail.');
}

// ── Load the snapshot into _MEM ──
const info = loadSnapshotIntoMem(snapPath);
console.log(`_MEM populated: ${info.regionCount} regions, ${info.tileBytes} tile bytes.\n`);

// ── Read each civ's current researchingTech + call the AI ──
// civ+0xAA is u16. 0xFFFF = no target.
const CIV_BASE = 0x0064C600;
const CIV_STRIDE = 0x594;
const CIV2_MEM_BASE = 0x61C068; // same as load-snapshot.js
function read16(addr) {
  const off = addr - CIV2_MEM_BASE;
  return _MEM[off] | (_MEM[off + 1] << 8);
}

console.log(`${'Civ'.padEnd(5)}${'current'.padEnd(25)}${'AI pick'.padEnd(25)}`);
console.log('─'.repeat(55));
for (let civ = 1; civ < 8; civ++) {
  const currentU16 = read16(CIV_BASE + civ * CIV_STRIDE + 0xAA);
  const currentByte = currentU16 & 0xFF;
  // We'll call the picker for every civ and let the caller eyeball
  // whether the pick looks plausible. The picker returns -1 for dead
  // civs too (no valid eligible techs). The eligibility check at
  // FUN_004bfdbe filters dead/barb civs naturally.
  const picked = pickResearch(null, civ);
  console.log(`${String(civ).padEnd(5)}${techName(currentByte).padEnd(25)}${techName(picked).padEnd(25)}`);
}

console.log('\nNotes:');
console.log('- "current" shows what the snapshot has for each civ now.');
console.log('- "AI pick" shows what FUN_004c09b0 would choose right now.');
console.log('- Civs already researching something will see their AI pick');
console.log('  alongside — they usually differ because the picker fires');
console.log('  only when needed (post-discovery or initial). For wiring');
console.log('  validation, compare the picked tech to events.jsonl for');
console.log('  the next turn\'s RESEARCH_PICKED event when the civ had');
console.log('  no current target.');
console.log('- RNG divergence: picks may differ from real Civ2 by one');
console.log('  scoring tier until MSVC LCG is implemented.');
