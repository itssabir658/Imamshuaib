import { tour } from "@/content/tour";
import { Container } from "@/components/ui/Container";
import { RegisterCard } from "./RegisterCard";

/**
 * The close. One line, one supporting sentence, the same card again.
 *
 * The card's heading drops to h3 here because the section already owns an h2
 * — the hierarchy has to describe the page, not the component.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">
          <div className="max-w-xl text-center lg:flex-1 lg:text-left">
            <div
              aria-hidden="true"
              className="tour-divider mx-auto mb-10 w-24 lg:mx-0"
            />
            <h2
              id="final-cta-title"
              className="text-h2 font-bold text-charcoal"
            >
              {tour.finalCta.heading}
            </h2>
            <p className="mt-6 font-sans text-lead text-charcoal-600">
              {tour.finalCta.body}
            </p>
            <p className="mt-8 font-sans text-sm text-sand-700">
              Questions before you register?{" "}
              <a
                href="/contact?program=al-aqsa-tour"
                className="font-semibold text-gold-800 underline underline-offset-4"
              >
                Speak to the team
              </a>
            </p>
          </div>

          <RegisterCard
            headingId="register-final"
            as="h3"
            className="w-full max-w-sm lg:w-[22.5rem] lg:shrink-0"
          />
        </div>
      </Container>
    </section>
  );
}
