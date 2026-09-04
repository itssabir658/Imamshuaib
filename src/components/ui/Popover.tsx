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
 * rect solves both: the menu frosts the page directly, and it is no longer
 * inside anything's stacking context.
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
  const frame = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Measure before paint so the menu never flashes at the wrong coordinates.
  useLayoutEffect(() => {
    if (!open) return;

    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const left = align === "end" ? r.right - width : r.left;
      setPos({
        top: r.bottom + 8,
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

  if (!mounted || !open || !pos) return null;

  return createPortal(
    <div
      // position is set inline, not as a class: the glass rim utilities set
      // `position: relative` on anything wearing them, and a class cannot be
      // relied on to win that. Inline wins outright, so the menu can never be
      // knocked out of viewport-anchored positioning again.
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width,
        zIndex: 80,
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
