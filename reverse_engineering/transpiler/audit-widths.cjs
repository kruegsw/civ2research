#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit-widths.cjs — Find width/sign mismatches between P-code and regex
//
// Compares HOW each DAT_ global is accessed (width and sign) in P-code
// vs regex transpiler output, per function. Only reports actionable
// mismatches where the regex reads more bytes than P-code says.
//
// Usage: node audit-widths.cjs [--fix]
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const PCODE_DIR = path.join(__dirname, 'output-ghidra');
const REGEX_DIR = path.join(__dirname, 'output');
const doFix = process.argv.includes('--fix');

// Extract width/sign per DAT_ from source
function extractWidths(source) {
  const map = new Map(); // DAT_addr → { widths: Set, signs: Set, patterns: [] }

  // s8/u8(_MEM[DAT_xxx]) or _MEM[DAT_xxx + ...]
  for (const m of source.matchAll(/\b(s8|u8)\(\s*_MEM\[\s*(DAT_[0-9a-fA-F]+)/g)) {
    const addr = m[2];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(1);
    map.get(addr).signs.add(m[1][0]);
    map.get(addr).patterns.push(m[1] + '()');
  }
  // s16/u16(DAT_xxx, 0) — narrow read at base address
  for (const m of source.matchAll(/\b(s16|u16)\(\s*(DAT_[0-9a-fA-F]+)\s*,\s*0\s*\)/g)) {
    const addr = m[2];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(2);
    map.get(addr).signs.add(m[1][0]);
    map.get(addr).patterns.push(m[1] + '(,0)');
  }
  // v(DAT_xxx) — 4-byte read
  for (const m of source.matchAll(/\bv\(\s*(DAT_[0-9a-fA-F]+)\s*\)/g)) {
    const addr = m[1];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(4);
    map.get(addr).signs.add('s');
    map.get(addr).patterns.push('v()');
  }
  // wv(DAT_xxx, ...) — 4-byte write at base
  for (const m of source.matchAll(/\bwv\(\s*(DAT_[0-9a-fA-F]+)/g)) {
    const addr = m[1];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(4);
    map.get(addr).patterns.push('wv()');
  }
  // w16(ptrAdd(DAT_xxx, ...), 0, ...) or w16(DAT_xxx, 0, ...) — 2-byte write at base
  for (const m of source.matchAll(/\bw16\(\s*(?:ptrAdd\(\s*)?(DAT_[0-9a-fA-F]+)[^)]*,\s*0\s*,/g)) {
    const addr = m[1];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(2);
    map.get(addr).patterns.push('w16(,0,)');
  }
  // _MEM[DAT_xxx] = ... — 1-byte write at base
  for (const m of source.matchAll(/_MEM\[\s*(DAT_[0-9a-fA-F]+)\s*\]\s*=/g)) {
    const addr = m[1];
    if (!map.has(addr)) map.set(addr, { widths: new Set(), signs: new Set(), patterns: [] });
    map.get(addr).widths.add(1);
    map.get(addr).patterns.push('_MEM[]=');
  }

  return map;
}

// Parse functions
function parseFunctions(source) {
  const funcs = new Map();
  const funcStarts = [...source.matchAll(/^\s*export function (\w+)\s*\(/gm)];
  for (let i = 0; i < funcStarts.length; i++) {
    const name = funcStarts[i][1];
    const start = funcStarts[i].index;
    const end = i + 1 < funcStarts.length ? funcStarts[i+1].index : source.length;
    funcs.set(name, source.substring(start, end));
  }
  return funcs;
}

// ── Main ──
const blocks = fs.readdirSync(PCODE_DIR)
  .filter(f => f.startsWith('block_') && f.endsWith('.js'))
  .map(f => f.replace('.js', ''))
  .sort();

const issues = [];
const narrowFixes = new Map(); // addr → width (for dat-narrow.json)

for (const block of blocks) {
  const pPath = path.join(PCODE_DIR, block + '.js');
  const rPath = path.join(REGEX_DIR, block + '.js');
  if (!fs.existsSync(pPath) || !fs.existsSync(rPath)) continue;

  const pSrc = fs.readFileSync(pPath, 'utf8');
  const rSrc = fs.readFileSync(rPath, 'utf8');
  const pFuncs = parseFunctions(pSrc);
  const rFuncs = parseFunctions(rSrc);

  for (const [funcName, pBody] of pFuncs) {
    // Find matching regex function
    let rBody = rFuncs.get(funcName);
    if (!rBody) {
      for (const [rn, rb] of rFuncs) {
        if (rn.startsWith(funcName)) { rBody = rb; break; }
      }
    }
    if (!rBody) continue;

    const pWidths = extractWidths(pBody);
    const rWidths = extractWidths(rBody);

    for (const [addr, pInfo] of pWidths) {
      const rInfo = rWidths.get(addr);
      if (!rInfo) continue;

      const pMin = Math.min(...pInfo.widths);
      const rMin = Math.min(...rInfo.widths);

      // Only flag if P-code uses narrow (1 or 2) but regex uses wider
      if (pMin < 4 && rMin > pMin) {
        // Check: is the narrow access at the BASE address (offset 0)?
        // Only those need dat-narrow.json entries
        const isBaseAccess = pInfo.patterns.some(p =>
          p.includes('(,0)') || p.includes('_MEM[]') || p === 'v()' || p === 'wv()' ||
          p.includes('s8()') || p.includes('u8()'));

        if (isBaseAccess) {
          issues.push({
            block, func: funcName, addr,
            pcodeWidth: pMin, regexWidth: rMin,
            pcodePatterns: [...new Set(pInfo.patterns)],
            regexPatterns: [...new Set(rInfo.patterns)],
          });

          // Record fix
          const existing = narrowFixes.get(addr);
          if (!existing || existing > pMin) {
            narrowFixes.set(addr, pMin);
          }
        }
      }
    }
  }
}

// Deduplicate by addr
const byAddr = new Map();
for (const issue of issues) {
  if (!byAddr.has(issue.addr)) byAddr.set(issue.addr, []);
  byAddr.get(issue.addr).push(issue);
}

console.log(`\n${'═'.repeat(60)}`);
console.log(`WIDTH AUDIT: ${byAddr.size} globals with width mismatches`);
console.log(`${'═'.repeat(60)}\n`);

// Load current dat-narrow
const narrowPath = path.join(__dirname, 'dat-narrow.json');
const currentNarrow = JSON.parse(fs.readFileSync(narrowPath, 'utf8'));
let alreadyFixed = 0, needsFix = 0;

for (const [addr, instances] of [...byAddr].sort((a,b) => a[0].localeCompare(b[0]))) {
  const w = narrowFixes.get(addr);
  const inNarrow = currentNarrow[addr];
  const status = inNarrow ? (inNarrow === w ? 'OK' : `WRONG(${inNarrow})`) : 'MISSING';

  if (status === 'OK') { alreadyFixed++; continue; }
  needsFix++;

  const funcs = instances.map(i => i.func).slice(0, 3);
  const more = instances.length > 3 ? ` +${instances.length-3}` : '';
  console.log(`${addr}: P-code=${w}b, regex=${instances[0].regexWidth}b [${status}]`);
  console.log(`  P-code: ${instances[0].pcodePatterns.join(', ')}`);
  console.log(`  Regex:  ${instances[0].regexPatterns.join(', ')}`);
  console.log(`  In: ${funcs.join(', ')}${more}`);
  console.log();
}

console.log(`Already in dat-narrow: ${alreadyFixed}`);
console.log(`Need fixing: ${needsFix}`);

if (doFix && needsFix > 0) {
  console.log('\nApplying fixes to dat-narrow.json...');
  for (const [addr, w] of narrowFixes) {
    if (!currentNarrow[addr]) {
      currentNarrow[addr] = w;
      console.log(`  Added ${addr} → ${w}`);
    }
  }
  fs.writeFileSync(narrowPath, JSON.stringify(currentNarrow, null, 2) + '\n');
  console.log('Done. Run transpile.cjs to rebuild.');
}
