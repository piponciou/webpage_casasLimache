# Cómo agregar un modelo nuevo

Agregar una casa al catálogo son **3 pasos** y no hay que tocar ningún archivo de
diseño. El modelo nuevo aparece solo en el catálogo, en el buscador, en el
footer, en las páginas de cada comuna, en el sitemap de Google y en "otros
modelos" de las fichas.

> **Aviso importante sobre los modelos que ya están**
>
> Los 8 modelos que vienen cargados (Limache, Olmué, Granizo, Quillota, Marga
> Marga, Lo Hidalgo, Peñablanca y Aconcagua) son **de ejemplo**. Los nombres, los
> metrajes, las distribuciones y las descripciones se escribieron para que el
> sitio se pudiera ver funcionando. **Todos los precios están en blanco a
> propósito** y el sitio muestra "Cotizar" en su lugar.
>
> Antes de publicar hay que reemplazarlos por los modelos reales, o corregir los
> datos de los que sí existan.

---

## Paso 1 — Copiar un archivo JSON

Ve a `src/content/modelos/`. Ahí hay un archivo por cada modelo.

Copia el que más se parezca al modelo nuevo y ponle el nombre del modelo en
minúsculas, sin tildes y con guiones:

```
src/content/modelos/limache.json   →   src/content/modelos/villa-alemana.json
```

## Paso 2 — Crear la carpeta de fotos

Crea una carpeta con **el mismo nombre** dentro de `public/images/modelos/`:

```
public/images/modelos/villa-alemana/
```

Y déjala vacía. Después corre este comando y se llena sola con los rectángulos
grises que hay que reemplazar por las fotos:

```bash
npm run placeholders
```

(El detalle de qué foto va en cada archivo está en **IMAGENES.md**.)

## Paso 3 — Editar los datos del JSON

Abre el archivo que copiaste y cambia los valores. Está explicado campo por
campo más abajo.

Listo. Para ver el resultado:

```bash
npm run dev
```

---

## Los campos del JSON, uno por uno

```json
{
  "slug": "villa-alemana",
  "nombre": "Villa Alemana",
  "orden": 9,
  "destacado": false,
  ...
}
```

| Campo | Qué es | Cuidado con |
|---|---|---|
| `slug` | El nombre que sale en la dirección web: `/modelos/villa-alemana/` | Solo minúsculas, números y guiones. **Tiene que ser igual al nombre del archivo y al de la carpeta de fotos.** |
| `nombre` | Cómo se llama el modelo para las personas | Con tildes y mayúsculas normales |
| `orden` | En qué posición aparece en el catálogo | Número más chico = aparece antes |
| `destacado` | Si aparece en la portada | `true` o `false`, sin comillas. Conviene tener 6 destacados |
| `resumen` | La línea que se lee en la tarjeta del catálogo | Entre 20 y 160 caracteres. Una frase concreta, no "la mejor calidad" |
| `descripcion` | Los párrafos de la ficha | Entre 2 y 4 párrafos. Cada uno de al menos 60 caracteres |
| `metrajeBase` | El metraje que viene marcado al abrir la ficha | **Tiene que existir dentro de `variantes`**, si no el sitio no compila |

### Las variantes (los distintos metrajes)

```json
"variantes": [
  {
    "m2": 72,
    "dormitorios": 3,
    "banos": 2,
    "aguas": 3,
    "precios": {
      "kitBasico": null,
      "semifull": null,
      "llaveEnMano": null
    }
  }
]
```

- Puedes poner una variante o diez. Cada una crea un botón en la ficha.
- **No repitas un mismo `m2`** en dos variantes.
- `aguas` es la cantidad de puntos de agua (cocina, baños, logia).

**Los precios:**

- `null` (sin comillas) = no hay precio publicado. El sitio muestra **"Cotizar"**.
- Un número = el precio en pesos. Se escribe **sin puntos, sin comas y sin el
  signo `$`**: `12900000`, no `$12.900.000`.

```json
"precios": { "kitBasico": 12900000, "semifull": null, "llaveEnMano": null }
```

Eso se ve en el sitio como `$12.900.000` en el Kit Básico y "Cotizar" en los
otros dos formatos.

### Los formatos de compra disponibles

```json
"kitsDisponibles": ["kit-basico", "semifull", "llave-en-mano"]
```

Solo esos tres textos, escritos exactamente así. Si un modelo no se vende en Kit
Básico, sácalo de la lista y deja de aparecer como opción en la ficha.

### Lo que incluye y lo que no

```json
"incluye": ["Paneles exteriores media luna 5\"", "Techumbre completa"],
"noIncluye": ["Radier o fundación", "Instalación eléctrica y sanitaria"]
```

Ser explícito con lo que **no** incluye evita cotizaciones que después se caen.
Es de las partes que más confianza generan del sitio: no la borres.

> Si necesitas escribir comillas dobles dentro de un texto (como en `5"`), hay
> que ponerles una barra invertida delante: `5\"`. Es la única rareza del formato.

### Las fotos

```json
"imagenes": [
  { "src": "/images/modelos/villa-alemana/01-exterior.jpg", "alt": "Modelo Villa Alemana de 72 m² — fachada exterior" }
],
"imagenTarjeta": { "src": "/images/modelos/villa-alemana/tarjeta.jpg", "alt": "..." },
"plano": { "src": "/images/modelos/villa-alemana/plano.jpg", "alt": "..." }
```

- Fíjate en cambiar `limache` por el slug nuevo en **todas** las rutas.
- El `alt` describe la foto, en una línea. Nunca lo dejes vacío.
- Si el modelo no tiene plano todavía, escribe `"plano": null`.

### SEO (opcional)

```json
"seo": {}
```

Déjalo así y el sitio arma solo el título y la descripción para Google. Solo si
quieres una redacción particular para ese modelo:

```json
"seo": {
  "title": "Casa Prefabricada Villa Alemana 72 m² | 3 Dormitorios",
  "description": "Texto de entre 120 y 165 caracteres, describiendo el modelo y terminando con una invitación a cotizar por WhatsApp."
}
```

---

## Si algo está mal, el sitio te lo dice

El catálogo tiene validación: si un dato falta o está mal escrito, `npm run dev`
o `npm run build` **se detienen con un mensaje en español** apuntando al archivo
y al campo. Por ejemplo:

```
villa-alemana.json → metrajeBase
El metrajeBase (80 m²) no existe entre las variantes: 63, 72, 84 m².
```

Eso es intencional: es preferible que no compile a que se publique una ficha con
datos a medias.

Errores más comunes:

| Mensaje | Qué pasó |
|---|---|
| `El metrajeBase (X) no existe entre las variantes` | Escribiste un metraje base que no está en la lista de variantes |
| `Hay dos variantes con el mismo m²` | Repetiste un metraje |
| `El precio debe ser un número sin puntos ni símbolo $` | Escribiste `"$12.900.000"` en vez de `12900000` |
| `El slug solo admite minúsculas, números y guiones` | Usaste mayúsculas, tildes o espacios en el slug |
| `El texto alternativo tiene que describir la foto` | Dejaste un `alt` vacío o demasiado corto |
| `Unexpected token` / `Expected ','` | Falta una coma o una comilla en el JSON. Revisa la línea que indica |

---

## Para borrar un modelo

Borra su archivo `.json` y su carpeta de fotos. Desaparece de todo el sitio
—catálogo, footer, sitemap, buscador— sin tocar nada más.

---

## Cuántos modelos aguanta

Los que quieras. El sitio no tiene ningún modelo escrito a mano en el código:
todas las listas se generan recorriendo la carpeta `src/content/modelos/`. Con 5
o con 60 funciona igual y no hay que modificar ningún componente.
