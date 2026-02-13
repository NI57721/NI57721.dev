#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib.sh"

shopt -s globstar nullglob

UPLOAD_DIR="${UPLOAD_DIR:-upload}"

require_command exiftool
require_dir "$UPLOAD_DIR"

for file in "$UPLOAD_DIR"/**/*; do
  [[ -f "$file" ]] || continue
  exiftool -overwrite_original -all= -- "$file" >/dev/null 2>&1 \
    || echo "warning: failed to strip EXIF: $file" >&2
done
