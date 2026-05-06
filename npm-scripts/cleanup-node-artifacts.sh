#!/usr/bin/env bash
set -euo pipefail

# Recursively delete parent node_modules directories and *.zip/*.tgz files.
# Child node_modules directories are implicitly removed with their parent.
# Usage:
#   ./npm-scripts/cleanup-node-artifacts.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Scanning: $ROOT_DIR"

mapfile -d '' NODE_MODULES_DIRS < <(find "$ROOT_DIR" -type d -name node_modules -prune -print0)
mapfile -d '' ARCHIVE_FILES < <(find "$ROOT_DIR" -type f \( -name '*.zip' -o -name '*.tgz' \) -print0)

NODE_MODULES_COUNT="${#NODE_MODULES_DIRS[@]}"
ARCHIVE_COUNT="${#ARCHIVE_FILES[@]}"

echo "Found $NODE_MODULES_COUNT node_modules directories"
echo "Found $ARCHIVE_COUNT archive files (*.zip, *.tgz)"

for dir in "${NODE_MODULES_DIRS[@]}"; do
  rm -rf "$dir"
  echo "Deleted: $dir"
done

for file in "${ARCHIVE_FILES[@]}"; do
  rm -f "$file"
  echo "Deleted: $file"
done

echo "Cleanup complete"
