/**
 * LANDINGS POR COMUNA
 * ===================
 * Cada comuna tiene contenido propio: distancia real desde la casa piloto, tipo
 * de terreno, clima y consideraciones de despacho. NO es contenido duplicado con
 * el nombre cambiado, porque eso Google lo detecta y lo castiga.
 *
 * Regla para agregar una comuna nueva: si no puedes escribir tres párrafos que
 * sean genuinamente distintos a los de las otras, no la agregues.
 *
 * ⚠️ VERIFICAR con el cliente: las distancias son aproximadas y las condiciones
 * de despacho (accesos, izaje, camión chico) reflejan lo que es habitual en cada
 * zona, no una política comercial confirmada.
 */

export interface PreguntaLocal {
  pregunta: string;
  respuesta: string;
}

export interface Comuna {
  slug: string;
  nombre: string;
  /** Cómo se escribe después de "en": "en La Calera", "en Limache". */
  conArticulo: string;
  /** Una línea bajo el h1. */
  bajada: string;
  /** Dos o tres párrafos con contexto real de la comuna. */
  parrafos: string[];
  /** Frase que introduce el grid de modelos. Distinta en cada comuna. */
  introCatalogo: string;
  faq: PreguntaLocal[];
}

export const COMUNAS: Comuna[] = [
  {
    slug: 'limache',
    nombre: 'Limache',
    conArticulo: 'Limache',
    bajada: 'A diez minutos de la casa piloto, por el mismo Camino Troncal.',
    parrafos: [
      'Limache es la comuna que le da el nombre a la empresa y la que tenemos más cerca: desde la casa piloto de Camino Troncal se llega por el mismo camino, sin salir a carretera. Eso hace que el flete a Limache sea el más barato del catálogo y que un montaje se pueda coordinar con pocos días de aviso.',
      'El suelo del valle es agrícola y en los sectores bajos, cerca del estero, la napa freática sube en invierno. Antes de encargar la casa conviene revisar cómo drena el terreno, porque el radier tiene que quedar sobre nivel: es el error más caro que hemos visto cometer a alguien que compra apurado en marzo y arma en julio.',
      'El clima interior manda en las terminaciones. Los veranos son secos y calurosos y en invierno caen heladas, así que la orientación de la casa y el sellado de las ventanas importan más que en la costa. En las parcelas de Lliu Lliu, Pelumpén y Los Laureles la mayoría opta por plantas de un piso con el estar mirando al norte.',
    ],
    introCatalogo:
      'Estos son los modelos que más despachamos dentro de Limache. Todos se pueden ver armados o en materiales en la casa piloto, a diez minutos de aquí.',
    faq: [
      {
        pregunta: '¿Cuánto demora el despacho a Limache?',
        respuesta:
          'Limache es la comuna más cercana a nuestra casa piloto, así que el traslado es el más rápido que manejamos. El plazo exacto depende del modelo y de si el radier está listo: te lo confirmamos por WhatsApp al cotizar.',
      },
      {
        pregunta: '¿Sirve para una parcela en Lliu Lliu o Pelumpén?',
        respuesta:
          'Sí, es donde más armamos. Lo único que hay que revisar antes es el acceso: si el camino interior es angosto o tiene pendiente, se cotiza un camión más chico o un traslado por partes.',
      },
    ],
  },
  {
    slug: 'olmue',
    nombre: 'Olmué',
    conArticulo: 'Olmué',
    bajada: 'Terrenos en pendiente al pie del cerro La Campana.',
    parrafos: [
      'Olmué está a unos veinte minutos de la casa piloto y es, de todas las comunas donde despachamos, la que más nos obliga a mirar el terreno antes de cotizar. Buena parte de los sitios están en los faldeos, con pendiente real, y el radier deja de ser un trámite: hay que nivelar y a veces escalonar.',
      'Los caminos interiores de Granizo, Quebrada Alvarado y El Patagual son de tierra o de ripio en varios tramos. El camión grande no siempre entra, así que en Olmué es frecuente que el despacho se cotice en dos viajes o con un camión más chico. Es un costo que preferimos decirte antes y no cuando el camión ya está detenido en la subida.',
      'A cambio, es donde mejor rinden las plantas en L con el estar orientado a la vista del cerro. Si tu terreno tiene desnivel, el modelo Olmué está diseñado justamente para eso.',
    ],
    introCatalogo:
      'Para terrenos con pendiente y vista al cerro, estos son los modelos que mejor se comportan en Olmué.',
    faq: [
      {
        pregunta: '¿Pueden armar en un terreno con pendiente en Olmué?',
        respuesta:
          'Sí, pero la fundación tiene que resolverse antes de que llegue la casa: nivelación o radier escalonado según el desnivel. Cuéntanos por WhatsApp cómo es el terreno y te decimos qué se necesita.',
      },
      {
        pregunta: '¿Entra el camión a los caminos de Granizo?',
        respuesta:
          'Depende del tramo. En varios sectores hay que usar camión más chico o dividir el traslado en dos viajes; eso se cotiza aparte y se confirma antes de cerrar el pedido.',
      },
    ],
  },
  {
    slug: 'villa-alemana',
    nombre: 'Villa Alemana',
    conArticulo: 'Villa Alemana',
    bajada: 'La comuna donde está nuestra casa piloto: puedes venir a verla hoy.',
    parrafos: [
      'Villa Alemana es donde tenemos la casa piloto, en Camino Troncal 06680, sector Lo Hidalgo, justo en la salida hacia Limache. Si vives en la comuna, no tienes que decidir por fotos: puedes venir, entrar a la casa, golpear un muro y ver cómo se ve realmente un panel media luna de 5 pulgadas por dentro.',
      'El terreno urbano de Villa Alemana tiende a ser angosto y profundo, sobre todo en los loteos nuevos de Peñablanca y del sector norte. Ahí conviene mirar los modelos de dos pisos: ocupan menos huella y dejan patio, que en un sitio de doce metros de frente es la diferencia entre tener jardín o no tenerlo.',
      'Al estar en la misma comuna, el flete es mínimo y el montaje se coordina sin depender del clima de la carretera. Es la única comuna donde podemos pasar a ver el terreno antes de la entrega si queda de camino.',
    ],
    introCatalogo:
      'Estos son los modelos que más se van a sitios de Villa Alemana. El Lo Hidalgo es el que está armado en la casa piloto.',
    faq: [
      {
        pregunta: '¿Dónde queda exactamente la casa piloto?',
        respuesta:
          'En Camino Troncal 06680, sector Lo Hidalgo, Villa Alemana, en el camino que va hacia Limache. Atendemos de lunes a viernes de 11:00 a 18:00 y los sábados de 11:00 a 14:00 con coordinación previa.',
      },
      {
        pregunta: '¿Qué modelo conviene en un sitio angosto?',
        respuesta:
          'Los de dos pisos, como el Peñablanca. Sobre una huella chica te dan la misma superficie construida y te dejan patio utilizable.',
      },
    ],
  },
  {
    slug: 'quilpue',
    nombre: 'Quilpué',
    conArticulo: 'Quilpué',
    bajada: 'Sitios urbanos, calles angostas y despacho corto.',
    parrafos: [
      'Quilpué está a menos de quince minutos de la casa piloto, así que el traslado es corto y barato. La complicación acá no es la distancia: es la calle. En El Belloto, Los Pinos y buena parte del centro, las calles son estrechas, con autos estacionados a ambos lados y cables cruzando bajo.',
      'Por eso, en Quilpué siempre preguntamos por el frente del sitio y por el ancho de la calle antes de cerrar el pedido. Cuando el acceso es difícil se despacha en camión chico y el montaje toma medio día más, pero se resuelve: hemos armado en pasajes donde el camión grande no daba la vuelta.',
      'El sitio urbano promedio de Quilpué aguanta bien una casa de un piso de hasta 72 m² dejando antejardín y patio. Si necesitas más metros que eso, la salida es subir a dos pisos.',
    ],
    introCatalogo:
      'Modelos que calzan en un sitio urbano de Quilpué sin comerse el patio completo.',
    faq: [
      {
        pregunta: '¿Y si mi pasaje es muy angosto para el camión?',
        respuesta:
          'Se cotiza el despacho en camión más chico. Mándanos por WhatsApp la dirección o una foto de la calle y te confirmamos si hace falta antes de que pagues nada.',
      },
      {
        pregunta: '¿Cuántos metros me caben en un sitio típico de Quilpué?',
        respuesta:
          'En un sitio urbano estándar entra cómodo un modelo de hasta 72 m² en un piso. Sobre eso conviene mirar los de dos pisos para no perder patio.',
      },
    ],
  },
  {
    slug: 'quillota',
    nombre: 'Quillota',
    conArticulo: 'Quillota',
    bajada: 'Parcelas planas del valle y verano de calor fuerte.',
    parrafos: [
      'A Quillota se llega desde la casa piloto por la Troncal en alrededor de media hora. Es terreno de valle: plano, agrícola y con sitios grandes, lo que hace que el montaje sea de los más simples que hacemos. El camión entra sin problema en casi todas las parcelas de La Palma, San Pedro y Boco.',
      'El calor es el factor que cambia las decisiones. En enero y febrero Quillota pasa varios días sobre 32 grados, así que la orientación de las ventanas y los aleros dejan de ser un detalle estético. Conviene dejar el estar mirando al norte pero con alero, y no poner ventanas grandes al poniente.',
      'Como los sitios son amplios, acá se piden más los modelos de un piso con cuatro dormitorios que los de dos pisos: no hay razón para subir cuando sobra suelo.',
    ],
    introCatalogo:
      'En parcelas de Quillota se piden sobre todo plantas de un piso, amplias y bien orientadas.',
    faq: [
      {
        pregunta: '¿Despachan a las parcelas de La Palma o Boco?',
        respuesta:
          'Sí. Son terrenos planos con buen acceso, así que el montaje es directo. El flete se cotiza según la distancia exacta y se confirma por WhatsApp.',
      },
      {
        pregunta: '¿Qué conviene con el calor de Quillota?',
        respuesta:
          'Orientar el estar al norte con alero y evitar ventanales grandes al poniente. Si vas por Semifull o Llave en Mano, conversemos la aislación antes de fabricar.',
      },
    ],
  },
  {
    slug: 'vina-del-mar',
    nombre: 'Viña del Mar',
    conArticulo: 'Viña del Mar',
    bajada: 'Humedad de costa, quebradas y accesos que hay que revisar.',
    parrafos: [
      'Viña del Mar queda a poco más de media hora de la casa piloto. La diferencia con el interior no es la distancia sino el aire: la humedad y la sal de la costa castigan la madera expuesta mucho más rápido que en el valle. Una casa en Reñaca Alto o en Forestal necesita mantención de las terminaciones exteriores antes que la misma casa en Limache.',
      'La otra particularidad son las quebradas. Buena parte de los sitios disponibles en la parte alta de Viña están en pendiente o al final de caminos angostos, lo que obliga a revisar el acceso antes de cotizar el flete. En el plan y en los sectores planos el despacho es simple.',
      'Si tu terreno está expuesto al viento salino, conviene conversar el tratamiento del revestimiento exterior al momento de cotizar, no después de la entrega.',
    ],
    introCatalogo:
      'Para Viña del Mar, estos son los modelos que mejor se defienden en clima costero.',
    faq: [
      {
        pregunta: '¿La casa aguanta la humedad de la costa?',
        respuesta:
          'Sí, pero la madera expuesta necesita mantención más seguida que en el interior. Al cotizar te decimos qué tratamiento conviene para tu sector.',
      },
      {
        pregunta: '¿Llegan a los sectores altos de Viña?',
        respuesta:
          'En general sí, revisando antes el acceso. En calles muy angostas o con pendiente fuerte puede requerirse camión chico, que se cotiza aparte.',
      },
    ],
  },
  {
    slug: 'valparaiso',
    nombre: 'Valparaíso',
    conArticulo: 'Valparaíso',
    bajada: 'Cerros con acceso difícil: acá el despacho se estudia caso a caso.',
    parrafos: [
      'Valparaíso está a unos cuarenta minutos de la casa piloto, pero la distancia es lo de menos. Es la comuna más compleja para despachar de toda la región: calles en pendiente, curvas cerradas, escaleras y sitios a los que el camión simplemente no llega.',
      'Cuando el acceso no da, la casa se traslada por partes y se sube a mano o con grúa. Eso es perfectamente posible y lo hemos hecho, pero cambia el costo y el plazo, así que en Valparaíso nunca cotizamos flete a ciegas: pedimos la dirección exacta y, si se puede, una foto de la calle.',
      'En sitios de cerro con superficie limitada, los modelos de dos pisos rinden mucho mejor que los de un piso, porque la huella disponible suele ser el verdadero límite y no los metros construidos.',
    ],
    introCatalogo:
      'En los cerros de Valparaíso la huella del terreno manda. Estos son los modelos que mejor la aprovechan.',
    faq: [
      {
        pregunta: '¿Pueden subir la casa a un cerro sin acceso vehicular?',
        respuesta:
          'En muchos casos sí, trasladando por partes. Necesitamos ver la dirección y el acceso antes de cotizar, porque el costo del traslado cambia bastante.',
      },
      {
        pregunta: '¿Qué modelo rinde más en un sitio chico de cerro?',
        respuesta:
          'Los de dos pisos. Ocupan menos suelo y te dan la misma superficie habitable, que es lo que se necesita cuando el terreno es angosto.',
      },
    ],
  },
  {
    slug: 'la-calera',
    nombre: 'La Calera',
    conArticulo: 'La Calera',
    bajada: 'Valle interior, terreno plano y traslado por la Troncal.',
    parrafos: [
      'A La Calera se llega por la Troncal en algo más de media hora desde la casa piloto. Es terreno plano y de acceso amplio, tanto en el radio urbano como en los sitios hacia Artificio y La Cruz, así que el montaje no suele tener complicaciones de acceso.',
      'El clima es de valle interior seco: veranos largos y calurosos, inviernos con heladas y muy poca humedad ambiental. La madera se comporta bien en ese clima, pero la exposición al sol directo del poniente decolora las terminaciones exteriores antes de tiempo si no se protege.',
      'Por el tipo de sitio disponible, en La Calera se piden sobre todo modelos de un piso de tres y cuatro dormitorios, con espacio para ampliar después hacia atrás.',
    ],
    introCatalogo:
      'Estos modelos son los que más despachamos a sitios de La Calera y alrededores.',
    faq: [
      {
        pregunta: '¿Cuánto cuesta el flete a La Calera?',
        respuesta:
          'Depende del modelo y del acceso al sitio. Al ser terreno plano y con buen acceso suele ser un despacho simple; te lo cotizamos por WhatsApp junto con la casa.',
      },
      {
        pregunta: '¿Puedo ampliar la casa después?',
        respuesta:
          'Sí, los modelos rectangulares admiten ampliación hacia atrás. Conviene decirlo al cotizar para dejar previsto por dónde crece.',
      },
    ],
  },
  {
    slug: 'casablanca',
    nombre: 'Casablanca',
    conArticulo: 'Casablanca',
    bajada: 'Parcelas de valle con viento: la orientación importa más que en otras comunas.',
    parrafos: [
      'Casablanca es la comuna más alejada de nuestra casa piloto dentro del despacho habitual: hay que salir a la Ruta 68 y son cerca de una hora de viaje. El flete se cotiza en consecuencia, pero el acceso a las parcelas del valle es bueno y el montaje es simple.',
      'Lo característico del valle de Casablanca es el viento. La brisa que sube desde la costa en la tarde es constante y fría, y en un terreno abierto sin árboles eso se nota adentro de la casa. Vale la pena pensar dónde va la puerta principal y dejar el estar protegido del poniente.',
      'La mayoría de los sitios son parcelas grandes, así que hay libertad para orientar la casa como convenga en vez de calzarla forzado al frente del terreno.',
    ],
    introCatalogo:
      'Para parcelas de Casablanca, modelos que se pueden orientar libremente en el terreno.',
    faq: [
      {
        pregunta: '¿Despachan hasta Casablanca?',
        respuesta:
          'Sí. Es de los traslados más largos que hacemos, así que el flete se cotiza aparte según el modelo y la ubicación exacta de la parcela.',
      },
      {
        pregunta: '¿Cómo protejo la casa del viento?',
        respuesta:
          'Orientando el estar y la entrada lejos del poniente, y sellando bien puertas y ventanas. Es una conversación que conviene tener antes de fabricar.',
      },
    ],
  },
  {
    slug: 'concon',
    nombre: 'Concón',
    conArticulo: 'Concón',
    bajada: 'Suelo arenoso y aire salino: el radier hay que resolverlo bien.',
    parrafos: [
      'Concón está a poco más de media hora de la casa piloto. Lo que la hace distinta a cualquier otra comuna donde despachamos es el suelo: gran parte del sector es arena de duna, y una fundación mal resuelta sobre arena se nota en el primer invierno.',
      'Por eso en Concón insistimos más que en ningún otro lado en el radier. No lo hacemos nosotros, pero sí te decimos con claridad qué necesita el terreno antes de que encargues la casa, porque llegar con la casa a un radier improvisado no le sirve a nadie.',
      'Al estar a metros del mar, el aire salino exige el mismo cuidado de terminaciones exteriores que en Viña, o un poco más. La madera expuesta requiere mantención periódica y conviene definir el tratamiento al cotizar.',
    ],
    introCatalogo:
      'Modelos para Concón, pensando en fundación sobre suelo arenoso y clima salino.',
    faq: [
      {
        pregunta: '¿Se puede construir sobre arena en Concón?',
        respuesta:
          'Sí, pero la fundación tiene que estar bien resuelta y no es un radier improvisado. Cuéntanos cómo es el terreno y te decimos qué se necesita antes de fabricar.',
      },
      {
        pregunta: '¿Cuánta mantención necesita la casa cerca del mar?',
        respuesta:
          'Más que en el interior: la madera expuesta al aire salino pide mantención periódica. Al cotizar te indicamos el tratamiento recomendado.',
      },
    ],
  },
  {
    slug: 'san-felipe',
    nombre: 'San Felipe',
    conArticulo: 'San Felipe',
    bajada: 'Valle del Aconcagua: mucho calor en verano y heladas en invierno.',
    parrafos: [
      'San Felipe está fuera del radio corto: son alrededor de una hora y media desde la casa piloto, subiendo por el valle del Aconcagua. Despachamos igual, pero el flete pesa más en el total, así que conviene cotizarlo desde el principio y no al final.',
      'El clima es el extremo del que manejamos: veranos que pasan largamente los 33 grados y inviernos con heladas fuertes. Esa amplitud térmica es dura con las terminaciones y hace que valga la pena conversar la aislación antes de elegir el formato de compra.',
      'Los terrenos son planos y amplios, típicos de valle agrícola, así que el montaje en sí es simple y sin sorpresas de acceso.',
    ],
    introCatalogo:
      'Para San Felipe, modelos de valle: plantas amplias en terreno plano.',
    faq: [
      {
        pregunta: '¿Llegan hasta San Felipe?',
        respuesta:
          'Sí. Está fuera del radio corto, así que el flete se cotiza según el modelo y la dirección exacta. Escríbenos y te damos el valor junto con la casa.',
      },
      {
        pregunta: '¿Aguanta las heladas del valle?',
        respuesta:
          'La estructura sí. Con esa amplitud térmica conviene conversar la aislación al momento de elegir el formato de compra, para que la casa sea cómoda en verano y en invierno.',
      },
    ],
  },
  {
    slug: 'los-andes',
    nombre: 'Los Andes',
    conArticulo: 'Los Andes',
    bajada: 'Precordillera: terrenos en pendiente y despacho largo.',
    parrafos: [
      'Los Andes es el punto más lejano al que despachamos habitualmente: cerca de una hora y media larga desde la casa piloto. Es un traslado que se coordina con anticipación y donde el flete es una parte real del presupuesto, no un detalle.',
      'Al estar en precordillera, hay más terrenos con pendiente que en el resto del valle y las condiciones de invierno son más duras: viento frío bajando de la montaña y heladas frecuentes. La fundación y el sellado importan más acá que en la costa.',
      'Si tu terreno está en altura o tiene desnivel, mándanos fotos antes de cotizar: es la forma de que el precio que te demos sea el precio final y no una sorpresa el día del montaje.',
    ],
    introCatalogo:
      'Para Los Andes, modelos que se comportan bien en terreno con desnivel y clima de precordillera.',
    faq: [
      {
        pregunta: '¿Despachan a Los Andes?',
        respuesta:
          'Sí, coordinando con anticipación. Es de los traslados más largos que hacemos, así que el flete se cotiza aparte y se confirma antes de cerrar el pedido.',
      },
      {
        pregunta: '¿Qué pasa con la nieve y las heladas?',
        respuesta:
          'La estructura está pensada para clima frío, pero el sellado y la aislación hacen la diferencia. Conversémoslo al elegir el formato de compra.',
      },
    ],
  },
];

export function comunaPorSlug(slug: string): Comuna | undefined {
  return COMUNAS.find((c) => c.slug === slug);
}
