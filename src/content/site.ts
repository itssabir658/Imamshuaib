import type { NavItem, Service, Sermon, Testimonial } from "@/lib/types";

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

/**
 * §4 sitemap. Routes beyond "/" are scaffolded in this pass — the header marks
 * them so nothing links into a dead end before those pages are built.
 */
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
  { label: "Sermons", href: "/sermons" },
  { label: "Articles", href: "/articles" },
  { label: "Events", href: "/events" },
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
    featured: true,
  },
  {
    id: "coaching-for-men",
    title: "1:1 Coaching for Men",
    description:
      "Private sessions on faith, work, and family — practical structure for men carrying a lot at once.",
    href: "/services/coaching-for-men",
    icon: "coaching",
    ctaText: "Book a session",
    featured: true,
  },
  {
    id: "counseling",
    title: "Relationship Counseling",
    description:
      "Premarital, marital, and family counselling grounded in prophetic guidance and plain, honest conversation.",
    href: "/services/counseling",
    icon: "counseling",
    ctaText: "Book a session",
    featured: true,
  },
  {
    id: "end-of-life",
    title: "End-of-Life Preparation",
    description:
      "Wills, janazah planning, and sitting with families through the hardest weeks — with dignity and clarity.",
    href: "/services/end-of-life",
    icon: "dua",
    featured: true,
  },
  {
    id: "friday-sermon",
    title: "Friday Sermon",
    description:
      "Weekly khutbah for masajid and campuses, written for the community actually in the room.",
    href: "/services/friday-sermon",
    icon: "minbar",
    featured: true,
  },
  {
    id: "nikah",
    title: "Nikah Officiating",
    description:
      "Officiating your marriage ceremony, with the counselling and paperwork handled before the day itself.",
    href: "/services/nikah",
    icon: "nikah",
    featured: true,
  },
  {
    id: "childrens-story-time",
    title: "Children's Story Time",
    description:
      "Stories of the prophets told for young listeners — short, warm, and genuinely memorable.",
    href: "/services/childrens-story-time",
    icon: "children",
  },
  {
    id: "speaking",
    title: "Speaking Engagements",
    description:
      "Talks and panels for conferences, MSAs, and fundraisers across North America.",
    href: "/services/speaking",
    icon: "speaking",
  },
];

export const featuredSermon: Sermon = {
  id: "mercy-of-ramadan",
  title: "The Mercy of Ramadan",
  date: "2026-03-06",
  excerpt:
    "Dive deep into the themes of mercy and forgiveness in this khutbah on what the month asks of us — and what it gives back.",
  videoUrl: "https://www.youtube.com/watch?v=",
  durationMinutes: 15,
  topic: "Khutbah",
};

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

export const stats = [
  { value: "15+", label: "Years teaching" },
  { value: "3", label: "Continents called home" },
  { value: "1,200+", label: "Students guided" },
  { value: "100%", label: "Of gifts fund classes" },
];
