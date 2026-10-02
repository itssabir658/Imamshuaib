import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button, TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * A genuine 404 now that every route in the sitemap exists.
 *
 * Next renders the root not-found inside the ROOT layout, not inside the
 * (site) group, so it has to carry its own header and footer. Dropping them
 * would leave a stranded page with no way back — which is the one thing a 404
 * must never be.
 */
export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Section tone="canvas" className="py-24 sm:py-32">
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow className="justify-center">Not found</Eyebrow>
            <h1 className="mt-5 text-h1 font-bold">
              We could not find that page
            </h1>
            <p className="mt-5 text-lead">
              The link may be out of date, or the address may have a typo in
              it. The programmes and everything else are all still here.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/" size="lg">
                Back to home
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Browse the programs
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted">
              Looking for something specific?{" "}
              <TextLink href="/contact">Get in touch</TextLink>
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
