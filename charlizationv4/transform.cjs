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

// ── Load scalar-only DAT_ classification ──
// These addresses are never used as arrays in the transpiler output,
// so transform.cjs wraps them: G.DAT_xxx → s32(G.DAT_xxx, 0) reads,
// G.DAT_xxx = val → w32(G.DAT_xxx, 0, val) writes.
const classifyPath = path.join(__dirname, 'dat-classify.json');
const scalarOnlySet = new Set();
if (fs.existsSync(classifyPath)) {
  const classify = JSON.parse(fs.readFileSync(classifyPath, 'utf8'));
  if (classify.scalarOnly) classify.scalarOnly.forEach(d => scalarOnlySet.add(d));
  console.log(`Scalar-only DAT_ addresses: ${scalarOnlySet.size}`);
}

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
  const finalLines = [];
  for (const line of outLines) {
    const trimmed = line.trim();
    let processed = line;
    const indent = line.match(/^(\s*)/)[1];

    // 2a: Replace DEVIATION lines with devLog() calls
    // Line comment style: // DEVIATION: category — description
    if (/^\s*\/\/ DEVIATION:\s/.test(processed)) {
      const dm = trimmed.match(/^\/\/ DEVIATION:\s*(\w+)(?:\s*—\s*(.*))?$/);
      if (dm) {
        const cat = dm[1] || 'unknown';
        const desc = (dm[2] || '').replace(/'/g, "\\'").substring(0, 120);
        processed = indent + "devLog('" + cat + "', '" + desc + "');";
      }
    }
    // Block comment style: true /* DEVIATION: category — description */
    else if (/true\s*\/\* DEVIATION:/.test(processed)) {
      // Replace `true /* DEVIATION: ... */` with `devLog('...', '...')`
      processed = processed.replace(
        /true\s*\/\* DEVIATION:\s*(\w+)(?:\s*—\s*(.*?))?\s*\*\//g,
        (m, cat, desc) => {
          const d = (desc || '').replace(/'/g, "\\'").substring(0, 120);
          return "devLog('" + cat + "', '" + d + "')";
        }
      );
    }

    if (!trimmed.startsWith('//') && trimmed !== '/*JOINED*/' && !/^\/\*/.test(trimmed)) {
      // 2b: Prefix DAT_ with G. (not inside block comments)
      // Process all code segments between /* */ comments
      processed = processed.replace(
        /(?:^|(?<=\*\/))([^]*?)(?=\/\*|$)/g,
        (codePart) => codePart.replace(/(?<!G\.)(?<![a-zA-Z_.])(DAT_[0-9a-fA-F]+)/g, 'G.$1')
      );

      // 2c: Wrap scalar-only DAT_ access with s32/w32
      // All DAT_ are now Uint8Array views in globals.js.
      // Scalar-only addresses need s32() for reads and w32() for writes.
      if (scalarOnlySet.size > 0) {
        // Step 1: Scalar writes. Find G.DAT_xxx = expr patterns.
        // Replace: G.DAT_xxx = expr  →  w32(G.DAT_xxx, 0, expr)
        // Must find the end of the value expression (up to ; or , at depth 0)
        {
          const writeRe = /\bG\.(DAT_[0-9a-fA-F]+)\s*=(?!=)/g;
          let wm;
          let newLine = '';
          let lastIdx = 0;
          while ((wm = writeRe.exec(processed)) !== null) {
            const valStart = wm.index + wm[0].length;
            // Find end of value: scan for ; or , at paren depth 0
            let depth = 0;
            let valEnd = valStart;
            for (let ci = valStart; ci < processed.length; ci++) {
              if (processed[ci] === '(' || processed[ci] === '[') depth++;
              if (processed[ci] === ')' || processed[ci] === ']') depth--;
              if (depth < 0) { valEnd = ci; break; } // hit outer )
              if ((processed[ci] === ';' || processed[ci] === ',') && depth === 0) { valEnd = ci; break; }
              valEnd = ci + 1;
            }
            const valExpr = processed.substring(valStart, valEnd).trim();
            newLine += processed.substring(lastIdx, wm.index);
            newLine += `w32(G.${wm[1]}, 0, ${valExpr})`;
            lastIdx = valEnd;
            writeRe.lastIndex = lastIdx;
          }
          if (lastIdx > 0) {
            newLine += processed.substring(lastIdx);
            processed = newLine;
          }
        }

        // Step 2: Scalar reads. Replace G.DAT_xxx with s32(G.DAT_xxx, 0)
        // when NOT used as an array (first arg to helper, bracket access, or .set/.subarray).
        processed = processed.replace(
          /\bG\.(DAT_[0-9a-fA-F]+)\b(?!\s*[\[.])/g,
          (m, name, matchOffset) => {
            // Check: is this the array arg to s32/w32/ptrAdd/w32r? Look at preceding text.
            const before = processed.substring(Math.max(0, matchOffset - 40), matchOffset);
            if (/(?:s32|u32|s16|u16|w32|w16|w32r|w16r|ptrAdd)\(\s*$/.test(before)) return m;
            // Also skip if inside a w32() we just created (the first arg)
            if (/w32\(\s*$/.test(before)) return m;
            return `s32(G.${name}, 0)`;
          }
        );
      }

      // 2d: Add default values for register parameters in function signatures
      if (/^export function \w+\(/.test(trimmed)) {
        processed = processed.replace(/\b(in_ECX)(?=[\s,)])/g, '$1 = G.in_ECX');
        processed = processed.replace(/\b(in_EAX)(?=[\s,)])/g, '$1 = G.in_EAX');
        processed = processed.replace(/\b(in_EDX)(?=[\s,)])/g, '$1 = G.in_EDX');
      }
    }
    finalLines.push(processed);
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
  const skip = /^(if|for|while|do|switch|return|function|export|import|let|var|const|new|typeof|catch|delete|class|super|this|void|yield|await|async|static|enum|implements|interface|arguments|eval|undefined|Array|Math|true|false|Number|String|parseInt|parseFloat|devLog|stubCall|s8|u8|s16|u16|s32|u32|w16|w32|w16r|w32r|ptrAdd|fill)$/;
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
  imports.push("import { G } from '../globals.js';");
  imports.push("import { s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r, ptrAdd } from '../mem.js';");
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

  // 3e: Add local aliases for same-block renamed functions
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
// Pure helper functions for byte interpretation and tile access.
// All state lives in globals.js (G object).
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';

// ── Signed/unsigned byte interpretation helpers ──
export function s8(val) { return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0xFF); }
export function u8(val) { return val & 0xFF; }
export function s16(arr, off) {
  const v = (arr[off + 1] << 8) | arr[off];
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}
export function u16(arr, off) { return (arr[off + 1] << 8) | arr[off]; }
export function s32(arr, off) {
  if (typeof arr === 'number') return arr; // scalar fallback
  return arr[off] | (arr[off+1] << 8) | (arr[off+2] << 16) | (arr[off+3] << 24);
}
export function u32(arr, off) {
  if (typeof arr === 'number') return arr >>> 0;
  return (arr[off] | (arr[off+1] << 8) | (arr[off+2] << 16) | (arr[off+3] << 24)) >>> 0;
}

// ── Write helpers (with drop tracking) ──
let _w16drops = 0, _w16ok = 0, _w32drops = 0, _w32ok = 0;
const _dropSamples = [];
export function memStats() { return { w16drops: _w16drops, w16ok: _w16ok, w32drops: _w32drops, w32ok: _w32ok, dropSamples: _dropSamples }; }
export function w16(arr, off, val) {
  if (typeof arr !== 'object' || !arr) {
    _w16drops++;
    if (_dropSamples.length < 5) _dropSamples.push({ fn: 'w16', arrType: typeof arr, off, val, stack: new Error().stack.split('\\n')[2]?.trim() });
    return;
  }
  _w16ok++;
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}
export function w32(arr, off, val) {
  if (typeof arr !== 'object' || !arr) {
    _w32drops++;
    if (_dropSamples.length < 5) _dropSamples.push({ fn: 'w32', arrType: typeof arr, off, val, stack: new Error().stack.split('\\n')[2]?.trim() });
    return;
  }
  _w32ok++;
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}

// ── Write-and-return helpers (for comma-operator expressions) ──
export function w16r(arr, off, val) { w16(arr, off, val); return val; }
export function w32r(arr, off, val) { w32(arr, off, val); return val; }
// ── Pointer arithmetic: &DAT_xxx + offset → subarray view ──
export function ptrAdd(arr, off) { return arr.subarray(off); }

// ── Tile data initialization ──
export function initMapTiles(tileArray) {
  G._tileData = tileArray;
}

// ── Tile offset computation ──
export function getTileOffset(param_1, param_2) {
  if (param_2 < 0 || G.DAT_006d1162 <= param_2 || param_1 < 0 || G.DAT_006d1160 <= param_1) {
    return -1;
  }
  const mw2 = G.DAT_006d1160 & 0xFFFFFFFE;
  return mw2 * param_2 * 3 + (param_1 & 0xFFFFFFFE) * 3;
}

// ── Tile byte read/write ──
export function tileRead(offset, byteIdx) {
  if (offset < 0 || !G._tileData) return G.DAT_006d1188[byteIdx];
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
