#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// transpile.cjs — C → JS transpiler (1:1 line mapping)
//
// Usage:
//   node transpile.cjs                          # all blocks
//   node transpile.cjs block_004E0000           # one block
//   node transpile.cjs --stats                  # UNKNOWN_RULE counts only
//
// Reads:  reverse_engineering/decompiled/block_XXXXXXXX.c
// Writes: reverse_engineering/transpiler/output/block_XXXXXXXX.js
// Rules:  reverse_engineering/transpiler/RULES.md
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const C_DIR = path.join(__dirname, '..', 'decompiled');
const OUT_DIR = path.join(__dirname, 'output');

// Ensure output dir exists
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Balanced extraction helpers ────────────────────────────────────

// Extract the contents of a balanced (...) starting at position `start`
function extractBalancedParens(str, start) {
  if (str[start] !== '(') return null;
  let depth = 0;
  for (let i = start; i < str.length; i++) {
    if (str[i] === '(') depth++;
    if (str[i] === ')') depth--;
    if (depth === 0) return { content: str.substring(start + 1, i), end: i };
  }
  return null;
}

// Extract a C expression starting at `start` — handles word, word[expr], word[expr][expr],
// and nested brackets/parens within. Stops at operators, commas, semicolons, or unbalanced closing.
function extractExpression(str, start) {
  let i = start;
  // Skip leading whitespace
  while (i < str.length && str[i] === ' ') i++;
  const exprStart = i;

  // Must start with a word character
  if (i >= str.length || !/[a-zA-Z_0-9]/.test(str[i])) return null;

  // Consume word
  while (i < str.length && /[a-zA-Z_0-9]/.test(str[i])) i++;

  // Consume bracket/paren groups: [expr] or (expr)
  while (i < str.length && (str[i] === '[' || str[i] === '(')) {
    const open = str[i];
    const close = open === '[' ? ']' : ')';
    let depth = 1;
    i++;
    while (i < str.length && depth > 0) {
      if (str[i] === open) depth++;
      if (str[i] === close) depth--;
      i++;
    }
  }

  if (i === exprStart) return null;
  return { expr: str.substring(exprStart, i), end: i };
}

// Replace *(TYPE *)(expr) with helper(base, offset) using balanced parens
function replaceTypedPtrDeref(line) {
  const typeMap = { 'int': 's32', 'uint': 'u32', 'short': 's16', 'ushort': 'u16',
                    'undefined4': 's32', 'undefined2': 's16' };
  const typePattern = /\*\s*\(\s*(int|uint|short|ushort|undefined4|undefined2)\s*\*\s*\)\s*\(/g;
  let result = '';
  let lastIdx = 0;
  let match;

  while ((match = typePattern.exec(line)) !== null) {
    const type = match[1];
    const helper = typeMap[type];
    // Find the opening ( after the type cast
    const parenStart = line.indexOf('(', match.index + match[0].length - 1);
    const balanced = extractBalancedParens(line, parenStart);
    if (!balanced) { continue; }

    result += line.substring(lastIdx, match.index);
    const inner = balanced.content.trim();
    const parts = splitBaseOffset(inner);
    if (parts) {
      result += helper + '(' + parts.base + ', ' + parts.offset + ')';
    } else {
      result += helper + '(' + inner + ', 0)';
    }
    lastIdx = balanced.end + 1;
    typePattern.lastIndex = lastIdx;
  }
  result += line.substring(lastIdx);
  return result;
}

// ── Cast replacement using balanced expression extraction ──────────
function replaceCast(line, castType, helper) {
  const pattern = new RegExp('\\(\\s*' + castType + '\\s*\\)', 'g');
  let result = '';
  let lastIdx = 0;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    result += line.substring(lastIdx, match.index);
    const afterCast = match.index + match[0].length;

    // Check if followed by (expr) — parenthesized expression
    const afterTrimIdx = afterCast;
    if (afterTrimIdx < line.length && line[afterTrimIdx] === '(') {
      const balanced = extractBalancedParens(line, afterTrimIdx);
      if (balanced) {
        result += helper + '(' + balanced.content + ')';
        lastIdx = balanced.end + 1;
        pattern.lastIndex = lastIdx;
        continue;
      }
    }

    // Otherwise: followed by a word (possibly with brackets)
    const expr = extractExpression(line, afterTrimIdx);
    if (expr) {
      result += helper + '(' + expr.expr + ')';
      lastIdx = expr.end;
      pattern.lastIndex = lastIdx;
    } else {
      // Can't extract — pass through
      result += match[0];
      lastIdx = afterCast;
    }
  }
  result += line.substring(lastIdx);
  return result;
}

// ── Line-level transformations ─────────────────────────────────────
// Applied iteratively (inside-out) until no more changes

function transformLine(line, ctx) {
  const trimmed = line.trim();
  if (trimmed === '' || trimmed === '{' || trimmed === '}') return line;

  let out = line;
  let changed = true;
  let iterations = 0;

  while (changed && iterations < 20) {
    changed = false;
    iterations++;
    const prev = out;

    // ── Character literals: '\0' → 0, '\xNN' → 0xNN, '\a' → 7, '\n' → 0xa ──
    out = out.replace(/'\\x([0-9a-fA-F]{2})'/g, (m, hex) => '0x' + hex);
    out = out.replace(/'\\0'/g, '0');
    out = out.replace(/'\\a'/g, '7');
    out = out.replace(/'\\n'/g, '0xa');
    out = out.replace(/'\\r'/g, '0xd');
    out = out.replace(/'\\t'/g, '9');
    // Single printable char: '\x01' style already handled, but 'A' etc:
    out = out.replace(/'([^\\'])'/g, (m, ch) => String(ch.charCodeAt(0)));

    // ── U suffix on constants ──
    out = out.replace(/\b(0x[0-9a-fA-F]+)U\b/g, '$1');
    out = out.replace(/\b(\d+)U\b/g, '$1');

    // ── Drop thunk_ prefix ──
    out = out.replace(/\bthunk_(FUN_[0-9a-fA-F]+)/g, '$1');

    // ── Drop FID_conflict_ prefix ──
    out = out.replace(/\bFID_conflict_(\w+)/g, '$1');

    // ── Byte array read: (&DAT_XXX)[expr] → DAT_XXX[expr] ──
    out = out.replace(/\(\s*&(DAT_[0-9a-fA-F]+)\s*\)\s*\[/g, '$1[');

    // ── Typed pointer READ: *(TYPE *)(base + off) → helper(base, off) ──
    // Uses balanced paren matching for nested expressions
    out = replaceTypedPtrDeref(out);

    // ── Typed pointer WRITE: handled at statement level below ──

    // ── Cast: (char)expr → s8(expr), (byte)expr → u8(expr) ──
    // Uses balanced expression extraction for nested brackets
    out = replaceCast(out, 'char', 's8');
    out = replaceCast(out, 'byte', 'u8');
    out = replaceCast(out, 'undefined1', 'u8');

    // ── Nested cast: (uint) after unsigned helper → drop ──
    out = out.replace(/\(\s*uint\s*\)\s*(u8|u16|u32)\(/g, '$1(');

    // ── Cast: (uint) before a helper function call → helper(...) >>> 0 ──
    out = out.replace(/\(\s*uint\s*\)\s*(s8|s16|s32)\(([^)]*)\)/g, '($1($2) >>> 0)');

    // ── Cast: (uint)(expr) → (expr) >>> 0 ──
    out = out.replace(/\(\s*uint\s*\)\s*\(([^)]+)\)/g, '(($1) >>> 0)');

    // ── Cast: (uint)variable → (variable) >>> 0 ──
    out = out.replace(/\(\s*uint\s*\)(\w+)(?!\s*\()/g, '(($1) >>> 0)');

    // ── Cast: (int)(expr >>> 0) → (expr) | 0 ──
    out = out.replace(/\(\s*int\s*\)\s*\(\s*\(([^)]+)\)\s*>>>\s*0\s*\)/g, '(($1) | 0)');

    // ── Cast: (int)(expr) → expr (no-op — just remove the cast) ──
    out = out.replace(/\(\s*int\s*\)\s*(?=\()/g, '');
    out = out.replace(/\(\s*int\s*\)\s*(?=\w)/g, '');

    // ── Cast: (short)(expr) → ((expr) << 16 >> 16) ──
    out = out.replace(/\(\s*short\s*\)\s*\(([^)]+)\)/g, '(($1) << 16 >> 16)');
    out = out.replace(/\(\s*short\s*\)(\w+)/g, '(($1) << 16 >> 16)');

    // ── Cast: (ushort)(expr) → (expr) & 0xFFFF ──
    out = out.replace(/\(\s*ushort\s*\)\s*\(([^)]+)\)/g, '(($1) & 0xFFFF)');
    out = out.replace(/\(\s*ushort\s*\)(\w+)/g, '(($1) & 0xFFFF)');

    // ── Cast: (bool)(expr) → (expr) ? 1 : 0 ──
    out = out.replace(/\(\s*bool\s*\)\s*\(([^)]+)\)/g, '(($1) ? 1 : 0)');
    out = out.replace(/\(\s*bool\s*\)(\w+)/g, '(($1) ? 1 : 0)');

    // ── Cast: (undefined4)(expr) → expr (no-op) ──
    out = out.replace(/\(\s*undefined4\s*\)\s*\(([^)]+)\)/g, '($1)');
    out = out.replace(/\(\s*undefined4\s*\)(\w+)/g, '($1)');

    // ── Cast: (undefined2)(expr) → (expr) & 0xFFFF ──
    out = out.replace(/\(\s*undefined2\s*\)\s*\(([^)]+)\)/g, '(($1) & 0xFFFF)');
    out = out.replace(/\(\s*undefined2\s*\)(\w+)/g, '(($1) & 0xFFFF)');

    // ── Cast: (longlong) division → | 0 ──
    out = out.replace(/\(\s*(?:u?longlong)\s*\)/g, '');

    // ── bRam → DAT_ ──
    out = out.replace(/\bbRam([0-9a-fA-F]{8})/g, 'DAT_$1');

    // ── &local_XX → local_XX (drop &) ──
    out = out.replace(/&(local_[0-9a-fA-F]+)/g, '$1');

    // ── & (address-of) → drop or placeholder ──
    out = out.replace(/&(DAT_[0-9a-fA-F]+)/g, '$1');
    out = out.replace(/&(s_\w+)/g, '$1');
    out = out.replace(/&(PTR_\w+)/g, '$1');
    out = out.replace(/&(LAB_[0-9a-fA-F]+)/g, '0 /* ADDR:$1 */');
    out = out.replace(/&(switchD_\w+)/g, '0 /* ADDR:$1 */');
    out = out.replace(/&(code_r\w+)/g, '0 /* ADDR:$1 */');
    out = out.replace(/&(joined_r\w+)/g, '0 /* ADDR:$1 */');
    // &stack, &local_ (already handled above), any remaining &word
    out = out.replace(/&(stack\w+)/g, '0 /* ADDR:$1 */');
    out = out.replace(/&(\w+)/g, '$1'); // catch-all: drop & for any remaining

    // ── C++ class method calls and destructor calls → DEVIATION ──
    if (/\w+::~?\w+\s*[(\[]/.test(out) && !/\/\//.test(out.split('::')[0])) {
      out = out.replace(/^(\s*)(.*)$/, '$1// DEVIATION: MFC — $2');
      if (!/;\s*$/.test(out.trim())) ctx.deviationContinuation = true;
    }

    // ── Bare pointer dereference: *variable → s32(variable, 0) ──
    // Handles *in_ECX, *DAT_XXX, *param_N, *local_N, *piVarN, *ppVarN, etc.
    // Match * followed by a Ghidra variable name, not preceded by a word char (to avoid multiplication)
    out = out.replace(/(?<![a-zA-Z0-9_])\*([a-zA-Z_]\w*Var\d+|in_E\w+|DAT_[0-9a-fA-F]+|param_\d+|local_\w+|unaff_\w+|[A-Z]\w+)(?!\s*\()/g,
      (m, name) => 's32(' + name + ', 0)');

    // ── C-style pointer casts without dereference: (TYPE *)expr → expr ──
    out = out.replace(/(?<!\*\s*)\(\s*\w+\s*\*\s*\)\s*(?=\()/g, '');
    out = out.replace(/(?<!\*\s*)\(\s*\w+\s*\*\s*\)\s*(?=\w)/g, '');

    // ── Remaining C type casts: (HWND), (LRESULT), (CWnd *), etc. ──
    // Any (ALLCAPS_WORD) that's NOT a DAT_/FUN_/PTR_/LAB_/s_ reference → drop
    out = out.replace(/\(\s*([A-Z][A-Z_0-9]+)\s*\)/g, (m, name) => {
      if (/^(DAT_|FUN_|PTR_|LAB_|ADDR)/.test(name)) return m; // keep — it's a reference
      return ''; // drop — it's a type cast
    });
    out = out.replace(/\(\s*[A-Z]\w+\s*\*\s*\)/g, '');

    // ── Remaining C-style pointer derefs that weren't handled → DEVIATION ──
    // Catches *(char **), *(void *), etc. — anything with *(TYPE *) still in the line
    if (/\*\s*\(\s*\w[\w\s]*\*+\s*\)/.test(out) && !/\/\/|DEVIATION/.test(out)) {
      out = out.replace(/^(\s*)(.*)$/, '$1// DEVIATION: C pointer — $2');
      if (!/;\s*$/.test(out.trim())) ctx.deviationContinuation = true;
    }

    // ── Equality operators ──
    out = out.replace(/([^=!<>])={2}(?!=)/g, '$1===');
    out = out.replace(/!={1}(?!=)/g, '!==');

    // ── Null pointer: (TYPE *)0x0 → null ──
    out = out.replace(/\(\s*\w+\s*\*\s*\)\s*0x0\b/g, 'null');
    out = out.replace(/\(\s*\w+\s*\*\s*\)\s*0\b/g, 'null');

    // ── (code *)0x0 → null ──
    out = out.replace(/\(\s*code\s*\*\s*\)\s*0x0\b/g, 'null');

    if (out !== prev) changed = true;
  }

  return out;
}

// ── Split "base + offset" from pointer dereference inner expression ──
function splitBaseOffset(expr) {
  // Handle: &DAT_XXX + expr  →  base=DAT_XXX, offset=expr
  const datMatch = expr.match(/^&?(DAT_[0-9a-fA-F]+)\s*\+\s*(.+)$/);
  if (datMatch) return { base: datMatch[1], offset: datMatch[2].trim() };

  // Handle: &DAT_XXX (no offset)
  const datOnly = expr.match(/^&?(DAT_[0-9a-fA-F]+)$/);
  if (datOnly) return { base: datOnly[1], offset: '0' };

  // Handle: variable + offset (param_1 + 0xc, in_ECX + 0x48, etc.)
  const varMatch = expr.match(/^(\w+)\s*\+\s*(.+)$/);
  if (varMatch) return { base: varMatch[1], offset: varMatch[2].trim() };

  return null;
}

// ── Function-level processing ──────────────────────────────────────

function processFunction(headerLines, bodyLines, ctx) {
  const result = [];

  // Output header comments as-is
  for (const line of headerLines) {
    result.push(line);
  }

  // Parse function signature (may span multiple lines)
  let sigLine = '';
  let sigStartIdx = -1;
  let sigEndIdx = -1;
  for (let i = 0; i < bodyLines.length; i++) {
    const t = bodyLines[i].trim();
    if (/^\w/.test(t) && /\(/.test(t) && !/^\/\//.test(t) && !/^\{/.test(t)) {
      sigStartIdx = i;
      sigLine = t;
      // Check if signature continues on next line(s)
      while (!/\)/.test(sigLine) && i + 1 < bodyLines.length) {
        i++;
        sigLine += ' ' + bodyLines[i].trim();
        sigEndIdx = i;
      }
      if (sigEndIdx < 0) sigEndIdx = sigStartIdx;
      break;
    }
  }
  if (!sigLine) {
    // No signature found — comment out entire body in-place (preserve line count)
    for (const line of bodyLines) {
      result.push(line.replace(/^(\s*)(.*)$/, '$1// DEVIATION(no-sig): $2'));
    }
    return result;
  }

  // Match any function name from the header comment (more reliable than parsing C signature)
  const headerText = headerLines.join('\n');
  const headerNameMatch = headerText.match(/Function:\s+(\S+)\s/);

  const sigMatch = sigLine.match(/^\w[\w\s*]*\s+(\S+)\s*\(([^)]*)\)/);
  if (!sigMatch) {
    // Signature parse failed — comment out body in-place (preserve line count)
    for (const line of bodyLines) {
      result.push(line.replace(/^(\s*)(.*)$/, '$1// DEVIATION(unparsed): $2'));
    }
    return result;
  }

  // Prefer header name (handles special chars), fall back to sig parse
  // Append address from header to disambiguate duplicate names
  const headerAddr = headerText.match(/@\s*0x([0-9a-fA-F]+)/);
  let funcName = headerNameMatch ? headerNameMatch[1].replace(/[^a-zA-Z0-9_]/g, '_') : sigMatch[1];
  // If name doesn't start with FUN_ (non-standard name), append address to avoid duplicates
  if (!/^FUN_/.test(funcName) && headerAddr) {
    funcName = funcName + '_' + headerAddr[1];
  }
  const rawParams = sigMatch[2].trim();

  // Parse declared params from signature
  const sigParams = [];
  if (rawParams && rawParams !== 'void') {
    for (const p of rawParams.split(',')) {
      const pm = p.trim().match(/(\w+)\s*$/);
      if (pm) sigParams.push(pm[1]);
    }
  }

  // Detect pointer params (TYPE *param_N)
  const ptrParams = new Set();
  for (const p of rawParams.split(',')) {
    const pm = p.trim().match(/\*\s*(param_\d+)$/);
    if (pm) ptrParams.add(pm[1]);
  }

  // Scan body for register params and &local_XX
  const bodyText = bodyLines.join('\n');
  const regParams = [];
  const localArrays = new Set();

  // Find register params (in_EAX, in_ECX, etc.) and callee-saved (unaff_ESI, etc.)
  const regOrder = ['in_EAX', 'in_ECX', 'in_EDX', 'unaff_ESI', 'unaff_EDI', 'unaff_EBP'];
  for (const reg of regOrder) {
    if (new RegExp('\\b' + reg + '\\b').test(bodyText) &&
        new RegExp('^\\s*(?:int|uint|undefined4|undefined|code)\\s+\\*?' + reg, 'm').test(bodyText)) {
      regParams.push(reg);
    }
  }

  // Find &local_XX patterns
  for (const m of bodyText.matchAll(/&(local_[0-9a-fA-F]+)/g)) {
    localArrays.add(m[1]);
  }

  // Build JS signature
  const allParams = [...regParams, ...sigParams];
  const jsSig = 'export function ' + funcName + '(' + allParams.join(', ') + ') {';

  // Check if function returns a value
  const returnsValue = /^(?:int|uint|undefined4|undefined|byte|char|short|ushort|bool|code)\s/.test(sigLine.trim()) &&
                       !/^void\s/.test(sigLine.trim());

  // Process body lines
  let inBody = false;
  let braceDepth = 0;
  let sigLineIdx = -1;
  let openWriteCall = false; // tracks if a w16/w32 call is open across lines

  ctx.deviationContinuation = false;
  let inBlockComment = false;
  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i];
    const trimmed = line.trim();

    // ── Multi-line C comments: /* ... */ → // ... ──
    if (inBlockComment) {
      result.push(line.replace(/^(\s*)/, '$1// '));
      if (/\*\//.test(trimmed)) inBlockComment = false;
      continue;
    }
    if (/^\/\*/.test(trimmed) && !/\*\//.test(trimmed)) {
      inBlockComment = true;
      result.push(line.replace(/^(\s*)/, '$1// '));
      continue;
    }
    if (/^\/\*/.test(trimmed) && /\*\//.test(trimmed)) {
      // Single-line block comment
      result.push(line.replace(/^(\s*)\/\*/, '$1// /*').replace(/\*\/\s*$/, '*/'));
      continue;
    }

    // Find signature line(s) — replace with JS signature
    if (!inBody && i >= sigStartIdx && i <= sigEndIdx) {
      if (i === sigStartIdx) {
        result.push(jsSig);
      } else {
        result.push(''); // continuation lines become blank (params already in signature)
      }
      sigLineIdx = i;
      continue;
    }

    // Skip blank line after signature (C has blank between sig and {)
    if (sigLineIdx >= 0 && i === sigEndIdx + 1 && trimmed === '') {
      result.push('');
      continue;
    }

    // Opening brace of function
    if (!inBody && trimmed === '{') {
      inBody = true;
      result.push(''); // brace is already in signature line
      braceDepth = 1;
      continue;
    }

    if (!inBody) {
      result.push(line);
      continue;
    }

    // Track brace depth
    for (const ch of trimmed) {
      if (ch === '{') braceDepth++;
      if (ch === '}') braceDepth--;
    }

    // Closing brace of function
    if (braceDepth === 0 && trimmed === '}') {
      result.push('}');
      inBody = false;
      continue;
    }

    // ── SEH boilerplate ──
    if (/unaff_FS_OFFSET/.test(trimmed) || /puStack_c\s*=/.test(trimmed) ||
        /uStack_10\s*=/.test(trimmed)) {
      result.push(line.replace(trimmed, '// DEVIATION: SEH'));
      continue;
    }

    // ── Variable declarations ──
    if (/^\s*(int|uint|char|byte|short|ushort|undefined[124]?|bool|void|long|ulong|code)\s/.test(line) &&
        !inBody) {
      // Already handled above
    }

    // Match variable declarations: any type followed by a Ghidra-style variable name
    // Ghidra variable names: local_XX, iVarN, uVarN, cVarN, sVarN, bVarN, lVarN, param_N, etc.
    // Match ANY C variable declaration: TYPE [*]name[N];
    const declMatch = trimmed.match(/^(\w[\w\s]*?)\s+(\*?\s*\w+(?:\s*\[\s*\d+\s*\])?)\s*;$/);
    const isKeyword = /^(if|else|for|while|do|switch|case|return|break|continue|let|var|const|export|import|function|goto)\b/.test(trimmed);
    if (declMatch && !isKeyword) {
      const varName = declMatch[2].replace(/^\*\s*/, '').replace(/\s*\[.*\]/, '');

      // Register params promoted to parameters — emit comment
      if (regParams.includes(varName)) {
        result.push(line.replace(trimmed, '// ' + varName + ' → promoted to parameter'));
        continue;
      }

      // SEH locals — puStack_ and uStack_ are always SEH
      // local_8 is only SEH if it's assigned 0xffffffff AND there's FS_OFFSET in the function
      if (/^(puStack_|uStack_)/.test(varName)) {
        result.push(line.replace(trimmed, '// DEVIATION: SEH local'));
        continue;
      }

      // Array locals (has & taken)
      if (localArrays.has(varName)) {
        // Check if it's an array declaration like local_20[8]
        const arrSizeMatch = declMatch[2].match(/\[(\d+)\]/);
        if (arrSizeMatch) {
          result.push(line.replace(trimmed, 'let ' + varName + ' = new Array(' + arrSizeMatch[1] + ').fill(0);'));
        } else {
          result.push(line.replace(trimmed, 'let ' + varName + ' = [0];'));
        }
        continue;
      }

      // Regular declaration — handle C arrays: type name[size] → let name = new Array(size).fill(0)
      let declStr = declMatch[2].replace(/^\*\s*/, '');
      const arrMatch = declStr.match(/^(\w+)\s*\[(\d+)\]$/);
      if (arrMatch) {
        result.push(line.replace(trimmed, 'let ' + arrMatch[1] + ' = new Array(' + arrMatch[2] + ').fill(0);'));
      } else {
        result.push(line.replace(trimmed, 'let ' + declStr + ';'));
      }
      continue;
    }

    // ── Multi-variable declaration (rare) ──
    // e.g., "undefined4 *unaff_FS_OFFSET;"
    if (/^\s*(undefined4|int|uint)\s*\*\s*unaff_FS_OFFSET\s*;/.test(line)) {
      result.push(line.replace(trimmed, '// DEVIATION: SEH local'));
      continue;
    }

    // ── SEH: local_8 = 0xffffffff ──
    if (/^\s*local_8\s*=\s*0xffffffff\s*;/.test(line) && /FS_OFFSET/.test(bodyText)) {
      result.push(line.replace(trimmed, '// DEVIATION: SEH'));
      continue;
    }

    // ── SEH: puStack_c = &LAB_ ──
    if (/^\s*puStack_c\s*=/.test(line)) {
      result.push(line.replace(trimmed, '// DEVIATION: SEH'));
      continue;
    }

    // ── Typed pointer WRITE at statement level ──
    // *(TYPE *)(base + off) = expr;
    const writeMatch = trimmed.match(/^\*\s*\(\s*(int|uint|short|ushort|undefined4|undefined2)\s*\*\s*\)\s*\(([^)]+)\)\s*=\s*(.+);$/);
    if (writeMatch) {
      const wType = writeMatch[1];
      const inner = writeMatch[2].trim();
      let val = writeMatch[3].trim();
      const wHelper = (wType === 'short' || wType === 'ushort' || wType === 'undefined2') ? 'w16' : 'w32';
      const parts = splitBaseOffset(inner);
      // Transform the value expression
      val = transformLine('  ' + val, ctx).trim();
      if (parts) {
        result.push(line.replace(trimmed, wHelper + '(' + parts.base + ', ' + parts.offset + ', ' + val + ');'));
      } else {
        result.push(line.replace(trimmed, wHelper + '(' + inner + ', 0, ' + val + ');'));
      }
      continue;
    }

    // ── Byte array WRITE with cast on lvalue ──
    // (char)(&DAT_XXX)[off] = val; or (byte)(&DAT_XXX)[off] = val;
    const byteWriteMatch = trimmed.match(/^\(\s*(?:char|byte)\s*\)\s*\(\s*&(DAT_[0-9a-fA-F]+)\s*\)\s*\[([^\]]+)\]\s*=\s*(.+);$/);
    if (byteWriteMatch) {
      let val = transformLine('  ' + byteWriteMatch[3], ctx).trim();
      result.push(line.replace(trimmed, byteWriteMatch[1] + '[' + byteWriteMatch[2] + '] = ' + val + ';'));
      continue;
    }

    // ── Continuation of multi-line DEVIATION ──
    if (ctx.deviationContinuation) {
      result.push(line.replace(/^(\s*)/, '$1// DEVIATION(cont): '));
      if (/;\s*$/.test(trimmed)) ctx.deviationContinuation = false;
      continue;
    }

    // ── Continuation of multi-line w16/w32 call ──
    if (openWriteCall) {
      let transformed = transformLine(line, ctx);
      // Close the function call: replace trailing ; with );
      transformed = transformed.replace(/;\s*$/, ');');
      openWriteCall = false;
      result.push(transformed);
      continue;
    }

    // ── Apply line-level transformations ──
    let transformed = transformLine(line, ctx);

    // ── &local_XX → local_XX (drop &) ──
    transformed = transformed.replace(/&(local_[0-9a-fA-F]+)/g, '$1');

    // ── *param_N → param_N[0] for pointer params ──
    for (const pp of ptrParams) {
      transformed = transformed.replace(new RegExp('\\*' + pp + '\\b', 'g'), pp + '[0]');
    }

    // ── local_XX access: if it's an array local, add [0] ──
    for (const la of localArrays) {
      // Replace standalone local_XX reads/writes with local_XX[0]
      // But not when already followed by [ or when it's &local_XX (already handled)
      transformed = transformed.replace(
        new RegExp('\\b' + la + '\\b(?!\\s*\\[|\\s*→)', 'g'),
        la + '[0]'
      );
      // Fix double [0] — if the replacement produced local_XX[0][0]
      transformed = transformed.replace(la + '[0][0]', la + '[0]');
    }

    // ── _atexit → // DEVIATION: C runtime ──
    if (/\b_atexit\b/.test(transformed)) {
      result.push(line.replace(trimmed, '// DEVIATION: C runtime — ' + trimmed));
      continue;
    }

    // ── Post-transform: fix read helpers used as write targets ──
    // If s32/u32/s16/u16 appears on the LEFT side of = (assignment, NOT ===/!==)
    transformed = transformed.replace(
      /\b(s32|u32)\(([^)]+),\s*([^)]+)\)\s*=(?!=)\s*/g,
      (m, fn, base, off) => 'w32(' + base + ', ' + off + ', '
    );
    transformed = transformed.replace(
      /\b(s16|u16)\(([^)]+),\s*([^)]+)\)\s*=(?!=)\s*/g,
      (m, fn, base, off) => 'w16(' + base + ', ' + off + ', '
    );
    // Check if this line opened a w16/w32 call that continues on next line
    // (value expression is on the continuation line)
    if (/\bw(?:32|16)\([^;]*$/.test(transformed.trim()) && !/;\s*$/.test(transformed.trim())) {
      openWriteCall = true;
    }
    // Single-line w32/w16: close with ) before ;
    // w32(base, off, val | 0x10;  →  w32(base, off, val | 0x10);
    if (/\bw(?:32|16)\(/.test(transformed) && /;\s*$/.test(transformed) && !openWriteCall) {
      // Count parens to see if we need a closing )
      const t = transformed;
      let depth = 0;
      for (const ch of t) { if (ch === '(') depth++; if (ch === ')') depth--; }
      if (depth > 0) {
        transformed = transformed.replace(/;\s*$/, ');');
      }
    }

    // ── Final safety: catch any remaining C-only syntax ──
    const ft = transformed.trim();
    if (ft && !ft.startsWith('//') && !ft.startsWith('/*') && !ft.startsWith('}') && !ft.startsWith('{')) {
      // Check for patterns that are invalid JS
      if (/\*\s*\(\s*\w+\s*\*/.test(ft) ||  // *(type *)
          /\(\s*void\s*\)\s*\w/.test(ft) ||  // (void)expr
          /\b(void|struct|union|enum|typedef|register|volatile|extern|static|signed|unsigned)\s+\w/.test(ft) ||
          /^\w+\s+\w+\s*\(/.test(ft) && /\)$/.test(ft) ||  // C function signature
          /^[A-Z]\w+\s*::\s*~?[A-Z]/.test(ft)) {  // C++ class::method
        transformed = transformed.replace(/^(\s*)/, '$1// DEVIATION(C-syntax): ');
        if (!/;\s*$/.test(ft)) ctx.deviationContinuation = true;
      }
    }

    result.push(transformed);
  }

  return result;
}

// ── Parse a C file into functions ──────────────────────────────────

function parseFile(content) {
  const lines = content.split('\n');
  const functions = [];
  let headerLines = [];
  let bodyLines = [];
  let inHeader = true;
  let state = 'preamble'; // preamble, header, body

  // File preamble (before first function)
  const preamble = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^\/\/\s*={10,}\s*$/.test(trimmed)) {
      if (state === 'preamble') {
        // First separator — start of first function header
        state = 'header';
        headerLines = [line];
      } else if (state === 'header') {
        // Second separator — end of header, body follows
        headerLines.push(line);
        state = 'body';
        bodyLines = [];
      } else if (state === 'body') {
        // New function separator — save previous function
        functions.push({ headerLines, bodyLines, preamble: functions.length === 0 ? [...preamble] : [] });
        headerLines = [line];
        state = 'header';
        bodyLines = [];
      }
    } else if (state === 'preamble') {
      preamble.push(line);
    } else if (state === 'header') {
      headerLines.push(line);
    } else if (state === 'body') {
      bodyLines.push(line);
    }
  }

  // Save last function
  if (bodyLines.length > 0) {
    functions.push({ headerLines, bodyLines, preamble: functions.length === 0 ? [...preamble] : [] });
  }

  return { preamble, functions };
}

// ── Goto processing (post-transform) ───────────────────────────────

function processGotos(lines) {
  const helpers = [];

  // Find all goto targets and label positions
  // Label prefixes: LAB_, switchD_, code_r, joined_r
  const labelPattern = /\b(LAB_[0-9a-fA-F]+|switchD_\w+|code_r0x[0-9a-fA-F]+|joined_r0x[0-9a-fA-F]+)\b/;
  const gotoTargets = new Set();
  const labelPositions = {}; // label → line index
  for (let i = 0; i < lines.length; i++) {
    const gm = lines[i].match(/\bgoto\s+(LAB_[0-9a-fA-F]+|switchD_\w+|code_r0x[0-9a-fA-F]+|joined_r0x[0-9a-fA-F]+)/);
    if (gm) gotoTargets.add(gm[1]);
    const lm = lines[i].match(/^(LAB_[0-9a-fA-F]+|switchD_\w+|code_r0x[0-9a-fA-F]+|joined_r0x[0-9a-fA-F]+):/);
    if (lm) labelPositions[lm[1]] = i;
  }

  if (gotoTargets.size === 0) return { lines, helpers };

  // Find the enclosing function's closing brace (last } at depth 0)
  let funcEnd = lines.length - 1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '}') { funcEnd = i; break; }
  }

  // For each label that is a goto target, extract helper
  for (const label of gotoTargets) {
    const labelIdx = labelPositions[label];
    if (labelIdx === undefined) continue; // label not in this function

    // Collect lines from label to function end (exclusive of closing })
    const helperBody = [];
    for (let i = labelIdx + 1; i < funcEnd; i++) {
      helperBody.push(lines[i]);
    }

    // Collect variables referenced in the helper body
    const vars = new Set();
    const helperText = helperBody.join('\n');
    for (const m of helperText.matchAll(/\b(param_\d+|local_[0-9a-fA-F]+|iVar\d+|uVar\d+|cVar\d+|sVar\d+|bVar\d+|in_E[A-Z]{2}|unaff_E[A-Z]{2})\b/g)) {
      vars.add(m[1]);
    }
    // Also check for variables used in the label line itself
    const labelLine = lines[labelIdx];
    for (const m of labelLine.matchAll(/\b(param_\d+|local_[0-9a-fA-F]+|iVar\d+|uVar\d+|cVar\d+|sVar\d+|bVar\d+)\b/g)) {
      vars.add(m[1]);
    }

    const varList = [...vars].sort().join(', ');
    const helperName = label + '_helper';

    // Build helper function
    helpers.push('function ' + helperName + '(' + varList + ') {');
    // Helper body: transform gotos to this same label into recursive calls
    for (const bodyLine of helperBody) {
      let hl = bodyLine;
      // Replace goto to THIS label with recursive call
      if (new RegExp('\\bgoto\\s+' + label + '\\b').test(hl)) {
        hl = hl.replace(
          new RegExp('\\bgoto\\s+' + label + '\\s*;'),
          helperName + '(' + varList + '); return;'
        );
      }
      // Replace goto to OTHER labels with their helper calls
      for (const otherLabel of gotoTargets) {
        if (otherLabel === label) continue;
        if (new RegExp('\\bgoto\\s+' + otherLabel + '\\b').test(hl)) {
          const otherVars = [...vars].sort().join(', '); // approximate — use same vars
          hl = hl.replace(
            new RegExp('\\bgoto\\s+' + otherLabel + '\\s*;'),
            otherLabel + '_helper(' + otherVars + '); return;'
          );
        }
      }
      helpers.push(hl);
    }
    helpers.push('}');
    helpers.push('');
  }

  // Now modify the main lines:
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Replace goto statements with helper calls
    const gotoRe = /\bgoto\s+(LAB_[0-9a-fA-F]+|switchD_\w+|code_r0x[0-9a-fA-F]+|joined_r0x[0-9a-fA-F]+)\s*;/;
    const gm = line.match(gotoRe);
    if (gm && gotoTargets.has(gm[1])) {
      const label = gm[1];
      // Collect vars for this helper (same as above)
      const labelIdx = labelPositions[label];
      const helperBody = [];
      if (labelIdx !== undefined) {
        for (let j = labelIdx + 1; j < funcEnd; j++) helperBody.push(lines[j]);
      }
      const vars = new Set();
      const ht = helperBody.join('\n');
      for (const m of ht.matchAll(/\b(param_\d+|local_[0-9a-fA-F]+|iVar\d+|uVar\d+|cVar\d+|sVar\d+|bVar\d+|in_E[A-Z]{2}|unaff_E[A-Z]{2})\b/g)) {
        vars.add(m[1]);
      }
      const varList = [...vars].sort().join(', ');
      line = line.replace(gotoRe, label + '_helper(' + varList + '); return;');
    }

    // Mark label sites with comment (code stays in place for audit)
    const lm = line.match(/^(LAB_[0-9a-fA-F]+|switchD_\w+|code_r0x[0-9a-fA-F]+|joined_r0x[0-9a-fA-F]+):/);
    if (lm && gotoTargets.has(lm[1])) {
      line = '// ' + lm[1] + ': (code below also in ' + lm[1] + '_helper, kept for 1:1 audit)';
    }

    result.push(line);
  }

  return { lines: result, helpers };
}

// ── Transpile one block ────────────────────────────────────────────

function transpileBlock(blockName) {
  const cFile = path.join(C_DIR, blockName + '.c');
  if (!fs.existsSync(cFile)) {
    console.error('Not found: ' + cFile);
    return null;
  }

  const content = fs.readFileSync(cFile, 'utf8');
  const { preamble, functions } = parseFile(content);
  const ctx = { blockName };

  const outputLines = [];

  // Preamble as comments (no import line — wiring step handles imports)
  for (const line of preamble) {
    outputLines.push(line);
  }

  // Process each function
  const gotoHelpers = []; // collected across all functions, appended at end
  for (const func of functions) {
    const result = processFunction(func.headerLines, func.bodyLines, ctx);
    const { lines: processedLines, helpers } = processGotos(result);
    for (const line of processedLines) {
      outputLines.push(line);
    }
    gotoHelpers.push(...helpers);
  }

  // Append goto helpers at end of file (after all C-mapped lines)
  // NOTE: everything above this point is 1:1 with C source (line N = line N)
  // Helpers start on the line AFTER the last C line — no extra blank lines added
  if (gotoHelpers.length > 0) {
    outputLines.push('// ── GOTO HELPERS (not mapped to C lines — see RULES.md) ──');
    for (const helper of gotoHelpers) {
      outputLines.push(helper);
    }
  }

  const outputContent = outputLines.join('\n');
  const outFile = path.join(OUT_DIR, blockName + '.js');
  fs.writeFileSync(outFile, outputContent);

  // Count UNKNOWN_RULE
  const unknowns = (outputContent.match(/UNKNOWN_RULE/g) || []).length;
  const deviations = (outputContent.match(/DEVIATION/g) || []).length;
  const totalLines = outputLines.length;

  return { blockName, totalLines, unknowns, deviations };
}

// ── Main ───────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const statsOnly = args.includes('--stats');
const specificBlock = args.find(a => a.startsWith('block_'));

const blocks = specificBlock
  ? [specificBlock]
  : fs.readdirSync(C_DIR).filter(f => f.endsWith('.c')).map(f => f.replace('.c', '')).sort();

let totalUnknowns = 0;

for (const block of blocks) {
  const result = transpileBlock(block);
  if (!result) continue;

  totalUnknowns += result.unknowns;

  if (statsOnly) {
    if (result.unknowns > 0) {
      console.log(block + ': ' + result.unknowns + ' UNKNOWN_RULE, ' + result.deviations + ' DEVIATION');
    }
  } else {
    console.log(block + ': ' + result.totalLines + ' lines, ' + result.unknowns + ' UNKNOWN_RULE, ' + result.deviations + ' DEVIATION');
  }
}

if (blocks.length > 1) {
  console.log('\nTotal UNKNOWN_RULE: ' + totalUnknowns);
}
