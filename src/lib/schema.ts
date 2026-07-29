/**
 * GENERADORES DE JSON-LD
 * ======================
 * Datos estructurados para que Google entienda que esto es un negocio local de
 * construcción, en qué comunas trabaja y qué modelos vende.
 *
 * Regla: si un dato no existe, se OMITE la propiedad. Nunca se rellena con un
 * valor inventado, porque un dato falso en el schema es peor que no tenerlo.
 */
import { SITE, DIRECCION, TELEFONO, HORARIOS, REDES, ZONA_DESPACHO, EMAIL } from '../config/site';
import { precioDesde, precioHasta, rangoM2, type DatosModelo } from './catalogo';

const ID_NEGOCIO = `${SITE.dominio}/#negocio`;
const ID_SITIO = `${SITE.dominio}/#sitio`;

function url(ruta: string): string {
  return `${SITE.dominio}${ruta}`;
}

/**
 * El negocio. Va en todas las páginas.
 * HomeAndConstructionBusiness es subtipo de LocalBusiness y es el que
 * corresponde a una empresa que construye y vende casas.
 */
export function negocioLocal() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ID_NEGOCIO,
    name: SITE.nombre,
    url: SITE.dominio,
    image: url('/images/og/portada.jpg'),
    logo: url('/images/og/portada.jpg'),
    description: SITE.descripcionCorta,
    telephone: TELEFONO.tel,
    ...(EMAIL ? { email: EMAIL } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${DIRECCION.calle}, ${DIRECCION.sector}`,
      addressLocality: DIRECCION.comuna,
      addressRegion: DIRECCION.region,
      addressCountry: DIRECCION.paisISO,
      ...(DIRECCION.codigoPostal ? { postalCode: DIRECCION.codigoPostal } : {}),
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: DIRECCION.geo.lat,
      longitude: DIRECCION.geo.lng,
    },
    openingHoursSpecification: HORARIOS.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema.map((d) => `https://schema.org/${d}`),
      opens: h.desde,
      closes: h.hasta,
    })),
    areaServed: ZONA_DESPACHO.map((comuna) => ({
      '@type': 'City',
      name: comuna,
      containedInPlace: { '@type': 'AdministrativeArea', name: DIRECCION.region },
    })),
    sameAs: REDES.map((r) => r.url),
    // priceRange se omite a propósito: no hay precios confirmados por el cliente.
  };
}

/** Solo en el home. */
export function sitioWeb() {
  return {
    '@type': 'WebSite',
    '@id': ID_SITIO,
    url: SITE.dominio,
    name: SITE.nombre,
    inLanguage: SITE.idioma,
    publisher: { '@id': ID_NEGOCIO },
  };
}

/** Solo en el home. */
export function organizacion() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.dominio}/#organizacion`,
    name: SITE.nombre,
    url: SITE.dominio,
    logo: url('/images/og/portada.jpg'),
    sameAs: REDES.map((r) => r.url),
  };
}

/** Migas. Van en todas las páginas menos el home. */
export function migaDePan(items: { nombre: string; ruta: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ nombre: 'Inicio', ruta: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nombre,
      item: url(item.ruta),
    })),
  };
}

/**
 * Ficha de modelo. Si no hay ningún precio cargado, se omite `offers` entero
 * en vez de inventar un valor: Google rechaza ofertas sin precio válido.
 */
export function productoModelo(datos: DatosModelo, ruta: string) {
  const desde = precioDesde(datos);
  const hasta = precioHasta(datos);
  const rango = rangoM2(datos);

  const producto: Record<string, unknown> = {
    '@type': 'Product',
    '@id': `${url(ruta)}#producto`,
    name: `Casa prefabricada ${datos.nombre}`,
    description: datos.resumen,
    url: url(ruta),
    image: datos.imagenes.map((img) => url(img.src)),
    brand: { '@type': 'Brand', name: SITE.nombre },
    category: 'Casas prefabricadas',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Superficie',
        value: rango.min === rango.max ? `${rango.min} m²` : `${rango.min} a ${rango.max} m²`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Estructura',
        value: datos.especificaciones.estructura,
      },
    ],
  };

  if (desde !== null && hasta !== null) {
    producto.offers =
      desde === hasta
        ? {
            '@type': 'Offer',
            price: desde,
            priceCurrency: 'CLP',
            availability: 'https://schema.org/InStock',
            url: url(ruta),
            seller: { '@id': ID_NEGOCIO },
          }
        : {
            '@type': 'AggregateOffer',
            lowPrice: desde,
            highPrice: hasta,
            priceCurrency: 'CLP',
            offerCount: datos.variantes.length,
            availability: 'https://schema.org/InStock',
            url: url(ruta),
            seller: { '@id': ID_NEGOCIO },
          };
  }

  return producto;
}

export function paginaFaq(preguntas: { pregunta: string; respuesta: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.respuesta,
      },
    })),
  };
}

/**
 * Empaqueta varios nodos en un solo bloque `@graph`. Un único <script> por
 * página, que es lo que recomienda Google.
 */
export function grafo(nodos: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodos,
  };
}
