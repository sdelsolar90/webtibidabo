"use client"

import { useTranslations } from "next-intl"
import { useTicketStore } from "@/store/ticketStore"
import { Calendar } from "lucide-react"

export default function DatePicker() {
  const t = useTranslations("tickets")
  const { date, setDate } = useTicketStore()

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900">
        {t("selectDate")}
      </label>
      <div className="relative">
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 focus:border-tibidabo-red focus:ring-1 focus:ring-tibidabo-red outline-none transition-colors text-sm"
        />
      </div>
    </div>
  )
}
