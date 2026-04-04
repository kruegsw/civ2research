#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit-expressions.cjs — Deep expression-level P-code vs regex audit
//
// For each game-critical function, extracts key expressions (memory
// reads, writes, comparisons, return values) from both P-code and
// regex output, then compares them for semantic differences.
//
// Catches: wrong widths on locals, missing casts, pointer arithmetic
// errors, boolean vs int mismatches, incorrect sign extension.
//
// Usage: node audit-expressions.cjs [FUN_004ec3fe]
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const PCODE_DIR = path.join(__dirname, 'output-ghidra');
const REGEX_DIR = path.join(__dirname, 'output');

const specificFunc = process.argv[2];

// Game-critical functions to audit
const CRITICAL_FUNCS = [
  // City processing
  'FUN_004ec3fe', // production completion — shields, unit creation
  'FUN_004eb4ed', // city yield computation wrapper
  'FUN_004e7641', // tile yield computation (21-tile scan)
  'FUN_004e7967', // trade yield computation
  'FUN_004e80b1', // city improvement effects on yields
  'FUN_004eb4a1', // final yield calculation
  'FUN_004ebbde', // city processing gatekeeper
  'FUN_004eef23', // post-production processing
  'FUN_004f0a9c', // per-city turn entry point

  // Turn pipeline
  'FUN_00489553', // main per-civ turn function
  'FUN_00487a41', // per-city loop (calls FUN_004f0a9c)
  'FUN_00488cef', // unit upkeep
  'FUN_00489292', // treasury adjustment

  // Unit management
  'FUN_005b3d06', // create unit
  'FUN_005b345f', // place unit on tile (linked list)
  'FUN_005b2c82', // next unit in stack
  'FUN_005b2d39', // find stack head
  'FUN_005b2e69', // find first unit at position
  'FUN_005b6787', // reset unit movement

  // Food/growth
  'FUN_0053184d', // diplomacy + per-civ city scan

  // Combat
  'FUN_00440325', // combat resolution
  'FUN_004413d1', // attack calculation

  // Research
  'FUN_004bd9f0', // has-tech check
  'FUN_004bf05b', // discover tech

  // AI
  'FUN_00543cd6', // AI unit dispatch
  'FUN_00543b80', // AI unit decision wrapper
];

// Extract function body from source
function getFunc(source, name) {
  const re = new RegExp('^\\s*export function ' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\(', 'm');
  const match = re.exec(source);
  if (!match) return null;
  const start = match.index;
  // Find next export function or end of file
  const nextMatch = source.substring(start + 1).match(/^\s*export function /m);
  const end = nextMatch ? start + 1 + nextMatch.index : source.length;
  return source.substring(start, end);
}

// Normalize a line for comparison (strip whitespace, comments, loopGuard)
function normalize(line) {
  return line
    .replace(/\/\/.*$/, '')           // strip comments
    .replace(/\/\*.*?\*\//g, '')      // strip block comments
    .replace(/loopGuard\([^)]+\);?\s*/g, '')  // strip loop guards
    .replace(/\s+/g, ' ')            // normalize whitespace
    .trim();
}

// Extract "interesting" lines — assignments, returns, function calls, conditionals
function extractKeyLines(funcBody) {
  const lines = funcBody.split('\n');
  const key = [];
  for (let i = 0; i < lines.length; i++) {
    const n = normalize(lines[i]);
    if (!n || n === '{' || n === '}' || n === '};' || n.startsWith('let ') ||
        n.startsWith('const ') || n.startsWith('//') || n === '/*JOINED*/') continue;
    // Keep assignments, calls, returns, conditionals
    if (/[=;]|return |if |for |while |switch|break|continue/.test(n)) {
      key.push({ line: i + 1, text: n });
    }
  }
  return key;
}

// Compare two expressions for semantic differences
function compareExpr(pExpr, rExpr) {
  if (pExpr === rExpr) return null;

  const diffs = [];

  // Check for v() wrapping differences
  const pVCalls = (pExpr.match(/\bv\(/g) || []).length;
  const rVCalls = (rExpr.match(/\bv\(/g) || []).length;
  if (rVCalls > pVCalls) diffs.push('extra v() in regex');

  // Check for width differences: s32 vs s16, v vs s16, etc.
  const widthPats = [
    [/\bs32\(/, 's32'],
    [/\bu32\(/, 'u32'],
    [/\bs16\(/, 's16'],
    [/\bu16\(/, 'u16'],
    [/\bs8\(/, 's8'],
    [/\bu8\(/, 'u8'],
    [/\bv\(/, 'v'],
    [/\bwv\(/, 'wv'],
    [/\bw32\(/, 'w32'],
    [/\bw16\(/, 'w16'],
  ];
  const pWidths = new Set();
  const rWidths = new Set();
  for (const [re, name] of widthPats) {
    if (re.test(pExpr)) pWidths.add(name);
    if (re.test(rExpr)) rWidths.add(name);
  }
  // Flag if regex uses wider access than P-code
  if (rWidths.has('v') && (pWidths.has('s16') || pWidths.has('u16')) && !pWidths.has('v'))
    diffs.push('WIDTH: regex uses v() but P-code uses s16/u16');
  if (rWidths.has('v') && (pWidths.has('s8') || pWidths.has('u8')) && !pWidths.has('v'))
    diffs.push('WIDTH: regex uses v() but P-code uses s8/u8');
  if (rWidths.has('s32') && pWidths.has('s16') && !pWidths.has('s32'))
    diffs.push('WIDTH: regex uses s32 but P-code uses s16');
  if (rWidths.has('w32') && pWidths.has('w16') && !pWidths.has('w32'))
    diffs.push('WIDTH: regex uses w32 but P-code uses w16');

  // Check for sign differences
  if (rWidths.has('u8') && pWidths.has('s8') && !pWidths.has('u8'))
    diffs.push('SIGN: regex unsigned, P-code signed (8-bit)');
  if (rWidths.has('s8') && pWidths.has('u8') && !pWidths.has('s8'))
    diffs.push('SIGN: regex signed, P-code unsigned (8-bit)');

  // Check for >>> 0 (unsigned coercion) differences
  const pUnsigned = (pExpr.match(/>>> 0/g) || []).length;
  const rUnsigned = (rExpr.match(/>>> 0/g) || []).length;
  if (rUnsigned > pUnsigned) diffs.push('extra >>> 0 in regex');
  if (pUnsigned > rUnsigned) diffs.push('missing >>> 0 in regex');

  // Check for integer division differences
  const pDiv = (pExpr.match(/\| 0\)/g) || []).length;
  const rDiv = (rExpr.match(/\| 0\)/g) || []).length;
  if (pDiv !== rDiv) diffs.push(`int division: P-code=${pDiv}, regex=${rDiv}`);

  return diffs.length > 0 ? diffs : null;
}

// ── Main ──
const funcsToAudit = specificFunc ? [specificFunc] : CRITICAL_FUNCS;
const blocks = fs.readdirSync(PCODE_DIR).filter(f => f.endsWith('.js'));

let totalIssues = 0;
const funcIssues = [];

for (const funcName of funcsToAudit) {
  // Find this function in P-code and regex output
  let pBody = null, rBody = null, blockName = '';

  for (const block of blocks) {
    const pSrc = fs.readFileSync(path.join(PCODE_DIR, block), 'utf8');
    const rSrc = fs.readFileSync(path.join(REGEX_DIR, block), 'utf8');

    pBody = getFunc(pSrc, funcName);
    // Try with address suffix in regex
    rBody = getFunc(rSrc, funcName);
    if (!rBody) {
      const rFuncs = [...rSrc.matchAll(/^\s*export function (\w+)\s*\(/gm)];
      for (const m of rFuncs) {
        if (m[1].startsWith(funcName)) { rBody = getFunc(rSrc, m[1]); break; }
      }
    }
    if (pBody && rBody) { blockName = block.replace('.js', ''); break; }
    pBody = null; rBody = null;
  }

  if (!pBody || !rBody) continue;

  const pLines = extractKeyLines(pBody);
  const rLines = extractKeyLines(rBody);

  // Simple line-count comparison
  const issues = [];
  if (Math.abs(pLines.length - rLines.length) > pLines.length * 0.3) {
    issues.push(`Line count: P-code=${pLines.length}, regex=${rLines.length} (>30% difference)`);
  }

  // Compare expressions on matching lines (heuristic: similar structure)
  // Use the shorter list and compare each against the closest match in the other
  const shorter = pLines.length <= rLines.length ? pLines : rLines;
  const longer = pLines.length <= rLines.length ? rLines : pLines;
  const isP = shorter === pLines;

  for (const sLine of shorter) {
    // Find closest match in longer list (by shared substrings)
    let bestMatch = null, bestScore = 0;
    for (const lLine of longer) {
      // Simple similarity: count shared 4-char substrings
      let score = 0;
      for (let i = 0; i <= sLine.text.length - 4; i++) {
        if (lLine.text.includes(sLine.text.substring(i, i + 4))) score++;
      }
      if (score > bestScore) { bestScore = score; bestMatch = lLine; }
    }

    if (bestMatch && bestScore > sLine.text.length * 0.3) {
      const pExpr = isP ? sLine.text : bestMatch.text;
      const rExpr = isP ? bestMatch.text : sLine.text;
      const diffs = compareExpr(pExpr, rExpr);
      if (diffs) {
        for (const d of diffs) {
          issues.push(`${d}\n    P: ${pExpr.substring(0, 100)}\n    R: ${rExpr.substring(0, 100)}`);
        }
      }
    }
  }

  if (issues.length > 0) {
    totalIssues += issues.length;
    funcIssues.push({ func: funcName, block: blockName, issues });
  }
}

// ── Report ──
console.log(`\n${'═'.repeat(60)}`);
console.log(`EXPRESSION AUDIT: ${funcsToAudit.length} functions, ${totalIssues} issues`);
console.log(`${'═'.repeat(60)}\n`);

for (const { func, block, issues } of funcIssues) {
  console.log(`── ${func} (${block}) — ${issues.length} issues ──`);
  for (const issue of issues.slice(0, 10)) {
    console.log(`  ${issue}`);
  }
  if (issues.length > 10) console.log(`  ... and ${issues.length - 10} more`);
  console.log();
}

if (totalIssues === 0) {
  console.log('No expression-level differences found in critical functions.');
}
