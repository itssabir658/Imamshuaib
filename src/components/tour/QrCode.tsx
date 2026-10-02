import QRCode from "qrcode";

/**
 * A QR code rendered as inline SVG, generated at build time.
 *
 * Generated rather than dropped in as an image file for one reason: the code
 * and the link it encodes can never drift apart. `tour.registerUrl` is the
 * single source for both the code and every Register button on the page, so
 * changing the destination is a one-line content edit and the printed square
 * follows it on the next build. A PNG checked into /public would have to be
 * remembered.
 *
 * Error correction is level Q (25%). H would be more robust still but makes
 * the grid denser for the same physical size; Q is the usual choice for a code
 * that will be read off a screen or a printed card, and it survives a logo
 * being placed over the centre later if that is ever wanted.
 *
 * ACCESSIBILITY. A QR code is not information anybody can use through a screen
 * reader, and it is useless to the person already holding the phone it is on.
 * So it is aria-hidden here, and every place that renders it also renders a
 * real link to the same URL. The code is a convenience for a second device,
 * not the only way in.
 */
export async function QrCode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  // A QR code has no page to be relative to. "/contact" encodes as the literal
  // four-letter path and every camera that reads it goes nowhere, and a bare
  // "imamshuaib.com" is just as dead — but both render a perfectly plausible
  // square, so nothing looks wrong until someone has already printed it.
  // Fail the build instead.
  if (!/^https?:\/\//.test(value)) {
    throw new Error(
      `QR codes must encode an absolute https:// URL, got "${value}". ` +
        `Check tour.registerUrl, and site.url that it resolves through.`,
    );
  }

  const svg = await QRCode.toString(value, {
    type: "svg",
    errorCorrectionLevel: "Q",
    margin: 0,
    color: { dark: "#1c1a17", light: "#00000000" },
  });

  // Trimmed at both ends. The library emits a trailing newline, and a stray
  // "\n" left inside dangerouslySetInnerHTML is a text node that the SSR
  // markup has and the client payload does not — which React reports as a
  // hydration mismatch and then re-renders the whole subtree to resolve.
  const markup = svg.trim();
  const size = Number(markup.match(/viewBox="0 0 (\d+)/)?.[1] ?? 0);
  const inner = markup
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "")
    .trim();

  if (!size) throw new Error(`Could not generate a QR code for ${value}`);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      // The modules have to land on whole pixels or a camera sees a blurred
      // grid; without this the browser antialiases every edge.
      shapeRendering="crispEdges"
      className={className}
      // Library output, from an author-controlled string in src/content —
      // no user input reaches this, and the payload is <path> data only.
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
