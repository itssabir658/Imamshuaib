import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService, services, site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ArrowRight, Button, TextLink } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";

type Params = { params: Promise<{ slug: string }> };

/** One static page per service, resolved at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: service.href },
    openGraph: {
      title: `${service.title} — ${site.name}`,
      description: service.description,
      url: service.href,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.id !== service.id).slice(0, 3);
  const ctaHref = service.ctaHref ?? "/contact";

  return (
    <>
      <PageHeader
        eyebrow="Program"
        title={service.title}
        lead={service.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href={ctaHref} variant="gold" size="lg">
            {service.ctaText ?? "Get in touch"}
            <ArrowRight />
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            All programs
          </Button>
        </div>
        {service.ctaNote ? (
          <p className="mt-4 text-sm text-muted">{service.ctaNote}</p>
        ) : null}
      </PageHeader>

      <Section tone="canvas">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            {service.body ? (
              <Prose className="flex flex-col gap-5">
                {service.body.map((p, i) => (
                  <p key={i} className="text-[1.0625rem]/[1.75]">
                    {p}
                  </p>
                ))}
              </Prose>
            ) : null}

            {service.suitedTo ? (
              <div className="mt-12">
                <h2 className="text-h3 font-bold text-ink">
                  This is probably for you if
                </h2>
                <ul className="mt-5 flex max-w-[36rem] flex-col gap-3">
                  {service.suitedTo.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.0625rem]/[1.6]">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            {service.benefits ? (
              <div className="glass-surface-light glass-rim-light rounded-card p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h2 className="text-h3 font-bold text-ink">
                    What you get
                  </h2>
                </div>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.9375rem]/relaxed">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 size-5 shrink-0 text-teal-600"
                      >
                        <path d="m4 10.5 4 4 8-9" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {service.format ? (
              <div className="rounded-card border border-line bg-surface p-7">
                <h2 className="text-h3 font-bold text-ink">How it runs</h2>
                <dl className="mt-5 flex flex-col divide-y divide-line">
                  {service.format.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:gap-6"
                    >
                      <dt className="w-36 shrink-0 text-sm font-semibold text-ink">
                        {row.label}
                      </dt>
                      <dd className="text-sm/relaxed text-body">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="rounded-card bg-teal-900 p-7">
              <h2 className="text-h3 font-bold text-white">Ready to start?</h2>
              <p className="mt-3 text-[0.9375rem]/relaxed text-teal-100/85">
                Tell Imam Shuaib what you need in a couple of sentences. If this
                is not the right programme for it, he will say so.
              </p>
              <Button href={ctaHref} variant="gold" className="mt-6 w-full">
                {service.ctaText ?? "Get in touch"}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" aura labelledBy="other-programs">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="other-programs" className="text-h2 font-bold">
            Other programs
          </h2>
          <div className="shrink-0 sm:pb-2">
            <TextLink href="/services">All programs</TextLink>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.id}>
              <Link
                href={other.href}
                className="glass-surface-light glass-rim-light group/btn flex h-full flex-col rounded-card p-6 transition-[box-shadow,transform] duration-500 ease-ios hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <ServiceIcon name={other.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {other.title}
                </h3>
                <p className="mt-2 grow text-sm/relaxed text-body">
                  {other.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                  Learn more
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
