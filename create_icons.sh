#!/bin/bash

# This script creates PNG icons at different sizes from our SVG file
# For a real extension, you'd want to use a proper design tool to create optimized icons

echo "Creating placeholder PNG icons..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is required but not installed."
    echo "Please install ImageMagick first:"
    echo "  brew install imagemagick"
    exit 1
fi

# Create icons at different sizes
convert -background none -size 16x16 images/icon.svg images/icon16.png
convert -background none -size 32x32 images/icon.svg images/icon32.png
convert -background none -size 48x48 images/icon.svg images/icon48.png
convert -background none -size 128x128 images/icon.svg images/icon128.png

echo "Icons created successfully."
