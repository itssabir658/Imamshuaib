import type { Metadata } from "next";
import { site } from "@/content/site";
import { tour } from "@/content/tour";
import { TourHero } from "@/components/tour/TourHero";
import { Highlights } from "@/components/tour/Highlights";
import { Journey } from "@/components/tour/Journey";
import { FinalCta } from "@/components/tour/FinalCta";
import { StickyRegister } from "@/components/tour/StickyRegister";

export const metadata: Metadata = {
  title: `${tour.name} — ${tour.dates}`,
  description: tour.hero.standfirst,
  alternates: { canonical: "/al-aqsa" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${tour.name} — with Imam Shuaib`,
    description: tour.hero.standfirst,
    url: `${site.url}/al-aqsa`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tour.name} — with Imam Shuaib`,
    description: tour.hero.standfirst,
  },
};

/**
 * ⚠️ There is no Open Graph image for this route yet, so a share card falls
 * back to the site-wide portrait from the root layout. A tour page is shared
 * far more than it is linked to; a dedicated 1200×630 is worth commissioning
 * alongside the photography.
 */
export default function AlAqsaPage() {
  return (
    <>
      <TourHero />
      <StickyRegister />
      <Highlights />
      <Journey />
      <FinalCta />
    </>
  );
}
