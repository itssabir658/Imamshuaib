import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * The land. Five lines, set large and ruled, with nothing else on the band.
 *
 * No icons. A horse, a bow, a fire and a hot tub rendered as four line glyphs
 * is the exact move that makes a page look assembled rather than written —
 * and these five lines are already the most concrete writing on the page.
 * Scale carries them.
 */
export function Property() {
  return (
    <section
      aria-labelledby="property-title"
      className="bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <h2 id="property-title" className="sr-only">
        The property
      </h2>

      <Container>
        <Label className="mb-10">Waterdown, Ontario</Label>

        <ul className="max-w-3xl">
          {anchored.property.map((line) => (
            <li
              key={line}
              className="anchored-rise group flex items-baseline gap-0 border-t border-sand-400 py-6 last:border-b"
            >
              {/* A hairline that grows out of the margin under the cursor.
                  The page is built out of rules, so the rule is what reacts. */}
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-px w-0 shrink-0 bg-gold-700 transition-[width] duration-500 ease-ios group-hover:w-6"
              />
              <span className="font-display text-[clamp(1.125rem,1rem+0.7vw,1.5rem)]/[1.35] font-medium text-balance text-charcoal transition-[padding] duration-500 ease-ios group-hover:pl-4">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
