#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// generate-imports.cjs — Auto-generate ES module imports for each
// transpiler output block based on what functions/helpers it uses.
//
// Scans each block_*.js for:
//   - mem.js helpers (v, wv, s16, w32, _MEM, etc.)
//   - CRT functions (_rand, _strcmp, _memset, etc.)
//   - extern stubs (Win32 API stubs)
//   - cross-block function calls (FUN_XXXXXXXX from other blocks)
//   - DAT_ globals (from globals-init.js)
//
// Rewrites each file with proper import statements at the top.
//
// Usage: node generate-imports.cjs
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'output');
const BLOCKS_DIR = path.join(__dirname, '..', '..', 'charlizationv4', 'blocks');

// ── Known exports from each support module ──
const MEM_EXPORTS = new Set([
  'v', 'wv', 'w16', 'w32', 'w16r', 'w32r', 's8', 'u8', 's16', 'u16', 's32', 'u32',
  'ptrAdd', '_MEM', 'loopGuard', 'loopReset', 'G'
]);

// Build CRT exports by scanning crt.js
const CRT_PATH = path.join(__dirname, '..', '..', 'charlizationv4', 'crt.js');
const CRT_EXPORTS = new Set();
if (fs.existsSync(CRT_PATH)) {
  const crtSrc = fs.readFileSync(CRT_PATH, 'utf8');
  const re = /export function (\w+)/g;
  let m;
  while ((m = re.exec(crtSrc)) !== null) CRT_EXPORTS.add(m[1]);
}

// Build extern-stubs exports
const STUBS_PATH = path.join(__dirname, '..', '..', 'charlizationv4', 'extern-stubs.js');
const STUBS_EXPORTS = new Set();
if (fs.existsSync(STUBS_PATH)) {
  const stubsSrc = fs.readFileSync(STUBS_PATH, 'utf8');
  const re = /export function (\w+)/g;
  let m;
  while ((m = re.exec(stubsSrc)) !== null) STUBS_EXPORTS.add(m[1]);
}

// Build devlog exports
const DEVLOG_EXPORTS = new Set(['devLog']);

// ── Scan all blocks to build export maps ──
const blockFiles = fs.readdirSync(OUTPUT_DIR)
  .filter(f => f.startsWith('block_') && f.endsWith('.js'))
  .sort();

// Map: functionName → blockFile
const funcToBlock = new Map();
for (const file of blockFiles) {
  const src = fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf8');
  const re = /^export function (\w+)/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    funcToBlock.set(m[1], file);
  }
}

console.log(`Scanned ${blockFiles.length} blocks, ${funcToBlock.size} exported functions`);

// ── Process each block ──
for (const file of blockFiles) {
  const filePath = path.join(OUTPUT_DIR, file);
  let src = fs.readFileSync(filePath, 'utf8');

  // Find all identifiers used in this file
  const usedFunctions = new Set();
  const usedMem = new Set();
  const usedCrt = new Set();
  const usedStubs = new Set();
  const usedDevlog = new Set();

  // Extract all word-boundary identifiers
  const identRe = /\b(\w+)\b/g;
  let im;
  while ((im = identRe.exec(src)) !== null) {
    const id = im[1];
    if (MEM_EXPORTS.has(id)) usedMem.add(id);
    if (CRT_EXPORTS.has(id)) usedCrt.add(id);
    if (STUBS_EXPORTS.has(id)) usedStubs.add(id);
    if (DEVLOG_EXPORTS.has(id)) usedDevlog.add(id);
    // Cross-block function calls
    if (/^FUN_[0-9a-fA-F]+$/.test(id) || /^[a-z_]+_[0-9A-F]+$/.test(id)) {
      const defBlock = funcToBlock.get(id);
      if (defBlock && defBlock !== file) {
        usedFunctions.add(id);
      }
    }
  }

  // Also check for DAT_ globals (need globals-init.js)
  const usesDAT = /\bDAT_[0-9a-fA-F]+\b/.test(src);
  const usesGlobalThis = /\bglobalThis\b/.test(src);

  // ── Build import statements ──
  const imports = [];

  // globals-init.js (always needed if DAT_ globals are used)
  if (usesDAT || usesGlobalThis) {
    imports.push("import '../globals-init.js';");
  }

  // mem.js (G is from globals.js, not mem.js)
  if (usedMem.size > 0) {
    usedMem.delete('G');
    if (usedMem.size > 0) {
      const sorted = [...usedMem].sort();
      imports.push(`import { ${sorted.join(', ')} } from '../mem.js';`);
    }
  }
  // globals.js — G is used for G._MEM
  if (/\bG\._MEM\b|\bG\.DAT_/.test(src)) {
    imports.push("import { G } from '../globals.js';");
  }

  // devlog.js
  if (usedDevlog.size > 0) {
    imports.push(`import { ${[...usedDevlog].join(', ')} } from '../devlog.js';`);
  }

  // crt.js
  if (usedCrt.size > 0) {
    const sorted = [...usedCrt].sort();
    // Split into lines of ~6 imports each
    for (let i = 0; i < sorted.length; i += 6) {
      imports.push(`import { ${sorted.slice(i, i + 6).join(', ')} } from '../crt.js';`);
    }
  }

  // extern-stubs.js
  if (usedStubs.size > 0) {
    const sorted = [...usedStubs].sort();
    for (let i = 0; i < sorted.length; i += 6) {
      imports.push(`import { ${sorted.slice(i, i + 6).join(', ')} } from '../extern-stubs.js';`);
    }
  }

  // Cross-block imports (including aliased named functions)
  const blockImports = new Map(); // blockFile → Map of importName → exportName
  for (const func of usedFunctions) {
    const defBlock = funcToBlock.get(func);
    if (!defBlock) continue;
    if (!blockImports.has(defBlock)) blockImports.set(defBlock, new Map());
    blockImports.get(defBlock).set(func, func); // same name
  }

  // Find aliased functions: called as shortName, exported as shortName_ADDRESS
  const calledFuncs = new Set();
  const callRe2 = /\b([a-zA-Z_]\w*)\s*\(/g;
  let cm2;
  while ((cm2 = callRe2.exec(src)) !== null) calledFuncs.add(cm2[1]);

  for (const calledName of calledFuncs) {
    if (funcToBlock.has(calledName)) continue; // already handled
    if (MEM_EXPORTS.has(calledName) || CRT_EXPORTS.has(calledName) || STUBS_EXPORTS.has(calledName)) continue;
    if (/^(if|for|while|do|switch|return|function|export|import|let|const|var|new|typeof|catch|delete|throw|try|finally|class|extends|super|yield|await|this|with|debugger|void|in|of|instanceof|default|break|continue|case|loopGuard|loopReset|devLog|Array|Math|String|Object|console|parseInt|setTimeout|setInterval|JSON|Date|Error|Buffer|Uint8Array|Set|Map|Number|Boolean|RegExp|Promise|globalThis|true|false|null|undefined|NaN|Infinity)$/.test(calledName)) continue;

    // Search for an export that starts with this name + '_'
    for (const [expName, expBlock] of funcToBlock) {
      if (expName.startsWith(calledName + '_') && expBlock !== file) {
        if (!blockImports.has(expBlock)) blockImports.set(expBlock, new Map());
        blockImports.get(expBlock).set(calledName, expName); // alias: expName as calledName
        break;
      }
    }
  }

  for (const [block, funcs] of [...blockImports.entries()].sort()) {
    const entries = [...funcs.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    for (let i = 0; i < entries.length; i += 6) {
      const chunk = entries.slice(i, i + 6).map(([local, exported]) => {
        return local === exported ? local : `${exported} as ${local}`;
      });
      imports.push(`import { ${chunk.join(', ')} } from './${block}';`);
    }
  }

  // Intra-block aliases handled by transpiler (name_ADDRESS renaming at call sites)

  // ── Prepend imports to file ──
  // Remove existing comment header (first few lines before first function)
  const firstFunc = src.indexOf('export function ');
  const firstComment = src.indexOf('// ====');
  const insertPoint = Math.min(
    firstFunc >= 0 ? firstFunc : src.length,
    firstComment >= 0 ? firstComment : src.length
  );

  const header = src.substring(0, insertPoint).trim();
  const body = src.substring(insertPoint);

  const newSrc = header + '\n\n' + imports.join('\n') + '\n\n' + body;

  // Write to BLOCKS_DIR (not OUTPUT_DIR — output stays 1:1 with C)
  const blocksPath = path.join(BLOCKS_DIR, file);
  fs.writeFileSync(blocksPath, newSrc);

  console.log(`${file}: ${imports.length} import lines, ${usedFunctions.size} cross-block refs`);
}

console.log('\nDone — blocks/ updated with imports');
