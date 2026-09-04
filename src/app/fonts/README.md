# Gilroy web fonts

The `.woff2` files this directory needs are **deliberately not committed**.
Gilroy is commercial software (Fontfabric / Radomir Tinkov). A webfont licence
permits serving it from your own site; it does not permit redistributing the
binaries, which is what committing them to a public repository would do.

`src/app/layout.tsx` expects exactly two files here:

| File | Weight | Used by |
| --- | --- | --- |
| `Gilroy-Medium.woff2` | 500 | Pull-quotes |
| `Gilroy-Bold.woff2` | 700 | All headings, stat figures, mobile nav |

## Regenerating them

From the licensed desktop TTFs (on Windows these install to
`%LOCALAPPDATA%\Microsoft\Windows\Fonts\`):

```bash
pip install fonttools brotli

FONT_DIR="$LOCALAPPDATA/Microsoft/Windows/Fonts"
UNI="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

for w in Medium Bold; do
  python -m fontTools.subset "$FONT_DIR/Gilroy-$w.ttf" \
    --unicodes="$UNI" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file="src/app/fonts/Gilroy-$w.woff2"
done
```

Each file should land around 23 KB. Two details matter:

- **`--layout-features='*'`** — without it, subsetting strips `tnum`, and the
  stat figures in `AboutTeaser` lose tabular alignment.
- **The unicode range is the Google Fonts `latin` subset.** Add
  `U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF` for latin-ext if any name
  on the site needs a diacritic.

## Deploying

Because these are not in the repository, a CI or Vercel build cloning it will
fail at `next build`. Pick one:

1. Make the repository **private** and commit the fonts (simplest, and it keeps
   builds reproducible).
2. Keep it public and inject the fonts at build time — commit them to a private
   submodule, or base64 them into a CI secret and write them out in a prebuild
   step.
3. Swap Gilroy for a free geometric sans with a comparable voice — Poppins,
   Outfit or Figtree, all on Google Fonts, all a one-line change in
   `layout.tsx`.
