#!/usr/bin/env node
// wire-pcode.cjs — Wire P-code transpiler output for charlizationv4 runtime
//
// Reads:  reverse_engineering/transpiler/output-ghidra/block_*.js
// Writes: charlizationv4/blocks/block_*.js (overwrites!)
//
// For each block:
// 1. Scans for exported functions → builds cross-block registry
// 2. Scans for FUN_, DAT_, PTR_, s_ references used but not defined locally
// 3. Generates import statements for cross-block functions
// 4. Generates const bindings for DAT_/PTR_/s_ globals (from globalThis)
// 5. Adds mem.js + globals-init.js imports
//
// Usage: node reverse_engineering/ghidra/wire-pcode.cjs

const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'transpiler', 'output-ghidra');
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'charlizationv4', 'blocks');
const FN_UTILS_PATH = path.join(__dirname, '..', '..', 'charlizationv4', 'fn_utils.js');
const CRT_PATH = path.join(__dirname, '..', '..', 'charlizationv4', 'crt.js');
const EXTERN_PATH = path.join(__dirname, '..', '..', 'charlizationv4', 'extern-stubs.js');

// ── Step 1: Build function registry ──────────────────────────────

console.log('Building function registry...');

const registry = new Map(); // FUN_xxx → block filename
const blockFiles = fs.readdirSync(INPUT_DIR)
  .filter(f => f.startsWith('block_') && f.endsWith('.js'))
  .sort();

for (const file of blockFiles) {
  const src = fs.readFileSync(path.join(INPUT_DIR, file), 'utf8');
  const re = /^\s*export function (\w+)\s*\(/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    registry.set(m[1], file);
  }
}
console.log(`  ${registry.size} exported functions across ${blockFiles.length} blocks`);

// Collect fn_utils exports (imported separately)
const fnUtilsFns = new Set();
if (fs.existsSync(FN_UTILS_PATH)) {
  const src = fs.readFileSync(FN_UTILS_PATH, 'utf8');
  const re = /^export function (\w+)\s*\(/gm;
  let m;
  while ((m = re.exec(src)) !== null) fnUtilsFns.add(m[1]);
}

// Collect crt.js exports
const crtFns = new Set();
if (fs.existsSync(CRT_PATH)) {
  const src = fs.readFileSync(CRT_PATH, 'utf8');
  const re = /^export (?:function|const|let|var) (\w+)/gm;
  let m;
  while ((m = re.exec(src)) !== null) crtFns.add(m[1]);
}

// Collect extern-stubs.js exports
const externFns = new Set();
if (fs.existsSync(EXTERN_PATH)) {
  const src = fs.readFileSync(EXTERN_PATH, 'utf8');
  const re = /^export (?:function|const|let|var) (\w+)/gm;
  let m;
  while ((m = re.exec(src)) !== null) externFns.add(m[1]);
}

// ── Step 2: Process each block ───────────────────────────────────

console.log('\nWiring blocks...');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

let totalWired = 0;
let totalGlobals = 0;

for (const file of blockFiles) {
  const src = fs.readFileSync(path.join(INPUT_DIR, file), 'utf8');

  // Find all exported functions in THIS block
  const localFns = new Set();
  const exportRe = /^\s*export function (\w+)\s*\(/gm;
  let m;
  while ((m = exportRe.exec(src)) !== null) {
    localFns.add(m[1]);
  }

  // Find all FUN_ references (called but not defined locally)
  const calledFns = new Set();
  const callRe = /\b(FUN_[0-9a-fA-F]+)\b/g;
  while ((m = callRe.exec(src)) !== null) {
    const name = m[1];
    if (!localFns.has(name)) calledFns.add(name);
  }
  // Also find FID_conflict and other non-FUN_ function references
  const otherCallRe = /\b(FID_conflict_\w+|_strcmp|_memcpy|_memset|_rand|_srand|_sprintf|_printf|_atoi|_strlen|_strcpy|_strcat|_strncpy|_stricmp|_strncmp)\b/g;
  while ((m = otherCallRe.exec(src)) !== null) {
    if (!localFns.has(m[1])) calledFns.add(m[1]);
  }

  // Find all DAT_/PTR_/s_ globals used
  const globals = new Set();
  const globalRe = /\b(DAT_[0-9a-fA-F]+|PTR_[^\s(,;]+|s_[^\s(,;]+)\b/g;
  while ((m = globalRe.exec(src)) !== null) {
    globals.add(m[1]);
  }

  // ── Build imports ──

  // Cross-block function imports
  const importsByBlock = new Map();
  const fnUtilsImports = [];
  const crtImports = [];
  const externImports = [];
  const unresolved = [];

  for (const fn of calledFns) {
    if (fnUtilsFns.has(fn)) {
      fnUtilsImports.push(fn);
    } else if (crtFns.has(fn)) {
      crtImports.push(fn);
    } else if (externFns.has(fn)) {
      externImports.push(fn);
    } else {
      const srcBlock = registry.get(fn);
      if (srcBlock && srcBlock !== file) {
        if (!importsByBlock.has(srcBlock)) importsByBlock.set(srcBlock, []);
        importsByBlock.get(srcBlock).push(fn);
      } else if (!srcBlock) {
        unresolved.push(fn);
      }
    }
  }

  // ── Build output ──

  const out = [];

  // Header
  out.push(`// Block ${file.replace('.js', '')} — P-code transpiler output (wired)`);
  out.push(`// Source: civ2.exe (Civilization II MGE)`);
  out.push(`// Functions: ${localFns.size}`);
  out.push('');

  // Globals init
  out.push("import '../globals-init.js';");

  // mem.js
  out.push("import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';");

  // fn_utils
  if (fnUtilsImports.length > 0) {
    out.push(`import { ${fnUtilsImports.sort().join(', ')} } from '../fn_utils.js';`);
  }

  // crt
  if (crtImports.length > 0) {
    out.push(`import { ${crtImports.sort().join(', ')} } from '../crt.js';`);
  }

  // extern-stubs
  if (externImports.length > 0) {
    out.push(`import { ${externImports.sort().join(', ')} } from '../extern-stubs.js';`);
  }

  // Cross-block
  for (const [srcBlock, fns] of [...importsByBlock.entries()].sort()) {
    const sorted = fns.sort();
    for (let i = 0; i < sorted.length; i += 6) {
      out.push(`import { ${sorted.slice(i, i + 6).join(', ')} } from './${srcBlock}';`);
    }
  }

  // Unresolved (as comments)
  if (unresolved.length > 0) {
    out.push(`// Unresolved: ${unresolved.sort().join(', ')}`);
  }

  out.push('');

  // DAT_ global bindings (6 per line)
  const sortedGlobals = [...globals].sort();
  for (let i = 0; i < sortedGlobals.length; i += 6) {
    const chunk = sortedGlobals.slice(i, i + 6);
    out.push('const ' + chunk.map(g => `${g} = globalThis.${g}`).join(', ') + ';');
  }
  if (sortedGlobals.length > 0) out.push('');

  // Strip the P-code transpiler's own header and import line, keep the functions
  const srcLines = src.split('\n');
  let bodyStart = 0;
  for (let i = 0; i < srcLines.length; i++) {
    if (srcLines[i].startsWith('export function') || srcLines[i].match(/^\s+export function/)) {
      bodyStart = i;
      break;
    }
    // Also catch comment-only functions
    if (srcLines[i].startsWith('// DECOMPILE_FAILED') || srcLines[i].startsWith('// NO_AST')) {
      bodyStart = i;
      break;
    }
  }

  // Add the function bodies
  for (let i = bodyStart; i < srcLines.length; i++) {
    out.push(srcLines[i]);
  }

  // Write output
  const outPath = path.join(OUTPUT_DIR, file);
  fs.writeFileSync(outPath, out.join('\n'));

  const wired = importsByBlock.size > 0 ? [...importsByBlock.values()].reduce((s, a) => s + a.length, 0) : 0;
  totalWired += wired;
  totalGlobals += sortedGlobals.length;

  if (wired > 0 || unresolved.length > 0) {
    console.log(`  ${file}: ${wired} imports, ${sortedGlobals.length} globals${unresolved.length > 0 ? `, ${unresolved.length} unresolved` : ''}`);
  }
}

console.log(`\nDone: ${totalWired} cross-block imports, ${totalGlobals} global bindings`);
