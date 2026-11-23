// Velta Web: carrusel de proyectos, visor de demos, menú y aparición al scroll
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ICON_OPEN = '<svg class="ico-svg" aria-hidden="true"><use href="#i-open"/></svg>';

// Cada proyecto: "u" es la dirección que se abre en el visor (copia local en /demos o sitio en línea).
const NODE = ["Node", "Express", "Sequelize", "MySQL"];
const PROJECTS = [
  { t: "Fressia Indumentaria", d: "Tienda online de moda con novedades, categorías, favoritos, carrito y envíos a todo el país.", c: "E-commerce", img: "fressia.webp", u: "https://fressia.veltaweb.com.ar/", s: [...NODE, "EJS"] },
  { t: "Top Level Barber Shop", d: "Barbería con tienda de insumos, turnos en línea, carrito y cuentas de cliente.", c: "Barbería", img: "toplevel.webp", u: "https://toplevel.veltaweb.com.ar/", s: [...NODE, "EJS"] },
  { t: "Magic Tecno", d: "Juguetería y computación con catálogo por categorías, precios mayoristas y pedidos por WhatsApp.", c: "E-commerce", img: "magictecno.webp", u: "https://www.magictecno.veltaweb.com.ar/", s: [...NODE, "EJS"] },
  { t: "OneBarber", d: "Venta de insumos y máquinas para barberías, con tienda online y atención por WhatsApp.", c: "Barbería", img: "onebarber.webp", u: "https://www.onebarber.veltaweb.com.ar/", s: [...NODE, "EJS"] },
  { t: "Huella Negra", d: "Tienda de indumentaria masculina con productos destacados, favoritos, compra en pocos pasos y panel de administración.", c: "E-commerce", img: "huella-negra.webp", u: "/demos/huella-negra/index.html", a: "/demos/huella-negra/admin.html", s: [...NODE, "EJS"] },
  { t: "Sistema de gestión", d: "Punto de venta, caja, stock, compras, clientes, facturas y reportes para kioscos y comercios.", c: "Sistemas", img: "sistema-negocio.webp", u: "/demos/sistema-negocio/index.html", s: [...NODE, "EJS"] },
  { t: "Sora Sushi Lounge", d: "Landing, carta y reservas con animaciones de scroll suave, parallax y carrito de pedido.", c: "Gastronomía", img: "sora-sushi.webp", u: "/demos/sora-sushi/index.html", s: ["Node", "Express", "MySQL", "GSAP"] },
];

const viewer = $("#viewer"), frame = $("#vframe"), stage = $("#vstage"), vbar = $("#vurl");

// ---- Proyectos: carrusel con el proyecto activo al centro ----
const track = $("#projects");
const host = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
const shown = (u) => (u.startsWith("http") ? host(u) : "veltaweb.com.ar" + u.replace(/\/index\.html$/, ""));
track.innerHTML = PROJECTS.map((p, i) => {
  return `<article class="proj" data-i="${i}" data-demo="${p.u}" data-admin="${p.a || ""}" data-title="${esc(p.t)}" role="group" aria-roledescription="proyecto" aria-label="${i + 1} de ${PROJECTS.length}: ${esc(p.t)}">
    <div class="shot">
      <div class="shot__bar"><i></i><i></i><i></i><span>${shown(p.u)}</span></div>
      <div class="shot__view"><img src="/assets/projects/${p.img}" alt="Captura del proyecto ${esc(p.t)}" width="1280" height="800" loading="lazy" decoding="async" draggable="false"></div>
    </div>
    <div class="proj__body">
      ${p.a ? '<div class="badges"><span class="badge badge--admin">+ Panel admin</span></div>' : ""}
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
      <span class="proj__go">Ver sitio en vivo ${ICON_OPEN}</span>
    </div>
  </article>`;
}).join("");

const carousel = $("#carousel"), dots = $("#cdots");
const slides = $$(".proj", track);
dots.innerHTML = slides.map((_, i) => `<button role="tab" data-i="${i}" aria-label="Ir al proyecto ${i + 1}"></button>`).join("");
const dotEls = $$("button", dots), ccat = $("#ccat");
let current = 0;
const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2;
const goTo = (i, smooth = true) => {
  i = Math.max(0, Math.min(slides.length - 1, i));
  track.scrollTo({ left: centerOf(slides[i]), behavior: smooth ? "smooth" : "auto" });
};
const paint = () => {
  const mid = track.scrollLeft + track.clientWidth / 2;
  let best = 0, bd = Infinity;
  slides.forEach((el, i) => { const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
  current = best;
  if (ccat.textContent !== PROJECTS[best].c) ccat.textContent = PROJECTS[best].c;
  slides.forEach((el, i) => { el.classList.toggle("is-active", i === best); el.setAttribute("aria-current", i === best); });
  dotEls.forEach((d, i) => { d.classList.toggle("on", i === best); d.setAttribute("aria-selected", i === best); });
};
let raf = 0;
track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }, { passive: true });
addEventListener("resize", () => { goTo(current, false); paint(); });
goTo(0, false); paint();

// Avance automático suave: se detiene al interactuar, con el mouse encima, fuera de pantalla o con "reducir movimiento"
let timer = null, visible = false, hover = false, dir = 1;
let stopped = matchMedia("(prefers-reduced-motion: reduce)").matches;
function stop() { stopped = true; clearInterval(timer); timer = null; }
const tick = () => {
  if (document.hidden || hover || !visible || !viewer.hidden) return;
  if (current >= slides.length - 1) dir = -1;
  if (current <= 0) dir = 1;
  goTo(current + dir);
};
if (!stopped) timer = setInterval(tick, 4200);
carousel.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") hover = true; });
carousel.addEventListener("pointerleave", () => { hover = false; });
carousel.addEventListener("touchstart", stop, { passive: true });
carousel.addEventListener("focusin", stop);
new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.35 }).observe(carousel);

$("#cprev").addEventListener("click", () => { stop(); goTo(current - 1); });
$("#cnext").addEventListener("click", () => { stop(); goTo(current + 1); });
dots.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { stop(); goTo(+b.dataset.i); } });
track.addEventListener("keydown", (e) => {
  if (e.target !== track) return;
  if (e.key === "ArrowRight") { e.preventDefault(); stop(); goTo(current + 1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); stop(); goTo(current - 1); }
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
  if (was) { track.classList.remove("dragging"); goTo(current); }
};
addEventListener("pointerup", endDrag);
addEventListener("pointercancel", endDrag);
// Si se arrastró, no se activa nada al soltar
track.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);

// ---- Visor de demos ----
let lastFocus = null;
const label = (u) => (u.startsWith("http") ? host(u) : u.replace(/^\/demos\//, "").replace(/index\.html$/, ""));
const setDevice = (d) => { stage.dataset.device = d; $$("#vdevices button").forEach((b) => b.classList.toggle("on", b.dataset.d === d)); };
const setMode = (m) => $$("#vmode button").forEach((b) => b.classList.toggle("on", b.dataset.m === m));
const openDemo = (url, title, admin) => {
  lastFocus = document.activeElement;
  viewer.dataset.site = url; viewer.dataset.admin = admin || "";
  $("#vmode").hidden = !admin; setMode("site");
  $("#vtitle").textContent = title;
  $("#vquiero").dataset.msg = `Hola Velta Web, vi el proyecto «${title}» en su portfolio y me gustaría algo similar para mi negocio. ¿Podemos conversar?`;
  frame.src = url; vbar.textContent = label(url);
  $(".viewer__hint").textContent = url.startsWith("http") ? "Sitio en línea: navegalo libremente, como lo vería un cliente." : "Copia de demostración: navegá libremente. Carrito, pagos y formularios están desactivados.";
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
track.addEventListener("click", (e) => {
  const t = e.target.closest("[data-demo]");
  if (!t) return;
  if (+t.dataset.i !== current) { stop(); goTo(+t.dataset.i); return; }
  openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin);
});
document.addEventListener("keydown", (e) => {
  if (!viewer.hidden && e.key === "Escape") return closeDemo();
  const t = e.target.closest && e.target.closest(".proj[data-demo]");
  if (viewer.hidden && t && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); +t.dataset.i === current ? openDemo(t.dataset.demo, t.dataset.title, t.dataset.admin) : goTo(+t.dataset.i); }
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
