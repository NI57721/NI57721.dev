#!/usr/bin/bash -eu

shopt -s globstar nullglob

for image in upload/**/*.converted; do
  rclone copyto $image ni:$(echo $image | sed --expression "s!^upload/\(.*\).converted\$!/\1!g") &&
    echo $image is successfully uploaded!
done

