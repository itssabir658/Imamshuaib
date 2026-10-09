import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, Reserve, Rule, SeatCount } from "./Type";

/**
 * The masthead.
 *
 * There is no background image and no tinted band. The ground is paper and the
 * work is done by scale: an 11px letterspaced dateline sits directly above a
 * word set six times its size, separated by a hairline. The copy for this page
 * is quiet and declarative — "For the man who has been strong for everyone
 * else" — and quiet copy inside a loud composition reads as neither.
 *
 * The title is lowercase in the DOM and uppercased in CSS. Screen readers
 * announce the DOM text, so this gets the engraved caps without "A-N-C-H-O-R-
 * E-D" being spelled out by anything that reads capitals literally.
 *
 * Order follows the copy document exactly: title, then "A Men's Retreat",
 * then the line, then the practicalities. Reading order matches visual order
 * at every width; the desktop two-column split is grid placement, not a
 * reorder, so the keyboard reaches Reserve where the eye finds it.
 */
export function Hero() {
  return (
    <section aria-labelledby="anchored-title" className="bg-ivory pt-28 sm:pt-32">
      <Container>
        <div className="flex items-baseline justify-between gap-6">
          <Label>{anchored.kicker}</Label>
          <Label className="hidden text-right sm:block">
            Waterdown, Ontario
          </Label>
        </div>
        <Rule fleuron={false} className="mt-5" />

        <div className="pt-14 pb-16 lg:pt-20 lg:pb-20">
          <h1
            id="anchored-title"
            // Caps want less negative tracking than the mega token sets for
            // mixed case — capitals have no descenders or narrow bowls to
            // close up, so -0.038em jams them together.
            className="text-mega font-bold tracking-[-0.015em] text-charcoal uppercase"
          >
            {anchored.hero.headline}
          </h1>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-20">
            <div>
              <p className="max-w-[26rem] font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)]/[1.2] font-medium text-balance text-charcoal">
                {anchored.hero.line}
              </p>

              {/* The dates as a dateline, set into a break in a rule — the way
                  a printed invitation sets them, not inside a pill. */}
              <p className="mt-10 flex items-center gap-5">
                <span
                  aria-hidden="true"
                  className="h-px w-10 shrink-0 bg-sand-500"
                />
                <span className="font-sans text-sm font-semibold tracking-[0.16em] text-charcoal uppercase">
                  {anchored.dates}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-sand-400" />
              </p>

              <p className="mt-5 font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {anchored.place}
              </p>
            </div>

            <div className="lg:pt-2">
              <p className="font-display text-xl font-bold text-charcoal">
                {anchored.hero.scale}
              </p>

              <Reserve className="mt-8 w-full sm:w-auto lg:w-full">
                {anchored.hero.cta}
              </Reserve>

              <SeatCount className="mt-6" />

              <p className="mt-3 font-sans text-sm text-charcoal-600">
                {anchored.hero.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
