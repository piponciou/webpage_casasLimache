# PROMPT — Ajustes de hero, logo y móvil · Casas Limache

> Este documento **reemplaza y anula** cualquier instrucción anterior sobre rediseño del hero.
> Adjunto la imagen del logo de la empresa junto a este mensaje.

---

## 0. Lo primero: descartar el rediseño anterior

**Ignora por completo el prompt anterior sobre el carrusel de modelos.** Quedó sin efecto. No se va a hacer ningún carrusel, ni slider, ni slides deslizables, ni tarjetas de oferta en el hero, ni ninguna reestructuración del bloque principal.

Si ya empezaste a implementar algo de eso:

1. Revisa `git status` y `git diff` para ver qué tocaste.
2. Revierte esos cambios (`git checkout -- <archivos>` o `git stash`) hasta volver al estado que ya estaba aprobado.
3. Confírmame en el chat qué revertiste antes de seguir.

**El diseño actual del sitio está aprobado y se mantiene.** Paleta, tipografía, espaciados, secciones, catálogo, fichas de modelo, footer, landings, SEO y lógica de WhatsApp: nada de eso se toca.

De esta iteración solo se ejecutan **tres cosas**, descritas en las secciones 2, 3 y 4.

Antes de escribir código, dime qué archivos vas a modificar y cómo vas a resolver el punto 2. Espera mi aprobación.

---

## 1. Estado actual del hero

El hero tiene dos columnas: a la izquierda el eyebrow, el `h1` "Casas prefabricadas en Limache", un párrafo y dos tarjetas de rango. A la derecha, la imagen del modelo con información sobreimpresa.

Se mantiene esa estructura. Los problemas a corregir son de encaje, no de concepto.

---

## 2. Arreglar la imagen del hero

### 2.1 El problema real

La fotografía no está mal recortada: **lo que se corta es el contenido sobreimpuesto sobre ella.**

En el estado actual se ve:
- El nombre del modelo pierde la primera letra ("CABURGA" se lee "ABURGA").
- La palabra "MODELO" queda cortada en "LO".
- Las especificaciones se leen "rmitorios", "ño", "g comedor", "na".
- La superficie "35 M²" está cortada por la izquierda.
- La fila de íconos inferior se corta en el borde derecho.

El overlay está posicionado fuera de los límites visibles de su contenedor y el `overflow: hidden` lo recorta. Diagnostícalo en el CSS antes de parchar: revisa el `position`, los offsets negativos, el `object-fit` / `object-position` de la imagen y si el contenedor del texto es más ancho que el marco visible.

### 2.2 Restricciones

- **La imagen no se achica.** Mantiene su presencia visual actual.
- **Se puede quitar contenido para ganar espacio.** Ver 2.3.
- El texto sobreimpreso debe quedar **completo, dentro del área visible, con margen de respiro** respecto a los bordes.
- Si la imagen sangra hacia el borde derecho del viewport, eso se conserva, pero el contenido sobreimpreso vive dentro de un área segura con padding suficiente para que nada toque los bordes.

### 2.3 Eliminar las dos tarjetas de rango

Quita del hero las tarjetas **"Casas de 1 a 2 habitaciones · Desde 36 m²"** y **"Casas de 3 a 5 habitaciones · Hasta 120 m²"**.

Eso libera altura en la columna izquierda, y la imagen puede crecer verticalmente hasta alinearse con el alto total del bloque de texto. Con más alto disponible, el overlay entra sin recortes.

**No pierdas su función.** Esas tarjetas enlazaban al catálogo filtrado por número de habitaciones. Reubica esos dos enlaces como **texto discreto bajo el párrafo**, en una sola línea, algo como:

> Ver casas de 1 a 2 habitaciones · de 3 a 5 habitaciones

Mismos destinos (`/catalogo/?rango=1-2` y `/catalogo/?rango=3-5`), peso visual mínimo, sin tarjetas ni contenedores. Así conservas el enlazado interno y el filtro sin ocupar espacio.

### 2.4 Limpiar el contenido sobreimpreso

El overlay actual repite información: muestra **"CABURGA"** en grande y justo debajo **"MODELO Caburga"**. Es el mismo dato dos veces, y parte del ruido que hace que el bloque no quepa.

Deja en el overlay solo esto, en este orden:

1. Superficie (`35 m²`) — pequeño, arriba del nombre.
2. Nombre del modelo — el elemento más grande.
3. Especificaciones con íconos: dormitorios, baños, living comedor, cocina.

Elimina la línea redundante "MODELO {nombre}". Si hace falta la palabra "Modelo", que sea un eyebrow pequeño y que entonces el nombre no se repita abajo.

**Legibilidad:** el texto va sobre una fotografía que el cliente reemplazará después y cuyo color no controlas. Aplica un **scrim de degradado por CSS** sobre la imagen (oscuro en la zona donde cae el texto, transparente hacia el resto) de modo que el contraste esté garantizado con cualquier foto. Nunca quemado en el archivo. Contraste AA mínimo. Nada de `text-shadow` como muleta.

### 2.5 Placeholders

Todas las imágenes de modelos siguen siendo **placeholders de color plano** con el nombre del archivo escrito encima. No generes, no descargues y no reemplaces por fotos reales. La foto que se ve hoy en el hero es de prueba: si es un archivo real que agregó el usuario, déjala; si la agregaste tú, reemplázala por placeholder.

---

## 3. Logo de la empresa

Te adjunto el logo como imagen. Contiene el ícono, el nombre y el eslogan.

### 3.1 Tratamiento del archivo

1. Recorta el espacio en blanco sobrante alrededor del logo.
2. Si el fondo es sólido y el logo lo permite, genera una versión con fondo transparente en PNG.
3. Exporta a `public/images/brand/` en tres densidades, para que se vea nítido en pantallas retina:
   ```
   logo.png      (1x)
   logo@2x.png   (2x)
   logo@3x.png   (3x)
   ```
   Sírvelas con `srcset`.
4. Si la imagen entregada no tiene resolución suficiente para 2x o 3x, **dilo explícitamente en el chat** y usa la mayor densidad posible sin escalar hacia arriba. Un raster escalado se ve borroso, y se nota más en celular que en monitor.
5. Anota en `IMAGENES.md` que lo ideal es reemplazarlo por un **SVG vectorial** cuando el cliente lo consiga.

### 3.2 Dos versiones del lockup

El eslogan del logo es ilegible a tamaño de header. Por eso:

- **Versión compacta** (ícono + nombre, sin eslogan) → header, en escritorio y en móvil.
- **Versión completa** (ícono + nombre + eslogan) → footer, donde hay espacio para que se lea.

Si el archivo viene como una sola pieza y no se puede separar, usa la completa en el footer y en el header escálala o recórtala para que el nombre sea legible. Dime qué decidiste.

### 3.3 Ubicación y medidas

- **Header, arriba a la izquierda.** Enlazado a `/`, con `alt="Casas Limache"`. El logo *es* el enlace al home: no agregues un "Inicio" duplicado al lado.
- Altura máxima: **~44px en escritorio, ~34px en móvil.** Ajusta según la proporción real del archivo, priorizando que el nombre se lea.
- Área táctil del enlace ≥ 44×44px aunque el logo sea más chico.
- **Footer:** versión completa, tamaño moderado.
- **Favicon:** genera `favicon.svg` o el set PNG (32px y 180px para apple-touch-icon) usando **solo el ícono**, sin texto. Un favicon con el nombre completo es una mancha ilegible a 32px.
- **Open Graph:** el logo debe aparecer en la imagen `og-default` de 1200×630.
- No metas el logo dentro del hero ni sobre la imagen del modelo.

---

## 4. Que se vea bien en móvil

**Ninguna plataforma tiene prioridad.** El sitio debe verse igual de bien en celular y en escritorio. La dueña trabaja mayormente desde el teléfono; los clientes llegan desde ambos.

### 4.1 El hero en móvil

Las dos columnas se apilan. Orden: eyebrow → `h1` → párrafo → enlaces de rango → imagen.

El punto crítico es el overlay: **la información sobreimpresa que cabe en una imagen ancha de escritorio no cabe en una imagen estrecha de celular.** Resuélvelo con una de estas dos vías y explícame cuál elegiste:

- **Opción A:** en móvil la imagen usa un ratio más vertical (4:5 o 3:4), lo que da alto suficiente para que el overlay entre completo con tipografía reducida.
- **Opción B:** en móvil el overlay sale de la imagen y pasa debajo de ella, como bloque de texto normal.

Si eliges A, sirve archivos distintos por breakpoint con `<picture>` + `media`, para que el celular no descargue la versión panorámica.

En ningún caso el texto sobre la imagen puede quedar cortado, encimado o ilegible.

### 4.2 Revisión general

Verifica el sitio completo, no solo el hero, en: **320, 375, 414, 768, 1024, 1440 y 1920 px.** Toma capturas, revísalas tú mismo y repórtalas.

Puntos de control:

- Cero scroll horizontal accidental en cualquier ancho.
- El logo se lee nítido en ambos, sin pixelarse.
- Áreas táctiles ≥ 44×44px en todos los enlaces y botones.
- El botón flotante de WhatsApp no tapa contenido ni el CTA de las fichas.
- La franja oscura "Elige tu modelo con nosotros" + botón de WhatsApp se mantiene tal cual y se ve bien apilada en móvil.
- Ninguna sección con texto que se desborde o se corte.

### 4.3 Rendimiento

La imagen del hero es el LCP.

- `loading="eager"` + `fetchpriority="high"` en la imagen del hero; `lazy` en el resto del sitio.
- `width`/`height` o `aspect-ratio` declarados en todas las imágenes. Cero layout shift.
- Objetivo: **LCP < 2.0s en 4G móvil, Lighthouse ≥ 95** en las cuatro categorías. Mídelo después del cambio y reporta el resultado.

---

## 5. Criterios de aceptación

- [ ] Todo rastro del rediseño de carrusel fue revertido; el sitio quedó en el diseño aprobado.
- [ ] El texto sobreimpreso en la imagen del hero se ve completo, sin recortes, con margen respecto a los bordes.
- [ ] La imagen del hero no se achicó.
- [ ] Las dos tarjetas de rango fueron eliminadas del hero y sus enlaces sobreviven como texto discreto bajo el párrafo, con los mismos destinos.
- [ ] El overlay ya no repite el nombre del modelo dos veces.
- [ ] El scrim garantiza contraste AA del texto contra un placeholder claro y contra uno oscuro.
- [ ] El logo aparece en header (arriba a la izquierda, enlazado a `/`), footer, favicon y Open Graph.
- [ ] El logo se ve nítido en pantallas retina.
- [ ] En móvil el hero se apila y el overlay se ve completo y legible.
- [ ] Capturas revisadas en los 7 anchos, sin scroll horizontal en ninguno.
- [ ] Lighthouse móvil ≥ 95 en las cuatro categorías.
- [ ] Ninguna otra sección del sitio fue modificada.
- [ ] Las imágenes de modelos siguen siendo placeholders de color plano.

---

## 6. Al terminar, repórtame

1. Qué revertiste del trabajo anterior.
2. Cuál era la causa exacta del recorte del overlay.
3. Qué opción elegiste para el overlay en móvil (A o B) y por qué.
4. Qué decidiste respecto al lockup del logo.
5. Capturas del home en móvil y escritorio, y el resultado de Lighthouse.
