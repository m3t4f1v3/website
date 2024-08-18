import json

colors = '''
#33333c
#3a3a43
#45444d
#2c2d35
#545057
'''

print(json.dumps(colors.strip().split("\n")))