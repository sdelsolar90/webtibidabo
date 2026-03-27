"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useTicketStore } from "@/store/ticketStore"
import { useAuthStore } from "@/store/authStore"
import { FAST_PASS_PRICE } from "@/lib/data/pricing"
import { ShoppingCart, Zap, Check, QrCode, User } from "lucide-react"

export default function TicketSummary() {
  const t = useTranslations("tickets")
  const tAuth = useTranslations("auth")
  const { items, date, fastPass, getTotal, getItemCount, reset } =
    useTicketStore()
  const { user, login } = useAuthStore()
  const [confirmed, setConfirmed] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false)

  const total = getTotal()
  const count = getItemCount()
  const hasItems = count > 0

  function handleBuy() {
    if (!hasItems || !date) return
    setConfirmed(true)
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const ok = login(email, password)
    if (ok) {
      setShowLogin(false)
      setEmail("")
      setPassword("")
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail)
    setPassword("demo1234")
    setLoginError(false)
  }

  if (confirmed) {
    const code = `TIB-${Date.now().toString(36).toUpperCase()}`
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-5">
        <div className="w-16 h-16 bg-tibidabo-green/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-tibidabo-green" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {t("confirmTitle")}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{t("confirmSubtitle")}</p>
        </div>
        {user && (
          <p className="text-sm font-medium text-tibidabo-navy">
            {t("orderFor", { name: user.nombre })}
          </p>
        )}
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <QrCode className="w-24 h-24 text-gray-800 mx-auto" />
          <div>
            <p className="text-xs text-gray-500">{t("confirmCode")}</p>
            <p className="font-mono font-bold text-lg text-gray-900">{code}</p>
          </div>
          {user && (
            <p className="text-xs text-gray-400">{user.email}</p>
          )}
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{date}</p>
          <p>
            {count} {count === 1 ? "entrada" : "entradas"} &middot;{" "}
            <strong>{total.toFixed(2)}€</strong>
          </p>
        </div>
        <button
          onClick={() => {
            setConfirmed(false)
            reset()
          }}
          className="w-full py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t("remove")}
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
      <h3 className="font-bold text-gray-900 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        {t("summary")}
      </h3>

      {!hasItems ? (
        <p className="text-sm text-gray-400 py-4 text-center">
          {t("addToCart")}...
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.ticketId} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.label}
              </span>
              <span className="font-medium text-gray-900">
                {(item.price * item.quantity).toFixed(2)}€
              </span>
            </div>
          ))}

          {fastPass && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-tibidabo-red" />
                Fast Pass ({count}x)
              </span>
              <span className="font-medium text-gray-900">
                {(count * FAST_PASS_PRICE).toFixed(2)}€
              </span>
            </div>
          )}

          {date && (
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-500">Fecha</span>
              <span className="text-gray-700">{date}</span>
            </div>
          )}

          {user && (
            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
              <span className="text-gray-500">{t("client", { name: "" }).replace(": ", "")}</span>
              <span className="text-gray-700 font-medium">{user.nombre}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="font-bold text-gray-900">{t("total")}</span>
            <span className="text-2xl font-bold text-tibidabo-red">
              {total.toFixed(2)}€
            </span>
          </div>
        </div>
      )}

      {hasItems && !user && !showLogin && (
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 w-full justify-center py-2 text-xs text-gray-400 hover:text-tibidabo-navy transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          {t("loginHint")}
        </button>
      )}

      {showLogin && !user && (
        <form onSubmit={handleLogin} className="space-y-2.5 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs font-semibold text-gray-700">{tAuth("login")}</p>
          <input
            type="email"
            placeholder={tAuth("email")}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setLoginError(false) }}
            required
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-tibidabo-red/30 focus:border-tibidabo-red"
          />
          <input
            type="password"
            placeholder={tAuth("password")}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError(false) }}
            required
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-tibidabo-red/30 focus:border-tibidabo-red"
          />
          {loginError && (
            <p className="text-xs text-red-600">{tAuth("error")}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-tibidabo-navy text-white text-xs font-bold hover:bg-tibidabo-navy/90 transition-colors"
          >
            {tAuth("enter")}
          </button>
          <div className="flex gap-1">
            <button type="button" onClick={() => fillDemo("carlos@demo.com")} className="flex-1 px-2 py-1.5 text-[10px] text-gray-500 hover:bg-white rounded-lg transition-colors text-center">
              carlos@demo.com
            </button>
            <button type="button" onClick={() => fillDemo("familia@demo.com")} className="flex-1 px-2 py-1.5 text-[10px] text-gray-500 hover:bg-white rounded-lg transition-colors text-center">
              familia@demo.com
            </button>
          </div>
        </form>
      )}

      <button
        onClick={handleBuy}
        disabled={!hasItems || !date}
        className="w-full py-3.5 rounded-full bg-tibidabo-red hover:bg-tibidabo-red-dark text-white font-bold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {t("buyNow")}
      </button>
    </div>
  )
}
