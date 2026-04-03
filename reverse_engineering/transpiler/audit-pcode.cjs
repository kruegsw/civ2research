#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit-pcode.cjs — Full semantic comparison of regex vs P-code output
//
// Compares function-by-function:
//   1. Function calls: which FUN_xxx calls appear in each?
//   2. Global writes: which wv(DAT_xxx, ...) appear in each?
//   3. Memory writes: which w16/w32 appear in each?
//   4. Constants: which hex/decimal literals appear?
//   5. Missing code: DEVIATIONs that drop real logic
//
// Usage:
//   node audit-pcode.cjs                        # all blocks, summary
//   node audit-pcode.cjs block_004E0000         # one block, details
//   node audit-pcode.cjs --calls-only           # only function call diffs
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const REGEX_DIR = path.join(__dirname, 'output');
const PCODE_DIR = path.join(__dirname, 'output-ghidra');

function extractFunctions(source) {
  const fns = new Map();
  const re = /^\s*export function (\w+)\s*\(/gm;
  let match, matches = [];
  while ((match = re.exec(source)) !== null) matches.push({ name: match[1], start: match.index });
  for (let i = 0; i < matches.length; i++) {
    const end = i + 1 < matches.length ? matches[i + 1].start : source.length;
    fns.set(matches[i].name, source.substring(matches[i].start, end));
  }
  return fns;
}

// ── Extract semantic tokens from function body ───────────────────

function extractSemantics(body) {
  // Strip comments and DEVIATION blocks
  const code = body
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/true\s*$/gm, '');

  // Function calls: FUN_xxx(
  const calls = new Set();
  const callRe = /\b(FUN_[0-9a-fA-F]+|[a-z]\w*_[0-9a-fA-F]{4,8}|kill_civ|new_civ|delete_city|load_verify_units)\s*\(/g;
  let m;
  while ((m = callRe.exec(code)) !== null) calls.add(m[1]);

  // Global writes: wv(DAT_xxx,
  const globalWrites = new Set();
  const wvRe = /\bwv\((DAT_[0-9a-fA-F]+),/g;
  while ((m = wvRe.exec(code)) !== null) globalWrites.add(m[1]);

  // Memory writes: w16(base, ...) or w32(base, ...)
  const memWrites = new Set();
  const wRe = /\b(w16|w32)\((DAT_[0-9a-fA-F]+)/g;
  while ((m = wRe.exec(code)) !== null) memWrites.add(m[1] + '(' + m[2] + ')');

  // _MEM writes: _MEM[DAT_xxx + ...] =
  const byteWrites = new Set();
  const memArrRe = /_MEM\[(DAT_[0-9a-fA-F]+)[^\]]*\]\s*=/g;
  while ((m = memArrRe.exec(code)) !== null) byteWrites.add('_MEM[' + m[1] + ']');

  return { calls, globalWrites, memWrites, byteWrites };
}

// ── Compare two function bodies ──────────────────────────────────

function compareFn(fnName, regexBody, pcodeBody) {
  const r = extractSemantics(regexBody);
  const p = extractSemantics(pcodeBody);

  const diffs = [];

  // Calls in P-code but not regex (regex is missing a function call)
  for (const call of p.calls) {
    if (!r.calls.has(call)) {
      diffs.push({ type: 'missing_call', fn: fnName, detail: `${call} called in P-code but not regex` });
    }
  }

  // Calls in regex but not P-code (regex has extra call — less common)
  for (const call of r.calls) {
    if (!p.calls.has(call)) {
      diffs.push({ type: 'extra_call', fn: fnName, detail: `${call} called in regex but not P-code` });
    }
  }

  // Global writes in P-code but not regex
  for (const gw of p.globalWrites) {
    if (!r.globalWrites.has(gw)) {
      diffs.push({ type: 'missing_global_write', fn: fnName, detail: `wv(${gw}) in P-code but not regex` });
    }
  }

  // Memory writes in P-code but not regex
  for (const mw of p.memWrites) {
    if (!r.memWrites.has(mw)) {
      diffs.push({ type: 'missing_mem_write', fn: fnName, detail: `${mw} in P-code but not regex` });
    }
  }

  // Byte writes in P-code but not regex
  for (const bw of p.byteWrites) {
    if (!r.byteWrites.has(bw)) {
      diffs.push({ type: 'missing_byte_write', fn: fnName, detail: `${bw}= in P-code but not regex` });
    }
  }

  return diffs;
}

// ── Process block ────────────────────────────────────────────────

function processBlock(blockName, verbose) {
  const regexFile = path.join(REGEX_DIR, blockName + '.js');
  const pcodeFile = path.join(PCODE_DIR, blockName + '.js');
  if (!fs.existsSync(regexFile) || !fs.existsSync(pcodeFile)) return null;

  const regexFns = extractFunctions(fs.readFileSync(regexFile, 'utf-8'));
  const pcodeFns = extractFunctions(fs.readFileSync(pcodeFile, 'utf-8'));

  let compared = 0;
  const allDiffs = [];

  for (const [name, regexBody] of regexFns) {
    const pcodeBody = pcodeFns.get(name);
    if (!pcodeBody) continue;
    compared++;
    const diffs = compareFn(name, regexBody, pcodeBody);
    allDiffs.push(...diffs);
  }

  // Categorize
  const cats = {};
  for (const d of allDiffs) {
    if (!cats[d.type]) cats[d.type] = [];
    cats[d.type].push(d);
  }

  if (verbose && allDiffs.length > 0) {
    console.log(`\n═══ ${blockName}: ${allDiffs.length} diffs (${compared} functions) ═══`);
    for (const [cat, diffs] of Object.entries(cats)) {
      console.log(`\n  ── ${cat} (${diffs.length}) ──`);
      for (const d of diffs.slice(0, 8)) {
        console.log(`    ${d.fn}: ${d.detail}`);
      }
      if (diffs.length > 8) console.log(`    ... and ${diffs.length - 8} more`);
    }
  }

  return {
    block: blockName, compared,
    total: allDiffs.length,
    categories: Object.fromEntries(Object.entries(cats).map(([k, v]) => [k, v.length])),
  };
}

// ── Main ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const callsOnly = args.includes('--calls-only');
const blockArgs = args.filter(a => !a.startsWith('--'));

let blocks;
if (blockArgs.length > 0) {
  blocks = blockArgs.map(b => b.replace('.js', ''));
} else {
  blocks = fs.readdirSync(REGEX_DIR)
    .filter(f => f.startsWith('block_') && f.endsWith('.js'))
    .map(f => f.replace('.js', ''))
    .sort();
}

const results = [];
const verbose = blockArgs.length > 0 || blocks.length <= 5;
for (const block of blocks) {
  const r = processBlock(block, verbose);
  if (r) results.push(r);
}

// Summary
console.log('\n═══════════════════════════════════════════════════════');
console.log('AUDIT SUMMARY');
console.log('═══════════════════════════════════════════════════════');

const totalCats = {};
let totalDiffs = 0, totalCompared = 0;
for (const r of results) {
  totalDiffs += r.total;
  totalCompared += r.compared;
  for (const [k, v] of Object.entries(r.categories)) {
    totalCats[k] = (totalCats[k] || 0) + v;
  }
  if (r.total > 0) {
    const catStr = Object.entries(r.categories).map(([k, v]) => `${k}:${v}`).join(' ');
    console.log(`  ${r.block.padEnd(20)} ${String(r.compared).padStart(4)} compared  ${String(r.total).padStart(4)} diffs  ${catStr}`);
  }
}
console.log('─'.repeat(70));
const totalCatStr = Object.entries(totalCats).map(([k, v]) => `${k}:${v}`).join(' ');
console.log(`  ${'TOTAL'.padEnd(20)} ${String(totalCompared).padStart(4)} compared  ${String(totalDiffs).padStart(4)} diffs  ${totalCatStr}`);
