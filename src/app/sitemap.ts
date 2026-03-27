import type { MetadataRoute } from "next"
import { ATTRACTIONS } from "@/lib/data/attractions"
import { RESTAURANTS } from "@/lib/data/restaurants"

const BASE_URL = "https://tibidabo.cat"

const LOCALES = ["es", "ca", "en"] as const

type LocaleAlternates = {
  languages: Record<string, string>
}

function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  priority = 0.7
): MetadataRoute.Sitemap[number] {
  const alternates: LocaleAlternates = {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
    ),
  }

  return {
    url: `${BASE_URL}/es${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    entry("", "daily", 1.0),
    entry("/entradas", "weekly", 0.95),
    entry("/atracciones", "weekly", 0.8),
    entry("/restaurantes", "monthly", 0.7),
    entry("/planifica", "monthly", 0.7),
    entry("/planifica/horarios", "weekly", 0.7),
    entry("/planifica/como-llegar", "monthly", 0.6),
    entry("/planifica/accesibilidad", "monthly", 0.5),
    entry("/planifica/preguntas-frecuentes", "monthly", 0.6),
    entry("/tibiclub", "monthly", 0.7),
    entry("/quienes-somos", "monthly", 0.5),
    entry("/quienes-somos/historia", "yearly", 0.4),
    entry("/quienes-somos/sostenibilidad", "yearly", 0.4),
    entry("/funicular", "monthly", 0.6),
    entry("/contacto", "yearly", 0.4),
    entry("/noticias", "weekly", 0.6),
  ]

  const attractionPages = ATTRACTIONS.map((a) =>
    entry(`/atracciones/${a.slug}`, "monthly", 0.6)
  )

  const restaurantPages = RESTAURANTS.map((r) =>
    entry(`/restaurantes/${r.slug}`, "monthly", 0.5)
  )

  return [...staticPages, ...attractionPages, ...restaurantPages]
}
