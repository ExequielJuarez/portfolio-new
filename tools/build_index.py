# Genera index.html (página principal). Uso: python3 tools/build_index.py
import sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
from seo_data import *
from PIL import Image
ROOT = os.path.dirname(HERE)
V = "20261026e"
w, h = Image.open(os.path.join(ROOT, "assets/logo.png")).size
IGA = 'href="https://ig.me/m/velta.web" target="_blank" rel="noopener noreferrer"'
def ic(n): return f'<svg class="ico-svg" aria-hidden="true"><use href="#i-{n}"/></svg>'
SPRITE = '''<svg class="sprite" aria-hidden="true" focusable="false"><defs>
<symbol id="i-layout" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M9 20V9.5"/></symbol>
<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2.5 4.5 14H11l-1 7.5L19.5 10H13z"/></symbol>
<symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6"/></symbol>
<symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor"/></symbol>
<symbol id="i-open" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
</defs></svg>'''
def card(i, title, txt, tags, href, cls):
    t = "".join(f"<span>{x}</span>" for x in tags)
    return f'<article class="card reveal {cls}"><div class="ico">{ic(i)}</div><h3>{title}</h3><p>{txt}</p><div class="tags">{t}</div><a class="more" href="{href}">Ver más {ic("arrow")}</a></article>'
services = "\n          ".join([
 card('layout','Páginas web','Sitios institucionales rápidos, responsive y optimizados para buscadores. Diseño a medida, sin plantillas.',['Diseño a medida','SEO','Responsive'],'/paginas-web-santiago-del-estero/','b-4'),
 card('bolt','Landing pages','Páginas de conversión claras y veloces para campañas y lanzamientos.',['Conversión','Rápidas'],'/landing-pages/','b-2'),
 card('cart','E-commerce','Tiendas online con carrito, favoritos, pagos integrados y panel de administración.',['Carrito','Pagos','Panel admin'],'/tiendas-online-ecommerce/','b-2'),
 card('chart','Sistemas a medida','Paneles, gestión de clientes, turnos, stock y automatizaciones para tu negocio.',['Punto de venta','Stock','Reportes','Turnos'],'/sistemas-a-medida/','b-4')])
def plan(title, desc, items, key, btn, hot=False, tag=''):
    lis = "".join(f"<li>{x}</li>" for x in items)
    return f'<article class="card plan reveal{" plan--hot" if hot else ""}">{f"<span class=plan__tag>{tag}</span>" if hot else ""}<h3>{title}</h3><span class="plan__quote">Presupuesto a medida</span><p>{desc}</p><ul>{lis}</ul><a {IGA} data-contact="{key}" class="btn {"btn--primary" if hot else "btn--ghost"}">{btn}</a></article>'
plans = "\n          ".join([
 plan('Landing page','Una página enfocada en convertir visitas en consultas.',['Diseño adaptativo','Contacto directo','SEO básico'],'landing','Quiero mi landing'),
 plan('Página web','Sitio institucional con varias secciones.',['Diseño a medida','Panel para editar contenido','SEO y analítica'],'web','Cotizar mi web'),
 plan('E-commerce','Tienda online lista para recibir pedidos.',['Carrito y pagos','Panel de administración','Base de datos y soporte'],'ecommerce','Quiero mi tienda',True,'Para vender online'),
 plan('Sistema a medida','Paneles, turnos, stock y automatizaciones.',['Gestión de clientes','Reportes y paneles','Desarrollo a medida'],'sistema','Cotizar sistema')])
def chips(items): return "".join(f'<span class="chip" style="--c:{c}">{n}</span>' for n, c in items)
stack = f'''<div class="stack__group card reveal"><h3>Interfaz</h3><div class="chips">{chips([("HTML5","#ff7a45"),("CSS3","#4d8dff"),("JavaScript","#f7df1e"),("React","#61dafb"),("Next.js","#ffffff")])}</div></div>
          <div class="stack__group card reveal"><h3>Servidor</h3><div class="chips">{chips([("Node.js","#6cc24a"),("Express","#e8ecff"),("EJS","#d9467a")])}</div></div>
          <div class="stack__group card reveal"><h3>Datos</h3><div class="chips">{chips([("MySQL","#01B0F9"),("Sequelize","#52b0e7")])}</div></div>'''
proc = ''.join(f'<article class="card reveal"><h3>{t}</h3><p>{d}</p></article>' for t, d in [("Conversamos","Nos contás tu negocio y qué querés lograr. Sin tecnicismos."),("Diseñamos y desarrollamos","Armamos una propuesta y la construimos con tu aprobación en cada etapa."),("Publicamos y acompañamos","Lanzamos tu proyecto y te damos soporte para que siga creciendo.")])
code = '<span class="ln"><span class="c">// lo que hacemos en Velta Web</span></span><span class="ln"><span class="k">const</span> <span class="f">velta</span> = {</span><span class="ln">  <span class="p">servicios</span>: [</span><span class="ln">    <span class="s">"Webs"</span>, <span class="s">"Landings"</span>,</span><span class="ln">    <span class="s">"E-commerce"</span>, <span class="s">"Sistemas"</span></span><span class="ln">  ],</span><span class="ln">  <span class="p">stack</span>: [<span class="s">"Node"</span>, <span class="s">"Express"</span>, <span class="s">"MySQL"</span>],</span><span class="ln">  <span class="p">diseño</span>: <span class="s">"adaptativo"</span></span><span class="ln">};</span><span class="ln"></span><span class="ln"><span class="k">async function</span> <span class="f">crearProyecto</span>(cliente) {</span><span class="ln">  <span class="k">await</span> <span class="f">disenar</span>(cliente);</span><span class="ln">  <span class="k">await</span> <span class="f">desarrollar</span>(cliente);</span><span class="ln">  <span class="k">return</span> <span class="s">"En línea"</span><span class="cur"></span>;</span><span class="ln">}</span>'
title = "Velta Web | Páginas web y tiendas online en Santiago del Estero"
graph = [ORG,
 {"@type":"WebSite","@id":SITE+"/#website","url":SITE+"/","name":"Velta Web","alternateName":["Velta","VeltaWeb"],"inLanguage":"es-AR","publisher":{"@id":SITE+"/#org"}},
 {"@type":"WebPage","@id":SITE+"/#webpage","url":SITE+"/","name":title,"isPartOf":{"@id":SITE+"/#website"},"about":{"@id":SITE+"/#org"},"inLanguage":"es-AR"},
 service("Landing pages","Páginas de aterrizaje rápidas y orientadas a conversión para campañas y lanzamientos.","/landing-pages/"),
 service("Tiendas online (e-commerce)","Tiendas online con carrito, pagos integrados y panel de administración.","/tiendas-online-ecommerce/"),
 service("Páginas web institucionales","Sitios web institucionales rápidos, responsive y optimizados para buscadores.","/paginas-web-santiago-del-estero/"),
 service("Sistemas a medida","Paneles de gestión, turnos, stock y automatizaciones a medida para empresas.","/sistemas-a-medida/"),
 faq_ld(FAQ)]
ld = json.dumps({"@context":"https://schema.org","@graph":graph}, ensure_ascii=False)
html = f'''<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="Velta Web: diseño y desarrollo de páginas web, landing pages, tiendas online y sistemas a medida en Santiago del Estero y toda Argentina. Pedí tu presupuesto.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="{SITE}/">
  <meta name="author" content="Velta Web">
  <meta name="geo.region" content="AR-G">
  <meta name="geo.placename" content="Santiago del Estero">
  <meta name="theme-color" content="#010715">
  <meta name="color-scheme" content="dark">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_AR">
  <meta property="og:site_name" content="Velta Web">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="Páginas web, landing pages, tiendas online y sistemas a medida para tu negocio. Desarrollo web en Santiago del Estero y toda Argentina.">
  <meta property="og:url" content="{SITE}/">
  <meta property="og:image" content="{SITE}/assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Velta Web: páginas web, tiendas online y sistemas a medida">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="Páginas web, landing pages, tiendas online y sistemas a medida. Desarrollo web en Santiago del Estero y toda Argentina.">
  <meta name="twitter:image" content="{SITE}/assets/og.png">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/fraunces-900.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/karla-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css?v={V}">
  <script type="application/ld+json">{ld}</script>
</head>
<body>
  {SPRITE}
  <div class="backdrop" aria-hidden="true"></div>
  <canvas id="bg" aria-hidden="true"></canvas>

  <header class="nav" id="nav">
    <div class="container nav__inner">
      <a href="/" class="brand" aria-label="Velta Web, inicio"><img src="/assets/logo.png" alt="Velta Web" width="{round(46*w/h)}" height="46"></a>
      <nav class="nav__links" id="menu" aria-label="Principal">
        <a href="#servicios">Servicios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#planes">Planes</a>
        <a href="#tecnologias">Tecnologías</a>
        <a href="#preguntas">Preguntas</a>
        <a {IGA} data-contact="general" class="btn btn--primary nav__cta">Cotizar proyecto</a>
      </nav>
      <div class="nav__right">
        <a {IGA} data-contact="general" class="btn btn--primary nav__cta-m">Cotizar</a>
        <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="container hero__grid">
        <div class="hero__text">
          <span class="pill"><i></i>Desarrollo web · Santiago del Estero, Argentina</span>
          <h1>Creamos sitios y sistemas <span class="grad">a la medida</span> de tu negocio</h1>
          <p class="lead">Desarrollamos páginas web, tiendas online y sistemas de gestión para que puedas mostrar, organizar y hacer crecer tu negocio.</p>
          <div class="actions">
            <a {IGA} data-contact="general" class="btn btn--primary">Empezar ahora {ic('arrow')}</a>
            <a href="#proyectos" class="btn btn--ghost">Ver proyectos</a>
          </div>
          <div class="hero__proof">
            <span>{ic('check')}Diseño 100% responsive</span>
            <span>{ic('check')}Paneles de administración</span>
            <span>{ic('check')}Para Argentina y el exterior</span>
          </div>
        </div>
        <div class="hero__visual" aria-hidden="true">
          <span class="float-chip fc1">{ic('check')}Diseño responsive</span>
          <div class="code">
            <div class="code__bar"><i></i><i></i><i></i><span class="code__tab">velta.config.js</span></div>
            <pre><code>{code}</code></pre>
            <div class="code__status"><span><i></i>En línea</span><span>JavaScript · UTF-8</span></div>
          </div>
          <span class="float-chip fc2">{ic('check')}SEO optimizado</span>
        </div>
      </div>
      <div class="container stats">
        <div class="reveal"><b>12</b><span>Proyectos y demos</span></div>
        <div class="reveal"><b>100%</b><span>Diseño responsive</span></div>
        <div class="reveal"><b>4</b><span>Tipos de solución</span></div>
        <div class="reveal"><b>A medida</b><span>Sin plantillas</span></div>
      </div>
    </section>

    <section class="section" id="servicios">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">01 · servicios</span>
          <h2>Todo lo que tu negocio necesita para brillar online</h2>
          <p class="sub">Desde una landing hasta un sistema de gestión completo: lo diseñamos y lo desarrollamos a tu medida.</p>
        </div>
        <div class="bento">
          {services}
        </div>
      </div>
    </section>

    <section class="section" id="proyectos">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">02 · proyectos</span>
          <h2>Mirá cómo se ve y cómo funciona</h2>
          <p class="sub">Tocá un proyecto y navegalo como si fuera el sitio real. Las tiendas y la hamburguesería incluyen su panel de administración.</p>
        </div>
        <div class="filters" id="filters" role="group" aria-label="Filtrar proyectos"></div>
        <div class="grid-proj" id="projects"></div>
      </div>
    </section>

    <section class="section" id="proceso">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">03 · proceso</span>
          <h2>Simple, claro y sin sorpresas</h2>
        </div>
        <div class="process">
          {proc}
        </div>
      </div>
    </section>

    <section class="section" id="planes">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">04 · planes</span>
          <h2>Elegí el punto de partida</h2>
          <p class="sub">Cada proyecto se presupuesta según lo que necesites. Contanos tu idea y te armamos una propuesta sin cargo.</p>
        </div>
        <div class="plans">
          {plans}
        </div>
      </div>
    </section>

    <section class="section" id="tecnologias">
      <div class="container">
        <div class="sec-head">
          <span class="eyebrow">05 · stack</span>
          <h2>Tecnologías modernas, listas para escalar</h2>
          <p class="sub">Un stack mantenible y rápido, elegido para que tu proyecto crezca sin rehacerlo.</p>
        </div>
        <div class="stack">
          {stack}
        </div>
      </div>
    </section>

    <section class="section" id="preguntas">
      <div class="container container--narrow faq-wrap">
        <div class="sec-head">
          <span class="eyebrow">06 · preguntas</span>
          <h2>Preguntas frecuentes</h2>
          <p class="sub">Lo que más nos consultan sobre páginas web y tiendas online.</p>
          <a {IGA} data-contact="general" class="btn btn--primary">Hacernos otra pregunta</a>
        </div>
        <div class="faq reveal">
{faq_html(FAQ)}
        </div>
      </div>
    </section>

    <section class="section" id="contacto">
      <div class="container">
        <div class="cta reveal">
          <h2>¿Listo para llevar tu negocio al siguiente nivel?</h2>
          <p>Contanos tu idea y te armamos una propuesta sin cargo.</p>
          <div class="cta__btns"><a class="btn btn--white" {IGA} data-contact="general">Hablar con Velta Web</a><a class="btn btn--outline" href="https://www.instagram.com/velta.web/" target="_blank" rel="noopener noreferrer">{ic('ig')} Seguinos en Instagram</a></div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__col"><img src="/assets/logo.png" alt="Velta Web" width="{round(46*w/h)}" height="46"><p>Desarrollo web en Santiago del Estero, Argentina. Páginas web, tiendas online y sistemas a medida.</p></div>
        <nav class="footer__col" aria-label="Servicios"><h4>Servicios</h4><a href="/paginas-web-santiago-del-estero/">Páginas web</a><a href="/landing-pages/">Landing pages</a><a href="/tiendas-online-ecommerce/">Tiendas online</a><a href="/sistemas-a-medida/">Sistemas a medida</a></nav>
        <div class="footer__col"><h4>Seguinos</h4><a class="social" href="https://www.instagram.com/velta.web/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Velta Web">{ic('ig')}<span>@velta.web</span></a></div>
      </div>
      <div class="footer__legal"><span>© <span id="year">2026</span> Velta Web</span><span>veltaweb.com.ar</span></div>
    </div>
  </footer>

  <div class="viewer" id="viewer" hidden role="dialog" aria-modal="true" aria-labelledby="vtitle">
    <div class="viewer__win">
      <div class="viewer__top">
        <div class="viewer__nav">
          <button id="vback" aria-label="Atrás"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
          <button id="vfwd" aria-label="Adelante"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          <button id="vreload" aria-label="Recargar"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg></button>
        </div>
        <div class="viewer__addr"><span id="vtitle">Demo</span><code id="vurl"></code></div>
        <div class="viewer__mode" id="vmode" hidden role="group" aria-label="Qué ver">
          <button data-m="site" class="on">Sitio</button>
          <button data-m="admin">Panel admin</button>
        </div>
        <div class="viewer__devices" id="vdevices">
          <button data-d="desktop" class="on" aria-label="Escritorio" title="Escritorio"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></button>
          <button data-d="tablet" aria-label="Tablet" title="Tablet"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M11 18h2"/></svg></button>
          <button data-d="mobile" aria-label="Celular" title="Celular"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/></svg></button>
        </div>
        <a id="vquiero" class="btn btn--primary viewer__cta" {IGA} data-contact="project">Quiero algo así</a>
        <button id="vclose" class="viewer__x" aria-label="Cerrar demo"><svg class="ico-svg" viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="viewer__stage" id="vstage" data-device="desktop">
        <iframe id="vframe" title="Demostración del proyecto" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" src="about:blank"></iframe>
      </div>
      <p class="viewer__hint">Copia de demostración: navegá libremente. Carrito, pagos y formularios están desactivados.</p>
    </div>
  </div>

  <script src="/js/contact.js?v={V}"></script>
  <script src="/js/bg.js?v={V}"></script>
  <script src="/js/main.js?v={V}"></script>
</body>
</html>
'''
open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8").write(html)
print("index.html", len(html))
