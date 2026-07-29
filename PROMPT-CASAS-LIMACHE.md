# PROMPT — Sitio web Casas Limache (casas prefabricadas, Región de Valparaíso)

> Pega este documento completo como primer mensaje en Claude Code o Antigravity.
> Todo lo marcado con `⚠️ VERIFICAR` debe confirmarse con el cliente antes de publicar.

---

## 0. Paso previo obligatorio (antes de escribir una sola línea de código)

1. Instala y usa estas skills de diseño. Son la vara de calidad, no una sugerencia:
   ```bash
   npx skills add pbkaus/impeccable
   npx skills add taste     # o el identificador correcto del registry
   ```
   Si el comando falla, continúa igual pero aplica los principios de la sección **5. Dirección de diseño** con el mismo rigor.
2. Lee este documento entero. No empieces a codear hasta terminar el **Paso 5.1 (plan de diseño + autocrítica)**.
3. No inventes datos comerciales (precios, plazos, garantías, cantidad de casas entregadas). Todo dato que no esté en la sección 1 va como placeholder explícito en el archivo de configuración.

---

## 1. Contexto del negocio (datos reales)

| Campo | Valor |
|---|---|
| Nombre | **Casas Limache** |
| Rubro | Venta y construcción de casas prefabricadas |
| Zona de operación | Región de Valparaíso: Limache, Olmué, Quillota, Villa Alemana, Quilpué, Viña del Mar, Valparaíso, La Calera, San Felipe, Los Andes ⚠️ VERIFICAR alcance nacional |
| WhatsApp / ejecutivas | **+56 9 7551 0394** ⚠️ VERIFICAR |
| Casa piloto | Camino Troncal 06680, sector Lo Hidalgo, Villa Alemana ⚠️ VERIFICAR (el sitio actual también dice "inicio Limache") |
| Horario | Lunes a viernes 11:00–18:00 · Sábados 11:00–14:00 (previa coordinación) |
| Instagram | @casaslimache |
| Facebook | /casasprefabricadaslimache |
| TikTok | @casaslimaches |
| Coordenadas aprox. casa piloto | -33.0358, -71.2979 ⚠️ VERIFICAR |
| Email | ⚠️ PENDIENTE — dejar placeholder en config |

**Propuesta de valor (usar como base del copy):**
- Entrega inmediata en modelos estándar.
- Casa piloto visitable: el cliente toca la casa antes de comprar. Este es el diferenciador principal frente a la competencia online.
- Tres formatos de compra: **Kit Básico**, **Semifull** y **Llave en Mano**.
- Kit Básico incluye: paneles exteriores media luna 5", tabiquería 2×3 con papel fieltro, paneles interiores con volcanita y techumbre.
- Atención directa con ejecutiva por WhatsApp, sin formularios que nadie responde.

**Advertencia:** el sitio actual (casaslimache.cl) es WordPress + Elementor, está mal estructurado y es visualmente pobre. **No lo tomes como referencia de diseño ni copies su estructura, su copy ni su jerarquía.** Solo sirvió para extraer los datos de la tabla de arriba.

---

## 2. Objetivo del proyecto

Construir un sitio estático, rapidísimo, mobile-first y con SEO local agresivo, cuyo único objetivo de conversión es **abrir un chat de WhatsApp con un mensaje precotizado**. No hay carrito, no hay checkout, no hay formulario de contacto largo.

Métrica de éxito: que una persona en el celular, buscando "casas prefabricadas Limache" en Google, llegue al sitio, encuentre un modelo, elija metraje y tipo de kit, y toque un botón que le abra WhatsApp con todo el contexto escrito. En menos de 60 segundos.

---

## 3. Stack técnico

**Usa Astro 5 + TypeScript + CSS propio (design tokens con custom properties).**

Justificación (respétala):
- Astro pre-renderiza HTML estático: cada modelo de casa es una URL real e indexable por Google. Una SPA con catálogo renderizado en JS mataría el SEO, que es el requisito central.
- Cero JS por defecto; solo se hidrata la isla del configurador de cotización.
- Content Collections con esquema Zod = catálogo escalable con validación: agregar un modelo es agregar un archivo, y si falta un campo el build falla.
- **No uses Tailwind, ni Bootstrap, ni shadcn, ni un theme.** El sitio no puede parecer una plantilla. CSS propio con tokens, `clamp()` para tipografía fluida y CSS Grid.

Complementos permitidos: `@astrojs/sitemap`, `astro:assets` (optimización de imágenes), `astro-seo` o metadatos propios. Nada más.

**Deploy:** salida estática (`output: 'static'`) para subir a Netlify, Vercel o Cloudflare Pages. Incluye `netlify.toml` y `vercel.json` con headers de caché.

---

## 4. Arquitectura de archivos

```
casas-limache/
├── src/
│   ├── config/
│   │   └── site.ts              ← ÚNICA fuente de verdad: teléfono, dirección,
│   │                              horarios, redes, email, coordenadas, textos legales
│   ├── content/
│   │   ├── config.ts            ← esquema Zod de la colección "modelos"
│   │   └── modelos/
│   │       ├── limache.json
│   │       ├── olmue.json
│   │       └── ...              ← 1 archivo = 1 modelo de casa
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ModeloCard.astro
│   │   ├── CatalogoGrid.astro
│   │   ├── Galeria.astro
│   │   ├── CotizadorWhatsApp.tsx   ← única isla interactiva
│   │   ├── FichaTecnica.astro
│   │   ├── FAQ.astro
│   │   ├── MapaCasaPiloto.astro
│   │   ├── WhatsAppFloat.astro     ← botón flotante persistente
│   │   └── Footer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro     ← todos los metadatos SEO viven acá
│   │   └── ModeloLayout.astro
│   ├── pages/
│   │   ├── index.astro                  → /
│   │   ├── catalogo.astro               → /catalogo/
│   │   ├── modelos/[slug].astro         → /modelos/limache/
│   │   ├── casas-prefabricadas-[comuna].astro  → landings SEO locales
│   │   ├── nosotros.astro
│   │   ├── preguntas-frecuentes.astro
│   │   ├── casa-piloto.astro
│   │   ├── 404.astro
│   │   ├── robots.txt.ts
│   │   └── sitemap-index.xml (vía integración)
│   ├── styles/
│   │   ├── tokens.css           ← paleta, escala tipográfica, espaciado, radios
│   │   └── global.css
│   └── lib/
│       ├── whatsapp.ts          ← constructor del deep link
│       └── schema.ts            ← generadores de JSON-LD
├── public/
│   ├── images/
│   │   ├── modelos/             ← ⚠️ CARPETA CLAVE (ver sección 8)
│   │   ├── casa-piloto/
│   │   ├── proceso/
│   │   ├── og/
│   │   └── brand/
│   ├── favicon.svg
│   └── site.webmanifest
├── IMAGENES.md                  ← manual para reemplazar fotos
├── AGREGAR-MODELO.md            ← manual para agregar un modelo nuevo
└── README.md
```

---

## 5. Dirección de diseño (lo más importante: que NO parezca genérica)

### 5.1 Proceso obligatorio antes de codear

Escribe en el chat, antes de tocar código:

1. **Tres direcciones creativas** en una línea cada una, ancladas en el mundo real del sujeto: el valle de Limache, la palta y el olivo, el pino radiata sin pintar, la neblina del cerro, los planos de arquitecto, la tabiquería a la vista, la luz del Marga Marga. No en "casas modernas genéricas".
2. **Elige una y justifícala.** Define tokens concretos:
   - **Color:** 4–6 hex con nombre propio derivado del sujeto.
   - **Tipografía:** dos familias mínimo (display con carácter usada con moderación + body legible). Nada de Inter + Playfair. Considera familias con personalidad y buena disponibilidad web.
   - **Layout:** describe la retícula en una frase + wireframe ASCII del home y del detalle de modelo.
   - **Elemento firma:** *la* cosa por la que se recuerda el sitio. Uno solo, ejecutado impecablemente.
3. **Autocrítica:** relee tu plan y pregúntate: "¿esto es lo que habría producido para cualquier constructora?". Si la respuesta es sí en algún eje, cámbialo y explica qué cambiaste.

### 5.2 Prohibiciones explícitas (evitar el "look de IA")

- ❌ Fondo crema #F4F1EA + serif de alto contraste + acento terracota (#D97757 y vecinos). Es el default de IA más reconocible que existe.
- ❌ Negro casi puro + un acento verde ácido o bermellón.
- ❌ Layout tipo diario: filos capilares, radio 0 en todo, columnas densas de periódico.
- ❌ Gradientes morado→azul, glassmorphism, blobs SVG decorativos.
- ❌ Marcadores numerados 01 / 02 / 03 salvo que el contenido sea realmente una secuencia (el proceso de compra sí lo es; los beneficios no).
- ❌ Íconos genéricos de librería puestos "para llenar". Si usas íconos, que sean un set coherente y con propósito.
- ❌ Stock de "familia feliz sonriendo". Las fotos son placeholders (sección 8).
- ❌ Copy de relleno tipo "Calidad, confianza y compromiso" o "Transformamos sueños en realidad".

### 5.3 Piso de calidad no negociable

- Responsive real desde 320px. Mobile-first, no "desktop achicado".
- Foco de teclado visible y con contraste. Navegación completa por teclado.
- `prefers-reduced-motion: reduce` respetado en toda animación.
- Contraste AA mínimo (4.5:1 texto normal, 3:1 texto grande).
- Áreas táctiles ≥ 44×44px.
- Sin *layout shift*: todas las imágenes con `width`/`height` o `aspect-ratio`.
- Cuidado con la especificidad CSS: no dejes clases que se anulen entre sí (típico con paddings de `.section` vs `.cta`).

### 5.4 Movimiento

Una secuencia orquestada al cargar el hero vale más que veinte micro-animaciones sueltas. Reveals al scroll con `IntersectionObserver`, sutiles y con `will-change` bien acotado. Si dudas, quita.

---

## 6. Estructura del sitio, página por página

### 6.1 Home (`/`)

**A. Hero — con la estructura de la referencia adjunta (imagen 1), NO con su diseño.**

Lo que se copia es la *arquitectura de información*, no la identidad visual (no clones colores, tipografía ni forma de Trupanel):

```
┌──────────────────────────────────────────────────────────┐
│  [eyebrow: "Casa piloto abierta en Villa Alemana"]       │
│                                                          │
│  TITULAR GRANDE EN DOS LÍNEAS                            │  [imagen
│  (el eslogan principal)                                  │   recortada
│                                                          │   con forma
│  ┌────────────────┐  ┌────────────────┐                  │   propia]
│  │ Casas de 1 a 2 │  │ Casas de 3 a 5 │                  │
│  │ habitaciones   │  │ habitaciones   │                  │
│  │ Desde 36 m²    │  │ Hasta 120 m²   │                  │
│  └────────────────┘  └────────────────┘                  │
├──────────────────────────────────────────────────────────┤
│  FRANJA CTA: "Elige tu modelo con nosotros"   [WHATSAPP] │
└──────────────────────────────────────────────────────────┘
```

- Eslogan: propón 3 opciones en el chat y usa la mejor. Debe nombrar el producto y el territorio (sirve para SEO y para el usuario). Ejemplo de calibre, no para copiar literal: *"Tu casa prefabricada, armada en el valle de Limache"*.
- Las dos tarjetas de rango deben ser **enlaces reales** al catálogo filtrado (`/catalogo/?rango=1-2`).
- La franja CTA inferior lleva al WhatsApp genérico (sin modelo, mensaje "Hola, quiero información sobre casas prefabricadas").
- Debajo del hero, un `<h1>` visible que contenga "casas prefabricadas" + "Limache".

**B. Barra de confianza:** años de experiencia ⚠️, entrega inmediata, casa piloto visitable, despacho en la V Región. Sin inventar cifras.

**C. Catálogo destacado:** grid de 6 modelos destacados (`destacado: true` en el JSON) + **botón grande "Ver catálogo completo"** que va a `/catalogo/`. Este botón es un requisito explícito del cliente: debe ser imposible de no ver.

**D. "¿Qué incluye cada kit?":** comparación clara Kit Básico / Semifull / Llave en Mano, en tabla comparativa en desktop y en acordeón o tarjetas apiladas en móvil. Usa el contenido real del Kit Básico de la sección 1.

**E. Proceso en 4 pasos** (acá sí corresponde numerar, porque es una secuencia): Eliges el modelo → Cotizas por WhatsApp → Visitas la casa piloto → Fabricamos y entregamos.

**F. Casa piloto:** foto placeholder, dirección, horarios, mapa embebido *lazy* (no cargues el iframe de Google Maps hasta el scroll o hasta un click; mata el LCP) y botón "Cómo llegar" a Google Maps.

**G. Testimonios:** 3–4 con estructura lista para reemplazar, marcados como `⚠️ REEMPLAZAR` en el config.

**H. FAQ:** 8 preguntas reales (permisos, plazos, despacho, radier, financiamiento, garantía, formas de pago, qué necesito en el terreno). Va con JSON-LD `FAQPage`.

**I. Footer:** NAP completo y consistente, redes, enlaces a todos los modelos (bueno para el crawl interno), landings por comuna, aviso legal.

**J. Botón flotante de WhatsApp** persistente en móvil, sin tapar contenido, con `aria-label` correcto.

### 6.2 Catálogo (`/catalogo/`)

- Grid responsivo de tarjetas: 1 col (≤480px), 2 col (≤900px), 3 col (>900px).
- Cada tarjeta: imagen placeholder con `aspect-ratio` fijo, nombre del modelo, m² base, dormitorios, baños, precio "desde" o "Consultar", y toda la tarjeta clickeable hacia `/modelos/[slug]/`.
- Filtros del lado cliente **sin romper el SEO**: los filtros solo ocultan/muestran nodos ya presentes en el HTML. Filtros: rango de m², n° de dormitorios, tipo de kit, rango de precio. Estado reflejado en la querystring.
- Orden por: destacados, menor m², mayor m², menor precio.
- Estado vacío con dirección: "Ningún modelo calza con ese filtro. Escríbenos y lo adaptamos." + botón WhatsApp.

### 6.3 Detalle de modelo (`/modelos/[slug]/`) — la página que más importa

Estructura tomada de la referencia (imagen 2), con identidad propia:

```
DESKTOP                                  MÓVIL
┌───────────────┬──────────────────┐     galería full-width
│               │ 120 m²           │     ↓
│   GALERÍA     │ VALPARAÍSO       │     ficha
│   (imagen     │ Desde $XX.XXX.XXX│     ↓
│   principal   │ ─────────────────│     selector metraje
│   + thumbs)   │ 🍳 4🛏 3🚿 🛋 4💧 │     ↓
│               │ ─────────────────│     selector kit
│               │ [100m²][83m²]... │     ↓
│               │ Kits disponibles │     [COTIZAR] sticky
│               │ • Kit Básico     │       al fondo
│               │ • Semifull       │
│               │ • Llave en Mano  │
│               │ [VER KITS][COTIZAR WSP]│
└───────────────┴──────────────────┘
```

Debajo de la ficha:
1. **Descripción larga** del modelo (2–4 párrafos, escritos por ti, específicos y sin humo).
2. **Especificaciones técnicas** en tabla: superficie, dormitorios, baños, aguas, altura, estructura, revestimiento exterior/interior, techumbre, ventanas, aislación.
3. **Qué incluye / qué no incluye** cada kit para *este* modelo. Ser explícito con lo que NO incluye (radier, instalaciones, permisos) genera confianza y evita leads malos.
4. **Plano / distribución:** placeholder de imagen.
5. **Modelos relacionados:** 3 tarjetas.
6. **CTA final** a WhatsApp.

**Comportamiento del selector (isla interactiva):**
- Al elegir un metraje, cambian en vivo: el precio mostrado, los m², dormitorios/baños si difieren, y el mensaje de WhatsApp.
- Al elegir tipo de kit, cambia el precio y el mensaje.
- El metraje base viene preseleccionado.
- Todo el contenido de todas las variantes se renderiza en el HTML (oculto con CSS/atributos), para que Google lo indexe. No cargues variantes por fetch.
- El botón "Cotizar" es sticky al fondo en móvil.

### 6.4 Landings SEO por comuna

Genera páginas para: Limache, Olmué, Villa Alemana, Quilpué, Quillota, Viña del Mar, Valparaíso, La Calera, Casablanca, San Felipe, Los Andes, Concón.

URL: `/casas-prefabricadas-limache/`, `/casas-prefabricadas-quilpue/`, etc.

**No las hagas contenido duplicado.** Cada una necesita: `<h1>` propio, 2–3 párrafos con contexto real de esa comuna (distancia desde la casa piloto, tipo de terreno, clima, consideraciones de despacho), los mismos modelos pero con intro distinta, y FAQ local. Si no puedes escribir contenido genuinamente distinto para una comuna, no la crees.

### 6.5 Otras páginas

- `/nosotros/` — historia, casa piloto, equipo, por qué prefabricado.
- `/casa-piloto/` — página dedicada, con mapa, horarios y CTA de agendamiento por WhatsApp. Es un activo SEO fuerte ("casa piloto casas prefabricadas Villa Alemana").
- `/preguntas-frecuentes/` — versión extendida del FAQ del home.
- `/404` — útil, con buscador y enlace al catálogo.

---

## 7. Cotización por WhatsApp (requisito crítico)

### 7.1 Constructor del link (`src/lib/whatsapp.ts`)

```ts
const NUMERO = "56975510394"; // sin +, sin espacios — viene de site.ts

export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
```

`wa.me` resuelve solo entre app móvil y WhatsApp Web en escritorio. No uses `api.whatsapp.com` ni intents propios.

### 7.2 Plantillas de mensaje

**Desde una ficha de modelo (con selección activa):**

```
Hola 👋 Vengo desde la web de Casas Limache.

Quiero cotizar el modelo *{NOMBRE_MODELO}* de *{METRAJE} m²* en formato *{TIPO_KIT}*.

• Dormitorios: {DORMITORIOS}
• Baños: {BANOS}
• Valor de referencia web: {PRECIO}
• Comuna de destino: {COMUNA o "por confirmar"}

Ficha del modelo: {URL_CANONICA}

¿Me pueden ayudar con la cotización?
```

**Desde el hero / CTA genérico:**

```
Hola 👋 Vengo desde la web de Casas Limache. Quiero información sobre casas prefabricadas y sus modelos disponibles.
```

**Desde la casa piloto:**

```
Hola 👋 Quiero coordinar una visita a la casa piloto de Casas Limache en Villa Alemana. ¿Qué horarios tienen disponibles?
```

Reglas:
- Los `*asteriscos*` son negrita nativa de WhatsApp. Úsalos.
- Los saltos de línea van como `\n` reales antes de codificar.
- Emojis: máximo dos por mensaje. No es un chat de adolescentes.
- Si el precio no está cargado, el mensaje dice "Valor de referencia: a cotizar".
- El nombre del cliente NO se pide en un formulario. WhatsApp ya lo entrega. (Si el cliente insiste en pedirlo, agrega un input opcional "Tu nombre" que se antepone al mensaje: `Hola, soy {NOMBRE}...`).

### 7.3 Tracking

Dispara un evento `whatsapp_click` con `{ modelo, metraje, kit, origen }` antes de abrir el link. Deja el `dataLayer.push` y el `gtag` listos pero comentados, con el ID en `site.ts` como placeholder (`GA4_ID`, `META_PIXEL_ID`). Sin IDs reales, nada debe fallar ni cargar scripts.

---

## 8. Imágenes: placeholders y reemplazo (requisito explícito del cliente)

**NO generes, ni descargues, ni uses fotos reales de casas. Ninguna.**

### 8.1 Qué hacer

1. Crea `public/images/modelos/{slug}/` para cada modelo, con archivos placeholder:
   ```
   public/images/modelos/limache/
   ├── 01-exterior.jpg
   ├── 02-interior.jpg
   ├── 03-cocina.jpg
   ├── 04-dormitorio.jpg
   └── plano.jpg
   ```
2. Cada placeholder es un **SVG o PNG de color plano** con: el ratio correcto, el nombre del archivo escrito encima y las dimensiones recomendadas. Genera estos placeholders con un script (`scripts/generar-placeholders.mjs`) para que sea reproducible. Usa un gris neutro o un tono de la paleta al 15% de opacidad — nada estridente.
3. **Ratios fijos y documentados** (esto evita que el layout se rompa cuando el cliente suba sus fotos):
   - Galería de modelo: **3:2** — 1600×1067 px
   - Tarjeta de catálogo: **3:2** — 800×533 px
   - Hero: **16:9** — 2000×1125 px
   - Plano: **4:3** — 1400×1050 px
   - Open Graph: **1.91:1** — 1200×630 px
4. Todas las imágenes se referencian **solo** desde el JSON del modelo o desde `site.ts`. El cliente nunca debería tener que buscar una ruta dentro de un componente `.astro`.
5. Escribe `IMAGENES.md` en la raíz, en español, explicando paso a paso: dónde va cada foto, con qué nombre, en qué ratio, cómo comprimirla y qué línea del JSON editar. Con un ejemplo completo antes/después.

### 8.2 Optimización

Usa `astro:assets` con formatos modernos (`avif`/`webp` con fallback), `loading="lazy"` salvo en el LCP, `decoding="async"`, `fetchpriority="high"` solo en la imagen del hero, y `alt` descriptivo generado desde el JSON (ej: `"Modelo Limache de 72 m² — fachada exterior"`), nunca vacío ni "imagen".

---

## 9. Modelo de datos del catálogo (clave para la escalabilidad)

`src/content/config.ts` — esquema Zod:

```ts
{
  slug: string,                 // "limache"
  nombre: string,               // "Limache"
  orden: number,
  destacado: boolean,
  resumen: string,              // 1 línea para la tarjeta
  descripcion: string[],        // párrafos de la ficha
  metrajeBase: number,          // 72
  variantes: [{
    m2: number,                 // 72
    dormitorios: number,
    banos: number,
    aguas: number,
    precios: {
      kitBasico: number | null,
      semifull: number | null,
      llaveEnMano: number | null
    }
  }],
  kitsDisponibles: ("kit-basico"|"semifull"|"llave-en-mano")[],
  caracteristicas: { cocina: boolean, livingComedor: boolean, logia: boolean, terraza: boolean },
  especificaciones: { estructura, revestimientoExterior, revestimientoInterior,
                      techumbre, ventanas, aislacion, altura },  // strings
  incluye: string[],
  noIncluye: string[],
  imagenes: [{ src: string, alt: string }],
  plano: { src: string, alt: string } | null,
  seo: { title?: string, description?: string, keywords?: string[] }
}
```

Reglas:
- **Sin CMS ni panel de administración.** No instales Decap, Netlify CMS, Sanity, Strapi ni nada por el estilo. El catálogo se administra exclusivamente editando archivos JSON en el repositorio. La facilidad tiene que venir de la estructura del código, no de una herramienta externa.
- **Ningún modelo puede estar hardcodeado.** Toda página, grid, filtro, contador, sitemap y enlace del footer se deriva por iteración sobre la colección. Si agregar un modelo obliga a editar cualquier archivo `.astro`, `.tsx` o `.css`, la arquitectura está mal y hay que rehacerla.
- Si un precio es `null`, la UI muestra **"Cotizar"**, nunca `$0` ni `undefined`.
- Zod valida en build: si falta un campo, el build falla con mensaje claro en español.
- Escribe `AGREGAR-MODELO.md` explicando cómo sumar un modelo nuevo en 3 pasos (copiar JSON, crear carpeta de imágenes, editar campos). El sitio debe soportar 5 o 60 modelos sin tocar componentes.

**Datos semilla:** crea **8 modelos de ejemplo** con nombres de la zona (Limache, Olmué, Granizo, Quillota, Marga Marga, Lo Hidalgo, Peñablanca, Aconcagua), metrajes plausibles del rubro chileno (36, 42, 54, 63, 72, 84, 96, 120 m²) y **precios en `null`**. Marca el archivo `AGREGAR-MODELO.md` dejando claro que los nombres y datos son de ejemplo y el cliente debe reemplazarlos.

---

## 10. SEO (prioridad máxima)

### 10.1 Mapa de keywords

| Página | Keyword principal | Secundarias |
|---|---|---|
| Home | casas prefabricadas Limache | casas prefabricadas Región de Valparaíso, casas prefabricadas V Región |
| Catálogo | modelos de casas prefabricadas | catálogo casas prefabricadas Chile, precios casas prefabricadas |
| Modelo | casa prefabricada {nombre} {m2} m² | casa prefabricada {m2} metros, casa prefabricada {n} dormitorios |
| Casa piloto | casa piloto casas prefabricadas Villa Alemana | visitar casas prefabricadas Valparaíso |
| Landings | casas prefabricadas {comuna} | constructora casas prefabricadas {comuna} |
| FAQ | cuánto cuesta una casa prefabricada | permisos casa prefabricada Chile |

Intención transaccional y local. Escribe para personas, no para el crawler: nada de keyword stuffing.

### 10.2 Metadatos (en `BaseLayout.astro`, parametrizados)

```html
<html lang="es-CL">
<title>{título ≤ 60 caracteres}</title>
<meta name="description" content="{150–160 caracteres, con CTA}">
<link rel="canonical" href="{URL absoluta}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="geo.region" content="CL-VS">
<meta name="geo.placename" content="Limache, Valparaíso">
<meta name="geo.position" content="-33.0358;-71.2979">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:locale" content="es_CL">
<meta property="og:site_name" content="Casas Limache">
<meta property="og:title" ...> <meta property="og:description" ...>
<meta property="og:image" content="{1200x630 absoluta}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" ...>

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
```

Plantillas de title:
- Home: `Casas Prefabricadas en Limache y V Región | Casas Limache`
- Modelo: `Casa Prefabricada {Nombre} {m2} m² | {n} Dormitorios | Casas Limache`
- Comuna: `Casas Prefabricadas en {Comuna} | Entrega Inmediata | Casas Limache`

### 10.3 JSON-LD (en `src/lib/schema.ts`)

- **Todas las páginas:** `HomeAndConstructionBusiness` (subtipo de LocalBusiness) con `name`, `image`, `@id`, `url`, `telephone`, `address` (PostalAddress completo), `geo`, `openingHoursSpecification`, `areaServed` (array de ciudades), `priceRange`, `sameAs` (redes).
- **Home:** `WebSite` + `Organization`.
- **Ficha de modelo:** `Product` con `offers` → `Offer` (`priceCurrency: "CLP"`, `availability`, `price` o `AggregateOffer` con `lowPrice`/`highPrice`). Si no hay precio, omite `offers` en vez de inventarlo.
- **Todas menos home:** `BreadcrumbList`.
- **FAQ:** `FAQPage`.

Valida cada schema mentalmente contra el Rich Results Test antes de darlo por listo.

### 10.4 Técnico

- `sitemap-index.xml` automático vía `@astrojs/sitemap`, con `changefreq` y `priority` razonables.
- `robots.txt` que apunte al sitemap y no bloquee nada útil.
- URLs limpias, en minúscula, con guiones, sin parámetros, con slash final consistente.
- Un solo `<h1>` por página. Jerarquía H2/H3 lógica.
- HTML semántico: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` con `aria-labelledby`, `<footer>`.
- Enlazado interno: home → catálogo → modelos, y footer con todos los modelos y comunas.
- NAP idéntico carácter por carácter en header, footer, `/casa-piloto/` y JSON-LD. Google penaliza inconsistencias.
- Sin `<img>` sin `alt`, sin enlaces "click aquí".
- `hreflang="es-cl"` self-referencing.

### 10.5 Core Web Vitals — objetivos

| Métrica | Objetivo |
|---|---|
| LCP | < 2.0 s en 4G móvil |
| INP | < 200 ms |
| CLS | < 0.05 |
| Lighthouse (mobile) | ≥ 95 en Performance, Accessibility, Best Practices, SEO |

Para lograrlo: fuentes autoalojadas con `font-display: swap` y `preload` de la display; sin librerías JS de terceros en el render inicial; el mapa carga solo bajo demanda; CSS crítico en línea si hace falta.

---

## 11. Copy y contenido

- Español de Chile, tono directo y concreto. Tratamiento de "tú".
- Nada de "sueños", "excelencia", "compromiso", "soluciones integrales".
- Cada botón dice qué pasa al tocarlo: "Cotizar por WhatsApp", no "Más info".
- El mismo verbo en todo el flujo: si el botón dice "Cotizar", la página siguiente habla de cotización.
- Estados vacíos y errores útiles, no decorativos.
- Los datos que no tengas: placeholder visible con el prefijo `⚠️` en el config, nunca inventados. Al final entrega una lista de todo lo que quedó pendiente de confirmar.

---

## 12. Entregables

1. Repositorio funcional, `npm install && npm run dev` sin errores ni warnings.
2. `npm run build` genera estático limpio.
3. `README.md`: instalación, estructura, cómo editar, cómo desplegar.
4. `IMAGENES.md` y `AGREGAR-MODELO.md` en español, para alguien sin conocimientos técnicos.
5. `src/config/site.ts` con todo lo editable centralizado y comentado.
6. Script de placeholders reproducible.
7. Lista final de `⚠️ VERIFICAR` / datos pendientes.

---

## 13. Criterios de aceptación (verifícalos uno por uno antes de entregar)

- [ ] El home muestra el eslogan con la estructura de hero descrita, sin parecerse visualmente a la referencia.
- [ ] Existe un botón evidente "Ver catálogo completo" que lleva a `/catalogo/`.
- [ ] El catálogo lista todos los modelos del content collection, sin hardcodear ninguno.
- [ ] Al tocar una tarjeta se abre la ficha del modelo en una URL propia e indexable.
- [ ] En la ficha se puede elegir metraje y tipo de kit, y el precio se actualiza.
- [ ] El botón de cotizar abre WhatsApp con el mensaje completo, correcto y con negritas, incluyendo modelo, metraje, kit y URL.
- [ ] Agregar un modelo nuevo = crear 1 JSON + 1 carpeta de imágenes. Nada más. **Pruébalo agregando uno de prueba y bórralo después.**
- [ ] Cero fotos reales. Todos los placeholders son de color plano y están en `public/images/`.
- [ ] Todo se ve bien en 320px, 375px, 768px, 1024px, 1440px y 1920px. Toma screenshots y revísalos tú mismo.
- [ ] Lighthouse mobile ≥ 95 en las cuatro categorías.
- [ ] JSON-LD válido en home, catálogo, ficha de modelo y FAQ.
- [ ] Sitemap y robots.txt generados y correctos.
- [ ] Ningún dato inventado: precios, años de experiencia y testimonios están como placeholder marcado.
- [ ] El diseño no cae en ninguna de las prohibiciones de la sección 5.2. Revísalo honestamente.

---

## 14. Orden de trabajo sugerido

1. Plan de diseño + autocrítica (sección 5.1) → **muéstralo en el chat y espera antes de seguir si algo no calza**.
2. Scaffold de Astro + tokens CSS + layout base + metadatos SEO.
3. Content collection + esquema Zod + 8 modelos semilla + script de placeholders.
4. Componentes: Header, Footer, ModeloCard, Hero.
5. Home completo.
6. Catálogo con filtros.
7. Ficha de modelo + isla del cotizador + deep link de WhatsApp.
8. Landings por comuna + páginas secundarias.
9. JSON-LD, sitemap, robots, OG images.
10. Auditoría: Lighthouse, responsive con screenshots, accesibilidad por teclado.
11. Documentación en español + lista de pendientes.

Trabaja en pasadas y critica tu propio resultado a mitad de camino, no solo al final.
