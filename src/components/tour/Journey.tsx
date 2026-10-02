import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";

/**
 * Explore → Reflect → Learn → Experience.
 *
 * An ordered list, because the steps are a sequence and that is information a
 * screen reader should get for free. The connecting rule and the numbered
 * nodes are drawn with pseudo-elements on the list items, so there is no
 * decorative markup in the tree to read out.
 *
 * It runs horizontally from `lg` and vertically below that. Same DOM either
 * way — only the grid flow and the direction of the rule change.
 */
export function Journey() {
  return (
    <section
      aria-labelledby="journey-title"
      className="relative isolate overflow-hidden bg-charcoal py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-khatim-lg pointer-events-none absolute inset-0 -z-10 text-sand-300/[0.04]"
      />

      <Container>
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-sans text-eyebrow font-semibold text-gold-400 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-gold-400/50" />
            How it unfolds
          </p>
          <h2
            id="journey-title"
            className="mt-6 font-tour text-tour-h2 font-normal text-ivory"
          >
            The Journey
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {tour.journey.map((s, i) => (
            <li key={s.step} className="tour-rise relative lg:pt-12">
              {/* The rule, and the node sitting on it. Vertical below lg,
                  horizontal from lg — and stopped short on the last item so
                  the line does not run off the end of the sequence. */}
              <span
                aria-hidden="true"
                className={[
                  "absolute bg-sand-500/30",
                  // Spans its own item plus the gap to the next one, so
                  // the sequence reads as one line rather than four dashes.
                  "top-0 left-[0.6875rem] h-[calc(100%+2.5rem)] w-px",
                  "lg:top-[0.6875rem] lg:left-0 lg:h-px lg:w-full",
                  i === tour.journey.length - 1 ? "hidden" : "",
                ].join(" ")}
              />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 size-[1.375rem] rounded-full border border-sand-500/60 bg-charcoal"
              />
              <span
                aria-hidden="true"
                className="absolute top-[0.4375rem] left-[0.4375rem] size-2 rounded-full bg-gold-400"
              />

              <div className="pl-10 lg:pl-0">
                <h3 className="font-tour text-tour-h3 font-medium text-ivory">
                  {/* The list is already ordered, so the figure is a visual
                      marker and nothing more. Left in the heading it reads
                      out as "zero-one Explore". */}
                  <span
                    aria-hidden="true"
                    className="mr-3 font-sans text-sm font-semibold tracking-[0.12em] text-gold-400 tabular-nums"
                  >
                    0{i + 1}
                  </span>
                  {s.step}
                </h3>
                <p className="mt-3 max-w-sm font-sans text-[0.9375rem]/relaxed text-sand-300">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
