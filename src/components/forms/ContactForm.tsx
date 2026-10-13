"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ANCHORED_TOPIC, contactTopics, services, site } from "@/content/site";
import { ButtonAction } from "@/components/ui/Button";
import { Field, FormResult } from "./Field";
import {
  type ContactErrors as Errors,
  toContactInput,
  validateContact,
} from "@/lib/contact";

/**
 * The contact form.
 *
 * It posts to /api/contact, which sends the submission to Imam Shuaib and an
 * acknowledgement to the sender through Resend.
 *
 * Validation lives in `@/lib/contact` and is run by both sides. The copy that
 * used to live here had a typo — `/D/g` where `/\D/g` was meant — so the
 * phone check stripped literal "D"s instead of non-digits and let "not a
 * phone!!" through on length alone. One definition, imported twice, is why
 * that class of drift cannot happen again.
 *
 * The honeypot is kept from the old site: a field hidden from people, ignored
 * by assistive tech, and irresistible to naive bots. It is checked here and
 * again on the server.
 */
export function ContactForm() {
  const params = useSearchParams();
  const preselected = params.get("program") ?? "";

  // The topic is controlled rather than left to defaultValue, because the
  // form changes shape when the Anchored retreat is selected: one extra
  // question appears, and the phone number stops being optional. Everyone
  // else — someone asking about a nikah — should not have to hand over a
  // phone number or answer a retreat question, so both are conditional.
  const [program, setProgram] = useState(preselected);
  const isRetreat = program === ANCHORED_TOPIC;

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(true);
  const form = useRef<HTMLFormElement>(null);
  const attempts = useRef(0);

  // Focus has to move AFTER the render that adds aria-invalid — doing it
  // inside the submit handler queries the DOM before React has updated it and
  // silently finds nothing, which is what was happening. Without this a
  // screen reader user submits an empty form and is told nothing at all.
  // `attempts` is in the dependency list so a second failed submit re-focuses
  // even when the error set is unchanged.
  const sending = status === "sending";
  const errorCount = Object.keys(errors).length;
  useEffect(() => {
    if (errorCount === 0) return;
    form.current
      ?.querySelector<HTMLElement>("[aria-invalid='true']")
      ?.focus();
  }, [errorCount, errors, attempts.current]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = toContactInput((k) => data.get(k));

    // Hidden from people and from assistive tech, so only a bot fills it in.
    if (input.website) return;

    attempts.current += 1;
    const next = validateContact(input);
    setErrors(next);
    setSubmitError(null);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Errors;
        message?: string;
        acknowledged?: boolean;
      };

      if (res.ok && payload.ok) {
        setAcknowledged(payload.acknowledged !== false);
        setStatus("sent");
        return;
      }

      // The server re-runs the same validation, so if it disagrees with the
      // client the server is right — show its errors rather than a generic
      // failure the person cannot act on.
      if (res.status === 422 && payload.errors) {
        setErrors(payload.errors);
        setStatus("idle");
        return;
      }

      setStatus("idle");
      setSubmitError(
        payload.message ??
          "Something went wrong sending that. Please try again, or email " +
            site.email +
            ".",
      );
    } catch {
      setStatus("idle");
      setSubmitError(
        "We could not reach the server. Check your connection and try again, or email " +
          site.email +
          ".",
      );
    }
  }

  if (status === "sent") {
    return (
      <FormResult
        title={isRetreat ? "Your seat is requested" : "Message sent"}
      >
        <p>
          {isRetreat
            ? "JazakAllah Khair. Imam Shuaib will be in touch within 24 hours to confirm your seat and arrange the deposit."
            : "JazakAllah Khair. Your message has reached Imam Shuaib and he will be in touch shortly."}
        </p>
        {acknowledged ? (
          <p className="mt-3">
            A copy is on its way to your inbox. If it is not there in a few
            minutes, check your spam folder.
          </p>
        ) : null}
      </FormResult>
    );
  }

  return (
    <form
      id="contact-form"
      ref={form}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      {/* Announced on a failed submit, so the outcome is not conveyed by
          moving focus alone. */}
      <p role="status" aria-live="polite" className="sr-only">
        {errorCount > 0
          ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
          : ""}
      </p>
      <Field label="Your name" required error={errors.name}>
        {(p) => <input {...p} name="name" type="text" autoComplete="name" />}
      </Field>

      <Field label="Email" required error={errors.email}>
        {(p) => <input {...p} name="email" type="email" autoComplete="email" />}
      </Field>

      <Field label="What is this about?">
        {(p) => (
          <select
            {...p}
            name="program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          >
            <option value="">Something else</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            {contactTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      {/* Phone sits BELOW the topic select on purpose. It changes from
          optional to required when the retreat is chosen, and a field that
          rewrites itself above the control you just used is a change most
          people never see. */}
      <Field
        label={isRetreat ? "Phone (text/WhatsApp)" : "Phone"}
        required={isRetreat}
        error={errors.phone}
        hint={isRetreat ? undefined : "Only if you would rather be called."}
      >
        {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" />}
      </Field>

      {isRetreat ? (
        <Field
          label="What is the one thing you are hoping to walk away clearer on?"
          required
          error={errors.outcome}
        >
          {(p) => (
            <textarea
              {...p}
              name="outcome"
              rows={4}
              className={`${p.className} resize-y`}
            />
          )}
        </Field>
      ) : null}

      <Field
        label="Message"
        required={!isRetreat}
        error={errors.message}
      >
        {(p) => <textarea {...p} name="message" rows={6} className={`${p.className} resize-y`} />}
      </Field>

      {/* Honeypot. Hidden from people and from assistive tech, so only a bot
          fills it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Do not fill in this field</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* A send that failed for a reason the person cannot fix by editing a
          field — no mail provider, rate limited, network gone. role="alert"
          because it appears after they acted and nothing else announces it.
          Nothing they typed is cleared, so "try again" is one press. */}
      {submitError ? (
        <p
          role="alert"
          className="rounded-card border border-gold-300 bg-gold-50 px-5 py-4 text-[0.9375rem]/relaxed text-gold-800"
        >
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <ButtonAction
          type="submit"
          size="lg"
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? "Sending…" : "Send message"}
        </ButtonAction>
        <p className="text-sm/relaxed text-muted">
          We typically reply within a few hours. For a faster response, send a
          WhatsApp or text to{" "}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold whitespace-nowrap text-gold-800 underline underline-offset-4"
          >
            {site.phone}
            <span className="sr-only"> (opens WhatsApp in a new tab)</span>
          </a>
          .
        </p>
      </div>
    </form>
  );
}
