export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AmusementPark",
    name: "Tibidabo",
    alternateName: "Parc d'Atraccions Tibidabo",
    url: "https://tibidabo.cat",
    logo: "https://tibidabo.cat/logo-tibidabo-800.png",
    image: "https://tibidabo.cat/images/hero-tibidabo.jpg",
    description:
      "El parque de atracciones más antiguo de España, en la cima de Barcelona. Más de 125 años de historia.",
    foundingDate: "1901-10-29",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaça del Tibidabo, 3-4",
      addressLocality: "Barcelona",
      postalCode: "08035",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.4217,
      longitude: 2.1187,
    },
    telephone: "+34932117942",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "12:00",
        closes: "19:00",
      },
    ],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    sameAs: [
      "https://www.instagram.com/tibidabo_bcn/",
      "https://www.facebook.com/tibidabo",
      "https://twitter.com/tibidabo_bcn",
      "https://www.youtube.com/@tibidabo",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
