import json
SITE="https://veltaweb.com.ar"
IG="https://www.instagram.com/velta.web/"
FAQ=[
("¿Hacen páginas web en Santiago del Estero?","Sí. Velta Web está en Santiago del Estero y desarrolla páginas web, landing pages, tiendas online y sistemas a medida para negocios de la capital, La Banda, Termas de Río Hondo y el interior de la provincia, además de clientes de toda Argentina."),
("¿Trabajan con clientes de otras provincias y del exterior?","Sí. Trabajamos de forma 100% remota con clientes de toda Argentina y de otros países, por videollamada o chat."),
("¿Cuánto cuesta una página web?","Depende del alcance: cantidad de secciones, funciones y diseño. Contanos qué necesitás y te armamos una propuesta sin cargo, adaptada a tu proyecto."),
("¿Qué incluye una tienda online?","Catálogo de productos, carrito de compras, favoritos, pagos integrados y un panel de administración para cargar productos y ver pedidos."),
("¿Mi sitio se va a ver bien en el celular?","Sí. Todos nuestros proyectos son responsive: se adaptan a celulares, tablets y computadoras. Lo probamos en distintos tamaños de pantalla antes de entregarlo."),
("¿Cómo contratar un programador web en Santiago del Estero?","Escribinos por Instagram desde el botón «Hablar con Velta Web» y contanos qué necesitás: una página, una tienda online o un sistema. Te respondemos, definimos el alcance con vos y te pasamos un presupuesto sin cargo. Trabajamos de forma presencial o remota."),
("¿Conviene un programador freelance o una agencia web?","Con Velta Web tenés trato directo con quienes programan tu proyecto, sin intermediarios, y a la vez un equipo que diseña, desarrolla, publica y da soporte. Todo a medida, sin plantillas genéricas."),
("¿Cómo empiezo?","Escribinos por Instagram desde el botón «Hablar con Velta Web», contanos tu idea y te armamos una propuesta sin cargo."),
]
def faq_ld(items): return {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in items]}
def faq_html(items): return "\n".join(f'          <details><summary>{q}</summary><p>{a}</p></details>' for q,a in items)
ORG={"@type":["ProfessionalService","LocalBusiness"],"@id":SITE+"/#org","name":"Velta Web","alternateName":["Velta","VeltaWeb","Velta Web programadores"],"url":SITE+"/","slogan":"Programadores web en Santiago del Estero y toda Argentina",
 "logo":{"@type":"ImageObject","url":SITE+"/assets/icon-512.png"},"image":SITE+"/assets/og.png",
 "description":"Diseño y desarrollo de páginas web, landing pages, tiendas online (e-commerce) y sistemas a medida en Santiago del Estero y toda Argentina.",
 "address":{"@type":"PostalAddress","addressLocality":"Santiago del Estero","addressRegion":"Santiago del Estero","addressCountry":"AR"},
 "areaServed":[{"@type":"City","name":"Santiago del Estero"},{"@type":"City","name":"La Banda"},{"@type":"City","name":"Termas de Río Hondo"},{"@type":"State","name":"Santiago del Estero"},{"@type":"Country","name":"Argentina"}],"knowsAbout":["Programación web","Desarrollo de páginas web","Tiendas online","E-commerce","Landing pages","Sistemas de gestión a medida","SEO"],"serviceType":["Programador web","Desarrollo de páginas web","Desarrollo de tiendas online","Sistemas a medida"],
 "knowsLanguage":"es","sameAs":[IG]}
def offers(ars,usd): return [{"@type":"Offer","price":ars,"priceCurrency":"ARS","eligibleRegion":"AR","priceSpecification":{"@type":"PriceSpecification","price":ars,"priceCurrency":"ARS","minPrice":ars}},{"@type":"Offer","price":usd,"priceCurrency":"USD","priceSpecification":{"@type":"PriceSpecification","price":usd,"priceCurrency":"USD","minPrice":usd}}]
def service(name,desc,path,off=None):
    s={"@type":"Service","@id":SITE+path+"#service","name":name,"description":desc,"provider":{"@id":SITE+"/#org"},"areaServed":[{"@type":"Country","name":"Argentina"}],"url":SITE+path}
    if off: s["offers"]=off
    return s
