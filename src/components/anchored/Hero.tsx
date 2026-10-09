import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, Reserve, SeatCount } from "./Type";

/**
 * The masthead, as a split rather than a stack.
 *
 * The previous version was a centred document: label, rule, headline, two
 * tidy columns, all on one ground. It was calm and it was anonymous. This one
 * is cut in two — paper on the left carrying the name at the largest size the
 * page has, and a full-bleed charcoal panel on the right carrying everything
 * transactional. The split does the work a photograph would normally do: it
 * gives the composition a shape you can recognise from across a room.
 *
 * The panel bleeds to the viewport edge with a pseudo-element anchored to the
 * column's own left edge, rather than a percentage-width box positioned
 * against the section. A percentage box drifts relative to the centred
 * container as the viewport changes, and at around 1024px it lands five
 * pixels from the text. Hanging the bleed off the column means the seam is
 * exactly where the grid says it is, at every width.
 *
 * Below lg the panel becomes a full-width block under the title, which is the
 * right order on a phone anyway: name, then what it costs you.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="anchored-title"
      className="relative isolate overflow-hidden bg-ivory"
    >
      <Container>
        <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_23rem]">
          {/* Paper side */}
          <div className="pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pr-20 lg:pb-32">
            <Label>{anchored.kicker}</Label>

            <h1
              id="anchored-title"
              // Caps want less negative tracking than the mega token sets for
              // mixed case — capitals have no descenders or narrow bowls to
              // close up, so -0.038em jams them together.
              className="mt-10 text-mega font-bold tracking-[-0.015em] text-charcoal uppercase"
            >
              {anchored.hero.headline}
            </h1>

            <p className="mt-10 max-w-[24rem] font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.125rem)]/[1.2] font-medium text-balance text-charcoal">
              {anchored.hero.line}
            </p>
          </div>

          {/* Ink side. The bleed runs right off the viewport from this
              column's own left edge, so the seam sits on the grid line. */}
          <div
            className={[
              "relative isolate -mx-5 mt-4 px-5 py-12 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-0 lg:px-10 lg:py-36",
              "bg-charcoal",
              "lg:after:absolute lg:after:inset-y-0 lg:after:left-full lg:after:-z-10 lg:after:w-[50vw] lg:after:bg-charcoal",
            ].join(" ")}
          >
            <Label tone="paper">{anchored.dates}</Label>

            <p className="mt-6 font-display text-xl/snug font-bold text-ivory">
              {anchored.hero.scale}
            </p>

            <p className="mt-4 font-sans text-sm/relaxed text-sand-300">
              {anchored.place}
            </p>

            <Reserve tone="paper" className="mt-10 w-full">
              {anchored.hero.cta}
            </Reserve>

            <SeatCount tone="paper" className="mt-7" />

            <p className="mt-3 font-sans text-sm text-sand-300">
              {anchored.hero.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
