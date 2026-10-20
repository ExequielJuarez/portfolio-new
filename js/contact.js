// Contacto con mensaje armado + precios según moneda (compartido por todas las páginas)
(() => {
  const IG_USER = "velta.web";
  const WA_NUMBER = ""; // Cuando haya número de WhatsApp: "5493850000000" (código de país + área + número, sin + ni espacios)

  const PRICES = {
    landing: { ars: "$200.000 ARS", usd: "US$150" },
    ecommerce: { ars: "$400.000 ARS", usd: "US$300" },
  };
  const MSG = {
    general: () => "Hola Velta Web, quisiera cotizar un proyecto. ¿Podemos conversar sobre lo que necesito?",
    landing: (p) => `Hola Velta Web, me interesa contratar una landing page (desde ${p}). ¿Podemos coordinar una charla para contarles mi proyecto?`,
    ecommerce: (p) => `Hola Velta Web, quiero armar una tienda online (desde ${p}). ¿Me pueden asesorar?`,
    web: () => "Hola Velta Web, quisiera cotizar una página web institucional para mi negocio. ¿Podemos conversar?",
    sistema: () => "Hola Velta Web, necesito cotizar un sistema a medida para mi negocio. ¿Podemos conversar sobre lo que necesito?",
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
  };

  // Moneda: Argentina → pesos; resto del mundo → dólares. Se puede cambiar a mano.
  function detectCurrency() {
    const saved = store.get("velta_cur");
    if (saved === "ars" || saved === "usd") return saved;
    let tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (_) {}
    const langs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    if (tz.startsWith("America/Argentina") || tz === "America/Buenos_Aires" || langs.some((l) => /-AR$/i.test(l))) return "ars";
    return "usd";
  }
  let cur = detectCurrency();
  const setCurrency = (c, persist) => {
    cur = c;
    document.documentElement.dataset.cur = c;
    document.querySelectorAll(".cur-toggle button").forEach((b) => {
      const on = b.dataset.c === c; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    });
    if (persist) store.set("velta_cur", c);
  };
  const price = (k) => PRICES[k] && PRICES[k][cur];

  const message = (key) => (MSG[key] || MSG.general)(price(key));
  const contactUrl = (msg) => (WA_NUMBER ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}` : `https://ig.me/m/${IG_USER}`);

  function toast(text) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text; t.classList.add("show");
    clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("show"), 4200);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((ok, fail) => {
      const a = document.createElement("textarea"); a.value = text; a.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(a); a.select();
      try { document.execCommand("copy") ? ok() : fail(); } catch (e) { fail(e); } a.remove();
    });
  }

  // Cualquier elemento con data-contact="landing|ecommerce|web|sistema|general|project" (+ data-msg opcional)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-contact]");
    if (!a) return;
    const msg = a.dataset.msg || message(a.dataset.contact);
    a.href = contactUrl(msg); a.target = "_blank"; a.rel = "noopener noreferrer";
    if (!WA_NUMBER) copy(msg).then(() => toast("Copiamos tu mensaje: pegalo en el chat de Instagram y envialo."), () => {});
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".cur-toggle button");
    if (b) setCurrency(b.dataset.c, true);
  });

  setCurrency(cur, false);
  window.Velta = { message, contactUrl, setCurrency, get currency() { return cur; } };
})();
