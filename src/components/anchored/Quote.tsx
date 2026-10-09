import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Khatim } from "./Type";

/**
 * A full-width break between sections, as the copy document asks for: "Use one
 * or two as full-width design breaks between sections."
 *
 * Inverted, short, and carrying nothing but the quote — the page is long and
 * these are the two places it is allowed to stop talking. `used: true` in
 * `anchored.quotes` picks which; swapping one for another is a one-line edit.
 *
 * ⚠️ Imam Shuaib has said he will confirm final wording before publication.
 *
 * Marked up as a real <figure>/<blockquote>/<figcaption> rather than styled
 * paragraphs, so the attribution is tied to the quotation rather than merely
 * sitting under it.
 */
export function Quote({ index }: { index: number }) {
  const used = anchored.quotes.filter((q) => q.used);
  const quote = used[index];
  if (!quote) return null;

  return (
    <section className="bg-charcoal py-20 sm:py-24">
      <Container>
        <figure className="anchored-rise mx-auto max-w-3xl text-center">
          <Khatim aria-hidden="true" className="mx-auto size-4 text-gold-400" />

          <blockquote className="mt-8">
            <p className="font-display text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)]/[1.22] font-medium text-balance text-ivory">
              &ldquo;{quote.text}&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-7 font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] text-sand-300 uppercase">
            {quote.source}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
