import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { getRestaurantBySlug, RESTAURANTS } from "@/lib/data/restaurants"
import { ArrowLeft, MapPin, Utensils, Star, Ticket } from "lucide-react"

export function generateStaticParams() {
  return RESTAURANTS.map((r) => ({ slug: r.slug }))
}

export default async function RestaurantDetailPage({
  params,
}: PageProps<"/[locale]/restaurantes/[slug]">) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const restaurant = getRestaurantBySlug(slug)
  if (!restaurant) notFound()

  const t = await getTranslations("restaurants")

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/restaurantes"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("title")}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{restaurant.icono}</span>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                {restaurant.nombre}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-white/60">{restaurant.zona}</span>
                <span className="text-sm font-semibold text-tibidabo-gold">{restaurant.rango}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{restaurant.descripcion}</p>
            </div>

            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-tibidabo-navy" />
              <span className="text-sm font-medium text-tibidabo-navy">
                {restaurant.especialidad}
              </span>
            </div>

            {restaurant.carta && restaurant.carta.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t("menu")}</h2>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
                  {restaurant.carta.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{item.nombre}</span>
                        {item.tag && (
                          <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {item.precio.toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              {restaurant.destacado && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-tibidabo-gold" />
                  <span className="text-sm font-semibold text-tibidabo-gold">{t("featured")}</span>
                </div>
              )}
              {restaurant.reservable && (
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">{t("reservable")}</span>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t("priceRange")}</p>
                <p className="text-2xl font-bold text-gray-900">{restaurant.rango}</p>
              </div>
            </div>

            <Link
              href="/entradas"
              className="flex items-center justify-center gap-2 bg-tibidabo-red hover:bg-tibidabo-red-dark text-white font-bold py-4 rounded-full transition-colors w-full"
            >
              <Ticket className="w-5 h-5" />
              Compra tu entrada
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
