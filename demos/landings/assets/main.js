// Menú móvil, nav al scroll, animaciones de entrada y formularios → WhatsApp.
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const nav = $('.nav'), burger = $('.burger'), menu = $('.menu');
  const onScroll = () => nav && nav.classList.toggle('scrolled', scrollY > 30);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  if (burger) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', e => {
      if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
    });
  }
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  // Los formularios arman un mensaje y abren WhatsApp (data-wa = número con código de país).
  document.querySelectorAll('form[data-wa]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const m = new Map();
    for (const [k, v] of d.entries()) if (String(v).trim()) m.set(k, m.has(k) ? `${m.get(k)}, ${v}` : v);
    const lines = [...m].map(([k, v]) => `*${k}:* ${v}`);
    const text = encodeURIComponent(`Hola! Quiero hacer una consulta.\n${lines.join('\n')}`);
    window.open(`https://wa.me/${form.dataset.wa}?text=${text}`, '_blank', 'noopener');
    const ok = $('.form-ok', form); if (ok) ok.classList.add('show');
    form.reset();
  }));
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();
