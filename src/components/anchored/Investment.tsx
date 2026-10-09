import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, RESERVE_HREF, Rule, SeatCount } from "./Type";

/**
 * Price, and the deposit step.
 *
 * Two things here are deliberate and easy to undo by accident:
 *
 * 1. NOTHING IS COMPUTED FROM TODAY'S DATE. It is tempting to compare against
 *    25 October and mark one tier "current". This page is statically
 *    generated, so that comparison would be frozen at build time and the page
 *    would go on announcing the early-bird price for as long as nobody
 *    redeploys. Both tiers are shown as the copy writes them, with their own
 *    deadlines, and the reader does the arithmetic correctly every time.
 *
 * 2. BOTH PAYMENT ROUTES ARE VISIBLE TOGETHER. The brief: "Stripe checkout for
 *    card payments, plus an e-transfer option. Both must be visible at the
 *    deposit step." Not a toggle, not a second page — side by side, here.
 *
 * ⚠️ No card field appears on this page and none should ever be added. The
 * card route hands off to Stripe's own hosted page, which is what keeps this
 * site out of PCI scope — the same decision taken on /donate.
 */
export function Investment() {
  return (
    <section
      aria-labelledby="investment-title"
      className="bg-ivory py-20 sm:py-24 lg:py-28"
    >
      <h2 id="investment-title" className="sr-only">
        Investment
      </h2>

      <Container>
        <div className="grid sm:grid-cols-2">
          {anchored.investment.tiers.map((tier) => (
            <div
              key={tier.name}
              className="border-t border-sand-400 pt-8 pb-8 last:pb-0 sm:pr-10 sm:pb-0"
            >
              <Label>{tier.name}</Label>
              <p className="mt-5 font-display text-[clamp(2.5rem,2rem+2.4vw,3.75rem)] leading-none font-bold tabular-nums text-charcoal">
                {tier.price}
              </p>
              <p className="mt-4 font-sans text-sm text-charcoal-600">
                {tier.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-2xl font-sans text-[1.0625rem]/relaxed text-charcoal-600">
          {anchored.investment.includes}
        </p>

        <Rule fleuron={false} className="mt-14" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <p className="font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)]/[1.3] font-bold text-balance text-charcoal">
              {anchored.investment.deposit}
            </p>
            <p className="mt-5 max-w-md font-sans text-sm text-charcoal-600">
              {anchored.investment.terms}
            </p>

            <a
              href={RESERVE_HREF}
              className="mt-9 inline-flex h-13 items-center justify-center rounded-[2px] bg-charcoal px-9 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors duration-300 ease-ios hover:bg-charcoal-800"
            >
              {anchored.investment.cta}
            </a>

            <SeatCount className="mt-7" />
          </div>

          <div className="rounded-[2px] bg-sand-50 p-7 ring-1 ring-sand-400 sm:p-8">
            <Label>{anchored.investment.payment}</Label>

            <ul className="mt-7 space-y-7">
              <li>
                <h3 className="font-display text-base font-bold text-charcoal">
                  Card
                </h3>
                <p className="mt-2 font-sans text-sm/relaxed text-charcoal-600">
                  {anchored.cardHref ? (
                    <>
                      Handled by Stripe. Card details are entered on Stripe&rsquo;s
                      systems and never reach this website.
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">⚠️ </span>
                      Stripe checkout is not connected yet. Add the Stripe
                      Payment Link or Checkout route to{" "}
                      <code className="font-mono text-[0.8125rem] text-charcoal">
                        anchored.cardHref
                      </code>{" "}
                      and both buttons on this page point at it.
                    </>
                  )}
                </p>
              </li>

              <li>
                <h3 className="font-display text-base font-bold text-charcoal">
                  Interac e-Transfer
                </h3>
                <p className="mt-2 font-sans text-sm/relaxed text-charcoal-600">
                  {anchored.etransferTo ? (
                    <>
                      Send ${"250"} to{" "}
                      <a
                        href={`mailto:${anchored.etransferTo}`}
                        className="font-semibold break-all text-gold-800 underline underline-offset-4"
                      >
                        {anchored.etransferTo}
                      </a>
                      , with your full name in the message.
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">⚠️ </span>
                      The e-transfer address has not been supplied, so the page
                      does not print one. Add it to{" "}
                      <code className="font-mono text-[0.8125rem] text-charcoal">
                        anchored.etransferTo
                      </code>
                      . Until then,{" "}
                      <a
                        href="/contact?program=anchored-retreat"
                        className="font-semibold text-gold-800 underline underline-offset-4"
                      >
                        ask for it here
                      </a>
                      .
                    </>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
