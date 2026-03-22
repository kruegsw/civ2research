// ═══════════════════════════════════════════════════════════════════
// block_00610000.js — Mechanical transpilation of block_00610000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00610000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00610000.c
//
// NOTE: Both functions in this block are 16-bit legacy sprite
// blitting routines that use segmented x86 memory addressing
// (segment(), in_SS, in_DS, FS_OFFSET, CONCAT22). The original C
// decompilation is nearly unreadable because Ghidra produced
// segment:offset arithmetic for what is actually real-mode 16-bit
// code. The transpilation below follows the ALGORITHMIC INTENT
// reconstructed from the pseudocode (phase 2 audit) while
// preserving original variable names where possible. Stack-based
// parameters are mapped to function arguments.
//
// These functions have NO game-state side effects (State mutations:
// NONE) and reference NO DAT_ globals. They are pure pixel-buffer
// operations called from the 32-bit sprite pipeline via thunks.
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ============================================================
// Function: FUN_0061a000 @ 0x0061A000
// Size: 326 bytes
// blit_sprite_16bit — rectangular sprite copy with transparency
// and horizontal coordinate wrapping
// ============================================================

// WARNING: Unable to track spacebase fully for stack
//
// Original C uses 16-bit segmented addressing (in_SS, in_DS,
// unaff_FS_OFFSET, segment()). Parameters were passed on the
// 16-bit stack at fixed offsets. This JS version accepts them
// as explicit arguments.
//
// Parameters (mapped from stack offsets):
//   srcBitmapTable  [+0x16] — far ptr: source scanline pointer table (FS-indexed)
//   dstBitmapTable  [+0x1a] — far ptr: destination scanline pointer table (FS-indexed)
//   srcStride       [+0x22] — source row stride offset
//   width           [+0x24] — number of columns to copy per row
//   wrapModulus     [+0x26] — modulus for horizontal wrapping
//   height          [+0x28] — number of rows to copy
//   dstYOffset      [+0x2a] — Y offset into destination lookup
//   srcYOffset      [+0x2c] — Y offset into source lookup
//   dstXOffset      [+0x2e] — X offset into destination lookup
//   srcXOffset      [+0x30] — X offset into source lookup
//   transparentColor [+0x32] — color key (< 0 means no transparency)

export function FUN_0061a000(
  srcBitmapTable, dstBitmapTable,
  srcStride, width, wrapModulus, height,
  dstYOffset, srcYOffset, dstXOffset, srcXOffset,
  transparentColor
) {
  // sVar20/sVar18 = stack pointer (auStack_2) — not needed in JS
  // iVar21 = CONCAT22 frame setup — not needed in JS
  // puVar1..puVar12, psVar3..psVar6 = segment:offset temporaries

  // Outer loop: iterate over rows (height down to 1)
  let sVar19 = height; // stack[+0x28]
  do {
    // sVar19 = current row countdown (outer)
    let sVar15 = width; // stack[+0x24], inner loop counter (columns)
    do {
      // ── Compute source pixel coordinates ──
      // uVar22:sVar17 = srcBitmapTable far pointer
      // Row delta = height - sVar19 (how many rows processed so far)
      // puVar12 = source[srcStride + (height - sVar19 + srcStride_extra) * 2]
      let rowDelta = height - sVar19;

      // Read 16-bit value from source lookup: source scanline index
      // Original: puVar12 = segment(uVar22, ((*psVar3 - *psVar5) + *psVar6) * 2 + sVar17)
      // *psVar3 = height, *psVar5 = sVar19 (current row), *psVar6 = srcStride
      let srcLookupIndex = (rowDelta + srcStride) * 2;
      let puVar12_val = srcBitmapTable[srcLookupIndex]; // 16-bit value from source

      // ── Compute column index with wrapping ──
      // sVar14 = wrapModulus [+0x26]
      // colDelta = width - sVar15 (columns processed in this row)
      let colDelta = width - sVar15;

      // psVar5 = segment(uVar22, (sVar15 - sVar19) * 2 + sVar17 + sVar14)
      // This reads a second value from the source at a different offset
      let srcVal2 = srcBitmapTable[(sVar15 - sVar19) * 2 + wrapModulus]; // approximate

      // effectiveCol = (puVar12_val + srcVal2) % wrapModulus
      let uVar12 = ((puVar12_val + srcVal2) >>> 0) % wrapModulus;

      // ── Read source pixel via FS-indexed lookup ──
      // cVar13 = *(FS_LOOKUP[srcBitmapBase + (srcYOffset + colDelta) * 4] + dstYOffset + colDelta)
      // This is the key pixel read from the source bitmap
      let cVar13 = srcBitmapTable.readPixel
        ? srcBitmapTable.readPixel(srcYOffset, uVar12, dstYOffset, colDelta)
        : 0;

      // ── Transparency test ──
      // if (transparentColor < 0) || (cVar13 !== (char)transparentColor)
      if (transparentColor < 0 || cVar13 !== s8(transparentColor)) {
        // ── Write pixel to destination ──
        // *(FS_LOOKUP[dstBitmapBase + (srcXOffset + colDelta) * 4] + dstXOffset + colDelta) = cVar13
        if (dstBitmapTable.writePixel) {
          dstBitmapTable.writePixel(srcXOffset, dstXOffset, colDelta, cVar13);
        }
      }

      sVar15 = sVar15 - 1;
    } while (0 < sVar15);

    sVar19 = sVar19 - 1;
  } while (0 < sVar19);
  return;
}



// ============================================================
// Function: FUN_0061a759 @ 0x0061A759
// Size: 423 bytes
// blit_rle_sprite_16bit — RLE-compressed sprite blit with
// transparency, vertical flip, and horizontal clipping
// ============================================================

// WARNING: Unable to track spacebase fully for stack
//
// Original C uses 16-bit segmented addressing. Parameters were
// passed on the 16-bit stack at fixed offsets. This JS version
// accepts them as explicit arguments.
//
// Parameters (mapped from stack offsets):
//   srcRleData      [+0x0a] — far ptr: RLE-encoded sprite data
//   dstBitmap       [+0x0e] — far ptr: destination bitmap base
//   srcLookupBase   [+0x12] — source scanline lookup table base
//   dstLookupBase   [+0x16] — far ptr: destination scanline lookup
//   transparentColor [+0x1a] — color key byte (pixels matching are skipped)
//   dstStartCol     [+0x1c] — destination left column offset
//   dstStartRow     [+0x1e] — destination top row offset
//   dstStride       [+0x20] — destination stride (negative = bottom-up/flipped)
//   dstHeight       [+0x22] — destination bitmap height (for flip calc)
//   clipWidth       [+0x24] — horizontal clipping width
//   numRows         [+0x26] — number of scanlines to blit
//   srcClipLeft     [+0x28] — source left clip offset
//   srcLookupYOff   [+0x2a] — source Y offset into scanline lookup
//   unused_2c       [+0x2c] — (unused)
//   srcInitOffset   [+0x2e] — initial source data offset
//   dstClipLeft     [+0x30] — destination left clip offset
//   dstLookupYOff   [+0x32] — destination Y offset into scanline lookup

export function FUN_0061a759(
  srcRleData, dstBitmap,
  srcLookupBase, dstLookupBase,
  transparentColor,
  dstStartCol, dstStartRow, dstStride, dstHeight,
  clipWidth, numRows,
  srcClipLeft, srcLookupYOff,
  unused_2c,
  srcInitOffset, dstClipLeft, dstLookupYOff
) {
  // sVar23/sVar17 = stack pointer — not needed in JS
  // iVar24 = CONCAT22 frame setup — not needed in JS

  // ── puVar1 = stack[+0x0e]: dstBitmap base (low 16 bits) ──
  let uVar15 = dstBitmap; // uint from stack[+0x0e]

  // ── Load source lookup far pointer [+0x12] ──
  // puVar2 = stack[+0x12]: srcLookupBase (segment:offset)
  // puVar3 = segment high, puVar3_2 = segment low

  // ── Load dest lookup far pointer [+0x16] ──
  // puVar2 = stack[+0x16]: dstLookupBase (segment:offset)

  // ── Handle vertical flip ──
  // iVar22 = stack[+0x20] (dstStride, signed)
  let iVar22 = dstStride;
  let uVar19; // effective start row
  if (iVar22 < 1) {
    // Flip: negate stride, mirror row
    iVar22 = -iVar22;
    // uVar19 = (dstHeight - 1) - dstStartRow
    uVar19 = (dstHeight - 1) - dstStartRow;
  } else {
    uVar19 = dstStartRow;
  }

  // ── Compute initial destination pointer ──
  // pcVar26 = (dstBitmap & 0xffff) + uVar19 * iVar22 + dstStartCol
  let pcVar26_offset = (uVar15 & 0xFFFF) + uVar19 * iVar22 + dstStartCol;

  // ── Set up source navigation ──
  // puVar7/*-0x0e*/ = stack[+0x2e] (srcInitOffset)
  let currentSrcRow = srcInitOffset;

  // psVar9/*-0x10*/ = (srcLookupYOff + dstLookupYOff) * 2 + srcLookupBase (low)
  let dstLookupPtr = (srcLookupYOff + dstLookupYOff) * 2 + (srcLookupBase & 0xFFFF);

  // piVar10/*-4*/ = (dstBitmap & 0xffff) + 4
  let rlePtr = (uVar15 & 0xFFFF) + 4;

  // sVar25 = stack[+0x26] (numRows)
  let sVar25 = numRows;

  // ── Outer loop: per row ──
  do {
    let savedSVar25 = sVar25;

    // ── Skip source scanlines to reach the correct row ──
    // Navigate RLE records by advancing rlePtr
    // iVar22_nav = rlePtr, iVar20 = currentSrcRow
    let iVar22_nav = rlePtr;
    let iVar20 = currentSrcRow;

    // Inner skip loop: while currentSrcRow < targetRow (via lookup table)
    // psVar4 = segment(puVar3, puVar7) → lookup table entry
    // while (*psVar4 <= sVar25): advance
    while (true) {
      // Read target row from lookup table
      let targetRow = dstLookupBase[dstLookupPtr]; // approximate
      if (targetRow === undefined || targetRow <= iVar20) break;
      // Advance: iVar22_nav += dataLen(at rlePtr-2) + 4
      let dataLen = srcRleData[iVar22_nav - 2] || 0; // uint16 at rlePtr-2
      iVar22_nav = iVar22_nav + dataLen + 4;
      iVar20 = iVar20 + 1;
    }

    currentSrcRow = iVar20;
    rlePtr = iVar22_nav;

    // ── Read RLE header for this scanline ──
    // startX = *(rlePtr - 4) as uint16
    let startX = srcRleData[rlePtr - 4] || 0;
    // dataLen = *(rlePtr - 2) as uint16
    let sVar25_dataLen = srcRleData[rlePtr - 2] || 0;

    if (sVar25_dataLen !== 0) {
      // ── Horizontal clipping (left side) ──
      // dstWriteBase = (srcClipLeft + dstClipLeft) * 2 + dstLookupBase(low)
      let sVar25_dstWrite = (srcClipLeft + dstClipLeft) * 2 + (dstLookupBase & 0xFFFF);

      // Save destination row pointer
      let savedPcVar26 = pcVar26_offset;

      let srcPixelStart = startX;
      let sVar18 = clipWidth; // clip width countdown

      // uVar14 = segment high of dstLookupBase
      // Skip columns where lookup value < startX
      while (true) {
        let lookupVal = dstLookupBase[sVar25_dstWrite] || 0;
        if (lookupVal >= srcPixelStart) break;
        sVar25_dstWrite = sVar25_dstWrite + 2;
        pcVar26_offset = pcVar26_offset + 1;
        sVar18 = sVar18 - 1;
      }

      // ── Copy pixel run with transparency ──
      if (0 < sVar18) {
        iVar20 = sVar18;
        let cVar12 = transparentColor; // color key byte
        let iVar22_data = rlePtr; // data pointer into RLE pixel data

        do {
          // pixelOffset = lookupTable[dstWriteBase] - startX
          let lookupVal = dstLookupBase[sVar25_dstWrite] || 0;
          let pixelOffset = lookupVal - srcPixelStart;

          // if pixelOffset >= dataLen, break (past end of run)
          if (pixelOffset >= sVar25_dataLen) break;

          // Read source pixel
          let cVar13 = srcRleData[pixelOffset + iVar22_data] || 0;

          // Transparency check: skip if pixel matches color key
          if (cVar13 !== cVar12) {
            // Write pixel to destination
            if (dstBitmap.buffer) {
              dstBitmap[pcVar26_offset] = cVar13;
            }
          }

          sVar25_dstWrite = sVar25_dstWrite + 2;
          pcVar26_offset = pcVar26_offset + 1;
          iVar20 = iVar20 - 1;
        } while (iVar20 !== 0);
      }

      // Restore destination row pointer
      pcVar26_offset = savedPcVar26;
    }

    // ── Advance to next row ──
    // pcVar26 += dstStride (stack[+0x20])
    pcVar26_offset = pcVar26_offset + dstStride;

    // Advance source lookup pointer by 2
    dstLookupPtr = dstLookupPtr + 2;

    sVar25 = savedSVar25 - 1;
    if (sVar25 < 1) {
      return;
    }
  } while (true);
}
