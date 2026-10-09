import Image from "next/image";
import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * Who the weekend is for.
 *
 * Three lines on a warmer paper, then the exclusion set hard against them in
 * ink. The "Not for:" line is the most useful sentence in the section and it
 * was previously small print under a rule — a retreat with ten personally
 * confirmed seats gains more from turning the wrong man away on the page than
 * from converting him and sorting it out on the phone. So it gets its own
 * block, in the page's strongest contrast, at the end of the list rather than
 * tucked beneath it.
 */
export function WhoFor() {
  return (
    <section
      aria-labelledby="who-title"
      className="bg-sand-100 py-20 sm:py-24 lg:py-28"
    >
      <h2 id="who-title" className="sr-only">
        Who this is for
      </h2>

      <Container>
        <Label className="mb-12">Ten men</Label>

        <ul className="max-w-4xl">
          {anchored.who.forMen.map((line) => (
            <li
              key={line}
              className="anchored-rise group flex items-baseline border-t border-sand-400 py-7"
            >
              <span
                aria-hidden="true"
                className="mt-[0.7em] h-px w-0 shrink-0 bg-gold-700 transition-[width] duration-500 ease-ios group-hover:w-7"
              />
              <span className="font-display text-[clamp(1.25rem,1.05rem+1.1vw,2rem)]/[1.22] font-medium text-balance text-charcoal transition-[padding] duration-500 ease-ios group-hover:pl-5">
                {line}
              </span>
            </li>
          ))}
        </ul>

        <p className="anchored-rise mt-12 max-w-2xl bg-charcoal p-8 font-display text-[clamp(1.0625rem,1rem+0.4vw,1.25rem)]/[1.45] font-medium text-balance text-ivory sm:p-10 lg:ml-auto">
          {anchored.who.notFor}
        </p>
      </Container>
    </section>
  );
}

/**
 * The host.
 *
 * The portrait the owner supplied for this page: 637×638, near enough square,
 * shot indoors. It is displayed at 256–288px, comfortably under native, so it
 * stays crisp; `sizes` matches so no larger variant is requested than exists.
 * The source is a 434 KB PNG — next/image re-encodes it to WebP or AVIF on
 * serve, so what a visitor downloads is a fraction of that.
 *
 * Set against the copy rather than beside it: the portrait runs off the top
 * of the text block and the paragraph is hung level with his shoulders, which
 * is a composition rather than two columns.
 *
 * ⚠️ No Guidance for Generations branding, by instruction. This page carries
 * Imam Shuaib's mark only.
 */
export function Host() {
  return (
    <section
      aria-labelledby="host-title"
      className="bg-ivory py-20 sm:py-24 lg:py-28"
    >
      <h2 id="host-title" className="sr-only">
        About Imam Shuaib
      </h2>

      <Container>
        <div className="anchored-rise flex flex-col gap-10 sm:flex-row sm:items-end sm:gap-14 lg:gap-20">
          <Image
            src="/images/imam-shuaib-portrait.png"
            alt="Imam Shuaib, in a grey thobe and cream kufi"
            width={637}
            height={638}
            sizes="(min-width: 640px) 288px, 256px"
            className="w-64 shrink-0 rounded-[2px] object-cover sm:w-72"
          />

          <div className="max-w-xl sm:pb-4">
            <Label>Imam Shuaib</Label>
            <p className="mt-8 font-display text-[clamp(1.375rem,1.1rem+1.3vw,2.125rem)]/[1.22] font-medium text-balance text-charcoal">
              {anchored.about}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
