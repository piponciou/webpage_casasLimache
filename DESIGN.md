# DESIGN — Casas Limache

> El mundo visual del sitio. Si vas a tocar la interfaz, lee esto antes.
> El contexto de negocio está en [PRODUCT.md](PRODUCT.md).

## La dirección: **Cota**

La casa no se compra por emoción, se compra por número: 36 m² o 72 m², dos o
cuatro dormitorios, Kit Básico o Llave en Mano. La interfaz, entonces, **mide**:
está construida sobre la línea de acotación de un plano de arquitecto.

No es una metáfora decorativa. El plano es literalmente el documento que el
cliente pide antes de comprar, y hacer del sistema de medición el sistema
gráfico logra que la parte más útil del sitio sea también la más bonita.

Además resuelve un problema real: **no hay fotos**. Una identidad hecha de líneas
y números funciona con placeholders de color plano y sigue funcionando cuando
lleguen las fotos reales.

---

## Elemento firma: la cota

Una línea de 1.5px en azul de lápiz de carpintero, con remates a 45°, y un
numeral en monoespaciada al centro.

**Dónde aparece:**

- En el margen izquierdo del hero, midiendo la altura libre real de la casa
  (dato que sale de las especificaciones del modelo, no escrito a mano).
- Bajo cada tarjeta del catálogo, midiendo su metraje.
- En la ficha de modelo, midiendo el rango de metrajes disponibles.
- En la página de casa piloto, midiendo la altura interior.

**Las tres reglas que la protegen:**

1. Solo acota números que existen en los datos. Nunca inventa una medida.
2. Máximo una por componente.
3. Si el ancho no alcanza para que el numeral quepa, la cota desaparece en vez
   de encogerse.

**No hay ningún otro adorno en el sitio.** Sin blobs, sin patrones, sin líneas
decorativas. El componente es `src/components/Cota.astro`.

---

## Color

Seis tonos, todos sacados de materiales que existen en la obra o en la parcela.
Están en `src/styles/tokens.css`.

| Token | Hex | De dónde sale |
|---|---|---|
| `--carbon` | `#2c2a26` | Gris carbón con marrón adentro: la sombra de una viga. **Todo el texto** |
| `--lino` | `#f4f1e8` | Tela de lino sin teñir, casi arena. **Fondo del sitio** |
| `--nieve` | `#fffdf8` | Blanco cálido. Superficies elevadas |
| `--bosque` | `#3a5a40` | Verde de quebrada a la sombra. **Único acento**: botones, enlaces, cotas y foco |
| `--roble` | `#c9a274` | Roble claro barnizado. La madera, siempre en toques |
| `--arcilla` | `#a8503a` | Greda cocida. El detalle de terracota en bloques oscuros |

**Reglas de color:**

- **El roble nunca se usa como color de texto sobre fondo claro** (daría 2.0:1).
  Solo como relleno, superficie, o texto sobre carbón.
- **El bosque es al revés: nunca sobre carbón** (1.8:1). En bloque oscuro el
  papel del acento lo toma el roble, o el bosque aclarado (`--bosque-claro`).
- El botón principal, al pasar el mouse, **invierte el material** (fondo carbón,
  texto nieve) en vez de oscurecerse: un verde más oscuro bajaría de AA.
- El verde de WhatsApp aparece solo dentro del glifo del ícono. El botón que lo
  contiene usa el bosque de la paleta, no el verde de la marca ajena.
- Un solo acento en todo el sitio. La madera y la terracota son calor, no
  acción: no rellenan botones ni marcan estados.

**Contraste verificado** (calculado con la fórmula WCAG 2.1 y confirmado en el
navegador, no estimado): carbón sobre lino 12.7:1 · bosque sobre lino 6.9:1 ·
nieve sobre bosque 7.6:1 · texto suave 8.9:1 · texto tenue 5.1:1 · roble sobre
carbón 6.1:1. Los dos niveles de texto secundario están calculados para pasar
AA: un gris más claro se veía mejor en la maqueta y era ilegible en un celular
al sol.

---

## Tipografía

- **Merriweather Variable** — solo en el titular del hero, los H2 de sección y
  los numerales grandes de m². Es una serif de trazo grueso y remates cuadrados,
  dibujada para leerse en pantalla: pone la madera y el peso de lo construido en
  la letra, sin necesidad de un adorno que lo diga.
- **DM Sans Variable** — todo el texto de lectura. Geométrica y redonda, sin
  ruido: que la serif de arriba sea la única que llama la atención.
- **IBM Plex Mono** — **exclusivamente la capa de medición**: cotas,
  especificaciones, precios, metrajes, migas de pan. La mono es el tono de voz
  de los datos.

**La serif vive solo en los titulares.** En el cuerpo empujaría el sitio hacia
"inmobiliaria premium", que es el lugar equivocado; en el titular hace lo
contrario, porque ahí compite con una foto y no con un párrafo.

**Interlínea de titular: nunca por debajo de 1.11.** Medido en el navegador,
Merriweather sube 0.84em en las ascendentes y baja 0.27em en las descendentes:
más apretado que eso y las líneas se pisan. El hero, que cae en cuatro líneas,
es donde se nota primero.

Las tres están autoalojadas en `public/fonts/`, copiadas desde `node_modules` por
`scripts/copiar-fuentes.mjs` para que la ruta sea estable y se pueda precargar.
Merriweather y DM Sans son archivos variables: un `.woff2` cubre todos los pesos.

---

## Retícula

> 12 columnas con máximo de 1240px, desplazadas por un **margen de cota**
> permanente a la izquierda (56px en escritorio, 24px en móvil) que nunca lleva
> contenido: solo alberga las acotaciones.

Ese margen es lo que impide que el móvil sea "el escritorio achicado": la
identidad no depende del ancho. La clase es `.envoltorio`.

**El hero es la única excepción**: su contenedor no está centrado, sino que
calcula su padding izquierdo en porcentaje para caer exactamente donde empieza
`.envoltorio`, y deja el padding derecho en cero para que la foto sangre hasta el
borde de la ventana. Se hace con porcentajes y no con `100vw` a propósito: `100vw`
ignora el ancho de la barra de scroll y provoca desborde horizontal.

---

## Forma y elevación

- **Radio 4px** en tarjetas y botones. El mundo es de plano técnico, no de app.
  Es un desvío consciente del radio 12–16px habitual, justificado por la
  dirección comprometida.
- **La elevación se declara una sola vez por elemento: o borde, o sombra. Nunca
  las dos.** Las tarjetas se separan por superficie (`--neblina` sobre
  `--zinc-marga`) más una sombra baja, sin borde.
- Los filos capilares existen **solo en las cotas y en los separadores de
  sección**. Nada de densidad de periódico: la línea de texto se mantiene entre
  62 y 68 caracteres y las columnas van aireadas.

---

## Movimiento

**Un solo momento coreografiado: la entrada del hero.** El aviso y el titular
suben, la foto se descubre desde su borde izquierdo con `clip-path` (el mismo
gesto del corte que la sangra a la derecha) y recién entonces la cota se dibuja
con `stroke`/`scaleY` y aparece el numeral.

En scroll, revelados de 12px más opacidad, nada más. Con
`prefers-reduced-motion: reduce` todo aparece ya dibujado, sin excepción, y el
contenido nunca depende de que el JavaScript corra: la clase `.visible` solo se
agrega, jamás se quita.

---

## Prohibiciones que aplican a este proyecto

Del encargo original, y siguen vigentes:

- ❌ Fondo crema `#F4F1EA` + serif de alto contraste + acento terracota.
- ❌ Negro casi puro con acento verde ácido o bermellón.
- ❌ Layout tipo diario: filos capilares en todo, radio 0, columnas densas.
- ❌ Gradientes morado→azul, glassmorphism, blobs SVG decorativos.
- ❌ Numeración 01/02/03 salvo secuencia real. **Solo el proceso de compra la
  usa**; los beneficios no.
- ❌ Íconos de librería. Hay un set propio de 6 en `src/components/Icono.astro`,
  todos con el mismo trazo de 1.5px de la cota.
- ❌ Fotos de stock de familia feliz.
- ❌ Copy de relleno tipo "calidad, confianza y compromiso".

---

## Decisiones de composición que conviene no deshacer

- **La barra de confianza no son tarjetas con ícono.** Son cuatro afirmaciones
  separadas por una línea, que es lo que son.
- **El botón "Ver catálogo completo" ocupa el ancho completo y no comparte fila
  con nada.** Es un requisito explícito del cliente: tiene que ser imposible de
  no ver.
- **El estado activo de la navegación se marca con la cota**, no con color.
- **Lo que no incluye un modelo se marca con una cruz gris**, no con un color de
  alerta: es información, no un error.
- **La tabla de variantes de la ficha no está oculta.** Es contenido útil y a la
  vez garantiza que cada combinación de metraje y formato exista en el HTML para
  que Google la indexe sin ejecutar JavaScript.
