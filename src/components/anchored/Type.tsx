import { anchored } from "@/content/anchored";
import { ANCHORED_TOPIC } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Where every "reserve" control on the page points.
 *
 * The form, always. There is no online checkout by design — every seat is
 * confirmed personally — so there is no payment destination to fall back
 * from, and nothing here that could point somewhere half-wired.
 */
export const RESERVE_HREF = `/contact?program=${ANCHORED_TOPIC}`;

/**
 * The small engraved label — the page's running quiet voice beside the big
 * display type.
 *
 * Tighter and more letterspaced than the site's `Eyebrow`: at this size and
 * tracking it reads as something stamped rather than something styled, which
 * is most of what separates an invitation from a landing page.
 */
export function Label({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  /** "clay" is not a style preference — sand-300 measures 4.48:1 on the clay
    *  ground, two hundredths under the bar, so that ground gets sand-200 at
    *  5.6:1 instead. Measured, not eyeballed. */
  tone?: "ink" | "paper" | "clay" | "gold";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] uppercase",
        tone === "ink" && "text-sand-700",
        tone === "paper" && "text-sand-300",
        tone === "clay" && "text-sand-200",
        tone === "gold" && "text-gold-800",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Khatim — the eight-point star, two squares at 45°. Used as a fleuron. */
export function Khatim({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className={cn("size-3.5", className)}
    >
      <path d="M3.5 3.5h17v17h-17z" />
      <path d="M12 1.6 22.4 12 12 22.4 1.6 12Z" />
    </svg>
  );
}

/**
 * The hairline that divides the page, with the khatim set in a break in it.
 *
 * This is the seam between sections instead of a change of background colour:
 * the page should read as one continuous document rather than a stack of
 * bands, and a ruled break is how print has always done that.
 *
 * It also draws itself as it comes into view, outward from the fleuron. The
 * hairline is the page's entire visual vocabulary, so it is the thing that
 * should move — a generic fade on the whole block would be motion borrowed
 * from somewhere else. See the scroll-timeline rules in globals.css; where
 * they are unsupported the rule is simply already drawn.
 */
export function Rule({
  tone = "ink",
  fleuron = true,
  className,
}: {
  tone?: "ink" | "paper";
  fleuron?: boolean;
  className?: string;
}) {
  const line = tone === "ink" ? "bg-sand-400" : "bg-sand-500/45";
  const mark = tone === "ink" ? "text-sand-500" : "text-sand-500/70";

  return (
    <div aria-hidden="true" className={cn("flex items-center", className)}>
      <span className={cn("anchored-draw-l h-px flex-1", line)} />
      {fleuron ? (
        <>
          <Khatim
            className={cn("anchored-draw-mark mx-5 shrink-0", mark)}
          />
          <span className={cn("anchored-draw-r h-px flex-1", line)} />
        </>
      ) : null}
    </div>
  );
}

/**
 * The scale of the thing, stated rather than counted.
 *
 * This was an "X of 10 seats remaining" counter. It came out on 11 October at
 * Imam Shuaib's request: nothing was wired to it, so it was a number that
 * could only ever drift out of date, and a stale count on a ten-seat retreat
 * is worse than none.
 *
 * The ten marks stay, because they are now literal rather than a gauge — ten
 * marks for ten seats, all identical, so nothing in them can be read as an
 * availability reading. They are aria-hidden; the sentence carries the fact,
 * since a screen reader hearing "diamond" ten times gets less information,
 * not more.
 */
export function SeatsLine({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const ink = tone === "ink";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      <span aria-hidden="true" className="flex items-center gap-[0.3125rem]">
        {Array.from({ length: anchored.seatsTotal }, (_, i) => (
          <span
            key={i}
            className={cn(
              "size-1.5 rotate-45",
              ink ? "bg-gold-600" : "bg-gold-400",
            )}
          />
        ))}
      </span>

      <p
        className={cn(
          "font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] uppercase",
          ink ? "text-gold-800" : "text-gold-300",
        )}
      >
        {anchored.seatsLine}
      </p>
    </div>
  );
}

/**
 * The one button shape on the page: square-cornered, letterspaced caps.
 *
 * The rest of the site uses pills. This page is a printed invitation to ten
 * men, not a product surface, and the squared edge is most of what carries
 * that difference.
 *
 * It lifts a pixel under the cursor and sinks under a press. That pair is
 * what makes a control feel like a physical thing rather than a coloured
 * rectangle, and the press state is the half most pages forget — it is the
 * only feedback a touch device gets at all, since it never hovers. Both are
 * `motion-safe`, so a reduced-motion setting leaves the colour change and
 * drops the movement.
 */
export function Reserve({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <a href={RESERVE_HREF} className={cn(reserveClasses(tone), className)}>
      {children}
    </a>
  );
}

/** Shared so the deposit step's button is the same object, not a copy. */
export function reserveClasses(tone: "ink" | "paper" = "ink") {
  return cn(
    "inline-flex h-13 items-center justify-center rounded-[2px] px-9",
    "font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
    "transition-[background-color,transform,box-shadow] duration-300 ease-ios",
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0",
    "motion-safe:active:scale-[0.985] active:duration-75",
    tone === "ink"
      ? "bg-charcoal text-ivory hover:bg-charcoal-800 hover:shadow-[0_12px_28px_-16px_rgb(28_26_23/0.7)]"
      : "bg-ivory text-charcoal hover:bg-sand-100 hover:shadow-[0_12px_28px_-16px_rgb(0_0_0/0.8)]",
  );
}
