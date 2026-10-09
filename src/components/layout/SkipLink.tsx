/**
 * First focusable element on every page (WCAG 2.4.1 Bypass Blocks) — the gap
 * the audit flagged against AlMaghrib's site.
 *
 * The ivory hairline is not decoration. This pill is fixed to the top-left of
 * whatever happens to be there, and much of the site is now charcoal — a dark
 * pill on a dark band all but disappears, and the focus outline is dark too.
 * A light edge means the component reads on every ground the site has: the
 * charcoal fill carries it on paper, the hairline carries it on the dark
 * bands.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-[0_0_0_2px_var(--color-ivory)]"
    >
      Skip to main content
    </a>
  );
}
