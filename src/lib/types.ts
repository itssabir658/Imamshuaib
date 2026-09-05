/**
 * Content models from §6 of the redesign spec. The Sermon and Event models
 * were removed along with those sections of the site. These are the shapes a CMS
 * (WordPress CPTs or a headless equivalent) must return, so the components
 * below can be pointed at a real API later without changing their props.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Route to the detail page. */
  href: string;
  /** Key of an icon in `components/ui/ServiceIcon`. */
  icon: ServiceIconName;
  heroImage?: string;
  videoUrl?: string;
  ctaText?: string;
  /** Surfaced on the home page teaser. */
  featured?: boolean;
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

export type Article = {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
  tags: string[];
};

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
