import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Train, Bus, Car, MapPin } from "lucide-react"

export default async function HowToGetHerePage({
  params,
}: PageProps<"/[locale]/planifica/como-llegar">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("plan")

  const routes = [
    {
      icon: Train,
      title: "FGC + Tramvia Blau + Funicular",
      color: "bg-blue-50 text-blue-600",
      steps: [
        "FGC línea L7 hasta estación Av. Tibidabo",
        "Tramvia Blau hasta Plaça del Doctor Andreu",
        "Funicular Cuca de Llum hasta la cima (4 min)",
      ],
    },
    {
      icon: Bus,
      title: "TibiBus (gratuito)",
      color: "bg-green-50 text-green-600",
      steps: [
        "T2B: desde BSM Sant Genís-Vall d'Hebron",
        "T2C: desde Plaça Kennedy",
        "Requiere entrada al parque o billete de funicular",
        "Frecuencia: cada 15-20 minutos",
      ],
    },
    {
      icon: Car,
      title: "Coche",
      color: "bg-amber-50 text-amber-600",
      steps: [
        "Parking BSM Sant Genís: 4,20€/día (gratis TibiClub)",
        "Parking Cima: 0,092€/min, máx 18€/día",
        "Desde BSM Sant Genís: TibiBus gratuito hasta el parque",
        "Coordenadas GPS: 41.4217° N, 2.1187° E",
      ],
    },
  ]

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/planifica"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("title")}
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("howToGetHere")}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
        {routes.map((route, i) => {
          const Icon = route.icon
          return (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${route.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{route.title}</h2>
              </div>
              <ol className="space-y-3">
                {route.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0 mt-0.5">
                      {j + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}

        <div className="bg-tibidabo-cream rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-tibidabo-red" />
            <h2 className="text-xl font-bold text-gray-900">Dirección</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Plaça del Tibidabo, 3-4<br />
            08035 Barcelona<br />
            Tel: +34 93 211 79 42
          </p>
        </div>
      </section>
    </>
  )
}
