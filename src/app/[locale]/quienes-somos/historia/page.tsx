"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Sparkles } from "lucide-react"
import { HISTORY_EVENTS } from "@/lib/data/history"
import Image from "next/image"
import { motion } from "framer-motion"

const ERA_LABELS: Record<string, { label: string; color: string; emoji: string }> = {
  origins: { label: "Los orígenes (1899-1920)", color: "from-amber-700 to-amber-500", emoji: "🏗️" },
  golden: { label: "La época dorada (1921-1950)", color: "from-yellow-600 to-amber-400", emoji: "✨" },
  expansion: { label: "Crecimiento (1951-1988)", color: "from-blue-700 to-blue-500", emoji: "🚀" },
  modern: { label: "Reinvención (1989-2013)", color: "from-tibidabo-red to-rose-500", emoji: "🔄" },
  future: { label: "El futuro (2014-hoy)", color: "from-tibidabo-navy to-blue-500", emoji: "🌟" },
}

const ERAS = ["origins", "golden", "expansion", "modern", "future"] as const

export default function HistoryPage() {
  const t = useTranslations("about")

  return (
    <>
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/history/hero.jpg"
          alt="Historia del Tibidabo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/quienes-somos"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("title")}
          </Link>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl">
            125 años de magia
          </h1>
          <p className="text-xl text-white/80 mt-3 max-w-2xl">
            De la cima de una montaña al corazón de Barcelona. Esta es nuestra historia.
          </p>
        </div>

        <svg className="absolute bottom-0 left-0 right-0 w-full z-10" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          className="flex items-center justify-center gap-4 mb-16 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-4xl">🏗️</span>
          <span className="text-gray-300">→</span>
          <span className="text-4xl">✨</span>
          <span className="text-gray-300">→</span>
          <span className="text-4xl">🚀</span>
          <span className="text-gray-300">→</span>
          <span className="text-4xl">🔄</span>
          <span className="text-gray-300">→</span>
          <span className="text-4xl">🌟</span>
        </motion.div>

        {ERAS.map((era) => {
          const eraInfo = ERA_LABELS[era]
          const events = HISTORY_EVENTS.filter((e) => e.era === era)

          return (
            <div key={era} className="mb-20 last:mb-0">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{eraInfo.emoji}</span>
                  <h2 className={`font-display text-3xl lg:text-4xl font-bold bg-gradient-to-r ${eraInfo.color} bg-clip-text text-transparent`}>
                    {eraInfo.label}
                  </h2>
                </div>
                <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${eraInfo.color} mt-3`} />
              </motion.div>

              <div className="space-y-8">
                {events.map((event, i) => (
                  <motion.div
                    key={event.year}
                    className={`relative ${event.image ? "group" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    {event.image ? (
                      <div className={`rounded-3xl overflow-hidden ${event.highlight ? "ring-2 ring-tibidabo-gold/30" : ""}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display text-lg font-bold text-white bg-gradient-to-r ${eraInfo.color} shadow-lg`}>
                                {event.highlight && <Sparkles className="w-4 h-4" />}
                                {event.year}
                              </span>
                            </div>
                          </div>
                          <div className="p-6 lg:p-8 flex flex-col justify-center">
                            <h3 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 mt-3 leading-relaxed text-base lg:text-lg">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex items-start gap-5 px-6 py-5 bg-gray-50 rounded-2xl border border-gray-100 ${event.highlight ? "ring-2 ring-tibidabo-gold/20 bg-tibidabo-cream" : ""}`}>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full font-display text-sm font-bold text-white bg-gradient-to-r ${eraInfo.color} flex-shrink-0`}>
                          {event.year}
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}

        <motion.div
          className="mt-20 text-center bg-gradient-to-br from-tibidabo-navy via-[#0A3D6E] to-[#011D3D] rounded-3xl p-10 lg:p-16 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold">
            2026: Celebramos 125 años
          </h2>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            125 años creando recuerdos, superando crisis, reinventándonos y
            haciendo felices a millones de familias. La historia continúa.
          </p>
          <Link
            href="/entradas"
            className="btn-magic inline-flex items-center gap-2 bg-tibidabo-red text-white font-bold px-10 py-4 rounded-full mt-8 shadow-xl"
          >
            Sé parte de la historia
          </Link>
        </motion.div>
      </section>
    </>
  )
}
