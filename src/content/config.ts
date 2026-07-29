import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * ESQUEMA DEL CATÁLOGO
 * ====================
 * Un archivo JSON en src/content/modelos/ = un modelo de casa = una página.
 *
 * Si a un JSON le falta un campo obligatorio, el build FALLA con un mensaje en
 * español apuntando al archivo y al campo. Eso es a propósito: es preferible
 * que no compile a que se publique una ficha a medias.
 *
 * Ver AGREGAR-MODELO.md para el paso a paso.
 */

const precio = z
  .number({ invalid_type_error: 'El precio debe ser un número sin puntos ni símbolo $, o null si no se publica.' })
  .int('El precio debe ser un número entero en pesos chilenos.')
  .positive('El precio debe ser mayor que cero.')
  .nullable();

const variante = z.object({
  m2: z
    .number({ required_error: 'Falta "m2" en una de las variantes.' })
    .positive('Los metros cuadrados deben ser un número mayor que cero.'),
  dormitorios: z.number().int().min(0, 'Los dormitorios no pueden ser negativos.'),
  banos: z.number().int().min(0, 'Los baños no pueden ser negativos.'),
  aguas: z
    .number()
    .int()
    .min(0)
    .describe('Cantidad de puntos de agua (cocina, baños, logia).'),
  precios: z.object(
    {
      kitBasico: precio,
      semifull: precio,
      llaveEnMano: precio,
    },
    {
      required_error:
        'Falta el objeto "precios" en una variante. Si no hay precio público, escribe null en cada kit.',
    }
  ),
});

const imagen = z.object({
  src: z
    .string()
    .startsWith('/images/', 'La ruta de la imagen debe empezar en /images/ (la carpeta public).'),
  alt: z
    .string()
    .min(10, 'El texto alternativo tiene que describir la foto. Nunca vacío ni "imagen".'),
});

const modelos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/modelos' }),
  schema: z
    .object({
      slug: z
        .string()
        .regex(/^[a-z0-9-]+$/, 'El slug solo admite minúsculas, números y guiones. Ej: "marga-marga".'),
      nombre: z.string().min(2, 'Falta el nombre del modelo.'),
      orden: z.number().int().describe('Menor número = aparece antes en el catálogo.'),
      destacado: z.boolean().describe('Si es true, aparece en el home.'),
      resumen: z
        .string()
        .min(20, 'El resumen es la línea que se lee en la tarjeta del catálogo: escribe al menos una frase.')
        .max(160, 'El resumen es de una línea. Si necesitas más, va en "descripcion".'),
      descripcion: z
        .array(z.string().min(60, 'Cada párrafo de la descripción debe decir algo concreto.'))
        .min(2, 'La ficha necesita al menos 2 párrafos de descripción.')
        .max(4),

      metrajeBase: z.number().positive('El metraje base es el que viene preseleccionado en la ficha.'),

      variantes: z
        .array(variante)
        .min(1, 'Un modelo necesita al menos una variante de metraje.'),

      kitsDisponibles: z
        .array(z.enum(['kit-basico', 'semifull', 'llave-en-mano']))
        .min(1, 'Indica al menos un formato de compra disponible.'),

      caracteristicas: z.object({
        cocina: z.boolean(),
        livingComedor: z.boolean(),
        logia: z.boolean(),
        terraza: z.boolean(),
      }),

      especificaciones: z.object({
        estructura: z.string().min(3),
        revestimientoExterior: z.string().min(3),
        revestimientoInterior: z.string().min(3),
        techumbre: z.string().min(3),
        ventanas: z.string().min(3),
        aislacion: z.string().min(3),
        altura: z.string().min(2),
      }),

      incluye: z.array(z.string()).min(1, 'Di qué incluye. La confianza se gana con la lista.'),
      noIncluye: z
        .array(z.string())
        .min(1, 'Di qué NO incluye (radier, instalaciones, permisos). Evita leads malos.'),

      imagenes: z.array(imagen).min(1, 'La galería necesita al menos una imagen.'),
      /** Versión chica de la foto principal, para el grid del catálogo. */
      imagenTarjeta: imagen,
      plano: imagen.nullable(),

      seo: z
        .object({
          title: z.string().max(65, 'El title se corta en Google pasados los ~60 caracteres.').optional(),
          description: z
            .string()
            .min(120, 'La meta description rinde entre 150 y 160 caracteres.')
            .max(165)
            .optional(),
          keywords: z.array(z.string()).optional(),
        })
        .default({}),
    })
    .superRefine((modelo, ctx) => {
      // El metraje preseleccionado tiene que existir de verdad.
      const metrajes = modelo.variantes.map((v) => v.m2);
      if (!metrajes.includes(modelo.metrajeBase)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['metrajeBase'],
          message: `El metrajeBase (${modelo.metrajeBase} m²) no existe entre las variantes: ${metrajes.join(', ')} m².`,
        });
      }

      // Metrajes repetidos romperían el selector de la ficha.
      if (new Set(metrajes).size !== metrajes.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['variantes'],
          message: 'Hay dos variantes con el mismo m². Cada metraje debe aparecer una sola vez.',
        });
      }
    }),
});

export const collections = { modelos };
