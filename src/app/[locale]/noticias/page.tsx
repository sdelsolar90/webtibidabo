import { getTranslations, setRequestLocale } from "next-intl/server"
import { Calendar, ArrowRight } from "lucide-react"

const NEWS = [
  {
    id: 1,
    date: "2026-03-15",
    title: "Temporada 2026: ¡Ya estamos abiertos!",
    excerpt: "El Tibidabo abre sus puertas a la temporada 2026 con todas las atracciones disponibles y novedades especiales para celebrar los 125 años.",
  },
  {
    id: 2,
    date: "2026-02-28",
    title: "Celebra los 125 años del Tibidabo",
    excerpt: "Programa especial de actividades para conmemorar el 125 aniversario del parque más antiguo de España. Espectáculos, eventos exclusivos y sorpresas.",
  },
  {
    id: 3,
    date: "2026-01-20",
    title: "Nuevo sistema Fast Pass digital",
    excerpt: "Accede a las atracciones más rápido con el nuevo Fast Pass digital. Disponible con tu entrada online por solo 8€ por persona.",
  },
  {
    id: 4,
    date: "2025-12-10",
    title: "Navidad mágica en el Tibidabo",
    excerpt: "Vive la magia de la Navidad con decoración especial, espectáculos temáticos y la visita de los Reyes Magos el 5 de enero.",
  },
  {
    id: 5,
    date: "2025-11-15",
    title: "TibiClub: nuevas ventajas para socios",
    excerpt: "Los socios del TibiClub disfrutan de nuevas ventajas exclusivas: acceso anticipado a eventos especiales y descuentos ampliados en restauración.",
  },
]

export default async function NewsPage({
  params,
}: PageProps<"/[locale]/noticias">) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("home")

  return (
    <>
      <section className="bg-tibidabo-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("newsTitle")}
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-6">
          {NEWS.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <time className="text-sm text-gray-500">{item.date}</time>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{item.excerpt}</p>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-tibidabo-navy mt-3 hover:underline">
                Leer más <ArrowRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
