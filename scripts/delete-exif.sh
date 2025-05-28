#!/usr/bin/bash -eu

shopt -s globstar nullglob

for file in upload/**/*; do
  exiftool -overwrite_original -recurse -all= $file 2>/dev/null >/dev/null || true
done

