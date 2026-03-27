import type { Service, FaqItem } from "./types"

export const SERVICES: Service[] = [
  {
    id: "panoramic-area",
    nombre: "Área Panorámica",
    descripcion:
      "Zona con las mejores vistas de Barcelona. Acceso al Giradabo, Talaia, Avió y Carrusel. Abierta casi todo el año.",
    icono: "🏔️",
    incluido: true,
  },
  {
    id: "funicular",
    nombre: "Funicular Cuca de Llum",
    descripcion:
      "Funicular sostenible que conecta la Plaça del Doctor Andreu con la cima del Tibidabo en 4 minutos.",
    icono: "🚟",
    precio: 13.5,
    incluido: false,
  },
  {
    id: "tibitour",
    nombre: "TibiTour",
    descripcion:
      "Visita guiada por la historia de más de 125 años del parque. Incluye acceso exclusivo, coffee break y Cuca de Llum. ~1.5h, 8-16 personas.",
    icono: "🎙️",
    precio: 16.5,
    incluido: false,
  },
  {
    id: "tibiclub",
    nombre: "TibiClub",
    descripcion:
      "Pase anual con acceso ilimitado al parque y Área Panorámica, parking BSM gratis, 15% descuento y eventos exclusivos.",
    icono: "🎫",
    incluido: false,
  },
  {
    id: "tibibus",
    nombre: "TibiBus",
    descripcion:
      "Autobús lanzadera gratuito. T2B desde BSM Sant Genís, T2C desde Plaça Kennedy. Requiere entrada o billete de funicular.",
    icono: "🚌",
    incluido: true,
  },
  {
    id: "parking",
    nombre: "Parking",
    descripcion:
      "BSM Sant Genís-Vall d'Hebron: 4,20€/día (gratis TibiClub). Cima: 0,092€/min, máx 18€/día.",
    icono: "🅿️",
    incluido: false,
  },
  {
    id: "collserola-tower",
    nombre: "Torre de Collserola",
    descripcion:
      "Torre de telecomunicaciones diseñada por Norman Foster. Mirador a 560m sobre el nivel del mar. Actualmente cerrada.",
    icono: "📡",
    incluido: false,
  },
  {
    id: "sunset",
    nombre: "Sunset at Tibidabo",
    descripcion:
      "Experiencia de atardecer con DJ y ambiente chill-out en el punto más alto de Barcelona.",
    icono: "🌅",
    incluido: false,
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué tipos de entrada existen?",
    answer:
      "Existen entradas para el Parque Completo (incluye todas las atracciones), pases para el Área Panorámica (solo atracciones emblemáticas), billetes de funicular Cuca de Llum, y el TibiTour (visita guiada).",
  },
  {
    question: "¿Hay tarifa especial para diversidad funcional?",
    answer:
      "Sí. Presenta el certificado de discapacidad junto con DNI o pasaporte en taquillas. La entrada es de 7,80€.",
  },
  {
    question: "¿Hay descuento para jubilados?",
    answer:
      "Sí. Los mayores de 60 años tienen descuento presentando DNI en taquillas. La entrada es de 11,70€.",
  },
  {
    question: "¿Se pueden pagar atracciones por separado?",
    answer:
      "Sí, en el Área Panorámica se pueden adquirir tiques individuales de atracción emblemática por 4,00€.",
  },
  {
    question:
      "Si no quiero subir a atracciones, ¿debo pagar entrada?",
    answer:
      "Para acceder al Parque de Atracciones sí necesitas entrada. El Área Panorámica es de libre acceso (sin derecho a atracciones). Los mayores de 60 años pueden solicitar un ticket de paseo gratuito.",
  },
  {
    question: "¿La entrada permite subir a todas las atracciones?",
    answer:
      "Sí, la entrada del Parque incluye todas las atracciones (según restricciones de altura). Excepción: las entradas del Área Panorámica solo incluyen las atracciones emblemáticas.",
  },
  {
    question:
      "¿Por qué las atracciones están limitadas por altura?",
    answer:
      "Las limitaciones de altura responden a normas de seguridad. Cada atracción tiene requisitos específicos indicados en los tótems informativos.",
  },
  {
    question: "¿Los menores de 90 cm pueden subir a atracciones?",
    answer:
      "Algunas atracciones permiten menores de 90 cm, siempre acompañados de un adulto. Consulta cada atracción individualmente.",
  },
  {
    question: "¿Las embarazadas pueden subir a las atracciones?",
    answer:
      "Solo a algunas. Las restricciones están indicadas en los tótems informativos de cada atracción.",
  },
  {
    question: "¿En caso de lluvia cierran atracciones?",
    answer:
      "Algunas atracciones pueden cerrar por seguridad en caso de lluvia o condiciones meteorológicas adversas.",
  },
  {
    question: "¿Qué es el TibiClub?",
    answer:
      "Es el abono anual del Tibidabo. Acceso ilimitado durante 12 meses al Parque, Área Panorámica, Cuca de Llum y TibiBus. Incluye 15% de descuento en tiendas y restauración, actividades exclusivas y descuentos en otros centros de ocio.",
  },
  {
    question:
      "He comprado entradas y quiero hacerme del TibiClub, ¿me las descuentan?",
    answer:
      "Sí, dentro de los 30 días naturales siguientes a la compra. Solo se descuentan entradas de personas que formarán parte del contrato. La cuota de inscripción no se descuenta. Tramitación presencial en Oficina TibiClub o Tibidabo Store.",
  },
  {
    question: "¿Qué es el Área Panorámica?",
    answer:
      "Es una zona de libre acceso con las mejores vistas de Barcelona. Para usar las atracciones emblemáticas (Giradabo, Talaia, Avió, Carrusel, Museu d'Autòmats) se necesita adquirir una pulsera.",
  },
  {
    question: "¿Cómo se llega al Tibidabo?",
    answer:
      "En transporte público: FGC hasta Av. Tibidabo + Tramvia Blau + Funicular, o TibiBus gratuito. En coche: parking BSM Sant Genís-Vall d'Hebron (4,20€/día) + TibiBus, o parking de la cima (máx 18€/día).",
  },
  {
    question:
      "¿Se puede acceder al parque con comida o bebida del exterior?",
    answer:
      "Sí. Hay una zona de picnic junto a Beyond en el Área Panorámica. No se permite consumir alimentos externos en las áreas de restauración propias del parque.",
  },
  {
    question: "¿Pueden entrar perros?",
    answer: "No se permite la entrada de animales, excepto perros lazarillo.",
  },
  {
    question: "¿Se puede fumar en el parque?",
    answer:
      "Solo en las zonas habilitadas para ello. Consulta el plano del parque para ubicarlas.",
  },
  {
    question: "¿Hay ascensores en el parque?",
    answer:
      "Sí. El parque cuenta con 2 ascensores panorámicos que recorren todos los niveles. Preferencia para cochecitos, sillas de ruedas, diversidad funcional, tercera edad y embarazadas.",
  },
  {
    question: "¿Se puede reservar plaza de aparcamiento?",
    answer:
      "Sí, el parking de la cima permite reserva anticipada a través de la web.",
  },
]

export const SCHEDULE_INFO = {
  parkSeasons: [
    {
      months: "Marzo, abril y mayo",
      days: "Fines de semana, festivos y Semana Santa",
    },
    {
      months: "Junio",
      days: "Fines de semana y festivos. Desde el 24, de miércoles a domingo",
    },
    {
      months: "Julio y agosto",
      days: "De miércoles a domingo",
    },
    {
      months: "Septiembre - noviembre",
      days: "Fines de semana y festivos",
    },
    {
      months: "Diciembre",
      days: "Fines de semana y días festivos seleccionados",
    },
    {
      months: "Enero",
      days: "2, 3, 4 y 5 de enero",
    },
  ],
  ticketOffice: {
    store: "10:00h",
    plaza: "10:30h",
    cima: "11:00h",
  },
  parking: {
    bsm: "9:30h",
    cima: "10:00h",
  },
  funicular: {
    parkDays: "De 10:30h hasta 30 min después del cierre. Frecuencia máx. 15 min",
    panoramicDays:
      "De 11:00h hasta 15 min después del cierre. Frecuencia cada 15 min",
  },
  panoramicArea: {
    february: "Fines de semana",
    marchDecember: "Todos los días (excepto 25 y 26 diciembre)",
    january: "2, 3, 4 y 5 de enero",
  },
}
