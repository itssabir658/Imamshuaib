"use client";

import { useEffect, useState } from "react";
import { anchored } from "@/content/anchored";
import { RESERVE_HREF } from "./Type";

/**
 * The reserve bar that follows you down the page on a phone.
 *
 * The brief says mobile first, and that most traffic arrives from WhatsApp and
 * Instagram — people who tapped a link, not people browsing a site. The page
 * is long; the hero button is gone within one swipe.
 *
 * The rule is simply: show it when no part of the page that already has a
 * Reserve control is on screen. Those are the masthead, the video directly
 * under it, the deposit step, the close, and the footer. A floating bar on top
 * of the button it duplicates is just a bar on top of a button.
 *
 * WHY WHOLE SECTIONS AND NOT A SENTINEL. The first version watched a
 * viewport-tall strip ending where the hero ends. An IntersectionObserver only
 * fires when intersection actually *changes*, and here the masthead plus a
 * 832px-tall vertical video are together far taller than one viewport — so the
 * strip never touched the first screen, sat off-screen at the top and
 * off-screen above, never changed state, and the bar never appeared. Watching
 * real sections cannot be skipped that way: whatever the scroll position, at
 * least one of them is either in view or demonstrably not, and `observe()`
 * reports the truth once at registration.
 *
 * No scroll handler anywhere. A scroll listener on a phone runs on every frame
 * of every flick for the whole visit.
 */
export function StickyReserve() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const zones = [
      "anchored-title",
      "promo-video",
      "investment-title",
      "closing-title",
    ]
      .map((id) => document.getElementById(id)?.closest("section"))
      .concat(document.querySelector("footer"))
      .filter((el): el is HTMLElement => Boolean(el));

    if (zones.length === 0) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setShown(visible.size === 0);
      },
      { threshold: 0 },
    );

    zones.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);

  const left = anchored.seatsRemaining;

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-50 border-t border-sand-500/30 bg-charcoal/95 px-4 pt-3 pb-safe lg:hidden",
        "backdrop-blur-xl transition-[transform,opacity] duration-300 ease-ios",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      ].join(" ")}
      // Out of the tab order and out of the tree while it is off-screen, so a
      // keyboard never lands on a control nobody can see. React 19 passes
      // `inert` through as a real boolean attribute.
      inert={!shown}
    >
      <div className="mx-auto flex max-w-page items-center gap-4">
        <p className="min-w-0 flex-1 font-sans text-xs text-sand-300">
          <span className="block font-semibold text-ivory">
            {anchored.name}
          </span>
          {left === null
            ? anchored.dates
            : left === 0
              ? "All seats taken"
              : `${left} of ${anchored.seatsTotal} seats remaining`}
        </p>
        <a
          href={RESERVE_HREF}
          className="inline-flex h-11 shrink-0 items-center rounded-[2px] bg-gold-500 px-6 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-charcoal uppercase transition-colors duration-300 ease-ios hover:bg-gold-400"
        >
          Reserve
        </a>
      </div>
    </div>
  );
}
