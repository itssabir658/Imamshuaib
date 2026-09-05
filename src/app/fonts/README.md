# Gilroy web fonts

`src/app/layout.tsx` expects exactly two files here, and both are committed:

| File | Weight | Used by |
| --- | --- | --- |
| `Gilroy-Medium.woff2` | 500 | Pull-quotes |
| `Gilroy-Bold.woff2` | 700 | All headings, stat figures, mobile nav |

They are latin-subset WOFF2, ~23 KB each, cut from the licensed desktop TTFs.

> **Licensing — read before making this repository public.**
>
> Gilroy is commercial software (Fontfabric / Radomir Tinkov). The site owner
> holds a licence, and these binaries are committed because this repository is
> **private**: that is storage, not distribution.
>
> A webfont licence covers serving the font from your own site. It does not
> cover redistributing the files. Making this repository public — or forking it
> outward, or handing the archive to a third party — would redistribute them,
> which most foundry EULAs forbid independently of the hosting right.
>
> If this repository ever needs to go public, remove these two files from the
> working tree **and from the history**, restore the `/src/app/fonts/*.woff2`
> line in `.gitignore`, and use one of the options at the bottom of this file.

## Regenerating them

From the licensed desktop TTFs. On Windows these install to
`%LOCALAPPDATA%\Microsoft\Windows\Fonts\`.

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

Two details matter:

- **`--layout-features='*'`** — without it, subsetting strips `tnum`, and the
  stat figures in `AboutTeaser` lose their tabular alignment.
- **The unicode range is the Google Fonts `latin` subset.** Add
  `U+0100-024F,U+1E00-1EFF,U+2C60-2C7F,U+A720-A7FF` for latin-ext if any name
  on the site ever needs a diacritic.

The weight list in `layout.tsx` is a hard contract. `font-synthesis-weight: none`
in `globals.css` means a weight with no matching file renders in the nearest one
that *is* loaded, rather than failing visibly — so adding a heading weight means
adding both a file here and a `src` entry there, in the same commit.

## If this repository goes public

1. Inject the fonts at build time — a private submodule, or base64 in a CI
   secret written out by a prebuild step.
2. Swap Gilroy for a free geometric sans with a comparable voice — Poppins,
   Outfit or Figtree, all on Google Fonts, all a one-line change in
   `layout.tsx`.
