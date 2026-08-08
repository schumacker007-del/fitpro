#!/bin/bash
# Processa vídeo de exercício: remove marca d'água Fitness Online e aplica FitPro suave.
# Uso: ./scripts/process-exercise-video.sh entrada.mp4 saida.mp4

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Uso: $0 <entrada.mp4> <saida.mp4>"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FFMPEG="${FFMPEG:-$ROOT/node_modules/ffmpeg-static/ffmpeg}"
FONT="${FONT:-/System/Library/Fonts/Supplemental/Arial Bold.ttf}"
IN="$1"
OUT="$2"

if [ ! -x "$FFMPEG" ]; then
  echo "ffmpeg-static não encontrado. Rode: npm install --no-save ffmpeg-static"
  exit 1
fi

"$FFMPEG" -y -i "$IN" -vf "
crop=448:405:16:58,
scale=480:-2,
split=3[base][bot][top];
[bot]crop=iw:88:0:ih-88,boxblur=20:10[b];
[top]crop=iw:78:0:0,boxblur=16:8[t];
[base][b]overlay=0:H-88[bt];
[bt][t]overlay=0:0,
drawbox=x=0:y=0:w=iw:h=78:color=white@0.94:t=fill,
drawtext=fontfile=${FONT}:text='FitPro':fontsize=14:fontcolor=0x0F9D69@0.22:x=w-text_w-14:y=28,
drawbox=x=0:y=ih-46:w=iw:h=46:color=white@0.94:t=fill,
drawtext=fontfile=${FONT}:text='FitPro':fontsize=16:fontcolor=0x0F9D69@0.22:x=(w-text_w)/2:y=h-30
" -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart -an -r 30 "$OUT"

echo "OK: $OUT"
