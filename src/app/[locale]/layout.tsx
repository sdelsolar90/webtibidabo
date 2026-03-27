import { Montserrat, Fredoka } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import DaboWidget from "@/components/dabo/DaboWidget"
import { OrganizationJsonLd } from "@/components/shared/JsonLd"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const meta = messages.meta as Record<string, string>

  return {
    title: {
      default: meta.title,
      template: `%s | Tibidabo`,
    },
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: "Tibidabo - Parc d'Atraccions",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Tibidabo - Parc d'Atraccions de Barcelona",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
    alternates: {
      languages: {
        es: "/es",
        ca: "/ca",
        en: "/en",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${montserrat.variable} ${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <OrganizationJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
          <DaboWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
