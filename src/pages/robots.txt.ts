import type { APIRoute } from 'astro';
import { SITE } from '../config/site';

/**
 * robots.txt generado en el build. No bloquea nada útil: el sitio entero está
 * pensado para ser indexado, así que lo único que hace es apuntar al sitemap.
 */
export const GET: APIRoute = () => {
  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE.dominio}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
