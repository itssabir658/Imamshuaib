import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { Motif } from "./Motif";
import { Label, Rule } from "./Type";

/**
 * "What We'll Experience" — six places, set as an index rather than a grid of
 * cards.
 *
 * The card grid this replaces was the most generic thing on the page: a
 * bordered box per item, each with an icon, a heading and a paragraph, six of
 * them in a 3×2. Here the same content is a ruled index — the numeral and the
 * elevation drawing hang in the margin, the name sits in its own column, the
 * description runs beside it. No boxes, no shadows, no hover lift. It reads
 * like the contents of a catalogue, which is what it is.
 *
 * The descriptions say what each place *is*, not what the visit will include.
 * That is a content decision: the itinerary is not fixed (`itineraryConfirmed`
 * is false), and a tour page that promises a specific visit before it is
 * booked is a page people will hold you to.
 */
export function Places() {
  return (
    <section
      aria-labelledby="experience-title"
      className="bg-ivory pb-20 sm:pb-24 lg:pb-28"
    >
      <Container>
        <Rule />

        <div className="mt-16 flex items-end justify-between gap-8 sm:mt-20">
          <h2
            id="experience-title"
            className="text-h1 font-bold text-balance text-charcoal"
          >
            What We&rsquo;ll Experience
          </h2>
          <Label className="hidden shrink-0 pb-2 sm:block">Six places</Label>
        </div>

        <ol className="mt-12 sm:mt-16">
          {tour.highlights.map((h, i) => (
            <li
              key={h.title}
              className="tour-rise grid gap-x-10 gap-y-4 border-t border-sand-400 py-9 sm:py-10 lg:grid-cols-[4.5rem_minmax(0,17rem)_minmax(0,1fr)]"
            >
              {/* The margin: the index number, with the elevation drawing
                  under it. Both are aria-hidden — the ordered list already
                  carries the sequence, and the drawing repeats the name. */}
              <div className="flex items-center gap-5 lg:block">
                <span
                  aria-hidden="true"
                  // sand-500 rather than sand-400: 3.18:1 on ivory, which
                  // clears the 3:1 large-text bar at 32px bold. sand-400 is
                  // 2.3:1 and would be a numeral somebody has to squint at,
                  // aria-hidden or not.
                  className="font-display text-[2rem] leading-none font-bold tabular-nums text-sand-500"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Motif
                  name={h.motif}
                  className="size-9 text-sand-500 lg:mt-5"
                />
              </div>

              <div>
                <h3 className="text-h3 font-bold text-charcoal">{h.title}</h3>
                <Label className="mt-2.5">{h.meta}</Label>
              </div>

              <p className="max-w-[32rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {h.body}
              </p>
            </li>
          ))}
        </ol>

        {!tour.itineraryConfirmed ? (
          <p className="max-w-2xl border-t border-sand-400 pt-8 font-sans text-sm text-sand-700">
            <span aria-hidden="true">⚠️ </span>
            These are the places the journey is planned around. The final
            itinerary is confirmed with everyone who registers before any
            booking is taken.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
