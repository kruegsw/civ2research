#!/usr/bin/env node
// audit.cjs — Line-by-line C vs JS comparison
//
// For every line N, checks that JS line N is a valid transformation
// of C line N. Flags missing function calls, DAT_ references,
// constants, and variables.
//
// Usage:
//   node audit.cjs                     # all blocks, summary
//   node audit.cjs block_004E0000      # one block, detailed
//   node audit.cjs --full              # all blocks, detailed

const fs = require('fs');
const path = require('path');

const C_DIR = path.join(__dirname, '..', 'decompiled');
const JS_DIR = path.join(__dirname, 'output');

function extractElements(line) {
  const t = line.trim();
  if (!t || t.startsWith('//') || t.startsWith('/*') || t === '{' || t === '}') {
    return null;
  }

  const funcs = new Set();
  for (const m of t.matchAll(/(?:thunk_)?(FUN_[0-9a-fA-F]+)/g)) funcs.add(m[1]);

  const dats = new Set();
  for (const m of t.matchAll(/(?:&)?(DAT_[0-9a-fA-F]+)/g)) dats.add(m[1]);

  const consts = new Set();
  for (const m of t.matchAll(/\b(0x[0-9a-fA-F]+)\b/g)) consts.add(m[1]);

  const vars = new Set();
  for (const m of t.matchAll(/\b(local_[0-9a-fA-F]+|param_\d+|[iucsbla]Var\d+)\b/g)) vars.add(m[1]);

  return { funcs, dats, consts, vars, raw: t };
}

function auditBlock(blockName) {
  const cFile = path.join(C_DIR, blockName + '.c');
  const jsFile = path.join(JS_DIR, blockName + '.js');
  if (!fs.existsSync(cFile) || !fs.existsSync(jsFile)) return null;

  const cLines = fs.readFileSync(cFile, 'utf8').split('\n');
  const jsLines = fs.readFileSync(jsFile, 'utf8').split('\n');

  const issues = [];
  let linesChecked = 0;
  let linesPassed = 0;
  let inCBlockComment = false;

  for (let i = 0; i < cLines.length; i++) {
    const cRaw = cLines[i].trim();
    // Track C block comments — lines inside /* ... */ are comments, not code
    if (inCBlockComment) {
      if (/\*\//.test(cRaw)) inCBlockComment = false;
      continue; // skip — this is a comment line in C
    }
    if (/^\/\*/.test(cRaw) && !/\*\//.test(cRaw)) {
      inCBlockComment = true;
      continue;
    }
    if (/^\/\*/.test(cRaw) && /\*\//.test(cRaw)) continue; // single-line block comment

    const cEl = extractElements(cLines[i]);
    if (!cEl) continue;

    const jsRaw = (jsLines[i] || '').trim();
    const jsEl = extractElements(jsLines[i] || '');
    linesChecked++;

    // DEVIATION is expected — pass
    if (jsRaw.startsWith('// DEVIATION')) { linesPassed++; continue; }

    // C has code but JS is blank/comment — check if expected
    if (!jsEl) {
      const ct = cEl.raw;
      // Skip expected: promoted params, goto labels, SEH locals, unparsed sigs
      if (/^\s*\w[\w\s]*\*?\s*(in_E\w+|unaff_\w+|puStack_\w+|uStack_\w+)\s*;/.test(ct)) { linesPassed++; continue; }
      if (/^(LAB_|switchD_|code_r|joined_r)/.test(ct)) { linesPassed++; continue; }
      if (/unaff_EBP/.test(ct)) { linesPassed++; continue; }
      // Multi-line signature continuations (param lines, closing paren)
      if (/param_\d+/.test(ct) || /^\s*\)$/.test(ct)) { linesPassed++; continue; }
      // Unparsed function names (library functions without // Function: header)
      if (/^\s*\w+\s+\w+\s*\(/.test(ct) && !/FUN_|DAT_|thunk_/.test(ct)) { linesPassed++; continue; }

      issues.push({ line: i + 1, type: 'MISSING', msg: 'C has code, JS is blank/comment',
                     c: ct.substring(0, 80) });
      continue;
    }

    const problems = [];

    // Every FUN_ in C must appear in JS
    const missingFuncs = [...cEl.funcs].filter(f => !jsEl.funcs.has(f));
    if (missingFuncs.length > 0) problems.push('FUN: ' + missingFuncs.join(', '));

    // Every DAT_ in C must appear in JS
    const missingDats = [...cEl.dats].filter(d => !jsEl.dats.has(d));
    if (missingDats.length > 0) problems.push('DAT: ' + missingDats.join(', '));

    // Constants — only flag if majority are missing
    const missingConsts = [...cEl.consts].filter(c => !jsEl.consts.has(c));
    if (missingConsts.length > 0 && missingConsts.length >= cEl.consts.size) {
      problems.push('CONST: ' + missingConsts.join(', '));
    }

    // Variables — only flag if majority are missing
    const missingVars = [...cEl.vars].filter(v => !jsEl.vars.has(v));
    if (missingVars.length > 0 && missingVars.length >= cEl.vars.size) {
      problems.push('VAR: ' + missingVars.join(', '));
    }

    if (problems.length > 0) {
      issues.push({ line: i + 1, type: 'MISMATCH', msg: problems.join(' | '),
                     c: cEl.raw.substring(0, 80), js: jsEl.raw.substring(0, 80) });
    } else {
      linesPassed++;
    }
  }

  return { blockName, linesChecked, linesPassed, issues };
}

const args = process.argv.slice(2);
const detailed = args.includes('--full');
const specificBlock = args.find(a => a.startsWith('block_'));

const blocks = specificBlock
  ? [specificBlock]
  : fs.readdirSync(C_DIR).filter(f => f.endsWith('.c')).map(f => f.replace('.c', '')).sort();

let grandChecked = 0, grandPassed = 0, grandIssues = 0;

for (const block of blocks) {
  const r = auditBlock(block);
  if (!r) continue;

  grandChecked += r.linesChecked;
  grandPassed += r.linesPassed;
  grandIssues += r.issues.length;

  const pct = r.linesChecked > 0 ? Math.round(r.linesPassed / r.linesChecked * 100) : 0;

  if (specificBlock || detailed) {
    console.log('\n' + block + ': ' + r.linesPassed + '/' + r.linesChecked + ' pass (' + pct + '%)');
    if (r.issues.length > 0) {
      for (const iss of r.issues.slice(0, 40)) {
        console.log('  L' + iss.line + ' [' + iss.type + '] ' + iss.msg);
        console.log('    C:  ' + iss.c);
        if (iss.js) console.log('    JS: ' + iss.js);
      }
      if (r.issues.length > 40) console.log('  ... and ' + (r.issues.length - 40) + ' more');
    }
  } else {
    const bar = pct >= 99 ? '████' : pct >= 95 ? '███░' : pct >= 90 ? '██░░' : pct >= 80 ? '█░░░' : '░░░░';
    console.log(block.replace('block_', '') + ' ' + bar + ' ' +
                String(pct).padStart(3) + '%  ' +
                String(r.linesPassed).padStart(5) + '/' + String(r.linesChecked).padStart(5) +
                '  issues: ' + r.issues.length);
  }
}

if (blocks.length > 1) {
  const pct = grandChecked > 0 ? Math.round(grandPassed / grandChecked * 100) : 0;
  console.log('\n' + '═'.repeat(55));
  console.log('TOTAL: ' + grandPassed + '/' + grandChecked + ' lines pass (' + pct + '%)');
  console.log('Issues: ' + grandIssues);
}
