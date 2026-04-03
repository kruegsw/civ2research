#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// verify-types.cjs — Compare regex transpiler output against P-code
//                    transpiler output to find type divergences.
//
// The regex transpiler (transpile.cjs) handles structure (gotos,
// switch/case, arrays) but guesses types from C text.
// The P-code transpiler (export-js.py) has authoritative types from
// Ghidra but can't handle gotos/switch/arrays.
//
// This script extracts typed expressions from both outputs,
// normalizes them, and reports divergences by category.
//
// Usage:
//   node verify-types.cjs                    # all blocks
//   node verify-types.cjs block_004E0000     # one block
//   node verify-types.cjs --summary          # counts only
//
// Output: divergence report to stdout
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const REGEX_DIR = path.join(__dirname, 'output');
const PCODE_DIR = path.join(__dirname, 'output-ghidra');

// ── Extract functions from a file ────────────────────────────────

function extractFunctions(source) {
  const fns = new Map(); // name → { body, lines }
  const re = /^\s*export function (FUN_[0-9a-fA-F]+)\s*\(/gm;
  let match;
  const matches = [];

  while ((match = re.exec(source)) !== null) {
    matches.push({ name: match[1], start: match.index });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].start;
    const end = i + 1 < matches.length ? matches[i + 1].start : source.length;
    const body = source.substring(start, end);
    fns.set(matches[i].name, body);
  }

  return fns;
}

// ── Extract typed expressions from function body ─────────────────
// These are the expressions where type matters:
// - Memory reads: s8(), u8(), s16(), u16(), s32(), u32(), _MEM[]
// - Memory writes: w16(), w32()
// - Integer division: / ... | 0
// - Global reads: v(DAT_xxx), DAT_xxx (bare)
// - Comparisons with literals (negative numbers)

function extractTypedOps(body) {
  const ops = [];

  // Memory reads: s8(...), u8(...), s16(...), s32(...), _MEM[...]
  const memReadRe = /\b(s8|u8|s16|u16|s32|u32)\s*\(([^)]*(?:\([^)]*\)[^)]*)*)\)/g;
  let m;
  while ((m = memReadRe.exec(body)) !== null) {
    ops.push({ type: 'mem_read', helper: m[1], arg: m[2].trim(), raw: m[0], pos: m.index });
  }

  // _MEM[expr] reads
  const memArrRe = /_MEM\[([^\]]+)\]/g;
  while ((m = memArrRe.exec(body)) !== null) {
    ops.push({ type: 'mem_byte', arg: m[1].trim(), raw: m[0], pos: m.index });
  }

  // Memory writes: w16(...), w32(...)
  const memWriteRe = /\b(w16|w32)\s*\(([^)]*(?:\([^)]*\)[^)]*)*)\)/g;
  while ((m = memWriteRe.exec(body)) !== null) {
    ops.push({ type: 'mem_write', helper: m[1], arg: m[2].trim(), raw: m[0], pos: m.index });
  }

  // Integer division: expr / expr | 0
  const divRe = /\/ [^|]*\| 0\)/g;
  while ((m = divRe.exec(body)) !== null) {
    ops.push({ type: 'int_div', raw: m[0], pos: m.index });
  }

  // Bare division without | 0 (potential missing truncation)
  // Match: identifier_or_number / identifier_or_number NOT followed by | 0
  const bareDivRe = /\b(\w+)\s*\/\s*(\w+)\b(?!\s*\|)/g;
  while ((m = bareDivRe.exec(body)) !== null) {
    // Skip if inside a comment
    const before = body.substring(Math.max(0, m.index - 2), m.index);
    if (before.includes('//') || before.includes('/*')) continue;
    // Skip if the enclosing expression already has | 0 (nested division in a truncated outer)
    // Look ahead up to 200 chars for "| 0)" pattern on the same line
    const lineEnd = body.indexOf('\n', m.index);
    const rest = body.substring(m.index, lineEnd > 0 ? lineEnd : m.index + 200);
    if (/\| 0\)/.test(rest)) continue;
    ops.push({ type: 'bare_div', left: m[1], right: m[2], raw: m[0], pos: m.index });
  }

  // Global value reads: v(DAT_xxx)
  const vReadRe = /\bv\((DAT_[0-9a-fA-F]+)\)/g;
  while ((m = vReadRe.exec(body)) !== null) {
    ops.push({ type: 'global_read', dat: m[1], raw: m[0], pos: m.index });
  }

  // Global value writes: wv(DAT_xxx, ...)
  const wvRe = /\bwv\((DAT_[0-9a-fA-F]+),/g;
  while ((m = wvRe.exec(body)) !== null) {
    ops.push({ type: 'global_write', dat: m[1], raw: m[0], pos: m.index });
  }

  return ops;
}

// ── Normalize an address expression for comparison ───────────────
// Strip whitespace differences, extra parens, v() wrapping

function normalizeAddr(expr) {
  return expr
    .replace(/\s+/g, '')
    .replace(/^\(+/, '').replace(/\)+$/, '')
    .replace(/^v\(/, '').replace(/\)$/, '');
}

// ── Compare typed ops between regex and P-code ───────────────────

function compareFunctions(regexBody, pcodeBody, fnName) {
  const regexOps = extractTypedOps(regexBody);
  const pcodeOps = extractTypedOps(pcodeBody);

  const divergences = [];

  // Build maps of memory reads by normalized address
  const regexReads = new Map(); // normalized addr → { helper, raw }
  const pcodeReads = new Map();

  for (const op of regexOps) {
    if (op.type === 'mem_read') {
      const key = normalizeAddr(op.arg);
      if (!regexReads.has(key)) regexReads.set(key, []);
      regexReads.get(key).push(op);
    }
  }
  for (const op of pcodeOps) {
    if (op.type === 'mem_read') {
      const key = normalizeAddr(op.arg);
      if (!pcodeReads.has(key)) pcodeReads.set(key, []);
      pcodeReads.get(key).push(op);
    }
  }

  // Compare memory reads: check for width/sign mismatches
  for (const [addr, regexList] of regexReads) {
    const pcodeList = pcodeReads.get(addr);
    if (!pcodeList) continue; // address not found in P-code — could be structural difference

    for (const ro of regexList) {
      for (const po of pcodeList) {
        if (ro.helper !== po.helper) {
          divergences.push({
            fn: fnName,
            category: getCategory(ro.helper, po.helper),
            regex: ro.raw,
            pcode: po.raw,
            addr,
          });
        }
      }
    }
  }

  // Check for _MEM[] in P-code where regex uses s32/s16 (wrong width)
  for (const po of pcodeOps) {
    if (po.type === 'mem_byte') {
      const key = normalizeAddr(po.arg);
      const regexList = regexReads.get(key);
      if (regexList) {
        for (const ro of regexList) {
          if (ro.helper !== 'u8' && ro.helper !== 's8') {
            divergences.push({
              fn: fnName,
              category: 'width',
              regex: ro.raw,
              pcode: po.raw,
              detail: `Regex uses ${ro.helper} but P-code reads byte`,
            });
          }
        }
      }
    }
  }

  // Check for bare divisions in regex that P-code has with | 0
  const regexBareDivs = regexOps.filter(o => o.type === 'bare_div');
  const pcodeIntDivs = pcodeOps.filter(o => o.type === 'int_div');
  if (regexBareDivs.length > 0 && pcodeIntDivs.length > 0) {
    for (const rd of regexBareDivs) {
      divergences.push({
        fn: fnName,
        category: 'division',
        regex: rd.raw,
        pcode: '(has | 0)',
        detail: `Regex division without | 0 truncation`,
      });
    }
  }

  return divergences;
}

function getCategory(regexHelper, pcodeHelper) {
  const widthMap = { s8: 1, u8: 1, s16: 2, u16: 2, s32: 4, u32: 4 };
  const rw = widthMap[regexHelper] || 0;
  const pw = widthMap[pcodeHelper] || 0;

  if (rw !== pw) return 'width';

  const rSigned = regexHelper[0] === 's';
  const pSigned = pcodeHelper[0] === 's';
  if (rSigned !== pSigned) return 'sign';

  return 'other';
}

// ── Process a block ──────────────────────────────────────────────

function processBlock(blockName, summaryOnly) {
  const regexFile = path.join(REGEX_DIR, blockName + '.js');
  const pcodeFile = path.join(PCODE_DIR, blockName + '.js');

  if (!fs.existsSync(regexFile)) {
    console.error(`Missing regex output: ${regexFile}`);
    return null;
  }
  if (!fs.existsSync(pcodeFile)) {
    console.error(`Missing P-code output: ${pcodeFile}`);
    return null;
  }

  const regexSource = fs.readFileSync(regexFile, 'utf-8');
  const pcodeSource = fs.readFileSync(pcodeFile, 'utf-8');

  const regexFns = extractFunctions(regexSource);
  const pcodeFns = extractFunctions(pcodeSource);

  const allDivergences = [];
  let compared = 0;

  for (const [name, regexBody] of regexFns) {
    const pcodeBody = pcodeFns.get(name);
    if (!pcodeBody) continue; // function only in regex output (goto helpers, etc.)

    compared++;
    const divs = compareFunctions(regexBody, pcodeBody, name);
    allDivergences.push(...divs);
  }

  // Categorize
  const cats = {};
  for (const d of allDivergences) {
    if (!cats[d.category]) cats[d.category] = [];
    cats[d.category].push(d);
  }

  if (!summaryOnly) {
    if (allDivergences.length > 0) {
      console.log(`\n═══ ${blockName}: ${allDivergences.length} divergences (${compared} functions compared) ═══`);
      for (const [cat, divs] of Object.entries(cats)) {
        console.log(`\n  ── ${cat.toUpperCase()} (${divs.length}) ──`);
        // Show up to 10 per category
        for (const d of divs.slice(0, 10)) {
          console.log(`    ${d.fn}:`);
          console.log(`      regex: ${d.regex}`);
          console.log(`      pcode: ${d.pcode}`);
          if (d.detail) console.log(`      note:  ${d.detail}`);
        }
        if (divs.length > 10) {
          console.log(`    ... and ${divs.length - 10} more`);
        }
      }
    }
  }

  return {
    block: blockName,
    compared,
    total: allDivergences.length,
    categories: Object.fromEntries(Object.entries(cats).map(([k, v]) => [k, v.length])),
  };
}

// ── Main ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const summaryOnly = args.includes('--summary');
const blockArgs = args.filter(a => !a.startsWith('--'));

let blocks;
if (blockArgs.length > 0) {
  blocks = blockArgs.map(b => b.replace('.js', '').replace('.c', ''));
} else {
  blocks = fs.readdirSync(REGEX_DIR)
    .filter(f => f.startsWith('block_') && f.endsWith('.js'))
    .map(f => f.replace('.js', ''))
    .sort();
}

const results = [];
for (const block of blocks) {
  const r = processBlock(block, summaryOnly);
  if (r) results.push(r);
}

// Summary table
console.log('\n═══════════════════════════════════════════════════════');
console.log('SUMMARY');
console.log('═══════════════════════════════════════════════════════');
console.log(`${'Block'.padEnd(20)} ${'Compared'.padStart(8)} ${'Diverge'.padStart(8)}  Categories`);
console.log('─'.repeat(70));

let totalCompared = 0;
let totalDivergences = 0;
const totalCats = {};

for (const r of results) {
  totalCompared += r.compared;
  totalDivergences += r.total;
  const catStr = Object.entries(r.categories).map(([k, v]) => `${k}:${v}`).join(' ');
  if (r.total > 0 || !summaryOnly) {
    console.log(`${r.block.padEnd(20)} ${String(r.compared).padStart(8)} ${String(r.total).padStart(8)}  ${catStr}`);
  }
  for (const [k, v] of Object.entries(r.categories)) {
    totalCats[k] = (totalCats[k] || 0) + v;
  }
}

console.log('─'.repeat(70));
const totalCatStr = Object.entries(totalCats).map(([k, v]) => `${k}:${v}`).join(' ');
console.log(`${'TOTAL'.padEnd(20)} ${String(totalCompared).padStart(8)} ${String(totalDivergences).padStart(8)}  ${totalCatStr}`);
