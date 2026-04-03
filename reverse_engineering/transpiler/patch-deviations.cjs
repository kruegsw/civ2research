#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// patch-deviations.cjs — Supplement regex output with P-code expressions
//
// For each DEVIATION in the regex output, finds the corresponding
// expression in the P-code output and patches it in.
//
// Strategy: Match by function name + statement context. For each
// DEVIATION, extract the surrounding non-deviated tokens, find the
// same tokens in the P-code output, and extract the P-code's version
// of the deviated expression.
//
// Usage:
//   node patch-deviations.cjs                    # all blocks, report only
//   node patch-deviations.cjs --apply            # patch in place
//   node patch-deviations.cjs block_004E0000     # one block
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const REGEX_DIR = path.join(__dirname, 'output');
const PCODE_DIR = path.join(__dirname, 'output-ghidra');

// ── Extract functions from source ────────────────────────────────

function extractFunctions(source) {
  const fns = new Map();
  const re = /^\s*export function (FUN_[0-9a-fA-F]+)\s*\(/gm;
  let match, matches = [];
  while ((match = re.exec(source)) !== null) {
    matches.push({ name: match[1], start: match.index });
  }
  for (let i = 0; i < matches.length; i++) {
    const end = i + 1 < matches.length ? matches[i + 1].start : source.length;
    fns.set(matches[i].name, source.substring(matches[i].start, end));
  }
  return fns;
}

// ── Find DEVIATION patterns and their context ────────────────────

function findDeviations(fnBody) {
  const devs = [];
  // Match: true /* DEVIATION: TYPE — ORIGINAL_C */
  const devRe = /true\s*\/\*\s*DEVIATION:\s*([^—]+)—\s*([^*]+)\*\//g;
  let m;
  while ((m = devRe.exec(fnBody)) !== null) {
    const type = m[1].trim();
    const originalC = m[2].trim();
    // Get context: 30 chars before and after the DEVIATION
    const before = fnBody.substring(Math.max(0, m.index - 40), m.index).trim();
    const after = fnBody.substring(m.index + m[0].length, m.index + m[0].length + 40).trim();
    devs.push({
      type,
      originalC,
      full: m[0],
      pos: m.index,
      before,
      after,
    });
  }

  // Match: // DEVIATION: C pointer write — ORIGINAL_C
  const devLineRe = /\/\/\s*DEVIATION:\s*C pointer write\s*—\s*(.+)$/gm;
  while ((m = devLineRe.exec(fnBody)) !== null) {
    devs.push({
      type: 'C pointer write',
      originalC: m[1].trim(),
      full: m[0],
      pos: m.index,
      before: fnBody.substring(Math.max(0, m.index - 40), m.index).trim(),
      after: '',
      isLine: true,
    });
  }

  return devs;
}

// ── Extract key tokens from context for matching ─────────────────

function extractContextTokens(text) {
  // Extract function calls, DAT_ references, numbers — things that are stable between outputs
  const tokens = [];
  const re = /\b(FUN_[0-9a-fA-F]+|DAT_[0-9a-fA-F]+|0x[0-9a-fA-F]+|\d+)\b/g;
  let m;
  while ((m = re.exec(text)) !== null) tokens.push(m[1]);
  return tokens;
}

// ── Find matching line in P-code output ──────────────────────────

function findPcodeMatch(dev, pcodeFnBody) {
  if (!pcodeFnBody) return null;

  // For inline deviations: find lines with same context tokens
  const contextTokens = extractContextTokens(dev.before + ' ' + dev.after);
  if (contextTokens.length < 2) return null;

  const pcodeLines = pcodeFnBody.split('\n');
  let bestMatch = null;
  let bestScore = 0;

  for (const line of pcodeLines) {
    const lineTokens = extractContextTokens(line);
    // Count matching tokens
    let score = 0;
    for (const tok of contextTokens) {
      if (lineTokens.includes(tok)) score++;
    }
    // Require at least 2 matching tokens and >50% match
    if (score > bestScore && score >= 2 && score > contextTokens.length * 0.4) {
      bestScore = score;
      bestMatch = line.trim();
    }
  }

  return bestMatch;
}

// ── Process a block ──────────────────────────────────────────────

function processBlock(blockName, apply) {
  const regexFile = path.join(REGEX_DIR, blockName + '.js');
  const pcodeFile = path.join(PCODE_DIR, blockName + '.js');

  if (!fs.existsSync(regexFile) || !fs.existsSync(pcodeFile)) return null;

  const regexSource = fs.readFileSync(regexFile, 'utf-8');
  const pcodeSource = fs.readFileSync(pcodeFile, 'utf-8');

  const regexFns = extractFunctions(regexSource);
  const pcodeFns = extractFunctions(pcodeSource);

  let totalDevs = 0;
  let matched = 0;
  let patches = [];

  for (const [fnName, regexBody] of regexFns) {
    const pcodeBody = pcodeFns.get(fnName);
    const devs = findDeviations(regexBody);
    totalDevs += devs.length;

    for (const dev of devs) {
      if (dev.type.startsWith('C pointer') || dev.type.startsWith('C-syntax')) {
        const pcodeMatch = findPcodeMatch(dev, pcodeBody);
        if (pcodeMatch) {
          matched++;
          patches.push({
            fn: fnName,
            type: dev.type,
            regex: dev.full.substring(0, 80),
            pcode: pcodeMatch.substring(0, 120),
          });
        }
      }
    }
  }

  if (patches.length > 0 && !apply) {
    console.log(`\n${blockName}: ${totalDevs} deviations, ${matched} matched to P-code`);
    for (const p of patches.slice(0, 5)) {
      console.log(`  ${p.fn} [${p.type}]`);
      console.log(`    regex: ${p.regex}...`);
      console.log(`    pcode: ${p.pcode}...`);
    }
    if (patches.length > 5) console.log(`  ... and ${patches.length - 5} more`);
  }

  return { block: blockName, totalDevs, matched };
}

// ── Main ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const blockArgs = args.filter(a => !a.startsWith('--'));

let blocks;
if (blockArgs.length > 0) {
  blocks = blockArgs.map(b => b.replace('.js', ''));
} else {
  blocks = fs.readdirSync(REGEX_DIR)
    .filter(f => f.startsWith('block_') && f.endsWith('.js'))
    .map(f => f.replace('.js', ''))
    .sort();
}

let totalDevs = 0, totalMatched = 0;
for (const block of blocks) {
  const r = processBlock(block, apply);
  if (r) { totalDevs += r.totalDevs; totalMatched += r.matched; }
}

console.log(`\n═══ TOTAL: ${totalMatched} of ${totalDevs} deviations matched to P-code expressions ═══`);
