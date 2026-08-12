@AGENTS.md

# Dheepam — Project Instructions

Durable rules for this repo. Read this first, then `PROJECT_STATUS.md` for
current state and the next task.

> **Workflow:** work → update `PROJECT_STATUS.md` → `/clear` → new session starts
> by reading these two files. Never re-derive state from conversation history.

---

## 1. Where things are

**`Deepam Website\` is the git repository root and the Vercel project root**
(2026-08-12). Everything that ships lives inside it. The parent `Deepam\` folder
is a local working archive — brand PDFs, source PNGs, the old zip — and is
**deliberately not the repo**; it holds only a pointer `CLAUDE.md` now.

```
D:\Balaji\projects\Deepam\             ← local working folder. NOT the repo.
├─ CLAUDE.md                           ← 5-line pointer to this file
├─ Images\                             ← drop-zone for source images. NOT in the repo:
│                                         these are uncompressed originals (35MB+); only
│                                         the built WebP/MP4 in src\imports\ ship.
└─ Deepam Website\                     ← ★ THE REPO ROOT. cwd for all work.
   ├─ CLAUDE.md                        ← this file
   ├─ PROJECT_STATUS.md                ← current state + next task
   ├─ AGENTS.md                        ← Figma Make scaffold notes (Tailwind v4, etc.)
   ├─ vercel.json                      ← build command / output dir / cache headers
   ├─ .gitattributes                   ← NO Git LFS — see §10
   ├─ .figma\make\site.json            ← <title>, meta description, robots, favicon
   ├─ public\                          ← copied to dist\ root verbatim (favicon)
   ├─ tools\                           ← Python asset builders (dev-only, never at build)
   └─ src\
      ├─ App.tsx                       ← routing + section order
      ├─ types.ts                      ← the Page union (single source of truth)
      ├─ index.css                     ← the entire design system
      ├─ hooks\useReveal.ts            ← GSAP scroll reveals, magnetic, mandala spin
      ├─ components\                   ← sections + pages
      └─ imports\                      ← optimised images shipped by Vite
```

## 2. Commands

```bash
cd "D:/Balaji/projects/Deepam/Deepam Website" && npx tsc --noEmit   # type-check
cd "D:/Balaji/projects/Deepam/Deepam Website" && npm run build      # prod build
```

Dev server: use the Browser pane (`preview_start` with name `dheepam-website`),
never `npm run dev` via Bash. It occasionally dies — restart with `preview_start`.

**Always run both type-check and build before declaring work done.**

## 3. Architecture

- React 19 + Vite 8 + TypeScript + Tailwind v4 (no config file; theme is in
  `index.css`) + Bootstrap 5 for responsive layout only — see §9.
- **Routing is state, not a router.** `App.tsx` holds `currentPage`; sections render
  conditionally. Pages: `home | lamp-lighting | festival-customs | contact | knowledge`.
- **Never redeclare the `Page` union in a component.** Import `Page` / `SetPage`
  from `@/types`. (Local copies previously caused *"two different types with this
  name"* across 8 files.)
- Homepage section order: `hero → brand-story → products → lamp-lighting →
  festivals → neivedhyam → faq`, then `Footer` (which contains the dark closing
  section).

## 4. Design system — edit tokens, not components

Everything lives in `src/index.css`. Prefer changing a token over hard-coding.

**Type** — two faces, each with a job (secondary face swapped to **Figtree**
2026-08-12; see `PROJECT_STATUS.md` §Home page consolidated update):
| Token | Face | Used for |
|---|---|---|
| `--font-serif` | Fraunces | **h1–h6**, quotes, section/display titles, major editorial headings |
| `--font-sans` | **Figtree** | body prose (`.lead .body .body-sm .caption`) |
| `--font-ui` | **Figtree** | nav, CTAs, `.micro`, `.eyebrow`, fields, footer links — same face as `--font-sans`, kept as its own token so UI copy can diverge again later without touching every consumer |

- **The secondary face is swapped at the token, never at a consumer.** Every
  piece of non-display text on the site resolves to `--font-sans` or
  `--font-ui`, so Inter → Figtree was two lines in `@theme` plus the Google
  Fonts URL in `index.html`. Only **400 / 500 / 600** are loaded — prose, nav
  links, and labels + CTAs. Don't add a weight without a consumer.
- Figtree sets **narrower than Inter at the same size**, so any measurement
  copied from a pre-2026-08-12 note is stale by a few px: the desktop nav row
  moved ~18px right, and the folded Our Story / Neivedhyam columns each came in
  6–25px shorter. Re-measure rather than trusting the old numbers.

- Fraunces is loaded at **one weight (400, upright + italic)** — the same
  "emphasis comes from scale, not weight" rule that governed DM Serif Display
  carries over by choice, not by the font's limitation (Fraunces is variable
  and can take heavier weights). Don't add a heavier weight without a
  deliberate decision to change the system.
- **On the homepage, prose is one step: 16px.** `.home-page .lead`,
  `.home-page .body-lg` and `.home-page .body-sm` all resolve to `--fs-body`
  (2026-08-12 brief), so every paragraph and description on the page sets at 16
  in Figtree. **The override is scoped, never at the token** — the inner pages
  keep the three-tier 20 / 18 / 16 / 14 prose ladder they were built on, and
  `.closing .lead` is deliberately excluded because `Footer.tsx` renders it under
  all five routes. `.micro` (12px) is the caption/metadata tier and is not prose.
  Consequence: the Festivals cards gained a line each (**+33px** on the document
  at 1440) — that is text, not padding, and it is the brief's own cost.
- Scale is fixed steps via `--fs-*`, not fluid clamps. **H1 stays 64px**
  (H2 48 / H3 36 / H4 28 / H5 24 / H6 20 on desktop — H6 is a full heading now,
  not a sans hinge). Keep the ladder monotonic across the **1199.98px and
  575.98px** breakpoints (Bootstrap's — see §9).
- `.cta` / `.cta-sm` read their size from `--fs-body-sm` (14px), not
  `--fs-caption` / `--fs-micro` — buttons and nav must stay in the 14–16px
  band even though `--fs-caption` itself now sits at 12px (the caption/label
  tier). Don't point CTA text back at `--fs-caption`/`--fs-micro`.
- **`.nav-link` sits at `--fs-body` (16px), the CTAs at `--fs-body-sm` (14px).**
  That split is deliberate (2026-08-12 brief), not drift — don't "harmonise" the
  bar back down to 14. `--fs-body` is 16 at every breakpoint, and the desktop bar
  only exists ≥992, so one token covers the whole range.
- **The nav carries no kolam star.** `.nav-star` was removed by brief on
  2026-08-12 — markup, CSS and the over-hero colour override. The drawn-in gold
  underline is the entire hover language, and the active link pairs that
  underline with its maroon (or, over the banner, gold) label, so neither state
  is carried by colour alone. The star was absolutely positioned in the
  inter-link gutter, so removing it changed no geometry. **Don't reintroduce a
  glyph in the flex flow** if it ever comes back: in the flow it either reflows
  the bar on hover or costs every link permanent padding.
- **The active nav link is `--ink-maroon`; hover changes no colour at all.**
  `.nav-link[data-active='true']` takes maroon (8.71:1 on the bar's ivory,
  against the inactive link's 18.56:1) so the current page reads from colour as
  well as from the gold hairline. Hover's whole language is the drawn-in
  underline plus the kolam star — deliberately *not* a colour change, because
  giving it one leaves the active state nowhere left to go.
- **`Contact Us` in the nav is a `<Button variant="gold" size="sm">`**, driven by
  a `cta: true` flag on its `navLinks` entry. It carries no gold underline — a
  filled pill already outweighs it — and exposes state via `aria-current="page"`
  instead of `data-active`. `--cta-h` is **not** in play there (that token is
  scoped to `.home-page` / `.closing`), which is why **`.cta-sm` states
  `min-height: 44px` itself**: left to padding arithmetic the box drifted with
  `line-height` — 44.4 in the bar, 40.9 in the sheet, 56.4 before the phone
  rule was fixed. `.nav-cta` needs `flex-shrink: 0`, because the bar is a flex
  row and `.cta`'s `white-space: nowrap` would let the label spill without it.
- **At the top of the homepage the bar has no surface: `.nav-over-hero`.** The
  class is set in `Navbar.tsx` and is true for **home + unscrolled + sheet
  closed** only — `Navbar.tsx` is shared by all five routes, and every inner page
  opens on `PageHero`'s ivory ground where light type would be stranded. In that
  state the bar goes `background: transparent`, `backdrop-filter: none` (a blur
  would end on the bar's own edge — exactly the line the blend has to remove),
  a transparent border, and the scroll-progress track drops its ink hairline.
  Everything else about the bar — height, structure, order, 16px links, the star,
  the drawn-in underline, `Contact Us` as a `<Button variant="solid" size="sm">` —
  is unchanged in both states.
- **`.nav-scrim` is load-bearing, not decoration.** The banner behind the bar is
  *not* uniformly dark: `cover` anchors the plate bottom-right, so from ~1600px
  up the agarbatti cartons and the lamp-oil cap rise into the bar. The brightest
  pixel under the link row at 1920 measures **L 0.936** — ivory reads **1.05:1**
  on it. Bare, the bar gives ivory only 4.12:1 at 1440 and fails outright above
  it. The scrim (`rgba(44,14,4,.86) → .75 at 55% of the bar → .66 at the bar's
  foot → 0 at +96px) takes the worst pixel under the text to **ivory 8.24:1 /
  gold 5.66:1** at every width. **Weakening those alphas re-opens the wide
  viewports — recompute against the plate, don't estimate.** It ends 96px *below*
  the bar so there is no edge anywhere; its height reads `--nav-cur`, so it
  follows the bar down on tablet and phone.
- **Over the banner the active link is gold `#F5D161`, not `--ink-maroon`.**
  Maroon measures **1.73:1** on the scrimmed banner — unusable. `--ink-gold`
  (#C9A227) is no better for the underline and focus ring: **2.62:1**, under the
  3:1 a non-text indicator needs. The banner's own accent gold clears both. The
  state is still not colour-only — the underline comes with it exactly as it does
  on the ivory bar, and hover still changes no colour in either state.
- **The nav CTA keeps `.nav-over-hero`'s ring even though the gold fill no
  longer strictly needs it.** The *label* is safe anywhere (#111 on gold is
  7.81:1). The *block* was the problem when the button was maroon — **1.13:1**
  against the scrimmed cartons at 1920, so it stopped reading as a button. Gold
  clears that on its own at **3.41:1**, but the 1px `rgba(255,253,247,.55)` ring
  is what holds the edge where the banner is brightest, and it is scoped to this
  state so it costs the shared CTA styling nothing.
- **Anything rendered after `.nav-scrim` inside `<nav>` must be positioned.** The
  scrim overhangs the bar by 96px and, as an absolutely-positioned element, paints
  above non-positioned in-flow siblings. `.shell-wide` and the mobile sheet both
  carry `position: relative` for that reason — drop either and the scrim crosses
  the bar's own content or the sheet's first entry.
- **`.line-mask` clips descenders unless it is padded.** The mask is
  `overflow: hidden` at line-box height, and both heading line-heights (H1 1.05,
  H2 1.15) are *tighter* than Fraunces' own ascent + descent, 1.234em — so a
  64px H1 loses 5.9px of every `y`, `g`, `p`. Homepage masks carry
  `padding-bottom: 0.16em` with an equal negative `margin-bottom`, which buys the
  room and gives the height straight back. **Any new value has to stay under the
  reveal's `yPercent: 108` translate** or the hidden start state leaks ink; at
  0.16em the exposed strip is 0.076em against ink that begins 0.142em in.
  Tightening a heading's `line-height` re-opens this — recompute, don't assume.

**Layout**
- One container for every section: `--container-wide: 1480px`, `--gutter:
  clamp(20px, 3.4vw, 60px)`. All sections use `.shell-wide` → identical rails.
  **One exception:** the hero banner adds `.shell-hero` (`--container-hero:
  1520px`). It is declared *after* `.shell-wide` and wins on source order at
  equal specificity — don't reorder those two rules. Don't put `.shell-hero` on
  anything else.
- **The hero height is fixed pixels, not `vh`:** 720 / 660 (≤1199.98) / 640
  (≤991.98) / 600 (≤575.98). The plate is `cover` and pre-framed, so a taller or
  shorter frame only trims invented sky — never the products. Changing these
  numbers means re-checking how much banner is left clear below the copy on
  tablet and phone (currently 166–278px).
- **Our Story is the one section held to a single desktop fold**, and it pays for
  that with its own `padding-block: clamp(44px, 3.8vw, 68px)` on `.story` —
  tighter than `.section`'s 64–104. That override works purely on **source
  order**: `.story` and `.section` are both 0,1,0, so the OUR STORY block must
  stay *below* `.section` in `index.css`. The 568px copy column drives the row,
  so this padding is the only height left to trade. The fold budget is the
  **scrolled** nav (`--nav-h-scrolled` + its two hairlines = 94px), never the
  tall one — the section starts below a 720px hero, so it is never in view with
  the bar unscrolled.
- Spacing ladder: `--space-sm | --space-content | --space-section | --space-major`.
  Tuned compact (18–28 / 36–56 / 64–104 / 80–128). **Sections are content-sized:**
  no `min-height: 100vh`, no padding above the ladder. If a section looks empty,
  the fix is less padding, not more ornament.
- `.grid12` is the 12-col grid; at ≤991.98px it folds to 6 and children go full
  width — **except** anything whose class contains `col-`, which opts out and
  places itself (`.col-2up`, `.col-3up`, `.col-footer-*`). Name a new column
  utility with a `col-` prefix or the blanket rule will override it,
  `!important` and all.
- **Never set `aspect-ratio` inline on an image frame that folds to full
  width.** An inline style outranks every media query, so the folded
  breakpoints cannot flatten it and a portrait plate becomes ~1075px tall on a
  tablet. Put the ratio in `index.css` (`.story-plate`, `.fest-card-media`).
- **`.story-plate` is 14:15 at every breakpoint and neither direction has
  slack.** *Taller* makes `cover` crop horizontally and clip the lamp's rim;
  *shorter* crops vertically through the oil bottle, which spans 78% of the
  frame height, so a 4:3 window clips its cap at every `object-position` that
  keeps the base. The asset is authored at exactly 520×557 — the shipped ratio is
  a zero-crop fit, so changing it means re-cropping the source, not re-tuning
  CSS. The old ≤991.98px 4:3 flatten and its `object-position: center bottom` are
  gone; the 520px cap, not a flatten, is what keeps the folded steps sane.
- Nav height is `--nav-h` / `--nav-h-scrolled`; `<nav>` republishes the live one
  as `--nav-cur`. Read those — never hard-code a bar height again.
**CTA — two treatments, one geometry (2026-08-12, latest)**
- **The homepage gold pill carries no rim, and it shines on hover.** The
  `#7D620D` border is set to **`transparent`, not deleted** — `.cta-gold` is
  `border: 1px` and the box is `min-height`-driven, so removing the declaration
  would move the padding box 2px in each axis and re-open the 44px promise.
  **This is a deliberate accessibility trade the brief asked for:** that rim was
  the *block's* only 3:1 boundary (the gold fill is 2.38:1 on ivory), and a
  shadow is not a boundary. If it has to come back the value is `#7D620D`, and
  the numbers are in the bullets below — don't re-derive them.
- **The shine is `::before`, and `overflow: hidden` on the pill is what clips
  it.** `::before` does not inherit `border-radius`; without the parent's
  overflow the highlight squares off the 999px corner. Box-shadows paint outside
  the overflow box, so the nav's over-hero ivory ring is unaffected. The
  highlight is 42% of the box wide, ivory at 0.42 in the middle, skewed −18°,
  translating `-150% → 260%` over 0.85s — **left to right, once per hover**, on
  `:focus-visible` too. Reduced motion switches the pseudo-element off with
  `display: none` at the foot of `index.css`, not just the global duration clamp.
- **Rim-off + shine are scoped to `.home-page`, `.closing` and `.nav-cta`.**
  `.cta-gold` itself is untouched, so the three inner-page gold buttons keep the
  rim and no shine. `.closing` and `.nav-cta` render under every route — that
  cross-page reach is accepted for the same reason `.closing`'s CTA band is
  (below), and it is what keeps the bar's pill matching the page's.
- **Two homepage CTAs are `variant="line"`, not the pill** (reverted by brief
  after one session as pills): both product tiles' **Shop Now** and the
  **Neivedhyam** control-row CTA. They take no shine. **`.home-page
  .cta-line::after` must exist whenever one of them does** —
  `bottom: calc(50% - 0.8em - 6px)`, because `.home-page .cta` gives every CTA a
  44px `min-height` and the underline's own `bottom: 0` would otherwise draw at
  the foot of the box instead of under the words.
- **Every other CTA on the homepage is `variant="gold"`**: a pill-cornered
  `--cta-radius: 999px` box, `--cta-h: 44px` tall, 14px Figtree at 600 with
  0.1em tracking, 34px of horizontal padding and a 12px gap to the arrow. After
  the two reverts above that is the nav's `Contact Us`, the Lamp Lighting and
  Festivals CTAs, and the closing band's `Shop on Kaleesuwari` — four buttons.
  `.cta-solid` / `.cta-outline` are untouched and still used by the inner pages.
- **`.cta-gold`'s 1px `--ink-gold-text` rim is load-bearing, not detailing** —
  the reasoning below is why removing it on the homepage was a *trade*, and it
  still governs the inner pages and the slider arrows, which keep it.
  The gold fill measures **2.38:1 on ivory**, 2.21 on the Our Story cream and
  1.96 on the Neivedhyam champagne — the label is fine on it (7.81:1) but the
  *button* has no boundary the 3:1 floor accepts, where the maroon fill it
  replaced had 8.63. #7D620D gives 5.70:1 on ivory and 4.69 on the champagne and
  stays inside the gold family. On the maroon closing band the fill itself is
  3.66:1, so the rim is redundant there but harmless. **The slider arrows and the
  video's pause chip carry the same rim for the same reason.**
- **The focus ring on a CTA is maroon, not `--ink-gold`.** `.cta:focus-visible`
  overrides the global gold outline: #C9A227 is 2.35:1 on ivory and invisible on
  the gold fill; maroon is 8.71:1 and 3.66:1. It must stay **above**
  `.nav-over-hero :focus-visible` in the file — equal specificity, source order
  decides, and over the banner maroon is the one colour that cannot be used.
- **Height is `min-height`, deliberately** — labels wrap below sm and in the
  narrow desktop band, and a hard height would clip the second line. But a
  wrapped label at the inherited `line-height: 1.6` sets two lines in 44.8px and
  pushes the pill past 44, so **both wrap sites tighten the leading to 1.35**
  (`.nv-cta`, and `.cta` inside the ≤575.98 query). Add a new wrapping CTA and it
  needs the same. Don't reinstate per-variant button heights on the homepage.

**Scope — homepage vs everything else**
- **`.home-page` is the homepage scope hook**: a wrapper div in `App.tsx`, not a
  section class. Homepage-only CSS goes in the HOME PAGE block at the foot of
  `index.css` behind that class. Putting it on bare `.cta` / `.line-mask` /
  `.eyebrow` reaches all four inner pages.
- **`.closing` is not homepage-scoped.** `Footer.tsx` renders it under every
  route, so any `.closing …` rule lands on the inner pages too even though the
  section belongs to the homepage. That is accepted for the CTA band and the mask
  padding; anything else home-only needs `.home-page`.
- Homepage eyebrows all carry `EyebrowStar` (the four-petal kolam star, drawn in
  `currentColor`, spaced by `.eyebrow-star`). Inner-page eyebrows don't — keep it
  that way unless a brief says otherwise.

**Colour**
- Light theme throughout. **Two deliberate exceptions:** the hero banner
  (dark amber photograph) and the closing section (`.closing`, maroon→burgundy
  with gold). No black / brown / green backgrounds anywhere.
- `--ink-gold: #C9A227` is for **rules and ornament only** — at *no* text size.
  Small gold text uses `--ink-gold-text: #7D620D` (2.4:1 on ivory, so the bright
  gold fails at 12px). **Display-size gold text needs its own value too:** the
  Our Story headline uses `--story-gold-display: #A97F1B` (3.35:1), because
  #C9A227 measures 2.2:1 on that cream and fails even the 3:1 large-text floor.
  "It's a 48px heading, the floor is lower" is not a way to reach for #C9A227.
- **Our Story is the one warm-cream band** (`--story-surface: #FBF4E9` on
  `.story`). Every other light section is ivory `#FFFDF7`. Narrowing that gap
  costs the display gold its contrast — recompute if you touch it.

**Image corners — two steps, homepage only (2026-08-12)**
- `--img-radius: 16px` on the feature plates (`.img-frame`, so Our Story and the
  Lamp Lighting media; plus `.tile-plinth` and `.nv-media`) and
  `--img-radius-sm: 8px` on `.fest-card-media`, the smallest media on the page.
  Both scoped under `.home-page`, constant at every breakpoint.
- **Two exclusions, and they are deliberate.** The **hero banner** stays square:
  it is full-bleed and the header dissolves into it, so a corner would re-draw
  the boundary the blend exists to remove. The **closing photograph** is clipped
  to an SVG lotus bloom and has no corners to round.
- Every frame that takes a radius is already `overflow: hidden`, so the radius
  clips the photograph and its hover scale — no second radius on the `img`.

**Decoration — one primary element per section.** Don't add ornament to fill space.
The one ornament that sits *between* sections is `.rule-temple` (App.tsx, between
Lamp Lighting and Festivals): kolam hairlines out of a centred star, `--ink-gold`,
static by choice. Inter-section rules live in `App.tsx` with the section order —
not inside a section's own component, where the section's padding would push them
off the seam.

## 5. Motion

- GSAP + ScrollTrigger via `useReveal()`. Tag elements `data-anim="fade|mask|line|float"`
  with optional `data-delay`. The hidden start state is applied in JS so anything
  the scan misses stays visible rather than vanishing.
- `.mandala-spin` (the chakra ornament — three nodes: Our Story, Lamp Lighting,
  the closing disc) → **180s** rotation, paused off-screen. It was 240s until
  2026-08-12; 1.5°/s is still slow enough to read as ambient craft rather than a
  spinning graphic, which is the ceiling any future speed change has to respect.
- Respect `prefers-reduced-motion` in every new animation.
- **To make a CTA static, drop the `magnetic` prop from `<Button>`** — that prop
  is what wraps it in `<span class="magnetic">` for the cursor-attraction tween
  in `useReveal.ts`, and it is the only movement a button has. Keep the
  wrapper's `data-anim="fade"`: that is a scroll reveal, not motion on the
  button, and hover/focus fill comes from `.cta` either way. Both homepage CTAs
  that were asked to stop moving (closing, Lamp Lighting Guide) were fixed this
  way; `document.querySelectorAll('.magnetic').length` is now 0 on the homepage.
- Keep it restrained: slow, few elements, never bouncy.

## 6. Images (and the one video)

- Source drops go in `Images\`. Optimised output goes in `src\imports\`.
- **The Lamp Lighting Guide plate is a `<video>`, not a photograph** (2026-08-12).
  `Images/Lamp Lighting Guide.mp4` → `src/imports/lamp-lighting-guide.mp4`,
  imported like any other asset (Vite hashes it; `vite/client` types the import).
  It is authored at **550×690 — the frame's own 4:5** — so it fills `.ll-media`
  with no crop. Three durable consequences:
  - **The folded breakpoints no longer flatten `.ll-media`.** A portrait clip in
    a 16:9 or 4:3 band is cropped to a letterbox slot through the middle of the
    frame. It keeps 4:5 all the way down and is **capped** instead — 360px on
    tablet, 300px on phone, centred. That costs the folded steps image height
    (+38px at 768, +124 at 375) and it is the price of the clip being whole.
  - **`<video>` is not `<img>`**: `.img-frame img`'s `object-fit` and hover
    scale do not reach it, hence `.ll-video video`.
  - **Any autoplaying clip needs a pause control and a reduced-motion opt-out.**
    This one runs 10s on a loop, so WCAG 2.2.2 applies: `.ll-video-toggle` is a
    40px gold chip in the plate's corner (native `controls` would put browser
    chrome across a portrait plate), and `autoPlay` is gated on
    `prefersReducedMotion()`. The toggle reads `video.paused` as its source of
    truth; `onPlay` / `onPause` / `onLoadedData` keep the icon honest, and
    `onLoadedData` is what catches a browser that refuses the autoplay outright
    (no `pause` event ever fires in that case).
- **The five Neivedhyam plates are local and supplied** (2026-08-12):
  `Images/<Dish Name>.png` → `tools/build-dish-plates.py` →
  `src/imports/dishes/*.webp`, 1200×900 each (the slide's own 4:3, zero crop),
  161–241KB. Re-run the script after any swap and **look at the contact sheet it
  writes** before wiring anything in. There is no `srcSet`: one asset covers
  every step at 2× without upscaling.
- Compress with Pillow → **WebP**. Hero ≈1900px wide, q86. Check the result
  visually before wiring it in.
- Delete the old asset and confirm nothing still imports it.
- **Every plate that ships is built by a script in `tools/`, never by hand.** Run
  the script, look at the output, then wire it in.
  - `build-hero-plate.py` — the hero panorama (see below).
  - `build-section-plates.py` — the **Our Story** and **Agarbatti** plates. Both
    sources were supplied already framed for their slot, so this is the plain
    compress-to-WebP path; the only geometry is a 2px height trim to land
    Agarbatti on exactly 13:6. Re-run it after any swap of those two files.
  - `build-story-plate.py` — **historical.** It built the old
    `story-deepam.webp` from `Images/story-deepam-source.jpg`, which the site no
    longer imports. Keep it for the technique (it grows mirrored, blurred bokeh
    headroom so a wider window can be cut than the source's own height allows) —
    that is the pattern for any future plate needing reframing — but running it
    now produces an orphan asset.
- **Both product tiles are `scene: true`** — matched 1400×646 photographs on the
  same gold set. The cut-out-packshot path (`scene` falsy → `.tile-shot` on the
  painted `.tile-plinth`, `--shot-h` per asset) is typed and intact but has no
  consumer; don't delete it, and don't compose a photograph *with its own
  background* onto the plinth.
- **The hero is the exception: don't hand-compress it.** The campaign artwork is
  a 2.67:1 panorama and the hero frame is ~1.66:1, so `cover` would eat the
  product side. `tools/build-hero-plate.py` pre-frames it to 1.649:1 — run that
  on any swap, then re-tune `.hero-media img { object-position }` per
  breakpoint. `PROJECT_STATUS.md` §Hero plate has the geometry and the numbers.
- The headline must land on open amber with the products whole to its right.
  Verify by mapping natural→viewport coordinates, not by eye.
- **Never trust a stock library's alt text for a named dish or object — look at
  the picture.** Eight of the nine Unsplash URLs the Neivedhyam slider shipped
  with were not the dish they were labelled (payasam was a paneer curry,
  kozhukattai was idli, murukku was chow mein, besan ladoo was pav bhaji). The
  cheap way to look, when the Browser pane won't composite (§7), is a Pillow
  contact sheet: download the candidates at the crop they will ship at, tile
  them with labels into one PNG in the scratchpad, and `Read` it. Do that
  *before* wiring any remote image in, and again on the final set.
- **Getting Unsplash candidates is not a plain HTTP fetch any more.** Both
  `unsplash.com/napi/search/photos` and the `/s/photos/<slug>` HTML now answer
  **401** to `urllib`/`curl`. What works: `WebFetch` the search page for the short
  slugs, then `WebFetch` each `unsplash.com/photos/<slug>` for its `og:image`,
  which is the `images.unsplash.com/photo-…` id the site needs. Two traps —
  the search page's alt text is what it always was (usually wrong, see above),
  and any photo whose og:image is `plus.unsplash.com/premium_photo-…` is
  **Unsplash+**, not a free asset. Drop those rather than hotlinking them.

## 7. Verification — Browser pane quirks

Three artifacts have repeatedly looked like bugs. Recognise them:

1. **rAF pauses when the pane isn't compositing.** GSAP tweens and CSS
   transitions freeze mid-flight, so `opacity`/`transform` reads come back at
   intermediate values. Take a screenshot to wake it, then re-poll until stable.
2. **Screenshots capture only part of the viewport at high DPR.** Bottom-right
   fixed elements (the quiz launcher) fall outside the crop and look missing.
   Trust `getBoundingClientRect()` over the screenshot.
3. **`computer hover` leaves the OS cursor parked**, pinning `:hover` on. Move
   it off before measuring a collapsed state.

4. **A transitioning property reads as its *start* value** while the pane is
   frozen — the nav bar reports 112px when it is 84px. Inject
   `*{transition:none!important;animation:none!important}` before measuring
   anything that animates, rather than trusting the first read.

5. **`scrollTo({behavior:'smooth'})` never advances** when the pane isn't
   compositing — a working deep link reads back as `scrollY: 0`. Re-run with
   `behavior: 'auto'` to prove the target geometry is right, and say plainly
   that the animated scroll itself is unverified here.

6. **`[data-anim]` at opacity 1 can be a false pass.** `useReveal`'s scan runs
   inside `requestAnimationFrame`, so when the pane isn't compositing it never
   runs at all — and because the hidden start state is applied in JS, every
   element reports opacity 1 having never been animated (`data-anim-ready` and
   `data-spin-ready` are absent, and the mandalas carry no transform). To
   actually verify a reveal, `await import('/src/hooks/useReveal.ts')` and drive
   the same `gsap.set` / `gsap.to` pairs by hand: assert the hidden state lands
   (opacity 0 / `inset(0 0 100%)` / `yPercent 108` on `.line-inner`) and then
   that `progress(1)` clears it.

7. **The pane's console buffer is stale and survives a server restart.**
   `read_console_messages` replayed `ReferenceError: LotusGlyph is not defined`
   for a component deleted sessions ago — identical output after `preview_stop`
   + `preview_start` + a fresh navigate, and the dep hash in the trace matched
   the *live* one, so "stale hash" is not the tell. Don't debug what it reports.
   Install your own capture instead — `addEventListener('error'…)` +
   `unhandledrejection` + a `console.error` shim, then exercise the changed
   surface — and trust that plus a clean `tsc`/`build`.

8. **`.shell-wide`'s gutter is padding *inside* the container box**, so
   `getBoundingClientRect()` on it returns the padding box, not the content
   rail. At 1920 the shell reads 215→1695 while content runs 275→1635. Compare a
   child's edge against a *sibling child's*, or subtract `--gutter`, before
   concluding a column is misaligned.

9. **When you need to *see* something and the pane won't composite, go around
   it.** `Read` renders images, so anything visual can be composed to a PNG in
   the scratchpad (Pillow is installed, Python 3.14) and read directly — that is
   how remote imagery gets checked (§6). Compositing is per-session and can also
   die mid-session: it worked for two screenshots and then refused for the rest.

10. **`setTimeout` is frozen when the pane isn't compositing, but microtasks are
    not.** An `async` probe that `await`s even a 60ms timer between clicks never
    resolves and the tool call dies at 30s; the same probe using
    `for (let i=0;i<12;i++) await Promise.resolve()` flushes React's render and
    reads the updated DOM immediately. That is the way to click a control and
    verify its effect **in one call** — reading straight after `.click()` with no
    await returns the *pre-click* DOM, because React 19's concurrent root commits
    in a microtask.

11. **`getComputedStyle(el, '::after')` does not reflect `:hover`.** On a link
    that genuinely matches `:hover` (checked with `el.matches(':hover')`), the
    pseudo-element still reports the un-hovered `transform` — the nav underline
    reads `scaleX(0)` while its `:hover` rule says `scaleX(1)`. `[data-active]`
    reads fine, so it is specifically the hover state. Verify hover on a **real
    element** instead (the `.nav-star` span was added partly for this reason);
    don't chase a pseudo-element read as a regression.

12. **Coordinate-based `computer` actions need a screenshot first**, and refuse
    outright when the pane won't composite ("requires a prior
    computer{action:'screenshot'}"). `read_page` → `ref_N` → `computer` with
    `ref` still works, and it is the only way to park a **real** cursor for a
    `:hover` measurement. Move it off afterwards (§7.3).

13. **`img.decode()` never resolves when the pane isn't compositing** — it needs
    the compositor, so awaiting it kills the whole `javascript_tool` call at 30s
    and takes every assertion in that probe with it. Read `img.complete` /
    `naturalWidth` instead, and prove the asset itself with `fetch(url)` for the
    status and `content-length`.

14. **`loading="lazy"` images never start loading either** — IntersectionObserver
    doesn't tick without a compositor, so a below-the-fold plate reads back as
    `currentSrc: ""`, `0×0`, `complete: false`. That is **not** a broken import.
    To prove it decodes, set `img.loading = 'eager'`, `scrollIntoView()`, and wait
    on the `load` event with a `setTimeout` race — or just `fetch` the URL.

15. **`read_page` shows `<Button>`s as unnamed buttons.** Every site CTA renders
    its label in a nested `<span>` beside an `aria-hidden` arrow, and the tree
    reports the button blank. The accessible name is fine — check
    `el.textContent` — so don't "fix" it by adding an `aria-label` that duplicates
    the visible text.

16. **Never clear a frozen tween with `gsap.set(el, { clearProps: 'all' })`** —
    it strips *every* inline style, including the ones React authored from JSX
    `style={{…}}`, and React will not put them back until that subtree
    re-renders. Doing it to the Neivedhyam slide copy silently deleted three
    `marginBottom`s and the lead's `maxWidth: 440`, shrinking the copy column by
    82px mid-measurement. The frozen state is only ever the tween's own start
    values (`.nv-copy`'s is `y: 22, opacity: 0` — that alone made a 34px gap read
    as 12), so set those properties back explicitly: `gsap.set(el, { y: 0,
    opacity: 1 })`. Or reload and measure the settled first slide.

17. **Exercising the slider leaves the track parked mid-tween**, because
    `settle()`'s 0.85s `gsap.to` needs rAF. After an arrow/keyboard/drag run, every
    element *inside* a slide reads back horizontally offset (`.nv-media` at
    `x: −484` where it belongs at 49), so any rail comparison silently fails.
    Vertical numbers survive — the track only translates on x — but **reload
    before measuring left/right alignment**. `getComputedStyle(track).transform`
    should read `matrix(1, 0, 0, 1, 0, 0)` on the settled first slide; check it
    rather than assuming.

18. **Scroll-driven React state never commits when the pane isn't compositing,
    and the discrete-event trick does not reliably rescue it.** `setScrolled`
    lives on React's *default* lane, scheduled through `MessageChannel` — frozen
    with the task queue — so the nav reads `over-hero` at `scrollY: 400` however
    many microtasks you flush. `document.documentElement.scrollTop = N` **does**
    move the document where `scrollTo()` does not (§7.5), and dispatching
    `new Event('scroll')` **does** run the listener synchronously, but the
    commit still never lands: clicking a hero slide marker, clicking one that
    genuinely sets state, and clicking a FAQ facet all failed to flush it
    (2026-08-12). Treat the scrolled bar as unobservable here.
    **Verify a class-scoped state by toggling the class instead** —
    `nav.classList.remove('nav-over-hero')`, read the computed styles, put it
    back. That proves the *CSS* you changed, which is usually the thing under
    test; what it cannot prove is React's own inline `background` /
    `border-color` for that state.
19. **Real `Tab` presses don't move focus either**, so `:focus-visible` cannot be
    observed: `computer{action:'key', text:'Tab'}` reports success and
    `document.activeElement` stays on `<body>`, and a programmatic `.focus()`
    matches `:focus` but not `:focus-visible` (so the ring you read is the
    browser default, not yours). Assert the rule and its value in the built CSS
    and compute the ratio. **Ref-based `computer{action:'hover'}` does still
    work** (§7.12) and is how a real hover state gets measured.

20. **`.click()` proves the handler, never the hit area.** It dispatches straight
    at the node and skips hit-testing entirely, so a control buried under a
    stacking context passes every `.click()` walk-through and is dead under a
    real cursor — exactly how the Neivedhyam next arrow shipped broken through
    two sessions of "five clicks track 01→05". **Click what the browser would
    click:** `const t = document.elementFromPoint(cx, cy); t.dispatchEvent(new
    MouseEvent('click', {bubbles:true, cancelable:true}))`. Assert
    `el.contains(t)` first; that assertion *is* the hit-area test.
21. **To hit-test something below the fold, collapse the page, don't scroll.**
    Scrolling is dead here (§7.5, §7.18), so `elementFromPoint` on an off-screen
    element returns `null` — which reads as a pass if you don't check. Set
    `display: none` on the `.home-page` children before the target section, zero
    its `padding-top`, and (for the folded steps) inject a temporary
    `.nv-media{aspect-ratio:6/1}` so the row lands on screen. Restore in a
    `finally`.
22. **A pseudo-element's computed style is stale for the rest of the task after
    you inject a `<style>`.** Append a probe stylesheet and
    `getComputedStyle(el, '::after').bottom` keeps returning the *pre-injection*
    value — `.home-page .cta-line::after` read `0px` in every composite probe and
    `4.79688px` in a clean call that mutated nothing first. Read pseudo-elements
    in their own `javascript_tool` call, before touching the DOM.
23. **`documentElement.style.width` does not re-evaluate media queries.** The
    layout squeezes but every breakpoint still resolves at the real viewport, so
    a "responsive sweep" done that way silently measures desktop rules at 320px.
    Use `resize_window` per width — one tool call each, and worth it.
24. **`element.getAnimations({subtree: true})` *does* reflect `:hover`**, unlike
    `getComputedStyle(el, '::before')` (§7.11). It is the way to prove a hover
    animation on a pseudo-element: park a real cursor with ref-based
    `computer{action:'hover'}` (§7.12), then read back `animationName`,
    `effect.pseudoElement`, the duration and the keyframes' `transform`.

Verify by measuring the DOM, not by eyeballing screenshots. For contrast, compute
the ratio rather than assuming.

**`overflow-x: clip` on `html`/`body` hides overflow bugs** — `scrollWidth`
equals `innerWidth` even when a child is genuinely too wide. To find real
overflow, walk the DOM for `getBoundingClientRect().width > innerWidth`.

## 8. Guardrails

- Preserve the existing architecture, content and IA. Refine; don't rebuild.
- Never delete a section's content when restyling it.
- Purchase CTAs redirect to `https://kaleesuwari.com` — this is a microsite, not
  a store.
- Don't leave dead anchors: if a section is removed, fix every nav/footer link
  that pointed at it.
- **Anything interactive inside the Neivedhyam track needs the drag guard.** The
  pointer handlers live on `.nv-viewport`, so a drag that *starts* on a link moves
  the track and then fires the link on release. `suppressClick` (set on pointerup
  past 6px, cleared on pointerdown) plus the viewport's `onClickCapture` is the
  mechanism. **Nothing interactive is inside the track today** — the CTA moved to
  the control row — so the guard protects nothing right now and is kept purely so
  the next in-track link doesn't have to rediscover the problem. Don't prune it.
- **`.nv-controls` must stay positioned (`position: relative; z-index: 1`), and
  this is a bug fix, not tidying.** At ≥992px the row is pulled up by
  `--nv-row-h` so its bottom lands on the plate's baseline — which puts it inside
  `.nv-viewport`'s box. **`.nv-track` carries `will-change: transform`, which
  makes it a stacking context**, and a stacking context paints above every
  non-positioned in-flow sibling regardless of tree order. Un-positioned, the
  track sat on top of the row and `elementFromPoint` at the *next* arrow's own
  centre returned `.nv-grid` — the arrow was genuinely unclickable. Two members
  escaped only by accident: the CTA, because `.cta` is `position: relative`, and
  the **disabled** arrow, because `opacity: 0.4` gives it a stacking context of
  its own (which is why prev seemed to work and next never did). Generally:
  **anything that overlaps the track needs its own position to stay
  hit-testable**, and `.click()` will never catch it — see §7.20.
- **The control row is split: CTA on the copy column's **left** rail, `01 / 05` ·
  ← · → on the container's content rail.** `.nv-controls-group` is
  `justify-content: space-between` **and** `.nv-controls-nav` carries
  `margin-left: auto` — both are needed; `space-between` alone leaves the wrapped
  phone row's second line packed left. The alignment is exact (0.00 against the
  paragraph's left edge at every width) **only because the CTA is `variant="line"`**:
  a bare label has no horizontal padding, so its first glyph *is* the rail. Put a
  filled pill back there and 34px of padding opens between the rail and the label.
- **The arrows are 48px round gold chips, and `--nv-row-h` is that 48.** The
  token is the row's tallest member; the CTA holds 44 even with a wrapped label.
  Change the arrow box and change the token with it, or the copy column's
  reservation and the row's own pull stop agreeing.
- **The 992–1199.98 band no longer stacks, and `--nv-row-h` is 48 at every
  desktop width.** The stacked row existed only because a *pill* spends 68px on
  horizontal padding before the counter and arrows take their 184, which left the
  label ~114px against the 190 its longest line needs — three lines, and a 58.7px
  box. Reverting the CTA to `.cta-line` gives that 68px straight back, so the band
  holds one row on a tighter 16px gap and needs no per-band `--nv-row-h`. **If a
  pill ever returns to that row, the stacked band returns with it** — the
  arithmetic was ~100px short and no gap/padding combination closes it.
- **`.nv-controls` deliberately repeats `.nv-grid`'s track definition**
  (`1.15fr 1fr` + the same gap), with the CTA/counter/arrow group placed in
  **column 2 — the copy column** — and spanning it. That is what lands
  the row under the description it belongs to and on the container's **content
  rail**, at zero offset and at every width. (It sat in column 1, closing on the
  *image's* right edge, until 2026-08-12.) **Retune the two together** — changing
  `.nv-grid`'s columns or gap without changing `.nv-controls` silently breaks the
  alignment. And when the grid folds to one column at ≤991.98px, the group has to
  be moved **back to `grid-column: 1`** explicitly: left in column 2 it would
  create an implicit second track and sit off the rail.
- **The control row's top can never rise above the plate's bottom edge minus the
  row's own height.** `.nv-controls` is a sibling *below* `.nv-viewport`, and the
  viewport is as tall as the plate; pull the row any higher and `.nv-slider`
  computes shorter than the viewport inside it, so the plate spills past the
  section's content box and `.section { overflow: hidden }` clips it. Consequence
  (2026-08-12): with the two columns **top-aligned** (`.nv-grid { align-items:
  start }`, `.nv-copy { align-self: start }` — the brief's alignment) and the
  plate the taller item, the trailing space between the note and the row is
  *structural*, not a spacing bug — **202px at 1440** since the copy went to
  Figtree and the five shorter dish descriptions (166px before). It is not fixable by measuring
  the copy in JS either: each slide's note ends at a different height (a 30px
  spread at 1440, because the descriptions differ), so one pull cannot serve all
  five. The only levers are the plate's ratio or the column proportions.
- **The control row lives outside the track, so the copy column reserves room
  for it and the row is pulled back up into that room.** `.nv-copy` takes
  `align-self: start` + `padding-bottom: calc(var(--nv-row-h) + var(--nv-row-gap))`
  and `.nv-controls` takes `margin-top: calc(-1 * var(--nv-row-h))`, both at
  ≥992px only; the two tokens are published on `.nv-slider`. Without it the CTA
  hung **144px** below the note at 1440, because one shared row cannot sit inside
  a slide (five slides, and it must not travel with the track) while the copy it
  belongs to is centred against a much taller image. The construction is safe in
  both directions — the reservation sits immediately above the row, so whichever
  of image or copy is the taller grid item, the row fills the space set aside for
  it and can never ride up into the note. `--nv-row-h` is the arrows' box — 48px
  at ≥1200 and below 992, **110px in the 992–1199.98 band** where the row stacks
  (see above); if a member ever exceeds the token the row simply overhangs the
  image's bottom edge, which is a graceful failure, not an overlap.
  Folded (≤991.98) the copy is under the image, there is no void, and both halves
  switch off.
- **`.nv-controls-group` is `flex-wrap: nowrap` from 1200 up, and that is
  load-bearing.** Flexbox breaks lines *before* it shrinks items, so with `wrap`
  on, the narrow desktop band pushes the counter and arrows onto a second row
  rather than narrowing the CTA beside them. `nowrap` forces the squeeze onto the
  one elastic member: the CTA carries `white-space: normal`, overriding `.cta`'s
  `nowrap`, and absorbs it by taking a second line of label inside its 44px
  `--cta-h` box — two 14px lines set to 37.8px at `line-height: 1.35`, so the row
  stays exactly as tall as the 48px arrows. Column 2 is the narrower track, so the
  squeeze starts high: the group wants ~580px against 586 at 1440 and 488 at 1200.
  Wrapping is switched **on** in the 992–1199.98 band and again below sm, where the
  CTA takes a line of its own. Generally: a group that must hold one row while a
  member gives way needs `nowrap`, not `wrap` and optimism — but check the
  arithmetic first, because a pill's own padding can make one row impossible.
- **The footer's link columns mirror the header menu.** Every `navLinks` entry
  appears in `Footer.tsx` at the level it has in the bar — the three with no
  dropdown group under `Menu`, the two with one keep their own column. There are
  exactly **four** link columns because `.col-footer-links` is `span 2` and the
  brand column is `span 4`; adding a fifth breaks the grid and its tablet fold.
  Add a nav item, add it here. Never invent footer sub-items that resolve to the
  same destination as their own heading — that is what the old `Lamp Lighting`
  column was, one page advertised five times.
- When a change alters nav height, update the dependents listed in
  `PROJECT_STATUS.md` §Gotchas.

## 9. Bootstrap — layered, and only for layout

Bootstrap 5 supplies the responsive grid and the display/flex/position
utilities (`d-none`, `d-lg-flex`, `position-absolute`). Everything else —
type, colour, spacing, CTAs, ornament — stays in `index.css`.

**The layer import is load-bearing. Do not change it to a plain import:**

```css
@layer bootstrap, theme, base, components, utilities;
@import 'bootstrap/dist/css/bootstrap.min.css' layer(bootstrap);
@import 'tailwindcss';
```

Unlayered CSS beats layered CSS regardless of specificity. Bootstrap ships
unlayered, so imported plainly its Reboot would outrank **every** Tailwind
utility and every token class in `index.css`. Inside `layer(bootstrap)` it
sorts below all of Tailwind's layers, and the unlayered design system outranks
both. After any CSS-entry change, confirm `@layer bootstrap{` still precedes
`@layer theme{` in `dist/assets/index-*.css`.

Breakpoints are Bootstrap's throughout — **575.98 / 991.98 / 1199.98**. Use
those, not Tailwind's `sm:`/`lg:` (640/1024), so type and layout break together.
Bootstrap's own components (buttons, cards, navbar, modals) are outranked by
design and will not apply — don't reach for them.

## 10. Deployment — GitHub + Vercel

The repo root is `Deepam Website\` (§1). Vercel builds it with `npm ci` →
`npm run build` → `dist`, all pinned in `vercel.json`. **No environment variables
are required** — no backend, no keys, no analytics. If that ever changes, the
variable goes in Vercel's dashboard and never in a committed file; `.env*` is
gitignored.

- **Never reintroduce Git LFS.** `.gitattributes` deliberately has no `filter=lfs`
  rules, and the file says so at the top. **Vercel clones without fetching LFS
  objects**, so LFS-tracked media arrives as ~130-byte pointer files; Vite hashes
  and emits them as images, the build goes **green**, and every photograph on the
  live site is broken. The scaffold shipped with LFS on for `*.png`/`*.webp`/
  `*.mp4` — it was removed on 2026-08-12. The shipped assets are ~3.2MB, which
  plain Git carries fine.
- **A green build does not mean the assets are real.** Vite never validates that a
  `.webp` contains an image. When anything indirects an asset, verify the *bytes*
  — `git cat-file -s <blob>` against the on-disk size, and a magic-number check
  (`RIFF`/`WEBP`, not `version https://git-lfs`) — not the build log.
- **One lockfile, and it is `package-lock.json`.** npm is the project's package
  manager. A second lockfile makes Vercel's detection ambiguous — pnpm is checked
  before npm, so a stale `pnpm-lock.yaml` silently wins. `pnpm-lock.yaml`,
  `yarn.lock` and `bun.lockb` are gitignored to keep it that way. (`.mise.toml`
  and the `.figma/make/*` helpers still mention pnpm; Vercel reads neither.)
- **Site metadata lives in `.figma/make/site.json`, not `index.html`.** The
  `figmaSiteConfiguration` plugin in `vite.config.ts` fills the `<!-- figma:* -->`
  slots at build time. **Editing `index.html`'s title does nothing.** The keys
  that matter: `title` (falls back to the literal string `"Figma Make App"` if
  absent — it shipped that way until 2026-08-12), `description`, `language`,
  `icons.icon`, `openGraph.image`, and `robots.index`. **`robots.index: false`
  emits both a `noindex, nofollow` meta tag and a `robots.txt` of `Disallow: /`** —
  check it before any production deploy; the site was fully de-indexed by default.
- **`public/` is copied to `dist/` verbatim — that is exactly why shipped imagery
  does *not* live there.** Assets in `src/imports/` are imported by components, so
  Vite content-hashes them (immutable caching, and `vercel.json` sets
  `max-age=31536000, immutable` on `/assets/`) and **fails the build if one goes
  missing**. `public/` gets neither. Keep `public/` for files that must have a
  stable, guessable URL: the favicons, and a future `og-image`.
- **No SPA rewrite, deliberately.** Routing is state, not URL — nothing reads
  `window.location`. There are no deep links to catch, and a catch-all rewrite
  would serve HTML in place of genuine asset 404s and hide them.
- **No absolute paths anywhere, including dev tooling.** The `tools/*.py` builders
  resolve everything from `Path(__file__).resolve().parents[1]` (the repo root),
  with a `DHEEPAM_IMAGES` env override for the source folder. Two of them
  hard-coded `D:\Balaji\...` until 2026-08-12. Same rule for `.claude/launch.json`
  — it runs `npm run dev`, not a machine-specific `.cmd`.
- **Stop every preview server before `npm ci`.** It wipes `node_modules` *before*
  it checks for locks, so a running Vite server turns an install into a partially
  destroyed tree, not a failed no-op. `preview_list` → `preview_stop` first.
- **`@source not "../**/*.md"` in `index.css` is load-bearing — don't delete it as
  a stray line.** Tailwind v4 auto-detects sources from the project root, and
  since the repo root moved, `CLAUDE.md` and `PROJECT_STATUS.md` sit right in it.
  Tailwind cannot tell prose from JSX: plain English words that happen to be
  utility names get compiled into the production stylesheet. Before the
  directive that was **17 rules / 1,746 bytes** — `.contents`, `.collapse`,
  `.static`, `.table`, `.shadow`, `.flex-shrink` and the whole `--tw-backdrop-*`
  `@property` block, the last of those emitted by *this file's own* discussion of
  `backdrop-filter`. It grows with every status update. **Any new prose-heavy
  file at the repo root needs the same treatment**, and the way to check is to
  build with the file moved out and diff the CSS — the bundle should not change.
