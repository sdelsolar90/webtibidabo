import { getTranslations, setRequestLocale } from "next-intl/server"
import { MapPin, Phone, Mail } from "lucide-react"

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contacto">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("contact")

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("formName")}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-tibidabo-navy/20 focus:border-tibidabo-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("formEmail")}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-tibidabo-navy/20 focus:border-tibidabo-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("formSubject")}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-tibidabo-navy/20 focus:border-tibidabo-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("formMessage")}
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-tibidabo-navy/20 focus:border-tibidabo-navy resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-tibidabo-red hover:bg-tibidabo-red-dark text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                {t("formSend")}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-tibidabo-red flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Dirección</p>
                  <p className="text-sm text-gray-600 mt-0.5">{t("address")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-tibidabo-navy flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-sm text-gray-600 mt-0.5">{t("phone")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-tibidabo-navy flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600 mt-0.5">info@tibidabo.cat</p>
                </div>
              </div>
            </div>

            <div className="bg-tibidabo-cream rounded-2xl p-6">
              <p className="font-medium text-gray-900 mb-2">Horario de atención</p>
              <p className="text-sm text-gray-600">
                Lunes a viernes: 9:00 - 17:00<br />
                Sábados, domingos y festivos: cerrado
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
