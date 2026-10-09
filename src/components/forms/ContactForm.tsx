"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ANCHORED_TOPIC, contactTopics, services } from "@/content/site";
import { ButtonAction } from "@/components/ui/Button";
import { Field, FormResult, isEmail } from "./Field";

type Errors = Partial<
  Record<"name" | "email" | "phone" | "message" | "outcome", string>
>;

/**
 * The contact form.
 *
 * ⚠️ IT DOES NOT SEND ANYTHING YET. Validation, error handling and the success
 * state are all real; the submit handler stops short of a network call because
 * there is no endpoint or mail provider configured. Wire `onSubmit` to a route
 * handler before launch — and until you do, do not link to this page from
 * anywhere that promises a reply.
 *
 * The honeypot is kept from the old site: a field hidden from people, ignored by
 * assistive tech, and irresistible to naive bots.
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
  const [sent, setSent] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const attempts = useRef(0);

  // Focus has to move AFTER the render that adds aria-invalid — doing it
  // inside the submit handler queries the DOM before React has updated it and
  // silently finds nothing, which is what was happening. Without this a
  // screen reader user submits an empty form and is told nothing at all.
  // `attempts` is in the dependency list so a second failed submit re-focuses
  // even when the error set is unchanged.
  const errorCount = Object.keys(errors).length;
  useEffect(() => {
    if (errorCount === 0) return;
    form.current
      ?.querySelector<HTMLElement>("[aria-invalid='true']")
      ?.focus();
  }, [errorCount, errors, attempts.current]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (String(data.get("website") ?? "").trim() !== "") return; // honeypot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const outcome = String(data.get("outcome") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please enter an email address so we can reply.";
    else if (!isEmail(email))
      next.email = "That does not look like an email address.";
    if (message.length < 10)
      next.message = "A sentence or two about what you need, please.";

    if (isRetreat) {
      // Deliberately loose. Phone formats differ by country and a strict
      // pattern rejects real numbers far more often than it catches bad ones;
      // seven digits is enough to catch an empty box or "n/a" without
      // arguing with anyone's international format.
      const digits = phone.replace(/D/g, "");
      if (!phone) next.phone = "A number we can text, please.";
      else if (digits.length < 7)
        next.phone = "That looks too short to be a phone number.";

      if (!outcome)
        next.outcome = "Please answer this one — it shapes the weekend.";
    }

    attempts.current += 1;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSent(true);
  }

  if (sent) {
    return (
      <FormResult title="Message ready to send">
        <p>
          Your message passed validation — but this form is not connected to a
          mail provider yet, so nothing has actually been sent. Wire it up
          before launch.
        </p>
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

      <Field label="Message" required error={errors.message}>
        {(p) => <textarea {...p} name="message" rows={6} className={`${p.className} resize-y`} />}
      </Field>

      {/* Honeypot. Hidden from people and from assistive tech, so only a bot
          fills it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Do not fill in this field</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <ButtonAction type="submit" size="lg">
          Send message
        </ButtonAction>
        <p className="text-sm text-muted">
          We reply to everything, usually within a few days.
        </p>
      </div>
    </form>
  );
}
