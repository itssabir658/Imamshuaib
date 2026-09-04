import Image from "next/image";
import Link from "next/link";
import { featuredSermon } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ArrowRight } from "@/components/ui/Button";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function FeaturedSermon() {
  const sermon = featuredSermon;
  const href = `/sermons/${sermon.id}`;

  return (
    <Section
      labelledBy="sermon-title"
      tone="deep"
      className="isolate overflow-hidden"
      aura
    >
      <div
        aria-hidden="true"
        className="pattern-khatim pointer-events-none absolute inset-0 -z-10 text-white/[0.05]"
      />

      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          id="sermon-title"
          eyebrow="Latest khutbah"
          title="Sermons you can listen to, or read"
          lead="Every khutbah is published with audio, video, and a full written transcript — so it works on a commute, and it works in silence."
          onDark
        />

        <article className="glass-surface glass-rim group/btn relative overflow-hidden rounded-card">
          <Link href={href} className="block">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/images/imam-shuaib-reading-quran.webp"
                alt=""
                width={1707}
                height={2560}
                sizes="(max-width: 1024px) 92vw, 34rem"
                className="h-full w-full object-cover object-[52%_26%] transition-transform duration-500 ease-out-soft group-hover/btn:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-teal-950/25 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-gold-500 text-teal-950 shadow-float transition-transform duration-300 ease-out-soft group-hover/btn:scale-110"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="ml-0.5 size-5">
                  <path d="M4.5 2.9v10.2c0 .5.55.8.97.53l8-5.1a.63.63 0 0 0 0-1.06l-8-5.1a.63.63 0 0 0-.97.53Z" />
                </svg>
              </span>
            </div>

            <div className="p-7 sm:p-8">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-teal-100/70">
                <span className="rounded-pill bg-gold-500/15 px-2.5 py-1 text-gold-300">
                  {sermon.topic}
                </span>
                <time dateTime={sermon.date}>
                  {dateFormat.format(new Date(sermon.date))}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{sermon.durationMinutes} min</span>
              </p>

              <h3 className="mt-4 text-h3 font-bold text-white">
                {sermon.title}
              </h3>
              <p className="mt-3 text-[0.9375rem]/relaxed text-teal-100/80">
                {sermon.excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                Listen now
                <ArrowRight />
              </span>
            </div>
          </Link>
        </article>
      </div>

      <div className="mt-12 flex flex-wrap gap-3 lg:mt-14">
        <Button href="/sermons" variant="ghost">
          Browse all sermons
        </Button>
        <Button href="/articles" variant="ghost">
          Read the articles
        </Button>
      </div>
    </Section>
  );
}
