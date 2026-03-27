import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import TicketSelector from "@/components/tickets/TicketSelector"
import { Ticket } from "lucide-react"

export default function TicketsPage({ params }: PageProps<"/[locale]/entradas">) {
  const t = useTranslations("tickets")

  return (
    <>
      <section className="bg-gradient-to-br from-tibidabo-red via-tibidabo-red-dark to-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-medium">Tibidabo 2026</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-white/80 mt-3 max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <TicketSelector />
      </section>
    </>
  )
}
