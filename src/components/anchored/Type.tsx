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
 * This is the seam between sections instead of a change of background colour.
 * The page should read as one continuous document rather than a stack of
 * bands, and a ruled break is how print has always done that.
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
      <span className={cn("h-px flex-1", line)} />
      {fleuron ? (
        <>
          <Khatim className={cn("mx-5 shrink-0", mark)} />
          <span className={cn("h-px flex-1", line)} />
        </>
      ) : null}
    </div>
  );
}

/**
 * "X of 10 seats remaining."
 *
 * The brief asked for "a simple 'X seats remaining' field Imam Shuaib can
 * update" — `anchored.seatsRemaining` is that field. Setting it to null
 * removes the count from the page entirely, which is the right move the
 * moment nobody is keeping it current: a stale seat count on a ten-seat
 * retreat is worse than no seat count.
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

  const sold = left === 0;

  return (
    <p
      className={cn(
        "font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] uppercase",
        tone === "ink" ? "text-gold-800" : "text-gold-300",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mr-2.5 inline-block size-1.5 rounded-full align-middle",
          tone === "ink" ? "bg-gold-700" : "bg-gold-400",
        )}
      />
      {sold
        ? "All seats taken — ask about the waiting list"
        : `${left} of ${anchored.seatsTotal} seats remaining`}
    </p>
  );
}

/**
 * The one button shape on the page: square-cornered, letterspaced caps.
 *
 * The rest of the site uses pills. This page is a printed invitation to ten
 * men, not a product surface, and the squared edge is most of what carries
 * that difference.
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
    <a
      href={RESERVE_HREF}
      className={cn(
        "inline-flex h-13 items-center justify-center rounded-[2px] px-9",
        "font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
        "transition-colors duration-300 ease-ios",
        tone === "ink"
          ? "bg-charcoal text-ivory hover:bg-charcoal-800"
          : "bg-ivory text-charcoal hover:bg-sand-100",
        className,
      )}
    >
      {children}
    </a>
  );
}
