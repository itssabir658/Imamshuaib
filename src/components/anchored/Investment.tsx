import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, RESERVE_HREF, Rule, SeatCount, reserveClasses } from "./Type";

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
        <Label className="mb-14">Two prices</Label>

        <div className="grid sm:grid-cols-2">
          {anchored.investment.tiers.map((tier) => (
            <div
              key={tier.name}
              className="anchored-rise border-t-2 border-charcoal pt-8 pb-10 last:pb-0 sm:pr-12 sm:pb-0"
            >
              <Label>{tier.name}</Label>
              <p className="mt-6 font-display text-[clamp(3.5rem,2.4rem+4.4vw,6rem)] leading-[0.88] font-bold tracking-[-0.04em] tabular-nums text-charcoal">
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

<a href={RESERVE_HREF} className={`${reserveClasses()} mt-9`}>
              {anchored.investment.cta}
            </a>

            <SeatCount className="mt-7" />
          </div>

          <div className="anchored-rise bg-charcoal p-8 sm:p-10">
            <Label tone="paper">{anchored.investment.payment}</Label>

            <ul className="mt-7 space-y-7">
              <li>
                <h3 className="font-display text-base font-bold text-ivory">
                  Card
                </h3>
                <p className="mt-2 font-sans text-sm/relaxed text-sand-300">
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
                      <code className="font-mono text-[0.8125rem] text-ivory">
                        anchored.cardHref
                      </code>{" "}
                      and both buttons on this page point at it.
                    </>
                  )}
                </p>
              </li>

              <li>
                <h3 className="font-display text-base font-bold text-ivory">
                  Interac e-Transfer
                </h3>
                <p className="mt-2 font-sans text-sm/relaxed text-sand-300">
                  {anchored.etransferTo ? (
                    <>
                      Send ${"250"} to{" "}
                      <a
                        href={`mailto:${anchored.etransferTo}`}
                        className="link-draw font-semibold break-all text-gold-300"
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
                      <code className="font-mono text-[0.8125rem] text-ivory">
                        anchored.etransferTo
                      </code>
                      . Until then,{" "}
                      <a
                        href="/contact?program=anchored-retreat"
                        className="link-draw font-semibold text-gold-300"
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
