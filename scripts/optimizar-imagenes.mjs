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
  'hero/portada-800.jpg': { w: 800, h: 450 },
  'hero/portada.jpg': { w: 2000, h: 1125 },
  'og/portada.jpg': { w: 1200, h: 630 },
  defecto: { w: 1600, h: 1067 },
};

/** Versiones chicas que se generan solas a partir de otra foto. */
const DERIVADAS = [{ desde: 'hero/portada.jpg', hacia: 'hero/portada-800.jpg', w: 800, h: 450 }];

const CALIDAD = 78;

function medidaDe(rutaRelativa) {
  const normalizada = rutaRelativa.split('\\').join('/');
  for (const [clave, medida] of Object.entries(MEDIDAS)) {
    if (clave !== 'defecto' && normalizada.endsWith(clave)) return medida;
  }
  return MEDIDAS.defecto;
}

function* recorrer(dir, prefijo = '') {
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const completa = join(dir, entrada.name);
    const relativa = prefijo ? `${prefijo}/${entrada.name}` : entrada.name;
    if (entrada.isDirectory()) yield* recorrer(completa, relativa);
    else if (['.jpg', '.jpeg', '.png'].includes(extname(entrada.name).toLowerCase())) {
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
    const medida = medidaDe(relativa);
    const pesoInicial = statSync(completa).size;
    const temporal = join(dirname(completa), `.tmp-${basename(completa)}`);

    try {
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
