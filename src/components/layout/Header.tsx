"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Menu, X, ChevronDown, Sparkles, Search, ArrowRight, ChevronRight } from "lucide-react"

import LanguageSwitcher from "./LanguageSwitcher"
import UserDropdown from "./UserDropdown"
import SearchOverlay from "./SearchOverlay"

const MEGA_ATTRACTIONS = {
  featured: {
    name: "Muntanya Russa",
    slug: "muntanya-russa",
    desc: "La montaña rusa clásica con las mejores vistas del Mediterráneo",
    image: "/images/nav-russa.jpg",
    badge: "Imprescindible",
  },
  cards: [
    { name: "Avió", slug: "avio", image: "/images/nav-avio.jpg", tag: "Icónico" },
    { name: "Giradabo", slug: "giradabo", image: "/images/nav-giradabo.png", tag: "Panorámica" },
    { name: "Diavolo", slug: "diavolo", image: "/images/nav-diavolo.png", tag: "Aventura" },
    { name: "Carrusel", slug: "carrusel", image: "/images/nav-carrusel.jpg", tag: "Familiar" },
  ],
  zones: [
    { name: "Panoràmica", color: "#0ea5e9", count: 6 },
    { name: "Aventures", color: "#E40046", count: 7 },
    { name: "Xerinola", color: "#f59e0b", count: 5 },
    { name: "Somnis", color: "#a855f7", count: 6 },
    { name: "Misterio", color: "#1f2937", count: 4 },
  ],
}

const MEGA_RESTAURANTS = {
  featured: {
    name: "Masia del Tibidabo",
    slug: "masia-del-tibidabo",
    desc: "Cocina catalana en una masía centenaria con terraza panorámica y vistas a Barcelona",
    image: "/images/nav-masia.png",
    badge: "Reserva ahora",
  },
  cards: [
    { name: "Restaurant 666", slug: "restaurant-666", image: "/images/nav-hotel666.jpg", tag: "Temático" },
    { name: "Taverna del Castell", slug: "taverna-del-castell", image: "/images/nav-terraza.jpg", tag: "Familiar" },
    { name: "Miramiralls", slug: "miramiralls", image: "/images/nav-miramiralls.jpg", tag: "Cafetería" },
    { name: "Vistas BCN", slug: "bar-de-lestacio", image: "/images/nav-vistas.jpg", tag: "Terraza" },
  ],
  types: [
    { name: "Restaurantes", count: 5 },
    { name: "Cafeterías", count: 3 },
    { name: "Food Trucks", count: 3 },
    { name: "Helados", count: 4 },
  ],
}

const MEGA_PLANIFICA = {
  featured: {
    name: "Planifica tu visita",
    desc: "Todo lo que necesitas saber para disfrutar al máximo de tu día en Tibidabo",
    image: "/images/nav-planifica-hero.jpg",
    badge: "Empieza aquí",
    href: "/planifica",
  },
  cards: [
    { name: "Horarios", slug: "horarios", image: "/images/nav-horarios.jpg", tag: "Apertura", href: "/planifica/horarios" },
    { name: "Cómo llegar", slug: "como-llegar", image: "/images/nav-como-llegar.jpg", tag: "Transporte", href: "/planifica/como-llegar" },
    { name: "Accesibilidad", slug: "accesibilidad", image: "/images/nav-accesibilidad.jpg", tag: "Servicios", href: "/planifica/accesibilidad" },
    { name: "Preguntas frecuentes", slug: "faq", image: "/images/nav-faq.jpg", tag: "FAQ", href: "/planifica/preguntas-frecuentes" },
  ],
  tips: [
    { icon: "🎟️", text: "Compra online y ahorra" },
    { icon: "🕐", text: "Llega a la apertura" },
    { icon: "🚡", text: "Sube en funicular" },
    { icon: "📱", text: "Descarga la app" },
  ],
}

const MEGA_ABOUT = {
  featured: {
    name: "125 años de magia",
    desc: "Desde 1901, el parque de atracciones más antiguo de España y el corazón de Barcelona",
    image: "/images/nav-quienes-hero.png",
    badge: "Nuestra historia",
    href: "/quienes-somos",
  },
  cards: [
    { name: "Historia", slug: "historia", image: "/images/nav-historia.jpg", tag: "Desde 1901", href: "/quienes-somos/historia" },
    { name: "Sostenibilidad", slug: "sostenibilidad", image: "/images/nav-sostenibilidad.jpg", tag: "Compromiso", href: "/quienes-somos/sostenibilidad" },
    { name: "El Avió", slug: "avio", image: "/images/nav-empresa.jpg", tag: "Icono BCN", href: "/quienes-somos/historia" },
    { name: "Funicular", slug: "funicular", image: "/images/nav-funicular.jpg", tag: "Cuca de Llum", href: "/funicular" },
  ],
  milestones: [
    { year: "1901", text: "Inauguración" },
    { year: "1928", text: "El Avió" },
    { year: "2001", text: "Centenario" },
    { year: "2026", text: "125 aniversario" },
  ],
}

type MegaType = "attractions" | "restaurants" | "planifica" | "about" | null

export default function Header() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeMega, setActiveMega] = useState<MegaType>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isHome = pathname === "/" || /^\/(es|ca|en)\/?$/.test(pathname)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    handler()
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  const openMega = useCallback((type: MegaType) => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setActiveMega(type)
    setActiveDropdown(null)
  }, [])

  const delayCloseMega = useCallback(() => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 250)
  }, [])

  const keepMegaOpen = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
  }, [])

  const isTransparent = isHome && !scrolled && !mobileOpen
  const showSolid = !isTransparent

  const linkBase = showSolid
    ? "text-gray-700 hover:text-tibidabo-red"
    : "text-white/90 hover:text-white"

  function closeAll() {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setActiveMega(null)
    setActiveDropdown(null)
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showSolid
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="shrink-0 group" onClick={closeAll}>
              <Image
                src="/logo-tibidabo.png"
                alt="Tibidabo"
                width={300}
                height={200}
                className={`h-10 lg:h-12 w-auto group-hover:scale-[1.03] transition-all duration-300 ${
                  isTransparent ? "brightness-0 invert" : ""
                }`}
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <div
                onMouseEnter={() => openMega("attractions")}
                onMouseLeave={delayCloseMega}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`}>
                  {t("attractions")}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === "attractions" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div
                onMouseEnter={() => openMega("restaurants")}
                onMouseLeave={delayCloseMega}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`}>
                  {t("restaurants")}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === "restaurants" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div
                onMouseEnter={() => openMega("planifica")}
                onMouseLeave={delayCloseMega}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`}>
                  {t("plan")}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === "planifica" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div
                onMouseEnter={() => openMega("about")}
                onMouseLeave={delayCloseMega}
              >
                <button className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`}>
                  {t("aboutUs")}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMega === "about" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <Link href="/tibiclub" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`} onClick={closeAll}>
                {t("tibiclub")}
              </Link>
              <Link href="/funicular" className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${linkBase}`} onClick={closeAll}>
                {t("funicular")}
              </Link>
            </nav>

            <div className="flex items-center gap-1.5 lg:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-lg transition-all ${
                  showSolid ? "text-gray-500 hover:text-tibidabo-navy hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <UserDropdown scrolled={showSolid} />

              <LanguageSwitcher scrolled={showSolid} />

              <Link
                href="/entradas"
                className="hidden sm:inline-flex items-center gap-1.5 btn-magic bg-tibidabo-red text-white font-bold text-xs px-4 py-2 rounded-full whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3" />
                {t("tickets")}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 transition-colors ${showSolid ? "text-gray-700" : "text-white"}`}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── MEGA: ATRACCIONES ─── */}
        {activeMega === "attractions" && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMegaOpen}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Featured hero */}
                <Link
                  href={`/atracciones/${MEGA_ATTRACTIONS.featured.slug}` as never}
                  onClick={closeAll}
                  className="col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer h-[280px]"
                >
                  <Image
                    src={MEGA_ATTRACTIONS.featured.image}
                    alt={MEGA_ATTRACTIONS.featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tibidabo-red text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {MEGA_ATTRACTIONS.featured.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {MEGA_ATTRACTIONS.featured.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{MEGA_ATTRACTIONS.featured.desc}</p>
                  </div>
                </Link>

                {/* Cards grid */}
                <div className="col-span-5 grid grid-cols-2 gap-3">
                  {MEGA_ATTRACTIONS.cards.map((card) => (
                    <Link
                      key={card.slug}
                      href={`/atracciones/${card.slug}` as never}
                      onClick={closeAll}
                      className="relative rounded-xl overflow-hidden group h-[132px]"
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="250px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{card.tag}</span>
                        <p className="text-sm font-bold text-white leading-tight">{card.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Zones sidebar */}
                <div className="col-span-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Zonas del parque</h4>
                  <div className="space-y-1">
                    {MEGA_ATTRACTIONS.zones.map((zone) => (
                      <Link
                        key={zone.name}
                        href={"/atracciones" as never}
                        onClick={closeAll}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                          <span className="text-sm font-medium text-gray-800 group-hover:text-tibidabo-red transition-colors">
                            {zone.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{zone.count}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/atracciones"
                      onClick={closeAll}
                      className="flex items-center gap-2 text-sm font-bold text-tibidabo-red hover:gap-3 transition-all"
                    >
                      Ver las +30 atracciones
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── MEGA: RESTAURANTES ─── */}
        {activeMega === "restaurants" && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMegaOpen}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Featured hero */}
                <Link
                  href={`/restaurantes/${MEGA_RESTAURANTS.featured.slug}` as never}
                  onClick={closeAll}
                  className="col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer h-[280px]"
                >
                  <Image
                    src={MEGA_RESTAURANTS.featured.image}
                    alt={MEGA_RESTAURANTS.featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tibidabo-green text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {MEGA_RESTAURANTS.featured.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {MEGA_RESTAURANTS.featured.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{MEGA_RESTAURANTS.featured.desc}</p>
                  </div>
                </Link>

                {/* Cards grid - same pattern as attractions */}
                <div className="col-span-5 grid grid-cols-2 gap-3">
                  {MEGA_RESTAURANTS.cards.map((card) => (
                    <Link
                      key={card.slug}
                      href={`/restaurantes/${card.slug}` as never}
                      onClick={closeAll}
                      className="relative rounded-xl overflow-hidden group h-[132px]"
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="250px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{card.tag}</span>
                        <p className="text-sm font-bold text-white leading-tight">{card.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Types sidebar */}
                <div className="col-span-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Por tipo</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {MEGA_RESTAURANTS.types.map((type) => (
                      <Link
                        key={type.name}
                        href={"/restaurantes" as never}
                        onClick={closeAll}
                        className="bg-gray-50 hover:bg-tibidabo-cream/60 rounded-xl px-3 py-3 transition-colors group text-center"
                      >
                        <span className="font-display text-lg font-bold text-tibidabo-navy block">{type.count}</span>
                        <span className="text-[11px] text-gray-600 group-hover:text-tibidabo-navy transition-colors">{type.name}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/restaurantes"
                      onClick={closeAll}
                      className="flex items-center gap-2 text-sm font-bold text-tibidabo-red hover:gap-3 transition-all"
                    >
                      Ver todos
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── MEGA: PLANIFICA ─── */}
        {activeMega === "planifica" && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMegaOpen}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-6">
                <Link
                  href={MEGA_PLANIFICA.featured.href as never}
                  onClick={closeAll}
                  className="col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer h-[280px]"
                >
                  <Image
                    src={MEGA_PLANIFICA.featured.image}
                    alt={MEGA_PLANIFICA.featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {MEGA_PLANIFICA.featured.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {MEGA_PLANIFICA.featured.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{MEGA_PLANIFICA.featured.desc}</p>
                  </div>
                </Link>

                <div className="col-span-5 grid grid-cols-2 gap-3">
                  {MEGA_PLANIFICA.cards.map((card) => (
                    <Link
                      key={card.slug}
                      href={card.href as never}
                      onClick={closeAll}
                      className="relative rounded-xl overflow-hidden group h-[132px]"
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="250px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{card.tag}</span>
                        <p className="text-sm font-bold text-white leading-tight">{card.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Consejos</h4>
                  <div className="space-y-2">
                    {MEGA_PLANIFICA.tips.map((tip) => (
                      <div key={tip.text} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl">
                        <span className="text-lg">{tip.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{tip.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/entradas"
                      onClick={closeAll}
                      className="flex items-center gap-2 text-sm font-bold text-tibidabo-red hover:gap-3 transition-all"
                    >
                      Comprar entradas
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── MEGA: QUIÉNES SOMOS ─── */}
        {activeMega === "about" && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-200"
            onMouseEnter={keepMegaOpen}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-6">
                <Link
                  href={MEGA_ABOUT.featured.href as never}
                  onClick={closeAll}
                  className="col-span-4 relative rounded-2xl overflow-hidden group cursor-pointer h-[280px]"
                >
                  <Image
                    src={MEGA_ABOUT.featured.image}
                    alt={MEGA_ABOUT.featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tibidabo-navy text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {MEGA_ABOUT.featured.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {MEGA_ABOUT.featured.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">{MEGA_ABOUT.featured.desc}</p>
                  </div>
                </Link>

                <div className="col-span-5 grid grid-cols-2 gap-3">
                  {MEGA_ABOUT.cards.map((card) => (
                    <Link
                      key={card.slug}
                      href={card.href as never}
                      onClick={closeAll}
                      className="relative rounded-xl overflow-hidden group h-[132px]"
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="250px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{card.tag}</span>
                        <p className="text-sm font-bold text-white leading-tight">{card.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Hitos</h4>
                  <div className="space-y-1">
                    {MEGA_ABOUT.milestones.map((m, i) => (
                      <div key={m.year} className="flex items-center gap-3 px-3 py-2.5 group">
                        <div className="flex flex-col items-center">
                          <span className="w-3 h-3 rounded-full bg-tibidabo-navy ring-2 ring-tibidabo-navy/20" />
                          {i < MEGA_ABOUT.milestones.length - 1 && (
                            <span className="w-0.5 h-5 bg-gray-200 mt-0.5" />
                          )}
                        </div>
                        <div>
                          <span className="font-display text-sm font-bold text-tibidabo-navy">{m.year}</span>
                          <span className="text-xs text-gray-500 ml-2">{m.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/quienes-somos/historia"
                      onClick={closeAll}
                      className="flex items-center gap-2 text-sm font-bold text-tibidabo-red hover:gap-3 transition-all"
                    >
                      Descubrir más
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── MOBILE MENU ─── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-1">
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
                className="flex items-center gap-3 w-full px-3 py-3 text-sm text-gray-500 rounded-xl bg-gray-50 mb-3"
              >
                <Search className="w-4 h-4" />
                <span>Buscar...</span>
              </button>

              <Link href="/entradas" onClick={closeAll} className="flex items-center gap-2 px-3 py-3 text-sm font-bold text-tibidabo-red rounded-lg bg-red-50/50">
                <Sparkles className="w-4 h-4" />
                {t("buyTickets")}
              </Link>

              {[
                { label: t("attractions"), href: "/atracciones", items: MEGA_ATTRACTIONS.cards.map(a => ({ label: a.name, href: `/atracciones/${a.slug}` })) },
                { label: t("restaurants"), href: "/restaurantes", items: MEGA_RESTAURANTS.cards.map(r => ({ label: r.name, href: `/restaurantes/${r.slug}` })) },
                { label: t("plan"), href: "/planifica", items: MEGA_PLANIFICA.cards.map(c => ({ label: c.name, href: c.href })) },
                { label: t("aboutUs"), href: "/quienes-somos", items: MEGA_ABOUT.cards.map(c => ({ label: c.name, href: c.href })) },
              ].map((group) => (
                <div key={group.label}>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === group.label ? null : group.label)}
                    className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    {group.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === group.label ? "rotate-180" : ""}`} />
                  </button>
                  {activeDropdown === group.label && (
                    <div className="pl-4 space-y-1">
                      {group.items.map((item) => (
                        <Link key={item.href} href={item.href as never} onClick={closeAll} className="block px-3 py-2.5 text-sm text-gray-600 hover:text-tibidabo-red rounded-lg hover:bg-gray-50">
                          {item.label}
                        </Link>
                      ))}
                      <Link href={group.href as never} onClick={closeAll} className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-tibidabo-red">
                        Ver todas <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <Link href="/tibiclub" onClick={closeAll} className="block px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                {t("tibiclub")}
              </Link>
              <Link href="/funicular" onClick={closeAll} className="block px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                {t("funicular")}
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <a
                  href="https://tibidabo.enigmasac.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-tibidabo-navy rounded-lg hover:bg-gray-50"
                >
                  <ChevronRight className="w-4 h-4" />
                  {t("myAccount")}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
