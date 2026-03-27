export type Zona =
  | "Panoràmica"
  | "Aventures"
  | "Xerinola"
  | "Somnis"
  | "Misterio"
  | "Àrea Panoràmica"

export type Intensidad = "baja" | "media" | "alta"

export interface Attraction {
  id: string
  slug: string
  nombre: string
  zona: Zona
  descripcion: string
  alturaMinima: number
  alturaMaxima?: number
  icono: string
  foto: string
  fotos?: string[]
  historia: string
  dato: string
  intensidad: Intensidad
  duracion: string
  capacidad: string
  edadMinima?: number
  accesible?: boolean
  nivel?: number
}

export interface MenuItem {
  nombre: string
  precio: number
  tag?: string
}

export type RestaurantType =
  | "restaurante"
  | "cafeteria"
  | "food-truck"
  | "helados"
  | "snacks"

export interface Restaurant {
  id: string
  slug: string
  nombre: string
  tipo: RestaurantType
  zona: string
  descripcion: string
  especialidad: string
  rango: "€" | "€€" | "€€€"
  icono: string
  destacado?: boolean
  reservable?: boolean
  carta: MenuItem[]
}

export interface TicketType {
  id: string
  category: string
  price: number
  description: string
}

export interface Discount {
  name: string
  description: string
  discount: string
}

export interface TibiClubPlan {
  id: string
  name: string
  price: number
  registration: number
  description: string
  features: string[]
}

export interface HistoryEvent {
  year: number
  title: string
  description: string
  image?: string
  era: "origins" | "golden" | "expansion" | "modern" | "future"
  highlight?: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Service {
  id: string
  nombre: string
  descripcion: string
  icono: string
  precio?: number
  incluido: boolean
}
