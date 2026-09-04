import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Donation FAQ", href: "/donate#faq" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-950 text-teal-100">
      {/* Decorative motif — masked, so it inherits the colour below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 text-white/[0.06]"
      >
        <div className="pattern-khatim h-full w-full" />
      </div>

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div className="max-w-sm">
            <Logo href="/" onDark />
            <p className="mt-5 text-sm/relaxed text-teal-100/80">
              {site.description}
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr]">
            <nav aria-label="Footer navigation">
              <h2 className="font-sans text-eyebrow font-semibold text-gold-300 uppercase">
                Explore
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-teal-100/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/donate"
                    className="text-sm font-semibold text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="font-sans text-eyebrow font-semibold text-gold-300 uppercase">
                Stay in touch
              </h2>
              <p className="mt-4 text-sm/relaxed text-teal-100/80">
                One email a month: a new sermon, an upcoming class, nothing
                else.
              </p>
              <NewsletterForm className="mt-5" />

              <address className="mt-7 flex flex-col gap-1.5 text-sm not-italic text-teal-100/80">
                <a
                  href={"mailto:" + site.email}
                  className="w-fit underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {site.email}
                </a>
                <a
                  href={"tel:" + site.phone.replace(/[^+\d]/g, "")}
                  className="w-fit underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {site.phone}
                </a>
              </address>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
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

          <p className="flex items-center gap-2 text-xs text-teal-100/60">
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="size-3.5 text-gold-300"
            >
              <rect x="3" y="7" width="10" height="7" rx="1.6" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            Donations secured by Stripe with 256-bit SSL
          </p>
        </div>
      </Container>
    </footer>
  );
}
