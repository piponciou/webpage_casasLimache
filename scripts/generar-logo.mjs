/**
 * GENERADOR DE PIEZAS DE MARCA
 * ============================
 * Toma un único archivo fuente —originales/logo-original.png— y produce todo lo
 * que el sitio necesita: el ícono del header, el logo completo del footer, los
 * favicon y la imagen para redes sociales.
 *
 * El original vive fuera de public/ a propósito: es material de trabajo, no un
 * archivo que deba publicarse en el sitio.
 *
 * Es reproducible: si el cliente entrega un logo nuevo (idealmente en SVG), se
 * reemplaza el archivo fuente, se corre `npm run logo` y todo se regenera.
 *
 * Las proporciones de recorte están medidas sobre el archivo de 3020×1376.
 * Si cambia la composición del logo, hay que volver a medirlas: están todas
 * juntas en RECORTES, con un comentario de qué contiene cada una.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = join(raiz, 'originales', 'logo-original.png');
const destinoMarca = join(raiz, 'public', 'images', 'brand');
const destinoOg = join(raiz, 'public', 'images', 'og');
const destinoPublico = join(raiz, 'public');

/**
 * Recortes expresados en FRACCIONES del archivo, no en píxeles.
 *
 * Se midieron sobre el original de 3020×1376, pero van en proporciones para que
 * el script siga funcionando si el archivo fuente llega en otra resolución. Si
 * algún día cambia la composición del logo, hay que volver a medirlas.
 */
const RECORTES = {
  // Casa + pino + línea de suelo + estrellas. Sin el nombre en arco.
  icono: { x: 0.3311, y: 0.3016, w: 0.4205, h: 0.4615 },
  // Todo: arco, ícono y eslogan. Es el bloque de tinta completo.
  completo: { x: 0.1089, y: 0.0247, w: 0.7987, h: 0.8852 },
};

/**
 * Al recortar el ícono entran trozos de las letras del arco, que lo rodean.
 *
 * Se limpian por tamaño y no por coordenadas: la casa, el pino y las estrellas
 * son manchas grandes y conectadas; los restos de letras son manchas sueltas y
 * chicas. Filtrar por área aguanta que el logo cambie de resolución o se recorte
 * distinto, cosa que unas coordenadas fijas no aguantan.
 */
/* Medido sobre el logo real: las tres piezas buenas ocupan 18%, 14% y 6% del
   recorte; los restos de letras, 0,7% y 0,5%. El corte en 2% las separa con
   holgura por los dos lados. */
const AREA_MINIMA = 0.02;

/** Pasa un recorte en fracciones a píxeles del archivo que se está usando. */
const aPixeles = (frac, meta) => ({
  left: Math.round(frac.x * meta.width),
  top: Math.round(frac.y * meta.height),
  width: Math.round(frac.w * meta.width),
  height: Math.round(frac.h * meta.height),
});

/** Umbrales del recorte de fondo. El blanco del archivo trae ruido de
 *  compresión (esquinas entre 230 y 253), por eso el corte va en 225 y no en
 *  245: si no, ese ruido queda como un velo gris sobre el fondo del sitio. */
const BLANCO = 225;
const TINTA = 190;

const anchoMaximo = (recorte, alturaObjetivo) =>
  Math.round((recorte.width / recorte.height) * alturaObjetivo);

/**
 * Convierte el blanco en transparencia conservando el antialiasing de los
 * bordes. Opcionalmente borra la esquina que invade el arco.
 */
async function recortarFondo(recorte, { limpiarSueltos = false } = {}) {
  const { data, info } = await sharp(ORIGEN)
    .extract(recorte)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < width * height; i++) {
    const p = i * channels;
    const luma = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
    if (luma >= BLANCO) data[p + 3] = 0;
    else if (luma <= TINTA) data[p + 3] = 255;
    else data[p + 3] = Math.round(((BLANCO - luma) / (BLANCO - TINTA)) * 255);
  }

  if (limpiarSueltos) borrarManchasChicas(data, width, height, channels);

  return sharp(data, { raw: { width, height, channels } }).png();
}

/** Deja transparente toda mancha conectada menor a AREA_MINIMA del recorte. */
function borrarManchasChicas(data, width, height, channels) {
  const opaco = (i) => data[i * channels + 3] > 40;
  const visto = new Uint8Array(width * height);
  const minimo = Math.round(width * height * AREA_MINIMA);

  for (let inicio = 0; inicio < width * height; inicio++) {
    if (visto[inicio] || !opaco(inicio)) continue;

    const pila = [inicio];
    const mancha = [];
    visto[inicio] = 1;

    while (pila.length) {
      const i = pila.pop();
      mancha.push(i);
      const x = i % width;
      const y = (i / width) | 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const j = ny * width + nx;
          if (visto[j] || !opaco(j)) continue;
          visto[j] = 1;
          pila.push(j);
        }
      }
    }

    if (mancha.length < minimo) {
      for (const i of mancha) data[i * channels + 3] = 0;
    }
  }
}

/** Recorta las filas y columnas totalmente transparentes que quedan al borde. */
async function ajustar(pipeline) {
  const buf = await pipeline.toBuffer();
  return sharp(buf).trim({ threshold: 1 });
}

async function main() {
  if (!existsSync(ORIGEN)) {
    console.error('[logo] No encuentro originales/logo-original.png');
    process.exitCode = 1;
    return;
  }

  mkdirSync(destinoMarca, { recursive: true });
  mkdirSync(destinoOg, { recursive: true });

  const meta = await sharp(ORIGEN).metadata();
  console.log(`[logo] fuente: ${meta.width}×${meta.height} (${meta.format})`);

  // ---------------------------------------------------------------- ícono ---
  const iconoBase = await ajustar(
    await recortarFondo(aPixeles(RECORTES.icono, meta), { limpiarSueltos: true })
  );
  const metaIcono = await iconoBase.metadata();
  const iconoBuf = await iconoBase.png().toBuffer();

  // Alto de referencia en el header: 44px. Se exportan las tres densidades.
  const ALTO_ICONO = 44;
  for (const [sufijo, escala] of [['', 1], ['@2x', 2], ['@3x', 3]]) {
    await sharp(iconoBuf)
      .resize({ height: ALTO_ICONO * escala })
      .png({ compressionLevel: 9, palette: true })
      .toFile(join(destinoMarca, `logo-icono${sufijo}.png`));
  }

  // -------------------------------------------------------------- completo ---
  const completoBase = await ajustar(await recortarFondo(aPixeles(RECORTES.completo, meta)));
  const metaCompleto = await completoBase.metadata();
  const completoBuf = await completoBase.png().toBuffer();

  // Alto de referencia en el footer: 96px.
  const ALTO_COMPLETO = 96;
  for (const [sufijo, escala] of [['', 1], ['@2x', 2], ['@3x', 3]]) {
    await sharp(completoBuf)
      .resize({ height: ALTO_COMPLETO * escala })
      .png({ compressionLevel: 9 })
      .toFile(join(destinoMarca, `logo-completo${sufijo}.png`));
  }

  // --------------------------------------------------------------- favicon ---
  // El ícono es apaisado (≈2:1), así que en un lienzo cuadrado va sobre una
  // placa con aire alrededor.
  //
  // La placa es CLARA a propósito. Se probó con el azul de la marca y a 32px la
  // casa desaparecía: azul sobre azul deja ver solo el pino verde. Con la placa
  // clara, la casa y el pino se leen los dos.
  const placaClara = '#f1f3f1';

  async function placa(lado, proporcionIcono, archivo, fondo) {
    const anchoIcono = Math.round(lado * proporcionIcono);
    const icono = await sharp(iconoBuf).resize({ width: anchoIcono }).toBuffer();
    const metaI = await sharp(icono).metadata();

    await sharp({
      create: {
        width: lado,
        height: lado,
        channels: 4,
        background: fondo,
      },
    })
      .composite([
        {
          input: icono,
          left: Math.round((lado - metaI.width) / 2),
          top: Math.round((lado - metaI.height) / 2),
        },
      ])
      .png({ compressionLevel: 9 })
      .toFile(archivo);
  }

  await placa(32, 0.92, join(destinoPublico, 'favicon-32.png'), placaClara);
  await placa(180, 0.82, join(destinoPublico, 'apple-touch-icon.png'), placaClara);

  // -------------------------------------------------------------------- OG ---
  // 1200×630 sobre el fondo del sitio, con el logo completo centrado.
  const anchoLogoOg = 620;
  const logoOg = await sharp(completoBuf).resize({ width: anchoLogoOg }).toBuffer();
  const metaOg = await sharp(logoOg).metadata();

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#f4f1e8' },
  })
    .composite([
      {
        input: logoOg,
        left: Math.round((1200 - metaOg.width) / 2),
        top: Math.round((630 - metaOg.height) / 2),
      },
    ])
    .jpeg({ quality: 88, progressive: true, mozjpeg: true })
    .toFile(join(destinoOg, 'portada.jpg'));

  console.log('[logo] listo:');
  console.log(`  ícono    ${metaIcono.width}×${metaIcono.height} → logo-icono.png (${anchoMaximo(
    { width: metaIcono.width, height: metaIcono.height },
    ALTO_ICONO
  )}×${ALTO_ICONO} en pantalla, hasta 3x sin escalar hacia arriba)`);
  console.log(`  completo ${metaCompleto.width}×${metaCompleto.height} → logo-completo.png`);
  console.log('  favicon-32.png · apple-touch-icon.png · images/og/portada.jpg');
}

main();
