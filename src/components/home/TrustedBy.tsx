import Image from "next/image";
import { partners } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by"
      className="border-t border-white/10 bg-teal-950 py-10 sm:py-12"
    >
      <Container>
        <h2
          id="trusted-by"
          className="text-center font-sans text-eyebrow font-semibold text-teal-100/70 uppercase"
        >
          Trusted by institutions and communities
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-14">
          {partners.map((p) => (
            <li key={p.src} className="flex items-center">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 40vw, 160px"
                className="h-8 w-auto opacity-65 transition-opacity duration-300 hover:opacity-100 sm:h-9"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
