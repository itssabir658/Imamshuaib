import { AL_AQSA_TOPIC, ANCHORED_TOPIC } from "@/content/site";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "message"
  | "outcome"
  | "adults"
  | "children";

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  program: string;
  outcome: string;
  message: string;

  /**
   * Al-Aqsa only. Held as strings because that is what a form submits and
   * what a JSON body may arrive as; parsed at the point of validation so an
   * empty box and a zero stay distinguishable.
   */
  adults: string;
  children: string;
  cityCountry: string;
  tourOption: string;

  /** Honeypot. Anything in it means a bot filled the form. */
  website: string;
};

/** Whole, non-negative, and actually a number — "2 kids" is not a count. */
const asCount = (v: string) => (/^\d+$/.test(v.trim()) ? Number(v) : null);

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
    adults: str("adults"),
    children: str("children"),
    cityCountry: str("cityCountry"),
    tourOption: str("tourOption"),
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
  const isAlAqsa = input.program === AL_AQSA_TOPIC;
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please tell us your name.";

  if (!input.email)
    errors.email = "Please enter an email address so we can reply.";
  else if (!isEmail(input.email))
    errors.email = "That does not look like an email address.";

  // Only the general enquiry needs a message. Both registration paths ask
  // their own questions instead, and on those "Any questions?" is optional —
  // somebody registering for a tour may simply have none.
  if (!isRetreat && !isAlAqsa && input.message.length < 10)
    errors.message = "A sentence or two about what you need, please.";

  if (isAlAqsa) {
    const digits = input.phone.replace(/D/g, "");
    if (!input.phone) errors.phone = "A number we can text, please.";
    else if (digits.length < 7)
      errors.phone = "That looks too short to be a phone number.";

    // How many are travelling is the whole point of the enquiry — it decides
    // rooms, flights and whether the Three Cities extension is even workable.
    const adults = asCount(input.adults);
    if (!input.adults) errors.adults = "How many adults are travelling?";
    else if (adults === null) errors.adults = "Please enter a number.";
    else if (adults < 1) errors.adults = "At least one adult, please.";

    // Zero is a real answer here, so an empty box and "0" must not be
    // confused — which is why these are parsed rather than coerced.
    const children = asCount(input.children);
    if (!input.children) errors.children = "How many children? Enter 0 if none.";
    else if (children === null) errors.children = "Please enter a number.";
  }

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
