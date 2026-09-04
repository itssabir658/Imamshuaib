/**
 * First focusable element on every page (WCAG 2.4.1 Bypass Blocks) — the gap
 * the audit flagged against AlMaghrib's site.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-teal-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to main content
    </a>
  );
}
