// Velta Web: menú, aparición al hacer scroll y efecto de tipeo
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ---- Menú y barra superior ----
const nav = $("#nav"), burger = $("#burger");
if (nav && burger) {
  const setMenu = (open) => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú"); };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (e) => { if (nav.classList.contains("open") && !e.target.closest(".nav")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); burger.focus(); } });
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 12);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

// ---- Aparición al hacer scroll (con escalonado corto) ----
const reveal = $$(".reveal");
reveal.forEach((el) => {
  const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 60 + "ms");
});
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
reveal.forEach((el) => io.observe(el));

const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

// ---- Efecto de tipeo en la ventana de código ----
(() => {
  const el = $(".code code");
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pre = el.parentElement; pre.style.minHeight = pre.offsetHeight + "px";
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
  while (walker.nextNode()) if (walker.currentNode.parentElement !== el) nodes.push(walker.currentNode);
  const full = nodes.map((n) => n.textContent); nodes.forEach((n) => (n.textContent = ""));
  let ni = 0, ci = 0;
  setTimeout(function tick() {
    if (ni >= nodes.length) return;
    ci += 2; nodes[ni].textContent = full[ni].slice(0, ci);
    if (ci >= full[ni].length) { ni++; ci = 0; }
    setTimeout(tick, 22);
  }, 500);
})();
