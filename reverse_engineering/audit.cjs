#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// audit.cjs — Structural fidelity checker: C vs JS transpilation
//
// Compares decompiled C functions against their JS transpilations
// by counting structural elements (calls, globals, branches, loops).
//
// Usage:
//   node audit.cjs                     # audit all blocks
//   node audit.cjs block_004E0000      # audit one block
//   node audit.cjs --summary           # one-line-per-block summary
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const C_DIR = path.join(__dirname, 'decompiled');
const JS_DIR = path.join(__dirname, 'binary_js');

// ── Parse C functions ──────────────────────────────────────────────
function parseCFunctions(content) {
  const funcs = {};
  // Split on "// ===...===" separator lines
  const parts = content.split(/^\/\/\s*={10,}\s*$/m);

  // Headers and bodies alternate: parts[i] has "// Function: NAME", parts[i+1] has the code
  for (let i = 0; i < parts.length - 1; i++) {
    const header = parts[i];
    const nameMatch = header.match(/Function:\s+(FUN_[0-9a-fA-F]+|handle_\w+|show_\w+)\s/);
    if (!nameMatch) continue;
    const name = nameMatch[1];

    // Body is in the NEXT part (after the closing ====== line)
    const bodyPart = parts[i + 1];
    if (!bodyPart) continue;
    const bodyStart = bodyPart.indexOf('{');
    if (bodyStart < 0) continue;
    const body = bodyPart.substring(bodyStart);

    // Count structural elements
    const calls = new Set();
    for (const m of body.matchAll(/(?:thunk_)?(FUN_[0-9a-fA-F]+)/g)) {
      calls.add(m[1]);
    }

    const dats = new Set();
    for (const m of body.matchAll(/(DAT_[0-9a-fA-F]+)/g)) {
      dats.add(m[1]);
    }

    const ifs = (body.match(/\bif\s*\(/g) || []).length;
    const loops = (body.match(/\b(for|while|do)\s*[\({]/g) || []).length;
    const lines = body.split('\n').filter(l => l.trim().length > 0).length;

    // Check for size marker (in the header)
    const sizeMatch = header.match(/Size:\s*(\d+)\s*bytes/);
    const size = sizeMatch ? parseInt(sizeMatch[1]) : 0;

    funcs[name] = { calls: calls.size, callSet: calls, dats: dats.size, datSet: dats, ifs, loops, lines, size };
  }
  return funcs;
}

// ── Parse JS functions ─────────────────────────────────────────────
function parseJSFunctions(content) {
  const funcs = {};
  const lines = content.split('\n');

  let currentName = null;
  let currentBody = [];
  let braceDepth = 0;
  let inFunction = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect function start
    const funcMatch = line.match(/^export\s+function\s+(FUN_[0-9a-fA-F]+|handle_\w+|show_\w+)\s*\(/);
    if (funcMatch && !inFunction) {
      currentName = funcMatch[1];
      currentBody = [];
      braceDepth = 0;
      inFunction = true;
    }

    if (inFunction) {
      currentBody.push(line);
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }

      if (braceDepth === 0 && currentBody.length > 1) {
        // Function ended
        const body = currentBody.join('\n');

        const calls = new Set();
        for (const m of body.matchAll(/(?<!function\s)(FUN_[0-9a-fA-F]+)\s*\(/g)) {
          calls.add(m[1]);
        }

        const dats = new Set();
        for (const m of body.matchAll(/(DAT_[0-9a-fA-F]+)/g)) {
          dats.add(m[1]);
        }

        const ifs = (body.match(/\bif\s*\(/g) || []).length;
        const loops = (body.match(/\b(for|while|do)\s*[\({]/g) || []).length;
        const bodyLines = currentBody.filter(l => l.trim().length > 0 && !l.trim().startsWith('//')).length;

        // Check for deviation markers
        const isDeviation = /DEVIATION/.test(body);
        const isStub = bodyLines <= 4 && calls.size === 0 && dats.size === 0;

        funcs[currentName] = {
          calls: calls.size, callSet: calls,
          dats: dats.size, datSet: dats,
          ifs, loops, lines: bodyLines,
          isDeviation, isStub,
          startLine: i - currentBody.length + 2
        };

        inFunction = false;
        currentName = null;
      }
    }
  }
  return funcs;
}

// ── Compare one block ──────────────────────────────────────────────
function auditBlock(blockName) {
  const cFile = path.join(C_DIR, blockName + '.c');
  const jsFile = path.join(JS_DIR, blockName + '.js');

  if (!fs.existsSync(cFile) || !fs.existsSync(jsFile)) {
    return { blockName, error: 'missing file' };
  }

  const cFuncs = parseCFunctions(fs.readFileSync(cFile, 'utf8'));
  const jsFuncs = parseJSFunctions(fs.readFileSync(jsFile, 'utf8'));

  const results = {
    blockName,
    cCount: Object.keys(cFuncs).length,
    jsCount: Object.keys(jsFuncs).length,
    pass: 0,
    warn: 0,
    fail: 0,
    missingInJS: 0,
    emptyStubs: 0,
    deviations: 0,
    issues: []
  };

  for (const [name, c] of Object.entries(cFuncs)) {
    const js = jsFuncs[name];

    if (!js) {
      results.missingInJS++;
      results.issues.push({ name, severity: 'MISS', msg: 'Not in JS file' });
      continue;
    }

    if (js.isDeviation) {
      results.deviations++;
      // Still check if surrounding game-state code is present
      if (c.dats > 3 && js.dats === 0) {
        results.fail++;
        results.issues.push({ name, severity: 'FAIL', msg: `DEVIATION but C has ${c.dats} DAT_ refs, JS has 0 — game state code may be missing` });
      } else {
        results.pass++;
      }
      continue;
    }

    if (js.isStub && c.lines > 5) {
      results.emptyStubs++;
      results.issues.push({ name, severity: 'FAIL', msg: `Empty stub — C has ${c.lines} lines, ${c.calls} calls, ${c.dats} DAT_ refs`, cSize: c.size });
      continue;
    }

    // Structural comparison
    const issues = [];

    // Missing function calls
    if (c.calls > 0 && js.calls < c.calls) {
      const missing = [...c.callSet].filter(x => !js.callSet.has(x));
      if (missing.length > 0) {
        issues.push(`Missing ${missing.length}/${c.calls} calls: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`);
      }
    }

    // Missing DAT_ references
    if (c.dats > 0 && js.dats < c.dats * 0.5) {
      const missing = [...c.datSet].filter(x => !js.datSet.has(x));
      if (missing.length > 2) {
        issues.push(`Missing ${missing.length}/${c.dats} DAT_ refs`);
      }
    }

    // Branch count mismatch (significant)
    if (c.ifs > 2 && js.ifs < c.ifs * 0.5) {
      issues.push(`Branches: C=${c.ifs}, JS=${js.ifs}`);
    }

    // Loop count mismatch
    if (c.loops > 0 && js.loops < c.loops) {
      issues.push(`Loops: C=${c.loops}, JS=${js.loops}`);
    }

    // Size mismatch (JS much smaller than C)
    if (c.lines > 10 && js.lines < c.lines * 0.3) {
      issues.push(`Size: C=${c.lines} lines, JS=${js.lines} lines`);
    }

    if (issues.length === 0) {
      results.pass++;
    } else if (issues.some(i => i.startsWith('Missing') && !i.includes('DAT_'))) {
      results.fail++;
      results.issues.push({ name, severity: 'FAIL', msg: issues.join('; '), line: js.startLine });
    } else {
      results.warn++;
      results.issues.push({ name, severity: 'WARN', msg: issues.join('; '), line: js.startLine });
    }
  }

  return results;
}

// ── Main ───────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const summaryMode = args.includes('--summary');
const specificBlock = args.find(a => a.startsWith('block_'));

const blocks = specificBlock
  ? [specificBlock]
  : fs.readdirSync(C_DIR).filter(f => f.endsWith('.c')).map(f => f.replace('.c', '')).sort();

if (summaryMode) {
  console.log('');
  console.log('Block        │ C fn │ JS fn │ Pass │ Warn │ Fail │ Stub │ Dev  │ Miss │ Score');
  console.log('─────────────┼──────┼───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────');
}

let grandPass = 0, grandWarn = 0, grandFail = 0, grandStub = 0, grandTotal = 0;

for (const block of blocks) {
  const r = auditBlock(block);
  if (r.error) continue;

  const total = r.pass + r.warn + r.fail + r.emptyStubs + r.deviations + r.missingInJS;
  const score = total > 0 ? Math.round((r.pass + r.deviations) / total * 100) : 0;

  grandPass += r.pass + r.deviations;
  grandWarn += r.warn;
  grandFail += r.fail + r.emptyStubs;
  grandStub += r.emptyStubs;
  grandTotal += total;

  if (summaryMode) {
    const bar = score >= 90 ? '██' : score >= 70 ? '▓░' : score >= 50 ? '░░' : '  ';
    console.log(
      block.replace('block_', '').padEnd(13) + '│ ' +
      String(r.cCount).padStart(4) + ' │ ' +
      String(r.jsCount).padStart(5) + ' │ ' +
      String(r.pass).padStart(4) + ' │ ' +
      String(r.warn).padStart(4) + ' │ ' +
      String(r.fail).padStart(4) + ' │ ' +
      String(r.emptyStubs).padStart(4) + ' │ ' +
      String(r.deviations).padStart(4) + ' │ ' +
      String(r.missingInJS).padStart(4) + ' │ ' +
      (score + '%').padStart(4) + ' ' + bar
    );
  } else {
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`${block}: ${r.cCount} C functions, ${r.jsCount} JS functions`);
    console.log(`  PASS: ${r.pass}  WARN: ${r.warn}  FAIL: ${r.fail}  STUBS: ${r.emptyStubs}  DEV: ${r.deviations}  MISS: ${r.missingInJS}`);

    const fails = r.issues.filter(i => i.severity === 'FAIL');
    const warns = r.issues.filter(i => i.severity === 'WARN');

    if (fails.length > 0) {
      console.log(`\n  FAILURES:`);
      for (const f of fails.slice(0, 15)) {
        console.log(`    ${f.name}${f.line ? ':' + f.line : ''}: ${f.msg}`);
      }
      if (fails.length > 15) console.log(`    ... and ${fails.length - 15} more`);
    }
    if (warns.length > 0) {
      console.log(`\n  WARNINGS:`);
      for (const w of warns.slice(0, 10)) {
        console.log(`    ${w.name}${w.line ? ':' + w.line : ''}: ${w.msg}`);
      }
      if (warns.length > 10) console.log(`    ... and ${warns.length - 10} more`);
    }
  }
}

if (summaryMode) {
  console.log('─────────────┼──────┼───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────');
  const grandScore = grandTotal > 0 ? Math.round(grandPass / grandTotal * 100) : 0;
  console.log(
    'TOTAL        │      │       │ ' +
    String(grandPass).padStart(4) + ' │ ' +
    String(grandWarn).padStart(4) + ' │ ' +
    String(grandFail).padStart(4) + ' │ ' +
    String(grandStub).padStart(4) + ' │      │      │ ' +
    (grandScore + '%').padStart(4)
  );
  console.log('');
  console.log(`Pass = structure matches C.  Warn = minor discrepancy.  Fail = missing calls/logic.`);
  console.log(`Stub = empty body where C has code.  Dev = Win32/MFC DEVIATION (expected).`);
  console.log(`Score = (Pass + Dev) / Total — higher is better.`);
  console.log('');
}
