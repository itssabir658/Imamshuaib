import type { Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Container } from "@/components/ui/Container";

/**
 * The Al-Aqsa landing page runs outside the site's main chrome.
 *
 * That is the whole reason this route group exists. The page is a single
 * invitation with one thing to do on it; a sticky header offering About,
 * Programs, Contact and Donate above the fold competes with the only action
 * that matters. What it keeps is the logo — a page asking people to travel
 * somewhere has to say plainly whose page it is — and a route back to the
 * site, which lives in the footer where it belongs.
 *
 * Cormorant Garamond is loaded here rather than in the root layout, so it is
 * requested on this route only and costs nothing on the other nine. Both
 * weights used on the page are declared: `font-synthesis-weight: none` is set
 * globally, so a weight with no file renders in the nearest one that has
 * loaded instead of failing where you would see it.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-cormorant",
});

/** The browser chrome should match the page, not the teal site behind it. */
export const viewport: Viewport = {
  themeColor: "#1c1a17",
  colorScheme: "light",
};

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} font-scope-tour relative bg-ivory`}>
      <SkipLink />

      {/* Floats over the charcoal hero as a sibling of it, so it inherits the
          page's light ground and has to name its own focus ring — see the
          note beside --focus-ring in globals.css. */}
      <header className="absolute inset-x-0 top-0 z-20 pt-6 [--focus-ring:var(--color-gold-400)] sm:pt-8">
        <Container className="flex items-center justify-between gap-4">
          <Logo onDark />
          <Link
            href="/"
            className="rounded-pill font-sans text-xs font-semibold tracking-[0.1em] text-sand-300 uppercase transition-colors duration-300 hover:text-ivory"
          >
            imamshuaib.com
          </Link>
        </Container>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="bg-charcoal py-12">
        <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-sans text-sm text-sand-300">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-sans text-sm">
              {[
                { href: "/", label: "Main site" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sand-300 underline-offset-4 transition-colors duration-300 hover:text-ivory hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
