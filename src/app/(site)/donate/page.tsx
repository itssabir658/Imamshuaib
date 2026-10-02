import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { DonateForm } from "@/components/forms/DonateForm";
import { TextLink } from "@/components/ui/Button";

const lead =
  "Your gift funds free Qur'an classes, counselling for families who cannot pay, and outreach that reaches thousands each month.";

export const metadata: Metadata = {
  title: "Donate",
  description: lead,
  alternates: { canonical: "/donate" },
  openGraph: {
    title: `Donate — ${site.name}`,
    description: lead,
    url: "/donate",
  },
};

const impact = [
  {
    amount: "$25",
    text: "Keeps one student in a Qur'an circle for a month.",
  },
  {
    amount: "$100",
    text: "Covers a counselling session for a family who cannot pay for one.",
  },
  {
    amount: "$250",
    text: "Funds a full week of teaching, recording and outreach.",
  },
];

const faqs = [
  {
    q: "Is my gift Zakat-eligible?",
    a: "⚠️ TO BE CONFIRMED. Do not publish a Zakat claim before the position has been checked and, if Zakat is accepted, before the funds are genuinely segregated and disbursed accordingly.",
  },
  {
    q: "Is it tax-deductible?",
    a: "⚠️ TO BE CONFIRMED — this depends on the legal entity receiving the funds and its registration. State the registration number here once it is known.",
  },
  {
    q: "Can I give monthly?",
    a: "Yes. Choose Monthly above and the same amount is taken each month. You can cancel at any time from the receipt email.",
  },
  {
    q: "How are card details handled?",
    a: "Payment is processed by Stripe, which is PCI-DSS compliant. Card details are entered on Stripe's own systems and never reach this website.",
  },
  {
    q: "Can I get a refund?",
    a: "⚠️ TO BE CONFIRMED — set out the refund window and how to request one.",
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader eyebrow="Support the work" title="Keep the classes free" lead={lead} />

      <Section tone="canvas">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <h2 className="text-h3 font-bold text-ink">What it pays for</h2>
            <dl className="mt-6 flex flex-col divide-y divide-line">
              {impact.map((row) => (
                <div key={row.amount} className="flex gap-6 py-5 first:pt-0">
                  <dt className="w-20 shrink-0 font-display text-h3 font-bold tabular-nums text-teal-700">
                    {row.amount}
                  </dt>
                  <dd className="text-[0.9375rem]/relaxed text-body">
                    {row.text}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 max-w-[34rem] text-[0.9375rem]/relaxed text-muted">
              Nothing here is a subscription to content. Everything Imam Shuaib
              teaches stays free to attend, and giving is how it stays that way.
            </p>
          </div>

          <div className="glass-surface-light glass-rim-light rounded-card p-7 sm:p-9">
            {/* ?amount= from the home page CTA preselects a tier, so this needs
                a boundary on a prerendered page. */}
            <Suspense fallback={<div className="h-[36rem]" />}>
              <DonateForm />
            </Suspense>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="donate-faq" id="faq">
        <h2 id="donate-faq" className="text-h2 font-bold">
          Questions about giving
        </h2>

        <dl className="mt-10 grid max-w-[52rem] gap-x-12 gap-y-9 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-display text-lg font-bold text-ink">
                {faq.q}
              </dt>
              <dd
                className={
                  faq.a.startsWith("⚠️")
                    ? "mt-3 rounded-xl border border-gold-300 bg-gold-50 px-5 py-4 text-[0.875rem]/[1.7] text-gold-900"
                    : "mt-3 text-[0.9375rem]/relaxed text-body"
                }
              >
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-sm text-muted">
          Something else on your mind?{" "}
          <TextLink href="/contact">Ask directly</TextLink>
        </p>
      </Section>
    </>
  );
}
