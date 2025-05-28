#!/usr/bin/bash -eu

shopt -s globstar nullglob

for image in upload/**/*.converted; do
  rm $image
done

