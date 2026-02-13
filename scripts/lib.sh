#!/usr/bin/env bash

die() {
  echo "ERROR: $*" >&2
  exit 1
}

require_command() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || die "required command not found: ${cmd}"
}

require_dir() {
  local dir="$1"
  [[ -d "$dir" ]] || die "directory not found: $dir"
}
