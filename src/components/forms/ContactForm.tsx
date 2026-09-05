"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/site";
import { ButtonAction } from "@/components/ui/Button";
import { Field, FormResult, isEmail } from "./Field";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

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

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (String(data.get("website") ?? "").trim() !== "") return; // honeypot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!email) next.email = "Please enter an email address so we can reply.";
    else if (!isEmail(email))
      next.email = "That does not look like an email address.";
    if (message.length < 10)
      next.message = "A sentence or two about what you need, please.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      document
        .getElementById("contact-form")
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }

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
    <form id="contact-form" onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field label="Your name" required error={errors.name}>
        {(p) => <input {...p} name="name" type="text" autoComplete="name" />}
      </Field>

      <Field label="Email" required error={errors.email}>
        {(p) => <input {...p} name="email" type="email" autoComplete="email" />}
      </Field>

      <Field label="Phone" hint="Only if you would rather be called.">
        {(p) => <input {...p} name="phone" type="tel" autoComplete="tel" />}
      </Field>

      <Field label="What is this about?">
        {(p) => (
          <select {...p} name="program" defaultValue={preselected}>
            <option value="">Something else</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        )}
      </Field>

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
