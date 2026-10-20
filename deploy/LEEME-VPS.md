# Publicar Velta Web en una VPS de forma segura

El portfolio es **solo HTML, CSS y JS**: no tiene servidor propio, base de datos ni formularios que guarden datos. Eso lo hace muy difícil de hackear. Lo que hay que cuidar es la VPS y la configuración del servidor web.

> Nadie puede garantizar seguridad total. Esto cierra lo importante y reduce mucho el riesgo.

## 1. Preparar la VPS (Ubuntu/Debian), una sola vez
```bash
# usuario propio, no root
adduser deploy && usermod -aG sudo deploy
# desde tu PC: ssh-copy-id deploy@IP   (clave SSH)

# firewall: solo SSH, web y https
sudo ufw default deny incoming && sudo ufw default allow outgoing
sudo ufw allow OpenSSH && sudo ufw allow 80,443/tcp && sudo ufw enable

# SSH solo con clave y sin root  (editar /etc/ssh/sshd_config)
#   PermitRootLogin no
#   PasswordAuthentication no
sudo systemctl restart ssh      # probá abrir OTRA sesión antes de cerrar la actual

# bloquea IPs que insisten con contraseñas, y actualizaciones automáticas
sudo apt update && sudo apt install -y nginx fail2ban unattended-upgrades certbot python3-certbot-nginx
sudo dpkg-reconfigure -plow unattended-upgrades
```
No instales MySQL, Node ni nada que no uses: cada servicio abierto es una puerta más. Revisá con `sudo ss -tlnp` que solo escuchen SSH (22) y nginx (80/443).

## 2. Configurar nginx
```bash
sudo mkdir -p /var/www/velta && sudo chown deploy:deploy /var/www/velta
sudo cp deploy/snippets/velta-headers.conf /etc/nginx/snippets/
sudo cp deploy/nginx.conf /etc/nginx/conf.d/velta.conf
sudo sed -i 's/TU-DOMINIO.com/tudominio.com/g' /etc/nginx/conf.d/velta.conf   # tu dominio real
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com      # HTTPS gratis + redirección
```
Lo que hace esa configuración:
- Publica **solo** `index.html`, `css/`, `js/`, `assets/` y `demos/`. Todo lo demás (`src/`, `package.json`, `.git`, `deploy/`, archivos ocultos) responde 404.
- Solo acepta GET/HEAD (el resto da 405).
- Límite de pedidos y conexiones por IP, y timeouts cortos contra ataques lentos.
- Cabeceras de seguridad: CSP, HSTS, anti-clickjacking, nosniff, etc. Las demos solo se pueden enmarcar desde tu propio sitio y no pueden enviar formularios.

## 2b. Ya con HTTPS: actualizar nginx sin romper el certificado
`deploy/nginx.conf` ya viene listo para `veltaweb.com.ar` con HTTPS, redirección de `http` a `https`, de `www` a la dirección sin `www`, y las rutas permitidas (incluidas las páginas de servicio y el sitemap). Después de emitir el certificado con certbot, se aplica con:
```bash
cd /root/portfolio-new && git pull && ./deploy/aplicar-nginx.sh
```
El script hace copia de seguridad en `/root/nginx-backup-...`, valida la configuración y, si algo falla, vuelve a la anterior.

## 3. Subir el sitio
```bash
./deploy/publicar.sh deploy@IP-DEL-VPS
```
Si publicás desde la propia VPS (clonando el repositorio), usá el `rsync` local que figura en la conversación de despliegue; la lista de archivos permitidos es la misma: `index.html`, `css/`, `js/`, `assets/`, `demos/`, las 4 carpetas de servicios, `robots.txt` y `sitemap.xml`.
El script copia solo los archivos del sitio, con permisos de solo lectura.

## 4. Contra caídas por ataques de tráfico (DDoS)
Un firewall en la VPS no alcanza contra un ataque grande. Lo más efectivo y gratis: poner el dominio detrás de **Cloudflare** (plan gratuito) con el proxy activado (nube naranja) y SSL en modo "Full (strict)". Después, en el firewall de la VPS podés permitir 80/443 solo desde las IP de Cloudflare.

## 5. Mantenimiento
- Hacé un snapshot/backup de la VPS desde el panel del proveedor.
- `sudo apt update && sudo apt upgrade` cada tanto (las de seguridad ya son automáticas).
- Revisá accesos raros: `sudo tail /var/log/nginx/access.log` y `sudo fail2ban-client status sshd`.

## 6. Limpieza recomendada del repositorio
`src/`, `package.json`, `package-lock.json` y `.sequelizerc` son restos de un backend que este portfolio no usa y no se publican. Podés borrarlos del repo para evitar confusiones. Si algún día los usás, nunca subas un `.env` al repositorio.

## 7. Posicionamiento (SEO) después de publicar
1. **Google Search Console** (search.google.com/search-console): agregá la propiedad `https://veltaweb.com.ar` (por prefijo de URL), verificala y enviá `https://veltaweb.com.ar/sitemap.xml`. Pedí la indexación de la página principal.
2. **Ficha de empresa en Google (Business Profile)**: es lo que más ayuda para búsquedas locales como "páginas web Santiago del Estero". Creá la ficha con el nombre "Velta Web", la categoría de diseño o desarrollo web, y el enlace a la web.
3. **Instagram:** poné `https://veltaweb.com.ar` como enlace en la biografía de @velta.web.
4. **Enlaces y reseñas:** los enlaces desde otros sitios y las reseñas reales de clientes son lo que más sube posiciones a largo plazo.
5. Cuando tengas número de WhatsApp: editá `WA_NUMBER` en `js/contact.js` y los botones pasan a abrir WhatsApp con el mensaje ya escrito.
