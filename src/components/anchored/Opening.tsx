import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";

/**
 * The opening argument, and the page's hardest cut.
 *
 * The copy turns on one line — "You are not failing. You are unsupported." —
 * and everything before it is setup. Previously that line was set bigger and
 * left in the flow, which is emphasis; here it stops the page: full-bleed
 * clay, nothing else on the block, read at the scale of a headline. The
 * colour change is doing what a paragraph break cannot, which is make you
 * look up.
 *
 * Clay rather than charcoal because the page already has three dark bands and
 * clay is only 2.15:1 against charcoal — they would read as one mass. There
 * is paper either side of this block for exactly that reason.
 *
 * The question itself is set across the full measure and the answer indented
 * under its right half, so the block is asymmetric before any of it is read.
 */
export function Opening() {
  const [setup, turn, ...rest] = anchored.opening.body;

  return (
    <section aria-labelledby="opening-title" className="bg-ivory">
      <Container>
        <div className="anchored-rise pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28">
          <h2
            id="opening-title"
            className="max-w-[18ch] font-display text-[clamp(2.25rem,1.5rem+3.4vw,4.25rem)]/[1.03] font-bold tracking-[-0.03em] text-balance text-charcoal"
          >
            {anchored.opening.heading}
          </h2>

          <p className="mt-12 max-w-[34rem] font-sans text-[1.0625rem]/relaxed text-charcoal-600 lg:ml-[38%]">
            {setup}
          </p>
        </div>
      </Container>

      {/* The cut. Full-bleed, nothing else on it. */}
      <div className="bg-clay py-20 sm:py-24 lg:py-28">
        <Container>
          <p className="anchored-rise max-w-[22ch] font-display text-[clamp(2rem,1.4rem+2.8vw,3.75rem)]/[1.05] font-bold tracking-[-0.028em] text-balance text-ivory">
            {turn}
          </p>
        </Container>
      </div>

      <Container>
        <div className="anchored-rise pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pb-28">
          <div className="max-w-[34rem] lg:ml-[38%]">
            {rest.map((p, i) => (
              <p
                key={p}
                className={
                  // The last line is the turn of the section into the offer,
                  // so it is set at display weight rather than buried as a
                  // fourth paragraph of body copy.
                  i === rest.length - 1
                    ? "mt-10 font-display text-[clamp(1.375rem,1.15rem+1vw,1.875rem)]/[1.25] font-bold text-balance text-charcoal"
                    : "mt-7 font-sans text-[1.0625rem]/relaxed text-charcoal-600 first:mt-0"
                }
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
