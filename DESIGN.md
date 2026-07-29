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

Cinco tonos, todos sacados de materiales que existen en la obra. Están en
`src/styles/tokens.css`.

| Token | Hex | De dónde sale |
|---|---|---|
| `--tinta-fieltro` | `#1c1f1d` | El papel fieltro entre la tabiquería y el panel |
| `--zinc-marga` | `#d7dcda` | Zinc galvanizado con la humedad de la mañana. **Fondo del sitio** |
| `--neblina` | `#f1f3f1` | La bruma sobre el cerro. Superficies elevadas |
| `--pino-radiata` | `#c08a3e` | Pino sin pintar bajo sol. **Único acento** |
| `--lapiz-carpintero` | `#2e4e5c` | El lápiz plano azul. Cotas, enlaces y foco |

**Reglas de color:**

- **El pino nunca se usa como color de texto sobre fondo claro** (daría 2.4:1).
  Solo como relleno, o como texto sobre tinta.
- El botón principal, al pasar el mouse, **invierte el material** (fondo tinta,
  texto pino) en vez de oscurecerse: un pino más oscuro bajaría de AA.
- El verde de WhatsApp aparece solo dentro del glifo del ícono, jamás como color
  de superficie.
- Un solo acento en todo el sitio. Sin color secundario, sin estados de relleno
  de color.

**Contraste verificado** (medido en el navegador, no estimado): tinta sobre zinc
11.9:1 · lápiz sobre zinc 6.4:1 · texto suave 8.0:1 · texto tenue 5.1:1 · pino
sobre tinta 5.3:1. Los dos niveles de texto secundario están calculados para
pasar AA: un gris más claro se veía mejor en la maqueta y era ilegible en un
celular al sol.

---

## Tipografía

- **Archivo Variable** — solo en el titular del hero, los H2 de sección y los
  numerales grandes de m². Es una grotesca de señalética industrial: se parece a
  un letrero de obra, no a una revista.
- **IBM Plex Sans** — todo el texto de lectura.
- **IBM Plex Mono** — **exclusivamente la capa de medición**: cotas,
  especificaciones, precios, metrajes, migas de pan. Es la hermana del texto
  (misma superfamilia), así que no hay ruido tipográfico: la mono es el tono de
  voz de los datos.

**No hay ninguna serifa en el sitio.** Una serif lo empujaría hacia
"inmobiliaria premium", que es el lugar equivocado.

Las tres están autoalojadas en `public/fonts/`, copiadas desde `node_modules` por
`scripts/copiar-fuentes.mjs` para que la ruta sea estable y se pueda precargar.

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
