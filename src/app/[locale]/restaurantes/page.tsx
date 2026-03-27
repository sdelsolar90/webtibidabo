import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { RESTAURANTS } from "@/lib/data/restaurants"

export default async function RestaurantsPage({
  params,
}: PageProps<"/[locale]/restaurantes">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("restaurants")

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70 mt-3">{t("subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESTAURANTS.map((r) => (
            <Link
              key={r.id}
              href={{ pathname: "/restaurantes/[slug]", params: { slug: r.slug } }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{r.icono}</span>
                <div>
                  <h2 className="font-bold text-gray-900 group-hover:text-tibidabo-navy transition-colors">
                    {r.nombre}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{r.zona}</span>
                    <span className="text-xs font-semibold text-tibidabo-gold">{r.rango}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{r.descripcion}</p>
              <p className="text-xs text-tibidabo-navy font-medium mt-3">
                {r.especialidad}
              </p>
              <div className="flex items-center gap-2 mt-3">
                {r.destacado && (
                  <span className="text-[10px] font-semibold bg-tibidabo-gold/20 text-tibidabo-gold px-2 py-0.5 rounded-full">
                    {t("featured")}
                  </span>
                )}
                {r.reservable && (
                  <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {t("reservable")}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
