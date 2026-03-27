import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { History, Leaf } from "lucide-react"

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/quienes-somos">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("about")

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70 mt-3 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose prose-gray max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            El Parc d'Atraccions Tibidabo es el parque de atracciones más antiguo de España y uno de los más antiguos del mundo.
            Situado en la cima de la montaña del Tibidabo, a 512 metros sobre el nivel del mar, ofrece las mejores vistas de Barcelona
            junto con más de 30 atracciones para todas las edades. Desde 1901, millones de personas han visitado este lugar único
            que combina tradición, diversión e innovación.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Gestionado por Tibidabo, SA (perteneciente a Barcelona de Serveis Municipals), el parque es un patrimonio vivo de la ciudad.
            Su nombre proviene del latín "Tibi dabo" (te daré), las palabras que según la tradición cristiana pronunció el diablo
            a Jesús desde lo alto de la montaña.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/quienes-somos/historia"
            className="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <History className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg group-hover:text-tibidabo-navy transition-colors">
                {t("historyTitle")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{t("historySubtitle")}</p>
            </div>
          </Link>

          <Link
            href="/quienes-somos/sostenibilidad"
            className="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg group-hover:text-tibidabo-navy transition-colors">
                {t("sustainabilityTitle")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{t("sustainabilitySubtitle")}</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
