#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib.sh"

shopt -s globstar nullglob

UPLOAD_DIR="${UPLOAD_DIR:-upload}"
REMOTE_NAME="${REMOTE_NAME:-ni}"
REMOTE_BASE="${REMOTE_BASE:-/}"

require_command rclone
require_dir "$UPLOAD_DIR"

[[ "$REMOTE_BASE" == /* ]] || die "REMOTE_BASE must start with '/': ${REMOTE_BASE}"

for file in "$UPLOAD_DIR"/**/*.converted; do
  [[ -f "$file" ]] || continue

  rel="${file#"$UPLOAD_DIR"/}"
  rel="${rel%.converted}"
  dest="${REMOTE_NAME}:${REMOTE_BASE}/${rel}"

  rclone copyto "$file" "$dest" || die "rclone copyto failed: ${src} -> ${dest}"
  echo "uploaded: ${file}"
done
