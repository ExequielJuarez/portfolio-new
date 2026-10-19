#!/usr/bin/env bash
# Publica SOLO los archivos del sitio en la VPS (no sube src/, package.json, .git, deploy/, etc.)
# Uso: ./deploy/publicar.sh usuario@IP-DEL-VPS
set -euo pipefail
DESTINO="${1:?Uso: $0 usuario@IP}"
cd "$(dirname "$0")/.."
rsync -avz --delete --chmod=D755,F644 \
  --include='/index.html' --include='/css/***' --include='/js/***' \
  --include='/assets/***' --include='/demos/***' --include='/robots.txt' \
  --exclude='*' \
  ./ "$DESTINO:/var/www/velta/"
echo "Listo. Probá: https://TU-DOMINIO.com"
