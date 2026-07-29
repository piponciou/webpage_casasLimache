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

### La única foto que tiene dos versiones

La portada del sitio (`hero/portada.jpg`) es la imagen más grande y la primera
que carga, así que existe también en versión chica: `hero/portada-800.jpg`. El
celular descarga la chica y el computador la grande.

**Tú solo reemplazas `portada.jpg`.** Después corre:

```bash
npm run optimizar-imagenes
```

y la versión de 800 px se regenera sola a partir de la que subiste. Si te olvidas
de correrlo, la portada va a seguir viéndose bien en computador pero en celular
va a aparecer la foto anterior.

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

## 6. El texto alternativo (importante para Google)

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
