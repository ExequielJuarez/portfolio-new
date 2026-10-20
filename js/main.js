// Tecnologías (icono = iniciales sobre el color de la marca)
const TECH = [
  ["JavaScript", "Lenguaje", "#f7df1e"],
  ["Node.js", "Backend", "#5fa04e"],
  ["Express", "API / servidor", "#e8ecff"],
  ["MySQL", "Base de datos", "#00a5d6"],
  ["Sequelize", "ORM", "#52b0e7"],
  ["EJS", "Vistas", "#a91e50"],
  ["React", "Interfaces", "#61dafb"],
  ["Next.js", "Fullstack", "#ffffff"],
  ["HTML5", "Estructura", "#e44d26"],
  ["CSS3", "Diseño adaptativo", "#2965f1"],
];

// Proyectos (capturas reales en assets/projects/)
const NODE = ["Node", "Express", "Sequelize", "MySQL"];
const PROJECTS = [
  { t: "Santiago Mates", d: "Tienda online de mates y accesorios con catálogo, carrito, favoritos, cuentas de cliente y panel de administración.", c: "E-commerce", img: "santiago-mates.webp", s: [...NODE, "EJS"], p: ["#7c2d12", "#b45309"], n: 4 },
  { t: "Matilda Boutique", d: "E-commerce de moda femenina con colecciones por temporada, favoritos, cuotas y atención por WhatsApp.", c: "E-commerce", img: "matilda-boutique.webp", s: [...NODE, "EJS"], p: ["#b8893b", "#111827"], n: 4 },
  { t: "Akualoe Chic", d: "Tienda de ropa con menú por categorías, buscador, carrito y checkout con envíos a todo el país.", c: "E-commerce", img: "akualoe-chic.webp", s: [...NODE, "EJS"], p: ["#be185d", "#7c3aed"], n: 3 },
  { t: "Huella Negra", d: "Tienda de indumentaria masculina con productos destacados, favoritos y compra en pocos pasos.", c: "E-commerce", img: "huella-negra.webp", s: [...NODE, "EJS"], p: ["#111827", "#6b7280"], n: 4 },
  { t: "Sistema de gestión", d: "Punto de venta, caja, stock, compras, clientes, facturas y reportes para kioscos y comercios.", c: "Sistemas", img: "sistema-negocio.webp", s: [...NODE, "EJS"], p: ["#0f766e", "#0f172a"], n: 3 },
  { t: "JB Sushi", d: "Sitio de restaurante con carta, reservas y galería, con diseño inmersivo y adaptativo.", c: "Gastronomía", img: "jb-sushi.webp", s: [...NODE, "EJS"], p: ["#92400e", "#0f172a"], n: 3 },
  { t: "Sora Sushi Lounge", d: "Landing, carta y reservas con animaciones de scroll suave, parallax y carrito de pedido.", c: "Gastronomía", img: "sora-sushi.webp", s: ["Node", "Express", "MySQL", "GSAP"], p: ["#14532d", "#0a0f0d"], n: 3 },
  { t: "Street Burger", d: "Carta digital para pedir en mesa o por delivery, con categorías, carrito y seguimiento de pedidos.", c: "Gastronomía", img: "street-burger.webp", s: [...NODE, "EJS"], p: ["#f59e0b", "#ef4444"], n: 3 },
  { t: "Landing · Dentista", d: "Landing de clínica odontológica con tratamientos, cuotas y reserva de turnos.", c: "Landings", img: "landing-dentista.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#38bdf8", "#f9a8d4"], n: 3 },
  { t: "Landing · Estudio jurídico", d: "Página institucional elegante para estudio de abogados con áreas de práctica y consultas.", c: "Landings", img: "landing-abogado.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#1e3a8a", "#b8893b"], n: 3 },
  { t: "Landing · Veterinaria", d: "Hospital veterinario con guardia 24 hs, plan de salud y botón de emergencias.", c: "Landings", img: "landing-veterinario.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#a64d85", "#f472b6"], n: 3 },
  { t: "Landing · Médico", d: "Landing de consultorio con reserva de turnos por día y horario enviada por WhatsApp.", c: "Landings", img: "landing-medico.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#0f766e", "#99f6e4"], n: 3 },
];

// Copia navegable de cada proyecto (carpeta demos/)
const DEMOS = {
  "santiago-mates.webp": { u: "demos/santiago-mates/index.html", a: "demos/santiago-mates/admin.html" },
  "matilda-boutique.webp": { u: "demos/matilda-boutique/index.html", a: "demos/matilda-boutique/admin.html" },
  "akualoe-chic.webp": { u: "demos/akualoe-chic/index.html", a: "demos/akualoe-chic/admin.html" },
  "huella-negra.webp": { u: "demos/huella-negra/index.html", a: "demos/huella-negra/admin.html" },
  "sistema-negocio.webp": { u: "demos/sistema-negocio/index.html" },
  "jb-sushi.webp": { u: "demos/jb-sushi/index.html" },
  "sora-sushi.webp": { u: "demos/sora-sushi/index.html" },
  "street-burger.webp": { u: "demos/street-burger/index.html", a: "demos/street-burger/admin/index.html" },
  "landing-dentista.webp": { u: "demos/landings/dentista/index.html" },
  "landing-abogado.webp": { u: "demos/landings/abogado/index.html" },
  "landing-veterinario.webp": { u: "demos/landings/veterinario/index.html" },
  "landing-medico.webp": { u: "demos/landings/medico/index.html" },
};

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Tecnologías
$("#tech").innerHTML = TECH.map(([n, r, c]) => `
  <div class="chip reveal" style="--c:${c}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="${c}" opacity=".18"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="${c}" font-family="Karla,sans-serif">${esc(n.slice(0, 2))}</text></svg>
    <div>${esc(n)}<small>${esc(r)}</small></div>
  </div>`).join("");

// Proyectos
$("#projects").innerHTML = PROJECTS.map((p) => `
  <article class="card proj reveal" data-cat="${p.c}">
    <div class="shot" style="--p1:${p.p[0]};--p2:${p.p[1]}" data-demo="${DEMOS[p.img].u}" data-admin="${DEMOS[p.img].a || ""}" data-title="${esc(p.t)}" role="button" tabindex="0" aria-label="Ver demo de ${esc(p.t)}">
      <div class="mock" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i></div>
        <div class="mock__body"><div class="mock__hero"></div><div class="mock__row" style="--n:${p.n}"><b></b><b></b><b></b><b></b></div><div class="mock__line"></div></div>
      </div>
      <img src="assets/projects/${p.img}" alt="Captura del proyecto ${esc(p.t)}" loading="lazy">
    </div>
    <div class="proj__body">
      <div class="badges"><span class="badge">${p.c}</span>${DEMOS[p.img].a ? '<span class="badge badge--admin">+ Panel admin</span>' : ""}</div>
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
      <div class="tags">${p.s.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
      <button class="btn btn--primary demo-btn" data-demo="${DEMOS[p.img].u}" data-admin="${DEMOS[p.img].a || ""}" data-title="${esc(p.t)}">Ver demo en vivo →</button>
    </div>
  </article>`).join("");

// Filtros
const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.c))];
$("#filters").innerHTML = cats.map((c, i) => `<button role="tab" class="${i ? "" : "on"}" data-f="${c}">${c}</button>`).join("");
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#filters button").forEach((x) => x.classList.toggle("on", x === b));
  document.querySelectorAll(".proj").forEach((el) => (el.hidden = b.dataset.f !== "Todos" && el.dataset.cat !== b.dataset.f));
});

// Menú móvil + barra al hacer scroll
const nav = $("#nav"), burger = $("#burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Aparición al hacer scroll
document.querySelectorAll(".card,.stats div,.hero__text,.code").forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

$("#year").textContent = new Date().getFullYear();

// Visor de demos: navegás el proyecto dentro del portfolio
const viewer = $("#viewer"), frame = $("#vframe"), stage = $("#vstage"), bar = $("#vurl");
let lastFocus = null;
const openDemo = (url, title, admin) => {
  lastFocus = document.activeElement;
  viewer.dataset.site = url; viewer.dataset.admin = admin || "";
  $("#vmode").hidden = !admin; setMode("site");
  $("#vtitle").textContent = title;
  $("#vquiero").dataset.msg = `Hola Velta Web, vi el proyecto «${title}» en su portfolio y me gustaría algo similar para mi negocio. ¿Podemos conversar?`;
  frame.src = url;
  bar.textContent = url.replace(/^demos\//, "").replace(/index\.html$/, "");
  setDevice("desktop");
  viewer.hidden = false;
  document.body.classList.add("noscroll");
  if (window.veltaBg) window.veltaBg.pause(true);
  $("#vclose").focus();
};
const setMode = (m) => {
  document.querySelectorAll("#vmode button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
};
const closeDemo = () => {
  viewer.hidden = true;
  if (window.veltaBg) window.veltaBg.pause(false);
  frame.src = "about:blank";
  document.body.classList.remove("noscroll");
  if (lastFocus) lastFocus.focus();
};
const setDevice = (d) => {
  stage.dataset.device = d;
  document.querySelectorAll("#vdevices button").forEach((b) => b.classList.toggle("on", b.dataset.d === d));
};
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-demo]");
  if (t) openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin);
});
document.addEventListener("keydown", (e) => {
  if (viewer.hidden) return;
  if (e.key === "Escape") closeDemo();
  const t = e.target.closest && e.target.closest(".shot[data-demo]");
  if (t && (e.key === "Enter" || e.key === " ")) e.preventDefault();
});
document.addEventListener("keydown", (e) => {
  const t = e.target.closest && e.target.closest(".shot[data-demo]");
  if (viewer.hidden && t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin); }
});
$("#vclose").addEventListener("click", closeDemo);
viewer.addEventListener("click", (e) => { if (e.target === viewer) closeDemo(); });
$("#vdevices").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setDevice(b.dataset.d); });
const hist = (fn) => () => { try { frame.contentWindow.history[fn](); } catch (_) {} };
$("#vback").addEventListener("click", hist("back"));
$("#vfwd").addEventListener("click", hist("forward"));
$("#vreload").addEventListener("click", () => { try { frame.contentWindow.location.reload(); } catch (_) { frame.src = frame.src; } });
frame.addEventListener("load", () => {
  try {
    const p = frame.contentWindow.location.pathname;
    if (p !== "/blank") bar.textContent = decodeURIComponent(p).replace(/^.*\/demos\//, "").replace(/index\.html$/, "");
  } catch (_) {}
});

// Si una captura no existe, se queda la maqueta de color (sin handlers inline por la CSP)
document.querySelectorAll(".shot img").forEach((img) => img.addEventListener("error", () => img.remove()));

// Barra de progreso de scroll
const prog = $("#progress");
const updProg = () => { const m = document.documentElement.scrollHeight - innerHeight; prog.style.width = (m > 0 ? (scrollY / m) * 100 : 0) + "%"; };
addEventListener("scroll", updProg, { passive: true }); updProg();

// Brillo que sigue al mouse en las tarjetas
document.addEventListener("pointermove", (e) => {
  const c = e.target.closest && e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", e.clientX - r.left + "px");
  c.style.setProperty("--my", e.clientY - r.top + "px");
}, { passive: true });

// Efecto de tipeo en la ventana de código
(() => {
  const el = document.querySelector(".code pre code");
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pre = el.parentElement; pre.style.minHeight = pre.offsetHeight + "px";
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const full = nodes.map((n) => n.textContent); nodes.forEach((n) => (n.textContent = ""));
  let ni = 0, ci = 0;
  setTimeout(function tick() {
    if (ni >= nodes.length) return;
    ci += 2; nodes[ni].textContent = full[ni].slice(0, ci);
    if (ci >= full[ni].length) { ni++; ci = 0; }
    setTimeout(tick, 22);
  }, 600);
})();

$("#vmode").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const url = b.dataset.m === "admin" ? viewer.dataset.admin : viewer.dataset.site;
  if (!url) return;
  setMode(b.dataset.m);
  frame.src = url;
  bar.textContent = url.replace(/^demos\//, "").replace(/index\.html$/, "");
});
