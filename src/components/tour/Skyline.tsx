/**
 * The horizon the hero sits on: Al-Quds drawn as three receding layers of
 * flat silhouette.
 *
 * There is no photography of Jerusalem in this project and none that could be
 * used without a licence, so the alternative was either a stock image nobody
 * has cleared or a drawing. This is the drawing. It is built from the actual
 * forms — an ogee dome on an octagonal drum, Ottoman-period crenellations, a
 * two-centre arcade — rather than a generic skyline, and it is authored as
 * geometry so it stays sharp at any width and costs about 3 KB.
 *
 * Depth comes from tone alone, no gradients: the far layer is the faintest and
 * each nearer one is brighter, the way masonry picks up light as it comes
 * towards you. All three are the same sand colour at different alphas, which
 * is what keeps it reading as one place at one time of day.
 *
 * Decorative: the whole thing is aria-hidden, and nothing in it carries
 * information that is not also in the prose.
 */

const W = 1440;
const BASE = 320;

/** A two-centre (equilateral) pointed arch: both arcs have radius = span. */
function arch(x0: number, x1: number, spring: number, base: number) {
  const w = x1 - x0;
  const cx = x0 + w / 2;
  const apex = spring - w * 0.866;
  return (
    `M${x0} ${base}L${x0} ${spring}` +
    `A${w} ${w} 0 0 1 ${cx} ${apex}` +
    `A${w} ${w} 0 0 1 ${x1} ${spring}` +
    `L${x1} ${base}Z`
  );
}

/** An ogee dome on a drum, with the finial above it. */
function domeOnDrum(cx: number, base: number, r: number, drum: number) {
  const top = base - drum;
  const apex = top - r * 1.55;
  return (
    // drum
    `M${cx - r} ${base}L${cx - r} ${top}L${cx + r} ${top}L${cx + r} ${base}Z` +
    // dome: the shoulder bulges past the drum, then draws into a point
    `M${cx - r} ${top}` +
    `C${cx - r * 1.12} ${top - r * 0.75} ${cx - r * 0.62} ${top - r * 1.1} ` +
    `${cx} ${apex}` +
    `C${cx + r * 0.62} ${top - r * 1.1} ${cx + r * 1.12} ${top - r * 0.75} ` +
    `${cx + r} ${top}Z` +
    // finial
    `M${cx - 2} ${apex}L${cx - 2} ${apex - r * 0.42}L${cx + 2} ${apex - r * 0.42}L${cx + 2} ${apex}Z`
  );
}

/** A minaret: shaft, muezzin's balcony, cap. */
function minaret(cx: number, base: number, h: number, w: number) {
  const top = base - h;
  const balcony = top + h * 0.3;
  return (
    `M${cx - w / 2} ${base}L${cx - w / 2} ${balcony}L${cx + w / 2} ${balcony}L${cx + w / 2} ${base}Z` +
    `M${cx - w * 0.9} ${balcony}L${cx + w * 0.9} ${balcony}L${cx + w * 0.9} ${balcony - 7}L${cx - w * 0.9} ${balcony - 7}Z` +
    `M${cx - w * 0.38} ${balcony - 7}L${cx - w * 0.38} ${top}L${cx + w * 0.38} ${top}L${cx + w * 0.38} ${balcony - 7}Z` +
    `M${cx - w * 0.52} ${top}` +
    `C${cx - w * 0.52} ${top - w * 0.9} ${cx - w * 0.2} ${top - w * 1.5} ${cx} ${top - w * 1.9}` +
    `C${cx + w * 0.2} ${top - w * 1.5} ${cx + w * 0.52} ${top - w * 0.9} ${cx + w * 0.52} ${top}Z`
  );
}

/** Merlons along the top of a wall, as one path. */
function crenellations(y: number, merlon: number, gap: number, rise: number) {
  let d = "";
  for (let x = -gap; x < W + merlon; x += merlon + gap) {
    d += `M${x} ${y}L${x} ${y - rise}L${x + merlon} ${y - rise}L${x + merlon} ${y}Z`;
  }
  return d;
}

// -- Far: a scatter of small domes and distant minarets --------------------
const far =
  minaret(150, BASE, 150, 11) +
  minaret(1298, BASE, 134, 10) +
  minaret(520, BASE, 112, 9) +
  domeOnDrum(300, BASE, 30, 26) +
  domeOnDrum(700, BASE, 22, 20) +
  domeOnDrum(1105, BASE, 34, 30) +
  `M0 ${BASE}L0 ${BASE - 58}L1440 ${BASE - 58}L1440 ${BASE}Z`;

// -- Mid: the Dome of the Rock, with Al-Aqsa's lead dome to its left -------
const mid =
  domeOnDrum(880, BASE, 72, 74) +
  domeOnDrum(560, BASE, 44, 52) +
  domeOnDrum(1010, BASE, 20, 30) +
  minaret(760, BASE, 176, 13) +
  `M0 ${BASE}L0 ${BASE - 34}L1440 ${BASE - 34}L1440 ${BASE}Z`;

// -- Near: the city wall, with the arcade cut through it as holes ----------
const WALL_TOP = BASE - 96;
const near =
  `M0 ${BASE}L0 ${WALL_TOP}L${W} ${WALL_TOP}L${W} ${BASE}Z` +
  crenellations(WALL_TOP, 30, 20, 16);

let arcade = "";
for (let x = 40; x < W - 60; x += 120) {
  arcade += arch(x, x + 66, BASE - 34, BASE);
}

export function Skyline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${BASE}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="currentColor"
    >
      <g opacity="0.085">
        <path d={far} />
      </g>
      <g opacity="0.15">
        <path d={mid} />
      </g>
      {/* evenodd so the arcade reads as openings in the wall and the layer
          behind shows through, rather than as shapes painted on top of it. */}
      <g opacity="0.24">
        <path fillRule="evenodd" d={near + arcade} />
      </g>
    </svg>
  );
}
