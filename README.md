# ImamShuaib.com — rebuild

Next.js 15 (App Router) + React 19 + Tailwind CSS v4, built against the
*Executive Summary* redesign spec. **The full sitemap is built** — 18 static
routes, all prerendered, plus the standalone
[Al-Aqsa tour landing page](#the-al-aqsa-landing-page).

Read [Before launch](#before-launch) before showing this to anyone: several
pages carry placeholder content that must not be published as fact.

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

**No colour gradients.** Every surface is a flat fill, by decision — the teal
and gold washes that used to sit behind the page headers, the donate panel and
the card grids were removed at the owner's request. Do not reintroduce one
without asking.

That has a knock-on effect worth understanding before touching the glass:
frosted surfaces need something behind them to refract. On the deep-teal bands
the khatim motif still provides it, so `glass-surface` stays translucent. On
the light canvas there is now nothing, so `glass-surface-light` is near-opaque
— a thin panel over flat white reads as haze rather than glass. The material
language lives in the specular lip and the rim instead of in transparency.

The only gradients left in the stylesheet are **masks**, not colour: the
marquee's edge fade and the mask-difference trick that draws the 1px rim.

### Type

**Gilroy** for display and headings, **Montserrat** for everything else.

Gilroy is commercial (Fontfabric) and not on Google Fonts, so it is self-hosted
via `next/font/local` from `src/app/fonts/`. Montserrat comes from
`next/font/google` as a single variable file covering 100–900.

Sizes are fluid `clamp()` tokens, so nothing needs per-breakpoint overrides:
`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-quote`, `text-lead`,
`text-eyebrow`.

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
lifts across the seam and fills the fold with four real entry points, read from
`src/content/site.ts`.

The test it is built against: a returning visitor who wants to book counselling
reaches it without scrolling. An imam's site is a service desk before it is a
portfolio.

Consequences worth knowing:

- The tiles are derived from `services.filter(s => s.featured).slice(0, 4)`, not
  a hardcoded id list, so renaming a service can never silently leave a hole in
  the four-column row.
- The masthead is flat teal-950 all the way up under the sticky header, so `"/"`
  stays in `DARK_HERO_ROUTES` and the header keeps its light-on-dark palette.
- It uses the verb-first CTAs already in the content (`Register`, `Book a
  session`) rather than a generic "Explore programs".
- **It routes into pages that do not exist yet.** A decorative hero linking
  nowhere is untidy; a directory hero linking nowhere is broken. `/contact`,
  `/services/*` and `/donate` are now the highest-priority routes to build.

## Accessibility

Audited across all routes with measurement rather than inspection — contrast
computed by compositing effective backgrounds, target sizes checked against
2.5.8's spacing exception, reflow at 320px, the 1.4.12 text-spacing override,
and focus rings walked element by element.

Built to the §2 audit findings rather than retrofitted:

- Skip-to-content link as the first focusable element; `<main tabindex="-1">`
- One `<h1>`, then a clean `h2` → `h3` order (verified in the browser)
- Descriptive `alt` on every content image; decorative art is `alt=""` or
  `aria-hidden`
- Newsletter form has a visible `<label>`, `aria-invalid`, an error tied by
  `aria-describedby`, and a polite live region
- A focus ring on `:focus-visible` for every interactive element, in one of
  two colours — see [the focus ring](#the-focus-ring)
- Mobile menu: `role="dialog"`, `aria-modal`, Escape to close, scroll lock, and
  a focus trap that returns focus to the opener
- The header switches to a light-on-dark palette while it floats over the hero
- `prefers-reduced-motion` disables all transitions and smooth scrolling
- Every card is one link — one tab stop, one target

## Anchored — the men's retreat page

`/anchored`, built from the client's copy document of 8 October 2026. Its own
route group for the same reason /al-aqsa has one: a single page with one thing
to do on it, reached from a WhatsApp or Instagram link rather than from the
site, so the main navigation would only compete with it.

**The copy is verbatim and not mine to edit.** `src/content/anchored.ts` is a
transcription — the brief says "Copy and paste it as written". If a line reads
oddly on the page, change the document first.

**Four instructions from that document are load-bearing**, and each is
something a later edit could quietly undo. They are written into the content
file as comments as well as here:

1. **No prayer clock times, anywhere.** The schedule names prayers
   deliberately without them. The only time string on the page is "12:00 PM
   departure", which is in the copy itself. If `Weekend.tsx` ever grows a
   `time` field, this has been broken.
2. **No Guidance for Generations.** Personal brand only — no G4G name, logo or
   charity registration.
3. **The CAPS section labels are not page copy.** "SECTION 3: THE WORK" and
   friends are structural notes to the designer. So most sections carry no
   visible heading at all; they get an `sr-only` one instead, which keeps a
   navigable outline without putting words on the page that nobody wrote. The
   copy turns out to be self-structuring — "Clarity.", "Friday", "Early Bird".
4. **Square brackets are button labels.**

**Nothing is computed from today's date.** It is tempting to compare against
25 October and badge one price tier "current". The page is statically
generated, so that comparison freezes at build time and the page would go on
announcing the early-bird price until someone redeployed. Both tiers are shown
with their own deadlines and the reader does the arithmetic correctly every
time.

**Seats remaining** is `anchored.seatsRemaining` — the "simple field Imam
Shuaib can update" the brief asks for. Setting it to `null` removes the count
from the page, which is the right move the moment nobody is keeping it
current: a stale count on a ten-seat retreat is worse than no count.

**The deposit step shows card and e-transfer together**, as the brief requires
— not a toggle, not a second page. No card field appears on this page and none
should ever be added; the card route hands off to Stripe's own hosted page,
which is what keeps the site out of PCI scope.

### The promo video

464×832, 66 seconds, 10.9 MB, at `public/video/anchored-promo.mp4`. It is
**vertical**, which is consistent with a brief whose traffic comes from
WhatsApp and Instagram — people holding a phone. So the player is phone-shaped
and capped at the footage's own 464px, because past that it visibly softens.
Swapping in a landscape re-cut means changing the aspect in `PromoVideo.tsx`
too.

The file's `moov` atom already sits before `mdat`, so playback starts without
pulling all 11 MB. There is no poster image on purpose: it would be a second
copy of a frame already in the file, and `preload="metadata"` paints the first
frame anyway.

⚠️ **It has no captions track and it is a piece to camera.** That fails WCAG
1.2.2, and this page's audience arrives from feeds they scroll with the sound
off. The page says so on itself until `anchored.video.captions` is set.

## The Al-Aqsa landing page

`/al-aqsa` is a single-page invitation to the tour, and it deliberately does
not wear the site's chrome. That is the whole reason `src/app/(site)/` and
`src/app/(tour)/` exist as route groups: a visitor who came to register should
not be offered eight other destinations above the fold. The root layout keeps
only the fonts, the metadata and the SVG filter defs; the header and footer
moved down into `(site)`. Nothing about the other routes changed.

**No photography.** The brief asked for cinematic imagery of Jerusalem. There
is none in this project and none that could be used without a licence, so the
hero is drawn instead — `Skyline.tsx` builds Al-Quds from an ogee dome on an
octagonal drum, Ottoman crenellations and a two-centre arcade, in three flat
tonal layers. Depth comes from tone, not from gradients, which also keeps the
owner's "no gradients" decision intact. It is about 3 KB and sharp at any
width. **Licensed photography is still the highest-value thing to commission
for this page**, and it would drop in behind the same composition.

**A second palette.** Ivory, sandstone and charcoal, with the brand gold
carried over — that shared gold is what keeps the two palettes recognisably
one family. Measured like the rest: charcoal 16.4:1 on ivory, sand-300 9.6:1
on charcoal, gold-400 8.9:1 on charcoal. `sand-400` and `sand-500` are 3.2:1
or less on ivory and are for rules and ornament only.

**The same type as everywhere else.** The page carried a serif display face
(Cormorant Garamond) and a type scale of its own for a while. Both were
dropped at the owner's request: it is Gilroy and Montserrat on the one scale,
like every other route. Worth remembering if a second scale is ever proposed
again — two scales mean every future heading decision has to be made twice.
Note that `font-synthesis-weight: none` is set globally, so headings here use
500 or 700 only; a 400 would silently render in Gilroy's 500.

### The QR code

Generated at build time from `tour.registerUrl` by `QrCode.tsx`, as inline
SVG. Generated rather than checked in as an image so the code and the link it
encodes cannot drift apart — change the destination in `src/content/tour.ts`
and the printed square follows on the next build.

Two things the design turns on:

- **A QR code is useless to the device displaying it.** Nobody scans their own
  phone. So the card always carries a real "Register online" link beside the
  code, and on mobile a sticky bar follows the page down with the same link.
  The code is for a second device or a printed handout.
- **A QR code is useless to a screen reader.** It is `aria-hidden`, and the
  link beside it is the accessible path to the same place.

The code points at `/contact?program=al-aqsa-tour`, which is a real working
destination today. `contactTopics` in `src/content/site.ts` exists so that
label survives: the contact form's topic list is built from `services`, and
without an entry there the enquiry would have arrived unlabelled.

### The focus ring

The site-wide ring used to be gold-500. Measured against the grounds it is
actually painted on, it failed WCAG 2.2 SC 2.4.11 (Focus Appearance, AA) on
every light one — 2.13:1 on ivory, 2.15:1 on the canvas, 2.25:1 on white,
against the 3:1 an indicator needs versus the unfocused pixels it covers. It
was only ever passing on the dark bands. An earlier pass checked that every
control *had* a ring and never checked what colour it was against.

No single hue clears 3:1 on both grounds, so there are two, carried on an
inheriting `--focus-ring` property: teal-700 by default (7.3–8.2:1 on every
light ground) and gold-400 inside the dark bands (6.5–8.9:1). Two details that
are easy to get wrong and are commented in `globals.css`:

- The selectors exclude `a`, `button`, `input` and friends. `outline-offset`
  is positive, so the ring is painted *outside* the control, on whatever the
  control is sitting on — the colour has to come from the ground, never from
  the control's own fill. The charcoal Register button on the ivory card
  proved it: keyed to its own background it asked for the dark ring and then
  painted it on ivory at 2.4:1.
- A header floating over a dark hero is a *sibling* of it, not a child, so it
  inherits the page's light ground and has to name its own ring. Both headers
  do.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx        fonts, metadata, JSON-LD, glass filters — no chrome
│  ├─ (site)/           everything that wears the header and footer
│  │  ├─ layout.tsx     skip link, header, main, footer
│  │  ├─ page.tsx       home
│  │  └─ about|services|donate|contact|privacy|terms/
│  ├─ (tour)/           the Al-Aqsa landing page, with its own minimal chrome
│  ├─ sitemap.ts        generated from the content modules
│  └─ not-found.tsx
├─ components/
│  ├─ layout/  Header, Footer, PageHeader, SkipLink, Logo, SocialLinks
│  ├─ ui/      Container, Section, SectionHeading, Button, Popover,
│  │           Prose, ServiceIcon, GlassFilters
│  ├─ forms/   Field, ContactForm, DonateForm
│  └─ home/    Hero, TrustedBy, AboutTeaser, ServicesTeaser,
│              Testimonials, DonateCTA, NewsletterForm
├─ content/
│  ├─ site.ts   navigation, services, testimonials, partners, stats
│  └─ pages.ts  about copy, privacy and terms sections
└─ lib/types.ts Service / Testimonial / LegalSection models
```

`src/lib/types.ts` holds the §6 content models. `src/content/site.ts` is the
single seam to swap for a CMS — the components read those shapes and nothing
else, so pointing them at WordPress CPTs or a headless API is a data change,
not a component change.

## Removed sections

All at the site owner's request.

**Sermons and Events** — the nav entries, the featured-sermon band on the home
page, the latest-khutbah tile in the hero, and the `Sermon` and `EventItem`
content models.

**Articles** — the listing and article routes, the sample content, the
`Article` and `ArticleBlock` models, and the `ArticleBody` renderer.

**The language switcher** — and with it `--font-arabic`, which existed only for
the Arabic and Urdu locales the switcher advertised. If localisation is picked
up later, note that neither Gilroy nor Montserrat covers Arabic script, and
Naskh wants roughly 1.9 leading where Latin wants 1.75.

The **Friday Sermon** service is deliberately still there. It is a service the
imam offers — officiating a khutbah for a masjid or campus — not the sermon
archive that was removed. Those are different things and the audit listed them
separately.

## Sitemap

| Route | What it is |
| --- | --- |
| `/` | Home — the directory-board hero |
| `/about` | Biography, the mission quote, the stats |
| `/services` | All eight programs |
| `/services/[slug]` | One page per program, prerendered from `services` |
| `/donate` | Impact, the donation form, giving FAQ |
| `/contact` | Contact form, direct details, what to do in a crisis |
| `/al-aqsa` | The Al-Aqsa tour — a standalone landing page, outside the site chrome |
| `/anchored` | Anchored — the men's retreat, 6–8 Nov 2026. Also standalone |
| `/privacy`, `/terms` | Legal scaffolds |
| `/sitemap.xml`, `/robots.txt` | Generated from the content modules |
| `not-found` | A real 404 |

Inner pages all open on the same `PageHeader` rather than a bespoke masthead
each. The home page carries the site's one big composition; giving all eight
routes their own would leave it feeling like eight sites.

`/services/[slug]` uses `generateStaticParams`, and `sitemap.ts` reads the same
content module — so a new service cannot be added and then quietly left out of
either.

## Before launch

These are blockers, not polish.

**Placeholder content presented as fact.** `src/content/site.ts` carries a
warning at the top listing exactly what is invented: every figure in `stats`,
every name and quote in `testimonials`, the email, the phone number and the
social handles. Anything marked `PLACEHOLDER` inside a service — prices,
durations, cadences, travel radius — is a guess. Publishing invented numbers or
testimonials under a scholar's name is the kind of thing that costs him his
credibility.

**The Al-Aqsa page has no dates and an unconfirmed QR destination.**
`tour.dates` is still the literal `[TOUR DATES]` from the brief and renders
as that on the page. `tour.registerUrl` resolves through `site.url`, which is
still the intended domain rather than a confirmed live one — and a QR code
gets printed, shared and screenshotted, so it has to be right before anybody
scans it. Re-check it once the domain is final. `tour.itineraryConfirmed` is
`false`, which is what puts the "these are the places the journey is planned
around" note under the grid; flip it only when the itinerary is actually
fixed. There is also no Open Graph image for the route, so a share card falls
back to the site-wide portrait.

**Anchored is missing three things.** `anchored.cardHref` (the Stripe
Payment Link or Checkout route — the Reserve buttons fall back to the contact
form until it is set), `anchored.etransferTo` (the page refuses to print an
e-transfer address it was not given), and a captions track for the promo
video. The currency is also unstated: the copy says "$495" and "$595", and
Waterdown plus Interac makes CAD near-certain, but near-certain is not good
enough to publish as structured data — which is why the page's schema.org
Event deliberately carries no `offers`.

**The biography has holes.** `src/content/pages.ts` builds the About page only
from what the old site already claimed. No degrees, institutions, teachers or
dates have been invented. The list of what a real bio still needs is in
`about.gaps`, and it is rendered into the page as visually-hidden text so it
travels with the page rather than living only here.

**No form actually submits.** Contact, donate and newsletter all validate, show
errors and render a success state, but none of them make a network call.

**No payment is taken.** `/donate` collects amount, frequency and donor
details and stops. There is deliberately no card field: the correct integration
POSTs to a server route that creates a Stripe Checkout Session and redirects to
Stripe's hosted page, so no card number ever reaches this site. Putting a card
field on this form instead would pull the whole site into PCI scope.

**The legal pages are scaffolds.** Privacy and terms describe what the site
verifiably does. Everything depending on facts only the owner knows — the legal
entity, jurisdiction, retention periods, processors, refund and cancellation
terms, and whether donations are Zakat-eligible or tax-deductible — is marked
in amber on the page itself and must be completed and reviewed by someone
qualified.

## Still not built

- **Analytics**: no GA or Matomo tag.
- **Localisation**: nothing. The language switcher was removed, so there is no
  locale routing, no `next-intl`, and no Arabic font loaded.

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
