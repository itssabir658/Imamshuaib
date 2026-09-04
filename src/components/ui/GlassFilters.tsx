/**
 * SVG filters that give the glass real edge refraction.
 *
 * How it works
 * ------------
 * `feDisplacementMap` pushes each backdrop pixel by an amount read out of a
 * second image — the "map". A map pixel of rgb(128,128,128) means zero
 * displacement, so a map that is neutral grey in the middle and ramps only in
 * a band around its border bends the backdrop at the rim and leaves the centre
 * untouched. That is the whole trick behind keeping card and menu content
 * perfectly legible while the edges still behave like thick glass.
 *
 * Chromatic fringe comes from displacing three times at slightly different
 * strengths and recombining one colour channel from each, which is what a real
 * lens does — red refracts least, blue most.
 *
 * Everything here is progressive enhancement. globals.css only reaches for
 * these filters inside an `@supports` query; without them the surfaces keep
 * their plain frosted blur.
 */

/** Neutral grey centre, channel ramps in a 10% band at each edge. */
const DISPLACEMENT_MAP =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
<defs>
<linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgb(38,128,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></linearGradient>
<linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgb(128,128,128)"/><stop offset="1" stop-color="rgb(218,128,128)"/></linearGradient>
<linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(128,38,128)"/><stop offset="1" stop-color="rgb(128,128,128)"/></linearGradient>
<linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(128,128,128)"/><stop offset="1" stop-color="rgb(128,218,128)"/></linearGradient>
</defs>
<rect width="100" height="100" fill="rgb(128,128,128)"/>
<rect x="0" y="0" width="10" height="100" fill="url(#l)"/>
<rect x="90" y="0" width="10" height="100" fill="url(#r)"/>
<rect x="10" y="0" width="80" height="10" fill="url(#t)"/>
<rect x="10" y="90" width="80" height="10" fill="url(#b)"/>
</svg>`,
  );

/**
 * Keeps one colour channel from each pass. Alpha is held at 1 in ALL THREE —
 * feComposite arithmetic operates on premultiplied colour, so a pass with
 * alpha 0 has its colour multiplied away to nothing. Zeroing alpha on the red
 * and green passes is what made the whole surface render blue.
 */
const KEEP = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
} as const;

function RefractionFilter({
  id,
  scale,
  spread,
}: {
  id: string;
  /** Base displacement in px. Larger = thicker-looking glass. */
  scale: number;
  /** Difference between the red and blue passes — the chromatic fringe. */
  spread: number;
}) {
  const passes = [
    { key: "r", scale: scale + spread },
    { key: "g", scale: scale },
    { key: "b", scale: scale - spread },
  ] as const;

  return (
    <filter
      id={id}
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      colorInterpolationFilters="sRGB"
    >
      <feImage
        href={DISPLACEMENT_MAP}
        preserveAspectRatio="none"
        x="0"
        y="0"
        width="100%"
        height="100%"
        result="map"
      />

      {passes.map((p) => (
        <feDisplacementMap
          key={p.key}
          in="SourceGraphic"
          in2="map"
          scale={p.scale}
          xChannelSelector="R"
          yChannelSelector="G"
          result={`d${p.key}`}
        />
      ))}

      {passes.map((p) => (
        <feColorMatrix
          key={p.key}
          in={`d${p.key}`}
          type="matrix"
          values={KEEP[p.key]}
          result={`c${p.key}`}
        />
      ))}

      {/* Sum the three isolated channels back into one image. */}
      <feComposite
        in="cr"
        in2="cg"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="crg"
      />
      <feComposite
        in="crg"
        in2="cb"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
      />
    </filter>
  );
}

export function GlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        {/* Buttons: small, so a tight rim and a fine fringe. */}
        <RefractionFilter id="glass-edge-sm" scale={9} spread={1.2} />
        {/* Menus and cards: more glass to look through. */}
        <RefractionFilter id="glass-edge-md" scale={14} spread={1.6} />
      </defs>
    </svg>
  );
}
