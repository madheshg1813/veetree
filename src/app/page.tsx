import { Collection } from "@/components/Collection";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Ritual } from "@/components/Ritual";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Story } from "@/components/Story";
import { Ticker } from "@/components/Ticker";
import { TrustStrip } from "@/components/TrustStrip";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function HomePage() {
  return (
    <>
      <Ticker />
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Story />
        <Collection />
        <Ritual />
        <CtaBand />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
