import { anchored } from "@/content/anchored";
import { cn } from "@/lib/cn";

/**
 * Where every "reserve" control on the page points.
 *
 * `cardHref` is meant to be a Stripe-hosted destination — a Payment Link or a
 * server route that creates a Checkout Session. Either way the card details
 * are entered on Stripe's systems and never on this one, which is what keeps
 * the site out of PCI scope. Until it is set, the buttons fall back to the
 * contact form with the enquiry pre-labelled, so nobody taps Reserve and
 * lands nowhere.
 */
export const RESERVE_HREF =
  anchored.cardHref ?? "/contact?program=anchored-retreat";

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
  tone?: "ink" | "paper" | "gold";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] uppercase",
        tone === "ink" && "text-sand-700",
        tone === "paper" && "text-sand-300",
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
 * Seats remaining, drawn as well as counted.
 *
 * Ten marks, one per seat, filled while the seat is free and hollow once it
 * is gone. The retreat's own pitch is "Ten men. Two nights. One table." — ten
 * is small enough to show rather than state, and a row you can take in at a
 * glance does more for scarcity than a number does. It is also the one piece
 * of information on this page that changes, so it is worth a picture.
 *
 * The marks are aria-hidden; the sentence beside them carries the fact. A
 * screen reader hearing "diamond diamond diamond…" ten times would be getting
 * less information, not more.
 *
 * `anchored.seatsRemaining` is the field the brief asks Imam Shuaib to keep
 * current. Null removes the whole thing — the right move the moment nobody is
 * updating it, because a stale count on a ten-seat retreat is worse than no
 * count.
 */
export function SeatCount({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const left = anchored.seatsRemaining;
  if (left === null) return null;

  const total = anchored.seatsTotal;
  const ink = tone === "ink";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-3", className)}>
      <span aria-hidden="true" className="flex items-center gap-[0.3125rem]">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "size-1.5 rotate-45 transition-colors duration-500 ease-ios",
              i < left
                ? ink
                  ? "bg-gold-600"
                  : "bg-gold-400"
                : ink
                  ? "border border-sand-500/70"
                  : "border border-sand-500/50",
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
        {left === 0
          ? "All seats taken — ask about the waiting list"
          : `${left} of ${total} seats remaining`}
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
