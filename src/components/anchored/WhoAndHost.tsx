import Image from "next/image";
import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, Rule } from "./Type";

/**
 * Who the weekend is for, and who is running it.
 *
 * The "Not for:" line is deliberately not softened or buried. A retreat with
 * ten seats that are confirmed personally gains more from turning the wrong
 * man away on the page than from converting him and sorting it out later, and
 * the copy knows that — so it is set at the same weight as the list above it
 * rather than as small print.
 */
export function WhoFor() {
  return (
    <section aria-labelledby="who-title" className="bg-ivory pb-20 sm:pb-24 lg:pb-28">
      <h2 id="who-title" className="sr-only">
        Who this is for
      </h2>

      <Container>
        <Rule />

        <ul className="mt-16 max-w-3xl sm:mt-20">
          {anchored.who.forMen.map((line) => (
            <li
              key={line}
              className="anchored-rise group flex items-baseline gap-0 border-t border-sand-400 py-6"
            >
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-px w-0 shrink-0 bg-gold-700 transition-[width] duration-500 ease-ios group-hover:w-6"
              />
              <span className="font-display text-[clamp(1.125rem,1rem+0.7vw,1.5rem)]/[1.35] font-medium text-balance text-charcoal transition-[padding] duration-500 ease-ios group-hover:pl-4">
                {line}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-9 max-w-2xl border-l-2 border-sand-500 pl-6 font-sans text-[0.9375rem]/relaxed text-charcoal-600">
          {anchored.who.notFor}
        </p>
      </Container>
    </section>
  );
}

/**
 * The host.
 *
 * The photograph is the one in the project that actually fits this page — he
 * is outdoors, on grass, in front of conifers, in earth tones. It is 338×469,
 * so it is displayed at its native width and never upscaled; `sizes` is set
 * to match so no larger variant is requested that does not exist.
 *
 * No Guidance for Generations branding, by instruction: this page is for Imam
 * Shuaib's personal brand only.
 */
export function Host() {
  return (
    <section
      aria-labelledby="host-title"
      className="bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <h2 id="host-title" className="sr-only">
        About Imam Shuaib
      </h2>

      <Container>
        <div className="flex flex-col gap-12 sm:flex-row sm:items-center sm:gap-16">
          <Image
            src="/images/imam-shuaib-outdoors.webp"
            alt="Imam Shuaib, standing outdoors in front of pine trees"
            width={338}
            height={469}
            sizes="(min-width: 640px) 280px, 240px"
            className="w-60 shrink-0 rounded-[2px] object-cover sm:w-70"
          />

          <div className="max-w-xl">
            <Label>Imam Shuaib</Label>
            <p className="mt-7 font-display text-[clamp(1.25rem,1.05rem+0.9vw,1.75rem)]/[1.3] font-medium text-balance text-charcoal">
              {anchored.about}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
