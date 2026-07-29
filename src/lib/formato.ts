/**
 * Formateo de números y textos. Una sola implementación para que el precio se
 * escriba igual en la tarjeta, en la ficha, en el JSON-LD y en WhatsApp.
 */

const pesos = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/**
 * Un precio nulo NUNCA se muestra como $0 ni como undefined: se muestra como
 * "Cotizar", que además es la acción que queremos que ocurra.
 */
export function formatearPrecio(valor: number | null | undefined): string {
  if (valor === null || valor === undefined) return 'Cotizar';
  return pesos.format(valor);
}

/** Igual que el anterior, pero para el mensaje de WhatsApp. */
export function precioParaMensaje(valor: number | null | undefined): string {
  if (valor === null || valor === undefined) return 'a cotizar';
  return pesos.format(valor);
}

export function formatearM2(m2: number): string {
  return `${new Intl.NumberFormat('es-CL').format(m2)} m²`;
}

/** "3 dormitorios" / "1 dormitorio" */
export function plural(cantidad: number, singular: string, enPlural: string): string {
  return `${cantidad} ${cantidad === 1 ? singular : enPlural}`;
}

/** Quita tildes y baja a minúsculas: sirve para comparar y para armar slugs. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

export function aSlug(texto: string): string {
  return normalizar(texto)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
