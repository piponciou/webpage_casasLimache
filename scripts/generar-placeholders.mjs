/**
 * Genera las imágenes placeholder de color plano para todos los modelos.
 *
 * NO descarga ni inventa fotos: dibuja un rectángulo del color de la paleta con
 * el nombre del archivo y las dimensiones recomendadas escritas encima, para que
 * quien reemplace la foto sepa exactamente qué tiene que poner ahí.
 *
 * Uso:  npm run placeholders
 *       npm run placeholders -- --forzar   (sobrescribe fotos ya reemplazadas)
 *
 * Lee los modelos desde src/content/modelos/*.json, así que no hay ninguna lista
 * de modelos escrita a mano: agregar un modelo y correr el script basta.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const carpetaModelos = join(raiz, 'src', 'content', 'modelos');
const carpetaImagenes = join(raiz, 'public', 'images');

const FORZAR = process.argv.includes('--forzar');

/** Tonos derivados de la paleta del sitio (ver src/styles/tokens.css). */
const FONDO = '#CDD3D0';
const TRAZO = '#1C1F1D';

/** Ratios documentados en IMAGENES.md. Si cambian acá, cambian en el manual. */
const MEDIDAS = {
  galeria: { w: 1600, h: 1067, nota: '3:2' },
  tarjeta: { w: 800, h: 533, nota: '3:2' },
  hero: { w: 2000, h: 1125, nota: '16:9' },
  hero1200: { w: 1200, h: 675, nota: '16:9' },
  hero800: { w: 800, h: 450, nota: '16:9' },
  plano: { w: 1400, h: 1050, nota: '4:3' },
  og: { w: 1200, h: 630, nota: '1.91:1' },
};

/** Archivos que lleva cada modelo. El orden es el de la galería. */
const ARCHIVOS_MODELO = [
  ['01-exterior.jpg', 'galeria'],
  ['02-interior.jpg', 'galeria'],
  ['03-cocina.jpg', 'galeria'],
  ['04-dormitorio.jpg', 'galeria'],
  ['tarjeta.jpg', 'tarjeta'],
  ['plano.jpg', 'plano'],
];

/**
 * Imágenes sueltas del sitio que no pertenecen a un modelo.
 *
 * Salieron de acá las de casa-piloto/ y proceso/: ninguna página las muestra
 * ya —la galería "Así se ve" y la sección de proceso se eliminaron— y este
 * script corre en cada `npm install`, así que las habría vuelto a crear en
 * cada despliegue. Si alguna sección vuelve, se reponen estas líneas.
 */
const ARCHIVOS_SUELTOS = [
  // La portada del hero, 16:9 en tres anchos. Las dos derivadas las regenera
  // scripts/optimizar-imagenes.mjs a partir de portada.jpg.
  ['hero/portada.jpg', 'hero'],
  ['hero/portada-1200.jpg', 'hero1200'],
  ['hero/portada-800.jpg', 'hero800'],
  ['og/portada.jpg', 'og'],
];

function escaparXml(texto) {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Dibuja el placeholder: fondo plano, marco de cota (el elemento gráfico del
 * sitio) y tres líneas de texto centradas.
 */
function svgPlaceholder({ w, h, nombre, nota }) {
  const escala = w / 800;
  const cuerpo = Math.round(22 * escala);
  const chico = Math.round(15 * escala);
  const margen = Math.round(28 * escala);
  const tick = Math.round(9 * escala);
  const grosor = Math.max(1, 1.5 * escala);
  const cy = h / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${FONDO}"/>
  <g stroke="${TRAZO}" stroke-opacity="0.28" stroke-width="${grosor}" fill="none">
    <path d="M${margen} ${margen} h${tick * 3} M${margen} ${margen} v${tick * 3}"/>
    <path d="M${w - margen} ${margen} h-${tick * 3} M${w - margen} ${margen} v${tick * 3}"/>
    <path d="M${margen} ${h - margen} h${tick * 3} M${margen} ${h - margen} v-${tick * 3}"/>
    <path d="M${w - margen} ${h - margen} h-${tick * 3} M${w - margen} ${h - margen} v-${tick * 3}"/>
  </g>
  <g font-family="ui-monospace, 'DejaVu Sans Mono', monospace" text-anchor="middle" fill="${TRAZO}">
    <text x="${w / 2}" y="${cy - cuerpo * 0.9}" font-size="${chico}" fill-opacity="0.45" letter-spacing="${2 * escala}">REEMPLAZAR ESTA FOTO</text>
    <text x="${w / 2}" y="${cy + cuerpo * 0.35}" font-size="${cuerpo}" fill-opacity="0.72">${escaparXml(nombre)}</text>
    <text x="${w / 2}" y="${cy + cuerpo * 1.9}" font-size="${chico}" fill-opacity="0.45">${w} × ${h} px · ${nota}</text>
  </g>
</svg>`;
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.error('[placeholders] Falta la dependencia "sharp". Corre: npm install');
    process.exitCode = 1;
    return;
  }

  const objetivos = [];

  // 1. Un set de archivos por cada modelo del catálogo.
  if (existsSync(carpetaModelos)) {
    const modelos = readdirSync(carpetaModelos)
      .filter((f) => f.endsWith('.json'))
      .map((f) => JSON.parse(readFileSync(join(carpetaModelos, f), 'utf8')));

    for (const modelo of modelos) {
      for (const [archivo, tipo] of ARCHIVOS_MODELO) {
        objetivos.push({ ruta: join('modelos', modelo.slug, archivo), tipo });
      }
    }
  } else {
    console.warn('[placeholders] Todavía no existe src/content/modelos/, genero solo las imágenes sueltas.');
  }

  // 2. Imágenes que no dependen del catálogo.
  for (const [ruta, tipo] of ARCHIVOS_SUELTOS) {
    objetivos.push({ ruta, tipo });
  }

  let creados = 0;
  let respetados = 0;

  for (const { ruta, tipo } of objetivos) {
    const destino = join(carpetaImagenes, ruta);

    if (existsSync(destino) && !FORZAR) {
      respetados++;
      continue;
    }

    mkdirSync(dirname(destino), { recursive: true });

    const medida = MEDIDAS[tipo];
    const svg = svgPlaceholder({
      w: medida.w,
      h: medida.h,
      nombre: ruta.split(/[\\/]/).pop(),
      nota: medida.nota,
    });

    await sharp(Buffer.from(svg)).jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(destino);
    creados++;
  }

  // 3. Un .gitkeep para que las carpetas vacías no se pierdan en git.
  for (const sub of ['brand']) {
    const carpeta = join(carpetaImagenes, sub);
    mkdirSync(carpeta, { recursive: true });
    const guarda = join(carpeta, '.gitkeep');
    if (!existsSync(guarda)) writeFileSync(guarda, '');
  }

  console.log(
    `[placeholders] ${creados} generados · ${respetados} respetados (ya existían).` +
      (respetados && !FORZAR ? ' Usa --forzar para sobrescribirlos.' : '')
  );
}

main();
