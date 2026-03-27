import { getTranslations, setRequestLocale } from "next-intl/server"
import { TIBICLUB_PLANS } from "@/lib/data/pricing"
import { Crown, CheckCircle2, Ticket } from "lucide-react"
import { Link } from "@/i18n/navigation"

export default async function TibiClubPage({
  params,
}: PageProps<"/[locale]/tibiclub">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("tibiclub")

  return (
    <>
      <section className="bg-gradient-to-br from-tibidabo-navy via-tibidabo-navy to-blue-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="w-12 h-12 text-tibidabo-gold mx-auto mb-4" />
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70 mt-3 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TIBICLUB_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white border rounded-2xl p-8 ${
                plan.id === "familiar"
                  ? "border-tibidabo-gold shadow-lg ring-2 ring-tibidabo-gold/20"
                  : "border-gray-200"
              }`}
            >
              {plan.id === "familiar" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tibidabo-gold text-white text-xs font-bold px-4 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-tibidabo-navy">{plan.price}€</span>
                <span className="text-gray-500">/año</span>
                {plan.registration > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {t("registration", { price: plan.registration })}
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/entradas"
                className={`mt-8 flex items-center justify-center gap-2 font-bold py-3.5 rounded-full transition-colors w-full ${
                  plan.id === "familiar"
                    ? "bg-tibidabo-gold hover:bg-tibidabo-gold/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                <Ticket className="w-4 h-4" />
                {t("joinCta")}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
