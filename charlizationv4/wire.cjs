#!/usr/bin/env node
// wire.cjs — Auto-wire cross-block function calls
// Run: node charlizationv4/wire.cjs

const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, 'blocks');
const fnUtilsPath = path.join(__dirname, 'fn_utils.js');

// Step 1: Build function registry (FUN_xxx → block filename)
const registry = new Map();
const blockFiles = fs.readdirSync(blocksDir)
  .filter(f => f.startsWith('block_') && f.endsWith('.js'))
  .sort();

for (const file of blockFiles) {
  const src = fs.readFileSync(path.join(blocksDir, file), 'utf8');
  const re = /^export function (FUN_[0-9a-fA-F]+)\s*\(/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    registry.set(m[1], file);
  }
}
console.log(`Registry: ${registry.size} exported functions across ${blockFiles.length} blocks`);

// fn_utils functions (already imported — skip)
const fnUtilsFns = new Set();
const fnSrc = fs.readFileSync(fnUtilsPath, 'utf8');
const fnRe = /^export function (FUN_[0-9a-fA-F]+)\s*\(/gm;
let fm;
while ((fm = fnRe.exec(fnSrc)) !== null) fnUtilsFns.add(fm[1]);

// Step 2: Process each block
let totalWired = 0;

for (const file of blockFiles) {
  const filePath = path.join(blocksDir, file);
  const src = fs.readFileSync(filePath, 'utf8');
  const lines = src.split('\n');

  const stubsToWire = new Map();
  const stubLines = new Set();

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^function (FUN_[0-9a-fA-F]+)\s*\(/);
    if (!m) continue;
    const fnName = m[1];
    if (fnUtilsFns.has(fnName)) continue;

    const srcBlock = registry.get(fnName);
    if (srcBlock && srcBlock !== file) {
      stubsToWire.set(fnName, srcBlock);
      stubLines.add(i);
      if (!lines[i].includes('}')) {
        let depth = (lines[i].match(/\{/g) || []).length - (lines[i].match(/\}/g) || []).length;
        let j = i + 1;
        while (depth > 0 && j < lines.length) {
          depth += (lines[j].match(/\{/g) || []).length;
          depth -= (lines[j].match(/\}/g) || []).length;
          stubLines.add(j);
          j++;
        }
      }
    }
  }

  if (stubsToWire.size === 0) continue;

  // Group imports by source block
  const importsByBlock = new Map();
  for (const [fnName, srcBlock] of stubsToWire) {
    if (!importsByBlock.has(srcBlock)) importsByBlock.set(srcBlock, []);
    importsByBlock.get(srcBlock).push(fnName);
  }

  const newImports = [];
  for (const [srcBlock, fns] of [...importsByBlock.entries()].sort()) {
    const sorted = fns.sort();
    for (let i = 0; i < sorted.length; i += 6) {
      newImports.push(`import { ${sorted.slice(i, i + 6).join(', ')} } from './${srcBlock}';`);
    }
  }

  // Find last import line
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith('import ') && lines[i].includes('from ')) {
      lastImportIdx = i;
    }
  }

  // Rebuild file
  const outLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (stubLines.has(i)) continue;
    outLines.push(lines[i]);
    if (i === lastImportIdx) {
      outLines.push('// ── Cross-block imports (auto-wired) ──');
      for (const imp of newImports) outLines.push(imp);
    }
  }

  fs.writeFileSync(filePath, outLines.join('\n'));
  totalWired += stubsToWire.size;
  console.log(`  ${file}: ${stubsToWire.size} stubs → imports (from ${importsByBlock.size} blocks)`);
}

console.log(`\nDone: ${totalWired} stubs wired`);
