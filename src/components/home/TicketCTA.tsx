"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Ticket, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function TicketCTA() {
  const t = useTranslations("home")

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-tibidabo-red via-rose-500 to-tibidabo-sunset">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-[10%] w-20 h-20 rounded-full bg-white/20 animate-float-slow" />
        <div className="absolute bottom-0 right-[15%] w-16 h-16 rounded-full bg-white/15 animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-[60%] w-10 h-10 rounded-full bg-white/10 animate-float-slow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/entradas" className="flex items-center justify-between py-5 group relative z-10">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Ticket className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm font-medium">{t("ticketStripTitle")}</span>
              <span className="font-display text-white font-bold text-3xl">7,80€</span>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-white font-bold text-sm bg-white/20 px-5 py-2 rounded-full group-hover:bg-white/30 group-hover:gap-3 transition-all">
            {t("ticketStripCta")}
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </section>
  )
}
