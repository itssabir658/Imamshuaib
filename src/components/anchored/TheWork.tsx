import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Rule } from "./Type";

/**
 * The four teaching sessions, set as a ruled index rather than a grid of
 * cards: numeral in the margin, title in its own column, body beside it, a
 * hairline between each. A catalogue contents page.
 *
 * The numerals are `aria-hidden` — the ordered list already carries the
 * sequence — and sand-500 rather than anything lighter, which is 3.18:1 on
 * ivory and clears the 3:1 large-text bar at 32px bold. A numeral a reader
 * has to squint at is not ornament, it is a mistake.
 *
 * sr-only heading: see the note in Promises.tsx. The document's "SECTION 3:
 * THE WORK" is a label for the designer, not page copy.
 */
export function TheWork() {
  return (
    <section aria-labelledby="work-title" className="bg-ivory pb-20 sm:pb-24 lg:pb-28">
      <h2 id="work-title" className="sr-only">
        The work
      </h2>

      <Container>
        <Rule className="mb-4" />

        <ol>
          {anchored.work.map((w, i) => (
            <li
              key={w.title}
              className="anchored-rise group -mx-4 grid gap-x-10 gap-y-4 border-t border-sand-400 px-4 py-9 transition-colors duration-500 ease-ios first:border-t-0 hover:bg-sand-50 sm:py-10 lg:grid-cols-[4.5rem_minmax(0,19rem)_minmax(0,1fr)]"
            >
              <span
                aria-hidden="true"
                className="font-display text-[2rem] leading-none font-bold tabular-nums text-sand-500 transition-[color,transform] duration-500 ease-ios group-hover:text-gold-800 motion-safe:group-hover:translate-x-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-h3 font-bold text-balance text-charcoal">
                {w.title}
              </h3>

              <p className="max-w-[32rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {w.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
