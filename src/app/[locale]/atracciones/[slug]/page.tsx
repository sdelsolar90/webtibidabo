import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { getAttractionBySlug, ATTRACTIONS } from "@/lib/data/attractions"
import {
  ArrowLeft,
  Clock,
  Users,
  Ruler,
  Ticket,
  Sparkles,
  History,
} from "lucide-react"

export function generateStaticParams() {
  return ATTRACTIONS.map((a) => ({ slug: a.slug }))
}

export default async function AttractionDetailPage({
  params,
}: PageProps<"/[locale]/atracciones/[slug]">) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const attraction = getAttractionBySlug(slug)
  if (!attraction) notFound()

  const t = await getTranslations("attractions")

  const heightMascots = [
    { name: "Ti", range: "0-90 cm", color: "bg-green-100 text-green-700", ok: attraction.alturaMinima <= 0 },
    { name: "Bi", range: "90-110 cm", color: "bg-blue-100 text-blue-700", ok: attraction.alturaMinima <= 90 && (!attraction.alturaMaxima || attraction.alturaMaxima >= 110) },
    { name: "Da", range: "110-120 cm", color: "bg-amber-100 text-amber-700", ok: attraction.alturaMinima <= 110 && (!attraction.alturaMaxima || attraction.alturaMaxima >= 120) },
    { name: "Bo", range: "+120 cm", color: "bg-red-100 text-red-700", ok: attraction.alturaMinima <= 120 && !attraction.alturaMaxima },
  ]

  return (
    <>
      <div className="relative h-[50vh] lg:h-[60vh]">
        <Image
          src={attraction.foto}
          alt={attraction.nombre}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/atracciones"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("title")}
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{attraction.icono}</span>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
                {attraction.nombre}
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-white/70">{attraction.zona}</span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  attraction.intensidad === "alta"
                    ? "bg-red-500/80 text-white"
                    : attraction.intensidad === "media"
                    ? "bg-amber-500/80 text-white"
                    : "bg-green-500/80 text-white"
                }`}
              >
                {attraction.intensidad}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {attraction.descripcion}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-tibidabo-navy mx-auto mb-2" />
                <p className="text-xs text-gray-500">{t("duration")}</p>
                <p className="font-bold text-gray-900">{attraction.duracion}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Users className="w-5 h-5 text-tibidabo-navy mx-auto mb-2" />
                <p className="text-xs text-gray-500">{t("capacity")}</p>
                <p className="font-bold text-gray-900">{attraction.capacidad}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Ruler className="w-5 h-5 text-tibidabo-navy mx-auto mb-2" />
                <p className="text-xs text-gray-500">{t("minHeight")}</p>
                <p className="font-bold text-gray-900">
                  {attraction.alturaMinima > 0
                    ? `${attraction.alturaMinima} cm`
                    : t("noRestriction")}
                </p>
              </div>
              {attraction.alturaMaxima && (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Ruler className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">{t("maxHeight")}</p>
                  <p className="font-bold text-gray-900">
                    {attraction.alturaMaxima} cm
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <History className="w-5 h-5 text-tibidabo-navy" />
                {t("history")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {attraction.historia}
              </p>
            </div>

            <div className="bg-tibidabo-cream rounded-xl p-6">
              <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                <Sparkles className="w-5 h-5 text-tibidabo-gold" />
                {t("funFact")}
              </h3>
              <p className="text-gray-700">{attraction.dato}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">
                {t("heightIndicators")}
              </h3>
              <div className="space-y-3">
                {heightMascots.map((m) => (
                  <div
                    key={m.name}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      m.ok ? m.color : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <span className="text-lg font-bold w-8">{m.name}</span>
                    <span className="text-sm">{m.range}</span>
                    {m.ok && (
                      <svg className="w-5 h-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/entradas"
              className="flex items-center justify-center gap-2 bg-tibidabo-red hover:bg-tibidabo-red-dark text-white font-bold py-4 rounded-full transition-colors w-full"
            >
              <Ticket className="w-5 h-5" />
              {t("buyCta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
