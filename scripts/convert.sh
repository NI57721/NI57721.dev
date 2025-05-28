#!/usr/bin/bash -eu

shopt -s globstar

for file in upload/**/*; do
  exiftool -overwrite_original -recurse -all= $file
  case "$file" in
    *.jpg | *.jpeg | *.png | *.gif | *.avif)
      magick -resize '820>' $file $file.converted
      exiftool -overwrite_original -recurse -all= $file
      echo $file
      ;;
    *.png | *.gif | *.avif)
      echo "png|gif|avif: $file"
      ;;
    *)
      echo other: $file
      ;;
  esac
done

