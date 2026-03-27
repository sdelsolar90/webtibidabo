import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Leaf, Zap, Droplets, Recycle, TreePine } from "lucide-react"

export default async function SustainabilityPage({
  params,
}: PageProps<"/[locale]/quienes-somos/sostenibilidad">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("about")

  const initiatives = [
    {
      icon: Zap,
      title: "Funicular sostenible",
      description: "El Cuca de Llum (2021) es un funicular de última generación con alta eficiencia energética, reduciendo el consumo un 40% respecto al anterior.",
    },
    {
      icon: Droplets,
      title: "Gestión del agua",
      description: "Sistema de recogida de agua pluvial para riego de zonas verdes y limpieza. Reducción del 30% del consumo de agua potable.",
    },
    {
      icon: Recycle,
      title: "Residuo cero",
      description: "Separación selectiva de residuos en todo el parque. Vasos reutilizables en todos los puntos de restauración. Objetivo: 90% de reciclaje para 2027.",
    },
    {
      icon: TreePine,
      title: "Parque Natural de Collserola",
      description: "El Tibidabo se sitúa dentro del Parque Natural de la Sierra de Collserola. Colaboramos en la preservación de la biodiversidad local.",
    },
    {
      icon: Leaf,
      title: "Transporte público",
      description: "El TibiBus gratuito y el funicular incentivan el acceso sin coche. El parking BSM conectado reduce el tráfico en la cima.",
    },
  ]

  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/quienes-somos"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("title")}
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("sustainabilityTitle")}
          </h1>
          <p className="text-lg text-white/70 mt-3">{t("sustainabilitySubtitle")}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          El Tibidabo asume su responsabilidad como parque situado en un entorno natural privilegiado.
          Nuestro compromiso es ofrecer diversión respetando el medio ambiente y contribuir a una Barcelona más sostenible.
        </p>

        <div className="space-y-6">
          {initiatives.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
