/**
 * Copia las fuentes autoalojadas desde node_modules hacia public/fonts/.
 *
 * Por qué existe: necesitamos rutas estables (/fonts/archivo.woff2) para poder
 * hacer <link rel="preload"> de la tipografía del titular. Si importáramos el
 * CSS de fontsource, el archivo quedaría con un hash distinto en cada build y
 * no podríamos precargarlo.
 *
 * Se ejecuta solo con: npm run fuentes
 */
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'public', 'fonts');

/** Cada entrada: [paquete, nombre del archivo en el paquete, nombre final]. */
const FUENTES = [
  ['@fontsource-variable/merriweather', 'merriweather-latin-wght-normal.woff2', 'merriweather-variable.woff2'],
  ['@fontsource-variable/dm-sans', 'dm-sans-latin-wght-normal.woff2', 'dm-sans-variable.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2', 'plex-mono-400.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2', 'plex-mono-500.woff2'],
];

mkdirSync(destino, { recursive: true });

let copiadas = 0;
const faltantes = [];

for (const [paquete, archivo, nombreFinal] of FUENTES) {
  const carpeta = join(raiz, 'node_modules', ...paquete.split('/'), 'files');
  const origen = join(carpeta, archivo);

  if (!existsSync(origen)) {
    faltantes.push({ paquete, archivo, carpeta });
    continue;
  }

  copyFileSync(origen, join(destino, nombreFinal));
  copiadas++;
}

console.log(`[fuentes] ${copiadas}/${FUENTES.length} archivos copiados a public/fonts/`);

if (faltantes.length > 0) {
  console.warn('\n[fuentes] No se encontraron estos archivos:');
  for (const { paquete, archivo, carpeta } of faltantes) {
    console.warn(`  · ${paquete} → ${archivo}`);
    if (existsSync(carpeta)) {
      const disponibles = readdirSync(carpeta).filter((f) => f.includes('latin') && f.endsWith('.woff2'));
      console.warn(`    disponibles: ${disponibles.slice(0, 8).join(', ')}`);
    } else {
      console.warn('    (el paquete no está instalado todavía)');
    }
  }
}
