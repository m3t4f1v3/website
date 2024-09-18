# Python implementation of the JavaScript script to convert px values to vw in a CSS file.

import re

def convert_px_to_vw(css_content, viewport_width=1440):
    """
    Converts px values in CSS to vw based on the given viewport width.

    :param css_content: The content of the CSS file as a string.
    :param viewport_width: The width of the viewport to use for conversion.
    :return: The CSS content with px values converted to vw.
    """
    def replace_px(match):
        px_value = int(match.group(1))
        vw_value = (px_value / viewport_width) * 100
        return f'{vw_value:.2f}vw'

    # Use regular expression to find and replace all px values
    converted_css = re.sub(r'(\d+)px', replace_px, css_content)
    return converted_css


with open("styles/main.css", 'r') as file:
    css_content = file.read()


# Convert px to vw
    viewport_width = 1517
    converted_css = convert_px_to_vw(css_content, viewport_width)
    with open("styles/mainResponsive.css", "w") as output:
        output.write(converted_css)
