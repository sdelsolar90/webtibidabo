"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ATTRACTIONS, ZONES } from "@/lib/data/attractions"
import AttractionCard from "./AttractionCard"
import type { Intensidad } from "@/lib/data/types"

export default function AttractionGrid() {
  const t = useTranslations("attractions")
  const [zone, setZone] = useState<string>("all")
  const [intensity, setIntensity] = useState<string>("all")

  const filtered = ATTRACTIONS.filter((a) => {
    if (zone !== "all" && a.zona !== zone) return false
    if (intensity !== "all" && a.intensidad !== intensity) return false
    return true
  })

  const intensities: { key: string; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "baja", label: t("low") },
    { key: "media", label: t("medium") },
    { key: "alta", label: t("high") },
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {t("filterZone")}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setZone("all")}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                zone === "all"
                  ? "bg-tibidabo-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("filterAll")}
            </button>
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  zone === z
                    ? "bg-tibidabo-navy text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {t("filterIntensity")}
          </label>
          <div className="flex gap-2">
            {intensities.map((i) => (
              <button
                key={i.key}
                onClick={() => setIntensity(i.key)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  intensity === i.key
                    ? "bg-tibidabo-red text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} {filtered.length === 1 ? "atracción" : "atracciones"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((attraction) => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  )
}
