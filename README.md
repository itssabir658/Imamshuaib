# ImamShuaib.com — rebuild

Next.js 15 (App Router) + React 19 + Tailwind CSS v4, built against the
*Executive Summary* redesign spec. This pass covers the **design system and the
home page**; the rest of the sitemap is modelled and linked but not yet built.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Design system

Everything lives in [`src/app/globals.css`](src/app/globals.css) as Tailwind v4
`@theme` tokens — there is no `tailwind.config.js`.

### Colour

Brand values were sampled from the existing logo mark rather than invented:
**teal `#246C6F`** and **gold `#DDA308`**. The spec proposed `#065F46`
green / `#D19C3D` gold but also allowed "teal with accent gold"; matching the
logo keeps the mark and the site in one system.

| Token | Value | Use |
| --- | --- | --- |
| `teal-600` | `#246C6F` | Brand. Primary buttons, links, icons |
| `teal-900` / `teal-950` | `#12383A` / `#0A2426` | Hero, sermon band, footer |
| `gold-500` | `#DDA308` | Donate CTA, eyebrows, focus ring |
| `canvas` | `#F7FAF9` | Page background |
| `ink` / `body` / `muted` | `#10262A` / `#3E5457` / `#5A6E70` | Text ramp |

Every text pairing used on the page clears WCAG 2.1 AA:

| Pairing | Ratio |
| --- | --- |
| `body` on `canvas` | 7.7:1 |
| `muted` on `canvas` | 5.1:1 |
| white on `teal-600` (primary button) | 6.1:1 |
| `teal-950` on `gold-500` (donate button) | 6.5:1 |
| white on `teal-950` (hero, footer) | 11.9:1 |
| `gold-300` on `teal-900` (eyebrows on dark) | > 4.5:1 |

`gold-500` is **decoration and fill only** — it is 2.3:1 on white and must never
be used for text on a light background.

### Type

**Gilroy** for display and headings, **Montserrat** for everything else.

Gilroy is commercial (Fontfabric) and not on Google Fonts, so it is self-hosted
via `next/font/local` from `src/app/fonts/`. Montserrat comes from
`next/font/google` as a single variable file covering 100–900.

Sizes are fluid `clamp()` tokens, so nothing needs per-breakpoint overrides:
`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-quote`, `text-lead`,
`text-eyebrow`.

`--font-arabic` is **declared but not yet wired up** — no `font-arabic` class
exists in `src` and Noto Naskh Arabic is never loaded. It is a placeholder for
the Urdu/Arabic locales, not a working token. Keep it: neither Gilroy nor
Montserrat covers Arabic script. When the locale routes land it will also need
its own leading (Naskh wants roughly 1.9 where Latin wants 1.75).

The heading token is `--font-display`, not `--font-serif`. That rename matters:
Tailwind v4 ships its own default `--font-serif`, so a stray `font-serif` class
left behind would silently render Georgia rather than erroring.

#### Hierarchy without a serif

The previous pairing got its contrast from family — a serif over a sans. Gilroy
and Montserrat are both geometric sans, so that channel is gone and the
hierarchy is carried explicitly:

| Role | Face and weight |
| --- | --- |
| h1 / h2 / h3, board tile titles, mobile nav | Gilroy **Bold 700** |
| Stat figures | Gilroy Bold 700, `tabular-nums` |
| Pull-quotes | Gilroy **Medium 500** at `text-quote`, gold rule, curly quotes |
| Body, UI, eyebrows | Montserrat 400 / 500 / 600 |

Only **two** Gilroy cuts ship. 600 was dropped once a weight audit showed a
single mobile-menu link was the only thing using it — 23 KB for one nav item.
Everything display-side is now 700, everything quote-side is 500, and each of
those has a file.

Quotes get one shared register rather than a per-component improvisation,
because "how do we mark a quote now" would otherwise be re-answered on every
article page.

Tracking is tighter than the old scale throughout: Gilroy's circular bowls leave
more optical space between letters than a serif's modulated stems, so the same
nominal value reads looser.

#### Rebuilding the Gilroy web fonts

The installed TTFs are ~135 KB each. Subset to the Latin range and converted to
WOFF2 they are ~23 KB — 46 KB shipped in total — and the full OpenType feature
set (including `tnum`, which the stat figures rely on) is retained. Note the
`--layout-features='*'`: without it, subsetting silently strips `tnum` and the
stat figures go ragged.

```bash
pip install fonttools brotli
UNI="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
for w in Medium Bold; do
  python -m fontTools.subset "$FONT_DIR/Gilroy-$w.ttf"     --unicodes="$UNI" --layout-features='*' --flavor=woff2     --output-file="src/app/fonts/Gilroy-$w.woff2"
done
```

The weight list in `layout.tsx` is a hard contract: `font-synthesis-weight: none`
means a weight with no matching file silently renders in the nearest one that is
loaded, rather than failing visibly. Adding a heading weight means adding a
`src` entry in the same commit.

> **Licensing.** Gilroy is commercial software and the site owner holds a
> licence. The two `.woff2` cuts are committed, which is safe because this
> repository is **private** — that is storage, not distribution. Making it
> public would redistribute them, which most foundry EULAs forbid separately
> from the right to serve the font. See
> [`src/app/fonts/README.md`](src/app/fonts/README.md) for what to do in that
> case.

### Motif

Two masked SVGs in `public/patterns/` carry the Islamic geometry:

- `khatim.svg` — an 8-point star tessellation, applied with `.pattern-khatim`
- `arch.svg` — the mihrab arch from the logo, applied with `.mask-arch`

Both are CSS **masks**, so a single asset takes its colour from `currentColor`
and works on light and dark bands alike.

## The hero

The home page opens on a **directory board**, not a billboard: a short flat
teal-950 masthead — identity chip, headline, two CTAs — over a white board that
lifts across the seam and fills the fold with four real entry points, three
programs and the latest khutbah, read from `src/content/site.ts`.

The test it is built against: a returning visitor who wants to book counselling
reaches it without scrolling. An imam's site is a service desk before it is a
portfolio.

Consequences worth knowing:

- The tiles are derived from `services.filter(s => s.featured).slice(0, 3)`, not
  a hardcoded id list, so renaming a service can never silently leave a hole in
  a four-column row.
- The masthead is flat teal-950 all the way up under the sticky header, so `"/"`
  stays in `DARK_HERO_ROUTES` and the header keeps its light-on-dark palette.
- It uses the verb-first CTAs already in the content (`Register`, `Book a
  session`) rather than a generic "Explore programs".
- **It routes into pages that do not exist yet.** A decorative hero linking
  nowhere is untidy; a directory hero linking nowhere is broken. `/contact`,
  `/services/*` and `/donate` are now the highest-priority routes to build.

## Accessibility

Built to the §2 audit findings rather than retrofitted:

- Skip-to-content link as the first focusable element; `<main tabindex="-1">`
- One `<h1>`, then a clean `h2` → `h3` order (verified in the browser)
- Descriptive `alt` on every content image; decorative art is `alt=""` or
  `aria-hidden`
- Newsletter form has a visible `<label>`, `aria-invalid`, an error tied by
  `aria-describedby`, and a polite live region
- Single gold focus ring on `:focus-visible` for every interactive element
- Mobile menu: `role="dialog"`, `aria-modal`, Escape to close, scroll lock, and
  a focus trap that returns focus to the opener
- The header switches to a light-on-dark palette while it floats over the hero
- `prefers-reduced-motion` disables all transitions and smooth scrolling
- Every card is one link — one tab stop, one target

## Structure

```
src/
├─ app/            layout (metadata, JSON-LD Person + WebSite), page, not-found
├─ components/
│  ├─ layout/      Header, Footer, SkipLink, Logo, LanguageSwitcher, SocialLinks
│  ├─ ui/          Container, Section, SectionHeading, Button, ServiceIcon
│  └─ home/        Hero, TrustedBy, AboutTeaser, ServicesTeaser,
│                  FeaturedSermon, Testimonials, DonateCTA, NewsletterForm
├─ content/site.ts navigation, services, testimonials, partners, stats
└─ lib/types.ts    Sermon / Article / Event / Service / Testimonial models
```

`src/lib/types.ts` holds the §6 content models. `src/content/site.ts` is the
single seam to swap for a CMS — the components read those shapes and nothing
else, so pointing them at WordPress CPTs or a headless API is a data change,
not a component change.

## What is deliberately not here yet

- **Pages**: `/about`, `/services` + detail pages, `/sermons`, `/articles`,
  `/events`, `/donate`, `/contact`, `/privacy`, `/terms`. All are linked from
  the nav and currently render the styled "still being built" page.
- **Donation form**: the home page carries one consolidated CTA (the audit
  flagged the form repeating site-wide). The Stripe form belongs on `/donate`,
  reading the `?amount=` the CTA passes.
- **Newsletter**: `NewsletterForm` validates and reports but does not POST —
  wire it to Mailchimp.
- **Localisation**: the header switcher renders and lists Arabic and Urdu as
  "coming soon". No `next-intl`/routing yet.
- **Analytics**: no GA/Matomo tag.

## Asset notes

Source images came from `Desktop/imam assets`, renamed descriptively in
`public/images/`.

**There are only three usable photographs**, so they are allocated by display
size and by distance apart, and that allocation is deliberate:

| Photo | Used by | Why there |
| --- | --- | --- |
| `imam-shuaib-portrait-cutout.webp` (1080², transparent) | Hero identity chip | Cutout, so it works on any ground |
| `imam-shuaib-outdoors.webp` (338×469, **low-res**) | Hero khutbah tile | Renders at ~288px — within its resolution, and a different setting from the block below it |
| `imam-shuaib-reading-quran.webp` (1707×2560) | AboutTeaser, FeaturedSermon | The only high-resolution frame, so it goes where it is shown large |

The study photograph appears twice, but roughly two screens apart and in very
different crops (tall portrait vs. wide 16:9). Adjacent repeats were the thing
to avoid — the hero tile and AboutTeaser sit one screen apart, so they must not
share a source.

**This is the real constraint on the design.** More photography is the single
highest-value thing to commission: a sermon still, a teaching or classroom
frame, and a second portrait would each remove a compromise above.

The partner marks are white-on-transparent, so they only work on a dark band.
Colour versions are needed if that strip ever moves to a light section.
