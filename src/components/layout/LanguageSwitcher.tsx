"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { useState, useRef, useEffect } from "react"

const LOCALE_CONFIG: Record<Locale, { flag: string; label: string }> = {
  es: { flag: "🇪🇸", label: "Castellano" },
  ca: { flag: "🏴", label: "Català" },
  en: { flag: "🇬🇧", label: "English" },
}

export default function LanguageSwitcher({ scrolled = true }: { scrolled?: boolean }) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function switchLocale(next: Locale) {
    setOpen(false)
    router.replace(pathname as never, { locale: next })
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-lg transition-all ${
          scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
        }`}
        aria-label="Language"
      >
        <span className="text-lg leading-none">{LOCALE_CONFIG[locale].flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                loc === locale
                  ? "text-tibidabo-red font-semibold bg-red-50/50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg leading-none">{LOCALE_CONFIG[loc].flag}</span>
              <span>{LOCALE_CONFIG[loc].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
