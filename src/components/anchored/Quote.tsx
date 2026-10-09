import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Khatim } from "./Type";

/**
 * A quotation, as the copy document asks: "Use one or two as full-width
 * design breaks between sections."
 *
 * `used: true` in `anchored.quotes` picks which; swapping one for another is
 * a one-line edit. ⚠️ Imam Shuaib has said he will confirm final wording
 * before publication.
 *
 * Marked up as a real figure/blockquote/figcaption rather than styled
 * paragraphs, so the attribution is tied to the quotation rather than merely
 * sitting under it.
 *
 * Split into a bare figure and a section wrapper because one of the two is
 * set beside the promo video rather than in a band of its own — footage of
 * the land and "The believers are but brothers" on one dark ground is a
 * composed spread, where two separate stripes would just be two stripes.
 */
export function QuoteFigure({
  index,
  align = "center",
  className,
}: {
  index: number;
  align?: "center" | "start";
  className?: string;
}) {
  const quote = anchored.quotes.filter((q) => q.used)[index];
  if (!quote) return null;

  const centred = align === "center";

  return (
    <figure className={[centred ? "text-center" : "", className].join(" ")}>
      <Khatim
        aria-hidden="true"
        className={`size-4 text-gold-400 ${centred ? "mx-auto" : ""}`}
      />

      <blockquote className="mt-8">
        <p className="font-display text-[clamp(1.625rem,1.1rem+2.1vw,2.875rem)]/[1.18] font-medium text-balance text-ivory">
          &ldquo;{quote.text}&rdquo;
        </p>
      </blockquote>

      <figcaption className="mt-7 font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] text-sand-300 uppercase">
        {quote.source}
      </figcaption>
    </figure>
  );
}

/** The standalone break. */
export function Quote({ index }: { index: number }) {
  if (!anchored.quotes.filter((q) => q.used)[index]) return null;

  return (
    <section className="bg-charcoal py-24 sm:py-28 lg:py-32">
      <Container>
        <QuoteFigure index={index} className="anchored-rise mx-auto max-w-3xl" />
      </Container>
    </section>
  );
}
