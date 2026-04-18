#!/usr/bin/env python3
"""Comprehensive live-game state verification."""
import struct
import sys

path = sys.argv[1]
with open(path, 'rb') as f: data = f.read()
rc = struct.unpack_from('<I', data, 8)[0]
off = 12; entries = []
for _ in range(rc):
    name = data[off:off+16].rstrip(b'\x00').decode('ascii')
    addr = struct.unpack_from('<I', data, off+16)[0]
    size = struct.unpack_from('<I', data, off+20)[0]
    entries.append((name, addr, size)); off += 24
data_off = off
regions = {}
for name, addr, size in entries:
    regions[name] = (addr, data[data_off:data_off+size])
    data_off += size

g = regions['globals'][1]
md = regions['map_dims'][1]
cv = regions['civs'][1]
ct = regions['cities'][1]
ut = regions['units'][1]
wd = regions['wonders'][1]
tl = regions['tiles'][1]

CIV_STRIDE = 0x594
CITY_STRIDE = 0x58
UNIT_STRIDE = 0x20
CIV_NAMES = ['Barbarians','Russians','Zulus','French','Egyptians','Americans','English','Indians']
GOV_NAMES = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy']
TERRAIN_NAMES = ['Desert','Plains','Grassland','Forest','Hills','Mountains','Tundra','Glacier','Swamp','Jungle','Ocean']
UNIT_NAMES = ['Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen',
    'Musketeers','Fanatics','Partisans','Alpine','Riflemen','Marines',
    'Paratroopers','Mech Inf','Horsemen','Chariot','Elephant','Crusaders',
    'Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery',
    'Howitzer','Fighter','Bomber','Helicopter','Stealth F','Stealth B',
    'Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer',
    'Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport',
    'Cruise Msl','Nuclear Msl','Diplomat','Spy','Caravan','Freight','Explorer']
TECH_NAMES = ['Advanced Flight','Alphabet','Amphibious War','Astronomy','Atomic Theory',
    'Automobile','Banking','Bridge Building','Bronze Working','Ceremonial Burial',
    'Chemistry','Chivalry','Code of Laws','Combined Arms','Combustion',
    'Communism','Computers','Conscription','Construction','The Corporation',
    'Currency','Democracy','Economics','Electricity','Electronics',
    'Engineering','Environmentalism','Espionage','Explosives','Feudalism',
    'Flight','Fundamentalism','Fusion Power','Genetic Engineering','Guerrilla War',
    'Gunpowder','Horseback Riding','Industrialization','Invention','Iron Working',
    'Labor Union','The Laser','Leadership','Literacy','Machine Tools',
    'Magnetism','Map Making','Masonry','Mathematics','Medicine',
    'Metallurgy','Mfg','Mobile Warfare','Monarchy','Monotheism',
    'Mysticism','Navigation','Nuclear Fission','Nuclear Power','Philosophy',
    'Physics','Plastics','Polytheism','Pottery','Radio',
    'Recycling','Refrigeration','Refining','Robotics','Rocketry',
    'Sanitation','Seafaring','Space Flight','Stealth','Steam Engine',
    'Steel','Superconductor','Tactics','Theology','Theory of Gravity',
    'Trade','University','Warrior Code','Wheel','Writing',
    'Future Tech','', '']
BUILDING_NAMES = ['Nothing','Palace','Barracks','Granary','Temple','MarketPlace','Library',
    'Courthouse','City Walls','Aqueduct','Bank','Cathedral','University',
    'Mass Transit','Colosseum','Factory','Mfg Plant','SDI Defense',
    'Recycling Ctr','Power Plant','Hydro Plant','Nuclear Plant','Stock Exchange',
    'Sewer System','Supermarket','Superhighways','Research Lab','SAM Battery',
    'Coastal Fort','Solar Plant','Harbor','Offshore Platform','Airport',
    'Police Station','Port Facility','SS Structural','SS Component','SS Module',
    'Capitalization',
    'Pyramids','Hanging Gardens','Colossus','Lighthouse','Great Library',
    'Oracle','Great Wall','Sun Tzu','King Richard','Marco Polo',
    'Michelangelo','Copernicus','Magellan','Shakespeare','Da Vinci',
    'J.S. Bach','Isaac Newton','Adam Smith','Darwin','Statue of Liberty',
    'Eiffel Tower','Women Suffrage','Hoover Dam','Manhattan Project',
    'United Nations','Apollo Program','SETI Program','Cure for Cancer']

def sec(title):
    print()
    print('=' * 70)
    print(f'  {title}')
    print('=' * 70)

# --------------------------------------------------------------------
sec('GLOBAL GAME STATE')
turn = struct.unpack_from('<H', g, 0x8)[0]
year_inc = struct.unpack_from('<H', g, 0xA)[0]
active_unit = struct.unpack_from('<h', g, 0xE)[0]
active_civ = g[0x13]   # 0x655B03 = activeHumanPlayer
rotating_civ = g[0x15] # 0x655B05 = currently-rotating civ
diff = g[0x18]         # 0x655B08 = difficulty
civs_alive = g[0x1A]
human_pl = g[0x1B]
global_warming = g[0x1F]
total_units = struct.unpack_from('<H', g, 0x26)[0]
total_cities = struct.unpack_from('<H', g, 0x28)[0]
print(f'Turn:           {turn}')
print(f'Year increment: {year_inc} (used in year calc)')
print(f'Difficulty:     {diff}  ({["Chieftain","Warlord","Prince","King","Emperor","Deity"][diff] if diff<6 else "?"})')
print(f'activeCiv:      {active_civ}  ({CIV_NAMES[active_civ] if active_civ < 8 else "?"})  — human\'s civ')
print(f'rotatingCiv:    {rotating_civ}  ({CIV_NAMES[rotating_civ] if rotating_civ < 8 else "?"})  — currently processing')
print(f'civsAlive:      0b{civs_alive:08b}  ({[CIV_NAMES[i] for i in range(8) if civs_alive & (1<<i)]})')
print(f'humanPlayers:   0b{human_pl:08b}  ({[CIV_NAMES[i] for i in range(8) if human_pl & (1<<i)]})')
print(f'globalWarming:  {global_warming}')
print(f'totalUnits:     {total_units}')
print(f'totalCities:    {total_cities}')

# --------------------------------------------------------------------
sec('MAP DIMENSIONS')
mw2 = struct.unpack_from('<H', md, 0)[0]
mh = struct.unpack_from('<H', md, 2)[0]
ms = struct.unpack_from('<H', md, 4)[0]
shape = struct.unpack_from('<H', md, 6)[0]
seed = struct.unpack_from('<I', md, 8)[0]
mw = mw2 // 2
print(f'width={mw} (doubled={mw2}), height={mh}, total squares={ms}')
print(f'shape={shape} (0=round/wrap, 1=flat)')
print(f'seed={seed}')
assert ms == mw * mh, f'Sanity: ms should be mw*mh, got {ms} != {mw}*{mh}'
print(f'Sanity: ms = mw * mh OK')

# --------------------------------------------------------------------
sec('ALL CIVS — state, rates, research, tech')
for slot in range(8):
    b = slot * CIV_STRIDE
    flags = struct.unpack_from('<H', cv, b + 0xA0)[0]
    treasury = struct.unpack_from('<i', cv, b + 0xA2)[0]
    research_prog = struct.unpack_from('<H', cv, b + 0xA8)[0]
    research_tech = cv[b + 0xAA]
    sci = cv[b + 0xB3]
    tax = cv[b + 0xB4]
    gov = cv[b + 0xB5]
    reputation = cv[b + 0xBE]
    # Tech bitmask at +0xF8, 12 bytes
    techs = []
    for i in range(96):
        if cv[b + 0xF8 + i//8] & (1 << (i%8)):
            tname = TECH_NAMES[i] if i < len(TECH_NAMES) else f'T{i}'
            techs.append(tname)
    alive = 'OK' if civs_alive & (1 << slot) else '--'
    human = '*human*' if human_pl & (1 << slot) else ''
    rtname = TECH_NAMES[research_tech] if research_tech < len(TECH_NAMES) and research_tech != 0xFF else ('none' if research_tech == 0xFF else f'T{research_tech}')
    print(f'  [{slot}] {CIV_NAMES[slot]:12s} alive={alive} {human}')
    print(f'      flags=0x{flags:04x}  treasury={treasury}  gov={GOV_NAMES[gov] if gov<7 else gov}')
    print(f'      sci={sci*10}% tax={tax*10}% lux={(10-sci-tax)*10}%  reputation={reputation}')
    print(f'      researching={rtname} (progress={research_prog})')
    print(f'      techs known: {techs if techs else "(none)"}')

# --------------------------------------------------------------------
sec('ALL CITIES — with full detail')
for ci in range(256):
    b = ci * CITY_STRIDE
    cid = struct.unpack_from('<i', ct, b + 0x54)[0]
    if cid == 0: continue
    x = struct.unpack_from('<H', ct, b)[0]
    y = struct.unpack_from('<H', ct, b + 2)[0]
    owner = ct[b + 8]
    size = ct[b + 9]
    name = ct[b+0x20:b+0x30].split(b'\x00')[0].decode('ascii', errors='replace')
    food_box = struct.unpack_from('<h', ct, b+0x1A)[0]
    shield_box = struct.unpack_from('<h', ct, b+0x1C)[0]
    trade_base = struct.unpack_from('<h', ct, b+0x1E)[0]
    prod_item = struct.unpack_from('<b', ct, b+0x39)[0]
    # Buildings
    bl = struct.unpack_from('<I', ct, b+0x34)[0]
    bh = ct[b+0x38]
    bld_bitmask = (bh << 32) | bl
    buildings = [BUILDING_NAMES[bit] for bit in range(1, 67) if bld_bitmask & (1 << bit) and bit < len(BUILDING_NAMES)]
    sci = struct.unpack_from('<h', ct, b+0x4A)[0]
    tax = struct.unpack_from('<h', ct, b+0x4C)[0]
    total_trade = struct.unpack_from('<h', ct, b+0x4E)[0]
    food_prod = struct.unpack_from('<b', ct, b+0x50)[0]
    shield_prod = struct.unpack_from('<B', ct, b+0x51)[0]
    happy = struct.unpack_from('<b', ct, b+0x52)[0]
    unhappy = struct.unpack_from('<b', ct, b+0x53)[0]
    if prod_item >= 0:
        prod_name = UNIT_NAMES[prod_item] if prod_item < len(UNIT_NAMES) else f'U{prod_item}'
    else:
        bidx = -prod_item - 1  # negative means building
        prod_name = BUILDING_NAMES[bidx] if 0 <= bidx < len(BUILDING_NAMES) else f'B{bidx}'
    print(f'  [{ci}] {name:14s} ({x:3d},{y:3d})  {CIV_NAMES[owner]:11s} size={size}')
    print(f'      producing={prod_name}  foodBox={food_box}/? shieldBox={shield_box}')
    print(f'      yields: food_prod={food_prod} shield_prod={shield_prod} total_trade={total_trade}')
    print(f'      split:  sci={sci} tax={tax}  (lux={total_trade-sci-tax})')
    print(f'      pop:    happy={happy} unhappy={unhappy} content={size-happy-unhappy}')
    print(f'      buildings: {buildings}')

# --------------------------------------------------------------------
sec('ALL UNITS — alive only')
for ui in range(total_units + 1):
    b = ui * UNIT_STRIDE
    uid = struct.unpack_from('<I', ut, b+0x1A)[0]
    if uid == 0: continue
    x = struct.unpack_from('<H', ut, b)[0]
    y = struct.unpack_from('<H', ut, b+2)[0]
    status = struct.unpack_from('<H', ut, b+4)[0]
    utype = ut[b+6]
    owner = ut[b+7]
    moves = ut[b+8]
    damage = ut[b+0xA]
    order = ut[b+0xF]
    goto_x = struct.unpack_from('<h', ut, b+0x12)[0]
    goto_y = struct.unpack_from('<h', ut, b+0x14)[0]
    veteran = 'VET' if status & 0x2000 else ''
    first_moved = 'moved' if status & 0x40 else 'fresh'
    ORDER_NAMES = {0:'o0',1:'fortify',2:'fortified',3:'sleep',4:'fort',5:'road',6:'irrigate',
        7:'mine',8:'transform',9:'cleanPoll',10:'airbase',11:'goto',27:'goto_ai',255:'none'}
    oname = ORDER_NAMES.get(order, f'o{order}')
    tname = UNIT_NAMES[utype] if utype < len(UNIT_NAMES) else f'T{utype}'
    print(f'  [{ui:2d}] id={uid}  {tname:10s} ({CIV_NAMES[owner]:11s}) at ({x:3d},{y:3d})  order={oname} {veteran} {first_moved}')
    if goto_x >= 0 or goto_y >= 0:
        print(f'         goto=({goto_x},{goto_y})')

# --------------------------------------------------------------------
sec('WONDERS')
wonder_names = BUILDING_NAMES[39:67]
any_built = False
for i in range(28):
    w = struct.unpack_from('<h', wd, i*2)[0]
    if w == -1: continue  # not built
    any_built = True
    # Find city with this seqId
    print(f'  {wonder_names[i]:20s} -> city seqId {w}')
if not any_built:
    print('  No wonders built yet')

# --------------------------------------------------------------------
sec('MAP: tiles visible to each civ')
for civ_slot in range(1, 8):
    if not (civs_alive & (1 << civ_slot)): continue
    bit = 1 << civ_slot
    count = sum(1 for i in range(ms) if tl[i*6 + 4] & bit)
    pct = 100 * count / ms
    print(f'  {CIV_NAMES[civ_slot]:11s}: {count}/{ms} tiles visible ({pct:.1f}%)')

# --------------------------------------------------------------------
sec('SANITY CHECKS')
issues = 0
# 1: exactly one Palace per alive (non-barb) civ
for civ_slot in range(1, 8):
    if not (civs_alive & (1 << civ_slot)): continue
    palace_cities = 0
    for ci in range(256):
        b = ci * CITY_STRIDE
        if struct.unpack_from('<i', ct, b+0x54)[0] == 0: continue
        if ct[b+8] != civ_slot: continue
        bl = struct.unpack_from('<I', ct, b+0x34)[0]
        if bl & 0x2:  # bit 1 = Palace
            palace_cities += 1
    # Note: it's possible some AI civs haven't founded yet, so 0 is OK if no cities
    # But if cities>0, expect exactly 1 palace
    owned_cities = sum(1 for ci in range(256)
                      if struct.unpack_from('<i', ct, ci*CITY_STRIDE + 0x54)[0] != 0
                      and ct[ci*CITY_STRIDE + 8] == civ_slot)
    if owned_cities > 0 and palace_cities != 1:
        print(f'  !!  {CIV_NAMES[civ_slot]}: has {owned_cities} cities but {palace_cities} palaces')
        issues += 1
    elif owned_cities == 0:
        print(f'  (info) {CIV_NAMES[civ_slot]}: has no cities yet — expected early game')
if issues == 0:
    print('  OK All civs with cities have exactly 1 Palace each')

# 2: totalUnits is "max-slot-used" not "alive count" — dead slots keep
#    their index. Valid check: no alive unit at index >= totalUnits.
alive_count = 0
max_alive_idx = -1
for ui in range(2048):
    b = ui * UNIT_STRIDE
    if b+0x20 > len(ut): break
    if struct.unpack_from('<I', ut, b+0x1A)[0] != 0:
        alive_count += 1
        max_alive_idx = ui
if max_alive_idx < total_units:
    print(f'  OK totalUnits={total_units} (next-slot marker); {alive_count} alive, max alive idx={max_alive_idx}')
else:
    print(f'  !!  alive unit at index {max_alive_idx} >= totalUnits ({total_units})')

# 3: totalCities matches alive city count
alive_cities = sum(1 for ci in range(256)
                   if struct.unpack_from('<i', ct, ci*CITY_STRIDE + 0x54)[0] != 0)
if alive_cities == total_cities:
    print(f'  OK totalCities field ({total_cities}) matches count of alive cities ({alive_cities})')
else:
    print(f'  !!  totalCities={total_cities} but found {alive_cities} alive cities')

# 4: sumOfCitySizes field per civ matches sum of city sizes
for civ_slot in range(1, 8):
    if not (civs_alive & (1 << civ_slot)): continue
    sum_size = sum(ct[ci*CITY_STRIDE+9] for ci in range(256)
                   if struct.unpack_from('<i', ct, ci*CITY_STRIDE + 0x54)[0] != 0
                   and ct[ci*CITY_STRIDE + 8] == civ_slot)
    civ_b = civ_slot * CIV_STRIDE
    recorded = struct.unpack_from('<H', cv, civ_b + 0x6C)[0]  # sumOfCitySizes at +0x108 in data block = +0x6C mem? let me verify
    # parser says sumOfCitySizes at data-block +108 (decimal) = +0x6C
    # memory offset = data-block offset + 0xA0 = 0x10C
    recorded = struct.unpack_from('<H', cv, civ_b + 0x10C)[0]
    marker = 'OK' if recorded == sum_size else '!!'
    print(f'  {marker} {CIV_NAMES[civ_slot]}: sumOfCitySizes field={recorded}, actual sum={sum_size}')
