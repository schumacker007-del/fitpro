#!/usr/bin/env bash
set -euo pipefail

export EXPO_NO_REDIRECT_PAGE=1
export EXPO_NO_WEB_SETUP=1

PORT=8082
LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

echo ""
echo "=================================================="
echo " FitPro — use no CELULAR com Expo Go"
echo " Escaneie o QR code NOVO (não use link antigo)."
echo "=================================================="
if [[ -n "${LAN_IP}" ]]; then
  echo " URL no celular: exp://${LAN_IP}:${PORT}"
  echo " (se o IP mudou, escaneie de novo — não use .6 se o Mac é .9)"
else
  echo " Não foi possível detectar o IP local. Use o QR code do terminal."
fi
echo ""
echo " Mesma Wi-Fi no Mac e no iPhone. Se falhar: npm start -- --tunnel"
echo "=================================================="
echo ""

exec npx expo start --port "${PORT}" --host lan "$@"
