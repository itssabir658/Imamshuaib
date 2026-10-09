import { cn } from "@/lib/cn";

/**
 * `tone` picks the palette, not the brightness — `onDark` still does that.
 * "warm" is the stone ground shared with /al-aqsa and the home page; "brand"
 * is the teal the rest of the site runs on. Added rather than swapped so the
 * teal pages are untouched.
 *
 * Measured. Warm on light: gold-800 6.3:1 on ivory, charcoal 16.4:1,
 * charcoal-600 9.0:1. Warm on dark: gold-400 8.9:1 on charcoal, ivory 16.4:1,
 * sand-300 9.6:1.
 */
export type HeadingTone = "brand" | "warm";

export function Eyebrow({
  children,
  onDark = false,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  tone?: HeadingTone;
  className?: string;
}) {
  const warm = tone === "warm";
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow font-semibold uppercase",
        warm
          ? onDark
            ? "text-gold-400"
            : "text-gold-800"
          : onDark
            ? "text-gold-300"
            : "text-teal-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          warm
            ? onDark
              ? "bg-sand-500"
              : "bg-sand-400"
            : onDark
              ? "bg-gold-300/60"
              : "bg-teal-600/40",
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
  tone = "brand",
  align = "start",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  onDark?: boolean;
  tone?: HeadingTone;
  align?: "start" | "center";
  className?: string;
}) {
  const warm = tone === "warm";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow onDark={onDark} tone={tone}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-h2 font-bold",
          warm
            ? onDark
              ? "text-ivory"
              : "text-charcoal"
            : onDark && "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-[35rem] text-lead",
            warm
              ? onDark
                ? "text-sand-300"
                : "text-charcoal-600"
              : onDark
                ? "text-teal-100/85"
                : "text-body",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
