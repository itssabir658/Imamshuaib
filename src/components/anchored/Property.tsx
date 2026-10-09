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
              className="border-t border-sand-400 py-6 font-display text-[clamp(1.125rem,1rem+0.7vw,1.5rem)]/[1.35] font-medium text-balance text-charcoal last:border-b"
            >
              {line}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
