import re

def convert_transform_to_percentage(css_content, x_divisor=1517, y_divisor=731):
    """
    Converts translate3d(x, y, z) values in CSS to percentage based on given divisors.

    :param css_content: The content of the CSS file as a string.
    :param x_divisor: The value by which the x-coordinate will be divided.
    :param y_divisor: The value by which the y-coordinate will be divided.
    :return: The CSS content with translate3d values converted to percentages.
    """
    def replace_transform(match):
        x = float(match.group(1))
        y = float(match.group(2))
        z = float(match.group(3))

        x_percent = (x / x_divisor) * 100
        y_percent = (y / y_divisor) * 100

        return f'translate3d({x_percent:.2f}%, {y_percent:.2f}%, {z}px)'

    # Regular expression to match translate3d values
    converted_css = re.sub(
        r'translate3d\(([\d.]+)px, ([\d.]+)px, ([\d.]+)px\)',
        replace_transform,
        css_content
    )
    return converted_css

# Example usage
css_content = """
#eva01-head {
	transform: translate3d(147.234px, 212.335px, 0px);
}

#eva01-left-arm-cutoff {
	transform: translate3d(1354.46px, 925.036px, 0px);
}

#eva01-right-arm {
	transform: translate3d(545.841px, 981.193px, 0px);
	z-index: -1;
}

#eva01-shoulder-blade {
	transform: translate3d(874.256px, 30.9157px, 0px);
}

#eva01-torso {
	transform: translate3d(433.327px, 371.495px, 0px);
}
"""

# Convert px to percentage based on the specified divisors
converted_css = convert_transform_to_percentage(css_content, x_divisor=1517, y_divisor=731)
print(converted_css)
