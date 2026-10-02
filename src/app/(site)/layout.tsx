import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

/**
 * The chrome every page of the site proper wears: skip link, sticky header,
 * main landmark, footer.
 *
 * This used to live in the root layout. It moved down here when the Al-Aqsa
 * landing page was added, because that page is a single self-contained
 * invitation and the full navigation works against it — a visitor who came to
 * register should not be offered eight other destinations above the fold.
 * Nothing about the site pages changed; they render exactly as before.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
