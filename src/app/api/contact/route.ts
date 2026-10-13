import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactTopics, services, site } from "@/content/site";
import {
  isRetreatSubmission,
  toContactInput,
  validateContact,
} from "@/lib/contact";

/**
 * The contact endpoint. Two emails go out per submission:
 *
 *   1. the submission itself, to Imam Shuaib;
 *   2. an acknowledgement, to whoever sent it.
 *
 * Everything here runs server-side on purpose. The form validates too, but a
 * form's validation is a courtesy to the person typing — it is not a control,
 * because anyone can POST straight to this route. So the same
 * `validateContact` runs again here, and the honeypot is re-checked here.
 *
 * ⚠️ NEEDS TWO THINGS IN THE ENVIRONMENT:
 *   RESEND_API_KEY   — from resend.com. Never commit it; .env*.local is
 *                      gitignored, and on Vercel it goes in Project Settings.
 *   CONTACT_FROM     — optional. Defaults to the site address. Resend will
 *                      refuse to send until the sending domain is verified by
 *                      DNS, so before that is done set this to Resend's
 *                      onboarding@resend.dev to test the flow end to end.
 *
 * Without the key the route answers 503 and the form says so plainly, rather
 * than showing a success state for a message that went nowhere.
 */

const FROM = process.env.CONTACT_FROM ?? `Imam Shuaib <${site.email}>`;

/**
 * What the visitor is told when a send fails.
 *
 * Deliberately not the provider's own message. Resend says things like "API
 * key is invalid", which is true, useless to the person typing, and a detail
 * about our infrastructure they should not be handed. The real reason goes to
 * the server log; the visitor gets the one thing they can act on.
 */
const SEND_FAILED = `We could not send that just now. Please try again in a moment, or email ${site.email} directly.`;

/** Programme ids are opaque; the email should name the thing in English. */
const LABELS = new Map<string, string>([
  ...services.map((s) => [s.id, s.title] as [string, string]),
  ...contactTopics.map((t) => [t.id, t.label] as [string, string]),
]);

/**
 * A single burst from one address cannot drain the send quota.
 *
 * In-memory, so it is per-instance and resets on a cold start — real
 * protection would be a shared store. It is here because it costs nothing and
 * stops the obvious loop; it is not a substitute for Resend's own limits.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // crude ceiling; this map is not a cache
  return recent.length > MAX_PER_WINDOW;
}

/** Escapes before interpolating into the HTML body of an email. */
const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Subjects are a single header line; newlines have no business in one. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        ok: false,
        reason: "not-configured",
        message: `Email is not set up on this site yet, so nothing was sent. Please email ${site.email} or send a text to ${site.phone}.`,
      },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const input = toContactInput((k) => body[k]);

  // Hidden from people and from assistive tech, so only a bot fills it in.
  // Answer 200 so the bot learns nothing from the difference.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "invalid", errors }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "rate-limited",
        message: "That is a lot of messages at once. Please try again shortly.",
      },
      { status: 429 },
    );
  }

  const isRetreat = isRetreatSubmission(input.program);
  const topic = LABELS.get(input.program) ?? "Something else";
  const resend = new Resend(key);

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["About", topic],
  ];
  if (input.outcome) rows.push(["Hoping to be clearer on", input.outcome]);
  rows.push(["Message", input.message || "—"]);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = rows
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 16px"><strong>${esc(k)}</strong><br>${esc(v).replace(/\n/g, "<br>")}</p>`,
    )
    .join("");

  try {
    // The submission. reply-to is the sender, so replying in a mail client
    // goes to them rather than back to this address.
    const notify = await resend.emails.send({
      from: FROM,
      to: [site.email],
      replyTo: input.email,
      subject: oneLine(
        isRetreat
          ? `Anchored reservation — ${input.name}`
          : `${topic} — ${input.name}`,
      ),
      text,
      html,
    });

    if (notify.error) {
      console.error("[contact] notification failed:", notify.error.message);
      return NextResponse.json(
        { ok: false, reason: "send-failed", message: SEND_FAILED },
        { status: 502 },
      );
    }

    // The acknowledgement. Imam Shuaib's wording for a reservation; a
    // reservation promise would be wrong for someone asking about a nikah,
    // so the general case gets its own.
    const ackText = isRetreat
      ? "JazakAllah Khair. Imam Shuaib will be in touch within 24 hours to confirm your seat and arrange the deposit."
      : "JazakAllah Khair. Your message has reached Imam Shuaib and he will be in touch shortly.";

    const ack = await resend.emails.send({
      from: FROM,
      to: [input.email],
      replyTo: site.email,
      subject: isRetreat
        ? "Your Anchored reservation"
        : `Thank you for writing to ${site.name}`,
      text: `${ackText}\n\n— ${site.legalName}\n${site.email}\n${site.phone}`,
      html:
        `<p style="margin:0 0 20px">${esc(ackText)}</p>` +
        `<p style="margin:0;color:#4a453f">— ${esc(site.legalName)}<br>` +
        `${esc(site.email)}<br>${esc(site.phone)}</p>`,
    });

    // The submission is already delivered at this point, so a failed
    // acknowledgement must not be reported to the sender as a failed send —
    // that would have them submit a second time.
    if (ack.error) {
      console.error("[contact] acknowledgement failed:", ack.error.message);
    }

    return NextResponse.json({ ok: true, acknowledged: !ack.error });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, reason: "send-failed", message: SEND_FAILED },
      { status: 502 },
    );
  }
}
