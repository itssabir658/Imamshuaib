import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { RegisterNiche } from "./RegisterNiche";
import { Label, Rule } from "./Type";

/**
 * The close — the page's one inverted block.
 *
 * The rest is paper, so this reads as the stamp at the foot of the invitation
 * rather than as another section. The niche returns here, centred, which is
 * what turns the arch from a container into a motif: a shape you have already
 * met once is recognised the second time instead of read.
 *
 * The niche heading drops to h3 because the section already owns an h2 — the
 * hierarchy has to describe the page, not the component.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="bg-charcoal py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Label tone="paper">The invitation</Label>

          <h2
            id="final-cta-title"
            className="mt-7 text-h1 font-bold text-balance text-ivory"
          >
            {tour.finalCta.heading}
          </h2>

          <p className="mt-6 max-w-md font-sans text-[0.9375rem]/relaxed text-sand-300">
            {tour.finalCta.body}
          </p>

          <Rule tone="paper" className="mt-12 w-full max-w-sm" />

          <RegisterNiche
            headingId="register-final"
            as="h3"
            tone="paper"
            className="mt-12"
          />

          <p className="mt-10 font-sans text-sm text-sand-300">
            Questions before you register?{" "}
            <a
              href="/contact?program=al-aqsa-tour"
              className="font-semibold text-gold-300 underline underline-offset-4"
            >
              Speak to the team
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
