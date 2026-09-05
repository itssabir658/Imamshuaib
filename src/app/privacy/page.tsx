import type { Metadata } from "next";
import { privacy } from "@/content/pages";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalBody } from "@/components/ui/Prose";

const lead =
  "What this site collects, why, and what happens to it. Short, because it collects very little.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: lead,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" lead={lead} />
      <Section tone="canvas">
        <p className="mb-12 max-w-[38rem] rounded-xl border border-gold-300 bg-gold-50 px-5 py-4 text-[0.9375rem]/relaxed text-gold-900">
          <strong className="font-semibold">This document is not finished.</strong>{" "}
          The sections below describe what the site verifiably does. Everything
          that depends on facts only the site owner knows is marked, and the
          whole must be reviewed by someone qualified before launch.
        </p>
        <LegalBody sections={privacy} />
        <p className="mt-12 text-sm text-muted">
          Questions about any of this: {site.email}
        </p>
      </Section>
    </>
  );
}
