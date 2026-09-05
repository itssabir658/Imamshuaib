import type { NavItem, Service, Testimonial } from "@/lib/types";

/**
 * ⚠️ PLACEHOLDER CONTENT — MUST BE REPLACED BEFORE LAUNCH
 *
 * This file is the single seam between the components and a CMS. Some of what
 * is in it was written to give the design something real-shaped to hold, and
 * makes claims about a real person that nobody has verified:
 *
 *   - `stats` — every figure is invented.
 *   - `testimonials` — the names and quotes are invented.
 *   - `site.email`, `site.phone`, `site.social` — not confirmed.
 *   - Anything in a service marked PLACEHOLDER below — prices, durations and
 *     cadences in particular.
 *
 * Publishing invented numbers or testimonials as fact is the kind of thing
 * that costs a scholar his credibility, so treat replacing them as a launch
 * blocker rather than a nice-to-have. Prose that only describes what a service
 * *is* has been kept deliberately general and is safe to keep.
 */

export const site = {
  name: "Imam Shuaib",
  legalName: "Imam Shuaib Mansoori",
  url: "https://imamshuaib.com",
  tagline: "Empowering Muslims worldwide through faith and knowledge",
  description:
    "Imam Shuaib is an educator and community leader offering Qur'anic study, one-to-one coaching, and relationship counselling — clear, heartfelt Islamic teaching for every stage of life.",
  email: "salam@imamshuaib.com",
  phone: "+1 (000) 000-0000",
  social: {
    youtube: "https://youtube.com/@imamshuaib",
    instagram: "https://instagram.com/imamshuaib",
    tiktok: "https://tiktok.com/@imamshuaib",
  },
} as const;

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/services",
    children: [
      { label: "Timeless Qur'an", href: "/services/timeless-quran" },
      { label: "1:1 Coaching for Men", href: "/services/coaching-for-men" },
      { label: "Relationship Counseling", href: "/services/counseling" },
      { label: "All programs", href: "/services" },
    ],
  },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  {
    id: "timeless-quran",
    title: "Timeless Qur'an",
    description:
      "A guided tafsir journey through a surah at a time — history, language, and the lessons that still land today.",
    href: "/services/timeless-quran",
    icon: "quran",
    ctaText: "Register",
    ctaHref: "/contact?program=timeless-quran",
    ctaNote: "Free to join. PLACEHOLDER: confirm whether a fee applies.",
    featured: true,
    body: [
      "Most of us have read the Qur'an far more often than we have understood it. Timeless Qur'an slows the text down: one surah at a time, taken in order, with the history around it, the language inside it, and the question of what it is actually asking of us this week.",
      "Sessions are taught, not lectured at. Questions interrupt the class rather than waiting until the end, and nobody is expected to arrive already knowing Arabic.",
    ],
    benefits: [
      "Read a surah with its context, not in isolation",
      "Enough Arabic to follow the argument of a passage",
      "The classical commentary, explained in plain language",
      "A weekly rhythm that survives a full-time job",
    ],
    format: [
      { label: "Format", value: "Group class, in person and online" },
      { label: "Cadence", value: "Weekly — PLACEHOLDER: confirm the day" },
      { label: "Length", value: "PLACEHOLDER: confirm session length" },
      { label: "Level", value: "No prior Arabic assumed" },
    ],
    suitedTo: [
      "You have read the Qur'an in translation and want to go deeper",
      "You have tried a tafsir podcast and lost the thread",
      "You want a class you can bring a teenager to",
    ],
  },
  {
    id: "coaching-for-men",
    title: "1:1 Coaching for Men",
    description:
      "Private sessions on faith, work, and family — practical structure for men carrying a lot at once.",
    href: "/services/coaching-for-men",
    icon: "coaching",
    ctaText: "Book a session",
    ctaHref: "/contact?program=coaching-for-men",
    ctaNote: "PLACEHOLDER: confirm fees and whether a sliding scale applies.",
    featured: true,
    body: [
      "A lot of men are holding a job, a marriage, children, ageing parents and a faith they feel they are failing at — and have nobody to say that to out loud. This is a private, confidential hour to say it out loud and then do something about it.",
      "It is not therapy and does not replace it. It is structured coaching from someone who knows both the deen and the particular pressures of the life you are actually living.",
    ],
    benefits: [
      "A confidential hour with no audience and no performance",
      "A prayer life that fits the week you actually have",
      "Concrete next steps, not general encouragement",
      "Honest accountability between sessions",
    ],
    format: [
      { label: "Format", value: "One to one, in person or by video" },
      { label: "Length", value: "PLACEHOLDER: confirm session length" },
      { label: "Cadence", value: "PLACEHOLDER: confirm cadence" },
      { label: "Privacy", value: "Nothing said leaves the room" },
    ],
    suitedTo: [
      "You are functioning, but running on empty",
      "Your prayer has become the first thing to go in a hard week",
      "You want to be a better husband or father and do not know where to start",
    ],
  },
  {
    id: "counseling",
    title: "Relationship Counseling",
    description:
      "Premarital, marital, and family counselling grounded in prophetic guidance and plain, honest conversation.",
    href: "/services/counseling",
    icon: "counseling",
    ctaText: "Book a session",
    ctaHref: "/contact?program=counseling",
    ctaNote:
      "PLACEHOLDER: confirm fees. Note where a case would be referred on to a licensed therapist.",
    featured: true,
    body: [
      "Couples rarely arrive because of the argument they are having. They arrive because of the one underneath it that neither of them has language for yet. These sessions are for finding that language — before a nikah, in the middle of a hard year, or when a family has stopped being able to talk at all.",
      "Both people are heard before anyone is advised. Where a situation needs a licensed therapist, or safeguarding, it is referred on — that is stated plainly at the outset rather than discovered later.",
    ],
    benefits: [
      "Premarital sessions that ask the questions nobody thinks to ask",
      "A neutral room where both people get heard",
      "Prophetic guidance applied to a real marriage, not an ideal one",
      "A clear referral when a case needs clinical care",
    ],
    format: [
      { label: "Format", value: "Couples, families, or individuals" },
      { label: "Length", value: "PLACEHOLDER: confirm session length" },
      { label: "Setting", value: "In person or by video" },
      { label: "Scope", value: "Referred on where clinical care is needed" },
    ],
    suitedTo: [
      "You are getting married and want to do the hard conversations first",
      "The same argument keeps coming back in a different costume",
      "A parent and a teenager have stopped talking",
    ],
  },
  {
    id: "end-of-life",
    title: "End-of-Life Preparation",
    description:
      "Wills, janazah planning, and sitting with families through the hardest weeks — with dignity and clarity.",
    href: "/services/end-of-life",
    icon: "dua",
    ctaText: "Get in touch",
    ctaHref: "/contact?program=end-of-life",
    ctaNote: "Available at short notice for a bereavement.",
    featured: true,
    body: [
      "Almost nobody plans for this, and the cost of not planning falls on the people least able to carry it — a family making decisions about ghusl, burial and inheritance in the first forty-eight hours of grief.",
      "This is help doing it beforehand, calmly: an Islamic will, a written janazah plan, and the practical questions answered while everyone is well. And when it is not beforehand, it is someone to sit with the family and take the arrangements off them.",
    ],
    benefits: [
      "An Islamic will, written before it is urgent",
      "A janazah plan your family can simply follow",
      "The fiqh of inheritance explained without jargon",
      "Someone present through the burial and the days after",
    ],
    format: [
      { label: "Format", value: "In person with the family" },
      { label: "Timing", value: "Planned ahead, or at short notice" },
      { label: "Includes", value: "Will, janazah plan, and the ghusl arrangements" },
      {
        label: "Legal",
        value:
          "PLACEHOLDER: state clearly that this is not legal advice and a solicitor must review any will",
      },
    ],
    suitedTo: [
      "You have been meaning to write a will for years",
      "A parent is unwell and nothing has been discussed",
      "A death has just happened and you do not know the order of things",
    ],
  },
  {
    id: "friday-sermon",
    title: "Friday Sermon",
    description:
      "Weekly khutbah for masajid and campuses, written for the community actually in the room.",
    href: "/services/friday-sermon",
    icon: "minbar",
    ctaText: "Invite Imam Shuaib",
    ctaHref: "/contact?program=friday-sermon",
    featured: true,
    body: [
      "A khutbah written for the community in front of it — not a general talk delivered anywhere. That means a conversation with you beforehand about what your congregation is carrying this month.",
      "Delivered in English, with the Arabic given its due and translated rather than assumed.",
    ],
    benefits: [
      "A khutbah shaped around your congregation, not a stock talk",
      "English delivery with the Arabic translated, never assumed",
      "Kept to time, every time",
      "Available for jumu'ah, Eid, and campus prayer spaces",
    ],
    format: [
      { label: "Format", value: "Jumu'ah, Eid, or campus prayer" },
      { label: "Language", value: "English, with Arabic translated" },
      { label: "Notice", value: "PLACEHOLDER: confirm required notice" },
      { label: "Travel", value: "PLACEHOLDER: confirm travel radius" },
    ],
    suitedTo: [
      "Your masjid needs a khutbah your younger congregation will stay for",
      "You are running a campus jumu'ah and want it taken seriously",
      "You need an Eid khutbah booked well in advance",
    ],
  },
  {
    id: "nikah",
    title: "Nikah Officiating",
    description:
      "Officiating your marriage ceremony, with the counselling and paperwork handled before the day itself.",
    href: "/services/nikah",
    icon: "nikah",
    ctaText: "Check a date",
    ctaHref: "/contact?program=nikah",
    featured: true,
    body: [
      "The ceremony is the short part. What makes it go well is everything settled beforehand — the premarital conversations, the mahr agreed and written, the witnesses briefed, and the paperwork correct so nobody is chasing a document afterwards.",
      "On the day the nikah is conducted in English and Arabic, so that every guest present understands what is being agreed to.",
    ],
    benefits: [
      "Premarital sessions included before the ceremony",
      "The contract, mahr and witnesses handled properly",
      "Conducted in English and Arabic so guests can follow",
      "Coordination with your venue and the civil registration",
    ],
    format: [
      { label: "Includes", value: "Premarital sessions and the ceremony" },
      { label: "Language", value: "English and Arabic" },
      { label: "Notice", value: "PLACEHOLDER: confirm booking lead time" },
      {
        label: "Civil registration",
        value: "PLACEHOLDER: confirm what is and is not covered legally",
      },
    ],
    suitedTo: [
      "You want the nikah done properly, not rushed",
      "Your families speak different first languages",
      "You would rather one person handled the whole thing",
    ],
  },
  {
    id: "childrens-story-time",
    title: "Children's Story Time",
    description:
      "Stories of the prophets told for young listeners — short, warm, and genuinely memorable.",
    href: "/services/childrens-story-time",
    icon: "children",
    ctaText: "Book a session",
    ctaHref: "/contact?program=childrens-story-time",
    body: [
      "Children remember stories long after they have forgotten instructions. These are the stories of the prophets told properly — kept short, kept warm, and told at a pace that holds a room of six-year-olds.",
      "Suitable for weekend schools, masjid children's programmes, and family events.",
    ],
    benefits: [
      "Stories of the prophets told at a child's pace",
      "Short enough to hold attention, warm enough to stay with them",
      "Questions welcomed, and answered honestly",
      "Works for weekend schools and family events alike",
    ],
    format: [
      { label: "Ages", value: "PLACEHOLDER: confirm age range" },
      { label: "Length", value: "PLACEHOLDER: confirm session length" },
      { label: "Setting", value: "Weekend schools, masajid, family events" },
    ],
    suitedTo: [
      "Your weekend school wants something the children look forward to",
      "You are running a family day and need a session for the youngest",
    ],
  },
  {
    id: "speaking",
    title: "Speaking Engagements",
    description:
      "Talks and panels for conferences, MSAs, and fundraisers across North America.",
    href: "/services/speaking",
    icon: "speaking",
    ctaText: "Enquire about a date",
    ctaHref: "/contact?program=speaking",
    body: [
      "Talks, panels and fundraiser appearances — prepared for the specific audience rather than pulled off a shelf. Topics span Qur'anic study, family life, and the practical business of holding onto faith in a demanding week.",
      "Happy to take the difficult question from the floor rather than the comfortable one.",
    ],
    benefits: [
      "A talk built for your audience and your theme",
      "Comfortable on a panel and in a Q&A",
      "Experience with fundraisers and the ask that goes with them",
      "Reliable on timing and on brief",
    ],
    format: [
      { label: "Formats", value: "Keynote, panel, workshop, fundraiser" },
      { label: "Region", value: "PLACEHOLDER: confirm travel and region" },
      { label: "Notice", value: "PLACEHOLDER: confirm required notice" },
    ],
    suitedTo: [
      "You are programming a conference and need a speaker who prepares",
      "Your MSA wants a talk students will actually turn up to",
      "You need a fundraiser speaker who can make the ask well",
    ],
  },
];

/** ⚠️ PLACEHOLDER — invented names and quotes. Replace with real ones. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Yusuf A.",
    role: "Timeless Qur'an student",
    text: "I had read this surah a dozen times. One session with Imam Shuaib and I realised I had never actually understood a line of it.",
  },
  {
    id: "t2",
    name: "Maryam H.",
    role: "Counselling client",
    text: "He listened first. No lecture, no judgement — just honest guidance that my husband and I could both actually act on.",
  },
  {
    id: "t3",
    name: "Bilal R.",
    role: "1:1 Coaching",
    text: "Six weeks in and my prayers, my work, and my patience at home have all moved in the same direction. That is not a coincidence.",
  },
];

/** White-on-dark partner marks carried over from the current site. */
export const partners = [
  { src: "/images/partner-almaghrib-white.png", alt: "AlMaghrib Institute", width: 576, height: 216 },
  { src: "/images/partner-2-white.png", alt: "Partner organisation", width: 1320, height: 407 },
  { src: "/images/partner-3-white.png", alt: "Partner organisation", width: 1321, height: 407 },
  { src: "/images/partner-1-white.png", alt: "Partner organisation", width: 939, height: 407 },
  { src: "/images/partner-4-white.png", alt: "Partner organisation", width: 1035, height: 407 },
];

/** ⚠️ PLACEHOLDER — every figure here is invented. Replace before launch. */
export const stats = [
  { value: "15+", label: "Years teaching" },
  { value: "3", label: "Continents called home" },
  { value: "1,200+", label: "Students guided" },
  { value: "100%", label: "Of gifts fund classes" },
];

export function getService(slug: string) {
  return services.find((s) => s.id === slug);
}
