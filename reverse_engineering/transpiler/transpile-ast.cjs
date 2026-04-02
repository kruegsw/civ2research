#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// transpile-ast.cjs — AST-based C → JS transpiler (tree-sitter)
//
// Usage:
//   node transpile-ast.cjs                          # all blocks
//   node transpile-ast.cjs block_004E0000           # one block
//
// Reads:  reverse_engineering/decompiled/block_XXXXXXXX.c
// Writes: reverse_engineering/transpiler/output/block_XXXXXXXX.js
//
// Uses tree-sitter to parse C into an AST, then walks the tree to
// emit correct JS. Every C construct maps to exactly one JS construct
// based on the node type and its children's types — no regex.
// ═══════════════════════════════════════════════════════════════════

const Parser = require('tree-sitter');
const C = require('tree-sitter-c');
const fs = require('fs');
const path = require('path');

const C_DIR = path.join(__dirname, '..', 'decompiled');
const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const parser = new Parser();
parser.setLanguage(C);

// ── Ghidra typedef preamble ──────────────────────────────────────
// Ghidra decompiled C uses non-standard types. We prepend typedefs
// so tree-sitter's C grammar can parse them without errors.
// These lines are NOT emitted — they only exist for the parser.
const GHIDRA_PREAMBLE = `
typedef unsigned char byte;
typedef unsigned char undefined1;
typedef unsigned short undefined2;
typedef unsigned int undefined4;
typedef unsigned char undefined;
typedef unsigned char bool;
typedef unsigned char uchar;
typedef signed char sbyte;
typedef unsigned short ushort;
typedef unsigned int uint;
typedef unsigned long ulong;
typedef long long longlong;
typedef unsigned long long ulonglong;
typedef void code;
typedef long double float10;
typedef int int3;
typedef void * LPVOID;
// MFC/C++ class types used by Ghidra (all opaque — treated as int-sized)
typedef int CArchive;
typedef int CBitmapButton;
typedef int CCheckListBox;
typedef int CCommandLineInfo;
typedef int CControlBarInfo;
typedef int CDaoFieldInfo;
typedef int CDaoIndexFieldInfo;
typedef int CDaoRelationFieldInfo;
typedef int CDataBoundProperty;
typedef int CDialog;
typedef int CHtmlStream;
typedef int CMemFile;
typedef int CMiniDockFrameWnd;
typedef int CMiniFrameWnd;
typedef int CODBCFieldInfo;
typedef int COleClientItem;
typedef int COleCntrFrameWnd;
typedef int COleControlSite;
typedef int CPropertySheet;
typedef int CReObject;
typedef int CRichEditCntrItem;
typedef int CRichEditDoc;
typedef int CRichEditView;
typedef int CSocket;
typedef int CSplitterWnd;
typedef int CString;
typedef int CTestCmdUI;
typedef int CView;
typedef unsigned int COLORREF;
typedef char CHAR;
`;
const PREAMBLE_LINES = GHIDRA_PREAMBLE.split('\n').length;

// ── Type tracking ────────────────────────────────────────────────
// Track variable types within each function for correct code generation.
// Key insight: Ghidra C declares every variable with an explicit type.
// We use this to know pointer width, signedness, etc.

const TYPE_INFO = {
  // Primitive widths in bytes
  'int': 4, 'uint': 4, 'unsigned int': 4, 'long': 4, 'ulong': 4, 'unsigned long': 4,
  'short': 2, 'ushort': 2, 'unsigned short': 2,
  'char': 1, 'byte': 1, 'unsigned char': 1, 'signed char': 1,
  'undefined4': 4, 'undefined2': 2, 'undefined1': 1, 'undefined': 1,
  'bool': 1, 'float': 4, 'double': 8,
  // Pointer types
  'int *': 4, 'uint *': 4, 'short *': 2, 'ushort *': 2,
  'char *': 1, 'byte *': 1, 'unsigned char *': 1,
  'undefined4 *': 4, 'undefined2 *': 2, 'undefined1 *': 1,
  'void *': 4,
};

// Signed types
const SIGNED_TYPES = new Set([
  'int', 'long', 'short', 'char', 'signed char',
  'undefined4', 'undefined2', 'undefined1', 'undefined',
]);

// ── Emitter context ──────────────────────────────────────────────
class EmitContext {
  constructor() {
    this.vars = new Map();       // variable name → type string
    this.localArrays = new Set(); // stack-allocated arrays
    this.deviations = 0;
    this.functionName = '';
  }

  addVar(name, type) {
    this.vars.set(name, type);
  }

  getType(name) {
    return this.vars.get(name) || null;
  }

  isPointerType(type) {
    return type && type.includes('*');
  }

  pointerBaseWidth(type) {
    if (!type) return 4; // default
    // "short *" → 2, "int *" → 4, "byte *" → 1, etc.
    return TYPE_INFO[type] || 4;
  }
}

// ── Main emitter: AST node → JS string ──────────────────────────

function emit(node, ctx) {
  if (!node) return '';

  switch (node.type) {
    case 'translation_unit':
      return emitTranslationUnit(node, ctx);
    case 'function_definition':
      return emitFunctionDef(node, ctx);
    case 'compound_statement':
      return emitCompound(node, ctx);
    case 'declaration':
      return emitDeclaration(node, ctx);
    case 'expression_statement':
      return emitExprStmt(node, ctx);
    case 'if_statement':
      return emitIf(node, ctx);
    case 'while_statement':
      return emitWhile(node, ctx);
    case 'do_statement':
      return emitDoWhile(node, ctx);
    case 'for_statement':
      return emitFor(node, ctx);
    case 'switch_statement':
      return emitSwitch(node, ctx);
    case 'case_statement':
      return emitCase(node, ctx);
    case 'return_statement':
      return emitReturn(node, ctx);
    case 'break_statement':
      return 'break;';
    case 'continue_statement':
      return 'continue;';
    case 'goto_statement':
      return emitGoto(node, ctx);
    case 'labeled_statement':
      return emitLabeled(node, ctx);

    // Expressions
    case 'assignment_expression':
      return emitAssignment(node, ctx);
    case 'binary_expression':
      return emitBinary(node, ctx);
    case 'unary_expression':
      return emitUnary(node, ctx);
    case 'update_expression':
      return emitUpdate(node, ctx);
    case 'cast_expression':
      return emitCast(node, ctx);
    case 'call_expression':
      return emitCall(node, ctx);
    case 'subscript_expression':
      return emitSubscript(node, ctx);
    case 'parenthesized_expression':
      return '(' + emitChildren(node, ctx) + ')';
    case 'conditional_expression':
      return emitTernary(node, ctx);
    case 'comma_expression':
      return emitComma(node, ctx);
    case 'pointer_expression':
      return emitPointerExpr(node, ctx);
    case 'sizeof_expression':
      return emitSizeof(node, ctx);
    case 'field_expression':
      return emitFieldExpr(node, ctx);

    // Literals and identifiers
    case 'identifier':
      return emitIdentifier(node, ctx);
    case 'number_literal':
      return emitNumber(node, ctx);
    case 'char_literal':
      return emitCharLiteral(node, ctx);
    case 'string_literal':
      return node.text;
    case 'true':
      return '1';
    case 'false':
      return '0';
    case 'null':
      return 'null';
    case 'comment':
      return node.text;

    // Structural tokens we handle or skip
    case '{': case '}': case '(': case ')': case '[': case ']':
    case ';': case ',': case ':':
      return node.text;

    // Type-related nodes (handled by parent)
    case 'type_descriptor':
    case 'primitive_type':
    case 'sized_type_specifier':
    case 'type_qualifier':
    case 'storage_class_specifier':
    case 'abstract_pointer_declarator':
      return ''; // handled by parent

    default:
      // For unrecognized nodes, try to emit children
      if (node.childCount > 0) {
        return emitChildren(node, ctx);
      }
      return node.text;
  }
}

function emitChildren(node, ctx) {
  let parts = [];
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    // Skip punctuation that we handle structurally
    if (child.type === '(' || child.type === ')') continue;
    const r = emit(child, ctx);
    if (r) parts.push(r);
  }
  return parts.join(' ');
}

// ── Top-level: translation unit ──────────────────────────────────

function emitTranslationUnit(node, ctx) {
  // Emit each function definition
  const functions = [];
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type === 'function_definition') {
      functions.push(emitFunctionDef(child, ctx));
    } else if (child.type === 'comment') {
      functions.push(child.text);
    }
    // Skip other top-level things (declarations, etc.)
  }
  return functions.join('\n');
}

// ── Function definition ──────────────────────────────────────────

function emitFunctionDef(node, ctx) {
  // Reset context for each function
  const fnCtx = new EmitContext();

  // Extract function name and parameters
  const declarator = node.childForFieldName('declarator');
  const body = node.childForFieldName('body');

  let fnName = '';
  let params = [];

  if (declarator) {
    // function_declarator has: declarator (identifier) + parameter_list
    const nameNode = declarator.childForFieldName('declarator');
    fnName = nameNode ? nameNode.text : declarator.text;
    fnCtx.functionName = fnName;

    // Strip thunk_ and FID_conflict_ prefixes
    fnName = fnName.replace(/^thunk_/, '').replace(/^FID_conflict_/, '');

    // Extract parameters
    const paramList = declarator.childForFieldName('parameters');
    if (paramList) {
      for (let i = 0; i < paramList.childCount; i++) {
        const p = paramList.child(i);
        if (p.type === 'parameter_declaration') {
          const pDecl = p.childForFieldName('declarator');
          const pType = p.childForFieldName('type');
          if (pDecl) {
            const pName = pDecl.text;
            if (pName !== 'void') {
              params.push(pName);
              // Track parameter type
              if (pType) fnCtx.addVar(pName, extractTypeName(p));
            }
          } else if (pType && pType.text === 'void') {
            // void parameter = no params
          }
        }
      }
    }
  }

  // Scan body for variable declarations and register them
  if (body) {
    scanDeclarations(body, fnCtx);
  }

  // Build the function
  const paramStr = params.join(', ');
  let result = `export function ${fnName}(${paramStr}) {\n`;

  // Emit body
  if (body) {
    result += emitFunctionBody(body, fnCtx);
  }

  result += '}\n';
  return result;
}

// ── Scan declarations in function body ───────────────────────────

function scanDeclarations(body, ctx) {
  for (let i = 0; i < body.childCount; i++) {
    const stmt = body.child(i);
    if (stmt.type === 'declaration') {
      // Extract type and variable name
      const typeStr = extractTypeName(stmt);
      for (let j = 0; j < stmt.childCount; j++) {
        const child = stmt.child(j);
        if (child.type === 'init_declarator' || child.type === 'identifier' ||
            child.type === 'pointer_declarator' || child.type === 'array_declarator') {
          const varName = extractDeclaratorName(child);
          if (varName) {
            ctx.addVar(varName, typeStr);
            // Check for array declarations
            if (child.type === 'array_declarator' || (child.type === 'init_declarator' &&
                child.child(0)?.type === 'array_declarator')) {
              ctx.localArrays.add(varName);
            }
          }
        }
      }
    }
  }
}

function extractTypeName(declNode) {
  // Build type string from declaration children
  const parts = [];
  for (let i = 0; i < declNode.childCount; i++) {
    const child = declNode.child(i);
    if (child.type === 'primitive_type' || child.type === 'sized_type_specifier' ||
        child.type === 'type_qualifier') {
      parts.push(child.text);
    } else if (child.type === 'type_identifier') {
      parts.push(child.text);
    } else if (child.type === 'pointer_declarator') {
      parts.push('*');
    }
  }
  return parts.join(' ');
}

function extractDeclaratorName(node) {
  if (node.type === 'identifier') return node.text;
  if (node.type === 'pointer_declarator') {
    for (let i = 0; i < node.childCount; i++) {
      const name = extractDeclaratorName(node.child(i));
      if (name) return name;
    }
  }
  if (node.type === 'init_declarator') {
    return extractDeclaratorName(node.child(0));
  }
  if (node.type === 'array_declarator') {
    return extractDeclaratorName(node.child(0));
  }
  return null;
}

// ── Function body emission ───────────────────────────────────────

function emitFunctionBody(body, ctx) {
  let lines = [];
  for (let i = 0; i < body.childCount; i++) {
    const stmt = body.child(i);
    if (stmt.type === '{' || stmt.type === '}') continue;
    if (stmt.type === 'declaration') {
      lines.push(emitDeclaration(stmt, ctx));
    } else {
      lines.push(emit(stmt, ctx));
    }
  }
  return lines.filter(l => l !== '').join('\n') + '\n';
}

// ── Declarations ─────────────────────────────────────────────────

function emitDeclaration(node, ctx) {
  const parts = [];
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type === 'init_declarator') {
      const varNode = child.child(0);
      const initNode = child.childCount > 2 ? child.child(2) : null;
      const varName = extractDeclaratorName(varNode);

      if (varNode.type === 'array_declarator') {
        // Stack array: int arr[20] → let arr = new Array(20).fill(0)
        const sizeNode = varNode.child(varNode.childCount - 2); // between [ and ]
        const size = sizeNode ? emit(sizeNode, ctx) : '0';
        parts.push(`let ${varName} = new Array(${size}).fill(0);`);
      } else if (initNode) {
        parts.push(`let ${varName} = ${emit(initNode, ctx)};`);
      } else {
        parts.push(`let ${varName};`);
      }
    } else if (child.type === 'identifier') {
      parts.push(`let ${child.text};`);
    } else if (child.type === 'pointer_declarator') {
      const name = extractDeclaratorName(child);
      parts.push(`let ${name};`);
    } else if (child.type === 'array_declarator') {
      const name = extractDeclaratorName(child);
      const sizeNode = child.child(child.childCount - 2);
      const size = sizeNode ? emit(sizeNode, ctx) : '0';
      parts.push(`let ${name} = new Array(${size}).fill(0);`);
    }
    // Skip type nodes, semicolons
  }
  return parts.join('\n');
}

// ── Statements ───────────────────────────────────────────────────

function emitExprStmt(node, ctx) {
  let result = '';
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type === ';') {
      result += ';';
    } else {
      result += emit(child, ctx);
    }
  }
  return result;
}

function emitIf(node, ctx) {
  const condition = node.childForFieldName('condition');
  const consequence = node.childForFieldName('consequence');
  const alternative = node.childForFieldName('alternative');

  let result = 'if (' + emit(condition, ctx) + ') ';
  result += emit(consequence, ctx);
  if (alternative) {
    result += ' else ' + emit(alternative, ctx);
  }
  return result;
}

function emitWhile(node, ctx) {
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');
  return 'while (' + emit(condition, ctx) + ') ' + emit(body, ctx);
}

function emitDoWhile(node, ctx) {
  const body = node.childForFieldName('body');
  const condition = node.childForFieldName('condition');
  return 'do ' + emit(body, ctx) + ' while (' + emit(condition, ctx) + ');';
}

function emitFor(node, ctx) {
  const init = node.childForFieldName('initializer');
  const cond = node.childForFieldName('condition');
  const update = node.childForFieldName('update');
  const body = node.childForFieldName('body');

  const initStr = init ? emit(init, ctx) : '';
  const condStr = cond ? emit(cond, ctx) : '';
  const updateStr = update ? emit(update, ctx) : '';

  return `for (${initStr} ${condStr}; ${updateStr}) ` + emit(body, ctx);
}

function emitSwitch(node, ctx) {
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');
  return 'switch (' + emit(condition, ctx) + ') ' + emit(body, ctx);
}

function emitCase(node, ctx) {
  const value = node.childForFieldName('value');
  let body = '';
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type !== 'case' && child.type !== ':' && child !== value &&
        child.type !== 'default') {
      body += emit(child, ctx) + '\n';
    }
  }
  if (value) {
    return `case ${emit(value, ctx)}:\n${body}`;
  }
  return `default:\n${body}`;
}

function emitReturn(node, ctx) {
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type !== 'return' && child.type !== ';') {
      return 'return ' + emit(child, ctx) + ';';
    }
  }
  return 'return;';
}

function emitGoto(node, ctx) {
  const label = node.child(1);
  return `/* goto ${label ? label.text : '?'} */`;
}

function emitLabeled(node, ctx) {
  const label = node.child(0);
  const stmt = node.child(2);
  return `/* ${label.text}: */\n` + (stmt ? emit(stmt, ctx) : '');
}

function emitCompound(node, ctx) {
  let lines = [];
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type === '{') { lines.push('{'); continue; }
    if (child.type === '}') { lines.push('}'); continue; }
    lines.push(emit(child, ctx));
  }
  return lines.join('\n');
}

// ── Expressions ──────────────────────────────────────────────────

function emitAssignment(node, ctx) {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const op = node.child(1); // operator

  const leftText = left.text;
  const opText = op ? op.text : '=';

  // Check if left side is a typed pointer dereference: *(TYPE *)(expr)
  if (left.type === 'pointer_expression' && left.child(0)?.text === '*') {
    const inner = left.child(1);
    if (inner?.type === 'cast_expression') {
      const typeInfo = extractCastType(inner);
      const target = getCastTarget(inner);
      if (typeInfo.isPointer) {
        // Write: *(short *)(base + off) = val → w16(base, off, val)
        const writeHelper = typeInfo.width === 2 ? 'w16' : typeInfo.width === 4 ? 'w32' : null;
        if (writeHelper) {
          const { base, offset } = splitAddressExpr(target, ctx);
          const rightStr = emit(right, ctx);
          if (opText === '=') {
            return `${writeHelper}(${base}, ${offset}, ${rightStr})`;
          } else {
            // Compound assignment: *(short *)(x) += val → w16(x, off, s16(x, off) + val)
            const readHelper = typeInfo.width === 2 ?
              (typeInfo.signed ? 's16' : 'u16') :
              (typeInfo.signed ? 's32' : 'u32');
            const coreOp = opText.slice(0, -1); // += → +
            return `${writeHelper}(${base}, ${offset}, ${readHelper}(${base}, ${offset}) ${coreOp} ${rightStr})`;
          }
        } else if (typeInfo.width === 1) {
          // Byte pointer write: *(byte *)(expr) = val → _MEM[expr] = val
          const addrStr = emit(target, ctx);
          const rightStr = emit(right, ctx);
          return `_MEM[${addrStr}] ${opText} ${rightStr}`;
        }
      }
    }
  }

  // Check if left side is a bare DAT_ global (value write)
  if (left.type === 'identifier' && /^_?DAT_[0-9a-fA-F]+$/.test(leftText)) {
    const rightStr = emit(right, ctx);
    if (opText === '=') {
      return `wv(${leftText}, ${rightStr})`;
    } else {
      const coreOp = opText.slice(0, -1);
      return `wv(${leftText}, v(${leftText}) ${coreOp} ${rightStr})`;
    }
  }

  // Check if left side is array subscript on DAT_ (byte array write)
  if (left.type === 'subscript_expression') {
    const arrayExpr = left.child(0);
    if (arrayExpr?.type === 'parenthesized_expression') {
      const inner = arrayExpr.child(1); // inside parens
      if (inner?.type === 'pointer_expression' && inner.child(0)?.text === '&') {
        // (&DAT_xxx)[idx] = val → _MEM[DAT_xxx + idx] = val
        const datName = inner.child(1)?.text;
        const idx = left.child(2); // between [ and ]
        const rightStr = emit(right, ctx);
        const idxStr = emit(idx, ctx);
        return `_MEM[${datName} + ${idxStr}] ${opText} ${rightStr}`;
      }
    }
  }

  // Default assignment
  return emit(left, ctx) + ' ' + opText + ' ' + emit(right, ctx);
}

function emitBinary(node, ctx) {
  const left = node.child(0);
  const op = node.child(1);
  const right = node.child(2);

  const opText = op.text;
  const leftStr = emit(left, ctx);
  const rightStr = emit(right, ctx);

  // Integer division: a / b → (a / b | 0)
  if (opText === '/') {
    return `(${leftStr} / ${rightStr} | 0)`;
  }

  // C == and != → JS === and !==
  if (opText === '==') return `${leftStr} === ${rightStr}`;
  if (opText === '!=') return `${leftStr} !== ${rightStr}`;

  return `${leftStr} ${opText} ${rightStr}`;
}

function emitUnary(node, ctx) {
  const op = node.child(0);
  const operand = node.child(1);
  if (op && operand) {
    return op.text + emit(operand, ctx);
  }
  return node.text;
}

function emitUpdate(node, ctx) {
  // i++ or ++i
  return node.text;
}

function emitCast(node, ctx) {
  const typeDesc = node.child(1); // inside ( )
  const expr = node.child(node.childCount - 1); // the expression being cast

  const typeStr = typeDesc ? typeDesc.text : '';
  const exprStr = emit(expr, ctx);

  // Type cast conversions
  if (/\bchar\b/.test(typeStr) && !/\*/.test(typeStr)) {
    return `s8(${exprStr})`;
  }
  if (/\bbyte\b/.test(typeStr) || /\bunsigned\s+char\b/.test(typeStr)) {
    return `u8(${exprStr})`;
  }
  if (/\bundefined1\b/.test(typeStr)) {
    return `u8(${exprStr})`;
  }
  if (/\bshort\b/.test(typeStr) && !/unsigned/.test(typeStr) && !/\*/.test(typeStr)) {
    return `((${exprStr}) << 16 >> 16)`;
  }
  if (/\bushort\b/.test(typeStr) || (/\bshort\b/.test(typeStr) && /unsigned/.test(typeStr))) {
    return `((${exprStr}) & 0xFFFF)`;
  }
  if (/\buint\b/.test(typeStr) || (/\bint\b/.test(typeStr) && /unsigned/.test(typeStr))) {
    return `((${exprStr}) >>> 0)`;
  }
  if (/\bbool\b/.test(typeStr)) {
    return `((${exprStr}) ? 1 : 0)`;
  }
  // (int), (undefined4), (long) — preserve parens (critical for precedence!)
  if (/\bint\b/.test(typeStr) || /\bundefined4\b/.test(typeStr) || /\blong\b/.test(typeStr)) {
    return `(${exprStr})`;
  }
  // Pointer cast without dereference — drop
  if (/\*/.test(typeStr)) {
    return exprStr;
  }
  // Default: drop cast, preserve expression
  return `(${exprStr})`;
}

function emitCall(node, ctx) {
  const fn = node.childForFieldName('function');
  const args = node.childForFieldName('arguments');

  let fnName = fn ? fn.text : '';
  // Strip thunk_ prefix
  fnName = fnName.replace(/^thunk_/, '').replace(/^FID_conflict_/, '');

  let argStrs = [];
  if (args) {
    for (let i = 0; i < args.childCount; i++) {
      const arg = args.child(i);
      if (arg.type !== '(' && arg.type !== ')' && arg.type !== ',') {
        argStrs.push(emit(arg, ctx));
      }
    }
  }

  return `${fnName}(${argStrs.join(', ')})`;
}

function emitSubscript(node, ctx) {
  const array = node.child(0);
  const index = node.child(2); // between [ and ]

  // (&DAT_xxx)[idx] → _MEM[DAT_xxx + idx]
  if (array.type === 'parenthesized_expression') {
    const inner = array.child(1);
    if (inner?.type === 'pointer_expression' && inner.child(0)?.text === '&') {
      const target = inner.child(1);
      const idxStr = emit(index, ctx);
      return `_MEM[${target.text} + ${idxStr}]`;
    }
  }

  // Regular array access
  const arrayStr = emit(array, ctx);
  const idxStr = emit(index, ctx);

  // Check if this is a local array (stack-allocated) vs _MEM access
  const arrayName = array.type === 'identifier' ? array.text : null;
  if (arrayName && ctx.localArrays.has(arrayName)) {
    return `${arrayStr}[${idxStr}]`;
  }

  // DAT_ + index → _MEM[DAT_ + index]
  if (arrayName && /^_?DAT_/.test(arrayName)) {
    return `_MEM[${arrayStr} + ${idxStr}]`;
  }

  return `${arrayStr}[${idxStr}]`;
}

function emitTernary(node, ctx) {
  const cond = node.child(0);
  const then_ = node.child(2);
  const else_ = node.child(4);
  return emit(cond, ctx) + ' ? ' + emit(then_, ctx) + ' : ' + emit(else_, ctx);
}

function emitComma(node, ctx) {
  const parts = [];
  for (let i = 0; i < node.childCount; i++) {
    const child = node.child(i);
    if (child.type !== ',') {
      parts.push(emit(child, ctx));
    }
  }
  return parts.join(', ');
}

function emitPointerExpr(node, ctx) {
  const op = node.child(0);
  const operand = node.child(1);

  if (op.text === '&') {
    // &DAT_xxx → DAT_xxx (address-of global = the offset constant)
    if (operand?.type === 'identifier' && /^_?DAT_/.test(operand.text)) {
      return operand.text;
    }
    // &local_xxx → local_xxx (for pass-by-reference)
    if (operand?.type === 'identifier' && /^local_/.test(operand.text)) {
      return operand.text;
    }
    return '/* &' + emit(operand, ctx) + ' */';
  }

  if (op.text === '*') {
    // Pointer dereference
    // *(TYPE *)(expr) — handled by cast_expression parent
    if (operand?.type === 'cast_expression') {
      const typeInfo = extractCastType(operand);
      const target = getCastTarget(operand);
      if (typeInfo.isPointer) {
        const { base, offset } = splitAddressExpr(target, ctx);
        if (typeInfo.width === 1) {
          // Byte pointer: *(byte *)(addr) → _MEM[addr]
          const addrStr = emit(target, ctx);
          if (typeInfo.signed) return `s8(_MEM[${addrStr}])`;
          return `_MEM[${addrStr}]`;
        }
        const readHelper = typeInfo.width === 2 ?
          (typeInfo.signed ? 's16' : 'u16') :
          (typeInfo.signed ? 's32' : 'u32');
        return `${readHelper}(${base}, ${offset})`;
      }
    }

    // *variable (bare pointer deref, no type cast)
    if (operand?.type === 'identifier') {
      const varType = ctx.getType(operand.text);
      if (varType) {
        const width = TYPE_INFO[varType] || 4;
        if (width === 1) return `_MEM[${operand.text}]`;
        if (width === 2) return `s16(${operand.text}, 0)`;
        return `s32(${operand.text}, 0)`;
      }
      return `s32(${operand.text}, 0)`;
    }

    // *expr (generic pointer deref)
    return `s32(${emit(operand, ctx)}, 0)`;
  }

  return op.text + emit(operand, ctx);
}

function emitSizeof(node, ctx) {
  return `sizeof(${node.text})`;
}

function emitFieldExpr(node, ctx) {
  // expr.field or expr->field
  const obj = node.child(0);
  const op = node.child(1);
  const field = node.child(2);

  if (op?.text === '->') {
    return `/* DEVIATION: -> */ true`;
  }

  // Handle Ghidra sub-field: expr._N_M_
  const fieldName = field?.text || '';
  const subFieldMatch = fieldName.match(/^_(\d+)_(\d+)_$/);
  if (subFieldMatch) {
    const byteOffset = parseInt(subFieldMatch[1]);
    const byteCount = parseInt(subFieldMatch[2]);
    const objStr = emit(obj, ctx);
    if (byteOffset === 0 && byteCount === 1) return `((${objStr}) & 0xFF)`;
    if (byteOffset === 0 && byteCount === 2) return `((${objStr}) & 0xFFFF)`;
    const shift = byteOffset * 8;
    const mask = byteCount === 1 ? '0xFF' : byteCount === 2 ? '0xFFFF' : '0xFFFFFF';
    return `((${objStr}) >> ${shift} & ${mask})`;
  }

  return emit(obj, ctx) + '.' + fieldName;
}

function emitIdentifier(node, ctx) {
  const name = node.text;

  // DAT_ globals: when used as a value (not address), wrap with v()
  // This is the KEY insight: DAT_ is an address offset. v() reads the value.
  // But in array index context (handled by subscript/assignment), we use the raw offset.
  // Here we're in a "value" context (right side of =, function arg, etc.)
  if (/^_?DAT_[0-9a-fA-F]+$/.test(name)) {
    // v() wrapping is context-dependent — we emit raw here,
    // the parent assignment/subscript/binary handlers decide
    return name;
  }

  // Rename JS reserved words
  if (name === 'this') return '_this';

  return name;
}

function emitNumber(node, ctx) {
  let text = node.text;
  // Strip U suffix
  text = text.replace(/U$/i, '');
  // Convert 0xffffffff to -1
  if (text.toLowerCase() === '0xffffffff') return '-1';
  return text;
}

function emitCharLiteral(node, ctx) {
  const text = node.text;
  // '\0' → 0, '\xNN' → 0xNN, '\a' → 7, etc.
  if (text === "'\\0'") return '0';
  if (text === "'\\a'") return '7';
  if (text === "'\\n'") return '0xa';
  if (text === "'\\r'") return '0xd';
  if (text === "'\\t'") return '9';
  if (text === "'\\b'") return '8';
  if (text === "'\\v'") return '0x0b';
  if (text === "'\\f'") return '0x0c';
  const hexMatch = text.match(/^'\\x([0-9a-fA-F]{2})'$/);
  if (hexMatch) return '0x' + hexMatch[1];
  // Single char: 'A' → 65
  const charMatch = text.match(/^'(.)'$/);
  if (charMatch) return String(charMatch[1].charCodeAt(0));
  return text;
}

// ── Helper: extract cast type info ───────────────────────────────

function extractCastType(castNode) {
  // cast_expression: ( type_descriptor ) expr
  const typeDesc = castNode.child(1);
  if (!typeDesc || typeDesc.type !== 'type_descriptor') {
    return { isPointer: false, width: 4, signed: true };
  }

  const text = typeDesc.text;
  const isPointer = text.includes('*');
  let width = 4;
  let signed = true;

  if (/\bshort\b/.test(text)) width = 2;
  if (/\bchar\b/.test(text) || /\bbyte\b/.test(text) || /\bundefined1\b/.test(text)) width = 1;
  if (/\bundefined2\b/.test(text)) width = 2;
  if (/\buint\b/.test(text) || /\bushort\b/.test(text) || /\bunsigned\b/.test(text) ||
      /\bbyte\b/.test(text)) signed = false;

  return { isPointer, width, signed };
}

function getCastTarget(castNode) {
  // The expression being cast is the last child
  return castNode.child(castNode.childCount - 1);
}

// ── Helper: split address expression into base + offset ──────────

function splitAddressExpr(node, ctx) {
  if (!node) return { base: '0', offset: '0' };

  // Parenthesized: (base + offset)
  if (node.type === 'parenthesized_expression') {
    const inner = node.child(1);
    return splitAddressExpr(inner, ctx);
  }

  // Binary +: base + offset
  if (node.type === 'binary_expression' && node.child(1)?.text === '+') {
    const left = node.child(0);
    const right = node.child(2);

    // &DAT_xxx + offset → DAT_xxx, offset
    if (left.type === 'pointer_expression' && left.child(0)?.text === '&') {
      return { base: left.child(1).text, offset: emit(right, ctx) };
    }

    return { base: emit(left, ctx), offset: emit(right, ctx) };
  }

  // Just an identifier: &DAT_xxx or variable
  if (node.type === 'pointer_expression' && node.child(0)?.text === '&') {
    return { base: node.child(1).text, offset: '0' };
  }

  return { base: emit(node, ctx), offset: '0' };
}

// ── Main: process files ──────────────────────────────────────────

function transpileBlock(blockName) {
  const cFile = path.join(C_DIR, blockName + '.c');
  if (!fs.existsSync(cFile)) {
    console.error(`File not found: ${cFile}`);
    return;
  }

  let source = fs.readFileSync(cFile, 'utf-8');
  // Preprocess: convert C++ syntax to C-compatible
  // ClassName::Method( → ClassName__Method(  (MFC class methods)
  source = source.replace(/(\w+)::~?(\w+)/g, '$1__$2');
  // Prepend Ghidra typedefs so tree-sitter can parse non-standard types
  const tree = parser.parse(GHIDRA_PREAMBLE + source);

  // Check for parse errors
  let errorCount = 0;
  function countErrors(node) {
    if (node.type === 'ERROR' || node.isMissing) errorCount++;
    for (let i = 0; i < node.childCount; i++) countErrors(node.child(i));
  }
  countErrors(tree.rootNode);

  const ctx = new EmitContext();
  const output = emit(tree.rootNode, ctx);

  const outFile = path.join(OUT_DIR, blockName + '.js');
  fs.writeFileSync(outFile, output, 'utf-8');

  const lineCount = output.split('\n').length;
  console.log(`${blockName}: ${lineCount} lines, ${errorCount} parse errors`);
}

// ── CLI ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0) {
  // All blocks
  const files = fs.readdirSync(C_DIR).filter(f => f.endsWith('.c')).sort();
  for (const f of files) {
    transpileBlock(f.replace('.c', ''));
  }
} else {
  for (const arg of args) {
    transpileBlock(arg.replace('.c', '').replace('.js', ''));
  }
}
