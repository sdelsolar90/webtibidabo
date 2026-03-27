import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Accessibility, CheckCircle2 } from "lucide-react"

export default async function AccessibilityPage({
  params,
}: PageProps<"/[locale]/planifica/accesibilidad">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("plan")

  const features = [
    "2 ascensores panorámicos que recorren todos los niveles del parque",
    "Giradabo con cesta adaptada para sillas de ruedas",
    "Entrada reducida (7,80€) para personas con diversidad funcional acreditada",
    "Acceso permitido a perros lazarillo",
    "Zona de pícnic accesible junto al Área Panorámica",
    "Personal de atención disponible en todas las zonas",
    "Tótems informativos con restricciones de acceso en cada atracción",
    "Plazas de parking reservadas en la cima",
    "Funicular Cuca de Llum accesible para sillas de ruedas",
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
            {t("accessibility")}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-8">
          <Accessibility className="w-8 h-8 text-tibidabo-navy" />
          <p className="text-lg text-gray-700">
            El Tibidabo trabaja para que todas las personas puedan disfrutar del parque.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-tibidabo-cream rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-2">Mascotas Ti, Bi, Da y Bo</h2>
          <p className="text-sm text-gray-700">
            Cada atracción indica con las mascotas Ti (0-90 cm), Bi (90-110 cm), Da (110-120 cm) y Bo (+120 cm)
            qué rangos de altura están permitidos. Consulta el detalle de cada atracción para más información.
          </p>
        </div>
      </section>
    </>
  )
}
