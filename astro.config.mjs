// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El dominio vive acá y en src/config/site.ts. Si cambia, cambia en los dos.
const SITIO = 'https://casaslimache.cl';

export default defineConfig({
  site: SITIO,
  output: 'static',

  // URLs con slash final, siempre. Evita que Google vea /catalogo y /catalogo/
  // como dos páginas distintas.
  trailingSlash: 'always',

  build: {
    format: 'directory',
    // 'auto': el CSS chico va incrustado y el resto sale como archivo con hash,
    // que el navegador cachea entre páginas. Se midió contra 'always' (todo
    // incrustado): 'always' dejaba cada HTML en 86 KB y no mejoraba el LCP,
    // porque el sitio se navega de catálogo a ficha y ahí la caché rinde más.
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  // Precarga al pasar el mouse / al acercar el dedo. Son ~1 KB de JS y hacen
  // que la navegación al catálogo se sienta instantánea.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;

        // La portada manda.
        if (url === `${SITIO}/`) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        // Fichas de modelo y catálogo: lo que buscamos posicionar.
        if (url.includes('/modelos/') || url.endsWith('/catalogo/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // Landings por comuna y casa piloto.
        if (url.includes('/casas-prefabricadas-') || url.endsWith('/casa-piloto/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ],
});
