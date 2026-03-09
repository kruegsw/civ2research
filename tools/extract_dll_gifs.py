#!/usr/bin/env python3
"""
Extract GIF resources from Windows PE DLLs by scanning for GIF magic bytes
and parsing GIF block structure to find exact boundaries.

Targets:
  - Tiles.dll resource #90: 530x480 Civ2 seal medallion -> seal.gif
  - Intro.dll resource #901: 376x227 satellite map preview -> map-preview.gif
"""

import struct
import sys
import os
from io import BytesIO

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("Warning: Pillow not available, will use manual dimension check")


def parse_gif_length(data, offset):
    """
    Parse a GIF starting at `offset` in `data`, walking the block structure
    to find the trailer byte (0x3B). Returns the length of the GIF in bytes,
    or None if parsing fails.

    GIF structure:
      Header (6 bytes): "GIF89a" or "GIF87a"
      Logical Screen Descriptor (7 bytes)
      [Global Color Table] (if flag set)
      Blocks...:
        0x21 = Extension block
        0x2C = Image descriptor
        0x3B = Trailer (end of GIF)
    """
    if offset + 13 > len(data):
        return None

    # Check magic
    magic = data[offset:offset + 6]
    if magic not in (b'GIF89a', b'GIF87a'):
        return None

    pos = offset + 6

    # Logical Screen Descriptor: 7 bytes
    if pos + 7 > len(data):
        return None
    width = struct.unpack_from('<H', data, pos)[0]
    height = struct.unpack_from('<H', data, pos + 2)[0]
    packed = data[pos + 4]
    pos += 7

    # Global Color Table
    has_gct = (packed >> 7) & 1
    if has_gct:
        gct_size = 3 * (1 << ((packed & 0x07) + 1))
        pos += gct_size
        if pos > len(data):
            return None

    # Walk blocks
    max_pos = min(len(data), offset + 20_000_000)  # 20MB safety limit
    while pos < max_pos:
        if pos >= len(data):
            return None

        block_type = data[pos]

        if block_type == 0x3B:
            # Trailer - end of GIF
            return (pos + 1) - offset

        elif block_type == 0x21:
            # Extension block
            if pos + 2 >= len(data):
                return None
            pos += 2  # skip 0x21 + extension label

            # Skip sub-blocks
            while pos < max_pos:
                if pos >= len(data):
                    return None
                sub_size = data[pos]
                pos += 1
                if sub_size == 0:
                    break
                pos += sub_size
                if pos > len(data):
                    return None

        elif block_type == 0x2C:
            # Image descriptor: 10 bytes total (1 sentinel + 9 data)
            if pos + 10 > len(data):
                return None
            img_packed = data[pos + 9]
            pos += 10

            # Local Color Table
            has_lct = (img_packed >> 7) & 1
            if has_lct:
                lct_size = 3 * (1 << ((img_packed & 0x07) + 1))
                pos += lct_size
                if pos > len(data):
                    return None

            # LZW minimum code size
            if pos >= len(data):
                return None
            pos += 1  # skip LZW min code size byte

            # Skip sub-blocks (image data)
            while pos < max_pos:
                if pos >= len(data):
                    return None
                sub_size = data[pos]
                pos += 1
                if sub_size == 0:
                    break
                pos += sub_size
                if pos > len(data):
                    return None

        elif block_type == 0x00:
            # Padding / filler byte - skip
            pos += 1

        else:
            # Unknown block type - GIF is probably malformed or we're lost
            return None

    return None


def get_gif_dimensions(data, offset):
    """Read width and height from GIF header at offset."""
    if offset + 10 > len(data):
        return None, None
    w = struct.unpack_from('<H', data, offset + 6)[0]
    h = struct.unpack_from('<H', data, offset + 8)[0]
    return w, h


def find_gifs_in_file(filepath):
    """Find all GIFs in a binary file by scanning for magic bytes."""
    print(f"\nScanning: {filepath}")
    print(f"  File size: {os.path.getsize(filepath):,} bytes")

    with open(filepath, 'rb') as f:
        data = f.read()

    results = []
    search_pos = 0

    while True:
        # Find next GIF magic
        idx89 = data.find(b'GIF89a', search_pos)
        idx87 = data.find(b'GIF87a', search_pos)

        candidates = [x for x in [idx89, idx87] if x != -1]
        if not candidates:
            break

        idx = min(candidates)
        version = data[idx:idx + 6].decode('ascii')
        w, h = get_gif_dimensions(data, idx)

        gif_len = parse_gif_length(data, idx)

        if gif_len is not None:
            gif_data = data[idx:idx + gif_len]

            # Validate with Pillow if available
            valid = True
            pil_size = None
            if HAS_PIL:
                try:
                    img = Image.open(BytesIO(gif_data))
                    img.load()
                    pil_size = img.size
                    valid = True
                except Exception as e:
                    valid = False
                    print(f"  [offset 0x{idx:08X}] {version} {w}x{h} - Pillow rejected: {e}")

            if valid:
                actual_w, actual_h = pil_size if pil_size else (w, h)
                print(f"  [offset 0x{idx:08X}] {version} {actual_w}x{actual_h}, {gif_len:,} bytes - OK")
                results.append({
                    'offset': idx,
                    'width': actual_w,
                    'height': actual_h,
                    'length': gif_len,
                    'data': gif_data,
                    'version': version,
                })
        else:
            print(f"  [offset 0x{idx:08X}] {version} {w}x{h} - could not parse GIF structure")

        search_pos = idx + 6  # move past this magic to find the next

    print(f"  Found {len(results)} valid GIF(s)")
    return results


def main():
    base_dir = "/home/kruegsw/Games/Civilization II Multiplayer Gold Edition"
    output_dir = "/home/kruegsw/Code/civ2research/charlizationv3/public/assets/menu"

    os.makedirs(output_dir, exist_ok=True)

    # --- Tiles.dll: looking for 530x480 seal ---
    tiles_path = os.path.join(base_dir, "Tiles.dll")
    tiles_gifs = find_gifs_in_file(tiles_path)

    seal_gif = None
    for g in tiles_gifs:
        if g['width'] == 530 and g['height'] == 480:
            seal_gif = g
            break

    if seal_gif:
        out_path = os.path.join(output_dir, "seal.gif")
        with open(out_path, 'wb') as f:
            f.write(seal_gif['data'])
        print(f"\n  -> Saved seal.gif ({seal_gif['width']}x{seal_gif['height']}, {seal_gif['length']:,} bytes)")
        print(f"     {out_path}")
    else:
        print("\n  WARNING: Could not find 530x480 GIF in Tiles.dll!")
        print("  Available dimensions:")
        for g in tiles_gifs:
            print(f"    {g['width']}x{g['height']} at offset 0x{g['offset']:08X}")

    # --- Intro.dll: looking for 376x227 map preview ---
    intro_path = os.path.join(base_dir, "Intro.dll")
    intro_gifs = find_gifs_in_file(intro_path)

    map_gif = None
    for g in intro_gifs:
        if g['width'] == 376 and g['height'] == 227:
            map_gif = g
            break

    if map_gif:
        out_path = os.path.join(output_dir, "map-preview.gif")
        with open(out_path, 'wb') as f:
            f.write(map_gif['data'])
        print(f"\n  -> Saved map-preview.gif ({map_gif['width']}x{map_gif['height']}, {map_gif['length']:,} bytes)")
        print(f"     {out_path}")
    else:
        print("\n  WARNING: Could not find 376x227 GIF in Intro.dll!")
        print("  Available dimensions:")
        for g in intro_gifs:
            print(f"    {g['width']}x{g['height']} at offset 0x{g['offset']:08X}")

    # Summary
    print("\n=== Summary ===")
    if seal_gif and map_gif:
        print("Both GIFs extracted successfully!")
    elif seal_gif:
        print("seal.gif extracted, map-preview.gif MISSING")
    elif map_gif:
        print("map-preview.gif extracted, seal.gif MISSING")
    else:
        print("Neither GIF found - check dimensions")


if __name__ == '__main__':
    main()
