"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Clock, Ticket, MapPin, Accessibility } from "lucide-react"
import { motion } from "framer-motion"

const PLAN_ITEMS = [
  {
    icon: Clock,
    key: "schedules",
    href: "/planifica/horarios" as const,
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50",
    emoji: "🕐",
  },
  {
    icon: Ticket,
    key: "pricing",
    href: "/entradas" as const,
    gradient: "from-tibidabo-red to-rose-400",
    bg: "bg-red-50",
    emoji: "🎟️",
  },
  {
    icon: MapPin,
    key: "howToGetHere",
    href: "/planifica/como-llegar" as const,
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-green-50",
    emoji: "📍",
  },
  {
    icon: Accessibility,
    key: "accessibility",
    href: "/planifica/accesibilidad" as const,
    gradient: "from-violet-500 to-purple-400",
    bg: "bg-purple-50",
    emoji: "♿",
  },
]

export default function PlanGrid() {
  const t = useTranslations("plan")
  const home = useTranslations("home")

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-tibidabo-cream/50 to-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            {home("planTitle")}
          </h2>
          <p className="text-gray-500 mt-3 text-lg">{home("planSubtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAN_ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group block bg-white rounded-3xl p-7 card-magic border border-gray-100"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-lg group-hover:text-tibidabo-red transition-colors">
                  {t(item.key as "schedules")}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {t(`${item.key}Desc` as "schedulesDesc")}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
