import Link from "next/link";
import { services } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowRight, TextLink } from "@/components/ui/Button";

export function ServicesTeaser() {
  const featured = services.filter((s) => s.featured);

  return (
    <Section id="programs" labelledBy="programs-title" tone="surface">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="programs-title"
          eyebrow="Programs"
          title="Where you can start"
          lead="Study, counsel, and support — each one is a real commitment from Imam Shuaib, not a page on a website."
          className="max-w-2xl"
        />
        <div className="shrink-0 sm:pb-2">
          <TextLink href="/services">All programs</TextLink>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service) => (
          <li key={service.id}>
            {/* The whole card is one link: a single tab stop, one clear target. */}
            <Link
              href={service.href}
              className="group/btn flex h-full flex-col rounded-card border border-line bg-surface p-7 transition-[border-color,box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:border-teal-200 hover:shadow-card-hover"
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
  );
}
