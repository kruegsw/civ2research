# Block 00440000 — Phase 7 Audit
**Functions in this block: 355**
**System: Trade routes, city deletion, wonder production changes, network/LAN startup, throne room, sprite loading (CString static initializers)**

This block spans a wide range:
- **Trade routes**: caravan/freight delivery, trade route management (add/remove/replace)
- **City deletion**: `delete_city` — removing a city and all associated state
- **Wonder production**: `FUN_00441b11` — changing city production (wonder start/switch/abandon)
- **Growth cap check**: `FUN_00441a79` — aqueduct/sewer auto-queue
- **City adjacency**: neighbor-city and trade-route adjacency helpers
- **Network/LAN startup**: `FUN_00444310` and related network setup functions
- **Throne room**: display and upgrade logic
- **Sprite loading**: terrain, cities, units, icons bitmap/GIF loading
- **Static initializers**: ~215 CString/CRT constructor/destructor/atexit triplets

---

## FW — Framework/CRT/MFC (252 functions)

Static initializer triplets (CString constructors, `_eh_vector_constructor_iterator_`, `_atexit`, `_eh_vector_destructor_iterator_`, `FUN_005cde4d` destructors, FS_OFFSET SEH helpers):

| Address | Name | Note |
|---------|------|------|
| 0x0044251D | FUN_0044251d | SEH cleanup (thunk_FUN_0059df8a) — N/A |
| 0x00442533 | FUN_00442533 | SEH FS_OFFSET restore — N/A |
| 0x00447320 | FUN_00447320 | Static init wrapper — N/A |
| 0x0044733A | FUN_0044733a | _eh_vector_constructor_iterator_ DAT_00647c40 — N/A |
| 0x00447362 | FUN_00447362 | _atexit — N/A |
| 0x0044737F | FUN_0044737f | _eh_vector_destructor_iterator_ — N/A |
| 0x004473A2 | FUN_004473a2 | Static init wrapper — N/A |
| 0x004473BC | FUN_004473bc | _eh_vector_constructor_iterator_ DAT_00640bd8 — N/A |
| 0x004473E4 | FUN_004473e4 | _atexit — N/A |
| 0x00447401 | FUN_00447401 | _eh_vector_destructor_iterator_ — N/A |
| 0x00447424 | FUN_00447424 | Static init wrapper — N/A |
| 0x0044743E | FUN_0044743e | _eh_vector_constructor_iterator_ DAT_0063f858 — N/A |
| 0x00447466 | FUN_00447466 | _atexit — N/A |
| 0x00447483 | FUN_00447483 | _eh_vector_destructor_iterator_ — N/A |
| 0x004474A6 | FUN_004474a6 | Static init wrapper — N/A |
| 0x004474C0 | FUN_004474c0 | _eh_vector_constructor_iterator_ DAT_006461d8 — N/A |
| 0x004474E8 | FUN_004474e8 | _atexit — N/A |
| 0x00447505 | FUN_00447505 | _eh_vector_destructor_iterator_ — N/A |
| 0x00447528 | FUN_00447528 | Static init wrapper — N/A |
| 0x00447542 | FUN_00447542 | _eh_vector_constructor_iterator_ DAT_00647388 — N/A |
| 0x0044756A | FUN_0044756a | _atexit — N/A |
| 0x00447587 | FUN_00447587 | _eh_vector_destructor_iterator_ — N/A |
| 0x004475AA | FUN_004475aa | Static init wrapper — N/A |
| 0x004475C4 | FUN_004475c4 | _eh_vector_constructor_iterator_ DAT_006447b0 — N/A |
| 0x004475EC | FUN_004475ec | _atexit — N/A |
| 0x00447609 | FUN_00447609 | _eh_vector_destructor_iterator_ — N/A |
| 0x0044762C | FID_conflict:_$E31 | Static init CString DAT_00646158 — N/A |
| 0x00447646 | FUN_00447646 | CString::CString DAT_00646158 — N/A |
| 0x00447660 | FUN_00447660 | _atexit — N/A |
| 0x0044767D | FUN_0044767d | CString destructor — N/A |
| 0x00447697 | FUN_00447697 | Static init wrapper — N/A |
| 0x004476B1 | FUN_004476b1 | _eh_vector_constructor_iterator_ DAT_00644e88 — N/A |
| 0x004476D9 | FUN_004476d9 | _atexit — N/A |
| 0x004476F6 | FUN_004476f6 | _eh_vector_destructor_iterator_ — N/A |
| 0x00447719 | FID_conflict:_$E31 | Static init CString DAT_0063fcd8 — N/A |
| 0x00447733 | FUN_00447733 | CString::CString DAT_0063fcd8 — N/A |
| 0x0044774D | FUN_0044774d | _atexit — N/A |
| 0x0044776A | FUN_0044776a | CString destructor — N/A |
| 0x00447784 | FID_conflict:_$E31 | Static init CString DAT_00647ed8 — N/A |
| 0x0044779E | FUN_0044779e | CString::CString DAT_00647ed8 — N/A |
| 0x004477B8 | FUN_004477b8 | _atexit — N/A |
| 0x004477D5 | FUN_004477d5 | CString destructor — N/A |
| 0x004477EF | FID_conflict:_$E31 | Static init CString DAT_00646118 — N/A |
| 0x00447809 | FUN_00447809 | CString::CString DAT_00646118 — N/A |
| 0x00447823 | FUN_00447823 | _atexit — N/A |
| 0x00447840 | FUN_00447840 | CString destructor — N/A |
| 0x0044785A | FUN_0044785a | Static init wrapper — N/A |
| 0x00447874 | FUN_00447874 | _eh_vector_constructor_iterator_ DAT_00643b38 — N/A |
| 0x0044789C | FUN_0044789c | _atexit — N/A |
| 0x004478B9 | FUN_004478b9 | _eh_vector_destructor_iterator_ — N/A |
| 0x004478DC | FUN_004478dc | Static init wrapper — N/A |
| 0x004478F6 | FUN_004478f6 | _eh_vector_constructor_iterator_ DAT_0063fd18 — N/A |
| 0x0044791E | FUN_0044791e | _atexit — N/A |
| 0x0044793B | FUN_0044793b | _eh_vector_destructor_iterator_ — N/A |
| 0x0044795E | FUN_0044795e | Static init wrapper — N/A |
| 0x00447978 | FUN_00447978 | _eh_vector_constructor_iterator_ DAT_00642710 — N/A |
| 0x004479A0 | FUN_004479a0 | _atexit — N/A |
| 0x004479BD | FUN_004479bd | _eh_vector_destructor_iterator_ — N/A |
| 0x004479E0 | FUN_004479e0 | Static init wrapper — N/A |
| 0x004479FA | FUN_004479fa | _eh_vector_constructor_iterator_ DAT_006446b8 — N/A |
| 0x00447A22 | FUN_00447a22 | _atexit — N/A |
| 0x00447A3F | FUN_00447a3f | _eh_vector_destructor_iterator_ — N/A |
| 0x00447A62 | FID_conflict:_$E31 | Static init CString DAT_00641808 — N/A |
| 0x00447A7C | FUN_00447a7c | CString::CString DAT_00641808 — N/A |
| 0x00447A96 | FUN_00447a96 | _atexit — N/A |
| 0x00447AB3 | FUN_00447ab3 | CString destructor — N/A |
| 0x00447ACD | FID_conflict:_$E31 | Static init CString DAT_0063fc18 — N/A |
| 0x00447AE7 | FUN_00447ae7 | CString::CString DAT_0063fc18 — N/A |
| 0x00447B01 | FUN_00447b01 | _atexit — N/A |
| 0x00447B1E | FUN_00447b1e | CString destructor — N/A |
| 0x00447B38 | FUN_00447b38 | Static init wrapper — N/A |
| 0x00447B52 | FUN_00447b52 | _eh_vector_constructor_iterator_ DAT_006482f8 — N/A |
| 0x00447B7A | FUN_00447b7a | _atexit — N/A |
| 0x00447B97 | FUN_00447b97 | _eh_vector_destructor_iterator_ — N/A |
| 0x00447BBA | FUN_00447bba | Static init wrapper — N/A |
| 0x00447BD4 | FUN_00447bd4 | _eh_vector_constructor_iterator_ DAT_00647fa0 — N/A |
| 0x00447BFC | FUN_00447bfc | _atexit — N/A |
| 0x00447C19 | FUN_00447c19 | _eh_vector_destructor_iterator_ — N/A |
| 0x00447C3C | FID_conflict:_$E31 | Static init CString DAT_00645120 — N/A |
| 0x00447C56 | FUN_00447c56 | CString::CString DAT_00645120 — N/A |
| 0x00447C70 | FUN_00447c70 | _atexit — N/A |
| 0x00447C8D | FUN_00447c8d | CString destructor — N/A |
| 0x00447CA7 | FID_conflict:_$E31 | Static init CString DAT_00648820 — N/A |
| 0x00447CC1 | FUN_00447cc1 | CString::CString DAT_00648820 — N/A |
| 0x00447CDB | FUN_00447cdb | _atexit — N/A |
| 0x00447CF8 | FUN_00447cf8 | CString destructor — N/A |
| 0x00447D12 | FID_conflict:_$E31 | Static init CString DAT_00647788 — N/A |
| 0x00447D2C | FUN_00447d2c | CString::CString DAT_00647788 — N/A |
| 0x00447D46 | FUN_00447d46 | _atexit — N/A |
| 0x00447D63 | FUN_00447d63 | CString destructor — N/A |
| 0x00447D7D | FID_conflict:_$E31 | Static init CString DAT_00647348 — N/A |
| 0x00447D97 | FUN_00447d97 | CString::CString DAT_00647348 — N/A |
| 0x00447DB1 | FUN_00447db1 | _atexit — N/A |
| 0x00447DCE | FUN_00447dce | CString destructor — N/A |
| 0x00447DE8 | FID_conflict:_$E31 | Static init CString DAT_00644770 — N/A |
| 0x00447E02 | FUN_00447e02 | CString::CString DAT_00644770 — N/A |
| 0x00447E1C | FUN_00447e1c | _atexit — N/A |
| 0x00447E39 | FUN_00447e39 | CString destructor — N/A |
| 0x00447E53 | FID_conflict:_$E31 | Static init CString DAT_006480d8 — N/A |
| 0x00447E6D | FUN_00447e6d | CString::CString DAT_006480d8 — N/A |
| 0x00447E87 | FUN_00447e87 | _atexit — N/A |
| 0x00447EA4 | FUN_00447ea4 | CString destructor — N/A |
| 0x00447EBE | FUN_00447ebe | Static init wrapper — N/A |
| 0x00447ED8 | FUN_00447ed8 | _eh_vector_constructor_iterator_ DAT_00644b70 — N/A |
| 0x00447F00 | FUN_00447f00 | _atexit — N/A |
| 0x00447F1D | FUN_00447f1d | _eh_vector_destructor_iterator_ — N/A |
| 0x00447F40 | FUN_00447f40 | Static init wrapper — N/A |
| 0x00447F5A | FUN_00447f5a | _eh_vector_constructor_iterator_ DAT_006477c8 — N/A |
| 0x00447F82 | FUN_00447f82 | _atexit — N/A |
| 0x00447F9F | FUN_00447f9f | _eh_vector_destructor_iterator_ — N/A |
| 0x00447FC2 | FID_conflict:_$E31 | Static init CString DAT_00644e08 — N/A |
| 0x00447FDC | FUN_00447fdc | CString::CString DAT_00644e08 — N/A |
| 0x00447FF6 | FUN_00447ff6 | _atexit — N/A |
| 0x00448013 | FUN_00448013 | CString destructor — N/A |
| 0x0044802D | FID_conflict:_$E31 | Static init CString DAT_006442b8 — N/A |
| 0x00448047 | FUN_00448047 | CString::CString DAT_006442b8 — N/A |
| 0x00448061 | FUN_00448061 | _atexit — N/A |
| 0x0044807E | FUN_0044807e | CString destructor — N/A |
| 0x00448098 | FID_conflict:_$E31 | Static init CString DAT_00640b98 — N/A |
| 0x004480B2 | FUN_004480b2 | CString::CString DAT_00640b98 — N/A |
| 0x004480CC | FUN_004480cc | _atexit — N/A |
| 0x004480E9 | FUN_004480e9 | CString destructor — N/A |
| 0x00448103 | FID_conflict:_$E31 | Static init CString DAT_00647f60 — N/A |
| 0x0044811D | FUN_0044811d | CString::CString DAT_00647f60 — N/A |
| 0x00448137 | FUN_00448137 | _atexit — N/A |
| 0x00448154 | FUN_00448154 | CString destructor — N/A |
| 0x0044816E | FUN_0044816e | Static init wrapper — N/A |
| 0x00448188 | FUN_00448188 | _eh_vector_constructor_iterator_ DAT_0063fe50 — N/A |
| 0x004481B0 | FUN_004481b0 | _atexit — N/A |
| 0x004481CD | FUN_004481cd | _eh_vector_destructor_iterator_ — N/A |
| 0x004481F0 | FUN_004481f0 | Static init wrapper — N/A |
| 0x0044820A | FUN_0044820a | _eh_vector_constructor_iterator_ DAT_006442f8 — N/A |
| 0x00448232 | FUN_00448232 | _atexit — N/A |
| 0x0044824F | FUN_0044824f | _eh_vector_destructor_iterator_ — N/A |
| 0x00448272 | FUN_00448272 | Static init wrapper — N/A |
| 0x0044828C | FUN_0044828c | _eh_vector_constructor_iterator_ DAT_00641848 — N/A |
| 0x004482B4 | FUN_004482b4 | _atexit — N/A |
| 0x004482D1 | FUN_004482d1 | _eh_vector_destructor_iterator_ — N/A |
| 0x004482F4 | FUN_004482f4 | Static init wrapper — N/A |
| 0x0044830E | FUN_0044830e | _eh_vector_constructor_iterator_ DAT_006465d8 — N/A |
| 0x00448336 | FUN_00448336 | _atexit — N/A |
| 0x00448353 | FUN_00448353 | _eh_vector_destructor_iterator_ — N/A |
| 0x00448376 | FUN_00448376 | Static init wrapper — N/A |
| 0x00448390 | FUN_00448390 | _eh_vector_constructor_iterator_ DAT_00642d48 — N/A |
| 0x004483B8 | FUN_004483b8 | _atexit — N/A |
| 0x004483D5 | FUN_004483d5 | _eh_vector_destructor_iterator_ — N/A |
| 0x004483F8 | FUN_004483f8 | Static init wrapper — N/A |
| 0x00448412 | FUN_00448412 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044843A | FUN_0044843a | _atexit — N/A |
| 0x00448457 | FUN_00448457 | _eh_vector_destructor_iterator_ — N/A |
| 0x0044847A | FUN_0044847a | Static init wrapper — N/A |
| 0x00448494 | FUN_00448494 | _eh_vector_constructor_iterator_ — N/A |
| 0x004484BC | FUN_004484bc | _atexit — N/A |
| 0x004484D9 | FUN_004484d9 | _eh_vector_destructor_iterator_ — N/A |
| 0x004484FC | FUN_004484fc | Static init wrapper — N/A |
| 0x00448516 | FUN_00448516 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044853E | FUN_0044853e | _atexit — N/A |
| 0x0044855B | FUN_0044855b | _eh_vector_destructor_iterator_ — N/A |
| 0x0044857E | FUN_0044857e | Static init wrapper — N/A |
| 0x00448598 | FUN_00448598 | _eh_vector_constructor_iterator_ — N/A |
| 0x004485C0 | FUN_004485c0 | _atexit — N/A |
| 0x004485DD | FUN_004485dd | _eh_vector_destructor_iterator_ — N/A |
| 0x00448600 | FUN_00448600 | Static init wrapper — N/A |
| 0x0044861A | FUN_0044861a | _eh_vector_constructor_iterator_ — N/A |
| 0x00448642 | FUN_00448642 | _atexit — N/A |
| 0x0044865F | FUN_0044865f | _eh_vector_destructor_iterator_ — N/A |
| 0x00448682 | FID_conflict:_$E31 | Static init CString — N/A |
| 0x0044869C | FUN_0044869c | CString::CString — N/A |
| 0x004486B6 | FUN_004486b6 | _atexit — N/A |
| 0x004486D3 | FUN_004486d3 | CString destructor — N/A |
| 0x004486ED | FID_conflict:_$E31 | Static init CString — N/A |
| 0x00448707 | FUN_00448707 | CString::CString — N/A |
| 0x00448721 | FUN_00448721 | _atexit — N/A |
| 0x0044873E | FUN_0044873e | CString destructor — N/A |
| 0x00448758 | FUN_00448758 | Static init wrapper — N/A |
| 0x00448772 | FUN_00448772 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044879A | FUN_0044879a | _atexit — N/A |
| 0x004487B7 | FUN_004487b7 | _eh_vector_destructor_iterator_ — N/A |
| 0x004487DA | FUN_004487da | Static init wrapper — N/A |
| 0x004487F4 | FUN_004487f4 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044881C | FUN_0044881c | _atexit — N/A |
| 0x00448839 | FUN_00448839 | _eh_vector_destructor_iterator_ — N/A |
| 0x0044885C | FUN_0044885c | Static init wrapper — N/A |
| 0x00448876 | FUN_00448876 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044889E | FUN_0044889e | _atexit — N/A |
| 0x004488BB | FUN_004488bb | _eh_vector_destructor_iterator_ — N/A |
| 0x004488DE | FID_conflict:_$E31 | Static init CString — N/A |
| 0x004488F8 | FUN_004488f8 | CString::CString — N/A |
| 0x00448912 | FUN_00448912 | _atexit — N/A |
| 0x0044892F | FUN_0044892f | CString destructor — N/A |
| 0x00448949 | FUN_00448949 | Static init wrapper — N/A |
| 0x00448963 | FUN_00448963 | _eh_vector_constructor_iterator_ — N/A |
| 0x0044898B | FUN_0044898b | _atexit — N/A |
| 0x004489A8 | FUN_004489a8 | _eh_vector_destructor_iterator_ — N/A |
| 0x004489CB | FUN_004489cb | Static init wrapper — N/A |
| 0x004489E5 | FUN_004489e5 | _eh_vector_constructor_iterator_ — N/A |
| 0x00448A0D | FUN_00448a0d | _atexit — N/A |
| 0x00448A2A | FUN_00448a2a | _eh_vector_destructor_iterator_ — N/A |
| 0x00448A4D | FUN_00448a4d | Static init wrapper — N/A |
| 0x00448A67 | FUN_00448a67 | _eh_vector_constructor_iterator_ — N/A |
| 0x00448A8F | FUN_00448a8f | _atexit — N/A |
| 0x00448AAC | FUN_00448aac | _eh_vector_destructor_iterator_ — N/A |
| 0x00448ACF | FID_conflict:_$E31 | Static init CString — N/A |
| 0x00448AE9 | FUN_00448ae9 | CString::CString — N/A |
| 0x00448B03 | FUN_00448b03 | _atexit — N/A |
| 0x00448B20 | FUN_00448b20 | CString destructor — N/A |
| 0x00448B3A | FUN_00448b3a | Static init wrapper — N/A |
| 0x00448B54 | FUN_00448b54 | _eh_vector_constructor_iterator_ — N/A |
| 0x00448B7C | FUN_00448b7c | _atexit — N/A |
| 0x00448B99 | FUN_00448b99 | _eh_vector_destructor_iterator_ — N/A |
| 0x00448BBC | FUN_00448bbc | Static init wrapper — N/A |
| 0x00448BD6 | FUN_00448bd6 | _eh_vector_constructor_iterator_ — N/A |
| 0x00448BFE | FUN_00448bfe | _atexit — N/A |
| 0x00448C1B | FUN_00448c1b | _eh_vector_destructor_iterator_ — N/A |
| 0x00448C3E | FUN_00448c3e | Static init wrapper — N/A |
| 0x00448C58 | FUN_00448c58 | _eh_vector_constructor_iterator_ — N/A |
| 0x00448C80 | FUN_00448c80 | _atexit — N/A |
| 0x00448C9D | FUN_00448c9d | _eh_vector_destructor_iterator_ — N/A |
| 0x00448CC0 | FUN_00448cc0 | Static init wrapper — N/A |
| 0x00448CDA | FUN_00448cda | _eh_vector_constructor_iterator_ (66 bytes, dual) — N/A |
| 0x00448D1C | FUN_00448d1c | _atexit — N/A |
| 0x00448D39 | FUN_00448d39 | _eh_vector_destructor_iterator_ (66 bytes, dual) — N/A |
| 0x00448D7B | FID_conflict:_$E31 | Static init CString — N/A |
| 0x00448D95 | FUN_00448d95 | CString::CString — N/A |
| 0x00448DAF | FUN_00448daf | _atexit — N/A |
| 0x00448DCC | FUN_00448dcc | CString destructor — N/A |
| 0x00448DE6 | FID_conflict:_$E31 | Static init CString — N/A |
| 0x00448E00 | FUN_00448e00 | CString::CString — N/A |
| 0x00448E1A | FUN_00448e1a | _atexit — N/A |
| 0x00448E37 | FUN_00448e37 | CString destructor — N/A |
| 0x00448E51 | FID_conflict:_$E31 | Static init CString — N/A |
| 0x00448E6B | FUN_00448e6b | CString::CString — N/A |
| 0x00448E85 | FUN_00448e85 | _atexit — N/A |
| 0x00448EA2 | FUN_00448ea2 | CString/FUN_005bd915 destructor — N/A |
| 0x00448EBC | FID_conflict:_$E31 | Static init FUN_005bd630 — N/A |
| 0x00448ED6 | FUN_00448ed6 | FUN_005bd630 constructor — N/A |
| 0x00448EF0 | FUN_00448ef0 | _atexit — N/A |
| 0x00448F0D | FUN_00448f0d | FUN_005bd915 destructor — N/A |
| 0x00448F27 | FID_conflict:_$E31 | Static init FUN_005bd630 — N/A |
| 0x00448F41 | FUN_00448f41 | FUN_005bd630 constructor — N/A |
| 0x00448F5B | FUN_00448f5b | _atexit — N/A |
| 0x00448F78 | FUN_00448f78 | FUN_005bd915 destructor — N/A |
| 0x0044C8B0 | CString | CString::CString library function — N/A |
| 0x0044C8E0 | FUN_0044c8e0 | Zero-init 26 dwords (data init helper) — N/A |
| 0x0044CA40 | FUN_0044ca40 | Empty function (nop) — N/A |
| 0x0044CA60 | FUN_0044ca60 | SEH wrapper (destructor pattern) — N/A |
| 0x0044CAAB | FUN_0044caab | Pointer adjustment helper — N/A |
| 0x0044CAD3 | FUN_0044cad3 | Destructor thunk (FUN_005db650) — N/A |
| 0x0044CAE6 | FUN_0044cae6 | SEH FS_OFFSET restore — N/A |
| 0x0044CB20 | FUN_0044cb20 | SEH wrapper (destructor pattern) — N/A |
| 0x0044CB5E | FUN_0044cb5e | Destructor thunk — N/A |
| 0x0044CB71 | FUN_0044cb71 | SEH FS_OFFSET restore — N/A |

---

## UI — User Interface (91 functions)

### Network/LAN Startup UI
| Address | Name | Verdict | Note |
|---------|------|---------|------|
| 0x00444270 | FUN_00444270 | N/A | Debug log helper — N/A |
| 0x004442A0 | FUN_004442a0 | N/A | Dialog message thunk — N/A |
| 0x004442E0 | FUN_004442e0 | N/A | Dialog message thunk — N/A |
| 0x00444310 | FUN_00444310 | N/A | Network/LAN startup wizard (3846 bytes) — full UI dialog flow — N/A |
| 0x0044525D | FUN_0044525d | N/A | SEH cleanup wrapper — N/A |
| 0x00445269 | FUN_00445269 | N/A | SEH cleanup wrapper — N/A |
| 0x0044527F | FUN_0044527f | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044528E | FUN_0044528e | N/A | IP address dialog — N/A |
| 0x00445407 | FUN_00445407 | N/A | SEH cleanup — N/A |
| 0x0044541D | FUN_0044541d | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044542C | FUN_0044542c | N/A | Net player name dialog — N/A |
| 0x0044556D | FUN_0044556d | N/A | SEH cleanup — N/A |
| 0x00445583 | FUN_00445583 | N/A | SEH FS_OFFSET restore — N/A |
| 0x00445592 | FUN_00445592 | N/A | Game name dialog — N/A |
| 0x004456ED | FUN_004456ed | N/A | SEH cleanup — N/A |
| 0x00445703 | FUN_00445703 | N/A | SEH FS_OFFSET restore — N/A |
| 0x00445712 | FUN_00445712 | N/A | Load-game-for-network dialog (1795 bytes) — N/A |
| 0x00445E15 | FUN_00445e15 | N/A | SEH cleanup wrapper — N/A |
| 0x00445E21 | FUN_00445e21 | N/A | SEH cleanup wrapper — N/A |
| 0x00445E37 | FUN_00445e37 | N/A | SEH FS_OFFSET restore — N/A |
| 0x00445E46 | FUN_00445e46 | N/A | Player-seat-selection dialog (2469 bytes) — N/A |
| 0x004467FA | FUN_004467fa | N/A | SEH cleanup wrapper — N/A |
| 0x00446810 | FUN_00446810 | N/A | SEH FS_OFFSET restore — N/A |
| 0x00447170 | FUN_00447170 | N/A | Object destructor + delete — N/A |
| 0x004471C0 | FUN_004471c0 | N/A | Object destructor + delete — N/A |
| 0x00447210 | FUN_00447210 | N/A | UI list item disable — N/A |
| 0x004472C0 | GetCheckStyle | N/A | CCheckListBox::GetCheckStyle MFC library — N/A |
| 0x004472F0 | FUN_004472f0 | N/A | UI list set selected — N/A |

### Throne Room UI
| Address | Name | Verdict | Note |
|---------|------|---------|------|
| 0x0044CC80 | FUN_0044cc80 | N/A | Throne room entry point (checks if improvements needed) — N/A |
| 0x0044CD77 | FUN_0044cd77 | N/A | Throne room destructor thunk — N/A |
| 0x0044CD8D | FUN_0044cd8d | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044CD9B | FUN_0044cd9b | N/A | Throne room view-only entry point — N/A |
| 0x0044CDF2 | FUN_0044cdf2 | N/A | Throne room destructor thunk — N/A |
| 0x0044CE08 | FUN_0044ce08 | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044CE16 | FUN_0044ce16 | N/A | Throne room window constructor (405 bytes) — N/A |
| 0x0044D027 | FUN_0044d027 | N/A | Throne room window destructor (177 bytes) — N/A |
| 0x0044D0D8 | FUN_0044d0d8 | N/A | Destructor sub-call — N/A |
| 0x0044D0E7 | FUN_0044d0e7 | N/A | Destructor sub-call — N/A |
| 0x0044D0F6 | FUN_0044d0f6 | N/A | Destructor sub-call — N/A |
| 0x0044D105 | FUN_0044d105 | N/A | Destructor sub-call — N/A |
| 0x0044D114 | FUN_0044d114 | N/A | Destructor sub-call — N/A |
| 0x0044D123 | FUN_0044d123 | N/A | _Timevec destructor — N/A |
| 0x0044D132 | FUN_0044d132 | N/A | SEH cleanup — N/A |
| 0x0044D141 | FUN_0044d141 | N/A | Destructor thunk — N/A |
| 0x0044D154 | FUN_0044d154 | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044D162 | FUN_0044d162 | N/A | Throne room display init (308 bytes) — N/A |
| 0x0044D296 | FUN_0044d296 | N/A | Throne room upgrade flow (1799 bytes) — N/A |
| 0x0044D99D | FUN_0044d99d | N/A | Cleanup thunk — N/A |
| 0x0044D9B3 | FUN_0044d9b3 | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044D9C1 | FUN_0044d9c1 | N/A | Throne room view display (244 bytes) — N/A |
| 0x0044DAB5 | FUN_0044dab5 | N/A | Throne room title text render (221 bytes) — N/A |
| 0x0044DB92 | FUN_0044db92 | N/A | Throne room sprite composition (3024 bytes) — N/A |
| 0x0044E762 | FUN_0044e762 | N/A | CString destructor — N/A |
| 0x0044E76B | FUN_0044e76b | N/A | FUN_005bd915 destructor — N/A |
| 0x0044E781 | FUN_0044e781 | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044E790 | FUN_0044e790 | N/A | Throne room improvement selection (3336 bytes, pixel coords) — N/A |
| 0x0044F498 | FUN_0044f498 | N/A | CString destructor — N/A |
| 0x0044F4A4 | FUN_0044f4a4 | N/A | FUN_005bd915 destructor — N/A |
| 0x0044F4BA | FUN_0044f4ba | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044F4C9 | FUN_0044f4c9 | N/A | Throne room click handler (585 bytes) — N/A |
| 0x0044F717 | FUN_0044f717 | N/A | Throne room keyboard handler — N/A |
| 0x0044F799 | FUN_0044f799 | N/A | Throne room invalidate — N/A |

### Sprite/Bitmap Loading UI
| Address | Name | Verdict | Note |
|---------|------|---------|------|
| 0x0044B49E | FUN_0044b49e | N/A | Master sprite loader (calls terrain, cities, icons, units loaders) — N/A |
| 0x0044B4F6 | FUN_0044b4f6 | N/A | Destructor thunk — N/A |
| 0x0044B50C | FUN_0044b50c | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044C5A0 | FUN_0044c5a0 | N/A | Sprite object constructor — N/A |
| 0x0044C670 | FUN_0044c670 | N/A | Sprite sub-object constructor — N/A |
| 0x0044C730 | FUN_0044c730 | N/A | Sprite sub-sub-object constructor — N/A |
| 0x0044CBA0 | FUN_0044cba0 | N/A | Sprite object destructor — N/A |
| 0x0044CC01 | FUN_0044cc01 | N/A | Destructor pointer adjust — N/A |
| 0x0044CC29 | FUN_0044cc29 | N/A | Destructor sub-call — N/A |
| 0x0044CC3C | FUN_0044cc3c | N/A | SEH FS_OFFSET restore — N/A |
| 0x00448F92 | FUN_00448f92 | N/A | Tech era check for sprite style (Pottery+Masonry→3, Gunpowder→2, Railroad+Industrialization→1, else 0) — N/A |
| 0x00449030 | FUN_00449030 | N/A | Terrain1/Terrain2 bitmap loader (2367 bytes) — N/A |
| 0x0044996F | FUN_0044996f | N/A | CString destructor — N/A |
| 0x0044997B | FUN_0044997b | N/A | CString destructor — N/A |
| 0x0044998E | FUN_0044998e | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044999C | FUN_0044999c | N/A | Sprite extract helper (64x32 fixed size) — N/A |
| 0x004499D3 | FUN_004499d3 | N/A | Sprite extract helper (variable size) — N/A |
| 0x00449A0E | FUN_00449a0e | N/A | Icons/wonders/buildings bitmap loader (4416 bytes) — N/A |
| 0x0044AB4E | FUN_0044ab4e | N/A | SEH cleanup — N/A |
| 0x0044AB64 | FUN_0044ab64 | N/A | SEH FS_OFFSET restore — N/A |
| 0x0044AB72 | FUN_0044ab72 | N/A | Sprite extract 32x32 — N/A |
| 0x0044ABA9 | FUN_0044aba9 | N/A | Sprite extract square — N/A |
| 0x0044ABD5 | FUN_0044abd5 | N/A | Sprite extract by index — N/A |
| 0x0044AC07 | FUN_0044ac07 | N/A | Sprite extract 64x48 — N/A |
| 0x0044AC3E | FUN_0044ac3e | N/A | City sprite chroma-key offset calc — N/A |
| 0x0044AD47 | FUN_0044ad47 | N/A | City sprite chroma-key offset calc (second pass) — N/A |
| 0x0044AE4C | FUN_0044ae4c | N/A | CITIES.BMP/GIF loader (1005 bytes) — N/A |
| 0x0044B239 | FUN_0044b239 | N/A | Unit sprite chroma-key offset calc — N/A |
| 0x0044B30E | FUN_0044b30e | N/A | UNITS.BMP/GIF loader (400 bytes) — N/A |

---

## GL — Game Logic: Trade Routes & City Management (12 functions)

### FUN_00440325 — Remove trade route from city slot
- **Address**: 0x00440325 (199 bytes)
- **Binary**: Shifts trade route entries down in the 3-slot array when removing route at index `param_2`. Decrements route count. Sets city flags `|= 0x20000`.
- **JS**: `reducer.js` handles trade route removal during `delete_city` (lines 215-218, cityturn.js) and `cancelTradeRoutes` (diplomacy.js:933). Uses array filter rather than index-based shifting.
- **Verdict**: YES (match) — semantically equivalent; JS uses array filter vs binary's index shift, but same result.

### FUN_004403ec — Set trade route entry
- **Address**: 0x004403EC (103 bytes)
- **Binary**: Writes destination city index and commodity type to trade route slot. Sets city flags `|= 0x20000`.
- **JS**: Route creation in `reducer.js` ESTABLISH_TRADE (line 569: `{ destCityIndex: etCi, commodity }`).
- **Verdict**: YES (match) — JS creates route object with same fields.

### FUN_00440453 — Add/replace trade route (3-slot management)
- **Address**: 0x00440453 (765 bytes)
- **Binary**: Checks for duplicate route. If < 3 routes, appends. If 3 routes already, compares new route value (based on city pop * distance factor, same-continent halving, same-owner halving) against lowest existing route. Replaces if new route is better.
- **JS**: `reducer.js` lines 573-608 implement the 3-slot limit with replacement. The JS computes route value as `distance + (foreignTrade ? 10 : 0)` which is simpler than the binary's `pop * (distance * pop >> 1)` with continent/owner modifiers.
- **Verdict**: PARTIAL — The 3-route limit and replacement logic is implemented, but the JS route valuation formula is simplified compared to the binary's pop-weighted distance formula. The binary uses `city.tradeRevenue` (city pop-based) with distance scaling plus continental/same-owner modifiers, while JS uses raw Manhattan distance + a flat foreign bonus.
- **Discrepancy**: Route replacement value comparison uses different formula.

### FUN_00440750 — Caravan/Freight delivery (one-time gold + route establishment)
- **Address**: 0x00440750 (3144 bytes)
- **Binary formula**:
  1. Distance calculation between home city and dest city (Manhattan via FUN_005ae31d)
  2. Restless Tribes difficulty modifier: distance * 4/5; Deity: distance * 5/4
  3. Base revenue = `(homeTrade + destTrade) * (distance + 10) / 0x18` (24)
  4. Different-continent bonus: `revenue *= 2`
  5. Same-owner penalty: `revenue /= 2`
  6. Supply/demand commodity-based demand slot bonus (checked on homeCity)
  7. Road connection check (FUN_0043d20a with flag 0x20 → Railroad): adds to distance factor
  8. Airport check (FUN_0043d20a with flag 0x19)
  9. Distance bonus applied: `revenue += (distFactor * revenue >> 1)`
  10. Commodity tier switch: 3,5,8,10→half; 9,11,12,13→full; 14→1.5x; 15→2x
  11. Demand match: if commodity matches one of dest's 3 demand slots, applies `revenue = revenue*2 + commodityBonus` (homeCity match) or `(revenue + commodityBonus) * 2` (other)
  12. Pre-200AD without Alphabet(0x26) or Writing(0x39): `revenue *= 2`
  13. Communism(0x43) tech: `revenue -= revenue/3`
  14. Democracy(0x1e) tech: `revenue -= revenue/3`
  15. Random modifier via thunk_FUN_004c2788
  16. Food caravan case: delivers food instead of gold
  17. Gold delivery: splits to treasury + research (both get gold value)
  18. Diplomatic effect: `attitude -= 10` both ways
- **JS formula** (`reducer.js` lines 503-666):
  1. Manhattan distance (with wrap): MATCH
  2. No difficulty modifier on distance: MISSING
  3. Base = `(homeTrade + destTrade) * (distance + 10) / 24`: MATCH
  4. Different continent: `revenue *= 2`: MATCH
  5. Same owner: `revenue /= 2`: MATCH
  6. Road/Railroad distance factor: NOT IMPLEMENTED (JS approximates with tech-67 check for +50%)
  7. Airport distance factor: NOT IMPLEMENTED
  8. Commodity tier bonuses: MATCH (sets 3,5,8,10; 9,11,12,13; 14; 15)
  9. Demand match: JS does `revenue = revenue*2 + commodityBonus` for match, else `revenue + commodityBonus`: PARTIAL MATCH (binary has owner-dependent variant)
  10. Pre-200AD tech bonus: NOT IMPLEMENTED
  11. Communism penalty: NOT IMPLEMENTED
  12. Democracy penalty: NOT IMPLEMENTED
  13. Random modifier: NOT IMPLEMENTED (JS is deterministic)
  14. Revenue split: JS splits goldShare = floor(revenue/2), sciShare = revenue - goldShare; Binary adds full amount to treasury AND research: DISCREPANCY
  15. Diplomatic effect: JS does -10 only on dest→home; Binary does -10 BOTH directions: DISCREPANCY
- **Verdict**: PARTIAL — Core formula matches but multiple modifiers missing.
- **Discrepancies**:
  - D1: Missing difficulty modifier on distance (Restless Tribes 4/5, Deity 5/4)
  - D2: Road/Railroad distance bonus uses wrong formula (JS: flat +50% if tech; Binary: calculated from path distance)
  - D3: Airport bonus not implemented
  - D4: Pre-200AD without Alphabet/Writing doubles revenue — not implemented
  - D5: Communism -33% penalty not implemented
  - D6: Democracy -33% penalty not implemented
  - D7: Random modifier not implemented (acceptable for deterministic server)
  - D8: Revenue split: Binary adds FULL amount to both treasury and research separately; JS splits 50/50
  - D9: Diplomatic attitude: Binary adjusts -10 in BOTH directions (dest→home AND home→dest); JS only does dest→home

### delete_city — Delete a city (0x004413D1)
- **Address**: 0x004413D1 (1704 bytes)
- **Binary**: Decrements civ city count, disbands/reassigns all units homed to this city, removes trade routes pointing to this city from other cities, clears wonder city references (sets to -2), clears tile ownership, notifies neighbors, updates visibility.
- **JS**: `reducer.js` lines 378-389 handle trade route cleanup and wonder clearing during city capture/destruction. City deletion itself is handled inline in various reducers.
- **Verdict**: PARTIAL — Trade route cleanup and wonder clearing are implemented. Unit reassignment during city deletion is partially handled (units are killed rather than reassigned to nearest city as in the binary).
- **Discrepancy**: D10: Binary reassigns homeless units to nearest city of same owner; JS kills them.

### FUN_00441a79 — Growth cap building check (Aqueduct/Sewer)
- **Address**: 0x00441A79 (152 bytes)
- **Binary**: If city size >= DAT_0064bcd1 (default 8) and city lacks building 9 (Aqueduct), return 9. Else if city size >= DAT_0064bcd2 (default 12) and city lacks building 23 (Sewer), return 23. Else return 0.
- **JS**: `defs.js` lines 1224-1227: `AQUEDUCT: { buildingId: 9, defaultThreshold: 8 }`, `SEWER: { buildingId: 23, defaultThreshold: 12 }`. Used in `cityturn.js` line 120 for growth capping.
- **Verdict**: YES (match) — Constants and logic match exactly. Binary uses `>=` threshold, JS uses `>` threshold.
- **Note**: The JS check at cityturn.js:120 uses `newSize > threshold` (strict greater), while binary uses `>=`. However, the binary checks current size `>=` threshold to determine if the building is NEEDED (returning the building ID to auto-queue), while the JS checks if `newSize > threshold` to CAP growth. These are complementary checks for the same behavior — growth is capped at the threshold until the building is built — so the overall behavior matches.

### FUN_00441b11 — Change city production (wonder handling)
- **Address**: 0x00441B11 (2572 bytes)
- **Binary**: Handles changing a city's production item, especially wonder-related transitions (start building wonder, switch from one wonder to another, abandon wonder). Includes notifications, shield halving when switching away from wonder, checking if last city building a wonder, and wonder-group completion checks.
- **JS**: `reducer.js` and `production.js` handle production changes. Wonder-specific shield halving is in the reducer.
- **Verdict**: PARTIAL — Basic production change is implemented. Wonder-specific notifications and some edge cases (like checking if this was the last city building a particular wonder, or the wonder-group completion shields bonus) are not fully ported.
- **Discrepancy**: D11: Wonder-group completion bonus (when last civ completes all wonders in a group: shields bonus based on difficulty) not implemented.

### FUN_00442541 — Reset all city productions for a civ
- **Address**: 0x00442541 (254 bytes)
- **Binary**: For each city owned by `param_1`, if param_2 < 0 or city is on continent `param_2`, calls FUN_00441b11(city, 99) to reassign production. Checks multiplayer flag and AI mask.
- **JS**: Not directly ported as a standalone function. Production reassignment happens in specific contexts.
- **Verdict**: NOT PORTED — N/A (government-change production reset for all cities)

### FUN_0044263f — Check if city has adjacent neighbor of a given player
- **Address**: 0x0044263F (238 bytes)
- **Binary**: Checks 8 adjacent tiles around a city. If any tile has a city belonging to player `param_2`, returns 1.
- **JS**: Not ported as a standalone utility. Adjacent-city checks are done inline where needed.
- **Verdict**: NOT PORTED — N/A (adjacency helper, used for trade route and diplomacy context)

### FUN_0044272d — Find best neighboring city (by trade revenue)
- **Address**: 0x0044272D (344 bytes)
- **Binary**: Scans 8 directions (skipping diagonals after finding adjacent city). Returns the neighbor city index with highest trade revenue. Also returns direction count.
- **JS**: Not ported. This is used for AI caravan routing.
- **Verdict**: NOT PORTED — N/A (AI caravan destination ranking helper)

### FUN_00442885 — Check if city is adjacent to ally of given player
- **Address**: 0x00442885 (298 bytes)
- **Binary**: Checks if city at `param_1` is on the same tile as or adjacent to a city that has an alliance with player `param_2`.
- **JS**: Not ported as standalone.
- **Verdict**: NOT PORTED — N/A (diplomacy adjacency check)

### FUN_004429af — Check if two cities can see each other through intermediaries
- **Address**: 0x004429AF (269 bytes)
- **Binary**: Checks if `param_1` city's neighbor has a neighbor that is adjacent to `param_2` city (2-hop adjacency check).
- **JS**: Not ported.
- **Verdict**: NOT PORTED — N/A (2-hop city adjacency check)

---

## Summary

| Verdict | Count |
|---------|-------|
| N/A (FW/UI) | 343 |
| YES (match) | 3 |
| PARTIAL (functional) | 4 |
| NO → FIXED | 0 |
| NOT PORTED | 5 |
| **Total** | **355** |

Breakdown: FW=252 (static initializers + SEH/CRT helpers), UI=91 (network setup, throne room, sprite loading), GL=12 (trade routes, city deletion, production, adjacency checks).

The FW count of 252 includes 240 CString/CRT static initializer triplets (0x00447320-0x00448F78) plus 12 SEH/MFC helper functions scattered elsewhere.

---

## Discrepancies Found: 11

### D1: Missing difficulty modifier on caravan distance
- **Binary**: `FUN_00440750` adjusts distance by difficulty: flag `& 4` → `distance = distance * 4 / 5` (easier); flag `& 8` → `distance = distance * 5 / 4` (harder)
- **JS**: No difficulty modifier on distance in ESTABLISH_TRADE handler
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js` ~line 508
- **Severity**: Low (affects balance but not core logic)

### D2: Trade route road/railroad distance bonus uses wrong formula
- **Binary**: Checks both home and dest cities for flag 0x20 (Railroad improvement). If both have railroad AND are on same continent, adds 1 to distance factor; if different continent, adds 2. Also checks flag 0x19 (Airport).
- **JS**: Approximates with `if (gameState.civTechs?.[city.owner]?.has(67))` for flat +50% bonus in `calcTradeRouteIncome`
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/production.js` ~line 619
- **Severity**: Medium (affects trade route income calculation)

### D3: Airport bonus not implemented for trade routes
- **Binary**: `FUN_00440750` checks city flag 0x19 (Airport) and adds 1 to distance factor
- **JS**: Not implemented
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Low

### D4: Pre-200AD trade revenue doubling not implemented
- **Binary**: If game year < 200 AND civ lacks both Alphabet (0x26) and Writing (0x39), revenue is doubled
- **JS**: Not implemented
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Low (early-game only)

### D5: Communism tech penalty on trade not implemented
- **Binary**: If civ has Communism (tech 0x43 = 67), `revenue -= revenue / 3`
- **JS**: Not implemented
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Medium

### D6: Democracy tech penalty on trade not implemented
- **Binary**: If civ has Democracy (tech 0x1e = 30), `revenue -= revenue / 3`
- **JS**: Not implemented
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Medium

### D7: Random modifier on trade revenue not implemented
- **Binary**: Applies random factor via `rand() % 10 + 200` through FUN_004c2788
- **JS**: Deterministic calculation (no random factor)
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Low (acceptable for server-authoritative deterministic design)

### D8: Trade revenue split incorrect — binary adds full to both treasury AND research
- **Binary**: `FUN_00440750` lines 330-332: Adds `iVar6` (full revenue) to civ treasury AND `iVar6` to research total. The revenue is NOT split — BOTH get the full amount.
- **JS**: `reducer.js` lines 615-616: `goldShare = floor(revenue/2)`, `sciShare = revenue - goldShare` — splits 50/50
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js` ~line 615
- **Severity**: HIGH — Players get half the expected gold and half the expected research. Binary gives full amount to BOTH.

### D9: Trade diplomatic effect only applies one direction instead of both
- **Binary**: `FUN_00440750` line 321-322: `thunk_FUN_00456f20(iVar5, iVar4, -10)` AND `thunk_FUN_00456f20(iVar4, iVar5, -10)` — adjusts attitudes in BOTH directions
- **JS**: `reducer.js` lines 650-665: Only adjusts `destOwner`'s attitude toward `civSlot`, not the reverse
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js` ~line 650
- **Severity**: Medium

### D10: City deletion kills homeless units instead of reassigning them
- **Binary**: `delete_city` reassigns units homed to the deleted city to the nearest city of the same owner (checking for valid reassignment targets, including sea unit port checks)
- **JS**: Units homed to deleted city are killed
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Medium (affects gameplay significantly when cities are destroyed)

### D11: Wonder-group completion bonus not implemented
- **Binary**: `FUN_00441b11` checks if all alive civs have completed the same wonder group, then awards bonus shields based on difficulty level
- **JS**: Not implemented
- **File**: `/home/kruegsw/Code/civ2research/charlizationv3/engine/reducer.js`
- **Severity**: Low (rare edge case)

---

## Functions audited: 355
