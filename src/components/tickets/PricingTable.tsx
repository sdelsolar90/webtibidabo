"use client"

import { useTranslations } from "next-intl"
import { useTicketStore } from "@/store/ticketStore"
import { Minus, Plus } from "lucide-react"
import type { TicketType } from "@/lib/data/types"

interface PricingTableProps {
  tickets: TicketType[]
}

export default function PricingTable({ tickets }: PricingTableProps) {
  const t = useTranslations("tickets")
  const { items, setQuantity } = useTicketStore()

  function getQty(ticketId: string) {
    return items.find((i) => i.ticketId === ticketId)?.quantity ?? 0
  }

  const categoryLabels: Record<string, string> = {
    adult: t("adult"),
    junior: t("junior"),
    senior: t("senior"),
    singleParent: t("singleParent"),
    disability: t("disability"),
    free: t("free"),
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => {
        const qty = getQty(ticket.id)
        const label = categoryLabels[ticket.category] ?? ticket.category

        return (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-tibidabo-red/20 transition-colors bg-white"
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-gray-900">{label}</span>
                <span className="text-sm text-gray-500">{ticket.description}</span>
              </div>
              <span className="text-lg font-bold text-tibidabo-red mt-0.5 block">
                {ticket.price === 0 ? t("free") : `${ticket.price.toFixed(2)}€`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setQuantity(ticket.id, label, ticket.price, Math.max(0, qty - 1))
                }
                disabled={qty === 0}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-tibidabo-red hover:text-tibidabo-red disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-lg tabular-nums">
                {qty}
              </span>
              <button
                onClick={() =>
                  setQuantity(ticket.id, label, ticket.price, qty + 1)
                }
                className="w-9 h-9 rounded-full border border-tibidabo-red text-tibidabo-red flex items-center justify-center hover:bg-tibidabo-red hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
