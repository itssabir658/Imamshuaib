"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { partners } from "@/content/site";
import { Container } from "@/components/ui/Container";

/**
 * The partner marks, running as a seamless horizontal ticker.
 *
 * The track slides by exactly -50%, so its second half lands where the first
 * began and the loop has no seam. Four repeats rather than two, because the
 * animated half must itself be wider than the viewport — with two, a single
 * pass of the five marks (~1180px) is narrower than a desktop viewport and a
 * gap opens at the trailing edge. Only the first pass is in the accessibility
 * tree; the rest are decorative.
 *
 * WCAG 2.2.2 (Pause, Stop, Hide) applies here: this starts on its own, runs
 * indefinitely, and sits alongside other content, so it needs a real control
 * to stop it. Pausing on hover does not count — it is mouse-only and nobody
 * can discover it. Hence the button.
 *
 * The marks are white-on-transparent, so this band has to stay dark.
 */
export function TrustedBy() {
  const REPEATS = 4;
  const track = Array.from({ length: REPEATS }, () => partners).flat();

  const [paused, setPaused] = useState(false);

  // Someone who has asked the system for less motion should not have to ask
  // this page separately. They can still start it if they want to.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
  }, []);

  return (
    <section
      aria-labelledby="trusted-by"
      className="border-t border-white/10 bg-teal-950 py-12 sm:py-14"
    >
      <Container>
        <h2
          id="trusted-by"
          className="text-center font-sans text-eyebrow font-semibold text-teal-100/70 uppercase"
        >
          Trusted by institutions and communities
        </h2>
      </Container>

      <div className="marquee-viewport relative mt-9">
        <ul
          className="marquee-track items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map((p, i) => {
            const duplicate = i >= partners.length;
            return (
              <li
                key={`${p.src}-${i}`}
                aria-hidden={duplicate || undefined}
                className="flex shrink-0 items-center"
              >
                <Image
                  src={p.src}
                  alt={duplicate ? "" : p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="240px"
                  className="h-11 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <Container className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          // No aria-pressed: the visible label already changes between Pause
          // and Play. Doing both makes a screen reader announce "Play,
          // pressed", which states the opposite of what the button will do.
          className="inline-flex items-center gap-2 rounded-pill px-4 py-2 text-xs font-medium text-teal-100/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {paused ? <PlayGlyph /> : <PauseGlyph />}
          {paused ? "Play" : "Pause"}
          <span className="sr-only"> the scrolling partner logos</span>
        </button>
      </Container>
    </section>
  );
}

function PauseGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="size-3">
      <rect x="4" y="3" width="3" height="10" rx="1" />
      <rect x="9" y="3" width="3" height="10" rx="1" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="size-3">
      <path d="M4.5 2.9v10.2c0 .5.55.8.97.53l8-5.1a.63.63 0 0 0 0-1.06l-8-5.1a.63.63 0 0 0-.97.53Z" />
    </svg>
  );
}
