"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useAuthStore } from "@/store/authStore"
import { User, LogOut, ExternalLink } from "lucide-react"

const APP_URL = "https://tibidabo.enigmasac.com"

const BADGE_COLORS: Record<string, string> = {
  nuevo: "bg-blue-100 text-blue-700",
  familia: "bg-amber-100 text-amber-700",
}

export default function UserDropdown({ scrolled = true }: { scrolled?: boolean }) {
  const t = useTranslations("auth")
  const tNav = useTranslations("nav")
  const { user, logout } = useAuthStore()
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

  function handleLogout() {
    logout()
    setOpen(false)
  }

  if (!user) {
    return (
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-2 rounded-lg transition-all ${
          scrolled
            ? "text-gray-500 hover:text-tibidabo-navy hover:bg-gray-100"
            : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
        aria-label={tNav("myAccount")}
      >
        <User className="w-5 h-5" />
      </a>
    )
  }

  const initial = user.nombre.charAt(0).toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-tibidabo-red text-white text-sm font-bold flex items-center justify-center transition-transform hover:scale-105"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-200 min-w-[260px]">
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tibidabo-red text-white text-lg font-bold flex items-center justify-center shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{user.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${BADGE_COLORS[user.tipo] ?? "bg-gray-100 text-gray-600"}`}>
                {user.tipo === "familia" ? t("accountFamily") : t("accountNew")}
              </span>
            </div>
            <div className="pt-1 border-t border-gray-100 space-y-0.5">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {tNav("myAccount")}
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
