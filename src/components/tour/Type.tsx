import { cn } from "@/lib/cn";

/**
 * The small engraved label — the page's only running voice beside the big
 * display type.
 *
 * Deliberately tighter and more letterspaced than the site's `Eyebrow`: at
 * this size and tracking it reads as something stamped rather than something
 * styled, which is most of what separates an invitation from a landing page.
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

/**
 * Khatim — the eight-point star, two squares at 45°.
 *
 * Used as a fleuron: the mark that sits in a break in a rule. One device,
 * repeated at three sizes, is what makes the page read as having been set
 * rather than assembled.
 */
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
 * The whole point of the redesign is that the page reads as one continuous
 * document rather than a stack of bands, and a ruled break is how print has
 * always done that.
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
