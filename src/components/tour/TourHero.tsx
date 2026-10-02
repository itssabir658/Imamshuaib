import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { RegisterNiche } from "./RegisterNiche";
import { Label, Rule } from "./Type";

/**
 * The masthead.
 *
 * There is no hero background. That is the design, not an omission: the page
 * is an invitation, the ground is paper, and the only drawn thing on it is the
 * niche holding the QR. The previous version put a tiled geometric pattern
 * behind the type and a silhouette skyline under it — both are the house style
 * of every generated landing page, and neither was carrying any meaning.
 *
 * What does the work instead is scale and rule. An 11px letterspaced dateline
 * sits directly above a headline six times its size; the two are separated by
 * a hairline. That jump is the whole effect, and it is the one thing a stock
 * section layout never does.
 *
 * Reading order matches visual order at every width — dateline, headline,
 * dates, standfirst, summary, then the niche. Nothing is reordered with CSS,
 * so the keyboard reaches Register exactly where the eye finds it. On desktop
 * the niche takes its own column; that is grid placement, not a reorder.
 */
export function TourHero() {
  return (
    <section aria-labelledby="tour-title" className="bg-ivory pt-28 sm:pt-32">
      <Container>
        <div className="flex items-baseline justify-between gap-6">
          <Label>Al-Quds · Jerusalem</Label>
          {/* Hidden on a phone: at 11px with 0.22em of tracking it wraps to
              two ragged lines, and the logo above it already says whose page
              this is. */}
          <Label className="hidden text-right sm:block">With Imam Shuaib</Label>
        </div>
        <Rule fleuron={false} className="mt-5" />

        <div className="grid gap-16 pt-14 pb-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20 lg:pt-20 lg:pb-28">
          <div>
            <h1
              id="tour-title"
              className="text-mega font-bold text-balance text-charcoal"
            >
              {/* The {" "} is load-bearing. Two block spans with nothing
                  between them concatenate to "Journey toAl-Aqsa" in the
                  accessible name; the space collapses visually and fixes it. */}
              <span className="block">Journey to</span>{" "}
              <span className="block">Al-Aqsa</span>
            </h1>

            {/* The dates as a dateline — set into a break in a rule, the way a
                printed invitation sets them, rather than inside a pill. */}
            <p className="mt-11 flex items-center gap-5">
              <span aria-hidden="true" className="h-px w-10 shrink-0 bg-sand-500" />
              <span className="font-sans text-sm font-semibold tracking-[0.18em] text-charcoal uppercase">
                {tour.dates}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-sand-400" />
            </p>

            <p className="mt-12 max-w-[34rem] font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)]/[1.35] font-medium text-charcoal">
              {tour.hero.standfirst}
            </p>

            <p className="mt-7 max-w-[30rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600">
              {tour.hero.summary}
            </p>
          </div>

          <RegisterNiche
            headingId="register-hero"
            className="lg:sticky lg:top-12 lg:justify-self-end"
          />
        </div>
      </Container>
    </section>
  );
}
