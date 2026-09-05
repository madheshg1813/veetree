import { BestSellers } from "@/components/home/BestSellers"
import { CategoryGrid } from "@/components/CategoryGrid"
import { ComboStrip } from "@/components/home/ComboStrip"
import { ConcernGrid } from "@/components/home/ConcernGrid"
import { HeroSlider } from "@/components/home/HeroSlider"
import { HomeSearch } from "@/components/home/HomeSearch"
import { ReelsStrip } from "@/components/home/ReelsStrip"
import { Reviews } from "@/components/Reviews"
import { bestSellersByTab, searchIndex } from "@/lib/home/shopItems"
import { comboItems } from "@/lib/home/comboItems"
import { latestReels } from "@/lib/home/reels"
import { liveProducts } from "@/lib/catalog/live"
import { SLIDES } from "@/lib/home/slides"
import { CtaBand } from "@/components/CtaBand"
import { Ritual } from "@/components/Ritual"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { Ticker } from "@/components/Ticker"
import { TrustStrip } from "@/components/TrustStrip"
import { WhatsAppFab } from "@/components/WhatsAppFab"

/**
 * Home page, built to the client's layout: search, slider, then bestsellers
 * behind a category row. The editorial sections she did not sketch continue
 * below in the order they were already in.
 */
export default async function HomePage() {
  // Fetched in parallel: the reels call goes to Instagram and should not sit
  // behind the catalogue.
  const [products, reels] = await Promise.all([liveProducts(), latestReels(3)])

  return (
    <>
      <Ticker />
      <SiteHeader />
      <main>
        <HomeSearch items={searchIndex(products)} />
        <HeroSlider slides={SLIDES} />
        <BestSellers groups={bestSellersByTab(products)} />

        <CategoryGrid products={products} />
        <ComboStrip items={comboItems(products)} />
        <ConcernGrid />
        <TrustStrip />
        <Reviews />
        <ReelsStrip reels={reels} />
        <Ritual />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  )
}
