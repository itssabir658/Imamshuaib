import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";

/**
 * What the weekend is: three claims, stepped.
 *
 * Three equal columns said the three were interchangeable. They are not —
 * they build, from a thing you notice on the Sunday to a thing you still have
 * in March. So each one is a full-width row, each steps further right than
 * the last, and the lead phrase is set at headline scale with the body hung
 * off it. The indent is the argument.
 *
 * No visible section heading. The copy document's CAPS labels ("SECTION 2:
 * WHAT THIS WEEKEND IS") are explicitly structural notes to the designer and
 * must not be published, and inventing a heading in their place would be
 * publishing one by another name. The heading here is sr-only, so the page
 * keeps an outline a screen reader can navigate without putting words on it
 * that nobody wrote.
 */
const STEP = ["lg:ml-0", "lg:ml-[12%]", "lg:ml-[24%]"];

export function Promises() {
  return (
    <section
      aria-labelledby="promises-title"
      className="bg-ivory pb-20 sm:pb-24 lg:pb-32"
    >
      <h2 id="promises-title" className="sr-only">
        What this weekend is
      </h2>

      <Container>
        <ul className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
          {anchored.promises.map((p, i) => (
            <li
              key={p.lead}
              className={`anchored-rise max-w-3xl border-t border-sand-400 pt-8 ${STEP[i]}`}
            >
              <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
                <h3 className="font-display text-[clamp(1.5rem,1.25rem+1.1vw,2.125rem)]/[1.1] font-bold tracking-[-0.022em] text-balance text-charcoal">
                  {p.lead}
                </h3>
                <p className="max-w-[30rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
