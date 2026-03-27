#!/usr/bin/env node
// transform.js — One-time script to generate charlizationv4 from binary_js
// Run: node charlizationv4/transform.js

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'reverse_engineering', 'transpiler', 'output');
const dstDir = __dirname;
const blocksDir = path.join(dstDir, 'blocks');

// ═══════════════════════════════════════════════════════════════════
// Step 1: Collect all unique DAT_ globals from all block files
// ═══════════════════════════════════════════════════════════════════

const memJsSrc = fs.readFileSync(path.join(srcDir, 'mem.js'), 'utf8');

const blockFiles = fs.readdirSync(srcDir)
  .filter(f => f.startsWith('block_') && f.endsWith('.js'))
  .sort();

// name → clean JS value string
const allGlobals = new Map();

// Get mem.js exports first (canonical)
for (const line of memJsSrc.split('\n')) {
  const m = line.match(/^export (?:let|const) (DAT_[0-9a-fA-F]+(?:_\w+)?)\s*=\s*(.+?)\s*;?\s*$/);
  if (m) {
    allGlobals.set(m[1], cleanValue(m[2]));
  }
}

// Scan all block files
for (const blockFile of blockFiles) {
  const src = fs.readFileSync(path.join(srcDir, blockFile), 'utf8');
  for (const line of src.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('let DAT_')) continue;

    // Handle multi-variable declarations: let DAT_a = 0, DAT_b = 0;
    const stripped = trimmed.replace(/^let\s+/, '').replace(/;?\s*$/, '');
    const parts = stripped.split(/,\s*(?=DAT_)/);
    for (const part of parts) {
      const m = part.match(/^(DAT_[0-9a-fA-F]+(?:_val)?)\s*=\s*(.+)$/);
      if (m) {
        const name = m[1];
        const val = cleanValue(m[2]);
        if (!allGlobals.has(name) || (allGlobals.get(name) === '0' && val !== '0')) {
          allGlobals.set(name, val);
        }
      }
    }
  }
}

function cleanValue(v) {
  v = v.replace(/\/\/.*$/, '');   // strip inline comments first
  v = v.trim();
  v = v.replace(/;+$/, '');      // strip trailing semicolons
  return v.trim();
}

// ═══════════════════════════════════════════════════════════════════
// Step 2: Identify sub-views into major memory regions
// ═══════════════════════════════════════════════════════════════════

const bufferBases = {
  'DAT_006560f0': { size: '2048 * 0x20', type: 'Uint8Array', maxOffset: 2048 * 0x20 },
  'DAT_0064c600': { size: '8 * 0x594', type: 'Uint8Array', maxOffset: 8 * 0x594 },
  'DAT_0064f340': { size: '256 * 0x58', type: 'Uint8Array', maxOffset: 256 * 0x58 },
  'DAT_0064b1bc': { size: '52 * 0x14', type: 'Uint8Array', maxOffset: 52 * 0x14 },
  'DAT_00627cc0': { size: '11 * 0x18', type: 'Uint8Array', maxOffset: 11 * 0x18 },
};

const subViews = {};

// Manually define known sub-views with correct offsets
const knownSubViews = {
  // Unit fields (base 0x006560f0)
  'DAT_006560f2': { parent: 'DAT_006560f0', offset: 2 },
  'DAT_006560f4': { parent: 'DAT_006560f0', offset: 4 },
  'DAT_006560f6': { parent: 'DAT_006560f0', offset: 6 },
  'DAT_006560f7': { parent: 'DAT_006560f0', offset: 7 },
  'DAT_006560f8': { parent: 'DAT_006560f0', offset: 8 },
  'DAT_006560f9': { parent: 'DAT_006560f0', offset: 9 },
  'DAT_006560fa': { parent: 'DAT_006560f0', offset: 0xa },
  'DAT_006560fb': { parent: 'DAT_006560f0', offset: 0xb },
  'DAT_006560fc': { parent: 'DAT_006560f0', offset: 0xc },
  'DAT_006560fd': { parent: 'DAT_006560f0', offset: 0xd },
  'DAT_006560fe': { parent: 'DAT_006560f0', offset: 0xe },
  'DAT_006560ff': { parent: 'DAT_006560f0', offset: 0xf },
  'DAT_00656100': { parent: 'DAT_006560f0', offset: 0x10 },
  'DAT_00656102': { parent: 'DAT_006560f0', offset: 0x12 },
  'DAT_00656104': { parent: 'DAT_006560f0', offset: 0x14 },
  'DAT_00656106': { parent: 'DAT_006560f0', offset: 0x16 },
  'DAT_00656108': { parent: 'DAT_006560f0', offset: 0x18 },
  'DAT_0065610a': { parent: 'DAT_006560f0', offset: 0x1a },
  // Civ data sub-views (base 0x0064c600)
  'DAT_0064c6b5': { parent: 'DAT_0064c600', offset: 0xb5 },
  'DAT_0064c6f8': { parent: 'DAT_0064c600', offset: 0xf8 },
  // Terrain sub-views (base 0x00627cc0)
  'DAT_00627cce': { parent: 'DAT_00627cc0', offset: 0xe },
  'DAT_00627cd4': { parent: 'DAT_00627cc0', offset: 0x14 },
  'DAT_00627cd5': { parent: 'DAT_00627cc0', offset: 0x15 },
};

Object.assign(subViews, knownSubViews);

// Auto-detect additional sub-views from globals
for (const [name, val] of allGlobals) {
  if (name in bufferBases || name in subViews) continue;
  const addrStr = name.replace('DAT_', '').replace('_val', '');
  const addr = parseInt(addrStr, 16);
  if (isNaN(addr)) continue;

  for (const [baseName, info] of Object.entries(bufferBases)) {
    const baseAddr = parseInt(baseName.replace('DAT_', ''), 16);
    const offset = addr - baseAddr;
    if (offset > 0 && offset < info.maxOffset) {
      // Only treat as sub-view if initialized as 0 or empty array
      if (val === '0' || val === '[]' || val.startsWith('new Array(')) {
        subViews[name] = { parent: baseName, offset };
        break;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// Step 3: Skip globals.js generation — use build-globals.cjs instead
// (build-globals.cjs creates the flat memory model globals.js)
// ═══════════════════════════════════════════════════════════════════
if (true) { // skip to step 4
  console.log('Skipping globals.js (use build-globals.cjs for flat memory model)');
} else {
// ═══════════════════════════════════════════════════════════════════

const specialArrays = ['DAT_0062833c', 'DAT_00628344', 'DAT_00628350', 'DAT_00628360', 'DAT_006d1188'];
const specialAndBase = new Set([...Object.keys(bufferBases), ...specialArrays, ...Object.keys(subViews)]);

let globalsCode = `// ═══════════════════════════════════════════════════════════════════
// globals.js — ALL mutable game state for Civ2 MGE binary transpilation
//
// Single shared object accessed as G.DAT_xxx from all modules.
// This is the v4 equivalent of the binary's global data segment.
// ═══════════════════════════════════════════════════════════════════

export const G = {
  // ── Internal state ──
  _tileData: null,

  // ═══ Major memory regions (flat typed arrays) ═══
`;

for (const [name, info] of Object.entries(bufferBases).sort()) {
  globalsCode += `  ${name}: new ${info.type}(${info.size}),\n`;
}

globalsCode += `
  // ═══ Direction offset tables ═══
  DAT_0062833c: new Int8Array([0, 2, 0, -2, 0]),
  DAT_00628344: new Int8Array([-2, 0, 2, 0, 0]),
  DAT_00628350: new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1]),
  DAT_00628360: new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1]),
  DAT_006d1188: new Uint8Array(6),

  // ═══ Scalar globals ═══
`;

const sortedGlobals = [...allGlobals.entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [name, val] of sortedGlobals) {
  if (specialAndBase.has(name)) continue;
  globalsCode += `  ${name}: ${val},\n`;
}

globalsCode += `};\n\n`;

// Sub-views (created after G object)
globalsCode += `// ═══ Sub-views into major memory regions ═══\n`;
globalsCode += `// These share the same underlying ArrayBuffer.\n`;
globalsCode += `// G.DAT_006560f2[i] === G.DAT_006560f0[i + 2], etc.\n\n`;

const sortedViews = Object.entries(subViews).sort((a, b) => a[0].localeCompare(b[0]));
for (const [name, info] of sortedViews) {
  globalsCode += `G.${name} = new Uint8Array(G.${info.parent}.buffer, ${info.offset});\n`;
}

// globals.js generation disabled — use build-globals.cjs instead
// fs.writeFileSync(path.join(dstDir, 'globals.js'), globalsCode);
// console.log(`Generated globals.js`);
}

// ═══════════════════════════════════════════════════════════════════
// Step 4: Transform block files
// ═══════════════════════════════════════════════════════════════════

// The DAT_ replacement regex:
// - Must NOT match _DAT_, PTR_DAT_, or other prefixed forms
// - Must NOT match inside string literals (single quotes)
// - The lookbehind excludes: letters, digits (not typical), underscore, dot, single quote
const DAT_REPLACE_RE = /(?<![.'_a-zA-Z])DAT_([0-9a-fA-F]+(?:_val)?)\b/g;

fs.mkdirSync(blocksDir, { recursive: true });
let totalTransformed = 0;

// Scalar classification no longer needed — globalThis handles all DAT_ access

// ── Build function registry: FUN_xxx → which block file exports it ──
const fnRegistry = new Map();
for (const file of blockFiles) {
  const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const re = /^export function (\w+)\s*\(/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    fnRegistry.set(m[1], file);
  }
}
// Also build alias map: base_name → address_suffixed_name
// e.g., kill_civ → kill_civ_004AA378, thunk_kill_civ → kill_civ_004AA378
const nameAliases = new Map();
for (const [name, file] of fnRegistry) {
  if (/^FUN_/.test(name)) continue;
  const m = name.match(/^(.+)_([0-9a-fA-F]{8})$/);
  if (m) {
    const baseName = m[1];
    nameAliases.set(baseName, name);
    // Also map thunk_ prefixed version (transpiler only drops thunk_ for FUN_ names)
    nameAliases.set('thunk_' + baseName, name);
  }
}
console.log(`Registry: ${fnRegistry.size} functions, ${nameAliases.size} name aliases`);

// ── Build crt.js export set (C runtime functions with real implementations) ──
const crtExports = new Set();
const crtPath = path.join(__dirname, 'crt.js');
if (fs.existsSync(crtPath)) {
  const crtSrc = fs.readFileSync(crtPath, 'utf8');
  for (const m of crtSrc.matchAll(/^export function (\w+)\s*\(/gm)) {
    crtExports.add(m[1]);
  }
  console.log(`CRT functions: ${crtExports.size}`);
}

// ── Build fn_utils export set (skip these from cross-block wiring) ──
const fnUtilsExports = new Set();
const fnUtilsSrc = fs.readFileSync(path.join(srcDir, 'fn_utils.js'), 'utf8');
const fnRe = /^export function (\w+)\s*\(/gm;
let fm;
while ((fm = fnRe.exec(fnUtilsSrc)) !== null) fnUtilsExports.add(fm[1]);

// Track all external stubs needed across all blocks
const allExternStubs = new Set();

for (const blockFile of blockFiles) {
  const src = fs.readFileSync(path.join(srcDir, blockFile), 'utf8');
  const lines = src.split('\n');
  const outLines = [];

  // Phase 1: Filter lines, removing old imports and DAT_ declarations
  let inMultiLineImport = false;
  let multiLineImportFrom = '';
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle multi-line import continuation
    if (inMultiLineImport) {
      braceDepth += (trimmed.match(/\{/g) || []).length;
      braceDepth -= (trimmed.match(/\}/g) || []).length;
      if (braceDepth <= 0 || trimmed.includes('from ')) {
        inMultiLineImport = false;
      }
      continue; // Skip all lines of the import block
    }

    // Skip `let DAT_xxx = ...` declarations
    if (/^let DAT_[0-9a-fA-F]/.test(trimmed)) {
      continue;
    }

    // Skip `import ... from './mem.js'`
    if (trimmed.startsWith('import ') && trimmed.includes("'./mem.js'")) {
      if (trimmed.includes('{') && !trimmed.includes('}')) {
        // Multi-line import starting
        inMultiLineImport = true;
        braceDepth = (trimmed.match(/\{/g) || []).length - (trimmed.match(/\}/g) || []).length;
      }
      continue;
    }

    // Skip multi-line imports from mem.js or fn_utils.js
    if (trimmed.startsWith('import {') && !trimmed.includes('from ')) {
      let j = i + 1;
      let block = trimmed;
      while (j < lines.length && !lines[j].includes('from ')) {
        block += lines[j].trim();
        j++;
      }
      if (j < lines.length) block += lines[j].trim();
      if (block.includes("'./mem.js'") || block.includes("'./fn_utils.js'")) {
        i = j;
        continue;
      }
    }

    // Skip single-line `import ... from './fn_utils.js'`
    if (trimmed.startsWith('import ') && trimmed.includes("'./fn_utils.js'")) {
      continue;
    }

    // Skip local ri/wi/rs/ws/w8 declarations (provided by transform imports)
    if (/^(function|const|let|var)\s+(ri|wi|rs|ws|w8|ri32|wi32|rs16|rs32)\b/.test(trimmed)) {
      // Skip function body if multi-line
      let depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      while (depth > 0 && i + 1 < lines.length) {
        i++;
        depth += (lines[i].match(/\{/g) || []).length;
        depth -= (lines[i].match(/\}/g) || []).length;
      }
      continue;
    }

    // Skip `function stub(name) { ... }` definition
    if (trimmed.startsWith('function stub(name)')) {
      let depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      while (depth > 0 && i + 1 < lines.length) {
        i++;
        depth += (lines[i].match(/\{/g) || []).length;
        depth -= (lines[i].match(/\}/g) || []).length;
      }
      continue;
    }

    // Skip `const FUN_xxx = stub('...')` declarations
    if (/^const FUN_[0-9a-fA-F]+\s*=\s*stub\(/.test(trimmed)) {
      continue;
    }

    outLines.push(line);
  }

  // Phase 2: Transform code lines
  // With globalThis approach, DAT_ identifiers resolve automatically.
  // Only transform: DEVIATION → devLog(), and _DAT_ → DAT_ fixup.
  const finalLines = [];
  for (const line of outLines) {
    const trimmed = line.trim();
    let processed = line;
    const indent = line.match(/^(\s*)/)[1];

    // 2a: Replace DEVIATION lines with devLog() calls
    if (/^\s*\/\/ DEVIATION:\s/.test(processed)) {
      const dm = trimmed.match(/^\/\/ DEVIATION:\s*(\w+)(?:\s*—\s*(.*))?$/);
      if (dm) {
        const cat = dm[1] || 'unknown';
        const desc = (dm[2] || '').replace(/'/g, "\\'").substring(0, 120);
        processed = indent + "devLog('" + cat + "', '" + desc + "');";
      }
    }
    else if (/true\s*\/\* DEVIATION:/.test(processed)) {
      processed = processed.replace(
        /true\s*\/\* DEVIATION:\s*(\w+)(?:\s*—\s*(.*?))?\s*\*\//g,
        (m, cat, desc) => {
          const d = (desc || '').replace(/'/g, "\\'").substring(0, 120);
          return "devLog('" + cat + "', '" + d + "')";
        }
      );
    }

    if (!trimmed.startsWith('//') && trimmed !== '/*JOINED*/' && !/^\/\*/.test(trimmed)) {
      // 2b: Fix _DAT_ references (transpiler artifact)
      processed = processed.replace(/\b_DAT_([0-9a-fA-F]+)\b/g, 'DAT_$1');

      // 2c: Register parameter defaults in function signatures
      if (/^export function \w+\(/.test(trimmed)) {
        processed = processed.replace(/\b(in_ECX)(?=[\s,)])/g, '$1 = globalThis.in_ECX');
        processed = processed.replace(/\b(in_EAX)(?=[\s,)])/g, '$1 = globalThis.in_EAX');
        processed = processed.replace(/\b(in_EDX)(?=[\s,)])/g, '$1 = globalThis.in_EDX');
      }

      // 2d: Fix bool returns: return expr !== 0 → return (expr !== 0) ? 1 : 0
      // In C, bool is an integer (0 or 1). In JS, !== produces a boolean.
      // When the caller checks result !== 0, boolean !== 0 is always true.
      if (/return\s+.*!==\s*0\s*;/.test(processed)) {
        processed = processed.replace(
          /return\s+(.*)\s*!==\s*0\s*;/,
          (m, expr) => `return (${expr.trim()} !== 0) ? 1 : 0;`
        );
      }
      if (/return\s+.*===\s*0\s*;/.test(processed)) {
        processed = processed.replace(
          /return\s+(.*)\s*===\s*0\s*;/,
          (m, expr) => `return (${expr.trim()} === 0) ? 1 : 0;`
        );
      }

      // 2e: Stub Windows message pump functions (headless: infinite loop otherwise)
      // These do-while loops poll for Windows messages that never arrive
      if (/^export function (FUN_005bbb0a|FUN_005bbbce|FUN_00407ff0|gdi_BA4F_005BBA4F|gdi_BB76_005BBB76)\b/.test(trimmed)) {
        processed = processed.replace(
          /^(export function \w+\([^)]*\))\s*\{/,
          '$1 { return 0; /* HEADLESS: message pump stub */'
        );
      }
    }

    finalLines.push(processed);
  }

  // Phase 2.5: Inject loop guards into while/for/do loop bodies
  // Find lines with loop headers ending in {, inject loopGuard() after
  {
    let currentFn = blockFile;
    const guarded = [];
    for (let li = 0; li < finalLines.length; li++) {
      const line = finalLines[li];
      const t = line.trim();
      // Track current function name
      const fnMatch = t.match(/^(?:export )?function (\w+)\s*\(/);
      if (fnMatch) currentFn = fnMatch[1];
      guarded.push(line);
      // After a loop header line ending with {, insert loopGuard
      if (/^\s*(while|for)\s*\(.*\{\s*$/.test(t) || /^\s*do\s*\{\s*$/.test(t)) {
        const indent = line.match(/^(\s*)/)[1] + '  ';
        guarded.push(indent + `loopGuard('${currentFn}', ${li + 1});`);
      }
      // Also catch while(true) { on its own line
      if (/^\s*while\s*\(\s*true\s*\)\s*\{\s*$/.test(t)) {
        // already caught above
      }
    }
    finalLines.length = 0;
    finalLines.push(...guarded);
  }

  // Phase 3: Build imports and insert at top (before first export function)
  // 3a: Find which functions this block defines (exported + local helpers)
  const localFns = new Set();
  for (const line of finalLines) {
    const m = line.match(/^(?:export )?function (\w+)\s*\(/);
    if (m) localFns.add(m[1]);
  }

  // 3b: Find all function identifiers called/referenced in this block
  const refsNeeded = new Map(); // fnName → source block
  const externNeeded = new Set(); // functions not in any block (Win32, etc.)
  let crtNeeded = null; // C runtime functions (real implementations in crt.js)
  let aliasImports = null; // base_name → address_suffixed_name (cross-block)
  let localAliases = null; // base_name → address_suffixed_name (same-block)
  const allText = finalLines.join('\n');

  // Find all function-call-like identifiers
  const skip = /^(if|for|while|do|switch|return|function|export|import|let|var|const|new|typeof|catch|delete|class|super|this|void|yield|await|async|static|enum|implements|interface|arguments|eval|undefined|Array|Math|true|false|Number|String|parseInt|parseFloat|devLog|stubCall|s8|u8|s16|u16|s32|u32|w16|w32|w16r|w32r|ptrAdd|v|wv|_MEM|loopGuard|loopReset|fill)$/;
  const fnUtilsNeeded = new Set(); // functions needed from fn_utils.js
  for (const m of allText.matchAll(/\b([a-zA-Z_]\w+)\s*\(/g)) {
    const fn = m[1];
    if (skip.test(fn)) continue;
    // CRT functions take priority over everything (including local definitions)
    // This ensures our JS implementations of _rand, malloc, etc. are used
    // instead of the binary's C runtime code which doesn't work in our model
    if (crtExports.has(fn)) {
      if (!crtNeeded) crtNeeded = new Set();
      crtNeeded.add(fn);
      continue;
    }
    if (localFns.has(fn)) continue;
    if (fnUtilsExports.has(fn)) {
      fnUtilsNeeded.add(fn);
      continue;
    }
    const srcBlock = fnRegistry.get(fn);
    if (srcBlock && srcBlock !== blockFile) {
      refsNeeded.set(fn, srcBlock);
    } else if (!srcBlock) {
      // Check if this is a base name that maps to an address-suffixed export
      const aliased = nameAliases.get(fn);
      if (aliased) {
        const aliasSrc = fnRegistry.get(aliased);
        if (aliasSrc && aliasSrc !== blockFile) {
          refsNeeded.set(fn, aliasSrc);
          if (!aliasImports) aliasImports = new Map();
          aliasImports.set(fn, aliased);
        } else if (aliasSrc === blockFile) {
          // Same-block alias: need a local const alias
          if (!localAliases) localAliases = new Map();
          localAliases.set(fn, aliased);
        }
      } else {
        externNeeded.add(fn);
      }
    }
  }
  // Track extern stubs needed globally
  for (const fn of externNeeded) allExternStubs.add(fn);

  // 3c: Build import lines
  const imports = [];
  imports.push("import '../globals-init.js';");  // populates globalThis with DAT_ addresses
  imports.push("import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, ptrAdd, _MEM, loopGuard, loopReset, setWidths } from '../mem.js';");
  imports.push("import { devLog } from '../devlog.js';");

  // Import fn_utils functions used by this block
  if (fnUtilsNeeded.size > 0) {
    const sorted = [...fnUtilsNeeded].sort();
    for (let k = 0; k < sorted.length; k += 6) {
      imports.push(`import { ${sorted.slice(k, k + 6).join(', ')} } from '../fn_utils.js';`);
    }
  }

  // Import C runtime functions from crt.js
  if (crtNeeded && crtNeeded.size > 0) {
    const sorted = [...crtNeeded].sort();
    for (let k = 0; k < sorted.length; k += 6) {
      imports.push(`import { ${sorted.slice(k, k + 6).join(', ')} } from '../crt.js';`);
    }
  }

  // Import extern stubs
  if (externNeeded.size > 0) {
    const sorted = [...externNeeded].sort();
    for (let k = 0; k < sorted.length; k += 6) {
      imports.push(`import { ${sorted.slice(k, k + 6).join(', ')} } from '../extern-stubs.js';`);
    }
  }

  // Group cross-block imports by source
  const importsByBlock = new Map();
  for (const [fn, src] of refsNeeded) {
    if (!importsByBlock.has(src)) importsByBlock.set(src, []);
    importsByBlock.get(src).push(fn);
  }
  for (const [src, fns] of [...importsByBlock.entries()].sort()) {
    const sorted = fns.sort();
    for (let k = 0; k < sorted.length; k += 6) {
      const importNames = sorted.slice(k, k + 6).map(fn => {
        // For aliased names: import { kill_civ_004AA378 as kill_civ }
        if (aliasImports && aliasImports.has(fn)) {
          return `${aliasImports.get(fn)} as ${fn}`;
        }
        return fn;
      });
      imports.push(`import { ${importNames.join(', ')} } from './${src}';`);
    }
  }

  // 3d: Find s_ string references and declare as empty byte arrays
  const stringRefs = new Set();
  for (const m of allText.matchAll(/\b(s_\w{10,})\b/g)) {
    if (!localFns.has(m[1])) stringRefs.add(m[1]);
  }
  if (stringRefs.size > 0) {
    const sorted = [...stringRefs].sort();
    for (const s of sorted) {
      imports.push(`const ${s} = new Uint8Array(256);`);
    }
  }

  // 3e: Bind DAT_ globals from globalThis into module scope
  // ESM strict mode requires explicit declarations. Use const bindings
  // that reference the globalThis Uint8Array views.
  // Scalar writes (DAT_xxx = 5) are converted to globalThis.DAT_xxx = 5
  // in Phase 2 so the setter fires.
  const datRefs = new Set();
  for (const m of allText.matchAll(/\b(DAT_[0-9a-fA-F]+)\b/g)) {
    datRefs.add(m[1]);
  }
  if (datRefs.size > 0) {
    const sorted = [...datRefs].sort();
    for (let k = 0; k < sorted.length; k += 6) {
      const chunk = sorted.slice(k, k + 6);
      const decls = chunk.map(d => `${d} = globalThis.${d}`).join(', ');
      imports.push(`const ${decls};`);
    }
  }

  // 3f: Add local aliases for same-block renamed functions
  if (localAliases && localAliases.size > 0) {
    for (const [callerName, actualName] of localAliases) {
      imports.push(`const ${callerName} = ${actualName};`);
    }
  }

  // 3e: Insert imports before first export function
  const outputLines = [];
  let importsInserted = false;
  for (const line of finalLines) {
    if (!importsInserted && line.trimStart().startsWith('export function ')) {
      for (const imp of imports) outputLines.push(imp);
      outputLines.push('');
      importsInserted = true;
    }
    outputLines.push(line);
  }

  const result = outputLines.join('\n');
  fs.writeFileSync(path.join(blocksDir, blockFile), result);
  totalTransformed++;
}

console.log(`Transformed ${totalTransformed} block files`);

// ═══════════════════════════════════════════════════════════════════
// Step 4b: Generate extern-stubs.js
// ═══════════════════════════════════════════════════════════════════

{
  // Filter out JS reserved words that can't be function names
  const reserved = new Set(['delete', 'new', 'class', 'super', 'this', 'import', 'export',
    'default', 'return', 'throw', 'try', 'catch', 'finally', 'switch', 'case', 'break',
    'continue', 'for', 'while', 'do', 'if', 'else', 'var', 'let', 'const', 'function',
    'void', 'typeof', 'instanceof', 'in', 'of', 'with', 'yield', 'await', 'async',
    'static', 'get', 'set', 'enum', 'implements', 'interface', 'package', 'private',
    'protected', 'public', 'arguments', 'eval', 'NaN', 'undefined', 'Infinity']);
  const sorted = [...allExternStubs].filter(n => !reserved.has(n)).sort();
  const lines = [
    '// ═══════════════════════════════════════════════════════════════════',
    '// extern-stubs.js — Stub implementations for external functions',
    '//',
    '// Win32 API, C runtime, MFC, and Ghidra-named functions that',
    '// exist in the binary but have no JS equivalent.',
    '// Each stub logs when called so we can see what the binary wanted.',
    '//',
    `// Generated by transform.cjs — ${sorted.length} stubs`,
    '// ═══════════════════════════════════════════════════════════════════',
    '',
    "import { stubCall } from './devlog.js';",
    '',
  ];
  for (const fn of sorted) {
    lines.push(`export function ${fn}(...args) { return stubCall('${fn}', args); }`);
  }
  fs.writeFileSync(path.join(dstDir, 'extern-stubs.js'), lines.join('\n'));
  console.log(`Generated extern-stubs.js: ${sorted.length} stubs`);
}

// ═══════════════════════════════════════════════════════════════════
// Step 5: Generate fn_utils.js
// ═══════════════════════════════════════════════════════════════════

let fnSrc = fs.readFileSync(path.join(srcDir, 'fn_utils.js'), 'utf8');

// Remove ALL old imports
fnSrc = fnSrc.replace(/^import\s*\{[\s\S]*?\}\s*from\s*'\.\/mem\.js'\s*;?\s*\n?/gm, '');

// Replace DAT_ references
fnSrc = fnSrc.replace(DAT_REPLACE_RE, 'G.DAT_$1');
fnSrc = fnSrc.replace(/G\.G\.DAT_/g, 'G.DAT_');

// Find end of header comment
const fnLines = fnSrc.split('\n');
const fnOut = [];
let fnImportsAdded = false;
for (const line of fnLines) {
  const t = line.trim();
  if (!fnImportsAdded && t !== '' && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*')) {
    fnOut.push(`import { G } from './globals.js';`);
    fnOut.push(`import { s8, u8, getTileOffset, tileRead } from './mem.js';`);
    fnOut.push('');
    fnImportsAdded = true;
  }
  fnOut.push(line);
}

fs.writeFileSync(path.join(dstDir, 'fn_utils.js'), fnOut.join('\n'));
console.log('Generated fn_utils.js');

// ═══════════════════════════════════════════════════════════════════
// Step 6: mem.js (already written inline — just confirm)
// ═══════════════════════════════════════════════════════════════════

const memCode = `// ═══════════════════════════════════════════════════════════════════
// mem.js — Memory access utilities for Civ2 MGE binary transpilation
//
// All DAT_ addresses are NUMBERS (offsets into _MEM). This mirrors
// how C works: DAT_xxx is a memory location. Using it loads the value.
// &DAT_xxx gives the address. In our model, DAT_xxx IS the address
// (offset), and v()/wv() perform the load/store.
//
// v(addr)      — read int32 value at address (what C does implicitly)
// wv(addr,val) — write int32 value at address (what C's = does)
// s32(addr,off)— read int32 at addr+off (explicit dereference)
// w32(addr,off,val)— write int32 at addr+off
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
export const _MEM = G._MEM;

// ── Value read/write: what C does when you use DAT_xxx as a value ──
// In C, writing DAT_xxx reads/writes the bytes at that address.
// v() makes this explicit in JS.
// Width-aware: reads 1, 2, or 4 bytes based on the address's declared width.
const _widths = {};
export function setWidths(w) { Object.assign(_widths, w); }
export function v(addr) {
  const w = _widths[addr];
  if (w === 1) return _MEM[addr];
  if (w === 2) { const val = (_MEM[addr+1] << 8) | _MEM[addr]; return (val & 0x8000) ? (val | 0xFFFF0000) : val; }
  return _MEM[addr] | (_MEM[addr+1] << 8) | (_MEM[addr+2] << 16) | (_MEM[addr+3] << 24);
}
export function wv(addr, val) {
  const w = _widths[addr];
  _MEM[addr] = val & 0xFF;
  if (w === 1) return val;
  _MEM[addr+1] = (val >> 8) & 0xFF;
  if (w === 2) return val;
  _MEM[addr+2] = (val >> 16) & 0xFF;
  _MEM[addr+3] = (val >> 24) & 0xFF;
  return val;
}

// ── Signed/unsigned byte interpretation helpers ──
export function s8(val) { return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0xFF); }
export function u8(val) { return val & 0xFF; }

// ── Memory read helpers ──
// Dual-mode: if first arg is a number, read from _MEM at addr+off.
// If first arg is a Uint8Array/Buffer, read from it at off (legacy mode).
export function s16(arrOrAddr, off) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  const val = (buf[i + 1] << 8) | buf[i];
  return (val & 0x8000) ? (val | 0xFFFF0000) : val;
}
export function u16(arrOrAddr, off) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return (buf[i + 1] << 8) | buf[i];
}
export function s32(arrOrAddr, off) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return buf[i] | (buf[i+1] << 8) | (buf[i+2] << 16) | (buf[i+3] << 24);
}
export function u32(arrOrAddr, off) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return (buf[i] | (buf[i+1] << 8) | (buf[i+2] << 16) | (buf[i+3] << 24)) >>> 0;
}

// ── Memory write helpers ──
export function w16(arrOrAddr, off, val) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  buf[i] = val & 0xFF;
  buf[i + 1] = (val >> 8) & 0xFF;
}
export function w32(arrOrAddr, off, val) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  buf[i] = val & 0xFF;
  buf[i + 1] = (val >> 8) & 0xFF;
  buf[i + 2] = (val >> 16) & 0xFF;
  buf[i + 3] = (val >> 24) & 0xFF;
}

// ── Write-and-return helpers (for comma-operator expressions) ──
export function w16r(addr, off, val) { w16(addr, off, val); return val; }
export function w32r(addr, off, val) { w32(addr, off, val); return val; }

// ── Pointer arithmetic: &DAT_xxx + offset → addr + offset ──
export function ptrAdd(addr, off) { return addr + off; }

// ── Loop guard: prevents infinite loops, logs diagnostic info ──
// Per-loop guard using a Map keyed by function+line
const _loopCounts = new Map();
const _PER_LOOP_LIMIT = 100000;
export function loopGuard(fnName, line) {
  const key = fnName + ':' + line;
  const count = (_loopCounts.get(key) || 0) + 1;
  _loopCounts.set(key, count);
  if (count > _PER_LOOP_LIMIT) {
    _loopCounts.set(key, 0);
    throw new Error('LOOP_GUARD: ' + fnName + ' line ' + line + ' exceeded ' + _PER_LOOP_LIMIT + ' iterations');
  }
}
export function loopReset() { _loopCounts.clear(); }

// ── Tile data initialization ──
export function initMapTiles(tileArray) {
  G._tileData = tileArray;
}

// ── Tile offset computation ──
export function getTileOffset(param_1, param_2) {
  if (param_2 < 0 || v(DAT_006d1162) <= param_2 || param_1 < 0 || v(DAT_006d1160) <= param_1) {
    return -1;
  }
  const mw2 = v(DAT_006d1160) & 0xFFFFFFFE;
  return mw2 * param_2 * 3 + (param_1 & 0xFFFFFFFE) * 3;
}

// ── Tile byte read/write ──
export function tileRead(offset, byteIdx) {
  if (offset < 0 || !G._tileData) return _MEM[DAT_006d1188 + byteIdx];
  return G._tileData[offset + byteIdx];
}

export function tileWrite(offset, byteIdx, value) {
  if (offset >= 0 && G._tileData) G._tileData[offset + byteIdx] = value;
}
`;
fs.writeFileSync(path.join(dstDir, 'mem.js'), memCode);
console.log('Generated mem.js');

// ═══════════════════════════════════════════════════════════════════
// Step 7: rand.js
// ═══════════════════════════════════════════════════════════════════

const randCode = `// ═══════════════════════════════════════════════════════════════════
// rand.js — MSVC-compatible seeded PRNG
//
// Binary uses MSVC's rand(): seed = seed * 214013 + 2531011
// Returns (seed >> 16) & 0x7FFF (range 0-32767)
// ═══════════════════════════════════════════════════════════════════

let _seed = 0;

export function srand(seed) {
  _seed = seed >>> 0;
}

export function rand() {
  _seed = (Math.imul(_seed, 214013) + 2531011) >>> 0;
  return (_seed >>> 16) & 0x7FFF;
}

export function getSeed() {
  return _seed;
}
`;
fs.writeFileSync(path.join(dstDir, 'rand.js'), randCode);
console.log('Generated rand.js');

// ═══════════════════════════════════════════════════════════════════
// Step 8: stubs.js
// ═══════════════════════════════════════════════════════════════════

const stubsCode = `// ═══════════════════════════════════════════════════════════════════
// stubs.js — Win32 API and UI function stubs
//
// Binary game logic calls UI/Win32 functions inline. These are
// stubbed as no-ops for headless operation.
// ═══════════════════════════════════════════════════════════════════

export function stub(name) {
  return function (...args) {
    // Uncomment for debugging:
    // console.warn(\`STUB: \${name}(\${args.join(', ')})\`);
    return 0;
  };
}
`;
fs.writeFileSync(path.join(dstDir, 'stubs.js'), stubsCode);
console.log('Generated stubs.js');

console.log('\nDone!');
