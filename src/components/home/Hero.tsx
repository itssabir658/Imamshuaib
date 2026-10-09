import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * The home masthead.
 *
 * This replaces "The Board" — a deep-teal strip over a white directory of four
 * programme tiles that lifted across the seam. It worked, but it was three
 * compositions stacked in one fold: an identity chip, a headline block, and a
 * card grid. The brief for this version was simply "simple", so it is one
 * column of type on paper and nothing else.
 *
 * The four tiles are not lost. `ServicesTeaser` further down the page already
 * lists the programmes properly, with room to describe them — which is what
 * the tiles were doing badly in a space that had no room.
 *
 * Ground is ivory, the same warm stone as /al-aqsa. That is why "/" is no
 * longer in Header's DARK_HERO_ROUTES: the header floats over paper now, so
 * it keeps its dark-on-light palette and the logo stays its own colour.
 *
 * The `-mt-18` pulls the section up under the sticky header, and the top
 * padding puts it back — so the ivory runs to the very top of the page
 * instead of starting below an 18-unit band of canvas.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-18 bg-ivory pt-30 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <Container>
        <p className="font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] text-sand-700 uppercase">
          The Accessible Imam
        </p>

        <div aria-hidden="true" className="mt-6 h-px w-full bg-sand-400" />

        <h1
          id="hero-title"
          className="mt-12 max-w-[18ch] text-display font-bold text-balance text-charcoal lg:mt-16"
        >
          Empowering Muslims worldwide through{" "}
          {/* gold-700 is 4.73:1 on ivory — comfortably past the 3:1 this size
              needs, and warmer than the gold-800 the small labels use. */}
          <span className="text-gold-700">faith &amp; knowledge</span>
        </h1>

        <p className="mt-10 max-w-[34rem] font-sans text-lead text-charcoal-600">
          Qur&rsquo;anic study, coaching, and counselling &mdash; in plain
          language.
        </p>

        <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href="/contact" variant="primary" size="lg" className="sm:px-8">
            Book a session
            <ArrowRight />
          </Button>
          <Button href="/services" variant="line" size="lg" className="sm:px-8">
            Explore programs
            <ArrowRight />
          </Button>
        </div>

        <p className="mt-7 flex items-start gap-2.5 font-sans text-sm text-sand-700">
          <StarGlyph />
          No cost to join a Qur&rsquo;an circle
        </p>
      </Container>
    </section>
  );
}

function StarGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="mt-0.5 size-4 shrink-0 text-gold-700"
    >
      <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4 4.2 13.4l.7-4.3-3.1-3 4.3-.6L8 1.6Z" />
    </svg>
  );
}
