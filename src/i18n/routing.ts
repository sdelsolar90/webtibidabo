import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/entradas": {
      es: "/entradas",
      ca: "/entrades",
      en: "/tickets",
    },
    "/atracciones": {
      es: "/atracciones",
      ca: "/atraccions",
      en: "/attractions",
    },
    "/atracciones/[slug]": {
      es: "/atracciones/[slug]",
      ca: "/atraccions/[slug]",
      en: "/attractions/[slug]",
    },
    "/restaurantes": {
      es: "/restaurantes",
      ca: "/restaurants",
      en: "/restaurants",
    },
    "/restaurantes/[slug]": {
      es: "/restaurantes/[slug]",
      ca: "/restaurants/[slug]",
      en: "/restaurants/[slug]",
    },
    "/planifica": {
      es: "/planifica",
      ca: "/planifica",
      en: "/plan-your-visit",
    },
    "/planifica/horarios": {
      es: "/planifica/horarios",
      ca: "/planifica/horaris",
      en: "/plan-your-visit/schedules",
    },
    "/planifica/como-llegar": {
      es: "/planifica/como-llegar",
      ca: "/planifica/com-arribar",
      en: "/plan-your-visit/how-to-get-here",
    },
    "/planifica/accesibilidad": {
      es: "/planifica/accesibilidad",
      ca: "/planifica/accessibilitat",
      en: "/plan-your-visit/accessibility",
    },
    "/planifica/preguntas-frecuentes": {
      es: "/planifica/preguntas-frecuentes",
      ca: "/planifica/preguntes-frequents",
      en: "/plan-your-visit/faq",
    },
    "/tibiclub": "/tibiclub",
    "/quienes-somos": {
      es: "/quienes-somos",
      ca: "/qui-som",
      en: "/about-us",
    },
    "/quienes-somos/historia": {
      es: "/quienes-somos/historia",
      ca: "/qui-som/historia",
      en: "/about-us/history",
    },
    "/quienes-somos/sostenibilidad": {
      es: "/quienes-somos/sostenibilidad",
      ca: "/qui-som/sostenibilitat",
      en: "/about-us/sustainability",
    },
    "/funicular": "/funicular",
    "/contacto": {
      es: "/contacto",
      ca: "/contacte",
      en: "/contact",
    },
    "/noticias": {
      es: "/noticias",
      ca: "/noticies",
      en: "/news",
    },
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathnames = keyof typeof routing.pathnames
