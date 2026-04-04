#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit-pcode-lines.cjs — Line-by-line P-code vs regex comparison
//
// For each function that exists in BOTH P-code and regex output,
// compares the DAT_ access patterns on each line and reports
// specific mismatches with the exact fix needed.
//
// Focuses on game-logic blocks (004E, 004F, 0048, 0053, 0049, 005B)
// that handle city processing, production, combat, unit management.
//
// Usage: node audit-pcode-lines.cjs [block_004E0000]
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const PCODE_DIR = path.join(__dirname, 'output-ghidra');
const REGEX_DIR = path.join(__dirname, 'output');

const specificBlock = process.argv[2];

// Game-logic blocks — prioritize these
const PRIORITY_BLOCKS = [
  'block_004E0000', // city processing, production, yields
  'block_004F0000', // per-city turn processing
  'block_00480000', // turn pipeline, unit upkeep
  'block_00530000', // diplomacy, AI city decisions
  'block_00490000', // AI production, military
  'block_005B0000', // unit stack, movement, placement
  'block_00430000', // buildings, improvements, tech
  'block_00400000', // map utilities, tile access
  'block_00410000', // rules parser, init
  'block_00440000', // combat, unit orders
  'block_004A0000', // dialogs, map gen
  'block_004B0000', // tech, diplomacy AI
  'block_004C0000', // unit orders execution
  'block_00540000', // AI dispatch
  'block_00550000', // AI unit tactics
  'block_00560000', // AI strategy
];

// Extract DAT_ patterns from a single line
function linePatterns(line) {
  const pats = [];
  // v(DAT_xxx)
  for (const m of line.matchAll(/\bv\(\s*(DAT_[0-9a-fA-F]+)\s*\)/g))
    pats.push({ addr: m[1], access: 'v()', width: 4 });
  // wv(DAT_xxx, ...)
  for (const m of line.matchAll(/\bwv\(\s*(DAT_[0-9a-fA-F]+)/g))
    pats.push({ addr: m[1], access: 'wv()', width: 4 });
  // s8/u8(_MEM[DAT_xxx])
  for (const m of line.matchAll(/\b(s8|u8)\(\s*_MEM\[\s*(DAT_[0-9a-fA-F]+)\s*\]/g))
    pats.push({ addr: m[2], access: m[1]+'()', width: 1 });
  // s16/u16/s32/u32(DAT_xxx, ...)
  for (const m of line.matchAll(/\b(s16|u16|s32|u32)\(\s*(DAT_[0-9a-fA-F]+)\s*,/g))
    pats.push({ addr: m[2], access: m[1]+'()', width: parseInt(m[1].slice(1)) });
  // w16/w32(...DAT_xxx...)
  for (const m of line.matchAll(/\b(w16|w32)\(\s*(?:ptrAdd\(\s*)?(DAT_[0-9a-fA-F]+)/g))
    pats.push({ addr: m[2], access: m[1]+'()', width: parseInt(m[1].slice(1)) });
  // bare DAT_xxx (not inside any helper)
  for (const m of line.matchAll(/(?<!\w)\b(DAT_[0-9a-fA-F]+)\b/g)) {
    // Check it's not already captured
    const alreadyCaptured = pats.some(p => p.addr === m[1]);
    if (!alreadyCaptured) pats.push({ addr: m[1], access: 'bare', width: 0 });
  }
  return pats;
}

// Parse functions from source
function parseFunctions(source) {
  const funcs = new Map();
  const lines = source.split('\n');
  let currentFunc = null;
  let funcLines = [];
  for (const line of lines) {
    const fm = line.match(/^\s*export function (\w+)\s*\(/);
    if (fm) {
      if (currentFunc) funcs.set(currentFunc, funcLines);
      currentFunc = fm[1];
      funcLines = [];
    } else if (currentFunc) {
      funcLines.push(line);
    }
  }
  if (currentFunc) funcs.set(currentFunc, funcLines);
  return funcs;
}

// ── Main ──
const blocks = specificBlock ? [specificBlock] :
  PRIORITY_BLOCKS.filter(b => fs.existsSync(path.join(PCODE_DIR, b + '.js')));

let totalMismatches = 0;
const fixes = []; // { block, func, addr, pcode_access, regex_access, fix }

for (const block of blocks) {
  const pSrc = fs.readFileSync(path.join(PCODE_DIR, block + '.js'), 'utf8');
  const rSrc = fs.readFileSync(path.join(REGEX_DIR, block + '.js'), 'utf8');
  const pFuncs = parseFunctions(pSrc);
  const rFuncs = parseFunctions(rSrc);

  for (const [funcName, pLines] of pFuncs) {
    // Find in regex (might have address suffix)
    let rLines = rFuncs.get(funcName);
    if (!rLines) {
      for (const [rn, rl] of rFuncs) {
        if (rn.startsWith(funcName)) { rLines = rl; break; }
      }
    }
    if (!rLines) continue;

    // Build per-addr access summary for each
    const pAccess = new Map(); // addr → Set of access types
    const rAccess = new Map();
    for (const line of pLines) {
      for (const p of linePatterns(line)) {
        if (!pAccess.has(p.addr)) pAccess.set(p.addr, new Set());
        pAccess.get(p.addr).add(p.access);
      }
    }
    for (const line of rLines) {
      for (const p of linePatterns(line)) {
        if (!rAccess.has(p.addr)) rAccess.set(p.addr, new Set());
        rAccess.get(p.addr).add(p.access);
      }
    }

    // Compare
    for (const [addr, rSet] of rAccess) {
      const pSet = pAccess.get(addr);

      // Case 1: regex uses v() but P-code uses bare or s16/u8
      if (rSet.has('v()')) {
        if (!pSet) {
          // P-code doesn't access this at all → spurious v()
          fixes.push({ block, func: funcName, addr,
            pcode: '(not accessed)', regex: 'v()',
            fix: 'Remove v() — address-of or unused',
            severity: 'HIGH' });
          totalMismatches++;
        } else if (!pSet.has('v()') && !pSet.has('wv()')) {
          // P-code accesses but not as v()/wv() → different width
          const pTypes = [...pSet].join(',');
          if (pSet.has('s16()') || pSet.has('u16()')) {
            fixes.push({ block, func: funcName, addr,
              pcode: pTypes, regex: 'v()',
              fix: 'Change v() → s16(addr, 0)',
              severity: 'HIGH' });
          } else if (pSet.has('s8()') || pSet.has('u8()')) {
            fixes.push({ block, func: funcName, addr,
              pcode: pTypes, regex: 'v()',
              fix: 'Change v() → u8(_MEM[addr])',
              severity: 'HIGH' });
          } else if (pSet.has('bare')) {
            fixes.push({ block, func: funcName, addr,
              pcode: pTypes, regex: 'v()',
              fix: 'Remove v() — used as bare address',
              severity: 'MEDIUM' });
          }
          totalMismatches++;
        }
      }

      // Case 2: regex uses s32/u32 but P-code uses s16/u8
      if ((rSet.has('s32()') || rSet.has('u32()')) && pSet) {
        if ((pSet.has('s16()') || pSet.has('u16()')) && !pSet.has('s32()') && !pSet.has('u32()')) {
          fixes.push({ block, func: funcName, addr,
            pcode: [...pSet].join(','), regex: [...rSet].join(','),
            fix: 'Change s32/u32 → s16/u16 (2-byte access)',
            severity: 'HIGH' });
          totalMismatches++;
        }
        if ((pSet.has('s8()') || pSet.has('u8()') || pSet.has('_MEM[]') || pSet.has('_MEM[+]'))
            && !pSet.has('s32()') && !pSet.has('u32()') && !pSet.has('s16()')) {
          fixes.push({ block, func: funcName, addr,
            pcode: [...pSet].join(','), regex: [...rSet].join(','),
            fix: 'Change s32/u32 → u8/_MEM[] (1-byte access)',
            severity: 'HIGH' });
          totalMismatches++;
        }
      }
    }
  }
}

// ── Report ──
const high = fixes.filter(f => f.severity === 'HIGH');
const medium = fixes.filter(f => f.severity === 'MEDIUM');

console.log(`\n${'═'.repeat(60)}`);
console.log(`PER-FUNCTION P-CODE AUDIT: ${totalMismatches} mismatches`);
console.log(`  HIGH: ${high.length} (wrong width or spurious v())`);
console.log(`  MEDIUM: ${medium.length} (bare address used as value)`);
console.log(`${'═'.repeat(60)}\n`);

// Group HIGH by fix type
const byFix = new Map();
for (const f of high) {
  const key = f.fix;
  if (!byFix.has(key)) byFix.set(key, []);
  byFix.get(key).push(f);
}

for (const [fix, items] of byFix) {
  console.log(`── ${fix} (${items.length} occurrences) ──`);
  // Deduplicate by addr
  const byAddr = new Map();
  for (const item of items) {
    if (!byAddr.has(item.addr)) byAddr.set(item.addr, []);
    byAddr.get(item.addr).push(item);
  }
  for (const [addr, instances] of [...byAddr].slice(0, 20)) {
    const funcs = instances.map(i => i.func).slice(0, 3).join(', ');
    const more = instances.length > 3 ? ` +${instances.length-3}` : '';
    console.log(`  ${addr}: P-code=${instances[0].pcode} Regex=${instances[0].regex} in ${funcs}${more}`);
  }
  if (byAddr.size > 20) console.log(`  ... and ${byAddr.size - 20} more globals`);
  console.log();
}

// Summary of globals that need dat-narrow entries
const needNarrow = new Set();
for (const f of high) {
  if (f.fix.includes('s16') || f.fix.includes('u8') || f.fix.includes('_MEM')) {
    needNarrow.add(f.addr);
  }
}
if (needNarrow.size > 0) {
  console.log(`\n── Globals needing dat-narrow.json entries (${needNarrow.size}) ──`);
  for (const addr of [...needNarrow].sort()) {
    const f = high.find(h => h.addr === addr);
    const width = f.fix.includes('s16') || f.fix.includes('u16') ? 2 : 1;
    console.log(`  "${addr}": ${width},`);
  }
}
