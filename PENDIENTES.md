# ⚠️ Pendientes antes de publicar

Todo lo que sigue son datos que **no estaban confirmados** cuando se construyó el
sitio. Ninguno se inventó: están como marcador visible o como texto general que
deriva la respuesta a WhatsApp.

Está ordenado por prioridad. Lo de la sección 1 hay que resolverlo sí o sí antes
de publicar; lo de la 4 se puede hacer después sin que se note.

---

## 1. Bloquean la publicación

### 1.1 El párrafo de "Cómo partimos"

**Dónde:** `src/pages/nosotros.astro`, sección "Cómo partimos".

Hoy hay un recuadro con borde punteado que dice, textualmente, que ese párrafo lo
tiene que escribir el cliente. **Se ve en el sitio publicado.** Hay que
reemplazarlo por el texto real: en qué año partió Casas Limache, quiénes están
detrás y, si se quiere, cuántas casas llevan entregadas.

No se escribió porque un año de fundación o un número de casas inventado es
exactamente el tipo de dato que después se cae en una conversación de WhatsApp.

### 1.2 Los testimonios

**Dónde:** `src/config/site.ts`, constante `TESTIMONIOS`.

Los tres testimonios dicen `⚠️ REEMPLAZAR` y se ven así en la portada. Opciones:

- Reemplazar el texto, el nombre, la comuna y el modelo de cada uno por
  testimonios reales.
- O **borrar el contenido del array** (dejarlo como `[]`): la sección desaparece
  sola de la portada, sin dejar un hueco.

Es preferible no tener testimonios a tener testimonios falsos.

### 1.3 Las fotos

Hoy **no hay ninguna foto real**: son 55 rectángulos grises con el nombre del
archivo escrito encima. El paso a paso está en [IMAGENES.md](IMAGENES.md).

Prioridad:

1. `public/images/hero/portada.jpg` — es lo primero que se ve del sitio.
2. `public/images/modelos/*/tarjeta.jpg` y `01-exterior.jpg` — el catálogo.
3. `public/images/casa-piloto/` — la página de la casa piloto.
4. `public/images/og/portada.jpg` — la imagen que aparece al compartir el enlace
   por WhatsApp. Si no se cambia, quien reciba el link va a ver un rectángulo gris.

### 1.4 Los 8 modelos son de ejemplo

**Dónde:** `src/content/modelos/*.json`.

Los nombres (Limache, Olmué, Granizo, Quillota, Marga Marga, Lo Hidalgo,
Peñablanca, Aconcagua), los metrajes, las distribuciones y las descripciones se
escribieron para que el sitio se pudiera ver funcionando con datos plausibles del
rubro. Hay que reemplazarlos por el catálogo real o corregir los que sí existan.

Ver [AGREGAR-MODELO.md](AGREGAR-MODELO.md).

---

## 2. Datos del negocio a confirmar

**Todos en `src/config/site.ts`.**

| Dato | Estado | Qué hay que hacer |
|---|---|---|
| **Teléfono** `+56 9 7551 0394` | ⚠️ VERIFICAR | Confirmar que es el número de WhatsApp donde llegan las cotizaciones. **Es el dato más crítico del sitio**: si está mal, no llega ni una sola consulta |
| **Coordenadas** `-33.0358, -71.2979` | ⚠️ VERIFICAR | Se tomaron del sitio anterior. Hay que abrir Google Maps, poner el pin exacto en la casa piloto y copiar las coordenadas. Alimentan el mapa y los datos que ve Google |
| **Email** | ⚠️ PENDIENTE | Mientras esté vacío, el sitio **no muestra email en ninguna parte** (ni en el footer ni en los datos para Google). Si existe uno, agregarlo |
| **Razón social y RUT** | ⚠️ PENDIENTE | Para el aviso legal del footer. Hoy dice solo "Casas Limache" |
| **Código postal** | ⚠️ PENDIENTE | Opcional. Suma un poco en la ficha de negocio de Google |
| **Zona de despacho** | ⚠️ VERIFICAR | Están cargadas 12 comunas de la Región de Valparaíso. ¿Se despacha fuera de la región? |
| **Horarios** | ⚠️ VERIFICAR | Lunes a viernes 11:00–18:00 y sábados 11:00–14:00 con coordinación previa |

### Sobre la dirección de la casa piloto

Quedó registrada así, que fue lo que confirmaste:

> Camino Troncal 06680, Sector Lo Hidalgo, **Villa Alemana**, Región de Valparaíso

Y aparte, como texto de apoyo:

> "En el camino de Villa Alemana hacia Limache, a la salida de Villa Alemana."

Se separó a propósito. La dirección oficial tiene que estar escrita **idéntica**
en el footer, en la página de casa piloto y en los datos que lee Google, porque
Google castiga las inconsistencias; la aclaración de que queda entre las dos
comunas va como texto suelto, donde no hace daño.

---

## 3. Datos comerciales que el sitio deriva a WhatsApp

Estas cinco respuestas están escritas de forma general y terminan invitando a
escribir por WhatsApp. **Funcionan tal como están**, pero responder con el dato
concreto convierte mucho mejor.

**En `src/data/faq.ts`**, busca los comentarios `// ⚠️ COMPLETAR`:

| Pregunta | Qué falta |
|---|---|
| ¿Necesito permiso municipal? | Si Casas Limache acompaña la tramitación o no |
| ¿Cuánto se demoran en entregar? | Plazos reales de fabricación y de montaje, por formato |
| ¿Tienen financiamiento? | Si hay convenio, cuotas o crédito directo |
| ¿Qué formas de pago aceptan? | Medios de pago y % de abono para reservar |
| ¿Qué garantía tiene la casa? | Plazo y cobertura |

**En `src/config/site.ts`**, constante `KITS`:

| Formato | Qué falta |
|---|---|
| **Semifull** | El detalle exacto de qué agrega sobre el Kit Básico |
| **Llave en Mano** | El detalle exacto de qué incluye |

Hoy esas dos columnas de la comparación dicen "El detalle exacto de este formato
cambia según el modelo. Te lo confirmamos por escrito en el chat". El Kit Básico
sí tiene su lista real, porque ese dato sí estaba.

---

## 4. Se puede hacer después

### 4.1 Analítica

**Dónde:** `src/config/site.ts`, constante `ANALITICA`.

`GA4_ID` y `META_PIXEL_ID` están vacíos. Mientras lo estén, **no se carga ningún
script de terceros** y el sitio no pierde velocidad.

El evento `whatsapp_click` ya se registra igual en `window.dataLayer`, con el
modelo, el metraje, el formato y desde qué botón se hizo clic. Cuando existan los
identificadores: se completan acá y se descomentan dos líneas en
`src/layouts/BaseLayout.astro`. No hay que tocar ningún componente.

### 4.2 Especificaciones técnicas de los modelos

**Dónde:** `src/content/modelos/*.json`, campo `especificaciones`.

Los datos que venían confirmados se usaron tal cual: paneles media luna 5",
tabiquería 2×3 con papel fieltro, paneles interiores con volcanita y techumbre.

Los que **no** venían confirmados se completaron con valores estándar del rubro y
hay que revisarlos:

- `ventanas` — se puso "Corredera de aluminio con vidrio simple"
- `aislacion` — se puso "Papel fieltro en muros perimetrales"
- `altura` — se puso "2,40 m libres interiores"

Bajo la tabla de especificaciones el sitio dice que son referenciales y que las
terminaciones definitivas se confirman en la cotización, así que no hay una
afirmación categórica en riesgo. Pero conviene corregirlas.

### 4.3 Contenido de las landings por comuna

**Dónde:** `src/data/comunas.ts`.

Cada una de las 12 comunas tiene tres párrafos propios sobre distancia desde la
casa piloto, tipo de terreno, clima y condiciones de despacho. Es contenido real
y verificable de cada zona, no relleno.

Lo que hay que revisar: **las distancias son aproximadas** y las condiciones de
despacho (camión chico, traslado en dos viajes, izaje en Valparaíso) describen lo
habitual en cada zona, no una política comercial confirmada. Si alguna no calza
con cómo trabajan realmente, hay que corregirla.

### 4.4 El dominio

Si el sitio no va a quedar en `casaslimache.cl`, hay que cambiarlo en **dos
lugares**:

- `astro.config.mjs`, constante `SITIO`
- `src/config/site.ts`, campo `dominio`

De ahí salen las direcciones absolutas del sitemap, de los enlaces que se mandan
por WhatsApp y de los datos que lee Google.

---

## 5. Después de publicar

1. Dar de alta el sitio en [Google Search Console](https://search.google.com/search-console)
   y enviar `https://casaslimache.cl/sitemap-index.xml`.
2. Verificar los datos estructurados en el
   [Test de Resultados Enriquecidos](https://search.google.com/test/rich-results):
   probar la portada, una ficha de modelo y `/preguntas-frecuentes/`.
3. Crear o reclamar el **Perfil de Empresa de Google** con el **mismo** nombre,
   dirección y teléfono que están en el sitio, carácter por carácter.
4. Enlazar el sitio desde Instagram, Facebook y TikTok.
5. Medir la velocidad real con [PageSpeed Insights](https://pagespeed.web.dev)
   ya con las fotos definitivas subidas. Las fotos son la única variable que
   puede bajar el puntaje, y por eso existe `npm run optimizar-imagenes`.
