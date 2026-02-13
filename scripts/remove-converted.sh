#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib.sh"

shopt -s globstar nullglob

UPLOAD_DIR="${UPLOAD_DIR:-upload}"
DRY_RUN="${DRY_RUN:-0}"

require_dir "$UPLOAD_DIR"

[[ "$UPLOAD_DIR" != "/" ]] || die "UPLOAD_DIR must not be /"
[[ "$UPLOAD_DIR" != "." ]] || die "UPLOAD_DIR must not be ."

# Remove legacy "*.converted" outputs
for f in "{$UPLOAD_DIR}"/**/*.converted; do
  [[ -f "$f" ]] || continue
  rm --force "$path"
done
