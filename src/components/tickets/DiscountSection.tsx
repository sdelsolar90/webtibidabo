"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { DISCOUNTS } from "@/lib/data/pricing"
import { ChevronDown, Tag } from "lucide-react"

export default function DiscountSection() {
  const t = useTranslations("tickets")
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-tibidabo-green" />
          <div>
            <span className="font-semibold text-gray-900 block">
              {t("discounts")}
            </span>
            <span className="text-sm text-gray-500">{t("discountsDesc")}</span>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="space-y-3">
            {DISCOUNTS.map((d) => (
              <div key={d.name} className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {d.name}
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">{d.description}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-tibidabo-green bg-green-50 px-2.5 py-1 rounded-full">
                  {d.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
