"use client"

import { useTranslations } from "next-intl"
import { useTicketStore } from "@/store/ticketStore"
import PricingTable from "./PricingTable"
import TicketSummary from "./TicketSummary"
import DatePicker from "./DatePicker"
import DiscountSection from "./DiscountSection"
import {
  FULL_PARK_TICKETS,
  PANORAMIC_TICKETS,
  FUNICULAR_TICKETS,
  TIBITOUR_TICKETS,
  FAST_PASS_PRICE,
} from "@/lib/data/pricing"
import { Zap } from "lucide-react"

const TABS = ["full", "panoramic", "funicular", "tibitour"] as const

export default function TicketSelector() {
  const t = useTranslations("tickets")
  const { tab, setTab, fastPass, setFastPass, items } = useTicketStore()

  const tabLabels: Record<string, string> = {
    full: t("tabFull"),
    panoramic: t("tabPanoramic"),
    funicular: t("tabFunicular"),
    tibitour: t("tabTibitour"),
  }

  const ticketMap = {
    full: FULL_PARK_TICKETS,
    panoramic: PANORAMIC_TICKETS,
    funicular: FUNICULAR_TICKETS,
    tibitour: TIBITOUR_TICKETS,
  }

  const hasItems = items.length > 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {TABS.map((t_key) => (
            <button
              key={t_key}
              onClick={() => setTab(t_key)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                tab === t_key
                  ? "bg-tibidabo-red text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tabLabels[t_key]}
            </button>
          ))}
        </div>

        <PricingTable tickets={ticketMap[tab]} />

        <DatePicker />

        {tab === "full" && (
          <div
            onClick={() => setFastPass(!fastPass)}
            className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
              fastPass
                ? "border-tibidabo-red bg-red-50/50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                fastPass ? "bg-tibidabo-red text-white" : "bg-gray-100 text-gray-500"
              }`}
            >
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {t("fastPass")}
                </span>
                <span className="text-sm font-bold text-tibidabo-red">
                  +{FAST_PASS_PRICE}€{t("perPerson")}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{t("fastPassDesc")}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                fastPass
                  ? "bg-tibidabo-red border-tibidabo-red"
                  : "border-gray-300"
              }`}
            >
              {fastPass && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        )}

        <DiscountSection />
      </div>

      <div className="lg:col-span-1">
        <div className={`lg:sticky lg:top-24 ${hasItems ? "" : "hidden lg:block"}`}>
          <TicketSummary />
        </div>
      </div>
    </div>
  )
}
