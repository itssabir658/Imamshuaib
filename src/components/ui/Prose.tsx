import type { ArticleBlock, LegalSection } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Long-form typography.
 *
 * Measure is capped in rem rather than `ch`: `ch` is the advance width of the
 * font's zero, so a ch-based measure silently changes width when the font does.
 * 36rem lands at roughly 68 characters in Montserrat at this size, which is
 * inside the comfortable 65–75 band.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[36rem] text-body", className)}>{children}</div>
  );
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <Prose className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-6 text-h3 font-bold text-ink first:mt-0"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <figure
              key={i}
              className="my-2 border-l-[3px] border-gold-500 py-1 pl-6"
            >
              <blockquote className="font-display text-quote font-medium text-ink">
                &ldquo;{block.text}&rdquo;
              </blockquote>
              {block.attribution ? (
                <figcaption className="mt-3 text-sm font-medium text-muted">
                  {block.attribution}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        return (
          <p key={i} className="text-[1.0625rem]/[1.75]">
            {block.text}
          </p>
        );
      })}
    </Prose>
  );
}

/** Privacy and terms share this shape. */
export function LegalBody({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="flex max-w-[38rem] flex-col gap-12">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-h3 font-bold text-ink">{section.heading}</h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.body.map((paragraph, i) => {
              const isTodo = paragraph.startsWith("⚠️");
              return (
                <p
                  key={i}
                  className={cn(
                    "text-[1.0625rem]/[1.75]",
                    isTodo
                      ? "rounded-xl border border-gold-300 bg-gold-50 px-5 py-4 text-[0.9375rem]/[1.7] text-gold-900"
                      : "text-body",
                  )}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
