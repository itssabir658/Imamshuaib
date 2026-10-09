import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";

/**
 * What the weekend is: three claims, three columns.
 *
 * No visible section heading. The copy document's CAPS labels ("SECTION 2:
 * WHAT THIS WEEKEND IS") are explicitly structural notes to the designer and
 * must not be published, and inventing a heading in their place would be
 * publishing one by another name. The heading here is sr-only, so the page
 * still has an outline a screen reader can navigate without putting words on
 * the page that nobody wrote.
 *
 * Each item carries its own top rule and there is no column gap, so on a wide
 * screen the three rules meet into one continuous line across the page.
 */
export function Promises() {
  return (
    <section aria-labelledby="promises-title" className="bg-ivory pb-20 sm:pb-24 lg:pb-28">
      <h2 id="promises-title" className="sr-only">
        What this weekend is
      </h2>

      <Container>
        <ul className="grid lg:grid-cols-3">
          {anchored.promises.map((p) => (
            <li
              key={p.lead}
              className="anchored-rise border-t border-sand-400 pt-8 pb-9 last:pb-0 lg:pt-10 lg:pr-12 lg:pb-0"
            >
              <h3 className="font-display text-h3 font-bold text-charcoal">
                {p.lead}
              </h3>
              <p className="mt-4 max-w-sm font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
