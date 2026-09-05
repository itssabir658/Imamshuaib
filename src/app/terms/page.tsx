import type { Metadata } from "next";
import { terms } from "@/content/pages";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalBody } from "@/components/ui/Prose";

const lead =
  "The terms you are agreeing to by using this site, booking a session, or giving.";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: lead,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Use" lead={lead} />
      <Section tone="canvas">
        <p className="mb-12 max-w-[38rem] rounded-xl border border-gold-300 bg-gold-50 px-5 py-4 text-[0.9375rem]/relaxed text-gold-900">
          <strong className="font-semibold">This document is not finished.</strong>{" "}
          The clauses that matter most — cancellations, refunds, and the exact
          scope of pastoral versus clinical care — are marked and must be
          completed and reviewed before launch.
        </p>
        <LegalBody sections={terms} />
        <p className="mt-12 text-sm text-muted">
          Questions about any of this: {site.email}
        </p>
      </Section>
    </>
  );
}
