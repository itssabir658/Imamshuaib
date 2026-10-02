import { cn } from "@/lib/cn";

/**
 * A two-centre pointed arch, drawn as a line not a silhouette.
 *
 * This is the page's one structural idea. The registration QR does not sit on
 * a floating white card with a drop shadow — it sits inside a niche, the way
 * the thing you are facing sits inside a mihrab. One architectural gesture,
 * drawn in hairline and repeated twice, does the work that a photograph would
 * otherwise have to do.
 *
 * The geometry is real rather than eyeballed. For a two-centre arch the two
 * centres sit on the springing line, and the radius that puts the arc through
 * both the springing point and the apex is
 *
 *     r = (halfSpan² + rise²) / (2 · halfSpan)
 *
 * so the caller gives a span and a rise and gets a correct arch, instead of a
 * bezier that approximately looks like one. Raising the rise sharpens the
 * point; dropping it flattens the arch towards a segmental one.
 */
export function archPath(
  x0: number,
  x1: number,
  springY: number,
  apexY: number,
  baseY: number,
) {
  const halfSpan = (x1 - x0) / 2;
  const mid = (x0 + x1) / 2;
  const rise = springY - apexY;
  const r = (halfSpan * halfSpan + rise * rise) / (2 * halfSpan);

  return (
    `M${x0} ${baseY}L${x0} ${springY}` +
    `A${r} ${r} 0 0 1 ${mid} ${apexY}` +
    `A${r} ${r} 0 0 1 ${x1} ${springY}` +
    `L${x1} ${baseY}`
  );
}

const W = 360;
const H = 520;
const OUTER = archPath(0.6, W - 0.6, 250, 12, H);
const INNER = archPath(11, W - 11, 250, 27, H);

/**
 * The niche itself: a recess in the paper, a double rule around it.
 *
 * `aspect-[360/520]` on the wrapper matches the viewBox exactly, so the arch
 * is never stretched and the stroke stays one true hairline at every width.
 */
export function ArchFrame({
  tone = "ink",
  className,
  children,
}: {
  tone?: "ink" | "paper";
  className?: string;
  children: React.ReactNode;
}) {
  const ink = tone === "ink";

  return (
    <div className={cn("relative isolate aspect-[360/520]", className)}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 size-full"
      >
        {/* The recess is light in BOTH tones. On ivory it is a half-step of
            paper and reads as a shadowed niche; on charcoal it reads as a lit
            opening in a dark wall, which is the better image anyway — and it
            keeps the QR code inside it dark-on-light. Inverted QR codes are
            read by most phones and not by all, and this is the one element on
            the page that has no second chance. */}
        <path
          d={`${OUTER}Z`}
          className={ink ? "fill-sand-50" : "fill-ivory"}
        />
        {/* Hairlines. vector-effect keeps them one pixel however far the
            viewBox is scaled, which is the whole reason this is SVG and not
            a border-radius. */}
        <path
          d={OUTER}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          className={ink ? "stroke-sand-500" : "stroke-sand-500/60"}
        />
        <path
          d={INNER}
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
          className={ink ? "stroke-sand-400" : "stroke-sand-500/35"}
        />
      </svg>
      {children}
    </div>
  );
}
