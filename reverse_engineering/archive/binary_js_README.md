# binary_js — Archived (2026-03-25)

## What this is

Manual C-to-JS transpilation of all 34 decompiled blocks from civ2.exe.
5,168 functions, 84K lines of JavaScript. Produced across multiple Claude
sessions starting in March 2026.

## Why we stopped

1. **No verifiable 1:1 mapping to C source.** JS line numbers don't correspond
   to C line numbers. Auditing requires reading both files side-by-side and
   manually reasoning about equivalence. No script can verify correctness.

2. **Systematic bugs kept appearing.** Typed array stride bugs (487 fixes
   across 13 files), wrong function aliases (166 instances), byte/word read
   width errors, missing pointer dereferences. Each fix round found new
   classes of bugs in "already audited" code.

3. **Session handoffs lost context.** Each Claude session could audit maybe
   500-1000 lines before running out of context. With 84K lines of JS and
   225K lines of C, full coverage required 50+ sessions. Prior sessions
   claimed "fully audited" but weren't — there was no way to distinguish
   a thorough check from a skim.

4. **Shortcuts in the original transpilation.** Functions were "simplified,"
   stubbed, or approximated rather than faithfully translated. Fixing these
   one-by-one was slower than re-transpiling from scratch.

## What replaced it

An automated transpiler (`reverse_engineering/transpiler/`) that reads the
decompiled C and produces JS with strict 1:1 line correspondence. Every C
line maps to the same JS line number. Verification is a mechanical diff.

## Can I still use this code?

Yes, as reference. The game logic is broadly correct and useful for
understanding function behavior. But do not edit these files — they are
no longer the source for the v4 engine pipeline.
