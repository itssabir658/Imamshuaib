import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { withHonorific } from "./Honorific";
import { Label } from "./Type";

/**
 * The four teaching sessions.
 *
 * The numerals are the graphic. At 2rem they were punctuation; at this size
 * they are the only large element on a band of otherwise quiet text, set in
 * sand so they read as texture rather than as something to be read, with the
 * title sitting hard against them. A page with no photography has to get its
 * weight from somewhere, and oversized figures are the oldest answer in
 * editorial design to exactly that problem.
 *
 * They are `aria-hidden` — the ordered list already carries the sequence —
 * and sand-300 is 2.1:1 on sand-50, which is fine for something nobody has
 * to read and would not be if the number carried any information. The
 * accessible order comes from the `<ol>`.
 *
 * sr-only heading: see the note in Promises.tsx.
 */
export function TheWork() {
  return (
    <section
      aria-labelledby="work-title"
      className="bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <h2 id="work-title" className="sr-only">
        The work
      </h2>

      <Container>
        <Label className="mb-14">Four sessions</Label>

        <ol className="flex flex-col">
          {anchored.work.map((w, i) => (
            <li
              key={w.title}
              className="anchored-rise group relative grid gap-x-12 gap-y-5 border-t border-sand-400 py-10 sm:py-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]"
            >
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -left-2 font-display text-[clamp(4.5rem,3rem+5vw,8rem)] leading-none font-bold tabular-nums text-sand-300 transition-colors duration-700 ease-ios select-none group-hover:text-sand-400 sm:-top-8"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="relative max-w-[16ch] font-display text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)]/[1.15] font-bold tracking-[-0.018em] text-balance text-charcoal">
                  {w.title}
                </h3>
              </div>

              <p className="max-w-[34rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600 lg:pt-1">
                {withHonorific(w.body)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
