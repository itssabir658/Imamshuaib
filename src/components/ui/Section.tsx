import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "deep" | "sand";

const toneClasses: Record<Tone, string> = {
  canvas: "bg-canvas text-body",
  surface: "bg-surface text-body",
  sand: "bg-teal-50 text-body",
  deep: "bg-teal-900 text-teal-100",
};

export function Section({
  tone = "canvas",
  id,
  className,
  containerClassName,
  children,
  labelledBy,
  aura = false,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  labelledBy?: string;
  /** Lays soft brand-coloured light behind the section. Glass has nothing to
   *  refract over a flat colour, so any section carrying frosted surfaces
   *  needs this — without it the frost reads as a plain translucent box. */
  aura?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative py-16 sm:py-20 lg:py-28",
        toneClasses[tone],
        aura && "isolate overflow-hidden",
        className,
      )}
    >
      {aura ? <Aura tone={tone} /> : null}
      <Container className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}

/** Two drifting pools of brand light. Deliberately weak — this is atmosphere
 *  for the glass to pick up, not a visible gradient. */
function Aura({ tone }: { tone: Tone }) {
  const onDark = tone === "deep";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className={cn(
          "aura -top-24 -left-32 h-[26rem] w-[26rem]",
          onDark ? "bg-teal-400/25" : "bg-teal-300/30",
        )}
      />
      <div
        className={cn(
          "aura -right-24 -bottom-16 h-[30rem] w-[30rem]",
          onDark ? "bg-gold-500/15" : "bg-gold-300/25",
        )}
      />
    </div>
  );
}
