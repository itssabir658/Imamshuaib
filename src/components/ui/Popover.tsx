"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type Align = "start" | "end";

/**
 * A popover rendered at the document root rather than where it is declared.
 *
 * Two reasons, both caused by the header being frosted glass:
 *
 * 1. An ancestor with `backdrop-filter` establishes a stacking context, which
 *    traps `z-index`. A menu declared inside the header cannot rise above
 *    later content no matter how high its z-index goes.
 * 2. `backdrop-filter` cannot nest. A frosted menu inside a frosted header
 *    breaks GPU compositing and renders blank or garbled.
 *
 * Portalling to `body` and positioning `fixed` against the trigger's measured
 * rect solves both.
 */
export function Popover({
  anchorRef,
  open,
  align = "start",
  width,
  className,
  children,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  align?: Align;
  /** Menu width in px; the anchor's own width is usually too narrow. */
  width: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const menu = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Measured before paint. The menu is already in the DOM but held invisible
  // until `pos` exists, which is what makes its height measurable here — a
  // popover that has not been laid out cannot know whether it fits below.
  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const height = menu.current?.offsetHeight ?? 0;

      // Flip above the trigger when there is not room below it. The language
      // switcher sits at the bottom of the mobile panel, where opening
      // downwards puts the menu off the bottom of the screen entirely.
      const roomBelow = window.innerHeight - r.bottom - 8;
      const flip = height > 0 && roomBelow < height && r.top > height + 8;

      const left = align === "end" ? r.right - width : r.left;

      setPos({
        top: flip ? r.top - 8 - height : r.bottom + 8,
        // Keep it on screen on narrow viewports.
        left: Math.max(8, Math.min(left, window.innerWidth - width - 8)),
      });
    };

    measure();

    const onMove = () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onMove, { passive: true, capture: true });
    window.addEventListener("resize", onMove);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onMove, { capture: true });
      window.removeEventListener("resize", onMove);
    };
  }, [open, align, width, anchorRef]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={menu}
      // position is set inline, not as a class: the glass rim utilities set
      // `position: relative` on anything wearing them, and a class cannot be
      // relied on to win that. Inline wins outright, so the menu can never be
      // knocked out of viewport-anchored positioning again.
      style={{
        position: "fixed",
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        width,
        zIndex: 95,
        // Rendered but invisible for the one frame it takes to measure it.
        visibility: pos ? "visible" : "hidden",
      }}
      className={cn(
        "glass-menu glass-rim-light glass-refract-md rounded-2xl p-1.5",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
