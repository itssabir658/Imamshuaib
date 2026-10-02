import type { TourMotif } from "@/content/tour";
import { cn } from "@/lib/cn";

/**
 * Six architectural line marks for the highlight cards.
 *
 * Same contract as ServiceIcon: a 24px grid, 1.5 stroke, round caps, no
 * fills — so these sit beside the site's existing icon set without looking
 * borrowed. Every one is drawn from the building it names rather than from a
 * generic "mosque" glyph, which is the difference between architecture and
 * clip art.
 *
 * Decorative by definition: each sits above its own visible heading.
 */
const paths: Record<TourMotif, React.ReactNode> = {
  // The sanctuary: the silver dome of Al-Aqsa over its arcaded platform.
  dome: (
    <>
      <path d="M7.4 11.2c0-2.6 2.1-4.1 4.6-6 2.5 1.9 4.6 3.4 4.6 6" />
      <path d="M12 5.2V3.4" />
      <path d="M7.4 11.2h9.2v2.2H7.4z" />
      <path d="M4 20.6V13.4h16v7.2" />
      <path d="M4 16.8h16" />
      <path d="M2.6 20.6h18.8" />
    </>
  ),
  // Qubbat al-Sakhra: ogee dome on an octagonal drum, finial on top.
  rock: (
    <>
      <path d="M8 9.8c0-2.2 1.2-3.4 4-6 2.8 2.6 4 3.8 4 6" />
      <path d="M12 3.8V2.4" />
      <path d="M6.6 9.8h10.8" />
      <path d="M6.6 9.8 5 12.6v8h14v-8l-1.6-2.8" />
      <path d="M9 20.6v-4.2a3 3 0 0 1 6 0v4.2" />
      <path d="M3.4 20.6h17.2" />
    </>
  ),
  // The Old City: crenellated wall with a pointed gate.
  walls: (
    <>
      <path d="M2.6 20.4V9.6h18.8v10.8" />
      <path d="M2.6 9.6V7.2h2.6v2.4m2.6 0V7.2h2.6v2.4m2.6 0V7.2h2.6v2.4m2.6 0V7.2h2.6v2.4" />
      <path d="M9.4 20.4v-4.1a2.6 2.6 0 0 1 5.2 0v4.1" />
      <path d="M1.4 20.4h21.2" />
    </>
  ),
  // Al-Haram Al-Ibrahimi: a tall pointed opening in Herodian ashlar. The
  // opening is pointed where the city wall's is round, so the two silhouettes
  // do not read as the same icon twice.
  cave: (
    <>
      <path d="M3.4 20.4V5.2h17.2v15.2" />
      <path d="M3.4 9.2h17.2" />
      <path d="M8.2 5.2v4M15.8 5.2v4" />
      <path d="M8.6 20.4v-7.1L12 9.4l3.4 3.9v7.1" />
      <path d="M1.8 20.4h20.4" />
    </>
  ),
  // A mosque lamp on its chain — the Mamluk endowments.
  lantern: (
    <>
      <path d="M12 2.2v1.3" />
      <path d="M8.4 4.5h7.2" />
      <path d="M9.9 4.5 10.4 8.3M14.1 4.5 13.6 8.3" />
      <path d="M10.4 8.3c-2.7 1.1-4.3 3.1-4.3 5.6a5.9 5.9 0 0 0 11.8 0c0-2.5-1.6-4.5-4.3-5.6" />
      <path d="M12 19.8v1.5M10.4 21.3h3.2" />
    </>
  ),
  // Taught on site: an open book under the arch of a doorway.
  book: (
    <>
      <path d="M12 9.6c-1.3-1-2.8-1.5-4.8-1.5H4.6v9.4h2.6c2 0 3.5.5 4.8 1.5 1.3-1 2.8-1.5 4.8-1.5h2.6V8.1h-2.6c-2 0-3.5.5-4.8 1.5Z" />
      <path d="M12 9.6v8.9" />
      <path d="M8.6 5.6a3.4 3.4 0 0 1 6.8 0" />
    </>
  ),
};

export function Motif({
  name,
  className,
}: {
  name: TourMotif;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-7", className)}
    >
      {paths[name]}
    </svg>
  );
}
