// Block 0x00610000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 2

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 /* /*  */ /* WARNING: */ /* Unable */ /* to */ /* track */ /* spacebase */ /* fully */ /* for */ /* stack */ /*  */ */

 export function FUN_0061a000 ()

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
  puVar1 = /* CALLOTHER */;
  uVar16 = s32(puVar1, 0);
  puVar1 = /* CALLOTHER */;
  w32(puVar1, 0, (uVar16 & 0xffff));
  puVar2 = /* CALLOTHER */;
  w16(puVar2, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  puVar1 = /* CALLOTHER */;
  uVar16 = s32(puVar1, 0);
  puVar1 = /* CALLOTHER */;
  w32(puVar1, 0, (uVar16 & 0xffff));
  puVar2 = /* CALLOTHER */;
  w16(puVar2, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  in_SS = /* CALLOTHER */;
  in_SS = /* CALLOTHER */;
  psVar3 = /* CALLOTHER */;
  sVar19 = s16(psVar3, 0);
  do {
    psVar3 = /* CALLOTHER */;
    w16(psVar3, 0, sVar19);
    psVar3 = /* CALLOTHER */;
    sVar19 = s16(psVar3, 0);
    do {
      puVar4 = /* CALLOTHER */;
      uVar22 = (((s32(puVar4, 0) >>> 0x10)) & 0xFFFF);
      sVar17 = ((s32(puVar4, 0)) & 0xFFFF);
      psVar3 = /* CALLOTHER */;
      psVar5 = /* CALLOTHER */;
      psVar6 = /* CALLOTHER */;
      puVar12 = /* CALLOTHER */;
      puVar2 = /* CALLOTHER */;
      w16(puVar2, 0, s16(puVar12, 0));
      psVar3 = /* CALLOTHER */;
      sVar14 = s16(psVar3, 0);
      psVar3 = /* CALLOTHER */;
      sVar15 = s16(psVar3, 0);
      psVar3 = /* CALLOTHER */;
      w16(psVar3, 0, (sVar15 - sVar19));
      psVar5 = /* CALLOTHER */;
      psVar3 = /* CALLOTHER */;
      puVar7 = /* CALLOTHER */;
      puVar8 = /* CALLOTHER */;
      w16(puVar8, 0, ((s16(psVar3, 0) + s16(psVar5, 0)) % s16(puVar7, 0)));
      psVar3 = /* CALLOTHER */;
      psVar5 = /* CALLOTHER */;
      piVar9 = /* CALLOTHER */;
      in_SS = /* CALLOTHER */;
      puVar7 = /* CALLOTHER */;
      puVar8 = /* CALLOTHER */;
      cVar13 = _MEM[((s32((unaff_FS_OFFSET + (s32(piVar9, 0) + (((s16(psVar3, 0) + s16(psVar5, 0)) * 4) & 0xFFFF))), 0) + ((s16(puVar7, 0)) & 0xFFFF)) + ((s16(puVar8, 0)) & 0xFFFF))];
      psVar3 = /* CALLOTHER */;
      if ((cVar13 !== ((s16(psVar3, 0)) & 0xFF))) cVar13 = (cVar13 !== ((s16(psVar3, 0)) & 0xFF)) {
        pcVar10 = /* CALLOTHER */;
        _MEM[pcVar10] = cVar13;
        psVar3 = /* CALLOTHER */;
        psVar5 = /* CALLOTHER */;
        piVar9 = /* CALLOTHER */;
        in_SS = /* CALLOTHER */;
        puVar7 = /* CALLOTHER */;
        puVar8 = /* CALLOTHER */;
        puVar11 = /* CALLOTHER */;
        _MEM[((s32((unaff_FS_OFFSET + (s32(piVar9, 0) + (((s16(psVar3, 0) + s16(psVar5, 0)) * 4) & 0xFFFF))), 0) + ((s16(puVar7, 0)) & 0xFFFF)) + ((s16(puVar8, 0)) & 0xFFFF))] = _MEM[puVar11];
      }
      sVar19 = (sVar19 + 0xffff);
    } while ((0 < sVar19)) psVar3 = /* CALLOTHER */ sVar19 = (s16(psVar3, 0) + 0xffff) return


 /* /*  */ /* WARNING: */ /* Unable */ /* to */ /* track */ /* spacebase */ /* fully */ /* for */ /* stack */ /*  */ */

 export function FUN_0061a759 ()

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
  puVar1 = /* CALLOTHER */;
  uVar15 = s32(puVar1, 0);
  puVar2 = /* CALLOTHER */;
  uVar16 = s32(puVar2, 0);
  puVar3 = /* CALLOTHER */;
  w16(puVar3, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  puVar3 = /* CALLOTHER */;
  w16(puVar3, 0, ((uVar16) & 0xFFFF));
  puVar2 = /* CALLOTHER */;
  uVar16 = s32(puVar2, 0);
  puVar3 = /* CALLOTHER */;
  w16(puVar3, 0, (((uVar16 >>> 0x10)) & 0xFFFF));
  puVar3 = /* CALLOTHER */;
  w16(puVar3, 0, ((uVar16) & 0xFFFF));
  puVar1 = /* CALLOTHER */;
  psVar4 = /* CALLOTHER */;
  iVar22 = ((s16(psVar4, 0)) << 16 >> 16);
  if ((iVar22 < 1)) {
    iVar22 = (-iVar22);
    psVar4 = /* CALLOTHER */;
    psVar5 = /* CALLOTHER */;
    uVar19 = ((s16(psVar4, 0) + 0xffff) - s16(psVar5, 0));
  }
  else {
    puVar6 = /* CALLOTHER */;
    uVar19 = s16(puVar6, 0);
  }
  puVar6 = /* CALLOTHER */;
  pcVar26 = ((s32(puVar1, 0) & 0xffff) + (((uVar19) & 0xFFFF) * iVar22 + ((s16(puVar6, 0)) & 0xFFFF)));
  puVar3 = /* CALLOTHER */;
  puVar7 = /* CALLOTHER */;
  w16(puVar7, 0, s16(puVar3, 0));
  psVar4 = /* CALLOTHER */;
  psVar5 = /* CALLOTHER */;
  psVar8 = /* CALLOTHER */;
  psVar9 = /* CALLOTHER */;
  w16(psVar9, 0, ((s16(psVar4, 0) + s16(psVar5, 0)) * 2 + s16(psVar8, 0)));
  piVar10 = /* CALLOTHER */;
  w32(piVar10, 0, ((uVar15 & 0xffff) + 4));
  psVar4 = /* CALLOTHER */;
  sVar25 = s16(psVar4, 0);
  uVar21 = 0;
  do {
    w16((iVar24 + -10), 0, sVar25);
    piVar10 = /* CALLOTHER */;
    iVar22 = s32(piVar10, 0);
    puVar3 = /* CALLOTHER */;
    iVar20 = ((uVar21 << 16) | s16(puVar3, 0));
    puVar3 = /* CALLOTHER */;
    puVar7 = /* CALLOTHER */;
    while ((s16(psVar4, 0) <= sVar25)) {
      psVar4 = /* CALLOTHER */;
      sVar25 = ((iVar20) & 0xFFFF);
      uVar21 = (((iVar20 >>> 0x10)) & 0xFFFF);
      if ((s16(psVar4, 0) <= sVar25)) break; iVar22 = (iVar22 + (((s16((iVar22 + -2), 0)) & 0xFFFF) + 4)) iVar20 = ((uVar21 << 16) | (sVar25 + 1)) psVar4 = /* CALLOTHER */ w16(psVar4, 0, sVar25) piVar10 = /* CALLOTHER */ w32(piVar10, 0, iVar22) puVar3 = /* CALLOTHER */ w16(puVar3, 0, s16((iVar22 + -4), 0)) sVar25 = s16((iVar22 + -2), 0) psVar4 = /* CALLOTHER */ w16(psVar4, 0, sVar25) {
      psVar4 = /* CALLOTHER */;
      psVar5 = /* CALLOTHER */;
      psVar8 = /* CALLOTHER */;
      psVar9 = /* CALLOTHER */;
      w16(psVar9, 0, ((s16(psVar4, 0) + s16(psVar5, 0)) * 2 + s16(psVar8, 0)));
      w32((iVar24 + -14), 0, pcVar26);
      psVar4 = /* CALLOTHER */;
      iVar20 = ((uVar21 << 16) | s16(psVar4, 0));
      puVar3 = /* CALLOTHER */;
      uVar14 = s16(puVar3, 0);
      psVar5 = /* CALLOTHER */;
      sVar25 = s16(psVar5, 0);
      psVar5 = /* CALLOTHER */;
      sVar18 = s16(psVar5, 0);
      while ((s16(psVar5, 0) < s16(psVar4, 0))) psVar5 = /* CALLOTHER */ psVar5 = s16(psVar5, 0) {
        sVar25 = (sVar25 + 2);
        pcVar26 = (pcVar26 + 1);
        sVar18 = (sVar18 + 0xffff);
      }
      psVar4 = /* CALLOTHER */;
      w16(psVar4, 0, sVar25);
      psVar4 = /* CALLOTHER */;
      w16(psVar4, 0, sVar18);
      if ((0 < sVar18)) {
        iVar20 = ((uVar21 << 16) | sVar18);
        pcVar11 = /* CALLOTHER */;
        cVar12 = _MEM[pcVar11];
        piVar10 = /* CALLOTHER */;
        iVar22 = s32(piVar10, 0);
        do {
          psVar8 = /* CALLOTHER */;
          psVar4 = /* CALLOTHER */;
          psVar5 = /* CALLOTHER */;
          if ((s16(psVar5, 0) <= (s16(psVar8, 0) - s16(psVar4, 0)))) break; cVar13 = _MEM[((((s16(psVar8, 0) - s16(psVar4, 0))) & 0xFFFF) + iVar22)] {
            _MEM[pcVar26] = cVar13;
          }
          sVar25 = (sVar25 + 2);
          pcVar26 = (pcVar26 + 1);
          iVar20 = (iVar20 + -1);
        } while ((iVar20 !== 0)) pcVar26 = s32((iVar24 + -14), 0) psVar4 = /* CALLOTHER */ pcVar26 = (pcVar26 + ((s16(psVar4, 0)) << 16 >> 16)) psVar4 = /* CALLOTHER */ psVar5 = /* CALLOTHER */ w16(psVar5, 0, (s16(psVar4, 0) + 2)) uVar21 = (((iVar20 >>> 0x10)) & 0xFFFF) sVar25 = (s16((iVar24 + -10), 0) + 0xffff) {
      return;
    }
  } while ( true );
}
