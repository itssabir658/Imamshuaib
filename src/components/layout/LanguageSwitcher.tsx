"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * §4 calls for a header language switcher. Localisation itself is a
 * later-phase item, so the two non-English locales are listed but marked
 * unavailable rather than linking into routes that do not exist yet.
 */
const locales = [
  { code: "en", label: "English", native: "English", available: true },
  { code: "ar", label: "Arabic", native: "العربية", available: false },
  { code: "ur", label: "Urdu", native: "اردو", available: false },
];

export function LanguageSwitcher({
  onDark = false,
  placement = "bottom",
}: {
  onDark?: boolean;
  /** "top" when the trigger sits near the bottom of the viewport. */
  placement?: "bottom" | "top";
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: PointerEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-pill px-3 text-sm font-medium transition-colors",
          onDark
            ? "text-teal-100 hover:bg-white/10 hover:text-white"
            : "text-body hover:bg-teal-50 hover:text-teal-700",
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-4"
        >
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.6 12h16.8M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
        </svg>
        <span className="sr-only">Change language. Current language: </span>
        EN
      </button>

      {open ? (
        <ul
          role="menu"
          aria-label="Language"
          className={cn(
            "absolute right-0 z-50 w-52 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-float",
            placement === "top" ? "bottom-full mb-2" : "mt-2",
          )}
        >
          {locales.map((l) => (
            <li key={l.code} role="none">
              <button
                type="button"
                role="menuitem"
                lang={l.code}
                disabled={!l.available}
                aria-current={l.available ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm",
                  l.available
                    ? "font-semibold text-teal-700 hover:bg-teal-50"
                    : "cursor-not-allowed text-muted",
                )}
              >
                <span>{l.native}</span>
                <span className="text-xs font-medium text-muted">
                  {l.available ? "Current" : "Coming soon"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
