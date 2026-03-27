import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Clock, Euro, MapPin, Accessibility, HelpCircle } from "lucide-react"

const SECTIONS = [
  { href: "/planifica/horarios" as const, icon: Clock, color: "bg-blue-50 text-blue-600", key: "schedules" },
  { href: "/entradas" as const, icon: Euro, color: "bg-red-50 text-tibidabo-red", key: "pricing" },
  { href: "/planifica/como-llegar" as const, icon: MapPin, color: "bg-green-50 text-green-600", key: "howToGetHere" },
  { href: "/planifica/accesibilidad" as const, icon: Accessibility, color: "bg-amber-50 text-amber-600", key: "accessibility" },
  { href: "/planifica/preguntas-frecuentes" as const, icon: HelpCircle, color: "bg-purple-50 text-purple-600", key: "faq" },
]

export default async function PlanPage({
  params,
}: PageProps<"/[locale]/planifica">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("plan")

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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SECTIONS.map((s) => {
            const Icon = s.icon
            return (
              <Link
                key={s.key}
                href={s.href}
                className="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg group-hover:text-tibidabo-navy transition-colors">
                    {t(s.key as "schedules")}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {t(`${s.key}Desc` as "schedulesDesc")}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
