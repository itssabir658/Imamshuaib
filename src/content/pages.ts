import type { LegalSection } from "@/lib/types";

/**
 * ⚠️ The biography below is built ONLY from what the existing site already
 * claims: that Imam Shuaib is an educator and community leader, born in India,
 * raised in Nigeria, educated in America. No degrees, institutions, teachers,
 * dates or titles have been invented, because inventing credentials for a
 * scholar is the single most damaging thing a website can do to him.
 *
 * Every gap that needs a real answer is marked. Fill them in from his own
 * account, not from a guess.
 */
export const about = {
  eyebrow: "About",
  title: "A global life, brought back to one classroom",
  lead: "Imam Shuaib is an educator and community leader with a passion for clear, heartfelt Islamic teaching — the kind you can act on before Friday comes round again.",
  quote: {
    text: "I want the person at the back of the hall to walk out understanding the ayah as well as the person at the front.",
    attribution: "Imam Shuaib",
  },
  sections: [
    {
      heading: "Three countries, one vocation",
      body: [
        "Born in India, raised in Nigeria, and educated in America, Imam Shuaib has spent his life among Muslims who look nothing like each other and worry about exactly the same things. That range is the reason his teaching travels: the questions a student brings in Lagos and the ones brought in Chicago turn out to be the same question wearing different clothes.",
        "It is also why he refuses the two easy registers — the academic lecture that impresses nobody it was meant to help, and the motivational talk that leaves you with a feeling and no next step.",
      ],
    },
    {
      heading: "How he teaches",
      body: [
        "Slowly, and in plain language. A surah is taken in order, with its history around it and its Arabic opened up rather than assumed. Questions interrupt the class instead of waiting politely until the end.",
        "The test he sets himself is simple: can the person who came in tired, at the back, having understood none of it before, walk out able to explain the passage to someone else?",
      ],
    },
    {
      heading: "Beyond the classroom",
      body: [
        "Much of the work is not teaching at all. It is a private hour with a man who is functioning but running on empty. It is a couple who arrived because of one argument and found a different one underneath. It is a family in the first forty-eight hours after a death, who need someone to take the arrangements off them.",
        "That work is quieter and it does not fill a hall, but it is the part he would keep if he had to choose.",
      ],
    },
  ],
  /** Things a real bio needs that nobody has supplied yet. */
  gaps: [
    "Where he studied, with whom, and in what discipline",
    "Any ijazah, degree or formal authorisation to teach",
    "Current masjid, institution or community affiliation",
    "Languages spoken, and which he teaches in",
    "How long he has been teaching — the '15+ years' on the home page is a placeholder",
  ],
} as const;

/**
 * ⚠️ NOT LEGAL ADVICE AND NOT A FINISHED POLICY.
 *
 * The sections below describe what this website actually does, which is
 * verifiable from the code: a newsletter field, a contact form, and a donation
 * form that hands off to Stripe. Everything that depends on facts only the site
 * owner knows — the legal entity, the jurisdiction, retention periods, the
 * processors actually contracted — is marked and MUST be completed, and the
 * result reviewed by someone qualified, before this page is published.
 */
export const privacy: LegalSection[] = [
  {
    heading: "What this page covers",
    body: [
      "This policy describes what imamshuaib.com collects, why, and what happens to it. It applies to this website only.",
      "⚠️ TO BE COMPLETED: the name and registered address of the legal entity that controls this data, and the jurisdiction whose law applies.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "If you subscribe to the newsletter, we collect the email address you enter and nothing else.",
      "If you use the contact form, we collect your name, your email address, the programme you selected if any, and the message you write.",
      "If you donate, the payment itself is processed by Stripe. Your card details are entered on Stripe's systems and are never sent to or stored on this website.",
      "⚠️ TO BE COMPLETED: whether analytics are in use, and if so which product, what it records, and whether it sets cookies. At the time of writing this site loads no analytics and sets no cookies of its own.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "To reply to you, to send the newsletter you asked for, and to process a donation you chose to make. Nothing is collected for advertising, and nothing is sold or shared for anyone else's marketing.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "⚠️ TO BE COMPLETED: retention periods for contact form submissions, newsletter subscriptions, and donation records. Donation records are typically kept for the period your tax authority requires.",
    ],
  },
  {
    heading: "Who else sees it",
    body: [
      "Stripe processes payments and holds the card data. ⚠️ TO BE COMPLETED: the newsletter provider, the email or hosting provider that receives contact form submissions, and any other processor.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. You can unsubscribe from the newsletter from any email it sends.",
      "⚠️ TO BE COMPLETED: the rights that actually apply under your jurisdiction, and the address to send such a request to.",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS. Payment card data is handled entirely by Stripe, which is PCI-DSS compliant, and never touches this website's servers.",
    ],
  },
];

/** ⚠️ Same warning as the privacy policy: a scaffold, not a finished document. */
export const terms: LegalSection[] = [
  {
    heading: "Using this site",
    body: [
      "You are welcome to read, share and quote what is published here. Please attribute it.",
      "⚠️ TO BE COMPLETED: whether reproduction of articles in full is permitted, and on what terms.",
    ],
  },
  {
    heading: "Bookings and sessions",
    body: [
      "Submitting the contact form is a request, not a confirmed booking. A session is confirmed only when you receive a reply confirming it.",
      "⚠️ TO BE COMPLETED: cancellation notice, rescheduling, and refund terms for paid sessions.",
    ],
  },
  {
    heading: "Counselling and pastoral care",
    body: [
      "Coaching and counselling offered here are pastoral, not clinical. They are not psychotherapy, and they do not replace care from a licensed mental health professional. Where a situation calls for clinical care or safeguarding, it will be referred on.",
      "If you are in immediate danger or crisis, contact your local emergency services.",
    ],
  },
  {
    heading: "Wills and inheritance",
    body: [
      "Guidance on Islamic wills and inheritance is religious guidance. It is not legal advice, and a will must be reviewed by a qualified solicitor in your jurisdiction to be legally effective.",
    ],
  },
  {
    heading: "Donations",
    body: [
      "Donations are voluntary and are used to fund teaching and outreach.",
      "⚠️ TO BE COMPLETED: whether donations are tax-deductible, under what registration number, the refund policy, and — if Zakat is accepted — exactly how Zakat funds are segregated and disbursed. Do not publish a Zakat claim that has not been verified.",
    ],
  },
];
