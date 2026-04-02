// Block 0x00530000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 23

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* protected: */  /* char */  /* * */  /* __thiscall */  /* streambuf::egptr(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function egptr (this)

 {
  return s32((this + 0x2c), 0);
}


 export function FUN_00530eb0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 export function FUN_00530ee0 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  w32((in_ECX + 0x38), 0, PTR_DAT_00637e68);
  FUN_005cc035(param_3, param_4, param_5, DAT_ffffffec, s32((in_ECX + 0x38), 0));
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 2, param_2, DAT_ffffffec);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x34), 0, 1);
  w32((in_ECX + 0x30), 0, 0);
  uVar1 = FUN_005cc0f0(DAT_ffffffec, in_ECX, param_6, 1);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_00530fb0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, 1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */  /* ios::width(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function width (this)

 {
  return s32((this + 0x30), 0);
}


 export function FUN_00531010 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00531067;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32((in_ECX + 0x44), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005310a0 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x44), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x4c), 0, PTR_DAT_00637e64);
  FUN_0040f730(param_1, 3, param_2, param_3);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32((in_ECX + 0x38), 0, param_5);
  w32((in_ECX + 0x3c), 0, param_4);
  w32((in_ECX + 0x40), 0, 0);
  uVar1 = FUN_005d8e3f((in_ECX + 0x38), param_3, param_4, in_ECX, param_5, param_6, 1, s32((in_ECX + 0x4c), 0));
  w32((in_ECX + 0x44), 0, uVar1);
  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x44), 0));
  w32((in_ECX + 0x48), 0, uVar1);
  return;
}


 export function FUN_005311b0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 export function FUN_005311e0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00531210 (param_1)

 {
  if ((param_1 < 9)) {
    _DAT_0062803c = param_1;
    PTR_DAT_00628040 = (DAT_0064c6a0 + param_1 * 0x594);
  }
  return;
}


 export function FUN_00531263 (param_1, param_2)

 {
  return ((((DAT_006d116a) << 16 >> 16) * param_2 + param_1) + DAT_006365ec);
}


 export function FUN_00531287 (param_1)

 {
  let local_8;

  local_8 = s8(DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
  if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x200) !== 0)) {
    local_8 = 0x15;
  }
  return local_8;
}


 export function FUN_005312e4 (param_1)

 {
  let sVar1;
  let sVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let iVar8;
  let local_2c;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  sVar1 = s16((DAT_006560f0 + param_1 * 0x20), 0);
  sVar2 = s16((DAT_006560f2 + param_1 * 0x20), 0);
  iVar3 = s8(DAT_006560f7[param_1 * 0x20]);
  local_c = -1;
  local_2c = -1;
  (local_10 < 9) (local_10 = 0; local_10 = (local_10 < 9); local_10 = (local_10 + 1)) {
    iVar4 = FUN_005ae052((s8(DAT_00628350[local_10]) + ((sVar1) << 16 >> 16)));
    iVar5 = (s8(DAT_00628360[local_10]) + ((sVar2) << 16 >> 16));
    iVar6 = FUN_004087c0(iVar4, iVar5);
    if ((iVar6 < 0)) {
      local_8 = 0;
      (local_24 < 8) (local_24 = 0; local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        uVar7 = FUN_005ae052((s8(DAT_00628350[local_24]) + iVar4));
        iVar6 = (s8(DAT_00628360[local_24]) + iVar5);
        iVar8 = FUN_004087c0(uVar7, iVar6);
        if (((DAT_0064c6c0[(iVar8 * 4 + iVar3 * 0x594)] & 6) === 0)) {
          iVar8 = FUN_005b8ca6(uVar7, iVar6);
          if ((local_10 === 8)) {
            local_8 = (local_8 + 0xc);
          }
          local_8 = (local_8 + 1);
        }
      }
      if ((local_c <= local_8)) {
        local_c = local_8;
        local_2c = local_10;
      }
    }
  }
  return local_2c;
}


 export function FUN_00531567 (param_1, param_2, param_3)

 {
  param_1 = FUN_005b2d39(param_1);
  while ((param_3 === 0)) {
    param_1 = FUN_005b2c82(param_1);
  }
  return;
}


 export function FUN_00531607 (param_1, param_2, param_3, param_4)

 {
  DAT_006560ff[param_1 * 0x20] = 0xb;
  DAT_006560fc[param_1 * 0x20] = param_2;
  w16((DAT_00656102 + param_1 * 0x20), 0, param_3);
  w16((DAT_00656104 + param_1 * 0x20), 0, param_4);
  return;
}


 export function FUN_00531653 (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let iVar8;
  let local_24;
  let local_20;
  let local_10;
  let local_8;

  local_20 = param_3;
  local_24 = param_4;
  iVar2 = FUN_005b8a81(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
  iVar3 = FUN_005b8a81(param_3, param_4);
  (local_8 < 0x14) (local_8 = 0; iVar5 = local_24, iVar4 = local_20, local_8 = (local_8 < 0x14); local_8 = (local_8 + 1)) {
    iVar4 = FUN_005ae052((s8(DAT_00628370[local_8]) + param_3));
    iVar5 = (s8(DAT_006283a0[local_8]) + param_4);
    iVar6 = FUN_004087c0(iVar4, iVar5);
    if ((iVar6 === iVar2)) {
      bVar1 = 0;
      (local_10 < 8) (local_10 = 0; local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
        uVar7 = FUN_005ae052((s8(DAT_00628350[local_10]) + iVar4));
        iVar6 = (s8(DAT_00628360[local_10]) + iVar5);
        iVar8 = FUN_004087c0(uVar7, iVar6);
        if ((iVar6 < 0)) {
          bVar1 = 1;
        }
      }
      if (bVar1)


 export function FUN_0053184d (param_1)

 {
  let uVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let uVar7;
  let local_368;
  let local_354;
  let local_34c;
  let local_344;
  let local_340;
  let aiStack_33c;
  let local_27c;
  let local_278;
  let local_274;
  let local_270;
  let local_26c;
  let local_268;
  let local_264;
  let local_260;
  let local_25c;
  let local_258;
  let local_254;
  let aiStack_250;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let aiStack_140;
  let local_40;
  let local_3c;
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

  local_144 = 0;
  local_25c = 0;
  iVar3 = FUN_004bd9f0(param_1, s8(DAT_0064b2cf));
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    (local_344 < ((DAT_00655b18) << 16 >> 16)) (local_344 = 0; local_344 = (local_344 < ((DAT_00655b18) << 16 >> 16)); local_344 = (local_344 + 1)) {
      if (((DAT_0064c6c1[(s8(DAT_0064f348[local_344 * 0x58]) * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
        local_258 = ((s16((DAT_0064f340 + local_344 * 0x58), 0)) << 16 >> 16);
        local_26c = ((s16((DAT_0064f342 + local_344 * 0x58), 0)) << 16 >> 16);
        iVar3 = FUN_005b8d62(local_258, local_26c);
        if ((iVar3 < 0)) {
          (local_14 < ((DAT_00655b18) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
            if ((s8(DAT_0064f348[local_14 * 0x58]) === param_1)) {
              iVar3 = ((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16);
              local_3c = ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16);
              iVar4 = FUN_005ae1b0(local_258, local_26c, iVar3, local_3c);
              if ((iVar4 <= u8(DAT_0064bcdb))) {
                local_150 = 0;
                (-1 < local_354) (local_354 = FUN_005b2e69(iVar3, local_3c); -1 = (-1 < local_354);
                    local_354 = FUN_005b2c82(local_354)) {
                  if (((DAT_0064b1bd[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] & 1) !== 0)) {
                    local_150 = 1;
                    break;
                  }
                }
                if ((local_150 !== 0)) {
                  if ((2 < DAT_00655b02)) {
                    FUN_0047e94e(1, 0);
                  }
                  if ((s8(DAT_0064f348[local_20 * 0x58]) === param_1)) {
                    local_268 = ((s16((DAT_0064f340 + local_20 * 0x58), 0)) << 16 >> 16);
                    iVar4 = ((s16((DAT_0064f342 + local_20 * 0x58), 0)) << 16 >> 16);
                    iVar5 = FUN_005ae1b0(local_258, local_26c, local_268, iVar4);
                    if ((iVar5 <= u8(DAT_0064bcdb))) {
                      (-1 < local_354) (local_354 = FUN_005b2e69(local_268, iVar4); -1 = (-1 < local_354);
                          local_354 = FUN_005b2c82(local_354)) {
                        if ((iVar4 !== 0)) {
                          FUN_005b36df(local_354, iVar3, local_3c, 1);
                          DAT_006560f9[local_354 * 0x20] = 0;
                          FUN_005b6787(local_354);
                          local_150 = 1;
                          break;
                        }
                      }
                      if ((local_150 !== 0)) {
    DAT_0064c6b7[(param_1 * 0x594 + local_10)] = 0;
  }
  (local_40 < 0x1c) (local_40 = 0; local_40 = (local_40 < 0x1c); local_40 = (local_40 + 1)) {
    iVar3 = FUN_00453e51(param_1, local_40);
    if ((iVar3 !== 0)) {
      local_10 = (local_40 / 7 | 0);
      DAT_0064c6b7[(param_1 * 0x594 + local_10)] = (DAT_0064c6b7[(param_1 * 0x594 + local_10)] + 1);
    }
  }
  (local_278 < 0x40) (local_278 = 0; local_278 = (local_278 < 0x40); local_278 = (local_278 + 1)) {
    w16((DAT_0064c832 + (local_278 * 2 + param_1 * 0x594)), 0, 0);
    w16((DAT_0064c8b2 + (local_278 * 2 + param_1 * 0x594)), 0, 0);
    DAT_0064c972[(param_1 * 0x594 + local_278)] = 0;
    DAT_0064c9b2[(param_1 * 0x594 + local_278)] = 0;
    DAT_0064c9f2[(param_1 * 0x594 + local_278)] = 0;
    w32(DAT_fffffdb0, local_278, 0);
    w32(DAT_fffffec0, local_278, 0);
  }
  w32((DAT_0064b9e8 + param_1 * 4), 0, 0);
  w16((DAT_0064c706 + param_1 * 0x594), 0, 0);
  w16((DAT_0064c708 + param_1 * 0x594), 0, 0);
  w16((DAT_0064c70a + param_1 * 0x594), 0, 0);
  w16((DAT_0064c70c + param_1 * 0x594), 0, 0);
  w16((DAT_0064c70e + param_1 * 0x594), 0, 0);
  w16((DAT_0064c710 + param_1 * 0x594), 0, 0);
  (local_274 < 0x3e) (local_274 = 0; local_274 = local_274; local_274 = (local_274 + 1)) {
    DAT_0064c778[(param_1 * 0x594 + local_274)] = 0;
    DAT_0064c7f4[(param_1 * 0x594 + local_274)] = 0;
  }
  (local_24 < 0x30) (local_24 = 0; local_24 = (local_24 < 0x30); local_24 = (local_24 + 1)) {
    if ((0 < DAT_0064cab9[(local_24 * 6 + param_1 * 0x594)])) {
      local_278 = FUN_005b8aa8(((s16((DAT_0064cab4 + (local_24 * 6 + param_1 * 0x594)), 0)) << 16 >> 16), ((s16((DAT_0064cab6 + (local_24 * 6 + param_1 * 0x594)), 0)) << 16 >> 16));
      if ((-1 < local_278)) {
        w32(DAT_fffffec0, local_278, (s32(DAT_fffffec0, local_278) + 1));
      }
    }
  }
  (local_354 < ((DAT_00655b16) << 16 >> 16)) (local_354 = 0; local_354 = local_354; local_354 = (local_354 + 1)) {
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
    if ((DAT_0064b1ca[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === 5)) {
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 0x200));
      }
      if ((DAT_00656100[local_354 * 0x20] === 0xff)) {
        local_144 = (local_144 + 1);
        iVar3 = FUN_005b89e4(((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16));
        if ((iVar3 === 0)) {
          w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 0x200));
          iVar3 = FUN_005b8a81(((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16));
          w32(DAT_fffffdb0, iVar3, (s32(DAT_fffffdb0, iVar3) + 1));
          iVar3 = FUN_0043d07a(((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16), -1, -1, -1);
          if ((s8(DAT_0064f348[iVar3 * 0x58]) === param_1)) {
            w32((DAT_0064f344 + iVar3 * 0x58), 0, (s32((DAT_0064f344 + iVar3 * 0x58), 0) | 0x40))
            ;
          }
        }
      }
    }
  }
  (local_354 < ((DAT_00655b16) << 16 >> 16)) (local_354 = 0; local_354 = local_354; local_354 = (local_354 + 1)) {
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
    if ((s32((DAT_0065610a + local_354 * 0x20), 0) !== 0)) {
      if ((s8(DAT_006560f7[local_354 * 0x20]) === param_1)) {
        local_274 = u8(DAT_006560f6[local_354 * 0x20]);
        DAT_0064c778[(param_1 * 0x594 + local_274)] = (DAT_0064c778[(param_1 * 0x594 + local_274)] + 1);
        if ((DAT_0064b1c4[local_274 * 0x14] < 0x63)) {
          if ((DAT_006560ff[local_354 * 0x20] === 2)) {
            w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 0x100));
          }
          local_258 = ((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16);
          local_26c = ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16);
          iVar3 = FUN_004087c0(local_258, local_26c);
          if ((iVar3 === 0)) {
            local_278 = -1;
            FUN_005b2f50(local_354);
          }
          else {
            local_278 = FUN_005b8aa8(local_258, local_26c);
            if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
              if ((iVar3 === 0)) {
                DAT_006560ff[local_354 * 0x20] = 0xff;
              }
              if ((0xf < DAT_006560ff[local_354 * 0x20])) {
                DAT_006560ff[local_354 * 0x20] = 0xff;
              }
              if ((iVar3 !== 0)) {
                DAT_006560ff[local_354 * 0x20] = 0x10;
              }
            }
            iVar3 = FUN_005b89e4(local_258, local_26c);
            if ((DAT_0064b1c1[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === 0)) {
              FUN_005b2f50(local_354);
            }
          }
          w32((DAT_0064b9e8 + param_1 * 4), 0, (s32((DAT_0064b9e8 + param_1 * 4), 0) + 1));
          if ((-1 < local_278)) {
            w16((DAT_0064c832 + (param_1 * 0x594 + local_278 * 2)), 0, (s16((DAT_0064c832 + (param_1 * 0x594 + local_278 * 2)), 0) + 1));
          }
          if ((-1 < local_278)) {
            DAT_0064c9b2[(param_1 * 0x594 + local_278)] = (DAT_0064c9b2[(param_1 * 0x594 + local_278)] + 1);
          }
          if ((DAT_00656100[local_354 * 0x20] !== 0xff)) {
            local_144 = (local_144 + 1);
            if ((local_278 < 0)) {
              if ((DAT_0064c6b5[param_1 * 0x594] < 2)) {
                local_34c = 4;
              }
              else if ((DAT_0064c6b5[param_1 * 0x594] < 5)) {
                local_34c = 3;
              }
              else {
                local_34c = 2;
              }
              local_8 = (((((local_34c >> 1) - s8(DAT_006554f9[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30])) + -1) + u8(DAT_0064c932[(param_1 * 0x594 + local_278)])) / local_34c | 0)
              ;
              if ((local_274 === 1)) {
                local_8 = (local_8 + 1);
              }
              iVar3 = s32(DAT_fffffec0, local_278);
              if ((local_8 <= s32(DAT_fffffec0, local_278))) {
                iVar3 = local_8;
              }
              local_8 = iVar3;
              if ((s32(DAT_fffffdb0, local_278) <= iVar3)) {
                w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 0x200));
              }
            }
            if ((DAT_00656100[local_354 * 0x20] !== 0xff)) {
              uVar6 = u8(DAT_00656100[local_354 * 0x20]);
              if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                w32(DAT_fffffdb0, local_278, (s32(DAT_fffffdb0, local_278) + -1));
                w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) & 0xfdff));
              }
              if ((iVar3 < 5)) {
                w32((DAT_0064f344 + uVar6 * 0x58), 0, (s32((DAT_0064f344 + uVar6 * 0x58), 0) | 0x40));
              }
            }
          }
          if ((DAT_0064b1c1[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === 2)) {
            w16((DAT_0064c70a + param_1 * 0x594), 0, (s16((DAT_0064c70a + param_1 * 0x594), 0) + 1));
          }
          w16((DAT_0064c710 + param_1 * 0x594), 0, (s8(DAT_0064b1c4[local_274 * 0x14]) + s16((DAT_0064c710 + param_1 * 0x594), 0)));
          w16((DAT_0064c70e + param_1 * 0x594), 0, ((s8(DAT_0064b1c4[local_274 * 0x14]) + s8(DAT_0064b1c5[local_274 * 0x14])) + s16((DAT_0064c70e + param_1 * 0x594), 0)));
          if ((-1 < local_278)) {
            w16((DAT_0064c8b2 + (local_278 * 2 + param_1 * 0x594)), 0, (s16((DAT_0064c8b2 + (local_278 * 2 + param_1 * 0x594)), 0) + s8(DAT_0064b1c4[local_274 * 0x14])));
          }
        }
      }
      else if ((s8(DAT_006560f7[local_354 * 0x20]) === (param_1 & 0xff))) {
        iVar3 = FUN_005b29aa(local_354);
        iVar4 = FUN_005b29d7(local_354);
        if ((iVar4 <= (iVar3 / 2 | 0))) {
          iVar3 = FUN_005b89e4(((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16), 1);
          FUN_0049301b(param_1, ((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16), (((iVar3 === 0) - 1) & 2));
        }
      }
    }
 LAB_0053232b: :
  }
  (local_278 < 0x40) (local_278 = 0; local_278 = (local_278 < 0x40); local_278 = (local_278 + 1)) {
    DAT_0064c932[(param_1 * 0x594 + local_278)] = 0;
  }
  local_1c = 0;
  (local_344 < ((DAT_00655b18) << 16 >> 16)) (local_344 = 0; local_344 = (local_344 < ((DAT_00655b18) << 16 >> 16)); local_344 = (local_344 + 1)) {
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
    if ((s32((DAT_0064f394 + local_344 * 0x58), 0) !== 0)) {
      local_258 = ((s16((DAT_0064f340 + local_344 * 0x58), 0)) << 16 >> 16);
      local_26c = ((s16((DAT_0064f342 + local_344 * 0x58), 0)) << 16 >> 16);
      iVar3 = FUN_004087c0(local_258, local_26c);
      if ((iVar3 !== 0)) {
        if ((s8(DAT_0064f348[local_344 * 0x58]) === param_1)) {
          w16((DAT_0064c708 + param_1 * 0x594), 0, (s16((DAT_0064c708 + param_1 * 0x594), 0) + 1));
          w16((DAT_0064c70c + param_1 * 0x594), 0, (s8(DAT_0064f349[local_344 * 0x58]) + s16((DAT_0064c70c + param_1 * 0x594), 0)));
          if ((0xff < DAT_0064f379[local_344 * 0x58])) {
            DAT_0064c7f4[(param_1 * 0x594 + s8(DAT_0064f379[local_344 * 0x58]))] = (DAT_0064c7f4[(param_1 * 0x594 + s8(DAT_0064f379[local_344 * 0x58]))] + 1);
          }
          local_278 = FUN_005b8aa8(local_258, local_26c);
          if ((-1 < local_278)) {
            DAT_0064c972[(param_1 * 0x594 + local_278)] = (DAT_0064c972[(param_1 * 0x594 + local_278)] + DAT_0064f349[local_344 * 0x58]);
            DAT_0064c932[(param_1 * 0x594 + local_278)] = (DAT_0064c932[(param_1 * 0x594 + local_278)] + 1);
            if ((local_278 < 0x3f)) {
              local_1c = (local_1c + 1);
            }
          }
          iVar3 = FUN_005b8d62(local_258, local_26c);
          if ((iVar3 < 0)) {
            FUN_0049301b(param_1, local_258, local_26c, 1, 5);
          }
        }
        else if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_344 * 0x58] & 0x1f))) === 0)) {
          iVar3 = FUN_00467af0(param_1, s8(DAT_0064f348[local_344 * 0x58]));
          if ((((((DAT_00655af8) << 16 >> 16) + local_344) % 3) !== 0)) {
            iVar3 = FUN_0043d20a(local_344, 8);
            FUN_0049301b(param_1, local_258, local_26c, 0, (((-(iVar3 === 0)) & 2) + 2));
          }
          iVar3 = FUN_005b8d62(local_258, local_26c);
          if (((DAT_0064c6c0[(s8(DAT_0064f348[local_344 * 0x58]) * 4 + param_1 * 0x594)] & 0xe) === 0)) {
            FUN_0049301b(param_1, local_258, local_26c, 1, 2);
            FUN_0049301b(param_1, local_258, local_26c, 0, 3);
          }
        }
      }
    }
  }
  DAT_0064ca32[param_1 * 0x594] = 5;
  DAT_0064ca71[param_1 * 0x594] = 5;
  w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfffd));
  (local_38 < 8) (local_38 = 1; local_38 = local_38; local_38 = (local_38 + 1)) {
    if (((DAT_0064c6c1[(local_38 * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
      w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 2));
    }
  }
  (local_278 < 0x3f) (local_278 = 1; local_278 = (local_278 < 0x3f); local_278 = (local_278 + 1)) {
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
    local_148 = 0;
    local_34 = 0;
    local_340 = 0;
    local_14c = 0;
    local_28 = 0;
    local_270 = u8(DAT_0064ca32[(param_1 * 0x594 + local_278)]);
    (local_38 < 8) (local_38 = 1; local_38 = local_38; local_38 = (local_38 + 1)) {
      if ((DAT_0064c932[(local_38 * 0x594 + local_278)] !== 0)) {
        if ((param_1 !== local_38)) {
          iVar3 = FUN_00467af0(param_1, local_38);
          if (((DAT_0064c6c0[(local_38 * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
            if ((DAT_0064c932[(param_1 * 0x594 + local_278)] === 0)) {
              local_340 = (local_340 + 1);
            }
            else {
              local_34 = (local_34 + 1);
            }
          }
          if ((((((s16((DAT_0064c8b2 + (local_278 * 2 + param_1 * 0x594)), 0)) & 0xFFFF) >> 1) + ((s16((DAT_0064c832 + (local_278 * 2 + param_1 * 0x594)), 0)) & 0xFFFF)) < ((s16((DAT_0064c8b2 + (local_38 * 0x594 + local_278 * 2)), 0)) & 0xFFFF))) {
            local_148 = (local_148 + 1);
          }
        }
        local_14c = (local_14c + ((s16((DAT_0064c832 + (local_38 * 0x594 + local_278 * 2)), 0)) & 0xFFFF));
        local_28 = (local_28 + u8(DAT_0064c932[(local_38 * 0x594 + local_278)]));
        if ((param_1 !== local_38)) {
          if (((DAT_0064c6c0[(local_38 * 4 + param_1 * 0x594)] & 8) === 0)) {
            if ((DAT_0064c932[(local_38 * 0x594 + local_278)] !== 0)) {
              if (((DAT_0064c6c0[(local_38 * 4 + param_1 * 0x594)] & 4) === 0)) {
                DAT_0064c9f2[(param_1 * 0x594 + local_278)] = (DAT_0064c9f2[(param_1 * 0x594 + local_278)] | 1);
              }
              else {
                DAT_0064c9f2[(param_1 * 0x594 + local_278)] = (DAT_0064c9f2[(param_1 * 0x594 + local_278)] | 2);
              }
            }
            if ((s16((DAT_0064c832 + (local_38 * 0x594 + local_278 * 2)), 0) !== 0)) {
              if (((DAT_0064c6c0[(local_38 * 4 + param_1 * 0x594)] & 4) === 0)) {
                DAT_0064c9f2[(param_1 * 0x594 + local_278)] = (DAT_0064c9f2[(param_1 * 0x594 + local_278)] | 4);
              }
              else {
                DAT_0064c9f2[(param_1 * 0x594 + local_278)] = (DAT_0064c9f2[(param_1 * 0x594 + local_278)] | 8);
              }
            }
          }
          else {
            local_14c = (local_14c + ((s16((DAT_0064c832 + (local_38 * 0x594 + local_278 * 2)), 0)) & 0xFFFF));
            local_28 = (local_28 + u8(DAT_0064c932[(local_38 * 0x594 + local_278)]));
          }
        }
      }
    }
    if ((DAT_0064c932[local_278] !== 0)) {
      local_340 = (local_340 + 1);
    }
    local_264 = 6;
    if ((0x96 < DAT_00655af8)) {
      local_264 = 7;
    }
    if (((DAT_00655af0 & 4) !== 0)) {
      local_264 = (local_264 + 1);
    }
    iVar3 = (((s16((DAT_0064c832 + (local_278 * 2 + param_1 * 0x594)), 0)) & 0xFFFF) + local_14c) * 2;
    local_254 = u8((((iVar3 - ((s16((DAT_00666130 + local_278 * 0x10), 0)) << 16 >> 16)) !== 0) && (((s16((DAT_00666130 + local_278 * 0x10), 0)) << 16 >> 16) <= iVar3)));
    if ((DAT_0064c9f2[(param_1 * 0x594 + local_278)] === 0)) {
      local_368 = ((s8(DAT_006554f9[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) + local_264) + 1);
    }
    else {
      local_368 = local_264;
    }
    if ((((s16((DAT_00666132 + local_278 * 0x10), 0)) << 16 >> 16) < ((u8(DAT_0064c932[(param_1 * 0x594 + local_278)]) + local_28) * local_368 + 2))) {
      local_254 = 1;
    }
    iVar3 = FUN_004bd9f0(param_1, 0x2e);
    if ((iVar3 === 0)) {
      local_254 = 0;
    }
    if ((local_254 === 0)) {
      DAT_0064ca32[(param_1 * 0x594 + local_278)] = 5;
    }
    else {
      DAT_0064ca32[(param_1 * 0x594 + local_278)] = 4;
    }
    if ((local_340 !== 0)) {
      DAT_0064ca32[(param_1 * 0x594 + local_278)] = 0;
    }
    if ((local_148 !== 0)) {
      DAT_0064ca32[(param_1 * 0x594 + local_278)] = 1;
    }
    if ((local_34 !== 0)) {
      DAT_0064c9f2[(param_1 * 0x594 + local_278)] = (DAT_0064c9f2[(param_1 * 0x594 + local_278)] | 0x10);
    }
    if (((DAT_0064c9f2[(param_1 * 0x594 + local_278)] & 0xc) !== 8)) {
      DAT_0064ca32[(param_1 * 0x594 + local_278)] = 0;
    }
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      FUN_00442541(param_1, local_278);
    }
  }
  if ((local_1c <= u8(DAT_0064c971[param_1 * 0x594]))) {
    DAT_0064ca71[param_1 * 0x594] = 4;
  }
  if ((param_1 !== 0)) {
    local_27c = (u8(DAT_00655b0b) & (1 << (((param_1) & 0xFF) & 0x1f)));
    if ((local_27c === 0)) {
      if ((s16((DAT_0064c708 + param_1 * 0x594), 0) === 0)) {
        FUN_004aa378(param_1, 0);
      }
      if ((((((DAT_00655af8) << 16 >> 16) + param_1) & 7) === 0)) {
        FUN_0055f5a3(param_1, 0);
      }
    }
    iVar3 = FUN_005adfa0((((s16((DAT_0064c706 + param_1 * 0x594), 0)) << 16 >> 16) >> 3), 3, 0x63);
    (local_2c < 0x30) (local_2c = 0; local_2c = (local_2c < 0x30); local_2c = (local_2c + 1)) {
      w32(DAT_fffffcc4, local_2c, iVar3);
      if ((DAT_0064cab8[(local_2c * 6 + param_1 * 0x594)] === 0)) {
        w32(DAT_fffffcc4, local_2c, (s32(DAT_fffffcc4, local_2c) << 1));
      }
    }
    local_25c = 0;
    if ((local_27c === 0)) {
      local_25c = 1;
    }
    local_354 = ((DAT_00655b16) << 16 >> 16);
 LAB_00533de4: :
    local_354 = (local_354 - 1);
    if ((-1 < local_354)) {
      if ((2 < DAT_00655b02)) {
        FUN_0047e94e(1, 0);
      }
      if (((((s16((DAT_006560f4 + local_354 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
        if ((DAT_0064b1c4[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] < 0x63)) {
          if ((DAT_006560ff[local_354 * 0x20] !== 3)) {
            local_258 = ((s16((DAT_006560f0 + local_354 * 0x20), 0)) << 16 >> 16);
            local_26c = ((s16((DAT_006560f2 + local_354 * 0x20), 0)) << 16 >> 16);
            iVar4 = FUN_004087c0(local_258, local_26c);
            if ((DAT_006560fc[local_354 * 0x20] !== 0x37)) {
              if ((local_26c < 0x5d)) {
                uVar1 = s16((DAT_006560f4 + local_354 * 0x20), 0);
                if ((uVar6 !== param_1)) {
 LAB_005340a6: :
                  FUN_00531607(local_354, 0x31, 0x2b, 0x35);
                  w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) & 0xfffc));
                  goto LAB_00533de4;
                }
                if ((DAT_006560f6[local_354 * 0x20] === 0xa)) {
                  uVar7 = FUN_005b2e69(0x2b, 0x35, 2);
                  iVar4 = FUN_005b50ad(uVar7);
                  if ((iVar4 < 3)) {
                  if (((s16((DAT_006560f4 + local_354 * 0x20), 0) & 3) === 0)) {
                    iVar4 = _rand();
                    if (((iVar4 % 3) === 0)) {
                      w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 2));
                    }
                    else {
                      w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 1));
                    }
                  }
                  if ((uVar6 === param_1)) {
                    if (((s16((DAT_006560f4 + local_354 * 0x20), 0) & 2) !== 0)) {
                      uVar6 = FUN_005b8a1d(0x3e, 0x48);
                      if ((uVar6 === param_1)) {
                        uVar6 = FUN_005b8a1d(0x43, 0x5b);
                        if ((uVar6 !== param_1)) {
                          FUN_00531607(local_354, 0x31, 0x43, 0x5b);
                        }
                      }
                      else {
                        FUN_00531607(local_354, 0x31, 0x43, 0x5b);
                      }
                    }
                  }
                  else {
                    FUN_00531607(local_354, 0x31, 0x4c, 0x22);
                  }
                }
                w16((DAT_006560f4 + local_354 * 0x20), 0, uVar1);
              }
              if (((DAT_0064c9f2[(param_1 * 0x594 + local_278)] & 0x10) === 0)) {
                if ((iVar4 !== 1)) {
                  iVar4 = FUN_0043cf76(local_258, local_26c);
                  if ((-1 < iVar4)) {
                    DAT_0062ee08 = -1;
                    FUN_004e80b1(iVar4);
                    w16((DAT_0064f35c + iVar4 * 0x58), 0, ((((s8(DAT_0064b1c8[u8(DAT_006560f6[local_354 * 0x20]) * 0x14]) * DAT_006a657c / 2 | 0)) & 0xFFFF) + s16((DAT_0064f35c + iVar4 * 0x58), 0)));
                  }
                  FUN_005b6042(local_354, 1);
                  goto LAB_00533de4;
                }
                (local_274 < 0x3e) (local_274 = 0; local_274 = local_274; local_274 = (local_274 + 1)) {
                  if ((DAT_0064b1ca[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === DAT_0064b1ca[local_274 * 0x14])) {
                    DAT_006560f6[local_354 * 0x20] = ((local_274) & 0xFF);
                    w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) & 0xdfff));
                    break;
                  }
                }
              }
              local_18 = 0x270f;
              local_c = -1;
              local_260 = FUN_00531287(local_354);
              if ((DAT_0064b1c4[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] !== 0)) {
                (local_24 < 0x30) (local_24 = 0; local_24 = (local_24 < 0x30); local_24 = (local_24 + 1)) {
                  if ((iVar4 !== 0)) {
                    if (((DAT_0064b1bd[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] & 0x40) !== 0)) {
                      local_260 = 0x12;
                    }
                    if ((DAT_0064cab8[(local_24 * 6 + param_1 * 0x594)] === 2)) {
                      local_30 = FUN_005ae31d(local_258, local_26c, ((s16((DAT_0064cab4 + (local_24 * 6 + param_1 * 0x594)), 0)) << 16 >> 16), ((s16((DAT_0064cab6 + (local_24 * 6 + param_1 * 0x594)), 0)) << 16 >> 16));
                      if ((DAT_0064b1c1[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === 1)) {
                        if ((DAT_0064b1c3[u8(DAT_006560f6[local_354 * 0x20]) * 0x14] === 1)) {
                          if ((local_30 <= (((s8(DAT_0064b1c2[u8(DAT_006560f6[local_354 * 0x20]) * 0x14]) / u8(DAT_0064bcc8) | 0) + -2) >> 1))) {
                          local_30 = ((((u8((local_30 <= (s8(DAT_0064b1c2[u8(DAT_006560f6[local_354 * 0x20]) * 0x14]) / u8(DAT_0064bcc8) | 0))) - 1) & -2) + 4) * local_30 / (s8(DAT_0064cab9[(local_24 * 6 + param_1 * 0x594)]) + 1) | 0);
                          goto LAB_00534c18;
                        }
                      }
                      else {
                        local_30 = ((s32(DAT_fffffcc4, local_24) / (u8((DAT_0064cab8[(local_24 * 6 + param_1 * 0x594)] === 0)) + 1) | 0) * local_30 / (s8(DAT_0064cab9[(local_24 * 6 + param_1 * 0x594)]) + 1) | 0);
 LAB_00534c18: :
                        if ((iVar4 < 0)) {
                          if (((uVar6 & 0x80) !== 0)) {
                            local_30 = ((local_30 + ((local_30 >> 0x1f) & 7)) >> 3);
                          }
                          if (((local_30 / iVar3 | 0) < s8(DAT_0064cab9[(local_24 * 6 + param_1 * 0x594)]) * 4)) {
                            local_18 = local_30;
                            local_c = local_24;
                          }
                        }
                      }
                    }
                  }
                }
                if ((-1 < local_c)) {
                  if ((s16((DAT_0064cab6 + (param_1 * 0x594 + local_c * 6)), 0) === s16((DAT_006560f2 + local_354 * 0x20), 0))) {
                    DAT_006560ff[local_354 * 0x20] = 0x10;
                    w16((DAT_006560f4 + local_354 * 0x20), 0, (s16((DAT_006560f4 + local_354 * 0x20), 0) | 0x80));
                    goto LAB_00533de4;
                  }
                  if (((bVar2 & 0x42) === 0x40)) {
                    if (((DAT_0064cab9[(param_1 * 0x594 + local_c * 6)] & 1) === 0)) {
                    FUN_00531607(local_354, 0x31, ((s16((DAT_0064cab4 + (param_1 * 0x594 + local_c * 6)), 0)) << 16 >> 16), ((s16((DAT_0064cab6 + (param_1 * 0x594 + local_c * 6)), 0)) << 16 >> 16));
                    if ((-1 < iVar4)) {
                      DAT_0064cab9[(param_1 * 0x594 + local_c * 6)] = 0;
                    }
                    w32(DAT_fffffcc4, local_c, (s32(DAT_fffffcc4, local_c) + 1));
                  }
                }
              }
            }
          }
        }
        else {
          DAT_006560fc[local_354 * 0x20] = 0x21;
        }
      }
      goto LAB_00533de4;
    }
  }
  (local_344 < ((DAT_00655b18) << 16 >> 16)) (local_344 = 0; local_344 = (local_344 < ((DAT_00655b18) << 16 >> 16)); local_344 = (local_344 + 1)) {
    if ((s8(DAT_0064f348[local_344 * 0x58]) === param_1)) {
      if (((DAT_0064f345[local_344 * 0x58] & 4) === 0)) {
        w32((DAT_0064f344 + local_344 * 0x58), 0, (s32((DAT_0064f344 + local_344 * 0x58), 0) & -0x201));
      }
      w32((DAT_0064f344 + local_344 * 0x58), 0, (s32((DAT_0064f344 + local_344 * 0x58), 0) & -0x401));
    }
  }
  FUN_00493602(param_1);
  return;
}


 export function FUN_005351aa ()

 {
  let sVar1;
  let sVar2;
  let sVar3;
  let uVar4;
  let cVar5;
  let bVar6;
  let uVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let iVar11;
  let iVar12;
  let iVar13;
  let uVar14;
  let iVar15;
  let iVar16;
  let iVar17;
  let iVar18;
  let uVar19;
  let uVar20;
  let bVar21;
  let local_88;
  let local_84;
  let local_80;
  let local_74;
  let local_68;
  let local_64;
  let local_60;
  let local_54;
  let local_40;
  let local_34;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_40 = 8;
  iVar8 = ((DAT_00655afe) << 16 >> 16);
  iVar9 = s8(DAT_006560f7[iVar8 * 0x20]);
  if ((DAT_006560ff[iVar8 * 0x20] !== 0xb)) {
    DAT_006560ff[iVar8 * 0x20] = 0xff;
  }
  iVar10 = ((s16((DAT_006560f0 + iVar8 * 0x20), 0)) << 16 >> 16);
  sVar1 = s16((DAT_006560f2 + iVar8 * 0x20), 0);
  iVar11 = ((sVar1) << 16 >> 16);
  if ((iVar12 === 0)) {
    FUN_005b5d93(iVar8, 1);
    return 1;
  }
  iVar12 = FUN_005b4d8c(iVar10, iVar11, iVar9);
  uVar20 = u8(DAT_006560f6[iVar8 * 0x20]);
  local_60 = FUN_0043d07a(iVar10, iVar11, -1, -1, -1);
  if ((DAT_0064b1c9[uVar20 * 0x14] !== 0)) {
    iVar12 = FUN_005b50ad(iVar8, 2);
    iVar13 = FUN_005b53b6(iVar8, 6);
    if (((iVar12 - iVar13) < 2)) {
      FUN_005b6042(iVar8, 1);
      return 1;
    }
    DAT_006560fd[iVar8 * 0x20] = (DAT_006560fd[iVar8 * 0x20] + 1);
    if ((0x1e < DAT_006560fd[iVar8 * 0x20])) {
      FUN_005b6042(iVar8, 1);
      return 1;
    }
    (local_18 < 8) (local_18 = 0; local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
      uVar14 = FUN_005ae052((s8(DAT_00628350[local_18]) + iVar10));
      iVar12 = (s8(DAT_00628360[local_18]) + iVar11);
      iVar13 = FUN_004087c0(uVar14, iVar12);
      if ((iVar13 !== 0)) {
        if ((iVar12 < (((DAT_006d1162) << 16 >> 16) + -2))) {
          iVar13 = FUN_005b8a81(((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16));
          iVar15 = FUN_005b8a81(uVar14, iVar12);
          if ((iVar13 === iVar15)) {
            iVar13 = FUN_005b50ad(iVar8, 2);
            if ((DAT_0063f660 < 3)) {
              FUN_005b6042(iVar8, 1);
            }
            else {
              (local_34 < 8) (local_34 = 1; local_34 = (local_34 < 8); local_34 = (local_34 + 1)) {
                if ((DAT_00654fa8 === 0)) {
                  local_60 = FUN_0043d07a(uVar14, iVar12, -1, -1, -1);
                  FUN_0040ff60(0, (DAT_0064f360 + local_60 * 0x58));
                  if ((DAT_006d1da0 === local_34)) {
                    if ((DAT_00655b02 === 0)) {
                      FUN_005b496e(iVar8, local_34);
                      FUN_004105f8(uVar14, iVar12, iVar9);
                      FUN_0047cea6(uVar14, iVar12);
                    }
                    FUN_004442e0(s_BARBARIANSLAND_00632528, iVar8);
                  }
                  else if ((2 < DAT_00655b02)) {
                    FUN_00511880(0x4e, s32((DAT_006ad30c + s32((DAT_006ad558 + local_34 * 4), 0) * 0x54), 0), 1, 0, iVar8, 0);
                  }
                }
              }
              iVar9 = FUN_005b8931(uVar14, iVar12);
              DAT_006560f9[iVar8 * 0x20] = (_MEM[(iVar9 + 4)] | DAT_006560f9[iVar8 * 0x20]);
              DAT_006560fc[iVar8 * 0x20] = 0x55;
              FUN_00531567(iVar8, 0xffff, 0);
              FUN_005b6787(iVar8);
            }
            goto LAB_0053692c;
          }
        }
        iVar13 = FUN_005b89e4(uVar14, iVar12);
        if ((0 < iVar12)) {
          local_40 = local_18;
          goto LAB_00536859;
        }
      }
    }
    if ((DAT_006560ff[iVar8 * 0x20] !== 0xb)) {
      local_10 = 0;
      local_64 = -1;
      iVar9 = FUN_005b89e4(iVar10, iVar11);
      if ((iVar9 === 0)) {
        local_1c = -1;
      }
      else {
        local_1c = FUN_005b8a81(iVar10, iVar11);
      }
      (local_60 < ((DAT_00655b18) << 16 >> 16)) (local_60 = 0; local_60 = (local_60 < ((DAT_00655b18) << 16 >> 16)); local_60 = (local_60 + 1)) {
        if ((DAT_0064f348[local_60 * 0x58] !== 0)) {
          if ((-1 < local_1c)) {
            uVar14 = FUN_005b8a81(((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16));
            iVar9 = FUN_005b9431(uVar14, local_1c);
            if ((iVar9 === 0)) {
            local_64 = local_60;
            local_10 = iVar9;
          }
        }
 LAB_00535741: :
      }
      if ((local_64 < 0)) {
        FUN_005b6042(iVar8, 1);
        return 1;
      }
      FUN_00531653(iVar8, 0x70, ((s16((DAT_0064f340 + local_64 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_64 * 0x58), 0)) << 16 >> 16));
    }
    goto LAB_0053692c;
  }
  if (((bVar6 & 0x42) === 0x40)) {
    iVar13 = FUN_005b50ad(iVar8, 2);
    iVar15 = FUN_005b53b6(iVar8, 6);
    if ((DAT_0064b1c5[uVar20 * 0x14] <= DAT_0064b1c4[uVar20 * 0x14])) {
 LAB_005359af: :
    if ((DAT_0064b1c9[uVar20 * 0x14] !== 0)) {
      iVar13 = FUN_005b8a81(((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16));
      iVar15 = FUN_005b8a81(iVar10, iVar11);
      if ((8 < DAT_0063f660)) {
        FUN_005b6042(iVar8, 1);
        return 1;
      }
    }
    local_74 = -3;
    local_68 = -3;
    if ((-1 < local_60)) {
      iVar13 = FUN_005b8a81(((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16));
      iVar15 = FUN_005b8a81(iVar10, iVar11);
      if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_60 * 0x58] & 0x1f))) !== 0)) {
        local_68 = (((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16) - iVar10);
        if (((DAT_00655ae8 & 0x8000) === 0)) {
          local_80 = local_68;
          if ((local_68 < 1)) {
            local_80 = ((~local_68) + 1);
          }
          if (((((DAT_006d1160) << 16 >> 16) >> 1) <= local_80)) {
            local_68 = (-local_68);
          }
        }
        if ((local_68 < 1)) {
          if ((local_68 < 0)) {
            local_68 = -1;
          }
          else {
            local_68 = 0;
          }
        }
        else {
          local_68 = 1;
        }
        if (((((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16) === -3) || ((((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16) + 3) < 0))) {
          if (((((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16) + 3) < 0)) {
            local_74 = -1;
          }
          else {
            local_74 = 0;
          }
        }
        else {
          local_74 = 1;
        }
      }
    }
    if ((-1 < local_60)) {
      if ((s8(DAT_0064f348[local_60 * 0x58]) === iVar9)) {
        local_74 = -3;
        local_68 = -3;
      }
      if ((s16((DAT_0064c708 + s8(DAT_0064f348[local_60 * 0x58]) * 0x594), 0) < 2)) {
        local_74 = -3;
        local_68 = -3;
      }
      if ((s32((DAT_0064c6a2 + s8(DAT_0064f348[local_60 * 0x58]) * 0x594), 0) < 0x64)) {
        local_74 = -3;
        local_68 = -3;
      }
    }
    if ((local_68 !== -3)) {
      w16((DAT_00656102 + iVar8 * 0x20), 0, s16((DAT_0064f340 + local_60 * 0x58), 0));
      w16((DAT_00656104 + iVar8 * 0x20), 0, s16((DAT_0064f342 + local_60 * 0x58), 0));
      uVar4 = FUN_004adafc(iVar8);
      DAT_006560fb[iVar8 * 0x20] = uVar4;
    }
    if ((4 < DAT_0064b1ca[uVar20 * 0x14])) {
      cVar5 = FUN_005b89bb(iVar10, iVar11);
      iVar13 = FUN_005b50ad(iVar8, 2);
      if ((iVar13 < 2)) {
        local_40 = 8;
        goto LAB_00536859;
      }
      if ((cVar5 === 0xa)) {
        if ((DAT_0063f660 < 3)) {
          FUN_005b6042(iVar8, 1);
          return 1;
        }
      }
      else {
        iVar13 = FUN_005b67af(iVar10, iVar11, iVar9, iVar8);
        if ((DAT_0064b1ca[u8(DAT_006560f6[iVar13 * 0x20]) * 0x14] < 2)) {
          FUN_00531607(iVar8, 0x58, ((s16((DAT_006560f0 + iVar13 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar13 * 0x20), 0)) << 16 >> 16));
          goto LAB_0053692c;
        }
        if ((((((DAT_00655af8) << 16 >> 16) & 7) + 4) <= DAT_0063f660)) {
          FUN_005b6042(iVar8, 1);
          return 1;
        }
      }
    }
    local_10 = -0x3e7;
    (local_18 < 8) (local_18 = 0; local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
      uVar14 = FUN_005ae052((s8(DAT_00628350[local_18]) + iVar10));
      iVar13 = (s8(DAT_00628360[local_18]) + iVar11);
      iVar15 = FUN_004087c0(uVar14, iVar13);
      if ((iVar15 !== 0)) {
        bVar6 = FUN_005b89bb(uVar14, iVar13);
        if (((DAT_0064b1c1[uVar20 * 0x14] === 2) === (u8(bVar6) === 0xa))) {
          iVar15 = FUN_005b8d62(uVar14, iVar13);
          iVar16 = FUN_005b2e69(uVar14, iVar13);
          local_c = 0;
          if ((DAT_0064b1ca[uVar20 * 0x14] < 5)) {
            iVar17 = FUN_005b8ca6(uVar14, iVar13);
            if ((iVar9 === iVar17)) {
 LAB_005364bc: :
              iVar17 = FUN_005b8a1d(uVar14, iVar13);
              if ((iVar9 !== iVar17)) {
                local_c = 4;
              }
              uVar19 = FUN_005b94d5(uVar14, iVar13);
              if (((uVar19 & 0x40) === 0)) {
                uVar19 = FUN_005b94d5(uVar14, iVar13);
                if (((uVar19 & 0xc) !== 0)) {
                  local_c = (local_c + 6);
                }
              }
              else {
                local_c = (local_c + 8);
              }
              iVar17 = FUN_0059a791(0, 5);
              local_c = (local_c + iVar17);
              if ((iVar16 < 0)) {
 LAB_005365f1: :
                if (((DAT_0064b1bc[u8(DAT_006560f6[iVar8 * 0x20]) * 0x14] & 2) !== 0)) {
                  if ((s8(DAT_006560fb[iVar8 * 0x20]) === local_18)) {
                    local_c = (local_c + 6);
                  }
                  if ((local_68 !== -3)) {
                    if ((DAT_00628350[local_18] < 1)) {
                      if ((DAT_00628350[local_18] < 0)) {
                        local_84 = -1;
                      }
                      else {
                        local_84 = 0;
                      }
                    }
                    else {
                      local_84 = 1;
                    }
                    if ((local_68 === local_84)) {
                      local_c = (local_c + 2);
                    }
                  }
                  if ((local_74 !== -3)) {
                    if ((DAT_00628360[local_18] < 1)) {
                      if ((DAT_00628360[local_18] < 0)) {
                        local_88 = -1;
                      }
                      else {
                        local_88 = 0;
                      }
                    }
                    else {
                      local_88 = 1;
                    }
                    if ((local_74 === local_88)) {
                      local_c = (local_c + 2);
                    }
                  }
                  goto LAB_0053673f;
                }
              }
              else if ((iVar15 === iVar9)) {
                iVar15 = FUN_005b89e4(iVar10, iVar11);
                if ((iVar15 !== 0)) {
                  local_c = (local_c + -20);
                  goto LAB_005365f1;
                }
              }
              else {
                iVar15 = FUN_005b89e4(iVar10, iVar11);
                if ((iVar15 === 0)) {
                  if ((uVar20 === 9)) {
                    if ((DAT_0064b1ca[u8(DAT_006560f6[iVar16 * 0x20]) * 0x14] < 5)) {
                    local_c = (local_c + 0x63);
                  }
                  goto LAB_005365f1;
                }
              }
            }
            else {
              iVar18 = FUN_005b89e4(iVar10, iVar11);
              if ((iVar18 === 0)) {
                iVar18 = FUN_005b8d62(uVar14, iVar13);
                if ((iVar18 < 0)) {
                  iVar18 = (s32((DAT_0064c6a2 + iVar17 * 0x594), 0) / 2 | 0);
                  if ((iVar18 < 0x33)) {
                    iVar18 = 0x32;
                  }
                  local_54 = s8(DAT_0064f349[local_60 * 0x58]) * 0x19;
                  if ((s8(DAT_0064f349[local_60 * 0x58]) * 0x19 <= iVar18)) {
                    local_54 = iVar18;
                  }
                  if ((local_54 < 0x3e8)) {
                    local_54 = (s32((DAT_0064c6a2 + iVar17 * 0x594), 0) + 1);
                  }
                  FUN_00421da0(0, local_54);
                  if ((local_54 <= s32((DAT_0064c6a2 + iVar17 * 0x594), 0))) {
                    local_60 = FUN_0043cf76(uVar14, iVar13);
                    FUN_0040ff60(1, (DAT_0064f360 + local_60 * 0x58));
                    __chdir(DAT_0064bb08);
                    iVar18 = FUN_004a2379(DAT_00632544, s_BARBARIANS_00632538);
                    if ((iVar18 !== 0)) {
                      __chdir(DAT_00655020);
                      iVar18 = FUN_004a2379(DAT_00632558, s_BARBARIANS_0063254c);
                      if ((iVar18 !== 0)) {
                      sVar2 = s16((DAT_0064f342 + local_60 * 0x58), 0);
                      sVar3 = s16((DAT_0064f340 + local_60 * 0x58), 0);
                      (local_2c <= ((((sVar2) << 16 >> 16) * 3 + ((sVar3) << 16 >> 16) * 5) % iVar18)) (local_2c = 0; local_2c = (local_2c <= ((((sVar2) << 16 >> 16) * 3 + ((sVar3) << 16 >> 16) * 5) % iVar18));
                          local_2c = (local_2c + 1)) {
                        FUN_004a23fc(1);
                      }
                      FUN_0040ff60(0, DAT_00679640);
                      FUN_004105f8(((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16), iVar17);
                      if ((iVar18 !== 0)) {
                        w32((DAT_0064c6a2 + iVar17 * 0x594), 0, (s32((DAT_0064c6a2 + iVar17 * 0x594), 0) - local_54));
                        FUN_00569363(1);
                        (local_2c < 0x14) (local_2c = 0; local_2c = (local_2c < 0x14); local_2c = (local_2c + 1)) {
                          uVar14 = FUN_005ae052((((s16((DAT_0064f340 + local_60 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628370[local_2c])));
                          iVar8 = (((s16((DAT_0064f342 + local_60 * 0x58), 0)) << 16 >> 16) + s8(DAT_006283a0[local_2c]));
                          iVar9 = FUN_004087c0(uVar14, iVar8);
                          if ((DAT_006560f7[iVar9 * 0x20] === 0)) {
                            FUN_005b47fa(iVar9, 1);
                            FUN_0047cea6(uVar14, iVar8);
                          }
                        }
                        return 1;
                      }
                    }
                  }
                }
                if ((iVar17 < 0)) {
                  local_40 = local_18;
                  goto LAB_00536859;
                }
                if ((((((DAT_00655af8) << 16 >> 16) + iVar8) & 7) !== 0)) {
                  iVar17 = FUN_005b50ad(iVar8, 2);
                  if ((local_10 < 0x63)) {
                    local_10 = 0x63;
                    local_40 = 8;
                  }
                  goto LAB_005364bc;
                }
              }
            }
          }
          else {
            if ((-1 < iVar16)) {
              if ((iVar15 === iVar9)) {
                local_c = 0x63;
              }
              else {
                local_c = -99;
              }
            }
            FUN_0043d07a(uVar14, iVar13, -1, -1, -1);
            cVar5 = DAT_00627cc8[u8(bVar6) * 0x18];
            iVar13 = FUN_0059a791(0, 3);
            local_c = (local_c + ((s8(cVar5) + iVar13) + DAT_0063f660 * 4));
 LAB_0053673f: :
            if ((local_10 <= local_c)) {
              local_10 = local_c;
              local_40 = local_18;
            }
          }
        }
      }
 LAB_00535e74: :
    }
    iVar9 = FUN_005b8ca6(iVar10, iVar11);
    if ((0x62 < local_10)) {
      if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_60 * 0x58] & 0x1f))) !== 0)) {
        iVar9 = FUN_005b8931(iVar10, iVar11);
        if (((_MEM[(iVar9 + 1)] & 0x10) !== 0)) {
          FUN_004c50d0(iVar8, 0);
          FUN_005b6787(iVar8);
          goto LAB_0053692c;
        }
      }
    }
    else {
      local_40 = 8;
    }
  }
 LAB_00536859: :
  if ((local_40 === 8)) {
    DAT_006560fb[iVar8 * 0x20] = 0xff;
    FUN_005b6787(iVar8);
    if (((s16((DAT_006560f4 + iVar8 * 0x20), 0) & 0x100) !== 0)) {
      DAT_006560ff[iVar8 * 0x20] = 2;
    }
  }
  else {
    DAT_006560ff[iVar8 * 0x20] = 0x1b;
    uVar7 = FUN_005ae052((s8(DAT_00628350[local_40]) + iVar10));
    w16((DAT_00656102 + iVar8 * 0x20), 0, uVar7);
    w16((DAT_00656104 + iVar8 * 0x20), 0, (s8(DAT_00628360[local_40]) + sVar1));
  }
 LAB_0053692c: :
  if ((((s16((DAT_00656104 + iVar8 * 0x20), 0)) << 16 >> 16) === iVar11)) {
    DAT_006560ff[iVar8 * 0x20] = 0xff;
  }
  return 0;
}


 export function FUN_005369f3 (param_1)

 {
  let cVar1;
  let sVar2;
  let sVar3;
  let iVar4;
  let iVar5;
  let local_14;

  sVar2 = s16((DAT_0064f340 + param_1 * 0x58), 0);
  sVar3 = s16((DAT_0064f342 + param_1 * 0x58), 0);
  cVar1 = DAT_0064f348[param_1 * 0x58];
  (local_14 < ((DAT_00655b16) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b16) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((s32((DAT_0065610a + local_14 * 0x20), 0) !== 0)) {
      iVar4 = s8(DAT_006560f7[local_14 * 0x20]);
      if ((iVar4 !== 0)) {
        iVar4 = FUN_005ae31d(((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16), ((s16((DAT_006560f0 + local_14 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_14 * 0x20), 0)) << 16 >> 16));
        iVar5 = FUN_005b2a39(local_14);
        if ((iVar4 < iVar5)) {
          DAT_006560ff[local_14 * 0x20] = 0xb;
          w16((DAT_00656102 + local_14 * 0x20), 0, sVar2);
          w16((DAT_00656104 + local_14 * 0x20), 0, sVar3);
        }
      }
    }
  }
  return;
}


 export function FUN_00536bc9 (param_1, param_2)

 {
  let uVar1;
  let local_14;
  let local_c;
  let local_8;

  local_14 = 0;
  local_c = u8(DAT_0064c932[(param_1 * 0x594 + param_2)]);
  local_8 = 3;
  do {
    uVar1 = local_c;
    if ((4 < local_c)) {
      uVar1 = 5;
    }
    local_c = (local_c - uVar1);
    local_14 = (local_14 + local_8 * uVar1);
    local_8 = (local_8 + -1);
  } while ((0 < local_8))


 export function FUN_00536c4c (param_1)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let local_30;
  let local_28;
  let local_20;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar2 = s8(DAT_006560f7[param_1 * 0x20]);
  local_10 = -1;
  local_30 = -1;
  local_28 = 0;
  do {
    if ((((DAT_00655b18) << 16 >> 16) <= local_28)) {
      iVar3 = (5 - ((s16((DAT_0064c708 + iVar2 * 0x594), 0)) << 16 >> 16));
      if ((iVar3 < 1)) {
        iVar3 = 0;
      }
      if ((1 < DAT_0064c778[(iVar2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20]))])) {
        (local_14 < 8) (local_14 = 0; local_14 = local_14; local_14 = (local_14 + 1)) {
          uVar5 = FUN_005ae052((s8(DAT_00628350[local_14]) + ((s16((DAT_0064f340 + local_30 * 0x58), 0)) << 16 >> 16)));
          iVar3 = (s8(DAT_00628360[local_14]) + ((s16((DAT_0064f342 + local_30 * 0x58), 0)) << 16 >> 16));
          iVar4 = FUN_004087c0(uVar5, iVar3);
          if ((iVar4 < 0)) {
            FUN_005b36df(param_1, uVar5, iVar3, 1);
            DAT_006560f9[param_1 * 0x20] = 0;
            if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_30 * 0x58] & 0x1f))) !== 0)) {
              if (((DAT_0064c6c2[(s8(DAT_0064f348[local_30 * 0x58]) * 4 + iVar2 * 0x594)] & 2) === 0)) {
                w32((DAT_0064c6c0 + (s8(DAT_0064f348[local_30 * 0x58]) * 4 + iVar2 * 0x594)), 0, (s32((DAT_0064c6c0 + (s8(DAT_0064f348[local_30 * 0x58]) * 4 + iVar2 * 0x594)), 0) | 0x20000));
                w32((DAT_0064c6c0 + (s8(DAT_0064f348[local_30 * 0x58]) * 4 + iVar2 * 0x594)), 0, (s32((DAT_0064c6c0 + (s8(DAT_0064f348[local_30 * 0x58]) * 4 + iVar2 * 0x594)), 0) & -17));
                FUN_00467825(iVar2, s8(DAT_0064f348[local_30 * 0x58]), 0x10000);
              }
              else {
                w16((DAT_0064ca82 + (s8(DAT_0064f348[local_30 * 0x58]) * 0x594 + iVar2 * 2)), 0, (s16((DAT_0064ca82 + (s8(DAT_0064f348[local_30 * 0x58]) * 0x594 + iVar2 * 2)), 0) + 0xfffe));
              }
            }
            return (local_14 ^ 4);
          }
        }
      }
      return 8;
    }
    if (((s32((DAT_0064c6c0 + (iVar3 * 4 + iVar2 * 0x594)), 0) & 0x104) === 0x100)) {
      local_8 = 0;
      (local_14 < 9) (local_14 = 0; local_14 = local_14; local_14 = (local_14 + 1)) {
        uVar5 = FUN_005ae052((s8(DAT_00628350[local_14]) + ((s16((DAT_0064f340 + local_28 * 0x58), 0)) << 16 >> 16)));
        iVar3 = (s8(DAT_00628360[local_14]) + ((s16((DAT_0064f342 + local_28 * 0x58), 0)) << 16 >> 16));
        iVar4 = FUN_004087c0(uVar5, iVar3);
        if ((0 < iVar4)) {
          if ((iVar4 === iVar2)) {
            local_8 = (local_8 + -2);
          }
          else if (((s32((DAT_0064c6c0 + (iVar4 * 4 + iVar2 * 0x594)), 0) & 0x104) === 0x100)) {
            (-1 < local_20) (local_20 = FUN_005b2e69(uVar5, iVar3); -1 = (-1 < local_20);
                local_20 = FUN_005b2c82(local_20)) {
              local_8 = (local_8 + 1);
            }
          }
          else {
            local_8 = (local_8 + -99);
          }
        }
      }
      local_8 = (local_8 + (s8(DAT_0064f349[local_28 * 0x58]) >> 1));
      if ((local_10 < local_8)) {
        bVar1 = 0;
        (local_c < ((DAT_00655b18) << 16 >> 16)) (local_c = 0; local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
          if ((s8(DAT_0064f348[local_c * 0x58]) === iVar2)) {
            iVar3 = FUN_005ae1b0(((s16((DAT_0064f340 + local_c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_c * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_28 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_28 * 0x58), 0)) << 16 >> 16));
            iVar4 = FUN_005b2a39(param_1);
            if ((iVar3 <= (iVar4 / u8(DAT_0064bcc8) | 0))) {
              bVar1 = 1;
              break;
            }
          }
        }
        if (bVar1) {
          local_30 = local_28;
          local_10 = local_8;
        }
      }
    }
    local_28 = (local_28 + 1);
  } ( true );
}


 export function FUN_00537331 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let cVar1;
  let cVar2;
  let cVar3;
  let sVar4;
  let sVar5;
  let uVar6;
  let bVar7;
  let iVar8;
  let bVar9;
  let bVar10;
  let iVar11;
  let iVar12;
  let iVar13;
  let iVar14;
  let iVar15;
  let uVar16;
  let uVar17;
  let local_64;
  let local_58;
  let local_50;
  let local_4c;
  let local_44;
  let local_30;
  let local_2c;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar8 = param_1;
  bVar9 = DAT_006560f7[param_1 * 0x20];
  iVar11 = s8(bVar9);
  if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
    local_14 = FUN_005b2a39(param_1);
    local_14 = local_14 * 2;
  }
  else {
    cVar1 = DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14];
    cVar2 = DAT_006560fd[param_1 * 0x20];
    iVar12 = FUN_005b2a39(param_1);
    local_14 = FUN_005b2c3d(param_1);
    local_14 = ((s8(cVar1) - (s8(cVar2) + 1)) * iVar12 + local_14);
  }
  local_14 = (local_14 / u8(DAT_0064bcc8) | 0);
  local_4c = 0x270f;
  (local_44 < ((DAT_00655b18) << 16 >> 16)) (local_44 = 0; local_44 = (local_44 < ((DAT_00655b18) << 16 >> 16)); local_44 = (local_44 + 1)) {
    if ((iVar12 < local_4c)) {
      local_4c = iVar12;
    }
  }
  if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0)) {
    if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
      if ((DAT_006560ff[param_1 * 0x20] !== 0xb)) {
        iVar12 = FUN_005b2a39(param_1);
        iVar13 = FUN_005b2c3d(param_1);
        if ((local_4c <= local_14)) {
          DAT_006560fc[param_1 * 0x20] = 0x48;
          FUN_004c54da(param_1);
          return -1;
        }
      }
    }
    else if ((local_4c <= local_14)) {
      DAT_006560fc[param_1 * 0x20] = 0x48;
      FUN_004c54da(param_1);
      return -1;
    }
  }
  if ((DAT_0064b1c4[param_2 * 0x14] < 0x63)) {
    local_10 = (s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) << 2);
    local_58 = -1;
    param_1 = 0;
    do {
      if ((((DAT_00655b16) << 16 >> 16) <= param_1)) {
        if ((-1 < local_58)) {
          sVar4 = s16((DAT_006560f0 + local_58 * 0x20), 0);
          sVar5 = s16((DAT_006560f2 + local_58 * 0x20), 0);
          (local_20 < 8) (local_20 = 0; local_20 = local_20; local_20 = (local_20 + 1)) {
            iVar12 = FUN_005ae052((s8(DAT_00628350[local_20]) + ((sVar4) << 16 >> 16)));
            iVar13 = (s8(DAT_00628360[local_20]) + ((sVar5) << 16 >> 16));
            iVar14 = FUN_004087c0(iVar12, iVar13);
            if ((iVar14 < 0)) {
              FUN_005b36df(iVar8, iVar12, iVar13, 1);
              DAT_006560f9[iVar8 * 0x20] = 0;
              w32(param_3, 0, iVar12);
              w32(param_4, 0, iVar13);
              return (local_20 ^ 4);
            }
          }
        }
        iVar12 = FUN_005b50ad(iVar8, 8);
        if ((1 < iVar12)) {
          (local_44 < ((DAT_00655b18) << 16 >> 16)) (local_44 = 0; local_44 = (local_44 < ((DAT_00655b18) << 16 >> 16)); local_44 = (local_44 + 1)) {
            if ((s8(DAT_0064f348[local_44 * 0x58]) === iVar11)) {
              uVar16 = FUN_005b2e69(((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
              iVar13 = FUN_005b50ad(uVar16, 8);
              if ((iVar13 < iVar12)) {
                iVar13 = FUN_005ae1b0(s32(param_3, 0), s32(param_4, 0), ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
                iVar14 = FUN_005b2a39(iVar8);
                if ((iVar13 <= (iVar14 / u8(DAT_0064bcc8) | 0))) {
                  FUN_005b36df(iVar8, ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16), 1);
                  DAT_006560f9[iVar8 * 0x20] = 0;
                  w32(param_3, 0, ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16));
                  w32(param_4, 0, ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
                  return 8;
                }
              }
            }
          }
        }
        return 8;
      }
      if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 1)) {
        iVar12 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
        iVar13 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
        iVar14 = FUN_004087c0(iVar12, iVar13);
        if ((iVar14 !== 0)) {
          iVar14 = FUN_005b2a39(iVar8);
          uVar17 = u8(DAT_0064bcc8);
          iVar15 = FUN_005ae1b0(s32(param_3, 0), s32(param_4, 0), iVar12, iVar13);
          if ((iVar15 <= (iVar14 / uVar17 | 0))) {
            local_8 = s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14])
            ;
            bVar9 = FUN_005b94d5(iVar12, iVar13);
            if ((iVar14 !== 0)) {
              bVar7 = 1;
            }
            else {
              bVar7 = 0;
            }
            if ((-1 < iVar14)) {
              if ((!bVar7)) {
                iVar14 = FUN_005b50ad(param_1, 2);
                if ((iVar14 === 1)) {
                  local_8 = (local_8 << 1);
                }
                (local_20 < 8) (local_20 = 0; local_20 = local_20; local_20 = (local_20 + 1)) {
                  uVar16 = FUN_005ae052((s8(DAT_00628350[local_20]) + iVar12));
                  cVar1 = DAT_00628360[local_20];
                  iVar14 = FUN_004087c0(uVar16, (s8(cVar1) + iVar13));
                  if ((iVar14 === iVar11)) {
                    local_8 = (local_8 << 1);
                    break;
                  }
                }
              }
            }
            else {
              local_8 = FUN_005b50ad(param_1, 0);
            }
            iVar14 = FUN_005b89e4(iVar12, iVar13);
            if ((iVar14 !== 0)) {
              local_8 = (local_8 << 1);
            }
            bVar9 = FUN_005b94d5(iVar12, iVar13);
            if (((bVar9 & 0x42) === 0x40)) {
              local_8 = (local_8 << 1);
            }
            if ((local_10 <= (local_8 + s8(DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14])))) {
              local_58 = param_1;
              local_10 = (local_8 + s8(DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]));
            }
          }
        }
      }
      param_1 = (param_1 + 1);
    } ( true );
  }
  if ((param_5 === 3)) {
    local_10 = 0x270f;
    local_50 = 0x270f;
    local_58 = -1;
    (param_1 < ((DAT_00655b16) << 16 >> 16)) (param_1 = 0; param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
      if ((s8(DAT_006560f7[param_1 * 0x20]) === u8(bVar9))) {
        if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
 LAB_00537ec2: :
          iVar12 = FUN_005ae1b0(s32(param_3, 0), s32(param_4, 0), ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
          local_30 = iVar12 * 2;
          if (((u8(DAT_00655b0b) & (1 << (DAT_006560f7[param_1 * 0x20] & 0x1f))) !== 0)) {
            local_30 = (local_30 >> 1);
          }
          if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0)) {
            local_30 = (local_30 + -1);
          }
          iVar13 = FUN_005b50ad(param_1, 2);
          if ((iVar13 === 1)) {
            local_30 = (local_30 + -1);
          }
          if ((local_30 <= local_50)) {
            local_50 = local_30;
            local_58 = param_1;
            local_10 = iVar12;
          }
        }
        else {
          if ((DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
            iVar12 = FUN_005b50ad(param_1, 2);
          }
          else {
            iVar12 = FUN_005b50ad(param_1, 5);
          }
          if ((iVar12 < 2)) {
            uVar6 = s16((DAT_006560f4 + iVar8 * 0x20), 0);
            cVar1 = DAT_0064b1c4[param_2 * 0x14];
            cVar2 = DAT_0064b1c6[param_2 * 0x14];
            cVar3 = DAT_0064b1c7[param_2 * 0x14];
            local_1c = s8(DAT_0064b1c6[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * s8(DAT_0064b1c5[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * s8(DAT_0064b1c7[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * (3 - u8(((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) === 0)));
            if ((iVar12 === 1)) {
              local_1c = local_1c * 2;
            }
            bVar10 = FUN_005b89bb(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
            if (((local_1c * s8(DAT_00627cc9[u8(bVar10) * 0x18]) >> 1) * 3 <= (3 - u8(((uVar6 & 0x2000) === 0))) * s8(cVar1) * s8(cVar2) * s8(cVar3) * 2)) {
      if ((local_14 < local_4c)) {
        if ((local_14 < local_4c)) {
          FUN_00531607(iVar8, 0x41, ((s16((DAT_006560f0 + local_58 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_58 * 0x20), 0)) << 16 >> 16));
          return -1;
        }
        local_50 = 0x270f;
        (local_20 < 8) (local_20 = 0; local_20 = local_20; local_20 = (local_20 + 1)) {
          uVar16 = FUN_005ae052((s8(DAT_00628350[local_20]) + ((s16((DAT_006560f0 + local_58 * 0x20), 0)) << 16 >> 16)));
          iVar12 = (s8(DAT_00628360[local_20]) + ((s16((DAT_006560f2 + local_58 * 0x20), 0)) << 16 >> 16));
          iVar13 = FUN_004087c0(uVar16, iVar12);
          if ((iVar13 <= (local_10 + -1))) {
            DAT_0063f660 = 0x270f;
            local_c = -1;
            (local_44 < ((DAT_00655b18) << 16 >> 16)) (local_44 = 0; local_44 = (local_44 < ((DAT_00655b18) << 16 >> 16)); local_44 = (local_44 + 1)) {
              if ((iVar13 < DAT_0063f660)) {
                local_c = local_44;
                DAT_0063f660 = iVar13;
              }
            }
            if ((local_c < 0)) {
              DAT_0063f660 = 0;
            }
            if ((DAT_0063f660 < local_50)) {
              local_50 = DAT_0063f660;
            }
          }
        }
        if (((local_10 + local_50) <= local_14)) {
          FUN_00531607(iVar8, 0x41, ((s16((DAT_006560f0 + local_58 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_58 * 0x20), 0)) << 16 >> 16));
          return -1;
        }
      }
      local_64 = ((s16((DAT_006560f0 + local_58 * 0x20), 0)) << 16 >> 16);
      local_2c = ((s16((DAT_006560f2 + local_58 * 0x20), 0)) << 16 >> 16);
      local_44 = 0;
      do {
        if ((((DAT_00655b18) << 16 >> 16) <= local_44)) {
          local_10 = 0x3e7;
          local_18 = -1;
          (local_44 < ((DAT_00655b18) << 16 >> 16)) (local_44 = 0; local_44 = (local_44 < ((DAT_00655b18) << 16 >> 16)); local_44 = (local_44 + 1)) {
            if ((iVar12 < local_10)) {
              local_18 = local_44;
              local_10 = iVar12;
            }
          }
          if ((-1 < local_18)) {
            FUN_00531607(iVar8, 0x61, ((s16((DAT_0064f340 + local_18 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_18 * 0x58), 0)) << 16 >> 16));
            return -1;
          }
          if ((param_7 !== 0)) {
            FUN_004c54da(iVar8);
            return -1;
          }
          DAT_006560fc[iVar8 * 0x20] = 0x68;
          return 8;
        }
        if (((DAT_0064f346[local_44 * 0x58] & 1) !== 0)) {
          local_24 = FUN_005ae1b0(local_64, local_2c, ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
          if (((DAT_0064c6c0[(s8(DAT_0064f348[local_44 * 0x58]) * 4 + iVar11 * 0x594)] & 0x10) === 0)) {
            if (((DAT_0064c6c1[(s8(DAT_0064f348[local_44 * 0x58]) * 4 + iVar11 * 0x594)] & 0x20) === 0)) {
              local_24 = (local_24 << 1);
            }
            if (((DAT_0064c6c0[(s8(DAT_0064f348[local_44 * 0x58]) * 4 + iVar11 * 0x594)] & 4) !== 0)) {
            local_10 = local_24;
            local_64 = ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16);
            local_2c = ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16);
          }
        }
 LAB_00538277: :
        local_44 = (local_44 + 1);
      } ( true );
    }
    if ((param_7 !== 0)) {
      FUN_004c54da(iVar8);
      return -1;
    }
  }
  if ((DAT_0064b1c4[param_2 * 0x14] < 0x63)) {
    if ((DAT_006560ff[iVar8 * 0x20] === 0xb)) {
      if ((param_9 !== 0)) {
        w32(param_6, 0, 1);
        if ((s32(param_6, 0) !== 0)) {
          return -2;
        }
        return -1;
      }
    }
    else {
      local_58 = -1;
      local_10 = -0x270f;
      if ((-1 < iVar12)) {
        FUN_00531607(iVar8, 0x42, 0x2d, 0x35);
        if ((param_9 !== 0)) {
          w32(param_6, 0, 1);
        }
        if ((s32(param_6, 0) !== 0)) {
          return -2;
        }
        return -1;
      }
      (local_44 < ((DAT_00655b18) << 16 >> 16)) (local_44 = 0; local_44 = (local_44 < ((DAT_00655b18) << 16 >> 16)); local_44 = (local_44 + 1)) {
        if (((DAT_0064c6c0[(s8(DAT_0064f348[local_44 * 0x58]) * 4 + iVar11 * 0x594)] & 6) === 0)) {
          iVar12 = FUN_005ae1b0(s32(param_3, 0), s32(param_4, 0), ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
          iVar13 = FUN_005b2c3d(iVar8);
          if ((-1 < iVar12)) {
            cVar1 = DAT_0064f349[local_44 * 0x58];
            iVar12 = FUN_005b50ad(iVar12, 2);
            local_8 = (s8(cVar1) * 0xa + iVar12 * -25);
            iVar12 = FUN_005b8a81(((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
            if ((iVar12 === param_8)) {
              local_8 = (local_8 + 0x28);
            }
            (local_20 < 8) (local_20 = 0; local_20 = local_20; local_20 = (local_20 + 1)) {
              uVar16 = FUN_005ae052((((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628350[local_20])));
              sVar4 = s16((DAT_0064f342 + local_44 * 0x58), 0);
              cVar1 = DAT_00628360[local_20];
              iVar12 = FUN_004087c0(uVar16, (((sVar4) << 16 >> 16) + s8(cVar1)));
              if ((iVar12 === iVar11)) {
                local_8 = (local_8 + 0x3c);
              }
            }
            if ((local_10 <= local_8)) {
              local_10 = local_8;
              local_58 = local_44;
            }
          }
        }
      }
      if ((-1 < local_58)) {
        FUN_00531607(iVar8, 0x42, ((s16((DAT_0064f340 + local_58 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_58 * 0x58), 0)) << 16 >> 16));
        if ((param_9 !== 0)) {
          w32(param_6, 0, 1);
        }
        if ((s32(param_6, 0) !== 0)) {
          return -2;
        }
        return -1;
      }
    }
  }
  return -99;
}


 export function FUN_00538a29 ()

 {
  let cVar1;
  let uVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let bVar7;
  let uVar8;
  let uVar9;
  let iVar10;
  let iVar11;
  let iVar12;
  let iVar13;
  let uVar14;
  let uVar15;
  let pbVar16;
  let uVar17;
  let iVar18;
  let iVar19;
  let uVar20;
  let uVar21;
  let bVar22;
  let bVar23;
  let bVar24;
  let bVar25;
  let local_188;
  let local_17c;
  let local_170;
  let local_16c;
  let local_168;
  let local_160;
  let local_158;
  let local_14c;
  let local_144;
  let local_140;
  let local_134;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_104;
  let local_fc;
  let local_f0;
  let local_e8;
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
  let local_b4;
  let local_b0;
  let local_ac;
  let local_a8;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
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

  local_104 = -1;
  local_58 = -1;
  bVar23 = 0;
  bVar22 = 0;
  local_94 = 0;
  local_90 = 0;
  bVar4 = 0;
  local_a4 = 0;
  bVar3 = 0;
  local_20 = 0;
  local_48 = 0;
  local_b4 = 0;
  local_168 = ((DAT_00655afe) << 16 >> 16);
  bVar7 = DAT_006560f7[local_168 * 0x20];
  uVar8 = s8(bVar7);
  if ((uVar8 === 0)) {
    uVar9 = FUN_005351aa();
    return uVar9;
  }
  if ((DAT_006560ff[local_168 * 0x20] < 0xa)) {
    FUN_005b2f50(local_168);
    goto LAB_005436c1;
  }
  local_158 = FUN_005b4d8c(local_d4, local_e8, uVar8);
  local_88 = FUN_0043d07a(local_d4, local_e8, -1, -1, -1);
  iVar19 = DAT_0063f660;
  if ((-1 < local_88)) {
    local_104 = FUN_005b8aa8(((s16((DAT_0064f340 + local_88 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_88 * 0x58), 0)) << 16 >> 16));
  }
  local_40 = FUN_0043d07a(local_d4, local_e8, uVar8, -1, -1);
  local_3c = DAT_0063f660;
  if ((-1 < local_40)) {
    local_58 = FUN_005b8aa8(((s16((DAT_0064f340 + local_40 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_40 * 0x58), 0)) << 16 >> 16));
  }
  bVar6 = FUN_005b89bb(local_d4, local_e8);
  local_80 = u8(bVar6);
  iVar10 = FUN_005b8a81(local_d4, local_e8);
  bVar6 = FUN_005b94d5(local_d4, local_e8);
  local_bc = u8(((bVar6 & 0x42) === 0x40));
  if ((((1 << (bVar7 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    w16((DAT_006560f4 + local_168 * 0x20), 0, (s16((DAT_006560f4 + local_168 * 0x20), 0) & 0xfdff));
  }
  local_e4 = FUN_00531287(local_168);
  local_a0 = s32((DAT_0064b1bc + u8(DAT_006560f6[local_168 * 0x20]) * 0x14), 0);
  local_144 = s8(DAT_0064b1c1[u8(DAT_006560f6[local_168 * 0x20]) * 0x14]);
  uVar21 = u8(DAT_0064ca32[(uVar8 * 0x594 + iVar10)]);
  if (((DAT_0064c6c0[(DAT_006ced4c * 4 + uVar8 * 0x594)] & 4) !== 0)) {
    FUN_00456f20(uVar8, DAT_006ced4c, 1);
    if ((iVar11 === 0)) {
      w32((DAT_0064c6c0 + (DAT_006ced4c * 4 + uVar8 * 0x594)), 0, (s32((DAT_0064c6c0 + (DAT_006ced4c * 4 + uVar8 * 0x594)), 0) | 0x20));
    }
  }
  uVar15 = local_88;
  if (((DAT_0064c6c0[(s8(DAT_0064f348[uVar15 * 0x58]) * 4 + uVar8 * 0x594)] & 0xe) === 0)) {
    DAT_006560ff[local_168 * 0x20] = 0xff;
    local_158 = 1;
    DAT_006ced4c = s8(DAT_0064f348[uVar15 * 0x58]);
    bVar3 = 1;
  }
  local_d8 = u8((DAT_006560fa[local_168 * 0x20] !== 0));
  if (((s8(DAT_0064b1c6[uVar20 * 0x14]) >> 2) < u8(DAT_006560fa[local_168 * 0x20]))) {
    local_d8 = 2;
  }
  if (((s8(DAT_0064b1c6[uVar20 * 0x14]) >> 1) < u8(DAT_006560fa[local_168 * 0x20]))) {
    local_d8 = 3;
  }
  if ((iVar11 === 0)) {
    local_20 = 1;
    goto LAB_0053be12;
  }
  if ((local_d8 !== 0)) {
    local_f0 = 0;
    local_78 = FUN_005b8af0(local_d4, local_e8);
    if (((u8(DAT_0064c6be[local_78 * 0x594]) - s8(DAT_0064c6e8[(uVar8 * 0x594 + local_78)])) < 6)) {
      local_f0 = 1;
    }
    if ((iVar19 !== 0)) {
      if ((iVar19 === 1)) {
        if ((local_88 === local_40)) {
          FUN_00531607(local_168, 0x64, ((s16((DAT_0064f340 + local_88 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_88 * 0x58), 0)) << 16 >> 16));
          goto LAB_005436c1;
        }
        if (bVar3) {
          local_d8 = 0;
        }
      }
      goto LAB_005392a6;
    }
    local_90 = 1;
    local_48 = 1;
    goto LAB_0053b8f0;
  }
 LAB_005392a6: :
  if ((iVar19 < 9)) {
    w16((DAT_006560f4 + local_168 * 0x20), 0, (s16((DAT_006560f4 + local_168 * 0x20), 0) & 0xfff7));
    if ((local_144 === 2)) {
      if ((local_144 === 0)) {
        bVar24 = (local_158 === 0);
      }
      else {
        iVar11 = FUN_005b4b66(local_d4, local_e8, uVar8);
        if ((iVar11 === 0)) {
          bVar24 = 1;
        }
        else {
          bVar24 = 0;
        }
      }
      if (bVar24) {
        DAT_006560fc[local_168 * 0x20] = 0x64;
        local_c8 = 8;
        uVar15 = local_c8;
        goto LAB_005435ca;
      }
    }
    if ((iVar11 < 2)) {
      FUN_004c54da(local_168);
      iVar11 = FUN_005b2c3d(local_168);
      if ((iVar11 === 0)) {
        local_a4 = 1;
        goto LAB_005414d7;
      }
    }
    if ((local_d8 === 3)) {
      DAT_006560fc[local_168 * 0x20] = 0x44;
      if ((local_f0 === 0)) {
        local_c8 = 8;
        uVar15 = local_c8;
      }
      else {
        if ((local_f0 !== 0)) {
          if ((iVar11 === 0)) {
 LAB_005397e7: :
      if ((0x4f < s16((DAT_006560f0 + local_168 * 0x20), 0))) {
        if ((uVar21 !== local_e4)) {
          bVar4 = 1;
        }
        else {
          if ((local_144 === 1)) {
            local_cc = FUN_00537331(local_168, uVar20, DAT_ffffff2c, DAT_ffffff18, local_e4, DAT_ffffff5c, local_3c, iVar10, local_158);
            if ((local_cc === -2)) {
            uVar15 = FUN_00536c4c(local_168);
            local_d4 = ((s16((DAT_006560f0 + local_168 * 0x20), 0)) << 16 >> 16);
            local_e8 = ((s16((DAT_006560f2 + local_168 * 0x20), 0)) << 16 >> 16);
            goto LAB_005435ca;
          }
          if ((local_e4 === 6)) {
            if (((DAT_0064c6c0[(s8(DAT_0064f348[iVar11 * 0x58]) * 4 + uVar8 * 0x594)] & 0xe) === 0)) {
              local_a4 = 1;
            }
            else {
              iVar11 = FUN_005b89e4(local_d4, local_e8);
              if ((iVar11 === 0)) {
                local_24 = FUN_00598d45(uVar8);
                local_38 = -0x3e7;
                local_160 = -1;
                (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134; local_134 = (local_134 + 1)) {
                  if ((s32((DAT_0064f394 + local_134 * 0x58), 0) !== 0)) {
                    iVar11 = FUN_005b8a81(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                    iVar12 = FUN_005b89e4(local_d4, local_e8);
                    if ((iVar12 === 0)) {
                      if ((iVar11 === iVar10)) {
 LAB_00539cb3: :
                        local_78 = s8(DAT_0064f348[local_134 * 0x58]);
                        local_70 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                        if (((((uVar15 & 0x10) >>> 4) + 3) < local_70)) {
                          local_70 = (local_70 + 8);
                        }
                        if ((local_78 === uVar8)) {
                          local_18 = (0x63 - local_70);
                        }
                        else {
                          local_18 = 0x64;
                          if (((DAT_0064c6c0[(local_78 * 4 + uVar8 * 0x594)] & 0xe) !== 0)) {
                            if ((DAT_0064c932[(uVar8 * 0x594 + iVar10)] !== 0)) {
                            iVar11 = FUN_00467904(uVar8, local_78);
                            local_18 = (local_18 + iVar11);
                          }
                          else {
                            local_18 = (local_18 + 0x64);
                          }
                          local_18 = (local_18 / (local_70 + 1) | 0);
                          if (((DAT_0064f344[local_134 * 0x58] & 8) !== 0)) {
                            local_18 = (local_18 / 2 | 0);
                            if (((u8(DAT_0064c6b0[uVar8 * 0x594]) + 6) < u8(DAT_0064c6b0[local_78 * 0x594]))) {
                              local_18 = (local_18 / 2 | 0);
                            }
                            if ((local_24 !== 0)) {
                              local_18 = 1;
                            }
                          }
                          local_18 = (local_18 + 0x64);
                        }
                        if ((local_38 < local_18)) {
                          local_38 = local_18;
                          local_160 = local_134;
                        }
                      }
                    }
                    else {
                      local_c4 = 0;
                      (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                        uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                        local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                        iVar12 = FUN_004087c0(uVar9, local_74);
                        if ((iVar12 === iVar11)) {
                          local_c4 = 1;
                          break;
                        }
                      }
                      if ((local_c4 !== 0)) {
                  if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                    FUN_005b6042(local_168, 1);
                    return 1;
                  }
                  goto LAB_005436c1;
                }
                local_a4 = 1;
                if ((s8(DAT_0064f348[local_160 * 0x58]) !== uVar8)) {
                  FUN_00531607(local_168, 0x53, ((s16((DAT_0064f340 + local_160 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_160 * 0x58), 0)) << 16 >> 16));
                }
              }
            }
            goto LAB_005414d7;
          }
          if ((local_e4 === 7)) {
            if ((DAT_006560ff[local_168 * 0x20] === 0xb)) {
              local_160 = -1;
              local_38 = 0;
              (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                iVar11 = FUN_004087c0(uVar9, local_74);
                if ((DAT_0064c9f2[(uVar8 * 0x594 + iVar11)] !== 0)) {
                  local_18 = 0;
                  (local_78 < 8) (local_78 = 1; local_78 = local_78; local_78 = (local_78 + 1)) {
                    if ((local_78 === uVar8)) {
                      iVar11 = ((u8(DAT_0064c972[(uVar8 * 0x594 + iVar10)]) + 1) >> 1);
                    }
                    else {
                      iVar11 = u8(DAT_0064c972[(uVar8 * 0x594 + iVar10)]) * 2;
                    }
                    local_18 = (local_18 + iVar11);
                  }
                  if ((local_38 < local_18)) {
                    local_38 = local_18;
                    local_160 = local_60;
                  }
                }
              }
              if ((-1 < local_160)) {
                DAT_006560fc[local_168 * 0x20] = 0x74;
                local_c8 = local_160;
                uVar15 = local_c8;
                goto LAB_005435ca;
              }
            }
            local_38 = 0;
            local_160 = -1;
            if ((DAT_00656100[local_168 * 0x20] === 0xff)) {
              local_44 = -1;
            }
            else {
              local_44 = u8(DAT_00656100[local_168 * 0x20]);
            }
            if ((local_44 < 0)) {
              local_44 = local_40;
            }
            if ((local_44 < 0)) {
              FUN_005b6042(local_168, 1);
              return 1;
            }
            (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134; local_134 = (local_134 + 1)) {
              if ((iVar11 === iVar10)) {
                local_c4 = 1;
                (local_60 < s8(DAT_0064f37a[local_44 * 0x58])) (local_60 = 0; local_60 = local_60;
                    local_60 = (local_60 + 1)) {
                  if ((((s16((DAT_0064f384 + (local_44 * 0x58 + local_60 * 2)), 0)) << 16 >> 16) === local_134)) {
                    local_c4 = 0;
                  }
                }
                iVar11 = FUN_005ae31d(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
                local_70 = ((((s16((DAT_0064f35e + local_44 * 0x58), 0)) << 16 >> 16) + ((s16((DAT_0064f35e + local_134 * 0x58), 0)) << 16 >> 16)) * iVar11 / 0x18 | 0);
                if ((s8(DAT_0064f348[local_134 * 0x58]) === uVar8)) {
                  local_70 = (local_70 / 2 | 0);
                }
                else {
                  uVar9 = FUN_00467904(uVar8, s8(DAT_0064f348[local_134 * 0x58]), 0, 0x64);
                  local_cc = FUN_005adfa0(uVar9);
                  local_70 = ((0xc8 - local_cc) * local_70 / 0x64 | 0);
                }
                if ((local_c4 === 0)) {
                  local_70 = (local_70 / 2 | 0);
                }
                local_70 = ((5 - s8(DAT_0064f37a[local_134 * 0x58])) * local_70 / 5 | 0);
                if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_88 * 0x58] & 0x1f))) !== 0)) {
                  local_70 = (local_70 / 2 | 0);
                }
                if ((local_38 < local_70)) {
                  local_38 = local_70;
                  local_160 = local_134;
                }
              }
            }
            if ((-1 < local_160)) {
              FUN_00531607(local_168, 0x63, ((s16((DAT_0064f340 + local_160 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_160 * 0x58), 0)) << 16 >> 16));
              goto LAB_005436c1;
            }
            if ((DAT_00656100[local_168 * 0x20] !== 0xff)) {
              uVar15 = u8(DAT_00656100[local_168 * 0x20]);
              iVar11 = FUN_005b8a81(((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16));
              if ((iVar11 === iVar10)) {
                FUN_00531607(local_168, 0x63, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16));
                goto LAB_005436c1;
              }
            }
          }
          bVar22 = (local_e4 === 5);
          bVar23 = (DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] === 5);
          local_38 = FUN_005b8c42(local_d4, local_e8);
          if ((7 < local_38)) {
            local_38 = 8;
          }
          iVar11 = FUN_005b89e4(local_d4, local_e8);
          if ((iVar11 !== 0)) {
            local_38 = 0;
          }
          if ((7 < local_38)) {
            FUN_004c4d1e(local_168, -1, 0);
            return 1;
          }
          local_134 = local_88;
          if ((!bVar3)) {
            local_c8 = -1;
            if (bVar22) {
              local_e0 = 0x14;
            }
            else {
              local_e0 = 8;
            }
            (local_60 < local_e0) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
              uVar9 = FUN_005ae052((s8(DAT_00628370[local_60]) + local_d4));
              local_74 = (s8(DAT_006283a0[local_60]) + local_e8);
              iVar11 = FUN_004087c0(uVar9, local_74);
              if ((iVar11 === iVar10)) {
                local_18 = FUN_005b8c42(uVar9, local_74);
                if ((local_38 < local_18)) {
                  local_c8 = local_60;
                  local_38 = local_18;
                }
                iVar11 = FUN_005b8ffa(uVar9, local_74);
                if ((local_60 < 8)) {
                  local_c8 = local_60;
                  DAT_006560fc[local_168 * 0x20] = 0x55;
                  uVar15 = local_c8;
                  goto LAB_005435ca;
                }
              }
            }
            if ((4 < DAT_006560fe[local_168 * 0x20])) {
              if (bVar22) {
                if ((local_c8 < 0)) {
                  FUN_004c4d1e(local_168, -1, 0);
                  return 1;
                }
                DAT_006560fc[local_168 * 0x20] = 0x32;
                uVar15 = local_c8;
                if ((local_c8 < 8)) {
                uVar9 = FUN_005ae052((s8(DAT_00628370[local_c8]) + local_d4), (s8(DAT_006283a0[local_c8]) + local_e8), 5, 2);
                FUN_004933f2(uVar8, uVar9);
              }
            }
          }
          if (((0xe - iVar19) <= local_18)) {
            FUN_004c4d1e(local_168, -1, 0);
            return 1;
          }
          if (((DAT_0064b1bd[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] & 1) !== 0)) {
            if ((local_3c === 0)) {
              if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                local_38 = 0;
                (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134; local_134 = (local_134 + 1)) {
                  if ((iVar11 <= u8(DAT_0064bcdb))) {
                    iVar11 = FUN_005b8d62(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                    if ((local_38 < (s8(DAT_0064f349[local_134 * 0x58]) + 0x3e7))) {
                      local_38 = (s8(DAT_0064f349[local_134 * 0x58]) + 0x3e7);
                      local_8c = ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16);
                      local_10c = ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16);
                    }
                    if ((0 < local_38)) {
                      local_38 = 0;
                      local_160 = -1;
                      (-1 < local_60) (local_60 = 9; -1 = (-1 < local_60); local_60 = (local_60 - 1)) {
                        uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_8c));
                        local_74 = (s8(DAT_00628360[local_60]) + local_10c);
                        iVar11 = FUN_004087c0(uVar9, local_74);
                        if ((iVar11 <= u8(DAT_0064bcdb))) {
                          local_78 = FUN_005b8d62(uVar9, local_74);
                          if ((local_78 === uVar8)) {
                            local_160 = -1;
                            break;
                          }
                          if ((local_78 < 0)) {
                            local_18 = 0;
                            if ((local_60 === 8)) {
                              local_18 = 0x1f4;
                            }
                            bVar6 = FUN_005b94d5(uVar9, local_74);
                            if (((bVar6 & 0x42) === 0x40)) {
                              local_18 = (local_18 + 0x32);
                            }
                            bVar6 = FUN_005b89bb(uVar9, local_74);
                            local_18 = (local_18 + s8(DAT_00627cc9[u8(bVar6) * 0x18]) * 3);
                            iVar11 = FUN_005ae1b0(local_d4, local_e8, uVar9, local_74);
                            local_18 = (local_18 + iVar11);
                            if ((local_38 < local_18)) {
                              local_160 = local_60;
                              local_38 = local_18;
                            }
                          }
                        }
                      }
                      if ((-1 < local_160)) {
                        local_8c = FUN_005ae052((s8(DAT_00628350[local_160]) + local_8c));
                        FUN_004ca39e(local_168, local_8c, (local_10c + s8(DAT_00628360[local_160])));
                        return 0;
                      }
                    }
                  }
                }
              }
              if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                local_90 = 1;
                goto LAB_005414d7;
              }
            }
            else {
              if ((iVar11 === 0)) {
                FUN_00531607(local_168, 0x63, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                goto LAB_005436c1;
              }
              if ((iVar11 === 1)) {
                DAT_006560fc[local_168 * 0x20] = 0x46;
                local_c8 = 8;
                goto LAB_005436c1;
              }
            }
          }
        }
        if ((DAT_006560f8[local_168 * 0x20] === 0)) {
          if ((local_158 === 0)) {
            if ((DAT_006560fd[local_168 * 0x20] < 0xf)) {
              DAT_006560fd[local_168 * 0x20] = (DAT_006560fd[local_168 * 0x20] + 1);
            }
          }
          else if ((DAT_006560fd[local_168 * 0x20] !== 0)) {
            DAT_006560fd[local_168 * 0x20] = (DAT_006560fd[local_168 * 0x20] + 0xff);
          }
          if ((9 < DAT_006560fd[local_168 * 0x20])) {
            local_bc = 0;
          }
          if ((local_bc !== 0)) {
            local_38 = 0x270f;
            local_160 = -1;
            (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134; local_134 = (local_134 + 1)) {
              if ((s8(DAT_0064f348[local_134 * 0x58]) === uVar8)) {
                local_160 = local_134;
                local_38 = local_70;
              }
            }
            if ((s8(DAT_0064f348[local_160 * 0x58]) !== uVar8)) {
              local_bc = 0;
            }
          }
        }
        if ((2 < local_3c)) {
 LAB_0053b8f0: :
          if ((local_3c === 0)) {
            local_b0 = FUN_005b53b6(local_168, 1);
            if ((local_e4 === 4)) {
              iVar11 = FUN_005b4c63(local_d4, local_e8, uVar8);
              if ((iVar11 === 0)) {
                local_30 = 4;
              }
              else {
                local_30 = 3;
              }
              iVar11 = FUN_0043d20a(local_40, 1);
              if ((iVar11 === 0)) {
                if ((uVar21 === 5)) {
                  local_30 = (local_30 + 1);
                }
              }
              else {
                local_30 = (local_30 + -1);
              }
              uVar15 = ((s8(DAT_0064f349[local_40 * 0x58]) / local_30 | 0) + 1);
              iVar11 = FUN_0043d20a(local_40, 1);
              local_11c = uVar15;
              if ((iVar11 !== 0)) {
                local_cc = 1;
                if ((3 < DAT_0064f349[local_40 * 0x58])) {
                  local_cc = 2;
                }
                if ((7 < s16((DAT_0064c708 + uVar8 * 0x594), 0))) {
                  local_cc = 3;
                }
                if ((0xb < s16((DAT_0064c708 + uVar8 * 0x594), 0))) {
                  local_cc = 4;
                }
                local_11c = local_cc;
                if ((local_cc <= uVar15)) {
                  local_11c = uVar15;
                }
              }
            }
            if ((local_e4 === 1)) {
              if ((local_b0 < 2)) {
                local_48 = 1;
              }
              else {
                local_9c = FUN_0057e6e2(local_168, -1);
                if ((local_168 === local_9c)) {
                  local_48 = 1;
                }
                else {
                  if ((local_b0 < local_11c)) {
                    FUN_0049301b(uVar8, local_d4, local_e8, 1, 3);
                  }
                  if ((local_11c < local_b0)) {
                    local_cc = s8(DAT_006560ff[local_168 * 0x20]);
                    DAT_006560ff[local_168 * 0x20] = 2;
                    iVar11 = FUN_0057e6e2(local_168, -1);
                    if ((iVar11 <= local_11c)) {
                      DAT_006560ff[local_168 * 0x20] = ((local_cc) & 0xFF);
                      local_48 = 1;
                    }
                    else {
                      DAT_006560ff[local_168 * 0x20] = ((local_cc) & 0xFF);
                      if ((DAT_006560ff[local_168 * 0x20] === 2)) {
                        DAT_006560ff[local_168 * 0x20] = 0xff;
                      }
                    }
                  }
                  else {
                    local_48 = 1;
                  }
                }
              }
            }
            else {
              iVar11 = FUN_005b50ad(local_168, 2);
              if ((iVar11 !== 0)) {
                local_48 = 1;
              }
            }
          }
          if ((local_48 === 0)) {
            if (bVar4) {
              local_90 = 1;
            }
            if ((local_90 === 0)) {
 LAB_0053be12: :
              do {
                if ((local_144 === 2)) {
                  local_c = 0;
                  local_34 = 0;
                  local_9c = 0;
                  local_98 = local_168;
                  (-1 < local_168) (local_168 = FUN_005b2d39(local_168); iVar11 = local_98, -1 = (-1 < local_168);
                      local_168 = FUN_005b2c82(local_168)) {
                    if ((DAT_0064b1c1[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] === 0)) {
                      if ((DAT_006560ff[local_168 * 0x20] === 2)) {
                        if ((local_34 === 0)) {
                          DAT_006560ff[local_168 * 0x20] = 0xff;
                          local_c = (local_c | (1 << (DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] & 0x1f)));
                          local_34 = (local_34 + 1);
                        }
                      }
                      else if ((local_9c < local_11c)) {
                        local_9c = (local_9c + 1);
                        DAT_006560ff[local_168 * 0x20] = 1;
                      }
                      else {
                        DAT_006560ff[local_168 * 0x20] = 0xff;
                        local_c = (local_c | (1 << (DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] & 0x1f)));
                        local_34 = (local_34 + 1);
                      }
                    }
                  }
                  local_168 = local_98;
                  if ((local_e4 === 2)) {
                    FUN_00492c15(uVar8, 2, local_d4, local_e8, 0);
                    FUN_00492c15(uVar8, 0x12, local_d4, local_e8, 0);
                  }
                  if ((local_e4 === 4)) {
                    if ((DAT_006560fd[iVar11 * 0x20] < 0)) {
                      DAT_006560fd[iVar11 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
                    }
                    if ((local_34 < s8(DAT_0064b1c9[u8(DAT_006560f6[iVar11 * 0x20]) * 0x14]))) {
                      local_a8 = 1;
                    }
                    else {
                      local_a8 = 0;
                    }
                    if ((DAT_006560ff[iVar11 * 0x20] !== 0xb)) {
                      local_cc = 1;
                    }
                    else {
                      local_cc = 0;
                    }
                    local_c4 = u8((local_20 === 0));
                    if ((local_20 === 0)) {
                      if ((local_cc !== 0)) {
                        local_188 = s8(DAT_0064b1c9[u8(DAT_006560f6[iVar11 * 0x20]) * 0x14]);
                        if ((2 < local_188)) {
                          local_188 = 3;
                        }
                      }
                      else {
                        local_188 = 1;
                      }
                      if ((local_a8 !== 0)) {
                        local_c4 = local_a8;
                        local_38 = 0x3e7;
                        local_140 = 0;
                        (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134;
                            local_134 = (local_134 + 1)) {
                          if ((s8(DAT_006560fd[iVar11 * 0x20]) === (-1 - (local_134 & 0x3f)))) {
                            iVar12 = FUN_005b8a81(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            if ((local_3c === 0)) {
                              iVar13 = FUN_004429af(local_40, local_134);
                            }
                            else {
                              iVar13 = FUN_0044263f(local_134, iVar10);
                            }
                            if ((iVar13 !== 0)) {
                              local_dc = 0;
                              uVar2 = s16((DAT_0064c832 + (iVar12 * 2 + uVar8 * 0x594)), 0);
                              iVar13 = FUN_00536bc9(uVar8, iVar12);
                              if ((DAT_0064ca32[(uVar8 * 0x594 + iVar12)] !== 4)) {
                                if ((DAT_0064c9b2[(uVar8 * 0x594 + iVar12)] === 0)) {
                                local_70 = (local_70 + 0x10);
                              }
                              if ((DAT_0064c9f2[(uVar8 * 0x594 + iVar12)] === 0)) {
                                local_70 = (local_70 - (((s16((DAT_0064c8b2 + (uVar8 * 0x594 + iVar12 * 2)), 0)) & 0xFFFF) >> 2));
                              }
                              else {
                                local_70 = (local_70 + 0x10);
                              }
                              if ((local_70 < local_38)) {
                                local_38 = local_70;
                                local_160 = local_134;
                                local_140 = local_dc;
                                local_2c = u8(DAT_0064ca32[(uVar8 * 0x594 + iVar12)]);
                                FUN_00531607(iVar11, 0x33, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                              }
                            }
                          }
 LAB_0053c1e5: :
                        }
                        if ((local_34 < s8(DAT_0064b1c9[u8(DAT_006560f6[iVar11 * 0x20]) * 0x14]))) {
                          local_38 = 0x3e8;
                        }
                        if ((local_2c === 4)) {
                          local_70 = 4;
                        }
                        else {
                          local_70 = 2;
                        }
                        if ((local_38 < local_70 * 3)) {
                          DAT_006560fd[iVar11 * 0x20] = (0xff - (((local_160) & 0xFF) & 0x3f));
                          w32((DAT_0064f344 + local_160 * 0x58), 0, (s32((DAT_0064f344 + local_160 * 0x58), 0) | 0x600));
                          if ((local_140 === 0)) {
                            uVar9 = FUN_005b2e69(((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 5);
                            iVar12 = FUN_005b53b6(uVar9);
                            if ((iVar12 === 0)) {
                              if ((local_2c !== 5)) {
                                FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 5, local_70);
                              }
                              if ((local_2c !== 5)) {
                                FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 0x15, (local_70 + -1));
                              }
                            }
                            if ((local_2c !== 1)) {
                              FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 1, local_70);
                            }
                            if ((local_2c !== 0)) {
                              FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 0, local_70);
                            }
                            if ((local_2c === 5)) {
                              FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 6, local_70);
                            }
                          }
                          FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 7, 2);
                        }
                        else if (((DAT_0064c9f2[(uVar8 * 0x594 + iVar10)] & 0x10) === 0)) {
                          uVar2 = s16((DAT_0064c832 + (iVar10 * 2 + uVar8 * 0x594)), 0);
                          iVar12 = FUN_00536bc9(uVar8, iVar10);
                          uVar15 = local_40;
                          if ((uVar21 === 4)) {
                            local_dc = 1;
                          }
                          if ((DAT_0064c9b2[(uVar8 * 0x594 + iVar10)] !== 0)) {
                            local_140 = 1;
                          }
                          if ((local_140 !== 0)) {
                            w32((DAT_0064f344 + local_40 * 0x58), 0, (s32((DAT_0064f344 + local_40 * 0x58), 0) | 0x600));
                            if ((local_dc !== 0)) {
                              uVar9 = FUN_005b2e69(((s16((DAT_0064f340 + local_40 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_40 * 0x58), 0)) << 16 >> 16), 5);
                              iVar19 = FUN_005b53b6(uVar9);
                              if ((uVar21 !== 5)) {
                                FUN_0049301b(uVar8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), 5, local_70);
                                FUN_0049301b(uVar8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), 0x15, (local_70 + -1));
                              }
                              if ((uVar21 !== 1)) {
                                FUN_0049301b(uVar8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), 1, local_70);
                              }
                              if ((uVar21 !== 0)) {
                                FUN_0049301b(uVar8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), 0, local_70);
                              }
                              if ((uVar21 === 5)) {
                                FUN_0049301b(uVar8, ((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16), 6, local_70);
                              }
                            }
                            FUN_0049301b(uVar8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), 7, 2);
                            local_c8 = 8;
                            uVar15 = local_c8;
                            goto LAB_005435ca;
                          }
                        }
                      }
                    }
                    if ((local_3c === 0)) {
                      (-1 < local_cc) (local_cc = FUN_005b2d39(iVar11); -1 = (-1 < local_cc);
                          local_cc = FUN_005b2c82(local_cc)) {
                        if ((DAT_0064b1ca[u8(DAT_006560f6[local_cc * 0x20]) * 0x14] === 5)) {
                          FUN_005b3863(local_cc, 1);
                          break;
                        }
                      }
                    }
                    if (((DAT_00655af8 & 0xf) !== 0)) {
                      local_c4 = 0;
                    }
                    if ((local_20 !== 0)) {
                      bVar24 = (local_c === 0x80);
                      (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                        uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                        local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                        iVar12 = FUN_004087c0(uVar9, local_74);
                        if ((local_78 === uVar8)) {
                          if ((local_78 === uVar8)) {
                            uVar14 = FUN_005b2e69(uVar9, local_74, 2);
                            iVar12 = FUN_005b50ad(uVar14);
                            if ((1 < iVar12)) {
                            bVar5 = 1;
                          }
                          iVar12 = FUN_005b8a81(uVar9, local_74);
                          uVar15 = local_88;
                          local_dc = 0;
                          bVar25 = 0;
                          local_c0 = 0;
                          if (((local_c & 0x80) === 0)) {
                            if (bVar5) {
                            local_44 = -1;
                            (-1 < local_cc) (local_cc = FUN_005b2d39(iVar11); -1 = (-1 < local_cc);
                                local_cc = FUN_005b2c82(local_cc)) {
                              if ((DAT_0064b1ca[u8(DAT_006560f6[local_cc * 0x20]) * 0x14] === 7)) {
                                if ((DAT_00656100[local_cc * 0x20] === 0xff)) {
                                  local_44 = -1;
                                }
                                else {
                                  local_44 = u8(DAT_00656100[local_cc * 0x20]);
                                }
                              }
                            }
                            if ((local_44 < 0)) {
                              local_44 = FUN_0043d07a(uVar9, local_74, uVar8, -1, -1);
                            }
                            if ((local_44 < 1)) {
                              local_44 = 0;
                            }
                            bVar25 = (DAT_006560fc[iVar11 * 0x20] !== 0x33);
                            iVar13 = FUN_005b8a81(((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
                            if ((iVar13 < 0x10)) {
                              bVar25 = 0;
                            }
                            if ((s8(DAT_0064f348[uVar15 * 0x58]) === uVar8)) {
                              if ((DAT_0064f349[uVar15 * 0x58] < 8)) {
                                bVar25 = 0;
                              }
                              iVar13 = FUN_005ae31d(((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16));
                              if ((iVar13 < 0x10)) {
                                bVar25 = 0;
                              }
                            }
                            (local_7c < s8(DAT_0064f37a[local_44 * 0x58])) (local_7c = 0;
                                local_7c = local_7c;
                                local_7c = (local_7c + 1)) {
                              if ((((s16((DAT_0064f384 + (local_7c * 2 + local_44 * 0x58)), 0)) << 16 >> 16) === uVar15)) {
                                bVar25 = 0;
                              }
                            }
                          }
                          uVar2 = s16((DAT_0064c832 + (iVar12 * 2 + uVar8 * 0x594)), 0);
                          iVar13 = FUN_00536bc9(uVar8, iVar12);
                          if ((DAT_0064ca32[(uVar8 * 0x594 + iVar12)] !== 4)) {
                            local_dc = 1;
                          }
                          if ((s16((DAT_0064c832 + (iVar12 * 2 + uVar8 * 0x594)), 0) < 8)) {
                            local_dc = 1;
                          }
                          if (((((1 << (DAT_0064ca32[(uVar8 * 0x594 + iVar12)] & 0x1f)) & local_c) & 3) !== 0)) {
                            local_dc = 1;
                          }
                          if (((DAT_0064c6c1[(s8(DAT_0064f348[local_88 * 0x58]) * 4 + uVar8 * 0x594)] & 0x20) !== 0)) {
                            local_dc = 1;
                          }
                          if ((DAT_006560fc[iVar11 * 0x20] !== 0x33)) {
                            local_dc = 1;
                            local_16c = 1;
                          }
                          if ((DAT_0064c9f2[(uVar8 * 0x594 + iVar12)] === 0)) {
                            if ((0x31 < s16((DAT_00666130 + iVar12 * 0x10), 0))) {
                              DAT_0064c9f2[(uVar8 * 0x594 + iVar12)] = (DAT_0064c9f2[(uVar8 * 0x594 + iVar12)] | 0x80);
                              local_c0 = 1;
                            }
                            else {
                              local_dc = 0;
                            }
                          }
                          if (((DAT_0064c9f2[(uVar8 * 0x594 + iVar12)] & 5) !== 0)) {
                            local_dc = 0;
                          }
                          if ((1 < local_d8)) {
                            local_dc = 1;
                          }
                          if ((iVar13 !== 0)) {
                            local_dc = 1;
                          }
                          if (bVar24) {
                            local_dc = 0;
                          }
                          if ((local_16c !== 0)) {
                            if (bVar24) {
                              if ((!bVar25)) {
                                DAT_006560fd[iVar11 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
                              }
                            }
                            else if ((local_dc === 0)) {
                              DAT_006560fd[iVar11 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
                            }
                          }
                          if ((local_74 < (((DAT_006d1162) << 16 >> 16) + -2))) {
                            iVar10 = FUN_005b2c3d(iVar11);
                            if ((local_c8 !== 8)) {
                              DAT_006560fc[iVar11 * 0x20] = 0x62;
                              uVar15 = local_c8;
                              goto LAB_005435ca;
                            }
                            if ((DAT_0064ca32[(uVar8 * 0x594 + iVar12)] === 0)) {
                              FUN_0049301b(uVar8, local_d4, local_e8, 2, 5);
                            }
                            DAT_006560fc[iVar11 * 0x20] = 0x55;
                            FUN_005b6787(iVar11);
                            DAT_006560ff[iVar11 * 0x20] = 0xff;
                            if ((!bVar25)) {
                              local_c = (local_c & -0x81);
                            }
                            FUN_00531567(iVar11, local_c, local_c0);
                            goto LAB_005436c1;
                          }
                          if ((local_74 < (((DAT_006d1162) << 16 >> 16) + -2))) {
                            if ((DAT_0064ca32[(uVar8 * 0x594 + iVar12)] === 0)) {
                              FUN_0049301b(uVar8, local_d4, local_e8, 2, 5);
                            }
                            DAT_006560fc[iVar11 * 0x20] = 0x75;
                            FUN_005b6787(iVar11);
                            local_c = 0x80;
                            if ((!bVar5)) {
                              local_c = 0x82;
                            }
                            FUN_00531567(iVar11, local_c, local_c0);
                            DAT_006560ff[iVar11 * 0x20] = 0xff;
                            goto LAB_005436c1;
                          }
                          if (((DAT_00655af8 & 3) === 0)) {
                            DAT_006560ff[iVar11 * 0x20] = 0xff;
                          }
                        }
 LAB_0053cdd1: :
                      }
                      iVar12 = FUN_005b2c3d(iVar11);
                      if ((DAT_006560ff[iVar11 * 0x20] === 0xb)) {
                        local_17c = ((((s16((DAT_00656102 + iVar11 * 0x20), 0)) << 16 >> 16) + local_d4) >> 1);
                        local_74 = ((((s16((DAT_00656104 + iVar11 * 0x20), 0)) << 16 >> 16) + local_e8) >> 1);
                        if (((local_17c & 1) !== 0)) {
                          local_17c = (local_17c - 1);
                        }
                        if (((local_74 & 1) !== 0)) {
                          local_17c = (local_17c + 1);
                        }
                        FUN_0049301b(uVar8, local_17c, local_74, 2, 3);
                      }
                    }
                  }
                  if ((local_20 !== 0)) {
                    return 1;
                  }
                  if ((local_158 === 0)) {
                    if ((DAT_0064b1c9[u8(DAT_006560f6[iVar11 * 0x20]) * 0x14] !== 0)) {
                      local_38 = 0x18;
                      (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134;
                          local_134 = (local_134 + 1)) {
                        if ((DAT_0064ca32[(uVar8 * 0x594 + iVar12)] === 1)) {
                          if ((local_3c === 0)) {
                            iVar12 = FUN_004429af(local_40, local_134);
                          }
                          else {
                            iVar12 = FUN_0044263f(local_134, iVar10);
                          }
                          if ((iVar12 !== 0)) {
                            local_70 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            iVar12 = FUN_005b8d62(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            if ((iVar12 < 0)) {
                              local_70 = (local_70 / 2 | 0);
                            }
                            else {
                              iVar12 = FUN_00492e60(uVar8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16), 1);
                              if ((iVar12 !== 0)) {
                                local_70 = (local_70 - (local_70 / 3 | 0));
                              }
                            }
                            if ((local_70 < local_38)) {
                              local_38 = local_70;
                              FUN_00531607(iVar11, 0x41, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            }
                          }
                        }
                      }
                    }
                    if (((local_c & 3) !== 0)) {
                      local_38 = 0x3e7;
                      (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134;
                          local_134 = (local_134 + 1)) {
                        if ((iVar12 < 0)) {
                          FUN_005b8a81(((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                          if ((local_3c === 0)) {
                            iVar12 = FUN_004429af(local_40, local_134);
                          }
                          else {
                            iVar12 = FUN_0044263f(local_134, iVar10);
                          }
                          if ((iVar12 !== 0)) {
                            local_70 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            (local_14c < 8) (local_14c = 1; local_14c = (local_14c < 8); local_14c = (local_14c + 1)) {
                              if (((DAT_0064c6c1[(local_78 * 4 + local_14c * 0x594)] & 0x20) !== 0)) {
                                local_70 = (local_70 / 2 | 0);
                                break;
                              }
                            }
                            if (((DAT_0064f347[local_134 * 0x58] & 8) !== 0)) {
                              local_70 = (local_70 << 1);
                            }
                            if ((local_70 < local_38)) {
                              local_38 = local_70;
                              DAT_006560fd[iVar11 * 0x20] = (((local_134) & 0xFF) & 7);
                              FUN_00531607(iVar11, 0x49, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            }
                          }
                        }
                      }
                    }
                    if ((DAT_006560ff[iVar11 * 0x20] !== 0xb)) {
                      local_110 = -1;
                      (local_78 < 8) (local_78 = 0; local_78 = local_78; local_78 = (local_78 + 1)) {
                        if ((local_110 < 0)) {
                          local_110 = local_78;
                        }
                      }
                      if (((local_c & 0x20) === 0)) {
                        local_38 = 0x3e7;
                        local_1c = FUN_005b8aa8(local_d4, local_e8);
                        (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = (s8(DAT_006560fd[iVar11 * 0x20]) & 7);
                            local_134 = local_134; local_134 = (local_134 + 8)) {
                          if ((local_1c !== iVar12)) {
                            if ((local_3c === 0)) {
                              iVar12 = FUN_00442885(local_40, iVar12);
                            }
                            else {
                              iVar12 = FUN_005b9431(iVar12, iVar10);
                            }
                            if ((iVar12 !== 0)) {
                              local_70 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                              if (((DAT_0064c6c1[(local_110 * 0x594 + local_78 * 4)] & 0x20) !== 0)) {
                                local_70 = (local_70 / 2 | 0);
                              }
                              if (((DAT_0064c6c1[(local_78 * 4 + uVar8 * 0x594)] & 8) !== 0)) {
                                local_70 = (local_70 / 2 | 0);
                              }
                              if ((iVar12 < 0)) {
                                local_70 = (local_70 / 2 | 0);
                              }
                              if (((DAT_0064f347[local_134 * 0x58] & 8) !== 0)) {
                                local_70 = (local_70 << 1);
                              }
                              if ((local_70 < local_38)) {
                                local_38 = local_70;
                                FUN_00531607(iVar11, 0x34, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                              }
                            }
                          }
                        }
                      }
                    }
                    if ((DAT_0064b1c9[u8(DAT_006560f6[iVar11 * 0x20]) * 0x14] !== 0)) {
                      local_38 = -0x3e7;
                      local_1c = FUN_005b8aa8(local_d4, local_e8);
                      local_44 = -1;
                      local_98 = iVar11;
                      (-1 < local_168) (local_168 = FUN_005b2d39(iVar11); iVar11 = local_98, -1 = (-1 < local_168)
                          ; local_168 = FUN_005b2c82(local_168)) {
                        if ((DAT_00656100[local_168 * 0x20] !== 0xff)) {
                          local_44 = u8(DAT_00656100[local_168 * 0x20]);
                        }
                      }
                      local_168 = local_98;
                      if ((local_44 < 0)) {
                        local_44 = 0;
                      }
                      (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134;
                          local_134 = (local_134 + 1)) {
                        if ((local_1c !== iVar12)) {
                          if ((local_3c === 0)) {
                            if ((s8(DAT_0064f348[local_134 * 0x58]) === uVar8)) {
                              iVar12 = FUN_004429af(local_40, local_134);
                            }
                            else {
                              iVar12 = FUN_00442885(local_40, iVar12);
                            }
                          }
                          else if ((s8(DAT_0064f348[local_134 * 0x58]) === uVar8)) {
                            iVar12 = FUN_0044263f(local_134, iVar10);
                          }
                          else {
                            iVar12 = FUN_005b9431(iVar12, iVar10);
                          }
                          if ((iVar12 !== 0)) {
                            local_70 = FUN_005ae31d(((s16((DAT_0064f340 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_44 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            if ((s8(DAT_0064f348[local_134 * 0x58]) === uVar8)) {
                              local_70 = (local_70 / 2 | 0);
                            }
                            if (((DAT_0064c6c1[(s8(DAT_0064f348[local_134 * 0x58]) * 4 + uVar8 * 0x594)] & 0x20) !== 0)) {
                              local_70 = (local_70 - (local_70 / 3 | 0));
                            }
                            if (((DAT_0064c6c0[(s8(DAT_0064f348[local_134 * 0x58]) * 4 + uVar8 * 0x594)] & 8) !== 0)) {
                              local_70 = (local_70 + (local_70 / 3 | 0));
                            }
                            if ((4 < s16((DAT_0064c708 + local_78 * 0x594), 0))) {
                              local_70 = (local_70 / 2 | 0);
                            }
                            local_70 = ((s16((DAT_0064f35e + local_134 * 0x58), 0)) << 16 >> 16) * local_70;
                            iVar12 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            local_70 = (local_70 / ((iVar12 >> 3) + 1) | 0);
                            if ((local_38 < local_70)) {
                              local_38 = local_70;
                              FUN_00531607(iVar11, 0x54, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            }
                          }
                        }
                      }
                    }
                    if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                      local_38 = 0x3e7;
                      local_1c = FUN_005b8aa8(local_d4, local_e8);
                      (local_134 < ((DAT_00655b18) << 16 >> 16)) (local_134 = 0; local_134 = local_134;
                          local_134 = (local_134 + 1)) {
                        if ((DAT_0064ca32[(uVar8 * 0x594 + iVar11)] !== 4)) {
                          if ((local_3c === 0)) {
                            iVar12 = FUN_004429af(local_40, local_134);
                          }
                          else {
                            iVar12 = FUN_0044263f(local_134, iVar10);
                          }
                          if ((iVar12 !== 0)) {
                            if (((local_c & (1 << (DAT_0064ca32[(uVar8 * 0x594 + iVar11)] & 0x1f))) === 0)) {
                              local_70 = (local_70 << 1);
                            }
                            if ((local_70 < local_38)) {
                              local_38 = local_70;
                              FUN_00531607(local_168, 0x35, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                            }
                          }
                        }
                      }
                    }
                    if ((DAT_0064b1c9[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] !== 0)) {
                      if ((DAT_006560fc[local_168 * 0x20] === 0x56)) {
                        local_17c = ((s16((DAT_00656102 + local_168 * 0x20), 0)) << 16 >> 16);
                        local_74 = ((s16((DAT_00656104 + local_168 * 0x20), 0)) << 16 >> 16);
                      }
                      else {
                        local_74 = FUN_0059a791(0, (((DAT_006d1162) << 16 >> 16) + -1));
                        local_17c = FUN_0059a791(0, (((DAT_006d1160) << 16 >> 16) + -1));
                        if (((local_17c & 1) !== 0)) {
                          local_17c = (local_17c - 1);
                        }
                        if (((local_74 & 1) !== 0)) {
                          local_17c = (local_17c + 1);
                        }
                      }
                      iVar11 = FUN_005b8aa8(local_17c, local_74);
                      local_1c = FUN_005b8aa8(local_d4, local_e8);
                      if ((DAT_0064c932[(uVar8 * 0x594 + iVar11)] === 0)) {
                        local_c4 = 1;
                        if ((local_3c === 0)) {
                          iVar11 = FUN_00442885(local_40, iVar11);
                          if ((iVar11 === 0)) {
                            local_c4 = 0;
                          }
                        }
                        else {
                          iVar11 = FUN_005b9431(iVar11, iVar10);
                          if ((iVar11 === 0)) {
                            local_c4 = 0;
                          }
                        }
                        if ((local_c4 !== 0)) {
                          FUN_00531653(local_168, 0x56, local_17c, local_74);
                        }
                      }
                    }
                    if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                      (local_60 < 0x18) (local_60 = 2; local_60 = local_60; local_60 = (local_60 + 1)) {
                        local_7c = FUN_0059a791(0, 7);
                        uVar9 = FUN_005ae052((s8(DAT_00628350[local_7c]) * local_60 + local_d4));
                        local_74 = (s8(DAT_00628360[local_7c]) * local_60 + local_e8);
                        iVar11 = FUN_004087c0(uVar9, local_74);
                        if ((DAT_0064c932[(uVar8 * 0x594 + iVar11)] === 0)) {
                          if ((local_3c === 0)) {
                            iVar11 = FUN_00442885(local_40, iVar11);
                          }
                          else {
                            iVar11 = FUN_005b9431(iVar11, iVar10);
                          }
                          if ((iVar11 !== 0)) {
                            FUN_00531653(local_168, 0x36, uVar9, local_74);
                          }
                        }
                      }
                    }
                  }
                }
                uVar15 = local_88;
                iVar11 = FUN_005b2a39(local_168);
                if ((DAT_0064b1c4[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] !== 0)) {
                  iVar11 = FUN_005b8931(local_d4, local_e8);
                  bVar6 = _MEM[(iVar11 + 1)];
                  local_14 = u8(bVar6);
                  local_cc = 0;
                  if ((3 < iVar19)) {
                    if ((uVar20 === 9)) {
                      local_cc = 1;
                    }
                  }
                  else {
                    local_cc = 1;
                  }
                  if ((!bVar3)) {
                    FUN_004c50d0(local_168, 0);
                    goto LAB_005436c1;
                  }
                }
                if ((uVar20 === 9)) {
                  local_98 = local_168;
                  (local_168 < ((DAT_00655b16) << 16 >> 16)) (local_168 = 0; local_168 = (local_168 < ((DAT_00655b16) << 16 >> 16)); local_168 = (local_168 + 1)) {
                    if ((iVar11 === iVar10)) {
                      FUN_00531607(local_98, 0x50, ((s16((DAT_006560f0 + local_168 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_168 * 0x20), 0)) << 16 >> 16));
                      local_a4 = 1;
                      break;
                    }
                  }
                  local_168 = local_98;
                  if ((local_a4 !== 0)) {
                  local_70 = FUN_005ae31d(local_d4, local_e8, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16));
                  local_160 = -1;
                  (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                    uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                    local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                    iVar11 = FUN_004087c0(uVar9, local_74);
                    if ((iVar11 < 0)) {
                      iVar11 = FUN_005b8ca6(uVar9, local_74);
                      if ((-1 < iVar11)) {
                        local_160 = -1;
                        break;
                      }
                      iVar11 = FUN_005ae31d(uVar9, local_74, ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16));
                      if (((uVar17 & 0x5c) !== 0)) {
                        local_160 = local_60;
                      }
                    }
                  }
                  if ((-1 < local_160)) {
                    DAT_006560fc[local_168 * 0x20] = 0x70;
                    local_c8 = local_160;
                    uVar15 = local_c8;
                    goto LAB_005435ca;
                  }
                }
                cVar1 = 0;
                if ((iVar11 !== 0)) {
                  local_84 = local_3c;
                  if ((-1 < local_40)) {
                    local_84 = FUN_005ae1b0(local_d4, local_e8, ((s16((DAT_0064f340 + local_40 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_40 * 0x58), 0)) << 16 >> 16));
                  }
                  if ((iVar11 === 0)) {
                    local_8 = 0;
                    local_114 = 0;
                    local_b8 = 0;
                    local_4c = 0;
                    local_28 = 0;
                    (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                      uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                      local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                      iVar11 = FUN_004087c0(uVar9, local_74);
                      if ((iVar11 !== 0)) {
                        bVar6 = FUN_005b94d5(uVar9, local_74);
                        if ((-1 < iVar11)) {
                          local_8 = (local_8 + 1);
                          if ((3 < local_8)) {
                            local_b8 = 1;
                          }
                          if ((0 < DAT_00628360[local_60])) {
                            local_114 = 1;
                          }
                          if ((DAT_00628350[local_60] < 0)) {
                            local_28 = 1;
                          }
                          if ((0 < DAT_00628350[local_60])) {
                            local_4c = 1;
                          }
                        }
                        iVar11 = FUN_00492e60(uVar8, uVar9, local_74, 1);
                        if ((iVar11 !== 0)) {
                      cVar1 = 1;
                    }
                    (local_60 < 3) (local_60 = -2; local_60 = local_60; local_60 = (local_60 + 1)) {
                      uVar9 = FUN_005ae052((local_60 + local_d4));
                      iVar11 = FUN_004087c0(uVar9, (local_e8 + -2));
                      if (((bVar6 & 0x42) === 0x40)) {
                        local_b8 = 2;
                      }
                      iVar11 = FUN_004087c0(uVar9, (local_e8 + 2));
                      if (((bVar6 & 0x42) === 0x40)) {
                        local_114 = 2;
                      }
                    }
                    (local_60 < 3) (local_60 = -2; local_60 = local_60; local_60 = (local_60 + 1)) {
                      local_74 = (local_60 + local_e8);
                      uVar9 = FUN_005ae052((local_d4 + -2));
                      iVar11 = FUN_004087c0(uVar9, local_74);
                      if (((bVar6 & 0x42) === 0x40)) {
                        local_28 = 2;
                      }
                      uVar9 = FUN_005ae052((local_d4 + 2));
                      iVar11 = FUN_004087c0(uVar9, local_74);
                      if (((bVar6 & 0x42) === 0x40)) {
                        local_4c = 2;
                      }
                    }
                    if ((local_4c === 0)) {
                      cVar1 = 2;
                    }
                    if ((local_114 === 0)) {
                      cVar1 = 2;
                    }
                    if ((cVar1 !== 0)) {
                      if (bVar23) {
                        FUN_004933f2(uVar8, local_d4, local_e8, 1, 2);
                      }
                      else {
                        FUN_004933f2(uVar8, local_d4, local_e8, 0x15, ((local_84 < 4) + cVar1));
                      }
                    }
                  }
                }
 LAB_0053fc8d: :
                if ((-1 < iVar11)) {
                  local_b4 = 1;
                }
                if ((iVar11 < 0)) {
                  iVar11 = FUN_005b50ad(local_168, 2);
                  local_c4 = u8((1 < iVar11));
                  if ((local_c4 === 0)) {
                    (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                      uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
                      local_74 = (s8(DAT_00628360[local_60]) + local_e8);
                      iVar11 = FUN_004087c0(uVar9, local_74);
                      if ((-1 < iVar11)) {
                        local_c4 = 1;
                        break;
                      }
                    }
                  }
                  if ((local_c4 === 0)) {
                    FUN_0049301b(uVar8, local_d4, local_e8, 1, 2);
                  }
                  FUN_00492c15(uVar8, 0x15, local_d4, local_e8, 0);
                  uVar15 = FUN_005b94d5(local_d4, local_e8);
                  if (((uVar15 & 0x80) !== 0)) {
                    DAT_006560ff[local_168 * 0x20] = 9;
                    DAT_006560fc[local_168 * 0x20] = 0x70;
                    goto LAB_005436c1;
                  }
                  if (((uVar15 & 0x80) === 0)) {
                    if ((1 < iVar11)) {
                      DAT_006560ff[local_168 * 0x20] = 4;
                      DAT_006560fc[local_168 * 0x20] = 0x58;
                      goto LAB_005436c1;
                    }
                    local_170 = 0;
                    if (((s16((DAT_006560f4 + local_168 * 0x20), 0) & 0x80) !== 0)) {
                      local_170 = 1;
                    }
                    else {
                      iVar11 = FUN_00492e60(uVar8, local_d4, local_e8, 0x15);
                      if ((iVar11 !== 0)) {
                        local_170 = 1;
                      }
                    }
                    if ((DAT_006560ff[local_168 * 0x20] !== 0xb)) {
                      if ((uVar21 === 4)) {
                        local_170 = (local_170 | 2);
                      }
                      if ((local_170 !== 0)) {
                        if (((local_170 & 2) !== 0)) {
                          iVar11 = FUN_005b68f6(uVar8, local_d4, local_e8);
                          if ((iVar11 === 1)) {
                            DAT_006560ff[local_168 * 0x20] = 6;
                            DAT_006560fc[local_168 * 0x20] = 0x49;
                            goto LAB_005436c1;
                          }
                          if ((iVar11 === 2)) {
                            DAT_006560ff[local_168 * 0x20] = 7;
                            DAT_006560fc[local_168 * 0x20] = 0x4d;
                            goto LAB_005436c1;
                          }
                        }
                        iVar11 = FUN_005b8931(local_d4, local_e8);
                        bVar6 = _MEM[(iVar11 + 1)];
                        local_14 = u8(bVar6);
                        if (((bVar6 & 0x20) !== 0)) {
                          if ((iVar11 !== 0)) {
                            local_170 = (local_170 & 1);
                            if ((local_80 < 3)) {
                              local_170 = (local_170 | 2);
                            }
                            if ((local_170 !== 0)) {
                              DAT_006560ff[local_168 * 0x20] = 5;
                              DAT_006560fc[local_168 * 0x20] = 0x72;
                              goto LAB_005436c1;
                            }
                          }
                        }
                        else {
                          iVar11 = FUN_004bd9f0(uVar8, 0x43);
                          if ((iVar11 !== 0)) {
                            local_170 = (local_170 & 1);
                            iVar11 = FUN_005b8ee1(local_d4, local_e8);
                            if ((iVar11 !== 0)) {
                              local_170 = (local_170 | 2);
                            }
                            if (((local_14 & 8) !== 0)) {
                              local_170 = (local_170 | 2);
                            }
                            if ((1 < DAT_00627ccb[local_80 * 0x18])) {
                              local_170 = (local_170 | 2);
                            }
                            if ((local_170 !== 0)) {
                              DAT_006560ff[local_168 * 0x20] = 5;
                              DAT_006560fc[local_168 * 0x20] = 0x52;
                              goto LAB_005436c1;
                            }
                          }
                        }
                      }
                      if ((1 < iVar11)) {
                        DAT_006560ff[local_168 * 0x20] = 4;
                        DAT_006560fc[local_168 * 0x20] = 0x58;
                        goto LAB_005436c1;
                      }
                      uVar15 = local_40;
                      if ((((iVar11 + u8(DAT_0064c932[(uVar8 * 0x594 + iVar10)]) * -16) !== 0) && (u8(DAT_0064c932[(uVar8 * 0x594 + iVar10)]) * 0x10 <= iVar11))) {
                        (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                          local_7c = ((((DAT_00655af8) << 16 >> 16) + local_60) & 7);
                          uVar9 = FUN_005ae052((s8(DAT_00628350[local_7c]) + local_d4));
                          local_74 = (s8(DAT_00628360[local_7c]) + local_e8);
                          iVar11 = FUN_004087c0(uVar9, local_74);
                          if ((iVar11 !== 0)) {
                            bVar6 = FUN_005b89bb(uVar9, local_74);
                            local_cc = u8(bVar6);
                            if ((iVar11 < 3)) {
                              DAT_006560fc[local_168 * 0x20] = 0x73;
                              local_c8 = local_7c;
                              uVar15 = local_c8;
                              goto LAB_005435ca;
                            }
                          }
                        }
                      }
                      uVar15 = FUN_005b94d5(local_d4, local_e8);
                      if ((local_80 < 3)) {
                        DAT_006560fc[local_168 * 0x20] = 0x72;
                        DAT_006560ff[local_168 * 0x20] = 5;
                        goto LAB_005436c1;
                      }
                    }
                  }
                }
                if ((iVar11 === 0)) {
                  if ((DAT_00656100[local_168 * 0x20] === 0xff)) {
                    local_134 = local_40;
                  }
                  else {
                    local_134 = u8(DAT_00656100[local_168 * 0x20]);
                  }
                  if ((iVar11 !== iVar10)) {
                    local_134 = local_40;
                  }
                  if ((4 < iVar11)) {
                    FUN_00531607(local_168, 0x63, ((s16((DAT_0064f340 + local_134 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_134 * 0x58), 0)) << 16 >> 16));
                    goto LAB_005436c1;
                  }
                  uVar15 = FUN_005b94d5(local_d4, local_e8);
                  if ((iVar11 !== 0)) {
                    DAT_006560fc[local_168 * 0x20] = 0x72;
                    DAT_006560ff[local_168 * 0x20] = 5;
                    goto LAB_005436c1;
                  }
                  if ((local_158 !== 0)) {
                    FUN_00531607(local_168, 0x63, ((s16((DAT_0064f340 + local_40 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_40 * 0x58), 0)) << 16 >> 16));
                    goto LAB_005436c1;
                  }
                  if ((local_3c < 3)) {
                    iVar11 = FUN_005b8931(local_d4, local_e8);
                    bVar6 = _MEM[(iVar11 + 1)];
                    local_14 = u8(bVar6);
                    if (((bVar6 & 0xe) === 0)) {
                      if ((DAT_00627cd5[local_80 * 0x18] < DAT_00627cd4[local_80 * 0x18])) {
                        DAT_006560ff[local_168 * 0x20] = 7;
                        goto LAB_005436c1;
                      }
                      if ((DAT_00627cd4[local_80 * 0x18] !== 0)) {
                        DAT_006560ff[local_168 * 0x20] = 6;
                        goto LAB_005436c1;
                      }
                    }
                    if (((bVar6 & 0x80) !== 0)) {
                      DAT_006560ff[local_168 * 0x20] = 9;
                      goto LAB_005436c1;
                    }
                    uVar15 = FUN_005b94d5(local_d4, local_e8);
                    if ((iVar11 !== 0)) {
                      DAT_006560fc[local_168 * 0x20] = 0x72;
                      DAT_006560ff[local_168 * 0x20] = 5;
                      goto LAB_005436c1;
                    }
                    uVar15 = local_40;
                    (local_60 < 0x14) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
                      uVar9 = FUN_005ae052((s8(DAT_00628370[local_60]) + ((s16((DAT_0064f340 + uVar15 * 0x58), 0)) << 16 >> 16)));
                      local_74 = (((s16((DAT_0064f342 + uVar15 * 0x58), 0)) << 16 >> 16) + s8(DAT_006283a0[local_60]));
                      iVar11 = FUN_004087c0(uVar9, local_74);
                      if ((iVar11 !== 0)) {
                        bVar6 = FUN_005b89bb(uVar9, local_74);
                        uVar17 = u8(bVar6);
                        iVar11 = FUN_005b8931(uVar9, local_74);
                        local_14 = u8(_MEM[(iVar11 + 1)]);
                        if (((_MEM[(iVar11 + 1)] & 0xe) === 0)) {
                          if ((DAT_00627cd5[uVar17 * 0x18] < DAT_00627cd4[uVar17 * 0x18])) {
                            FUN_00531607(local_168, 0x6d, uVar9, local_74);
                            goto LAB_005436c1;
                          }
                          if ((DAT_00627cd4[uVar17 * 0x18] !== 0)) {
                            FUN_00531607(local_168, 0x69, uVar9, local_74);
                            goto LAB_005436c1;
                          }
                        }
                        pbVar16 = FUN_005b8931(uVar9, local_74);
                        if ((iVar11 !== 0)) {
                          FUN_00531607(local_168, 0x72, uVar9, local_74);
                          goto LAB_005436c1;
                        }
                      }
                    }
                  }
                  else {
                    uVar15 = FUN_005b94d5(local_d4, local_e8);
                    if ((iVar11 !== 0)) {
                      DAT_006560fc[local_168 * 0x20] = 0x72;
                      DAT_006560ff[local_168 * 0x20] = 5;
                      goto LAB_005436c1;
                    }
                  }
                }
                if (bVar3) {
                  if ((iVar11 !== 0)) {
                    local_a4 = 1;
                    local_c4 = 0;
                  }
                  goto LAB_00540fea;
                }
                local_78 = FUN_005b8da4(((s16((DAT_00656102 + local_168 * 0x20), 0)) << 16 >> 16), ((s16((DAT_00656104 + local_168 * 0x20), 0)) << 16 >> 16));
                if ((local_78 === uVar8)) {
            local_cc = s8(DAT_0064b1c5[u8(DAT_006560f6[local_168 * 0x20]) * 0x14]);
            iVar11 = FUN_0043d20a(local_40, 8);
            if ((iVar11 === 0)) {
              if (((s16((DAT_006560f4 + local_168 * 0x20), 0) & 0x100) !== 0)) {
                local_cc = (local_cc * 3 / 2 | 0);
              }
            }
            else {
              local_cc = (local_cc << 1);
            }
            if ((s8(DAT_0064b1c4[u8(DAT_006560f6[local_168 * 0x20]) * 0x14]) < local_cc)) {
              DAT_006560fc[local_168 * 0x20] = 0x46;
              DAT_00656100[local_168 * 0x20] = ((local_40) & 0xFF);
              bVar4 = 0;
              local_c8 = 8;
              uVar15 = local_c8;
              goto LAB_005435ca;
            }
            local_90 = 1;
          }
        }
        else {
          if ((local_e4 !== 1)) {
            if ((local_e4 === 0)) {
              if ((local_158 !== 0)) {
                local_90 = 1;
              }
              iVar11 = FUN_005b50ad(local_168, 2);
              if ((DAT_00655b82[s8(DAT_0064b1c0[u8(DAT_006560f6[local_168 * 0x20]) * 0x14])] !== 0)) {
                local_90 = 1;
              }
              if ((local_90 !== 0)) {
          local_a4 = 1;
        }
        iVar11 = FUN_005b4c63(local_d4, local_e8, uVar8);
        if ((iVar11 === 0)) {
          if ((local_a4 === 0)) {
            local_68 = 1;
          }
          else {
            local_68 = 0;
          }
        }
        else {
          DAT_006560fb[local_168 * 0x20] = 0xff;
        }
        if (((DAT_0064bc60 & 8) !== 0)) {
          local_68 = 0;
        }
        if ((local_e4 === 1)) {
          if (((DAT_0064c9f2[(uVar8 * 0x594 + iVar10)] & 0x10) === 0)) {
            local_e4 = 0;
          }
          if ((uVar21 === 0)) {
            local_e4 = 0;
          }
        }
        (local_60 < 8) (local_60 = 0; local_60 = local_60; local_60 = (local_60 + 1)) {
          uVar9 = FUN_005ae052((s8(DAT_00628350[local_60]) + local_d4));
          local_74 = (s8(DAT_00628360[local_60]) + local_e8);
          iVar11 = FUN_004087c0(uVar9, local_74);
          if ((iVar11 !== 0)) {
            local_78 = FUN_005b8a1d(uVar9, local_74);
            bVar7 = FUN_005b89bb(uVar9, local_74);
            uVar15 = u8(bVar7);
            local_6c = u8((uVar15 === 0xa));
            if ((local_144 !== 0)) {
              local_54 = FUN_005b2e69(uVar9, local_74);
              while ((4 < DAT_0064b1ca[u8(DAT_006560f6[local_54 * 0x20]) * 0x14])) {
                local_54 = FUN_005b2c82(local_54);
              }
              if (((bVar7 & 0x42) === 0x40)) {
                local_18 = 0;
                if (bVar23) {
                  if ((iVar11 !== 0)) {
                  if ((local_e4 === 0)) {
                    local_18 = FUN_0059a791(0, 2);
                    local_18 = (local_18 + s8(DAT_00627cc8[uVar15 * 0x18]) * -2);
                  }
                  else {
                    local_18 = FUN_0059a791(0, 2);
                    local_18 = (local_18 - s8(DAT_00627cc9[uVar15 * 0x18]));
                  }
                }
                else {
                  local_18 = FUN_0059a791(0, 4);
                  if ((local_78 !== uVar8)) {
                    if ((local_e4 < 6)) {
                      local_18 = (local_18 + s8(DAT_00627cc9[uVar15 * 0x18]) * 4);
                    }
                    else {
                      local_18 = (local_18 + (6 - (s8(DAT_00627cc8[uVar15 * 0x18]) + -1) * u8(DAT_0064bcc8)));
                      if ((local_40 !== local_88)) {
                        local_70 = FUN_005ae1b0(uVar9, local_74, ((s16((DAT_0064f340 + local_88 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_88 * 0x58), 0)) << 16 >> 16));
                        if ((local_70 === 1)) {
                          if ((u8(DAT_0064bcc8) < s8(DAT_00627cc8[uVar15 * 0x18]))) {
                            local_18 = (local_18 + -4);
                          }
                          else {
                            local_18 = (local_18 + 8);
                          }
                        }
                        else if (((uVar17 & 0x10) !== 0)) {
                          local_18 = (local_18 + 4);
                        }
                      }
                    }
                  }
                  else {
                    bVar7 = FUN_005b94d5(uVar9, local_74);
                    if ((iVar11 !== 0)) {
                      /* switch */ () {
                      case 0 :
                        local_cc = FUN_005b53b6(local_54, 0);
                        if ((iVar11 !== 0)) {
                          local_18 = (local_18 + 8);
                        }
                        else {
                          local_18 = (local_18 + local_cc * -8);
                        }
                        break;
                      case 1 :
                        local_cc = FUN_005b53b6(local_54, 1);
                        if ((local_cc < 1)) {
                          local_18 = (local_18 + 8);
                        }
                        else {
                          local_18 = (local_18 + local_cc * -4);
                        }
                        break;
                      case 2 :
                        iVar11 = FUN_005b53b6(local_54, 4);
                        if ((iVar11 !== 0)) {
                          local_18 = (local_18 + 8);
                        }
                        iVar11 = FUN_005b53b6(local_54, 2);
                        local_18 = (local_18 + iVar11 * -4);
                        break;
                      case 4 :
                        iVar11 = FUN_005b53b6(local_54, 2);
                        if ((iVar11 !== 0)) {
                          local_18 = (local_18 + 8);
                        }
                        iVar11 = FUN_005b53b6(local_54, 4);
                        local_18 = (local_18 + iVar11 * -8);
                        break;
                      case 5 :
                      case 0x15 :
                        local_18 = (local_18 + -4);
                        break;
                      case 6 :
                        iVar11 = FUN_005b53b6(local_54, 0);
                        iVar12 = FUN_005b53b6(local_54, 1);
                        if (((iVar11 + iVar12) !== 0)) {
                          local_18 = (local_18 + 8);
                        }
                      }
                    }
                    else {
                      /* switch */ () {
                      case 0 :
                        iVar11 = FUN_005b50ad(local_54, 0);
                        iVar12 = FUN_005b50ad(local_54, 2);
                        local_18 = (local_18 + (iVar11 * 4 / (iVar12 + 1) | 0));
                        break;
                      case 1 :
                        iVar11 = FUN_005b50ad(local_54, 3);
                        iVar12 = FUN_005b50ad(local_54, 0);
                        local_18 = (local_18 + (iVar11 * 2 / (iVar12 + 1) | 0));
                        break;
                      case 5 :
                        cVar1 = DAT_00627cc9[uVar15 * 0x18];
                        iVar11 = FUN_005b50ad(local_54, 0);
                        local_18 = (local_18 + (s8(cVar1) + iVar11) * 2);
                        break;
                      case 6 :
                        iVar11 = FUN_005b53b6(local_54, 0);
                        iVar12 = FUN_005b53b6(local_54, 1);
                        if (((iVar11 + iVar12) !== 0)) {
                          local_18 = (local_18 + 8);
                        }
                      }
                    }
                  }
                }
                if ((local_144 === 1)) {
                  local_18 = FUN_0059a791(0, 2);
                }
                if ((0xff < DAT_006560fb[local_168 * 0x20])) {
                  if (((s8(DAT_006560fb[local_168 * 0x20]) === local_60) || ((s8(DAT_006560fb[local_168 * 0x20]) - local_60) < 0))) {
                    local_cc = ((~(s8(DAT_006560fb[local_168 * 0x20]) - local_60)) + 1);
                  }
                  else {
                    local_cc = (s8(DAT_006560fb[local_168 * 0x20]) - local_60);
                  }
                  if ((4 < local_cc)) {
                    local_cc = (8 - local_cc);
                  }
                  local_18 = (local_18 + local_cc * local_cc * -2);
                }
                local_118 = 0;
                local_c4 = 0;
                if ((DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] < 5)) {
                  if ((iVar11 < 0x32)) {
                    local_70 = FUN_005ae31d(((s16((DAT_0064f340 + uVar17 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + uVar17 * 0x58), 0)) << 16 >> 16), uVar9, local_74);
                    if ((iVar19 < 3)) {
                      local_18 = (local_18 + 5);
                      local_c4 = 1;
                    }
                    if ((local_70 < iVar19)) {
                      local_18 = (local_18 + -5);
                    }
                  }
                  local_5c = FUN_005b8af0(uVar9, local_74);
                  if (((DAT_0064c6c0[(local_5c * 4 + uVar8 * 0x594)] & 8) === 0)) {
                    if ((local_c4 === 0)) {
                      local_18 = (local_18 + -5);
                      local_14 = FUN_005b94d5(uVar9, local_74);
                      if (((local_14 & 0x1c) !== 0)) {
                        local_18 = (local_18 + -3);
                      }
                    }
                  }
                }
                if (((DAT_0064c6c0[(local_78 * 4 + uVar8 * 0x594)] & 8) !== 0)) {
                  local_18 = (local_18 + -6);
                }
                if ((local_54 < 0)) {
                  iVar11 = FUN_005b8ca6(uVar9, local_74);
                  if ((local_78 !== uVar8)) {
                    if (((DAT_0064c6c0[(local_78 * 4 + uVar8 * 0x594)] & 8) !== 0)) {
                    local_18 = (local_18 + 0x14);
                  }
                }
                else {
                  if ((local_78 !== uVar8)) {
                    local_118 = 1;
                    local_ac = 0;
                    if (((DAT_0064b1bc[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] & 4) === 0)) {
                      if ((((1 << (((local_78) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
 LAB_005429fe: :
                        local_54 = FUN_0057e6e2(local_54, local_168);
                        if ((iVar11 !== 0)) {
                          local_10 = FUN_00580341(local_168, local_60, 0);
                          iVar11 = FUN_005b50ad(local_54, 0);
                          local_10 = ((iVar11 + 1) * local_10 / s8(DAT_0064b1c8[u8(DAT_006560f6[local_168 * 0x20]) * 0x14]) | 0);
                          iVar11 = FUN_005b8ca6(uVar9, local_74);
                          if ((-1 < iVar11)) {
                            local_10 = local_10 * 3;
                          }
                          if ((DAT_0064b1ca[u8(DAT_006560f6[local_54 * 0x20]) * 0x14] === 4)) {
                            local_10 = (local_10 << 1);
                          }
                          if ((local_48 === 0)) {
                            if ((local_e4 === 0)) {
                              if ((uVar21 === 0)) {
                                local_10 = (local_10 << 1);
                              }
                              cVar1 = DAT_0064b1c4[u8(DAT_006560f6[local_168 * 0x20]) * 0x14];
                              iVar11 = FUN_005b50ad(local_168, 3);
                              if ((s8(cVar1) * 2 < iVar11)) {
                                local_10 = (local_10 << 1);
                                local_ac = 1;
                              }
                              iVar11 = FUN_005b53b6(local_54, 0);
                              if ((iVar11 !== 0)) {
                                local_10 = (local_10 << 1);
                                local_ac = 1;
                              }
                              iVar11 = FUN_00492e60(uVar8, local_d4, local_e8, 0);
                              if ((iVar11 !== 0)) {
                                local_10 = (local_10 << 1);
                              }
                            }
                            if (((DAT_00655ae8 & 0x10) !== 0)) {
                              iVar11 = FUN_005b29aa(local_54);
                              iVar12 = FUN_005b29d7(local_54);
                              if ((iVar12 <= (iVar11 / 3 | 0))) {
                                local_ac = 1;
                                local_10 = (local_10 << 1);
                              }
                            }
                            if (((DAT_0064b1bc[u8(DAT_006560f6[local_54 * 0x20]) * 0x14] & 8) !== 0)) {
                              local_10 = local_10 * 3;
                            }
                          }
                          else {
                            local_10 = (local_10 / 2 | 0);
                            if ((DAT_0064b1c4[u8(DAT_006560f6[local_54 * 0x20]) * 0x14] <= DAT_0064b1c5[u8(DAT_006560f6[local_168 * 0x20]) * 0x14])) {
                              local_10 = 0;
                            }
                          }
                          if ((4 < DAT_0064b1ca[u8(DAT_006560f6[local_54 * 0x20]) * 0x14])) {
                            local_ac = 2;
                          }
                          local_cc = s8(DAT_0064b1ca[u8(DAT_006560f6[local_54 * 0x20]) * 0x14]);
                          if ((local_cc === 7)) {
                            if (((DAT_00655b0b & 1) === 0)) {
                              local_10 = (local_10 / 2 | 0);
                            }
                          }
                          else if ((4 < local_cc)) {
                            local_10 = (local_10 + 0xc);
                          }
                          else if ((local_cc === 6)) {
                            local_10 = (local_10 << 1);
                          }
                          if (((((-u8((local_78 === 0))) & 6) + 6) <= local_10)) {
                            local_18 = (local_18 + local_10 * 4);
                            goto LAB_0054314b;
                          }
                          local_18 = -0x3e7;
                          if ((iVar11 === 0)) {
                            FUN_004c9528(local_54, uVar8);
                          }
                        }
                        goto LAB_0054168e;
                      }
                      if ((local_e4 !== 6)) {
                        bVar7 = DAT_0064c6be[local_78 * 0x594];
                        iVar11 = FUN_00467904(uVar8, local_78);
                        iVar12 = FUN_0059a791(0, 0x13);
                        if ((0x32 < (((u8(bVar7) * 5 + iVar11) + iVar12) + -10))) {
                      if ((local_e4 === 6)) {
                        if (((DAT_0064c6c0[(local_78 * 4 + uVar8 * 0x594)] & 6) === 0)) {
 LAB_0054272e: :
                          if ((2 < DAT_00655b08)) {
 LAB_00542801: :
                            if ((local_144 === 0)) {
                              local_cc = 0;
                              if ((((1 << (((local_78) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                                (local_14c < 8) (local_14c = 1; local_14c = (local_14c < 8); local_14c = (local_14c + 1)) {
                                  if ((iVar11 === 0)) {
                                    local_cc = 1;
                                  }
                                }
                              }
                              if ((local_cc === 0)) {
                                local_cc = 1;
                                (local_14c < 8) (local_14c = 1; local_14c = (local_14c < 8); local_14c = (local_14c + 1)) {
                                  if ((DAT_0064c932[(local_14c * 0x594 + iVar10)] !== 0)) {
                                    local_cc = 0;
                                    break;
                                  }
                                }
                                if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_88 * 0x58] & 0x1f))) !== 0)) {
                                  FUN_004c9528(local_54, uVar8);
                                }
                              }
                            }
                          }
                          else if ((DAT_006560ff[local_54 * 0x20] === 2)) {
                            local_cc = 0;
                            (local_14c < 8) (local_14c = 1; local_14c = (local_14c < 8); local_14c = (local_14c + 1)) {
                              if ((iVar11 !== 0)) {
                                local_cc = 1;
                              }
                            }
                            if ((local_cc !== 0)) {
                      local_18 = 0x3c;
                      if ((local_38 < 0x3c)) {
                        local_fc = 0x3c;
                        local_38 = 0x3c;
                        local_c8 = local_60;
                        local_50 = 1;
                        local_64 = 2;
                      }
                    }
                    goto LAB_0054168e;
                  }
                  local_18 = (local_18 - s8(DAT_0064b1c5[u8(DAT_006560f6[local_168 * 0x20]) * 0x14]));
                }
 LAB_0054314b: :
                if ((local_78 === uVar8)) {
                  iVar11 = FUN_005b8a81(uVar9, local_74);
                  iVar12 = FUN_0044272d(local_40, 0, 0);
                  if ((iVar11 === iVar12)) {
                    local_18 = (local_18 + 0xa);
                  }
                }
                if ((-1 < local_54)) {
                  if ((local_68 !== 0)) {
                    iVar11 = FUN_005ae052((s8(DAT_00628350[local_60]) * 4 + local_d4));
                    iVar12 = (s8(DAT_00628360[local_60]) * 4 + local_e8);
                    iVar13 = FUN_004087c0(iVar11, iVar12);
                    if ((iVar13 === 0)) {
                      iVar13 = FUN_005b89e4(iVar11, iVar12);
                      if ((iVar13 === 0)) {
                        local_18 = (local_18 + 8);
                      }
                      else {
                        local_18 = (local_18 + 2);
                      }
                    }
                    (local_7c < 8) (local_7c = 0; local_7c = local_7c; local_7c = (local_7c + 1)) {
                      local_d0 = FUN_005ae052((s8(DAT_00628350[local_7c]) + iVar11));
                      iVar13 = (s8(DAT_00628360[local_7c]) + iVar12);
                      iVar18 = FUN_004087c0(local_d0, iVar13);
                      if ((iVar18 !== 0)) {
                        iVar18 = FUN_005b8b65(local_d0, iVar13, uVar8);
                        if ((local_144 === 2)) {
                          local_18 = (local_18 + 2);
                        }
                        iVar18 = FUN_005b8d62(local_d0, iVar13);
                        if ((-1 < iVar18)) {
                          local_18 = (local_18 + -2);
                        }
                        if (bVar23) {
                          bVar7 = FUN_005b89bb(local_d0, iVar13);
                          local_18 = (local_18 + s8(DAT_00627cca[u8(bVar7) * 0x18]));
                          if ((DAT_00654fac !== 0)) {
                            bVar7 = FUN_005b89bb(local_d0, iVar13);
                            local_18 = (local_18 + s8(DAT_00627cca[u8(bVar7) * 0x18]));
                          }
                        }
                      }
                    }
                  }
                  if (((((DAT_006d1162) << 16 >> 16) - 1) === local_74)) {
                    local_18 = (local_18 / 3 | 0);
                  }
                  iVar11 = local_18;
                  if ((iVar12 < 0)) {
                    iVar12 = FUN_005b50ad(local_168, 0);
                    uVar9 = FUN_005b50ad(local_168, 3, 1, 0x63);
                    iVar13 = FUN_005adfa0(uVar9);
                    local_18 = (iVar12 / iVar13 | 0) * local_18;
                  }
                  if ((local_38 < local_18)) {
                    local_38 = local_18;
                    local_c8 = local_60;
                    local_50 = local_118;
                    local_64 = local_ac;
                  }
                  if ((local_fc < iVar11)) {
                    local_fc = iVar11;
                  }
                }
              }
            }
          }
 LAB_0054168e: :
        }
        if ((iVar19 < iVar10)) {
          local_c8 = 8;
        }
        if ((local_fc !== local_38)) {
          local_c8 = 8;
        }
        if ((local_c8 === 8)) {
          local_50 = 0;
        }
        if ((local_50 === 0)) {
          local_c8 = 8;
        }
        DAT_006560fc[local_168 * 0x20] = 0x39;
        uVar15 = local_c8;
      }
      else {
        local_c8 = 8;
        uVar15 = local_c8;
      }
    }
  }
  else {
    w16((DAT_006560f4 + local_168 * 0x20), 0, (s16((DAT_006560f4 + local_168 * 0x20), 0) | 8));
    DAT_006560fc[local_168 * 0x20] = 0x64;
    local_c8 = 8;
    uVar15 = local_c8;
  }
 LAB_005435ca: :
  local_c8 = uVar15;
  if ((local_c8 === 8)) {
    DAT_006560fb[local_168 * 0x20] = 0xff;
    DAT_006560ff[local_168 * 0x20] = 0xff;
  }
  else {
    local_d4 = FUN_005ae052((s8(DAT_00628350[local_c8]) + local_d4));
    local_e8 = (local_e8 + s8(DAT_00628360[local_c8]));
    iVar19 = FUN_004087c0(local_d4, local_e8);
    if ((iVar19 === 0)) {
      DAT_006560ff[local_168 * 0x20] = 0xff;
      FUN_005b6787(local_168);
    }
    else {
      DAT_006560ff[local_168 * 0x20] = 0x1b;
      w16((DAT_00656102 + local_168 * 0x20), 0, ((local_d4) & 0xFFFF));
      w16((DAT_00656104 + local_168 * 0x20), 0, ((local_e8) & 0xFFFF));
    }
  }
 LAB_005436c1: :
  if ((DAT_006560ff[local_168 * 0x20] === 2)) {
    if ((DAT_006560ff[local_168 * 0x20] === 0x10)) {
      DAT_006560fc[local_168 * 0x20] = 0x30;
    }
    if ((DAT_0064b1c1[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] === 1)) {
      DAT_006560ff[local_168 * 0x20] = 0xff;
      DAT_006560f8[local_168 * 0x20] = (DAT_006560f8[local_168 * 0x20] + DAT_0064bcc8);
      return 1;
    }
    FUN_005b6787(local_168);
    if ((DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] !== 5)) {
      DAT_006560ff[local_168 * 0x20] = 1;
      if (((s16((DAT_006560f4 + local_168 * 0x20), 0) & 0x100) !== 0)) {
        DAT_006560ff[local_168 * 0x20] = 2;
      }
      if (bVar4) {
        DAT_006560ff[local_168 * 0x20] = 0xff;
      }
    }
    else {
      DAT_006560ff[local_168 * 0x20] = 0xff;
    }
  }
  if ((s16((DAT_006560f2 + local_168 * 0x20), 0) === s16((DAT_00656104 + local_168 * 0x20), 0))) {
    w16((DAT_006560f4 + local_168 * 0x20), 0, (s16((DAT_006560f4 + local_168 * 0x20), 0) | 0x80));
    DAT_006560ff[local_168 * 0x20] = 0xff;
    if ((DAT_006560f8[local_168 * 0x20] !== 0)) {
      if ((DAT_0064b1ca[u8(DAT_006560f6[local_168 * 0x20]) * 0x14] === 2)) {
        iVar19 = FUN_005b53b6(local_168, 4);
        if ((iVar19 !== 0)) {
          FUN_005b6787(local_168);
        }
      }
      else {
        FUN_005b6787(local_168);
      }
    }
  }
  return 0;
 LAB_00540f1e: :
  if ((iVar11 < 0)) {
    local_c4 = 0;
    DAT_006560ff[local_168 * 0x20] = 0xff;
  }
 LAB_00540fea: :
  if ((local_c4 !== 0)) {
    local_c4 = 0;
    iVar11 = FUN_005b50ad(local_168, 2);
    if ((local_3c < 4)) {
      local_c4 = (local_c4 | 1);
    }
    if ((6 < (u8(DAT_0064c6be[s8(DAT_0064f348[local_88 * 0x58]) * 0x594]) - s8(DAT_0064c6e8[(uVar8 * 0x594 + s8(DAT_0064f348[local_88 * 0x58]))])))) {
      local_c4 = (local_c4 | 2);
    }
    if ((local_bc !== 0)) {
      iVar11 = FUN_005b53b6(local_168, 1);
      if ((iVar11 === 1)) {
        local_c4 = (local_c4 | 4);
      }
      if (((s16((DAT_006560f4 + local_168 * 0x20), 0) & 0x100) !== 0)) {
        local_c4 = (local_c4 | 8);
      }
    }
    uVar15 = local_c4;
    if ((DAT_0064b1c5[uVar20 * 0x14] < DAT_0064b1c4[uVar20 * 0x14])) {
      uVar15 = (local_c4 & -12);
    }
    local_c4 = uVar15;
    local_78 = FUN_005b8af0(local_d4, local_e8);
    if (((u8(DAT_0064c6be[local_78 * 0x594]) - s8(DAT_0064c6e8[(uVar8 * 0x594 + local_78)])) < 7)) {
      local_c4 = 0;
    }
    if ((local_c4 !== 0)) {
      if (((local_c4 & 0xc) !== 0)) {
        FUN_00492c15(uVar8, 1, local_d4, local_e8, 1);
      }
      DAT_006560fc[local_168 * 0x20] = 0x46;
      if ((DAT_0064b1c4[uVar20 * 0x14] < DAT_0064b1c5[uVar20 * 0x14])) {
        local_c8 = 8;
        uVar15 = local_c8;
        goto LAB_005435ca;
      }
      local_90 = 1;
      goto LAB_005414d7;
    }
  }
  if ((DAT_00656100[local_168 * 0x20] !== 0xff)) {
    if ((DAT_0064f349[local_40 * 0x58] < 0xa)) {
      DAT_0064f349[local_40 * 0x58] = (DAT_0064f349[local_40 * 0x58] + 1);
      FUN_005b6042(local_168, 1);
      FUN_0050c679(local_40);
      FUN_0047ce1e(local_d4, local_e8, 1, 1, 1);
      return 1;
    }
    if ((DAT_0064f349[local_40 * 0x58] < 0xa)) {
      FUN_00531607(local_168, 0x42, ((s16((DAT_0064f340 + local_40 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_40 * 0x58), 0)) << 16 >> 16));
      goto LAB_005436c1;
    }
  }
  goto LAB_005414d7;
}
