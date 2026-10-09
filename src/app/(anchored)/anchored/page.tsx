import type { Metadata } from "next";
import { site } from "@/content/site";
import { anchored } from "@/content/anchored";
import { Hero } from "@/components/anchored/Hero";
import { PromoVideo } from "@/components/anchored/PromoVideo";
import { StickyReserve } from "@/components/anchored/StickyReserve";
import { Opening } from "@/components/anchored/Opening";
import { Quote } from "@/components/anchored/Quote";
import { Promises } from "@/components/anchored/Promises";
import { TheWork } from "@/components/anchored/TheWork";
import { Property } from "@/components/anchored/Property";
import { Weekend } from "@/components/anchored/Weekend";
import { WhoFor, Host } from "@/components/anchored/WhoAndHost";
import { Investment } from "@/components/anchored/Investment";
import { Faq } from "@/components/anchored/Faq";
import { Closing } from "@/components/anchored/Closing";

export const metadata: Metadata = {
  title: `${anchored.name} — ${anchored.kicker}, ${anchored.dates}`,
  description: `${anchored.hero.line} ${anchored.hero.scale} ${anchored.place}.`,
  alternates: { canonical: "/anchored" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${anchored.name} — ${anchored.kicker}`,
    description: `${anchored.hero.line} ${anchored.dates}, ${anchored.place}.`,
    url: `${site.url}/anchored`,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${anchored.name} — ${anchored.kicker}`,
    description: anchored.hero.line,
  },
};

/**
 * schema.org Event.
 *
 * Deliberately WITHOUT `offers`. The copy prices the retreat at $495 and $595
 * but never names a currency, and an Event offer needs `priceCurrency` as a
 * hard ISO code. Waterdown plus Interac e-transfer makes CAD a near-certainty
 * and a near-certainty is not good enough to publish as machine-readable
 * structured data that search engines will quote back at people. Add `offers`
 * once the currency is confirmed.
 *
 * The dates ARE safe: they are written out in the copy, and the ISO forms
 * below say nothing the page does not already say. No times — see the
 * no-prayer-times instruction; the event is given as whole days.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${anchored.name} — ${anchored.kicker}`,
  description: anchored.hero.line,
  startDate: "2026-11-06",
  endDate: "2026-11-08",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  maximumAttendeeCapacity: anchored.seatsTotal,
  url: `${site.url}/anchored`,
  location: {
    "@type": "Place",
    name: "Private countryside property",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waterdown",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  performer: { "@type": "Person", name: site.legalName },
  organizer: { "@type": "Person", name: site.legalName, url: site.url },
};

/**
 * ⚠️ No Open Graph image yet, so a share card falls back to the site-wide
 * portrait from the root layout. This page is shared far more than it is
 * linked to — the brief says the traffic is WhatsApp and Instagram — so a
 * dedicated 1200×630 is worth making. A still from the promo video would do.
 */
export default function AnchoredPage() {
  return (
    <>
      <Hero />
      {/* "Promo video goes directly under the hero section." — the brief. */}
      <PromoVideo />
      <StickyReserve />

      <Opening />
      <Promises />
      <TheWork />
      <Property />
      <Weekend />

      <Quote index={1} />

      <WhoFor />
      <Host />
      <Investment />
      <Faq />
      <Closing />

      <script
        type="application/ld+json"
        // Static, author-controlled JSON — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
