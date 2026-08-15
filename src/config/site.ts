/**
 * ÚNICA FUENTE DE VERDAD DEL SITIO
 * ================================
 * Todo lo que el cliente puede querer cambiar sin tocar diseño vive acá:
 * teléfono, dirección, horarios, redes, textos legales y datos de analítica.
 *
 * Cómo leer las marcas:
 *   ⚠️ VERIFICAR  → el dato existe pero hay que confirmarlo con el cliente.
 *   ⚠️ PENDIENTE  → el dato NO existe todavía. No inventar: dejarlo así.
 *   ⚠️ REEMPLAZAR → es contenido de ejemplo y debe cambiarse antes de publicar.
 *
 * Regla de oro: si un dato aparece en dos lugares del sitio, se escribe una
 * sola vez acá. El NAP (nombre, dirección, teléfono) tiene que ser idéntico
 * carácter por carácter en el header, el footer, la página de casa piloto y el
 * JSON-LD, porque Google castiga las inconsistencias.
 */

export const SITE = {
  nombre: 'Casas Limache',
  nombreLegal: 'Casas Limache', // ⚠️ PENDIENTE razón social y RUT para el aviso legal
  dominio: 'https://casaslimache.cl',
  descripcionCorta:
    'Casas prefabricadas en la Región de Valparaíso. Casa piloto visitable en Villa Alemana, entrega inmediata y cotización directa por WhatsApp.',
  idioma: 'es-CL',
  locale: 'es_CL',
} as const;

/**
 * Teléfono. `e164` es el que usa el link de WhatsApp (sin +, sin espacios).
 * `visible` es el que lee una persona. `tel` es el del atributo href="tel:".
 */
export const TELEFONO = {
  e164: '56975510394', // ⚠️ VERIFICAR
  visible: '+56 9 7551 0394',
  tel: '+56975510394',
} as const;

/**
 * Dirección de la casa piloto.
 *
 * Nota de contexto (dato del cliente): el terreno queda justo en la salida de
 * Villa Alemana hacia Limache, así que administrativamente es Villa Alemana
 * pero mucha gente lo referencia como "camino a Limache". Por eso el NAP dice
 * Villa Alemana y la referencia se muestra aparte, como texto de apoyo.
 */
export const DIRECCION = {
  calle: 'Camino Troncal 06680',
  sector: 'Sector Lo Hidalgo',
  comuna: 'Villa Alemana',
  region: 'Región de Valparaíso',
  regionISO: 'CL-VS',
  pais: 'Chile',
  paisISO: 'CL',
  codigoPostal: '', // ⚠️ PENDIENTE
  /** Cómo se escribe la dirección completa en una línea. Reutilizar siempre esta. */
  completa: 'Camino Troncal 06680, Sector Lo Hidalgo, Villa Alemana, Región de Valparaíso',
  /** Aclaración humana, no forma parte del NAP. */
  referencia: 'En el camino de Villa Alemana hacia Limache, a la salida de Villa Alemana.',
  geo: {
    lat: -33.0358, // ⚠️ VERIFICAR
    lng: -71.2979, // ⚠️ VERIFICAR
  },
} as const;

/** Horario de atención de la casa piloto. */
export const HORARIOS = [
  {
    dias: 'Lunes a viernes',
    desde: '11:00',
    hasta: '18:00',
    nota: '',
    /** Formato schema.org */
    schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    dias: 'Sábados',
    desde: '11:00',
    hasta: '14:00',
    nota: 'previa coordinación',
    schema: ['Saturday'],
  },
] as const;

export const EMAIL = ''; // ⚠️ PENDIENTE — mientras esté vacío, el sitio no muestra email en ninguna parte.

export const REDES = [
  { nombre: 'Instagram', usuario: '@casaslimache', url: 'https://www.instagram.com/casaslimache/' },
  {
    nombre: 'Facebook',
    usuario: '/casasprefabricadaslimache',
    url: 'https://www.facebook.com/casasprefabricadaslimache',
  },
  { nombre: 'TikTok', usuario: '@casaslimaches', url: 'https://www.tiktok.com/@casaslimaches' },
] as const;

/**
 * Los tres formatos de compra. El `id` es el que usan los JSON de los modelos.
 * Cambiar un `id` acá obliga a cambiarlo en todos los JSON, así que mejor no.
 */
export const KITS = [
  {
    id: 'kit-basico',
    nombre: 'Kit Básico',
    resumen: 'La estructura completa de la casa, lista para que la termines tú o con tu maestro.',
    incluye: [
      'Paneles exteriores media luna 5"',
      'Tabiquería 2×3 con papel fieltro',
      'Paneles interiores con volcanita',
      'Techumbre',
    ],
  },
  {
    id: 'semifull',
    nombre: 'Semifull',
    resumen: 'El Kit Básico más las terminaciones principales.',
    // ⚠️ PENDIENTE: detalle exacto de lo que agrega Semifull sobre el Kit Básico.
    incluye: [],
  },
  {
    id: 'llave-en-mano',
    nombre: 'Llave en Mano',
    resumen: 'La casa terminada e instalada en tu terreno.',
    // ⚠️ PENDIENTE: detalle exacto de lo que incluye Llave en Mano.
    incluye: [],
  },
] as const;

export type KitId = (typeof KITS)[number]['id'];

/** Comunas donde se despacha. Alimenta el JSON-LD `areaServed` y el footer. */
export const ZONA_DESPACHO = [
  'Limache',
  'Olmué',
  'Villa Alemana',
  'Quilpué',
  'Quillota',
  'Viña del Mar',
  'Valparaíso',
  'La Calera',
  'Casablanca',
  'San Felipe',
  'Los Andes',
  'Concón',
] as const; // ⚠️ VERIFICAR si además se despacha fuera de la Región de Valparaíso.

/**
 * ⚠️ REEMPLAZAR — testimonios de ejemplo.
 * La estructura es la definitiva: cambiar solo los textos. Si el cliente no
 * tiene testimonios reales, borrar el array completo y la sección desaparece
 * del home sola.
 */
export const TESTIMONIOS = [
  {
    texto: '⚠️ REEMPLAZAR — testimonio real del cliente, entre 2 y 4 líneas, en sus palabras.',
    nombre: '⚠️ Nombre',
    comuna: '⚠️ Comuna',
    modelo: '⚠️ Modelo comprado',
  },
  {
    texto: '⚠️ REEMPLAZAR — testimonio real del cliente, entre 2 y 4 líneas, en sus palabras.',
    nombre: '⚠️ Nombre',
    comuna: '⚠️ Comuna',
    modelo: '⚠️ Modelo comprado',
  },
  {
    texto: '⚠️ REEMPLAZAR — testimonio real del cliente, entre 2 y 4 líneas, en sus palabras.',
    nombre: '⚠️ Nombre',
    comuna: '⚠️ Comuna',
    modelo: '⚠️ Modelo comprado',
  },
] as const;

/**
 * Analítica. Mientras estos IDs estén vacíos NO se carga ningún script de
 * terceros y el sitio no pierde puntos de rendimiento. El evento
 * `whatsapp_click` se dispara igual y queda en window.dataLayer.
 */
export const ANALITICA = {
  GA4_ID: '', // ⚠️ PENDIENTE — ej: 'G-XXXXXXXXXX'
  META_PIXEL_ID: '', // ⚠️ PENDIENTE
} as const;

/**
 * Modelo que se muestra en la foto del hero, con su ficha sobreimpresa.
 * Tiene que ser el `slug` de un archivo de src/content/modelos/.
 * Los metros, los dormitorios y los baños que aparecen sobre la foto salen de
 * ese JSON: no hay ningún dato escrito a mano encima de la imagen.
 *
 * ⚠️ VERIFICAR: la foto actual es un render genérico. Cuando el cliente entregue
 * la foto del modelo real, hay que dejar acá el slug que corresponda.
 */
export const HERO = {
  modelo: 'quillota',

  /**
   * Precio destacado sobre la foto del hero.
   *
   * ⚠️ VERIFICAR con el cliente antes de publicar: es el único precio visible
   * de todo el sitio. Las fichas de modelo siguen diciendo "Precio a cotizar"
   * porque los JSON de src/content/modelos/ tienen `precios` en null. Mientras
   * eso siga así, alguien puede ver $3.990.990 en la portada y no encontrar
   * ningún precio en la ficha del Quillota.
   *
   * `referencia` es el valor tachado (precio lista) y `oferta` el vigente.
   * Si `oferta` se deja en null, el bloque de precio desaparece del hero solo
   * y no queda un hueco ni un $0.
   */
  precio: {
    referencia: 4_990_990,
    oferta: 3_990_990,
  },
} as const;

/**
 * Rangos de dormitorios que sirven de entrada al catálogo filtrado desde el
 * hero. `min` y `max` documentan qué significa cada `id`; el filtro del catálogo
 * lo interpreta a partir del propio id.
 */
export const RANGOS = [
  { id: '1-2', etiquetaCorta: 'de 1 a 2 habitaciones', min: 1, max: 2 },
  { id: '3-5', etiquetaCorta: 'de 3 a 5 habitaciones', min: 3, max: 5 },
] as const;

export const LEGAL = {
  aviso:
    'Las imágenes del sitio son referenciales. Los metrajes, terminaciones y valores pueden variar según el proyecto y la comuna de destino. Los precios publicados no constituyen una oferta comercial cerrada: la cotización final la entrega una ejecutiva por WhatsApp.',
  anio: new Date().getFullYear(),
} as const;

/**
 * Navegación principal. El catálogo va primero a propósito.
 *
 * ⚠️ SEO: "Visítanos" es texto de enlace genérico. El anterior —"Casa piloto"—
 * le decía a Google de qué trata la página de destino; este no. La ruta sigue
 * siendo /casa-piloto/ y el título, el h1 y la miga de pan de esa página
 * mantienen el término, que es lo que sostiene el posicionamiento.
 */
export const NAV = [
  { texto: 'Catálogo', href: '/catalogo/' },
  { texto: 'Visítanos', href: '/casa-piloto/' },
  { texto: 'Nosotros', href: '/nosotros/' },
  { texto: 'Preguntas', href: '/preguntas-frecuentes/' },
] as const;
