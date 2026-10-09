import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * Six questions, answered in place.
 *
 * Not an accordion. Every answer here is one or two lines, so collapsing them
 * costs a tap and a state machine to hide nothing worth hiding — and on the
 * phone this page is mostly read on, an opened accordion is the same height
 * as the text was anyway. A definition list says what the structure is without
 * any of that.
 */
export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className="bg-sand-50 py-20 sm:py-24 lg:py-28"
    >
      <h2 id="faq-title" className="sr-only">
        Questions
      </h2>

      <Container>
        <Label className="mb-12">Before you ask</Label>

        {/* The closing rule is on the list, not on the last item: in a
            two-column grid "last" is one cell, and the bottom of the block
            would be ruled under one column and open under the other. */}
        <dl className="grid gap-x-16 border-b border-sand-400 lg:grid-cols-2">
          {anchored.faq.map((item) => (
            <div
              key={item.q}
              className="anchored-rise group -mx-4 border-t border-sand-400 px-4 py-8 transition-colors duration-500 ease-ios hover:bg-ivory"
            >
              <dt className="font-display text-h3 font-bold text-balance text-charcoal transition-colors duration-500 ease-ios group-hover:text-gold-800">
                {item.q}
              </dt>
              <dd className="mt-3 max-w-[28rem] font-sans text-[0.9375rem]/relaxed text-charcoal-600">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
