import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Clock, Calendar, Car, Train } from "lucide-react"
import { SCHEDULE_INFO } from "@/lib/data/services"

export default async function SchedulesPage({
  params,
}: PageProps<"/[locale]/planifica/horarios">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("plan")

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
            {t("schedules")}
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
            <Calendar className="w-6 h-6 text-tibidabo-navy" />
            Calendario del Parque
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Meses</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Días de apertura</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SCHEDULE_INFO.parkSeasons.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{s.months}</td>
                    <td className="px-6 py-4 text-gray-600">{s.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Horario general: 12:00-22:00 (temporada alta) / 12:00-19:00 (temporada baja)
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
            <Clock className="w-6 h-6 text-tibidabo-navy" />
            Taquillas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(SCHEDULE_INFO.ticketOffice).map(([key, time]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  {key === "store" ? "Tibidabo Store" : key === "plaza" ? "Plaza" : "Cima"}
                </p>
                <p className="text-lg font-bold text-gray-900">{time}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
            <Train className="w-6 h-6 text-tibidabo-navy" />
            Funicular Cuca de Llum
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-blue-800 mb-1">Días de parque</p>
              <p className="text-sm text-blue-700">{SCHEDULE_INFO.funicular.parkDays}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-1">Días de Panorámica</p>
              <p className="text-sm text-green-700">{SCHEDULE_INFO.funicular.panoramicDays}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
            <Car className="w-6 h-6 text-tibidabo-navy" />
            Parking
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-1">BSM Sant Genís</p>
              <p className="text-sm text-gray-600">Apertura: {SCHEDULE_INFO.parking.bsm}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-800 mb-1">Parking Cima</p>
              <p className="text-sm text-gray-600">Apertura: {SCHEDULE_INFO.parking.cima}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
