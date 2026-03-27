"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

const MASCOTS = [
  {
    name: "Ti",
    range: "0-90 cm",
    color: "from-emerald-400 to-green-500",
    trait: "Valiente",
    emoji: "🐻",
    shadow: "shadow-green-200",
  },
  {
    name: "Bi",
    range: "90-110 cm",
    color: "from-blue-400 to-cyan-500",
    trait: "Curiosa",
    emoji: "🐰",
    shadow: "shadow-blue-200",
  },
  {
    name: "Da",
    range: "110-120 cm",
    color: "from-amber-400 to-orange-500",
    trait: "Creativo",
    emoji: "🦊",
    shadow: "shadow-amber-200",
  },
  {
    name: "Bo",
    range: "+120 cm",
    color: "from-rose-400 to-red-500",
    trait: "Alegre",
    emoji: "🐯",
    shadow: "shadow-rose-200",
  },
]

export default function MascotSection() {
  const t = useTranslations("home")

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            {t("mascotTitle")}
          </h2>
          <p className="text-gray-500 mt-3 text-lg">{t("mascotSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {MASCOTS.map((mascot, i) => (
            <motion.div
              key={mascot.name}
              className={`relative bg-white rounded-3xl p-6 lg:p-8 text-center card-magic border border-gray-100 ${mascot.shadow}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <motion.div
                className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${mascot.color} mx-auto flex items-center justify-center text-4xl lg:text-5xl shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {mascot.emoji}
              </motion.div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mt-4">
                {mascot.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">{mascot.range}</p>
              <div className={`inline-block bg-gradient-to-r ${mascot.color} text-white text-xs font-bold px-3 py-1 rounded-full mt-3`}>
                {mascot.trait}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
