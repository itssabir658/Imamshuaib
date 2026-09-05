"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * One field, one visible label, one error tied to the input by id.
 *
 * The §2 audit found the old forms used placeholders as labels and had no error
 * handling at all — WCAG 3.3.2. Everything here exists to make that failure
 * impossible to repeat: the label is a real `<label for>`, the error is bound
 * through `aria-describedby`, and `aria-invalid` marks the control itself.
 *
 * No `focus:outline-none` here, deliberately. Tailwind's variant has a
 * specificity of 0,2,0 and the global `:focus-visible` ring in globals.css is
 * 0,1,0 — so adding it silently strips the focus indicator from the control
 * rather than replacing it. Every form field on the site had lost its ring
 * that way. The border colour change is an addition to the ring, not a
 * substitute for one.
 *
 * Placeholder is `text-muted` (5.1:1) rather than `muted/70` (3.0:1). It stays
 * clearly lighter than a real value, which is `text-ink` at 15:1.
 */
const control =
  "w-full rounded-xl border border-field bg-surface px-4 py-3 text-[0.9375rem] " +
  "text-ink transition-colors placeholder:text-muted focus:border-teal-600";

export function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    className: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-gold-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-muted">optional</span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}

      <div className="mt-2">
        {children({
          id,
          className: cn(control, error && "border-gold-700"),
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
        })}
      </div>

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-gold-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shown after a successful submit, and announced. */
export function FormResult({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className="rounded-card border border-teal-200 bg-teal-50 p-7"
    >
      <p className="flex items-center gap-2.5 font-display text-h3 font-bold text-teal-800">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 shrink-0"
        >
          <circle cx="10" cy="10" r="8.25" />
          <path d="m6.5 10.3 2.4 2.4 4.6-5" />
        </svg>
        {title}
      </p>
      <div className="mt-3 text-[0.9375rem]/relaxed text-body">{children}</div>
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
