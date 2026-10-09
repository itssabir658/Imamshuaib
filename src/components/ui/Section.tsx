import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "deep" | "sand" | "ivory" | "stone" | "ink";

const toneClasses: Record<Tone, string> = {
  canvas: "bg-canvas text-body",
  surface: "bg-surface text-body",
  sand: "bg-teal-50 text-body",
  deep: "bg-teal-900 text-teal-100",
  // The warm-stone ground, shared with /al-aqsa. Kept as additional tones
  // rather than a redefinition of the existing ones, so the teal pages are
  // untouched.
  ivory: "bg-ivory text-charcoal-600",
  stone: "bg-sand-50 text-charcoal-600",
  ink: "bg-charcoal text-sand-300",
};

export function Section({
  tone = "canvas",
  id,
  className,
  containerClassName,
  children,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        className,
      )}
    >
      <Container className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}

