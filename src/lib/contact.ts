import { ANCHORED_TOPIC } from "@/content/site";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "message"
  | "outcome";

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  program: string;
  outcome: string;
  message: string;
  /** Honeypot. Anything in it means a bot filled the form. */
  website: string;
};

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Normalises whatever came off a FormData or a JSON body into known strings. */
export function toContactInput(get: (k: string) => unknown): ContactInput {
  const str = (k: string) => {
    const v = get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  return {
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    program: str("program"),
    outcome: str("outcome"),
    message: str("message"),
    website: str("website"),
  };
}

/**
 * The one definition of what a valid submission is.
 *
 * Both the form and the API route import this. They used to each have their
 * own copy, which is the usual way a form ends up accepting something the
 * server then rejects — or, worse, the other way round: a server that trusts
 * the client's check and stores whatever arrives. The route re-runs this on
 * every request precisely because the client's run can be skipped entirely by
 * anyone posting straight to the endpoint.
 *
 * The retreat path asks for more and expects less: a phone number and the
 * "what do you want to be clearer on" answer are required, and the message is
 * not, because name, email, phone and that answer already carry what Imam
 * Shuaib needs to confirm a seat.
 */
export function validateContact(input: ContactInput): ContactErrors {
  const isRetreat = input.program === ANCHORED_TOPIC;
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please tell us your name.";

  if (!input.email)
    errors.email = "Please enter an email address so we can reply.";
  else if (!isEmail(input.email))
    errors.email = "That does not look like an email address.";

  if (!isRetreat && input.message.length < 10)
    errors.message = "A sentence or two about what you need, please.";

  if (isRetreat) {
    // Deliberately loose. Phone formats differ by country and a strict
    // pattern rejects real numbers far more often than it catches bad ones;
    // seven digits is enough to catch an empty box or "n/a" without arguing
    // with anyone's international format.
    const digits = input.phone.replace(/\D/g, "");
    if (!input.phone) errors.phone = "A number we can text, please.";
    else if (digits.length < 7)
      errors.phone = "That looks too short to be a phone number.";

    if (!input.outcome)
      errors.outcome = "Please answer this one — it shapes the weekend.";
  }

  return errors;
}

export const isRetreatSubmission = (program: string) =>
  program === ANCHORED_TOPIC;
