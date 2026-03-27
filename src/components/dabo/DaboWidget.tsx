"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { X } from "lucide-react"
import DaboChat from "./DaboChat"

export default function DaboWidget() {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const locale = useLocale()
  const t = useTranslations("dabo")

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("dabo-teaser-shown")
    if (alreadyShown) return

    const timer = setTimeout(() => {
      setTeaser(true)
      sessionStorage.setItem("dabo-teaser-shown", "1")
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  function openChat() {
    setTeaser(false)
    setDismissed(true)
    setOpen(true)
  }

  function dismissTeaser() {
    setTeaser(false)
    setDismissed(true)
  }

  return (
    <>
      <DaboChat open={open} onClose={() => setOpen(false)} locale={locale} />

      {!open && teaser && !dismissed && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-2 fade-in duration-500">
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-[280px]">
            <button
              onClick={dismissTeaser}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-tibidabo-navy flex items-center justify-center flex-shrink-0">
                <Image src="/dabo.svg" alt="Dabo" width={24} height={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t("title")} 👋</p>
                <p className="text-xs text-gray-600 mt-0.5">{t("welcome")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              <button
                onClick={openChat}
                className="text-[11px] bg-tibidabo-cream text-tibidabo-navy font-medium px-2.5 py-1 rounded-full hover:bg-tibidabo-gold/20 transition-colors"
              >
                🎟️ {t("suggestTickets")}
              </button>
              <button
                onClick={openChat}
                className="text-[11px] bg-tibidabo-cream text-tibidabo-navy font-medium px-2.5 py-1 rounded-full hover:bg-tibidabo-gold/20 transition-colors"
              >
                🎢 {t("suggestAttractions")}
              </button>
              <button
                onClick={openChat}
                className="text-[11px] bg-tibidabo-cream text-tibidabo-navy font-medium px-2.5 py-1 rounded-full hover:bg-tibidabo-gold/20 transition-colors"
              >
                🍽️ {t("suggestFood")}
              </button>
            </div>

            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45" />
          </div>
        </div>
      )}

      {!open && (
        <button
          onClick={openChat}
          className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-tibidabo-navy shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group animate-dabo-float"
          aria-label="Dabo assistant"
        >
          <Image
            src="/dabo.svg"
            alt="Dabo"
            width={32}
            height={32}
            className="group-hover:scale-110 transition-transform"
          />
          {!dismissed && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-tibidabo-red rounded-full border-2 border-white animate-pulse" />
          )}
          {!dismissed && !teaser && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-tibidabo-red rounded-full border-2 border-white animate-pulse-ring" />
          )}
        </button>
      )}
    </>
  )
}
