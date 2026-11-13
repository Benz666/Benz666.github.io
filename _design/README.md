# Aurora design notes

Design reference: `researcher-yoshua-bengio.md` (looketal.com style notes for yoshuabengio.org).
Implementation: `_layouts/aurora.html`, `_layouts/aurora-project.html`, `_includes/aurora/`,
`assets/css/aurora.css`, `assets/js/aurora.js`. Demo page: `/demo/aurora/`.

## Palettes (switch any time)

Set `aurora_palette` in `_config.yml`. Preview without editing: add `?palette=<name>` to a page URL
(the choice is remembered in that browser; the demo also shows a picker in the bottom-left corner).

| name | light: main + accent | dark version | status |
|---|---|---|---|
| `gold` | royal blue #2B6EFF + champagne gold #E8C77A, ink #0D1B45 | midnight navy #090E1D, antique-gold headings #F0DFB4, gold haze boosted | **current (chosen 2026-11-13)** |
| `violet` | #2B6EFF + lavender #B7A1FF | deep indigo, pale violet headings | alternative |
| `blush` | #2B6EFF + blush pink #F5B3C6 | ink purple, pale pink headings | alternative |
| `lime` | #2B6EFF + tender lime #D0EC7C | navy, pale lime headings | alternative |
| `aurora` | teal #2393A7 / #3EB9C6 + lime #CBE18B (the reference's own colors) | deep teal | original demo |

Each palette defines only a few inputs (`--pl-*` for light, `--pd-*` for dark, plus optional
`--pd-accent-glow/-haze/-card` for the dark haze strength); every other color is derived from them.
To add a palette, copy one `:root[data-palette="..."]` block in `aurora.css` and add a swatch button
in `_layouts/aurora.html`.

## Fonts

Instrument Serif (display) with the hyphen glyph from Libre Caslon Condensed, self-hosted (OFL);
Funnel Sans from Google Fonts. FlechaBronzeaM (the reference's face) needs a paid web licence.
