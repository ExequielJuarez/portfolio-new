import sys,json,os; sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); from seo_data import *
V="20261026e"
IGA='href="https://ig.me/m/velta.web" target="_blank" rel="noopener noreferrer"'
IGSVG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>'
PAGES=[
dict(slug="paginas-web-santiago-del-estero",key="web",name="Páginas web",
 title="Páginas web en Santiago del Estero | Velta Web",
 desc="Diseño de páginas web profesionales en Santiago del Estero: rápidas, responsive y optimizadas para Google. Pedí tu presupuesto con Velta Web.",
 h1="Páginas web en <span class=\"grad\">Santiago del Estero</span>",
 lead="Diseñamos y desarrollamos páginas web profesionales para comercios, profesionales y empresas de Santiago del Estero y de toda Argentina.",
 prose=[("Una web que te encuentren y te elijan","Tener una página web propia te permite mostrar tus servicios las 24 horas, generar confianza y aparecer cuando tus clientes buscan en Google. Desde Santiago del Estero trabajamos con negocios de la capital, La Banda, Termas de Río Hondo y el interior de la provincia, y también de forma remota con clientes de otras provincias."),
        ("Rápidas, adaptables y pensadas para Google","Cada sitio se desarrolla a medida, sin plantillas genéricas, con carga veloz, diseño responsive para celulares, tablets y computadoras, y una estructura preparada para posicionarse en los buscadores.")],
 inc=["Diseño a medida y adaptativo","Secciones y textos pensados para tu negocio","Optimización SEO básica: títulos, descripciones y velocidad","Botones de contacto directo por Instagram o WhatsApp","Panel para editar contenido, si lo necesitás","Asesoramiento para dominio y publicación"],
 faq=[("¿Cuánto cuesta una página web en Santiago del Estero?","Se presupuesta según la cantidad de secciones y las funciones que necesites. Contanos tu proyecto y te armamos una propuesta sin cargo."),
      ("¿Puedo editar el contenido yo mismo?","Sí, podemos incluir un panel para que modifiques textos e imágenes sin saber programar."),
      ("¿Mi página va a aparecer en Google?","Dejamos el sitio optimizado para buscadores: estructura, velocidad y datos técnicos. Los resultados en Google también dependen del tiempo y de la competencia, por eso no prometemos posiciones puntuales.")],
 price=None, related=["landing-pages","tiendas-online-ecommerce","sistemas-a-medida"]),
dict(slug="tiendas-online-ecommerce",key="ecommerce",name="Tiendas online",
 title="Tiendas online y e-commerce en Argentina | Velta Web",
 desc="Creamos tiendas online a medida con carrito, pagos integrados y panel de administración. Velta Web, desarrollo web en Santiago del Estero.",
 h1="Tiendas online y <span class=\"grad\">e&#8209;commerce en Argentina</span>",
 lead="Creamos tiendas online a medida para que vendas tus productos a todo el país y al exterior, con carrito, favoritos, pagos integrados y un panel para administrar todo.",
 prose=[("Vendé las 24 horas","Una tienda online te permite recibir pedidos en cualquier momento, ordenar tu catálogo y llevar el control de tus ventas desde un panel de administración simple."),
        ("Hecha a medida, con ejemplos reales","En nuestro portfolio podés recorrer tiendas de indumentaria y de otros rubros, ver cómo se compra y entrar al panel de administración con pedidos de ejemplo: <a class=\"more\" href=\"/#proyectos\">ver proyectos</a>.")],
 inc=["Catálogo con categorías y fichas de producto","Carrito de compras y favoritos","Pagos integrados","Panel de administración: productos, pedidos y reportes de ventas","Diseño responsive para comprar desde el celular","Base de datos y soporte"],
 faq=[("¿Cuánto cuesta una tienda online?","Depende de la cantidad de productos y de las funciones que necesites. Te armamos una propuesta sin cargo."),
      ("¿Puedo administrar la tienda yo mismo?","Sí. Incluye un panel de administración para cargar productos, cambiar precios, ver pedidos y reportes de ventas."),
      ("¿Puedo vender a todo el país y al exterior?","Sí, la tienda puede recibir clientes de cualquier lugar. Los medios de pago y de envío se definen según tu caso.")],
 price=None, related=["landing-pages","paginas-web-santiago-del-estero","sistemas-a-medida"]),
dict(slug="landing-pages",key="landing",name="Landing pages",
 title="Landing pages que convierten | Velta Web Argentina",
 desc="Landing pages rápidas, adaptables y orientadas a conseguir consultas. Velta Web, desarrollo web en Santiago del Estero.",
 h1="Landing pages que <span class=\"grad\">convierten visitas en clientes</span>",
 lead="Una landing page es una página enfocada en una sola acción: que te escriban, te llamen o compren. Rápida, clara y pensada para convertir.",
 prose=[("Ideal para campañas y lanzamientos","Si vas a promocionar un servicio, un producto o una oferta, una landing concentra todo el mensaje en un solo lugar y le facilita a tu cliente dar el siguiente paso, sin distracciones."),
        ("Clara, veloz y adaptable","Cuidamos el diseño, la velocidad de carga y que se vea perfecta en el celular, donde hoy llega la mayoría de las visitas. Ya armamos landings para distintos rubros, como odontología, abogacía, veterinaria y medicina, que podés ver en nuestros proyectos.")],
 inc=["Diseño adaptativo para celular y computadora","Contacto directo por Instagram o WhatsApp","SEO básico y carga veloz","Estructura orientada a conversión","Botones de acción y formularios"],
 faq=[("¿Cuánto cuesta una landing page?","Depende del contenido y de las funciones que necesites. Te armamos una propuesta sin cargo."),
      ("¿En cuánto tiempo está lista?","Es el proyecto más rápido de armar. El plazo depende del contenido que tengas preparado y te lo confirmamos en la propuesta."),
      ("¿Puedo pasar después a una web completa?","Sí, una landing puede crecer hacia un sitio de varias secciones o una tienda online.")],
 price=None, related=["paginas-web-santiago-del-estero","tiendas-online-ecommerce","sistemas-a-medida"]),
dict(slug="sistemas-a-medida",key="sistema",name="Sistemas a medida",
 title="Sistemas de gestión a medida para empresas | Velta Web",
 desc="Desarrollamos sistemas a medida: ventas, stock, clientes, turnos y reportes adaptados a tu negocio. Velta Web, Santiago del Estero y toda Argentina.",
 h1="Sistemas de gestión <span class=\"grad\">a medida para tu negocio</span>",
 lead="Desarrollamos sistemas para controlar ventas, stock, clientes, turnos y reportes, adaptados a cómo trabaja tu negocio.",
 prose=[("Dejá las planillas y los cuadernos","Si hoy llevás tu negocio en planillas o a mano, un sistema a medida ordena la información, evita errores y te muestra cómo viene el negocio en tiempo real."),
        ("Pensado para tu rubro","No usamos una solución genérica: definimos con vos qué necesitás y lo desarrollamos. En el portfolio hay una demo navegable de un sistema para comercios con punto de venta, caja, stock, clientes, facturas y reportes: <a class=\"more\" href=\"/#proyectos\">ver proyectos</a>.")],
 inc=["Punto de venta y caja","Control de stock y productos","Clientes y proveedores","Compras y comprobantes internos","Reportes y paneles de control","Usuarios con permisos por rol"],
 faq=[("¿Cuánto cuesta un sistema a medida?","Se cotiza según lo que necesites. Contanos tu caso y te armamos una propuesta sin cargo."),
      ("¿Puedo ver un ejemplo?","Sí. En la sección de proyectos hay una demo navegable de un sistema de gestión para comercios."),
      ("¿Se usa desde el celular?","El sistema funciona desde el navegador, por lo que podés acceder desde cualquier dispositivo con internet.")],
 price=None, related=["paginas-web-santiago-del-estero","landing-pages","tiendas-online-ecommerce"]),
]
BY={p['slug']:p for p in PAGES}
def ic(n): return f'<svg class="ico-svg" aria-hidden="true"><use href="#i-{n}"/></svg>'
SPRITE='''<svg class="sprite" aria-hidden="true" focusable="false"><defs>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor"/></symbol>
</defs></svg>'''
def page(p):
    url=f"{SITE}/{p['slug']}/"
    off=None
    ld=[ORG,{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":SITE+"/"},{"@type":"ListItem","position":2,"name":p['name'],"item":url}]},
        service(p['name'],p['desc'],f"/{p['slug']}/",off),faq_ld(p['faq'])]
    ldj=json.dumps({"@context":"https://schema.org","@graph":ld},ensure_ascii=False)
    prose="".join(f"<h2>{h}</h2><p>{t}</p>" for h,t in p['prose'])
    inc="".join(f"<li>{x}</li>" for x in p['inc'])
    pricebox='<span class="quote">Presupuesto a medida</span><p class="price-note">Te armamos una propuesta sin cargo según lo que necesites.</p>'
    cta={"web":"Cotizar mi web","ecommerce":"Quiero mi tienda","landing":"Quiero mi landing","sistema":"Cotizar mi sistema"}[p['key']]
    rel="".join(f'<a href="/{x}/">{BY[x]["name"]}</a>' for x in p['related'])
    faq="\n".join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in p['faq'])
    return f'''<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{p['title']}</title>
  <meta name="description" content="{p['desc']}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="{url}">
  <meta name="geo.region" content="AR-G">
  <meta name="geo.placename" content="Santiago del Estero">
  <meta name="theme-color" content="#010715">
  <meta name="color-scheme" content="dark">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_AR">
  <meta property="og:site_name" content="Velta Web">
  <meta property="og:title" content="{p['title']}">
  <meta property="og:description" content="{p['desc']}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{SITE}/assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{p['title']}">
  <meta name="twitter:description" content="{p['desc']}">
  <meta name="twitter:image" content="{SITE}/assets/og.png">
  <link rel="icon" href="/assets/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/fonts/fraunces-900.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/karla-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css?v={V}">
  <script type="application/ld+json">{ldj}</script>
</head>
<body>
  {SPRITE}
  <div class="backdrop" aria-hidden="true"></div>
  <canvas id="bg" aria-hidden="true"></canvas>
  <header class="nav nav--simple scrolled">
    <div class="container nav__inner">
      <a href="/" class="brand" aria-label="Velta Web, inicio"><img src="/assets/logo.png" alt="Velta Web" width="148" height="50"></a>
      <nav class="nav__links" aria-label="Principal">
        <a href="/#servicios">Servicios</a><a href="/#proyectos">Proyectos</a><a href="/#planes">Planes</a>
        <a {IGA} data-contact="{p['key']}" class="btn btn--primary nav__cta">Cotizar proyecto</a>
      </nav>
    </div>
  </header>
  <main>
    <section class="page-hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Ruta"><a href="/">Inicio</a> / <span>{p['name']}</span></nav>
        <h1>{p['h1']}</h1>
        <p class="lead">{p['lead']}</p>
        <div class="actions"><a {IGA} data-contact="{p['key']}" class="btn btn--primary">{cta} {ic('arrow')}</a><a href="/#proyectos" class="btn btn--ghost">Ver ejemplos</a></div>
      </div>
    </section>
    <section class="section">
      <div class="container page-grid">
        <div class="prose">
          {prose}
          <h2>Qué incluye</h2>
          <ul class="checklist">{inc}</ul>
          <h2>Cómo trabajamos</h2>
          <ol class="steps"><li><b>Conversamos</b>Nos contás tu negocio y qué querés lograr.</li><li><b>Diseñamos y desarrollamos</b>Armamos una propuesta y la desarrollamos con tu aprobación en cada etapa.</li><li><b>Publicamos y acompañamos</b>Lanzamos tu proyecto y te damos soporte para que siga creciendo.</li></ol>
          <h2>Preguntas frecuentes</h2>
          <div class="faq">
{faq}
          </div>
        </div>
        <aside class="side">
          <div class="card">
            <h3>{p['name']}</h3>
            {pricebox}
            <a {IGA} data-contact="{p['key']}" class="btn btn--primary">{cta}</a>
          </div>
          <div class="card"><h3>Otros servicios</h3><div class="related">{rel}</div></div>
        </aside>
      </div>
    </section>
    <section class="section section--tint"><div class="container"><div class="cta"><h2>¿Hablamos de tu proyecto?</h2><p>Contanos tu idea y te armamos una propuesta sin cargo.</p><div class="cta__btns"><a class="btn btn--white" {IGA} data-contact="{p['key']}">Hablar con Velta Web</a><a class="btn btn--outline" href="https://www.instagram.com/velta.web/" target="_blank" rel="noopener noreferrer">{ic('ig')} Seguinos en Instagram</a></div></div></div></section>
  </main>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__col"><img src="/assets/logo.png" alt="Velta Web" width="136" height="46"><p>Desarrollo web en Santiago del Estero, Argentina. Páginas web, tiendas online y sistemas a medida.</p></div>
        <nav class="footer__col" aria-label="Servicios"><h4>Servicios</h4><a href="/paginas-web-santiago-del-estero/">Páginas web</a><a href="/landing-pages/">Landing pages</a><a href="/tiendas-online-ecommerce/">Tiendas online</a><a href="/sistemas-a-medida/">Sistemas a medida</a></nav>
        <div class="footer__col"><h4>Seguinos</h4><a class="social" href="https://www.instagram.com/velta.web/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Velta Web">{ic('ig')}<span>@velta.web</span></a></div>
      </div>
      <div class="footer__legal"><span>© 2026 Velta Web</span><span>veltaweb.com.ar</span></div>
    </div>
  </footer>
  <script src="/js/contact.js?v={V}"></script>
  <script src="/js/bg.js?v={V}"></script>
</body>
</html>'''
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for p in PAGES:
    os.makedirs(os.path.join(ROOT,p['slug']),exist_ok=True)
    open(os.path.join(ROOT,p['slug'],"index.html"),"w",encoding="utf-8").write(page(p))
print("páginas:",[p['slug'] for p in PAGES])
