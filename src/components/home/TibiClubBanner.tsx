"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight, Crown, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function TibiClubBanner() {
  const t = useTranslations("home")

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-tibidabo-navy via-[#0A3D6E] to-[#011D3D]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-tibidabo-gold/10"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-full bg-white/5"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut",
              }}
            >
              <Star className="w-3 h-3 text-tibidabo-gold/30" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 px-8 py-14 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-tibidabo-gold/20 px-4 py-1.5 rounded-full mb-5">
              <Crown className="w-4 h-4 text-tibidabo-gold" />
              <span className="text-tibidabo-gold font-bold text-sm tracking-wider uppercase">
                TibiClub
              </span>
              <Sparkles className="w-3 h-3 text-tibidabo-gold" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("tibidclubTitle")}
            </h2>
            <p className="text-white/70 mt-4 text-lg max-w-lg leading-relaxed">
              {t("tibidclubSubtitle")}
            </p>
            <Link
              href="/tibiclub"
              className="btn-magic inline-flex items-center gap-2 bg-gradient-to-r from-tibidabo-gold to-amber-400 text-gray-900 font-bold px-8 py-4 rounded-full mt-8 shadow-xl shadow-tibidabo-gold/20"
            >
              {t("tibidclubCta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex-shrink-0 text-center">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-tibidabo-gold/20 to-tibidabo-gold/5 border border-tibidabo-gold/30 flex flex-col items-center justify-center">
              <span className="text-white/50 text-sm font-medium">Desde</span>
              <span className="font-display text-5xl lg:text-6xl font-bold text-gradient-gold">68€</span>
              <span className="text-white/50 text-sm font-medium">/año</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
