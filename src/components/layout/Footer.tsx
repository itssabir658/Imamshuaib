import Link from "next/link";
import { navigation, services, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Donation FAQ", href: "/donate#faq" },
];

const explore = [...navigation, { label: "Donate", href: "/donate" }];

/** The programmes worth a direct route from every page. */
const programs = services.filter((s) => s.featured);

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-950 text-teal-100">
      {/* The motif runs the full height rather than stopping at a band — the
          old 14rem cut left a visible hard edge across the middle. */}
      <div
        aria-hidden="true"
        className="pattern-khatim pointer-events-none absolute inset-0 text-white/[0.045]"
      />

      <Container className="relative">
        {/* The newsletter is the footer's one action, so it gets a row of its
            own rather than being a column competing with link lists. */}
        <section
          aria-labelledby="footer-newsletter"
          className="flex flex-col gap-7 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-16"
        >
          <div className="max-w-md">
            <h2
              id="footer-newsletter"
              className="font-display text-h3 font-bold text-white"
            >
              One email a month
            </h2>
            <p className="mt-3 text-sm/relaxed text-teal-100/80">
              A new article and whatever class is coming up. Nothing else, and
              you can leave whenever you like.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <NewsletterForm />
          </div>
        </section>

        <div className="grid gap-12 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo href="/" onDark />
            <p className="mt-5 text-sm/relaxed text-teal-100/80">
              {site.description}
            </p>
            <SocialLinks className="mt-6 -ml-3" />
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-eyebrow font-semibold text-gold-300 uppercase">
              Explore
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {explore.map((item) => (
                <li key={item.href}>
                  <FooterLink
                    href={item.href}
                    highlight={item.href === "/donate"}
                  >
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programs">
            <h2 className="font-sans text-eyebrow font-semibold text-gold-300 uppercase">
              Programs
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {programs.map((service) => (
                <li key={service.id}>
                  <FooterLink href={service.href}>{service.title}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/services">
                  All {services.length} programs
                </FooterLink>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-eyebrow font-semibold text-gold-300 uppercase">
              Get in touch
            </h2>
            <address className="mt-5 flex flex-col gap-3 text-sm not-italic">
              <a
                href={"mailto:" + site.email}
                className="w-fit text-teal-100/85 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {site.email}
              </a>
              <a
                href={"tel:" + site.phone.replace(/[^+\d]/g, "")}
                className="w-fit text-teal-100/85 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {site.phone}
              </a>
            </address>
            <p className="mt-5 text-sm/relaxed text-teal-100/70">
              For a bereavement, please call rather than email.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-teal-100/60">
              &copy; {new Date().getFullYear()} {site.legalName}. All rights
              reserved.
            </p>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-teal-100/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-teal-100/60">
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="size-3.5 shrink-0 text-gold-300"
            >
              <rect x="3" y="7" width="10" height="7" rx="1.6" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Donations are processed by Stripe over 256-bit SSL. Card details
            never reach this site.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({
  href,
  highlight,
  children,
}: {
  href: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        highlight
          ? "text-sm font-semibold text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
          : "text-sm text-teal-100/85 underline-offset-4 transition-colors hover:text-white hover:underline"
      }
    >
      {children}
    </Link>
  );
}
