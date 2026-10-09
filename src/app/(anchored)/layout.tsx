import type { Viewport } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { SkipLink } from "@/components/layout/SkipLink";
import { Container } from "@/components/ui/Container";

/**
 * Chrome for the Anchored landing page.
 *
 * Its own route group, outside the site's header and footer, for the same
 * reason /al-aqsa has one: this is a single page with one thing to do on it,
 * and most of its traffic arrives from a WhatsApp or Instagram link rather
 * than from the site. A nav bar offering eight other destinations above the
 * fold competes with the only action that matters.
 *
 * Separate from the (tour) group rather than shared with it because the two
 * pages sit on opposite grounds — Al-Aqsa's masthead is dark, this one is
 * paper — and a layout cannot take a prop. If a third landing page appears,
 * factor then.
 *
 * ⚠️ By instruction: no Guidance for Generations branding, logo or charity
 * registration anywhere on this page. It carries Imam Shuaib's mark only.
 */

/** Browser chrome matches the paper this page is printed on. */
export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  colorScheme: "light",
};

export default function AnchoredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-ivory">
      <SkipLink />

      {/* Reading progress. This page is around 9,000px on a phone and has no
          navigation, so the only orientation on offer is the scrollbar — and
          on a phone that is a hint that fades. Scroll-driven CSS, no JS; it
          removes itself entirely where scroll timelines are unsupported,
          because a progress bar stuck at zero is worse than none. */}
      <div
        aria-hidden="true"
        className="anchored-progress pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-gold-500"
      />

      <header className="absolute inset-x-0 top-0 z-20 pt-6 sm:pt-8">
        <Container className="flex items-center justify-between gap-4">
          <Logo />
          <Link
            href="/"
            className="font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-sand-700 uppercase transition-colors duration-300 hover:text-charcoal"
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
