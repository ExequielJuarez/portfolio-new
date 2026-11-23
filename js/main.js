// Velta Web: carrusel de proyectos, visor de demos, menú y efectos
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ICON_OPEN = '<svg class="ico-svg" aria-hidden="true"><use href="#i-open"/></svg>';

// Copia navegable de cada proyecto (carpeta demos/). "a" = panel de administración, si existe.
const DEMOS = {
  "santiago-mates.webp": { u: "/demos/santiago-mates/index.html", a: "/demos/santiago-mates/admin.html" },
  "matilda-boutique.webp": { u: "/demos/matilda-boutique/index.html", a: "/demos/matilda-boutique/admin.html" },
  "akualoe-chic.webp": { u: "/demos/akualoe-chic/index.html", a: "/demos/akualoe-chic/admin.html" },
  "huella-negra.webp": { u: "/demos/huella-negra/index.html", a: "/demos/huella-negra/admin.html" },
  "sistema-negocio.webp": { u: "/demos/sistema-negocio/index.html" },
  "jb-sushi.webp": { u: "/demos/jb-sushi/index.html" },
  "sora-sushi.webp": { u: "/demos/sora-sushi/index.html" },
  "street-burger.webp": { u: "/demos/street-burger/index.html", a: "/demos/street-burger/admin/index.html" },
  "landing-dentista.webp": { u: "/demos/landings/dentista/index.html" },
  "landing-abogado.webp": { u: "/demos/landings/abogado/index.html" },
  "landing-veterinario.webp": { u: "/demos/landings/veterinario/index.html" },
  "landing-medico.webp": { u: "/demos/landings/medico/index.html" },
};

const NODE = ["Node", "Express", "Sequelize", "MySQL"];
const PROJECTS = [
  { t: "Santiago Mates", d: "Tienda online de mates y accesorios con catálogo, carrito, favoritos, cuentas de cliente y panel de administración.", c: "E-commerce", img: "santiago-mates.webp", s: [...NODE, "EJS"] },
  { t: "Matilda Boutique", d: "E-commerce de moda femenina con colecciones por temporada, favoritos, cuotas y atención por WhatsApp.", c: "E-commerce", img: "matilda-boutique.webp", s: [...NODE, "EJS"] },
  { t: "Akualoe Chic", d: "Tienda de ropa con menú por categorías, buscador, carrito y checkout con envíos a todo el país.", c: "E-commerce", img: "akualoe-chic.webp", s: [...NODE, "EJS"] },
  { t: "Huella Negra", d: "Tienda de indumentaria masculina con productos destacados, favoritos y compra en pocos pasos.", c: "E-commerce", img: "huella-negra.webp", s: [...NODE, "EJS"] },
  { t: "Sistema de gestión", d: "Punto de venta, caja, stock, compras, clientes, facturas y reportes para kioscos y comercios.", c: "Sistemas", img: "sistema-negocio.webp", s: [...NODE, "EJS"] },
  { t: "JB Sushi", d: "Sitio de restaurante con carta, reservas y galería, con diseño inmersivo y adaptativo.", c: "Gastronomía", img: "jb-sushi.webp", s: [...NODE, "EJS"] },
  { t: "Sora Sushi Lounge", d: "Landing, carta y reservas con animaciones de scroll suave, parallax y carrito de pedido.", c: "Gastronomía", img: "sora-sushi.webp", s: ["Node", "Express", "MySQL", "GSAP"] },
  { t: "Street Burger", d: "Carta digital para pedir en mesa o por delivery, con categorías, carrito y seguimiento de pedidos.", c: "Gastronomía", img: "street-burger.webp", s: [...NODE, "EJS"] },
  { t: "Landing · Dentista", d: "Landing de clínica odontológica con tratamientos, cuotas y reserva de turnos.", c: "Landings", img: "landing-dentista.webp", s: ["HTML", "CSS", "JavaScript"] },
  { t: "Landing · Estudio jurídico", d: "Página institucional elegante para estudio de abogados con áreas de práctica y consultas.", c: "Landings", img: "landing-abogado.webp", s: ["HTML", "CSS", "JavaScript"] },
  { t: "Landing · Veterinaria", d: "Hospital veterinario con guardia 24 hs, plan de salud y botón de emergencias.", c: "Landings", img: "landing-veterinario.webp", s: ["HTML", "CSS", "JavaScript"] },
  { t: "Landing · Médico", d: "Landing de consultorio con reserva de turnos por día y horario enviada por WhatsApp.", c: "Landings", img: "landing-medico.webp", s: ["HTML", "CSS", "JavaScript"] },
];

const viewer = $("#viewer"), frame = $("#vframe"), stage = $("#vstage"), vbar = $("#vurl");

// ---- Proyectos: carrusel ----
const track = $("#projects");
track.innerHTML = PROJECTS.map((p) => {
  const d = DEMOS[p.img], slug = d.u.split("/").slice(2, -1).join("/");
  return `<article class="proj" data-demo="${d.u}" data-admin="${d.a || ""}" data-title="${esc(p.t)}" role="button" tabindex="0" aria-label="Ver demo de ${esc(p.t)}">
    <div class="shot">
      <div class="shot__bar"><i></i><i></i><i></i><span>veltaweb.com.ar/demos/${slug}</span></div>
      <div class="shot__view"><img src="/assets/projects/${p.img}" alt="Captura del proyecto ${esc(p.t)}" width="1280" height="800" loading="lazy" decoding="async" draggable="false"></div>
    </div>
    <div class="proj__body">
      <div class="badges"><span class="badge">${p.c}</span>${d.a ? '<span class="badge badge--admin">+ Panel admin</span>' : ""}</div>
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
      <div class="tags">${p.s.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
      <span class="proj__go">Ver demo en vivo ${ICON_OPEN}</span>
    </div>
  </article>`;
}).join("");

const carousel = $("#carousel"), bar = $("#cbar");
const step = () => { const s = track.querySelector(".proj"); return s ? s.getBoundingClientRect().width + 20 : 320; };
const atEnd = () => track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
const go = (dir) => track.scrollBy({ left: dir * step(), behavior: "smooth" });
const updateBar = () => {
  const max = track.scrollWidth - track.clientWidth;
  const view = track.clientWidth / track.scrollWidth;
  bar.style.width = view * 100 + "%";
  bar.style.transform = `translateX(${max > 0 ? (track.scrollLeft / max) * (1 / view - 1) * 100 : 0}%)`;
};
track.addEventListener("scroll", updateBar, { passive: true });
addEventListener("resize", updateBar);
updateBar();

// Avance automático suave: se detiene al interactuar, con el mouse encima, fuera de pantalla o con "reducir movimiento"
let timer = null, visible = false, hover = false;
let stopped = matchMedia("(prefers-reduced-motion: reduce)").matches;
function stop() { stopped = true; clearInterval(timer); timer = null; }
const tick = () => {
  if (document.hidden || hover || !visible || !viewer.hidden) return;
  atEnd() ? track.scrollTo({ left: 0, behavior: "smooth" }) : go(1);
};
if (!stopped) timer = setInterval(tick, 3600);
carousel.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hover = true; });
carousel.addEventListener("pointerleave", () => { hover = false; });
carousel.addEventListener("touchstart", stop, { passive: true });
carousel.addEventListener("focusin", stop);
new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.35 }).observe(carousel);

$("#cprev").addEventListener("click", () => { stop(); go(-1); });
$("#cnext").addEventListener("click", () => { stop(); go(1); });
track.addEventListener("keydown", (e) => {
  if (e.target !== track) return;
  if (e.key === "ArrowRight") { e.preventDefault(); stop(); go(1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); stop(); go(-1); }
});

// Arrastrar con el mouse (en pantallas táctiles el deslizamiento ya es nativo)
let drag = null, moved = false;
track.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  drag = { x: e.clientX, left: track.scrollLeft }; moved = false; stop();
});
addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add("dragging"); }
  if (moved) track.scrollLeft = drag.left - dx;
});
const endDrag = () => {
  if (!drag) return;
  const was = moved; drag = null;
  if (was) {
    track.classList.remove("dragging");
    track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: "smooth" });
  }
};
addEventListener("pointerup", endDrag);
addEventListener("pointercancel", endDrag);
// Si se arrastró, no se abre la demo al soltar
track.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);

// ---- Visor de demos ----
let lastFocus = null;
const label = (u) => u.replace(/^\/demos\//, "").replace(/index\.html$/, "");
const setDevice = (d) => { stage.dataset.device = d; $$("#vdevices button").forEach((b) => b.classList.toggle("on", b.dataset.d === d)); };
const setMode = (m) => $$("#vmode button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
const openDemo = (url, title, admin) => {
  lastFocus = document.activeElement;
  viewer.dataset.site = url; viewer.dataset.admin = admin || "";
  $("#vmode").hidden = !admin; setMode("site");
  $("#vtitle").textContent = title;
  $("#vquiero").dataset.msg = `Hola Velta Web, vi el proyecto «${title}» en su portfolio y me gustaría algo similar para mi negocio. ¿Podemos conversar?`;
  frame.src = url; vbar.textContent = label(url);
  setDevice("desktop");
  viewer.hidden = false;
  document.body.classList.add("noscroll");
  $("#vclose").focus();
};
const closeDemo = () => {
  viewer.hidden = true; frame.src = "about:blank";
  document.body.classList.remove("noscroll");
  if (lastFocus) lastFocus.focus();
};
track.addEventListener("click", (e) => { const t = e.target.closest("[data-demo]"); if (t) openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin); });
document.addEventListener("keydown", (e) => {
  if (!viewer.hidden && e.key === "Escape") return closeDemo();
  const t = e.target.closest && e.target.closest(".proj[data-demo]");
  if (viewer.hidden && t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin); }
});
$("#vclose").addEventListener("click", closeDemo);
viewer.addEventListener("click", (e) => { if (e.target === viewer) closeDemo(); });
$("#vdevices").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) setDevice(b.dataset.d); });
$("#vmode").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const url = b.dataset.m === "admin" ? viewer.dataset.admin : viewer.dataset.site;
  if (!url) return;
  setMode(b.dataset.m); frame.src = url; vbar.textContent = label(url);
});
const hist = (fn) => () => { try { frame.contentWindow.history[fn](); } catch (_) {} };
$("#vback").addEventListener("click", hist("back"));
$("#vfwd").addEventListener("click", hist("forward"));
$("#vreload").addEventListener("click", () => { try { frame.contentWindow.location.reload(); } catch (_) { frame.src = frame.src; } });
frame.addEventListener("load", () => {
  try {
    const p = frame.contentWindow.location.pathname;
    if (p !== "/blank" && p !== "blank") vbar.textContent = label(decodeURIComponent(p));
  } catch (_) {}
});

// ---- Menú y barra superior ----
const nav = $("#nav"), burger = $("#burger");
const setMenu = (open) => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); };
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
$$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", (e) => { if (nav.classList.contains("open") && !e.target.closest(".nav")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 12);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// ---- Aparición al hacer scroll (con escalonado corto) ----
const reveal = $$(".reveal");
reveal.forEach((el) => {
  const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 60 + "ms");
});
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
reveal.forEach((el) => io.observe(el));

$("#year").textContent = new Date().getFullYear();

// ---- Efecto de tipeo en la ventana de código ----
(() => {
  const el = $(".code code");
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pre = el.parentElement; pre.style.minHeight = pre.offsetHeight + "px";
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
  while (walker.nextNode()) if (walker.currentNode.parentElement !== el) nodes.push(walker.currentNode);
  const full = nodes.map((n) => n.textContent); nodes.forEach((n) => (n.textContent = ""));
  let ni = 0, ci = 0;
  setTimeout(function tick2() {
    if (ni >= nodes.length) return;
    ci += 2; nodes[ni].textContent = full[ni].slice(0, ci);
    if (ci >= full[ni].length) { ni++; ci = 0; }
    setTimeout(tick2, 22);
  }, 500);
})();
