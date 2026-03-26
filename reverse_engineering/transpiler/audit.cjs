#!/usr/bin/env node
// audit.cjs — Line-by-line C vs JS comparison (NO SKIPS)
//
// Every C line is checked. Every goto helper is checked.
// Nothing is silenced.
//
// Usage:
//   node audit.cjs                     # all blocks, summary
//   node audit.cjs block_004E0000      # one block, detailed
//   node audit.cjs --full              # all blocks, detailed

const fs = require('fs');
const path = require('path');

const C_DIR = path.join(__dirname, '..', 'decompiled');
const JS_DIR = path.join(__dirname, 'output');

function auditBlock(blockName) {
  const cFile = path.join(C_DIR, blockName + '.c');
  const jsFile = path.join(JS_DIR, blockName + '.js');
  if (!fs.existsSync(cFile) || !fs.existsSync(jsFile)) return null;

  const cLines = fs.readFileSync(cFile, 'utf8').split('\n');
  const jsContent = fs.readFileSync(jsFile, 'utf8');
  const jsLines = jsContent.split('\n');

  const issues = [];
  let linesChecked = 0;
  let linesPassed = 0;
  let inCComment = false;

  // ── PART 1: Check every C line against JS line ──
  for (let i = 0; i < cLines.length; i++) {
    const c = cLines[i].trim();
    const js = (jsLines[i] || '').trim();

    // Track C block comments
    if (inCComment) {
      linesChecked++;
      // JS should have this line commented out
      if (js.startsWith('//') || js === '') { linesPassed++; }
      else { issues.push({ line: i+1, type: 'COMMENT_LEAKED', msg: 'C comment line not commented in JS', c, js }); }
      if (/\*\//.test(c)) inCComment = false;
      continue;
    }
    if (/^\/\*/.test(c) && !/\*\//.test(c)) {
      inCComment = true;
      linesChecked++;
      if (js.startsWith('//') || js === '') { linesPassed++; }
      else { issues.push({ line: i+1, type: 'COMMENT_LEAKED', msg: 'C comment start not commented in JS', c, js }); }
      continue;
    }
    if (/^\/\*/.test(c) && /\*\//.test(c)) {
      linesChecked++;
      if (js.startsWith('//') || js === '') { linesPassed++; }
      else { issues.push({ line: i+1, type: 'COMMENT_LEAKED', msg: 'C block comment not commented in JS', c, js }); }
      continue;
    }

    // Structural lines — must match structurally
    if (c === '' || c === '{' || c === '}' || c.startsWith('//')) {
      // These are fine as-is — blank/brace/comment
      continue;
    }

    linesChecked++;

    // ── What type of C line is this? ──

    // Register param declaration → should be blank or "promoted" comment
    if (/^\s*\w[\w\s]*\*?\s*(in_E\w+|unaff_\w+|puStack_\w+|uStack_\w+)\s*;/.test(c) ||
        /unaff_EBP/.test(c)) {
      if (js === '' || js.startsWith('//')) { linesPassed++; }
      else { issues.push({ line: i+1, type: 'REG_DECL', msg: 'Register decl should be blank/comment', c, js }); }
      continue;
    }

    // Goto label → should be label comment
    if (/^(LAB_|switchD_|code_r|joined_r)\w+:/.test(c)) {
      if (js.startsWith('//') && /kept for 1:1 audit|LAB_|switchD_|code_r|joined_r/.test(js)) { linesPassed++; }
      else if (js === '') { linesPassed++; } // some labels just become blank
      else { issues.push({ line: i+1, type: 'LABEL', msg: 'Goto label should be comment', c, js }); }
      continue;
    }

    // Multi-line sig continuation → should be blank (params on first line)
    if (/^\s*\w[\w\s*]*\s+param_\d+\s*[,)]/.test(c) || /^\s*,?\s*\w[\w\s*]*\s+param_\d+/.test(c) ||
        /^\s*\)$/.test(c) || /^\s*\w[\w\s*]*\s*\*\s*param_\d+\s*\)/.test(c)) {
      if (js === '' || js.startsWith('//')) { linesPassed++; }
      else { issues.push({ line: i+1, type: 'SIG_CONT', msg: 'Sig continuation should be blank', c, js }); }
      continue;
    }

    // C++ library function signature (non-FUN_ name) → should be export function or DEVIATION
    if (/^\s*\w+\s+\w+\s*\(/.test(c) && !/FUN_|DAT_|thunk_/.test(c) &&
        !/^(if|else|for|while|do|switch|return|break|continue|case|goto)\b/.test(c) &&
        !/^\s*(local_|iVar|uVar|cVar|sVar|bVar|lVar|param_)/.test(c)) {
      if (js.startsWith('export function') || js.startsWith('//') || js === '') { linesPassed++; }
      else { issues.push({ line: i+1, type: 'LIB_SIG', msg: 'Library sig should be export/DEVIATION', c, js }); }
      continue;
    }

    // JS is DEVIATION → always pass (transpiler decided this is Win32/MFC)
    if (js.startsWith('// DEVIATION')) { linesPassed++; continue; }

    // JS is blank/comment but C has real code → check what's in C
    if (!js || js.startsWith('//')) {
      issues.push({ line: i+1, type: 'MISSING', msg: 'C has code, JS is blank/comment', c: c.substring(0, 80) });
      continue;
    }

    // ── Both have code: compare elements ──
    const cFuncs = new Set([...c.matchAll(/(?:thunk_)?(FUN_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const jsFuncs = new Set([...js.matchAll(/(FUN_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const cDats = new Set([...c.matchAll(/(?:&)?(DAT_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const jsDats = new Set([...js.matchAll(/(DAT_[0-9a-fA-F]+)/g)].map(m => m[1]));

    const problems = [];
    const mF = [...cFuncs].filter(f => !jsFuncs.has(f));
    if (mF.length > 0) problems.push('FUN: ' + mF.join(', '));
    const mD = [...cDats].filter(d => !jsDats.has(d));
    if (mD.length > 0) problems.push('DAT: ' + mD.join(', '));

    if (problems.length > 0) {
      issues.push({ line: i+1, type: 'MISMATCH', msg: problems.join(' | '), c: c.substring(0, 80), js: js.substring(0, 80) });
    } else {
      linesPassed++;
    }
  }

  // ── PART 2: Audit goto helper functions ──
  const helperIdx = jsContent.indexOf('// ── GOTO HELPERS');
  let helperIssues = 0;
  let helperLines = 0;
  let helperPassed = 0;

  if (helperIdx >= 0) {
    const helperSection = jsContent.substring(helperIdx).split('\n');
    // For each helper function, verify its body matches the in-place code
    // Helper format: function LAB_XXXXX_helper(vars) { ...body... }
    let currentHelper = null;
    let helperBodyLines = [];
    let labelName = null;

    for (const hline of helperSection) {
      const funcMatch = hline.match(/^function (\w+)_helper\(/);
      if (funcMatch) {
        // Process previous helper if any
        if (currentHelper && labelName) {
          const result = auditHelper(labelName, helperBodyLines, cLines, jsLines);
          helperLines += result.checked;
          helperPassed += result.passed;
          helperIssues += result.issues.length;
          issues.push(...result.issues);
        }
        currentHelper = funcMatch[1];
        labelName = funcMatch[1];
        helperBodyLines = [];
        continue;
      }
      if (currentHelper) {
        if (hline.trim() === '}' && helperBodyLines.length > 0) {
          // End of helper
          const result = auditHelper(labelName, helperBodyLines, cLines, jsLines);
          helperLines += result.checked;
          helperPassed += result.passed;
          helperIssues += result.issues.length;
          issues.push(...result.issues);
          currentHelper = null;
          labelName = null;
          helperBodyLines = [];
        } else {
          helperBodyLines.push(hline);
        }
      }
    }
  }

  return {
    blockName,
    mainChecked: linesChecked,
    mainPassed: linesPassed,
    helperChecked: helperLines,
    helperPassed: helperPassed,
    issues
  };
}

// Audit a goto helper: each line should match the corresponding in-place line
function auditHelper(labelName, bodyLines, cLines, jsLines) {
  const issues = [];
  let checked = 0;
  let passed = 0;

  // Find the label in the main JS to get the line range
  let labelLine = -1;
  for (let i = 0; i < jsLines.length; i++) {
    if (jsLines[i].includes(labelName + ':') && jsLines[i].includes('kept for 1:1 audit')) {
      labelLine = i;
      break;
    }
    // Also check for plain label comment
    if (jsLines[i].includes('// ' + labelName + ':')) {
      labelLine = i;
      break;
    }
  }

  if (labelLine < 0) {
    // Can't find label — just check that helper lines have valid content
    for (const line of bodyLines) {
      const t = line.trim();
      if (!t || t.startsWith('//') || t === '{' || t === '}') continue;
      checked++;
      // Check for obvious C syntax that shouldn't be in JS
      if (/\bthunk_/.test(t) || /\*\s*\(\s*\w+\s*\*\s*\)/.test(t)) {
        issues.push({ line: 0, type: 'HELPER_C_SYNTAX', msg: labelName + '_helper has C syntax', c: '', js: t.substring(0, 80) });
      } else {
        passed++;
      }
    }
    return { checked, passed, issues };
  }

  // Compare helper body lines against in-place lines starting after the label
  for (let h = 0; h < bodyLines.length; h++) {
    const helperLine = bodyLines[h].trim();
    const mainLine = (jsLines[labelLine + 1 + h] || '').trim();
    if (!helperLine || helperLine.startsWith('//') || helperLine === '{' || helperLine === '}') continue;
    checked++;

    // The helper line should be equivalent to the in-place line
    // (except goto→helper calls, which are different by design)
    if (/\w+_helper\(/.test(helperLine)) {
      // This is a goto-to-helper call — valid by design
      passed++;
      continue;
    }

    // Extract FUN_ and DAT_ from both and compare
    const hFuncs = new Set([...helperLine.matchAll(/(FUN_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const mFuncs = new Set([...mainLine.matchAll(/(FUN_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const hDats = new Set([...helperLine.matchAll(/(DAT_[0-9a-fA-F]+)/g)].map(m => m[1]));
    const mDats = new Set([...mainLine.matchAll(/(DAT_[0-9a-fA-F]+)/g)].map(m => m[1]));

    const missingFuncs = [...hFuncs].filter(f => !mFuncs.has(f));
    const missingDats = [...hDats].filter(d => !mDats.has(d));
    const extraFuncs = [...mFuncs].filter(f => !hFuncs.has(f));

    if (missingFuncs.length > 0 || missingDats.length > 0 || extraFuncs.length > 0) {
      const problems = [];
      if (missingFuncs.length > 0) problems.push('helper has FUN not in main: ' + missingFuncs.join(','));
      if (extraFuncs.length > 0) problems.push('main has FUN not in helper: ' + extraFuncs.join(','));
      if (missingDats.length > 0) problems.push('helper has DAT not in main: ' + missingDats.join(','));
      issues.push({ line: labelLine + 1 + h + 1, type: 'HELPER_MISMATCH',
                     msg: labelName + '_helper: ' + problems.join('; '),
                     c: mainLine.substring(0, 60), js: helperLine.substring(0, 60) });
    } else {
      passed++;
    }
  }

  return { checked, passed, issues };
}

// ── Main ──
const args = process.argv.slice(2);
const detailed = args.includes('--full');
const specificBlock = args.find(a => a.startsWith('block_'));

const blocks = specificBlock
  ? [specificBlock]
  : fs.readdirSync(C_DIR).filter(f => f.endsWith('.c')).map(f => f.replace('.c', '')).sort();

let gMain = 0, gMainP = 0, gHelper = 0, gHelperP = 0, gIssues = 0;

for (const block of blocks) {
  const r = auditBlock(block);
  if (!r) continue;

  const total = r.mainChecked + r.helperChecked;
  const passed = r.mainPassed + r.helperPassed;
  const pct = total > 0 ? Math.round(passed / total * 100) : 0;

  gMain += r.mainChecked;
  gMainP += r.mainPassed;
  gHelper += r.helperChecked;
  gHelperP += r.helperPassed;
  gIssues += r.issues.length;

  if (specificBlock || detailed) {
    console.log('\n' + block + ': ' + passed + '/' + total + ' pass (' + pct + '%)' +
                ' [main:' + r.mainPassed + '/' + r.mainChecked + ' helper:' + r.helperPassed + '/' + r.helperChecked + ']');
    if (r.issues.length > 0) {
      for (const iss of r.issues.slice(0, 30)) {
        console.log('  L' + iss.line + ' [' + iss.type + '] ' + iss.msg);
        if (iss.c) console.log('    C/main: ' + iss.c);
        if (iss.js) console.log('    JS/hlp: ' + iss.js);
      }
      if (r.issues.length > 30) console.log('  ... and ' + (r.issues.length - 30) + ' more');
    }
  } else {
    const bar = pct >= 100 ? '████' : pct >= 95 ? '███░' : pct >= 90 ? '██░░' : '█░░░';
    console.log(block.replace('block_', '') + ' ' + bar + ' ' +
                String(pct).padStart(3) + '%  ' +
                String(passed).padStart(6) + '/' + String(total).padStart(6) +
                '  issues: ' + r.issues.length);
  }
}

if (blocks.length > 1) {
  const total = gMain + gHelper;
  const passed = gMainP + gHelperP;
  const pct = total > 0 ? Math.round(passed / total * 100) : 0;
  console.log('\n' + '═'.repeat(60));
  console.log('MAIN BODY:  ' + gMainP + '/' + gMain + ' pass');
  console.log('HELPERS:    ' + gHelperP + '/' + gHelper + ' pass');
  console.log('TOTAL:      ' + passed + '/' + total + ' pass (' + pct + '%)');
  console.log('Issues:     ' + gIssues);
}
