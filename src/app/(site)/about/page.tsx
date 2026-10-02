import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/pages";
import { site, stats } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "About",
  description: about.lead,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: about.lead,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} lead={about.lead} />

      <Section tone="canvas" className="pt-14 sm:pt-16 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute -top-4 -left-4 h-full w-full rounded-[2rem] border border-gold-500/45"
              />
              <div className="relative overflow-hidden rounded-[2rem] bg-teal-100 shadow-card">
                <Image
                  src="/images/imam-shuaib-reading-quran.webp"
                  alt="Imam Shuaib seated with an open Qur'an in his study, bookshelves behind him"
                  width={1707}
                  height={2560}
                  priority
                  sizes="(max-width: 1024px) 90vw, 24rem"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <figure className="relative z-10 -mt-12 ml-auto w-[85%] rounded-r-2xl border border-l-[3px] border-line border-l-gold-500 bg-surface px-7 py-6 shadow-card sm:-mt-14">
              <blockquote className="font-display text-quote font-medium text-ink">
                &ldquo;{about.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-sans text-sm font-medium text-muted">
                {about.quote.attribution}
              </figcaption>
            </figure>
          </div>

          <div>
            <div className="flex flex-col gap-12">
              {about.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-h3 font-bold text-ink">
                    {section.heading}
                  </h2>
                  <Prose className="mt-4 flex flex-col gap-5">
                    {section.body.map((p, i) => (
                      <p key={i} className="text-[1.0625rem]/[1.75]">
                        {p}
                      </p>
                    ))}
                  </Prose>
                </section>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="text-sm text-balance text-muted">{s.label}</dt>
                  <dd className="font-display text-[2rem] leading-[1.05] font-bold tabular-nums text-teal-700 sm:text-[2.25rem]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/services" size="lg">
                See the programs
                <ArrowRight />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Visible in the page source, not on the page: the specifics a real
          biography needs, so whoever finishes this knows exactly what to ask
          for rather than inventing it. */}
      <Container>
        <div className="sr-only">
          <h2>Biography details still required</h2>
          <ul>
            {about.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
