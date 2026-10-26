// Contacto con mensaje armado (Instagram hoy; WhatsApp cuando haya número)
(() => {
  const IG_USER = "velta.web";
  const WA_NUMBER = ""; // Cuando haya número de WhatsApp: "5493850000000" (código de país + área + número, sin + ni espacios)

  const MSG = {
    general: "Hola Velta Web, quisiera cotizar un proyecto. ¿Podemos conversar sobre lo que necesito?",
    landing: "Hola Velta Web, me interesa contratar una landing page. ¿Podemos coordinar una charla para contarles mi proyecto?",
    ecommerce: "Hola Velta Web, quiero armar una tienda online. ¿Me pueden asesorar?",
    web: "Hola Velta Web, quisiera cotizar una página web institucional para mi negocio. ¿Podemos conversar?",
    sistema: "Hola Velta Web, necesito cotizar un sistema a medida para mi negocio. ¿Podemos conversar sobre lo que necesito?",
  };

  const message = (key) => MSG[key] || MSG.general;
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
    // Instagram no admite texto prellenado: se copia el mensaje para pegarlo en el chat
    if (!WA_NUMBER) copy(msg).then(() => toast("Copiamos tu mensaje: pegalo en el chat de Instagram y envialo."), () => {});
  });

  window.Velta = { message, contactUrl };
})();
