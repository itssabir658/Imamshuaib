import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/content/site";
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

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" lead={lead} />

      <Section tone="canvas">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-[36rem]">
            {/* useSearchParams reads ?program= to preselect the subject, which
                needs a boundary because this page is prerendered. */}
            <Suspense fallback={<div className="h-[32rem]" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="glass-surface-light glass-rim-light rounded-card p-7">
              <h2 className="text-h3 font-bold text-ink">Directly</h2>
              <address className="mt-5 flex flex-col gap-3 text-[0.9375rem] not-italic">
                <a
                  href={"mailto:" + site.email}
                  className="w-fit font-medium text-teal-700 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                <a
                  href={"tel:" + site.phone.replace(/[^+\d]/g, "")}
                  className="w-fit font-medium text-teal-700 underline-offset-4 hover:underline"
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
                  They do not replace care from a licensed therapist, and a case
                  that needs one will be referred on.
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
        </div>
      </Section>
    </>
  );
}
