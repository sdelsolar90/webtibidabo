import { setRequestLocale } from "next-intl/server"
import HeroSection from "@/components/home/HeroSection"
import QuickBooking from "@/components/home/QuickBooking"
import FeaturedAttractions from "@/components/home/FeaturedAttractions"
import MascotSection from "@/components/home/MascotSection"
import PlanGrid from "@/components/home/PlanGrid"
import TibiClubBanner from "@/components/home/TibiClubBanner"

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <QuickBooking />
      <FeaturedAttractions />
      <MascotSection />
      <PlanGrid />
      <TibiClubBanner />
    </>
  )
}
