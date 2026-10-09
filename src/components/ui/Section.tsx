import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "deep" | "sand";

const toneClasses: Record<Tone, string> = {
  canvas: "bg-canvas text-body",
  surface: "bg-surface text-body",
  // "sand" and "deep" are the warm stone ground now; "canvas" and "surface"
  // follow the tokens, which moved with them. The three extra tones added
  // while only the home page was warm are gone — they would be duplicates.
  sand: "bg-sand-100 text-body",
  deep: "bg-charcoal text-sand-300",
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

