// Block 0x00590000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 157

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00590607 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0059061d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0059103e)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0059104b)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00590f5a)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x0059100a)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00591023)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00591027)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0059062c (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let cVar7;
  let bVar8;
  let SVar9;
  let uVar10;
  let iVar11;
  let uVar12;
  let pbVar13;
  let pbVar14;
  let iVar15;
  let uVar16;
  let iVar17;
  let iVar18;
  let uVar19;
  let local_120;
  let local_118;
  let local_114;
  let local_100;
  let local_fc;
  let local_f8;
  let local_f0;
  let local_ec;
  let local_e4;
  let local_d8;
  let local_d0;
  let local_c4;
  let local_bc;
  let local_b4;
  let local_a4;
  let aiStack_a0;
  let aiStack_80;
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

  local_4c = 0;
  bVar6 = 0;
  local_c = 0;
  local_30 = 1;
  bVar4 = 0;
  if ((s16((DAT_006560f2 + param_1 * 0x20), 0) < 0)) {
    return 0;
  }
  DAT_00634ca0 = 1;
  DAT_006ad0cc = param_3;
  FUN_00407ff0();
  while ((cVar1 !== 2)) {
    iVar15 = param_1;
    DAT_00634c9c = 0;
    bVar5 = 0;
    local_a4 = 0;
    local_f0 = 0;
    if (((DAT_006ad0cc & 1) !== 0)) {
      DAT_0062804c = 0;
    }
    local_2c = ((DAT_00655b16) << 16 >> 16);
    DAT_00655aee = (DAT_00655aee | 4);
    local_bc = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    local_d0 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    local_fc = local_d0;
    local_ec = local_bc;
    if ((-1 < param_2)) {
      local_ec = FUN_005ae052((s8(DAT_00628350[param_2]) + local_bc));
      local_fc = (s8(DAT_00628360[param_2]) + local_d0);
    }
    cVar1 = DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14];
    bVar2 = DAT_006560f7[param_1 * 0x20];
    uVar10 = s8(bVar2);
    iVar11 = FUN_0043cf76(local_bc, local_d0);
    if ((iVar11 < 0)) {
      FUN_005b99e8(local_bc, local_d0, uVar10, 1);
    }
    DAT_006ad0d0 = ((DAT_00654fa8 === 0) && (DAT_006d1da0 === uVar10));
    iVar11 = FUN_004087c0(local_ec, local_fc);
    if ((iVar11 === 0)) {
      if ((((DAT_00654fa8 === 0) && (DAT_006d1da0 === uVar10)) !== 0)) {
        FUN_00410030(s_NOTONMAP_00634d2c, DAT_0063fc58, 0);
      }
      param_1 = iVar15;
      if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
        FUN_005b6787(param_1);
      }
      goto LAB_00594a80;
    }
    if ((-1 < param_2)) {
      iVar11 = FUN_00594d42(uVar10, local_bc, local_d0, local_ec, local_fc, local_30);
      if ((iVar11 === 0)) {
        if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
          FUN_005b6787(param_1);
        }
        goto LAB_00594aaa;
      }
      bVar6 = 1;
    }
    cVar7 = FUN_005b89bb(local_bc, local_d0);
    bVar8 = FUN_005b89bb(local_ec, local_fc);
    local_58 = u8(bVar8);
    local_54 = u8((cVar7 === 0xa));
    local_40 = u8((local_58 === 0xa));
    local_44 = FUN_005b8da4(local_ec, local_fc);
    local_28 = FUN_005b2e69(local_ec, local_fc);
    if ((-1 < local_28)) {
      local_44 = s8(DAT_006560f7[local_28 * 0x20]);
    }
    iVar11 = FUN_0043cf76(local_ec, local_fc);
    if ((-1 < iVar11)) {
      local_44 = s8(DAT_0064f348[iVar11 * 0x58]);
    }
    if ((param_2 < 0)) {
      FUN_005b6787(param_1);
      goto LAB_00593d80;
    }
    w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) | 0x40))
    ;
    if ((cVar1 === 0)) {
      if (((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 2) === 0)) {
        if (((DAT_006ad0cc & 1) !== 0)) {
          FUN_0046e020(0x69, 1, 0, 0);
          if (((None & 1) !== 0)) {
            FUN_00410030(DAT_00634d38, DAT_00643af8, 0);
          }
          FUN_0058fda9(local_ec, local_fc, uVar10);
        }
        param_1 = iVar15;
        if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
          FUN_005b6787(param_1);
        }
        goto LAB_00594a80;
      }
      if ((-1 < iVar11)) {
        if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
          }
          FUN_004105f8(local_bc, local_d0, uVar10);
          FUN_0046e287(0xa);
          FUN_005b5bab(param_1, 1);
          FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
          FUN_005b36df(param_1, local_bc, local_d0, 1);
          if ((2 < DAT_00655b02)) {
            FUN_0046b14d(0x75, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
          }
          FUN_0047cea6(local_ec, local_fc);
        }
        iVar17 = FUN_0058fedb(param_1, iVar11);
        param_1 = iVar15;
        if ((iVar17 !== 0)) {
        if ((-1 < iVar11)) {
          if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((2 < DAT_00655b02)) {
              FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
            }
            FUN_004105f8(local_bc, local_d0, uVar10);
            FUN_0046e287(0x14);
            FUN_005b5bab(param_1, 1);
            FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
            FUN_005b36df(param_1, local_bc, local_d0, 1);
            if ((2 < DAT_00655b02)) {
              FUN_0046b14d(0x75, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
            }
            FUN_0047cea6(local_ec, local_fc);
          }
          FUN_004c6bf5(param_1, iVar11);
          param_1 = iVar15;
          goto LAB_00594a80;
        }
        iVar17 = FUN_004c9ebd(param_1, local_28, uVar10);
        param_1 = iVar15;
        if ((iVar17 !== 0));
      }
      if (((DAT_0064c6c0[(local_44 * 4 + uVar10 * 0x594)] & 8) !== 0)) {
        local_14 = FUN_005b29aa(param_1);
        local_14 = (local_14 / 0xa | 0);
        iVar11 = FUN_0043d20a(iVar11, 2);
        if ((iVar11 !== 0)) {
          local_14 = (local_14 << 1);
        }
        local_14 = FUN_005adfa0(local_14, 0, DAT_006560fa[param_1 * 0x20]);
        DAT_006560fa[param_1 * 0x20] = (DAT_006560fa[param_1 * 0x20] - ((local_14) & 0xFF));
        FUN_005b6787(param_1);
        w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xffbf));
        if ((DAT_006d1da0 === uVar10)) {
          FUN_0046e020(0x68, 1, 0, 0);
          uVar16 = FUN_00493c7d(local_44);
          FUN_0040ff60(1, uVar16);
          FUN_004271e8(2, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
          FUN_00410030(s_ALLIEDREPAIR_00634d3c, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
        }
        param_1 = iVar15;
        if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
          FUN_005b6787(param_1);
        }
        goto LAB_00594a80;
      }
    }
    if ((local_40 !== 0)) {
      param_1 = iVar15;
      if ((iVar17 < 1));
    }
    if ((s8(DAT_006560f7[local_28 * 0x20]) !== uVar10)) {
      local_44 = s8(DAT_006560f7[local_28 * 0x20]);
      if (((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 4) === 0)) {
        param_1 = iVar15;
        if ((DAT_006ad0d0 !== 0)) {
          FUN_00410030(s_AMPHIB_00634d4c, DAT_0063fc58, 0);
        }
        goto LAB_00594a80;
      }
      if (((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) !== 0)) {
        param_1 = iVar15;
        if (((DAT_006ad0cc & 1) !== 0)) {
          DAT_006560ff[param_1 * 0x20] = 0xff;
          FUN_005b490e(local_28, uVar10);
          FUN_0047cea6(local_ec, local_fc);
          FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
        }
        goto LAB_00594a80;
      }
      if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 6)) {
        DAT_006560ff[param_1 * 0x20] = 0xff;
        local_f0 = (u8(DAT_00655b0b) & (1 << (bVar2 & 0x1f)));
        param_1 = iVar15;
        goto LAB_00594a80;
      }
      if ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
        if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_0046e020(0x69, 0, 0, 0);
          FUN_00410030(s_NONCOMBAT_00634d54, DAT_0063fc58, 0);
        }
        param_1 = iVar15;
        if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
          FUN_005b6787(param_1);
        }
        goto LAB_00594a80;
      }
      if ((iVar17 === 0)) {
        if ((DAT_006ad0d0 !== 0)) {
          FUN_00410030(s_FIGHTER_00634d60, DAT_0063fc58, 0);
        }
        param_1 = iVar15;
        if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
          FUN_005b6787(param_1);
        }
        goto LAB_00594a80;
      }
      if (((DAT_0064c6c0[(local_44 * 4 + uVar10 * 0x594)] & 6) !== 0)) {
        local_20 = FUN_0043d07a(local_ec, local_fc, -1, -1, -1);
        if ((s8(DAT_0064f348[local_20 * 0x58]) !== uVar10)) {
          if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[local_28 * 0x20]) * 0x14), 0));
            if ((DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] !== 6)) {
              FUN_004271e8(1, s32((DAT_00628420 + 0x234), 0));
            }
            FUN_00410030(s_NOEXPEL_00634dc4, DAT_0063fc58, 0);
          }
        }
        else {
          uVar16 = FUN_00410070(local_44);
          FUN_0040ff60(0, uVar16);
          FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[local_28 * 0x20]) * 0x14), 0));
          uVar16 = FUN_00493c7d(uVar10);
          FUN_0040ff60(2, uVar16);
          if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((DAT_00654fa8 === 0)) {
              local_e4 = FUN_004442e0(s_EXPEL_00634d68, local_28);
            }
          }
          else {
            local_e4 = 0;
          }
          param_1 = iVar15;
          if ((local_e4 === 2)) {
            if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              if ((2 < DAT_00655b02)) {
                FUN_0046b14d(0x71, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
              }
              FUN_004105f8(local_bc, local_d0, uVar10);
              FUN_0046e287(0xa);
              FUN_005b5bab(param_1, 1);
              FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
              FUN_005b36df(param_1, local_bc, local_d0, 1);
              if ((2 < DAT_00655b02)) {
                FUN_0046b14d(0x75, 0xff, local_bc, local_d0, uVar10, 0, 0, 0, 0, 0);
              }
              FUN_0047cea6(local_ec, local_fc);
            }
            local_f8 = -1;
            local_18 = -1;
            if ((DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] !== 6)) {
              local_18 = 0x270f;
            }
            for (/* cond: (local_20 < ((DAT_00655b18) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_00655b18) << 16 >> 16)); local_20 = (local_20 + 1)) {
              if ((s8(DAT_0064f348[local_20 * 0x58]) === local_44)) {
                if ((DAT_0064b1ca[u8(DAT_006560f6[local_28 * 0x20]) * 0x14] === 6)) {
                  local_3c = s8(DAT_0064f349[local_20 * 0x58]);
                  iVar17 = FUN_0043d20a(local_20, 1);
                  if ((iVar17 !== 0)) {
                    local_3c = (local_3c + 0x32);
                  }
                  if ((local_18 < local_3c)) {
                    local_18 = local_3c;
                    local_f8 = local_20;
                  }
                }
                else {
                  local_3c = FUN_005ae31d(local_bc, local_d0, ((s16((DAT_0064f340 + iVar11 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar11 * 0x58), 0)) << 16 >> 16));
                  if ((local_3c < local_18)) {
                    local_f8 = local_20;
                    local_18 = local_3c;
                  }
                }
              }
            }
            if ((-1 < local_f8)) {
              local_20 = local_f8;
              FUN_005b36df(local_28, ((s16((DAT_0064f340 + local_f8 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_f8 * 0x58), 0)) << 16 >> 16), 1);
              DAT_006560f9[local_28 * 0x20] = 0;
              FUN_0040ff60(3, (DAT_0064f360 + local_20 * 0x58));
            }
            FUN_0047cea6(local_ec, local_fc);
            FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
            if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              if ((DAT_00655b02 < 3)) {
                FUN_0046e020(0x5d, 0, 0, 0);
                FUN_004442e0(s_UPMINE_00634d80, local_28);
              }
              else if ((DAT_006d1da0 === local_44)) {
                FUN_0046e020(0x5d, 0, 0, 0);
                FUN_004442e0(s_UPMINE_00634d70, local_28);
                if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                  FUN_00511880(0x60, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar10 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                }
              }
              else {
                FUN_00511880(0x5f, s32((DAT_006ad30c + s32((DAT_006ad558 + local_44 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                if ((DAT_006d1da0 === uVar10)) {
                  FUN_0046e020(0x5d, 0, 0, 0);
                  FUN_004442e0(s_UPYOURS_00634d78, local_28);
                }
              }
            }
            else if (((DAT_0064c6c0[(local_44 * 4 + uVar10 * 0x594)] & 8) !== 0)) {
              if ((DAT_00655b02 < 3)) {
                FUN_0046e020(0x5d, 0, 0, 0);
                FUN_004442e0(s_UPYOURSTOO_00634da0, local_28);
              }
              else if ((DAT_006d1da0 === uVar10)) {
                FUN_0046e020(0x5d, 0, 0, 0);
                FUN_004442e0(s_UPYOURSTOO_00634d88, local_28);
                if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                  FUN_00511880(0x61, s32((DAT_006ad30c + s32((DAT_006ad558 + local_44 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                }
              }
              else {
                FUN_00511880(0x61, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar10 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                if ((DAT_006d1da0 === local_44)) {
                  FUN_0046e020(0x5d, 0, 0, 0);
                  FUN_004442e0(s_UPYOURSTOO_00634d94, local_28);
                }
              }
            }
            else if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              if ((DAT_00655b02 < 3)) {
                if ((DAT_00654fa8 === 0)) {
                  FUN_0046e020(0x5d, 0, 0, 0);
                  FUN_004442e0(s_UPYOURS_00634dbc, local_28);
                }
              }
              else if ((DAT_006d1da0 === uVar10)) {
                if ((DAT_00654fa8 === 0)) {
                  FUN_0046e020(0x5d, 0, 0, 0);
                  FUN_004442e0(s_UPYOURS_00634dac, local_28);
                  if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                    FUN_00511880(0x60, s32((DAT_006ad30c + s32((DAT_006ad558 + local_44 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                  }
                }
              }
              else if ((DAT_00654fa8 === 0)) {
                FUN_00511880(0x60, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar10 * 4), 0) * 0x54), 0), 4, 0, local_28, 0);
                if ((DAT_006d1da0 === local_44)) {
                  FUN_0046e020(0x5d, 0, 0, 0);
                  FUN_004442e0(s_UPYOURS_00634db4, local_28);
                }
              }
              iVar11 = FUN_00598d45(local_44);
              if ((iVar11 === 0)) {
                uVar12 = _rand();
                uVar19 = (uVar12 >> 0x1f);
                FUN_00456f20(local_44, uVar10, (((((uVar12 ^ uVar19) - uVar19) & 3) ^ uVar19) - uVar19));
              }
              else if (((DAT_0064c6c0[(uVar10 * 4 + local_44 * 0x594)] & 0x20) === 0)) {
                w32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0, (s32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0) | 0x20));
              }
              else {
                w32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0, (s32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0) & -39));
                w32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0, (s32((DAT_0064c6c0 + (local_44 * 0x594 + uVar10 * 4)), 0) | 0x40));
              }
            }
            goto LAB_00594a80;
          }
        }
      }
      iVar11 = FUN_005b2c3d(param_1);
      if ((iVar11 < u8(DAT_0064bcc8))) {
        if (((DAT_006ad0cc & 1) === 0)) {
          if ((iVar11 < (u8(DAT_0064bcc8) - 1))) {
          uVar16 = FUN_005b2c3d(param_1);
          FUN_00421da0(0, uVar16);
          FUN_004c4210(1, DAT_0064bcc8);
          iVar11 = FUN_004442e0(s_FATIGUE_00634dcc, param_1);
          param_1 = iVar15;
          if ((iVar11 !== 0));
      w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xfeff));
      if (((DAT_006ad0cc & 2) === 0)) {
        iVar11 = FUN_00580341(param_1, param_2, 1);
        if ((iVar11 === 0)) {
          local_f0 = 1;
          param_1 = iVar15;
        }
        else {
          local_f0 = 0;
          param_1 = iVar15;
        }
      }
      else {
        iVar11 = FUN_00580341(param_1, param_2, 1);
        param_1 = iVar15;
        if ((iVar11 !== 0)) {
          local_4c = 1;
          iVar15 = ((((param_1) & 0xFFFF)) << 16 >> 16);
          local_fc = local_d0;
          local_ec = local_bc;
          goto LAB_00593d80;
        }
      }
      goto LAB_00594a80;
    }
    if ((cVar1 !== 2));
    if ((-1 < iVar11)) {
      DAT_006560ff[param_1 * 0x20] = 0xff;
    }
    local_2c = 0;
    local_100 = -1;
    local_50 = 0;
    for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1))
    {
      if ((((s16((DAT_00656102 + param_1 * 0x20), 0)) << 16 >> 16) === iVar15)) {
        local_50 = 1;
        iVar11 = FUN_005b2c3d(param_1);
        if ((u8(DAT_0064bcc8) <= iVar11)) {
          local_100 = param_1;
          break;
        }
      }
    }
    if ((local_100 < 0)) {
      param_1 = iVar15;
      if (((DAT_006ad0cc & 1) !== 0)) {
        FUN_004442e0(s_NOLANDFALL_00634dd4, iVar15);
      }
      goto LAB_00594a80;
    }
    if ((local_e4 === 0));
    DAT_006560ff[local_100 * 0x20] = 0xff;
  }
  if ((s8(DAT_0064f348[iVar11 * 0x58]) !== uVar10)) {
    local_44 = s8(DAT_0064f348[iVar11 * 0x58]);
    if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0)) {
      if ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] < 0x63)) {
        param_1 = iVar15;
        if ((DAT_006ad0d0 !== 0)) {
          FUN_0046e020(0x69, 0, 0, 0);
          FUN_00410030(s_OCCUPY_00634dec, DAT_0063fc58, 0);
        }
      }
      else if (((DAT_006ad0cc & 2) === 0)) {
        local_f0 = 1;
        param_1 = iVar15;
      }
      else {
        iVar11 = FUN_0057f9e3(uVar10, local_ec, local_fc, 1);
        if ((iVar11 === 0)) {
          FUN_005b5d93(param_1, 1);
          FUN_0047cea6(local_bc, local_d0);
          FUN_0046b14d(0x72, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
          param_1 = iVar15;
        }
        else {
          DAT_0064c6f0[(uVar10 * 0x594 + local_44)] = 0;
          param_1 = iVar15;
        }
      }
      goto LAB_00594a80;
    }
    if (((DAT_0064c6c0[(local_44 * 4 + uVar10 * 0x594)] & 0xe) !== 0)) {
      if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        DAT_006560ff[param_1 * 0x20] = 0xff;
        param_1 = iVar15;
        goto LAB_00594a80;
      }
      if ((iVar17 !== 0));
  param_1 = iVar15;
  if ((iVar17 === 0)) {
    pbVar13 = FUN_005b8931(local_bc, local_d0);
    pbVar14 = FUN_005b8931(local_ec, local_fc);
    if (((pbVar14[1] & 0x22) === 0)) {
      if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 2) === 0)) {
        if (((pbVar14[1] & 0x12) === 0)) {
          if ((iVar17 === 1)) {
            if (((local_d0 === local_fc) || ((local_d0 - local_fc) < 0))) {
              local_114 = ((~(local_d0 - local_fc)) + 1);
            }
            else {
              local_114 = (local_d0 - local_fc);
            }
            if ((local_114 === 1));
        }
        else {
 LAB_00592870: :
          local_24 = 1;
        }
      }
      else {
        local_24 = 1;
      }
    }
    else {
      local_24 = 0;
    }
  }
  else {
    local_24 = u8(DAT_0064bcc8);
  }
  iVar17 = FUN_005b2c3d(param_1);
  if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if (((local_24 === 1) || ((local_24 - 1) < 0))) {
      local_118 = 0;
    }
    else {
      local_118 = _rand();
      local_118 = (local_118 % local_24);
    }
    iVar17 = FUN_005b2c3d(param_1);
    if ((iVar17 <= local_118)) {
      FUN_005b6787(param_1);
      local_f0 = 1;
      goto LAB_00594a80;
    }
  }
  if (((DAT_006ad0cc & 2) === 0)) {
    local_f0 = 1;
    goto LAB_00594a80;
  }
  bVar8 = DAT_006560f8[param_1 * 0x20];
  local_1c = u8(bVar8);
  DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + ((local_24) & 0xFF));
  if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if ((iVar17 === 0)) {
      FUN_005b6787(param_1);
      goto LAB_00594a80;
    }
    if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 6)) {
      iVar17 = FUN_005b2c3d(param_1);
      iVar18 = FUN_005b50ad(local_28, 2);
      if (((((-u8((iVar17 === 0))) & -2) + 4) <= iVar18)) {
        FUN_005b6787(param_1);
        goto LAB_00594a80;
      }
    }
  }
  if ((s8(DAT_0064f348[iVar15 * 0x58]) === DAT_006d1da0)) {
    iVar15 = FUN_005b8931(local_bc, local_d0);
    DAT_006560f9[param_1 * 0x20] = (_MEM[(iVar15 + 4)] | DAT_006560f9[param_1 * 0x20]);
  }
  if ((DAT_006d1da0 === local_44)) {
    FUN_005b490e(param_1, DAT_006d1da0);
  }
  for (/* cond: (local_34 < 8) */); local_34 = local_34; local_34 = (local_34 + 1)) {
    w32(DAT_ffffff60, local_34, 0);
    w32(DAT_ffffff80, local_34, s32(DAT_ffffff60, local_34));
    if ((((1 << (((local_34) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      if ((DAT_00655b07 === 0)) {
        for (/* cond: (local_38 < 8) */); local_38 = (local_38 < 8); local_38 = (local_38 + 1)) {
          local_10 = FUN_005ae052((s8(DAT_00628350[local_38]) + local_ec));
          local_60 = (s8(DAT_00628360[local_38]) + local_fc);
          iVar15 = FUN_004087c0(local_10, local_60);
          if ((uVar12 === local_34)) {
            w32(DAT_ffffff60, local_34, 1);
            break;
          }
        }
      }
      else {
        w32(DAT_ffffff60, local_34, 1);
      }
      if ((s32(DAT_ffffff60, local_34) !== 0)) {
        if ((-1 < iVar11)) {
          w32(DAT_ffffff80, DAT_006d1da0, 1);
          SVar9 = FUN_006e7d64(0x10);
          local_8 = u8((((SVar9 >>> 8)) & 0xFF));
          if ((local_8 !== 0)) {
            w32(DAT_ffffff80, DAT_006d1da0, 0);
          }
          if ((DAT_006560ff[param_1 * 0x20] === 0xb)) {
            w32(DAT_ffffff80, DAT_006d1da0, 0);
            DAT_00634c9c = 1;
            if ((DAT_006d1da0 === uVar10)) {
              DAT_00634c9c = 2;
              DAT_0064b1b4 = ((local_ec) & 0xFFFF);
              DAT_0064b1b0 = ((local_fc) & 0xFFFF);
            }
          }
        }
      }
      else if ((DAT_006560ff[param_1 * 0x20] === 0xb)) {
        w32(DAT_ffffff80, local_34, 0);
      }
    }
  }
  if ((DAT_00654fa8 === 0)) {
    uVar16 = FUN_00493c7d(uVar10);
    FUN_0040ff60(0, uVar16);
    FUN_0040ff60(1, (DAT_0064f360 + iVar15 * 0x58));
    FUN_004442e0(s_LANDING_00634df4, param_1);
  }
  FUN_004b0b53(0xff, 2, 0, 0, 1);
  if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    FUN_005b5bab(param_1, 0);
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 1);
      for (/* cond: (local_34 < 8) */); local_34 = local_34; local_34 = (local_34 + 1)) {
        if ((s32(DAT_ffffff80, local_34) === 0)) {
          if ((s32(DAT_ffffff60, local_34) !== 0)) {
            FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_34 * 4), 0) * 0x54), 0), local_bc, local_d0, 0, 0, 0, 0, 0, 0);
          }
        }
        else {
          FUN_0046b14d(0x70, s32((DAT_006ad30c + s32((DAT_006ad558 + local_34 * 4), 0) * 0x54), 0), param_1, local_bc, local_d0, param_2, -1, 1, 0, 0);
        }
      }
      XD_FlushSendBuffer(0x1388);
    }
    if ((s32(DAT_ffffff80, DAT_006d1da0) === 0)) {
      if ((s32(DAT_ffffff60, DAT_006d1da0) !== 0)) {
        FUN_0047cea6(local_bc, local_d0);
      }
    }
    else {
      FUN_0046e020(0x63, 1, 0, 0);
      FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
    }
    FUN_005b48b1(param_1);
    if ((local_40 === 0)) {
      FUN_005b496e(param_1, local_44);
    }
    local_a4 = FUN_005b8ffa(local_ec, local_fc);
    FUN_005b3ae0(param_1, local_ec, local_fc, 0);
    FUN_004b0b53(0xff, 2, 0, 0, 1);
  }
  else {
    local_a4 = FUN_005b8ffa(local_ec, local_fc);
    DAT_006c914c = -2;
    FUN_0046b14d(0x5a, 0, uVar10, local_44, param_1, local_40, local_ec, local_fc, 0, 0);
    bVar4 = 1;
    XD_FlushSendBuffer(0x1388);
    if ((s32(DAT_ffffff80, DAT_006d1da0) === 0)) {
      if ((s32(DAT_ffffff60, DAT_006d1da0) !== 0)) {
        FUN_0047cea6(local_bc, local_d0);
      }
    }
    else {
      FUN_0046e020(0x63, 1, 0, 0);
      iVar15 = FUN_005b8931(local_bc, local_d0);
      uVar16 = FUN_005b2e69(local_bc, local_d0, 2);
      iVar17 = FUN_005b50ad(uVar16);
      if ((iVar17 === 1)) {
        _MEM[(iVar15 + 1)] = (_MEM[(iVar15 + 1)] & 0xfe);
      }
      else if ((1 < iVar17)) {
        DAT_00633e4c = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
        DAT_00633e50 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
        iVar17 = FUN_005b50ad(param_1, 5);
        if ((iVar17 === 0)) {
          if ((s16((DAT_00656108 + param_1 * 0x20), 0) < 0)) {
            if ((s16((DAT_00656106 + param_1 * 0x20), 0) < 0)) {
              _MEM[(iVar15 + 1)] = (_MEM[(iVar15 + 1)] & 0xfe);
            }
            else {
              DAT_00633e54 = ((s16((DAT_00656106 + param_1 * 0x20), 0)) << 16 >> 16);
            }
          }
          else {
            DAT_00633e54 = ((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16);
          }
        }
        else {
          iVar17 = FUN_005b50ad(param_1, 5);
          if ((iVar17 < 2)) {
            _MEM[(iVar15 + 1)] = (_MEM[(iVar15 + 1)] & 0xfe);
          }
          else {
            DAT_00633e54 = FUN_005b2d39(param_1);
            do {
              if ((DAT_0064b1c1[u8(DAT_006560f6[DAT_00633e54 * 0x20]) * 0x14] === 2));
            } while ((-1 < ((s16((DAT_00656108 + DAT_00633e54 * 0x20), 0)) << 16 >> 16)));
            _MEM[(iVar15 + 1)] = (_MEM[(iVar15 + 1)] & 0xfe);
          }
        }
      }
 LAB_005936b6: :
      DAT_00636058 = 1;
      FUN_0056c705(param_1, local_bc, local_d0, param_2, -1, -1);
      DAT_00636058 = 0;
      uVar16 = FUN_005b2e69(local_bc, local_d0, 2);
      iVar17 = FUN_005b50ad(uVar16);
      if ((iVar17 !== 0)) {
        if ((DAT_006ad2f7 === 0)) {
          _MEM[(iVar15 + 1)] = (_MEM[(iVar15 + 1)] | 1);
        }
        else {
          FUN_005b94fc(local_bc, local_d0, 1, 1, 1);
        }
      }
    }
    for (/* cond: (local_34 < 8) */); local_34 = local_34; local_34 = (local_34 + 1)) {
      if ((s32(DAT_ffffff80, local_34) === 0)) {
        if ((DAT_006d1da0 !== local_34)) {
          FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_34 * 4), 0) * 0x54), 0), local_bc, local_d0, 0, 0, 0, 0, 0, 0);
        }
      }
      else {
        FUN_0046b14d(0x70, s32((DAT_006ad30c + s32((DAT_006ad558 + local_34 * 4), 0) * 0x54), 0), param_1, local_bc, local_d0, param_2, -1, 1, 0, 0);
      }
    }
    if ((local_30 !== 0)) {
      iVar15 = FUN_00421bb0();
      while ((DAT_006c914c !== 1)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c914c !== 1)) {
        FUN_005d225b(s_move_unit(NM_REALTIME_STACKER):_C_00634dfc);
        FUN_00410030(s_SERVERCONNECTTIME_00634e3c, DAT_0063fc58, 0);
        DAT_00628044 = 0;
      }
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
    bVar6 = 0;
  }
  if ((local_40 === 0)) {
    iVar15 = FUN_005b8a81(local_ec, local_fc);
    w16((DAT_0064c832 + (uVar10 * 0x594 + iVar15 * 2)), 0, (s16((DAT_0064c832 + (uVar10 * 0x594 + iVar15 * 2)), 0) + 1));
  }
  if ((local_44 !== uVar10)) {
    DAT_006560fa[param_1 * 0x20] = 0;
    DAT_00655b00 = ((param_1) & 0xFFFF);
    FUN_0057b5df(iVar11, uVar10, 0);
    param_1 = ((((param_1) & 0xFFFF)) << 16 >> 16);
  }
  iVar15 = param_1;
  if ((s8(DAT_0064f348[iVar17 * 0x58]) === DAT_006d1da0)) {
    iVar17 = FUN_005b8931(local_ec, local_fc);
    FUN_005b4ee2(param_1, _MEM[(iVar17 + 4)]);
  }
  if ((DAT_0064b1c9[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 0)) {
    for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1))
    {
      if ((DAT_006560ff[param_1 * 0x20] === 3)) {
        DAT_006560ff[param_1 * 0x20] = 0xff;
      }
    }
  }
 LAB_00593d80: :
  param_1 = iVar15;
  iVar15 = param_1;
  if ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
    FUN_005b389f(param_1, 0);
  }
  FUN_004274a6(param_1, 1);
  FUN_0050c494(param_1, local_bc, local_d0);
  if (((((SVar9 >>> 8)) & 0xFF) === 0)) {
    if ((DAT_00634c9c !== 0)) {
      FUN_0046e287(0xa);
    }
    else {
      FUN_0046e287(0xf);
    }
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
    iVar11 = FUN_005b8ca6(local_ec, local_fc);
    if ((iVar11 < 0)) {
      bVar4 = 0;
    }
    else {
      bVar4 = 1;
    }
    if ((!bVar4)) {
      for (/* cond: (-1 < local_d8) */); -1 = (-1 < local_d8);
          local_d8 = FUN_005b2c82(local_d8)) {
        if (((DAT_0064b1bc[u8(DAT_006560f6[local_d8 * 0x20]) * 0x14] & 0x80) !== 0)) {
          bVar4 = 1;
          break;
        }
        if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) {
          bVar4 = 1;
          break;
        }
      }
    }
    if ((local_4c !== 0)) {
      bVar4 = 0;
    }
    if (bVar4) {
      DAT_006560fd[param_1 * 0x20] = 0;
      FUN_005b6787(param_1);
      FUN_005b389f(param_1, 1);
      FUN_0047cea6(local_ec, local_fc);
      FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
      goto LAB_00594255;
    }
    if ((DAT_006560fd[param_1 * 0x20] < DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14])) {
      if ((DAT_006560f6[param_1 * 0x20] < 0x1e)) {
        FUN_0046e020(0x1a, 0, 0, 0);
      }
      else {
        FUN_0046e020(0x4e, 0, 0, 0);
      }
    }
    local_bc = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    local_d0 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    uVar3 = DAT_006560f6[param_1 * 0x20];
    FUN_005b4391(param_1, 1);
    FUN_0047ce1e(local_bc, local_d0, 0, DAT_006d1da0, 1);
    FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
    if ((DAT_006ad0d0 !== 0)) {
      FUN_004442a0(DAT_00634e50, uVar3, (((DAT_00633584 === 0) - 1) & 8));
    }
  }
  else {
 LAB_00594255: :
    if ((iVar11 === 0)) {
      local_c4 = u8(DAT_0064bcc9);
      iVar11 = FUN_004bd9f0(uVar10, 0x4b);
      if ((local_c4 < 3)) {
        local_c4 = 2;
      }
      iVar11 = FUN_004bd9f0(uVar10, 0x39);
      if ((iVar11 !== 0)) {
        local_c4 = (local_c4 << 1);
      }
      if (((local_c4 - 1) < 1)) {
        local_120 = 0;
      }
      else {
        local_120 = _rand();
        local_120 = (local_120 % local_c4);
      }
      if ((local_120 === 0)) {
        bVar4 = 0;
        for (/* cond: (local_38 < 9) */); local_38 = (local_38 < 9); local_38 = (local_38 + 1)) {
          uVar16 = FUN_005ae052((s8(DAT_00628350[local_38]) + local_ec));
          local_48 = (s8(DAT_00628360[local_38]) + local_fc);
          iVar11 = FUN_004087c0(uVar16, local_48);
          if ((iVar11 === 0)) {
            bVar4 = 1;
            break;
          }
        }
        if ((!bVar4)) {
          if ((DAT_006ad0d0 !== 0)) {
            FUN_0046e020(9, 1, 0, 0);
          }
          local_bc = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
          local_d0 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
          uVar3 = DAT_006560f6[param_1 * 0x20];
          FUN_005b5d93(param_1, 1);
          FUN_0047ce1e(local_bc, local_d0, 0, DAT_006d1da0, 1);
          FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
          if ((DAT_006ad0d0 !== 0)) {
            FUN_004442a0(s_TRIREME_00634e58, uVar3, (((DAT_00633584 === 0) - 1) & 8));
          }
          goto LAB_00594a80;
        }
      }
    }
    if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
      FUN_0058f040(param_1);
    }
    if ((iVar11 !== 0)) {
      bVar4 = 0;
      for (/* cond: (local_38 < 8) */); local_38 = (local_38 < 8); local_38 = (local_38 + 1)) {
        iVar11 = FUN_005ae052((s8(DAT_00628350[local_38]) + local_ec));
        local_48 = (s8(DAT_00628360[local_38]) + local_fc);
        iVar17 = FUN_004087c0(iVar11, local_48);
        if ((DAT_0064ca32[(uVar10 * 0x594 + iVar17)] !== 4)) {
          for (/* cond: (local_5c < 8) */); local_5c = (local_5c < 8); local_5c = (local_5c + 1)) {
            uVar16 = FUN_005ae052((s8(DAT_00628350[local_5c]) + iVar11));
            iVar17 = (s8(DAT_00628360[local_5c]) + local_48);
            iVar18 = FUN_004087c0(uVar16, iVar17);
            if ((iVar17 === 0)) {
              bVar4 = 1;
              break;
            }
          }
          if (bVar4) {
        for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1);
            param_1 = FUN_005b2c82(param_1)) {
          if ((DAT_006560f8[param_1 * 0x20] === 0)) {
            DAT_006560ff[param_1 * 0x20] = 0xff;
          }
        }
      }
    }
    if (bVar5) {
      FUN_005b2f50(iVar15);
      FUN_005b6787(iVar15);
      for (/* cond: (-1 < local_b4) */); -1 = (-1 < local_b4);
          local_b4 = FUN_005b2c82(local_b4)) {
        if ((((s16((DAT_00656102 + iVar15 * 0x20), 0)) << 16 >> 16) === local_b4)) {
          DAT_006560ff[local_b4 * 0x20] = 0xff;
          DAT_00655afe = ((local_b4) & 0xFFFF);
          break;
        }
      }
      FUN_0047cea6(local_ec, local_fc);
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x72, 0xff, local_ec, local_fc, 0, 0, 0, 0, 0, 0);
    }
    if ((DAT_006ad0d0 !== 0)) {
      if (((((s16((DAT_006560f4 + iVar15 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
        DAT_006560fe[iVar15 * 0x20] = (DAT_006560fe[iVar15 * 0x20] + 1);
        if (((s8(DAT_006560fb[iVar15 * 0x20]) ^ 4) === param_2)) {
          DAT_006560fe[iVar15 * 0x20] = (DAT_006560fe[iVar15 * 0x20] + 0xf);
        }
        if ((0x2f < DAT_006560fe[iVar15 * 0x20])) {
          iVar11 = FUN_004442e0(s_LONGMOVE_00634e60, iVar15);
          if ((iVar11 !== 0)) {
            DAT_006560ff[iVar15 * 0x20] = 0xff;
            w16((DAT_006560f4 + iVar15 * 0x20), 0, (s16((DAT_006560f4 + iVar15 * 0x20), 0) & 0x7fff));
          }
          DAT_006560fe[iVar15 * 0x20] = 0;
        }
      }
      else {
        DAT_006560fe[iVar15 * 0x20] = 0;
      }
    }
    DAT_006560fb[iVar15 * 0x20] = ((param_2) & 0xFF);
    local_f0 = 1;
    param_1 = iVar15;
  }
 LAB_00594a80: :
  if (bVar6) {
    FUN_0059511c(uVar10, local_30);
  }
 LAB_00594aaa: :
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x75, 0xff, local_bc, local_d0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  if ((((DAT_00655b16) << 16 >> 16) !== local_2c)) {
    DAT_00634ca0 = 0;
    return 0;
  }
  if ((local_f0 === 0)) {
    DAT_006560ff[param_1 * 0x20] = 0xff;
    if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
      FUN_005b6787(param_1);
    }
    if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 4)) {
      DAT_006560fd[param_1 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
    }
    if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x100) !== 0)) {
        DAT_006560ff[param_1 * 0x20] = 2;
      }
      DAT_006560fe[param_1 * 0x20] = (DAT_006560fe[param_1 * 0x20] + 1);
      if ((0x13 < DAT_006560fe[param_1 * 0x20])) {
        DAT_006560fe[param_1 * 0x20] = 0;
        FUN_005b6787(param_1);
      }
    }
  }
  else {
    w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xfeff));
  }
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  DAT_00634ca0 = 0;
  return local_f0;
}


 export function FUN_00594d42 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_14;
  let local_10;
  let local_c;

  DAT_006ad8cc = 1;
  w32((DAT_0064ba4c + param_1 * 0x18), 0, 0);
  w32((DAT_0064ba48 + param_1 * 0x18), 0, s32((DAT_0064ba4c + param_1 * 0x18), 0));
  if ((DAT_006ad2f7 === 0)) {
    DAT_006ad8cc = 0;
    FUN_0046b14d(0x51, 0, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    if ((param_6 === 0)) {
      uVar1 = 1;
    }
    else {
      iVar2 = FUN_00421bb0();
      while ((s32((DAT_0064ba4c + param_1 * 0x18), 0) !== 0)) {
        iVar3 = FUN_00421bb0();
        if ((s32((DAT_0064ba4c + param_1 * 0x18), 0) !== 0));
      }
      if ((s32((DAT_0064ba4c + param_1 * 0x18), 0) === 0)) {
        FUN_005d225b(s_LockMap:_Connection_to_server_ti_00634e6c);
        FUN_00410030(s_SERVERCONNECTTIME_00634e98, DAT_0063fc58, 0);
        DAT_00628044 = 0;
        uVar1 = 0;
      }
      else if ((s32((DAT_0064ba4c + param_1 * 0x18), 0) === 1)) {
        uVar1 = 1;
      }
      else {
        uVar1 = 0;
      }
    }
  }
  else {
    local_10 = -1;
    local_14 = -1;
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((s32((DAT_0064ba5c + local_c * 0x18), 0) === param_3)) {
        local_14 = 0;
        break;
      }
      if ((s32((DAT_0064ba5c + local_c * 0x18), 0) === param_5)) {
        local_10 = 0;
        break;
      }
    }
    if ((local_10 === -1)) {
      w32((DAT_0064ba50 + param_1 * 0x18), 0, param_2);
      w32((DAT_0064ba54 + param_1 * 0x18), 0, param_3);
      w32((DAT_0064ba58 + param_1 * 0x18), 0, param_4);
      w32((DAT_0064ba5c + param_1 * 0x18), 0, param_5);
      if ((DAT_006ad359[s32((DAT_006ad558 + param_1 * 4), 0) * 0x54] !== 0)) {
        FUN_0046b14d(0x53, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), param_1, 1, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0xea60);
      }
      DAT_006ad8cc = 0;
      uVar1 = 1;
    }
    else {
      if ((DAT_006ad359[s32((DAT_006ad558 + param_1 * 4), 0) * 0x54] !== 0)) {
        FUN_0046b14d(0x53, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), param_1, -1, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0xea60);
      }
      DAT_006ad8cc = 0;
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_0059511c (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  DAT_006ad8d0 = 1;
  if ((DAT_006ad2f7 === 0)) {
    DAT_006ad8d0 = 0;
    w32((DAT_0064ba48 + param_1 * 0x18), 0, 0);
    FUN_0046b14d(0x52, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    if ((param_2 !== 0)) {
      iVar1 = FUN_00421bb0();
      while ((s32((DAT_0064ba48 + param_1 * 0x18), 0) !== 0)) {
        iVar2 = FUN_00421bb0();
        if ((s32((DAT_0064ba48 + param_1 * 0x18), 0) !== 0));
      }
      if ((s32((DAT_0064ba48 + param_1 * 0x18), 0) === 0)) {
        FUN_005d225b(s_UnlockMap:_Connection_to_server_t_00634eac);
        FUN_00410030(s_SERVERCONNECTTIME_00634ed8, DAT_0063fc58, 0);
        DAT_00628044 = 0;
      }
    }
  }
  else {
    _memset((DAT_0064ba48 + param_1 * 0x18), -1, 0x18);
    FUN_0046b14d(0x55, 0xff, param_1, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    DAT_006ad8d0 = 0;
  }
  return;
}


 export function FUN_00596b00 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = s32(DAT_00634f64, param_2 * 3);
  if ((param_2 === 2)) {
    iVar1 = ((((s16((DAT_0064caa8 + param_1 * 0x594), 0)) << 16 >> 16) + 1) - (param_2 * 2 + -2));
    local_8 = FUN_005adfa0(local_8, 0, ((iVar1 + ((iVar1 >> 0x1f) & 3)) >> 2));
  }
  else if ((param_2 !== 0)) {
    iVar1 = ((((s16((DAT_0064caa8 + param_1 * 0x594), 0)) << 16 >> 16) + 1) - (param_2 * 4 + -12));
    local_8 = FUN_005adfa0(local_8, 0, ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3));
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      local_8 = FUN_005adfa0(local_8, 0, 1);
    }
    if ((local_8 < 0)) {
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_00596c08 (param_1, param_2)

 {
  let sVar1;
  let uVar2;

  sVar1 = s16((DAT_0064caa8 + (param_1 * 0x594 + param_2 * 2)), 0);
  uVar2 = FUN_00596b00(param_1, param_2);
  FUN_005adfa0(((sVar1) << 16 >> 16), 0, uVar2);
  return;
}


 export function FUN_00596c61 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;

  if ((param_2 === 0)) {
    iVar1 = FUN_00596b00(param_1, 0);
  }
  else if ((param_2 === 1)) {
    iVar2 = FUN_00596b00(param_1, 2);
    iVar1 = FUN_00596b00(param_1, 1);
    iVar1 = (iVar1 + iVar2);
  }
  else {
    iVar2 = FUN_00596b00(param_1, 3);
    iVar3 = FUN_00596b00(param_1, 4);
    iVar1 = FUN_00596b00(param_1, 5);
    iVar1 = (iVar1 + (iVar2 + iVar3));
  }
  return iVar1;
}


 export function FUN_00596ced (param_1)

 {
  let iVar1;

  iVar1 = DAT_00634f64;
  if ((param_1 !== 0)) {
    if ((param_1 === 1)) {
      iVar1 = (DAT_00634f7c + DAT_00634f70);
    }
    else {
      iVar1 = ((DAT_00634fa0 + DAT_00634f88) + DAT_00634f94);
    }
  }
  return iVar1;
}


 export function FUN_00596d3c (param_1, param_2)

 {
  let iVar1;

  if ((param_2 === 0)) {
    iVar1 = ((s16((DAT_0064caa8 + param_1 * 0x594), 0)) << 16 >> 16);
  }
  else if ((param_2 === 1)) {
    iVar1 = (((s16((DAT_0064caaa + param_1 * 0x594), 0)) << 16 >> 16) + ((s16((DAT_0064caac + param_1 * 0x594), 0)) << 16 >> 16));
  }
  else {
    iVar1 = ((((s16((DAT_0064caae + param_1 * 0x594), 0)) << 16 >> 16) + ((s16((DAT_0064cab0 + param_1 * 0x594), 0)) << 16 >> 16)) + ((s16((DAT_0064cab2 + param_1 * 0x594), 0)) << 16 >> 16));
  }
  return iVar1;
}


 export function FUN_00596e06 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;

  if ((param_2 === 0)) {
    iVar1 = FUN_00596c08(param_1, 0);
  }
  else if ((param_2 === 1)) {
    iVar2 = FUN_00596c08(param_1, 2);
    iVar1 = FUN_00596c08(param_1, 1);
    iVar1 = (iVar1 + iVar2);
  }
  else {
    iVar2 = FUN_00596c08(param_1, 3);
    iVar3 = FUN_00596c08(param_1, 4);
    iVar1 = FUN_00596c08(param_1, 5);
    iVar1 = (iVar1 + (iVar2 + iVar3));
  }
  return iVar1;
}


 export function FUN_00596e92 (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < param_1) */); local_c = (local_c < param_1); local_c = (local_c + 1)) {
    iVar1 = (local_8 + 1);
    if ((3 < local_c)) {
      iVar1 = (local_8 + 2);
    }
    local_8 = iVar1;
    if ((5 < local_c)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_00596eec (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let sVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar4 = FUN_004a7577(param_1);
  if ((iVar4 === 0)) {
    iVar4 = FUN_004bd9f0(param_1, 0x20);
    if ((iVar4 !== 0)) {
      DAT_0064caa0[param_1 * 0x594] = (DAT_0064caa0[param_1 * 0x594] | 8);
    }
  }
  bVar1 = DAT_0064caa0[param_1 * 0x594];
  DAT_006ad0e4 = 0;
  for (/* cond: (local_1c < 6) */); local_1c = (local_1c < 6); local_1c = (local_1c + 1)) {
    DAT_006ad0e4 = (DAT_006ad0e4 + ((s16((DAT_0064caa8 + (param_1 * 0x594 + local_1c * 2)), 0)) << 16 >> 16) * s32((DAT_00634f68 + local_1c * 0xc), 0));
  }
  local_18 = DAT_006ad0e4;
  for (/* cond: (local_1c < 6) */); local_1c = (local_1c < 6); local_1c = (local_1c + 1)) {
    if ((s16((DAT_0064caa8 + (local_1c * 2 + param_1 * 0x594)), 0) === 0)) {
      local_18 = (local_18 + s32((DAT_00634f68 + local_1c * 0xc), 0));
    }
  }
  DAT_006ad0ec = 0x64;
  iVar4 = FUN_00596c08(param_1, 4);
  uVar5 = FUN_00596c08(param_1, 3, 1, 0x63);
  iVar6 = FUN_005adfa0(uVar5);
  DAT_006ad0f0 = (iVar4 * 0x64 / iVar6 | 0);
  if ((param_2 !== 0)) {
    iVar4 = FUN_005adfa0((iVar4 * 0x64 / iVar6 | 0), 0, 0x64);
    DAT_006ad0ec = (iVar4 * 0x64 / 0x64 | 0);
  }
  iVar4 = FUN_00596c08(param_1, 5);
  iVar6 = FUN_00596c08(param_1, 3, 1, 0x63);
  iVar7 = FUN_00596c08(param_1, 4);
  iVar6 = FUN_005adfa0((iVar6 + iVar7));
  DAT_006ad0e8 = (iVar4 * 0xc8 / iVar6 | 0);
  iVar4 = FUN_005adfa0((iVar4 * 0xc8 / iVar6 | 0), 0, 0x64);
  DAT_006ad0ec = (iVar4 * DAT_006ad0ec / 0x64 | 0);
  iVar4 = FUN_00596c08(param_1, 2);
  uVar5 = FUN_00596c08(param_1, 1, 1, 0x63);
  iVar6 = FUN_005adfa0(uVar5);
  DAT_006ad0dc = (iVar4 * 0x64 / iVar6 | 0);
  local_c = u8(DAT_0064bcdc);
  if (((bVar1 & 8) !== 0)) {
    local_c = (local_c * 3 >> 2);
  }
  local_8 = 1;
  for (/* cond: (0x64 < local_c) */); 100 = (0x64 < local_c); local_c = (local_c >> 1)) {
    local_8 = (local_8 << 1);
  }
  iVar6 = DAT_006ad0e4 * local_c;
  uVar5 = FUN_00596c08(param_1, 2);
  iVar4 = FUN_00596e92(uVar5);
  uVar5 = FUN_00596c08(param_1, 1, 0, iVar4 * 0xa);
  iVar4 = FUN_00596e92(uVar5);
  iVar4 = FUN_005adfa0(iVar4 * 0xa);
  DAT_006ad0f4 = (iVar6 / (iVar4 + 1) | 0);
  uVar5 = FUN_00596c08(param_1, 2);
  iVar4 = FUN_00596e92(uVar5);
  uVar5 = FUN_00596c08(param_1, 1, 0, iVar4 * 0xa);
  iVar4 = FUN_00596e92(uVar5);
  iVar4 = FUN_005adfa0(iVar4 * 0xa);
  local_10 = (local_c * local_18 / (iVar4 + 1) | 0);
  iVar4 = FUN_00596e92(((s16((DAT_0064caac + param_1 * 0x594), 0)) << 16 >> 16));
  iVar4 = FUN_00596e92(((s16((DAT_0064caaa + param_1 * 0x594), 0)) << 16 >> 16), 0, iVar4 * 0xa);
  iVar4 = FUN_005adfa0(iVar4 * 0xa);
  local_14 = (local_c * local_18 / (iVar4 + 1) | 0);
  if ((1 < local_8)) {
    DAT_006ad0f4 = local_8 * (iVar6 / (iVar4 + 1) | 0);
    local_10 = local_8 * local_10;
    local_14 = local_8 * local_14;
  }
  if ((0x96 < DAT_006ad0f4)) {
    DAT_006ad0ec = ((iVar4 * DAT_006ad0ec / 0x64 | 0) - ((DAT_006ad0f4 + -0x96) / 0xa | 0));
  }
  DAT_006ad0ec = FUN_005adfa0(DAT_006ad0ec, 0, 0x64);
  iVar4 = FUN_004a7577(param_1);
  if ((iVar4 === 0)) {
    uVar2 = FUN_00596c08(param_1, 3);
    w16((DAT_0064caa6 + param_1 * 0x594), 0, uVar2);
    uVar2 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    w16((DAT_0064caa4 + param_1 * 0x594), 0, uVar2);
    sVar3 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    w16((DAT_0064caa2 + param_1 * 0x594), 0, (sVar3 + (((local_10 / 0xa | 0)) & 0xFFFF)));
    iVar4 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    DAT_006ad0e0 = (iVar4 + (local_14 / 0xa | 0));
  }
  return;
}


 export function FUN_005973fd (param_1)

 {
  let uVar1;
  let iVar2;
  let local_c;
  let local_8;

  DAT_0064caa0[param_1 * 0x594] = (DAT_0064caa0[param_1 * 0x594] | 2);
  if ((DAT_00655afc < 0)) {
    DAT_00655afc = DAT_00655af8;
  }
  uVar1 = FUN_00493c7d(param_1);
  FUN_0040ff60(0, uVar1);
  FUN_00421da0(0, ((s16((DAT_0064caa2 + param_1 * 0x594), 0)) << 16 >> 16));
  if ((2 < DAT_00655b02)) {
    FUN_00511880(0xb, 0xff, 1, 1, param_1, 0);
  }
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    FUN_00421ea0(s_LAUNCHED_00634fa8);
    FUN_004d0208((-param_1));
  }
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    for (/* cond: (local_c < ((DAT_00655b18) << 16 >> 16)) */); local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
      if ((s8(DAT_0064f348[local_c * 0x58]) === param_1)) {
        FUN_00441b11(local_c, 0x63);
      }
    }
  }
  else {
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((s16((DAT_0064caa2 + param_1 * 0x594), 0) < s16((DAT_0064caa2 + local_8 * 0x594), 0))) {
        if ((DAT_00655b08 < 4)) {
          if ((DAT_0064c6be[param_1 * 0x594] === 0)) {
            FUN_00467825(param_1, local_8, 0x10000);
          }
          else {
            w32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0) | 0x20));
          }
        }
        else if (((DAT_0064c6c0[(local_8 * 4 + param_1 * 0x594)] & 8) === 0)) {
          w32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0) & -39));
          w32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0) | 0x80840));
        }
        else {
          w32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0, (s32((DAT_0064c6c0 + (local_8 * 0x594 + param_1 * 4)), 0) | 0x20));
        }
      }
    }
  }
  return;
}


 export function FUN_0059772c (param_1, param_2)

 {
  let sVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_230;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00597d57;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  bVar2 = 0;
  FUN_00596eec(param_1, 1);
  if ((s16((DAT_0064caae + param_1 * 0x594), 0) === 0)) {
    param_2 = 0;
  }
  uVar3 = FUN_00410070(param_1);
  FUN_0040ff60(2, uVar3);
  uVar3 = FUN_00493b10(param_1);
  FUN_0040ff60(1, uVar3);
  uVar3 = FUN_00493c7d(param_1);
  FUN_0040ff60(0, uVar3);
  DAT_0063cc49 = 0;
  __strupr(DAT_0063cc48);
  FUN_0043c9d0(s_SPACESHIP_00634fb4);
  for (/* cond: (local_18 < 6) */); local_18 = (local_18 < 6); local_18 = (local_18 + 1)) {
    sVar1 = s16((DAT_0064caa8 + (param_1 * 0x594 + local_18 * 2)), 0);
    iVar4 = FUN_00596b00(param_1, local_18);
    if ((iVar4 < ((sVar1) << 16 >> 16))) {
      bVar2 = 1;
    }
  }
  for (/* cond: (local_18 < 6) */); local_18 = (local_18 < 6); local_18 = (local_18 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_00628420 + s32((DAT_00634f60 + local_18 * 0xc), 0) * 4), 0))
    ;
    FUN_0040fe40();
    FUN_0040ff30(((s16((DAT_0064caa8 + (param_1 * 0x594 + local_18 * 2)), 0)) << 16 >> 16));
    if ((local_18 === 0)) {
      FUN_0040bbe0(DAT_00634fc0);
    }
    FUN_0059edf0(DAT_00679640, 0, 0);
  }
  FUN_0040bbb0();
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0x22);
  FUN_0040fe40();
  FUN_0040ff30(((s16((DAT_0064caae + param_1 * 0x594), 0)) << 16 >> 16));
  FUN_0040bbe0(s_0,000_00634fc4);
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0x42);
  FUN_0040fe40();
  FUN_0040ff30(DAT_006ad0f0);
  FUN_0040fe70();
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0xcd);
  FUN_0040fe40();
  FUN_0040ff30(DAT_006ad0e8);
  FUN_0040fe70();
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0xce);
  FUN_0040fe40();
  FUN_0040ff30((DAT_006ad0e4 / 0xa | 0));
  FUN_0040bbe0(DAT_00634fcc);
  FUN_0040ff30((DAT_006ad0e4 % 0xa));
  FUN_0040bbe0(DAT_00634fd0);
  FUN_0040bc10(0xd1);
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0xc8);
  FUN_0040fe40();
  FUN_0040ff30(DAT_006ad0dc);
  FUN_0040fe70();
  if (((DAT_0064caa0[param_1 * 0x594] & 8) !== 0)) {
    FUN_0040fe10();
    FUN_0040fea0();
    FUN_0040bc10(0xeb);
    FUN_0040fed0();
  }
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0xcf);
  FUN_0040fe40();
  FUN_0040ff30((DAT_006ad0f4 / 0xa | 0));
  FUN_0040bbe0(DAT_00634fd4);
  FUN_0040ff30((DAT_006ad0f4 % 0xa));
  FUN_0040fe10();
  FUN_0040bc10(0xd2);
  FUN_0059edf0(DAT_00679640, 0, 0);
  FUN_0040bbb0();
  FUN_0040bc10(0xd0);
  FUN_0040fe40();
  FUN_0040bbe0(DAT_00634fd8);
  FUN_0040ff30(DAT_006ad0ec);
  FUN_0040fe70();
  FUN_0040bbe0(DAT_00634fe0);
  FUN_0059edf0(DAT_00679640, 0, 0);
  iVar4 = FUN_004a7577(param_1);
  if ((iVar4 === 0)) {
    if ((DAT_006ad0ec !== 0)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x354), 0));
      FUN_0059f2a3(uVar3);
    }
  }
  else {
    FUN_0040bbb0();
    FUN_0040bbe0(DAT_00634fe8);
    if ((s16((DAT_0064caa2 + param_1 * 0x594), 0) < DAT_00655afa)) {
      FUN_0040bc10(0xd4);
    }
    else {
      FUN_0040bc10(0xd3);
      FUN_0040bbe0(DAT_00634ff0);
      FUN_0040bc10(0xda);
      FUN_0040fe10();
      FUN_0040ff30(((s16((DAT_0064caa2 + param_1 * 0x594), 0)) << 16 >> 16));
    }
    FUN_0040bbe0(s_!_---_00634ff4);
    FUN_0059edf0(DAT_00679640, 0, 0);
  }
  FUN_0040bc80(0);
  if ((local_230 !== 0)) {
    FUN_00421da0(0, DAT_006ad0ec);
    iVar4 = FUN_00421ea0(s_LAUNCH_00634ffc);
    if ((iVar4 !== 0)) {
      FUN_005973fd(param_1);
    }
  }
  local_8 = -1;
  FUN_00597d4b();
  FUN_00597d61();
  return;
}


 export function FUN_00597d4b ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00597d61 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00597d6f (param_1, param_2)

 {
  let sVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_10;
  let local_c;

  FUN_00596eec(param_1, 0);
  iVar4 = FUN_004a7577(param_1);
  if ((iVar4 !== 0)) {
    return -1;
  }
  sVar1 = 0x270f;
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    if ((s16((DAT_0064caa2 + local_10 * 0x594), 0) < sVar1)) {
      sVar1 = s16((DAT_0064caa2 + local_10 * 0x594), 0);
    }
  }
  if ((sVar1 <= s16((DAT_0064caa2 + param_1 * 0x594), 0))) {
    bVar2 = 0;
  }
  else {
    bVar2 = 1;
  }
  bVar3 = 0;
  if ((param_2 === 0)) {
    iVar4 = FUN_00596e06(param_1, 2);
    iVar5 = FUN_00596c61(param_1, 2);
    if ((iVar4 < iVar5)) {
      bVar3 = 1;
    }
    else if ((!bVar2)) {
      iVar4 = FUN_00596e06(param_1, 1);
      iVar5 = FUN_00596c61(param_1, 1);
      if ((iVar4 < iVar5)) {
        bVar3 = 1;
      }
    }
  }
  if ((!bVar2)) {
    iVar4 = FUN_00596e06(param_1, param_2);
    iVar5 = FUN_00596c61(param_1, param_2);
    if ((iVar4 !== 0)); param_2 = (param_2 === 0); local_c = (local_c + -1)) {
    iVar4 = FUN_00599910(param_1, local_c);
    if ((!bVar2)) {
      iVar4 = FUN_00596e06(param_1, local_c);
      iVar5 = FUN_00596c61(param_1, local_c);
      if ((iVar4 < iVar5)) {
        param_2 = local_c;
        break;
      }
    }
  }
 LAB_0059803b: :
  if ((param_2 === 0)) {
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      if ((iVar4 !== 0)) {
        sVar1 = s16((DAT_0064caaa + param_1 * 0x594), 0);
        iVar4 = FUN_00596b00(param_1, 1);
        if ((((sVar1) << 16 >> 16) <= iVar4)) {
          return 1;
        }
        sVar1 = s16((DAT_0064caac + param_1 * 0x594), 0);
        iVar4 = FUN_00596b00(param_1, 2);
        if ((((sVar1) << 16 >> 16) <= iVar4)) {
          return 1;
        }
      }
    }
  }
  iVar4 = FUN_00599910(param_1, param_2);
  if ((iVar4 === 0)) {
    param_2 = -2;
  }
  return param_2;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00598197 (param_1, param_2)

 {
  let sVar1;
  let bVar2;
  let iVar3;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_18 = -1;
  FUN_00596eec(param_1, 0);
  iVar3 = FUN_004a7577(param_1);
  if ((iVar3 === 0)) {
    while ((((s16((DAT_0064caa8 + (local_18 * 2 + param_1 * 0x594)), 0)) << 16 >> 16) < s32(DAT_00634f64, local_18 * 3))) {
      if ((param_2 === 0)) {
        if ((DAT_00634f64 <= ((s16((DAT_0064caa8 + param_1 * 0x594), 0)) << 16 >> 16))) {
          return local_18;
        }
        local_18 = 0;
      }
      else if ((param_2 === 1)) {
        if ((DAT_00634f7c <= ((s16((DAT_0064caac + param_1 * 0x594), 0)) << 16 >> 16))) {
          return local_18;
        }
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          if ((s16((DAT_0064caaa + param_1 * 0x594), 0) < s16((DAT_0064caac + param_1 * 0x594), 0))) {
            local_18 = 1;
          }
          else {
            local_18 = 2;
          }
        }
        else {
          FUN_00421da0(0, ((s16((DAT_0064caaa + param_1 * 0x594), 0)) << 16 >> 16));
          FUN_00421da0(1, ((s16((DAT_0064caac + param_1 * 0x594), 0)) << 16 >> 16));
          local_18 = FUN_00421ea0(s_COMPONENT_00635004);
          local_18 = (local_18 + 1);
        }
      }
      else {
        if ((DAT_00634fa0 <= ((s16((DAT_0064cab2 + param_1 * 0x594), 0)) << 16 >> 16))) {
          return local_18;
        }
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          sVar1 = 0x3e7;
          for (/* cond: (local_10 < 6) */); local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
            if ((s16((DAT_0064caa8 + (local_10 * 2 + param_1 * 0x594)), 0) < sVar1)) {
              sVar1 = s16((DAT_0064caa8 + (local_10 * 2 + param_1 * 0x594)), 0);
              local_18 = local_10;
            }
          }
        }
        else {
          FUN_00421da0(0, ((s16((DAT_0064caae + param_1 * 0x594), 0)) << 16 >> 16));
          FUN_00421da0(1, ((s16((DAT_0064cab0 + param_1 * 0x594), 0)) << 16 >> 16));
          FUN_00421da0(2, ((s16((DAT_0064cab2 + param_1 * 0x594), 0)) << 16 >> 16));
          local_18 = FUN_00421ea0(s_MODULE_00635010);
          local_18 = (local_18 + 3);
        }
      }
      if ((((s16((DAT_0064caa8 + (local_18 * 2 + param_1 * 0x594)), 0)) << 16 >> 16) < s32(DAT_00634f64, local_18 * 3)));
      FUN_00421ea0(s_NOFURTHER_00635018);
    }
    iVar3 = FUN_004a75a6(param_1);
    if ((iVar3 === 0)) {
      DAT_0064caa0[param_1 * 0x594] = (DAT_0064caa0[param_1 * 0x594] | 1);
      for (/* cond: (local_20 < 8) */); local_20 = (local_20 < 8); local_20 = (local_20 + 1)) {
        if ((iVar3 === 0)) {
          for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
            w16((DAT_0064ca82 + (local_14 * 2 + local_20 * 0x594)), 0, 0);
          }
        }
      }
    }
    w16((DAT_0064caa8 + (local_18 * 2 + param_1 * 0x594)), 0, (s16((DAT_0064caa8 + (local_18 * 2 + param_1 * 0x594)), 0) + 1));
    FUN_00596eec(param_1, 0);
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      bVar2 = 1;
      for (/* cond: (local_18 < 3) */); local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
        if ((((s16((DAT_0064caa8 + (local_18 * 2 + param_1 * 0x594)), 0)) << 16 >> 16) < s32(DAT_00634f64, local_18 * 3))) {
          bVar2 = 0;
        }
      }
      iVar3 = FUN_004a7577(param_1);
      if ((0x27 < DAT_006ad0ec)) {
        if (bVar2) {
          FUN_005973fd(param_1);
        }
        else {
          local_c = 0;
          for (/* cond: (local_20 < 8) */); local_20 = (local_20 < 8); local_20 = (local_20 + 1)) {
            if ((iVar3 !== 0)) {
              if ((local_c === 0)) {
                local_c = local_20;
              }
              else if ((s16((DAT_0064caa2 + local_20 * 0x594), 0) < s16((DAT_0064caa2 + local_c * 0x594), 0))) {
                local_c = local_20;
              }
            }
          }
          if ((3 < DAT_00655b08)) {
            for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
              if ((s16((DAT_0064caa2 + local_14 * 0x594), 0) < None)) {
                return local_18;
              }
            }
          }
          if ((local_c === 0)) {
            bVar2 = (0x4b < DAT_006ad0ec);
            if ((!bVar2)) {
              for (/* cond: (local_20 < 8) */); local_20 = (local_20 < 8); local_20 = (local_20 + 1)) {
                if ((((1 << (((local_20) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                  if ((DAT_00655c22[param_1] < DAT_00655c22[local_20])) {
                    bVar2 = 1;
                    break;
                  }
                  iVar3 = FUN_004a75a6(local_20);
                  if ((0x3e7 < s32((DAT_0064c6a2 + local_20 * 0x594), 0))) {
                    bVar2 = 1;
                    break;
                  }
                }
              }
            }
            if (bVar2) {
              FUN_005973fd(param_1);
            }
          }
          else if ((s16((DAT_0064caa2 + param_1 * 0x594), 0) < s16((DAT_0064caa2 + local_c * 0x594), 0))) {
            FUN_005973fd(param_1);
          }
        }
      }
    }
  }
  return local_18;
}


 export function FUN_00598a05 (param_1, param_2)

 {
  if ((param_2 === 0x23)) {
    if ((DAT_00634f64 <= ((s16((DAT_0064caa8 + param_1 * 0x594), 0)) << 16 >> 16))) {
      return 1;
    }
  }
  else if ((param_2 === 0x24)) {
    if ((DAT_00634f7c <= ((s16((DAT_0064caac + param_1 * 0x594), 0)) << 16 >> 16))) {
      return 1;
    }
  }
  else if ((DAT_00634fa0 <= ((s16((DAT_0064cab2 + param_1 * 0x594), 0)) << 16 >> 16))) {
    return 1;
  }
  return 0;
}


 export function FUN_00598b4e ()

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let uVar5;
  let local_30c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00598cd3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0040ffa0(s_SPACESHIPS_00635024, 1);
  bVar1 = 0;
  for (/* cond: (local_30c < 8) */); local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
    iVar2 = FUN_004a75a6(local_30c);
    if ((iVar2 !== 0)) {
      uVar5 = 0;
      iVar2 = local_30c;
      uVar3 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar3, iVar2, uVar5);
      bVar1 = 1;
    }
  }
  if ((!bVar1)) {
    FUN_00421ea0(s_NOSPACESHIPS_00635030);
    local_8 = -1;
    FUN_00598cc7();
    FUN_00598cdd();
    return;
  }
  iVar2 = FUN_0040bc80(0);
  if ((iVar2 < 0)) {
    local_8 = -1;
    FUN_00598cc7();
    FUN_00598cdd();
    return;
  }
  FUN_004d01ae(iVar2);
  iVar4 = FUN_004d0208(iVar2);
  if ((iVar4 === 0)) {
    local_30c = ((iVar2) & 0xFF);
    FUN_0059772c(iVar2, (u8(DAT_00655b0b) & (1 << (((iVar2) & 0xFF) & 0x1f))));
  }
  local_8 = -1;
  FUN_00598cc7();
  FUN_00598cdd();
  return;
}


 export function FUN_00598cc7 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00598cdd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00598ceb ()

 {
  let uVar1;

  if (((DAT_00655ae8 & 0x80) === 0)) {
    if (((DAT_00655b0b & DAT_00655bce) === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_00598d45 (param_1)

 {
  let iVar1;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = FUN_00598ceb();
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((iVar1 !== 0)) {
        return 1;
      }
    }
    local_18 = 0;
    for (/* cond: (local_10 < 6) */); local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
      iVar1 = FUN_005adfa0(((local_10 + 1) / 2 | 0), 0, 2);
      local_18 = (local_18 + ((s16((DAT_0064caa8 + (param_1 * 0x594 + local_10 * 2)), 0)) << 16 >> 16) * u8(DAT_0064c5a4[iVar1 * 8]));
    }
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((local_8 !== param_1)) {
        local_c = 0;
        for (/* cond: (local_10 < 6) */); local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
          iVar1 = FUN_005adfa0(((local_10 + 1) / 2 | 0), 0, 2);
          local_c = (local_c + ((s16((DAT_0064caa8 + (local_8 * 0x594 + local_10 * 2)), 0)) << 16 >> 16) * u8(DAT_0064c5a4[iVar1 * 8]));
        }
        if ((local_18 <= local_c)) {
          return 1;
        }
      }
    }
  }
  return 0;
}


 export function FUN_005998b0 (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  iVar1 = FUN_00596ced(param_2);
  iVar2 = FUN_00596d3c(param_1, param_2);
  return (iVar1 <= iVar2);
}


 export function FUN_00599910 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005999c0(param_1, param_2);
  if ((iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


 export function FUN_005999c0 (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  iVar1 = FUN_00596d3c(param_1, param_2);
  iVar2 = FUN_00596c61(param_1, param_2);
  return (iVar2 <= iVar1);
}


 export function FUN_00599a20 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0x97c), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0x97c), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  for (/* cond: (local_8 < s32((in_ECX + 0x97c), 0)) */); local_8 = (local_8 < s32((in_ECX + 0x97c), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0xa1c) + local_8 * 4), 0));
  }
  FUN_0040fd40(0, (s32((in_ECX + 0x1b34), 0) / 9 | 0));
  FUN_0040fcf0((s32((in_ECX + 0x1f3c), 0) / 9 | 0));
  if ((s32((in_ECX + 0x1b34), 0) < 1)) {
    w32((in_ECX + 0x1f3c), 0, -1);
  }
  FUN_00451bf0();
  FUN_004923c0();
  FUN_004518d0();
  FUN_004f6646();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x00599e9a)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x00599fc4)  */ */ export function FUN_00599b8d (in_ECX)

 {
  let iVar1;
  let extraout_EAX;
  let sVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_98;
  let local_88;
  let local_78;
  let local_68;
  let local_64;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  local_34 = 0;
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_8 = DAT_0067a798;
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_3c = FUN_00407f90((in_ECX + 0x5f8));
  local_1c = FUN_0040ef70();
  local_48 = (s32((in_ECX + 0x5fc), 0) + 8);
  local_38 = ((local_3c / 2 | 0) + -100);
  local_68 = s32(((in_ECX + 0xa1c) + s32((in_ECX + 0x120), 0) * 4), 0);
  FUN_005cda06(DAT_ffffffb4, DAT_ffffffbc);
  FUN_005cd775(2, 1);
  local_50 = FUN_00451830();
  local_50 = (local_50 + DAT_0062d858 * 2);
  FUN_005cef31(DAT_ffffff88, DAT_006a6668, local_40, local_48);
  FUN_005cd775(local_4c, local_44);
  FUN_005c19ad(DAT_00635a1c);
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  iVar1 = FUN_004bb540();
  local_48 = (local_48 + (iVar1 * 2 + 5));
  FUN_0040bbb0();
  FUN_0040bc10(0x79);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_40 = (local_40 + (iVar1 + 5));
  FUN_0040bbb0();
  if ((DAT_0064c48e[local_68 * 8] < 0)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  }
  else {
    FUN_0040ff00(s32((DAT_00627684 + s8(DAT_0064c48e[local_68 * 8]) * 0x10), 0));
    local_20 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_ffffffd0, local_40, local_48, ((local_40 + local_20) + 5), (local_48 + extraout_EAX));
    FUN_00452c14(s8(DAT_0064c48e[local_68 * 8]), local_40, local_48, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
  }
  local_38 = local_40;
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c);
  FUN_0040bbb0();
  FUN_0040bc10(0x84);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_0063506c, u8(DAT_0064c48c[local_68 * 8]) * 0xa);
  FUN_005c0f57(local_8, DAT_00679640, local_38, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_40 = ((local_38 + iVar1) + 3);
  iVar3 = (local_48 + (local_1c / 2 | 0));
  iVar1 = FUN_00451860();
  FUN_005cef31(DAT_ffffff78, DAT_006a6668, local_40, (iVar3 - (iVar1 / 2 | 0)));
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c);
  FUN_0040bbb0();
  FUN_0040bc10(0x9e);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00635070, u8(DAT_0064c48d[local_68 * 8]));
  FUN_005c0f57(local_8, DAT_00679640, local_38, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_40 = ((local_38 + iVar1) + 3);
  iVar3 = (local_48 + (local_1c / 2 | 0));
  iVar1 = FUN_00451860();
  FUN_005cef31(DAT_ffffff68, DAT_006a6668, local_40, (iVar3 - (iVar1 / 2 | 0)));
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c * 2);
  FUN_0059a15d(local_68);
  sVar2 = _strlen(DAT_00679640);
  if ((sVar2 !== 0)) {
    iVar1 = s32((in_ECX + 0x604), 0);
    iVar3 = FUN_00407f90((in_ECX + 0x5f8));
    FUN_006e7d90(DAT_ffffff9c, local_40, local_48, ((iVar3 + -10) + local_40), iVar1);
    FUN_005c1167(local_8, DAT_00679640, DAT_ffffff9c, 5);
  }
  FUN_00452768(s32((in_ECX + 0x120), 0));
  FUN_005c0073(DAT_ffffffe8);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_0059a15d ()

 {
  let iVar1;
  let _Str;
  let sVar2;
  let local_1124;
  let local_124;
  let local_24;
  let uStackY_1c;
  let pcStackY_18;

  FUN_005f35f0();
  pcStackY_18 = 0x59a17f;
  FUN_004aef20();
  pcStackY_18 = DAT_ffffffdc;
  uStackY_1c = 0x59a190;
  FUN_005f22d0();
  pcStackY_18 = DAT_ffffffdc;
  uStackY_1c = 0x59a1a0;
  FUN_004af1d5();
  pcStackY_18 = s_PEDIA_00635084;
  uStackY_1c = 0x59a1b1;
  iVar1 = FUN_004a2379();
  if ((iVar1 === 0)) {
    FUN_0040bbb0();
    while ((_MEM[_Str] === 0x40)) {
      pcStackY_18 = 0x59a1c8;
      _Str = FUN_004a23fc();
      if ((_MEM[_Str] === 0x40)) {
        pcStackY_18 = 0x59a210;
        sVar2 = _strlen(_Str);
        if ((sVar2 !== 0)) {
          while ((_MEM[_Str] === 0x2a)) {
            pcStackY_18 = DAT_fffffedc;
            uStackY_1c = 0x59a253;
            FUN_005f22d0();
            uStackY_1c = 0x59a269;
            pcStackY_18 = _Str;
            FUN_005f22d0();
          }
          pcStackY_18 = 0x59a27d;
          FUN_004d007e();
          pcStackY_18 = 0x59a28c;
          sVar2 = _strlen(DAT_ffffeedc);
          if ((sVar2 !== 0)) {
            pcStackY_18 = DAT_ffffeedc;
            uStackY_1c = 0x59a2a8;
            FUN_005f22e0();
          }
          pcStackY_18 = DAT_ffffeedc;
          uStackY_1c = 0x59a2be;
          FUN_005f22e0();
        }
      }
    }
  }
  pcStackY_18 = DAT_00679640;
  uStackY_1c = 0x59a2d7;
  FUN_005f22d0();
  return;
}


 export function FUN_0059a2e6 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_006ad908 === 0)) {
    if ((param_1 < 0x27)) {
      for (/* cond: (s32(((in_ECX + 0xa1c) + local_8 * 4), 0) !== param_1) */);
          (local_8 = (local_8 < s32((in_ECX + 0x97c), 0)) && (in_ECX = (in_ECX + 0xa1c))
          ); local_8 = (local_8 + 1)) {
      }
      if ((s32((in_ECX + 0x97c), 0) !== local_8)) {
        FUN_004f7bd1(2, 0);
        w32((in_ECX + 0x120), 0, local_8);
        w32((in_ECX + 0x1f38), 0, local_8);
        w32((in_ECX + 0x124), 0, 1);
        w32((in_ECX + 0x11c), 0, 1);
        FUN_004f4793();
        FUN_00451bf0();
        uVar1 = FUN_004f8a9b(DAT_006a7d48, local_8);
        FUN_005f22d0((in_ECX + 0x618), uVar1);
        FUN_004f6244();
        FUN_00599b8d();
        FUN_004085f0();
        FUN_00408460();
        FUN_004518d0();
        DAT_006a66b0 = DAT_006a66b0;
        FUN_005c61b0();
        DAT_006a66b0 = DAT_006a66b0;
      }
    }
    else {
      FUN_00526913(param_1);
    }
  }
  return;
}


 export function FUN_0059a6f0 (param_1)

 {
  let iVar1;

  iVar1 = DAT_00635094;
  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    DAT_00635094 = param_1;
  }
  return iVar1;
}


 export function FUN_0059a733 ()

 {
  DAT_00635094 = (DAT_00635094 * 0x19660d + 0x3c6ef35f);
  return ((DAT_00635094 * 0x19660d + 0x3c6ef35f) / 0xffffffff);
}


 export function FUN_0059a791 (param_1, param_2)

 {
  let iVar1;

  if ((param_2 === param_1)) {
    FUN_0059a733();
  }
  else {
    if ((param_2 < param_1)) {
      param_1 = param_2;
    }
    FUN_0059a733();
    iVar1 = __ftol();
    param_1 = (iVar1 + param_1);
  }
  return param_1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_0059a86a();
  FUN_0059a884();
  return;
}


 export function FUN_0059a86a ()

 {
  FUN_0059a8bb();
  return;
}


 export function FUN_0059a884 ()

 {
  _atexit(FUN_0059a8a1);
  return;
}


 export function FUN_0059a8a1 ()

 {
  FUN_0059ad40();
  return;
}


 export function FUN_0059a8bb (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0059a97f;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059d080();
  FUN_00514220();
  local_8 = 0;
  w32((in_ECX + 0x534), 0, 0);
  XD_SetBroadcastReceive(LAB_00403c29);
  XD_SetSecureReceive(FUN_0059bc41);
  XD_SetOnClientConnectionToServer(FUN_0059bfdb);
  XD_SetNewClientConnection(FUN_0059bfb5);
  XD_SetOnConnectionLost(FUN_0059c04b);
  XD_SetOversizedMessageCB(0xc350, FUN_0059c0a4);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0059a998 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  _MEM[(in_ECX + 0x7b)] = 0;
  _MEM[(in_ECX + 0x1ed)] = 0;
  w32(in_ECX, 0x15d, 0);
  _MEM[(in_ECX + 0x1ee)] = 0;
  w32(in_ECX, 0x14e, 0);
  w32(in_ECX, 0x5833, 0);
  w32(in_ECX, 0, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 0x15c, 0);
  w32(in_ECX, 0x7e, -1);
  DAT_006c8fbc = 0;
  w32(in_ECX, 0x7d, 0);
  DAT_006c9288 = -1;
  w32(in_ECX, 0x7c, -1);
  w32(in_ECX, 0x11c, 0);
  _MEM[(in_ECX + 0x57d)] = 0;
  w32(in_ECX, 0x160, 0);
  w32(in_ECX, 0x161, 0);
  w32(in_ECX, 0x162, 0);
  w32(in_ECX, 0x163, 0);
  _MEM[(in_ECX + 0x164)] = 0;
  _MEM[(in_ECX + 0x15f)] = 0;
  _MEM[(in_ECX + 0x591)] = 0;
  _MEM[(in_ECX + 0x592)] = 0;
  w32(in_ECX, 0x165, 8);
  w32(in_ECX, 0x166, 0);
  w32(in_ECX, 0x1ec, 0x3c);
  w32(in_ECX, 0x167, -1);
  w32(in_ECX, 0x168, -1);
  w32(in_ECX, 0x1ed, 0);
  w32(in_ECX, 0x1ee, 0);
  w32(in_ECX, 0x1ef, 0);
  w32(in_ECX, 0x1f0, 0);
  w32(in_ECX, 0x1f1, 0);
  w32(in_ECX, 0x1f2, 0);
  w32(in_ECX, 0x1f3, 0);
  w32(in_ECX, 0x1f4, 0);
  w32(in_ECX, 0x1f5, 0);
  w32(in_ECX, 0x1f6, 0);
  w32(in_ECX, 0x1f7, 0);
  w32(in_ECX, 0x1f8, 0);
  w32(in_ECX, 0x1f9, 0);
  w32(in_ECX, 0x1fa, 0);
  w32(in_ECX, 0x1fb, 0);
  w32(in_ECX, 0x200, 0);
  w32(in_ECX, 0x201, 0);
  w32(in_ECX, 0x202, 0);
  w32(in_ECX, 0x203, 0);
  w32(in_ECX, 0x204, 0);
  w32(in_ECX, 0x205, 0);
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    w32(in_ECX, (local_8 + 0x846), 0);
    w32(in_ECX, (local_8 + 0x84e), 0);
    w32(in_ECX, (local_8 + 0x856), 0);
    w32(in_ECX, (local_8 + 0x85e), 0);
  }
  _MEM[(in_ECX + 0x160a1)] = 0;
  w32(in_ECX, 0x1fc, 0);
  w32(in_ECX, 0x1fd, 0);
  w32(in_ECX, 0x1fe, 0);
  w32(in_ECX, 0x1ff, 0);
  DAT_00626a2c = 0;
  _MEM[(in_ECX + 0x5828)] = 0;
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    w32(in_ECX, (local_8 + 0x14f), 0);
    w32(in_ECX, (local_8 + 0x5818), 0);
    w32(in_ECX, (local_8 + 0x5820), 0);
  }
  w32(in_ECX, 0x5829, 0);
  _MEM[(in_ECX + 0x5832)] = 0;
  FUN_0059b293(1);
  FUN_0059c2b8();
  return;
}


 export function FUN_0059ad40 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0059add7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x534), 0) !== 0)) {
    operator_delete(s32((in_ECX + 0x534), 0));
    w32((in_ECX + 0x534), 0, 0);
  }
  FUN_0059b293(1);
  FUN_0059c2b8();
  local_8 = -1;
  FUN_0059adc8();
  FUN_0059ade1();
  return;
}


 export function FUN_0059adc8 ()

 {
  FUN_00514254();
  return;
}


 export function FUN_0059ade1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0059adef (in_ECX, param_1, param_2)

 {
  let uVar1;
  let UVar2;
  let uVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_c;

  if ((_MEM[(in_ECX + 0x1ec)] !== 0)) {
    FUN_005dae6b(7, s_!bConnectedToNet_006350bc, s_D:\Ss\Franklinton\NetMgr.cpp_0063509c, 0x92);
  }
  uVar1 = DAT_006ad2f8;
  FUN_00514272();
  FUN_0059a998();
  _memset((in_ECX + 0x200), 0, 0x270);
  /* switch */ () {
  case 0 :
    local_c = XD_InitializeSocketsTCP(3, 0x1381, 0x1382, s8(param_2), 7, 0);
    DAT_00655b02 = 3;
    if ((s32((in_ECX + 0x1e8), 0) === 0)) {
      UVar2 = FUN_006e7b34(s_Civilization_Gold_006350ec, s_INTERNET_Timeout_006350d8, -1, s_CIV.INI_006350d0);
      if ((UVar2 < 0x3c)) {
        FUN_006e7b38(s_Civilization_Gold_00635120, s_INTERNET_Timeout_0063510c, DAT_00635108, s_CIV.INI_00635100);
        w32((in_ECX + 0x7b0), 0, 0x3c);
      }
      else {
        w32((in_ECX + 0x7b0), 0, UVar2);
      }
    }
    else {
      UVar2 = FUN_006e7b34(s_Civilization_Gold_0063514c, s_TCPIP_Timeout_0063513c, -1, s_CIV.INI_00635134);
      if ((UVar2 < 0xf)) {
        FUN_006e7b38(s_Civilization_Gold_0063517c, s_TCPIP_Timeout_0063516c, DAT_00635168, s_CIV.INI_00635160);
        w32((in_ECX + 0x7b0), 0, 0xf);
      }
      else {
        w32((in_ECX + 0x7b0), 0, UVar2);
      }
    }
    break;
  case 1 :
    local_c = XD_InitializeSocketsIPXSPX(3, 0x1381, 0x1382, s8(param_2), 7, 0);
    DAT_00655b02 = 3;
    UVar2 = FUN_006e7b34(s_Civilization_Gold_006351a8, s_IPXSPX_Timeout_00635198, -1, s_CIV.INI_00635190)
    ;
    if ((UVar2 < 0xf)) {
      FUN_006e7b38(s_Civilization_Gold_006351d8, s_IPXSPX_Timeout_006351c8, DAT_006351c4, s_CIV.INI_006351bc);
      w32((in_ECX + 0x7b0), 0, 0xf);
    }
    else {
      w32((in_ECX + 0x7b0), 0, UVar2);
    }
    break;
  case 2 :
    DAT_00655b02 = 5;
    UVar2 = FUN_006e7b34(s_Civilization_Gold_00635204, s_MODEM_Timeout_006351f4, -1, s_CIV.INI_006351ec);
    if ((UVar2 < 0x1e)) {
      FUN_006e7b38(s_Civilization_Gold_00635234, s_MODEM_Timeout_00635224, DAT_00635220, s_CIV.INI_00635218);
      w32((in_ECX + 0x7b0), 0, 0x1e);
    }
    else {
      w32((in_ECX + 0x7b0), 0, UVar2);
    }
    local_c = XD_InitializeModem(s8(param_2));
    break;
  case 3 :
    DAT_00655b02 = 6;
    UVar2 = FUN_006e7b34(s_Civilization_Gold_00635260, s_DIRECT_Timeout_00635250, -1, s_CIV.INI_00635248)
    ;
    if ((UVar2 < 0x1e)) {
      FUN_006e7b38(s_Civilization_Gold_00635290, s_DIRECT_Timeout_00635280, DAT_0063527c, s_CIV.INI_00635274);
      w32((in_ECX + 0x7b0), 0, 0x1e);
    }
    else {
      w32((in_ECX + 0x7b0), 0, UVar2);
    }
    local_c = XD_InitializeSerial(s8(param_2));
    break;
  default :
    FUN_005dae6b(7, DAT_006352c4, s_D:\Ss\Franklinton\NetMgr.cpp_006352a4, 0xf4);
  }
  if ((local_c === 0)) {
    if ((iVar4 === 0)) {
      _MEM[(in_ECX + 0x1ef)] = param_2;
      _MEM[(in_ECX + 0x1ec)] = 1;
      DAT_006c9288 = param_1;
      w32((in_ECX + 0x1f0), 0, param_1);
      FUN_0059c2b8();
      FUN_0059c276();
      _memset((in_ECX + 0x208), 0, 0x20);
      _strncpy((in_ECX + 0x208), DAT_006665b0, 0x20);
      _memset((in_ECX + 0x228), 0, 0x20);
      _strncpy((in_ECX + 0x228), DAT_00666570, 0x20);
      w32((in_ECX + 0x200), 0, 1);
      _MEM[(in_ECX + 0x251)] = 1;
      _MEM[(in_ECX + 0x250)] = _MEM[(in_ECX + 0x1ef)];
      uVar3 = 1;
    }
    else {
      FUN_005d2279(s_ConnectToNet:_XD_ActivateServer_F_00635300, iVar4);
      uVar3 = 0;
      DAT_006ad2f8 = uVar1;
    }
  }
  else {
    FUN_005d2279(s_ConnectToNet:_XD_Initialize????_F_006352c8, local_c);
    uVar3 = 0;
    DAT_006ad2f8 = uVar1;
  }
  return uVar3;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0059b3ca)  */ */ export function FUN_0059b293 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d225b(s_Disconnecting_from_network:_00635338);
  if ((_MEM[(in_ECX + 0x1ef)] !== 0)) {
    param_1 = 0;
  }
  if ((_MEM[(in_ECX + 0x1ec)] === 0)) {
    XD_ResetLibrary();
    FUN_005d225b(s_XD_ResetLibrary();_0063553c);
  }
  else {
    FUN_0059baf0();
    if ((_MEM[(in_ECX + 0x1ed)] !== 0)) {
      XD_FlushSendBuffer(0xea60);
      FUN_005d225b(s_Send_buffer_has_flushed._00635354);
      FUN_00514272();
      FUN_00511acf();
      XD_CloseConnection();
      FUN_00514272();
      FUN_00511acf();
      FUN_005d225b(s_XD_CloseConnection();_00635370);
      FUN_0059b55b();
    }
    /* switch */ (s32((in_ECX + 0x1f0), 0) ( *) ((in_ECX + 0x1f0)  )) {
    case 0 :
      XD_ShutdownSockets();
      FUN_005d225b(s_XD_ShutdownSockets();_0063538c);
      break;
    case 1 :
      XD_ShutdownSockets();
      FUN_005d225b(s_XD_ShutdownSockets();_006353a8);
      break;
    case 2 :
      XD_ShutdownModem();
      FUN_005d225b(s_XD_ShutdownModem();_006353c4);
      break;
    case 3 :
      XD_ShutdownTEN();
      FUN_005d225b(s_XD_ShutdownTEN();_006353dc);
    }
    FUN_00514272();
    FUN_00511acf();
    if ((0 < s32((in_ECX + 0x584), 0))) {
      FUN_005d2279(s_Maximum_gNetMgr.Poll()_call_dept_00635468, s32((in_ECX + 0x584), 0));
    }
    if ((0 < s32((in_ECX + 0x58c), 0))) {
      FUN_005d2279(s_Maximum_Alpha_message_queue_load_00635494, s32((in_ECX + 0x58c), 0));
    }
    if ((0 < s32((in_ECX + 0x588), 0))) {
      FUN_005d2279(s_Maximum_message_queue_load:_%d_006354bc, s32((in_ECX + 0x588), 0));
    }
    if ((s32((in_ECX + 0x814), 0) !== 0)) {
      FUN_005d2279(s_Maximum_draw_stack_load:_%d_006354e0, s32((in_ECX + 0x814), 0));
    }
    XD_ResetLibrary();
    FUN_005d225b(s_XD_ResetLibrary();_00635500);
    if ((param_1 !== 0)) {
      FUN_005d225b(s_Disconnection_delay:_2_seconds._00635518);
      FUN_0046e287(0x78);
    }
  }
  _MEM[(in_ECX + 0x1ec)] = 0;
  _MEM[(in_ECX + 0x1ed)] = 0;
  _MEM[(in_ECX + 0x1ee)] = 0;
  w32((in_ECX + 0x1f8), 0, -1);
  FUN_0059c2b8();
  FUN_00514272();
  FUN_00511acf();
  return;
}


 export function FUN_0059b55b ()

 {
  return;
}


 export function FUN_0059b571 (in_ECX, param_1)

 {
  let iVar1;
  let _Dst;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  if ((_MEM[(in_ECX + 0x1ee)] !== 0)) {
    local_c = s32((in_ECX + 0x160cc), 0);
    local_8 = 0;
    for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x20), 0)) {
      iVar1 = _strncmp(local_c, (param_1 + 0x74), 0x20);
      if ((iVar1 === 0)) {
        if ((s32((in_ECX + 0x160cc), 0) === local_c)) {
          w32((in_ECX + 0x160cc), 0, s32((local_c + 0x20), 0));
        }
        if ((s32((local_c + 0x24), 0) !== 0)) {
          w32((s32((local_c + 0x24), 0) + 0x20), 0, s32((local_c + 0x20), 0));
        }
        if ((s32((local_c + 0x20), 0) !== 0)) {
          w32((s32((local_c + 0x20), 0) + 0x24), 0, s32((local_c + 0x24), 0));
        }
        local_8 = s32((local_c + 0x2c), 0);
        operator_delete(local_c);
        break;
      }
    }
    local_c = s32((in_ECX + 0x160cc), 0);
    local_10 = 0;
    while ((0 < iVar1)) {
      local_10 = local_c;
      local_c = s32((local_c + 0x20), 0);
    }
    while ((0 < iVar1)) {
      local_10 = local_c;
      local_c = s32((local_c + 0x20), 0);
    }
    _Dst = operator_new(0x124);
    if ((_Dst === 0)) {
      FUN_005dae6b(7, s_pCur_!=_NULL_00635574, s_D:\Ss\Franklinton\NetMgr.cpp_00635554, 0x1cf);
    }
    FID_conflict:_memcpy(_Dst, (param_1 + 0x74), 0x124);
    if ((local_10 === 0)) {
      w32((_Dst + 0x20), 0, s32((in_ECX + 0x160cc), 0));
      w32((_Dst + 0x24), 0, 0);
      if ((s32((in_ECX + 0x160cc), 0) !== 0)) {
        w32((s32((in_ECX + 0x160cc), 0) + 0x24), 0, _Dst);
      }
      w32((in_ECX + 0x160cc), 0, _Dst);
    }
    else {
      w32((_Dst + 0x20), 0, s32((local_10 + 0x20), 0));
      w32((_Dst + 0x24), 0, local_10);
      w32((local_10 + 0x20), 0, _Dst);
      if ((s32((_Dst + 0x20), 0) !== 0)) {
        w32((s32((_Dst + 0x20), 0) + 0x24), 0, _Dst);
      }
    }
    uVar2 = FUN_00421bb0();
    w32((_Dst + 0x28), 0, uVar2);
    w32((_Dst + 0x2c), 0, local_8);
  }
  return;
}


 export function FUN_0059b7fc (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = 0;
  while ((_MEM[((in_ECX + 0x251) + local_8 * 0x54)] === 0)) {
    if ((6 < local_8)) {
      return;
    }
    if ((_MEM[((in_ECX + 0x251) + local_8 * 0x54)] === 0));
  }
  w32(((in_ECX + 0x204) + local_8 * 0x54), 0, s32((param_1 + 0x10), 0));
  _memset(((local_8 * 0x54 + in_ECX) + 0x208), 0, 0x20);
  _strncpy(((local_8 * 0x54 + in_ECX) + 0x208), (param_1 + 0x14), 0x20);
  _MEM[((in_ECX + 0x250) + local_8 * 0x54)] = 0;
  _MEM[((in_ECX + 0x251) + local_8 * 0x54)] = 1;
  w32(((in_ECX + 0x254) + local_8 * 0x54), 0, -1);
  FUN_005f22d0(((local_8 * 0x54 + in_ECX) + 0x228), (param_1 + 0x34));
  w32(((in_ECX + 0x248) + local_8 * 0x54), 0, 0);
  w32(((in_ECX + 0x24c) + local_8 * 0x54), 0, 0);
  w32((in_ECX + 0x200), 0, (s32((in_ECX + 0x200), 0) + 1));
  w32((in_ECX + 0x55c), 0, (s32((in_ECX + 0x55c), 0) + -1));
  return;
}


 export function FUN_0059b96a (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (s32(((in_ECX + 0x204) + local_8 * 0x54), 0) !== param_1) */); (local_8 = (local_8 < 7) && (in_ECX = (in_ECX + 0x204)));
      local_8 = (local_8 + 1)) {
  }
  if ((_MEM[((in_ECX + 0x251) + local_8 * 0x54)] !== 0)) {
    if ((s32(((in_ECX + 0x254) + local_8 * 0x54), 0) < 8)) {
      DAT_00655b0b = ((~(((1 << (_MEM[((in_ECX + 0x254) + local_8 * 0x54)] & 0x1f))) & 0xFF)) & DAT_00655b0b);
    }
    w32(((in_ECX + 0x204) + local_8 * 0x54), 0, 0);
    _MEM[((in_ECX + 0x208) + local_8 * 0x54)] = 0;
    _MEM[((in_ECX + 0x250) + local_8 * 0x54)] = 0;
    _MEM[((in_ECX + 0x251) + local_8 * 0x54)] = 0;
    w32(((in_ECX + 0x450) + s32(((in_ECX + 0x254) + local_8 * 0x54), 0) * 4), 0, -1);
    w32(((in_ECX + 0x254) + local_8 * 0x54), 0, -1);
    w32((in_ECX + 0x200), 0, (s32((in_ECX + 0x200), 0) + -1));
  }
  return;
}


 export function FUN_0059baf0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  while ((s32((in_ECX + 0x160cc), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x160cc), 0) + 0x20), 0);
    operator_delete(s32((in_ECX + 0x160cc), 0));
    w32((in_ECX + 0x160cc), 0, uVar1);
  }
  return;
}


 export function FUN_0059bb54 (param_1, param_2)

 {
  let iVar1;

  if ((param_2 < 0x10)) {
    FUN_005d225b(s_BroadcastReceiveFunc:_Killed_Mes_00635584);
  }
  else if ((s32(param_1, 0) === 0x66606660)) {
    if ((iVar1 !== 0)) {
      FUN_0051438f(0, param_1, param_2);
    }
  }
  else {
    FUN_005d225b(s_BroadcastReceiveFunc:_Killed_Mes_006355cc);
  }
  return;
}


 export function FUN_0059bc41 (param_1, param_2, param_3)

 {
  let sVar1;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_6b;
  let local_6a;
  let local_4c;
  let local_c;
  let local_8;

  if ((3 < param_3)) {
    if ((s32(param_2, 0) === 0x66606660)) {
      FUN_0051438f(param_1, param_2, param_3);
      DAT_006c8fb0 = param_3;
      DAT_006c9284 = DAT_00628468;
      local_8 = param_2;
      DAT_006c8fb8 = s32(param_2, 2);
      DAT_00635098 = s32(param_2, 1);
    }
    else {
      FUN_005d225b(s_SecureReceiveFunc:_Killed_Messag_00635608);
      if ((-1 < DAT_00635098)) {
        __ultoa(DAT_006c8fb0, DAT_ffffff94, 0xa);
        FUN_005d237d(s_Last_Callback_Size:_%s_00635640, DAT_ffffff94);
        __itoa(DAT_006c9284, DAT_ffffff94, 0xa);
        FUN_005d237d(s_Last_legal_sequence_number:_%s_00635658, DAT_ffffff94);
        __itoa(DAT_00635098, DAT_ffffff94, 0xa);
        FUN_005d237d(s_Last_legal_type:_%s_00635678, DAT_ffffff94);
        __ultoa(DAT_006c8fb8, DAT_ffffff94, 0xa);
        FUN_005d237d(s_Last_Legal_NetMsg_Size:_%s_0063568c, DAT_ffffff94);
      }
      __itoa(DAT_00628468, DAT_ffffff94, 0xa);
      FUN_005d237d(s_Sequence_Number:_%s_006356a8, DAT_ffffff94);
      __ultoa(param_3, DAT_ffffff94, 0xa);
      FUN_005d237d(s_Message_Size:_%s_006356bc, DAT_ffffff94);
      for (/* cond: (local_70 <= param_3) */); (local_70 = (local_70 < 0x20) && (local_4c = 0, local_70 = (local_70 <= param_3)));
          local_70 = (local_70 + 8)) {
        for (/* cond: (local_74 < param_3) */); (local_74 = (local_74 < (local_70 + 8)) && (local_74 = (local_74 < param_3)));
            local_74 = (local_74 + 1)) {
          local_c = u8(_MEM[(local_74 + param_2)]);
          __itoa(local_c, DAT_ffffff94, 0x10);
          sVar1 = _strlen(DAT_ffffff94);
          if ((sVar1 === 1)) {
            local_6b = local_6c;
            local_6a = 0;
            local_6c = 0x30;
          }
          FUN_005f22e0(DAT_ffffffb4, DAT_ffffff94);
          FUN_005f22e0(DAT_ffffffb4, DAT_006356d0);
        }
        FUN_005d237d(DAT_006356d4, DAT_ffffffb4);
      }
      FUN_005d225b(DAT_006356d8);
      DAT_00635098 = -1;
      local_78 = param_2;
      for (/* cond: (local_70 < 0x20) */); local_70 = (local_70 < 0x20); local_70 = (local_70 + 1)) {
        if ((s32(local_78, 0) === 0x66606660)) {
          local_8 = local_78;
          FUN_005d225b(s_Potential_Offset_Message_Found:_006356dc);
          __itoa(local_70, DAT_ffffff94, 0xa);
          FUN_005d237d(s_Offset:_%s_bytes_006356fc, DAT_ffffff94);
          FUN_005d237d(s_Type:_%s_0063571c, (s_NM_DATAGRAM_00628470 + s32(local_8, 1) * 0x20));
          __ultoa(s32(local_8, 2), DAT_ffffff94, 0xa);
          FUN_005d237d(s_Size:_%s_bytes_00635738, DAT_ffffff94);
          __ultoa(s32(local_8, 3), DAT_ffffff94, 0xa);
          FUN_005d237d(s_Sequence_Number:_%s_00635758, DAT_ffffff94);
          break;
        }
        local_78 = (local_78 + 1);
      }
    }
  }
  if ((DAT_00633a84 !== 0)) {
    FUN_0055b59e();
  }
  return;
}


 export function FUN_0059bfb5 (param_1, param_2)

 {
  FUN_005d2279(s_NewClientReceiveFunc:_New_client_00635774, param_2);
  return;
}


 export function FUN_0059bfdb (param_1)

 {
  FUN_005d2279(s_ConnectedToServerFunc:_New_serve_006357a8, ((param_1) << 16 >> 16));
  if ((param_1 < 8)) {
    DAT_006ad300 = ((param_1) << 16 >> 16);
    DAT_006ad2f5 = 1;
    FUN_0046b14d(0x2f, 0, ((param_1) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}


 export function FUN_0059c04b (param_1)

 {
  FUN_005d2279(s_LostConnectionFunc:_Connection_t_006357e0, param_1);
  DAT_006c8fb4 = (DAT_006c8fb4 + 1);
  if ((param_1 < 7)) {
    w32((DAT_006c8fc0 + ((param_1) & 0xFFFF) * 4), 0, (s32((DAT_006c8fc0 + ((param_1) & 0xFFFF) * 4), 0) + 1));
  }
  return;
}


 export function FUN_0059c0a4 (param_1)

 {
  let local_104;

  _sprintf(DAT_fffffefc, s_Oversized_XDaemon_message!_%ul_00635814, param_1);
  FUN_005d225b(DAT_fffffefc);
  return;
}


 export function FUN_0059c0e1 (param_1, param_2)

 {
  let in_stack_00000024;
  let local_1c;
  let local_18;
  let local_10;
  let local_8;

  FUN_0046d5a0(param_1);
  if ((in_stack_00000024 === 0)) {
    if ((param_2 === 0)) {
      local_8 = 0;
      local_1c = operator_new(0x2c);
    }
    else {
      local_8 = __msize(param_2);
      local_1c = FID_conflict:__expand(param_2, (local_8 + 0x2c));
      FID_conflict:_memcpy((local_1c + 0x2c), local_1c, local_8);
    }
  }
  else {
    local_8 = in_stack_00000024;
    local_1c = operator_new((in_stack_00000024 + 0x2c));
    FID_conflict:_memcpy((local_1c + 0x2c), param_2, local_8);
  }
  local_10 = (local_8 + 0x2c);
  FID_conflict:_memcpy(local_1c, DAT_ffffffe8, 0x10);
  FID_conflict:_memcpy((local_1c + 0x10), DAT_0000000c, 4);
  FID_conflict:_memcpy((local_1c + 0x14), DAT_00000010, 4);
  FID_conflict:_memcpy((local_1c + 0x18), DAT_00000014, 4);
  FID_conflict:_memcpy((local_1c + 0x1c), DAT_00000018, 4);
  FID_conflict:_memcpy((local_1c + 0x20), DAT_0000001c, 4);
  FID_conflict:_memcpy((local_1c + 0x24), DAT_00000020, 4);
  FID_conflict:_memcpy((local_1c + 0x28), DAT_fffffff8, 4);
  return local_1c;
}


 export function FUN_0059c276 ()

 {
  let local_8;

  for (/* cond: (local_8 < 0xa9) */); local_8 = (local_8 < 0xa9); local_8 = (local_8 + 1)) {
    w32((DAT_006c8fe0 + local_8 * 4), 0, 0);
  }
  return;
}


 export function FUN_0059c2b8 ()

 {
  let local_8;

  DAT_006c8fb4 = 0;
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    w32((DAT_006c8fc0 + local_8 * 4), 0, 0);
  }
  return;
}


 export function FUN_0059c301 ()

 {
  FUN_0047e94e(1, 0);
  return;
}


 export function FUN_0059c31f (param_1)

 {
  let local_28;

  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 1;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 3;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 7;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0xf;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0x1f;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0x3f;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0x7f;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0xff;
  local_28 = 0;
  local_28 = 0;
  local_28 = 0;
  FUN_005f22d0((param_1 + 0x30), PTR_s_5.4.0f_Multiplayer_26-March-99_0062765c);
  _memset(param_1, 0, 0x20);
  _strncpy(param_1, DAT_006665b0, 0x20);
  _memset((param_1 + 0x70), 0, 0x20);
  _strncpy((param_1 + 0x70), DAT_006ad59c, 0x20);
  _memset((param_1 + 0x90), 0, 0x20);
  _strncpy((param_1 + 0x90), DAT_00666570, 0x20);
  w16((param_1 + 0xb0), 0, DAT_00654c74);
  param_1[0xb2] = DAT_00655b08;
  param_1[0xb3] = DAT_00655b09;
  if ((DAT_00655b0a === 0)) {
    param_1[0xb4] = DAT_ffffffd8[(u8(DAT_00655b0d) * 4 + 8)];
  }
  else {
    param_1[0xb4] = DAT_00655b0a;
  }
  param_1[0xb5] = DAT_ffffffd8[DAT_006ad308 * 4];
  w32((param_1 + 0xb8), 0, DAT_00654b70);
  FUN_005f22d0((param_1 + 0xbc), DAT_0064bc62);
  w16((param_1 + 0x10c), 0, DAT_00654fae);
  w16((param_1 + 0x10e), 0, DAT_00654fac);
  w16((param_1 + 0x110), 0, DAT_00655af0);
  w16((param_1 + 0x112), 0, DAT_00655afc);
  w16((param_1 + 0x114), 0, DAT_0064bcb4);
  w16((param_1 + 0x116), 0, DAT_0064bcb6);
  w16((param_1 + 0x118), 0, DAT_00655af8);
  w16((param_1 + 0x11e), 0, DAT_00654c7c);
  param_1[0x24] = 0;
  param_1[0x25] = 0;
  param_1[0x26] = 0;
  param_1[0x27] = 0;
  w32((param_1 + 0x20), 0, s32((param_1 + 0x24), 0));
  param_1[0x2c] = 0;
  param_1[0x2d] = 0;
  param_1[0x2e] = 0;
  param_1[0x2f] = 0;
  w32((param_1 + 0x28), 0, s32((param_1 + 0x2c), 0));
  w16((param_1 + 0x11a), 0, DAT_006d1160);
  w16((param_1 + 0x11c), 0, DAT_006d1162);
  return;
}


 export function FUN_0059c575 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let _Source;
  let _Count;

  w16((DAT_006af2a0 + (s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)), 0, u8(DAT_006560f6[param_1 * 0x20]));
  w16((DAT_006af2a2 + (s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)), 0, param_4);
  w16((DAT_006af2a4 + (s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)), 0, param_5);
  w16((DAT_006af2a6 + (s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)), 0, param_3);
  uVar1 = FUN_0043cb30(s8(DAT_006560f7[param_2 * 0x20]));
  w16((DAT_006af2a8 + (s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)), 0, uVar1);
  _Count = 0x18;
  _Source = FUN_00493c7d(s8(DAT_006560f7[param_2 * 0x20]));
  _strncpy(((s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22 + s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8) + 0x6af2aa), _Source, _Count);
  DAT_006af2c1[(s8(DAT_006560f7[param_1 * 0x20]) * 0x27d8 + s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) * 0x22)] = 0;
  w32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0, (s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) + 1));
  if ((s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) === 0x12c)) {
    w32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0, 0);
  }
  if ((s32((DAT_006af280 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) === s32((DAT_006af260 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0))) {
    w32((DAT_006af260 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0, (s32((DAT_006af260 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) + 1));
    if ((s32((DAT_006af260 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) === 0x12c)) {
      w32((DAT_006af260 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0, 0);
    }
  }
  else {
    w32((DAT_006af220 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0, (s32((DAT_006af220 + s8(DAT_006560f7[param_1 * 0x20]) * 4), 0) + 1));
  }
  if ((-1 < DAT_0063e948)) {
    FUN_005bb574();
  }
  return;
}


 export function FUN_0059d080 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  FUN_0046d5a0(0x2e);
  w32((in_ECX + 0x10), 0, 0);
  w32((in_ECX + 0x14), 0, 0);
  w32((in_ECX + 0x18), 0, 0);
  _MEM[(in_ECX + 0x20)] = 0;
  _MEM[(in_ECX + 0x38)] = 0;
  _MEM[(in_ECX + 0x50)] = 0;
  w32((in_ECX + 0x114), 0, 0);
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    for (/* cond: (local_c < 0x18) */); local_c = (local_c < 0x18); local_c = (local_c + 1)) {
      _MEM[(((local_8 * 0x18 + local_c) + 0x6c) + in_ECX)] = 0;
    }
  }
  w32((in_ECX + 0x1c), 0, 0);
  w32((in_ECX + 0x68), 0, 0);
  w32((in_ECX + 8), 0, 0x118);
  return in_ECX;
}


 export function FUN_0059d190 ()

 {
  FUN_0059d1aa();
  FUN_0059d1ca();
  return;
}


 export function FUN_0059d1aa ()

 {
  FUN_0043c4c0(0, 0x10, 1);
  return;
}


 export function FUN_0059d1ca ()

 {
  _atexit(FUN_0059d1e7);
  return;
}


 export function FUN_0059d1e7 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_0059d21b();
  FUN_0059d239();
  return;
}


 export function FUN_0059d21b ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_0059d239 ()

 {
  _atexit(FUN_0059d256);
  return;
}


 export function FUN_0059d256 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_0059d28a();
  FUN_0059d2a8();
  return;
}


 export function FUN_0059d28a ()

 {
  FUN_0043c460(1, 0xe);
  return;
}


 export function FUN_0059d2a8 ()

 {
  _atexit(FUN_0059d2c5);
  return;
}


 export function FUN_0059d2c5 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_0059d2f9();
  FUN_0059d317();
  return;
}


 export function FUN_0059d2f9 ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_0059d317 ()

 {
  _atexit(FUN_0059d334);
  return;
}


 export function FUN_0059d334 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0059d34e ()

 {
  FUN_0059d363();
  return;
}


 export function FUN_0059d363 ()

 {
  DAT_006cec84 = DAT_00635a58;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0059d37d ()

 {
  _DAT_006cec80 = FUN_00421bb0();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0059d397 ()

 {
  _DAT_006cec80 = FUN_00421bb0();
  return;
}


 export function FUN_0059d3b1 (param_1)

 {
  DAT_006359c0 = param_1;
  return;
}


 export function FUN_0059d3c9 (param_1)

 {
  DAT_006359c4 = param_1;
  return;
}


 export function FUN_0059d3e1 (param_1, param_2)

 {
  DAT_006359cc = param_1;
  DAT_006359d0 = param_2;
  return;
}


 export function FUN_0059d401 ()

 {
  let iVar1;
  let uVar2;
  let puVar3;
  let local_8;

  iVar1 = FUN_004a2379(s_LABELS_00635ac4, s_POPUPS_00635abc);
  if ((iVar1 === 0)) {
    for (/* cond: (local_8 < 3) */); local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
      uVar2 = FUN_004a257a();
      w32((DAT_006cec98 + local_8 * 4), 0, uVar2);
      puVar3 = FUN_00428b0c(s32((DAT_006cec98 + local_8 * 4), 0));
      w32(PTR_DAT_00635a48, local_8, puVar3);
    }
  }
  return;
}


 export function FUN_0059d487 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  DAT_006359fc = param_1;
  DAT_006359f8 = param_2;
  DAT_006359f4 = param_3;
  DAT_00635a00 = param_4;
  DAT_00635a04 = param_5;
  DAT_00635a08 = param_6;
  DAT_00635a0c = param_7;
  DAT_00635a10 = param_8;
  DAT_00635a14 = param_9;
  return;
}


 export function FUN_0059d4df (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  DAT_00635a18 = param_1;
  DAT_00635a1c = param_2;
  DAT_00635a20 = param_3;
  DAT_00635a24 = param_4;
  DAT_00635a28 = param_5;
  DAT_00635a2c = param_6;
  DAT_00635a30 = param_7;
  return;
}


 export function FUN_0059d527 (param_1)

 {
  PTR_DAT_006359e4 = param_1;
  return;
}


 export function FUN_0059d53f (param_1)

 {
  PTR_DAT_006359e8 = param_1;
  return;
}


 export function FUN_0059d557 (param_1)

 {
  PTR_DAT_006359ec = param_1;
  return;
}


 export function FUN_0059d56f ()

 {
  PTR_DAT_006359e4 = DAT_006ceca8;
  PTR_DAT_006359e8 = DAT_006cec78;
  PTR_DAT_006359ec = DAT_006cec88;
  return;
}


 export function FUN_0059d59d (param_1)

 {
  DAT_00635aa0 = param_1;
  return;
}


 export function FUN_0059d5b5 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004980ec((in_ECX + 0x254));
  FUN_00497ea0((in_ECX + 0x254), 9, param_1);
  return;
}


 export function FUN_0059d5f5 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  w32(in_ECX, 0, 0);
  w32(in_ECX, 1, 0);
  _MEM[(in_ECX + 0x255)] = 0;
  w32(in_ECX, 4, 0);
  w32(in_ECX, 3, s32(in_ECX, 4));
  w32(in_ECX, 2, s32(in_ECX, 3));
  w32(in_ECX, 0xb, 0);
  w32(in_ECX, 0xa, s32(in_ECX, 0xb));
  w32(in_ECX, 9, s32(in_ECX, 0xa));
  w32(in_ECX, 8, s32(in_ECX, 9));
  w32(in_ECX, 0xd, 0);
  w32(in_ECX, 0xc, s32(in_ECX, 0xd));
  w32(in_ECX, 0xf, 0);
  w32(in_ECX, 0x20, DAT_00635a34);
  w32(in_ECX, 0x21, DAT_00635a38);
  w32(in_ECX, 0x39, -0x3e7);
  w32(in_ECX, 0x38, s32(in_ECX, 0x39));
  w32(in_ECX, 0x3b, 0);
  w32(in_ECX, 0x3a, s32(in_ECX, 0x3b));
  w32(in_ECX, 0x11, 0);
  w32(in_ECX, 0x10, s32(in_ECX, 0x11));
  if ((DAT_006359d0 === 0)) {
    w32(in_ECX, 6, -0x3e7);
    w32(in_ECX, 5, s32(in_ECX, 6));
  }
  else {
    w32(in_ECX, 5, DAT_006359cc);
    w32(in_ECX, 6, DAT_006359d0);
  }
  w32(in_ECX, 7, 0);
  w32(in_ECX, 0x44, 0);
  w32(in_ECX, 0x1d, u8(DAT_00635a04));
  w32(in_ECX, 0x19, u8(DAT_006359fc));
  w32(in_ECX, 0x1a, u8(DAT_006359f8));
  w32(in_ECX, 0x1c, u8(DAT_006359f4));
  w32(in_ECX, 0x1b, u8(DAT_00635a00));
  w32(in_ECX, 0x1e, u8(DAT_00635a08));
  w32(in_ECX, 0x1f, u8(DAT_00635a0c));
  w32(in_ECX, 0x22, u8(DAT_00635a10));
  w32(in_ECX, 0x23, u8(DAT_00635a14));
  w32(in_ECX, 0x24, DAT_00635a18);
  w32(in_ECX, 0x25, DAT_00635a1c);
  w32(in_ECX, 0x26, DAT_00635a20);
  w32(in_ECX, 0x27, DAT_00635a24);
  w32(in_ECX, 0x28, DAT_00635a28);
  w32(in_ECX, 0x29, DAT_00635a2c);
  w32(in_ECX, 0x2a, DAT_00635a30);
  for (/* cond: (local_8 < 2) */); local_8 = (local_8 < 2); local_8 = (local_8 + 1)) {
    w32(in_ECX, (local_8 + 0x80), 0);
    w32(in_ECX, (local_8 + 0x82), 0);
    w32(in_ECX, (local_8 + 0x6e), 0);
  }
  w32(in_ECX, 0x12, 0);
  w32(in_ECX, 0x4a, 0);
  w32(in_ECX, 0x49, s32(in_ECX, 0x4a));
  w32(in_ECX, 0x48, s32(in_ECX, 0x49));
  w32(in_ECX, 0x47, s32(in_ECX, 0x48));
  w32(in_ECX, 0x46, s32(in_ECX, 0x47));
  w32(in_ECX, 0x88, 0);
  w32(in_ECX, 0x89, 0);
  w32(in_ECX, 0x8b, 0);
  w32(in_ECX, 0x8a, s32(in_ECX, 0x8b));
  w32(in_ECX, 0x8c, 0);
  w32(in_ECX, 0x8d, 0);
  w32(in_ECX, 0x8e, 0);
  w32(in_ECX, 0x2c, 0);
  w32(in_ECX, 0x2e, 2);
  w32(in_ECX, 0x2f, 2);
  w32(in_ECX, 0x30, 4);
  w32(in_ECX, 0x31, 4);
  w32(in_ECX, 0x33, 8);
  w32(in_ECX, 0x32, 2);
  w32(in_ECX, 0x2b, 0);
  w32(in_ECX, 0xe, 1);
  w32(in_ECX, 0x87, 0);
  w32(in_ECX, 0x86, s32(in_ECX, 0x87));
  w32(in_ECX, 0x4c, 0);
  w32(in_ECX, 0x4d, 0);
  w32(in_ECX, 0x9a, 0);
  w32(in_ECX, 0x9b, 0);
  w32(in_ECX, 0x9c, 0);
  w32(in_ECX, 0x9d, 0);
  w32(in_ECX, 0x9f, 0);
  w32(in_ECX, 0x9e, s32(in_ECX, 0x9f));
  w32(in_ECX, 0xa0, 0);
  w32(in_ECX, 0xa2, 0);
  w32(in_ECX, 0xa1, s32(in_ECX, 0xa2));
  w32(in_ECX, 0xa4, 0);
  w32(in_ECX, 0xa3, s32(in_ECX, 0xa4));
  w32(in_ECX, 0x91, 0);
  w32(in_ECX, 0x8f, 0);
  w32(in_ECX, 0x90, 0);
  w32(in_ECX, 0x92, 0);
  w32(in_ECX, 0x93, 0);
  w32(in_ECX, 0x94, 0);
  w32(in_ECX, 0x36, 0);
  w32(in_ECX, 0x37, 0);
  return;
}


 export function FUN_0059db08 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00428cb0();
  w32((in_ECX + 0x25c), 0, 0);
  w32((in_ECX + 0x258), 0, s32((in_ECX + 0x25c), 0));
  FUN_0059d5f5();
  w16((in_ECX + 0x262), 0, param_1);
  return in_ECX;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0059db65 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((DAT_006359c4 === 0)) {
    if ((DAT_00634718 !== 0)) {
      FUN_00451900();
    }
  }
  else {
    FUN_00451900();
  }
  if ((s32(in_ECX, 0x9a) !== 0)) {
    if ((s32(in_ECX, 0x9a) !== 0)) {
      FUN_004bb4a0(1);
    }
    w32(in_ECX, 0x9a, 0);
  }
  if ((s32(in_ECX, 0x9b) !== 0)) {
    if ((s32(in_ECX, 0x9b) !== 0)) {
      FID_conflict:`vector_deleting_destructor'(3);
    }
    w32(in_ECX, 0x9b, 0);
  }
  if ((s32(in_ECX, 0x9c) !== 0)) {
    if ((s32(in_ECX, 0x9c) !== 0)) {
      FID_conflict:`vector_deleting_destructor'(3);
    }
    w32(in_ECX, 0x9c, 0);
  }
  if ((s32(in_ECX, 0x9d) !== 0)) {
    if ((s32(in_ECX, 0x9d) !== 0)) {
      FID_conflict:`vector_deleting_destructor'(3);
    }
    w32(in_ECX, 0x9d, 0);
  }
  if ((s32(in_ECX, 0x9e) !== 0)) {
    if ((s32(in_ECX, 0x9e) !== 0)) {
      FUN_005a94d0(1);
    }
    w32(in_ECX, 0x9e, 0);
  }
  if ((s32(in_ECX, 0x9f) !== 0)) {
    if ((s32(in_ECX, 0x9f) !== 0)) {
      FUN_005a94d0(1);
    }
    w32(in_ECX, 0x9f, 0);
  }
  if ((s32(in_ECX, 0xa0) !== 0)) {
    if ((s32(in_ECX, 0xa0) !== 0)) {
      FID_conflict:`vector_deleting_destructor'(3);
    }
    w32(in_ECX, 0xa0, 0);
  }
  if ((s32(in_ECX, 0xa1) !== 0)) {
    if ((s32(in_ECX, 0xa1) !== 0)) {
      FUN_004bb4f0(1);
    }
    w32(in_ECX, 0xa1, 0);
  }
  if ((s32(in_ECX, 0xa2) !== 0)) {
    if ((s32(in_ECX, 0xa2) !== 0)) {
      FUN_004bb4f0(1);
    }
    w32(in_ECX, 0xa2, 0);
  }
  if ((s32(in_ECX, 0xa3) !== 0)) {
    if ((s32(in_ECX, 0xa3) !== 0)) {
      FUN_004bb4f0(1);
    }
    w32(in_ECX, 0xa3, 0);
  }
  if ((s32(in_ECX, 0xa4) !== 0)) {
    if ((s32(in_ECX, 0xa4) !== 0)) {
      FUN_004bb4f0(1);
    }
    w32(in_ECX, 0xa4, 0);
  }
  if ((s32(in_ECX, 0) !== 0)) {
    if ((s32(in_ECX, 0) !== 0)) {
      FUN_005a95b0(1);
    }
    w32(in_ECX, 0, 0);
    w32(in_ECX, 0xf, (s32(in_ECX, 0xf) | 0x10));
  }
  if ((in_ECX === DAT_006cec84)) {
    if ((0x10 < DAT_00635a9c)) {
      FUN_005dae6b(7, s_popupStackIndex_>_0_&&_popupStac_00635aec, s_D:\Ss\Franklinton\Popup_1.cpp_00635acc, 0x19c);
    }
    DAT_00635a9c = (DAT_00635a9c + -1);
    DAT_006ad678 = s32(DAT_00635a58, (DAT_00635a9c + -1));
    DAT_006cec84 = s32(DAT_00635a58, (DAT_00635a9c + -1));
    _DAT_006cec80 = FUN_00421bb0();
  }
  return;
}


 export function FUN_0059df8a (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0059db65();
  FUN_004980ec((in_ECX + 0x254));
  return;
}


 export function FUN_0059dfb9 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  if (((in_ECX[0x3c] & 0x20) === 0)) {
    FUN_00497ea0((in_ECX + 0x254), 9, s16((in_ECX + 0x262), 0));
  }
  else {
    FUN_0059db65();
    FUN_0059d5f5();
    FUN_0059d5b5(s16((in_ECX + 0x262), 0));
  }
  FUN_0059e472(PTR_DAT_006359e4);
  in_ECX = SetObjectSchema(in_ECX, PTR_DAT_006359e8);
  FUN_0059e4c5(PTR_DAT_006359ec);
  w32(in_ECX, 0, param_1);
  w32((in_ECX + 4), 0, param_2);
  w32((in_ECX + 0xd8), 0, 0);
  w32((in_ECX + 0x3c), 0, param_4);
  if ((param_3 === 0)) {
    FUN_0059e6ff(0x1b8);
  }
  else {
    w32((in_ECX + 0xe8), 0, s32(param_3, 0));
    w32((in_ECX + 0xec), 0, s32(param_3, 1));
    uVar1 = FUN_00407f90(param_3);
    FUN_0059e6ff(uVar1);
    iVar2 = FUN_00407fc0(param_3);
    in_ECX = in_ECX;
  }
  if ((param_1 !== 0)) {
    w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 0x10));
  }
  return;
}


 export function FUN_0059e0eb (in_ECX, param_1, param_2)

 {
  let sVar1;
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 !== 0) */); (local_8 = s32(local_8, 0) && (local_8 = (local_8 !== 0)));
      local_8 = s32(local_8, 7)) {
  }
  if (((sVar1 + 1) <= s32(local_8, 3))) {
    FUN_005f22d0(s32(local_8, 2), param_2);
    return 1;
  }
  return 0;
}


 export function FUN_0059e18b (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let piVar1;
  let sVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32(local_8, 7)) {
    local_c = local_8;
  }
  piVar1 = FUN_00498159((in_ECX + 0x254), 0x20);
  if ((local_c === 0)) {
    w32((in_ECX + 0x230), 0, piVar1);
    w32(piVar1, 0, 1);
  }
  else {
    w32(local_c, 7, piVar1);
    w32(piVar1, 0, (s32(local_c, 0) + 1));
  }
  w32(piVar1, 7, 0);
  w32(piVar1, 1, 0);
  if ((_MEM[param_1] === 0x5e)) {
    if ((param_1[1] === 0x5e)) {
      w32(piVar1, 1, (s32(piVar1, 1) | 1));
      param_1 = (param_1 + 2);
    }
    else {
      w32(piVar1, 1, (s32(piVar1, 1) | 2));
      param_1 = (param_1 + 1);
    }
  }
  if ((0 < param_4)) {
    sVar2 = _strlen(param_1);
    if (((sVar2 + 1) < param_4)) {
      iVar3 = FUN_00498159((in_ECX + 0x254), (param_4 + 1));
      w32(piVar1, 2, iVar3);
      w32(piVar1, 3, (param_4 + 1));
      goto LAB_0059e2e4;
    }
  }
  sVar2 = _strlen(param_1);
  iVar3 = FUN_00498159((in_ECX + 0x254), (sVar2 + 1));
  w32(piVar1, 2, iVar3);
  sVar2 = _strlen(param_1);
  w32(piVar1, 3, (sVar2 + 1));
 LAB_0059e2e4: :
  FUN_005f22d0(s32(piVar1, 2), param_1);
  w32(piVar1, 4, param_2);
  w32(piVar1, 5, param_3);
  w32(piVar1, 6, param_5);
  w32((in_ECX + 0x20), 0, (s32((in_ECX + 0x20), 0) + 1));
  return piVar1;
}


 export function FUN_0059e327 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return ((_MEM[(in_ECX + 0x3c)] & 0x80) !== 0);
}


 export function FUN_0059e356 ()

 {
  return 0x20;
}


 export function FUN_0059e376 (in_ECX)

 {
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let extraout_EAX_02;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = FUN_0059e356();
  in_ECX = (in_ECX + 8);
  if (((extraout_EAX * 5 >> 2) <= local_8)) {
    in_ECX = (in_ECX + 8);
    local_8 = (extraout_EAX_00 * 5 >> 2);
  }
  in_ECX = (in_ECX + 8);
  if ((extraout_EAX_01 < local_8)) {
    local_c = local_8;
  }
  else {
    in_ECX = (in_ECX + 8);
    local_c = extraout_EAX_02;
  }
  return local_c;
}


 export function FUN_0059e3fa (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(((in_ECX + 0x200) + s32((in_ECX + 0x48), 0) * 4), 0) === 0)) {
    iVar1 = FUN_0040ef70();
    iVar1 = (iVar1 + 1);
  }
  else {
    iVar1 = s32(((in_ECX + 0x200) + s32((in_ECX + 0x48), 0) * 4), 0);
  }
  return iVar1;
}


 export function FUN_0059e448 (in_ECX)

 {
  let extraout_EAX;
  // in_ECX promoted to parameter;

  in_ECX = (in_ECX + 8);
  return (extraout_EAX + 0xa);
}


 export function FUN_0059e472 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 8), 0, param_1);
  uVar1 = FUN_0059e376();
  w32((in_ECX + 0xb4), 0, uVar1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */  /* CArchive::SetObjectSchema(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function SetObjectSchema (this, param_1)

 {
  w32((this + 0xc), 0, param_1);
  return;
}


 export function FUN_0059e4c5 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x10), 0, param_1);
  return;
}


 export function FUN_0059e4e6 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x38), 0, param_1);
  return;
}


 export function FUN_0059e507 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 0x1000));
  w32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0, param_1);
  if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
    iVar1 = FUN_0059e3fa();
    w32(((in_ECX + 0x54) + s32((in_ECX + 0x48), 0) * 4), 0, (iVar1 * param_1 + 2));
  }
  else {
    iVar1 = FUN_0040ef70();
    w32(((in_ECX + 0x54) + s32((in_ECX + 0x48), 0) * 4), 0, (iVar1 * param_1 + 2));
  }
  return;
}


 export function FUN_0059e585 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 === 1)) {
    w32((in_ECX + 0x48), 0, param_1);
  }
  else {
    w32((in_ECX + 0x48), 0, 0);
  }
  return;
}


 export function FUN_0059e5c9 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 0x1000));
  w32(((in_ECX + 0x4c) + s32((in_ECX + 0x48), 0) * 4), 0, param_2);
  w32(((in_ECX + 0x1e0) + s32((in_ECX + 0x48), 0) * 4), 0, param_3);
  if ((param_1 !== 0)) {
    FUN_0059e507(param_1);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0xc8), 0, param_1);
  return;
}


 export function FUN_0059e648 (in_ECX)

 {
  let extraout_EAX;
  // in_ECX promoted to parameter;

  in_ECX = (in_ECX + 8);
  return ((extraout_EAX + 4) + s32((in_ECX + 0xb8), 0) * 2);
}


 export function FUN_0059e676 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  iVar1 = s32((in_ECX + 0xc4), 0);
  iVar2 = FUN_0040efd0(param_1);
  return ((iVar2 + 4) + iVar1 * 4);
}


 export function FUN_0059e6a9 (in_ECX, param_1)

 {
  let sVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  sVar1 = _strlen(param_1);
  uVar2 = FUN_00498159((in_ECX + 0x254), (sVar1 + 1));
  w32((in_ECX + 0x134), 0, uVar2);
  FUN_005f22d0(s32((in_ECX + 0x134), 0), param_1);
  return;
}


 export function FUN_0059e6ff (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if (((_MEM[(in_ECX + 0x3e)] & 8) === 0)) {
    param_1 = (s32((in_ECX + 0x80), 0) * param_1 / s32((in_ECX + 0x84), 0) | 0);
  }
  w32((in_ECX + 0x11c), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* ios::delbuf(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function delbuf (this, param_1)

 {
  w32((this + 0x1c), 0, param_1);
  return;
}


 export function FUN_0059e783 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x14), 0, param_1);
  w32((in_ECX + 0x18), 0, param_2);
  return;
}


 export function FUN_0059e7ad (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = s32((in_ECX + 0x228), 0);
  while ((local_8 === 0)) {
    if ((s32((local_c + 4), 0) === param_1)) {
      local_8 = local_c;
    }
    local_c = s32((local_c + 0x10), 0);
  }
  return local_8;
}


 export function FUN_0059e812 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = s32((in_ECX + 0x238), 0);
  while ((local_8 === 0)) {
    if ((s32((local_c + 0xc), 0) === param_1)) {
      local_8 = local_c;
    }
    local_c = s32((local_c + 0x18), 0);
  }
  return local_8;
}


 export function FUN_0059e877 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = s32((in_ECX + 0x234), 0);
  while ((local_8 === 0)) {
    if ((s32(local_c, 0) === param_1)) {
      local_8 = local_c;
    }
    local_c = s32(local_c, 4);
  }
  return local_8;
}


 export function FUN_0059e8db (param_1, param_2)

 {
  let puVar1;

  puVar1 = FUN_0059e7ad(param_1);
  if ((puVar1 !== 0)) {
    if ((param_2 === 0)) {
      w32(puVar1, 0, (s32(puVar1, 0) & -2));
    }
    else {
      w32(puVar1, 0, (s32(puVar1, 0) | 1));
    }
  }
  return;
}


 export function FUN_0059e927 (param_1, param_2)

 {
  let puVar1;

  puVar1 = FUN_0059e7ad(param_1);
  if ((puVar1 !== 0)) {
    if ((param_2 === 0)) {
      w32(puVar1, 0, (s32(puVar1, 0) & -3));
    }
    else {
      w32(puVar1, 0, (s32(puVar1, 0) | 2));
    }
  }
  return;
}


 export function FUN_0059e973 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32(local_8, 4)) {
    w32(local_8, 0, (s32(local_8, 0) & -2));
  }
  return;
}


 export function FUN_0059e9b3 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32(local_8, 4)) {
    w32(local_8, 0, (s32(local_8, 0) & -3));
  }
  return;
}


 export function FUN_0059e9f3 (param_1)

 {
  let pbVar1;
  let local_8;

  local_8 = 0;
  pbVar1 = FUN_0059e7ad(param_1);
  if ((pbVar1 !== 0)) {
    if (((_MEM[pbVar1] & 4) === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = 1;
    }
  }
  return local_8;
}


 export function FUN_0059ea4d (param_1, param_2)

 {
  let puVar1;

  puVar1 = FUN_0059e7ad(param_1);
  if ((puVar1 !== 0)) {
    if ((param_2 === 0)) {
      w32(puVar1, 0, (s32(puVar1, 0) & -5));
    }
    else {
      w32(puVar1, 0, (s32(puVar1, 0) | 4));
    }
  }
  return;
}


 export function FUN_0059ea99 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x28), 0) === 0)) {
    iVar1 = FUN_0059e877(param_1);
    if ((iVar1 !== 0)) {
      w32((in_ECX + 0x224), 0, iVar1);
    }
  }
  else {
    iVar1 = FUN_0059e7ad(param_1);
    if ((iVar1 !== 0)) {
      w32((in_ECX + 0x220), 0, iVar1);
    }
  }
  return;
}


 export function FUN_0059eb0d (param_1, param_2)

 {
  FUN_00418a70(param_2);
  return;
}


 export function FUN_0059eb42 (param_1)

 {
  FUN_0059eb0d(0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0xd8), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x23c), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x240), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x244), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x248), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x24c), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x250), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x130), 0, param_1);
  return;
}


 export function FUN_0059ec88 (in_ECX, param_1, param_2, param_3)

 {
  let puVar1;
  let sVar2;
  let uVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
    local_10 = local_c;
  }
  puVar1 = FUN_00498159((in_ECX + 0x254), 0x14);
  if ((local_10 === 0)) {
    w32((in_ECX + 0x234), 0, puVar1);
    if ((s32((in_ECX + 0x224), 0) === 0)) {
      w32((in_ECX + 0x224), 0, puVar1);
    }
  }
  else {
    w32((local_10 + 0x10), 0, puVar1);
  }
  w32(puVar1, 4, 0);
  w32(puVar1, 1, 0);
  w32(puVar1, 3, param_1);
  local_8 = FUN_004a6980();
  if ((param_3 === 0)) {
    w32(puVar1, 2, 0);
  }
  else {
    sVar2 = _strlen(param_3);
    uVar3 = FUN_00498159((in_ECX + 0x254), (sVar2 + 1));
    w32(puVar1, 2, uVar3);
    FUN_005f22d0(s32(puVar1, 2), param_3);
    iVar4 = FUN_0040efd0(s32(puVar1, 2));
    local_8 = (local_8 + (s32((in_ECX + 0xc4), 0) + iVar4));
  }
  w32(puVar1, 0, param_2);
  iVar4 = s32((in_ECX + 0x120), 0);
  if ((s32((in_ECX + 0x120), 0) <= local_8)) {
    iVar4 = local_8;
  }
  w32((in_ECX + 0x120), 0, iVar4);
  w32((in_ECX + 0x2c), 0, (s32((in_ECX + 0x2c), 0) + 1));
  return puVar1;
}


 export function FUN_0059edf0 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let puVar2;
  let sVar3;
  let uVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;

  local_10 = 0;
  local_c = s32((in_ECX + 0x228), 0);
  if ((local_c === 0)) {
    if ((local_c !== 0)) {
      for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32((local_c + 0x10), 0)) {
        local_10 = local_c;
      }
    }
  }
  else {
    while ((0 < iVar1)) {
      local_10 = local_c;
      local_c = s32((local_c + 0x10), 0);
    }
  }
  puVar2 = FUN_00498159((in_ECX + 0x254), 0x18);
  if ((local_10 === 0)) {
    w32(puVar2, 4, s32((in_ECX + 0x228), 0));
    w32(puVar2, 5, 0);
    if ((s32((in_ECX + 0x228), 0) === 0)) {
      w32((in_ECX + 0x22c), 0, puVar2);
    }
    else {
      w32((s32((in_ECX + 0x228), 0) + 0x14), 0, puVar2);
    }
    w32((in_ECX + 0x228), 0, puVar2);
    w32((in_ECX + 0x220), 0, puVar2);
  }
  else {
    w32(puVar2, 4, s32((local_10 + 0x10), 0));
    w32(puVar2, 5, local_10);
    if ((s32(puVar2, 4) === 0)) {
      w32((in_ECX + 0x22c), 0, puVar2);
    }
    else {
      w32((s32(puVar2, 4) + 0x14), 0, puVar2);
    }
    w32((local_10 + 0x10), 0, puVar2);
  }
  w32(puVar2, 0, 0);
  sVar3 = _strlen(param_1);
  uVar4 = FUN_00498159((in_ECX + 0x254), (sVar3 + 1));
  w32(puVar2, 2, uVar4);
  FUN_005f22d0(s32(puVar2, 2), param_1);
  if ((_MEM[param_1] === 0)) {
    w32(puVar2, 0, (s32(puVar2, 0) | 1));
  }
  w32(puVar2, 1, param_2);
  w32(puVar2, 3, param_3);
  iVar1 = FUN_0040efd0(s32(puVar2, 2));
  iVar5 = FUN_0059e356();
  iVar1 = (((iVar1 + iVar5) + s32((in_ECX + 0xac), 0)) + 5);
  iVar5 = s32((in_ECX + 0x118), 0);
  if ((s32((in_ECX + 0x118), 0) <= iVar1)) {
    iVar5 = iVar1;
  }
  w32((in_ECX + 0x118), 0, iVar5);
  w32((in_ECX + 0x28), 0, (s32((in_ECX + 0x28), 0) + 1));
  return puVar2;
}


 export function FUN_0059f026 (in_ECX, param_1, param_2, param_3)

 {
  let puVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x3c), 0, (s32((in_ECX + 0x3c), 0) | 5));
  puVar1 = FUN_0059edf0(param_1, param_2, 0);
  if ((param_3 !== 0)) {
    w32(puVar1, 0, (s32(puVar1, 0) | 4));
  }
  return puVar1;
}


 export function FUN_0059f06d (in_ECX, param_1, param_2, param_3)

 {
  let puVar1;
  let sVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  for (/* cond: (local_10 !== 0) */); local_10 = (local_10 !== 0); local_10 = s32((local_10 + 0x18), 0)) {
    local_14 = local_10;
  }
  puVar1 = FUN_00498159((in_ECX + 0x254), 0x1c);
  if ((local_14 === 0)) {
    w32((in_ECX + 0x238), 0, puVar1);
  }
  else {
    w32((local_14 + 0x18), 0, puVar1);
  }
  w32(puVar1, 6, 0);
  w32(puVar1, 0, 0);
  sVar2 = _strlen(param_1);
  uVar3 = FUN_00498159((in_ECX + 0x254), (sVar2 + 2));
  w32(puVar1, 4, uVar3);
  FUN_005f22d0(s32(puVar1, 4), param_1);
  iVar4 = FUN_0040efd0(s32(puVar1, 4));
  iVar5 = s32((in_ECX + 0x110), 0);
  if ((s32((in_ECX + 0x110), 0) <= iVar4)) {
    iVar5 = iVar4;
  }
  w32((in_ECX + 0x110), 0, iVar5);
  if ((0xfe < param_3)) {
    param_3 = 0xff;
  }
  w32(puVar1, 2, param_3);
  uVar3 = FUN_00498159((in_ECX + 0x254), 0x100);
  w32(puVar1, 5, uVar3);
  iVar5 = FUN_0040efd0(DAT_00635b18);
  w32(puVar1, 1, iVar5 * param_3);
  local_8 = (s32(puVar1, 1) + s32((in_ECX + 0x110), 0));
  if ((s32((in_ECX + 0x11c), 0) < local_8)) {
    w32(puVar1, 1, (s32(puVar1, 1) - ((local_8 - s32((in_ECX + 0x11c), 0)) + -3)));
    local_8 = ((s32(puVar1, 1) + s32((in_ECX + 0x110), 0)) + 3);
  }
  iVar5 = s32((in_ECX + 0x128), 0);
  if ((s32((in_ECX + 0x128), 0) <= local_8)) {
    iVar5 = local_8;
  }
  w32((in_ECX + 0x128), 0, iVar5);
  if ((param_2 === 0)) {
    _MEM[s32(puVar1, 5)] = 0;
  }
  else {
    _memset(s32(puVar1, 5), 0, 0x100);
    _strncpy(s32(puVar1, 5), param_2, param_3);
  }
  w32(puVar1, 3, s32((in_ECX + 0x24), 0));
  w32((in_ECX + 0x24), 0, (s32((in_ECX + 0x24), 0) + 1));
  return puVar1;
}


 export function FUN_0059f2a3 (in_ECX, param_1)

 {
  let sVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) < 6)) {
    sVar1 = _strlen(param_1);
    uVar2 = FUN_00498159((in_ECX + 0x254), (sVar1 + 1));
    w32(((in_ECX + 0x294) + s32((in_ECX + 0x34), 0) * 4), 0, uVar2);
    FUN_005f22d0(s32(((in_ECX + 0x294) + s32((in_ECX + 0x34), 0) * 4), 0), param_1);
    w32((in_ECX + 0x34), 0, (s32((in_ECX + 0x34), 0) + 1));
  }
  return;
}


 export function FUN_0059f31a (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    if ((param_2 === 0)) {
      if ((param_3 === 0)) {
        local_10 = s32((in_ECX + 0x64), 0);
      }
      else {
        local_10 = s32((in_ECX + 0x68), 0);
      }
      FUN_005c19ad(local_10);
    }
    else {
      if ((param_3 === 0)) {
        local_c = s32((in_ECX + 0x70), 0);
      }
      else {
        local_c = s32((in_ECX + 0x68), 0);
      }
      FUN_005c19ad(local_c);
    }
  }
  else {
    if ((param_3 === 0)) {
      local_8 = s32((in_ECX + 0x6c), 0);
    }
    else {
      local_8 = s32((in_ECX + 0x68), 0);
    }
    FUN_005c19ad(local_8);
  }
  return;
}


 export function FUN_0059f3d7 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let pcVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let uVar4;

  while ((pcVar1 !== 0)) {
    _MEM[pcVar1] = 0x20;
  }
  if ((s32((in_ECX + 0x68), 0) !== s32((in_ECX + 0x64), 0))) {
    uVar4 = 1;
    uVar2 = FUN_005a96f0(1);
    FUN_0059f31a((param_5 & 1), uVar2, uVar4);
    FUN_005c0f57(param_1, param_2, (param_3 + 1), (param_4 + 1), 5);
  }
  uVar4 = 0;
  uVar2 = FUN_005a96f0(0);
  FUN_0059f31a((param_5 & 1), uVar2, uVar4);
  FUN_005c0f57(param_1, param_2, param_3, param_4, 5);
  iVar3 = FUN_0040efd0(param_2);
  return (param_3 + iVar3);
}


 export function FUN_0059f5ba (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005a9730(param_1, (s32((in_ECX + 0xf8), 0) + param_2), param_3, 0);
  return;
}


 export function FUN_0059f5f7 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0x230), 0);
  while ((s32((local_8 + 0x10), 0) < 0)) {
    if ((local_8 === 0)) {
      return 0;
    }
    if ((s32((local_8 + 0x10), 0) < 0));
  }
  return 1;
}


 export function FUN_0059f64a (in_ECX, param_1)

 {
  let extraout_EAX;
  let iVar1;
  let sVar2;
  let pcVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let iVar6;
  let bVar7;
  let local_188;
  let local_180;
  let local_17c;
  let local_174;
  let local_16c;
  let local_160;
  let local_60;
  let local_5f;
  let local_10;
  let local_c;
  let local_8;

  bVar7 = (s32((in_ECX + 0x68), 0) !== s32((in_ECX + 0x64), 0));
  local_c = s32((in_ECX + 0x230), 0);
  iVar5 = s32((in_ECX + 0x11c), 0);
  local_17c = 0;
  local_174 = s32((in_ECX + 0xfc), 0);
  in_ECX = (in_ECX + 8);
  local_160 = 0;
  local_10 = 0;
  local_8 = extraout_EAX;
  for (/* cond: (local_c !== 0) */); iVar6 = (iVar5 >> 1), local_c = (local_c !== 0); local_c = s32((local_c + 0x1c), 0)) {
    if ((s32((local_c + 0x10), 0) < 1)) {
      local_180 = s32((local_c + 8), 0);
      if (((_MEM[(local_c + 4)] & 3) !== 0)) {
        if ((UNNAMED !== 0)) {
          if ((param_1 !== 0)) {
            FUN_0059f5ba(DAT_fffffea0, 0, local_174);
          }
          local_17c = (local_17c + local_8);
          local_174 = (local_174 + local_8);
          local_160 = 0;
          local_10 = 0;
        }
        if ((param_1 !== 0)) {
          if (((_MEM[(local_c + 4)] & 1) === 0)) {
            local_16c = 0;
          }
          else if ((s32((local_c + 0x18), 0) === 0)) {
            iVar1 = FUN_0040efd0(local_180);
            local_16c = (iVar6 - ((u8(bVar7) + iVar1) >> 1));
          }
          else {
            local_16c = s32((local_c + 0x18), 0);
            iVar1 = FUN_0040efd0(local_180);
            local_16c = (local_16c - ((u8(bVar7) + iVar1) >> 1));
          }
          if ((s32((local_c + 0x14), 0) === -1)) {
            local_188 = local_174;
          }
          else {
            local_188 = s32((local_c + 0x14), 0);
          }
          FUN_0059f5ba(local_180, local_16c, local_188);
        }
        for (/* cond: (_MEM[local_180] !== 0) */); local_180 = _MEM[local_180]; local_180 = (local_180 + 1)) {
        }
        if ((s32((local_c + 0x14), 0) < 0)) {
          local_17c = (local_17c + local_8);
          local_174 = (local_174 + local_8);
        }
      }
      while ((sVar2 !== 0)) {
        for (/* cond: (_MEM[local_180] === 0x20) */); local_180 = _MEM[local_180]; local_180 = (local_180 + 1)) {
        }
        pcVar3 = _strchr(local_180, 0x20);
        if ((pcVar3 !== 0)) {
          _MEM[pcVar3] = 0;
        }
        sVar2 = _strlen(local_180);
        local_60 = 0;
        if ((UNNAMED !== 0)) {
          FUN_005f22e0(DAT_ffffffa0, DAT_00635b1c);
        }
        FUN_005f22e0(DAT_ffffffa0, local_180);
        iVar1 = FUN_0040efd0(DAT_ffffffa0);
        if ((iVar5 < ((u8(bVar7) + iVar1) + local_10))) {
          if ((param_1 !== 0)) {
            if (((_MEM[(in_ECX + 0x3e)] & 0x20) === 0)) {
              local_16c = 0;
            }
            else {
              iVar4 = FUN_0040efd0(DAT_fffffea0);
              local_16c = (iVar6 - ((u8(bVar7) + iVar4) >> 1));
            }
            FUN_0059f5ba(DAT_fffffea0, local_16c, local_174);
          }
          local_17c = (local_17c + local_8);
          local_174 = (local_174 + local_8);
          while ((local_60 === 0x20)) {
            FUN_005f22d0(DAT_ffffffa0, DAT_ffffffa1);
          }
          local_160 = 0;
          local_10 = 0;
        }
        FUN_005f22e0(DAT_fffffea0, DAT_ffffffa0);
        local_10 = (local_10 + iVar1);
        if ((pcVar3 !== 0)) {
          _MEM[pcVar3] = 0x20;
        }
        local_180 = (local_180 + sVar2);
      }
    }
    else if ((param_1 !== 0)) {
      FUN_005a9730(s32((local_c + 8), 0), s32((local_c + 0x10), 0), s32((local_c + 0x14), 0), s32((local_c + 4), 0));
    }
  }
  if ((UNNAMED !== 0)) {
    if ((param_1 !== 0)) {
      if (((_MEM[(in_ECX + 0x3e)] & 0x20) === 0)) {
        local_16c = 0;
      }
      else {
        iVar5 = FUN_0040efd0(DAT_fffffea0);
        local_16c = (iVar6 - ((u8(bVar7) + iVar5) >> 1));
      }
      FUN_0059f5ba(DAT_fffffea0, local_16c, local_174);
    }
    local_17c = (local_17c + local_8);
  }
  return local_17c;
}


 export function FUN_0059fb78 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  if ((s32((in_ECX + 0x228), 0) !== 0)) {
    local_c = 0;
    for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x10), 0)) {
      if ((param_1 === local_8)) {
        return local_c;
      }
      if ((s32((param_1 + 0xc), 0) === s32((local_8 + 0xc), 0))) {
        local_c = (local_c + 1);
      }
    }
  }
  return 0;
}


 export function FUN_0059fc19 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  if ((s32((in_ECX + 0x228), 0) !== 0)) {
    local_c = 0;
    for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x10), 0)) {
      if ((local_c === param_1)) {
        return local_8;
      }
      if ((s32((in_ECX + 0x48), 0) === s32((local_8 + 0xc), 0))) {
        local_c = (local_c + 1);
      }
    }
  }
  return 0;
}


 export function FUN_0059fcba (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0059fb78(param_1);
  return (iVar1 / s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0) | 0);
}


 export function FUN_0059fcf2 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0059fc19(s32(((in_ECX + 0x5c) + s32((in_ECX + 0x48), 0) * 4), 0) * param_1);
  return;
}


 export function FUN_0059fd2a (in_ECX)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_78;
  let local_70;
  let local_6c;
  let local_68;
  let local_5c;
  let local_58;
  let local_54;
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

  local_44 = 1;
  local_70 = 0;
  local_10 = 0;
  local_24 = 0;
  if (((_MEM[(in_ECX + 0x3e)] & 0x10) === 0)) {
    for (/* cond: (local_14 !== 0) */); local_14 = (local_14 !== 0); local_14 = s32((local_14 + 0x1c), 0)) {
      if (((_MEM[(local_14 + 4)] & 3) !== 0)) {
        iVar3 = s32(in_ECX, 0x1a);
        iVar4 = s32(in_ECX, 0x19);
        local_58 = FUN_0040efd0(s32((local_14 + 8), 0));
        local_58 = (u8((iVar3 !== iVar4)) + local_58);
        iVar3 = s32(in_ECX, 0x47);
        if ((s32(in_ECX, 0x47) <= local_58)) {
          iVar3 = local_58;
        }
        w32(in_ECX, 0x47, iVar3);
      }
    }
  }
  if ((sVar1 !== 0)) {
    local_58 = FUN_0040efd0(s32(in_ECX, 0x4d));
    local_58 = (local_58 + 4);
    iVar3 = s32(in_ECX, 0x47);
    if ((s32(in_ECX, 0x47) <= local_58)) {
      iVar3 = local_58;
    }
    w32(in_ECX, 0x47, iVar3);
  }
  for (/* cond: (local_20 !== 0) */); local_20 = (local_20 !== 0); local_20 = s32((local_20 + 0x10), 0)) {
  }
  if ((s32(in_ECX, 0xa) !== 0)) {
    w32(in_ECX, 9, 0);
    w32(in_ECX, 0x8e, 0);
  }
  if (((_MEM[(in_ECX + 0x3e)] & 1) === 0)) {
    iVar3 = FUN_0040ef70();
    w32(in_ECX, 0x34, ((iVar3 + s32(in_ECX, 0x32) * 2) + s32(in_ECX, 0x2e) * 2));
  }
  else {
    w32(in_ECX, 0x33, 0);
    w32(in_ECX, 0x32, 0);
    w32(in_ECX, 0x34, 0);
  }
  w32(in_ECX, 0x35, s32(in_ECX, 0x34));
  w32(in_ECX, 0x38, s32(in_ECX, 5));
  w32(in_ECX, 0x39, s32(in_ECX, 6));
  local_38 = (s32(in_ECX, 0x33) + s32(in_ECX, 0x2f));
  local_30 = (s32(in_ECX, 0x34) + s32(in_ECX, 0x2e));
  if (((_MEM[(in_ECX + 0x3e)] & 0x10) === 0)) {
    w32(in_ECX, 0x10, local_38 * 2);
    w32(in_ECX, 0x11, (s32(in_ECX, 0x2e) * 2 + s32(in_ECX, 0x34)));
    w32(in_ECX, 0x3e, local_38);
    w32(in_ECX, 0x3f, local_30);
    w32(in_ECX, 0x3c, local_38);
    w32(in_ECX, 0x3d, local_30);
    w32(in_ECX, 0x42, local_38);
    w32(in_ECX, 0x43, local_30);
    w32(in_ECX, 0x40, local_38);
    w32(in_ECX, 0x41, local_30);
    iVar3 = s32(in_ECX, 0x46);
    if ((s32(in_ECX, 0x46) <= s32(in_ECX, 0x47))) {
      iVar3 = s32(in_ECX, 0x47);
    }
    if ((iVar3 <= s32(in_ECX, 0x4a))) {
      iVar3 = s32(in_ECX, 0x4a);
    }
    w32(in_ECX, 0x47, iVar3);
    w32(in_ECX, 0x4a, s32(in_ECX, 0x47));
    w32(in_ECX, 0x46, s32(in_ECX, 0x4a));
  }
  w32(in_ECX, 0xc, 0);
  if (((_MEM[(in_ECX + 0xf)] & 0x40) !== 0)) {
    w32(in_ECX, (s32(in_ECX, 0xc) * 2 + 0xab), 1);
    w32(in_ECX, 0xc, (s32(in_ECX, 0xc) + 1));
  }
  if (((_MEM[(in_ECX + 0x3f)] & 2) === 0)) {
    w32(in_ECX, (s32(in_ECX, 0xc) * 2 + 0xab), 0);
    w32(in_ECX, 0xc, (s32(in_ECX, 0xc) + 1));
  }
  if (((_MEM[(in_ECX + 0xf)] & 1) !== 0)) {
    w32(in_ECX, (s32(in_ECX, 0xc) * 2 + 0xab), 2);
    w32(in_ECX, 0xc, (s32(in_ECX, 0xc) + 1));
  }
  if ((((((s32(in_ECX, 9) + s32(in_ECX, 0xa)) + s32(in_ECX, 0xb)) + s32(in_ECX, 0xc)) + s32(in_ECX, 8)) === 0)) {
    if ((s32(in_ECX, 0) !== 0)) {
      w32(in_ECX, 0x3e, (s32(in_ECX, 0x3e) + s32(in_ECX, 0x3a)));
      w32(in_ECX, 0x3f, (s32(in_ECX, 0x3f) + s32(in_ECX, 0x3b)));
    }
  }
  else if (((s32(in_ECX, 0xf) & 0x1004) === 0)) {
    local_28 = 0;
    if ((s32(in_ECX, 0x8d) !== 0)) {
      local_18 = FUN_00472cf0(s32(in_ECX, 0x48), s32(in_ECX, 0x4c));
      if ((s32((s32(in_ECX, 0x8d) + 8), 0) === 0)) {
        w32(in_ECX, 0x3e, (s32(in_ECX, 0x3e) + local_18));
        w32(in_ECX, 0x3c, (s32(in_ECX, 0x3c) + local_18));
        w32(in_ECX, 0x42, (s32(in_ECX, 0x42) + local_18));
        w32(in_ECX, 0x10, (s32(in_ECX, 0x10) + local_18));
      }
      else {
        iVar3 = s32(in_ECX, 0x47);
        if ((s32(in_ECX, 0x47) <= local_18)) {
          iVar3 = local_18;
        }
        w32(in_ECX, 0x47, iVar3);
      }
      for (/* cond: (local_20 !== 0) */); local_20 = (local_20 !== 0); local_20 = s32((local_20 + 0x10), 0)) {
        uVar2 = FUN_004bb540(s32(in_ECX, 0x4c));
        iVar3 = FUN_00472cf0(uVar2);
        local_28 = (local_28 + iVar3);
        if ((s32((local_20 + 0x10), 0) !== 0)) {
          local_28 = (local_28 + s32(in_ECX, 0x30));
        }
      }
    }
    if ((iVar3 !== 0)) {
      local_70 = FUN_0059f64a(0);
      w32(in_ECX, 0x3d, (s32(in_ECX, 0x3d) + (s32(in_ECX, 0x30) + local_70)));
      w32(in_ECX, 0x43, (s32(in_ECX, 0x43) + (s32(in_ECX, 0x30) + local_70)));
    }
    if ((s32(in_ECX, 0x8a) !== 0)) {
      local_3c = s32(in_ECX, 0xe);
      if ((local_3c < 2)) {
        local_3c = 1;
      }
      local_3c = (((s32(in_ECX, 0xe) + -1) + s32(in_ECX, 0xa)) / local_3c | 0);
      local_10 = s32(in_ECX, 0x2d) * local_3c;
      if (((_MEM[(in_ECX + 0x3d)] & 0x10) !== 0)) {
        w32(in_ECX, 0x12, 0);
        local_10 = s32(in_ECX, 0x15);
        if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
          iVar3 = FUN_006e7d8c(2);
          w32(in_ECX, 0x70, iVar3);
          iVar3 = FUN_006e7d8c(3);
          w32(in_ECX, 0x72, iVar3);
          FUN_004086c0((in_ECX + 0x4e), (s32(in_ECX, 0x78) + s32(in_ECX, 0x3c)), s32(in_ECX, 0x3d), s32(in_ECX, 0x13), s32(in_ECX, 0x15));
          w32(in_ECX, 0x56, s32(in_ECX, 0x4e));
          w32(in_ECX, 0x57, s32(in_ECX, 0x4f));
          w32(in_ECX, 0x58, s32(in_ECX, 0x50));
          w32(in_ECX, 0x59, s32(in_ECX, 0x51));
          if (((_MEM[(in_ECX + 0x3f)] & 1) !== 0)) {
            if ((s32(in_ECX, 0xe) === 1)) {
              FUN_004086c0((in_ECX + 0x5e), (s32(in_ECX, 0x50) - s32(in_ECX, 0x70)), s32(in_ECX, 0x3d), s32(in_ECX, 0x70), s32(in_ECX, 0x15));
              w32(in_ECX, 0x58, (s32(in_ECX, 0x58) - s32(in_ECX, 0x70)));
            }
            else {
              w32(in_ECX, 0x15, (s32(in_ECX, 0x15) + s32(in_ECX, 0x72)));
              w32(in_ECX, 0x51, (s32(in_ECX, 0x51) + s32(in_ECX, 0x72)));
              w32(in_ECX, 0x59, (s32(in_ECX, 0x59) + s32(in_ECX, 0x72)));
              local_10 = s32(in_ECX, 0x15);
              FUN_004086c0((in_ECX + 0x66), (s32(in_ECX, 0x78) + s32(in_ECX, 0x3c)), (s32(in_ECX, 0x51) - s32(in_ECX, 0x72)), s32(in_ECX, 0x13), s32(in_ECX, 0x72));
              w32(in_ECX, 0x59, (s32(in_ECX, 0x59) - s32(in_ECX, 0x72)));
            }
          }
          FUN_004bb800((in_ECX + 0x56), 1, 1);
          w32(in_ECX, 0x74, s32(in_ECX, 0x56));
          w32(in_ECX, 0x76, s32(in_ECX, 0x57));
          iVar3 = FUN_00407f90((in_ECX + 0x56));
          w32(in_ECX, 0x7a, (iVar3 / s32(in_ECX, 0xe) | 0));
          iVar3 = FUN_0059e3fa();
          w32(in_ECX, 0x7c, iVar3);
          local_c = FUN_0059fc19(0);
          local_6c = FUN_0059fb78(local_c);
          iVar3 = FUN_0059fb78(s32(in_ECX, 0x88));
          while (((s32(in_ECX, 0x17) * s32(in_ECX, 0xe) + local_6c) <= iVar3)) {
            if ((s32(in_ECX, 0xe) === 1)) {
              local_6c = (local_6c + 1);
            }
            else {
              local_6c = (local_6c + s32(in_ECX, 0x17));
            }
          }
          iVar3 = FUN_0059fc19(local_6c);
          w32(in_ECX, 0x84, iVar3);
        }
        if (((_MEM[(in_ECX + 0x3e)] & 0x40) !== 0)) {
          w32(in_ECX, 0x12, 1);
          if ((local_10 < s32(in_ECX, 0x16))) {
            local_10 = s32(in_ECX, 0x16);
          }
          if (((_MEM[(in_ECX + 0x3e)] & 4) === 0)) {
            iVar3 = FUN_006e7d8c(2);
            w32(in_ECX, 0x71, iVar3);
            iVar3 = FUN_006e7d8c(3);
            w32(in_ECX, 0x73, iVar3);
            FUN_004086c0((in_ECX + 0x52), (s32(in_ECX, 0x79) + s32(in_ECX, 0x3c)), s32(in_ECX, 0x3d), s32(in_ECX, 0x14), s32(in_ECX, 0x16));
            w32(in_ECX, 0x5a, s32(in_ECX, 0x52));
            w32(in_ECX, 0x5b, s32(in_ECX, 0x53));
            w32(in_ECX, 0x5c, s32(in_ECX, 0x54));
            w32(in_ECX, 0x5d, s32(in_ECX, 0x55));
            if (((_MEM[(in_ECX + 0x3f)] & 1) !== 0)) {
              if ((s32(in_ECX, 0xe) === 1)) {
                FUN_004086c0((in_ECX + 0x62), (s32(in_ECX, 0x54) - s32(in_ECX, 0x71)), s32(in_ECX, 0x3d), s32(in_ECX, 0x71), s32(in_ECX, 0x16));
                w32(in_ECX, 0x5c, (s32(in_ECX, 0x5c) - s32(in_ECX, 0x71)));
              }
              else {
                w32(in_ECX, 0x16, (s32(in_ECX, 0x16) + s32(in_ECX, 0x73)));
                w32(in_ECX, 0x55, (s32(in_ECX, 0x55) + s32(in_ECX, 0x73)));
                w32(in_ECX, 0x5d, (s32(in_ECX, 0x5d) + s32(in_ECX, 0x73)));
                if ((local_10 < s32(in_ECX, 0x16))) {
                  local_10 = s32(in_ECX, 0x16);
                }
                FUN_004086c0((in_ECX + 0x6a), (s32(in_ECX, 0x79) + s32(in_ECX, 0x3c)), (s32(in_ECX, 0x55) - s32(in_ECX, 0x73)), s32(in_ECX, 0x14), s32(in_ECX, 0x73));
                w32(in_ECX, 0x5d, (s32(in_ECX, 0x5d) - s32(in_ECX, 0x73)));
              }
            }
            FUN_004bb800((in_ECX + 0x5a), 1, 1);
            w32(in_ECX, 0x75, s32(in_ECX, 0x5a));
            w32(in_ECX, 0x77, s32(in_ECX, 0x5b));
            iVar3 = FUN_00407f90((in_ECX + 0x5a));
            w32(in_ECX, 0x7b, (iVar3 / s32(in_ECX, 0xe) | 0));
            iVar3 = FUN_0059e3fa();
            w32(in_ECX, 0x7d, iVar3);
            local_c = FUN_0059fc19(0);
            local_6c = FUN_0059fb78(local_c);
            iVar3 = FUN_0059fb78(s32(in_ECX, 0x88));
            while (((s32(in_ECX, 0x18) * s32(in_ECX, 0xe) + local_6c) <= iVar3)) {
              if ((s32(in_ECX, 0xe) === 1)) {
                local_6c = (local_6c + 1);
              }
              else {
                local_6c = (local_6c + s32(in_ECX, 0x18));
              }
            }
            iVar3 = FUN_0059fc19(local_6c);
            w32(in_ECX, 0x85, iVar3);
          }
          w32(in_ECX, 0x12, 0);
        }
      }
    }
    if ((s32(in_ECX, 0x8e) !== 0)) {
      local_24 = FUN_0059e448();
      local_24 = local_24 * s32(in_ECX, 9);
    }
    local_8 = ((local_24 + local_10) + local_70);
    if (((local_24 + local_10) !== 0)) {
      local_8 = (local_8 + s32(in_ECX, 0x30));
    }
    if (((_MEM[(in_ECX + 0x3e)] & 0x10) === 0)) {
      if ((local_8 !== 0)) {
        w32(in_ECX, 0x3e, (s32(in_ECX, 0x3e) + s32(in_ECX, 0x31)));
        w32(in_ECX, 0x3c, (s32(in_ECX, 0x3c) + s32(in_ECX, 0x31)));
        w32(in_ECX, 0x42, (s32(in_ECX, 0x42) + s32(in_ECX, 0x31)));
      }
      iVar3 = local_28;
      if ((local_28 <= local_8)) {
        iVar3 = local_8;
      }
      w32(in_ECX, 0x11, (s32(in_ECX, 0x11) + iVar3));
      w32(in_ECX, 0x10, (s32(in_ECX, 0x10) + s32(in_ECX, 0x47)));
    }
    if (((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) === 0)) {
      w32(in_ECX, 0x11, (s32(in_ECX, 0x11) + s32(in_ECX, 0x33)));
      w32(in_ECX, 0x35, (s32(in_ECX, 0x35) + s32(in_ECX, 0x33)));
    }
    else {
      local_78 = (s32(in_ECX, 0x10) - (s32(in_ECX, 0x33) - s32(in_ECX, 0x32)));
      w32(in_ECX, 0x4b, 0);
      for (/* cond: (local_1c < 3) */); local_1c = (local_1c < 3); local_1c = (local_1c + 1)) {
        iVar3 = FUN_0059e676(s32(PTR_DAT_00635a48, local_1c));
        if ((s32(in_ECX, 0x4b) <= iVar3)) {
          iVar3 = FUN_0059e676(s32(PTR_DAT_00635a48, local_1c));
          w32(in_ECX, 0x4b, iVar3);
        }
      }
      for (/* cond: (local_1c < s32(in_ECX, 0xd)) */); local_1c = (local_1c < s32(in_ECX, 0xd)); local_1c = (local_1c + 1)) {
        iVar3 = FUN_0059e676(s32(in_ECX, (local_1c + 0xa5)));
        if ((s32(in_ECX, 0x4b) <= iVar3)) {
          iVar3 = FUN_0059e676(s32(in_ECX, (local_1c + 0xa5)));
          w32(in_ECX, 0x4b, iVar3);
        }
      }
      local_2c = ((s32(in_ECX, 0x10) + (s32(in_ECX, 0x33) - s32(in_ECX, 0x32)) * -2) - ((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) + -1) * s32(in_ECX, 0x2f));
      local_34 = (local_2c % (s32(in_ECX, 0xc) + s32(in_ECX, 0xd)));
      local_2c = (local_2c / (s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) | 0);
      iVar3 = s32(in_ECX, 0x4b);
      if ((s32(in_ECX, 0x4b) <= local_2c)) {
        iVar3 = local_2c;
      }
      w32(in_ECX, 0x4b, iVar3);
      if ((s32(in_ECX, 0x4b) !== local_2c)) {
        local_34 = 0;
      }
      if (((_MEM[(in_ECX + 0x3e)] & 0x10) === 0)) {
        if ((local_8 !== 0)) {
          w32(in_ECX, 0x11, (s32(in_ECX, 0x11) + s32(in_ECX, 0x30) * 2));
        }
        iVar3 = FUN_0059e648();
        w32(in_ECX, 0x11, (s32(in_ECX, 0x11) + iVar3));
        if ((s32(in_ECX, 0x33) !== 0)) {
          if ((local_8 !== 0)) {
            w32(in_ECX, 0x35, (s32(in_ECX, 0x35) + s32(in_ECX, 0x30) * 2));
          }
          iVar3 = FUN_0059e648();
          w32(in_ECX, 0x35, (s32(in_ECX, 0x35) + iVar3));
        }
      }
      local_40 = ((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) + -1);
      local_1c = s32(in_ECX, 0xc);
      while ((-1 < local_1c)) {
        iVar3 = s32(in_ECX, 0x4b);
        w32(in_ECX, (local_1c * 2 + 0xac), (local_78 - iVar3));
        local_78 = ((local_78 - iVar3) - s32(in_ECX, 0x2f));
        for (/* cond: ((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) <= local_40) */); in_ECX = (in_ECX + 0xc);
            local_40 = (local_40 - (s32(in_ECX, 0xc) + s32(in_ECX, 0xd)))) {
          local_78 = (local_78 + -1);
        }
      }
      local_1c = s32(in_ECX, 0xd);
      while ((-1 < local_1c)) {
        iVar3 = s32(in_ECX, 0x4b);
        w32(in_ECX, ((s32(in_ECX, 0xc) + local_1c) * 2 + 0xac), (local_78 - iVar3));
        local_78 = ((local_78 - iVar3) - s32(in_ECX, 0x2f));
        for (/* cond: ((s32(in_ECX, 0xc) + s32(in_ECX, 0xd)) <= local_40) */); in_ECX = (in_ECX + 0xc);
            local_40 = (local_40 - (s32(in_ECX, 0xc) + s32(in_ECX, 0xd)))) {
          local_78 = (local_78 + -1);
        }
      }
    }
    iVar3 = s32(in_ECX, 7);
    if ((s32(in_ECX, 7) <= s32(in_ECX, 0x11))) {
      iVar3 = s32(in_ECX, 0x11);
    }
    w32(in_ECX, 0x11, iVar3);
    iVar3 = s32(in_ECX, 0x11);
    iVar4 = FUN_0059e648();
    w32(in_ECX, 0x45, (iVar3 - ((s32(in_ECX, 0x32) + iVar4) + s32(in_ECX, 0x2e))));
    if (((_MEM[(in_ECX + 0x3e)] & 0x10) === 0)) {
      FUN_005bcaa7(DAT_ffffffac);
      FUN_005a9600(DAT_ffffff98);
      if ((s32(in_ECX, 0x38) === -0x3e7)) {
        iVar3 = FUN_00407f90(DAT_ffffffac);
        w32(in_ECX, 0x38, ((iVar3 >> 1) - (s32(in_ECX, 0x10) >> 1)));
      }
      else if (((_MEM[(in_ECX + 0x3e)] & 1) !== 0)) {
        iVar3 = FUN_00589d50();
        w32(in_ECX, 0x38, (s32(in_ECX, 0x38) - iVar3));
      }
      if ((s32(in_ECX, 0x39) === -0x3e7)) {
        iVar3 = FUN_00407fc0(DAT_ffffffac);
        w32(in_ECX, 0x39, ((iVar3 >> 1) - (s32(in_ECX, 0x11) >> 1)));
      }
      else if ((s32(in_ECX, 0x39) < 0)) {
        if (((-(local_48 - local_5c)) < s32(in_ECX, 0x39))) {
          w32(in_ECX, 0x39, (s32(in_ECX, 0x39) - (local_48 - local_5c)));
        }
        w32(in_ECX, 0x39, (s32(in_ECX, 0x39) + ((local_48 + -1) - s32(in_ECX, 0x11))));
        if (((_MEM[(in_ECX + 0x3e)] & 1) !== 0)) {
          iVar3 = FUN_0043c5c0();
          w32(in_ECX, 0x39, (s32(in_ECX, 0x39) - iVar3));
        }
      }
      if ((s32(in_ECX, 0x10) <= iVar3)) {
        FUN_00407fc0(DAT_ffffffac);
      }
      w32(in_ECX, 0x3c, (s32(in_ECX, 0x3c) + s32(in_ECX, 0x3a)));
      w32(in_ECX, 0x3d, (s32(in_ECX, 0x3d) + s32(in_ECX, 0x3b)));
      w32(in_ECX, 0x3e, (s32(in_ECX, 0x3e) + s32(in_ECX, 0x3a)));
      w32(in_ECX, 0x3f, (s32(in_ECX, 0x3f) + s32(in_ECX, 0x3b)));
      w32(in_ECX, 0x42, (s32(in_ECX, 0x42) + s32(in_ECX, 0x3a)));
      w32(in_ECX, 0x43, (s32(in_ECX, 0x43) + s32(in_ECX, 0x3b)));
    }
    w32(in_ECX, 0x45, (s32(in_ECX, 0x45) + s32(in_ECX, 0x3b)));
    for (/* cond: (local_1c < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))) */); local_1c = (local_1c < (s32(in_ECX, 0xc) + s32(in_ECX, 0xd))); local_1c = (local_1c + 1)) {
      w32(in_ECX, (local_1c * 2 + 0xac), (s32(in_ECX, (local_1c * 2 + 0xac)) + s32(in_ECX, 0x3a)));
    }
    local_44 = 0;
  }
  return local_44;
}
