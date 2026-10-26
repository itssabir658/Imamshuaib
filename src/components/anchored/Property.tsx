import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { withHonorific } from "./Honorific";
import { Label } from "./Type";

/**
 * The land.
 *
 * Five lines, on clay, set as large as the page allows. These are the most
 * concrete sentences in the whole document — a horse, a bow, a fire, a hot
 * tub, a cook — and they were previously a quiet ruled list on paper, which
 * is the one treatment that makes concrete writing abstract again.
 *
 * No icons. Four line glyphs for horse / bow / fire / tub is the exact move
 * that makes a page look assembled rather than written, and these sentences
 * do not need help.
 *
 * Clay rather than charcoal: the page already carries three dark bands, and
 * clay is only 2.15:1 against charcoal, so the two can never touch. There is
 * paper on both sides of this one.
 *
 * THE GALLERY IS PLAIN <img>, NOT next/image, and that is deliberate. The
 * project is at 75% of Vercel's free image-optimisation allowance; fourteen
 * more images through the optimiser would finish it, and these are fixed
 * photographs that never need resizing on the fly. They are converted to
 * WebP ahead of time at two widths, with the srcset written by hand, so the
 * browser still picks the right one and nothing is served larger than the
 * slot it lands in.
 */
export function Property() {
  return (
    <section
      aria-labelledby="property-title"
      className="bg-clay py-20 sm:py-24 lg:py-28"
    >
      <h2 id="property-title" className="sr-only">
        The property
      </h2>

      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-24">
          <Label tone="clay" className="shrink-0 lg:w-40 lg:pt-5">
            {anchored.shortPlace}
          </Label>

          <ul className="max-w-3xl">
            {anchored.property.map((line) => (
              <li
                key={line}
                className="anchored-rise group flex items-baseline border-t border-ivory/25 py-7 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-px w-0 shrink-0 bg-gold-300 transition-[width] duration-500 ease-ios group-hover:w-7"
                />
                <span className="font-display text-[clamp(1.25rem,1.05rem+1.1vw,2rem)]/[1.22] font-medium text-balance text-ivory transition-[padding] duration-500 ease-ios group-hover:pl-5">
                  {withHonorific(line)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-3">
          {anchored.gallery.map((shot, i) => (
            <li key={shot.slug} className="anchored-rise">
              <img
                src={`/images/property/${shot.slug}.webp`}
                srcSet={`/images/property/${shot.slug}-500.webp 500w, /images/property/${shot.slug}.webp 1000w`}
                sizes="(min-width: 1024px) 22rem, 45vw"
                alt={shot.alt}
                width={1000}
                height={750}
                /* The first two are near the top of this section on a phone;
                   the rest can wait until they are scrolled towards. */
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="aspect-[4/3] w-full rounded-[2px] bg-black/15 object-cover"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
