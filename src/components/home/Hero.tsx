import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Button, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { featuredSermon, services, stats } from "@/content/site";

/**
 * "The Board" — a utility-first hero.
 *
 * A short flat deep-teal masthead sits on top of a white directory board that
 * lifts over the seam and fills the rest of the fold with real entry points:
 * three programs and the latest khutbah. The test it is built against is that
 * a returning visitor who wants to book counselling reaches it without
 * scrolling.
 *
 * Driven off `services` rather than a hardcoded id list, so a renamed id can
 * never silently leave a hole in the row.
 *
 * The masthead is flat teal-950 all the way up under the sticky header, so
 * "/" stays in Header's DARK_HERO_ROUTES.
 */
const tiles = services.filter((s) => s.featured).slice(0, 3);

/** Three of the four stats — "continents called home" is colour, not proof. */
const heroStats = stats.filter((s) => s.label !== "Continents called home");

const sermonDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(featuredSermon.date));

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate -mt-18 flex flex-col bg-canvas pb-14 lg:pb-20"
    >
      {/* Masthead — flat deep teal. The sticky header floats over solid
          teal-950, so it keeps its light-on-dark palette. */}
      <div className="bg-teal-950 pt-30 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
        <Container>
          {/* Identity chip — the portrait as a credential, not a centrepiece. */}
          <div className="flex items-center gap-4">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-teal-800 ring-1 ring-gold-500/50 sm:size-16 lg:size-20">
              <Image
                src="/images/imam-shuaib-portrait-cutout.webp"
                alt="Imam Shuaib"
                fill
                priority
                sizes="80px"
                className="origin-top scale-[1.75] object-cover"
              />
            </span>
            <div className="min-w-0">
              <Eyebrow onDark>The Accessible Imam</Eyebrow>
              <p className="mt-2 text-sm text-teal-100/70">
                Qur&rsquo;an teacher, coach &amp; counsellor
              </p>
            </div>
          </div>

          <h1
            id="hero-title"
            className="mt-6 max-w-4xl text-h1 font-bold text-white lg:mt-8"
          >
            Empowering Muslims worldwide through{" "}
            <span className="text-gold-300">faith &amp; knowledge</span>
          </h1>

          <div className="mt-5 flex flex-col gap-7 lg:mt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
            <p className="max-w-[32rem] text-lead text-teal-100/85">
              Qur&rsquo;anic study, coaching, and counselling &mdash; in plain
              language.
            </p>

            <div className="lg:shrink-0">
              {/* grid-cols-2 at base guarantees one row of buttons; wrapping to
                  two rows would push the third tile past the 812px fold. */}
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
                <Button
                  href="/contact"
                  variant="gold"
                  className="w-full px-4 sm:h-13 sm:w-auto sm:px-7 sm:text-base"
                >
                  Book a session
                  <ArrowRight />
                </Button>
                <Button
                  href="/sermons"
                  variant="ghost"
                  className="w-full px-4 sm:h-13 sm:w-auto sm:px-7 sm:text-base"
                >
                  <PlayGlyph />
                  Watch a sermon
                </Button>
              </div>
              <p className="mt-4 flex items-start gap-2.5 text-sm text-teal-100/70 lg:justify-end">
                <StarGlyph />
                Free weekly khutbah &middot; No cost to join a Qur&rsquo;an
                circle
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* The board — the fold's main event. Lifted over the seam of the teal
          band. The section is flex-col so this negative margin cannot collapse
          through the parent and drag the canvas ground up with it. */}
      <Container className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-20">
        <div className="overflow-hidden rounded-card bg-surface shadow-float ring-1 ring-line">
          <h2 id="hero-board" className="sr-only">
            Start here
          </h2>

          {/* gap-px over a line-coloured ground gives correct hairline dividers
              at 1, 2 and 4 columns with no per-breakpoint borders. */}
          <ul
            aria-labelledby="hero-board"
            className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-4"
          >
            {tiles.map((service) => (
              <li key={service.id} className="bg-surface">
                <Link
                  href={service.href}
                  className="group/link flex h-full items-center gap-4 p-4 transition-colors duration-200 ease-out-soft hover:bg-teal-50 sm:flex-col sm:items-start sm:gap-0 sm:p-6 lg:p-7"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors duration-200 ease-out-soft group-hover/link:bg-teal-600 group-hover/link:text-white sm:size-12">
                    <ServiceIcon name={service.icon} className="size-5 sm:size-6" />
                  </span>

                  <span className="flex min-w-0 flex-1 flex-col sm:mt-5 sm:w-full">
                    <span className="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.012em] text-ink sm:text-lg lg:text-xl">
                      {service.title}
                    </span>
                    <span className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">
                      {service.description}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 sm:mt-auto sm:pt-5">
                      {service.ctaText ?? "Learn more"}
                      <ArrowRight />
                    </span>
                  </span>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 shrink-0 text-teal-600 sm:hidden"
                  >
                    <path d="m6 3.5 4.5 4.5L6 12.5" />
                  </svg>
                </Link>
              </li>
            ))}

            {/* Fourth tile: the latest khutbah. The photograph sits above the
                text rather than behind it — a scrim heavy enough for white type
                lands exactly on his face and erases him. */}
            <li className="bg-teal-900">
              <Link
                href="/sermons"
                className="group/link flex h-full flex-col transition-colors duration-200 ease-out-soft hover:bg-teal-800"
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden">
                  {/* The outdoor frame, not the study one: the study
                      photograph appears large in AboutTeaser one screen below,
                      and the same picture twice reads as an asset shortage.
                      At ~288px this 338x469 source is within its resolution. */}
                  <Image
                    src="/images/imam-shuaib-outdoors.webp"
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover object-[50%_4%] transition-transform duration-500 ease-out-soft group-hover/link:scale-105 motion-reduce:group-hover/link:scale-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-teal-900"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-pill bg-teal-950/85 px-3 py-1.5 font-sans text-eyebrow font-semibold text-white uppercase">
                    <PlayGlyph />
                    Latest khutbah
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7 lg:pt-4">
                  <span className="font-display text-[1.0625rem] leading-snug font-bold tracking-[-0.012em] text-white sm:text-lg lg:text-xl">
                    {featuredSermon.title}
                  </span>
                  <span className="mt-1.5 text-sm text-teal-100/80">
                    {featuredSermon.topic} &middot;{" "}
                    {featuredSermon.durationMinutes} min &middot; {sermonDate}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 sm:mt-auto sm:pt-5">
                    Watch now
                    <ArrowRight />
                  </span>
                </span>
              </Link>
            </li>
          </ul>

          {/* Board footer: proof on the left, overflow routes on the right. */}
          <div className="flex flex-col gap-3 border-t border-line bg-teal-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-7">
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-sm">
              {heroStats.map((stat) => (
                <li key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold tabular-nums text-teal-700">
                    {stat.value}
                  </span>
                  <span className="text-muted">{stat.label.toLowerCase()}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <TextLink href="/services" className="text-sm">
                All {services.length} programs
              </TextLink>
              <TextLink href="/donate" className="text-sm">
                Donate
              </TextLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlayGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-3 shrink-0"
    >
      <path d="M4.5 2.9v10.2c0 .5.55.8.97.53l8-5.1a.63.63 0 0 0 0-1.06l-8-5.1a.63.63 0 0 0-.97.53Z" />
    </svg>
  );
}

function StarGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className="mt-0.5 size-4 shrink-0 text-gold-300"
    >
      <path d="M8 1.8 9.9 5.7l4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8Z" />
    </svg>
  );
}
