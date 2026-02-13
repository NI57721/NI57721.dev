#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib.sh"

shopt -s globstar nullglob

UPLOAD_DIR="${UPLOAD_DIR:-upload}"
QUALITY="${QUALITY:-60}"
MAX_WIDTH="${MAX_WIDTH:-820}"

require_command magick
require_dir "$UPLOAD_DIR"

for file in "$UPLOAD_DIR"/**/*; do
  [[ -f "$file" ]] || continue

  case "${file,,}" in
    *.converted.avif) continue ;;
    *.jpg | *.jpeg | *.png | *.gif | *.avif)
      base="${file%.*}"
      out="${base}.avif.converted"

      magick "$file" \
        -quality "${QUALITY}%" \
        -resize "${MAX_WIDTH}>" \
        avif:"$out" \
        || die "conversion failed: $file"
      ;;
  esac
done
