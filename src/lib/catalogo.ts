/**
 * Lecturas derivadas del catálogo.
 *
 * REGLA DE ARQUITECTURA: ningún modelo está escrito a mano en ninguna parte del
 * sitio. Grids, filtros, contadores, sitemap y enlaces del footer salen todos de
 * iterar esta colección. Agregar un modelo = agregar un JSON.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { KITS, type KitId } from '../config/site';

export type Modelo = CollectionEntry<'modelos'>;
export type DatosModelo = Modelo['data'];
export type Variante = DatosModelo['variantes'][number];

/** Todos los modelos, ordenados por el campo `orden` del JSON. */
export async function obtenerModelos(): Promise<Modelo[]> {
  const modelos = await getCollection('modelos');
  return modelos.sort((a, b) => a.data.orden - b.data.orden);
}

/** Los que llevan `destacado: true`. Alimentan el home. */
export async function obtenerDestacados(): Promise<Modelo[]> {
  return (await obtenerModelos()).filter((m) => m.data.destacado);
}

export function rutaModelo(slug: string): string {
  return `/modelos/${slug}/`;
}

/** El precio publicado más bajo del modelo, o null si no hay ninguno cargado. */
export function precioDesde(datos: DatosModelo): number | null {
  const precios = datos.variantes
    .flatMap((v) => [v.precios.kitBasico, v.precios.semifull, v.precios.llaveEnMano])
    .filter((p): p is number => typeof p === 'number');

  return precios.length ? Math.min(...precios) : null;
}

/** El precio publicado más alto. Sirve para el AggregateOffer del JSON-LD. */
export function precioHasta(datos: DatosModelo): number | null {
  const precios = datos.variantes
    .flatMap((v) => [v.precios.kitBasico, v.precios.semifull, v.precios.llaveEnMano])
    .filter((p): p is number => typeof p === 'number');

  return precios.length ? Math.max(...precios) : null;
}

export function varianteBase(datos: DatosModelo): Variante {
  const base = datos.variantes.find((v) => v.m2 === datos.metrajeBase);
  // El esquema Zod ya garantiza que existe; el fallback es solo para TypeScript.
  return base ?? datos.variantes[0]!;
}

export function variantePorM2(datos: DatosModelo, m2: number): Variante | undefined {
  return datos.variantes.find((v) => v.m2 === m2);
}

/** Metrajes ordenados de menor a mayor. */
export function metrajes(datos: DatosModelo): number[] {
  return datos.variantes.map((v) => v.m2).sort((a, b) => a - b);
}

export function rangoM2(datos: DatosModelo): { min: number; max: number } {
  const lista = metrajes(datos);
  return { min: lista[0]!, max: lista[lista.length - 1]! };
}

/** Cantidades de dormitorios que ofrece el modelo, sin repetir. */
export function dormitoriosDisponibles(datos: DatosModelo): number[] {
  return [...new Set(datos.variantes.map((v) => v.dormitorios))].sort((a, b) => a - b);
}

/** La clave que usa el JSON de precios para cada kit. */
const CLAVE_PRECIO = {
  'kit-basico': 'kitBasico',
  semifull: 'semifull',
  'llave-en-mano': 'llaveEnMano',
} as const satisfies Record<KitId, keyof Variante['precios']>;

export function precioDeVariante(variante: Variante, kit: KitId): number | null {
  return variante.precios[CLAVE_PRECIO[kit]];
}

/** Los kits disponibles del modelo, ya resueltos con su nombre y su resumen. */
export function kitsDe(datos: DatosModelo) {
  return KITS.filter((kit) => (datos.kitsDisponibles as readonly string[]).includes(kit.id));
}

export function nombreKit(id: string): string {
  return KITS.find((k) => k.id === id)?.nombre ?? id;
}

/**
 * Todas las combinaciones metraje × kit del modelo, con su precio ya calculado.
 * El HTML las imprime todas (ocultas con atributos) para que Google indexe el
 * contenido de cada variante sin necesidad de JavaScript.
 */
export function combinaciones(datos: DatosModelo) {
  const kits = kitsDe(datos);
  return datos.variantes.flatMap((variante) =>
    kits.map((kit) => ({
      m2: variante.m2,
      kit: kit.id,
      nombreKit: kit.nombre,
      dormitorios: variante.dormitorios,
      banos: variante.banos,
      aguas: variante.aguas,
      precio: precioDeVariante(variante, kit.id),
    }))
  );
}

