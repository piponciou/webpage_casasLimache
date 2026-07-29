# PRODUCT — Casas Limache

> Contexto de producto para quien retome este proyecto (persona o agente).
> Las decisiones de diseño visual están en [DESIGN.md](DESIGN.md).

## Qué es

Sitio estático de **Casas Limache**, empresa de venta y construcción de casas
prefabricadas en la Región de Valparaíso, Chile.

## Quién lo usa

Una persona buscando en el celular "casas prefabricadas Limache" en Google.
Tiene un terreno, o está por comprarlo, y quiere saber cuánto cuesta una casa y
cómo se ve. Desconfía de comprar por internet algo de este monto.

**Escenario de uso real:** de pie, con una mano, en la calle o en el terreno,
con datos móviles y a plena luz. Por eso el sitio es claro, de alto contraste y
liviano, y por eso el objetivo táctil mínimo se respeta en serio.

## Qué tiene que pasar

Que esa persona llegue, encuentre un modelo, elija metraje y formato, y toque un
botón que le abra WhatsApp con todo el contexto ya escrito. **En menos de 60
segundos.**

No hay carrito, ni checkout, ni formulario de contacto. La conversión es una sola
y es abrir un chat.

## El diferenciador

**La casa piloto.** El cliente puede recorrer una casa antes de comprarla, en
Camino Troncal 06680, sector Lo Hidalgo, Villa Alemana. Frente a la competencia
que vende solo por internet, esa es la ventaja y el sitio la repite en la
portada, en una página dedicada y en las 12 landings por comuna.

## Modelo de negocio

Tres formatos de compra sobre el mismo modelo de casa:

- **Kit Básico** — la estructura: paneles exteriores media luna 5", tabiquería
  2×3 con papel fieltro, paneles interiores con volcanita y techumbre.
- **Semifull** — el kit más terminaciones principales.
- **Llave en Mano** — la casa terminada e instalada.

**Nunca se incluye:** radier, instalaciones eléctricas y sanitarias, permisos
municipales ni flete. Decirlo de frente en cada ficha es una decisión de
producto: filtra consultas que no van a llegar a nada y genera confianza.

## Restricciones que no se negocian

1. **Nada inventado.** Precios, plazos, garantías, años de experiencia y
   cantidad de casas entregadas van como marcador visible mientras no estén
   confirmados. Ver [PENDIENTES.md](PENDIENTES.md).
2. **Sin panel de administración.** El catálogo se edita en archivos JSON. Nada
   de Decap, Netlify CMS, Sanity o Strapi.
3. **Ningún modelo hardcodeado.** Si agregar un modelo obliga a editar un
   `.astro`, `.tsx` o `.css`, la arquitectura está mal.
4. **Cero fotos reales generadas o descargadas.** Los placeholders son de color
   plano y los produce un script.
5. **SEO local antes que cualquier otra cosa.** Cada modelo y cada comuna es una
   URL propia, indexable, con contenido genuinamente distinto.

## Modo de la superficie

**Persuade.** Es un sitio de marketing donde el diseño es el producto: tiene que
ganarse la atención y provocar una acción. No es una herramienta que alguien usa
todos los días.

## Estado

Construido y funcionando. 26 páginas. Falta lo que dice
[PENDIENTES.md](PENDIENTES.md): datos comerciales por confirmar, la historia de
la empresa, los testimonios y todas las fotos.
