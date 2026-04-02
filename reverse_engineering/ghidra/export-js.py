#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
export-js.py — Ghidra P-code → JavaScript transpiler for Civilization II MGE

Walks Ghidra's P-code operation graph to emit JavaScript expressions.
The P-code graph IS a proper tree: each operation has typed inputs that are
outputs of other operations. No text parsing, no flat token scanning.

Structure (function boundaries, control flow, variable declarations) comes
from the ClangNode tree. Expressions come from the P-code graph.

Usage:
  python run_pyghidra.py                          # all blocks
  python run_pyghidra.py --dump FUN_004e868f      # dump AST + P-code
  python run_pyghidra.py --func FUN_004e868f      # transpile one function
  python run_pyghidra.py --block 0x004E0000       # transpile one block

Output: reverse_engineering/transpiler/output-ghidra/block_XXXXXXXX.js
"""

#@category CivII
#@description Transpile via P-code graph (type-aware expression trees)

# ═══════════════════════════════════════════════════════════════════
# Imports
# ═══════════════════════════════════════════════════════════════════

from ghidra.app.decompiler import DecompInterface, DecompileOptions
from ghidra.app.decompiler import (
    ClangBreak, ClangCommentToken, ClangFieldToken,
    ClangFuncNameToken, ClangFunction, ClangLabelToken,
    ClangNode, ClangOpToken, ClangReturnType,
    ClangStatement, ClangSyntaxToken, ClangToken,
    ClangTokenGroup, ClangTypeToken, ClangVariableDecl,
    ClangVariableToken
)
from ghidra.program.model.pcode import PcodeOp
from ghidra.util.task import TaskMonitor
import os
import re
import sys

# ── PyGhidra compatibility ────────────────────────────────────────

def _get_monitor():
    try:
        return monitor  # noqa: F821
    except NameError:
        return TaskMonitor.DUMMY

def _get_script_args():
    try:
        args = getScriptArgs()  # noqa: F821
        if args is not None:
            return list(args)
    except NameError:
        pass
    return sys.argv[1:] if len(sys.argv) > 1 else []

def _get_program():
    return currentProgram  # noqa: F821

# ═══════════════════════════════════════════════════════════════════
# Configuration
# ═══════════════════════════════════════════════════════════════════

BLOCK_RANGE = (0x00400000, 0x00620000)
DECOMPILE_TIMEOUT = 120

REGISTER_PREFIXES = ('in_EAX', 'in_ECX', 'in_EDX', 'unaff_ESI', 'unaff_EDI',
                     'unaff_EBX', 'unaff_EBP')
REGISTER_ORDER = ['in_EAX', 'in_ECX', 'in_EDX', 'unaff_ESI', 'unaff_EDI',
                  'unaff_EBX', 'unaff_EBP']

# PcodeOp name table (for dump mode)
PCODE_NAMES = {}
for _name in dir(PcodeOp):
    try:
        _val = getattr(PcodeOp, _name)
        if isinstance(_val, int) and _name[0].isupper():
            PCODE_NAMES[int(_val)] = _name
    except (AttributeError, TypeError):
        pass


def pcode_name(opcode):
    return PCODE_NAMES.get(opcode, 'OP_%d' % opcode)


# ═══════════════════════════════════════════════════════════════════
# Utility
# ═══════════════════════════════════════════════════════════════════

def get_children(node):
    return [node.Child(i) for i in range(node.numChildren())]

def get_token_text(node):
    try:
        return node.getText()
    except:
        return str(node)

def is_group(node):
    return isinstance(node, ClangTokenGroup)

def get_func_name_at(addr, program):
    """Look up function name at an address."""
    fm = program.getFunctionManager()
    func = fm.getFunctionAt(addr)
    if func is not None:
        name = func.getName()
        if name.startswith('thunk_'):
            name = name[6:]
        if name.startswith('FID_conflict_'):
            name = name[13:]
        return name
    return 'FUN_%08x' % addr.getOffset()

def get_symbol_name_at(offset, program):
    """Look up symbol name at a raw address offset."""
    try:
        space = program.getAddressFactory().getDefaultAddressSpace()
        addr = space.getAddress(offset)
        sym = program.getSymbolTable().getPrimarySymbol(addr)
        if sym is not None:
            return sym.getName()
    except:
        pass
    return 'DAT_%08x' % offset


# ═══════════════════════════════════════════════════════════════════
# AST Dump (debug mode) — same as before
# ═══════════════════════════════════════════════════════════════════

def dump_tree(node, indent=0, max_depth=30):
    if indent > max_depth:
        print('  ' * indent + '... (max depth)')
        return
    prefix = '  ' * indent
    cls = node.__class__.__name__
    if is_group(node):
        n = node.numChildren()
        print('%s[%s] (%d children)' % (prefix, cls, n))
        for i in range(n):
            dump_tree(node.Child(i), indent + 1, max_depth)
    else:
        text = get_token_text(node).replace('\n', '\\n').replace('\r', '')
        extras = []
        if isinstance(node, ClangVariableToken):
            hv = node.getHighVariable()
            if hv is not None:
                dt = hv.getDataType()
                if dt is not None:
                    extras.append('type=%s, size=%d' % (dt.getName(), dt.getLength()))
        pcop = node.getPcodeOp()
        if pcop is not None:
            extras.append('pcode=%s' % pcode_name(pcop.getOpcode()))
            out_vn = pcop.getOutput()
            if out_vn is not None:
                extras.append('out_size=%d' % out_vn.getSize())
            opc = pcop.getOpcode()
            if opc in (PcodeOp.LOAD, PcodeOp.STORE):
                extras.append('inputs=%d' % pcop.getNumInputs())
        extra_str = (' [%s]' % ', '.join(extras)) if extras else ''
        print('%s%s: "%s"%s' % (prefix, cls, text, extra_str))


# ═══════════════════════════════════════════════════════════════════
# P-code Expression Emitter — the core of the new approach
#
# Each PcodeOp maps to a JS expression fragment. We recurse into
# input Varnodes via getDef() to build the complete expression tree.
# ═══════════════════════════════════════════════════════════════════

class PcodeExprEmitter(object):
    """Walks Ghidra's P-code operation graph to produce JS expressions.

    KEY DESIGN: recursion stops at named variable boundaries. When a Varnode
    is a declared local/param (iVar2, param_1, etc.), we emit its name instead
    of re-expanding the entire expression that computed it. This prevents the
    explosion that occurs in SSA when one variable feeds many later statements.
    """

    def __init__(self, program, declared_vars=None):
        self.program = program
        self.declared_vars = declared_vars or set()
        self._depth = 0  # recursion depth counter

    def emit(self, op):
        """Emit a JS expression string for a PcodeOp and its input tree."""
        self._depth = 0
        return self._emit_op(op)

    def _emit_op(self, op):
        """Recursively emit JS for one PcodeOp."""
        self._depth += 1
        if self._depth > 80:
            self._depth -= 1
            return '/* DEPTH */'

        opc = op.getOpcode()

        # ── Arithmetic ────────────────────────────────────────────
        if opc == PcodeOp.INT_ADD:
            return '(%s + %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_SUB:
            return '(%s - %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_MULT:
            return '%s * %s' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_DIV or opc == PcodeOp.INT_SDIV:
            return '(%s / %s | 0)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_REM or opc == PcodeOp.INT_SREM:
            return '(%s %% %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_2COMP:
            return '(-%s)' % self._inp(op, 0)

        # ── Bitwise ───────────────────────────────────────────────
        if opc == PcodeOp.INT_AND:
            return '(%s & %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_OR:
            return '(%s | %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_XOR:
            return '(%s ^ %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_LEFT:
            return '(%s << %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_RIGHT:
            return '(%s >>> %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_SRIGHT:
            return '(%s >> %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_NEGATE:
            return '(~%s)' % self._inp(op, 0)

        # ── Boolean ───────────────────────────────────────────────
        if opc == PcodeOp.BOOL_AND:
            return '(%s && %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.BOOL_OR:
            return '(%s || %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.BOOL_NEGATE:
            return '(!%s)' % self._inp(op, 0)
        if opc == PcodeOp.BOOL_XOR:
            return '(%s !== %s)' % (self._inp(op, 0), self._inp(op, 1))

        # ── Comparison ────────────────────────────────────────────
        if opc == PcodeOp.INT_EQUAL:
            return '(%s === %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_NOTEQUAL:
            return '(%s !== %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_SLESS:
            return '(%s < %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_SLESSEQUAL:
            return '(%s <= %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_LESS:
            return '(%s < %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.INT_LESSEQUAL:
            return '(%s <= %s)' % (self._inp(op, 0), self._inp(op, 1))

        # ── Memory read ──────────────────────────────────────────
        if opc == PcodeOp.LOAD:
            return self._emit_load(op)

        # ── Memory write ─────────────────────────────────────────
        if opc == PcodeOp.STORE:
            return self._emit_store(op)

        # ── Type conversion ───────────────────────────────────────
        if opc == PcodeOp.INT_SEXT:
            in_size = op.getInput(0).getSize()
            inner = self._inp(op, 0)
            if in_size == 1:
                return 's8(%s)' % inner
            if in_size == 2:
                return '((%s) << 16 >> 16)' % inner  # sign-extend short
            return inner

        if opc == PcodeOp.INT_ZEXT:
            in_size = op.getInput(0).getSize()
            inner = self._inp(op, 0)
            if in_size == 1:
                return 'u8(%s)' % inner
            if in_size == 2:
                return '((%s) & 0xFFFF)' % inner
            return inner

        if opc == PcodeOp.COPY:
            return self._inp(op, 0)

        if opc == PcodeOp.CAST:
            return self._inp(op, 0)

        # ── Pointer ops ──────────────────────────────────────────
        if opc == PcodeOp.PTRADD:
            base = self._inp(op, 0)
            index = self._inp(op, 1)
            # input 2 is element size — for byte arrays it's 1
            return '(%s + %s)' % (base, index)

        if opc == PcodeOp.PTRSUB:
            # Address of a global. Input 0 = space base, Input 1 = offset
            vn1 = op.getInput(1)
            if vn1.isConstant():
                return get_symbol_name_at(vn1.getOffset(), self.program)
            return self._inp(op, 1)

        # ── Function call ─────────────────────────────────────────
        if opc == PcodeOp.CALL:
            return self._emit_call(op)

        if opc == PcodeOp.CALLIND:
            return self._emit_call_indirect(op)

        # ── SSA / control flow ────────────────────────────────────
        if opc == PcodeOp.MULTIEQUAL:
            # Phi node — just use the variable name
            out = op.getOutput()
            if out is not None:
                high = out.getHigh()
                if high is not None:
                    return high.getName()
            return '/* PHI */'

        if opc == PcodeOp.INDIRECT:
            # Side effect marker — use the variable
            return self._inp(op, 0)

        # ── Byte manipulation ─────────────────────────────────────
        if opc == PcodeOp.PIECE:
            # Concatenate two values: (hi << (lo_size*8)) | lo
            hi = self._inp(op, 0)
            lo = self._inp(op, 1)
            lo_size = op.getInput(1).getSize()
            return '((%s << %d) | %s)' % (hi, lo_size * 8, lo)

        if opc == PcodeOp.SUBPIECE:
            # Extract bytes: value >> (offset*8), masked by output size
            inner = self._inp(op, 0)
            byte_offset = op.getInput(1).getOffset() if op.getInput(1).isConstant() else 0
            out_size = op.getOutput().getSize()
            if byte_offset == 0 and out_size == 1:
                return '((%s) & 0xFF)' % inner
            if byte_offset == 0 and out_size == 2:
                return '((%s) & 0xFFFF)' % inner
            if byte_offset > 0:
                shifted = '((%s) >> %d)' % (inner, byte_offset * 8)
                if out_size == 1:
                    return '(%s & 0xFF)' % shifted
                if out_size == 2:
                    return '(%s & 0xFFFF)' % shifted
                return shifted
            return inner

        # ── Control flow ──────────────────────────────────────────
        if opc == PcodeOp.CBRANCH:
            return self._inp(op, 1)

        if opc == PcodeOp.RETURN:
            if op.getNumInputs() > 1:
                return self._inp(op, 1)
            return ''

        if opc == PcodeOp.BRANCH:
            return '/* goto */'

        if opc == PcodeOp.BRANCHIND:
            return '/* switch */'

        # ── Win32 / C runtime intrinsics ─────────────────────────
        if opc == PcodeOp.CALLOTHER:
            return '/* DEVIATION: intrinsic */'

        # ── Float ops (C runtime, rare in game logic) ────────────
        if opc == PcodeOp.FLOAT_ADD:
            return '(%s + %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_SUB:
            return '(%s - %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_MULT:
            return '(%s * %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_DIV:
            return '(%s / %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_LESS:
            return '(%s < %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_LESSEQUAL:
            return '(%s <= %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_EQUAL:
            return '(%s === %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_NOTEQUAL:
            return '(%s !== %s)' % (self._inp(op, 0), self._inp(op, 1))
        if opc == PcodeOp.FLOAT_NEG:
            return '(-%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_ABS:
            return 'Math.abs(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_SQRT:
            return 'Math.sqrt(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_TRUNC:
            return 'Math.trunc(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_NAN:
            return 'Number.isNaN(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_INT2FLOAT:
            return self._inp(op, 0)
        if opc == PcodeOp.FLOAT_FLOAT2FLOAT:
            return self._inp(op, 0)
        if opc == PcodeOp.FLOAT_TRUNC:
            return '(%s | 0)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_CEIL:
            return 'Math.ceil(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_FLOOR:
            return 'Math.floor(%s)' % self._inp(op, 0)
        if opc == PcodeOp.FLOAT_ROUND:
            return 'Math.round(%s)' % self._inp(op, 0)

        # ── Carry/borrow (rare, overflow detection) ──────────────
        if opc == PcodeOp.INT_CARRY:
            return '/* carry */'
        if opc == PcodeOp.INT_SCARRY:
            return '/* scarry */'
        if opc == PcodeOp.INT_SBORROW:
            return '/* sborrow */'

        # ── Fallback ──────────────────────────────────────────────
        return '/* %s */' % pcode_name(opc)

    # ── Input resolution ──────────────────────────────────────────

    def _inp(self, op, idx):
        """Emit JS for an input Varnode of a PcodeOp."""
        vn = op.getInput(idx)
        return self._emit_varnode(vn)

    def _emit_varnode(self, vn):
        """Emit JS for a Varnode — constant, variable, or defined by another op.

        KEY: if the Varnode is a declared variable (param, local), we emit its
        name and DON'T recurse into its defining op. This is the recursion
        boundary that prevents re-expanding entire expression trees.
        """
        if vn.isConstant():
            val = vn.getOffset()
            size = vn.getSize()
            if size == 4 and val > 0x7FFFFFFF:
                val = val - 0x100000000
                if val >= -128:
                    return str(val)
                return '-0x%x' % (-val)
            if val > 9:
                return '0x%x' % val
            return str(val)

        # Check if this is a named variable (recursion boundary)
        high = vn.getHigh()
        if high is not None:
            name = high.getName()
            if name and name in self.declared_vars:
                return name

        # Not a named variable — recurse into defining op
        def_op = vn.getDef()
        if def_op is not None:
            result = self._emit_op(def_op)
            self._depth -= 1  # balance the increment in _emit_op
            return result

        # Input with no def (function param, global, etc.)
        if high is not None:
            name = high.getName()
            if name:
                return name

        if vn.isAddress():
            return get_symbol_name_at(vn.getOffset(), self.program)
        try:
            return 'v_0x%x' % vn.getOffset()
        except:
            return '/* vn? */'

    # ── LOAD (memory read) ────────────────────────────────────────

    def _emit_load(self, op):
        """Emit typed memory read: s8/s16/s32 based on output size."""
        size = op.getOutput().getSize()
        addr_vn = op.getInput(1)
        addr_op = addr_vn.getDef()

        # Try to decompose address into base + offset for helper call
        if addr_op is not None:
            opc2 = addr_op.getOpcode()

            # PTRADD(base, index, elem_size) — array access
            if opc2 == PcodeOp.PTRADD:
                base = self._emit_varnode(addr_op.getInput(0))
                index = self._emit_varnode(addr_op.getInput(1))
                if size == 1:
                    return '%s[%s]' % (base, index)
                if size == 2:
                    return 's16(%s, %s)' % (base, index)
                if size == 4:
                    return 's32(%s, %s)' % (base, index)

            # INT_ADD(base, offset) — pointer + offset
            if opc2 == PcodeOp.INT_ADD:
                base = self._emit_varnode(addr_op.getInput(0))
                offset = self._emit_varnode(addr_op.getInput(1))
                if size == 1:
                    return '%s[%s]' % (base, offset)
                if size == 2:
                    return 's16(%s, %s)' % (base, offset)
                if size == 4:
                    return 's32(%s, %s)' % (base, offset)

            # PTRSUB — direct address of global (no offset)
            if opc2 == PcodeOp.PTRSUB:
                addr = self._emit_op(addr_op)
                if size == 1:
                    return '%s[0]' % addr
                if size == 2:
                    return 's16(%s, 0)' % addr
                if size == 4:
                    return 's32(%s, 0)' % addr

        # Fallback: direct address
        addr = self._emit_varnode(addr_vn)
        if size == 1:
            return '_MEM[%s]' % addr
        if size == 2:
            return 's16(%s, 0)' % addr
        if size == 4:
            return 's32(%s, 0)' % addr
        return '/* LOAD_%d(%s) */' % (size, addr)

    # ── STORE (memory write) ──────────────────────────────────────

    def _emit_store(self, op):
        """Emit typed memory write: w16/w32 based on value size."""
        addr_vn = op.getInput(1)
        val_vn = op.getInput(2)
        size = val_vn.getSize()
        val = self._emit_varnode(val_vn)
        addr_op = addr_vn.getDef()

        if addr_op is not None:
            opc2 = addr_op.getOpcode()

            if opc2 == PcodeOp.PTRADD:
                base = self._emit_varnode(addr_op.getInput(0))
                index = self._emit_varnode(addr_op.getInput(1))
                if size == 1:
                    return '%s[%s] = %s' % (base, index, val)
                if size == 2:
                    return 'w16(%s, %s, %s)' % (base, index, val)
                if size == 4:
                    return 'w32(%s, %s, %s)' % (base, index, val)

            if opc2 == PcodeOp.INT_ADD:
                base = self._emit_varnode(addr_op.getInput(0))
                offset = self._emit_varnode(addr_op.getInput(1))
                if size == 1:
                    return '%s[%s] = %s' % (base, offset, val)
                if size == 2:
                    return 'w16(%s, %s, %s)' % (base, offset, val)
                if size == 4:
                    return 'w32(%s, %s, %s)' % (base, offset, val)

            if opc2 == PcodeOp.PTRSUB:
                addr = self._emit_op(addr_op)
                if size == 1:
                    return '%s[0] = %s' % (addr, val)
                if size == 2:
                    return 'w16(%s, 0, %s)' % (addr, val)
                if size == 4:
                    return 'w32(%s, 0, %s)' % (addr, val)

        addr = self._emit_varnode(addr_vn)
        if size == 1:
            return '_MEM[%s] = %s' % (addr, val)
        if size == 2:
            return 'w16(%s, 0, %s)' % (addr, val)
        if size == 4:
            return 'w32(%s, 0, %s)' % (addr, val)
        return '/* STORE_%d(%s, %s) */' % (size, addr, val)

    # ── CALL (function call) ──────────────────────────────────────

    def _emit_call(self, op):
        """Emit function call: func_name(arg1, arg2, ...)."""
        target_vn = op.getInput(0)
        try:
            addr = target_vn.getAddress()
            name = get_func_name_at(addr, self.program)
        except:
            name = 'FUN_%x' % target_vn.getOffset()

        args = []
        for i in range(1, op.getNumInputs()):
            arg = self._emit_varnode(op.getInput(i))
            args.append(arg if arg is not None else '/* ? */')
        return '%s(%s)' % (name, ', '.join(args))

    def _emit_call_indirect(self, op):
        """Emit indirect function call."""
        target = self._inp(op, 0)
        args = []
        for i in range(1, op.getNumInputs()):
            args.append(self._emit_varnode(op.getInput(i)))
        return '%s(%s)' % (target, ', '.join(args))


# ═══════════════════════════════════════════════════════════════════
# JS Emitter — walks ClangNode tree for structure,
#              delegates to PcodeExprEmitter for expressions
# ═══════════════════════════════════════════════════════════════════

class JSEmitter(object):

    def __init__(self, func, high_func, program):
        self.func = func
        self.high_func = high_func
        self.func_name = func.getName()
        self.program = program

        # Collect declared variable names (recursion boundaries for P-code)
        self.declared_vars = set()
        lsm = high_func.getLocalSymbolMap()
        if lsm is not None:
            for sym in lsm.getSymbols():
                self.declared_vars.add(sym.getName())

        self.pcode = PcodeExprEmitter(program, self.declared_vars)

        # Output
        self.lines = []
        self.cur = []

        # State
        self.in_signature = False
        self.first_param = True
        self.emitted_ops = set()  # PcodeOps already emitted
        self.skip_until_brace = False  # After emitting if(cond), skip until {
        self._comment_words = []  # Accumulator for consecutive comment tokens

        # Pre-analysis
        self.register_params = []
        self._pre_analyze()

    def _pre_analyze(self):
        lsm = self.high_func.getLocalSymbolMap()
        if lsm is None:
            return
        for sym in lsm.getSymbols():
            name = sym.getName()
            for rp in REGISTER_PREFIXES:
                if name == rp or name.startswith(rp + '_'):
                    self.register_params.append(name)
                    break
        def reg_key(n):
            for i, p in enumerate(REGISTER_ORDER):
                if n == p or n.startswith(p):
                    return i
            return 99
        self.register_params.sort(key=reg_key)

    # ── Output helpers ────────────────────────────────────────────

    def _text(self, s):
        if not s:
            return
        self._flush_comment()  # flush pending comment words before new content
        if self.cur:
            prev = self.cur[-1]
            need = True
            if prev and prev[-1] in '([{!~':
                need = False
            if s[0] in ')]};\n,':
                need = False
            if prev and prev[-1] == ' ':
                need = False
            if s[0] == ' ':
                need = False
            if need:
                self.cur.append(' ')
        self.cur.append(s)

    def _newline(self, indent_chars=0):
        self.lines.append(''.join(self.cur).rstrip())
        self.cur = [' ' * indent_chars]

    def _flush(self):
        self._flush_comment()  # flush any pending comment
        if self.cur:
            line = ''.join(self.cur).rstrip()
            if line:
                self.lines.append(line)
            self.cur = []

    def _add_comment_word(self, word):
        """Collect consecutive ClangCommentToken words into one comment."""
        self._comment_words.append(word)

    def _flush_comment(self):
        """Emit collected comment words as a single /* ... */ block."""
        if self._comment_words:
            text = ' '.join(self._comment_words)
            comment = '/* %s */' % text
            # Append directly to cur to avoid recursion with _text
            if self.cur:
                self.cur.append(' ')
            self.cur.append(comment)
            self._comment_words = []

    # ── Main entry ────────────────────────────────────────────────

    def emit(self, markup):
        self._walk(markup)
        self._flush()
        return self.lines

    # ── Tree walker ───────────────────────────────────────────────

    def _walk(self, node):
        # Group nodes
        if isinstance(node, ClangFunction):
            self._emit_function(node)
        elif isinstance(node, ClangReturnType):
            pass  # skip
        elif isinstance(node, ClangVariableDecl):
            if self.in_signature:
                self._emit_param_decl(node)
            else:
                self._emit_var_decl(node)
        elif isinstance(node, ClangStatement):
            if not self.skip_until_brace:
                self._emit_statement(node)
        elif is_group(node):
            self._walk_children(node)  # Always recurse — skip_until_brace checked at leaf level
        # Leaf tokens — only reached for non-statement contexts (control flow)
        elif isinstance(node, ClangBreak):
            if not self.skip_until_brace:
                self._newline(node.getIndent())
        elif isinstance(node, ClangFuncNameToken):
            if not self.skip_until_brace:
                self._text(get_token_text(node))
        elif isinstance(node, ClangOpToken):
            if not self.skip_until_brace:
                self._emit_token_with_pcode(node)
        elif isinstance(node, ClangSyntaxToken):
            text = get_token_text(node)
            if self.skip_until_brace:
                if text == '{':
                    self.skip_until_brace = False
                    self._text('{')
                return
            if text != '':
                self._text(text)
        elif isinstance(node, ClangVariableToken):
            if not self.skip_until_brace:
                self._emit_token_with_pcode(node)
        elif isinstance(node, ClangTypeToken):
            pass  # Cast type tokens — handled by P-code, skip
        elif isinstance(node, ClangLabelToken):
            if not self.skip_until_brace:
                self._text(get_token_text(node) + ':')
        elif isinstance(node, ClangCommentToken):
            if not self.skip_until_brace:
                self._add_comment_word(get_token_text(node))
        elif isinstance(node, ClangFieldToken):
            if not self.skip_until_brace:
                self._text(get_token_text(node))
        else:
            if not self.skip_until_brace:
                text = get_token_text(node)
                if text.strip():
                    self._text(text)

    def _walk_children(self, node):
        for i in range(node.numChildren()):
            self._walk(node.Child(i))

    def _emit_token_with_pcode(self, node):
        """For tokens in non-statement contexts (e.g., if conditions),
        emit the full P-code expression tree if this token has an op."""
        pcop = node.getPcodeOp()
        if pcop is None:
            self._text(get_token_text(node))
            return

        opc = pcop.getOpcode()

        # "if" keyword — ClangOpToken with text "if" and pcode CBRANCH
        if opc == PcodeOp.CBRANCH and get_token_text(node) == 'if':
            cond = self.pcode.emit(pcop)
            self._text('if (%s)' % cond)
            self._mark_op_emitted(pcop)
            self.skip_until_brace = True  # Skip the original (cond) tokens
            return

        # "while" keyword — also CBRANCH
        if opc == PcodeOp.CBRANCH and get_token_text(node) == 'while':
            cond = self.pcode.emit(pcop)
            self._text('while (%s)' % cond)
            self._mark_op_emitted(pcop)
            self.skip_until_brace = True
            return

        # "do" keyword — CBRANCH for do-while
        if opc == PcodeOp.CBRANCH and get_token_text(node) == 'do':
            self._text('do')
            self._mark_op_emitted(pcop)
            return

        # Regular expression token — emit P-code expression if not yet emitted
        op_key = self._op_key(pcop)
        if op_key not in self.emitted_ops:
            self.emitted_ops.add(op_key)
            js = self.pcode.emit(pcop)
            self._text(js)
            self._mark_op_emitted(pcop)
        # else: already emitted, skip

    def _op_key(self, op):
        """Stable key for a PcodeOp (Java id() is unreliable via JPype)."""
        try:
            seq = op.getSeqnum()
            return (int(seq.getTarget().getOffset()), int(seq.getTime()))
        except:
            return id(op)  # fallback

    def _mark_op_emitted(self, op):
        """Mark a PcodeOp and its input tree as emitted."""
        key = self._op_key(op)
        if key in self.emitted_ops:
            return
        self.emitted_ops.add(key)
        for i in range(op.getNumInputs()):
            vn = op.getInput(i)
            def_op = vn.getDef()
            if def_op is not None:
                self._mark_op_emitted(def_op)

    # ── Function signature ────────────────────────────────────────

    def _emit_function(self, node):
        self.in_signature = True
        self.first_param = True
        for child in get_children(node):
            cls_name = child.__class__.__name__
            if 'FuncProto' in cls_name:
                self._emit_func_proto(child)
                continue
            if isinstance(child, ClangSyntaxToken):
                text = get_token_text(child)
                if text == '{' and self.in_signature:
                    self.in_signature = False
                    self._text('{')
                    continue
                if self.in_signature and text == '':
                    continue
            self._walk(child)

    def _emit_func_proto(self, node):
        self.first_param = True
        for child in get_children(node):
            if isinstance(child, ClangReturnType):
                continue
            if isinstance(child, ClangFuncNameToken):
                name = get_token_text(child)
                if name.startswith('thunk_'):
                    name = name[6:]
                if name.startswith('FID_conflict_'):
                    name = name[13:]
                self._text('export function %s' % name)
                continue
            if isinstance(child, ClangVariableDecl):
                self._emit_param_decl(child)
                continue
            if isinstance(child, ClangSyntaxToken):
                text = get_token_text(child)
                if text == '(':
                    self._text('(')
                    for rp in self.register_params:
                        if not self.first_param:
                            self._text(',')
                        self._text(rp)
                        self.first_param = False
                elif text == ')':
                    self._text(')')
                continue
            if isinstance(child, ClangBreak):
                continue

    def _emit_param_decl(self, node):
        for child in get_children(node):
            if isinstance(child, ClangVariableToken):
                if not self.first_param:
                    self._text(',')
                self._text(get_token_text(child))
                self.first_param = False

    def _emit_var_decl(self, node):
        var_name = None
        for child in get_children(node):
            if isinstance(child, ClangVariableToken):
                var_name = get_token_text(child)
        if var_name is None:
            return
        if var_name in self.register_params:
            self._text('// %s promoted to parameter' % var_name)
            return
        self._text('let %s' % var_name)

    # ── Statement emission via P-code ─────────────────────────────

    def _emit_statement(self, node):
        """Emit a complete statement using P-code expression trees.

        Strategy: find the root PcodeOp(s) from the statement's tokens,
        then build the JS from the P-code graph.
        """
        tokens = self._collect_leaf_tokens(node)
        if not tokens:
            return

        # Collect all PcodeOps referenced by tokens
        ops = []
        seen = set()
        for tok in tokens:
            pcop = tok.getPcodeOp()
            if pcop is not None and id(pcop) not in seen:
                seen.add(id(pcop))
                ops.append(pcop)

        if not ops:
            # No P-code — emit tokens as text (rare)
            for tok in tokens:
                text = get_token_text(tok)
                if text.strip():
                    self._text(text)
            return

        # Classify the statement by looking at its PcodeOps

        # RETURN
        for op in ops:
            if op.getOpcode() == PcodeOp.RETURN:
                if op.getNumInputs() > 1:
                    js = self.pcode._emit_varnode(op.getInput(1))
                    self._text('return %s' % js)
                else:
                    self._text('return')
                return

        # STORE (memory write) — may have multiple stores in one statement
        store_ops = [op for op in ops if op.getOpcode() == PcodeOp.STORE]
        if store_ops:
            js = self.pcode.emit(store_ops[0])
            self._text(js)
            return

        # BRANCHIND (switch indirect jump)
        for op in ops:
            if op.getOpcode() == PcodeOp.BRANCHIND:
                self._text('/* DEVIATION: switch indirect */')
                return

        # CALLOTHER (Win32/C runtime intrinsic)
        callother_ops = [op for op in ops if op.getOpcode() == PcodeOp.CALLOTHER]
        if callother_ops and not any(op.getOpcode() == PcodeOp.CALL for op in ops):
            self._text('/* DEVIATION: intrinsic */')
            return

        # Standalone CALL (void call — first token is function name)
        if isinstance(tokens[0], ClangFuncNameToken):
            call_ops = [op for op in ops if op.getOpcode() == PcodeOp.CALL]
            if call_ops:
                js = self.pcode.emit(call_ops[0])
                self._text(js)
                return

        # Assignment: LHS variable = expression
        lhs_name = None
        lhs_op = None
        for tok in tokens:
            if isinstance(tok, ClangVariableToken):
                lhs_name = get_token_text(tok)
                lhs_op = tok.getPcodeOp()
                break

        if lhs_name and lhs_op:
            js = self.pcode.emit(lhs_op)
            self._text('%s = %s' % (lhs_name, js))
            return

        # Fallback — emit tokens as-is with marker
        self._text('/* UNHANDLED_STMT */')
        for tok in tokens:
            text = get_token_text(tok)
            if text.strip():
                self._text(text)

    def _collect_leaf_tokens(self, node):
        """Collect all leaf tokens from a node tree, in order."""
        result = []
        if is_group(node):
            for i in range(node.numChildren()):
                result.extend(self._collect_leaf_tokens(node.Child(i)))
        elif not isinstance(node, ClangBreak):
            result.append(node)
        return result


# ═══════════════════════════════════════════════════════════════════
# Block processing
# ═══════════════════════════════════════════════════════════════════

def init_decompiler():
    decomp = DecompInterface()
    opts = DecompileOptions()
    decomp.setOptions(opts)
    decomp.openProgram(_get_program())
    return decomp

def get_functions_by_block():
    fm = _get_program().getFunctionManager()
    blocks = {}
    for func in fm.getFunctions(True):
        if func.isThunk() or func.isExternal():
            continue
        addr = func.getEntryPoint().getOffset()
        if addr < BLOCK_RANGE[0] or addr >= BLOCK_RANGE[1]:
            continue
        block_addr = addr & 0xFFFF0000
        if block_addr not in blocks:
            blocks[block_addr] = []
        blocks[block_addr].append(func)
    for ba in blocks:
        blocks[ba].sort(key=lambda f: f.getEntryPoint().getOffset())
    return blocks

def transpile_function(decomp, func, program):
    results = decomp.decompileFunction(func, DECOMPILE_TIMEOUT, _get_monitor())
    if not results.decompileCompleted():
        return ['// DECOMPILE_FAILED: %s' % func.getName()]
    high_func = results.getHighFunction()
    markup = results.getCCodeMarkup()
    if high_func is None or markup is None:
        return ['// NO_AST: %s' % func.getName()]
    emitter = JSEmitter(func, high_func, program)
    return emitter.emit(markup)

def process_block(decomp, block_addr, funcs, output_dir, program):
    filename = 'block_%08X.js' % block_addr
    filepath = os.path.join(output_dir, filename)
    lines = []
    lines.append('// Block 0x%08X — Ghidra P-code transpiler' % block_addr)
    lines.append('// Source: civ2.exe (Civilization II MGE)')
    lines.append('// Functions: %d' % len(funcs))
    lines.append('')
    lines.append("import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';")
    lines.append('')
    ok = 0
    failed = 0
    for func in funcs:
        _get_monitor().checkCancelled()
        _get_monitor().setMessage('Block 0x%08X: %s' % (block_addr, func.getName()))
        js_lines = transpile_function(decomp, func, program)
        lines.extend(js_lines)
        lines.append('')
        if js_lines and js_lines[0].startswith('//'):
            failed += 1
        else:
            ok += 1
    f = open(filepath, 'w')
    try:
        f.write('\n'.join(lines))
    finally:
        f.close()
    print('  %-28s  %4d ok, %3d failed' % (filename, ok, failed))
    return ok, failed

def process_all(output_dir, program):
    decomp = init_decompiler()
    try:
        blocks = get_functions_by_block()
        total = sum(len(v) for v in blocks.values())
        print('Found %d functions in %d blocks' % (total, len(blocks)))
        print('Output: %s' % output_dir)
        print('')
        tok = 0
        tfail = 0
        for ba in sorted(blocks.keys()):
            o, f = process_block(decomp, ba, blocks[ba], output_dir, program)
            tok += o
            tfail += f
        print('')
        print('Total: %d ok, %d failed out of %d' % (tok, tfail, total))
    finally:
        decomp.dispose()


# ═══════════════════════════════════════════════════════════════════
# Single-function modes
# ═══════════════════════════════════════════════════════════════════

def find_function(name):
    fm = _get_program().getFunctionManager()
    for func in fm.getFunctions(True):
        if func.getName() == name:
            return func
    return None

def mode_dump(func_name):
    func = find_function(func_name)
    if func is None:
        print('Function not found: %s' % func_name)
        return
    print('=== Function: %s @ 0x%08X ===' % (func_name, func.getEntryPoint().getOffset()))
    decomp = init_decompiler()
    try:
        results = decomp.decompileFunction(func, DECOMPILE_TIMEOUT, _get_monitor())
        if not results.decompileCompleted():
            print('Decompilation failed')
            return
        print('\n=== C output ===')
        for i, line in enumerate(results.getDecompiledFunction().getC().split('\n')):
            print('%4d: %s' % (i + 1, line))
        print('\n=== AST tree ===')
        dump_tree(results.getCCodeMarkup())
        print('\n=== Variable types ===')
        hf = results.getHighFunction()
        if hf:
            lsm = hf.getLocalSymbolMap()
            if lsm:
                for sym in lsm.getSymbols():
                    dt = sym.getDataType()
                    print('  %-20s  %-20s  size=%d' % (
                        sym.getName(), dt.getName() if dt else '?',
                        dt.getLength() if dt else -1))
    finally:
        decomp.dispose()

def mode_func(func_name):
    func = find_function(func_name)
    if func is None:
        print('Function not found: %s' % func_name)
        return
    decomp = init_decompiler()
    try:
        results = decomp.decompileFunction(func, DECOMPILE_TIMEOUT, _get_monitor())
        if not results.decompileCompleted():
            print('Decompilation failed')
            return
        print('=== C source ===')
        print(results.getDecompiledFunction().getC())
        print('=== JS output ===')
        program = _get_program()
        js_lines = transpile_function(decomp, func, program)
        for line in js_lines:
            print(line)
    finally:
        decomp.dispose()

def mode_block(block_hex):
    block_addr = int(block_hex, 16)
    decomp = init_decompiler()
    program = _get_program()
    try:
        blocks = get_functions_by_block()
        if block_addr not in blocks:
            print('Block 0x%08X not found.' % block_addr)
            for addr in sorted(blocks.keys()):
                print('  0x%08X (%d functions)' % (addr, len(blocks[addr])))
            return
        output_dir = get_output_dir()
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        funcs = blocks[block_addr]
        print('Processing block 0x%08X (%d functions)' % (block_addr, len(funcs)))
        process_block(decomp, block_addr, funcs, output_dir, program)
    finally:
        decomp.dispose()


# ═══════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════

def get_output_dir():
    try:
        script_file = getSourceFile()  # noqa: F821
        if script_file is not None:
            ghidra_dir = script_file.getParentFile().getAbsolutePath()
            re_dir = os.path.dirname(ghidra_dir)
            return os.path.join(re_dir, 'transpiler', 'output-ghidra')
    except:
        pass
    return os.path.join(
        'C:\\Users\\stuar\\Documents\\Stu\\Code\\civ2research',
        'reverse_engineering', 'transpiler', 'output-ghidra'
    )

def main():
    args = _get_script_args()
    if not args:
        output_dir = get_output_dir()
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        print('Ghidra P-code Transpiler — processing all blocks')
        print('')
        process_all(output_dir, _get_program())
        return

    args = list(args)
    mode = args[0]

    if mode == '--dump':
        mode_dump(args[1] if len(args) > 1 else 'FUN_004e868f')
    elif mode == '--func':
        if len(args) < 2:
            print('Usage: --func FUNC_NAME')
            return
        mode_func(args[1])
    elif mode == '--block':
        if len(args) < 2:
            print('Usage: --block 0x004E0000')
            return
        mode_block(args[1])
    else:
        print('Unknown: %s (use --dump, --func, --block, or no args)' % mode)

main()
