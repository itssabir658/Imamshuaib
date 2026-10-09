import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label } from "./Type";

/**
 * The schedule: three days, three columns.
 *
 * ⚠️ NO CLOCK TIMES. The brief is explicit — "Do not add prayer clock times
 * anywhere. The schedule intentionally names prayers without times." Nothing
 * here computes, formats or displays a time, and the only time string on the
 * page is "12:00 PM departure", which is in the copy itself. If a future
 * change makes this component take a `time` field, that instruction has been
 * broken.
 *
 * Each day is an ordered list, because the order is the information. The days
 * sit under their own top rule with no column gap, so on a wide screen the
 * three rules meet into one line across the page.
 */
export function Weekend() {
  return (
    <section
      aria-labelledby="weekend-title"
      className="bg-ivory py-20 sm:py-24 lg:py-28"
    >
      <h2 id="weekend-title" className="sr-only">
        The weekend
      </h2>

      <Container>
        <Label className="mb-12">Two nights</Label>

        <div className="grid lg:grid-cols-3">
          {anchored.schedule.map((day) => (
            <div
              key={day.day}
              className="border-t border-sand-400 pt-8 pb-10 last:pb-0 lg:pt-10 lg:pr-12 lg:pb-0"
            >
              <h3 className="font-display text-h3 font-bold text-charcoal">
                {day.day}
              </h3>

              <ol className="mt-6 space-y-3.5">
                {day.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3.5 font-sans text-[0.9375rem]/snug text-charcoal-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3 shrink-0 bg-sand-500"
                    />
                    <span className="max-w-[22rem]">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
