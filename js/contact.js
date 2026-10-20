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

  // Ventana con el mensaje: Instagram no deja prellenar el texto, así que se muestra, se copia y se abre el chat
  let modal, lastFocus;
  function buildModal() {
    modal = document.createElement("div");
    modal.id = "cmodal"; modal.className = "cmodal"; modal.hidden = true;
    modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-labelledby", "cm-title");
    modal.innerHTML = `<div class="cmodal__box">
      <button class="cmodal__x" type="button" aria-label="Cerrar"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <h3 id="cm-title">Tu mensaje para Velta Web</h3>
      <p class="cmodal__hint">Revisalo o editalo. Al tocar el botón lo copiamos y abrimos nuestro Instagram: solo tenés que <b>pegarlo en el chat</b> y enviarlo.</p>
      <textarea id="cm-msg" rows="4" aria-label="Mensaje"></textarea>
      <div class="cmodal__btns">
        <a id="cm-go" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Copiar y abrir Instagram</a>
        <button id="cm-copy" class="btn btn--ghost" type="button">Solo copiar</button>
      </div>
      <p class="cmodal__ok" id="cm-ok" role="status" hidden>Mensaje copiado. Pegalo en el chat de Instagram y envialo.</p>
    </div>`;
    document.body.appendChild(modal);
    const ta = modal.querySelector("#cm-msg"), ok = modal.querySelector("#cm-ok");
    const done = () => { ok.hidden = false; };
    modal.querySelector("#cm-go").addEventListener("click", () => { copy(ta.value).then(done, done); });
    modal.querySelector("#cm-copy").addEventListener("click", () => { copy(ta.value).then(done, () => { ta.select(); }); });
    modal.querySelector(".cmodal__x").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (!modal.hidden && e.key === "Escape") { e.stopPropagation(); closeModal(); } }, true);
  }
  function openModal(msg) {
    if (!modal) buildModal();
    lastFocus = document.activeElement;
    modal.querySelector("#cm-msg").value = msg;
    modal.querySelector("#cm-go").href = contactUrl(msg);
    modal.querySelector("#cm-ok").hidden = true;
    modal.hidden = false;
    modal.querySelector("#cm-go").focus();
  }
  function closeModal() { modal.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }

  // Cualquier elemento con data-contact="landing|ecommerce|web|sistema|general|project" (+ data-msg opcional)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-contact]");
    if (!a) return;
    const msg = a.dataset.msg || message(a.dataset.contact);
    if (WA_NUMBER) { a.href = contactUrl(msg); a.target = "_blank"; a.rel = "noopener noreferrer"; return; } // WhatsApp sí admite el texto en el link
    e.preventDefault();
    openModal(msg);
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".cur-toggle button");
    if (b) setCurrency(b.dataset.c, true);
  });

  setCurrency(cur, false);
  window.Velta = { message, contactUrl, setCurrency, get currency() { return cur; } };
})();
