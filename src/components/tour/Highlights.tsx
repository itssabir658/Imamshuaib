import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { Motif } from "./Motif";

/**
 * "What We'll Experience" — six places, one short paragraph each.
 *
 * Each description says what the place *is*, not what the visit will include.
 * That is a content decision, not a writing one: the itinerary is not fixed
 * yet (`tour.itineraryConfirmed`), and a tour page that promises a specific
 * visit before it is booked is a page people will hold you to. The note under
 * the grid says so plainly rather than burying it.
 */
export function Highlights() {
  return (
    <section
      aria-labelledby="experience-title"
      className="relative bg-ivory py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-sans text-eyebrow font-semibold text-gold-800 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-sand-400" />
            The itinerary in outline
          </p>
          <h2
            id="experience-title"
            className="mt-6 font-tour text-tour-h2 font-normal text-charcoal"
          >
            What We&rsquo;ll Experience
          </h2>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-sand-200 sm:grid-cols-2 lg:grid-cols-3">
          {tour.highlights.map((h) => (
            <li
              key={h.title}
              className="tour-rise group bg-ivory p-8 transition-colors duration-500 ease-ios hover:bg-sand-50 sm:p-9"
            >
              <Motif
                name={h.motif}
                className="size-8 text-sand-700 transition-colors duration-500 ease-ios group-hover:text-charcoal"
              />
              <p className="mt-6 font-sans text-eyebrow font-semibold tracking-[0.12em] text-sand-700 uppercase">
                {h.meta}
              </p>
              <h3 className="mt-2.5 font-tour text-tour-h3 font-medium text-charcoal">
                {h.title}
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {h.body}
              </p>
            </li>
          ))}
        </ul>

        {!tour.itineraryConfirmed ? (
          <p className="mt-8 max-w-2xl font-sans text-sm text-sand-700">
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
