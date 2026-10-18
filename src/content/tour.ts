import { site } from "./site";

/**
 * The 18 October wording, kept verbatim but held in three pieces.
 *
 * He sent it as one string joined by a pipe. That is right for the page
 * title, and wrong for the hero, where the date sits in a small pill in
 * uppercase with letter-spacing — a treatment built for "March 27 to
 * April 7" and not for a hundred-character sentence with two clauses in it.
 * Setting a sentence as a label is the same mistake that made the Anchored
 * seats line look cluttered, so the two clauses are split for display and
 * rejoined for the title. Nothing is reworded.
 */
const TOUR_DATES = "Tentative: March 27 to April 7, 2027";
const TOUR_EXTENSION =
  "Possible Three Cities extension: Al-Aqsa, Madinah and Makkah";

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
  /** The pill in the hero. Short enough to be set as a label. */
  dates: TOUR_DATES,
  /** The second clause, set as the sentence it is, under the pill. */
  extension: TOUR_EXTENSION,
  /** Both, joined exactly as he wrote them — for the page title. */
  datesFull: `${TOUR_DATES} | ${TOUR_EXTENSION}`,
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
   * Resolves through `site.url`, which now names www.imamshuaib.com — the
   * host that actually serves, so a scan lands without a redirect hop.
   * Confirmed against production on 18 October.
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

  /**
   * "What makes this journey different" — his list, 18 October, verbatim.
   *
   * Each point is held in three parts rather than as one string because two
   * of them carry Arabic mid-sentence. The script change has to be marked
   * `lang="ar"` for WCAG 3.1.2, which cannot be done to a bare string, and
   * every point keeps all three keys — empty where unused — so the array has
   * one shape and the component does not need to narrow a union to render it.
   */
  different: {
    title: "What makes this journey different",
    points: [
      { lead: "Jumu'ah prayer in Masjid al-Aqsa", arabic: "", tail: "" },
      { lead: "Daily lessons inside Masjid al-Aqsa", arabic: "", tail: "" },
      {
        lead: "Selected passages from the Qur'an on the legacy of the family of Imran, Isa, Maryam, Dawud and Sulayman (",
        arabic: "عليهم السلام",
        tail: ")",
      },
      {
        lead: "Real conversations on living as Muslims in the West",
        arabic: "",
        tail: "",
      },
      {
        lead: "Visits to the Maqam of Salman al-Farisi (",
        arabic: "رضي الله عنه",
        tail: "), the Bab al-Rahma cemetery, the Mount of Olives, Bethlehem and Jericho",
      },
      { lead: "Families with children welcome", arabic: "", tail: "" },
    ],
  },

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
