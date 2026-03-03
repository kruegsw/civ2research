"""Apply function renames to the working copy of decompiled files."""

import os, json, re

RE_DIR = r"C:\Users\stuar\Documents\Stu\Code\civ2research\reverse_engineering"
DECOMPILED_DIR = os.path.join(RE_DIR, "decompiled")
RENAME_MAP_PATH = os.path.join(RE_DIR, "rename_map.json")

with open(RENAME_MAP_PATH) as f:
    renames = json.load(f)

print(f"Loaded {len(renames)} renames")

# Also rename thunk_ variants
thunk_renames = {}
for old, new in renames.items():
    thunk_old = f"thunk_{old}"
    thunk_renames[thunk_old] = f"thunk_{new}"

all_renames = {**renames, **thunk_renames}
print(f"Total patterns (including thunks): {len(all_renames)}")

# Build a single regex for all renames (much faster than individual replacements)
# Sort by length (longest first) to avoid partial matches
sorted_old = sorted(all_renames.keys(), key=len, reverse=True)
pattern = re.compile(r'\b(' + '|'.join(re.escape(k) for k in sorted_old) + r')\b')

total_replacements = 0
files_modified = 0

for filename in sorted(os.listdir(DECOMPILED_DIR)):
    if not filename.endswith('.c') and filename != 'FUNCTION_INDEX.txt':
        continue

    filepath = os.path.join(DECOMPILED_DIR, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Count replacements
    count = len(pattern.findall(content))
    if count == 0:
        continue

    # Apply all renames
    new_content = pattern.sub(lambda m: all_renames[m.group(0)], content)

    with open(filepath, 'w') as f:
        f.write(new_content)

    total_replacements += count
    files_modified += 1
    print(f"  {filename}: {count} replacements")

print(f"\nDone! {total_replacements} replacements across {files_modified} files")
