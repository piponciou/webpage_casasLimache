/**
 * PREGUNTAS FRECUENTES
 * ====================
 * Las que llevan `enHome: true` salen en el home (8). Todas salen en
 * /preguntas-frecuentes/. El JSON-LD FAQPage se arma desde acá, así que el
 * texto de la respuesta que ve la persona y el que ve Google son el mismo.
 *
 * ⚠️ IMPORTANTE PARA EL CLIENTE: varias respuestas están escritas de forma
 * general a propósito, porque los datos exactos no estaban confirmados. Están
 * marcadas abajo con el comentario "// ⚠️ COMPLETAR". Reemplaza el texto por el
 * dato real; no inventamos plazos, garantías ni formas de pago.
 */

export interface Pregunta {
  pregunta: string;
  respuesta: string;
  enHome: boolean;
}

export const PREGUNTAS: Pregunta[] = [
  {
    pregunta: '¿Necesito permiso municipal para instalar una casa prefabricada?',
    // ⚠️ COMPLETAR: confirmar si Casas Limache acompaña la tramitación o no.
    respuesta:
      'Sí. En Chile una casa prefabricada se rige por las mismas normas que una construida en obra: necesita permiso de edificación de la Dirección de Obras de tu municipalidad y, al terminar, recepción final. Nosotros te entregamos el plano de distribución del modelo; la tramitación la hace el propietario con un arquitecto o constructor. Antes de comprar conviene preguntar en tu municipalidad qué exige para tu tipo de terreno.',
    enHome: true,
  },
  {
    pregunta: '¿Cuánto se demoran en entregar la casa?',
    // ⚠️ COMPLETAR: plazos reales de fabricación y de montaje por formato.
    respuesta:
      'Los modelos estándar tienen entrega inmediata cuando están disponibles en stock. Si el modelo se fabrica a pedido o eliges un formato con terminaciones, el plazo cambia. Como el plazo depende del modelo, del formato y de si tu radier está listo, te lo confirmamos por WhatsApp al momento de cotizar, con fecha concreta y no con un rango vago.',
    enHome: true,
  },
  {
    pregunta: '¿Hasta dónde despachan y cuánto cuesta el flete?',
    respuesta:
      'Despachamos en toda la Región de Valparaíso: Limache, Olmué, Villa Alemana, Quilpué, Quillota, Viña del Mar, Valparaíso, La Calera, Casablanca, Concón, San Felipe y Los Andes. El flete se cotiza aparte, porque depende de la distancia, del tamaño del modelo y del acceso al terreno. Un pasaje angosto o un camino de tierra con pendiente pueden obligar a usar un camión más chico o a dividir el traslado.',
    enHome: true,
  },
  {
    pregunta: '¿La casa viene con radier o lo tengo que hacer yo?',
    respuesta:
      'El radier lo prepara el cliente antes de la entrega y no está incluido en ningún formato. Tiene que estar nivelado, seco y con las medidas exactas del modelo que compraste: si el radier queda desnivelado, la casa no calza y el montaje se detiene. Te entregamos las medidas exactas al confirmar el pedido para que tu maestro lo haga bien a la primera.',
    enHome: true,
  },
  {
    pregunta: '¿Qué necesito tener listo en el terreno antes de que llegue la casa?',
    respuesta:
      'Cuatro cosas: el radier terminado y nivelado según las medidas que te pasamos, acceso para el camión hasta el punto de montaje, el terreno despejado alrededor de donde va la casa, y agua y electricidad si vas a seguir con las instalaciones inmediatamente. Si alguna de las cuatro no está resuelta, avísanos antes: es preferible mover la fecha que llegar y no poder descargar.',
    enHome: true,
  },
  {
    pregunta: '¿Tienen financiamiento o venden con crédito?',
    // ⚠️ COMPLETAR: confirmar si hay convenio de financiamiento, cuotas o crédito directo.
    respuesta:
      'Las condiciones de pago y de financiamiento se conversan directamente con la ejecutiva por WhatsApp, porque dependen del modelo y del formato que elijas. Escríbenos contándonos qué modelo te interesa y te explicamos las alternativas disponibles.',
    enHome: true,
  },
  {
    pregunta: '¿Qué formas de pago aceptan?',
    // ⚠️ COMPLETAR: medios de pago aceptados y porcentaje de abono para reservar.
    respuesta:
      'Los medios de pago aceptados y el abono necesario para reservar tu casa te los confirma la ejecutiva al cotizar. Preferimos decírtelo por escrito en el chat, con el detalle de tu pedido, en vez de publicar una condición general que después no calce con tu caso.',
    enHome: true,
  },
  {
    pregunta: '¿Qué garantía tiene la casa?',
    // ⚠️ COMPLETAR: plazo y cobertura de la garantía.
    respuesta:
      'La cobertura y el plazo de garantía te los entregamos por escrito junto con la cotización formal. Toda casa vendida en Chile está además protegida por la Ley del Consumidor y, en lo estructural, por los plazos que fija la Ley General de Urbanismo y Construcciones.',
    enHome: true,
  },
  {
    pregunta: '¿Puedo modificar la distribución de un modelo?',
    respuesta:
      'Sí, dentro de lo razonable: mover un tabique, cambiar de lado una puerta o agrandar una ventana son cambios habituales. Cambios que afectan la estructura o el techo hay que evaluarlos antes. Mándanos el modelo que te interesa y qué querrías cambiar, y te decimos si se puede y cuánto suma.',
    enHome: false,
  },
  {
    pregunta: '¿Qué diferencia hay entre Kit Básico, Semifull y Llave en Mano?',
    respuesta:
      'El Kit Básico es la casa estructurada: paneles exteriores media luna 5", tabiquería 2×3 con papel fieltro, paneles interiores con volcanita y techumbre; las terminaciones e instalaciones las haces tú o tu maestro. Semifull incorpora terminaciones principales. Llave en Mano es la casa terminada e instalada. El detalle de cada formato te lo confirma la ejecutiva según el modelo, porque no todos los modelos ofrecen los tres.',
    enHome: false,
  },
  {
    pregunta: '¿Incluye instalación eléctrica y sanitaria?',
    respuesta:
      'En el Kit Básico no: la casa llega estructurada y las instalaciones las ejecuta un técnico autorizado. Es importante que sea un instalador con certificación, tanto por seguridad como porque la recepción municipal la exige. En los formatos superiores, consúltalo al cotizar.',
    enHome: false,
  },
  {
    pregunta: '¿Puedo ir a ver una casa antes de comprar?',
    respuesta:
      'Sí, y es lo que recomendamos. Tenemos casa piloto en Camino Troncal 06680, sector Lo Hidalgo, Villa Alemana, abierta de lunes a viernes de 11:00 a 18:00 y los sábados de 11:00 a 14:00 coordinando antes. Puedes entrar, recorrerla y ver los materiales por dentro.',
    enHome: false,
  },
];

export const PREGUNTAS_HOME = PREGUNTAS.filter((p) => p.enHome);
