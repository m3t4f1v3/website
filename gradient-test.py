import cv2
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
import json

def filter_by_saturation_and_luminance(
    image, saturation_threshold=0.5, luminance_threshold=0.5
):
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    yuv_image = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)

    # Separate the channels
    saturation = hsv_image[:, :, 1]
    luminance = yuv_image[:, :, 0]

    # Create masks for saturation and luminance
    _, saturation_mask = cv2.threshold(
        saturation, saturation_threshold * 255, 255, cv2.THRESH_BINARY
    )
    _, luminance_mask = cv2.threshold(
        luminance, luminance_threshold * 255, 255, cv2.THRESH_BINARY
    )

    # Combine masks
    combined_mask = cv2.bitwise_and(saturation_mask, luminance_mask)

    # Apply the combined mask to the original image
    filtered_image = cv2.bitwise_and(image, image, mask=combined_mask)

    return filtered_image


def get_dominant_colors(image, num_colors):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = image.reshape((image.shape[0] * image.shape[1], 3))
    image = image[~np.all(image == [0, 0, 0], axis=1)]  # Remove black pixels (if any)

    if len(image) == 0:
        return np.array([[0, 0, 0]])  # Return a default color if no pixels remain

    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(image)
    colors = kmeans.cluster_centers_
    return colors


def create_gradient(colors):
    colors = colors / 255.0  # Normalize to [0, 1]
    cmap = LinearSegmentedColormap.from_list("custom_gradient", colors)
    height, width = 100, 256
    gradient = np.linspace(0, 1, width)
    gradient = np.vstack((gradient, gradient))
    plt.imshow(gradient, aspect="auto", cmap=cmap)
    plt.axis("off")
    plt.show()


def show_image(image, title="Image"):
    # Convert BGR to RGB for displaying with Matplotlib
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    plt.imshow(image_rgb)
    plt.title(title)
    plt.axis("off")
    plt.show()


# Load and process the image
image_path = "images/posters/all-about-lily-chou-chou.jpg"
image = cv2.imread(image_path)

if image is None:
    raise ValueError(f"Image not found or cannot be loaded: {image_path}")

# Filter out low saturation and low luminance colors
filtered_image = filter_by_saturation_and_luminance(
    image, saturation_threshold=0.5, luminance_threshold=0.3
)

# Show the filtered image
show_image(filtered_image, title="Filtered Image")

# Extract dominant colors from the filtered image
dominant_colors = get_dominant_colors(filtered_image, num_colors=2)

css_entries = []
# print(dominant_colors)
for color in dominant_colors:
    color_str = ', '.join(f"{int(c)}" for c in color)
    css_entries.append(f"rgb({color_str})")

print(json.dumps(css_entries))

# Create and display the gradient
create_gradient(dominant_colors)
