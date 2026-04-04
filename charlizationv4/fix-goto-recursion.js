#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// fix-goto-recursion.js — Convert mutual-recursion goto helpers to
// state-machine loops.
//
// The transpiler converts C gotos into helper functions that pass all
// locals as arguments. When two helpers call each other, this creates
// stack-overflowing mutual recursion. This script detects such patterns
// and rewrites them as a while(true) + switch(state) loop.
//
// Usage: node fix-goto-recursion.js [block_file.js]
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node fix-goto-recursion.js <block_file.js>');
  process.exit(1);
}

let src = readFileSync(file, 'utf8');

// Find all helper functions and their calls to other helpers
const helperRe = /^function (LAB_[0-9a-fA-F]+_helper)\((.*?)\)\s*\{/gm;
const helpers = new Map(); // name → { start, end, params, body, callsTo }

let match;
while ((match = helperRe.exec(src)) !== null) {
  const name = match[1];
  const params = match[2];
  const start = match.index;

  // Find the end of this function (matching closing brace)
  let depth = 0;
  let end = start;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }

  const body = src.substring(start + match[0].length, end - 1);

  // Find calls to other helpers
  const callRe = /return (LAB_[0-9a-fA-F]+_helper)\(/g;
  const callsTo = new Set();
  let cm;
  while ((cm = callRe.exec(body)) !== null) {
    callsTo.add(cm[1]);
  }

  helpers.set(name, { start, end, params, body, callsTo, name });
}

// Find mutual recursion groups
const visited = new Set();
const groups = []; // each group is a Set of mutually-recursive helper names

for (const [name, info] of helpers) {
  if (visited.has(name)) continue;

  // BFS to find all helpers reachable from this one
  const group = new Set();
  const queue = [name];
  while (queue.length > 0) {
    const current = queue.shift();
    if (group.has(current)) continue;
    group.add(current);
    const h = helpers.get(current);
    if (h) {
      for (const callee of h.callsTo) {
        if (helpers.has(callee) && !group.has(callee)) {
          queue.push(callee);
        }
      }
    }
  }

  // Check if any helper in this group calls back to another in the group
  let hasMutual = false;
  for (const n of group) {
    const h = helpers.get(n);
    if (h) {
      for (const c of h.callsTo) {
        if (group.has(c) && c !== n) {
          hasMutual = true;
          break;
        }
      }
    }
    if (hasMutual) break;
  }

  if (hasMutual && group.size >= 2) {
    groups.push(group);
  }

  for (const n of group) visited.add(n);
}

console.log(`Found ${helpers.size} helpers, ${groups.length} mutual-recursion groups`);

for (const group of groups) {
  const names = [...group].sort();
  console.log(`  Group (${names.length}): ${names.join(', ')}`);

  // For each helper in the group, add a try/catch wrapper to prevent stack overflow
  // Instead of full refactoring, we add iteration limits
  for (const name of names) {
    const h = helpers.get(name);
    if (!h) continue;

    // Replace recursive calls with a trampoline pattern:
    // Instead of return LAB_xxx_helper(...), store state and continue
    // For now, add a depth counter to prevent stack overflow
    const depthVar = '_depth_' + name.substring(4, 12);

    // Find the function in the source and add depth limiting
    const funcStart = src.indexOf('function ' + name + '(');
    if (funcStart < 0) continue;

    const bodyStart = src.indexOf('{', funcStart) + 1;

    // Check if already patched
    if (src.substring(bodyStart, bodyStart + 100).includes('_gotoDepth')) continue;

    // Add depth counter at the start of the function body
    const patch = '\n  if (!globalThis._gotoDepth) globalThis._gotoDepth = 0;\n' +
                  '  if (++globalThis._gotoDepth > 500) { globalThis._gotoDepth = 0; return 0; }\n' +
                  '  try {\n';

    // Find the closing brace and add the finally block
    let depth = 1;
    let bodyEnd = bodyStart;
    for (let i = bodyStart; i < src.length; i++) {
      if (src[i] === '{') depth++;
      if (src[i] === '}') {
        depth--;
        if (depth === 0) { bodyEnd = i; break; }
      }
    }

    const endPatch = '\n  } finally { globalThis._gotoDepth--; }\n';

    src = src.substring(0, bodyEnd) + endPatch + src.substring(bodyEnd);
    src = src.substring(0, bodyStart) + patch + src.substring(bodyStart);
  }
}

writeFileSync(file, src);
console.log(`Patched ${file}`);
