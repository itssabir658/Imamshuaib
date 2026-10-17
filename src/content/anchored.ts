/**
 * ANCHORED — men's retreat, 13–15 November 2026, Waterdown, Hamilton.
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
  dates: "November 13 to 15, 2026",
  place: "Private countryside property, Waterdown, Hamilton",
  /** The short form, for lines where the full place would crowd the date.
   *
   *  "Hamilton", not "Ontario", confirmed 17 October. Waterdown is a
   *  community inside the City of Hamilton, so both are true; this matches
   *  `place` above so the main page and the registration page name the
   *  venue the same way, which was the point of the 15 October request.
   *
   *  The schema.org address on the Anchored page is deliberately NOT changed
   *  to follow: there, `addressRegion` means the province and must stay
   *  "ON". Display copy and a postal address are not the same field. */
  shortPlace: "Waterdown, Hamilton",

  /**
   * A fixed line, not a counter.
   *
   * The original brief asked for an "X seats remaining" field for Imam Shuaib
   * to keep current. It was removed on 11 October at his request: nothing was
   * wired to it, so it was a number that could only ever go stale, and a
   * stale count on a ten-seat retreat is worse than no count. This states the
   * scale and how a seat is actually secured, both of which stay true.
   */
  seatsTotal: 10,
  seatsLine: "Ten seats. Confirmed personally by Imam Shuaib.",

  /**
   * The promo. "Goes directly under the hero section", per the brief.
   *
   * 720×1280, 66 seconds, 17.5 MB — a VERTICAL cut, which matches the brief's
   * note that the traffic comes from WhatsApp and Instagram. The page sizes
   * the slot from these numbers, so swapping in a landscape re-cut means
   * changing the aspect in PromoVideo.tsx too.
   *
   * Transcoded from the 452 MB camera master the owner supplied: 2160×3840
   * HEVC Main 10 at 60fps, HLG HDR, ~57 Mbps, with its `moov` atom after
   * `mdat` so nothing could play until the whole file had arrived. Three
   * things had to happen to it and all three matter:
   *
   *   - HLG HDR was tone-mapped to SDR Rec.709 through zscale/tonemap.
   *     Scaling a 10-bit HLG source straight into 8-bit H.264 without that
   *     step is the usual way HDR footage ends up looking washed out and grey.
   *   - `-movflags +faststart` puts `moov` first, so playback starts on the
   *     first chunk instead of the last.
   *   - 720 rather than 1080: at 1080 the same encode was 68 MB, because
   *     handheld grass and foliage are expensive to compress. The player is
   *     capped at 464 CSS px, where 720 still has headroom on a 2x screen.
   *
   * Re-run it with ffmpeg-static (a devDependency) if a new master arrives.
   */
  video: {
    src: "/video/anchored-promo.mp4",
    width: 720,
    height: 1280,
    /** Seconds. Measured off the file, shown on the play overlay so people
     *  know what they are committing to before they tap. */
    duration: 66,
    poster: "/images/anchored-promo-poster.webp",
    /**
     * Null, and that is correct rather than outstanding.
     *
     * The video carries OPEN captions — they are burned into the picture for
     * its whole length, and the master has no subtitle stream. WCAG 1.2.2
     * accepts open captions, so the requirement is met without a <track>.
     *
     * A .vtt would still add things burned-in text cannot: captions a viewer
     * can switch off, resize with their own font settings, or have read by a
     * braille display, plus a transcript search engines can index. Worth
     * having eventually; not a gap today.
     */
    captions: null,
  } as {
    src: string;
    width: number;
    height: number;
    duration: number;
    poster: string | null;
    captions: string | null;
  } | null,

  /**
   * THERE IS NO ONLINE CHECKOUT, ON PURPOSE.
   *
   * This page used to hold a Stripe destination and an e-transfer address,
   * both waiting to be supplied. On 11 October Imam Shuaib settled it the
   * other way: every seat is confirmed personally, the form is the only way
   * in, and the deposit is arranged by reply. So there is nothing to
   * configure here and no half-wired payment path to leave lying around —
   * every Reserve control points at the form.
   */

  hero: {
    headline: "Anchored",
    sub: "A Men's Retreat",
    line: "For the man who has been strong for everyone else.",
    scale: "Ten men. Two nights. One table.",
    cta: "Reserve your seat",
    /**
     * Was "10 seats only. $250 deposit secures your place." The "10 seats
     * only" half was cut on 11 October: the line directly above it now reads
     * "Ten seats. Confirmed personally by Imam Shuaib.", and two consecutive
     * lines opening on the same fact was most of why the stack felt cluttered.
     * The deposit is the only thing this line still needs to carry.
     */
    note: "$250 deposit secures your place.",
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

  /**
   * SECTION 3 — the teaching.
   *
   * Revised 9 October 2026. Al-Fatiha went from three sessions to one,
   * "The servants of the Most Merciful" came in as 02, and "Sacred manhood"
   * came out — that material now sits inside the Sunday closing circle rather
   * than having a session of its own. The order here IS the running order;
   * the schedule below has to agree with it.
   */
  work: [
    {
      title: "Surah Al-Fatiha, up close.",
      body: "One in-depth session on the surah the Prophet (ﷺ) called the greatest in the Qur'an. Not translation. Who Allah is, and what the seven verses you recite seventeen times a day are actually asking of you.",
    },
    {
      title: "The servants of the Most Merciful.",
      body: "13 qualities Allah uses to describe the believers in Surah Al-Furqan. Humility that is not weakness. Spending that is neither wasteful nor stingy. Walking past nonsense with dignity. What these look like in a career, a marriage and a group chat.",
    },
    {
      title: "The diseases of the heart.",
      body: "Anger. Arrogance. Heedlessness. Love of the world. Each one named honestly, each one with a prophetic remedy. Drawn from the classical tradition of self-purification.",
    },
    {
      title: "Understanding the monthly cycle.",
      body: "An honest, in-depth session on what your wife experiences across the month, and how a husband supports her rather than simply endures it. Most men think they know this. Very few do.",
    },
  ],

  /** SECTION 4 — the land. */
  property: [
    "Horseback riding on the land, both days.",
    "Archery. The Prophet (ﷺ) said strength is in shooting.",
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
        "Session: Surah Al-Fatiha, up close",
        "Horseback riding and archery",
        "Dhuhr, lunch, rest",
        "Session: The servants of the Most Merciful",
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
        "Session: The diseases of the heart",
        "Closing circle: what you carry home",
        "12:00 PM departure",
      ],
    },
  ],

  /**
   * SECTION 6 — fit.
   *
   * The "Not for: anyone looking for a holiday, a networking weekend, or a
   * crowd" block was removed on 11 October at Imam Shuaib's request. It was
   * in the original copy document, so do not reinstate it from there — the
   * deletion is deliberate, and "confirmed personally" is now said in the
   * deposit panel and the FAQ instead.
   */
  who: {
    forMen: [
      "Married men who want to be better husbands, fathers, and leaders.",
      "Men who are doing fine on paper and know something is missing.",
      "Men who want a scholar they can actually call, not a speaker they once heard.",
    ],
  },

  /** SECTION 7 — the host. */
  about:
    "Sixteen years of community work. He is known for one thing above all: he stays reachable. The men he has mentored are still in touch years later. That is not a tagline, it is the model.",

  /** SECTION 8 — price, and how a seat is actually secured. */
  investment: {
    tiers: [
      { name: "Early Bird", price: "$495", note: "Ends November 1st" },
      // `lead` renders bold ahead of the note — 15 October: "Pls boldface
      // After so it stands out".
      { name: "Standard", price: "$595", note: "November 1st", lead: "After" },
    ] as { name: string; price: string; note: string; lead?: string }[],
    includes:
      "Includes two nights accommodation, all meals by world renowned Chef Baig, horseback riding, archery, all sessions and materials, and two months of post-retreat live sessions with Imam Shuaib.",
    deposit: "$250 deposit secures your seat. Balance due November 4, 2026.",
    terms:
      "Deposit non-refundable after November 1. Seat transferable to another brother.",
    /** Replaces "Pay by card or e-transfer" — 11 October. */
    howTitle: "How this works",
    howBody: [
      "Every seat is confirmed personally.",
      "There is no online checkout, on purpose. Submit the short form and Imam Shuaib will be in touch within 24 hours to confirm your place and send E-transfer details for the deposit.",
    ],
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
      a: "Send Imam Shuaib a WhatsApp or a text. He will confirm your seat and send E-transfer details. There is no online checkout, every seat is confirmed personally.",
    },
    {
      q: "What happens after Sunday?",
      a: "You join the cohort circle: live sessions and direct access to Imam Shuaib. Two months included.",
    },
  ],

  /** SECTION 10 */
  close: {
    line: "Ten seats. One weekend. November 13.",
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
      source: "The Prophet (ﷺ), al-Tirmidhi",
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
