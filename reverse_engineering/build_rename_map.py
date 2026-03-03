"""Build a comprehensive function rename map from Ghidra decompiled output."""

import re, os, json

DECOMPILED_DIR = r"C:\Users\stuar\Documents\Stu\Code\civ2research\reverse_engineering\decompiled_raw"
OUTPUT_DIR = r"C:\Users\stuar\Documents\Stu\Code\civ2research\reverse_engineering"

# Known function names from debug strings
KNOWN_FUNCTIONS = {
    "FUN_00509b48": "city_button_buy",
    "FUN_0050a473": "city_button_change",
    "FUN_0050b74e": "city_button_rename",
    "FUN_0050bacd": "city_button_view",
    "FUN_0050c1d1": "city_mouse",
    "FUN_005d225b": "debug_log",
}

# Scan all .c files for evidence
evidence = {}

for filename in sorted(os.listdir(DECOMPILED_DIR)):
    if not filename.endswith('.c'):
        continue
    filepath = os.path.join(DECOMPILED_DIR, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    func_pattern = re.compile(r'// Function: (\S+) @ (0x[0-9A-F]+)')
    funcs_in_file = list(func_pattern.finditer(content))

    for idx, match in enumerate(funcs_in_file):
        func_name = match.group(1)
        func_addr = match.group(2)

        start = match.end()
        if idx + 1 < len(funcs_in_file):
            end = funcs_in_file[idx + 1].start()
        else:
            end = len(content)
        body = content[start:end]

        if func_name not in evidence:
            evidence[func_name] = {'addr': func_addr, 'apis': [], 'strings': [], 'events': [], 'raw_strings': []}

        # Capture raw string reference names
        for sm in re.finditer(r's_([A-Za-z0-9_]+?)_[0-9a-f]{8}', body):
            evidence[func_name]['strings'].append(sm.group(1))

        # Capture full string literals
        for sm in re.finditer(r'"([^"]{4,})"', body):
            evidence[func_name]['raw_strings'].append(sm.group(1))

        api_pattern = (r'\b(BitBlt|StretchBlt|DrawTextA|CreateWindowExA|RegisterClassA|'
                       r'SetTextColor|SetBkColor|FillRect|FrameRect|CreateFontIndirectA|'
                       r'CreateDIBSection|InvalidateRect|BeginPaint|EndPaint|ShowWindow|'
                       r'DestroyWindow|CreateMenu|SendMessageA|PostMessageA|SetTimer|'
                       r'KillTimer|GetDC|ReleaseDC|CreateCompatibleDC|DeleteDC|SelectObject|'
                       r'CreateSolidBrush|GetPixel|SetPixel|LineTo|MoveToEx|CreatePen|'
                       r'OffsetRect|GetTextExtentPointA|GetTextMetricsA|SetScrollPos|'
                       r'SetScrollRange|MessageBoxA|wsprintfA|DrawIcon|LoadBitmapA|'
                       r'AnimatePalette|RealizePalette|GetDIBColorTable|SetDIBColorTable|'
                       r'MoveWindow|SetWindowPos|GetClientRect|SetWindowTextA|'
                       r'GetOpenFileNameA|GetSaveFileNameA|ReadFile|WriteFile|CreateFileA|'
                       r'AppendMenuA|InsertMenuA|CheckMenuItem|TrackPopupMenu|'
                       r'SetScrollPos|GetScrollPos|ShowScrollBar|DispatchMessageA|'
                       r'PeekMessageA|TranslateMessage)\b')
        for api in re.findall(api_pattern, body):
            evidence[func_name]['apis'].append(api)

        for em in re.findall(r'NM_\w+', body):
            evidence[func_name]['events'].append(em)

# Build rename map
renames = dict(KNOWN_FUNCTIONS)

for func_name, ev in evidence.items():
    if not func_name.startswith('FUN_'):
        continue
    if func_name in renames:
        continue

    strings = ev['strings']
    apis = ev['apis']
    events = list(set(ev['events']))
    addr = int(ev['addr'], 16)
    addr_suffix = ev['addr'][6:]

    # === String-based naming ===

    # Map window functions
    str_joined = ' '.join(strings)
    if 'Map_3__map_window_click' in str_joined:
        renames[func_name] = 'map_window_click'
    elif 'Map_3__map_double_click' in str_joined:
        renames[func_name] = 'map_double_click'
    elif 'Map_3__map_ascii' in str_joined:
        renames[func_name] = 'map_ascii'
    elif 'Map_3__map_key' in str_joined:
        renames[func_name] = 'map_key'
    elif 'init_tile_failed' in str_joined:
        renames[func_name] = 'init_tile'
    elif 'init_background_failed' in str_joined:
        renames[func_name] = 'init_background'
    elif 'init_main_art_failed' in str_joined:
        renames[func_name] = 'init_main_art'
    elif 'init_military_failed' in str_joined:
        renames[func_name] = 'init_military'
    elif 'init_science_failed' in str_joined:
        renames[func_name] = 'init_science'
    elif 'init_portrait_failed' in str_joined:
        renames[func_name] = 'init_portrait'
    elif 'Create_City' in str_joined:
        renames[func_name] = 'create_city'
    elif 'Delete_City' in str_joined:
        renames[func_name] = 'delete_city'
    elif 'move_unit' in str_joined and 'NM_REALTIME' not in str_joined:
        renames[func_name] = 'move_unit'
    elif 'Pick_Up_Unit' in str_joined:
        renames[func_name] = 'pick_up_unit'
    elif 'new_civ__Connection' in str_joined or 'new_civ__Received' in str_joined:
        renames[func_name] = 'new_civ'
    elif 'kill_civ' in str_joined:
        renames[func_name] = 'kill_civ'
    elif 'SAVEERROR' in str_joined:
        renames[func_name] = 'save_game'
    elif 'load_gpk' in str_joined:
        renames[func_name] = 'load_game_file'
    elif 'Stacked_Unit_in_save' in str_joined:
        renames[func_name] = 'load_verify_units'
    elif 'handle_palette' in str_joined:
        renames[func_name] = 'handle_palette'
    elif 'handle_fullcolors' in str_joined:
        renames[func_name] = 'handle_fullcolors'
    elif 'handle_colors' in str_joined:
        renames[func_name] = 'handle_colors'
    elif 'handle_grey' in str_joined:
        renames[func_name] = 'handle_grey'
    elif 'Invalid_bitmap_file' in str_joined:
        renames[func_name] = 'load_bitmap'
    elif 'Error_reading_bitmap_image' in str_joined:
        renames[func_name] = 'read_bitmap_data'
    elif 'Error_writing_bitmap_image' in str_joined:
        renames[func_name] = 'write_bitmap_data'
    elif 'Error_reading_file_palette' in str_joined:
        renames[func_name] = 'read_file_palette'
    elif 'Error_writing_file_palette' in str_joined:
        renames[func_name] = 'write_file_palette'
    elif 'DISORDER' in str_joined:
        renames[func_name] = 'handle_city_disorder'
    elif 'CITYSTUFF' in str_joined:
        renames[func_name] = 'handle_city_stuff'
    elif 'PRODUCTION' in str_joined and 'WAIT' not in str_joined:
        renames[func_name] = 'handle_production'
    elif 'WAITPRODUCTION' in str_joined:
        renames[func_name] = 'wait_production'
    elif 'RENAMECITY' in str_joined:
        renames[func_name] = 'show_rename_city_dialog'
    elif 'AUTOMODE' in str_joined:
        renames[func_name] = 'toggle_automode'
    elif 'FREEBIE' in str_joined:
        renames[func_name] = 'handle_freebie'
    elif 'PRODCHANGE' in str_joined:
        renames[func_name] = 'handle_production_change'
    elif 'blockType' in str_joined:
        renames[func_name] = 'parse_save_block'
    elif 'CITYPREF' in str_joined:
        renames[func_name] = 'load_city_preferences'
    elif 'SETCITYSHIELDS' in str_joined:
        renames[func_name] = 'set_city_shields'
    elif 'INCIDENTTERROR' in str_joined:
        renames[func_name] = 'handle_incident_terror'
    elif 'EXCHANGEGIFT' in str_joined:
        renames[func_name] = 'handle_exchange_gift'
    elif 'GIFTMENU' in str_joined:
        renames[func_name] = 'show_gift_menu'
    elif 'TECHGIFT' in str_joined:
        renames[func_name] = 'handle_tech_gift'
    elif 'MONEYGIFT' in str_joined:
        renames[func_name] = 'handle_money_gift'
    elif 'scredits' in str_joined:
        renames[func_name] = 'show_credits'
    elif 'TITLE' in str_joined and len(strings) <= 3:
        renames[func_name] = 'show_title_screen'
    elif 'civ2__wonder' in str_joined:
        renames[func_name] = 'play_wonder_video'
    elif 'civ2art' in str_joined:
        renames[func_name] = 'load_civ2_art'
    elif 'ERROR_LABELS_TXT' in str_joined or 'ERROR__LABELS' in str_joined:
        renames[func_name] = 'load_labels_txt'

    # === Event-based naming ===
    elif len(events) >= 10:
        renames[func_name] = 'dispatch_game_events'
    elif len(events) >= 5:
        prefix = events[0].replace('NM_POP_', '').replace('NM_POPUP_', '').replace('NM_', '').lower()
        renames[func_name] = f'handle_events_{prefix}'
    elif len(events) >= 2:
        prefix = events[0].replace('NM_POP_', '').replace('NM_POPUP_', '').replace('NM_', '').lower()
        renames[func_name] = f'handle_{prefix}'

# === API-based naming (no string evidence) ===
for func_name, ev in evidence.items():
    if not func_name.startswith('FUN_') or func_name in renames:
        continue

    apis = ev['apis']
    if not apis:
        continue

    api_set = set(apis)
    addr_suffix = ev['addr'][6:]
    addr = int(ev['addr'], 16)

    if 'RegisterClassA' in api_set and len(api_set) <= 4:
        renames[func_name] = f'register_wndclass_{addr_suffix}'
    elif api_set == {'BitBlt'} or api_set == {'BitBlt', 'SelectObject'}:
        renames[func_name] = f'blit_{addr_suffix}'
    elif api_set == {'StretchBlt'} or api_set == {'StretchBlt', 'SelectObject'}:
        renames[func_name] = f'stretch_blit_{addr_suffix}'
    elif 'GetTextExtentPointA' in api_set and 'DrawTextA' not in api_set:
        renames[func_name] = f'measure_text_{addr_suffix}'
    elif 'CreateFontIndirectA' in api_set and len(api_set) <= 4:
        renames[func_name] = f'create_font_{addr_suffix}'
    elif ('AnimatePalette' in api_set or 'RealizePalette' in api_set) and len(api_set) <= 5:
        renames[func_name] = f'update_palette_{addr_suffix}'
    elif ('GetDIBColorTable' in api_set or 'SetDIBColorTable' in api_set) and len(api_set) <= 5:
        renames[func_name] = f'handle_colortable_{addr_suffix}'
    elif 'GetOpenFileNameA' in api_set:
        renames[func_name] = f'show_open_dialog_{addr_suffix}'
    elif 'GetSaveFileNameA' in api_set:
        renames[func_name] = f'show_save_dialog_{addr_suffix}'
    elif ('AppendMenuA' in api_set or 'InsertMenuA' in api_set) and 'CreateMenu' not in api_set:
        renames[func_name] = f'build_menu_{addr_suffix}'
    elif 'TrackPopupMenu' in api_set:
        renames[func_name] = f'show_popup_menu_{addr_suffix}'
    elif 'MessageBoxA' in api_set and len(api_set) <= 3:
        renames[func_name] = f'show_messagebox_{addr_suffix}'
    elif 'CreateDIBSection' in api_set:
        renames[func_name] = f'create_dib_{addr_suffix}'

# === Region-based naming for remaining unnamed functions ===
for func_name, ev in evidence.items():
    if not func_name.startswith('FUN_') or func_name in renames:
        continue

    addr = int(ev['addr'], 16)
    addr_suffix = ev['addr'][6:]
    apis = set(ev['apis'])

    # City window module (0x507000-0x510FFF)
    if 0x507000 <= addr <= 0x510FFF:
        renames[func_name] = f'citywin_{addr_suffix}'

    # GDI rendering layer (0x5B0000-0x5DFFFF) - only if they have API evidence
    elif 0x5B0000 <= addr <= 0x5DFFFF and apis:
        if 'DrawTextA' in apis and 'SetTextColor' in apis:
            renames[func_name] = f'draw_text_{addr_suffix}'
        elif 'DrawTextA' in apis:
            renames[func_name] = f'render_text_{addr_suffix}'
        elif 'BitBlt' in apis:
            renames[func_name] = f'blit_{addr_suffix}'
        elif 'FillRect' in apis:
            renames[func_name] = f'fill_rect_{addr_suffix}'
        elif 'LineTo' in apis and 'MoveToEx' in apis:
            renames[func_name] = f'draw_lines_{addr_suffix}'
        elif 'CreateWindowExA' in apis:
            renames[func_name] = f'create_window_{addr_suffix}'
        elif 'ShowWindow' in apis or 'DestroyWindow' in apis:
            renames[func_name] = f'manage_window_{addr_suffix}'
        elif 'InvalidateRect' in apis:
            renames[func_name] = f'invalidate_{addr_suffix}'
        elif 'SendMessageA' in apis:
            renames[func_name] = f'send_msg_{addr_suffix}'
        elif 'BeginPaint' in apis and 'EndPaint' in apis:
            renames[func_name] = f'on_paint_{addr_suffix}'
        elif len(apis) >= 2:
            renames[func_name] = f'gdi_{addr_suffix}'

# Deduplicate any name collisions
name_counts = {}
for old, new in renames.items():
    name_counts[new] = name_counts.get(new, 0) + 1

for old, new in list(renames.items()):
    if name_counts[new] > 1:
        renames[old] = f'{new}_{old[-8:]}'

print(f"Total renames: {len(renames)}")
print(f"  From debug strings: {len(KNOWN_FUNCTIONS)}")
print(f"  From string analysis: {sum(1 for v in renames.values() if not v.endswith(tuple(KNOWN_FUNCTIONS.values())))}")

# Save the rename map
rename_path = os.path.join(OUTPUT_DIR, "rename_map.json")
with open(rename_path, 'w') as f:
    json.dump(renames, f, indent=2, sort_keys=True)
print(f"\nRename map saved to: {rename_path}")

# Show categories
categories = {}
for old, new in renames.items():
    prefix = new.split('_')[0]
    categories[prefix] = categories.get(prefix, 0) + 1

print("\n=== Rename categories ===")
for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
    print(f"  {cat}: {count}")

# Show some examples
print("\n=== Sample renames (first 40) ===")
for old, new in sorted(renames.items())[:40]:
    print(f"  {old} -> {new}")
