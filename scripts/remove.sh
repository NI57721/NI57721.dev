#!/usr/bin/bash -eu

shopt -s globstar

for image in upload/**/*.convert; do
  rm $image
done

