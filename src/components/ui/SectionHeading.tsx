import { cn } from "@/lib/cn";

/**
 * Measured: gold-800 is 6.3:1 on the canvas, gold-300 10.6:1 on charcoal.
 *
 * The `tone` prop that existed while only the home page was warm is gone —
 * the whole site is on the stone ground now, so there is one palette and
 * nothing to choose between.
 */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow font-semibold uppercase",
        onDark ? "text-gold-300" : "text-gold-800",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          onDark ? "bg-sand-500" : "bg-sand-400",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  onDark = false,
  align = "start",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  onDark?: boolean;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn("text-h2 font-bold", onDark && "text-ivory")}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-[35rem] text-lead",
            onDark ? "text-sand-300" : "text-body",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
