import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "md" | "lg";

/**
 * Contrast notes (WCAG 2.1 AA):
 *  primary   — white on teal-600 .......... 6.1:1
 *  gold      — ink on gold-500 ............ 6.5:1
 *  secondary — teal-700 on transparent .... 7.4:1 on canvas
 *  ghost     — white on teal-900 .......... 11.9:1
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 shadow-[0_10px_24px_-14px_rgba(18,56,58,0.7)]",
  gold: "bg-gold-500 text-teal-950 hover:bg-gold-400 active:bg-gold-600 shadow-[0_10px_24px_-14px_rgba(104,72,17,0.55)]",
  secondary:
    "border border-teal-600/30 bg-surface text-teal-700 hover:border-teal-600/60 hover:bg-teal-50",
  ghost:
    "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out-soft " +
  "hover:-translate-y-px active:translate-y-0 whitespace-nowrap";

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
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline",
        onDark ? "text-gold-300" : "text-teal-700",
        className,
      )}
    >
      {children}
      <ArrowRight />
    </Link>
  );
}
