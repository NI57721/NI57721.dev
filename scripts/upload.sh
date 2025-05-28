#!/usr/bin/bash -eu

shopt -s globstar

for image in upload/**/*.jpg; do
  echo jpg: $image
  magick logo: -resize '100x200>' wiz3.png
  exiftool -overwrite_original -recurse -all= *
done

for image in upload/**/*.{png,gif}; do
  echo other image: $image
done

# for jpg jI#
# rclone copy upload ni:

