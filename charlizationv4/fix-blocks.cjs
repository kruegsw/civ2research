#!/usr/bin/env node
// fix-blocks.cjs — Post-transform/wire fixes for all block files
//
// Run AFTER transform.cjs and wire.cjs. Handles:
// 1. Remove fn_utils function stubs (conflict with imports)
// 2. Fix fn_utils self-imports (blocks that export their own versions)
// 3. Add stub() factory where blocks use it
// 4. Remove duplicate function declarations
// 5. Remove stale re-export statements
// 6. Fix broken s16_read/s16_write helpers
//
// Run: node charlizationv4/fix-blocks.cjs

const fs = require('fs');
const path = require('path');
const blocksDir = path.join(__dirname, 'blocks');

// fn_utils function names (imported by every block)
const FN_UTILS = new Set([
  'FUN_004087c0','FUN_005ae052','FUN_005b8931','FUN_005b94d5','FUN_005b89bb',
  'FUN_005b89e4','FUN_005b8a1d','FUN_005b8ca6','FUN_005b8ee1','FUN_004bd9f0',
  'FUN_0058c56c','FUN_005b68f6'
]);

// Blocks that export their own version of an fn_utils function
// These must NOT import that function from fn_utils (would conflict)
const SELF_EXPORTS = {
  'block_00400000.js': ['FUN_004087c0'],  // has export function FUN_004087c0
};

// Blocks that use the alias pattern: import { FUN_x as _FUN_x } from fn_utils
const ALIAS_IMPORTS = {
  'block_004B0000.js': { 'FUN_004bd9f0': '_FUN_004bd9f0' },
};

// Blocks that need stub() factory function
const NEEDS_STUB = new Set();

const blockFiles = fs.readdirSync(blocksDir).filter(f => f.endsWith('.js')).sort();

let totalFixes = 0;

for (const file of blockFiles) {
  const filePath = path.join(blocksDir, file);
  let src = fs.readFileSync(filePath, 'utf8');
  let fixes = [];

  // ── Fix 1: Remove fn_utils function stubs ──
  // These are `function FUN_xxx(...)` declarations for functions already imported from fn_utils
  const lines = src.split('\n');
  const outLines = [];
  const seenFunctions = new Set();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^function (FUN_[0-9a-fA-F]+)\s*\(/);

    if (m) {
      const fnName = m[1];

      // Remove fn_utils stubs
      if (FN_UTILS.has(fnName)) {
        if (!line.includes('}')) {
          let depth = (line.match(/\{/g)||[]).length - (line.match(/\}/g)||[]).length;
          while (depth > 0 && i+1 < lines.length) { i++; depth += (lines[i].match(/\{/g)||[]).length - (lines[i].match(/\}/g)||[]).length; }
        }
        fixes.push('removed fn_utils stub: ' + fnName);
        continue;
      }

      // Remove duplicate function declarations (keep first)
      if (seenFunctions.has(fnName)) {
        if (!line.includes('}')) {
          let depth = (line.match(/\{/g)||[]).length - (line.match(/\}/g)||[]).length;
          while (depth > 0 && i+1 < lines.length) { i++; depth += (lines[i].match(/\{/g)||[]).length - (lines[i].match(/\}/g)||[]).length; }
        }
        fixes.push('removed duplicate: ' + fnName);
        continue;
      }
      seenFunctions.add(fnName);
    }

    // Also track exported functions
    const em = line.match(/^export function (FUN_[0-9a-fA-F]+)\s*\(/);
    if (em) seenFunctions.add(em[1]);

    outLines.push(line);
  }

  src = outLines.join('\n');

  // ── Fix 2: Fix fn_utils self-imports ──
  if (SELF_EXPORTS[file]) {
    const selfFns = SELF_EXPORTS[file];
    src = src.replace(
      /import \{ ([^}]+) \} from '\.\.\/fn_utils\.js';/,
      (match, importList) => {
        const fns = importList.split(',').map(s => s.trim()).filter(s => !selfFns.includes(s));
        if (fns.length === 0) return '// fn_utils: all functions defined locally';
        return "import { " + fns.join(', ') + " } from '../fn_utils.js';";
      }
    );
    fixes.push('fixed self-import: removed ' + selfFns.join(', '));
  }

  // ── Fix 2b: Handle alias imports ──
  if (ALIAS_IMPORTS[file]) {
    for (const [fnName, alias] of Object.entries(ALIAS_IMPORTS[file])) {
      // Replace the standard import with the alias version
      src = src.replace(
        new RegExp('(import \\{ [^}]*?)' + fnName + '([^}]*\\} from \'\\.\\.\/fn_utils\\.js\')'),
        (match, before, after) => before + fnName + ' as ' + alias + after
      );
    }
    fixes.push('added alias imports');
  }

  // ── Fix 3: Remove stale re-export blocks ──
  // Pattern: export { FUN_xxx, ... };  (re-exports from fn_utils)
  src = src.replace(/\/\/ Re-export fn_utils.*\nexport \{[\s\S]*?\};\n?/m, '');
  // Pattern: export { _FUN_xxx as FUN_xxx };
  // Keep these for alias blocks (004B0000), remove for others
  if (!ALIAS_IMPORTS[file]) {
    src = src.replace(/^export \{ _?FUN_[0-9a-fA-F]+ as FUN_[0-9a-fA-F]+(?:_reexport)? \};\s*$/gm, (match) => {
      fixes.push('removed stale re-export');
      return '// (re-export removed)';
    });
  }

  // ── Fix 4: Add stub() factory where needed ──
  if (src.includes('= stub(') && !src.includes('function stub(')) {
    // Insert after the last import line
    const slines = src.split('\n');
    let lastImport = -1;
    for (let i = 0; i < slines.length; i++) {
      if (slines[i].trimStart().startsWith('import ') && slines[i].includes('from ')) lastImport = i;
    }
    if (lastImport >= 0) {
      slines.splice(lastImport + 1, 0, '', 'function stub(name) { return function (...args) { return 0; }; }');
      src = slines.join('\n');
      fixes.push('added stub() factory');
      NEEDS_STUB.add(file);
    }
  }

  // ── Fix 5: Fix broken s16_read/s16_write helpers ──
  if (src.includes('function s16_read(arr, off) { return arr ? (arr[off] || 0) : 0; }')) {
    src = src.replace(
      'function s16_read(arr, off) { return arr ? (arr[off] || 0) : 0; }',
      `function s16_read(arr, off) {
  if (!arr) return 0;
  const v = (arr[off + 1] << 8) | arr[off];
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}`
    );
    fixes.push('fixed s16_read');
  }
  if (src.includes('function s16_write(arr, off, val) { if (arr) arr[off] = val; }')) {
    src = src.replace(
      'function s16_write(arr, off, val) { if (arr) arr[off] = val; }',
      `function s16_write(arr, off, val) {
  if (!arr) return;
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}`
    );
    fixes.push('fixed s16_write');
  }

  // ── Fix 6: Fix invalid const G.DAT_ declarations ──
  src = src.replace(/^(const|let|var) G\.(DAT_[0-9a-fA-F_]+)\s*=\s*(.+?)\s*;/gm, (match, kw, name, val) => {
    fixes.push('fixed invalid ' + kw + ' G.' + name);
    return '// ' + kw + ' ' + name + ' = ' + val + '; // (in G)';
  });

  if (fixes.length > 0) {
    fs.writeFileSync(filePath, src);
    console.log(`  ${file}: ${fixes.length} fixes`);
    for (const f of fixes) console.log(`    - ${f}`);
    totalFixes += fixes.length;
  }
}

console.log(`\nDone: ${totalFixes} total fixes across ${blockFiles.length} blocks`);
