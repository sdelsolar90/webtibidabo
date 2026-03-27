import { getTranslations, setRequestLocale } from "next-intl/server"
import AttractionGrid from "@/components/attractions/AttractionGrid"

export default async function AttractionsPage({
  params,
}: PageProps<"/[locale]/atracciones">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("attractions")

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/70 mt-3">{t("subtitle")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <AttractionGrid />
      </section>
    </>
  )
}
