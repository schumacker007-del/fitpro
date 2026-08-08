#!/usr/bin/env bash
# Re-encode exercise demo MP4s for smaller IPA (requires ffmpeg: brew install ffmpeg).
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Install ffmpeg first: brew install ffmpeg"
  exit 1
fi

compress_dir() {
  local dir="$1"
  echo "Compressing $dir ..."
  find "$dir" -name '*.mp4' -print0 | while IFS= read -r -d '' f; do
    tmp="${f%.mp4}.tmp.mp4"
    ffmpeg -y -i "$f" \
      -vf "scale='min(720,iw)':-2" \
      -c:v libx264 -preset slow -crf 28 \
      -an -movflags +faststart \
      "$tmp" 2>/dev/null
    mv "$tmp" "$f"
  done
  du -sh "$dir"
}

compress_dir "assets/videos/guifit"
compress_dir "assets/videos/feed"
# chest/*.mp4 referenced in exerciseVideoSources.ts
for f in assets/videos/chest/*.mp4; do
  [[ -f "$f" ]] || continue
  tmp="${f%.mp4}.tmp.mp4"
  ffmpeg -y -i "$f" -vf "scale='min(720,iw)':-2" -c:v libx264 -preset slow -crf 28 -an -movflags +faststart "$tmp" 2>/dev/null
  mv "$tmp" "$f"
done

echo "Done. Run: du -sh assets/videos"
