/**
 * Fotos de clientes para el slider del home.
 *
 * Las cinco están tomadas en la terraza de la casa piloto, el día en que el
 * cliente recibe su carpeta. El `alt` describe lo que se ve y nada más: no
 * lleva nombres —son personas identificables y nadie autorizó publicarlos— ni
 * afirma metrajes o modelos que la foto no permite verificar.
 *
 * `id` es el prefijo de los archivos en public/images/clientes/. Cada uno
 * existe en 800 y 1400 px de ancho, en WebP y JPEG.
 *
 * Para agregar un cliente: deja la foto en originales/clientes/, córrela por el
 * mismo proceso de optimización (4:3, 800 y 1400, WebP + JPEG) y suma la
 * entrada acá. El slider crece solo.
 */
export interface FotoCliente {
  id: string;
  alt: string;
}

export const CLIENTES: FotoCliente[] = [
  {
    id: 'cliente-1',
    alt: 'Tres clientes de Casas Limache en la terraza de la casa piloto, con la carpeta de documentos de su compra',
  },
  {
    id: 'cliente-2',
    alt: 'Pareja de clientes en la entrada de la casa piloto de Casas Limache, sosteniendo la carpeta de su casa prefabricada',
  },
  {
    id: 'cliente-3',
    alt: 'Dos clientes de Casas Limache en la terraza de la casa piloto con la documentación técnica de su proyecto',
  },
  {
    id: 'cliente-4',
    alt: 'Familia con su bebé en la terraza de la casa piloto de Casas Limache, con la carpeta de su casa recién comprada',
  },
  {
    id: 'cliente-5',
    alt: 'Pareja de clientes frente al ventanal de la casa piloto de Casas Limache con la carpeta de su compra',
  },
];
