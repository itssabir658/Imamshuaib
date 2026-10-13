import Image from "next/image";
import { ArrowRight, Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * The home masthead.
 *
 * This replaces "The Board" — a deep-teal strip over a white directory of four
 * programme tiles that lifted across the seam. It worked, but it was three
 * compositions stacked in one fold: an identity chip, a headline block, and a
 * card grid. The brief for this version was simply "simple", so it is type
 * on paper and a photograph — no cards, no tiles, no stacked compositions.
 *
 * The eyebrow and its rule stay full width above the split, so the page still
 * opens on one line of type running the whole measure. The portrait is the
 * same frame the Anchored page uses, carrying the 2rem corner radius that
 * AboutTeaser already gives his other photograph — so the two portraits on
 * this page read as one treatment rather than two. No border: it is the only
 * photograph on an otherwise empty field of paper, and a soft drop shadow
 * lifts it off the stone without drawing a box around it.
 *
 * ORDER. The photo is last in the source, so on a phone the headline is the
 * first thing on screen and the portrait follows the buttons. Putting it
 * above the headline would push the one sentence that says what this is
 * below the fold, on the traffic that matters most.
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

        <div className="mt-12 grid items-center gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 xl:gap-20">
          <div>
            <h1
              id="hero-title"
              className="max-w-[18ch] text-display font-bold text-balance text-charcoal"
            >
              Empowering Muslims worldwide through{" "}
              {/* gold-700 is 4.73:1 on ivory — comfortably past the 3:1 this
                  size needs, and warmer than the gold-800 the small labels
                  use. */}
              <span className="text-gold-700">faith &amp; knowledge</span>
            </h1>

            <p className="mt-10 max-w-[34rem] font-sans text-lead text-charcoal-600">
              Qur&rsquo;anic study, coaching, and counselling &mdash; in plain
              language.
            </p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="sm:px-8"
              >
                Book a session
                <ArrowRight />
              </Button>
              <Button
                href="/services"
                variant="line"
                size="lg"
                className="sm:px-8"
              >
                Explore programs
                <ArrowRight />
              </Button>
            </div>

            <p className="mt-7 flex items-start gap-2.5 font-sans text-sm text-sand-700">
              <StarGlyph />
              No cost to join a Qur&rsquo;an circle
            </p>
          </div>

          {/* priority, because it is above the fold at every breakpoint and
              lazy-loading it would hand the page a late shift on the one
              element people look at first. The source is 637px square, so it
              is never asked to render wider than 26rem — past that it would
              be upscaled. */}
          <Image
            src="/images/imam-shuaib-portrait.png"
            alt="Imam Shuaib, in a grey thobe and cream kufi"
            width={637}
            height={638}
            priority
            sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 22rem, (min-width: 640px) 20rem, 72vw"
            className="w-[72%] max-w-[20rem] rounded-[2rem] object-cover shadow-[0_22px_48px_-26px_rgb(28_26_23/0.45)] lg:w-[22rem] lg:max-w-none xl:w-[26rem]"
          />
        </div>
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
