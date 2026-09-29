import json
import re
import os

# Load extracted IDs
# Assuming script is run from root
ids_path = 'scripts/ids.json'
if not os.path.exists(ids_path):
    # Fallback if run from scripts dir
    ids_path = 'ids.json'

with open(ids_path, 'r') as f:
    exec(f.read())

# Helper to sanitize keys
def sanitize_key(name):
    # Replace special chars
    name = name.replace('&eacute;', 'E')
    name = name.replace('&agrave;', 'A')
    name = name.replace('&ccedil;', 'C')
    name = name.replace('&ouml;', 'O')
    name = name.replace('&uuml;', 'U')
    name = name.replace('&ntilde;', 'N')
    name = name.replace('&#39;', "'")
    
    # Remove anything that is not a letter, number or space
    name = re.sub(r'[^a-zA-Z0-9\s]', '', name)
    # Replace spaces with underscores
    name = re.sub(r'\s+', '_', name)
    # Uppercase
    name = name.upper()
    # Ensure it starts with a letter or underscore
    if not name:
        return "UNKNOWN"
    if not name[0].isalpha() and name[0] != '_':
        name = '_' + name
    return name

def generate_ts_object(name, data):
    lines = [f"export const {name} = {{"]
    # Sort by ID
    sorted_items = sorted(data.items(), key=lambda item: item[1])
    for key, value in sorted_items:
        ts_key = sanitize_key(key)
        # Escape single quotes in comment
        comment = key.replace("'", "\\'")
        lines.append(f"  {ts_key}: {value}, // {comment}")
    lines.append("} as const;")
    return "\n".join(lines)

# Read original file
target_file = 'src/constants/gameIds.ts'
# Adjust path if running from scripts dir
if not os.path.exists(target_file) and os.path.exists('../src/constants/gameIds.ts'):
    target_file = '../src/constants/gameIds.ts'

with open(target_file, 'r') as f:
    original_content = f.read()

def replace_block(content, block_name, new_content):
    pattern = re.compile(f"export const {block_name} = {{.*?}} as const;", re.DOTALL)
    return pattern.sub(new_content, content)

new_building_ids = generate_ts_object("BUILDING_IDS", BUILDING_IDS)
new_upgrade_ids = generate_ts_object("UPGRADE_IDS", UPGRADE_IDS)
new_achievement_ids = generate_ts_object("ACHIEVEMENT_IDS", ACHIEVEMENT_IDS)

# Generate BUILDING_NAMES
def generate_building_names():
    lines = ["export const BUILDING_NAMES = {"]
    items = []
    for name, id in BUILDING_IDS.items():
        key = sanitize_key(name)
        items.append((id, key, name))
    items.sort()
    
    for _, key, name in items:
        lines.append(f"  {key}: '{name}',")
    lines.append("} as const;")
    return "\n".join(lines)

new_building_names = generate_building_names()

content = original_content
content = replace_block(content, "ACHIEVEMENT_IDS", new_achievement_ids)
content = replace_block(content, "UPGRADE_IDS", new_upgrade_ids)
content = replace_block(content, "BUILDING_IDS", new_building_ids)
content = replace_block(content, "BUILDING_NAMES", new_building_names)

# Write back to file
with open(target_file, 'w') as f:
    f.write(content)

print(f"Successfully updated {target_file}")
