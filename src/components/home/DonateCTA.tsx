import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button, ArrowRight, TextLink } from "@/components/ui/Button";

/**
 * §2 flagged the donation form repeating on every page. The home page now
 * carries one consolidated call to action; the form itself lives only on
 * /donate, where the amount is pre-selected from these links.
 */
const amounts = [25, 50, 100, 250];

export function DonateCTA() {
  return (
    <Section labelledBy="donate-title" tone="canvas" className="pb-20 sm:pb-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-teal-900 px-7 py-14 sm:px-12 lg:px-16 lg:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(100%_120%_at_85%_0%,var(--color-teal-700)_0%,var(--color-teal-900)_58%)]" />
          <div className="pattern-khatim absolute inset-0 text-white/[0.06]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow onDark>Support the work</Eyebrow>
            <h2
              id="donate-title"
              className="mt-5 max-w-[22rem] text-h2 font-bold text-white"
            >
              Keep the classes free for the people who need them
            </h2>
            <p className="mt-5 max-w-[35rem] text-lead text-teal-100/85">
              Your Zakat- and Sadaqah-eligible gift funds free Qur&rsquo;an
              classes, counselling for families who cannot pay, and educational
              outreach that reaches thousands each month.
            </p>

            <p className="mt-7 flex items-center gap-2.5 text-sm text-teal-100/70">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="size-4 shrink-0 text-gold-300"
              >
                <rect x="3" y="7" width="10" height="7" rx="1.6" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              Processed by Stripe over 256-bit SSL. We never see your card
              details.
            </p>
          </div>

          <div className="rounded-card border border-white/12 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
            <fieldset>
              <legend className="text-sm font-medium text-teal-100/90">
                Choose an amount
              </legend>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {amounts.map((amount) => (
                  <li key={amount}>
                    <Button
                      href={`/donate?amount=${amount}`}
                      variant="ghost"
                      className="w-full"
                    >
                      ${amount}
                    </Button>
                  </li>
                ))}
              </ul>
            </fieldset>

            <Button
              href="/donate"
              variant="gold"
              size="lg"
              className="mt-5 w-full"
            >
              Donate now
              <ArrowRight />
            </Button>

            <p className="mt-5 text-center text-sm text-teal-100/70">
              <TextLink href="/donate#faq" onDark>
                Is my gift Zakat-eligible?
              </TextLink>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
