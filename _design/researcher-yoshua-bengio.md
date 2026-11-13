# Aurora Mist Editorial — Style Reference

> A policy-institute cover story: a condensed serif headline in deep teal, a circular portrait and a cyan-to-lime haze drifting across warm grey paper.

**Theme:** light

Values come from a headless Chrome render at 1440×900 (computed styles, first-viewport anatomy, loaded fonts, color share), a full DOM dump of the hero, news slider, blog list and footer, probes at 1100, 768 and 390 wide, the 1440×900 and full-page screenshots, and the aggregated Drupal theme CSS (`yoshuabengio_v1`) read directly. FlechaBronzeaM 400 and Funnel Sans 300–700 load as self-hosted fonts. A cookie consent card is open in the capture (bottom right of the first viewport). This v2 file replaces a v1 entry whose sizes came from CSS alone.

## Overview

A warm grey #e6e6e2 page under a fixed, transparent 160px header: a serif "Yoshua Bengio" wordmark (an SVG image, 262×40) at left and RESEARCH, BLOG, FR in 18px Funnel Sans 500 uppercase with 1px tracking at right. The hero sets a 480px circular portrait on the left and, overlapping it, the statement "A.M. Turing Award Recipient and most-cited AI researcher" in FlechaBronzeaM at 90px, regular weight, deep teal #0b404d. Behind both sits a large soft cyan and lime blur (`hero-gradient.png` in a pseudo-element, 1647×1150 at 1440). A 1px #2393a7 vertical line 110px tall (at 1440) drops from the hero to a 24px light (300) bio paragraph with teal underlined links. A "NEWS" label with two small square arrow buttons introduces a Swiper slider of white cards (600×338 image left, 58px teal serif headline link, 18px light text right, square arrow button bottom right). "RECENT BLOG POSTS" lists posts in boxes ruled with 1px #2393a7 lines, each with a 58px #0b404d serif title, a 16px excerpt and "Published / By" metadata. A dark teal "SEE ALL BLOG POSTS" button, a ruled three-column contact grid and a small footer close the page.

## First Viewport

Color share (8-color quantization of the 1440×900 shot): warm grey #e6e6e2 27.4% plus #e6e6e1 14.7%; aqua haze #b2e0d8 21.4%; slate-teal #7c9493 17.1% (portrait backdrop and headline); pale lime #d0e7ce 13.0%; cookie card #f1f1ef 5.9%.

Anatomy in DOM order (desktop 1440px; header container x=60, padding 0 40px inside a 20px margin; content 1320px):

1. **Header** (fixed, 160px tall, padding 20px 0, transparent): logo image at x=60, y=60 (262×40). Nav links at y=69: 18px / 500, uppercase, letter-spacing 1px, #000000, 1px transparent bottom border; RESEARCH, BLOG, then the FR language link 40px apart.
2. **Portrait** (`.field--name-field-image1`, x=60, y=200, 480×500): `border-radius: 100%` so it renders as an ellipse close to a circle; blue studio backdrop.
3. **Hero statement** (`h2`, x=480, y=351, 900px wide, two lines): FlechaBronzeaM 90px / 400 / 99px, #0b404d, left aligned, overlapping the portrait's right edge by 60px. The haze spreads behind it from the top centre to the lower left.
4. **Cookie card** (`.cookies-banner.active`, x=685, y=692, 725×178, fixed): #f2f2f0, padding 10px plus 20px inner spacing, shadow 0 0 15px 5px rgba(0,0,0,0.1); 14px text with a #2393a7 Privacy Policy link; three 44px square buttons in #0b404d with white 14px / 600 uppercase labels (the "Accept cookies" button shows the lime-to-cyan hover gradient in the capture).
5. **Divider line** (`.group-container::before`, x=720, y=750–860, inside the viewport; the cookie card covers it in the capture): 1px × 110px #2393a7, centred, 50px below the hero; the first bio paragraph follows at y=910.

## Tokens — Colors

| Name | Value | Token | Applies to (rendered elements) |
|---|---|---|---|
| Fog Linen | #e6e6e2 | `body` background | page background |
| Chalk | #f2f2f0 | `.main-button` | square arrow buttons, slider arrows, cookie card |
| White | #ffffff | slider item | news slider cards |
| Abyss Teal | #0b404d | headings | hero statement, blog titles, green button fill, cookie buttons |
| Lagoon Link | #2393a7 | links | inline links and their 1px underline borders, slider headlines, blog box rules, contact grid rules, divider line, social icons |
| Glacier Cyan | #3eb9c6 | button hover gradient | hover gradient start; also a tone in the hero haze image |
| Spring Lime | #cbe18b | button hover gradient | hover gradient end; also a tone in the hero haze image |
| Ink | #000000 | `body` color | body text, nav, labels, footer |
| Consent Shadow | rgba(0,0,0,0.1) | cookie banner | cookie card shadow |

## Tokens — Typography

| Family | Declared | Rendered (fonts_loaded) | Substitute |
|---|---|---|---|
| Display serif | FlechaBronzeaM, sans-serif | FlechaBronzeaM 400 (self-hosted) | Instrument Serif |
| Sans | "Funnel Sans", sans-serif | Funnel Sans 300, 400, 500, 600, 700 | Funnel Sans (Google Fonts) |

| Role | Selector | Size / weight / line-height | Color |
|---|---|---|---|
| Hero statement | `.group-hero h2` | 90px / 400 / 99px | #0b404d |
| Slider headline | `.paragraph--type-slider-item a` | 58px / 400 / 63.8px, 1px underline border | #2393a7 |
| Blog title | `.node--view-mode-teaser h3` | 58px / 400 / 63.8px | #0b404d |
| Nav | `header nav a` | 18px / 500, uppercase, 1px tracking | #000000 |
| Section label | `h6` / `.field-item` ("NEWS", "RECENT BLOG POSTS", "CONTACT") | 22px / 700, uppercase, 1px tracking | #000000 |
| Bio | front-page body `p` | 24px / 300 / 36px; name in 400 | #000000 |
| Slider text | slider `p` | 18px / 300 / 28.8px | #000000 |
| Blog excerpt | teaser body | 16px / 300 / 24.8px | #000000 |
| Blog meta | `.field-label` / value | 18px / 400 label, 700 value | #000000 |
| Button label | `.main-button.theme-green span` | 18px / 600, uppercase, 1px tracking | #f2f2f0 |
| Contact | footer contact `a` / `p` | 18px / 700 link, 400 text, 28.8px | #000000 |
| Footer small print | `.group-left`, `.group-right` | 13px / 400 | #000000 |

## Tokens — Spacing & Shapes

| Element | Radius | Border | Shadow |
|---|---|---|---|
| Portrait | 100% (ellipse 480×500) | none | none |
| Slider card | 0 | none | none |
| Square arrow button (`.theme-small`) | 0 | none | none |
| Green button (`.theme-green`) | 0 | none | none |
| Blog list box | 0 | 1px solid #2393a7 (top on the list, sides and bottom on each post) | none |
| Contact grid | 0 | 1px solid #2393a7 outer and column rules | none |
| Inline link | 0 | 1px solid #2393a7 bottom | none |
| Video play button | 100% | none | none |
| Cookie card | 0 | none | 0 0 15px 5px rgba(0,0,0,0.1) |

## Layout Metrics

- **Container**: `.container.largest` max 2060px, padding 0 40px, margin 0 20px, so content starts at x=60 and spans 1320px at 1440.
- **Header**: fixed, 160px tall, padding 20px 0; logo 262px wide (max-width scales to 220px at 1100 and 200px at 390).
- **Hero**: portrait 480×500 at y=200; statement 900px wide starting 420px from the content edge, vertically centred on the portrait; haze pseudo-element `.group-hero::after` with `top: 50%; left: 55%` and translate(-50%, -50%), 1647×1150 at 1440 (centre at x=790, y=450 on the page; the hero box is 1400×500 at x=20, y=200). Base size 2150×1500 applies at ≥1650px; `(max-width:1649px)` sets 1647×1150, `(max-width:999px)` sets left 60%, `(max-width:767px)` sets 1432×1000 with top 65% / left 70%, `(max-width:549px)` sets 1073×750 with top 65% / left 70%.
- **Divider**: `.group-container:before` 1px wide, display block, margin 0 auto, #2393a7; height 110px at 1440. Base height 240px applies at ≥1650px; `(max-width:1649px)` 110px, `(max-width:999px)` 80px, `(max-width:767px)` 75px, `(max-width:549px)` 50px.
- **Bio**: 1080px wide (x=180), 24px / 36px light, paragraphs 30px apart.
- **News**: label row with 33px square arrow buttons (padding 10px, 13px icons) at y=1500; slide card 1320px, padding 42px 40px, flex with a 40px column gap: image 600×338, text column 600px.
- **Blog list**: label 22px, list box from y=2413, each post padding about 45px 41px; "See all blog posts" button 308×63, padding 20px 40px, centred.
- **Contact**: label 22px with 40px side padding; a 1320px box with three 439px columns, each padding 40px 32px, separated by 1px #2393a7 rules; social row (LinkedIn, X, Bluesky as 18px #2393a7 icons) under the first column.
- **Footer**: three groups: "© Yoshua Bengio, 2026" and "Set cookies" (13px), centred logo, credit "Website by Lima Charlie and Studio Charles Daoud" right aligned.
- **Page height**: 4,297px.

| Breakpoint | Gutter | Body size | Title size | Grid change |
|---|---|---|---|---|
| ≥1650px | 60px | bio 24px | hero 90px | slider 600px image + text; divider 240px; haze 2150×1500 |
| 1200–1649px | 60px | bio 24px | hero 90px | slider 600px image + text; divider 110px; haze 1647×1150 |
| 1000–1199px | 40px | bio 23px | hero 80px | statement narrows to 600px beside the portrait; slider image 400px, headline 50px; divider 110px; haze 1647×1150 |
| 550–999px | 40px | bio 23px (measured at 768) | hero 80px | portrait centred above the statement; slider stacks (image on top), padding 35px 30px; divider 80px (75px at ≤767); haze left 60% (≤767: 1432×1000 at top 65% / left 70%) |
| ≤549px | 20px | bio 20px / 30px | hero 55px / 60.5px | portrait 260px; logo centred, nav below it at 16px; slider padding 20px, headline 40px; header no longer fixed; divider 50px; haze 1073×750 at top 65% / left 70% |

## Components

- **Fixed transparent header**: image wordmark left, 18px uppercase nav right, no background or rule; content scrolls beneath it.
- **Hero statement with halo**: 90px condensed serif in #0b404d over a soft cyan / lime blurred PNG; the portrait circle overlaps the left of the text block.
- **Vertical rule**: 1px #2393a7 line, 110px tall at 1440 (240px at ≥1650px), centred between hero and bio, 50px above the bio.
- **Teal underline link**: #2393a7 text with a 1px #2393a7 bottom border instead of text-decoration; weight follows the paragraph (300 in body copy).
- **Square arrow button** (`.main-button.theme-small.theme-arrow`): 33×33 #f2f2f0 square, padding 10px, 13px arrow icon (top-right arrow for links, left/right for the slider); hover fades in a -90deg gradient from #3eb9c6 to #cbe18b.
- **Green button** (`.main-button.theme-green`): #0b404d square block, padding 20px 40px, 18px / 600 uppercase #f2f2f0 label with 1px tracking and a white top-right arrow.
- **News slide**: white card, padding 42px 40px, image 600×338 left (video slides add an 80px round play button), right column with a 58px #2393a7 serif headline link, 18px light text, and the square arrow button pinned bottom right.
- **Blog teaser box**: 1px #2393a7 outline, 58px #0b404d serif title, 16px light excerpt, meta row "Published **08 October 2026**  By **Yoshua Bengio**" at 18px, arrow button at right; on hover a post-gradient image fades in behind the right 65%.
- **Contact grid**: three ruled columns with 18px bold black links followed by a small arrow and 18px regular text.
- **Cookie card**: #f2f2f0 panel with a 15px soft shadow and #0b404d square buttons.

## Page Modules

| Module | Present | How it is styled |
|---|---|---|
| Header / nav | yes | fixed transparent bar, uppercase links, FR switch |
| Portrait | yes | 480px circle in the hero |
| Headline statement | yes | 90px serif with gradient halo |
| Bio | yes | 24px light paragraphs under a vertical rule |
| News | yes | Swiper slider of white cards with arrow buttons |
| Blog posts | yes | ruled teaser boxes and a dark teal "See all" button |
| Talks | present but non-standard | YouTube videos are slides inside the news slider (play button over a thumbnail) |
| Publications | absent from the source | on the separate Research page |
| Awards | present but non-standard | stated in the hero headline and bio, no list |
| Contact | yes | three-column ruled grid with social icons |
| Cookie consent | yes | fixed card bottom right with three buttons |
| Footer | yes | copyright, centred logo, agency credit |

## Adapting to Other Content

- **Publication list**: use the blog teaser box pattern: 1px #2393a7 outlines, title in FlechaBronzeaM (40–58px, #0b404d), authors in 16px light Funnel Sans, venue as a bold 18px meta value, square arrow button at right.
- **More news**: keep the slider; one item per slide with a 600×338 image. Without an image, let the text column span the card.
- **Awards**: a short list under a 22px uppercase label, each award a 24px light line with the year in 700.
- **Results tables**: 1px #2393a7 rules, Funnel Sans 18px light cells, header cells 700 uppercase with 1px tracking.
- **Long statements**: keep the hero to two or three lines at 90px; anything longer belongs in the 24px bio.
- **No portrait**: leave out the circle and set the 90px statement at x=60, 900px wide, vertically centred in the same 500px block (y=200 to 700) over the haze, so the 110px #2393a7 divider and the bio keep their positions.
- **No headline statement**: write one line of your own position and field, at most 60 characters so it stays on two lines, in FlechaBronzeaM 90px/99px #0b404d. It still overlaps the portrait's right edge by 60px.

## Do's and Don'ts

- Do set display headings in FlechaBronzeaM at weight 400, in #0b404d (or #2393a7 when the heading is a link).
- Do keep the ground warm grey #e6e6e2 with only white for cards.
- Do use 1px #2393a7 hairlines for every rule, outline and underline.
- Don't round buttons or cards; only the portrait and the video play button are round.
- Don't use the cyan and lime as flat fills; they appear only in the blurred halo and hover gradients.
- Don't use bold in body copy; text is 300 with 400–700 reserved for names, labels and meta values.

## Surfaces

Warm grey page; a blurred cyan and lime halo image behind the hero (the CSS declares a second one behind the footer); white slider cards; #f2f2f0 square buttons and cookie card; #0b404d buttons.

## Imagery

A studio portrait against a blue backdrop cropped to a circle; news thumbnails including a black-and-white cut-out of Bengio over a magenta-to-orange gradient, editorial photos and YouTube talk stills.

## Layout

Fixed header; hero (portrait, statement, halo); vertical rule; bio; News slider; Recent Blog Posts and button; Contact grid; footer. About 4,297px tall at 1440 wide.

## Agent Prompt Guide

Quick colors: background #e6e6e2, heading teal #0b404d, link teal #2393a7, text #000000, card #ffffff, button #f2f2f0, hover gradient #3eb9c6 → #cbe18b.

1. "Build a hero on #e6e6e2 under a fixed transparent 160px header (serif wordmark left; 18px Funnel Sans 500 uppercase nav with 1px tracking right). Place a 480px circular portrait at the left and, overlapping it from x=420px, a two-line statement in FlechaBronzeaM 90px/99px weight 400 #0b404d; behind both a large blurred cyan (#3eb9c6) to lime (#cbe18b) haze."
2. "Under the hero draw a centred 1px × 110px #2393a7 line, then a 1080px bio in Funnel Sans 24px/36px weight 300, black, with #2393a7 links underlined by a 1px #2393a7 bottom border."
3. "Make a news slide: white card, padding 42px 40px, flex with a 40px gap; left a 600×338 image; right a FlechaBronzeaM 58px #2393a7 headline link and 18px/28.8px weight-300 text; bottom right a 33px square #f2f2f0 button with a 13px arrow that fades to a -90deg #3eb9c6 → #cbe18b gradient on hover."

## Similar Pages

- Agency-built Drupal sites for public intellectuals and institutes.
- Editorial homepages pairing a condensed display serif with a gradient halo.

## Quick Start

```css
@import url("https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300;400;500;600;700&family=Instrument+Serif&display=swap");
:root {
  --bg: #e6e6e2;
  --surface: #f2f2f0;
  --card: #ffffff;
  --heading: #0b404d;
  --link: #2393a7;
  --text: #000000;
  --grad-a: #3eb9c6;
  --grad-b: #cbe18b;
}
body { background: var(--bg); color: var(--text); font-family: "Funnel Sans", sans-serif; }
h1, h2, h3 { font-family: FlechaBronzeaM, "Instrument Serif", serif; font-weight: 400; color: var(--heading); }
.hero h2 { font-size: 90px; line-height: 99px; }
p { font-size: 24px; line-height: 36px; font-weight: 300; }
a { color: var(--link); text-decoration: none; border-bottom: 1px solid var(--link); }
.main-button { background: var(--surface); padding: 10px; border-radius: 0; }
.main-button:hover { background-image: linear-gradient(-90deg, var(--grad-a), var(--grad-b)); }
.btn-green { background: var(--heading); color: var(--surface); padding: 20px 40px; font: 600 18px "Funnel Sans"; text-transform: uppercase; letter-spacing: 1px; }
```

## Provenance

- **URL**: https://yoshuabengio.org/en
- **Person**: Yoshua Bengio, deep learning.
- **Award**: ACM A.M. Turing Award 2018. https://awards.acm.org/about/2018-turing
- **Selection reason**: rule A (Turing Award laureate, award years 2018–2025); existing entry kept, chosen for the condensed display serif, the gradient halo behind the portrait and the news feature card; a cookie banner is captured at the bottom.
- **Template credit**: footer credits "Website by Lima Charlie and Studio Charles Daoud"; Drupal theme `yoshuabengio_v1`.
- **Evidence used**: tools/computed_style.py render at 1440×900 (computed styles, anatomy, fonts_loaded, color share), DOM dumps of the full page, probes at 1100, 768 and 390 wide, the 1440×900 and full-page screenshots, and the aggregated theme CSS read directly, on 2026-10-28.
