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

The site runs on **warm stone**: ivory paper, sandstone, charcoal ink, and
the logo's gold as the only accent. That palette started on /al-aqsa, moved to
the home page, and now carries the whole site.

**Teal is gone from the interface.** It was sampled from the logo mark and ran
the site until the owner asked for the stone ground throughout. The teal scale
is still defined in `globals.css` — it documents the brand and the logo is
still teal and gold — but nothing renders it any more. The mark is the only
teal left on the page.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#FBF8F2` | Page ground. Ivory |
| `surface` | `#FFFFFF` | Cards and panels |
| `sand-100` / `sand-200` | `#EFE5D6` / `#E3D4BE` | Tints, chips, alternate bands |
| `sand-300` | `#D3BE9F` | Body text on the dark bands |
| `charcoal` | `#1C1A17` | Dark bands, primary buttons, focus ring |
| `gold-500` / `gold-800` | `#DDA308` / `#7A5510` | Donate fill; links and eyebrows on paper |
| `ink` / `body` / `muted` | `#1C1A17` / `#4A453F` / `#6A6058` | Text ramp |
| `field` | `#8A8178` | Form control boundaries only |

Every pairing in use was measured, not estimated:

| Pairing | Ratio |
| --- | --- |
| `ink` on `canvas` | 16.4:1 |
| `body` on `canvas` | 9.0:1 |
| `muted` on `canvas` | 5.8:1 |
| `field` on `canvas` / `surface` | 3.6:1 / 3.8:1 |
| `ivory` on `charcoal` (primary button, footer) | 16.4:1 |
| `charcoal` on `gold-500` (donate button) | 7.7:1 |
| `gold-800` on `canvas` (links, eyebrows) | 6.3:1 |
| `sand-300` on `charcoal` (dark-band body) | 9.6:1 |
| `sand-300/70` on `charcoal` (quiet footer text) | 5.4:1 |

`gold-500` is **decoration and fill only** — 2.1:1 on ivory, so it must never
be used for text on paper. `gold-800` is the one for that. And note
`sand-300/60` is 4.3:1 on charcoal, just under the bar: the quiet footer text
is `/70`, deliberately.

**No colour gradients.** Every surface is a flat fill, by decision — the teal
and gold washes that used to sit behind the page headers, the donate panel and
the card grids were removed at the owner's request. Do not reintroduce one
without asking.

That has a knock-on effect worth understanding before touching the glass:
frosted surfaces need something behind them to refract. On the dark charcoal
bands the khatim motif still provides it, so `glass-surface` stays translucent.
On the light canvas there is now nothing, so `glass-surface-light` is near-opaque
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

## The home page

The whole site is on this ground now, not just the home page: /about,
/services, the service pages, /donate, /contact, the legal pages, the 404, the
header and the footer all moved with it. `Section`, `SectionHeading`,
`Eyebrow`, `TextLink` and `Button` carry the stone palette as their defaults,
so the temporary `tone="warm"` props and `ink`/`stone`/`ivory` tones that
existed during the halfway state are gone — there is one palette and nothing
left to choose between.

### The hero

It used to be a **directory board**: a flat teal-950 masthead — identity chip,
headline, two CTAs — over a white board that lifted across the seam and filled
the fold with four programme tiles. It was built so a returning visitor could
book counselling without scrolling, and it did that. But it was three
compositions in one fold, and the brief for the rebuild was one word: simple.

So it is now a single column of type on paper: label, hairline, headline,
lead, two buttons, one note. Nothing else.

Consequences worth knowing:

- **The four tiles are not lost.** `ServicesTeaser` further down already lists
  the programmes with room to describe them, which is what the tiles were
  doing badly in a space with no room for it.
- `DARK_HERO_ROUTES` **is now empty.** The masthead is paper, so the sticky
  header keeps its dark-on-light palette over it and the logo stays its own
  colour. Add a route there only if its hero is dark all the way up under the
  header.
- `-mt-18` pulls the section under the sticky header and the top padding puts
  it back, so the ivory runs to the very top of the page rather than starting
  below a band of canvas.
- The accent on "faith & knowledge" is gold-700 at 4.73:1 on ivory — past the
  3:1 that size needs, and warmer than the gold-800 the small labels use.

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
- Contrast is measured with a harness that parses `oklab()` as well as
  `rgb()`. Tailwind v4 emits oklab for any colour carrying an alpha, and a
  naive `[d.]+` regex strips the minus signs off its negative a/b channels —
  which silently turns a correct page into ~45 phantom failures. If a contrast
  sweep ever reports a near-black effective background on a paper section,
  that is the bug, not the page.
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

### Art direction

The first build of this page was a calm ruled document: one ground, one
rhythm, every section the same shape. It read as anonymous, and no amount of
motion fixes that. The rebuild gives each block its own composition.

**Four grounds, not one.** Ivory, sand, charcoal, and a clay `#7c3f28` added
for the blocks that interrupt rather than continue. Measured: ivory on clay
7.6:1, sand-200 5.6:1, gold-300 4.9:1. One number worth remembering — **clay
is 2.15:1 against charcoal**, so the two must never touch or they read as a
single muddy mass. There is paper either side of every clay block, and that
constraint drives the whole ground sequence.

**The masthead is a split, not a stack.** Paper on the left carrying the name
at the page's largest size; a full-bleed charcoal panel on the right carrying
everything transactional. The panel bleeds with a pseudo-element hung off the
column's own left edge rather than a percentage-width box positioned against
the section — a percentage box drifts relative to the centred container and
at around 1024px lands five pixels from the text.

**The hardest cut is a colour change.** "You are not failing. You are
unsupported." is the line the opening turns on. It is now full-bleed clay
with nothing else on the block, doing what a paragraph break cannot.

**Oversized numerals carry The Work.** At 2rem they were punctuation; at
8rem, in sand behind the titles, they are the only weight on the band.
Editorial design's oldest answer to a page with no photography. The title
over the numeral measures 9.6:1, and 7.4:1 on hover.

**The promo video is paired with the first pull quote** on one charcoal
spread rather than centred alone in a wide band. A vertical video on a
desktop page is an orphan unless something is set against it, and the copy
document already offers quotes for exactly this job.

**Promises step rather than sit in three columns.** They build — from
something you notice on the Sunday to something you still have in March — so
each row indents further than the last. The indent is the argument.

### Interaction

All of the motion is **scroll-driven CSS** — no IntersectionObserver, no
hydration cost, nothing running on the main thread while someone flicks down
9,000px on a phone. Every rule is guarded twice, by `@supports` and by
`prefers-reduced-motion: no-preference`, and written as "animate towards the
state it already has". Where scroll timelines are unsupported (Firefox today)
the declarations never apply and the content is simply there. A reveal that
needs script or a new browser feature to undo itself eventually leaves
somebody looking at a blank page.

- **A reading-progress hairline.** The page has no navigation and the only
  orientation otherwise is a scrollbar that fades on a phone. It removes
  itself entirely where scroll timelines are unsupported, because a progress
  bar frozen at zero is worse than none.
- **The rules draw themselves**, outward from the khatim: left half grows from
  its right edge, right half from its left. The hairline is the page's whole
  visual vocabulary, so the hairline is what moves — a generic fade on each
  block would be motion borrowed from another page.
- **Blocks rise as they enter**, finishing at 42% of entry so nothing is still
  moving by the time it is readable.
- **Seats are drawn, not just counted.** Ten marks, filled while free, hollow
  once gone. The pitch is "Ten men. Two nights. One table." — ten is small
  enough to show rather than state, and it is the one thing on the page that
  changes. The marks are `aria-hidden`; the sentence beside them carries the
  fact, because "diamond" ten times is less information, not more.
- **Day headings stick on a phone.** Stacked, the schedule is twenty-one lines
  and it stops being obvious which day you are in halfway down Saturday. On
  desktop the three columns answer that themselves, so the behaviour is
  dropped rather than left on.
- **Rows respond.** The index numerals shift and warm, the property and
  audience lines grow a rule out of the margin, schedule items thicken their
  dash. Buttons lift under a cursor and sink under a press — the press half is
  the one most pages forget, and it is the only feedback a touch device ever
  gets, since it never hovers.
- **Underlines are drawn** via `background-size`, which animates on the
  compositor; `text-decoration` does not animate at all.

### Honorifics

Every "(peace be upon him)" is the ﷺ ligature (U+FDFA) now, in three places:
the Al-Fatiha card, the archery line and the al-Tirmidhi attribution.

It is not left as a bare character in the copy. `withHonorific()` in
`anchored/Honorific.tsx` wraps it in `<span lang="ar">`, because the script
changes mid-sentence and that is what WCAG 3.1.2 asks for — a screen reader
with an Arabic voice then announces the phrase rather than handing the glyph
to an English dictionary. Neither Gilroy nor Montserrat contains it, so it
falls through to Segoe UI, Geeza Pro or Noto depending on platform; those
render it noticeably smaller than the surrounding Latin, hence the size nudge.

### The registration question

The Reserve buttons point at the contact form, so the form asks one extra
question — "What is the one thing you are hoping to walk away clearer on?" —
when the Anchored topic is selected, and requires it.

**Conditional on purpose.** Someone asking about a nikah should not have to
answer it, so the topic select is controlled rather than left to
`defaultValue`, and the field appears and disappears with it. `ANCHORED_TOPIC`
is exported from `src/content/site.ts` because two places have to agree on
that id exactly — the Reserve links and this condition — and a typo in either
would drop the question silently.

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

⚠️ **A 4K master exists and is not what should be served.** The second
Dropbox link supplied on 9 October is the same 66-second clip at 2160×3840,
~55 Mbps, **452 MB**, with its `moov` atom after `mdat` — so it cannot even
begin playing until the whole file has downloaded. It is a camera master, not
a web export. What the page needs is roughly 1080×1920, a few Mbps, faststart;
that is a transcode, and there is no ffmpeg on this machine. Until one exists
the page keeps the 10.9 MB cut, which works.

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
