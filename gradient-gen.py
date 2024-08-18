import os
from Pylette import extract_colors
import json

i=0

def rgb_to_css(rgb):
    return f"rgb({rgb[0]}, {rgb[1]}, {rgb[2]})"
images = os.listdir("images/posters")
images.sort()
for image in images:
    print(image)
    if os.path.isfile("images/posters/" + image):
        palette = extract_colors(image=("images/posters/" + image), palette_size=5, sort_mode='frequency')
        sorted_palette = sorted(palette, key=lambda color: color.luminance)
        # for color in sorted_palette:
        #     rgb = list(color.get_colors('rgb'))
            # print(rgb)
        gradient_colors = [rgb_to_css(color.get_colors('rgb')) for color in sorted_palette]
        if i % 2 == 0: #if even
            gradient_colors.reverse()
        print(json.dumps(gradient_colors))
        # print(f"linear-gradient(to right, {', '.join(gradient_colors)})")
        i+=1
        # palette.display()