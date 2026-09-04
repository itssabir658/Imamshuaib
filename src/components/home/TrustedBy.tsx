import Image from "next/image";
import { partners } from "@/content/site";
import { Container } from "@/components/ui/Container";

/**
 * The partner marks, running as a seamless horizontal ticker.
 *
 * The track slides by exactly -50%, so its second half lands where the first
 * began and the loop has no seam. Four repeats rather than two, because the
 * animated half must itself be wider than the viewport — with two, a single
 * pass of the five marks (~1180px) is narrower than a desktop viewport and a
 * gap opens at the trailing edge. Only the first pass is in the accessibility
 * tree; the rest are decorative.
 *
 * The marks are white-on-transparent, so this band has to stay dark.
 */
export function TrustedBy() {
  const REPEATS = 4;
  const track = Array.from({ length: REPEATS }, () => partners).flat();

  return (
    <section
      aria-labelledby="trusted-by"
      className="border-t border-white/10 bg-teal-950 py-12 sm:py-14"
    >
      <Container>
        <h2
          id="trusted-by"
          className="text-center font-sans text-eyebrow font-semibold text-teal-100/70 uppercase"
        >
          Trusted by institutions and communities
        </h2>
      </Container>

      <div className="marquee-viewport relative mt-9">
        <ul className="marquee-track items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20">
          {track.map((p, i) => {
            const duplicate = i >= partners.length;
            return (
              <li
                key={`${p.src}-${i}`}
                aria-hidden={duplicate || undefined}
                className="flex shrink-0 items-center"
              >
                <Image
                  src={p.src}
                  alt={duplicate ? "" : p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="240px"
                  className="h-11 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
