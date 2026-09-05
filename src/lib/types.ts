/**
 * Content models from §6 of the redesign spec. The Sermon and Event models
 * were removed along with those sections of the site. These are the shapes a
 * CMS (WordPress CPTs or a headless equivalent) must return, so the components
 * can be pointed at a real API later without changing their props.
 */

export type Service = {
  id: string;
  title: string;
  /** One line. Used on cards and as the page's meta description. */
  description: string;
  /** Route to the detail page. */
  href: string;
  /** Key of an icon in `components/ui/ServiceIcon`. */
  icon: ServiceIconName;
  heroImage?: string;
  videoUrl?: string;
  ctaText?: string;
  /** Surfaced on the home page teaser and the hero board. */
  featured?: boolean;

  /* ---- detail page ---------------------------------------------------- */
  /** Opening paragraphs. Each string is one paragraph. */
  body?: string[];
  /** "What you'll get" — the concrete promises. */
  benefits?: string[];
  /** How it runs: format, length, cadence. */
  format?: { label: string; value: string }[];
  /** Who it is for, in their own words. */
  suitedTo?: string[];
  /** Where the primary call to action goes. Defaults to /contact. */
  ctaHref?: string;
  /** Shown under the CTA — cost, or the absence of one. */
  ctaNote?: string;
};

export type ServiceIconName =
  | "quran"
  | "coaching"
  | "counseling"
  | "dua"
  | "minbar"
  | "nikah"
  | "children"
  | "speaking";

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  text: string;
  image?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** A section of a legal document. */
export type LegalSection = {
  heading: string;
  body: string[];
};
