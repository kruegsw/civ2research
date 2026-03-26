import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };
// ============================================================
// Function: FUN_005802fd @ 0x005802FD
// Size: 68 bytes
// ============================================================

export function FUN_005802fd(param_1, param_2, param_3, param_4) {


  FUN_0047ce1e(param_1,param_2,0,G.DAT_006d1da0,1);
  FUN_0047ce1e(param_3,param_4,0,G.DAT_006d1da0,1);
  return;
}



// ============================================================
// Function: FUN_00580341 @ 0x00580341
// Size: 15052 bytes
// ============================================================

export function FUN_00580341(param_1, param_2, param_3) {


  let bVar1;
  let bVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let uVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let uVar12;
  let iVar13;
  let uVar14;
  let iVar15;
  let iVar16;
  let uVar17;
  let bVar18;
  let local_e4;
  let local_e0;
  let local_dc;
  let local_d8;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b0;
  let local_ac;
  let local_a0;
  let local_98;
  let local_78;
  let local_6c;
  let local_64;
  let local_60;
  let aiStack_58 = new Array(8).fill(0);
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;
  
  local_28 = 0;
  local_b8 = 0;
  bVar18 = false;
  bVar5 = false;
  local_30 = 0;
  local_b0 = 0;
  local_10 = 0;
  local_24 = 0;
  local_ac = 0;
  local_38 = 1;
  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    w32(local_18 * 4 + 0x6acae8, 0, 0);
    w32(local_18 * 4 + 0x6acb10, 0, 0);
  }
  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  uVar7 = ((s8(bVar1)) >>> 0);
  iVar8 = s16(G.DAT_006560f0, param_1 * 0x20);
  iVar9 = s16(G.DAT_006560f2, param_1 * 0x20);
  local_a0 = FUN_0057e2c3(param_1);
  local_78 = s8(G.DAT_0064b1c7[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]);
  iVar10 = FUN_005b2c3d(param_1);
  if (iVar10 < ((G.DAT_0064bcc8) | 0)) {
    local_98 = FUN_005b2c3d(param_1);
  }
  else {
    local_98 = ((G.DAT_0064bcc8) >>> 0);
  }
  if (param_3 !== 0) {
    local_a0 = local_a0 * local_98 / ((G.DAT_0064bcc8) | 0);
  }
  uVar11 = FUN_005ae052(s8(G.DAT_00628350[param_2]) + iVar8);
  iVar10 = s8(G.DAT_00628360[param_2]) + iVar9;
  local_14 = iVar10;
  local_8 = uVar11;
  local_c = FUN_005b2e69(uVar11,iVar10);
  if (local_c < 0) {
    return 999;
  }
  local_c = FUN_0057e6e2(local_c,param_1);
  bVar2 = G.DAT_006560f7[local_c * 0x20];
  uVar12 = ((s8(bVar2)) >>> 0);
  local_64 = FUN_0057e33a(local_c,0,param_1);
  local_34 = s8(G.DAT_0064b1c7[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14]);
  if (((G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x03) &&
      (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0x01)) &&
     (G.DAT_0064b1c3[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) {
    local_64 = local_64 - (local_64 >> 1);
    local_34 = 1;
  }
  if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] & 4) !== 0) {
    local_c4 = FUN_005b2a39(param_1);
    if (G.DAT_00654fae !== 0) {
      local_c4 = local_c4 -
                 s8(G.DAT_0064b1c2[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) / 2;
    }
    if (((((G.DAT_0064bcc8) >>> 0) * 2 === local_c4) &&
        (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) &&
       (iVar13 = FUN_005b29aa(param_1), iVar13 === 10)) {
      local_64 = local_64 + (local_64 >> 1);
    }
  }
  if (((G.DAT_0064b1bd[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] & 0x20) !== 0) &&
     (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x01)) {
    if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) === 0) {
      local_64 = local_64 * 3;
    }
    else {
      local_64 = local_64 * 5;
    }
  }
  if ((((0 < G.DAT_006acb08) &&
       (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x02)) &&
      (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] !== 0x02)) &&
     ((iVar13 = FUN_0043d20a(G.DAT_006acb08,0x1c), iVar13 !== 0 &&
      (local_64 = local_64 << 1, param_3 !== 0)))) {
    local_b8 = 0x1c;
    w32(G.DAT_0064f344, G.DAT_006acb08 * 0x58, 
         u32(G.DAT_0064f344, G.DAT_006acb08 * 0x58) | 0x8000000);
  }
  if ((0 < G.DAT_006acb08) &&
     (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x01)) {
    if (((G.DAT_0064b1bc[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] & 0x10) === 0) ||
       ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) {
      iVar13 = FUN_0043d20a(G.DAT_006acb08,0x11);
      if (((iVar13 !== 0) &&
          ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) &&
         (s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) < 99)) {
        local_64 = local_64 << 1;
        local_24 = 1;
        if (param_3 !== 0) {
          local_b8 = 0x11;
        }
      }
      iVar13 = FUN_0043d20a(G.DAT_006acb08,0x1b);
      if ((iVar13 !== 0) && (local_64 = local_64 << 1, param_3 !== 0)) {
        local_b8 = 0x1b;
      }
    }
    else if (param_3 !== 0) {
      local_28 = 1;
    }
  }
  if ((G.DAT_006560f6[param_1 * 0x20] === 9) &&
     (G.DAT_0064b1c4[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) {
    local_a0 = local_a0 << 3;
  }
  if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x02) &&
     (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) {
    local_78 = 1;
    local_34 = 1;
  }
  if ((G.DAT_0064b1bc[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] & 8) !== 0) {
    local_34 = 1;
  }
  if (((G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) !== 0) &&
     ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
    FUN_00492c15(uVar12,0x12,uVar11,iVar10,3);
    FUN_004933f2(uVar12,uVar11,iVar10,0x12,2);
  }
  if (((G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0x02) &&
      (iVar13 = FUN_005b89e4(uVar11,iVar10), iVar13 === 0)) &&
     (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x02)) {
    local_34 = 1;
    if (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x01) {
      local_10 = 1;
      local_78 = local_78 << 1;
    }
    else {
      local_10 = 1;
      local_78 = local_78 << 1;
    }
  }
  if (uVar7 === 0) {
    if ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) {
      local_a0 = local_a0 / 2;
    }
    else {
      local_a0 = (G.DAT_00655b08 + 1) * local_a0;
      local_a0 = local_a0 + (local_a0 >> 0x1f & 3) >> 2;
    }
    if (-1 < G.DAT_006acb08) {
      if (s16(G.DAT_0064c708, uVar12 * 0x594) < 2) {
        local_a0 = 0;
      }
      iVar13 = FUN_0043d20a(G.DAT_006acb08,1);
      bVar18 = iVar13 !== 0;
      if (bVar18) {
        local_a0 = local_a0 >> 1;
      }
      if (s16(G.DAT_0064c708, uVar12 * 0x594) < 8) {
        bVar18 = true;
      }
    }
    iVar13 = FUN_00453e51(uVar12,6);
    if (iVar13 !== 0) {
      local_a0 = local_a0 / 2;
    }
  }
  if (uVar12 === 0) {
    if (((G.DAT_006560f6[local_c * 0x20] === 0x04) ||
        ((G.DAT_006560f6[local_c * 0x20] === 0x05 && ((G.DAT_00655b0b & G.DAT_00655ba9) === 0)))) &&
       (local_64 = local_64 / 2, local_64 < 2)) {
      local_64 = 1;
    }
    iVar13 = FUN_00453e51(uVar7,6);
    if (iVar13 !== 0) {
      local_a0 = local_a0 << 1;
    }
  }
  if (param_3 === 0) {
    if ((G.DAT_00655ae8 & 0x10) !== 0) {
      iVar8 = FUN_005b29d7(param_1);
      local_a0 = (iVar8 + local_78 * 8) * local_a0;
      iVar8 = FUN_005b29d7(local_c);
      local_64 = (iVar8 + local_34 * 8) * local_64;
    }
    for (; 3999 < local_a0; local_a0 = local_a0 >> 1) {
      local_64 = local_64 >> 1;
    }
    iVar8 = (local_a0 << 3) / (local_64 + 1);
    if (iVar8 < 0x401) {
      return iVar8;
    }
    return 0x400;
  }
  if ((G.DAT_006ad0cc & 2) !== 0) {
    G.DAT_006560f8[param_1 * 0x20] = G.DAT_006560f8[param_1 * 0x20] + G.DAT_0064bcc8;
  }
  if (((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0) &&
     (iVar13 = FUN_00579ed0(uVar7,uVar12,0xd), iVar13 !== 0)) {
    return 1;
  }
  if ((G.DAT_0064c6c0[uVar12 * 4 + uVar7 * 0x594] & 8) !== 0) {
    return 1;
  }
  if ((uVar7 !== 0) && (uVar12 !== 0)) {
    G.DAT_00655b14 = 0;
  }
  FUN_00467825(uVar7,uVar12,0x200);
  if (((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) ||
     (((G.DAT_0064c6c0[uVar7 * 4 + uVar12 * 0x594] & 6) === 0 &&
      ((((G.DAT_0064c6c0[uVar7 * 4 + uVar12 * 0x594] & 1) === 0 &&
        ((G.DAT_0064c6c0[uVar12 * 4 + uVar7 * 0x594] & 0x40) === 0)) ||
       ((G.DAT_0064c6c1[uVar7 * 4 + uVar12 * 0x594] & 0x20) !== 0)))))) {
    if (((G.DAT_0064c6c0[uVar12 * 4 + uVar7 * 0x594] & 4) !== 0) ||
       ((G.DAT_0064c6c0[uVar7 * 4 + uVar12 * 0x594] & 4) !== 0)) {
      if (G.DAT_00655b02 < 3) {
        if (((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) &&
           ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
          if ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + uVar12 * 4] & 8) === 0) {
            if ((G.DAT_0064c6c0[G.DAT_006d1da0 * 0x594 + uVar7 * 4] & 8) === 0) {
              if (G.DAT_00655b07 !== 0) {
                local_30 = 1;
              }
            }
            else {
              local_b0 = 2;
            }
          }
          else {
            local_b0 = 1;
          }
        }
        else {
          local_30 = 1;
        }
      }
      else {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (u8(local_18) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0) {
            if (uVar7 === local_18) {
              w32(local_18 * 4 + 0x6acb10, 0, 1);
            }
            else if (uVar12 === local_18) {
              w32(local_18 * 4 + 0x6acb10, 0, 1);
            }
            else if (G.DAT_00655b07 !== 0) {
              w32(local_18 * 4 + 0x6acb10, 0, 1);
            }
            if (s32(local_18 * 4 + 0x6acb10, 0) !== 0) {
              local_30 = 1;
            }
          }
        }
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (u8(local_18) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0) {
            if ((uVar12 === local_18) || ((G.DAT_0064c6c0[uVar12 * 4 + local_18 * 0x594] & 8) === 0))
            {
              if ((uVar7 !== local_18) && ((G.DAT_0064c6c0[uVar7 * 4 + local_18 * 0x594] & 8) !== 0))
              {
                w32(local_18 * 4 + 0x6acae8, 0, 2);
                local_b0 = 2;
              }
            }
            else {
              w32(local_18 * 4 + 0x6acae8, 0, 1);
              local_b0 = 1;
            }
          }
        }
      }
    }
  }
  else {
    if (4 < u8(G.DAT_0064c6b5[uVar7 * 0x594])) {
      local_6c = _rand();
      local_6c = local_6c % 100;
      if ((G.DAT_0064c6b5[uVar7 * 0x594] === 0x05) ||
         (iVar13 = FUN_00453e51(uVar7,0x18), iVar13 !== 0)) {
        local_6c = local_6c + -0x32;
      }
      if ((-1 < local_6c + u8(G.DAT_0064c6be[uVar12 * 0x594]) * -10) &&
         ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
        FUN_0055f5a3(uVar7,1);
      }
    }
    if (((G.DAT_0064c6c0[uVar7 * 4 + uVar12 * 0x594] & 2) === 0) ||
       ((G.DAT_0064c6c0[uVar7 * 4 + uVar12 * 0x594] & 4) !== 0)) {
      if ((G.DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
        uVar14 = FUN_00410070(uVar7);
        FUN_0040ff60(0,uVar14);
        if (G.DAT_006d1da0 === uVar12) {
          FUN_004442e0(s_SNEAK_00634454,param_1);
        }
        else if (2 < G.DAT_00655b02) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x2e,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + uVar12 * 4) * 0x54),1,0
                             // DEVIATION(cont): ,param_1,0);
        }
      }
    }
    else if ((G.DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
      uVar14 = FUN_00493c7d(uVar7);
      FUN_0040ff60(0,uVar14);
      if (G.DAT_006d1da0 === uVar12) {
        FUN_004442e0(s_BREAKCEASE_00634448,param_1);
      }
      else if (2 < G.DAT_00655b02) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x2d,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + uVar12 * 4) * 0x54),1,0,
                           // DEVIATION(cont): param_1,0);
      }
    }
    local_a0 = local_a0 << 1;
    w16(G.DAT_0064ca82, uVar12 * 0x594 + uVar7 * 2, G.DAT_00655af8);
  }
  iVar13 = FUN_00579c40(uVar7,uVar12);
  if (uVar7 !== 0) {
    if ((G.DAT_00655b08 < 2) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
      local_a0 = local_a0 >> 1;
    }
    if ((G.DAT_00655b08 === 0) && ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
      local_a0 = local_a0 << 1;
    }
  }
  bVar3 = false;
  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    aiStack_58[local_18] = 0;
    if ((((2 < G.DAT_00655b02) || (G.DAT_006d1da0 === local_18)) &&
        ((1 << (u8(local_18) & 0x1f) & ((G.DAT_00655b0a) >>> 0)) !== 0)) &&
       ((1 << (u8(local_18) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
      if (G.DAT_00655b02 < 3) {
        if (((((uVar7 === local_18) || (uVar12 === local_18)) ||
             ((G.DAT_00655b07 !== 0 ||
              ((((1 << (u8(local_18) & 0x1f) & u8(G.DAT_006560f9[param_1 * 0x20])) !== 0
                || (s8(G.DAT_006560f7[param_1 * 0x20]) === (local_18 & 0xff))) ||
               ((1 << (u8(local_18) & 0x1f) & u8(G.DAT_006560f9[local_c * 0x20])) !== 0)))
              ))) || (s8(G.DAT_006560f7[local_c * 0x20]) === (local_18 & 0xff))) ||
           (((G.DAT_00655af0 & 0x80) !== 0 && ((G.DAT_0064bc60 & 8) !== 0)))) {
          aiStack_58[local_18] = 1;
          bVar3 = true;
        }
      }
      else if ((uVar7 === local_18) || (uVar12 === local_18)) {
        aiStack_58[local_18] = 1;
        bVar3 = true;
      }
    }
  }
  if (bVar3) {
    FUN_005b490e(param_1,uVar12);
    FUN_004b0b53(0xff,2,0,0,0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (G.DAT_006d1da0 === local_18) {
          iVar15 = FUN_004105f8(uVar11,iVar10,uVar7);
          if (iVar15 === 0) {
            FUN_0047cea6(iVar8,iVar9);
          }
        }
        else {
          local_c8 = uVar12;
          if (uVar7 === local_18) {
            local_c8 = uVar7;
          }
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x71,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,local_c8,0,0,0,0,0);
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x72,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): iVar8,iVar9,0,0,0,0,0,0);
        }
      }
    }
    FUN_005b5bab(param_1,1);
    for (local_1c = 0; local_1c < 8; local_1c = local_1c + 1) {
      if ((local_1c === 0) || (s16(G.DAT_0066ca84, local_1c * 0x3f0) !== 0)) {
        FUN_0047bc59(local_c);
        FUN_0047cb26(uVar11,iVar10);
      }
    }
    if ((u32(G.DAT_0064b1bc, u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14) & 0x1008) !==
        0) {
      FUN_0046e287(10);
    }
    if (((((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0) &&
         (s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) < 99)) &&
        ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) &&
       ((iVar15 = FUN_0043d07a(uVar11,iVar10,0xffffffff,0xffffffff,0xffffffff), -1 < iVar15 &&
        (FUN_0040ff60(0,G.DAT_0064f360 + iVar15 * 0x58), G.DAT_00654fa8 === 0)))) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (aiStack_58[local_18] !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_004442e0(s_MISSILEATTACK_0063445c,param_1);
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x2f,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,1,0,param_1,0);
          }
        }
      }
    }
    if (local_10 !== 0) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(0,uVar14);
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(1,*(undefined4 *)
                            // DEVIATION(cont): (&G.DAT_0064b1b8 + (uint)(byte)(&G.DAT_006560f6)[param_1 * 0x20] * 0x14));
      uVar14 = FUN_00410070(uVar12);
      FUN_0040ff60(2,uVar14);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0(s_PEARLHARBOR_0063446c,param_1);
            }
            else {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x30,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),3,0,param_1,0)
              // DEVIATION(cont): ;
            }
          }
        }
      }
    }
    if (local_b8 !== 0) {
      FUN_004271e8(1,s32(G.DAT_0064c488, local_b8 * 8));
      FUN_0040ff60(2,G.DAT_0064f360 + G.DAT_006acb08 * 0x58);
      if ((local_24 === 0) || (local_b8 === 0x11)) {
        if (G.DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_004cc870(s_BATTERY_00634484,local_b8,8);
              }
              else {
                // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x32,*(undefined4 *)
                                         // DEVIATION(cont): (&G.DAT_006ad30c +
                                         // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),3,0,local_b8
                                   // DEVIATION(cont): ,0);
              }
            }
          }
        }
      }
      else {
        FUN_004271e8(3,G.DAT_0064c510);
        if (G.DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_004cc870(s_BATTERY2_00634478,local_b8,8);
              }
              else {
                // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x31,*(undefined4 *)
                                         // DEVIATION(cont): (&G.DAT_006ad30c +
                                         // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),4,0,local_b8
                                   // DEVIATION(cont): ,0);
              }
            }
          }
        }
      }
    }
    if (local_28 !== 0) {
      uVar14 = FUN_00410070(uVar12);
      FUN_0040ff60(0,uVar14);
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(1,*(undefined4 *)
                            // DEVIATION(cont): (&G.DAT_0064b1b8 + (uint)(byte)(&G.DAT_006560f6)[local_c * 0x20] * 0x14));
      FUN_0040ff60(2,G.DAT_0064f360 + G.DAT_006acb08 * 0x58);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0(s_SCRAMBLE_0063448c,local_c);
            }
            else {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x33,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),3,0,local_c,0)
              // DEVIATION(cont): ;
            }
          }
        }
      }
    }
    if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0) &&
       (iVar15 = FUN_005b89e4(iVar8,iVar9), iVar15 !== 0)) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(1,uVar14);
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(2,*(undefined4 *)
                            // DEVIATION(cont): (&G.DAT_0064b1b8 + (uint)(byte)(&G.DAT_006560f6)[param_1 * 0x20] * 0x14));
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0(s_AMPHIBMOTIZE_00634498,param_1);
            }
            else {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x34,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),3,0,param_1,0)
              // DEVIATION(cont): ;
            }
          }
        }
      }
    }
    local_ac = 0;
    bVar6 = G.DAT_006560f6[param_1 * 0x20];
    G.DAT_0066bfc4 = -1;
    G.DAT_0066bfc0 = 0xffffffff;
    if (bVar6 === 0x36) {
      FUN_0046e020(0x7d,1,0,0);
    }
    else if (bVar6 === 0x37) {
      FUN_0046e020(0x7e,1,0,0);
    }
    else if (bVar6 === 0x38) {
      FUN_0046e020(0x7f,1,0,0);
    }
    else if (bVar6 === 0x39) {
      FUN_0046e020(0x80,1,0,0);
    }
    else if (bVar6 === 0x3a) {
      FUN_0046e020(0x81,1,0,0);
    }
    else if (bVar6 === 0x3b) {
      FUN_0046e020(0x82,1,0,0);
    }
    else if (bVar6 === 0x3c) {
      FUN_0046e020(0x83,1,0,0);
    }
    else if (bVar6 === 0x3d) {
      FUN_0046e020(0x84,1,0,0);
    }
    else if (bVar6 === 0x33) {
      FUN_0046e020(0x65,1,0,0);
    }
    else if (bVar6 === 0x34) {
      FUN_0046e020(0x66,1,0,0);
    }
    else if (bVar6 === 0x35) {
      FUN_0046e020(0x67,1,0,0);
    }
    else if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) === 0) {
      if (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x01) {
        if (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] === 0x01) {
          if (u8(G.DAT_006560f6[param_1 * 0x20]) < 0x1e) {
            FUN_0046e020(0,0,0,0);
          }
          else {
            FUN_0046e020(0x52,0,0,0);
          }
        }
        else if (G.DAT_0064b1c3[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0) {
          FUN_0046e020(0x21,1,0,0);
        }
        else if (u8(G.DAT_006560f6[param_1 * 0x20]) < 0x1e) {
          FUN_0046e020(0x18,1,0,0);
        }
        else {
          FUN_0046e020(0x50,1,0,0);
        }
      }
      else if (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x02) {
        if ((G.DAT_0064b1bc[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) === 0) {
          local_ac = 6;
          if (((bVar6 === 0x28) || (bVar6 === 0x26)) || ((bVar6 === 0x27 || (bVar6 === 0x25)))) {
            local_ac = 0x2e;
          }
        }
        else {
          FUN_0046e020(0x4d,1,0,0);
        }
      }
      else if (bVar6 === 0x11) {
        FUN_0046e020(0x19,1,0,0);
      }
      else if ((((bVar6 === 0xf) || (bVar6 === 0x10)) || (bVar6 === 0x13)) || (bVar6 === 0x12)) {
        FUN_0046e020(0x4a,1,0,0);
      }
      else if ((bVar6 === 0x14) || (bVar6 === 0x15)) {
        FUN_0046e020(0xc,1,0,0);
      }
      else if (((bVar6 === 7) || (bVar6 === 0xb)) || ((bVar6 === 10 || (bVar6 === 9)))) {
        FUN_0046e020(0x22,1,0,0);
      }
      else if ((((bVar6 === 8) || (bVar6 === 0xd)) || (bVar6 === 0xc)) || (bVar6 === 0xe)) {
        FUN_0046e020(0x26,1,0,0);
      }
      else if ((bVar6 < 0x16) || (0x1a < bVar6)) {
        FUN_0046e020(0x49,1,0,0);
      }
      else if (bVar6 === 0x17) {
        FUN_0046e020(10,1,0,0);
      }
      else {
        local_ac = 0x28;
        if (0x17 < bVar6) {
          FUN_0046e020(0x1c,1,0,0);
          FUN_0046e287(0x14);
        }
      }
    }
    else if (s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) < 99) {
      FUN_0046e020(0x29,1,0,0);
    }
    G.DAT_00633e48 = local_c;
    G.DAT_00633e40 = uVar11;
    G.DAT_00633e44 = iVar10;
    if (2 < G.DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x9a,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): G.DAT_0066bfc4,G.DAT_0066bfc0,0,0,0,0,0,0);
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x70,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): param_1,iVar8,iVar9,param_2,G.DAT_00633e48,0,0,0);
        }
      }
    }
    FUN_0056c705(param_1,iVar8,iVar9,param_2,0xffffffff,0xffffffff);
    FUN_005b3ae0(param_1,iVar8,iVar9,0);
    FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
    if (2 < G.DAT_00655b02) {
      FUN_004b0b53(0xff,2,0,0,0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,iVar8,iVar9,0,0,0,0);
        }
      }
    }
  }
  if (98 < s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14])) {
    G.DAT_00633e48 = 0xffffffff;
    iVar13 = FUN_0057f9e3(uVar7,uVar11,iVar10,1);
    if (iVar13 === 0) {
      FUN_005b4391(param_1,1);
      FUN_0047cea6(iVar8,iVar9);
      if (2 < G.DAT_00655b02) {
        FUN_004b0b53(0xff,2,0,0,0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x72,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,iVar8,iVar9,0,0,0,0,0,0);
          }
        }
      }
    }
    else {
      G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] = 0;
    }
    if (((iVar13 !== 0) && ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) && (-1 < G.DAT_006acb08))
    {
      FUN_0057febc(uVar7,uVar11,iVar10);
    }
    return 0;
  }
  bVar4 = false;
  if ((local_78 === 0) && (local_34 === 0)) {
    local_c0 = 0;
  }
  else {
    if ((s8(G.DAT_0064b1c6[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14]) < 0x1e) &&
       (s8(G.DAT_0064b1c6[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) < 0x1e)) {
      local_cc = 1;
    }
    else {
      local_cc = 0;
    }
    local_2c = 10 >> local_cc;
    if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0) {
      local_2c = 0;
      bVar4 = false;
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (aiStack_58[local_18] !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_0057ed3f(uVar11,iVar10,local_ac);
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,uVar11,iVar10,local_ac,0,0,0,0,0);
          }
        }
      }
    }
    do {
      while( true ) {
        iVar15 = FUN_005b29d7(param_1);
        if ((iVar15 === 0) || (iVar15 = FUN_005b29d7(local_c), iVar15 === 0)) {
          local_c0 = FUN_005b29d7(param_1);
          LAB_00582cbe_helper(bVar1, bVar2, bVar3, bVar4, bVar5, bVar6, iVar10, iVar13, iVar15, iVar16, iVar8, iVar9, local_14, local_18, local_20, local_30, local_38, local_60, local_64, local_8, local_a0, local_ac, local_b0, local_bc, local_c, local_c0, local_e0, local_e4, param_1, uVar11, uVar12, uVar14, uVar17, uVar7); return;
        }
        if (local_a0 === 1 || local_a0 + -1 < 0) {
          local_d0 = 0;
        }
        else {
          local_d0 = _rand();
          local_d0 = local_d0 % local_a0;
        }
        if (local_64 === 1 || local_64 + -1 < 0) {
          local_d4 = 0;
        }
        else {
          local_d4 = _rand();
          local_d4 = local_d4 % local_64;
        }
        local_c0 = ((local_d4 < local_d0) >>> 0);
        if ((bVar18) && (local_c0 !== 0)) {
          if (local_a0 === 1 || local_a0 + -1 < 0) {
            local_d8 = 0;
          }
          else {
            local_d8 = _rand();
            local_d8 = local_d8 % local_a0;
          }
          if (local_64 === 1 || local_64 + -1 < 0) {
            local_dc = 0;
          }
          else {
            local_dc = _rand();
            local_dc = local_dc % local_64;
          }
          if (local_d8 < local_dc) {
            local_c0 = 0;
          }
        }
        if (local_c0 === 0) break;
        bVar6 = G.DAT_006560fa[local_c * 0x20];
        G.DAT_006560fa[local_c * 0x20] = G.DAT_006560fa[local_c * 0x20] + s8(local_78);
        if (((bVar3) && (local_2c !== 0)) &&
           (u8(G.DAT_006560fa[local_c * 0x20]) / local_2c
            !== ((bVar6) | 0) / local_2c)) {
          bVar4 = true;
          FUN_004b0b53(0xff,2,0,0,0);
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_0057ed3f(uVar11,iVar10,local_ac);
                iVar15 = FUN_005b29d7(local_c);
                if (iVar15 !== 0) {
                  FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
                }
              }
              else {
                // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                         // DEVIATION(cont): (&G.DAT_006ad30c +
                                         // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),uVar11,
                                   // DEVIATION(cont): iVar10,local_ac,0,0,0,0,0);
                iVar15 = FUN_005b29d7(local_c);
                if (iVar15 !== 0) {
                  // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                           // DEVIATION(cont): (&G.DAT_006ad30c +
                                           // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),uVar11,
                                     // DEVIATION(cont): iVar10,iVar8,iVar9,0,0,0,0);
                }
              }
            }
          }
        }
        if ((G.DAT_00655ae8 & 0x10) === 0) LAB_00582cbe_helper(bVar1, bVar2, bVar3, bVar4, bVar5, bVar6, iVar10, iVar13, iVar15, iVar16, iVar8, iVar9, local_14, local_18, local_20, local_30, local_38, local_60, local_64, local_8, local_a0, local_ac, local_b0, local_bc, local_c, local_c0, local_e0, local_e4, param_1, uVar11, uVar12, uVar14, uVar17, uVar7); return;
      }
      bVar6 = G.DAT_006560fa[param_1 * 0x20];
      G.DAT_006560fa[param_1 * 0x20] = G.DAT_006560fa[param_1 * 0x20] + s8(local_34);
      if (((bVar3) && (local_2c !== 0)) &&
         (u8(G.DAT_006560fa[param_1 * 0x20]) / local_2c !==
          ((bVar6) | 0) / local_2c)) {
        bVar4 = true;
        FUN_004b0b53(0xff,2,0,0,0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_0057ed3f(iVar8,iVar9,local_ac);
              iVar15 = FUN_005b29d7(param_1);
              if (iVar15 !== 0) {
                FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
              }
            }
            else {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),iVar8,iVar9,
                                 // DEVIATION(cont): local_ac,0,0,0,0,0);
              iVar15 = FUN_005b29d7(param_1);
              if (iVar15 !== 0) {
                // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                         // DEVIATION(cont): (&G.DAT_006ad30c +
                                         // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),uVar11,
                                   // DEVIATION(cont): iVar10,iVar8,iVar9,0,0,0,0);
              }
            }
          }
        }
      }
    } while ((G.DAT_00655ae8 & 0x10) !== 0);
  }
// LAB_00582cbe: (code below also in LAB_00582cbe_helper, kept for 1:1 audit)
  if (local_c0 === 0) {
    G.DAT_0062c5bc = 1;
  }
  if (bVar3) {
    G.DAT_0066bfc4 = -1;
    if ((((local_c0 === 0) ||
         (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] !== 0x01)) ||
        (-1 < G.DAT_006acb08)) &&
       (((local_c0 !== 0 ||
         (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x01)) ||
        ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)))) {
      if (local_ac !== 0) {
        FUN_0046e020(0x23,1,0,0);
      }
    }
    else if (local_c0 === 0) {
      if (u8(G.DAT_006560f6[param_1 * 0x20]) < 0x1e) {
        FUN_0046e020(0x17,1,0,0);
      }
      else {
        FUN_0046e020(0x4f,1,0,0);
      }
    }
    else if (u8(G.DAT_006560f6[local_c * 0x20]) < 0x1e) {
      FUN_0046e020(0x17,1,0,0);
    }
    else {
      FUN_0046e020(0x4f,1,0,0);
    }
    if ((2 < G.DAT_00655b02) && (G.DAT_0066bfc4 !== -1)) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7a,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): G.DAT_0066bfc4,G.DAT_0066bfc0,0,0,0,0,0,0);
        }
      }
    }
  }
  FUN_004b0b53(0xff,2,0,0,0);
  if (bVar3) {
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (G.DAT_006d1da0 === local_18) {
          FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
          if (local_c0 === 0) {
            if (!bVar4) {
              FUN_0057ed3f(iVar8,iVar9,0);
            }
          }
          else if (!bVar4) {
            FUN_0057ed3f(uVar11,iVar10,0);
          }
        }
        else {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,iVar8,iVar9,0,0,0,0);
          if (local_c0 === 0) {
            if (!bVar4) {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),iVar8,iVar9,0,
                                 // DEVIATION(cont): 0,0,0,0,0);
            }
          }
          else if (!bVar4) {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,uVar11,iVar10,0,0,0,0,0,0);
          }
        }
      }
    }
  }
  G.DAT_00633e48 = 0xffffffff;
  G.DAT_006acb0c = 0;
  if (local_c0 === 0) {
    G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] = G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] + 0x01;
    if (local_64 + local_a0 === 1 || local_64 + local_a0 + -1 < 0) {
      local_e4 = 0;
    }
    else {
      local_e4 = _rand();
      local_e4 = local_e4 % (local_64 + local_a0);
    }
    if ((local_e4 <= local_a0) || (iVar15 = FUN_00453e51(uVar12,7), iVar15 !== 0)) {
      FUN_0057ebfd(local_c);
    }
  }
  else {
    G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] = 0;
    if (local_64 + local_a0 === 1 || local_64 + local_a0 + -1 < 0) {
      local_e0 = 0;
    }
    else {
      local_e0 = _rand();
      local_e0 = local_e0 % (local_64 + local_a0);
    }
    if ((local_e0 <= local_64) || (iVar15 = FUN_00453e51(uVar7,7), iVar15 !== 0)) {
      FUN_0057ebfd(param_1);
    }
  }
  if (local_c0 === 0) {
    local_20 = uVar12;
    FUN_005b5bab(param_1,1);
    FUN_0057eb94(param_1,local_c,local_8,local_14);
    local_60 = uVar7;
  }
  else {
    if ((uVar12 === 0) &&
       (0x04 < s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14]))) {
      bVar5 = true;
    }
    local_20 = uVar7;
    if (((G.DAT_006acb08 < 0) && (bVar6 = FUN_005b94d5(uVar11,iVar10), (bVar6 & 0x42) !== 0x40))
       && (iVar15 = FUN_005b8d15(uVar11,iVar10), iVar15 < 0)) {
      FUN_0057eb94(local_c,param_1,local_8,local_14);
    }
    else {
      FUN_0057e9f9(local_c,param_1,local_8,local_14);
    }
    iVar15 = G.DAT_006acb08;
    local_60 = uVar12;
    if (-1 < G.DAT_006acb08) {
      w32(G.DAT_0064f344, G.DAT_006acb08 * 0x58, 
           u32(G.DAT_0064f344, G.DAT_006acb08 * 0x58) | 0x20);
      iVar16 = FUN_005b89e4(iVar8,iVar9);
      if (((iVar16 === 0) && (iVar16 = FUN_0043d20a(iVar15,8), iVar16 === 0)) &&
         ((iVar16 = FUN_00453e51(uVar12,6), iVar16 === 0 &&
          ((G.DAT_00655b08 !== 0 || ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)))))) {
        G.DAT_0064f349[iVar15 * 0x58] = G.DAT_0064f349[iVar15 * 0x58] + -1;
        if (G.DAT_0064f349[iVar15 * 0x58] === 0) {
          thunk_delete_city(iVar15,0);
          for (local_bc = 1; local_bc < 8; local_bc = local_bc + 1) {
            FUN_005b8b1a(uVar11,iVar10,local_bc);
          }
          FUN_0047cf22(uVar11,iVar10);
          iVar16 = thunk_kill_civ(uVar12,uVar7);
          if (iVar16 !== 0) {
            local_30 = 0;
            for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
              w32(local_18 * 4 + 0x6acb10, 0, 0);
            }
          }
        }
        else {
          FUN_0043cc00(iVar15,uVar7);
          iVar16 = FUN_005b8d62(uVar11,iVar10);
          if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
            uVar14 = FUN_005b8a81(uVar11,iVar10);
            FUN_00442541(uVar12,uVar14);
          }
        }
      }
      iVar16 = FUN_005b8d62(uVar11,iVar10);
      if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
        FUN_005369f3(iVar15);
      }
    }
  }
  FUN_004b0b53(0xff,2,0,0,0);
  if (bVar3) {
    if (2 < G.DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,iVar8,iVar9,0,0,0,0);
        }
      }
    }
    FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
  }
  if ((G.DAT_00654fa8 === 0) && (1 < G.DAT_006acb0c)) {
    FUN_00421da0(0,G.DAT_006acb0c);
    if (G.DAT_006d1da0 === local_60) {
      FUN_00421ea0(s_MULTIPLELOSE_006344a8);
    }
    else if (G.DAT_006d1da0 === local_20) {
      FUN_00421ea0(s_MULTIPLEWIN_006344b8);
    }
    if (((G.DAT_00655b02 < 3) || ((1 << (u8(local_60) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) ||
       (G.DAT_006d1da0 === local_60)) {
      if (((2 < G.DAT_00655b02) && ((1 << (u8(local_20) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) &&
         (G.DAT_006d1da0 !== local_20)) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x36,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_20 * 4) * 0x54),0,1
                           // DEVIATION(cont): ,0,0);
      }
    }
    else {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x35,*(undefined4 *)
                               // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_60 * 4) * 0x54),0,1,0
                         // DEVIATION(cont): ,0);
    }
  }
  if (bVar5) {
    uVar17 = (((G.DAT_00655b09) >>> 0) * 100) / 2;
    w32(G.DAT_0064c6a2, uVar7 * 0x594, s32(G.DAT_0064c6a2, uVar7 * 0x594) + uVar17);
    FUN_00421da0(0,uVar17);
    if ((G.DAT_006d1da0 === uVar7) && (G.DAT_00654fa8 === 0)) {
      FUN_004442a0(s_RANSOM_006344c4,0x3e,0);
      FUN_00569363(1);
    }
    else if ((2 < G.DAT_00655b02) && (G.DAT_00654fa8 === 0)) {
      FUN_004b0b53(0xff,2,0,0,0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((aiStack_58[local_18] !== 0) && (G.DAT_006d1da0 !== local_18)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x37,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),1
                             // DEVIATION(cont): ,0,0x3e,0);
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x78,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),0
                             // DEVIATION(cont): ,0,0,0,0,0,0,0);
        }
      }
    }
  }
  if (iVar13 !== 0) {
    FUN_0045a8e3(uVar12,uVar7);
  }
  if ((G.DAT_00654fa8 === 0) && ((local_30 !== 0 || (local_b0 !== 0)))) {
    uVar14 = FUN_00493c7d(uVar12);
    FUN_0040ff60(0,uVar14);
    uVar14 = FUN_00493c7d(uVar7);
    FUN_0040ff60(1,uVar14);
    if (G.DAT_00655b02 < 3) {
      if (local_30 === 0) {
        if (local_b0 === 1) {
          FUN_00421ea0(s_ALLYUNDERATTACK_006344d8);
          FUN_0045b0d6(uVar12,uVar7);
        }
        else {
          FUN_00421ea0(s_ALLYATTACKING_006344e8);
        }
      }
      else {
        FUN_00421ea0(s_CANCELPEACE_006344cc);
      }
    }
    else if (G.DAT_00654fa8 === 0) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (s32(local_18 * 4 + 0x6acb10, 0) !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_00421ea0(s_CANCELPEACE_006344f8);
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3a,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
          }
        }
        if ((s32(local_18 * 4 + 0x6acae8, 0) !== 0) && (G.DAT_00654fa8 === 0)) {
          if (G.DAT_006d1da0 === local_18) {
            if (s32(local_18 * 4 + 0x6acae8, 0) === 1) {
              FUN_00421ea0(s_ALLYUNDERATTACK_00634504);
              FUN_0045b0d6(uVar12,uVar7);
            }
            else {
              FUN_00421ea0(s_ALLYATTACKING_00634514);
            }
          }
          else if (s32(local_18 * 4 + 0x6acae8, 0) === 1) {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3b,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
            if ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7e,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),uVar12,uVar7,0
                                 // DEVIATION(cont): ,0,0,0,0,0);
            }
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3c,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
          }
        }
      }
    }
  }
  FUN_00436287(2);
  if (2 < G.DAT_00655b02) {
    FUN_0046b14d(0x7f,0xff,2,0,0,0,0,0,0,0);
  }
  if (local_c0 === 0) {
    local_38 = 0;
  }
  else {
    iVar13 = G.DAT_00655b00;
    if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] === 0x01) &&
       (G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] !== 0x01)) {
      FUN_005b6787(iVar13);
    }
    if ((((local_c0 === 0) || ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) ||
        (G.DAT_006acb08 < 0)) || (iVar15 = FUN_005b2e69(uVar11,iVar10), -1 < iVar15)) {
      if ((local_c0 !== 0) &&
         ((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) !== 0)) {
        FUN_005b4391(iVar13,1);
        local_38 = 0;
      }
    }
    else {
      if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) === 0) {
        if (((G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] === 0x01) &&
            (G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] !== 0)) &&
           (G.DAT_006560fd[iVar13 * 0x20] = G.DAT_006560fd[iVar13 * 0x20] + 0x01,
           s8(G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14]) <=
           s8(G.DAT_006560fd[iVar13 * 0x20]))) LAB_00583d2b_helper(iVar8, iVar9, local_18, local_38); return;
      }
      else {
        FUN_005b4391(iVar13,1);
        FUN_0047cf22(iVar8,iVar9);
      }
      FUN_0057febc(uVar7,uVar11,iVar10);
      local_38 = 0;
    }
  }
// LAB_00583d2b: (code below also in LAB_00583d2b_helper, kept for 1:1 audit)
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff,2,0,0,0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0xa3,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),0,0
                           // DEVIATION(cont): ,0,0,0,0,0,0);
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x75,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                           // DEVIATION(cont): iVar8,iVar9,0,0,0,0,0,0);
      }
    }
  }
  return local_38;
}



// ============================================================
// Function: FUN_005866a0 @ 0x005866A0
// Size: 51 bytes
// ============================================================

export function FUN_005866a0() {


  let hWnd;
  
  hWnd = FUN_00418770();
  SetFocus(hWnd);
  FUN_00586eb0();
  return;
}



// ============================================================
// Function: FUN_005866d3 @ 0x005866D3
// Size: 769 bytes
// ============================================================

// /* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

export function FUN_005866d3() {


  _DAT_006a2d80 = ((G.DAT_0064bcc8) >>> 0);
  _DAT_006a2d84 = ((G.DAT_0064bcc9) >>> 0);
  _DAT_006a2d88 = ((G.DAT_0064bcca) >>> 0);
  _DAT_006a2d8c = ((G.DAT_0064bccb) >>> 0);
  _DAT_006a2d90 = ((G.DAT_0064bccc) >>> 0);
  _DAT_006a2d94 = ((G.DAT_0064bccd) >>> 0);
  _DAT_006a2d98 = ((G.DAT_0064bcce) >>> 0);
  _DAT_006a2d9c = ((G.DAT_0064bccf) >>> 0);
  _DAT_006a2da0 = ((G.DAT_0064bcd0) >>> 0);
  _DAT_006a2da4 = ((G.DAT_0064bcd1) >>> 0);
  _DAT_006a2da8 = ((G.DAT_0064bcd2) >>> 0);
  _DAT_006a2dac = ((G.DAT_0064bcd3) >>> 0);
  _DAT_006a2db0 = ((G.DAT_0064bcd4) >>> 0);
  _DAT_006a2db4 = ((G.DAT_0064bcd5) >>> 0);
  _DAT_006a2db8 = ((G.DAT_0064bcd6) >>> 0);
  _DAT_006a2dbc = ((G.DAT_0064bcd7) >>> 0);
  _DAT_006a2dc0 = ((G.DAT_0064bcd8) >>> 0);
  _DAT_006a2dc4 = ((G.DAT_0064bcd9) >>> 0);
  _DAT_006a2dc8 = ((G.DAT_0064bcda) >>> 0);
  _DAT_006a2dcc = ((G.DAT_0064bcdb) >>> 0);
  _DAT_006a2dd0 = ((G.DAT_0064bcdc) >>> 0);
  _DAT_006a2dd4 = ((G.DAT_0064bcdd) >>> 0);
  FUN_00419d23();
  _DAT_006a2d28 = ((G.DAT_0064bcc8) >>> 0);
  _DAT_006a2d2c = ((G.DAT_0064bcc9) >>> 0);
  _DAT_006a2d30 = ((G.DAT_0064bcca) >>> 0);
  _DAT_006a2d34 = ((G.DAT_0064bccb) >>> 0);
  _DAT_006a2d38 = ((G.DAT_0064bccc) >>> 0);
  _DAT_006a2d3c = ((G.DAT_0064bccd) >>> 0);
  _DAT_006a2d40 = ((G.DAT_0064bcce) >>> 0);
  _DAT_006a2d44 = ((G.DAT_0064bccf) >>> 0);
  _DAT_006a2d48 = ((G.DAT_0064bcd0) >>> 0);
  _DAT_006a2d4c = ((G.DAT_0064bcd1) >>> 0);
  _DAT_006a2d50 = ((G.DAT_0064bcd2) >>> 0);
  _DAT_006a2d54 = ((G.DAT_0064bcd3) >>> 0);
  _DAT_006a2d58 = ((G.DAT_0064bcd4) >>> 0);
  _DAT_006a2d5c = ((G.DAT_0064bcd5) >>> 0);
  _DAT_006a2d60 = ((G.DAT_0064bcd6) >>> 0);
  _DAT_006a2d64 = ((G.DAT_0064bcd7) >>> 0);
  _DAT_006a2d68 = ((G.DAT_0064bcd8) >>> 0);
  _DAT_006a2d6c = ((G.DAT_0064bcd9) >>> 0);
  _DAT_006a2d70 = ((G.DAT_0064bcda) >>> 0);
  _DAT_006a2d74 = ((G.DAT_0064bcdb) >>> 0);
  _DAT_006a2d78 = ((G.DAT_0064bcdc) >>> 0);
  _DAT_006a2d7c = ((G.DAT_0064bcdd) >>> 0);
  G.DAT_0064bcc8 = G.DAT_006a2d80;
  G.DAT_0064bcc9 = G.DAT_006a2d84;
  G.DAT_0064bcca = G.DAT_006a2d88;
  G.DAT_0064bccb = G.DAT_006a2d8c;
  G.DAT_0064bccc = G.DAT_006a2d90;
  G.DAT_0064bccd = G.DAT_006a2d94;
  G.DAT_0064bcce = G.DAT_006a2d98;
  G.DAT_0064bccf = G.DAT_006a2d9c;
  G.DAT_0064bcd0 = G.DAT_006a2da0;
  G.DAT_0064bcd1 = G.DAT_006a2da4;
  G.DAT_0064bcd2 = G.DAT_006a2da8;
  G.DAT_0064bcd3 = G.DAT_006a2dac;
  G.DAT_0064bcd4 = G.DAT_006a2db0;
  G.DAT_0064bcd5 = G.DAT_006a2db4;
  G.DAT_0064bcd6 = G.DAT_006a2db8;
  G.DAT_0064bcd7 = G.DAT_006a2dbc;
  G.DAT_0064bcd8 = G.DAT_006a2dc0;
  G.DAT_0064bcd9 = G.DAT_006a2dc4;
  G.DAT_0064bcda = G.DAT_006a2dc8;
  G.DAT_0064bcdb = G.DAT_006a2dcc;
  G.DAT_0064bcdc = G.DAT_006a2dd0;
  G.DAT_0064bcdd = G.DAT_006a2dd4;
  return;
}



// ============================================================
// Function: FUN_005869d4 @ 0x005869D4
// Size: 482 bytes
// ============================================================

export function FUN_005869d4() {


  let _Str;
  let sVar1;
  let local_a8;
  let local_a4 = new Array(128).fill(0);
  let local_24 = new Array(32).fill(0);
  
  local_a8 = 0;
  FUN_00419060();
  FUN_004a2379(s_DEBUG_006359dc,s_EDITCOSMIC_00634640);
  while( true ) {
    _Str = FUN_004a23fc(1);
    sVar1 = _strlen(_Str);
    if ((sVar1 < 3) || (0x15 < local_a8)) break;
    if (s32(G.DAT_006a2d80, local_a8 * 4) < 10) {
      _sprintf(local_a4,s__d_0063464c,s32(G.DAT_006a2d80, local_a8 * 4));
    }
    else if (s32(G.DAT_006a2d80, local_a8 * 4) < 100) {
      _sprintf(local_a4,s__d_00634654,s32(G.DAT_006a2d80, local_a8 * 4));
    }
    else {
      _sprintf(local_a4,G.DAT_0063465c,s32(G.DAT_006a2d80, local_a8 * 4));
    }
    if (s32(G.DAT_006a2d28, local_a8 * 4) < 10) {
      _sprintf(local_24,s___d____00634660,s32(G.DAT_006a2d28, local_a8 * 4));
    }
    else if (s32(G.DAT_006a2d28, local_a8 * 4) < 100) {
      _sprintf(local_24,s___d____00634670,s32(G.DAT_006a2d28, local_a8 * 4));
    }
    else {
      _sprintf(local_24,s___d____0063467c,s32(G.DAT_006a2d28, local_a8 * 4));
    }
    FUN_005f22e0(local_a4,local_24);
    FUN_005f22e0(local_a4,G.DAT_00679640);
    FUN_00419020(local_a4);
    local_a8 = local_a8 + 1;
  }
  FUN_004a2020();
  return;
}



// ============================================================
// Function: FUN_00586bb6 @ 0x00586BB6
// Size: 340 bytes
// ============================================================

export function FUN_00586bb6() {


  let iVar1;
  let pcVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let pcVar6;
  let local_120;
  let local_118 = new Array(260).fill(0);
  let local_14 = new Array(16).fill(0);
  
  iVar1 = FUN_00551d50();
  if (G.DAT_006a4f88 === 0) {
    local_120 = 0;
  }
  else {
    local_120 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_120);
  FUN_00421da0(0,s32(G.DAT_00634590, iVar1 * 4));
  FUN_00421da0(1,s32(G.DAT_006345e8, iVar1 * 4));
  pcVar6 = local_118;
  pcVar2 = __itoa(s32(G.DAT_006a2d28, iVar1 * 4),local_14,10);
  iVar3 = FUN_0051d63b(s_DEBUG_006359dc,s_CPEDIT_00634688,3,pcVar2,pcVar6);
  if (-1 < iVar3) {
    uVar4 = s32(G.DAT_006345e8, iVar1 * 4);
    uVar5 = s32(G.DAT_00634590, iVar1 * 4);
    iVar3 = _atoi(local_118);
    uVar4 = FUN_005adfa0(iVar3,uVar5,uVar4);
    w32(G.DAT_006a2d28, iVar1 * 4, uVar4);
    FUN_005869d4();
    FUN_00551d80(iVar1);
  }
  FUN_004bb5e0();
  FUN_0059d3c9(0);
  FUN_005866a0();
  return;
}



// ============================================================
// Function: FUN_00586d0a @ 0x00586D0A
// Size: 151 bytes
// ============================================================

export function FUN_00586d0a(param_1, param_2) {


  let pcVar1;
  let local_88;
  let local_84 = new Array(128).fill(0);
  
  for (local_88 = 0; local_88 < 0x16; local_88 = local_88 + 1) {
    _fgets(local_84,0x80,param_2);
    pcVar1 = _strchr(local_84,0x3b);
    _sprintf(G.DAT_00679640,s___8d_s_00634690,s32(G.DAT_006a2d28, local_88 * 4),pcVar1);
    _fputs(G.DAT_00679640,param_1);
  }
  return 1;
}



// ============================================================
// Function: show_messagebox_6DA1 @ 0x00586DA1
// Size: 131 bytes
// ============================================================

export function show_messagebox_6DA1_00586DA1() {


  let iVar1;
  let lpText;
  let lpCaption;
  let uType;
  let local_24 = new Array(32).fill(0);
  
  FUN_004ccab9(s_COSMIC_00634698,0 /* ADDR:LAB_0040172b */);
  iVar1 = thunk_show_messagebox_CF2D();
  if (iVar1 === 0) {
    _sprintf(local_24,s_Error_updating_RULES__s_006346a0,G.DAT_0062cd24);
    uType = 0x10;
    lpCaption = s_File_I_O_Error_006346b8;
    lpText = local_24;
    iVar1 = FUN_00414d10();
    MessageBoxA(s32(iVar1, 4),lpText,lpCaption,uType);
  }
  G.DAT_006a1d7c = 0;
  // DEVIATION: MFC — CRichEditDoc::InvalidateObjectCache((G.DAT_006a4f88 + 0x48));
  return;
}



// ============================================================
// Function: FUN_00586e24 @ 0x00586E24
// Size: 100 bytes
// ============================================================

export function FUN_00586e24() {


  let local_8;
  
  if (G.DAT_006a4f88 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(G.DAT_006346d0,s_EFFECTS_006346c8);
  FUN_0059d3c9(0);
  FUN_005866a0();
  return;
}



// ============================================================
// Function: FUN_00586e88 @ 0x00586E88
// Size: 40 bytes
// ============================================================

export function FUN_00586e88() {


  G.DAT_006a1d7c = 0;
  // DEVIATION: MFC — CRichEditDoc::InvalidateObjectCache((G.DAT_006a4f88 + 0x48));
  return;
}



// ============================================================
// Function: FUN_00586eb0 @ 0x00586EB0
// Size: 102 bytes
// ============================================================

export function FUN_00586eb0(in_ECX) {


  // in_ECX → promoted to parameter
  
  FUN_00552112();
  FUN_0040fdb0(in_ECX,in_ECX + 700,0x1a);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(G.DAT_006a4f90);
  FUN_005baee0(0x29,0x12,1,1);
  FUN_00408460();
  return;
}



// ============================================================
// Function: FUN_00586f16 @ 0x00586F16
// Size: 1731 bytes
// ============================================================

export function FUN_00586f16(in_ECX) {


  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
  let iVar5;
  // in_ECX → promoted to parameter
  // DEVIATION: SEH
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_464;
  let local_454 = new Array(1092).fill(0);
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_005c64da();
  local_8 = 0;
  G.DAT_006a1d7c = 1;
  G.DAT_006a4f88 = in_ECX;
  pvVar2 = operator_new(0x48);
  local_8._0_1_ = 1;
  if (pvVar2 === 0x0) {
    local_464 = 0;
  }
  else {
    local_464 = FUN_005bd630();
  }
  local_8 = ((local_8) >>> 0)._1_3_ << 8;
  G.DAT_0062e018 = local_464;
  FUN_00417ef0(0,G.DAT_0062e01c);
  FUN_005d268e(G.DAT_006a4f90);
  FUN_005d25a8(G.DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12,1,1);
  FUN_005d2590(0x25);
  w32(in_ECX, 0x2d8, 0x230);
  w32(in_ECX, 0x2dc, 0x1c6);
  w32(in_ECX, 0x2ec, 0);
  G.DAT_006a1d80 = 0xc9;
  uVar3 = FUN_0040ef70();
  w32(in_ECX, 0x2e8, uVar3);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar3 = s32(in_ECX, 0x2dc);
  uVar9 = s32(in_ECX, 0x2d8);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar4 = FUN_00428b0c(s32(G.DAT_00628420, 0x94c),0xd,0,0,uVar9,uVar3,0,0,0);
  FUN_005534bc(uVar4,uVar6,uVar7,uVar8,uVar9,uVar3,uVar10,uVar11,uVar12);
  FUN_004086c0(local_454,s32(in_ECX, 0x124) + 2,s32(in_ECX, 0x128) + 2,
                     s32(in_ECX, 300) + -5,s32(in_ECX, 0x130) + -0x14);
  iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  if (in_ECX === 0x0) {
    local_474 = 0x0;
  }
  else {
    local_474 = in_ECX + 0x48;
  }
  FUN_00418f40(local_474,iVar1,local_454);
  FUN_00418fe0(G.DAT_006a4f90);
  FUN_00551dc0(0 /* ADDR:LAB_004038a5 */);
  FUN_005866d3();
  FUN_005869d4();
  FUN_00551d80(0);
  // DEVIATION: MFC — _Timevec::~_Timevec(PTR_DAT_006359f0);
  w32(in_ECX, 0x2e4, extraout_EAX + 8);
  w32(in_ECX, 0x2e0, 
       s32(in_ECX, 300) + -10 + (s32(in_ECX, 300) + -10 >> 0x1f & 3) >> 2);
  iVar5 = (s32(in_ECX, 0x128) + s32(in_ECX, 0x130)) - (s32(in_ECX, 0x2e4) + 2);
  iVar1 = s32(in_ECX, 0x124);
  FUN_004086c0(local_454,iVar1 + 2,iVar5,s32(in_ECX, 0x2e0),
                     s32(in_ECX, 0x2e4));
  if (in_ECX === 0x0) {
    local_478 = 0x0;
  }
  else {
    local_478 = in_ECX + 0x48;
  }
  uVar3 = FUN_00428b0c(s32(G.DAT_00628420, 0x3f8));
  FUN_0040f680(local_478,0x65,local_454,uVar3);
  FUN_0040f880(0 /* ADDR:LAB_0040342c */);
  iVar1 = iVar1 + 2 + s32(in_ECX, 0x2e0) + 2;
  FUN_004086c0(local_454,iVar1,iVar5,s32(in_ECX, 0x2e0),
                     s32(in_ECX, 0x2e4));
  if (in_ECX === 0x0) {
    local_47c = 0x0;
  }
  else {
    local_47c = in_ECX + 0x48;
  }
  uVar3 = FUN_00428b0c(s32(G.DAT_00628420, 0x8e0));
  FUN_0040f680(local_47c,0x66,local_454,uVar3);
  FUN_0040f880(0 /* ADDR:LAB_004038a5 */);
  FUN_0040f7d0();
  iVar1 = iVar1 + s32(in_ECX, 0x2e0) + 2;
  FUN_004086c0(local_454,iVar1,iVar5,s32(in_ECX, 0x2e0),
                     s32(in_ECX, 0x2e4));
  if (in_ECX === 0x0) {
    local_480 = 0x0;
  }
  else {
    local_480 = in_ECX + 0x48;
  }
  uVar3 = FUN_00428b0c(s32(G.DAT_00628420, 0x8ec));
  FUN_0040f680(local_480,0x66,local_454,uVar3);
  FUN_0040f880(0 /* ADDR:LAB_004010f5 */);
  FUN_004086c0(local_454,iVar1 + s32(in_ECX, 0x2e0) + 2,iVar5,
                     s32(in_ECX, 0x2e0),s32(in_ECX, 0x2e4));
  if (in_ECX === 0x0) {
    local_484 = 0x0;
  }
  else {
    local_484 = in_ECX + 0x48;
  }
  uVar3 = FUN_00428b0c(s32(G.DAT_00628420, 0x3fc));
  FUN_0040f680(local_484,0x66,local_454,uVar3);
  FUN_0040f880(0 /* ADDR:LAB_00402fae */);
  FUN_0040f840();
  FUN_0040f350(0);
  // DEVIATION: MFC — CPropertySheet::EnableStackedTabs(in_ECX,0x401c0d);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while (G.DAT_006a1d7c !== 0) {
    FUN_0040ef50();
  }
  if (G.DAT_0062e018 !== 0) {
    FUN_0040f010(1);
  }
  G.DAT_0062e018 = 0;
  // DEVIATION: SEH
  FUN_005875e9();
  FUN_005875ff();
  return;
}



// ============================================================
// Function: FUN_005875e9 @ 0x005875E9
// Size: 12 bytes
// ============================================================

export function FUN_005875e9() {


  FUN_005c656b();
  return;
}



// ============================================================
// Function: FUN_005875ff @ 0x005875FF
// Size: 14 bytes
// ============================================================

export function FUN_005875ff(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058760d @ 0x0058760D
// Size: 89 bytes
// ============================================================

export function FUN_0058760d() {


  // DEVIATION: SEH
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_00417fa0();
  local_8 = 0;
  FUN_00586f16();
  FUN_005bb574();
  // DEVIATION: SEH
  FUN_00587666();
  FUN_0058767c();
  return;
}



// ============================================================
// Function: FUN_00587666 @ 0x00587666
// Size: 12 bytes
// ============================================================

export function FUN_00587666() {


  FUN_004183d0();
  return;
}



// ============================================================
// Function: FUN_0058767c @ 0x0058767C
// Size: 14 bytes
// ============================================================

export function FUN_0058767c(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_00587a90 @ 0x00587A90
// Size: 849 bytes
// ============================================================

export function FUN_00587a90(in_ECX, param_1, param_2, param_3) {


  let piVar1;
  let iVar2;
  let pvVar3;
  // in_ECX → promoted to parameter
  let iVar4;
  // DEVIATION: SEH
  let local_38;
  let local_34;
  let local_30;
  let local_28;
  let local_20 = [0];
  let local_1c;
  let local_18;
  let local_14;
  let local_10 = [0];
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  local_20[0] = s32(param_1, 0);
  local_1c = param_1[1];
  local_18 = param_1[2];
  local_14 = param_1[3];
  w32(G.DAT_006acb58, param_2 * 4, param_3);
  FUN_00588f36(param_2,0);
  if (s32(in_ECX, 1000 + param_2 * 4) < 1) {
    w32(in_ECX, 0x10410 + param_2 * 4, 0xffffffff);
  }
  else {
    w32(in_ECX, 0x10410 + param_2 * 4, 0);
  }
  w32(in_ECX, 0x3e0 + param_2 * 4, 4);
  iVar4 = param_2 * 0x10 + in_ECX;
  w32(iVar4, 0x3c0, s32(param_1, 0));
  w32(iVar4, 0x3c4, param_1[1]);
  w32(iVar4, 0x3c8, param_1[2]);
  w32(iVar4, 0x3cc, param_1[3]);
  if (s32(in_ECX, 0x10420 + param_2 * 4) < s32(in_ECX, 1000 + param_2 * 4)) {
    iVar2 = GetSystemMetrics(2);
    iVar4 = local_18;
    piVar1 = (param_2 * 0x10 + 0x3c8 + in_ECX);
    w32(piVar1, 0, s32(piVar1, 0) - iVar2);
    local_20[0] = GetSystemMetrics(2);
    local_20[0] = iVar4 - local_20[0];
    pvVar3 = operator_new(0x40);
    local_8 = 0;
    if (pvVar3 === 0x0) {
      local_28 = 0;
    }
    else {
      local_28 = FUN_0040fb00();
    }
    // DEVIATION: SEH
    w32(in_ECX, 0x37c + param_2 * 4, local_28);
    if (in_ECX === 0) {
      local_34 = 0;
    }
    else {
      local_34 = in_ECX + 0x48;
    }
    FUN_0040fc50(local_34,param_2 + 0x420,local_20[0],1);
    FUN_0040fd40(0,s32(in_ECX, 1000 + param_2 * 4) -
                         s32(in_ECX, 0x10420 + param_2 * 4));
    FUN_0040fcf0(0);
    FUN_005db0d0(s32(in_ECX, 0x10420 + param_2 * 4));
    FUN_0040fd80(0 /* ADDR:LAB_0040166d */ + ((param_2 === 0) - 1 & 0xfb9));
    FUN_00451ac0(0 /* ADDR:LAB_0040166d */ + ((param_2 === 0) - 1 & 0xfb9));
  }
  pvVar3 = operator_new(0x40);
  local_8 = 1;
  if (pvVar3 === 0x0) {
    local_30 = 0;
  }
  else {
    local_30 = FUN_00451930();
  }
  // DEVIATION: SEH
  w32(in_ECX, 900 + param_2 * 4, local_30);
  if (in_ECX === 0) {
    local_38 = 0;
  }
  else {
    local_38 = in_ECX + 0x48;
  }
  FUN_004519b0(local_38,param_2 + 0x422,param_2 * 0x10 + in_ECX + 0x3c0);
  FUN_00451a60(0 /* ADDR:LAB_00402234 */);
  // DEVIATION: MFC — CDialog::SetHelpID(s32(CDialog **, 0)(in_ECX + 900 + param_2 * 4),0x402234);
  FUN_0058878e(param_2);
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_00587e05 @ 0x00587E05
// Size: 30 bytes
// ============================================================

export function FUN_00587e05(param_1) {


  FUN_0058804f(0,param_1);
  return;
}



// ============================================================
// Function: FUN_00587e23 @ 0x00587E23
// Size: 30 bytes
// ============================================================

export function FUN_00587e23(param_1) {


  FUN_0058804f(1,param_1);
  return;
}



// ============================================================
// Function: FUN_00587e41 @ 0x00587E41
// Size: 191 bytes
// ============================================================

export function FUN_00587e41() {


  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined1 *)(local_8 + 0x3be) = 1;
  // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0xa5,*(undefined4 *)
                           // DEVIATION(cont): (&G.DAT_006ad30c +
                           // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + *(int *)(local_8 + 0x118) * 4) * 0x54),
                     // DEVIATION(cont): G.DAT_006d1da0,(int)*(char *)(local_8 + 0x3be),0,0,0,0,0,0);
  FUN_0058878e(0);
  return;
}



// ============================================================
// Function: FUN_00587f00 @ 0x00587F00
// Size: 191 bytes
// ============================================================

export function FUN_00587f00() {


  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined1 *)(local_8 + 0x3be) = 0;
  // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0xa6,*(undefined4 *)
                           // DEVIATION(cont): (&G.DAT_006ad30c +
                           // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + *(int *)(local_8 + 0x118) * 4) * 0x54),
                     // DEVIATION(cont): G.DAT_006d1da0,(int)*(char *)(local_8 + 0x3be),0,0,0,0,0,0);
  FUN_0058878e(0);
  return;
}



// ============================================================
// Function: FUN_00587fbf @ 0x00587FBF
// Size: 144 bytes
// ============================================================

export function FUN_00587fbf() {


  let uVar1;
  
  FUN_005c62ee();
  FUN_004518d0();
  uVar1 = FUN_00493c7d(G.DAT_006d1da0);
  FUN_0040ff60(0,uVar1);
  // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x65,*(undefined4 *)
                           // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + G.DAT_0067a8c0 * 4) * 0x54),1,0,
                     // DEVIATION(cont): G.DAT_006d1da0,0);
  return;
}



// ============================================================
// Function: FUN_0058804f @ 0x0058804F
// Size: 97 bytes
// ============================================================

export function FUN_0058804f(param_1, param_2) {


  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  FUN_004518d0();
  w32(local_8, 0x10410 + param_1 * 4, param_2);
  FUN_0058878e(param_1);
  return;
}



// ============================================================
// Function: FUN_005880b0 @ 0x005880B0
// Size: 637 bytes
// ============================================================

export function FUN_005880b0(param_1) {


  let puVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_14 = [0];
  let local_10 = [0];
  let local_c;
  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  FUN_004518d0();
  local_c = param_1 + -0x422;
  FUN_00451890(local_10[0],local_14[0]);
  if (((s32(local_8, 1000 + local_c * 4) !== 0) &&
      (iVar2 = FUN_0058832d(local_10[0],local_14[0],local_c), 0 < iVar2)) &&
     (iVar2 < s32(local_8, 1000 + local_c * 4))) {
    iVar3 = FUN_005dba95();
    if (iVar3 === 0) {
      iVar3 = FUN_005dbab8();
      if (iVar3 === 0) {
        for (local_18 = 0; local_18 < s32(local_8, 1000 + local_c * 4);
            local_18 = local_18 + 1) {
          if (local_18 !== iVar2) {
            w32(local_c * 0x2004 + local_18 * 4 + 0x8400 + local_8, 0, 0);
          }
        }
        w32(local_8, 0x10418 + local_c * 4, iVar2);
        puVar1 = (local_c * 0x2004 + iVar2 * 4 + 0x8400 + local_8);
        w32(puVar1, 0, s32(puVar1, 0) ^ 1);
      }
      else {
        w32(local_8, 0x10418 + local_c * 4, iVar2);
        puVar1 = (local_c * 0x2004 + iVar2 * 4 + 0x8400 + local_8);
        w32(puVar1, 0, s32(puVar1, 0) ^ 1);
      }
    }
    else {
      for (local_18 = 0; local_18 < s32(local_8, 1000 + local_c * 4); local_18 = local_18 + 1)
      {
        w32(local_c * 0x2004 + local_18 * 4 + 0x8400 + local_8, 0, 0);
      }
      if (s32(local_8, 0x10418 + local_c * 4) < iVar2) {
        local_18 = s32(local_8, 0x10418 + local_c * 4);
        local_1c = iVar2;
      }
      else {
        local_1c = s32(local_8, 0x10418 + local_c * 4);
        local_18 = iVar2;
      }
      for (; local_18 <= local_1c; local_18 = local_18 + 1) {
        if (0 < local_18) {
          w32(local_c * 0x2004 + local_18 * 4 + 0x8400 + local_8, 0, 1);
        }
      }
    }
    FUN_0058878e(local_c);
  }
  return;
}



// ============================================================
// Function: FUN_0058832d @ 0x0058832D
// Size: 274 bytes
// ============================================================

export function FUN_0058832d(param_1, param_2, param_3) {


  let iVar1;
  let iVar2;
  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  if (param_2 < s32(param_3 * 0x10 + 0x3c4 + local_8, 0)) {
    iVar1 = -1;
  }
  else if (param_2 < s32(param_3 * 0x10 + 0x3cc + local_8, 0)) {
    if (param_1 < s32(param_3 * 0x10 + 0x3c0 + local_8, 0)) {
      iVar1 = -3;
    }
    else if (param_1 < s32(param_3 * 0x10 + 0x3c8 + local_8, 0)) {
      iVar1 = s32(param_3 * 0x10 + 0x3c4 + local_8, 0);
      iVar2 = FUN_00407fc0(param_3 * 0x10 + local_8 + 0x3c0);
      iVar1 = (param_2 - iVar1) / (iVar2 / s32(local_8, 0x10420 + param_3 * 4)) +
              s32(local_8, 0x10410 + param_3 * 4);
    }
    else {
      iVar1 = -4;
    }
  }
  else {
    iVar1 = -2;
  }
  return iVar1;
}



// ============================================================
// Function: FUN_0058843f @ 0x0058843F
// Size: 847 bytes
// ============================================================

export function FUN_0058843f(param_1, param_2, param_3) {


  let uVar1;
  let iVar2;
  let local_14;
  let local_10;
  let local_8;
  
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  if (1 < s32(local_8, 1000 + param_3 * 4)) {
    for (local_10 = param_1; local_14 = local_10, local_10 < param_2; local_10 = local_10 + 1) {
      while (local_14 = local_14 + 1, local_14 <= param_2) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — iVar2 = FUN_0043d20a(*(undefined4 *)
                                    // DEVIATION(cont): (local_14 * 4 + param_3 * 0x2004 + 0x3f0 + local_8),1);
        if ((iVar2 !== 0) ||
           // DEVIATION(C-syntax): true))) // DEVIATION: C pointer — ((iVar2 = FUN_0043d20a(*(undefined4 *)
                                         // DEVIATION(cont): (local_10 * 4 + param_3 * 0x2004 + 0x3f0 + local_8),1),
            // DEVIATION(cont): iVar2 == 0 &&
            // DEVIATION(cont): (iVar2 = _strcmp(&G.DAT_0064f360 +
                             // DEVIATION(cont): *(int *)(local_10 * 4 + param_3 * 0x2004 + 0x3f0 + local_8) * 0x58,
                             // DEVIATION(cont): &G.DAT_0064f360 +
                             // DEVIATION(cont): *(int *)(local_14 * 4 + param_3 * 0x2004 + 0x3f0 + local_8) * 0x58),
            // DEVIATION(cont): 0 < iVar2)))) {
          // DEVIATION(cont): uVar1 = *(undefined4 *)(local_10 * 4 + param_3 * 0x2004 + 0x3f0 + local_8);
          w32(local_10 * 4 + param_3 * 0x2004 + 0x3f0 + local_8, 0, 
               s32(local_14 * 4 + param_3 * 0x2004 + 0x3f0 + local_8, 0));
          w32(local_14 * 4 + param_3 * 0x2004 + 0x3f0 + local_8, 0, uVar1);
          uVar1 = s32(local_10 * 4 + param_3 * 0x2004 + 0x8400 + local_8, 0);
          w32(local_10 * 4 + param_3 * 0x2004 + 0x8400 + local_8, 0, 
               s32(local_14 * 4 + param_3 * 0x2004 + 0x8400 + local_8, 0));
          w32(local_14 * 4 + param_3 * 0x2004 + 0x8400 + local_8, 0, uVar1);
          uVar1 = s32(local_10 * 4 + param_3 * 0x2004 + 0xc408 + local_8, 0);
          w32(local_10 * 4 + param_3 * 0x2004 + 0xc408 + local_8, 0, 
               s32(local_14 * 4 + param_3 * 0x2004 + 0xc408 + local_8, 0));
          w32(local_14 * 4 + param_3 * 0x2004 + 0xc408 + local_8, 0, uVar1);
          uVar1 = s32(local_10 * 4 + param_3 * 0x2004 + 0x43f8 + local_8, 0);
          w32(local_10 * 4 + param_3 * 0x2004 + 0x43f8 + local_8, 0, 
               s32(local_14 * 4 + param_3 * 0x2004 + 0x43f8 + local_8, 0));
          w32(local_14 * 4 + param_3 * 0x2004 + 0x43f8 + local_8, 0, uVar1);
        }
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058878e @ 0x0058878E
// Size: 1721 bytes
// ============================================================

export function FUN_0058878e(param_1) {


  let xLeft;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let local_64;
  let local_58;
  let local_54;
  let local_44;
  let local_3c;
  let local_38;
  let local_30 = [0];
  let local_20;
  let local_1c;
  let local_18 = new Array(16).fill(0);
  let local_8;
  
  local_38 = FUN_005c62ee();
  if (local_38 === 0) {
    local_38 = 0;
  }
  else {
    local_38 = local_38 + -0x48;
  }
  FUN_005c00ce(local_18);
  FUN_005c0073(param_1 * 0x10 + local_38 + 0x3c0);
// LAB_005887e1: (code below also in LAB_005887e1_helper, kept for 1:1 audit)
  FUN_005c0333(param_1 * 0x10 + local_38 + 0x3c0,G.DAT_00635a18);
  if (s32(local_38, 0x154) === 0) {
    local_8 = G.DAT_0067a7a0;
  }
  else {
    local_8 = G.DAT_0067a798;
  }
  xLeft = s32(param_1 * 0x10 + 0x3c0 + local_38, 0);
  iVar1 = FUN_00407f90(param_1 * 0x10 + local_38 + 0x3c0);
  local_20 = FUN_00407fc0(param_1 * 0x10 + local_38 + 0x3c0);
  local_20 = local_20 / s32(local_38, 0x10420 + param_1 * 4);
  iVar2 = local_20 / 2;
  iVar3 = FUN_0040ef70();
  iVar2 = iVar2 - iVar3 / 2;
  w32(local_38, 0x1e4 + param_1 * 4, 0);
  for (local_54 = 0; local_54 < s32(local_38, 1000 + param_1 * 4); local_54 = local_54 + 1) {
    if (s32(param_1 * 0x2004 + local_54 * 4 + 0x8400 + local_38, 0) !== 0) {
      w32(local_38, 0x1e4 + param_1 * 4, 1);
      break;
    }
  }
  local_54 = 0;
  do {
    if (s32(local_38, 0x10420 + param_1 * 4) <= local_54) {
// LAB_00588e17: (code below also in LAB_00588e17_helper, kept for 1:1 audit)
      FUN_005c0073(local_18);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    iVar3 = s32(param_1 * 0x10 + 0x3c4 + local_38, 0) + local_54 * local_20;
    SetRect(local_30[0],xLeft,iVar3,iVar1 + xLeft,iVar3 + local_20);
    if ((local_54 !== 0) && (s32(local_38, 0x10410 + param_1 * 4) === -1)) LAB_00588e17_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
    if (s32(local_38, 0x10410 + param_1 * 4) + local_54 <
        s32(local_38, 1000 + param_1 * 4)) {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — iVar6 = *(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0x8400 +
                      // DEVIATION(cont): local_38);
      if (iVar6 === 0) {
        if (s32(local_38, 0x10410 + param_1 * 4) + local_54 === 0) {
          local_3c = ((G.DAT_00635a00) >>> 0);
          local_44 = G.DAT_00635a2c;
        }
        else {
          local_3c = G.DAT_00635a1c;
          local_44 = G.DAT_00635a20;
        }
      }
      else {
        local_3c = G.DAT_00635a28;
        local_44 = G.DAT_00635a2c;
      }
      local_58 = 0;
      if ((0 < s32(local_38, 1000 + param_1 * 4)) &&
         // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — (local_58 = FUN_0052ed95(*(undefined4 *)
                                         // DEVIATION(cont): (param_1 * 0x2004 +
                                          // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) *
                                          // DEVIATION(cont): 4 + 0x43f8 + local_38)), local_58 == -1)) break;
      iVar4 = (-((s32(local_38, 0x154) === 0) >>> 0) & 0xffffffe2) + 0x5a + G.DAT_0062d858;
      local_30[0].left = local_30[0].left + iVar4 + -3;
      if (iVar6 === 0) {
        local_64 = G.DAT_00635a18;
      }
      else {
        local_64 = G.DAT_00635a24;
      }
      FUN_005c0333(local_30[0],local_64);
      if (param_1 === 0) {
        // DEVIATION(C-syntax): true // DEVIATION: C pointer — if (*(char *)(local_38 + 0x3be) === 0) {
          // DEVIATION(cont): local_1c = 3;
        }
        else {
          local_1c = 0;
        }
      }
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — else if (*(char *)(local_38 + 0x3bf) === 0) {
        // DEVIATION(cont): local_1c = 3;
      }
      else {
        local_1c = 0;
      }
      if (G.DAT_0067a994 === 10) {
        local_1c = 0;
      }
      if (s32(local_38, 0x10410 + param_1 * 4) === -1) {
        FUN_0040bbb0();
        uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb78));
        FUN_0040bbe0(uVar5);
        w32(local_38, 0x1e4 + param_1 * 4, 0);
      }
      else {
        uVar5 = FUN_0040ef70(local_1c);
        FUN_00588e47(local_58,s32(local_38, 0x10410 + param_1 * 4) + local_54,xLeft + 2,
                           iVar3,uVar5);
        FUN_0040bbb0();
        FUN_0040bbe0(G.DAT_0064f360 + local_58 * 0x58);
        FUN_0040fe10();
        iVar6 = FUN_0043d20a(local_58,1);
        if ((iVar6 === 0) && (local_1c === 0)) {
          FUN_0040fea0();
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0040ff30(*(undefined4 *)
                              // DEVIATION(cont): (param_1 * 0x2004 +
                               // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408
                              // DEVIATION(cont): + local_38));
          FUN_0040fe10();
          // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — if (*(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408 +
                      // DEVIATION(cont): local_38) < 2) {
            // DEVIATION(cont): uVar5 = thunk_FUN_00428b0c(*(undefined4 *)(G.DAT_00628420 + 0xb70));
            FUN_0040bbe0(uVar5);
          }
          else {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb6c));
            FUN_0040bbe0(uVar5);
          }
        }
        else {
          iVar6 = FUN_0043d20a(local_58,1);
          if (iVar6 !== 0) {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb74));
            FUN_0040bbe0(uVar5);
          }
        }
      }
      if (local_44 !== local_3c) {
        FUN_005c19ad(local_44);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 2,iVar3 + iVar2 + 1,5);
        FUN_005c19ad(local_3c);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 1,iVar3 + iVar2,5);
      }
      FUN_005c19ad(local_3c);
      FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4,iVar3 + iVar2,5);
    }
    local_54 = local_54 + 1;
  } while( true );
  FUN_00588f36(param_1,1);
  if (s32(local_38, 1000 + param_1 * 4) === 0) {
    w32(local_38, 0x10410 + param_1 * 4, 0xffffffff);
  }
  else if (s32(local_38, 1000 + param_1 * 4) < s32(local_38, 1000 + param_1 * 4)) {
    w32(local_38, 0x10410 + param_1 * 4, s32(local_38, 1000 + param_1 * 4) + -1);
  }
  LAB_005887e1_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
}



// ============================================================
// Function: FUN_00588e47 @ 0x00588E47
// Size: 239 bytes
// ============================================================

export function FUN_00588e47(param_1, param_2, param_3, param_4, param_5, param_6) {



  let iVar1;
  let local_20;
  let local_18;
  let local_10;
  let local_c;
  
  local_c = FUN_005c62ee();
  if (local_c === 0) {
    local_c = 0;
  }
  else {
    local_c = local_c + -0x48;
  }
  if (s32(local_c, 0x154) === 0) {
    local_20 = 0xfffffffc;
  }
  else {
    local_20 = 0xfffffffe;
  }
  local_18 = param_3;
  if (s32(local_c, 0x154) === 0) {
    local_10 = 0x18;
  }
  else {
    local_10 = 0x24;
  }
  if ((param_2 & 1) !== 0) {
    local_18 = param_3 + local_10 + 2;
  }
  iVar1 = FUN_00472cf0(0x30,local_20);
  FUN_0056d289(G.DAT_0067a7a8,param_1,param_6,local_18,param_4 - (iVar1 - param_5) / 2,local_20
                    );
  return;
}



// ============================================================
// Function: FUN_00588f36 @ 0x00588F36
// Size: 1138 bytes
// ============================================================

export function FUN_00588f36(in_ECX, param_1, param_2) {


  let piVar1;
  // in_ECX → promoted to parameter
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;
  
  local_c = 0x0;
  local_8 = FUN_005c62ee();
  if (local_8 === 0) {
    local_8 = 0;
  }
  else {
    local_8 = local_8 + -0x48;
  }
  if (param_2 !== 0) {
    local_c = operator_new(s32(local_8, 1000 + param_1 * 4) << 2);
    if (local_c === 0x0) {
      param_2 = 0;
    }
    else {
      local_14 = s32(local_8, 1000 + param_1 * 4);
      for (local_18 = 0; local_18 < local_14; local_18 = local_18 + 1) {
        if (s32(param_1 * 0x2004 + local_18 * 4 + 0x8400 + local_8, 0) === 0) {
          w32(local_c + local_18 * 4, 0, 0xffffffff);
        }
        else {
          w32(local_c + local_18 * 4, 0, 
               s32(param_1 * 0x2004 + local_18 * 4 + 0x43f8 + local_8, 0));
        }
      }
    }
  }
  w32(local_8, 1000 + param_1 * 4, 0);
  local_18 = 0;
  do {
    if (G.DAT_00655b18 <= local_18) {
      if (param_2 !== 0) {
        operator_delete(local_c);
      }
      FUN_0058843f(0,s32(local_8, 1000 + param_1 * 4) + -1,param_1);
      return;
    }
    if ((s32(G.DAT_0064f394, local_18 * 0x58) !== 0) &&
       (((s32(G.DAT_006acb58, param_1 * 4) !== 0 &&
         (s8(G.DAT_0064f348[local_18 * 0x58]) === G.DAT_006d1da0)) ||
        (((s32(G.DAT_006acb58, param_1 * 4) === 0 &&
          (s8(G.DAT_0064f348[local_18 * 0x58]) === s32(in_ECX, 0x118))) &&
         (((1 << (u8(G.DAT_006d1da0) & 0x1f) & s8(G.DAT_0064f34c[local_18 * 0x58])) !== 0 ||
          (s8(G.DAT_0064f348[local_18 * 0x58]) === (G.DAT_006d1da0 & 0xff))))))))) {
      true // DEVIATION: C pointer — s32(param_1 * 0x2004 + s32(local_8, 1000 + param_1 * 4) * 4 + 0x3f0 + local_8, 0) =
           // DEVIATION(cont): local_18;
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined4 *)
       // DEVIATION(cont): (param_1 * 0x2004 + *(int *)(local_8 + 1000 + param_1 * 4) * 4 + 0x43f8 + local_8) =
           // DEVIATION(cont): *(undefined4 *)(&G.DAT_0064f394 + local_18 * 0x58);
      if (param_2 === 0) {
        // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined4 *)
         // DEVIATION(cont): (param_1 * 0x2004 + *(int *)(local_8 + 1000 + param_1 * 4) * 4 + 0x8400 + local_8) = 0;
      }
      else {
        // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined4 *)
         // DEVIATION(cont): (param_1 * 0x2004 + *(int *)(local_8 + 1000 + param_1 * 4) * 4 + 0x8400 + local_8) = 0;
        for (local_10 = 0; local_10 < local_14; local_10 = local_10 + 1) {
          if (s32(G.DAT_0064f394, local_18 * 0x58) === s32(local_c + local_10 * 4, 0)) {
            // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined4 *)
             // DEVIATION(cont): (param_1 * 0x2004 + *(int *)(local_8 + 1000 + param_1 * 4) * 4 + 0x8400 + local_8) = 1;
            break;
          }
        }
      }
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — *(undefined4 *)
       // DEVIATION(cont): (param_1 * 0x2004 + *(int *)(local_8 + 1000 + param_1 * 4) * 4 + 0xc408 + local_8) = 0;
      for (local_10 = 0; local_10 < G.DAT_00655b16; local_10 = local_10 + 1) {
        if (((s32(G.DAT_0065610a, local_10 * 0x20) !== 0) &&
            (s16(G.DAT_0064f340, local_18 * 0x58) ===
             s16(G.DAT_006560f0, local_10 * 0x20))) &&
           (s16(G.DAT_0064f342, local_18 * 0x58) ===
            s16(G.DAT_006560f2, local_10 * 0x20))) {
          piVar1 = (param_1 * 0x2004 + s32(local_8, 1000 + param_1 * 4) * 4 + 0xc408 +
                          local_8);
          w32(piVar1, 0, s32(piVar1, 0) + 1);
        }
      }
      piVar1 = (local_8 + 1000 + param_1 * 4);
      w32(piVar1, 0, s32(piVar1, 0) + 1);
    }
    local_18 = local_18 + 1;
  } while( true );
}



// ============================================================
// Function: FID_conflict:_$E31 @ 0x005899F0
// Size: 26 bytes
// ============================================================

// /* Library Function - Multiple Matches With Different Base Names
    // _$E26
    // _$E31
    // _$E353
    // _$E354
   // 
   // Library: Visual Studio 1998 Debug */

export function FID_conflict___E31_005899F0() {


  FUN_00589a0a();
  FUN_00589a24();
  return;
}



// ============================================================
// Function: FUN_00589a0a @ 0x00589A0A
// Size: 26 bytes
// ============================================================

export function FUN_00589a0a() {


  FUN_005bd630();
  return;
}



// ============================================================
// Function: FUN_00589a24 @ 0x00589A24
// Size: 29 bytes
// ============================================================

export function FUN_00589a24() {


  // DEVIATION: C runtime — _atexit(FUN_00589a41);
  return;
}



// ============================================================
// Function: FUN_00589a41 @ 0x00589A41
// Size: 26 bytes
// ============================================================

export function FUN_00589a41() {


  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_00589a5b @ 0x00589A5B
// Size: 505 bytes
// ============================================================

// /* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

export function FUN_00589a5b() {


  let iVar1;
  // DEVIATION: SEH
  let local_708 = new Array(708).fill(0);
  let local_444 = new Array(1076).fill(0);
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_005c64da();
  local_8 = 0;
  FUN_0040bbb0();
  FUN_0040bc10(2);
  WritePrivateProfileStringA
            (s_Civilization_Gold_00634734,s_Window_Name_00634728,G.DAT_00679640,s_CIV_INI_00634720);
  FUN_005c5f20(G.DAT_00679640,0x7c,0,0,600,400,G.DAT_006a8c00);
  iVar1 = FUN_00564470(s_civ2_civ2_exe_00634748);
  if (iVar1 === 0) {
    // DEVIATION: SEH
    FUN_00589c54();
    FUN_00589c6a();
    return;
  }
  iVar1 = FUN_00414d10(0x10000,8);
  FUN_005d48f0(s32(iVar1, 4));
  FUN_004e3a86();
  FUN_005bf5e1(0x5a,10,0xc0,local_444);
  FUN_00419be0(G.DAT_006acb68);
  FUN_00419ba0(0x9e);
  FUN_00408050(1);
  G.DAT_006acbb0 = FUN_00589d50();
  _DAT_006acbb4 = FUN_0043c5c0();
  FUN_00426f80();
  FUN_005c6b63(local_708,10,0xec);
  thunk_load_civ2_art_0046da40();
  FUN_005c6da8(10,0xec,local_708);
  FUN_005c6480(10,0xec);
  FUN_00408230(0 /* ADDR:LAB_00402446 */);
  // DEVIATION: MFC — COleControlSite::SetDlgCtrlID(G.DAT_006553e8,0x402cd4);
  tie(thunk_map_ascii);
  FUN_00419ba0(0x9e);
  FUN_00419b80();
  G.DAT_00634718 = 1;
  // DEVIATION: SEH
  FUN_00589c54();
  FUN_00589c6a();
  return;
}



// ============================================================
// Function: FUN_00589c54 @ 0x00589C54
// Size: 12 bytes
// ============================================================

export function FUN_00589c54() {


  FUN_005c656b();
  return;
}



// ============================================================
// Function: FUN_00589c6a @ 0x00589C6A
// Size: 15 bytes
// ============================================================

export function FUN_00589c6a(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_00589c79 @ 0x00589C79
// Size: 36 bytes
// ============================================================

export function FUN_00589c79() {


  FUN_00408420();
  G.DAT_00634718 = 0;
  return;
}



// ============================================================
// Function: FUN_00589d50 @ 0x00589D50
// Size: 37 bytes
// ============================================================

export function FUN_00589d50(in_ECX) {


  // in_ECX → promoted to parameter
  
  FUN_005bc9d3(s32(in_ECX, 8));
  return;
}



// ============================================================
// Function: FUN_00589d80 @ 0x00589D80
// Size: 69 bytes
// ============================================================

export function FUN_00589d80(param_1) {


  let iVar1;
  let local_8;
  
  iVar1 = G.DAT_00634768;
  local_8 = -1;
  if (G.DAT_00634768 < 10) {
    local_8 = G.DAT_00634768;
    G.DAT_00634768 = G.DAT_00634768 + 1;
    w32(G.DAT_006acbd0, iVar1 * 4, param_1);
  }
  return local_8;
}



// ============================================================
// Function: FUN_00589dc5 @ 0x00589DC5
// Size: 297 bytes
// ============================================================

export function FUN_00589dc5(param_1) {


  let _File;
  let pcVar1;
  let sVar2;
  let iVar3;
  let local_5c;
  let local_58 = new Array(80).fill(0);
  let local_8;
  
  _File = FUN_0041508c(param_1,G.DAT_0063481c);
  if (_File !== 0x0) {
    local_8 = 1;
    // DEVIATION: C struct — while (((local_8 !== 0 && ((_File->_flag & 0x10) === 0)) &&
           // DEVIATION(cont): (pcVar1 = _fgets(local_58,0x4f,_File), pcVar1 != (char *)0x0))) {
      // DEVIATION(cont): for (local_5c = 0; sVar2 = _strlen(local_58), local_5c < (int)sVar2; local_5c = local_5c + 1)
      // DEVIATION(cont): {
        // DEVIATION(cont): if (local_58[local_5c] < ' ') {
          // DEVIATION(cont): local_58[local_5c] = '\0';
        }
      }
      iVar3 = _strncmp(local_58,G.DAT_00634820,3);
      if (iVar3 === 0) {
        local_8 = 0;
      }
      else {
        _sprintf(G.DAT_006acbf8,G.DAT_00634824,local_58);
        OutputDebugStringA(G.DAT_006acbf8);
      }
    }
  }
  if (_File !== 0x0) {
    _fclose(_File);
  }
  return;
}



// ============================================================
// Function: FUN_00589ef8 @ 0x00589EF8
// Size: 209 bytes
// ============================================================

export function FUN_00589ef8(param_1, param_2, param_3, param_4, param_5) {


  let local_bc = new Array(12).fill(0);
  let local_b0 = new Array(80).fill(0);
  let local_60 = new Array(80).fill(0);
  let local_10 = new Array(12).fill(0);
  
  if (param_3 !== 0) {
    FUN_005f22d0(G.DAT_00634770,param_3);
  }
  __itoa(param_1,local_b0,10);
  __itoa(param_2,local_60,10);
  __ltoa(param_4,local_10,10);
  __ltoa(param_5,local_bc,10);
  FUN_00589fc9(local_b0,s_ERRORS_DB_00634828,~param_1 + 1);
  FUN_00589fc9(local_60,s_MODULES_DB_00634834,param_2);
  FUN_0058a0ee(local_b0,local_60,local_10,local_bc,param_1);
  return;
}



// ============================================================
// Function: FUN_00589fc9 @ 0x00589FC9
// Size: 278 bytes
// ============================================================

export function FUN_00589fc9(param_1, param_2, param_3) {


  let _File;
  let pcVar1;
  let sVar2;
  let local_5c;
  let local_58;
  let local_54 = new Array(80).fill(0);
  
  local_5c = 1;
  _File = FUN_0041508c(param_2,G.DAT_00634840);
  if (_File !== 0x0) {
    for (local_58 = 1; local_58 <= param_3; local_58 = local_58 + 1) {
      // DEVIATION: C struct — if (((_File->_flag & 0x10) !== 0) ||
         // DEVIATION(cont): (pcVar1 = _fgets(local_54,0x4c,_File), pcVar1 == (char *)0x0)) LAB_0058a0bc_helper(local_5c); return;
    }
    for (local_58 = 0; sVar2 = _strlen(local_54), local_58 < sVar2; local_58 = local_58 + 1) {
      if (local_54[local_58] < 32) {
        local_54[local_58] = 0;
      }
    }
    FUN_005f22d0(param_1,local_54);
    local_5c = 0;
  }
// LAB_0058a0bc: (code below also in LAB_0058a0bc_helper, kept for 1:1 audit)
  if (_File !== 0x0) {
    _fclose(_File);
  }
  return local_5c;
}



// ============================================================
// Function: FUN_0058a0ee @ 0x0058A0EE
// Size: 778 bytes
// ============================================================

export function FUN_0058a0ee(param_1, param_2, param_3, param_4) {


  let sVar1;
  let local_108;
  let local_104 = new Array(256).fill(0);
  
  FUN_005f22d0(local_104,s_Error___00634844);
  FUN_005f22e0(local_104,param_1);
  FUN_005f22e0(local_104,s___in_module___0063484c);
  FUN_005f22e0(local_104,param_2);
  FUN_005f22e0(local_104,s___data__0063485c);
  FUN_005f22e0(local_104,param_3);
  FUN_005f22e0(local_104,G.DAT_00634868);
  FUN_005f22e0(local_104,param_4);
  _sprintf(G.DAT_006acbf8,G.DAT_0063486c,local_104);
  OutputDebugStringA(G.DAT_006acbf8);
  debug_log(G.DAT_006acbf8);
  sVar1 = _strlen(G.DAT_00634770);
  if (sVar1 !== 0) {
    _sprintf(G.DAT_006acbf8,s___s__00634870,G.DAT_00634770);
    OutputDebugStringA(G.DAT_006acbf8);
    debug_log(G.DAT_006acbf8);
  }
  if (G.DAT_00634814 !== 0) {
    __ltoa(G.DAT_00634818,param_3,10);
    FUN_005f22d0(local_104,s_Tried_to_allocate_00634878);
    FUN_005f22e0(local_104,param_3);
    FUN_005f22e0(local_104,s_bytes__0063488c);
    _sprintf(G.DAT_006acbf8,G.DAT_00634894,local_104);
    OutputDebugStringA(G.DAT_006acbf8);
    debug_log(G.DAT_006acbf8);
  }
  _sprintf(G.DAT_006acbf8,G.DAT_00634898);
  OutputDebugStringA(G.DAT_006acbf8);
  debug_log(G.DAT_006acbf8);
  if (G.DAT_00634810 !== 0) {
    _sprintf(G.DAT_006acbf8,s_File_open_failed___s_0063489c,G.DAT_006347c0);
    OutputDebugStringA(G.DAT_006acbf8);
    debug_log(G.DAT_006acbf8);
  }
  FUN_005f22d0(local_104,s_Most_recent_DOS_error__006348b4);
  __itoa(G.DAT_00639f14,param_3,10);
  FUN_005f22e0(local_104,param_3);
  _sprintf(G.DAT_006acbf8,G.DAT_006348d0,local_104);
  OutputDebugStringA(G.DAT_006acbf8);
  debug_log(G.DAT_006acbf8);
  _sprintf(G.DAT_006acbf8,G.DAT_006348d4);
  OutputDebugStringA(G.DAT_006acbf8);
  debug_log(G.DAT_006acbf8);
  FUN_00589dc5(s__warn0_dat_006348d8);
  local_108 = G.DAT_00634768;
  while (local_108 = local_108 + -1, -1 < local_108) {
    if (s32(G.DAT_006acbd0, local_108 * 4) !== 0) {
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — (**(code **)(G.DAT_006acbd0 + local_108 * 4))();
    }
  }
  DebugBreak();
                    // /* WARNING: Subroutine does not return */
  _exit(3);
}



// ============================================================
// Function: FID_conflict:_$E31 @ 0x0058A5B0
// Size: 26 bytes
// ============================================================

// /* Library Function - Multiple Matches With Different Base Names
    // _$E26
    // _$E31
    // _$E353
    // _$E354
   // 
   // Library: Visual Studio 1998 Debug */

export function FID_conflict___E31_0058A5B0() {


  FUN_0058a5ca();
  FUN_0058a5e4();
  return;
}



// ============================================================
// Function: FUN_0058a5ca @ 0x0058A5CA
// Size: 26 bytes
// ============================================================

export function FUN_0058a5ca() {


  FUN_0055339f();
  return;
}



// ============================================================
// Function: FUN_0058a5e4 @ 0x0058A5E4
// Size: 29 bytes
// ============================================================

export function FUN_0058a5e4() {


  // DEVIATION: C runtime — _atexit(FUN_0058a601);
  return;
}



// ============================================================
// Function: FUN_0058a601 @ 0x0058A601
// Size: 26 bytes
// ============================================================

export function FUN_0058a601() {


  // DEVIATION: MFC — COleCntrFrameWnd::~COleCntrFrameWnd(G.DAT_006acd58);
  return;
}



// ============================================================
// Function: FUN_0058a61b @ 0x0058A61B
// Size: 498 bytes
// ============================================================

// /* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

export function FUN_0058a61b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {



  let local_c;
  let local_8;
  
  if (param_1 === 0) {
    FUN_005f22d0(G.DAT_006ace8c,G.DAT_00634948);
  }
  else {
    FUN_005f22d0(G.DAT_006ace8c,param_1);
  }
  _DAT_006ad02c = G.DAT_006ab1a0;
  _DAT_006ad024 = G.DAT_006ab190;
  _DAT_006ad028 = G.DAT_006ab178;
  _DAT_006ace6c = param_2;
  G.DAT_006ace70 = param_8;
  G.DAT_006ace74 = param_9;
  G.DAT_006ace78 = param_7;
  _DAT_006acf54 = 0;
  _DAT_006ad000 = 0;
  if ((param_2 & 4) !== 0) {
    G.DAT_006ace70 = G.DAT_00633598;
    G.DAT_006ace74 = G.DAT_0063359c;
  }
  if ((param_2 & 8) === 0) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if (G.DAT_006ace70 !== 0) {
    local_8 = local_8 | 0x400;
  }
  if (param_7 !== 0) {
    local_8 = local_8 | 0x1000;
  }
  if ((param_2 & 2) === 0) {
    param_5 = param_5 + G.DAT_006ace74 * 2;
    param_6 = param_6 + G.DAT_006ace70 + G.DAT_006ace74;
  }
  if ((param_2 & 1) !== 0) {
    param_3 = (G.DAT_006ab198 >> 1) - (param_5 >> 1);
    param_4 = (G.DAT_006ab19c >> 1) - (param_6 >> 1);
  }
  if (G.DAT_006a4f88 === 0) {
    local_c = 0;
  }
  else {
    local_c = G.DAT_006a4f88 + 0x48;
  }
  FUN_005bb4ae(0,local_8,param_3,param_4,param_5,param_6,G.DAT_006a8c00,local_c);
  if (G.DAT_006ace70 !== 0) {
    FUN_00497d00(G.DAT_006ace70);
  }
  if (G.DAT_006ace78 !== 0) {
    FUN_004cff70(G.DAT_006ace78);
  }
  FUN_00552ed2();
  return;
}



// ============================================================
// Function: show_messagebox_A80D @ 0x0058A80D
// Size: 248 bytes
// ============================================================

export function show_messagebox_A80D_0058A80D(param_1, param_2) {


  let iVar1;
  let local_410 = new Array(1024).fill(0);
  let local_10;
  let local_c;
  let local_8;
  
  iVar1 = _strcmp(param_1,param_2);
  if (iVar1 !== 0) {
    local_10 = _fopen(param_1,G.DAT_0063494c);
    if ((local_10 === 0x0) ||
       (local_8 = _fopen(param_2,G.DAT_00634950), local_8 === 0x0)) {
      MessageBoxA(0x0,s_Error_copying_file_00634954,0x0,0x10);
      if (local_10 !== 0x0) {
        _fclose(local_10);
      }
    }
    else {
      while (local_c = _fread(local_410,1,0x400,local_10), local_c !== 0) {
        _fwrite(local_410,1,local_c,local_8);
      }
      _fclose(local_10);
      _fclose(local_8);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058a905 @ 0x0058A905
// Size: 709 bytes
// ============================================================

// /* WARNING: Removing unreachable block (ram,0x0058a97f) */
// /* WARNING: Removing unreachable block (ram,0x0058a9fb) */

export function FUN_0058a905(param_1) {


  let uVar1;
  let iVar2;
  let DVar3;
  // DEVIATION: SEH
  let local_508 = new Array(256).fill(0);
  let local_408 = new Array(256).fill(0);
  let local_308 = new Array(220).fill(0);
  let local_22c;
  let local_14;
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_0059db08(0x4000);
  local_8 = 0;
  if (s32(G.DAT_006aca14, param_1 * 4) < 0) {
    // DEVIATION: SEH
    FUN_0058abca();
    FUN_0058abe0();
    return;
  }
  FUN_0059d3c9(G.DAT_006acda0);
  do {
    uVar1 = FUN_00428b0c(s32(G.DAT_00628420, 0x888),0,0,0);
    _sprintf(local_408,s__s____WAV__c__WAV_c_c_00634968,uVar1);
    FUN_005f22d0(local_508,s___WAV_00634980);
    uVar1 = FUN_00428b0c(s32(G.DAT_00628420, 0x88c),local_508,local_408,
                               G.DAT_00634988,1,0);
    iVar2 = thunk_show_open_dialog_31D2(G.DAT_006acda0,uVar1);
    if (iVar2 === 0) {
      // DEVIATION: SEH
      FUN_0058abca();
      FUN_0058abe0();
      return;
    }
    // DEVIATION: MFC — CSocket::Create(local_308,0x634998,0x63498c,0x801);
    do {
      local_22c = 0;
      local_14 = FUN_0040bc80(0);
      if (local_22c !== 0) {
        FUN_005d6038(local_508,0,0,0);
      }
    } while (local_22c !== 0);
    FUN_0059db65();
    FUN_0059d5f5();
  } while (local_14 !== 0);
  FUN_005f22d0(local_408,G.DAT_0064bb08);
  FUN_005f22e0(local_408,s__SOUND_006349a0);
  DVar3 = GetFileAttributesA(local_408);
  if (DVar3 !== 0xffffffff) {
    FUN_005f22e0(local_408,G.DAT_006349a8);
    FUN_005f22e0(local_408,s_AIRCOMBT_0062af70 + s32(G.DAT_006aca14, param_1 * 4) * 9);
    FUN_005f22e0(local_408,G.DAT_006349ac);
    iVar2 = FUN_00415133(local_408);
    if ((iVar2 === 0) || (iVar2 = _remove(local_408), iVar2 === 0)) {
      thunk_show_messagebox_A80D(local_508,local_408);
    }
    // DEVIATION: SEH
    FUN_0058abca();
    FUN_0058abe0();
    return;
  }
  // DEVIATION: SEH
  FUN_0058abca();
  FUN_0058abe0();
  return;
}



// ============================================================
// Function: FUN_0058abca @ 0x0058ABCA
// Size: 12 bytes
// ============================================================

export function FUN_0058abca() {


  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0058abe0 @ 0x0058ABE0
// Size: 14 bytes
// ============================================================

export function FUN_0058abe0(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058abee @ 0x0058ABEE
// Size: 37 bytes
// ============================================================

export function FUN_0058abee() {


  G.DAT_006acd50 = 0;
  // DEVIATION: MFC — CRichEditDoc::InvalidateObjectCache(G.DAT_006acda0);
  return;
}



// ============================================================
// Function: FUN_0058ac13 @ 0x0058AC13
// Size: 37 bytes
// ============================================================

export function FUN_0058ac13() {


  G.DAT_006acd50 = 0;
  // DEVIATION: MFC — CRichEditDoc::InvalidateObjectCache(G.DAT_006acda0);
  return;
}



// ============================================================
// Function: FUN_0058ac38 @ 0x0058AC38
// Size: 488 bytes
// ============================================================

export function FUN_0058ac38() {


  let extraout_EAX;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let local_28;
  let local_14 = new Array(16).fill(0);
  
  FUN_00552112();
  FUN_0040fdb0(G.DAT_006acd58,G.DAT_006ad014,0x1d);
  FUN_005baeb0(G.DAT_006acd58);
  FUN_005baec8(G.DAT_006a4f90);
  FUN_005baee0(10,10,0,0);
  // DEVIATION: MFC — _Timevec::~_Timevec(PTR_DAT_006359f0);
  iVar1 = extraout_EAX + 8;
  iVar2 = G.DAT_006ace84 + (G.DAT_006ace84 >> 0x1f & 3);
  iVar3 = iVar2 >> 2;
  for (local_28 = 0; local_28 < 6; local_28 = local_28 + 1) {
    iVar4 = (iVar1 * 3) / 2 + (local_28 / 3) * iVar1 * 4 + G.DAT_006ace80;
    iVar5 = (local_28 % 3) * iVar3 * 5;
    iVar5 = (iVar5 + (iVar5 >> 0x1f & 3) >> 2) + (iVar3 + (iVar2 >> 0x1f & 3) >> 2)
            + G.DAT_006ace7c;
    FUN_004086c0(local_14,iVar5,iVar4,iVar3,iVar1);
    FUN_005a99fc(G.DAT_006acd58,local_14,10,10);
    if (-1 < s32(G.DAT_006acd38, local_28 * 4)) {
      FUN_0040bbb0();
      FUN_00414d70(s_AIRCOMBT_0062af70 + s32(G.DAT_006acd38, local_28 * 4) * 9);
      FUN_00414d70(G.DAT_006349b4);
      FUN_005bb024(G.DAT_006acd58,G.DAT_00679640,iVar5 + iVar3 / 2,iVar4 + 4,0);
    }
  }
  FUN_0040bbb0();
  FUN_0040bc10(0x25b);
  FUN_005bb024(G.DAT_006acd58,G.DAT_00679640,G.DAT_006ace7c + G.DAT_006ace84 / 2,G.DAT_006ace80 + 10,0
                    );
  FUN_00408460();
  return;
}



// ============================================================
// Function: FUN_0058ae20 @ 0x0058AE20
// Size: 76 bytes
// ============================================================

export function FUN_0058ae20(param_1, param_2, param_3, param_4, param_5, param_6) {


  let uVar1;
  
  if ((((param_1 < param_3) || (param_5 < param_1)) || (param_2 < param_4)) || (param_6 < param_2))
  {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}



// ============================================================
// Function: FUN_0058ae6c @ 0x0058AE6C
// Size: 330 bytes
// ============================================================

export function FUN_0058ae6c(param_1, param_2) {


  let extraout_EAX;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_2c;
  let local_18 = [0];
  let local_14;
  let local_10;
  let local_c;
  let local_8;
  
  param_2 = param_2 - G.DAT_006ace80;
  param_1 = param_1 - G.DAT_006ace7c;
  // DEVIATION: MFC — _Timevec::~_Timevec(PTR_DAT_006359f0);
  iVar1 = extraout_EAX + 8;
  iVar2 = G.DAT_006ace84 + (G.DAT_006ace84 >> 0x1f & 3);
  iVar3 = iVar2 >> 2;
  local_2c = 0;
  while( true ) {
    if (5 < local_2c) {
      return;
    }
    iVar4 = (local_2c % 3) * iVar3 * 5;
    FUN_004086c0(local_18[0],
                       (iVar4 + (iVar4 >> 0x1f & 3) >> 2) +
                       (iVar3 + (iVar2 >> 0x1f & 3) >> 2),
                       (iVar1 * 3) / 2 + (local_2c / 3) * iVar1 * 4,iVar3,iVar1);
    if ((-1 < s32(G.DAT_006acd38, local_2c * 4)) &&
       (iVar4 = FUN_0058ae20(param_1,param_2,local_18[0],local_14,local_10,local_c), iVar4 !== 0))
    break;
    local_2c = local_2c + 1;
  }
  local_8 = G.DAT_00655aea;
  G.DAT_00655aea = G.DAT_00655aea | 0x10;
  FUN_0046e020(s32(G.DAT_006acd38, local_2c * 4),0,0,0);
  G.DAT_00655aea = local_8;
  return;
}



// ============================================================
// Function: FUN_0058afb6 @ 0x0058AFB6
// Size: 1224 bytes
// ============================================================

// /* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

export function FUN_0058afb6(param_1) {


  let local_10;
  let local_8;
  
  local_10 = -1;
  for (local_8 = 0; local_8 < 6; local_8 = local_8 + 1) {
    w32(G.DAT_006acd38, local_8 * 4, 0xffffffff);
  }
  if (s32(G.DAT_006a2d48, param_1 * 0x58) !== 0) {
    if (param_1 === 0x36) {
      _DAT_006acd38 = 0x7d;
    }
    else if (param_1 === 0x37) {
      _DAT_006acd38 = 0x7e;
    }
    else if (param_1 === 0x38) {
      _DAT_006acd38 = 0x7f;
    }
    else if (param_1 === 0x39) {
      _DAT_006acd38 = 0x80;
    }
    else if (param_1 === 0x3a) {
      _DAT_006acd38 = 0x81;
    }
    else if (param_1 === 0x3b) {
      _DAT_006acd38 = 0x82;
    }
    else if (param_1 === 0x3c) {
      _DAT_006acd38 = 0x83;
    }
    else if (param_1 === 0x3d) {
      _DAT_006acd38 = 0x84;
    }
    else if (param_1 === 0x33) {
      _DAT_006acd38 = 0x65;
    }
    else if (param_1 === 0x34) {
      _DAT_006acd38 = 0x66;
    }
    else if (param_1 === 0x35) {
      _DAT_006acd38 = 0x67;
    }
    else if ((G.DAT_006a2d59[param_1 * 0x58] & 0x10) === 0) {
      if (s32(G.DAT_006a2d34, param_1 * 0x58) === 1) {
        if (s32(G.DAT_006a2d44, param_1 * 0x58) === 0) {
          _DAT_006acd38 = 0x21;
          if (param_1 < 0x1e) {
            _DAT_006acd48 = 0x17;
          }
          else {
            _DAT_006acd48 = 0x4f;
          }
        }
        else if (param_1 < 0x1e) {
          _DAT_006acd38 = 0;
          _DAT_006acd44 = 0x18;
          _DAT_006acd48 = 0x17;
          _DAT_006acd4c = 0x1a;
        }
        else {
          _DAT_006acd38 = 0x52;
          _DAT_006acd44 = 0x50;
          _DAT_006acd48 = 0x4f;
          _DAT_006acd4c = 0x4e;
        }
      }
      else if (s32(G.DAT_006a2d34, param_1 * 0x58) === 2) {
        if ((G.DAT_006a2d58[param_1 * 0x58] & 8) === 0) {
          local_10 = 6;
          if (((param_1 === 0x28) || (param_1 === 0x26)) || ((param_1 === 0x27 || (param_1 === 0x25))))
          {
            local_10 = 0x2e;
          }
        }
        else {
          _DAT_006acd38 = 0x4d;
        }
      }
      else if (param_1 === 0x11) {
        _DAT_006acd38 = 0x19;
      }
      // DEVIATION(C-syntax): else if ((((param_1 === 0xf) || (param_1 === 0x10)) || (param_1 === 0x13)) || (param_1 === 0x12))
      // DEVIATION(cont): {
        // DEVIATION(cont): _DAT_006acd38 = 0x4a;
      }
      else if ((param_1 === 0x14) || (param_1 === 0x15)) {
        _DAT_006acd38 = 0xc;
      }
      else if (((param_1 === 7) || (param_1 === 0xb)) || ((param_1 === 10 || (param_1 === 9)))) {
        _DAT_006acd38 = 0x22;
      }
      else if ((((param_1 === 8) || (param_1 === 0xd)) || (param_1 === 0xc)) || (param_1 === 0xe)) {
        _DAT_006acd38 = 0x26;
      }
      else if ((param_1 < 0x16) || (0x1a < param_1)) {
        _DAT_006acd38 = 0x49;
      }
      else if (param_1 === 0x17) {
        _DAT_006acd38 = 10;
      }
      else {
        local_10 = 0x28;
        if (0x17 < param_1) {
          _DAT_006acd38 = 0x1c;
        }
      }
    }
    else if (s32(G.DAT_006a2d48, param_1 * 0x58) < 99) {
      _DAT_006acd38 = 0x29;
    }
    else {
      _DAT_006acd38 = 0x32;
    }
  }
  G.DAT_006acd3c = local_10;
  if (-1 < local_10) {
    _DAT_006acd40 = 0x23;
  }
  for (local_8 = 0; local_8 < 6; local_8 = local_8 + 1) {
    if (s32(G.DAT_006acd38, local_8 * 4) < 0) {
      FUN_00453c40();
    }
    else {
      FUN_00453c80();
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058b47e @ 0x0058B47E
// Size: 987 bytes
// ============================================================

// /* WARNING: Removing unreachable block (ram,0x0058b6f2) */
// /* WARNING: Removing unreachable block (ram,0x0058b77b) */
// /* WARNING: Removing unreachable block (ram,0x0058b5ea) */
// /* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

export function FUN_0058b47e(param_1, param_2) {


  let extraout_EAX;
  let uVar1;
  let iVar2;
  // DEVIATION: SEH
  let local_214;
  let local_1d0 = new Array(360).fill(0);
  let local_68;
  let local_64;
  let local_60;
  let local_5c = new Array(76).fill(0);
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_0040f3e0();
  local_8 = 0;
  FUN_0040f3e0();
  local_8._0_1_ = 1;
  _eh_vector_constructor_iterator_(local_1d0,0x3c,6,FUN_0040f3e0,FUN_0040f570);
  local_8 = CONCAT31(local_8._1_3_,2);
  G.DAT_006acd50 = 1;
  FUN_0058a61b(param_1,0xd,0,0,0x21c,0x118,0,0,0);
  // DEVIATION: MFC — _Timevec::~_Timevec(PTR_DAT_006359f0);
  local_68 = extraout_EAX + 8;
  local_60 = G.DAT_006ace84 + (G.DAT_006ace84 >> 0x1f & 3) >> 2;
  for (local_214 = 0; local_214 < 6; local_214 = local_214 + 1) {
    iVar2 = (local_214 % 3) * local_60 * 5;
    local_64 = (iVar2 + (iVar2 >> 0x1f & 3) >> 2) +
               (local_60 + (local_60 >> 0x1f & 3) >> 2) + G.DAT_006ace7c;
    FUN_004086c0(local_5c,local_64,
                       local_68 * 3 + (local_214 / 3) * local_68 * 4 + G.DAT_006ace80,local_60,
                       local_68);
    // DEVIATION(C-syntax): true) // DEVIATION: C pointer — uVar1 = FUN_00428b0c(*(undefined4 *)
                                // DEVIATION(cont): (G.DAT_00628420 + *(int *)(&G.DAT_00634930 + local_214 * 4) * 4));
    FUN_0040f680(G.DAT_006acda0,local_214 + 0xc9,local_5c,uVar1);
    FUN_0040f880(0 /* ADDR:LAB_00403b4d */);
  }
  FUN_0058afb6(param_2,local_1d0);
  local_60 = (G.DAT_006ace84 + -6) / 2;
  iVar2 = (G.DAT_006ace80 + _DAT_006ace88) - (local_68 + 2);
  local_64 = G.DAT_006ace7c + 2;
  FUN_004086c0(local_5c,local_64,iVar2,local_60,local_68);
  uVar1 = FUN_00428b0c(s32(G.DAT_00628420, 0x3f8));
  FUN_0040f680(G.DAT_006acda0,0x65,local_5c,uVar1);
  FUN_0040f880(0 /* ADDR:LAB_004022c0 */);
  local_64 = local_64 + local_60 + 2;
  FUN_004086c0(local_5c,local_64,iVar2,local_60,local_68);
  uVar1 = FUN_00428b0c(s32(G.DAT_00628420, 0x3fc));
  FUN_0040f680(G.DAT_006acda0,0x66,local_5c,uVar1);
  FUN_0040f880(0 /* ADDR:LAB_00402da1 */);
  FUN_0040f840();
  FUN_00414ca0(0 /* ADDR:LAB_00402559 */);
  // DEVIATION: MFC — CPropertySheet::EnableStackedTabs(G.DAT_006acd58,0x4017d5);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while (G.DAT_006acd50 !== 0) {
    FUN_0040ef50();
  }
  FUN_0059d3c9(0);
  FUN_00553379();
  local_8._0_1_ = 1;
  FUN_0058b859();
  local_8 = ((local_8) >>> 0)._1_3_ << 8;
  FUN_0058b86f();
  // DEVIATION: SEH
  FUN_0058b87b();
  FUN_0058b88e();
  return;
}



// ============================================================
// Function: FUN_0058b859 @ 0x0058B859
// Size: 22 bytes
// ============================================================

export function FUN_0058b859(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  
  _eh_vector_destructor_iterator_((unaff_EBP + -0x1cc),0x3c,6,FUN_0040f570);
  return;
}



// ============================================================
// Function: FUN_0058b86f @ 0x0058B86F
// Size: 12 bytes
// ============================================================

export function FUN_0058b86f() {


  FUN_0040f570();
  return;
}



// ============================================================
// Function: FUN_0058b87b @ 0x0058B87B
// Size: 9 bytes
// ============================================================

export function FUN_0058b87b() {


  FUN_0040f570();
  return;
}



// ============================================================
// Function: FUN_0058b88e @ 0x0058B88E
// Size: 14 bytes
// ============================================================

export function FUN_0058b88e(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058bd60 @ 0x0058BD60
// Size: 36 bytes
// ============================================================

export function FUN_0058bd60() {


  FUN_0059062c(G.DAT_00655afe,0xffffffff,3);
  return;
}



// ============================================================
// Function: FUN_0058bd84 @ 0x0058BD84
// Size: 121 bytes
// ============================================================

export function FUN_0058bd84() {


  let local_8;
  
  for (local_8 = 0; local_8 < G.DAT_00655b16; local_8 = local_8 + 1) {
    if ((s32(G.DAT_0065610a, local_8 * 0x20) !== 0) &&
       (s8(G.DAT_006560f7[local_8 * 0x20]) === G.DAT_006d1da0)) {
      FUN_005b6787(local_8);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058bdfd @ 0x0058BDFD
// Size: 89 bytes
// ============================================================

export function FUN_0058bdfd() {


  w16(G.DAT_006560f4, G.DAT_00655afe * 0x20, 
       u16(G.DAT_006560f4, G.DAT_00655afe * 0x20) | 0x4000);
  G.DAT_0062804c = 0;
  G.DAT_00628054 = 0;
  FUN_0041033a();
  FUN_00489859(0);
  return;
}



// ============================================================
// Function: FUN_0058be56 @ 0x0058BE56
// Size: 1087 bytes
// ============================================================

export function FUN_0058be56() {


  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let local_118 = new Array(260).fill(0);
  let local_14;
  let local_10;
  let local_c;
  let local_8;
  
  G.DAT_0062804c = 0;
  iVar1 = G.DAT_00655afe;
  local_10 = s16(G.DAT_006560f0, iVar1 * 0x20);
  local_14 = s16(G.DAT_006560f2, iVar1 * 0x20);
  iVar2 = s8(G.DAT_006560f7[iVar1 * 0x20]);
  if (G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 0x05) {
    iVar3 = FUN_005b89e4(local_10,local_14);
    if (iVar3 === 0) {
      iVar3 = FUN_0043cf76(local_10,local_14);
      if (iVar3 < 0) {
        for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
          uVar4 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + local_10);
          local_c = s8(G.DAT_00628360[local_8]) + local_14;
          iVar3 = FUN_004087c0(uVar4,local_c);
          if ((iVar3 !== 0) && (iVar3 = FUN_005b8ca6(uVar4,local_c), -1 < iVar3)) {
            uVar4 = FUN_0043cf76(uVar4,local_c);
            FUN_00414dd0(s_ADJACENTCITY_006349f8,uVar4);
            return;
          }
        }
        iVar3 = thunk_create_city(local_10,local_14,iVar2);
        if (-1 < iVar3) {
          iVar5 = FUN_00421ed0(s_NAMECITY_00634a08,0xf,G.DAT_0064f360 + iVar3 * 0x58,local_118)
          ;
          if (iVar5 === 0) {
            FUN_004c4d1e(iVar1,iVar3,local_118);
            FUN_0040ff60(0,G.DAT_0064f360 + iVar3 * 0x58);
            FUN_0040bbb0();
            FUN_00421f10(G.DAT_00655afa);
            FUN_0040ff60(1,G.DAT_00679640);
            FUN_0046e020(7,1,0,0);
            FUN_004eb80a(s_FOUNDED_00634a14,iVar3,0x4c,1,iVar2);
            if (((G.DAT_00655aea._1_1_ & 1) !== 0) && (s16(G.DAT_0064c708, iVar2 * 0x594) === 1))
            {
              FUN_004904c0(PTR_s_TUTORIAL_00627678,s_FIRSTPRODUCT_00634a1c,G.DAT_00643af8,0);
            }
            G.DAT_0062edf8 = 1;
            thunk_citywin_DADA();
            thunk_handle_city_disorder_00509590(iVar3);
            thunk_citywin_DB36();
            G.DAT_0062edf8 = 0;
          }
          else {
            thunk_delete_city(iVar3,0);
            G.DAT_006554fd[s16(G.DAT_0064c6a6, iVar2 * 0x594) * 0x30] =
                 G.DAT_006554fd[s16(G.DAT_0064c6a6, iVar2 * 0x594) * 0x30] + -1;
          }
        }
      }
      else if (s8(G.DAT_0064f349[iVar3 * 0x58]) < ((G.DAT_0064bcd1) | 0)) {
        G.DAT_0064f349[iVar3 * 0x58] = G.DAT_0064f349[iVar3 * 0x58] + 0x01;
        FUN_005b4391(iVar1,1);
        thunk_citywin_C679(iVar3);
        FUN_0047ce1e(local_10,local_14,1,G.DAT_006d1da0,1);
      }
      else {
        FUN_004c4210(0,CONCAT31(s8(G.DAT_0064f349[iVar3 * 0x58]) >> 7,G.DAT_0064bcd1));
        FUN_00414dd0(s_ONLY10_006349f0,iVar3);
      }
    }
    else {
      FUN_00421ea0(s_CITYATSEA_006349e4);
    }
  }
  else {
    FUN_004442a0(s_ONLYSETTLERS_006349d4,0,(G.DAT_00633584 === 0) - 1 & 8);
  }
  return;
}



// ============================================================
// Function: FUN_0058c295 @ 0x0058C295
// Size: 722 bytes
// ============================================================

export function FUN_0058c295() {


  let cVar1;
  let sVar2;
  let sVar3;
  let iVar4;
  let iVar5;
  let local_14;
  let local_c;
  let local_8;
  
  if (G.DAT_006d1da8 === 1) {
    local_14 = G.DAT_00655afe;
  }
  else {
    local_8 = G.DAT_0064b1b4;
    local_c = G.DAT_0064b1b0;
    local_14 = FUN_005b2e69(local_8,local_c);
  }
  if ((G.DAT_00655b02 < 3) || (s8(G.DAT_006560f7[local_14 * 0x20]) === G.DAT_006d1da0)) {
    if (local_14 < 0) {
      if ((((G.DAT_00655aea._1_1_ & 0x80) !== 0) && (G.DAT_00655b02 === 0)) &&
         (iVar4 = FUN_0043cf76(local_8,local_c), -1 < iVar4)) {
        cVar1 = G.DAT_0064f348[iVar4 * 0x58];
        FUN_00421d60(0,G.DAT_0064f360 + iVar4 * 0x58);
        iVar5 = FUN_00414dd0(s_DISBAND_00634a34,iVar4);
        if (iVar5 === 1) {
          thunk_delete_city(iVar4,0);
          thunk_kill_civ(cVar1,0);
          FUN_0047cf9e(G.DAT_006d1da0,1);
        }
      }
    }
    else if ((s8(G.DAT_006560f7[local_14 * 0x20]) === G.DAT_006d1da0) || (G.DAT_00655b07 !== 0)) {
      G.DAT_0062804c = 0;
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(0,*(undefined4 *)
                            // DEVIATION(cont): (&G.DAT_0064b1b8 + (uint)(byte)(&G.DAT_006560f6)[local_14 * 0x20] * 0x14));
      iVar4 = FUN_004442e0(s_DISBAND_00634a2c,local_14);
      if (iVar4 === 1) {
        sVar2 = s16(G.DAT_006560f0, local_14 * 0x20);
        sVar3 = s16(G.DAT_006560f2, local_14 * 0x20);
        iVar4 = FUN_0043cf76(sVar2,sVar3);
        if (-1 < iVar4) {
          w16(G.DAT_0064f35c, iVar4 * 0x58, 
               (short)((int)(s8(G.DAT_0064b1c8)
                                        [u8(G.DAT_006560f6[local_14 * 0x20]) * 0x14] *
                            ((G.DAT_0064bccc) >>> 0)) / 2) + s16(G.DAT_0064f35c, iVar4 * 0x58);
          // DEVIATION: MFC — iVar5 = CSplitterWnd::IsTracking(G.DAT_006a91b8);
          if (iVar5 === iVar4) {
            FUN_004e7492(iVar4);
          }
          // DEVIATION: MFC — iVar5 = CSplitterWnd::IsTracking(G.DAT_006a91b8);
          if (iVar5 === iVar4) {
            thunk_citywin_9429();
          }
        }
        FUN_005b5d93(local_14,1);
        FUN_0047ce1e(sVar2,sVar3,0,G.DAT_006d1da0,1);
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058c56c @ 0x0058C56C
// Size: 242 bytes
// ============================================================

export function FUN_0058c56c(param_1, param_2) {


  let uVar1;
  let iVar2;
  let iVar3;
  let pbVar4;
  let uVar5;
  let local_8;
  
  local_8 = 0;
  do {
    if (4 < local_8) {
      return 0;
    }
    uVar1 = FUN_005ae052(s8(G.DAT_0062833c[local_8]) + param_1);
    iVar2 = s8(G.DAT_00628344[local_8]) + param_2;
    iVar3 = FUN_004087c0(uVar1,iVar2);
    if (iVar3 !== 0) {
      iVar3 = FUN_005b89e4(uVar1,iVar2);
      if (iVar3 !== 0) {
        return 1;
      }
      pbVar4 = FUN_005b8931(uVar1,iVar2);
      if ((s32(pbVar4, 0) & 0x80) !== 0) {
        return 1;
      }
      uVar5 = FUN_005b94d5(uVar1,iVar2);
      if ((uVar5 & 4) !== 0) {
        return 1;
      }
    }
    local_8 = local_8 + 1;
  } while( true );
}



// ============================================================
// Function: FUN_0058c65e @ 0x0058C65E
// Size: 1411 bytes
// ============================================================

export function FUN_0058c65e(param_1) {


  let bVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let pbVar8;
  let uVar9;
  
  iVar3 = G.DAT_00655afe;
  iVar4 = s16(G.DAT_006560f0, iVar3 * 0x20);
  iVar5 = s16(G.DAT_006560f2, iVar3 * 0x20);
  iVar6 = s8(G.DAT_006560f7[iVar3 * 0x20]);
  bVar1 = FUN_005b89bb(iVar4,iVar5);
  G.DAT_0062804c = 0;
  if (G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar3 * 0x20]) * 0x14] !== 0x05) {
    FUN_004cc870(s_ONLYSETTLERS_00634a3c,0,8);
    return;
  }
  if (param_1 === 10) {
    iVar7 = FUN_004bd9f0(iVar6,0x42);
    if (iVar7 === 0) {
      FUN_004c4240(s_RADIO_00634a4c,0x42,8);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4,iVar5);
    if (((-1 < iVar7) || (bVar2 = FUN_005b94d5(iVar4,iVar5), (bVar2 & 0x42) === 0x40)) ||
       (iVar7 = FUN_005b89e4(iVar4,iVar5), iVar7 !== 0)) {
      FUN_004442e0(s_CANTIMPROVE_00634a54,iVar3);
      return;
    }
    iVar7 = FUN_005b8d15(iVar4,iVar5);
    if (-1 < iVar7) {
      FUN_004442e0(s_ALREADYAIR_00634a60,iVar3);
      return;
    }
  }
  if (param_1 === 4) {
    iVar7 = FUN_004bd9f0(iVar6,0x12);
    if (iVar7 === 0) {
      FUN_004c4240(s_CONSTRUCTION_00634a6c,0x12,8);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4,iVar5);
    if (((-1 < iVar7) || (iVar7 = FUN_005b89e4(iVar4,iVar5), iVar7 !== 0)) ||
       (bVar2 = FUN_005b94d5(iVar4,iVar5), (bVar2 & 0x42) === 0x40)) {
      FUN_004442e0(s_CANTIMPROVE_00634a7c,iVar3);
      return;
    }
    bVar2 = FUN_005b94d5(iVar4,iVar5);
    if ((bVar2 & 0x42) === 0x40) {
      FUN_004442e0(s_ALREADYFORT_00634a88,iVar3);
      return;
    }
  }
  if (param_1 === 5) {
    iVar7 = FUN_005b8ca6(iVar4,iVar5);
    if ((-1 < iVar7) || (iVar7 = FUN_005b89e4(iVar4,iVar5), iVar7 !== 0)) {
      FUN_004442e0(s_CANTIMPROVE_00634a94,iVar3);
      return;
    }
    pbVar8 = FUN_005b8931(iVar4,iVar5);
    if (((s32(pbVar8, 0) & 0x80) !== 0) && (iVar7 = FUN_004bd9f0(iVar6,7), iVar7 === 0)) {
      FUN_004c4240(s_BRIDGEBUILDING_00634aa0,7,8);
      return;
    }
    uVar9 = FUN_005b94d5(iVar4,iVar5);
    if ((uVar9 & 0x20) !== 0) {
      FUN_004442e0(s_ALREADYROAD_00634ab0,iVar3);
      return;
    }
    uVar9 = FUN_005b94d5(iVar4,iVar5);
    if (((uVar9 & 0x10) !== 0) && (iVar7 = FUN_004bd9f0(iVar6,0x43), iVar7 === 0)) {
      FUN_004c4240(s_RAILROADS_00634abc,0x43,8);
      return;
    }
  }
  if (((param_1 === 6) || (param_1 === 7)) &&
     (s8(G.DAT_00627cc8[((bVar1) >>> 0) * 0x18 + param_1]) < 0)) {
    if (G.DAT_00627cc8[((bVar1) >>> 0) * 0x18 + param_1] === -1) {
      FUN_004442e0(s_CANTIMPROVE_00634ac8,iVar3);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4,iVar5);
    if (-1 < iVar7) {
      FUN_004442e0(s_CANTIMPROVE_00634ad4,iVar3);
      return;
    }
    if (param_1 === 7) {
      bVar1 = FUN_005b94d5(iVar4,iVar5);
      if ((bVar1 & 0xc) === 8) {
        FUN_00410030(s_ALREADYMINING_00634ae0,G.DAT_00644730,0);
        return;
      }
    }
    else {
      iVar7 = FUN_0058c56c(iVar4,iVar5);
      if (iVar7 === 0) {
        FUN_004442e0(s_NOWATER_00634af0,iVar3);
        return;
      }
      bVar1 = FUN_005b94d5(iVar4,iVar5);
      if ((bVar1 & 0xc) === 0xc) {
        FUN_004442e0(s_ALREADYFARMLAND_00634af8,iVar3);
        return;
      }
      uVar9 = FUN_005b94d5(iVar4,iVar5);
      if (((uVar9 & 4) !== 0) && (iVar6 = FUN_004bd9f0(iVar6,0x46), iVar6 === 0)) {
        FUN_004c4240(s_FARMLAND_00634b08,0x46,8);
        return;
      }
    }
  }
  if (param_1 === 8) {
    iVar6 = FUN_005b89e4(iVar4,iVar5);
    if (iVar6 !== 0) {
      FUN_004442e0(s_CANTIMPROVE_00634b14,iVar3);
      return;
    }
    if (G.DAT_006560f6[iVar3 * 0x20] !== 0x01) {
      FUN_004442a0(s_ENGINEERS_00634b20,1,(G.DAT_00633584 === 0) - 1 & 8);
      return;
    }
  }
  if ((param_1 === 9) && (uVar9 = FUN_005b94d5(iVar4,iVar5), (uVar9 & 0x80) === 0)) {
    FUN_00410030(s_NOPOLLUTION_00634b2c,G.DAT_00641808,8);
  }
  else {
    FUN_0047cea6(iVar4,iVar5);
    FUN_004c42a0(iVar3,param_1);
  }
  return;
}



// ============================================================
// Function: FUN_0058cbe1 @ 0x0058CBE1
// Size: 261 bytes
// ============================================================

export function FUN_0058cbe1() {


  let uVar1;
  let iVar2;
  let iVar3;
  let local_10;
  
  G.DAT_0062804c = 0;
  iVar2 = G.DAT_00655afe;
  iVar3 = FUN_0043cf76(s16(G.DAT_006560f0, iVar2 * 0x20),
                             s16(G.DAT_006560f2, iVar2 * 0x20));
  if (iVar3 < 0) {
    FUN_004c54da(iVar2);
  }
  else if ((G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar2 * 0x20]) * 0x14] === 7) &&
          (G.DAT_00656100[iVar2 * 0x20] !== -1)) {
    FUN_004442e0(s_CARAVANHOME_00634b38,iVar2);
  }
  else {
    uVar1 = G.DAT_00656100[iVar2 * 0x20];
    local_10 = u8(iVar3);
    G.DAT_00656100[iVar2 * 0x20] = local_10;
    thunk_citywin_C679(uVar1);
    thunk_citywin_C679(iVar3);
  }
  return;
}



// ============================================================
// Function: FUN_0058cce6 @ 0x0058CCE6
// Size: 255 bytes
// ============================================================

export function FUN_0058cce6() {


  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  
  G.DAT_0062804c = 0;
  iVar1 = G.DAT_00655afe;
  iVar2 = s16(G.DAT_006560f0, iVar1 * 0x20);
  iVar3 = s16(G.DAT_006560f2, iVar1 * 0x20);
  iVar4 = FUN_005b89e4(iVar2,iVar3);
  if (iVar4 === 0) {
    if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 0x01) {
      iVar4 = FUN_005b8ca6(iVar2,iVar3);
      if (iVar4 < 0) {
        iVar4 = FUN_005b8d15(iVar2,iVar3);
        if (iVar4 < 0) LAB_0058cd8e_helper(); return;
      }
    }
    G.DAT_006560ff[iVar1 * 0x20] = 1;
    FUN_005b6787(iVar1);
    FUN_0047cea6(iVar2,iVar3);
    thunk_citywin_C494(iVar1,0xffffff9d,0xffffff9d);
  }
  else {
// LAB_0058cd8e: (code below also in LAB_0058cd8e_helper, kept for 1:1 audit)
    FUN_00421ea0(s_CANTDO_00634b44);
  }
  return;
}



// ============================================================
// Function: FUN_0058cde5 @ 0x0058CDE5
// Size: 488 bytes
// ============================================================

export function FUN_0058cde5() {


  let cVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_8;
  
  G.DAT_0062804c = 0;
  iVar3 = G.DAT_00655afe;
  iVar4 = s16(G.DAT_006560f0, iVar3 * 0x20);
  iVar5 = s16(G.DAT_006560f2, iVar3 * 0x20);
  if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar3 * 0x20]) * 0x14] === 0x01) {
    bVar2 = false;
    iVar6 = FUN_005b89e4(iVar4,iVar5);
    if ((iVar6 !== 0) &&
       ((iVar6 = FUN_005b50ad(iVar3,9), iVar6 !== 0 ||
        (((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar3 * 0x20]) * 0x14] & 0x10) !== 0 &&
         (iVar6 = FUN_005b50ad(iVar3,10), iVar6 !== 0)))))) {
      bVar2 = true;
    }
    if ((!bVar2) && (iVar6 = FUN_005b8ca6(iVar4,iVar5), iVar6 < 0)) {
      FUN_00421ea0(s_CANTDO_00634b4c);
      return;
    }
  }
  if ((G.DAT_0064b1bc[u8(G.DAT_006560f6[iVar3 * 0x20]) * 0x14] & 0x20) !== 0) {
    bVar2 = false;
    for (local_8 = 0; local_8 < 9; local_8 = local_8 + 1) {
      uVar7 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + iVar4);
      cVar1 = G.DAT_00628360[local_8];
      iVar6 = FUN_004087c0(uVar7,cVar1 + iVar5);
      if ((iVar6 !== 0) && (iVar6 = FUN_005b89e4(uVar7,cVar1 + iVar5), iVar6 === 0)) {
        bVar2 = true;
      }
    }
    if (!bVar2) {
      FUN_00421ea0(s_CANTDO_00634b54);
      return;
    }
  }
  FUN_005b2f50(iVar3);
  return;
}



// ============================================================
// Function: FUN_0058cfcd @ 0x0058CFCD
// Size: 1105 bytes
// ============================================================

export function FUN_0058cfcd() {


  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  // DEVIATION: SEH
  let bVar7;
  let local_18;
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  local_18 = 0;
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar2 = G.DAT_00655afe;
  iVar3 = s8(G.DAT_006560f7[iVar2 * 0x20]);
  iVar4 = s16(G.DAT_006560f0, iVar2 * 0x20);
  iVar5 = s16(G.DAT_006560f2, iVar2 * 0x20);
  if (G.DAT_0064b1c4[u8(G.DAT_006560f6[iVar2 * 0x20]) * 0x14] === 0) {
    // DEVIATION: SEH
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar2 * 0x20]) * 0x14] !== 0) {
    // DEVIATION: SEH
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  iVar6 = FUN_005b8ca6(iVar4,iVar5);
  if (-1 < iVar6) {
    FUN_00421ea0(s_CANTDO_00634b5c);
    // DEVIATION: SEH
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  iVar6 = FUN_005b8931(iVar4,iVar5);
  // DEVIATION(C-syntax): true // DEVIATION: C pointer — bVar1 = *(byte *)(iVar6 + 1);
  if ((bVar1 & 0x5c) !== 0) {
    FUN_0040ffa0(s_PILLAGEWHAT_00634b6c,1);
    iVar6 = FUN_004a2379(G.DAT_006558e8,s_PILLAGEMENU_00634b78);
    if (iVar6 === 0) {
      FUN_004a23fc(1);
      bVar7 = (bVar1 & 0xc) === 0xc;
      if (((bVar7) ? 1 : 0)) {
        FUN_0059edf0(G.DAT_00679640,0xc,0);
      }
      FUN_004a23fc(1);
      if ((bVar1 & 0xc) === 4) {
        FUN_0059edf0(G.DAT_00679640,4,0);
        bVar7 = bVar7 + 1;
      }
      FUN_004a23fc(1);
      if ((bVar1 & 0xc) === 8) {
        FUN_0059edf0(G.DAT_00679640,8,0);
        bVar7 = bVar7 + 1;
      }
      FUN_004a23fc(1);
      if ((bVar1 & 0x42) === 0x42) {
        FUN_0059edf0(G.DAT_00679640,0x42,0);
        bVar7 = bVar7 + 1;
      }
      FUN_004a23fc(1);
      if ((bVar1 & 0x42) === 0x40) {
        FUN_0059edf0(G.DAT_00679640,0x40,0);
        bVar7 = bVar7 + 1;
      }
      FUN_004a23fc(1);
      if ((bVar1 & 0x20) === 0) {
        FUN_004a23fc(1);
        if ((bVar1 & 0x10) !== 0) {
          FUN_0059edf0(G.DAT_00679640,0x10,0);
          bVar7 = bVar7 + 1;
        }
      }
      else {
        FUN_0059edf0(G.DAT_00679640,0x20,0);
        bVar7 = bVar7 + 1;
      }
      if ((1 < bVar7) && (local_18 = FUN_0040bc80(0), local_18 < 0)) {
        // DEVIATION: SEH
        FUN_0058d41e();
        FUN_0058d434();
        return;
      }
    }
    iVar4 = FUN_0043d07a(iVar4,iVar5,0xffffffff,0xffffffff,0xffffffff);
    if (((0 < iVar4) && (iVar4 = s8(G.DAT_0064f348[iVar4 * 0x58]), -1 < iVar4)) &&
       (iVar4 !== iVar3)) {
      G.DAT_006ad0cc = 1;
      iVar5 = FUN_00579ed0(iVar3,iVar4,0xe);
      if (iVar5 !== 0) {
        // DEVIATION: SEH
        FUN_0058d41e();
        FUN_0058d434();
        return;
      }
      if ((G.DAT_0064c6c1[iVar4 * 4 + iVar3 * 0x594] & 0x20) === 0) {
        FUN_0045ac71(iVar3,iVar4,0xffffffff);
      }
    }
    FUN_004c50d0(iVar2,local_18);
    // DEVIATION: SEH
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  FUN_00421ea0(s_CANTDO_00634b64);
  // DEVIATION: SEH
  FUN_0058d41e();
  FUN_0058d434();
  return;
}



// ============================================================
// Function: FUN_0058d41e @ 0x0058D41E
// Size: 12 bytes
// ============================================================

export function FUN_0058d41e() {


  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0058d434 @ 0x0058D434
// Size: 14 bytes
// ============================================================

export function FUN_0058d434(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058d442 @ 0x0058D442
// Size: 451 bytes
// ============================================================

export function FUN_0058d442() {


  let iVar1;
  let uVar2;
  let local_8;
  
  G.DAT_0062804c = 0;
  if (G.DAT_006d1da8 === 1) {
    local_8 = G.DAT_00655afe;
    if (s32(G.DAT_0065610a, local_8 * 0x20) === 0) {
      G.DAT_0062804c = 0;
      return;
    }
    if (s8(G.DAT_006560f7[local_8 * 0x20]) !== G.DAT_006d1da0) {
      G.DAT_0062804c = 0;
      return;
    }
    iVar1 = FUN_005b50ad(local_8,2);
    if (iVar1 === 1) {
      return;
    }
  }
  else {
    local_8 = FUN_005b2e69(G.DAT_0064b1b4,G.DAT_0064b1b0);
    if (local_8 < 0) {
      return;
    }
    if (s8(G.DAT_006560f7[local_8 * 0x20]) !== G.DAT_006d1da0) {
      return;
    }
    if ((G.DAT_006560f7[local_8 * 0x20] !== G.DAT_00655b05) && (G.DAT_00655b07 === 0)) {
      return;
    }
    iVar1 = FUN_005b50ad(local_8,2);
    if (iVar1 === 1) LAB_0058d58e_helper(local_8); return;
  }
  uVar2 = FUN_00428b0c(s32(G.DAT_00628420, 0xf8),1);
  local_8 = FUN_005b6aea(local_8,uVar2);
  if (local_8 < 0) {
    return;
  }
// LAB_0058d58e: (code below also in LAB_0058d58e_helper, kept for 1:1 audit)
  G.DAT_00655afe = ((local_8) << 16 >> 16);
  G.DAT_006560ff[local_8 * 0x20] = 0xff;
  w16(G.DAT_006560f4, local_8 * 0x20, u16(G.DAT_006560f4, local_8 * 0x20) & 0x7fff
  );
  G.DAT_006d1da8 = 0;
  FUN_00489a0d(0);
  if (G.DAT_006560f8[local_8 * 0x20] === 0) {
    FUN_004274a6(local_8,1);
  }
  return;
}



// ============================================================
// Function: FUN_0058d60a @ 0x0058D60A
// Size: 165 bytes
// ============================================================

export function FUN_0058d60a() {


  let iVar1;
  let uVar2;
  
  iVar1 = G.DAT_00655afe;
  if ((G.DAT_006560f8[iVar1 * 0x20] === 0) &&
     ((u16(G.DAT_006560f4, iVar1 * 0x20) & 0x10) === 0)) {
    uVar2 = FUN_005b94d5(s16(G.DAT_006560f0, iVar1 * 0x20),
                               s16(G.DAT_006560f2, iVar1 * 0x20));
    if ((uVar2 & 2) === 0) {
      FUN_004442e0(s_PARADROPRULES2_00634b94,iVar1);
    }
    else {
      FUN_00410e46();
    }
  }
  else {
    FUN_004442e0(s_PARADROPRULES1_00634b84,iVar1);
  }
  return;
}



// ============================================================
// Function: FUN_0058d6af @ 0x0058D6AF
// Size: 1787 bytes
// ============================================================

export function FUN_0058d6af() {


  let cVar1;
  let cVar2;
  let cVar3;
  let sVar4;
  let bVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let iVar11;
  let iVar12;
  let iVar13;
  let iVar14;
  let uVar15;
  let uVar16;
  // DEVIATION: SEH
  let local_330;
  let local_32c;
  let local_320;
  let local_23c;
  let local_18;
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_0059db08(0x2000);
  local_8 = 0;
  iVar6 = G.DAT_00655afe;
  iVar7 = s8(G.DAT_006560f7[iVar6 * 0x20]);
  iVar8 = s16(G.DAT_006560f0, iVar6 * 0x20);
  iVar9 = s16(G.DAT_006560f2, iVar6 * 0x20);
  iVar10 = FUN_005b8a81(iVar8,iVar9);
  iVar11 = FUN_005b89e4(iVar8,iVar9);
  cVar1 = G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14];
  bVar5 = false;
  do {
    // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(0,*(undefined4 *)
                          // DEVIATION(cont): (&G.DAT_0064b1b8 + (uint)(byte)(&G.DAT_006560f6)[iVar6 * 0x20] * 0x14));
    FUN_0040ffa0(G.DAT_00634ba4,0x800001);
    local_32c = 0;
    for (local_330 = 0; local_330 < G.DAT_00655b18; local_330 = local_330 + 1) {
      if ((s32(G.DAT_0064f394, local_330 * 0x58) !== 0) &&
         ((s8(G.DAT_0064f348[local_330 * 0x58]) === iVar7 || (bVar5)))) {
        iVar12 = FUN_005b8a81(s16(G.DAT_0064f340, local_330 * 0x58),
                                    s16(G.DAT_0064f342, local_330 * 0x58));
        if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14] === 0x02) {
          if (iVar11 === 0) {
            uVar15 = FUN_0043cf76(iVar8,iVar9);
            if (local_330 < 0) LAB_0058daa2_helper(bVar5, cVar1, cVar3, iVar12, iVar6, iVar7, local_18, local_23c, local_320, local_32c, local_330, sVar4, uVar15, uVar16); return;
            iVar12 = FUN_004429af(uVar15,local_330);
          }
          else {
            iVar12 = FUN_0044263f(local_330,iVar10);
          }
          if (iVar12 === 0) LAB_0058d80c_helper(bVar5, iVar12, iVar6, local_23c, local_32c); return;
        }
        else if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14] === 0) {
          if (iVar12 !== iVar10) LAB_0058d80c_helper(bVar5, iVar12, iVar6, local_23c, local_32c); return;
        }
        else if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14] === 0x01) &&
                (G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14] !== 0)) {
          cVar3 = G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar6 * 0x20]) * 0x14];
          cVar2 = G.DAT_006560fd[iVar6 * 0x20];
          iVar12 = FUN_005b2a39(iVar6);
          iVar13 = FUN_005b2c3d(iVar6);
          uVar16 = ((G.DAT_0064bcc8) >>> 0);
          iVar14 = FUN_005ae1b0(iVar8,iVar9,s16(G.DAT_0064f340, local_330 * 0x58),
                                      s16(G.DAT_0064f342, local_330 * 0x58));
          if ((iVar13 + (cVar3 - (cVar2 + 1)) * iVar12) / uVar16 < iVar14)
          LAB_0058d80c_helper(bVar5, iVar12, iVar6, local_23c, local_32c); return;
        }
// LAB_0058daa2: (code below also in LAB_0058daa2_helper, kept for 1:1 audit)
        if (((s8(G.DAT_0064f348[local_330 * 0x58]) === iVar7) ||
            (G.DAT_0064f34d[local_330 * 0x58 + iVar7] !== 0)) || (G.DAT_00655b07 !== 0)) {
          FUN_0040bbb0();
          FUN_0040bbe0(G.DAT_0064f360 + local_330 * 0x58);
          if (cVar1 === 0x05) {
            local_320 = 0;
            for (local_18 = 0; local_18 < 0x14; local_18 = local_18 + 1) {
              uVar15 = FUN_005ae052(s16(G.DAT_0064f340, local_330 * 0x58) +
                                          s8(G.DAT_00628370[local_18]));
              sVar4 = s16(G.DAT_0064f342, local_330 * 0x58);
              cVar3 = G.DAT_006283a0[local_18];
              iVar12 = FUN_004087c0(uVar15,sVar4 + cVar3);
              if ((iVar12 !== 0) &&
                 (uVar16 = FUN_005b94d5(uVar15,sVar4 + cVar3), (uVar16 & 0x80) !== 0)
                 ) {
                local_320 = local_320 + 1;
              }
            }
            if (local_320 !== 0) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(local_320);
              FUN_0040fe10();
              FUN_0040bc10(0x2f);
              FUN_0040fed0();
            }
          }
          if ((s8(G.DAT_0064f348[local_330 * 0x58]) === iVar7) &&
             (iVar12 = FUN_0043d20a(local_330,0x20), iVar12 !== 0)) {
            FUN_0040fe10();
            FUN_0040fea0();
            FUN_0040ff00(G.DAT_0064c588);
            FUN_0040fed0();
          }
          FUN_0059edf0(G.DAT_00679640,local_330,0);
          local_32c = local_32c + 1;
        }
      }
// LAB_0058d80c: (code below also in LAB_0058d80c_helper, kept for 1:1 audit)
    }
    if (local_32c === 0) {
      if (bVar5) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = true;
    }
    else {
      iVar12 = FUN_0040bc80(0);
      if (iVar12 < 0) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      if (local_23c === 0) {
        G.DAT_006560ff[iVar6 * 0x20] = 0xb;
        w16(G.DAT_00656102, iVar6 * 0x20, 
             s16(G.DAT_0064f340, iVar12 * 0x58));
        w16(G.DAT_00656104, iVar6 * 0x20, 
             s16(G.DAT_0064f342, iVar12 * 0x58));
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = !bVar5;
    }
  } while( true );
}



// ============================================================
// Function: FUN_0058ddaa @ 0x0058DDAA
// Size: 12 bytes
// ============================================================

export function FUN_0058ddaa() {


  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0058ddc0 @ 0x0058DDC0
// Size: 14 bytes
// ============================================================

export function FUN_0058ddc0(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058ddce @ 0x0058DDCE
// Size: 326 bytes
// ============================================================

export function FUN_0058ddce() {


  let iVar1;
  let local_c;
  let local_8;
  
  local_c = -1;
  if (-1 < G.DAT_00655afe) {
    iVar1 = G.DAT_00655afe;
    if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 0x02) {
      w16(G.DAT_006560f4, iVar1 * 0x20, u16(G.DAT_006560f4, iVar1 * 0x20) | 0x4000
      );
    }
    for (local_8 = FUN_005b2d39(G.DAT_00655afe); -1 < local_8;
        local_8 = FUN_005b2c82(local_8)) {
      if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[local_8 * 0x20]) * 0x14] === 0) &&
         (G.DAT_006560ff[local_8 * 0x20] === 0x03)) {
        G.DAT_006560ff[local_8 * 0x20] = 0xff;
        iVar1 = FUN_005b633f(local_8);
        if (iVar1 !== 0) {
          local_c = local_8;
        }
      }
    }
    if (-1 < local_c) {
      G.DAT_00655afe = ((local_c) << 16 >> 16);
      G.DAT_006d1da8 = 0;
      FUN_00489a0d(0);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0058df14 @ 0x0058DF14
// Size: 103 bytes
// ============================================================

export function FUN_0058df14() {


  let iVar1;
  
  iVar1 = G.DAT_00655afe;
  if (G.DAT_0064b1ca[u8(G.DAT_006560f6[iVar1 * 0x20]) * 0x14] === 0x05) {
    w16(G.DAT_006560f4, iVar1 * 0x20, u16(G.DAT_006560f4, iVar1 * 0x20) | 0x8000);
  }
  return;
}



// ============================================================
// Function: FUN_0058df7b @ 0x0058DF7B
// Size: 1609 bytes
// ============================================================

export function FUN_0058df7b() {


  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  // DEVIATION: SEH
  let local_320;
  let local_31c;
  let local_314;
  let local_18;
  let local_14;
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_0059db08(0x2000);
  local_8 = 0;
  iVar2 = G.DAT_00655afe;
  if (iVar2 < 0) {
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar3 = s8(G.DAT_006560f7[iVar2 * 0x20]);
  if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar2 * 0x20]) * 0x14] === 0x02) {
    FUN_004442e0(s_LIFTSHIP_00634bac,iVar2);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if (G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar2 * 0x20]) * 0x14] === 0x01) {
    FUN_004442e0(s_LIFTPLANE_00634bb8,iVar2);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar4 = FUN_0043cf76(s16(G.DAT_006560f0, iVar2 * 0x20),
                             s16(G.DAT_006560f2, iVar2 * 0x20));
  if (iVar4 < 0) {
    FUN_00410030(s_NOAIRPORT_00634bc4,G.DAT_0063fc58,0);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar5 = FUN_0043d20a(iVar4,0x20);
  if (iVar5 === 0) {
    FUN_00414dd0(s_NOAIRPORT_00634bd0,iVar4);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if ((G.DAT_0064f346[iVar4 * 0x58] & 1) !== 0) {
    FUN_0040ff60(0,G.DAT_0064f360 + iVar4 * 0x58);
    FUN_00414dd0(s_ALREADYAIRLIFT_00634bdc,iVar4);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  FUN_0040ffa0(s_AIRLIFTSELECT_00634bec,1);
  local_314 = 0;
  for (local_14 = 0; local_14 < G.DAT_00655b18; local_14 = local_14 + 1) {
    if ((((s32(G.DAT_0064f394, local_14 * 0x58) !== 0) &&
         (s8(G.DAT_0064f348[local_14 * 0x58]) === iVar3)) && (local_14 !== iVar4)) &&
       (iVar5 = FUN_0043d20a(local_14,0x20), iVar5 !== 0)) {
      local_314 = local_314 + 1;
      FUN_0059edf0(G.DAT_0064f360 + local_14 * 0x58,local_14,0);
    }
  }
  if (local_314 === 0) {
    FUN_004cc870(s_NOAIRPORT2_00634bfc,0x20,8);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar5 = FUN_0040bc80(0);
  if (iVar5 < 0) {
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if ((G.DAT_0064f346[iVar5 * 0x58] & 1) !== 0) {
    FUN_0040ff60(0,G.DAT_0064f360 + iVar5 * 0x58);
    FUN_00414dd0(s_ALREADYAIRLIFT_00634c08,iVar4);
    // DEVIATION: SEH
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  local_31c = 0;
  local_320 = 0;
  do {
    if (G.DAT_00655b16 <= local_320) {
      if ((local_31c !== 0) &&
         (iVar3 = FUN_004442a0(s_ENEMYFIGHTERS_00634c18,0x1b,(G.DAT_00633584 === 0) - 1 & 8),
         iVar3 === 0)) {
        // DEVIATION: SEH
        FUN_0058e5c4();
        FUN_0058e5da();
        return;
      }
      FUN_004ca1cd(iVar2,iVar4,iVar5,local_31c,local_18);
      // DEVIATION: SEH
      FUN_0058e5c4();
      FUN_0058e5da();
      return;
    }
    iVar1 = local_31c;
    if (((s32(G.DAT_0065610a, local_320 * 0x20) !== 0) &&
        (s8(G.DAT_006560f7[local_320 * 0x20]) !== iVar3)) &&
       ((G.DAT_0064b1ca[u8(G.DAT_006560f6[local_320 * 0x20]) * 0x14] === 0x03 &&
        ((G.DAT_0064c6c1[s8(G.DAT_006560f7[local_320 * 0x20]) * 4 + iVar3 * 0x594] & 0x20) !== 0)
        ))) {
      iVar6 = FUN_005b2a39(local_320);
      uVar8 = ((G.DAT_0064bcc8) >>> 0);
      iVar7 = FUN_005ae1b0(s16(G.DAT_0064f340, iVar4 * 0x58),
                                 s16(G.DAT_0064f342, iVar4 * 0x58),
                                 s16(G.DAT_006560f0, local_320 * 0x20),
                                 s16(G.DAT_006560f2, local_320 * 0x20));
      if (iVar6 / uVar8 < iVar7) {
        iVar6 = FUN_005b2a39(local_320);
        uVar8 = ((G.DAT_0064bcc8) >>> 0);
        iVar7 = FUN_005ae1b0(s16(G.DAT_0064f340, iVar5 * 0x58),
                                   s16(G.DAT_0064f342, iVar5 * 0x58),
                                   s16(G.DAT_006560f0, local_320 * 0x20),
                                   s16(G.DAT_006560f2, local_320 * 0x20));
        if (iVar6 / uVar8 < iVar7) LAB_0058e34c_helper(iVar1, local_31c, local_320); return;
      }
      local_18 = s8(G.DAT_006560f7[local_320 * 0x20]);
      iVar1 = local_31c + 1;
      if ((u16(G.DAT_006560f4, local_320 * 0x20) & 0x2000) !== 0) {
        iVar1 = local_31c + 2;
      }
    }
// LAB_0058e34c: (code below also in LAB_0058e34c_helper, kept for 1:1 audit)
    local_31c = iVar1;
    local_320 = local_320 + 1;
  } while( true );
}



// ============================================================
// Function: FUN_0058e5c4 @ 0x0058E5C4
// Size: 12 bytes
// ============================================================

export function FUN_0058e5c4() {


  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0058e5da @ 0x0058E5DA
// Size: 14 bytes
// ============================================================

export function FUN_0058e5da(unaff_EBP) {


  // unaff_EBP → promoted to parameter
  // DEVIATION: SEH
  
  // DEVIATION: SEH
  return;
}



// ============================================================
// Function: FUN_0058f010 @ 0x0058F010
// Size: 48 bytes
// ============================================================

export function FUN_0058f010(param_1) {


  if (G.DAT_006ad0d0 !== 0) {
    FUN_00421ea0(param_1);
  }
  return;
}



// ============================================================
// Function: FUN_0058f040 @ 0x0058F040
// Size: 3404 bytes
// ============================================================

export function FUN_0058f040(param_1) {


  let bVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let uVar7;
  let uVar8;
  let iVar9;
  let uVar10;
  let local_60;
  let local_50;
  let local_4c;
  let local_48;
  let local_40;
  let local_3c;
  let local_38;
  let local_28;
  let local_20;
  let local_14;
  let local_10;
  let local_c;
  let local_8;
  
  bVar2 = G.DAT_006560f7[param_1 * 0x20];
  uVar3 = ((s8(bVar2)) >>> 0);
  iVar4 = s16(G.DAT_006560f0, param_1 * 0x20);
  uVar5 = ((s16(G.DAT_006560f2, param_1 * 0x20)) >>> 0);
  local_50 = uVar5;
  if ((uVar3 !== 0) &&
     (local_50 = s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]),
     s8(G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0)) {
    FUN_0043d07a(iVar4,uVar5,0xffffffff,0xffffffff,0xffffffff);
    iVar6 = _rand();
    local_50 = iVar6 % 5;
    if ((((((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) || (iVar6 = _rand(), iVar6 % 3 === 0))
         && ((s16(G.DAT_0064c708, uVar3 * 0x594) !== 0 &&
             (iVar6 = FUN_005b8a81(iVar4,uVar5),
             G.DAT_0064c932[uVar3 * 0x594 + iVar6] === 0)))) &&
        (((G.DAT_0064c9f2[uVar3 * 0x594 + iVar6] & 0x7f) === 0 || (0xc < G.DAT_0063f660)))) &&
       (G.DAT_0064c932[uVar3 * 0x594 + iVar6] === 0)) {
      local_50 = 0;
    }
// LAB_0058f1bc: (code below also in LAB_0058f1bc_helper, kept for 1:1 audit)
    switch(local_50) {
    case 0:
      if (G.DAT_0063f660 < 4) {
        local_50 = 1;
        LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      if ((s16(G.DAT_0064c708, uVar3 * 0x594) === 0) && (G.DAT_00655af8 < 0x32)) {
        local_8 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if (((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_8 = local_8 + 1;
          }
        }
        if (1 < local_8) {
          local_50 = 1;
          LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      iVar6 = FUN_005b8c42(iVar4,uVar5);
      if (0xb < iVar6) {
        if (G.DAT_006ad0d0 !== 0) {
          FUN_00410030(s_SURPRISETRIBE_00634ca4,G.DAT_0063fc58,0);
        }
        iVar6 = thunk_create_city(iVar4,uVar5,uVar3);
        if (999 < G.DAT_00655afa) {
          iVar9 = _rand();
          bVar2 = u8(iVar9 >> 0x1f);
          G.DAT_0064f349[iVar6 * 0x58] =
               (((u8(iVar9) ^ bVar2) - bVar2 & 3 ^ bVar2) - bVar2) + 0x01;
          FUN_0043d289(iVar6,4,1);
          uVar3 = _rand();
          uVar7 = uVar3 >> 0x1f;
          if (((uVar3 ^ uVar7) - uVar7 & 1 ^ uVar7) === uVar7) {
            FUN_0043d289(iVar6,5,1);
          }
          iVar9 = _rand();
          if (iVar9 % 3 === 0) {
            FUN_0043d289(iVar6,3,1);
          }
          uVar3 = _rand();
          uVar7 = uVar3 >> 0x1f;
          if (((uVar3 ^ uVar7) - uVar7 & 3 ^ uVar7) === uVar7) {
            FUN_0043d289(iVar6,6,1);
          }
        }
        if (G.DAT_006ad0d0 === 0) {
          return 0;
        }
        FUN_0047cf22(iVar4,uVar5);
        uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
        if (iVar6 < 0) {
          return uVar3;
        }
        uVar3 = thunk_handle_city_disorder_00509590(iVar6);
        return uVar3;
      }
      local_50 = 5;
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    case 1:
      if (G.DAT_006ad0d0 !== 0) {
        FUN_00410030(s_SURPRISEMERCS_00634d04,G.DAT_0063fc58,0);
      }
      local_14 = 0x13;
      if (G.DAT_00655b8d === 0) {
        iVar6 = _rand();
        if (iVar6 % 3 === 0) {
          local_14 = 0x10;
        }
        else {
          local_14 = 0xf;
        }
        if (G.DAT_00655bc2 !== 0) {
          uVar7 = _rand();
          uVar10 = uVar7 >> 0x1f;
          if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) {
            local_14 = 0x11;
          }
        }
      }
      if (G.DAT_00655bb9 !== 0) {
        local_14 = 0x12;
      }
      if (G.DAT_00655bac !== 0) {
        local_14 = 0x14;
      }
      if (G.DAT_00655b93 !== 0) {
        local_14 = 0xb;
      }
      local_c = 8;
      if (G.DAT_00655ba4 === 0) {
        local_c = 7;
      }
      if (G.DAT_00655ba5 === 0) {
        local_c = 5;
      }
      if (G.DAT_00655ba9 === 0) {
        local_c = 4;
      }
      uVar7 = _rand();
      uVar10 = uVar7 >> 0x1f;
      if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) === uVar10) {
        local_60 = local_14;
      }
      else {
        local_60 = local_c;
      }
      iVar6 = FUN_005b3d06(local_60,uVar3,iVar4,uVar5);
      if ((G.DAT_006ad0d0 === 0) && (G.DAT_006d1da0 !== uVar3)) {
        local_50 = uVar3;
        if (-1 < iVar6) {
          local_50 = iVar6 * 0x20;
          G.DAT_00656100[local_50] = 0xff;
        }
      }
      else {
        FUN_0047cf22(iVar4,uVar5);
        local_50 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
      }
      break;
    case 2:
      local_20 = 0x32;
      iVar4 = _rand();
      if (iVar4 % 3 === 0) {
        iVar4 = _rand();
        if (((iVar4 % 10 - ((G.DAT_00655b08) | 0)) + 2) < 5) {
          local_20 = 0x19;
        }
        else {
          local_20 = 100;
        }
      }
      if (1000 < G.DAT_00655afa) {
        local_20 = local_20 << 1;
      }
      w32(G.DAT_0064c6a2, uVar3 * 0x594, s32(G.DAT_0064c6a2, uVar3 * 0x594) + local_20);
      FUN_00421da0(0,local_20);
      if (G.DAT_006ad0d0 !== 0) {
        FUN_00410030(s_SURPRISEMETALS_00634cd4,G.DAT_0063fc58,0);
      }
      if (G.DAT_006d1da0 !== uVar3) {
        return uVar3;
      }
      uVar3 = FUN_00569363(1);
      return uVar3;
    case 3:
      if ((G.DAT_0063f660 < 4) ||
         ((s16(G.DAT_0064c708, uVar3 * 0x594) === 0 && (G.DAT_00655af8 < 0x32)))) {
        local_50 = 1;
        LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      if (((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) &&
         (u8(G.DAT_00655c22[uVar3]) < u8(G.DAT_00655c22[G.DAT_00655c21]))) {
        uVar7 = _rand();
        uVar10 = uVar7 >> 0x1f;
        if (((uVar7 ^ uVar10) - uVar10 & 7 ^ uVar10) - uVar10 < ((G.DAT_00655b08) | 0)) {
          local_50 = 0;
          LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      bVar1 = false;
      if (G.DAT_00655b09 < 3) {
        if (G.DAT_00655af8 < 0x1e) {
// LAB_0058f87c: (code below also in LAB_0058f87c_helper, kept for 1:1 audit)
          FUN_0043d07a(iVar4,uVar5,uVar3,0xffffffff,0xffffffff);
          iVar6 = FUN_005b8a81(iVar4,uVar5);
          if ((G.DAT_0064c932[uVar3 * 0x594 + iVar6] !== 0) && (G.DAT_0063f660 < 0x18)) {
            if (G.DAT_006ad0d0 === 0) {
              return 0;
            }
            uVar3 = FUN_00410030(s_SURPRISENOTHING_00634ce4,G.DAT_0063fc58,0);
            return uVar3;
          }
        }
        else if (G.DAT_00655af8 < 0x32) {
          uVar7 = _rand();
          uVar10 = uVar7 >> 0x1f;
          if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) === uVar10) LAB_0058f87c_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      if (0x31 < G.DAT_00655af8) {
        if (0x4a < G.DAT_00655af8) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar3, uVar5, uVar7, uVar8); return;
        uVar7 = _rand();
        uVar10 = uVar7 >> 0x1f;
        if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar3, uVar5, uVar7, uVar8); return;
      }
      bVar1 = true;
// LAB_0058f939: (code below also in LAB_0058f939_helper, kept for 1:1 audit)
      uVar7 = 0;
      if (G.DAT_006ad0d0 !== 0) {
        uVar7 = FUN_00410030(s_SURPRISEBARB_00634cf4,G.DAT_0063fc58,0);
      }
      local_10 = 0;
      do {
        if (7 < local_10) {
          return uVar7;
        }
        uVar7 = G.DAT_00655af8 + local_10 >> 0x1f;
        iVar6 = ((G.DAT_00655af8 + local_10 ^ uVar7) - uVar7 & 7 ^ uVar7) - uVar7;
        uVar8 = FUN_005ae052(s8(G.DAT_00628350[iVar6]) + iVar4);
        iVar6 = s8(G.DAT_00628360[iVar6]) + uVar5;
        iVar9 = FUN_004087c0(uVar8,iVar6);
        if ((((iVar9 !== 0) && (iVar9 = FUN_005b8d62(uVar8,iVar6), iVar9 < 0)) &&
            (iVar9 = FUN_005b8ca6(uVar8,iVar6), iVar9 < 0)) &&
           (iVar9 = FUN_005b89e4(uVar8,iVar6), iVar9 === 0)) {
          bVar2 = FUN_005b89bb(uVar8,iVar6);
          local_28 = 5;
          local_3c = 0xf;
          if (G.DAT_00655bb5 !== 0) {
            local_28 = 7;
            local_3c = 0x13;
          }
          if (G.DAT_00655b82[G.DAT_0064b383] !== 0) {
            local_28 = 0xb;
            local_3c = 0x15;
          }
          if (G.DAT_00655ba4 !== 0) {
            local_28 = 8;
            local_3c = 9;
          }
          if (s8(G.DAT_00627cc8[((bVar2) >>> 0) * 0x18]) < 0x03) {
            local_38 = local_3c;
          }
          else {
            local_38 = local_28;
          }
          uVar7 = FUN_005b3d06(local_38,0,uVar8,iVar6);
          if (-1 < uVar7) {
            iVar9 = FUN_005b8931(iVar4,uVar5);
            // DEVIATION(C-syntax): true // DEVIATION: C pointer — G.DAT_006560f9[uVar7 * 0x20] = *(byte *)(iVar9 + 4) | G.DAT_006560f9[uVar7 * 0x20];
            FUN_0047cea6(uVar8,iVar6);
            uVar7 = ((G.DAT_00655b02) >>> 0);
            if (2 < G.DAT_00655b02) {
              uVar7 = FUN_0046b14d(0x72,0xff,uVar8,iVar6,0,0,0,0,0,0);
            }
          }
          if (bVar1) {
            return uVar7;
          }
        }
        uVar7 = FUN_005adfa0(4 - s16(G.DAT_0064c708, uVar3 * 0x594),1,4);
        local_10 = local_10 + uVar7;
      } while( true );
    case 4:
      if ((G.DAT_00655af8 === 0) || (iVar6 = FUN_004bd9f0(uVar3,0x26), iVar6 !== 0)) {
        local_50 = 2;
      }
      else {
        local_40 = 0;
        local_4c = _rand();
        local_4c = local_4c % 100;
        do {
          iVar6 = FUN_004bfdbe(uVar3,local_4c);
          if (iVar6 === 0) {
            uVar7 = (local_4c + 1) / 100;
            local_4c = (local_4c + 1) % 100;
          }
          else {
            if (G.DAT_006ad0d0 !== 0) {
              FUN_00410030(s_SURPRISESCROLLS_00634cc4,G.DAT_0063fc58,0);
            }
            uVar7 = FUN_004bf05b(uVar3,local_4c,uVar3,0,0);
            local_4c = -1;
          }
          local_40 = local_40 + 1;
        } while ((local_40 < 999) && (-1 < local_4c));
        if (local_4c < 0) {
          return uVar7;
        }
        local_50 = 0;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    case 5:
      if (G.DAT_00655b9e === 0) {
        local_48 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if ((((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
               (s8(G.DAT_006560f7[param_1 * 0x20]) === uVar3)) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_48 = local_48 + 1;
          }
        }
        if (local_48 <= s16(G.DAT_0064c708, uVar3 * 0x594) >> 3) {
          if (G.DAT_006ad0d0 !== 0) {
            FUN_00410030(s_SURPRISENOMADS_00634cb4,G.DAT_0063fc58,0);
          }
          iVar6 = FUN_005b3d06(0,uVar3,iVar4,uVar5);
          if (-1 < iVar6) {
            G.DAT_00656100[iVar6 * 0x20] = 0xff;
          }
          if (G.DAT_006ad0d0 === 0) {
            return 0;
          }
          FUN_0047cf22(iVar4,uVar5);
          uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
          return uVar3;
        }
        local_50 = 4;
      }
      else {
        local_50 = 2;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    default:
      break;
    }
  }
  return local_50;
}



// ============================================================
// Function: FUN_0058fda9 @ 0x0058FDA9
// Size: 306 bytes
// ============================================================

export function FUN_0058fda9(param_1, param_2, param_3) {


  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_8;
  
  iVar1 = FUN_005b89e4(param_1,param_2);
  FUN_005b9ec6();
  for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
    iVar3 = s8(G.DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2,iVar3);
    if ((((iVar4 !== 0) && (iVar4 = FUN_005b89e4(uVar2,iVar3), iVar4 === iVar1)) &&
        (iVar4 = FUN_005b8d62(uVar2,iVar3), -1 < iVar4)) &&
       (FUN_004272d0(uVar2,iVar3,param_3), G.DAT_006d1da0 === param_3)) {
      FUN_0047ce1e(uVar2,iVar3,0,param_3,1);
      FUN_0046b14d(0x75,0xff,uVar2,iVar3,0,0,0,0,0,0);
    }
  }
  FUN_005b9f1c();
  return;
}



// ============================================================
// Function: FUN_0058fedb @ 0x0058FEDB
// Size: 1831 bytes
// ============================================================

export function FUN_0058fedb(param_1, param_2) {


  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  // DEVIATION: SEH
  let cVar5;
  let uVar6;
  let uVar7;
  let local_31c;
  let local_318;
  let local_310;
  let local_18;
  // DEVIATION: SEH local
  // DEVIATION: SEH local
  let local_8;
  
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  // DEVIATION: SEH
  FUN_0059db08(0x4000);
  local_8 = 0;
  if (G.DAT_00654fa8 !== 0) {
    // DEVIATION: SEH
    FUN_00590607();
    FUN_0059061d();
    return;
  }
  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  iVar3 = s8(bVar1);
  local_31c = 1;
  if ((s8(G.DAT_00656100[param_1 * 0x20]) === param_2) &&
     ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
    local_31c = 0;
  }
  if (s8(G.DAT_0064f348[param_2 * 0x58]) === iVar3) {
    if (((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) &&
       ((G.DAT_0064f345[param_2 * 0x58] & 2) !== 0)) {
      local_31c = 0;
    }
    if ((G.DAT_006560ff[param_1 * 0x20] === '\v') &&
       ((s16(G.DAT_0064f340, param_2 * 0x58) !== s16(G.DAT_00656102, param_1 * 0x20) ||
        (s16(G.DAT_0064f342, param_2 * 0x58) !== s16(G.DAT_00656104, param_1 * 0x20))))
       ) {
      local_31c = 0;
    }
  }
  if (((((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0) && (G.DAT_006d1da0 === iVar3)) &&
      (s8(G.DAT_0064f348[param_2 * 0x58]) === iVar3)) && (local_31c !== 0)) {
    if (s8(G.DAT_006560fd[param_1 * 0x20]) < 0) {
      FUN_004271e8(0,s32(G.DAT_00628420, 0x100));
    }
    else {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_004271e8(0,*(undefined4 *)
                            // DEVIATION(cont): (&G.DAT_0064b168 + (char)(&G.DAT_006560fd)[param_1 * 0x20] * 4));
    }
    FUN_0043c9d0(s_CARAVANMENU_00634d14);
    FUN_0059ec88(G.DAT_00641848 + u8(G.DAT_006560f6[param_1 * 0x20]) * 0x3c,0,0);
    if (-1 < s8(G.DAT_006560fd[param_1 * 0x20])) {
      FUN_0040bbb0();
      FUN_0040bbe0(G.DAT_0064f360 + param_2 * 0x58);
      FUN_0040fe10();
      bVar2 = false;
      for (local_18 = 0; local_18 < 3; local_18 = local_18 + 1) {
        if (G.DAT_0064f37e[param_2 * 0x58 + local_18] === G.DAT_006560fd[param_1 * 0x20]) {
          bVar2 = true;
        }
      }
      if (bVar2) {
        FUN_0040bc10(0x133);
      }
      else {
        FUN_0040bc10(0x134);
      }
      FUN_0040fe10();
      FUN_0040ff00(s32(G.DAT_0064b168, s8(G.DAT_006560fd[param_1 * 0x20]) * 4))
      ;
      FUN_0043c810();
      FUN_0059e18b(G.DAT_00679640,0xffffffff,0xffffffff,0xffffffff,0);
    }
    uVar7 = 0;
    uVar6 = 0;
    uVar4 = FUN_00428b0c(s32(G.DAT_00628420, 0x284),0,0);
    FUN_0059edf0(uVar4,uVar6,uVar7);
    cVar5 = s8(G.DAT_00656100[param_1 * 0x20]) !== param_2;
    if (((cVar5) ? 1 : 0)) {
      uVar7 = 0;
      uVar6 = 1;
      uVar4 = FUN_00428b0c(s32(G.DAT_00628420, 0x288),1,0);
      FUN_0059edf0(uVar4,uVar6,uVar7);
    }
    if (s8(G.DAT_0064f379[param_2 * 0x58]) < -0x26) {
      uVar7 = 0;
      uVar6 = 2;
      uVar4 = FUN_00428b0c(s32(G.DAT_00628420, 0x28c),2,0);
      FUN_0059edf0(uVar4,uVar6,uVar7);
      cVar5 = cVar5 + 0x01;
    }
    local_31c = 0;
    if (cVar5 !== 0) {
      local_31c = FUN_0040bc80(0);
    }
  }
  if (local_31c !== 1) {
    if (local_31c !== 2) {
      // DEVIATION: SEH
      FUN_00590607();
      FUN_0059061d();
      return;
    }
    if (G.DAT_006560f6[param_1 * 0x20] === 49) {
      FUN_0046e020(0x16,1,0,0);
    }
    else {
      FUN_0046e020(0x2c,1,0,0);
    }
    w16(G.DAT_0064f35c, param_2 * 0x58, 
         ((s8(G.DAT_0064b1c8[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14])) << 16 >> 16) *
         ((G.DAT_0064bccc) & 0xFFFF) + s16(G.DAT_0064f35c, param_2 * 0x58);
    FUN_0040ff60(0,G.DAT_0064f360 + param_2 * 0x58);
    FUN_00421da0(0,s8(G.DAT_0064b1c8)
                                    [u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] *
                         ((G.DAT_0064bccc) >>> 0));
    if (s8(G.DAT_0064f379[param_2 * 0x58]) < 0x01) {
      local_318 = ~s8(G.DAT_0064f379[param_2 * 0x58]) + 1;
    }
    else {
      local_318 = s8(G.DAT_0064f379[param_2 * 0x58]);
    }
    local_310 = u8(G.DAT_0064c48c[local_318 * 8]) * ((G.DAT_0064bccc) >>> 0) -
                s16(G.DAT_0064f35c, param_2 * 0x58);
    if (local_310 < 0) {
      local_310 = 0;
    }
    FUN_00421da0(1,local_310);
    FUN_00421ea0(s_ADDTOWONDER_00634d20);
    if (G.DAT_00656100[param_1 * 0x20] !== -1) {
      u32(G.DAT_0064f344, u8(G.DAT_00656100[param_1 * 0x20]) * 0x58) =
           u32(G.DAT_0064f344, u8(G.DAT_00656100[param_1 * 0x20]) * 0x58) | 0x20000;
    }
    FUN_005b6042(param_1,1);
    if (2 < G.DAT_00655b02) {
      FUN_004b0b53(0xff,2,0,0,0);
    }
    // DEVIATION: SEH
    FUN_00590607();
    FUN_0059061d();
    return;
  }
  FUN_00440750(param_1,param_2);
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff,2,0,0,0);
  }
  // DEVIATION: SEH
  FUN_00590607();
  FUN_0059061d();
  return;
}




// ── GOTO HELPERS (not mapped to C lines — see RULES.md) ──
function LAB_00582cbe_helper(bVar1, bVar2, bVar3, bVar4, bVar5, bVar6, iVar10, iVar13, iVar15, iVar16, iVar8, iVar9, local_14, local_18, local_20, local_30, local_38, local_60, local_64, local_8, local_a0, local_ac, local_b0, local_bc, local_c, local_c0, local_e0, local_e4, param_1, uVar11, uVar12, uVar14, uVar17, uVar7) {
  if (local_c0 === 0) {
    G.DAT_0062c5bc = 1;
  }
  if (bVar3) {
    G.DAT_0066bfc4 = -1;
    if ((((local_c0 === 0) ||
         (G.DAT_0064b1c1[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14] !== 0x01)) ||
        (-1 < G.DAT_006acb08)) &&
       (((local_c0 !== 0 ||
         (G.DAT_0064b1c1[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0x01)) ||
        ((G.DAT_0064b1bd[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)))) {
      if (local_ac !== 0) {
        FUN_0046e020(0x23,1,0,0);
      }
    }
    else if (local_c0 === 0) {
      if (u8(G.DAT_006560f6[param_1 * 0x20]) < 0x1e) {
        FUN_0046e020(0x17,1,0,0);
      }
      else {
        FUN_0046e020(0x4f,1,0,0);
      }
    }
    else if (u8(G.DAT_006560f6[local_c * 0x20]) < 0x1e) {
      FUN_0046e020(0x17,1,0,0);
    }
    else {
      FUN_0046e020(0x4f,1,0,0);
    }
    if ((2 < G.DAT_00655b02) && (G.DAT_0066bfc4 !== -1)) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7a,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): G.DAT_0066bfc4,G.DAT_0066bfc0,0,0,0,0,0,0);
        }
      }
    }
  }
  FUN_004b0b53(0xff,2,0,0,0);
  if (bVar3) {
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (G.DAT_006d1da0 === local_18) {
          FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
          if (local_c0 === 0) {
            if (!bVar4) {
              FUN_0057ed3f(iVar8,iVar9,0);
            }
          }
          else if (!bVar4) {
            FUN_0057ed3f(uVar11,iVar10,0);
          }
        }
        else {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,iVar8,iVar9,0,0,0,0);
          if (local_c0 === 0) {
            if (!bVar4) {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),iVar8,iVar9,0,
                                 // DEVIATION(cont): 0,0,0,0,0);
            }
          }
          else if (!bVar4) {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7c,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,uVar11,iVar10,0,0,0,0,0,0);
          }
        }
      }
    }
  }
  G.DAT_00633e48 = 0xffffffff;
  G.DAT_006acb0c = 0;
  if (local_c0 === 0) {
    G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] = G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] + 0x01;
    if (local_64 + local_a0 === 1 || local_64 + local_a0 + -1 < 0) {
      local_e4 = 0;
    }
    else {
      local_e4 = _rand();
      local_e4 = local_e4 % (local_64 + local_a0);
    }
    if ((local_e4 <= local_a0) || (iVar15 = FUN_00453e51(uVar12,7), iVar15 !== 0)) {
      FUN_0057ebfd(local_c);
    }
  }
  else {
    G.DAT_0064c6f0[uVar7 * 0x594 + uVar12] = 0;
    if (local_64 + local_a0 === 1 || local_64 + local_a0 + -1 < 0) {
      local_e0 = 0;
    }
    else {
      local_e0 = _rand();
      local_e0 = local_e0 % (local_64 + local_a0);
    }
    if ((local_e0 <= local_64) || (iVar15 = FUN_00453e51(uVar7,7), iVar15 !== 0)) {
      FUN_0057ebfd(param_1);
    }
  }
  if (local_c0 === 0) {
    local_20 = uVar12;
    FUN_005b5bab(param_1,1);
    FUN_0057eb94(param_1,local_c,local_8,local_14);
    local_60 = uVar7;
  }
  else {
    if ((uVar12 === 0) &&
       (0x04 < s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_c * 0x20]) * 0x14]))) {
      bVar5 = true;
    }
    local_20 = uVar7;
    if (((G.DAT_006acb08 < 0) && (bVar6 = FUN_005b94d5(uVar11,iVar10), (bVar6 & 0x42) !== 0x40))
       && (iVar15 = FUN_005b8d15(uVar11,iVar10), iVar15 < 0)) {
      FUN_0057eb94(local_c,param_1,local_8,local_14);
    }
    else {
      FUN_0057e9f9(local_c,param_1,local_8,local_14);
    }
    iVar15 = G.DAT_006acb08;
    local_60 = uVar12;
    if (-1 < G.DAT_006acb08) {
      w32(G.DAT_0064f344, G.DAT_006acb08 * 0x58, 
           u32(G.DAT_0064f344, G.DAT_006acb08 * 0x58) | 0x20);
      iVar16 = FUN_005b89e4(iVar8,iVar9);
      if (((iVar16 === 0) && (iVar16 = FUN_0043d20a(iVar15,8), iVar16 === 0)) &&
         ((iVar16 = FUN_00453e51(uVar12,6), iVar16 === 0 &&
          ((G.DAT_00655b08 !== 0 || ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)))))) {
        G.DAT_0064f349[iVar15 * 0x58] = G.DAT_0064f349[iVar15 * 0x58] + -1;
        if (G.DAT_0064f349[iVar15 * 0x58] === 0) {
          thunk_delete_city(iVar15,0);
          for (local_bc = 1; local_bc < 8; local_bc = local_bc + 1) {
            FUN_005b8b1a(uVar11,iVar10,local_bc);
          }
          FUN_0047cf22(uVar11,iVar10);
          iVar16 = thunk_kill_civ(uVar12,uVar7);
          if (iVar16 !== 0) {
            local_30 = 0;
            for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
              w32(local_18 * 4 + 0x6acb10, 0, 0);
            }
          }
        }
        else {
          FUN_0043cc00(iVar15,uVar7);
          iVar16 = FUN_005b8d62(uVar11,iVar10);
          if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) {
            uVar14 = FUN_005b8a81(uVar11,iVar10);
            FUN_00442541(uVar12,uVar14);
          }
        }
      }
      iVar16 = FUN_005b8d62(uVar11,iVar10);
      if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) {
        FUN_005369f3(iVar15);
      }
    }
  }
  FUN_004b0b53(0xff,2,0,0,0);
  if (bVar3) {
    if (2 < G.DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x73,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                             // DEVIATION(cont): uVar11,iVar10,iVar8,iVar9,0,0,0,0);
        }
      }
    }
    FUN_005802fd(uVar11,iVar10,iVar8,iVar9);
  }
  if ((G.DAT_00654fa8 === 0) && (1 < G.DAT_006acb0c)) {
    FUN_00421da0(0,G.DAT_006acb0c);
    if (G.DAT_006d1da0 === local_60) {
      FUN_00421ea0(s_MULTIPLELOSE_006344a8);
    }
    else if (G.DAT_006d1da0 === local_20) {
      FUN_00421ea0(s_MULTIPLEWIN_006344b8);
    }
    if (((G.DAT_00655b02 < 3) || ((1 << (u8(local_60) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0)) ||
       (G.DAT_006d1da0 === local_60)) {
      if (((2 < G.DAT_00655b02) && ((1 << (u8(local_20) & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) &&
         (G.DAT_006d1da0 !== local_20)) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x36,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_20 * 4) * 0x54),0,1
                           // DEVIATION(cont): ,0,0);
      }
    }
    else {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x35,*(undefined4 *)
                               // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_60 * 4) * 0x54),0,1,0
                         // DEVIATION(cont): ,0);
    }
  }
  if (bVar5) {
    uVar17 = (((G.DAT_00655b09) >>> 0) * 100) / 2;
    w32(G.DAT_0064c6a2, uVar7 * 0x594, s32(G.DAT_0064c6a2, uVar7 * 0x594) + uVar17);
    FUN_00421da0(0,uVar17);
    if ((G.DAT_006d1da0 === uVar7) && (G.DAT_00654fa8 === 0)) {
      FUN_004442a0(s_RANSOM_006344c4,0x3e,0);
      FUN_00569363(1);
    }
    else if ((2 < G.DAT_00655b02) && (G.DAT_00654fa8 === 0)) {
      FUN_004b0b53(0xff,2,0,0,0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((aiStack_58[local_18] !== 0) && (G.DAT_006d1da0 !== local_18)) {
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x37,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),1
                             // DEVIATION(cont): ,0,0x3e,0);
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x78,*(undefined4 *)
                                   // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),0
                             // DEVIATION(cont): ,0,0,0,0,0,0,0);
        }
      }
    }
  }
  if (iVar13 !== 0) {
    FUN_0045a8e3(uVar12,uVar7);
  }
  if ((G.DAT_00654fa8 === 0) && ((local_30 !== 0 || (local_b0 !== 0)))) {
    uVar14 = FUN_00493c7d(uVar12);
    FUN_0040ff60(0,uVar14);
    uVar14 = FUN_00493c7d(uVar7);
    FUN_0040ff60(1,uVar14);
    if (G.DAT_00655b02 < 3) {
      if (local_30 === 0) {
        if (local_b0 === 1) {
          FUN_00421ea0(s_ALLYUNDERATTACK_006344d8);
          FUN_0045b0d6(uVar12,uVar7);
        }
        else {
          FUN_00421ea0(s_ALLYATTACKING_006344e8);
        }
      }
      else {
        FUN_00421ea0(s_CANCELPEACE_006344cc);
      }
    }
    else if (G.DAT_00654fa8 === 0) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (s32(local_18 * 4 + 0x6acb10, 0) !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_00421ea0(s_CANCELPEACE_006344f8);
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3a,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
          }
        }
        if ((s32(local_18 * 4 + 0x6acae8, 0) !== 0) && (G.DAT_00654fa8 === 0)) {
          if (G.DAT_006d1da0 === local_18) {
            if (s32(local_18 * 4 + 0x6acae8, 0) === 1) {
              FUN_00421ea0(s_ALLYUNDERATTACK_00634504);
              FUN_0045b0d6(uVar12,uVar7);
            }
            else {
              FUN_00421ea0(s_ALLYATTACKING_00634514);
            }
          }
          else if (s32(local_18 * 4 + 0x6acae8, 0) === 1) {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3b,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
            if ((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) {
              // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x7e,*(undefined4 *)
                                       // DEVIATION(cont): (&G.DAT_006ad30c +
                                       // DEVIATION(cont): *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),uVar12,uVar7,0
                                 // DEVIATION(cont): ,0,0,0,0,0);
            }
          }
          else {
            // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_00511880(0x3c,*(undefined4 *)
                                     // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54)
                               // DEVIATION(cont): ,2,0,0,0);
          }
        }
      }
    }
  }
  FUN_00436287(2);
  if (2 < G.DAT_00655b02) {
    FUN_0046b14d(0x7f,0xff,2,0,0,0,0,0,0,0);
  }
  if (local_c0 === 0) {
    local_38 = 0;
  }
  else {
    iVar13 = G.DAT_00655b00;
    if ((G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] === 0x01) &&
       (G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] !== 0x01)) {
      FUN_005b6787(iVar13);
    }
    if ((((local_c0 === 0) || ((1 << (bVar1 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) !== 0)) ||
        (G.DAT_006acb08 < 0)) || (iVar15 = FUN_005b2e69(uVar11,iVar10), -1 < iVar15)) {
      if ((local_c0 !== 0) &&
         ((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) !== 0)) {
        FUN_005b4391(iVar13,1);
        local_38 = 0;
      }
    }
    else {
      if ((G.DAT_0064b1bd[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) === 0) {
        if (((G.DAT_0064b1c1[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] === 0x01) &&
            (G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14] !== 0)) &&
           (G.DAT_006560fd[iVar13 * 0x20] = G.DAT_006560fd[iVar13 * 0x20] + 0x01,
           s8(G.DAT_0064b1c3[u8(G.DAT_006560f6[iVar13 * 0x20]) * 0x14]) <=
           s8(G.DAT_006560fd[iVar13 * 0x20]))) LAB_00583d2b_helper(bVar1, bVar2, bVar3, bVar4, bVar5, bVar6, iVar10, iVar13, iVar15, iVar16, iVar8, iVar9, local_14, local_18, local_20, local_30, local_38, local_60, local_64, local_8, local_a0, local_ac, local_b0, local_bc, local_c, local_c0, local_e0, local_e4, param_1, uVar11, uVar12, uVar14, uVar17, uVar7); return;
      }
      else {
        FUN_005b4391(iVar13,1);
        FUN_0047cf22(iVar8,iVar9);
      }
      FUN_0057febc(uVar7,uVar11,iVar10);
      local_38 = 0;
    }
  }
LAB_00583d2b:
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff,2,0,0,0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0xa3,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),0,0
                           // DEVIATION(cont): ,0,0,0,0,0,0);
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x75,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                           // DEVIATION(cont): iVar8,iVar9,0,0,0,0,0,0);
      }
    }
  }
  return local_38;
}

function LAB_00583d2b_helper(iVar8, iVar9, local_18, local_38) {
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff,2,0,0,0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0xa3,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),0,0
                           // DEVIATION(cont): ,0,0,0,0,0,0);
        // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0046b14d(0x75,*(undefined4 *)
                                 // DEVIATION(cont): (&G.DAT_006ad30c + *(int *)(&G.DAT_006ad558 + local_18 * 4) * 0x54),
                           // DEVIATION(cont): iVar8,iVar9,0,0,0,0,0,0);
      }
    }
  }
  return local_38;
}

function LAB_00588e17_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5) {
      FUN_005c0073(local_18);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    iVar3 = s32(param_1 * 0x10 + 0x3c4 + local_38, 0) + local_54 * local_20;
    SetRect(local_30[0],xLeft,iVar3,iVar1 + xLeft,iVar3 + local_20);
    if ((local_54 !== 0) && (s32(local_38, 0x10410 + param_1 * 4) === -1)) LAB_00588e17_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
    if (s32(local_38, 0x10410 + param_1 * 4) + local_54 <
        s32(local_38, 1000 + param_1 * 4)) {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — iVar6 = *(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0x8400 +
                      // DEVIATION(cont): local_38);
      if (iVar6 === 0) {
        if (s32(local_38, 0x10410 + param_1 * 4) + local_54 === 0) {
          local_3c = ((G.DAT_00635a00) >>> 0);
          local_44 = G.DAT_00635a2c;
        }
        else {
          local_3c = G.DAT_00635a1c;
          local_44 = G.DAT_00635a20;
        }
      }
      else {
        local_3c = G.DAT_00635a28;
        local_44 = G.DAT_00635a2c;
      }
      local_58 = 0;
      if ((0 < s32(local_38, 1000 + param_1 * 4)) &&
         // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — (local_58 = FUN_0052ed95(*(undefined4 *)
                                         // DEVIATION(cont): (param_1 * 0x2004 +
                                          // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) *
                                          // DEVIATION(cont): 4 + 0x43f8 + local_38)), local_58 == -1)) break;
      iVar4 = (-((s32(local_38, 0x154) === 0) >>> 0) & 0xffffffe2) + 0x5a + G.DAT_0062d858;
      local_30[0].left = local_30[0].left + iVar4 + -3;
      if (iVar6 === 0) {
        local_64 = G.DAT_00635a18;
      }
      else {
        local_64 = G.DAT_00635a24;
      }
      FUN_005c0333(local_30[0],local_64);
      if (param_1 === 0) {
        // DEVIATION(C-syntax): true // DEVIATION: C pointer — if (*(char *)(local_38 + 0x3be) === 0) {
          // DEVIATION(cont): local_1c = 3;
        }
        else {
          local_1c = 0;
        }
      }
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — else if (*(char *)(local_38 + 0x3bf) === 0) {
        // DEVIATION(cont): local_1c = 3;
      }
      else {
        local_1c = 0;
      }
      if (G.DAT_0067a994 === 10) {
        local_1c = 0;
      }
      if (s32(local_38, 0x10410 + param_1 * 4) === -1) {
        FUN_0040bbb0();
        uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb78));
        FUN_0040bbe0(uVar5);
        w32(local_38, 0x1e4 + param_1 * 4, 0);
      }
      else {
        uVar5 = FUN_0040ef70(local_1c);
        FUN_00588e47(local_58,s32(local_38, 0x10410 + param_1 * 4) + local_54,xLeft + 2,
                           iVar3,uVar5);
        FUN_0040bbb0();
        FUN_0040bbe0(G.DAT_0064f360 + local_58 * 0x58);
        FUN_0040fe10();
        iVar6 = FUN_0043d20a(local_58,1);
        if ((iVar6 === 0) && (local_1c === 0)) {
          FUN_0040fea0();
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0040ff30(*(undefined4 *)
                              // DEVIATION(cont): (param_1 * 0x2004 +
                               // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408
                              // DEVIATION(cont): + local_38));
          FUN_0040fe10();
          // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — if (*(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408 +
                      // DEVIATION(cont): local_38) < 2) {
            // DEVIATION(cont): uVar5 = thunk_FUN_00428b0c(*(undefined4 *)(G.DAT_00628420 + 0xb70));
            FUN_0040bbe0(uVar5);
          }
          else {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb6c));
            FUN_0040bbe0(uVar5);
          }
        }
        else {
          iVar6 = FUN_0043d20a(local_58,1);
          if (iVar6 !== 0) {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb74));
            FUN_0040bbe0(uVar5);
          }
        }
      }
      if (local_44 !== local_3c) {
        FUN_005c19ad(local_44);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 2,iVar3 + iVar2 + 1,5);
        FUN_005c19ad(local_3c);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 1,iVar3 + iVar2,5);
      }
      FUN_005c19ad(local_3c);
      FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4,iVar3 + iVar2,5);
    }
    local_54 = local_54 + 1;
  } while( true );
  FUN_00588f36(param_1,1);
  if (s32(local_38, 1000 + param_1 * 4) === 0) {
    w32(local_38, 0x10410 + param_1 * 4, 0xffffffff);
  }
  else if (s32(local_38, 1000 + param_1 * 4) < s32(local_38, 1000 + param_1 * 4)) {
    w32(local_38, 0x10410 + param_1 * 4, s32(local_38, 1000 + param_1 * 4) + -1);
  }
  LAB_005887e1_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
}

function LAB_005887e1_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5) {
  FUN_005c0333(param_1 * 0x10 + local_38 + 0x3c0,G.DAT_00635a18);
  if (s32(local_38, 0x154) === 0) {
    local_8 = G.DAT_0067a7a0;
  }
  else {
    local_8 = G.DAT_0067a798;
  }
  xLeft = s32(param_1 * 0x10 + 0x3c0 + local_38, 0);
  iVar1 = FUN_00407f90(param_1 * 0x10 + local_38 + 0x3c0);
  local_20 = FUN_00407fc0(param_1 * 0x10 + local_38 + 0x3c0);
  local_20 = local_20 / s32(local_38, 0x10420 + param_1 * 4);
  iVar2 = local_20 / 2;
  iVar3 = FUN_0040ef70();
  iVar2 = iVar2 - iVar3 / 2;
  w32(local_38, 0x1e4 + param_1 * 4, 0);
  for (local_54 = 0; local_54 < s32(local_38, 1000 + param_1 * 4); local_54 = local_54 + 1) {
    if (s32(param_1 * 0x2004 + local_54 * 4 + 0x8400 + local_38, 0) !== 0) {
      w32(local_38, 0x1e4 + param_1 * 4, 1);
      break;
    }
  }
  local_54 = 0;
  do {
    if (s32(local_38, 0x10420 + param_1 * 4) <= local_54) {
LAB_00588e17:
      FUN_005c0073(local_18);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    iVar3 = s32(param_1 * 0x10 + 0x3c4 + local_38, 0) + local_54 * local_20;
    SetRect(local_30[0],xLeft,iVar3,iVar1 + xLeft,iVar3 + local_20);
    if ((local_54 !== 0) && (s32(local_38, 0x10410 + param_1 * 4) === -1)) LAB_00588e17_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
    if (s32(local_38, 0x10410 + param_1 * 4) + local_54 <
        s32(local_38, 1000 + param_1 * 4)) {
      // DEVIATION(C-syntax): true) // DEVIATION: C pointer — iVar6 = *(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0x8400 +
                      // DEVIATION(cont): local_38);
      if (iVar6 === 0) {
        if (s32(local_38, 0x10410 + param_1 * 4) + local_54 === 0) {
          local_3c = ((G.DAT_00635a00) >>> 0);
          local_44 = G.DAT_00635a2c;
        }
        else {
          local_3c = G.DAT_00635a1c;
          local_44 = G.DAT_00635a20;
        }
      }
      else {
        local_3c = G.DAT_00635a28;
        local_44 = G.DAT_00635a2c;
      }
      local_58 = 0;
      if ((0 < s32(local_38, 1000 + param_1 * 4)) &&
         // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — (local_58 = FUN_0052ed95(*(undefined4 *)
                                         // DEVIATION(cont): (param_1 * 0x2004 +
                                          // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) *
                                          // DEVIATION(cont): 4 + 0x43f8 + local_38)), local_58 == -1)) break;
      iVar4 = (-((s32(local_38, 0x154) === 0) >>> 0) & 0xffffffe2) + 0x5a + G.DAT_0062d858;
      local_30[0].left = local_30[0].left + iVar4 + -3;
      if (iVar6 === 0) {
        local_64 = G.DAT_00635a18;
      }
      else {
        local_64 = G.DAT_00635a24;
      }
      FUN_005c0333(local_30[0],local_64);
      if (param_1 === 0) {
        // DEVIATION(C-syntax): true // DEVIATION: C pointer — if (*(char *)(local_38 + 0x3be) === 0) {
          // DEVIATION(cont): local_1c = 3;
        }
        else {
          local_1c = 0;
        }
      }
      // DEVIATION(C-syntax): true // DEVIATION: C pointer — else if (*(char *)(local_38 + 0x3bf) === 0) {
        // DEVIATION(cont): local_1c = 3;
      }
      else {
        local_1c = 0;
      }
      if (G.DAT_0067a994 === 10) {
        local_1c = 0;
      }
      if (s32(local_38, 0x10410 + param_1 * 4) === -1) {
        FUN_0040bbb0();
        uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb78));
        FUN_0040bbe0(uVar5);
        w32(local_38, 0x1e4 + param_1 * 4, 0);
      }
      else {
        uVar5 = FUN_0040ef70(local_1c);
        FUN_00588e47(local_58,s32(local_38, 0x10410 + param_1 * 4) + local_54,xLeft + 2,
                           iVar3,uVar5);
        FUN_0040bbb0();
        FUN_0040bbe0(G.DAT_0064f360 + local_58 * 0x58);
        FUN_0040fe10();
        iVar6 = FUN_0043d20a(local_58,1);
        if ((iVar6 === 0) && (local_1c === 0)) {
          FUN_0040fea0();
          // DEVIATION(C-syntax): true) // DEVIATION: C pointer — FUN_0040ff30(*(undefined4 *)
                              // DEVIATION(cont): (param_1 * 0x2004 +
                               // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408
                              // DEVIATION(cont): + local_38));
          FUN_0040fe10();
          // DEVIATION(C-syntax): true)) // DEVIATION: C pointer — if (*(int *)(param_1 * 0x2004 +
                       // DEVIATION(cont): (*(int *)(local_38 + 0x10410 + param_1 * 4) + local_54) * 4 + 0xc408 +
                      // DEVIATION(cont): local_38) < 2) {
            // DEVIATION(cont): uVar5 = thunk_FUN_00428b0c(*(undefined4 *)(G.DAT_00628420 + 0xb70));
            FUN_0040bbe0(uVar5);
          }
          else {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb6c));
            FUN_0040bbe0(uVar5);
          }
        }
        else {
          iVar6 = FUN_0043d20a(local_58,1);
          if (iVar6 !== 0) {
            uVar5 = FUN_00428b0c(s32(G.DAT_00628420, 0xb74));
            FUN_0040bbe0(uVar5);
          }
        }
      }
      if (local_44 !== local_3c) {
        FUN_005c19ad(local_44);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 2,iVar3 + iVar2 + 1,5);
        FUN_005c19ad(local_3c);
        FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4 + 1,iVar3 + iVar2,5);
      }
      FUN_005c19ad(local_3c);
      FUN_005c0f57(local_8,G.DAT_00679640,xLeft + iVar4,iVar3 + iVar2,5);
    }
    local_54 = local_54 + 1;
  } while( true );
  FUN_00588f36(param_1,1);
  if (s32(local_38, 1000 + param_1 * 4) === 0) {
    w32(local_38, 0x10410 + param_1 * 4, 0xffffffff);
  }
  else if (s32(local_38, 1000 + param_1 * 4) < s32(local_38, 1000 + param_1 * 4)) {
    w32(local_38, 0x10410 + param_1 * 4, s32(local_38, 1000 + param_1 * 4) + -1);
  }
  LAB_005887e1_helper(iVar1, iVar2, iVar3, iVar4, iVar6, local_18, local_1c, local_20, local_30, local_38, local_3c, local_44, local_54, local_58, local_64, local_8, param_1, uVar5); return;
}

function LAB_0058a0bc_helper(local_5c) {
  if (_File !== 0x0) {
    _fclose(_File);
  }
  return local_5c;
}

function LAB_0058cd8e_helper() {
    FUN_00421ea0(s_CANTDO_00634b44);
  }
  return;
}

function LAB_0058d58e_helper(local_8) {
  G.DAT_00655afe = ((local_8) << 16 >> 16);
  G.DAT_006560ff[local_8 * 0x20] = 0xff;
  w16(G.DAT_006560f4, local_8 * 0x20, u16(G.DAT_006560f4, local_8 * 0x20) & 0x7fff
  );
  G.DAT_006d1da8 = 0;
  FUN_00489a0d(0);
  if (G.DAT_006560f8[local_8 * 0x20] === 0) {
    FUN_004274a6(local_8,1);
  }
  return;
}

function LAB_0058daa2_helper(bVar5, cVar1, cVar3, iVar12, iVar6, iVar7, local_18, local_23c, local_320, local_32c, local_330, sVar4, uVar15, uVar16) {
        if (((s8(G.DAT_0064f348[local_330 * 0x58]) === iVar7) ||
            (G.DAT_0064f34d[local_330 * 0x58 + iVar7] !== 0)) || (G.DAT_00655b07 !== 0)) {
          FUN_0040bbb0();
          FUN_0040bbe0(G.DAT_0064f360 + local_330 * 0x58);
          if (cVar1 === 0x05) {
            local_320 = 0;
            for (local_18 = 0; local_18 < 0x14; local_18 = local_18 + 1) {
              uVar15 = FUN_005ae052(s16(G.DAT_0064f340, local_330 * 0x58) +
                                          s8(G.DAT_00628370[local_18]));
              sVar4 = s16(G.DAT_0064f342, local_330 * 0x58);
              cVar3 = G.DAT_006283a0[local_18];
              iVar12 = FUN_004087c0(uVar15,sVar4 + cVar3);
              if ((iVar12 !== 0) &&
                 (uVar16 = FUN_005b94d5(uVar15,sVar4 + cVar3), (uVar16 & 0x80) !== 0)
                 ) {
                local_320 = local_320 + 1;
              }
            }
            if (local_320 !== 0) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(local_320);
              FUN_0040fe10();
              FUN_0040bc10(0x2f);
              FUN_0040fed0();
            }
          }
          if ((s8(G.DAT_0064f348[local_330 * 0x58]) === iVar7) &&
             (iVar12 = FUN_0043d20a(local_330,0x20), iVar12 !== 0)) {
            FUN_0040fe10();
            FUN_0040fea0();
            FUN_0040ff00(G.DAT_0064c588);
            FUN_0040fed0();
          }
          FUN_0059edf0(G.DAT_00679640,local_330,0);
          local_32c = local_32c + 1;
        }
      }
LAB_0058d80c:
    }
    if (local_32c === 0) {
      if (bVar5) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = true;
    }
    else {
      iVar12 = FUN_0040bc80(0);
      if (iVar12 < 0) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      if (local_23c === 0) {
        G.DAT_006560ff[iVar6 * 0x20] = 0xb;
        w16(G.DAT_00656102, iVar6 * 0x20, 
             s16(G.DAT_0064f340, iVar12 * 0x58));
        w16(G.DAT_00656104, iVar6 * 0x20, 
             s16(G.DAT_0064f342, iVar12 * 0x58));
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = !bVar5;
    }
  } while( true );
}

function LAB_0058d80c_helper(bVar5, iVar12, iVar6, local_23c, local_32c) {
    }
    if (local_32c === 0) {
      if (bVar5) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = true;
    }
    else {
      iVar12 = FUN_0040bc80(0);
      if (iVar12 < 0) {
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      if (local_23c === 0) {
        G.DAT_006560ff[iVar6 * 0x20] = 0xb;
        w16(G.DAT_00656102, iVar6 * 0x20, 
             s16(G.DAT_0064f340, iVar12 * 0x58));
        w16(G.DAT_00656104, iVar6 * 0x20, 
             s16(G.DAT_0064f342, iVar12 * 0x58));
        // DEVIATION: SEH
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = !bVar5;
    }
  } while( true );
}

function LAB_0058e34c_helper(iVar1, local_31c, local_320) {
    local_31c = iVar1;
    local_320 = local_320 + 1;
  } while( true );
}

function LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8) {
    switch(local_50) {
    case 0:
      if (G.DAT_0063f660 < 4) {
        local_50 = 1;
        LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      if ((s16(G.DAT_0064c708, uVar3 * 0x594) === 0) && (G.DAT_00655af8 < 0x32)) {
        local_8 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if (((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_8 = local_8 + 1;
          }
        }
        if (1 < local_8) {
          local_50 = 1;
          LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      iVar6 = FUN_005b8c42(iVar4,uVar5);
      if (0xb < iVar6) {
        if (G.DAT_006ad0d0 !== 0) {
          FUN_00410030(s_SURPRISETRIBE_00634ca4,G.DAT_0063fc58,0);
        }
        iVar6 = thunk_create_city(iVar4,uVar5,uVar3);
        if (999 < G.DAT_00655afa) {
          iVar9 = _rand();
          bVar2 = u8(iVar9 >> 0x1f);
          G.DAT_0064f349[iVar6 * 0x58] =
               (((u8(iVar9) ^ bVar2) - bVar2 & 3 ^ bVar2) - bVar2) + 0x01;
          FUN_0043d289(iVar6,4,1);
          uVar3 = _rand();
          uVar7 = uVar3 >> 0x1f;
          if (((uVar3 ^ uVar7) - uVar7 & 1 ^ uVar7) === uVar7) {
            FUN_0043d289(iVar6,5,1);
          }
          iVar9 = _rand();
          if (iVar9 % 3 === 0) {
            FUN_0043d289(iVar6,3,1);
          }
          uVar3 = _rand();
          uVar7 = uVar3 >> 0x1f;
          if (((uVar3 ^ uVar7) - uVar7 & 3 ^ uVar7) === uVar7) {
            FUN_0043d289(iVar6,6,1);
          }
        }
        if (G.DAT_006ad0d0 === 0) {
          return 0;
        }
        FUN_0047cf22(iVar4,uVar5);
        uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
        if (iVar6 < 0) {
          return uVar3;
        }
        uVar3 = thunk_handle_city_disorder_00509590(iVar6);
        return uVar3;
      }
      local_50 = 5;
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    case 1:
      if (G.DAT_006ad0d0 !== 0) {
        FUN_00410030(s_SURPRISEMERCS_00634d04,G.DAT_0063fc58,0);
      }
      local_14 = 0x13;
      if (G.DAT_00655b8d === 0) {
        iVar6 = _rand();
        if (iVar6 % 3 === 0) {
          local_14 = 0x10;
        }
        else {
          local_14 = 0xf;
        }
        if (G.DAT_00655bc2 !== 0) {
          uVar7 = _rand();
          uVar10 = uVar7 >> 0x1f;
          if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) {
            local_14 = 0x11;
          }
        }
      }
      if (G.DAT_00655bb9 !== 0) {
        local_14 = 0x12;
      }
      if (G.DAT_00655bac !== 0) {
        local_14 = 0x14;
      }
      if (G.DAT_00655b93 !== 0) {
        local_14 = 0xb;
      }
      local_c = 8;
      if (G.DAT_00655ba4 === 0) {
        local_c = 7;
      }
      if (G.DAT_00655ba5 === 0) {
        local_c = 5;
      }
      if (G.DAT_00655ba9 === 0) {
        local_c = 4;
      }
      uVar7 = _rand();
      uVar10 = uVar7 >> 0x1f;
      if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) === uVar10) {
        local_60 = local_14;
      }
      else {
        local_60 = local_c;
      }
      iVar6 = FUN_005b3d06(local_60,uVar3,iVar4,uVar5);
      if ((G.DAT_006ad0d0 === 0) && (G.DAT_006d1da0 !== uVar3)) {
        local_50 = uVar3;
        if (-1 < iVar6) {
          local_50 = iVar6 * 0x20;
          G.DAT_00656100[local_50] = 0xff;
        }
      }
      else {
        FUN_0047cf22(iVar4,uVar5);
        local_50 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
      }
      break;
    case 2:
      local_20 = 0x32;
      iVar4 = _rand();
      if (iVar4 % 3 === 0) {
        iVar4 = _rand();
        if (((iVar4 % 10 - ((G.DAT_00655b08) | 0)) + 2) < 5) {
          local_20 = 0x19;
        }
        else {
          local_20 = 100;
        }
      }
      if (1000 < G.DAT_00655afa) {
        local_20 = local_20 << 1;
      }
      w32(G.DAT_0064c6a2, uVar3 * 0x594, s32(G.DAT_0064c6a2, uVar3 * 0x594) + local_20);
      FUN_00421da0(0,local_20);
      if (G.DAT_006ad0d0 !== 0) {
        FUN_00410030(s_SURPRISEMETALS_00634cd4,G.DAT_0063fc58,0);
      }
      if (G.DAT_006d1da0 !== uVar3) {
        return uVar3;
      }
      uVar3 = FUN_00569363(1);
      return uVar3;
    case 3:
      if ((G.DAT_0063f660 < 4) ||
         ((s16(G.DAT_0064c708, uVar3 * 0x594) === 0 && (G.DAT_00655af8 < 0x32)))) {
        local_50 = 1;
        LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      if (((1 << (bVar2 & 0x1f) & ((G.DAT_00655b0b) >>> 0)) === 0) &&
         (u8(G.DAT_00655c22[uVar3]) < u8(G.DAT_00655c22[G.DAT_00655c21]))) {
        uVar7 = _rand();
        uVar10 = uVar7 >> 0x1f;
        if (((uVar7 ^ uVar10) - uVar10 & 7 ^ uVar10) - uVar10 < ((G.DAT_00655b08) | 0)) {
          local_50 = 0;
          LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      bVar1 = false;
      if (G.DAT_00655b09 < 3) {
        if (G.DAT_00655af8 < 0x1e) {
LAB_0058f87c:
          FUN_0043d07a(iVar4,uVar5,uVar3,0xffffffff,0xffffffff);
          iVar6 = FUN_005b8a81(iVar4,uVar5);
          if ((G.DAT_0064c932[uVar3 * 0x594 + iVar6] !== 0) && (G.DAT_0063f660 < 0x18)) {
            if (G.DAT_006ad0d0 === 0) {
              return 0;
            }
            uVar3 = FUN_00410030(s_SURPRISENOTHING_00634ce4,G.DAT_0063fc58,0);
            return uVar3;
          }
        }
        else if (G.DAT_00655af8 < 0x32) {
          uVar7 = _rand();
          uVar10 = uVar7 >> 0x1f;
          if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) === uVar10) LAB_0058f87c_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      if (0x31 < G.DAT_00655af8) {
        if (0x4a < G.DAT_00655af8) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        uVar7 = _rand();
        uVar10 = uVar7 >> 0x1f;
        if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      bVar1 = true;
LAB_0058f939:
      uVar7 = 0;
      if (G.DAT_006ad0d0 !== 0) {
        uVar7 = FUN_00410030(s_SURPRISEBARB_00634cf4,G.DAT_0063fc58,0);
      }
      local_10 = 0;
      do {
        if (7 < local_10) {
          return uVar7;
        }
        uVar7 = G.DAT_00655af8 + local_10 >> 0x1f;
        iVar6 = ((G.DAT_00655af8 + local_10 ^ uVar7) - uVar7 & 7 ^ uVar7) - uVar7;
        uVar8 = FUN_005ae052(s8(G.DAT_00628350[iVar6]) + iVar4);
        iVar6 = s8(G.DAT_00628360[iVar6]) + uVar5;
        iVar9 = FUN_004087c0(uVar8,iVar6);
        if ((((iVar9 !== 0) && (iVar9 = FUN_005b8d62(uVar8,iVar6), iVar9 < 0)) &&
            (iVar9 = FUN_005b8ca6(uVar8,iVar6), iVar9 < 0)) &&
           (iVar9 = FUN_005b89e4(uVar8,iVar6), iVar9 === 0)) {
          bVar2 = FUN_005b89bb(uVar8,iVar6);
          local_28 = 5;
          local_3c = 0xf;
          if (G.DAT_00655bb5 !== 0) {
            local_28 = 7;
            local_3c = 0x13;
          }
          if (G.DAT_00655b82[G.DAT_0064b383] !== 0) {
            local_28 = 0xb;
            local_3c = 0x15;
          }
          if (G.DAT_00655ba4 !== 0) {
            local_28 = 8;
            local_3c = 9;
          }
          if (s8(G.DAT_00627cc8[((bVar2) >>> 0) * 0x18]) < 0x03) {
            local_38 = local_3c;
          }
          else {
            local_38 = local_28;
          }
          uVar7 = FUN_005b3d06(local_38,0,uVar8,iVar6);
          if (-1 < uVar7) {
            iVar9 = FUN_005b8931(iVar4,uVar5);
            // DEVIATION(C-syntax): true // DEVIATION: C pointer — G.DAT_006560f9[uVar7 * 0x20] = *(byte *)(iVar9 + 4) | G.DAT_006560f9[uVar7 * 0x20];
            FUN_0047cea6(uVar8,iVar6);
            uVar7 = ((G.DAT_00655b02) >>> 0);
            if (2 < G.DAT_00655b02) {
              uVar7 = FUN_0046b14d(0x72,0xff,uVar8,iVar6,0,0,0,0,0,0);
            }
          }
          if (bVar1) {
            return uVar7;
          }
        }
        uVar7 = FUN_005adfa0(4 - s16(G.DAT_0064c708, uVar3 * 0x594),1,4);
        local_10 = local_10 + uVar7;
      } while( true );
    case 4:
      if ((G.DAT_00655af8 === 0) || (iVar6 = FUN_004bd9f0(uVar3,0x26), iVar6 !== 0)) {
        local_50 = 2;
      }
      else {
        local_40 = 0;
        local_4c = _rand();
        local_4c = local_4c % 100;
        do {
          iVar6 = FUN_004bfdbe(uVar3,local_4c);
          if (iVar6 === 0) {
            uVar7 = (local_4c + 1) / 100;
            local_4c = (local_4c + 1) % 100;
          }
          else {
            if (G.DAT_006ad0d0 !== 0) {
              FUN_00410030(s_SURPRISESCROLLS_00634cc4,G.DAT_0063fc58,0);
            }
            uVar7 = FUN_004bf05b(uVar3,local_4c,uVar3,0,0);
            local_4c = -1;
          }
          local_40 = local_40 + 1;
        } while ((local_40 < 999) && (-1 < local_4c));
        if (local_4c < 0) {
          return uVar7;
        }
        local_50 = 0;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    case 5:
      if (G.DAT_00655b9e === 0) {
        local_48 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if ((((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
               (s8(G.DAT_006560f7[param_1 * 0x20]) === uVar3)) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_48 = local_48 + 1;
          }
        }
        if (local_48 <= s16(G.DAT_0064c708, uVar3 * 0x594) >> 3) {
          if (G.DAT_006ad0d0 !== 0) {
            FUN_00410030(s_SURPRISENOMADS_00634cb4,G.DAT_0063fc58,0);
          }
          iVar6 = FUN_005b3d06(0,uVar3,iVar4,uVar5);
          if (-1 < iVar6) {
            G.DAT_00656100[iVar6 * 0x20] = 0xff;
          }
          if (G.DAT_006ad0d0 === 0) {
            return 0;
          }
          FUN_0047cf22(iVar4,uVar5);
          uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
          return uVar3;
        }
        local_50 = 4;
      }
      else {
        local_50 = 2;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_14, local_20, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, local_60, local_8, local_c, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    default:
      break;
    }
  }
  return local_50;
}

function LAB_0058f87c_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8) {
          FUN_0043d07a(iVar4,uVar5,uVar3,0xffffffff,0xffffffff);
          iVar6 = FUN_005b8a81(iVar4,uVar5);
          if ((G.DAT_0064c932[uVar3 * 0x594 + iVar6] !== 0) && (G.DAT_0063f660 < 0x18)) {
            if (G.DAT_006ad0d0 === 0) {
              return 0;
            }
            uVar3 = FUN_00410030(s_SURPRISENOTHING_00634ce4,G.DAT_0063fc58,0);
            return uVar3;
          }
        }
        else if (G.DAT_00655af8 < 0x32) {
          uVar7 = _rand();
          uVar10 = uVar7 >> 0x1f;
          if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) === uVar10) LAB_0058f87c_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        }
      }
      if (0x31 < G.DAT_00655af8) {
        if (0x4a < G.DAT_00655af8) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
        uVar7 = _rand();
        uVar10 = uVar7 >> 0x1f;
        if (((uVar7 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
      }
      bVar1 = true;
LAB_0058f939:
      uVar7 = 0;
      if (G.DAT_006ad0d0 !== 0) {
        uVar7 = FUN_00410030(s_SURPRISEBARB_00634cf4,G.DAT_0063fc58,0);
      }
      local_10 = 0;
      do {
        if (7 < local_10) {
          return uVar7;
        }
        uVar7 = G.DAT_00655af8 + local_10 >> 0x1f;
        iVar6 = ((G.DAT_00655af8 + local_10 ^ uVar7) - uVar7 & 7 ^ uVar7) - uVar7;
        uVar8 = FUN_005ae052(s8(G.DAT_00628350[iVar6]) + iVar4);
        iVar6 = s8(G.DAT_00628360[iVar6]) + uVar5;
        iVar9 = FUN_004087c0(uVar8,iVar6);
        if ((((iVar9 !== 0) && (iVar9 = FUN_005b8d62(uVar8,iVar6), iVar9 < 0)) &&
            (iVar9 = FUN_005b8ca6(uVar8,iVar6), iVar9 < 0)) &&
           (iVar9 = FUN_005b89e4(uVar8,iVar6), iVar9 === 0)) {
          bVar2 = FUN_005b89bb(uVar8,iVar6);
          local_28 = 5;
          local_3c = 0xf;
          if (G.DAT_00655bb5 !== 0) {
            local_28 = 7;
            local_3c = 0x13;
          }
          if (G.DAT_00655b82[G.DAT_0064b383] !== 0) {
            local_28 = 0xb;
            local_3c = 0x15;
          }
          if (G.DAT_00655ba4 !== 0) {
            local_28 = 8;
            local_3c = 9;
          }
          if (s8(G.DAT_00627cc8[((bVar2) >>> 0) * 0x18]) < 0x03) {
            local_38 = local_3c;
          }
          else {
            local_38 = local_28;
          }
          uVar7 = FUN_005b3d06(local_38,0,uVar8,iVar6);
          if (-1 < uVar7) {
            iVar9 = FUN_005b8931(iVar4,uVar5);
            // DEVIATION(C-syntax): true // DEVIATION: C pointer — G.DAT_006560f9[uVar7 * 0x20] = *(byte *)(iVar9 + 4) | G.DAT_006560f9[uVar7 * 0x20];
            FUN_0047cea6(uVar8,iVar6);
            uVar7 = ((G.DAT_00655b02) >>> 0);
            if (2 < G.DAT_00655b02) {
              uVar7 = FUN_0046b14d(0x72,0xff,uVar8,iVar6,0,0,0,0,0,0);
            }
          }
          if (bVar1) {
            return uVar7;
          }
        }
        uVar7 = FUN_005adfa0(4 - s16(G.DAT_0064c708, uVar3 * 0x594),1,4);
        local_10 = local_10 + uVar7;
      } while( true );
    case 4:
      if ((G.DAT_00655af8 === 0) || (iVar6 = FUN_004bd9f0(uVar3,0x26), iVar6 !== 0)) {
        local_50 = 2;
      }
      else {
        local_40 = 0;
        local_4c = _rand();
        local_4c = local_4c % 100;
        do {
          iVar6 = FUN_004bfdbe(uVar3,local_4c);
          if (iVar6 === 0) {
            uVar7 = (local_4c + 1) / 100;
            local_4c = (local_4c + 1) % 100;
          }
          else {
            if (G.DAT_006ad0d0 !== 0) {
              FUN_00410030(s_SURPRISESCROLLS_00634cc4,G.DAT_0063fc58,0);
            }
            uVar7 = FUN_004bf05b(uVar3,local_4c,uVar3,0,0);
            local_4c = -1;
          }
          local_40 = local_40 + 1;
        } while ((local_40 < 999) && (-1 < local_4c));
        if (local_4c < 0) {
          return uVar7;
        }
        local_50 = 0;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    case 5:
      if (G.DAT_00655b9e === 0) {
        local_48 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if ((((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
               (s8(G.DAT_006560f7[param_1 * 0x20]) === uVar3)) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_48 = local_48 + 1;
          }
        }
        if (local_48 <= s16(G.DAT_0064c708, uVar3 * 0x594) >> 3) {
          if (G.DAT_006ad0d0 !== 0) {
            FUN_00410030(s_SURPRISENOMADS_00634cb4,G.DAT_0063fc58,0);
          }
          iVar6 = FUN_005b3d06(0,uVar3,iVar4,uVar5);
          if (-1 < iVar6) {
            G.DAT_00656100[iVar6 * 0x20] = 0xff;
          }
          if (G.DAT_006ad0d0 === 0) {
            return 0;
          }
          FUN_0047cf22(iVar4,uVar5);
          uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
          return uVar3;
        }
        local_50 = 4;
      }
      else {
        local_50 = 2;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar10, uVar3, uVar5, uVar7, uVar8); return;
    default:
      break;
    }
  }
  return local_50;
}

function LAB_0058f939_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar3, uVar5, uVar7, uVar8) {
      uVar7 = 0;
      if (G.DAT_006ad0d0 !== 0) {
        uVar7 = FUN_00410030(s_SURPRISEBARB_00634cf4,G.DAT_0063fc58,0);
      }
      local_10 = 0;
      do {
        if (7 < local_10) {
          return uVar7;
        }
        uVar7 = G.DAT_00655af8 + local_10 >> 0x1f;
        iVar6 = ((G.DAT_00655af8 + local_10 ^ uVar7) - uVar7 & 7 ^ uVar7) - uVar7;
        uVar8 = FUN_005ae052(s8(G.DAT_00628350[iVar6]) + iVar4);
        iVar6 = s8(G.DAT_00628360[iVar6]) + uVar5;
        iVar9 = FUN_004087c0(uVar8,iVar6);
        if ((((iVar9 !== 0) && (iVar9 = FUN_005b8d62(uVar8,iVar6), iVar9 < 0)) &&
            (iVar9 = FUN_005b8ca6(uVar8,iVar6), iVar9 < 0)) &&
           (iVar9 = FUN_005b89e4(uVar8,iVar6), iVar9 === 0)) {
          bVar2 = FUN_005b89bb(uVar8,iVar6);
          local_28 = 5;
          local_3c = 0xf;
          if (G.DAT_00655bb5 !== 0) {
            local_28 = 7;
            local_3c = 0x13;
          }
          if (G.DAT_00655b82[G.DAT_0064b383] !== 0) {
            local_28 = 0xb;
            local_3c = 0x15;
          }
          if (G.DAT_00655ba4 !== 0) {
            local_28 = 8;
            local_3c = 9;
          }
          if (s8(G.DAT_00627cc8[((bVar2) >>> 0) * 0x18]) < 0x03) {
            local_38 = local_3c;
          }
          else {
            local_38 = local_28;
          }
          uVar7 = FUN_005b3d06(local_38,0,uVar8,iVar6);
          if (-1 < uVar7) {
            iVar9 = FUN_005b8931(iVar4,uVar5);
            // DEVIATION(C-syntax): true // DEVIATION: C pointer — G.DAT_006560f9[uVar7 * 0x20] = *(byte *)(iVar9 + 4) | G.DAT_006560f9[uVar7 * 0x20];
            FUN_0047cea6(uVar8,iVar6);
            uVar7 = ((G.DAT_00655b02) >>> 0);
            if (2 < G.DAT_00655b02) {
              uVar7 = FUN_0046b14d(0x72,0xff,uVar8,iVar6,0,0,0,0,0,0);
            }
          }
          if (bVar1) {
            return uVar7;
          }
        }
        uVar7 = FUN_005adfa0(4 - s16(G.DAT_0064c708, uVar3 * 0x594),1,4);
        local_10 = local_10 + uVar7;
      } while( true );
    case 4:
      if ((G.DAT_00655af8 === 0) || (iVar6 = FUN_004bd9f0(uVar3,0x26), iVar6 !== 0)) {
        local_50 = 2;
      }
      else {
        local_40 = 0;
        local_4c = _rand();
        local_4c = local_4c % 100;
        do {
          iVar6 = FUN_004bfdbe(uVar3,local_4c);
          if (iVar6 === 0) {
            uVar7 = (local_4c + 1) / 100;
            local_4c = (local_4c + 1) % 100;
          }
          else {
            if (G.DAT_006ad0d0 !== 0) {
              FUN_00410030(s_SURPRISESCROLLS_00634cc4,G.DAT_0063fc58,0);
            }
            uVar7 = FUN_004bf05b(uVar3,local_4c,uVar3,0,0);
            local_4c = -1;
          }
          local_40 = local_40 + 1;
        } while ((local_40 < 999) && (-1 < local_4c));
        if (local_4c < 0) {
          return uVar7;
        }
        local_50 = 0;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar3, uVar5, uVar7, uVar8); return;
    case 5:
      if (G.DAT_00655b9e === 0) {
        local_48 = 0;
        for (param_1 = 0; param_1 < G.DAT_00655b16; param_1 = param_1 + 1) {
          if ((((s32(G.DAT_0065610a, param_1 * 0x20) !== 0) &&
               (s8(G.DAT_006560f7[param_1 * 0x20]) === uVar3)) &&
              (G.DAT_0064b1ca[u8(G.DAT_006560f6[param_1 * 0x20]) * 0x14] === 0x05)) &&
             (G.DAT_00656100[param_1 * 0x20] === -1)) {
            local_48 = local_48 + 1;
          }
        }
        if (local_48 <= s16(G.DAT_0064c708, uVar3 * 0x594) >> 3) {
          if (G.DAT_006ad0d0 !== 0) {
            FUN_00410030(s_SURPRISENOMADS_00634cb4,G.DAT_0063fc58,0);
          }
          iVar6 = FUN_005b3d06(0,uVar3,iVar4,uVar5);
          if (-1 < iVar6) {
            G.DAT_00656100[iVar6 * 0x20] = 0xff;
          }
          if (G.DAT_006ad0d0 === 0) {
            return 0;
          }
          FUN_0047cf22(iVar4,uVar5);
          uVar3 = FUN_0046b14d(0x75,0xff,iVar4,uVar5,0,0,0,0,0,0);
          return uVar3;
        }
        local_50 = 4;
      }
      else {
        local_50 = 2;
      }
      LAB_0058f1bc_helper(bVar1, bVar2, iVar4, iVar6, iVar9, local_10, local_28, local_38, local_3c, local_40, local_48, local_4c, local_50, param_1, uVar3, uVar5, uVar7, uVar8); return;
    default:
      break;
    }
  }
  return local_50;
}
