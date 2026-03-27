"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Search, X, Ticket, MapPin, Utensils, Clock, HelpCircle } from "lucide-react"
import { ATTRACTIONS } from "@/lib/data/attractions"
import { RESTAURANTS } from "@/lib/data/restaurants"

interface Props {
  open: boolean
  onClose: () => void
}

interface SearchResult {
  type: "attraction" | "restaurant" | "page"
  name: string
  icon: string
  href: string
  description?: string
}

const PAGES: SearchResult[] = [
  { type: "page", name: "Entradas", icon: "🎟️", href: "/entradas", description: "Compra tu entrada" },
  { type: "page", name: "TibiClub", icon: "⭐", href: "/tibiclub", description: "Pase anual" },
  { type: "page", name: "Horarios", icon: "🕐", href: "/planifica/horarios", description: "Horarios de apertura" },
  { type: "page", name: "Cómo llegar", icon: "🗺️", href: "/planifica/como-llegar", description: "Transporte y parking" },
  { type: "page", name: "Accesibilidad", icon: "♿", href: "/planifica/accesibilidad", description: "Servicios adaptados" },
  { type: "page", name: "FAQ", icon: "❓", href: "/planifica/preguntas-frecuentes", description: "Preguntas frecuentes" },
  { type: "page", name: "Funicular", icon: "🚡", href: "/funicular", description: "Cuca de Llum" },
  { type: "page", name: "Historia", icon: "📜", href: "/quienes-somos/historia", description: "125 años de magia" },
  { type: "page", name: "Contacto", icon: "📧", href: "/contacto", description: "Escríbenos" },
]

const ALL_ITEMS: SearchResult[] = [
  ...ATTRACTIONS.map((a) => ({
    type: "attraction" as const,
    name: a.nombre,
    icon: a.icono,
    href: `/atracciones/${a.slug}`,
    description: a.zona,
  })),
  ...RESTAURANTS.map((r) => ({
    type: "restaurant" as const,
    name: r.nombre,
    icon: r.icono,
    href: `/restaurantes/${r.slug}`,
    description: r.especialidad,
  })),
  ...PAGES,
]

const QUICK_LINKS = [
  { label: "Entradas", href: "/entradas", icon: Ticket, color: "bg-tibidabo-red" },
  { label: "Atracciones", href: "/atracciones", icon: MapPin, color: "bg-tibidabo-navy" },
  { label: "Restaurantes", href: "/restaurantes", icon: Utensils, color: "bg-tibidabo-green" },
  { label: "Horarios", href: "/planifica/horarios", icon: Clock, color: "bg-amber-500" },
  { label: "FAQ", href: "/planifica/preguntas-frecuentes", icon: HelpCircle, color: "bg-purple-500" },
]

export default function SearchOverlay({ open, onClose }: Props) {
  const t = useTranslations("search")
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", handleKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    ).slice(0, 8)
  }, [query])

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    for (const r of results) {
      if (!groups[r.type]) groups[r.type] = []
      groups[r.type].push(r)
    }
    return groups
  }, [results])

  const typeLabels: Record<string, string> = {
    attraction: t("attractions"),
    restaurant: t("restaurants"),
    page: t("pages"),
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 lg:pt-28">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 text-lg bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-3">
                {t("quickLinks")}
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as never}
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-700 transition-colors"
                  >
                    <link.icon className={`w-4 h-4 text-white p-0.5 rounded ${link.color}`} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-gray-500 text-sm">{t("noResults")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2">
                    {typeLabels[type] || type}
                  </p>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as never}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-tibidabo-cream transition-colors group"
                      >
                        <span className="text-xl w-8 text-center">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 group-hover:text-tibidabo-red transition-colors truncate">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
