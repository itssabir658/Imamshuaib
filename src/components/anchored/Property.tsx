import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * The land.
 *
 * Five lines, on clay, set as large as the page allows. These are the most
 * concrete sentences in the whole document — a horse, a bow, a fire, a hot
 * tub, a cook — and they were previously a quiet ruled list on paper, which
 * is the one treatment that makes concrete writing abstract again.
 *
 * No icons. Four line glyphs for horse / bow / fire / tub is the exact move
 * that makes a page look assembled rather than written, and these sentences
 * do not need help.
 *
 * Clay rather than charcoal: the page already carries three dark bands, and
 * clay is only 2.15:1 against charcoal, so the two can never touch. There is
 * paper on both sides of this one.
 */
export function Property() {
  return (
    <section
      aria-labelledby="property-title"
      className="bg-clay py-20 sm:py-24 lg:py-28"
    >
      <h2 id="property-title" className="sr-only">
        The property
      </h2>

      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-24">
          <Label tone="clay" className="shrink-0 lg:w-40 lg:pt-5">
            Waterdown, Ontario
          </Label>

          <ul className="max-w-3xl">
            {anchored.property.map((line) => (
              <li
                key={line}
                className="anchored-rise group flex items-baseline border-t border-ivory/25 py-7 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-px w-0 shrink-0 bg-gold-300 transition-[width] duration-500 ease-ios group-hover:w-7"
                />
                <span className="font-display text-[clamp(1.25rem,1.05rem+1.1vw,2rem)]/[1.22] font-medium text-balance text-ivory transition-[padding] duration-500 ease-ios group-hover:pl-5">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
