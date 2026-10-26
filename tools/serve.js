// Servidor local del portfolio (sin dependencias): npm start  ->  http://localhost:3000
// Sirve solo lo que se publica en producción, con las mismas rutas.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = process.env.PORT || 3000;
const PAGES = ["paginas-web-santiago-del-estero", "tiendas-online-ecommerce", "landing-pages", "sistemas-a-medida"];
const PUBLIC = new RegExp(`^/(index\\.html|robots\\.txt|sitemap\\.xml|(css|js|assets|demos|${PAGES.join("|")})/.*)?$`);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm",
};

const server = http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(new URL(req.url, "http://x").pathname); } catch { res.writeHead(400).end("Solicitud inválida"); return; }
  if (PAGES.some((p) => url === "/" + p)) { res.writeHead(301, { Location: url + "/" }).end(); return; }
  let file = path.join(ROOT, url);
  if (!file.startsWith(ROOT) || !PUBLIC.test(url)) { res.writeHead(404).end("No encontrado"); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado"); return; }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
});

// Si el puerto está ocupado, prueba con los siguientes (3000, 3001, 3002...)
let port = Number(PORT), intentos = 0;
server.on("error", (e) => {
  if (e.code === "EADDRINUSE" && intentos++ < 10) { port++; server.listen(port); return; }
  console.error("No se pudo iniciar el servidor:", e.message);
  process.exit(1);
});
server.on("listening", () => console.log(`Velta Web en http://localhost:${port}  (Ctrl+C para cortar)`));
server.listen(port);
