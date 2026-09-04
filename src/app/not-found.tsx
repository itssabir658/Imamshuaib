import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button, TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * The rest of the sitemap in §4 is scaffolded but not built yet, so links into
 * it land here rather than on a bare 404.
 */
export default function NotFound() {
  return (
    <Section tone="canvas" className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Eyebrow className="justify-center">Coming soon</Eyebrow>
        <h1 className="mt-5 text-h1 font-bold">
          This page is still being built
        </h1>
        <p className="mt-5 text-lead">
          We are rebuilding imamshuaib.com section by section. The home page is
          live; sermons, articles, events and the programme pages are on the
          way.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/donate" variant="secondary" size="lg">
            Support the work
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted">
          Looking for something specific?{" "}
          <TextLink href="/contact">Get in touch</TextLink>
        </p>
      </div>
    </Section>
  );
}
