import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Khatim, Reserve, SeatCount } from "./Type";

/**
 * The close. One line, one button, nothing else on the band.
 *
 * The page's last inverted block, which is what makes it read as the end of a
 * document rather than one more section.
 */
export function Closing() {
  return (
    <section
      aria-labelledby="closing-title"
      className="bg-charcoal py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Khatim aria-hidden="true" className="size-4 text-gold-400" />

          <h2
            id="closing-title"
            className="mt-9 font-display text-[clamp(1.875rem,1.3rem+2.6vw,3.25rem)]/[1.1] font-bold text-balance text-ivory"
          >
            {anchored.close.line}
          </h2>

          <Reserve tone="paper" className="mt-11 w-full sm:w-auto">
            {anchored.close.cta}
          </Reserve>

          <SeatCount tone="paper" className="mt-7" />
        </div>
      </Container>
    </section>
  );
}
