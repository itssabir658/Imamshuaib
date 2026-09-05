import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * The masthead every page below the home page opens on.
 *
 * Deliberately one shape rather than a bespoke header per route: the home page
 * already carries the site's one big composition, and giving every inner page
 * its own would leave the site feeling like eight sites. The variation that
 * matters here is the words.
 *
 * Light ground throughout, which is why "/" is the only entry in the header's
 * DARK_HERO_ROUTES — the sticky header keeps its dark-on-light palette here.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  align = "start",
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  /** Calls to action, meta, or anything else below the lead. */
  children?: React.ReactNode;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative isolate overflow-hidden border-b border-line bg-canvas pt-14 pb-14 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="pattern-khatim absolute inset-0 text-teal-900/[0.04]" />
      </div>

      <Container>
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
          <h1 id="page-title" className="mt-5 text-h1 font-bold text-ink">
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-5 max-w-[36rem] text-lead text-body",
                centered && "mx-auto",
              )}
            >
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
