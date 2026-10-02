import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * Explore → Reflect → Learn → Experience.
 *
 * Set as a measured line rather than a timeline. Each item carries its own top
 * rule and there is no column gap, so on a wide screen the four rules meet and
 * read as one continuous datum across the page, with a tick dropped at each
 * station — a dimension line off an elevation drawing. The dotted timeline it
 * replaces was doing the same job with the visual language of a project plan.
 *
 * An ordered list, because the steps are a sequence and that is information a
 * screen reader should get for free. The rules and ticks are pseudo-content,
 * so nothing decorative enters the tree.
 */
export function Journey() {
  return (
    <section
      aria-labelledby="journey-title"
      className="bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="flex items-end justify-between gap-8">
          <h2
            id="journey-title"
            className="text-h1 font-bold text-balance text-charcoal"
          >
            The Journey
          </h2>
          <Label className="hidden shrink-0 pb-2 sm:block">How it unfolds</Label>
        </div>

        <ol className="mt-14 grid lg:mt-20 lg:grid-cols-4">
          {tour.journey.map((s, i) => (
            <li
              key={s.step}
              className="tour-rise relative border-t border-sand-500/60 pt-7 pb-9 last:pb-0 lg:pt-8 lg:pr-10 lg:pb-0"
            >
              {/* The tick where this station meets the datum. */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-2.5 w-px bg-sand-500"
              />
              <span
                aria-hidden="true"
                className="font-display text-sm font-bold tracking-[0.12em] tabular-nums text-sand-700"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-h3 font-bold text-charcoal">{s.step}</h3>
              <p className="mt-3 max-w-sm font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
