#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="$ROOT_DIR/dist"
UUID="per-monitor-alttab@ss38230119.github.io"
ZIP_PATH="$OUT_DIR/$UUID.shell-extension.zip"

mkdir -p "$OUT_DIR"
gnome-extensions pack "$ROOT_DIR" --force --out-dir="$OUT_DIR"

echo "Built: $ZIP_PATH"
unzip -l "$ZIP_PATH"

if [ "${1:-}" = "--install" ]; then
  gnome-extensions install --force "$ZIP_PATH"
  echo "Installed locally. Reload GNOME Shell to apply changes."
fi
