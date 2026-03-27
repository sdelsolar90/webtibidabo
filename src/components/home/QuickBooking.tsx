"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { Calendar, Users, Minus, Plus, Ticket, ArrowRight } from "lucide-react"
import { useTicketStore } from "@/store/ticketStore"

export default function QuickBooking() {
  const t = useTranslations("tickets")
  const router = useRouter()
  const { setDate, setQuantity, setTab } = useTicketStore()

  const [localDate, setLocalDate] = useState("")
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)

  const total = adults + kids
  const price = adults * 39 + kids * 15.5

  function handleBuy() {
    setTab("full")
    if (localDate) setDate(localDate)
    setQuantity("adulto", "Adulto", 39, adults)
    setQuantity("junior", "Junior", 15.5, kids)
    router.push("/entradas")
  }

  return (
    <section className="relative z-20 -mt-8 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 border border-gray-100 p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-tibidabo-navy focus-within:ring-2 focus-within:ring-tibidabo-navy/10">
              <Calendar className="w-5 h-5 text-tibidabo-navy flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {t("selectDate")}
                </label>
                <input
                  type="date"
                  value={localDate}
                  onChange={(e) => setLocalDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-transparent text-sm font-semibold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-tibidabo-navy flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Visitantes
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-14">{t("adult")}</span>
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-tibidabo-navy transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{adults}</span>
                      <button
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-tibidabo-navy transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-10">{t("junior")}</span>
                      <button
                        onClick={() => setKids(Math.max(0, kids - 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-tibidabo-navy transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{kids}</span>
                      <button
                        onClick={() => setKids(Math.min(10, kids + 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-tibidabo-navy transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {total > 0 && (
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t("total")}</p>
                  <p className="font-display text-2xl font-bold text-tibidabo-navy">{price.toFixed(2)}€</p>
                </div>
              )}
              <button
                onClick={handleBuy}
                className="btn-magic flex items-center gap-2 bg-tibidabo-red text-white font-bold px-8 py-4 rounded-2xl whitespace-nowrap text-sm"
              >
                <Ticket className="w-4 h-4" />
                {t("buyNow")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 flex items-center gap-1">🎟️ Desde <strong className="text-gray-600">7,80€</strong></span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">⚡ Fast Pass +8€</span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">🎓 Carnet Jove 2x1</span>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">👶 Menores 90cm gratis</span>
          </div>
        </div>
      </div>
    </section>
  )
}
