#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit-pcode-vs-regex.cjs — Compare P-code transpiler output (truth)
// against regex transpiler output (what we ship) line by line.
//
// For each exported function, compares how DAT_ globals are accessed:
//   P-code says s16(DAT_xxx, ...) but regex says v(DAT_xxx) → BUG
//   P-code says u8(_MEM[DAT_xxx]) but regex says s32(DAT_xxx, 0) → BUG
//
// This catches width mismatches that cause neighbor clobbering,
// sign mismatches that cause wrong comparisons, and missing/extra
// v() wrapping on address-of patterns.
//
// Usage: node audit-pcode-vs-regex.cjs [block_name]
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const PCODE_DIR = path.join(__dirname, 'output-ghidra');
const REGEX_DIR = path.join(__dirname, 'output');

const specificBlock = process.argv[2];

// Extract all DAT_ access patterns from a source line
function extractDatAccesses(line) {
  const accesses = [];

  // v(DAT_xxx) → width 4, read
  for (const m of line.matchAll(/\bv\(\s*(DAT_[0-9a-fA-F]+)\s*\)/g)) {
    accesses.push({ addr: m[1], width: 4, sign: 's', type: 'v' });
  }
  // wv(DAT_xxx, ...) → width 4, write
  for (const m of line.matchAll(/\bwv\(\s*(DAT_[0-9a-fA-F]+)\s*,/g)) {
    accesses.push({ addr: m[1], width: 4, sign: 'u', type: 'wv' });
  }
  // s8(expr) / u8(expr) containing DAT_
  for (const m of line.matchAll(/\b(s8|u8)\(\s*_MEM\[\s*(DAT_[0-9a-fA-F]+)/g)) {
    accesses.push({ addr: m[2], width: 1, sign: m[1][0], type: m[1] });
  }
  // s16/u16/s32/u32(DAT_xxx, ...)
  for (const m of line.matchAll(/\b(s16|u16|s32|u32)\(\s*(DAT_[0-9a-fA-F]+)\s*,/g)) {
    const w = parseInt(m[1].substring(1));
    accesses.push({ addr: m[2], width: w, sign: m[1][0], type: m[1] });
  }
  // w16/w32(... DAT_xxx, ...)
  for (const m of line.matchAll(/\b(w16|w32)\(\s*(?:ptrAdd\()?\s*(DAT_[0-9a-fA-F]+)/g)) {
    const w = parseInt(m[1].substring(1));
    accesses.push({ addr: m[2], width: w, sign: 'u', type: m[1] });
  }
  // _MEM[DAT_xxx] → byte read/write
  for (const m of line.matchAll(/_MEM\[\s*(DAT_[0-9a-fA-F]+)\s*\]/g)) {
    accesses.push({ addr: m[1], width: 1, sign: 'u', type: '_MEM[]' });
  }
  // _MEM[DAT_xxx + offset] → byte read/write
  for (const m of line.matchAll(/_MEM\[\s*(DAT_[0-9a-fA-F]+)\s*\+/g)) {
    accesses.push({ addr: m[1], width: 1, sign: 'u', type: '_MEM[+]' });
  }

  return accesses;
}

// Parse functions from a block file
function parseFunctions(source) {
  const funcs = new Map();
  const lines = source.split('\n');
  let currentFunc = null;
  let funcLines = [];

  for (const line of lines) {
    const funcMatch = line.match(/^\s*export function (\w+)\s*\(/);
    if (funcMatch) {
      if (currentFunc) funcs.set(currentFunc, funcLines);
      currentFunc = funcMatch[1];
      funcLines = [line];
    } else if (currentFunc) {
      funcLines.push(line);
    }
  }
  if (currentFunc) funcs.set(currentFunc, funcLines);
  return funcs;
}

// Compare two access lists for the same DAT_ address
function compareAccesses(pcodeAccesses, regexAccesses, funcName) {
  const issues = [];

  // Build maps: DAT_addr → {widths, signs} for each
  const pcodeMap = new Map();
  for (const a of pcodeAccesses) {
    if (!pcodeMap.has(a.addr)) pcodeMap.set(a.addr, { widths: new Set(), signs: new Set(), types: new Set() });
    const entry = pcodeMap.get(a.addr);
    entry.widths.add(a.width);
    entry.signs.add(a.sign);
    entry.types.add(a.type);
  }

  const regexMap = new Map();
  for (const a of regexAccesses) {
    if (!regexMap.has(a.addr)) regexMap.set(a.addr, { widths: new Set(), signs: new Set(), types: new Set() });
    const entry = regexMap.get(a.addr);
    entry.widths.add(a.width);
    entry.signs.add(a.sign);
    entry.types.add(a.type);
  }

  // Compare: for each DAT_ in P-code, check if regex matches
  for (const [addr, pcode] of pcodeMap) {
    const regex = regexMap.get(addr);
    if (!regex) continue; // regex doesn't access this — might be &DAT_ (address-of)

    // Width mismatch
    const pcodeWidths = [...pcode.widths];
    const regexWidths = [...regex.widths];

    for (const pw of pcodeWidths) {
      if (pw === 4) continue; // 4-byte is default, less interesting
      if (!regexWidths.includes(pw)) {
        // P-code says narrow but regex uses different width
        const rw = regexWidths[0];
        if (rw > pw) {
          // Regex reads MORE bytes than P-code says → CLOBBER RISK
          issues.push({
            severity: 'HIGH',
            addr,
            func: funcName,
            msg: `Width mismatch: P-code=${pw}b, regex=${rw}b (reads too wide, may clobber neighbors)`,
            pcodeTypes: [...pcode.types],
            regexTypes: [...regex.types],
          });
        } else if (rw < pw) {
          issues.push({
            severity: 'LOW',
            addr,
            func: funcName,
            msg: `Width mismatch: P-code=${pw}b, regex=${rw}b (reads too narrow, may truncate)`,
            pcodeTypes: [...pcode.types],
            regexTypes: [...regex.types],
          });
        }
      }
    }

    // Sign mismatch on narrow types
    for (const pw of pcodeWidths) {
      if (pw >= 4) continue;
      const pcSigns = [...pcode.signs];
      const rxSigns = [...regex.signs];
      if (pcSigns.includes('s') && !rxSigns.includes('s') && rxSigns.includes('u')) {
        issues.push({
          severity: 'MEDIUM',
          addr,
          func: funcName,
          msg: `Sign mismatch: P-code=signed, regex=unsigned (${pw}b)`,
          pcodeTypes: [...pcode.types],
          regexTypes: [...regex.types],
        });
      }
      if (pcSigns.includes('u') && !rxSigns.includes('u') && rxSigns.includes('s')) {
        issues.push({
          severity: 'MEDIUM',
          addr,
          func: funcName,
          msg: `Sign mismatch: P-code=unsigned, regex=signed (${pw}b)`,
          pcodeTypes: [...pcode.types],
          regexTypes: [...regex.types],
        });
      }
    }
  }

  // Check for v() on addresses that P-code never reads (might be address-of)
  for (const [addr, regex] of regexMap) {
    if (regex.types.has('v') && !pcodeMap.has(addr)) {
      issues.push({
        severity: 'MEDIUM',
        addr,
        func: funcName,
        msg: `v() wrapping on DAT_ not accessed in P-code (may be &DAT_ address-of)`,
        pcodeTypes: [],
        regexTypes: [...regex.types],
      });
    }
  }

  return issues;
}

// ── Main ──
const blocks = specificBlock
  ? [specificBlock]
  : fs.readdirSync(PCODE_DIR).filter(f => f.startsWith('block_') && f.endsWith('.js')).map(f => f.replace('.js', ''));

let totalIssues = { HIGH: 0, MEDIUM: 0, LOW: 0 };
const allIssues = [];

for (const block of blocks) {
  const pcodePath = path.join(PCODE_DIR, block + '.js');
  const regexPath = path.join(REGEX_DIR, block + '.js');

  if (!fs.existsSync(pcodePath) || !fs.existsSync(regexPath)) continue;

  const pcodeSrc = fs.readFileSync(pcodePath, 'utf8');
  const regexSrc = fs.readFileSync(regexPath, 'utf8');

  const pcodeFuncs = parseFunctions(pcodeSrc);
  const regexFuncs = parseFunctions(regexSrc);

  for (const [funcName, pcodeLines] of pcodeFuncs) {
    // Find matching function in regex output (might have _ADDRESS suffix)
    let regexLines = regexFuncs.get(funcName);
    if (!regexLines) {
      // Try with address suffix
      for (const [rName, rLines] of regexFuncs) {
        if (rName.startsWith(funcName + '_') || rName === funcName) {
          regexLines = rLines;
          break;
        }
      }
    }
    if (!regexLines) continue;

    const pcodeAccesses = [];
    for (const line of pcodeLines) pcodeAccesses.push(...extractDatAccesses(line));

    const regexAccesses = [];
    for (const line of regexLines) regexAccesses.push(...extractDatAccesses(line));

    const issues = compareAccesses(pcodeAccesses, regexAccesses, funcName);
    for (const issue of issues) {
      issue.block = block;
      totalIssues[issue.severity]++;
      allIssues.push(issue);
    }
  }
}

// ── Report ──
console.log(`\n${'═'.repeat(60)}`);
console.log(`P-CODE vs REGEX AUDIT: ${allIssues.length} issues found`);
console.log(`  HIGH: ${totalIssues.HIGH} (width too wide → clobber risk)`);
console.log(`  MEDIUM: ${totalIssues.MEDIUM} (sign mismatch or spurious v())`);
console.log(`  LOW: ${totalIssues.LOW} (width too narrow → truncation)`);
console.log(`${'═'.repeat(60)}\n`);

// Sort by severity then address
const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
allIssues.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || a.addr.localeCompare(b.addr));

// Deduplicate by addr+severity (same global, same issue, different functions)
const seen = new Map();
for (const issue of allIssues) {
  const key = `${issue.addr}|${issue.severity}|${issue.msg}`;
  if (!seen.has(key)) {
    seen.set(key, { ...issue, funcs: [issue.func] });
  } else {
    seen.get(key).funcs.push(issue.func);
  }
}

const deduped = [...seen.values()];
console.log(`Unique globals affected: ${new Set(deduped.map(i => i.addr)).size}\n`);

for (const issue of deduped) {
  const funcList = issue.funcs.length > 3
    ? issue.funcs.slice(0, 3).join(', ') + ` +${issue.funcs.length - 3} more`
    : issue.funcs.join(', ');
  console.log(`[${issue.severity}] ${issue.addr}: ${issue.msg}`);
  console.log(`  P-code: ${issue.pcodeTypes.join(',')||'(none)'}  Regex: ${issue.regexTypes.join(',')}`);
  console.log(`  In: ${funcList}`);
  console.log();
}
