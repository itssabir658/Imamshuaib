"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ButtonAction } from "@/components/ui/Button";
import { Field, FormResult, isEmail } from "./Field";
import { cn } from "@/lib/cn";

const PRESETS = [25, 50, 100, 250];
const CUSTOM = "custom" as const;

type Errors = Partial<Record<"amount" | "name" | "email", string>>;

/**
 * The donation form.
 *
 * ⚠️ NO PAYMENT IS TAKEN. This collects the amount, frequency and donor details
 * and then stops. There is no Stripe key, no Checkout Session, and no charge.
 *
 * That is deliberate rather than unfinished: card details must never be entered
 * on this page. The correct integration is to POST these fields to a server
 * route that creates a Stripe Checkout Session and redirects to Stripe's own
 * hosted page, so no card number ever reaches this site. Wiring a card field
 * into this form instead would drag the whole site into PCI scope.
 *
 * §2 of the audit found the old donation form repeated on every page. It lives
 * here only; everywhere else links to it, carrying an `?amount=` if it wants to
 * preselect.
 */
export function DonateForm() {
  const params = useSearchParams();
  const initial = Number(params.get("amount"));
  const initialPreset = PRESETS.includes(initial) ? initial : 50;

  const [amount, setAmount] = useState<number | typeof CUSTOM>(initialPreset);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ amount: number; monthly: boolean } | null>(
    null,
  );

  const resolved = amount === CUSTOM ? Number(custom) : amount;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") ?? "").trim() !== "") return; // honeypot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    const next: Errors = {};
    if (!Number.isFinite(resolved) || resolved < 1)
      next.amount = "Please choose or enter an amount of at least $1.";
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "We need an email address to send your receipt.";
    else if (!isEmail(email))
      next.email = "That does not look like an email address.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setDone({ amount: resolved, monthly });
  }

  if (done) {
    return (
      <FormResult title="Ready to hand off to Stripe">
        <p>
          {done.monthly ? "Monthly" : "One-time"} gift of{" "}
          <strong className="font-semibold text-ink">
            ${done.amount.toLocaleString()}
          </strong>
          .
        </p>
        <p className="mt-3">
          No payment has been taken. This form is not connected to Stripe yet —
          the next step is a server route that creates a Checkout Session and
          redirects you to Stripe&rsquo;s own page, so card details never touch
          this site.
        </p>
      </FormResult>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <fieldset>
        <legend className="text-sm font-medium text-ink">How often?</legend>
        <div className="mt-3 inline-flex rounded-pill border border-line bg-surface p-1">
          {[false, true].map((isMonthly) => (
            <button
              key={String(isMonthly)}
              type="button"
              onClick={() => setMonthly(isMonthly)}
              aria-pressed={monthly === isMonthly}
              className={cn(
                "rounded-pill px-5 py-2 text-sm font-semibold transition-colors duration-200 ease-ios",
                monthly === isMonthly
                  ? "bg-teal-600 text-white"
                  : "text-body hover:text-teal-700",
              )}
            >
              {isMonthly ? "Monthly" : "One time"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Amount
          <span className="ml-1 text-gold-700" aria-hidden="true">
            *
          </span>
        </legend>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              aria-pressed={amount === preset}
              className={cn(
                "rounded-xl border py-3 font-display text-lg font-bold tabular-nums transition-colors duration-200 ease-ios",
                amount === preset
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-line bg-surface text-ink hover:border-teal-300",
              )}
            >
              ${preset}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <label
            htmlFor="donate-custom"
            className={cn(
              "flex items-center gap-3 rounded-xl border bg-surface px-4 py-3 transition-colors",
              amount === CUSTOM ? "border-teal-600" : "border-line",
            )}
          >
            <span className="text-sm font-medium text-ink">Other</span>
            <span aria-hidden="true" className="text-muted">
              $
            </span>
            <input
              id="donate-custom"
              inputMode="decimal"
              value={custom}
              placeholder="0"
              aria-invalid={errors.amount ? true : undefined}
              aria-describedby={errors.amount ? "donate-amount-error" : undefined}
              onFocus={() => setAmount(CUSTOM)}
              onChange={(e) => {
                setCustom(e.target.value.replace(/[^\d.]/g, ""));
                setAmount(CUSTOM);
              }}
              className="w-full bg-transparent text-[0.9375rem] tabular-nums text-ink focus:outline-none"
            />
          </label>
        </div>

        {errors.amount ? (
          <p id="donate-amount-error" className="mt-2 text-sm text-gold-800">
            {errors.amount}
          </p>
        ) : null}
      </fieldset>

      <Field label="Your name" required error={errors.name}>
        {(p) => <input {...p} name="name" type="text" autoComplete="name" />}
      </Field>

      <Field
        label="Email"
        required
        error={errors.email}
        hint="Your receipt goes here. Nothing else."
      >
        {(p) => <input {...p} name="email" type="email" autoComplete="email" />}
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="donate-website">Do not fill in this field</label>
        <input id="donate-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <ButtonAction type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
          {monthly ? "Give monthly" : "Donate"}
          {Number.isFinite(resolved) && resolved > 0
            ? ` $${resolved.toLocaleString()}`
            : ""}
        </ButtonAction>

        <p className="mt-4 flex items-start gap-2.5 text-sm text-muted">
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            className="mt-0.5 size-4 shrink-0 text-teal-600"
          >
            <rect x="3" y="7" width="10" height="7" rx="1.6" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          Payments are processed by Stripe over 256-bit SSL. Card details are
          entered on Stripe&rsquo;s systems and never reach this website.
        </p>
      </div>
    </form>
  );
}
