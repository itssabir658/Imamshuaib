import { site } from "./site";

/**
 * ⚠️ TWO THINGS MUST BE SUPPLIED BEFORE THIS PAGE GOES LIVE
 *
 *   1. `dates`      — currently the literal placeholder from the brief.
 *   2. `registerUrl` — see the note on that field.
 *
 * Everything else here is either copy from the brief or general, verifiable
 * description of the places themselves. No price, no group size, no departure
 * city, no operator and no inclusions have been invented, because a tour page
 * that guesses at those is the kind of page people pay money against.
 *
 * `itineraryConfirmed` below is deliberately `false`: the sites listed are the
 * ones the brief named as examples. Flip it to `true` only once the itinerary
 * is actually fixed — it drives the wording of the disclaimer on the page.
 */

export const tour = {
  name: "Journey to Al-Aqsa",
  /** ⚠️ PLACEHOLDER — the real travel dates go here. */
  dates: "[TOUR DATES]",
  /** True once the places below are a confirmed itinerary, not an intention. */
  itineraryConfirmed: false,

  /**
   * Where the QR code and every "Register" button point.
   *
   * It defaults to this site's own contact form with the programme
   * pre-selected, which is a real working destination today. If registration
   * is handled by a tour operator or a booking platform, replace this one
   * string and the QR code regenerates with it on the next build.
   *
   * ⚠️ This resolves through `site.url`, which is still the intended domain
   * rather than a confirmed live one. A QR code is printed, shared and
   * screenshotted — it has to be right before anyone scans it. Re-check this
   * after the domain is final.
   */
  registerUrl: `${site.url}/contact?program=al-aqsa-tour`,

  hero: {
    headline: "Journey to Al-Aqsa",
    standfirst:
      "An unforgettable spiritual journey through Al-Aqsa, Jerusalem and its most sacred Islamic landmarks.",
    summary:
      "Join Imam Shuaib on a guided journey through the sacred sites of Al-Quds, exploring its rich Islamic history, spirituality and heritage.",
  },

  qr: {
    heading: "Ready to Join the Journey?",
    caption: "Scan to Register",
    note: "Limited spaces available.",
  },

  /**
   * Six places. Each description says what the place *is* — history that is
   * not in dispute — rather than what the visit will include, which nobody
   * has confirmed yet.
   */
  highlights: [
    {
      motif: "dome",
      title: "Masjid Al-Aqsa",
      meta: "Al-Haram Al-Sharif",
      body: "Not one building but the whole noble sanctuary — courtyards, colonnades and prayer halls across some thirty-five acres, and the first of the two qiblas.",
    },
    {
      motif: "rock",
      title: "The Dome of the Rock",
      meta: "Qubbat al-Sakhra",
      body: "Completed around 691 CE under Abd al-Malik, and still the oldest surviving masterpiece of Islamic architecture anywhere in the world.",
    },
    {
      motif: "walls",
      title: "The Old City",
      meta: "Al-Quds",
      body: "A square kilometre inside Suleiman's sixteenth-century walls, where the markets, madrasas and gates of a thousand years of Muslim Jerusalem are still in daily use.",
    },
    {
      motif: "cave",
      title: "Al-Haram Al-Ibrahimi",
      meta: "Hebron — Al-Khalil",
      body: "The sanctuary raised over the cave that tradition holds as the resting place of Ibrahim \u0639\u0644\u064a\u0647 \u0627\u0644\u0633\u0644\u0627\u0645 and his family, under Herodian stonework that has stood two thousand years.",
    },
    {
      motif: "lantern",
      title: "Heritage beyond the walls",
      meta: "Mamluk and Ayyubid Al-Quds",
      body: "The quieter inheritance — sabeels, ribats, Mamluk facades and the endowments that kept the city's scholarship alive for centuries.",
    },
    {
      motif: "book",
      title: "Taught on the ground",
      meta: "With Imam Shuaib",
      body: "History and tafsir delivered where they happened, in plain language, with room for the questions that only come to you once you are standing there.",
    },
  ],

  /** Explore → Reflect → Learn → Experience, as the brief set it out. */
  journey: [
    {
      step: "Explore",
      body: "Arrive into Al-Quds and walk the Old City — the gates, the quarters and the approach to the sanctuary.",
    },
    {
      step: "Reflect",
      body: "Prayer inside Masjid Al-Aqsa, and the stillness of a courtyard that has held worshippers for thirteen centuries.",
    },
    {
      step: "Learn",
      body: "Sessions on site with Imam Shuaib: the history of the sanctuary, the Isra and Mi'raj, and why this place holds what it holds.",
    },
    {
      step: "Experience",
      body: "Beyond Jerusalem — Al-Khalil and the heritage sites that fill in the rest of the picture.",
    },
  ],

  finalCta: {
    heading: "Your Journey to Al-Aqsa Begins Here.",
    body: "Scan the QR code to register your interest and join us on this unforgettable journey.",
  },
} as const;

export type TourMotif = (typeof tour.highlights)[number]["motif"];
