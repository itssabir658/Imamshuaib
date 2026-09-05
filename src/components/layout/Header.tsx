"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { Popover } from "@/components/ui/Popover";

/**
 * Routes whose hero is a deep-teal band. On those the header floats over the
 * hero until the page scrolls, so its contents switch to the light-on-dark
 * palette — otherwise the nav sits at ~1.6:1 against the hero.
 */
const DARK_HERO_ROUTES = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile panel and close it on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const overHero = !scrolled && DARK_HERO_ROUTES.has(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out-soft",
        scrolled
          ? "bg-surface/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-page items-center gap-3 px-5 sm:px-8">
        <Logo onDark={overHero} />

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.href}
                label={item.label}
                href={item.href}
                items={item.children}
                onDark={overHero}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLink, overHero ? navLinkOnDark : navLinkOnLight)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <div className="hidden sm:block">
            <LanguageSwitcher onDark={overHero} />
          </div>
          <Button
            href="/donate"
            variant="gold"
            className="hidden sm:inline-flex"
          >
            Donate
          </Button>

          <button
            ref={menuTrigger}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-pill transition-colors lg:hidden",
              overHero
                ? "text-white hover:bg-white/10"
                : "text-ink hover:bg-teal-50",
            )}
          >
            <span className="sr-only">Open menu</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        mounted={mounted}
        triggerRef={menuTrigger}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}

const navLink =
  "rounded-pill px-3 py-2 text-sm font-medium transition-colors";
const navLinkOnLight = "text-body hover:bg-teal-50 hover:text-teal-700";
const navLinkOnDark = "text-teal-100 hover:bg-white/10 hover:text-white";

function NavDropdown({
  label,
  href,
  items,
  onDark = false,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      // The menu is portalled to body, so it is not inside `wrap` any more.
      if (!wrap.current?.contains(t) && !menu.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const hover = (next: boolean) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (next) setOpen(true);
    else closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1",
          navLink,
          onDark ? navLinkOnDark : navLinkOnLight,
        )}
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </Link>

      <Popover anchorRef={wrap} open={open} width={256}>
        <ul
          ref={menu}
          onMouseEnter={() => hover(true)}
          onMouseLeave={() => hover(false)}
        >
          {items.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-teal-50/80 hover:text-teal-700"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </Popover>
    </div>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Rendered at the document root, not inside the header.
 *
 * The header takes a `backdrop-filter` once the page scrolls, and a
 * backdrop-filter establishes a containing block for fixed-position
 * descendants. Declared inside the header, this panel's `fixed inset-0`
 * resolved against the header's own 72px box instead of the viewport, so the
 * menu opened as a 72px sliver the moment the user had scrolled at all — and
 * looked fine at the top of the page, which is why it survived review.
 *
 * Portalling to `body` puts it outside that containing block. Position is set
 * inline for the same reason it is on Popover: a class can be outranked, and
 * this must not silently break again.
 */
function MobileMenu({
  open,
  mounted,
  triggerRef,
  onClose,
}: {
  open: boolean;
  mounted: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // aria-modal alone does not stop Tab reaching the page behind, so the panel
  // takes focus on open, cycles it, and hands it back on close.
  useEffect(() => {
    const node = panel.current;
    if (!open || !node) return;

    const focusable = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );

    focusable()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      hidden={!open}
      style={{ position: "fixed", inset: 0, zIndex: 90 }}
      className="lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      {/* Click-away target. The panel has a real Close button, so this stays
          out of the tab order rather than doubling it up. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-teal-950/50 backdrop-blur-sm"
      />
      <div
        ref={panel}
        className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-surface shadow-float"
      >
        <div className="flex h-18 items-center justify-between px-5">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-pill text-ink transition-colors hover:bg-teal-50"
          >
            <span className="sr-only">Close menu</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Site menu" className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="flex flex-col divide-y divide-line/70">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3.5 font-display text-[1.375rem] leading-[1.2] font-bold tracking-[-0.015em] text-ink transition-colors hover:bg-teal-50"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mb-2 ml-4 flex flex-col gap-0.5 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-[0.8125rem] font-medium tracking-[0.005em] text-muted transition-colors hover:bg-teal-50 hover:text-teal-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 border-t border-line px-5 py-5">
          <Button
            href="/donate"
            variant="gold"
            size="lg"
            className="flex-1"
            onClick={onClose}
          >
            Donate
          </Button>
          <LanguageSwitcher />
        </div>
        <p className="px-5 pb-6 text-sm text-muted">
          <a
            href={"mailto:" + site.email}
            className="underline underline-offset-4 hover:text-teal-700"
          >
            {site.email}
          </a>
        </p>
      </div>
    </div>,
    document.body,
  );
}
