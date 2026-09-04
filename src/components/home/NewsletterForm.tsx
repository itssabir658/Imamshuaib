"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Status = "idle" | "invalid" | "done";

/**
 * Visible label, an inline error tied to the input via aria-describedby, and a
 * live region for the result — the label/validation gaps §2 flagged on the
 * current forms. Submission is stubbed until the Mailchimp key is wired up.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("email");
    const email = typeof value === "string" ? value.trim() : "";
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "done" : "invalid");
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-teal-100/90"
      >
        Email address
      </label>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "idle" ? undefined : `${id}-status`}
          onChange={() => status !== "idle" && setStatus("idle")}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-pill border bg-white/5 px-5 text-sm text-white placeholder:text-teal-100/40",
            "transition-colors focus:bg-white/10 focus:outline-none",
            status === "invalid"
              ? "border-gold-300"
              : "border-white/20 hover:border-white/35",
          )}
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-pill bg-gold-500 px-6 text-sm font-semibold text-teal-950 transition-colors hover:bg-gold-400"
        >
          Subscribe
        </button>
      </div>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 text-sm",
          status === "invalid" ? "text-gold-200" : "text-teal-100/80",
          status === "idle" && "sr-only",
        )}
      >
        {status === "invalid"
          ? "Please enter a valid email address, like you@example.com."
          : status === "done"
            ? "Jazak Allahu khayran — you are on the list."
            : ""}
      </p>
    </form>
  );
}
