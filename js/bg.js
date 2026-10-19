// Fondo animado: red de nodos con pulsos de datos que reacciona al mouse
(() => {
  const c = document.getElementById("bg");
  if (!c) return;
  const ctx = c.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["99,102,241", "34,211,238"];
  let w, h, pts = [], pulses = [], paused = false, lastPulse = 0;
  const mouse = { x: -9999, y: -9999 };

  function size() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(105, Math.max(26, (w * h) / 17000)));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.4 + 0.7, c: COLORS[Math.random() < 0.6 ? 0 : 1],
    }));
    pulses = [];
  }

  const LINK = () => (w < 700 ? 110 : 150);

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const D = LINK();
    for (const p of pts) {
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) { const f = (1 - d2 / 22000) * 0.5; p.x += (dx / Math.sqrt(d2 + 1)) * f; p.y += (dy / Math.sqrt(d2 + 1)) * f; }
      }
    }
    const links = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < D) {
          const al = (1 - d / D) * 0.42;
          ctx.strokeStyle = `rgba(99,102,241,${al})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          links.push([a, b]);
        }
      }
      const a = pts[i], dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 170) {
        ctx.strokeStyle = `rgba(34,211,238,${(1 - dm / 170) * 0.55})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for (const p of pts) {
      ctx.fillStyle = `rgba(${p.c},.95)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
    }
    // pulsos de datos viajando por los enlaces
    if (!reduce && links.length && t - lastPulse > 700 && pulses.length < 8) {
      lastPulse = t; const l = links[(Math.random() * links.length) | 0];
      pulses.push({ a: l[0], b: l[1], t0: t, dur: 900 + Math.random() * 600 });
    }
    pulses = pulses.filter((q) => t - q.t0 < q.dur);
    for (const q of pulses) {
      const k = (t - q.t0) / q.dur, x = q.a.x + (q.b.x - q.a.x) * k, y = q.a.y + (q.b.y - q.a.y) * k;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
      g.addColorStop(0, "rgba(34,211,238,.95)"); g.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 12, 0, 6.283); ctx.fill();
    }
  }

  function loop(t) {
    if (!paused && !document.hidden) draw(t);
    if (!reduce) requestAnimationFrame(loop);
  }

  size();
  addEventListener("resize", () => { size(); if (reduce) draw(0); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  window.veltaBg = { pause: (v) => { paused = v; } };
  if (reduce) draw(0); else requestAnimationFrame(loop);
})();
