// Block 0x00610000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 2

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 /* /*  WARNING: */  /* Unable */  /* to */  /* track */  /* spacebase */  /* fully */  /* for */

 /* stack  */ */ export function FUN_0061a000 ()

 {
  let puVar1;
  let puVar2;
  let psVar3;
  let puVar4;
  let psVar5;
  let psVar6;
  let puVar7;
  let puVar8;
  let piVar9;
  let pcVar10;
  let puVar11;
  let puVar12;
  let cVar13;
  let sVar14;
  let sVar15;
  let uVar16;
  let sVar17;
  let sVar18;
  let sVar19;
  let sVar20;
  let unaff_SI;
  let unaff_DI;
  let in_SS;
  let in_DS;
  let uVar22;
  let unaff_FS_OFFSET;
  let auStack_2;
  let iVar21;

  sVar20 = ((DAT_fffffffe) & 0xFFFF);
  sVar18 = ((DAT_fffffffe) & 0xFFFF);
  iVar21 = (((((DAT_fffffffe >>> 0x10)) & 0xFFFF) << 16) | (sVar20 + 0xffea));
  w16((iVar21 + -4), 0, in_DS);
  w16((iVar21 + -6), 0, unaff_SI);
  w16((iVar21 + -8), 0, unaff_DI);
  /* DEVIATION: intrinsic */;
  uVar16 = s32(puVar1, 0);
  /* DEVIATION: intrinsic */;
  w32(puVar1, 0, (uVar16 & 0xffff));
  /* DEVIATION: intrinsic */;
  w16(puVar2, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  uVar16 = s32(puVar1, 0);
  /* DEVIATION: intrinsic */;
  w32(puVar1, 0, (uVar16 & 0xffff));
  /* DEVIATION: intrinsic */;
  w16(puVar2, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  sVar19 = s16(psVar3, 0);
  do {
    /* DEVIATION: intrinsic */;
    w16(psVar3, 0, sVar19);
    /* DEVIATION: intrinsic */;
    sVar19 = s16(psVar3, 0);
    do {
      /* DEVIATION: intrinsic */;
      uVar22 = (((s32(puVar4, 0) >>> 0x10)) & 0xFFFF);
      sVar17 = ((s32(puVar4, 0)) & 0xFFFF);
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      w16(puVar2, 0, s16(puVar12, 0));
      /* DEVIATION: intrinsic */;
      sVar14 = s16(psVar3, 0);
      /* DEVIATION: intrinsic */;
      sVar15 = s16(psVar3, 0);
      /* DEVIATION: intrinsic */;
      w16(psVar3, 0, (sVar15 - sVar19));
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      w16(puVar8, 0, ((s16(psVar3, 0) + s16(psVar5, 0)) % s16(puVar7, 0)));
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      cVar13 = _MEM[((s32((unaff_FS_OFFSET + (s32(piVar9, 0) + (((s16(psVar3, 0) + s16(psVar5, 0)) * 4) & 0xFFFF))), 0) + ((s16(puVar7, 0)) & 0xFFFF)) + ((s16(puVar8, 0)) & 0xFFFF))];
      /* DEVIATION: intrinsic */;
      if ((cVar13 !== ((s16(psVar3, 0)) & 0xFF))) {
        /* DEVIATION: intrinsic */;
        _MEM[pcVar10] = cVar13;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        /* DEVIATION: intrinsic */;
        _MEM[((s32((unaff_FS_OFFSET + (s32(piVar9, 0) + (((s16(psVar3, 0) + s16(psVar5, 0)) * 4) & 0xFFFF))), 0) + ((s16(puVar7, 0)) & 0xFFFF)) + ((s16(puVar8, 0)) & 0xFFFF))] = _MEM[puVar11];
      }
      sVar19 = (sVar19 + 0xffff);
    } while ((0 < sVar19))


 /* /*  WARNING: */  /* Unable */  /* to */  /* track */  /* spacebase */  /* fully */  /* for */

 /* stack  */ */ export function FUN_0061a759 ()

 {
  let puVar1;
  let puVar2;
  let puVar3;
  let psVar4;
  let psVar5;
  let puVar6;
  let puVar7;
  let psVar8;
  let psVar9;
  let piVar10;
  let pcVar11;
  let cVar12;
  let cVar13;
  let uVar14;
  let uVar15;
  let uVar16;
  let sVar17;
  let sVar18;
  let uVar19;
  let iVar20;
  let uVar21;
  let iVar22;
  let sVar23;
  let unaff_SI;
  let sVar25;
  let unaff_DI;
  let pcVar26;
  let in_SS;
  let in_DS;
  let auStack_2;
  let iVar24;

  sVar23 = ((DAT_fffffffe) & 0xFFFF);
  sVar17 = ((DAT_fffffffe) & 0xFFFF);
  iVar24 = (((((DAT_fffffffe >>> 0x10)) & 0xFFFF) << 16) | (sVar23 + 0xffe8));
  w16((iVar24 + -4), 0, in_DS);
  w16((iVar24 + -6), 0, unaff_SI);
  w16((iVar24 + -8), 0, unaff_DI);
  /* DEVIATION: intrinsic */;
  uVar15 = s32(puVar1, 0);
  /* DEVIATION: intrinsic */;
  uVar16 = s32(puVar2, 0);
  /* DEVIATION: intrinsic */;
  w16(puVar3, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  w16(puVar3, 0, ((uVar16) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  uVar16 = s32(puVar2, 0);
  /* DEVIATION: intrinsic */;
  w16(puVar3, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  w16(puVar3, 0, ((uVar16) & 0xFFFF));
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  iVar22 = ((s16(psVar4, 0)) << 16 >> 16);
  if ((iVar22 < 1)) {
    iVar22 = (-iVar22);
    /* DEVIATION: intrinsic */;
    /* DEVIATION: intrinsic */;
    uVar19 = ((s16(psVar4, 0) + 0xffff) - s16(psVar5, 0));
  }
  else {
    /* DEVIATION: intrinsic */;
    uVar19 = s16(puVar6, 0);
  }
  /* DEVIATION: intrinsic */;
  pcVar26 = ((s32(puVar1, 0) & 0xffff) + (((uVar19) & 0xFFFF) * iVar22 + ((s16(puVar6, 0)) & 0xFFFF)));
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  w16(puVar7, 0, s16(puVar3, 0));
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
  w16(psVar9, 0, ((s16(psVar4, 0) + s16(psVar5, 0)) * 2 + s16(psVar8, 0)));
  /* DEVIATION: intrinsic */;
  w32(piVar10, 0, ((uVar15 & 0xffff) + 4));
  /* DEVIATION: intrinsic */;
  sVar25 = s16(psVar4, 0);
  uVar21 = 0;
  do {
    w16((iVar24 + -10), 0, sVar25);
    /* DEVIATION: intrinsic */;
    iVar22 = s32(piVar10, 0);
    /* DEVIATION: intrinsic */;
    iVar20 = ((uVar21 << 16) | s16(puVar3, 0));
    /* DEVIATION: intrinsic */;
    /* DEVIATION: intrinsic */;
    while ((s16(psVar4, 0) <= sVar25)) {
      /* DEVIATION: intrinsic */;
      sVar25 = ((iVar20) & 0xFFFF);
      uVar21 = (((iVar20 >>> 0x10)) & 0xFFFF);
      if ((s16(psVar4, 0) <= sVar25)) {
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      /* DEVIATION: intrinsic */;
      w16(psVar9, 0, ((s16(psVar4, 0) + s16(psVar5, 0)) * 2 + s16(psVar8, 0)));
      w32((iVar24 + -14), 0, pcVar26);
      /* DEVIATION: intrinsic */;
      iVar20 = ((uVar21 << 16) | s16(psVar4, 0));
      /* DEVIATION: intrinsic */;
      uVar14 = s16(puVar3, 0);
      /* DEVIATION: intrinsic */;
      sVar25 = s16(psVar5, 0);
      /* DEVIATION: intrinsic */;
      sVar18 = s16(psVar5, 0);
      while ((s16(psVar5, 0) < s16(psVar4, 0))) {
        sVar25 = (sVar25 + 2);
        pcVar26 = (pcVar26 + 1);
        sVar18 = (sVar18 + 0xffff);
      }
      /* DEVIATION: intrinsic */;
      w16(psVar4, 0, sVar25);
      /* DEVIATION: intrinsic */;
      w16(psVar4, 0, sVar18);
      if ((0 < sVar18)) {
        iVar20 = ((uVar21 << 16) | sVar18);
        /* DEVIATION: intrinsic */;
        cVar12 = _MEM[pcVar11];
        /* DEVIATION: intrinsic */;
        iVar22 = s32(piVar10, 0);
        do {
          /* DEVIATION: intrinsic */;
          /* DEVIATION: intrinsic */;
          /* DEVIATION: intrinsic */;
          if ((s16(psVar5, 0) <= (s16(psVar8, 0) - s16(psVar4, 0)))) {
            _MEM[pcVar26] = cVar13;
          }
          sVar25 = (sVar25 + 2);
          pcVar26 = (pcVar26 + 1);
          iVar20 = (iVar20 + -1);
        } while ((iVar20 !== 0)) {
      return;
    }
  } while ( true );
}
