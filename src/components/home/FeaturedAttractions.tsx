"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ATTRACTIONS } from "@/lib/data/attractions"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const FEATURED_IDS = [
  "avio",
  "muntanya-russa",
  "merli",
  "giradabo",
  "piratta",
  "alaska",
  "hotel-666",
  "talaia",
]

const INTENSITY_STYLE = {
  alta: "bg-gradient-to-r from-red-500 to-rose-500 text-white",
  media: "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
  baja: "bg-gradient-to-r from-emerald-400 to-green-400 text-white",
}

export default function FeaturedAttractions() {
  const t = useTranslations("home")
  const featured = FEATURED_IDS.map((id) =>
    ATTRACTIONS.find((a) => a.id === id)
  ).filter(Boolean)

  return (
    <section className="relative py-20 lg:py-28 bg-confetti overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-tibidabo-red font-semibold text-sm mb-3">
            <Sparkles className="w-4 h-4" />
            +30 atracciones
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            {t("featuredTitle")}
          </h2>
          <p className="text-gray-500 mt-3 text-lg">{t("featuredSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featured.map((attraction, i) => {
            if (!attraction) return null
            return (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={{
                    pathname: "/atracciones/[slug]",
                    params: { slug: attraction.slug },
                  }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden block card-magic"
                >
                  <Image
                    src={attraction.foto}
                    alt={attraction.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${INTENSITY_STYLE[attraction.intensidad]}`}>
                      {attraction.intensidad}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                    <span className="text-3xl mb-1.5 block drop-shadow-lg">{attraction.icono}</span>
                    <h3 className="text-white font-bold text-base lg:text-lg leading-tight drop-shadow-md">
                      {attraction.nombre}
                    </h3>
                    <span className="text-white/50 text-xs mt-1 block">{attraction.zona}</span>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-tibidabo-red/30 to-transparent" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/atracciones"
            className="inline-flex items-center gap-2 bg-tibidabo-navy hover:bg-tibidabo-navy-dark text-white font-bold px-8 py-4 rounded-full transition-all hover:gap-3 hover:shadow-lg"
          >
            {t("featuredCta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
