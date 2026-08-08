#!/usr/bin/env bash
# Resize pose fallbacks for ExerciseAnimation (list thumbnails + no-video fallback).
# Typical savings: ~200MB (PNG ~1MB each → JPEG ~15–25KB at 512px).
set -euo pipefail
cd "$(dirname "$0")/.."

POSE_DIR="assets/poses"
MAX_PX=512
QUALITY=80

if [[ ! -d "$POSE_DIR" ]]; then
  echo "Missing $POSE_DIR"
  exit 1
fi

count=0
for png in "$POSE_DIR"/*.png; do
  [[ -f "$png" ]] || continue
  base=$(basename "$png" .png)
  jpg="$POSE_DIR/$base.jpg"
  sips -Z "$MAX_PX" -s format jpeg -s formatOptions "$QUALITY" "$png" --out "$jpg" >/dev/null
  rm "$png"
  count=$((count + 1))
done

echo "Optimized $count pose images → ${POSE_DIR}/*.jpg (${MAX_PX}px, quality ${QUALITY})"
du -sh "$POSE_DIR"
