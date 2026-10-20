#!/usr/bin/env bash
# Aplica la configuración de nginx del repositorio (con copia de seguridad y vuelta atrás si falla).
# Ejecutar en la VPS, desde /root/portfolio-new:   ./deploy/aplicar-nginx.sh
set -euo pipefail
cd "$(dirname "$0")/.."
[ -d /etc/letsencrypt/live/veltaweb.com.ar ] || { echo "Falta el certificado. Primero: certbot --nginx -d veltaweb.com.ar -d www.veltaweb.com.ar"; exit 1; }
mkdir -p /var/www/certbot
BK="/root/nginx-backup-$(date +%Y%m%d-%H%M%S)"; mkdir -p "$BK"
cp -a /etc/nginx/conf.d/velta.conf "$BK/" 2>/dev/null || true
cp -a /etc/nginx/snippets/velta-*.conf "$BK/" 2>/dev/null || true
cp deploy/snippets/velta-headers.conf deploy/snippets/velta-page.conf /etc/nginx/snippets/
cp deploy/nginx.conf /etc/nginx/conf.d/velta.conf
if nginx -t; then systemctl reload nginx && echo "nginx actualizado. Copia de seguridad en $BK"
else
  echo "Configuración inválida: se restaura la anterior"
  cp -a "$BK/velta.conf" /etc/nginx/conf.d/velta.conf 2>/dev/null || true
  cp -a "$BK"/velta-*.conf /etc/nginx/snippets/ 2>/dev/null || true
  nginx -t && systemctl reload nginx; exit 1
fi
