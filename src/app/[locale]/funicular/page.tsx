import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Train, Clock, Euro, Ticket } from "lucide-react"
import { FUNICULAR_TICKETS } from "@/lib/data/pricing"
import { SCHEDULE_INFO } from "@/lib/data/services"

export default async function FunicularPage({
  params,
}: PageProps<"/[locale]/funicular">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("funicular")

  return (
    <>
      <section className="bg-gradient-to-br from-tibidabo-navy via-blue-800 to-tibidabo-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Train className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70 mt-3 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed">
            El funicular del Tibidabo fue inaugurado en 1901, siendo el primer funicular de España.
            En 2021 se estrenó el nuevo <strong>Cuca de Llum</strong>, un funicular de última generación que conecta
            la Plaça del Doctor Andreu con la cima del Tibidabo en solo 4 minutos, recorriendo 1.130 metros
            de longitud y salvando un desnivel de 275 metros.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
            {t("historyTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-tibidabo-navy">1901</p>
              <p className="text-sm text-gray-600 mt-1">Inauguración</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-tibidabo-navy">1.130m</p>
              <p className="text-sm text-gray-600 mt-1">Longitud del recorrido</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-tibidabo-navy">4 min</p>
              <p className="text-sm text-gray-600 mt-1">Duración del trayecto</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
            <Clock className="w-6 h-6 text-tibidabo-navy" />
            {t("scheduleTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-1">Días de parque</p>
              <p className="text-sm text-gray-600">{SCHEDULE_INFO.funicular.parkDays}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-1">Días de Panorámica</p>
              <p className="text-sm text-gray-600">{SCHEDULE_INFO.funicular.panoramicDays}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
            <Euro className="w-6 h-6 text-tibidabo-navy" />
            {t("pricingTitle")}
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {FUNICULAR_TICKETS.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{ticket.description}</p>
                </div>
                <p className="text-lg font-bold text-tibidabo-navy">{ticket.price.toFixed(2)}€</p>
              </div>
            ))}
            <div className="flex items-center justify-between px-6 py-4 bg-tibidabo-cream/50">
              <p className="font-medium text-gray-900">Incluido con entrada al parque</p>
              <p className="text-lg font-bold text-green-600">Gratis</p>
            </div>
          </div>
        </div>

        <Link
          href="/entradas"
          className="flex items-center justify-center gap-2 bg-tibidabo-red hover:bg-tibidabo-red-dark text-white font-bold py-4 rounded-full transition-colors w-full max-w-sm mx-auto"
        >
          <Ticket className="w-5 h-5" />
          Comprar billete
        </Link>
      </section>
    </>
  )
}
