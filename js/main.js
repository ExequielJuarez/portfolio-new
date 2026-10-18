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
  ["Mercado Pago", "Pagos", "#00b1ea"],
  ["Git & GitHub", "Versionado", "#f05133"],
];

// Proyectos. Para usar una captura real: guardala en assets/projects/<img> (ver README).
const PROJECTS = [
  { t: "Tienda de ropa", d: "E-commerce de indumentaria con catálogo, carrito, favoritos y panel de administración.", c: "E-commerce", img: "tienda-ropa.webp", s: ["Node", "Express", "MySQL", "EJS"], p: ["#6366f1", "#a855f7"], n: 4 },
  { t: "Tienda de ropa hombre", d: "Tienda online enfocada en moda masculina con filtros por talle, categoría y precio.", c: "E-commerce", img: "tienda-hombre.webp", s: ["Node", "Express", "Sequelize"], p: ["#0ea5e9", "#6366f1"], n: 4 },
  { t: "Tienda de ropa 2", d: "Segunda versión de tienda con nuevo diseño, pagos integrados y checkout simplificado.", c: "E-commerce", img: "tienda-2.webp", s: ["Node", "MySQL", "Mercado Pago"], p: ["#ec4899", "#8b5cf6"], n: 3 },
  { t: "Sistema de kioscos", d: "Sistema de gestión para negocios: ventas, stock, clientes y reportes.", c: "Sistemas", img: "kioscos.webp", s: ["Node", "Express", "MySQL"], p: ["#10b981", "#0ea5e9"], n: 3 },
  { t: "Prototipo web de ventas", d: "Prototipo funcional de sitio de ventas para validar la idea antes de escalar.", c: "Webs", img: "ventas.webp", s: ["JavaScript", "Express", "Sequelize"], p: ["#f59e0b", "#ef4444"], n: 3 },
  { t: "Restaurante", d: "Sitio institucional con carta, reservas y datos de contacto optimizado para móvil.", c: "Webs", img: "restaurante.webp", s: ["HTML", "CSS", "Node"], p: ["#f97316", "#dc2626"], n: 3 },
  { t: "La Buguería", d: "Web de hamburguesería con menú visual, promos y pedido directo por WhatsApp.", c: "Landings", img: "bugueria.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#eab308", "#f97316"], n: 2 },
  { t: "Menú sushi", d: "Carta digital de sushi pensada para escanear con QR y pedir desde el celular.", c: "Landings", img: "sushi.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#14b8a6", "#6366f1"], n: 2 },
  { t: "Landing pages", d: "Colección de landings para distintos rubros, rápidas y orientadas a conversión.", c: "Landings", img: "landings.webp", s: ["HTML", "CSS", "JavaScript"], p: ["#22d3ee", "#6366f1"], n: 3 },
];

const $ = (s) => document.querySelector(s);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Tecnologías
$("#tech").innerHTML = TECH.map(([n, r, c]) => `
  <div class="chip reveal" style="--c:${c}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="${c}" opacity=".18"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="${c}" font-family="Inter,sans-serif">${esc(n.slice(0, 2))}</text></svg>
    <div>${esc(n)}<small>${esc(r)}</small></div>
  </div>`).join("");

// Proyectos
$("#projects").innerHTML = PROJECTS.map((p) => `
  <article class="card proj reveal" data-cat="${p.c}">
    <div class="shot" style="--p1:${p.p[0]};--p2:${p.p[1]}">
      <div class="mock" aria-hidden="true">
        <div class="mock__bar"><i></i><i></i><i></i></div>
        <div class="mock__body"><div class="mock__hero"></div><div class="mock__row" style="--n:${p.n}"><b></b><b></b><b></b><b></b></div><div class="mock__line"></div></div>
      </div>
      <img src="assets/projects/${p.img}" alt="Captura del proyecto ${esc(p.t)}" loading="lazy" onerror="this.remove()">
    </div>
    <div class="proj__body">
      <span class="badge">${p.c}</span>
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
      <div class="tags">${p.s.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
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
