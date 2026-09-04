import { testimonials } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <Section labelledBy="testimonials-title" tone="sand">
      <SectionHeading
        id="testimonials-title"
        eyebrow="In their words"
        title="What students and families say"
        align="center"
        className="mx-auto max-w-2xl"
      />

      {/* Deliberately NOT shaped like the services cards above. Those are
          bordered, shadowed and evenly padded; these are flat with a gold
          left rule. While the headings were a serif and the body a sans, the
          family switch alone separated the two three-up grids — now the card
          shell has to do it. */}
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.id}>
            <figure className="flex h-full flex-col rounded-r-card border-l-[3px] border-gold-500 bg-surface py-7 pr-7 pl-7">
              <blockquote className="grow font-display text-quote font-medium text-ink">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <figcaption className="mt-6 border-t border-line pt-5 font-sans text-sm">
                <span className="block font-semibold text-ink">{t.name}</span>
                {t.role ? (
                  <span className="mt-0.5 block text-muted">{t.role}</span>
                ) : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
