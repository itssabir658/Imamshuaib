import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { RegisterCard } from "./RegisterCard";
import { Skyline } from "./Skyline";

/**
 * The hero, and deliberately the bulk of the page.
 *
 * Reading order is the same as visual order at every width: eyebrow, title,
 * dates, standfirst, summary, then the card. Nothing is reordered with CSS,
 * so a keyboard reaches the Register link exactly where the eye finds it.
 * On desktop the card moves to its own column; that is a grid placement, not
 * a reorder, and the DOM is untouched.
 *
 * The ground is flat charcoal. No wash, no gradient — the depth comes from
 * the three tonal layers of the skyline and from the geometry behind the
 * type, which was the brief's "cinematic" read without the colour bleed the
 * owner asked to be rid of elsewhere on the site.
 */
export function TourHero() {
  return (
    <section
      aria-labelledby="tour-title"
      className="relative isolate overflow-hidden bg-charcoal pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32"
    >
      <Ground />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-sans text-eyebrow font-semibold text-gold-400 uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold-400/50" />
              Al-Quds · with Imam Shuaib
            </p>

            <h1
              id="tour-title"
              className="mt-7 font-tour text-tour-display font-normal text-ivory"
            >
              {tour.hero.headline}
            </h1>

            <p className="mt-7">
              <span className="inline-flex items-center gap-3 rounded-pill border border-sand-500/45 px-5 py-2.5">
                <CalendarGlyph />
                <span className="font-sans text-sm font-semibold tracking-[0.1em] text-gold-400 uppercase">
                  {tour.dates}
                </span>
              </span>
            </p>

            <p className="mt-8 max-w-xl font-tour text-[1.375rem]/[1.5] text-sand-200 sm:text-[1.5rem]/[1.45]">
              {tour.hero.standfirst}
            </p>

            <p className="mt-6 max-w-lg font-sans text-[0.9375rem]/relaxed text-sand-300">
              {tour.hero.summary}
            </p>
          </div>

          <RegisterCard headingId="register-hero" className="lg:sticky lg:top-10" />
        </div>
      </Container>
    </section>
  );
}

/** Geometry behind the type, and the horizon under it. Ornament only. */
function Ground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="pattern-khatim-lg absolute inset-0 text-sand-300/[0.05]" />
      <Skyline className="absolute inset-x-0 bottom-0 h-56 w-full text-sand-300 sm:h-72 lg:h-80" />
      {/* A hairline where the masonry meets the section below, so the two
          bands read as joined rather than stacked. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-sand-500/25" />
    </div>
  );
}

function CalendarGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      className="size-4 shrink-0 text-sand-400"
    >
      <rect x="2.2" y="3.4" width="11.6" height="10.4" rx="1.6" />
      <path d="M2.2 6.6h11.6M5.4 2.2v2.4M10.6 2.2v2.4" />
    </svg>
  );
}
