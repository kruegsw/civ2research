// Block 0x00440000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 355

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00440325 (param_1, param_2)

 {
  let local_8;

  (local_8 < (s8(DAT_0064f37a[param_1 * 0x58]) + -1)) (local_8 = param_2; local_8 = (local_8 < (s8(DAT_0064f37a[param_1 * 0x58]) + -1));
      local_8 = (local_8 + 1)) {
    w16((DAT_0064f384 + (local_8 * 2 + param_1 * 0x58)), 0, s16((DAT_0064f386 + (local_8 * 2 + param_1 * 0x58)), 0));
    DAT_0064f381[(param_1 * 0x58 + local_8)] = DAT_0064f382[(param_1 * 0x58 + local_8)];
  }
  DAT_0064f37a[param_1 * 0x58] = (DAT_0064f37a[param_1 * 0x58] + 0xff);
  w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 0x20000));
  return;
}


 export function FUN_004403ec (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  w16((DAT_0064f384 + (param_2 * 2 + param_1 * 0x58)), 0, param_3);
  uVar1 = FUN_005adfa0(param_4, -1, 0xf);
  DAT_0064f381[(param_1 * 0x58 + param_2)] = uVar1;
  w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 0x20000));
  return;
}


 export function FUN_00440453 (param_1, param_2, param_3)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_8;

  (local_10 < s8(DAT_0064f37a[param_1 * 0x58])) (local_10 = 0; local_10 = (local_10 < s8(DAT_0064f37a[param_1 * 0x58])); local_10 = (local_10 + 1)) {
    if ((s8(DAT_0064f381[(param_1 * 0x58 + local_10)]) === param_3)) {
      return;
    }
  }
  if ((DAT_0064f37a[param_1 * 0x58] < 3)) {
    cVar1 = DAT_0064f37a[param_1 * 0x58];
    DAT_0064f37a[param_1 * 0x58] = (DAT_0064f37a[param_1 * 0x58] + 1);
    FUN_004403ec(param_1, s8(cVar1), param_2, param_3);
    FUN_0043d400(param_1);
    FUN_0043d400(param_2);
  }
  else {
    local_1c = 0x270f;
    (local_10 < s8(DAT_0064f37a[param_1 * 0x58])) (local_10 = 0; local_10 = (local_10 < s8(DAT_0064f37a[param_1 * 0x58])); local_10 = (local_10 + 1)) {
      if ((param_3 < 0)) {
        return;
      }
      iVar2 = ((s16((DAT_0064f384 + (param_1 * 0x58 + local_10 * 2)), 0)) << 16 >> 16);
      local_8 = ((s16((DAT_0064f35e + iVar2 * 0x58), 0)) << 16 >> 16);
      local_14 = FUN_00488a45(s8(DAT_0064f348[param_1 * 0x58]), ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + iVar2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar2 * 0x58), 0)) << 16 >> 16));
      iVar3 = FUN_0043d20a(param_1, 0x20);
      if ((local_14 < 2)) {
        local_14 = 1;
      }
      if ((local_14 !== 0)) {
        local_8 = (local_8 + (local_14 * local_8 >> 1));
      }
      if ((DAT_0064f348[param_1 * 0x58] === DAT_0064f348[iVar2 * 0x58])) {
        local_8 = (local_8 >> 1);
      }
      if ((local_8 < local_1c)) {
        local_1c = local_8;
        local_20 = local_10;
      }
    }
    if ((local_1c <= ((s16((DAT_0064f35e + param_2 * 0x58), 0)) << 16 >> 16))) {
      FUN_004403ec(param_1, local_20, param_2, param_3);
      FUN_0043d400(param_1);
      FUN_0043d400(param_2);
    }
  }
  return;
}


 export function FUN_00440750 (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let iVar9;
  let uVar10;
  let uVar11;
  let bVar12;
  let uVar13;
  let local_40;
  let local_34;
  let local_30;
  let local_28;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar4 = s8(bVar1);
  bVar2 = DAT_0064f348[param_2 * 0x58];
  iVar5 = s8(bVar2);
  if ((DAT_00656100[param_1 * 0x20] === 0xff)) {
    local_14 = -1;
  }
  else {
    local_14 = u8(DAT_00656100[param_1 * 0x20]);
  }
  if ((local_14 < 0)) {
    local_14 = 0;
  }
  local_1c = FUN_005ae31d(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16));
  if (((DAT_00655af0 & 4) !== 0)) {
    local_1c = ((local_1c << 2) / 5 | 0);
  }
  if (((DAT_00655af0 & 8) !== 0)) {
    local_1c = ((local_1c * 5 + ((local_1c * 5 >> 0x1f) & 3)) >> 2);
  }
  local_1c = ((((s16((DAT_0064f35e + local_14 * 0x58), 0)) << 16 >> 16) + ((s16((DAT_0064f35e + param_2 * 0x58), 0)) << 16 >> 16)) * (local_1c + 0xa) / 0x18 | 0);
  iVar6 = FUN_005b8a81(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
  iVar7 = FUN_005b8a81(((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16));
  if ((iVar7 !== iVar6)) {
    local_1c = (local_1c << 1);
  }
  if ((iVar4 === iVar5)) {
    local_1c = (local_1c >> 1);
  }
  uVar8 = s8(DAT_006560fd[param_1 * 0x20]);
  bVar12 = (DAT_006560f6[param_1 * 0x20] === 0x31);
  if (bVar12) {
    local_1c = (local_1c + (local_1c >> 1));
  }
  local_34 = FUN_00488a45(iVar4, ((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16));
  iVar9 = FUN_0043d20a(param_2, 0x20);
  if ((iVar9 !== 0)) {
    if ((iVar7 === iVar6)) {
      local_34 = (local_34 + 1);
    }
    else {
      local_34 = (local_34 + 2);
    }
  }
  iVar6 = FUN_0043d20a(param_2, 0x19);
  if ((iVar6 !== 0)) {
    local_34 = (local_34 + 1);
  }
  iVar6 = FUN_0043d20a(local_14, 0x19);
  if ((iVar6 !== 0)) {
    local_34 = (local_34 + 1);
  }
  local_1c = (local_1c + (local_34 * local_1c >> 1));
  local_30 = 0;
  /* switch */ () {
  case 3 :
  case 5 :
  case 8 :
  case 10 :
    local_30 = (local_1c / 2 | 0);
    break;
  case 9 :
  case 0xb :
  case 0xc :
  case 0xd :
    local_30 = local_1c;
    break;
  case 0xe :
    local_30 = (local_1c * 3 / 2 | 0);
    break;
  case 0xf :
    local_30 = local_1c * 2;
  }
  (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    if ((s8(DAT_0064f37e[(param_2 * 0x58 + local_18)]) === uVar8)) {
      if ((s8(DAT_006560f7[param_1 * 0x20]) === iVar4)) {
        local_1c = (local_1c * 2 + local_30);
      }
      else {
        local_1c = (local_1c + local_30) * 2;
      }
    }
  }
  if ((iVar6 === 0)) {
    local_1c = (local_1c << 1);
  }
  iVar6 = FUN_004bd9f0(iVar4, 0x43);
  if ((iVar6 !== 0)) {
    local_1c = (local_1c - (local_1c / 3 | 0));
  }
  iVar6 = FUN_004bd9f0(iVar4, 0x1e);
  if ((iVar6 !== 0)) {
    local_1c = (local_1c - (local_1c / 3 | 0));
  }
  uVar13 = 0x7530;
  iVar6 = _rand();
  iVar6 = FUN_004c2788(iVar4, ((iVar6 % 0xa) + 0xc8), uVar13);
  uVar13 = FUN_005adfa0((iVar6 * 2 / 3 | 0));
  iVar6 = FUN_005adfa0(local_1c, 0, uVar13);
  if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((uVar8 < 0)) {
      FUN_004271e8(0, s32((DAT_00628420 + 0x100), 0));
    }
    else {
      FUN_004271e8(0, s32((DAT_0064b168 + uVar8 * 4), 0));
    }
    FUN_0040ff60(1, (DAT_0064f360 + local_14 * 0x58));
    FUN_0040ff60(2, (DAT_0064f360 + param_2 * 0x58));
    FUN_00421da0(0, iVar6);
    FUN_0046e020((((-(!bVar12)) & 0x14) + 0x16), 1, 0, 0);
    if ((uVar8 < 0)) {
      if ((DAT_00655b02 < 3)) {
        FUN_004442e0(s_FOODCARAVAN_006262ec, param_1);
      }
      else {
        if ((DAT_006d1da0 === iVar4)) {
          FUN_004442e0(s_FOODCARAVAN_006262f8, param_1);
        }
        else if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_00511880(0x10, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar4 * 4), 0) * 0x54), 0), 3, 1, param_1, bVar12);
        }
        if ((iVar4 !== iVar5)) {
          if ((DAT_006d1da0 === iVar5)) {
            FUN_004442e0(s_FOODCARAVAN_00626304, param_1);
          }
          else if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            FUN_00511880(0x10, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar5 * 4), 0) * 0x54), 0), 3, 1, param_1, bVar12);
          }
        }
      }
    }
    else if ((DAT_00655b02 < 3)) {
      FUN_004442e0(s_CARAVAN_006262d4, param_1);
    }
    else {
      if ((DAT_006d1da0 === iVar4)) {
        FUN_004442e0(s_CARAVAN_006262dc, param_1);
      }
      else if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_00511880(0xf, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar4 * 4), 0) * 0x54), 0), 3, 1, param_1, bVar12);
      }
      if ((iVar4 !== iVar5)) {
        if ((DAT_006d1da0 === iVar5)) {
          FUN_004442e0(s_CARAVAN_006262e4, param_1);
        }
        else if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_00511880(0xf, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar5 * 4), 0) * 0x54), 0), 3, 1, param_1, bVar12);
        }
      }
    }
  }
  FUN_00456f20(iVar5, iVar4, -10);
  FUN_00456f20(iVar4, iVar5, -10);
  if ((uVar8 < 0)) {
    FUN_004eb4ed(param_2, 0);
    w16((DAT_0064f35a + param_2 * 0x58), 0, (s16((DAT_0064f35a + param_2 * 0x58), 0) + ((((s8(DAT_0064f349[param_2 * 0x58]) + 1) * DAT_006a6560 / 2 | 0)) & 0xFFFF)));
  }
  else {
    w32((DAT_0064c6a2 + iVar4 * 0x594), 0, (s32((DAT_0064c6a2 + iVar4 * 0x594), 0) + iVar6));
    w16((DAT_0064c6a8 + iVar4 * 0x594), 0, (s16((DAT_0064c6a8 + iVar4 * 0x594), 0) + ((iVar6) & 0xFFFF)));
    if ((DAT_006d1da0 === iVar4)) {
      FUN_00569363(1);
    }
  }
  uVar3 = DAT_006560f6[param_1 * 0x20];
  FUN_005b6042(param_1, 1);
  FUN_00440453(local_14, param_2, uVar8);
  if ((-1 < uVar8)) {
    local_10 = 0;
    local_40 = -1;
    (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
      uVar10 = _rand();
      uVar11 = (uVar10 >> 0x1f);
      local_8 = (((((uVar10 ^ uVar11) - uVar11) & 7) ^ uVar11) - uVar11);
      local_28 = s8(DAT_0064f37b[(param_2 * 0x58 + local_18)]);
      if ((local_28 < 0)) {
        if ((local_28 < 1)) {
          local_28 = ((~local_28) + 1);
        }
      }
      else {
        local_8 = (local_8 + 0xa);
      }
      if ((local_28 !== uVar8)) {
        if ((9 < local_8)) {
          (local_24 < 3) (local_24 = 0; local_24 = (local_24 < 3); local_24 = (local_24 + 1)) {
            if ((s8(DAT_0064f37e[(local_14 * 0x58 + local_24)]) === local_28)) {
              local_8 = (local_8 + 0xa);
            }
          }
        }
        if ((local_10 <= local_8)) {
          local_10 = local_8;
          local_40 = local_28;
        }
      }
    }
    FUN_00440453(param_2, local_14, local_40);
    if ((2 < DAT_00655b02)) {
      FUN_0046e020((((-(!bVar12)) & 0x14) + 0x16), 1, 0, 0);
      uVar13 = FUN_00410070(iVar4);
      FUN_0040ff60(0, uVar13);
      FUN_004271e8(1, s32((DAT_0064b168 + uVar8 * 4), 0));
      FUN_0040ff60(2, (DAT_0064f360 + local_14 * 0x58));
      FUN_0040ff60(3, (DAT_0064f360 + param_2 * 0x58));
      FUN_004271e8(4, s32((DAT_0064b168 + local_40 * 4), 0));
      if ((iVar4 !== iVar5)) {
        FUN_004442a0(s_CARAVANOTHER_00626310, uVar3, (((DAT_00633584 === 0) - 1) & 8));
      }
      else if ((DAT_006d1da0 !== iVar5)) {
        FUN_00511880(0x11, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar5 * 4), 0) * 0x54), 0), 5, 0, uVar3, (((DAT_00633584 === 0) - 1) & 8));
      }
      if ((iVar4 !== iVar5)) {
        if ((DAT_006d1da0 === iVar4)) {
          FUN_004442a0(s_CARAVANOTHER_00626320, uVar3, (((DAT_00633584 === 0) - 1) & 8));
        }
        else if ((DAT_006d1da0 !== iVar4)) {
          FUN_00511880(0x11, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar4 * 4), 0) * 0x54), 0), 5, 0, uVar3, (((DAT_00633584 === 0) - 1) & 8));
        }
      }
    }
  }
  return;
}


 export function FUN_004413d1 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let iVar7;
  let uVar8;
  let iVar9;
  let local_30;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;

  if ((s32((DAT_0064f394 + param_1 * 0x58), 0) !== 0)) {
    DAT_006ad8c8 = 1;
    if ((cVar1 !== 0)) {
      iVar2 = DAT_006aa760;
      DAT_006aa760 = 1;
      iVar3 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
      iVar4 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
      iVar5 = s8(DAT_0064f348[param_1 * 0x58]);
      w16((DAT_0064c708 + iVar5 * 0x594), 0, (s16((DAT_0064c708 + iVar5 * 0x594), 0) + 0xffff));
      do {
        local_30 = ((DAT_00655b16) << 16 >> 16);
        while ((iVar7 !== 1)) {
          while ((DAT_006560f6[local_30 * 0x20] !== 9)) {
            do {
              local_30 = (local_30 + -1);
              if ((local_30 < 0)) {
                w32((DAT_0064f394 + param_1 * 0x58), 0, 0);
                if (((((DAT_00655b18) << 16 >> 16) - 1) === param_1)) {
                  DAT_00655b18 = (DAT_00655b18 + 0xffff);
                }
                (local_10 < ((DAT_00655b18) << 16 >> 16)) (local_10 = 0; local_10 = (local_10 < ((DAT_00655b18) << 16 >> 16)); local_10 = (local_10 + 1)) {
                  if ((s32((DAT_0064f394 + local_10 * 0x58), 0) !== 0)) {
                    local_30 = s8(DAT_0064f37a[local_10 * 0x58]);
                    while ((-1 < local_30)) {
                      if ((((s16((DAT_0064f384 + (local_10 * 0x58 + local_30 * 2)), 0)) << 16 >> 16) === param_1)) {
                        FUN_00440325(local_10, local_30);
                      }
                    }
                  }
                }
                (local_10 < 0x1c) (local_10 = 0; local_10 = (local_10 < 0x1c); local_10 = (local_10 + 1)) {
                  if ((((s16((DAT_00655be6 + local_10 * 2), 0)) << 16 >> 16) === param_1)) {
                    w16((DAT_00655be6 + local_10 * 2), 0, 0xfffe);
                  }
                }
                local_28 = 0;
                FUN_005b9ec6();
                FUN_005b94fc(iVar3, iVar4, 2, 0, 1);
                (local_10 < 0x2d) (local_10 = 0; local_10 = (local_10 < 0x2d); local_10 = (local_10 + 1)) {
                  uVar8 = FUN_005ae052((s8(DAT_00628370[local_10]) + iVar3));
                  iVar7 = (s8(DAT_006283a0[local_10]) + iVar4);
                  iVar9 = FUN_004087c0(uVar8, iVar7);
                  if ((iVar9 === 0)) {
                    uVar6 = FUN_005b8c18(uVar8, iVar7, 1);
                    FUN_005b98b7(uVar8, iVar7, (uVar6 | 8));
                    if ((local_10 < 0x15)) {
                      iVar9 = FUN_005b8af0(uVar8, iVar7);
                      if ((iVar9 === iVar5)) {
                        FUN_005b9c49(uVar8, iVar7, 0, 1);
                      }
                      iVar7 = FUN_005b8da4(uVar8, iVar7);
                      if ((iVar7 !== iVar5)) {
                        local_14 = ((iVar7) & 0xFF);
                        local_28 = (local_28 | (1 << (local_14 & 0x1f)));
                      }
                    }
                  }
                }
                FUN_005b9f1c();
                if ((local_28 !== 0)) {
                  (-1 < local_30) (local_30 = FUN_005b2e69(iVar3, iVar4); -1 = (-1 < local_30);
                      local_30 = FUN_005b2c82(local_30)) {
                    DAT_006560f9[local_30 * 0x20] = (DAT_006560f9[local_30 * 0x20] | ((local_28) & 0xFF));
                  }
                }
                (local_24 < ((DAT_00655b18) << 16 >> 16)) (local_24 = 0; local_24 = (local_24 < ((DAT_00655b18) << 16 >> 16)); local_24 = (local_24 + 1)) {
                  if ((s32((DAT_0064f394 + local_24 * 0x58), 0) !== 0)) {
                    FUN_0043f7a7(local_24);
                  }
                }
                FUN_0050c449(param_1);
                DAT_006aa760 = iVar2;
                if ((iVar2 === 0)) {
                  FUN_00509429();
                }
                if ((2 < DAT_00655b02)) {
                  FUN_004b0b53(0xff, 2, 0, 0, 0);
                  FUN_0046b14d(0x89, 0xff, param_1, 0, 0, 0, 0, 0, 0, 0);
                  FUN_0046b14d(0x8a, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
                  XD_FlushSendBuffer(0x1388);
                }
                DAT_006ad8c8 = 0;
                return;
              }
            } while ((u8(DAT_00656100[local_30 * 0x20]) !== param_1)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90c8 === -2)) {
      FUN_005d225b(s_Delete_City:_Connection_to_serve_00626330);
      FUN_00410030(s_SERVERCONNECTTIME_00626360, DAT_0063fc58, 0);
      DAT_00628044 = 0;
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


 export function FUN_00441a79 (param_1)

 {
  let iVar1;

  if ((iVar1 === 0)) {
    return 9;
  }
  if ((iVar1 === 0)) {
    return 0x17;
  }
  return 0;
}


 export function FUN_00441b11 (param_1, param_2)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let unaff_FS_OFFSET;
  let local_338;
  let local_330;
  let local_328;
  let local_324;
  let local_320;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00442529;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  cVar1 = DAT_0064f379[param_1 * 0x58];
  bVar2 = DAT_0064f348[param_1 * 0x58];
  iVar4 = s8(bVar2);
  if ((DAT_0064f379[param_1 * 0x58] < 0x3e)) {
    DAT_0064c7f4[(iVar4 * 0x594 + s8(DAT_0064f379[param_1 * 0x58]))] = (DAT_0064c7f4[(iVar4 * 0x594 + s8(DAT_0064f379[param_1 * 0x58]))] + 0xff);
  }
  if ((0x62 < param_2)) {
    param_2 = FUN_00498e8b(param_1, 0, 0);
  }
  if ((param_2 < 0x63)) {
    if ((DAT_0062c5b8 === 0)) {
      uVar3 = FUN_004e74df(param_1, param_2);
      w16((DAT_0064f35c + param_1 * 0x58), 0, uVar3);
    }
    DAT_0064f379[param_1 * 0x58] = ((param_2) & 0xFF);
  }
  if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if ((cVar1 < 0xda)) {
      local_330 = 0;
      local_2c = 0;
      (local_14 < ((DAT_00655b18) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
        if ((local_14 !== param_1)) {
          if ((DAT_0064f379[local_14 * 0x58] === cVar1)) {
            local_330 = (local_330 + 1);
          }
          if ((DAT_0064f379[param_1 * 0x58] === DAT_0064f379[local_14 * 0x58])) {
            local_2c = (local_2c + 1);
          }
        }
      }
    }
    if ((DAT_0064f379[param_1 * 0x58] < 0xda)) {
      if ((0xd9 < cVar1)) {
        w16((DAT_0064f35c + param_1 * 0x58), 0, (s16((DAT_0064f35c + param_1 * 0x58), 0) / 2 | 0));
      }
      if ((DAT_0064f379[param_1 * 0x58] < 1)) {
        local_328 = ((~s8(DAT_0064f379[param_1 * 0x58])) + 1);
      }
      else {
        local_328 = s8(DAT_0064f379[param_1 * 0x58]);
      }
      local_28 = (local_328 + -39);
      if ((cVar1 < 0xda)) {
        local_324 = (-39 - s8(cVar1));
      }
      else {
        local_324 = 0;
      }
      uVar5 = FUN_00493c7d(iVar4);
      FUN_0040ff60(1, uVar5);
      if ((local_2c === 0)) {
        if ((s16((DAT_00655be6 + local_324 * 2), 0) !== 0xffff)) {
          if ((local_330 !== 0)) {
            (local_1c < ((DAT_00655b18) << 16 >> 16)) (local_1c = 0; local_1c = (local_1c < ((DAT_00655b18) << 16 >> 16)); local_1c = (local_1c + 1)) {
              if ((DAT_0064f379[local_1c * 0x58] === cVar1)) {
                DAT_0064f379[local_1c * 0x58] = DAT_0064f379[param_1 * 0x58];
              }
            }
          }
          if ((DAT_00654fa8 === 0)) {
            if ((cVar1 < 1)) {
              local_338 = ((~s8(cVar1)) + 1);
            }
            else {
              local_338 = s8(cVar1);
            }
            FUN_004271e8(2, s32((DAT_0064c488 + local_338 * 8), 0));
            FUN_004271e8(3, s32((DAT_0064c488 + local_328 * 8), 0));
            FUN_0043c9d0(s_SWITCHWONDER_00626380);
            FUN_0059ec88((DAT_00645160 + local_328 * 0x3c), 0, 0);
            local_320 = DAT_fffffce0;
            if ((2 < DAT_00655b02)) {
              FUN_00511880(0x13, 0xff, 4, 0, local_328, 8);
            }
            FUN_0040bc80(0);
          }
        }
        else if ((DAT_00654fa8 === 0)) {
          FUN_004271e8(2, s32((DAT_0064c488 + local_328 * 8), 0));
          FUN_0043c9d0(s_STARTWONDER_00626374);
          FUN_0059ec88((DAT_00645160 + local_328 * 0x3c), 0, 0);
          local_320 = DAT_fffffce0;
          if ((2 < DAT_00655b02)) {
            FUN_00511880(0x12, 0xff, 3, 0, local_328, 8);
          }
          FUN_0040bc80(0);
        }
      }
      if ((DAT_0064c6b7[(iVar4 * 0x594 + local_18)] === 0)) {
        local_20 = 1;
        (local_24 < 8) (local_24 = 1; local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
          if ((((1 << (((local_24) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((DAT_0064c6b7[(local_24 * 0x594 + local_18)] === 0)) {
              local_20 = 0;
            }
            else {
              local_20 = 1;
            }
          }
        }
        if ((local_20 !== 0)) {
          iVar6 = (u8(DAT_00655b08) + u8(DAT_0064c6b7[(iVar4 * 0x594 + local_18)]) * -2);
          if ((iVar6 < 1)) {
            iVar6 = 0;
          }
          w16((DAT_0064f35c + param_1 * 0x58), 0, (((iVar6) & 0xFFFF) * u8(DAT_0064c48c[local_328 * 8]) + s16((DAT_0064f35c + param_1 * 0x58), 0)));
        }
      }
    }
    else if ((local_330 === 0)) {
      if ((cVar1 < 1)) {
        local_328 = ((~s8(cVar1)) + 1);
      }
      else {
        local_328 = s8(cVar1);
      }
      local_28 = (local_328 + -39);
      if ((DAT_00654fa8 === 0)) {
        uVar5 = FUN_00493c7d(iVar4);
        FUN_0040ff60(1, uVar5);
        FUN_004271e8(2, s32((DAT_0064c488 + local_328 * 8), 0));
        FUN_0043c9d0(s_ABANDONWONDER_00626390);
        FUN_0059ec88((DAT_00645160 + local_328 * 0x3c), 0, 0);
        local_320 = DAT_fffffce0;
        if ((2 < DAT_00655b02)) {
          FUN_00511880(0x14, 0xff, 3, 0, local_328, 8);
        }
        FUN_0040bc80(0);
      }
    }
  }
  if ((DAT_0064f379[param_1 * 0x58] < 0x3e)) {
    DAT_0064c7f4[(iVar4 * 0x594 + s8(DAT_0064f379[param_1 * 0x58]))] = (DAT_0064c7f4[(iVar4 * 0x594 + s8(DAT_0064f379[param_1 * 0x58]))] + 1);
  }
  local_8 = -1;
  FUN_0044251d();
  FUN_00442533();
  return;
}


 export function FUN_0044251d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00442533 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00442541 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  if ((((1 << (param_1 & 0x1f)) & u8(DAT_006c31a9)) === 0)) {
    (local_8 < ((DAT_00655b18) << 16 >> 16)) (local_8 = 0; local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
      if ((iVar1 === param_2)) {
        FUN_00441b11(local_8, 0x63);
      }
    }
  }
  return;
}


 export function FUN_0044263f (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_8;

  if ((param_2 < 0x3f)) {
    (local_8 < 8) (local_8 = 0; local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      uVar1 = FUN_005ae052((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628350[local_8])));
      iVar2 = (((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628360[local_8]));
      iVar3 = FUN_004087c0(uVar1, iVar2);
      if ((iVar2 === param_2)) {
        return 1;
      }
    }
  }
  return 0;
}


 export function FUN_0044272d (param_1, param_2, param_3)

 {
  let sVar1;
  let sVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let local_24;
  let local_20;
  let local_c;
  let local_8;

  local_8 = 0;
  local_20 = 0;
  sVar1 = s16((DAT_0064f340 + param_1 * 0x58), 0);
  sVar2 = s16((DAT_0064f342 + param_1 * 0x58), 0);
  (local_c < 8) (local_c = 0; local_c = local_c; local_c = (local_c + 1)) {
    uVar3 = FUN_005ae052((s8(DAT_00628350[local_c]) + ((sVar1) << 16 >> 16)));
    iVar4 = (s8(DAT_00628360[local_c]) + ((sVar2) << 16 >> 16));
    iVar5 = FUN_004087c0(uVar3, iVar4);
    if ((iVar5 !== 0)) {
      local_20 = FUN_005b8a81(uVar3, iVar4);
      local_24 = ((s16((DAT_00666134 + local_20 * 0x10), 0)) << 16 >> 16);
      if ((0x3e < local_20)) {
        local_24 = 1;
      }
      if ((local_8 <= local_24)) {
        local_8 = local_24;
      }
      local_c = (local_c + (2 - (local_c & 1)));
    }
  }
  if ((param_2 !== 0)) {
    w32(param_2, 0, local_8);
  }
  if ((param_3 !== 0)) {
    w32(param_3, 0, local_c);
  }
  return local_20;
}


 export function FUN_00442885 (param_1, param_2)

 {
  let sVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let local_8;

  sVar1 = s16((DAT_0064f340 + param_1 * 0x58), 0);
  sVar2 = s16((DAT_0064f342 + param_1 * 0x58), 0);
  iVar3 = FUN_005b8a81(((sVar1) << 16 >> 16), ((sVar2) << 16 >> 16));
  if ((iVar3 === param_2)) {
    uVar4 = 1;
  }
  else {
    (local_8 < 8) (local_8 = 0; local_8 = local_8; local_8 = (local_8 + 1)) {
      uVar4 = FUN_005ae052((s8(DAT_00628350[local_8]) + ((sVar1) << 16 >> 16)));
      iVar3 = (s8(DAT_00628360[local_8]) + ((sVar2) << 16 >> 16));
      iVar5 = FUN_004087c0(uVar4, iVar3);
      if ((iVar5 !== 0)) {
        uVar4 = FUN_005b8a81(uVar4, iVar3);
        iVar3 = FUN_005b9431(param_2, uVar4);
        if ((iVar3 !== 0)) {
          return 1;
        }
        local_8 = (local_8 + (2 - (local_8 & 1)));
      }
    }
    uVar4 = 0;
  }
  return uVar4;
}


 export function FUN_004429af (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_c;
  let local_8;

  local_c = -1;
  local_8 = 0;
  while ((iVar3 !== 0)) {
    if ((7 < local_8)) {
      return 0;
    }
    uVar1 = FUN_005ae052((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628350[local_8])));
    iVar2 = (((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628360[local_8]));
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((iVar3 !== 0))


 export function FUN_00444270 (param_1)

 {
  FUN_004190d0(s_DEBUG_006359dc, param_1);
  return;
}


 export function FUN_004442a0 (param_1, param_2, param_3)

 {
  FUN_004a6c4b(DAT_006359d4, param_1, 0, param_2, param_3);
  return;
}


 export function FUN_004442e0 (param_1, param_2)

 {
  FUN_004a6e39(DAT_006359d4, param_1, 0, param_2);
  return;
}


 export function FUN_00444310 (param_1)

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let pvVar5;
  let pcVar6;
  let sVar7;
  let unaff_FS_OFFSET;
  let local_888;
  let local_874;
  let local_854;
  let local_750;
  let local_31c;
  let local_318;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00445275;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_318 = 1;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  if ((param_1 !== 3)) {
    FUN_005dae6b(7, s_whichNetwork_==_INTERNET_||_whic_0062640c, s_D:\Ss\Franklinton\startup_LAN.cp_006263e8, 0x21);
  }
  DAT_006ad2f0 = param_1;
  if ((param_1 === 4)) {
    FUN_0040ffa0(s_NETWORKTYPE_006264a4, 1);
    FUN_0059ea99(((DAT_00666544) << 16 >> 16));
    if ((param_1 === 4)) {
      FUN_0059e8db(1, 1);
    }
    local_14 = FUN_0040bc80(0);
    if ((local_14 === -1)) {
      local_8 = (local_8 & -0x100);
      FUN_0044525d();
      local_8 = -1;
      FUN_00445269();
      FUN_0044527f();
      return;
    }
    DAT_006ad2f8 = u8((local_14 !== 0));
    DAT_00666544 = u8((local_14 !== 0));
    if ((param_1 === 4)) {
      DAT_00655b02 = 4;
      param_1 = 0;
      DAT_006ad2f0 = 0;
    }
    else {
      DAT_00655b02 = 3;
    }
  }
  else if ((param_1 === 0)) {
    DAT_006ad2f8 = 0;
    DAT_00655b02 = 4;
  }
  else if ((param_1 === 2)) {
    DAT_006ad2f8 = 2;
    DAT_00655b02 = 5;
  }
  else {
    DAT_00655b02 = 6;
    DAT_006ad2f8 = 3;
  }
  FUN_0040bbb0();
  if ((param_1 === 0)) {
    FUN_0040bc10(0x28f);
  }
  else if ((param_1 === 4)) {
    if ((param_1 === 1)) {
      FUN_0040bc10(0x290);
    }
    else {
      FUN_0040bc10(0x362);
    }
    FUN_0040fe10();
    if ((DAT_006ad2f8 === 0)) {
      FUN_0040bc10(0x291);
    }
    else if ((DAT_006ad2f8 === 1)) {
      FUN_0040bc10(0x292);
    }
  }
  else {
    FUN_0040bc10(0x349);
  }
  if ((DAT_006ad63c !== 0)) {
    operator_delete(DAT_006ad63c);
    DAT_006ad63c = 0;
  }
  sVar1 = _strlen(DAT_00679640);
  DAT_006ad63c = operator_new((sVar1 + 1));
  if ((operator_new((sVar1 + 1)) === 0)) {
    FUN_005dae6b(7, s_gNetMgr.pDescription_006264d4, s_D:\Ss\Franklinton\startup_LAN.cp_006264b0, 0x79)
    ;
  }
  FUN_005f22d0(DAT_006ad63c, DAT_00679640);
  DAT_0062c488 = 0;
  DAT_00654fa6 = 0;
 LAB_0044465c: :
  if ((DAT_0062c488 === 1)) {
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff8b0);
    FUN_00419be0(DAT_0063cbd0);
    FUN_00419ba0(0x9e);
    FUN_00419b80();
  }
  (local_31c < 8) (local_31c = 0; local_31c = (local_31c < 8); local_31c = (local_31c + 1)) {
    w16((DAT_00654b60 + local_31c * 2), 0, 0);
    DAT_00654ea4[local_31c * 0x20] = 0;
  }
  DAT_00654b70 = 0;
  DAT_00628048 = 0;
  DAT_00654fa4 = 0;
  DAT_0062c488 = 0;
  DAT_00654fa6 = 0;
  DAT_006ad7b2 = 0;
  DAT_006ad6ac = 0;
  FUN_00484cc0();
  DAT_00655af8 = 0;
  DAT_00655afc = 0xffff;
  DAT_00655af0 = 0;
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  if ((local_318 === 0)) {
    FUN_0041e864(1);
  }
  DAT_00627670 = 0;
  DAT_00631eec = 3;
  FUN_0052263c(-1, 0);
  FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
  FUN_0040ffa0(DAT_006264ec, 1);
  iVar2 = (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1));
  uVar3 = FUN_005226fa(0, iVar2);
  FUN_0059e783(uVar3, iVar2);
  if ((DAT_006ad228 === 2)) {
    FUN_0059e8db(5, 1);
    if ((DAT_0066653e === 5)) {
      FUN_0059ea99(0);
    }
    else {
      FUN_0059ea99(((DAT_0066653e) << 16 >> 16));
    }
  }
  else if ((DAT_006ad228 === 1)) {
    FUN_0059e8db(0, 1);
    FUN_0059e8db(1, 1);
    FUN_0059e8db(2, 1);
    FUN_0059e8db(3, 1);
    FUN_0059e8db(4, 1);
    FUN_0059ea99(5);
  }
  else {
    FUN_0059ea99(((DAT_0066653e) << 16 >> 16));
  }
  iVar2 = FUN_0040bc80(0);
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  local_318 = 0;
  if ((iVar2 < 0)) {
    local_8 = (local_8 & -0x100);
    FUN_0044525d();
    local_8 = -1;
    FUN_00445269();
    FUN_0044527f();
    return;
  }
  DAT_0066653e = ((iVar2) & 0xFFFF);
  if ((iVar2 < 3)) {
    __chdir(DAT_00655020);
  }
  /* switch */ () {
  case 0 :
    iVar4 = FUN_0041d417();
    if ((iVar4 === 0)) {
      local_20 = 0;
      iVar4 = _rand();
      DAT_00624ee8 = ((iVar4 % 3) + -1);
      DAT_00624eec = 0;
      iVar4 = _rand();
      if (((iVar4 % 3) === 0)) {
        DAT_00624eec = ((iVar4 % 3) + -1);
      }
      iVar4 = _rand();
      DAT_00624ef0 = ((iVar4 % 3) + -1);
      iVar4 = _rand();
      DAT_00624ef4 = ((iVar4 % 3) + -1);
      iVar4 = _rand();
      DAT_00624ef8 = ((iVar4 % 3) + -1);
      iVar4 = FUN_0051dd97(local_20, 3);
      goto joined_r0x00444b3b;
    }
    goto LAB_0044465c;
  case 1 :
    iVar4 = FUN_0041dd0e();
    if ((iVar4 === 0)) {
      local_20 = 1;
      if ((DAT_006d1166 !== 0)) {
        local_20 = 2;
      }
      iVar4 = _rand();
      DAT_00624ee8 = ((iVar4 % 3) + -1);
      DAT_00624eec = 0;
      iVar4 = _rand();
      if (((iVar4 % 3) === 0)) {
        DAT_00624eec = ((iVar4 % 3) + -1);
      }
      iVar4 = _rand();
      DAT_00624ef0 = ((iVar4 % 3) + -1);
      iVar4 = _rand();
      DAT_00624ef4 = ((iVar4 % 3) + -1);
      iVar4 = _rand();
      DAT_00624ef8 = ((iVar4 % 3) + -1);
      iVar4 = FUN_0051dd97(local_20, 3);
      goto joined_r0x00444b3b;
    }
    goto LAB_0044465c;
  case 2 :
    iVar4 = FUN_0041d417();
    if ((iVar4 !== 0)) {
      FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      goto LAB_0044465c;
    }
    if ((0 !== 0)) {
      DAT_00655aea = (DAT_00655aea & -0x10001);
    }
    break;
  case 4 :
    DAT_006a9110 = 0;
    iVar4 = FUN_00477d8c(0, 3, 1);
    if ((iVar4 === 0)) {
      if ((2 < DAT_00655b02)) {
      DAT_00655aea = (DAT_00655aea & -0x10001);
    }
    goto LAB_0044465c;
  case 5 :
  }
  DAT_00654fb0 = 0;
  FUN_004a73d9();
  DAT_00654fd8 = 0;
  DAT_00655b0b = 0;
  if ((iVar2 === 5)) {
    local_1c = FUN_0059adef(DAT_006ad2f8, 0);
    if ((local_1c === 0)) {
      FUN_005d225b(s_Startup_LAN:_Failure_of_ConnectT_006264fc);
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      FUN_00410030(s_LANCONNECTFAIL_0062652c, DAT_0063fc58, 0);
    }
    else {
      iVar2 = FUN_0044542c();
      if ((iVar2 === 0)) {
        FUN_0059b293(1);
      }
      else if ((iVar2 !== 0)) {
        pvVar5 = operator_new(0x178);
        local_8 = 2;
        if ((pvVar5 === 0)) {
          local_874 = 0;
        }
        else {
          local_874 = FUN_00421f70();
        }
        local_8 = ((UNNAMED << 8) | 1);
        DAT_006ad108 = local_874;
        local_14 = FUN_00421fcd(param_1);
        if ((local_874 !== 0)) {
          FUN_00447170(1);
        }
        DAT_006ad108 = 0;
        if ((local_14 !== 0)) {
        FUN_0059b293(1);
      }
    }
  }
  else {
    local_18 = ((DAT_00654c74) << 16 >> 16);
    DAT_00654c74 = 1;
    if ((iVar2 !== 0)) {
      local_1c = FUN_0059adef(DAT_006ad2f8, 1);
      if ((local_1c === 0)) {
        if ((DAT_006ad2f8 !== 3)) {
          FUN_005d225b(s_Startup_LAN:_Failure_of_ConnectT_0062653c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          FUN_00410030(s_LANCONNECTFAIL_0062656c, DAT_0063fc58, 0);
        }
        goto LAB_0044465c;
      }
      if ((param_1 !== 3)) {
        iVar2 = FUN_0044542c();
        if ((iVar2 === 0)) {
          FUN_0059b293(1);
          goto LAB_0044465c;
        }
        iVar2 = FUN_00445592();
        if ((iVar2 === 0)) {
          FUN_0059b293(1);
          goto LAB_0044465c;
        }
      }
      if ((param_1 === 0)) {
        do {
          if ((DAT_006ad228 !== -1)) {
            FUN_005f22d0(DAT_006665b0, DAT_006ad22c);
            goto LAB_0044501d;
          }
          pcVar6 = XD_GetCurrentProtoAddr(DAT_006c8fbc, DAT_006c9288);
          if ((pcVar6 === 0)) {
            DAT_006665b0 = 0;
          }
          else {
            pcVar6 = XD_GetCurrentProtoAddr(DAT_006ad2fc, DAT_006ad2f8);
            FUN_005f22d0(DAT_006665b0, pcVar6);
          }
          FUN_005a632a(DAT_006359d4, s_IPVERIFY_0062657c, 0x1f, DAT_006665b0, 0, 0, 0, 1);
          local_14 = FUN_005a5f34(DAT_fffff7ac, 0);
          if ((local_14 === -1)) {
            FUN_0059b293(1);
            goto LAB_0044465c;
          }
          sVar1 = _strlen(DAT_fffff7ac);
        } while ((sVar1 === 0)) {
          FUN_005dae6b(7, s_tempStr_006265ac, s_D:\Ss\Franklinton\startup_LAN.cp_00626588, 0x1b9);
        }
        FUN_005f22d0(pcVar6, DAT_006ad63c);
        FUN_005f22e0(pcVar6, DAT_006265b4);
        FUN_005f22e0(pcVar6, DAT_006665b0);
        operator_delete(DAT_006ad63c);
        DAT_006ad63c = pcVar6;
      }
      else if ((iVar2 === 0)) {
        FUN_0059b293(1);
        goto LAB_0044465c;
      }
      pvVar5 = operator_new(0x70);
      local_8 = 3;
      if ((pvVar5 === 0)) {
        local_888 = 0;
      }
      else {
        local_888 = FUN_0056e270();
      }
      local_8 = ((UNNAMED << 8) | 1);
      DAT_006ad10c = local_888;
      iVar2 = FUN_0056e2e9(local_20, param_1);
      if ((local_888 !== 0)) {
        FUN_004471c0(1);
      }
      DAT_006ad10c = 0;
      if ((iVar2 !== 0)) {
 LAB_004451fb: :
        DAT_00654c74 = ((local_18) & 0xFFFF);
        DAT_00654fd8 = 1;
        FUN_004a73d9();
        local_8 = (local_8 & -0x100);
        FUN_0044525d();
        local_8 = -1;
        FUN_00445269();
        FUN_0044527f();
        return;
      }
      FUN_0059b293(1);
      DAT_006ad7b2 = 0;
      FUN_00484cc0();
    }
  }
  goto LAB_0044465c;
}


 export function FUN_0044525d ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00445269 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0044527f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044528e ()

 {
  let pcVar1;
  let sVar2;
  let unaff_FS_OFFSET;
  let local_40c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00445413;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006ad228 === 1)) {
    pcVar1 = XD_GetCurrentProtoAddr(DAT_006ad2fc, DAT_006ad2f8);
    if ((pcVar1 === 0)) {
      do {
        FUN_005a632a(DAT_006359d4, s_IPADDRESS_006265b8, 0x1f, DAT_006665b0, 0, 0, 0, 1);
        local_14 = FUN_005a5f34(DAT_fffffbf4, 0);
        if ((local_14 === -1)) {
          local_8 = -1;
          FUN_00445407();
          FUN_0044541d();
          return;
        }
        sVar2 = _strlen(DAT_fffffbf4);
      } while ((sVar2 === 0)) {
      pcVar1 = XD_GetCurrentProtoAddr(DAT_006ad2fc, DAT_006ad2f8);
      FUN_005f22d0(DAT_006665b0, pcVar1);
    }
  }
  else {
    FUN_005f22d0(DAT_006665b0, DAT_006ad22c);
  }
  local_8 = -1;
  FUN_00445407();
  FUN_0044541d();
  return;
}


 export function FUN_00445407 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0044541d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044542c ()

 {
  let sVar1;
  let unaff_FS_OFFSET;
  let local_40c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00445579;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006ad228 === -1)) {
    do {
      FUN_005a632a(DAT_006359d4, s_NETNAME_006265c4, 0x1f, DAT_00666570, 0, 0, 0, 1);
      local_14 = FUN_005a5f34(DAT_fffffbf4, 0);
      if ((local_14 === -1)) {
        local_8 = -1;
        FUN_0044556d();
        FUN_00445583();
        return;
      }
      sVar1 = _strlen(DAT_fffffbf4);
    } while ((sVar1 === 0)) {
    _memset(DAT_00666570, 0, 0x20);
    _strncpy(DAT_00666570, DAT_006ad28c, 0x1f);
  }
  local_8 = -1;
  FUN_0044556d();
  FUN_00445583();
  return;
}


 export function FUN_0044556d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00445583 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00445592 ()

 {
  let sVar1;
  let unaff_FS_OFFSET;
  let local_40c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004456f9;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006ad228 === -1)) {
    do {
      FUN_005a632a(DAT_006359d4, s_GAMENAME_006265cc, 0x1f, DAT_00666550, 0, 0, 0, 1);
      local_14 = FUN_005a5f34(DAT_fffffbf4, 0);
      if ((local_14 === -1)) {
        local_8 = -1;
        FUN_004456ed();
        FUN_00445703();
        return;
      }
      sVar1 = _strlen(DAT_fffffbf4);
    } while ((sVar1 === 0)) {
    _memset(DAT_00666550, 0, 0x20);
    _strncpy(DAT_00666550, DAT_006ad2ac, 0x1f);
  }
  local_8 = -1;
  FUN_004456ed();
  FUN_00445703();
  return;
}


 export function FUN_004456ed ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00445703 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00445712 ()

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_844;
  let local_410;
  let local_3e8;
  let local_3d4;
  let local_11c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00445e2d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
 LAB_00445759: :
  do {
    if ((DAT_0062b420 === 0)) {
      FUN_0046e6a9();
      FUN_0046e020(0x6b, 0, 1, 0);
    }
    FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff7bc);
    FUN_00419be0(DAT_0063cbd0);
    FUN_00419ba0(0x9e);
    iVar1 = FUN_00477d8c(1, 3, 1);
    if ((iVar1 !== 0)) {
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff7bc);
      FUN_00419be0(DAT_0063cbd0);
      FUN_00419ba0(0x9e);
      FUN_00419b80();
      local_8 = (local_8 & -0x100);
      FUN_00445e15();
      local_8 = -1;
      FUN_00445e21();
      FUN_00445e37();
      return;
    }
    FUN_004729ab(DAT_fffffee8, DAT_00679640, DAT_0062cd24);
    if ((DAT_0062b420 !== 0)) {
      FUN_0046e020(0x6a, 0, 0, 0);
    }
    DAT_00655aea = (DAT_0064bc1e & -0x8001);
    DAT_00655af2 = DAT_0064bc22;
    DAT_00655b0b = 0;
    FUN_0040ff60(0, DAT_0064bc62);
    FUN_00421da0(0, ((DAT_0064bcb2) << 16 >> 16));
    FUN_0040bbb0();
    uVar2 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    FUN_00421f10(uVar2);
    FUN_0040ff60(1, DAT_00679640);
    FUN_0040bbb0();
    if ((DAT_0064bcb8 === 0)) {
      FUN_00421f10(0x7d0);
    }
    else {
      uVar2 = FUN_00484fec(((DAT_0064bcb8) << 16 >> 16));
      FUN_00421f10(uVar2);
    }
    FUN_0040ff60(2, DAT_00679640);
    if ((DAT_0062b420 !== 0)) {
      FUN_00419c8b();
    }
    FUN_00421dd0();
    iVar1 = Create(DAT_fffffbf0, DAT_fffffee8, 0x6265d8, 0x4008001);
    if ((iVar1 !== 0)) {
      FUN_0059ec88((DAT_00641848 + u8(DAT_006560f6[iVar1 * 0x20]) * 0x3c), 0, 0);
    }
    iVar1 = FUN_0040bc80(0);
  } while ((iVar1 < 0)) {
 LAB_00445a4e: :
    while ((local_14 < 0)) {
      FUN_0040ffa0(s_DIFFICULTY_006265f4, 1);
      FUN_0059ea99(DAT_00655b08);
      FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      local_14 = FUN_0040bc80(0);
      if ((local_14 < 0)) {
        DAT_00655aea = (DAT_00655aea | 0x100);
      }
      else {
        DAT_00655aea = (DAT_00655aea & -0x101);
      }
      while ((iVar1 < 0)) {
        DAT_00654fa6 = 0;
        DAT_0062c488 = 0;
        FUN_0051d7bc();
        FUN_0051d7d6(0, ((DAT_00666546) << 16 >> 16));
        FUN_0051d7d6(1, ((DAT_00666548) << 16 >> 16));
        FUN_0051d7d6(2, ((DAT_0066654a) << 16 >> 16));
        FUN_0051d7d6(3, ((DAT_0066654c) << 16 >> 16));
        FUN_0051d7d6(4, ((DAT_006665fe) << 16 >> 16));
        FUN_0051d7d6(5, ((DAT_00666600) << 16 >> 16));
        FUN_005a632a(DAT_006359d4, s_ADVANCEDMP_00626600, 0, 0, 0, 0, 0, 0);
        if ((DAT_006c3160 === 0)) {
          DAT_006ad684 = 0;
          DAT_00654c7c = 0;
        }
        else {
          FUN_0040bbb0();
          FUN_0040bc10(0x364);
          FUN_0059edf0(DAT_00679640, 6, 0);
          FUN_0051d7d6(6, ((DAT_0066654e) << 16 >> 16));
        }
        if (((local_3d4 & 4) !== 0)) {
          (local_11c < local_3e8) (local_11c = 0; local_11c = (local_11c < local_3e8); local_11c = (local_11c + 1)) {
            FUN_0059ea4d(local_11c, ((1 << (((local_11c) & 0xFF) & 0x1f)) & DAT_00631ed8));
          }
        }
        FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        iVar1 = FUN_0040bc80(0);
        FUN_0046e020(0x6a, 0, 0, 0);
        if ((iVar1 < 0)) {
          DAT_00654c7c = FUN_0059e9f3(6);
          DAT_0066654e = FUN_0059e9f3(6);
        }
        DAT_00654fa6 = 1;
        DAT_0062c488 = 1;
        iVar1 = FUN_0051ea8e(0);
        if ((iVar1 === 0)) {
          DAT_00628048 = None;
          DAT_00654fa4 = None;
          local_8 = (local_8 & -0x100);
          FUN_00445e15();
          local_8 = -1;
          FUN_00445e21();
          FUN_00445e37();
          return;
        }
      }
    }
  }
  goto LAB_00445759;
}


 export function FUN_00445e15 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00445e21 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00445e37 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00445e46 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let local_448;
  let local_444;
  let local_440;
  let local_33c;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_2f0;
  let local_254;
  let local_250;
  let local_c4;
  let local_38;
  let aiStack_34;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00446806;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_330 = 0;
  _DAT_006ad12c = 0;
  _DAT_006ad178 = 0;
  do {
    FUN_0040bc40(0x801);
    FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25e));
    local_33c = 0;
    (local_448 < 8) (local_448 = 1; local_448 = (local_448 < 8); local_448 = (local_448 + 1)) {
      if ((((1 << (((local_448) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        FUN_0040bbb0();
        uVar2 = FUN_00493c7d(local_448);
        FUN_0040bbe0(uVar2);
        FUN_0040fe10();
        FUN_0040fea0();
        uVar2 = FUN_00493b10(local_448);
        FUN_0040bbe0(uVar2);
        FUN_0040fed0();
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040ff30(((s16((DAT_0064c708 + local_448 * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc5);
        FUN_0040bbe0(DAT_0062660c);
        FUN_0040ff30(((s16((DAT_0064c706 + local_448 * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc4);
        FUN_0040bbe0(DAT_00626610);
        uVar3 = local_33c;
        local_33c = (local_33c + 1);
        local_38 = FUN_0059edf0(DAT_00679640, uVar3, 0);
        w32(DAT_ffffffcc, s32((local_38 + 4), 0), local_448);
      }
    }
    local_334 = local_33c;
 LAB_00446036: :
    do {
      local_338 = 0;
      (local_33c < local_334) (local_33c = 0; local_33c = local_33c; local_33c = (local_33c + 1)) {
        local_38 = FUN_0059e7ad(local_33c);
        if ((local_38 !== 0)) {
          local_448 = ((s32(DAT_ffffffcc, s32((local_38 + 4), 0))) & 0xFF);
          if ((((1 << (((s32(DAT_ffffffcc, s32((local_38 + 4), 0))) & 0xFF) & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) === 0)) {
            local_338 = (local_338 + 1);
            FUN_0059e8db(s32((local_38 + 4), 0), 0);
            if ((local_c4 !== 0)) {
              FUN_00421ca0(s32((local_38 + 4), 0));
            }
          }
          else {
            FUN_0059e8db(s32((local_38 + 4), 0), 1);
            if ((local_c4 !== 0)) {
              FUN_00447210(s32((local_38 + 4), 0));
            }
          }
        }
      }
      if ((local_338 === 0)) {
        FUN_00421ea0(s_JOINEDMAX_00626614);
        FUN_0059db65();
        local_8 = -1;
        FUN_004467fa();
        FUN_00446810();
        return;
      }
      (local_33c < local_334) (local_33c = 0; local_33c = local_33c; local_33c = (local_33c + 1)) {
        local_38 = FUN_0059e7ad(local_330);
        if (((_MEM[local_38] & 1) === 0)) {
          FUN_0059ea99(s32((local_38 + 4), 0));
          if ((local_c4 !== 0)) {
            FUN_004472f0(s32((local_38 + 4), 0));
          }
          break;
        }
        local_330 = (local_330 + 1);
        if ((local_330 === local_334)) {
          local_330 = 0;
        }
      }
      FUN_0059c276();
      _DAT_006ad674 = FUN_00421bb0();
      local_2f0 = (local_2f0 & -0x401);
      local_254 = 0;
      local_250 = 0;
      DAT_00635a3c = LAB_0040126c;
      uVar3 = FUN_0040bc80(0);
      local_330 = GetCheckStyle(local_c4);
      if ((uVar3 < 0)) {
        local_8 = -1;
        FUN_004467fa();
        FUN_00446810();
        return;
      }
    } while ((DAT_006c9088 !== 0)) {
      FUN_00410030(s_GAMECANCELED_00626620, DAT_0063fc58, 0);
      local_8 = -1;
      FUN_004467fa();
      FUN_00446810();
      return;
    }
    iVar1 = s32(DAT_ffffffcc, uVar3);
    _DAT_006ad120 = iVar1;
    local_330 = uVar3;
    FUN_0046b14d(0x30, 0, 0, iVar1, 0, 0, 0, 0, 0, 0);
    if ((DAT_006ad2f7 === 0)) {
      FUN_0059c276();
      local_14 = FUN_00421bb0();
      while (((iVar4 - local_14) < DAT_006ad8b8 * 0x3c)) {
        FUN_0047e94e(1, 0);
      }
    }
    if ((DAT_006c907c === 0)) {
      FUN_0059db65();
      FUN_00410030(s_SERVERCONNECTFAIL_00626630, DAT_0063fc58, 0);
      local_8 = -1;
      FUN_004467fa();
      FUN_00446810();
      return;
    }
    if ((DAT_006c907c !== 0)) {
      FUN_00410030(s_ALREADYCHOSEN_00626644, DAT_0063fc58, 0);
      goto LAB_00446036;
    }
    FUN_0059db65();
    local_448 = ((iVar1) & 0xFF);
    DAT_00655b0b = (DAT_00655b0b | (((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF));
    DAT_00655b03 = ((iVar1) & 0xFF);
    DAT_00655b05 = ((iVar1) & 0xFF);
    DAT_00655aea = (DAT_00655aea & -0x101);
    DAT_006d1da0 = iVar1;
    iVar4 = FUN_00498a5c(iVar1);
    if ((iVar4 === 0)) {
      DAT_00655b0b = ((DAT_00655b0b | (((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)) & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)));
      FUN_0046b14d(0x31, 0, 0, iVar1, 0, 0, 0, 0, 0, 0);
    }
    else {
      FUN_0040ffa0(s_GENDER_00626654, 1);
      FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25e));
      FUN_0059ea99(DAT_006554fc[((s16((DAT_0064c6a6 + s8(((iVar1) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30]);
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      DAT_00635a3c = LAB_00402c3e;
      iVar4 = FUN_0040bc80(0);
      _DAT_006ad128 = iVar4;
      FUN_0046e020(0x6a, 0, 0, 0);
      if ((iVar4 < 0)) {
        DAT_00655b0b = ((DAT_00655b0b | (((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)) & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)));
        FUN_0046b14d(0x31, 0, 0, iVar1, 0, 0, 0, 0, 0, 0);
      }
      else {
        local_444 = ((iVar4) & 0xFF);
        DAT_006554fc[((s16((DAT_0064c6a6 + s8(((iVar1) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30] = local_444;
        w16((DAT_0064c6a0 + iVar1 * 0x594), 0, (s16((DAT_0064c6a0 + iVar1 * 0x594), 0) & 0xfdff));
        if ((iVar4 !== 0)) {
          w16((DAT_0064c6a0 + iVar1 * 0x594), 0, (s16((DAT_0064c6a0 + iVar1 * 0x594), 0) | 0x200));
        }
        uVar8 = 1;
        uVar7 = 0;
        uVar6 = 0;
        uVar5 = 0;
        uVar2 = FUN_00493b10(s8(DAT_00655b03), 0, 0, 0, 1);
        iVar4 = FUN_005a632a(DAT_006359d4, DAT_0062665c, 0x17, uVar2, uVar5, uVar6, uVar7, uVar8);
        if ((iVar4 === 0)) {
          FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25e));
          DAT_00635a3c = LAB_00402c3e;
          iVar4 = FUN_005a5f34(DAT_fffffbc0, 0);
          if ((iVar4 === 0)) {
            FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_fffffbc0);
            FUN_005f22d0(DAT_006ad130, DAT_fffffbc0);
            DAT_006ad148 = 0;
            DAT_006ad160 = 0;
            local_8 = -1;
            FUN_004467fa();
            FUN_00446810();
            return;
          }
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)));
          FUN_0046b14d(0x31, 0, 0, iVar1, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  } while ( true );
}


 export function FUN_004467fa ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00446810 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00447170 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00421fad();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004471c0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0056e2c9();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_00447210 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((-1 < param_1)) {
    if ((s32((in_ECX + 0x40), 0) === param_1)) {
      w32((in_ECX + 0x40), 0, -1);
    }
    w32(((s32((in_ECX + 0x48), 0) + 0x18) + param_1 * 0xa4), 0, 0);
    FUN_005dabc7(s32((s32((in_ECX + 0x48), 0) + param_1 * 0xa4), 0));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* unsigned */  /* int */  /* __thiscall */
 /* CCheckListBox::GetCheckStyle(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetCheckStyle (this)

 {
  return s32((this + 0x40), 0);
}


 export function FUN_004472f0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x40), 0, param_1);
  return;
}


 export function FUN_00447320 ()

 {
  FUN_0044733a();
  FUN_00447362();
  return;
}


 export function FUN_0044733a ()

 {
  `eh_vector_constructor_iterator'(DAT_00647c40, 0x3c, 0xb, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447362 ()

 {
  _atexit(FUN_0044737f);
  return;
}


 export function FUN_0044737f ()

 {
  `eh_vector_destructor_iterator'(DAT_00647c40, 0x3c, 0xb, FUN_005cde4d);
  return;
}


 export function FUN_004473a2 ()

 {
  FUN_004473bc();
  FUN_004473e4();
  return;
}


 export function FUN_004473bc ()

 {
  `eh_vector_constructor_iterator'(DAT_00640bd8, 0x3c, 0x34, CString, FUN_005cde4d);
  return;
}


 export function FUN_004473e4 ()

 {
  _atexit(FUN_00447401);
  return;
}


 export function FUN_00447401 ()

 {
  `eh_vector_destructor_iterator'(DAT_00640bd8, 0x3c, 0x34, FUN_005cde4d);
  return;
}


 export function FUN_00447424 ()

 {
  FUN_0044743e();
  FUN_00447466();
  return;
}


 export function FUN_0044743e ()

 {
  `eh_vector_constructor_iterator'(DAT_0063f858, 0x3c, 0x10, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447466 ()

 {
  _atexit(FUN_00447483);
  return;
}


 export function FUN_00447483 ()

 {
  `eh_vector_destructor_iterator'(DAT_0063f858, 0x3c, 0x10, FUN_005cde4d);
  return;
}


 export function FUN_004474a6 ()

 {
  FUN_004474c0();
  FUN_004474e8();
  return;
}


 export function FUN_004474c0 ()

 {
  `eh_vector_constructor_iterator'(DAT_006461d8, 0x3c, 0x10, CString, FUN_005cde4d);
  return;
}


 export function FUN_004474e8 ()

 {
  _atexit(FUN_00447505);
  return;
}


 export function FUN_00447505 ()

 {
  `eh_vector_destructor_iterator'(DAT_006461d8, 0x3c, 0x10, FUN_005cde4d);
  return;
}


 export function FUN_00447528 ()

 {
  FUN_00447542();
  FUN_0044756a();
  return;
}


 export function FUN_00447542 ()

 {
  `eh_vector_constructor_iterator'(DAT_00647388, 0x3c, 0x10, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044756a ()

 {
  _atexit(FUN_00447587);
  return;
}


 export function FUN_00447587 ()

 {
  `eh_vector_destructor_iterator'(DAT_00647388, 0x3c, 0x10, FUN_005cde4d);
  return;
}


 export function FUN_004475aa ()

 {
  FUN_004475c4();
  FUN_004475ec();
  return;
}


 export function FUN_004475c4 ()

 {
  `eh_vector_constructor_iterator'(DAT_006447b0, 0x3c, 0x10, CString, FUN_005cde4d);
  return;
}


 export function FUN_004475ec ()

 {
  _atexit(FUN_00447609);
  return;
}


 export function FUN_00447609 ()

 {
  `eh_vector_destructor_iterator'(DAT_006447b0, 0x3c, 0x10, FUN_005cde4d);
  return;
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
  FUN_00447646();
  FUN_00447660();
  return;
}


 export function FUN_00447646 ()

 {
  DAT_00646158 = DAT_00646158;
  return;
}


 export function FUN_00447660 ()

 {
  _atexit(FUN_0044767d);
  return;
}


 export function FUN_0044767d ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00447697 ()

 {
  FUN_004476b1();
  FUN_004476d9();
  return;
}


 export function FUN_004476b1 ()

 {
  `eh_vector_constructor_iterator'(DAT_00644e88, 0x3c, 2, CString, FUN_005cde4d);
  return;
}


 export function FUN_004476d9 ()

 {
  _atexit(FUN_004476f6);
  return;
}


 export function FUN_004476f6 ()

 {
  `eh_vector_destructor_iterator'(DAT_00644e88, 0x3c, 2, FUN_005cde4d);
  return;
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
  FUN_00447733();
  FUN_0044774d();
  return;
}


 export function FUN_00447733 ()

 {
  DAT_0063fcd8 = DAT_0063fcd8;
  return;
}


 export function FUN_0044774d ()

 {
  _atexit(FUN_0044776a);
  return;
}


 export function FUN_0044776a ()

 {
  FUN_005cde4d();
  return;
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
  FUN_0044779e();
  FUN_004477b8();
  return;
}


 export function FUN_0044779e ()

 {
  DAT_00647ed8 = DAT_00647ed8;
  return;
}


 export function FUN_004477b8 ()

 {
  _atexit(FUN_004477d5);
  return;
}


 export function FUN_004477d5 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447809();
  FUN_00447823();
  return;
}


 export function FUN_00447809 ()

 {
  DAT_00646118 = DAT_00646118;
  return;
}


 export function FUN_00447823 ()

 {
  _atexit(FUN_00447840);
  return;
}


 export function FUN_00447840 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044785a ()

 {
  FUN_00447874();
  FUN_0044789c();
  return;
}


 export function FUN_00447874 ()

 {
  `eh_vector_constructor_iterator'(DAT_00643b38, 0x3c, 0x20, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044789c ()

 {
  _atexit(FUN_004478b9);
  return;
}


 export function FUN_004478b9 ()

 {
  `eh_vector_destructor_iterator'(DAT_00643b38, 0x3c, 0x20, FUN_005cde4d);
  return;
}


 export function FUN_004478dc ()

 {
  FUN_004478f6();
  FUN_0044791e();
  return;
}


 export function FUN_004478f6 ()

 {
  `eh_vector_constructor_iterator'(DAT_0063fd18, 0x3c, 4, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044791e ()

 {
  _atexit(FUN_0044793b);
  return;
}


 export function FUN_0044793b ()

 {
  `eh_vector_destructor_iterator'(DAT_0063fd18, 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_0044795e ()

 {
  FUN_00447978();
  FUN_004479a0();
  return;
}


 export function FUN_00447978 ()

 {
  `eh_vector_constructor_iterator'(DAT_00642710, 0x3c, 0x12, CString, FUN_005cde4d);
  return;
}


 export function FUN_004479a0 ()

 {
  _atexit(FUN_004479bd);
  return;
}


 export function FUN_004479bd ()

 {
  `eh_vector_destructor_iterator'(DAT_00642710, 0x3c, 0x12, FUN_005cde4d);
  return;
}


 export function FUN_004479e0 ()

 {
  FUN_004479fa();
  FUN_00447a22();
  return;
}


 export function FUN_004479fa ()

 {
  `eh_vector_constructor_iterator'(DAT_006446b8, 0x3c, 3, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447a22 ()

 {
  _atexit(FUN_00447a3f);
  return;
}


 export function FUN_00447a3f ()

 {
  `eh_vector_destructor_iterator'(DAT_006446b8, 0x3c, 3, FUN_005cde4d);
  return;
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
  FUN_00447a7c();
  FUN_00447a96();
  return;
}


 export function FUN_00447a7c ()

 {
  DAT_00641808 = DAT_00641808;
  return;
}


 export function FUN_00447a96 ()

 {
  _atexit(FUN_00447ab3);
  return;
}


 export function FUN_00447ab3 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447ae7();
  FUN_00447b01();
  return;
}


 export function FUN_00447ae7 ()

 {
  DAT_0063fc18 = DAT_0063fc18;
  return;
}


 export function FUN_00447b01 ()

 {
  _atexit(FUN_00447b1e);
  return;
}


 export function FUN_00447b1e ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00447b38 ()

 {
  FUN_00447b52();
  FUN_00447b7a();
  return;
}


 export function FUN_00447b52 ()

 {
  `eh_vector_constructor_iterator'(DAT_006482f8, 0x3c, 0x16, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447b7a ()

 {
  _atexit(FUN_00447b97);
  return;
}


 export function FUN_00447b97 ()

 {
  `eh_vector_destructor_iterator'(DAT_006482f8, 0x3c, 0x16, FUN_005cde4d);
  return;
}


 export function FUN_00447bba ()

 {
  FUN_00447bd4();
  FUN_00447bfc();
  return;
}


 export function FUN_00447bd4 ()

 {
  `eh_vector_constructor_iterator'(DAT_00647fa0, 0x3c, 2, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447bfc ()

 {
  _atexit(FUN_00447c19);
  return;
}


 export function FUN_00447c19 ()

 {
  `eh_vector_destructor_iterator'(DAT_00647fa0, 0x3c, 2, FUN_005cde4d);
  return;
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
  FUN_00447c56();
  FUN_00447c70();
  return;
}


 export function FUN_00447c56 ()

 {
  DAT_00645120 = DAT_00645120;
  return;
}


 export function FUN_00447c70 ()

 {
  _atexit(FUN_00447c8d);
  return;
}


 export function FUN_00447c8d ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447cc1();
  FUN_00447cdb();
  return;
}


 export function FUN_00447cc1 ()

 {
  DAT_00648820 = DAT_00648820;
  return;
}


 export function FUN_00447cdb ()

 {
  _atexit(FUN_00447cf8);
  return;
}


 export function FUN_00447cf8 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447d2c();
  FUN_00447d46();
  return;
}


 export function FUN_00447d2c ()

 {
  DAT_00647788 = DAT_00647788;
  return;
}


 export function FUN_00447d46 ()

 {
  _atexit(FUN_00447d63);
  return;
}


 export function FUN_00447d63 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447d97();
  FUN_00447db1();
  return;
}


 export function FUN_00447d97 ()

 {
  DAT_00647348 = DAT_00647348;
  return;
}


 export function FUN_00447db1 ()

 {
  _atexit(FUN_00447dce);
  return;
}


 export function FUN_00447dce ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447e02();
  FUN_00447e1c();
  return;
}


 export function FUN_00447e02 ()

 {
  DAT_00644770 = DAT_00644770;
  return;
}


 export function FUN_00447e1c ()

 {
  _atexit(FUN_00447e39);
  return;
}


 export function FUN_00447e39 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00447e6d();
  FUN_00447e87();
  return;
}


 export function FUN_00447e6d ()

 {
  DAT_006480d8 = DAT_006480d8;
  return;
}


 export function FUN_00447e87 ()

 {
  _atexit(FUN_00447ea4);
  return;
}


 export function FUN_00447ea4 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00447ebe ()

 {
  FUN_00447ed8();
  FUN_00447f00();
  return;
}


 export function FUN_00447ed8 ()

 {
  `eh_vector_constructor_iterator'(DAT_00644b70, 0x3c, 0xb, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447f00 ()

 {
  _atexit(FUN_00447f1d);
  return;
}


 export function FUN_00447f1d ()

 {
  `eh_vector_destructor_iterator'(DAT_00644b70, 0x3c, 0xb, FUN_005cde4d);
  return;
}


 export function FUN_00447f40 ()

 {
  FUN_00447f5a();
  FUN_00447f82();
  return;
}


 export function FUN_00447f5a ()

 {
  `eh_vector_constructor_iterator'(DAT_006477c8, 0x3c, 0xf, CString, FUN_005cde4d);
  return;
}


 export function FUN_00447f82 ()

 {
  _atexit(FUN_00447f9f);
  return;
}


 export function FUN_00447f9f ()

 {
  `eh_vector_destructor_iterator'(DAT_006477c8, 0x3c, 0xf, FUN_005cde4d);
  return;
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
  FUN_00447fdc();
  FUN_00447ff6();
  return;
}


 export function FUN_00447fdc ()

 {
  DAT_00644e08 = DAT_00644e08;
  return;
}


 export function FUN_00447ff6 ()

 {
  _atexit(FUN_00448013);
  return;
}


 export function FUN_00448013 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00448047();
  FUN_00448061();
  return;
}


 export function FUN_00448047 ()

 {
  DAT_006442b8 = DAT_006442b8;
  return;
}


 export function FUN_00448061 ()

 {
  _atexit(FUN_0044807e);
  return;
}


 export function FUN_0044807e ()

 {
  FUN_005cde4d();
  return;
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
  FUN_004480b2();
  FUN_004480cc();
  return;
}


 export function FUN_004480b2 ()

 {
  DAT_00640b98 = DAT_00640b98;
  return;
}


 export function FUN_004480cc ()

 {
  _atexit(FUN_004480e9);
  return;
}


 export function FUN_004480e9 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_0044811d();
  FUN_00448137();
  return;
}


 export function FUN_0044811d ()

 {
  DAT_00647f60 = DAT_00647f60;
  return;
}


 export function FUN_00448137 ()

 {
  _atexit(FUN_00448154);
  return;
}


 export function FUN_00448154 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044816e ()

 {
  FUN_00448188();
  FUN_004481b0();
  return;
}


 export function FUN_00448188 ()

 {
  `eh_vector_constructor_iterator'(DAT_0063fe50, 0x3c, 0x30, CString, FUN_005cde4d);
  return;
}


 export function FUN_004481b0 ()

 {
  _atexit(FUN_004481cd);
  return;
}


 export function FUN_004481cd ()

 {
  `eh_vector_destructor_iterator'(DAT_0063fe50, 0x3c, 0x30, FUN_005cde4d);
  return;
}


 export function FUN_004481f0 ()

 {
  FUN_0044820a();
  FUN_00448232();
  return;
}


 export function FUN_0044820a ()

 {
  `eh_vector_constructor_iterator'(DAT_006442f8, 0x3c, 0x10, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448232 ()

 {
  _atexit(FUN_0044824f);
  return;
}


 export function FUN_0044824f ()

 {
  `eh_vector_destructor_iterator'(DAT_006442f8, 0x3c, 0x10, FUN_005cde4d);
  return;
}


 export function FUN_00448272 ()

 {
  FUN_0044828c();
  FUN_004482b4();
  return;
}


 export function FUN_0044828c ()

 {
  `eh_vector_constructor_iterator'(DAT_00641848, 0x3c, 0x3f, CString, FUN_005cde4d);
  return;
}


 export function FUN_004482b4 ()

 {
  _atexit(FUN_004482d1);
  return;
}


 export function FUN_004482d1 ()

 {
  `eh_vector_destructor_iterator'(DAT_00641848, 0x3c, 0x3f, FUN_005cde4d);
  return;
}


 export function FUN_004482f4 ()

 {
  FUN_0044830e();
  FUN_00448336();
  return;
}


 export function FUN_0044830e ()

 {
  `eh_vector_constructor_iterator'(DAT_006465d8, 0x3c, 8, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448336 ()

 {
  _atexit(FUN_00448353);
  return;
}


 export function FUN_00448353 ()

 {
  `eh_vector_destructor_iterator'(DAT_006465d8, 0x3c, 8, FUN_005cde4d);
  return;
}


 export function FUN_00448376 ()

 {
  FUN_00448390();
  FUN_004483b8();
  return;
}


 export function FUN_00448390 ()

 {
  `eh_vector_constructor_iterator'(DAT_00642d48, 0x3c, 0x2c, CString, FUN_005cde4d);
  return;
}


 export function FUN_004483b8 ()

 {
  _atexit(FUN_004483d5);
  return;
}


 export function FUN_004483d5 ()

 {
  `eh_vector_destructor_iterator'(DAT_00642d48, 0x3c, 0x2c, FUN_005cde4d);
  return;
}


 export function FUN_004483f8 ()

 {
  FUN_00448412();
  FUN_0044843a();
  return;
}


 export function FUN_00448412 ()

 {
  `eh_vector_constructor_iterator'(DAT_00646a20, 0x3c, 0xb, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044843a ()

 {
  _atexit(FUN_00448457);
  return;
}


 export function FUN_00448457 ()

 {
  `eh_vector_destructor_iterator'(DAT_00646a20, 0x3c, 0xb, FUN_005cde4d);
  return;
}


 export function FUN_0044847a ()

 {
  FUN_00448494();
  FUN_004484bc();
  return;
}


 export function FUN_00448494 ()

 {
  `eh_vector_constructor_iterator'(DAT_00644f00, 0x3c, 6, CString, FUN_005cde4d);
  return;
}


 export function FUN_004484bc ()

 {
  _atexit(FUN_004484d9);
  return;
}


 export function FUN_004484d9 ()

 {
  `eh_vector_destructor_iterator'(DAT_00644f00, 0x3c, 6, FUN_005cde4d);
  return;
}


 export function FUN_004484fc ()

 {
  FUN_00448516();
  FUN_0044853e();
  return;
}


 export function FUN_00448516 ()

 {
  `eh_vector_constructor_iterator'(DAT_00648860, 0x3c, 3, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044853e ()

 {
  _atexit(FUN_0044855b);
  return;
}


 export function FUN_0044855b ()

 {
  `eh_vector_destructor_iterator'(DAT_00648860, 0x3c, 3, FUN_005cde4d);
  return;
}


 export function FUN_0044857e ()

 {
  FUN_00448598();
  FUN_004485c0();
  return;
}


 export function FUN_00448598 ()

 {
  `eh_vector_constructor_iterator'(DAT_00645068, 0x3c, 3, CString, FUN_005cde4d);
  return;
}


 export function FUN_004485c0 ()

 {
  _atexit(FUN_004485dd);
  return;
}


 export function FUN_004485dd ()

 {
  `eh_vector_destructor_iterator'(DAT_00645068, 0x3c, 3, FUN_005cde4d);
  return;
}


 export function FUN_00448600 ()

 {
  FUN_0044861a();
  FUN_00448642();
  return;
}


 export function FUN_0044861a ()

 {
  `eh_vector_constructor_iterator'(DAT_00648918, 0x3c, 3, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448642 ()

 {
  _atexit(FUN_0044865f);
  return;
}


 export function FUN_0044865f ()

 {
  `eh_vector_destructor_iterator'(DAT_00648918, 0x3c, 3, FUN_005cde4d);
  return;
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
  FUN_0044869c();
  FUN_004486b6();
  return;
}


 export function FUN_0044869c ()

 {
  DAT_00646598 = DAT_00646598;
  return;
}


 export function FUN_004486b6 ()

 {
  _atexit(FUN_004486d3);
  return;
}


 export function FUN_004486d3 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00448707();
  FUN_00448721();
  return;
}


 export function FUN_00448707 ()

 {
  DAT_00648058 = DAT_00648058;
  return;
}


 export function FUN_00448721 ()

 {
  _atexit(FUN_0044873e);
  return;
}


 export function FUN_0044873e ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00448758 ()

 {
  FUN_00448772();
  FUN_0044879a();
  return;
}


 export function FUN_00448772 ()

 {
  `eh_vector_constructor_iterator'(DAT_00648118, 0x3c, 4, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044879a ()

 {
  _atexit(FUN_004487b7);
  return;
}


 export function FUN_004487b7 ()

 {
  `eh_vector_destructor_iterator'(DAT_00648118, 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_004487da ()

 {
  FUN_004487f4();
  FUN_0044881c();
  return;
}


 export function FUN_004487f4 ()

 {
  `eh_vector_constructor_iterator'(DAT_00648208, 0x3c, 4, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044881c ()

 {
  _atexit(FUN_00448839);
  return;
}


 export function FUN_00448839 ()

 {
  `eh_vector_destructor_iterator'(DAT_00648208, 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_0044885c ()

 {
  FUN_00448876();
  FUN_0044889e();
  return;
}


 export function FUN_00448876 ()

 {
  `eh_vector_constructor_iterator'(DAT_0063f6f0, 0x3c, 6, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044889e ()

 {
  _atexit(FUN_004488bb);
  return;
}


 export function FUN_004488bb ()

 {
  `eh_vector_destructor_iterator'(DAT_0063f6f0, 0x3c, 6, FUN_005cde4d);
  return;
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
  FUN_004488f8();
  FUN_00448912();
  return;
}


 export function FUN_004488f8 ()

 {
  DAT_00648098 = DAT_00648098;
  return;
}


 export function FUN_00448912 ()

 {
  _atexit(FUN_0044892f);
  return;
}


 export function FUN_0044892f ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00448949 ()

 {
  FUN_00448963();
  FUN_0044898b();
  return;
}


 export function FUN_00448963 ()

 {
  `eh_vector_constructor_iterator'(DAT_00645160, 0x3c, 0x43, CString, FUN_005cde4d);
  return;
}


 export function FUN_0044898b ()

 {
  _atexit(FUN_004489a8);
  return;
}


 export function FUN_004489a8 ()

 {
  `eh_vector_destructor_iterator'(DAT_00645160, 0x3c, 0x43, FUN_005cde4d);
  return;
}


 export function FUN_004489cb ()

 {
  FUN_004489e5();
  FUN_00448a0d();
  return;
}


 export function FUN_004489e5 ()

 {
  `eh_vector_constructor_iterator'(DAT_00646cb8, 0x3c, 0x14, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448a0d ()

 {
  _atexit(FUN_00448a2a);
  return;
}


 export function FUN_00448a2a ()

 {
  `eh_vector_destructor_iterator'(DAT_00646cb8, 0x3c, 0x14, FUN_005cde4d);
  return;
}


 export function FUN_00448a4d ()

 {
  FUN_00448a67();
  FUN_00448a8f();
  return;
}


 export function FUN_00448a67 ()

 {
  `eh_vector_constructor_iterator'(DAT_00647168, 0x3c, 8, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448a8f ()

 {
  _atexit(FUN_00448aac);
  return;
}


 export function FUN_00448aac ()

 {
  `eh_vector_destructor_iterator'(DAT_00647168, 0x3c, 8, FUN_005cde4d);
  return;
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
  FUN_00448ae9();
  FUN_00448b03();
  return;
}


 export function FUN_00448ae9 ()

 {
  DAT_00646198 = DAT_00646198;
  return;
}


 export function FUN_00448b03 ()

 {
  _atexit(FUN_00448b20);
  return;
}


 export function FUN_00448b20 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00448b3a ()

 {
  FUN_00448b54();
  FUN_00448b7c();
  return;
}


 export function FUN_00448b54 ()

 {
  `eh_vector_constructor_iterator'(DAT_00647b50, 0x3c, 4, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448b7c ()

 {
  _atexit(FUN_00448b99);
  return;
}


 export function FUN_00448b99 ()

 {
  `eh_vector_destructor_iterator'(DAT_00647b50, 0x3c, 4, FUN_005cde4d);
  return;
}


 export function FUN_00448bbc ()

 {
  FUN_00448bd6();
  FUN_00448bfe();
  return;
}


 export function FUN_00448bd6 ()

 {
  `eh_vector_constructor_iterator'(DAT_00646878, 0x3c, 7, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448bfe ()

 {
  _atexit(FUN_00448c1b);
  return;
}


 export function FUN_00448c1b ()

 {
  `eh_vector_destructor_iterator'(DAT_00646878, 0x3c, 7, FUN_005cde4d);
  return;
}


 export function FUN_00448c3e ()

 {
  FUN_00448c58();
  FUN_00448c80();
  return;
}


 export function FUN_00448c58 ()

 {
  `eh_vector_constructor_iterator'(DAT_00643798, 0x3c, 8, CString, FUN_005cde4d);
  return;
}


 export function FUN_00448c80 ()

 {
  _atexit(FUN_00448c9d);
  return;
}


 export function FUN_00448c9d ()

 {
  `eh_vector_destructor_iterator'(DAT_00643798, 0x3c, 8, FUN_005cde4d);
  return;
}


 export function FUN_00448cc0 ()

 {
  FUN_00448cda();
  FUN_00448d1c();
  return;
}


 export function FUN_00448cda ()

 {
  DAT_00647748 = DAT_00647748;
  DAT_006409d8 = DAT_006409d8;
  DAT_00644e48 = DAT_00644e48;
  DAT_0063fc98 = DAT_0063fc98;
  DAT_00648018 = DAT_00648018;
  return;
}


 export function FUN_00448d1c ()

 {
  _atexit(FUN_00448d39);
  return;
}


 export function FUN_00448d39 ()

 {
  FUN_005cde4d();
  FUN_005cde4d();
  FUN_005cde4d();
  FUN_005cde4d();
  FUN_005cde4d();
  return;
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
  FUN_00448d95();
  FUN_00448daf();
  return;
}


 export function FUN_00448d95 ()

 {
  DAT_0063fc58 = DAT_0063fc58;
  return;
}


 export function FUN_00448daf ()

 {
  _atexit(FUN_00448dcc);
  return;
}


 export function FUN_00448dcc ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00448e00();
  FUN_00448e1a();
  return;
}


 export function FUN_00448e00 ()

 {
  DAT_00643af8 = DAT_00643af8;
  return;
}


 export function FUN_00448e1a ()

 {
  _atexit(FUN_00448e37);
  return;
}


 export function FUN_00448e37 ()

 {
  FUN_005cde4d();
  return;
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
  FUN_00448e6b();
  FUN_00448e85();
  return;
}


 export function FUN_00448e6b ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00448e85 ()

 {
  _atexit(FUN_00448ea2);
  return;
}


 export function FUN_00448ea2 ()

 {
  FUN_005bd915();
  return;
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
  FUN_00448ed6();
  FUN_00448ef0();
  return;
}


 export function FUN_00448ed6 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00448ef0 ()

 {
  _atexit(FUN_00448f0d);
  return;
}


 export function FUN_00448f0d ()

 {
  FUN_005bd915();
  return;
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
  FUN_00448f41();
  FUN_00448f5b();
  return;
}


 export function FUN_00448f41 ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00448f5b ()

 {
  _atexit(FUN_00448f78);
  return;
}


 export function FUN_00448f78 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00448f92 (param_1)

 {
  let iVar1;
  let uVar2;

  iVar1 = FUN_004bd9f0(param_1, 0x18);
  if ((iVar1 !== 0)) {
    return 3;
  }
  iVar1 = FUN_004bd9f0(param_1, 0x25);
  if ((iVar1 === 0)) {
    iVar1 = FUN_004bd9f0(param_1, 0x26);
    if ((iVar1 !== 0)) {
      return 1;
    }
    uVar2 = 0;
  }
  else {
    uVar2 = 2;
  }
  return uVar2;
}


 export function FUN_00449030 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_f0;
  let local_e0;
  let local_d0;
  let local_c0;
  let local_b0;
  let local_ac;
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
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00449984;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_4c = DAT_ffffffb4;
  local_8 = 0;
  local_ac = DAT_ffffff54;
  local_8 = ((((local_8) >> 8) << 8) | 1);
  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_TERRAIN1.BMP_006266e0, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_TERRAIN1.GIF_006266f0, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_TERRAIN1.GIF_00626700, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_5c = 1;
  local_60 = 0x83;
  local_68 = 0xc4;
  local_64 = 1;
  (local_54 < 0xb) (local_54 = 0; local_54 = (local_54 < 0xb); local_54 = (local_54 + 1)) {
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_0044999c((DAT_00647c40 + local_54 * 0x3c), local_5c, local_64);
    FUN_0044999c((DAT_006482f8 + local_54 * 0x78), local_60, local_64);
    FUN_0044999c((DAT_00648334 + local_54 * 0x78), local_68, local_64);
    local_64 = (local_64 + 0x21);
  }
  local_5c = 0x1c8;
  local_64 = 0x64;
  (local_50 < 3) (local_50 = 0; local_50 = local_50; local_50 = (local_50 + 1)) {
    FUN_005cdf50();
    FUN_0044999c((DAT_006446b8 + local_50 * 0x3c), local_5c, local_64);
    local_64 = (local_64 + 0x21);
  }
  FUN_005cdf50();
  FUN_0044999c(DAT_00641808, local_5c, local_64);
  local_64 = (local_64 + 0x21);
  FUN_005cdf50();
  FUN_0044999c(DAT_0063fc18, local_5c, local_64);
  local_64 = (local_64 + 0x21);
  FUN_005cdf50();
  FUN_0044999c(DAT_00646158, local_5c, local_64);
  local_64 = 0x16c;
  local_5c = 1;
  (local_50 < 9) (local_50 = 0; local_50 = local_50; local_50 = (local_50 + 1)) {
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_0044999c((DAT_00642710 + local_50 * 0x3c), local_5c, local_64);
    FUN_0044999c((DAT_0064292c + local_50 * 0x3c), local_5c, (local_64 + 0x21));
    local_5c = (local_5c + 0x41);
  }
  FUN_005cdf50();
  FUN_0044999c(DAT_ffffffb4, 1, 0x1bf);
  FUN_005cdf50();
  FUN_0044999c(DAT_0063fcd8, 0x42, 0x1bf);
  FUN_005cdf50();
  FUN_0044999c(DAT_00646118, 0x83, 0x1bf);
  FUN_005cdf50();
  FUN_0044999c(DAT_00647ed8, 0x105, 0x1bf);
  FUN_005cdf50();
  FUN_0044999c(DAT_ffffff54, 0xc4, 0x1bf);
  (local_54 < 0xd) (local_54 = 0; local_54 = (local_54 < 0xd); local_54 = (local_54 + 1)) {
    FUN_005a9abf(DAT_0063fe08, 0, 0, 0x40, 0x20, 7);
    if ((local_54 < 0xb)) {
      FUN_005cef31(DAT_ffffff40, DAT_0063fe08, 0, 0);
    }
    else if ((local_54 === 0xb)) {
      FUN_005cef31(DAT_ffffff30, DAT_0063fe08, 0, 0);
    }
    else {
      FUN_005cef31(DAT_ffffff20, DAT_0063fe08, 0, 0);
    }
    FUN_005cef66(DAT_ffffff10, DAT_0063fe08, 0xa, 0, 0);
    (local_6c < 4) (local_6c = 0; local_6c = (local_6c < 4); local_6c = (local_6c + 1)) {
      if ((local_6c < 2)) {
        local_5c = 0x20;
      }
      else {
        local_5c = 0;
      }
      if ((2 < local_6c)) {
        local_64 = 0;
      }
      else {
        local_64 = 0x10;
      }
      FUN_005cdf50();
      FUN_004499d3((DAT_00640bd8 + (local_54 * 0xf0 + local_6c * 0x3c)), local_5c, local_64, 0x20, 0x10);
    }
  }
  FUN_004083f0();
  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_TERRAIN2.BMP_00626710, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_TERRAIN2.GIF_00626720, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_TERRAIN2.GIF_00626730, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_58 = 1;
  local_70 = 0x43;
  (local_50 < 0x10) (local_50 = 0; local_50 = local_50; local_50 = (local_50 + 1)) {
    local_5c = (local_50 & 7) * 0x41;
    local_64 = (local_50 >> 3) * 0x21;
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_0044999c((DAT_0063f858 + local_50 * 0x3c), (local_58 + local_5c), (local_70 + local_64));
    FUN_0044999c((DAT_006461d8 + local_50 * 0x3c), (local_58 + local_5c), ((local_70 + local_64) + 0x42));
    FUN_0044999c((DAT_00647388 + local_50 * 0x3c), (local_58 + local_5c), ((local_70 + local_64) + 0x84));
    FUN_0044999c((DAT_006447b0 + local_50 * 0x3c), (local_58 + local_5c), ((local_70 + local_64) + 0xc6));
  }
  local_58 = 1;
  local_70 = 0x1ad;
  (local_b0 < 8) (local_b0 = 0; local_b0 = (local_b0 < 8); local_b0 = (local_b0 + 1)) {
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_004499d3((DAT_00643b38 + local_b0 * 0xf0), local_58, local_70, 0x20, 0x10);
    FUN_004499d3((DAT_00643b74 + local_b0 * 0xf0), (local_58 + 0x21), (local_70 + 0x22), 0x20, 0x10);
    FUN_004499d3((DAT_00643bb0 + local_b0 * 0xf0), local_58, (local_70 + 0x11), 0x20, 0x10);
    FUN_004499d3((DAT_00643bec + local_b0 * 0xf0), local_58, (local_70 + 0x22), 0x20, 0x10);
    local_58 = (local_58 + 0x42);
  }
  local_58 = 1;
  local_70 = 0x14b;
  (local_50 < 4) (local_50 = 0; local_50 = local_50; local_50 = (local_50 + 1)) {
    FUN_005cdf50();
    FUN_0044999c((DAT_0063fd18 + local_50 * 0x3c), local_58, local_70);
    local_58 = (local_58 + 0x41);
  }
  FUN_004083f0();
  local_8 = (local_8 & -0x100);
  FUN_0044996f();
  local_8 = -1;
  FUN_0044997b();
  FUN_0044998e();
  return;
}


 export function FUN_0044996f ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044997b ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044998e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044999c (param_1, param_2, param_3)

 {
  FUN_005cedad(DAT_0063fe08, 7, param_2, param_3, 0x40, 0x20);
  FUN_005cf467(9, 7);
  return;
}


 export function FUN_004499d3 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005cedad(DAT_0063fe08, 7, param_2, param_3, param_4, param_5);
  FUN_005cf467(9, 7);
  return;
}


 export function FUN_00449a0e ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_46c;
  let local_464;
  let local_460;
  let local_45c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044ab5a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  __chdir(DAT_0064bb08);
  iVar1 = FUN_005bf5e1(0x55, 0xa, 0xc0, DAT_fffffba4);
  if ((iVar1 === 0)) {
    __chdir(DAT_00655020);
    FUN_005bf5e1(0x55, 0xa, 0xc0, DAT_fffffba4);
  }
  __chdir(DAT_00655020);
  local_20 = 1;
  local_24 = 1;
  local_460 = 0;
  (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00644b70 + local_18 * 0x3c), local_20, local_24, 0x5b, 0x48);
    local_20 = (local_20 + 0x5c);
    local_460 = (local_460 + 1);
    if ((local_460 === 6)) {
      local_20 = 1;
      local_24 = (local_24 + 0x49);
    }
  }
  FUN_004083f0();
  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_ICONS.BMP_00626740, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_ICONS.GIF_0062674c, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_ICONS.GIF_00626758, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044999c(DAT_00640b98, 0xc7, 0x100);
  FUN_0044999c(DAT_00646198, 0xc7, 0x121);
  FUN_0044999c(DAT_00647bc8, 0xf8, 0x1ae);
  FUN_005cdf50();
  FUN_0044abd5(1, 0x20, 0xbb);
  FUN_005cdf50();
  FUN_0044ab72(DAT_0064668c, 0x22, 0xdf);
  FUN_005cdf50();
  FUN_004499d3(DAT_006466c8, 0x43, 0xdf, 0x20, 0x20);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044ab72(DAT_00646704, 0x64, 0xdf);
  FUN_0044ab72(DAT_00646740, 0x85, 0xdf);
  FUN_004499d3(DAT_0064677c, 0xa6, 0xdf, 0x1e, 0x1e);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044ab72(DAT_0063f6f0, 0xc7, 0x100);
  FUN_0044ab72(DAT_0063f72c, 0xe8, 0x100);
  FUN_0044ab72(DAT_0063f7e0, 0x109, 0x100);
  FUN_0044ab72(DAT_0063f81c, 0x12a, 0x100);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_0063f768, 0x137, 1, 0x1f, 0x60);
  FUN_004499d3(DAT_0063f7a4, 0x137, 0x62, 0x1f, 0x60);
  FUN_004499d3(DAT_00648098, 0x109, 0x121, 0x38, 0x83);
  local_20 = 1;
  local_24 = 0x122;
  (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    (local_28 < 2) (local_28 = 0; local_28 = (local_28 < 2); local_28 = (local_28 + 1)) {
      FUN_005cdf50();
      FUN_005cdf50();
      FUN_0044aba9((DAT_00644f00 + local_18 * 0x78), local_20, local_24, 0xe);
      FUN_0044aba9((DAT_00644f3c + local_18 * 0x78), local_20, (local_24 + 0xf), 0xe);
    }
    local_20 = (local_20 + 0xf);
  }
  local_20 = 1;
  local_24 = 0x140;
  (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_0044aba9((DAT_00648860 + local_18 * 0x3c), local_20, local_24, 0xe);
    local_20 = (local_20 + 0xf);
  }
  local_20 = 0x31;
  local_24 = 0x14e;
  (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_0044aba9((DAT_00645068 + local_18 * 0x3c), local_20, local_24, 0xa);
    local_20 = (local_20 + 0xb);
  }
  local_20 = 0x31;
  local_24 = 0x159;
  (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_0044aba9((DAT_00648918 + local_18 * 0x3c), local_20, local_24, 0xa);
    local_20 = (local_20 + 0xb);
  }
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044aba9(DAT_00646598, 0x52, 0x14e, 0xa);
  FUN_0044aba9(DAT_00648058, 0x52, 0x159, 0xa);
  local_20 = 0x31;
  local_24 = 0x122;
  (local_18 < 4) (local_18 = 0; local_18 = (local_18 < 4); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_0044aba9((DAT_00648118 + local_18 * 0x3c), local_20, local_24, 0xe);
    FUN_0044aba9((DAT_00648208 + local_18 * 0x3c), local_20, 0x131, 0xe);
    local_20 = (local_20 + 0xf);
  }
  local_20 = 1;
  local_24 = 0x164;
  (local_18 < 8) (local_18 = 0; local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00647168 + local_18 * 0x3c), local_20, local_24, 0x20, 0x20);
    local_20 = (local_20 + 0x21);
  }
  FUN_005bd65c(0x40, 0x20);
  FUN_005a9afe(DAT_0063fe08, DAT_00647f18, 0xc7, 0x142, 0, 0, 0x40, 0x20);
  FUN_0059d59d(DAT_00647f18);
  FUN_005520fa(DAT_00647f18);
  FUN_005bd65c(0x20, 0x20);
  FUN_005a9afe(DAT_0063fe08, DAT_00640990, 0x12a, 0xbe, 0, 0, 0x20, 0x20);
  DAT_00635aa4 = DAT_00640990;
  local_20 = 0x157;
  local_24 = 1;
  local_464 = 0;
  (local_18 < 0x27) (local_18 = 1; local_18 = (local_18 < 0x27); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00645160 + local_18 * 0x3c), local_20, local_24, 0x24, 0x14);
    local_20 = (local_20 + 0x25);
    local_464 = (local_464 + 1);
    if ((7 < local_464)) {
      local_464 = 0;
      local_24 = (local_24 + 0x15);
      local_20 = 0x157;
    }
  }
  local_20 = 0x157;
  local_24 = 0x6a;
  local_464 = 0;
  (local_18 < 0x1c) (local_18 = 0; local_18 = (local_18 < 0x1c); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00645a84 + local_18 * 0x3c), local_20, local_24, 0x24, 0x14);
    local_20 = (local_20 + 0x25);
    local_464 = (local_464 + 1);
    if ((6 < local_464)) {
      local_464 = 0;
      local_24 = (local_24 + 0x15);
      local_20 = 0x157;
    }
  }
  local_24 = 0xd3;
  (local_18 < 4) (local_18 = 0; local_18 = (local_18 < 4); local_18 = (local_18 + 1)) {
    local_20 = 0x157;
    (local_1c < 5) (local_1c = 0; local_1c = (local_1c < 5); local_1c = (local_1c + 1)) {
      FUN_005cdf50();
      FUN_004499d3((DAT_00646cb8 + (local_18 * 0x3c + local_1c * 0xf0)), local_20, local_24, 0x24, 0x14);
      local_20 = (local_20 + 0x25);
    }
    local_24 = (local_24 + 0x15);
  }
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_00647b50, 0x15e, 0xff, 0x40, 0x20);
  FUN_004499d3(DAT_00647b8c, 0x15e, 0x120, 0x40, 0x20);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_00645120, 1, 0x185, 0x10, 0x10);
  FUN_004499d3(DAT_00648820, 0x12, 0x185, 0x10, 0x10);
  FUN_004499d3(DAT_00647788, 0x23, 0x185, 0x10, 0x10);
  FUN_004499d3(DAT_00647348, 0x34, 0x185, 0x10, 0x10);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_00644770, 0xe3, 0x185, 0x12, 0x18);
  FUN_004499d3(DAT_006480d8, 0xf6, 0x185, 0x12, 0x18);
  FUN_004083f0();
  __chdir(DAT_00655020);
  iVar1 = FUN_005bf071(s_EDITORPT.GIF_00626764, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 !== 0)) {
    local_20 = 1;
    local_24 = 0x1bf;
    (local_18 < 0xf) (local_18 = 0; local_18 = (local_18 < 0xf); local_18 = (local_18 + 1)) {
      FUN_005cdf50();
      FUN_004499d3((DAT_006477c8 + local_18 * 0x3c), local_20, local_24, 0x20, 0x20);
      local_20 = (local_20 + 0x21);
    }
  }
  FUN_005cdf50();
  FUN_005cedad(DAT_0063fe08, 7, 0x23f, 1, 0x40, 0x30);
  FUN_005cdf50();
  FUN_005cedad(DAT_0063fe08, 7, 0x23f, 0x32, 0x40, 0x20);
  FUN_004083f0();
  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_PEOPLE.BMP_00626774, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_PEOPLE.GIF_00626780, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_PEOPLE.GIF_0062678c, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_24 = 6;
  (local_14 < 4) (local_14 = 0; local_14 = (local_14 < 4); local_14 = (local_14 + 1)) {
    local_20 = 2;
    (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
      FUN_005cdf50();
      FUN_004499d3((DAT_00642d48 + (local_18 * 0x3c + local_14 * 0x294)), local_20, local_24, 0x1b, 0x1e);
      local_20 = (local_20 + 0x1c);
    }
    local_24 = (local_24 + 0x1f);
  }
  local_20 = 2;
  local_24 = 0x89;
  (local_18 < 0xb) (local_18 = 0; local_18 = (local_18 < 0xb); local_18 = (local_18 + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00646a20 + local_18 * 0x3c), local_20, local_24, 0xf, 0x1a);
    local_20 = (local_20 + 0x10);
  }
  FUN_004083f0();
  __chdir(DAT_0064bb08);
  iVar1 = FUN_005bf5e1(0x56, 0xa, 0xc0, DAT_fffffba4);
  if ((iVar1 === 0)) {
    __chdir(DAT_00655020);
    FUN_005bf5e1(0x56, 0xa, 0xc0, DAT_fffffba4);
  }
  __chdir(DAT_00655020);
  local_20 = 2;
  local_24 = 0x44;
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_00646878, local_20, local_24, 0x22, 0x22);
  FUN_004499d3(DAT_006468b4, local_20, local_24, 0x22, 0x22);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_0064692c, local_20, local_24, 0x22, 0x22);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_00646968, local_20, local_24, 0x22, 0x22);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_006468f0, local_20, local_24, 0x22, 0x22);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_006469e0, local_20, local_24, 0x22, 0x22);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_006469a4, local_20, local_24, 0x22, 0x22);
  local_20 = 2;
  local_24 = 0xc8;
  FUN_005cdf50();
  FUN_004499d3(DAT_00647748, local_20, local_24, 0x40, 0x40);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_006409d8, local_20, local_24, 0x40, 0x40);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_00644e48, local_20, local_24, 0x40, 0x40);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_0063fc98, local_20, local_24, 0x40, 0x40);
  local_20 = (local_20 + 0x42);
  FUN_005cdf50();
  FUN_004499d3(DAT_00648018, local_20, local_24, 0x40, 0x40);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_004499d3(DAT_0063fc58, 0x18e, 0x86, 0x40, 0x40);
  FUN_004499d3(DAT_00643af8, 0x86, 0x18e, 0x40, 0x40);
  (local_46c < 8) (local_46c = 0; local_46c = (local_46c < 8); local_46c = (local_46c + 1)) {
    FUN_005cdf50();
    FUN_004499d3((DAT_00643798 + local_46c * 0x3c), 2, 0x18e, 0x40, 0x40);
    FUN_005cf467(8, s32((DAT_00655358 + local_46c * 0x10), 0));
  }
  FUN_004083f0();
  local_8 = -1;
  FUN_0044ab4e();
  FUN_0044ab64();
  return;
}


 export function FUN_0044ab4e ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0044ab64 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044ab72 (param_1, param_2, param_3)

 {
  FUN_005cedad(DAT_0063fe08, 7, param_2, param_3, 0x20, 0x20);
  FUN_005cf467(9, 7);
  return;
}


 export function FUN_0044aba9 (param_1, param_2, param_3, param_4)

 {
  FUN_004499d3(param_1, param_2, param_3, param_4, param_4);
  return;
}


 export function FUN_0044abd5 (param_1, param_2, param_3)

 {
  FUN_0044ac07((DAT_006465d8 + param_1 * 0x3c), param_2, param_3);
  return;
}


 export function FUN_0044ac07 (param_1, param_2, param_3)

 {
  FUN_005cedad(DAT_0063fe08, 7, param_2, param_3, 0x40, 0x30);
  FUN_005cf467(9, 7);
  return;
}


 export function FUN_0044ac3e (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let local_14;
  let local_c;

  w32((DAT_00640a18 + (param_3 * 4 + (param_1 * 0x20 + param_2 * 8))), 0, 0);
  w32((DAT_00640ad8 + (param_3 * 4 + (param_1 * 0x20 + param_2 * 8))), 0, 0);
  (local_c < 0x40) (local_c = 0; local_c = (local_c < 0x40); local_c = (local_c + 1)) {
    iVar1 = FUN_005c0bf2(((local_c + (param_4 + -1)) + 1), (param_5 + -1));
    if ((iVar1 === 4)) {
      w32((DAT_00640a18 + (param_3 * 4 + (param_1 * 0x20 + param_2 * 8))), 0, (local_c + -1));
    }
  }
  (local_14 < 0x30) (local_14 = 0; local_14 = (local_14 < 0x30); local_14 = (local_14 + 1)) {
    iVar1 = FUN_005c0bf2((param_4 + -1), ((local_14 + (param_5 + -1)) + 1));
    if ((iVar1 === 4)) {
      w32((DAT_00640ad8 + (param_3 * 4 + (param_1 * 0x20 + param_2 * 8))), 0, (local_14 + -15));
    }
  }
  return;
}


 export function FUN_0044ad47 (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let local_14;
  let local_c;

  w32((DAT_00643978 + (param_2 * 8 + (param_1 * 0x20 + param_3 * 4))), 0, 0);
  w32((DAT_00643a38 + (param_2 * 8 + (param_1 * 0x20 + param_3 * 4))), 0, 0);
  (local_c < 0x40) (local_c = 0; local_c = (local_c < 0x40); local_c = (local_c + 1)) {
    iVar1 = FUN_005c0bf2(((local_c + (param_4 + -1)) + 1), (param_5 + -1));
    if ((iVar1 === 3)) {
      w32((DAT_00643978 + (param_2 * 8 + (param_1 * 0x20 + param_3 * 4))), 0, local_c);
    }
  }
  (local_14 < 0x30) (local_14 = 0; local_14 = (local_14 < 0x30); local_14 = (local_14 + 1)) {
    iVar1 = FUN_005c0bf2((param_4 + -1), ((local_14 + (param_5 + -1)) + 1));
    if ((iVar1 === 3)) {
      w32((DAT_00643a38 + (param_2 * 8 + (param_1 * 0x20 + param_3 * 4))), 0, local_14);
    }
  }
  return;
}


 export function FUN_0044ae4c ()

 {
  let iVar1;
  let uVar2;
  let local_28;
  let local_24;
  let local_14;
  let local_c;
  let local_8;

  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_CITIES.BMP_00626798, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_CITIES.GIF_006267a4, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_CITIES.GIF_006267b0, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_14 = 0x27;
  (local_28 < 6) (local_28 = 0; local_28 = (local_28 < 6); local_28 = (local_28 + 1)) {
    (local_8 < 4) (local_8 = 0; local_8 = (local_8 < 4); local_8 = (local_8 + 1)) {
      FUN_005cdf50();
      FUN_005cdf50();
      iVar1 = local_8 * 0x41;
      FUN_0044ac07((DAT_0063fe50 + (local_28 * 0x1e0 + local_8 * 0x78)), (iVar1 + 1), local_14);
      FUN_0044ac3e(local_28, local_8, 0, (iVar1 + 1), local_14);
      FUN_0044ad47(local_28, local_8, 0, (iVar1 + 1), local_14);
      FUN_0044ac07((DAT_0063fe8c + (local_28 * 0x1e0 + local_8 * 0x78)), (iVar1 + 0x14e), local_14);
      FUN_0044ac3e(local_28, local_8, 1, (iVar1 + 0x14e), local_14);
      FUN_0044ad47(local_28, local_8, 1, (iVar1 + 0x14e), local_14);
    }
    local_14 = (local_14 + 0x31);
  }
  local_c = 1;
  (local_24 < 8) (local_24 = 0; local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
    FUN_005cdf50();
    FUN_005cdf50();
    FUN_004499d3((DAT_006442f8 + local_24 * 0x78), local_c, 0x1a9, 0xe, 0x16);
    FUN_004499d3((DAT_00644334 + local_24 * 0x78), local_c, 0x1c0, 0xe, 0x16);
    uVar2 = FUN_005c0bf2((local_c + 3), 0x1ad);
    w32((DAT_00655358 + local_24 * 0x10), 0, uVar2);
    uVar2 = FUN_005c0bf2((local_c + 6), 0x1ad);
    w32((DAT_0065535c + local_24 * 0x10), 0, uVar2);
    uVar2 = FUN_005c0bf2(local_c, 0x1a7);
    w32((DAT_00655360 + local_24 * 0x10), 0, uVar2);
    local_c = (local_c + 0xf);
  }
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044ac07(DAT_006465d8, 0x8f, 0x1a7);
  FUN_0044ac07(DAT_00646650, 0xd0, 0x1a7);
  FUN_005cdf50();
  FUN_005cdf50();
  FUN_0044ac07(DAT_00647fa0, 0x111, 0x1a7);
  FUN_0044ac07(DAT_00647fdc, 0x152, 0x1a7);
  FUN_004083f0();
  return;
}


 export function FUN_0044b239 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_14;
  let local_c;

  w32((DAT_00642c48 + param_1 * 4), 0, 0);
  w32((DAT_00642b48 + param_1 * 4), 0, 0);
  (local_c < 0x40) (local_c = 0; local_c = (local_c < 0x40); local_c = (local_c + 1)) {
    iVar1 = FUN_005c0bf2((((param_2 + -1) + local_c) + 1), (param_3 + -1));
    if ((iVar1 === 4)) {
      w32((DAT_00642c48 + param_1 * 4), 0, local_c);
    }
  }
  (local_14 < 0x30) (local_14 = 0; local_14 = (local_14 < 0x30); local_14 = (local_14 + 1)) {
    iVar1 = FUN_005c0bf2((param_2 + -1), (((param_3 + -1) + local_14) + 1));
    if ((iVar1 === 4)) {
      w32((DAT_00642b48 + param_1 * 4), 0, local_14);
    }
  }
  return;
}


 export function FUN_0044b30e ()

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  __chdir(DAT_0064bb08);
  iVar1 = FUN_0046f460(DAT_0063fe08, s_UNITS.BMP_006267bc, 0xa, 0xc0, DAT_006a8c00);
  if ((iVar1 === 0)) {
    iVar1 = FUN_005bf071(s_UNITS.GIF_006267c8, 0xa, 0xc0, DAT_006a8c00);
    if ((iVar1 === 0)) {
      __chdir(DAT_00655020);
      FUN_005bf071(s_UNITS.GIF_006267d4, 0xa, 0xc0, DAT_006a8c00);
    }
    else {
      __chdir(DAT_00655020);
    }
  }
  else {
    __chdir(DAT_00655020);
  }
  local_18 = 0;
  local_c = 1;
  local_8 = 1;
  (local_14 < 0x3f) (local_14 = 0; local_14 = (local_14 < 0x3f); local_14 = (local_14 + 1)) {
    FUN_005cdf50();
    FUN_0044ac07((DAT_00641848 + local_14 * 0x3c), local_8, local_c);
    FUN_0044b239(local_14, local_8, local_c);
    local_18 = (local_18 + 1);
    local_8 = (local_8 + 0x41);
    if ((8 < local_18)) {
      local_18 = 0;
      local_c = (local_c + 0x31);
      local_8 = 1;
    }
  }
  FUN_005cdf50();
  FUN_004499d3(DAT_00647f60, 0x24a, 1, 0xc, 0x14);
  FUN_004083f0();
  return;
}


 export function FUN_0044b49e ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044b502;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_0044ae4c();
  FUN_00449a0e();
  FUN_00449030();
  FUN_0044b30e();
  local_8 = -1;
  FUN_0044b4f6();
  FUN_0044b50c();
  return;
}


 export function FUN_0044b4f6 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_0044b50c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044c5a0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044c62b;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  FUN_0044c670();
  w32(in_ECX, 0, PTR_FUN_0061c060);
  w32(in_ECX, 0x40, 0);
  w32(in_ECX, 0x44, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0044c670 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044c6ee;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  w32((in_ECX + 0xb8), 0, 0);
  w32((in_ECX + 0xbc), 0, 0);
  w32((in_ECX + 0xc0), 0, 0);
  _MEM[(in_ECX + 0xc4)] = 1;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0044c730 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044c848;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005db610();
  local_8 = 0;
  in_ECX = (in_ECX + 0x10);
  w32((in_ECX + 0x78), 0, 0);
  w32((in_ECX + 0x98), 0, 0);
  w32((in_ECX + 0x9c), 0, 0);
  w32((in_ECX + 0x7c), 0, 0);
  w32((in_ECX + 0x80), 0, 0);
  w32((in_ECX + 0x84), 0, 0x4000);
  w32((in_ECX + 0x88), 0, 0x4000);
  w32((in_ECX + 0xa8), 0, 0);
  w32((in_ECX + 0xac), 0, 0);
  w32((in_ECX + 0x8c), 0, 0);
  w32((in_ECX + 0x90), 0, 1);
  w32((in_ECX + 0x94), 0, 1);
  w32((in_ECX + 0xa0), 0, 0);
  w32((in_ECX + 0xa4), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* CString::CString(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function CString (this)

 {
  FUN_0044c8e0();
  return this;
}


 export function FUN_0044c8e0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 2, 0);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 4, 0);
  w32(in_ECX, 5, 0);
  w32(in_ECX, 6, 0);
  w32(in_ECX, 7, 0);
  w32(in_ECX, 8, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 0xa, 0);
  w32(in_ECX, 0xb, 0);
  w32(in_ECX, 0xc, 0);
  w32(in_ECX, 0xd, 0);
  w32(in_ECX, 0xe, 0);
  w32(in_ECX, 0xf, 0);
  w32(in_ECX, 0x10, 0);
  w32(in_ECX, 0x11, 0);
  w32(in_ECX, 0x12, 0);
  w32(in_ECX, 0x13, 0);
  w32(in_ECX, 0x14, 0);
  w32(in_ECX, 0x15, 0);
  w32(in_ECX, 0x16, 0);
  w32(in_ECX, 0x17, 0);
  w32(in_ECX, 0x18, 0);
  w32(in_ECX, 0x19, 0);
  return;
}


 export function FUN_0044ca40 ()

 {
  return;
}


 export function FUN_0044ca60 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0044cadc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  FUN_0044caab();
  local_8 = -1;
  FUN_0044cad3();
  FUN_0044cae6();
  return;
}


 export function FUN_0044caab (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  if ((s32((unaff_EBP + -20), 0) === 0)) {
    w32((unaff_EBP + -16), 0, 0);
  }
  else {
    w32((unaff_EBP + -16), 0, (s32((unaff_EBP + -20), 0) + 0x10));
  }
  FUN_0044ca40();
  return;
}


 export function FUN_0044cad3 ()

 {
  FUN_005db650();
  return;
}


 export function FUN_0044cae6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044cb20 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0044cb67;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = -1;
  FUN_0044cb5e();
  FUN_0044cb71();
  return;
}


 export function FUN_0044cb5e ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_0044cb71 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044cba0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0044cc32;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061c060);
  w32(in_ECX, 0x44, 0);
  local_8 = 0;
  FUN_0044cc01();
  local_8 = -1;
  FUN_0044cc29();
  FUN_0044cc3c();
  return;
}


 export function FUN_0044cc01 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  if ((s32((unaff_EBP + -20), 0) === 0)) {
    w32((unaff_EBP + -16), 0, 0);
  }
  else {
    w32((unaff_EBP + -16), 0, (s32((unaff_EBP + -20), 0) + 0x48));
  }
  FUN_0044cb20();
  return;
}


 export function FUN_0044cc29 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0044cc3c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044cc80 (param_1)

 {
  let bVar1;
  let unaff_FS_OFFSET;
  let local_1c50;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044cd83;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  bVar1 = 0;
  FUN_0044ce16(param_1);
  local_8 = 0;
  (local_1c50 < 7) (local_1c50 = 0; local_1c50 = (local_1c50 < 7); local_1c50 = (local_1c50 + 1)) {
    if ((DAT_0064ca93[(param_1 * 0x594 + local_1c50)] < 4)) {
      bVar1 = 1;
    }
  }
  if ((((~DAT_0064ca9b[param_1 * 0x594]) & 0x7f) !== 0)) {
    bVar1 = 1;
  }
  if (bVar1) {
    FUN_0044d296();
  }
  local_8 = -1;
  FUN_0044cd77();
  FUN_0044cd8d();
  return;
}


 export function FUN_0044cd77 ()

 {
  FUN_0044d027();
  return;
}


 export function FUN_0044cd8d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044cd9b (param_1)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044cdfe;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  FUN_0044ce16(param_1);
  local_8 = 0;
  FUN_0044d9c1();
  local_8 = -1;
  FUN_0044cdf2();
  FUN_0044ce08();
  return;
}


 export function FUN_0044cdf2 ()

 {
  FUN_0044d027();
  return;
}


 export function FUN_0044ce08 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044ce16 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044d00c;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_004502b0();
  local_8 = 2;
  FUN_0044c5a0();
  local_8 = 3;
  FUN_005bd630();
  local_8 = 4;
  FUN_0046ab30();
  local_8 = 5;
  FUN_0059db08(0x4000);
  local_8 = 6;
  FUN_0043c690();
  local_8 = ((((local_8) >> 8) << 8) | 7);
  FUN_005bcaa7((in_ECX + 0x4ec));
  w32((in_ECX + 0x500), 0, param_1);
  DAT_00626810 = in_ECX;
  w32((in_ECX + 0x1928), 0, 1);
  (local_14 < 8) (local_14 = 0; local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
    if ((DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_14)] < 4)) {
      w32((in_ECX + 0x1928), 0, 0);
    }
  }
  FUN_006e7d90((in_ECX + 0x1c24), 0, 0x1c2, 0x280, 0x1e0);
  FUN_0043c6c0(0, 0x12, 3);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0044d027 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0044d14a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 7;
  DAT_00626810 = 0;
  FUN_00450340();
  local_8 = 6;
  FUN_0044d0d8();
  local_8 = 5;
  FUN_0044d0e7();
  local_8 = 4;
  FUN_0044d0f6();
  local_8 = 3;
  FUN_0044d105();
  local_8 = 2;
  FUN_0044d114();
  local_8 = 1;
  FUN_0044d123();
  local_8 = (0 << 8);
  FUN_0044d132();
  local_8 = -1;
  FUN_0044d141();
  FUN_0044d154();
  return;
}


 export function FUN_0044d0d8 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0044d0e7 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0044d0f6 ()

 {
  FUN_0046ab49();
  return;
}


 export function FUN_0044d105 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0044d114 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_0044d123 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0044d132 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0044d141 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_0044d154 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044d162 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_84;

  FUN_004aef20(DAT_ffffff7c);
  FUN_0043c840(DAT_ffffff7c, s_pv.dll_00626814);
  iVar1 = FUN_00564713(DAT_ffffff7c);
  if ((iVar1 !== 0)) {
    FUN_004502e0(DAT_ffffff7c);
    FUN_005c5fc4(DAT_0062681c, 0x800, 0, 0, s32((in_ECX + 0x4f4), 0), (s32((in_ECX + 0x4f8), 0) + 5), DAT_006a8c00, DAT_006553d8);
    FUN_00419ba0(0);
    FUN_005bb4ae(DAT_00626820, 0x800, 0, 0, 0x280, 0x1e0, (in_ECX + 0xb8), in_ECX);
    FUN_00450400();
    FUN_00408130(LAB_004034bd);
    in_ECX = (in_ECX + 0x55c);
  }
  return (iVar1 !== 0);
}


 export function FUN_0044d296 (in_ECX)

 {
  let iVar1;
  let pcVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_428;
  let local_420;
  let local_20;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044d9a9;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  iVar1 = FUN_0044d162();
  if ((iVar1 === 0)) {
    FUN_0044d9b3();
    return;
  }
  iVar1 = FUN_0044db92();
  if ((iVar1 !== 0)) {
    FUN_005bd65c(0x280, 0x1e0);
    FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
    FUN_005c0593((in_ECX + 0x618), DAT_ffffffe0, DAT_ffffffe0);
    FUN_0043c460(1, 0x18);
    local_8 = 0;
    iVar1 = FUN_004a2379(DAT_006558e8, s_THRONE_00626824);
    if ((iVar1 === 0)) {
      FUN_004aef20(DAT_fffffbe0);
      while ((_MEM[pcVar2] !== 0x40)) {
        FUN_0043c840(DAT_fffffbe0, DAT_00673f14);
        FUN_0043c840(DAT_fffffbe0, DAT_0062682c);
      }
      FUN_006e7d90(DAT_ffffffe0, 0x64, 0x78, 0x21c, 0x1c2);
      FUN_005c19ad(0);
      FUN_005c1167(DAT_fffffbd8, DAT_fffffbe0, DAT_ffffffe0, 0);
      FUN_006e7da4(DAT_ffffffe0, 2, 2);
      FUN_005c19ad(0xff);
      FUN_005c1167(DAT_fffffbd8, DAT_fffffbe0, DAT_ffffffe0, 0);
      FUN_004a2020();
      FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
    }
    FUN_0044dab5();
    w32((in_ECX + 0x1924), 0, 0);
    FUN_00408650();
    FUN_00419b80();
    FUN_00450390((in_ECX + 0xb8));
    FUN_004085f0();
    FUN_00419b80();
    FUN_00421bd0();
    FUN_00414ce0();
    if ((2 < DAT_00655b02)) {
      in_ECX = (in_ECX + 0x54c);
    }
    FUN_005c61b0();
    in_ECX = (in_ECX + 0x54c);
    FUN_00414d40();
    iVar1 = FUN_0044e790();
    if ((iVar1 !== 0)) {
      iVar1 = FUN_004a2379(DAT_006558e8, s_ADDTOTHRONE_00626830);
      if ((iVar1 === 0)) {
        FUN_004aef20(DAT_fffffbe0);
        while ((_MEM[pcVar2] !== 0x40)) {
          FUN_0043c840(DAT_fffffbe0, DAT_00673f14);
          FUN_0043c840(DAT_fffffbe0, DAT_0062683c);
        }
        FUN_006e7d90(DAT_ffffffe0, 0x64, 0x78, 0x21c, 0x1c2);
        FUN_005c19ad(0);
        FUN_005c1167(DAT_fffffbd8, DAT_fffffbe0, DAT_ffffffe0, 0);
        FUN_006e7da4(DAT_ffffffe0, 2, 2);
        FUN_005c19ad(0xff);
        FUN_005c1167(DAT_fffffbd8, DAT_fffffbe0, DAT_ffffffe0, 0);
        FUN_004a2020();
        FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
      }
      FUN_0044dab5();
      w32((in_ECX + 0x1924), 0, 1);
      FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
      FUN_005683c5((in_ECX + 0x504), DAT_ffffffe0, 8, 4);
      FUN_00408460();
      FUN_00421bd0();
      FUN_00414ce0();
      if ((2 < DAT_00655b02)) {
        in_ECX = (in_ECX + 0x54c);
      }
      FUN_005c61b0();
      in_ECX = (in_ECX + 0x54c);
      FUN_00414d40();
      FUN_0046e020(0xd, 1, 0, 0);
      FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
      FUN_005c0593((in_ECX + 0x504), DAT_ffffffe0, DAT_ffffffe0);
      FUN_00407ff0();
      FUN_005683c5((in_ECX + 0x504), DAT_ffffffe0, 8, 3);
      FUN_00408460();
      FUN_00419b80();
      if ((s32((in_ECX + 0x1928), 0) === 0)) {
        DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + s32((in_ECX + 0x192c), 0))] = (DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + s32((in_ECX + 0x192c), 0))] + 1);
      }
      else {
        DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594] = (DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594] | (((1 << (_MEM[(in_ECX + 0x192c)] & 0x1f))) & 0xFF));
      }
      iVar1 = FUN_0044db92();
      if ((iVar1 !== 0)) {
        FUN_0046e020(0xd, 1, 0, 0);
        FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x280, 0x1e0);
        FUN_005683c5((in_ECX + 0x504), DAT_ffffffe0, 4, 1);
        FUN_0044dab5();
        FUN_00408460();
        w32((in_ECX + 0x1924), 0, 0);
        FUN_00414ce0();
        if ((2 < DAT_00655b02)) {
          in_ECX = (in_ECX + 0x54c);
        }
        FUN_005c61b0();
        in_ECX = (in_ECX + 0x54c);
        FUN_00414d40();
        FUN_004503d0();
        FUN_00419b80();
      }
      FUN_00450390(DAT_006a8c00);
      FUN_004503d0();
      FUN_00419b80();
      local_8 = -1;
      FUN_0044d99d();
      FUN_0044d9b3();
      return;
    }
    local_8 = -1;
    FUN_0044d99d();
    FUN_0044d9b3();
    return;
  }
  FUN_0044d9b3();
  return;
}


 export function FUN_0044d99d ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_0044d9b3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044d9c1 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0044d162();
  if ((iVar1 !== 0)) {
    FUN_0044dab5();
    w32((in_ECX + 0x1924), 0, 0);
    FUN_00408650();
    FUN_00419b80();
    FUN_00450390((in_ECX + 0xb8));
    FUN_004085f0();
    FUN_00419b80();
    if ((2 < DAT_00655b02)) {
      in_ECX = (in_ECX + 0x54c);
    }
    FUN_005c61b0();
    in_ECX = (in_ECX + 0x54c);
    FUN_004503d0();
    FUN_00419b80();
    FUN_00450390(DAT_006a8c00);
    FUN_004503d0();
    FUN_00419b80();
  }
  return;
}


 export function FUN_0044dab5 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_0040bbb0();
  FUN_0040bbe0(DAT_00626840);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x720), 0));
  FUN_0040bbe0(uVar1);
  FUN_0040bbe0(DAT_00626844);
  FUN_005c19ad(0);
  FUN_005c1020((in_ECX + 0x1c34), DAT_00679640, (in_ECX + 0x1c24), 0);
  FUN_006e7da4((in_ECX + 0x1c24), -1, -1);
  FUN_005c19ad(0xff);
  FUN_005c1020((in_ECX + 0x1c34), DAT_00679640, (in_ECX + 0x1c24), 0);
  FUN_006e7da4((in_ECX + 0x1c24), 1, 1);
  return;
}


 export function FUN_0044db92 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_150;
  let local_140;
  let local_13c;
  let local_12c;
  let local_128;
  let local_118;
  let local_114;
  let local_104;
  let local_100;
  let local_f0;
  let local_ec;
  let local_dc;
  let local_d8;
  let local_c8;
  let local_c4;
  let local_b4;
  let local_b0;
  let local_a0;
  let local_9c;
  let local_54;
  let local_50;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044e777;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  local_54 = 0;
  do {
    if ((2 < local_54)) {
      FUN_00407ff0();
      if (((DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594] & 1) !== 0)) {
        iVar1 = FUN_005bf5e1(0xa0, 0xa, 0xec, (in_ECX + 0xb8));
        if ((iVar1 === 0)) {
          local_b4 = 0;
          local_8 = (UNNAMED << 8);
          FUN_0044e762();
          local_8 = -1;
          FUN_0044e76b();
          FUN_0044e781();
          return;
        }
        FUN_005cedad(DAT_ffffff64, 9, 1, 0x137, 0x280, 0x2b);
        FUN_005cf467(7, 9);
        FUN_005cef31(DAT_ffffff3c, (in_ECX + 0x504), 0, 0x136);
      }
      FUN_00407ff0();
      if ((DAT_0064ca96[s32((in_ECX + 0x500), 0) * 0x594] !== 0)) {
        local_50 = (u8(DAT_0064ca96[s32((in_ECX + 0x500), 0) * 0x594]) - 1);
        iVar1 = FUN_005bf5e1((u8(DAT_0064ca96[s32((in_ECX + 0x500), 0) * 0x594]) + 0x77), 0xa, 0xec, (in_ECX + 0xb8));
        if ((iVar1 === 0)) {
          local_c8 = 0;
          local_8 = (UNNAMED << 8);
          FUN_0044e762();
          local_8 = -1;
          FUN_0044e76b();
          FUN_0044e781();
          return;
        }
        FUN_005cedad(DAT_ffffff64, 9, s32((DAT_0061c068 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c06c + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c070 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c074 + (local_50 * 0x10 + local_54 * 0x40)), 0));
        FUN_005cf467(7, 9);
        FUN_005cef31(DAT_ffffff28, (in_ECX + 0x504), (s32((DAT_0061c128 + local_50 * 0x10), 0) + -1), (s32((DAT_0061c12c + local_50 * 0x10), 0) + -1));
      }
      FUN_00407ff0();
      if ((s32((in_ECX + 0x1928), 0) !== 0)) {
        (local_54 < 3) (local_54 = 1; local_54 = (local_54 < 3); local_54 = (local_54 + 1)) {
          if ((((1 << (((local_54) & 0xFF) & 0x1f)) & u8(DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594])) !== 0)) {
            iVar1 = FUN_005bf5e1((local_54 + 0xa0), 0xa, 0xec, (in_ECX + 0xb8));
            if ((iVar1 === 0)) {
              local_dc = 0;
              local_8 = (UNNAMED << 8);
              FUN_0044e762();
              local_8 = -1;
              FUN_0044e76b();
              FUN_0044e781();
              return;
            }
            FUN_005cedad(DAT_ffffff64, 9, s32(DAT_0061c268, local_54 * 4), s32(DAT_0061c26c, local_54 * 4), s32(DAT_0061c270, local_54 * 4), s32(DAT_0061c274, local_54 * 4));
            FUN_005cf467(7, 9);
            FUN_005cef31(DAT_ffffff14, (in_ECX + 0x504), (s32(DAT_0061c268, local_54 * 4) + -1), (s32(DAT_0061c26c, local_54 * 4) + -1));
          }
        }
      }
      FUN_00407ff0();
      if ((DAT_0064ca97[s32((in_ECX + 0x500), 0) * 0x594] !== 0)) {
        local_50 = (u8(DAT_0064ca97[s32((in_ECX + 0x500), 0) * 0x594]) - 1);
        iVar1 = FUN_005bf5e1((u8(DAT_0064ca97[s32((in_ECX + 0x500), 0) * 0x594]) + 0x7c), 0xa, 0xec, (in_ECX + 0xb8));
        if ((iVar1 === 0)) {
          local_f0 = 0;
          local_8 = (UNNAMED << 8);
          FUN_0044e762();
          local_8 = -1;
          FUN_0044e76b();
          FUN_0044e781();
          return;
        }
        FUN_005cedad(DAT_ffffff64, 9, s32((DAT_0061c168 + local_50 * 0x10), 0), s32((DAT_0061c16c + local_50 * 0x10), 0), s32((DAT_0061c170 + local_50 * 0x10), 0), s32((DAT_0061c174 + local_50 * 0x10), 0));
        FUN_005cf467(7, 9);
        FUN_005cef31(DAT_ffffff00, (in_ECX + 0x504), (s32((DAT_0061c168 + local_50 * 0x10), 0) + -1), (s32((DAT_0061c16c + local_50 * 0x10), 0) + -1));
      }
      FUN_00407ff0();
      if (((DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594] & 8) !== 0)) {
        iVar1 = FUN_005bf5e1(0xa3, 0xa, 0xec, (in_ECX + 0xb8));
        if ((iVar1 === 0)) {
          local_104 = 0;
          local_8 = (UNNAMED << 8);
          FUN_0044e762();
          local_8 = -1;
          FUN_0044e76b();
          FUN_0044e781();
          return;
        }
        FUN_005cedad(DAT_ffffff64, 9, 0xd1, 0x8e, 0xc0, 0x9b);
        FUN_005cf467(7, 9);
        FUN_005cef31(DAT_fffffeec, (in_ECX + 0x504), 0xd0, 0x8d);
      }
      FUN_00407ff0();
      local_54 = 5;
      do {
        if ((6 < local_54)) {
          FUN_00407ff0();
          if ((s32((in_ECX + 0x1928), 0) !== 0)) {
            (local_54 < 7) (local_54 = 4; local_54 = (local_54 < 7); local_54 = (local_54 + 1)) {
              if ((((1 << (((local_54) & 0xFF) & 0x1f)) & u8(DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594])) !== 0)) {
                iVar1 = FUN_005bf5e1((local_54 + 0xa0), 0xa, 0xec, (in_ECX + 0xb8));
                if ((iVar1 === 0)) {
                  local_12c = 0;
                  local_8 = (UNNAMED << 8);
                  FUN_0044e762();
                  local_8 = -1;
                  FUN_0044e76b();
                  FUN_0044e781();
                  return;
                }
                FUN_005cedad(DAT_ffffff64, 9, s32(DAT_0061c268, local_54 * 4), s32(DAT_0061c26c, local_54 * 4), s32(DAT_0061c270, local_54 * 4), s32(DAT_0061c274, local_54 * 4));
                FUN_005cf467(7, 9);
                FUN_005cef31(DAT_fffffec4, (in_ECX + 0x504), (s32(DAT_0061c268, local_54 * 4) + -1), (s32(DAT_0061c26c, local_54 * 4) + -1));
              }
            }
          }
          FUN_00407ff0();
          if ((DAT_0064ca9a[s32((in_ECX + 0x500), 0) * 0x594] !== 0)) {
            local_50 = (u8(DAT_0064ca9a[s32((in_ECX + 0x500), 0) * 0x594]) - 1);
            iVar1 = FUN_005bf5e1((u8(DAT_0064ca9a[s32((in_ECX + 0x500), 0) * 0x594]) + 0x8b), 0xa, 0xec, (in_ECX + 0xb8));
            if ((iVar1 === 0)) {
              local_140 = 0;
              local_8 = (UNNAMED << 8);
              FUN_0044e762();
              local_8 = -1;
              FUN_0044e76b();
              FUN_0044e781();
              return;
            }
            FUN_005cedad(DAT_ffffff64, 9, s32((DAT_0061c228 + local_50 * 0x10), 0), s32((DAT_0061c22c + local_50 * 0x10), 0), s32((DAT_0061c230 + local_50 * 0x10), 0), s32((DAT_0061c234 + local_50 * 0x10), 0));
            FUN_005cf467(7, 9);
            FUN_005cef31(DAT_fffffeb0, (in_ECX + 0x504), (s32((DAT_0061c228 + local_50 * 0x10), 0) + -1), (s32((DAT_0061c22c + local_50 * 0x10), 0) + -1));
          }
          FUN_00407ff0();
          local_8 = (UNNAMED << 8);
          FUN_0044e762();
          local_8 = -1;
          FUN_0044e76b();
          FUN_0044e781();
          return;
        }
        if ((DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_54)] !== 0)) {
          local_50 = (u8(DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_54)]) - 1);
          iVar1 = FUN_005bf5e1(((local_54 * 5 + local_50) + 0x69), 0xa, 0xec, (in_ECX + 0xb8));
          if ((iVar1 === 0)) {
            local_118 = 0;
            local_8 = (UNNAMED << 8);
            FUN_0044e762();
            local_8 = -1;
            FUN_0044e76b();
            FUN_0044e781();
            return;
          }
          FUN_005cedad(DAT_ffffff64, 9, s32((DAT_0061c068 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c06c + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c070 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c074 + (local_50 * 0x10 + local_54 * 0x40)), 0));
          FUN_005cf467(7, 9);
          FUN_005cef31(DAT_fffffed8, (in_ECX + 0x504), (s32((DAT_0061c068 + (local_50 * 0x10 + local_54 * 0x40)), 0) + -1), (s32((DAT_0061c06c + (local_50 * 0x10 + local_54 * 0x40)), 0) + -1));
        }
        local_54 = (local_54 + 1);
      } ( true );
    }
    FUN_00407ff0();
    if ((DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_54)] !== 0)) {
      local_50 = (u8(DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_54)]) - 1);
      iVar1 = FUN_005bf5e1(((local_54 * 5 + local_50) + 0x69), 0xa, 0xec, (in_ECX + 0xb8));
      if ((iVar1 === 0)) {
        local_a0 = 0;
        local_8 = (UNNAMED << 8);
        FUN_0044e762();
        local_8 = -1;
        FUN_0044e76b();
        FUN_0044e781();
        return;
      }
      FUN_005cedad(DAT_ffffff64, 9, s32((DAT_0061c068 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c06c + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c070 + (local_50 * 0x10 + local_54 * 0x40)), 0), s32((DAT_0061c074 + (local_50 * 0x10 + local_54 * 0x40)), 0));
      FUN_005cf467(7, 9);
      FUN_005cef31(DAT_ffffff50, (in_ECX + 0x504), (s32((DAT_0061c068 + (local_50 * 0x10 + local_54 * 0x40)), 0) + -1), (s32((DAT_0061c06c + (local_50 * 0x10 + local_54 * 0x40)), 0) + -1));
    }
    local_54 = (local_54 + 1);
  } ( true );
}


 export function FUN_0044e762 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044e76b ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0044e781 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044e790 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_460;
  let local_450;
  let local_44c;
  let local_43c;
  let local_438;
  let local_434;
  let local_3ec;
  let local_364;
  let local_360;
  let local_2e0;
  let local_2dc;
  let local_2d8;
  let local_2d4;
  let local_2d0;
  let local_2cc;
  let local_2c8;
  let local_2c4;
  let local_2c0;
  let local_2bc;
  let local_2b8;
  let local_2b4;
  let local_2b0;
  let local_2ac;
  let local_2a8;
  let local_2a4;
  let local_2a0;
  let local_29c;
  let local_298;
  let local_294;
  let local_290;
  let local_28c;
  let local_288;
  let local_284;
  let local_280;
  let local_27c;
  let local_278;
  let local_274;
  let local_270;
  let local_234;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0044f4b0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  local_270 = DAT_fffffd90;
  local_8 = ((((local_8) >> 8) << 8) | 1);
  local_360 = 0xd4;
  local_360 = 1;
  local_360 = 0xb3;
  local_360 = 0x127;
  local_360 = 0x13;
  local_360 = 0x11b;
  local_360 = 0x24f;
  local_360 = 0xc6;
  local_360 = 0xc6;
  local_360 = 0x12f;
  local_360 = 0xd7;
  local_360 = 0xb1;
  local_360 = 0xb;
  local_360 = 1;
  local_360 = 0x25f;
  local_360 = 0x11e;
  local_360 = 0xbc;
  local_360 = 0x12;
  local_360 = 0xe6;
  local_360 = 0x11b;
  local_360 = 1;
  local_360 = 1;
  local_360 = 0x260;
  local_360 = 0x137;
  local_360 = 0x11c;
  local_360 = 0x102;
  local_360 = 0x27;
  local_360 = 0x39;
  local_360 = 1;
  local_360 = 1;
  local_360 = 0x280;
  local_360 = 0x1e0;
  local_2e0 = 0x14;
  local_2dc = 0x13a;
  local_2d8 = 0x24f;
  local_2d4 = 0x28;
  local_2d0 = 0x5f;
  local_2cc = 0x6d;
  local_2c8 = 0x1a3;
  local_2c4 = 0x5f;
  local_2c0 = 0x12;
  local_2bc = 0x103;
  local_2b8 = 0x252;
  local_2b4 = 0x2d;
  local_2b0 = 0xde;
  local_2ac = 0xd4;
  local_2a8 = 0xa2;
  local_2a4 = 0x54;
  local_2a0 = 0x7b;
  local_29c = 0x125;
  local_298 = 0x162;
  local_294 = 0x23;
  local_290 = 0x48;
  local_28c = 0x125;
  local_288 = 0x1c8;
  local_284 = 0x27;
  local_280 = 0x16;
  local_27c = 0x16e;
  local_278 = 0x249;
  local_274 = 0x47;
  local_234 = 1;
  local_234 = 2;
  local_234 = 0x16;
  local_234 = 0x19c;
  local_234 = 2;
  local_234 = 0x194;
  local_234 = 0x36;
  local_234 = 0x48;
  local_234 = 0x25c;
  local_234 = 1;
  local_234 = 0x23;
  local_234 = 0x197;
  local_234 = 0x23c;
  local_234 = 0x195;
  local_234 = 0x44;
  local_234 = 0x49;
  local_234 = 0x21d;
  local_234 = 0x16d;
  local_234 = 0x41;
  local_234 = 0x46;
  local_234 = 0x1c;
  local_234 = 0x16e;
  local_234 = 0x47;
  local_234 = 0x44;
  local_234 = 0x47;
  local_234 = 0x124;
  local_234 = 0x64;
  local_234 = 0x27;
  local_234 = 0x1ad;
  local_234 = 0x124;
  local_234 = 0x63;
  local_234 = 0x27;
  local_234 = 0x47;
  local_234 = 0x124;
  local_234 = 0x64;
  local_234 = 0x27;
  local_234 = 0x1ad;
  local_234 = 0x124;
  local_234 = 0x63;
  local_234 = 0x27;
  local_234 = 0x11c;
  local_234 = 0x102;
  local_234 = 0x27;
  local_234 = 0x39;
  local_234 = 0x25;
  local_234 = 0x12;
  local_234 = 0x2d;
  local_234 = 0x120;
  local_234 = 0x93;
  local_234 = 0x12;
  local_234 = 0x2c;
  local_234 = 0x124;
  local_234 = 0x19d;
  local_234 = 0x14;
  local_234 = 0x31;
  local_234 = 0x121;
  local_234 = 0x20b;
  local_234 = 0x14;
  local_234 = 0x2f;
  local_234 = 0x11e;
  local_234 = 0xe;
  local_234 = 3;
  local_234 = 0xcf;
  local_234 = 0xc;
  local_234 = 0x17f;
  local_234 = 1;
  local_234 = 0xd3;
  local_234 = 0xe;
  local_234 = 0xe3;
  local_234 = 0xd4;
  local_234 = 0xe;
  local_234 = 0x51;
  local_234 = 0x16f;
  local_234 = 0xd5;
  local_234 = 0xb;
  local_234 = 0x52;
  local_234 = 0xbe;
  local_234 = 0x11;
  local_234 = 0x15;
  local_234 = 0x11a;
  local_234 = 0x185;
  local_234 = 0x12;
  local_234 = 0x1a;
  local_234 = 0x119;
  local_234 = 0xde;
  local_234 = 0x24;
  local_234 = 0x96;
  local_234 = 0x55;
  local_234 = 0x11;
  local_234 = 0x114;
  local_234 = 0xc1;
  local_234 = 0x19;
  local_234 = 0x190;
  local_234 = 0x107;
  local_234 = 0xd0;
  local_234 = 0x26;
  local_234 = 0x5e;
  local_234 = 0x75;
  local_234 = 0x36;
  local_234 = 0x47;
  local_234 = 0x10b;
  local_234 = 0x6c;
  local_234 = 0x46;
  local_234 = 0x5e;
  local_234 = 0x1cc;
  local_234 = 0x75;
  local_234 = 0x33;
  local_234 = 0x49;
  local_234 = 0xb;
  local_234 = 2;
  local_234 = 0x93;
  local_234 = 0x11b;
  local_234 = 0x1c2;
  local_234 = 2;
  local_234 = 0xa7;
  local_234 = 0x11b;
  local_234 = 0x14;
  local_234 = 0x13c;
  local_234 = 0xb8;
  local_234 = 0x22;
  local_234 = 0x193;
  local_234 = 0x13d;
  local_234 = 0xcc;
  local_234 = 0x23;
  local_234 = 0xde;
  local_234 = 0x12f;
  local_234 = 0xa8;
  local_234 = 0xaf;
  local_234 = 0x13;
  local_234 = 0x123;
  local_234 = 0x250;
  local_234 = 0xbd;
  local_234 = 0xd4;
  local_234 = 1;
  local_234 = 0xb3;
  local_234 = 0x127;
  local_3ec = 7;
  local_3ec = 7;
  local_3ec = 7;
  local_3ec = 7;
  local_3ec = 0x10;
  local_3ec = 0x10;
  local_3ec = 0xf;
  local_3ec = 0xf;
  local_3ec = 0xe;
  local_3ec = 0xe;
  local_3ec = 6;
  local_3ec = 5;
  local_3ec = 5;
  local_3ec = 5;
  local_3ec = 5;
  local_3ec = 5;
  local_3ec = 5;
  local_3ec = 0xd;
  local_3ec = 0xd;
  local_3ec = 4;
  local_3ec = 4;
  local_3ec = 4;
  local_3ec = 0xc;
  local_3ec = 0xc;
  local_3ec = 0xb;
  local_3ec = 0xb;
  local_3ec = 0xb;
  local_3ec = 3;
  local_3ec = 3;
  local_3ec = 0xa;
  local_3ec = 0xa;
  local_3ec = 2;
  local_3ec = 1;
  local_3ec = 0;
  in_ECX = (in_ECX + 0x660);
  (local_364 < 0x22) (local_364 = 0; local_364 = (local_364 < 0x22); local_364 = (local_364 + 1)) {
    FUN_0046ace7(local_364, s32(DAT_fffffc14, local_364), s32(DAT_fffffdcc, local_364 * 4), s32(DAT_fffffdcc, (local_364 * 4 + 1)), s32(DAT_fffffdcc, (local_364 * 4 + 2)), s32(DAT_fffffdcc, (local_364 * 4 + 3)));
  }
  iVar1 = FUN_005bf5e1(0x64, 0xa, 0xec, (in_ECX + 0xb8));
  if ((iVar1 !== 0)) {
    if ((s32((in_ECX + 0x1928), 0) === 0)) {
      (local_364 < 8) (local_364 = 0; local_364 = (local_364 < 8); local_364 = (local_364 + 1)) {
        FUN_00407ff0();
        if ((DAT_0064ca93[(s32((in_ECX + 0x500), 0) * 0x594 + local_364)] < 4)) {
          iVar1 = FUN_005bf5e1((local_364 + 0xaa), 0xa, 0xec, (in_ECX + 0xb8));
          if ((iVar1 === 0)) {
            local_43c = 0;
            local_8 = (local_8 & -0x100);
            FUN_0044f498();
            local_8 = -1;
            FUN_0044f4a4();
            FUN_0044f4ba();
            return;
          }
          FUN_005cedad(DAT_fffffbcc, 9, s32(DAT_fffffca0, local_364 * 4), s32(DAT_fffffca0, (local_364 * 4 + 1)), s32(DAT_fffffca0, (local_364 * 4 + 2)), s32(DAT_fffffca0, (local_364 * 4 + 3)));
          FUN_005cf467(7, 9);
          FUN_005cef31(DAT_fffffbb4, (in_ECX + 0x504), (s32(DAT_fffffca0, local_364 * 4) + -1), (s32(DAT_fffffca0, (local_364 * 4 + 1)) + -1));
        }
      }
    }
    else {
      local_14 = DAT_0064ca9b[s32((in_ECX + 0x500), 0) * 0x594];
      (local_364 < 7) (local_364 = 0; local_364 = (local_364 < 7); local_364 = (local_364 + 1)) {
        FUN_00407ff0();
        if ((((1 << (((local_364) & 0xFF) & 0x1f)) & u8(local_14)) === 0)) {
          iVar1 = FUN_005bf5e1((local_364 + 0xb2), 0xa, 0xec, (in_ECX + 0xb8));
          if ((iVar1 === 0)) {
            local_450 = 0;
            local_8 = (local_8 & -0x100);
            FUN_0044f498();
            local_8 = -1;
            FUN_0044f4a4();
            FUN_0044f4ba();
            return;
          }
          FUN_005cedad(DAT_fffffbcc, 9, s32((DAT_fffffd90 + (local_364 * 0x10 + -112)), 0), s32((DAT_fffffd90 + (local_364 * 0x10 + -108)), 0), s32((DAT_fffffd90 + (local_364 * 0x10 + -104)), 0), s32((DAT_fffffd90 + (local_364 * 0x10 + -100)), 0));
          FUN_005cf467(7, 9);
          FUN_005cef31(DAT_fffffba0, (in_ECX + 0x504), (s32((DAT_fffffd90 + (local_364 * 0x10 + -112)), 0) + -1), (s32((DAT_fffffd90 + (local_364 * 0x10 + -108)), 0) + -1));
        }
      }
    }
    local_8 = (local_8 & -0x100);
    FUN_0044f498();
    local_8 = -1;
    FUN_0044f4a4();
    FUN_0044f4ba();
    return;
  }
  local_438 = 0;
  local_8 = (local_8 & -0x100);
  FUN_0044f498();
  local_8 = -1;
  FUN_0044f4a4();
  FUN_0044f4ba();
  return;
}


 export function FUN_0044f498 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_0044f4a4 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0044f4ba (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0044f4c9 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  local_8 = DAT_00626810;
  iVar1 = s32((DAT_00626810 + 0x500), 0);
  if ((s32((DAT_00626810 + 0x1924), 0) === 0)) {
    DAT_00626810 = (DAT_00626810 + 0x54c);
  }
  else {
    iVar2 = FUN_0046ad85(param_1, param_2, DAT_fffffff0, (DAT_00626810 + 0x192c));
    if ((iVar2 < 0)) {
      w32((local_8 + 0x192c), 0, 0);
      FUN_0046e020(0x5e, 1, 0, 0);
    }
    else {
      if ((s32((local_8 + 0x1928), 0) === 0)) {
        if ((9 < s32((local_8 + 0x192c), 0))) {
          FUN_0046e020(0x5e, 1, 0, 0);
          return;
        }
        if ((3 < DAT_0064ca93[(iVar1 * 0x594 + s32((local_8 + 0x192c), 0))])) {
          FUN_0046e020(0x5e, 1, 0, 0);
          return;
        }
      }
      else {
        if ((s32((local_8 + 0x192c), 0) < 0xa)) {
          FUN_0046e020(0x5e, 1, 0, 0);
          return;
        }
        w32((local_8 + 0x192c), 0, (s32((local_8 + 0x192c), 0) + -10));
        local_c = DAT_0064ca9b[iVar1 * 0x594];
        if ((s32((local_8 + 0x192c), 0) === 5)) {
          if (((local_c & 0x20) !== 0)) {
            FUN_0046e020(0x5e, 1, 0, 0);
            return;
          }
          if ((s32((local_8 + 0x192c), 0) === 4)) {
            if (((local_c & 0x10) !== 0)) {
              w32((local_8 + 0x192c), 0, 5);
            }
          }
          else if (((local_c & 0x20) !== 0)) {
            w32((local_8 + 0x192c), 0, 4);
          }
        }
        if ((((1 << (_MEM[(local_8 + 0x192c)] & 0x1f)) & u8(DAT_0064ca9b[iVar1 * 0x594])) !== 0)) {
          FUN_0046e020(0x5e, 1, 0, 0);
          return;
        }
      }
      local_8 = (local_8 + 0x54c);
    }
  }
  return;
}


 export function FUN_0044f717 (param_1)

 {
  if ((s32((DAT_00626810 + 0x1924), 0) === 0)) {
    if ((param_1 < 0xd3)) {
      DAT_00626810 = (DAT_00626810 + 0x54c);
    }
  }
  else {
    FUN_0046e020(0x5e, 1, 0, 0);
  }
  return;
}


 export function FUN_0044f799 ()

 {
  if ((s32((DAT_00626810 + 0x1924), 0) === 0)) {
    DAT_00626810 = (DAT_00626810 + 0x54c);
  }
  return;
}
