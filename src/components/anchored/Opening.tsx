import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Rule } from "./Type";

/**
 * The opening argument.
 *
 * The copy turns on one line — "You are not failing. You are unsupported." —
 * and everything before it is the setup. So that line is set at display size
 * and the rest stays at reading size. Nothing is added or reworded; the
 * emphasis is the only thing the design contributes.
 */
export function Opening() {
  const [setup, turn, ...rest] = anchored.opening.body;

  return (
    <section aria-labelledby="opening-title" className="bg-ivory pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <Rule />

        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
          <h2
            id="opening-title"
            className="text-h1 font-bold text-balance text-charcoal"
          >
            {anchored.opening.heading}
          </h2>

          <div className="max-w-[34rem]">
            <p className="font-sans text-[1.0625rem]/relaxed text-charcoal-600">
              {setup}
            </p>

            <p className="mt-10 font-display text-[clamp(1.375rem,1.15rem+1vw,1.875rem)]/[1.25] font-bold text-balance text-charcoal">
              {turn}
            </p>

            {rest.map((p) => (
              <p
                key={p}
                className="mt-7 font-sans text-[1.0625rem]/relaxed text-charcoal-600"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
