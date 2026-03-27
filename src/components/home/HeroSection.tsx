"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Ticket, Sparkles, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const HERO_IMAGES = [
  { src: "/images/hero-park.jpg", alt: "Vista general del Tibidabo" },
  { src: "/images/hero-coaster.jpg", alt: "Muntanya Russa" },
  { src: "/images/hero-avio.jpg", alt: "El Avió" },
  { src: "/images/hero-giradabo.jpg", alt: "Giradabo" },
  { src: "/images/hero-panoramica.jpg", alt: "Área Panorámica" },
]

export default function HeroSection() {
  const t = useTranslations("home")
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden -mt-16 lg:-mt-20">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={HERO_IMAGES[current].src}
            alt={HERO_IMAGES[current].alt}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-5 py-2 rounded-full mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-tibidabo-gold" />
            <span>125 años de magia en la cima de Barcelona</span>
            <Sparkles className="w-4 h-4 text-tibidabo-gold" />
          </motion.div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-9xl font-bold text-white tracking-tight leading-[0.9] drop-shadow-2xl">
            {t("heroTitle")}
          </h1>

          <motion.p
            className="text-lg sm:text-xl text-white/90 mt-6 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            +30 atracciones, vistas de toda Barcelona, gastronomía y diversión
            para todas las edades. Todo en un lugar único a 512 metros sobre el mar.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link
            href="/entradas"
            className="btn-magic inline-flex items-center gap-2.5 bg-tibidabo-red text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl shadow-tibidabo-red/40"
          >
            <Ticket className="w-5 h-5" />
            {t("heroCta")}
          </Link>
          <Link
            href="/atracciones"
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold text-base px-8 py-4 rounded-full transition-all border border-white/30"
          >
            <Star className="w-4 h-4" />
            {t("featuredTitle")}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Imagen ${i + 1}`}
          />
        ))}
      </div>

      <svg className="absolute bottom-0 left-0 right-0 w-full z-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
          fill="white"
        />
      </svg>
    </section>
  )
}
