# Phase B1: UNSET Classifications -- Blocks 0x00440000, 0x00470000, 0x004B0000

## Block 0x00440000 (236 UNSET -> classified)

The vast majority of UNSET functions in this block are CString static initializer groups (init/constructor/atexit/destructor quadruplets) for sprite label arrays, plus a handful of SEH cleanup thunks at the end. No game logic was found.

### CString Static Init Groups (0x00447320-0x00448f78)

Each group follows one of two patterns:
- **Vector pattern** (4 functions): init calls ctor+atexit; ctor calls `_eh_vector_constructor_iterator_`; atexit registers dtor; dtor calls `_eh_vector_destructor_iterator_`
- **Single pattern** (3 functions): init calls ctor+atexit; ctor calls `CString::CString`; atexit registers dtor; dtor calls `FUN_005cde4d` (CString destructor)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x00447320 | terrain_labels_init | FW | cstring_init | 11b | NN | DAT_00647c40, 0xb elements (terrain type labels) |
| 0x0044733a | terrain_labels_ctor | FW | cstring_init | 40b | NN | |
| 0x00447362 | terrain_labels_atexit | FW | cstring_init | 29b | NN | |
| 0x0044737f | terrain_labels_dtor | FW | cstring_init | 35b | NN | |
| 0x004473a2 | dither_blend_init | FW | cstring_init | 52b | NN | DAT_00640bd8, 0x34 elements (dither blend sprites) |
| 0x004473bc | dither_blend_ctor | FW | cstring_init | 40b | NN | |
| 0x004473e4 | dither_blend_atexit | FW | cstring_init | 29b | NN | |
| 0x00447401 | dither_blend_dtor | FW | cstring_init | 35b | NN | |
| 0x00447424 | coast_q1_init | FW | cstring_init | 16b | NN | DAT_0063f858, 0x10 elements (coast quadrant set 1) |
| 0x0044743e | coast_q1_ctor | FW | cstring_init | 40b | NN | |
| 0x00447466 | coast_q1_atexit | FW | cstring_init | 29b | NN | |
| 0x00447483 | coast_q1_dtor | FW | cstring_init | 35b | NN | |
| 0x004474a6 | coast_q2_init | FW | cstring_init | 16b | NN | DAT_006461d8, 0x10 elements (coast quadrant set 2) |
| 0x004474c0 | coast_q2_ctor | FW | cstring_init | 40b | NN | |
| 0x004474e8 | coast_q2_atexit | FW | cstring_init | 29b | NN | |
| 0x00447505 | coast_q2_dtor | FW | cstring_init | 35b | NN | |
| 0x00447528 | coast_q3_init | FW | cstring_init | 16b | NN | DAT_00647388, 0x10 elements (coast quadrant set 3) |
| 0x00447542 | coast_q3_ctor | FW | cstring_init | 40b | NN | |
| 0x0044756a | coast_q3_atexit | FW | cstring_init | 29b | NN | |
| 0x00447587 | coast_q3_dtor | FW | cstring_init | 35b | NN | |
| 0x004475aa | coast_q4_init | FW | cstring_init | 16b | NN | DAT_006447b0, 0x10 elements (coast quadrant set 4) |
| 0x004475c4 | coast_q4_ctor | FW | cstring_init | 40b | NN | |
| 0x004475ec | coast_q4_atexit | FW | cstring_init | 29b | NN | |
| 0x00447609 | coast_q4_dtor | FW | cstring_init | 35b | NN | |
| 0x0044762c | cstring_single_a_init | FW | cstring_init | 26b | NN | DAT_00646158, single CString |
| 0x00447646 | cstring_single_a_ctor | FW | cstring_init | 26b | NN | |
| 0x00447660 | cstring_single_a_atexit | FW | cstring_init | 29b | NN | |
| 0x0044767d | cstring_single_a_dtor | FW | cstring_init | 26b | NN | |
| 0x00447697 | resource_sprites_init | FW | cstring_init | 26b | NN | DAT_00644e88, 2 elements (resource sprites) |
| 0x004476b1 | resource_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x004476d9 | resource_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004476f6 | resource_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447719 | cstring_single_b_init | FW | cstring_init | 26b | NN | DAT_0063fcd8, single CString |
| 0x00447733 | cstring_single_b_ctor | FW | cstring_init | 26b | NN | |
| 0x0044774d | cstring_single_b_atexit | FW | cstring_init | 29b | NN | |
| 0x0044776a | cstring_single_b_dtor | FW | cstring_init | 26b | NN | |
| 0x00447784 | cstring_single_c_init | FW | cstring_init | 26b | NN | DAT_00647ed8, single CString |
| 0x0044779e | cstring_single_c_ctor | FW | cstring_init | 26b | NN | |
| 0x004477b8 | cstring_single_c_atexit | FW | cstring_init | 29b | NN | |
| 0x004477d5 | cstring_single_c_dtor | FW | cstring_init | 26b | NN | |
| 0x004477ef | cstring_single_d_init | FW | cstring_init | 26b | NN | DAT_00646118, single CString |
| 0x00447809 | cstring_single_d_ctor | FW | cstring_init | 26b | NN | |
| 0x00447823 | cstring_single_d_atexit | FW | cstring_init | 29b | NN | |
| 0x00447840 | cstring_single_d_dtor | FW | cstring_init | 26b | NN | |
| 0x0044785a | river_sprites_init | FW | cstring_init | 32b | NN | DAT_00643b38, 0x20 elements (river sprites) |
| 0x00447874 | river_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x0044789c | river_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004478b9 | river_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004478dc | misc_sprites_init | FW | cstring_init | 26b | NN | DAT_0063fd18, 4 elements (misc sprites) |
| 0x004478f6 | misc_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x0044791e | misc_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x0044793b | misc_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x0044795e | overlay_sprites_init | FW | cstring_init | 18b | NN | DAT_00642710, 0x12 elements (overlay sprites) |
| 0x00447978 | overlay_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x004479a0 | overlay_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004479bd | overlay_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004479e0 | improvement_sprites_init | FW | cstring_init | 26b | NN | DAT_006446b8, 3 elements (improvement sprites) |
| 0x004479fa | improvement_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00447a22 | improvement_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00447a3f | improvement_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447a62 | cstring_single_e_init | FW | cstring_init | 26b | NN | DAT_00641808, single CString |
| 0x00447a7c | cstring_single_e_ctor | FW | cstring_init | 26b | NN | |
| 0x00447a96 | cstring_single_e_atexit | FW | cstring_init | 29b | NN | |
| 0x00447ab3 | cstring_single_e_dtor | FW | cstring_init | 26b | NN | |
| 0x00447acd | cstring_single_f_init | FW | cstring_init | 26b | NN | DAT_0063fc18, single CString |
| 0x00447ae7 | cstring_single_f_ctor | FW | cstring_init | 26b | NN | |
| 0x00447b01 | cstring_single_f_atexit | FW | cstring_init | 29b | NN | |
| 0x00447b1e | cstring_single_f_dtor | FW | cstring_init | 26b | NN | |
| 0x00447b38 | city_flag_sprites_init | FW | cstring_init | 22b | NN | DAT_006482f8, 0x16 elements (city flag sprites) |
| 0x00447b52 | city_flag_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00447b7a | city_flag_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00447b97 | city_flag_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447bba | airbase_sprites_init | FW | cstring_init | 26b | NN | DAT_00647fa0, 2 elements (airbase sprites) |
| 0x00447bd4 | airbase_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00447bfc | airbase_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00447c19 | airbase_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447c3c | cstring_single_g_init | FW | cstring_init | 26b | NN | DAT_00645120, single CString |
| 0x00447c56 | cstring_single_g_ctor | FW | cstring_init | 26b | NN | |
| 0x00447c70 | cstring_single_g_atexit | FW | cstring_init | 29b | NN | |
| 0x00447c8d | cstring_single_g_dtor | FW | cstring_init | 26b | NN | |
| 0x00447ca7 | cstring_single_h_init | FW | cstring_init | 26b | NN | DAT_00648820, single CString |
| 0x00447cc1 | cstring_single_h_ctor | FW | cstring_init | 26b | NN | |
| 0x00447cdb | cstring_single_h_atexit | FW | cstring_init | 29b | NN | |
| 0x00447cf8 | cstring_single_h_dtor | FW | cstring_init | 26b | NN | |
| 0x00447d12 | cstring_single_i_init | FW | cstring_init | 26b | NN | DAT_00647788, single CString |
| 0x00447d2c | cstring_single_i_ctor | FW | cstring_init | 26b | NN | |
| 0x00447d46 | cstring_single_i_atexit | FW | cstring_init | 29b | NN | |
| 0x00447d63 | cstring_single_i_dtor | FW | cstring_init | 26b | NN | |
| 0x00447d7d | cstring_single_j_init | FW | cstring_init | 26b | NN | DAT_00647348, single CString |
| 0x00447d97 | cstring_single_j_ctor | FW | cstring_init | 26b | NN | |
| 0x00447db1 | cstring_single_j_atexit | FW | cstring_init | 29b | NN | |
| 0x00447dce | cstring_single_j_dtor | FW | cstring_init | 26b | NN | |
| 0x00447de8 | cstring_single_k_init | FW | cstring_init | 26b | NN | DAT_00644770, single CString |
| 0x00447e02 | cstring_single_k_ctor | FW | cstring_init | 26b | NN | |
| 0x00447e1c | cstring_single_k_atexit | FW | cstring_init | 29b | NN | |
| 0x00447e39 | cstring_single_k_dtor | FW | cstring_init | 26b | NN | |
| 0x00447e53 | cstring_single_l_init | FW | cstring_init | 26b | NN | DAT_006480d8, single CString |
| 0x00447e6d | cstring_single_l_ctor | FW | cstring_init | 26b | NN | |
| 0x00447e87 | cstring_single_l_atexit | FW | cstring_init | 29b | NN | |
| 0x00447ea4 | cstring_single_l_dtor | FW | cstring_init | 26b | NN | |
| 0x00447ebe | people_sprites_init | FW | cstring_init | 11b | NN | DAT_00644b70, 0xb elements (people sprites) |
| 0x00447ed8 | people_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00447f00 | people_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00447f1d | people_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447f40 | editor_sprites_init | FW | cstring_init | 15b | NN | DAT_006477c8, 0xf elements (editor sprites) |
| 0x00447f5a | editor_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00447f82 | editor_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00447f9f | editor_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00447fdc | cstring_single_m_init_ctor | FW | cstring_init | 26b | NN | DAT_00644e08, single CString |
| 0x00447ff6 | cstring_single_m_atexit | FW | cstring_init | 29b | NN | |
| 0x00448013 | cstring_single_m_dtor | FW | cstring_init | 26b | NN | |
| 0x00448047 | cstring_single_n_init_ctor | FW | cstring_init | 26b | NN | DAT_006442b8, single CString |
| 0x00448061 | cstring_single_n_atexit | FW | cstring_init | 29b | NN | |
| 0x0044807e | cstring_single_n_dtor | FW | cstring_init | 26b | NN | |
| 0x004480b2 | cstring_single_o_init_ctor | FW | cstring_init | 26b | NN | DAT_00640b98, single CString |
| 0x004480cc | cstring_single_o_atexit | FW | cstring_init | 29b | NN | |
| 0x004480e9 | cstring_single_o_dtor | FW | cstring_init | 26b | NN | |
| 0x0044811d | cstring_single_p_init_ctor | FW | cstring_init | 26b | NN | DAT_00647f60, single CString |
| 0x00448137 | cstring_single_p_atexit | FW | cstring_init | 29b | NN | |
| 0x00448154 | cstring_single_p_dtor | FW | cstring_init | 26b | NN | |
| 0x0044816e | unit_sprites_a_init | FW | cstring_init | 26b | NN | DAT_0063fe50, 0x30 elements |
| 0x00448188 | unit_sprites_a_ctor | FW | cstring_init | 40b | NN | |
| 0x004481b0 | unit_sprites_a_atexit | FW | cstring_init | 29b | NN | |
| 0x004481cd | unit_sprites_a_dtor | FW | cstring_init | 35b | NN | |
| 0x004481f0 | terrain_overlay_init | FW | cstring_init | 26b | NN | DAT_006442f8, 0x10 elements |
| 0x0044820a | terrain_overlay_ctor | FW | cstring_init | 40b | NN | |
| 0x00448232 | terrain_overlay_atexit | FW | cstring_init | 29b | NN | |
| 0x0044824f | terrain_overlay_dtor | FW | cstring_init | 35b | NN | |
| 0x00448272 | unit_sprites_b_init | FW | cstring_init | 26b | NN | DAT_00641848, 0x3f elements |
| 0x0044828c | unit_sprites_b_ctor | FW | cstring_init | 40b | NN | |
| 0x004482b4 | unit_sprites_b_atexit | FW | cstring_init | 29b | NN | |
| 0x004482d1 | unit_sprites_b_dtor | FW | cstring_init | 35b | NN | |
| 0x004482f4 | misc_sprites_b_init | FW | cstring_init | 26b | NN | DAT_006465d8, 8 elements |
| 0x0044830e | misc_sprites_b_ctor | FW | cstring_init | 40b | NN | |
| 0x00448336 | misc_sprites_b_atexit | FW | cstring_init | 29b | NN | |
| 0x00448353 | misc_sprites_b_dtor | FW | cstring_init | 35b | NN | |
| 0x00448376 | road_sprites_init | FW | cstring_init | 26b | NN | DAT_00642d48, 0x2c elements |
| 0x00448390 | road_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x004483b8 | road_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004483d5 | road_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004483f8 | building_sprites_init | FW | cstring_init | 26b | NN | DAT_00646a20, 0xb elements |
| 0x00448412 | building_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x0044843a | building_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00448457 | building_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x0044847a | wonder_sprites_init | FW | cstring_init | 26b | NN | DAT_00644f00, 6 elements |
| 0x00448494 | wonder_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x004484bc | wonder_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004484d9 | wonder_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004484fc | special_sprites_a_init | FW | cstring_init | 26b | NN | DAT_00648860, 3 elements |
| 0x00448516 | special_sprites_a_ctor | FW | cstring_init | 40b | NN | |
| 0x0044853e | special_sprites_a_atexit | FW | cstring_init | 29b | NN | |
| 0x0044855b | special_sprites_a_dtor | FW | cstring_init | 35b | NN | |
| 0x0044857e | special_sprites_b_init | FW | cstring_init | 26b | NN | DAT_00645068, 3 elements |
| 0x00448598 | special_sprites_b_ctor | FW | cstring_init | 40b | NN | |
| 0x004485c0 | special_sprites_b_atexit | FW | cstring_init | 29b | NN | |
| 0x004485dd | special_sprites_b_dtor | FW | cstring_init | 35b | NN | |
| 0x00448600 | special_sprites_c_init | FW | cstring_init | 26b | NN | DAT_00648918, 3 elements |
| 0x0044861a | special_sprites_c_ctor | FW | cstring_init | 40b | NN | |
| 0x00448642 | special_sprites_c_atexit | FW | cstring_init | 29b | NN | |
| 0x0044865f | special_sprites_c_dtor | FW | cstring_init | 35b | NN | |
| 0x0044869c | cstring_single_q_init_ctor | FW | cstring_init | 26b | NN | DAT_00646598, single CString |
| 0x004486b6 | cstring_single_q_atexit | FW | cstring_init | 29b | NN | |
| 0x004486d3 | cstring_single_q_dtor | FW | cstring_init | 26b | NN | |
| 0x00448707 | cstring_single_r_init_ctor | FW | cstring_init | 26b | NN | DAT_00648058, single CString |
| 0x00448721 | cstring_single_r_atexit | FW | cstring_init | 29b | NN | |
| 0x0044873e | cstring_single_r_dtor | FW | cstring_init | 26b | NN | |
| 0x00448758 | hp_bar_sprites_init | FW | cstring_init | 26b | NN | DAT_00648118, 4 elements |
| 0x00448772 | hp_bar_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x0044879a | hp_bar_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004487b7 | hp_bar_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004487da | hp_bar_sprites_b_init | FW | cstring_init | 26b | NN | DAT_00648208, 4 elements |
| 0x004487f4 | hp_bar_sprites_b_ctor | FW | cstring_init | 40b | NN | |
| 0x0044881c | hp_bar_sprites_b_atexit | FW | cstring_init | 29b | NN | |
| 0x00448839 | hp_bar_sprites_b_dtor | FW | cstring_init | 35b | NN | |
| 0x0044885c | shield_sprites_init | FW | cstring_init | 26b | NN | DAT_0063f6f0, 6 elements |
| 0x00448876 | shield_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x0044889e | shield_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x004488bb | shield_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x004488f8 | cstring_single_s_init_ctor | FW | cstring_init | 26b | NN | DAT_00648098, single CString |
| 0x00448912 | cstring_single_s_atexit | FW | cstring_init | 29b | NN | |
| 0x0044892f | cstring_single_s_dtor | FW | cstring_init | 26b | NN | |
| 0x00448949 | unit_labels_init | FW | cstring_init | 26b | NN | DAT_00645160, 0x43 elements (67 unit type labels) |
| 0x00448963 | unit_labels_ctor | FW | cstring_init | 40b | NN | |
| 0x0044898b | unit_labels_atexit | FW | cstring_init | 29b | NN | |
| 0x004489a8 | unit_labels_dtor | FW | cstring_init | 35b | NN | |
| 0x004489cb | improvement_labels_init | FW | cstring_init | 26b | NN | DAT_00646cb8, 0x14 elements (improvement labels) |
| 0x004489e5 | improvement_labels_ctor | FW | cstring_init | 40b | NN | |
| 0x00448a0d | improvement_labels_atexit | FW | cstring_init | 29b | NN | |
| 0x00448a2a | improvement_labels_dtor | FW | cstring_init | 35b | NN | |
| 0x00448a4d | wonder_labels_init | FW | cstring_init | 26b | NN | DAT_00647168, 8 elements |
| 0x00448a67 | wonder_labels_ctor | FW | cstring_init | 40b | NN | |
| 0x00448a8f | wonder_labels_atexit | FW | cstring_init | 29b | NN | |
| 0x00448aac | wonder_labels_dtor | FW | cstring_init | 35b | NN | |
| 0x00448ae9 | cstring_single_t_init_ctor | FW | cstring_init | 26b | NN | DAT_00646198, single CString |
| 0x00448b03 | cstring_single_t_atexit | FW | cstring_init | 29b | NN | |
| 0x00448b20 | cstring_single_t_dtor | FW | cstring_init | 26b | NN | |
| 0x00448b3a | selector_sprites_init | FW | cstring_init | 26b | NN | DAT_00647b50, 4 elements |
| 0x00448b54 | selector_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00448b7c | selector_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00448b99 | selector_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00448bbc | government_sprites_init | FW | cstring_init | 26b | NN | DAT_00646878, 7 elements |
| 0x00448bd6 | government_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00448bfe | government_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00448c1b | government_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00448c3e | tech_sprites_init | FW | cstring_init | 26b | NN | DAT_00643798, 8 elements |
| 0x00448c58 | tech_sprites_ctor | FW | cstring_init | 40b | NN | |
| 0x00448c80 | tech_sprites_atexit | FW | cstring_init | 29b | NN | |
| 0x00448c9d | tech_sprites_dtor | FW | cstring_init | 35b | NN | |
| 0x00448cc0 | misc_singles_init | FW | cstring_init | 26b | NN | Group of 5 single CStrings |
| 0x00448cda | misc_singles_ctor | FW | cstring_init | 66b | NN | DAT_00647748, DAT_006409d8, DAT_00644e48, DAT_0063fc98, DAT_00648018 |
| 0x00448d1c | misc_singles_atexit | FW | cstring_init | 29b | NN | |
| 0x00448d39 | misc_singles_dtor | FW | cstring_init | 66b | NN | Calls FUN_005cde4d x5 |
| 0x00448d95 | cstring_single_u_init_ctor | FW | cstring_init | 26b | NN | DAT_0063fc58, single CString |
| 0x00448daf | cstring_single_u_atexit | FW | cstring_init | 29b | NN | |
| 0x00448dcc | cstring_single_u_dtor | FW | cstring_init | 26b | NN | |
| 0x00448e00 | cstring_single_v_init_ctor | FW | cstring_init | 26b | NN | DAT_00643af8, single CString |
| 0x00448e1a | cstring_single_v_atexit | FW | cstring_init | 29b | NN | |
| 0x00448e37 | cstring_single_v_dtor | FW | cstring_init | 26b | NN | |
| 0x00448e6b | directdraw_surface_a_init_ctor | FW | cstring_init | 26b | NN | Calls FUN_005bd630 (DirectDraw surface ctor) |
| 0x00448e85 | directdraw_surface_a_atexit | FW | cstring_init | 29b | NN | |
| 0x00448ea2 | directdraw_surface_a_dtor | FW | cstring_init | 26b | NN | Calls FUN_005bd915 (DirectDraw surface dtor) |
| 0x00448ed6 | directdraw_surface_b_init_ctor | FW | cstring_init | 26b | NN | Calls FUN_005bd630 |
| 0x00448ef0 | directdraw_surface_b_atexit | FW | cstring_init | 29b | NN | |
| 0x00448f0d | directdraw_surface_b_dtor | FW | cstring_init | 26b | NN | Calls FUN_005bd915 |
| 0x00448f41 | directdraw_surface_c_init_ctor | FW | cstring_init | 26b | NN | Calls FUN_005bd630 |
| 0x00448f5b | directdraw_surface_c_atexit | FW | cstring_init | 29b | NN | |
| 0x00448f78 | directdraw_surface_c_dtor | FW | cstring_init | 26b | NN | Calls FUN_005bd915 |

### SEH Cleanup Thunks (0x0044d0e7-0x0044d154)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0044d0e7 | seh_cleanup_df8a | FW | seh | 15b | NN | Thunk to FUN_0059df8a |
| 0x0044d0f6 | seh_cleanup_ab49 | FW | seh | 15b | NN | Thunk to FUN_0046ab49 |
| 0x0044d105 | seh_cleanup_bd915 | FW | seh | 15b | NN | Thunk to FUN_005bd915 |
| 0x0044d114 | seh_cleanup_cba0 | FW | seh | 15b | NN | Thunk to FUN_0044cba0 |
| 0x0044d123 | seh_timevec_dtor | FW | seh | 15b | NN | ~_Timevec destructor on member at +0x4fc |
| 0x0044d132 | seh_cleanup_656b | FW | seh | 15b | NN | Thunk to FUN_005c656b |
| 0x0044d141 | seh_cleanup_ca60 | FW | seh | 9b | NN | Thunk to FUN_0044ca60 |
| 0x0044d154 | seh_fs_restore | FW | seh | 14b | NN | SEH FS chain restore |

### Civ2-Specific Content Found in This Block:
None. All 236 functions are pure CString/surface static initializer infrastructure and SEH epilogue thunks. The DAT_ addresses identify sprite array locations in the data segment, but the init functions themselves contain no game formulas or constants beyond array sizes (element counts for each sprite category).

---

## Block 0x00470000 (66 UNSET -> classified)

This block contains a mix of SEH thunks, CString static inits, and significant rendering/viewport functions.

### SEH/Destructor Cleanup Thunks

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004714f9 | seh_surface_dtor | FW | seh | 15b | NN | Thunk to FUN_005bd915 (surface dtor) |
| 0x00471508 | seh_cleanup_c520 | FW | seh | 15b | NN | Thunk to FUN_0043c520 |
| 0x00471517 | seh_timevec_dtor | FW | seh | 15b | NN | ~_Timevec at +0xf14 |
| 0x00471526 | seh_cleanup_d1a0 | FW | seh | 15b | NN | Thunk to FUN_005dd1a0 |
| 0x00471535 | seh_cleanup_656b | FW | seh | 15b | NN | Thunk to FUN_005c656b |
| 0x00471544 | seh_cleanup_ca60 | FW | seh | 9b | NN | Thunk to FUN_0044ca60 |
| 0x00471557 | seh_fs_restore | FW | seh | 14b | NN | SEH FS chain restore |
| 0x0047239f | seh_surface_dtor_b | FW | seh | 12b | NN | Thunk to FUN_005bd915 |
| 0x004723ab | seh_cleanup_656b_b | FW | seh | 12b | NN | Thunk to FUN_005c656b |
| 0x004723b7 | seh_cleanup_ca60_b | FW | seh | 12b | NN | Thunk to FUN_0044ca60 |
| 0x004723c3 | seh_timevec_dtor_b | FW | seh | 12b | NN | ~_Timevec at ebp-0x4d4 |
| 0x004723cf | seh_cleanup_cba0 | FW | seh | 12b | NN | Thunk to FUN_0044cba0 |
| 0x004723e5 | seh_fs_restore_b | FW | seh | 14b | NN | SEH FS chain restore |
| 0x004786f8 | seh_cleanup_656b_c | FW | seh | 12b | NN | Thunk to FUN_005c656b |
| 0x0047870e | seh_fs_restore_c | FW | seh | 15b | NN | SEH FS chain restore |

### CString / Static Object Init Groups

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x00472f2a | surface_static_init_ctor | FW | cstring_init | 26b | NN | Calls FUN_005bd630 (surface ctor) |
| 0x00472f44 | surface_static_init_atexit | FW | cstring_init | 29b | NN | |
| 0x00472f61 | surface_static_init_dtor | FW | cstring_init | 26b | NN | Calls FUN_005bd915 (surface dtor) |
| 0x00479d20 | civ_player_windows_init | FW | cstring_init | 26b | NN | DAT_0066c7a8, 0x3f0-sized, 8 elements (per-civ map windows) |
| 0x00479d3a | civ_player_windows_ctor | FW | cstring_init | 43b | NN | _eh_vector_constructor_iterator_ |
| 0x00479d65 | civ_player_windows_atexit | FW | cstring_init | 29b | NN | |
| 0x00479d82 | civ_player_windows_dtor | FW | cstring_init | 38b | NN | _eh_vector_destructor_iterator_ |
| 0x00479dc2 | minimap_a_init_ctor | FW | cstring_init | 26b | NN | Thunk to FUN_0040fb00 (minimap ctor) |
| 0x00479ddc | minimap_a_atexit | FW | cstring_init | 29b | NN | |
| 0x00479df9 | minimap_a_dtor | FW | cstring_init | 26b | NN | Thunk to FUN_0040fbb0 (minimap dtor) |
| 0x00479e2d | minimap_b_init_ctor | FW | cstring_init | 26b | NN | Thunk to FUN_0040fb00 |
| 0x00479e47 | minimap_b_atexit | FW | cstring_init | 29b | NN | |
| 0x00479e64 | minimap_b_dtor | FW | cstring_init | 26b | NN | Thunk to FUN_0040fbb0 |

### Rendering -- Unit Drawing Functions

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0047bba5 | draw_unit_simple | RN | sprite | 69b | SK | Delegates to FUN_0056baff (main sprite draw) |
| 0x0047bbea | draw_unit_if_visible | RN | sprite | 111b | SK | Checks DAT_0062804c (visible), DAT_006d1da8 (current player), delegates to sprite draw |
| 0x0047bc59 | draw_unit_at_position | RN | sprite | 171b | SK | Converts unit index to screen coords via tile_to_screen (FUN_0047a6b0), adjusts for scroll offset, draws sprite |
| 0x0047bd04 | draw_unit_with_stacking | RN | sprite | 351b | SK | CONTAINS_GAME_LOGIC: Checks unit stacking -- compares DAT_00633e48 (selected unit) and DAT_00633e54, checks unit ownership bits (visibility mask 1<<player), uses DAT_00655afe (active unit id) and DAT_006560f0+i*0x20 (unit array stride=0x20) |
| 0x0047be63 | draw_units_at_tile | RN | sprite | 662b | SK | CONTAINS_GAME_LOGIC: Unit visibility logic -- iterates unit list at tile via FUN_005b2c82 (next unit in stack), checks unit ownership (DAT_006560f7+idx*0x20 = owner), visibility bits (DAT_006560f9+idx*0x20), unit status bytes (0x006560ff = order), DAT_00655b07 (cheat/debug reveal). Unit record stride 0x20 confirmed. |

### Viewport -- Map Redraw/Update Functions

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0047c7aa | calc_tile_group_rect | VP | scroll | 191b | SK | Calculates pixel rect for a tile group: uses viewport offsets (0x310, 0x314), tile size (0x308), multiplies by radius |
| 0x0047c869 | redraw_tile_area | VP | scroll | 352b | SK | Iterates diamond pattern around center tile (radius param_3), calls draw_tile (FUN_0047c103) + draw_city_labels (FUN_0047c443). Uses map wrapping via FUN_005ae052. |
| 0x0047c9d4 | redraw_full_viewport | VP | scroll | 278b | SK | Full viewport redraw: iterates rows (0x2fc + 0x304 + 1) and cols (0x2f8/0x300 alternating), calls draw_tile for each. Uses FUN_005a9aa3 for scroll animation. |
| 0x0047caea | invalidate_tile_area | VP | scroll | 60b | SK | Calculates rect via calc_tile_group_rect, calls InvalidateRect (FUN_00408490) |
| 0x0047cb26 | invalidate_single_tile | VP | scroll | 42b | SK | Calls invalidate_tile_area with radius=0 |
| 0x0047cb50 | begin_end_paint_cycle | VP | scroll | 100b | SK | Calls BeginPaint/EndPaint cycle, updates minimap if DAT_00655b02 > 2 |
| 0x0047cbb4 | update_map_area | VP | scroll | 313b | SK | Redraws tile area, draws active unit cursor (DAT_0064b1b4/b0), handles cheat mode (DAT_00655b07). Uses DAT_006ad908 flag, DAT_006d1da8 (current player) |
| 0x0047cced | update_map_tile | VP | scroll | 50b | SK | Calls update_map_area(x,y,0,current_player,1) |
| 0x0047cd1f | update_map_radius1 | VP | scroll | 50b | SK | Calls update_map_area(x,y,1,current_player,1) |
| 0x0047cd51 | redraw_entire_map | VP | scroll | 205b | SK | Full map redraw: clears background, resets viewport, calls redraw_full_viewport, refreshes minimap, updates status bar. Uses DAT_006ad684 and DAT_0062bcb0 flags. |
| 0x0047ce1e | update_map_area_all_players | VP | scroll | 136b | SK | Loops over 8 players, calls update_map_area for each active player (checks DAT_0066ca84+i*0x3f0) |
| 0x0047cea6 | update_tile_all_players | VP | scroll | 124b | SK | Loops over 8 players, calls update_map_tile for each |
| 0x0047cf22 | update_radius1_all_players | VP | scroll | 124b | SK | Loops over 8 players, calls update_map_radius1 for each |
| 0x0047cf9e | redraw_map_all_players | VP | scroll | 124b | SK | Loops over 8 players, calls redraw_entire_map for each |

### UI -- Window Construction/Destruction

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0047dce0 | ctor_map_window | UI | dialog | 164b | SK | Map window constructor: calls parent ctor (FUN_0055339f), creates 2 sub-objects (FUN_0043c690), 2 DirectDraw surfaces (FUN_005bd630), sets vtable to PTR_FUN_0061d1e4 |
| 0x0047de10 | dtor_CBitmapButton | FW | mfc | 114b | NN | CBitmapButton::~CBitmapButton -- MFC library destructor, destroys 4 sub-objects |

### SEH Cleanup Thunks (CBitmapButton destructor internals)

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0047de82 | bitmapbtn_surface_dtor_a | FW | seh | 15b | NN | Thunk to FUN_005bd915 (surface dtor) |
| 0x0047de91 | bitmapbtn_surface_dtor_b | FW | seh | 15b | NN | Thunk to FUN_005bd915 |
| 0x0047dea0 | bitmapbtn_obj_dtor_a | FW | seh | 15b | NN | Thunk to FUN_0043c520 (dialog obj dtor) |
| 0x0047deaf | bitmapbtn_obj_dtor_b | FW | seh | 15b | NN | Thunk to FUN_0043c520 |
| 0x0047debe | bitmapbtn_frame_dtor | FW | mfc | 9b | NN | COleCntrFrameWnd::~COleCntrFrameWnd call |
| 0x0047ded1 | bitmapbtn_seh_fs_restore | FW | seh | 14b | NN | SEH FS chain restore |

### Viewport -- Zoom/Scale Functions

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x0047df20 | set_sprite_scale | VP | zoom | 33b | SK | Calls FUN_005cd775(param+8, 8) -- sets sprite rendering scale factor |
| 0x0047df50 | reset_sprite_scale | VP | zoom | 28b | SK | Calls FUN_005cd775(1, 1) -- resets to 1:1 scale |
| 0x0047df80 | intersect_rect | FW | window | 34b | NN | Win32 IntersectRect wrapper |
| 0x0047dfb0 | scale_at_current_zoom | VP | zoom | 47b | SK | Calls FUN_00472cf0 with current zoom level from viewport+0x2e4 |
| 0x0047dff0 | set_current_zoom_scale | VP | zoom | 41b | SK | Calls set_sprite_scale with current zoom level from viewport+0x2e4 |

### Civ2-Specific Content Found in This Block:
- **FUN_0047bd04** (draw_unit_with_stacking): Unit data structure layout confirmed -- DAT_006560f0 base, stride 0x20, fields: +0=x_coord(short), +2=y_coord(short), +7=owner(byte&0x1f), +9=visibility_mask(byte)
- **FUN_0047be63** (draw_units_at_tile): Unit stack iteration via FUN_005b2c82, owner field at offset+7, status/order field at offset+0xf, cheat reveal flag DAT_00655b07
- **FUN_0047c9d4** (redraw_full_viewport): Viewport structure layout -- +0x2e8=viewport_x, +0x2ec=viewport_y, +0x2f8=cols_even, +0x2fc=rows, +0x300=cols_odd, +0x304=extra_rows, +0x308=tile_width, +0x310=half_tile_width, +0x314=half_tile_height
- **FUN_0047ce1e**: Player count hardcoded to 8, player window array stride 0x3f0, active player check at DAT_0066ca84+i*0x3f0
- **FUN_0047df20/0x0047dff0**: Zoom system uses viewport+0x2e4 as zoom level, scaling via FUN_005cd775

---

## Block 0x004B0000 (49 UNSET -> classified)

This block contains CRT init stubs, dialog object static init groups for the diplomacy/parley window system, and SEH cleanup thunks.

### CRT Init Stubs

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004b08e0 | _crt_init_E2 | FW | crt | 21b | NN | Calls _crt_init_E1 |
| 0x004b08f5 | _crt_init_E1 | FW | crt | 10b | NN | No-op return |

### Static Object Init Groups -- Diplomacy Dialog Objects

These use FUN_0043c4c0/FUN_0043c460 (dialog object constructors) and FUN_0043c520 (dialog object destructor).

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004b3ca0 | static_init_obj_a | FW | cstring_init | 26b | NN | Calls ctor + atexit |
| 0x004b3cba | static_init_obj_a_ctor | FW | cstring_init | 32b | NN | FUN_0043c4c0(0,0x10,1) -- dialog obj with 0x10 size |
| 0x004b3cda | static_init_obj_a_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3cf7 | static_init_obj_a_dtor | FW | cstring_init | 26b | NN | FUN_0043c520 |
| 0x004b3d11 | static_init_obj_b | FW | cstring_init | 26b | NN | |
| 0x004b3d2b | static_init_obj_b_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x14) |
| 0x004b3d49 | static_init_obj_b_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3d66 | static_init_obj_b_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3d80 | static_init_obj_c | FW | cstring_init | 26b | NN | |
| 0x004b3d9a | static_init_obj_c_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x0E) |
| 0x004b3db8 | static_init_obj_c_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3dd5 | static_init_obj_c_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3def | static_init_obj_d | FW | cstring_init | 26b | NN | |
| 0x004b3e09 | static_init_obj_d_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x10) |
| 0x004b3e27 | static_init_obj_d_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3e44 | static_init_obj_d_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3e5e | static_init_obj_e | FW | cstring_init | 26b | NN | |
| 0x004b3e78 | static_init_obj_e_ctor | FW | cstring_init | 32b | NN | FUN_0043c4c0(0,0x18,1) |
| 0x004b3e98 | static_init_obj_e_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3eb5 | static_init_obj_e_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3ecf | static_init_obj_f | FW | cstring_init | 26b | NN | |
| 0x004b3ee9 | static_init_obj_f_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x1E) |
| 0x004b3f07 | static_init_obj_f_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3f24 | static_init_obj_f_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3f3e | static_init_obj_g | FW | cstring_init | 26b | NN | |
| 0x004b3f58 | static_init_obj_g_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x15) |
| 0x004b3f76 | static_init_obj_g_atexit | FW | cstring_init | 29b | NN | |
| 0x004b3f93 | static_init_obj_g_dtor | FW | cstring_init | 26b | NN | |
| 0x004b3fad | static_init_obj_h | FW | cstring_init | 26b | NN | |
| 0x004b3fc7 | static_init_obj_h_ctor | FW | cstring_init | 30b | NN | FUN_0043c460(0,0x18) |
| 0x004b3fe5 | static_init_obj_h_atexit | FW | cstring_init | 29b | NN | |
| 0x004b4002 | static_init_obj_h_dtor | FW | cstring_init | 26b | NN | |

### Static Object Init Groups -- Parley (Negotiation) Window

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004b401c | static_init_parleywin_a | FW | cstring_init | 26b | NN | Init DAT_006665da |
| 0x004b4036 | static_init_parleywin_a_ctor | FW | cstring_init | 37b | NN | Calls FUN_004b4108 (parley window constructor) |
| 0x004b405b | static_init_parleywin_a_atexit | FW | cstring_init | 29b | NN | |
| 0x004b4078 | static_init_parleywin_a_dtor | FW | cstring_init | 26b | NN | Calls FUN_004b4593 (parley window destructor) |
| 0x004b4092 | static_init_parleywin_b | FW | cstring_init | 26b | NN | Init DAT_006665ea |
| 0x004b40ac | static_init_parleywin_b_ctor | FW | cstring_init | 37b | NN | Calls FUN_004b4108 |
| 0x004b40d1 | static_init_parleywin_b_atexit | FW | cstring_init | 29b | NN | |
| 0x004b40ee | static_init_parleywin_b_dtor | FW | cstring_init | 26b | NN | Calls FUN_004b4593 |

### SEH Cleanup Thunks

| Address | Name | Category | Subcategory | Size | Status | Game Logic Notes |
|---------|------|----------|-------------|------|--------|-----------------|
| 0x004b4705 | parleywin_close_file | FW | seh | 12b | NN | Thunk to FUN_005d7c6e (close file handle) |
| 0x004b4711 | parleywin_cleanup_base | FW | seh | 22b | NN | Thunk to FUN_0044cba0 (base cleanup) |
| 0x004b4727 | parleywin_seh_unwind_a | FW | seh | 14b | NN | SEH FS chain restore |
| 0x004b4be3 | parleywin_close_file_2 | FW | seh | 22b | NN | Thunk to FUN_005d7c6e |
| 0x004b4bf9 | parleywin_seh_unwind_b | FW | seh | 16b | NN | SEH FS chain restore |
| 0x004bfd9a | tech_discovery_cleanup | FW | seh | 12b | NN | Thunk to FUN_0059df8a |
| 0x004bfdb0 | tech_discovery_seh_unwind | FW | seh | 14b | NN | SEH FS chain restore |

### Civ2-Specific Content Found in This Block:
None of the UNSET functions contain game logic. However, the parley window constructor they reference (FUN_004b4108 at 1144 bytes, NOT UNSET) initializes a large diplomacy/negotiation window object with chat logging (chatlog.txt), INI profile reads (ChatShowSize), and extensive state initialization -- this is relevant to the NW/diplomacy subsystem but was already classified.

---

## Summary

- **Total UNSET classified**: 344 (235 + 60 + 49)
- **New GL functions found**: 0
- **Functions with embedded game logic**: 2 (flagged, both in RN category)
  - 0x0047bd04 (draw_unit_with_stacking): Unit data structure layout, visibility mask logic
  - 0x0047be63 (draw_units_at_tile): Unit stack iteration, owner/visibility checking
- **Functions that are pure framework**: 320 (FW.cstring_init: 280, FW.seh: 35, FW.crt: 2, FW.mfc: 2, FW.window: 1)
- **Rendering functions**: 5 (RN.sprite)
- **Viewport functions**: 18 (VP.scroll: 14, VP.zoom: 4)
- **UI functions**: 1 (UI.dialog)

### Category Breakdown

| Category.Subcategory | Count |
|---------------------|-------|
| FW.cstring_init | 280 |
| FW.seh | 35 |
| VP.scroll | 14 |
| RN.sprite | 5 |
| VP.zoom | 4 |
| FW.mfc | 2 |
| FW.crt | 2 |
| FW.window | 1 |
| UI.dialog | 1 |
| **Total** | **344** |

Note: The MASTER file lists 235 category=UNSET functions for block 0x00440000, 60 for block 0x00470000, and 49 for block 0x004B0000 (total 344). The block summary lines show different totals for the "?" (UNSET status) column because some functions have UNSET status but already have a non-UNSET category assigned. This report classifies all 344 functions with category=UNSET.

### Key Structural Findings

1. **Block 0x00440000** is entirely sprite label/surface initialization infrastructure. The ~56 sprite array groups reveal the complete set of terrain, unit, improvement, and UI sprite categories used by the rendering system.

2. **Block 0x00470000** contains the core viewport/map redraw pipeline: tile-level redraw, area redraw with diamond iteration, full viewport redraw, and multi-player update propagation. The unit drawing functions embed unit data structure knowledge (stride 0x20, field offsets for owner, position, visibility, and order).

3. **Block 0x004B0000** contains the diplomacy/parley window object initialization infrastructure, including static instances of the parley window at DAT_006665da and DAT_006665ea, and dialog object init groups for 8 diplomacy-related UI controls.
