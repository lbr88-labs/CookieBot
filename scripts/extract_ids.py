import re
import json

file_path = 'src/Game.js'

with open(file_path, 'r') as f:
    content = f.read()

obj_id = 0
upg_id = 0
ach_id = 0

objects = {}
upgrades = {}
achievements = {}

# Helper to find tiers
tiers = {}
# Game.Tiers definition usually looks like: Game.Tiers=[{name:'Plain',...}, ...]
# But in the file it might be defined differently.
# Let's look for Game.Tiers definitions.
# Based on reading, it seems Game.Tiers is initialized and then populated?
# Or maybe defined as an array of objects.
# Let's assume standard tier names for now or try to extract them.
# Searching for "Game.Tiers={" or "Game.Tiers=["
# Actually, let's just look for where they are used in NewUnshackleUpgradeTier.
# The code uses Game.Tiers[obj.tier].name.
# We can try to find the definition of Game.Tiers.

# Let's extract everything in order.

lines = content.split('\n')

# We need to track the order of execution.
# We will iterate through the file and match patterns.

# Patterns
p_object = re.compile(r"new Game\.Object\('([^']+)',\s*'([^']+)'")
p_upgrade = re.compile(r"new Game\.Upgrade\('([^']+)'")
p_tiered_upgrade = re.compile(r"Game\.TieredUpgrade\('([^']+)'")
p_upgrade_cookie = re.compile(r"Game\.NewUpgradeCookie\(\{ name: '([^']+)'")
p_grandma_synergy = re.compile(r"Game\.GrandmaSynergy\('([^']+)'")
p_synergy_upgrade = re.compile(r"Game\.SynergyUpgrade\('([^']+)'")
p_unshackle_tier = re.compile(r"Game\.NewUnshackleUpgradeTier\(\{ tier: (\d+)")
p_unshackle_building = re.compile(r"Game\.NewUnshackleBuilding\(\{ building: '([^']+)'")

p_achievement = re.compile(r"new Game\.Achievement\('([^']+)'")
p_tiered_achievement = re.compile(r"Game\.TieredAchievement\('([^']+)'")
p_production_achievement = re.compile(r"Game\.ProductionAchievement\('([^']+)'")
p_bank_achievement = re.compile(r"Game\.BankAchievement\('([^']+)'")
p_cps_achievement = re.compile(r"Game\.CpsAchievement\('([^']+)'")

# Tier names mapping (based on Game.js reading or standard knowledge)
# We saw them in the file reading:
# 1: Plain (implied by 'Unshackled flavor')
# 2: Berrylium
# 3: Blueberrylium
# 4: Chalcedhoney
# 5: Buttergold
# 6: Sugarmuck
# 7: Jetmint
# 8: Cherrysilver
# 9: Hazelrald
# 10: Mooncandy
# 11: Astrofudge
# 12: Alabascream
# 13: Iridyum
# 14: Glucosmium
# 15: Glimmeringue (Found in line 10800 read)

tier_names = {
    1: 'flavor', # Special case in code: 'Unshackled flavor'
    2: 'berrylium',
    3: 'blueberrylium',
    4: 'chalcedhoney',
    5: 'buttergold',
    6: 'sugarmuck',
    7: 'jetmint',
    8: 'cherrysilver',
    9: 'hazelrald',
    10: 'mooncandy',
    11: 'astrofudge',
    12: 'alabascream',
    13: 'iridyum',
    14: 'glucosmium',
    15: 'glimmeringue'
}

# Building plurals mapping
building_plurals = {}

for line in lines:
    # Objects
    m = p_object.search(line)
    if m:
        name = m.group(1)
        common_name = m.group(2)
        plural = common_name.split('|')[1]
        building_plurals[name] = plural
        objects[name] = obj_id
        obj_id += 1
        continue

    # Upgrades
    name = None
    
    m = p_upgrade.search(line)
    if m: name = m.group(1)
    
    if not name:
        m = p_tiered_upgrade.search(line)
        if m: name = m.group(1)
        
    if not name:
        m = p_upgrade_cookie.search(line)
        if m: name = m.group(1)
        
    if not name:
        m = p_grandma_synergy.search(line)
        if m: name = m.group(1)
        
    if not name:
        m = p_synergy_upgrade.search(line)
        if m: name = m.group(1)
        
    if not name:
        m = p_unshackle_tier.search(line)
        if m:
            tier = int(m.group(1))
            if tier == 1:
                name = 'Unshackled flavor'
            else:
                tname = tier_names.get(tier, f"Tier {tier}")
                name = f"Unshackled {tname}"
    
    if not name:
        m = p_unshackle_building.search(line)
        if m:
            bname = m.group(1)
            plural = building_plurals.get(bname, bname + "s")
            name = f"Unshackled {plural}"

    if name:
        upgrades[name] = upg_id
        upg_id += 1
        continue

    # Achievements
    ach_name = None
    
    m = p_achievement.search(line)
    if m: ach_name = m.group(1)
    
    if not ach_name:
        m = p_tiered_achievement.search(line)
        if m: ach_name = m.group(1)
        
    if not ach_name:
        m = p_production_achievement.search(line)
        if m: ach_name = m.group(1)
        
    if not ach_name:
        m = p_bank_achievement.search(line)
        if m: ach_name = m.group(1)
        
    if not ach_name:
        m = p_cps_achievement.search(line)
        if m: ach_name = m.group(1)
        
    if ach_name:
        achievements[ach_name] = ach_id
        ach_id += 1
        continue

# Output results
print("BUILDING_IDS = " + json.dumps(objects, indent=2))
print("UPGRADE_IDS = " + json.dumps(upgrades, indent=2))
print("ACHIEVEMENT_IDS = " + json.dumps(achievements, indent=2))
