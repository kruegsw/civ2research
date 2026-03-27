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

  // Handle leading unary operators: !, ~, -, * (deref in cast context)
  while (i < str.length && /[!~\-*]/.test(str[i])) i++;

  // Must have a word character after any unary ops
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
// REJECTS double-pointer types (char **, int **) — those go to DEVIATION
function replaceTypedPtrDeref(line) {
  const typeMap = { 'int': 's32', 'uint': 'u32', 'short': 's16', 'ushort': 'u16',
                    'undefined4': 's32', 'undefined2': 's16', 'undefined1': null,
                    'char': 's8_arr', 'byte': 'u8_arr' };
  // Match *(TYPE *) but NOT *(TYPE **) — negative lookahead for second *
  const typePattern = /\*\s*\(\s*(int|uint|short|ushort|undefined4|undefined2|undefined1|char|byte)\s*\*(?!\s*\*)\s*\)\s*\(/g;
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
    if (helper === null || helper === 's8_arr' || helper === 'u8_arr') {
      // Byte access: undefined1 → base[offset], char → s8(base[offset]), byte → u8(base[offset])
      const wrapFn = helper === 's8_arr' ? 's8' : helper === 'u8_arr' ? 'u8' : null;
      if (parts) {
        const access = parts.base + '[' + parts.offset + ']';
        result += wrapFn ? wrapFn + '(' + access + ')' : access;
      } else {
        // Wrap in parens if inner has operators
        const needsParens = /[+\-*\/%]/.test(inner);
        const baseExpr = needsParens ? '(' + inner + ')' : inner;
        const access = baseExpr + '[0]';
        result += wrapFn ? wrapFn + '(' + access + ')' : access;
      }
    } else if (parts) {
      result += helper + '(' + parts.base + ', ' + parts.offset + ')';
    } else {
      result += helper + '(' + inner + ', 0)';
    }
    lastIdx = balanced.end + 1;
    typePattern.lastIndex = lastIdx;
  }
  result += line.substring(lastIdx);
  let out = result;

  // Second pass: *(TYPE *)variable (no parens after cast) → helper(variable, 0)
  const typeMap2 = { 'int': 's32', 'uint': 'u32', 'short': 's16', 'ushort': 'u16',
                     'undefined4': 's32', 'undefined2': 's16', 'undefined1': null,
                     'char': 's8_arr', 'byte': 'u8_arr' };
  out = out.replace(/\*\s*\(\s*(int|uint|short|ushort|undefined4|undefined2|undefined1|char|byte)\s*\*(?!\s*\*)\s*\)\s*(\w+)/g,
    (m, type, varName) => {
      const h = typeMap2[type];
      if (h === null || h === 's8_arr' || h === 'u8_arr') {
        const access = varName + '[0]';
        const wrapFn = h === 's8_arr' ? 's8' : h === 'u8_arr' ? 'u8' : null;
        return wrapFn ? wrapFn + '(' + access + ')' : access;
      }
      return h + '(' + varName + ', 0)';
    });

  return out;
}

// ── Cast replacement using balanced expression extraction ──────────
// helper: string like 's8' → wraps as s8(expr)
// transformFn: function(expr) → custom output (used when helper is null)
function replaceCast(line, castType, helper, transformFn) {
  const pattern = new RegExp('\\(\\s*' + castType + '\\s*\\)', 'g');
  let result = '';
  let lastIdx = 0;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    result += line.substring(lastIdx, match.index);
    const afterCast = match.index + match[0].length;

    let exprStr = null;
    let endIdx = afterCast;

    // Check if followed by (expr) — parenthesized expression
    if (afterCast < line.length && line[afterCast] === '(') {
      const balanced = extractBalancedParens(line, afterCast);
      if (balanced) {
        // Check if the balanced content is another C type name — if so, this is a
        // chained cast like (uint)(short)x, NOT a parenthesized expression.
        // Skip balanced extraction and fall through to extractExpression.
        const castTypes = /^(int|uint|short|ushort|char|byte|sbyte|undefined[1248]?|bool|void|long|ulong|code|float|double|float10)$/;
        if (!castTypes.test(balanced.content.trim())) {
          exprStr = balanced.content;
          endIdx = balanced.end + 1;
          // Also consume trailing [...] groups: (TYPE)(expr)[idx] → helper(expr[idx])
          while (endIdx < line.length && line[endIdx] === '[') {
            let bDepth = 1, bEnd = endIdx + 1;
            while (bEnd < line.length && bDepth > 0) {
              if (line[bEnd] === '[') bDepth++;
              if (line[bEnd] === ']') bDepth--;
              bEnd++;
            }
            exprStr = '(' + exprStr + ')[' + line.substring(endIdx + 1, bEnd - 1) + ']';
            endIdx = bEnd;
          }
        }
      }
    }

    // Otherwise: followed by a word (possibly with brackets)
    if (exprStr === null) {
      const expr = extractExpression(line, afterCast);
      if (expr) {
        exprStr = expr.expr;
        endIdx = expr.end;
      }
    }

    if (exprStr !== null) {
      if (helper) {
        result += helper + '(' + exprStr + ')';
      } else if (transformFn) {
        result += transformFn(exprStr);
      }
      lastIdx = endIdx;
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

// ── DEVIATION helper: replace C-only code with true /* DEVIATION: ... */ ──
// Uses block comments so ALL structural tokens ({, }, ), ;) are preserved.
function makeDeviation(line, reason, ctx) {
  const indent = line.match(/^(\s*)/)[1];
  const content = line.trim();

  // For write targets (content has assignment =), use old-style // DEVIATION
  // because `true = value` is invalid JS. The // comment eats the whole line
  // which is fine for writes since there's nothing structural to preserve after =
  if (/=(?![=>])/.test(content) && !/[!=<>]=/.test(content.split('=')[0] + '=') &&
      !content.startsWith('if') && !content.startsWith('while') && !content.startsWith('for') &&
      !content.startsWith('else') && !content.startsWith('return')) {
    // It's a write target — use line comment
    if (/;\s*$/.test(content)) {
      ctx.deviationContinuation = false;
      return indent + '// DEVIATION: ' + reason + ' — ' + content;
    }
    ctx.deviationContinuation = true;
    ctx.lineCommentDeviation = true; // continuation should also use // style
    return indent + '// DEVIATION: ' + reason + ' — ' + content;
  }

  // The idea: replace the C-only EXPRESSION part with `true /* DEVIATION: ... */`
  // but keep all structural tokens: if, else, {, }, ;, ), break, etc.

  let prefix = '';
  let suffix = '';
  let middle = content;

  // Helper: try to find matching ) for a condition starting after keyword(
  // Returns the remaining string after ), or null if parens don't balance on this line
  function tryExtractCondition(str) {
    let depth = 1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      if (str[i] === ')') { depth--; if (depth === 0) return str.substring(i + 1); }
    }
    return null; // parens don't close on this line
  }

  // Extract leading structural tokens
  let m;
  if ((m = middle.match(/^(else\s+if)\s*\(/))) {
    const afterCond = tryExtractCondition(middle.substring(m[0].length));
    if (afterCond !== null) {
      // Condition closes on this line
      prefix = m[1] + ' (';
      middle = afterCond;
      suffix = ')';
    } else {
      // Condition spans multiple lines — keep if( but no closing )
      prefix = m[1] + ' (';
      middle = middle.substring(m[0].length);
    }
  } else if ((m = middle.match(/^(if|while)\s*\(/))) {
    const afterCond = tryExtractCondition(middle.substring(m[0].length));
    if (afterCond !== null) {
      prefix = m[1] + ' (';
      middle = afterCond;
      suffix = ')';
    } else {
      // Condition spans multiple lines — keep keyword( but no closing )
      prefix = m[1] + ' (';
      middle = middle.substring(m[0].length);
    }
  } else if ((m = middle.match(/^(else)\s*/))) {
    prefix = m[1] + ' ';
    middle = middle.substring(m[0].length);
  } else if ((m = middle.match(/^(for)\s*\(/))) {
    const afterCond = tryExtractCondition(middle.substring(m[0].length));
    if (afterCond !== null) {
      // for(init;cond;incr) { → for(;;) { /* DEVIATION */
      // The entire for clause is deviated — use for(;;) as a valid infinite loop
      const hasBrace = /\{\s*$/.test(middle);
      ctx.deviationContinuation = false;
      const devComment = '/* DEVIATION: ' + reason + ' — ' + content.replace(/\*\//g, '* /') + ' */';
      return indent + 'for (;;)' + (hasBrace ? ' { ' : ' ') + devComment;
    } else {
      prefix = m[0];
      middle = middle.substring(m[0].length);
    }
  } else if ((m = middle.match(/^(return)\s+/))) {
    prefix = m[1] + ' ';
    middle = middle.substring(m[0].length);
  } else if ((m = middle.match(/^(return)\s*;/))) {
    ctx.deviationContinuation = false;
    return indent + 'return; /* DEVIATION: ' + reason + ' */';
  } else if (/^\}/.test(middle)) {
    prefix = '}';
    middle = middle.substring(1).trim();
    if ((m = middle.match(/^(else\s+if)\s*\(/))) {
      const afterCond = tryExtractCondition(middle.substring(m[0].length));
      if (afterCond !== null) {
        prefix += ' ' + m[1] + ' (';
        middle = afterCond;
        suffix = ')';
      } else {
        prefix += ' ' + m[1] + ' (';
        middle = middle.substring(m[0].length);
      }
    } else if ((m = middle.match(/^(else)\s*/))) {
      prefix += ' ' + m[1] + ' ';
      middle = middle.substring(m[0].length);
    }
  } else if ((m = middle.match(/^(break)\s*;?\s*$/))) {
    ctx.deviationContinuation = false;
    return indent + 'break; /* DEVIATION: ' + reason + ' */';
  } else if ((m = middle.match(/^(continue)\s*;?\s*$/))) {
    ctx.deviationContinuation = false;
    return indent + 'continue; /* DEVIATION: ' + reason + ' */';
  }

  // Extract trailing structural tokens
  middle = middle.trim();
  if (/\{\s*$/.test(middle)) {
    middle = middle.replace(/\{\s*$/, '').trim();
    suffix = suffix + ' {';
  }
  if (/;\s*$/.test(middle)) {
    middle = middle.replace(/;\s*$/, '').trim();
    suffix = suffix + ';';
  }
  if (/\}\s*$/.test(middle) && !prefix.includes('}')) {
    middle = middle.replace(/\}\s*$/, '').trim();
    suffix = '}' + suffix;
  }

  // Determine if this is a multi-line DEVIATION (no terminator)
  if (!suffix.includes(';') && !suffix.includes('{')) {
    ctx.deviationContinuation = true;
    // true was already emitted — continuation should not add another
    ctx.wholeLineDeviation = true;
  } else {
    ctx.deviationContinuation = false;
  }

  // Build the output
  const devComment = '/* DEVIATION: ' + reason + ' — ' + content.replace(/\*\//g, '* /') + ' */';

  if (!middle && !prefix) {
    return indent + (suffix || ';') + ' ' + devComment;
  }

  return indent + prefix + 'true ' + devComment + suffix;
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

    // ── Rename JS reserved words used as C variable names ──
    out = out.replace(/\bthis\b(?!\s*\.)/g, '_this');  // this → _this (but not this.property)

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
    out = replaceCast(out, 'sbyte', 's8');
    out = replaceCast(out, 'byte', 'u8');
    out = replaceCast(out, 'uchar', 'u8');
    out = replaceCast(out, 'undefined1', 'u8');

    // ── All remaining casts use balanced expression extraction ──
    // Process INNER casts before OUTER ones: (uint)(int)(short)x
    // Order: innermost first → (short), (ushort), (int), then (uint)

    // (short) → sign-extend 16-bit
    out = replaceCast(out, 'short', null, expr => '((' + expr + ') << 16 >> 16)');

    // (ushort) → mask 16-bit
    out = replaceCast(out, 'ushort', null, expr => '((' + expr + ') & 0xFFFF)');

    // (bool) → ternary
    out = replaceCast(out, 'bool', null, expr => '((' + expr + ') ? 1 : 0)');

    // (int) → drop (no-op) — MUST run before (uint) so (uint)(int)x doesn't consume (int) as value
    out = replaceCast(out, 'int', null, expr => expr);
    // Fallback: drop any remaining (int) that replaceCast couldn't extract (e.g., before strings)
    out = out.replace(/\(\s*int\s*\)/g, '');

    // (uint) after unsigned helper → drop
    out = out.replace(/\(\s*uint\s*\)\s*(u8|u16|u32)\(/g, '$1(');
    // (int)(expr >>> 0) → (expr) | 0  (runs after int is dropped, catches remaining pattern)
    out = out.replace(/\(\s*int\s*\)\s*\(\s*\(([^)]+)\)\s*>>>\s*0\s*\)/g, '(($1) | 0)');
    // (uint) → expr >>> 0
    out = replaceCast(out, 'uint', null, expr => '((' + expr + ') >>> 0)');

    // (undefined4) → drop (no-op)
    out = replaceCast(out, 'undefined4', null, expr => expr);

    // (undefined2) → mask 16-bit
    out = replaceCast(out, 'undefined2', null, expr => '((' + expr + ') & 0xFFFF)');

    // (int3) → mask 24-bit (Ghidra partial-width cast)
    out = replaceCast(out, 'int3', null, expr => '((' + expr + ') & 0xFFFFFF)');

    // ── Cast: (longlong), (float10), (float), (double) → drop ──
    out = out.replace(/\(\s*(?:u?longlong|float10|float|double)\s*\)/g, '');

    // ── C calling conventions and keywords → drop ──
    out = out.replace(/\b(__cdecl|__stdcall|__fastcall|__thiscall)\b/g, '');

    // ── C wide string prefix: L"..." → "..." ──
    out = out.replace(/\bL"/g, '"');

    // ── Ghidra sub-field access: expr._N_M_ → expr (drop sub-field) ──
    out = out.replace(/\._\d+_\d+_/g, '');

    // ── bRam → DAT_ ──
    out = out.replace(/\bbRam([0-9a-fA-F]{8})/g, 'DAT_$1');

    // ── Sanitize Ghidra string labels with special characters ──
    // s_text_with_<_or_(_ADDR → s_text_with___or___ADDR
    // Only match when special char is INSIDE the identifier (followed by more word chars)
    out = out.replace(/\bs_[a-zA-Z0-9_]*[<>()\[\]][a-zA-Z0-9_<>()\[\]]*[a-zA-Z0-9_]/g,
      (m) => m.replace(/[<>()\[\]]/g, '_'));

    // ── Ghidra CONCAT: CONCATxy(a, b) → (a << (y*8)) | b ──
    // CONCAT11(a,b) = (a << 8) | b  (2 bytes from 1+1)
    // CONCAT12(a,b) = (a << 16) | b (3 bytes from 1+2)
    // CONCAT13(a,b) = (a << 24) | b (4 bytes from 1+3)
    // CONCAT22(a,b) = (a << 16) | b (4 bytes from 2+2)
    // CONCAT31(a,b) = (a << 8) | b  (4 bytes from 3+1)
    // CONCAT44(a,b) = (a << 32) | b (8 bytes from 4+4) — but JS doesn't do 64-bit, approximate
    out = out.replace(/\bCONCAT(\d)(\d)\b/g, (m, x, y) => {
      const shift = parseInt(y) * 8;
      return 'CONCAT_' + x + y; // placeholder — replaced below
    });
    // Replace CONCAT_XY(a, b) with (a << shift | b) using balanced paren extraction
    {
      const concatRe = /\bCONCAT_(\d)(\d)\s*\(/g;
      let cm;
      let newOut2 = '';
      let lastIdx2 = 0;
      while ((cm = concatRe.exec(out)) !== null) {
        const shift = parseInt(cm[2]) * 8;
        const parenStart = out.indexOf('(', cm.index + cm[0].length - 1);
        const balanced = extractBalancedParens(out, parenStart);
        if (!balanced) continue;
        newOut2 += out.substring(lastIdx2, cm.index);
        // Split content at top-level comma
        const content = balanced.content;
        let depth = 0, commaPos = -1;
        for (let ci = 0; ci < content.length; ci++) {
          if (content[ci] === '(' || content[ci] === '[') depth++;
          if (content[ci] === ')' || content[ci] === ']') depth--;
          if (content[ci] === ',' && depth === 0) { commaPos = ci; break; }
        }
        if (commaPos > 0) {
          const a = content.substring(0, commaPos).trim();
          const b = content.substring(commaPos + 1).trim();
          if (shift <= 24) {
            newOut2 += '((' + a + ') << ' + shift + ' | (' + b + '))';
          } else {
            // 64-bit — approximate with just the lower part
            newOut2 += '(' + b + ')';
          }
        } else {
          newOut2 += cm[0] + balanced.content + ')';
        }
        lastIdx2 = balanced.end + 1;
        concatRe.lastIndex = lastIdx2;
      }
      if (lastIdx2 > 0) {
        newOut2 += out.substring(lastIdx2);
        out = newOut2;
      }
    }

    // ── C struct member access: expr->member → DEVIATION ──
    // Deviate the whole line since -> implies pointer context we can't translate
    if (/->/.test(out) && !/\/\/|DEVIATION/.test(out)) {
      out = makeDeviation(out, 'C struct', ctx);
    }

    // ── &local_XX → local_XX (drop &) ──
    out = out.replace(/&(local_[0-9a-fA-F]+)/g, '$1');

    // ── &DAT_xxx + expr → ptrAdd(DAT_xxx, expr) — pointer arithmetic ──
    // Must run BEFORE the blanket & drop. Converts address+offset to subarray helper.
    // Capture the full offset expression including * / + - operators
    {
      const ptrRe = /&(DAT_[0-9a-fA-F]+)\s*\+\s*/g;
      let pm;
      let newOut5 = '';
      let lastIdx5 = 0;
      while ((pm = ptrRe.exec(out)) !== null) {
        const afterPlus = pm.index + pm[0].length;
        // Consume offset expression: everything up to ), ,, ;, or unbalanced ) at depth 0
        let depth = 0;
        let end = afterPlus;
        for (let ci = afterPlus; ci < out.length; ci++) {
          const ch = out[ci];
          if (ch === '(' || ch === '[') depth++;
          if (ch === ')' || ch === ']') {
            if (depth === 0) break; // unbalanced close — stop before it
            depth--;
          }
          if (ch === ',' && depth === 0) break;
          if (ch === ';' && depth === 0) break;
          end = ci + 1;
        }
        if (end > afterPlus) {
          const offsetExpr = out.substring(afterPlus, end).trim();
          newOut5 += out.substring(lastIdx5, pm.index);
          newOut5 += 'ptrAdd(' + pm[1] + ', ' + offsetExpr + ')';
          lastIdx5 = end;
          ptrRe.lastIndex = lastIdx5;
        }
      }
      if (lastIdx5 > 0) {
        newOut5 += out.substring(lastIdx5);
        out = newOut5;
      }
    }

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
    if (/\w+::~?\w+\s*[(\[,]/.test(out) && !/\/\//.test(out.split('::')[0])) {
      out = makeDeviation(out, 'MFC', ctx);
    }

    // ── Bare pointer dereference: *variable → s32(variable, 0) ──
    // Only match specific Ghidra variable patterns to avoid catching multiplication
    out = out.replace(/(?<![a-zA-Z0-9_])\*([a-zA-Z_]\w*Var\d+|in_E\w+|DAT_[0-9a-fA-F]+|PTR_\w+|param_\d+|local_\w+|unaff_\w+|extraout_\w+|p[A-Z]\w*Var\d+|p_\w+|_\w+|arg\w*)(?!\s*\()/g,
      (m, name) => 's32(' + name + ', 0)');
    // ── Bare pointer deref with parens: *(expr) → s32(expr, offset) ──
    // Only match when * is a dereference (after =, (, ,, ;, space, start)
    {
      let newOut = '';
      let lastIdx = 0;
      const derefRe = /(?<=[=(,;\s(]|^)\*\(/g;
      let dm;
      while ((dm = derefRe.exec(out)) !== null) {
        const parenStart = dm.index + dm[0].length - 1; // position of (
        const balanced = extractBalancedParens(out, parenStart);
        if (!balanced) continue;
        // Skip if content looks like a C type cast: has (word *) pattern at end
        if (/\(\s*\w+\s*\*+\s*\)/.test('(' + balanced.content + ')')) continue;
        newOut += out.substring(lastIdx, dm.index);
        const inner = balanced.content.trim();
        const parts = splitBaseOffset(inner);
        if (parts) {
          newOut += 's32(' + parts.base + ', ' + parts.offset + ')';
        } else {
          newOut += 's32(' + inner + ', 0)';
        }
        lastIdx = balanced.end + 1;
        derefRe.lastIndex = lastIdx;
      }
      if (lastIdx > 0) {
        newOut += out.substring(lastIdx);
        out = newOut;
      }
    }

    // ── C-style pointer casts without dereference: (TYPE *)expr → expr ──
    // Match any (word *) or (word **) that's not preceded by * (those are pointer derefs)
    out = out.replace(/(?<!\*\s*)\(\s*\w+\s*\*+\s*\)\s*(?=[\(\w&*])/g, '');

    // ── Remaining C type casts: (TYPE)expr → drop ──
    // (ALLCAPS_WORD) that's NOT a code reference → drop
    out = out.replace(/\(\s*([A-Z][A-Z_0-9]+)\s*\)/g, (m, name) => {
      if (/^(DAT_|FUN_|PTR_|LAB_|ADDR|CONCAT)/.test(name)) return m;
      return '';
    });
    // (CamelCase *) pointer casts → drop
    out = out.replace(/\(\s*[A-Z]\w+\s*\*+\s*\)/g, '');
    // (lowercase *) pointer casts WITHOUT leading * (not deref): (undefined *), (code *), (void *), etc.
    out = out.replace(/(?<!\*\s*)\(\s*(?:undefined|code|void|ios)\s*\**\s*\)/g, '');
    // C-runtime type casts: (_onexit_t), (intptr_t), (size_t), (wchar_t), etc.
    out = out.replace(/\(\s*\w+_t\s*\)/g, '');
    // Other lowercase C types not already handled
    out = out.replace(/\(\s*(?:long|ulong)\s*\)/g, '');

    // ── Remaining C-style pointer derefs that weren't handled ──
    // Instead of deviating the whole line, replace the *(type *)(...) part inline.
    // For balanced expressions: replace the whole *(type *)(expr) with true /* ... */
    // For unbalanced (multi-line): replace *(type *)(rest to end of line
    if (/\*\s*\(\s*\w[\w\s]*\*+\s*\)/.test(out) && !/\/\/|DEVIATION/.test(out)) {
      // Try to find and replace with balanced parens first
      const ptrRe = /\*\s*\(\s*\w[\w\s]*\*+\s*\)\s*\(/g;
      let pm;
      let newOut = '';
      let lastIdx = 0;
      let usedInline = false;
      while ((pm = ptrRe.exec(out)) !== null) {
        const parenStart = out.lastIndexOf('(', pm.index + pm[0].length - 1);
        const balanced = extractBalancedParens(out, parenStart);
        // Check for leading * before the match (double dereference: **(type **))
        let matchStart = pm.index;
        while (matchStart > lastIdx && out[matchStart - 1] === '*') matchStart--;
        newOut += out.substring(lastIdx, matchStart);
        if (balanced) {
          let endPos = balanced.end + 1;
          // Check if followed by = (assignment) — consume "= value" too
          // Otherwise we'd produce "true = value" which is invalid
          const afterExpr = out.substring(endPos).match(/^\s*=(?!=)\s*/);
          if (afterExpr) {
            // Find the extent of the value: up to , or ) at the same paren depth
            let valStart = endPos + afterExpr[0].length;
            let valDepth = 0;
            let valEnd = valStart;
            for (let vi = valStart; vi < out.length; vi++) {
              if (out[vi] === '(' || out[vi] === '[') valDepth++;
              if (out[vi] === ')' || out[vi] === ']') { if (valDepth === 0) break; valDepth--; }
              if (out[vi] === ',' && valDepth === 0) break;
              valEnd = vi + 1;
            }
            endPos = valEnd;
          }
          const original = out.substring(matchStart, endPos);
          newOut += 'true /* DEVIATION: C pointer — ' + original.replace(/\*\//g, '* /') + ' */';
          lastIdx = endPos;
          ptrRe.lastIndex = lastIdx;
        } else {
          const original = out.substring(matchStart);
          newOut += 'true /* DEVIATION: C pointer — ' + original.replace(/\*\//g, '* /') + ' */';
          lastIdx = out.length;
          ctx.ptrDeviationContinuation = true;
          break;
        }
        usedInline = true;
      }
      if (lastIdx > 0) {
        newOut += out.substring(lastIdx);
        out = newOut;
      } else if (!usedInline && /\*\s*\(\s*\w[\w\s]*\*+\s*\)/.test(out)) {
        // Pattern matched but no ( after — consume *(type *) AND the following expression
        // so we don't leave "true identifier" with no operator between them
        const noParenRe = /\*+\s*\(\s*\w[\w\s]*\*+\s*\)/g;
        let npm;
        let newOut3 = '';
        let lastIdx3 = 0;
        while ((npm = noParenRe.exec(out)) !== null) {
          // Also capture leading * before the match
          let matchStart3 = npm.index;
          while (matchStart3 > lastIdx3 && out[matchStart3 - 1] === '*') matchStart3--;
          newOut3 += out.substring(lastIdx3, matchStart3);
          // Try to consume the following expression using extractExpression
          const afterCast = npm.index + npm[0].length;
          const followExpr = extractExpression(out, afterCast);
          let endPos;
          if (followExpr) {
            endPos = followExpr.end;
          } else {
            endPos = afterCast;
          }
          const original = out.substring(matchStart3, endPos);
          newOut3 += 'true /* DEVIATION: C pointer — ' + original.replace(/\*\//g, '* /') + ' */';
          lastIdx3 = endPos;
          noParenRe.lastIndex = lastIdx3;
        }
        if (lastIdx3 > 0) {
          newOut3 += out.substring(lastIdx3);
          out = newOut3;
        }
      }
    }

    // ── Post-cast bare * cleanup ──
    // After all casts like (HGDIOBJ *) are stripped, a bare *(expr) or *variable may remain.
    // First: normalize "* (" to "*(" when * is clearly a dereference (after (, ,, =)
    out = out.replace(/([=(,])\s*\*\s+\(/g, '$1*(');
    // Re-run the bare deref handlers to catch these.
    // *variable → s32(variable, 0) for known patterns
    out = out.replace(/(?<![a-zA-Z0-9_])\*([a-zA-Z_]\w*Var\d+|in_E\w+|DAT_[0-9a-fA-F]+|PTR_\w+|param_\d+|local_\w+|unaff_\w+|extraout_\w+|p[A-Z]\w*Var\d+|_\w+|lp\w+)(?!\s*\()/g,
      (m, name) => 's32(' + name + ', 0)');
    // *(expr) where * is after =, (, ,, ;, space — deref not multiplication
    {
      let newOut4 = '';
      let lastIdx4 = 0;
      const derefRe2 = /(?<=[=(,;\s(]|^)\*\(/g;
      let dm2;
      while ((dm2 = derefRe2.exec(out)) !== null) {
        const parenStart2 = dm2.index + dm2[0].length - 1;
        const balanced2 = extractBalancedParens(out, parenStart2);
        if (!balanced2) continue;
        // Skip if content looks like a C type cast: has (word *) pattern
        if (/\(\s*\w+\s*\*+\s*\)/.test('(' + balanced2.content + ')')) continue;
        newOut4 += out.substring(lastIdx4, dm2.index);
        const inner2 = balanced2.content.trim();
        const parts2 = splitBaseOffset(inner2);
        if (parts2) {
          newOut4 += 's32(' + parts2.base + ', ' + parts2.offset + ')';
        } else {
          newOut4 += 's32(' + inner2 + ', 0)';
        }
        lastIdx4 = balanced2.end + 1;
        derefRe2.lastIndex = lastIdx4;
      }
      if (lastIdx4 > 0) {
        newOut4 += out.substring(lastIdx4);
        out = newOut4;
      }
    }

    // ── Equality operators ──
    out = out.replace(/([^=!<>])={2}(?!=)/g, '$1===');
    out = out.replace(/!={1}(?!=)/g, '!==');

    // ── Null pointer: (TYPE *)0x0 → null ──
    out = out.replace(/\(\s*\w+\s*\*\s*\)\s*0x0\b/g, 'null');
    out = out.replace(/\(\s*\w+\s*\*\s*\)\s*0\b/g, 'null');

    // ── (code *)0x0 → null ──
    out = out.replace(/\(\s*code\s*\*\s*\)\s*0x0\b/g, 'null');

    // ── DAT_xxx[idx] → _MEM[DAT_xxx + idx]: byte array access ──
    // With DAT_xxx as a number (offset), bracket access needs _MEM
    out = out.replace(
      /\b(_?DAT_[0-9a-fA-F]+)\[/g,
      (m, name) => '_MEM[' + name + ' + '
    );
    // Fix: _MEM[DAT_xxx + ] (empty index from consecutive replacements)
    // Close any remaining brackets correctly

    // ── v(DAT_xxx): wrap bare DAT_ value reads ──
    // In C, using DAT_xxx reads the value at that address.
    // In JS with the flat memory model, DAT_xxx is a number (offset).
    // v() reads the int32 value at that offset from _MEM.
    // Skip: first arg to memory helpers, bracket access, write targets, &DAT
    out = out.replace(
      /\b(_?DAT_[0-9a-fA-F]+)\b(?!\s*[\[,])(?!\s*=(?!=))/g,
      (m, name, matchOffset) => {
        // Check preceding context: is this the first arg to a memory helper?
        const before = out.substring(Math.max(0, matchOffset - 40), matchOffset);
        if (/(?:s32|u32|s16|u16|s8|u8|w32|w16|w32r|w16r|ptrAdd|v|wv)\(\s*$/.test(before)) return m;
        if (/&\s*$/.test(before)) return m;
        if (/_MEM\[\s*$/.test(before)) return m;
        if (/_MEM\[.*\+\s*$/.test(before)) return m;
        return 'v(' + name + ')';
      }
    );
    // ── wv(DAT_xxx, expr): convert DAT_ value writes ──
    // DAT_xxx = expr → wv(DAT_xxx, expr)
    // Must run AFTER v() wrapping (which skips = targets via negative lookahead)
    {
      const wvRe = /\b(_?DAT_[0-9a-fA-F]+)\s*=(?!=)/g;
      let wm;
      let newOut6 = '';
      let lastIdx6 = 0;
      while ((wm = wvRe.exec(out)) !== null) {
        const valStart = wm.index + wm[0].length;
        // Find the end of the value expression
        let depth = 0;
        let valEnd = valStart;
        for (let ci = valStart; ci < out.length; ci++) {
          if (out[ci] === '(' || out[ci] === '[') depth++;
          if (out[ci] === ')' || out[ci] === ']') { if (depth === 0) { valEnd = ci; break; } depth--; }
          if ((out[ci] === ';' || out[ci] === ',') && depth === 0) { valEnd = ci; break; }
          valEnd = ci + 1;
        }
        const valExpr = out.substring(valStart, valEnd).trim();
        newOut6 += out.substring(lastIdx6, wm.index);
        newOut6 += 'wv(' + wm[1] + ', ' + valExpr + ')';
        lastIdx6 = valEnd;
        wvRe.lastIndex = lastIdx6;
      }
      if (lastIdx6 > 0) {
        newOut6 += out.substring(lastIdx6);
        out = newOut6;
      }
    }

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
  // Must skip /* ... */ block comments first
  let sigLine = '';
  let sigStartIdx = -1;
  let sigEndIdx = -1;
  let inSigComment = false;
  for (let i = 0; i < bodyLines.length; i++) {
    const t = bodyLines[i].trim();
    // Skip block comments
    if (inSigComment) { if (/\*\//.test(t)) inSigComment = false; continue; }
    if (/^\/\*/.test(t)) { if (!/\*\//.test(t)) inSigComment = true; continue; }
    if (/^\w/.test(t) && !/^\/\//.test(t) && !/^\{/.test(t)) {
      // Signature may start here — could be single-line or multi-line
      sigStartIdx = i;
      sigLine = t;
      // Join lines until we find both ( and )
      while ((!/\(/.test(sigLine) || !/\)/.test(sigLine)) && i + 1 < bodyLines.length) {
        const nextT = bodyLines[i + 1].trim();
        if (nextT === '{' || nextT === '') break; // hit body or blank
        i++;
        sigLine += ' ' + nextT;
        sigEndIdx = i;
      }
      if (sigEndIdx < 0) sigEndIdx = sigStartIdx;
      // Must have ( to be a valid signature
      if (/\(/.test(sigLine)) break;
      // Not a signature — reset and continue
      sigLine = '';
      sigStartIdx = -1;
      sigEndIdx = -1;
      continue;
    }
  }
  // Strip C calling conventions from signature
  sigLine = sigLine.replace(/\b(__cdecl|__stdcall|__fastcall|__thiscall)\b\s*/g, '');

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

  // Find register params (in_EAX, in_ECX, etc.) and callee-saved (unaff_*)
  // Scan body for ANY unaff_ or in_E declaration and promote to parameter
  const regOrder = ['in_EAX', 'in_ECX', 'in_EDX'];
  for (const reg of regOrder) {
    if (new RegExp('\\b' + reg + '\\b').test(bodyText) &&
        new RegExp('^\\s*\\w[\\w\\s*]*\\s+\\*?' + reg + '\\s*;', 'm').test(bodyText)) {
      regParams.push(reg);
    }
  }
  // Find ALL unaff_ declarations dynamically
  for (const m of bodyText.matchAll(/^\s*\w[\w\s*]*\s+\*?(unaff_\w+)\s*;/gm)) {
    if (m[1] === 'unaff_FS_OFFSET') continue; // SEH — handled separately
    if (!regParams.includes(m[1])) regParams.push(m[1]);
  }

  // Find &local_XX patterns
  for (const m of bodyText.matchAll(/&(local_[0-9a-fA-F]+)/g)) {
    localArrays.add(m[1]);
  }

  // Build JS signature — rename reserved words
  const allParams = [...regParams, ...sigParams].map(p => p === 'this' ? '_this' : p);
  const jsSig = 'export function ' + funcName + '(' + allParams.join(', ') + ') {';

  // Check if function returns a value
  const returnsValue = /^(?:int|uint|undefined4|undefined|byte|char|short|ushort|bool|code)\s/.test(sigLine.trim()) &&
                       !/^void\s/.test(sigLine.trim());

  // ── Pre-pass: join multi-line C expressions into single lines ──
  // This lets transformLine() handle balanced parens correctly.
  // Joined continuation lines become /*JOINED*/ markers to preserve 1:1 line count.
  {
    let inBraces = false;
    let inComment = false;
    let pastSig = false;
    for (let i = 0; i < bodyLines.length; i++) {
      const t = bodyLines[i].trim();

      // Track block comments
      if (inComment) { if (/\*\//.test(t)) inComment = false; continue; }
      if (/^\/\*/.test(t) && !/\*\//.test(t)) { inComment = true; continue; }
      if (/^\/\*/.test(t)) continue; // single-line block comment
      if (/^\/\//.test(t)) continue; // line comment

      // Skip until we're past the signature and opening brace
      if (!pastSig) {
        if (i >= sigStartIdx && i <= sigEndIdx) continue;
        if (t === '{') { pastSig = true; continue; }
        if (t === '') continue;
        continue;
      }

      // Skip blank lines, lone braces, labels, gotos
      if (t === '' || t === '{' || t === '}') continue;
      if (/^goto\s/.test(t)) continue;
      if (/^\w+:$/.test(t)) continue; // label

      // Skip lines that are already complete (end with ;, {, or })
      // Exception: for() statements have ; between clauses — don't skip those
      if ((/;\s*$/.test(t) || /\{\s*$/.test(t) || /\}\s*$/.test(t)) && !/^\s*for\s*\(/.test(t)) continue;

      // Count paren/bracket depth for this line
      let depth = 0;
      for (const ch of t) {
        if (ch === '(' || ch === '[') depth++;
        if (ch === ')' || ch === ']') depth--;
      }

      // If depth > 0, this line has unclosed parens — join subsequent lines
      if (depth > 0) {
        const indent = bodyLines[i].match(/^(\s*)/)[1];
        let joined = t;
        let j = i + 1;
        while (depth > 0 && j < bodyLines.length) {
          const nextT = bodyLines[j].trim();
          // Don't join across blank lines or lone braces
          if (nextT === '' || nextT === '{' || nextT === '}') break;
          joined += ' ' + nextT;
          for (const ch of nextT) {
            if (ch === '(' || ch === '[') depth++;
            if (ch === ')' || ch === ']') depth--;
          }
          // Replace the joined line with a marker (preserving indent)
          const nextIndent = bodyLines[j].match(/^(\s*)/)[1];
          bodyLines[j] = nextIndent + '/*JOINED*/';
          j++;
        }
        // After paren join, continue if result ends with trailing operator
        while (/[+\-*/,&|]\s*$/.test(joined) && j < bodyLines.length) {
          const nextT = bodyLines[j].trim();
          if (nextT === '' || nextT === '{' || nextT === '}') break;
          joined += ' ' + nextT;
          const nextIndent = bodyLines[j].match(/^(\s*)/)[1];
          bodyLines[j] = nextIndent + '/*JOINED*/';
          j++;
          if (/;\s*$/.test(nextT) || /\{\s*$/.test(nextT)) break;
        }
        // Only update if we actually joined something
        if (j > i + 1) {
          bodyLines[i] = indent + joined;
        }
      }

      // Also join lines that end with trailing operators (&&, ||, +, -, *, ,)
      // or with a C type cast (TYPE *) which means expression continues
      else if ((/[+\-*/,&|]\s*$/.test(t) || /\(\s*\w+\s*\*+\s*\)\s*$/.test(t)) && depth === 0) {
        const indent = bodyLines[i].match(/^(\s*)/)[1];
        let joined = t;
        let j = i + 1;
        let runningDepth = 0;
        while (j < bodyLines.length) {
          const nextT = bodyLines[j].trim();
          if (nextT === '' || nextT === '{' || nextT === '}') break;
          joined += ' ' + nextT;
          for (const ch of nextT) {
            if (ch === '(' || ch === '[') runningDepth++;
            if (ch === ')' || ch === ']') runningDepth--;
          }
          const nextIndent = bodyLines[j].match(/^(\s*)/)[1];
          bodyLines[j] = nextIndent + '/*JOINED*/';
          j++;
          // Stop when we hit ; or { or depth returns to 0 after closing
          if (/;\s*$/.test(nextT) || /\{\s*$/.test(nextT)) break;
          if (runningDepth <= 0 && !/[+\-*/,&|]\s*$/.test(nextT)) break;
        }
        if (j > i + 1) {
          bodyLines[i] = indent + joined;
        }
      }
    }
  }

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

    // ── Joined continuation lines (from pre-pass) ──
    if (trimmed === '/*JOINED*/') {
      result.push(line);
      continue;
    }

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

    // Track brace depth — strip comments, char literals, and strings first
    const braceStr = trimmed
      .replace(/\/\*.*?\*\//g, '')     // block comments
      .replace(/\/\/.*/g, '')          // line comments
      .replace(/'[^']*'/g, '')         // char literals (may contain {})
      .replace(/"[^"]*"/g, '');        // string literals (may contain {})
    for (const ch of braceStr) {
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
    // Match C variable declaration: TYPE [*]name[N];
    // Exclude: lines where "TYPE" is a DAT_/FUN_ reference (those are expressions, not declarations)
    const declMatch = trimmed.match(/^(\w[\w\s]*?)\s+(\*?\s*\w+(?:\s*\[\s*\d+\s*\])?)\s*;$/);
    const isKeyword = /^(if|else|for|while|do|switch|case|return|break|continue|let|var|const|export|import|function|goto)\b/.test(trimmed);
    const isDatExpr = /^(DAT_|FUN_|s_|PTR_)/.test(trimmed); // expression, not declaration
    if (declMatch && !isKeyword && !isDatExpr) {
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
      // Rename JS reserved words
      if (declStr === 'this') declStr = '_this';
      if (declStr === 'class') declStr = '_class';
      if (declStr === 'super') declStr = '_super';
      if (declStr === 'new') declStr = '_new';
      if (declStr === 'delete') declStr = '_delete';
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
    const writeMatch = trimmed.match(/^\*\s*\(\s*(int|uint|short|ushort|undefined4|undefined2|undefined1|char|byte)\s*\*\s*\)\s*\(([^)]+)\)\s*=\s*(.+);$/);
    if (writeMatch) {
      const wType = writeMatch[1];
      const inner = writeMatch[2].trim();
      let val = writeMatch[3].trim();
      val = transformLine('  ' + val, ctx).trim();
      const parts = splitBaseOffset(inner);
      if (wType === 'undefined1' || wType === 'char' || wType === 'byte') {
        // Byte write → base[offset] = value (need parens if base is complex expression)
        if (parts) {
          const base = transformLine('  ' + parts.base, ctx).trim();
          const offset = transformLine('  ' + parts.offset, ctx).trim();
          result.push(line.replace(trimmed, base + '[' + offset + '] = ' + val + ';'));
        } else {
          const base = transformLine('  ' + inner, ctx).trim();
          // Wrap in parens if base contains operators
          const needsParens = /[+\-*\/%]/.test(base);
          const baseExpr = needsParens ? '(' + base + ')' : base;
          result.push(line.replace(trimmed, baseExpr + '[0] = ' + val + ';'));
        }
      } else {
        const wHelper = (wType === 'short' || wType === 'ushort' || wType === 'undefined2') ? 'w16' : 'w32';
        if (parts) {
          const base = transformLine('  ' + parts.base, ctx).trim();
          const offset = transformLine('  ' + parts.offset, ctx).trim();
          result.push(line.replace(trimmed, wHelper + '(' + base + ', ' + offset + ', ' + val + ');'));
        } else {
          const base = transformLine('  ' + inner, ctx).trim();
          result.push(line.replace(trimmed, wHelper + '(' + base + ', 0, ' + val + ');'));
        }
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
      openWriteCall = false; // cancel any pending write — DEVIATION consumed it
      const indent = line.match(/^(\s*)/)[1];

      // For line-comment style DEVIATIONs (writes), use old-style // continuation
      if (ctx.lineCommentDeviation) {
        let prefix = '';
        if (/^\}/.test(trimmed)) { prefix = '}'; }
        else if (/^break\s*;?\s*$/.test(trimmed)) { prefix = 'break;'; }

        const cont = prefix ? prefix + ' // DEVIATION(cont): ' + trimmed : indent + '// DEVIATION(cont): ' + trimmed;
        result.push(prefix ? indent + cont : cont);

        if (/;\s*$/.test(trimmed) || /^\s*\}/.test(line) || /break/.test(trimmed)) {
          ctx.deviationContinuation = false;
          ctx.lineCommentDeviation = false;
        }
        continue;
      }

      // For true /* */ style DEVIATIONs, preserve structural tokens
      let prefix = '';
      let suffix = '';
      let inner = trimmed;

      // Leading } — always extract
      if (/^\}\s*else\s*\{/.test(inner)) { prefix = '} else {'; inner = ''; }
      else if (/^\}\s*else\b/.test(inner)) { prefix = '} else'; inner = inner.replace(/^\}\s*else\s*/, '').trim(); }
      else if (/^\}/.test(inner)) { prefix = '}'; inner = inner.substring(1).trim(); }

      // break; — always extract
      if (/^break\s*;?\s*$/.test(inner)) { prefix += (prefix ? ' ' : '') + 'break;'; inner = ''; }
      // continue; — always extract
      if (/^continue\s*;?\s*$/.test(inner)) { prefix += (prefix ? ' ' : '') + 'continue;'; inner = ''; }

      // Trailing {
      if (/\{\s*$/.test(inner)) {
        inner = inner.replace(/\{\s*$/, '').trim();
        suffix = ' {';
      }
      // Trailing ;
      if (/;\s*$/.test(inner)) {
        inner = inner.replace(/;\s*$/, '').trim();
        suffix = ';' + suffix;
      }
      // Trailing ) — extract closing parens that close an outer (non-deviated) context
      // Check how many unclosed parens exist in non-DEVIATION code on preceding lines
      {
        let outerParenDepth = 0;
        for (let j = result.length - 1; j >= 0; j--) {
          const prev = result[j];
          // Strip DEVIATION comments to count only structural parens
          const stripped = prev.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*/g, '');
          if (stripped.trim() === '' || stripped.trim() === '}') continue;
          // Stop at statement boundaries BEFORE counting (prev statement's parens don't matter)
          if (/;\s*$/.test(stripped.trim())) break;
          for (const ch of stripped) {
            if (ch === '(') outerParenDepth++;
            if (ch === ')') outerParenDepth--;
          }
        }
        // Extract only as many ) as there are unclosed outer parens
        if (outerParenDepth > 0) {
          let parenBalance = 0;
          for (const ch of inner) { if (ch === '(') parenBalance++; if (ch === ')') parenBalance--; }
          if (parenBalance < 0) {
            const toExtract = Math.min(-parenBalance, outerParenDepth);
            let stripped = inner;
            let removed = 0;
            while (removed < toExtract && /\)\s*$/.test(stripped)) {
              stripped = stripped.replace(/\)\s*$/, '').trim();
              removed++;
            }
            inner = stripped;
            suffix = ')'.repeat(removed) + suffix;
          }
        }
      }

      if (inner) {
        const devComment = '/* DEVIATION(cont): ' + inner.replace(/\*\//g, '* /') + ' */';
        // Don't add 'true' if the previous line already emitted it
        const skipTrue = ctx.inlineDeviation || ctx.wholeLineDeviation;
        const valueExpr = skipTrue ? '' : 'true ';
        result.push(indent + prefix + (prefix ? ' ' : '') + valueExpr + devComment + suffix);
      } else {
        const contComment = prefix ? '' : '/* DEVIATION(cont) */';
        result.push(indent + prefix + (contComment ? ' ' + contComment : '') + suffix);
      }

      // Stop continuation when we hit ; or { or }
      if (/;\s*$/.test(trimmed) || /\{\s*$/.test(trimmed) || /^\s*\}/.test(line) || /break/.test(trimmed)) {
        ctx.deviationContinuation = false;
        ctx.inlineDeviation = false;
        ctx.lineCommentDeviation = false;
        ctx.wholeLineDeviation = false;
      }
      continue;
    }

    // ── Continuation of multi-line w16/w32 call ──
    if (openWriteCall) {
      let transformed = transformLine(line, ctx);
      if (/,\s*$/.test(transformed)) {
        // Comma-operator: close w16/w32 before the comma, and switch to w16r/w32r
        transformed = transformed.replace(/,\s*$/, '),');
        for (let j = result.length - 1; j >= 0; j--) {
          if (/\bw(16|32)r?\(/.test(result[j])) {
            result[j] = result[j].replace(/\bw(16|32)\(/, 'w$1r(');
            break;
          }
        }
        openWriteCall = false;
      } else if (/;\s*$/.test(transformed)) {
        transformed = transformed.replace(/;\s*$/, ');');
        openWriteCall = false;
      } else {
        // Value expression continues to next line — keep write call open
        // (3+ line write)
      }
      result.push(transformed);
      continue;
    }

    // ── Function pointer calls and Ghidra artifacts ──
    // (**(code **)(expr))(args), (*UNRECOVERED_JUMPTABLE)(), (*funcptr)(args)
    if (/^\(\s*\*+/.test(trimmed) && (/\bcode\s*\*/.test(trimmed) || /UNRECOVERED/.test(trimmed))) {
      result.push(makeDeviation(line, 'function pointer call', ctx));
      continue;
    }

    // ── Unhandled pointer WRITE at statement level ──
    // *(UNHANDLED_TYPE *)(expr) = value; → deviate the whole line
    // The typed write handler above already caught handled types (int, uint, etc.) and continued.
    // This catches what's left: double pointers (TYPE **), code *, void *, etc.
    if (/^\s*\*+\s*\(\s*\w[\w\s]*\*+\s*\)/.test(trimmed) && /=(?!=)/.test(trimmed)) {
      result.push(makeDeviation(line, 'C pointer write', ctx));
      continue;
    }

    // ── Apply line-level transformations ──
    ctx.ptrDeviationContinuation = false;
    let transformed = transformLine(line, ctx);

    // Propagate inline pointer deviation continuation
    if (ctx.ptrDeviationContinuation) {
      ctx.deviationContinuation = true;
      ctx.inlineDeviation = true; // don't add 'true' on continuation lines
      ctx.ptrDeviationContinuation = false;
    }

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
      /\b(s32|u32)\(([^,)]+),\s*([^)]+?)\)\s*=(?!=)\s*/g,
      (m, fn, base, off) => 'w32(' + base + ', ' + off + ', '
    );
    transformed = transformed.replace(
      /\b(s16|u16)\(([^,)]+),\s*([^)]+?)\)\s*=(?!=)\s*/g,
      (m, fn, base, off) => 'w16(' + base + ', ' + off + ', '
    );
    // Check if this line opened a w16/w32 call that continues on next line
    // (value expression is on the continuation line)
    // Check if a w16/w32 call is unclosed (value continues on next line)
    // Must verify the call is actually unclosed by counting parens from the w16/w32 match
    if (/\bw(?:32|16)\(/.test(transformed) && !/;\s*$/.test(transformed.trim())) {
      const wm2 = transformed.match(/\bw(?:32|16)\(/);
      if (wm2) {
        let d = 0;
        for (let ci = wm2.index; ci < transformed.length; ci++) {
          if (transformed[ci] === '(') d++;
          if (transformed[ci] === ')') d--;
          if (d === 0) break;
        }
        if (d > 0) openWriteCall = true; // truly unclosed
      }
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
    if (ft && !ft.startsWith('//') && !ft.startsWith('/*') && !ft.startsWith('}') && !ft.startsWith('{') && !/DEVIATION/.test(ft)) {
      // Check for patterns that are invalid JS
      if (/\*\s*\(\s*\w+\s*\*/.test(ft) ||  // *(type *) — including handled types that failed (multi-line)
          /\(\s*void\s*\)\s*\w/.test(ft) ||  // (void)expr
          /\b(void|struct|union|enum|typedef|register|volatile|extern|static|signed|unsigned)\s+\w/.test(ft) ||
          /^\w+\s+\w+\s*\(/.test(ft) && /\)$/.test(ft) ||  // C function signature
          /^[A-Z]\w+\s*::\s*~?[A-Z]/.test(ft)) {  // C++ class::method
        transformed = makeDeviation(transformed, 'C-syntax', ctx);
      }
    }

    result.push(transformed);
  }

  // ── Post-process: fix dangling operators before DEVIATION lines ──
  // When a code line ends with +, -, *, &&, ||, , and the next line
  // is a DEVIATION comment, the expression is incomplete. Add 0 to complete it.
  for (let i = 0; i < result.length - 1; i++) {
    const code = result[i].split('//')[0].trimEnd();
    const nextTrimmed = result[i + 1].trim();
    if (code && /[+\-*&|,]\s*$/.test(code) && nextTrimmed.startsWith('// DEVIATION')) {
      // Append 0 to complete the dangling expression
      result[i] = result[i].replace(/([+\-*&|,])\s*$/, '$1 0');
    }
  }

  // ── Post-process: fix single-line w32/w16 comma-operator (4+ args) ──
  // w32(a, b, c, expr) → w32r(a, b, c), expr)
  for (let i = 0; i < result.length; i++) {
    const code = result[i].split('//')[0];
    const wm = code.match(/\b(w32|w16)\(/);
    if (!wm) continue;
    const wPos = code.indexOf(wm[0]);
    // Count top-level commas inside the w32/w16 call
    let depth = 0, commas = 0, thirdComma = -1;
    for (let j = wPos + wm[0].length; j < code.length; j++) {
      if (code[j] === '(' || code[j] === '[') depth++;
      if (code[j] === ')' || code[j] === ']') depth--;
      if (depth < 0) break; // hit closing of outer expression
      if (code[j] === ',' && depth === 0) {
        commas++;
        if (commas === 3) { thirdComma = j; break; }
      }
    }
    if (thirdComma > 0) {
      // Has 4+ args — convert w32→w32r and close before 4th comma
      const before = result[i].substring(0, wPos);
      const wCall = result[i].substring(wPos, thirdComma);
      const after = result[i].substring(thirdComma);
      result[i] = before + wCall.replace(/\b(w32|w16)\(/, '$1r(') + ')' + after;
    }
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
    // Track structural context — skip/fix lines referencing blocks opened before label
    let helperBraceDepth = 0;
    let helperParenDepth = 0;
    let helperLoopDepth = 0;
    let helperSwitchDepth = 0;
    let helperOrphanElseCont = false;
    // Helper body: transform gotos to this same label into recursive calls
    for (const bodyLine of helperBody) {
      const bt = bodyLine.trim();

      // Track loop/switch depth
      if (/^\s*(for|while|do)\b/.test(bt)) helperLoopDepth++;
      if (/^\s*switch\s*\(/.test(bt)) helperSwitchDepth++;

      // Check brace and paren depth changes (only count CODE, not comments)
      const codePart = bodyLine.split('//')[0];
      let braceChange = 0, parenChange = 0;
      for (const ch of codePart) {
        if (ch === '{') braceChange++;
        if (ch === '}') braceChange--;
        if (ch === '(') parenChange++;
        if (ch === ')') parenChange--;
      }

      // Excess closing brace — belongs to outer block
      if (helperBraceDepth + braceChange < 0) {
        helpers.push('  // (outer block close)');
        helperBraceDepth = 0;
        if (helperLoopDepth > 0) helperLoopDepth--;
        if (helperSwitchDepth > 0) helperSwitchDepth--;
        continue;
      }

      // Excess closing paren — belongs to outer expression
      if (helperParenDepth + parenChange < 0) {
        // Remove excess closing parens from the line
        let fixed = bodyLine;
        let excess = -(helperParenDepth + parenChange);
        for (let x = 0; x < excess; x++) {
          fixed = fixed.replace(/\)/, ''); // remove first )
        }
        helpers.push(fixed + ' // (excess ) removed)');
        helperBraceDepth += braceChange;
        helperParenDepth = 0;
        continue;
      }

      helperBraceDepth += braceChange;
      helperParenDepth += parenChange;

      // Orphan else — convert to if(true) to preserve block structure
      if (/^\s*\}\s*else\b/.test(bt) || /^\s*else\b/.test(bt)) {
        if (/\{\s*$/.test(bt)) {
          helpers.push(bodyLine.replace(/\}\s*else\s*(if\s*\([^)]*\)\s*)?\{/, '} if (true) {').replace(/^\s*else\s*(if\s*\([^)]*\)\s*)?\{/, 'if (true) {'));
        } else {
          // Multi-line else-if: the condition continues on following lines
          // Comment out this line AND set flag to comment continuation lines
          // until we find one ending with ) {
          helpers.push('  if (true) // (orphan else)');
          helperOrphanElseCont = true;
        }
        continue;
      }
      // Continuation of orphan else-if condition
      if (helperOrphanElseCont) {
        if (/\{\s*$/.test(bt)) {
          // Last line of condition — extract the {
          helpers.push('  { // (orphan else-if cont)');
          helperOrphanElseCont = false;
        } else {
          helpers.push('  // (orphan else-if cont): ' + bt);
        }
        continue;
      }

      // Orphan break — no enclosing loop/switch (check if break is at context where loop was before label)
      if (/\bbreak\s*;/.test(bt) && helperLoopDepth <= 0 && helperSwitchDepth <= 0) {
        helpers.push(bodyLine.replace(/\bbreak\s*;/, 'return; // (was break)'));
        continue;
      }

      // Orphan case/default — no enclosing switch
      if (/^\s*(case\s+|default\s*:)/.test(bt) && helperSwitchDepth <= 0) {
        helpers.push('  // (orphan case) ' + bt);
        continue;
      }

      // Labels inside helpers — comment them (already handled by goto system)
      if (/^(LAB_|switchD_|code_r|joined_r)\w+:\s*$/.test(bt)) {
        helpers.push('  // ' + bt);
        continue;
      }
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
    // Post-process: add missing closing braces
    const helperStart = helpers.length - helperBody.length;
    let fixBrace = 0;
    for (let h = helperStart; h < helpers.length; h++) {
      const code = helpers[h].split('//')[0];
      for (const ch of code) { if (ch === '{') fixBrace++; if (ch === '}') fixBrace--; }
    }
    while (fixBrace > 0) { helpers.push('}'); fixBrace--; }
    helpers.push('}');

    // Validate helper syntax — if it fails, comment out the body
    const helperCode = helpers.slice(helperStart - 1).join('\n'); // include function line
    try {
      new Function(helperCode.replace(/^function /, 'function _'));
    } catch (e) {
      // Helper has syntax error — replace body with comment
      const funcLine = helpers[helperStart - 1];
      helpers.length = helperStart - 1; // remove broken helper
      helpers.push(funcLine);
      helpers.push('  // HELPER_SYNTAX_ERROR: ' + e.message.substring(0, 60));
      helpers.push('  // Original code had structural issues from DEVIATION lines');
      helpers.push('}');
    }
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

  // Deduplicate helper names — append _2, _3, etc. for collisions
  const helperNames = new Set();
  for (let i = 0; i < gotoHelpers.length; i++) {
    const m = gotoHelpers[i].match(/^function\s+(\w+_helper)\s*\(/);
    if (m) {
      let name = m[1];
      if (helperNames.has(name)) {
        let suffix = 2;
        while (helperNames.has(name + '_' + suffix)) suffix++;
        const newName = name + '_' + suffix;
        // Rename in the function declaration and all references in this helper's body
        const oldName = name;
        gotoHelpers[i] = gotoHelpers[i].replace(oldName, newName);
        // Also rename references in the caller (in outputLines)
        // Find the last occurrence of this helper call in outputLines and rename
        for (let j = outputLines.length - 1; j >= 0; j--) {
          if (outputLines[j].includes(oldName + '(') && !outputLines[j].includes(newName)) {
            // Check if this is a call to the duplicate (in a different function)
            // Only rename if we haven't already renamed this one
            outputLines[j] = outputLines[j].replace(new RegExp('\\b' + oldName + '\\('), newName + '(');
            break;
          }
        }
        name = newName;
      }
      helperNames.add(name);
    }
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
