import React from "react";

/** U+FDFA — ARABIC LIGATURE SALLALLAHOU ALAYHE WASALLAM, the ﷺ honorific. */
const SAW = "ﷺ";

/**
 * Wraps the ﷺ ligature wherever it appears inside an English string.
 *
 * Two reasons it is not just left as a bare character in the copy:
 *
 *  - `lang="ar"` is what WCAG 3.1.2 (Language of Parts) asks for when the
 *    script changes mid-sentence. Screen readers that carry an Arabic voice
 *    announce the full phrase; ones that do not at least know to hand it to
 *    the right dictionary rather than spelling it out of the English one.
 *  - Neither Gilroy nor Montserrat contains the glyph, so it falls through to
 *    whatever Arabic face the system has — Segoe UI on Windows, Geeza Pro on
 *    Apple, Noto on Android. Those render it noticeably smaller than the
 *    surrounding Latin, so it gets a nudge up in size to sit level with it.
 *
 * Returns the string untouched when there is no ligature in it, so it is
 * free to call on every line of copy.
 */
export function withHonorific(text: string): React.ReactNode {
  if (!text.includes(SAW)) return text;

  return text.split(SAW).flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} lang="ar" className="text-[1.15em] leading-none">
            {SAW}
          </span>,
          part,
        ],
  );
}
