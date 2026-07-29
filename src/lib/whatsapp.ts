/**
 * CONSTRUCTOR DE LINKS DE WHATSAPP
 * ================================
 * Todo el sitio converge acá: no hay formulario de contacto, el objetivo es
 * abrir un chat con el mensaje ya escrito.
 *
 * Este archivo es puro (no toca el DOM) a propósito: lo usa el HTML generado en
 * el build y también el selector interactivo de la ficha de modelo. Una sola
 * implementación, cero riesgo de que el mensaje del botón y el del selector
 * queden distintos.
 *
 * Notas de formato de WhatsApp:
 *   *texto*  → negrita nativa. Se usa para modelo, metraje y formato.
 *   Los saltos de línea van como \n reales y se codifican con encodeURIComponent.
 *   Máximo dos emojis por mensaje.
 */
import { TELEFONO, SITE } from '../config/site';

/**
 * wa.me resuelve solo entre la app del celular y WhatsApp Web en escritorio.
 * No usar api.whatsapp.com ni intents propios.
 */
export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${TELEFONO.e164}?text=${encodeURIComponent(mensaje)}`;
}

export interface DatosCotizacion {
  nombreModelo: string;
  metraje: number;
  tipoKit: string;
  dormitorios: number;
  banos: number;
  /** Ya formateado: "$12.900.000" o "a cotizar". */
  precio: string;
  /** Ruta absoluta de la ficha, ej: /modelos/limache/ */
  ruta: string;
  comuna?: string;
}

/** Mensaje desde la ficha de un modelo, con la selección activa. */
export function mensajeCotizacion(datos: DatosCotizacion): string {
  const url = `${SITE.dominio}${datos.ruta}`;
  const comuna = datos.comuna?.trim() ? datos.comuna.trim() : 'por confirmar';

  return [
    'Hola 👋 Vengo desde la web de Casas Limache.',
    '',
    `Quiero cotizar el modelo *${datos.nombreModelo}* de *${datos.metraje} m²* en formato *${datos.tipoKit}*.`,
    '',
    `• Dormitorios: ${datos.dormitorios}`,
    `• Baños: ${datos.banos}`,
    `• Valor de referencia web: ${datos.precio}`,
    `• Comuna de destino: ${comuna}`,
    '',
    `Ficha del modelo: ${url}`,
    '',
    '¿Me pueden ayudar con la cotización?',
  ].join('\n');
}

/** Mensaje del hero y de cualquier CTA que no tenga modelo seleccionado. */
export function mensajeGenerico(): string {
  return 'Hola 👋 Vengo desde la web de Casas Limache. Quiero información sobre casas prefabricadas y sus modelos disponibles.';
}

/** Mensaje para coordinar la visita a la casa piloto. */
export function mensajeCasaPiloto(): string {
  return 'Hola 👋 Quiero coordinar una visita a la casa piloto de Casas Limache en Villa Alemana. ¿Qué horarios tienen disponibles?';
}

/** Mensaje desde una landing de comuna. */
export function mensajeComuna(comuna: string): string {
  return `Hola 👋 Vengo desde la web de Casas Limache. Quiero cotizar una casa prefabricada con despacho a *${comuna}*.`;
}

/** Mensaje del estado vacío del catálogo, cuando ningún filtro calza. */
export function mensajeCatalogoSinResultados(): string {
  return 'Hola 👋 Vengo desde la web de Casas Limache. Busqué en el catálogo y ningún modelo calza con lo que necesito. ¿Pueden adaptar alguno?';
}

/** Mensaje desde una landing genérica sobre un modelo, sin selección de kit. */
export function mensajeModeloSimple(nombreModelo: string): string {
  return `Hola 👋 Vengo desde la web de Casas Limache. Quiero información sobre el modelo *${nombreModelo}*.`;
}
