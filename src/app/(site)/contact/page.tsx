import type { Metadata } from "next";
import { Suspense } from "react";
import { ANCHORED_TOPIC, site } from "@/content/site";
import { anchored } from "@/content/anchored";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";

const lead =
  "Tell Imam Shuaib what you need in a couple of sentences. If he is not the right person for it, he will say so and point you to someone who is.";

export const metadata: Metadata = {
  title: "Contact",
  description: lead,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: lead,
    url: "/contact",
  },
};

/**
 * Contact, and — with `?program=anchored-retreat` — the Anchored reservation
 * page.
 *
 * They are one route rather than two because they are one form. What changes
 * is the framing: someone who arrived by pressing "Reserve your seat" has
 * already decided, and "Get in touch" is the wrong thing to say to them.
 *
 * Reading `searchParams` makes this route dynamic. That is the trade for
 * getting the retreat masthead into the HTML rather than swapping it in after
 * hydration — "You've decided. Good." is the first thing on the page, and it
 * should not arrive late or flash the generic version first.
 *
 * The two sidebar cards are hidden on the retreat view only. Imam Shuaib
 * asked for them gone from the reservation page, and they are clutter there —
 * but "Before you write" carries the bereavement and crisis guidance, which
 * has to stay on the contact page proper.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { program } = await searchParams;
  const isRetreat = program === ANCHORED_TOPIC;

  return (
    <>
      {isRetreat ? (
        <PageHeader
          eyebrow="Anchored"
          title={"You’ve decided. Good."}
          lead="Ten seats, each one confirmed personally. Tell Imam Shuaib a little about yourself and he will be in touch within 24 hours."
        >
          <p className="font-sans text-sm font-semibold tracking-[0.1em] text-charcoal uppercase">
            {anchored.dates} &nbsp;|&nbsp; {anchored.shortPlace}
          </p>
        </PageHeader>
      ) : (
        <PageHeader eyebrow="Contact" title="Get in touch" lead={lead} />
      )}

      <Section tone="canvas">
        <div
          className={
            isRetreat
              ? "max-w-[38rem]"
              : "grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
          }
        >
          <div className="max-w-[36rem]">
            {/* useSearchParams reads ?program= to preselect the subject, which
                needs a boundary because this page is prerendered. */}
            <Suspense fallback={<div className="h-[32rem]" />}>
              <ContactForm />
            </Suspense>

            {isRetreat ? (
              <p className="mt-10 border-t border-line pt-7 text-[0.9375rem]/relaxed text-body">
                Prefer to talk first? Call or text Imam Shuaib at{" "}
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="font-semibold text-gold-800 underline underline-offset-4"
                >
                  {site.phone}
                </a>
                , or email{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold break-all text-gold-800 underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            ) : null}
          </div>

          {isRetreat ? null : (
            <aside className="flex flex-col gap-6">
              <div className="glass-surface-light glass-rim-light rounded-card p-7">
                <h2 className="text-h3 font-bold text-ink">Directly</h2>
                <address className="mt-5 flex flex-col gap-3 text-[0.9375rem] not-italic">
                  <a
                    href={"mailto:" + site.email}
                    className="w-fit font-medium break-all text-gold-800 underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                  <a
                    href={"tel:" + site.phone.replace(/[^+\d]/g, "")}
                    className="w-fit font-medium text-gold-800 underline-offset-4 hover:underline"
                  >
                    {site.phone}
                  </a>
                </address>
                <SocialLinks className="mt-5 -ml-3" tone="light" />
              </div>

              <div className="rounded-card border border-line bg-surface p-7">
                <h2 className="text-h3 font-bold text-ink">Before you write</h2>
                <ul className="mt-5 flex flex-col gap-4 text-[0.9375rem]/relaxed text-body">
                  <li>
                    <strong className="font-semibold text-ink">
                      For a bereavement,
                    </strong>{" "}
                    call rather than email. End-of-life support is available at
                    short notice.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">
                      Coaching and counselling are pastoral, not clinical.
                    </strong>{" "}
                    They do not replace care from a licensed therapist, and a
                    case that needs one will be referred on.
                  </li>
                  <li>
                    <strong className="font-semibold text-ink">
                      If you are in crisis or in danger,
                    </strong>{" "}
                    contact your local emergency services first.
                  </li>
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Section>
    </>
  );
}
