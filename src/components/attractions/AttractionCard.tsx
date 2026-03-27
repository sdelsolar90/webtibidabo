"use client"

import { Link } from "@/i18n/navigation"
import Image from "next/image"
import type { Attraction } from "@/lib/data/types"

export default function AttractionCard({
  attraction,
}: {
  attraction: Attraction
}) {
  return (
    <Link
      href={{
        pathname: "/atracciones/[slug]",
        params: { slug: attraction.slug },
      }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-transparent transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={attraction.foto}
          alt={attraction.nombre}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
              attraction.intensidad === "alta"
                ? "bg-red-500/90 text-white"
                : attraction.intensidad === "media"
                ? "bg-amber-500/90 text-white"
                : "bg-green-500/90 text-white"
            }`}
          >
            {attraction.intensidad}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-2xl drop-shadow-lg">{attraction.icono}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold text-gray-900 group-hover:text-tibidabo-red transition-colors">
            {attraction.nombre}
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-2">{attraction.zona}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {attraction.descripcion}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          <span>{attraction.duracion}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          {attraction.alturaMinima > 0 ? (
            <span>Min. {attraction.alturaMinima} cm</span>
          ) : (
            <span>Sin restricción</span>
          )}
        </div>
      </div>
    </Link>
  )
}
