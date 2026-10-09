import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "ink" | "line";
type Size = "md" | "lg";

/**
 * Contrast notes (WCAG 2.1 AA):
 *  primary   — white on teal-600 .......... 6.1:1
 *  gold      — ink on gold-500 ............ 6.5:1
 *  secondary — teal-700 on light glass .... 7.4:1 on canvas
 *  ghost     — white on dark glass ........ >10:1 over the teal bands
 *
 * The two brand CTAs stay OPAQUE. A primary call to action that frosts is the
 * common way glass goes wrong — it costs contrast exactly where it matters and
 * makes the most important control the least legible one. They get the
 * specular top edge instead, so they still read as part of the same material.
 *
 * The two secondary variants are real glass: heavy blur plus saturate to put
 * back the colour the blur greys out, an inset highlight for the light catching
 * the lip, and an inner bottom shadow for thickness.
 *
 * `ink` and `line` belong to the warm-stone ground the home page uses — the
 * same palette as /al-aqsa. They are flat and square-ish rather than glass:
 * frosted material on paper reads as haze, and the point of that ground is
 * that it looks printed. Measured: ivory on charcoal 16.4:1, charcoal on
 * ivory 16.4:1, and `line`'s border is sand-500 at 3.2:1, which clears the
 * 3:1 WCAG 1.4.11 asks of a control boundary.
 */
const variants: Record<Variant, string> = {
  primary:
    "glass-btn bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_24px_-14px_rgb(18_56_58/0.7)]",
  gold:
    "glass-btn bg-gold-500 text-teal-950 hover:bg-gold-400 active:bg-gold-600 " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.38),0_10px_24px_-14px_rgb(104_72_17/0.55)]",
  secondary:
    "glass-btn glass-rim-light glass-refract-sm bg-surface/50 text-teal-700 " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),inset_0_-10px_20px_rgb(16_38_42/0.05),0_10px_28px_-16px_rgb(16_38_42/0.35)] " +
    "hover:bg-surface/70 hover:shadow-[inset_0_1px_0_rgb(255_255_255/1),inset_0_-10px_20px_rgb(16_38_42/0.05),0_18px_38px_-18px_rgb(16_38_42/0.45)] " +
    "active:shadow-[inset_0_1px_0_rgb(255_255_255/0.7),inset_0_2px_6px_rgb(16_38_42/0.12)]",
  ink:
    "bg-charcoal text-ivory hover:bg-charcoal-800 " +
    "transition-[background-color,transform,box-shadow] duration-300 ease-ios " +
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.985] " +
    "hover:shadow-[0_12px_28px_-16px_rgb(28_26_23/0.7)]",
  line:
    "border border-sand-500 bg-transparent text-charcoal hover:border-charcoal hover:bg-sand-50 " +
    "transition-[background-color,border-color,transform] duration-300 ease-ios " +
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.985]",
  ghost:
    "glass-btn glass-rim glass-refract-sm bg-white/[0.09] text-white " +
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_-10px_20px_rgb(0_0_0/0.12),0_10px_30px_-14px_rgb(0_0_0/0.5)] " +
    "hover:bg-white/[0.16] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),inset_0_-10px_20px_rgb(0_0_0/0.12),0_20px_40px_-16px_rgb(0_0_0/0.6)] " +
    "active:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),inset_0_2px_8px_rgb(0_0_0/0.35)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "whitespace-nowrap";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ButtonAction({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Chevron that nudges on hover — used inside buttons and text links. */
export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "size-4 transition-transform duration-200 ease-out-soft group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5",
        className,
      )}
    >
      <path
        d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline text link with the same affordance as the buttons. */
export function TextLink({
  href,
  children,
  className,
  onDark = false,
  tone = "brand",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
  /** "warm" is the stone ground shared with /al-aqsa and the home page.
   *  gold-800 is 6.3:1 on ivory, gold-300 10.6:1 on charcoal. */
  tone?: "brand" | "warm";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline",
        tone === "warm"
          ? onDark
            ? "text-gold-300"
            : "text-gold-800"
          : onDark
            ? "text-gold-300"
            : "text-teal-700",
        className,
      )}
    >
      {children}
      <ArrowRight />
    </Link>
  );
}
