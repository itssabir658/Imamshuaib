import type { Metadata } from "next";
import Link from "next/link";
import { services, site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowRight, Button } from "@/components/ui/Button";

const lead =
  "Study, counsel, and support. Each one is a real commitment from Imam Shuaib — not a page on a website.";

export const metadata: Metadata = {
  title: "Programs",
  description: lead,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Programs — ${site.name}`,
    description: lead,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Programs" title="Where you can start" lead={lead} />

      <Section tone="canvas" aura labelledBy="all-programs">
        <h2 id="all-programs" className="sr-only">
          All programs
        </h2>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={service.href}
                className="glass-surface-light glass-rim-light group/btn flex h-full flex-col rounded-card p-7 transition-[box-shadow,transform] duration-500 ease-ios hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-colors duration-300 group-hover/btn:bg-teal-600 group-hover/btn:text-white">
                  <ServiceIcon name={service.icon} />
                </span>

                <h3 className="mt-6 text-h3 font-bold">{service.title}</h3>
                <p className="mt-3 grow text-[0.9375rem]/relaxed text-body">
                  {service.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                  {service.ctaText ?? "Learn more"}
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="deep" aura className="py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-h3 font-bold text-white">
              Not sure which one you need?
            </h2>
            <p className="mt-2 max-w-[36rem] text-teal-100/85">
              Describe the situation in a sentence or two and Imam Shuaib will
              tell you honestly whether he is the right person for it.
            </p>
          </div>
          <Button href="/contact" variant="gold" size="lg" className="shrink-0">
            Ask first
            <ArrowRight />
          </Button>
        </div>
      </Section>
    </>
  );
}
