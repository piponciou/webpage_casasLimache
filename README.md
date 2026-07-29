# Casas Limache — sitio web

Sitio estático de **Casas Limache**, venta y construcción de casas prefabricadas
en la Región de Valparaíso.

El único objetivo de conversión del sitio es **abrir un chat de WhatsApp con el
mensaje ya escrito**: modelo, metraje, formato de compra, precio de referencia y
enlace a la ficha. No hay carrito, ni checkout, ni formulario de contacto.

---

## Empezar

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install
```

```bash
npm run dev
```

Queda andando en <http://localhost:4321>. Cualquier cambio se ve al instante.

---

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el sitio en tu computador para trabajar |
| `npm run build` | Genera el sitio final en la carpeta `dist/` |
| `npm run preview` | Muestra el sitio ya generado, tal como quedará publicado |
| `npm run placeholders` | Crea los rectángulos grises que faltan en `public/images/` |
| `npm run optimizar-imagenes` | Deja las fotos en su tamaño correcto y comprimidas |
| `npm run fuentes` | Copia las tipografías desde `node_modules` a `public/fonts/` |

`npm install` corre solo los dos últimos, así que después de clonar el proyecto
ya queda todo listo.

---

## Los tres manuales

| Archivo | Para qué |
|---|---|
| **[IMAGENES.md](IMAGENES.md)** | Cambiar cualquier foto del sitio. Escrito para alguien sin conocimientos técnicos |
| **[AGREGAR-MODELO.md](AGREGAR-MODELO.md)** | Sumar, editar o borrar un modelo de casa |
| **[PENDIENTES.md](PENDIENTES.md)** | ⚠️ **Léelo antes de publicar.** Lista de datos que faltan confirmar |

---

## Qué se edita y dónde

Casi todo lo que el cliente puede querer cambiar está en dos lugares:

### 1. `src/config/site.ts` — los datos del negocio

Teléfono, dirección, horarios, redes sociales, comunas de despacho, formatos de
compra, testimonios, textos legales e identificadores de analítica. **Si un dato
aparece en dos partes del sitio, se escribe una sola vez acá.**

### 2. `src/content/modelos/*.json` — el catálogo

Un archivo por modelo. Ver [AGREGAR-MODELO.md](AGREGAR-MODELO.md).

### Además

| Archivo | Contenido |
|---|---|
| `src/data/faq.ts` | Las preguntas frecuentes del home y de `/preguntas-frecuentes/` |
| `src/data/comunas.ts` | El texto propio de cada landing por comuna |
| `src/styles/tokens.css` | Colores, tipografías, espaciados y formas |

---

## Estructura

```
src/
├── config/site.ts          ← ÚNICA fuente de verdad de los datos del negocio
├── content/
│   ├── config.ts           ← validación del catálogo (si falta un dato, no compila)
│   └── modelos/*.json      ← 1 archivo = 1 modelo = 1 página
├── data/
│   ├── comunas.ts          ← contenido propio de cada landing local
│   └── faq.ts              ← preguntas frecuentes
├── components/             ← piezas reutilizables de la interfaz
├── layouts/
│   ├── BaseLayout.astro    ← acá viven TODOS los metadatos SEO
│   └── ModeloLayout.astro
├── lib/
│   ├── whatsapp.ts         ← construcción de los mensajes y del enlace
│   ├── catalogo.ts         ← lecturas derivadas del catálogo
│   ├── schema.ts           ← datos estructurados para Google
│   └── formato.ts          ← formato de precios y medidas
├── pages/                  ← cada archivo es una URL
└── styles/
public/
├── images/                 ← todas las fotos (ver IMAGENES.md)
└── fonts/                  ← tipografías autoalojadas
scripts/                    ← utilidades reproducibles
```

### Páginas que genera

| URL | Qué es |
|---|---|
| `/` | Portada |
| `/catalogo/` | Catálogo completo con filtros |
| `/modelos/{slug}/` | Una por cada modelo (8 hoy) |
| `/casas-prefabricadas-{comuna}/` | Una por cada comuna (12 hoy) |
| `/casa-piloto/` | Página dedicada a la casa piloto |
| `/nosotros/`, `/preguntas-frecuentes/` | Secundarias |
| `/404` | Página de error, con buscador de modelos |
| `/sitemap-index.xml`, `/robots.txt` | Para Google |

---

## Rendimiento medido

Lighthouse en modo **móvil**, contra el sitio ya construido (`npm run build` +
`npm run preview`), con las imágenes de marcador todavía puestas:

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Portada | 99 | 100 | 100 | 100 |
| Catálogo | 99 | 100 | 100 | 100 |
| Ficha de modelo | 99 | 100 | 100 | 100 |
| Casa piloto | 99 | 100 | 100 | 100 |
| Landing de comuna | 99 | 100 | 100 | 100 |
| Preguntas frecuentes | 100 | 100 | 100 | 100 |
| Nosotros | 100 | 100 | 100 | 100 |

LCP 2,0–2,1 s · CLS 0 · TBT 0 ms · peso total de la portada 183 KB.

**Estos números van a cambiar cuando entren las fotos reales**, que es la única
variable capaz de bajarlos. Por eso existe `npm run optimizar-imagenes` y por eso
IMAGENES.md insiste en el peso. Conviene volver a medir con
[PageSpeed Insights](https://pagespeed.web.dev) una vez publicado.

Para repetir la medición en local:

```bash
npm run build && npm run preview
```

```bash
npx lighthouse http://localhost:4321/ --form-factor=mobile --view
```

## Decisiones técnicas

**Astro 5, sin framework de interfaz, con CSS propio.** Cada modelo es una
página HTML real generada en el momento de publicar, no algo que arma el
navegador: eso es lo que permite que Google la indexe. El sitio parte con **0 KB
de JavaScript** y solo carga lo mínimo donde hace falta (el cotizador, los
filtros, la galería y el mapa) — poco más de 2 KB comprimidos en total.

**El catálogo se administra editando archivos JSON, sin panel de
administración.** No hay Decap, ni Netlify CMS, ni Sanity. La facilidad viene de
la estructura y de los manuales, no de una herramienta externa que después haya
que mantener y pagar.

**Ningún modelo está escrito a mano en el código.** Grids, filtros, contadores,
sitemap, buscador del 404 y enlaces del footer salen todos de recorrer la
colección. Agregar un modelo es agregar un archivo.

**El mapa de Google no se carga hasta que alguien lo pide.** Un iframe de Google
Maps arruina la velocidad de carga y le manda datos de quien visita a Google sin
que lo haya pedido. Acá se carga al tocar "Ver el mapa".

**Ningún script de terceros mientras no haya identificadores.** El evento
`whatsapp_click` se registra igual en `window.dataLayer` con el modelo, el
metraje, el formato y el origen del clic. El día que se conecte Google Analytics
o el pixel de Meta, se completan los IDs en `site.ts` y se descomentan dos líneas
en `BaseLayout.astro`; no hay que tocar ningún componente.

### Dos desvíos respecto del encargo original, y por qué

1. **El cotizador no es un componente de React (`.tsx`), es TypeScript sin
   framework.** El propio encargo no autoriza `@astrojs/react` entre los
   complementos permitidos, y montar React solo para dos grupos de botones
   costaría unos 45 KB de JavaScript justamente en la página que más importa
   para la velocidad. El comportamiento es idéntico y pesa ~2 KB.

2. **Las fotos se sirven desde `public/` en vez de pasar por el optimizador de
   Astro.** Es lo que permite que reemplazar una foto sea copiar un archivo
   encima de otro, sin tocar código, que es un requisito explícito. La
   compresión se resuelve con `npm run optimizar-imagenes`, que hace el mismo
   trabajo y lo deja bajo control de quien sube las fotos.

---

## Publicar

El sitio es estático: sirve cualquier hosting. Vienen listas las
configuraciones de los dos más usados, con las cabeceras de caché ya puestas.

### Netlify

Conecta el repositorio. `netlify.toml` ya trae:

- Comando: `npm run build`
- Carpeta a publicar: `dist`

### Vercel

Conecta el repositorio. `vercel.json` ya trae lo mismo.

### Cloudflare Pages / cualquier otro

- Comando de build: `npm run build`
- Carpeta de salida: `dist`

### Antes de publicar por primera vez

1. Revisa **[PENDIENTES.md](PENDIENTES.md)** y completa los datos marcados.
2. Cambia el dominio si no es `casaslimache.cl`: está en `astro.config.mjs` y en
   `src/config/site.ts`.
3. Reemplaza las fotos siguiendo [IMAGENES.md](IMAGENES.md).
4. Da de alta el sitio en [Google Search Console](https://search.google.com/search-console)
   y envía `https://tudominio.cl/sitemap-index.xml`.
