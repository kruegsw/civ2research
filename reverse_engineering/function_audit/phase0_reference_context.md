# Civ2 MGE Reference Context

## 1. DAT_ Globals

### Game State
DAT_006d1da0=current_player(0-7) DAT_00655af8=current_turn DAT_00655af0=game_flags(bit2=raging_hordes)
DAT_00655b02=save_format_version DAT_00655b03=active_civ DAT_00655b04=human_player_id
DAT_00655b07=god_mode DAT_00655b08=difficulty(0-5) DAT_00655b0a=active_civs_bitmask
DAT_00655b0b=human_civs_bitmask DAT_00655b0d=num_ai_players DAT_00655c20=ai_current
DAT_00655b16=num_unit_slots DAT_00655b18=num_city_slots DAT_00655c18=initial_vis_flag

### Array Bases
DAT_0064f340=city[0] stride=0x58(88B) DAT_0064c6a0=civ[0] stride=0x594(1428B)
DAT_0064b1b8=unit_type[0] stride=0x14(20B,62entries) DAT_0064c488=improvement[0] stride=0x08(67entries)
DAT_006560f0=unit[0](implied) stride=0x20(32B) DAT_0064ba28=wonder_obsolete_tech(28entries)
DAT_0064b9a0=govt_name_table DAT_006554fc=leader_portrait_table(stride0x30)
DAT_00627684=tech_table(stride0x10) DAT_0066be90=unit_sprite_ptrs DAT_006e47c8=scale_lookup_table

### City Fields (base+idx*0x58)
+00=x(short) +02=y +04=flags(u32) +08=owner(byte0-7) +09=size(byte)
+0A=original_owner +0B=turn_founded_mod64 +0C=visibility_bitmask +0D=civ_pop_knowledge[8]
+16=worker_tiles(u32,2bit/slot) +1A=food_box(short) +1C=shield_box(short) +1E=trade_revenue(short,NET)
+20=name(char[16]) +30=improvements_lo(u32,bitfield) +34=tile_improvements(byte[5])
+39=current_production(sbyte,neg=unit,pos=bldg) +3A=num_trade_routes
+3B=supply_commodities[3] +3E=demand_commodities[3] +41=trade_route_type[3] +44=trade_partner[3](short)
+4A=food_output(short) +4C=shield_output(short) +4E=trade_output(short,NET)
+50=food_surplus +51=shield_surplus +52=happy_citizens +53=unhappy_citizens
+54=city_id(int,nonzero=valid)
Field DAT_ addrs: DAT_0064f3XX where XX=40+field_offset (e.g. DAT_0064f348=city[0].owner)

### Unit Fields (base+idx*0x20)
+00=x(short) +02=y +04=status_flags(ushort:0x02=vet,0x20=fort,0x8000=dmg)
+06=type_id(byte) +07=owner(sbyte0-7) +08=moves_remaining +09=visibility_mask
+0A=hp_remaining +0B=transport_link(sbyte,-1=none) +0C=ai_role +0D=home_city(sbyte,-1=none)
+0E=fuel +0F=orders(0x02=fort,0x03=goto,0xFF=sentry) +10=goto_counter
+12=goto_x(short) +14=goto_y +16=link_prev(short,-1=none) +18=link_next +1A=alive_flag(int,0=dead)
Field DAT_ addrs: DAT_006560XX (e.g. DAT_006560f6=unit[0].type_id, DAT_0065610a=unit[0].alive_flag)

### Unit Type Fields (base+id*0x14)
+00=name_ptr +04=flags(u16) +08=prereq_tech(sbyte) +09=domain(0=land,1=sea,2=air)
+0A=move_rate +0B=range +0C=attack +0D=defense +0E=hp(stored*10) +0F=firepower
+10=cost +11=hold +12=role +13=obsolete_tech
DAT_0064b1c1=utype[0].domain DAT_0064b1c8=utype[0].cost DAT_0064c48c=imp[0].cost

### Civ Fields (base+idx*0x594)
+00=flags(u16) +02=gold(int) +06=leader_graphic_id(short) +08=research_accum(short)
+0A=researching_tech(short,-1=none) +10=tech_count_a +12=tech_count_b
+13=science_rate(0-10) +14=tax_rate(0-10) +15=govt_type(0-6)
+58=tech_flags(12B) +66=city_unit_counts(14B) +74=tech_list(93B)
+D8=unit_counts_per_civ(54B) +154=building_count(54B) +192=military_counts(0x402B)
+3E2=last_contact_turn[8](short) +406=pollution_total(short)
Govt: 0=Anarchy 1=Despotism 2=Monarchy 3=Communism 4=Fundamentalism 5=Republic 6=Democracy

### COSMIC Constants (DAT_0064bcc8 + index)
[0]=movement_mult(3) [1]=trade_route [2]=riot_factor [3]=food_box(10,forced_even)
[4]=shield_box(10) [5]=tech_xfer_same [6]=tech_xfer_diff [7]=content_base(7)
[8]=unhappy_offset(10) [9]=city_radius [10]=city_radius2 [11]=tech_cost_mult(3,tenths)
[12]=future_tech_cost [13]=free_support_monarchy(0) [14]=free_support_communism(0)
[15]=free_support_fundamentalism [16]=communism_equiv_dist(10) [17]=fundie_sci_penalty_pct
[18]=combat [19]=city [20]=movement [21]=max_sci_fundamentalism

### Terrain Data
DAT_00627cca=terrain_resource_table DAT_00627cd0=irrigation_bonus(stride0x18)
DAT_00627cd1=mining_bonus(stride0x18) DAT_0062768e=tech_prereq_chain(stride0x10)

### City Radius Spiral
DAT_00628370=CitySpiralDX(sbyte[45]) DAT_006283a0=CitySpiralDY(sbyte[45])
DAT_00630D38=dialog_tile_offsets_x(21) DAT_00630D50=dialog_tile_offsets_y(21)

### Temp Calc Registers (city processing)
DAT_006a6550=calc_happy DAT_006a6554=calc_gold DAT_006a6560=food_per_citizen
DAT_006a6568=calc_support_cost DAT_006a656c=calc_waste DAT_006a6578=calc_science
DAT_006a657c=shields_per_row DAT_006a6580=calc_corruption DAT_006a6588=capital_distance
DAT_006a65a8=calc_unhappy DAT_006a65c8=calc_food_surplus DAT_006a65cc=calc_shield_surplus
DAT_006a65d0=calc_trade_gross DAT_006a65fc=calc_luxury DAT_006a660c=unit_support_counter
DAT_006a6618=tithe_bonus_accum

### Misc Globals
DAT_00627fdc=next_city_id(monotonic) DAT_0064bcba=secondary_civ_ref
DAT_0064b118=treaty_cost DAT_0064b0ec=ai_target DAT_0064b0fc=ai_ally DAT_0064b100=ai_enemy
DAT_0064b11c=scenario_flag DAT_006ad0ec=pollution_multiplier DAT_006ab198=screen_size_threshold
DAT_006366b0=text_color DAT_006366b4=text_font_size DAT_006366b8=text_shadow DAT_006366bc=text_bold
DAT_00637f98=zoom_current DAT_00637f9c=zoom_threshold DAT_00679643=city_name_truncate

## 2. Renamed Functions (251 in rename_map.json)

### Semantically Named (43)
FUN_00410f77=map_window_click FUN_00411705=map_double_click FUN_00411f91=map_ascii
FUN_004125c6=map_key FUN_0042a7bc=show_credits FUN_0043f8b0=create_city
FUN_004413d1=delete_city FUN_0045950b=handle_exchange_gift FUN_0045f0b1=show_gift_menu
FUN_0046a78d=load_labels_txt FUN_0046ea3b=handle_palette FUN_0046f460=load_bitmap
FUN_0046fbf3=write_bitmap_data FUN_00473660=load_game_file FUN_0047758c=save_game
FUN_00477d8c=load_verify_units FUN_004944bb=init_tile FUN_00498d40=load_city_preferences
FUN_004a468b=show_title_screen FUN_004a7ce9=new_civ FUN_004aa378=kill_civ
FUN_004b2010=parse_save_block FUN_004c59f0=handle_incident_terror
FUN_004c9528=pick_up_unit FUN_004ef578=handle_city_disorder
FUN_00509590=handle_city_disorder2 FUN_00509b48=city_button_buy
FUN_0050a473=city_button_change FUN_0050b74e=city_button_rename
FUN_0050bacd=city_button_view FUN_0050c1d1=city_mouse FUN_005569e3=set_city_shields
FUN_005aa0e5=wait_production1 FUN_005ab2d5=wait_production2
FUN_005b319e=pick_up_unit2 FUN_005d225b=debug_log FUN_005e154a=show_popup_menu

### Load Art (6): FUN_0046da40,004705d7,00471565,00471dd8,004bbb3f,005681c9 = load_civ2_art_*
### City Window (72): FUN_005070b8..0050dea8 = citywin_XXXX (panel handlers)
### GUI Boilerplate (~130): send_msg_*, manage_window_*, create_window_*, invalidate_*,
###   update_palette_*, register_wndclass_*, gdi_*, show_messagebox_*, draw_text_*,
###   measure_text_*, render_text_*, fill_rect_*, blit_*, stretch_blit_*, build_menu_*,
###   handle_colortable_*, create_dib_*, create_font_*, show_open_dialog_*

## 3. Documented-but-Not-Renamed Functions (83)

### Core Game Logic
FUN_004e7eb1=calc_food_box_size FUN_004e868f=calc_tile_resource FUN_004e7d7f=check_unit_support
FUN_004e80b1=calc_shields_per_row FUN_004e989a=calc_corruption FUN_004e9849=calc_corruption_divisor
FUN_004ea1f6=distribute_trade(lux/sci/gold) FUN_004ea8e4=calc_happiness(2627B,master)
FUN_004ea031=adjust_happy_unhappy FUN_004c2788=calc_tech_cost
FUN_004eb4ed=calc_city_production FUN_0043d20a=has_building(city,id)
FUN_005adfa0=clamp(val,min,max) FUN_00419d23=load_cosmic_rules
FUN_00419cf4=parse_rules_value FUN_0041a422=load_improvements FUN_0041a5c4=load_unit_types
FUN_004679ab=calc_attitude FUN_004762b6=recalc_unit_city_counts FUN_00473666=save_load_data

### City Dialog
FUN_0050207f=draw_citizens_row FUN_005025d5=draw_resource_rows(9761B)
FUN_00502798=draw_resource_icons FUN_00504c05=draw_food_storage FUN_0050503e=draw_production_box
FUN_005055dd=draw_buy_panel FUN_00505666=draw_units_supported FUN_00505ffa=draw_improvements_list
FUN_0056baff=draw_unit(sprite+shield+HP+orders,2803B) FUN_005baee0=set_text_style
FUN_0055324c=render_city_name FUN_005a9780=prepare_surface
FUN_00552112=begin_paint FUN_00408460=end_paint

### Sprite Pipeline
FUN_005cef31=blit_normal(->005d056c->005e518e) FUN_005cf126=blit_dimmed(->005d10cd->005e52bf,fill=0x1a)
FUN_005cef66=blit_normal_custom_transp FUN_005cef9f=blit_normal_timevec FUN_005cefd4=blit_normal_timevec_transp
FUN_005cf00d=blit_aniso FUN_005cf042=blit_aniso_transp FUN_005cf07b=blit_aniso_timevec
FUN_005cf0b0=blit_aniso_timevec_transp FUN_005cf0e9=blit_dimmed_explicit_transp
FUN_005e518e=pixel_copy(16params) FUN_005e52bf=pixel_fill(17params,p17=fill_color)
FUN_005e395a=check_topdown FUN_005e6188=lock_surface
FUN_005d056c=dispatch_oleitem_normal(673B) FUN_005d080d=dispatch_timevec_normal(671B)
FUN_005d0aac=dispatch_oleitem_aniso(787B) FUN_005d0dbf=dispatch_timevec_aniso(782B)
FUN_005d10cd=dispatch_oleitem_dimmed(677B) FUN_005d1372=dispatch_timevec_dimmed(672B)
FUN_005d1d00=scale_coords(zoom_lookup) FUN_005c55d0=get_stride FUN_005c5640=get_pixel_buffer
FUN_005c5660=get_surface_height FUN_005c56a0=get_stride_alt FUN_005cedad=create_render_ctx

### Layout/Drawing
FUN_00511690=scale_universal FUN_00472cf0=scale_sprite(base*factor/8)
FUN_00548b70=calc_icon_spacing FUN_00408780=fill_rect_palette
FUN_005113b0=draw_line FUN_005113f0=draw_3d_frame FUN_005c0333=fill_rect_gdi FUN_005db0d0=set_scrollbar

### Thunks
FUN_004a26bf=alloc_string FUN_00428b0c=get_improvement_name FUN_0040ff00=display_improvement
FUN_004271e8=show_improvement_ui(mode0-2) FUN_0040bbe0=draw_city_name
FUN_0040ff60=show_message FUN_0043c8d0=format_string FUN_0046ac89=close_dialog

## 4. Map Tile (6 bytes, interleaved)

Byte0: lo_nib=terrain(0-10) bit7=river bit6=no_resource
Byte1: bit0=unit bit1=city bit2=irrigation bit3=mining bit4=road bit5=railroad bit6=fortress bit7=pollution
Byte2: bits5-7=city_radius_owner_civ
Byte3: continent/body_ID
Byte4: visibility(bit_N=civ_N_explored)
Byte5: hi_nib=ownership(0-7,F=none) lo_nib=fertility(0-15)
Terrain: 0=Desert 1=Plains 2=Grassland 3=Forest 4=Hills 5=Mountains 6=Tundra 7=Glacier 8=Swamp 9=Jungle 10=Ocean

## 5. Constants

MAX_CIVS=8(0-7,0=barb) MAX_CITY_SLOTS=255 MAX_UNIT_TYPES=62 MAX_IMPROVEMENTS=67(39bldg+28wonder)
MAX_TECHS=93 MAX_WONDERS=28 TERRAIN_TYPES=11 TILE=64x32px UNIT_SPRITE=64x48px
Struct sizes: city=0x58(88) unit=0x20(32) civ=0x594(1428) utype=0x14(20) imp=0x08(8)
Building IDs: 0=Palace 1=Barracks 3=Granary 4=Temple 5=Marketplace 7=Library 8=Courthouse
  10=CityWalls 12=Cathedral 14=University 15=Bank 18=Colosseum 23=Factory 24=MfgPlant
  27=SDI 28=Recycling 29=PowerPlant 30=Harbor 33=Airport 35=PoliceStation
Wonder IDs(0-27): 0=Pyramids 1=HangingGardens 5=Oracle 8=Copernicus 11=Magellan
  13=Shakespeare 15=JSBach 16=Newton 19=StatueOfLiberty 21=WomensSuffrage 22=HooverDam
  24=Manhattan 25=UnitedNations 27=CureForCancer
