#!/usr/bin/bash -eu

shopt -s globstar nullglob

for file in upload/**/*; do
  case "${file,,}" in
    *.jpg | *.jpeg | *.png | *.gif | *.avif)
      magick $file -quality 60% -resize '820>' ${file%.*}.avif.converted.avif
      mv ${file%.*}.avif.converted{.avif,}
      ;;
  esac
done

