"use client";

import { useEffect, useRef, useState } from "react";
import { tour } from "@/content/tour";

/**
 * The register bar that follows you down the page on a phone.
 *
 * The brief asked for the call to action to stay visible throughout, and on a
 * narrow screen the hero card is off-screen within one swipe. It is a link,
 * not a QR code — the device showing a QR code is the one device that cannot
 * read it.
 *
 * It appears once the hero's own card has gone, which an IntersectionObserver
 * tells us. No scroll handler: a scroll listener on a phone runs on every
 * frame of every flick for the whole visit, and this needs to fire twice.
 *
 * The thing being observed is a viewport-tall strip ending where the hero
 * ends, not a hairline marker. An observer only fires when intersection
 * actually changes, so a one-pixel sentinel can be jumped straight over —
 * scroll restored on reload, or a jump to an anchor — leaving it off-screen
 * in both states and the bar never shown. A strip that is always in view at
 * the top of the page cannot be skipped that way.
 *
 * Hidden from `lg`, where the hero card is sticky in its own column and a
 * second bar would just be a second bar.
 */
export function StickyRegister() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden="true" className="relative h-px w-full">
        <div
          ref={sentinel}
          className="pointer-events-none absolute bottom-0 left-0 h-screen w-px"
        />
      </div>

      <div
        className={[
          "fixed inset-x-0 bottom-0 z-50 border-t border-sand-500/25 bg-charcoal/95 px-4 pt-3 pb-safe lg:hidden",
          "backdrop-blur-xl transition-[transform,opacity] duration-300 ease-ios",
          shown
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        ].join(" ")}
        // Out of the tab order and out of the tree while it is off-screen,
        // so a keyboard never lands on a control nobody can see. React 19
        // passes `inert` through as a real boolean attribute.
        inert={!shown}
      >
        <div className="mx-auto flex max-w-page items-center gap-4">
          <p className="min-w-0 flex-1 font-sans text-xs text-sand-300">
            <span className="block font-semibold text-ivory">
              {tour.name}
            </span>
            {tour.qr.note}
          </p>
          <a
            href={tour.registerUrl}
            className="inline-flex h-11 shrink-0 items-center rounded-pill bg-gold-500 px-6 font-sans text-sm font-semibold text-charcoal transition-colors duration-300 ease-ios hover:bg-gold-400"
          >
            Register
          </a>
        </div>
      </div>
    </>
  );
}
