/**
 * Deja todas las fotos de public/images/ en su tamaño correcto y comprimidas.
 *
 * Para qué sirve: una foto de celular pesa 5 MB. Si el cliente sube seis así, el
 * sitio se hace lento y Google lo nota. Este script las reescribe en su lugar,
 * SIN cambiarles el nombre, para que no haya que tocar ningún JSON después.
 *
 * Uso:  npm run optimizar-imagenes
 *
 * Ojo: reescribe los archivos originales. Guarda tus fotos en tamaño completo en
 * otra parte antes de correrlo.
 */
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const carpeta = join(raiz, 'public', 'images');

/** Mismas medidas que documenta IMAGENES.md. Si cambian, cambian en los dos. */
const MEDIDAS = {
  'tarjeta.jpg': { w: 800, h: 533 },
  'plano.jpg': { w: 1400, h: 1050 },
  'hero/portada.jpg': { w: 2000, h: 1125 },
  'hero/portada-1200.jpg': { w: 1200, h: 675 },
  'hero/portada-4x5.jpg': { w: 900, h: 1125 },
  'hero/portada-4x5-600.jpg': { w: 600, h: 750 },
  'og/portada.jpg': { w: 1200, h: 630 },
  defecto: { w: 1600, h: 1067 },
};

/**
 * Versiones que se generan solas a partir de la portada.
 *
 * El hero necesita dos recortes distintos: 16:9 para pantallas anchas y 4:5
 * para el celular, donde una foto panorámica deja la casa diminuta. El cliente
 * reemplaza UNA sola foto (hero/portada.jpg) y corre este script; los cuatro
 * archivos que usa el sitio salen de ahí.
 *
 * OJO: la imagen de og/portada.jpg NO se deriva acá, la genera
 * scripts/generar-logo.mjs porque lleva el logo encima.
 */
const DERIVADAS = [
  { desde: 'hero/portada.jpg', hacia: 'hero/portada-1200.jpg', w: 1200, h: 675 },
  { desde: 'hero/portada.jpg', hacia: 'hero/portada-4x5.jpg', w: 900, h: 1125 },
  { desde: 'hero/portada.jpg', hacia: 'hero/portada-4x5-600.jpg', w: 600, h: 750 },
];

/**
 * Además de los JPEG, la portada se publica en WebP: pesa cerca de la mitad con
 * la misma calidad visible y es lo que más baja el LCP en móvil. El navegador
 * elige solo; el JPEG queda como respaldo para los que no lo soporten.
 *
 * El cliente sigue reemplazando UN archivo (hero/portada.jpg): los WebP los
 * genera este script.
 */
const TAMBIEN_EN_WEBP = [
  'hero/portada.jpg',
  'hero/portada-1200.jpg',
  'hero/portada-4x5.jpg',
  'hero/portada-4x5-600.jpg',
];

const CALIDAD = 78;

function medidaDe(rutaRelativa) {
  const normalizada = rutaRelativa.split('\\').join('/');
  for (const [clave, medida] of Object.entries(MEDIDAS)) {
    if (clave !== 'defecto' && normalizada.endsWith(clave)) return medida;
  }
  return MEDIDAS.defecto;
}

/**
 * Este script comprime FOTOGRAFÍAS. Todo lo demás lo tiene prohibido tocar.
 *
 * Por qué existe esta lista: en una versión anterior el script recorría también
 * public/images/brand/, y ahí viven PNG con transparencia generados por
 * scripts/generar-logo.mjs más el archivo original del logo. Los reescribió como
 * JPEG sobre fondo blanco y con medidas de foto: se perdió la transparencia y la
 * resolución del original. Un script que optimiza no puede tocar archivos que
 * genera otro script ni los originales de marca.
 */
const CARPETAS_PROHIBIDAS = ['brand'];

/** Archivos que genera otro script y que este no debe volver a comprimir. */
const AJENOS = ['og/portada.jpg'];

function* recorrer(dir, prefijo = '') {
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const completa = join(dir, entrada.name);
    const relativa = prefijo ? `${prefijo}/${entrada.name}` : entrada.name;

    if (entrada.isDirectory()) {
      if (CARPETAS_PROHIBIDAS.includes(entrada.name)) continue;
      yield* recorrer(completa, relativa);
    } else if (['.jpg', '.jpeg'].includes(extname(entrada.name).toLowerCase())) {
      // Solo JPEG: un .png en public/images/ es casi siempre un gráfico con
      // transparencia, y convertirlo a JPEG lo arruina.
      yield { completa, relativa };
    }
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('[imágenes] Falta la dependencia "sharp". Corre: npm install');
    process.exitCode = 1;
    return;
  }

  // Primero las derivadas: así la versión chica sale de la foto nueva que acaba
  // de subir el cliente y no de la anterior.
  for (const { desde, hacia, w, h } of DERIVADAS) {
    const origen = join(carpeta, ...desde.split('/'));
    const destino = join(carpeta, ...hacia.split('/'));
    if (!existsSync(origen)) continue;

    try {
      const temporal = join(dirname(destino), `.tmp-${basename(destino)}`);
      await sharp(origen)
        .resize(w, h, { fit: 'cover', position: 'center' })
        .jpeg({ quality: CALIDAD, progressive: true, mozjpeg: true })
        .toFile(temporal);
      renameSync(temporal, destino);
      console.log(`  ${hacia}: regenerada desde ${desde}`);
    } catch (error) {
      console.error(`  ✗ ${hacia}: ${error.message}`);
    }
  }

  let antes = 0;
  let despues = 0;
  let procesadas = 0;

  for (const { completa, relativa } of recorrer(carpeta)) {
    if (AJENOS.includes(relativa.split('\\').join('/'))) continue;

    const medida = medidaDe(relativa);
    const pesoInicial = statSync(completa).size;
    const temporal = join(dirname(completa), `.tmp-${basename(completa)}`);

    try {
      // Un archivo puede venir con extensión .jpg y ser en realidad un PNG (pasa
      // al renombrar a mano en Windows). Pesa varias veces más y algunos
      // servidores lo entregan con el tipo equivocado. Se avisa y se corrige al
      // reescribirlo, porque la salida siempre es JPEG de verdad.
      const formatoReal = (await sharp(completa).metadata()).format;
      if (relativa.endsWith('.jpg') && formatoReal !== 'jpeg') {
        console.warn(`  ⚠️  ${relativa} decía .jpg pero era ${formatoReal.toUpperCase()}. Convertido a JPEG.`);
      }

      await sharp(completa)
        // "cover" recorta centrado, que es exactamente lo que hace el sitio al
        // mostrarla: así el archivo y lo que se ve en pantalla coinciden.
        .resize(medida.w, medida.h, { fit: 'cover', position: 'center', withoutEnlargement: true })
        .jpeg({ quality: CALIDAD, progressive: true, mozjpeg: true })
        .toFile(temporal);

      const pesoFinal = statSync(temporal).size;

      // Si comprimirla la dejó más pesada (pasa con los placeholders planos), se
      // descarta el resultado y se deja la original.
      if (pesoFinal >= pesoInicial) {
        unlinkSync(temporal);
        continue;
      }

      renameSync(temporal, completa);

      antes += pesoInicial;
      despues += pesoFinal;
      procesadas++;

      console.log(`  ${relativa}: ${kb(pesoInicial)} → ${kb(pesoFinal)}`);
    } catch (error) {
      console.error(`  ✗ ${relativa}: ${error.message}`);
      try {
        unlinkSync(temporal);
      } catch {
        /* el temporal puede no existir */
      }
    }
  }

  // Versiones WebP de la portada, después de que los JPEG quedaron en su medida.
  for (const relativa of TAMBIEN_EN_WEBP) {
    const origen = join(carpeta, ...relativa.split('/'));
    if (!existsSync(origen)) continue;

    const destino = origen.replace(/\.jpe?g$/i, '.webp');
    try {
      // 68 y no 74: en una fotografía de exterior la diferencia no se ve y son
      // ~25% menos bytes en la imagen que compite con las tipografías por el
      // ancho de banda al cargar.
      await sharp(origen).webp({ quality: 68, effort: 6 }).toFile(destino);
      console.log(
        `  ${relativa.replace(/\.jpe?g$/i, '.webp')}: ${kb(statSync(origen).size)} → ${kb(
          statSync(destino).size
        )}`
      );
    } catch (error) {
      console.error(`  ✗ ${destino}: ${error.message}`);
    }
  }

  if (procesadas === 0) {
    console.log('[imágenes] Nada que optimizar: las fotos ya están en su tamaño y peso correctos.');
    return;
  }

  console.log(
    `\n[imágenes] ${procesadas} fotos optimizadas · ${kb(antes)} → ${kb(despues)} ` +
      `(${Math.round((1 - despues / antes) * 100)}% menos)`
  );
}

main();
