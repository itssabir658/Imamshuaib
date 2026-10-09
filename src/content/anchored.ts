/**
 * ANCHORED — men's retreat, 6–8 November 2026, Waterdown, Ontario.
 *
 * The copy below is the client's, transcribed verbatim from the landing-page
 * copy document of 8 October 2026. The brief says "Copy and paste it as
 * written", so it is not edited, tightened or re-ordered here. If something
 * reads oddly on the page, change it in the document and then change it here.
 *
 * Four instructions from that document are load-bearing, and each one is a
 * thing a future edit could quietly undo:
 *
 *   1. NO PRAYER TIMES. The schedule names prayers deliberately without clock
 *      times. Do not add them, and do not "helpfully" compute them.
 *   2. NO G4G. This is Imam Shuaib's personal brand. No Guidance for
 *      Generations branding, logo or charity registration anywhere.
 *   3. The CAPS section labels in the document ("SECTION 3: THE WORK") are
 *      structural notes to the designer and must not be published. Where a
 *      section has no heading of its own in the copy, the page gives it an
 *      sr-only one so the document still has a usable heading outline —
 *      invisible, which is what the instruction asks for, and present, which
 *      is what a screen reader needs.
 *   4. Square brackets in the document are button labels.
 *
 * ⚠️ Three things are NOT in the document and are marked below: the promo
 * video, the e-transfer details, and the Stripe destination.
 */

export const anchored = {
  name: "Anchored",
  kicker: "A Men's Retreat",
  dates: "November 6 to 8, 2026",
  place: "Private countryside property, Waterdown, Ontario",

  /**
   * The one number Imam Shuaib is expected to keep current. The brief asks for
   * "a simple 'X seats remaining' field Imam Shuaib can update" — this is it.
   * Change the number, commit, done. Set it to null to hide the count
   * entirely rather than publishing a stale one.
   */
  seatsTotal: 10,
  seatsRemaining: 10 as number | null,

  /**
   * The promo. "Goes directly under the hero section", per the brief.
   *
   * 464×832, 66 seconds, 10.9 MB — a VERTICAL social cut, not a widescreen
   * film, which is consistent with the brief's note that the traffic comes
   * from WhatsApp and Instagram. The page sizes the slot from these numbers,
   * so swapping in a landscape re-cut means changing the aspect in
   * PromoVideo.tsx too.
   *
   * 464px wide is the native resolution. The player is capped at that width
   * and never upscaled — beyond it the footage visibly softens.
   *
   * The file's `moov` atom sits before `mdat`, so it is already faststart:
   * playback begins without downloading all 11 MB.
   *
   * `poster` is null on purpose rather than for want of one. A poster would be
   * a second copy of a frame already inside the file, and `preload="metadata"`
   * paints the first frame anyway. Set it if a specific frame is wanted.
   */
  video: {
    src: "/video/anchored-promo.mp4",
    width: 464,
    height: 832,
    poster: null,
    /** ⚠️ An English .vtt. Null is allowed so a missing captions file cannot
     *  block the video going up, but the page then shows a warning — see
     *  PromoVideo.tsx. If anyone speaks in this video it needs one. */
    captions: null,
  } as {
    src: string;
    width: number;
    height: number;
    poster: string | null;
    captions: string | null;
  } | null,

  /**
   * ⚠️ NEITHER DESTINATION IS SUPPLIED.
   *
   * `cardHref` must become a server route that creates a Stripe Checkout
   * Session and redirects to Stripe's own hosted page. Card details must never
   * be entered on this site — that is what keeps the whole thing out of PCI
   * scope, and it is the same decision taken on /donate.
   *
   * `etransferTo` is the address a brother sends an Interac e-transfer to. The
   * brief requires card and e-transfer to be visible together at the deposit
   * step; with this null the page says the address is confirmed by reply
   * rather than inventing one.
   */
  cardHref: null as string | null,
  etransferTo: null as string | null,

  hero: {
    headline: "Anchored",
    sub: "A Men's Retreat",
    line: "For the man who has been strong for everyone else.",
    scale: "Ten men. Two nights. One table.",
    cta: "Reserve your seat",
    note: "10 seats only. $250 deposit secures your place.",
  },

  opening: {
    heading: "You are holding a lot. Who is holding you?",
    body: [
      "The work pressure. A marriage you want to be better at. Decisions you are second-guessing. Prayers that have gone mechanical. The quiet sense that you are performing a version of yourself all week and have nowhere to set it down.",
      "You are not failing. You are unsupported.",
      "For sixteen years, men have come to Imam Shuaib with exactly this. Not in crisis. Just scattered, and unsure whether anyone is actually guiding them.",
      "Anchored is built for those men.",
    ],
  },

  /** SECTION 2 — what the weekend is. Lead phrase, then the claim. */
  promises: [
    {
      lead: "Clarity.",
      body: "You arrive carrying four or five unresolved things. You leave knowing which one matters first, and why.",
    },
    {
      lead: "Steadiness.",
      body: "Confidence is not loudness. It is knowing what you stand on. We work on the ground underneath your decisions, not the decisions themselves.",
    },
    {
      lead: "A table you can return to.",
      body: "This weekend is the beginning of a relationship, not the end of an event. Every man leaves with direct access to Imam Shuaib.",
    },
  ],

  /** SECTION 3 — the teaching. */
  work: [
    {
      title: "Surah Al-Fatiha, up close.",
      body: "Three sessions on the surah the Prophet (peace be upon him) called the greatest in the Qur'an. Not translation. Who Allah is, and what the seven verses you recite seventeen times a day are actually asking of you.",
    },
    {
      title: "The diseases of the heart.",
      body: "Anger. Arrogance. Heedlessness. Love of the world. Each one named honestly, each one with a prophetic remedy. Drawn from the classical tradition of self-purification.",
    },
    {
      title: "Sacred manhood.",
      body: "The virtues upright men were deliberately raised into, and that almost no one is raised into now. Truthfulness, humility, courage, service, brotherhood.",
    },
    {
      title: "Understanding the monthly cycle.",
      body: "An honest, in-depth session on what your wife experiences across the month, and how a husband supports her rather than simply endures it. Most men think they know this. Very few do.",
    },
  ],

  /** SECTION 4 — the land. */
  property: [
    "Horseback riding on the land, both days.",
    "Archery. The Prophet (peace be upon him) said strength is in shooting.",
    "Bonfire, where the real conversations happen.",
    "Hot tub, for after the trail.",
    "Fully catered by world renowned Chef Baig. Every meal, properly done.",
  ],

  /**
   * SECTION 5 — the schedule.
   *
   * ⚠️ NO CLOCK TIMES, by instruction, with one exception that is in the copy
   * itself: "12:00 PM departure" on Sunday. The prayers stay unqualified.
   */
  schedule: [
    {
      day: "Friday",
      items: [
        "Depart after Jumu'ah, arrive and settle",
        "Maghrib in jama'ah on the property",
        "Evening adhkar, and what you are actually saying",
        "Dinner",
        "Opening session: Where are you unsure?",
        "Bonfire",
      ],
    },
    {
      day: "Saturday",
      items: [
        "Fajr in jama'ah and morning adhkar",
        "Breakfast",
        "Session: Surah Al-Fatiha, parts one and two",
        "Horseback riding and archery",
        "Dhuhr, lunch, rest",
        "Session: The diseases of the heart",
        "Asr",
        "Session: Understanding the monthly cycle",
        "Maghrib, dinner, Isha",
        "Open circle at the fire. No agenda, nothing recorded.",
      ],
    },
    {
      day: "Sunday",
      items: [
        "Fajr and morning adhkar",
        "Breakfast",
        "Closing session: Surah Al-Fatiha part three, and what you carry home",
        "What happens next",
        "12:00 PM departure",
      ],
    },
  ],

  /** SECTION 6 — fit. */
  who: {
    forMen: [
      "Married men who want to be better husbands, fathers, and leaders.",
      "Men who are doing fine on paper and know something is missing.",
      "Men who want a scholar they can actually call, not a speaker they once heard.",
    ],
    notFor:
      "Not for: anyone looking for a holiday, a networking weekend, or a crowd. Seats are confirmed by Imam Shuaib personally.",
  },

  /** SECTION 7 — the host. */
  about:
    "Sixteen years of community work. He is known for one thing above all: he stays reachable. The men he has mentored are still in touch years later. That is not a tagline, it is the model.",

  /** SECTION 8 — price. */
  investment: {
    tiers: [
      { name: "Early Bird", price: "$495", note: "Ends October 25th" },
      { name: "Standard", price: "$595", note: "After October 25th" },
    ],
    includes:
      "Includes two nights accommodation, all meals by world renowned Chef Baig, horseback riding, archery, all sessions and materials, and two months of post-retreat live sessions with Imam Shuaib.",
    deposit: "$250 deposit secures your seat. Balance due October 28, 2026.",
    terms:
      "Deposit non-refundable after October 21. Seat transferable to another brother.",
    payment: "Pay by card or e-transfer.",
    cta: "Secure my seat",
  },

  /** SECTION 9 */
  faq: [
    {
      q: "Can I come if I am not married?",
      a: "Seats are confirmed personally. Reach out and let's talk.",
    },
    {
      q: "What do I bring?",
      a: "Warm layers, boots, a prayer mat, a notebook. Everything else is handled.",
    },
    {
      q: "How far is the drive?",
      a: "The property is in Waterdown. Full directions on confirmation. Plan to leave right after Jumu'ah.",
    },
    {
      q: "I have never ridden a horse.",
      a: "Neither have most of the men coming. That is part of it.",
    },
    {
      q: "How do I pay?",
      a: "Card payment or e-transfer. Both options appear at checkout.",
    },
    {
      q: "What happens after Sunday?",
      a: "You join the cohort circle: live sessions and direct access to Imam Shuaib. Two months included.",
    },
  ],

  /** SECTION 10 */
  close: {
    line: "Ten seats. One weekend. November 6.",
    cta: "Reserve your seat",
  },

  /**
   * The document offers four and says "Use one or two as full-width design
   * breaks between sections", with a note that Imam Shuaib will confirm final
   * wording before publication. Two are used; the other two are kept here so
   * swapping one in is a one-line change rather than a retype.
   *
   * ⚠️ WORDING NOT YET CONFIRMED by Imam Shuaib — his note, not mine.
   */
  quotes: [
    {
      text: "The believers are but brothers.",
      source: "Qur'an 49:10",
      used: true,
    },
    {
      text: "The best of you is the best to his family, and I am the best of you to my family.",
      source: "The Prophet (peace be upon him), al-Tirmidhi",
      used: true,
    },
    {
      text: "Indeed, in the Messenger of Allah you have an excellent example.",
      source: "Qur'an 33:21",
      used: false,
    },
    {
      text: "The Day when neither wealth nor children will be of any benefit. Only those who come before Allah with a pure heart.",
      source: "Qur'an 26:88-89",
      used: false,
    },
  ],
} as const;
