import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { GlassFilters } from "@/components/ui/GlassFilters";
import "./globals.css";

/**
 * Display and headings — Gilroy (commercial, Fontfabric; licensed by the site
 * owner). Self-hosted from ./fonts as latin-subset WOFF2 (~23 KB a cut, down
 * from ~135 KB per raw TTF), with the OpenType feature set retained because the
 * stat figures use `tnum`.
 *
 * Only the weights the pages actually render are shipped, and that list is a
 * hard contract: `font-synthesis-weight: none` in globals.css means a weight
 * with no matching file silently renders in the nearest one that IS loaded
 * rather than failing visibly. Adding a heading weight means adding a `src`
 * entry in the same commit.
 *   500 — the two pull-quotes
 *   700 — every heading, the stat figures, and the mobile nav
 */
const gilroy = localFont({
  src: [
    { path: "./fonts/Gilroy-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gilroy-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-gilroy",
  // Emits a size-adjusted Arial face so the swap does not shift layout.
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/**
 * Body and UI — Montserrat. No `weight` key, so next/font serves the single
 * variable file covering 100–900; smaller than the 400/500/600 static cuts
 * the components would otherwise need.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Imam Shuaib",
    "Islamic coaching",
    "Qur'an tafsir",
    "relationship counselling",
    "khutbah",
    "Muslim community",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: "/images/imam-shuaib-reading-quran.webp",
        width: 1707,
        height: 2560,
        alt: "Imam Shuaib seated with an open Qur'an",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2426",
  colorScheme: "light",
};

/** schema.org Person + WebSite, per the SEO items in §2 and §7. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}#person`,
      name: site.legalName,
      alternateName: site.name,
      jobTitle: "Imam, educator and counsellor",
      description: site.description,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/images/imam-shuaib-reading-quran.webp`,
      sameAs: [site.social.youtube, site.social.instagram, site.social.tiktok],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${gilroy.variable} ${montserrat.variable}`}
    >
      <body>
        <GlassFilters />
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
