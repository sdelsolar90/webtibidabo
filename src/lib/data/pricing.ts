import type { TicketType, Discount, TibiClubPlan } from "./types"

export const FULL_PARK_TICKETS: TicketType[] = [
  { id: "adulto", category: "adult", price: 39, description: "+120 cm" },
  { id: "junior", category: "junior", price: 15.5, description: "90-120 cm" },
  { id: "senior", category: "senior", price: 11.7, description: "+60 años" },
  {
    id: "monoparental",
    category: "singleParent",
    price: 31.2,
    description: "Adulto + hijos (con acreditación)",
  },
  {
    id: "diversidad",
    category: "disability",
    price: 7.8,
    description: "Diversidad funcional (con acreditación)",
  },
  { id: "gratis", category: "free", price: 0, description: "Menores de 90 cm" },
]

export const PANORAMIC_TICKETS: TicketType[] = [
  { id: "panoramic-adulto", category: "adult", price: 15, description: "+120 cm" },
  {
    id: "panoramic-junior",
    category: "junior",
    price: 9,
    description: "90-120 cm",
  },
  {
    id: "panoramic-senior",
    category: "senior",
    price: 9,
    description: "+60 años",
  },
  {
    id: "panoramic-gratis",
    category: "free",
    price: 0,
    description: "Menores de 90 cm",
  },
]

export const FUNICULAR_TICKETS: TicketType[] = [
  {
    id: "funicular-idavuelta",
    category: "adult",
    price: 13.5,
    description: "Ida y vuelta",
  },
  { id: "funicular-ida", category: "junior", price: 8.7, description: "Solo ida" },
]

export const TIBITOUR_TICKETS: TicketType[] = [
  {
    id: "tibitour-adulto",
    category: "adult",
    price: 16.5,
    description: "Adulto",
  },
  {
    id: "tibitour-junior",
    category: "junior",
    price: 14.25,
    description: "Junior (3-12 años)",
  },
]

export const FAST_PASS_PRICE = 8

export const DISCOUNTS: Discount[] = [
  {
    name: "Carnet Jove",
    description: "2x1 en entradas con Carnet Jove vigente",
    discount: "2x1",
  },
  {
    name: "Barcelona Card",
    description: "100% descuento con Barcelona Card",
    discount: "100%",
  },
  {
    name: "PortAventura",
    description: "Descuento combinado con entrada a PortAventura World",
    discount: "20%",
  },
  {
    name: "Zoo de Barcelona",
    description: "Descuento combinado con entrada al Zoo de Barcelona",
    discount: "15%",
  },
  {
    name: "Familia numerosa",
    description: "Descuento con carnet de familia numerosa vigente",
    discount: "10%",
  },
  {
    name: "TMB T-Casual",
    description: "Descuento presentando tarjeta T-Casual del mismo día",
    discount: "10%",
  },
  {
    name: "Parking cima",
    description: "Descuento en parking de la cima con entrada del parque",
    discount: "15€/día",
  },
  {
    name: "TibiClub",
    description: "15% en tiendas y restaurantes del parque",
    discount: "15%",
  },
]

export const TIBICLUB_PLANS: TibiClubPlan[] = [
  {
    id: "familiar",
    name: "Familiar",
    price: 190,
    registration: 24,
    description: "Padres + hijos menores de 18 años",
    features: [
      "Acceso ilimitado al parque y Área Panorámica",
      "Funicular Cuca de Llum gratis",
      "TibiBus gratis",
      "15% descuento en tiendas y restaurantes",
      "Descuentos en PortAventura, Zoo Barcelona",
      "Parking BSM gratis",
      "Actividades y eventos exclusivos",
    ],
  },
  {
    id: "individual",
    name: "Individual",
    price: 68,
    registration: 24,
    description: "Mayores de 18 años (o 14+ con consentimiento)",
    features: [
      "Acceso ilimitado al parque y Área Panorámica",
      "Funicular Cuca de Llum gratis",
      "TibiBus gratis",
      "15% descuento en tiendas y restaurantes",
      "Descuentos en PortAventura, Zoo Barcelona",
      "Parking BSM gratis",
      "Actividades y eventos exclusivos",
    ],
  },
  {
    id: "monoparental",
    name: "Monoparental",
    price: 190,
    registration: 0,
    description: "Familia monoparental + hijos menores de 18 años",
    features: [
      "Acceso ilimitado al parque y Área Panorámica",
      "Funicular Cuca de Llum gratis",
      "TibiBus gratis",
      "15% descuento en tiendas y restaurantes",
      "Descuentos en PortAventura, Zoo Barcelona",
      "Parking BSM gratis",
      "Actividades y eventos exclusivos",
      "Sin cuota de alta",
    ],
  },
]

export const PARKING = {
  cima: { price: 18, description: "Parking cima (todo el día)" },
  bsm: { price: 4.2, description: "BSM Sant Genís (todo el día)" },
  tibiclub: { price: 0, description: "Gratis para socios TibiClub" },
}
