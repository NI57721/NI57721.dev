#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/lib.sh"

UPLOAD_DIR="${UPLOAD_DIR:-upload}"
REMOTE_NAME="${REMOTE_NAME:-ni}"
REMOTE_BASE="${REMOTE_BASE:-/}"

require_command rclone
require_dir "$UPLOAD_DIR"

[[ "$REMOTE_BASE" == /* ]] || die "REMOTE_BASE must start with '/': ${REMOTE_BASE}"

src="$UPLOAD_DIR"
dest="${REMOTE_NAME}:${REMOTE_BASE}/"

rclone copy "$UPLOAD_DIR" "$dest" || die "rclone copy failed: ${UPLOAD_DIR} -> ${dest}"
echo "uploaded: ${UPLOAD_DIR}"
