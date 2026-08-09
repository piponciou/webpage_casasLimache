# Cómo cambiar las fotos del sitio

Este manual es para cualquier persona, no hace falta saber programar. Al terminar
vas a poder reemplazar cualquier foto del sitio sin romper nada.

**Lo primero, lo más importante:** hoy el sitio NO tiene fotos reales. Todas las
imágenes son rectángulos grises con el nombre del archivo escrito encima. Eso es
a propósito: es para que sepas exactamente qué foto va en cada lugar.

---

## 1. La regla de oro

> **No cambies el nombre del archivo. Reemplaza el archivo.**

El sitio busca las fotos por su nombre. Si subes `casa1.jpg` en vez de
`01-exterior.jpg`, esa foto no va a aparecer en ninguna parte.

Lo que tienes que hacer siempre es:

1. Tomar tu foto.
2. Ponerle **exactamente** el nombre del archivo gris que quieres reemplazar.
3. Copiarla encima, aceptando "reemplazar el archivo existente".

Nada más. No hay que editar código.

---

## 2. Dónde está cada foto

Todas las imágenes viven dentro de la carpeta `public/images/`.

```
public/images/
├── modelos/
│   ├── limache/            ← un modelo = una carpeta
│   │   ├── 01-exterior.jpg
│   │   ├── 02-interior.jpg
│   │   ├── 03-cocina.jpg
│   │   ├── 04-dormitorio.jpg
│   │   ├── tarjeta.jpg
│   │   └── plano.jpg
│   ├── olmue/
│   ├── granizo/
│   ├── quillota/
│   ├── marga-marga/
│   ├── lo-hidalgo/
│   ├── penablanca/
│   └── aconcagua/
├── casa-piloto/
│   ├── 01-fachada.jpg
│   ├── 02-interior.jpg
│   └── 03-terreno.jpg
├── hero/
│   └── portada.jpg         ← la foto grande de la portada
├── og/
│   └── portada.jpg         ← la que se ve al compartir el sitio por WhatsApp
├── proceso/
└── brand/
```

### Qué es cada archivo dentro de un modelo

| Archivo | Dónde aparece | Qué foto poner |
|---|---|---|
| `01-exterior.jpg` | Primera foto de la galería, la grande | La fachada, la casa completa desde afuera |
| `02-interior.jpg` | Galería | El living o el espacio principal por dentro |
| `03-cocina.jpg` | Galería | La cocina |
| `04-dormitorio.jpg` | Galería | El dormitorio principal |
| `tarjeta.jpg` | La foto chica del catálogo | La misma que `01-exterior.jpg`, pero más chica |
| `plano.jpg` | Sección "Distribución" | El plano de la distribución |

---

## 3. Tamaños: esto es lo que evita que se descuadre el sitio

Cada foto tiene que tener la **proporción** correcta. Si subes una foto cuadrada
donde va una rectangular, el sitio la va a recortar y puede cortar algo importante.

| Para qué | Proporción | Tamaño recomendado |
|---|---|---|
| Galería de un modelo (`01`, `02`, `03`, `04`) | 3:2 (horizontal) | **1600 × 1067 px** |
| Tarjeta del catálogo (`tarjeta.jpg`) | 3:2 (horizontal) | **800 × 533 px** |
| Portada del sitio (`hero/portada.jpg`) | 16:9 (bien ancha) | **2000 × 1125 px** |
| Portada, versión celular (`hero/portada-800.jpg`) | 16:9 | **800 × 450 px** — *no la hagas a mano*, ver abajo |
| Plano (`plano.jpg`) | 4:3 | **1400 × 1050 px** |
| Foto para compartir (`og/portada.jpg`) | 1.91:1 | **1200 × 630 px** |
| Fotos de la casa piloto | 3:2 (horizontal) | **1600 × 1067 px** |

**Truco:** si tu foto viene del celular, normalmente es 4:3 y hay que recortarla
a 3:2. Cualquier editor lo hace, incluso el visor de fotos de Windows.

---

## 4. Comprimir las fotos (no te saltes este paso)

Una foto de celular pesa entre 4 y 8 MB. Si subes seis así, el sitio va a tardar
en cargar y Google lo va a penalizar. La foto tiene que quedar **bajo 300 KB**.

### La forma fácil

1. Entra a [squoosh.app](https://squoosh.app) (es gratis y no hay que instalar nada).
2. Arrastra tu foto.
3. A la derecha, elige **MozJPEG** y baja la calidad hasta que el peso quede
   bajo 300 KB. Entre 70 y 80 de calidad casi nunca se nota la diferencia.
4. Descarga y ponle el nombre correcto.

### La forma automática

Si tienes muchas fotos, déjalas en su carpeta con el nombre correcto y corre
este comando una sola vez:

```bash
npm run optimizar-imagenes
```

Va a recorrer `public/images/`, dejar cada foto en su tamaño correcto y
comprimirla, sin cambiarle el nombre. Te dice cuánto peso ahorró.

### La portada del hero: reemplazas una, se generan cinco

`hero/portada.jpg` es la foto más importante del sitio. A partir de ella el
script genera cinco archivos más:

| Archivo | Para qué |
|---|---|
| `portada.jpg` / `.webp` | Pantallas grandes |
| `portada-1200.jpg` / `.webp` | Pantallas medianas |
| `portada-800.jpg` / `.webp` | **Celular** |

Todas en **16:9**, la misma proporción que tiene la caja donde se muestran, para
que la casa se vea completa y no se recorte por los lados en ningún tamaño. Y en
WebP además del JPEG porque pesa casi la mitad; el navegador elige solo cuál usar.

**Tú reemplazas SOLO `portada.jpg`** por tu foto (horizontal, en 16:9, cuanto más
grande mejor, mínimo 2000 px de ancho). Después corre:

```bash
npm run optimizar-imagenes
```

y los otros siete se regeneran solos. **Si no corres el comando, en el celular
se va a seguir viendo la foto anterior.**

### ⚠️ Cuidado con el nombre del archivo en Windows

Si guardas una imagen PNG y le cambias el nombre a `portada.jpg`, Windows puede
dejarla como `portada.jpg.png`. Eso rompe la portada: el sitio busca
`portada.jpg` y no la encuentra.

Comprueba que el archivo se llame exactamente `portada.jpg`, sin nada después.
El script avisa si detecta una imagen con la extensión equivocada y la convierte.

---

## 5. Ejemplo completo, paso a paso

**Quiero cambiar la foto de la fachada del modelo Limache.**

**Antes:**

```
public/images/modelos/limache/01-exterior.jpg
   → un rectángulo gris que dice "01-exterior.jpg  1600 × 1067 px · 3:2"
```

1. Tomo la foto de la casa Limache terminada, en horizontal.
2. La recorto a proporción 3:2 y la dejo en 1600 × 1067 px.
3. La comprimo en squoosh.app hasta que pese 240 KB.
4. La renombro a `01-exterior.jpg`.
5. La copio en `public/images/modelos/limache/` y acepto reemplazar.

**Después:**

```
public/images/modelos/limache/01-exterior.jpg
   → la foto real de la casa
```

La foto ahora aparece sola en: la galería de `/modelos/limache/`, y en cualquier
otro lugar donde esa imagen esté referenciada. **No hay que tocar ningún archivo
de código.**

---

## 5 bis. El logo de la empresa

El logo **no se edita a mano**. Hay un solo archivo fuente y un comando que
genera todas las piezas que usa el sitio.

**El archivo fuente vive en `originales/logo-original.png`**, fuera de la carpeta
que se publica: es material de trabajo, no algo que deba descargar quien visita
el sitio.

Para regenerar todo después de reemplazarlo:

```bash
npm run logo
```

Eso produce, solo, estas piezas:

| Pieza | Dónde se usa |
|---|---|
| `images/brand/logo-icono.png` (+`@2x`, `@3x`) | El ícono del header |
| `images/brand/logo-completo.png` (+`@2x`, `@3x`) | El logo entero, con eslogan |
| `favicon-32.png` | El iconito de la pestaña del navegador |
| `apple-touch-icon.png` | El ícono al guardar el sitio en un iPhone |
| `images/og/portada.jpg` | La imagen que se ve al compartir el enlace |

### Por qué el header no lleva el logo completo

En el logo, el nombre "Casas Limache" va **en arco alrededor del ícono**, no al
lado. A la altura de un header (44 px) esas letras quedan de 8 px: ilegibles.
Por eso el header usa el ícono de la marca junto al nombre escrito con la
tipografía del sitio, que se lee nítido en cualquier tamaño.

### ⚠️ Lo ideal es conseguir el logo en SVG

Un SVG es un archivo de dibujo vectorial: se ve perfecto a cualquier tamaño, pesa
menos y permite separar el ícono del texto sin recortar nada. Si en algún momento
consigues el logo en `.svg` con quien lo diseñó, es un cambio que mejora la
nitidez en celulares y simplifica todo esto.

Cada foto tiene un texto que describe lo que se ve. Lo usan Google y las personas
ciegas. Ese texto SÍ está en un archivo, y conviene actualizarlo cuando cambies
una foto por algo distinto.

Está en `src/content/modelos/limache.json`, así:

```json
"imagenes": [
  {
    "src": "/images/modelos/limache/01-exterior.jpg",
    "alt": "Modelo Limache de 72 m² — fachada exterior"
  }
]
```

Solo cambia lo que está después de `"alt":`, entre comillas. Describe la foto en
una línea, como si se la contaras a alguien por teléfono. Nunca lo dejes vacío ni
escribas "imagen" o "foto".

---

## 7. Errores frecuentes

| Lo que pasó | Por qué | Cómo se arregla |
|---|---|---|
| Subí la foto y sigue saliendo el rectángulo gris | El nombre del archivo no coincide | Revisa mayúsculas, tildes y la extensión: tiene que ser `.jpg`, no `.JPG` ni `.jpeg` |
| La foto sale cortada | La proporción no es la de la tabla | Recórtala a 3:2 (o la que corresponda) antes de subirla |
| El sitio quedó lento | Las fotos pesan demasiado | Corre `npm run optimizar-imagenes` o pásalas por squoosh.app |
| Quiero volver a los rectángulos grises | Se borró o dañó una foto | Corre `npm run placeholders`: regenera solo los archivos que falten |
| Cambié la foto, se subió bien, pero online sigo viendo la anterior | Tu navegador la tiene en caché | `Ctrl + Shift + R`. Ver la sección 7 bis |

---

## 7 bis. Por qué a veces sigues viendo la foto vieja online

Las fotos conservan el nombre cuando las reemplazas —esa es la gracia, no hay
que tocar ningún JSON—, pero eso significa que la **URL no cambia**. Para el
navegador `tarjeta.jpg` sigue siendo el mismo archivo de siempre, así que sirve
la copia que ya tenía guardada sin preguntarle al servidor.

El tiempo que la guarda lo fija `vercel.json`:

```json
{ "source": "/images/(.*)",
  "headers": [{ "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" }] }
```

`max-age=3600` es **una hora**. Estuvo en 604800 (una semana) y se bajó: con las
fotos todavía provisionales, cada reemplazo tardaba hasta siete días en verse
para quien ya había visitado el sitio. Ojo: `must-revalidate` no obliga a
revalidar mientras el archivo está fresco, solo prohíbe servirlo vencido.

**Cuando las fotos sean las definitivas, conviene volver a subirlo a 604800**:
son archivos que ya no van a cambiar y una semana de caché ahorra descargas.

Mientras tanto, si acabas de subir una foto y quieres verla ya: `Ctrl + Shift + R`.

---

## 8. Si necesitas regenerar los rectángulos grises

```bash
npm run placeholders
```

Genera los archivos que falten y **respeta las fotos reales que ya subiste**. Si
además quieres borrar tus fotos y volver a dejar todo gris (rara vez se necesita):

```bash
npm run placeholders -- --forzar
```
