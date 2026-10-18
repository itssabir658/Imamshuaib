import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";

/**
 * "What makes this journey different" — the six things he wanted said plainly.
 *
 * A plain <ul>, because that is what it is: an unordered set of claims, none
 * of which depends on the one before it. The Journey section next door is an
 * <ol> for the opposite reason.
 *
 * THE ARABIC IS MARKED, NOT JUST TYPED. Two of the points carry an Arabic
 * honorific mid-sentence. Each gets lang="ar" so a screen reader hands it to
 * the right dictionary instead of spelling it out of the English one — WCAG
 * 3.1.2, the same reason Honorific.tsx exists for the ﷺ ligature — and
 * dir="rtl" so the glyphs order correctly inside a left-to-right line.
 * Neither Gilroy nor Montserrat has these glyphs, so they fall through to the
 * system Arabic face, which sets noticeably small against the Latin around
 * it; the nudge up in size is what keeps the line looking level.
 *
 * Ground is sand-50 so it does not run into the ivory of Highlights above.
 */
export function Different() {
  return (
    <section
      aria-labelledby="different-title"
      className="relative bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-sans text-eyebrow font-semibold text-gold-800 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold-700/50" />
            Why this one
          </p>
          <h2
            id="different-title"
            className="mt-6 text-h2 font-bold text-charcoal"
          >
            {tour.different.title}
          </h2>
        </div>

        <ul className="mt-12 grid gap-x-12 gap-y-6 sm:mt-14 lg:grid-cols-2 lg:gap-y-7">
          {tour.different.points.map((p) => (
            <li
              key={p.lead}
              className="tour-rise flex items-start gap-4 border-t border-sand-300 pt-6"
            >
              <Tick />
              <p className="font-sans text-[1.0625rem]/relaxed text-charcoal-600">
                {p.lead}
                {p.arabic ? (
                  <span
                    lang="ar"
                    dir="rtl"
                    className="text-[1.08em] leading-none"
                  >
                    {p.arabic}
                  </span>
                ) : null}
                {p.tail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Decorative: every item carries one, so it says nothing the list does not. */
function Tick() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-5 shrink-0 text-gold-700"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}
