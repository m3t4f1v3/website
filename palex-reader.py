import os
import json

# Define the directory containing the theme files
base_dir = "/home/edward_wong/.config/palex/primary/"

# List all directories in the base directory
dirs = os.listdir(base_dir)

# Iterate over each directory
for dir_name in dirs:
    dir_path = os.path.join(base_dir, dir_name)
    
    # Check if it's a directory
    if os.path.isdir(dir_path):
        # Iterate over each theme
        for theme in ["light", "dark"]:
            file_path = os.path.join(dir_path, f"{theme}-theme.json")
            
            with open(file_path, 'r') as file:
                data = json.load(file)
                print(f"Data from {file_path}:")
                colors = []
                for key in list(data.keys())[:5]:
                    if key.startswith('color'):
                        colors.append(data[key])
                print(colors)